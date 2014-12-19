package com.base.sys.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.base.core.BaseSimpleDao;
import com.base.model.BaseDictionary;
import com.base.model.BaseRegion;
import com.base.sys.dao.IRegionDao;

@Repository(value="regionDao")
public class RegionDao extends BaseSimpleDao<BaseRegion> implements IRegionDao {
	

	public String getMaxCode(String parentCode) throws Exception {
		String hql = "SELECT MAX(code) FROM BaseRegion WHERE parentCode=?";
		Object[] params = {
				parentCode
		};
		try {
			return this.queryString(hql, params);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "0";
	}

	public int getMaxOrder(String parentCode) throws Exception {
		String hql = "SELECT MAX(orderNum) FROM BaseRegion WHERE parentCode=?";
		Object[] params = {
				parentCode
		};
		try {
			return this.queryInt(hql, params);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}


	public List<BaseRegion> getTreeRoot(String code) {
		String hql = null;
		if(code.equalsIgnoreCase("'ALL'")){
			hql = "FROM BaseRegion WHERE parentCode='0' ORDER BY orderNum ASC";
		}
		else {
			hql = "FROM BaseRegion WHERE code in("+code+") AND status=1 ORDER BY orderNum ASC";
		}

		try {
			return this.find(hql, null);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public List<BaseRegion> getRootChild(String pcode, boolean status) {
		String hql = "FROM BaseRegion WHERE parentCode=?";
		Object[] params = {
				pcode
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
