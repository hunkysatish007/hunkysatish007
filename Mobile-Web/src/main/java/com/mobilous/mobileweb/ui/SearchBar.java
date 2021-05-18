package com.mobilous.mobileweb.ui;

import java.util.ArrayList;

import com.mobilous.mobileweb.attribute.Color;
import com.mobilous.mobileweb.attribute.Font;
import com.mobilous.mobileweb.event.Event;

public class SearchBar extends BaseView {

	private String viewType = "SearchBar";
	private String placeHolder = "";
	private String prompt = "";
	private String text = "";
	private String barStyle = "";
	private Color tintColor = null;
	private boolean translucent = false;
	private String autocapitalizationType = "Sentences"; // "None", "Words",
															// "Sentences",
															// "AllCharacters"
	private String autocorrectionType = "Default"; // "Default","YES","NO"
	private String keyboardType = "Default"; // "Default" "ASCIICapable"
												// "NumbersAndPunctuation" "URL"
												// "NumberPad" "PhonePad"
												// "NamePhonePad" "EmailAddress"
												// "DecimalPad"
	private boolean showsBookmarkButton = false;
	private boolean showsCancelButton = false;
	private boolean showsSearchResultsButton = false;
	private ArrayList<String> scopeButtonTitles = null;
	private int selectedScopeButtonIndex = -1;
	private boolean showsScopeBar = false;
	private ArrayList<Event> event = null;
	private int tabOrder=0;
	private boolean hidden = false; 
	private Font font = null;
	private String verticalAlignment ="";
	private String borderStyle = null;
	private String borderWidth = "0";
	private Color borderColor = null;
	private Color backgroundColor = null;
	private Padding padding = null;
	
	
	public String getPlaceHolder() {
		return placeHolder;
	}

	public void setPlaceHolder(String placeHolder) {
		this.placeHolder = placeHolder;
	}

	public String getPrompt() {
		return prompt;
	}

	public void setPrompt(String prompt) {
		this.prompt = prompt;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getBarStyle() {
		return barStyle;
	}

	public void setBarStyle(String barStyle) {
		this.barStyle = barStyle;
	}

	public Color getTintColor() {
		return tintColor;
	}

	public void setTintColor(Color tintColor) {
		this.tintColor = tintColor;
	}

	public boolean isTranslucent() {
		return translucent;
	}

	public void setTranslucent(boolean translucent) {
		this.translucent = translucent;
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

	public String getKeyboardType() {
		return keyboardType;
	}

	public void setKeyboardType(String keyboardType) {
		this.keyboardType = keyboardType;
	}

	public boolean isShowsBookmarkButton() {
		return showsBookmarkButton;
	}

	public void setShowsBookmarkButton(boolean showsBookmarkButton) {
		this.showsBookmarkButton = showsBookmarkButton;
	}

	public boolean isShowsCancelButton() {
		return showsCancelButton;
	}

	public void setShowsCancelButton(boolean showsCancelButton) {
		this.showsCancelButton = showsCancelButton;
	}

	public boolean isShowsSearchResultsButton() {
		return showsSearchResultsButton;
	}

	public void setShowsSearchResultsButton(boolean showsSearchResultsButton) {
		this.showsSearchResultsButton = showsSearchResultsButton;
	}

	public ArrayList<String> getScopeButtonTitles() {
		return scopeButtonTitles;
	}

	public void setScopeButtonTitles(ArrayList<String> scopeButtonTitles) {
		this.scopeButtonTitles = scopeButtonTitles;
	}

	public int getSelectedScopeButtonIndex() {
		return selectedScopeButtonIndex;
	}

	public void setSelectedScopeButtonIndex(int selectedScopeButtonIndex) {
		this.selectedScopeButtonIndex = selectedScopeButtonIndex;
	}

	public boolean isShowsScopeBar() {
		return showsScopeBar;
	}

	public void setShowsScopeBar(boolean showsScopeBar) {
		this.showsScopeBar = showsScopeBar;
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
	
	public boolean getHidden() {
		return hidden;
	}


	public void setHidden(boolean ishidden) {
		this.hidden = ishidden;
	}

	public Font getFont() {
		return font;
	}

	public void setFont(Font font) {
		this.font = font;
	}

	public String getVerticalAlignment() {
		return verticalAlignment;
	}

	public void setVerticalAlignment(String verticalAlignment) {
		this.verticalAlignment = verticalAlignment;
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

	public Color getBackgroundColor() {
		return backgroundColor;
	}

	public void setBackgroundColor(Color backgroundColor) {
		this.backgroundColor = backgroundColor;
	}

	public Padding getPadding() {
		return padding;
	}

	public void setPadding(Padding padding) {
		this.padding = padding;
	}
}
