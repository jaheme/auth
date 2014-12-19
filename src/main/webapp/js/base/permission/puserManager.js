function puser() {
	var menu_w = 210;
	var grid_w = document.body.clientWidth - menu_w;
	var grid_h = document.body.clientHeight - 31;
	var dept_w = 220;

	/**************** 部门树  *************/
	var root_dept = new Ext.tree.AsyncTreeNode({
		id: load_pid,
		text: '最高部门',
		expanded: true
	});
	root_dept.attributes = {
		pkDeptId: '0',
		simpleName: '最高部门'
	}
	var dept_treeGrid = new Ext.ux.tree.TreeGrid({
		title: '部门列表',
		renderTo: 'dept_treegrid',
		width: dept_w,
		height: grid_h,
		autoScroll: true,
		autoHeight: false,
		enableDD: true,
		enableSort: false,
		root: root_dept,
		loader: new Ext.ux.tree.TreeGridLoader({
			url: path + "/do/department/getTreeRoot/ALL"
		}),
		columns: [{
			header: '部门简称',
			dataIndex: 'simpleName',
			width: dept_w - 20
		}],
		viewConfig: {
			forceFit: true
		}
	});
	dept_treeGrid.loader.on('beforeload',
	function(loader, node) {
		var pid = node.attributes.pkDeptId;
		if (load_pid != pid) {
			dept_treeGrid.loader.dataUrl = path + "/do/department/getRootChild/0/" + pid;
		}
	},
	this);
	dept_treeGrid.expandAll();

	dept_treeGrid.addListener('click', menu_click, this);
	function menu_click(node, e) {
		list_store.proxy = new Ext.data.HttpProxy({
			url: path + "/do/puser_list/" + node.attributes.pkDeptId
		});
		list_store.reload();
	}

	/**************** 用户列表  ********************/

	var page_size = 10;
	var list_store = new Ext.data.JsonStore({
		autoDestroy: true,
		url: path + '/do/puser_list/0',
		method: "POST",
		remoteSort: true,
		root: 'rows',
		totalProperty: 'total',
		idProperty: 'id',
		fields: [
		{
			name: 'id'
		},
		{
			name: 'account'
		},
		{
			name: 'userName'
		},
		{
			name: 'gender',
			mapping: 'gender'
		},
		{
			name: 'deptId'
		},
		{
			name: 'deptName'
		},
		{
			name: 'adminAreaName'
		},
		{
			name: 'uState',
			mapping: 'uState'
		},
		{
			name: 'outDate'
		},
		{
			name: 'createDate',
			mapping: 'createDate'
		}
		],
		sortInfo: {
			field: 'createDate',
			direction: 'DESC'
		}
	});

	var grid_sel = new Ext.grid.CheckboxSelectionModel({
		header: '',
		singleSelect: true
	});

	var list_grid = new Ext.grid.GridPanel({
		width: grid_w - dept_w,
		height: grid_h,
		border: 1,
		title: '用户管理',
		renderTo: 'user-grid',
		store: list_store,
		trackMouseOver: false,
		disableSelection: true,
		loadMask: true,
		sm: grid_sel,
		colModel: new Ext.grid.ColumnModel({
			defaults: {
				width: 120,
				sortable: false
			},
			columns: [
			new Ext.grid.RowNumberer({
				header: "#",
				dataIndex: 'id'
			}),
			grid_sel,
			{
				header: "id",
				dataIndex: 'id',
				hidden: true
			},
			{
				header: "帐户",
				dataIndex: 'account'
			},
			{
				header: "姓名",
				dataIndex: 'userName'
			},
			{
				header: "性别",
				dataIndex: 'gender',
				sortable: true,
				renderer: sexRender
			},
			{
				header: "部门ID",
				dataIndex: 'deptId',
				hidden: true
			},
			{
				header: "部门",
				dataIndex: 'deptName'
			},
			{
				header: "行政区域",
				dataIndex: 'adminAreaName'
			},
			{
				header: "状态",
				dataIndex: 'user_state',
				width: 70,
				sortable: true,
				renderer: stateRender
			},
			{
				header: "创建日期",
				dataIndex: 'createDate',
				sortable: true
			},
			{
				header: "失效日期",
				dataIndex: 'outDate'
			}
			]
		}),
		viewConfig: {
			forceFit: true
		},

		tbar: [
		{
			text: "增加",
			iconCls: 'add',
			id: 'user_add_btn',
			handler: toAdd
		},
		{
			text: "修改",
			iconCls: 'modify',
			id: 'user_edit_btn',
			handler: toEdit
		},
		{
			text: "修改帐户密码",
			iconCls: 'modify',
			id: 'psw_edit_btn',
			handler: toPswEdit
		},
		{
			text: "查看",
			iconCls: 'option',
			id: 'user_view_btn',
			handler: toView
		},
		{
			text: "删除",
			iconCls: 'remove',
			id: 'user_del_btn',
			handler: puser_delete
		}
		],
		// paging bar on the bottom
		bbar: new Ext.PagingToolbar({
			pageSize: page_size,
			store: list_store,
			displayInfo: true,
			displayMsg: '当前显示记录 {0} - {1} of {2}',
			emptyMsg: "没有记录"
		})
	});

	/** 加载数据 */
	list_store.load({
		callback: function(r, options, success) {
			//    		alert("记录集大小:"+ r.length + "success:" + success);
			},
		params: {
			start: 0,
			limit: page_size
		}

	});



	var bank_combox = new App.util.dictionary.combox({
    	load_code: 'actions',
//    	load_now: true,
    	hiddenName: 'adminObject',
    	fieldLabel: '行政对象',
    	readOnly: true,
    	anchor:'90%'
    });
	/** 用户Form的定义 */
	var puser_form = new Ext.FormPanel({
		frame: true,
		labelAlign: 'right',
		labelWidth: 85,
		width: 550,
		height: 320,
		waitMsgTarget: true,
		items: [{
			layout: 'column',
			items: [{
				columnWidth: 0.5,
				layout: 'form',
				items: [{
					xtype: 'textfield',
					name: 'account',
					fieldLabel: '登录帐户',
					allowBlank: false,
					emptyText: '请输入帐户',
					maxLength: 20,
					anchor:'90%'
				},
				{
					name: 'id',
					xtype: 'hidden'
				},
				{
					name: 'deptId',
					xtype: 'hidden'
				},
				{
					name: 'createDate',
					xtype: 'hidden'
				},
				{
					name: 'password',
					id: 'password',
					xtype: 'hidden'
				}]
			},
			{
				columnWidth: 0.5,
				layout: 'form',
				items: [{
					xtype: 'textfield',
					name: 'user_password',
					id: 'user_password',
					fieldLabel: '帐户密码',
					inputType: 'password',
					allowBlank: false,
					maxLength: 15,
					anchor:'90%'
				}]
			}]
		},{
			layout: 'column',
			items: [{
				columnWidth: 0.5,
				layout: 'form',
				items: [{
					xtype: 'textfield',
					fieldLabel: '常用称谓',
					name: 'userName',
					maxLength: 20,
					allowBlank: false,
					emptyText: '请输入姓名',
					anchor:'90%'
				}]
			},
			{
				columnWidth: 0.5,
				layout: 'form',
				items: [{
					xtype: 'radiogroup',
					columns: 'auto',
					fieldLabel: '用户性别',
					items: [{
						name: 'gender',
						inputValue: 1,
						boxLabel: '男',
						checked: true
					},
					{
						name: 'gender',
						inputValue: 0,
						boxLabel: '女'
					}]
				}]
			}]
		},{
			layout: 'column',
			items: [{
				columnWidth: 0.5,
				layout: 'form',
				items: [{
					xtype: 'textfield',
					fieldLabel: '所属部门',
					name: 'userDeptName',
					anchor:'90%',
					readOnly: true,
					allowBlank: false,
					emptyText: '单击此选择',
					listeners: {
						'focus': userDept_click
					}
				}]
			},{
				columnWidth: 0.5,
				layout: 'form',
				items: [{
					xtype: 'textfield',
					fieldLabel: '行政区域',
					name: 'adminAreaName',
					id: 'adminAreaName',
					anchor:'90%',
					readOnly: true,
					allowBlank: false,
					emptyText: '单击此选择',
					listeners: {
						'focus': function(){
		        			area_win.render("area_div");
		        			area_win.show();
		        			Ext.getCmp("area_setEls").setValue("adminAreaName,adminArea");
						}
					}
				},{
					name: 'adminArea',
					xtype: 'hidden'
				}]
			}]
		},{
			columnWidth: 1,
			layout: 'form',
			items: [{
				xtype: 'radiogroup',
				columns: 'auto',
				fieldLabel: '用户类型',
				items: [{
					name: 'uType',
					inputValue: '1',
					boxLabel: '普通',
					checked: true
				},
				{
					name: 'uType',
					inputValue: '10',
					boxLabel: '调查员'
				}],
				listeners: {
					'change': function(rg, r){
						if(r.inputValue=="1"){
							bank_combox.setReadOnly(true);
						} else {
							bank_combox.setReadOnly(false);
						}
					}
				}
			}]
		},{
			layout: 'column',
			items: [{
				columnWidth: 0.5,
				layout: 'form',
				items: [bank_combox]
			},{
				columnWidth: 0.5,
				layout: 'form',
				items: [{
					xtype: 'textfield',
					fieldLabel: '第二密码',
					name: 'secondPassword',
					inputType: 'password',
					anchor:'90%'
				}]
			}]
		},{
			layout: 'column',
			items: [{
				columnWidth: 0.5,
				layout: 'form',
				items: [{
					xtype: 'textfield',
					fieldLabel: '身份证件',
					name: 'idCard',
					anchor:'90%'
				}]
			},{
				columnWidth: 0.5,
				layout: 'form',
				items: [{
					xtype: 'textfield',
					fieldLabel: '工作证件',
					name: 'workCard',
					anchor:'90%'
				}]
			}]
		},{
			layout: 'column',
			items: [{
				columnWidth: 0.5,
				layout: 'form',
				items: [
					new Ext.form.DateField({
						fieldLabel: '出生日期',
						name: 'birthday',
						format: 'Ymd',
						editable: false,
						anchor:'90%'
					})
				]
			},{
				columnWidth: 0.5,
				layout: 'form',
				items: [
					new Ext.form.DateField({
						fieldLabel: '失效日期',
						name: 'outDate',
						format: 'Ymd',
						editable: false,
						anchor:'90%'
					})
				]
			}]
		},{
			layout: 'column',
			items: [{
				columnWidth: 0.5,
				layout: 'form',
				items: [{
					xtype: 'radiogroup',
					columns: 'auto',
					fieldLabel: '用户状态',
					items: [{
						name: 'uState',
						inputValue: 1,
						boxLabel: '启用',
						checked: true
					},
					{
						name: 'uState',
						inputValue: 0,
						boxLabel: '不启用'
					}]
				}]
			},{
				columnWidth: 0.5,
				layout: 'form',
				items: [
				
				]
			}]
		}]
	});

	var cancel_btn = puser_form.addButton({
		text: '取消/关闭',
		padding: '150px',
		scale: 'medium',
		width: 100,
		handler: function() {
			puser_win.hide();
		}
	});

	var save_btn = puser_form.addButton({
		text: ' 保 存 ',
		scale: 'medium',
		width: 100,
		handler: function() {
			var f = puser_form.getForm();
			if (f.isValid()) {
				if(Ext.getCmp("user_password").getValue() != "0"){ // 修改时候给的值，防空值不能提交
					Ext.getCmp("password").setValue(MD5( Ext.getCmp("user_password").getValue() ));
				}
				f.submit({
					waitMsg: '正在保存数据请稍后',
					waitTitle: '提示',
					url: path + '/do/puser_addOrUpdate',
					method: 'POST',
					success: function(form, action) {
						list_store.reload();
						Ext.Msg.alert('提示', '保存成功!');
					},
					failure: function(form, action) {
						if (action.result.msg) {
							Ext.Msg.alert('错误提示', '保存失败--: ' + action.result.msg);
							return;
						}
						Ext.Msg.alert('提示', '保存失败--错误类型: ' + action.failureType);
					}
				});
			} else {
				 
						Ext.Msg.alert('提示错误', "表单校验失败，请填写或选择带红星项。");
			}
		}
	});
	// end save_btn


	var puser_win = new Ext.Window({
		layout: 'fit',
		width: '680',
		height: '350',
		pageX: grid_w / 3,
		pageY: 80,
		autoScroll: true,
		closeAction: 'hide',
		resizable: false,
		shadow: true,
		closable: true,
		modal: true,
		animCollapse: true,
		items: [puser_form]
	});


	var dept = new select_department("ALL");
	dept.sel_btn.on('click',
	function() {
		if (dept.selected()) {
			setByName("deptId", dept.get("id"));
			setByName("userDeptName", dept.get("name"));
			dept_win.hide();
		}
	});
	dept.hide_btn.on('click',
	function() {
		dept_win.hide();
	});

	var dept_win = new Ext.Window({
		title: '部门选择',
		width: '500',
		height: '500',
		closeAction: 'hide',
		items: [dept.dept_tree]
	});

	function dept_win_show() {
		dept_win.show();
		dept.dept_tree.expandAll();
	}

	function userDept_click(tf) {
		dept_win_show();
	}

	
	function puser_win_show(title_msg) {
		puser_win.render("user-form-win");
		puser_form.form.reset();
		puser_form.isAdd = true;
		puser_win.setTitle(title_msg);
		puser_win.show();
	}



	function toAdd() {
		Ext.getCmp("user_password").setVisible(true);
		puser_win_show("添加用户");
		save_btn.show();
	}

	function loadForm(r) {
		Ext.getCmp("user_password").setVisible(false);
		Ext.getCmp("user_password").setValue("0");
		var pf = puser_form.getForm();
		pf.load({
			url: path + "/do/puser_load/" + r.get("id"),
			method: 'POST',
			success: function(form, action) {
				pf.setValues(action.result.data);
				setByName("userDeptName", r.get("deptName"));
				setByName("adminAreaName", r.get("adminAreaName"));
			},
			failure: function(form, action) {
				Ext.Msg.alert('提示', r.get("account") + ' 的数据加载失败: ' + action.failureType);
			}
		});
	}

	function toEdit() {
		var r = list_grid.getSelectionModel().getSelected();
		if (r) {
			puser_win_show("用户信息修改");
			save_btn.show();
			loadForm(r);
		}
	}

	function toView() {
		var r = list_grid.getSelectionModel().getSelected();
		if (r) {
			puser_win_show("用户信息查看");
			save_btn.hide();
			loadForm(r);
		}
	}

	function puser_delete() {
		var r = list_grid.getSelectionModel().getSelected();
		Ext.Ajax.request({
			url: path + "/do/puser_del/" + r.get("id"),
			method: "POST",
			success: function(response, opts) {
				list_store.reload();
			},
			failure: function(response, opts) {
				Ext.Msg.alert('操作请求失败,出错状态: ' + response.status);
			}
		});
	}

	/** 用户Form的定义 */
	var psw_form = new Ext.FormPanel({
		frame: true,
		labelAlign: 'right',
		labelWidth: 85,
		width: 260,
		height: 160,
		waitMsgTarget: true,
		items: [{
			name: 'password',
			id: 'userPasswordId',
			xtype: 'textfield',
			hidden: true
		},
		{
			name: 'user_password_old',
			id: 'user_password_old',
			fieldLabel: '旧密码',
			inputType: 'password',
			xtype: 'textfield',
			allowBlank: false,
			maxLength: 20,
			width: 190
		},
		{
			name: 'user_password1',
			id: 'user_password1',
			fieldLabel: '新密码',
			inputType: 'password',
			xtype: 'textfield',
			allowBlank: false,
			maxLength: 20,
			width: 190
		},
		{
			name: 'user_password2',
			id: 'user_password2',
			fieldLabel: '确认新密码',
			inputType: 'password',
			xtype: 'textfield',
			allowBlank: false,
			maxLength: 15,
			width: 190
		}],
		buttons: [
		{
			text: "关闭",
			handler: function() {
				psw_win.hide();
			}
		},
		{
			text: "修改",
			handler: pws_save
		}
		]
	});
	var psw_win = new Ext.Window({
		title: '修改密码',
		layout: 'fit',
		width: '360',
		height: '300',
		pageX: grid_w / 3,
		pageY: 80,
		autoScroll: true,
		closeAction: 'hide',
		resizable: false,
		shadow: true,
		closable: true,
		modal: true,
		animCollapse: true,
		items: [psw_form]
	});

	function load_pswForm(r) {
		var pf = psw_form.getForm();
		pf.load({
			url: path + "/do/puser_load/" + r.get("id"),
			method: 'POST',
			success: function(form, action) {
				pf.setValues(action.result.data);
			},
			failure: function(form, action) {
				Ext.Msg.alert('提示', r.get("account") + ' 的数据加载失败: ' + action.failureType);
			}
		});
	}

	function toPswEdit() {
		var r = list_grid.getSelectionModel().getSelected();
		if (r) {
			psw_form.getForm().reset();
			load_pswForm(r);
			psw_win.render("psw-form-win");
			psw_win.show();
		}
	}


	/**
	 * 修改密码
	 */
	function pws_save() {
		var old = Ext.getCmp("user_password_old").getValue();
		var nowP = Ext.getCmp("userPasswordId").getValue();
		if (MD5(old) != nowP) {
			alert("填写的旧密码不正确！"+MD5(old)+" != "+nowP);
			return;
		}
		if (Ext.getCmp("user_password1").getValue() != Ext.getCmp("user_password2").getValue()) {
			alert("填写的新密码2次不一样！");
			return;
		}
		var f = psw_form.getForm();
		if (f.isValid()) {
			var r = list_grid.getSelectionModel().getSelected();
			f.submit({
				waitMsg: '正在保存数据请稍后',
				waitTitle: '提示',
				url: path + "/do/puser_chang_psw/" + r.get("id"),
				method: 'POST',
				params: {
					psw: MD5(Ext.getCmp("user_password1").getValue())
				},
				success: function(form, action) {
					psw_win.hide();
					Ext.Msg.alert('提示', '用户[' + r.get("userName") + "]的密码已修改。");
				},
				failure: function(form, action) {
					Ext.Msg.alert('提示', '保存失败--错误类型: ' + action.failureType);
				}
			});
		}
	}

	
	var area_win = new Ext.Window({
		layout: 'fit',
    	width:'350',
    	pageX: grid_w/3+320,
    	pageY: 190,
    	closeAction:'hide',
		items:[
			new Ext.FormPanel({
//		        labelWidth: 10,
        		labelAlign: 'right',
		        width:310,
		        height:180,
		        bodyStyle:'padding:5px 5px 0',
		        items: [{
		        	xtype:'hidden',
		        	id: 'area_setEls'
		        },
				new Ext.form.ComboBox({
						id: 'city',
						store: new Ext.data.JsonStore({
								url: path+'/do/tree/getAreas',
								method: 'POST',
								idProperty: 'code',
								fields:[
							        {name:'code'},  
							        {name:'text'}  
							    ]
							}),
						valueField :"code",
						displayField: "text",
						fieldLabel: '区域选择',
				     	editable: false,
				     	triggerAction: 'all',
					 	listeners: {
					 		'select': function(el, r, index){
					 			var county = Ext.getCmp("county");
					 			county.store.setBaseParam("code", r.get("code"));
					 			county.clearValue();
					 			var cb2 = Ext.getCmp("town");
					 			cb2.clearValue();
					 			var cb3 = Ext.getCmp("village");
					 			cb3.clearValue();
					 		}
					 	}
				 	}),
				new Ext.form.ComboBox({
						id: 'county',
						store: new Ext.data.JsonStore({
								url: path+'/do/tree/areas',
								method: 'POST',
								idProperty: 'code',
								fields:[
							        {name:'code'},  
							        {name:'text'}  
							    ],
						    	baseParams:{}
							}),
						valueField :"code",
						displayField: "text",
//						fieldLabel: '区 / 县',
				     	editable: false,
				     	triggerAction: 'all',
					 	listeners: {
							'beforequery': function(qe){
					            delete qe.combo.lastQuery;
					        },
					 		'select': function(el, r, index){
					 			var cb2 = Ext.getCmp("town");
					 			cb2.store.setBaseParam("code", r.get("code"));
					 			cb2.clearValue();
					 			var cb3 = Ext.getCmp("village");
					 			cb3.clearValue();
					 		}
					 	}
				 	}),
				 	new Ext.form.ComboBox({
				 		id: 'town',
						store: new Ext.data.JsonStore({
							url: path+'/do/tree/areas',
							method: 'POST',
							idProperty: 'code',
							fields:[
						        {name:'code'},  
						        {name:'text'}  
						    ],
						    baseParams:{}
						}),
						valueField :"code",
						displayField: "text",
//						fieldLabel: '乡 / 镇',
				     	editable: false,
				     	triggerAction: 'all',
					 	listeners: {
							'beforequery': function(qe){
					            delete qe.combo.lastQuery;
					        },
					 		'select': function(el, r, index){
					 			var cb = Ext.getCmp("village");
					 			cb.store.setBaseParam("code", r.get("code"));
					 			cb.clearValue();
					 		}
					 	}
				 	}),
				 	new Ext.form.ComboBox({
				 		id: 'village',
						store: new Ext.data.JsonStore({
							url: path+'/do/tree/areas',
							method: 'POST',
							idProperty: 'code',
							fields:[
						        {name:'code'},  
						        {name:'text'}  
						    ],
						    baseParams:{}
						}),
						valueField :"code",
						displayField: "text",
//						fieldLabel: '居委会',
				     	editable: false,
				     	triggerAction: 'all',
					 	listeners: {
							'beforequery': function(qe){
					            delete qe.combo.lastQuery;
					        },
					 		'select': function(el, r, index){
					 			
					 		}
					 	}
				 	})
			 	],
			 	buttons: [{
			 		id: 'area_exit_btn',
			 		text: '退出',
			 		handler: function(){area_win.hide();}
			 	},{
			 		id: 'area_sel_btn',
			 		text: ' 确 定 ',
			 		handler: function(){
			 				var arr = Ext.getCmp("area_setEls").getValue().split(",");
			 				var el_text, el_value;
			 				var city = Ext.getCmp("city");
			 				var cityrc = city.store.getById(city.getValue());
			 				cityrc? el_text=cityrc.get("text") : "";
			 				cityrc? el_value=city.getValue():"";
			 				
			 				var county = Ext.getCmp("county");
			 				var rc = county.store.getById(county.getValue());
			 				rc? el_text=el_text+","+rc.get("text") : "";
			 				rc? el_value=county.getValue():"";
			 				
			 				var town = Ext.getCmp("town");
			 				var t_rc = town.store.getById(town.getValue());
			 				t_rc? el_text=el_text+","+t_rc.get("text") : "";
			 				t_rc? el_value=town.getValue():"";
			 				
			 				var village =  Ext.getCmp("village");
			 				var cv = village.getValue();
			 				var c_rc = village.store.getById(cv);
			 				c_rc? el_text=el_text+","+c_rc.get("text") : "";
			 				c_rc? el_value=village.getValue():"";
			 				
			 				setByName(arr[0], el_text);
			 				setByName(arr[1], el_value);
			 				
			 				area_win.hide();
			 			}
			 	}]
			})
		]
	});
	
}


Ext.onReady(function() {
	this.puser();

	var stable = 'sys_user';
	var actMap = new Map();
	actMap.put('ADD', 'user_add_btn');
	actMap.put('EDIT', 'user_edit_btn,psw_edit_btn');
	actMap.put('VIEW', 'user_view_btn');
	actMap.put('DEL', 'user_del_btn');
	permission(stable, actMap);
});


function sexRender(val) {
	if (val == 1)
	 return "男";
	else
	 return "女";
}

function stateRender(val) {
	if (val == '0') {
		return "<span style='color:#FF0000'>未启用</span>";
	}
	 else {
		return "启用中";
	}
}
