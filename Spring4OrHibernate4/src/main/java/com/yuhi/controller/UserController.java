package com.yuhi.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.yuhi.entity.Users;
import com.yuhi.service.UserService;

@Controller
@RequestMapping("/user")
public class UserController {
	
	@Resource(name="userService")
	private UserService service;
	
	@RequestMapping(value="/gouserpage",method=RequestMethod.GET)
	public ModelAndView hello2(){
		ModelAndView mv = new ModelAndView();
		mv.addObject("message", "HelloMVC");
		mv.setViewName("users");
		return mv;
	}

	
	@RequestMapping(value="/count",method=RequestMethod.GET)
	public ModelAndView count(){
		
		int c = service.userCount();
		
		ModelAndView mv = new ModelAndView();
		mv.addObject("message", c);
		mv.setViewName("users");
		return mv;
	}
	
	@RequestMapping(value="/getAllUser",method=RequestMethod.GET)
	@ResponseBody
	public List<Users> getAllUser(){
		return service.getAllUser();
	}
	
	
}


