 <%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
 </head>

<body>
<!--侧边栏  -->
 <div class="sidebar-collapse">
                <ul class="nav" id="side-menu">
                    <li class="nav-header">

                        <div class="dropdown profile-element"> <span>
                            <img alt="image" class="img-circle" src="${path}img/profile_small.jpg" />
                             </span>
                            <a data-toggle="dropdown" class="dropdown-toggle" href="index.html#">
                                <span class="clear"> <span class="block m-t-xs"> <strong class="font-bold">Beaut-zihan</strong>
                             </span>  <span class="text-muted text-xs block" >超级管理员 <b class="caret"></b></span> </span>
                            </a>
                            <ul class="dropdown-menu animated fadeInRight m-t-xs">
                                <li><a href="form_avatar.html">修改头像</a>
                                </li>
                                <li><a href="profile.html">个人资料</a>
                                </li>
                                <li><a href="mailbox.html">信箱</a>
                                </li>
                                <li class="divider"></li>
                                <li><a href="login.html">安全退出</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li class="active">
                        <a href="javascript:;" onclick="changeUrl('../Mydesk/content.jsp','主页'); "><i class="fa fa-columns"></i> <span class="nav-label">主页</span> <span class="fa arrow"></span></a>
                    </li>
                    <li>
                        <a href="javascript:;" onclick="changeUrl('http://www.baidu.com','百度'); "><i class="fa fa-columns"></i> <span class="nav-label">站内百度</span><span class="label label-danger pull-right">2.0</span></a>
                    </li>                    
                    <li>
                        <a href="javascript:;" onclick="changeUrl('${path}jsp/Mydesk/calendar.jsp','日历安排');"><i class="fa fa fa-globe"></i> <span class="nav-label">日历安排</span><span class="fa arrow"></span></a>
                    </li>

                    <li>
                        <a href="index.html#"><i class="fa fa-bar-chart-o"></i> <span class="nav-label">文档管理</span><span class="fa arrow"></span></a>
                        <ul class="nav nav-second-level">
                            <li><a href="javascript:;" onclick="changeUrl('${path}jsp/Mydesk/file/fda_show_filelist?fdId=0','文档列表'); ">文档列表</a></li>
                             <li><a href="javascript:;" onclick="changeUrl('../Mydesk/file/fda_getTrList_fileRecycle','文档回收站'); ">文档回收站</a></li>
                        </ul>
                    </li>
                        <li>
                        <a href="index.html#"><i class="fa fa-bar-chart-o"></i> <span class="nav-label">行政管理</span><span class="fa arrow"></span></a>
                        <ul class="nav nav-second-level">
                            <li><a href="javascript:;" onclick="changeUrl('${path}jsp/Mydesk/boardroom/bda_showboard_boardroommanger','文档列表'); ">会议室管理</a></li>
                             <li><a href="javascript:;" onclick="changeUrl('${path}jsp/Mydesk/car/ca_showcar_carmanger','文档回收站'); ">用车管理</a></li>
                             <li><a href="javascript:;" onclick="changeUrl('../Mydesk/file/fda_getTrList_fileRecycle','文档回收站'); ">用章管理</a></li>
                             <li><a href="javascript:;" onclick="changeUrl('../Mydesk/file/fda_getTrList_fileRecycle','文档回收站'); ">图书借阅申请</a></li>
                             <li><a href="javascript:;" onclick="changeUrl('../Mydesk/file/fda_getTrList_fileRecycle','文档回收站'); ">名片印制流程</a></li>
                        </ul>
                    </li>
                       <li>
                        <a href="index.html#"><i class="fa fa-bar-chart-o"></i> <span class="nav-label">人事管理</span><span class="fa arrow"></span></a>
                        <ul class="nav nav-second-level">
                            <li><a href="javascript:;" onclick="changeUrl('${path}jsp/Mydesk/file/fda_show_filelist?fdId=0','文档列表'); ">请假申请</a></li>
                             <li><a href="javascript:;" onclick="changeUrl('../Mydesk/file/fda_getTrList_fileRecycle','文档回收站'); ">出差申请</a></li>
                              <li><a href="javascript:;" onclick="changeUrl('../Mydesk/file/fda_getTrList_fileRecycle','文档回收站'); ">收入证明流程</a></li>
                        </ul>
                    </li>
                     <li>
                        <a href="index.html#"><i class="fa fa-bar-chart-o"></i> <span class="nav-label">系统管理</span><span class="fa arrow"></span></a>
                        <ul class="nav nav-second-level">
                            <li><a href="javascript:;" onclick="changeUrl('${path}jsp/Mydesk/file/fda_show_filelist?fdId=0','文档列表'); ">组织结构管理</a></li>
                             <li><a href="javascript:;" onclick="changeUrl('../Mydesk/file/fda_getTrList_fileRecycle','文档回收站'); ">角色管理</a></li>
                              <li><a href="javascript:;" onclick="changeUrl('../Mydesk/file/fda_getTrList_fileRecycle','文档回收站'); ">用户管理</a></li>
                              <li><a href="javascript:;" onclick="changeUrl('${path}jsp/Mydesk/file/fda_show_filelist?fdId=0','文档列表'); ">操作日志</a></li>
                             <li><a href="javascript:;" onclick="changeUrl('../Mydesk/file/fda_getTrList_fileRecycle','文档回收站'); ">上传文件设置</a></li>
                              <li><a href="javascript:;" onclick="changeUrl('../Mydesk/file/fda_getTrList_fileRecycle','文档回收站'); ">字典管理</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="mailbox.html"><i class="fa fa-envelope"></i> <span class="nav-label">信箱 </span><span class="label label-warning pull-right">16</span></a>
                        <ul class="nav nav-second-level">
                            <li><a href="mailbox.html">收件箱</a>
                            </li>
                            <li><a href="mail_detail.html">查看邮件</a>
                            </li>
                            <li><a href="mail_compose.html">写信</a>
                            </li>
                        </ul>
                    </li>
                   
                   
                </ul>

            </div>
            <script type="text/javascript">
        
            
      
        
         function changeUrl(u,title){
        	 $('#fff').attr('src', u);
        	 toastr.success(title,'当前页面');
         	}
            </script>
            </body>