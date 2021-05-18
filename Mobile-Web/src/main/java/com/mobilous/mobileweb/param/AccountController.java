package com.mobilous.mobileweb.param;

import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.etc.Condition;
import com.mobilous.mobileweb.util.Utility;

public class AccountController implements Parameters {

	private String pageName = "";
	private String method = "";
	private String username = "";
	private String userID = "";
	private Condition condition = null;

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

	public AccountController(String method) {
		this.method = method;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
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
