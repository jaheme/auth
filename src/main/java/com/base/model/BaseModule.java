package com.base.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Column;

import org.hibernate.annotations.GenericGenerator;


/**
 * PermissionModule entity.
 * 
 * @author MyEclipse Persistence Tools
 */
@Entity
@Table ( name = "base_module")
public class BaseModule implements java.io.Serializable {

	// Fields

	private Long modId;
	private String modStable;
	private String modName;
	private String modUrl;
	private String modActions;
	private Long modPid;
//	private Integer modLevel;
	private Integer modOrder;
	private Integer modIsVisible;

	@Id
	@GeneratedValue(generator="increment")
	@GenericGenerator(name="increment", strategy = "native")
	@Column(name="id")
	public Long getModId() {
		return this.modId;
	}

	public void setModId(Long modId) {
		this.modId = modId;
	}

	@Column(name="stable", length=50, nullable=false)
	public String getModStable() {
		return this.modStable;
	}

	public void setModStable(String modStable) {
		this.modStable = modStable;
	}

	@Column(name="name", length=50, nullable=false)
	public String getModName() {
		return this.modName;
	}

	public void setModName(String modName) {
		this.modName = modName;
	}

	@Column(name="url", length=100, nullable=true)
	public String getModUrl() {
		return this.modUrl;
	}

	public void setModUrl(String modUrl) {
		this.modUrl = modUrl;
	}

	@Column(name="actions", length=250, nullable=true)
	public String getModActions() {
		return modActions;
	}

	public void setModActions(String modActions) {
		this.modActions = modActions;
	}

	@Column(name="parentId")
	public Long getModPid() {
		return this.modPid;
	}

	public void setModPid(Long modPid) {
		this.modPid = modPid;
	}

//	public Integer getModLevel() {
//		return this.modLevel;
//	}
//
//	public void setModLevel(Integer modLevel) {
//		this.modLevel = modLevel;
//	}

	@Column(name="orderNum", nullable=false)
	public Integer getModOrder() {
		return this.modOrder;
	}

	public void setModOrder(Integer modOrder) {
		this.modOrder = modOrder;
	}
	
	@Column(name="isVisible", nullable=false)
	public Integer getModIsVisible() {
		return this.modIsVisible;
	}

	public void setModIsVisible(Integer modIsVisible) {
		this.modIsVisible = modIsVisible;
	}

}