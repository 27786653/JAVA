package com.lemon.jee.modules.common.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lemon.jee.modules.common.service.SysRoleService;
import com.lemon.jee.modules.common.viewutils.SysRoleView;

@Controller
public class SysRoleController {

	@Autowired
	private SysRoleService sysRoleService;

	@RequestMapping(value = "/role/getPage")
	@ResponseBody
	public Map<String, Object> getPage(int page, int limit) {

		return sysRoleService.getPage(page, limit);
	}

	@RequestMapping(value = "/role/save")
	@ResponseBody
	public Map<String, Object> save(SysRoleView sysRoleView) {

		return sysRoleService.save(sysRoleView);
	}

	@RequestMapping(value = "/role/update")
	@ResponseBody
	public Map<String, Object> update(SysRoleView sysRoleView) {

		return sysRoleService.update(sysRoleView);
	}

	@RequestMapping(value = "/role/load")
	@ResponseBody
	public Map<String, Object> load(Long id) {

		return sysRoleService.load(id);
	}

	@RequestMapping(value = "/role/delete")
	@ResponseBody
	public Map<String, Object> delete(String[] ids) {

		return sysRoleService.delete(ids);
	}

	@RequestMapping(value = "/role/getList")
	@ResponseBody
	public Map<String, Object> getList() {

		return sysRoleService.getList();
	}

	@RequestMapping(value = "/role/saveRoleMember")
	@ResponseBody
	public Map<String, Object> saveRoleMember(Long roleId, Long[] userIds) {

		return sysRoleService.saveRoleMember(roleId, userIds);
	}

	@RequestMapping(value = "/role/deleteRoleMember")
	@ResponseBody
	public Map<String, Object> deleteRoleMember(Long roleId, Long[] userIds) {

		return sysRoleService.deleteRoleMember(roleId, userIds);
	}

	@RequestMapping(value = "/role/saveRoleMenu")
	@ResponseBody
	public Map<String, Object> saveRoleMenu(Long roleId, Long[] menuIds) {

		return sysRoleService.saveRoleMenu(roleId, menuIds);
	}

	@RequestMapping(value = "/role/saveRoleMenuButton")
	@ResponseBody
	public Map<String, Object> saveRoleMenuButton(Long roleId, Long menuId, Long[] buttonIds) {

		return sysRoleService.saveRoleMenuButton(roleId, menuId, buttonIds);
	}

}
