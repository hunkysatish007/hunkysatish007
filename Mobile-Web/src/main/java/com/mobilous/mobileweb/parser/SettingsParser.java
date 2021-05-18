package com.mobilous.mobileweb.parser;

import java.io.File;

import com.dd.plist.NSDictionary;
import com.dd.plist.PropertyListParser;
import com.mobilous.mobileweb.util.Settings;

public class SettingsParser {

	public static Settings parseSettings(String type, String val1, String val2,
			String servlet, String path) {
		File file = new File(servlet + path);
		//File file = new File("/usr/glassfish/glassfish/domains/domain1/eclipseApps/mobileweb3.1.0/resources/config/config.plist");

		NSDictionary dic = null;
		String key1="";
		String key2="";
		String key3="";
		String key4="";
		if(type.equalsIgnoreCase("production")){
			key1 = "[userID]";
			key2 = "[projectID]";
		}else if(type.equalsIgnoreCase("preview")){
			key1 = "[userID]";
			key2 = "[projectID]";
		}else{
			key1 = "[releaseName]";
			key2 = "[releaseVersion]";
			key3 = "[userID]";
			key4 = "[projectID]";
		}
		
		try {
			dic = (NSDictionary) PropertyListParser.parse(file);
		} catch (Exception e) {
			file = new File("/usr/glassfish/glassfish/domains/domain1/eclipseApps/mobileweb3.1.1/resources/config/config.plist");
			try {
				dic = (NSDictionary) PropertyListParser.parse(file);
			} catch (Exception e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		}

		Settings config = new Settings();
		config.setServletPath(servlet);
		config.setType(type);
		if(type.equalsIgnoreCase("release") ){
			config.setKey1(val2.substring(0, val2.lastIndexOf("-")));
			config.setKey2(val2.substring(val2.lastIndexOf("-")+1, val2.length()));
			config.setKey3(val1.substring(0, val1.lastIndexOf(",")));
			config.setKey2(val1.substring(val1.lastIndexOf(",")+1, val1.length()));
			val1 = val2.substring(0, val2.lastIndexOf("-"));
			val2 = val2.substring(val2.lastIndexOf("-")+1, val2.length());
		}else{
			config.setKey1(val1);
			config.setKey2(val2);
		}
		
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("output_dir")){
				if(config.getType().equalsIgnoreCase("release")){
					String createRelesePath =  dic.objectForKey(key).toString();
					config.setOutputDir(createRelesePath.substring(0, createRelesePath.indexOf("appexe"))+val1+"/"+val2);
				}else if(config.getType().equalsIgnoreCase("preview")){
					config.setOutputDir(dic.objectForKey("preview_path").toString().replace(key1, val1));
				}else{
					config.setOutputDir(dic.objectForKey(key).toString().replace(key1, val1).replace(key2, val2));
				}
			}else if (key.equalsIgnoreCase("templates_dir")){
				config.setTemplatesDir(servlet + dic.objectForKey(key).toString().replace(key1, val1).replace(key2, val2));
				//config.setTemplatesDir("/usr/glassfish/glassfish/domains/domain1/eclipseApps/mobileweb3.1.0/resources/templates/");
			}else if (key.equalsIgnoreCase("project_path")){
				config.setProjectPath(dic.objectForKey(key).toString().replace(key1, val1).replace(key2, val2));
			}else if (key.equalsIgnoreCase("resources_dir")){
				config.setResourcesFolder(dic.objectForKey(key).toString().replace(key1, val1).replace(key2, val2));
				//config.setResourcesFolder("/eclipseApps/mobileweb3.1.0/resources/");
			}
		}
		config.setProjectOutputDir("");

		return config;
	}
}
