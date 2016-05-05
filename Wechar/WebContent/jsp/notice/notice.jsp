<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@include file="../public/publichead.jsp" %>
<!DOCTYPE html>
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<meta id="viewport" name="viewport" content="width=320; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;">
<title>物业通知-小区管理</title>
<meta name="keywords" content="小区管理">
<meta name="description" content="小区管理">
<link href="${pageScope.basePath}css/css.css" rel="stylesheet" type="text/css">
<link href="${pageScope.basePath}css/font-awesome.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="${pageScope.basePath}js/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="${pageScope.basePath}js/jquery.Slide.js"></script>
</head>

<body>
<div class="list-head"><a href="http://56xiaoqu.com/main.php"><i class="fa fa-angle-left fa-lg goback"></i></a>物业通知</div>

<div class="xqbbs2">
  <ul>
  <c:if test="${noticelist==null||noticelist.size()==0 }">
		   <li>
		      <h2 class="color666" style="text-align: center;margin: 10px 0px"><a href="getNoticeDetail.action?id=181">暂无更多公告信息</a></h2>
		      
		    </li>
  </c:if>
  <c:forEach items="${noticelist}" var="notice">
    <li>
      <h2 class="<c:if test="${notice.nState==0 }">huise</c:if><c:if test="${notice.nState>0 }">color666</c:if>"><a href="getNoticeDetail.action?nId=${notice.nId}">${notice.nTitle}</a>　<b class="newicon">新</b></h2>
      <h3><i class="fa fa-comment"></i> 0 | ${notice.getnCreatetimeformat()}</h3>
    </li>
  </c:forEach>
      
	    
	  </ul>
  
  <div class="line1"></div>
  <div class="turn-page"><em><i>1/1</i></em><span class="home"></span><span class="pre"></span><span class="c">1</span><span class="next"></span><span class="last"></span></div></div>
  <div class="line50"></div>




<audio controls="controls" style="display: none;"></audio></body><style type="text/css">#yddContainer{display:block;font-family:Microsoft YaHei;position:relative;width:100%;height:100%;top:-4px;left:-4px;font-size:12px;border:1px solid}#yddTop{display:block;height:22px}#yddTopBorderlr{display:block;position:static;height:17px;padding:2px 28px;line-height:17px;font-size:12px;color:#5079bb;font-weight:bold;border-style:none solid;border-width:1px}#yddTopBorderlr .ydd-sp{position:absolute;top:2px;height:0;overflow:hidden}.ydd-icon{left:5px;width:17px;padding:0px 0px 0px 0px;padding-top:17px;background-position:-16px -44px}.ydd-close{right:5px;width:16px;padding-top:16px;background-position:left -44px}#yddKeyTitle{float:left;text-decoration:none}#yddMiddle{display:block;margin-bottom:10px}.ydd-tabs{display:block;margin:5px 0;padding:0 5px;height:18px;border-bottom:1px solid}.ydd-tab{display:block;float:left;height:18px;margin:0 5px -1px 0;padding:0 4px;line-height:18px;border:1px solid;border-bottom:none}.ydd-trans-container{display:block;line-height:160%}.ydd-trans-container a{text-decoration:none;}#yddBottom{position:absolute;bottom:0;left:0;width:100%;height:22px;line-height:22px;overflow:hidden;background-position:left -22px}.ydd-padding010{padding:0 10px}#yddWrapper{color:#252525;z-index:10001;background:url(chrome-extension://eopjamdnofihpioajgfdikhhbobonhbb/ab20.png);}#yddContainer{background:#fff;border-color:#4b7598}#yddTopBorderlr{border-color:#f0f8fc}#yddWrapper .ydd-sp{background-image:url(chrome-extension://eopjamdnofihpioajgfdikhhbobonhbb/ydd-sprite.png)}#yddWrapper a,#yddWrapper a:hover,#yddWrapper a:visited{color:#50799b}#yddWrapper .ydd-tabs{color:#959595}.ydd-tabs,.ydd-tab{background:#fff;border-color:#d5e7f3}#yddBottom{color:#363636}#yddWrapper{min-width:250px;max-width:400px;}</style></html>