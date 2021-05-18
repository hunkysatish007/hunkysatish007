package com.mobilous.mobileweb.uibuilder;

import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.ProgressBar;

public class ProgressBarBuilder {
	/*
	 * {id:"ui-21",name:"ProgressBar_20130110190755472",viewtype:"ProgressBar",
	 * frame:{x:100,y:300,width:178,height:8},
	 * style:"progress progress_container progress_container_bar", value:0.8}
	 */

	/*
	 * {"id":"ui-9","frame":{"height":8.0,"width":75.0,"y":341.0,"x":63.0},
	 * "style"
	 * :"Bar","name":"ProgressBar_20130207153622970","value":0.6,"viewtype"
	 * :"ProgressBar"}
	 */

	public static StringBuilder build(BaseView baseView, GenApp genapp) {

		ProgressBar progress = (ProgressBar) baseView;

		// JSON Version
		/*
		 * JSONObject jsonObject = new JSONObject(); jsonObject.put("id",
		 * progress.getUiid()); jsonObject.put("name", progress.getName());
		 * jsonObject.put("viewtype", progress.getViewType());
		 * jsonObject.put("frame", FrameBuilder.build(progress.getFrame())); //
		 * Deosn't look good with the options from the builder
		 * //jsonObject.put("style", progress.getStyle());
		 * jsonObject.put("style",
		 * "progress progress_container progress_container_bar");
		 * jsonObject.put("value", progress.getProgress());
		 * 
		 * return jsonObject;
		 */

		StringBuilder progressBarBuilder = new StringBuilder();

		progressBarBuilder.append("{id:\"").append(progress.getUiid())
				.append("\",");
		progressBarBuilder.append("name:\"").append(progress.getName())
				.append("\",");
		progressBarBuilder.append("viewtype:\"").append(progress.getViewType())
				.append("\",");
		progressBarBuilder.append("hidden:\"").append(progress.isHidden()).append("\",");
		progressBarBuilder.append("taborder:\"").append(progress.getTabOrder()).append("\",");
		progressBarBuilder.append("cornerRadius:\"").append(progress.getCornerRadius()).append("\",");
		progressBarBuilder.append("border:{").append(BorderBuilder.build(String.valueOf(progress.getBorderWeight()), "",progress.getBorderColor())).append("},");
		
		if(progress.getFieldname().equalsIgnoreCase(""))
			progressBarBuilder.append("template:\"").append("\",");
		else 
			progressBarBuilder.append("template:\"").append("["+progress.getFieldname()+"]").append("\",");
		
		progressBarBuilder.append("value:\"").append(progress.getProgress())
			.append("\",");
		progressBarBuilder.append("style:\"")
			.append(progress.getStyle().toLowerCase()).append("\",");
		if(progress.getStyle().toLowerCase().equalsIgnoreCase("circle"))
			progressBarBuilder.append("radius:\"").append(progress.getRadius()).append("\",");
		
		progressBarBuilder.append("background:{")
			.append(ColorBuilder.build(progress.getBackgroundColor())).append("},");
		progressBarBuilder.append("fill:{")
			.append(ColorBuilder.build(progress.getFillColor())).append("},");
		
		progressBarBuilder.append("frame:{")
				.append(FrameBuilder.build(progress.getFrame())).append("},");
		progressBarBuilder.append("}");

		return progressBarBuilder;

	}

}
