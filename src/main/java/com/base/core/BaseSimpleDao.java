package com.base.core;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

/**
 * 实现IBaseSimpleDao接口中定义的方法,继承此类,则模块的一些基本操作代码将直接可用.
 * 
 * @author jade
 * 
 * @param <T>
 */
@SuppressWarnings("unchecked")
public class BaseSimpleDao<T> implements IBaseSimpleDao<T> {

	private SessionFactory sessionFactory;
	
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	private Session getSession() {
		return sessionFactory.getCurrentSession();
	}

	public List<T> pageQuery(String hql, int start, int limit, Object... values)
			throws Exception {
		Query query = this.getSession().createQuery(hql);
		if (limit > 0) {
			query.setFirstResult(start);
			query.setMaxResults(limit);
		}
		if (values != null) {
			for (int i = 0, len = values.length; i < len; i++) {
				query.setParameter(i, values[i]);
			}
		}
		return query.list();
	}

	public int pageQueryCount(String hql, Object... values) throws Exception {
		Query query = this.getSession().createQuery(hql);
		if (values != null) {
			for (int i = 0, len = values.length; i < len; i++) {
				query.setParameter(i, values[i]);
			}
		}
		return ((Long) query.uniqueResult()).intValue();
	}
	
	public int queryInt(String hql, Object... values) {
		Query query = this.getSession().createQuery(hql);
		if (values != null) {
			for (int i = 0, len = values.length; i < len; i++) {
				query.setParameter(i, values[i]);
			}
		}
		return ((Integer) query.uniqueResult()).intValue();
	}
	public String queryString(String hql, Object... values) {
		Query query = this.getSession().createQuery(hql);
		if (values != null) {
			for (int i = 0, len = values.length; i < len; i++) {
				query.setParameter(i, values[i]);
			}
		}
		return query.uniqueResult().toString();
	}

	/**
	 * 原生sql分页查询
	 * 
	 * @param sql
	 * @param start
	 * @param limit
	 * @return
	 * @throws Exception
	 */
	public List<T> pageSQLQuery(String sql, int start, int limit,
			Object... values) throws Exception {
		Query query = this.getSession().createSQLQuery(sql);
		if (values != null) {
			for (int i = 0, len = values.length; i < len; i++) {
				query.setParameter(i, values[i]);
			}
		}
		if (limit > 0) {
			query.setFirstResult(start);
			query.setMaxResults(limit);
		}
		return query.list();
	}

	public int pageSQLQueryCount(String sql, Object... values) throws Exception {
		Query query = this.getSession().createSQLQuery(sql);
		if (values != null) {
			for (int i = 0, len = values.length; i < len; i++) {
				query.setParameter(i, values[i]);
			}
		}
		return ((Integer) query.uniqueResult()).intValue();
	}

	public void delete(T t) throws Exception {
		this.getSession().delete(t);
	}

	public void deleteAll(Collection<T> ts) throws Exception {
		Session session = this.getSession();
		for (T t : ts) {
			session.delete(t);
		}

	}

	public List<T> find(String hql, Object... values) throws Exception {
		// return this.getSession().find(hql, values);
//		Query query = this.getSession().createSQLQuery(hql);
		Query query = this.getSession().createQuery(hql);
		if (values != null) {
			for (int i = 0, len = values.length; i < len; i++) {
				query.setParameter(i, values[i]);
			}
		}
		return query.list();
	}

	public T get(Class<T> c, Serializable id) throws Exception {
		Object obj = this.getSession().get(c, id);
		if (obj != null) {
			return (T) obj;
		}
		return null;
	}

	public void save(T t) throws Exception {
		this.getSession().save(t);
	}

	public T insert(T t) throws Exception {
		this.getSession().save(t);
		return t;
	}

	public void saveOrUpdate(T t) throws Exception {
		this.getSession().saveOrUpdate(t);

	}

	public void update(T t) throws Exception {
		this.getSession().update(t);
	}

	public void update_marge(T t) throws Exception {
		Session session = this.getSession();
		session.clear();
		session.update(t);

	}

}
