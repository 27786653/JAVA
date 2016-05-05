<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@include file="../public/publichead.jsp" %>
<!DOCTYPE html>
<html><head>
<meta charset="utf-8">

<meta id="viewport" name="viewport" content="width=320; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;">
<title>小区管理</title>
<meta name="keywords" content="小区管理">
<meta name="description" content="小区管理">
<link href="${pageScope.basePath}css/css.css" rel="stylesheet" type="text/css">
<link href="${pageScope.basePath}css/font-awesome.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="${pageScope.basePath}js/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="${pageScope.basePath}js/jquery.Slide.js"></script>
<script type="text/javascript" src="${pageScope.basePath}js/jquery-msgbox.js"></script>
<script type="text/javascript">
function nopen(){ZENG.msgbox.show("此功能暂不开放！",2,2000);}
function docheck(){ZENG.msgbox.show("功能开发中，敬请期待！",2,2000);}
function doyouke(){ZENG.msgbox.show("你的身份是游客，不能操作！",2,2000);}
function doyezu(){ZENG.msgbox.show("你的业主身份未被审核，不能操作！",2,2000);}

$(function(){
    function conPosition() {
        var oBackground = document.getElementById("backgrounds");
        var dw = $(document).width();
        var dh = $(document).height();
        oBackground.style.width = dw+'px';
        oBackground.style.height = dh+'px';
        var oContent = document.getElementById("contents");
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var l = (document.documentElement.clientWidth - oContent.offsetWidth) / 1;
        var t = ((document.documentElement.clientHeight - oContent.offsetHeight) / 18) + scrollTop;
        oContent.style.left = l + 'px';
        oContent.style.top = t + 'px';
    }
    $("#report").click(function() {
		$("#report_pop").toggle();
        $("#backgrounds, #contents").toggle();
        conPosition();
        return false;
    });
    $("#backgrounds").click(function() {$("#backgrounds,#contents,#report_pop").hide();});
	$("#contents").click(function() {$("#backgrounds,#contents,#report_pop").hide();});
    //点击黑色背景隐藏弹出层，当然可以绑定在任意一个按钮上
    $(window).resize(function() {conPosition();});
    //$(window).scroll(function() {conPosition();});
    //开启内容跟随垂直滚动条（水平滚动条需要处理的问题更多，暂时没有考虑）
	
});

function ls(k,f) {
   ZENG.msgbox.show("正在切换到 "+f+"",6,2000);
   $.ajax({
			type:"GET",
			url:"logins.php",
			data:"yk=cheyk&ykid="+k,
			cache:false,
			success:function(data){
				setTimeout(function(){
				  ZENG.msgbox.show("切换成功，进在进入...！",6,2000);
				  window.location.reload();
				},2000);
			}
   });
}
</script>
</head>

<body>
<div id="backgrounds" style="width: 320px; height: 628px;">
</div>
<div id="contents" style="left: 320px; top: 28.3333px;">
</div>

<div class="home-head" id="report">名苑华庭 <i class="fa fa-angle-down fa-lg red2"></i>

<div id="report_pop" class="pop">
<ul>
<h6>提示：将以游客身份登录以下楼盘</h6>
<li><a href="http://56xiaoqu.com/main.php#" class="on" onclick="ls(&#39;11&#39;,&#39;名苑华庭&#39;)">名苑华庭</a></li>
<li><a href="http://56xiaoqu.com/main.php#" onclick="ls(&#39;10&#39;,&#39;盛南新都&#39;)">盛南新都</a></li>
 <li><a href="http://56xiaoqu.com/main.php#" onclick="ls(&#39;12&#39;,&#39;保利香槟&#39;)">保利香槟</a></li>
 <li><a href="http://56xiaoqu.com/main.php#" onclick="ls(&#39;13&#39;,&#39;星星华园国际花园&#39;)">星星华园国际花园</a></li>
 <li><a href="http://56xiaoqu.com/main.php#" onclick="ls(&#39;14&#39;,&#39;东海国际&#39;)">东海国际</a></li>
 <li><a href="http://56xiaoqu.com/main.php#" onclick="ls(&#39;15&#39;,&#39;天湖郦都&#39;)">天湖郦都</a></li>
 <li><a href="http://56xiaoqu.com/main.php#" onclick="ls(&#39;17&#39;,&#39;保利天玺&#39;)">保利天玺</a></li>
 <li><a href="http://56xiaoqu.com/main.php#" onclick="ls(&#39;18&#39;,&#39;名汇嘉园&#39;)">名汇嘉园</a></li>
 <li><a href="http://56xiaoqu.com/main.php#" onclick="ls(&#39;19&#39;,&#39;凯德城脉&#39;)">凯德城脉</a></li>
 <li><a href="http://56xiaoqu.com/main.php#" onclick="ls(&#39;22&#39;,&#39;碧桂园城市花园&#39;)">碧桂园城市花园</a></li>
 <li><a href="http://56xiaoqu.com/main.php#" onclick="ls(&#39;23&#39;,&#39;威尼水岸&#39;)">威尼水岸</a></li>
 <li><a href="http://56xiaoqu.com/main.php#" onclick="ls(&#39;24&#39;,&#39;雅居乐曼克顿山&#39;)">雅居乐曼克顿山</a></li>
 <li><a href="http://56xiaoqu.com/main.php#" onclick="ls(&#39;25&#39;,&#39;雅庭国际广场&#39;)">雅庭国际广场</a></li>
 <li><a href="http://56xiaoqu.com/main.php#" onclick="ls(&#39;26&#39;,&#39;兆阳御花园&#39;)">兆阳御花园</a></li>
 <li><a href="http://56xiaoqu.com/main.php#" onclick="ls(&#39;27&#39;,&#39;科秦君御华府&#39;)">科秦君御华府</a></li>
 <li><a href="http://56xiaoqu.com/main.php#" onclick="ls(&#39;28&#39;,&#39;保利鼎峰&#39;)">保利鼎峰</a></li>
 <li><a href="http://56xiaoqu.com/main.php#" onclick="ls(&#39;29&#39;,&#39;卓远景峰&#39;)">卓远景峰</a></li>
 <li><a href="http://56xiaoqu.com/main.php#" onclick="ls(&#39;30&#39;,&#39;铂顿国际公寓&#39;)">铂顿国际公寓</a></li>
 <li><a href="http://56xiaoqu.com/main.php#" onclick="ls(&#39;31&#39;,&#39;岭南天地&#39;)">岭南天地</a></li>
 <li><a href="http://56xiaoqu.com/main.php#" onclick="ls(&#39;32&#39;,&#39;鸿业城市花园&#39;)">鸿业城市花园</a></li>
 <li><a href="http://56xiaoqu.com/main.php#" onclick="ls(&#39;33&#39;,&#39;星晖盛汇园&#39;)">星晖盛汇园</a></li>
 <li><a href="http://56xiaoqu.com/main.php#" onclick="ls(&#39;34&#39;,&#39;沿海馨庭&#39;)">沿海馨庭</a></li>
 <li><a href="http://56xiaoqu.com/main.php#" onclick="ls(&#39;75&#39;,&#39;古生雅苑&#39;)">古生雅苑</a></li>
 </ul>
</div>

</div>

<div class="slide">

<ul class="bd">
 <li style="display: list-item;"><a href="http:"><img src="${pageScope.basePath}images/20140912105712619.jpg"></a></li>
 <li style="display: none;"><a href="http://weixin.lalashare.com/"><img src="${pageScope.basePath}images/20150723131046136.gif"></a></li>
 <li style="display: none;"><a href="http://weixin.lalashare.com/index.php?g=Wap&amp;m=Index&amp;a=index&amp;token=gkntmx1425959304"><img src="${pageScope.basePath}images/20150422121720631.jpg"></a></li>
 <li style="display: none;"><a href="http://www.paiduixing.com/"><img src="${pageScope.basePath}images/20150310171933917.jpg"></a></li>
 <li style="display: none;"><a href="http://56xiaoqu.com/convenview.php?id=4026"><img src="${pageScope.basePath}images/20141209181643612.jpg"></a></li>
 <li style="display: none;"><a href="http:"><img src="${pageScope.basePath}images/20140905110439006.jpg"></a></li>
 </ul>
</div>
<script language="javascript">
    jQuery(".slide").slide({mainCell:".bd",autoPlay:true});
</script>

<div class="home-message"><i class="fa fa-envelope-o fa-lg huise"></i>　
<a href="http://56xiaoqu.com/notices.php?id=177">温馨提示登革热</a></div>

<div class="line10"></div>
<div class="home-icon">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tbody><tr>
    <td><a href="http://56xiaoqu.com/notice.php" class="icon col1"><i class="fa fa-envelope fa-3x pr">
        <span class="pa pnum">3</span>
        </i>
    </a></td>
    <td><a href="javascript:;" onclick="doyezu()" class="icon col2"><i class="fa fa-wrench fa-3x"></i></a></td>
    <td><a href="http://56xiaoqu.com/service.php" class="icon col3"><i class="fa fa-university fa-3x"></i></a></td>
    <td><a href="javascript:;" onclick="doyezu()" class="icon col4"><i class="fa fa-jpy fa-3x"></i></a></td>
  </tr>
  <tr>
    <th><a href="http://56xiaoqu.com/notice.php">物业通知</a></th>
    <th><a href="javascript:;" onclick="doyezu()">在线报修</a></th>
    <th><a href="http://56xiaoqu.com/service.php">物业服务</a></th>
    <th><a href="javascript:;" onclick="doyezu()">我的账单</a></th>
  </tr>
  <tr>
    <td><a href="http://56xiaoqu.com/conven.php" class="icon col5"><i class="fa fa-coffee fa-3x"></i></a></td>
    <td><a href="http://56xiaoqu.com/activity.php" class="icon col12"><i class="fa fa-paper-plane-o fa-3x"></i></a></td>
    <td><a href="http://56xiaoqu.com/around.php" class="icon col10"><i class="fa fa-map-marker fa-3x"></i></a></td>
    <td><a href="javascript:;" onclick="doyezu()" class="icon col9"><i class="fa fa-credit-card fa-3x"></i></a></td>
  </tr>
  <tr>
    <th><a href="http://56xiaoqu.com/conven.php">便民服务</a></th>
    <th><a href="http://56xiaoqu.com/activity.php">社区文化</a></th>
    <th><a href="http://56xiaoqu.com/around.php">周边活动</a></th>
    <th><a href="javascript:;" onclick="doyezu()">VIP中心</a></th>
  </tr>
  <tr>
    <td><a href="http://56xiaoqu.com/shop.php" class="icon col8"><i class="fa fa-shopping-cart fa-3x"></i></a></td>
    <td><a href="http://56xiaoqu.com/coupons.php" class="icon col11"><i class="fa fa-money fa-3x"></i></a></td>
    <td><a href="javascript:;" onclick="nopen()" class="icon col7"><i class="fa fa-jsfiddle fa-3x"></i></a></td>
    <td><a href="http://56xiaoqu.com/search.php" class="icon col13"><i class="fa fa-search fa-3x"></i></a></td>
  </tr>
  <tr>
    <th><a href="http://56xiaoqu.com/shop.php">社区商城</a></th>
    <th><a href="http://56xiaoqu.com/coupons.php">优惠券</a></th>
    <th><a href="javascript:;" onclick="nopen()">智能家居</a></th>
    <th><a href="http://56xiaoqu.com/search.php">便民工具</a></th>
  </tr>
</tbody></table>
  <div class="line50"></div>
</div>

<footer>
<div class="line50"></div>
<div class="clear"></div>
<div id="stickey_footer">
<ul id="footer_menu">
<li><a href="http://56xiaoqu.com/user.php"><i class="fa fa-user fa-2x"></i><br>我的账户</a></li>
<li class="on"><a href="http://56xiaoqu.com/main.php"><i class="fa fa-home fa-2x"></i><br>首页</a></li>
<li><a href="http://56xiaoqu.com/bbs.php"><i class="fa fa-users fa-2x"></i><br>论坛</a></li>
<li><a href="javascript:;" onclick="doyezu()"><i class="fa fa-cog fa-2x"></i><br>设置</a></li>
<li><a href="javascript:;" onclick="doyezu()"><i class="fa fa-pencil-square-o fa-2x"></i><br>发帖</a></li>
</ul>
</div></footer>
<img src="" width="0" height="0">

<audio controls="controls" style="display: none;"></audio></body><style type="text/css">#yddContainer{display:block;font-family:Microsoft YaHei;position:relative;width:100%;height:100%;top:-4px;left:-4px;font-size:12px;border:1px solid}#yddTop{display:block;height:22px}#yddTopBorderlr{display:block;position:static;height:17px;padding:2px 28px;line-height:17px;font-size:12px;color:#5079bb;font-weight:bold;border-style:none solid;border-width:1px}#yddTopBorderlr .ydd-sp{position:absolute;top:2px;height:0;overflow:hidden}.ydd-icon{left:5px;width:17px;padding:0px 0px 0px 0px;padding-top:17px;background-position:-16px -44px}.ydd-close{right:5px;width:16px;padding-top:16px;background-position:left -44px}#yddKeyTitle{float:left;text-decoration:none}#yddMiddle{display:block;margin-bottom:10px}.ydd-tabs{display:block;margin:5px 0;padding:0 5px;height:18px;border-bottom:1px solid}.ydd-tab{display:block;float:left;height:18px;margin:0 5px -1px 0;padding:0 4px;line-height:18px;border:1px solid;border-bottom:none}.ydd-trans-container{display:block;line-height:160%}.ydd-trans-container a{text-decoration:none;}#yddBottom{position:absolute;bottom:0;left:0;width:100%;height:22px;line-height:22px;overflow:hidden;background-position:left -22px}.ydd-padding010{padding:0 10px}#yddWrapper{color:#252525;z-index:10001;background:url(chrome-extension://eopjamdnofihpioajgfdikhhbobonhbb/ab20.png);}#yddContainer{background:#fff;border-color:#4b7598}#yddTopBorderlr{border-color:#f0f8fc}#yddWrapper .ydd-sp{background-image:url(chrome-extension://eopjamdnofihpioajgfdikhhbobonhbb/ydd-sprite.png)}#yddWrapper a,#yddWrapper a:hover,#yddWrapper a:visited{color:#50799b}#yddWrapper .ydd-tabs{color:#959595}.ydd-tabs,.ydd-tab{background:#fff;border-color:#d5e7f3}#yddBottom{color:#363636}#yddWrapper{min-width:250px;max-width:400px;}</style></html>