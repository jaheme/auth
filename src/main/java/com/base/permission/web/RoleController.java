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

import com.base.extend.ModuleActions;
import com.base.model.BaseRole;
import com.base.model.BaseRoleAction;
import com.base.permission.service.IRoleActionsService;
import com.base.permission.service.IRoleService;
import com.base.permission.service.IRoleUserService;
import com.base.util.BaseUtil;
import com.pub.util.IGridModel;
import com.pub.util.ext.ExtGridModel;


@Controller
@RequestMapping(value="/role")
public class RoleController {
	
	private static final Log log = LogFactory.getLog(RoleController.class);

	private IRoleService roleService;
	private IRoleUserService roleUserService;
	private IRoleActionsService roleActionsService;

	public void setRoleService(IRoleService roleService) {
		this.roleService = roleService;
	}
	
	public void setRoleUserService(IRoleUserService roleUserService) {
		this.roleUserService = roleUserService;
	}


	public void setRoleActionsService(IRoleActionsService roleActionsService) {
		this.roleActionsService = roleActionsService;
	}

	/** 获得给定稳定码的节点 */
	@RequestMapping(value="/getTreeRoot/{pid}", method=RequestMethod.POST)
	@ResponseBody
	public List<Map<String, Object>> getTreeRoot(@PathVariable("pid")Long pid,
			HttpServletRequest req){
		log.debug("getTreeRoot===== pid=" + pid);
		
		List<BaseRole> mlist = new ArrayList<BaseRole>();
		if(pid == 0){
			BaseRole role = BaseUtil.getUserRole(req);
			mlist.add(role);
		} else {
			mlist = this.roleService.getTreeRoot(pid);
		}
		return this.buildTreeMenu(mlist);
	}
	
	/** 构建树形需要的数据结构*/
	private List<Map<String, Object>> buildTreeMenu(List<BaseRole> mlist){
		Map<String, Object> map = null;
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		for(Iterator<BaseRole> it = mlist.iterator(); it.hasNext();){
			BaseRole mod = it.next();
			map = new HashMap<String, Object>();
			map.put("roleId", mod.getId());
			map.put("parentId", mod.getParentId());
			map.put("roleName", mod.getRoleName());
			map.put("roleDesc", mod.getMark());
			list.add(map);
			map = null;
		}
		return list;
	}
	
	
	
	/** 获得给定稳定码的节点 for maximgb treegird 
	@RequestMapping(value="/getTreeRoot", method=RequestMethod.POST)
	@ResponseBody
	public List<Map<String, Object>> getTreeRoot(HttpServletRequest req){
		String id = req.getParameter("anode"); // active node
		log.info("getTreeRoot===== id=" + id);
		if(id == null || id.equals("")){
			id = "0";
		}
		List<PermissionRole> mlist = this.roleService.getTreeRoot(Long.parseLong(id));
		return this.buildTreeMenu(mlist);
	}
	
	
	private List<Map<String, Object>> buildTreeMenu(List<PermissionRole> mlist){
		Map<String, Object> map = null;
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		for(Iterator<PermissionRole> it = mlist.iterator(); it.hasNext();){
			PermissionRole mod = it.next();
			map = new HashMap<String, Object>();
			map.put("id", mod.getRoleId());
			map.put("roleName", mod.getRoleName());
			map.put("roleDesc", mod.getRoleDesc());
			map.put("_id", mod.getRoleId());
			map.put("_parent", mod.getParentId());
			map.put("_is_leaf", false);
			list.add(map);
			map = null;
		}
		return list;
	}*/
	
	
	@RequestMapping(value="/addOrUpdate")
	@ResponseBody
	public Map<String, Object> addOrUpdate(BaseRole mod){
		boolean flag = false;
		if(mod.getId()==null || mod.getId().equals("")){
			if(mod.getParentId() == null || mod.getParentId().equals("")){
				mod.setParentId(0L);
			}
			flag = this.roleService.save(mod);
		}
		else {
			flag = roleService.update(mod);
		}

		Map<String, Object> map = new HashMap<String, Object>(1);
		map.put("success", flag);
		return map;
	}
	
	
	@RequestMapping(value="/loadById/{id}")
	@ResponseBody
	public Map<String, Object> loadById(@PathVariable("id")Long id){
		BaseRole mod = this.roleService.get(id);
		
		Map<String, Object> map = new HashMap<String, Object>(2);
		map.put("success", mod==null? false : true);
		map.put("data", mod);
		return map;
	}
	
	
	
	@RequestMapping(value="/deleteById/{id}")
	@ResponseBody
	public Map<String, Object> deleteById(@PathVariable("id")Long id){
		boolean flag = this.roleService.delete(id);
		Map<String, Object> map = new HashMap<String, Object>(1);
		map.put("success", flag);
		return map;
		
	}
	
	
	
	////////////////////////  角色的成员  角色与用户的关联处理 //////////
	
	/** 加载给定角色id的用户 */
	@RequestMapping(value="/user_list/{roleId}")
	@ResponseBody
	public IGridModel role_user_list(@PathVariable("roleId")Long roleId,ExtGridModel model){
		return this.roleUserService.role_user_list(model, roleId);
	}
	
	/** 让用户与角色建立关联 */
	@RequestMapping(value="/user/add")
	@ResponseBody
	public Map<String, Object> ru_addOrUpdate(HttpServletRequest req){
		String uid = req.getParameter("uid");
		String roleId = req.getParameter("roleId");
		boolean flag = this.roleUserService.save(uid, roleId);

		Map<String, Object> map = new HashMap<String, Object>(1);
		map.put("success", flag);
		return map;
	}
	
	/** 解除相互间的关联 */
	@RequestMapping(value="/user/deleteById")
	@ResponseBody
	public Map<String, Object> ru_deleteById(HttpServletRequest req){
		String ruid = req.getParameter("ruid");
		boolean flag = this.roleUserService.deletes(ruid);
		Map<String, Object> map = new HashMap<String, Object>(1);
		map.put("success", flag);
		return map;
	}
	
	/** 汇总用户已经关联的角色 */
	@RequestMapping(value="/ru/getUserRoles")
	@ResponseBody
	public IGridModel getUserRoles(HttpServletRequest req, 
			ExtGridModel model){
		String uid = req.getParameter("uid");
		return this.roleUserService.getUserRoles(model, uid);
	}
	
	
	/////////////////////////// 角色的权限  /////////////////
	
	/** 角色权限设置时的模块树型展示 */
	@RequestMapping(value="/role_module_tree", method=RequestMethod.POST)
	@ResponseBody
	public List<Map<String, Object>> role_module_tree(HttpServletRequest req){
		long node = 0;
		String nodeId = req.getParameter("node"); // ext默认传过来的参数,参数值是id
		if(nodeId == null ){
			node = 0;
		}
		node = Long.parseLong(nodeId);
		String r = req.getParameter("role");
		if(r==null || "".equals(r))
			return null;
		long roleId = Long.parseLong( req.getParameter("role") );
		List<ModuleActions> mlist = this.roleActionsService.role_module_tree(node, roleId);
		
		if(mlist != null ){
			List<BaseRoleAction> ulist = BaseUtil.getUserAction(req);
			Map<String, Object> map = null;
			List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
			for(Iterator<ModuleActions> it = mlist.iterator(); it.hasNext();){
				ModuleActions mod = it.next();
				
				if(BaseUtil.getUserId(req) > 1L){  // 系统管理员可以查看全部，不参与模块范围的过滤
					// 过滤可设置权限模块的范围，不超过当前登陆用户的权限。
					boolean allow = false;
					for(Iterator<BaseRoleAction> pit = ulist.iterator(); pit.hasNext();){
						BaseRoleAction pa = pit.next();
						if(pa.getModStable().equals(mod.getModStable())){
							allow = true;
							break;
						}
					}
					if(allow==false){
						continue;
					}
				}  // end if
				
//				log.info(mod.getModStable());
				map = new HashMap<String, Object>();				
				map.put("id", mod.getModId());
				map.put("modStable", mod.getModStable());
				map.put("modActions", mod.getModuleActions());
				map.put("text", mod.getModName());
				
				if(mod.isChecked()){
					map.put("checked", true);
				}
				
				if(mod.getModUrl()== null || mod.getModUrl().trim().equals("")){
					map.put("cls", "floder");
				}else {
					map.put("leaf", true);
				}
				list.add(map);
			}
			return list;
		}
		return null;
	}
	
	/** 角色设置后的保存, 解除的权限模块信息将从角色权限表中删除 */
	@RequestMapping(value="/roleActions/set")
	@ResponseBody
	public Map<String, Object> roleActions_setting(HttpServletRequest req){
		long roleId = Long.parseLong( req.getParameter("roleId") );
		String rmActions = req.getParameter("rmActions");
		log.info("role_action info: " + rmActions);
		boolean flag = this.roleActionsService.setting(roleId, rmActions);

		Map<String, Object> map = new HashMap<String, Object>(1);
		map.put("success", flag);
		return map;
	}
	
}
