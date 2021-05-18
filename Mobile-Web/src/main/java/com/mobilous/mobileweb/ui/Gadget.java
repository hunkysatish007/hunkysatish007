package com.mobilous.mobileweb.ui;

import java.util.ArrayList;

import com.mobilous.mobileweb.app.ScrollView;
import com.mobilous.mobileweb.attribute.Color;
import com.mobilous.mobileweb.attribute.ImageFile;
import com.mobilous.mobileweb.etc.DataArray;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.event.GadgetEvents;

public class Gadget extends ScrollView {

	private String viewType = "Gadget";
	private String gadgetName = "";
	private String mainObjectName = "";
	private ImageFile backgroundImage = null;
	private int tabOrder = -1;
	private ArrayList<String> labelArray = null;
	private ArrayList<DataArray> dataArray = null;
	private boolean tapEvent = false;
	private boolean panEvent = false;
	private boolean pinchEvent = false;
	private boolean rotateEvent = false;
	private boolean longPressEvent = false;
	private ArrayList<Event> event = null;
	private ArrayList<GadgetEvents> gadgetEvents = null;
	
	private int gadgetCategory = 1;
	private Color borderColor = null;
	private String borderWidth = "1";
	private String gadgetdefName = "";

	public String getGadgetName() {
		return gadgetName;
	}

	public void setGadgetName(String gadgetName) {
		this.gadgetName = gadgetName;
	}

	public String getMainObjectName() {
		return mainObjectName;
	}

	public void setMainObjectName(String mainObjectName) {
		this.mainObjectName = mainObjectName;
	}

	public ImageFile getBackgroundImage() {
		return backgroundImage;
	}

	public void setBackgroundImage(ImageFile backgroundImage) {
		this.backgroundImage = backgroundImage;
	}

	public int getTabOrder() {
		return tabOrder;
	}

	public void setTabOrder(int taborder) {
		this.tabOrder = taborder;
	}

	public ArrayList<String> getLabelArray() {
		return labelArray;
	}

	public void setLabelArray(ArrayList<String> labelArray) {
		this.labelArray = labelArray;
	}

	public ArrayList<DataArray> getDataArray() {
		return dataArray;
	}

	public void setDataArray(ArrayList<DataArray> arrayList) {
		this.dataArray = arrayList;
	}

	public boolean isTapEvent() {
		return tapEvent;
	}

	public void setTapEvent(boolean tapEvent) {
		this.tapEvent = tapEvent;
	}

	public boolean isPanEvent() {
		return panEvent;
	}

	public void setPanEvent(boolean panEvent) {
		this.panEvent = panEvent;
	}

	public boolean isPinchEvent() {
		return pinchEvent;
	}

	public void setPinchEvent(boolean pinchEvent) {
		this.pinchEvent = pinchEvent;
	}

	public boolean isRotateEvent() {
		return rotateEvent;
	}

	public void setRotateEvent(boolean rotateEvent) {
		this.rotateEvent = rotateEvent;
	}

	public boolean isLongPressEvent() {
		return longPressEvent;
	}

	public void setLongPressEvent(boolean longPressEvent) {
		this.longPressEvent = longPressEvent;
	}

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

	public void setViewType(String viewType) {
		this.viewType = viewType;
	}

	public void setEvent(ArrayList<Event> event) {
		this.event = event;
	}

	public ArrayList<GadgetEvents> getGadgetEvents() {
		return gadgetEvents;
	}

	public void setGadgetEvents(ArrayList<GadgetEvents> gadgetEvents) {
		this.gadgetEvents = gadgetEvents;
	}

	public int getGadgetCategoty() {
		return gadgetCategory;
	}

	public void setGadgetCategoty(int gadgetCategory) {
		this.gadgetCategory = gadgetCategory;
	}

	public Color getBorderColor() {
		return borderColor;
	}

	public void setBorderColor(Color borderColor) {
		this.borderColor = borderColor;
	}

	public String getBorderWidth() {
		return borderWidth;
	}

	public void setBorderWidth(String borderWidth) {
		this.borderWidth = borderWidth;
	}

	public String getGadgetdefName() {
		return gadgetdefName;
	}

	public void setGadgetdefName(String gadgetdefName) {
		this.gadgetdefName = gadgetdefName;
	}


}
