package com.mobilous.mobileweb.ui;

import java.util.ArrayList;

import com.mobilous.mobileweb.app.ScrollView;
import com.mobilous.mobileweb.etc.TileItem;
import com.mobilous.mobileweb.etc.Item;
import com.mobilous.mobileweb.event.Event;

//this ui is applicable for TableView and TableViewList
public class TileList extends ScrollView {

	private String viewType = "";
	private String type = "";
	private String direction = "";
	private boolean hidden = false;
	
	private String serviceName="";
	private String tablename = "";
	private String where = "";
	private String sort = "";
	private boolean paging = false;
	private boolean circular = false;
	
	private String title = "";
	private String footer = "";
	private String cellStyle = "";
	
	private ArrayList<Item> group = null;
	//private ArrayList<TableRow> dataArray = null;
	private ArrayList<TileItem> dataArray = null;
	
	private ArrayList<Event> event = null;
	
	//backgroundColor
	//font
	//frame
	private Padding padding = null;
	
	

	@Override
	public String toString() {
		return null;
	}

	@Override
	public String getViewType() {
		return viewType;
	}
	public void setViewType(String viewType) {
		this.viewType = viewType;
	}
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}

	public String getDirection() {
		return direction;
	}
	public void setDirection(String direction) {
		this.direction = direction;
	}
	
//	public boolean getHidden() {
//		return hidden;
//	}
//	public void setHidden(boolean ishidden) {
//		this.hidden = ishidden;
//	}

	public String getServiceName(){
		return this.serviceName;
	}
	public void setServiceName(String serviceName){
		this.serviceName = serviceName;
	}
	
	public String getTableName() {
		return tablename;
	}
	public void setTableName(String tableName) {
		this.tablename = tableName;
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

	public boolean isPaging() {
		return paging;
	}

	public void setPaging(boolean paging) {
		this.paging = paging;
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

	public String getCellStyle(){
		return cellStyle;
	}
	public void setCellStyle(String style){
		this.cellStyle = style;
	}

	public ArrayList<Item> getGroup() {
		return group;
	}
	public void setGroup(ArrayList<Item> group) {
		this.group = group;
	}
	
	public ArrayList<TileItem> getDataArray() {
		return dataArray;
	}
	public void setDataArray(ArrayList<TileItem> dataArray) {
		this.dataArray = dataArray;
	}
	
	
	public Padding getPadding() {
		return padding;
	}

	public void setPadding(Padding padding) {
		this.padding = padding;
	}

	@Override
	public ArrayList<Event> getEvent() {
		return event;
	}
	public void setEvent(ArrayList<Event> event) {
		this.event = event;
	}

	public boolean isCircular() {
		return circular;
	}

	public void setCircular(boolean circular) {
		this.circular = circular;
	}

	
	
	

}
