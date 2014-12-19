package com.base.sys.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.base.model.BaseRole;
import com.base.model.BaseRoleAction;
import com.base.model.BaseUser;
import com.base.permission.dao.IRoleDao;
import com.base.sys.dao.IUserLoginDao;
import com.base.sys.service.IUserLoginService;

@Service(value="userLoginService")
public class UserLoginService implements IUserLoginService {

	private IUserLoginDao userLoginDao;
	private IRoleDao roleDao;
	

	public void setRoleDao(IRoleDao roleDao) {
		this.roleDao = roleDao;
	}

	public void setUserLoginDao(IUserLoginDao userLoginDao) {
		this.userLoginDao = userLoginDao;
	}

	public BaseUser check_login(String uname, String psw) {
		return this.userLoginDao.check_login(uname, psw);
	}
	

	public List<BaseRole> getRolesByLoginUser(long userId){
		return this.roleDao.getRolesByUserId(userId);
	}

	public List<BaseRoleAction> getActionsByLoginUser(long roleId) {
		return this.roleDao.getActionsByLoginUser(roleId);
	}
	
	
	
	
}
