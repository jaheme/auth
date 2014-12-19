package com.base.permission.dao.impl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.base.core.BaseJdbcDao;
import com.base.core.BaseSimpleDao;
import com.base.model.BaseUser;
import com.base.permission.dao.IPUserDao;
import com.pub.util.IGridModel;

@Repository(value="puserDao")
public class PUserDao extends BaseSimpleDao<BaseUser> implements IPUserDao {

	private BaseJdbcDao baseJdbcDao;
	
	public void setBaseJdbcDao(BaseJdbcDao baseJdbcDao) {
		this.baseJdbcDao = baseJdbcDao;
	}
	
	public boolean check_account(BaseUser puser) {
		String hql = "FROM BaseUser WHERE account=?";
		Object[] values = null;
		if( puser.getId()!=null || !"".equals(puser.getId()) ){
			hql += " AND id<>?";
			values = new Object[]{
				puser.getAccount(),
				puser.getId()
			};
		}
		if(values == null){
			values = new Object[]{
				puser.getAccount()
			};
		}
		List list = null;
		try {
			list = find(hql, values);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if(list!=null && list.size()>0){
			return true;
		}
		return false;
	}

	public IGridModel combox_list(IGridModel model,
			Map<String, String> map) {
		String hql = "From BaseUser";
		try {
			if(model.getLimit() > 0){
				String cql = "SELECT COUNT(*) From BaseUser";
				model.setTotal(this.pageQueryCount(cql));
				model.setRows( this.pageQuery(hql, model.getStart(), model.getLimit()) );
				return model;
			}
			model.setRows(this.find(hql));
			return model;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public IGridModel dept_user_list(IGridModel model, Long deptId) {
		String hql = "From BaseUser WHERE deptId=? ORDER BY id";
		Object[] values =  {
			deptId
		};
		try {
			if(model.getLimit() > 0){
				String cql = "SELECT COUNT(*) From BaseUser WHERE deptId=?";
				model.setTotal(this.pageQueryCount(cql));
				model.setRows( this.pageQuery(hql, model.getStart(), model.getLimit(), values) );
				return model;
			}
			model.setRows(this.find(hql, values));
			return model;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}


	public IGridModel pageQuery(IGridModel model, Map map) throws Exception{
		String c = this.getCondition_hql(map);
		String count_sql = "SELECT COUNT(*) " + c;
		String sql = "SELECT u.*, d.SimpleName dept_name, bo.name adminAreaName "+ c;
		if(model.getSort() != null){
			sql += " Order BY u."+model.getSort()+" "+model.getDir();
		}
		int total = this.baseJdbcDao.pageQueryCount(count_sql);
		model.setTotal(total);
		List list = this.baseJdbcDao.pageQuery(sql, new PUMapper(), model);
		model.setRows(list);
		return model;
		
	}
	private String getCondition_hql(Map map){
		StringBuffer count_sb = new StringBuffer(30);
		count_sb.append(" FROM base_user u, base_department d, base_region bo ");
		count_sb.append(" WHERE u.deptId=d.id AND u.adminArea=bo.code AND u.deptId in("+map.get("ids")+")");
		return count_sb.toString();
	}
	
	public class PUMapper implements RowMapper<PUser>{

		public PUser mapRow(ResultSet rs, int arg1) throws SQLException {
			PUser t = new PUser();
			t.setId(rs.getLong("id"));
			t.setAccount(rs.getString("account"));
			t.setUserName(rs.getString("userName"));
			t.setGender(rs.getString("gender"));
			t.setDeptId(rs.getLong("deptId"));
			t.setDeptName(rs.getString("dept_name"));
			t.setuState(rs.getString("uState"));
			t.setOutDate(rs.getString("outDate"));
			t.setCreateDate(rs.getString("createDate"));
			t.setBirthday(rs.getString("birthday"));
			t.setuType(rs.getString("uType"));
			t.setAdminArea(rs.getString("adminArea"));
			t.setAdminAreaName(rs.getString("adminAreaName"));
			t.setAdminObject(rs.getString("adminObject"));
//			t.setAdminObjectName(rs.getString("adminObjectName"));
			
			return t;
		}
	}
	
	
	public class PUser extends BaseUser{
		private String deptName;
		private String adminAreaName;
		private String adminObjectName;

		public String getDeptName() {
			return deptName;
		}

		public void setDeptName(String deptName) {
			this.deptName = deptName;
		}

		public String getAdminAreaName() {
			return adminAreaName;
		}

		public void setAdminAreaName(String adminAreaName) {
			this.adminAreaName = adminAreaName;
		}

		public String getAdminObjectName() {
			return adminObjectName;
		}

		public void setAdminObjectName(String adminObjectName) {
			this.adminObjectName = adminObjectName;
		}
		
		
	}
	
	
}
