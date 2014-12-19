package com.base.sys.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.base.core.BaseSimpleDao;
import com.base.model.BaseUser;
import com.base.sys.dao.IUserLoginDao;


@Repository(value="userLoginDao")
public class UserLoginDao extends BaseSimpleDao<BaseUser> implements IUserLoginDao {

	public BaseUser check_login(String uname, String psw) {
		String hql = "FROM BaseUser WHERE account=?";
		Object[] values = {
				uname
		};
		List list = null;
		try {
			list = this.find(hql, values);
			if(list!=null && list.size()>0){
				return (BaseUser) list.get(0);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

}
