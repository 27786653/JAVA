<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<title>佛山分公司物流管理系统</title>

<link href="./Admin/extjs/resources/css/ext-all.css" rel="stylesheet"
	type="text/css" />
<link href="./Public/css/icons.css" rel="stylesheet" type="text/css" />
<link href="./Public/css/app.css" rel="stylesheet" type="text/css" />
<link href="./Admin/ext-ux/DataView/data-view.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="./Public/swfupload/swfupload.js"></script>
<script type="text/javascript" src="./Admin/extjs/bootstrap.js"></script>
<script type="text/javascript" src="./Admin/ext-override.js"></script>
<!-- <script type="text/javascript" src="./Admin/extjs/ext-all.js"></script> -->
<%--<script type="text/javascript" src="extjs/src/diag/layout/Context.js"></script>--%>
<%--<script type="text/javascript" src="extjs/src/diag/layout/ContextItem.js"></script>--%>
<script type="text/javascript"
	src="./Admin/extjs/locale/ext-lang-zh_CN.js"></script>
<script type="text/javascript" src="./Admin/app.js"></script>
<script type="text/javascript" src="./js/common.js"></script>
<script language="javascript" src="./print/LodopFuncs.js"></script>
<object id="LODOP" classid="clsid:2105C259-1E0C-4534-8141-A753534CB4CA"
	width=0 height=0>
	<embed id="LODOP_EM" type="application/x-print-lodop" width=0 height=0></embed>
</object>
<script language="javascript" src="print/print.js"></script>

	<!-- 以下为udeitor引入包 -->
<script type="text/javascript" src="./ueditor/ueditor.config.js"></script>
<script type="text/javascript" src="./ueditor/ueditor.all.js"></script>

<script language="javascript">
	function SessionTimeOut() {
		var s = null;
		Ext.Ajax.on('requestcomplete', function(conn, response, options, e) {
			if (s == null) {
				if (response.getResponseHeader != undefined) {
					s = response.getResponseHeader('timeout');
				}
			}
			if (s != null && s == '1') {
				Ext.MessageBox.alert("登录过期", "用户登录过期，请重新登录！");
				/* Ext.MessageBox.confirm("登录过期", "用户登录过期，请重新登录？",
					function(button, text) {
				       if (button == "yes") {
				    	   window.location.href = "./login.jsp";
				    	   s=null;
				       }
					}); */
			}
		});

	}
	Ext.onReady(SessionTimeOut);
</script>
</head>
<body>

	<!-- 	<script type="text/javascript">
		Ext.onReady(function() {

			Ext.create('Ext.Button', {
				text : 'Click Me',
				renderTo : Ext.getBody(),
				scale : 'medium',
				 style: {
		                marginBottom: '10px' //修改自己定义的样式
		            },
				iconCls : 'icon_add',
				iconAlign : 'top'
			});
		});
	</script> -->


</body>
</html>