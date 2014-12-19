package com.base.permission.dao.impl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.base.core.BaseJdbcDao;
import com.base.core.BaseSimpleDao;
import com.base.extend.RoleUser;
import com.base.model.BaseRole;
import com.base.model.BaseRoleAction;
import com.base.model.BaseRoleUser;
import com.base.permission.dao.IRoleDao;
import com.pub.util.IGridModel;

@SuppressWarnings("unchecked")
@Repository(value="roleDao")
public class RoleDao extends BaseSimpleDao implements IRoleDao {


	private BaseJdbcDao baseJdbcDao;
	public void setBaseJdbcDao(BaseJdbcDao baseJdbcDao) {
		this.baseJdbcDao = baseJdbcDao;
	}
	
	
	public List<BaseRole> getTreeRoot(Long pid) {
		String hql = "FROM BaseRole WHERE parentId=? ORDER BY id ASC";
		Object[] values = {
				pid
		};
		try {
			return this.find(hql, values);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}


	
	public List<BaseRoleUser> role_user_list(Long roleId){
		String hql = "FROM BaseRoleUser WHERE roleId=? ORDER BY userId";
		Object[] values = {
				roleId
		};
		try {
			return this.find(hql, values);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	
	
	
//	public IGridModel role_user_list(IGridModel model, Long roleId) throws Exception{
//		StringBuffer sql = new StringBuffer(180);
//		sql.append("SELECT {ru.*},{u.user_name}, {r.role_name}"); 
//		sql.append(" FROM permission_user_role ru, permission_user u,permission_role r");
//		sql.append(" WHERE ru.role_id="+roleId+" AND ru.role_id=r.role_id AND ru.user_id=u.user_id");
//		String cql = "SELECT COUNT(*) From PermissionUserRole WHERE roleId="+roleId;
//		model.setTotal(this.pageQueryCount(cql));
//		
//		SQLQuery q = this.getSession().createSQLQuery(sql.toString())
//			.addEntity("ru", RoleUser.class)
//			.addEntity("u", RoleUser.class)
//			.addEntity("r",RoleUser.class);
//		if(model.getLimit() > 0){
//			q.setFirstResult(model.getStart());
//			q.setMaxResults(model.getLimit());
//		}
//		model.setRows(q.list());
//		return model;
//	}

	
	public IGridModel role_user_list(IGridModel model, Long roleId) throws Exception{
		StringBuffer sql = new StringBuffer(180);
		sql.append("SELECT ru.*,u.userName, r.roleName, dept.simpleName"); 
		sql.append(" FROM base_role_user ru, base_user u,base_role r, base_department dept");
		sql.append(" WHERE ru.roleId=? AND ru.roleId=r.id");
		sql.append(" AND ru.userId=u.id AND u.deptId=dept.id");
		Object[] params = {
			roleId
		};
		List list = this.baseJdbcDao.query(sql.toString(), new RUMapper(), params);
		model.setRows(list);
		return model;
		
	}
	

	
	
	public class RUMapper implements RowMapper<RoleUser>{

		public RoleUser mapRow(ResultSet rs, int arg1) throws SQLException {
			RoleUser mod = new RoleUser();
			mod.setUrId(rs.getLong("urId"));
			mod.setUserId(rs.getLong("userId"));
			mod.setRoleId(rs.getLong("roleId"));
			mod.setRoleName(rs.getString("roleName"));
			mod.setUserName(rs.getString("userName"));
			mod.setSimpleName(rs.getString("simpleName"));
			return mod;
		}
	}
	


	public List<BaseRoleAction> role_modules(String modStables, long roleId){
		String hql = "FROM BaseRoleAction WHERE roleId=? AND modStable in("+modStables+")";
		Object[] params = {
				roleId 
		};

		try {
			return this.find(hql, params);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}


	public List<BaseRoleAction> role_all_modules(long roleId){
		String hql = "FROM BaseRoleAction WHERE roleId=?";
		Object[] params = {
				roleId
		};

		try {
			return this.find(hql, params);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	

	public List<BaseRole> getRolesByUserId(long userId) {
		String hql = "FROM BaseRole WHERE id IN(SELECT roleId FROM BaseRoleUser WHERE userId=?)";
		Object[] params = {
				userId
		};

		try {
			return this.find(hql, params);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public List<BaseRoleAction> getActionsByLoginUser(long roleId) {
		String hql = "FROM BaseRoleAction WHERE roleId=?";
		Object[] params = {
				roleId
		};

		try {
			return this.find(hql, params);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public IGridModel getUserRoles(IGridModel model, String uid){
		String hql = "SELECT r FROM BaseRoleUser ru, BaseRole r WHERE ru.userId in("+uid+") AND ru.roleId=r.id ORDER BY ru.userId";
		try {
			List list = this.find(hql, null);
			model.setRows( list );
			model.setTotal( list==null? 0 : list.size() );
			return model; 
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
