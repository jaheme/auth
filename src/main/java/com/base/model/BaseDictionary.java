package com.base.model;

/**
 * BaseDictionary entity.
 * 
 * @author MyEclipse Persistence Tools
 */

public class BaseDictionary implements java.io.Serializable {

	// Fields

	private Long pkDicId;
	private String dicValue;
	private String dicName;
	private Long dicPid;
	private Integer dicOrder;
	private Integer dicState;

	// Constructors

	/** default constructor */
	public BaseDictionary() {
	}

	/** minimal constructor */
	public BaseDictionary(Long pkDicId, String dicValue, String dicName,
			Long dicPid) {
		this.pkDicId = pkDicId;
		this.dicValue = dicValue;
		this.dicName = dicName;
		this.dicPid = dicPid;
	}

	/** full constructor */
	public BaseDictionary(Long pkDicId, String dicValue, String dicName,
			Long dicPid, Integer dicOrder, Integer dicState) {
		this.pkDicId = pkDicId;
		this.dicValue = dicValue;
		this.dicName = dicName;
		this.dicPid = dicPid;
		this.dicOrder = dicOrder;
		this.dicState = dicState;
	}

	// Property accessors

	public Long getPkDicId() {
		return this.pkDicId;
	}

	public void setPkDicId(Long pkDicId) {
		this.pkDicId = pkDicId;
	}

	public String getDicValue() {
		return this.dicValue;
	}

	public void setDicValue(String dicValue) {
		this.dicValue = dicValue;
	}

	public String getDicName() {
		return this.dicName;
	}

	public void setDicName(String dicName) {
		this.dicName = dicName;
	}

	public Long getDicPid() {
		return this.dicPid;
	}

	public void setDicPid(Long dicPid) {
		this.dicPid = dicPid;
	}

	public Integer getDicOrder() {
		return this.dicOrder;
	}

	public void setDicOrder(Integer dicOrder) {
		this.dicOrder = dicOrder;
	}

	public Integer getDicState() {
		return this.dicState;
	}

	public void setDicState(Integer dicState) {
		this.dicState = dicState;
	}

}