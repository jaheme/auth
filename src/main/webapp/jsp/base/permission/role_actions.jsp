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
	<script type="text/javascript" src="<%=path %>/js/base/permission/role_actions.js"></script> 
	
	</head> 
<body>
	<table id="table1" cellspacing="3" cellpadding="10" border="0" align="center">
			<tbody>
				<tr>
					<td id="role_treegrid" valign="top">
						
					</td>
					<td id="rm_treegrid" valign="top">
						
					</td>
				</tr>
			</tbody>
		</table>
	  <div id="loading-mask"></div>
		<div id="loading">
			<div class="loading-indicator">
				<img src='../../images/extanim32.gif' style="margin-right:8px;" align="absmiddle"/>正在加载,请稍候...
			</div>
		</div>
		<script type="text/javascript">
			setTimeout(function(){
				Ext.get('loading').remove();
				Ext.get('loading-mask').fadeOut({remove:true});
			},500)
		</script>
</body>
</html>
