package com.mobilous.mobileweb.EventBuilder;

import com.mobilous.mobileweb.actionbuilder.ActionBuilder;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.BaseView;

public class ToggleButtonEventBuilder {
	
	public static StringBuilder buildEvent(GenApp genapp, BaseView baseview,
			Event event) {
		StringBuilder eventScript = new StringBuilder();
		if (event.getAction().isEmpty()) {
			return eventScript;
		}
		if (event.getEventName().equalsIgnoreCase("On")) {
			eventScript.append("On:[");
			eventScript.append(ActionBuilder
					.makeAction(genapp, baseview, event));
			eventScript.append("],");
		}

		else if (event.getEventName().equalsIgnoreCase("Clicked")) {
			eventScript.append("Tap:[");
			eventScript.append(ActionBuilder
					.makeAction(genapp, baseview, event));
			eventScript.append("],");
		}

		else if (event.getEventName().equalsIgnoreCase("Off")) {
			eventScript.append("Off:[");
			eventScript.append(ActionBuilder
					.makeAction(genapp, baseview, event));
			eventScript.append("],");
		}

		return eventScript;

}
}
