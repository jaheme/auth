
	Ext.onReady(function(){
		Ext.BLANK_IMAGE_URL = path+"/ext/resources/images/default/s.gif";
		var bw = window.screen.availHeight;// document.body.clientHeight;
		var top_height = 150;
		var menu_root = new Ext.tree.AsyncTreeNode({
			text: '菜单列表',
		    id:load_pid,
			expanded : true //默认展开根节点
		});
		
		//异步请求数据
		var menu_loader = new Ext.tree.TreeLoader({
        	dataUrl: path+'/do/pm_treeRoot/'+load_pid
        });
    	menu_loader.purgeListeners();
    	
    	var menu_tree = new Ext.tree.TreePanel({
//	        title: '功能模块',
//	        useArrows:true,
//	        autoScroll:true,
//	        animate:true,
//	        enableDD:true,
//	        containerScroll: true,
    		height: bw-top_height,
	        rootVisible: false,
	        root: menu_root,
	        loader: menu_loader,
			hrefTarget : 'mainContent'
    	});
    	
    	menu_loader.addListener('beforeload',beforeloadFtn , this);
	    function beforeloadFtn(loader, node){
	    	var pid = node.id;
//	    	if(isNaN(pid) && pid.indexOf("xnode-")>-1)
//	    		pid = pid.replace("xnode-","");
	    	if (load_pid != pid){
	    		loader.dataUrl = path+"/do/pm_treeMenu/"+pid;
	    	}
	    }
    	menu_loader.addListener('loadexception ', function(loader, node, res){
    		alert(" 菜单加载异常: " + " 加载 " + node + " 时出现错误:"+res);
    	});
    	
    	
	    menu_tree.addListener('click', menu_click , this);
	     function menu_click(node, e){
	     	if(null!=node.attributes.src && node.attributes.src!=""){
	     			mainPanel.removeAll(true);
	     			var e = Ext.select("x-dd-drag-proxy x-dd-drop-nodrop",document.body);
//	     			alert(e.getCount());
					mainPanel.load({
							url:path+"/"+node.attributes.src,
							callback : function(){
								mainPanel.setTitle(node.text);
							},
							scripts: true
					});
			}
	    }
    	menu_tree.expandAll();
	    
	    
		var pnCenter=new Ext.Panel({  
//                    region:'center',  
//                    activeTab:0,  
//                    items:[  
//                        {  
//                            title:'欢迎使用',  
//                            authHeight:true,  
//                            closable:true,//是否可关闭  
                            html:'<div style="font-size:18; font-weight: bold; align:center;">' +
                            		'欢迎您！！！</div>'  
//                        }  
//                    ]  
                });  
		
		new Ext.Viewport({
			layout:'border',//表格布局
			items: [{
//				collapsible: true,
//				contentEl:'top-logo',
//				region: 'north',//指定子面板所在区域为north
//				height: 60
//			},{
				title : '功能菜单',
				items : menu_tree,
				split:true,
				collapsible: true,
				region:'west',//指定子面板所在区域为west
				width: 190
			},{
//				title: '系统说明',
				items:pnCenter,
			//	contentEl : 'aboutDiv',
				collapsible: true,
				id : 'mainContent',
				region:'center'//指定子面板所在区域为center
			}]
		});
		var mainPanel = Ext.getCmp('mainContent');
	});