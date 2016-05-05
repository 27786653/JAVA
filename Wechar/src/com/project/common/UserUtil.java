package com.project.common;


import javax.servlet.http.HttpSession;

import com.project.entitys.Users;

/**
 * 用户工具类
 *
 * @author HenryYan
 */
public class UserUtil {

    public static final String USER = "user";

    /**
     * 设置用户到session
     *
     * @param session
     * @param user
     */
    public static void saveUserToSession(HttpSession session, Users user) {
        session.setAttribute(USER, user);
    }

    /**
     * 从Session获取当前用户信息
     *
     * @param session
     * @return
     */
    public static Users getUserFromSession(HttpSession session) {
    	Users user=new Users();
    	user.setuId(0);
		//        Object attribute = session.getAttribute(USER);
//        return attribute == null ? null : (Users) attribute;
    	return user;
    }

}
