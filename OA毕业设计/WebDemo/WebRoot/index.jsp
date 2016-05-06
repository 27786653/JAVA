<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'index.jsp' starting page</title>
	<link rel="stylesheet" type="text/css" href="themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="themes/icon.css">
	<link rel="stylesheet" type="text/css" href="themes/demo.css">
	<script type="text/javascript" src="js/jquery-2.1.1.min.js"></script>
	<script type="text/javascript" src="js/jquery.easyui.min.js"></script>
	<style type="text/css">
	*{margin: 0; padding: 0}
	.west_ul_li{ width: 173px; overflow: hidden;}
	.west_ul_li li{
	font-size: 14px;
	text-align: center;
	padding: 5px;
	border-top: 1px #000 solid;
	list-style-type: none
	}
	
	.c_subNav { width:150px; } 
.c_subNav a { text-decoration:none; color:#333;} 
.c_subNav a:hover { color:#f60;} 
.c_subNav ul ul { position:absolute; display:none; right:-150px; top:-1px;} 
.c_subNav li { border-bottom:1px solid #ccc; position:relative; _position:static; float:left; width:100%;} 
.c_subNav a.li { position:relative;} 
.c_subNav li .option { display:block; line-height:15px; padding:5px 5px 5px 25px; background:no-repeat 5px 4px; cursor:pointer; font:12px Verdana; zoom:1; background:url(http://www.14px.com/wp-content/uploads/2009/05/ico.gif) no-repeat;} 
.c_subNav li .option:hover { color:#f60; background-color:#ffa;} 
.c_subNav li .option span { display:block; padding-right:15px; background:url(http://www.14px.com/wp-content/uploads/2009/05/ico.gif) no-repeat right 0;} 

	
	
	</style>
  </head>
  
  <body class="easyui-layout" >   
    <div data-options="region:'north',split:true,border:false" style="height:41px;margin-top: 3px">
    	<!-- 顶部 -->		<ul>   <li style="float:  left;font-size: 20px">办公化自动管理系统</li>    <li style="float: right;;"><a id="btn" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'">你好，李四  研发部</a>  </li><li style="float: right;"><a id="btn" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="alert('时间')">2013-12-19 17:10:45 周二</a>  </li></ul>
    </div>
    
       
    <div data-options="region:'south',split:true,border:false" style="height:36px;" >
 <!-- 底部 -->
    </div>   

    <div data-options="region:'west',split:true,border:false" style="width:188px;">
   <!-- 侧边栏 --> <div id="aa" class="easyui-accordion" style="width:300px;height:200px;">   
    
    
    <div title="我的桌面"  style="overflow:auto;padding:10px;">   
        <div class="c_subNav"> 
<ul> 
<li class="li charges"> 
<a href="#nogo" class="option"  ><span>待处理任务</span></a> 
</li> 
<li class="li edit"> 
<a href="#nogo" class="option" ><span>个人信息管理</span></a> 
</li> 
<li class="li biz"> 
<a href="#nogo" class="option"><span>我的便签</span></a> 
</li> 
<li class="li"> 
<a href="#nogo" class="option" ><span>通知公告</span></a> 
</li> 
<li class="li"> 
<a href="#nogo" class="option" ><span>常用网址</span></a> 
</li> 
<li class="li"> 
<a href="#nogo" class="option" >日历查询</a> 
</li>  
<li class="li change"> 
<a href="#nogo" class="option" ><span>日程管理</span></a> 
</li> 
<li class="li score"> 
<a href="#nogo" class="option" ><span>天气预报</span></a> 
</li> 
<li class="li server"> 
<a href="#nogo" class="option" ><span>在线客服</span></a> 
</li> 
</ul> 
</div> 

    </div>   
    <div title="通告管理" style="padding:10px;">   
        content2    
    </div>   
    <div title="文档管理">   
        content3    
    </div>   
    <div title="行政管理">   
        content3    
    </div>  
    <div title="人事管理">   
        content3    
    </div> 
    <div title="系统管理">   
        content3    
    </div>  
</div>  
    
    
    
    </div>   
    
    
    <div data-options="region:'center',border:false" style="padding:2px;background:#eee;"  >
    <!-- 右部 -->
   
	<div class="easyui-panel"  data-options="fit:true,border:false">
	<!-- 面板 -->
	
		<div id="tt" class="easyui-tabs" >   
    	<!-- 选项卡 -->
    			<div title="我的桌面" style="padding:20px;"  data-options="closable:true">   
        			tabs1
    			</div> 
    	</div>
		
		
	</div>

    </div>   
    
    
	<script type="text/javascript">

	
		$(function(){
		
				  $(".option").each(function(i){
				 			$(this).click(function(){
				 				if(!($("#tt").tabs("exists","我的桌面"))){
				 				addtabs("我的桌面","content");
				 				}
				 				var mydesk=$('#tt').tabs('getTab','我的桌面');
				 					switch(i){
				 						case 0:
 
				 								mydesk.append("<div id='dd' ><div id='title' >&nbsp;  </div>  <div id='p' style='padding:10px;'> "+   
  +"  <p>panel content.</p>    "+
+"</div></div> ");
$('#dd').draggable({ 
handle:'#title' 
}); 
								$('#p').panel({    
								  width:500,    
								  height:150,    
								  title: 'My Panel',   
								  closable:true,
								   minimizable:true,
								   maximizable:true
								   
								});   

												
				 							break;
				 					}
				 			})
				  });
			
				$('#aa').accordion({    
    				fit:true,
    				border:false   
					});  
				
				$('#tt').tabs({
				border:false,
				fit:true
				});
				
				
				
				

			
		});	
		
		
		function addtabs(name,content){
				$('#tt').tabs('add',{    
				    title:name,    
				    content:content,
				    closable:true
  
					});  
		}
		
		
		</script>
</body>  


</html>
