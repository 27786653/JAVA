package com.lemon.jee.modules.common.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.annotation.SystemControllerLog;
import com.lemon.jee.modules.security.util.SessionUserDetailsUtil;

@Controller
public class IndexController {

	private static Logger log = LoggerFactory.getLogger(IndexController.class);

//	@Autowired
//	private SysUserService sysUserService;

	@RequestMapping(value = "/admin")
	@SystemControllerLog(description = "访问主页")  
	public String admin(HttpServletRequest request) {

		log.info("成功登陆系统 : " + SessionUserDetailsUtil.getLoginUserName());

//		String idata = sysUserService.getInitData(SessionUserDetailsUtil.getLoginUserName());
//
//		InitFileUtil.init(request, idata);

		return "admin";
	}
}
