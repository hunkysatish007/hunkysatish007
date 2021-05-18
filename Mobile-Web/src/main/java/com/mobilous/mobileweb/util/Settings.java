package com.mobilous.mobileweb.util;

import java.io.File;
import java.io.IOException;

import freemarker.template.Configuration;
import freemarker.template.DefaultObjectWrapper;

public class Settings {

	private String key1 = "";
	private String key2 = "";
	private String key3 = "";
	private String key4 = "";
	private String servletPath = "";
	private String projectPath = "";
	private String outputDir = "";
	private String projectOutputDir = "";
	private String templatesDir = "";
	private String resourcesFolder = "";
	private String type = "";
	private String preview_path = "";

	private Configuration fileRendererConfig = null;

	private void setFileRendererConfig() {
		Configuration cfg = new Configuration();
		try {
			cfg.setDirectoryForTemplateLoading(new File(templatesDir));
		} catch (IOException e) {
			try {
				cfg.setDirectoryForTemplateLoading(new File("/usr/glassfish/glassfish/domains/domain1/eclipseApps/mobileweb3.1.1/resources/templates/"));
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		}
		cfg.setObjectWrapper(new DefaultObjectWrapper());
		fileRendererConfig = cfg;
	}
	
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getKey1() {
		return key1;
	}

	public String getResourcesFolder() {
		return resourcesFolder;
	}

	public void setResourcesFolder(String resourcesFolder) {
		this.resourcesFolder = resourcesFolder;
	}

	public void setKey1(String key1) {
		this.key1 = key1;
	}

	public String getKey2() {
		return key2;
	}

	public void setKey2(String key2) {
		this.key2 = key2;
	}

	public String getKey3() {
		return key3;
	}

	public void setKey3(String key3) {
		this.key3 = key3;
	}

	public String getKey4() {
		return key4;
	}

	public void setKey4(String key4) {
		this.key4 = key4;
	}

	public String getServletPath() {
		return servletPath;
	}

	public void setServletPath(String servletPath) {
		this.servletPath = servletPath;
	}

	public Configuration getFileRendererConfig() {
		return fileRendererConfig;
	}

	public String getOutputDir() {
		return outputDir;
	}

	public void setOutputDir(String outputDir) {
		this.outputDir = outputDir;
	}

	/**
	 * @param templatesDir
	 *            the templatesDir to set
	 */
	public void setTemplatesDir(String templatesDir) {
		this.templatesDir = templatesDir;
		setFileRendererConfig();
	}

	/**
	 * @return the templatesDir
	 */
	public String getTemplatesDir() {
		return templatesDir;
	}

	/**
	 * @param projectPath
	 *            the projectPath to set
	 */
	public void setProjectPath(String projectPath) {
		this.projectPath = projectPath;
	}

	/**
	 * @return the projectPath
	 */
	public String getProjectPath() {
		return projectPath;
	}

	/**
	 * @param projectOutputDir
	 *            the projectOutputDir to set
	 */
	public void setProjectOutputDir(String projectOutputDir) {
		this.projectOutputDir = outputDir + projectOutputDir + "/";
	}

	/**
	 * @return the projectOutputDir
	 */
	public String getProjectOutputDir() {
		return projectOutputDir;
	}

	public String getPreview_path() {
		return preview_path;
	}

	public void setPreview_path(String preview_path) {
		this.preview_path = preview_path;
	}

}
