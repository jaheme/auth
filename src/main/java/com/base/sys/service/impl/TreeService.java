package com.base.sys.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.base.sys.dao.ITreeDao;
import com.base.sys.service.ITreeService;

@Service(value="treeService")
public class TreeService implements ITreeService {
	
	private ITreeDao treeDao;
	
	
	public void setTreeDao(ITreeDao treeDao) {
		this.treeDao = treeDao;
	}


	public List getAreaTree(Long pid){
		try {
			return this.treeDao.getAreaTree(pid);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	
	public List getAreas(String code){
		try {
			return this.treeDao.getAreas(code);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
		
	}


	public List getAllArea() {
		return this.treeDao.getAllArea();
	}
	
}
