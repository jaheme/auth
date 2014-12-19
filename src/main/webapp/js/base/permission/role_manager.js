
Ext.onReady(function() {
	var menu_w = 210;
	var grid_w = document.body.clientWidth-menu_w;
	var grid_h = document.body.clientHeight-31;
	
    Ext.QuickTips.init();
	load_pid = "0";
	
	var rootNode = new Ext.tree.AsyncTreeNode({ 
			id : load_pid, 
			text : '最高角色',
			expanded : true
	}); 
	rootNode.attributes = {
		roleId: '0',
		roleName: '最高角色'
	}
	
    var treeLoader = new Ext.ux.tree.TreeGridLoader({
		url : path+"/do/role/getTreeRoot/"+load_pid
	});
	treeLoader.purgeListeners();
     
    var treeGrid = new Ext.ux.tree.TreeGrid({
        title: '角色列表',
        width: grid_w,
        height: grid_h,
        autoScroll : true, 
		autoHeight : false, 
        renderTo: 'role_treegrid',
        enableDD: true,
        enableSort: false,
        root:rootNode,
        loader : treeLoader,
        tools:[{
        	id: 'save'
        }],
        columns:[{
            header: '名称', dataIndex: 'roleName', width: grid_w-350
        },{
            header: '描述', dataIndex: 'roleDesc', width: 255
        }],
        viewConfig: {
            forceFit:true
        }, 
        tbar:[
			{ text:"增加",iconCls:'add', id:'role_add_btn' },
			{ text:"修改",iconCls:'modify', id:'role_edit_btn'  },
			{ text:"查看",iconCls:'option', id:'role_view_btn' },
			{ text:"删除",iconCls:'remove', id:'role_del_btn' },
			{ xtype: 'tbseparator'},
			{ text:"作为树显示",iconCls:'option', id:'role_rootLook_btn',disabled:true,hidden:true }
		]
    });
    
    function pidRender(v){
    	return "000";
    }
    
    
    
    treeLoader.on('beforeload',function(loader, node){
    	var pid = node.attributes.roleId;
    	if (load_pid != pid){
    		treeGrid.loader.dataUrl = path+"/do/role/getTreeRoot/"+pid;
    	}
    }, this);
    treeGrid.expandAll();
    
     treeGrid.addListener('click', menu_click , this);
	     function menu_click(node, e){
	     	setByName('rolePName',node.attributes.roleName);
	     	setByName('parentId',node.attributes.roleId);
	     }
	     
    function treeGrid_reload(id){
    	treeGrid.on('beforeload',function(node){
    		treeLoader.dataUrl = path+"/do/role/getTreeRoot/"+id
    	});
    	rootNode.reload();
    	treeGrid.expandAll();
    }
	
	
    /** Form的定义 */
    var role_form = new Ext.FormPanel({
        frame: true,
        labelAlign: 'right',
        labelWidth: 85,
        width:350,
        height:210,
        waitMsgTarget: true,
        items: [
	        new Ext.form.FieldSet({
	            title: '角色设置',
	            autoHeight: true,
	            collapsible: true,
	            height:350,
	            defaultType: 'textfield',
	            items: [ { 
	            	name: 'roleId', hidden:true, fieldLabel: 'roleId'
	            },{ 
	            	name: 'parentId', hidden:true, fieldLabel: 'parentId'
	            },{ 
	            	name: 'roleName', 
	            	fieldLabel: '名称', 
	            	allowBlank:false, 
	            	emptyText: '请输入', 
	            	width:190,
	            	maxLength: 30
	            },{ 
	            	name: 'rolePName', 
	            	fieldLabel: '上层角色', 
	            	emptyText: '不选择父类,则自动设置最上级',
	            	width:190
	            },{
					xtype: 'textarea',
		            fieldLabel: '简单描述',
		            name: 'roleDesc',
		            maxLength: 250,
		            width: 200,
		            height: 50
		        }]
	        })
	    ]
    });
    
	var cancel_btn = role_form.addButton({
		text: '取消/关闭',
    	padding: '150px',
    	scale: 'medium',
    	width: 100,
    	handler: function(){
    		role_win.hide();
    	}
	}); 
	
    var save_btn = role_form.addButton({
    	text: ' 保 存 ',
    	scale: 'medium',
    	width: 100,
    	handler: function(){
			var f = role_form.getForm();
			if(f.isValid()){
				f.submit({
					waitMsg : '正在保存数据请稍后',
	    			waitTitle : '提示',
	    			url : path+'/do/role/addOrUpdate',
	    			method:'POST',
	    			success:function(form,action){
	    				treeGrid_reload(load_pid);
	    				Ext.Msg.alert('提示','保存成功');
	    			},
	    			failure:function(form,action){
	    				Ext.Msg.alert('提示','保存失败--错误类型: '+action.failureType);
	                }
				});
			}
    	}
	});  // end save_btn
    
	
    
    
	var role_win = new Ext.Window({
		layout:'fit',
		width:'380',
		height:'300',
		autoScroll:true,
		closeAction:'hide',
		resizable:false,
		shadow:true,
		closable:true,
//		modal:true,
		animCollapse:true,
		items:[role_form]
	});
    
    
	function loadForm(id, text){
		role_form.getForm().reset();
		role_win.show();
		var pf = role_form.getForm();
		pf.load({
			url: path+"/do/role/loadById/"+id,
			method: 'POST',
			success:function(form,action){
	            pf.setValues(action.result.data);
	        },
	        failure:function(form,action){
	            Ext.Msg.alert('提示', text+' 的数据加载失败: ' + action.failureType);
	        }
		});
	}
	
	var role_add = Ext.getCmp("role_add_btn");
	role_add.on('click', function(){
		role_form.getForm().reset();
		role_win.show();
		save_btn.show();
		var node = treeGrid.getSelectionModel().getSelectedNode();
		if(node){
			setByName("rolePName", node.attributes.roleName);
			setByName("parentId", node.attributes.roleId);
		}
	});
	
	var role_edit = Ext.getCmp("role_edit_btn");
	role_edit.on('click', function(){
		save_btn.show();
		role_form.getForm().reset();
		var node = treeGrid.getSelectionModel().getSelectedNode();
		if(node){
			loadForm(node.attributes.roleId, node.attributes.roleName);
			var pnode = node.parentNode;
			setByName("rolePName",pnode.attributes.roleName);
		}
	});
	
	
	var role_view = Ext.getCmp("role_view_btn");
	role_view.on('click', function(){
		role_form.getForm().reset();
		var node = treeGrid.getSelectionModel().getSelectedNode();
		if(node){
			loadForm(node.attributes.roleId, node.attributes.roleName);
			var pnode = node.parentNode;
			setByName("rolePName",pnode.attributes.roleName);
		}
		save_btn.hide();
	});
	
	
	var role_del = Ext.getCmp("role_del_btn");
	role_del.on('click', function(){
		var node = treeGrid.getSelectionModel().getSelectedNode();
		if(node){
			if(!confirm("确定删除 " + node.attributes.roleName))
				return;
				Ext.Ajax.request({
					url : path+'/do/role/deleteById/'+node.attributes.roleId,
			    	method: "POST",
			    	success: function(response, opts) {
			    		treeGrid_reload(load_pid);
				   	},
				   failure: function(response, opts) {
				      Ext.Msg.alert('操作请求失败,出错状态: ' + response.status);
				   }
		    });
		}
	});
    
	
	var stable = 'sys_role';
	var actMap = new Map();
	actMap.put('ADD','role_add_btn');
	actMap.put('EDIT','role_edit_btn');
	actMap.put('VIEW','role_view_btn');
	actMap.put('DEL','role_del_btn');
	permission(stable, actMap);
	
});
