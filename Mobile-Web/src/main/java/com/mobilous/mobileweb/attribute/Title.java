package com.mobilous.mobileweb.attribute;

public class Title {

	private String text = "";
	private int height;
	private int width;
	private boolean useDbTable;
	private boolean enabled;
	private boolean highlighted;
	private boolean selected;
	private String textAlignment;
	private int rotation;
	// private Color textColor = null;
	private Font textFont = null;

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public int getHeight() {
		return height;
	}

	public void setHeight(int height) {
		this.height = height;
	}

	public int getWidth() {
		return width;
	}

	public void setWidth(int width) {
		this.width = width;
	}

	public boolean isUseDbTable() {
		return useDbTable;
	}

	public void setUseDbTable(boolean useDbTable) {
		this.useDbTable = useDbTable;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public boolean isHighlighted() {
		return highlighted;
	}

	public void setHighlighted(boolean highlighted) {
		this.highlighted = highlighted;
	}

	public boolean isSelected() {
		return selected;
	}

	public void setSelected(boolean selected) {
		this.selected = selected;
	}

	public String getTextAlignment() {
		return textAlignment;
	}

	public void setTextAlignment(String textAlignment) {
		this.textAlignment = textAlignment;
	}

	public int getRotation() {
		return rotation;
	}

	public void setRotation(int rotation) {
		this.rotation = rotation;
	}

	// public Color getTextColor() {
	// return textColor;
	// }
	// public void setTextColor(Color textColor) {
	// this.textColor = textColor;
	// }
	public Font getTextFont() {
		return textFont;
	}

	public void setTextFont(Font textFont) {
		this.textFont = textFont;
	}
}
