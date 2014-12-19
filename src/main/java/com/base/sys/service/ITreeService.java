package com.base.sys.service;

import java.util.List;

public interface ITreeService {

	public List getAreaTree(Long pid);
	
	
	public List getAreas(String code);
	
	public List getAllArea();
}
