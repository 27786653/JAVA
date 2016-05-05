<%@include file="../public/publichead.jsp" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta id="viewport" name="viewport" content="width=320; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;" />
<title>会员注册-小区管理</title>
<meta name="keywords" content="小区管理" />
<meta name="description" content="小区管理" />
<link href="${pageScope.basePath}css/css.css" rel="stylesheet" type="text/css" />
<link href="${pageScope.basePath}css/font-awesome.css" rel="stylesheet" type="text/css" />
<script src="${pageScope.basePath}js/jquery-1.9.1.min.js" type="text/javascript"></script>
<script src="${pageScope.basePath}js/validform_v5.3.2_min.js" type="text/javascript"></script>
<script src="${pageScope.basePath}js/jquery-msgbox.js" type="text/javascript"></script>
<script src="${pageScope.basePath}js/inser.js" type="text/javascript"></script>
<script>
function getVal(){ 
$.getJSON("select.php",{type_id:1,df_id:$("#df_id").val()},function(json){
var df_id2 = $("#df_id2");
df_id2.empty();
$.each(json,function(index,array){ 
var option = "<option value=\""+array['ds_id']+"\">"+array['ds_name']+"</option>"; 
df_id2.append(option); 
}); 
}); 
}

function getVal2(){
$.getJSON("select.php",{type_id:5,df_id:$("#df_id2").val()},function(json){
var df_id5 = $("#df_id5");
df_id5.empty();
$.each(json,function(index,array){ 
var option = "<option value=\""+array['ds_id']+"\">"+array['ds_name']+"</option>"; 
df_id5.append(option); 
}); 
}); 
}

function getVal4(){ 
$.getJSON("select.php",{type_id:2,df_id:$("#df_id5").val()},function(json){
var df_id3 = $("#df_id3");
df_id3.empty();
$.each(json,function(index,array){ 
var option = "<option value=\""+array['ds_id']+"\">"+array['ds_name']+"</option>"; 
df_id3.append(option); 
}); 
}); 
}

function ai(){
getVal();
}
function bi(){
getVal2();
}
function di(){
getVal4();
}
</script>
</head>

<body style="background-color:#f5f5f5">
<div class="list-head2"><span><a href="login.php">会员登录</a></span>　<a href="reg.php"><i class="fa fa-times-circle red"></i></a>游客登录</div>

<div class="line10"></div>
<form class="registerform" action="logins.php" method="post" name="theForm">
<div class="zhuce-a">
  <div class="zhuce-k">
    <ul>
       <li>
         <label for="df_id"></label>
         <select name="df_id" id="df_id" class="zhuce-choose-b" onchange="ai();"/>
           <option value="" >请选择省份</option>
                      <option value="1">广东省</option>
                       <option value="15">山西省</option>
             
         </select>
       </li>
       <li>
         <label for="df_id2"></label>
         <select name="df_id2" id="df_id2" class="zhuce-choose-b" onchange="bi();"/>
           <option value="">请选择城市</option>
         </select>
       </li>
       <li>
         <label for="df_id2"></label>
         <select name="df_id5" id="df_id5" class="zhuce-choose-b" onchange="di();"/>
           <option value="">请选择镇区</option>
         </select>
       </li>
       <li>
         <label for="df_id3"></label>
         <select name="df_id3" id="df_id3" class="zhuce-choose-b"/>
           <option value="">请选择小区</option>
         </select>
       </li>
       <span id="msg1"></span>
    
  <li><div class="zhuce-button yklogs"><a href="javascript:">游客登录</a></div>
  <input type="hidden" name="act" id="act" value="logyk" /></li>
  </ul>
  </div>
</div>
</form>
<img src="picture/wapstat.php" width="0" height="0"/></body>
</html>
