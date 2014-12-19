package com.base.permission.dao;

import java.util.List;

import com.base.core.IBaseSimpleDao;
import com.base.model.BaseRole;
import com.base.model.BaseRoleAction;
import com.base.model.BaseRoleUser;
import com.pub.util.IGridModel;

public interface IRoleDao extends IBaseSimpleDao {

	public List<BaseRole> getTreeRoot(Long pid);
	

	/**
	 * 供角色的用户设置时,过滤已经设置了的用户使用.详见PUserService
	 * @param roleId
	 * @return
	 */
	public List<BaseRoleUser> role_user_list(Long roleId);
	
	
	/**
	 * 供角色的用户设置时,展示属于角色的用户的信息
	 * @param model
	 * @param roleId
	 * @return
	 * @throws Exception
	 */
	public IGridModel role_user_list(IGridModel model, Long roleId) throws Exception;

	
	/**
	 * 取得符合条件的权限模块集合
	 * @param modStables 已组装成sql中以in('a','b')的形式
	 * @param roleId 角色标识
	 * @return
	 */
	public List<BaseRoleAction> role_modules(String modStables, long roleId);
	
	/**
	 * 加载角色的全部信息
	 * @param roleId
	 * @return
	 */
	public List<BaseRoleAction> role_all_modules(long roleId);
	
	/**
	 * 获取登录用户所拥有的角色，可以有多个
	 * @param userId
	 * @return
	 */
	public List<BaseRole> getRolesByUserId(long userId);
	
	/**
	 * 提取登录用户的权限列表信息
	 * @param userId
	 * @return
	 */
	public List<BaseRoleAction> getActionsByLoginUser(long roleId);
	
	
	/**
	 * 角色关联用户时，查看用户已经关联的所有角色
	 * @param model
	 * @param uid，可能有多个用户标识
	 * @return
	 */
	public IGridModel getUserRoles(IGridModel model, String uid);
}
