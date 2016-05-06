package com.lemon.jee.modules.common.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lemon.jee.modules.common.service.DepartmentService;

@Controller
public class DepartmentController {
	
	@Autowired
	private DepartmentService departmentService;
	
	@RequestMapping(value = "/department/getPage")
	@ResponseBody
	public Map<String, Object> getPage(int page, int limit,String departmentName) {
		return departmentService.getPage(page, limit, departmentName);
	}
}
