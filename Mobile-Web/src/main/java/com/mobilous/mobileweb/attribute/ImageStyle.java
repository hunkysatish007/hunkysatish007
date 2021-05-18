package com.mobilous.mobileweb.attribute;

import com.mobilous.mobileweb.ui.Image;

public class ImageStyle implements Style {

	private String type = "Image";
	private Image image = null;

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
	 * @param image
	 *            the image to set
	 */
	public void setImage(Image image) {
		this.image = image;
	}

	/**
	 * @return the image
	 */
	public Image getImage() {
		return image;
	}

}
