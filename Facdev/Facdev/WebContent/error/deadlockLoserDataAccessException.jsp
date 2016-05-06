<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	response.getWriter().print("{'success':false,'msg':'当前的操作因为死锁而失败！'}");
%>