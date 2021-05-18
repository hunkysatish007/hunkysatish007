package com.mobilous.mobileweb.uibuilder;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.attribute.ImageFile;

public class ImageFileBuilder {
	
	public static StringBuilder buildImageFile(GenApp genapp,ImageFile imagefile){
		StringBuilder imagefileStr = new StringBuilder();
		
		if (((imagefile.getFileName() == "") || (imagefile.getFileExt() == "")) && (!imagefile.getSrcLocation().equalsIgnoreCase("remoteFile"))) {
			return imagefileStr.append("");
		} else if (imagefile.getFileName().equalsIgnoreCase("none"))
			return imagefileStr.append("none");

		String URL = "";
		
		if((imagefile.getUrl(genapp).equalsIgnoreCase("")) && (imagefile.getSrcLocation().equalsIgnoreCase("bundle"))){
			imagefile.setUrl("");
		}
		
		URL = imagefile.getUrl(genapp);
		if(imagefile.getSrcLocation().equalsIgnoreCase("remoteFile")){
		imagefileStr.append(URL);
		}
		if(imagefile.getFileName() != ""){
			imagefileStr.append(imagefile.getFileName()).append(".");
		}
		imagefileStr.append(imagefile.getFileExt());

		return imagefileStr;
		
	}

}
