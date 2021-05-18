package com.mobilous.mobileweb.attribute;

import java.util.ArrayList;

public class Gradient {

	private ArrayList<String> colorStops = null;

	/**
	 * @param colorStops
	 *            the colorStops to set
	 */
	public void setColorStops(ArrayList<String> colorStops) {
		this.colorStops = colorStops;
	}

	/**
	 * @return the colorStops
	 */
	public ArrayList<String> getColorStops() {
		return colorStops;
	}

}
