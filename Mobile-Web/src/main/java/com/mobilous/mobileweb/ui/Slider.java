package com.mobilous.mobileweb.ui;

import java.util.ArrayList;

import com.mobilous.mobileweb.attribute.Color;
import com.mobilous.mobileweb.etc.StateArray;
import com.mobilous.mobileweb.event.Event;

public class Slider extends ControlView {

	private String viewType = "Slider";
	private double currentValue = -1;
	private Color backgroundColor = null;
	private Color trackColor = null;
	private Color thumbColor = null;
	private Color trackColorGradient = null;
	private Color thumbColorGradient = null;
	private double minimumValue = -1;
	private double maximumValue = -1;
	private StateArray stateArray = null;
	private ArrayList<Event> event = null;
	private int tabOrder=0;
	
	private Color thumbGradientColor1 =null;
	private Color trackGradientColor2 =null;
	private Color trackGradientColor1 =null;
	
	public double getCurrentValue() {
		return currentValue;
	}

	public void setCurrentValue(double currentValue) {
		this.currentValue = currentValue;
	}

	@Override
	public Color getBackgroundColor() {
		return backgroundColor;
	}

	@Override
	public void setBackgroundColor(Color backgroundColor) {
		this.backgroundColor = backgroundColor;
	}
	
	public Color getTrackColor() {
		return trackColor;
	}
	
	public void setTrackColor(Color trackColor) {
		this.trackColor = trackColor;
	}
	
	public Color getThumbColor() {
		return thumbColor;
	}
	
	public void setThumbColor(Color thumbColor) {
		this.thumbColor = thumbColor;
	}

	public double getMinimumValue() {
		return minimumValue;
	}

	public void setMinimumValue(double minimumValue) {
		this.minimumValue = minimumValue;
	}

	public double getMaximumValue() {
		return maximumValue;
	}

	public void setMaximumValue(double maximumValue) {
		this.maximumValue = maximumValue;
	}

	public StateArray getStateArray() {
		return stateArray;
	}

	public void setStateArray(StateArray stateArray) {
		this.stateArray = stateArray;
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

	public Color getTrackColorGradient() {
		return trackColorGradient;
	}

	public void setTrackColorGradient(Color trackColorGradient) {
		this.trackColorGradient = trackColorGradient;
	}

	public Color getThumbColorGradient() {
		return thumbColorGradient;
	}

	public void setThumbColorGradient(Color thumbColorGradient) {
		this.thumbColorGradient = thumbColorGradient;
	}

	public int getTabOrder() {
		return tabOrder;
	}

	public void setTabOrder(int tabOrder) {
		this.tabOrder = tabOrder;
	}

	
	public Color getTrackGradientColor2() {
		return trackGradientColor2;
	}

	public void setTrackGradientColor2(Color trackGradientColor2) {
		this.trackGradientColor2 = trackGradientColor2;
	}

	public Color getThumbGradientColor1() {
		return thumbGradientColor1;
	}

	public void setThumbGradientColor1(Color thumbGradientColor1) {
		this.thumbGradientColor1 = thumbGradientColor1;
	}

	public Color getTrackGradientColor1() {
		return trackGradientColor1;
	}

	public void setTrackGradientColor1(Color trackGradientColor1) {
		this.trackGradientColor1 = trackGradientColor1;
	}
}
