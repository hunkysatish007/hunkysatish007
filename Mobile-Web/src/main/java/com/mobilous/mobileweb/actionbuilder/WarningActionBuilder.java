package com.mobilous.mobileweb.actionbuilder;

import com.mobilous.mobileweb.action.Action;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.param.WarningController;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.uibuilder.ImageFileBuilder;

public class WarningActionBuilder {

	public static StringBuilder build(GenApp genapp, BaseView baseview,
			Event event, Action action) {
		StringBuilder warningactionStr = new StringBuilder();
		WarningController warningcontroller = (WarningController)action.getParameters();
		StringBuilder applyConditionIfAny = new StringBuilder();

		if (warningcontroller.getCondition() != null) {
			applyConditionIfAny.append(ConditionBuilder.setCondition(warningcontroller.getCondition(), baseview));  
		}
		// Tap:[{method:"StartWaitIndicator",category:"WarningAction",params:{message:'hello',timeout:10000}}
		if (warningcontroller.getMethod()
				.equalsIgnoreCase("StartWaitIndicator")) {
			
			StringBuilder indicatorFileStr = new StringBuilder();
			if(warningcontroller.getIndicatorFile()!=null){
			if(warningcontroller.getIndicatorFile().getFileName().contains("[") && warningcontroller.getIndicatorFile().getFileName().contains("]")){
				if(!warningcontroller.getIndicatorFile().getSrcLocation().equalsIgnoreCase("Remote")){
					if(warningcontroller.getIndicatorFile().getFileExt().equalsIgnoreCase("")){
						indicatorFileStr.append(warningcontroller.getIndicatorFile().getFileName());
					}else{
						indicatorFileStr.append(warningcontroller.getIndicatorFile().getFileName() + "." + warningcontroller.getIndicatorFile().getFileExt());
					}
				}else{
					indicatorFileStr.append(warningcontroller.getIndicatorFile().getFileName());
				}
			}else{
				indicatorFileStr.append(ImageFileBuilder.buildImageFile(genapp,warningcontroller.getIndicatorFile()));					
			}
			}
			
			warningactionStr.append("{method:\"StartWaitIndicator\",category:\"WarningAction\",")
					.append("params:{message:'")
					.append(warningcontroller.getMessage())
					.append("',timeout:\"")
					.append(warningcontroller.getTimeOut() + "\"")
					.append(",type:\"")
					.append(warningcontroller.getStyle()).append("\"");
			
			if(warningcontroller.getStyle().toLowerCase().equalsIgnoreCase("custom"))
				warningactionStr.append(",file:\"").append(indicatorFileStr).append("\"");
			
			warningactionStr.append("}")
					.append(applyConditionIfAny).append("},");
		}

		// Tap:[{method:"StopWaitIndicator",category:"WarningAction"}]
		if (warningcontroller.getMethod().equalsIgnoreCase("StopWaitIndicator")) {
			warningactionStr
					.append("{method:\"StopWaitIndicator\" ,category:\"WarningAction\"")
					.append(applyConditionIfAny).append("},");
		}

		// Tap:[{method:"StartWaitIndicator",category:"WarningAction",params:{message:'hello'}}]
		if (warningcontroller.getMethod().equalsIgnoreCase("Alert")) {
			warningactionStr
					.append("{method:\"Alert\",category:\"WarningAction\",type:\"")
					.append(warningcontroller.getStyle()).append("\",")
					.append("params:{message:'")
					.append(warningcontroller.getMessage().replaceAll("\n", "'nl9'").replaceAll("\"", "\'").replaceAll("\"",
							" &quot").replace("'","\\'"))
					.append("', title:'")
					.append(warningcontroller.getTitle().replaceAll("\"",
							" &quot")).append("', canceltitle:'");
			/*if (warningcontroller.getCancelTitle() == null
					|| warningcontroller.getCancelTitle().equalsIgnoreCase("")
					|| warningcontroller.getCancelTitle()
							.equalsIgnoreCase(null))
				warningactionStr.append("Cancel");
			else*/
				warningactionStr.append(warningcontroller.getCancelTitle()
						.replaceAll("\"", " &quot"));
			warningactionStr.append("'}").append(applyConditionIfAny)
					.append("},");
		}
		if (warningcontroller.getMethod().equalsIgnoreCase("Actionsheet")) {

			warningactionStr
					.append("{method:\"ActionSheet\",category:\"WarningAction\",");
			if (warningcontroller.getTitle() != null)
				warningactionStr.append("title:\""
						+ warningcontroller.getTitle().replaceAll("\"",
								" &quot") + "\",");
			else
				warningactionStr.append("title:\"Action Sheet\",");
			if (warningcontroller.getMessage() != null)
				warningactionStr.append("message:\""
						+ warningcontroller.getMessage() + "\",");
			else
				warningactionStr.append("message:\"\",");
			warningactionStr.append("params:{buttons:{");
			int i = 0;
			if (!warningcontroller.getOtherBtnTitles().isEmpty()) {

				for (String button : warningcontroller.getOtherBtnTitles()) {
					if (action.getEvent() != null) {
						if (action.getEvent().size() > i) {
							warningactionStr.append(action.getEvent().get(i)
									.getEventName().replace("-", "_")
									+ ":{");

						} else
							warningactionStr.append("NoEvent_" + i + ":{");
					} else
						warningactionStr.append("NoEvent_" + i + ":{");
					warningactionStr.append("id:\"" + button.replace(' ', '_')
							+ "\",");
					warningactionStr.append("title:\"" + button + "\",");
					warningactionStr.append("events:{Tap:[");
					if (action.getEvent() != null) {

						for (Event event2 : action.getEvent()) {

							if (event2.getEventName().equalsIgnoreCase(
									"ButtonName-" + i))
								warningactionStr.append(ActionBuilder
										.makeAction(genapp, baseview, event2));

						}
					}
					warningactionStr.append("]},");
					warningactionStr.append("},");
					i++;
				}

			}
			if (warningcontroller.getCancelTitle() != null)
				if (!warningcontroller.getCancelTitle().equalsIgnoreCase("")) {
					warningactionStr.append("cancel_button:{id:\"").append(
							warningcontroller.getCancelTitle().trim()
									+ "\" , title:\""
									+ warningcontroller.getCancelTitle()
									+ "\",");
					warningactionStr.append("events:{}}");
				}
			// else
			// warningactionStr.append("cancel_button:{id:\"").append("\"cancel_01\" , title:\"\",");

			warningactionStr.append("}").append("}")
					.append(applyConditionIfAny).append("},");
			;

		}
		
		// Tap:[{method:"ShowDialog",category:"WarningAction"}]
		if (warningcontroller.getMethod().equalsIgnoreCase("ShowDialog")) {
			warningactionStr
					.append("{method:\"ShowDialog\" ,category:\"WarningAction\"")
					.append(",name:\"")
					.append(warningcontroller.getName())
					.append("\"")
					.append(applyConditionIfAny).append("},");
		}
		
		// Tap:[{method:"HideDialog",category:"WarningAction"}]
		if (warningcontroller.getMethod().equalsIgnoreCase("HideDialog")) {
			warningactionStr
					.append("{method:\"HideDialog\" ,category:\"WarningAction\"")
					.append(",name:\"")
					.append(warningcontroller.getName())
					.append("\"")
					.append(applyConditionIfAny).append("},");
		}

		return warningactionStr;

	}
}
