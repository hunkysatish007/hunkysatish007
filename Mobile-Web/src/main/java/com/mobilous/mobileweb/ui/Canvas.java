package com.mobilous.mobileweb.ui;

import java.util.ArrayList;

import com.mobilous.mobileweb.event.Event;

public class Canvas extends BaseView {

	private String viewType = "Canvas";
	private String canvasName = "";
	private ArrayList<String> drawChildren = null;
	private ArrayList<Event> event = null;

	public String getCanvasName() {
		return canvasName;
	}

	public void setCanvasName(String canvasName) {
		this.canvasName = canvasName;
	}

	public ArrayList<String> getDrawChildren() {
		return drawChildren;
	}

	public void setDrawChildren(ArrayList<String> drawChildren) {
		this.drawChildren = drawChildren;
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
