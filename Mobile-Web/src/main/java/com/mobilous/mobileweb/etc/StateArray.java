package com.mobilous.mobileweb.etc;

import com.mobilous.mobileweb.attribute.ImageFile;

public class StateArray {

	private String state = "";
	private ImageFile minimumValueImage = null;
	private ImageFile maximumValueImage = null;
	private ImageFile minimumTrackImage = null;
	private ImageFile maximumTrackImage = null;
	private ImageFile ThumbImage = null;

	public ImageFile getMinimumValueImage() {
		return minimumValueImage;
	}

	public void setMinimumValueImage(ImageFile minimumValueImage) {
		this.minimumValueImage = minimumValueImage;
	}

	public ImageFile getMaximumValueImage() {
		return maximumValueImage;
	}

	public void setMaximumValueImage(ImageFile maximumValueImage) {
		this.maximumValueImage = maximumValueImage;
	}

	public ImageFile getMinimumTrackImage() {
		return minimumTrackImage;
	}

	public void setMinimumTrackImage(ImageFile minimumTrackImage) {
		this.minimumTrackImage = minimumTrackImage;
	}

	public ImageFile getMaximumTrackImage() {
		return maximumTrackImage;
	}

	public void setMaximumTrackImage(ImageFile maximumTrackImage) {
		this.maximumTrackImage = maximumTrackImage;
	}

	public ImageFile getThumbImage() {
		return ThumbImage;
	}

	public void setThumbImage(ImageFile thumbImage) {
		ThumbImage = thumbImage;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

}
