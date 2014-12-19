package com.base.sys.service;

import java.util.List;

import com.base.core.IBaseSimpleService;
import com.base.model.BaseDictionary;
import com.pub.util.IGridModel;

public interface IDictionaryService extends IBaseSimpleService<BaseDictionary> {

	/**
	 * 通过给出的dicValue值(多个以","分隔),取得对应的字典元素.
	 * 若要取全部,请设置dicValue的值为ALL
	 * @param dv
	 * @return
	 */
	public List<BaseDictionary> getTreeRoot(String dv);
	
	
	/**
	 * 通过pid取得其下面的节点集合
	 * @param pid 父id
	 * @param divState 是否提取无效状态的,true:提取, false:不提取
	 * @return 
	 */
	public List<BaseDictionary> getRootChild(Long pid, boolean dicState);
	
	
	public IGridModel combox_list(IGridModel model, String simpleCode);
	
}
