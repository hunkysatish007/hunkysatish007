package com.mobilous.mobileweb.param;

import java.util.ArrayList;

import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.attribute.ImageFile;
import com.mobilous.mobileweb.attribute.Point;
import com.mobilous.mobileweb.etc.Condition;
import com.mobilous.mobileweb.etc.Markers;
import com.mobilous.mobileweb.util.Utility;

public class MapController extends Markers implements Parameters {

	private String pageName = "";
	private String method = "";
	private String name = "";
	private String locationName = "";
	private String mode = "";
	private String regionName = "";
	private String areaName = "";
	private String title = "";
	private String subtitle = "";
	private String leftView = "";
	private String rightView = "";
	private String traffic = "";
	private String accuracy = "";
	private boolean enable = false;
	private boolean asDefault = false;
	private boolean animationDrop = false;
	private boolean canShowCallOut = false;
	private boolean withoutDefault = false;
	private boolean highway = false;
	private String markerId = "";
	private ImageFile leftImageFile = null;
	private ImageFile rightImageFile = null;
	private ImageFile markerImageFile = null;
	private Point anchor = null;
	private ArrayList<Markers> markers = null;
	private Condition condition = null;
	private String targetPage = "";
	private String address = "";
	private String markerType = "";
	private String visible = "";
	private String anchorX = "0";
	private String anchorY = "0";
	private String wayPointLocation = "";
	private String fixedRouteFile = "";
	private String filetype = "";
	private String fixedRouteFiletype = "";
	private String step = "";
	private String filename = "";
	private String radius = "";

	public String getPageName(GenApp genApp) {
		return Utility.getDefFileIDByFilename(genApp, pageName);
	}

	public void setPageName(String pageName) {
		this.pageName = pageName;
	}

	public Condition getCondition() {
		return condition;
	}

	public void setCondition(Condition condition) {
		this.condition = condition;
	}

	private String fromLocation;

	public String getFromLocation() {
		return fromLocation;
	}

	public void setFromLocation(String fromLocation) {
		this.fromLocation = fromLocation;
	}

	public String getToLocation() {
		return toLocation;
	}

	public void setToLocation(String toLocation) {
		this.toLocation = toLocation;
	}

	private String toLocation;

	public MapController(String method) {
		this.method = method;
	}

	@Override
	public String getName() {
		return name;
	}

	@Override
	public void setName(String name) {
		this.name = name;
	}

	public String getLocationName() {
		return locationName;
	}

	public void setLocationName(String locationName) {
		this.locationName = locationName;
	}

	public String getMode() {
		return mode;
	}

	public void setMode(String mode) {
		this.mode = mode;
	}

	public String getRegionName() {
		return regionName;
	}

	public void setRegionName(String regionName) {
		this.regionName = regionName;
	}

	public String getAreaName() {
		return areaName;
	}

	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}

	@Override
	public String getMarkerId() {
		return markerId;
	}

	@Override
	public void setMarkerId(String markerId) {
		this.markerId = markerId;
	}

	public String getAccuracy() {
		return accuracy;
	}

	public void setAccuracy(String accuracy) {
		this.accuracy = accuracy;
	}

	@Override
	public String getTitle() {
		return title;
	}

	@Override
	public void setTitle(String title) {
		this.title = title;
	}

	@Override
	public String getSubtitle() {
		return subtitle;
	}

	@Override
	public void setSubtitle(String subtitle) {
		this.subtitle = subtitle;
	}

	@Override
	public String getLeftView() {
		return leftView;
	}

	@Override
	public void setLeftView(String leftView) {
		this.leftView = leftView;
	}

	@Override
	public String getRightView() {
		return rightView;
	}

	@Override
	public void setRightView(String rightView) {
		this.rightView = rightView;
	}

	public String getTraffic() {
		return traffic;
	}

	public void setTraffic(String traffic) {
		this.traffic = traffic;
	}

	public ImageFile getLeftImageFile() {
		return leftImageFile;
	}

	public void setLeftImageFile(ImageFile leftImageFile) {
		this.leftImageFile = leftImageFile;
	}

	public ImageFile getRightImageFile() {
		return rightImageFile;
	}

	public void setRightImageFile(ImageFile rightImageFile) {
		this.rightImageFile = rightImageFile;
	}

	public ImageFile getMarkerImageFile() {
		return markerImageFile;
	}

	public void setMarkerImageFile(ImageFile markerImageFile) {
		this.markerImageFile = markerImageFile;
	}

	@Override
	public boolean isEnable() {
		return enable;
	}

	@Override
	public void setEnable(boolean enable) {
		this.enable = enable;
	}

	@Override
	public boolean isAsDefault() {
		return asDefault;
	}

	@Override
	public void setAsDefault(boolean asDefault) {
		this.asDefault = asDefault;
	}

	public boolean isAnimationDrop() {
		return animationDrop;
	}

	public void setAnimationDrop(boolean animationDrop) {
		this.animationDrop = animationDrop;
	}

	public boolean isCanShowCallOut() {
		return canShowCallOut;
	}

	public void setCanShowCallOut(boolean canShowCallOut) {
		this.canShowCallOut = canShowCallOut;
	}

	public boolean isWithoutDefault() {
		return withoutDefault;
	}

	public void setWithoutDefault(boolean withoutDefault) {
		this.withoutDefault = withoutDefault;
	}

	public boolean isHighway() {
		return highway;
	}

	public void setHighway(boolean highway) {
		this.highway = highway;
	}

	@Override
	public Point getAnchor() {
		return anchor;
	}

	@Override
	public void setAnchor(Point anchor) {
		this.anchor = anchor;
	}

	public ArrayList<Markers> getMarkers() {
		return markers;
	}

	public void setMarkers(ArrayList<Markers> markers) {
		this.markers = markers;
	}
	
	public void setTargetPage(String targetPage){
		this.targetPage = targetPage;
	}
	
	public String getTargetPage(){
		return this.targetPage;
	}

	@Override
	public void setMethod(String method) {
		this.method = method;
	}

	@Override
	public String getMethod() {
		return method;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getMarkerType() {
		return markerType;
	}

	public void setMarkerType(String markerType) {
		this.markerType = markerType;
	}

	public String getVisible() {
		return visible;
	}

	public void setVisible(String visible) {
		this.visible = visible;
	}

	public String getAnchorX() {
		return anchorX;
	}

	public void setAnchorX(String anchorX) {
		this.anchorX = anchorX;
	}

	public String getAnchorY() {
		return anchorY;
	}

	public void setAnchorY(String anchorY) {
		this.anchorY = anchorY;
	}

	public String getWayPointLocation() {
		return wayPointLocation;
	}

	public void setWayPointLocation(String wayPointLocation) {
		this.wayPointLocation = wayPointLocation;
	}

	public String getFixedRouteFile() {
		return fixedRouteFile;
	}

	public void setFixedRouteFile(String fixedRouteFile) {
		this.fixedRouteFile = fixedRouteFile;
	}

	public String getFiletype() {
		return filetype;
	}

	public void setFiletype(String filetype) {
		this.filetype = filetype;
	}

	public String getStep() {
		return step;
	}

	public void setStep(String step) {
		this.step = step;
	}

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	public String getFixedRouteFiletype() {
		return fixedRouteFiletype;
	}

	public void setFixedRouteFiletype(String fixedRouteFiletype) {
		this.fixedRouteFiletype = fixedRouteFiletype;
	}

	public String getRadius() {
		return radius;
	}

	public void setRadius(String radius) {
		this.radius = radius;
	}
	
	
	
}
