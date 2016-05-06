package com.lsl.daoimpl;

import java.sql.SQLException;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.lsl.dao.EmployeeDao;
import com.lsl.dao.FileDetileDao;
import com.lsl.dao.LeaveDao;
import com.lsl.entity.Employee;
import com.lsl.entity.FileDetile;
import com.lsl.entity.Leave;

@SuppressWarnings("unchecked")
public class FileDetileDaoimpl extends basicDaoImpl<FileDetile> implements
FileDetileDao {

	public List<FileDetile> getTrList() {
		return getHibernateTemplate().executeFind(new HibernateCallback() {
			public Object doInHibernate(Session s)
					throws HibernateException, SQLException {
				return s.createCriteria(clazz).add(Restrictions.eq("FIsDelete", 1)).list();
			}
		});
	}

	public List<FileDetile> getshow(final int id) {
		return getHibernateTemplate().executeFind(new HibernateCallback() {
			public Object doInHibernate(Session s)
					throws HibernateException, SQLException {
				 Criteria c = s.createCriteria(clazz).add(Restrictions.eq("FIsDelete", 0)).add(Restrictions.eq("fdParend", id));
				return c.list();
			}
		});
	}

}
