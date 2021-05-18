/*

 * @author : Sachit Kesri
 * @date : 7 May, 2015
 */

package com.mobilous.mobileweb.uibuilder;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map.Entry;

import com.mobilous.mobileweb.EventBuilder.GadgetEventBuilder;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.etc.DataArray;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.event.GadgetEvents;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.Gadget;
import com.mobilous.mobileweb.util.Utility;

public class GadgetUIBuilder {

	public static StringBuilder build(BaseView baseview, GenApp genapp) {
		Gadget gadget = (Gadget) baseview;

		StringBuffer gadgetBuilder = new StringBuffer();
		StringBuilder gadgetString = new StringBuilder();
		gadgetBuilder.append("{id:\"").append(gadget.getUiid()).append("\",");
		gadgetBuilder.append("name:\"").append(gadget.getName()).append("\",");
		gadgetBuilder.append("hidden:\"").append(gadget.isHidden()).append("\",");
		gadgetBuilder.append("viewtype:\"").append("Gadget").append("\",");
		gadgetBuilder.append("gadgetCategory:\"").append(gadget.getGadgetCategoty()).append("\",");
		gadgetBuilder.append("mainObjectName:\"").append(gadget.getMainObjectName()).append("\",");
		gadgetBuilder.append("frame:{")
				.append(FrameBuilder.build(gadget.getFrame())).append("},");
		gadgetBuilder.append("border:{").append(BorderBuilder.build(gadget.getBorderWidth(),"",gadget.getBorderColor())).append("},");
		gadgetBuilder.append("background:{")
				.append(ColorBuilder.build(gadget.getBackgroundColor()))
				.append("},");
		ArrayList<BaseView> gadgetChidren = gadget.getChildren();
		StringBuilder gadgetChidrenContents = new StringBuilder();
		gadgetChidrenContents.append(ChildrenBuilder.buildChildren(gadgetChidren,gadgetBuilder, genapp));
		Utility.removeCommaFromLast(gadgetChidrenContents);
		gadgetBuilder.append("children:[\n\t");
		gadgetBuilder.append(gadgetChidrenContents);
		gadgetBuilder.append("],\n\t");
		ArrayList<DataArray> dataArray = gadget.getDataArray();
		gadgetBuilder.append("dataArray:[\n\t");
		for(DataArray array : dataArray){
			gadgetBuilder.append("{");
			gadgetBuilder.append("name:\"").append(array.getObjectName()).append("\",");
			gadgetBuilder.append("property:\"").append(array.getProperty()).append("\",");
			gadgetBuilder.append("value:\"").append(array.getValue()).append("\",");
			gadgetBuilder.append("},");
		}
		gadgetBuilder.append("],\n\t");
		gadgetBuilder.append("events:{");
		HashMap<String, StringBuilder> eventMap = new HashMap<String, StringBuilder>();
		StringBuilder actions = new StringBuilder();
		for(GadgetEvents gadgetEvents : gadget.getGadgetEvents()){
			if(gadgetEvents.getEvents() != null){
				eventMap.put(gadgetEvents.getEventObject(), new StringBuilder(""));
			}
		}
		
		for(GadgetEvents gadgetEvents : gadget.getGadgetEvents()){
			if(gadgetEvents.getEvents() != null){
			//	gadgetBuilder.append(gadgetEvents.getEventObject()).append(":{");
				
				for(Event event : gadgetEvents.getEvents()){
				 actions = GadgetEventBuilder.buildEvent(
							genapp, baseview, event);
					//gadgetBuilder.append(actions);
				}
				for (Entry<String, StringBuilder> entry : eventMap.entrySet()) {
					if(gadgetEvents.getEventObject().equalsIgnoreCase(entry.getKey())){
						eventMap.put(entry.getKey(), entry.getValue().append(actions));
					}
				}
			//	gadgetBuilder.append("},");
				
		}
		}
		for (Entry<String, StringBuilder> entry : eventMap.entrySet()) {
			gadgetBuilder.append(entry.getKey() + ":{" +entry.getValue() + "},");
		}
		gadgetBuilder.append("}");
		/*if (gadget.getEvent() != null) {
			gadgetBuilder.append("events:{");
			for (Event event : baseview.getEvent()) {

				StringBuilder actions = TextFieldViewEventBuilder.buildEvent(
						genapp, baseview, event);
				gadgetBuilder.append(actions);
			}
			//Utility.removeCommaFromLast(gadgetBuilder);
			gadgetBuilder.append("}");

		}*/
		gadgetBuilder.append("}");
		gadgetString.append(gadgetBuilder);
		return gadgetString;

	}

}
