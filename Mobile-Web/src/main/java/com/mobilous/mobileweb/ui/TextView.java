package com.mobilous.mobileweb.ui;

import java.util.ArrayList;

import com.mobilous.mobileweb.app.ScrollView;
import com.mobilous.mobileweb.attribute.Color;
import com.mobilous.mobileweb.attribute.Font;
import com.mobilous.mobileweb.attribute.ImageFile;
import com.mobilous.mobileweb.event.Event;

public class TextView extends ScrollView {

	private String viewType = "TextView";

	private String text = "";
	private Font font = null;
	private boolean editable = false;
	private boolean RefFileHidden = true;
	private String dataDetectorTypes = "";
	private String refFileURL = "";
	private String textAlignment = "";
	private ImageFile inputView = null;
	private ImageFile inputAccessoryView = null;
	private ArrayList<Event> event = null;
	private String borderStyle = "";
	private String borderWidth = "1";
	private Padding padding = null;
	private Color backgroundColor = null;
	private Color borderColor = null;
	private int tabOrder=0;	
	private boolean trim = false;
	private boolean voiceRecognizable = false;
	private boolean continueVR = false;
	private String recognitionType = "";
	private boolean flexibleHeight = false;
	private boolean underline = false;
	private boolean strikeout = false;
	private int cornerRadius=0;
	private String keyboardType = "";
	private String scrollPosition = "";
	private int charLimit = -1;
	
	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public Font getFont() {
		return font;
	}

	public void setFont(Font font) {
		this.font = font;
	}
	
	public void setBackgroundColor(Color backgroundColor){
		this.backgroundColor = backgroundColor;
	}
	
	public Color getBackgroundColor(){
		return backgroundColor;
	}

	public boolean isEditable() {
		return editable;
	}

	public void setEditable(boolean editable) {
		this.editable = editable;
	}

	public boolean isRefFileHidden() {
		return RefFileHidden;
	}

	public void setRefFileHidden(boolean refFileHidden) {
		RefFileHidden = refFileHidden;
	}

	public String getRefFileURL() {
		return refFileURL;
	}

	public void setRefFileURL(String refFileURL) {
		this.refFileURL = refFileURL;
	}

	public String getDataDetectorTypes() {
		return dataDetectorTypes;
	}

	public void setDataDetectorTypes(String dataDetectorTypes) {
		this.dataDetectorTypes = dataDetectorTypes;
	}

	public String getTextAlignment() {
		return textAlignment;
	}

	public void setTextAlignment(String textAlignment) {
		this.textAlignment = textAlignment;
	}

	public ImageFile getInputView() {
		return inputView;
	}

	public void setInputView(ImageFile inputView) {
		this.inputView = inputView;
	}

	public ImageFile getInputAccessoryView() {
		return inputAccessoryView;
	}

	public void setInputAccessoryView(ImageFile inputAccessoryView) {
		this.inputAccessoryView = inputAccessoryView;
	}
	
	public String getBorderStyle() {
		return borderStyle;
	}

	public void setBorderStyle(String borderStyle) {
		this.borderStyle = borderStyle;
	}
	
	public Color getBorderColor() {
		return borderColor;
	}

	public void setBorderColor(Color borderColor) {
		this.borderColor = borderColor;
	}
	
	public String getBorderWidth() {
		return borderWidth;
	}

	public void setBorderWidth(String borderWidth) {
		this.borderWidth = borderWidth;
	}
	
	public Padding getPadding() {
		return padding;
	}

	public void setPadding(Padding padding) {
		this.padding = padding;
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
		return event;
	}

	public void setEvent(ArrayList<Event> event) {
		this.event = event;
	}

	public int getTabOrder() {
		return tabOrder;
	}

	public void setTabOrder(int tabOrder) {
		this.tabOrder = tabOrder;
	}

	public boolean isTrim() {
		return trim;
	}

	public void setTrim(boolean trim) {
		this.trim = trim;
	}

	public boolean isVoiceRecognizable() {
		return voiceRecognizable;
	}

	public void setVoiceRecognizable(boolean voiceRecognizable) {
		this.voiceRecognizable = voiceRecognizable;
	}

	public boolean isContinueVR() {
		return continueVR;
	}

	public void setContinueVR(boolean continueVR) {
		this.continueVR = continueVR;
	}

	public String getRecognitionType() {
		return recognitionType;
	}

	public void setRecognitionType(String recognitionType) {
		this.recognitionType = recognitionType;
	}

	public boolean isFlexibleHeight() {
		return flexibleHeight;
	}

	public void setFlexibleHeight(boolean flexibleHeight) {
		this.flexibleHeight = flexibleHeight;
	}

	public boolean isUnderline() {
		return underline;
	}

	public void setUnderline(boolean underline) {
		this.underline = underline;
	}

	public boolean isStrikeout() {
		return strikeout;
	}

	public void setStrikeout(boolean strikeout) {
		this.strikeout = strikeout;
	}

	public int getCornerRadius() {
		return cornerRadius;
	}

	public void setCornerRadius(int cornerRadius) {
		this.cornerRadius = cornerRadius;
	}

	public String getKeyboardType() {
		return keyboardType;
	}

	public void setKeyboardType(String keyboardType) {
		this.keyboardType = keyboardType;
	}

	public String getScrollPosition() {
		return scrollPosition;
	}

	public void setScrollPosition(String scrollPosition) {
		this.scrollPosition = scrollPosition;
	}

	public int getCharLimit() {
		return charLimit;
	}

	public void setCharLimit(int charLimit) {
		this.charLimit = charLimit;
	}

	
    
}
