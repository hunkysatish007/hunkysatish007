package com.mobilous.mobileweb.etc;

import java.util.ArrayList;

public class Condition {

	private ArrayList<GroupCase> groupCases = null;
	private String condTemp = "";

	public ArrayList<GroupCase> getGroupCases() {
		return groupCases;
	}

	public void setGroupCases(ArrayList<GroupCase> groupCases) {
		this.groupCases = groupCases;
	}

	public String getCondTemp() {
		return condTemp;
	}

	public void setCondTemp(String condTemp) {
		this.condTemp = condTemp;
	}

}
