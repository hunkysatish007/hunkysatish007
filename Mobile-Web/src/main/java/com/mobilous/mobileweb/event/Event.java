package com.mobilous.mobileweb.event;

import java.util.ArrayList;

import com.mobilous.mobileweb.action.Action;

public class Event {

	private String eventName = "";
	private ArrayList<Action> action = null;

	public String getEventName() {
		return eventName;
	}

	public void setEventName(String eventName) {
		this.eventName = eventName;
	}

	public ArrayList<Action> getAction() {
		return action;
	}

	public void setAction(ArrayList<Action> action) {
		this.action = action;
	}

}
