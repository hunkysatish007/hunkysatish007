package com.mobilous.mobileweb.app;

import com.mobilous.mobileweb.util.Utility;

public class RemoteDBSchema {
	
	public static StringBuilder build(GenApp genapp){
		StringBuilder jsonString = new StringBuilder();
			for(TableDefs table : genapp.getMainFile().getRemoteTblDefs()){
				jsonString.append("{");
				if(table.isView()){
					jsonString.append("view:\"").append("true").append("\",");
				}
				jsonString.append("status:").append(table.isCommserverAccess()).append(",")
					.append("tablename:\"").append(table.getTableName()).append("\",")
					.append("value:\"").append("\",")
					.append("filename:\"").append(table.getCsvfilename()).append("\",")
					.append("fields:[").append("\n\t").append(getFields(table)).append("]");
				jsonString.append("},\n\t");
			}
			
			
				
		return Utility.removeCommaFromLast(jsonString);
	}
	
	private static StringBuilder getFields(TableDefs table){
		StringBuilder content = new StringBuilder();
		if(table.getFields() == null)
 		{
 			return content;
 		}
		for(Fields field : table.getFields()){
			content.append("{")
				.append("name:\"").append(field.getFieldName()).append("\",");
			
			if(field.getDbType().contains("\"")) {
				field.setDbType(field.getDbType().replaceAll("\"", ""));
			}
			
			content.append("type:\"").append(field.getDbType()).append("\",")
				.append("autoinc:").append(field.isAutoInc()).append(",");
			if(field.getDefaultValue() != null){
 				content.append("defaultValue:\"").append(field.getDefaultValue()).append("\",");
 			}
 			content.append("pk:").append(field.isPrimaryKey()).append("")
			    	.append("},\n\t");
		}
		
	
		return (content.lastIndexOf(",") != -1) ? content.deleteCharAt(content.lastIndexOf(",")) : content;
	}
	

	

}
