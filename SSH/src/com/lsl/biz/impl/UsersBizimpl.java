package com.lsl.biz.impl;

import com.lsl.biz.UsersBiz;
import com.lsl.dao.UsersDao;
import com.lsl.entity.Users;

public class UsersBizimpl implements UsersBiz{

	private UsersDao ud;
	
	public void saveUsers(Users u) {
			ud.saveUsers(u);
	}

	public UsersDao getUd() {
		return ud;
	}

	public void setUd(UsersDao ud) {
		this.ud = ud;
	}

	
	
}
