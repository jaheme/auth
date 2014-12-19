package com.base.permission.service.impl;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.base.model.BaseRole;
import com.base.permission.dao.IRoleDao;
import com.base.permission.service.IRoleService;
import com.pub.util.IGridModel;


@Service(value="roleService")
public class RoleService implements IRoleService {

	private IRoleDao roleDao;
	
	
	public void setRoleDao(IRoleDao roleDao) {
		this.roleDao = roleDao;
	}

	public boolean delete(Serializable id) {
		BaseRole t = this.get(id);
		try {
			this.roleDao.delete(t);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	
	
	public BaseRole get(Serializable id) {
		try {
			Object obj = this.roleDao.get(BaseRole.class, id);
			if(obj != null){
				return (BaseRole)obj;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	
	
	
	public IGridModel pageQuery(IGridModel model, Map map) {
		return null;
	}

	
	
	
	public boolean save(BaseRole t) {
		try {
			this.roleDao.save(t);
			return true;
		} 
		catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	
	
	
	public boolean update(BaseRole t) {
		try {
			this.roleDao.update(t);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}
	
	
	public List<BaseRole> getTreeRoot(Long pid){
		return this.roleDao.getTreeRoot(pid);
	}

}
