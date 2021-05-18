package com.mobilous.mobileweb.uibuilder;

import com.mobilous.mobileweb.EventBuilder.PickerEventBuilder;
import com.mobilous.mobileweb.EventBuilder.TextFieldViewEventBuilder;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.Picker;
import com.mobilous.mobileweb.util.Utility;

public class PickerBuilder {

	// {id:"ui-36",name:"Segment_20130121144002748",viewtype:"Segment",style:"",segment_items:["label1","label2","label3","label4"],frame:{x:120,y:350,width:40,height:60},font:{size:20,align:"left",color:{red:138,blue:43,green:43,alpha:1}},background:{red:204,blue:153,green:0,alpha:1}}
	// {id:"ui-35",type:"",name:"DatePicker_20130117111159568",viewtype:"DatePicker",mode:"Date",current:"01/17/13",frame:{x:180,y:30,width:225,height:125}},

	public static StringBuilder build(BaseView baseView, GenApp genapp) {
		Picker picker = (Picker) baseView;
		StringBuilder pickerBuilder = new StringBuilder();

		pickerBuilder.append("{id:\"").append(picker.getUiid()).append("\",");
		pickerBuilder.append("name:\"").append(picker.getName()).append("\",");
		pickerBuilder.append("hidden:\"").append(picker.isHidden()).append("\",");
		pickerBuilder.append("value:\"").append("").append("\",");
		pickerBuilder.append("viewtype:\"").append(picker.getViewType())
				.append("\",");
		pickerBuilder.append("taborder:\"").append(picker.getTabOrder())
		.append("\",");
		pickerBuilder.append("frame:{")
				.append(FrameBuilder.build(picker.getFrame())).append("},");
		pickerBuilder.append("pickers_width:")
			.append(PickerItemsBuilder.buildPickerWidth(picker.getDataArray()))
			.append(",");
		pickerBuilder.append("picker_items:")
				.append(PickerItemsBuilder.build(picker.getDataArray()))
				.append(",");
		pickerBuilder.append("picker_values:")
			.append(PickerItemsBuilder.buildValues(picker.getDataArray()))
			.append(",");
		pickerBuilder.append("picker_items_selected:")
		.append(PickerItemsBuilder.buildSelected(picker.getDataArray()))
		.append(",");
		
		// applying Events on Picker UI ..
		if(picker.getEvent()!=null){
			pickerBuilder.append("events:{");
				for(Event event: baseView.getEvent()){

					StringBuilder actions = PickerEventBuilder.buildEvent(genapp,baseView,event);
					pickerBuilder.append(actions);
				}
				Utility.removeCommaFromLast(pickerBuilder);
				pickerBuilder.append("}");
		}
		
		
		pickerBuilder.append("}");

		return pickerBuilder;
	}

}
