package com.base.sys.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.base.core.BaseSimpleDao;
import com.base.model.BaseDepartment;
import com.base.sys.dao.IDepartmentDao;


@Repository(value="departmentDao")
public class DepartmentDao extends BaseSimpleDao<BaseDepartment> implements IDepartmentDao {

	public int getMaxOrder(long parentId) throws Exception {
		String hql = "SELECT MAX(deptOrder) FROM BaseDepartment WHERE parentId=?";
		Object[] values = {
				parentId
		};
		return this.queryInt(hql, values);
	}

	public List<BaseDepartment> getRootChild(Long pid, boolean deptState) {
		String hql = "FROM BaseDepartment WHERE parentId=?";
		Object[] values = {
				pid
		};
		if(!deptState){ // false 只提取有效状态的记录
			hql = hql + " AND deptState=1";
		}
		hql = hql +" ORDER BY deptOrder ASC";

		try {
			return this.find(hql, values);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public List<BaseDepartment> getTreeRoot(String simpleCode) {
		String hql = null;
		if(simpleCode.equalsIgnoreCase("'ALL'")){
//			hql = "FROM BaseDepartments dp INNER JOIN FETCH dp.permissionUser WHERE dp.parentId=0 ORDER BY dp.deptOrder ASC";
			hql = "FROM BaseDepartment dp WHERE dp.parentId=0 ORDER BY dp.deptOrder ASC";
		}
		else {
			hql = "FROM BaseDepartment WHERE simpleCode in("+simpleCode+") AND deptState=1 ORDER BY deptOrder ASC";
		}

		try {
			return this.find(hql, null);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public BaseDepartment findById(Long id) throws Exception {
//		String hql = "FROM BaseDepartments dp INNER JOIN FETCH dp.permissionUser WHERE dp.pkDeptId="+id;
		String hql = "FROM BaseDepartment dp WHERE dp.pkDeptId=?";
		Object[] values = {
				id
		};
		try {
			List list = this.find(hql, values);
			if(list != null && list.size() > 0 && list.get(0) != null){
				return (BaseDepartment)list.get(0);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public List<BaseDepartment> findChilds(Long id) throws Exception {
		List<BaseDepartment> list = new ArrayList<BaseDepartment>();
		// 先加载自己
		BaseDepartment root = this.get(BaseDepartment.class, id);
		list.add(root);
		// 加载子部门
		this.getChilds(id+"", list);
		
		return list;
	}
	
	// 递归加载子部门
	private void getChilds(String pids, List<BaseDepartment> list){
		List<BaseDepartment> clist = this.getChilds(pids);
		String ids = null;
		for(BaseDepartment d : clist){
			if(d != null){
				list.add(d);
				if(ids==null){
					ids=d.getPkDeptId()+""; 
					continue;
				} 
				ids = ids+","+d.getPkDeptId();
			}
		}
		if( ids != null){
			this.getChilds(ids, list);
		}
	}
	
	// 使用in函数批量加载子部门
	private List<BaseDepartment> getChilds(String pids){
		String hql = "FROM BaseDepartment WHERE parentId in("+pids+")";
		hql = hql + " AND deptState=1 ORDER BY deptOrder ASC";
		try {
			return this.find(hql, null);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	

	public String findChildsId(Long id) throws Exception {
		List<BaseDepartment> list = findChilds(id);
		String ids = null;
		for(BaseDepartment d : list){
			if(ids==null){
				ids=d.getPkDeptId()+"";
				continue;
			}
			ids = ids+","+d.getPkDeptId();
		}
		return ids;
	}
	
	
	
	
	
	
}
