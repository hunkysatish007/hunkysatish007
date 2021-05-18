package com.mobilous.mobileweb.app;

public class Fields extends TableDefs {

	private String fieldName = "";
	private String dbType = "";
	private boolean primaryKey = false;
	private boolean autoInc = false;
	private String defaultValue = null;
	public String getFieldName() {
		return fieldName;
	}

	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

	public String getDbType() {
		return dbType;
	}

	public void setDbType(String dbType) {
		if(dbType.equalsIgnoreCase("DATE"))
			dbType = "DATETIME";
		this.dbType = dbType;
	}

	public boolean isPrimaryKey() {
		return primaryKey;
	}

	public void setPrimaryKey(boolean primaryKey) {
		this.primaryKey = primaryKey;
	}

	public boolean isAutoInc() {
		return autoInc;
	}

	public void setAutoInc(boolean autoInc) {
		this.autoInc = autoInc;
	}

	@Override
	public String toString() {
		return "Fields [fieldName=" + fieldName + ", dbType=" + dbType
				+ ", primaryKey=" + primaryKey + ", autoInc=" + autoInc + "]";
	}

	public String getDefaultValue() {
		return defaultValue;
	}

	public void setDefaultValue(String defaultValue) {
		this.defaultValue = defaultValue;
	}

	// @Override
	// public String toString() {
	// StringBuffer sb = new StringBuffer();
	// sb.append("fieldname = ").append(fieldName).append('\n')
	// .append("dbtype = ").append(dbType).append('\n')
	// .append("primarykey = ").append(primaryKey).append('\n')
	// .append("autoinc = ").append(autoInc).append('\n');
	//
	// return sb.toString();
	// }
}
