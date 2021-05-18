package com.mobilous.mobileweb.etc;

import java.util.ArrayList;

public class Case {

	private String target = "";
	private String operator = "";
	private String value = "";
	private ArrayList<GroupCase> groupCases = new ArrayList<GroupCase>();

	public String getTarget() {
		return target;
	}

	public void setTarget(String target) {
		this.target = target;
	}

	public String getOperator() {
		return operator;
	}

	public void setOperator(String operator) {
		this.operator = operator;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public ArrayList<GroupCase> getGroupCases() {
		return groupCases;
	}

	public void setGroupCases(ArrayList<GroupCase> groupCases) {
		this.groupCases = groupCases;
	}

}
