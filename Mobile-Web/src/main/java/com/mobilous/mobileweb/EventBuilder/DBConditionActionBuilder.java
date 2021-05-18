package com.mobilous.mobileweb.EventBuilder;

import com.mobilous.mobileweb.action.Action;
import com.mobilous.mobileweb.actionbuilder.ConditionBuilder;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.param.DBConditionController;
import com.mobilous.mobileweb.ui.BaseView;

public class DBConditionActionBuilder {
	public static StringBuilder buildEvent(GenApp genApp, BaseView baseView,
			Event event, Action action) {
		StringBuilder dbConditionScript = new StringBuilder();
		StringBuilder applyConditionIfAny = new StringBuilder();
		
		DBConditionController dbConditionController = (DBConditionController) action
				.getParameters();
		if (dbConditionController.getCondition() != null) {
			applyConditionIfAny.append(ConditionBuilder.setCondition(
					dbConditionController.getCondition(), baseView));
		}
		if (dbConditionController.getMethod().equalsIgnoreCase("changeCondition")) {

			dbConditionScript
					.append("{method:\"changeCondition\",category:\"DBCondition\",")
					.append("name:\"" + dbConditionController.getName()
							+ "\",")
					.append("params:{")
					.append("where:\"" + dbConditionController.getWhere()
							+ "\",")
					.append("order:\"" + dbConditionController.getOrder()
							+ "\",")
					.append("targetpage:\""
							+ dbConditionController.getPageName() + "\",")
							.append("}").append(applyConditionIfAny).append("},");
		}else if (dbConditionController.getMethod().equalsIgnoreCase("changeRemoteCondition")) {

			dbConditionScript
					.append("{method:\"changeCondition\",category:\"DBCondition\",")
					.append("name:\"" + dbConditionController.getName()
							+ "\",")
					.append("params:{")
					.append("where:\"" + dbConditionController.getWhere()
							+ "\",")
					.append("order:\"" + dbConditionController.getOrder()
							+ "\",")
					.append("targetpage:\""
							+ dbConditionController.getPageName() + "\",")
					.append("}").append(applyConditionIfAny).append("},");
		}
		return dbConditionScript;
	}
}
