package com.base.permission.service;

import com.base.core.IBaseSimpleService;
import com.base.model.BaseRoleUser;
import com.pub.util.IGridModel;

public interface IRoleUserService extends IBaseSimpleService<BaseRoleUser> {

	public boolean save(String uid, String roleId);
	
	public boolean deletes(String ids);
	
	public IGridModel role_user_list(IGridModel model, Long roleId);
	
	public IGridModel getUserRoles(IGridModel model, String uid);
	
}
