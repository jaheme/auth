<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title></title>
	
	<script type="text/javascript" src="<%=path %>/js/psw.js"></script>
	<script type="text/javascript" src="<%=path %>/js/base/permission/puserManager.js"></script> 
    <script type="text/javascript">
    	var path = "<%=path%>";
    </script>
</head> 
<body>
	<table id="table1" cellspacing="3" cellpadding="10" border="0" align="center">
			<tbody>
				<tr>
					<td id="dept_treegrid" valign="top">
						
					</td>
					<td id="user-grid" valign="top">
						
					</td>
				</tr>
			</tbody>
		</table>
	<div id="user-form-win" style="padding:5 5 0 5"></div>
	<div id="psw-form-win" style="padding:5 5 0 5"></div>
	<div id="area_div" style="padding:5 5 0 5"></div>
	
</body>
</html>
