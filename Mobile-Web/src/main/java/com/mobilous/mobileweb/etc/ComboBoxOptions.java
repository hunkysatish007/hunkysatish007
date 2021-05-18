package com.mobilous.mobileweb.etc;

import java.util.ArrayList;

public class ComboBoxOptions {

	private ArrayList<String> optionID = new ArrayList<String>();
	private ArrayList<String> displayValue = new ArrayList<String>();

	public ArrayList<String> getOptionID() {
		return optionID;
	}

	public void setOptionID(String fieldValue) {
		this.optionID.add(fieldValue);
	}

	public ArrayList<String> getDisplayValue() {
		return displayValue;
	}

	public void setDisplayValue(String displayValue) {
		this.displayValue.add(displayValue);
		//System.out.println(displayValue);
	}

}
