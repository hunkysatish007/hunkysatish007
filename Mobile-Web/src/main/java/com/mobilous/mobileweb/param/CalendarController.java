package com.mobilous.mobileweb.param;

import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.etc.Condition;
import com.mobilous.mobileweb.util.Utility;

public class CalendarController implements Parameters {

	private String pageName = "";
	private String method = "";
	private String groupName = "";
	private String category = "";
	private String fromDate = "";
	private String toDate = "";
	private String filterFromDate = "";
	private String filterToDate = "";
	private String eventID = "";
	private String description = "";
	private String place = "";
	private String ownerEmail = "";
	private Condition condition = null;
	private String service = "";
	private String matchField = "";
	private String matchValue = "";

	public void setPageName(String pageName) {
		this.pageName = pageName;
	}

	public CalendarController(String method) {
		this.method = method;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getFromDate() {
		return fromDate;
	}

	public Condition getCondition() {
		return condition;
	}

	public void setCondition(Condition condition) {
		this.condition = condition;
	}

	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}

	public String getToDate() {
		return toDate;
	}

	public void setToDate(String toDate) {
		this.toDate = toDate;
	}

	public String getEventID() {
		return eventID;
	}

	public void setEventID(String eventID) {
		this.eventID = eventID;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getService() {
		return service;
	}

	public void setService(String service) {
		this.service = service;
	}

	public String getPlace() {
		return place;
	}

	public void setPlace(String place) {
		this.place = place;
	}

	public String getOwnerEmail() {
		return ownerEmail;
	}

	public void setOwnerEmail(String ownerEmail) {
		this.ownerEmail = ownerEmail;
	}

	public String getMatchField() {
		return matchField;
	}

	public void setMatchField(String matchField) {
		this.matchField = matchField;
	}

	public String getMatchValue() {
		return matchValue;
	}

	public void setMatchValue(String matchValue) {
		this.matchValue = matchValue;
	}

	public String getPageName(GenApp genApp) {
		return Utility.getDefFileIDByFilename(genApp, pageName);
	}

	public String getFilterFromDate() {
		return filterFromDate;
	}

	public void setFilterFromDate(String filterFromDate) {
		this.filterFromDate = filterFromDate;
	}

	public String getFilterToDate() {
		return filterToDate;
	}

	public void setFilterToDate(String filterToDate) {
		this.filterToDate = filterToDate;
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
