package com.mobilous.mobileweb.attribute;

public class DateFormat {

	private String locale = "Japanese"; // English
	private String longDayTime = "YYYY/MM/DD HH:MM";
	private String longDay = "YYYY/MM/DD";
	private String shortDayTime = "MM-DD HH:MM";
	private String shortDay = "MM-DD";
	private String Time = "HH:MM";

	public String getLocale() {
		return locale;
	}

	public void setLocale(String locale) {
		if (locale.equalsIgnoreCase("Japanese")) {
			this.locale = locale;
			longDayTime = "YYYY/MM/DD HH:MM";
			shortDayTime = "MM-DD HH:MM";
			shortDay = "MM-DD";
			Time = "HH:MM";
		} else {
			// TODO: Research on tow to implement this
			this.locale = locale;
			longDayTime = "2nd Sep 2010 11:20";
			longDay = "2nd Sep 2010";
			shortDayTime = "2nd Sep 11:20";
			shortDay = "2nd Sep";
			Time = "11:20";
		}

	}

	public String getLongDayTime() {
		return longDayTime;
	}

	public String getLongDay() {
		return longDay;
	}

	public String getShortDayTime() {
		return shortDayTime;
	}

	public String getShortDay() {
		return shortDay;
	}

	public String getTime() {
		return Time;
	}

}
