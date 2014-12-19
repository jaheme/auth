package com.base.sys.dao.impl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.base.core.BaseJdbcDao;
import com.base.extend.TreeModel;
import com.base.sys.dao.ITreeDao;



@SuppressWarnings("unchecked")
@Repository(value="treeDao")
public class TreeDao implements ITreeDao{
	
	private BaseJdbcDao baseJdbcDao;
	public void setBaseJdbcDao(BaseJdbcDao baseJdbcDao) {
		this.baseJdbcDao = baseJdbcDao;
	}
	
	
	public List getAreaTree(Long pid) throws Exception {
//		String sql = "SELECT * FROM base_organization WHERE pid="+pid;
		StringBuffer sql = new StringBuffer(300);
		sql.append("with area1 as(select * from base_region where parentCode=?");
		sql.append(" union all select base_region.* from area1, base_region where area1.code = base_region.parentCode)");
		sql.append("select * from area1");
		Object[] params = {
				pid
		};
		List list = this.baseJdbcDao.query(sql.toString(), new AreaMapper(), params);
		return list;
	}
	
	
	public List getAllArea(){
		StringBuffer sql = new StringBuffer(300);
		sql.append("with area1 as(select * from base_region where parentCode='0'");
		sql.append(" union all select base_region.* from area1, base_region where area1.code = base_region.parentCode)");
		sql.append("select * from area1");
		Object[] params = {
				
		};
		try {
			return this.baseJdbcDao.query(sql.toString(), new AreaMapper(), params);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	

	
	public List getAreas(String code) throws Exception {
		String sql = null;
		if(code == null){
			sql = "SELECT * FROM base_region WHERE parentCode=? order by orderNum asc";
		} else {
			sql = "SELECT * FROM base_region WHERE parentCode=? order by orderNum asc";
		}
		Object[] values = {
				code==null? "0" : code
		};
		return this.baseJdbcDao.query(sql, new AreaMapper(), values);
		
	}

	public class AreaMapper implements RowMapper<TreeModel>{

		public TreeModel mapRow(ResultSet rs, int arg1) throws SQLException {
			TreeModel mod = new TreeModel();
			mod.setId(rs.getLong("id"));
			mod.setCode(rs.getString("code"));
			mod.setText(rs.getString("name"));
			mod.setParentId(rs.getString("parentCode"));
			return mod;
		}
	}

}
