package com.lsl.daoimpl;

import java.lang.reflect.ParameterizedType;
import java.sql.SQLException;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.criterion.Projection;
import org.hibernate.criterion.Projections;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.lsl.dao.basicDao;


@SuppressWarnings("unchecked")
public class basicDaoImpl<T> extends HibernateDaoSupport  implements basicDao<T>{

	protected Class clazz;
	
	public basicDaoImpl(){
		clazz=(Class) ((ParameterizedType)this.getClass().getGenericSuperclass()).getActualTypeArguments()[0];
	}
	
	public T getById(int id) {
		return (T) getHibernateTemplate().get(clazz, id);
	}

	public List<T> getList(final int page,final int rows) {
		if(rows==0){
			return getHibernateTemplate().executeFind(new HibernateCallback() {
				public Object doInHibernate(Session arg0)
						throws HibernateException, SQLException {
					return arg0.createCriteria(clazz).list();
				}
			});
		}
		return getHibernateTemplate().executeFind(new HibernateCallback() {
			public Object doInHibernate(Session arg0)
					throws HibernateException, SQLException {
				return arg0.createCriteria(clazz).setFirstResult((page-1)*rows).list();
			}
		});
	}

	public void delete(T t) {
		 getHibernateTemplate().delete(t);
	}

	public void update(T t) {
		getHibernateTemplate().update(t);
	}

	public void add(T t) {
		getHibernateTemplate().save(t);
	}



	public int count(final String id) {
		return getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session s)
					throws HibernateException, SQLException {
				return s.createCriteria(clazz).setProjection(Projections.count(id)).uniqueResult();
			}
		});
	}



	

}
