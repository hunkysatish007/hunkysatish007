package com.mobilous.mobileweb.app;

import java.util.ArrayList;

public class TableDefs extends MainFile {

	private String csvfilename = "";
	private String tableName = "";
	private String description = "";
	private ArrayList<Fields> fields = null;
	
	private boolean view = false;
	private String viewScript = "";
	
	private boolean trigger = false;
	private String triggerName = "";
	private String triggerScript = "";

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public ArrayList<Fields> getFields() {
		return fields;
	}

	public void setFields(ArrayList<Fields> fields) {
		this.fields = fields;
	}

	public String getCsvfilename() {
		return csvfilename;
	}

	public void setCsvfilename(String csvfilename) {
		this.csvfilename = csvfilename;
	}

	public boolean isView() {
		return view;
	}

	public void setView(boolean view) {
		this.view = view;
	}

	public String getViewScript() {
		return viewScript;
	}

	public void setViewScript(String viewScript) {
		this.viewScript = viewScript;
	}

	public boolean isTrigger() {
		return trigger;
	}

	public void setTrigger(boolean trigger) {
		this.trigger = trigger;
	}

	public String getTriggerName() {
		return triggerName;
	}

	public void setTriggerName(String triggerName) {
		this.triggerName = triggerName;
	}

	public String getTriggerScript() {
		return triggerScript;
	}

	public void setTriggerScript(String triggerScript) {
		this.triggerScript = triggerScript;
	}

	@Override
	public String toString() {
		return "TableDefs [tableName=" + tableName + ", description="
				+ description + ", fields=" + fields + "]";
	}

	
	// public String toString() {
	// StringBuffer sb = new StringBuffer();
	// sb.append("tableName = ").append(tableName).append('\n')
	// .append("description = ").append(description).append('\n');
	// if(fields.size()>0){
	// sb.append("fields:").append('\n');
	// for(Fields uiobj: fields)
	// sb.append(uiobj.toString()).append('\n');
	// }
	//
	// return sb.toString();
	// }
}
