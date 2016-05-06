package com.lemon.jee.modules.common.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lemon.jee.modules.common.service.SysOrganizationService;
import com.lemon.jee.modules.common.viewutils.SysOrganizationView;

@Controller
public class SysOrganizationController {

	@Autowired
	private SysOrganizationService sysOrganizationService;

	@RequestMapping(value = "/organization/getList")
	@ResponseBody
	public Map<String, Object> getList() {

		return sysOrganizationService.getList();
	}

	@RequestMapping(value = "/organization/save")
	@ResponseBody
	public Map<String, Object> save(SysOrganizationView sysOrganizationView) {

		return sysOrganizationService.save(sysOrganizationView);
	}

	@RequestMapping(value = "/organization/update")
	@ResponseBody
	public Map<String, Object> update(SysOrganizationView sysOrganizationView) {

		return sysOrganizationService.update(sysOrganizationView);
	}

	@RequestMapping(value = "/organization/load")
	@ResponseBody
	public Map<String, Object> load(Long id) {

		return sysOrganizationService.load(id);
	}

	@RequestMapping(value = "/organization/delete")
	@ResponseBody
	public Map<String, Object> delete(String[] ids) {

		return sysOrganizationService.delete(ids);
	}

}
