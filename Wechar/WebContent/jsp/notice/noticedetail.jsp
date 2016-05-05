<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@include file="../public/publichead.jsp" %>
<!DOCTYPE html>
<!-- saved from url=(0038)http://56xiaoqu.com/notices.php?id=181 -->
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<meta id="viewport" name="viewport" content="width=320; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;">
<title>缴费通知-小区管理</title>
<meta name="keywords" content="小区管理">
<meta name="description" content="小区管理">
<link href="${pageScope.basePath}css/css.css" rel="stylesheet" type="text/css">
<link href="${pageScope.basePath}css/font-awesome.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="${pageScope.basePath}js/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="${pageScope.basePath}js/jquery-msgbox.js"></script>
<script type="text/javascript" src="${pageScope.basePath}js/jquery.Slide.js"></script>
<script type="text/javascript">
$(function(){
	$(".shou a").click(function(){
		var love = $(this);
		var id = love.attr("rel");
		love.fadeOut(300);
		$.ajax({
			type:"POST",
			url:"savc.php",
			data:"act=coup&typeid=1&id="+id,
			cache:false,
			success:function(data){
				love.html(data);
				love.fadeIn(300);
			}
		});
		return false;
	});
});
</script> 
</head>

<body>
<div class="list-head2"><a href="http://56xiaoqu.com/notice.php"><i class="fa fa-angle-left fa-lg goback"></i></a>　详细内容</div>

<div class="gy-info">
  <div class="bm-top-2">
    <h2>${noticedetail.nTitle}</h2>
    <h3>${noticedetail.getnCreatetimeformat()}　来自: <a href="http://56xiaoqu.com/notices.php?id=181#">名苑华庭</a></h3>
    <div class="line10"></div>
    <div class="bm-info">
   <span style="font-size:16px;">尊敬的各业主/住户：</span><br>
<span style="font-size:16px;">&nbsp; &nbsp; ${noticedetail.nContent}</span><br>
<div style="text-align:right;">
	<span style="font-size:16px;line-height:1.5;">【泰联物业管理有限公司】</span>
</div></div>
  </div>  

</div>



<audio controls="controls" style="display: none;"></audio></body><style type="text/css">#yddContainer{display:block;font-family:Microsoft YaHei;position:relative;width:100%;height:100%;top:-4px;left:-4px;font-size:12px;border:1px solid}#yddTop{display:block;height:22px}#yddTopBorderlr{display:block;position:static;height:17px;padding:2px 28px;line-height:17px;font-size:12px;color:#5079bb;font-weight:bold;border-style:none solid;border-width:1px}#yddTopBorderlr .ydd-sp{position:absolute;top:2px;height:0;overflow:hidden}.ydd-icon{left:5px;width:17px;padding:0px 0px 0px 0px;padding-top:17px;background-position:-16px -44px}.ydd-close{right:5px;width:16px;padding-top:16px;background-position:left -44px}#yddKeyTitle{float:left;text-decoration:none}#yddMiddle{display:block;margin-bottom:10px}.ydd-tabs{display:block;margin:5px 0;padding:0 5px;height:18px;border-bottom:1px solid}.ydd-tab{display:block;float:left;height:18px;margin:0 5px -1px 0;padding:0 4px;line-height:18px;border:1px solid;border-bottom:none}.ydd-trans-container{display:block;line-height:160%}.ydd-trans-container a{text-decoration:none;}#yddBottom{position:absolute;bottom:0;left:0;width:100%;height:22px;line-height:22px;overflow:hidden;background-position:left -22px}.ydd-padding010{padding:0 10px}#yddWrapper{color:#252525;z-index:10001;background:url(chrome-extension://eopjamdnofihpioajgfdikhhbobonhbb/ab20.png);}#yddContainer{background:#fff;border-color:#4b7598}#yddTopBorderlr{border-color:#f0f8fc}#yddWrapper .ydd-sp{background-image:url(chrome-extension://eopjamdnofihpioajgfdikhhbobonhbb/ydd-sprite.png)}#yddWrapper a,#yddWrapper a:hover,#yddWrapper a:visited{color:#50799b}#yddWrapper .ydd-tabs{color:#959595}.ydd-tabs,.ydd-tab{background:#fff;border-color:#d5e7f3}#yddBottom{color:#363636}#yddWrapper{min-width:250px;max-width:400px;}</style></html>