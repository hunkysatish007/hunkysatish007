package com.mobilous.mobileweb.attribute;

public class StyleFill implements Style {

	private String type = "Fill";
	private String patternImage = "";
	private Gradient gradient = null;
	private Point startPoint = null;
	private Point startCenter = null;
	private Point endPoint = null;
	private Point endCenter = null;

	public String getPatternImage() {
		return patternImage;
	}

	public void setPatternImage(String patternImage) {
		this.patternImage = patternImage;
	}

	public Gradient getGradient() {
		return gradient;
	}

	public void setGradient(Gradient gradient) {
		this.gradient = gradient;
	}

	public Point getStartPoint() {
		return startPoint;
	}

	public void setStartPoint(Point startPoint) {
		this.startPoint = startPoint;
	}

	public Point getStartCenter() {
		return startCenter;
	}

	public void setStartCenter(Point startCenter) {
		this.startCenter = startCenter;
	}

	public Point getEndPoint() {
		return endPoint;
	}

	public void setEndPoint(Point endPoint) {
		this.endPoint = endPoint;
	}

	public Point getEndCenter() {
		return endCenter;
	}

	public void setEndCenter(Point endCenter) {
		this.endCenter = endCenter;
	}

	public void setType(String type) {
		this.type = type;
	}

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

}
