package com.mobilous.mobileweb.uibuilder;

import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.Segment;

public class SegmentBuilder {

	/*
	 * {id:"ui-36",name:"Segment_20130121144002748",viewtype:"Segment",style:"",
	 * segment_items:["label1","label2","label3","label4"],
	 * frame:{x:120,y:350,width:40,height:60},font:{size:20,
	 * align:"left",color:{red:138,blue:43,green:43,alpha:1}},
	 * background:{red:204,blue:153,green:0,alpha:1}}
	 */

	public static StringBuilder build(BaseView baseView, GenApp genapp) {

		Segment segment = (Segment) baseView;
		StringBuilder segmentBuilder = new StringBuilder();

		segmentBuilder.append("{id:\"").append(segment.getUiid()).append("\",");
		segmentBuilder.append("name:\"").append(segment.getName())
				.append("\",");
		segmentBuilder.append("viewtype:\"").append(segment.getViewType())
				.append("\",");
		segmentBuilder.append("taborder:\"").append(segment.getTabOrder()).append("\",");
		segmentBuilder.append("hidden:").append(segment.isHidden()).append(",");
		segmentBuilder.append("segmentInitialValue:\"").append(segment.getSegmentInitialValue()).append("\",");
		segmentBuilder.append("style:\"")
				.append(segment.getSegmentedControlStyle()).append("\",");
		segmentBuilder.append("template:\"").append("\",");
		if(segment.getBorderColor() != null) {
			segmentBuilder
				.append("border:{")
				.append(BorderBuilder.build(segment.getBorderWidth(),
						segment.getBorderStyle(), segment.getBorderColor()))
				.append("},");
		}
		segmentBuilder
				.append("segment_items:")
				.append(SegmentItemsBuilder.build(segment.getSegmentItems(),
						baseView, genapp, segment)).append(",");
		segmentBuilder.append("frame:{")
				.append(FrameBuilder.build(segment.getFrame())).append("},");
		// segmentBuilder.append("font:{").append(FontBuilder.build(SegmentItemsBuilder.getFont())).append("},");
		segmentBuilder.append("background:{")
				.append(ColorBuilder.build(segment.getTintColor()))
				.append("},");
		segmentBuilder.append("}");

		return segmentBuilder;

	}

}
