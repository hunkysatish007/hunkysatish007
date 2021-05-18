package com.mobilous.mobileweb.param;

import java.util.ArrayList;
import org.json.simple.JSONObject;

import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.app.Fields;
import com.mobilous.mobileweb.attribute.File;
import com.mobilous.mobileweb.etc.Condition;
import com.mobilous.mobileweb.util.Utility;

public class ComController implements Parameters {

	private String pageName = "";
	private String method = "";
	private JSONObject dataset = null;
	private JSONObject fromDatasetSynchDB = null; // This param is only used for
													// Synchronize DB Action
	private JSONObject toDatasetSynchDB = null; // This param is only used for
												// Synchronize DB Action
	// private Record record = null;
	// private String url = "";
	// private String fileName = "";
	// private String packageName = "";
	private Condition condition = null;
	private File file = null;
	private ArrayList<Fields> resultFields = null;

	public String getPageName(GenApp genApp) {
		return Utility.getDefFileIDByFilename(genApp, pageName);
	}

	public void setPageName(String pageName) {
		this.pageName = pageName;
	}

	public Condition getCondition() {
		return condition;
	}

	public JSONObject getDataset() {
		return dataset;
	}

	public void setDataset(JSONObject dataset) {
		this.dataset = dataset;
	}

	public void setCondition(Condition condition) {
		this.condition = condition;
	}

	public ComController(String method) {
		this.method = method;
	}

	public JSONObject getFromDatasetSynchDB() {
		return fromDatasetSynchDB;
	}

	public void setFromDatasetSynchDB(JSONObject fromDatasetSynchDB) {
		this.fromDatasetSynchDB = fromDatasetSynchDB;
	}

	public JSONObject getToDatasetSynchDB() {
		return toDatasetSynchDB;
	}

	public void setToDatasetSynchDB(JSONObject toDatasetSynchDB) {
		this.toDatasetSynchDB = toDatasetSynchDB;
	}

	// public Record getRecord() {
	// return record;
	// }
	// public void setRecord(Record record) {
	// this.record = record;
	// }
	// public String getUrl() {
	// return url;
	// }
	// public void setUrl(String url) {
	// this.url = url;
	// }
	// public String getFileName() {
	// return fileName;
	// }
	// public void setFileName(String fileName) {
	// this.fileName = fileName;
	// }
	// public String getPackage() {
	// return packageName;
	// }
	// public void setPackage(String packageName) {
	// this.packageName = packageName;
	// }
	@Override
	public void setMethod(String method) {
		this.method = method;
	}

	@Override
	public String getMethod() {
		return method;
	}

	public File getFile() {
		return file;
	}

	public void setFile(File file) {
		this.file = file;
	}
	
	public ArrayList<Fields> getResultFields() {
		return resultFields;
	}

	public void setResultFields(ArrayList<Fields> resultFields) {      
		this.resultFields = resultFields;
	}
}
