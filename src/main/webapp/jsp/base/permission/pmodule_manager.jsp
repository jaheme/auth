<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title></title>
	<script type="text/javascript" src="<%=path %>/js/base/permission/pmodule_manager.js"></script> 
    <script type="text/javascript">
    	var path = "<%=path%>";
    </script>
	
	</head> 
<body>
	<table id="table1" cellspacing="3" cellpadding="10" border="0" align="center">
			<tbody>
				<tr>
					<td id="left-top" valign="top">
						
					</td>
					<td id="right-top" valign="top">
						
					</td>
				</tr>
				<tr>
					<td id="left-low">
					</td>
					<td id="right-low">
					</td>
				</tr>
			</tbody>
		</table>
	<div id="sort-win"> <input type="hidden" id="sort_ids"/> </div>
</body>
</html>
