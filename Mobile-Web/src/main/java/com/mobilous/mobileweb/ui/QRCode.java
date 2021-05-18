/*
 * Author : Sachit Kesri
 * Date : 11 Sept, 2015
 */
package com.mobilous.mobileweb.ui;

import java.util.ArrayList;

import com.mobilous.mobileweb.event.Event;

public class QRCode extends BaseView{
	
	String viewtype = "QRCode";
	String encstring = "";

	@Override
	public String getViewType() {
		return this.viewtype;
	}
	public String getEncstring() {
		return encstring;
	}

	public void setEncstring(String encstring) {
		this.encstring = encstring;
	}
	@Override
	public String toString() {
		return this.viewtype;
	}

	@Override
	public ArrayList<Event> getEvent() {
		return null;
	}

}
