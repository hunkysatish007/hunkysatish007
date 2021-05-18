package com.mobilous.mobileweb.app;

import java.util.ArrayList;

import com.mobilous.mobileweb.attribute.Color;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.NavigationBar;

public class PageSplit {

	// TODO: add some page data and confirm the children
	private Color backgroundColor = null;
	private String iconTitle = "";
	private String icon = "";
	private boolean statusBarHidden = false;
	private boolean navigationBarHidden = false;
	private boolean tabBarHidden = false;
	private NavigationBar navigationBar = null;
	private ArrayList<BaseView> children = null;

	public Color getBackgroundColor() {
		return backgroundColor;
	}

	public void setBackgroundColor(Color backgroundColor) {
		this.backgroundColor = backgroundColor;
	}

	public String getIconTitle() {
		return iconTitle;
	}

	public void setIconTitle(String iconTitle) {
		this.iconTitle = iconTitle;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public boolean isStatusBarHidden() {
		return statusBarHidden;
	}

	public void setStatusBarHidden(boolean statusBarHidden) {
		this.statusBarHidden = statusBarHidden;
	}

	public boolean isNavigationBarHidden() {
		return navigationBarHidden;
	}

	public void setNavigationBarHidden(boolean navigationBarHidden) {
		this.navigationBarHidden = navigationBarHidden;
	}

	public boolean isTabBarHidden() {
		return tabBarHidden;
	}

	public void setTabBarHidden(boolean tabBarHidden) {
		this.tabBarHidden = tabBarHidden;
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

}
