package com.mobilous.mobileweb.ui;

public abstract class ControlView extends BaseView {

	private boolean enable = false;
	private boolean selected = false;
	private boolean highlighted = false;
	private String contentVerticalAlignment = "";
	private String contentHorizontalAlignment = "";

	public boolean isEnable() {
		return enable;
	}

	public void setEnable(boolean enable) {
		this.enable = enable;
	}

	public boolean isSelected() {
		return selected;
	}

	public void setSelected(boolean selected) {
		this.selected = selected;
	}

	public boolean isHighlighted() {
		return highlighted;
	}

	public void setHighlighted(boolean highlighted) {
		this.highlighted = highlighted;
	}

	public String getContentVerticalAlignment() {
		return contentVerticalAlignment;
	}

	public void setContentVerticalAlignment(String contentVerticalAlignment) {
		this.contentVerticalAlignment = contentVerticalAlignment;
	}

	public String getContentHorizontalAlignment() {
		return contentHorizontalAlignment;
	}

	public void setContentHorizontalAlignment(String contentHorizontalAlignment) {
		this.contentHorizontalAlignment = contentHorizontalAlignment;
	}

}
