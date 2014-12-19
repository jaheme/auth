
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
        width: grid_w*(1/4),
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
        }
    });
    treeLoader.on('beforeload',function(loader, node){
    	var pid = node.attributes.roleId;
    	if (load_pid != pid){
    		treeGrid.loader.dataUrl = path+"/do/role/getTreeRoot/"+pid;
    	}
    }, this);
    treeGrid.expandAll();
    
    function getRoleId(){
    	var node = treeGrid.getSelectionModel().getSelectedNode();
		if(node){
			return node.attributes.roleId;
		}
    }
    
   treeGrid.addListener('click', function (node, e){
	      ru_list_store.proxy = new Ext.data.HttpProxy({
				url: path+"/do/role/user_list/"+node.attributes.roleId
			});
			ru_list_store.reload();
		}, this);
    
    
    	
	/**************** 部门树  *************/	
	var root_dept = new Ext.tree.AsyncTreeNode({ 
			id : load_pid, 
			text : '最高部门',
			expanded : true
	}); 
	root_dept.attributes = {
		pkDeptId: '0',
		simpleName: '最高部门'
	}
	var dept_treeGrid = new Ext.ux.tree.TreeGrid({
    	title: '部门列表',
    	renderTo: 'dept_treegrid',
        width: grid_w*(1/4),
        height: grid_h,
	    autoScroll : true, 
		autoHeight : false, 
	    enableDD: true,
	    enableSort: false,
	    root: root_dept,
	    loader : new Ext.ux.tree.TreeGridLoader({
				url : path+"/do/department/getTreeRoot/ALL"
		}),
	    columns:[{
	        header: '部门简称',
	        dataIndex: 'simpleName',
	        width: 300
	    }],
	    viewConfig: {
	        forceFit:true
	    }
	});
	dept_treeGrid.loader.on('beforeload',function(loader, node){
		var pid = node.attributes.pkDeptId;
		if (load_pid != pid){
			dept_treeGrid.loader.dataUrl = path+"/do/department/getRootChild/0/"+pid;
	    	}
	    }, this);
	dept_treeGrid.expandAll();
	
	dept_treeGrid.addListener('click', menu_click , this);
	function menu_click(node, e){
		if(treeGrid.selModel.getSelectedNode()){
			dept_user_store.proxy = new Ext.data.HttpProxy({
				url: path+"/do/dept_user/"+node.attributes.pkDeptId+"/"+getRoleId()  // PUserController
			});
			dept_user_store.reload();
		} else {
			new Ext.App().setAlert("告知", "请先选择一个角色.");
		}
	}
	
	
	/********************  部门成员列表 *************/
	var dept_user_store = new Ext.data.JsonStore({
    	autoDestroy: true,
    	url: path+'/do/role/user_list',
    	method: "POST",
        remoteSort: true,
    	root: 'rows',
        totalProperty: 'total',
        idProperty: 'id',
        fields:[
			{name:'id'}, 
			{name:'userName'},
			{name:'account'}
		],
		sortInfo:{
			field: 'id',
			direction: 'DESC'
		}
    });
    var dept_user_sel = new Ext.grid.CheckboxSelectionModel({  });
    var dept_user_grid = new Ext.grid.GridPanel({
    	title: '可加入的用户列表',
    	renderTo: 'dept_usergrid',
        width: grid_w*(1/4),
        height: grid_h,
    	border: 1,
        autoScroll : true, 
        store: dept_user_store,
        trackMouseOver:false,
        disableSelection:true,
        loadMask: true,
        sm: dept_user_sel,
        colModel: new Ext.grid.ColumnModel({
        	defaults:{
        		width: 150,
        		sortable: false
        	},
	        columns:[
	        	new Ext.grid.RowNumberer({
					header: "#", 
					dataIndex: 'id'
				}),
				dept_user_sel,
	        	{header: "id",dataIndex: 'id', hidden:true },
	        	{header: "姓名",dataIndex: 'userName'},
	        	{header: "帐户",dataIndex: 'account'}
	        ]
        }),
        viewConfig: {
            forceFit:true
        }, 
        tbar:[
			{ text:"加入到角色",iconCls:'add', id:'role_user_add_btn' },
			{ xtype: 'tbseparator'},
			{ text:"查看已关联角色",iconCls:'option', id:'dept_user_view_role_btn',hidden: false }
			
		]
    });
    
    
    Ext.getCmp("role_user_add_btn").on('click', function(){
    	var rc = dept_user_grid.getSelectionModel().getSelections();
		if(rc && rc.length>0){
//			if(!confirm("确定加入到角色: ")){
//				return;
//			}
			var uid = "";
			for(var i=0; i<rc.length; i++){
				if(i==0){
					uid=rc[i].get("id");
					continue;
				}
				uid = uid+","+rc[i].get("id");
			}
//			alert(uid);
			Ext.Ajax.request({
				url : path+'/do/role/user/add',
		    	method: "POST",
		    	params: {
		    		uid: uid,
		    		roleId: treeGrid.getSelectionModel().getSelectedNode().attributes.roleId
		    	},
		    	success: function(response, opts) {
					dept_user_store.reload();
					ru_list_store.reload();
			   	},
			   failure: function(response, opts) {
			      Ext.Msg.alert('操作请求失败,出错状态: ' + response.status);
			   }
		   });
		}
    	
    });
    
     Ext.getCmp("dept_user_view_role_btn").on('click', 
     function(){
    	var rc = dept_user_grid.getSelectionModel().getSelections();
		if(rc && rc.length==1){
			var uid;
			for(var i=0; i<rc.length; i++){
				var r = rc[i];
				uid? uid=uid+","+r.id : uid=r.id;
			}
			if(uid){
				u_view_role_store.setBaseParam("uid", uid);
				u_view_role_store.reload();
				u_view_role_win.render("view_user_role");
				u_view_role_win.show();
			}
		} else {
			if(rc.length>1){
				alert("一次只能查看一个用户的信息。");
			}
		}
     });
    var u_view_role_store = new Ext.data.JsonStore({
    	autoDestroy: true,
    	url: path+'/do/role/ru/getUserRoles',
    	method: "POST",
//    	root: 'rows[0]',
    	root: 'rows',
        totalProperty: 'total',
        idProperty: 'urId',
        fields:[
			{name:'userId'},
			{name:'roleName'}
		]
    });
    var u_view_role_grid = new Ext.grid.GridPanel({
    	title: '用户关联的角色',
//    	renderTo: 'view_user_role',
        width: 320,
        height: 350,
    	border: 1,
        autoScroll : true, 
        store: u_view_role_store,
        trackMouseOver:false,
        disableSelection:true,
        loadMask: true,
        colModel: new Ext.grid.ColumnModel({
        	defaults:{
        		width: 150,
        		sortable: false
        	},
	        columns:[
	        	{header: "姓名",dataIndex: 'userId', renderer: uname},
	        	{header: "角色名",dataIndex: 'roleName'}
	        ]
        }),
        viewConfig: {
            forceFit:true
        }
    });
    function uname(v){
    	var rc = dept_user_grid.getSelectionModel().getSelections();
    	return rc[0].get("userName"); 
    }
    var u_view_role_win = new Ext.Window({
		layout:'fit',
		width:'380',
		height:'500',
		pageX: grid_w/2,
		pageY: 80,
		autoScroll:true,
		closeAction:'hide',
		resizable:false,
		shadow:true,
		closable:true,
//		modal:true,
		animCollapse:true,
		items:[u_view_role_grid]
	});
	
	/********************  角色成员列表 *************/
	var ru_list_store = new Ext.data.JsonStore({
    	autoDestroy: true,
    	url: path+'/puser_list',
    	method: "POST",
        remoteSort: true,
    	root: 'rows',
        totalProperty: 'total',
        idProperty: 'urId',
        fields:[
			{name:'urId'}, 
			{name:'userId'}, 
			{name:'userName'},
			{name:'simpleName'}
		],
		sortInfo:{
			field: 'userId',
			direction: 'DESC'
		}
    });
    var ru_grid_sel = new Ext.grid.CheckboxSelectionModel({  });
    var ru_list_grid = new Ext.grid.GridPanel({
    	title: '角色的用户列表',
    	renderTo: 'ru_grid',
        width: grid_w*(1/4),
        height: grid_h,
    	border: 1,
        autoScroll : true, 
        store: ru_list_store,
        trackMouseOver:false,
        disableSelection:true,
        loadMask: true,
        sm: ru_grid_sel,
        colModel: new Ext.grid.ColumnModel({
        	defaults:{
        		width: 150,
        		sortable: false
        	},
	        columns:[
	        	new Ext.grid.RowNumberer({
					header: "#", 
					dataIndex: 'urId'
				}),
				ru_grid_sel,
	        	{header: "id",dataIndex: 'urId', hidden:true },
	        	{header: "userId",dataIndex: 'userId', hidden:true },
	        	{header: "姓名",dataIndex: 'userName'},
	        	{header: "部门",dataIndex: 'simpleName'}
	        ]
        }),
        viewConfig: {
            forceFit:true
        }, 
        tbar:[
			{ text:"移出选中项",iconCls:'remove', id:'role_user_del_btn' },
			{ xtype: 'tbseparator'}
		]
    });

    Ext.getCmp("role_user_del_btn").on('click', function(){
		var rc = ru_grid_sel.getSelections();
		if(rc){
			if(!confirm("是否移出? ")){
				return;
			}
			var uid = "";
			for(var i=0; i<rc.length; i++){
				if(i==0){
					uid=rc[i].id;
					continue;
				}
				uid = uid+","+rc[i].id;
			}
//			alert(uid);
			Ext.Ajax.request({
				url : path+'/do/role/user/deleteById',
		    	method: "POST",
		    	params: {
		    		ruid: uid
		    	},
		    	success: function(response, opts) {
		    		ru_list_store.reload();
//					dept_user_store.reload();
			   	},
			   failure: function(response, opts) {
			      Ext.Msg.alert('操作请求失败,出错状态: ' + response.status);
			   }
		   });
		}
	});
	
	
	var stable = 'sys_role_user';
	var actMap = new Map();
	actMap.put('ADD','role_user_add_btn');
	actMap.put('DEL','role_user_del_btn');
	permission(stable, actMap);
	
});