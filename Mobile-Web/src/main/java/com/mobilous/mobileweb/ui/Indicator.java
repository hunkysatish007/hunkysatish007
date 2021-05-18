package com.mobilous.mobileweb.ui;

import java.util.ArrayList;

import com.mobilous.mobileweb.event.Event;

public class Indicator extends BaseView {

	private String style = "";
	private boolean startSpinning = false;
	private boolean hidesWhenStopped = false;
	private ArrayList<Event> event = null;
	private int tabOrder=0;	
	
	public String getStyle() {
		return style;
	}

	public void setStyle(String style) {
		this.style = style;
	}

	public boolean isStartSpinning() {
		return startSpinning;
	}

	public void setStartSpinning(boolean startSpinning) {
		this.startSpinning = startSpinning;
	}

	public boolean isHidesWhenStopped() {
		return hidesWhenStopped;
	}

	public void setHidesWhenStopped(boolean hidesWhenStopped) {
		this.hidesWhenStopped = hidesWhenStopped;
	}

	@Override
	public String getViewType() {
		return "Indicator";
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
}
