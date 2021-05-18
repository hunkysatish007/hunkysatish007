package com.mobilous.mobileweb.EventBuilder;

import com.mobilous.mobileweb.actionbuilder.ActionBuilder;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.BaseView;

public class GadgetEventBuilder {
	public static StringBuilder buildEvent(GenApp genapp, BaseView baseview,
			Event event) {
		StringBuilder eventScript = new StringBuilder();
		String eventName = "";
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
		}else if (event.getEventName().equalsIgnoreCase("OnSelect")) {
			eventScript.append("OnSelect:[");
			eventScript.append(ActionBuilder.makeAction(genapp, baseview, event));
			eventScript.append("],");
		}else if (event.getEventName().equalsIgnoreCase("valueChanged")) {
			eventScript.append("OnChange:[");
			eventScript.append(ActionBuilder
					.makeAction(genapp, baseview, event));
			eventScript.append("],");
		}else if(event.getEventName().equalsIgnoreCase("loadError")){
			eventName = "onLoadError";
			eventScript.append(eventName+":[").append(ActionBuilder.makeAction(genapp, baseview, event)).append("],");
		}else if(event.getEventName().equalsIgnoreCase("DidFinishLoadingMap")){
			eventName = "onMapLoadEnd";
			eventScript.append(eventName+":[").append(ActionBuilder.makeAction(genapp, baseview, event)).append("],");
		}else if(event.getEventName().equalsIgnoreCase("WillStartLoadingMap")){
			eventName = "onMapLoadStart";
			eventScript.append(eventName+":[").append(ActionBuilder.makeAction(genapp, baseview, event)).append("],");
		}else if(event.getEventName().equalsIgnoreCase("LocationError")){
			eventName = "onLocationError";
			eventScript.append(eventName+":[").append(ActionBuilder.makeAction(genapp, baseview, event)).append("],");
		}else if(event.getEventName().equalsIgnoreCase("regionDidChange")){
			eventName = "onMapScrollEnd";
			eventScript.append(eventName+":[").append(ActionBuilder.makeAction(genapp, baseview, event)).append("],");
		}else if(event.getEventName().equalsIgnoreCase("DidFailLoadingMap")){
			eventName = "onMapLoadFail";
			eventScript.append(eventName+":[").append(ActionBuilder.makeAction(genapp, baseview, event)).append("],");
		}else if(event.getEventName().equalsIgnoreCase("regionWillChange")){
			eventName = "onMapScrollStart";
			eventScript.append(eventName+":[").append(ActionBuilder.makeAction(genapp, baseview, event)).append("],");
		}else if(event.getEventName().equalsIgnoreCase("newLocation")){
			eventName = "onNewLocation";
			eventScript.append(eventName+":[").append(ActionBuilder.makeAction(genapp, baseview, event)).append("],");
		}else if (event.getEventName().equalsIgnoreCase("afterViewPage")) {
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
		}else if (event.getEventName().equalsIgnoreCase("didSelectRow")) {
			eventScript.append("picking:[");
			eventScript.append(ActionBuilder.makeAction(genapp, baseview, event));
			eventScript.append("],");
		}else if (event.getEventName().equalsIgnoreCase("onChange")) {
			eventScript.append("OnChange:[");
			eventScript.append(ActionBuilder
					.makeAction(genapp, baseview, event));
			eventScript.append("],");
		}else if (event.getEventName().equalsIgnoreCase("DidChange")) {
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
		}else if (event.getEventName().equalsIgnoreCase("CancelClicked")) {
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
		}else if (event.getEventName().equalsIgnoreCase("valueChanged")) {
			eventScript.append("SliderValueChange:[");
			eventScript.append(ActionBuilder.makeAction(genapp, baseview, event));
			eventScript.append("],");
		}else if (event.getEventName().equalsIgnoreCase("didStartPlaySound")) {
			eventScript.append("OnPlay:[");
			eventScript.append(ActionBuilder
					.makeAction(genapp, baseview, event));
			eventScript.append("],");
		}

		else if (event.getEventName().equalsIgnoreCase("didPausePlaySound")) {
			eventScript.append("OnPausePlay:[");
			eventScript.append(ActionBuilder
					.makeAction(genapp, baseview, event));
			eventScript.append("],");
		}

		else if (event.getEventName().equalsIgnoreCase("didFinishPlaySound")) {
			eventScript.append("PlayEnd:[");
			eventScript.append(ActionBuilder
					.makeAction(genapp, baseview, event));
			eventScript.append("],");
		}
		else if (event.getEventName().equalsIgnoreCase("didStopPlaySound")) {
			eventScript.append("StopPlay:[");
			eventScript.append(ActionBuilder
					.makeAction(genapp, baseview, event));
			eventScript.append("],");
		}else if (event.getEventName().equalsIgnoreCase("On")) {
			eventScript.append("On:[");
			eventScript.append(ActionBuilder
					.makeAction(genapp, baseview, event));
			eventScript.append("],");
		}

		else if (event.getEventName().equalsIgnoreCase("valueChanged")) {
			eventScript.append("ValueChanged:[");
			eventScript.append(ActionBuilder
					.makeAction(genapp, baseview, event));
			eventScript.append("],");
		}

		else if (event.getEventName().equalsIgnoreCase("off")) {
			eventScript.append("Off:[");
			eventScript.append(ActionBuilder
					.makeAction(genapp, baseview, event));
			eventScript.append("],");
		}else if (event.getEventName().equalsIgnoreCase("clicked")) {
			eventScript.append("Tap:[");
			eventScript.append(ActionBuilder
					.makeAction(genapp, baseview, event));
			eventScript.append("],");
		}else if (event.getEventName().equalsIgnoreCase("On")) {
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
		}else if (event.getEventName().equalsIgnoreCase("didPausePlayMovie")) {
			eventScript.append("OnPlayPause:[");
			eventScript.append(ActionBuilder
					.makeAction(genapp, baseview, event));
			eventScript.append("],");
		}

		else if (event.getEventName().equalsIgnoreCase("didStopPlayMovie")) {
			eventScript.append("StopPlay:[");
			eventScript.append(ActionBuilder
					.makeAction(genapp, baseview, event));
			eventScript.append("],");
		}

		else if (event.getEventName().equalsIgnoreCase("didFinishPlayMovie")) {
			eventScript.append("PlayEnd:[");
			eventScript.append(ActionBuilder
					.makeAction(genapp, baseview, event));
			eventScript.append("],");
		}
		else if (event.getEventName().equalsIgnoreCase("didPauseRecordMovie")) {
			eventScript.append("OnRecordPause:[");
			eventScript.append(ActionBuilder
					.makeAction(genapp, baseview, event));
			eventScript.append("],");
		}
		else if (event.getEventName().equalsIgnoreCase("didFinishRecordMovie")) {
			eventScript.append("RecordEnd:[");
			eventScript.append(ActionBuilder
					.makeAction(genapp, baseview, event));
			eventScript.append("],");
		}
		else if (event.getEventName().equalsIgnoreCase("didStopRecordMovie")) {
			eventScript.append("StopRecord:[");
			eventScript.append(ActionBuilder
					.makeAction(genapp, baseview, event));
			eventScript.append("],");
		}
		else if (event.getEventName().equalsIgnoreCase("didStartRecordMovie")) {
			eventScript.append("RecordStarts:[");
			eventScript.append(ActionBuilder
					.makeAction(genapp, baseview, event));
			eventScript.append("],");
		}else if (event.getEventName().equalsIgnoreCase("didStartPlayMovie")) {
			eventScript.append("PlayStarts:[");
			eventScript.append(ActionBuilder
					.makeAction(genapp, baseview, event));
			eventScript.append("],");
		}if(event.getEventName().equalsIgnoreCase("DidStartLoad")){
			eventScript.append("OnLoad:[").append(ActionBuilder.makeAction(genapp, baseview, event)).append("],");
			
			//	ActionBuilder.makeAction(genapp, baseview, event);
			
			//eventScript.append("]");
		}
		else if(event.getEventName().equalsIgnoreCase("DidFinishLoad")){
			eventScript.append("LoadEnd:[").append(ActionBuilder.makeAction(genapp, baseview, event)).append("],");
		}
		else if(event.getEventName().equalsIgnoreCase("DidFailToLoad")){
			eventScript.append("LoadFail:[").append(ActionBuilder.makeAction(genapp, baseview, event)).append("],");
		}
		

		

		return eventScript;

	}
}
