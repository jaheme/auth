package com.base.sys.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.base.core.BaseSimpleDao;
import com.base.model.BaseDictionary;
import com.base.sys.dao.IDictionaryDao;


@Repository(value="dictionaryDao")
public class DictionaryDao extends BaseSimpleDao<BaseDictionary> implements IDictionaryDao {


	public int getMaxOrder(long parentId) throws Exception {
		String hql = "SELECT MAX(dicOrder) FROM BaseDictionary WHERE dicPid=?";
		Object[] values = {
				parentId
		};
		return this.queryInt(hql, values);
	}

	public List<BaseDictionary> getTreeRoot(String dicValue) {
		String hql = null;
		if(dicValue.equalsIgnoreCase("'ALL'")){
			hql = "FROM BaseDictionary WHERE dicPid=0 ORDER BY dicOrder ASC";
		}
		else {
			hql = "FROM BaseDictionary WHERE dicValue in("+dicValue+") AND dicState=1 ORDER BY dicOrder ASC";
		}

		try {
			return this.find(hql, null);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public List<BaseDictionary> getRootChild(Long pid, boolean dicState) {
		String hql = "FROM BaseDictionary WHERE dicPid=?";
		Object[] values = {
				pid
		};
		if(!dicState){ // false 只提取有效状态的记录
			hql = hql + " AND dicState=1";
		}
		hql = hql +" ORDER BY dicOrder ASC";

		try {
			return this.find(hql, values);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public List<BaseDictionary> getRootChild(String pid, boolean dicState) {
		String hql = "FROM BaseDictionary WHERE dicPid in("+pid+")";
		if(!dicState){ // false 只提取有效状态的记录
			hql = hql + " AND dicState=1";
		}
		hql = hql +" ORDER BY dicValue ASC, dicOrder ASC";

		try {
			return this.find(hql, null);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public List<BaseDictionary> getChildByDicValue(String dicValue, boolean dicState) {
		String hql = "FROM BaseDictionary WHERE dicPid=(SELECT pkDicId FROM BaseDictionary WHERE dicValue=?))";
		if(!dicState){ // false 只提取有效状态的记录
			hql = hql + " AND dicState=1";
		}
		hql = hql +" ORDER BY dicOrder ASC";
		Object[] values = {
				dicValue
		};
		try {
			return this.find(hql, values);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}


	public List<BaseDictionary> getChildByCode(String code, boolean status) {
		String hql = "FROM BaseRegion WHERE code=?";
		Object[] params = {
				code
		};
		if(!status){ // false 只提取有效状态的记录
			hql = hql + " AND status=1";
		}
		hql = hql +" ORDER BY orderNum ASC";
		try {
			return this.find(hql, params);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}


}
