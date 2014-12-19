package com.base.permission.dao;

import java.util.List;

import com.base.core.IBaseSimpleDao;
import com.base.model.BaseModule;

public interface IPModuleDao extends IBaseSimpleDao<BaseModule> {
	
	/**
	 * 系统容器启动时，加载所有的模块，缓存起来，以供调用。
	 * @return
	 */
	public List<BaseModule> getAllModules();
	
	public List<BaseModule> getModels(long pid, boolean isVisible);
	
	public List getModel_treeMenu(String code);
	/**
	 * 获得同一父类下的最大排序号
	 * @param parentId
	 * @return
	 * @throws Exception
	 */
	public int getMaxOrder(long parentId) throws Exception ;
	
	
	

	public boolean check_stable(String code);

}
