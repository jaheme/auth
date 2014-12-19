package com.base.core;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

public interface IBaseSimpleDao<T> {
	
	public void saveOrUpdate(T t) throws Exception;
	
	public void save(T t) throws Exception;
	
	/** 返回刚插入数据的对象,以便调用,如调用主键等 */
	public T insert(T t) throws Exception;
	
	public void update(T t) throws Exception;
	
	
	/**
	 * 如果您在update前,查询了同标识的对象,则会报错:a different object with the same identifier value was already associated with the session
	 * 用此方法执行更新操作
	 * @param t
	 * @throws Exception
	 */
	public void update_marge(T t) throws Exception;
	
	public void delete(T t) throws Exception;
	
	public void deleteAll(Collection<T> ts) throws Exception;
	
	public T get(Class<T> c, Serializable id) throws Exception;
	
	public List<T> find(String hql, Object... values) throws Exception;
	
	
	
	
	/** 简单的hql分页查询 */
	public List<T> pageQuery(String hql, int start, int limit, Object... values) throws Exception;
	
	/** 简单的查询分页条件下的总记录数 */
	public int pageQueryCount(String hql, Object... values) throws Exception;
	
	

}
