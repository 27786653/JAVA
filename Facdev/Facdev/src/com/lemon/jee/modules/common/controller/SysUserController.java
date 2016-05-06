package com.lemon.jee.modules.common.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.annotation.SystemControllerLog;
import com.lemon.jee.common.config.Config;
import com.lemon.jee.modules.common.service.SysUserService;
import com.lemon.jee.modules.common.viewutils.SysUserView;
import com.lemon.jee.modules.security.util.SessionUserDetailsUtil;

@Controller
public class SysUserController {

	@Autowired
	private SysUserService sysUserService;
	
	@Autowired
	private SessionRegistry sessionRegistry;
	
	
	@RequestMapping(value = "/user/repassword")
	@ResponseBody
	public Map<String, Object> repassword(String[] userIds) {

		return sysUserService.repassword(userIds);
	}
	
	@RequestMapping(value = "/user/changePwd")
	@ResponseBody
	public Map<String, Object> changePwd(String pwd) {

		return sysUserService.changePwd(pwd);
	}

	@RequestMapping(value = "/user/getPage")
	@ResponseBody
	public Map<String, Object> getPage(int page, int limit,String userAccount,String userName,String phoneNum) {
		return sysUserService.getPage(page, limit, userAccount, userName, phoneNum);
	}

	@RequestMapping(value = "/user/save")
	@ResponseBody
	public Map<String, Object> save(SysUserView sysUserView) {

		return sysUserService.save(sysUserView);
	}

	@RequestMapping(value = "/user/update")
	@ResponseBody
	public Map<String, Object> update(SysUserView sysUserView) {

		return sysUserService.update(sysUserView);
	}

	@RequestMapping(value = "/user/load")
	@ResponseBody
	public Map<String, Object> load(Long id) {

		return sysUserService.load(id);
	}

	@RequestMapping(value = "/user/delete")
	@ResponseBody
	public Map<String, Object> delete(String[] ids) {

		return sysUserService.delete(ids);
	}

	@RequestMapping(value = "/user/getPageByRoleId")
	@ResponseBody
	public Map<String, Object> getPageByRoleId(int page, int limit, Long roleId) {

		return sysUserService.getPageByRoleId(page, limit, roleId);
	}

	@RequestMapping(value = "/user/getPageByDepartmentId")
	@ResponseBody
	public Map<String, Object> getPageByDepartmentId(int page, int limit, Long departmentId) {

		return sysUserService.getPageByDepartmentId(page, limit, departmentId);
	}
	
	@RequestMapping(value = "/user/enable")
	@ResponseBody
	public Map<String, Object> enable(String[] userIds) {
		
		return sysUserService.enable(userIds);
	}
	
	@RequestMapping(value = "/user/enableHuman")
	@ResponseBody
	public Map<String, Object> enableHuman(String[] userIds) {
		
		return sysUserService.enableHuman(userIds);
	}
	
	@RequestMapping(value = "/user/disable")
	@ResponseBody
	public Map<String, Object> disable(String[] userIds) {
		
		return sysUserService.disable(userIds);
	}
	
	@RequestMapping(value = "/user/disableHuman")
	@ResponseBody
	public Map<String, Object> disableHuman(String[] userIds) {
		
		return sysUserService.disableHuman(userIds);
	}
	
	@RequestMapping(value = "/user/getUserName")
	@ResponseBody
	public Map<String, Object> getUserName() {
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("username", SessionUserDetailsUtil.getLoginUserName());
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}
	
	@RequestMapping(value = "/user/getOnline")
	@ResponseBody
	public Map<String, Object> getOnline() {
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("size", sessionRegistry.getAllPrincipals().size());
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}

}
