package com.base.sys.web;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.base.model.BaseRole;
import com.base.model.BaseRoleAction;
import com.base.model.BaseUser;
import com.base.sys.service.IUserLoginService;
import com.base.util.BaseUtil;
import com.base.util.Constants;
import com.pub.util.DateUtil;



@Controller
public class UserLoginController {
	
	private static final Log log = LogFactory.getLog(UserLoginController.class);
	private IUserLoginService userLoginService;
	

	public void setUserLoginService(IUserLoginService userLoginService) {
		this.userLoginService = userLoginService;
	}

	@RequestMapping(value="/ajax_login", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> ajax_login(BaseUser pUser,Model model,
			HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		Map<String, Object> result_map = new HashMap<String, Object>(2);
		if(pUser.getPassword()==null || pUser.getAccount()==null){
			result_map.put("data", "用户和密码错误");
			result_map.put("success", false);
			return result_map;
		}
		
		BaseUser u = this.userLoginService.check_login(pUser.getAccount(), pUser.getPassword());
		if(u == null ){
			result_map.put("data", "用户不存在");
			result_map.put("success", false);
			return result_map;
		}
		else if(!u.getPassword().equals(pUser.getPassword())){
			model.addAttribute("userAccount", pUser.getAccount());
			result_map.put("data", "密码错误");
			result_map.put("success", false);
			log.info("input password： "+pUser.getPassword());
			log.info("user's password： "+u.getPassword());
			return result_map;
		}
		
		// 较验是否过期, 过期日期的当天是仍然可以登录的！
		String outoffDate = u.getOutDate();
		if(outoffDate != null && !"".equals(outoffDate)){
			int outDate = Integer.parseInt(outoffDate);
			int currDate = Integer.parseInt(DateUtil.yyyyMMdd());
			if(currDate >= outDate) {
				result_map.put("data", "您好，您的登录帐户已过期。");
				result_map.put("success", false);
				return result_map;
			}
		}
		
		List<BaseRole> rlist = this.userLoginService.getRolesByLoginUser(u.getId());
		if(rlist==null || rlist.size()==0){
			result_map.put("data", "用户还未初始化,请联系管理员");
			result_map.put("success", false);
			return result_map;
		}
		BaseRole role = rlist.get(0);// 默认取角色的第一个，取得其权限信息
		long roleId = role.getId();
		List<BaseRoleAction> alist = this.userLoginService.getActionsByLoginUser(roleId);
		request.getSession().setAttribute(Constants.USER_INFO_ACTION, alist);
		// 加入session缓存
		request.getSession().setAttribute(Constants.USER_INFO_ROLE, role);
		request.getSession().setAttribute(Constants.USER_INFO_SESSION, u);
		
		result_map.put("success", true);
		return result_map;
	}
	

	/**
	 * 校验登录请求
	 * @param pUser
	 * @param model
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/check_login", method=RequestMethod.POST)
	public String check_login(BaseUser pUser,Model model,
			HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		if(pUser.getPassword()==null || pUser.getAccount()==null){
			model.addAttribute("msg", "用户和密码错误");
			return "forward:../login.jsp";
		}
		
		BaseUser u = this.userLoginService.check_login(pUser.getAccount(), pUser.getPassword());
		if(u == null ){
			model.addAttribute("msg", "用户不存在");
			return "forward:../login.jsp";
		}
		else if(!u.getPassword().equals(pUser.getPassword())){
			model.addAttribute("userAccount", pUser.getAccount());
			model.addAttribute("msg", "密码错误");
			log.info("input password： "+pUser.getPassword());
			log.info("user's password： "+u.getPassword());
			return "forward:../login.jsp";
		}
		
		// 较验是否过期, 过期日期的当天是仍然可以登录的！
		String outoffDate = u.getOutDate();
		if(outoffDate != null && !"".equals(outoffDate)){
			int outDate = Integer.parseInt(outoffDate);
			int currDate = Integer.parseInt(DateUtil.yyyyMMdd());
			if(currDate >= outDate) {
				model.addAttribute("msg", "您好，您的登录帐户已过期。");
				return "forward:../login.jsp";
			}
		}
		
		List<BaseRole> rlist = this.userLoginService.getRolesByLoginUser(u.getId());
		if(rlist==null || rlist.size()==0){
			model.addAttribute("msg", "用户还未初始化,请联系管理员");
			return "forward:../login.jsp";
		}
		BaseRole role = rlist.get(0);// 默认取角色的第一个，取得其权限信息
		long roleId = role.getId();
		List<BaseRoleAction> alist = this.userLoginService.getActionsByLoginUser(roleId);
		request.getSession().setAttribute(Constants.USER_INFO_ACTION, alist);
		// 加入session缓存
		request.getSession().setAttribute(Constants.USER_INFO_ROLE, role);
		request.getSession().setAttribute(Constants.USER_INFO_SESSION, u);
		
		return "redirect:../desktop.jsp";
	}
	
	
	@RequestMapping(value="/user/getUserInfo")
	@ResponseBody
	public Map<String, Object> getUserInfo(
			HttpServletRequest req) throws Exception {

		Map<String, Object> result_map = new HashMap<String, Object>(2);
		result_map.put("success", true);
		result_map.put("data", BaseUtil.getLogined(req));
		return result_map;
	}
	
	
	/**
	 * 登录用户选择操作的角色
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/user/getUserRoles")
	@ResponseBody
	public Map<String, Object> getUserRoles(
			HttpServletRequest req) throws Exception {
		// 查询登录用户关联的角色列表，因为可以与多个角色关联
		List<BaseRole> list = this.userLoginService.getRolesByLoginUser(BaseUtil.getUserId(req));
		
		// 当前使用的角色
		BaseRole role = BaseUtil.getUserRole(req);
		
		List<Map<String, Object>> result = new ArrayList(list.size());
		Map<String, Object> map = null;
		for(BaseRole t: list){
			map = new HashMap<String, Object>(2);
			map.put("roleId", t.getId());
			map.put("roleName", t.getRoleName());
			result.add(map);
		}
		Map<String, Object> result_map = new HashMap<String, Object>(3);
		result_map.put("success", true);
		result_map.put("current_role", role);
		result_map.put("data", result);
		result_map.put("roleActions", BaseUtil.getUserAction(req));
		return result_map;
	}
	
	/**
	 * 切换角色的响应，角色不同，权限的操作控制不同。
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/user/setUserRole")
	@ResponseBody
	public Map<String, Object> setUserRole(
			HttpServletRequest req) throws Exception {

		String role = req.getParameter("roles");
		long roleId = Long.parseLong(role);
		
		// 提取所选择角色的权限信息
		List<BaseRoleAction> alist = this.userLoginService.getActionsByLoginUser(roleId);
		req.getSession().setAttribute(Constants.USER_INFO_ACTION, alist);
		
		// 设置此角色信息到session
		List<BaseRole> list = this.userLoginService.getRolesByLoginUser(BaseUtil.getUserId(req));
		for(BaseRole pr : list){
			if(pr.getId().equals(roleId)){
				req.getSession().setAttribute(Constants.USER_INFO_ROLE, pr);
				break;
			}
		}
		
		Map<String, Object> result_map = new HashMap<String, Object>(2);
		result_map.put("success", true);
		return result_map;
	}
	
	
	/**
	 * 权限较验时按用户浏览的模块加载对应的权限信息
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/user/getActionByStable")
	@ResponseBody
	public Map<String, Object> getActionByStable(
			HttpServletRequest request) throws Exception {

		String stable = request.getParameter("stable");
		String action = BaseUtil.getUserActionByStable(request, stable);
		log.info("module stable code："+stable);
		log.info("permission info："+action);
		Map<String, Object> map = new HashMap<String, Object>(3);
		map.put("success", true);
		map.put("data", action);
		return map;
	}
	
	
	/**
	 * 注销/退出登录
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/out_login")
	@ResponseBody
	public Map<String, Object> out_login(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		request.getSession().removeAttribute(Constants.USER_INFO_SESSION);
		request.getSession().removeAttribute(Constants.USER_INFO_ACTION);
		request.getSession().removeAttribute(Constants.USER_INFO_ROLE);
		log.debug("******************** user logout ***************");
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("success", true);
		return map;
	}
	
	@RequestMapping(value="/is_login")
	@ResponseBody
	public Map<String, Object> is_login(BaseUser pUser,Model model,
			HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		Map<String, Object> map = new HashMap<String, Object>();
		if(request.getSession().getAttribute(Constants.USER_INFO_SESSION) == null){
			map.put("success", false);
			return map;
		}
		map.put("success", true);
		return map;
	}
	
}
