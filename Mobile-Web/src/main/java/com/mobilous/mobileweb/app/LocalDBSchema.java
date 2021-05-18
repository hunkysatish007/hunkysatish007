
//Generate schema of the database table
package com.mobilous.mobileweb.app;

import com.mobilous.mobileweb.util.Utility;

public class LocalDBSchema{
	
	public static StringBuilder build(GenApp genapp){
		StringBuilder jsonString = new StringBuilder();
			for(TableDefs table : genapp.getMainFile().getTableDefs()){
				if(!table.isView()){
					jsonString.append("{");
					jsonString.append("status:").append(table.isCommserverAccess()).append(",")
						.append("tablename:\"").append(table.getTableName()).append("\",")
						.append("value:\"").append("\",")
						.append("filename:\"").append(table.getCsvfilename()).append("\",")
						.append("fields:[").append("\n\t").append(getFields(table)).append("]");
					jsonString.append("},\n\t");
				}
			}
			
			
				
		return Utility.removeCommaFromLast(jsonString);
	}
	
	private static StringBuilder getFields(TableDefs table){
		StringBuilder content = new StringBuilder();
		for(Fields field : table.getFields()){
				content.append("{")
					.append("name:\"").append(field.getFieldName()).append("\",")
					.append("type:\"").append(field.getDbType()).append("\",")
					.append("autoinc:").append(field.isAutoInc()).append(",");
				if(field.getDefaultValue() != null){
					content.append("defaultValue:\"").append(field.getDefaultValue()).append("\",");
				}
					
				content.append("pk:").append(field.isPrimaryKey()).append("")
				.append("},\n\t");
		}

		
		return 	Utility.removeCommaFromLast(content);
	}
	
	public static StringBuilder buildView(GenApp genapp){
		StringBuilder jsonString = new StringBuilder();
			for(TableDefs table : genapp.getMainFile().getTableDefs()){
				if(table.isView()){
					jsonString.append("{");
					jsonString.append("script:\"").append(table.getViewScript()).append("\"");
					jsonString.append("},\n\t");
				}
			}
		return Utility.removeCommaFromLast(jsonString);
	}
	
	public static StringBuilder buildTrigger(GenApp genapp){
		StringBuilder jsonString = new StringBuilder();
			for(TableDefs table : genapp.getMainFile().getTableDefs()){
				if(table.isTrigger()){
					jsonString.append("{");
					jsonString.append("triggername:\"").append(table.getTriggerName()).append("\",");
					jsonString.append("script:\"").append(table.getTriggerScript()).append("\"");
					jsonString.append("},\n\t");
				}
			}
		return Utility.removeCommaFromLast(jsonString);
	}
	
}