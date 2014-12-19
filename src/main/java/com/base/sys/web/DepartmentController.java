package com.base.sys.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.base.model.BaseDepartment;
import com.base.sys.service.IDepartmentService;
import com.base.util.BaseUtil;


/**
 * 字典
 * @author rhine
 *
 */
@Controller
@RequestMapping(value="department")
public class DepartmentController {

	private static final Log log = LogFactory.getLog(DepartmentController.class);
	private IDepartmentService departmentService;
	public void setDepartmentService(IDepartmentService departmentService) {
		this.departmentService = departmentService;
	}
	
	/** 获得给定稳定码的节点 */
	@RequestMapping(value="/getTreeRoot/{simpleCode}", method=RequestMethod.POST)
	@ResponseBody
	public List<Map<String, Object>> getTreeRoot(@PathVariable("simpleCode")String simpleCode,
			HttpServletRequest req){
		log.info("simpleCode======" + simpleCode );
//		List<BaseDepartments> mlist = this.departmentService.getTreeRoot(simpleCode);
		long id = BaseUtil.getUserDeptId(req);
		BaseDepartment dept = this.departmentService.findById(id);
		List<BaseDepartment> mlist = new ArrayList<BaseDepartment>(2);
		mlist.add(dept);
//		List<BaseDepartments> mlist = this.departmentService.getRootChild(dept.getParentId(), false);
		if(mlist == null ){
			return null;
		}
		return this.buildTreeMenu(mlist);
	}
	
	
	
	/** 各模块加载树型子节点时调用 isVisible: 是否显示隐藏状态下的节点 1:是 */
	@RequestMapping(value="/getRootChild/{isVisible}/{pid}", method=RequestMethod.POST)
	@ResponseBody
	public List<Map<String, Object>> getRootChild(@PathVariable("pid")Long pid,
			@PathVariable("isVisible")boolean isVisible,
			HttpServletRequest req){
//		BaseUtil.viewRequestParams(req);
		List<BaseDepartment> mlist = new ArrayList<BaseDepartment>();
		if(pid.equals(0L)){  // 修改。删除等操作后需要重新加载树时会传0过来
			pid=BaseUtil.getUserDeptId(req);
			BaseDepartment dept = this.departmentService.findById(pid); // 加载用户的部门节点
			mlist.add(dept);
		} else {
			mlist = this.departmentService.getRootChild(pid, isVisible);
		}
		
		if(mlist == null ){
			return null;
		}
		return this.buildTreeMenu(mlist);
	}
	
	
	/** 构建树形需要的数据结构*/
	private List<Map<String, Object>> buildTreeMenu(List<BaseDepartment> mlist){
		Map<String, Object> map = null;
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		for(Iterator<BaseDepartment> it = mlist.iterator(); it.hasNext();){
			BaseDepartment mod = it.next();
			map = new HashMap<String, Object>();
			map.put("pkDeptId", mod.getPkDeptId());
			map.put("simpleCode", mod.getSimpleCode());
			map.put("parentId", mod.getParentId());
			map.put("simpleName", mod.getSimpleName());
			map.put("fullName", mod.getFullName());
//			map.put("masterName", mod.getPermissionUser().getUserName());
//			log.info("masterName---"+mod.getPermissionUser().getUserName());
			map.put("deptOrder", mod.getDeptOrder());
			map.put("deptState", mod.getDeptState());
//			map.put("cls", "floder");
			list.add(map);
			map = null;
		}
		return list;
	}
	
	
	@RequestMapping(value="/addOrUpdate")
	@ResponseBody
	public Map<String, Object> addOrUpdate(BaseDepartment mod){
		boolean flag = false;
		if(mod.getPkDeptId()==null || mod.getPkDeptId().equals("")){
			if(mod.getParentId()==null || mod.getParentId().equals("")){
				mod.setParentId(0L);
			}
			flag = this.departmentService.save(mod);
		}
		else {
			flag = departmentService.update(mod);
		}

		Map<String, Object> map = new HashMap<String, Object>(1);
		map.put("success", flag);
		return map;
	}
	
	
	@RequestMapping(value="/loadById/{id}")
	@ResponseBody
	public Map<String, Object> loadById(@PathVariable("id")Long id){
		BaseDepartment mod = this.departmentService.findById(id);
		
		Map<String, Object> map = new HashMap<String, Object>(2);
		map.put("success", mod==null? false : true);
		map.put("data", mod);
		return map;
	}
	
	
	
	@RequestMapping(value="/deleteById/{id}")
	@ResponseBody
	public Map<String, Object> deleteById(@PathVariable("id")Long id, HttpServletRequest req){
		boolean flag = false;
		if(!id.equals(BaseUtil.getUserDeptId(req))){ // 当前登录用户所在的部门不能删除
			flag = this.departmentService.delete(id);
		}
		Map<String, Object> map = new HashMap<String, Object>(3);
		map.put("success", flag);
		map.put("msg", flag? "" : "当前用户的部门不能删除！");
		return map;
		
	}
	
	
	
	
	
}
