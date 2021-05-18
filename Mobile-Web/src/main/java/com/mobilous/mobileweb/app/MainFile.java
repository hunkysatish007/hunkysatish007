package com.mobilous.mobileweb.app;

import java.util.ArrayList;

import com.mobilous.mobileweb.attribute.ImageFile;
import com.mobilous.mobileweb.resource.Resource;
import com.mobilous.mobileweb.event.Event;

public class MainFile extends GenApp {

	private String version = "";
	private String projectName = "";
	private String fileName = "";
	private String title = "";
	private String locationServer = "";
	private String devicetype = "phone";
	private String clientIdProduction = "";
	private String redirectURIProduction = "";
	private String clientIdPreview = "";
	private String redirectURIPreview = "";
	private int projectBuilder = 0;
	private ArrayList<LocationDefs> locationDefs = null;
	private ArrayList<TableDefs> tableDefs = null;
	private ArrayList<TableDefs> remoteTblDefs = null;
	private ArrayList<Event> pnevents = null;
	private ArrayList<String> pnconfig = null;//
	private ArrayList<Tabs> tabs = null;
	private ArrayList<TabSet> tabSets = null;
	private ArrayList<Screen> screens = null;
	private Resource resource = new Resource();
	private ImageFile splashScreenMobile = null;
	private ImageFile splashScreenTablet = null;
	private ArrayList<Event> appevents = null;
	private String webPNKey = "";
	private ArrayList<String> webPNConfig = null;//
	
	private int numberOfScreens = 1;

	private boolean isPotrait = true;
	
	private boolean release = false;
	
	private String GoogleMapKeyDevelopment = "";//
	private String GoogleMapKeyProduction = "";//
	private boolean GoogleMapUsed = false;
	
	public String getDevicetype() {
		return devicetype;
	}

	public void setDevicetype(String devicetype) {
		this.devicetype = devicetype;
	}

	public ArrayList<TableDefs> getRemoteTblDefs() {
		return remoteTblDefs;
	}

	public void setRemoteTblDefs(ArrayList<TableDefs> remoteTblDefs) {
		this.remoteTblDefs = remoteTblDefs;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public String getTitle() {
		return title;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public ArrayList<LocationDefs> getLocationDefs() {
		return locationDefs;
	}

	public void setLocationDefs(ArrayList<LocationDefs> locationDef) {
		this.locationDefs = locationDef;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getLocationServer() {
		return locationServer;
	}

	public void setLocationServer(String locationServer) {
		this.locationServer = locationServer;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getClientIdProduction() {
		return clientIdProduction;
	}

	public void setClientIdProduction(String clientIdProduction) {
		this.clientIdProduction = clientIdProduction;
	}

	public String getRedirectURIProduction() {
		return redirectURIProduction;
	}

	public void setRedirectURIProduction(String redirectURIProduction) {
		this.redirectURIProduction = redirectURIProduction;
	}

	public int getProjectBuilder() {
		return projectBuilder;
	}

	public void setProjectBuilder(int projectBuilder) {
		this.projectBuilder = projectBuilder;
	}

	public String getClientIdPreview() {
		return clientIdPreview;
	}

	public void setClientIdPreview(String clientIdPreview) {
		this.clientIdPreview = clientIdPreview;
	}

	public String getRedirectURIPreview() {
		return redirectURIPreview;
	}

	public void setRedirectURIPreview(String redirectURIPreview) {
		this.redirectURIPreview = redirectURIPreview;
	}

	public ArrayList<TableDefs> getTableDefs() {
		return tableDefs;
	}

	public void setTableDefs(ArrayList<TableDefs> tableDefs) {
		this.tableDefs = tableDefs;
	}

	public ArrayList<Tabs> getTabs() {
		return tabs;
	}

	public void setTabs(ArrayList<Tabs> tabs) {
		this.tabs = tabs;
	}

	public ArrayList<TabSet> getTabSets() {
		return tabSets;
	}

	public void setTabSets(ArrayList<TabSet> tabSets) {
		this.tabSets = tabSets;
	}

	public ArrayList<Screen> getScreens() {
		return screens;
	}

	public void setScreens(ArrayList<Screen> screens) {
		this.screens = screens;
	}

	public void setSplashScreenMobile(ImageFile splashScreenMobile) {
		this.splashScreenMobile = splashScreenMobile;
	}

	public ImageFile getSplashScreenMobile() {
		return splashScreenMobile;
	}

	public void setSplashScreenTablet(ImageFile splashScreenTablet) {
		this.splashScreenTablet = splashScreenTablet;
	}

	public ImageFile getSplashScreenTablet() {
		return splashScreenTablet;
	}

	@Override
	public String toString() {
		return "MainFile [fileName=" + fileName + ", title=" + title
				+ ", locationServer=" + locationServer + ", locationDefs="
				+ locationDefs + ", tableDefs=" + tableDefs + ", tabs=" + tabs
				+ "]";
	}

	/**
	 * @param resource
	 *            the resource to set
	 */
	public void setResource(Resource resource) {
		this.resource = resource;
	}

	/**
	 * @return the resource
	 */
	public Resource getResource() {
		return resource;
	}

	public boolean isPotrait() {
		return isPotrait;
	}

	public void setPotrait(boolean isPotrait) {
		this.isPotrait = isPotrait;
	}

	public int getNumberOfScreens() {
		return numberOfScreens;
	}

	public void setNumberOfScreens(int numberOfScreens) {
		this.numberOfScreens = numberOfScreens;
	}

	public boolean isRelease() {
		return release;
	}

	public void setRelease(boolean release) {
		this.release = release;
	}

	public ArrayList<Event> getPnevents() {
		return pnevents;
	}

	public void setPnevents(ArrayList<Event> pnevents) {
		this.pnevents = pnevents;
	}

	public ArrayList<String> getPNConfig() {
 		return pnconfig;
 	}
 
 	public void setPNConfig(ArrayList<String> pnconfig) {
 		this.pnconfig = pnconfig;
 	}
 
	public String getGoogleMapKeyDevelopment() {
		return GoogleMapKeyDevelopment;
	}

	public void setGoogleMapKeyDevelopment(String googleMapKeyDevelopment) {
		GoogleMapKeyDevelopment = googleMapKeyDevelopment;
	}

	public String getGoogleMapKeyProduction() {
		return GoogleMapKeyProduction;
	}

	public void setGoogleMapKeyProduction(String googleMapKeyProduction) {
		GoogleMapKeyProduction = googleMapKeyProduction;
	}

	public boolean isGoogleMapUsed() {
		return GoogleMapUsed;
	}

	public void setGoogleMapUsed(boolean googleMapUsed) {
		GoogleMapUsed = googleMapUsed;
	}

	public ArrayList<Event> getAppevents() {
		return appevents;
	}

	public void setAppevents(ArrayList<Event> appevents) {
		this.appevents = appevents;
	}

	public String getWebPNKey() {
		return webPNKey;
	}

	public void setWebPNKey(String webPNKey) {
		this.webPNKey = webPNKey;
	}

	public ArrayList<String> getWebPNConfig() {
		return webPNConfig;
	}

	public void setWebPNConfig(ArrayList<String> webPNConfig) {
		this.webPNConfig = webPNConfig;
	}
 

}
