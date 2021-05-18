package com.mobilous.mobileweb.ui;

import java.util.ArrayList;

import com.mobilous.mobileweb.attribute.Color;
import com.mobilous.mobileweb.event.Event;

public class ToolBar extends BaseView {

	private String viewType = "ToolBar";
	private String barStyle = "Default";
	private Color tintColor = null;
	private boolean translucent = false;
	private ArrayList<ToolBarItems> toolBarItems = null;
	private ArrayList<Event> event = null;

	public String getBarStyle() {
		return barStyle;
	}

	public void setBarStyle(String barStyle) {
		this.barStyle = barStyle;
	}

	public Color getTintColor() {
		return tintColor;
	}

	public void setTintColor(Color tintColor) {
		this.tintColor = tintColor;
	}

	public boolean isTranslucent() {
		return translucent;
	}

	public void setTranslucent(boolean translucent) {
		this.translucent = translucent;
	}

	public ArrayList<ToolBarItems> getToolBarItems() {
		return toolBarItems;
	}

	public void setToolBarItems(ArrayList<ToolBarItems> toolBarItems) {
		this.toolBarItems = toolBarItems;
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
}
