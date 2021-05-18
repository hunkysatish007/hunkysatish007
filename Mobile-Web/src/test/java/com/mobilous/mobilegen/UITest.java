package com.mobilous.mobilegen;
//package com.dvox.mobilegen;
//
//import java.io.BufferedReader;
//import java.io.File;
//import java.io.FileInputStream;
//import java.io.InputStreamReader;
//
//import org.junit.Test;
//
//import com.dd.plist.NSDictionary;
//import com.dd.plist.PropertyListParser;
//import com.dvox.mobilegen.app.GenApp;
//import com.dvox.mobilegen.parser.ADFParser;
//import com.dvox.mobilegen.uibuilder.PageBuilder;
//import com.dvox.mobilegen.util.FolderCreator;
//import com.dvox.mobilegen.util.LocalPlistLocator;
//import com.dvox.mobilegen.util.Settings;
//
//public class UITest {
//
//	@Test
//	public void testLocalFileParser() {
//		try {
//			Settings config = new Settings();
//			config.setProjectPath("src/test/resources/uitest/input/");
//
//			File file = new File(
//					"src/test/resources/uitest/config/config.plist");
//
//			NSDictionary rootDict = (NSDictionary) PropertyListParser
//					.parse(file);
//			for (String key : rootDict.allKeys()) {
//				if (key.equalsIgnoreCase("output_dir"))
//					config.setOutputDir("src/test/resources/uitest/"
//							+ rootDict.objectForKey(key).toString());
//				else if (key.equalsIgnoreCase("templates_dir"))
//					config.setTemplatesDir(rootDict.objectForKey(key)
//							.toString());
//			}
//			// config.setFileRendererConfig();
//
//			ADFParser parser = new ADFParser(new LocalPlistLocator(config));
//
//			GenApp genapp = parser.parseStream();
//
//			FolderCreator folderCreator = new FolderCreator();
//			FolderCreator.generateProjectFolders(config.getOutputDir(),
//					genapp.getAppTitle());
//			config.setProjectOutputDir(genapp.getAppTitle());
//
//			// PageBuilder pageBuilder = new PageBuilder(genapp);
//
//			PageBuilder.buildHTML5(config, genapp);
//
//			String line = "";
//			StringBuffer outputStr = new StringBuffer();
//
//			File output = new File(
//					"src/test/resources/uitest/output/WebAppExeUITest/index.html");
//			BufferedReader br = new BufferedReader(new InputStreamReader(
//					new FileInputStream(output)));
//
//			while ((line = br.readLine()) != null)
//				outputStr.append(line);
//			// Assert.assertTrue(outputStr.toString().contains("<label id=\"ui-1\" data-adf-name=\"lblName\">Label</label>"));
//			// Assert.assertTrue(outputStr.toString().contains("<input id=\"ui-2\" type=\"text\" name=\"txtName\" "
//			// +
//			// "data-adf-name=\"txtName\" placeholder=\"\" />"));
//
//			br.close();
//
//		} catch (Exception e) {
//			e.printStackTrace();
//			// Assert.fail(e.getMessage());
//		}
//	}
//
//}