Ext.onReady(function(){
	var menu_w = 200;
	var pm_tree_w = document.body.clientWidth*(2/3);
	pm_tree_w = pm_tree_w-230;var bw = document.body.clientHeight;
	var pm_tree_h = document.body.clientHeight-31;
	var pm_form_w = document.body.clientWidth - pm_tree_w - Ext.getScrollBarWidth()-menu_w;
    var loadpid = 0;

    var get_dom = function(id){
    	return document.getElementById(id);
    }
    
    var pm_loader = new Ext.tree.TreeLoader({
        	dataUrl: path+'/do/pmodule_tree/'+loadpid
        	
        });
    var pm_root = new Ext.tree.AsyncTreeNode({
        	expanded: true,
        	text: '菜单',
			id: '0'
        });
    pm_loader.purgeListeners();
    var pm_tree = new Ext.tree.TreePanel({
        title: '功能模块',
        renderTo: 'left-top',
        height : pm_tree_h,
        width: pm_tree_w,
//        useArrows:true,
        autoScroll:true,
//        animate:true,
//        enableDD:true,
//        containerScroll: true,
        rootVisible: false,
        root: pm_root,
        loader: pm_loader,
          // auto create TreeLoader pmodule_tree  pmcol_tree
        tbar:[
        	{ text:"新增",iconCls:'add', id:'mod_add_btn', handler: pm_toAdd },
			{ text:"修改",iconCls:'modify', id:'mod_edit_btn', handler: pm_toEdit },
			{ text:"查看",iconCls:'option', id:'mod_view_btn', handler: pm_toView },
			{ text:"删除",iconCls:'remove', id:'mod_del_btn', disabled:false, handler: function(){
														var selMod = pm_tree.getSelectionModel();
														var node = selMod.getSelectedNode();
														pm_delete(node.id, node.text);
											    	}
    		},
			{ text:"子菜单排序",iconCls:'option', hidden:false, handler: pm_toOrder }
        ]
    });
    pm_loader.addListener('beforeload',pre_expand , this);
    function pre_expand(loader, node){
    	if ('0' != node.id){
//    		loader.dataUrl = '';
    		loader.dataUrl = path+"/do/pmodule_tree/"+node.id;
    	}
    }
//    pmc_loader.load()
    pm_tree.addListener('click', tree_click , this);
     function tree_click(node, e){
    	if(node.leaf){
    		alert("请选择模块,不能选择菜单.");
    		return;
    	}
     	get_dom("modPid").value = node.id;
     	get_dom("modPname").value = node.text;
    }
//    pm_tree.expandAll();
    
    function tree_reload(node_id){
    	pm_tree.on('beforeload',function(){
    		pm_loader.dataUrl = path+"/do/pmodule_tree/"+node_id;
    	});
    	pm_root.reload();
//    	pm_tree.expandAll();
    }
    
    
    var action_data = [];
    var conn = Ext.lib.Ajax.getConnectionObject().conn;
    conn.open("POST",path+"/do/pmload_action/actions",false);
    conn.send(null);
//    alert(conn.stauts == 200);
//    if(conn.stauts == 200){
    if(conn.responseText!=""){
    	var rd = Ext.util.JSON.decode(conn.responseText);
		for(var i=0; i<rd.length; i++){
			var d = rd[i];
			var chk = {boxLabel:d.text, inputValue:d.code,id:d.code, name:'modActions'};
			action_data.push(chk);
		}
    } else {
    	action_data.push({boxLabel:'淌有', inputValue:1,id:1, name:'modActions'});
    }
    	
//    }
//    else {
//		Ext.Msg.alert('操作请求失败,出错状态: ' + conn.status);
//	}
		
    /** Form的定义 */
    var pm_form = new Ext.FormPanel({
        title:'功能模块设置',
        renderTo: 'right-top',
        labelAlign: 'right',
        labelWidth: 85,
        height : pm_tree_h,
        width: pm_form_w,
	    border: false,
        waitMsgTarget: true,
        items: [
            new Ext.form.FieldSet({
                title: '功能模块-新增',
                id: 'pm_fieldSet',
                collapsible: true,
        		width: pm_form_w,
                defaultType: 'textfield',
                defaults:{
                	height:25,
                	width:250
                },
                items: [
                	{ name: 'modId', id:'modId', value: "", hidden:true }, 
                    { name: 'modStable', id:'modStable', fieldLabel: '模块代码', allowBlank:false, emptyText: '请指定唯一的代码'}, 
                    { fieldLabel: '模块名称', id:'modName', name: 'modName', allowBlank:false, emptyText: '请输入模块名称'}, 
                    { fieldLabel: '链接地址', name: 'modUrl', id: 'modUrl'},
                    { name: 'modPid', id:'modPid', hidden: true },
                    { fieldLabel: '所属模块', name: 'modPname', id:'modPname', readOnly: true, emptyText: '请从左边树选择'},
                    { name: 'modOrder', hidden: true },
                    { name: 'modLevel', hidden: true },
                    {
		                xtype: 'radiogroup',
		                columns: 'auto',
		                fieldLabel: '是否显示',
		                items: [{
		                    name: 'modIsVisible',
		                    inputValue: 1,
		                    boxLabel: '显示',
		                    checked: true
		                }, {
		                    name: 'modIsVisible',
		                    inputValue: 0,
		                    boxLabel: '不显示'
		                }]
                    },
                    {
                    	xtype: 'checkboxgroup',
                    	id: 'modActions',
                    	name: 'modActions',
		                columns: 3,
		                autoHeight: true,
		                fieldLabel: '权限动作',
		                items: action_data
                    }
                ],
                buttons:[
                	{text: '取消/清除', id:'cancel_btn', padding: '150px', scale: 'medium', handler: pm_toAdd },
                	{text: ' 保 存 ', id:'save_btn', scale: 'medium', width: 100, handler:save_form }
                ]
            }) // end fiedset
        ]
    });

	var cancel_btn = Ext.getCmp('cancel_btn');
	
    var save_btn = Ext.getCmp('save_btn');
    
    function save_form(){
			var f = pm_form.getForm();
			if(f.isValid()){
				if(Ext.getCmp("modUrl").getValue()=="" && Ext.getCmp("modActions").getValue()!=""){
					alert("您当前设置的是模块, 不需要选择权限动作。");
					return;
				}
				f.submit({
					waitMsg : '正在保存数据请稍后',
	    			waitTitle : '提示',
	    			url : path+'/do/pmodule_addOrUpdate',
	    			method:'POST',
	    			success:function(form,action){
	    				tree_reload(0);
	    				Ext.Msg.alert('提示','保存成功');
	    				pm_toAdd();
	    			},
	    			failure:function(form,action){
	    				if(action.result.msg){
	    					alert(action.result.msg);
	    					return;
	    				}
	    				Ext.Msg.alert('提示','保存失败--错误类型: '+action.failureType);
	                }
				});
			}
    	}
    
//	var del_btn = Ext.getCmp('pm_fieldSet').addButton({
//		text: ' 删 除 ',
//    	scale: 'medium',
//    	handler: function(){
//			pm_delete(get_dom("modId").value, get_dom("modName").value);
//    	}
//	});
	
	
	function loadForm(id, text){
		var pf = pm_form.getForm();
		pf.load({
			url: path+"/do/pmodule_load/"+id,
			method: 'POST',
			success:function(form,action){
	            pf.setValues(action.result.data);
	        },
	        failure:function(form,action){
	            Ext.Msg.alert('提示', text+' 的数据加载失败: ' + action.failureType);
	        }
		});
	}
	
	function pm_toAdd(){
		save_btn.show();
		pm_form.getForm().reset();
		Ext.getCmp('pm_fieldSet').setTitle("功能模块-新增");
		Ext.getCmp('modStable').setReadOnly(false);
	}
	
	
	function pm_toEdit(){
		save_btn.show();
		pm_form.getForm().reset();
		var selMod = pm_tree.getSelectionModel();
		var node = selMod.getSelectedNode();
		loadForm(node.id, node.text);
		var pnode = node.parentNode;
		get_dom("modPname").value=pnode.text;
		
		Ext.getCmp('pm_fieldSet').setTitle("功能模块-修改");
		Ext.getCmp('modStable').setReadOnly(true);
	}
	
	function pm_toView(){
		pm_toEdit();
		save_btn.hide();
		Ext.getCmp('pm_fieldSet').setTitle("功能模块-查看");
	}
	
	function pm_delete(id, text){
		if(!confirm("确定删除 " + text))
			return;
		Ext.Ajax.request({
			url : path+'/do/pmodule_del/'+id,
	    	method: "POST",
	    	success: function(response, opts) {
	    		tree_reload(0);
	    		pm_toAdd();
		   },
		   failure: function(response, opts) {
		      Ext.Msg.alert('操作请求失败,出错状态: ' + response.status);
		   }

	    });
	}
	
	
	
	var sort_form = new Ext.FormPanel({
//        frame: true,
        labelAlign: 'right',
        labelWidth: 180,
        width:260,
        autoHeight: true,
        waitMsgTarget: true,
        items: [],
        buttons:[
			{ text:"关闭", handler: function(){sort_win.hide();} },
			{ text:"保存", handler: function(){
		    		var ids = document.getElementById("sort_ids").value;
		    		var idArr = ids.split(",");
					var len = idArr.length;
					var orders;
		    		for(var i=0; i<len; i++){
						var id = idArr[i];
						var d = Ext.getCmp("order"+id)
						orders? orders+=","+d.getValue() : orders=d.getValue();
					}
					Ext.Ajax.request({
						url : path+'/do/module/setOrder',
				    	method: "POST",
				    	params:{
				    		ids: ids,
				    		orders: orders
				    	},
				    	success: function(response, opts) {
				    		tree_reload(0);
				    		sort_win.hide();
					   	},
					   	failure: function(response, opts) {
					      	Ext.Msg.alert('操作请求失败,出错状态: ' + response.status);
					   	}
				    });
			}}
		]
    });
	var sort_win = new Ext.Window({
		title: '排序',
		layout:'fit',
		width:'360',
		height:'300',
		pageX: 450,
		pageY: 80,
//		modal:true,
		closeAction:'hide',
		closable:true,
		items:[sort_form]
	});
	
	function pm_toOrder(){
		var selMod = pm_tree.getSelectionModel();
		var node = selMod.getSelectedNode();
		if(node && !node.leaf){
			sort_win.render("sort-win");
		    sort_win.show();
		    sort_form.removeAll();
			Ext.Ajax.request({
				url : path+'/do/module/loadByPid/'+node.id,
		    	method: "POST",
		    	success: function(response, opts) {
		    		var sort_ids = document.getElementById("sort_ids");
		    		var res = Ext.util.JSON.decode(response.responseText);
	    			var data = res.data;
	    			var len = data.length;
	    			var ids;
	    			for(var i=0; i<len; i++){
	    				var d = data[i];
	    				ids? ids+=","+d.modId : ids=d.modId;
	    				var tf = {xtype:'textfield', name:'order_mod', id:'order'+d.modId, value:(i+1), fieldLabel:d.modName,readOnly: true, listeners: {'focus': orderFocusHandler}, width:28};
	    				sort_form.add(tf);
//	    				el += "<div height='30'><input type='text' name='order' id='order_"+d.modId+"' value='"+d.modOrder+"' size='3'/><span> "+d.modName+"</span></div>"
	    			}
//	    			sort_win.setHeight(len*35+50);
//	    			alert(el);
//	    			Ext.DomHelper.insertHtml("beforeEnd", sort_win, el);
		    		sort_win.doLayout();
		    		sort_ids.value = ids;
			   },
			   failure: function(response, opts) {
			      Ext.Msg.alert('操作请求失败,出错状态: ' + response.status);
			   }
		    });
		}
	}
	
	function orderFocusHandler(field){
		var v = field.getValue();
		var ids = document.getElementById("sort_ids").value;
		var idArr = ids.split(",");
		var len = idArr.length;
		if(v==1) return; // 做减时使用
		
		for(var i=0; i<len; i++){
			var id = idArr[i];
			var d = Ext.getCmp("order"+id)
			var dv = 0;
			dv = parseInt(d.getValue());
			if(dv == (v-1)){
				d.setValue(dv+1);
			}
		}
		field.setValue(v-1);
	}
	

	var stable = 'sys_module';
	var actMap = new Map();
	actMap.put('ADD','mod_add_btn');
	actMap.put('EDIT','mod_edit_btn');
	actMap.put('VIEW','mod_view_btn');
	actMap.put('DEL','mod_del_btn');
	permission(stable, actMap);
});

