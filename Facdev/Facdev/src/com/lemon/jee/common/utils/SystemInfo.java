package com.lemon.jee.common.utils;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

public class SystemInfo {

	/**
	 * 获得当前用户账号
	 */
	public static String getUserAccount() {
		SecurityContext secContext = SecurityContextHolder.getContext();
		Authentication auth = secContext.getAuthentication();
		if (auth != null) {
			Object principal = auth.getPrincipal();
			String userAccount = "";
			if (principal instanceof UserDetails) {
				userAccount = ((UserDetails) principal).getUsername();
			} else {
				userAccount = principal.toString();
			}
			System.out.println("userAccount : " + userAccount);
			return userAccount;
		} else {
			return "";
		}
	}

}
