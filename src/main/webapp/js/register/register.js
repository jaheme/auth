/*
 * by:rush date:2011年3月26日 13:17:38
 * 功能：实现注册功能
 * 
 */
 //定义四个变量标识用户输入的数据格式通过要求
 var isUserName = false;
 var isUserEmail = false;
 var isUserPassword = false;
 var isStop = false;//是否应该终止
 /*
  * by:rush date:2011年3月26日 15:14:22
  * 功能：进行数据输入的验证
  * */
function validate(obj){
    var length = obj.value.length; //取得输入框的文字长度
    if(obj.id == "userName"){
    
    	//首先监控用户名输入框的输入
        var val =  Ext.getDom("userNameValidate"); 
        if(obj.value=="" && length == 0){//如果离开输入框的时候为空,则提示出错信息                        
           val.style.color = "red";
           val.innerHTML = "<img src='/ipurse/image/desktop/add/no.gif' width='15' height='15'/>用户昵称不能为空!";  
           isUserName = false;
        }else{
          val.style.color = "blue";
          val.innerHTML = "<img src='/ipurse/image/desktop/add/yes.gif' width='15' height='15'/>验证通过!";
          isUserName = true;
          } 
        validation(true); //验证用户名是否存在
    }else if(obj.id == "userEmail"){
        var val = Ext.getDom("userEmailValidate");  
                         if(obj.value.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) == -1){
                         	val.style.color = "red";
                            val.innerHTML = "<img src='/ipurse/image/desktop/add/no.gif' width='15' height='15'/>邮箱地址格式不正确!";
                            isUserEmail = false;
                         }else{
                            val.style.color = "blue";
                            val.innerHTML = "<img src='/ipurse/image/desktop/add/yes.gif' width='15' height='15'/>验证通过!";
                            isUserEmail = true;
                         }
       validation(false);   //验证邮箱地址是否存在                
    }else if(obj.id == "userPassword1"){
        var val = Ext.getDom("userPassword1Validate"); 
                            if(obj.value=="" && length == 0){
                               val.style.color = "red";
                               val.innerHTML = "<img src='/ipurse/image/desktop/add/no.gif' width='15' height='15'/>登陆密码不能为空!";
                            }else{
                               val.style.color = "blue";
                               val.innerHTML = "<img src='/ipurse/image/desktop/add/yes.gif' width='15' height='15'/>验证通过!";
                            }
    }else if(obj.id == "userPassword2"){
        var val = Ext.getDom("userPassword2Validate"); 
                            var psw1 = Ext.getDom("userPassword1").value;//获取第一次输入的密码
                            if(obj.value=="" && length == 0){
                               val.style.color = "red";
                               val.innerHTML = "<img src='/ipurse/image/desktop/add/no.gif' width='15' height='15'/>登陆密码不能为空!";
                               isUserPassword = false;
                            }else if(obj.value != psw1){//比较两次的密码是否一致
                             //如果不相同
                               val.style.color = "red";
                               val.innerHTML = "<img src='/ipurse/image/desktop/add/no.gif' width='15' height='15'/>两次输入的密码不一致!";
                               isUserPassword = false;
                            }else{
                               val.style.color = "blue";
                               val.innerHTML = "<img src='/ipurse/image/desktop/add/yes.gif' width='15' height='15'/>验证通过!";
                               isUserPassword = true;
                            } 
    }      
 }
/*
  * by:rush date:2011年3月26日 15:14:07
  * 功能：提交注册信息
  * */
 function regNew(){	
 	if(!(isUserName && isUserEmail && isUserPassword)){//如果满足要求才能进行注册
    Ext.Msg.alert("XXX网温馨提醒","输入的数据没有通过验证,请重新输入!");  
   	return;
    }
    var path = Ext.getDom("path").value;   
    ////下面是进行实际的注册操作
	Ext.Ajax.request({
	   url : path+'/login.do?method=registerNew',//url地址
       method : 'post',//提交的方法
       defaultHeaders : 'application/x-www-form-urlencoded;charset=UTF-8',//默认的头部信息
       params : {//附加的参数
                 userName : Ext.getDom("userName").value,
                 userEmail : Ext.getDom("userEmail").value,
                 userPassword : MD5(Ext.getDom("userPassword1").value) // 调用MD5算法进行加密
                },
       success : function(response){//成功后执行的操作
       	         var obj = Ext.decode(response.responseText);
       	         userLoginId = obj.userId;
       	         userLoginName = obj.userName;   
       	         Ext.Msg.alert("网站提示","恭喜您,注册成功!");
               }, 
       failure : function(response){//失败后执行的操作
               Ext.Msg.alert("网站提示","请求错误,请重试!");
       }         
	});
};
 
/*
 * by:rush date:2011年3月26日 18:23:48
 * 功能：根据type验证用户名称或者邮箱地址是否存在
 * */
function validation(booType){
   var path = Ext.getDom("path").value;
   if(booType){//true说明是进行用户的验证
      Ext.Ajax.request({
    	url : path+'/login.do?method=validation',
    	method : 'post',
    	defaultHeaders : 'application/x-www-form-urlencoded;charset=UTF-8',//默认的头部信息
    	params : {
    	          userName : Ext.getDom("userName").value,//获取用户名
    	          type : 'userName'//获取邮箱地址
    			 },
    	success : function(response){
		    		if(response.responseText == 'true'){
		    		      var obj = Ext.decode(response.responseText);
		    		      //下面判断传回的参数是否已经标识处理成功
		    		      var val =  Ext.getDom("userNameValidate"); 
		                  val.style.color = "red";
		                  val.innerHTML = "<img src='/ipurse/image/desktop/add/no.gif' width='15' height='15'/>用户昵称已经存在,请重新输入一个!";
		                  isStop = true;
		    		}     
    	         },
    	failure : function(response){
    	          alert("请求失败，尝试重试?");
    	         }         
    });
    
   }else{
       Ext.Ajax.request({
    	url : path+'/login.do?method=validation',
    	method : 'post',
    	defaultHeaders : 'application/x-www-form-urlencoded;charset=UTF-8',//默认的头部信息
    	params : {
    	          userEmail : Ext.getDom("userEmail").value,//获取邮箱地址
    	          type : 'userEmail'//获取邮箱地址
    			 },
    	success : function(response){
	    		      if(response.responseText == 'true'){
	    		        var obj = Ext.decode(response.responseText);
	    		      //下面判断传回的参数是否已经标识处理成功
	    		        var val =  Ext.getDom("userEmailValidate"); 
	                    val.style.color = "red";
	                    val.innerHTML = "<img src='/ipurse/image/desktop/add/no.gif' width='15' height='15'/>邮箱地址已经存在,请重新输入一个!";
	                    isStop = true;
	    		      }  		      
    	         },
    	failure : function(response){
    	          alert("请求失败，尝试重试?");
    	         }         
    });
   }
}