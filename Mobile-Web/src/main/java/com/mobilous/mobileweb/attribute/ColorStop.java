package com.mobilous.mobileweb.attribute;

public class ColorStop {

	private Color startColor = null;
	private Point stopPoint = null;

	/**
	 * @param startColor
	 *            the startColor to set
	 */
	public void setStartColor(Color startColor) {
		this.startColor = startColor;
	}

	/**
	 * @return the startColor
	 */
	public Color getStartColor() {
		return startColor;
	}

	/**
	 * @param stopPoint
	 *            the stopPoint to set
	 */
	public void setStopPoint(Point stopPoint) {
		this.stopPoint = stopPoint;
	}

	/**
	 * @return the stopPoint
	 */
	public Point getStopPoint() {
		return stopPoint;
	}

}
