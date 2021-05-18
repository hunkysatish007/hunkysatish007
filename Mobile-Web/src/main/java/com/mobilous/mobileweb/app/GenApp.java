package com.mobilous.mobileweb.app;

import java.util.ArrayList;

public class GenApp {
	public static String instanceURL = "";
	private String startUrl = "";
	private String appTitle = "";
	private String iconTitle = "";
	private boolean dBlog = false;
	private MainFile mainFile = null;
	private ArrayList<String> uiObjectPlugin = null;
	private ArrayList<String> actionPlugin = null;
	private ArrayList<String> deviceObjectPlugin = null;
	private String baseURL = "";
	private String fullBaseURL = "";
	private String userId = "";
	private String projectId = "";
	private int projectBuilder = 0;
	private int uiCounter = 0;
	private int port = 0;
	private String projectstate = "";
	private String applicationState = "";
	private boolean commserverAccess = false;
	// private boolean preview = false;
	private String prefix = "";
	private String CSVRowData = "";
	private String releaseVersion = "";

	private ArrayList<DefFile> pages = new ArrayList<DefFile>();
	private ArrayList<DefFile> splitViewPages = new ArrayList<DefFile>();
	private ArrayList<SplitViewPageSet> splitViewPageSet = new ArrayList<SplitViewPageSet>();
	private ArrayList<DefFileSet> defFileSet = new ArrayList<DefFileSet>();
	private ArrayList<DefFile> pageScrollViewPages = new ArrayList<DefFile>();
	private ArrayList<PageScrollViewPageSet> pageScrollViewPageSet = new ArrayList<PageScrollViewPageSet>();
	
	private int previewScreenId = 0;

	private String index = "";

	public boolean isCommserverAccess() {
		return commserverAccess;
	}

	public void setCommserverAccess(boolean commserverAccess) {
		this.commserverAccess = commserverAccess;
	}

	public int getUiCounter() {
		return uiCounter++;
	}

	public String getProjectstate() {
		return projectstate;
	}

	public void setProjectstate(String projectstate) {
		this.projectstate = projectstate;
	}

	public int getPort() {
		return port;
	}

	public void setPort(int port) {
		this.port = port;
	}

	// public boolean isPreview() {
	// return preview;
	// }
	//
	// public void setPreview(boolean preview) {
	// this.preview = preview;
	// }

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getProjectId() {
		return projectId;
	}

	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}

	public int getProjectBuilder() {
		return projectBuilder;
	}

	public void setProjectBuilder(int projectBuilder) {
		this.projectBuilder = projectBuilder;
	}

	public String getBaseURL() {
		return baseURL;
	}

	public void setBaseURL(String baseURL) {
		this.baseURL = baseURL;
	}

	public String getFullBaseURL() {
		return fullBaseURL;
	}

	public void setFullBaseURL(String fullBaseURL) {
		this.fullBaseURL = fullBaseURL;
	}

	public String getStartUrl() {
		return startUrl;
	}

	public void setStartUrl(String startUrl) {
		this.startUrl = startUrl;
	}

	public String getAppTitle() {
		return appTitle;
	}

	public void setAppTitle(String appTitle) {
		this.appTitle = appTitle;
	}

	public String getIconTitle() {
		return iconTitle;
	}

	public void setIconTitle(String iconTitle) {
		this.iconTitle = iconTitle;
	}

	public boolean isDBLog() {
		return this.dBlog;
	}

	public void setDBLog(boolean dBlog) {
		this.dBlog = dBlog;
	}

	public MainFile getMainFile() {
		return mainFile;
	}

	public void setMainFile(MainFile mainFile) {
		this.mainFile = mainFile;
	}

	public ArrayList<String> getUiObjectPlugin() {
		return uiObjectPlugin;
	}

	public void setUiObjectPlugin(ArrayList<String> uiObjectPlugin) {
		this.uiObjectPlugin = uiObjectPlugin;
	}

	public ArrayList<String> getActionPlugin() {
		return actionPlugin;
	}

	public void setActionPlugin(ArrayList<String> actionPlugin) {
		this.actionPlugin = actionPlugin;
	}

	public ArrayList<String> getDeviceObjectPlugin() {
		return deviceObjectPlugin;
	}

	public void setDeviceObjectPlugin(ArrayList<String> deviceObjectPlugin) {
		this.deviceObjectPlugin = deviceObjectPlugin;
	}

	public ArrayList<DefFile> getPages() {
		return pages;
	}

	public void setPages(ArrayList<DefFile> pages) {
		this.pages = pages;
	}

	public boolean addPages(DefFile defFile) {
		return pages.add(defFile);
	}

	public String getPrefix() {
		return prefix;
	}

	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}

	public String getCSVRowData() {
		return CSVRowData;
	}

	public void setCSVRowData(String cSVRowData) {
		CSVRowData = cSVRowData;
	}

	public String getReleaseVersion() {
		return releaseVersion;
	}

	public void setReleaseVersion(String releaseVersion) {
		this.releaseVersion = releaseVersion;
	}

	@Override
	public String toString() {
		return "GenApp [startUrl=" + startUrl + ", appTitle=" + appTitle
				+ ", iconTitle=" + iconTitle + ", dBlog=" + dBlog
				+ ", mainFile=" + mainFile + ", uiObjectPlugin="
				+ uiObjectPlugin + ", actionPlugin=" + actionPlugin
				+ ", deviceObjectPlugin=" + deviceObjectPlugin + "]";
	}

	public ArrayList<DefFile> getSplitViewPages() {
		return splitViewPages;
	}

	public void addSplitViewPages(ArrayList<DefFile> splitViewPages) {
		this.splitViewPages = splitViewPages;
	}

	public ArrayList<SplitViewPageSet> getSplitViewPageSet() {
		return splitViewPageSet;
	}

	public void addSplitViewPageSet(ArrayList<SplitViewPageSet> splitViewPageSet) {
		this.splitViewPageSet = splitViewPageSet;
	}

	public ArrayList<DefFileSet> getDefFileSet() {
		return defFileSet;
	}

	public void addDefFileSet(ArrayList<DefFileSet> Defiles) {
		this.defFileSet = Defiles;
	}

	public String getIndex() {
		return index;
	}

	public void setIndex(String index) {
		this.index = index;
	}

	public int getPreviewScreenId() {
		return previewScreenId;
	}

	public void setPreviewScreenId(int previewScreenId) {
		this.previewScreenId = previewScreenId;
	}
	
	public String getApplicationState() {
		return applicationState;
	}

	public void setApplicationState(String applicationState) {
		this.applicationState = applicationState;
	}

	public ArrayList<DefFile> getPageScrollViewPages() {
		return pageScrollViewPages;
	}

	public void addPageScrollViewPages(ArrayList<DefFile> pageScrollViewPages) {
		this.pageScrollViewPages = pageScrollViewPages;
	}

	public ArrayList<PageScrollViewPageSet> getPageScrollViewPageSet() {
		return pageScrollViewPageSet;
	}

	public void addPageScrollViewPageSet(ArrayList<PageScrollViewPageSet> pageScrollViewPageSet) {
		this.pageScrollViewPageSet = pageScrollViewPageSet;
	}

	// public String toString(){
	// StringBuffer sb = new StringBuffer();
	// sb.append("starturl = ").append(startUrl).append('\n')
	// .append("apptitle = ").append(appTitle).append('\n')
	// .append("icontitle = ").append(iconTitle).append('\n')
	// .append("DBLog = ").append(dBlog).append('\n')
	// .append("mainfile = ").append(mainFile.getFileName()).append('\n');
	// if(uiObjectPlugin.size()>0){
	// sb.append("UIObject-Plugin:").append('\n');
	// for(String uiobj: uiObjectPlugin)
	// sb.append("  name = ").append(uiobj).append('\n');
	// }
	// if(actionPlugin.size()>0){
	// sb.append("Action-Plugin:").append('\n');
	// for(String act: actionPlugin)
	// sb.append("  name = ").append(act).append('\n');
	// }
	// if(deviceObjectPlugin.size()>0){
	// sb.append("DeviceObject-Plugin:").append('\n');
	// for(String devObj: deviceObjectPlugin)
	// sb.append("  name = ").append(devObj).append('\n');
	// }
	// return sb.toString();
	// }

	// private ArrayList<String> csvFileSize = null;

	// @Deprecated
	// public DefFile getDefFile(String fileName, String defFileID, String
	// typeOfDef){
	// for(DefFile page: pages){
	// if(page.getFileName().equalsIgnoreCase(fileName)){
	// DefFile clone = (DefFile) page.clone();
	// if(typeOfDef.equalsIgnoreCase("Tab"))
	// clone.setDefFileID(defFileID);
	// else
	// clone.setDefFileID(clone.getDefFileID() + " " +fileName);
	// return clone;
	// }
	// }
	// return null;
	// }

	// public ArrayList<String> getCsvFileSize() {
	// return csvFileSize;
	// }
	//
	// public void setCsvFileSize(ArrayList<String> csvFileSize) {
	// this.csvFileSize = csvFileSize;
	// }
}
