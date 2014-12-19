
Ext.ns("App.util.user");

App.util.user.combox_user = Ext.extend(Ext.form.ComboBox, {
		mode: 'local',
		pageSize: 10,
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
	    listWidth: 250,
		store: new Ext.data.JsonStore({
		    url: path+'/do/puser/list',
		    method: 'POST',
		    totalProperty: 'total',
		    root: 'rows',
		    fields:[
		        {name:'userId',type:'int',mapping:'userId'},  
		        {name:'userName',type:'string',mapping:'userName'}  
		    ]
		}),
	    initComponent : function() {
        	App.util.user.combox_user.superclass.initComponent.call(this); 
	    }
	    
})



