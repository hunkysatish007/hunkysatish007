package com.mobilous.mobileweb.ui;

import java.util.ArrayList;

import com.mobilous.mobileweb.attribute.Color;
import com.mobilous.mobileweb.attribute.Point;
import com.mobilous.mobileweb.event.Event;

public class ToolBarBottom extends BaseView{
	private String viewType = "ToolBarBottom";
	private Boolean toolBarBottomHidden = false;
	private Color backgroundColor = null;
	private Point toolBarBottomFrame = null;
	private ArrayList<BaseView> children = null;
	
	

	@Override
	public String getViewType() {
		// TODO Auto-generated method stub
		return this.viewType;
	}

	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ArrayList<Event> getEvent() {
		// TODO Auto-generated method stub
		return null;
	}

	public Boolean getToolBarBottomHidden() {
		return toolBarBottomHidden;
	}

	public void setToolBarBottomHidden(Boolean toolBarBottomHidden) {
		this.toolBarBottomHidden = toolBarBottomHidden;
	}

	public Point getToolBarBottomFrame() {
		return toolBarBottomFrame;
	}

	public void setToolBarBottomFrame(Point toolBarBottomFrame) {
		this.toolBarBottomFrame = toolBarBottomFrame;
	}

	public Color getBackgroundColor() {
		return backgroundColor;
	}

	public void setBackgroundColor(Color backgroundColor) {
		this.backgroundColor = backgroundColor;
	}
	
	public ArrayList<BaseView> getChildren() {
		return children;
	}

	public void setChildren(ArrayList<BaseView> children) {
		this.children = children;
	}

}
