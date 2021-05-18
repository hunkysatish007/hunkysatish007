package com.mobilous.mobileweb.EventBuilder;

import com.mobilous.mobileweb.actionbuilder.ActionBuilder;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.BaseView;

public class TextFieldViewEventBuilder {

	public static StringBuilder buildEvent(GenApp genapp, BaseView baseview,
			Event event) {
		
		StringBuilder eventScript = new StringBuilder();
		
		if (event.getAction().isEmpty()) {
			return eventScript;
		}
		
		if (event.getEventName().equalsIgnoreCase("DidChange")) {
			eventScript.append("Keypress:[");
			eventScript.append(ActionBuilder
					.makeAction(genapp, baseview, event));
			eventScript.append("],");
		}
		else if (event.getEventName().equalsIgnoreCase("DidBeginEditing")) {
			eventScript.append("EditingStart:[");
			eventScript.append(ActionBuilder
					.makeAction(genapp, baseview, event));
			eventScript.append("],");
		}
		else if (event.getEventName().equalsIgnoreCase("DidEndEditing")) {
			eventScript.append("EditingEnd:[");
			eventScript.append(ActionBuilder
					.makeAction(genapp, baseview, event));
			eventScript.append("],");
		}
		else if (event.getEventName().equalsIgnoreCase("DidEndEditingError")) {
			eventScript.append("EditingEndError:[");
			eventScript.append(ActionBuilder
					.makeAction(genapp, baseview, event));
			eventScript.append("],");
		}
		else if (event.getEventName().equalsIgnoreCase("DidEndVoiceRecognition")) {
 			eventScript.append("VoiceRecognitionEnd:[");
 			eventScript.append(ActionBuilder
 					.makeAction(genapp, baseview, event));
 			eventScript.append("],");
 		}

		return eventScript;
	}

}
