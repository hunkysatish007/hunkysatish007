package com.mobilous.mobileweb.util;
//package com.dvox.mobilegen.util;
//
//import java.util.ArrayList;
//import org.json.simple.JSONArray;
//import org.json.simple.JSONObject;
//
//import com.dvox.mobilegen.app.Fields;
//import com.dvox.mobilegen.app.GenApp;
//import com.dvox.mobilegen.app.TableDefs;
//
//public class RemoteCSVReader {
//
//	public static StringBuffer build(ArrayList<TableDefs> tableDefList,
//			GenApp genapp, StringBuffer action) {
//		JSONObject serverdata = new JSONObject();
//
//		if (tableDefList != null) {
//
//			// getJSON("http://210.189.125.252:8080/mobilewebgen/mobile/mato/410/getlocalization?preview=true");
//
//			if (tableDefList.size() > 0) {
//				// create a database
//				StringBuilder dbName = new StringBuilder("db_").append(genapp
//						.getProjectId());
//				if (genapp.isPreview())
//					dbName.append("_test");
//
//				action.append("\n\tif(window.openDatabase){")
//						.append("\n\t\tvar dbRecords = [];")
//						.append("\n\t\tcreateDatabase('").append(dbName)
//						.append("',2);\n"); // TODO: change the database size if
//											// necessary
//
//				for (TableDefs tableDef : tableDefList) {
//
//					JSONObject schema = new JSONObject();
//					schema.put("filename", tableDef.getCsvfilename());
//					schema.put("tablename", tableDef.getTableName());
//					schema.put("status", false);
//					schema.put("value", "");
//
//					JSONArray fields = new JSONArray();
//					// create table schemas
//					for (Fields field : tableDef.getFields()) {
//						JSONObject colschema = new JSONObject();
//						colschema.put("name", field.getFieldName());
//						colschema.put("type", field.getDbType());
//						colschema.put("autoinc", field.isAutoInc());
//						colschema.put("pk", field.isPrimaryKey());// value will
//																	// be
//																	// updated
//																	// by the
//																	// servlet
//						fields.add(colschema);
//					}
//					schema.put("fields", fields);
//
//					serverdata.put("schema", schema);
//				}
//
//				action.append("\n\t\trequestCSVData(\"")
//						.append(genapp.getBaseURL().replace("/appexe/",
//								":8080/mobilewebgen/mobile/"))
//						.append(genapp.getUserId()).append("/")
//						.append(genapp.getProjectId()).append("/getcsvdata?")
//						.append("preview=").append(genapp.isPreview())
//						.append("&dbdata=\",dbRecords);").append("\n\t}else{")
//						.append("\n\t\tinitializeApp(").append("localeURL")
//						.append(");\n\t\tbrowserNotSupported();")
//						.append("\n\t}");
//			} else
//				action.append("\n\t\tinitializeApp(").append("'default'")
//						.append(")");
//		}
//		return action;
//	}
//
//}
