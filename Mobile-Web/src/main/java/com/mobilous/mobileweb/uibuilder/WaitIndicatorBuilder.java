package com.mobilous.mobileweb.uibuilder;

import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.Indicator;

public class WaitIndicatorBuilder {

	public static StringBuilder build(BaseView baseView, GenApp genapp) {

		/*
		 * {id:"ui-34",name:"Indicator_20130116103350498",
		 * viewtype:"Indicator",style:"White",start:"",hide:"",stop:"",
		 * frame:{x:180,y:30,width:90,height:38}}
		 */
		Indicator waitIndicator = (Indicator) baseView;
		StringBuilder waitIndicatorBuilder = new StringBuilder();

		waitIndicatorBuilder.append("{id:\"").append(waitIndicator.getUiid())
				.append("\",");
		waitIndicatorBuilder.append("name:\"").append(waitIndicator.getName())
				.append("\",");
		waitIndicatorBuilder.append("viewtype:\"")
				.append(waitIndicator.getViewType()).append("\",");
		waitIndicatorBuilder.append("taborder:\"").append(waitIndicator.getTabOrder()).append("\",");
		waitIndicatorBuilder.append("template:\"").append("\",");
		waitIndicatorBuilder.append("frame:{")
				.append(FrameBuilder.build(waitIndicator.getFrame()))
				.append("},");
		waitIndicatorBuilder.append("style:\"")
				.append(waitIndicator.getStyle()).append("\",");
		waitIndicatorBuilder.append("start:\"")
				.append(waitIndicator.isStartSpinning()).append("\",");
		waitIndicatorBuilder.append("hideswhenstopped:\"")
				.append(waitIndicator.isHidesWhenStopped()).append("\",");
		waitIndicatorBuilder.append("stop:\"")
				.append(!waitIndicator.isStartSpinning()).append("\",");
		waitIndicatorBuilder.append("}");

		return waitIndicatorBuilder;

	}

}
