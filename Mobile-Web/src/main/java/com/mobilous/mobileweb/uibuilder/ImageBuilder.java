 package com.mobilous.mobileweb.uibuilder;
 
 import com.mobilous.mobileweb.app.GenApp;
 import com.mobilous.mobileweb.ui.BaseView;
 import com.mobilous.mobileweb.ui.Image;
 
 public class ImageBuilder {
 
 	public static StringBuilder build(BaseView baseView, GenApp genapp) {
 
 		/*
 		 * {id:"ui-8",value:"bg.jpg",template:'',name:"Image",viewtype:"Image",
 		 * frame:{x:0,y:0,width:320,height:460}}
 		 */
 		/*
 		 * {"template":"","id":"ui-6","frame":{"height":44.0,"width":44.0,"y":17.0
 		 * ,"x":30.0},
 		 * "name":"Image_20130204193433238","value":"Koala2.jpg","viewtype"
 		 * :"Image"}
 		 */
 
 		/*
 		 * {id:"ui-8",value:"bg.jpg",template:'',name:"Image",viewtype:"Image",
 		 * frame:{x:0,y:0,width:320,height:460}}
 		 */
 
 		// Mine
 		/*
 		 * "template":"","id":"ui-6","frame":{"height":44.0,"width":44.0,"y":17.0
 		 * ,"x":30.0},
 		 * "name":"Image_20130204193433238","value":"Koala2.jpg","viewtype"
 		 * :"Image"
 		 */
 
 		//JSONObject jsonObject = new JSONObject();
 
 		// JSON Version
 		// jsonObject.put("id", image.getUiid());
 		// String value = image.getImage().getFileName() + "." +
 		// image.getImage().getFileExt();
 		// if(value.contains("[")) {
 		// jsonObject.put("value", "");
 		// jsonObject.put("template", value);
 
 		// }else{
 		// jsonObject.put("value", value);
 		// jsonObject.put("template", "");
 		// }
 
 		// jsonObject.put("name", image.getName());
 		// jsonObject.put("viewtype", image.getViewType());
 		// jsonObject.put("frame", FrameBuilder.build(image.getFrame()));
 
 		// return jsonObject;
 		
 		
 		Image image = (Image) baseView;
 
 		StringBuilder imageBuilder = new StringBuilder();
 
 		imageBuilder.append("{id:\"").append(image.getUiid()).append("\",");
 		imageBuilder.append("name:\"").append(image.getName()).append("\",");
 		imageBuilder.append("source:\"").append(image.getImage().getSrcLocation()).append("\",");
 		String value ="";
 		if(image.getImage().getFileName()!=""){
 			value = image.getImage().getFileName();
 		}
 		if(image.getImage().getSrcLocation().equalsIgnoreCase("bundle")){
 			value = (image.getImage().getFileExt()!="")?(image.getImage().getFileName() + "."
 				+ image.getImage().getFileExt()):(image.getImage().getFileName());
 		}
 		if(image.getImage().getSrcLocation().equalsIgnoreCase("url")){
 			value = image.getImage().getImageName();//image.getImage().getUrl(genapp) + value;
 		}
 		if(!image.getImage().getUrl(genapp).equalsIgnoreCase("") && image.getImage().getFileExt().equalsIgnoreCase("") && image.getImage().getSrcLocation().equalsIgnoreCase("bundle")){
 			//value = image.getImage().getUrl(genapp) + image.getImage().getFileName();
 		}
 		if(!image.getFieldname().equalsIgnoreCase("")){
 			if(!image.getFieldname().equalsIgnoreCase("[]") && value.length()>0)//Bug #10568 Fix		
 				value = image.getFieldname();
 		}
 		if ((value.contains("[")) && (value.contains("]"))) {
 			imageBuilder.append("value:\"").append("").append("\",");
 			imageBuilder.append("template:\"").append(value).append("\",");
 
 		} else {
 			imageBuilder.append("value:\"").append(value).append("\",");
 			imageBuilder.append("template:\"").append("").append("\",");
 		}
 		if(image.getScalemode() != "")
 			imageBuilder.append("scalemode:\"").append(image.getScalemode()).append("\",");
 		if(image.getImage().getSrcLocation().equalsIgnoreCase("qrview")) {
 			if(image.getQRstring() != null)
 				imageBuilder.append("qrstring:\"").append(image.getQRstring()).append("\",");
 			else
 				imageBuilder.append("qrstring:\"").append("\",");
 		}
 		if(image.getImage().getSrcLocation().equalsIgnoreCase("reCaptcha")) {
 			if(image.getCaptchaKeyString() != null)
 				imageBuilder.append("reCaptcha:\"").append(image.getCaptchaKeyString()).append("\",");
 			else
 				imageBuilder.append("reCaptcha:\"").append("\",");
 		}
 		imageBuilder.append("hidden:\"").append(image.isHidden()).append("\",");
 		imageBuilder.append("viewtype:\"").append(image.getViewType())
 				.append("\",");
 		imageBuilder.append("taborder:\"").append(image.getTabOrder()).append("\",");
 		imageBuilder.append("frame:{")
 				.append(FrameBuilder.build(image.getFrame())).append("},");
 		imageBuilder.append("border:{").append(BorderBuilder.build(image.getBorderWidth(),image.getBorderStyle(), image.getBorderColor())).append("}");
 		imageBuilder.append("}");
 
 		return imageBuilder;
 
 	}
 
 }
