package com.mobilous.mobileweb.uibuilder;

import com.mobilous.mobileweb.attribute.Color;
import com.mobilous.mobileweb.ui.BaseView;
public class BorderBuilder {


	public static StringBuilder build(String borderWidth, String borderStyle, Color borderColor) {
		// TODO Auto-generated method stub
		StringBuilder border= new StringBuilder();
		//border:{borderweight:"2",bordercolor:{red:211.0,blue:221.0,green:121.0,alpha:1.0}}
		border.append("borderweight:\"")
		.append(borderWidth)
		.append("\",borderstyle:\"").append("\"")
		.append(",bordercolor:{")
		.append(ColorBuilder.build(borderColor))
		.append("}");
		
		return border;
	}

}
