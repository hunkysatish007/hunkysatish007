package com.mobilous.mobileweb.actionbuilder;

import com.mobilous.mobileweb.action.Action;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.param.NPEActionSheetButtonsController;
import com.mobilous.mobileweb.param.NPEActionSheetController;
import com.mobilous.mobileweb.ui.BaseView;

public class NPEWarningActionBuilder {

	public static Object build(GenApp genapp, BaseView baseview, Event event,
			Action action) {
		StringBuilder warningactionStr = new StringBuilder();
		NPEActionSheetController npeActionSheetController = (NPEActionSheetController) action
				.getParameters();
		StringBuilder applyConditionIfAny = new StringBuilder();

		if (npeActionSheetController.getCondition() != null) {
			applyConditionIfAny.append(ConditionBuilder.setCondition(
					npeActionSheetController.getCondition(), baseview));
		}

		if (npeActionSheetController.getMethod()
				.equalsIgnoreCase("ActionSheet")) {

			/*
			 * {method:"ActionSheet",category:"WarningAction",title:"Hiii",message
			 * :"",params:{ buttons:{ ButtonName_0:{ id:"B!",title:"B!",events:{
			 * Tap:[{method:"SetMainValue",category:"MainValue",
			 * name:'asdas',params:{value:"asdasd",targetpage:'page_360'}}]} ,},
			 * NoEvent_1:{id:"B2",title:"B2",events:{ Tap:[]}, },
			 * NoEvent_2:{id:"b3",title:"b3",events:{Tap:[]},},
			 * NoEvent_3:{id:"b4",title:"b4",events:{Tap:[]},},
			 * NoEvent_4:{id:"b5",title:"b5",events:{Tap:[]},},
			 * cancel_button:{id:"Cancel" , title:"Cancel",events:{}} }},
			 * 
			 * condition:{operator:' == ',value:'asdas',target:'asd'},events:{}}
			 */

			warningactionStr
					.append("{method:\"ActionSheet\",category:\"WarningAction\",");
			if (npeActionSheetController.getTitle() != null)
				warningactionStr.append("title:\""
						+ npeActionSheetController.getTitle().replaceAll("\"",
								" &quot") + "\",");
			else
				warningactionStr.append("title:\"Action Sheet\",");
			
			if (npeActionSheetController.getCancelTitle() != null)
				warningactionStr.append("cancelTitle:\""
						+ npeActionSheetController.getCancelTitle().replaceAll("\"",
								" &quot") + "\",");

			warningactionStr.append("params:{buttons:{");
			if (!npeActionSheetController.getOtherBtnTitles().isEmpty()) {
				int i = 0;
				for (NPEActionSheetButtonsController button : npeActionSheetController
						.getOtherBtnTitles()) {
					warningactionStr.append("Button_" + i).append(":{ id :\"")
							.append("Button_" + i).append("\", title:\"")
							.append(button.getButtonTitle() + "\",")
							.append("events:{Tap:[");
					if (!button.getEvent().isEmpty()) {
						for (Event event2 : button.getEvent()) {
							warningactionStr.append(ActionBuilder.makeAction(
									genapp, baseview, event2));
						}
					}
					warningactionStr.append("]},");
					warningactionStr.append("},");
					i++;
				}

			}
			warningactionStr.append("}}").append(applyConditionIfAny);
			warningactionStr.append("},");

		}

		return warningactionStr;
	}

}
