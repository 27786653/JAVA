<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>

		<jsp:include page="../../public/top.jsp"></jsp:include>    
<script type="text/javascript" src="${path}js/Custom.js"></script>
  </head>
  
  <body style="background-color:#F3F3F4; ">
			<div class="col-lg-9 animated ">
                        <div class="mail-box-header">
                            <div class="pull-right tooltip-demo">
                                <a href="javascript:void(0);"  onclick="changeClass()" class="btn btn-white btn-sm" data-toggle="tooltip" data-placement="top" title="编辑便签">编辑 </a>
                                <a href="javascript:void(0);" onclick="ajaxDelete(${models.NId })" class="btn btn-white btn-sm" data-toggle="tooltip" data-placement="top" title="删除便签">删除 </a>
                            </div>
                            <h2>
                    查看便签
                </h2>
                            <div class="mail-tools tooltip-demo m-t-md">


                                <h3>
                        <span class="font-noraml">主题： </span>${models.NTitle }
                    </h3>
                                <h5>
                        <span class="pull-right font-noraml"><s:date name="models.NCreateTime"  format="yyyy年MM月dd日" /> </span>
                        <span class="font-noraml">便签记录id： </span>${models.NId }
                    </h5>
                            </div>
                        </div>
                        <div class="mail-box">


                            <div class="mail-body">
                                <h4>${models.NTitle }</h4>
                                <p>
                                ${models.NContent}
                                </p>

                                <p class="text-right">
                                    ${session.user.UName }
                                </p>

                            </div>
                            <div class="clearfix"></div>
                        </div>
                 
				<div  class="col-lg-9 animated hidden"  id="box2">
				<input type="hidden" name="NId"  value="${models.NId }">
  <div class="form-group has-success has-feedback">
    <label class="control-label col-sm-3" for="inputSuccess3">编辑你的标题:</label>
    <div class="col-sm-9">
      <input type="text" class="form-control" id="inputSuccess3"  name="NTitle" value="${models.NTitle }">
      <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
      <span id="inputSuccess3Status" class="sr-only">(success)</span>
    </div>
  </div>
  <div class="form-group has-success has-feedback">
    <label class="control-label col-sm-3" for="inputGroupSuccess2">编辑你的便签内容:</label>
    <div class="col-sm-9">
      <div class="input-group">
        <span class="input-group-addon">@</span>
        <input type="text" class="form-control" id="inputGroupSuccess2" aria-describedby="inputGroupSuccess2Status" name="NContent"  value="${models.NContent }">
      </div>
      <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
      <span id="inputGroupSuccess2Status" class="sr-only">(success)</span>
    </div>
  </div>
   <div class="form-group has-success has-feedback">
   <div class="col-sm-9">
 <button type="button" class="btn btn-primary btn-sm  btn-block"  onclick="ajaxUpdate(${models.NId })">提交</button> 
   </div>
   </div>
  
</form>
				</div>
				   </div>
  </body>
</html>
