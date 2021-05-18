package com.mobilous.mobileweb.uibuilder;

import com.mobilous.mobileweb.attribute.Point;

public class FrameBuilder {

	
	public static StringBuilder build(Point point) {
	
		StringBuilder frameBuilder = new StringBuilder();
		frameBuilder.append("x:\"").append( point.getX()).append("\",");
		frameBuilder.append("y:\"").append( point.getY()).append("\",");
		frameBuilder.append("width:\"").append(point.getWidth()).append("\",");
		frameBuilder.append("height:\"").append(point.getHeight()).append("\",");
		frameBuilder.append("rotation:\"").append(point.getRotation()).append("\"");
		
		return frameBuilder;
	}
}
