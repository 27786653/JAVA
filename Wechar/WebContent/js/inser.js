$(function(){
	$(".logs a").click(function(){
		//这个是我的ajax异步请求方法
		$.ajax({
			type:"POST",
			url:"dologin.action",
			dataType:'json',
			data:{"uName":$("#uName").val(),"uPwd":$("#uPwd").val()},
			cache:false,
			success:function(data){    //注意看这里data，待会他就是json了    来做个测试看看
				console.log(data);
				ZENG.msgbox.show(data.info,6,data.timeto);
				if(data.status=="y"){
					setTimeout(function(){
					if(data.gotoPage==""||data.gotoPage==null){
					  window.location.reload();
					}else{
					  window.location.href = ""+data.gotoPage+"";
					}
					},2000);
				}else{
				ZENG.msgbox.show(data.info,5,data.timeto);
				}
			}
		});
		return false;
	});
	
	
	
	$(".regs a").click(function(){
		$.ajax({
			type:"POST",
			url:"reg2.php",
			dataType:'json',
			data:{"act":$("#act").val()
			,"df_id":$("#df_id").val()
			,"df_id2":$("#df_id2").val()
			,"df_id5":$("#df_id5").val()
			,"df_id3":$("#df_id3").val()
			,"df_id4":$("#df_id4").val()
			,"fangid":$("#fangid").val()
			,"yezuname":$("#yezuname").val()},
			cache:false,
			success:function(data){
				ZENG.msgbox.show(data.info,6,data.timeto);
				if(data.status=="y"){
					setTimeout(function(){
					if(data.goto==""){
					  window.location.reload();
					}else{
					  window.location.href = ""+data.goto+"";
					}
					},2000);
				}
				else
				{
				ZENG.msgbox.show(data.info,5,data.timeto);
				}
			}
		});
		return false;
	});
	
	
	$(".regk a").click(function(){
		$.ajax({
			type:"POST",
			url:"regquickss.php",
			dataType:'json',
			data:{"act":$("#act").val()
			,"communityid":$("#communityid").val()
			,"communitylouid":$("#communitylouid").val()
			,"fangid":$("#fangid").val()
			,"yezuname":$("#yezuname").val()},
			cache:false,
			success:function(data){
				ZENG.msgbox.show(data.info,6,data.timeto);
				if(data.status=="y"){
					setTimeout(function(){
					if(data.goto==""){
					  window.location.reload();
					}else{
					  window.location.href = ""+data.goto+"";
					}
					},2000);
				}
				else
				{
				ZENG.msgbox.show(data.info,5,data.timeto);
				}
			}
		});
		return false;
	});
	
	
	
	$(".rege a").click(function(){
		$.ajax({
			type:"POST",
			url:"logins.php",
			dataType:'json',
			data:{"act":$("#act").val()
			,"mobile":$("#mobile").val()
			,"password":$("#password").val()
			,"password2":$("#password2").val()
			,"shengid":$("#shengid").val()
			,"shiid":$("#shiid").val()
			,"quid":$("#quid").val()
			,"zhuid":$("#zhuid").val()
			,"communityid":$("#communityid").val()
			,"communitylouid":$("#communitylouid").val()
			,"fangid":$("#fangid").val()
			,"yezuname":$("#yezuname").val()},
			cache:false,
			success:function(data){
				ZENG.msgbox.show(data.info,6,data.timeto);
				if(data.status=="y"){
					setTimeout(function(){
					if(data.goto==""){
					  window.location.reload();
					}else{
					  window.location.href = ""+data.goto+"";
					}
					},2000);
				}
				else
				{
				ZENG.msgbox.show(data.info,5,data.timeto);
				}
			}
		});
		return false;
	});
	
	
	$(".mainad").click(function(){
		$.ajax({
			type:"POST",
			url:"save.php",
			dataType:'json',
			data:{"act":$("#act").val(),"potext":$("#potext").val(),"allpic":$("#allpic").val()},
			cache:false,
			success:function(data){
				ZENG.msgbox.show(data.info,6,data.timeto);
				if(data.status=="y"){
					setTimeout(function(){
					if(data.goto==""){
					  window.location.reload();
					}else{
					  window.location.href = ""+data.goto+"";
					}
					},2000);
				}
				else
				{
				ZENG.msgbox.show(data.info,5,data.timeto);
				}
			}
		});
		return false;
	});
	
	
	$(".fatiead").click(function(){
		$.ajax({
			type:"POST",
			url:"save.php",
			dataType:'json',
			data:{"act":$("#act").val()
			,"subject":$("#subject").val()
			,"classid":$("#classid").val()
			,"potext":$("#potext").val()
			,"allpic":$("#allpic").val()
			,"allpic2":$("#allpic2").val()},
			cache:false,
			success:function(data){
				ZENG.msgbox.show(data.info,6,data.timeto);
				if(data.status=="y"){
					setTimeout(function(){
					if(data.goto==""){
					  window.location.reload();
					}else{
					  window.location.href = ""+data.goto+"";
					}
					},2000);
				}
				else
				{
				ZENG.msgbox.show(data.info,5,data.timeto);
				}
			}
		});
		return false;
	});
	
	
	$(".fatieed").click(function(){
		$.ajax({
			type:"POST",
			url:"save.php",
			dataType:'json',
			data:{"act":$("#act").val()
			,"tid":$("#tid").val()
			,"subject":$("#subject").val()
			,"classid":$("#classid").val()
			,"potext":$("#potext").val()
			,"allpic":$("#allpic").val()
			,"allpic2":$("#allpic2").val()},
			cache:false,
			success:function(data){
				ZENG.msgbox.show(data.info,6,data.timeto);
				if(data.status=="y"){
					setTimeout(function(){
					if(data.goto==""){
					  window.location.reload();
					}else{
					  window.location.href = ""+data.goto+"";
					}
					},2000);
				}
				else
				{
				ZENG.msgbox.show(data.info,5,data.timeto);
				}
			}
		});
		return false;
	});
	
	
	$(".reppy").click(function(){
		$.ajax({
			type:"POST",
			url:"save.php",
			dataType:'json',
			data:{"act":$("#act").val()
			,"infoid":$("#infoid").val()
			,"typeid":$("#typeid").val()
			,"typeid2":$("#typeid2").val()
			,"ischeck":$("#ischeck").val()
			,"potext":$("#potext").val()},
			cache:false,
			success:function(data){
				ZENG.msgbox.show(data.info,6,data.timeto);
				if(data.status=="y"){
					setTimeout(function(){
					if(data.goto==""){
					  window.location.reload();
					}else{
					  window.location.href = ""+data.goto+"";
					}
					},2000);
				}
				else
				{
				ZENG.msgbox.show(data.info,5,data.timeto);
				}
			}
		});
		return false;
	});
	
	$(".yklogs a").click(function(){
		$.ajax({
			type:"POST",
			url:"logins.php",
			dataType:'json',
			data:{"act":$("#act").val(),"df_id3":$("#df_id3").val()},
			cache:false,
			success:function(data){
				ZENG.msgbox.show(data.info,6,data.timeto);
				if(data.status=="y"){
					setTimeout(function(){
					if(data.goto==""){
					  window.location.reload();
					}else{
					  window.location.href = ""+data.goto+"";
					}
					},2000);
				}
				else
				{
				ZENG.msgbox.show(data.info,5,data.timeto);
				}
			}
		});
		return false;
	});
	
	$(".settin a").click(function(){
		$.ajax({
			type:"POST",
			url:"save.php",
			dataType:'json',
			data:{"act":$("#act").val()
			,"allpic":$("#allpic").val()
			,"fangid":$("#fangid").val()
			,"yezuname":$("#yezuname").val()
			,"mobile":$("#mobile").val()
			,"password":$("#password").val()
			,"password2":$("#password2").val()},
			cache:false,
			success:function(data){
				ZENG.msgbox.show(data.info,6,data.timeto);
				if(data.status=="y"){
					setTimeout(function(){
					if(data.goto==""){
					  window.location.reload();
					}else{
					  window.location.href = ""+data.goto+"";
					}
					},2000);
				}
				else
				{
				ZENG.msgbox.show(data.info,5,data.timeto);
				}
			}
		});
		return false;
	});
	
	
	
	
	
	
	
})