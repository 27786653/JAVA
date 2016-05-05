package com.project.controller.userinfo;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.google.gson.Gson;
import com.project.common.BaseController;
import com.project.common.data.jsonData;
import com.project.dao.UsersMapper;
import com.project.entitys.Users;
import com.project.entitys.UsersExample;


@Controller
public class UserController {

	@Resource
	UsersMapper usersMapper;
	private String gotopage;
	private String info;
	private jsonData jsondata;
	
	
	@RequestMapping("/dologin")
	@ResponseBody
	public jsonData dologin(Users user){
		System.out.println("dologin");
		UsersExample usersExample=new UsersExample();
		usersExample.createCriteria().andUNameEqualTo(user.getuName());
		List<Users> userlist = usersMapper.selectByExample(usersExample);
		if(userlist!=null&&userlist.size()>0){
			if(userlist.get(0).getuPwd().equals(user.getuPwd())){
				gotopage="execute.action?path=Community/Communitymanagement";
				info="登录成功,进入会员中心";
			}else{
				info="密码错误,请输入新密码";
			}
		}else{
			info="账户不存在,请先注册！";
		}
		 jsondata = jsonData.getjsondata(info, "y", "3000", gotopage, null);   //这个方法就是得到一个对象
		return jsondata;
	}
	
	
	@RequestMapping("/regist")
	public jsonData regist(Users user){
		jsondata = jsonData.getjsondata(info, "y", "3000", gotopage, null);
			return jsondata;
	}
	
	
	
}
