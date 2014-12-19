function fn() {
	Ext.BLANK_IMAGE_URL = 'ext/resources/images/default/s.gif';

	Ext.QuickTips.init();

	var planform = new Ext.form.FormPanel({
				title : "�ƻ���ѯ",
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
								html : "�ƻ����",
								width : 100
							}, {
								items : [{
											xtype : "textfield",
											width : 120,
											name : "textvalue_id",
											hiddenName : 'plan_id'

										}]
							}, {
								html : "�ƻ�����",
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
								html : "��Ŀ",
								width : 100
							}, {
								items : [{
											xtype : "combo",
											width : 120,
											name : "combovalue_block",
											hiddenName : 'project'
										}]
							}, {
								html : "ģ��",
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
								html : "�ƻ����",
								width : 100
							}, {
								items : [{
											xtype : "combo",
											width : 120,
											name : "combovalue_type",
											hiddenName : 'plan_type'
										}]
							}, {
								html : "�ƻ�����",
								width : 100
							}, {
								items : [{
											xtype : "combo",
											width : 120,
											name : "combovalue_level",
											store : ['��', '��', '��'],
											hiddenName : 'plan_level'
										}]
							}, {
								html : "�ƻ�״̬",
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
											store : ['�ƻ����ʱ��', '�������ʱ��',
													'�ƻ��ս�ʱ��'],
											hiddenName : 'time'
										}]

							}, {
								html : "��",
								width : 30
							}, {
								items : [{
											xtype : "datefield",
											width : 120,
											name : "datevalue_begin_time",
											hiddenName : 'begin_time'
										}]
							}, {
								html : "��",
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
											text : "��ѯ",
											name : "datevalue"
										}]
							}]
				}]
			});
}
Ext.onReady(fn);