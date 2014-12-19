package com.base.permission.service;

import java.util.Map;

import com.base.core.IBaseSimpleService;
import com.base.model.BaseUser;
import com.pub.util.IGridModel;


public interface IPUserService extends IBaseSimpleService<BaseUser>{
	
	/**
	 * 修改密码
	 * @param userId
	 * @param psw
	 * @return
	 */
	public boolean change_psw(long userId, String psw);
	
	
	/**
	 * 检查帐户是否存在
	 * @param account
	 * @return true:存在
	 */
	public boolean check_account(BaseUser puser);
	
	/**
	 * 检索出符合条件的用户
	 * @param model
	 * @param map
	 * @return
	 */
	public IGridModel combox_list(IGridModel model, Map<String, String> map);
	
	
	/**
	 * 提取部门内的用户用于权限关联用户设置.
	 * 角色中已存在用户,将会过滤出来,不显示在列表中
	 * @param model
	 * @param deptId 部门标识
	 * @param roleId 角色标识 过滤已经设置了的用户
	 * @return
	 */
	public IGridModel dept_user_list(IGridModel model, Long deptId, Long roleId);

}
