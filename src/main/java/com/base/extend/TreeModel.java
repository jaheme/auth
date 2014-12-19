package com.base.extend;

import java.util.List;


/**
 * 通用的树型结构模型
 * @author rhine
 *
 */
public class TreeModel {

	private Long id;  //主键
	private String code;
	private String text; // 文本
	private String parentId;  // 父键
	private String parentCode;  // 
	private List<TreeModel> childs;  // 子节点列表
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	
	
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	
	
	public String getParentId() {
		return parentId;
	}
	public void setParentId(String parentId) {
		this.parentId = parentId;
	}
	
	
	public List<TreeModel> getChilds() {
		return childs;
	}
	public void setChilds(List<TreeModel> childs) {
		this.childs = childs;
	}
	
	
}
