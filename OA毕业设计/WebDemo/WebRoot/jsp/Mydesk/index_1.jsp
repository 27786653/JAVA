<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
<jsp:include page="../public/top.jsp"></jsp:include>
<c:if test="${session.user==null}">
  <c:redirect url="../users/login.jsp" ></c:redirect>
  </c:if>
</head>

<body onload="show(${session.user.UName})">
<!--侧边  -->
    <div id="wrapper">
        <nav class="navbar-default navbar-static-side" role="navigation">
           <jsp:include page="left.jsp"></jsp:include>
        </nav>



<!--顶部  -->
        <div id="page-wrapper" class="gray-bg dashbard-1">
            <div class="row border-bottom">
                <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
                    
                    <jsp:include page="top.jsp"></jsp:include>

                </nav>
            </div>
  <!--内容  -->          
            <div class="row">
                <div class="col-lg-12">
                    <div class="wrapper wrapper-content">
                        <div class="row">
                        
                        <div class="embed-responsive embed-responsive-4by3"><iframe id="fff" name="ifrmname" class="embed-responsive-item" src="../Mydesk/content.jsp"></iframe></div>
 			
 		
                        </div>
                    </div>

                    <div class="footer">
                        <div class="pull-right">
                            By：<a href="http://791120662@qq.com" target="_blank">LiSenLin</a>
                        </div>
                        <div>
                            <strong>Copyright</strong> OA &copy; 2015
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

   

    <script type="text/javascript">
   
                    	

                    
                    
    
        $(function () {
      // setInterval(function(){
        //            	$('iframe').attr('src', $('iframe').attr('src'));
       //},10000);
        
        });
        function　show(name){
         toastr.info('欢迎回来,'+name);
        }
      function par(){
      	toastr.success('新提示', '修改成功');
      $('iframe').attr('src', $('iframe').attr('src'));
      }
        
                    
    </script>


</body>

</html>
