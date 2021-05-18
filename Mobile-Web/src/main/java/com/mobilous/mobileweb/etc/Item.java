package com.mobilous.mobileweb.etc;

import java.util.ArrayList;

import com.mobilous.mobileweb.app.Fields;
import com.mobilous.mobileweb.attribute.ImageFile;
import com.mobilous.mobileweb.event.Event;

public class Item {

	private String rssFeedURL = "";
	private String groupName = "";
	private String serviceName = "";
	private ImageFile headerView = null;
	private ImageFile footerView = null;
	private String groupType = "";
	private String title = "";
	private String footer = "";
	// TODO: check if this should be an arrayList
	private ArrayList<Fields> recordListFormat = null;
	private String tablename = "";
	private String where = "";
	private String sort = "";
	private boolean editable = false;
	private boolean singleSelect = false;
	private boolean multiSelect = false;
	private boolean autoLoad = true;
	private int refreshTimeout = 60; // 1 hour
	// TODO: check what is this tablerowarray
	private ArrayList<TableRow> dataArray = null;
	private TableRow recordCellDef = null;
	// TODO: check if this should be an arrayList
	private ArrayList<Event> event = null;
	private String defFileID = "";
	
	private boolean flexibleHeight = false;
	
	private String groupBy = "";
	

	public String getDefFileID(){
		return this.defFileID;
	}
	
	public void setDefFileID(String defFileID){
		this.defFileID = defFileID;
	}
	
	public String getTableName() {
		return tablename;
	}

	public String getWhere() {
		return where;
	}

	public void setWhere(String where) {
		this.where = where;
	}

	public String getSort() {
		return sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
	}

	public void setTablename(String tablename) {
		this.tablename = tablename;
	}

	public ImageFile getHeaderView() {
		return headerView;
	}

	public TableRow getRecordCellDef() {
		return recordCellDef;
	}

	public void setRecordCellDef(TableRow recordCellDef) {
		this.recordCellDef = recordCellDef;
	}

	public void setHeaderView(ImageFile headerView) {
		this.headerView = headerView;
	}

	public ImageFile getFooterView() {
		return footerView;
	}

	public void setFooterView(ImageFile footerView) {
		this.footerView = footerView;
	}

	public String getGroupType() {
		return groupType;
	}

	public void setGroupType(String groupType) {
		this.groupType = groupType;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getFooter() {
		return footer;
	}

	public void setFooter(String footer) {
		this.footer = footer;
	}

	public ArrayList<Fields> getRecordListFormat() {
		return recordListFormat;
	}

	public void setRecordListFormat(ArrayList<Fields> recordListFormat) {
		this.recordListFormat = recordListFormat;
	}

	public ArrayList<Event> getEvent() {
		return event;
	}

	public void setEvent(ArrayList<Event> event) {
		this.event = event;
	}

	public boolean isEditable() {
		return editable;
	}

	public void setEditable(boolean editable) {
		this.editable = editable;
	}

	public boolean isSingleSelect() {
		return singleSelect;
	}

	public void setSingleSelect(boolean singleSelect) {
		this.singleSelect = singleSelect;
	}

	public boolean isMultiSelect() {
		return multiSelect;
	}

	public void setMultiSelect(boolean multiSelect) {
		this.multiSelect = multiSelect;
	}

	/**
	 * @param dataArray
	 *            the dataArray to set
	 */
	public void setDataArray(ArrayList<TableRow> dataArray) {
		this.dataArray = dataArray;
	}

	/**
	 * @return the dataArray
	 */
	public ArrayList<TableRow> getDataArray() {
		return dataArray;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public String getRssFeedURL() {
		return rssFeedURL;
	}

	public void setRssFeedURL(String rssFeedURL) {
		this.rssFeedURL = rssFeedURL;
	}

	public void setAutoLoad(boolean autoLoad) {
		this.autoLoad = autoLoad;
	}

	public boolean isAutoLoad() {
		return autoLoad;
	}

	public void setRefreshTimeout(int refreshTimeout) {
		this.refreshTimeout = refreshTimeout;
	}

	public int getRefreshTimeout() {
		return refreshTimeout;
	}

	public String getServiceName() {
		return serviceName;
	}

	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}
	

	public boolean isFlexibleHeight() {
		return flexibleHeight;
	}

	public void setFlexibleHeight(boolean flexibleHeight) {
		this.flexibleHeight = flexibleHeight;
	}
	
	public String getGroupBy() {
		return groupBy;
	}

	public void setGroupBy(String groupBy) {
		this.groupBy = groupBy;
	}

}
