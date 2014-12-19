/*!
 * Ext JS Library 3.3.1
 * Copyright(c) 2006-2010 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
var winTitle = "游客,你好!"; //这里定义一个系统开始菜单用户名的变量
// Sample desktop configuration
MyDesktop = new Ext.app.App({
	init :function(){
		Ext.QuickTips.init();
	},

	getModules : function(){
		return [
          	new MyDesktop.SystemManagerWindow()
		];
	},

    // config for the start menu
    getStartConfig : function(){
        return {
//            title: winTitle,
            iconCls: 'user',
            toolItems: [{
                text:'角色切换',
                iconCls:'settings',
                scope:this,
                handler: function(){
                	switch_role_win.show(); // 在index.js文件里定义
                }
            },'-',{
                text:'退出',
                iconCls:'logout',
                scope:this,
                handler : function() {
	                Ext.Ajax.request({
		                url : path+'/do/out_login',
		                method: 'POST',
		                success : function() {
		                	window.location.href = 'login.jsp';
		               }
              		});
              	}
            }]
        };
    }
});


/** 系统管理 */
MyDesktop.SystemManagerWindow= Ext.extend(Ext.app.Module, {	
	id : 'system-manager',///这部分的id，如果要在桌面上放置快捷方式则桌面上的快捷图标id为本窗体的id后面加上'-shortcut'(''中间内容)
    init : function(){
        this.launcher = {
            text: '系统设置',
            iconCls:'bogus',
            handler : this.createWindow,//这句表明其创建窗口的句柄
            scope: this,
            windowId:'system' //将当前的window数量加1作为新的窗口的id
        }
    },
    createWindow : function(src){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('user-system');
         iframeTemplate = new Ext.Template();
        iframeTemplate.set('<iframe id="{id}" scrolling="{scroll}"  marginheight="0" marginwidth="0" width="100%" height="100%" src="{src}" frameborder="0" class="x-tab-strip x-tab-strip-top"></iframe>',true);
        if(!win){
            win = desktop.createWindow({
                id:'user-system',
                title:"系统管理设置",
                width:Ext.getBody().getWidth()*0.9,
                height:Ext.getBody().getHeight()*0.9,
                iconCls: 'accordion',
                shim:false,
                resizable : false,
                animCollapse:false,
                maximizable : true,
                maximized : true,
                constrainHeader:true,
                layout: 'fit',
                html : iframeTemplate.applyTemplate({id:Ext.id()+"_iframe",src: 'jsp/base/systemManager.jsp',scroll:"auto"})
                /*autoLoad : {url: __ctxPath + '/indexEn.jsp' ,
		            text:"页面加载中，请稍后..." ,
		            //nocache: true,
		            scripts: true
	            }*/
                
                //items: [panelInfo]
            });
        }
        win.show();
    }
});



/*
 * Example windows
 */
/*MyDesktop.GridWindow = Ext.extend(Ext.app.Module, {
    id:'grid-win',
    init : function(){
        this.launcher = {
            text: 'Grid Window',
            iconCls:'icon-grid',
            handler : this.createWindow,
            scope: this
        }
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('grid-win');
        if(!win){
            win = desktop.createWindow({
                id: 'grid-win',
                title:'Grid Window',
                width:740,
                height:480,
                iconCls: 'icon-grid',
                shim:false,
                animCollapse:false,
                constrainHeader:true,

                layout: 'fit',
                items:
                    new Ext.grid.GridPanel({
                        border:false,
                        ds: new Ext.data.Store({
                            reader: new Ext.data.ArrayReader({}, [
                               {name: 'company'},
                               {name: 'price', type: 'float'},
                               {name: 'change', type: 'float'},
                               {name: 'pctChange', type: 'float'}
                            ]),
                            data: Ext.grid.dummyData
                        }),
                        cm: new Ext.grid.ColumnModel([
                            new Ext.grid.RowNumberer(),
                            {header: "Company", width: 120, sortable: true, dataIndex: 'company'},
                            {header: "Price", width: 70, sortable: true, renderer: Ext.util.Format.usMoney, dataIndex: 'price'},
                            {header: "Change", width: 70, sortable: true, dataIndex: 'change'},
                            {header: "% Change", width: 70, sortable: true, dataIndex: 'pctChange'}
                        ]),

                        viewConfig: {
                            forceFit:true
                        },
                        //autoExpandColumn:'company',

                        tbar:[{
                            text:'Add Something',
                            tooltip:'Add a new row',
                            iconCls:'add'
                        }, '-', {
                            text:'Options',
                            tooltip:'Blah blah blah blaht',
                            iconCls:'option'
                        },'-',{
                            text:'Remove Something',
                            tooltip:'Remove the selected item',
                            iconCls:'remove'
                        }]
                    })
            });
        }
        win.show();
    }
});*/

MyDesktop.TabWindow = Ext.extend(Ext.app.Module, {
    id:'tab-win',
    init : function(){
        this.launcher = {
            text: 'Tab Window',
            iconCls:'tabs',
            handler : this.createWindow,
            scope: this
        }
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('tab-win');
        if(!win){
            win = desktop.createWindow({
                id: 'tab-win',
                title:'Tab Window',
                width:740,
                height:480,
                iconCls: 'tabs',
                shim:false,
                animCollapse:false,
                border:false,
                constrainHeader:true,

                layout: 'fit',
                items:
                    new Ext.TabPanel({
                        activeTab:0,

                        items: [{
                            title: 'Tab Text 1',
                            header:false,
                            html : '<p>Something useful would be in here.</p>',
                            border:false
                        },{
                            title: 'Tab Text 2',
                            header:false,
                            html : '<p>Something useful would be in here.</p>',
                            border:false
                        },{
                            title: 'Tab Text 3',
                            header:false,
                            html : '<p>Something useful would be in here.</p>',
                            border:false
                        },{
                            title: 'Tab Text 4',
                            header:false,
                            html : '<p>Something useful would be in here.</p>',
                            border:false
                        }]
                    })
            });
        }
        win.show();
    }
});



// for example purposes
var windowIndex = 0;

MyDesktop.BogusModule = Ext.extend(Ext.app.Module, {
    init : function(){
        this.launcher = {
            text: 'Window '+(++windowIndex),
            iconCls:'bogus',
            handler : this.createWindow,
            scope: this,
            windowId:windowIndex
        }
    },

    createWindow : function(src){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('bogus'+src.windowId);
        if(!win){
            win = desktop.createWindow({
                id: 'bogus'+src.windowId,
                title:src.text,
                width:640,
                height:480,
                html : '<p>Something useful would be in here.</p>',
                iconCls: 'bogus',
                shim:false,
                animCollapse:false,
                constrainHeader:true
            });
        }
        win.show();
    }
});


MyDesktop.BogusMenuModule = Ext.extend(MyDesktop.BogusModule, {
    init : function(){
        this.launcher = {
            text: 'Bogus Submenu',
            iconCls: 'bogus',
            handler: function() {
				return false;
			},
            menu: {
                items:[{
                    text: 'Bogus Window '+(++windowIndex),
                    iconCls:'bogus',
                    handler : this.createWindow,
                    scope: this,
                    windowId: windowIndex
                    },{
                    text: 'Bogus Window '+(++windowIndex),
                    iconCls:'bogus',
                    handler : this.createWindow,
                    scope: this,
                    windowId: windowIndex
                    },{
                    text: 'Bogus Window '+(++windowIndex),
                    iconCls:'bogus',
                    handler : this.createWindow,
                    scope: this,
                    windowId: windowIndex
                    },{
                    text: 'Bogus Window '+(++windowIndex),
                    iconCls:'bogus',
                    handler : this.createWindow,
                    scope: this,
                    windowId: windowIndex
                    },{
                    text: 'Bogus Window '+(++windowIndex),
                    iconCls:'bogus',
                    handler : this.createWindow,
                    scope: this,
                    windowId: windowIndex
                }]
            }
        }
    }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
 * by:rush date:2011年3月25日 23:59:40
 * 说明：在这里添加自己写的window
 * 在上面声明一个RegisterWindow
 * */
//定义一个html的变量存放要在window里面写的html语言
var html = "<br/><br/><br/><br/><br/><div align='center'><form action='' method='post' id='registForm'><table>" +
		"<tr><td>用户昵称：</td><td><input type='text' id='userName' name='userName' class='input' onblur='validate(this);' /></td></tr>" +
		"<tr><td><br/></td><td><div id='userNameValidate'class='gray'>用于登陆或者让别人认识你...</div></td></tr>" +
		"<tr><td>电子邮箱：</td><td><input type='text' id='userEmail' name='userEmail' class='input' onblur='validate(this);' /></td></tr>" +
		"<tr><td><br/></td><td><div id='userEmailValidate' class='gray'>EMail地址,用于登陆或者找回密码...</div></td></tr>" +
		"<tr><td>登录密码：</td><td><input type='password' id='userPassword1' name='userPassword1' class='input' onblur='validate(this);' /></td></tr>" +
		"<tr><td><br/></td><td><div id='userPassword1Validate' class='gray'>输入登陆口令...</div></td></tr>" +
		"<tr><td>重复密码：</td><td><input type='password' id='userPassword2' name='userPassword2' class='input' onblur='validate(this);' /></td></tr>" +
		"<tr><td><br/></td><td><div id='userPassword2Validate' class='gray'>再次输入确认登陆口令...</div></td></tr>" +
		"<tr><td align='center' colspan='2'><input type='button' id='submit1' name='submit1' value='注册' style='width:80px;height:30px;' onclick='regNew();' />&nbsp;&nbsp;&nbsp;&nbsp;<input type='reset' id='reset' name='reset' value='重置' style='width:80px;height:30px;'/>&nbsp;&nbsp;&nbsp;&nbsp;<input type='button' id='login' name='login' value='登陆' onclick='showLoginWindow();' style='width:80px;height:30px;'/></td></tr>" +
		"</table></form></div>";


/////////////////end
/*
 * by:rush date:2011年3月26日 21:14:08
 * 功能：创建一个显示登陆的窗口
 * */
var loginWin = null;
MyDesktop.LoginWindow = Ext.extend(Ext.app.Module,{
  id : 'user-login',
  init : function(){
       this.launcher = {
            text: '欢迎登陆',
            iconCls:'bogus',
            handler : this.createWindow,//这句表明其创建窗口的句柄
            scope: this,
            windowId:'user-login' //窗口的id
        }
  },
  createWindow : function(src){
     var desktop = this.app.getDesktop();
        var win = desktop.getWindow('user-login');
        if(!win){
            win = desktop.createWindow({
                id:'user-login',
                title:"请先登陆",
                width:640,
                height:300,
                html : '',
                iconCls: 'bogus',
                shim:false,
                animCollapse:false,
                constrainHeader:true,
                maximizable : false,
                minimizable : false,
                closable : false,
                modal : true,
                layout : 'fit',
                items : [
                   {
                    xtype : 'form',
                    //title : '<div align="center">用户登陆</div>',
                    formId : 'loginForm',
                    width : 480,
                    height : 320,
                    labelWidth: 230,//修改这个值可以是输入框居中
				    labelAlign: "right",
				    layout: "form",
				    defaultType:'textfield',
				    buttonAlign : 'center',
				    formBind : true,
				    items : [
				      {
				       xtype : 'label',
				       height : 50
				      },
				      {
					        xtype:"textfield",
							fieldLabel:"用户名或Email",
							anchor:"70%",						
							id : 'userNameOrEmail',
							name : 'userNameOrEmail'
				      },
				      {
				        xtype:"textfield",
						fieldLabel:"密码",
						anchor:"70%",
						inputType : 'password',
						id : 'userPassword',
						name : 'userPassword'
				      }      		      
				    ],
				    buttons : [
				       {
				        xtype:"button",
						text:"登陆",
						scale : 'medium',
						type : 'button',
						handler : loginSubmit
				      },
				      {
				       xtype : 'button',
				       text : '注册',
				       scale : 'medium',
				       handler : function(){
				                    win.close();
				                    Ext.getDom("user-reg-shortcut").click();
				                 }
				      }
				    ]
				    
				    
                   }
                ]
            });
        }
     win.show();
     loginWin = win;
  }
});
//////
/*
 * by:rush date:2011年3月27日 00:18:19
 * 功能：进行登录操作
 * */
function loginSubmit(){
////进行登陆验证
if(Ext.isEmpty(Ext.getDom("userNameOrEmail").value,false)){
  Ext.Msg.alert("温馨提示","用户名或邮箱不能为空!");
  return;
}
if(Ext.isEmpty(Ext.getDom("userPassword").value,false)){
  Ext.Msg.alert("温馨提示","密码不能为空!");
  return;
}
/////////////////////////	
  var path = Ext.getDom("path").value;
  var msg = Ext.MessageBox;
  msg.wait('温馨提示','正在登录中,请稍候...');
  Ext.Ajax.request({
	     method : 'post',
	     params : {
	             userNameOrEmail : Ext.getDom("userNameOrEmail").value,
	             userPassword : MD5(Ext.getDom("userPassword").value)
	            },
	     scope : this,
	     url : path+'/check_login',
	     defaultHeaders : 'application/x-www-form-urlencoded;charset=UTF-8',//默认的头部信息
	     success : function(response){
	     	      msg.hide();//成功后隐藏
	     	      //////这里写后续的处理函数
	     	      if(response.responseText == "no"){
	     	        Ext.Msg.alert("温馨提示","登陆失败,请重试!");
	     	      	return;
	     	      }
	     	      var obj = Ext.decode(response.responseText);
	     	      loginManage(obj.userId,obj.userName);
	     	      Ext.Msg.alert("温馨提示","登陆成功,欢迎使用!");
	     	      loginWin.close();//关闭登陆窗口
	             },
	     failure : function(response){
	     	       msg.hide();//成功后隐藏
	               Ext.Msg.alert("温馨提示","请求失败,请重试!");
	             }   
  });
}
////////
/*
 * by:rush date:2011年3月27日 14:48:49
 * 功能：实现时钟的小工具
 * */
MyDesktop.ToolClock = Ext.extend(Ext.app.Module,{
  id : 'tool-clock',
  init : function(){
       this.launcher = {
            text: '天气预报(sample.js)',
            iconCls:'bogus',
            handler : this.createWindow,//这句表明其创建窗口的句柄
            scope: this,
            windowId:'tool-clock' //窗口的id
        }
  },
  createWindow : function(src){
       var desktop = this.app.getDesktop();
       var win = desktop.getWindow('tool-clock');
       if(!win){
          win = desktop.createWindow({
	           id:'tool-clock',
	           title:"天气预报(sample.js)",
	           shim:false,
			   animCollapse:false,
			   constrainHeader:true,
			   maximizable : true,
			   minimizable : true,
			   resizable : true,//不允许改变大小
			   html : '<iframe align="center" src="http://flash.weather.com.cn/wmaps/index.swf?url1=http%3A%2F%2Fwww%2Eweather%2Ecom%2Ecn%2Fweather%2F&url2=%2Eshtml&from=cn" width="800" height="600" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no"></iframe>',
			   width : 800,
			   height : 600
          });
       }
       win.show();
     }
  });
  
  
  
  

  /////////////////
  /*
   * by:rush date:2011年3月28日 22:28:40
   * 功能：用于显示日历的窗口
   * */
 var memoEditor = null;
 var memoGrid = null;
 var memoStore = null;
  MyDesktop.MemoWindow = Ext.extend(Ext.app.Module,{
     id : 'tool-memo',
     init : function(){
       this.launcher = {
            text: '便签',
            iconCls:'icon-grid',
            handler : this.createWindow,//这句表明其创建窗口的句柄
            scope: this,
            windowId:'tool-memo' //窗口的id
        }
      },
      createWindow : function(src){
         var desktop = this.app.getDesktop();
         var win = desktop.getWindow('tool-memo');
         ////////////////
           	//////////////////////////////////////////
         Ext.QuickTips.init(); //初始化快速提示功能
         //建立一个数据记录的对象
         var Memo = new Ext.data.Record.create([
                                                      { name : 'title' , type : 'string'},
				                                      {name : 'saveDate', type : 'date',dateFormat:'Y-m-d'},
				                                      {name : 'lateDate' , type : 'date',dateFormat:'Y-m-d'},
				                                      {name : 'detail', type : 'string'}
		
				                                      ]);
     //声明一个行编辑控件的实例				                                      
      	memoEditor = new Ext.ux.grid.RowEditor({
        saveText: '更新',
        cancelText : '取消',
        deleteText : '删除'
        });
        ////声明一个writer,来将信息写入到后台
        var memoWriter = new Ext.data.JsonWriter({
					    encode: true,
					    writeAllFields: false // 写入所有字段，而不仅仅是那些发生变化的字段
					});
        //声明一个数据存储仓库,使用json的方式获取远程数据
        memoStore = new Ext.data.GroupingStore({      	                            
        	                            autoSave : false,//设置不自动保存
        	                            writer : memoWriter,
			                            reader: new Ext.data.JsonReader({
			                            	    id : 'id',
					                            totalProperty : 'totalProperty',
					                            root : 'memoList'},
					                            [
					                               {name : 'id' , type: 'int'},
					                               {name: 'title', type:'string'},
					                               {name: 'saveDate', type: 'date',dateFormat:'Y-m-d'},
					                               {name: 'lateDate', type: 'date',dateFormat:'Y-m-d'},
					                               {name: 'detail', type: 'string'}
			                                   ]),
			                            proxy: new Ext.data.HttpProxy({   
                                               url : '/ipurse/easyMemo.do?method=loadMemo',   
                                               method:"post"   
                                               }),
			                            sortInfo: {field: 'title', direction: 'DESC'}
			                        });
      	/////////////
         //////////
         if(!win){
           win = desktop.createWindow({
                 id : 'tool-memo',
                 title : '便签(双击编辑信息)',
                 shim:false,
			     animCollapse:false,
			     constrainHeader:true,
			     width : 800,
			     height : 600,
			     layout : 'fit',
			     labelWidth : 80,
			     labelAlign : 'right',
			     buttonAlign : 'center',
			     items :        
			            memoGrid =  new Ext.grid.GridPanel({
			            	    store : memoStore,
			            	    width : 800,
			            	    region:'center',
			            	    margins: '0 5 5 5',
			            	    loadMask: {msg:'正在加载数据，请稍侯……'},
		                        plugins: [memoEditor],	
		                         view: new Ext.grid.GroupingView({
								            markDirty: false
								        }),
		                        columns: [
		                             new Ext.grid.RowNumberer() ,//显示行号
		                            {		            		                             
		                             id : 'title',
		                             header: "事情提要",
		                             align : 'center' ,
		                             width: 200,
		                             sortable: true,
		                             dataIndex: 'title',
		                             editor: {     ////这句话是关键，有了这句话就可以实现编辑功能
								                xtype: 'textfield',
								                allowBlank: false
						                     }
		                             },
		                            {
		                            	 xtype : 'datecolumn', //此处为日期类型
		                                 format : 'Y-m-d',	
			                             id : 'saveDate',	
			                             header: "保存时间",
			                             align : 'center' ,
			                             width: 100,
			                             sortable: true, 
			                             dataIndex: 'saveDate',
			                             editor: {////这句话是关键，有了这句话就可以实现编辑功能
									                xtype: 'datefield',
									                format : 'Y-m-d',
									                allowBlank: false,
									                minValue: '1999-01-01',
									                minText: '将来的事情不能发生在过去呀，难道你穿越了？oh my god!'
									               // maxValue: (new Date()).format('Y-m-d')
									            }
		                             },
		                            {
		                            	 xtype : 'datecolumn', //此处为日期类型
		                            	 format : 'Y-m-d',
			                             id : 'lateDate',	
			                             header: "到期时间",
			                             align : 'center' ,
			                             width: 100,
			                             sortable: true,
			                             dataIndex: 'lateDate',
			                             groupRenderer: Ext.util.Format.dateRenderer('Y-m-d'),
			                             editor: {////这句话是关键，有了这句话就可以实现编辑功能
									                xtype: 'datefield',
									                format : 'Y-m-d',
									                allowBlank: false,
									                minValue: '1999-01-01',
									                minText: '将来的事情不能发生在过去呀，难道你穿越了？oh my god!'
									               // maxValue: (new Date()).format('Y-m-d')
									            }
		                             },
		                            {
			                             id : 'detail',	
			                             header: "详细内容",
			                             align : 'center' ,
			                             width: 350,
			                             sortable: true,
			                             dataIndex: 'detail',
			                             editor: {     ////这句话是关键，有了这句话就可以实现编辑功能
									                xtype: 'textarea',
									                atuoHeight : true,
									                allowBlank: false
									             }
		                             }
		                             
		                        ],

		                        
		                        tbar:
		                            [
			                        	{
				                            text : '添加新便利贴',
				                            tooltip : '添加一个新的便利贴',
				                            iconCls : 'add',
				                            handler : function(){
				                            	    //判断是不是正在修改信息
				                            	    if(memoEditor.isVisible()){
				                            	       Ext.Msg.show({
				                            	    			     title : 'xxx网提示',
				                            	    			     msg : '您有内容正在编辑中,请保存后再添加数据!',
				                            	    			     icon : Ext.MessageBox.WARNING,
				                            	    			     buttons : Ext.Msg.OK				                            	    			     		                            	    			     				                            	    			     
				                            	    			});  ///这里需要修改	
				                            	    	return;
				                            	    }
				                            	    //设置save的标题为保存
				                            	    memoEditor.saveText = '保存';
				                            	    
				                            	    //取得默认的时间日期
				                            	    var d = new Date();				                            	    
				                            	    var y = d.getYear();
				                            	    var m = d.getMonth();
				                            	    if(m < 10){
				                            	      m++;			                            	    	
				                            	    }	
				                            	    if(m < 10){
				                            	    	m = '0' + m;
				                            	    }
				                            	    var n = d.getDate();
				                            	    if(n < 10){
				                            	    	n = '0' + n ;
				                            	    }
				                                    var memo = new Memo({
				                                      title : '新建便签',
				                                      saveDate : y+"-"+m+"-"+n,
				                                      lateDate : y+"-"+m+"-"+n,
				                                      detail : '在这里输入详细描述'
				                                    });
				                                    memoEditor.stopEditing();//停止编辑
				                                    memoStore.insert(0,memo);//向第0行插入数据
				                                    memoGrid.getView().refresh();//刷新表格
				                                    memoGrid.getSelectionModel().selectRow(0);//选中第一行
				                                    memoEditor.startEditing(0);//开始编辑第一行
				                            }
			                            }
			                            
		                            ],
		                         bbar:new Ext.PagingToolbar(
		                               {
		                               	buttonAlign : 'center',
		                                nextText : '下一页',
		                                prevText : '前一页',
		                                refreshText : '刷新数据',
		                                firstText : '第一页',
		                                lastText : '最后一页',		                     
		                                pageSize:20,   
					                    store:memoStore,   
					                    displayInfo:true,   
					                    displayMsg:'显示第 {0} 条到 {1} 条记录，一共 {2} 条',   
					                    emptyMsg:'没有记录' 
		                               }
		                              )
					    })
					  	
			     
			     
           });
           
         }
         win.show();
         memoGrid.render();
         memoStore.load({params:{start:0,limit:20 }});                      

      }
      
   
  });
  ///////////
  /*
   * by:rush date:2011年3月31日 23:26:06
   * 功能：这个函数实现memo的删除功能，其调用在RowEditor.js中
   * */
  function deleteMemo(){
  	var path = Ext.getDom("path").value;
  	Ext.Msg.show({
  	   title : 'XXX网提示',
  	   msg : '确定要删除此条便签吗?',
  	   buttons : Ext.Msg.YESNOCANCEL,
  	   icon: Ext.MessageBox.QUESTION,
  	   buttonText : {
  	     yes : '是',
  	     no : '否',
  	     cancel : '取消'
  	   },
  	   fn : function(buttonId ){/////如果是用户新建一跳memo而没有进行保存，则只删除本地信息，否则连接远端数据库删除远端信息
  	        if(buttonId == 'yes'){//如果用户按下ok键
  	            Ext.Msg.wait("正在删除中,请稍后...","XXX网提示");//弹出提示	
  	            var memo = memoStore.getAt(memoEditor.rowIndex); //这句话获得单个的数据仓库对象，即获得选中行的json数据  
  	            if(!memo.json){//如果json中没有数据，说明还没有进行过保存
  	               memoEditor.stopEditing();//表格停止编辑
  	               memoStore.removeAt(0);//删除这条信息
			  	   memoGrid.getView().refresh();//刷新表格
				   memoGrid.getSelectionModel().selectRow(0);//选中第一行
				   Ext.Msg.hide();
				   Ext.Msg.alert("XXX网提示","删除成功!");
				   return;
  	            }///否则执行下面的方法            
			  	Ext.Ajax.request({
			  	    method : 'post',
			  	    url : path+'/easyMemo.do?method=deleteMemoData',
			  	    defaultHeaders : 'application/x-www-form-urlencoded;charset=UTF-8',//默认的头部信息
			  	    scope : this,
			  	    params : {id : memo.json.id},
			  	    success : function(response){
			  	                 Ext.Msg.hide();//这句是隐藏进度条
			  	                 var msg = response.responseText;
			  	                 if(msg == 'success'){
			  	                 	memoStore.removeAt(memoEditor.rowIndex);//删除选中的行
			  	                 	memoEditor.stopEditing();//表格停止编辑
			  	                 	memoGrid.getView().refresh();//刷新表格
				                    memoGrid.getSelectionModel().selectRow(0);//选中第一行
			  	                    Ext.Msg.alert("XXX网提示","删除成功!");
			  	                 }else{
			  	                    Ext.Msg.alert("XXX网提示","删除失败!");
			  	                 }
			  	              },
			  	    failure : function(){
			  	                 Ext.Msg.hide();//这句是隐藏进度条
			  	                 Ext.Msg.alert("XXX网提示","请求超时,请重试!");
			  	              }			  	    
			  	});
  	        }
  	   }
  	});
  	//memoStore.removeAt(memoEditor.rowIndex);
  	//memoGrid.getView().refresh();//刷新表格
  }
  
  /*
   * by:rush date:2011年4月1日 11:05:43
   * 功能：添加或者更新memo
   * */
  function saveOrUpdateMemo(){
     var path = Ext.getDom("path").value;//获取根路径
     var memo = memoStore.getAt(memoEditor.rowIndex); //这句话获得单个的数据仓库对象，即获得选中行的json数据
     var msg;
     if(!memo.json){
        msg = "正在保存中,请稍候...";
        Ext.Msg.wait(msg,"XXX网提示");
        memoEditor.stopEditing();
        memo = memoStore.getAt(0);
        Ext.Ajax.request({
            method : 'post',
            url : path+'/easyMemo.do?method=addMemoData',
            scope : this,
            defaultHeaders : 'application/x-www-form-urlencoded;charset=UTF-8',//默认的头部信息
            params : {
                     userId : userLoginId,//用户的唯一id号码，用户的唯一标识
                     title : memo.data.title,
                     saveDate : memo.data.saveDate.format("Y-m-d"),   //保存日期，这个选项不写也可以，会根据系统日期自动填上
                     lateDate : memo.data.lateDate.format("Y-m-d"),  //到期时间,后面必须加上格式化方法，要不然传到后台的数据可能会出现问题
                     detail : memo.data.detail ///详细信息
                     },
            success : function(response){
                      Ext.Msg.hide();//隐藏进度条
                      if(response.responseText == 'success'){
                         ///这里应该重新加载数据仓库
                      	 memoStore.load();//重新加载数据仓库
                      	 memoGrid.getView().refresh();//刷新表格
                      	 memoGrid.getSelectionModel().selectRow(0);//选中第一行
                      	 Ext.Msg.alert("XXX网提示","保存成功!");
                      }else{
                         Ext.Msg.alert("XXX网提示","保存失败!");
                      }
                    },
            failure : function(response){
                       Ext.Msg.alert("XXX网提示","请求失败,可能是网络繁忙,请重试!");
                    }        
        });
     }else{
     	var index = memoEditor.rowIndex;//获取要编辑的行号
     	memoEditor.stopEditing();//停止编辑，这句话很重要，一定放在获取数据的前面，要不然获取不到最新的数据
     	var dataMemo = memo.data;//声明一个数组对象
     	msg = "正在更新中,请稍后...";
        Ext.Msg.wait(msg,"XXX网提示");
        Ext.Ajax.request({
             method : 'post',
             url : path+'/easyMemo.do?method=updateMemoData',
             scope : this,
             defaultHeaders : 'application/x-www-form-urlencoded;charset=UTF-8',//默认的头部信息
             params :{
                      id : dataMemo.id,
                      title : dataMemo.title,
                      saveDate : dataMemo.saveDate.format("Y-m-d"),//格式化时间字符串
                      lateDate : dataMemo.lateDate.format("Y-m-d"),//格式化时间字符串
                      detail : dataMemo.detail
                     },
             success : function(response){
                          Ext.Msg.hide();
                          if(response.responseText == 'success'){
                             Ext.Msg.alert("XXX网提示","更新成功!");
                          }else{
                             Ext.Msg.alert("XXX网提示","更新失败!");
                          }
                       },
             failure : function(response){
                          Ext.Msg.alert("XXX网提示","请求超时,可能是网络故障,请稍后重试!");
                       }          
        });
     }
  }
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /*
   * by:rush date:2011年4月5日 00:03:22
   * 功能：修改个人基本信息窗口
   * */
  var userInfoForm = null;
MyDesktop.UserInfo = Ext.extend(Ext.app.Module,{
     id : 'userInfo-win',
     init : function(){
	       this.launcher = {
	            text: '用户详细信息修改',
	            iconCls:'icon-grid',
	            handler : this.createWindow,//这句表明其创建窗口的句柄
	            scope: this,
	            windowId:'userInfo-win' //窗口的id
	        }
      },
      createWindow : function(src){
             var desktop = this.app.getDesktop();
             var win = desktop.getWindow('userInfo-win');
	             if(!win){
		             	Ext.QuickTips.init(); //初始化快速提示功能
		             	var store = new Ext.data.SimpleStore({
						             fields: ['sexName','sexValue'],
						             data : [['男','m'],['女','w']]
						        });

		                win = desktop.createWindow({
		                      id : 'userInfo-win',
		                      title : '用户详细信息修改',
			                  shim:false,
						      animCollapse:false,
						      constrainHeader:true,
						      width : 800,
						      height : 600,
						      layout : 'fit',
						      labelWidth : 300,
						      labelAlign : 'right',
						      buttonAlign : 'center',	
						      loadMask : {msg:'正在加载个人信息数据，请稍侯……'},
						      items : userInfoForm = new Ext.FormPanel(
						              {
						               xtype : 'form',
						               id : 'UserInfoForm',
						               name : 'UserInfoForm',
						               method : 'post',
						               action : '/ipurse/userInfo.do?method=updateUserInfo',
						               labelAlign : 'right',
						               buttonAlign : 'center',
						               labelWidth : 300,
						               fileUpload: true,					               						               	
						               monitorValid : true,
						               enctype : 'multipart/form-data',
						               items : [
						                                             {
						                                    	      layout : 'hbox',	
						                                    	      xtype : 'label',
						                                    	      text : '这是是分割符',  
						                                    	      html : '<br/>个人基本信息<hr/>'
						                                    	     },
						                                    	     {
						                                    	      xtype : 'label',
						                                    	      anchor : '50%',
						                                    	      fieldLabel : '用户ID',
						                                    	      text : 'value',
						                                    	      id : 'userId',
						                                    	      name : 'userId'
						                                    	     },
						                                    	     {
						                                    	      xtype : 'label',
						                                    	      text : 'value',
						                                    	      anchor : '50%',
						                                    	      fieldLabel : '用户名称',						                                    	
						                                    	      id : 'userName',
						                                    	      name : 'userName'
						                                    	     },
						                                    	     {
						                                    	      xtype:'textfield',
						                                              fieldLabel:'电子邮箱',
						                                              anchor:'80%',
						                                              id:'userEmail',
						                                              name:'userEmail',
						                                              allowBlank : false,
						                                              blankText : '电子邮箱地址为必填项目!'
						                                              
						                                    	     },
						                                    	     {
						                                    	        xtype : 'combo',						                                    	     
						                                    	        fieldLabel : '性别',						                                    	       						                                    	        
						                                    	        hiddenName : 'sex',//// combo时，叫hiddenName
                                                                        typeAhead: true,
																	    triggerAction: 'all',
																	    lazyRender:true,
																	    editable : false,
																	    mode: 'local',
                                                                        store : store,
                                                                        displayField:'sexName',
                                                                        valueField : 'sexValue',
                                                                        //value : '男',
                                                                        anchor : '80%',
                                                                        allowBlank : false,
                                                                        blankText : '请选择性别!'
						                                    	     },
						                                    	     {
						                                    	      xtype : 'datefield',
						                                    	      fieldLabel : '出生年月',
						                                    	      anchor : '80%',
						                                    	      id : 'bornInfo',
						                                    	      name : 'bornInfo',
						                                    	      format : 'Y-m-d',
						                                    	      maxlength : 10,
						                                    	      allowBlank : false,
						                                    	      blankText : '出生年月为必填项目!'
						                                    	      
						                                    	     },
						                                    	     {
						                                    	      xtype : 'textfield',
						                                    	      fieldLabel : '所在学校',
						                                    	      anchor : '80%',
						                                    	      id : 'livePlace',
						                                    	      name : 'livePlace',
						                                    	      allowBlank : false,
						                                    	      blankText : '所在学校为必填项目!'
						                                    	      
						                                    	     },
						                                    	     {
						                                    	      xtype : 'textfield',
						                                    	      fieldLabel : '自我说明',
						                                    	      anchor : '80%',
						                                    	      id : 'selfIntroduce',
						                                    	      name : 'selfIntroduce',
						                                    	      allowBlank : false,
						                                    	      blankText : '自我说明为必填项目!'
						                                    	     
						                                    	     },
						                                    	     {
						                                    	      layout : 'hbox',	
						                                    	      xtype : 'label',
						                                    	      text : '这是是分割符',  
						                                    	      html : '个人头像信息<hr/>'
						                                    	     },
						                                    	     {						                                    	     				                                    	                 
									                                   xtype : 'label',
									                                   text : '头像',
									                                   anchor : '70%',
									                                   html : '<p align="center"><img id="headPicture" src="" width="48" height="48" /></p>'						                                    	                 						                                    	             
						                                    	     },
						                                    	     {
						                                    	       xtype: 'fileuploadfield',
																	   id: 'headPicture',
																	   emptyText: '请选择一幅图片....',
																	   fieldLabel: '头像',
																	   name: 'headPicture',
																	   buttonText: '',
																	   anchor : '80%',
																		buttonCfg: {
																		             iconCls: 'upload-icon'
																		           }
																		
						                                    	      }
						                             
						                                    	     
						                                    	    ]           	    
						                    ,buttons :[ 
						                         {
						                         	xtype : 'button',
						                         	text : '确定',
						                         	scale : 'medium',
						                         	formBind: true,
						                         	handler : function(){
						                         	                      
						                         	                      var path = Ext.getDom("path").value;
						                         	                      var id = Ext.getDom("userId").innerText;//取得用户的id
						                         	                      if(userInfoForm.getForm().isValid()){
						                         	                      	  
						                       	                        
						                         	                      	userInfoForm.getForm().submit({
						                         	                      	    url : path+'/userInfo.do?method=updateUserInfo',
						                         	                      	    params : {
						                         	                                        id : id
						                         	                                       },
						                         	                            waitMsg : '信息正在修改中,请稍后...',           
						                         	                            success : function(form, action){
						                         	                            	                    //修改成功后重新加载
						                         	                            	                    var sid = Math.random();		                       
						                         	                            	                    Ext.getDom("headPicture").src = path+"/userInfo.do?method=getUserHeadPicture&userId="+userLoginId+"&sid="+sid;
						                         	                                                    Ext.Msg.alert('Success', action.result.msg);
						                         	                                                  },
						                         	                            failure: function(form, action) {
																					        switch (action.failureType) {
																					            case Ext.form.Action.CLIENT_INVALID:
																					                Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
																					                break;
																					            case Ext.form.Action.CONNECT_FAILURE:
																					                Ext.Msg.alert('Failure', 'Ajax communication failed');
																					                break;
																					            case Ext.form.Action.SERVER_INVALID:
																					               Ext.Msg.alert('Failure', action.result.msg);
																					       }
																					    }
                      
						                         	                      	});
						                         	                      	
						                         	                      	///////////
						                         	                      }
						                         	                    }
						                         },
						                         {
						                            xtype : 'button',
						                            text : '重置',
						                            scale : 'medium',
						                            formBind: true
						                         }
						                        ]            	    
						                  
						              }
						      )						       						      						      						   						      
		                   }); 
	               };
             win.show(); 
             //初始化信息，查询单位用户基本信息
             onShowUserInfoData();
         }
   
   });
   /*
    * by:rush date:2011年4月16日 23:54:14
    * 功能：修改信息窗口初始化查询用户基本信息
    * */
  function onShowUserInfoData(){
      var path = Ext.getDom("path").value;
      Ext.Ajax.request({
         url : path+'/userInfo.do?method=getUserInfo',
         method : 'post',
         params : {
                   userId : userLoginId
                  },
         success : function(response){
         	         if(response.responseText == "error"){
         	         	Ext.Msg.alert("网站提示","没有查询到相关信息,请先登陆!");
         	         	return;
         	         }
                     var userInfo = Ext.decode(response.responseText);//取得json信息
                    //设置用户ID
                     Ext.getDom("userId").innerText = userInfo.userId;
                     //设置用户名称
                     Ext.getDom("userName").innerText = userInfo.userName;
                     //设置电子邮箱地址
                     Ext.getDom("userEmail").value = userInfo.userEmail;
                     //设置性别                     
                     /*if(userInfo.sex == "m"){
                       Ext.getDom("sexCombo");
                     }else{
                       Ext.getDom("sexCombo");
                     } */                   
                     //设置出生年月
                     Ext.getDom("bornInfo").value = userInfo.bornInfo;
                     //设置所在学校
                     Ext.getDom("livePlace").value = userInfo.livePlace;
                     //设置自我说明
                     Ext.getDom("selfIntroduce").value = userInfo.selfIntroduce;
                    
                     if(!Ext.isEmpty(userInfo.headPicture,false)){//如果非空
                        //请求获得图片                   	
                     	Ext.getDom("headPicture").src = path+"/userInfo.do?method=getUserHeadPicture&userId="+userLoginId;
                     }
                   },
         failure : function(response){
                      Ext.Msg.alert("网站提示","请求失败，请重试!");
                   }          
      });
      
           
  }
  
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*this.Ext.grid.dummyData = [
    ['3m Co',71.72,0.02,0.03,'9/1 12:00am'],
    ['Alcoa Inc',29.01,0.42,1.47,'9/1 12:00am'],
    ['American Express Company',52.55,0.01,0.02,'9/1 12:00am'],
    ['American International Group, Inc.',64.13,0.31,0.49,'9/1 12:00am'],
    ['AT&T Inc.',31.61,-0.48,-1.54,'9/1 12:00am'],
    ['Caterpillar Inc.',67.27,0.92,1.39,'9/1 12:00am'],
    ['Citigroup, Inc.',49.37,0.02,0.04,'9/1 12:00am'],
    ['Exxon Mobil Corp',68.1,-0.43,-0.64,'9/1 12:00am'],
    ['General Electric Company',34.14,-0.08,-0.23,'9/1 12:00am'],
    ['General Motors Corporation',30.27,1.09,3.74,'9/1 12:00am'],
    ['Hewlett-Packard Co.',36.53,-0.03,-0.08,'9/1 12:00am'],
    ['Honeywell Intl Inc',38.77,0.05,0.13,'9/1 12:00am'],
    ['Intel Corporation',19.88,0.31,1.58,'9/1 12:00am'],
    ['Johnson & Johnson',64.72,0.06,0.09,'9/1 12:00am'],
    ['Merck & Co., Inc.',40.96,0.41,1.01,'9/1 12:00am'],
    ['Microsoft Corporation',25.84,0.14,0.54,'9/1 12:00am'],
    ['The Coca-Cola Company',45.07,0.26,0.58,'9/1 12:00am'],
    ['The Procter & Gamble Company',61.91,0.01,0.02,'9/1 12:00am'],
    ['Wal-Mart Stores, Inc.',45.45,0.73,1.63,'9/1 12:00am'],
    ['Walt Disney Company (The) (Holding Company)',29.89,0.24,0.81,'9/1 12:00am']
];*/



