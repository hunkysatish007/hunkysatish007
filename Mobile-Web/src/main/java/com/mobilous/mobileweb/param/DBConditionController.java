package com.mobilous.mobileweb.param;

import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.etc.Condition;

public class DBConditionController implements Parameters {

	private String pageName = "";
	private String method = "";
	private String groupName = "";
	private String order = "";
	private String where = "";
	private Condition condition = null;
	private String name = "";

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public String getOrder() {
		return order;
	}

	public void setOrder(String order) {
		this.order = order;
	}

	public String getWhere() {
		return where;
	}

	public void setWhere(String where) {
		this.where = where;
	}

	public String getPageName() {
		return pageName;
	}

	@Override
	public void setMethod(String method) {
		this.method = method;
	}

	@Override
	public String getMethod() {
		return method;

	}

	@Override
	public void setPageName(String pagename) {
		this.pageName = pagename;
	}

	@Override
	public String getPageName(GenApp genApp) {
		return pageName;
	}

	public Condition getCondition() {
		return condition;
	}

	public void setCondition(Condition condition) {
		this.condition = condition;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
