package com.mobilous.mobileweb.actionbuilder;

import com.mobilous.mobileweb.action.Action;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.param.PushNotificationController;
import com.mobilous.mobileweb.ui.BaseView;

public class PushNotificationActionBuilder {

	public static StringBuilder build(GenApp genapp, BaseView baseview,
			Event event, Action action) {
		StringBuilder pushNotificationActionStr = new StringBuilder();
		PushNotificationController pushNotificationcontroller = (PushNotificationController)action.getParameters();
		StringBuilder applyConditionIfAny = new StringBuilder();

		if (pushNotificationcontroller.getCondition() != null) {
			applyConditionIfAny.append(ConditionBuilder.setCondition(pushNotificationcontroller.getCondition(), baseview));  
		}
		if (pushNotificationcontroller.getMethod()
				.equalsIgnoreCase("RegisterUsersForPushNotification")) {
						
			pushNotificationActionStr.append("{method:\"RegisterUsersForPushNotification\",category:\"SendPushNotificationAction\",")
					.append("params:{UserId:'")
					.append(pushNotificationcontroller.getUserId())
					.append("',ClientID:\"")
					.append(pushNotificationcontroller.getClientId() + "\"")
					.append(",Group:\"")
					.append(pushNotificationcontroller.getGroup()).append("\"");
			
			pushNotificationActionStr.append("}")
					.append(applyConditionIfAny).append("},");
		}

		if (pushNotificationcontroller.getMethod().equalsIgnoreCase("SendPushMessage")) {
			pushNotificationActionStr
					.append("{method:\"SendPushMessage\" ,category:\"SendPushNotificationAction\",")
					.append("params:{UserId:'")
					.append(pushNotificationcontroller.getUserId())
					.append("',Group:\"")
					.append(pushNotificationcontroller.getGroup()).append("\"")
					.append(",Message:\"")
					.append(pushNotificationcontroller.getMessage()).append("\"");
			
			pushNotificationActionStr.append("}")
					.append(applyConditionIfAny).append("},");
		}
		
		if (pushNotificationcontroller.getMethod()
				.equalsIgnoreCase("UnregisterFromPushNotification")) {
						
			pushNotificationActionStr.append("{method:\"UnregisterFromPushNotification\",category:\"SendPushNotificationAction\",")
					.append("params:{UserId:'")
					.append(pushNotificationcontroller.getUserId())
					.append("',ClientID:\"")
					.append(pushNotificationcontroller.getClientId() + "\"")
					.append(",Group:\"")
					.append(pushNotificationcontroller.getGroup()).append("\"");
			
			pushNotificationActionStr.append("}")
					.append(applyConditionIfAny).append("},");
		}

		return pushNotificationActionStr;

	}
}
