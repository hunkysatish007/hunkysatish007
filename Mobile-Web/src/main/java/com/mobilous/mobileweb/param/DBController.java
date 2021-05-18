package com.mobilous.mobileweb.param;

import org.json.simple.JSONObject;

import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.etc.Condition;
import com.mobilous.mobileweb.util.Utility;

public class DBController implements Parameters {

	private String pageName = "";
	private String method = "";
	private String table = "";
	private String toFile = "";
	private String fromFile = "";
	private JSONObject record = null;
	private String where = "";
	private String order = "";
	private Condition condition = null;

	public String getPageName(GenApp genApp) {
		return Utility.getDefFileIDByFilename(genApp, pageName);
	}

	public void setPageName(String pageName) {
		this.pageName = pageName;
	}

	public Condition getCondition() {
		return condition;
	}

	public void setCondition(Condition condition) {
		this.condition = condition;
	}

	public DBController(String method) {
		this.method = method;
	}

	public String getTable() {
		return table;
	}

	public void setTable(String table) {
		this.table = table;
	}

	public JSONObject getRecord() {
		return record;
	}

	public void setRecord(JSONObject record) {
		this.record = record;
	}

	public String getWhere() {
		return where;
	}

	public void setWhere(String where) {
		this.where = where;
	}

	public String getOrder() {
		return order;
	}

	public void setOrder(String order) {
		this.order = order;
	}

	public String getToFile() {
		return toFile;
	}

	public void setToFile(String toFile) {
		this.toFile = toFile;
	}

	public String getFromFile() {
		return fromFile;
	}

	public void setFromFile(String fromFile) {
		this.fromFile = fromFile;
	}

	@Override
	public void setMethod(String method) {
		this.method = method;
	}

	@Override
	public String getMethod() {
		return method;
	}
}
