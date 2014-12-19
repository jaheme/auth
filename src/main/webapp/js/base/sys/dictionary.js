
Ext.onReady(function() {
	var menu_w = 210;
	var grid_w = document.body.clientWidth-menu_w;
	var grid_h = document.body.clientHeight-32;
	
    Ext.QuickTips.init();
	load_pid = "ALL";
	
	var rootNode = new Ext.tree.AsyncTreeNode({ 
			id : load_pid, 
			text : '字典头',
			expanded : true
	}); 
	rootNode.attributes = {
		dicId: '0',
		dicName: '字典头'
	}
	
    var treeLoader = new Ext.ux.tree.TreeGridLoader({
		url : path+"/do/dictionary/getTreeRoot/"+load_pid
	});
	treeLoader.purgeListeners();
     
    var treeGrid = new Ext.ux.tree.TreeGrid({
        title: '字典列表',
        width: grid_w,
        height: grid_h,
        autoScroll : true, 
		autoHeight : false, 
        renderTo: 'dic_treegrid',
        enableDD: true,
        enableSort: false,
        root:rootNode,
        loader : treeLoader,
        tools:[{
        	id: 'save'
        }],
        columns:[{
            header: '名称', dataIndex: 'dicName', width: grid_w-550
        },{
            header: '引用值', dataIndex: 'dicValue', width: 100
        },{
            header: '状态', dataIndex: 'dicState', xtype:'booleancolumn', width: 100
        }],
        viewConfig: {
            forceFit:true
        }, 
        tbar:[
			{ text:"增加",iconCls:'add', id:'dic_add_btn' },
			{ text:"修改",iconCls:'modify', id:'dic_edit_btn'  },
			{ text:"查看",iconCls:'option', id:'dic_view_btn' },
			{ text:"删除",iconCls:'remove', id:'dic_del_btn' },
			{ xtype: 'tbseparator'},
			{ text:"作为树显示",iconCls:'option', id:'dic_rootLook_btn',disabled:true }
		]
    });
    
    function pidRender(v){
    	return "000";
    }
    
    
    
    treeLoader.on('beforeload',function(loader, node){
    	var pid = node.attributes.dicId;
    	if (load_pid != pid){
    		treeGrid.loader.dataUrl = path+"/do/dictionary/getRootChild/1/"+pid;
    	}
    }, this);
//    treeGrid.expandAll();
    
     treeGrid.addListener('click', menu_click , this);
	     function menu_click(node, e){
	     	setByName('dicPName',node.attributes.dicName);
	     	setByName('dicPid',node.attributes.dicId);
	     }
	     
    function treeGrid_reload(id){
    	treeGrid.on('beforeload',function(node){
    		treeLoader.dataUrl = path+"/do/dictionary/getTreeRoot/"+id
    	});
    	rootNode.reload();
//    	treeGrid.expandAll();
    }
	
	
    /** Form的定义 */
    var dic_form = new Ext.FormPanel({
        frame: true,
        labelAlign: 'right',
        labelWidth: 85,
        width:350,
        height:210,
        waitMsgTarget: true,
        items: [
            new Ext.form.FieldSet({
                title: '字典设置',
                autoHeight: true,
                collapsible: true,
                height:420,
                defaultType: 'textfield',
                items: [ { 
                	name: 'pkDicId', hidden:true, fieldLabel: 'id'
                },{ 
                	name: 'dicPid', hidden:true, fieldLabel: 'pid'
                },{
                	name: 'dicOrder', hidden:true, fieldLabel: 'dicOrder'
                },{ 
                	name: 'dicName', 
                	fieldLabel: '名称', 
                	allowBlank:false, 
                	emptyText: '请输入', 
                	width:190,
                	maxLength: 30
                },{ 
                	name: 'dicValue', 
                	fieldLabel: '引用值',  
                	allowBlank:false, 
                	maxLength: 20,
                	width:190
                },{ 
                	name: 'dicPName', 
                	fieldLabel: '上层字典', 
                	emptyText: '不选择父类,则自动设置最上级',
                	width:190
                },{
		            xtype: 'radiogroup',
	                columns: 'auto',
	                fieldLabel: '是否启用',
	                items: [
	                	{ name: 'dicState', inputValue: 1, boxLabel: '有效', checked: true }, 
	                	{ name: 'dicState', inputValue: 0, boxLabel: '无效' }
	                ]
                }]
            })
        ]
    });
    
	var cancel_btn = dic_form.addButton({
		text: '取消/关闭',
    	padding: '150px',
    	scale: 'medium',
    	width: 100,
    	handler: function(){
    		dic_win.hide();
    	}
	}); 
	
    var save_btn = dic_form.addButton({
    	text: ' 保 存 ',
    	scale: 'medium',
    	width: 100,
    	handler: function(){
			var f = dic_form.getForm();
			if(f.isValid()){
				f.submit({
					waitMsg : '正在保存数据请稍后',
	    			waitTitle : '提示',
	    			url : path+'/do/dictionary/addOrUpdate',
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
    
	
    
    
	var dic_win = new Ext.Window({
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
		items:[dic_form]
	});
    
    
	function loadForm(id, text){
		dic_form.getForm().reset();
		dic_win.show();
		var pf = dic_form.getForm();
		pf.load({
			url: path+"/do/dictionary/loadById/"+id,
			method: 'POST',
			success:function(form,action){
	            pf.setValues(action.result.data);
	        },
	        failure:function(form,action){
	            Ext.Msg.alert('提示', text+' 的数据加载失败: ' + action.failureType);
	        }
		});
	}
	
	var dic_add = Ext.getCmp("dic_add_btn");
	dic_add.on('click', function(){
		dic_form.getForm().reset();
		dic_win.show();
		save_btn.show();
		var selMod = treeGrid.getSelectionModel();
		var node = selMod.getSelectedNode();
		if(node){
			setByName("dicPName", node.attributes.dicName);
			setByName("dicPid", node.attributes.dicId);
		}
	});
	
	var dic_edit = Ext.getCmp("dic_edit_btn");
	dic_edit.on('click', function(){
		save_btn.show();
		dic_form.getForm().reset();
		var selMod = treeGrid.getSelectionModel();
		var node = selMod.getSelectedNode();
		if(node){
			loadForm(node.attributes.dicId, node.attributes.dicName);
			var pnode = node.parentNode;
			setByName("dicPName",pnode.attributes.dicName);
		}
	});
	
	
	var dic_view = Ext.getCmp("dic_view_btn");
	dic_view.on('click', function(){
		dic_form.getForm().reset();
		var selMod = treeGrid.getSelectionModel();
		var node = selMod.getSelectedNode();
		if(node){
			loadForm(node.attributes.dicId, node.attributes.dicName);
			var pnode = node.parentNode;
			setByName("dicPName",pnode.attributes.dicName);
		}
		save_btn.hide();
	});
	
	
	var dic_del = Ext.getCmp("dic_del_btn");
	dic_del.on('click', function(){
		var selMod = treeGrid.getSelectionModel();
		var node = selMod.getSelectedNode();
		if(node){
			if(!confirm("确定删除 " + node.attributes.dicName))
				return;
				Ext.Ajax.request({
					url : path+'/do/dictionary/deleteById/'+node.attributes.dicId,
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
//			var dicValue ="", dicId="";
//			dicValue = node.attributes.dicValue;
//			dicId = node.attributes.dicId;
//			rootNode.setId(dicId);
//			treeGrid_reload(dicValue);
//		}
	});
	
	var stable = 'sys_dictionary';
	var actMap = new Map();
	actMap.put('ADD','dic_add_btn');
	actMap.put('EDIT','dic_edit_btn');
	actMap.put('VIEW','dic_view_btn');
	actMap.put('DEL','dic_del_btn');
	permission(stable, actMap);
    
});
