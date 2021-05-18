package com.mobilous.mobileweb.attribute;

public class TextStyle implements Style {

	private String type = "Text";
	private Font textStyle = null;

	@Override
	public String getType() {
		return type;
	}

	@Override
	public void setColor(Color color) {
		// TODO Auto-generated method stub

	}

	@Override
	public Color getColor() {
		// TODO Auto-generated method stub
		return null;
	}

	/**
	 * @param textStyle
	 *            the textStyle to set
	 */
	public void setTextStyle(Font textStyle) {
		this.textStyle = textStyle;
	}

	/**
	 * @return the textStyle
	 */
	public Font getTextStyle() {
		return textStyle;
	}

}
