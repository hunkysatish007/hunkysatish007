package com.mobilous.mobileweb.etc;

import java.util.ArrayList;
import java.util.Arrays;

import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.ToolBar;
import com.mobilous.mobileweb.ui.ToolBarItems;

public class SystemItem extends ToolBar implements ToolBarItems {

	private String type = "SystemItem";
	private String systemItem = "Done";
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
	 * @param systemItem
	 *            the systemItem to set
	 */
	public void setSystemItem(String systemItem) {
		if (Arrays.asList("done", "cancel", "edit", "save", "add", "compose",
				"reply", "action", "organize", "bookmark", "search",
				"refresh", "stop", "camera", "play", "pause", "rewind","trash","settings",
				"fast-forward", "undo", "redo", "page-curl", "back").contains(
				systemItem.toLowerCase()))
			this.systemItem = systemItem;
		else {
			// should throw exception
			this.systemItem = "Done";
		}
	}

	/**
	 * @return the systemItem
	 */
	public String getSystemItem() {
		return systemItem;
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
