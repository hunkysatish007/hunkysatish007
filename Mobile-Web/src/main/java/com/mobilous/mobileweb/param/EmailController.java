package com.mobilous.mobileweb.param;

import java.util.ArrayList;

import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.etc.Condition;
import com.mobilous.mobileweb.util.Utility;

public class EmailController implements Parameters {

	private String pageName = "";
	private ArrayList<String> toRecipients;
	private ArrayList<String> ccRecipients;
	private ArrayList<String> bccRecipients;
	private String subject;
	private String messageBody;
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

	private String method;

	public EmailController(String method) {
		this.method = method;
	}

	@Override
	public void setMethod(String method) {
		this.method = method;
	}

	@Override
	public String getMethod() {
		return this.method;
	}

	public ArrayList<String> getToRecipients() {
		return toRecipients;
	}

	public void setToRecipients(ArrayList<String> toRecipients) {
		this.toRecipients = toRecipients;
	}

	public ArrayList<String> getCcRecipients() {
		return ccRecipients;
	}

	public void setCcRecipients(ArrayList<String> ccRecipients) {
		this.ccRecipients = ccRecipients;
	}

	public ArrayList<String> getBccRecipients() {
		return bccRecipients;
	}

	public void setBccRecipients(ArrayList<String> bccRecipients) {
		this.bccRecipients = bccRecipients;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getMessageBody() {
		return messageBody;
	}

	public void setMessageBody(String messageBody) {
		this.messageBody = messageBody;
	}

}
