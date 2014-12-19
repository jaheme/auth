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

import com.base.model.BaseDictionary;
import com.base.sys.service.IDictionaryService;
import com.pub.util.IGridModel;
import com.pub.util.ext.ExtGridModel;


/**
 * 字典
 * @author rhine
 *
 */
@Controller
@RequestMapping(value="dictionary")
public class DictionaryController {

	private static final Log log = LogFactory.getLog(DictionaryController.class);
	private IDictionaryService dictionaryService;
	public void setDictionaryService(IDictionaryService dictionaryService) {
		this.dictionaryService = dictionaryService;
	}
	
	/** 获得给定稳定码的节点
	 * 
	 * @param dv
	 * @return
	 */
	@RequestMapping(value="/getTreeRoot/{dicValue}", method=RequestMethod.POST)
	@ResponseBody
	public List<Map<String, Object>> getTreeRoot(@PathVariable("dicValue")String dv){
		log.debug("dicValue======" + dv );
		List<BaseDictionary> mlist = this.dictionaryService.getTreeRoot(dv);
		if(mlist == null ){
			return null;
		}
		return this.buildTreeMenu(mlist);
	}
	
	
	
	/** 各模块加载树型子节点时调用 */
	@RequestMapping(value="/getRootChild/{isVisible}/{pid}", method=RequestMethod.POST)
	@ResponseBody
	public List<Map<String, Object>> getRootChild(@PathVariable("pid")Long pid,
			@PathVariable("isVisible")boolean isVisible){
		List<BaseDictionary> mlist = this.dictionaryService.getRootChild(pid, isVisible);
		log.info("BaseDictionary--pid======" + pid);
		if(mlist == null ){
			return null;
		}
		return this.buildTreeMenu(mlist);
	}
	
	
	/** 构建树型结构数据 */
	private List<Map<String, Object>> buildTreeMenu(List<BaseDictionary> mlist){
		Map<String, Object> map = null;
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		for(Iterator<BaseDictionary> it = mlist.iterator(); it.hasNext();){
			BaseDictionary mod = it.next();
			map = new HashMap<String, Object>();
			map.put("dicId", mod.getPkDicId());
			map.put("dicName", mod.getDicName());
			map.put("dicPid", mod.getDicPid());
			map.put("dicValue", mod.getDicValue());
			map.put("dicOrder", mod.getDicOrder());
			map.put("dicState", mod.getDicState());
//			map.put("cls", "floder");
			list.add(map);
			map = null;
		}
		return list;
	}
	
	/**字典的新增与修改*/
	@RequestMapping(value="/addOrUpdate")
	@ResponseBody
	public Map<String, Object> addOrUpdate(BaseDictionary mod){
		boolean flag = false;
		if(mod.getPkDicId()==null || mod.getPkDicId().equals("")){
			if(mod.getDicPid()==null || mod.getDicPid().equals("")){
				mod.setDicPid(0L);
			}
			flag = this.dictionaryService.save(mod);
		}
		else {
			flag = dictionaryService.update(mod);
		}

		Map<String, Object> map = new HashMap<String, Object>(1);
		map.put("success", flag);
		return map;
	}
	
	/**加载给定标识的字典,可用于修改时的数据加载*/
	@RequestMapping(value="/loadById/{id}")
	@ResponseBody
	public Map<String, Object> loadById(@PathVariable("id")Long id){
		BaseDictionary mod = this.dictionaryService.get(id);
		
		Map<String, Object> map = new HashMap<String, Object>(2);
		map.put("success", mod==null? false : true);
		map.put("data", mod);
		return map;
	}
	
	
	/** 删除操作,删除指定id的字典对象 */
	@RequestMapping(value="/deleteById/{id}")
	@ResponseBody
	public Map<String, Object> deleteById(@PathVariable("id")Long id){
		boolean flag = this.dictionaryService.delete(id);
		Map<String, Object> map = new HashMap<String, Object>(1);
		map.put("success", flag);
		return map;
		
	}
	
	/** 字典的下拉控件的数据组织 在一个公共js文件里做了封装 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value="/combox_list/{simpleCode}")
	@ResponseBody
	public IGridModel combo_list(ExtGridModel gModel, @PathVariable("simpleCode")String simpleCode){
		log.debug("combo_list--simpleCode="+simpleCode);
		IGridModel gm = this.dictionaryService.combox_list(gModel, simpleCode);
		if(gm != null && gm.getRows() != null){
			List<BaseDictionary> ulist = (List<BaseDictionary>)gm.getRows();
			List list = new ArrayList();
			Map map = null;
			for(Iterator<BaseDictionary> it = ulist.iterator(); it.hasNext();){
				BaseDictionary d = it.next();
				map = new HashMap();
				map.put("dicId", d.getPkDicId());
				map.put("dicValue", d.getDicValue());
				map.put("dicName", d.getDicName());
				list.add(map);
			}
			gModel.setRows(list);
			return gModel;
		}
		return null;
	}
	
	
	
	
}
