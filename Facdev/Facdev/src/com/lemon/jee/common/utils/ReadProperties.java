package com.lemon.jee.common.utils;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class ReadProperties {

	public Properties readProp(String propertiefile) {
		 InputStream inputStream = this.getClass().getClassLoader().getResourceAsStream(propertiefile);   
		  Properties prop = new Properties();
		  try {   
			  prop.load(inputStream);   
		  } catch (IOException e) {
			  System.out.println("读取"+propertiefile+"配置文件出错");
		   e.printStackTrace(); 
		   return null;
		  }
		return prop;
	}
}
