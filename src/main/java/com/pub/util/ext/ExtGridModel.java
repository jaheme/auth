package com.pub.util.ext;

import com.pub.util.IGridModel;


/**
 * 构建extjs前端框架的grid展示模型,采用默认的参数
 * store的paramNames配置属性中有设定
 * @author RHINE 2012-02-28
 * 
 */
public class ExtGridModel implements IGridModel{
	
	private boolean success = true;
	
	// 符合条件的总记录数 jsonReader中的totalProperty有说明
	private int total;
	
	// 指定起始行的参数名
	private int start;
	
	// 指定返回数据条数的参数名
	private int limit;
	
	// 指定排序字段的参数名
	private String sort;
	
	// 指定排序方向的参数名
	private String dir;
	
	// 数据集合
	private Object rows;
	
	private String params;
	

	public String getParams() {
		return params;
	}

	public void setParams(String params) {
		
		this.params = params;
	}

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}


	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	public String getSort() {
		return sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
	}

	public String getDir() {
		return dir;
	}

	public void setDir(String dir) {
		this.dir = dir;
	}

	public Object getRows() {
		return rows;
	}

	/**
	 * 数据集合
	 * @param rows
	 */
	public void setRows(Object rows) {
		this.rows = rows;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}
	

}
