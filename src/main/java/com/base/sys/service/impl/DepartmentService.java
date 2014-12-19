package com.base.sys.service.impl;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.base.model.BaseDepartment;
import com.base.sys.dao.IDepartmentDao;
import com.base.sys.service.IDepartmentService;
import com.pub.util.IGridModel;

@Service(value="departmentService")
public class DepartmentService implements IDepartmentService {

	private IDepartmentDao departmentDao;
	
	public void setDepartmentDao(IDepartmentDao departmentDao) {
		this.departmentDao = departmentDao;
	}

	public boolean delete(Serializable id) {
		BaseDepartment t = this.get(id);
		try {
			this.departmentDao.delete(t);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	
	
	public BaseDepartment get(Serializable id) {
		try {
			return this.departmentDao.get(BaseDepartment.class, id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	
	
	
	public IGridModel pageQuery(IGridModel model, Map map) {
		return null;
	}

	
	
	
	public boolean save(BaseDepartment t) {
		try {
			// 设置显示顺序
			int order = this.departmentDao.getMaxOrder(t.getParentId());
			t.setDeptOrder(order+1);
			
			// dicValue的值没有指定,则设置与主键的值一致.
			if(t.getSimpleCode()==null || t.getSimpleCode().equals("")){
				t.setSimpleCode("default null");
				t = this.departmentDao.insert(t);
				t.setSimpleCode(t.getPkDeptId().toString());
				this.departmentDao.update_marge(t);
			} 
			else {
				this.departmentDao.save(t);
			}
			return true;
		} 
		catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	
	
	
	public boolean update(BaseDepartment t) {
		try {
			BaseDepartment dept = this.get(t.getParentId());
			if( !dept.getParentId().equals(t.getParentId()) ){  //更改了父节点,重新更改显示顺序
				int order = this.departmentDao.getMaxOrder(t.getParentId());
				t.setDeptOrder(order+1);;
			}
			this.departmentDao.update_marge(t);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}
	
	
	

	public List<BaseDepartment> getTreeRoot(String simpleCode) {
		if(simpleCode.indexOf(",")>-1){
			String[] arr = simpleCode.split(",");
			for(int i=0; i<arr.length; i++){
				if(i==0){
					simpleCode = "'"+arr[i]+"'";
					continue;
				}
				simpleCode = simpleCode+",'"+arr[i]+"'";
			}
		}else{
			simpleCode = "'"+simpleCode+"'";
		}
		return this.departmentDao.getTreeRoot(simpleCode);
	}
	
	

	public List<BaseDepartment> getRootChild(Long parentId, boolean deptState) {
		return this.departmentDao.getRootChild(parentId, deptState);
	}

	public BaseDepartment findById(Long id) {
		try {
			return this.departmentDao.findById(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public List<BaseDepartment> getTreeRoot(String simpleCode,
			boolean deptState) {
		return null;
	}


}
