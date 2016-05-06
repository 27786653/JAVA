package com.lemon.jee.modules.security.manager;

import java.util.Collection;
import java.util.Iterator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

/**
 * 访问决策器，决定某个用户具有的角色，是否有足够的权限去访问某个资源 ;做最终的访问控制决定 .
 */
public class AppAccessDescisionManager implements AccessDecisionManager {

	private static Logger log = LoggerFactory.getLogger(AppAccessDescisionManager.class);

	/**
	 * 认证用户是否具有权限访问该url地址;
	 */
	// 最重要的是decide方法，如果不存在对该资源的定义，直接放行；否则，如果找到正确的角色，即认为拥有权限，并放行，否则throw new
	// AccessDeniedException("no right");这样，就会进入上面提到的403.jsp页面。
	// 这里的三个参数可以片面的理解为：
	// 用户登录后的凭证(其中包含了用户名和角色的对应关系)、请求的URL、请求的URL对应角色(这些角色可以访问这些URL)
	public void decide(Authentication authentication, Object object, Collection<ConfigAttribute> configAttributes) throws AccessDeniedException,
			InsufficientAuthenticationException {

		log.info("验证用户是否具有访问资源的权限");

		if (configAttributes == null) {
			return;
		}
		
		Iterator<ConfigAttribute> it = configAttributes.iterator();
		while (it.hasNext()) {
			// 访问资源需要的权限
			String needRole = it.next().getAttribute();
			// authentication.getAuthorities() 用户所有的权限
			System.out.println(authentication.getAuthorities().iterator().next());
			for (GrantedAuthority ga : authentication.getAuthorities()) {
				if (needRole.equals(ga.getAuthority())) {
					return;
				}
			}
		}
		throw new AccessDeniedException("没有权限访问！");
	}

	/**
	 * 启动时候被AbstractSecurityInterceptor调用，
	 * 决定AccessDecisionManager是否可以执行传递ConfigAttribute。
	 */
	public boolean supports(ConfigAttribute attribute) {
		return true;
	}

	/**
	 * 被安全拦截器实现调用，包含安全拦截器将显示的AccessDecisionManager支持安全对象的类型
	 */
	public boolean supports(Class<?> clazz) {
		return true;
	}

}
