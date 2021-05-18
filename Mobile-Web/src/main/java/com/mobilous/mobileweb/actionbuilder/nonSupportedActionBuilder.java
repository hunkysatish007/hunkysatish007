package com.mobilous.mobileweb.actionbuilder;

import com.mobilous.mobileweb.action.Action;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.param.EmailController;
import com.mobilous.mobileweb.ui.BaseView;

public class nonSupportedActionBuilder {
	public static StringBuilder build(GenApp genapp, BaseView baseview,	Event event, Action action){

		StringBuilder actionStr = new StringBuilder();
		actionStr.append("{method:\"NotSupportedMethod\",category:\"NoteSupportedCategory\"},");
	
		return actionStr;
		
	}
}
