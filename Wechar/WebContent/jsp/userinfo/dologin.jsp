<%@include file="../public/publichead.jsp" %>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>会员登录-小区管理</title>
<meta id="viewport" name="viewport" content="width=320; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;" />
<meta name="keywords" content="小区管理" />
<meta name="description" content="小区管理" />
<link href="${pageScope.basePath}css/css.css" rel="stylesheet" type="text/css" />
<link href="${pageScope.basePath}css/font-awesome.css" rel="stylesheet" type="text/css" />
<script src="${pageScope.basePath}js/jquery-1.10.2.min.js" type="text/javascript"></script>
<script src="${pageScope.basePath}js/validform_v5.3.2_min.js" type="text/javascript"></script>
<script src="${pageScope.basePath}js/jquery-msgbox.js" type="text/javascript"></script>
<script src="${pageScope.basePath}js/inser.js" type="text/javascript"></script>
</head>

<body style="background-color:#f5f5f5">
<div class="list-head2"><span><a href="reg.php" class="orger">免费注册</a></span>　<i class="fa fa-user"></i> <a href="chooisCity.jsp">游客登录</a></div>
<div class="slide"><a href="http://"><img src="${pageScope.basePath}picture/20140912095112865.jpg"></a></div>

<div class="line10"></div>
<form class="registerfordm" action="" method="post" name="theForm">
<div class="login-a">
  <div class="login-k">
    <h2>用户名 :　<input name="uName" id="uName" type="text" class="login-i" placeholder="您的手机号码" /></h2>
    <div class="line0"></div>
    <h2>密　码 :　<input name="uPwd" id="uPwd" type="password" class="login-i" placeholder="输入密码（默认123123）"/></h2>
  </div>
  <div class="login-forget"><span><a href="#">忘记密码？</a></span><input name="" type="checkbox" value=""> 默认登陆</div>
  <div class="login-forget" id="msg1"></div>
  <div class="login-button logs"> <a href="javascript:">登　录</a></div>
  <input type="hidden" name="act" id="act" value="log" />
</div>
</form>
<div class="line60"></div>
</html>
