package com.base.permission.service;

import java.util.List;

import com.base.extend.ModuleActions;

public interface IRoleActionsService {

	
	/**
	 * 角色的权限设置时树型模块的数据提取和组装
	 * @param nodeId
	 * @param roleId
	 * @return
	 */
	public List<ModuleActions> role_module_tree(long nodeId, long roleId);
	
	/**
	 * 角色的权限与模块关联设置.
	 * @param roleId
	 * @param rmActions 角色的模块和权限点的字符串格式:stable1@ADD,EDIT#stable2@ADD,EDIT,VIEW...
	 * @return
	 */
	public boolean setting(long roleId, String rmActions);
	
	
}
