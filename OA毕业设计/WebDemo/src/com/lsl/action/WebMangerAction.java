package com.lsl.action;

import java.util.HashSet;

import com.lsl.entity.Employee;
import com.lsl.entity.Users;
import com.lsl.entity.WebManger;

public class WebMangerAction extends BasicAction<WebManger>{

	public String addWeb(){
		Users u=(Users) sessionMap.get("user");
		models.setUsers(u);
		wmb.add(models);
		refalsh();
		return SUCCESS;
	}
	public String deleteWeb(){
		models=wmb.getById(models.getWId());
		wmb.delete(models);
		refalsh();
		return SUCCESS;
	}
	
	protected void refalsh(){
		Users u=(Users) sessionMap.get("user");
		u.setWebMangers(new HashSet(wmb.getList(0, 0)));
	}
	
	
}
