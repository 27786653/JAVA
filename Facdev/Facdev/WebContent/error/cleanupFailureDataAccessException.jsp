<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	response.getWriter().print("{'success':false,'msg':'操作成功地执行，但在释放数据库资源时发生异常！'}");
%>