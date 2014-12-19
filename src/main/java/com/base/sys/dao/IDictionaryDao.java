package com.base.sys.dao;

import java.util.List;

import com.base.core.IBaseSimpleDao;
import com.base.model.BaseDictionary;

public interface IDictionaryDao extends IBaseSimpleDao<BaseDictionary> {


	public List<BaseDictionary> getRootChild(Long pid, boolean dicState);

	/** 多个pid以","隔开 */
	public List<BaseDictionary> getRootChild(String pid, boolean dicState);
	
	public List<BaseDictionary> getTreeRoot(String dicValue);
	
	/**
	 * 通过给定的引用值, 取得其下面的子节点集合
	 * @param dicValue 引用值
	 * @param dicState 是否显示处于无效状态的节点.true:显示
	 * @return
	 */
	public List<BaseDictionary> getChildByDicValue(String dicValue, boolean dicState);
	
	/**
	 * 获得同一父类下的最大排序号
	 * @param parentId
	 * @return
	 * @throws Exception
	 */
	public int getMaxOrder(long parentId) throws Exception ;
}
