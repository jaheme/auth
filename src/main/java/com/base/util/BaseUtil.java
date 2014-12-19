package com.base.util;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.base.model.BaseRole;
import com.base.model.BaseRoleAction;
import com.base.model.BaseUser;

public class BaseUtil {
	
	/** 返回登录用户的基本信息对象 */
	public static BaseUser getLogined(HttpServletRequest req){
		BaseUser user = null;
		user = (BaseUser)req.getSession().getAttribute(Constants.USER_INFO_SESSION);
		return user;
	}
	
	/** 返回登录用户的标识(ID) */
	public static Long getUserId(HttpServletRequest req){
		return getLogined(req).getId();
	}
	

	/** 返回登录用户的帐号 */
	public static String getUserAccount(HttpServletRequest req){
		return getLogined(req).getAccount();
	}
	
	/** 返回登录用户的部门标识(ID) */
	public static Long getUserDeptId(HttpServletRequest req){
		return getLogined(req).getDeptId();
	}
	
	
	/** 返回登录用户的权限列表信息 */
	public static List<BaseRoleAction> getUserAction(HttpServletRequest req){
		List<BaseRoleAction> list = null;
		list = (List<BaseRoleAction>)req.getSession().getAttribute(Constants.USER_INFO_ACTION);
		return list;
	}
	
	/** 返回登录用户的指定菜单的权限信息 */
	public static String getUserActionByStable(HttpServletRequest req, String stable){
		List<BaseRoleAction> list = null;
		list = (List<BaseRoleAction>)req.getSession().getAttribute(Constants.USER_INFO_ACTION);
		for(BaseRoleAction ra : list){
			if(ra.getModStable().equals(stable)){
				return ra.getModActions();
			}
		}
		return null;
	}
	
	
	/** 返回登录用户的角色信息,依用户与角色的关联情况，会有多个 */
	public static BaseRole getUserRole(HttpServletRequest req){
		BaseRole role = null;
		 role = (BaseRole)req.getSession().getAttribute(Constants.USER_INFO_ROLE);
		return role;
	}
	
	


	/**
	 * 新增时，自动生成/设置区域编码
	 * @param str 当前数据库中，此层级的最大编码
	 * @param len 编码的总长度
	 * @param levelLen 表示一个层级的编码长度：如3个字符表示一个层级
	 * @return String
	 */
	public static String nextCode(String str, int length, int levelLen){
		str = replaceEndZero(str, levelLen);
		
		StringBuffer buf = new StringBuffer(upCode(str));
		if(str.length() < length){
			for(int i=str.length(); i<length; i++){
				buf.append("0");
			}
		}
		return buf.toString();
	}
	
	private static String upCode(String str){
		if(str.length()>18){  // 超过Long型的数据范围
			String ts = str.substring(18, str.length());
//			System.out.println("ts="+ts);
			if(ts.startsWith("0")){  // 如果前面以0开头，parseLong会被省去
				int len = ts.length();
				Long tl = Long.parseLong(ts)+1;
//				System.out.println("tl="+tl);
				StringBuffer s = new StringBuffer(String.valueOf(tl));
				for(int i=s.length(); i<len; i++){
					s.insert(0, "0");
				}
//				System.out.println("s"+s);
				return str.substring(0, 18)+s.toString();
			}
			else {
				Long tl = Long.parseLong(ts)+1;
				return str.substring(0, 18)+tl;
			}
		}
		else {
			Long tl = Long.parseLong(str)+1;
			return String.valueOf(tl);
		}
	}
	

	/**
	 * 生成下一层级的编码 
	 * @param str 当前数据库中，此层级的最大编码
	 * @param len 编码的总长度
	 * @param levelLen 表示一个层级的编码长度：如3个字符表示一个层级
	 * @return 如果层级已经是最低，则返回null
	 */
	public static String nextLevelCode(String str, int length, int levelLen){
		str = replaceEndZero(str, levelLen);
		StringBuffer buf = new StringBuffer( str );
		if(buf.length() < length){
			buf.append("001");
			for(int i=buf.length(); i<length; i++){
				buf.append("0");
			}
			return buf.toString();
		}
		return null;
	}
	

	/** 移除字符串后面的所有零 */
	public static String replaceEndZero(String str, int levelLen){
		char[] chArr = str.toCharArray();
		char c = '0';
		int count = 0;
		int index = 0;
		for(int i=0; i< chArr.length; i++){
			if(chArr[i] == c){
				count++;
			} else {
				count = 0;
			}
			if(count >= levelLen){
				if( (i+1)%levelLen==0 ){
					index = (i-levelLen);
					break;
				}
			}
		}
		if(index > 0){
			str = str.substring(0, index+1);
//			System.out.println(str);
		}
		return str;
	}
	
	
	
	/**
	 * 查看request里头传过来哪些参数，前端使用ext或jquery这些组件时，会用来查看默认传参数。
	 * @param req
	 */
	public static void viewRequestParams(HttpServletRequest req){
		Iterator iterator = req.getParameterMap().entrySet().iterator(); 
		   while (iterator.hasNext()) {
		       Map.Entry entry = (Map.Entry) iterator.next(); 
		       System.out.println("request’s params: "+entry.getKey()+"  "+ entry.getValue());
		   }
	}
	
	
	public static void main(String[] args){
//		BaseUtil.
	}

}
