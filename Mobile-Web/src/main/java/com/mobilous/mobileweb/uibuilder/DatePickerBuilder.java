package com.mobilous.mobileweb.uibuilder;

import com.mobilous.mobileweb.EventBuilder.DatePickerEvent;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.DatePicker;

public class DatePickerBuilder {

	public static StringBuilder build(BaseView baseView, GenApp genApp) {
		/*
		 * {id:"ui-35",type:"",name:"DatePicker_20130117111159568",
		 * viewtype:"DatePicker",mode:"Date",current:"01/17/13",
		 * frame:{x:180,y:30,width:225,height:125}}
		 */

		DatePicker datePicker = (DatePicker) baseView;
		StringBuilder datePickerBuilder = new StringBuilder();

		datePickerBuilder.append("{id:\"").append(datePicker.getUiid())
				.append("\",");
		datePickerBuilder.append("name:\"").append(datePicker.getName())
				.append("\",");
		datePickerBuilder.append("hidden:\"").append(datePicker.isHidden()).append("\",");
		datePickerBuilder.append("viewtype:\"")
				.append(datePicker.getViewType()).append("\",");
		datePickerBuilder.append("taborder:\"").append(datePicker.getTabOrder()).append("\",");
		datePickerBuilder.append("value:\"").append("\",");
		datePickerBuilder.append("frame:{")
				.append(FrameBuilder.build(datePicker.getFrame())).append("},");
		datePickerBuilder.append("mode:\"").append(datePicker.getMode())
				.append("\",");
		if(!datePicker.getMode().equalsIgnoreCase("Date")){ // Plist problem, all kinds of date-picker mode as 24 hours format key.
			datePickerBuilder.append("timeformat:\"").append(datePicker.getTimeFormat()).append("\",");
		}
		datePickerBuilder.append("current:\"")
				.append(datePicker.getCurrentDate()).append("\",");

		if (datePicker.getEvent() != null) {
			datePickerBuilder.append("events:{");
			for (Event event : datePicker.getEvent()) {
				StringBuilder actions = DatePickerEvent.buildAction(genApp,
						baseView, event);
				datePickerBuilder.append(actions);
			}
			datePickerBuilder.append("}");
		}
		datePickerBuilder.append("}");

		return datePickerBuilder;

	}

}
