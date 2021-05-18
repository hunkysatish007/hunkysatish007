package com.mobilous.mobileweb.uibuilder;

import com.mobilous.mobileweb.attribute.Font;

 // Class to build color to JSON object from java Color object
public class FontBuilder {
	
	public static StringBuilder build(Font font) {
		
		StringBuilder fontStr = new StringBuilder();
		fontStr.append("fontName:\"").append(font.getFont()).append("\",");
		fontStr.append("size:\"").append(font.getFontSize()).append("\",");
		fontStr.append("align:\"").append(font.getTextAlignment()).append("\",");
		fontStr.append("weight:").append(font.isFontWeight()).append(",");
		fontStr.append("lineBreakMode:\"").append(font.getLineBreakMode()).append("\",");
		fontStr.append("style:").append(font.isFontStyle()).append(",");
		fontStr.append("color:{").append(ColorBuilder.build(font.getTextColor())).append("}");
		return fontStr;
	}
}
