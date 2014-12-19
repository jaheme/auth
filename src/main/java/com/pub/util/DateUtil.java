package com.pub.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtil {
	
	private static SimpleDateFormat sdf = new SimpleDateFormat();
	
	/**
	 * 自定义时间格式
	 * @param pattern 如:yyyy-MM-dd HH:mm:ss
	 * @return String
	 */
	public static String getDate(String pattern){
		if(pattern == null)
			sdf.applyPattern("yyyy-MM-dd HH:mm:ss");
		else
			sdf.applyPattern(pattern);
		
		return sdf.format(new Date());
	}
	

	public static String parseDate(String date, String pattern){
		sdf.applyPattern(pattern);
		try {
			return sdf.format( sdf.parse(date) );
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	
	public static String yyyyMMdd(){
		sdf.applyPattern("yyyyMMdd");
		return sdf.format(new Date());
	}
	
	public static String yyyyMMddHHmmss(){
		sdf.applyPattern("yyyyMMddHHmmss");
		return sdf.format(new Date());
	}

}
