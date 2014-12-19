package com.base.core;

import java.io.Serializable;
import java.util.Map;

import com.pub.util.IGridModel;

public interface IBaseSimpleService<T> {
	
//    public boolean saveOrUpdate(T t);
	
	public boolean save(T t);
	
	public boolean update(T t);
    
	public boolean delete(Serializable id);
	
	
	public T get(Serializable id);
	
	
//	public List<T> find(String hql);
	
	
	/** 简单分页查询 */
	public IGridModel pageQuery(IGridModel gModel, Map map);
	

}
