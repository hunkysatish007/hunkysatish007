package com.mobilous.mobileweb.uibuilder;

import com.mobilous.mobileweb.EventBuilder.GoogleMapEventBuilder;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.GoogleMap;

public class GoogleMapBuilder {

	public static StringBuilder build(BaseView child, GenApp genapp) {
		//System.out.println("----------- Google Map used in the App -----------");
		if(genapp.getMainFile() != null)
			genapp.getMainFile().setGoogleMapUsed(true);
		GoogleMap map = (GoogleMap) child;
		
		StringBuilder googlemap = new StringBuilder();
		
		googlemap.append("{id:\"").append(child.getUiid()).append("\",")
			.append("name:\"").append(child.getName()).append("\",")
			.append("viewtype:\"").append(child.getViewType()).append("\",")
			.append("taborder:\"").append(map.getTabOrder()).append("\",")
			.append("hidden:").append(map.isHidden()).append(",")
			.append("initiallocation:\"").append(map.getInitialPosition()).append("\",")
			.append("zoomlevel:").append(map.getZoom()).append(",")
			.append("isgps:\"").append(map.isGps()).append("\",")
			.append("frame:{").append(FrameBuilder.build(map.getFrame())).append("},");
		
		
		
		//Events
		if(child.getEvent()!=null){
			googlemap.append("events:{");
				for(Event event: child.getEvent()){
					StringBuilder actions = GoogleMapEventBuilder.buildEvent(genapp,child,event);
					googlemap.append(actions);
				}
				googlemap.append("}");
		}
		googlemap.append("}");
		
		return googlemap;
	}

}
