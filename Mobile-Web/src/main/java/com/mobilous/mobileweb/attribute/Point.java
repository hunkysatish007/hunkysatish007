package com.mobilous.mobileweb.attribute;

public class Point {

	private boolean related = false;
	private double w = -1; //x-axis from RIGHT
	private double x = -1; //x-axis from LEFT
	private double y = -1;
	private double z = -1;
	private double width = -1;
	private double height = -1;
	private double depth = -1;
	private float rotation = -1;

	public double getW() {
		return w;
	}

	public void setW(double w) {
		this.w = w;
	}

	public Point() {

	}

	public Point(double x, double y, double z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	public void setDimensions(double width, double height, double depth) {
		this.width = width;
		this.height = height;
		this.depth = depth;
	}

	public double getX() {
		return x;
	}

	public void setX(double x) {
		this.x = x;
	}

	public double getY() {
		return y;
	}

	public void setY(double y) {
		this.y = y;
	}

	public double getZ() {
		return z;
	}

	public void setZ(double z) {
		this.z = z;
	}

	public double getWidth() {
		return width;
	}

	public void setWidth(double width) {
		this.width = width;
	}

	public double getHeight() {
		return height;
	}

	public void setHeight(double height) {
		this.height = height;
	}

	public double getDepth() {
		return depth;
	}

	public void setDepth(double depth) {
		this.depth = depth;
	}

	@Override
	public String toString() {
		return "Point [x=" + x + ", y=" + y + ", z=" + z + ", width=" + width
				+ ", height=" + height + ", depth=" + depth + "]";
	}

	/**
	 * @param related
	 *            the related to set
	 */
	public void setRelated(boolean related) {
		this.related = related;
	}

	/**
	 * @return the related
	 */
	public boolean isRelated() {
		return related;
	}

	public float getRotation() {
		return rotation;
	}

	public void setRotation(float rotation) {
		this.rotation = rotation;
	}
}
