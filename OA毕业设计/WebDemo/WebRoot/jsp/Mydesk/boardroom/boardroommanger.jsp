<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
		<jsp:include page="../../public/top.jsp"></jsp:include>    
<script type="text/javascript" src="${path}js/Custom.js"></script>
<script type="text/javascript">
$(function(){
		$('#myModal').on('hide.bs.modal', function (e) {
				  // do something...
		});

});


</script>
  </head>
  <body style="background-color:#fff; ">
  
<div class="row">

<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">添加新会议室</h4>
      </div>
      <div class="modal-body">
        <form action="www.baidu.com">
          <div class="form-group">
            <label for="recipient-name" class="control-label">会议室名称:</label>
            <input type="text" class="form-control" id="recipient-name" name="BCode">
          </div>
          <div class="form-group">
            <label for="message-text" class="control-label">会议室描述:</label>
            <input type="text" class="form-control" id="recipient-name" name="BDesc">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary" onclick="saveChangeb()">保存更改</button>
      </div>
    </div>
  </div>
</div>
<!-- Modal -->



                    <div class="col-lg-3">
                        <div class="ibox float-e-margins">
                            <div class="ibox-content mailbox-content">
                                <div class="file-manager">
                                    <a class="btn btn-block btn-primary compose-mail" href="javascript:void(0);" data-toggle="modal" data-target="#myModal">添加新会议室</a>
                                    <div class="space-25"></div>
                                    <h5>文件夹</h5>
                                    <ul class="folder-list m-b-md" style="padding: 0">
                                        <li>
                                            <a href="mailbox.html"> <i class="fa fa-inbox "> </i> 会议室总数 <span class="label label-success pull-right">${modellist.size()}</span> 
                                            </a>
                                        </li>
                                        <li>
                                            <a href="mailbox.html"> <i class="fa fa-envelope-o"></i>未租<span class="label label-primary pull-right">${lorncar}</span></a>
                                        </li>
                                        <li>
                                            <a href="mailbox.html"> <i class="fa fa-certificate"></i> 租出<span class="label label-warning pull-right">${unlorncar}</span></a>
                                        </li>
                                       
                                    </ul>
                                    
                                    <div class="clearfix"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-9 animated fadeInRight">
                        <div class="mail-box-header">

                            <form method="get" action="index.html" class="pull-right mail-search">
                                <div class="input-group">
                                    <input type="text" class="form-control input-sm" name="search" placeholder="搜索邮件标题，正文等">
                                    <div class="input-group-btn">
                                        <button type="submit" class="btn btn-sm btn-primary">
                                            搜索
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <h2>
                    会议室管理
                </h2>
                           
                        </div>
                        <div class="mail-box">

                            <table class="table table-hover table-mail">
                                <tbody>
                                    <tr class="unread">
                                        <td class="check-mail">
                                            <div class="icheckbox_square-green" style="position: relative;"><input type="checkbox" class="i-checks" style="position: absolute; opacity: 0;"><ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; border: 0px; opacity: 0; background: rgb(255, 255, 255);"></ins></div>
                                        </td>
                                        <td class="mail-ontact"><a href="mail_detail.html">会议室名称</a>
                                        </td>
                                        <td class="mail-subject"><a href="mail_detail.html">会议室描述</a>
                                        </td>
                                      
                                        <td class="mail-date">操作</td>
                                        
                                    </tr>
                                    <c:forEach items="${modellist}" var="c">
                                     <tr class="read">
                                        <td class="check-mail">
                                            <div class="icheckbox_square-green" style="position: relative;"><input type="checkbox" class="i-checks" style="position: absolute; opacity: 0;"><ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; border: 0px; opacity: 0; background: rgb(255, 255, 255);"></ins></div>
                                        </td>
                                        <td class="mail-ontact"><a href="mail_detail.html">${c.BCode}</a><c:if test="${c.BState==1}">  <span class="label label-warning pull-right">借出</span> </c:if><c:if test="${c.BState==0}">  <span class="label label-primary pull-right">未借</span> </c:if>
                                        </td>
                                        <td class="mail-subject"><a href="mail_detail.html">${c.BDesc}</a>
                                        </td>
                                        <td class=""><button type="button" class="btn btn-danger"  onclick="ajaxDelboard(${c.BId})" >删除</button></td>
                                    </tr>
                                    </c:forEach>
                                   
                                 
                                   
                                  
                                </tbody>
                            </table>


                        </div>
                    </div>
                </div>
  </body>
</html>
