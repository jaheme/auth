package com.base.permission.dao;

import java.util.Map;

import com.base.core.IBaseSimpleDao;
import com.base.model.BaseUser;
import com.pub.util.IGridModel;

public interface IPUserDao extends IBaseSimpleDao<BaseUser>{
	
	/**
	 * 用户列表
	 * @param model
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public IGridModel pageQuery(IGridModel model, Map map) throws Exception;
	
	public IGridModel combox_list(IGridModel model, Map<String, String> map);
	

	public IGridModel dept_user_list(IGridModel model, Long deptId);
	
	public boolean check_account(BaseUser puser);
}
