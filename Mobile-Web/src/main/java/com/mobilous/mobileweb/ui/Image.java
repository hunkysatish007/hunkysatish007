package com.mobilous.mobileweb.ui;

import java.util.ArrayList;

import com.mobilous.mobileweb.attribute.Color;
import com.mobilous.mobileweb.attribute.ImageFile;
import com.mobilous.mobileweb.event.Event;

public class Image extends BaseView {

	private String viewType = "Image";
	private ImageFile image = null;
	private ImageFile highlightedImage = null;
	private ArrayList<ImageFile> animationImages = null;
	private ArrayList<ImageFile> highlightedAnimationImages = null;
	private int animationDuration = -1;
	private int animationRepeatCount = -1;
	private boolean userInteractionEnabled = false;
	private boolean highlighted = false;
	private boolean startAnimating = false;
	private boolean stopAnimating = false;
	private boolean isAnimating = false;
	private int tabOrder=0;	
	private String borderStyle = null;
	private String borderWidth = "0";
	private Color borderColor = null;
	
	private String qrstring = null;
	private String scalemode = null;
	private String CaptchaKeyString = null;
	
	
	public ImageFile getImage() {
		return image;
	}

	public void setImage(ImageFile image) {
		this.image = image;
	}

	public ImageFile getHighlightedImage() {
		return highlightedImage;
	}

	public void setHighlightedImage(ImageFile highlightedImage) {
		this.highlightedImage = highlightedImage;
	}

	public ArrayList<ImageFile> getAnimationImages() {
		return animationImages;
	}

	public void setAnimationImages(ArrayList<ImageFile> animationImages) {
		this.animationImages = animationImages;
	}

	public ArrayList<ImageFile> getHighlightedAnimationImages() {
		return highlightedAnimationImages;
	}

	public void setHighlightedAnimationImages(
			ArrayList<ImageFile> highlightedAnimationImages) {
		this.highlightedAnimationImages = highlightedAnimationImages;
	}

	public int getAnimationDuration() {
		return animationDuration;
	}

	public void setAnimationDuration(int animationDuration) {
		this.animationDuration = animationDuration;
	}

	public int getAnimationRepeatCount() {
		return animationRepeatCount;
	}

	public void setAnimationRepeatCount(int animationRepeatCount) {
		this.animationRepeatCount = animationRepeatCount;
	}

	@Override
	public boolean isUserInteractionEnabled() {
		return userInteractionEnabled;
	}

	@Override
	public void setUserInteractionEnabled(boolean userInteractionEnabled) {
		this.userInteractionEnabled = userInteractionEnabled;
	}

	public boolean isHighlighted() {
		return highlighted;
	}

	public void setHighlighted(boolean highlighted) {
		this.highlighted = highlighted;
	}

	public boolean isStartAnimating() {
		return startAnimating;
	}

	public void setStartAnimating(boolean startAnimating) {
		this.startAnimating = startAnimating;
	}

	public boolean isStopAnimating() {
		return stopAnimating;
	}

	public void setStopAnimating(boolean stopAnimating) {
		this.stopAnimating = stopAnimating;
	}

	public boolean isAnimating() {
		return isAnimating;
	}

	public void setAnimating(boolean isAnimating) {
		this.isAnimating = isAnimating;
	}

	@Override
	public String getViewType() {
		return viewType;
	}

	@Override
	public String toString() {
		return null;
	}

	@Override
	public ArrayList<Event> getEvent() {
		return null;
	}

	public int getTabOrder() {
		return tabOrder;
	}

	public void setTabOrder(int tabOrder) {
		this.tabOrder = tabOrder;
	}

	public String getBorderStyle() {
		return borderStyle;
	}

	public void setBorderStyle(String borderStyle) {
		this.borderStyle = borderStyle;
	}

	public String getBorderWidth() {
		return borderWidth;
	}

	public void setBorderWidth(String borderWidth) {
		this.borderWidth = borderWidth;
	}

	public Color getBorderColor() {
		return borderColor;
	}

	public void setBorderColor(Color borderColor) {
		this.borderColor = borderColor;
	}

	public String getQRstring() {
		return qrstring;
	}

	public void setQRstring(String qrstring) {
		this.qrstring = qrstring;
	}

	public String getScalemode() {
		return scalemode;
	}

	public void setScalemode(String scalemode) {
		this.scalemode = scalemode;
	}

	public String getCaptchaKeyString() {
		return CaptchaKeyString;
	}

	public void setCaptchaKeyString(String captchaKeyString) {
		CaptchaKeyString = captchaKeyString;
	}
}
