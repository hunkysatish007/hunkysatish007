package com.mobilous.mobileweb.uibuilder;

import com.mobilous.mobileweb.EventBuilder.ToggleButtonEventBuilder;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.Button;
import com.mobilous.mobileweb.util.Utility;

public class ToggleButtonBuilder {

	public static StringBuilder build(BaseView baseView, GenApp genApp) {
		
		Button toggleButton = (Button)baseView;
		StringBuilder toggleBuilder = new StringBuilder();
		
		toggleBuilder.append("{id:\"").append(toggleButton.getUiid()).append("\",");
		// Hardcoded value - data source unknown	
		toggleBuilder.append("type:\"").append("image").append("\",");
		toggleBuilder.append("name:\"").append(toggleButton.getName()).append("\",");
		toggleBuilder.append("hidden:\"").append(toggleButton.isHidden()).append("\",");
		toggleBuilder.append("viewtype:\"").append("Toggle" + toggleButton.getViewType()).append("\",");
		toggleBuilder.append("value:").append(toggleButton.getOn()).append(",");
		toggleBuilder.append("togglevalue:\"").append(toggleButton.getOn()).append("\",");
		toggleBuilder.append("title:\"").append(Utility.parseText(toggleButton.getNormalTitle())).append("\",");
		toggleBuilder.append("template:\"").append(toggleButton.getValue()+"\",");
		toggleBuilder.append("selectedtitle:\"").append(Utility.parseText(toggleButton.getSelectedTitle())).append("\",");
		toggleBuilder.append("font:{").append(FontBuilder.build(toggleButton.getNormalFont())).append("},");
		if(toggleButton.getSelectedImage() != null)
		{	
			String selectedimage="ImageButton_toggle_on.png";
			if(toggleButton.getSelectedImage().getFileName()!="")
			{  
				if(toggleButton.getSelectedImage().getFileName().contains("[") && toggleButton.getNormalImage().getFileName().contains("]")) {
					selectedimage=toggleButton.getSelectedImage().getFileName();
				}else {
					selectedimage=toggleButton.getSelectedImage().getFileName() + "." + toggleButton.getSelectedImage().getFileExt();
				}
			}
			toggleBuilder.append("selectedimage:\"").append(selectedimage).append("\",");
		}
		if(toggleButton.getNormalImage() != null)
		{	String nonselectedimage="ImageButton_toggle_off.png";
			if(toggleButton.getNormalImage().getFileName()!="")
			{  
				if(toggleButton.getNormalImage().getFileName().contains("[") && toggleButton.getNormalImage().getFileName().contains("]")) {
					nonselectedimage=toggleButton.getNormalImage().getFileName();
				}else {
					nonselectedimage=toggleButton.getNormalImage().getFileName() + "." + toggleButton.getNormalImage().getFileExt();
				}
			}
			toggleBuilder.append("nonselectedimage:\"").append(nonselectedimage).append("\",");
		}
		toggleBuilder.append("verticalalignment:\"").append(toggleButton.getVerticalAlignment()).append("\",");
		toggleBuilder.append("textDecoration:\"").append(toggleButton.getTextDecoration().trim()).append("\",");
	    if (toggleButton.getPadding() != null) {
	    	toggleBuilder.append("padding:{")
	    				 .append(PaddingBuilder.build(toggleButton.getPadding()))
	    				 .append("},");
	    }
	    toggleBuilder.append("border:{").append(BorderBuilder.build(toggleButton.getBorderWidth(),toggleButton.getBorderStyle(), toggleButton.getBorderColor())).append("},");
		toggleBuilder.append("frame:{").append(FrameBuilder.build(toggleButton.getFrame())).append("},");
		

		if(toggleButton.getEvent()!=null){
			toggleBuilder.append("events:{");
				for(Event event: baseView.getEvent()){

					StringBuilder actions = ToggleButtonEventBuilder.buildEvent(genApp,baseView,event);
					toggleBuilder.append(actions);
				}
				Utility.removeCommaFromLast(toggleBuilder);
				toggleBuilder.append("}");
		}
		
		toggleBuilder.append("}");
		
		
		
		return toggleBuilder;
		
		
	}
}
