package com.mobilous.mobileweb.ui;

import java.util.ArrayList;

import com.mobilous.mobileweb.attribute.Color;
import com.mobilous.mobileweb.attribute.Point;
import com.mobilous.mobileweb.event.Event;

public class ToolBarTop extends BaseView{

	private String viewType = "ToolBarTop";
	private boolean toolBarTopHidden = false;
	private Color backgroundColor = null;
	private Point toolBarTopFrame = null;
	private ArrayList<BaseView> children = null;
	
	
	
	@Override
	public String getViewType() {
		// TODO Auto-generated method stub
		return null;
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
	public boolean getToolBarTopHidden() {
		return toolBarTopHidden;
	}
	public void setToolBarTopHidden(boolean toolBarTopHidden) {
		this.toolBarTopHidden = toolBarTopHidden;
	}
	public Point getToolBarTopFrame() {
		return toolBarTopFrame;
	}
	public void setToolBarTopFrame(Point toolBarTopFrame) {
		this.toolBarTopFrame = toolBarTopFrame;
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
