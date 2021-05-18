package com.mobilous.mobileweb.param;

import java.util.ArrayList;

import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.etc.Condition;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.util.Utility;

public class SensorController implements Parameters {

	private String pageName = "";
	private String method = "";
	private String name = "";
	private String type = "";
	private String alarmTime = "";
	private String interval = "";
	private String timerName = "";
	private boolean repeatFlag = false;
	private boolean repeat = false;
	private ArrayList<String> repeatList = null;
	private int alarmLap = -1;
	private int countTime = -1;
	private ArrayList<Event> event = null;
	private Condition condition = null;

	public String getPageName(GenApp genApp) {
		return Utility.getDefFileIDByFilename(genApp, pageName);
	}

	public void setPageName(String pageName) {
		this.pageName = pageName;
	}

	public Condition getCondition() {
		return condition;
	}

	public void setCondition(Condition condition) {
		this.condition = condition;
	}

	public SensorController(String method) {
		this.method = method;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getAlarmTime() {
		return alarmTime;
	}

	public void setAlarmTime(String alarmTime) {
		this.alarmTime = alarmTime;
	}

	public String getInterval() {
		return interval;
	}

	public void setInterval(String interval) {
		this.interval = interval;
	}

	public String getTimerName() {
		return timerName;
	}

	public void setTimerName(String timerName) {
		this.timerName = timerName;
	}

	public boolean isRepeatFlag() {
		return repeatFlag;
	}

	public void setRepeatFlag(boolean repeatFlag) {
		this.repeatFlag = repeatFlag;
	}

	public boolean isRepeat() {
		return repeat;
	}

	public void setRepeat(boolean repeat) {
		this.repeat = repeat;
	}

	public ArrayList<String> getRepeatList() {
		return repeatList;
	}

	public void setRepeatList(ArrayList<String> repeatList) {
		this.repeatList = repeatList;
	}

	public int getAlarmLap() {
		return alarmLap;
	}

	public void setAlarmLap(int alarmLap) {
		this.alarmLap = alarmLap;
	}

	public int getCountTime() {
		return countTime;
	}

	public void setCountTime(int countTime) {
		this.countTime = countTime;
	}

	@Override
	public void setMethod(String method) {
		this.method = method;
	}

	@Override
	public String getMethod() {
		return method;
	}

	public void setEvent(ArrayList<Event> event) {
		this.event = event;
	}

	public ArrayList<Event> getEvent() {
		return event;
	}
}
