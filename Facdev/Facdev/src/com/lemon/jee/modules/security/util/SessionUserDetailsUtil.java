package com.lemon.jee.modules.security.util;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

/**
 * 登陆用户信息工具类
 */
public class SessionUserDetailsUtil {

	/**
	 * 得到当前session中的用户，如果没有返回null
	 * 
	 * @return UserDetails
	 */
	public static UserDetails getUserDetails() {
		UserDetails userDetails = null;
		SecurityContext sc = SecurityContextHolder.getContext();
		Authentication ac = sc.getAuthentication();
		if (ac != null) {
			if (ac.getPrincipal() instanceof UserDetails) {
				userDetails = (UserDetails) ac.getPrincipal();
			}
		}
		return userDetails;
	}

	/**
	 * 得到当前登录用户，如果没有返回null
	 * 
	 * @return loginId
	 */
	public static String getLoginUserName() {
		String loginId = null;
		UserDetails userDetails = getUserDetails();
		if (userDetails != null) {
			loginId = userDetails.getUsername();
		}
		System.out.println("principal中获取的name:"+loginId);
		System.out.println("Authentication中获取的name:"+SecurityContextHolder.getContext().getAuthentication().getName());
		return loginId;
	}

	/**
	 * 判断用户是否登陆
	 * 
	 */
	public static boolean isLogined() {
		boolean flag = false;
		if (getLoginUserName() != null)
			flag = true;
		return flag;
	}

}
