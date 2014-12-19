package com.pub.util;


public interface IGridModel {
	

	/** 请求是否成功 */
	public boolean isSuccess();
	public void setSuccess(boolean success);
	
	
	/** total: 总记录数 */
	public int getTotal();
	public void setTotal(int total);

	// start: 当前页检索数据的第一条记录在数据库中的索引
	public int getStart() ;
	public void setStart(int start);

	
	// limit: 一页的记录数目
	public int getLimit();
	public void setLimit(int limit);

	
	// sort: 排序的字段
	public String getSort();
	public void setSort(String sort);

	
	// dir: 排序的方向 DESC/ASC
	public String getDir();
	public void setDir(String dir);

	
	// rows: 一页的记录集合
	public Object getRows() ;
	public void setRows(Object rows);
	
	public String getParams();
	public void setParams(String params);

}
