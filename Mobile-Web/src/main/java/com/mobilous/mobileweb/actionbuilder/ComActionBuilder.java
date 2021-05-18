package com.mobilous.mobileweb.actionbuilder;

import com.mobilous.mobileweb.action.Action;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.param.ComController;
import com.mobilous.mobileweb.ui.BaseView;

public class ComActionBuilder {
	public static Object build(GenApp genapp, BaseView baseview, Event event,
			Action action) {
		StringBuilder actionstr = new StringBuilder();

		ComController comController = (ComController) action.getParameters();
		StringBuilder applyConditionIfAny = new StringBuilder();
		if (comController.getCondition() != null) {
			applyConditionIfAny.append(ConditionBuilder.setCondition(
					comController.getCondition(), baseview));
		}

		if (comController.getMethod().equalsIgnoreCase("RemoteDelete")) {
			String str = comController.getDataset().toString();
			actionstr
					.append("{method:\"Delete\", category:\"ComAction\", params:")
					.append(comController.getDataset())
					.append(applyConditionIfAny).append("},");
		} else if (comController.getMethod().equalsIgnoreCase("RemoteUpdate")) {
			String str = comController.getDataset().toString();
			actionstr
					.append("{method:\"Update\", category:\"ComAction\", params:")
					.append(comController.getDataset())
					.append(applyConditionIfAny).append("},");
		} else if (comController.getMethod().equalsIgnoreCase("RemoteSelect")) {
			actionstr
					.append("{method:\"RemoteSelect\", category:\"ComAction\", params:")
					.append(comController.getDataset())
					.append(applyConditionIfAny).append("},");
		} else if (comController.getMethod().equalsIgnoreCase("RemoteNumRecords")) {
			actionstr
			.append("{method:\"RemoteNumRecords\", category:\"ComAction\", params:")
			.append(comController.getDataset())
			.append(applyConditionIfAny).append("},");
		}else if (comController.getMethod().equalsIgnoreCase("RemoteInsert")) {
			String str = comController.getDataset().toString();
			actionstr
			.append("{method:\"Insert\", category:\"ComAction\", params:")
			.append(comController.getDataset())
			.append(applyConditionIfAny).append("},");
		} else if (comController.getMethod().equalsIgnoreCase("Login")) {
			String str = comController.getDataset().toString();
			actionstr
					.append("{method:\"Login\", category:\"ComAction\", params:")
					.append(comController.getDataset())
					.append(applyConditionIfAny).append("},");
		} else if (comController.getMethod().equalsIgnoreCase("Register")) {
			String str = comController.getDataset().toString();
			actionstr
					.append("{method:\"Register\", category:\"ComAction\", params:")
					.append(comController.getDataset())
					.append(applyConditionIfAny).append("},");
		} else if (comController.getMethod().equalsIgnoreCase("generalLogin")) {
			String str = comController.getDataset().toString();
			actionstr
					.append("{method:\"GeneralLogin\", category:\"ComAction\", params:")
					.append(comController.getDataset())
					.append(applyConditionIfAny).append("},");
		} /*else if (comController.getMethod().equalsIgnoreCase("changeCondition")) {
			actionstr
					.append("{method:\"ChangeCondition\", category:\"ComAction\", params:")
					.append(comController.getDataset())
					.append(applyConditionIfAny).append("},");
		}*/ else if (comController.getMethod().equalsIgnoreCase("SynchronizeDB")) {
			// {method:"UploadDBRecords", category:"ComAction",
			// params:{"servicename":"Mobilous","table":"emp","where":"",
			// "order":""},
			// toparams:{"toService":"Mobilous","toTable":"emp1"},events:{Error:[],Success:[],}}
			actionstr
					.append("{method:\"SynchronizeDB\", category:\"ComAction\",")
					.append("params:" + comController.getFromDatasetSynchDB())
					.append(",toparams:" + comController.getToDatasetSynchDB())
					.append(applyConditionIfAny).append("},");
		}else if (comController.getMethod().equalsIgnoreCase("UploadRecordsToRemoteDB")) {
			// {method:"UploadDBRecords", category:"ComAction",
			// params:{"servicename":"Mobilous","table":"emp","where":"",
			// "order":""},
			// toparams:{"toService":"Mobilous","toTable":"emp1"},events:{Error:[],Success:[],}}
			if(comController.getFile().getSrcLocation().equalsIgnoreCase("bundle")){
				comController.getDataset().put("filename",comController.getFile().getFileName());
			}else if(comController.getFile().getSrcLocation().equalsIgnoreCase("url")){
				comController.getDataset().put("url",comController.getFile().getUrl(genapp));
			}
			
			actionstr
					.append("{method:\"UploadRecordsToRemoteDB\", category:\"ComAction\",")
					.append("params:" + comController.getDataset())
					.append(applyConditionIfAny).append("},");
		}

		return actionstr;
	}
}
