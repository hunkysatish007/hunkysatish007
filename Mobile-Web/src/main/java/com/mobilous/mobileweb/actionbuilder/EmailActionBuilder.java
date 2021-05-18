package com.mobilous.mobileweb.actionbuilder;

import java.util.List;

import com.mobilous.mobileweb.action.Action;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.param.EmailController;
import com.mobilous.mobileweb.ui.BaseView;

public class EmailActionBuilder{ 
	
	public static StringBuilder build(GenApp genapp, BaseView baseview,	Event event, Action action){
		
		EmailController emailcontroller = (EmailController) action.getParameters();

		StringBuilder emailactionStr = new StringBuilder();
		StringBuilder applyConditionIfAny = new StringBuilder();
		
		if(emailcontroller.getCondition() != null){
			applyConditionIfAny.append(ConditionBuilder.setCondition(emailcontroller.getCondition(), baseview));
		}
		
		if (emailcontroller.getMethod().equalsIgnoreCase("openMessageEditor")) {
		
			emailactionStr.append("{method:\"OpenMessageEditor\",category:\"EmailControllerAction\", params:{mail:\"mailto:");
			emailactionStr.append(recipientList(emailcontroller.getToRecipients()));
			if(emailcontroller.getSubject() == null){
				emailactionStr.append("?subject= ");
			}else{
				emailactionStr.append("?subject=").append(emailcontroller.getSubject());
			}
			if(emailcontroller.getCcRecipients() != null) {
				if (!emailcontroller.getCcRecipients().isEmpty()) {
					emailactionStr.append("&cc=").append(recipientList(emailcontroller.getCcRecipients()));
				}
			}
			if(emailcontroller.getBccRecipients() != null) {
				if (!emailcontroller.getBccRecipients().isEmpty()) {
					emailactionStr.append("&bcc=").append(recipientList(emailcontroller.getBccRecipients()));
				}
			}
			if (emailcontroller.getMessageBody() != null) {
				emailactionStr.append("&body=").append(emailcontroller.getMessageBody().replaceAll(",","\\,").replace("\n",""));
			}else{
				emailactionStr.append("&body=").append(" ");
			}
			emailactionStr.append("\"")
			.append("}")
			.append(applyConditionIfAny)
			.append("},");
		}
		
		
		else if (emailcontroller.getMethod().equalsIgnoreCase("canSendEmail")) {
			emailactionStr.append("{method:\"CanSendEmail\",category:\"EmailControllerAction\"").append(applyConditionIfAny)
			.append("},");
		}
		
		return emailactionStr;
		
	}
	
	private static String recipientList(List<String> list) {
		if (list != null) {
			StringBuilder sb = new StringBuilder();
			boolean isFirst = true;
			for (String recipient : list) {
				if (!isFirst) {
					sb.append(",");
				} else {
					isFirst = false;
				}
				sb.append(recipient);
			}
			return sb.toString();
		}
		return "";
	}
}
