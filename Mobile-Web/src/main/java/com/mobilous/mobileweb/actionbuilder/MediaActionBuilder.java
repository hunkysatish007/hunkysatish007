package com.mobilous.mobileweb.actionbuilder;

import com.mobilous.mobileweb.action.Action;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.param.MediaController;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.uibuilder.ColorBuilder;
import com.mobilous.mobileweb.uibuilder.ImageFileBuilder;

public class MediaActionBuilder {

	public static Object build(GenApp genapp, BaseView baseview, Event event,
			Action action) {
		StringBuilder actionstr=new StringBuilder();
		MediaController mediaController = (MediaController) action
				.getParameters();
		
		StringBuilder applyConditionIfAny = new StringBuilder();
		
		if(mediaController.getCondition() != null){
			applyConditionIfAny.append(ConditionBuilder.setCondition(mediaController.getCondition(), baseview));
		}
		
		if (mediaController.getMethod().equalsIgnoreCase("Play")) {
			 actionstr.append("{method:\"play\",category:\"MediaAction\", name:'")
			.append(mediaController.getTargetUI())
			.append("'").append(applyConditionIfAny).append("},");
			
		}
		if (mediaController.getMethod().equalsIgnoreCase("pause")) {
			 actionstr.append("{method:\"pause\",category:\"MediaAction\", name:'")
			.append(mediaController.getTargetUI())
			.append("'").append(applyConditionIfAny).append("},");
			
		}
		if (mediaController.getMethod().equalsIgnoreCase("StopPlay")) {
			 actionstr.append("{method:\"stopPlay\",category:\"MediaAction\", name:'")
			.append(mediaController.getTargetUI())
			.append("'").append(applyConditionIfAny).append("},");
			
		}
		if (mediaController.getMethod().equalsIgnoreCase("Record")) {
			 actionstr.append("{method:\"record\",category:\"MediaAction\", name:'")
			.append(mediaController.getTargetUI())
			.append("'").append(applyConditionIfAny).append("},");
			
		}
		if (mediaController.getMethod().equalsIgnoreCase("StopRecord")) {
			 actionstr.append("{method:\"stopRecord\",category:\"MediaAction\", name:'")
			.append(mediaController.getTargetUI())
			.append("'").append(applyConditionIfAny).append("},");
			
		}
		if (mediaController.getMethod().equalsIgnoreCase("SlowPlay")) {
			 actionstr.append("{method:\"slowPlay\",category:\"MediaAction\", name:'")
			.append(mediaController.getTargetUI())
			.append("'").append(applyConditionIfAny).append("},");
			
		}
		if (mediaController.getMethod().equalsIgnoreCase("SlowBackPlay")) {
			 actionstr.append("{method:\"slowReversePlay\",category:\"MediaAction\", name:'")
			.append(mediaController.getTargetUI())
			.append("'").append(applyConditionIfAny).append("},");
			
		}
		if (mediaController.getMethod().equalsIgnoreCase("FastPlay")) {
			 actionstr.append("{method:\"fastPlay\",category:\"MediaAction\", name:'")
			.append(mediaController.getTargetUI())
			.append("'").append(applyConditionIfAny).append("},");
			
		}
		if (mediaController.getMethod().equalsIgnoreCase("FastBackPlay")) {
			 actionstr.append("{method:\"fastReversePlay\",category:\"MediaAction\", name:'")
			.append(mediaController.getTargetUI())
			.append("'").append(applyConditionIfAny).append("},");
			
		}
		if (mediaController.getMethod().equalsIgnoreCase("FastForward")) {
			 actionstr.append("{method:\"fastForward\",category:\"MediaAction\", name:'")
			.append(mediaController.getTargetUI())
			.append("'").append(applyConditionIfAny).append("},");
			
		}
		if (mediaController.getMethod().equalsIgnoreCase("FastBackward")) {
			 actionstr.append("{method:\"fastBackward\",category:\"MediaAction\", name:'")
			.append(mediaController.getTargetUI())
			.append("'").append(applyConditionIfAny).append("},");
			
		}
		if (mediaController.getMethod().equalsIgnoreCase("PlaySE")) {
			
			String filename = mediaController.getFile().getFileName();
			String fileext = mediaController.getFile().getFileExt();
			if(fileext.length() > 0)
				filename = filename +"."+fileext;
			
			String fileloc = mediaController.getFile().getSrcLocation();
			if(fileloc.equalsIgnoreCase("bundle")){
				actionstr.append("{method:\"PlaySE\",category:\"MediaAction\", params:{")
				 .append("status:'"+mediaController.getFile().getSrcLocation()+"',")
				 .append("url:'',")
				 .append("filename:'"+filename+"'}")
 			 .append(applyConditionIfAny).append("},");
			}
			else{
				actionstr.append("{method:\"PlaySE\",category:\"MediaAction\", params:{")
				 .append("status:'"+mediaController.getFile().getSrcLocation()+"',")
				 .append("url:'"+mediaController.getFile().getUrl(genapp)+"',")
				 .append("filename:'"+filename+"'}")
				 .append(applyConditionIfAny).append("},");
			}
		}
		if (mediaController.getMethod().equalsIgnoreCase("TakePhoto")) {
			 actionstr.append("{method:\"TakePhoto\",category:\"MediaAction\", name:'")
				.append(mediaController.getTargetUI())
				.append("'").append(",params:{")
				.append("library:'").append(mediaController.getLibrary()).append("'")
				.append(",photoquality:'").append(mediaController.getPhotoquality())
				.append("'").append(",showWaterMark:'").append(mediaController.isShowWaterMark()).append("'");
//			 if(mediaController.getWatermark().equalsIgnoreCase("")){//Check later
//				 actionstr.append("'").append(",watermark:'").append(mediaController.getWatermark());
//			 }
			 if(mediaController.isShowWaterMark()) {
				 actionstr.append(",watermarkType:'").append(mediaController.getWatermarkType());
				 if(mediaController.getWatermarkType().equalsIgnoreCase("Text")) {
					 actionstr.append("'").append(",watermarkText:'").append(mediaController.getWatermarkText())
					 	.append("'").append(",watermarkPosition:'").append(mediaController.getWatermarkPosition());
					 actionstr.append("'").append(",watermarkTextColor:{").append(ColorBuilder.build(mediaController.getWatermarkTextColor())).append("}");
				 }else if(mediaController.getWatermarkType().equalsIgnoreCase("Image")) {
					 actionstr.append("'").append(",watermarkImage:'");
					 if(mediaController.getWatermarkImage().getFileName().contains("[") && mediaController.getWatermarkImage().getFileName().contains("]")){
						 actionstr.append(mediaController.getWatermarkImage().getFileName());
					 }else {
						 if(mediaController.getWatermarkImage().getSrcLocation().equalsIgnoreCase("remoteFile")){
							 actionstr.append(mediaController.getWatermarkImage().getFileName());
						 }else if(mediaController.getWatermarkImage().getSrcLocation().equalsIgnoreCase("Bundle")){
								actionstr.append(mediaController.getWatermarkImage().getFileName() + "." + mediaController.getWatermarkImage().getFileExt());
						 }else{
								actionstr.append(mediaController.getWatermarkImage().getUrl(genapp));
						}
					 }
					 
					 actionstr.append("'").append(",source:'").append(mediaController.getWatermarkImage().getSrcLocation())
					 	.append("'").append(",watermarkPosition:'").append(mediaController.getWatermarkPosition())
					 	.append("'").append(",watermarkImageWidth:").append(mediaController.getWatermarkImageWidth())
					 	.append(",watermarkImageHeight:").append(mediaController.getWatermarkImageHeight());
				 }
			 }
			 actionstr.append("}").append(applyConditionIfAny).append("},");
		}
		if (mediaController.getMethod().equalsIgnoreCase("ShareVia")) {
			 actionstr.append("{method:\"ShareVia\",category:\"MediaAction\", name:'")
				.append(mediaController.getTargetUI())
				.append("', params:{")
				.append("targetpage:\""+mediaController.getTargetPage()+"\",")
				.append("contenttype:\""+mediaController.getContenttype()+"\"}")
			    .append(applyConditionIfAny).append("},");
		}
		if (mediaController.getMethod().equalsIgnoreCase("SwitchCamera")) {
			actionstr.append("{method:\"SwitchCamera\",category:\"MediaAction\", name:\"")
				.append(mediaController.getTargetUI())
				.append("\", params:{")
			 .append("side:\""+mediaController.getSide()+"\"}")
			 .append(applyConditionIfAny).append("},");
		}
		if (mediaController.getMethod().equalsIgnoreCase("QRScanner")) {
			actionstr.append("{method:\"QRScanner\",category:\"MediaAction\", name:\"")
				//.append(mediaController.getTargetUI())
				.append(mediaController.getMedia())
				.append("\", params:{")
				.append("value:\""+mediaController.getMedia()+"\",")
 				.append("targetpage:\""+mediaController.getTargetPage()+"\",")
 				.append("type:\""+mediaController.getType()+"\",")
 				.append("multiscan:\""+mediaController.isMultiScan()+"\"}")
 				.append(applyConditionIfAny).append("},");
		}
		if (mediaController.getMethod().equalsIgnoreCase("OpenGallery")) {
			actionstr.append("{method:\"OpenGallery\",category:\"MediaAction\", name:\"")
				.append(mediaController.getTargetUI())
				.append("\", params:{")
			    .append("type:\""+mediaController.getMedia()+"\",");
			if(mediaController.isMultiple()) {
				actionstr.append("multiple:\""+mediaController.isMultiple()+"\",")
				    .append("limit:\""+mediaController.getLimit()+"\",");
					actionstr.append("refMediaUI:\"").append(mediaController.getRefMediaUI().replace("\"", "'")+"\",");
			}
			actionstr.append("filetype:\""+mediaController.getFiletype()+"\",")
				.append("fileNameUI:\""+mediaController.getFileNameUI()+"\",")
				.append("fileSizeUI:\""+mediaController.getFileSizeUI()+"\",")
				.append("targetpage:\""+mediaController.getTargetPage()+"\"}")
			    .append(applyConditionIfAny).append("},");
		}
		if (mediaController.getMethod().equalsIgnoreCase("OpenGalleryMultiple")) {
			actionstr.append("{method:\"OpenGalleryMultiple\",category:\"MediaAction\", name:\"")
				.append(mediaController.getTargetUI())
				.append("\", params:{")
			    .append("mediatype:\""+mediaController.getMedia()+"\",")
			    .append("filetype:\""+mediaController.getFiletype()+"\",");
			if(mediaController.isMultiple()) {
				actionstr.append("multiple:\""+mediaController.isMultiple()+"\",")
				    .append("limit:\""+mediaController.getLimit()+"\",");
					actionstr.append("refMediaList:\"").append(mediaController.getRefMediaList().replace("\"", "'")+"\",");
					actionstr.append("refNameUIList:\"").append(mediaController.getRefNameUIList().replace("\"", "'")+"\",");
					actionstr.append("refNameUIList:\"").append(mediaController.getRefSizeUIList().replace("\"", "'")+"\",");
			}
			actionstr.append("targetpage:\""+mediaController.getTargetPage()+"\"}")
			    .append(applyConditionIfAny).append("},");
		}
		if (mediaController.getMethod().equalsIgnoreCase("UploadMedia")) {
			actionstr.append("{method:\"UploadMedia\",category:\"MediaAction\", name:\"")
					.append(mediaController.getTargetUI())
					.append("\", params:{")
					.append("type:\""+mediaController.getMedia()+"\",")
					.append("targetLocation:\""+mediaController.getTargetLocation()+"\",")
					.append("targetpage:\""+mediaController.getTargetPage()+"\",")
					.append("sourceUIPart:\""+mediaController.getSourceUI()+"\",");
			
			if(mediaController.isThumbnail()){
				actionstr.append("thumbnail:\"").append("true").append("\",")
						.append("refThumbnailUI:\""+mediaController.getRefThumbnailUI()+"\"}");
			}else
				actionstr.append("thumbnail:\"").append("false").append("\"}");
			
			if(mediaController.isShowProgress()){
				actionstr.replace(actionstr.lastIndexOf("}"), actionstr.lastIndexOf("}")+1, ",");
				actionstr.append("showprogress:\"").append("true").append("\",")
						.append("refProgressUI:\""+mediaController.getRefProgressUI()+"\"}");
			}
			
			actionstr.append(applyConditionIfAny).append("},");
		}
		if (mediaController.getMethod().equalsIgnoreCase("DownloadMedia")) {
			actionstr.append("{method:\"DownloadMedia\",category:\"MediaAction\", name:\"")
			.append(mediaController.getTargetUI())
			.append("\", params:{")
			.append("type:\""+mediaController.getMedia()+"\",")
			.append("source:\""+mediaController.getSource()+"\",")
			.append("sourceUIPart:\""+mediaController.getSourceUI()+"\",")
			.append("target:\""+mediaController.getLibrary()+"\",")
			.append("targetpage:\""+mediaController.getTargetPage()+"\"}")
			.append(applyConditionIfAny).append("},");
		}else if (mediaController.getMethod().equalsIgnoreCase("DownloadFile")) {
			actionstr.append("{method:\"DownloadFile\",category:\"MediaAction\", name:\"")
			.append(mediaController.getTargetUI())
			.append("\", params:{")
			.append("refFileType:\""+mediaController.getRefFiletype()+"\",")
			.append("source:\""+mediaController.getSource()+"\",")
			.append("sourceUIPart:\""+mediaController.getSourceUI()+"\",")
			.append("target:\""+mediaController.getLibrary()+"\",")
			.append("targetpage:\""+mediaController.getTargetPage()+"\"}")
			.append(applyConditionIfAny).append("},");
		}else if (mediaController.getMethod().equalsIgnoreCase("SaveMedia")) {
			actionstr.append("{method:\"SaveMedia\",category:\"MediaAction\", name:\"")
			.append(mediaController.getTargetUI())
			.append("\", params:{")
			.append("type:\""+mediaController.getMedia()+"\",")
			.append("sourceUIPart:\""+mediaController.getSourceUI()+"\",")
			.append("targetpage:\""+mediaController.getTargetPage()+"\"}")
			.append(applyConditionIfAny).append("},");
		}
		if (mediaController.getMethod().equalsIgnoreCase("UploadFile")) {
			actionstr.append("{method:\"UploadFile\",category:\"MediaAction\", name:\"")
					.append(mediaController.getTargetUI())
					.append("\", params:{")
					.append("type:\""+mediaController.getFiletype()+"\",");
			if(mediaController.getFile().getSrcLocation().equalsIgnoreCase("bundle")){
				actionstr.append("src:\"").append("bundle").append("\",")
						.append("filename:\""+mediaController.getFile().getFileName()+"\"}");
			}else if(mediaController.getFile().getSrcLocation().equalsIgnoreCase("url")){
				actionstr.append("src:\"").append("url").append("\",")
						.append("url:\""+mediaController.getFile().getUrl(genapp)+"\"}");
			}else{
				actionstr.append("src:\""+mediaController.getFile().getSrcLocation()+"\"}");
			}
			
			if(mediaController.isShowProgress()){
				actionstr.replace(actionstr.lastIndexOf("}"), actionstr.lastIndexOf("}")+1, ",");
				actionstr.append("showprogress:\"").append("true").append("\",")
						.append("refProgressUI:\""+mediaController.getRefProgressUI()+"\"}");
			}
			
			actionstr.append(applyConditionIfAny).append("},");
		}
		if (mediaController.getMethod().equalsIgnoreCase("QRGenerate")) {
			actionstr.append("{method:\"QRGenerate\",category:\"MediaAction\", name:\"")
				.append(mediaController.getTargetUI())
				.append("\", params:{")
				.append("value:\""+mediaController.getSourceUI()+"\",")
 				.append("targetpage:\""+mediaController.getTargetPage()+"\"}")
 				.append(applyConditionIfAny).append("},");
		}

		
		return actionstr;
	}

}
