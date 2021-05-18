package com.mobilous.mobileweb.ui;

import java.util.ArrayList;

import com.mobilous.mobileweb.attribute.Color;
import com.mobilous.mobileweb.attribute.Point;
import com.mobilous.mobileweb.event.Event;

public class Segment extends ControlView {

	private String viewType = "Segment";
	private String segmentedControlStyle = "Plain";
	private int selectedSegmentIndex = 0;
	private Color tintColor = null;
	
	private ArrayList<ToolBarItems> segmentItems = null;
	private Point frame = null;
	private int tabOrder=0;	
	private String segmentInitialValue="";
	private Color borderColor = null;
	private String borderStyle = "";
	private String borderWidth = "1";
	
	public String getSegmentedControlStyle() {
		return segmentedControlStyle;
	}

	public void setSegmentedControlStyle(String segmentedControlStyle) {
		this.segmentedControlStyle = segmentedControlStyle;
	}

	public int getSelectedSegmentIndex() {
		return selectedSegmentIndex;
	}

	public void setSelectedSegmentIndex(int selectedSegmentIndex) {
		this.selectedSegmentIndex = selectedSegmentIndex;
	}

	public Color getTintColor() {
		return tintColor;
	}

	public void setTintColor(Color tintColor) {
		this.tintColor = tintColor;
	}

	
	public ArrayList<ToolBarItems> getSegmentItems() {
		return segmentItems;
	}

	public void setSegmentItems(ArrayList<ToolBarItems> segmentItems) {
		this.segmentItems = segmentItems;
	}

	@Override
	public Point getFrame() {
		return frame;
	}

	@Override
	public void setFrame(Point frame) {
		this.frame = frame;
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
		return null;
	}

	public int getTabOrder() {
		return tabOrder;
	}

	public void setTabOrder(int tabOrder) {
		this.tabOrder = tabOrder;
	}

	public String getSegmentInitialValue() {
		return segmentInitialValue;
	}

	public void setSegmentInitialValue(String segmentInitialValue) {
		this.segmentInitialValue = segmentInitialValue;
	}

	public Color getBorderColor() {
		return borderColor;
	}

	public void setBorderColor(Color borderColor) {
		this.borderColor = borderColor;
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
}
