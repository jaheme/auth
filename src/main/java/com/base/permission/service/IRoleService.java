package com.base.permission.service;

import java.util.List;

import com.base.core.IBaseSimpleService;
import com.base.model.BaseRole;

public interface IRoleService extends IBaseSimpleService<BaseRole> {

	public List<BaseRole> getTreeRoot(Long pid);
	
}
