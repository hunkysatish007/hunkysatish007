package com.mobilous.mobileweb.ui;

import java.util.ArrayList;

import com.mobilous.mobileweb.etc.Markers;
import com.mobilous.mobileweb.event.Event;

//TODO: this should extend to a MAPVIEW but the doc for it is undefined as of now
public class GoogleMap extends BaseView{

	private String viewType = "GoogleMap";
	private String initialPosition = "";
	private ArrayList<Markers> markerDef = null;
	private int zoom = 0;
	private boolean gps = false;
	private ArrayList<Event> event = null;
	private int tabOrder=0;	
	
	public String getInitialPosition() {
		return initialPosition;
	}

	public void setInitialPosition(String initialPosition) {
		this.initialPosition = initialPosition;
	}

	public ArrayList<Markers> getMarkerDef() {
		return markerDef;
	}

	public void setMarkerDef(ArrayList<Markers> markerDef) {
		this.markerDef = markerDef;
	}

	public int getZoom() {
		return zoom;
	}

	public void setZoom(int zoom) {
		this.zoom = zoom;
	}

	public boolean isGps() {
		return gps;
	}

	public void setGps(boolean gps) {
		this.gps = gps;
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

	public int getTabOrder() {
		return tabOrder;
	}

	public void setTabOrder(int tabOrder) {
		this.tabOrder = tabOrder;
	}
}
