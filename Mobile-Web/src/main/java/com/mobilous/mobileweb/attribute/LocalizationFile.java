package com.mobilous.mobileweb.attribute;

import com.mobilous.mobileweb.app.GenApp;

public class LocalizationFile extends File {

	private String type = "Localization";

	@Override
	public String getType() {
		return type;
	}

	@Override
	public String getSrcLocation() {
		return srcLocation;
	}

	@Override
	public void setSrcLocation(String srcLocation) {
		this.srcLocation = srcLocation;
	}

	@Override
	public String getFileName() {
		return fileName;
	}

	@Override
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	@Override
	public String getFileExt() {
		return fileExt;
	}

	@Override
	public void setFileExt(String fileExt) {
		this.fileExt = fileExt;
	}

	@Override
	public String getUrl(GenApp genapp) {
		if (genapp.getProjectstate().equalsIgnoreCase("preview"))
			return genapp.getBaseURL().substring(0,
					genapp.getBaseURL().indexOf("/appexe"))
					+ ":8080/appexe/api/download/l10ns/"
					+ genapp.getProjectId() + "/";
		return url;
	}

	@Override
	public void setUrl(String url) {
		this.url = url;
	}

}
