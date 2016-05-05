package com.project.controller.userinfo;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.google.gson.Gson;
import com.project.common.data.jsonData;
import com.project.dao.UsersMapper;
import com.project.entitys.Users;



@Controller
public class UserController {

	@Resource
	UsersMapper usersMapper;
	
	@RequestMapping("/dologin")
	@ResponseBody
	public jsonData dologin(Users user){
		System.out.println("dologin");
		jsonData jsondata = jsonData.getjsondata("登录成功,进入会员中心", "y", "3000", "getCommunity.action", null);
//		JSON.toJSONString(jsondata);
		return jsondata;
	}
	
	
	
	
	
}
