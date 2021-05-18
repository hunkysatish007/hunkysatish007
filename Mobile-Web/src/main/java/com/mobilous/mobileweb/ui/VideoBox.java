package com.mobilous.mobileweb.ui;

import java.util.ArrayList;

import com.mobilous.mobileweb.attribute.VideoFile;
import com.mobilous.mobileweb.event.Event;

public class VideoBox extends BaseView {

	private String viewType = "VideoBox";
	private VideoFile videoFile = null;
	private boolean startPlay = false;
	private boolean pausePlay = false;
	private boolean stopPlay = false;
	private boolean startRecord = false;
	private boolean pauseRecord = false;
	private boolean stopRecord = false;
	private ArrayList<Event> event = null;
	private int tabOrder=0;	
	
	public boolean isStartPlay() {
		return startPlay;
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

	public void setVideoFile(VideoFile videoFile) {
		this.videoFile = videoFile;
	}

	public VideoFile getVideoFile() {
		return videoFile;
	}

	public int getTabOrder() {
		return tabOrder;
	}

	public void setTabOrder(int tabOrder) {
		this.tabOrder = tabOrder;
	}
}
