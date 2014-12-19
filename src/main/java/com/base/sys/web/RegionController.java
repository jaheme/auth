package com.base.sys.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.base.model.BaseRegion;
import com.base.sys.service.IRegionService;
import com.base.util.BaseUtil;

@Controller
@RequestMapping(value="/region")
public class RegionController {
	

	private static final Log log = LogFactory.getLog(RegionController.class);
	private IRegionService regionService;
	public void setRegionService(IRegionService regionService) {
		this.regionService = regionService;
	}
	
	
	

	@RequestMapping(value="/getTreeRoot/{code}", method=RequestMethod.POST)
	@ResponseBody
	public List<Map<String, Object>> getTreeRoot(@PathVariable("code")String code){
		log.debug("code======" + code );
		List<BaseRegion> mlist = this.regionService.getTreeRoot(code);
		if(mlist == null ){
			return null;
		}
		return this.buildTreeMenu(mlist);
	}
	
	

	@RequestMapping(value="/getCode/{pcode}", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> getCode(@PathVariable("pcode")String pcode){
		log.debug("pcode======" + pcode );
		String code = this.regionService.getMaxCode(pcode);

		if(!"0".equals(pcode)){
			if("0".equals(code)){  // 层级中第一条记录
				code = BaseUtil.nextLevelCode(pcode, 24, 3);
			} else {
				code = BaseUtil.nextCode(code, 24, 3);
			}
		} else {
			if ("0".equals(code)){  // 第一层级第一条记录
				code = "100000000000000000000000";  // 24个长度
			} else {
				code = BaseUtil.nextCode(code, 24, 3);
			}
		}
			
		Map<String, Object> map = new HashMap<String, Object>(2);
		map.put("data", code);
		return map;
	}
	
	
	
	/** 各模块加载树型子节点时调用 */
	@RequestMapping(value="/getRootChild/{isVisible}/{pcode}", method=RequestMethod.POST)
	@ResponseBody
	public List<Map<String, Object>> getRootChild(@PathVariable("pcode")String pcode,
			@PathVariable("isVisible")boolean isVisible){
		List<BaseRegion> mlist = this.regionService.getRootChild(pcode, isVisible);
		log.info("BaseRegion--pcode======" + pcode);
		if(mlist == null ){
			return null;
		}
		return this.buildTreeMenu(mlist);
	}
	
	
	/** 构建树型结构数据 */
	private List<Map<String, Object>> buildTreeMenu(List<BaseRegion> mlist){
		Map<String, Object> map = null;
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		for(Iterator<BaseRegion> it = mlist.iterator(); it.hasNext();){
			BaseRegion mod = it.next();
			map = new HashMap<String, Object>();
			map.put("id", mod.getId());
			map.put("name", mod.getName());
			map.put("parentCode", mod.getParentCode());
			map.put("code", mod.getCode());
			map.put("orderNum", mod.getOrderNum());
			map.put("status", mod.getStatus());
//			map.put("cls", "floder");
			list.add(map);
			map = null;
		}
		return list;
	}
	
	
	
	@RequestMapping(value="/addOrUpdate")
	@ResponseBody
	public Map<String, Object> addOrUpdate(BaseRegion mod){
		boolean flag = false;
		if(mod.getId()==null || mod.getId().equals("")){
			if(mod.getParentCode()==null || mod.getParentCode().equals("")){
				mod.setParentCode("0");
			}
			flag = regionService.save(mod);
		}
		else {
			flag = regionService.update(mod);
		}

		Map<String, Object> map = new HashMap<String, Object>(1);
		map.put("success", flag);
		return map;
	}

	

	/**加载给定标识的字典,可用于修改时的数据加载*/
	@RequestMapping(value="/loadById/{id}")
	@ResponseBody
	public Map<String, Object> loadById(@PathVariable("id")Long id){
		BaseRegion mod = this.regionService.get(id);
		
		Map<String, Object> map = new HashMap<String, Object>(2);
		map.put("success", mod==null? false : true);
		map.put("data", mod);
		return map;
	}
	
	
	/** 删除操作,删除指定id的字典对象 */
	@RequestMapping(value="/deleteById/{id}")
	@ResponseBody
	public Map<String, Object> deleteById(@PathVariable("id")Long id){
		boolean flag = this.regionService.delete(id);
		Map<String, Object> map = new HashMap<String, Object>(1);
		map.put("success", flag);
		return map;
		
	}
	
	
}
