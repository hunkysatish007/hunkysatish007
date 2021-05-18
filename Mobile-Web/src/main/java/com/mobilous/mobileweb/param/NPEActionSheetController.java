package com.mobilous.mobileweb.param;

import java.util.ArrayList;

import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.etc.Condition;
import com.mobilous.mobileweb.util.Utility;

public class NPEActionSheetController implements Parameters {

	private String pageName = "";
	private String method = "";
	private String style = "";
	private String title = "";
	private String cancelTitle = "";
	private String destructiveButtonTitle = "";
	private ArrayList<NPEActionSheetButtonsController> otherBtnTitles = null;
	private Condition condition = null;

	public String getPageName(GenApp genApp) {
		return Utility.getDefFileIDByFilename(genApp, pageName);
	}

	public void setPageName(String pageName) {
		this.pageName = pageName;
	}

	public NPEActionSheetController(String method) {
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

	public ArrayList<NPEActionSheetButtonsController> getOtherBtnTitles() {
		return otherBtnTitles;
	}

	public void setOtherBtnTitles(
			ArrayList<NPEActionSheetButtonsController> otherBtnTitles) {
		this.otherBtnTitles = otherBtnTitles;
	}

	public Condition getCondition() {
		return condition;
	}

	public void setCondition(Condition condition) {
		this.condition = condition;
	}

	@Override
	public void setMethod(String method) {
		this.method = method;
	}

	@Override
	public String getMethod() {
		return method;
	}

}
