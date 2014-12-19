
function department(){
	var menu_w = 210;
	var grid_w = document.body.clientWidth-menu_w;
	var grid_h = document.body.clientHeight-32;
	
    Ext.QuickTips.init();
	load_pid = "ALL";
	
	var root_dept = new Ext.tree.AsyncTreeNode({ 
			id : load_pid, 
			text : '最高部门',
			expanded : true
	}); 
	root_dept.attributes = {
		pkDeptId: '0',
		simpleName: '最高部门'
	}
	
    var treeLoader = new Ext.ux.tree.TreeGridLoader({
		url : path+"/do/department/getTreeRoot/"+load_pid
	});
	treeLoader.purgeListeners();
     
    var treeGrid = new Ext.ux.tree.TreeGrid({
//        title: '部门列表',
        width: grid_w,
        height: grid_h,
        autoScroll : true, 
		autoHeight : false, 
        renderTo: 'dic_treegrid',
        enableDD: true,
        enableSort: false,
        root:root_dept,
        loader : treeLoader,
        viewConfig : {autoFill : true},
        columns:[{
            header: '部门简称',
            dataIndex: 'simpleName',
            width: grid_w*(1/2)
        },{
            header: '简码', dataIndex: 'simpleCode', width: 160
        },{
            header: '全称', dataIndex: 'fullName', width: 200
//        },{
//            header: '负责人', dataIndex: 'masterName', width: 100
        },{
            header: '状态', dataIndex: 'deptState', width: 50,
            xtype:'booleancolumn'
        }],
        tbar:[
			{ text:"增加",iconCls:'add', id:'dept_add_btn' },
			{ text:"修改",iconCls:'modify', id:'dept_edit_btn'  },
			{ text:"查看",iconCls:'option', id:'dept_view_btn' },
			{ text:"删除",iconCls:'remove', id:'dept_del_btn' },
			{ xtype: 'tbseparator'},
			{ text:"作为树显示",iconCls:'option', id:'dept_rootLook_btn', hidden:true }
		]
    });
    
    function deptState_render(v){alert(v);
    	var t = "有效";
    	
    	return t;
    }
    
    
    
    treeLoader.on('beforeload',function(loader, node){
    	var pid = node.attributes.pkDeptId;
    	if (load_pid != pid){
    		treeGrid.loader.dataUrl = path+"/do/department/getRootChild/1/"+pid;
    	}
    }, this);
    treeGrid.expandAll();
    
     treeGrid.addListener('click', menu_click , this);
	     function menu_click(node, e){
	     	setByName('deptPName',node.attributes.simpleName);
	     	setByName('parentId',node.attributes.pkDeptId);
	     }
	     
    function treeGrid_reload(id){
    	treeGrid.on('beforeload',function(node){
    		treeLoader.dataUrl = path+"/do/department/getTreeRoot/"+id
    	});
    	root_dept.reload();
    	treeGrid.expandAll();
    }
	
    
    var page_size = 5;
    /** 负责人下拉选择的加载 
    var master_store = new Ext.data.JsonStore({  
	    url: path+'/puser/list',
	    method: 'POST',
	    totalProperty: 'total',
	    root: 'rows',
	    fields:[
	        {name:'userId',type:'int',mapping:'userId'},  
	        {name:'userName',type:'string',mapping:'userName'}  
	    ]
	}); 
	master_store.load({
		params: {
			start: 0,
			limit: page_size
		}
	});
    var master_combox = new Ext.form.ComboBox({
        mode: 'local',
		store: master_store,
		pageSize: page_size,
		queryParam: 'params',
		queryDelay: 500,
		valueField :"userId",
		displayField: "userName",
     	hiddenName:'permissionUser.userId',
     	editable: false,
     	triggerAction: 'all',
     	typeAhead: true,
		fieldLabel: '负责人',
		name: 'permissionUser.userId',
	 	width:190,
	    listWidth: 250
 	});

    var master_combox = new App.util.user.combox_user({
    	pageSize: page_size
    });
    master_combox.store.load({
		params: {
			start: 0,
			limit: page_size
		}
	});
	*/
    /** Form的定义 */
    var dept_form = new Ext.FormPanel({
        frame: true,
        labelAlign: 'right',
        labelWidth: 85,
        width:350,
        height:320,
        waitMsgTarget: true,
        items: [
            new Ext.form.FieldSet({
                title: '部门设置',
                autoHeight: true,
                collapsible: true,
                height:420,
                defaultType: 'textfield',
                items: [{ 
                	name: 'pkDeptId', hidden:true, fieldLabel: 'id'
                },{ 
                	name: 'parentId',  hidden:true, fieldLabel: 'pid'
                },{ 
                	name: 'deptOrder',  hidden:true, fieldLabel: 'deptOrder'
                },{ 
                	name: 'simpleName', 
                	fieldLabel: '简称', 
                	allowBlank:false, 
                	emptyText: '请输入',  
                	width:190
                },{ 
                	name: 'simpleCode', 
                	fieldLabel: '简码', 
                	allowBlank:false, 
                	width:190
                },{ 
                	name: 'fullName', 
                	fieldLabel: '全称',  
                	allowBlank:false, 
                	width:190
                },{ 
                	name: 'deptPName', fieldLabel: '上层部门',  
                	emptyText: '请选择,默认最高层', width:190
                }
//                	,master_combox
                ,{ 
                	name: 'deptPhone', fieldLabel: '电话', width:190
                },{ 
                	name: 'deptFax', fieldLabel: '传真', width:190
                },{
		            xtype: 'radiogroup',
	                columns: 'auto',
	                fieldLabel: '是否启用',
	                items: [
	                	{ name: 'deptState', inputValue: 1, boxLabel: '有效', checked: true }, 
	                	{ name: 'deptState', inputValue: 0, boxLabel: '无效' }
	                ]
                }]
            })
        ]
    });
    
	var cancel_btn = dept_form.addButton({
		text: '取消/关闭',
    	padding: '150px',
    	scale: 'medium',
    	width: 100,
    	handler: function(){
    		dept_win.hide();
    	}
	}); 
	
    var save_btn = dept_form.addButton({
    	text: ' 保 存 ',
    	scale: 'medium',
    	width: 100,
    	handler: function(){
    		var pv = getByName("parentId").value;
    		if(pv==""){
    			if ( !confirm("您没有选择上层部门，确定为最上层部门？") ){
    				return;
    			}
    		}
			var f = dept_form.getForm();
			if(f.isValid()){
				f.submit({
					waitMsg : '正在保存数据请稍后',
	    			waitTitle : '提示',
	    			url : path+'/do/department/addOrUpdate',
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
    
	
    
    
	var dept_win = new Ext.Window({
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
		items:[dept_form]
	});
    
    
	function loadForm(id, text){
		dept_form.getForm().reset();
		dept_win.show();
		var pf = dept_form.getForm();
		pf.load({
			url: path+"/do/department/loadById/"+id,
			method: 'POST',
			success:function(form,action){
	            pf.setValues(action.result.data);
				master_combox.setValue(action.result.data.permissionUser.userId);
	        },
	        failure:function(form,action){
	            Ext.Msg.alert('提示', text+' 的数据加载失败: ' + action.failureType);
	        }
		});
	}
	
	var dept_add = Ext.getCmp("dept_add_btn");
	dept_add.on('click', function(){
		dept_form.getForm().reset();
		dept_win.show();
		save_btn.show();
		var selMod = treeGrid.getSelectionModel();
		var node = selMod.getSelectedNode();
		if(node){
			setByName("deptPName", node.attributes.simpleName);
			setByName("parentId", node.attributes.pkDeptId);
		}
	});
	
	var dept_edit = Ext.getCmp("dept_edit_btn");
	dept_edit.on('click', function(){
		save_btn.show();
		dept_form.getForm().reset();
		var selMod = treeGrid.getSelectionModel();
		var node = selMod.getSelectedNode();
		if(node){
			loadForm(node.attributes.pkDeptId, node.attributes.simpleName);
			var pnode = node.parentNode;
			setByName("deptPName",pnode.attributes.simpleName);
		}
	});
	
	
	var dept_view = Ext.getCmp("dept_view_btn");
	dept_view.on('click', function(){
		dept_form.getForm().reset();
		var selMod = treeGrid.getSelectionModel();
		var node = selMod.getSelectedNode();
		if(node){
			loadForm(node.attributes.pkDeptId, node.attributes.simpleName);
			var pnode = node.parentNode;
			setByName("deptPName",pnode.attributes.simpleName);
		}
		save_btn.hide();
	});
	
	
	var dept_del = Ext.getCmp("dept_del_btn");
	dept_del.on('click', function(){
		var selMod = treeGrid.getSelectionModel();
		var node = selMod.getSelectedNode();
		if(node){
			if(!confirm("确定删除 " + node.attributes.simpleName))
				return;
				Ext.Ajax.request({
					url : path+'/do/department/deleteById/'+node.attributes.pkDeptId,
			    	method: "POST",
			    	success: function(response, opts) {
			    		var data = Ext.util.JSON.decode(response.responseText);
			    		if(data.msg==""){
			    			treeGrid_reload(load_pid);
			    		} else {
			    			Ext.Msg.alert('操作请求',data.msg);
			    		}
				   	},
				   failure: function(response, opts) {
			    		var data = Ext.util.JSON.decode(response.responseText);
				      	Ext.Msg.alert('操作失败', data.msg);
//				   },
//				   callback: function(opts, success, res){
//				   		alert(success);
				   }
		    });
		}
	});
	
	var root_look = Ext.getCmp("dept_rootLook_btn");
	root_look.on('click', function(){
//		var selMod = treeGrid.getSelectionModel();
//		var node = selMod.getSelectedNode();
//		if(node){
//			var dicValue ="", pkDeptId="";
//			dicValue = node.attributes.dicValue;
//			pkDeptId = node.attributes.pkDeptId;
//			root_dept.setId(pkDeptId);
//			treeGrid_reload(dicValue);
//		}
	});
}


Ext.onReady(function() {
	department();
	var stable = 'sys_department';
	var actMap = new Map();
	actMap.put('ADD','dept_add_btn');
	actMap.put('EDIT','dept_edit_btn');
	actMap.put('VIEW','dept_view_btn');
	actMap.put('DEL','dept_del_btn');
	permission(stable, actMap);
	
});
	
