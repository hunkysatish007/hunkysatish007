package com.mobilous.mobileweb.ui;

import java.util.ArrayList;

import com.mobilous.mobileweb.app.ScrollView;
import com.mobilous.mobileweb.attribute.Color;
import com.mobilous.mobileweb.attribute.Font;
import com.mobilous.mobileweb.etc.DataArray;
import com.mobilous.mobileweb.event.Event;

public class ListBox extends ScrollView{

	private String viewtype = "ListBox";
	private String name = "";
	private String verticalAlignment = "";
	private int taborder = -1;
	private String borderStyle = "";
	private String borderWidth = "1";
	private Padding padding = null;
	private Color backgroundColor = null;
	private Color borderColor = null;
	private Font font = null;
	
	private ArrayList<Event> event = null;
	
	private boolean hidden = false;
	private String[] selectedIndex;
	private String type = "";
	private ArrayList<DataArray> dataArray = null;
	
	private String serviceName = "";
	private String tablename = "";
	private String displayText = "";
	private String fieldName = "";
	private String initialValue = "";
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getVerticalAlignment() {
		return verticalAlignment;
	}
	public void setVerticalAlignment(String verticalAlignment) {
		this.verticalAlignment = verticalAlignment;
	}
	public int getTaborder() {
		return taborder;
	}
	public void setTaborder(int taborder) {
		this.taborder = taborder;
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
	public Padding getPadding() {
		return padding;
	}
	public void setPadding(Padding padding) {
		this.padding = padding;
	}
	public Color getBackgroundColor() {
		return backgroundColor;
	}
	public void setBackgroundColor(Color backgroundColor) {
		this.backgroundColor = backgroundColor;
	}
	public Color getBorderColor() {
		return borderColor;
	}
	public void setBorderColor(Color borderColor) {
		this.borderColor = borderColor;
	}
	public Font getFont() {
		return font;
	}
	public void setFont(Font font) {
		this.font = font;
	}
	
	public String[] getSelectedIndex() {
		return selectedIndex;
	}
	public void setSelectedIndex(String[] selectedIndex) {
		this.selectedIndex = selectedIndex;
	}
	@Override
	public String getViewType() {
		// TODO Auto-generated method stub
		return viewtype;
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
	public void setEvent(ArrayList<Event> event) {
		this.event = event;
	}
	public boolean isHidden() {
		return hidden;
	}
	public void setHidden(boolean hidden) {
		this.hidden = hidden;
	}
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public ArrayList<DataArray> getDataArray() {
		return dataArray;
	}
	public void setDataArray(ArrayList<DataArray> dataArray) {
		this.dataArray = dataArray;
	}
	public String getServiceName() {
		return serviceName;
	}
	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}
	public String getTablename() {
		return tablename;
	}
	public void setTablename(String tablename) {
		this.tablename = tablename;
	}
	public String getDisplayText() {
		return displayText;
	}
	public void setDisplayText(String displayText) {
		this.displayText = displayText;
	}
	public String getFieldName() {
		return fieldName;
	}
	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}
	public String getInitialValue() {
		return initialValue;
	}
	public void setInitialValue(String initialValue) {
		this.initialValue = initialValue;
	}
}
