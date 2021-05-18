package com.mobilous.mobilegen;

import java.io.BufferedOutputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.util.ArrayList;

import junit.framework.Assert;

import org.junit.Test;

import com.mobilous.mobileweb.app.DefFile;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.app.Tabs;
import com.mobilous.mobileweb.parser.ADFParser;
import com.mobilous.mobileweb.parser.SettingsParser;
import com.mobilous.mobileweb.resource.BGMS;
import com.mobilous.mobileweb.resource.Images;
import com.mobilous.mobileweb.resource.Resource;
import com.mobilous.mobileweb.resource.SoundEffects;
import com.mobilous.mobileweb.resource.Videos;
import com.mobilous.mobileweb.uibuilder.PageBuilder;
import com.mobilous.mobileweb.util.FileRenderer;
import com.mobilous.mobileweb.util.FolderCreator;
import com.mobilous.mobileweb.util.LocalPlistLocator;
import com.mobilous.mobileweb.util.Settings;

public class AdfParserTest {

	@Test
	public void testLocalFileParser() {
		String message = "Hello World!";
		/*
		 * ResourceBundle bundle = ResourceBundle.getBundle("build"); String msg
		 * = bundle.getString("build.message"); System.out.println(msg);
		 * 
		 * System.out.println("\nVerify Generated MANIFEST.MF Properties");
		 */

		Assert.assertEquals(12, message.length());
		try {
			Settings config = SettingsParser.parseSettings("", "", "", "",
					"config/config.plist");
			config.setProjectPath("files/");
			GenApp.instanceURL = "LOCAL";
			ADFParser parser = new ADFParser(new LocalPlistLocator(config),"production");

			GenApp genapp = parser.parseStream();
			genapp.setProjectstate("production");

			FolderCreator.generateProjectFolders(config.getOutputDir(),
					genapp.getAppTitle());
			config.setProjectOutputDir(genapp.getAppTitle());
			genapp.setIndex("0");
			ArrayList<Tabs> tabList = genapp.getMainFile().getTabSets().get(Integer.parseInt(genapp.getIndex())).getTabs();
			System.out.println("TABS");
			for (Tabs tabs : tabList) {
				// System.out.println(tabs.getDefFile().getDefFileID());
			}

			ArrayList<DefFile> pages = genapp.getPages();
			
		/*	for(int i=0; i<=genapp.getMainFile().getNumberOfScreens();i++){
				if(i == 0){
					FileRenderer.renderFile(config, "index.html", "TEMPLATESCREENPROD.ftl", PageBuilder.generateScreenDataModel(genapp));
				}else{
					int index = i - 1;
					genapp.setIndex(String.valueOf(index));
					genapp.getMainFile().setTabs(genapp.getMainFile().getTabSets().get(index).getTabs());
					genapp.setPages(genapp.getDefFileSet().get(index).getDefFiles());
					FileRenderer.renderFile(config, "index"+"_"+i+".html", "TEMPLATEPROD.ftl", PageBuilder.generateHTMLDataModel(genapp));	
				}
					
			}*/

			
			if(genapp.getMainFile().getNumberOfScreens() > 1){
				for(int i=0; i<=genapp.getMainFile().getNumberOfScreens();i++){
					if(i == 0){
						FileRenderer.renderFile(config, "index.html", "TEMPLATESCREENPROD.ftl", PageBuilder.generateScreenDataModel(genapp));
					}else{
						int index = i - 1;
						genapp.setIndex(String.valueOf(index));
						genapp.getMainFile().setTabs(genapp.getMainFile().getTabSets().get(index).getTabs());
						genapp.setPages(genapp.getDefFileSet().get(index).getDefFiles());
						FileRenderer.renderFile(config, "index"+"_"+i+".html", "TEMPLATEPROD.ftl", PageBuilder.generateHTMLDataModel(genapp));	
					}
						
				}
			}else{	// When Number of Screen is 1, then only 1 index.html file should be generated... 
				int index = 0;
				genapp.setIndex(String.valueOf(index));
				genapp.getMainFile().setTabs(genapp.getMainFile().getTabSets().get(index).getTabs());
				genapp.setPages(genapp.getDefFileSet().get(index).getDefFiles());
				FileRenderer.renderFile(config, "index.html", "TEMPLATEPROD.ftl", PageBuilder.generateHTMLDataModel(genapp));
			}
			
			
			
			System.out.println("... MW Files Generated ...");
		
			

			//resourceDownloader(genapp, config);

			// testCSVReader();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void resourceDownloader(GenApp genapp, Settings config) {
		System.out.println("Downloading Resources.... Please wait....");
		Resource resource = genapp.getMainFile().getResource();
		FolderCreator.createFolder(config.getOutputDir(), genapp.getAppTitle()
				+ "/resources");

		if (resource.getImageList() != null) {
			if (resource.getImageList().size() > 0) {
				FolderCreator.createFolder(config.getOutputDir(),
						genapp.getAppTitle() + "/resources/image");
				for (Images image : resource.getImageList()) {
					try {
						URL url = new URL(genapp.getBaseURL().replace(
								"/appexe/", "")
								+ ":8080/appexe/api/download/image/"
								+ genapp.getProjectId()
								+ "/"
								+ image.getFilename().replace(" ", "%20"));
						InputStream in = url.openStream();
						OutputStream out = new BufferedOutputStream(
								new FileOutputStream(config.getOutputDir()
										+ genapp.getAppTitle()
										+ "/resources/image/"
										+ image.getFilename()));
						for (int b; (b = in.read()) != -1;) {
							out.write(b);
						}
						out.close();
						in.close();
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		}

		if (resource.getBgmsList() != null) {
			if (resource.getBgmsList().size() > 0) {
				FolderCreator.createFolder(config.getOutputDir(),
						genapp.getAppTitle() + "/resources/bgm");
				for (BGMS bgms : resource.getBgmsList()) {
					try {
						URL url = new URL(genapp.getBaseURL().replace(
								"/appexe/", "")
								+ ":8080/appexe/api/download/bgm/"
								+ genapp.getProjectId()
								+ "/"
								+ bgms.getFilename().replace(" ", "%20"));
						InputStream in = url.openStream();
						OutputStream out = new BufferedOutputStream(
								new FileOutputStream(config.getOutputDir()
										+ genapp.getAppTitle()
										+ "/resources/bgm/"
										+ bgms.getFilename()));
						for (int b; (b = in.read()) != -1;) {
							out.write(b);
						}
						out.close();
						in.close();
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		}

		if (resource.getVideoList() != null) {
			if (resource.getVideoList().size() > 0) {
				FolderCreator.createFolder(config.getOutputDir(),
						genapp.getAppTitle() + "/resources/video");
				for (Videos videos : resource.getVideoList()) {
					try {
						URL url = new URL(genapp.getBaseURL().replace(
								"/appexe/", "")
								+ ":8080/appexe/api/download/video/"
								+ genapp.getProjectId()
								+ "/"
								+ videos.getFilename().replace(" ", "%20"));
						InputStream in = url.openStream();
						OutputStream out = new BufferedOutputStream(
								new FileOutputStream(config.getOutputDir()
										+ genapp.getAppTitle()
										+ "/resources/video/"
										+ videos.getFilename()));
						for (int b; (b = in.read()) != -1;) {
							out.write(b);
						}
						out.close();
						in.close();
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		}

		if (resource.getSoundList() != null) {
			if (resource.getSoundList().size() > 0) {
				FolderCreator.createFolder(config.getOutputDir(),
						genapp.getAppTitle() + "/resources/soundeffect");
				for (SoundEffects soundEff : resource.getSoundList()) {
					try {
						URL url = new URL(genapp.getBaseURL().replace(
								"/appexe/", "")
								+ ":8080/appexe/api/download/soundeffect/"
								+ genapp.getProjectId()
								+ "/"
								+ soundEff.getFilename().replace(" ", "%20"));
						InputStream in = url.openStream();
						OutputStream out = new BufferedOutputStream(
								new FileOutputStream(config.getOutputDir()
										+ genapp.getAppTitle()
										+ "/resources/soundeffect/"
										+ soundEff.getFilename()));
						for (int b; (b = in.read()) != -1;) {
							out.write(b);
						}
						out.close();
						in.close();
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		}
		System.out.println("Downloading Resources.... DONE!");
	}

}