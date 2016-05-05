package com.project.common;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateFormat {

	public static String getDateFormat(Date date){
		
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
		return sdf.format(date);
		
		
	}
	
	
}
