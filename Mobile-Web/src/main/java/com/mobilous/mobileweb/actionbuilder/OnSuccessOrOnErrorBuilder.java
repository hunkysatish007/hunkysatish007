package com.mobilous.mobileweb.actionbuilder;

import com.mobilous.mobileweb.action.Action;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.BaseView;

public class OnSuccessOrOnErrorBuilder {

	public static StringBuilder build(GenApp genapp, BaseView baseview,
			Event event, Action action) {
		// TODO Auto-generated method stub
		StringBuilder script = new StringBuilder();
		script.append("events:{");
		for (Event evt : action.getEvent()) {
			if (evt.getEventName().contains("success")) {
				script.append("Success:[")
						.append(ActionBuilder.makeAction(genapp, baseview, evt))
						.append("],");
			} else if (evt.getEventName().contains("error")) {
				script.append("Error:[")
						.append(ActionBuilder.makeAction(genapp, baseview, evt))
						.append("],");

			}else if ( evt.getEventName().contains("RightButtonClicked")){
				script.append("RightButtonClicked:[")
						.append(ActionBuilder.makeAction(genapp, baseview, evt))
						.append("],");
			}else if ( evt.getEventName().contains("LeftButtonClicked")){
				script.append("LeftButtonClicked:[")
				.append(ActionBuilder.makeAction(genapp, baseview, evt))
				.append("],");
			}else if ( evt.getEventName().contains("onTapCancel")){
				script.append("onTapCancel:[")
				.append(ActionBuilder.makeAction(genapp, baseview, evt))
				.append("],");
			}else if ( evt.getEventName().contains("onTapOk")){
				script.append("onTapOk:[")
				.append(ActionBuilder.makeAction(genapp, baseview, evt))
				.append("],");
			}else if ( evt.getEventName().contains("detectRecords")){
				script.append("DetectRecords:[")
				.append(ActionBuilder.makeAction(genapp, baseview, evt))
				.append("],");
			}else if ( evt.getEventName().contains("onElse")){
				script.append("OnElse:[")
				.append(ActionBuilder.makeAction(genapp, baseview, evt))
				.append("],");
			}else if ( evt.getEventName().contains("EnterFencing")){
				script.append("EnterFencing:[")
				.append(ActionBuilder.makeAction(genapp, baseview, evt))
				.append("],");
			}else if ( evt.getEventName().contains("ExitFencing")){
				script.append("ExitFencing:[")
				.append(ActionBuilder.makeAction(genapp, baseview, evt))
				.append("],");
			}

		}
		script.append("}");
		return script;
	}

}
