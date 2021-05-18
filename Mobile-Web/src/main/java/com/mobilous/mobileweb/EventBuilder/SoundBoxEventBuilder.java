package com.mobilous.mobileweb.EventBuilder;

import com.mobilous.mobileweb.actionbuilder.ActionBuilder;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.BaseView;

public class SoundBoxEventBuilder {

	public static StringBuilder buildEvent(GenApp genApp, BaseView baseView,
			Event event) {
		StringBuilder eventScript = new StringBuilder();
		if (event.getAction().isEmpty()) {
			return eventScript;
		}
		if (event.getEventName().equalsIgnoreCase("didStartPlaySound")) {
			eventScript.append("OnPlay:[");
			eventScript.append(ActionBuilder
					.makeAction(genApp, baseView, event));
			eventScript.append("],");
		}

		else if (event.getEventName().equalsIgnoreCase("didPausePlaySound")) {
			eventScript.append("OnPausePlay:[");
			eventScript.append(ActionBuilder
					.makeAction(genApp, baseView, event));
			eventScript.append("],");
		}

		else if (event.getEventName().equalsIgnoreCase("didFinishPlaySound")) {
			eventScript.append("PlayEnd:[");
			eventScript.append(ActionBuilder
					.makeAction(genApp, baseView, event));
			eventScript.append("],");
		}
		else if (event.getEventName().equalsIgnoreCase("didStopPlaySound")) {
			eventScript.append("StopPlay:[");
			eventScript.append(ActionBuilder
					.makeAction(genApp, baseView, event));
			eventScript.append("],");
		}
		else if (event.getEventName().equalsIgnoreCase("didStartRecordSound")) {
			eventScript.append("startRecord:[");
			eventScript.append(ActionBuilder
					.makeAction(genApp, baseView, event));
			eventScript.append("],");
		}
		else if (event.getEventName().equalsIgnoreCase("didStopRecordSound")) {
			eventScript.append("stopRecord:[");
			eventScript.append(ActionBuilder
					.makeAction(genApp, baseView, event));
			eventScript.append("],");
		}

		
		return eventScript;

	}

}
