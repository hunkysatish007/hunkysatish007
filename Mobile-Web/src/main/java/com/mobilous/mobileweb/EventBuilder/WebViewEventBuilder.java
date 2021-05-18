package com.mobilous.mobileweb.EventBuilder;

import com.mobilous.mobileweb.actionbuilder.ActionBuilder;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.util.Utility;

public class WebViewEventBuilder {
	
	public static StringBuilder buildEvent(GenApp genapp,
			BaseView baseview, Event event, int actindex) {
		StringBuilder eventScript=new StringBuilder();
		if(event.getAction().isEmpty()){
			return eventScript;
		}
		
		if(event.getEventName().equalsIgnoreCase("DidStartLoad")){
			eventScript.append("OnLoad:[").append(ActionBuilder.makeAction(genapp, baseview, event)).append("],");
			
			//	ActionBuilder.makeAction(genapp, baseview, event);
			
			//eventScript.append("]");
		}
		else if(event.getEventName().equalsIgnoreCase("DidFinishLoad")){
			eventScript.append("LoadEnd:[").append(ActionBuilder.makeAction(genapp, baseview, event)).append("],");
		}
		else if(event.getEventName().equalsIgnoreCase("DidFailToLoad")){
			eventScript.append("LoadFail:[").append(ActionBuilder.makeAction(genapp, baseview, event)).append("],");
		}
		//Utility.removeCommaFromLast(eventScript)
		
		return eventScript;
}

}
