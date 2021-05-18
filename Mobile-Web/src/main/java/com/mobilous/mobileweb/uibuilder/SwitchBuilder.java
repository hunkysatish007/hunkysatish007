package com.mobilous.mobileweb.uibuilder;

import com.mobilous.mobileweb.EventBuilder.SwitchEventBuilder;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.attribute.Point;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.Switch;
import com.mobilous.mobileweb.util.Utility;

public class SwitchBuilder {

	public static StringBuilder build(BaseView baseView, GenApp genApp) {

		/*
		 * {id:"ui-22",name:"Switch_20130111095640060",
		 * value:false,viewtype:"SwitchBar",frame:{x:0,y:0,width:79,height:8},
		 * switchheight
		 * :18,switchwidth:58,btnheight:14,fontsize:18,lineheight:12}
		 */

		/*
		 * {"id":"ui-10","frame":{"height":20.0,"width":60.0,"y":337.0,"x":215.0}
		 * ,
		 * "lineheight":"12","btnheight":"14","name":"Switch_20130207160104179",
		 * "value"
		 * :true,"switchwidth":"58","switchheight":"18","fontsize":"18","viewtype"
		 * :"Switch"
		 */
		/*
		 * 
		 * jsonObject.put("id", switchObject.getUiid()); jsonObject.put("name",
		 * switchObject.getName()); jsonObject.put("value",
		 * switchObject.isOn()); jsonObject.put("viewtype",
		 * switchObject.getViewType() + "Bar"); jsonObject.put("frame",
		 * FrameBuilder.build(switchObject.getFrame()));
		 */
		StringBuilder switchBuilder = new StringBuilder();
		Switch switchObject = (Switch) baseView;
		switchBuilder.append("{id:\"").append(switchObject.getUiid())
				.append("\",");
		switchBuilder.append("name:\"").append(switchObject.getName())
				.append("\",");
		if(switchObject.isOn()){
			switchBuilder.append("value:\"").append("on")
			.append("\",");
		}else{
			switchBuilder.append("value:\"").append("off")
			.append("\",");
		}
		switchBuilder.append("hidden:").append(switchObject.isHidden())
		.append(",");
		switchBuilder.append("switchValue:\"").append("").append("\",");
		
			if(switchObject.getValue() .indexOf("[") != -1){
				switchBuilder.append("template:\"")
				.append("" + switchObject.getValue() + "")
				.append("\",");
				
			}else{
				if (switchObject.getFieldname().equalsIgnoreCase(""))
					switchBuilder.append("template:\"").append("\",");
				else{
				switchBuilder.append("template:\"")
				.append("" + switchObject.getFieldname() + "")
				.append("\",");
	
			}
			
		}
			switchBuilder.append("viewtype:\"").append(switchObject.getViewType())
				.append("Bar").append("\",");
		switchBuilder.append("taborder:\"").append(switchObject.getTabOrder()).append("\",");
		switchBuilder.append("border:{").append(BorderBuilder.build(switchObject.getBorderWidth(),switchObject.getBorderStyle(), switchObject.getBorderColor())).append("},");
		Point frame = switchObject.getFrame();
		switchBuilder.append("frame:{").append(FrameBuilder.build(frame))
				.append("},");
		// Events
		if (switchObject.getEvent() != null) {
			switchBuilder.append("events:{");
			for (Event event : baseView.getEvent()) {

				StringBuilder actions = SwitchEventBuilder.buildEvent(genApp,
						baseView, event);
				switchBuilder.append(actions);
			}
			Utility.removeCommaFromLast(switchBuilder);
			switchBuilder.append("}");
		}
		switchBuilder.append("}");
		return switchBuilder;

	}

}
