package com.mobilous.mobileweb.attribute;

import com.mobilous.mobileweb.app.GenApp;

public class HTMLFile extends File {

	private String type = "HTML";

	@Override
	public String getType() {
		// TODO Auto-generated method stub
		return type;
	}

	@Override
	public String getSrcLocation() {
		// TODO Auto-generated method stub
		return srcLocation;
	}

	@Override
	public void setSrcLocation(String srcLocation) {
		this.srcLocation = srcLocation;
	}

	@Override
	public String getFileName() {
		// TODO Auto-generated method stub
		return fileName;
	}

	@Override
	public void setFileName(String fileName) {
		// TODO Auto-generated method stub
		this.fileName = fileName;
	}

	@Override
	public String getFileExt() {
		// TODO Auto-generated method stub
		return fileExt;
	}

	@Override
	public void setFileExt(String fileExt) {
		// TODO Auto-generated method stub
		this.fileExt = fileExt;
	}

	@Override
	public String getUrl(GenApp genapp) {
		// TODO Auto-generated method stub
		return url;
	}

	@Override
	public void setUrl(String url) {
		// TODO Auto-generated method stub
		this.url = url;
	}

}
