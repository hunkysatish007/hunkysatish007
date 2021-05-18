package com.mobilous.mobileweb.parser;

import java.io.File;
import java.io.InputStream;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import com.dd.plist.NSArray;
import com.dd.plist.NSDictionary;
import com.dd.plist.NSNumber;
import com.dd.plist.NSObject;
import com.dd.plist.PropertyListParser;

public class TriggerParser {
	public static JSONArray parseTrigger(Object file)
			throws Exception {
		JSONObject trigger;
		JSONArray triggerArray = new JSONArray();
		NSDictionary dic = null;

		if(file instanceof InputStream)
			dic = (NSDictionary) PropertyListParser.parse((InputStream)file);
		else
			dic = (NSDictionary) PropertyListParser.parse((File)file);

		for(NSObject obj : ((NSArray)dic.objectForKey("TableDefs")).getArray()){
			NSDictionary tableDic = (NSDictionary)obj;
			tableDic.allKeys();
			//tableDic.allKeys().length();
			if(((NSNumber)tableDic.objectForKey("trigger")).boolValue()){
				//NSDictionary triggerDic = (NSDictionary)((NSObject)((NSArray)dic.objectForKey("TableDefs")));
				trigger = new JSONObject();
				trigger.put("script", tableDic.objectForKey("script").toString());
				triggerArray.add(trigger);
				trigger = null;
			}
			
		}
		return triggerArray;
	}
}
