package com.mobilous.mobileweb.ui;

import java.util.ArrayList;

import com.mobilous.mobileweb.event.Event;

public class GadgetFile extends BaseView {

	private String viewType = "GadgetFile";
	private String mainPartName = "";
	private ArrayList<String> notAllowViewTypes = null;
	private ArrayList<BaseView> children = null;
	private ArrayList<Event> event = null;

	@Override
	public String getViewType() {
		// TODO Auto-generated method stub
		return viewType;
	}

	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ArrayList<Event> getEvent() {
		// TODO Auto-generated method stub
		return event;
	}

	public String getMainPartName() {
		return mainPartName;
	}

	public void setMainPartName(String mainPartName) {
		this.mainPartName = mainPartName;
	}

	public ArrayList<String> getNotAllowViewTypes() {
		return notAllowViewTypes;
	}

	public void setNotAllowViewTypes(ArrayList<String> notAllowViewTypes) {
		this.notAllowViewTypes = notAllowViewTypes;
	}

	public ArrayList<BaseView> getChildren() {
		return children;
	}

	public void setChildren(ArrayList<BaseView> children) {
		this.children = children;
	}

	public void setViewType(String viewType) {
		this.viewType = viewType;
	}

	public void setEvent(ArrayList<Event> event) {
		this.event = event;
	}

}
