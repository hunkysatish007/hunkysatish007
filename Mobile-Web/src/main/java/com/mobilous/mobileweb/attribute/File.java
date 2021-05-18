package com.mobilous.mobileweb.attribute;

import com.mobilous.mobileweb.app.GenApp;

public abstract class File {

	protected String srcLocation = "";
	protected String fileName = "";
	protected String fileExt = "";
	protected String url = "";

	public abstract String getType();

	public abstract String getSrcLocation();

	public abstract void setSrcLocation(String srcLocation);

	public abstract String getFileName();

	public abstract void setFileName(String fileName);

	public abstract String getFileExt();

	public abstract void setFileExt(String fileExt);

	public abstract String getUrl(GenApp genapp);

	public abstract void setUrl(String url);

}
