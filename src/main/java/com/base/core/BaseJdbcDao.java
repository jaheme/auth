package com.base.core;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.pub.util.IGridModel;

@SuppressWarnings("unchecked")
@Repository(value = "baseJdbcDao")
public class BaseJdbcDao<T> {

	private static final Log log = LogFactory.getLog(BaseJdbcDao.class);

	private static final java.text.DecimalFormat df = new java.text.DecimalFormat(
			"0.000");

	private JdbcTemplate jdbcTemplate;

	public void setDataSource(DataSource dataSource) {
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}

	/**
	 * 分页查询： 实际是先查询符合条件的所有记录，然后根据分页条件来截取范围内的数据。
	 * 
	 * @param sql
	 *            只带查询条件,不带分页条件的sql
	 * @param rowMapper
	 * @param model
	 *            将通过它取得分页的信息和设置返回的信息
	 * @return IGridModel
	 * @throws Exception
	 */
	public List pageQuery(String sql, final RowMapper rowMapper,
			final IGridModel model) throws Exception {
		final int start = model.getStart();
		final int limit = model.getLimit() == 0 ? 99999999 : model.getLimit();
		log.debug("start: " + start);
		log.debug("limit: " + limit);
		log.debug("total: " + model.getTotal());
		log.info("pageQuery sql: " + sql);

		long st = System.nanoTime();
		// 如果是像这样不加上分页标识来查询，那count的查询是否可以省略，直接在这里的查询结果集中调用size()方法取得。
		final List list = new ArrayList(model.getLimit());
		this.jdbcTemplate.query(sql, new ResultSetExtractor() {
			public Object extractData(ResultSet rs) throws SQLException,
					DataAccessException {
				int i = 0;
				int end = start + limit;
				while (rs.next() && i < end) {
					if (i >= start) {
						list.add(rowMapper.mapRow(rs, i));
					}
					i++;
				}
				return list;
			}
		});
		long t = System.nanoTime() - st;
		log.info("- current query spent(ms): "
				+ df.format((double) t / 1000000));
		return list;
	}

	/**
	 * 分页查询+符合条件的记录数
	 * 
	 * @param sql
	 *            不带分页条件的sql
	 * @param rowMapper
	 * @param model
	 * @return
	 * @throws Exception
	 */
	public IGridModel pagingQuery(final String sql, final RowMapper rowMapper,
			final IGridModel model, final Object... values) throws Exception {
		final int start = model.getStart();
		final int limit = model.getLimit() == 0 ? 99999999 : model.getLimit();
		log.info("pagingQuery sql: " + sql);

		final List list = new ArrayList(model.getLimit());
		PreparedStatementCreator psc = new PreparedStatementCreator() {
			public PreparedStatement createPreparedStatement(
					Connection connection) throws SQLException {
				PreparedStatement ps = connection.prepareStatement(sql,
						// ResultSet.TYPE_SCROLL_INSENSITIVE,
						ResultSet.TYPE_SCROLL_SENSITIVE,
						ResultSet.CONCUR_READ_ONLY);
				if (values != null) {
					for (int i = 0, len = values.length; i < len; i++) {
						ps.setObject(i, values[i]);
					}
				}
				return ps;
			}
		};
		this.jdbcTemplate.query(psc, new ResultSetExtractor() {
			public Object extractData(ResultSet rs) throws SQLException,
					DataAccessException {
				int i = 0;
				// int end = start + limit;
				// while(rs.next() && i < end){
				// if(i >= start){
				// list.add(rowMapper.mapRow(rs, i));
				// }
				// i++;
				// }
				rs.absolute(start); // 直接将指针移到当前分页开始的索引位置, 分页较多时与上面有比较显著的性能提升。
				while (rs.next() && i < limit) {
					list.add(rowMapper.mapRow(rs, i));
					i++;
				}
				if (model.getTotal() == 0) { // 设置符合条件的数据总数目
					boolean hasRow = rs.last();
					if (hasRow) {
						model.setTotal(rs.getRow());
					}
				}
				return list;
			}
		});
		model.setRows(list);
		return model;
	}

	/**
	 * 查询满足条件的记录数
	 * 
	 * @param sql
	 * @return
	 * @throws Exception
	 */
	public int pageQueryCount(String sql) throws Exception {
		log.info("count sql: " + sql);
		return this.jdbcTemplate.queryForInt(sql);
	}

	/**
	 * 简单查询
	 * 
	 * @param sql
	 *            查询语句
	 * @param rowMapper
	 * @param values
	 *            查询参数
	 * @return
	 * @throws Exception
	 */
	public List query(String sql, final RowMapper rowMapper, Object... values)
			throws Exception {
		log.info(" query sql: " + sql);
		final List list = new ArrayList();
		this.jdbcTemplate.query(sql, values, new ResultSetExtractor() {
			public Object extractData(ResultSet rs) throws SQLException,
					DataAccessException {
				int i = 0;
				while (rs.next()) {
					list.add(rowMapper.mapRow(rs, i));
					i++;
				}
				return list;
			}
		});
		return list;
	}

	/**
	 * 以Map结构返回查询的数据 只支持单条记录！
	 * 
	 * @param sql
	 *            查询语句
	 * @param values
	 *            查询参数值数组
	 * @return Map<String, Object>
	 * @throws Exception
	 */
	public Map<String, Object> query(String sql, Object... values) {
		log.info(" query map sql: " + sql);
		try {
			return this.jdbcTemplate.queryForMap(sql, values);
		} catch (DataAccessException e) {
			// e.printStackTrace();
		}
		return null;
	}

	/**
	 * 更新语句
	 * 
	 * @param sql
	 *            sql 语句
	 * @param args
	 *            参数数组
	 * @return
	 * @throws Exception
	 */
	public boolean update(String sql, Object... args) {
		log.debug(" update sql: " + sql);
		int c = this.jdbcTemplate.update(sql, args);
		if (c > 0) {
			return true;
		}
		return false;
	}

	public boolean execute(String sql) {
		log.info(" execute sql: " + sql);
		try {
			this.jdbcTemplate.execute(sql);
			return true;
		} catch (DataAccessException e) {
			e.printStackTrace();
		}
		return false;
	}

}
