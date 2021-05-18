package com.mobilous.mobileweb.controller;

public class GoogleController {
	
	private String api_key = "";
	private String client_id = "";
	private String contact_scope = "";
	private String calendar_scope = "";
	private String redirect_uri = "";
	private String client_secret = "";
	
	
	public String getApi_key() {
		return api_key;
	}
	public void setApi_key(String api_key) {
		this.api_key = api_key;
	}
	
	public String getClient_id() {
		return client_id;
	}
	public void setClient_id(String client_id) {
		this.client_id = client_id;
	}
	
	public String getRedirect_uri() {
		return redirect_uri;
	}
	public void setRedirect_uri(String redirect_uri) {
		this.redirect_uri = redirect_uri;
	}
	
	public String getClient_secret() {
		return client_secret;
	}
	public void setClient_secret(String client_secret) {
		this.client_secret = client_secret;
	}
	public String getContact_scope() {
		return contact_scope;
	}
	public void setContact_scope(String contact_scope) {
		this.contact_scope = contact_scope;
	}
	public String getCalendar_scope() {
		return calendar_scope;
	}
	public void setCalendar_scope(String calendar_scope) {
		this.calendar_scope = calendar_scope;
	}
	
	
	

}
