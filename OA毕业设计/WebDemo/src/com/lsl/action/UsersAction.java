package com.lsl.action;

import java.util.HashMap;
import java.util.HashSet;

import com.lsl.entity.Employee;
import com.lsl.entity.Users;

public class UsersAction extends BasicAction<Users>{


	private static final long serialVersionUID = 2454465116366209448L;

	public String dologin(){
		models=ub.dologin(models.getUName(), models.getUPwd());
		models.setAnnouncements(new HashSet(ab.getList(0, 0)));   //得到全部通告
		sessionMap.put("user",models);
		if(models==null)return LOGIN;
		return SUCCESS;
		
	}
	
	public String regist(){
			models.setUState(0);
			ub.add(models);
			sessionMap.put("user",models);
			return SUCCESS;
	}

	public String loginout() {
		sessionMap.remove("user");
		return LOGIN;
	}
	
	
	
	
	
	
}
