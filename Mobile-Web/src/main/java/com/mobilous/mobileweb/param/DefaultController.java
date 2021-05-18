package com.mobilous.mobileweb.param;

import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.etc.Condition;
import com.mobilous.mobileweb.util.Utility;

public class DefaultController implements Parameters {

	private String pageName = "";
	private String method = "";

	// for toggle button
	private String selectedTitle = "";
	private String normalTitle = "";
	private Condition condition = null;
	private String selectedImage = null;
	private String normalImage = null;

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

	public DefaultController(String method) {
		this.method = method;
	}

	public String getSelectedTitle() {
		return selectedTitle;
	}

	public void setSelectedTitle(String selectedTitle) {
		this.selectedTitle = selectedTitle;
	}

	public String getNormalTitle() {
		return normalTitle;
	}

	public void setNormalTitle(String normalTitle) {
		this.normalTitle = normalTitle;
	}

	public String getNormalImage() {
		return normalImage;
	}

	public void setNormalImage(String normalImage) {
		this.normalImage = normalImage;
	}

	public String getSelectedImage() {
		return selectedImage;
	}

	public void setSelectedImage(String selectedImage) {
		this.selectedImage = selectedImage;
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
