package com.mobilous.mobileweb.app;

import java.util.ArrayList;

import com.mobilous.mobileweb.etc.Inset;
import com.mobilous.mobileweb.etc.Offset;
import com.mobilous.mobileweb.etc.Size;
import com.mobilous.mobileweb.ui.BaseView;

public abstract class ScrollView extends BaseView {

	private boolean scrollEnabled = false; //
	private boolean directionalLockEnabled = false; //
	private boolean scrollsToTop = false;
	private boolean pagingEnabled = false;
	private boolean bounces = false;
	private boolean alwaysBounceVertical = false;
	private boolean alwaysBounceHorizontal = false;
	private boolean canCancelContentTouches = false;
	private boolean delaysContentTouches = false;
	private boolean showsHorizontalScrollIndicator = false;
	private boolean showsVerticalScrollIndicator = false;
	private boolean bouncesZoom = false;
	private double decelerationRate = -1;
	private double zoomScale = -1;
	private double maximumZoomScale = -1;
	private double minimumZoomScale = -1;
	private String indicatorStyle = "";
	private Offset contentOffset = null; //
	private Size contentSize = null;
	private Inset contentInset = null;
	private Inset scrollIndicatorInsets = null;

	private ArrayList<BaseView> children = null;

	public boolean isScrollEnabled() {
		return scrollEnabled;
	}

	public void setScrollEnabled(boolean scrollEnabled) {
		this.scrollEnabled = scrollEnabled;
	}

	public boolean isDirectionalLockEnabled() {
		return directionalLockEnabled;
	}

	public void setDirectionalLockEnabled(boolean directionalLockEnabled) {
		this.directionalLockEnabled = directionalLockEnabled;
	}

	public boolean isScrollsToTop() {
		return scrollsToTop;
	}

	public void setScrollsToTop(boolean scrollsToTop) {
		this.scrollsToTop = scrollsToTop;
	}

	public boolean isPagingEnabled() {
		return pagingEnabled;
	}

	public void setPagingEnabled(boolean pagingEnabled) {
		this.pagingEnabled = pagingEnabled;
	}

	public boolean isBounces() {
		return bounces;
	}

	public void setBounces(boolean bounces) {
		this.bounces = bounces;
	}

	public boolean isAlwaysBounceVertical() {
		return alwaysBounceVertical;
	}

	public void setAlwaysBounceVertical(boolean alwaysBounceVertical) {
		this.alwaysBounceVertical = alwaysBounceVertical;
	}

	public boolean isAlwaysBounceHorizontal() {
		return alwaysBounceHorizontal;
	}

	public void setAlwaysBounceHorizontal(boolean alwaysBounceHorizontal) {
		this.alwaysBounceHorizontal = alwaysBounceHorizontal;
	}

	public boolean isCanCancelContentTouches() {
		return canCancelContentTouches;
	}

	public void setCanCancelContentTouches(boolean canCancelContentTouches) {
		this.canCancelContentTouches = canCancelContentTouches;
	}

	public boolean isDelaysContentTouches() {
		return delaysContentTouches;
	}

	public void setDelaysContentTouches(boolean delaysContentTouches) {
		this.delaysContentTouches = delaysContentTouches;
	}

	public boolean isShowsHorizontalScrollIndicator() {
		return showsHorizontalScrollIndicator;
	}

	public void setShowsHorizontalScrollIndicator(
			boolean showsHorizontalScrollIndicator) {
		this.showsHorizontalScrollIndicator = showsHorizontalScrollIndicator;
	}

	public boolean isShowsVerticalScrollIndicator() {
		return showsVerticalScrollIndicator;
	}

	public void setShowsVerticalScrollIndicator(
			boolean showsVerticalScrollIndicator) {
		this.showsVerticalScrollIndicator = showsVerticalScrollIndicator;
	}

	public boolean isBouncesZoom() {
		return bouncesZoom;
	}

	public void setBouncesZoom(boolean bouncesZoom) {
		this.bouncesZoom = bouncesZoom;
	}

	public double getDecelerationRate() {
		return decelerationRate;
	}

	public void setDecelerationRate(double decelerationRate) {
		this.decelerationRate = decelerationRate;
	}

	public double getZoomScale() {
		return zoomScale;
	}

	public void setZoomScale(double zoomScale) {
		this.zoomScale = zoomScale;
	}

	public double getMaximumZoomScale() {
		return maximumZoomScale;
	}

	public void setMaximumZoomScale(double maximumZoomScale) {
		this.maximumZoomScale = maximumZoomScale;
	}

	public double getMinimumZoomScale() {
		return minimumZoomScale;
	}

	public void setMinimumZoomScale(double minimumZoomScale) {
		this.minimumZoomScale = minimumZoomScale;
	}

	public String getIndicatorStyle() {
		return indicatorStyle;
	}

	public void setIndicatorStyle(String indicatorStyle) {
		this.indicatorStyle = indicatorStyle;
	}

	public Offset getContentOffset() {
		return contentOffset;
	}

	public void setContentOffset(Offset contentOffset) {
		this.contentOffset = contentOffset;
	}

	public Size getContentSize() {
		return contentSize;
	}

	public void setContentSize(Size contentSize) {
		this.contentSize = contentSize;
	}

	public Inset getContentInset() {
		return contentInset;
	}

	public void setContentInset(Inset contentInset) {
		this.contentInset = contentInset;
	}

	public Inset getScrollIndicatorInsets() {
		return scrollIndicatorInsets;
	}

	public void setScrollIndicatorInsets(Inset scrollIndicatorInsets) {
		this.scrollIndicatorInsets = scrollIndicatorInsets;
	}

	public ArrayList<BaseView> getChildren() {
		return children;
	}

	public void setChildren(ArrayList<BaseView> children) {
		this.children = children;
	}

}
