package com.base.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/**
 * 过滤器,检验用户是否已经登录
 * 
 * @author rhine
 * 
 */
public class MyHandlerInterceptor extends HandlerInterceptorAdapter {

	private static final Log log = LogFactory
			.getLog(MyHandlerInterceptor.class);;

	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		// 就简单判断了一下，如果要详细控制可以用spring security
		String url = request.getRequestURI();
		if (url.endsWith("_login"))
			return true;
		if (request.getSession() != null
				&& request.getSession().getAttribute(
						Constants.USER_INFO_SESSION) != null) {
			return true;
		}
		// 设置权限过滤

		log.info("xxxxxxxxxxxxxx  用户未登录  xxxxxxxxxxxxxx" + url);
		// ajax 登录超时请求
		if (isAjaxRequest(request)) {
			response.addHeader("sessionstatus", "timeout");
			return false;
		}

		/* 普通http请求session超时的处理 */
		response.sendRedirect("login.jsp");
		return false;

	}

	public static boolean isAjaxRequest(HttpServletRequest webRequest) {
		String requestedWith = webRequest.getHeader("X-Requested-With");
		return requestedWith != null ? "XMLHttpRequest".equals(requestedWith)
				: false;
	}

	public static boolean isAjaxUploadRequest(HttpServletRequest webRequest) {
		return webRequest.getParameter("ajaxUpload") != null;
	}

	/**
	 * 权限认证过滤
	 */
	private boolean permission(HttpServletRequest req, Object handler) {
		String stable = req.getParameter("stable");

		String actions = BaseUtil.getUserActionByStable(req, stable);
		if (actions != null) {
			return true;
		}

		return false;
	}

}
