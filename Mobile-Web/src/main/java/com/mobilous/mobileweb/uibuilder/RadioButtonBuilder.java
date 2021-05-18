package com.mobilous.mobileweb.uibuilder;


import java.util.Iterator;
import java.util.Map;

import com.mobilous.mobileweb.EventBuilder.RadioButtonEventBuilder;
import com.mobilous.mobileweb.actionbuilder.ActionBuilder;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.Button;
import com.mobilous.mobileweb.util.Utility;

public class RadioButtonBuilder {
	
	public static StringBuilder build(BaseView baseView, GenApp genApp) {
		Button radioButton = (Button) baseView;
		StringBuilder radioButtonBuilder  = new StringBuilder();

		radioButtonBuilder.append("{id:\"").append(radioButton.getUiid())
				.append("\",");
		radioButtonBuilder.append("name:\"").append(radioButton.getName())
				.append("\",");
		radioButtonBuilder.append("groupName:\"").append(radioButton.getGroupName())
		.append("\",");
		radioButtonBuilder.append("groupStyle:\"").append(radioButton.getGroupStyle())
				.append("\",");
		radioButtonBuilder.append("displayvalue:\"").append(radioButton.getTitle())
							.append("\",");
		radioButtonBuilder.append("selected:").append(radioButton.getOn())
		.append(",");
		radioButtonBuilder.append("viewtype:\"").append(radioButton.getButtonType())
				.append("\",");
		radioButtonBuilder.append("taborder:\"").append(radioButton.getTabOrder()).append("\",");
		radioButtonBuilder.append("normalImage:\"").append(radioButton.getNormalImage().getFileName() + "." + radioButton.getNormalImage().getFileExt()).append("\",");
		radioButtonBuilder.append("selectedImage:\"").append(radioButton.getSelectedImage().getFileName() + "." + radioButton.getSelectedImage().getFileExt()).append("\",");
		radioButtonBuilder.append("frame:{")
				.append(FrameBuilder.build(radioButton.getFrame())).append("},");
		radioButtonBuilder.append("font:{")
				.append(FontBuilder.build(radioButton.getNormalFont())).append("},");
	
		radioButtonBuilder
				.append("border:{")
				.append(BorderBuilder.build(
						String.valueOf(radioButton.getBorderWidth()), "",
						radioButton.getBorderColor())).append("},");
		if (radioButton.getPadding() != null) {
			radioButtonBuilder.append("padding:{")
				.append(PaddingBuilder.build(radioButton.getPadding()))
				.append("},");
		}else{
			radioButtonBuilder.append("padding:{")
			.append("top:").append("5px")
			.append(",bottom:").append("5px")
			.append(",left:").append("5px")
			.append(",right:").append("5px")
			.append("},");
		}
		radioButtonBuilder.append("background:{")
				.append(ColorBuilder.build(radioButton.getBackgroundColor()))
				.append("},");
		radioButtonBuilder.append("textDecoration:\"").append(radioButton.getTextDecoration().trim()).append("\",");
		
		radioButtonBuilder.append("verticalalignment:\"")
				.append(radioButton.getVerticalAlignment()).append("\",");
		radioButtonBuilder.append("hidden:").append(radioButton.isHidden())
				.append(",");
		radioButtonBuilder.append("selectedindex:\"")
		.append(radioButton.getSelectedIndex()).append("\",");
		radioButtonBuilder.append("fieldname:\"")
		.append(radioButton.getFieldname()).append("\",");
		
		
		if(!radioButton.getRadioButtonDataArray().isEmpty()){
			radioButtonBuilder.append("radio_items:[");
			Iterator it = radioButton.getRadioButtonDataArray().entrySet().iterator();
		    while (it.hasNext()) {
		    	 Map.Entry pairs = (Map.Entry)it.next();
		    	radioButtonBuilder.append("{\"").append(pairs.getKey()+"\":").append("\"" + Utility.parseText(pairs.getValue().toString()) + "\"").append("},");
		        it.remove(); // avoids a ConcurrentModificationException
		    }
		    Utility.removeCommaFromLast(radioButtonBuilder);
		    radioButtonBuilder.append("],");
		    it = null;
		}else{
			radioButtonBuilder.append("radio_items:[");
			
		    radioButtonBuilder.append("],");
		    
		}
		
	
		
		if (radioButton.getEvent() != null) {
			
			radioButtonBuilder.append("events:{");
			for (Event event : radioButton.getEvent()) {

				StringBuilder actions = RadioButtonEventBuilder.buildEvent(genApp, baseView, event);
				radioButtonBuilder.append(actions);
			}
			Utility.removeCommaFromLast(radioButtonBuilder);
			radioButtonBuilder.append("}");
			
		}
		radioButtonBuilder.append("}");
		return radioButtonBuilder;

	}
}