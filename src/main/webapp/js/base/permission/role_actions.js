
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
        width: grid_w*(1/3),
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
    treeGrid.addListener('click', function (node, e){
	        pm_tree.loader.baseParams.role= getRoleId();
	        pm_tree.getRootNode().reload();
			pm_tree.expandAll();
		}, this);
	
    function getRoleId(){
    	var node = treeGrid.getSelectionModel().getSelectedNode();
		if(node){
			return node.attributes.roleId;
		}
    }
	
	
	////////////////////////////////////////////  角色的权限设置  ///////////////////
    
    var pm_tree = new Ext.tree.TreePanel({
//        title: '功能模块',
    	id: 'permission_module_tree',
	    renderTo: 'rm_treegrid',
        height : grid_h,
        width: grid_w*(2/3),
        checkModel: 'cascade', //对树的级联多选  
        onlyLeafCheckable: false,//默认false,对树所有结点都可选  
        autoScroll : true, 
		autoHeight : false,
        rootVisible: false,
        root: new Ext.tree.AsyncTreeNode({
	        	expanded: true,
	        	text: '菜单',
				id: '0'
        }),
        loader: new Ext.tree.TreeLoader({
        		dataUrl: path+'/do/role/role_module_tree',
//        		baseParams:{
//        			role: getRoleId()
//        		},
        		baseAttrs: { uiProvider: Ext.tree.TreeCheckNodeUI } //添加 uiProvider 属性
        }),
        tbar:[
        	{ text:"保存设置",iconCls:'add', id: 'role_module_edit_btn' },
			{ xtype: 'tbseparator'}
        ]
    });
    pm_tree.loader.on('beforeload',pre_expand , this);
    function pre_expand(loader, node){
    	dataUrl=path+'/do/role/role_module_tree';
        loader.baseParams.role= getRoleId();
    }
    
     Ext.getCmp("role_module_edit_btn").on("click", function(){
		var nodes = pm_tree.getChecked();
		if(nodes && nodes!=""){
			var rmInfo, stables, actions;
	    	for(var i=0; i<nodes.length; i++){
	    		var n = nodes[i];  // #: 分隔不同模块  @:分隔模块代码与权限点
		    	if(rmInfo){
		    		rmInfo += "#"+ n.attributes.modStable +"@"+getCheckActions(n.id);
		    	} else {
		    		rmInfo = n.attributes.modStable +"@"+getCheckActions(n.id);
		    	}
	    	} 
//	    	alert(rmInfo);
	    	Ext.Ajax.request({
				url : path+'/do/role/roleActions/set',
		    	method: "POST",
		    	params: {
		    		roleId: treeGrid.getSelectionModel().getSelectedNode().attributes.roleId,
		    		rmActions: rmInfo
		    	},
		    	success: function(response, opts) {
		    		pm_tree.getRootNode().reload();
    				pm_tree.expandAll();
//		    		alert("设置已保存");
			   	},
			   failure: function(response, opts) {
			      Ext.Msg.alert('操作请求失败,出错状态: ' + response.status);
			   }
		    });
		}
    });
	
    function getCheckActions(nodeId){
    	var resChecks = Ext.getDoc().dom.getElementsByName("res"+nodeId);
    	var act="";  // 必须是初始空值
		for(var i = 0;i < resChecks.length;i ++){
			var a = resChecks[i];
			if(a.checked == true){
				if(act!=""){
					act += "," + a.value;
				}else{
					act = a.value;
				}
			}
		}
		return act;
    }
	
	var stable = 'sys_role_action';
	var actMap = new Map();
	actMap.put('EDIT','role_module_edit_btn');
	permission(stable, actMap);
});