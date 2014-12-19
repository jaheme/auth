function fn() {
	Ext.BLANK_IMAGE_URL = 'ext/resources/images/default/s.gif';

	Ext.QuickTips.init();

	var planform = new Ext.form.FormPanel({
				title : "计划查询",
				renderTo : 'plan_search',
				collapsible : true,
				items : [{
					layout : "table",
					layoutConfig : {
						columns : 6
					},
					defaults : {
						bodyStyle : "padding:2px;",
						style : "margin:2px;",
						border : false
					},
					items : [{
								html : "计划编号",
								width : 100
							}, {
								items : [{
											xtype : "textfield",
											width : 120,
											name : "textvalue_id",
											hiddenName : 'plan_id'

										}]
							}, {
								html : "计划标题",
								width : 100
							}, {
								items : [{
											xtype : "textfield",
											width : 120,
											name : "textvalue_title",
											hiddenName : 'plan_title'
										}]
							}, {
								html : ""
							}, {
								html : ""
							}, {
								html : "项目",
								width : 100
							}, {
								items : [{
											xtype : "combo",
											width : 120,
											name : "combovalue_block",
											hiddenName : 'project'
										}]
							}, {
								html : "模块",
								width : 100
							}, {
								items : [{
											xtype : "combo",
											width : 120,
											name : "combovalue_block",
											hiddenName : 'block'
										}]
							}, {
								html : ""
							}, {
								html : ""
							}, {
								html : "计划类别",
								width : 100
							}, {
								items : [{
											xtype : "combo",
											width : 120,
											name : "combovalue_type",
											hiddenName : 'plan_type'
										}]
							}, {
								html : "计划级别",
								width : 100
							}, {
								items : [{
											xtype : "combo",
											width : 120,
											name : "combovalue_level",
											store : ['高', '中', '低'],
											hiddenName : 'plan_level'
										}]
							}, {
								html : "计划状态",
								width : 100
							}, {
								items : [{
											xtype : "combo",
											width : 120,
											name : "combovalue_state",
											hiddenName : 'plan_state'
										}]
							}, {
								items : [{
											xtype : "combo",
											width : 120,
											name : "combovalue_time",
											store : ['计划提出时间', '任务分配时间',
													'计划终结时间'],
											hiddenName : 'time'
										}]

							}, {
								html : "从",
								width : 30
							}, {
								items : [{
											xtype : "datefield",
											width : 120,
											name : "datevalue_begin_time",
											hiddenName : 'begin_time'
										}]
							}, {
								html : "到",
								width : 100
							}, {
								items : [{
											xtype : "datefield",
											width : 120,
											name : "datevalue_end_time",
											hiddenName : 'end_time'
										}]
							}, {
								items : [{
											xtype : "button",
											text : "查询",
											name : "datevalue"
										}]
							}]
				}]
			});
}
Ext.onReady(fn);