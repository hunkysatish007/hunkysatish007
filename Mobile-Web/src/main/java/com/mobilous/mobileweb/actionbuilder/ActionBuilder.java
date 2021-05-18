package com.mobilous.mobileweb.actionbuilder;

import com.mobilous.mobileweb.EventBuilder.DBConditionActionBuilder;
import com.mobilous.mobileweb.action.Action;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.param.CalendarController;
import com.mobilous.mobileweb.param.ComController;
import com.mobilous.mobileweb.param.ContactController;
import com.mobilous.mobileweb.param.DBConditionController;
import com.mobilous.mobileweb.param.DBController;
import com.mobilous.mobileweb.param.EmailController;
import com.mobilous.mobileweb.param.MapController;
import com.mobilous.mobileweb.param.MediaController;
import com.mobilous.mobileweb.param.NPEActionSheetController;
import com.mobilous.mobileweb.param.PageController;
import com.mobilous.mobileweb.param.PushNotificationController;
import com.mobilous.mobileweb.param.SensorController;
import com.mobilous.mobileweb.param.SystemController;
import com.mobilous.mobileweb.param.UIObjectController;
import com.mobilous.mobileweb.param.WarningController;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.util.Utility;

public class ActionBuilder {

	public static StringBuilder buildAction(GenApp genapp, BaseView baseview,
			Event event) {
		StringBuilder eventScript = new StringBuilder();
		if (event.getEventName().equalsIgnoreCase("Clicked")
				|| event.getEventName().equalsIgnoreCase(
						"didSelectRowAtIndexPath")
				|| event.getEventName().equalsIgnoreCase(
						"accessoryButtonTappedForRowWithIndexPath")) {
			eventScript.append("Tap:[");
			eventScript.append(makeAction(genapp, baseview, event));
			eventScript.append("],");
		}else if (event.getEventName().equalsIgnoreCase("didFinishPickingMedia")){
			eventScript.append("OnPicking:[");
			eventScript.append(makeAction(genapp, baseview, event));
			eventScript.append("],");
			
		}else if (event.getEventName().equalsIgnoreCase("flick")){
			eventScript.append("flick:[");
			eventScript.append(makeAction(genapp, baseview, event));
			eventScript.append("],");
			
		}else if (event.getEventName().equalsIgnoreCase("flickLR")){
			eventScript.append("flickLR:[");
			eventScript.append(makeAction(genapp, baseview, event));
			eventScript.append("],");
			
		}else if (event.getEventName().equalsIgnoreCase("flickRL")){
			eventScript.append("flickRL:[");
			eventScript.append(makeAction(genapp, baseview, event));
			eventScript.append("],");
			
		}else if (event.getEventName().equalsIgnoreCase("applicationDidEnterBackground")){
			eventScript.append("EnterBackground:[");
			eventScript.append(makeAction(genapp, baseview, event));
			eventScript.append("],");
			
		}

		return eventScript;//Utility.removeCommaFromLast(eventScript);
	}

	public static StringBuilder makeAction(GenApp genapp, BaseView baseview,
			Event event) {
		StringBuilder script = new StringBuilder();
		for (Action action : event.getAction()) {
			if (action.getParameters() instanceof UIObjectController)
				script.append(UIObjectActionBuilder.build(genapp, baseview,
						event, action));
			else if (action.getParameters() instanceof PageController)
				script.append(PageActionBuilder.build(genapp, baseview, event,
						action));
			else if (action.getParameters() instanceof WarningController)
				script.append(WarningActionBuilder.build(genapp, baseview,
						event, action));
			else if (action.getParameters() instanceof NPEActionSheetController)
				script.append(NPEWarningActionBuilder.build(genapp, baseview,
						event, action));
			else if (action.getParameters() instanceof EmailController)
				script.append(EmailActionBuilder.build(genapp, baseview, event,
						action));
			else if (action.getParameters() instanceof MediaController)
				script.append(MediaActionBuilder.build(genapp, baseview, event,
						action));
			else if (action.getParameters() instanceof DBController)
				script.append(DBActionBuilder.build(genapp, baseview, event,
						action));
			else if (action.getParameters() instanceof ComController)
				script.append(ComActionBuilder.build(genapp, baseview, event,
						action));
			else if (action.getParameters() instanceof MapController)
				script.append(GoogleMapActionBuilder.build(genapp, baseview,
						event, action));
			else if (action.getParameters() instanceof SensorController)
				script.append(SensorActionBuilder.build(genapp, baseview,event, action));
			else if (action.getParameters() instanceof ContactController)
				script.append(GoogleContactActionBuilder.build(genapp,
						baseview, event, action));
			else if (action.getParameters() instanceof CalendarController)
				script.append(GoogleCalendarActionBuilder.build(genapp,
						baseview, event, action));
			else if (action.getParameters() instanceof DBConditionController)
				script.append(DBConditionActionBuilder.buildEvent(genapp,
						baseview, event, action));
			else if (action.getParameters() instanceof SystemController)
				script.append(SystemControllerActionBuilder.build(genapp,baseview, event, action));
			else if (action.getParameters() instanceof PushNotificationController)
				script.append(PushNotificationActionBuilder.build(genapp,baseview, event, action));
			
			if ((action.getParameters() == null) || (script.length() < 1)) {
				script.append(nonSupportedActionBuilder.build(genapp, baseview,
						event, action));
			}
			if (action.getEvent() != null) {
				try{
					// remove "}" from end to put success or error event.
					int i = script.lastIndexOf("}");
					script.deleteCharAt(i);
					script.append(OnSuccessOrOnErrorBuilder.build(genapp, baseview,
							event, action));
					// add "}" to complete the action.
					script.append("},");
					script.deleteCharAt(script.lastIndexOf("}"));
				}catch(Exception e){
					// Do Nothing-- Handling String index out of range: -1
				}
				
			}
			
			if(baseview != null){
				script.append("actionParentUI:\""+ baseview.getParentUI()+"\",");
				script.append("actionParentUIName:\""+ baseview.getParentUIName()+"\"},");
			}else{
				script.append("actionParentUI:\"Page\",");
				script.append("actionParentUIName:\"\"},");
			}
			

		}

		return Utility.removeCommaFromLast(script);
	}
}
