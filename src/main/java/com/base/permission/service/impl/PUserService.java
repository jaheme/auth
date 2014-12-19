package com.base.permission.service.impl;

import java.io.Serializable;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import com.base.model.BaseRoleUser;
import com.base.model.BaseUser;
import com.base.permission.dao.IPUserDao;
import com.base.permission.dao.IRoleDao;
import com.base.permission.service.IPUserService;
import com.base.sys.dao.IDepartmentDao;
import com.pub.util.IGridModel;

@Service(value="puserService")
public class PUserService implements IPUserService {

	private static final Log log = LogFactory.getLog(PUserService.class);
	
	private IPUserDao puserDao;
	private IDepartmentDao departmentDao;
	private IRoleDao roleDao;


	public void setPuserDao(IPUserDao puserDao) {
		this.puserDao = puserDao;
	}
	
	public void setRoleDao(IRoleDao roleDao) {
		this.roleDao = roleDao;
	}
	
	public void setDepartmentDao(IDepartmentDao departmentDao) {
		this.departmentDao = departmentDao;
	}



	public boolean change_psw(long userId, String psw) {
		try {
			BaseUser t = this.puserDao.get(BaseUser.class, userId);
			t.setPassword(psw);
			this.puserDao.update_marge(t);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}



	public boolean check_account(BaseUser puser) {
		return this.puserDao.check_account(puser);
	}



	public boolean delete(Serializable id) {
		try {
			BaseUser t = this.puserDao.get(BaseUser.class, id);
			this.puserDao.delete(t);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}
	
	public boolean save(BaseUser t) {
		try {
			this.puserDao.save(t);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}
	
	public boolean update(BaseUser t) {
		try {
			this.puserDao.update(t);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}



	public BaseUser get(Serializable id) {
		
		try {
			return this.puserDao.get(BaseUser.class, id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}


	public IGridModel pageQuery(IGridModel gModel, Map map) {
//		String count_hql = "SELECT COUNT(*) FROM PermissionUser";
//		String hql = "FROM PermissionUser";
//		if(gModel.getSort() != null){
//			hql += " Order BY "+gModel.getSort()+" "+gModel.getDir();
//		}
//		try {
//			int total = this.puserDao.pageQueryCount(count_hql);
//			List<PermissionUser> rows = this.puserDao.pageQuery(hql, gModel.getStart(), gModel.getLimit());
//			log.info("记录数: " + total);
//			gModel.setTotal(total);
//			gModel.setRows(rows);
//			return gModel;
//			
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
		try {
			Long id = Long.parseLong(map.get("deptId").toString());
			String ids = this.departmentDao.findChildsId(id);
			map.put("ids", ids);
			return this.puserDao.pageQuery(gModel, map);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}


	
	public IGridModel combox_list(IGridModel model,
			Map<String, String> map) {
		return this.puserDao.combox_list(model, map);
	}

	
	
	public IGridModel dept_user_list(IGridModel model, Long deptId, Long roleId) {
		model = this.puserDao.dept_user_list(model, deptId);
		if(model != null && model.getRows() != null){
			List<BaseUser> ulist = (List<BaseUser>)model.getRows();
			List<BaseRoleUser> rlist = this.roleDao.role_user_list(roleId);
			for(Iterator<BaseRoleUser> it = rlist.iterator(); it.hasNext();){
				BaseRoleUser ru = it.next();
				for(Iterator<BaseUser> uit = ulist.iterator(); uit.hasNext();){
					BaseUser u = uit.next();
					if(u.getId().equals(ru.getUserId())){
						uit.remove();
						break;
					}
				}
			}
		}
		
		return model;
	}

//	private 

	
	
}
