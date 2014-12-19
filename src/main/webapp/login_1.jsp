<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<title>权限系统</title>
<style type="text/css">
body {
	background-repeat: no-repeat;
	background-color: #9CDCF9;
	background-position: 0px 0px;
}
.font {
	font-size: 12px;
	text-decoration: none;
	color: #999999;
	line-height: 20px;
}
td {
	font-size: 12px;
	color: #007AB5;
}
form {
	margin: 1px;
	padding: 1px;
}
input {
	border: 0px;
	height: 26px;
	color: #007AB5;
	.
	unnamed1
	{
	border
	:
	thin
	none
	#FFFFFF;
}
a:link {
	text-decoration: none;
	color: #008EE3
}
-->
</style>
</head>
	<body onload="createCode()">
		<table border="0" align="center" cellpadding="0" cellspacing="0" style="margin-top: 120px">
			<tr>
				<td width="353" height="259" align="center" valign="bottom"
					background="<%=path %>/images/login_1.gif">
					<table width="90%" border="0" cellspacing="3" cellpadding="0">
						<tr>
							<td align="right" valign="bottom" style="color: #05B8E4">
								Power by
								<a href="/" target="_blank">FLYPIG</a>
								Copyright 2012
							</td>
						</tr>
					</table>
				</td>
				<td width="220" background="<%=path %>/images/login_2.gif">
				<form action="<%=path %>/do/check_login" method="post" name="loginform" id="login_form">
					<table width="210" border="0" align="center" cellpadding="2" cellspacing="0">
						<tr>
							<td height="50" colspan="2" align="left">
								<input type="hidden" name="password"/>
								&nbsp;
							</td>
						</tr>
						<tr>
							<td width="60" height="40" align="left">
								登陆帐户
							</td>
							<td>
								<input name="account" id="account" type="TEXT" value="${account}"
									style="background: url(<%=path %>/images/login_6.gif) repeat-x; border: solid 1px #27B3FE; font-size:18; height: 25px; width:150px; background-color: #FFFFFF"
									/>
							</td>
						</tr>
						<tr>
							<td height="40" align="left">
								帐户密码
							</td>
							<td>
								<input name="psw" id="psw" TYPE="PASSWORD" value=""
									style="background: url(<%=path %>/images/login_6.gif) repeat-x; border: solid 1px #27B3FE; font-size:18; height: 25px; width:150px; background-color: #FFFFFF"
									/>
							</td>
						</tr>
						<tr>
							<td height="30">
								验 证 码
							</td>
							<td>
								<input name="Code" type="text" id="validCode" size="4"
									style="background: url(<%=path %>/images/login_6.gif) repeat-x; border: solid 1px #27B3FE; font-size:18; height: 25px; background-color: #FFFFFF"
									maxlength="4"/>
								<input type="text" name="codePic" readonly="readonly" id="checkCode" onclick="createCode()"
							style="width: 45px; font-size:16;height=25px; cursor: pointer; margin-left:15px;" />	
								
							</td>
						</tr>
							<td colspan="2" style="padding-top:20px" align="center">
								<input type="button"  id="button" onclick="javascript:dosubmit()"
									style="background: url(<%=path %>/images/login_5.gif) no-repeat"
									value=" 登  陆 "/>
								<input type="reset" name="Submit" 
									style="background: url(<%=path %>/images/login_5.gif) no-repeat;"
									value=" 取  消 "/>
							</td>
						<tr>
							<td height="20" colspan="2" align="center"> 
								<span id="alert_msg" style="padding-left:30px;color:#FF0000">${msg}</span>
							</td>
						<tr>
					</table>
				</form>
				</td>
				<td width="133" background="<%=path %>/images/login_3.gif">
					&nbsp;
				</td>
			</tr>
			<tr>
				<td height="161" colspan="3" background="<%=path %>/images/login_4.gif"></td>
			</tr>
		</table>
		<script type="text/javascript">
			var path="<%=path %>";
		</script>
		<SCRIPT type="text/javascript" src="<%=path %>/js/psw.js"></script>
		<SCRIPT type="text/javascript" src="<%=path %>/js/login.js"></script>
	</body>
</html>