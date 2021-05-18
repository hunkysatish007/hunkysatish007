package com.mobilous.mobileweb.actionbuilder;

import com.mobilous.mobileweb.action.Action;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.param.CalendarController;
import com.mobilous.mobileweb.ui.BaseView;

public class GoogleCalendarActionBuilder {

	public static StringBuilder build(GenApp genapp, BaseView baseview,
			Event event, Action action) {

		StringBuilder calendarScript = new StringBuilder();

		CalendarController googleCalendarController = (CalendarController) action
				.getParameters();
		if (googleCalendarController.getMethod().equalsIgnoreCase("FindEvent")) {

			calendarScript
					.append("{method:\"FindEvent\",category:\"GoogleCalendarService\",")
					.append("params:{")
					.append("ownerEmail:\""+ googleCalendarController.getOwnerEmail() + "\",")
					.append("startdate:\""+ googleCalendarController.getFilterFromDate() + "\",")
					.append("enddate:\"" + googleCalendarController.getFilterToDate()+ "\",")
					.append("targetpage:\""+ googleCalendarController.getPageName(genapp)+ "\",")
					.append("}},");
		}

		else if (googleCalendarController.getMethod().equalsIgnoreCase("InsertEvent")) {

			calendarScript
					.append("{method:\"CreateEvent\",category:\"GoogleCalendarService\",")
					.append("params:{")
					.append("ownerEmail:\""+ googleCalendarController.getOwnerEmail() + "\",")
					.append("startdate:\""+ googleCalendarController.getFromDate() + "\",")
					.append("enddate:\"" + googleCalendarController.getToDate()+ "\",")
					.append("category:\"" + googleCalendarController.getCategory()+ "\",")
					.append("description:\"" + googleCalendarController.getDescription()+ "\",")
					.append("place:\"" + googleCalendarController.getPlace()+ "\",")
					.append("targetpage:\""+ googleCalendarController.getPageName(genapp)+"\",")
					.append("}},");
		} else if (googleCalendarController.getMethod().equalsIgnoreCase("RemoveEvent")) {
			calendarScript
			.append("{method:\"DeleteEvent\",category:\"GoogleCalendarService\",")
			.append("params:{")
			.append("ownerEmail:\""+ googleCalendarController.getOwnerEmail() + "\",")
			.append("matchField:\""+ googleCalendarController.getMatchField() + "\",")
			.append("matchValue:\""+ googleCalendarController.getMatchValue() + "\",")
			.append("filterfromdate:\""+ googleCalendarController.getFilterFromDate() + "\",")
			.append("filtertodate:\"" + googleCalendarController.getFilterToDate()+ "\",")
			.append("eventId:\""+ googleCalendarController.getEventID() + "\",")
			.append("targetpage:\""+ googleCalendarController.getPageName(genapp)+"\",")
			.append("}},");
		} else if (googleCalendarController.getMethod().equalsIgnoreCase(
				"UpdateEvent")) {
			calendarScript
			.append("{method:\"UpdateEvent\",category:\"GoogleCalendarService\",")
			.append("params:{")
			.append("startdate:\""+ googleCalendarController.getFromDate() + "\",")
			.append("enddate:\"" + googleCalendarController.getToDate()+ "\",")
			.append("filterfromdate:\""+ googleCalendarController.getFilterFromDate() + "\",")
			.append("filtertodate:\"" + googleCalendarController.getFilterToDate()+ "\",")
			.append("category:\"" + googleCalendarController.getCategory()+ "\",")
			.append("description:\"" + googleCalendarController.getDescription()+ "\",")
			.append("place:\"" + googleCalendarController.getPlace()+ "\",")
			.append("ownerEmail:\""+ googleCalendarController.getOwnerEmail() + "\",")
			.append("matchField:\""+ googleCalendarController.getMatchField() + "\",")
			.append("matchValue:\""+ googleCalendarController.getMatchValue() + "\",")
			.append("eventId:\""+ googleCalendarController.getEventID() + "\",")
			.append("targetpage:\""+ googleCalendarController.getPageName(genapp)+"\",")
			.append("}},");

		}

		return calendarScript;
	}

}
