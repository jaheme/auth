package com.pub.util;

import java.io.IOException;
import java.util.Map;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;


@SuppressWarnings("unchecked")
public class JsonUtil {
	
	private static ObjectMapper mapper = new ObjectMapper();
	
	public static Map<String, String> toMap(String s){
		try {
			return  mapper.readValue(s, Map.class);
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

}
