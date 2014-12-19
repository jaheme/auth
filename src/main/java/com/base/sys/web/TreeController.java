package com.base.sys.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.base.extend.TreeModel;
import com.base.sys.service.ITreeService;
import com.base.util.BaseUtil;

/**
 * 区域的缓存+区域代码提取。
 * @author lyh
 *
 */
@SuppressWarnings("unchecked")
@Controller
@RequestMapping(value="tree")
public class TreeController {
	
	private static final Log log = LogFactory.getLog(TreeController.class);
	private ITreeService treeService;

	private List<TreeModel> initList = null;
	
	public void setTreeService(ITreeService treeService) {
		this.treeService = treeService;
	}

	

	@PostConstruct
	private void getAllArea(){
		initList = new ArrayList<TreeModel>();
//		initList = this.treeService.getAllArea();
		this.recursionArea(null);
	}
	
	@PreDestroy
	private void destoryAll(){
		initList = null;
	}
	
	
	private void recursionArea(String code){
		List<TreeModel> list = this.treeService.getAreas(code);
		if(list != null && list.size() > 0){
			initList.addAll(list);
			for(Iterator<TreeModel> it = list.iterator(); it.hasNext();){
				TreeModel mod = it.next();
//				initList.add(mod);
				this.recursionArea(mod.getCode());
			}
		}
	}
	
	
	/**
	 * 通过给出的code，找到此区域对象
	 * @param code
	 * @return TreeModel
	 */
	private TreeModel getByCode(String code){
		TreeModel mod = null;
		for(TreeModel t : initList){
			if(t.getCode().equals(code)){
				mod = t;
				break;
			}
		}
		return mod;
	}
	
	/**
	 * 返回给定code的区域的子区域
	 * @param code 区域代码，通过它找到区域，以区域id作为其它区域的pid查找。
	 * @return List<TreeModel>
	 */
//	private List getAreasByPid(String code){
//		List<TreeModel> list = null;
//		TreeModel mod = this.getByCode(code);
//		if(mod != null){
//			long pid = mod.getId();
//			list = new ArrayList<TreeModel>();
//			for(TreeModel t : initList){
//				if(t.getParentId().equals(pid)){
//					list.add(t);
//				}
//			}
//		}
//		return list;
//	}
	

	private List getAreasByPid(String code){
		List<TreeModel> list = null;
		TreeModel mod = this.getByCode(code);
		if(mod != null){
			String pid = mod.getCode();
			list = new ArrayList<TreeModel>();
			for(TreeModel t : initList){
				if(t.getParentId().equals(pid)){
					list.add(t);
				}
			}
		}
		return list;
	}
	
	
	/**
	 * 加载区域，如果传过来的区域代码是空的，则以用户的行政区域代码为准
	 * @param req
	 * @return
	 */
	@RequestMapping(value="/areas", method=RequestMethod.POST)
	@ResponseBody
	public List<Map<String, Object>> getAreaByPid(HttpServletRequest req){
		String code = req.getParameter("code");  // 桂林市的sn=450300000000
		log.info("tree code=" + code);
		List list = null;
		if(code == null || "".equals(code)){
			code = BaseUtil.getLogined(req).getAdminArea(); // 登录用户的行政区域
		}
		if(initList != null){
			return this.getAreasByPid(code);
		}
		
		return this.treeService.getAreas(code);
	}
	

	/**
	 * 用户管理选择行政区域的第一个下拉选择调用此方法
	 * @param req
	 * @return
	 */
	@RequestMapping(value="/getAreas", method=RequestMethod.POST)
	@ResponseBody
	public List<Map<String, Object>> getAreas(HttpServletRequest req){
		String code = req.getParameter("code");
		log.info("tree code=" + code);
		if(code == null || "".equals(code)){
			code = BaseUtil.getLogined(req).getAdminArea();
			// 直接返回当前登录用户的行政区域对象
			List list = new ArrayList(2);
			list.add(this.getByCode(code));
			return list;
		}
		if(initList != null){
			return this.getAreasByPid(code);
		}
		
		return this.treeService.getAreas(code);
	}
	
	

	@RequestMapping(value="/areaTree", method=RequestMethod.POST)
	@ResponseBody
	public List<Map<String, Object>> getTreeRoot(HttpServletRequest req){
		long pid = 30101; // 桂林市
		String id = req.getParameter("pid");
		log.info("tree pid=" + id);
		if(id != null && !"".equals(id)){
			pid = Long.parseLong(id);
		}
		List list = this.treeService.getAreaTree(pid);
		if(list == null ){
			return null;
		}
		return this.buildTree(list);
	}
	
	private List<Map<String, Object>> buildTree(List list){
		Map<String, Object> map = null;
		List<Map<String, Object>> l = new ArrayList<Map<String, Object>>();
		for(Iterator<TreeModel> it = list.iterator(); it.hasNext();){
			TreeModel mod = it.next();
			it.remove();
			map = new HashMap<String, Object>();
			map.put("id", mod.getId());
			map.put("text", mod.getText());
			List cl = this.getChilds(list, mod.getParentId());
			if(cl != null){
				map.put("children", cl);
			}
			l.add(map);
//			log.info(mod.getText());
		}
		return l;
	}
	
	
	private List<Map<String, Object>> getChilds(List list, String pid){
		Map<String, Object> map = null;
		List<Map<String, Object>> cl = null;
		for(Iterator<TreeModel> it = list.iterator(); it.hasNext();){
			TreeModel mod = it.next();
			if(mod.getParentId().equals(pid)){
				it.remove();
				map = new HashMap<String, Object>();
				map.put("id", mod.getId());
				map.put("text", mod.getText());
				if(cl==null){
					cl = new ArrayList<Map<String, Object>>();
				}
				cl.add(map);
			}
		}
		return cl;
	}
	

}
