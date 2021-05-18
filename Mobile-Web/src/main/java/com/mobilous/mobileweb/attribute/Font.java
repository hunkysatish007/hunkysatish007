package com.mobilous.mobileweb.attribute;

public class Font {

	private String font = "";
	private int fontSize = -1;
	private Color textColor = null;
	private String textAlignment = "";
	private String lineBreakMode = "";
	private Color shadowColor = null;
	private Point shadowOffset = null;
	private boolean fontStyle = false;
	private boolean fontWeight = false;

	// TODO: these 2 variables is not included in the documentation
	private boolean adjustFontSizeToFile = false;
	private int minimumFontSize = -1;

	public String getFont() {
		return font;
	}

	public void setFont(String font) {
		this.font = font;
	}

	public int getFontSize() {
		return fontSize;
	}

	public void setFontSize(int fontSize) {
		this.fontSize = fontSize;
	}

	public Color getTextColor() {
		return textColor;
	}

	public void setTextColor(Color textColor) {
		this.textColor = textColor;
	}

	public String getTextAlignment() {
		return textAlignment;
	}

	public void setTextAlignment(String textAlignment) {
		this.textAlignment = textAlignment;
	}

	public String getLineBreakMode() {
		return lineBreakMode;
	}

	public void setLineBreakMode(String lineBreakMode) {
		this.lineBreakMode = lineBreakMode;
	}

	public Color getShadowColor() {
		return shadowColor;
	}

	public void setShadowColor(Color shadowColor) {
		this.shadowColor = shadowColor;
	}

	public Point getShadowOffset() {
		return shadowOffset;
	}

	public void setShadowOffset(Point shadowOffset) {
		this.shadowOffset = shadowOffset;
	}

	public boolean isAdjustFontSizeToFile() {
		return adjustFontSizeToFile;
	}

	public void setAdjustFontSizeToFile(boolean adjustFontSizeToFile) {
		this.adjustFontSizeToFile = adjustFontSizeToFile;
	}

	public int getMinimumFontSize() {
		return minimumFontSize;
	}

	public void setMinimumFontSize(int minimumFontSize) {
		this.minimumFontSize = minimumFontSize;
	}
	
	public boolean isFontStyle() {
		return fontStyle;
	}

	public void setFontStyle(boolean fontStyle) {
		this.fontStyle = fontStyle;
	}
	
	public boolean isFontWeight() {
		return fontWeight;
	}

	public void setFontWeight(boolean fontWeight) {
		this.fontWeight = fontWeight;
	}

	@Override
	public String toString() {
		return "Font [font=" + font + ", fontSize=" + fontSize + ", textColor="
				+ textColor + ", textAlignment=" + textAlignment
				+ ", lineBreakMode=" + lineBreakMode + ", shadowColor="
				+ shadowColor + ", shadowOffset=" + shadowOffset
				+ ", adjustFontSizeToFile=" + adjustFontSizeToFile
				+ ", minimumFontSize=" + minimumFontSize + "]";
	}

	

}
