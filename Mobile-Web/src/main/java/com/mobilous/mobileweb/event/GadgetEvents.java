package com.mobilous.mobileweb.event;

import java.util.ArrayList;

public class GadgetEvents {
	
	private ArrayList<Event> events = null;
	
	private String eventObject = "";
	
	private String objectEventName = "";
	
	private String eventName = "";
			
	
	public ArrayList<Event> getEvents() {
		// TODO Auto-generated method stub
		return events;
	}
	public void setEvents(ArrayList<Event> events) {
		this.events = events;
	}
	public String getEventObject() {
		return eventObject;
	}
	public void setEventObject(String eventObject) {
		this.eventObject = eventObject;
	}
	public String getObjectEventName() {
		return objectEventName;
	}
	public void setObjectEventName(String objectEventName) {
		this.objectEventName = objectEventName;
	}
	public String getEventName() {
		return eventName;
	}
	public void setEventName(String eventName) {
		this.eventName = eventName;
	}

}
