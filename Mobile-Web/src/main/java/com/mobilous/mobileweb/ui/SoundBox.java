package com.mobilous.mobileweb.ui;

import java.util.ArrayList;

import com.mobilous.mobileweb.attribute.SoundFile;
import com.mobilous.mobileweb.event.Event;

public class SoundBox extends BaseView {

	private String viewType = "SoundBox";
	private boolean styleDark = true;
	private SoundFile soundFile = null;
	private boolean startPlay = false;
	private boolean pausePlay = false;
	private boolean stopPlay = false;
	private boolean startRecord = false;
	private boolean pauseRecord = false;
	private boolean stopRecord = false;
	private boolean recorder = false;
	private ArrayList<Event> event = null;
	private int tabOrder=0;	
	private int timeout=0;	
	
	

	public boolean isStartPlay() {
		return startPlay;
	}

	public boolean isStyleDark() {
		return styleDark;
	}

	public void setStyleDark(boolean styleDark) {
		this.styleDark = styleDark;
	}

	public void setStartPlay(boolean startPlay) {
		this.startPlay = startPlay;
	}

	public boolean isPausePlay() {
		return pausePlay;
	}

	public void setPausePlay(boolean pausePlay) {
		this.pausePlay = pausePlay;
	}

	public boolean isStopPlay() {
		return stopPlay;
	}

	public void setStopPlay(boolean stopPlay) {
		this.stopPlay = stopPlay;
	}

	public boolean isStartRecord() {
		return startRecord;
	}

	public void setStartRecord(boolean startRecord) {
		this.startRecord = startRecord;
	}

	public boolean isPauseRecord() {
		return pauseRecord;
	}

	public void setPauseRecord(boolean pauseRecord) {
		this.pauseRecord = pauseRecord;
	}

	public boolean isStopRecord() {
		return stopRecord;
	}

	public void setStopRecord(boolean stopRecord) {
		this.stopRecord = stopRecord;
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

	public void setSoundFile(SoundFile soundFile) {
		this.soundFile = soundFile;
	}

	public SoundFile getSoundFile() {
		return soundFile;
	}

	public int getTabOrder() {
		return tabOrder;
	}

	public void setTabOrder(int tabOrder) {
		this.tabOrder = tabOrder;
	}

	public boolean isRecorder() {
		return recorder;
	}

	public void setRecorder(boolean recorder) {
		this.recorder = recorder;
	}
	public int getTimeout() {
		return timeout;
	}

	public void setTimeout(int timeout) {
		this.timeout = timeout;
	}
}
