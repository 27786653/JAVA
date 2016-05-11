// JavaScript Document
	function show_cont(id){
		document.getElementById( id + "_cont" ).style.display = 'block';
	}
	function close_cont(id){
		document.getElementById( id ).style.display = 'none';	
	}
	function show_result(){
		document.getElementById( 'card_cont' ).style.display = 'none';	
		document.getElementById( 'result_cont' ).style.display = 'block';	
	}
	function close_result(){
		document.getElementById( 'result_cont' ).style.display = 'none';	
	}
	
	function oper_sub(id){
		var state = document.getElementById( id ).style.display;
		if( state == "none" ){
			document.getElementById( id ).style.display = "block";	
		}else{
			document.getElementById( id ).style.display = "none";	
		}
	}
	
	/**
	 * alert弹出
	 * @param {} message
	 */
	function showMessage(message){
		$("#blackBack").css("display","block");
		$("#blackBack").find(".confirm").css("display","block");
		$("#blackBack").find("#showInfoMessage").html(message);
	}

	/**
	 * alert关闭
	 */
	function closePopup(){
		$("#blackBack").css("display","none");
	}
	
	/**
	 * TO_TOP
	 */
	function to_top(){
		/*window.scrollTo(0,0);*/
		$('html, body').animate({scrollTop:0}, 'slow'); 
	}
	
	/**
	 * 判断当前系统版本是否为ipone os 7
	 * @return {Boolean}
	 */
	function isIPhoneOs7(){
		var userAgent = window.navigator.userAgent;
		if(userAgent.indexOf('iPhone') > -1 && userAgent.indexOf('OS 7') > -1){
			//iphone os 7
			return true;
		}
		return false;
	}
	
	/**
	 * 根据系统版本适配
	 */
	function adaptationOS(){
		//iphone os 7
		if(isIPhoneOs7()){
			$("header").css("position","absolute");
		}
	}
	
	/**
	 * 微商城图形验证码公共ajax验证方法
	 * @param {} options<br>
	 * var options = {<br>
	 * 	url : "", (访问url - 默认：applicationContextPath + "/weiindex/ajaxCheckImgCode.action"，可选)<br>
	 * 	async : false,(同步/异步-默认false，可选)<br>
	 *  params : {},(参数，可选)<br>
	 *  success : function(data){},(验证成功后，回调函数，可选)<br>
	 *  error : function(xhr){},(验证失败后，回调函数，可选)<br>
	 *  endCallback : function(){}(ajax执行完后，回调函数，可选)<br>
	 *  };
	 */
	function ajaxCheckImgCode(options){
		var ret = false;
		var localOption = {
			url : applicationContextPath + "/weiindex/ajaxCheckImgCode.action",
			async : false,
			params : {},
			success : function(data){
				if (!data.status) {
					showFail(data.msg);
				} else {
					ret = true;
				}
			},
			error : function(xhr){
				showFail("验证失败,请稍候再试！");
				return false;
			},
			endCallback : function(){}
		};
		$.extend(localOption, options);
		$.ajax({
			url: localOption.url,
			type : "POST",
			async : localOption.async,
			data : localOption.params,
			success: localOption.success,
			error : localOption.error
		});
		localOption.endCallback;
		return ret;
	}