package com.mobilous.mobileweb.actionbuilder;

import com.mobilous.mobileweb.action.Action;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.param.ContactController;
import com.mobilous.mobileweb.ui.BaseView;

public class GoogleContactActionBuilder {

	public static StringBuilder build(GenApp genapp, BaseView baseview,
			Event event, Action action) {
		// TODO Auto-generated method stub
		StringBuilder contactscript = new StringBuilder();

		ContactController googlecontactcontroller = (ContactController) action
				.getParameters();
		if (googlecontactcontroller.getMethod().equalsIgnoreCase("FindPerson")) {
			// service,keyword
			contactscript
					.append("{method:\"searchContact\",category:\"GoogleContactService\",")
					.append("params:{service:'")
					.append(googlecontactcontroller.getServicename())
					.append("',keyword:'")
					.append(googlecontactcontroller.getKeyword())
					.append("'}},");
		}

		else if (googlecontactcontroller.getMethod().equalsIgnoreCase(
				"InsertPerson")) {
			// "familyname":"YY","firstname":"UU","nickname":"oo","phonenumber":"11","address":"gg",""email":"aa@aa.com","company":"tt"
			contactscript
					.append("{method:\"insertContact\",category:\"GoogleContactService\",")
					.append("params:{").append("familyname:'")
					.append(googlecontactcontroller.getFamilyName())
					.append("',firstname:'")
					.append(googlecontactcontroller.getFirstName())
					.append("',nickname:'")
					.append(googlecontactcontroller.getNickName())
					.append("',phonenumber:'")
					.append(googlecontactcontroller.getPhoneNumber())
					.append("',address:'")
					.append(googlecontactcontroller.getAddress())
					.append("',email:'")
					.append(googlecontactcontroller.getEmail())
					.append("',company:'")
					.append(googlecontactcontroller.getCompany())
					.append("'}},");
		} else if (googlecontactcontroller.getMethod().equalsIgnoreCase(
				"RemovePerson")) {
			// keyword,email,phone number
			contactscript
					.append("{method:\"deleteContact\",category:\"GoogleContactService\",")
					.append("params:{keyword:'")
					.append(googlecontactcontroller.getKeyword())
					.append("',email:'")
					.append(googlecontactcontroller.getEmail())
					.append("',matchField:\'"
							+ googlecontactcontroller.getMatchField())
					.append("',matchValue:\'"
							+ googlecontactcontroller.getMatchValue())
					.append("',phonenumber:'")
					.append(googlecontactcontroller.getPhoneNumber())
					.append("'}},");
		} else if (googlecontactcontroller.getMethod().equalsIgnoreCase(
				"UpdatePerson")) {
			// "familyname":"YY","firstname":"UU","nickname":"oo","phonenumber":"11","address":"gg",""email":"aa@aa.com","company":"tt"
			contactscript
					.append("{method:\"updateContact\",category:\"GoogleContactService\",")
					.append("params:{")
					.append("table:'appexe_tmp_contact',")
					.append("where:'',")
					// update need where clause from builder.. so this line
					// needed to be updated afterwards..
					.append("familyname:'")
					.append(googlecontactcontroller.getFamilyName())
					.append("',firstname:'")
					.append(googlecontactcontroller.getFirstName())
					.append("',nickname:'")
					.append(googlecontactcontroller.getNickName())
					.append("',matchField:\'"
							+ googlecontactcontroller.getMatchField())
					.append("',matchValue:\'"
							+ googlecontactcontroller.getMatchValue())
					.append("',phonenumber:'")
					.append(googlecontactcontroller.getPhoneNumber())
					.append("',address:'")
					.append(googlecontactcontroller.getAddress())
					.append("',email:'")
					.append(googlecontactcontroller.getEmail())
					.append("',company:'")
					.append(googlecontactcontroller.getCompany())
					.append("'}},");

		} else if (googlecontactcontroller.getMethod().equalsIgnoreCase(
				"CallContact")) {
			contactscript
					.append("{method:\"CallContact\",category:\"GoogleContactService\",")
					.append("params:{phonenumber:\"")
					.append(googlecontactcontroller.getPhoneNumber())
					.append("\"}},");

		}

		return contactscript;
	}

}
