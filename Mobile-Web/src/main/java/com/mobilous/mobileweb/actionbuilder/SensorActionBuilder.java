package com.mobilous.mobileweb.actionbuilder;

import com.mobilous.mobileweb.action.Action;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.param.SensorController;
import com.mobilous.mobileweb.ui.BaseView;

public class SensorActionBuilder {

	public static Object build(GenApp genapp, BaseView baseview, Event event,
			Action action) {
		StringBuilder sensorActionScript = new StringBuilder();
		SensorController sensorController = (SensorController) action.getParameters();
		StringBuilder applyConditionIfAny = new StringBuilder();
		
		if(sensorController.getCondition() != null){
			applyConditionIfAny.append(ConditionBuilder.setCondition(sensorController.getCondition(), baseview));
		}
		
		if (sensorController.getMethod().equalsIgnoreCase("startTimer")) {
			sensorActionScript
			.append("{method:\"startTimer\",category:\"SensorAction\",")
			.append("params:{timerName:'")
			.append(sensorController.getName())
			.append("',interval:'")
			.append(sensorController.getInterval())
			.append("',repeat:")
			.append(sensorController.isRepeat())
			.append("}")
			.append(applyConditionIfAny)
			.append("},");
		}else 	if (sensorController.getMethod().equalsIgnoreCase("stopTimer")) {
			sensorActionScript
			.append("{method:\"stopTimer\",category:\"SensorAction\",")
			.append("params:{timerName:'")
			.append(sensorController.getName())
			.append("'}")
			.append(applyConditionIfAny)
			.append("},");
		}
		return sensorActionScript;
	}

}
