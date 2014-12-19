
function dosubmit() {
	if (!validate ()) {
		return false;
	}
	var psw = document.loginform.psw.value;
//   	document.loginform.action =path+"/do/check_login";
   	document.loginform.password.value=MD5(psw);
// 	document.loginform.userPassword.value=psw;
    document.loginform.submit();
}


function keyDown(e) {
	var keycode;
   	if(navigator.appName == "Microsoft Internet Explorer")
   	{
       	keycode = event.keyCode; 
   	}else{
    	keycode = e.which;
   	}
// 	  var realkey = String.fromCharCode(keycode);
//    alert("按键码: " + keycode + " 字符: " + realkey);
   	if(keycode==13){
        dosubmit();  // 回车键提交登录
   	} 
   	else {
	   	document.getElementById("alert_msg").innerHTML="";
   	}
}
document.onkeydown = keyDown;  

var code = ""; //在全局 定义验证码   
function createCode(){
	code = "";  // 重置
	var codeLength = 4;//验证码的长度
	var checkCode = document.getElementById("checkCode");
	var selectChar = new Array(1,2,3,4,5,6,7,8,9);
	for(var i=0;i<codeLength;i++) {
	   var charIndex = Math.floor(Math.random()*9);
	   code +=selectChar[charIndex];
	}
	if(checkCode)   
	{
		checkCode.className="code";
	    checkCode.value = code;
	    checkCode.blur();
	}        
}
    
function validate (){
	var obj = document.getElementById("account");
	if(obj.value.length < 1){
    	document.getElementById("alert_msg").innerHTML = "请输入您的登录帐户.";
    	obj.focus();
    	return false;
    }
	obj = document.getElementById("psw");
	if(obj.value.length < 1){
    	document.getElementById("alert_msg").innerHTML = "请输入您的帐户密码.";
    	obj.focus();
    	return false;
    }
    
//	obj = document.getElementById("validCode");
//    var inputCode = obj.value;
//	if(obj.value.length < 1){
//    	document.getElementById("alert_msg").innerHTML = "请输入左边的验证码.";
//    	obj.focus();
//         return false;
//    }else if(inputCode.toUpperCase() != code ){
//    	document.getElementById("alert_msg").innerHTML = "验证码输入错误.";
//    	obj.focus();
//        //createCode();//刷新验证码
//        return false;   
//    }
    return true;
}

document.getElementById("account").focus();
