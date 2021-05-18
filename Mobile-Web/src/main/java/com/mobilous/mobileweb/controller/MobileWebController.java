
package com.mobilous.mobileweb.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.parser.ADFParser;
import com.mobilous.mobileweb.parser.LocalizationParser;
import com.mobilous.mobileweb.parser.SettingsParser;
import com.mobilous.mobileweb.parser.TriggerParser;
import com.mobilous.mobileweb.uibuilder.PageBuilder;
import com.mobilous.mobileweb.util.ApplicationRenderer;
import com.mobilous.mobileweb.util.CSVReader;
import com.mobilous.mobileweb.util.FileRenderer;
import com.mobilous.mobileweb.util.FolderCreator;
import com.mobilous.mobileweb.util.LocalPlistLocator;
import com.mobilous.mobileweb.util.PlistLocator;
import com.mobilous.mobileweb.util.RemotePlistLocator;
import com.mobilous.mobileweb.util.Settings;

@Controller
public class MobileWebController {
	@Autowired
	private ApplicationRenderer renderer;
	// @Autowired
	// private String BaseUrl;

	private static final Logger logger = LoggerFactory
			.getLogger(MobileWebController.class);
	
	//	/{username}/{projectid}/{releaseName}/{releaseVersion}
	@RequestMapping("/{username}/{projectid}/{releaseName}/{releaseVersion}/{productionInstance}/release")
	public String loadRelease(@PathVariable String username,@PathVariable String projectid,@PathVariable String releaseName, @PathVariable String releaseVersion,@PathVariable String productionInstance, HttpServletRequest request, HttpServletResponse response) {
		
		String BaseUrl = request.getScheme() + "://" + request.getServerName() + "/";
		String url = BaseUrl + releaseName + "/" + releaseVersion;
		GenApp.instanceURL = request.getScheme() + "://" + request.getServerName();
		ADFParser.userId = username;
		ADFParser.projectId = projectid;
		ADFParser parser = new ADFParser(new RemotePlistLocator(url), "production");
		GenApp app = parser.parseStream();
		app.setBaseURL((BaseUrl.charAt(BaseUrl.length()-1) == '/') ? BaseUrl.substring(0, BaseUrl.length()-1) : BaseUrl);
		app.setProjectstate("production");
		app.setApplicationState("release");
		app.setUserId(username);
		app.setProjectId(projectid);
		app.setIndex("0");
		
		Settings config = SettingsParser.parseSettings(
				"release",
				username + ","+projectid,
				releaseName+"-"+releaseVersion,
				System.getProperty("user.dir").substring(0,System.getProperty("user.dir").indexOf("config")),"applications/mobileweb/resources/config/config.plist");
		FolderCreator.generateServerProjectFolders(config, "");
		// Older Code is not required now.. since Multiple Screen mechanism is included.. Akhil
		/*try {
			FileRenderer.renderFile(config, "index.html", "TEMPLATEPRODHTTPS.ftl",
					PageBuilder.generateHTMLDataModel(app));
			
			//System.out.println("File created done.....");
		} catch (Exception e) {
			//System.out.println("ERRORS OCCURED: ");
			e.printStackTrace();
			return "error";
		}*/
		

		try {
			app.getMainFile().setRelease(true);
					
			if(app.getMainFile().getNumberOfScreens() > 1){
				for(int i=0; i<=app.getMainFile().getNumberOfScreens();i++){
					if(i == 0){
						FileRenderer.renderFile(config, "index.html", "TEMPLATESCREENPRODHTTPS.ftl", PageBuilder.generateScreenDataModel(app));
					}else{
						int index = i - 1;
						app.setIndex(String.valueOf(index));
						app.getMainFile().setTabs(app.getMainFile().getTabSets().get(index).getTabs());
						app.setPages(app.getDefFileSet().get(index).getDefFiles());
						
						FileRenderer.renderFile(config, "index"+"_"+i+".html", "TEMPLATEPRODHTTPS.ftl", PageBuilder.generateHTMLDataModel(app));	
					}
						
				}
			}else{	// When Number of Screen is 1, then only 1 index.html file should be generated... 
				int index = 0;
				app.setIndex(String.valueOf(index));
				app.getMainFile().setTabs(app.getMainFile().getTabSets().get(index).getTabs());
				app.setPages(app.getDefFileSet().get(index).getDefFiles());
				FileRenderer.renderFile(config, "index.html", "TEMPLATEPRODHTTPS.ftl", PageBuilder.generateHTMLDataModel(app));
			}
			
			

			
			if(app.getMainFile().getNumberOfScreens() > 1){
				for(int i=0; i<=app.getMainFile().getNumberOfScreens();i++){
					if(i == 0){
						FileRenderer.renderFile(config, "index_release.html", "TEMPLATESCREENPRODHTTPS.ftl", PageBuilder.generateScreenDataModel(app));
					}else{
						int index = i - 1;
						app.setIndex(String.valueOf(index));
						app.getMainFile().setTabs(app.getMainFile().getTabSets().get(index).getTabs());
						app.setPages(app.getDefFileSet().get(index).getDefFiles());
						app.getMainFile().setBaseURL("http://"+productionInstance);
						FileRenderer.renderFile(config, "index"+"_"+i+"_release.html", "TEMPLATEPRODHTTPS.ftl", PageBuilder.generateHTMLDataModel(app));	
					}
						
				}
			}else{	// When Number of Screen is 1, then only 1 index.html file should be generated... 
				int index = 0;
				app.setIndex(String.valueOf(index));
				app.getMainFile().setTabs(app.getMainFile().getTabSets().get(index).getTabs());
				app.setPages(app.getDefFileSet().get(index).getDefFiles());
				app.getMainFile().setBaseURL("http://"+productionInstance);
				app.setBaseURL("http://"+productionInstance);
				System.out.println("BASE URL : " + productionInstance);
				FileRenderer.renderFile(config, "index_release.html", "TEMPLATEPRODHTTPS.ftl", PageBuilder.generateHTMLDataModel(app));
			}
			
			
			
			System.out.println("... MW Files Generated ...");
		} catch (Exception e) {
			//System.out.println("ERRORS OCCURED: ");
			e.printStackTrace();
			return "error";
		}
		
		return "success";
	}


	@RequestMapping("/{userId}/{projectId}/production")
	public String loadProduction(@PathVariable String userId,
			@PathVariable String projectId, HttpServletRequest request,
			HttpServletResponse response) {

		String BaseUrl =request.getScheme() + "://" + request.getServerName() + "/appexe/";
		String url = BaseUrl + userId + "/" + projectId; // request.getServerPort()
		GenApp.instanceURL = request.getScheme() + "://" + request.getServerName();
		ADFParser.userId = userId;
		ADFParser.projectId = projectId;
		ADFParser parser = new ADFParser(new RemotePlistLocator(url), "production");
		
		GenApp app = parser.parseStream();
		app.setBaseURL(BaseUrl);
		app.setUserId(userId);
		app.setProjectId(projectId);
		app.setProjectstate("production");
		app.setApplicationState("development");
		app.setIndex("0");
		//System.out.println("Screen > "+app.getMainFile().getNumberOfScreens());
		
		// PageBuilder pageBuilder = new PageBuilder();
		Settings config = SettingsParser.parseSettings(
				"production",
				userId,
				projectId,
				System.getProperty("user.dir").substring(0,System.getProperty("user.dir").indexOf("config")),"applications/mobileweb/resources/config/config.plist");
		FolderCreator.generateServerProjectFolders(config, "");

		try {
			int languageListSize = parser.getLanguageList().size();
				
			if(app.getMainFile().getNumberOfScreens() > 1){
				for(int i=0; i<=app.getMainFile().getNumberOfScreens();i++){
					if(i == 0){
						FileRenderer.renderFile(config, "index.html", "TEMPLATESCREENPUBLISHHTTPS.ftl", PageBuilder.generateScreenDataModel(app));
					}else{
						if(languageListSize != 0){
							FileRenderer.renderFile(config, "index_"+i+".html", "TEMPLATELANGUAGEPRODHTTPS.ftl", PageBuilder.generateLanguageDataModels(""));
							for (String key : parser.getLanguageList().keySet()) {
								int index = i - 1;
								ADFParser.languageConvertor = parser.getLanguageList().get(key);
								app.setIndex(String.valueOf(index));
								app.getMainFile().setTabs(app.getMainFile().getTabSets().get(index).getTabs());
								app.setPages(app.getDefFileSet().get(index).getDefFiles());
								FileRenderer.renderFile(config, "index"+"_"+i+key+".html", "TEMPLATEPUBLISHHTTPS.ftl", PageBuilder.generateHTMLDataModel(app));
							}
							
						}else{
							int index = i - 1;
							app.setIndex(String.valueOf(index));
							app.getMainFile().setTabs(app.getMainFile().getTabSets().get(index).getTabs());
							app.setPages(app.getDefFileSet().get(index).getDefFiles());
							FileRenderer.renderFile(config, "index"+"_"+i+".html", "TEMPLATEPUBLISHHTTPS.ftl", PageBuilder.generateHTMLDataModel(app));

						}
							
					}
						
				}
			}else{	// When Number of Screen is 1, then only 1 index.html file should be generated... 
				if(languageListSize != 0){
					FileRenderer.renderFile(config, "index.html", "TEMPLATELANGUAGEPRODHTTPS.ftl", PageBuilder.generateLanguageDataModels(""));
					int index = 0;
					app.setIndex(String.valueOf(index));
					app.getMainFile().setTabs(app.getMainFile().getTabSets().get(index).getTabs());
					app.setPages(app.getDefFileSet().get(index).getDefFiles());
					FileRenderer.renderFile(config, "index_"+ "en" +".html", "TEMPLATEPUBLISHHTTPS.ftl", PageBuilder.generateHTMLDataModel(app));
					for (String key : parser.getLanguageList().keySet()) {
						ADFParser.languageConvertor = parser.getLanguageList().get(key);
						FileRenderer.renderFile(config, "index_"+ key +".html", "TEMPLATEPUBLISHHTTPS.ftl", PageBuilder.generateHTMLDataModel(app));
					}
					
				}else{
					int index = 0;
					app.setIndex(String.valueOf(index));
					app.getMainFile().setTabs(app.getMainFile().getTabSets().get(index).getTabs());
					app.setPages(app.getDefFileSet().get(index).getDefFiles());
					FileRenderer.renderFile(config, "index.html", "TEMPLATEPUBLISHHTTPS.ftl", PageBuilder.generateHTMLDataModel(app));
				}
				
			}
			
			
			
			System.out.println("... MW Files Generated ...");
		} catch (Exception e) {
			//System.out.println("ERRORS OCCURED: ");
			e.printStackTrace();
			return "error";
		}
		
		
		return "success";
	}
	
	// For NPE and Builder without SessionID and ScreenID in the Preview URL.
	/*
	 * @Deprecated 
	 */
	/*@RequestMapping("/{userId}/{projectId}/preview")
	public ModelAndView loadPreview(@PathVariable String userId,
			@PathVariable String projectId, HttpServletRequest request,
			HttpServletResponse response) {
	
		
		String BaseUrl = request.getScheme() + "://" + request.getServerName() + "/appexe/";
		String fullBaseURL = request.getScheme() + "://" + request.getServerName() + "/appexe/" + userId + "/" + projectId;
		StringBuilder url = new StringBuilder();
		GenApp.instanceURL = request.getScheme() + "://" + request.getServerName();	
		ADFParser.userId = userId;
		ADFParser.projectId = projectId;
		url.append(request.getScheme()).append("://").append(request.getServerName());
		
		if (request.getServerPort() > 0){
			url.append(":").append(request.getServerPort());
		}
		
		int screenId = 0;
		
		url.append("/appexe/api/adf/").append(projectId);
		ADFParser plistParser = new ADFParser(new RemotePlistLocator(url.toString()), "preview");
		
		GenApp app = plistParser.parseStream();
		
		app.setBaseURL(BaseUrl);
		app.setFullBaseURL(fullBaseURL);
		app.setUserId(userId);
		app.setPreviewScreenId(screenId);
		app.setProjectstate("preview");
		app.setApplicationState("preview");
		app.setProjectId(projectId);
		app.setPort(request.getServerPort());
		app.setIndex("0");
		app.getMainFile().setTabs(app.getMainFile().getTabSets().get(0).getTabs());
		app.setPages(app.getDefFileSet().get(0).getDefFiles());
		Map<String, String> map = renderer.render(app);
		map.put("title", "");
		return new ModelAndView("TEMPLATEPREV", "model", map);
	
	}*/
	
	
	//For Builder with SessionID only in the URL of Preview.
	
	/*@RequestMapping("/{userId}/{projectId}/{sessionid}//preview")
	public ModelAndView loadPreview(@PathVariable String userId,
			@PathVariable String projectId, @PathVariable String sessionid, HttpServletRequest request,
			HttpServletResponse response) {
		
		String BaseUrl = request.getScheme() + "://" + request.getServerName() + "/appexe/";
		String fullBaseURL = request.getScheme() + "://" + request.getServerName() + "/appexe/" + userId + "/" + projectId+"/";
		StringBuilder url = new StringBuilder();
		StringBuilder checkSessionURL = new StringBuilder();
		
		url.append(request.getScheme()).append("://").append(request.getServerName());
		GenApp.instanceURL = request.getScheme() + "://" + request.getServerName();
		ADFParser.userId = userId;
		ADFParser.projectId = projectId;
		if (request.getServerPort() > 0){
			url.append(":").append(request.getServerPort());
		}
		
	
		// check sessionID with Appexe Server..
		checkSessionURL.append(request.getScheme()).append("://")
		.append(request.getServerName())
		.append(":").append(request.getServerPort())
		.append("/appexe/api/testlogin.json")
		.append("?userid=").append(userId)
		.append("&sessionid=").append(sessionid);
		
		try {
			HttpURLConnection connection = (HttpURLConnection) new URL(checkSessionURL.toString()).openConnection();
			connection.setRequestProperty("Content-Type","application/json");
		    connection.setRequestProperty("Accept","application/json");
		    
		    BufferedReader buff = new BufferedReader(new InputStreamReader(connection.getInputStream()));
		    JSONParser parser = new JSONParser();
		    
		    try {
				JSONObject jsonObj =  (JSONObject) parser.parse(buff.readLine());
				//{"response":"NACK","error":"Invalid sessionid, please log in again.","command":null}
				if(jsonObj.get("response").toString().equalsIgnoreCase("NACK")){
					//System.out.println("Invalid SessionID for Preview...");
					response.setContentType("text/HTML");
					try {
						response.getWriter().write("ERROR : "+jsonObj.get("error"));
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}else{
					int screenId = 0;
					url.append("/appexe/api/adf/").append(projectId).append("/").append(screenId);
					ADFParser plistParser = new ADFParser(new RemotePlistLocator(url.toString()),"preview");

					GenApp app = plistParser.parseStream();
					app.setBaseURL(BaseUrl);
					app.setFullBaseURL(fullBaseURL);
					app.setUserId(userId);
					app.setProjectId(projectId);
					app.setProjectstate("preview");
					app.setApplicationState("preview");
					app.setPort(request.getServerPort());
					app.setPreviewScreenId(screenId);
					app.setIndex("0");
					app.getMainFile().setTabs(app.getMainFile().getTabSets().get(0).getTabs());
					app.setPages(app.getDefFileSet().get(0).getDefFiles());
					Map<String, String> map = renderer.render(app);
					map.put("title", "");
					return new ModelAndView("TEMPLATEPREV", "model", map);
					
				}
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				//System.out.println("ERROR : Cannot parse from appexe response string to json AT check session code...");
			}
		
			
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return null;
	}*/
	
	//Make preview faster -- new
	
	@RequestMapping("/{userId}/{projectId}/{sessionid}/{screenId}/{language}/preview")
	@ResponseBody
	public String loadPreview(@PathVariable String userId,
			@PathVariable String projectId, @PathVariable String sessionid, @PathVariable String screenId, HttpServletRequest request,
			HttpServletResponse response) {
		String BaseUrl =request.getScheme() + "://" + request.getServerName() + "/appexe/";
		String fullBaseURL = request.getScheme() + "://" + request.getServerName() + "/appexe/" + userId + "/" + projectId+"/";
		StringBuilder url = new StringBuilder();
		StringBuilder checkSessionURL = new StringBuilder();
		GenApp.instanceURL = request.getScheme() + "://" + request.getServerName();
		ADFParser.userId = userId;
		ADFParser.projectId = projectId;
		System.out.println(GenApp.instanceURL);
	
		// check sessionID with Appexe Server..
		checkSessionURL.append(request.getScheme()).append("://")
		.append(request.getServerName())
		.append(":").append(request.getServerPort())
		.append("/appexe/api/testlogin.json")
		.append("?userid=").append(userId)
		.append("&sessionid=").append(sessionid);
		try {
			HttpURLConnection connection = (HttpURLConnection) new URL(checkSessionURL.toString()).openConnection();
			connection.setRequestProperty("Content-Type","application/json");
		    connection.setRequestProperty("Accept","application/json");
		    
		    BufferedReader buff = new BufferedReader(new InputStreamReader(connection.getInputStream()));
		    JSONParser parser = new JSONParser();
		    
		    try {
				JSONObject jsonObj =  (JSONObject) parser.parse(buff.readLine());
				//{"response":"NACK","error":"Invalid sessionid, please log in again.","command":null}
				if(jsonObj.get("response").toString().equalsIgnoreCase("NACK")){
					//System.out.println("Invalid SessionID for Preview...");
					response.setContentType("text/HTML");
					try {
						response.getWriter().write("ERROR : "+jsonObj.get("error"));
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}else{
					Settings config = SettingsParser.parseSettings(
							"preview",
							userId,
							projectId,
							System.getProperty("user.dir").substring(0,System.getProperty("user.dir").indexOf("config")),"applications/mobileweb/resources/config/config.plist");
					
					PlistLocator locator = new LocalPlistLocator(config);
					GenApp.instanceURL = request.getScheme() + "://" + request.getServerName();
					ADFParser.userId = userId;
					ADFParser.projectId = projectId;
					ADFParser plistParser = new ADFParser(locator, "preview");
					
					GenApp app = plistParser.parseStream();
					app.setBaseURL(BaseUrl);
					app.setFullBaseURL(fullBaseURL);
					app.setUserId(userId);
					app.setProjectId(projectId);
					app.setProjectstate("preview");
					app.setApplicationState("preview");
					app.setPort(request.getServerPort());
					app.setPreviewScreenId(Integer.parseInt(screenId));
					app.setIndex("0");
					
					app.getMainFile().setTabs(app.getMainFile().getTabSets().get(0).getTabs());
					app.setPages(app.getDefFileSet().get(0).getDefFiles());
					Map<String, String> map = renderer.render(app);
					map.put("title", "Preview");
					
					FolderCreator.generateServerProjectFolders(config, "");
					
					try {
						FileRenderer.renderFile(config, "preview.html", "TEMPLATEPREVHTTPS.ftl", PageBuilder.generateHTMLDataModel(app));
						String URL = request.getScheme().toString().replace("http", "https") + "://" + request.getServerName() + "/mobileweb/" + userId + "/preview.html";
						System.out.println("preview url------"+URL);
						return URL;
						
					} catch (Exception e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					
				}
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				//System.out.println("ERROR : Cannot parse from appexe response string to json AT check session code...");
			}
		
			
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return "";
	}
	
	//For Builder with SessionID only in the URL of Preview.
//		@RequestMapping("/{userId}/{projectId}/{sessionid}/{screenId}/{language}/preview")
//		@ResponseBody
//		public String loadPreview1(@PathVariable String userId,
//				@PathVariable String projectId, @PathVariable String sessionid,@PathVariable String screenId,@PathVariable String language, HttpServletRequest request,
//				HttpServletResponse response) {
//			
//			String BaseUrl = request.getScheme() + "://" + request.getServerName() + "/appexe/";
//			String fullBaseURL = request.getScheme() + "://" + request.getServerName() + "/appexe/" + userId + "/" + projectId+"/";
//			StringBuilder url = new StringBuilder();
//			StringBuilder checkSessionURL = new StringBuilder();
//			url.append(request.getScheme()).append("://").append(request.getServerName());
//			GenApp.instanceURL = request.getScheme() + "://" + request.getServerName();
//			ADFParser.userId = userId;
//			ADFParser.projectId = projectId;
//			if (request.getServerPort() > 0){
//				url.append(":").append(request.getServerPort());
//			}
//			
//		
//			// check sessionID with Appexe Server..
//			checkSessionURL.append(request.getScheme()).append("://")
//			.append(request.getServerName())
//			.append(":").append(request.getServerPort())
//			.append("/appexe/api/testlogin.json")
//			.append("?userid=").append(userId)
//			.append("&sessionid=").append(sessionid);
//			
//			try {
//				HttpURLConnection connection = (HttpURLConnection) new URL(checkSessionURL.toString()).openConnection();
//				connection.setRequestProperty("Content-Type","application/json");
//			    connection.setRequestProperty("Accept","application/json");
//			    
//			    BufferedReader buff = new BufferedReader(new InputStreamReader(connection.getInputStream()));
//			    JSONParser parser = new JSONParser();
//			    
//			    try {
//					JSONObject jsonObj =  (JSONObject) parser.parse(buff.readLine());
//					//{"response":"NACK","error":"Invalid sessionid, please log in again.","command":null}
//					if(jsonObj.get("response").toString().equalsIgnoreCase("NACK")){
//						//System.out.println("Invalid SessionID for Preview...");
//						response.setContentType("text/HTML");
//						try {
//							response.getWriter().write("ERROR : "+jsonObj.get("error"));
//						} catch (IOException e) {
//							// TODO Auto-generated catch block
//							e.printStackTrace();
//						}
//					}else{
//						url.append("/appexe/api/adf/").append(projectId).append("/").append(screenId).append("/").append(true);
//						ADFParser plistParser = new ADFParser(new RemotePlistLocator(url.toString()),"preview");
//						plistParser.setLanguage(language);
//						GenApp app = plistParser.parseStream();
//						app.setBaseURL(BaseUrl);
//						app.setFullBaseURL(fullBaseURL);
//						app.setUserId(userId);
//						app.setProjectId(projectId);
//						app.setProjectstate("preview");
//						app.setApplicationState("preview");
//						app.setPort(request.getServerPort());
//						app.setPreviewScreenId(Integer.parseInt(screenId));
//						app.setIndex("0");
//						app.getMainFile().setTabs(app.getMainFile().getTabSets().get(0).getTabs());
//						app.setPages(app.getDefFileSet().get(0).getDefFiles());
//						Map<String, String> map = renderer.render(app);
//						map.put("title", "Preview");
//
//						String HTMLFileName = userId+"_preview.html";
//
//						try {
//							FileRenderer.renderFileForPreview(HTMLFileName, "TEMPLATEPREV.jsp", map);
//						} catch (Exception e) {
//							// TODO Auto-generated catch block
//							e.printStackTrace();
//						}
//
//						//						 ModelAndView mandv = new ModelAndView("TEMPLATEPREV", "model", map);
//						//						 System.out.println(mandv.toString());
//
//						String previewURL = "https://"+request.getServerName()+"/mobileweb/mobile/resources/"+HTMLFileName;
//
//
//						return previewURL;
//
//					}
//				} catch (ParseException e) {
//					// TODO Auto-generated catch block
//					e.printStackTrace();
//					//System.out.println("ERROR : Cannot parse from appexe response string to json AT check session code...");
//				}
//			
//				
//			} catch (MalformedURLException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			} catch (IOException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//			
//			return null;
//		}
	
	/*//For NPE , with SessionID and ScreenID both are in the URL.
	@RequestMapping("/{userId}/{projectId}/{sessionid}/{screenId}/preview")
	@ResponseBody
	public String loadPreview(@PathVariable String userId,
			@PathVariable String projectId, @PathVariable String sessionid, @PathVariable String screenId, HttpServletRequest request,
			HttpServletResponse response) {
		
		String BaseUrl = request.getScheme().toString().replace("http", "https") + "://" + request.getServerName() + "/appexe/";
		String fullBaseURL = request.getScheme() + "://" + request.getServerName() + "/appexe/" + userId + "/" + projectId+"/";
		StringBuilder url = new StringBuilder();
		StringBuilder checkSessionURL = new StringBuilder();
		GenApp.instanceURL = request.getScheme() + "://" + request.getServerName();
		ADFParser.userId = userId;
		ADFParser.projectId = projectId;
		System.out.println(GenApp.instanceURL);
		url.append(request.getScheme()).append("://").append(request.getServerName());
		
		if (request.getServerPort() > 0){
			url.append(":").append(request.getServerPort());
		}
		
	
		// check sessionID with Appexe Server..
		checkSessionURL.append(request.getScheme()).append("://")
		.append(request.getServerName())
		.append(":").append(request.getServerPort())
		.append("/appexe/api/testlogin.json")
		.append("?userid=").append(userId)
		.append("&sessionid=").append(sessionid);
		
		try {
			HttpURLConnection connection = (HttpURLConnection) new URL(checkSessionURL.toString()).openConnection();
			connection.setRequestProperty("Content-Type","application/json");
		    connection.setRequestProperty("Accept","application/json");
		    
		    BufferedReader buff = new BufferedReader(new InputStreamReader(connection.getInputStream()));
		    JSONParser parser = new JSONParser();
		    
		    try {
				JSONObject jsonObj =  (JSONObject) parser.parse(buff.readLine());
				//{"response":"NACK","error":"Invalid sessionid, please log in again.","command":null}
				if(jsonObj.get("response").toString().equalsIgnoreCase("NACK")){
					//System.out.println("Invalid SessionID for Preview...");
					response.setContentType("text/HTML");
					try {
						response.getWriter().write("ERROR : "+jsonObj.get("error"));
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}else{
					
					url.append("/appexe/api/adf/").append(projectId).append("/").append(screenId).append("/").append(true);
					PlistLocator locator = new RemotePlistLocator(url.toString());
					ADFParser.userId = userId;
					ADFParser.projectId = projectId;
					ADFParser plistParser = new ADFParser(locator,"preview");
					
					GenApp app = plistParser.parseStream();
					app.setBaseURL(BaseUrl);
					app.setFullBaseURL(fullBaseURL);
					app.setUserId(userId);
					app.setProjectId(projectId);
					app.setProjectstate("preview");
					app.setApplicationState("preview");
					app.setPort(request.getServerPort());
					app.setPreviewScreenId(Integer.parseInt(screenId));
					app.setIndex("0");
					
					app.getMainFile().setTabs(app.getMainFile().getTabSets().get(0).getTabs());
					app.setPages(app.getDefFileSet().get(0).getDefFiles());
					Map<String, String> map = renderer.render(app);
					map.put("title", "");
					
					// PageBuilder pageBuilder = new PageBuilder();
					Settings config = SettingsParser.parseSettings(
							"preview",
							userId,
							projectId,
							System.getProperty("user.dir").substring(0,System.getProperty("user.dir").indexOf("config")),"applications/mobileweb/resources/config/config.plist");				
					
					FolderCreator.generateServerProjectFolders(config, "");
					
					try {
						FileRenderer.renderFile(config, "index.html", "TEMPLATEPREVHTTPS.ftl", PageBuilder.generateHTMLDataModel(app));
						String URL = request.getScheme().toString().replace("http", "https") + "://" + request.getServerName() + "/mobileweb/" + userId + "/index.html";
						return URL;
						
					} catch (Exception e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				//System.out.println("ERROR : Cannot parse from appexe response string to json AT check session code...");
			}
		
			
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return "";
	}
		//For Builder with SessionID only in the URL of Preview.
				@RequestMapping("/{userId}/{projectId}/{sessionid}/{screenId}/preview")
				public ModelAndView loadPreview(@PathVariable String userId,
						@PathVariable String projectId, @PathVariable String sessionid,@PathVariable String screenId, HttpServletRequest request,
						HttpServletResponse response) {
					
					String BaseUrl = request.getScheme() + "://" + request.getServerName() + "/appexe/";
					String fullBaseURL = request.getScheme() + "://" + request.getServerName() + "/appexe/" + userId + "/" + projectId+"/";
					StringBuilder url = new StringBuilder();
					StringBuilder checkSessionURL = new StringBuilder();
					url.append(request.getScheme()).append("://").append(request.getServerName());
					GenApp.instanceURL = request.getScheme() + "://" + request.getServerName();
					ADFParser.userId = userId;
					ADFParser.projectId = projectId;
					if (request.getServerPort() > 0){
						url.append(":").append(request.getServerPort());
					}
					
				
					// check sessionID with Appexe Server..
					checkSessionURL.append(request.getScheme()).append("://")
					.append(request.getServerName())
					.append(":").append(request.getServerPort())
					.append("/appexe/api/testlogin.json")
					.append("?userid=").append(userId)
					.append("&sessionid=").append(sessionid);
					
					try {
						HttpURLConnection connection = (HttpURLConnection) new URL(checkSessionURL.toString()).openConnection();
						connection.setRequestProperty("Content-Type","application/json");
					    connection.setRequestProperty("Accept","application/json");
					    
					    BufferedReader buff = new BufferedReader(new InputStreamReader(connection.getInputStream()));
					    JSONParser parser = new JSONParser();
					    
					    try {
							JSONObject jsonObj =  (JSONObject) parser.parse(buff.readLine());
							//{"response":"NACK","error":"Invalid sessionid, please log in again.","command":null}
							if(jsonObj.get("response").toString().equalsIgnoreCase("NACK")){
								//System.out.println("Invalid SessionID for Preview...");
								response.setContentType("text/HTML");
								try {
									response.getWriter().write("ERROR : "+jsonObj.get("error"));
								} catch (IOException e) {
									// TODO Auto-generated catch block
									e.printStackTrace();
								}
							}else{
								url.append("/appexe/api/adf/").append(projectId).append("/").append(screenId).append("/").append(true);
								ADFParser plistParser = new ADFParser(new RemotePlistLocator(url.toString()),"preview");
								GenApp app = plistParser.parseStream();
								app.setBaseURL(BaseUrl);
								app.setFullBaseURL(fullBaseURL);
								app.setUserId(userId);
								app.setProjectId(projectId);
								app.setProjectstate("preview");
								app.setApplicationState("preview");
								app.setPort(request.getServerPort());
								app.setPreviewScreenId(Integer.parseInt(screenId));
								app.setIndex("0");
								app.getMainFile().setTabs(app.getMainFile().getTabSets().get(0).getTabs());
								app.setPages(app.getDefFileSet().get(0).getDefFiles());
								Map<String, String> map = renderer.render(app);
								map.put("title", "");
								return new ModelAndView("TEMPLATEPREV", "model", map);
							}
						} catch (ParseException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
							//System.out.println("ERROR : Cannot parse from appexe response string to json AT check session code...");
						}
					
						
					} catch (MalformedURLException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					
					return null;
				}*/
			
	//Service for supporting localization
	/*	@RequestMapping("/{userId}/{projectId}/{sessionid}/{screenId}/{language}/preview")
		public ModelAndView loadPreview(@PathVariable String userId,
				@PathVariable String projectId, @PathVariable String sessionid, @PathVariable String screenId,@PathVariable String language, HttpServletRequest request,
				HttpServletResponse response) {
			
			String BaseUrl = request.getScheme().toString().replace("http", "https") + "://" + request.getServerName() + "/appexe/";
			String fullBaseURL = request.getScheme() + "://" + request.getServerName() + "/appexe/" + userId + "/" + projectId+"/";
			StringBuilder url = new StringBuilder();
			StringBuilder checkSessionURL = new StringBuilder();
			GenApp.instanceURL = request.getScheme() + "://" + request.getServerName();
			ADFParser.userId = userId;
			ADFParser.projectId = projectId;
			
			System.out.println(GenApp.instanceURL);
			url.append(request.getScheme()).append("://").append(request.getServerName());
			
			if (request.getServerPort() > 0){
				url.append(":").append(request.getServerPort());
			}
			
		
			// check sessionID with Appexe Server..
			checkSessionURL.append(request.getScheme()).append("://")
			.append(request.getServerName())
			.append(":").append(request.getServerPort())
			.append("/appexe/api/testlogin.json")
			.append("?userid=").append(userId)
			.append("&sessionid=").append(sessionid);
			
			try {
				HttpURLConnection connection = (HttpURLConnection) new URL(checkSessionURL.toString()).openConnection();
				connection.setRequestProperty("Content-Type","application/json");
			    connection.setRequestProperty("Accept","application/json");
			    
			    BufferedReader buff = new BufferedReader(new InputStreamReader(connection.getInputStream()));
			    JSONParser parser = new JSONParser();
			    
			    try {
					JSONObject jsonObj =  (JSONObject) parser.parse(buff.readLine());
					//{"response":"NACK","error":"Invalid sessionid, please log in again.","command":null}
					if(jsonObj.get("response").toString().equalsIgnoreCase("NACK")){
						//System.out.println("Invalid SessionID for Preview...");
						response.setContentType("text/HTML");
						try {
							response.getWriter().write("ERROR : "+jsonObj.get("error"));
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}else{
						 Parsing Language File 
						url.append("/appexe/api/adf/").append(projectId).append("/").append(screenId).append("/").append(true);
						PlistLocator locator = new RemotePlistLocator(url.toString());
						ADFParser.userId = userId;
						ADFParser.projectId = projectId;
						ADFParser plistParser = new ADFParser(locator,"preview");
						plistParser.setLanguage(language);
						GenApp app = plistParser.parseStream();
						app.setBaseURL(BaseUrl);
						app.setFullBaseURL(fullBaseURL);
						app.setUserId(userId);
						app.setProjectId(projectId);
						app.setProjectstate("preview");
						app.setApplicationState("preview");
						app.setPort(request.getServerPort());
						app.setPreviewScreenId(Integer.parseInt(screenId));
						app.setIndex("0");
						
						app.getMainFile().setTabs(app.getMainFile().getTabSets().get(0).getTabs());
						app.setPages(app.getDefFileSet().get(0).getDefFiles());
						Map<String, String> map = renderer.render(app);
						map.put("title", "");
						return new ModelAndView("TEMPLATEPREV", "model", map);
						
					}
				} catch (ParseException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
					//System.out.println("ERROR : Cannot parse from appexe response string to json AT check session code...");
				}
			
				
			} catch (MalformedURLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			return null;
		}*/

	@RequestMapping(value = "/{userId}/{projectId}/deleteproject")
	public @ResponseBody
	boolean deleteProject(@PathVariable String userId,
			@PathVariable String projectId, HttpServletRequest request,
			HttpServletResponse response) {
		return deleteFile(new File("/var/www/html/appexe/" + userId + "/"
				+ projectId));
	}

	public static boolean deleteFile(File dirOrFile) {
		if (dirOrFile.isDirectory()) {
			String[] children = dirOrFile.list();
			for (int i = 0; i < children.length; i++) {
				boolean success = deleteFile(new File(dirOrFile, children[i]));
				if (!success)
					return false;
			}
		}
		return dirOrFile.delete();
	}

	@RequestMapping(value = "/{userId}/{projectId}/getserverdata")
	public @ResponseBody
	String getServerData(@PathVariable String userId,
			@PathVariable String projectId, HttpServletRequest request,
			HttpServletResponse response) {
		
		StringBuilder reply = new StringBuilder();
		JSONObject req = null;
		try {
			req = (JSONObject) new JSONParser().parse(request.getParameter("request"));
		} catch (Exception e) {
			return reply.append("alert(\"request parameter is missing from your request.\");").toString();
		}

		//ADD LANGUAGE
		req.put("lang", request.getLocale().toString());
		if (req.get("lang").toString().contains("_"))
			req.put("lang", req.get("lang").toString().split("_")[0]);

		JSONObject localization = (JSONObject) req.get("localization");
		if (localization != null) {
			InputStream is = null;

			try {
				if (req.get("state").toString().equalsIgnoreCase("preview"))
				localization.put("value", LocalizationParser
						.parseLocalizationFile(RemotePlistLocator.getRemoteFile(request.getScheme()
								+ "://" + request.getServerName()
								+ ":8080/appexe/api/download/l10n/" + projectId
								+ "/" + req.get("title") + "_" + req.get("lang")
								+ ".plist")));
				else
					localization.put("value", LocalizationParser
							.parseLocalizationFile(new File(
							"/var/www/html/appexe/" + userId + "/" + projectId
									+ "/bin/mobileweb2/resources/l10n/" + req.get("title")
									+ "_" + req.get("lang") + ".plist")));
				localization.put("status", true);
			} catch (Exception e) {
				localization.put("msg", "File Not Found/Empty.");
			}

		}

		JSONArray schemas = (JSONArray) req.get("schema");
		if (schemas != null) {
			for (int k = 0; k < schemas.size(); k++) {
				JSONObject schema = (JSONObject) schemas.get(k);
				try {
					File root = null;
					if (req.get("state").toString().equalsIgnoreCase("preview")){
						InputStream is = RemotePlistLocator.getRemoteFile(request
								.getScheme()
								+ "://"
								+ request.getServerName()
								+ ":8080/appexe/api/download/database/"
								+ projectId + "/" + schema.get("filename"));
						root = new File("mato.csv");
						OutputStream out = new FileOutputStream(root);
						byte buffer[] = new byte[1024];
						int length;
						while ((length = is.read(buffer)) > 0) {
							out.write(buffer, 0, length);
							is.close();
						}
						out.close();
					}
					else
						root = new File(
								"/var/www/html/appexe/" + userId + "/"
										+ projectId + "/bin/mobileweb2/resources/database/"
										+ schema.get("filename"));
					
					JSONArray dbtable = new JSONArray();
					JSONObject row;
					String[] colnames = null;
					List<String[]> parsed_buffer = new CSVReader(
							new FileReader(root)).readAll();
					if (parsed_buffer.size() <= 1)
						throw new Exception("File Not Found/Empty.");
					for (int i = 0; i < parsed_buffer.size(); i++) {
						String[] col = parsed_buffer.get(i);
						if (i == 0) {
							colnames = new String[col.length];
							for (int j = 0; j < col.length; j++)
								colnames[j] = col[j];
						} else {
							row = new JSONObject();
							for (int j = 0; j < col.length; j++)
								row.put(colnames[j], col[j]);
							dbtable.add(row);
						}
					}
					schema.put("status", true);
					schema.put("value", dbtable);
				} catch (Exception e) {
					//schema.put("msg", e.getMessage());
					System.out.println(e.getMessage());
				}
			}
			req.put("schema", schemas);
		}

		InputStream triggerIs = null;
		JSONObject triggerDefination = new JSONObject();
		try {
			if (req.get("state").toString().equalsIgnoreCase("preview"))
				req.put("trigger", TriggerParser
					.parseTrigger(RemotePlistLocator.getRemoteFile(request.getScheme()
							+ "://" + request.getServerName()
							+ ":8080/appexe/api/adf/" + projectId
							+ "/mainfile.plist")));
			else
				req.put("trigger", TriggerParser
						.parseTrigger(new File(
						"/var/www/html/appexe/" + userId + "/" + projectId
								+ "/bin/mobileweb2/resources/mainfile.plist")));

			
		} catch (Exception e) {
			triggerDefination.put("msg", "File Not Found/Empty.");
		}
		req.put("status", true);
		
		return reply.append(generateCallbackResponse("'processServerData'", req)).toString();
	}
	
	public static String generateCallbackResponse(String callback, JSONObject json) {
		try {
			if (callback.length() > 0)
				return "$.utility(" + callback + "," + json.toJSONString() + ");";
		} catch (Exception e) {}

		return json.toJSONString();
	}
	
	//@RequestMapping("/{userId}/{projectId}/{sessionid}/{screenId}/error")
	public static ModelAndView loadEror(HttpServletRequest request, HttpServletResponse response) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("errorContents", "Plist File Not Found..");
		System.out.println("&&&&&&&&&&&&&&&&&&&&&&&&&&123");
		return new ModelAndView("error", "model", map);
	}
	
	@RequestMapping(value = "/matotest")
	public @ResponseBody
	String matoTest(HttpServletRequest request, HttpServletResponse response) {
		return "MATOTEST";
	}
}
