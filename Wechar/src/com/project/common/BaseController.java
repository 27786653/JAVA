package com.project.common;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.project.common.data.jsonData;
@Controller
public class BaseController {
	
	
	
	@RequestMapping("/execute")
	private String execute(String path){
		return path;
	}
	
}
