package com.lemon.jee.modules.security.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.SecurityMetadataSource;
import org.springframework.security.access.intercept.AbstractSecurityInterceptor;
import org.springframework.security.access.intercept.InterceptorStatusToken;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;

import com.lemon.jee.common.utils.StringUtils;
import com.lemon.jee.modules.security.util.SecurityConstants;
import com.lemon.jee.modules.security.util.SecurityMetadataSourceTrustListHolder;
import com.lemon.jee.modules.security.util.SecurityUserTrustListHolder;
import com.lemon.jee.modules.security.util.SecutiryRequestUtil;
import com.lemon.jee.modules.security.util.SessionUserDetailsUtil;

/**
 * 自定义拦截器
 */
public class AppSecurityInterceptor extends AbstractSecurityInterceptor implements Filter {

	private static Logger log = LoggerFactory.getLogger(AppSecurityInterceptor.class);

	// 与applicationContext-security.xml里的myFilter的属性securityMetadataSource对应，
	// 其他的两个组件，已经在AbstractSecurityInterceptor定义
	private FilterInvocationSecurityMetadataSource securityMetadataSource;

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain) throws IOException, ServletException {

		log.info("开始拦截......");

		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		String url = httpRequest.getRequestURI().replaceFirst(httpRequest.getContextPath(), "");

		// 判断登陆状态：如果未登陆则要求登陆
//		if (!SessionUserDetailsUtil.isLogined()) {
//			httpResponse.sendRedirect(httpRequest.getContextPath() + SecurityConstants.LOGIN_URL);
//			logger.info("未登陆用户，From IP:" + StringUtils.getRemoteAddr(httpRequest) + "访问 ：URI" + url);
//			return;
//		}

//		// 过用户白名单：如果为超级管理员，则直接执行
//		if (SecurityUserTrustListHolder.isTrustUser(SessionUserDetailsUtil.getLoginUserName())) {
//			filterChain.doFilter(request, response);
//			return;
//		}
//		// 过资源(URL)白名单：如果为公共页面，直接执行
//		if (SecurityMetadataSourceTrustListHolder.isTrustSecurityMetadataSource(url)) {
//			filterChain.doFilter(request, response);
//			return;
//		}

		FilterInvocation fi = new FilterInvocation(request, response, filterChain);
		invoke(fi);
	}

	// 进行安全验证
	public void invoke(FilterInvocation fi) throws IOException, ServletException {

		// InterceptorStatusToken token = super.beforeInvocation(fi)
		// 1.获取请求资源的权限
		// 执行Collection<ConfigAttribute> attributes =
		// SecurityMetadataSource.getAttributes(object);
		// 2.是否拥有权限
		// accessDecisionManager.decide(authenticated, object, attributes);

		InterceptorStatusToken token = null;
		try {
			token = super.beforeInvocation(fi);
		} catch (IllegalArgumentException e) {
			HttpServletRequest httpRequest = fi.getRequest();
			HttpServletResponse httpResponse = fi.getResponse();
			String url = httpRequest.getRequestURI().replaceFirst(httpRequest.getContextPath(), "");
			logger.info("用户 " + SessionUserDetailsUtil.getLoginUserName() + "，From IP:" + SecutiryRequestUtil.getRequestIp(httpRequest)
					+ "。尝试访问未授权(或者) URI:" + url);

			httpResponse.setStatus(HttpServletResponse.SC_NOT_ACCEPTABLE);
			RequestDispatcher dispatcher = httpRequest.getRequestDispatcher(SecurityConstants.NOT_ACCEPTABLE);
			dispatcher.forward(httpRequest, httpResponse);
			return;
		}

		try {
			fi.getChain().doFilter(fi.getRequest(), fi.getResponse());
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			super.afterInvocation(token, null);
		}
	}

	@Override
	public Class<?> getSecureObjectClass() {
		return FilterInvocation.class;
	}

	@Override
	public SecurityMetadataSource obtainSecurityMetadataSource() {
		return securityMetadataSource;
	}

	public FilterInvocationSecurityMetadataSource getSecurityMetadataSource() {
		return securityMetadataSource;
	}

	public void setSecurityMetadataSource(FilterInvocationSecurityMetadataSource securityMetadataSource) {
		this.securityMetadataSource = securityMetadataSource;
	}

	public void init(FilterConfig arg0) throws ServletException {
		// TODO Auto-generated method stub

	}

	public void destroy() {
		// TODO Auto-generated method stub

	}

}
