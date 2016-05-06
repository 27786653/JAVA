package com.lemon.jee.modules.common.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lemon.jee.modules.common.service.SysItemsService;
import com.lemon.jee.modules.common.viewutils.SysItemsView;

@Controller
public class SysItemsController {

	@Autowired
	private SysItemsService sysItemsService;
	
	@RequestMapping(value = "/items/getList")
	@ResponseBody
	public Map<String, Object> getList() {

		return sysItemsService.getList();
	}
	
	@RequestMapping(value = "/items/save")
	@ResponseBody
	public Map<String, Object> save(SysItemsView sysItemsView) {

		return sysItemsService.save(sysItemsView);
	}

	@RequestMapping(value = "/items/update")
	@ResponseBody
	public Map<String, Object> update(SysItemsView sysItemsView) {

		return sysItemsService.update(sysItemsView);
	}

	@RequestMapping(value = "/items/load")
	@ResponseBody
	public Map<String, Object> load(Long id) {

		return sysItemsService.load(id);
	}

	@RequestMapping(value = "/items/delete")
	@ResponseBody
	public Map<String, Object> delete(String[] ids) {

		return sysItemsService.delete(ids);
	}
}
