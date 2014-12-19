package com.base.sys.service;
import java.util.List;

import com.base.model.BaseRole;
import com.base.model.BaseRoleAction;
import com.base.model.BaseUser;

public interface IUserLoginService {
	
	
	public BaseUser check_login(String uname, String psw);
	

	public List<BaseRole> getRolesByLoginUser(long userId);
	
	/**
	 * 提取登录用户的权限列表信息
	 * @param userId
	 * @return
	 */
	public List<BaseRoleAction> getActionsByLoginUser(long roleId);

}
