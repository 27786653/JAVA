package com.lemon.jee.modules.common.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lemon.jee.modules.common.service.TeamService;

@Controller
public class TeamController {

	@Autowired
	private TeamService teamService;

	@RequestMapping(value = "/team/getPage")
	@ResponseBody
	public Map<String, Object> getPage(int page, int limit, String name) {
		return teamService.getPage(page, limit, name);
	}

	@RequestMapping(value = "/team/save")
	@ResponseBody
	public Map<String, Object> save(String name, String position, String job, String type, String title,
			String organization, String tel, String email, String remark) {
		System.out.println("save:" + name + position + job + type + organization + title + tel + email + remark);
		return teamService.save(name, position, job, type, organization, title, tel, email, remark);
	}

	@RequestMapping(value = "/team/load")
	@ResponseBody
	public Map<String, Object> load(Long id) {
		System.out.println("load:" + id);
		return teamService.load(id);
	}

	@RequestMapping(value = "/team/update")
	@ResponseBody
	public Map<String, Object> update(Long id, String name, String position, String job, String type, String title,
			String organization, String tel, String email, String remark) {
		System.out.println("save:" + id + name + position + job + type + title + organization + tel + email + remark);
		return teamService.update(id, name, position, job, type, organization, title, tel, email, remark);
	}

	@RequestMapping(value = "/team/delete")
	@ResponseBody
	public Map<String, Object> delete(String[] ids) {
		return teamService.delete(ids);
	}
}
