package com.mobilous.mobileweb.ui;

import java.util.ArrayList;

import com.mobilous.mobileweb.attribute.Color;
import com.mobilous.mobileweb.event.Event;

public class ProgressBar extends BaseView {

	// TODO: this String should be a BAR datatype
	private String viewType = "ProgressBar";
	private String style = "default"; // bar
	private double progress = -1;
	private ArrayList<Event> event = null;
	private int tabOrder=0;
	private Color borderColor = null;
	private int borderWeight = 0;
	private int cornerRadius=0;
	
	private Color fillColor = null;
	private int radius=0;
	//private Boolean hidden = false;
	
	public String getStyle() {
		return style;
	}

	public void setStyle(String style) {
		this.style = style;
	}

	public double getProgress() {
		return progress;
	}

	public void setProgress(double progress) {
		this.progress = progress;
	}

	public Color getFillColor() {
		return fillColor;
	}

	public void setFillColor(Color fillColor) {
		this.fillColor = fillColor;
	}

	public int getRadius() {
		return radius;
	}

	public void setRadius(int radius) {
		this.radius = radius;
	}

	@Override
	public String getViewType() {
		return viewType;
	}

	@Override
	public String toString() {
		return null;
	}

	@Override
	public ArrayList<Event> getEvent() {
		return event;
	}

	public void setEvent(ArrayList<Event> event) {
		this.event = event;
	}

	public int getTabOrder() {
		return tabOrder;
	}

	public void setTabOrder(int tabOrder) {
		this.tabOrder = tabOrder;
	}

	public Color getBorderColor() {
		return borderColor;
	}

	public void setBorderColor(Color borderColor) {
		this.borderColor = borderColor;
	}

	public int getBorderWeight() {
		return borderWeight;
	}

	public void setBorderWeight(int borderWeight) {
		this.borderWeight = borderWeight;
	}

	public int getCornerRadius() {
		return cornerRadius;
	}

	public void setCornerRadius(int cornerRadius) {
		this.cornerRadius = cornerRadius;
	}

//	public Boolean getHidden() {
//		return hidden;
//	}
//
//	public void setHidden(Boolean hidden) {
//		this.hidden = hidden;
//	}

}
