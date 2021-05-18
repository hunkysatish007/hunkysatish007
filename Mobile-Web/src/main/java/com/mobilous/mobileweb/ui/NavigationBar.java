package com.mobilous.mobileweb.ui;

import java.util.ArrayList;

import com.mobilous.mobileweb.attribute.Color;
import com.mobilous.mobileweb.attribute.ImageFile;
import com.mobilous.mobileweb.event.Event;

public class NavigationBar extends BaseView {

	private String viewType = "NavigationBar";
	private String barStyle = "Default";
	private boolean translucent = false;
	private boolean barHidden = false;
	private String title = "";
	private String prompt = "";
	private ImageFile titleView = null;
	private Color tintColor = null;
	private ToolBarItems leftBarButton = null;
	private ToolBarItems backBarButton = null;
	private ToolBarItems rightBarButton = null;
	private ArrayList<Event> event = null;

	public String getBarStyle() {
		return barStyle;
	}

	public void setBarStyle(String barStyle) {
		this.barStyle = barStyle;
	}

	public boolean isTranslucent() {
		return translucent;
	}

	public void setTranslucent(boolean translucent) {
		this.translucent = translucent;
	}

	public boolean isBarHidden() {
		return barHidden;
	}

	public void setBarHidden(boolean barHidden) {
		this.barHidden = barHidden;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getPrompt() {
		return prompt;
	}

	public void setPrompt(String prompt) {
		this.prompt = prompt;
	}

	public ImageFile getTitleView() {
		return titleView;
	}

	public void setTitleView(ImageFile titleView) {
		this.titleView = titleView;
	}

	public Color getTintColor() {
		return tintColor;
	}

	public void setTintColor(Color tintColor) {
		this.tintColor = tintColor;
	}

	public ToolBarItems getLeftBarButton() {
		return leftBarButton;
	}

	public void setLeftBarButton(ToolBarItems leftBarButton) {
		this.leftBarButton = leftBarButton;
	}

	public ToolBarItems getBackBarButton() {
		return backBarButton;
	}

	public void setBackBarButton(ToolBarItems backBarButton) {
		this.backBarButton = backBarButton;
	}

	public ToolBarItems getRightBarButton() {
		return rightBarButton;
	}

	public void setRightBarButton(ToolBarItems rightBarButton) {
		this.rightBarButton = rightBarButton;
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
