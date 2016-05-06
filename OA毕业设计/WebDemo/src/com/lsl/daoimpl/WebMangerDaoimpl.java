package com.lsl.daoimpl;

import java.sql.SQLException;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.lsl.dao.EmployeeDao;
import com.lsl.dao.LeaveDao;
import com.lsl.dao.WebMangerDao;
import com.lsl.entity.Employee;
import com.lsl.entity.Leave;
import com.lsl.entity.WebManger;

@SuppressWarnings("unchecked")
public class WebMangerDaoimpl extends basicDaoImpl<WebManger> implements
WebMangerDao {


}
