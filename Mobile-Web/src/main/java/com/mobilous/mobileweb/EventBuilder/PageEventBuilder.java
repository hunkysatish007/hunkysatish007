package com.mobilous.mobileweb.EventBuilder;

import com.mobilous.mobileweb.actionbuilder.ActionBuilder;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.app.Page;
import com.mobilous.mobileweb.event.Event;

public class PageEventBuilder {

	public static StringBuilder buildEvent(GenApp genapp, Page page,
			Event event) {
		StringBuilder eventScript = new StringBuilder();
		if (event.getAction().isEmpty()) {
			return eventScript;
		}
		if (event.getEventName().equalsIgnoreCase("afterViewPage")) {
			eventScript.append("AfterViewPage:[");
			eventScript.append(ActionBuilder
					.makeAction(genapp, null, event));
			eventScript.append("],");
		}

		else if (event.getEventName().equalsIgnoreCase("afterLoadPage")) {
			eventScript.append("AfterLoadPage:[");
			eventScript.append(ActionBuilder
					.makeAction(genapp, null, event));
			eventScript.append("],");
		}else if (event.getEventName().equalsIgnoreCase("beforeViewPage")) {
			eventScript.append("BeforeViewPage:[");
			eventScript.append(ActionBuilder
					.makeAction(genapp, null, event));
			eventScript.append("],");
		}else if (event.getEventName().equalsIgnoreCase("flick")) {
			eventScript.append("flick:[");
			eventScript.append(ActionBuilder
					.makeAction(genapp, null, event));
			eventScript.append("],");
		}else if (event.getEventName().equalsIgnoreCase("flicklr")) {
			eventScript.append("flickLR:[");
			eventScript.append(ActionBuilder
					.makeAction(genapp, null, event));
			eventScript.append("],");
		}else if (event.getEventName().equalsIgnoreCase("flickrl")) {
			eventScript.append("flickRL:[");
			eventScript.append(ActionBuilder
					.makeAction(genapp, null, event));
			eventScript.append("],");
		}
		return eventScript;
	}

}
