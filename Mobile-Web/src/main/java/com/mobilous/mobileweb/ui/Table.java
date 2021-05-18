package com.mobilous.mobileweb.ui;

import java.util.ArrayList;

import com.mobilous.mobileweb.app.ScrollView;
import com.mobilous.mobileweb.attribute.Color;
import com.mobilous.mobileweb.attribute.ImageFile;
import com.mobilous.mobileweb.etc.Item;
import com.mobilous.mobileweb.event.Event;

//this ui is applicable for TableView and TableViewList
public class Table extends ScrollView {

	private String viewType = "";// singleselection,multiselection,pickerselection
	private String tableStyle = "";
	private int rowHeight = -1; // contains points in integer
	private String separatorStyle = "";
	private String tablename = "";
	private String where = "";
	private String selectionStyle = "";
	private Color separatorColor = null;
	private ImageFile backgroundView = null;
	private ImageFile tableHeaderView = null;
	private ImageFile tableFooterView = null;
	private double sectionHeaderHeight = -1;
	private double sectionFooterHeight = -1;
	private int sectionIndexMinimumDisplayRowCount = -1;
	private boolean allowsSelection = false;
	private boolean allowsSelectionDuringEditing = false;
	private boolean editing = false;
	private ArrayList<Item> group = null;
	private ArrayList<Event> event = null;
	private String cellStyle = "";
	private String serviceName="";
	private ArrayList<Grid> gridArray = null;
	
	private boolean isAccordion = false;
	private int accHeaderHeight = 32;
	private Color accHeaderBGColor = null;
	private Color accHeaderTextColor = null;
	private String accHeaderIconPosition="left";
	private ImageFile accHeaderIconClose = null;
	private ImageFile accHeaderIconOpen = null;
	
	
	public void setCellStyle(String style){
		this.cellStyle = style;
	}
	
	public String getCellStyle(){
		return cellStyle;
	}

	public String getTableStyle() {
		return tableStyle;
	}

	public String getSelectionStyle() {
		return selectionStyle;
	}

	public void setSelectionStyle(String selectionStyle) {
		this.selectionStyle = selectionStyle;
	}

	public String getWhere() {
		return where;
	}

	public void setWhere(String where) {
		this.where = where;
	}

	public void setTableStyle(String tableStyle) {
		this.tableStyle = tableStyle;
	}

	public int getRowHeight() {
		return rowHeight;
	}

	public void setRowHeight(int rowHeight) {
		this.rowHeight = rowHeight;
	}

	public String getSeparatorStyle() {
		return separatorStyle;
	}

	public void setSeparatorStyle(String separatorStyle) {
		this.separatorStyle = separatorStyle;
	}

	public Color getSeparatorColor() {
		return separatorColor;
	}

	public void setSeparatorColor(Color separatorColor) {
		this.separatorColor = separatorColor;
	}

	public ImageFile getBackgroundView() {
		return backgroundView;
	}

	public void setBackgroundView(ImageFile backgroundView) {
		this.backgroundView = backgroundView;
	}

	public ImageFile getTableHeaderView() {
		return tableHeaderView;
	}

	public void setTableHeaderView(ImageFile tableHeaderView) {
		this.tableHeaderView = tableHeaderView;
	}

	public ImageFile getTableFooterView() {
		return tableFooterView;
	}

	public void setTableFooterView(ImageFile tableFooterView) {
		this.tableFooterView = tableFooterView;
	}

	public double getSectionHeaderHeight() {
		return sectionHeaderHeight;
	}

	public void setSectionHeaderHeight(double sectionHeaderHeight) {
		this.sectionHeaderHeight = sectionHeaderHeight;
	}

	public double getSectionFooterHeight() {
		return sectionFooterHeight;
	}

	public void setSectionFooterHeight(double sectionFooterHeight) {
		this.sectionFooterHeight = sectionFooterHeight;
	}

	public int getSectionIndexMinimumDisplayRowCount() {
		return sectionIndexMinimumDisplayRowCount;
	}

	public void setSectionIndexMinimumDisplayRowCount(
			int sectionIndexMinimumDisplayRowCount) {
		this.sectionIndexMinimumDisplayRowCount = sectionIndexMinimumDisplayRowCount;
	}

	public boolean isAllowsSelection() {
		return allowsSelection;
	}

	public void setAllowsSelection(boolean allowsSelection) {
		this.allowsSelection = allowsSelection;
	}

	public boolean isAllowsSelectionDuringEditing() {
		return allowsSelectionDuringEditing;
	}

	public void setAllowsSelectionDuringEditing(
			boolean allowsSelectionDuringEditing) {
		this.allowsSelectionDuringEditing = allowsSelectionDuringEditing;
	}

	public boolean isEditing() {
		return editing;
	}

	public void setEditing(boolean editing) {
		this.editing = editing;
	}

	public ArrayList<Item> getGroup() {
		return group;
	}

	public void setGroup(ArrayList<Item> group) {
		this.group = group;
	}

	public void setViewType(String viewType) {
		this.viewType = viewType;
	}

	@Override
	public String getViewType() {
		return viewType;
	}

	@Override
	public String toString() {
		return null;
	}

	public String getTableName() {
		return tablename;
	}

	public void setTableName(String tableName) {
		this.tablename = tableName;
	}

	public void setEvent(ArrayList<Event> event) {
		this.event = event;
	}

	@Override
	public ArrayList<Event> getEvent() {
		return event;
	}
	
	public void setServiceName(String serviceName){
		this.serviceName = serviceName;
	}
	
	public String getServiceName(){
		return this.serviceName;
	}

	public ArrayList<Grid> getGridArray() {
		return gridArray;
	}

	public void setGridArray(ArrayList<Grid> gridArray) {
		this.gridArray = gridArray;
	}
	
	public boolean isAccordion() {
		return isAccordion;
	}

	public void setAccordion(boolean isAccordion) {
		this.isAccordion = isAccordion;
	}

	public int getAccHeaderHeight() {
		return accHeaderHeight;
	}

	public void setAccHeaderHeight(int accHeaderHeight) {
		this.accHeaderHeight = accHeaderHeight;
	}

	public Color getAccHeaderBGColor() {
		return accHeaderBGColor;
	}

	public void setAccHeaderBGColor(Color accHeaderBGColor) {
		this.accHeaderBGColor = accHeaderBGColor;
	}

	public Color getAccHeaderTextColor() {
		return accHeaderTextColor;
	}

	public void setAccHeaderTextColor(Color accHeaderTextColor) {
		this.accHeaderTextColor = accHeaderTextColor;
	}

	public String getAccHeaderIconPosition() {
		return accHeaderIconPosition;
	}

	public void setAccHeaderIconPosition(String accHeaderIconPosition) {
		this.accHeaderIconPosition = accHeaderIconPosition;
	}

	public ImageFile getAccHeaderIconClose() {
		return accHeaderIconClose;
	}

	public void setAccHeaderIconClose(ImageFile accHeaderIconClose) {
		this.accHeaderIconClose = accHeaderIconClose;
	}

	public ImageFile getAccHeaderIconOpen() {
		return accHeaderIconOpen;
	}

	public void setAccHeaderIconOpen(ImageFile accHeaderIconOpen) {
		this.accHeaderIconOpen = accHeaderIconOpen;
	}

}
