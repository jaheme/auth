

/**
 * 
 * @param  stable 菜单稳定码
 * @param  actMap 纳入权限控制的操作集合(权限代码,权限操作,多个以","分隔),如:map.put('ADD','add_btn[,add2_btn...]')
 */
function permission(stables, actMap){
	
	Ext.Ajax.request({
			url : path+'/do/user/getActionByStable',
	    	method: "POST",
	    	params: {
	    		stable: stables
	    	},
	    	success: function(response, opts) {
	    		var res = Ext.util.JSON.decode(response.responseText);
	    		var data = res.data;
	    		var arr = data.split(",");
    			for(var a=0; a<arr.length; a++){
    				if(actMap.get(arr[a])){
    					actMap.remove(arr[a]);
    				}
    			}
	    		for(var i=0; i<actMap.size(); i++){  // 设置没权限的操作为无效状态
	    			var v = actMap.getValue(i);
	    			var vi = v.split(",");
	    			for(var a=0; a<vi.length; a++){
	    				var va = Ext.getCmp(vi[a]);
	    				va.setDisabled(true);
	    				va.setTooltip('需要权限才能操作.');
	    			}
	    		}
		   	},
		   failure: function(response, opts) {
		      Ext.Msg.alert('权限控制信息加载出错: ' + response.status);
		   }
	});
	
}

