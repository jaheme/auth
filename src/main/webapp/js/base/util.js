	
	var getByName = function(name){
    	var node = document.getElementsByName(name);
    	return node[(node.length)-1];
    }
    
    /** 用给定的v参数的值设置给出名称为name的对象的值 */
    var setByName = function(name, v){
    	var node = document.getElementsByName(name);
//    	alert(node.length);
    	if(node && node.length > 0){
    		node[(node.length)-1].value=v;
    	}
    }
    
    /** 清空列表的所有数据行 */
    var cleanGrid = function(store){
    	store.removeAll(false);
    }
    
    