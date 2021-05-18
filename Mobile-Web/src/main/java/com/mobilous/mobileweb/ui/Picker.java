package com.mobilous.mobileweb.ui;

import java.util.ArrayList;

import com.mobilous.mobileweb.etc.DataArray;
import com.mobilous.mobileweb.event.Event;

public class Picker extends BaseView {

	private String viewType = "Picker";
	private boolean showsSelectionIndicator = false;
	private ArrayList<DataArray> dataArray = null;
	private ArrayList<Event> event = null;
	private int tabOrder=0;	

	public boolean isShowsSelectionIndicator() {
		return showsSelectionIndicator;
	}

	public void setShowsSelectionIndicator(boolean showsSelectionIndicator) {
		this.showsSelectionIndicator = showsSelectionIndicator;
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

	public ArrayList<DataArray> getDataArray() {
		return dataArray;
	}

	public void setDataArray(ArrayList<DataArray> dataArray) {
		this.dataArray = dataArray;
	}

	public void setViewType(String viewType) {
		this.viewType = viewType;
	}

	public int getTabOrder() {
		return tabOrder;
	}

	public void setTabOrder(int tabOrder) {
		this.tabOrder = tabOrder;
	}

}
