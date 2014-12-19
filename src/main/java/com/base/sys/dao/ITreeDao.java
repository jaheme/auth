package com.base.sys.dao;

import java.util.List;

public interface ITreeDao {

	public List getAreaTree(Long pid) throws Exception;
	
	/**
	 * 查找指定code的子地区
	 * @param code 如果code的值为null，则查找sn is null的记录。
	 * @return
	 * @throws Exception
	 */
	public List getAreas(String code) throws Exception;
	
	public List getAllArea();
	
}
