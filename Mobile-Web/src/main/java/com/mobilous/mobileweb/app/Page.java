package com.mobilous.mobileweb.app;

import java.util.ArrayList;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import com.mobilous.mobileweb.attribute.Color;
import com.mobilous.mobileweb.attribute.ImageFile;
import com.mobilous.mobileweb.etc.Item;
import com.mobilous.mobileweb.etc.TableRow;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.NavigationBar;
import com.mobilous.mobileweb.ui.PageOverlay;
import com.mobilous.mobileweb.ui.ToolBarBottom;
import com.mobilous.mobileweb.ui.ToolBarLeft;
import com.mobilous.mobileweb.ui.ToolBarRight;
import com.mobilous.mobileweb.ui.ToolBarTop;

public class Page extends DefFile {

	private String viewType = ""; // PageScrollView //BaseView
	private String title = "";
	private ImageFile icon = null;
	private String iconTitle = "";
	private String serviceName = "";
	private String tablename = "";
	private String where = "";
	private String sort = "";
	private String parent = "";
	private TableRow recordCellDef = null;
	private Color backgroundColor = null;
	private boolean tabBarHidden = false;
	private boolean navigationBarHidden = false;
	private NavigationBar navigationBar = null;
	private ArrayList<PageOverlay> pageOverlay = null;
	private ArrayList<BaseView> children = null;
	private ArrayList<DefFile> pages = null;
	// private Point frame = null;
	private double width = 320;
	private double height = 480;
	private double tabletHeight = 1024;
	private double tabletWidth = 768;
	private boolean splitHidden = false;
	private Color tabColor = null;
	private double x = 0;
	private double y = 0;

	private boolean isParentSplitView = false;
	private boolean isParentPageScrollView = false;

	private boolean statusbar = false;

	private ArrayList<Item> item = null;

	private ArrayList<DefFile> splitViewPagesDef = null;

	private ToolBarTop toolbarTop = null;
	private ToolBarBottom toolbarBottom = null;
	private ToolBarLeft toolbarLeft = null;
	private ToolBarRight toolbarRight = null;
	private ArrayList<Event> event = null;
	
	private boolean SideBarHidden = false;
	private String SideBarPosition = "";
	private String PageOrientation = "Portrait";
	
	public boolean isSplitHidden() {
		return splitHidden;
	}

	public void setSplitHidden(boolean splitHidden) {
		this.splitHidden = splitHidden;
	}

	private JSONObject pageData = null;

	public Page(String pageID) {
		//System.out.println(pageID);
		pageData = new JSONObject();
		pageData.put("name", pageID);
		pageData.put("type", "");
		pageData.put("width", width);
		pageData.put("height", height);
		pageData.put("class", "");

		JSONObject data = new JSONObject();
		data.put("source", "");
		data.put("contents", new JSONObject());
		data.put("tablename", "");
		data.put("tableid", "");
		data.put("wherecond", "");
		data.put("order", "");
		pageData.put("data", data);

		JSONArray children = new JSONArray();
		pageData.put("children", children);
	}

	public boolean isNavigationBarHidden() {
		return navigationBarHidden;
	}

	public String getWhere() {
		return where;
	}

	public void setWhere(String where) {
		this.where = where;
	}

	public String getSort() {
		return sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
	}

	public void setNavigationBarHidden(boolean navigationBarHidden) {
		this.navigationBarHidden = navigationBarHidden;
	}

	public String getViewType() {
		return viewType;
	}

	public void setViewType(String viewType) {
		pageData.put("type", viewType);
		JSONObject data = (JSONObject) pageData.get("data");
		if (viewType.equalsIgnoreCase("DbPageScrollView")) {
			data.put("current", 0);
			data.put("total", 0);
		} else if (viewType.equalsIgnoreCase("PageScrollView")) {
			data.put("current", 0);
		}

		this.viewType = viewType;
	}

	public JSONObject getPageData() {
		return pageData;
	}

	public ArrayList<DefFile> getPages() {
		return pages;
	}

	public void setPages(ArrayList<DefFile> pages) {
		if (pages.size() <= 0)
			return;
		JSONArray jsonPages = new JSONArray();
		for (DefFile page : pages) {
			jsonPages.add(page.getDefFileID());
		}
		pageData.put("pages", jsonPages);
		JSONObject data = (JSONObject) pageData.get("data");
		data.put("total", jsonPages.size());
		this.pages = pages;
	}

	public double getWidth() {
		return width;
	}

	public void setWidth(double width) {
		((JSONObject) pageData).put("width", width);
		this.width = width;
	}

	public double getHeight() {
		return height;
	}

	public void setHeight(double height) {
		((JSONObject) pageData).put("height", height);
		this.height = height;
	}

	public void setPageData(JSONObject pageData) {
		this.pageData = pageData;
	}

	public boolean isTabBarHidden() {
		return tabBarHidden;
	}

	public void setTabBarHidden(boolean tabBarHidden) {
		this.tabBarHidden = tabBarHidden;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Color getBackgroundColor() {
		return backgroundColor;
	}

	public void setBackgroundColor(Color backgroundColor) {
		this.backgroundColor = backgroundColor;
	}

	public NavigationBar getNavigationBar() {
		return navigationBar;
	}

	public void setNavigationBar(NavigationBar navigationBar) {
		this.navigationBar = navigationBar;
	}

	public ArrayList<BaseView> getChildren() {
		return children;
	}

	public void setChildren(ArrayList<BaseView> children) {
		this.children = children;
	}

	public ArrayList<Item> getItem() {
		return item;
	}

	public void setItem(ArrayList<Item> item) {
		this.item = item;
	}

	public ImageFile getIcon() {
		return icon;
	}

	public void setIcon(ImageFile icon) {
		this.icon = icon;
	}

	public String getIconTitle() {
		return iconTitle;
	}

	public void setIconTitle(String iconTitle) {
		this.iconTitle = iconTitle;
	}

	public String getServiceName() {
		return serviceName;
	}

	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}

	public TableRow getRecordCellDef() {
		return recordCellDef;
	}

	public void setRecordCellDef(TableRow recordCellDef) {
		this.recordCellDef = recordCellDef;
	}

	public String getTablename() {
		return tablename;
	}

	public void setTablename(String tablename) {
		this.tablename = tablename;
	}

	public String getParent() {
		return parent;
	}

	public void setParent(String parent) {
		pageData.put("parent", parent);
		this.parent = parent;
	}

	public void setTabColor(Color tabColor) {
		this.tabColor = tabColor;
	}

	public Color getTabColor() {
		return tabColor;
	}

	// @Override
	// public Point getFrame() {
	// return frame;
	// }
	//
	// @Override
	// public void setFrame(Point frame) {
	// System.out.println("WOOOOOOOOOOOOOOOO");
	// this.frame = frame;
	// }

	@Override
	public String toString() {
		return "Page [title=" + title + ", backgroundColor=" + backgroundColor
				+ ", navigationBar=" + navigationBar + ", children=" + children
				+ "]";
	}

	public double getTabletHeight() {
		return tabletHeight;
	}

	public void setTabletHeight(double tabletHeight) {
		this.tabletHeight = tabletHeight;
	}

	public double getTabletWidth() {
		return tabletWidth;
	}

	public void setTabletWidth(double tabletWidth) {
		this.tabletWidth = tabletWidth;
	}

	public boolean isStatusbar() {
		return statusbar;
	}

	public void setStatusbar(boolean statusbar) {
		this.statusbar = statusbar;
	}

	public ArrayList<DefFile> getSplitViewPagesDef() {
		return splitViewPagesDef;
	}

	public void setSplitViewPagesDef(ArrayList<DefFile> splitViewPagesDef) {
		this.splitViewPagesDef = splitViewPagesDef;
	}

	public boolean isParentSplitView() {
		return isParentSplitView;
	}

	public void setParentSplitView(boolean isParentSplitView) {
		this.isParentSplitView = isParentSplitView;
	}

	public ToolBarTop getToolbarTop() {
		return toolbarTop;
	}

	public void setToolbarTop(ToolBarTop toolbarTop) {
		this.toolbarTop = toolbarTop;
	}

	public ToolBarBottom getToolbarBottom() {
		return toolbarBottom;
	}

	public void setToolbarBottom(ToolBarBottom toolbarBottom) {
		this.toolbarBottom = toolbarBottom;
	}

	public ToolBarLeft getToolbarLeft() {
		return toolbarLeft;
	}

	public void setToolbarLeft(ToolBarLeft toolbarLeft) {
		this.toolbarLeft = toolbarLeft;
	}

	public ArrayList<Event> getEvent() {
		return event;
	}

	public void setEvent(ArrayList<Event> event) {
		this.event = event;
	}

	public double getX() {
		return x;
	}

	public void setX(double x) {
		this.x = x;
	}

	public double getY() {
		return y;
	}

	public void setY(double y) {
		this.y = y;
	}

	public ToolBarRight getToolbarRight() {
		return toolbarRight;
	}

	public void setToolbarRight(ToolBarRight toolbarRight) {
		this.toolbarRight = toolbarRight;
	}

	public boolean isSideBarHidden() {
		return SideBarHidden;
	}

	public void setSideBarHidden(boolean sideBarHidden) {
		SideBarHidden = sideBarHidden;
	}

	public String getSideBarPosition() {
		return SideBarPosition;
	}

	public void setSideBarPosition(String sideBarPosition) {
		SideBarPosition = sideBarPosition;
	}

	public boolean isParentPageScrollView() {
		return isParentPageScrollView;
	}

	public void setParentPageScrollView(boolean isParentPageScrollView) {
		this.isParentPageScrollView = isParentPageScrollView;
	}

	public String getPageOrientation() {
		return PageOrientation;
	}

	public void setPageOrientation(String pageOrientation) {
		PageOrientation = pageOrientation;
	}

	public ArrayList<PageOverlay> getPageOverlay() {
		return pageOverlay;
	}

	public void setPageOverlay(ArrayList<PageOverlay> pageOverlaySets) {
		this.pageOverlay = pageOverlaySets;
	}


}
