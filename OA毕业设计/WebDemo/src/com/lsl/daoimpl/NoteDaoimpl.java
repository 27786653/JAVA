package com.lsl.daoimpl;

import java.sql.SQLException;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.lsl.dao.EmployeeDao;
import com.lsl.dao.NoteDao;
import com.lsl.entity.Employee;
import com.lsl.entity.Note;

@SuppressWarnings("unchecked")
public class NoteDaoimpl extends basicDaoImpl<Note> implements
NoteDao {
	

}
