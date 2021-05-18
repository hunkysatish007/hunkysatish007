package com.mobilous.mobileweb.etc;

import java.util.ArrayList;

import com.mobilous.mobileweb.attribute.ImageFile;
import com.mobilous.mobileweb.attribute.Point;
import com.mobilous.mobileweb.event.Event;

public class Markers {

	private String name = "";
	private String markerid = "";
	private String title = "";
	private String subtitle = "";
	private String leftView = "";
	private String rightView = "";
	private ImageFile leftViewImage = null;
	private ImageFile rightViewImage = null;
	private boolean enable = false;
	private boolean asDefault = false;
	private Point anchor = null;
	private boolean canShowCallout = false;
	private String latitude = "";
	private String longitude = "";
	private Event event = null;
	

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getMarkerId() {
		return markerid;
	}

	public void setMarkerId(String markerid) {
		this.markerid = markerid;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getSubtitle() {
		return subtitle;
	}

	public void setSubtitle(String subtitle) {
		this.subtitle = subtitle;
	}

	public String getLeftView() {
		return leftView;
	}

	public void setLeftView(String leftView) {
		this.leftView = leftView;
	}

	public String getRightView() {
		return rightView;
	}

	public void setRightView(String rightView) {
		this.rightView = rightView;
	}

	public ImageFile getLeftViewImage() {
		return leftViewImage;
	}

	public void setLeftViewImage(ImageFile leftViewImage) {
		this.leftViewImage = leftViewImage;
	}

	public ImageFile getRightViewImage() {
		return rightViewImage;
	}

	public void setRightViewImage(ImageFile rightViewImage) {
		this.rightViewImage = rightViewImage;
	}

	public boolean isEnable() {
		return enable;
	}

	public void setEnable(boolean enable) {
		this.enable = enable;
	}

	public boolean isAsDefault() {
		return asDefault;
	}

	public void setAsDefault(boolean asDefault) {
		this.asDefault = asDefault;
	}

	public Point getAnchor() {
		return anchor;
	}

	public void setAnchor(Point anchor) {
		this.anchor = anchor;
	}

	public boolean isCanShowCallout() {
		return canShowCallout;
	}

	public void setCanShowCallout(boolean canShowCallout) {
		this.canShowCallout = canShowCallout;
	}

	public String getLatitude() {
		return latitude;
	}

	public void setLatitude(String string) {
		this.latitude = string;
	}

	public String getLongitude() {
		return longitude;
	}

	public void setLongitude(String string) {
		this.longitude = string;
	}

	public Event getEvent() {
		return event;
	}

	public void setEvent(Event event) {
		this.event = event;
	}

}
