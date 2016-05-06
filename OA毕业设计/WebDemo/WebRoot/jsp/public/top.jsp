<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
request.getSession().setAttribute("path", path+"/");
%>
<title>OA自动化</title>
 <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="renderer" content="webkit">
<link href="${path}css/bootstrap.min.css?v=3.4.0" rel="stylesheet">
	<link href="${path}css/style.css?v=2.2.0" rel="stylesheet">
    <link href="${path}font-awesome/css/font-awesome.css?v=4.3.0" rel="stylesheet">
    <link href="${path}css/animate.css" rel="stylesheet">
     <link href="${path}css/plugins/iCheck/custom.css" rel="stylesheet">
    
    
    
    <script src="${path}js/jquery-2.1.1.min.js"></script>
    <script src="${path}js/bootstrap.min.js?v=3.4.0"></script>
    <script src="${path}js/plugins/iCheck/icheck.min.js"></script>
    
     <!-- Mainly scripts -->
    <script src="${path}js/plugins/metisMenu/jquery.metisMenu.js"></script>
    <script src="${path}js/plugins/slimscroll/jquery.slimscroll.min.js"></script>

    <!-- Flot -->
    <script src="${path}js/plugins/flot/jquery.flot.js"></script>
    <script src="${path}js/plugins/flot/jquery.flot.tooltip.min.js"></script>
    <script src="${path}js/plugins/flot/jquery.flot.spline.js"></script>
    <script src="${path}js/plugins/flot/jquery.flot.resize.js"></script>
    <script src="${path}js/plugins/flot/jquery.flot.pie.js"></script>

    <!-- Peity -->
    <script src="${path}js/plugins/peity/jquery.peity.min.js"></script>
    <script src="${path}js/demo/peity-demo.js"></script>
    
<!-- layer javascript -->
	<script src="${path}js/plugins/layer/layer.min.js"></script>

    <!-- Custom and plugin javascript -->
    <script src="${path}js/hplus.js?v=2.2.0"></script>
    <script src="${path}js/plugins/pace/pace.min.js"></script>


    <!-- GITTER -->
    <script src="${path}js/plugins/gritter/jquery.gritter.min.js"></script>

    <!-- EayPIE -->
    <script src="${path}js/plugins/easypiechart/jquery.easypiechart.js"></script>

    <!-- Sparkline -->
    <script src="${path}js/plugins/sparkline/jquery.sparkline.min.js"></script>

    <!-- Sparkline demo data  -->
    <script src="${path}js/demo/sparkline-demo.js"></script>
    
    <!-- Toastr script -->
    <script src="${path}js/plugins/toastr/toastr.min.js"></script>
    <link rel="stylesheet" href="${path}css/plugins/toastr/toastr.min.css" type="text/css"></link>
    
    
    