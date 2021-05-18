package com.mobilous.mobileweb.param;

import java.util.ArrayList;

import com.mobilous.mobileweb.event.Event;

public class NPEActionSheetButtonsController {

	private String buttonId = "";
	private String buttonTitle = "";
	private ArrayList<Event> event = null;

	public String getButtonId() {
		return buttonId;
	}

	public void setButtonId(String buttonId) {
		this.buttonId = buttonId;
	}

	public String getButtonTitle() {
		return buttonTitle;
	}

	public void setButtonTitle(String buttonTitle) {
		this.buttonTitle = buttonTitle;
	}

	public ArrayList<Event> getEvent() {
		return event;
	}

	public void setEvent(ArrayList<Event> arrayList) {
		this.event = arrayList;
	}

}
