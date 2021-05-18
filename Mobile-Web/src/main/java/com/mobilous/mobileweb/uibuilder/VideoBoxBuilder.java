package com.mobilous.mobileweb.uibuilder;

import com.mobilous.mobileweb.EventBuilder.VideoBoxEventBuilder;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.VideoBox;
import com.mobilous.mobileweb.util.Utility;

public class VideoBoxBuilder {
	
	public static StringBuilder build(BaseView baseView, GenApp genApp){
		
		VideoBox videoBox = (VideoBox)baseView;
		
		StringBuilder videoBoxBuilder = new StringBuilder();
		
		videoBoxBuilder.append("{id:\"").append(videoBox.getUiid()).append("\",");
		videoBoxBuilder.append("name:\"").append(videoBox.getName()).append("\",");
		videoBoxBuilder.append("viewtype:\"").append(videoBox.getViewType()).append("\",");
		videoBoxBuilder.append("hidden:").append(videoBox.isHidden()).append(",");
		videoBoxBuilder.append("autoplay:\"").append(videoBox.isStartPlay()).append("\",");
		videoBoxBuilder.append("source:\"").append(videoBox.getVideoFile().getSrcLocation()).append("\",");
		
		if(videoBox.getVideoFile() != null) {
			String value ="";
			
			if(videoBox.getVideoFile().getSrcLocation().equalsIgnoreCase("bundle")){
				if(videoBox.getVideoFile().getFileName()!=""){
					value = (videoBox.getVideoFile().getFileExt()!="")?(videoBox.getVideoFile().getFileName() + "." + videoBox.getVideoFile().getFileExt())
										:(videoBox.getVideoFile().getFileName());
				}
			}else if(videoBox.getVideoFile().getSrcLocation().equalsIgnoreCase("url")){
				value = videoBox.getVideoFile().getVideoName();
				
			}else if(videoBox.getVideoFile().getSrcLocation().equalsIgnoreCase("remoteFile")){
				value = videoBox.getVideoFile().getVideoName();
			}
			
			if ((value.contains("[")) && (value.contains("]"))) {
				videoBoxBuilder.append("src:\"").append("").append("\",");
				videoBoxBuilder.append("template:\"").append(value).append("\",");
			}else {
				videoBoxBuilder.append("src:\"").append(value).append("\",");
				videoBoxBuilder.append("template:\"").append("").append("\",");
			}
			
			if(videoBox.getVideoFile().getSrcLocation().equalsIgnoreCase("url")){
				videoBoxBuilder.append("data_video_file:\"").append(videoBox.getVideoFile().getVideoName()).append("\",");
			}else{
				
				videoBoxBuilder.append("data_video_file:\"").append(value).append("\",");
			}
		}
		else {
			videoBoxBuilder.append("src:\"").append("").append("\","); 
		}
		
		// Hardcoded value - data source unknown
		videoBoxBuilder.append("poster:\"").append("http://www.mobilous.com/en/img/mobilous_logo.png").append("\",");
		// Hardcoded value -> Where should we read it from?
		videoBoxBuilder.append("type:\"").append("video/mp4").append("\",");
		// Hardcoded value - data source unknown
		videoBoxBuilder.append("controls:\"").append("controls").append("\","); 
		// Hardcoded value - data source unknown
		videoBoxBuilder.append("codecs:\"").append("avc1.42E01E, mp4a.40.2, mp4v.20.240").append("\",");
		
		videoBoxBuilder.append("taborder:\"").append(videoBox.getTabOrder()).append("\",");
		videoBoxBuilder.append("frame:{").append(FrameBuilder.build(videoBox.getFrame())).append("},");
		// Hardcoded value - data source unknown
		videoBoxBuilder.append("lineheight:\"").append("85").append("\",");
		//Events
		if(videoBox.getEvent()!=null){
			videoBoxBuilder.append("events:{");
				for(Event event: baseView.getEvent()){

					StringBuilder actions = VideoBoxEventBuilder.buildEvent(genApp,baseView,event);
					videoBoxBuilder.append(actions);
				}
				Utility.removeCommaFromLast(videoBoxBuilder);
				videoBoxBuilder.append("}");
		}
		videoBoxBuilder.append("}");
		
		return videoBoxBuilder;
		
		
	}

}
