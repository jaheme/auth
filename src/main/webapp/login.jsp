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
    
    <script type="text/javascript" src="<%=path%>/ext/3.3.1/ext-base.js"></script>
    <script type="text/javascript" src="<%=path%>/ext/3.3.1/ext-all.js"></script>
	<script type="text/javascript" src="<%=path%>/ext/3.3.1/ext-lang-zh_CN.js"></script>
	<script type="text/javascript" src="<%=path%>/ext/Ext.ux.override.js"></script>
		<SCRIPT type="text/javascript" src="<%=path %>/js/base/util.js"></script>
		<SCRIPT type="text/javascript" src="<%=path %>/js/psw.js"></script>
    <!-- 包含的桌面js文件 -->
	<script type="text/javascript">
		var path = "<%=path%>";
  	</script>
  </head>
  <body scroll="no" >
  	<div id="login_box"></div>
     <script type="text/javascript">

     var _form = new Ext.FormPanel({
         frame: true,
         labelAlign: 'right',
         labelWidth: 85,
         width:350,
         height:210,
         waitMsgTarget: true,
         items: [
             new Ext.form.FieldSet({
                 title: '系统登录',
                 autoHeight: true,
                 collapsible: true,
                 height:420,
                 defaultType: 'textfield',
                 items: [ {
                 	name: 'account', 
                 	fieldLabel: '登 录 帐 号', 
                 	allowBlank:false, 
                 	emptyText: '请输入', 
                 	width:190,
                 	maxLength: 30
                 },{
                 	name: 'password',
                 	fieldLabel: '帐 号 密 码',  
                 	allowBlank:false, 
                 	inputType: 'password',
                 	width:190
                 }]
             })
         ]
     });
     
 	var cancel_btn = _form.addButton({
 		text: '重置',
     	padding: '150px',
     	scale: 'medium',
     	width: 100,
     	handler: function(){
     		_form.getForm().reset();
     	}
 	}); 
 	
     var save_btn = _form.addButton({
     	text: ' 登 录 ',
     	scale: 'medium',
     	width: 100,
     	handler: function(){
 			var f = _form.getForm();
 			if(f.isValid()){
 				getByName("password").value=MD5(getByName("password").value);
 				f.submit({
 					waitMsg : '正在登录，请稍后……',
 	    			waitTitle : '提示',
 	    			url : path+'/do/ajax_login',
 	    			method:'POST',
 	    			success:function(form,action){
 	    				document.location.href="desktop.jsp"
 	    			},
 	    			failure:function(form,action){
 	    				Ext.Msg.alert("登录提示", action.result.data);
 	    				//Ext.Msg.alert('提示','保存失败--错误类型: '+action.failureType);
 	                }
 				});
 			}
     	}
 	});  // end save_btn
     
 	var _win = new Ext.Window({
 		renderTo:'login_box',
 		layout:'fit',
 		width:'380',
 		height:'300',
 		pageX: document.body.clientWidth/3,
		pageY: document.body.clientHeight/3,
 		resizable:false,
 		shadow:true,
 		closable:true,
 		items:[_form]
 	});
 	_win.show();
  	</script>

  </body>
</html>
