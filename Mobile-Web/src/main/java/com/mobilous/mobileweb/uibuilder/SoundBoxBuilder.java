package com.mobilous.mobileweb.uibuilder;

import com.mobilous.mobileweb.EventBuilder.SoundBoxEventBuilder;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.SoundBox;
import com.mobilous.mobileweb.util.Utility;

public class SoundBoxBuilder {


	public static StringBuilder build(BaseView baseView, GenApp genApp) {
		SoundBox soundBox = (SoundBox) baseView;

		StringBuilder soundBoxBuilder = new StringBuilder();

		soundBoxBuilder.append("{id:\"").append(soundBox.getUiid())
				.append("\",");
		soundBoxBuilder.append("name:\"").append(soundBox.getName())
				.append("\",");
		// Hard coded value - data source unknown
		soundBoxBuilder.append("style:\"").append(soundBox.isStyleDark() ? "dark" : "silver")
				.append("\",");
		soundBoxBuilder.append("label:\"").append(soundBox.getSoundFile().getSoundName())
				.append("\",");
		soundBoxBuilder.append("source:\"").append(soundBox.getSoundFile().getSrcLocation())
				.append("\",");

		soundBoxBuilder.append("value:\"").append(soundBox.getSoundFile().getFileName())
				.append("\",");
		if (soundBox.getSoundFile().getFileName().contains("[")	&& soundBox.getSoundFile().getFileName().contains("]")) {
			soundBoxBuilder.append("template:\"")
					.append(soundBox.getSoundFile().getFileName())
					.append("\",");
			if(soundBox.getSoundFile().getSrcLocation().equalsIgnoreCase("url")){
				soundBoxBuilder.append("src:\"")
					.append(soundBox.getSoundFile().getSoundURL())
					.append("\",");
			}else
				soundBoxBuilder.append("src:\"").append("\",");
			
		} else {
			soundBoxBuilder.append("template:\"").append("\",");
			if (soundBox.getSoundFile().getFileName() == "") {
				soundBoxBuilder.append("src:\"").append("\",");
			} else {
				if(soundBox.getSoundFile().getSrcLocation().equalsIgnoreCase("url")){
					soundBoxBuilder.append("src:\"")
						.append(soundBox.getSoundFile().getSoundURL())
						.append("\",");
				}else if(soundBox.getSoundFile().getSrcLocation().equalsIgnoreCase("bundle")){
					soundBoxBuilder.append("src:\"")
						.append(soundBox.getSoundFile().getFileName() + '.'	+ soundBox.getSoundFile().getFileExt())
						.append("\",");
				}else{
					soundBoxBuilder.append("src:\"")
					.append(soundBox.getSoundFile().getFileName())
					.append("\",");
				}
			}
		}
		
		soundBoxBuilder.append("autoplay:\"").append(soundBox.isStartPlay())
				.append("\",");
		soundBoxBuilder.append("recorder:").append(soundBox.isRecorder())
				.append(",");
		if(soundBox.isRecorder()){
			soundBoxBuilder.append("timeout:").append(soundBox.getTimeout())
				.append(",");
		}
		
		soundBoxBuilder.append("viewtype:\"").append(soundBox.getViewType())
				.append("\",");
		soundBoxBuilder.append("hidden:\"").append(soundBox.isHidden())
				.append("\",");
		soundBoxBuilder.append("taborder:\"").append(soundBox.getTabOrder())
				.append("\",");
		
		soundBoxBuilder.append("frame:{")
				.append(FrameBuilder.build(soundBox.getFrame())).append("},");
		
		// Hard coded value - data source unknown
		soundBoxBuilder.append("lineheight:\"").append("20").append("\",");
		
		if (soundBox.getEvent() != null) {
			soundBoxBuilder.append("events:{");
			for (Event event : baseView.getEvent()) {

				StringBuilder actions = SoundBoxEventBuilder.buildEvent(genApp,
						baseView, event);
				soundBoxBuilder.append(actions);
			}
			Utility.removeCommaFromLast(soundBoxBuilder);
			soundBoxBuilder.append("}");
		}

		soundBoxBuilder.append("}");

		return soundBoxBuilder;

	}

}
