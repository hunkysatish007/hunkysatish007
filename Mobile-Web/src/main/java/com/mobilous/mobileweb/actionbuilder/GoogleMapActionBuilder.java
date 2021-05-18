package com.mobilous.mobileweb.actionbuilder;

import com.mobilous.mobileweb.action.Action;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.param.MapController;
import com.mobilous.mobileweb.ui.BaseView;

public class GoogleMapActionBuilder {
	
	public static Object build(GenApp genapp, BaseView baseview, Event event, Action action) {
		StringBuilder actionstr = new StringBuilder();
		
		MapController gmap = (MapController) action.getParameters();
		StringBuilder applyConditionIfAny = new StringBuilder();
		
		if(gmap.getCondition() != null){
			applyConditionIfAny.append(ConditionBuilder.setCondition(gmap.getCondition(), baseview));
		}
		
		if(gmap.getMethod().equalsIgnoreCase("ShowLocationInfo")){
			/*
			 	{method:"Delete", category:"ComAction",params:{servicename: 'mobilous',table: 'matoremote',where: "id = '[id]'",}
			 */
			actionstr.append("{method:\"LocationInfo\", category:\"GoogleMapControl\", name:\"").append(gmap.getName()).append("\",")
				.append(" params:{location:\"").append(gmap.getLocationName()).append("\", mode:\"").append(gmap.getMode()).append("\", targetpage:\"")
				.append(gmap.getTargetPage()).append("\"}").append(applyConditionIfAny).append("},");
		}
		
		if(gmap.getMethod().equalsIgnoreCase("ShowRegionInfo")){
			actionstr.append("{method:\"RegionInfo\", category:\"GoogleMapControl\", name:\"").append(gmap.getName()).append("\",")
				.append(" params:{location:\"").append(gmap.getRegionName()).append("\", mode:\"").append(gmap.getMode()).append("\", targetpage:\"")
				.append(gmap.getTargetPage()).append("\"}").append(applyConditionIfAny).append("},");
		}
		
		if(gmap.getMethod().equalsIgnoreCase("ShowAreaInfo")){
			actionstr.append("{method:\"AreaInfo\", category:\"GoogleMapControl\", name:\"").append(gmap.getName()).append("\",")
				.append(" params:{location:\"").append(gmap.getAreaName()).append("\", mode:\"").append(gmap.getMode()).append("\", targetpage:\"")
				.append(gmap.getTargetPage()).append("\"}").append(applyConditionIfAny).append("},");
		}
		
		if(gmap.getMethod().equalsIgnoreCase("OpenTargetScope")){
			actionstr.append("{method:\"OpenTargetScope\", category:\"GoogleMapControl\", name:\"").append(gmap.getName()).append("\",")
			.append("params:{targetpage:\"").append(gmap.getTargetPage()).append("\"}").append(applyConditionIfAny).append("},");
		}
		
		if(gmap.getMethod().equalsIgnoreCase("CloseTargetScope")){
			actionstr.append("{method:\"CloseTargetScope\", category:\"GoogleMapControl\", name:\"").append(gmap.getName()).append("\",")
			.append("params:{targetpage:\"").append(gmap.getTargetPage()).append("\"}").append(applyConditionIfAny).append("},");
		}
		
		if(gmap.getMethod().equalsIgnoreCase("OpenCurrentPosition")){
			actionstr.append("{method:\"OpenCurrentPosition\", category:\"GoogleMapControl\", name:\"").append(gmap.getName()).append("\",")
			.append("params:{targetpage:\"").append(gmap.getTargetPage()).append("\"}").append(applyConditionIfAny).append("},");
		}
		
		if(gmap.getMethod().equalsIgnoreCase("CloseCurrentPosition")){
			actionstr.append("{method:\"CloseCurrentPosition\", category:\"GoogleMapControl\", name:\"").append(gmap.getName()).append("\",")
			.append("params:{targetpage:\"").append(gmap.getTargetPage()).append("\"}").append(applyConditionIfAny).append("},");
		}
		
		if(gmap.getMethod().equalsIgnoreCase("ShowRoute")){
			actionstr.append("{method:\"ShowRoute\", category:\"GoogleMapAction\", name:\"").append(gmap.getName()).append("\",")
			.append(" params:{traffic:\"").append(gmap.getTraffic()).append("\", highway:\"").append(gmap.isHighway())
			.append("\", fromlocation:\"").append(gmap.getFromLocation()).append("\", tolocation:\"").append(gmap.getToLocation())
			.append("\", targetpage:\"")
			.append(gmap.getTargetPage()).append("\"}").append(applyConditionIfAny).append("},");
		}
		
		if(gmap.getMethod().equalsIgnoreCase("ClearRoute")){
			actionstr.append("{method:\"ClearRoute\", category:\"GoogleMapAction\", name:\"").append(gmap.getName()).append("\",")
			.append("params:{targetpage:\"").append(gmap.getTargetPage()).append("\"}").append(applyConditionIfAny).append("},");
		}
				
		if(gmap.getMethod().equalsIgnoreCase("RouteList")){
			actionstr.append("{method:\"ShowRouteList\", category:\"GoogleMapAction\", name:\"").append(gmap.getName()).append("\",")
			.append("params:{targetpage:\"").append(gmap.getTargetPage()).append("\"}").append(applyConditionIfAny).append("},");
		}

		if(gmap.getMethod().equalsIgnoreCase("StartCheckPoint")){
			actionstr.append("{method:\"StartCheckPoint\", category:\"GoogleMapAction\", name:\"").append(gmap.getName()).append("\",")
			.append("params:{targetpage:\"").append(gmap.getTargetPage()).append("\"}").append(applyConditionIfAny).append("},");
		}
		
		if(gmap.getMethod().equalsIgnoreCase("NextCheckPoint")){
			actionstr.append("{method:\"NextCheckPoint\", category:\"GoogleMapAction\", name:\"").append(gmap.getName()).append("\",")
			.append("params:{targetpage:\"").append(gmap.getTargetPage()).append("\"}").append(applyConditionIfAny).append("},");
		}

		if(gmap.getMethod().equalsIgnoreCase("PrevCheckPoint")){
			actionstr.append("{method:\"PrevCheckPoint\", category:\"GoogleMapAction\", name:\"").append(gmap.getName()).append("\",")
			.append("params:{targetpage:\"").append(gmap.getTargetPage()).append("\"}").append(applyConditionIfAny).append("},");
		}
		
		// For Markers Actions..
		/*if(gmap.getMethod().equalsIgnoreCase("AddMarker")){
			actionstr.append("{method:\"AddMarker\", category:\"GoogleMapAction\", name:\"").append(gmap.getName()).append("\",")
			.append("params:{targetpage:\"").append(gmap.getTargetPage()).append("\",markerid:\"").append(gmap.getMarkerId()).append("\",title:\"")
			.append(gmap.getTitle()).append("\",latitude:\"").append(gmap.getLatitude()).append("\",longitude:\"").append(gmap.getLongitude()).append("\"}").append(applyConditionIfAny).append("}");
		}*/
		
		if(gmap.getMethod().equalsIgnoreCase("AddPinMarker")){//isCanShowCallOut
			actionstr.append("{method:\"AddPinMarker\", category:\"GoogleMapAction\", name:\"").append(gmap.getName()).append("\",")
			.append("params:{targetpage:\"").append(gmap.getTargetPage()).append("\",markerid:\"").append(gmap.getMarkerId()).append("\",title:\"")
			.append(gmap.getTitle()).append("\",subtitle:\"").append(gmap.getSubtitle()).append("\",leftview:\"").append(gmap.getLeftView()).append("\",rightview:\"")
			.append(gmap.getRightView()).append("\",address:\"")
			.append(gmap.getAddress()).append("\",showcallout:").append(gmap.isCanShowCallOut()).append(",latitude:\"").append(gmap.getLatitude()).append("\",longitude:\"").append(gmap.getLongitude()).append("\"")
			.append("}").append(applyConditionIfAny).append("},");
		}
		
		if(gmap.getMethod().equalsIgnoreCase("AddMarker")){//isCanShowCallOut
			actionstr.append("{method:\"AddCustomMarker\", category:\"GoogleMapAction\", name:\"").append(gmap.getName()).append("\",")
			.append("params:{targetpage:\"").append(gmap.getTargetPage()).append("\",markerid:\"").append(gmap.getMarkerId()).append("\",title:\"")
			.append(gmap.getTitle()).append("\",subtitle:\"").append(gmap.getSubtitle()).append("\",markerimage:\"")
			.append(gmap.getMarkerImageFile().getFileName()+"."+gmap.getMarkerImageFile().getFileExt()).append("\",leftviewimage:\"").append(gmap.getLeftImageFile().getFileName()+"."+gmap.getLeftImageFile().getFileExt()).append("\",rightviewimage:\"")
			.append(gmap.getRightImageFile().getFileName()+"."+gmap.getRightImageFile().getFileExt()).append("\",address:\"")
			.append(gmap.getAddress()).append("\",showcallout:").append(gmap.isCanShowCallOut()).append(",latitude:\"").append(gmap.getLatitude()).append("\",longitude:\"").append(gmap.getLongitude()).append("\",markertype:\"").append(gmap.getMarkerType()).append("\",visible:\"").append(gmap.getVisible()).append("\",anchorx:\"").append(gmap.getAnchorX()).append("\",anchory:\"").append(gmap.getAnchorY()).append("\"")
			.append("}").append(applyConditionIfAny).append("},");
		}
		
		if(gmap.getMethod().equalsIgnoreCase("removeMarker")){
			actionstr.append("{method:\"removeMarker\", category:\"GoogleMapAction\", name:\"").append(gmap.getName()).append("\",")
			.append("params:{targetpage:\"").append(gmap.getTargetPage()).append("\",markerid:\"").append(gmap.getMarkerId()).append("\"}").append(applyConditionIfAny).append("},");
		}
		
		if(gmap.getMethod().equalsIgnoreCase("StopGPS")){
			actionstr.append("{method:\"StopGPS\", category:\"MotionAction\",")
			.append("params:{targetpage:\"").append(gmap.getPageName(genapp)).append("\"}").append(applyConditionIfAny).append("},");
		}
		
		if(gmap.getMethod().equalsIgnoreCase("StartGPS")){
			actionstr.append("{method:\"StartGPS\", category:\"MotionAction\",")
			.append("params:{targetpage:\"").append(gmap.getPageName(genapp)).append("\",accuracy:\"").append(gmap.getAccuracy()).append("\"}").append(applyConditionIfAny).append("},");
		}
		
		if(gmap.getMethod().equalsIgnoreCase("StartGPSTrack")){
			actionstr.append("{method:\"StartGPSTrack\", category:\"MotionAction\",")
			.append("params:{targetpage:\"").append(gmap.getPageName(genapp)).append("\",filename:\"")
			.append(gmap.getFilename()).append("\"}").append(applyConditionIfAny).append("},");
		}
		
		if(gmap.getMethod().equalsIgnoreCase("StopGPSTrack")){
			actionstr.append("{method:\"StopGPSTrack\", category:\"MotionAction\"")
			.append(applyConditionIfAny).append("},");
		}
		
		if(gmap.getMethod().equalsIgnoreCase("ConvertGPSLogToFile")){
			actionstr.append("{method:\"ConvertGPSLogToFile\", category:\"MotionAction\"")
			.append(applyConditionIfAny).append("},");
		}
		
		if(gmap.getMethod().equalsIgnoreCase("LoadFixedRouteFile")){
			actionstr.append("{method:\"LoadFixedRouteFile\", category:\"GoogleMapAction\", name:\"").append(gmap.getName()).append("\",")
			.append("params:{targetpage:\"").append(gmap.getTargetPage())
			.append("\",fixedRouteFile:\"").append(gmap.getFixedRouteFile())
			.append("\",fixedRouteFiletype:\"").append(gmap.getFixedRouteFiletype()).append("\"}").append(applyConditionIfAny).append("},");
		}
		
		if(gmap.getMethod().equalsIgnoreCase("ShowFixedRoute")){
			actionstr.append("{method:\"ShowFixedRoute\", category:\"GoogleMapAction\", name:\"").append(gmap.getName()).append("\",")
			.append("params:{targetpage:\"").append(gmap.getTargetPage()).append("\"}").append(applyConditionIfAny).append("},");
		}
		
		if(gmap.getMethod().equalsIgnoreCase("AddWayPoint")){
			actionstr.append("{method:\"AddWayPoint\", category:\"GoogleMapAction\", name:\"").append(gmap.getName()).append("\",")
			.append("params:{targetpage:\"").append(gmap.getTargetPage()).append("\",location:\"").append(gmap.getWayPointLocation()).append("\"}").append(applyConditionIfAny).append("},");
		}
		
		if(gmap.getMethod().equalsIgnoreCase("GetStartStep")){
			actionstr.append("{method:\"GetStartStep\", category:\"GoogleMapAction\", name:\"").append(gmap.getName()).append("\",")
					.append("params:{targetpage:\"").append(gmap.getTargetPage())
					.append("\",location:\"").append(gmap.getWayPointLocation())
					.append("\",address:\"").append(gmap.getAddress())
					.append("\",step:\"").append(gmap.getStep())
					.append("\"}").append(applyConditionIfAny).append("},");
		}
		
		if(gmap.getMethod().equalsIgnoreCase("GetNextStep")){
			actionstr.append("{method:\"GetNextStep\", category:\"GoogleMapAction\", name:\"").append(gmap.getName()).append("\",")
					.append("params:{targetpage:\"").append(gmap.getTargetPage())
					.append("\",location:\"").append(gmap.getWayPointLocation())
					.append("\",address:\"").append(gmap.getAddress())
					.append("\",step:\"").append(gmap.getStep())
					.append("\"}").append(applyConditionIfAny).append("},");
		}
			
		if(gmap.getMethod().equalsIgnoreCase("GetPreviousStep")){
			actionstr.append("{method:\"GetPreviousStep\", category:\"GoogleMapAction\", name:\"").append(gmap.getName()).append("\",")
			.append("params:{targetpage:\"").append(gmap.getTargetPage())
			.append("\",location:\"").append(gmap.getWayPointLocation())
			.append("\",address:\"").append(gmap.getAddress())
			.append("\",step:\"").append(gmap.getStep())
			.append("\"}").append(applyConditionIfAny).append("},");
		}
		
		if(gmap.getMethod().equalsIgnoreCase("GetCurrentStep")){
			actionstr.append("{method:\"GetCurrentStep\", category:\"GoogleMapAction\", name:\"").append(gmap.getName()).append("\",")
			.append("params:{targetpage:\"").append(gmap.getTargetPage())
			.append("\",location:\"").append(gmap.getWayPointLocation())
			.append("\",address:\"").append(gmap.getAddress())
			.append("\",step:\"").append(gmap.getStep())
			.append("\"}").append(applyConditionIfAny).append("},");
		}
		
		if(gmap.getMethod().equalsIgnoreCase("StartGeoFencing")){
			actionstr.append("{method:\"StartGeoFencing\", category:\"MotionAction\",")
			.append("params:{radius:\"").append(gmap.getRadius())
			.append("\"}").append(applyConditionIfAny).append("},");
		}
		
		if(gmap.getMethod().equalsIgnoreCase("StopGeoFencing")){
			actionstr.append("{method:\"StopGeoFencing\", category:\"MotionAction\"")
			.append(applyConditionIfAny).append("},");
		}
		
		return actionstr;
	}

}
