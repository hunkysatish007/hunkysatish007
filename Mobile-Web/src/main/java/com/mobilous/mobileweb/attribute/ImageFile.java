package com.mobilous.mobileweb.attribute;

import com.mobilous.mobileweb.app.GenApp;

public class ImageFile extends File {

	private String type = "Image";
	private String imageName = "";
	private String author = "";
	private String copyright = "";

	public String getImageName() {
		return imageName;
	}

	public void setImageName(String imageName) {
		this.imageName = imageName;
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
		// http://210.189.125.252/appexe/mato/100/resources/image/
		// http://210.189.125.252:8080/appexe/api/download/image/100/cyborg.jpg
		// http://210.189.125.252[port]/appexe/api/download/[type]/[projectID]/[filename]
		
		
		if (url.contains("/appexe/images/system/")){
			// for system images URL
			if(genapp.getProjectstate().equalsIgnoreCase("preview")){
				return "/mobilewebgen/resources/images/system/";
			}
			else{
				return "images/system/";
			}
		}else if (!url.contains("/" + genapp.getUserId() + "/" + genapp.getProjectId() + "/")){
			return url;
		}
		else{
			// user uploaded Images URL
			if (genapp.getProjectstate().equalsIgnoreCase("preview")){
				return genapp.getBaseURL().substring(0,genapp.getBaseURL().indexOf("/appexe")) + ":8080/appexe/api/download/image/" + genapp.getProjectId() + "/";
			}
			else{
				return "resources/image/";
			}
		}
	}

	@Override
	public void setUrl(String url) {
		this.url = url;
	}
}
