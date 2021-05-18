package com.mobilous.mobileweb.etc;

import java.util.ArrayList;

import com.mobilous.mobileweb.ui.BaseView;

public class TileItem {

	private int row = 1;
	private int column = 1;
	private int tileGap = 2;
	private int tileWidth;
	private int tileHeight;
	
	private ArrayList<BaseView> children = null;

	

	public int getRow() {
		return row;
	}

	public void setRow(int row) {
		this.row = row;
	}

	public int getColumn() {
		return column;
	}

	public void setColumn(int column) {
		this.column = column;
	}

	public int getTileGap() {
		return tileGap;
	}

	public void setTileGap(int tileGap) {
		this.tileGap = tileGap;
	}

	public ArrayList<BaseView> getChildren() {
		return children;
	}

	public void setChildren(ArrayList<BaseView> children) {
		this.children = children;
	}

	public int getTileWidth() {
		return tileWidth;
	}

	public void setTileWidth(int tileWidth) {
		this.tileWidth = tileWidth;
	}

	public int getTileHeight() {
		return tileHeight;
	}

	public void setTileHeight(int tileHeight) {
		this.tileHeight = tileHeight;
	}

	
}
