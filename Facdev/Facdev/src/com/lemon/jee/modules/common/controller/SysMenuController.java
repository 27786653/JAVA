package com.lemon.jee.modules.common.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lemon.jee.modules.common.service.SysMenuService;
import com.lemon.jee.modules.common.viewutils.SysMenuView;

@Controller
public class SysMenuController {

	@Autowired
	private SysMenuService sysMenuService;

	@RequestMapping(value = "/menu/getLeftMenus")
	@ResponseBody
	public Map<String, Object> getLeftMenus() {

		return sysMenuService.getLeftMenus();
	}

	@RequestMapping(value = "/menu/getList")
	@ResponseBody
	public Map<String, Object> getList() {

		return sysMenuService.getList();
	}

	@RequestMapping(value = "/menu/save")
	@ResponseBody
	public Map<String, Object> save(String text, String iconCls, SysMenuView sysMenuView) {

		sysMenuView.setName(text);
		sysMenuView.setImg(iconCls);

		return sysMenuService.save(sysMenuView);
	}

	@RequestMapping(value = "/menu/update")
	@ResponseBody
	public Map<String, Object> update(String text, String iconCls, SysMenuView sysMenuView) {

		sysMenuView.setName(text);
		sysMenuView.setImg(iconCls);

		return sysMenuService.update(sysMenuView);
	}

	@RequestMapping(value = "/menu/load")
	@ResponseBody
	public Map<String, Object> load(Long id) {

		return sysMenuService.load(id);
	}

	@RequestMapping(value = "/menu/delete")
	@ResponseBody
	public Map<String, Object> delete(String[] ids) {

		return sysMenuService.delete(ids);
	}

	@RequestMapping(value = "/menu/saveMenuBotton")
	@ResponseBody
	public Map<String, Object> saveMenuBotton(String[] ids, Long menuId) {

		return sysMenuService.saveMenuBotton(ids, menuId);
	}
	
	@RequestMapping(value = "/menu/getListByRoleId")
	@ResponseBody
	public Map<String, Object> getListByRoleId(Long roleId) {

		return sysMenuService.getListByRoleId(roleId);
	}
	
	@RequestMapping(value = "/menu/getAllByRoleId")
	@ResponseBody
	public Map<String, Object> getAllByRoleId(Long roleId, Long menuId, Long[] buttonIds) {

		return sysMenuService.getAllByRoleId(roleId);
	}

}
