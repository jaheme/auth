package com.base.sys.dao;

import com.base.model.BaseUser;

public interface IUserLoginDao {
	
	public BaseUser check_login(String uname, String psw);

}
