
Ext.onReady(function() {
	var menu_w = 210;
	var grid_w = document.body.clientWidth-menu_w;
	var grid_h = document.body.clientHeight-32;
	
    Ext.QuickTips.init();
	load_pid = "ALL";
	
	var rootNode = new Ext.tree.AsyncTreeNode({ 
			code : load_pid, 
			text : '最高层级',
			expanded : true
	}); 
	rootNode.attributes = {
		code: '0',
		name: '最高层级'
	}
	
    var treeLoader = new Ext.ux.tree.TreeGridLoader({
		url : path+"/do/region/getTreeRoot/"+load_pid
	});
	treeLoader.purgeListeners();
     
    var treeGrid = new Ext.ux.tree.TreeGrid({
        title: '区域列表',
        width: grid_w,
        height: grid_h,
        autoScroll : true, 
		autoHeight : false, 
        renderTo: 'region_treegrid',
        enableDD: true,
        enableSort: false,
        root:rootNode,
        loader : treeLoader,
        tools:[{
        	id: 'save'
        }],
        columns:[{
            header: '名称', dataIndex: 'name', width: grid_w-550
        },{
            header: '区域码', dataIndex: 'code', width: 200
        },{
            header: '状态', dataIndex: 'status', xtype:'booleancolumn', width: 100
        },{
            header: 'id', dataIndex: 'id', width: 100
        }],
        viewConfig: {
            forceFit:true
        }, 
        tbar:[
			{ text:"增加",iconCls:'add', id:'region_add_btn' },
			{ text:"修改",iconCls:'modify', id:'region_edit_btn'  },
			{ text:"查看",iconCls:'option', id:'region_view_btn' },
			{ text:"删除",iconCls:'remove', id:'region_del_btn' },
			{ xtype: 'tbseparator'},
			{ text:"作为树显示",iconCls:'option', id:'dic_rootLook_btn',disabled:true }
		]
    });
    
    function pidRender(v){
    	return "000";
    }
    
    
    
    treeLoader.on('beforeload',function(loader, node){
    	var pid = node.attributes.code;
    	if (load_pid != pid){
    		treeGrid.loader.dataUrl = path+"/do/region/getRootChild/1/"+pid;
    	}
    }, this);
//    treeGrid.expandAll();
    
     treeGrid.addListener('click', menu_click , this);
	     function menu_click(node, e){
	    	 if(region_win.isVisible()){
	    		 setByName('parentName',node.attributes.name);
	    		 setByName('parentCode',node.attributes.code);
	    		 loadCode(node.attributes.code);
	    	 }
	     }
	     
    function treeGrid_reload(id){
    	treeGrid.on('beforeload',function(node){
    		treeLoader.dataUrl = path+"/do/region/getTreeRoot/"+id
    	});
    	rootNode.reload();
//    	treeGrid.expandAll();
    }
	
	
    /** Form的定义 */
    var region_form = new Ext.FormPanel({
        frame: true,
        labelAlign: 'right',
        labelWidth: 85,
        width:350,
        height:210,
        waitMsgTarget: true,
        items: [
            new Ext.form.FieldSet({
                title: '区域设置',
                autoHeight: true,
                collapsible: true,
                height:420,
                defaultType: 'textfield',
                items: [ {
                	name: 'id', hidden:true, fieldLabel: 'id'
                },{ 
                	name: 'parentCode', hidden:true, fieldLabel: 'parentCode'
                },{
                	name: 'orderNum', hidden:true, fieldLabel: 'orderNum'
                },{ 
                	name: 'name', 
                	fieldLabel: '名称', 
                	allowBlank:false, 
                	emptyText: '请输入', 
                	width:190,
                	maxLength: 30
                },{ 
                	name: 'code', 
                	fieldLabel: '区域码',  
                	allowBlank:false, 
                	readOnly: true,
                	maxLength: 24,
                	width:190
                },{ 
                	name: 'parentName', 
                	fieldLabel: '上层区域', 
                	emptyText: '不选择父类,则自动设置为最上级',
                	width:190
                },{
		            xtype: 'radiogroup',
	                columns: 'auto',
	                fieldLabel: '是否启用',
	                items: [
	                	{ name: 'status', inputValue: 1, boxLabel: '启用', checked: true }, 
	                	{ name: 'status', inputValue: 0, boxLabel: '无效' }
	                ]
                }]
            })
        ]
    });
    
	var cancel_btn = region_form.addButton({
		text: '取消/关闭',
    	padding: '150px',
    	scale: 'medium',
    	width: 100,
    	handler: function(){
    		region_win.hide();
    	}
	}); 
	
    var save_btn = region_form.addButton({
    	text: ' 保 存 ',
    	scale: 'medium',
    	width: 100,
    	handler: function(){
			var f = region_form.getForm();
			if(f.isValid()){
				f.submit({
					waitMsg : '正在保存数据请稍后',
	    			waitTitle : '提示',
	    			url : path+'/do/region/addOrUpdate',
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
    
	
    
    
	var region_win = new Ext.Window({
		layout:'fit',
		width:'380',
		height:'300',
		pageX: grid_w/2,
		autoScroll:true,
		closeAction:'hide',
		resizable:false,
		shadow:true,
		closable:true,
//		modal:true,
		animCollapse:true,
		items:[region_form]
	});
    
    
	function loadForm(id, text){
		region_win.show();
		var pf = region_form.getForm();
		pf.reset();
		pf.load({
			url: path+"/do/region/loadById/"+id,
			method: 'POST',
			success:function(form,action){
	            pf.setValues(action.result.data);
	        },
	        failure:function(form,action){
	            Ext.Msg.alert('提示', text+' 的数据加载失败: ' + action.failureType);
	        }
		});
	}
	
	function loadCode(pcode){
		Ext.Ajax.request({
			url : path+'/do/region/getCode/'+pcode,
	    	method: "POST",
	    	success: function(response, opts) {
	    		var data = Ext.util.JSON.decode(response.responseText).data;
	    		if(data==null){
	    			alert("当前已经是最低层级，不能再增加了！");
		    		setByName("code", "");
	    			return;
	    		}
	    		setByName("code", data);
		   	},
		   failure: function(response, opts) {
		      Ext.Msg.alert('操作请求失败,出错状态: ' + response.status);
		   }
    });
	}
	
	var region_add = Ext.getCmp("region_add_btn");
	region_add.on('click', function(){
		region_form.getForm().reset();
		region_win.show();
		save_btn.show();
		var selMod = treeGrid.getSelectionModel();
		var node = selMod.getSelectedNode();
		if(node){
			setByName("parentName", node.attributes.name);
			setByName("parentCode", node.attributes.code);
			loadCode(node.attributes.code);
		} else { // 没有选择，默认是最高级别的编码
			setByName("parentCode", 0);
			loadCode(0);
		}
	});
	
	var region_edit = Ext.getCmp("region_edit_btn");
	region_edit.on('click', function(){
		save_btn.show();
		var selMod = treeGrid.getSelectionModel();
		var node = selMod.getSelectedNode();
		if(node){
			loadForm(node.attributes.id, node.attributes.name);
			var pnode = node.parentNode;
			setByName("parentName",pnode.attributes.name);
		}
	});
	
	
	var region_view = Ext.getCmp("region_view_btn");
	region_view.on('click', function(){
		var selMod = treeGrid.getSelectionModel();
		var node = selMod.getSelectedNode();
		if(node){
			loadForm(node.attributes.id, node.attributes.name);
			var pnode = node.parentNode;
			setByName("parentName",pnode.attributes.name);
		}
		save_btn.hide();
	});
	
	
	var region_del = Ext.getCmp("region_del_btn");
	region_del.on('click', function(){
		var selMod = treeGrid.getSelectionModel();
		var node = selMod.getSelectedNode();
		if(node){
			if(!confirm("确定删除 " + node.attributes.name))
				return;
				Ext.Ajax.request({
					url : path+'/do/region/deleteById/'+node.attributes.id,
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
	
	var root_look = Ext.getCmp("dic_rootLook_btn");
	root_look.on('click', function(){
//		var selMod = treeGrid.getSelectionModel();
//		var node = selMod.getSelectedNode();
//		if(node){
//			var code ="", code="";
//			code = node.attributes.code;
//			code = node.attributes.code;
//			rootNode.setId(code);
//			treeGrid_reload(code);
//		}
	});
	
	var stable = 'sys_region';
	var actMap = new Map();
	actMap.put('ADD','region_add_btn');
	actMap.put('EDIT','region_edit_btn');
	actMap.put('VIEW','region_view_btn');
	actMap.put('DEL','region_del_btn');
	permission(stable, actMap);
    
});
