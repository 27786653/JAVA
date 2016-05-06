package com.lsl.bizimpl;

import java.util.List;

import com.lsl.biz.UsersBiz;
import com.lsl.dao.UsersDao;
import com.lsl.entity.Users;

public class UsersBizimpl  implements UsersBiz{
	
	private UsersDao ud;
	
	public Users getById(int id) {
		// TODO Auto-generatud method stub
		return ud.getById(id);
	}

	public List<Users> getList(int page,int rows) {
		// TODO Auto-generatud method stub
		return ud.getList( page,rows);
	}

	public void delete(Users t) {
		// TODO Auto-generatud method stub
		ud.delete(t);
	}

	public void update(Users t) {
		// TODO Auto-generatud method stub
		ud.update(t);
	}

	public void add(Users t) {
		// TODO Auto-generatud method stub
		ud.add(t);
	}

	public int count(String id) {
		// TODO Auto-generatud method stub
		return ud.count(id);
	}

	public UsersDao getUd() {
		return ud;
	}

	public void setUd(UsersDao ud) {
		this.ud = ud;
	}

	public Users dologin(String uname, String pwd) {
		// TODO Auto-generated method stub
		return ud.dologin(uname, pwd);
	}



	

}
