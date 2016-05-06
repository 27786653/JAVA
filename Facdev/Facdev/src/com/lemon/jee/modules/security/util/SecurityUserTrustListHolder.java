package com.lemon.jee.modules.security.util;

import java.util.ArrayList;
import java.util.List;

/**
 * 安全用户白名单持有者类
 */
public class SecurityUserTrustListHolder {
	private static final List<String> userTrustList = new ArrayList<String>();

	public void setTrustList(ArrayList<String> trustList) {
		userTrustList.clear();
		for (String s : trustList) {
			userTrustList.add(s);
		}
	}

	public static Boolean isTrustUser(String user) {
		return userTrustList.contains(user);
	}
}
