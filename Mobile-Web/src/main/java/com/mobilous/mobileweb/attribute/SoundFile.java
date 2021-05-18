package com.mobilous.mobileweb.attribute;

import com.mobilous.mobileweb.app.GenApp;

public class SoundFile extends File {

	private String type = "Sound";
	private String soundName = "";
	private String author = "";
	private String copyright = "";
	private String format = "";
	private int length = -1;
	private String srcLocation = "";
	private String soundURL = "";

	public String getSoundName() {
		return soundName;
	}

	public void setSoundName(String soundName) {
		this.soundName = soundName;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getCopyright() {
		return copyright;
	}

	public void setCopyright(String copyright) {
		this.copyright = copyright;
	}

	public String getFormat() {
		return format;
	}

	public void setFormat(String format) {
		this.format = format;
	}

	public int getLength() {
		return length;
	}

	public void setLength(int length) {
		this.length = length;
	}

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
		if(srcLocation.equalsIgnoreCase("remoteFile")){
			return this.url;
		}
		if (!url.contains("/" + genapp.getUserId() + "/" + genapp.getProjectId() + "/")){
			return url;
		}else if (genapp.getProjectstate().equalsIgnoreCase("preview")){
			return genapp.getBaseURL().substring(0,
						genapp.getBaseURL().indexOf("/appexe"))
						+ ":8080/appexe/api/download/bgm/"
						+ genapp.getProjectId()
						+ "/";
		}else {
			return "resources/bgm/";
		}
	}

	@Override
	public void setUrl(String url) {
		this.url = url;
	}

	public String getSoundURL() {
		return soundURL;
	}

	public void setSoundURL(String soundURL) {
		this.soundURL = soundURL;
	}

}
