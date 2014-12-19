package com.base.permission.web;

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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.base.model.BaseDictionary;
import com.base.model.BaseModule;
import com.base.model.BaseRoleAction;
import com.base.permission.service.IPModuleService;
import com.base.util.BaseUtil;


@Controller
public class PModuleController {
	
	private static final Log log = LogFactory.getLog(PModuleController.class);
	private List<BaseModule> initList;
	
	private IPModuleService pmoduleService;
	
	public void setPmoduleService(IPModuleService pmoduleService) {
		this.pmoduleService = pmoduleService;
	}
	
	/** 加载全部模块数据，缓存后调用速度较快 */
	@PostConstruct
	private void getAllModules(){
		initList = this.pmoduleService.getAllModules();
	}
	
	@PreDestroy
	private void destoryAll(){
		initList = null;
	}
	
	private List<BaseModule> getFromCache(String stable){
		List<BaseModule> mlist = null;
		if(initList != null){ // 缓存中有，则缓存中获取
			for(BaseModule mod : initList){
				if(mod.getModStable().equals(stable)){
					if(mlist==null){
						mlist = new ArrayList<BaseModule>();
					}
					mlist.add(mod);
				}
			}
		}
		return mlist;
	}
	
	/**
	 * 取得父ID等于给定形参pid的值的模块集合
	 * @param pid
	 * @return
	 */
	private List<BaseModule> getFromCache(long pid){
		List<BaseModule> mlist = null;
		for(BaseModule mod : initList){
			if(mod.getModPid().equals(pid)){
				if(mlist==null){
					mlist = new ArrayList<BaseModule>();
				}
				mlist.add(mod);
			}
		}
		return mlist;
	}
	
	/** 获得给定稳定码的节点 */
	@RequestMapping(value="pm_treeRoot/{code}", method=RequestMethod.POST)
	@ResponseBody
	public List<Map<String, Object>> module_treeMenu(@PathVariable("code")String code){
		log.debug("scode======" + code );
		List<BaseModule> mlist = null;
		if(initList != null){ // 缓存中有，则缓存中获取
			mlist = this.getFromCache(code);
		} else {
			mlist = this.pmoduleService.getModel_treeMenu(code);
		}
		if(mlist == null ){
			return null;
		}
		return this.buildTreeMenu(mlist);
	}
	
	/** 各模块加载树型子节点时调用 */
	@RequestMapping(value="pm_treeMenu/{code}", method=RequestMethod.POST)
	@ResponseBody
	public List<Map<String, Object>> module_treeMenu(@PathVariable("code")Long code,
			HttpServletRequest req){
		log.debug("node code======" + code);
//		List<PermissionModule> mlist = this.pmoduleService.getModels(code, false);
		List<BaseModule> mlist = null;
		if(initList != null){ // 缓存中有，则缓存中获取
			mlist = this.getFromCache(code);
		} else {
			mlist = this.pmoduleService.getModels(code, false);
		}
		if(mlist == null ){
			return null;
		}
		// 权限菜单过滤
		List<BaseRoleAction> alist = BaseUtil.getUserAction(req);
		for(Iterator<BaseModule> it = mlist.iterator(); it.hasNext();){
			BaseModule m = it.next();
//			if(m.getModUrl()==null || "".equals(m.getModUrl())){
//				continue;
//			}
			boolean open = false;
			for(BaseRoleAction ra : alist){
				if(m.getModStable().equals(ra.getModStable())){
					open = true;
					break;
				}
			}
			if( !open ){
				it.remove();
			}
		}
		return this.buildTreeMenu(mlist);
	}
	
	private List<Map<String, Object>> buildTreeMenu(List<BaseModule> mlist){
		Map<String, Object> map = null;
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		for(Iterator<BaseModule> it = mlist.iterator(); it.hasNext();){
			BaseModule mod = it.next();
			map = new HashMap<String, Object>();
			map.put("text", mod.getModName());
			map.put("id", mod.getModId());
			map.put("src", mod.getModUrl());
			if(mod.getModUrl()== null || mod.getModUrl().trim().equals("")){
				map.put("cls", "floder");
			}else {
				map.put("leaf", true);
			}
			list.add(map);
			map = null;
		}
		return list;
	}
	
	
	/** 权限的模块管理加载树形子节点时调用 */
	@RequestMapping(value="pmodule_tree/{node}", method=RequestMethod.POST)
	@ResponseBody
	public List<Map<String, Object>> module_tree(@PathVariable("node")long node,
			HttpServletRequest req){

		String nodeId = req.getParameter("node"); // ext默认传过来的参数,参数值是id
		if(nodeId == null ){
			node = 0;
		}
		node = Long.parseLong(nodeId);
//		List<PermissionModule> mlist = this.pmoduleService.getModels(node, true);
		List<BaseModule> mlist = null;
		if(initList != null){ // 缓存中有，则缓存中获取
			mlist = this.getFromCache(node);
		} else {
			mlist = this.pmoduleService.getModels(node, true);
		}
		if(mlist == null ){
			return null;
		}
		Map<String, Object> map = null;
		String useChecked = req.getParameter("useChecked");
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		for(Iterator<BaseModule> it = mlist.iterator(); it.hasNext();){
			BaseModule mod = it.next();
			map = new HashMap<String, Object>();

			map.put("id", mod.getModId());
			map.put("modStable", mod.getModStable());
			map.put("modActions", mod.getModActions());
			if( mod.getModIsVisible()!=1 ){
				map.put("text", mod.getModName()+"(hidden)");
			} else {
				map.put("text", mod.getModName());
			}
			
			if(mod.getModUrl()== null || mod.getModUrl().trim().equals("")){
				map.put("cls", "floder");
			}else {
				map.put("leaf", true);
			}
			
			if(useChecked != null){
//				map.put("checked", "1".equals(useChecked)? true : false);
			}
			
			list.add(map);
			map = null;
		}
		
//		map.put("text", "node1");
//		map.put("checked", false);
//		cmap.put("text", "node1001");
//		cmap.put("leaf", true);
//		cmap.put("checked", false);
//		List clist = new ArrayList();
//		clist.add(cmap);
//		map.put("children", clist);
//		list = new ArrayList();
//		list.add(map);
		return list;
	}
	
	
	
	@RequestMapping(value="pmodule_addOrUpdate")
	@ResponseBody
	public Map<String, Object> addOrUpdate(BaseModule pmodel){
		boolean flag = false;
		Map<String, Object> map = new HashMap<String, Object>(1);
		
		if(pmodel.getModPid()==null || pmodel.getModPid().equals("")){
			pmodel.setModPid(0L);
		}
		log.debug("mod_actions====="+ pmodel.getModActions());
		if( pmodel.getModId()==null || pmodel.getModId().equals("")){
			if(this.pmoduleService.check_stable(pmodel.getModStable())){
				map.put("success", false);
				map.put("msg", "未保存:模块代码重复,请换一个.");
				return map;
			}
			flag = this.pmoduleService.save(pmodel);
			if(flag && initList!=null){
				this.getAllModules();
			}
		}
		else {
			flag = pmoduleService.update(pmodel);
			if(flag && initList!=null){  // 更新缓存
				int index = 0;
				pmodel = this.pmoduleService.get(pmodel.getModId());
				for(int i=0; i<initList.size(); i++){
					if(initList.get(i).getModId().equals(pmodel.getModId())){
						index = i;
					}
				}
				initList.remove(index);
				initList.add(index, pmodel);
			}
		}

		map.put("success", flag);
		return map;
	}
	
	

	/** 检查稳定码是否重复:true:重复 
	@RequestMapping(value="pmodule_checkStable/{code}")
	@ResponseBody
	public Map<String, Object> check_stable(@PathVariable("code")String code){
		boolean flag = this.pmoduleService.check_stable(code);
		Map<String, Object> map = new HashMap<String, Object>(2);
		map.put("success", flag);
		return map;
	}
	*/
	
	@RequestMapping(value="pmodule_load/{id}")
	@ResponseBody
	public Map<String, Object> loadById(@PathVariable("id")Long id){
		BaseModule pmodel = this.pmoduleService.get(id);
		Map<String, Object> map = new HashMap<String, Object>(2);
		map.put("success", pmodel==null? false : true);
		map.put("data", pmodel);
		pmodel = null;
		return map;
		
	}
	
	
	@RequestMapping(value="pmodule_del/{id}")
	@ResponseBody
	public Map<String, Object> deleteById(@PathVariable("id")Long id){
		boolean flag = this.pmoduleService.delete(id);
		Map<String, Object> map = new HashMap<String, Object>(1);
		map.put("success", flag);
		return map;
		
	}
	
	/**
	 * 加载字典表里设置的所有权限点集合，供模块设置。
	 * @param dicValue
	 * @return
	 */
	@RequestMapping(value="pmload_action/{dicValue}")
	@ResponseBody
	public List<Map<String, String>> loadAction(@PathVariable("dicValue")String dicValue){
//		return Constants.permissionAction();
		List<BaseDictionary> list = this.pmoduleService.getActions(dicValue);
		if(list != null && list.size() > 0){
			List<Map<String, String>> result = new ArrayList(list.size()+3);
			Map<String, String> map = null;
			for(BaseDictionary d: list){
				map = new HashMap<String, String>(3);
				map.put("code", d.getDicValue());
				map.put("text", d.getDicName());
				result.add(map);
			}
			return result;
		}
		return null;
	}
	
	@RequestMapping(value="module/loadByPid/{pid}")
	@ResponseBody
	public Map<String, Object> getModulesByPid(@PathVariable("pid")long pid){
		List<BaseModule> mlist = null;
		if(initList != null){ // 缓存中有，则缓存中获取
			mlist = this.getFromCache(pid);
		} else {
			mlist = this.pmoduleService.getModels(pid, false);
		}
		Map<String, Object> map = new HashMap<String, Object>(2);
		map.put("success", true);
		map.put("data", mlist);
		return map;
	}
	
	@RequestMapping(value="module/setOrder")
	@ResponseBody
	public Map<String, Object> setOrder(HttpServletRequest req){
		String p = req.getParameter("ids");
		String p_order = req.getParameter("orders");
		
		String[] arr = p.split(",");
		String[] arr_order = p_order.split(",");
		int len = arr.length;
		
		Long[] ids = new Long[len];
		Integer[] orders = new Integer[len];
		
		for(int i=0; i<len; i++){
			ids[i] = Long.parseLong(arr[i]);
			orders[i] = Integer.parseInt(arr_order[i]);
		}
		
		boolean flag = this.pmoduleService.setOrder(ids, orders);
		if(flag){
			this.getAllModules();  // 重新缓存
		}
		
		Map<String, Object> map = new HashMap<String, Object>(1);
		map.put("success", flag);
		return map;
	}
	

}
