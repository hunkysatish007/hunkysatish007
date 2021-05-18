package com.mobilous.mobileweb.param;

import java.util.ArrayList;

import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.etc.Condition;

public class SystemController implements Parameters{
	
	private String method = "";
	private String command = "";
	private Condition condition = null;
	private String targetURL ="";
	private ArrayList<LoopList> intialList = new ArrayList<LoopList>();
	private ArrayList<LoopList> nextList = new ArrayList<LoopList>();
	private String loopCondition = new String();
	
	private String name = "";
	
	
	public SystemController(String method) {
		this.method = method;
	}
	
	@Override
	public void setMethod(String method) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getMethod() {
		// TODO Auto-generated method stub
		return this.method;
	}

	@Override
	public void setPageName(String pagename) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getPageName(GenApp genApp) {
		// TODO Auto-generated method stub
		return null;
	}

	public String getCommand() {
		return command;
	}

	public void setCommand(String command) {
		this.command = command;
	}
	
	public String getCallbackUI() {
		return name;
	}

	public void setCallbackUI(String name) {
		this.name = name;
	}

	public Condition getCondition() {
		return condition;
	}

	public void setCondition(Condition condition) {
		this.condition = condition;
	}

	public String getTargetURL() {
		return targetURL;
	}

	public void setTargetURL(String targetURL) {
		this.targetURL = targetURL;
	}

	public ArrayList<LoopList> getIntialList() {
		return intialList;
	}

	public void setIntialList(ArrayList<LoopList> intialList) {
		this.intialList = intialList;
	}

	public ArrayList<LoopList> getNextList() {
		return nextList;
	}

	public void setNextList(ArrayList<LoopList> nextList) {
		this.nextList = nextList;
	}

	public String getLoopCondition() {
		return loopCondition;
	}

	public void setLoopCondition(String string) {
		this.loopCondition = string;
	}


}
