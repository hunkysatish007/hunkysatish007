package com.mobilous.mobileweb.ui;

import java.util.ArrayList;

import com.mobilous.mobileweb.event.Event;

public class PDFViewer extends BaseView {

	private String viewType = "PDFViewer";
	private String filename = "";
	private String url = "";
	private String path = "";
	private int totalPages = 0;
	private int currentPage = 0;
	private boolean allowCopying = false;
	private boolean allowPrinting = false;
	private boolean isEncrypted = false;
	private boolean isUnlocked = false;
	private int page_width = 0;
	private int page_height = 0;
	private boolean isRightOpen = false;
	private boolean isMagazine = false;
	private ArrayList<Event> event = null;

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public int getTotalPages() {
		return totalPages;
	}

	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
	}

	public int getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}

	public boolean isAllowCopying() {
		return allowCopying;
	}

	public void setAllowCopying(boolean allowCopying) {
		this.allowCopying = allowCopying;
	}

	public boolean isAllowPrinting() {
		return allowPrinting;
	}

	public void setAllowPrinting(boolean allowPrinting) {
		this.allowPrinting = allowPrinting;
	}

	public boolean isEncrypted() {
		return isEncrypted;
	}

	public void setEncrypted(boolean isEncrypted) {
		this.isEncrypted = isEncrypted;
	}

	public boolean isUnlocked() {
		return isUnlocked;
	}

	public void setUnlocked(boolean isUnlocked) {
		this.isUnlocked = isUnlocked;
	}

	public int getPage_width() {
		return page_width;
	}

	public void setPage_width(int page_width) {
		this.page_width = page_width;
	}

	public int getPage_height() {
		return page_height;
	}

	public void setPage_height(int page_height) {
		this.page_height = page_height;
	}

	public boolean isRightOpen() {
		return isRightOpen;
	}

	public void setRightOpen(boolean isRightOpen) {
		this.isRightOpen = isRightOpen;
	}

	public boolean isMagazine() {
		return isMagazine;
	}

	public void setMagazine(boolean isMagazine) {
		this.isMagazine = isMagazine;
	}

	@Override
	public String getViewType() {
		return viewType;
	}

	@Override
	public String toString() {
		return null;
	}

	@Override
	public ArrayList<Event> getEvent() {
		return event;
	}

	public void setEvent(ArrayList<Event> event) {
		this.event = event;
	}
}
