package com.mobilous.mobileweb.EventBuilder;

import com.mobilous.mobileweb.actionbuilder.ActionBuilder;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.BaseView;

public class RadioButtonEventBuilder {
	public static StringBuilder buildEvent(GenApp genApp, BaseView baseView,
			Event event) {
		StringBuilder eventScript = new StringBuilder();
		if (event.getAction().isEmpty()) {
			return eventScript;
		}
		if (event.getEventName().equalsIgnoreCase("onChange")) {
			eventScript.append("OnChange:[");
			eventScript.append(ActionBuilder
					.makeAction(genApp, baseView, event));
			eventScript.append("],");
		}if (event.getEventName().equalsIgnoreCase("selected")) {
			eventScript.append("selected:[");
			eventScript.append(ActionBuilder
					.makeAction(genApp, baseView, event));
			eventScript.append("],");
		}

		return eventScript;
	}

}
