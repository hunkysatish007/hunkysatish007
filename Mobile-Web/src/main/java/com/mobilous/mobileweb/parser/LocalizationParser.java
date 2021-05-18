package com.mobilous.mobileweb.parser;

import java.io.File;
import java.io.InputStream;

import org.json.simple.JSONObject;

import com.dd.plist.NSDictionary;
import com.dd.plist.PropertyListParser;

public class LocalizationParser {

	public static JSONObject parseLocalizationFile(Object file)
			throws Exception {
		JSONObject localization = new JSONObject();
		
		NSDictionary dic = null;
		
		if(file instanceof InputStream)
			dic = (NSDictionary) PropertyListParser.parse((InputStream)file);
		else
			dic = (NSDictionary) PropertyListParser.parse((File)file);
		
		for (String key : dic.allKeys()) {
			localization.put(key, dic.objectForKey(key).toString());
		}
		return localization;
	}
}
