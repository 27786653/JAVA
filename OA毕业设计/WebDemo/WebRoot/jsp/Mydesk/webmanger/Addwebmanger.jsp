<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
		<jsp:include page="../../public/top.jsp"></jsp:include>    
<script type="text/javascript" src="${path}js/Custom.js"></script>
  </head>
  
  <body style="background-color:#fff; ">
  
   
  <div class="ibox float-e-margins">
                            <div class="ibox-title">
                                <h4>添加网站</h4>
                              
                            </div>
                            <div class="ibox-content">
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label">标题：</label>
                                        <div class="col-sm-8">
                                            <input id="webtitle" name="WName" minlength="2" type="text" class="form-control" required="" aria-required="true">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label">网站：</label>
                                        <div class="col-sm-8">
                                        <textarea rows="8" cols="55" name="WAddress"  id="webs"  ></textarea>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group">
                                        <div class="col-sm-4 col-sm-offset-3">
                                            <button class="btn btn-primary" type="button" onclick="ajaxAddweb()">提交</button>
                                        </div>
                                    </div>
                            </div>
                        </div>
  
  
  						
  
  
  
  </body>
</html>
