package com.lsl.action;

import com.lsl.biz.UsersBiz;
import com.lsl.entity.Users;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
/**
 * strust的action
 * @author 李森林
 *
 */
public class UsersAction extends ActionSupport implements ModelDriven{

	
	
	private static final long serialVersionUID = -7246281464828211814L;
	private Users u;
	private UsersBiz ub;
	

	public String save(){
		ub.saveUsers(u);
		System.out.println("整合环境成功");
		return SUCCESS;
	}
	
	
	/**
	 * 测试strus环境
	 * @return
	 */
	public String strutsTest(){
		System.out.println("成功");
		return SUCCESS;
	}
	
	
	public Object getModel() {
		if(u==null)u=new Users();
		return u;
	}


	public Users getU() {
		return u;
	}


	public void setU(Users u) {
		this.u = u;
	}


	public UsersBiz getUb() {
		return ub;
	}


	public void setUb(UsersBiz ub) {
		this.ub = ub;
	}

	
	
	
}
