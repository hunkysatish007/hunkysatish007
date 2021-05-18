package com.mobilous.mobilegen;
//package com.dvox.mobilegen;
//
//import junit.framework.Assert;
//
//import org.junit.Test;
//
//public class ApplicationRendererTest {
//
//	@Test
//	public void testLocalFileParser() {
//		String message = "Hello World!";
//		Assert.assertEquals(12, message.length());
//
//		try {
//			// Settings config = new Settings();
//			// config.setProjectPath("files/");
//			//
//			// File file = new File("config/config.plist");
//			//
//			// NSDictionary rootDict =
//			// (NSDictionary)PropertyListParser.parse(file);
//			// for(String key: rootDict.allKeys()){
//			// if(key.equalsIgnoreCase("output_dir"))
//			// config.setOutputDir(rootDict.objectForKey(key).toString());
//			// else if(key.equalsIgnoreCase("templates_dir"))
//			// config.setTemplatesDir(rootDict.objectForKey(key).toString());
//			// }
//			// config.setFileRendererConfig();
//			//
//			// ADFParser parser = new ADFParser(new LocalPlistLocator(config));
//			//
//			//
//			// GenApp genapp = parser.parseStream();
//			//
//			// FolderCreator folderCreator = new FolderCreator();
//			// folderCreator.generateProjectFolders(config.getOutputDir(),
//			// genapp.getAppTitle());
//			// config.setProjectOutputDir(genapp.getAppTitle());
//			//
//			//
//			// PageBuilder pageBuilder = new PageBuilder(genapp);
//			//
//			// pageBuilder.buildHTML5(config,genapp);
//
//		} catch (Exception e) {
//			e.printStackTrace();
//			// Assert.fail(e.getMessage());
//		}
//	}
//
//}