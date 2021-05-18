package com.mobilous.mobileweb.ui;

import java.util.ArrayList;

import com.mobilous.mobileweb.event.Event;

public class Chart extends BaseView {

	private String viewType = "Chart";
	private String canvasName = "";
	private ArrayList<String> drawChildren = null;
	private ArrayList<Event> event = null;
	
	private String name = "";
	private String type = "";
	private String title = "";
	
	private String serviceName = "";
	private String tableName = "";
	private String whereCondition = "";
	private String itemField = "";
	private String valueField = "";
	
	private Padding padding = null;

	public String getCanvasName() {
		return canvasName;
	}

	public void setCanvasName(String canvasName) {
		this.canvasName = canvasName;
	}

	public ArrayList<String> getDrawChildren() {
		return drawChildren;
	}

	public void setDrawChildren(ArrayList<String> drawChildren) {
		this.drawChildren = drawChildren;
	}
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	
	public String getServiceName() {
		return serviceName;
	}
	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}

	public String getTableName() {
		return tableName;
	}
	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	public String getWhereCondition() {
		return whereCondition;
	}
	public void setWhereCondition(String whereCondition) {
		this.whereCondition = whereCondition;
	}
	
	public String getItemField() {
		return itemField;
	}
	public void setItemField(String itemField) {
		this.itemField = itemField;
	}

	public String getValueField() {
		return valueField;
	}
	public void setValueField(String valueField) {
		this.valueField = valueField;
	}

	public Padding getPadding() {
		return padding;
	}
	public void setPadding(Padding padding) {
		this.padding = padding;
	}

	@Override
	public String getName() {
		return name;
	}

	@Override
	public void setName(String name) {
		this.name = name;
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

}
