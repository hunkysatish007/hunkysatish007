package com.mobilous.mobileweb.param;

import java.util.ArrayList;

import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.attribute.ImageFile;
import com.mobilous.mobileweb.etc.Condition;
import com.mobilous.mobileweb.util.Utility;

public class WarningController implements Parameters {

	private String pageName = "";
	private String method = "";
	private String style = "";
	private String title = "";
	private String message = "";
	private String cancelTitle = "";
	private String destructiveButtonTitle = "";
	private ArrayList<String> otherBtnTitles = null;
	private String timeOut = "-1";
	private Condition condition = null;
	
	private ImageFile indicator = null;
	private String name = "";

	public String getPageName(GenApp genApp) {
		return Utility.getDefFileIDByFilename(genApp, pageName);
	}

	public void setPageName(String pageName) {
		this.pageName = pageName;
	}

	public Condition getCondition() {
		return condition;
	}

	public void setCondition(Condition condition) {
		this.condition = condition;
	}

	public WarningController(String method) {
		this.method = method;
	}

	public String getStyle() {
		return style;
	}

	public void setStyle(String style) {
		this.style = style;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getCancelTitle() {
		return cancelTitle;
	}

	public void setCancelTitle(String cancelTitle) {
		this.cancelTitle = cancelTitle;
	}

	public String getDestructiveButtonTitle() {
		return destructiveButtonTitle;
	}

	public void setDestructiveButtonTitle(String destructiveButtonTitle) {
		this.destructiveButtonTitle = destructiveButtonTitle;
	}

	public ArrayList<String> getOtherBtnTitles() {
		return otherBtnTitles;
	}

	public void setOtherBtnTitles(ArrayList<String> otherBtnTitles) {
		this.otherBtnTitles = otherBtnTitles;
	}

	public String getTimeOut() {
		return timeOut;
	}

	public void setTimeOut(String timeOut) {
		this.timeOut = timeOut;
	}

	@Override
	public void setMethod(String method) {
		this.method = method;
	}

	@Override
	public String getMethod() {
		return method;
	}

	public ImageFile getIndicatorFile() {
		return indicator;
	}

	public void setIndicatorFile(ImageFile indicator) {
		this.indicator = indicator;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
