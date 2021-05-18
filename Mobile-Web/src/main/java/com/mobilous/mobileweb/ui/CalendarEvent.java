package com.mobilous.mobileweb.ui;

import java.sql.Date;
import java.util.ArrayList;

import com.mobilous.mobileweb.etc.EKCalendar;
import com.mobilous.mobileweb.etc.EKEventDic;
import com.mobilous.mobileweb.etc.Participant;
import com.mobilous.mobileweb.etc.RecurrenceRule;
import com.mobilous.mobileweb.event.Event;

public class CalendarEvent extends BaseView {

	private String viewType = "CalendarEvent";
	private ArrayList<String> alarms = null;
	private boolean allDay = false;
	private ArrayList<String> attendees = null;
	private String availability = ""; // NotSupported Busy Free Tentative
										// Unavailable
	private EKCalendar calendar = null;
	private Date endDate = null;
	private EKEventDic eventIdentifier = null;
	private boolean isDetached = false;
	private Date lastModifiedDate = null;
	private String location = "";
	private String notes = "";
	private Participant organizer = null;
	private RecurrenceRule recurrenceRule = null;
	private Date startDate = null;
	private String status = "";
	private String title = "";
	private ArrayList<Event> event = null;

	public ArrayList<String> getAlarms() {
		return alarms;
	}

	public void setAlarms(ArrayList<String> alarms) {
		this.alarms = alarms;
	}

	public boolean isAllDay() {
		return allDay;
	}

	public void setAllDay(boolean allDay) {
		this.allDay = allDay;
	}

	public ArrayList<String> getAttendees() {
		return attendees;
	}

	public void setAttendees(ArrayList<String> attendees) {
		this.attendees = attendees;
	}

	public String getAvailability() {
		return availability;
	}

	public void setAvailability(String availability) {
		this.availability = availability;
	}

	public EKCalendar getCalendar() {
		return calendar;
	}

	public void setCalendar(EKCalendar calendar) {
		this.calendar = calendar;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public EKEventDic getEventIdentifier() {
		return eventIdentifier;
	}

	public void setEventIdentifier(EKEventDic eventIdentifier) {
		this.eventIdentifier = eventIdentifier;
	}

	public boolean isDetached() {
		return isDetached;
	}

	public void setDetached(boolean isDetached) {
		this.isDetached = isDetached;
	}

	public Date getLastModifiedDate() {
		return lastModifiedDate;
	}

	public void setLastModifiedDate(Date lastModifiedDate) {
		this.lastModifiedDate = lastModifiedDate;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public Participant getOrganizer() {
		return organizer;
	}

	public void setOrganizer(Participant organizer) {
		this.organizer = organizer;
	}

	public RecurrenceRule getRecurrenceRule() {
		return recurrenceRule;
	}

	public void setRecurrenceRule(RecurrenceRule recurrenceRule) {
		this.recurrenceRule = recurrenceRule;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
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

}
