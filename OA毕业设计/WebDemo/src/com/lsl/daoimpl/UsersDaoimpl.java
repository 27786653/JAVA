package com.lsl.daoimpl;

import java.sql.SQLException;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.lsl.dao.UsersDao;
import com.lsl.entity.Employee;
import com.lsl.entity.Users;

public class UsersDaoimpl extends basicDaoImpl<Users> implements UsersDao {


	public Users dologin(final String uname, final String pwd) {
		return getHibernateTemplate().execute(new HibernateCallback() {

			public Object doInHibernate(Session s) throws HibernateException,
					SQLException {
				return s.createCriteria(Users.class)
						.add(Restrictions.eq("UName", uname))
						.add(Restrictions.eq("UPwd", pwd)).uniqueResult();
			}
		});
	}

}
