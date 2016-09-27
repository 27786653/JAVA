package com.yuhi.service;

import java.util.List;

import javax.annotation.Resource;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.yuhi.dao.UsersDAO;
import com.yuhi.entity.Users;

@Service("userService")
public class UserService {
	@Resource
	private UsersDAO userDao;
	
	@Transactional
	public int userCount(){
		return userDao.getAllUser().size();
	}
	
	public List<Users> getAllUser(){
		return userDao.getAllUser();
	}
	public UsersDAO getUserDao() {
		return userDao;
	}

	public void setUserDao(UsersDAO userDao) {
		this.userDao = userDao;
	}

}
