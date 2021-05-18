package com.mobilous.mobileweb.app;

import com.mobilous.mobileweb.attribute.File;
import com.mobilous.mobileweb.attribute.Point;

public class DefFile extends File implements Cloneable {

	private Page page = null;
	private String type = "DefFile";
	private String DefFileID = "";
	private Point frame = null;

	@Override
	public String getType() {
		return type;
	}

	public Point getFrame() {
		return frame;
	}

	public void setFrame(Point frame) {
		this.frame = frame;
	}

	@Override
	public String getSrcLocation() {
		return srcLocation;
	}

	@Override
	public void setSrcLocation(String srcLocation) {
		this.srcLocation = srcLocation;
	}

	@Override
	public String getFileName() {
		return fileName;
	}

	@Override
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	@Override
	public String getFileExt() {
		return fileExt;
	}

	@Override
	public void setFileExt(String fileExt) {
		this.fileExt = fileExt;
	}

	@Override
	public String getUrl(GenApp genapp) {
		return url;
	}

	@Override
	public void setUrl(String url) {
		this.url = url;
	}

	/**
	 * @param page
	 *            the page to set
	 */
	public void setPage(Page page) {
		this.page = page;
	}

	/**
	 * @return the page
	 */
	public Page getPage() {
		return page;
	}

	public void setDefFileID(String defFileID) {
		DefFileID = defFileID.trim().replace(" ", "_");
	}

	public String getDefFileID() {
		return DefFileID;
	}

	@Override
	public Object clone() {
		try {
			return super.clone();
		} catch (Exception e) {
			return null;
		}
	}
}
