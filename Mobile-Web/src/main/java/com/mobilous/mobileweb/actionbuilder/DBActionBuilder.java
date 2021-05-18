package com.mobilous.mobileweb.actionbuilder;

import com.mobilous.mobileweb.action.Action;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.param.DBController;
import com.mobilous.mobileweb.ui.BaseView;

public class DBActionBuilder {

	public static Object build(GenApp genapp, BaseView baseview, Event event,
			Action action) {
		StringBuilder actionstr = new StringBuilder();
		DBController dbController = (DBController) action.getParameters();
		StringBuilder applyConditionIfAny = new StringBuilder();
		if (dbController.getCondition() != null) {
			applyConditionIfAny.append(ConditionBuilder.setCondition(
					dbController.getCondition(), baseview));
		}

		if (dbController.getMethod().equalsIgnoreCase("Insert")) {
			actionstr
					.append("{method:\"Insert\",category:\"DBAction\", params:{tablename:\"")
					.append(dbController.getTable())
					.append("\",record:" + dbController.getRecord())
					.append("}").append(applyConditionIfAny).append("},");

		} else if (dbController.getMethod().equalsIgnoreCase("Update")) {
			//System.out.println(dbController.getWhere());
			//System.out.println(dbController.getRecord());
			actionstr
					.append("{method:\"Update\",category:\"DBAction\", params:{tablename:\"")
					.append(dbController.getTable())
					.append("\",record:" + dbController.getRecord())
					.append(",where:\"" + dbController.getWhere())
					.append("\"}").append(applyConditionIfAny).append("},");
		} else if (dbController.getMethod().equalsIgnoreCase("Delete")) {
			actionstr
					.append("{method:\"Delete\",category:\"DBAction\", params:{tablename:\"")
					.append(dbController.getTable())
					.append("\",where:\"" + dbController.getWhere())
					.append("\"}").append(applyConditionIfAny).append("},");
		} else if (dbController.getMethod().equalsIgnoreCase("Select")) {
			actionstr
					.append("{method:\"LocalDBSelect\",category:\"DBAction\", params:{tablename:\"")
					.append(dbController.getTable())
					.append("\",where:\"" + dbController.getWhere() + "\"")
					.append(",order:\"" + dbController.getOrder())
					.append("\"}").append(applyConditionIfAny).append("},");
		}else if (dbController.getMethod().equalsIgnoreCase("NumRecords")) {
			actionstr
			.append("{method:\"NumRecords\",category:\"DBAction\", params:{tablename:\"")
			.append(dbController.getTable())
			.append("\",where:\"" + dbController.getWhere() + "\"")
			.append(",order:\"" + dbController.getOrder())
			.append("\"}").append(applyConditionIfAny).append("},");
		} else if (dbController.getMethod()
				.equalsIgnoreCase("deleteAllRecords")) {
			actionstr
			.append("{method:\"DeleteAll\",category:\"DBAction\", params:{tablename:\"")
			.append(dbController.getTable()).append("\"}")
			.append(applyConditionIfAny).append("},");
		}

		return actionstr;
	}

}
