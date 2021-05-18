package com.mobilous.mobileweb.util;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.Map;

import org.springframework.util.ResourceUtils;

import freemarker.template.Configuration;
import freemarker.template.DefaultObjectWrapper;
import freemarker.template.Template;

public class FileRenderer {

	public static void renderFile(Settings settings, String ouputFilename,
			String templateFilename, Map dataModel) throws Exception {
		Configuration cfg = settings.getFileRendererConfig();
		Template temp = cfg.getTemplate(templateFilename);
		FileOutputStream outputFile = new FileOutputStream(
				settings.getProjectOutputDir() + ouputFilename);
		Writer out = new OutputStreamWriter(outputFile, "UTF8");
		temp.process(dataModel, out);
		out.flush();
		//System.out.println(settings.getProjectOutputDir() + ouputFilename);
	}
	
	public static void renderFileForPreview(String ouputFilename, String templateFilename, Map dataModel) throws Exception {
		String templatesPath = ResourceUtils.getFile("classpath:../../resources/templates/").getAbsolutePath();
		String outputHTMLFilePath = ResourceUtils.getFile("classpath:../../resources/").getAbsolutePath();
		
		Configuration cfg = new Configuration();
		cfg.setDirectoryForTemplateLoading(new File(templatesPath));
		cfg.setObjectWrapper(new DefaultObjectWrapper());
		
		Template temp = cfg.getTemplate(templateFilename);
		
		File previewFile = new File(outputHTMLFilePath + "/" + ouputFilename);
		if(previewFile.exists()) {
			previewFile.delete();
		}
		
		FileOutputStream outputFile = new FileOutputStream(outputHTMLFilePath + "/" + ouputFilename);
		Writer out = new OutputStreamWriter(outputFile, "UTF8");
		temp.process(dataModel, out);
		out.flush();
		
		
		///Users/Akhil/Documents/Workspace-Mobilous/.metadata/.plugins/org.eclipse.wst.server.core/tmp1/wtpwebapps/mobileweb2/resourcesindex_2.html
	}
}
