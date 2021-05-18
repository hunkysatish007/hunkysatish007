package com.mobilous.mobileweb.etc;

import com.mobilous.mobileweb.ui.Segment;
import com.mobilous.mobileweb.ui.ToolBar;
import com.mobilous.mobileweb.ui.ToolBarItems;

public class CustomView extends ToolBar implements ToolBarItems {

	private String type = "CustomView";
	private Segment customViewStyle = null;
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
	 * @param customViewStyle
	 *            the customViewStyle to set
	 */
	public void setCustomViewStyle(Segment customViewStyle) {
		this.customViewStyle = customViewStyle;
	}

	/**
	 * @return the customViewStyle
	 */
	public Segment getCustomViewStyle() {
		return customViewStyle;
	}

}
