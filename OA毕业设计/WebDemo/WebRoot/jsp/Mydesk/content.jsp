<%@ page language="java" import="java.util.*,java.text.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
<jsp:include page="../public/top.jsp"></jsp:include>
	<script type="text/javascript" src="../../js/Custom.js"></script>
	<script type="text/javascript">
	$(function(){
	
	});
	function par(){
	javascript:window.parent.par();
	}
	function ccc(){
	javascript:window.parent.changeUrl('../Mydesk/preview.jsp','查看日历');
	}

	
	</script>
  </head>
  
  <!-- 内容区 -->
  <body  >
  
  <div style="background-color:#F3F3F4; height: 100%; width: 100%;">
     <!--列方式排列1  -->
                            <div class="col-lg-4">
                                <div class="ibox float-e-margins">
                                    <div class="ibox-title">
                                        <h5>待处理任务</h5>  <span class="label label-primary">10+</span>
                                      <div class="ibox-tools">
                                            <span class="label label-warning-light">更多...</span>
                                        </div>
                                    </div>
                                    <div class="ibox-content">
                                        <div>

                                            <div class="pull-right text-right">

                                                <span class="bar_dashboard">5,3,9,6,5,9,7,3,5,2,4,7,3,2,7,9,6,4,5,7,3,2,1,0,9,5,6,8,3,2,1</span>
                                                <br/>
                                                <small class="font-bold">&yen; 20 054.43</small>
                                            </div>
                                            <h4>广东省销售数据
                                            <br/>
                                            <small class="m-r"><a href="graph_flot.html"> 查看所有数据</a> </small>
                                        </h4>
                                        </div>
                                    </div>
                                </div>
                              
                                <div class="ibox float-e-margins">
                                    <div class="ibox-title">
                                        <h5>我的便签</h5><span class="label label-primary">${session.user.notes.size()}+</span>
                                        <div class="ibox-tools">
                                           <a href="javascript:void(0);"  onclick="add()"> <span class="label label-primary">+新增+</span></a>
                                        </div>
                                     </div>
                                    <div class="ibox-content no-padding">
                                        <ul class="list-group">
									<c:forEach items="${session.user.notes}" var="n">
                                            <li class="list-group-item">
                                            
                                                <p><a class="text-info"  href="javascript:void(0);"  onclick="cc(${n.NId},'查看note')">#${n.NTitle}#</a> ${n.NContent }</p>
                                                <small class="block text-right"><i class="fa fa-clock-o"></i> <c:if test="${n.dayBetweenCount==0}">今天</c:if><c:if test="${n.dayBetweenCount!=0}">${n.dayBetweenCount}天前</c:if></small>
                                            </li>
									
									</c:forEach>                                        
                                        </ul>
                                    </div>
                                </div>
                            
                            	<div class="ibox float-e-margins">
                                    <div class="ibox-title">
                                        <h5>常用网站</h5>  <span class="label label-primary">${session.user.webMangers.size()}+</span>
                                      <div class="ibox-tools">
                                       <a href="javascript:void(0);"  onclick="addweb()">    <span class="label label-primary">+新增+</span></a>
                                        </div>
                                    </div>
                                    <div class="ibox-content">
                                        <div>
                                            <c:forEach items="${session.user.webMangers}" var="n" varStatus="i">
                                           	
                                           			<p class="text-justify">标题：<a href="http://${n.WAddress}"> &nbsp; &nbsp; &nbsp; &nbsp;${n.WName}</a> <a href="javascript:void(0);"  onclick="ajaxDeleteweb(${n.WId})"> <span class="label label-danger pull-right">X</span></a>  </p>
                                            		             
						                     </c:forEach>                   
                                        </div>
                                    </div>
                                </div>
                                
                                
                                
                                
                                
                                
                                
                            
                            </div>
                              <!--列方式排列2  -->
                            <div class="col-lg-4">
                   


								<div class="ibox float-e-margins">
                            <div class="ibox-title">
                                <h5>OA通告</h5><span class="label label-primary">${session.user.announcements.size()}+</span>
                                <div class="ibox-tools">
                                    <a class="collapse-link">
                                        <i class="fa fa-chevron-up"></i>
                                    </a>
                                    <a class="close-link">
                                        <i class="fa fa-times"></i>
                                    </a>
                                </div>
                            </div>
                            <div class="ibox-content ibox-heading" style="display: block;">
                                <h3>>>>>新消息</h3>
                                <small><i class="fa fa-tim"></i> 您有${session.user.announcements.size()}条通告</small>
                            </div>
                            <div class="ibox-content" style="display: block;">
                                <div class="feed-activity-list">

									<c:forEach items="${session.user.announcements}"  var="a">
									
                                    <div class="feed-element ">
                                        <div>
                                            <small class="pull-right text-navy"><c:if test="${a.betweenDay==0}">今天</c:if><c:if test="${a.betweenDay!=0}">${a.betweenDay}天前</c:if></small>
                                            <h3 class="text-primary">${a.anTitle}</h3>
                                            <div>${a.anContent}</div>
                                            <small class="text-muted">${a.anDatetime }</small><small class="pull-right text-danger">${a.anLookCount}个人看过...</small>
                                        </div>
                                    </div>
									
									</c:forEach>

                                </div>
                            </div>
                        </div>
							
							
							
								<div class="ibox float-e-margins">
							<div class="widget style1 navy-bg">
                            <div class="row">
                                <div class="col-xs-3" >
                                <h3>天气：</h3>  
                                </div>
                                <div class="col-xs-8">
                                <iframe width="800" scrolling="no" height="120" frameborder="0" allowtransparency="true" src="http://i.tianqi.com/index.php?c=code&id=19&color=%23FFFFFF&icon=3&temp=0&num=3"></iframe>
                                </div>
                            </div>
                        </div>
							  </div>
							
							
							<div class="ibox float-e-margins" onclick="ccc()">
							<div class="widget style1 yellow-bg">
                            <div class="row">
                                <div class="col-xs-4">
                                   <h3>日历查询：</h3>点击查看更多
                                </div>
                                <div class="col-xs-8 text-right">
                                    <span> 今日： </span>
                                    <h2 class="font-bold"><%=new SimpleDateFormat("MM月dd日").format(new Date())%></h2>
                                </div>
                            </div>
                        </div>
							  </div>
								
							



                            </div>
                              <!--列方式排列3  -->
                            <div class="col-lg-4">
                                <div class="ibox float-e-margins">
                                    <div class="ibox-title">
                                        <h5>待处理任务</h5>
                                    </div>
                                    <div class="ibox-content ibox-heading">
                                        <h3>还有约79842492229个Bug需要修复</h3>
                                        <small><i class="fa fa-map-marker"></i> 地点当然是在办公室</small>
                                    </div>
                                    <div class="ibox-content timeline">

                                        <div class="timeline-item">
                                            <div class="row">
                                                <div class="col-xs-3 date">
                                                    <i class="fa fa-briefcase"></i>
                                                    6:00
                                                    <br/>
                                                    <small class="text-navy">2 小时前</small>
                                                </div>
                                                <div class="col-xs-7 content no-top-border">
                                                    <p class="m-b-xs"><strong>服务器已彻底崩溃</strong>
                                                    </p>

                                                    <p>还未检查出错误</p>

                                                    <p><span data-diameter="40" class="updating-chart">5,3,9,6,5,9,7,3,5,2,5,3,9,6,5,9,4,7,3,2,9,8,7,4,5,1,2,9,5,4,7,2,7,7,3,5,2</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="timeline-item">
                                            <div class="row">
                                                <div class="col-xs-3 date">
                                                    <i class="fa fa-file-text"></i>
                                                    7:00
                                                    <br/>
                                                    <small class="text-navy">3小时前</small>
                                                </div>
                                                <div class="col-xs-7 content">
                                                    <p class="m-b-xs"><strong>修复了0.5个bug</strong>
                                                    </p>
                                                    <p>重启服务</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="timeline-item">
                                            <div class="row">
                                                <div class="col-xs-3 date">
                                                    <i class="fa fa-coffee"></i>
                                                    8:00
                                                    <br/>
                                                </div>
                                                <div class="col-xs-7 content">
                                                    <p class="m-b-xs"><strong>喝水、上厕所、做测试</strong>
                                                    </p>
                                                    <p>
                                                        喝了4杯水，上了3次厕所，控制台输出出2324个错误，神啊，带我走吧
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="timeline-item">
                                            <div class="row">
                                                <div class="col-xs-3 date">
                                                    <i class="fa fa-phone"></i>
                                                    11:00
                                                    <br/>
                                                    <small class="text-navy">21小时前</small>
                                                </div>
                                                <div class="col-xs-7 content">
                                                    <p class="m-b-xs"><strong>项目经理打电话来了</strong>
                                                    </p>
                                                    <p>
                                                        TMD，项目经理居然还没有起床！！！
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="timeline-item">
                                            <div class="row">
                                                <div class="col-xs-3 date">
                                                    <i class="fa fa-user-md"></i>
                                                    09:00
                                                    <br/>
                                                    <small>21小时前</small>
                                                </div>
                                                <div class="col-xs-7 content">
                                                    <p class="m-b-xs"><strong>开会</strong>
                                                    </p>
                                                    <p>
                                                        开你妹的会，老子还有897894个bug没有修复
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="timeline-item">
                                            <div class="row">
                                                <div class="col-xs-3 date">
                                                    <i class="fa fa-comments"></i>
                                                    12:50
                                                    <br/>
                                                    <small class="text-navy">讨论</small>
                                                </div>
                                                <div class="col-xs-7 content">
                                                    <p class="m-b-xs"><strong>…………</strong>
                                                    </p>
                                                    <p>
                                                        又是操蛋的一天
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            
                            </div>

  </body>
</html>
