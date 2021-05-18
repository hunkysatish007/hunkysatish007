package com.mobilous.mobileweb.param;

import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.attribute.File;
import com.mobilous.mobileweb.attribute.NumberFormat;
import com.mobilous.mobileweb.etc.Condition;
import com.mobilous.mobileweb.util.Utility;

public class PageController implements Parameters {

	private String pageName = "";
	private String method = "";
	private File file = null;
	private String tab = "-1";
	private String name = "";
	private String value = "";
	private String fromName = "";
	private NumberFormat numberFormat = null;
	private String moveAction = "Default"; // TODO: enum
	private String transitionStyle = ""; // TODO: enum
	private String tableName = "";
	private String groupName = "";
	private String prefix = "";
	private String result = "";
	private boolean transferData = false;
	private boolean reference = false;
	private String RSSFeedURL = "";
	private Condition condition = null;
	private String targetPage = "";
	// for splitCSV Action..
	private String splitCSV_prefix = "";
	private String splitCSV_rowData = "";
	private String transition = "";
	private String transitType = "";
	private String siblingPage = "";
	private boolean resetEvent = false;
	

	public String getPageName(GenApp genApp) {
		return Utility.getDefFileIDByFilename(genApp, pageName);
	}

	public void setPageName(String pageName) {
		this.pageName = pageName;
	}

	public Condition getCondition() {
		return condition;
	}

	public boolean isReference() {
		return reference;
	}

	public void setReference(boolean reference) {
		this.reference = reference;
	}

	public boolean isTransferData() {
		return transferData;
	}

	public void setTransferData(boolean transferData) {
		this.transferData = transferData;
	}

	public void setCondition(Condition condition) {
		this.condition = condition;
	}

	// system own
	private boolean freshCopy = false;

	public PageController(String method) {
		this.method = method;
	}

	public File getFile() {
		return file;
	}

	public void setFile(File file) {
		this.file = file;
	}

	public String getTab() {
		return tab;
	}

	public void setTab(String tab) {
		this.tab = tab;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getPrefix() {
		return prefix;
	}

	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getFromName() {
		return fromName;
	}

	public void setFromName(String fromName) {
		this.fromName = fromName;
	}

	public NumberFormat getNumberFormat() {
		return numberFormat;
	}

	public void setNumberFormat(NumberFormat numberFormat) {
		this.numberFormat = numberFormat;
	}

	public String getMoveAction() {
		return moveAction;
	}

	public void setMoveAction(String moveAction) {
		this.moveAction = moveAction;
	}

	public String getTransitionStyle() {
		return transitionStyle;
	}

	public void setTransitionStyle(String transitionStyle) {
		this.transitionStyle = transitionStyle;
	}

	@Override
	public void setMethod(String method) {
		this.method = method;
	}

	@Override
	public String getMethod() {
		return method;
	}

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public String getRSSFeedURL() {
		return RSSFeedURL;
	}

	public void setRSSFeedURL(String rSSFeedURL) {
		RSSFeedURL = rSSFeedURL;
	}

	public boolean isFreshCopy() {
		return freshCopy;
	}

	public void setFreshCopy(boolean freshCopy) {
		this.freshCopy = freshCopy;
	}

	public String getTargetPage() {
		return targetPage;
	}

	public void setTargetPage(String targetPage) {
		this.targetPage = targetPage;
	}

	public String getSplitCSV_prefix() {
		return splitCSV_prefix;
	}

	public void setSplitCSV_prefix(String splitCSV_prefix) {
		this.splitCSV_prefix = splitCSV_prefix;
	}

	public String getSplitCSV_rowData() {
		return splitCSV_rowData;
	}

	public void setSplitCSV_rowData(String splitCSV_rowData) {
		this.splitCSV_rowData = splitCSV_rowData;
	}

	public String getTransition() {
		return transition;
	}

	public void setTransition(String transition) {
		this.transition = transition;
	}

	public String getTransitType() {
		return transitType;
	}

	public void setTransitType(String transitType) {
		this.transitType = transitType;
	}

	public String getSiblingPage() {
		return siblingPage;
	}

	public void setSiblingPage(String siblingPage) {
		this.siblingPage = siblingPage;
	}

	public boolean isResetEvent() {
		return resetEvent;
	}

	public void setResetEvent(boolean resetEvent) {
		this.resetEvent = resetEvent;
	}

}
