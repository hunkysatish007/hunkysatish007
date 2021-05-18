package com.mobilous.mobileweb.ui;

import java.util.ArrayList;

import com.mobilous.mobileweb.attribute.Color;
import com.mobilous.mobileweb.attribute.DateFormat;
import com.mobilous.mobileweb.attribute.Font;
import com.mobilous.mobileweb.attribute.NumberFormat;
import com.mobilous.mobileweb.etc.Size;
import com.mobilous.mobileweb.event.Event;

public class Label extends BaseView {

	private String viewType = "Label";
	private String type = "";
	private String text = "";
	private String link = "";
	private int optionIndex = 0;
	private String textAlignment = "";
	private String lineBreakMode = "";
	private String baseLineAdjustment = "";
	private boolean adjustsFontSizeToFitWidth = false;
	private boolean highlighted = false;
	private int numberOfLines = -1;
	private int minimumFontSize = -1;
	private Font font = null;
	private NumberFormat numberFormat = null;
	private DateFormat dateFormat = null;
	private Color highlightedTextColor = null;
	private Color shadowColor = null;
	private Size shadowOffset = null;

	private String borderStyle = null;
	private String borderWidth = "0";
	private Padding padding = null;
	private Color borderColor = null;
	private Color backgroundColor = null;
	private int tabOrder=0;	
	
	
	private String formatType = "";
	private String formatSubtype = "";
	private String specifierType = "";
	private String formatSpecifier = "";
	
	private boolean trim = false;
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getTextAlignment() {
		return textAlignment;
	}

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}

	public int getOptionIndex() {
		return optionIndex;
	}

	public void setOptionIndex(int optionIndex) {
		this.optionIndex = optionIndex;
	}

	public void setTextAlignment(String textAlignment) {
		this.textAlignment = textAlignment;
	}

	public String getLineBreakMode() {
		return lineBreakMode;
	}

	public void setLineBreakMode(String lineBreakMode) {
		this.lineBreakMode = lineBreakMode;
	}

	public String getBaseLineAdjustment() {
		return baseLineAdjustment;
	}

	public void setBaseLineAdjustment(String baseLineAdjustment) {
		this.baseLineAdjustment = baseLineAdjustment;
	}

	public boolean isAdjustsFontSizeToFitWidth() {
		return adjustsFontSizeToFitWidth;
	}

	public void setAdjustsFontSizeToFitWidth(boolean adjustsFontSizeToFitWidth) {
		this.adjustsFontSizeToFitWidth = adjustsFontSizeToFitWidth;
	}

	public boolean isHighlighted() {
		return highlighted;
	}

	public void setHighlighted(boolean highlighted) {
		this.highlighted = highlighted;
	}

	public int getNumberOfLines() {
		return numberOfLines;
	}

	public void setNumberOfLines(int numberOfLines) {
		this.numberOfLines = numberOfLines;
	}

	public int getMinimumFontSize() {
		return minimumFontSize;
	}

	public void setMinimumFontSize(int minimumFontSize) {
		this.minimumFontSize = minimumFontSize;
	}

	public Font getFont() {
		return font;
	}

	public void setFont(Font font) {
		this.font = font;
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

	public Color getHighlightedTextColor() {
		return highlightedTextColor;
	}

	public void setHighlightedTextColor(Color highlightedTextColor) {
		this.highlightedTextColor = highlightedTextColor;
	}

	public Color getShadowColor() {
		return shadowColor;
	}

	public void setShadowColor(Color shadowColor) {
		this.shadowColor = shadowColor;
	}

	public Size getShadowOffset() {
		return shadowOffset;
	}

	public void setShadowOffset(Size shadowOffset) {
		this.shadowOffset = shadowOffset;
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

	public Padding getPadding() {
		return padding;
	}

	public void setPadding(Padding padding) {
		this.padding = padding;
	}

	public Color getBorderColor() {
		return borderColor;
	}

	public void setBorderColor(Color borderColor) {
		this.borderColor = borderColor;
	}
	
	public Color getBackgroundColor() {
		return backgroundColor;
	}

	public void setBackgroundColor(Color backgroundColor) {
		this.backgroundColor = backgroundColor;
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
		return trim;
	}

	public void setTrim(boolean trim) {
		this.trim = trim;
	}
}
