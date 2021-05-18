package com.mobilous.mobileweb.uibuilder;

import com.mobilous.mobileweb.EventBuilder.CalendarEventBuilder;
import com.mobilous.mobileweb.EventBuilder.TextFieldViewEventBuilder;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.Calendar;
import com.mobilous.mobileweb.util.Utility;

public class CalendarBuilder {

	private static GenApp genApp;

	/*
	 * {id:"ui-16",name:"TextField_20130108143600186",
	 * value:"",template:'',placeholder:"textfield",
	 * type:"text",viewtype:"Calendar", frame:{x:60,y:200,width:100,height:20},
	 * font:{size:12,align:"left", color:{red:138,blue:43,green:43,alpha:1}}},
	 */

	/*
	 * {"frame":{"height":20.0,"width":100.0,"y":79.0,"x":90.0},
	 * "placeholder":"","value":"","type":"Calendar"},
	 */

	public static StringBuilder build(BaseView baseView, GenApp genApp) {

		Calendar calendar = (Calendar) baseView;
		// JSON Version
		/*
		 * JSONObject jsonObject = new JSONObject(); jsonObject.put("id",
		 * calendar.getUiid()); jsonObject.put("name", calendar.getName());
		 * jsonObject.put("value", calendar.getValue()); String value =
		 * calendar.getText(); if(value.contains("[")) {
		 * jsonObject.put("value", ""); jsonObject.put("template", value);
		 * 
		 * }else{ jsonObject.put("value", value); jsonObject.put("template",
		 * ""); } jsonObject.put("viewtype", calendar.getViewType());
		 * jsonObject.put("placeholder", calendar.getPlaceHolder());
		 * jsonObject.put("frame", FrameBuilder.build(calendar.getFrame()));
		 * jsonObject.put("font", FontBuilder.build(calendar.getFont()));
		 * 
		 * return jsonObject;
		 */

		StringBuilder calendarBuilder = new StringBuilder();

		calendarBuilder.append("{id:\"").append(calendar.getUiid())
				.append("\",");
		calendarBuilder.append("name:\"").append(calendar.getName())
				.append("\",");
		calendarBuilder.append("hidden:\"").append(calendar.isHidden())
				.append("\",");
		calendarBuilder.append("viewtype:\"")
				.append(calendar.getViewType()).append("\",");
		calendarBuilder.append("taborder:\"").append(calendar.getTabOrder()).append("\",");
		
		calendarBuilder.append("placeholder:\"").append(Utility.parseText(calendar.getPlaceHolder())).append("\",");
		calendarBuilder.append("type:\"").append(calendar.getType()).append("\",");
		calendarBuilder.append("jpEra:\"").append(calendar.getJPEra()).append("\",");
		calendarBuilder.append("autoCapitalization:\"").append(calendar.getAutocapitalizationType()).append("\",");
		calendarBuilder.append("verticalalignment:\"").append(calendar.getVerticalAlignment()).append("\",");
		calendarBuilder.append("maxRange:\"").append(calendar.getMaxRange()).append("\",");
		calendarBuilder.append("minRange:\"").append(calendar.getMinRange()).append("\",");
		calendarBuilder.append("displayFormat:\"").append(calendar.getDisplayFormat()).append("\",");
		calendarBuilder.append("selectedDate:\"").append(calendar.getSelectedDate()).append("\",");
		calendarBuilder.append("showIcon:").append(calendar.isShowIcon()).append(",");
		calendarBuilder.append("cornerRadius:").append(calendar.getCornerRadius()).append(",");

		calendarBuilder
			.append("border:{")
			.append(BorderBuilder.build(calendar.getBorderWidth(),calendar.getBorderStyle(), calendar.getBorderColor()))
			.append("},");
		
		if (calendar.getPadding() != null) {
			calendarBuilder.append("padding:{")
					.append(PaddingBuilder.build(calendar.getPadding()))
					.append("},");
		}
		
		calendarBuilder.append("background:{")
				.append(ColorBuilder.build(calendar.getBackgroundColor()))
				.append("},");

		calendarBuilder.append("frame:{")
				.append(FrameBuilder.build(calendar.getFrame())).append("},");
		if(calendar.getFont() != null) {
			calendarBuilder.append("font:{")
			.append(FontBuilder.build(calendar.getFont())).append("},");
		}

		if (calendar.getEvent() != null) {
			calendarBuilder.append("events:{");
			for (Event event : baseView.getEvent()) {

				StringBuilder actions = CalendarEventBuilder.buildEvent(
						genApp, baseView, event);
				calendarBuilder.append(actions);
			}
			Utility.removeCommaFromLast(calendarBuilder);
			calendarBuilder.append("}");
		}
		calendarBuilder.append("}");
		return calendarBuilder;

	}

	/*
	 * {id:"ui-16",name:"TextField_20130108143600186",value:"",template:
	 * '',placeholder:"textfield",type:"text",viewtype:"Calendar",frame:{x:60,y:200,width:100,height:20},font:{size:12,align:"left",color:{red:138,blue:43,green:43,alpha:1}}},
	 * 
	 * {"id":"ui-1","name":"TextField_20130202150020272", "value":"",
	 * "template":"","placeholder":"",
	 * "frame":{"height":20.0,"width":100.0,"y":79.0
	 * ,"x":90.0},"font":{"color":{"red"
	 * :0.0,"blue":0.0,"green":0.0,"alpha":1.0},"align":"left","size":12},},
	 */

}
