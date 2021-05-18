package com.mobilous.mobileweb.uibuilder;

import com.mobilous.mobileweb.EventBuilder.SliderEventBuilder;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.Slider;
import com.mobilous.mobileweb.util.Utility;

public class SliderBuilder {

	/*
	 * {id:"ui-27",name:"Slider_20130114151836505",viewtype:"Slider",
	 * type:"range",value:15,min:0,max:100,initial:15,
	 * frame:{x:350,y:150,width:135,height:15},
	 * background:{red:204,blue:153,green:0,alpha:1},lineheight:20},
	 */

	public static StringBuilder build(BaseView baseview, GenApp genapp) {

		Slider slider = (Slider) baseview;
		StringBuilder sliderBuilder = new StringBuilder();

		sliderBuilder.append("{id:\"").append(slider.getUiid()).append("\",");
		sliderBuilder.append("name:\"").append(slider.getName()).append("\",");
		sliderBuilder.append("viewtype:\"").append(slider.getViewType())
				.append("\",");
		sliderBuilder.append("taborder:\"").append(slider.getTabOrder()).append("\",");
		sliderBuilder.append("hidden:").append(slider.isHidden()).append(",");
		if(slider.getFieldname().equalsIgnoreCase(""))
			sliderBuilder.append("template:\"").append("\",");
		else
			sliderBuilder.append("template:\"").append("["+slider.getFieldname()+"]").append("\",");
		// Hardcoded value -> Where should we read it from?
		sliderBuilder.append("type:\"").append("range").append("\",");
		// 'value' and 'initial' have the same value. This should be resolved.
		sliderBuilder.append("value:\"").append(slider.getCurrentValue())
				.append("\",");
		sliderBuilder.append("min:\"").append(slider.getMinimumValue())
				.append("\",");
		sliderBuilder.append("max:\"").append(slider.getMaximumValue())
				.append("\",");
		sliderBuilder.append("initial:\"").append(slider.getCurrentValue())
				.append("\",");
		sliderBuilder.append("frame:{")
				.append(FrameBuilder.build(slider.getFrame())).append("},");
		sliderBuilder.append("background:{")
				.append(ColorBuilder.build(slider.getBackgroundColor()))
				.append("},");
		/*sliderBuilder.append("trackcolor:{")
		.append(ColorBuilder.build(slider.getTrackColor()))
		.append("},")
		.append("trackcolorgradient:{")
		.append(ColorBuilder.build(slider.getTrackColorGradient()))
		.append("},");*/
		
		
		/*sliderBuilder.append("thumbcolor:{")
		.append(ColorBuilder.build(slider.getThumbColor()))
		.append("},")
		.append("thumbcolorgradient:{")
		.append(ColorBuilder.build(slider.getThumbColorGradient()))
		.append("},");*/
		
		sliderBuilder.append("thumbcolor:{")
		.append(ColorBuilder.build(slider.getThumbGradientColor1()))
		.append("},");
		
		sliderBuilder.append("trackcolor:{")
		.append(ColorBuilder.build(slider.getTrackGradientColor1()))
		.append("},")
		.append("trackcolorgradient:{")
		.append(ColorBuilder.build(slider.getTrackGradientColor2()))
		.append("},");
		
		
		
		sliderBuilder.append("lineheight:\"").append("20").append("\",");
		
		// applying Events on Slider UI ..
				if(slider.getEvent()!=null){
					sliderBuilder.append("events:{");
						for(Event event: baseview.getEvent()){

							StringBuilder actions = SliderEventBuilder.buildEvent(genapp,baseview,event);
							sliderBuilder.append(actions);
						}
						Utility.removeCommaFromLast(sliderBuilder);
						sliderBuilder.append("}");
				}
		
		
		sliderBuilder.append("} ");
		return sliderBuilder;

	}

}
