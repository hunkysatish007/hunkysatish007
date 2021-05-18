package com.mobilous.mobileweb.attribute;

import com.mobilous.mobileweb.app.GenApp;

public class VideoFile extends File {

	private String type = "Video";
	private String videoName = "";
	private String author = "";
	private String copyright = "";
	private String format = "";
	private int length = -1;

	public String getVideoName() {
		return videoName;
	}

	public void setVideoName(String videoName) {
		this.videoName = videoName;
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
		if (genapp.getProjectstate().equalsIgnoreCase("preview"))
				return genapp.getBaseURL().substring(0,
						genapp.getBaseURL().indexOf("/appexe"))
						+ ":8080/appexe/api/download/video/"
						+ genapp.getProjectId()
						+ "/";
		else
			return "resources/video/";
	}

	@Override
	public void setUrl(String url) {
		this.url = url;
	}
}
