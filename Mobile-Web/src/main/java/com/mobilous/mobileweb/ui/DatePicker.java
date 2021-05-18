package com.mobilous.mobileweb.ui;

import java.util.ArrayList;

import com.mobilous.mobileweb.etc.DataArray;
import com.mobilous.mobileweb.etc.ItemData;
import com.mobilous.mobileweb.event.Event;

public class DatePicker extends BaseView {

	private String viewType = "DatePicker";
	private String mode = "";// "Time","Date" or "Date&Time"
	private String currentDate = "";
	private ArrayList<Event> event = null;
	private int tabOrder=0;
	private String timeFormat = "";
	
	public String getMode() {
		return mode;
	}

	public String getCurrentDate() {
		return currentDate;
	}

	public void setCurrentDate(String currentDate) {
		this.currentDate = currentDate;
	}

	public void setMode(String mode) {
		this.mode = mode;
	}

	@Override
	public String getViewType() {
		return viewType;
	}

	@Override
	public String toString() {
		return null;
	}

	@Override
	public ArrayList<Event> getEvent() {
		return event;
	}

	public void setEvent(ArrayList<Event> event) {
		this.event = event;
	}

	public ArrayList<DataArray> getDataArray() {
		ArrayList<DataArray> dataArray = new ArrayList<DataArray>();

		// month
		DataArray dat1 = new DataArray();
		ArrayList<ItemData> itemArray = new ArrayList<ItemData>();
		if (mode.equalsIgnoreCase("Date")
				|| mode.equalsIgnoreCase("DateAndTime")) {
			itemArray.add(new ItemData("January"));
			itemArray.add(new ItemData("February"));
			itemArray.add(new ItemData("March"));
			itemArray.add(new ItemData("April"));
			itemArray.add(new ItemData("May"));
			itemArray.add(new ItemData("June"));
			itemArray.add(new ItemData("July"));
			itemArray.add(new ItemData("August"));
			itemArray.add(new ItemData("September"));
			itemArray.add(new ItemData("October"));
			itemArray.add(new ItemData("November"));
			itemArray.add(new ItemData("December"));
			dat1.setItemArray(itemArray);
			dataArray.add(dat1);

			dat1 = new DataArray();
			itemArray = new ArrayList<ItemData>();
			for (int i = 1; i <= 31; i++)
				itemArray.add(new ItemData(String.valueOf(i)));
			dat1.setItemArray(itemArray);
			dataArray.add(dat1);

			dat1 = new DataArray();
			itemArray = new ArrayList<ItemData>();
			for (int i = 1975; i <= 2050; i++)
				itemArray.add(new ItemData(String.valueOf(i)));
			dat1.setItemArray(itemArray);
			dataArray.add(dat1);
		}

		if (mode.equalsIgnoreCase("Time")
				|| mode.equalsIgnoreCase("DateAndTime")) {
			dat1 = new DataArray();
			itemArray = new ArrayList<ItemData>();
			for (int i = 1; i <= 12; i++)
				itemArray.add(new ItemData(String.valueOf(i)));
			dat1.setItemArray(itemArray);
			dataArray.add(dat1);

			dat1 = new DataArray();
			itemArray = new ArrayList<ItemData>();
			for (int i = 0; i <= 59; i++)
				itemArray.add(new ItemData(String.valueOf(i)));
			dat1.setItemArray(itemArray);
			dataArray.add(dat1);

			dat1 = new DataArray();
			itemArray = new ArrayList<ItemData>();
			itemArray.add(new ItemData("AM"));
			itemArray.add(new ItemData("PM"));
			dat1.setItemArray(itemArray);
			dataArray.add(dat1);
		}

		return dataArray;
	}

	public int getTabOrder() {
		return tabOrder;
	}

	public void setTabOrder(int tabOrder) {
		this.tabOrder = tabOrder;
	}

	public String getTimeFormat() {
		return timeFormat;
	}

	public void setTimeFormat(String timeFormat) {
		this.timeFormat = timeFormat;
	}

}
