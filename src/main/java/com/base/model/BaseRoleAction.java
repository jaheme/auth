package com.base.model;

/**
 * PermissionRoleActions entity.
 * 
 * @author MyEclipse Persistence Tools
 */

public class BaseRoleAction implements java.io.Serializable {

	// Fields

	private Long actId;
	private Long roleId;
	private String modStable;
	private String modActions;

	// Constructors

	/** default constructor */
	public BaseRoleAction() {
	}

	/** minimal constructor */
	public BaseRoleAction(Long roleId, String modStable) {
		this.roleId = roleId;
		this.modStable = modStable;
	}

	/** full constructor */
	public BaseRoleAction(Long roleId, String modStable,
			String modActions) {
		this.roleId = roleId;
		this.modStable = modStable;
		this.modActions = modActions;
	}

	// Property accessors

	public Long getActId() {
		return this.actId;
	}

	public void setActId(Long actId) {
		this.actId = actId;
	}

	public Long getRoleId() {
		return this.roleId;
	}

	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}

	public String getModStable() {
		return this.modStable;
	}

	public void setModStable(String modStable) {
		this.modStable = modStable;
	}

	public String getModActions() {
		return this.modActions;
	}

	public void setModActions(String modActions) {
		this.modActions = modActions;
	}

}