package com.mobilous.mobileweb.uibuilder;

import com.mobilous.mobileweb.attribute.Color;

// Class to build color to JSON object from java Color object
public class ColorBuilder {

	public static StringBuilder build(Color color) {
		StringBuilder colorStr = new StringBuilder();

		if (color != null) {
			if ((color.getColorName() != "")
					&& (!color.getColorName().equalsIgnoreCase("transparent"))) {
				if (color.getColorName().equalsIgnoreCase("clear")) {
					colorStr.append("red:").append("0").append(",");
					colorStr.append("blue:").append("0").append(",");
					colorStr.append("green:").append("0").append(",");
					colorStr.append("alpha:").append("0");
				} else if (color.getColorName().equalsIgnoreCase("white")) {
					colorStr.append("red:").append("255").append(",");
					colorStr.append("blue:").append("255").append(",");
					colorStr.append("green:").append("255").append(",");
					colorStr.append("alpha:").append(color.getAlpha());
				}
			} else if (color.getRed() >= 0 && color.getRed() <= 1
					&& color.getGreen() >= 0 && color.getGreen() <= 1
					&& color.getBlue() >= 0 && color.getBlue() <= 1
					&& color.getAlpha() >= 0 && color.getAlpha() <= 1) {
				colorStr.append("red:").append((int) Math.ceil(color.getRed() * 255))
						.append(",");
				colorStr.append("blue:").append((int) Math.ceil(color.getBlue() * 255))
						.append(",");
				colorStr.append("green:").append((int) Math.ceil(color.getGreen() * 255))
						.append(",");
				colorStr.append("alpha:").append(color.getAlpha());
			}
		} else {
			colorStr.append("red:").append("0").append(",");
			colorStr.append("blue:").append("0").append(",");
			colorStr.append("green:").append("0").append(",");
			colorStr.append("alpha:").append("0");
		}

		return colorStr;
	}

}