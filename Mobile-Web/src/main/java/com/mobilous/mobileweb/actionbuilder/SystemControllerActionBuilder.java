package com.mobilous.mobileweb.actionbuilder;

import com.mobilous.mobileweb.action.Action;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.param.LoopList;
import com.mobilous.mobileweb.param.SystemController;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.util.Utility;

public class SystemControllerActionBuilder {

	public static StringBuilder build(GenApp genapp, BaseView baseview, Event event, Action action){
		
		StringBuilder actionstr=new StringBuilder();
		SystemController systemController = (SystemController) action.getParameters();
		
		// search for any Condition...
		StringBuilder applyConditionIfAny = new StringBuilder();
		if(systemController.getCondition() != null){
			applyConditionIfAny.append(ConditionBuilder.setCondition(systemController.getCondition(), baseview));
		}
		
		if (systemController.getMethod().equalsIgnoreCase("CallExternalApp")) {
			actionstr.append("{method:\"CallExternalApp\",category:\"SystemController\"");
			if(systemController.getCallbackUI() == ""){
				actionstr.append(",params:{command:\"").append(systemController.getCommand()).append("\"").append("}");
			}
			else{
				actionstr.append(",params:{command:\"").append(systemController.getCommand()).append("\",")
				.append("name:\"").append(systemController.getCallbackUI()).append("\"").append("}");
			}
			actionstr.append(applyConditionIfAny)
			.append("},");
		}
		
		if(systemController.getMethod().equalsIgnoreCase("NetworkAvailable")) {
			actionstr.append("{method:\"NetworkAvailable\",category:\"SystemController\"")
			.append(",params:{targetURL:\"").append(systemController.getTargetURL()).append("\"").append("}")
			.append(applyConditionIfAny)
			.append("},");
		}
		
		if(systemController.getMethod().equalsIgnoreCase("loop")) {
			StringBuilder initialList = new StringBuilder();
			StringBuilder nextList = new StringBuilder();
			for(LoopList array : systemController.getIntialList()){
				initialList.append(array.getKey()).append("=");
				initialList.append(array.getValue()).append(",");
				
			}
			Utility.removeCommaFromLast(initialList);
			for(LoopList array : systemController.getNextList()){
				nextList.append(array.getKey()).append("=");
				nextList.append(array.getValue()).append(",");
			}
			
			Utility.removeCommaFromLast(nextList);
			
			
			
			actionstr.append("{method:\"loop\",category:\"SystemController\"")
			.append(",params:{initials:\"").append(initialList)
			.append("\", nextList:\"").append(nextList)
			.append("\", condition:\"").append(systemController.getLoopCondition()).append("\"")
			.append("}")
			.append(applyConditionIfAny)
			.append("},");
		}
		
		return actionstr;
		
	}
}
