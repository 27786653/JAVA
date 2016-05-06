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
                                <h5>文档回收站</h5>
                            </div>
                            <div class="ibox-content">

                                <table class="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>名称</th>
                                            <th>类型</th>
                                            <th>所有者</th>
                                            <th>创建时间</th>
                                            <th style="width:200px ">操作</th>
                                        </tr>                                  
                                          </thead>
                                    <tbody>
                                    
                                    <c:forEach items="${modellist}" var="m">
                                    
                                    
                                          <tr onclick="aclick(${m.fdId})">
                                            <td>${m.fdId}</td>
                                            <td>${m.file.FName}</td>
                                            <td>${m.fileType.ftName}</td>
                                            <td>${session.user.UName}</td>
                                            <td>${m.file.FCreateTime}</td>
                                              <td><button type="button" class="btn bg-primary"  onclick="ajaxupdatefilerecycle(${m.fdId})">恢复 </button></td>
                                        </tr>
                                    
                                    </c:forEach>
                                       
                                    </tbody>
                                </table>

                            </div>
                        </div>
  </body>
</html>
