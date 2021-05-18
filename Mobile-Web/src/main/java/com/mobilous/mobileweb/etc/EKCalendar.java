package com.mobilous.mobileweb.etc;

import java.util.ArrayList;

import com.mobilous.mobileweb.attribute.Color;

public class EKCalendar {

	private boolean allowsContentModifications = false;
	private Color CGColor = null;
	private ArrayList<String> supportedEventAvailabilities = null;
	private String title = "";
	private String type = "";

	public boolean isAllowsContentModifications() {
		return allowsContentModifications;
	}

	public void setAllowsContentModifications(boolean allowsContentModifications) {
		this.allowsContentModifications = allowsContentModifications;
	}

	public Color getCGColor() {
		return CGColor;
	}

	public void setCGColor(Color cGColor) {
		CGColor = cGColor;
	}

	public ArrayList<String> getSupportedEventAvailabilities() {
		return supportedEventAvailabilities;
	}

	public void setSupportedEventAvailabilities(
			ArrayList<String> supportedEventAvailabilities) {
		this.supportedEventAvailabilities = supportedEventAvailabilities;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

}
