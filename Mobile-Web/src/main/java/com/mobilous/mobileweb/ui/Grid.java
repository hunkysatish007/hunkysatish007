package com.mobilous.mobileweb.ui;

public class Grid {
	
	private int id = 0; 
	private String fieldName = "";
	private String width = "";
	private int row = 1;
	private int column = 1;
	private boolean freeze = false;
	private boolean sortable = false;
	private String uiType = "label";
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getFieldName() {
		return fieldName;
	}
	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}
	public String getWidth() {
		return width;
	}
	public void setWidth(String width) {
		this.width = width;
	}
	public int getRow() {
		return row;
	}
	public void setRow(int row) {
		this.row = row;
	}
	public int getColumn() {
		return column;
	}
	public void setColumn(int column) {
		this.column = column;
	}
	public boolean isFreeze() {
		return freeze;
	}
	public void setFreeze(boolean freeze) {
		this.freeze = freeze;
	}
	public boolean isSortable() {
		return sortable;
	}
	public void setSortable(boolean sortable) {
		this.sortable = sortable;
	}
	public String getUiType() {
		return uiType;
	}
	public void setUiType(String uiType) {
		this.uiType = uiType;
	}
	
	

}
