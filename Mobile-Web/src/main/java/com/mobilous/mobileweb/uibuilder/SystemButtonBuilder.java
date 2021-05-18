package com.mobilous.mobileweb.uibuilder;

import com.mobilous.mobileweb.EventBuilder.SystemButtonEventBuilder;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.Button;

public class SystemButtonBuilder {
	
	/*
	 * {id:"ui-25",name:"SystemButton_20130114142021423",
	 *  type:"image",viewtype:"SystemButton",
	 *  frame:{x:240,y:15,width:150,height:20},
	 *  style:"images/system/add.png",ineheight:20}
	 * */
	
	public static StringBuilder build(BaseView baseView, GenApp genApp)
	{
		Button systemButton = (Button)baseView;
		StringBuilder systemButtonBuilder = new StringBuilder();
		
		systemButtonBuilder.append("{id:\"").append(systemButton.getUiid()).append("\",");
		systemButtonBuilder.append("name:\"").append(systemButton.getName()).append("\",");
		systemButtonBuilder.append("type:\"").append("image").append("\",");
		systemButtonBuilder.append("viewtype:\"").append(String.format("%sButton", systemButton.getType())).append("\",");
		systemButtonBuilder.append("taborder:\"").append(systemButton.getTabOrder()).append(("\","));
		systemButtonBuilder.append("frame:{").append(FrameBuilder.build(systemButton.getFrame())).append("},");
		systemButtonBuilder.append("hidden:").append(systemButton.isHidden()).append(",");
		systemButtonBuilder.append("style:\"").append(systemButton.getButtonType().replace(" ", "")).append("\",");
		// Hard coded value - data source unknown
		systemButtonBuilder.append("lineheight:\"").append("20").append("\",");
		
		
		
		//Events
		if(baseView.getEvent()!=null){
			systemButtonBuilder.append("events:{");
				for(Event event: baseView.getEvent()){
					StringBuilder actions = SystemButtonEventBuilder.buildEvent(genApp,baseView,event);
					systemButtonBuilder.append(actions);
				}
				systemButtonBuilder.append("}");
		}
		systemButtonBuilder.append("}");
		
		return systemButtonBuilder;
	}

}
