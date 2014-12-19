package com.base.permission.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.base.core.BaseSimpleDao;
import com.base.model.BaseModule;
import com.base.permission.dao.IPModuleDao;

@Repository(value="pmoduleDao")
@SuppressWarnings("unchecked")
public class PModuleDao extends BaseSimpleDao<BaseModule> implements IPModuleDao {

	public List<BaseModule> getAllModules(){
//		String hql = "FROM PermissionModule WHERE modIsVisible='1' ORDER BY modPid,modOrder";
		String hql = "FROM BaseModule ORDER BY modPid,modOrder";
		try {
			return this.find(hql, null);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public List<BaseModule> getModels(long pid, boolean isVisible) {
		String hql = "FROM BaseModule WHERE modPid=?";
		if(!isVisible){
			hql = hql + " AND modIsVisible='1'";
		}
		hql = hql +" ORDER BY modOrder";
		Object[] values = {
				pid
		};
		try {
			return this.find(hql, values);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public List getModel_treeMenu(String code) {
		String hql = "FROM BaseModule WHERE modStable in(?) AND modIsVisible='1' ORDER BY modOrder";
		Object[] values = {
				code
		};
		try {
			return this.find(hql, values);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	
	
	public int getMaxOrder(long parentId) throws Exception {
		String hql = "SELECT MAX(modOrder) FROM BaseModule WHERE modPid=?";
		Object[] values = {
				parentId
		};
		try {
			Integer iv = this.queryInt(hql, values);
			if(iv != null){
				return iv.intValue();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}


	public boolean check_stable(String code) {
		String hql = "FROM BaseModule WHERE modStable=?";
		Object[] values = {
				code
		};
		try {
			List list = this.find(hql, values);
			if(list!=null && list.size()>0){
				return true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}


}
