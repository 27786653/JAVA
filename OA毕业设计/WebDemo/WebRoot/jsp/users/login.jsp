<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<jsp:include page="../public/top.jsp"></jsp:include>
<script type="text/javascript">
$(function(){
 if(window != top){
        top.location.href=location.href;
    }
});
</script>
</head>

<body class="gray-bg">
    <div class="middle-box text-center loginscreen  animated fadeInDown">
        <div>
            <div>
                <h1 class="logo-name">OA</h1>
            </div>
            <h3>欢迎使用 OA</h3>

            <form class="m-t" role="form" action="${path}jsp/Mydesk/ua_dologin_index_1" method="post">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="用户名"  name="UName" required="">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" placeholder="密码" name="UPwd" required="">
                </div>
                <button type="submit" class="btn btn-primary block full-width m-b" data-loading-text="登录中...">登 录</button>
                <p class="text-muted text-center"> <a href="login.html#"><small>忘记密码了？</small></a> | <a href="${path}/jsp/users/register.jsp">注册一个新账号</a>
                </p>
            </form>
        </div>
    </div>

</body>

</html>
