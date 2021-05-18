package com.mobilous.mobileweb.ui;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import com.mobilous.mobileweb.attribute.Color;
import com.mobilous.mobileweb.attribute.Font;
import com.mobilous.mobileweb.etc.ComboBoxOptions;
import com.mobilous.mobileweb.etc.DataArray;
import com.mobilous.mobileweb.event.Event;

public  class ComboBox extends BaseView {

	private String viewType = "ComboBox";
	//private boolean showsSelectionIndicator = false;
	//private ArrayList<DataArray> dataArray = null;
	private ArrayList<Event> event = null;
	private Font font = null;
	private Color borderColor = null;
	private Color backgroundColor = null;
	private int selectedIndex = 0;
	private String verticalAlignment = "middle";
	private boolean hidden = false;
	private ComboBoxOptions options;
	private int borderWeight = 0;
	private int tabOrder=0;
	private String type = "";
	private String serviceName = "";
	private String tableName = "";
	private String whereCondition = "";
	private String orderClause = "";
	private String fieldName = "";
	private String displayText ="";
	private Padding padding = null;
	private String initialValue = "";
	private int cornerRadius=0;
	private boolean editable = false;
	private String placeholder = "";
	
	public ArrayList<Event> getEvent() {
		return event;
	}
		
	public void setEvent(ArrayList<Event> event) {
		this.event = event;
	}

	
	public void setViewType(String viewType) {
		this.viewType = viewType;
	}

	public Font getFont() {
		return font;
	}

	public void setFont(Font font) {
		this.font = font;
	}

	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public String getViewType() {
		return viewType;
	}
	
	public Color getBorderColor() {
		return borderColor;
	}

	public void setBorderColor(Color borderColor) {
		this.borderColor = borderColor;
	}

	public Color getBackgroundColor() {
		return backgroundColor;
	}

	public void setBackgroundColor(Color backgroundColor) {
		this.backgroundColor = backgroundColor;
	}


	public int getSelectedIndex() {
		return selectedIndex;
	}


	public void setSelectedIndex(int selectedIndex) {
		this.selectedIndex = selectedIndex;
	}


	public String getVerticalAlignment() {
		return verticalAlignment;
	}


	public void setVerticalAlignment(String verticalAlignment) {
		this.verticalAlignment = verticalAlignment;
	}
	
	public boolean getHidden() {
		return hidden;
	}


	public void setHidden(boolean ishidden) {
		this.hidden = ishidden;
	}


	public ComboBoxOptions getOptions() {
		return options;
	}


	public void setOptions(ComboBoxOptions options) {
		this.options = options;
	}


	public int getBorderWeight() {
		return borderWeight;
	}


	public void setBorderWeight(int borderWeight) {
		this.borderWeight = borderWeight;
	}


	public int getTabOrder() {
		return tabOrder;
	}


	public void setTabOrder(int tabOrder) {
		this.tabOrder = tabOrder;
	}
	
	public String getType() {
		return type;
	}


	public void setType(String type) {
		this.type = type;
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


	public String getOrderClause() {
		return orderClause;
	}


	public void setOrderClause(String orderClause) {
		this.orderClause = orderClause;
	}


	public String getFieldName() {
		return fieldName;
	}


	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

	public String getDisplayText() {
		return displayText;
	}

	public void setDisplayText(String displayText) {
		this.displayText = displayText;
	}

	public Padding getPadding() {
		return padding;
	}

	public void setPadding(Padding padding) {
		this.padding = padding;
	}

	public String getInitialValue() {
		return initialValue;
	}

	public void setInitialValue(String initialValue) {
		this.initialValue = initialValue;
	}

	public int getCornerRadius() {
		return cornerRadius;
	}

	public void setCornerRadius(int cornerRadius) {
		this.cornerRadius = cornerRadius;
	}

	public boolean isEditable() {
		return editable;
	}

	public void setEditable(boolean editable) {
		this.editable = editable;
	}

	public String getPlaceholder() {
		return placeholder;
	}

	public void setPlaceholder(String placeholder) {
		this.placeholder = placeholder;
	}


	
}
