package com.lemon.jee.modules.common.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lemon.jee.modules.common.service.SysButtonService;
import com.lemon.jee.modules.common.viewutils.SysButtonView;

@Controller
public class SysButtonController {

	@Autowired
	private SysButtonService sysButtonService;

	@RequestMapping(value = "/button/getToolbar")
	@ResponseBody
	public Map<String, Object> getToolbar(
			@RequestParam(required = false) Long menuId) {

		return sysButtonService.getToolbar(menuId);
	}

	// @RequestMapping(value = "/button/getToolbarTest")
	// @ResponseBody
	// public Map<String, Object> getToolbarTest() {
	//
	// return sysButtonService.getToolbar();
	// }

	@RequestMapping(value = "/button/getPage")
	@ResponseBody
	public Map<String, Object> getPage(int page, int limit) {

		return sysButtonService.getPage(page, limit);
	}

	@RequestMapping(value = "/button/getPageByMenuId", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> getPageByMenuId(int page, int limit,
			Long roleId, Long menuId) {

		return sysButtonService.getPageByMenuId(page, limit, roleId, menuId);
	}

	/**
	 * lzd 保存排序按钮
	 * 
	 * @param page
	 * @param limit
	 * @param menuId
	 * @return
	 */
	@RequestMapping(value = "/button/getPageByMenuId", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> getPageByMenuId(Long roleId, Long menuId,
			@RequestBody String json) {

		System.out.println("SysButtonController.saveBtnSortCode()");
		System.out.println("json " + json);

		return sysButtonService.saveBySyncBtnSortCode(roleId, menuId, json);
	}

	@RequestMapping(value = "/button/getListByMenuId")
	@ResponseBody
	public List<SysButtonView> getListByMenuId(Long id) {

		return sysButtonService.getListByMenuId(id);
	}

	@RequestMapping(value = "/button/getListByRoleIdAndMenuId")
	@ResponseBody
	public List<SysButtonView> getListByRoleIdAndMenuId(Long roleId, Long menuId) {

		return sysButtonService.getListByRoleIdAndMenuId(roleId, menuId);
	}

	@RequestMapping(value = "/button/save")
	@ResponseBody
	public Map<String, Object> save(String text, String iconCls,
			SysButtonView sysButtonView) {

		sysButtonView.setName(text);
		sysButtonView.setImg(iconCls);

		return sysButtonService.save(sysButtonView);
	}

	@RequestMapping(value = "/button/update")
	@ResponseBody
	public Map<String, Object> update(String text, String iconCls,
			SysButtonView sysButtonView) {

		sysButtonView.setName(text);
		sysButtonView.setImg(iconCls);

		return sysButtonService.update(sysButtonView);
	}

	@RequestMapping(value = "/button/load")
	@ResponseBody
	public Map<String, Object> load(Long id) {

		return sysButtonService.load(id);
	}

	@RequestMapping(value = "/button/delete")
	@ResponseBody
	public Map<String, Object> delete(String[] ids) {

		return sysButtonService.delete(ids);
	}

	@RequestMapping(value = "/button/test")
	@ResponseBody
	public Map<String, Object> test(String id) {

		return sysButtonService.test(id);
	}

}
