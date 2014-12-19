/*!
 * Ext JS Library 3.3.1
 * Copyright(c) 2006-2010 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.Desktop = function(app) {
    this.taskbar = new Ext.ux.TaskBar(app);
    this.xTickSize = this.yTickSize = 1;
    var taskbar = this.taskbar;

    var desktopEl = Ext.get('x-desktop');
    var taskbarEl = Ext.get('ux-taskbar');
    var shortcuts = Ext.get('x-shortcuts');

    var windows = new Ext.WindowGroup();
    var activeWindow;

    function minimizeWin(win) {
        win.minimized = true;
        win.hide();
    }

    function markActive(win) {
        if (activeWindow && activeWindow != win) {
            markInactive(activeWindow);
        }
        taskbar.setActiveButton(win.taskButton);
        activeWindow = win;
        Ext.fly(win.taskButton.el).addClass('active-win');
        win.minimized = false;
    }

    function markInactive(win) {
        if (win == activeWindow) {
            activeWindow = null;
            Ext.fly(win.taskButton.el).removeClass('active-win');
        }
    }

    function removeWin(win) {
        taskbar.removeTaskButton(win.taskButton);
        layout();
    }

    function layout() {
        desktopEl.setHeight(Ext.lib.Dom.getViewHeight() - taskbarEl.getHeight());
    }
    Ext.EventManager.onWindowResize(layout);

    this.layout = layout;

    this.createWindow = function(config, cls) {
        var win = new(cls || Ext.Window)(
        Ext.applyIf(config || {},
        {
            renderTo: desktopEl,
            manager: windows,
            minimizable: true,
            maximizable: true
        })
        );
        win.dd.xTickSize = this.xTickSize;
        win.dd.yTickSize = this.yTickSize;
        if (win.resizer) {
            win.resizer.widthIncrement = this.xTickSize;
            win.resizer.heightIncrement = this.yTickSize;
        }
        win.render(desktopEl);
        win.taskButton = taskbar.addTaskButton(win);

        win.cmenu = new Ext.menu.Menu({
            items: [

            ]
        });

        win.animateTarget = win.taskButton.el;

        win.on({
            'activate': {
                fn: markActive
            },
            'beforeshow': {
                fn: markActive
            },
            'deactivate': {
                fn: markInactive
            },
            'minimize': {
                fn: minimizeWin
            },
            'close': {
                fn: removeWin
            }
        });

        layout();
        return win;
    };

    this.getManager = function() {
        return windows;
    };

    this.getWindow = function(id) {
        return windows.get(id);
    };

    this.getWinWidth = function() {
        var width = Ext.lib.Dom.getViewWidth();
        return width < 200 ? 200: width;
    };

    this.getWinHeight = function() {
        var height = (Ext.lib.Dom.getViewHeight() - taskbarEl.getHeight());
        return height < 100 ? 100: height;
    };

    this.getWinX = function(width) {
        return (Ext.lib.Dom.getViewWidth() - width) / 2;
    };

    this.getWinY = function(height) {
        return (Ext.lib.Dom.getViewHeight() - taskbarEl.getHeight() - height) / 2;
    };

    this.setTickSize = function(xTickSize, yTickSize) {
        this.xTickSize = xTickSize;
        if (arguments.length == 1) {
            this.yTickSize = xTickSize;
        } else {
            this.yTickSize = yTickSize;
        }
        windows.each(function(win) {
            win.dd.xTickSize = this.xTickSize;
            win.dd.yTickSize = this.yTickSize;
            win.resizer.widthIncrement = this.xTickSize;
            win.resizer.heightIncrement = this.yTickSize;
        },
        this);
    };

    this.cascade = function() {
        var x = 0,
        y = 0;
        windows.each(function(win) {
            if (win.isVisible() && !win.maximized) {
                win.setPosition(x, y);
                x += 20;
                y += 20;
            }
        },
        this);
    };

    this.tile = function() {
        var availWidth = desktopEl.getWidth(true);
        var x = this.xTickSize;
        var y = this.yTickSize;
        var nextY = y;
        windows.each(function(win) {
            if (win.isVisible() && !win.maximized) {
                var w = win.el.getWidth();

                //              Wrap to next row if we are not at the line start and this Window will go off the end
                if ((x > this.xTickSize) && (x + w > availWidth)) {
                    x = this.xTickSize;
                    y = nextY;
                }

                win.setPosition(x, y);
                x += w + this.xTickSize;
                nextY = Math.max(nextY, y + win.el.getHeight() + this.yTickSize);
            }
        },
        this);
    };
  /////////下面是用户自己的功能应用
    /*
     * by:rush date:2011年4月1日 22:37:08
     * 功能：显示隐藏时钟的邮件菜单
     * */
    this.SDclock = function (obj){
    	if(obj.checked){//说明已经显示了时钟
    	   stopClock();//调用停止时钟的方法
    	}else{
    	   showClock();//调用显示时钟的方法
    	}  	
    }
    /*
     * by:rush date:2011年4月1日 22:35:19
     * 功能：显示隐藏便利贴的左键菜单
     * */
    this.OoBLTMemo = function(obj){
    	var objMemo = obj.checked;
        if(objMemo){//说明已经选中，并表示显示了便签
        	//隐藏便签
           unDisplayMemo();   
        }else{
        	//显示便签
           displayMemo();
        }
    }
    ////////////////////////
    this.contextMenu = new Ext.menu.Menu({
    	ignoreParentClicks : true,//忽略父菜单的点击动作
        items: [
        new Ext.menu.Item({
    	   text : '排列窗口',
    	   menu :[
	    	      {
	            text: '平铺窗口',
	            handler: this.tile,
	            scope: this
	        	},
	       		 {
	            text: '丛叠窗口',
	            handler: this.cascade,
	            scope: this
	        	}
    	   ]
    	}),	
        new Ext.menu.Separator(),//创建分隔符
        {
         text : '随动时钟',
         id : 'SDclock',
         handler : this.SDclock,
         scope : this,
         checked : false
        },
        new Ext.menu.Separator(),//创建分隔符
        {
          text : '便利贴' ,
          id : 'BLTMemo',
          handler : this.OoBLTMemo,
          scope : this,
          checked : true
          
        } 
       ]
    });
    desktopEl.on('contextmenu',
        function(e) {
            e.stopEvent();
            this.contextMenu.showAt(e.getXY());
        },
        this);

    layout();

    if (shortcuts) {
        shortcuts.on('click',
        function(e, t) {
            t = e.getTarget('dt', shortcuts);
            if (t) {
                e.stopEvent();
                var module = app.getModule(t.id.replace('-shortcut', ''));//这部分的作用是把-shortcut去掉，剩下的就是要显示的窗体的id,然后根据id去找到要显示的东东
                if (module) {
                    module.createWindow();
                }
            }
        });
    }

//桌面图标自动换行代码
    

	var btnHeight = 80;
	var btnWidth = 88;
	var btnPadding = 25;
	var col = null;
	var row = null;
	function initColRow() {
		col = {
			index : 1,
			x : btnPadding
		};
		row = {
			index : 1,
			y : btnPadding
		};
	}
	initColRow();
	function isOverflow(y) {
		if (y > (Ext.lib.Dom.getViewHeight() - taskbarEl.getHeight())) {
			return true;
		}
		return false;
	}
	this.setXY = function(item) {
		var bottom = row.y + btnHeight, overflow = isOverflow(row.y + btnHeight);

		if (overflow && bottom > (btnHeight + btnPadding)) {
			col = {
				index : col.index++,
				x : col.x + btnWidth + btnPadding
			};
			row = {
				index : 1,
				y : btnPadding
			};
		}

		Ext.fly(item).setXY([col.x, row.y]);

		row.index++;
		row.y = row.y + btnHeight + btnPadding;
	};
	this.handleUpdate = function() {
		initColRow();
		// var items=shortcuts.dom.children;
		var items = Ext.query("dt", shortcuts.dom);
		for (var i = 0, len = items.length; i < len; i++) {
			this.setXY(items[i]);
		}
	}
	this.handleUpdate();
	Ext.EventManager.onWindowResize(this.handleUpdate, this, {
				delay : 500
			});


};


