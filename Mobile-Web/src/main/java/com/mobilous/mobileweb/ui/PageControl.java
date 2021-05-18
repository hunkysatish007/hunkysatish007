package com.mobilous.mobileweb.ui;

import java.util.ArrayList;

import com.mobilous.mobileweb.attribute.Color;
import com.mobilous.mobileweb.event.Event;

public class PageControl extends ControlView {

	private String viewType = "PageControl";
	private int numberOfPages = -1;
	private Color backgroundColor = null;
	private boolean hidesForSinglePage = false;
	private boolean defersCurrentPageDisplay = false;
	private ArrayList<Event> event = null;

	public int getNumberOfPages() {
		return numberOfPages;
	}

	public void setNumberOfPages(int numberOfPages) {
		this.numberOfPages = numberOfPages;
	}

	@Override
	public Color getBackgroundColor() {
		return backgroundColor;
	}

	@Override
	public void setBackgroundColor(Color backgroundColor) {
		this.backgroundColor = backgroundColor;
	}

	public boolean isHidesForSinglePage() {
		return hidesForSinglePage;
	}

	public void setHidesForSinglePage(boolean hidesForSinglePage) {
		this.hidesForSinglePage = hidesForSinglePage;
	}

	public boolean isDefersCurrentPageDisplay() {
		return defersCurrentPageDisplay;
	}

	public void setDefersCurrentPageDisplay(boolean defersCurrentPageDisplay) {
		this.defersCurrentPageDisplay = defersCurrentPageDisplay;
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
