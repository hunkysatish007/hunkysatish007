package com.mobilous.mobileweb.EventBuilder;

import com.mobilous.mobileweb.actionbuilder.ActionBuilder;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.BaseView;

public class SearchBarEventBuilder {

	public static StringBuilder buildEvent(GenApp genapp, BaseView baseview,
			Event event) {
		StringBuilder eventScript = new StringBuilder();
		if (event.getAction().isEmpty()) {
			return eventScript;
		}
		if (event.getEventName().equalsIgnoreCase("CancelClicked")) {
			eventScript.append("CancelClick:[");
			eventScript.append(ActionBuilder
					.makeAction(genapp, baseview, event));
			eventScript.append("],");
		
		}else if(event.getEventName().equalsIgnoreCase("SearchClicked")) {
			eventScript.append("SearchClick:[");
			eventScript.append(ActionBuilder
					.makeAction(genapp, baseview, event));
			eventScript.append("],");
		
		}else if (event.getEventName().equalsIgnoreCase("textDidChanged")) {
			eventScript.append("TextChanged:[");
			eventScript.append(ActionBuilder
					.makeAction(genapp, baseview, event));
			eventScript.append("],");
		
		}else if (event.getEventName().equalsIgnoreCase("textBeginEditing")) {
			eventScript.append("EditingStart:[");
			eventScript.append(ActionBuilder
					.makeAction(genapp, baseview, event));
			eventScript.append("],");
		
		}else if (event.getEventName().equalsIgnoreCase("texEndEditing")) {
			eventScript.append("EditingEnd:[");
			eventScript.append(ActionBuilder
					.makeAction(genapp, baseview, event));
			eventScript.append("],");
		}
		
		
		
		return eventScript;
	}
	
}