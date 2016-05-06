<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	response.getWriter().write(
		"<script type='text/javascript'>window.location.href = '../login.jsp';</script>");
	response.addHeader("timeout", "1");
%>