package com.project.controller.CommunityController;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.portlet.ModelAndView;

@Controller
public class CommunityController {

	
	
	@RequestMapping("/getCommunity")
	public String getCommunity(){
		//TODO
		return  "Community/Communitymanagement";
	}
	
}
