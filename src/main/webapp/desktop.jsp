<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<!-- 
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache"> -->
		<title>权限系统</title>
		
    <link rel="stylesheet" type="text/css" href="<%=path%>/ext/resources/css/ext-all.css" /><!-- 主css文件 -->
    <link rel="stylesheet" type="text/css" href="<%=path%>/css/desktop/desktop.css" /><!-- 桌面的css文件 -->
    
    <script type="text/javascript" src="<%=path%>/ext/3.3.1/ext-base.js"></script>
    <script type="text/javascript" src="<%=path%>/ext/3.3.1/ext-all.js"></script>
	<script type="text/javascript" src="<%=path%>/ext/3.3.1/ext-lang-zh_CN.js"></script>
	<script type="text/javascript" src="<%=path%>/ext/Ext.ux.override.js"></script>
    <!-- 包含的桌面js文件 -->
    <script type="text/javascript" src="<%=path%>/js/desktop/StartMenu.js"></script>
    <script type="text/javascript" src="<%=path%>/js/desktop/TaskBar.js"></script>
    <script type="text/javascript" src="<%=path%>/js/desktop/Desktop.js"></script>
    <script type="text/javascript" src="<%=path%>/js/desktop/App.js"></script>
    <script type="text/javascript" src="<%=path%>/js/desktop/Module.js"></script>
    <script type="text/javascript" src="<%=path%>/js/desktop/sample.js"></script>
	  	<script type="text/javascript" src="js/base/HashMap.js"></script>
    <script type="text/javascript" src="<%=path%>/js/index.js"></script>
	<script type="text/javascript">
		var path = "<%=path%>";
  </script>
  </head>
  <body scroll="no" >
     
    <div id="x-desktop">
    <!-- 显示钟表的div -->
        <div  style="float:right;display:block;">
<%--         <div id="clock" style="display:block;"> <EMBED src="http://static.yupsky.com/flash/clock/002.swf" width=300 height=200 type="application/x-shockwave-flash" wmode="transparent" >--%>
<%--          </EMBED>--%>
<%--          </div>--%>
          <br/>
       
        </div>  
       
    <!-- 桌面快捷方式的div -->   
    <dl id="x-shortcuts">  
	<!-- 
         <dt id="match-win-shortcut">
            <a href="#"><img src="<%=path%>/image/desktop/datamach.jpg" />
            <div><font face="宋体" size="2">数据比对管理</font></div></a>
        </dt> 
    -->
        
         
        <dt id="system-manager-shortcut">
            <a href="#"><img src="<%=path%>/image/desktop/im48x48.gif" />
            <div><font face="宋体" size="2">系统管理</font></div></a>
        </dt>
   
    </dl>
</div>


<div id="ux-taskbar">
	<div id="ux-taskbar-start"></div>
	<div id="ux-taskbuttons-panel"></div>
	<div class="x-clear"></div>
</div>

  </body>
</html>
