<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title></title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<!-- 
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache"> -->
	<script type="text/javascript" src="<%=path %>/js/base/sys/department.js"></script> 
    <script type="text/javascript">
    	var path = "<%=path%>";
    </script>
	
	</head> 
<body>
	<table id="table1" cellspacing="3" cellpadding="10" border="0" align="center">
			<tbody>
				<tr>
					<td id="dic_treegrid" valign="top">
					</td>
				</tr>
			</tbody>
		</table>
</body>
</html>
