package com.mobilous.mobileweb.ui;

import java.util.ArrayList;

import com.mobilous.mobileweb.attribute.Color;
import com.mobilous.mobileweb.attribute.Point;
import com.mobilous.mobileweb.event.Event;

public class ToolBarLeft extends BaseView{
	private String viewType = "ToolBarLeft";
	private Boolean toolBarLeftHidden = false;
	private Color backgroundColor = null;
	private Point toolBarLeftFrame = null;
	private ArrayList<BaseView> children = null;
	
	private String view = "";
	private ArrayList<BaseView> tableData = null;
	private Boolean fixed = false;

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

	public Boolean getToolBarLeftHidden() {
		return toolBarLeftHidden;
	}

	public void setToolBarLeftHidden(Boolean toolBarLeftHidden) {
		this.toolBarLeftHidden = toolBarLeftHidden;
	}

	public Point getToolBarBottomFrame() {
		return toolBarLeftFrame;
	}

	public void setToolBarLeftFrame(Point toolBarLeftFrame) {
		this.toolBarLeftFrame = toolBarLeftFrame;
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

	public Boolean getFixed() {
		return fixed;
	}

	public void setFixed(Boolean fixed) {
		this.fixed = fixed;
	}

}
