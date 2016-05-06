package com.lemon.jee.modules.security.validate;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ImageFilter implements Filter {

	public void destroy() {
		// TODO Auto-generated method stub

	}

	public void doFilter(ServletRequest arg0, ServletResponse arg1,
			FilterChain arg2) throws IOException, ServletException {
		// TODO Auto-generated method stub
		HttpServletRequest request = (HttpServletRequest) arg0;
		HttpServletResponse response = (HttpServletResponse) arg1;

		String yanzhengm = request.getParameter("randomcode");
		String sessionyanz = (String) request.getSession(true).getAttribute(
				"rand");
		System.out.println("randomcode :" + yanzhengm + "  sessionanz :"
				+ sessionyanz);
		if (yanzhengm.equals(sessionyanz)) {
			arg2.doFilter(request, response);
		} else {
			response.setCharacterEncoding("UTF-8");
			response.setContentType("text/html; charset=utf-8");
			response.getWriter().write("{success:false},");
			response.getWriter().write("{msg:'验证码出错！'}");
			response.getWriter().flush();
		}
	}

	public void init(FilterConfig arg0) throws ServletException {
		// TODO Auto-generated method stub
	}

}
