package com.lemon.jee.modules.security.handler;

import java.io.IOException;
import java.security.Principal;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSessionEvent;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.session.HttpSessionEventPublisher;


/**
 * 登录成功
 * @author 李森林
 *
 */
public class LoginAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

	private static Logger log = LoggerFactory.getLogger(LoginAuthenticationSuccessHandler.class);

	// 登录验证成功后需要跳转的url
	private String url;

	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException,
			ServletException {

		log.info("登录验证成功：" + request.getContextPath() + url);
		
		// response.sendRedirect(request.getContextPath()+url);
//		System.out.println("登录验证成功：" + request.getContextPath() + url);
//		request.getSession().setAttribute("Loginuser", authentication.getName());
		response.getWriter().write("{success:true}");
        response.getWriter().flush();
		//request.getRequestDispatcher(url).forward(request, response);
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
}
