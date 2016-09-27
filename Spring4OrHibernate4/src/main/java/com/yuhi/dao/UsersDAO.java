package com.yuhi.dao;

import java.util.List;

import javax.annotation.Resource;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;

import com.yuhi.entity.Users;

@Repository
public class UsersDAO {
	@Resource(name="sessionFactory")
	private SessionFactory sessionFactory;

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public List<Users> getAllUser(){
		String hsql="from users";
		Session session = sessionFactory.getCurrentSession();
		Query query = session.createQuery(hsql);
		
		return query.list();
	}
}
