package com.mobilous.mobileweb.param;

import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.attribute.Color;
import com.mobilous.mobileweb.attribute.File;
import com.mobilous.mobileweb.attribute.ImageFile;
import com.mobilous.mobileweb.etc.Condition;
import com.mobilous.mobileweb.util.Utility;

public class MediaController implements Parameters {

	private String pageName = "";
	private String method = "";
	private String media = "";
	private File file = null;
	private String library = "";
	private Condition condition = null;
	private String targetUI = ""; 
	private String side = ""; 
	private String targetPage = "";
	private String sourceUI = ""; // For DownloadMedia Action
	private String source = ""; // For DownloadMedia Action
	private String type = ""; // For QRScanner Action
	
	private String filename = "";
	private String filetype = "";
	
	private boolean multiScan = false;
	
	private boolean showProgress = false;
	private String refProgressUI = "";
	
	private boolean multiple = false;
	private int limit = 1;
	private String refMediaUI = "";

	private boolean thumbnail = false;
	private String refThumbnailUI = "";
	
	private String targetLocation = "";
	
	private String watermark = "";
	
	private boolean showWaterMark = false;
	private String watermarkType = "";
	private String watermarkText = "";
	private String watermarkPosition = "";
	private Color watermarkTextColor = null;
	private ImageFile watermarkImage = null;
	private int watermarkImageWidth = 20;
	private int watermarkImageHeight = 20;
	
	private String photoquality = "";
	private String contenttype = "";
	private String refFiletype = "";
	private String fileNameUI = "";
	private String fileSizeUI = "";
	private String refMediaList = "";
	private String refNameUIList = "";
	private String refSizeUIList = "";
	
	
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

	public MediaController(String method) {
		this.method = method;
	}

	public String getMedia() {
		return media;
	}

	public void setMedia(String media) {
		this.media = media;
	}

	public String getLibrary() {
		return library;
	}

	public void setLibrary(String library) {
		this.library = library;
	}

	@Override
	public void setMethod(String method) {
		this.method = method;
	}

	@Override
	public String getMethod() {
		return method;
	}

	public void setFile(File file) {
		this.file = file;
	}

	public File getFile() {
		return file;
	}

	public void setTargetUI(String targetUI){
		this.targetUI = targetUI;
	}
	public String getTargetUI(){
		return targetUI;
	}

	public String getSide() {
		return side;
	}

	public void setSide(String side) {
		this.side = side;
	}

	public String getTargetPage() {
		return targetPage;
	}

	public void setTargetPage(String targetPage) {
		this.targetPage = targetPage;
	}

	public String getSourceUI() {
		return sourceUI;
	}

	public void setSourceUI(String sourceUI) {
		this.sourceUI = sourceUI;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}
	

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	public String getFiletype() {
		return filetype;
	}

	public void setFiletype(String filetype) {
		this.filetype = filetype;
	}

	public boolean isMultiScan() {
		return multiScan;
	}

	public void setMultiScan(boolean multiScan) {
		this.multiScan = multiScan;
	}

	public boolean isShowProgress() {
		return showProgress;
	}
	public void setShowProgress(boolean showprogress) {
		this.showProgress = showprogress;
	}

	public String getRefProgressUI() {
		return refProgressUI;
	}
	public void setRefProgressUI(String refProgressUI) {
		this.refProgressUI = refProgressUI;
	}

	public boolean isMultiple() {
		return multiple;
	}

	public void setMultiple(boolean multiple) {
		this.multiple = multiple;
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	public String getRefMediaUI() {
		return refMediaUI;
	}

	public void setRefMediaUI(String refMediaUI) {
		this.refMediaUI = refMediaUI;
	}

	public boolean isThumbnail() {
		return thumbnail;
	}

	public void setThumbnail(boolean isThumbnail) {
		this.thumbnail = isThumbnail;
	}

	public String getRefThumbnailUI() {
		return refThumbnailUI;
	}

	public void setRefThumbnailUI(String refThumbnailUI) {
		this.refThumbnailUI = refThumbnailUI;
	}

	public String getTargetLocation() {
		return targetLocation;
	}

	public void setTargetLocation(String targetLocation) {
		this.targetLocation = targetLocation;
	}

	public String getContenttype() {
		return contenttype;
	}

	public void setContenttype(String contenttype) {
		this.contenttype = contenttype;
	}

	public String getPhotoquality() {
		return photoquality;
	}

	public void setPhotoquality(String photoquality) {
		this.photoquality = photoquality;
	}

	public boolean isShowWaterMark() {
		return showWaterMark;
	}

	public void setShowWaterMark(boolean showWaterMark) {
		this.showWaterMark = showWaterMark;
	}

	public String getWatermarkType() {
		return watermarkType;
	}

	public void setWatermarkType(String watermarkType) {
		this.watermarkType = watermarkType;
	}

	public String getWatermarkText() {
		return watermarkText;
	}

	public void setWatermarkText(String watermarkText) {
		this.watermarkText = watermarkText;
	}

	public String getWatermarkPosition() {
		return watermarkPosition;
	}

	public void setWatermarkPosition(String watermarkPosition) {
		this.watermarkPosition = watermarkPosition;
	}

	public Color getWatermarkTextColor() {
		return watermarkTextColor;
	}

	public void setWatermarkTextColor(Color watermarkTextColor) {
		this.watermarkTextColor = watermarkTextColor;
	}

	public ImageFile getWatermarkImage() {
		return watermarkImage;
	}

	public void setWatermarkImage(ImageFile watermarkImage) {
		this.watermarkImage = watermarkImage;
	}

	public String getWatermark() {
		return watermark;
	}

	public void setWatermark(String watermark) {
		this.watermark = watermark;
	}

	public int getWatermarkImageWidth() {
		return watermarkImageWidth;
	}

	public void setWatermarkImageWidth(int watermarkImageWidth) {
		this.watermarkImageWidth = watermarkImageWidth;
	}

	public int getWatermarkImageHeight() {
		return watermarkImageHeight;
	}

	public void setWatermarkImageHeight(int watermarkImageHeight) {
		this.watermarkImageHeight = watermarkImageHeight;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getRefFiletype() {
		return refFiletype;
	}

	public void setRefFiletype(String refFiletype) {
		this.refFiletype = refFiletype;
	}

	public String getFileNameUI() {
		return fileNameUI;
	}

	public void setFileNameUI(String fileNameUI) {
		this.fileNameUI = fileNameUI;
	}

	public String getFileSizeUI() {
		return fileSizeUI;
	}

	public void setFileSizeUI(String fileSizeUI) {
		this.fileSizeUI = fileSizeUI;
	}

	public String getRefMediaList() {
		return refMediaList;
	}

	public void setRefMediaList(String refMediaList) {
		this.refMediaList = refMediaList;
	}

	public String getRefNameUIList() {
		return refNameUIList;
	}

	public void setRefNameUIList(String refNameUIList) {
		this.refNameUIList = refNameUIList;
	}

	public String getRefSizeUIList() {
		return refSizeUIList;
	}

	public void setRefSizeUIList(String refSizeUIList) {
		this.refSizeUIList = refSizeUIList;
	}

}
