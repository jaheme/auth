//var winTitle='0';
var role_data = [];
var switch_role_win;

Ext.onReady(function(){
	Ext.BLANK_IMAGE_URL="ext/resources/images/default/s.gif";
	
	var mod = new Map();
	mod.put('apply_family_manager','acc-win-shortcut');
	mod.put('searchm','acc-search-shortcut');
	mod.put('bank','bank-win-shortcut');
	mod.put('tax','tax-win-shortcut');
	mod.put('data_compare_manager','match-win-shortcut');
	mod.put('fgj','house-win-shortcut');
	mod.put('car','car-win-shortcut');
	mod.put('sys','system-manager-shortcut');
	
	Ext.Ajax.request({
	    url : 'do/user/getUserRoles',
	    method: 'POST',
	    success:function(response, opts){
	    	var rt = Ext.util.JSON.decode(response.responseText);
	    	var r = rt.current_role; // 当前正在使用的角色
	    	var rd = rt.data;  // 角色列表
	    	for(var i=0; i<rd.length; i++){
				var d = rd[i];
				var cked = false;
				d.roleId==r.id? cked=true : cked=false;
				var rg = {boxLabel:d.roleName, inputValue:d.roleId, name:'role', checked:cked};
				role_data.push(rg);
			}
			var ra = rt.roleActions;
	    	for(var i=0; i<ra.length; i++){
	    		var a = ra[i]; //alert(a.modStable+" |  "+a.modActions);
	    		if(a.modActions==""){
	    			if(mod.get(a.modStable)){
    					mod.remove(a.modStable);
    				}
	    		}
	    	}
	    	for(var i=0; i<mod.size(); i++){  // 设置没权限的操作为无效状态
    			var v = mod.getValue(i); //alert(v);
//    			document.getElementById(v).style.visibility="hidden";
    		}
	   	},
	   	failure : function() {
//		   	window.location.href = 'login.jsp';
		}
	});
	
	switch_role_win = new Ext.Window({
		title: '切换角色',
		bodyStyle: '10px 0 0 10px',
		layout:'fit',
		width:'280',
		height:'300',
		autoScroll:true,
		closeAction:'hide',
		closable:true,
		modal:true,
		animCollapse:true,
		items:[{
			xtype: 'radiogroup',
	    	name: 'roles',
	    	id: 'roles',
	        columns: 1,
	        autoHeight: true,
	        fieldLabel: '角色',
	        items: role_data
		}],
		buttons:[{
			text:"关闭",
			scale : 'medium',
			handler: function(){
				switch_role_win.hide();
			}
		},{
			text:"确定",
			scale : 'medium',
			handler: function(){ //alert(Ext.getCmp("roles").getValue().inputValue);
				Ext.Ajax.request({
				    url : 'do/user/setUserRole',
				    method: 'POST',
				    params: {
			    		roles: Ext.getCmp("roles").getValue().inputValue
			    	},
				    success:function(response, opts){
				    	switch_role_win.hide();
				    	document.location.reload();
				    }
				});
			}
		}]
	});
	
	
	
	
});	
	