package com.mobilous.mobileweb.ui;

import java.util.ArrayList;

import com.mobilous.mobileweb.event.Event;

public class Camera extends BaseView {
	private String viewType = "Camera";
	private String type = "";
	private String cameraSide = "";
	private int tabOrder=0;	
	private ArrayList<Event> event = null;
	
	
	public String getViewType() {
		return viewType;
	}
	public void setViewType(String viewType) {
		this.viewType = viewType;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public ArrayList<Event> getEvent() {
		return this.event;
	}
	public int getTabOrder() {
		return tabOrder;
	}
	public void setTabOrder(int tabOrder) {
		this.tabOrder = tabOrder;
	}
	public String getCameraSide() {
		return cameraSide;
	}
	public void setCameraSide(String cameraSide) {
		this.cameraSide = cameraSide;
	}
	public void setEvent(ArrayList<Event> event) {
		this.event = event;
	}

}
