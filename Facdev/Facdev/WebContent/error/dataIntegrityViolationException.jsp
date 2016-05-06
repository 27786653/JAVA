<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	response.getWriter().print("{'success':false,'msg':'数据完整性约束，键值唯一约束或未解除被使用关系！'}");
%>