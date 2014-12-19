package com.base.model;

/**
 * PermissionRole entity.
 * 
 * @author MyEclipse Persistence Tools
 */

public class BaseRole implements java.io.Serializable {

	// Fields

	private Long id;
	private Long parentId;
	private String roleName;
	private String mark;

	// Constructors

	/** default constructor */
	public BaseRole() {
	}

	/** minimal constructor */
	public BaseRole(Long parentId, String roleName) {
		this.parentId = parentId;
		this.roleName = roleName;
	}

	/** full constructor */
	public BaseRole(Long parentId, String roleName, String roleDesc) {
		this.parentId = parentId;
		this.roleName = roleName;
		this.mark = mark;
	}

	// Property accessors

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getParentId() {
		return this.parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}

	public String getRoleName() {
		return this.roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public String getMark() {
		return this.mark;
	}

	public void setMark(String mark) {
		this.mark = mark;
	}

}