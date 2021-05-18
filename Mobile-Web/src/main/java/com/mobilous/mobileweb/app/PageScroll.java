package com.mobilous.mobileweb.app;

import java.util.ArrayList;

public abstract class PageScroll extends ScrollView {

	private ArrayList<Page> pages = null;

	public ArrayList<Page> getPages() {
		return pages;
	}

	public void setPages(ArrayList<Page> pages) {
		this.pages = pages;
	}

}
