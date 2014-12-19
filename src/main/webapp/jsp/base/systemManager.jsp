<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<!-- 
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache"> -->

		<link rel="stylesheet" type="text/css" href="<%=path%>/ext/resources/css/ext-all.css" />
		<link rel="stylesheet" type="text/css" href="<%=path%>/css/style.css" />
    	<link rel="stylesheet" type="text/css" href="<%=path %>/js/ux/treegrid/treegrid.css" rel="stylesheet" />

		<script type="text/javascript" src="<%=path%>/ext/3.3.1/ext-base.js"></script>
		<script type="text/javascript" src="<%=path%>/ext/3.3.1/ext-all.js"></script>
		<script type="text/javascript" src="<%=path%>/ext/3.3.1/ext-lang-zh_CN.js"></script>
		<script type="text/javascript" src="<%=path%>/ext/Ext.ux.override.js"></script>
		<script type="text/javascript" src="<%=path %>/ext/ext-basex.js"></script> 
		<script type="text/javascript" src="<%=path %>/js/base/util.js"></script> 
	     <script type="text/javascript" src="<%=path %>/js/ux/treegrid/TreeGridSorter.js"></script>
	     <script type="text/javascript" src="<%=path %>/js/ux/treegrid/TreeGridColumnResizer.js"></script>
	     <script type="text/javascript" src="<%=path %>/js/ux/treegrid/TreeGridNodeUI.js"></script>
	     <script type="text/javascript" src="<%=path %>/js/ux/treegrid/TreeGridLoader.js"></script>
	     <script type="text/javascript" src="<%=path %>/js/ux/treegrid/TreeGridColumns.js"></script>
	     <script type="text/javascript" src="<%=path %>/js/ux/treegrid/TreeGrid.js"></script>
		<script type="text/javascript" src="<%=path %>/js/public/select_department.js"></script> 
		<script type="text/javascript" src="<%=path %>/js/public/select_dictionary.js"></script> 
		<script type="text/javascript" src="<%=path %>/ext/checkboxTree.js"></script> 
		<script type="text/javascript" src="<%=path %>/js/base/HashMap.js"></script> 
		<script type="text/javascript" src="<%=path %>/js/base/tree_menu.js"></script> 
		<script type="text/javascript" src="<%=path %>/js/base/permission.js"></script> 

		<style type="text/css">
		</style>

		<script type="text/javascript">
    	var path = "<%=path%>";
    	var load_pid = 'sys';
		</script>
	</head>
	<body>
	<!-- 
		<div id='top-logo'>
			<div id="headdiv">
				<img src="images/top-logo.png" width="194" height="60">
			</div>
		</div>
 -->
		<div id='aboutDiv'
			style='height: 500; width: 100%; text-align: center; line-height: 300px'>
			<h1>
				欢迎您！！！
			</h1>
		</div>
		
		
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
			},1000)
		</script>
	<script type="text/javascript" src="<%=path %>/js/public/combox_user.js"></script> 
	</body>
</html>
