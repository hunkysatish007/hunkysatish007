package com.mobilous.mobileweb.ui;

import java.util.ArrayList;

import com.mobilous.mobileweb.attribute.Color;
import com.mobilous.mobileweb.attribute.Matrix;
import com.mobilous.mobileweb.attribute.Point;
import com.mobilous.mobileweb.etc.ResizingMask;
import com.mobilous.mobileweb.etc.Stretch;
import com.mobilous.mobileweb.event.Event;

//UIView
public abstract class BaseView {

	private int tag = -1;
	private double scale = -1;
	private double alpha = -1;
	private boolean userInteractionEnabled = false;
	private boolean autoresizesSubviews = false;
	private boolean clipsToBounds = false;
	private boolean clearsContextBeforeDrawing = false;
	private boolean hidden = false;
	private String name = "";
	private String defaultValue = ""; // TODO this should be default value
	private String contentMode = "";
	private String value = "";
	private Point frame = null;
	private Point bounds = null;
	private Point center = null;
	private Matrix transform = null;
	private Color backgroundColor = null;
	private ResizingMask autoResizingMask = null;
	private Stretch contentStretch = null;
	private String uiid = "";
	private String fieldname = "";
	private String autocapitalizationType = "";
	private String verticalAlignment = "";
	private String parentUI = "Page"; 
	private String parentUIName = ""; 
	public abstract String getViewType();

	@Override
	public abstract String toString();
	public abstract ArrayList<Event> getEvent();
	private String pageID = "";
	private boolean navigationBarHidden = false;
	private String textDecoration = "";
	
	//Freely use this
	private String strFlag = "";

	private String DBFieldText = "";
	private ArrayList<Event> event = null;
	private boolean textShadow = false;
	private boolean draggable = false;
	
	public boolean isDraggable() {
		return draggable;
	}

	public void setDraggable(boolean draggable) {
		this.draggable = draggable;
	}

	public String getDBFieldText(){
		return this.DBFieldText;
	}
	
	public void setDBFieldText(String dbfield){
		this.DBFieldText = dbfield;
	}
	
	
	public String getFieldname() {
		return fieldname;
	}


	public void setFieldname(String fieldname) {
		this.fieldname = fieldname;
	}

	public String getStrFlag() {
		return strFlag;
	}

	public void setStrFlag(String strFlag) {
		this.strFlag = strFlag;
	}

	// public StringBuffer getActionInsert() {
	// return actionInsert;
	// }
	// public void appendActionInsert(StringBuffer actionInsert) {
	// this.actionInsert.append(actionInsert);
	// }

	public int getTag() {
		return tag;
	}

	public String getPageID() {
		return pageID;
	}

	public void setPageID(String pageID) {
		this.pageID = pageID;
	}

	public void setTag(int tag) {
		this.tag = tag;
	}

	public double getScale() {
		return scale;
	}

	public void setScale(double scale) {
		this.scale = scale;
	}

	public double getAlpha() {
		return alpha;
	}

	public void setAlpha(double alpha) {
		this.alpha = alpha;
	}

	public boolean isUserInteractionEnabled() {
		return userInteractionEnabled;
	}

	public void setUserInteractionEnabled(boolean userInteractionEnabled) {
		this.userInteractionEnabled = userInteractionEnabled;
	}

	public boolean isAutoresizesSubviews() {
		return autoresizesSubviews;
	}

	public void setAutoresizesSubviews(boolean autoresizesSubviews) {
		this.autoresizesSubviews = autoresizesSubviews;
	}

	public boolean isClipsToBounds() {
		return clipsToBounds;
	}

	public void setClipsToBounds(boolean clipsToBounds) {
		this.clipsToBounds = clipsToBounds;
	}

	public boolean isClearsContextBeforeDrawing() {
		return clearsContextBeforeDrawing;
	}

	public void setClearsContextBeforeDrawing(boolean clearsContextBeforeDrawing) {
		this.clearsContextBeforeDrawing = clearsContextBeforeDrawing;
	}

	public boolean isHidden() {
		return hidden;
	}

	public void setHidden(boolean hidden) {
		this.hidden = hidden;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDefaultValue() {
		return defaultValue;
	}

	public void setDefaultValue(String defaultValue) {
		this.defaultValue = defaultValue;
	}

	public String getContentMode() {
		return contentMode;
	}

	public void setContentMode(String contentMode) {
		this.contentMode = contentMode;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getUiid() {
		return uiid;
	}

	public void setUiid(String uiid) {
		this.uiid = uiid;
	}

	public Point getFrame() {
		return frame;
	}

	public void setFrame(Point frame) {
		this.frame = frame;
	}

	public Point getBounds() {
		return bounds;
	}

	public void setBounds(Point bounds) {
		this.bounds = bounds;
	}

	public Point getCenter() {
		return center;
	}

	public void setCenter(Point center) {
		this.center = center;
	}

	public Matrix getTransform() {
		return transform;
	}

	public void setTransform(Matrix transform) {
		this.transform = transform;
	}

	public Color getBackgroundColor() {
		return backgroundColor;
	}

	public void setBackgroundColor(Color backgroundColor) {
		this.backgroundColor = backgroundColor;
	}

	public ResizingMask getAutoResizingMask() {
		return autoResizingMask;
	}

	public void setAutoResizingMask(ResizingMask autoResizingMask) {
		this.autoResizingMask = autoResizingMask;
	}

	public Stretch getContentStretch() {
		return contentStretch;
	}

	public void setContentStretch(Stretch contentStretch) {
		this.contentStretch = contentStretch;
	}

	public boolean isNavigationBarHidden() {
		return navigationBarHidden;
	}

	public void setNavigationBarHidden(boolean navigationBarHidden) {
		this.navigationBarHidden = navigationBarHidden;
	}

	public void setEvent(ArrayList<Event> event) {
		this.event = event;
	}

	public String getAutocapitalizationType() {
		return autocapitalizationType;
	}

	public void setAutocapitalizationType(String autocapitalizationType) {
		this.autocapitalizationType = autocapitalizationType;
	}

	public String getTextDecoration() {
		return textDecoration;
	}

	public void setTextDecoration(String textDecoration) {
		this.textDecoration = textDecoration;
	}

	public String getVerticalAlignment() {
		return verticalAlignment;
	}

	public void setVerticalAlignment(String verticalAlignment) {
		this.verticalAlignment = verticalAlignment;
	}

	public String getParentUI() {
		return parentUI;
	}

	public void setParentUI(String parentUI) {
		this.parentUI = parentUI;
	}

	public String getParentUIName() {
		return parentUIName;
	}

	public void setParentUIName(String parentUIName) {
		this.parentUIName = parentUIName;
	}

	public boolean isTextShadow() {
		return textShadow;
	}

	public void setTextShadow(boolean textShadow) {
		this.textShadow = textShadow;
	}

}
