package com.mobilous.mobileweb.EventBuilder;

import com.mobilous.mobileweb.actionbuilder.ActionBuilder;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.BaseView;

public class VideoBoxEventBuilder {

	public static StringBuilder buildEvent(GenApp genApp, BaseView baseView,
			Event event) {
		StringBuilder eventScript = new StringBuilder();
		if (event.getAction().isEmpty()) {
			return eventScript;
		}
		if (event.getEventName().equalsIgnoreCase("didPausePlayMovie")) {
			eventScript.append("OnPlayPause:[");
			eventScript.append(ActionBuilder
					.makeAction(genApp, baseView, event));
			eventScript.append("],");
		}

		else if (event.getEventName().equalsIgnoreCase("didStopPlayMovie")) {
			eventScript.append("StopPlay:[");
			eventScript.append(ActionBuilder
					.makeAction(genApp, baseView, event));
			eventScript.append("],");
		}

		else if (event.getEventName().equalsIgnoreCase("didFinishPlayMovie")) {
			eventScript.append("PlayEnd:[");
			eventScript.append(ActionBuilder
					.makeAction(genApp, baseView, event));
			eventScript.append("],");
		}
		else if (event.getEventName().equalsIgnoreCase("didPauseRecordMovie")) {
			eventScript.append("OnRecordPause:[");
			eventScript.append(ActionBuilder
					.makeAction(genApp, baseView, event));
			eventScript.append("],");
		}
		else if (event.getEventName().equalsIgnoreCase("didFinishRecordMovie")) {
			eventScript.append("RecordEnd:[");
			eventScript.append(ActionBuilder
					.makeAction(genApp, baseView, event));
			eventScript.append("],");
		}
		else if (event.getEventName().equalsIgnoreCase("didStopRecordMovie")) {
			eventScript.append("StopRecord:[");
			eventScript.append(ActionBuilder
					.makeAction(genApp, baseView, event));
			eventScript.append("],");
		}
		else if (event.getEventName().equalsIgnoreCase("didStartRecordMovie")) {
			eventScript.append("RecordStarts:[");
			eventScript.append(ActionBuilder
					.makeAction(genApp, baseView, event));
			eventScript.append("],");
		}else if (event.getEventName().equalsIgnoreCase("didStartPlayMovie")) {
			eventScript.append("PlayStarts:[");
			eventScript.append(ActionBuilder
					.makeAction(genApp, baseView, event));
			eventScript.append("],");
		}

		return eventScript;
	}

	}


