package com.base.permission.service.impl;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.base.model.BaseRole;
import com.base.model.BaseRoleUser;
import com.base.permission.dao.IRoleDao;
import com.base.permission.service.IRoleUserService;
import com.pub.util.IGridModel;


@Service(value="roleUserService")
public class RoleUserService implements IRoleUserService {

	
	private IRoleDao roleDao;
	
	public void setRoleDao(IRoleDao roleDao) {
		this.roleDao = roleDao;
	}
	
	
	public boolean delete(Serializable id) {
		BaseRoleUser t = this.get(id);
		try {
			this.roleDao.delete(t);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}


	public boolean deletes(String ids) {
		try {
			if(ids.indexOf(",") > -1){
				String[] arr = ids.split(",");
				for(String id : arr){
					this.delete(Long.parseLong(id));
				}
			} else {
				this.delete(Long.parseLong(ids));
			}
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}
	
	
	public BaseRoleUser get(Serializable id) {
		try {
			Object obj = this.roleDao.get(BaseRoleUser.class, id);
			if(obj != null){
				return (BaseRoleUser)obj;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public IGridModel pageQuery(IGridModel model, Map map) {
		// TODO Auto-generated method stub
		return null;
	}

	public boolean save(BaseRoleUser t) {
		try {
			this.roleDao.save(t);
			return true;
		} 
		catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public boolean update(BaseRoleUser t) {
		try {
			this.roleDao.update(t);
			return true;
		} 
		catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}


	public boolean save(String uid, String rid) {
		long roleId = Long.parseLong(rid);
		try {
			if(uid.indexOf(",") > -1){
				String[] arr = uid.split(",");
				for(String userId : arr){
					BaseRoleUser ru = new BaseRoleUser();
					ru.setUserId(Long.parseLong(userId));
					ru.setRoleId(roleId);
					this.save(ru);
				}
			} else {
				BaseRoleUser ru = new BaseRoleUser();
				ru.setUserId(Long.parseLong(uid));
				ru.setRoleId(roleId);
				this.save(ru);
			}
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	

	public IGridModel role_user_list(IGridModel model, Long roleId){
		try {
			return this.roleDao.role_user_list(model, roleId);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	
	public IGridModel getUserRoles(IGridModel model, String uid){
		return this.roleDao.getUserRoles(model, uid);
	}

	
//	public List<BaseRole> getRolesByUserId(Long userId){
//		return this.roleDao.getRolesByUserId(userId);
//	}
}
