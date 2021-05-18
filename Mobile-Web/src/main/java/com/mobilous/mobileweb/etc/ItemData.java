package com.mobilous.mobileweb.etc;

import com.mobilous.mobileweb.attribute.Font;
import com.mobilous.mobileweb.attribute.ImageFile;

public class ItemData {

	// its either font and text OR image is null.
	private Font font = null;
	private String text = "99";
	private ImageFile imageFile = null;
	private String value = "0";

	public ItemData() {
	}

	public ItemData(String text) {
		this.text = text;
	}

	public Font getFont() {
		return font;
	}

	public void setFont(Font font) {
		this.font = font;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	/**
	 * @param imageFile
	 *            the imageFile to set
	 */
	public void setImageFile(ImageFile imageFile) {
		this.imageFile = imageFile;
	}

	/**
	 * @return the imageFile
	 */
	public ImageFile getImageFile() {
		return imageFile;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

}
