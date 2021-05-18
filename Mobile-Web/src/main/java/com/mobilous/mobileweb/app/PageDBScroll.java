package com.mobilous.mobileweb.app;

import java.util.ArrayList;

import com.mobilous.mobileweb.etc.TableRow;
import com.mobilous.mobileweb.event.Event;

public class PageDBScroll extends PageScroll {

	// DBPageScrollView
	private String tablename = "";
	private String where = "";
	private String sort = "";
	private TableRow recordCellDef = null;

	public String getTablename() {
		return tablename;
	}

	public void setTablename(String tablename) {
		this.tablename = tablename;
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

	public TableRow getRecordCellDef() {
		return recordCellDef;
	}

	public void setRecordCellDef(TableRow recordCellDef) {
		this.recordCellDef = recordCellDef;
	}

	@Override
	public String getViewType() {
		// TODO Auto-generated method stub
		return null;
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

}
