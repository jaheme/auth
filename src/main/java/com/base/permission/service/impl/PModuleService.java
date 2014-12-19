package com.base.permission.service.impl;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.base.model.BaseDictionary;
import com.base.model.BaseModule;
import com.base.permission.dao.IPModuleDao;
import com.base.permission.service.IPModuleService;
import com.base.sys.dao.IDictionaryDao;
import com.pub.util.IGridModel;


@Service(value="pmoduleService")
public class PModuleService implements IPModuleService {
	
	private IPModuleDao pmoduleDao;
	private IDictionaryDao dictionaryDao;
	
	public void setDictionaryDao(IDictionaryDao dictionaryDao) {
		this.dictionaryDao = dictionaryDao;
	}

	
	public List<BaseModule> getAllModules(){
		return this.pmoduleDao.getAllModules();
	}
	
	
	public boolean delete(Serializable id) {
		try {
			BaseModule pm = this.pmoduleDao.get(BaseModule.class, id);
			this.pmoduleDao.delete(pm);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public BaseModule get(Serializable id) {
		try {
			return this.pmoduleDao.get(BaseModule.class, id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public IGridModel pageQuery(IGridModel model, Map map) {
		// TODO Auto-generated method stub
		return null;
	}

	public boolean save(BaseModule t) {
		try {
			int order = this.pmoduleDao.getMaxOrder(t.getModPid());
			t.setModOrder(order+1);
			
//			BaseModule mod = this.get(t.getModPid());
//			t.setModLevel(mod==null? 1 : mod.getModLevel()+1);
			this.pmoduleDao.save(t);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public boolean update(BaseModule t) {
		try {
			BaseModule mod = this.get(t.getModId());
			if( mod.getModPid().equals(t.getModPid()) ){  // 没有更改上层模块
				this.pmoduleDao.update_marge(t);
			}else{
				// 更改显示顺序
				int order = this.pmoduleDao.getMaxOrder(t.getModPid());
				t.setModOrder(order+1);
				// 更改模块层次
				mod = this.get(t.getModPid());
//				t.setModLevel(mod==null? 1 : mod.getModLevel()+1);
				mod = null;
				this.pmoduleDao.update_marge(t);
			}
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public void setPmoduleDao(IPModuleDao pmoduleDao) {
		this.pmoduleDao = pmoduleDao;
	}

	public List<BaseModule> getModels(long pid, boolean isVisible) {
		
		return this.pmoduleDao.getModels(pid,isVisible);
	}

	public boolean check_stable(String code) {
		return this.pmoduleDao.check_stable(code);
	}

	public List<BaseModule> getModel_treeMenu(String code) {
		if(code.indexOf(",")>-1){
			String[] arr = code.split(",");
			for(int i=0; i<arr.length; i++){
				if(i==0){
					code = "'"+arr[i]+"'";
					continue;
				}
				code = code+",'"+arr[i]+"'";
			}
		}else{
			code = "'"+code+"'";
		}
		return this.pmoduleDao.getModel_treeMenu(code);
	}

	public List<BaseDictionary> getActions(String dicValue) {
		try {
			dicValue = "'"+dicValue+"'";
			List<BaseDictionary> list = this.dictionaryDao.getTreeRoot(dicValue);
			if(list != null && list.size() > 0 && list.get(0) != null){
				BaseDictionary d = list.get(0);
				return this.dictionaryDao.getRootChild(d.getPkDicId(), false);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}


	public boolean setOrder(Long[] ids, Integer[] orders) {
		try {
			for(int i=0; i< ids.length; i++){
				BaseModule t = this.get(ids[i]);
				t.setModOrder(orders[i]);
//				System.out.println(t.getModName());
				this.pmoduleDao.update(t);
			}
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	
	
}
