package com.mobilous.mobileweb.ui;

import java.util.ArrayList;

import com.mobilous.mobileweb.attribute.Color;
import com.mobilous.mobileweb.attribute.Point;
import com.mobilous.mobileweb.event.Event;

public class ToolBarRight extends BaseView{
	private String viewType = "ToolBarRight";
	private Boolean toolBarRightHidden = false;
	private Color backgroundColor = null;
	private Point toolBarRightFrame = null;
	private ArrayList<BaseView> children = null;
	
	private String view = "";
	private ArrayList<BaseView> tableData = null;
	

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

	public Boolean getToolBarRightHidden() {
		return toolBarRightHidden;
	}

	public void setToolBarRightHidden(Boolean toolBarRightHidden) {
		this.toolBarRightHidden = toolBarRightHidden;
	}

	public Point getToolBarBottomFrame() {
		return toolBarRightFrame;
	}

	public void setToolBarRightFrame(Point toolBarRightFrame) {
		this.toolBarRightFrame = toolBarRightFrame;
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

	public String getView() {
		return view;
	}

	public void setView(String view) {
		this.view = view;
	}

	public ArrayList<BaseView> getTableData() {
		return tableData;
	}

	public void setTableData(ArrayList<BaseView> tableData) {
		this.tableData = tableData;
	}

}
