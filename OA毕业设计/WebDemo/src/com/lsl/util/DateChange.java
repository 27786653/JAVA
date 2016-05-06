package com.lsl.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

public class DateChange {

public static void main(String[] args) {
        Configuration cfg=new Configuration().configure();//读取配置文件
        
        
        /**
         *  ,使用带有参数的buildSessionFactory（）获取sessionFactory对象
         */
     
        SessionFactory factory=cfg.buildSessionFactory();
        
        /**老版本获取sessionFactory对象，buildSessionFactory()
        SessionFactory factory=cfg.buildSessionFactory();
        */
        Session session=factory.openSession();
        
        
        Transaction tx=session.getTransaction();
        tx.begin();
        
     //   Student student=new Student();
//        student.setAge(20);
//        student.setName("艾广然 ");
//        student.setSex("男");
//        session.save(student);
//        tx.commit();
        
        session.close();
        

	
}
	/**
	 * 计算时间差
	 * @param smdate   计算的日期
	 * @param bdate     当前日期
	 * @return
	 */
	 public static int daysBetween(Date smdate,Date bdate)    
	    {    
		 long between_days=0;
	        try {
				SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");  
				smdate=sdf.parse(sdf.format(smdate));  
				bdate=sdf.parse(sdf.format(bdate));  
				Calendar cal = Calendar.getInstance();    
				cal.setTime(smdate);    
				long time1 = cal.getTimeInMillis();                 
				cal.setTime(bdate);    
				long time2 = cal.getTimeInMillis();         
				 between_days=(time2-time1)/(1000*3600*24);  
			} catch (NumberFormatException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}      
	        return Integer.parseInt(String.valueOf(between_days));
	    }  
	
}
