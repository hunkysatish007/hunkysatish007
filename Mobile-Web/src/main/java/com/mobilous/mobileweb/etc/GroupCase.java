package com.mobilous.mobileweb.etc;

import java.util.ArrayList;

public class GroupCase {

	private ArrayList<Case> cases = new ArrayList<Case>();
	private ArrayList<GroupCase> groupCases = new ArrayList<GroupCase>();

	public ArrayList<Case> getCases() {
		return cases;
	}

	public void setCases(ArrayList<Case> cases) {
		this.cases = cases;
	}

	public ArrayList<GroupCase> getGroupCases() {
		return groupCases;
	}

	public void setGroupCases(ArrayList<GroupCase> groupCases) {
		this.groupCases = groupCases;
	}

}
