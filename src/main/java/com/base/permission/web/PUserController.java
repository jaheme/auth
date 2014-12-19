package com.base.permission.web;

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

import com.base.model.BaseUser;
import com.base.permission.service.IPUserService;
import com.base.util.BaseUtil;
import com.pub.util.DateUtil;
import com.pub.util.IGridModel;
import com.pub.util.ext.ExtGridModel;

/**
 * 用户管理
 * @author rhine
 *
 */
@Controller
public class PUserController {

	private static final Log log = LogFactory.getLog(PUserController.class);
	
	private IPUserService puserService;

	

	
	@RequestMapping(value="puser_list/{deptId}", method=RequestMethod.POST)
	@ResponseBody
	public IGridModel user_list(@PathVariable("deptId")Long deptId, 
			ExtGridModel gModel, 
			HttpServletRequest req){
		log.info("当前部门索引: " +  deptId);
		if(deptId==0){
			deptId = BaseUtil.getUserDeptId(req);
		}
		Map map = new HashMap();
		map.put("deptId", deptId);
		IGridModel gm = this.puserService.pageQuery(gModel, map);
		
		return gm;
	}
	
	
	
	@RequestMapping(value="puser_addOrUpdate")
	@ResponseBody
	public Map<String, Object> addOrUpdate(BaseUser puser){
		boolean flag = false;
		
		flag = this.puserService.check_account(puser);
		if( flag ){
			Map<String, Object> map = new HashMap<String, Object>(2);
			map.put("success", false);
			map.put("msg", "帐户已存在,请换一个.");
			return map;
		}
		
		if( puser.getId()==null || puser.getId().equals("")){ // 界面默认值为0
//			puser.setUserId(UUID.randomUUID().toString());
			puser.setCreateDate(DateUtil.getDate(null));
			flag = this.puserService.save(puser);
		}
		else {
			flag = puserService.update(puser);
		}

		Map<String, Object> map = new HashMap<String, Object>(1);
		map.put("success", flag);
		return map;
	}
	
	@RequestMapping(value="puser_load/{userId}")
	@ResponseBody
	public Map<String, Object> loadById(@PathVariable("userId")Long id){
		BaseUser puser = this.puserService.get(id);
		Map<String, Object> map = new HashMap<String, Object>(1);
		map.put("success", puser==null? false : true);
		map.put("data", puser);
		return map;
		
	}
	
	@RequestMapping(value="puser_chang_psw/{userId}")
	@ResponseBody
	public Map<String, Object> deleteById(@PathVariable("userId")Long id,
			HttpServletRequest req){
		String psw = req.getParameter("psw");
		boolean flag = this.puserService.change_psw(id, psw);
		Map<String, Object> map = new HashMap<String, Object>(1);
		map.put("success", flag);
		return map;
		
	}
	
	@RequestMapping(value="puser_del/{userId}")
	@ResponseBody
	public Map<String, Object> deleteById(@PathVariable("userId")Long id){
		boolean flag = this.puserService.delete(id);
		Map<String, Object> map = new HashMap<String, Object>(1);
		map.put("success", flag);
		return map;
		
	}
	
	

	public void setPuserService(IPUserService puserService) {
		this.puserService = puserService;
	}
	
	
	/*******************  外部调用  *****************/
	@SuppressWarnings("unchecked")
	@RequestMapping(value="puser/list")
	@ResponseBody
	public IGridModel outer_list(ExtGridModel gModel){
		IGridModel gm = this.puserService.combox_list(gModel, null);
		Object obj = gm.getRows();
		if(obj != null){
			List<BaseUser> ulist = (List<BaseUser>)obj;
			List list = new ArrayList();
			Map map = null;
			for(Iterator<BaseUser> it = ulist.iterator(); it.hasNext();){
				BaseUser u = it.next();
				map = new HashMap();
				map.put("userId", u.getId());
				map.put("userAccount", u.getAccount());
				map.put("userName", u.getUserName());
				list.add(map);
			}
			gModel.setRows(list);
			return gModel;
		}
		return null;
	}
	
	
	@RequestMapping(value="dept_user/{deptId}/{roleId}", method=RequestMethod.POST)
	@ResponseBody
	public IGridModel dept_user_list(@PathVariable("deptId")Long deptId, 
			@PathVariable("roleId")Long roleId, 
			ExtGridModel gModel){
		// 根据部门id,取得可用于设置的用户列表
//		log.info("部门id: " +  deptId);
//		log.info("roleId: " +  roleId);
		IGridModel gm = this.puserService.dept_user_list(gModel, deptId, roleId);
		
		return gm;
	}
	
	
	
	
	
	
	
	
	
	
}
