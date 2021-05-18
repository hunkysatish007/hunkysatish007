package com.mobilous.mobileweb.ui;

import java.util.ArrayList;

import com.mobilous.mobileweb.attribute.File;
import com.mobilous.mobileweb.event.Event;

public class Email extends BaseView {

	private String viewType = "Email";
	private String subject = "";
	private ArrayList<String> toRecipients = null;
	private ArrayList<String> ccRecipients = null;
	private ArrayList<String> bccRecipients = null;
	private String messageBody = "";
	private boolean htmlBody = false;
	private String attachmentFile = "";
	private String attachmentMimeType = "";
	private File attachmentData = null;
	private ArrayList<Event> event = null;

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
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

	public String getMessageBody() {
		return messageBody;
	}

	public void setMessageBody(String messageBody) {
		this.messageBody = messageBody;
	}

	public boolean isHtmlBody() {
		return htmlBody;
	}

	public void setHtmlBody(boolean htmlBody) {
		this.htmlBody = htmlBody;
	}

	public String getAttachmentFile() {
		return attachmentFile;
	}

	public void setAttachmentFile(String attachmentFile) {
		this.attachmentFile = attachmentFile;
	}

	public String getAttachmentMimeType() {
		return attachmentMimeType;
	}

	public void setAttachmentMimeType(String attachmentMimeType) {
		this.attachmentMimeType = attachmentMimeType;
	}

	public File getAttachmentData() {
		return attachmentData;
	}

	public void setAttachmentData(File attachmentData) {
		this.attachmentData = attachmentData;
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

}
