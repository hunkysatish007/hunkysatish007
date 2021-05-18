package com.mobilous.mobileweb.EventBuilder;

import com.mobilous.mobileweb.actionbuilder.ActionBuilder;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.BaseView;

public class GoogleMapEventBuilder {
	public static StringBuilder buildEvent(GenApp genapp,BaseView baseview, Event event) {
		
		StringBuilder eventScript=new StringBuilder();
		String eventName = "";
		
		if(event.getAction().isEmpty()){
			return eventScript;
		}
		
		if(event.getEventName().equalsIgnoreCase("loadError")){
			eventName = "onLoadError";
		}else if(event.getEventName().equalsIgnoreCase("DidFinishLoadingMap")){
			eventName = "onMapLoadEnd";
		}else if(event.getEventName().equalsIgnoreCase("WillStartLoadingMap")){
			eventName = "onMapLoadStart";
		}else if(event.getEventName().equalsIgnoreCase("LocationError")){
			eventName = "onLocationError";
		}else if(event.getEventName().equalsIgnoreCase("regionDidChange")){
			eventName = "onMapScrollEnd";
		}else if(event.getEventName().equalsIgnoreCase("DidFailLoadingMap")){
			eventName = "onMapLoadFail";
		}else if(event.getEventName().equalsIgnoreCase("regionWillChange")){
			eventName = "onMapScrollStart";
		}else if(event.getEventName().equalsIgnoreCase("newLocation")){
			eventName = "onNewLocation";
		}else{
			//System.out.println("Event : "+event.getEventName().toString()+" is not implemented yet..");
		}
		
		eventScript.append(eventName+":[").append(ActionBuilder.makeAction(genapp, baseview, event)).append("],");

		
		return eventScript;
}
}
