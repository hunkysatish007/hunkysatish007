package com.mobilous.mobileweb.EventBuilder;

import com.mobilous.mobileweb.actionbuilder.ActionBuilder;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.BaseView;

public class DatePickerEvent {

	public static StringBuilder buildAction(GenApp genApp, BaseView baseView,
			Event event) {
		// TODO Auto-generated method stub
		StringBuilder eventScript = new StringBuilder();
		if (event.getEventName().equalsIgnoreCase("valueChanged")) {
			eventScript.append("OnChange:[");
			eventScript.append(ActionBuilder
					.makeAction(genApp, baseView, event));
			eventScript.append("],");
		}
		return eventScript;
	}

}
