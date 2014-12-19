package com.base.sys.dao;

import java.util.List;

import com.base.core.IBaseSimpleDao;
import com.base.model.BaseRegion;

public interface IRegionDao extends IBaseSimpleDao<BaseRegion> {
	
	/**
	 * 获取当前给定编码为父编码的最大编码值。
	 * @param parentCode 父编码值
	 * @return 如果没有结果：返回0   如果是表中第一条记录，也是返回0
	 * @throws Exception
	 */
	public String getMaxCode(String parentCode) throws Exception;

	public int getMaxOrder(String parentCode) throws Exception ;
	
	
	public List<BaseRegion> getTreeRoot(String dv);
	
	
	public List<BaseRegion> getRootChild(String pcode, boolean status);

}
