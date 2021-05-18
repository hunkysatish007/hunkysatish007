package com.mobilous.mobileweb.etc;

import java.util.ArrayList;

import com.mobilous.mobileweb.attribute.Color;
import com.mobilous.mobileweb.attribute.Font;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.ToolBar;
import com.mobilous.mobileweb.ui.ToolBarItems;

public class TextItem extends ToolBar implements ToolBarItems {

	private String type = "TextItem";
	private String text = "";
	private Font font = null;
	private Color textColor = null;
	private Color onTapTextColor = null;
	private Color onTapTintColor = null;
	private ArrayList<Event> event = null;
	private String id = "";

	@Override
	public String getId() {
		return id;
	}

	@Override
	public void setId(String id) {
		this.id = id;
	}

	@Override
	public String getType() {
		return type;
	}

	/**
	 * @param text
	 *            the text to set
	 */
	public void setText(String text) {
		this.text = text;
	}

	/**
	 * @return the text
	 */
	public String getText() {
		return text;
	}

	/**
	 * @param font
	 *            the font to set
	 */
	public void setFont(Font font) {
		this.font = font;
	}

	/**
	 * @return the font
	 */
	public Font getFont() {
		return font;
	}
	public Color getTextColor() {
		return textColor;
	}

	public void setTextColor(Color textColor) {
		this.textColor = textColor;
	}

	public Color getOnTapTextColor() {
		return onTapTextColor;
	}

	public void setOnTapTextColor(Color onTapTextColor) {
		this.onTapTextColor = onTapTextColor;
	}

	public Color getOnTapTintColor() {
		return onTapTintColor;
	}

	public void setOnTapTintColor(Color onTapTintColor) {
		this.onTapTintColor = onTapTintColor;
	}


	@Override
	public ArrayList<Event> getEvent() {
		return event;
	}

	@Override
	public void setEvent(ArrayList<Event> event) {
		this.event = event;
	}

}
