package com.mobilous.mobileweb.app;

public class LocationDefs extends MainFile {

	private boolean status = false;
	private double lattitude = -1;
	private double longitude = -1;
	private int radius = 0;
	private String accuracy = "";
	private String areaID = "";
	private String areaName = "";
	private String course = "";
	private String regionID = "";
	private String regionName = "";
	private String summary = "";
	private String description = "";

	public boolean getStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public double getLattitude() {
		return lattitude;
	}

	public void setLattitude(double lattitude) {
		this.lattitude = lattitude;
	}

	public double getLongitude() {
		return longitude;
	}

	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}

	public int getRadius() {
		return radius;
	}

	public void setRadius(int radius) {
		this.radius = radius;
	}

	public String getAccuracy() {
		return accuracy;
	}

	public void setAccuracy(String accuracy) {
		this.accuracy = accuracy;
	}

	public String getAreaID() {
		return areaID;
	}

	public void setAreaID(String areaID) {
		this.areaID = areaID;
	}

	public String getAreaName() {
		return areaName;
	}

	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}

	public String getCourse() {
		return course;
	}

	public void setCourse(String course) {
		this.course = course;
	}

	public String getRegionID() {
		return regionID;
	}

	public void setRegionID(String regionID) {
		this.regionID = regionID;
	}

	public String getRegionName() {
		return regionName;
	}

	public void setRegionName(String regionName) {
		this.regionName = regionName;
	}

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	public String toString() {
		return "LocationDefs [status=" + status + ", lattitude=" + lattitude
				+ ", longitude=" + longitude + ", radius=" + radius
				+ ", accuracy=" + accuracy + ", areaID=" + areaID
				+ ", areaName=" + areaName + ", course=" + course
				+ ", regionID=" + regionID + ", regionName=" + regionName
				+ ", summary=" + summary + ", description=" + description + "]";
	}

	// public String toString(){
	// StringBuffer sb = new StringBuffer();
	// sb.append("status = ").append(status).append('\n')
	// .append("lattitude = ").append(lattitude).append('\n')
	// .append("longitude = ").append(longitude).append('\n')
	// .append("radius = ").append(radius).append('\n')
	// .append("accuracy = ").append(accuracy).append('\n')
	// .append("AreaID = ").append(areaID).append('\n')
	// .append("AreaName = ").append(areaName).append('\n')
	// .append("Course = ").append(course).append('\n')
	// .append("RegionID = ").append(regionID).append('\n')
	// .append("RegionName = ").append(regionName).append('\n')
	// .append("Summary = ").append(summary).append('\n')
	// .append("Description = ").append(description).append('\n');
	// return sb.toString();
	// }
}
