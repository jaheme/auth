package com.base.sys.dao;

import java.util.List;

import com.base.core.IBaseSimpleDao;
import com.base.model.BaseDepartment;

public interface IDepartmentDao extends IBaseSimpleDao<BaseDepartment> {

	public List<BaseDepartment> getRootChild(Long pid, boolean deptState);
	
	public List<BaseDepartment> getTreeRoot(String simpleCode);
//	public List<BaseDepartments> getTreeRoot(String simpleCode, boolean deptState);
	
	/**
	 * 获得同一父类下的最大排序号
	 * @param parentId
	 * @return
	 * @throws Exception
	 */
	public int getMaxOrder(long parentId) throws Exception ;
	
	
	public BaseDepartment findById(Long id)throws Exception ;
	
	/** 获取已知部门的下面所有子部门列表 */
	public List<BaseDepartment> findChilds(Long id)throws Exception ;
	
	/** 获取已知部门的下面所有子部门的ID，以","分隔 */
	public String findChildsId(Long id)throws Exception ;
	
	
}