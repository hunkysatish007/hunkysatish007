package com.mobilous.mobileweb.ui;

import java.util.ArrayList;

import com.mobilous.mobileweb.attribute.Color;
import com.mobilous.mobileweb.attribute.HTMLFile;
import com.mobilous.mobileweb.event.Event;

public class WebView extends BaseView {

	private String viewType = "WebView";
	private String name = "";
	private boolean scalesPageToFit = false;
	private HTMLFile filename = null;
	private ArrayList<Event> event = null;
	private int tabOrder=0;
	private String borderStyle = null;
	private String borderWidth = "0";
	private Color borderColor = null;
	
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

	@Override
	public String getName() {
		return name;
	}

	@Override
	public void setName(String name) {
		this.name = name;
	}

	public boolean isScalesPageToFit() {
		return scalesPageToFit;
	}

	public void setScalesPageToFit(boolean scalesPageToFit) {
		this.scalesPageToFit = scalesPageToFit;
	}

	public HTMLFile getFilename() {
		return filename;
	}

	public void setFilename(HTMLFile filename) {
		this.filename = filename;
	}

	public void setViewType(String viewType) {
		this.viewType = viewType;
	}

	public void setEvent(ArrayList<Event> event) {
		this.event = event;
	}

	public int getTabOrder() {
		return tabOrder;
	}

	public void setTabOrder(int tabOrder) {
		this.tabOrder = tabOrder;
	}

	public String getBorderStyle() {
		return borderStyle;
	}

	public void setBorderStyle(String borderStyle) {
		this.borderStyle = borderStyle;
	}

	public String getBorderWidth() {
		return borderWidth;
	}

	public void setBorderWidth(String borderWidth) {
		this.borderWidth = borderWidth;
	}

	public Color getBorderColor() {
		return borderColor;
	}

	public void setBorderColor(Color borderColor) {
		this.borderColor = borderColor;
	}

}
