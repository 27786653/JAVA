<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
		<jsp:include page="../../public/top.jsp"></jsp:include>    
<script type="text/javascript" src="${path}js/Custom.js"></script>
  </head>
  <body style="background-color:#fff; ">
   <div class="ibox float-e-margins">
                            <div class="ibox-title">
                                <h5>文档回收站</h5><span class="label label-primary">当前${modellist.size()}个可以操作</span>
                            </div>
                              
                            <div class="ibox-content">

                                <table class="table table-bordered table-hover">
                                    <thead>
                                        <tr >
                                            <th>#</th>
                                            <th>名称</th>
                                            <th>类型</th>
                                            <th>所有者</th>
                                            <th>创建时间</th>
                                            <th style="width:200px ">操作</th>
                                        </tr>                                  
                                          </thead>
                                    <tbody>
                                <c:if test="${modellist.get(0).fdParend!=0}"><button type="button" class="btn btn-primary"  onClick="javascript :history.back(-1);">返回</button></c:if>  
                                    <c:forEach items="${modellist}" var="m">
                                    
                                    
                                          <tr onclick="<c:if test='${m.fileType.ftId==6}'>aclick(${m.fdId})</c:if>">
                                            <td>${m.fdId}</td>
                                            <td>${m.file.FName}</td>
                                            <td>${m.fileType.ftName}</td>
                                            <td>${session.user.UName}</td>
                                            <td>${m.file.FCreateTime}</td>
                                              <td><c:if test="${m.fileType.ftId!=6}"><button type="button" class="btn btn-primary" ><a href="${path}/file/Users/1/${m.FUrl}">下载</a></button>&nbsp;&nbsp;&nbsp;&nbsp;</c:if><button type="button" class="btn bg-primary" >编辑 </button>&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-danger"  >删除</button></td>
                                        </tr>
                                    
                                    </c:forEach>
                                    
                                  
                                      
                                    </tbody>
                                </table>

                            </div>
                        </div>
  </body>
</html>
