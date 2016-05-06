package com.lsl.test;

import java.util.Date;

import javax.annotation.Resource;

import org.hibernate.Session;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.lsl.biz.UsersBiz;
import com.lsl.entity.Users;
import com.lsl.util.HibernateSessionFactory;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations="classpath:applicationContext*.xml")
public class test {

		/*
		 * 测试Spring框架IOC
		 * @Resource
		private   Date d;
		
		@Test
		public void SpringTest(){
			System.out.println(d);
		}
		 */
		
	
	/*	
	 * 测试hibernate环境
	 * @Test
		public void HIbernateTest(){
			Session s=HibernateSessionFactory.getSession();
			s.beginTransaction().begin();
			s.save(new Users("名字","123"));
			
			s.beginTransaction().commit();
		}
		*/
	
		/*	
		 * 配置hibernate与spring的整合
		 * @Resource
			private UsersBiz ub;
			
			@Test
			public void hibernateOrSpring(){
				ub.saveUsers(new Users("名字2","023"));
			}
		*/
	
	
	
	
}
