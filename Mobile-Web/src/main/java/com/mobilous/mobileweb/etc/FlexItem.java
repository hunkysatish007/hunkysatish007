package com.mobilous.mobileweb.etc;

import java.util.ArrayList;

import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.ToolBar;
import com.mobilous.mobileweb.ui.ToolBarItems;

public class FlexItem extends ToolBar implements ToolBarItems {

	private String type = "FlexItem";
	private boolean flex = false;
	private ArrayList<Event> event = null;
	private String id = "";

	@Override
	public String getId() {
		return id;
	}

	@Override
	public void setId(String id) {
		this.id = id;
	}

	@Override
	public String getType() {
		return type;
	}

	/**
	 * @param flex
	 *            the flex to set
	 */
	public void setFlex(boolean flex) {
		this.flex = flex;
	}

	/**
	 * @return the flex
	 */
	public boolean isFlex() {
		return flex;
	}

	@Override
	public ArrayList<Event> getEvent() {
		return event;
	}

	@Override
	public void setEvent(ArrayList<Event> event) {
		this.event = event;
	}

}
