
function select_department(load_code, w, h){
	this.root_node = new Ext.tree.AsyncTreeNode({ 
				id : load_code, 
				text : '最高部门',
				expanded : true
		});
	this.root_node.attributes = {
		pkDeptId: load_code,
		simpleName: '最高部门'
	}
	this.dept_tree = new Ext.ux.tree.TreeGrid({
		layout: 'fit',
		boxMinWidth: 300,
		boxMaxHeight: 600,
        autoScroll : true, 
        enableDD: true,
        enableSort: false,
        root: this.root_node,
        loader : new Ext.ux.tree.TreeGridLoader({
			url : path+"/do/department/getTreeRoot/"+load_code,
			listeners: {
				'beforeload': function(loader , node){
					var pid = node.attributes.pkDeptId;
			    	if (load_code != pid){
			    		loader.dataUrl = path+"/do/department/getRootChild/0/"+pid;
			    	}
				}
			}
		}),
        columns:[{
            header: '部门简称', dataIndex: 'simpleName', Width: 300
        }],
        viewConfig: {
            forceFit:true
        }, 
        bbar:[
        	{ text:"退出选择",iconCls:'option', id:'dept_quit_btn'},
			{ xtype: 'tbseparator'},
        	{ text:"选择",iconCls:'add', id:'dept_tree_select_btn',scale: 'medium'}
        ]
	});
	this.sel_btn = Ext.getCmp("dept_tree_select_btn");
	this.hide_btn = Ext.getCmp("dept_quit_btn");
	
	this.selected = function(){
		if(this.dept_tree.getSelectionModel().getSelectedNode()){
			return true;
		}
		return false;
	}
	
	this.get = function(name){
		var node = this.dept_tree.getSelectionModel().getSelectedNode();
		if(node){
			if(name=="id"){
				return node.attributes.pkDeptId
			}
			if(name=="name"){
				return node.attributes.simpleName
			}
			if(name=="pid"){
				return node.attributes.parentId
			}
		}
	}
	
	
}