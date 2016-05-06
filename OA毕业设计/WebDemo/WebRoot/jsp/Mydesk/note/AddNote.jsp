<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsf/core" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
		<jsp:include page="../../public/top.jsp"></jsp:include>    
<script type="text/javascript" src="${path}js/Custom.js"></script>
  </head>
  
  <body style="background-color:#fff; ">
  
  <div class="ibox float-e-margins">
                            <div class="ibox-title">
                                <h4>添加便签</h4>
                              
                            </div>
                            <div class="ibox-content">
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label">标题：</label>
                                        <div class="col-sm-8">
                                            <input id="at" name="NTitle" minlength="2" type="text" class="form-control" required="" aria-required="true">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label">内容：</label>
                                        <div class="col-sm-8">
                                        <textarea rows="8" cols="55" name="NContent"  id="ac"  ></textarea>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group">
                                        <div class="col-sm-4 col-sm-offset-3">
                                            <button class="btn btn-primary" type="button" onclick="ajaxAdd()">提交</button>
                                        </div>
                                    </div>
                            </div>
                        </div>
  
  
  						
  
  
  
  </body>
</html>
