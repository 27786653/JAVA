package com.lemon.jee.modules.common.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lemon.jee.modules.common.service.ExpertService;

@Controller
public class ExpertController {

	@Autowired
	private ExpertService expertService;

	@RequestMapping(value = "/expert/getPage")
	@ResponseBody
	public Map<String, Object> getPage(int page, int limit, String title, String name, Integer isChecked) {
		return expertService.getPage(page, limit, title, name, isChecked);
	}

	@RequestMapping(value = "/expert/save")
	@ResponseBody
	public Map<String, Object> save(String name, Integer gender, String organization, String zjzy, String major,
			String title, String cardNumber, String tel, String email, String remark, int isChecked) {
		System.out.println("save:" + name + gender + organization + zjzy + major + title + cardNumber + tel + email
				+ remark + isChecked);
		return expertService.save(name, gender, organization, zjzy, major, title, cardNumber, tel, email, remark,
				isChecked);
	}

	@RequestMapping(value = "/expert/load")
	@ResponseBody
	public Map<String, Object> load(Long id) {
		System.out.println("load:" + id);
		return expertService.load(id);
	}

	@RequestMapping(value = "/expert/update")
	@ResponseBody
	public Map<String, Object> update(Long id, String name, Integer gender, String organization, String zjzy,
			String major, String title, String cardNumber, String tel, String email, String remark, int isChecked) {
		System.out.println("save:" + id + name + gender + organization + zjzy + major + title + cardNumber + tel + email
				+ remark + isChecked);
		return expertService.update(id, name, gender, organization, zjzy, major, title, cardNumber, tel, email, remark,
				isChecked);
	}

	@RequestMapping(value = "/expert/delete")
	@ResponseBody
	public Map<String, Object> delete(String[] ids) {

		return expertService.delete(ids);
	}
}
