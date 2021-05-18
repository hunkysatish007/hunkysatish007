package com.mobilous.mobileweb.action;

import java.util.ArrayList;

import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.param.Parameters;

public class Action {

	private String method = "";
	private String category = "";
	private Parameters parameters = null;
	private ArrayList<Event> event = null;

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getMethod() {
		return method;
	}

	public Parameters getParameters() {
		return parameters;
	}

	public void setParameters(Parameters parameters) {
		this.parameters = parameters;
	}

	public void setMethod(String method) {
		this.method = method;
	}

	public void setEvent(ArrayList<Event> event) {
		this.event = event;
	}

	public ArrayList<Event> getEvent() {
		return event;
	}
}
