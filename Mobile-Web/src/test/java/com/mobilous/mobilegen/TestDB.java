package com.mobilous.mobilegen;
//package com.dvox.mobilegen;
//
//import java.util.ArrayList;
//
//import org.junit.Test;
//
//import com.dvox.mobilegen.app.Fields;
//import com.dvox.mobilegen.app.TableDefs;
//import com.dvox.mobilegen.uibuilder.DatabaseBuilder;
//
//public class TestDB {
//
//	@Test
//	public void testTableDefRenderer() {
//		ArrayList<TableDefs> list = new ArrayList<TableDefs>();
//		String[] columns1 = { "firstname", "surname", "age", "height",
//				"weight", "blood_type" };
//		list.add(makeTablDefs("people", columns1));
//
//		String[] columns2 = { "make", "model", "color", "year" };
//		list.add(makeTablDefs("cars", columns2));
//
//		String[] columns3 = { "animal", "name", "color" };
//		list.add(makeTablDefs("pets", columns3));
//
//		System.out.println(DatabaseBuilder.getDBBuildScript(list));
//
//	}
//
//	private TableDefs makeTablDefs(String name, String[] fieldNames) {
//		TableDefs defs = new TableDefs();
//		defs.setTableName(name);
//		defs.setDescription("my first " + name + " table");
//		ArrayList<Fields> fields = new ArrayList<Fields>();
//
//		Fields f1 = new Fields();
//		f1.setAutoInc(true);
//		f1.setFieldName("id");
//		f1.setPrimaryKey(true);
//		f1.setDbType("int");
//
//		fields.add(f1);
//		for (String fname : fieldNames) {
//			fields.add(makeFields(fname));
//		}
//
//		defs.setFields(fields);
//		return defs;
//	}
//
//	private Fields makeFields(String name) {
//		Fields f1 = new Fields();
//		f1.setFieldName(name);
//		f1.setDbType("String");
//		return f1;
//	}
//}
