Ext.ns("App.util.dictionary");
App.util.dictionary.combox = Ext.extend(Ext.form.ComboBox, {
		load_code: '0',
		load_now : false,
		mode: 'local',
//		pageSize: 10,
		queryParam: 'params',
		queryDelay: 500,
		valueField :"dicValue",
		displayField: "dicName",
     	hiddenName:'',
     	editable: false,
     	triggerAction: 'all',
     	typeAhead: true,
		fieldLabel: "默认label",
		name: '',
	 	width:190,
	    listWidth: 250,
		initComponent : function() {
        	App.util.dictionary.combox.superclass.initComponent.call(this);
        	this.store = new Ext.data.JsonStore({
			    url: path+'/do/dictionary/combox_list/'+this.load_code,
			    method: 'POST',
	//		    totalProperty: 'total',
			    root: 'rows',
			    idProperty: 'dicValue',
			    fields:[
			        {name:'dicValue',type:'string',mapping:'dicValue'},  
			        {name:'dicName',type:'string',mapping:'dicName'}  
			    ]
			});
			if(this.load_now){  // 立刻向服务端加载,默认是组件渲染时(onRender)自动加载数据
				this.store.load();
			}
	    },
	    onRender : function(ct, position){
	    	App.util.dictionary.combox.superclass.onRender.call(this, ct, position);
	    	if( !this.load_now ){
	    		this.store.load();
	    	}
	    },
		load : function(){  // 手动加载使用,一般是在组件渲染前调用加载。
			this.load_now = true; // 设置已加载，组件渲染时(onRender)不再加载数据
			this.store.load();
		},
	    getText: function(v){
			var r = this.store.getById(v);
			if(r){
				return r.get("dicName");
			}
			return v;
		}
});
Ext.reg('dictionary_combox', App.util.dictionary.combox);



var dic_combox = function te(load_code, hideName, fieldText){
	this.allowblank = true;
	this.cateBox = new Ext.form.ComboBox({
		mode: 'local',
//		pageSize: 10,
		queryParam: 'params',
		queryDelay: 500,
		valueField :"dicValue",
		displayField: "dicName",
     	hiddenName:hideName,
     	editable: false,
     	triggerAction: 'all',
     	typeAhead: true,
		fieldLabel: fieldText,
		name: hideName,
	 	width:190,
	    listWidth: 250,
		store: new Ext.data.JsonStore({
		    url: path+'/do/dictionary/combox_list/'+load_code,
		    method: 'POST',
//		    totalProperty: 'total',
		    root: 'rows',
		    idProperty: 'dicValue',
		    fields:[
		        {name:'dicValue',type:'string',mapping:'dicValue'},  
		        {name:'dicName',type:'string',mapping:'dicName'}  
		    ]
		})
	});
	this.load = function(){
		this.cateBox.store.load();
	}
	this.getText = function(v){
		var r = this.cateBox.store.getById(v);
		if(r){
			return r.get("dicName");
		}
		return v;
	}
}




