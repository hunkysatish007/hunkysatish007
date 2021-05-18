package com.mobilous.mobileweb.attribute;

public class Color {

	private String colorName = ""; // black,darkGray,white,gray,red,green,blue,cyan,yellow,magenta,orange,purple,brown,clear,
	private double red = -1;
	private double green = -1;
	private double blue = -1;
	private double hue = -1;
	private double saturation = -1;
	private double brightness = -1;
	private double alpha = -1;

	public Color() {

	}

	public Color(String colorName) {
		this.colorName = colorName;
	}

	public String getColorName() {
		return colorName;
	}

	public void setColorName(String colorName) {
		this.colorName = colorName;
	}

	public double getRed() {
		return red;
	}

	public void setRed(double red) {
		this.red = red;
	}

	public double getGreen() {
		return green;
	}

	public void setGreen(double green) {
		this.green = green;
	}

	public double getBlue() {
		return blue;
	}

	public void setBlue(double blue) {
		this.blue = blue;
	}

	public double getHue() {
		return hue;
	}

	public void setHue(double hue) {
		this.hue = hue;
	}

	public double getSaturation() {
		return saturation;
	}

	public void setSaturation(double saturation) {
		this.saturation = saturation;
	}

	public double getBrightness() {
		return brightness;
	}

	public void setBrightness(double brightness) {
		this.brightness = brightness;
	}

	public double getAlpha() {
		return alpha;
	}

	public void setAlpha(double alpha) {
		this.alpha = alpha;
	}

	@Override
	public String toString() {
		return "Color [colorName=" + colorName + ", red=" + red + ", green="
				+ green + ", blue=" + blue + ", hue=" + hue + ", saturation="
				+ saturation + ", brightness=" + brightness + ", alpha="
				+ alpha + "]";
	}

}
