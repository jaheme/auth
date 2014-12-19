package com.base.model;


/**
 * BaseDepartments entity.
 * 
 * @author MyEclipse Persistence Tools
 */
//@JsonIgnoreProperties({"permissionUser"} )
public class BaseDepartment implements java.io.Serializable {

	// Fields

	private Long pkDeptId;
//	private PermissionUser permissionUser;
	private Long fkCompanyId;
	private String simpleCode;
	private String simpleName;
	private String fullName;
	private Long parentId;
	private String deptPhone;
	private String deptFax;
	private Integer deptOrder;
	private Integer deptState;

	// Constructors

	/** default constructor */
	public BaseDepartment() {
	}

	/** minimal constructor */
	public BaseDepartment(String simpleCode, String simpleName,
			String fullName, Long parentId) {
		this.simpleCode = simpleCode;
		this.simpleName = simpleName;
		this.fullName = fullName;
		this.parentId = parentId;
	}

	/** full constructor */
	public BaseDepartment(Long fkCompanyId,
			String simpleCode, String simpleName, String fullName,
			Long parentId, String deptPhone, String deptFax, Integer deptOrder,
			Integer deptState) {
		this.fkCompanyId = fkCompanyId;
		this.simpleCode = simpleCode;
		this.simpleName = simpleName;
		this.fullName = fullName;
		this.parentId = parentId;
		this.deptPhone = deptPhone;
		this.deptFax = deptFax;
		this.deptOrder = deptOrder;
		this.deptState = deptState;
	}

	// Property accessors

	public Long getPkDeptId() {
		return this.pkDeptId;
	}

	public void setPkDeptId(Long pkDeptId) {
		this.pkDeptId = pkDeptId;
	}

//	public PermissionUser getPermissionUser() {
//		return this.permissionUser;
//	}
//
//	public void setPermissionUser(PermissionUser permissionUser) {
//		this.permissionUser = permissionUser;
//	}

	public Long getFkCompanyId() {
		return this.fkCompanyId;
	}

	public void setFkCompanyId(Long fkCompanyId) {
		this.fkCompanyId = fkCompanyId;
	}

	public String getSimpleCode() {
		return this.simpleCode;
	}

	public void setSimpleCode(String simpleCode) {
		this.simpleCode = simpleCode;
	}

	public String getSimpleName() {
		return this.simpleName;
	}

	public void setSimpleName(String simpleName) {
		this.simpleName = simpleName;
	}

	public String getFullName() {
		return this.fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public Long getParentId() {
		return this.parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}

	public String getDeptPhone() {
		return this.deptPhone;
	}

	public void setDeptPhone(String deptPhone) {
		this.deptPhone = deptPhone;
	}

	public String getDeptFax() {
		return this.deptFax;
	}

	public void setDeptFax(String deptFax) {
		this.deptFax = deptFax;
	}

	public Integer getDeptOrder() {
		return this.deptOrder;
	}

	public void setDeptOrder(Integer deptOrder) {
		this.deptOrder = deptOrder;
	}

	public Integer getDeptState() {
		return this.deptState;
	}

	public void setDeptState(Integer deptState) {
		this.deptState = deptState;
	}

}