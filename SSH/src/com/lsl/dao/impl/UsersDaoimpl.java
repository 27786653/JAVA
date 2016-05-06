package com.lsl.dao.impl;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.lsl.dao.UsersDao;
import com.lsl.entity.Users;

/**
 * ʹ��springΪhibernate�ṩ�İ����� HibernateDaoSupport
 * ��Ҫע��sessionfactory
 * @author ��ɭ��
 *点点滴滴 
 */
public class UsersDaoimpl extends HibernateDaoSupport implements UsersDao {

	public static List GetData(Class obj,String bijiao,Map<String,String> strMap,Session  session){
		 String sqlStr="from "+obj.getSimpleName();
		if(strMap!=null&&strMap.size()>0){
			sqlStr+=" where ";
			for (String str : strMap.keySet()) {
				sqlStr+=str+" "+bijiao+"  "+strMap.get(str);
			}
		}
		return session.createQuery(sqlStr).list();
	}
	
	public void saveUsers(Users u) {
			getHibernateTemplate().save(u);
			
			
	}

}
