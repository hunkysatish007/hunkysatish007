package com.mobilous.mobileweb.ui;

import java.util.ArrayList;

import com.mobilous.mobileweb.attribute.Color;
import com.mobilous.mobileweb.attribute.File;
import com.mobilous.mobileweb.attribute.Font;
import com.mobilous.mobileweb.etc.PageOverlayItem;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.param.NPEActionSheetButtonsController;

public class PageOverlay extends BaseView {

	private String viewType = "Dialog";
	private Color backgroundColor = null;
	private Color borderColor = null;
	private String borderWidth = "1";
	private Boolean hidden = true;
	private int cornerRadius = 0;
	private Padding padding= null;
	
	private Boolean showheader = true;
	private int headerheight = 30;
	private String heading = "";
	private Font headerfont = null;
	private Boolean showclose = true;
	private File closeIcon= null;
	
	private Boolean showfooter = true;
	private int footerheight = 30;
	private ArrayList<NPEActionSheetButtonsController> actionButtons = null;
	private Color actionButtonsColor = null;
	private Color actionButtonsTintColor = null;
	private int actionbuttonwidth = 64;
	private int actionbuttonheight = 24;
	
	private ArrayList<PageOverlayItem> dataarray = null;
	
	private ArrayList<Event> event = null;
	
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

	public Color getActionButtonsColor() {
		return actionButtonsColor;
	}

	public void setActionButtonsColor(Color actionButtonsColor) {
		this.actionButtonsColor = actionButtonsColor;
	}

	public Color getActionButtonsTintColor() {
		return actionButtonsTintColor;
	}

	public void setActionButtonsTintColor(Color actionButtonsTintColor) {
		this.actionButtonsTintColor = actionButtonsTintColor;
	}

	public int getCornerRadius() {
		return cornerRadius;
	}

	public void setCornerRadius(int cornerRadius) {
		this.cornerRadius = cornerRadius;
	}

	public Font getHeaderfont() {
		return headerfont;
	}

	public void setHeaderfont(Font headerfont) {
		this.headerfont = headerfont;
	}

	public String getHeading() {
		return heading;
	}

	public void setHeading(String heading) {
		this.heading = heading;
	}

	public Boolean getHidden() {
		return hidden;
	}

	public void setHidden(Boolean hidden) {
		this.hidden = hidden;
	}

	public Boolean getShowclose() {
		return showclose;
	}

	public void setShowclose(Boolean showclose) {
		this.showclose = showclose;
	}

	public Boolean getShowfooter() {
		return showfooter;
	}

	public void setShowfooter(Boolean showfooter) {
		this.showfooter = showfooter;
	}

	public Boolean getShowheader() {
		return showheader;
	}

	public void setShowheader(Boolean showheader) {
		this.showheader = showheader;
	}

	public Padding getPadding() {
		return padding;
	}

	public void setPadding(Padding padding) {
		this.padding = padding;
	}

	public File getCloseIcon() {
		return closeIcon;
	}

	public void setCloseIcon(File closeIcon) {
		this.closeIcon = closeIcon;
	}

	public ArrayList<PageOverlayItem> getDataarray() {
		return dataarray;
	}

	public void setDataarray(ArrayList<PageOverlayItem> dataarray) {
		this.dataarray = dataarray;
	}

	public ArrayList<NPEActionSheetButtonsController> getActionButtons() {
		return actionButtons;
	}

	public void setActionButtons(ArrayList<NPEActionSheetButtonsController> actionButtons) {
		this.actionButtons = actionButtons;
	}

	public int getHeaderheight() {
		return headerheight;
	}

	public void setHeaderheight(int headerheight) {
		this.headerheight = headerheight;
	}

	public int getFooterheight() {
		return footerheight;
	}

	public void setFooterheight(int footerheight) {
		this.footerheight = footerheight;
	}

	public int getActionbuttonwidth() {
		return actionbuttonwidth;
	}

	public void setActionbuttonwidth(int actionbuttonwidth) {
		this.actionbuttonwidth = actionbuttonwidth;
	}

	public int getActionbuttonheight() {
		return actionbuttonheight;
	}

	public void setActionbuttonheight(int actionbuttonheight) {
		this.actionbuttonheight = actionbuttonheight;
	}

}
