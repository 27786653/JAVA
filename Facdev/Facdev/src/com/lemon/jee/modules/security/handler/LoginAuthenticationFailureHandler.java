package com.lemon.jee.modules.security.handler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
/**
 * 身份验证失败
 * @author 李森林
 *
 */
public class LoginAuthenticationFailureHandler implements AuthenticationFailureHandler {

	private static Logger log = LoggerFactory.getLogger(LoginAuthenticationFailureHandler.class);

	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException ae) throws IOException,
			ServletException {
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html; charset=utf-8");
		response.getWriter().write("{success:false},");
		response.getWriter().write("{msg:'用户不存在或者密码出错！'}");
		response.getWriter().flush();
		// 根据AuthenticationException异常的类型
		// 进行出错业务逻辑处理
		// response.sendRedirect(request.getContextPath()+"/login");
		log.info("登录验证失败：" + request.getContextPath());

	}

}
