package com.base.model;

/**
 * PermissionRoleUser entity.
 * 
 * @author MyEclipse Persistence Tools
 */

public class BaseRoleUser implements java.io.Serializable {

	// Fields

	private Long urId;
	private Long userId;
	private Long roleId;

	// Constructors

	/** default constructor */
	public BaseRoleUser() {
	}

	/** full constructor */
	public BaseRoleUser(Long userId, Long roleId) {
		this.userId = userId;
		this.roleId = roleId;
	}

	// Property accessors

	public Long getUrId() {
		return this.urId;
	}

	public void setUrId(Long urId) {
		this.urId = urId;
	}

	public Long getUserId() {
		return this.userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Long getRoleId() {
		return this.roleId;
	}

	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}

}