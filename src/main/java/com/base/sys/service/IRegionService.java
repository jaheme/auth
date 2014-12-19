package com.base.sys.service;

import java.util.List;

import com.base.core.IBaseSimpleService;
import com.base.model.BaseRegion;

public interface IRegionService extends IBaseSimpleService<BaseRegion> {

	/**
	 * 
	 * @param parentCode
	 * @return 正常：code <br/>  异常：null <br/> 没值：0 
	 */
	public String getMaxCode(String parentCode);
	
	public List<BaseRegion> getTreeRoot(String dv);
	
	
	public List<BaseRegion> getRootChild(String pcode, boolean status);
}
