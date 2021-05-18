package com.mobilous.mobileweb.etc;

import java.util.ArrayList;

public class DataArray {

	private String type = "label"; // label or image
	private int width = 30;
	private int height = 30;
	private int currentIndex = 0;
	private ArrayList<ItemData> itemArray = null;
	private String value = "";
	private String objectName = "";
	private String property = "";

	private String name = "";
	private String permission = "";

	private String fieldname = "";
	private String fieldValue = "";

	public int getCurrentIndex() {
		return currentIndex;
	}

	public void setCurrentIndex(int currentIndex) {
		this.currentIndex = currentIndex;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public int getWidth() {
		return width;
	}

	public void setWidth(int width) {
		this.width = width;
	}

	public int getHeight() {
		return height;
	}

	public void setHeight(int height) {
		this.height = height;
	}

	/**
	 * @param itemArray
	 *            the itemArray to set
	 */
	public void setItemArray(ArrayList<ItemData> itemArray) {
		this.itemArray = itemArray;
	}

	/**
	 * @return the itemArray
	 */
	public ArrayList<ItemData> getItemArray() {
		return itemArray;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getObjectName() {
		return objectName;
	}

	public void setObjectName(String objectName) {
		this.objectName = objectName;
	}

	public String getProperty() {
		return property;
	}

	public void setProperty(String property) {
		this.property = property;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPermission() {
		return permission;
	}

	public void setPermission(String permission) {
		this.permission = permission;
	}

	public String getFieldname() {
		return fieldname;
	}

	public void setFieldname(String fieldname) {
		this.fieldname = fieldname;
	}

	public String getFieldValue() {
		return fieldValue;
	}

	public void setFieldValue(String fieldValue) {
		this.fieldValue = fieldValue;
	}
}
