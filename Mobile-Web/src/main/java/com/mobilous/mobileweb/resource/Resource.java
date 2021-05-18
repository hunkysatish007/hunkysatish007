package com.mobilous.mobileweb.resource;

import java.util.ArrayList;

public class Resource {

	ArrayList<Images> imageList = null;
	ArrayList<BGMS> bgmsList = null;
	ArrayList<Databases> databaseList = null; 
	ArrayList<L10NS> l10nsList = null;
	ArrayList<SoundEffects> soundList = null;
	ArrayList<Videos> videoList = null;
	
	public ArrayList<Images> getImageList() {
		return imageList;
	}
	public void setImageList(ArrayList<Images> imageList) {
		this.imageList = imageList;
	}
	public ArrayList<BGMS> getBgmsList() {
		return bgmsList;
	}
	public void setBgmsList(ArrayList<BGMS> bgmsList) {
		this.bgmsList = bgmsList;
	}
	public ArrayList<Databases> getDatabaseList() {
		return databaseList;
	}
	public void setDatabaseList(ArrayList<Databases> databaseList) {
		this.databaseList = databaseList;
	}
	public ArrayList<L10NS> getL10nsList() {
		return l10nsList;
	}
	public void setL10nsList(ArrayList<L10NS> l10nsList) {
		this.l10nsList = l10nsList;
	}
	public ArrayList<SoundEffects> getSoundList() {
		return soundList;
	}
	public void setSoundList(ArrayList<SoundEffects> soundList) {
		this.soundList = soundList;
	}
	public ArrayList<Videos> getVideoList() {
		return videoList;
	}
	public void setVideoList(ArrayList<Videos> videoList) {
		this.videoList = videoList;
	}
	
	
}
