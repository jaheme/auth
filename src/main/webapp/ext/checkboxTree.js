/**  
 * @class Ext.tree.TreeCheckNodeUI  
 * @extends Ext.tree.TreeNodeUI  
 *   
 * 对 Ext.tree.TreeNodeUI 进行checkbox功能的扩展,后台返回的结点信息不用非要包含checked属性  
 *   
 * 扩展的功能点有：  
 * 一、支持只对树的叶子进行选择  
 *    只有当返回的树结点属性leaf = true 时，结点才有checkbox可选  
 *    使用时，只需在声明树时，加上属性 onlyLeafCheckable: true 既可，默认是false  
 *   
 * 二、支持对树的单选  
 *    只允许选择一个结点  
 *    使用时，只需在声明树时，加上属性 checkModel: "single" 既可  
 *   
 * 二、支持对树的级联多选   
 *    当选择结点时，自动选择该结点下的所有子结点，以及该结点的所有父结点（根结点除外），特别是支持异步，当子结点还没显示时，会从后台取得子结点，然后将其选中/取消选中  
 *    使用时，只需在声明树时，加上属性 checkModel: "cascade" 既可  
 *   
 * 三、添加"check"事件  
 *    该事件会在树结点的checkbox发生改变时触发  
 *    使用时，只需给树注册事件,如：  
 *    tree.on("check",function(node,checked){...});  
 *   
 * 默认情况下，checkModel为'multiple'，也就是多选，onlyLeafCheckable为false，所有结点都可选  
 *   
 * 使用方法：在loader里加上 baseAttrs:{uiProvider:Ext.tree.TreeCheckNodeUI} 既可.  
 * 例如：  
 *   var tree = new Ext.tree.TreePanel({  
 *      el:'tree-ct',  
 *      width:568,  
 *      height:300,  
 *      checkModel: 'cascade',   //对树的级联多选  
 *      onlyLeafCheckable: false,//对树所有结点都可选  
 *      animate: false,  
 *      rootVisible: false,  
 *      autoScroll:true,  
 *      loader: new Ext.tree.DWRTreeLoader({  
 *          dwrCall:Tmplt.getTmpltTree,  
 *          baseAttrs: { uiProvider: Ext.tree.TreeCheckNodeUI } //添加 uiProvider 属性  
 *      }),  
 *      root: new Ext.tree.AsyncTreeNode({ id:'0' })  
 *  });  
 *  tree.on("check",function(node,checked){alert(node.text+" = "+checked)}); //注册"check"事件  
 *  tree.render();  
 *   
 */  
  
Ext.tree.TreeCheckNodeUI = function() {   
    //'multiple':多选; 'single':单选; 'cascade':级联多选   
    this.checkModel = 'multiple';   
       
    //only leaf can checked   
    this.onlyLeafCheckable = false;   
       
    Ext.tree.TreeCheckNodeUI.superclass.constructor.apply(this, arguments);   
};   
  
Ext.extend(Ext.tree.TreeCheckNodeUI, Ext.tree.TreeNodeUI, {   
  
    renderElements : function(n, a, targetNode, bulkRender){   
        var tree = n.getOwnerTree();   
        this.checkModel = tree.checkModel || this.checkModel;   
        this.onlyLeafCheckable = tree.onlyLeafCheckable || false;   
           
        // add some indent caching, this helps performance when rendering a large tree   
        this.indentMarkup = n.parentNode ? n.parentNode.ui.getChildIndent() : '';   
  
    	var cb = (!this.onlyLeafCheckable || a.leaf);
    	
    	var resourcesStr = "";// 子菜单下面的权限 
//	  alert(n.attributes.modActions); 
    	var act_data = n.attributes.modActions;
		if (act_data && act_data != "") {
			// 子菜单下面的权限store 
			var resourcesStroe = new Ext.data.JsonStore( { 
				data : act_data,
				fields : ["id", "name", "code", "checked"] 
			}); 
			for (var i = 0;i < resourcesStroe.getCount(); i++) {
				var record = resourcesStroe.getAt(i); 
				resourcesStr += "<input class='x-tree-node-cb' style='margin-left:20px;' onclick=resCheckChange(this,'"+n.id+"')" 
				+ " name=res"+n.id
				+ " type='checkbox' value='"+record.get("code")+"'";
				if (record.get("checked")) {
					resourcesStr += "checked=true/> "
					+ record.get("name");
				} else {
					resourcesStr += "/> " + record.get("name");
				}
			}
			resourcesStroe = null;
		}
    	
        var href = a.href ? a.href : Ext.isGecko ? "" : "#";   
       var buf = [
			'<li class="x-tree-node"><div ext:tree-node-id="', 
			n.id, 
			'" class="x-tree-node-el x-tree-node-leaf x-unselectable ', 
			a.cls, 
			'" unselectable="on">', 
			'<span class="x-tree-node-indent">', 
			this.indentMarkup, 
			"</span>", 
			'<img src="', 
			this.emptyIcon, 
			'" class="x-tree-ec-icon x-tree-elbow" />', 
			'<img src="', 
			a.icon || this.emptyIcon, 
			'" class="x-tree-node-icon', 
			(a.icon ? " x-tree-node-inline-icon" : ""), 
			(a.iconCls ? " " + a.iconCls : ""), 
			'" unselectable="on" />', 
			cb 
			? ('<input class="x-tree-node-cb" type="checkbox" name="'+n.id+'" ' + (a.checked 
			? 'checked="checked" />' 
			: '/>')) 
			: '', 
			'<a hidefocus="on" class="x-tree-node-anchor" href="', 
			href, 
			'" tabIndex="1" ', 
			a.hrefTarget ? ' target="' + a.hrefTarget + '"' : "", 
			'><span unselectable="on">', 
			n.text, 
			"</span></a><div style='display:inline; position:absolute;left:200px'>" 
			+ resourcesStr + "</div></div>", 
			'<ul class="x-tree-node-ct" style="display:none;"></ul>', 
			"</li>"].join('');   
  
        var nel;   
        if(bulkRender !== true && n.nextSibling && (nel = n.nextSibling.ui.getEl())){   
            this.wrap = Ext.DomHelper.insertHtml("beforeBegin", nel, buf);   
        }else{   
            this.wrap = Ext.DomHelper.insertHtml("beforeEnd", targetNode, buf);   
        }
           
        this.elNode = this.wrap.childNodes[0];   
        this.ctNode = this.wrap.childNodes[1];   
        var cs = this.elNode.childNodes;   
        this.indentNode = cs[0];   
        this.ecNode = cs[1];   
        this.iconNode = cs[2];   
        var index = 3;   
        if(cb){   
            this.checkbox = cs[3];   
            Ext.fly(this.checkbox).on('click', this.check.createDelegate(this,[null]));   
            index++;   
        }   
        this.anchor = cs[index];   
        this.textNode = cs[index].firstChild;   
    },   
       
    // private   
    check : function(checked){   
        var n = this.node;
        var tree = n.getOwnerTree();   
        this.checkModel = tree.checkModel || this.checkModel;   
           
        if( checked === null ) {   
            checked = this.checkbox.checked;   
        } else {   
            this.checkbox.checked = checked;   
        }   
        nodeToResCheck(checked, n);
        
        n.attributes.checked = checked;   
        tree.fireEvent('check', n, checked);   
           
        if(!this.onlyLeafCheckable && this.checkModel == 'cascade'){   
            var parentNode = n.parentNode;   
            if(parentNode !== null) {   
                this.parentCheck(parentNode,checked);   
            }   
            if( !n.expanded && !n.childrenRendered ) {   
                n.expand(false,false,this.childCheck);   
            }   
            else {   
                this.childCheck(n);   
            }   
        }else if(this.checkModel == 'single'){   
            var checkedNodes = tree.getChecked();   
            for(var i=0;i<checkedNodes.length;i++){   
                var node = checkedNodes[i];   
                if(node.id != n.id){   
                    node.getUI().checkbox.checked = false;   
                    node.attributes.checked = false;   
                    tree.fireEvent('check', node, false);   
                }   
            }   
        }   
           
    },   
       
    // private   
    childCheck : function(node){   
        var a = node.attributes;   
        if(!a.leaf) {   
            var cs = node.childNodes;   
            var csui;   
            for(var i = 0; i < cs.length; i++) {   
                csui = cs[i].getUI();   
                if(csui.checkbox.checked ^ a.checked)   
                    csui.check(a.checked);   
            }   
        }   
    },   
       
    // private   
    parentCheck : function(node ,checked){   
        var checkbox = node.getUI().checkbox;   
        if(typeof checkbox == 'undefined')return ;   
        if(!(checked ^ checkbox.checked))return;   
        if(!checked && this.childHasChecked(node))return;   
        checkbox.checked = checked;   
        node.attributes.checked = checked;   
        node.getOwnerTree().fireEvent('check', node, checked);   
           
        var parentNode = node.parentNode;   
        if( parentNode !== null){   
            this.parentCheck(parentNode,checked);   
        }   
    },   
       
    // private   
    childHasChecked : function(node){   
        var childNodes = node.childNodes;   
        if(childNodes || childNodes.length>0){   
            for(var i=0;i<childNodes.length;i++){   
                if(childNodes[i].getUI().checkbox.checked)   
                    return true;   
            }   
        }   
        return false;   
    },   
       
    toggleCheck : function(value){
        var cb = this.checkbox;   
        if(cb){   
            var checked = (value === undefined ? !cb.checked : value);   
            this.check(checked);   
        }   
    }
});

/** 
* 资源复选框，选择改变事件. 
* 当选中资源的时候，子菜单选中。 
*/	
function resCheckChange(obj,nodeId){
//	var allChecks = Ext.getDoc().dom.getElementsByTagName("input");
	var mChecks = Ext.getDoc().dom.getElementsByName(nodeId)[0];
	if(obj.checked){
		if(mChecks.checked){
			return;
		} else {
			mChecks.checked = true; 
			var node = Ext.getCmp("permission_module_tree").getNodeById(nodeId); 
			node.attributes.checked = obj.checked; 
		}
	} 
	else {
		var resChecks = Ext.getDoc().dom.getElementsByName("res"+nodeId);
		var noChecked = true;
		for(var i = 0;i < resChecks.length;i ++){
			if(resChecks[i].checked == true){
				var node = Ext.getCmp("permission_module_tree").getNodeById(nodeId); 
				node.getUI().checkbox.checked = true;   
                node.attributes.checked = true;
                noChecked = false;
                break;
			}
		}
		if(noChecked){
			var node = Ext.getCmp("permission_module_tree").getNodeById(nodeId); 
			node.getUI().checkbox.checked = false;   
            node.attributes.checked = false;
		}
	}
}

function nodeToResCheck(checked,node){
	var resChecks = Ext.getDoc().dom.getElementsByName("res"+node.id);
	for(var i = 0;i < resChecks.length;i ++){
		resChecks[i].checked = checked;
	}
}
