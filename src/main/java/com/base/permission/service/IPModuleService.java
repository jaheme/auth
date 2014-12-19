package com.base.permission.service;

import java.util.List;

import com.base.core.IBaseSimpleService;
import com.base.model.BaseDictionary;
import com.base.model.BaseModule;

public interface IPModuleService extends IBaseSimpleService<BaseModule> {

	public List<BaseModule> getAllModules();
	
	/** 加载给定稳定码的节点,多个码以","间隔 */
	public List<BaseModule> getModel_treeMenu(String code);

	
	/** 加载功能模块,在界面上的树型上显示出来
	 * @param node ID 也就是要取得模块集合的父ID的值
	 * @param isVisible 是否加载设置了"不显示"的菜单, true: 全加载
	 * @return
	 */
	public List<BaseModule> getModels(long node, boolean isVisible);
	
	public List<BaseDictionary> getActions(String dicValue);
	
	public boolean check_stable(String code);
	
	/**
	 * 更新排序
	 * @param ids
	 * @param orders
	 * @return
	 */
	public boolean setOrder(Long[] ids, Integer[] orders);
	
}
