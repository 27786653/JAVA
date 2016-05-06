package com.lsl.daoimpl;

import java.sql.SQLException;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.lsl.dao.EmployeeDao;
import com.lsl.entity.Employee;

@SuppressWarnings("unchecked")
public class EmployeeDaoimpl extends basicDaoImpl<Employee> implements
		EmployeeDao {
	/**
	 * 登录
	 */
	public Employee dologin(final String ECode, final String pwd) {
		// TODO Auto-generated method stub
		return getHibernateTemplate().execute(new HibernateCallback() {

			public Object doInHibernate(Session s) throws HibernateException,
					SQLException {
				return s.createCriteria(Employee.class)
						.add(Restrictions.eq("ECode", ECode))
						.add(Restrictions.eq("EPwd", pwd)).uniqueResult();
			}
		});
	}

}
