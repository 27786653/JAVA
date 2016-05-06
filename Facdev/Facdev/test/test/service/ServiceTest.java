package test.service;

import java.beans.BeanInfo;
import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;
import java.util.HashMap;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.lemon.jee.common.utils.DBConnectionManager;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "/spring-context-core.xml", "/spring-context-security.xml" })
public class ServiceTest extends AbstractJUnit4SpringContextTests {

	// @Autowired
	// private DeleteDataService deleteDataService;

	// @Autowired
	// private SysButtonService testService;
	
	private static DBConnectionManager dcm = new DBConnectionManager();
	
//	 @Autowired
//	 private ExcelService excelService;
//
//	@Test
//	public void test() {
//		// testService.getDeath(
//		// 2496);
//		
//		System.out.println(excelService.getQueryOrderNo("01"));
//
//	}
}