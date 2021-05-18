package com.mobilous.mobileweb.parser;

import java.util.ArrayList;

import org.json.simple.JSONObject;

import com.dd.plist.NSArray;
import com.dd.plist.NSDictionary;
import com.dd.plist.NSNumber;
import com.dd.plist.NSObject;
import com.mobilous.mobileweb.action.Action;
import com.mobilous.mobileweb.app.DefFile;
import com.mobilous.mobileweb.app.Fields;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.param.AccountController;
import com.mobilous.mobileweb.param.CalendarController;
import com.mobilous.mobileweb.param.CanvasController;
import com.mobilous.mobileweb.param.ComController;
import com.mobilous.mobileweb.param.ContactController;
import com.mobilous.mobileweb.param.DBConditionController;
import com.mobilous.mobileweb.param.DBController;
import com.mobilous.mobileweb.param.EmailController;
import com.mobilous.mobileweb.param.LoopList;
import com.mobilous.mobileweb.param.MapController;
import com.mobilous.mobileweb.param.MediaController;
import com.mobilous.mobileweb.param.NPEActionSheetButtonsController;
import com.mobilous.mobileweb.param.NPEActionSheetController;
import com.mobilous.mobileweb.param.PageController;
import com.mobilous.mobileweb.param.Parameters;
import com.mobilous.mobileweb.param.PushNotificationController;
import com.mobilous.mobileweb.param.SensorController;
import com.mobilous.mobileweb.param.SystemController;
import com.mobilous.mobileweb.param.UIObjectController;
import com.mobilous.mobileweb.param.WarningController;
import com.mobilous.mobileweb.util.PlistLocator;
import com.mobilous.mobileweb.util.Utility;

/************************************************************
 * Actions Paramater Parsing
 ************************************************************/
public class ParameterParser extends ADFParser {

	public ParameterParser(PlistLocator locator) {
		super(locator,MODE);
	}

	public static Parameters parseParams(String method, NSDictionary dic,
			GenApp genApp, Action action, DefFile defFile) throws Exception {
		if (method.equalsIgnoreCase("View"))
			return parsePageController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("SelectTab"))
			return parsePageController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("popViewController"))
			return parsePageController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("popToRootViewController"))
			return parsePageController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("ReturnToParentView"))
			return parsePageController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("TransitToSiblingView"))
			return parsePageController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("transitSideBar"))
			return parsePageController(dic, method, genApp, action, defFile);
		
		else if (method.equalsIgnoreCase("setParentData"))
			return parsePageController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("resetViewData"))
			return parsePageController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("setViewData"))
			return parsePageController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("calculate"))
			return parsePageController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("appendString"))
			return parsePageController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("clearString"))
			return parsePageController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("deleteLastOneCharacter"))
			return parsePageController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("combineToCsv"))
			return parsePageController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("StrToHex") || method.equalsIgnoreCase("HexToStr"))
			return parsePageController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("finishModalWindow"))
			return parsePageController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("loadRSSFeed"))
			return parsePageController(dic, method, genApp, action, defFile);

		else if (method.equalsIgnoreCase("moveObject"))
			return parseUIObjectController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("rotateObject"))
			return parseUIObjectController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("setValue"))
			return parseUIObjectController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("setFrame"))
			return parseUIObjectController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("setColor"))
			return parseUIObjectController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("setImage"))
			return parseUIObjectController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("movingFocus"))
			return parseUIObjectController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("setFocusOff"))
			return parseUIObjectController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("setBounds"))
			return parseUIObjectController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("setInset"))
			return parseUIObjectController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("setResizingMask"))
			return parseUIObjectController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("setFont"))
			return parseUIObjectController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("setNumberFormat"))
			return parseUIObjectController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("setDateFormat"))
			return parseUIObjectController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("addParts"))
			return parseUIObjectController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("removeParts"))
			return parseUIObjectController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("addItem"))
			return parseUIObjectController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("removeItem"))
			return parseUIObjectController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("saveRecord"))
			return parseUIObjectController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("deleteRecord"))
			return parseUIObjectController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("setParentRecordData"))
			return parseUIObjectController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("ShowGadget"))
			return parseUIObjectController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("HideGadget"))
			return parseUIObjectController(dic, method, genApp, action, defFile);


		else if (method.equalsIgnoreCase("Select"))
			return parseDBController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("insert"))
			return parseDBController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("update"))
			return parseDBController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("delete"))
			return parseDBController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("deleteAllRecords"))
			return parseDBController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("NumRecords"))
			return parseDBController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("saveCSV"))
			return parseDBController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("loadCSV"))
			return parseDBController(dic, method, genApp, action, defFile);

		else if (method.equalsIgnoreCase("Register"))
			return parseComController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("Login"))
			return parseComController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("generalLogin"))
			return parseComController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("Activate"))
			return parseComController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("RecvMsgReady"))
			return parseComController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("Upload"))
			return parseComController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("Download"))
			return parseComController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("SendLog"))
			return parseComController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("RemoteSelect"))
			return parseComController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("RemoteNumRecords"))
			return parseComController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("CustomRemoteSelect"))
			return parseComController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("RemoteInsert"))
			return parseComController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("CustomRemoteInsert"))
			return parseComController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("RemoteUpdate"))
			return parseComController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("CustomRemoteUpdate"))
			return parseComController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("RemoteDelete"))
			return parseComController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("CustomRemoteDelete"))
			return parseComController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("SynchronizeDB"))
			return parseComController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("UploadRecordsToRemoteDB"))
			return parseComController(dic, method, genApp, action, defFile);

		else if (method.equalsIgnoreCase("Play"))
			return parseMediaController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("Pause"))
			return parseMediaController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("StopPlay"))
			return parseMediaController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("Record"))
			return parseMediaController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("StopRecord"))
			return parseMediaController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("SlowPlay"))
			return parseMediaController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("SlowBackPlay"))
			return parseMediaController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("FastPlay"))
			return parseMediaController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("FastBackPlay"))
			return parseMediaController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("FastForward"))
			return parseMediaController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("FastBackward"))
			return parseMediaController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("Reverse"))
			return parseMediaController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("PlaySE"))
			return parseMediaController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("TakePhoto"))
			return parseMediaController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("ShareVia"))
			return parseMediaController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("QRScanner"))
			return parseMediaController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("QRGenerate"))
			return parseMediaController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("SwitchCamera"))
			return parseMediaController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("OpenGallery"))
			return parseMediaController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("UploadMedia"))
			return parseMediaController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("DownloadMedia"))
			return parseMediaController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("SaveMedia"))
			return parseMediaController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("UploadFile"))
			return parseFileController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("DownloadFile"))
			return parseMediaController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("openMessageEditor"))
			return parseEmailController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("canSendEmail"))
			return parseEmailController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("NewEmail"))
			return parseEmailController(dic, method, genApp, action, defFile);

		else if (method.equalsIgnoreCase("ShowLocationInfo"))
			return parseMapController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("ShowRegionInfo"))
			return parseMapController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("ShowAreaInfo"))
			return parseMapController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("OpenTargetScope"))
			return parseMapController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("CloseTargetScope"))
			return parseMapController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("OpenCurrentPosition"))
			return parseMapController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("CloseCurrentPosition"))
			return parseMapController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("AddMarker"))
			return parseMapController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("AddCustomMarker"))
			return parseMapController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("AddMarkers"))
			return parseMapController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("AddPinMarker"))
			return parseMapController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("removeMarker"))
			return parseMapController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("removeMarkers"))
			return parseMapController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("ShowDefaultMarkers"))
			return parseMapController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("ShowRoute"))
			return parseMapController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("ClearRoute"))
			return parseMapController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("RouteList"))
			return parseMapController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("StartCheckPoint"))
			return parseMapController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("NextCheckPoint"))
			return parseMapController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("PrevCheckPoint"))
			return parseMapController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("startNavigation"))
			return parseMapController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("stopNavigation"))
			return parseMapController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("StopGPS"))
			return parseMapController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("StartGPS"))
			return parseMapController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("StopGPSTrack"))
			return parseMapController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("StartGPSTrack"))
			return parseMapController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("ConvertGPSLogToFile"))
			return parseMapController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("LoadFixedRouteFile"))
			return parseMapController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("ShowFixedRoute"))
			return parseMapController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("AddWayPoint"))
			return parseMapController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("GetStartStep"))
			return parseMapController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("GetNextStep"))
			return parseMapController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("GetPreviousStep"))
			return parseMapController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("GetCurrentStep"))
			return parseMapController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("StartGeoFencing"))
			return parseMapController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("StopGeoFencing"))
			return parseMapController(dic, method, genApp, action, defFile);
		
		else if (method.equalsIgnoreCase("RegisterUsersForPushNotification"))
			return parsePushNotificationController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("SendPushMessage"))
			return parsePushNotificationController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("UnregisterFromPushNotification"))
			return parsePushNotificationController(dic, method, genApp, action, defFile);		
		else if (method.equalsIgnoreCase("Alert"))
			return parseWarningController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("ShowDialog"))
			return parseWarningController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("HideDialog"))
			return parseWarningController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("ActionSheet")) {
//			if (genApp.getProjectBuilder() != 1) {
//				return parseWarningController(dic, method, genApp, action,
//						defFile);
//			} else
				return parseNPEActionSheetController(dic, method, genApp,
						action, defFile);
		} else if (method.equalsIgnoreCase("StartWaitIndicator"))
			return parseWarningController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("StopWaitIndicator"))
			return parseWarningController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("CallExternalApp"))
			return parseSystemController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("NetworkAvailable"))
			return parseSystemController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("loop"))
			return parseSystemController(dic, method, genApp, action, defFile);
		
		else if (method.equalsIgnoreCase("loginCheck"))
			return parseAccountController(dic, method, genApp, action, defFile);

		else if (method.equalsIgnoreCase("setStyle"))
			return parseCanvasController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("strokeRec"))
			return parseCanvasController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("strokeCircle"))
			return parseCanvasController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("strokeTriangle"))
			return parseCanvasController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("strokeArc"))
			return parseCanvasController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("fillRect"))
			return parseCanvasController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("fillCircle"))
			return parseCanvasController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("fillTriangle"))
			return parseCanvasController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("moveTo"))
			return parseCanvasController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("lineTo"))
			return parseCanvasController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("arcTo"))
			return parseCanvasController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("beginPath"))
			return parseCanvasController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("endPath"))
			return parseCanvasController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("drawImage"))
			return parseCanvasController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("drawText"))
			return parseCanvasController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("rotate"))
			return parseCanvasController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("scale"))
			return parseCanvasController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("translate"))
			return parseCanvasController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("beginAnimation"))
			return parseCanvasController(dic, method, genApp, action, defFile);

		// un-comment them when they are fully implemented in version 2.7.5d..
		// else if (method.equalsIgnoreCase("startTimer"))
		// return parseSensorController(dic, method, genApp, action, defFile);
		// else if (method.equalsIgnoreCase("stopTimer"))
		// return parseSensorController(dic, method, genApp, action, defFile);

		else if (method.equalsIgnoreCase("FindPerson"))
			return parseContactController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("InsertPerson"))
			return parseContactController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("RemovePerson"))
			return parseContactController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("UpdatePerson"))
			return parseContactController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("CallContact"))
			return parseContactController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("FindEvent"))
			return parseCalendarController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("InsertEvent"))
			return parseCalendarController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("UpdateEvent"))
			return parseCalendarController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("RemoveEvent"))
			return parseCalendarController(dic, method, genApp, action, defFile);
		// for SplitCSV Method Only.. as I need in genapp..
		else if (method.equalsIgnoreCase("splitCsv"))
			return parseOnlyForSplitCSV(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("ChangeRemoteCondition")
				|| method.equalsIgnoreCase("ChangeCondition")) // New action
																// added
			// on 4 April,
			// 2014 -
			// DBCondition
			// category
			// action
			return parseDBCondition(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("startTimer"))
			return parseSensorController(dic, method, genApp, action, defFile);
		else if (method.equalsIgnoreCase("stopTimer"))
			return parseSensorController(dic, method, genApp, action, defFile);
		else
			// throw new Exception("Unknown Key: "+key);
			logger.debug("parseParams parse: Unknown method found: " + method);

		return null;
	}

	private static Parameters parseDBCondition(NSDictionary dic, String method,
			GenApp genApp, Action action, DefFile defFile) throws Exception {

		DBConditionController dbConditionController = new DBConditionController();
		/*
		 * NSDictionary dicSheet = (NSDictionary) dic
		 * .objectForKey("ActionSheetDef"); if (dicSheet != null) dic =
		 * dicSheet;
		 */
		dbConditionController.setMethod(method);
		for (String key : dic.allKeys()) {
			/*
			 * if (key.equalsIgnoreCase("params")) { NSDictionary params =
			 * (NSDictionary) dic.objectForKey(key); for (String paramKey :
			 * params.allKeys()) {
			 */
			if (key.equalsIgnoreCase("localwhere")
					|| key.equalsIgnoreCase("remotewhere"))
				dbConditionController
						.setWhere(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("order"))
				dbConditionController
						.setOrder(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("name"))
				dbConditionController
						.setName(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("group"))
				dbConditionController.setGroupName(dic.objectForKey(key)
						.toString());
			else if (key.equalsIgnoreCase("method"))
				dbConditionController.setMethod(dic.objectForKey(key)
						.toString());
			else if (key.equalsIgnoreCase("pageName"))
				dbConditionController.setPageName(dic.objectForKey(key)
						.toString());
			else if (key.equalsIgnoreCase("condition"))
				dbConditionController.setCondition(ETCParser
						.parseCondition((NSDictionary) dic.objectForKey(key)));
			// }
			// }
			/*
			 * else if (key.equalsIgnoreCase("actions"))
			 * action.setEvent(parseEvent( (NSDictionary) dic.objectForKey(key),
			 * genApp, defFile));
			 */

			else
				// throw new Exception("Unknown Key: "+key);
				logger.debug("parseWarningController parse: Unknown key found: "
						+ key);
		}

		return (DBConditionController) parsePageNameFromController(dic,
				defFile, dbConditionController);
	}

	public static PageController parseOnlyForSplitCSV(NSDictionary dic,
			String method, GenApp genApp, Action action, DefFile defFile)
			throws Exception {
		PageController pageController = new PageController(method);
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("prefix"))
				pageController.setSplitCSV_prefix(dic.objectForKey(key)
						.toString());
			else if (key.equalsIgnoreCase("csvRowData"))
				pageController.setSplitCSV_rowData(dic.objectForKey(key)
						.toString());
			else
				logger.debug("parsePageController parse: Unknown key found: "
						+ key);
		}
		// return pageController;
		return (PageController) parsePageNameFromController(dic, defFile,
				pageController);
	}

	private static CalendarController parseCalendarController(NSDictionary dic,
			String method, GenApp genApp, Action action, DefFile defFile)
			throws Exception {
		CalendarController calendarController = new CalendarController(method);
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("fromDate")) {
				calendarController
						.setFromDate(dic.objectForKey(key).toString());
			} else if (key.equalsIgnoreCase("toDate")) {
				calendarController.setToDate(dic.objectForKey(key).toString());
			} else if (key.equalsIgnoreCase("ownerEmail")) {
				calendarController.setOwnerEmail(dic.objectForKey(key)
						.toString());
			} else if (key.equalsIgnoreCase("filterFromDate")) {
				calendarController.setFilterFromDate(dic.objectForKey(key)
						.toString());
			} else if (key.equalsIgnoreCase("filterToDate")) {
				calendarController.setFilterToDate(dic.objectForKey(key)
						.toString());
			} else if (key.equalsIgnoreCase("title")) {
				calendarController
						.setCategory(dic.objectForKey(key).toString());
			} else if (key.equalsIgnoreCase("place")) {
				calendarController.setPlace(dic.objectForKey(key).toString());
			} else if (key.equalsIgnoreCase("description")) {
				calendarController.setDescription(dic.objectForKey(key)
						.toString());
			} else if (key.equalsIgnoreCase("service")) {
				calendarController.setService(dic.objectForKey(key).toString());
			} else if (key.equalsIgnoreCase("eventid")) {
				calendarController.setEventID(dic.objectForKey(key).toString());
			} else if (key.equalsIgnoreCase("matchField")) {
				calendarController.setMatchField(dic.objectForKey(key)
						.toString());
			} else if (key.equalsIgnoreCase("matchValue")) {
				calendarController.setMatchValue(dic.objectForKey(key)
						.toString());
			} else if (key.equalsIgnoreCase("condition"))
				calendarController.setCondition(ETCParser
						.parseCondition((NSDictionary) dic.objectForKey(key)));
			else
				logger.debug("parseCalendarController parse: Unknown method found: "
						+ method);
		}

		return (CalendarController) parsePageNameFromController(dic, defFile,
				calendarController);
	}

	private static ContactController parseContactController(NSDictionary dic,
			String method, GenApp genApp, Action action, DefFile defFile)
			throws Exception {

		ContactController contactController = new ContactController(method);
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("keyword"))
				contactController.setKeyword(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("service"))
				contactController.setServicename(dic.objectForKey(key)
						.toString());
			else if (key.equalsIgnoreCase("phoneNumber"))
				contactController.setPhoneNumber(dic.objectForKey(key)
						.toString());
			else if (key.equalsIgnoreCase("phonenumber"))
				contactController.setPhoneNumberToCall(dic.objectForKey(key)
						.toString());
			else if (key.equalsIgnoreCase("nickName"))
				contactController.setNickName(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("email"))
				contactController.setEmail(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("address"))
				contactController.setAddress(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("familyName"))
				contactController.setFamilyName(dic.objectForKey(key)
						.toString());
			else if (key.equalsIgnoreCase("firstName"))
				contactController
						.setFirstName(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("companyName"))
				contactController.setCompany(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("conatctid"))
				contactController.setContactid((Integer.parseInt(dic
						.objectForKey(key).toString())));
			else if (key.equalsIgnoreCase("matchField")) {
				contactController.setMatchField(dic.objectForKey(key)
						.toString());
			} else if (key.equalsIgnoreCase("matchValue")) {
				contactController.setMatchValue(dic.objectForKey(key)
						.toString());
			}
		}

		return (ContactController) parsePageNameFromController(dic, defFile,
				contactController);
	}

	private static SensorController parseSensorController(NSDictionary dic,
			String method, GenApp genApp, Action action, DefFile defFile)
			throws Exception {
		SensorController sensorController = new SensorController(method);
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("name"))
				sensorController.setName(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("type"))
				sensorController.setType(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("alarmTime"))
				sensorController.setAlarmTime(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("interval"))
				sensorController.setInterval(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("repeatFlag"))
				sensorController.setRepeatFlag(((NSNumber) dic
						.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("repeat"))
				sensorController.setRepeat(((NSNumber) dic
						.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("repeatList"))
				sensorController.setRepeatList(ETCParser
						.parseStringArray(((NSArray) dic.objectForKey(key))
								.getArray()));
			else if (key.equalsIgnoreCase("alarmLap"))
				sensorController.setAlarmLap(((NSNumber) dic.objectForKey(key))
						.intValue());
			else if (key.equalsIgnoreCase("countTime"))
				sensorController
						.setCountTime(((NSNumber) dic.objectForKey(key))
								.intValue());
			else if (key.equalsIgnoreCase("actions"))
				action.setEvent(parseEvent(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
			else if (key.equalsIgnoreCase("condition"))
				sensorController.setCondition(ETCParser
						.parseCondition((NSDictionary) dic.objectForKey(key)));
			else
				// throw new Exception("Unknown Key: "+key);
				logger.debug("parseSensorController parse: Unknown method found: "
						+ method);
		}
		return (SensorController) parsePageNameFromController(dic, defFile,
				sensorController);
	}

	public static CanvasController parseCanvasController(NSDictionary dic,
			String method, GenApp genApp, Action action, DefFile defFile)
			throws Exception {
		CanvasController canvasController = new CanvasController(method);
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("point"))
				canvasController.setPoint(AttributeParser
						.parsePoint((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("name"))
				canvasController.setName(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("startPoint"))
				canvasController.setStartPoint(AttributeParser
						.parsePoint((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("centerPoint"))
				canvasController.setCenterPoint(AttributeParser
						.parsePoint((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("endPoint"))
				canvasController.setEndPoint(AttributeParser
						.parsePoint((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("pointA"))
				canvasController.setPointA(AttributeParser
						.parsePoint((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("pointB"))
				canvasController.setPointB(AttributeParser
						.parsePoint((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("pointC"))
				canvasController.setPointC(AttributeParser
						.parsePoint((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("angle"))
				canvasController.setAngle(((NSNumber) dic.objectForKey(key))
						.longValue());
			else if (key.equalsIgnoreCase("startAngle"))
				canvasController.setStartAngle(((NSNumber) dic
						.objectForKey(key)).longValue());
			else if (key.equalsIgnoreCase("startValue"))
				canvasController.setStartValue(((NSNumber) dic
						.objectForKey(key)).longValue());
			else if (key.equalsIgnoreCase("endAngle"))
				canvasController.setEndAngle(((NSNumber) dic.objectForKey(key))
						.longValue());
			else if (key.equalsIgnoreCase("endValue"))
				canvasController.setEndValue(((NSNumber) dic.objectForKey(key))
						.longValue());
			else if (key.equalsIgnoreCase("width"))
				canvasController.setWidth(((NSNumber) dic.objectForKey(key))
						.longValue());
			else if (key.equalsIgnoreCase("height"))
				canvasController.setHeight(((NSNumber) dic.objectForKey(key))
						.longValue());
			else if (key.equalsIgnoreCase("radius"))
				canvasController.setRadius(((NSNumber) dic.objectForKey(key))
						.longValue());
			else if (key.equalsIgnoreCase("withRadius"))
				canvasController.setWithRadius(((NSNumber) dic
						.objectForKey(key)).longValue());
			else if (key.equalsIgnoreCase("percentage"))
				canvasController.setPercentage(((NSNumber) dic
						.objectForKey(key)).longValue());
			else if (key.equalsIgnoreCase("duration"))
				canvasController.setDuration(((NSNumber) dic.objectForKey(key))
						.longValue());
			else if (key.equalsIgnoreCase("delay"))
				canvasController.setDelay(((NSNumber) dic.objectForKey(key))
						.intValue());
			else if (key.equalsIgnoreCase("uri"))
				canvasController.setUri(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("group"))
				canvasController.setGroup(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("groups"))
				canvasController.setGroups(ETCParser
						.parseStringArray(((NSArray) dic.objectForKey(key))
								.getArray()));
			else if (key.equalsIgnoreCase("animationValue"))
				canvasController.setAnimationValue(ETCParser
						.parseStringArray(((NSArray) dic.objectForKey(key))
								.getArray()));
			else if (key.equalsIgnoreCase("actions"))
				action.setEvent(parseEvent(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
			else if (key.equalsIgnoreCase("condition"))
				canvasController.setCondition(ETCParser
						.parseCondition((NSDictionary) dic.objectForKey(key)));
			else
				// throw new Exception("Unknown Key: "+key);
				logger.debug("parseCanvasController parse: Unknown method found: "
						+ method);
		}
		return (CanvasController) parsePageNameFromController(dic, defFile,
				canvasController);
	}

	public static AccountController parseAccountController(NSDictionary dic,
			String method, GenApp genApp, Action action, DefFile defFile)
			throws Exception {
		AccountController accountController = new AccountController(method);
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("username"))
				accountController.setUsername(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("userid"))
				accountController.setUserID(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("actions"))
				action.setEvent(parseEvent(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
			else if (key.equalsIgnoreCase("condition"))
				accountController.setCondition(ETCParser
						.parseCondition((NSDictionary) dic.objectForKey(key)));
		}
		return (AccountController) parsePageNameFromController(dic, defFile,
				accountController);
	}

	public static MapController parseMapController(NSDictionary dic,
			String method, GenApp genApp, Action action, DefFile defFile)
			throws Exception {
		MapController mapController = new MapController(method);
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("name"))
				mapController.setName(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("toLocation"))
				mapController.setToLocation(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("fromLocation"))
				mapController.setFromLocation(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("locationName"))
				mapController.setLocationName(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("mode"))
				mapController.setMode(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("regionName"))
				mapController.setRegionName(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("areaName"))
				mapController.setAreaName(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("title"))
				mapController.setTitle(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("subtitle"))
				mapController.setSubtitle(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("address"))
				mapController.setAddress(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("leftView"))
				mapController.setLeftView(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("rightView"))
				mapController.setRightView(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("trafic"))
				mapController.setTraffic(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("enable"))
				mapController.setEnable(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("accuracy"))
				mapController.setAccuracy(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("asDefault"))
				mapController.setAsDefault(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("animationDrop"))
				mapController.setAnimationDrop(((NSNumber) dic
						.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("canShowCallOut"))
				mapController.setCanShowCallOut(((NSNumber) dic
						.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("withoutDefault"))
				mapController.setWithoutDefault(((NSNumber) dic
						.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("highway"))
				mapController.setHighway(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("markerId"))
				mapController.setMarkerId(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("anchorX"))
				mapController.setAnchorX(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("anchorY"))
				mapController.setAnchorY(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("markertype"))
				mapController.setMarkerType(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("lattitude"))
				mapController.setLatitude(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("longitude"))
				mapController.setLongitude(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("leftViewImage"))
				mapController.setLeftImageFile(AttributeParser
						.parseImageFile((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("markerfile"))
				mapController.setMarkerImageFile(AttributeParser
						.parseImageFile((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("rightViewImage"))
				mapController.setRightImageFile(AttributeParser
						.parseImageFile((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("anchor"))
				mapController.setAnchor(AttributeParser
						.parsePoint((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("markers"))
				mapController.setMarkers(ETCParser.parseMarkerList(
						((NSArray) dic.objectForKey(key)).getArray(), genApp,
						action, defFile));
			else if (key.equalsIgnoreCase("targetPage"))
				mapController.setTargetPage(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("actions"))
				action.setEvent(parseEvent(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
			else if (key.equalsIgnoreCase("condition"))
				mapController.setCondition(ETCParser
						.parseCondition((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("location"))
				mapController.setWayPointLocation(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("fixedRouteFile"))
				mapController.setFixedRouteFile(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("fixedRouteFiletype"))
				mapController.setFixedRouteFiletype(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("filetype"))
				mapController.setFiletype(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("step"))
				mapController.setStep(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("filename"))
				mapController.setFilename(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("radius"))
				mapController.setRadius(dic.objectForKey(key).toString());
			else
				// throw new Exception("Unknown Key: "+key);
				logger.debug("parseMapController parse: Unknown method found: "
						+ method);
		}
		return (MapController) parsePageNameFromController(dic, defFile,
				mapController);
	}

	public static EmailController parseEmailController(NSDictionary dic,
			String method, GenApp genApp, Action action, DefFile defFile)
			throws Exception {
		EmailController em = new EmailController(method);
		for (String key : dic.allKeys()) {
			if ("actions".equalsIgnoreCase(key))
				action.setEvent(parseEvent(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
			else if ("subject".equalsIgnoreCase(key))
				em.setSubject(dic.objectForKey(key).toString());
			else if ("messageBody".equalsIgnoreCase(key))
				em.setMessageBody(dic.objectForKey(key).toString());
			else if ("toRecipients".equalsIgnoreCase(key))
				em.setToRecipients(ETCParser.parseStringArray(((NSArray) dic
						.objectForKey(key)).getArray()));
			else if ("ccRecipients".equalsIgnoreCase(key))
				em.setCcRecipients(ETCParser.parseStringArray(((NSArray) dic
						.objectForKey(key)).getArray()));
			else if ("bccRecipients".equalsIgnoreCase(key))
				em.setBccRecipients(ETCParser.parseStringArray(((NSArray) dic
						.objectForKey(key)).getArray()));
			else if (key.equalsIgnoreCase("condition"))
				em.setCondition(ETCParser.parseCondition((NSDictionary) dic
						.objectForKey(key)));
			else
				// throw new Exception("Unknown Key: "+key);
				logger.debug("parseEmailController parse: Unknown method found: "
						+ method);
		}
		return (EmailController) parsePageNameFromController(dic, defFile, em);
	}

	public static ComController parseComController(NSDictionary dic,
			String method, GenApp genApp, Action action, DefFile defFile)
			throws Exception {
		ComController comController = new ComController(method);
		JSONObject dataset = new JSONObject();
		JSONObject fromDatasetSynchDB = new JSONObject();
		JSONObject toDatasetSynchDB = new JSONObject();
		// this flag will let mobileweb to know if it has to perform init
		// command to get AK key from server.
		genApp.setCommserverAccess(true);
		for (String key : dic.allKeys()) {
			// if(key.equalsIgnoreCase("record"))
			// comController.setRecord(null);
			// else if(key.equalsIgnoreCase("url"))
			// comController.setUrl(dic.objectForKey(key).toString());
			// else if(key.equalsIgnoreCase("fileName"))
			// comController.setFileName(dic.objectForKey(key).toString());
			// else if(key.equalsIgnoreCase("package"))
			// comController.setPackage(dic.objectForKey(key).toString());
			if (key.equalsIgnoreCase("rec")) {
				JSONObject rec = parseRecord(
						(NSDictionary) dic.objectForKey(key), genApp, defFile);
				if (!rec.isEmpty())
					dataset.put("rec", rec);
			} else if (key.equalsIgnoreCase("actions"))
				action.setEvent(parseEvent(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
			else if (key.equalsIgnoreCase("condition"))
				comController.setCondition(ETCParser
						.parseCondition((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("recordList") || key.equalsIgnoreCase("fields")) {
				// this else if code written for new page editior internal use.
				// ***DONO'T DELETE THIS***
			} else if (key.equalsIgnoreCase("fromService")) {
				fromDatasetSynchDB.put("servicename", dic.objectForKey(key).toString());
			} else if (key.equalsIgnoreCase("fromTable")) {
				fromDatasetSynchDB.put("table", dic.objectForKey(key).toString());
			} else if (key.equalsIgnoreCase("fromWhere")) {
				fromDatasetSynchDB.put("where", dic.objectForKey(key).toString().replaceAll("\"", "'"));
			} else if (key.equalsIgnoreCase("toService")
					|| key.equalsIgnoreCase("toTable")
					|| key.equalsIgnoreCase("forceFlag")) {
				toDatasetSynchDB.put(key, dic.objectForKey(key).toString());
			} else if (key.equalsIgnoreCase("forceUpdate")){
				toDatasetSynchDB.put(key, dic.objectForKey(key).toString());
			} else if(key.equalsIgnoreCase("tablename")){
				dataset.put("table", dic.objectForKey(key).toString());
			} else if(key.equalsIgnoreCase("table")){
				dataset.put("table", dic.objectForKey(key).toString());
			} else if(key.equalsIgnoreCase("servicename")){
				dataset.put("servicename", dic.objectForKey(key).toString());
			} else if (key.equalsIgnoreCase("file")){
				comController.setFile(AttributeParser.parseOtherFile((NSDictionary) dic
						.objectForKey(key)));
				dataset.put("src",comController.getFile().getSrcLocation());
			} else if (key.equalsIgnoreCase("resultFields")) {
				comController.setResultFields(ETCParser.parseFields(
						((NSArray) dic.objectForKey(key)).getArray()));
				
				StringBuilder fieldBuilder = new StringBuilder();
				ArrayList<Fields> resultFields = comController.getResultFields();
				for(Fields field : resultFields) {
					fieldBuilder.append(field.getFieldName()).append(",");
				}
				fieldBuilder = Utility.removeCommaFromLast(fieldBuilder);
				dataset.put("resultFields", fieldBuilder.toString());
			}else if(key.equalsIgnoreCase("fieldrecords")){
				dataset.put("fieldrecords", dic.objectForKey(key).toString());
			}else if(key.equalsIgnoreCase("loguid")){
				dataset.put("loguid", dic.objectForKey(key).toString());
			}else if(key.equalsIgnoreCase("getlogs")){
				dataset.put("getlogs", dic.objectForKey(key).toString());
			}
			else {
				dataset.put(key, dic.objectForKey(key).toString());
			}
		}
		comController.setDataset(dataset);
		comController.setFromDatasetSynchDB(fromDatasetSynchDB);
		comController.setToDatasetSynchDB(toDatasetSynchDB);
		return (ComController) parsePageNameFromController(dic, defFile,
				comController);
	}

	public static JSONObject parseRecord(NSDictionary dic, GenApp genApp,
			DefFile defFile) throws Exception {
		JSONObject record = new JSONObject();
		for (String key : dic.allKeys()) {
			record.put(key, dic.objectForKey(key).toString());
		}
		return record;
	}

	public static DBController parseDBController(NSDictionary dic,
			String method, GenApp genApp, Action action, DefFile defFile)
			throws Exception {
		DBController dbController = new DBController(method);
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("table")|| key.equalsIgnoreCase("tablename"))
				dbController.setTable(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("where")|| key.equalsIgnoreCase("localwhere")){
				String where = dic.objectForKey(key).toString().replaceAll("\"", "'");
				dbController.setWhere(where);
			}else if (key.equalsIgnoreCase("order"))
				dbController.setOrder(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("toFile"))
				dbController.setToFile(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("fromFile"))
				dbController.setFromFile(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("record"))
				dbController.setRecord(parseRecord(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
			else if (key.equalsIgnoreCase("actions"))
				action.setEvent(parseEvent(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
			else if (key.equalsIgnoreCase("condition"))
				dbController.setCondition(ETCParser
						.parseCondition((NSDictionary) dic.objectForKey(key)));
			else
				// throw new Exception("Unknown Key: "+key);
				logger.debug("parseDBController parse: Unknown method found: "
						+ method);
		}
		return (DBController) parsePageNameFromController(dic, defFile,
				dbController);
	}

	// public static Record parseRecord(NSObject o) {
	// Record r = new Record();
	// if (o instanceof NSDictionary) {
	// NSDictionary dict = (NSDictionary)o;
	// String[] keys = dict.allKeys();
	// for (int i=0; i < keys.length; i++) {
	// r.addPair(keys[i], dict.objectForKey(keys[i]).toString());
	// }
	// }
	// return r;
	// }

	public static Parameters parsePageNameFromController(NSDictionary dic,
			DefFile defFile, Parameters parameter) {
		try {
			if(dic.objectForKey("targetPage") != null){
				parameter.setPageName(dic.objectForKey("targetPage").toString());
			}else{
				parameter.setPageName(dic.objectForKey("pageName").toString());
			}
				

		} catch (Exception e) {
			parameter.setPageName(defFile.getFileName());
		}
		return parameter;
	}

	public static UIObjectController parseUIObjectController(NSDictionary dic,
			String method, GenApp genApp, Action action, DefFile defFile)
			throws Exception {
		UIObjectController uiObjectController = new UIObjectController(method);
		try {

			for (String key : dic.allKeys()) {
				if (key.equalsIgnoreCase("name"))
					uiObjectController
							.setName(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("key"))
					uiObjectController.setKey(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("reference"))
					uiObjectController.setReference(((NSNumber) dic
							.objectForKey(key)).boolValue());
				else if (key.equalsIgnoreCase("value"))
					uiObjectController.setValue(dic.objectForKey(key)
							.toString());
				else if (key.equalsIgnoreCase("x"))
					uiObjectController.setX(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("y"))
					uiObjectController.setY(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("width"))
					uiObjectController.setWidth(dic.objectForKey(key)
							.toString());
				else if (key.equalsIgnoreCase("height"))
					uiObjectController.setHeight(dic.objectForKey(key)
							.toString());
				else if (key.equalsIgnoreCase("shiftX"))
					uiObjectController.setShiftX(dic.objectForKey(key)
							.toString());
				else if (key.equalsIgnoreCase("shiftY"))
					uiObjectController.setShiftY(dic.objectForKey(key)
							.toString());
				else if (key.equalsIgnoreCase("centerX"))
					uiObjectController.setCenterX(dic.objectForKey(key)
							.toString());
				else if (key.equalsIgnoreCase("centerY"))
					uiObjectController.setCenterY(dic.objectForKey(key)
							.toString());
				else if (key.equalsIgnoreCase("degree"))
					uiObjectController.setDegree(dic.objectForKey(key)
							.toString());

				else if (key.equalsIgnoreCase("Image")){
					uiObjectController.setImage(AttributeParser
							.parseImageFile((NSDictionary) dic
									.objectForKey(key)));
					
					// need to manage 'image.imageName' key. Dated : 28-Oct-2017
					NSDictionary imgDic = (NSDictionary) dic.objectForKey(key);
					for (String params : imgDic.allKeys()) {
						if (params.equalsIgnoreCase("imageName")){
							uiObjectController.setImage(AttributeParser.parseImageDicData(imgDic));							
						}
					}
				}
				else if (key.equalsIgnoreCase("Frame"))
					uiObjectController.setFrame(AttributeParser
							.parsePoint((NSDictionary) dic.objectForKey(key)));
				else if (key.equalsIgnoreCase("Font"))
					uiObjectController.setFont(AttributeParser
							.parseFont((NSDictionary) dic.objectForKey(key)));
				else if (key.equalsIgnoreCase("Color"))
					uiObjectController.setColor(AttributeParser
							.parseColor((NSDictionary) dic.objectForKey(key)));
				else if (key.equalsIgnoreCase("uiproperty"))
					uiObjectController.setUiProperties(ETCParser
							.parseStringArray(((NSArray) dic.objectForKey(key))
									.getArray()));
				else if (key.equalsIgnoreCase("actions"))
					action.setEvent(parseEvent(
							(NSDictionary) dic.objectForKey(key), genApp,
							defFile));
				else if (key.equalsIgnoreCase("condition"))
					uiObjectController.setCondition(ETCParser
							.parseCondition((NSDictionary) dic
									.objectForKey(key)));
				else if (key.equalsIgnoreCase("objectname"))
					uiObjectController.setTargetUI(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("targetPage"))
					uiObjectController.setTargetPage(dic.objectForKey(key)
							.toString());
				else if (key.equalsIgnoreCase("numberFormat")) // Added by
																// Kundan.
					uiObjectController.setFormat(AttributeParser
							.parseNumberFormat((NSDictionary) dic
									.objectForKey(key)));
				else if (key.equalsIgnoreCase("cellId"))
					uiObjectController.setCellId(dic.objectForKey(key)
							.toString());
				else if (key.equalsIgnoreCase("groupId"))
					uiObjectController.setGroupId(dic.objectForKey(key)
							.toString());
				else if (key.equalsIgnoreCase("textName"))
					uiObjectController.setName(dic.objectForKey(key)
							.toString());
				else if (key.equalsIgnoreCase("animation"))
					uiObjectController.setAnimation(((NSNumber) dic.objectForKey(key)).boolValue());
				else if (key.equalsIgnoreCase("duration"))
					uiObjectController.setDuration(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("refTargetObject"))
					uiObjectController.setReferenceTarget(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("animationTime"))
					uiObjectController.setAnimateTime(dic.objectForKey(key).toString());
				else
					// throw new Exception("Unknown Key: "+key);
					logger.debug("parseUIObjectController parse: Unknown method found: "
							+ method);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return (UIObjectController) parsePageNameFromController(dic, defFile,
				uiObjectController);
	}

	public static PageController parsePageController(NSDictionary dic,
			String method, GenApp genApp, Action action, DefFile defFile)
			throws Exception {
		PageController pageController = new PageController(method);
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("file") && !method.equalsIgnoreCase("ReturnToParentView")) {// && !method.equalsIgnoreCase("TransitToSiblingView"))
				if(key.equalsIgnoreCase("file") && method.equalsIgnoreCase("TransitToSiblingView")){
 					String fileID = defFile.getDefFileID();
 					if(dic.objectForKey("pageName").toString().length() > 0){
 						fileID = defFile.getDefFileID().replace(defFile.getDefFileID().substring(defFile.getDefFileID().lastIndexOf("page_")), dic.objectForKey("pageName").toString());
 					}
 					if(dic.objectForKey("targetPage") != null)
	 					pageController.setFile(parseDefFile((NSDictionary) dic.objectForKey(key), genApp,
	 							fileID, "Sibling"));
 				}else {
					pageController.setFile(parseDefFile((NSDictionary) dic.objectForKey(key), genApp,
											defFile.getDefFileID(), "Actions"));
 				}
			}
			else if (key.equalsIgnoreCase("tab"))
				pageController.setTab(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("resetEvent"))
				pageController.setResetEvent(((NSNumber) dic.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("name"))
				pageController.setName(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("value") || key.equalsIgnoreCase("refTargetObject"))
				pageController.setValue(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("fromName"))
				pageController.setFromName(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("numberFormat"))
				pageController.setNumberFormat(null);
			else if (key.equalsIgnoreCase("moveAction"))
				pageController.setMoveAction(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("transitionStyle"))
				pageController.setTransitionStyle(dic.objectForKey(key)
						.toString());
			else if (key.equalsIgnoreCase("tableName"))
				pageController.setTableName(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("groupName"))
				pageController.setGroupName(dic.objectForKey(key).toString());// transferData
			else if (key.equalsIgnoreCase("transferData"))
				pageController.setTransferData(((NSNumber) dic
						.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("prefix"))
				pageController.setPrefix(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("result"))
				pageController.setResult(dic.objectForKey(key).toString());
			/*else if (key.equalsIgnoreCase("Reference"))
				pageController.setReference(((NSNumber) dic.objectForKey(key))
						.boolValue());*/
			else if (key.equalsIgnoreCase("RSSFeedURL"))
				pageController.setRSSFeedURL(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("actions"))
				action.setEvent(parseEvent(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
			else if (key.equalsIgnoreCase("condition"))
				pageController.setCondition(ETCParser
						.parseCondition((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("targetPage"))
				pageController.setTargetPage(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("pageName")){
 				if(method.equalsIgnoreCase("TransitToSiblingView"))
 					pageController.setSiblingPage(dic.objectForKey(key).toString());
 				else
 					pageController.setPageName(dic.objectForKey(key).toString());
 			}
			else if (key.equalsIgnoreCase("animationType"))
				pageController.setTransition(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("transition"))
				pageController.setTransitType(dic.objectForKey(key).toString());
			else
				logger.debug("parsePageController parse: Unknown key found: "
						+ key);
		}
		// return pageController;
		return (PageController) parsePageNameFromController(dic, defFile,
				pageController);
	}

	public static MediaController parseMediaController(NSDictionary dic,
			String method, GenApp genApp, Action action, DefFile defFile)
			throws Exception {
		MediaController mediaController = new MediaController(method);
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("media")
					|| key.equalsIgnoreCase("mediatype")) {// side
				mediaController.setMedia(dic.objectForKey(key).toString());
			} else if (key.equalsIgnoreCase("VideoFile")) {
				mediaController.setFile(AttributeParser
						.parseVideoFile((NSDictionary) dic.objectForKey(key)));
			} else if (key.equalsIgnoreCase("SoundFile")) {
				mediaController.setFile(AttributeParser
						.parseSoundFile((NSDictionary) dic.objectForKey(key)));
			} else if (key.equalsIgnoreCase("library")) {
				mediaController.setLibrary(dic.objectForKey(key).toString());
			} else if (key.equalsIgnoreCase("side")) {
				mediaController.setSide(dic.objectForKey(key).toString());
			} else if (key.equalsIgnoreCase("actions")) {
				action.setEvent(parseEvent(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
			} else if (key.equalsIgnoreCase("condition")) {
				mediaController.setCondition(ETCParser
						.parseCondition((NSDictionary) dic.objectForKey(key)));
			} else if (key.equalsIgnoreCase("name")) {
				mediaController.setTargetUI(dic.objectForKey(key).toString());
			} else if (key.equalsIgnoreCase("targetUIPart")) {
				mediaController.setTargetUI(dic.objectForKey(key).toString());
			} else if (key.equalsIgnoreCase("target")) {
				mediaController.setLibrary(dic.objectForKey(key).toString());
			} else if (key.equalsIgnoreCase("sourceUIPart")) {
				mediaController.setSourceUI(dic.objectForKey(key).toString());
			} else if (key.equalsIgnoreCase("source")) {
				mediaController.setSource(dic.objectForKey(key).toString());
			} else if (key.equalsIgnoreCase("variablename")) {
				mediaController.setMedia(dic.objectForKey(key).toString());
			}else if (key.equalsIgnoreCase("multiScan")) {
 				mediaController.setMultiScan(((NSNumber) dic.objectForKey(key)).boolValue());
			}else if (key.equalsIgnoreCase("filename")) {
				mediaController.setFile(AttributeParser
						.parseSoundFile((NSDictionary) dic.objectForKey(key)));
			}else if (key.equalsIgnoreCase("value")){		// for 'QRGenerate' action. If any other media action support it, then change setter-getter.
				mediaController.setSourceUI(dic.objectForKey(key).toString());
			}else if (key.equalsIgnoreCase("targetPage"))
				mediaController.setTargetPage(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("isThumbnail"))
				mediaController.setThumbnail(((NSNumber) dic.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("refThumbnailUI"))
				mediaController.setRefThumbnailUI(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("showprogress"))
				mediaController.setShowProgress(((NSNumber) dic.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("refProgressUI"))
				mediaController.setRefProgressUI(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("targetLocation"))
				mediaController.setTargetLocation(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("multiple"))
				mediaController.setMultiple(((NSNumber) dic.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("limit"))
				mediaController.setLimit(((NSNumber) dic.objectForKey(key)).intValue());
			else if (key.equalsIgnoreCase("watermark"))
				mediaController.setWatermark(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("showWaterMark"))
				mediaController.setShowWaterMark(((NSNumber) dic.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("watermarkType"))
				mediaController.setWatermarkType(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("watermarkText"))
				mediaController.setWatermarkText(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("watermarkPosition"))
				mediaController.setWatermarkPosition(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("watermarkTextColor"))
				mediaController.setWatermarkTextColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("watermarkImage"))
				mediaController.setWatermarkImage(AttributeParser
						.parseImageFile((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("watermarkImageWidth"))
				mediaController.setWatermarkImageWidth(((NSNumber) dic.objectForKey(key)).intValue());
			else if (key.equalsIgnoreCase("watermarkImageHeight"))
				mediaController.setWatermarkImageHeight(((NSNumber) dic.objectForKey(key)).intValue());
			else if (key.equalsIgnoreCase("photoquality"))
				mediaController.setPhotoquality(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("contenttype"))
				mediaController.setContenttype(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("type")) {
				mediaController.setType(dic.objectForKey(key).toString());
			}
			else if (key.equalsIgnoreCase("refMediaList")) {
//				JSONObject rec = parseRecord(
//						(NSDictionary) dic.objectForKey(key), genApp, defFile);
//				mediaController.setRefMediaList(rec.toJSONString());
			}else if (key.equalsIgnoreCase("refMediaUIs")) {
				JSONObject rec = parseRecord(
						(NSDictionary) dic.objectForKey(key), genApp, defFile);
				mediaController.setRefMediaUI(rec.toJSONString());
			}else if (key.equalsIgnoreCase("refFiletype")) {
				mediaController.setRefFiletype(dic.objectForKey(key).toString());
			}else if (key.equalsIgnoreCase("filetype")) {
				mediaController.setFiletype(dic.objectForKey(key).toString());
			}else if (key.equalsIgnoreCase("fileNameUI")) {
				mediaController.setFileNameUI(dic.objectForKey(key).toString());
			}else if (key.equalsIgnoreCase("fileSizeUI")) {
				mediaController.setFileSizeUI(dic.objectForKey(key).toString());
			}else if (key.equalsIgnoreCase("refNameUIList")) {
				JSONObject rec = parseRecord(
						(NSDictionary) dic.objectForKey(key), genApp, defFile);
				mediaController.setRefMediaList(rec.toJSONString());
			}else if (key.equalsIgnoreCase("refSizeUIList")) {
				JSONObject rec = parseRecord(
						(NSDictionary) dic.objectForKey(key), genApp, defFile);
				mediaController.setRefMediaList(rec.toJSONString());
			}
			else {
				logger.debug("parseMediaController parse: Unknown key found: "
						+ key);
			}
		}
		return (MediaController) parsePageNameFromController(dic, defFile,
				mediaController);
	}

	public static MediaController parseFileController(NSDictionary dic,
			String method, GenApp genApp, Action action, DefFile defFile) throws Exception {
		MediaController mediaController = new MediaController(method);
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("media")
					|| key.equalsIgnoreCase("mediatype")) {// side
				mediaController.setMedia(dic.objectForKey(key).toString());
			} else if (key.equalsIgnoreCase("actions")) {
				action.setEvent(parseEvent(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
			} else if (key.equalsIgnoreCase("condition")) {
				mediaController.setCondition(ETCParser
						.parseCondition((NSDictionary) dic.objectForKey(key)));
			} else if (key.equalsIgnoreCase("name")) {
				mediaController.setTargetUI(dic.objectForKey(key).toString());
			} else if (key.equalsIgnoreCase("targetUIPart")) {
				mediaController.setTargetUI(dic.objectForKey(key).toString());
			} else if (key.equalsIgnoreCase("type")) {
				mediaController.setFiletype(dic.objectForKey(key).toString());
			} else if (key.equalsIgnoreCase("file")){
				mediaController.setFile(AttributeParser.parseOtherFile((NSDictionary) dic
																		.objectForKey(key)));
			}else if (key.equalsIgnoreCase("filename")) {
				mediaController.setFilename(dic.objectForKey(key).toString());
			} else if (key.equalsIgnoreCase("targetPage"))
				mediaController.setTargetPage(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("showprogress"))
				mediaController.setShowProgress(((NSNumber) dic.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("refProgressUI"))
				mediaController.setRefProgressUI(dic.objectForKey(key).toString());
			else {
				logger.debug("parseFileController parse: Unknown key found: "
						+ key);
			}
		}
		return (MediaController) parsePageNameFromController(dic, defFile,
				mediaController);
	}

	public static WarningController parseWarningController(NSDictionary dic,
			String method, GenApp genApp, Action action, DefFile defFile)
			throws Exception {
		WarningController warningActionSheet = new WarningController(method);
		NSDictionary dicSheet = (NSDictionary) dic
				.objectForKey("ActionSheetDef");
		if (dicSheet != null)
			dic = dicSheet;

		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("Title"))
				warningActionSheet.setTitle(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("Style"))
				warningActionSheet.setStyle(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("message"))
				warningActionSheet.setMessage(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("cancelTitle"))
				warningActionSheet.setCancelTitle(dic.objectForKey(key)
						.toString());
			else if (key.equalsIgnoreCase("destructiveButtonTitle"))
				warningActionSheet.setDestructiveButtonTitle(dic.objectForKey(
						key).toString());
			else if (key.equalsIgnoreCase("otherBtnTitles")) {
				warningActionSheet.setOtherBtnTitles(ETCParser
						.parseStringArray(((NSArray) dic.objectForKey(key))
								.getArray()));
			} 
			else if (key.equalsIgnoreCase("timeout"))
				warningActionSheet.setTimeOut((dic.objectForKey(key).toString())
								.toString());
			else if (key.equalsIgnoreCase("type"))
				warningActionSheet.setStyle(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("indicator"))
				warningActionSheet.setIndicatorFile(AttributeParser
						.parseImageFile((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("actions"))
				action.setEvent(parseEvent(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
			else if (key.equalsIgnoreCase("condition"))
				warningActionSheet.setCondition(ETCParser
						.parseCondition((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("name"))
				warningActionSheet.setName(dic.objectForKey(key).toString());
			else
				// throw new Exception("Unknown Key: "+key);
				logger.debug("parseWarningController parse: Unknown key found: "
						+ key);
		}
		return (WarningController) parsePageNameFromController(dic, defFile,
				warningActionSheet);
	}
	
	
	public static PushNotificationController parsePushNotificationController(NSDictionary dic,
			String method, GenApp genApp, Action action, DefFile defFile)
			throws Exception {
		PushNotificationController pushNotificationController = new PushNotificationController();
		pushNotificationController.setMethod(method);
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("Title"))
				pushNotificationController.setTitle(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("userid")) 
				pushNotificationController.setUserId(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("clientid")) 
				pushNotificationController.setClientId(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("messageText")) 
				pushNotificationController.setMessage(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("group")) 
				pushNotificationController.setGroup(dic.objectForKey(key).toString());
			else
				// throw new Exception("Unknown Key: "+key);
				logger.debug("parseWarningController parse: Unknown key found: "
						+ key);
		}
		return (PushNotificationController) parsePageNameFromController(dic, defFile,
				pushNotificationController);
	}
	

	public static SystemController parseSystemController(NSDictionary dic,
			String method, GenApp genApp, Action action, DefFile defFile)
			throws Exception {
		SystemController systemController = new SystemController(method);
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("command")) {
				systemController.setCommand(dic.objectForKey(key).toString());
			}else if (key.equalsIgnoreCase("name")) {
			    systemController.setCallbackUI(dic.objectForKey(key).toString());
			} else if (key.equalsIgnoreCase("condition")) {
				systemController.setCondition(ETCParser
						.parseCondition((NSDictionary) dic.objectForKey(key)));
			}else if(key.equalsIgnoreCase("targetURL")){
				systemController.setTargetURL(dic.objectForKey(key).toString());
			}else if(key.equalsIgnoreCase("nextList")){
				systemController.setNextList(parseList(((NSArray) dic.objectForKey(key)).getArray()));
			}else if(key.equalsIgnoreCase("initialList")){
				systemController.setIntialList(parseList(((NSArray) dic.objectForKey(key)).getArray()));
			}else if(key.equalsIgnoreCase("where")){
				systemController.setLoopCondition(dic.objectForKey(key).toString());
			}
		}

		return (SystemController) parsePageNameFromController(dic, defFile,
				systemController);
	}

	private static ArrayList<LoopList> parseList(NSObject[] list) {
		
		ArrayList<LoopList> loopList = new ArrayList<LoopList>();
		for (NSObject o : list) {
			NSDictionary dictionary = (NSDictionary) o;
			LoopList data = new LoopList();
			for (String key : dictionary.allKeys()) {
				if (key.equalsIgnoreCase("key"))
					data.setKey(dictionary.objectForKey(key)
							.toString());
				else if (key.equalsIgnoreCase("value"))
					data.setValue(dictionary.objectForKey(key)
							.toString());
				

			}
			loopList.add(data);

		}

		return loopList;
	}

	private static NPEActionSheetController parseNPEActionSheetController(
			NSDictionary dic, String method, GenApp genApp, Action action,
			DefFile defFile) throws Exception {
		NPEActionSheetController npeWarningActionSheet = new NPEActionSheetController(
				method);
		NSDictionary dicSheet = (NSDictionary) dic
				.objectForKey("ActionSheetDef");
		if (dicSheet != null)
			dic = dicSheet;
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("Title"))
				npeWarningActionSheet
						.setTitle(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("Style"))
				npeWarningActionSheet
						.setStyle(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("cancelTitle"))
				npeWarningActionSheet.setCancelTitle(dic.objectForKey(key)
						.toString());
			else if (key.equalsIgnoreCase("destructiveButtonTitle"))
				npeWarningActionSheet.setDestructiveButtonTitle(dic
						.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("otherBtnTitles")) {
				npeWarningActionSheet.setOtherBtnTitles(ETCParser
						.parseActionSheetButtons(
								((NSArray) dic.objectForKey(key)).getArray(),
								genApp, defFile));

			} else if (key.equalsIgnoreCase("actions"))
				action.setEvent(parseEvent(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
			else if (key.equalsIgnoreCase("condition"))
				npeWarningActionSheet.setCondition(ETCParser
						.parseCondition((NSDictionary) dic.objectForKey(key)));
			else
				// throw new Exception("Unknown Key: "+key);
				logger.debug("parseWarningController parse: Unknown key found: "
						+ key);
		}
		return (NPEActionSheetController) parsePageNameFromController(dic,
				defFile, npeWarningActionSheet);
	}

}
