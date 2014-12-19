package com.base.extend;

import com.base.model.BaseRoleUser;

/**
 * 角色用户的详细信息实体
 * @author rhine
 *
 */
public class RoleUser extends BaseRoleUser {

	private Long userId;
	private String userName;
	private String roleName;
	private String simpleName; // department name

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getSimpleName() {
		return simpleName;
	}

	public void setSimpleName(String simpleName) {
		this.simpleName = simpleName;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	
}
