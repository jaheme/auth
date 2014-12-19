package com.base.sys.service.impl;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.base.model.BaseDictionary;
import com.base.sys.dao.IDictionaryDao;
import com.base.sys.service.IDictionaryService;
import com.pub.util.IGridModel;

@Service(value="dictionaryService")
public class DictionaryService implements IDictionaryService {

	private IDictionaryDao dictionaryDao;
	
	public void setDictionaryDao(IDictionaryDao dictionaryDao) {
		this.dictionaryDao = dictionaryDao;
	}

	public boolean delete(Serializable id) {
		BaseDictionary t = this.get(id);
		try {
			this.dictionaryDao.delete(t);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	
	
	public BaseDictionary get(Serializable id) {
		try {
			return this.dictionaryDao.get(BaseDictionary.class, id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	
	
	
	public IGridModel pageQuery(IGridModel model, Map map) {
		return null;
	}

	
	
	
	public boolean save(BaseDictionary t) {
		try {
			// 设置显示顺序
			int order = this.dictionaryDao.getMaxOrder(t.getDicPid());
			t.setDicOrder(order+1);
			
			// dicValue的值没有指定,则设置与主键的值一致.
			if(t.getDicValue()==null || t.getDicValue().equals("")){
				t.setDicValue("default null");
				t = this.dictionaryDao.insert(t);
				t.setDicValue(t.getPkDicId().toString());
				this.dictionaryDao.update_marge(t);
			} 
			else {
				this.dictionaryDao.save(t);
			}
			return true;
		} 
		catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	
	
	
	public boolean update(BaseDictionary t) {
		try {
			BaseDictionary old = this.get(t.getPkDicId());
			if( !old.getDicPid().equals(t.getDicPid()) ){  //更改了父节点,重新更改显示顺序
				int order = this.dictionaryDao.getMaxOrder(t.getDicPid());
				t.setDicOrder(order+1);
			}
			this.dictionaryDao.update_marge(t);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}
	
	
	

	public List<BaseDictionary> getTreeRoot(String dv) {
		if(dv.indexOf(",")>-1){
			String[] arr = dv.split(",");
			for(int i=0; i<arr.length; i++){
				if(i==0){
					dv = "'"+arr[i]+"'";
					continue;
				}
				dv = dv+",'"+arr[i]+"'";
			}
		}else{
			dv = "'"+dv+"'";
		}
		return this.dictionaryDao.getTreeRoot(dv);
	}
	
	

	public List<BaseDictionary> getRootChild(Long pid, boolean dicState) {
		return this.dictionaryDao.getRootChild(pid, dicState);
	}

	public IGridModel combox_list(IGridModel model, String dicValue) {
		try {
			List<BaseDictionary> list = this.getTreeRoot(dicValue);
			if(list != null && list.size() > 0 && list.get(0) != null){
				BaseDictionary d = list.get(0);
				model.setRows(this.getRootChild(d.getPkDicId(), false));
				return model;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}


	
}