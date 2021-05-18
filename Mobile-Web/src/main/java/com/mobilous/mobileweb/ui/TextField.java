package com.mobilous.mobileweb.ui;

import java.util.ArrayList;

import com.mobilous.mobileweb.attribute.Color;
import com.mobilous.mobileweb.attribute.DateFormat;
import com.mobilous.mobileweb.attribute.Font;
import com.mobilous.mobileweb.attribute.ImageFile;
import com.mobilous.mobileweb.attribute.NumberFormat;
import com.mobilous.mobileweb.event.Event;

public class TextField extends ControlView {

	private String viewType = "TextField";
	private String text = "";
	private NumberFormat numberFormat = null;
	private DateFormat dateFormat = null;
	private Font font = null;
	private String placeHolder = "";
	private boolean adjustsFontSizeToFitWidth = false;
	private int minimumFontSize = -1;
	private boolean clearsOnBeginEditing = false;
	private ImageFile background = null;
	private ImageFile disabledBackground = null;
	private String clearButtonMode = "";
	private ImageFile leftView = null;
	private String leftViewMode = "";
	private ImageFile rightView = null;
	private String rightViewMode = "";
	private ImageFile inputView = null;
	private ImageFile inputAccessoryView = null;
	private String autocapitalizationType = "";
	private String autocorrectionType = "";
	private String keyboardAppearance = "";
	private String keyboardType = "";
	private String returnKeyType = "";
	private boolean enablesReturnKeyAutomatically = false;
	private boolean secure = false;
	private boolean numeric = false;
	private ArrayList<Event> event = null;
	private String borderStyle = "";
	private String borderWidth = "1";
	private Color backgroundColor = null;
	private Color borderColor = null;
	private Padding padding= null;
	private int tabOrder=0;	
	private String inputFormatType = "";
	private String formatType = "";
	private String formatSubtype = "";
	private String specifierType = "";
	private String formatSpecifier = "";
	private boolean isTrim = false;
	private boolean editable = false;
	private String maxRange = "Invalid";
	private String minRange = "Invalid";
	private boolean voiceRecognizable = false;
	private String recognitionType = "";
	private int cornerRadius=0;
	private int charLimit = -1;
	
	public String getText() {
		return text;
	}

	public boolean isNumeric() {
		return numeric;
	}

	public void setNumeric(boolean numeric) {
		this.numeric = numeric;
	}

	public void setText(String text) {
		this.text = text;
	}

	public NumberFormat getNumberFormat() {
		return numberFormat;
	}

	public void setNumberFormat(NumberFormat numberFormat) {
		this.numberFormat = numberFormat;
	}

	public DateFormat getDateFormat() {
		return dateFormat;
	}

	public void setDateFormat(DateFormat dateFormat) {
		this.dateFormat = dateFormat;
	}

	public Font getFont() {
		return font;
	}

	public void setFont(Font font) {
		this.font = font;
	}

	public String getPlaceHolder() {
		return placeHolder;
	}

	public void setPlaceHolder(String placeHolder) {
		this.placeHolder = placeHolder;
	}

	public boolean isAdjustsFontSizeToFitWidth() {
		return adjustsFontSizeToFitWidth;
	}

	public void setAdjustsFontSizeToFitWidth(boolean adjustsFontSizeToFitWidth) {
		this.adjustsFontSizeToFitWidth = adjustsFontSizeToFitWidth;
	}

	public int getMinimumFontSize() {
		return minimumFontSize;
	}

	public void setMinimumFontSize(int minimumFontSize) {
		this.minimumFontSize = minimumFontSize;
	}

	public boolean isClearsOnBeginEditing() {
		return clearsOnBeginEditing;
	}

	public void setClearsOnBeginEditing(boolean clearsOnBeginEditing) {
		this.clearsOnBeginEditing = clearsOnBeginEditing;
	}

	public String getBorderStyle() {
		return borderStyle;
	}

	public void setBorderStyle(String borderStyle) {
		this.borderStyle = borderStyle;
	}

	public ImageFile getBackground() {
		return background;
	}

	public void setBackground(ImageFile background) {
		this.background = background;
	}

	public ImageFile getDisabledBackground() {
		return disabledBackground;
	}

	public void setDisabledBackground(ImageFile disabledBackground) {
		this.disabledBackground = disabledBackground;
	}

	public String getClearButtonMode() {
		return clearButtonMode;
	}

	public void setClearButtonMode(String clearButtonMode) {
		this.clearButtonMode = clearButtonMode;
	}

	public ImageFile getLeftView() {
		return leftView;
	}

	public void setLeftView(ImageFile leftView) {
		this.leftView = leftView;
	}

	public String getLeftViewMode() {
		return leftViewMode;
	}

	public void setLeftViewMode(String leftViewMode) {
		this.leftViewMode = leftViewMode;
	}

	public ImageFile getRightView() {
		return rightView;
	}

	public void setRightView(ImageFile rightView) {
		this.rightView = rightView;
	}

	public String getRightViewMode() {
		return rightViewMode;
	}

	public void setRightViewMode(String rightViewMode) {
		this.rightViewMode = rightViewMode;
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

	public String getAutocapitalizationType() {
		return autocapitalizationType;
	}

	public void setAutocapitalizationType(String autocapitalizationType) {
		this.autocapitalizationType = autocapitalizationType;
	}

	public String getAutocorrectionType() {
		return autocorrectionType;
	}

	public void setAutocorrectionType(String autocorrectionType) {
		this.autocorrectionType = autocorrectionType;
	}

	public String getKeyboardAppearance() {
		return keyboardAppearance;
	}

	public void setKeyboardAppearance(String keyboardAppearance) {
		this.keyboardAppearance = keyboardAppearance;
	}

	public String getKeyboardType() {
		return keyboardType;
	}

	public void setKeyboardType(String keyboardType) {
		this.keyboardType = keyboardType;
	}

	public String getReturnKeyType() {
		return returnKeyType;
	}

	public void setReturnKeyType(String returnKeyType) {
		this.returnKeyType = returnKeyType;
	}

	public boolean isEnablesReturnKeyAutomatically() {
		return enablesReturnKeyAutomatically;
	}

	public void setEnablesReturnKeyAutomatically(
			boolean enablesReturnKeyAutomatically) {
		this.enablesReturnKeyAutomatically = enablesReturnKeyAutomatically;
	}

	public boolean isSecure() {
		return secure;
	}

	public void setSecure(boolean secure) {
		this.secure = secure;
	}
	
	public String getBorderWidth() {
		return borderWidth;
	}

	public void setBorderWidth(String borderWidth) {
		this.borderWidth = borderWidth;
	}
	
	public Color getBackgroundColor() {
		return backgroundColor;
	}

	public void setBackgroundColor(Color backgroundColor) {
		this.backgroundColor = backgroundColor;
	}
	
	public Color getBorderColor() {
		return borderColor;
	}

	public void setBorderColor(Color borderColor) {
		this.borderColor = borderColor;
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

	public String getInputFormatType() {
		return inputFormatType;
	}

	public void setInputFormatType(String inputFormatType) {
		this.inputFormatType = inputFormatType;
	}

	public String getFormatType() {
		return formatType;
	}

	public void setFormatType(String formatType) {
		this.formatType = formatType;
	}

	public String getFormatSubtype() {
		return formatSubtype;
	}

	public void setFormatSubtype(String formatSubtype) {
		this.formatSubtype = formatSubtype;
	}

	public String getSpecifierType() {
		return specifierType;
	}

	public void setSpecifierType(String specifierType) {
		this.specifierType = specifierType;
	}

	public String getFormatSpecifier() {
		return formatSpecifier;
	}

	public void setFormatSpecifier(String formatSpecifier) {
		this.formatSpecifier = formatSpecifier;
	}

	public boolean isTrim() {
		return isTrim;
	}

	public void setTrim(boolean isTrim) {
		this.isTrim = isTrim;
	}

	public String getMinRange() {
		return minRange;
	}

	public void setMinRange(String minRange) {
		this.minRange = minRange;
	}

	public String getMaxRange() {
		return maxRange;
	}

	public void setMaxRange(String maxRange) {
		this.maxRange = maxRange;
	}

	public boolean isEditable() {
		return editable;
	}

	public void setEditable(boolean editable) {
		this.editable = editable;
	}

	public boolean isVoiceRecognizable() {
		return voiceRecognizable;
	}

	public void setVoiceRecognizable(boolean voiceRecognizable) {
		this.voiceRecognizable = voiceRecognizable;
	}
	
	public String getRecognitionType() {
		return recognitionType;
	}

	public void setRecognitionType(String recognitionType) {
		this.recognitionType = recognitionType;
	}

	public int getCornerRadius() {
		return cornerRadius;
	}

	public void setCornerRadius(int cornerRadius) {
		this.cornerRadius = cornerRadius;
	}
	
	public int getCharLimit() {
		return charLimit;
	}

	public void setCharLimit(int charLimit) {
		this.charLimit = charLimit;
	}
	
}
