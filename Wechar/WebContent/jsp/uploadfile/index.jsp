<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@include file="../public/publichead.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
<form method="POST" action="${pageScope.basePath}uploadimages.action" enctype="multipart/form-data">
    <div class="ImageBox">
        <input type="file" name="pic" />
    </div>
    <button type="submit">完成</button>
</form>
<script>
</script>
</body>
</html>