package com.lemon.jee.common.utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Properties;

public class DBConnectionManager {
	
	private static String driverName = "";
	private static String user = "";
	private static String password = "";
	private static String url="";
	
	static {
		ReadProperties properties=new ReadProperties();
		Properties prop=properties.readProp("application.properties");
		if (prop!=null) {
			driverName=prop.getProperty("sqljdbc.driver");
			url=prop.getProperty("sqljdbc.url");
			user=prop.getProperty("sqljdbc.username");
			password=prop.getProperty("sqljdbc.password");
		}else {
			System.out.println("读取application.properties配置文件出错");
		}
	}
	
	// SQLServer
	// 加载驱动程序
	
	private static String message = "恭喜，数据库连接正常！";

	public void setDriverName(String newDriverName) {
		driverName = newDriverName;
	}

	public String getDriverName() {
		return driverName;
	}

	public void setUrl(String newUrl) {
		url = newUrl;
	}

	public String getUrl() {
		return url;
	}

	public void setUser(String newUser) {
		user = newUser;
	}

	public String getUser() {
		return user;
	}

	public void setPassword(String newPassword) {
		password = newPassword;
	}

	public String getPassword() {
		return password;
	}

	public Connection getConnection() {
		try {
			Class.forName(driverName);
			return DriverManager.getConnection(url, user, password);
		} catch (Exception e) {
			e.printStackTrace();
			message = "数据库连接失败！";
			return null;
		}
	}

	public static void main(String[] args) {
		try {
			DBConnectionManager dcm = new DBConnectionManager();
			Connection conn = dcm.getConnection();
			System.out.println(message);
			Statement sql = conn.createStatement();
			ResultSet rs = sql.executeQuery("select * from dbo.PubColor");
			while (rs.next()) {
				System.out.println("ID : " + rs.getString(2));
			}
			conn.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}