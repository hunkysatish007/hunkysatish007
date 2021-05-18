package com.mobilous.mobileweb.param;

import java.util.ArrayList;

import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.attribute.Color;
import com.mobilous.mobileweb.attribute.Font;
import com.mobilous.mobileweb.attribute.ImageFile;
import com.mobilous.mobileweb.attribute.NumberFormat;
import com.mobilous.mobileweb.attribute.Point;
import com.mobilous.mobileweb.etc.Condition;
import com.mobilous.mobileweb.util.Utility;

public class UIObjectController implements Parameters {

	private String pageName = "";
	private String method = "";
	private String name = "";
	private String key = "";
	private String value = "";
	private String x = "-1";
	private String y = "-1";
	private String width = "-1";
	private String height = "-1";
	private String shiftX = "-1";
	private String shiftY = "-1";
	private String centerX = "-1";
	private String centerY = "-1";
	private String degree = "-1";
	private ArrayList<String> uiProperties = null;
	private Point frame = null;
	private ImageFile image = null;
	private Font font = null;
	private Color color = null;
	private Condition condition = null;
	private NumberFormat format = null; // Add by kundan
	private String targetPage = "";
	private String targetUI ="";
	private boolean reference =false;
	private String cellId = "";
	private String groupId = "";
	private String textname = "";
	
	private boolean animation =false;
	private String duration ="";
	private String animateTime = "";
	private String referenceTarget = "";
	
	public String getPageName(GenApp genApp) {
		return Utility.getDefFileIDByFilename(genApp, pageName);
		// return pageName;
	}

	public void setPageName(String pageName) {
		this.pageName = pageName;
	}

	public NumberFormat getFormat() {
		return format;
	}

	public void setFormat(NumberFormat format) {
		this.format = format;
	}

	public Condition getCondition() {
		return condition;
	}

	public void setCondition(Condition condition) {
		this.condition = condition;
	}

	public UIObjectController(String method) {
		this.method = method;
	}

	@Override
	public void setMethod(String method) {
		this.method = method;
	}

	@Override
	public String getMethod() {
		return method;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getX() {
		return x;
	}

	public void setX(String x) {
		this.x = x;
	}

	public String getY() {
		return y;
	}

	public void setY(String y) {
		this.y = y;
	}

	public String getWidth() {
		return width;
	}

	public void setWidth(String width) {
		this.width = width;
	}

	public String getHeight() {
		return height;
	}

	public void setHeight(String height) {
		this.height = height;
	}

	public String getShiftX() {
		return shiftX;
	}

	public void setShiftX(String shiftX) {
		this.shiftX = shiftX;
	}

	public String getShiftY() {
		return shiftY;
	}

	public void setShiftY(String shiftY) {
		this.shiftY = shiftY;
	}

	public String getCenterX() {
		return centerX;
	}

	public void setCenterX(String centerX) {
		this.centerX = centerX;
	}

	public String getCenterY() {
		return centerY;
	}

	public void setCenterY(String centerY) {
		this.centerY = centerY;
	}

	public String getDegree() {
		return degree;
	}

	public void setDegree(String degree) {
		this.degree = degree;
	}

	public ImageFile getImage() {
		return image;
	}

	public void setImage(ImageFile image) {
		this.image = image;
	}

	public Point getFrame() {
		return frame;
	}

	public void setFrame(Point frame) {
		this.frame = frame;
	}

	public Font getFont() {
		return font;
	}

	public void setFont(Font font) {
		this.font = font;
	}

	public Color getColor() {
		return color;
	}

	public void setColor(Color color) {
		this.color = color;
	}

	public String getTargetPage() {
		return targetPage;
	}

	public void setTargetPage(String targetPage) {
		this.targetPage = targetPage;
	}
		
	public ArrayList<String> getUiProperties() {
		return uiProperties;
	}

	public void setUiProperties(ArrayList<String> uiProperties) {
		this.uiProperties = uiProperties;
	}

	
	public String getTargetUI() {
		return targetUI;
	}

	public void setTargetUI(String targetUI) {
		this.targetUI = targetUI;
	}

	public boolean isReference() {
		return reference;
	}

	public void setReference(boolean reference) {
		this.reference = reference;
	}

	public String getCellId() {
		return cellId;
	}

	public void setCellId(String cellId) {
		this.cellId = cellId;
	}

	public String getGroupId() {
		return groupId;
	}

	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}

	public String getTextname() {
		return textname;
	}

	public void setTextname(String textname) {
		this.textname = textname;
	}
	

	public boolean getAnimation() {
		return animation;
	}

	public void setAnimation(boolean animation) {
		this.animation = animation;
	}
	

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	
	public String getAnimateTime() {
		return animateTime;
	}

	public void setAnimateTime(String animatTime) {
		this.animateTime = animatTime;
	}

	public String getReferenceTarget() {
		return referenceTarget;
	}

	public void setReferenceTarget(String referenceTarget) {
		this.referenceTarget = referenceTarget;
	}

}
