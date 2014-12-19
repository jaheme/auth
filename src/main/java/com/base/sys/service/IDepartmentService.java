package com.base.sys.service;

import java.util.List;

import com.base.core.IBaseSimpleService;
import com.base.model.BaseDepartment;

public interface IDepartmentService extends IBaseSimpleService<BaseDepartment> {

	/**
	 * 通过给出的simpleCode值(多个以","分隔),取得对应的字典元素.
	 * 若要取全部,请设置simpleCode的值为ALL
	 * @param simpleCode
	 * @return
	 */
	public List<BaseDepartment> getTreeRoot(String simpleCode);
	
	public List<BaseDepartment> getTreeRoot(String simpleCode, boolean deptState);
	
	
	/**
	 * 通过pid取得其下面的节点集合
	 * @param parentId 父id
	 * @param deptState 是否提取无效状态的,true:提取, false:不提取
	 * @return 
	 */
	public List<BaseDepartment> getRootChild(Long parentId, boolean deptState);
	
	public BaseDepartment findById(Long id);
	
}
