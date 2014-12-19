package com.base.permission.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import com.base.extend.ModuleActions;
import com.base.model.BaseDictionary;
import com.base.model.BaseModule;
import com.base.model.BaseRoleAction;
import com.base.permission.dao.IPModuleDao;
import com.base.permission.dao.IRoleDao;
import com.base.permission.service.IRoleActionsService;
import com.base.sys.dao.IDictionaryDao;
import com.base.util.Constants;


@Service(value="roleActionsService")
public class RoleActionsService implements IRoleActionsService {
	
	private static final Log log = LogFactory.getLog(RoleActionsService.class);

	private IRoleDao roleDao;
	private IPModuleDao pmoduleDao;
	private IDictionaryDao dictionaryDao;
	
	public void setDictionaryDao(IDictionaryDao dictionaryDao) {
		this.dictionaryDao = dictionaryDao;
	}
	public void setRoleDao(IRoleDao roleDao) {
		this.roleDao = roleDao;
	}
	public void setPmoduleDao(IPModuleDao pmoduleDao) {
		this.pmoduleDao = pmoduleDao;
	}

	
	public boolean setting(long roleId, String rmActions){
		List<BaseRoleAction> update = new ArrayList<BaseRoleAction>();
		List<BaseRoleAction> insert = new ArrayList<BaseRoleAction>();
		List<BaseRoleAction> ralist = this.roleDao.role_all_modules(roleId);
		String[] itemArr = rmActions.split("#");
		try {
			for(String item : itemArr){
				String[] rm = item.split("@");
				int len = rm.length;
				boolean isNew = true;  //db中不存在此模块的设置
				for(Iterator<BaseRoleAction> it = ralist.iterator(); it.hasNext();){
					BaseRoleAction ra = it.next();
					if(ra.getModStable().equals(rm[0])){  // 模块存在
						isNew = false;
						if( len>1 && !ra.getModActions().equals(rm[1])){  // 模块权限不一样,将执行update
							ra.setModActions(rm[1]);
							update.add(ra);
						}
						it.remove();
						break;
					}
				}
				if(isNew){
					insert.add(new BaseRoleAction(roleId,rm[0],len>1?rm[1]:""));
				}
			}
			if(ralist.size() > 0){ // 删除多余的
				this.roleDao.deleteAll(ralist);
			}
			if(update.size() > 0){
				for(BaseRoleAction t : update){
					this.roleDao.update(t);
				}
			}
			if(insert.size() > 0){
				for(BaseRoleAction t : insert){
					this.roleDao.save(t);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return false;
	}
	
	
	/**
	 * 1. 取得nodeId下的模块集合
	 * 2. 组装模块集合的状态码
	 * 3. 通过状态码加载角色的模块集合
	 * 4. 用以上三点的结果,组装角色的权限信息.
	 */
	public List<ModuleActions> role_module_tree(long nodeId, long roleId) {
		List<BaseModule> ml = this.pmoduleDao.getModels(nodeId, false);
		if(ml != null && ml.size() > 0){
			StringBuffer stables = null;
			for(BaseModule m : ml){
				if(stables == null){
					stables = new StringBuffer("'"+m.getModStable()+"'");
					continue;
				}
				stables.append(",'"+m.getModStable()+"'");
			}
			List<BaseRoleAction> ral = this.roleDao.role_modules(stables.toString(), roleId);
			return this.buildModuleActions(ral, ml);
		}
		return null;
	}
	
	
	/**
	 * 构建详细的模块实体
	 * 包括模块基本信息,模块权限点的详细信息,同时绑定角色的权限设置
	 * @param ral
	 * @param ml
	 * @return
	 */
	private List<ModuleActions> buildModuleActions(
			List<BaseRoleAction> ral,
			List<BaseModule> ml){
		List<ModuleActions> ma = new ArrayList<ModuleActions>();
		if(ml != null && ml.size() > 0){
			List<BaseDictionary> dl = this.dictionaryDao.getChildByDicValue(Constants.ACTIONS, false);
			ModuleActions mact = null;
			for(BaseModule m : ml){
				String acts = m.getModActions();
				mact = new ModuleActions();
//				log.info("m.getModActions()---"+acts);
				String role_acts = null;
				for(BaseRoleAction ra : ral){
					if( ra.getModStable().equals(m.getModStable()) ){ //权限表中有此模块的设置
						role_acts = ra.getModActions();
						mact.setChecked(true);
						break;
					}
				}
				if( acts!=null && !"".equals(acts)){ // 模块的权限点有值
					mact.setModuleActions(this.buildModActions(acts, role_acts, dl));
				}
				mact.setModId(m.getModId());
				mact.setModPid(m.getModPid());
				mact.setModStable(m.getModStable());
				mact.setModName(m.getModName());
				mact.setModUrl(m.getModUrl());
				
				ma.add(mact);
			}
		}
		return ma;
	}

	/**
	 * 一个模块的权限点的比较拆分封装
	 * @param acts 模块的权限点
	 * @param role_acts 角色的权限模块上设置的权限点
	 * @return List<Map<String, Object>> 封装好了的权限点列表
	 */
	private List<Map<String, Object>> buildModActions(String acts, String role_acts,
			List<BaseDictionary> dl){
		
		List<Map<String, Object>> modActions = new ArrayList<Map<String, Object>>();
		Map<String, Object> map = null;
//		List<BaseDictionary> dl = this.dictionaryDao.getChildByCode("'"+Constants.ACTIONS+"'", false);
//		if(acts.indexOf(",") > -1){ 
			String[] arr = acts.split(",");
			for(String act : arr){ // 循环模块表里的权限点,设置它的详细信息
				for(BaseDictionary d : dl){
					if(act.equals(d.getDicValue())){
						map = new HashMap<String, Object>(4);
						map.put("id", d.getPkDicId());
						map.put("code", d.getDicValue());
						map.put("name", d.getDicName());
						if(role_acts != null){ // 如果权限表里有设置,则设置选中
							String[] ra_arr = role_acts.split(",");
							for(String ra : ra_arr){
								if(act.equals(ra)){
									map.put("checked", true);
									break; // 跳出角色的模块权限点循环
								}
							}
						}
						modActions.add(map);
						break; // 跳出模块权限点循环
					}
				}
			}
//		} else {  // 只有一个权限点,则找到权限点的对象
//			for(BaseDictionary d : dl){
//				if(acts.equals(d.getDicValue())){
//					map = new HashMap<String, Object>(3);
//					map.put("id", d.getPkDicId());
//					map.put("code", d.getDicValue());
//					map.put("name", d.getDicName());
//					if(acts.equals(role_acts)){
//						map.put("checked", true);
//						break;
//					}
//					modActions.add(map);
//				}
//			}
//		}
		return modActions;
	}

}
