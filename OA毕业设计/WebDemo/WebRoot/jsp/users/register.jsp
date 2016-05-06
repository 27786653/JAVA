<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<jsp:include page="../public/top.jsp"></jsp:include>
</head>

<body class="gray-bg">

    <div class="middle-box text-center loginscreen   animated fadeInDown">
        <div>
            <div>

                <h1 class="logo-name">OA</h1>

            </div>
            <h3>欢迎注册 OA</h3>
            <p>创建一个OA新账户</p>
            <form class="m-t" role="form" action="ua_regist_index_1">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="请输入用户名"  name="UName" required="">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" placeholder="请输入密码"  name="UPwd" required="">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" placeholder="请再次输入密码"  name="UPwd_replace" required="">
                </div>
                <div class="form-group text-left">
                    <div class="checkbox i-checks">
                        <label class="no-padding">
                            <input type="checkbox"><i></i> 我同意注册协议</label>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary block full-width m-b">注 册</button>

                <p class="text-muted text-center"><small>已经有账户了？</small><a href="login.jsp">点此登录</a>
                </p>

            </form>
        </div>
    </div>

    <script>
        $(document).ready(function () {
            $('.i-checks').iCheck({
                checkboxClass: 'icheckbox_square-green',
                radioClass: 'iradio_square-green',
            });
        });
    </script>


</body>

</html>
