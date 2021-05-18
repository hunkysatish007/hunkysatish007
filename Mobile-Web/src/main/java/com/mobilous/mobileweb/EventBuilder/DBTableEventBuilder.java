package com.mobilous.mobileweb.EventBuilder;

import java.util.HashMap;
import java.util.Map;

import com.mobilous.mobileweb.actionbuilder.ActionBuilder;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.BaseView;

public class DBTableEventBuilder {

		public static Map<String, String> buildEvent(GenApp genApp, BaseView baseView, Event event) {
		Map<String, String> map = new HashMap<String, String>();
		
		StringBuilder eventScript = new StringBuilder();

		if ((event.getEventName().equalsIgnoreCase("didSelectRowAtIndexPath")) || (event.getEventName().equalsIgnoreCase("accessoryButtonTappedForRowWithIndexPath"))) {
			eventScript.append("events:{");
			eventScript.append("Tap:[");
			eventScript.append(ActionBuilder.makeAction(genApp, baseView, event));
			eventScript.append("]");
			eventScript.append("}");
			if(event.getEventName().equalsIgnoreCase("accessoryButtonTappedForRowWithIndexPath")){
				map.put("icon", eventScript.toString());
			}else if(event.getEventName().equalsIgnoreCase("didSelectRowAtIndexPath")){
				map.put("row", eventScript.toString());
			}
		}

		return map;
	}
}
