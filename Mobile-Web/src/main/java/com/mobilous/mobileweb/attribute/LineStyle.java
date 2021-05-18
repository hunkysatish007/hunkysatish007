package com.mobilous.mobileweb.attribute;

public class LineStyle implements Style {

	private String type = "Line";
	private int lineWidth = -1;
	private String linePattern = "";

	@Override
	public String getType() {
		return type;
	}

	public int getLineWidth() {
		return lineWidth;
	}

	public void setLineWidth(int lineWidth) {
		this.lineWidth = lineWidth;
	}

	public String getLinePattern() {
		return linePattern;
	}

	public void setLinePattern(String linePattern) {
		this.linePattern = linePattern;
	}

	public void setType(String type) {
		this.type = type;
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

}
