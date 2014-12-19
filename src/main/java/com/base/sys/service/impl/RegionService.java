package com.base.sys.service.impl;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.base.model.BaseRegion;
import com.base.sys.dao.IRegionDao;
import com.base.sys.service.IRegionService;
import com.pub.util.IGridModel;

@Service(value = "regionService")
public class RegionService implements IRegionService {

	private IRegionDao regionDao;

	public void setRegionDao(IRegionDao regionDao) {
		this.regionDao = regionDao;
	}

	public boolean save(BaseRegion t) {
		try {
			int order = this.regionDao.getMaxOrder(t.getParentCode());
			t.setOrderNum(order + 1);
			this.regionDao.save(t);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public boolean update(BaseRegion t) {
		try {
			BaseRegion old = this.get(t.getId());
			if (!old.getParentCode().equals(t.getParentCode())) { // 更改了父节点,重新更改显示顺序
				int order = this.regionDao.getMaxOrder(t.getParentCode());
				t.setOrderNum(order + 1);
			}
			this.regionDao.update_marge(t);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public boolean delete(Serializable id) {
		try {
			BaseRegion t = this.get(id);
			this.regionDao.delete(t);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public BaseRegion get(Serializable id) {
		try {
			return this.regionDao.get(BaseRegion.class, id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public IGridModel pageQuery(IGridModel gModel, Map map) {
		// TODO Auto-generated method stub
		return null;
	}

	public List<BaseRegion> getTreeRoot(String dv) {
		if (dv.indexOf(",") > -1) {
			String[] arr = dv.split(",");
			for (int i = 0; i < arr.length; i++) {
				if (i == 0) {
					dv = "'" + arr[i] + "'";
					continue;
				}
				dv = dv + ",'" + arr[i] + "'";
			}
		} else {
			dv = "'" + dv + "'";
		}
		return this.regionDao.getTreeRoot(dv);
	}

	public List<BaseRegion> getRootChild(String pcode, boolean status) {
		return this.regionDao.getRootChild(pcode, status);
	}

	public String getMaxCode(String parentCode) {
		try {
			String code = this.regionDao.getMaxCode(parentCode);
			return code;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

}
