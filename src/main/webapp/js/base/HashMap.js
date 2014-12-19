//function HashMap() {
//
//	var size = 0;
//	var hashtable = new Array();
//	this.get = function(key) {
//		return hashtable[key];
//	}
//
//	this.put = function(key, obj) {
//		if (hashtable[key])
//			size++;
//		hashtable[key] = obj;
//	}
//	this.containskey = function(key) {
//		return hashtable[key];
//	}
//
//	this.size = function() {
//		return size;
//	}
//}

function Map() {
	var struct = function(key, value) {
		this.key = key;
		this.value = value;
	}

	var put = function(key, value) {
		for (var i = 0; i < this.arr.length; i++) {
			if (this.arr[i].key === key) {
				this.arr[i].value = value;
				return;
			}
		}
		this.arr[this.arr.length] = new struct(key, value);
	}

	var getValue = function(i){
		return this.arr[i].value;
	}
	
	var get = function(key) {
		for (var i = 0; i < this.arr.length; i++) {
			if (this.arr[i].key === key) {
				return this.arr[i].value;
			}
		}
		return null;
	}

	var remove = function(key) {
		var v;
		for (var i = 0; i < this.arr.length; i++) {
			v = this.arr.pop();
			if (v.key === key) {
				continue;
			}
			this.arr.unshift(v);
		}
	}
	
	var removeAll = function() {
		this.arr = new Array();
	}

	var size = function() {
		return this.arr.length;
	}

	var isEmpty = function() {
		return this.arr.length <= 0;
	}
	
	var toJson = function() {
		var s = "{";
		var len = this.arr.length;
		for (var i = 0; i < len; i++) {
			s = s + "\""+this.arr[i].key+"\":"+"\""+this.arr[i].value+"\"";
			if(i!=(len-1)){
				s = s + ","
			}
		}
		s = s + "}";
		return s;
	}

	this.arr = new Array();
	this.get = get;
	this.getValue = getValue;
	this.put = put;
	this.remove = remove;
	this.size = size;
	this.isEmpty = isEmpty;
	this.toJson = toJson;
}