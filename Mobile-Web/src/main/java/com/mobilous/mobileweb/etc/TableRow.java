package com.mobilous.mobileweb.etc;

import java.util.ArrayList;

import com.mobilous.mobileweb.app.Fields;
import com.mobilous.mobileweb.attribute.Color;
import com.mobilous.mobileweb.attribute.ImageFile;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.Grid;
import com.mobilous.mobileweb.ui.Label;

public class TableRow {

	// no longer supported fields
	// private String cellType = "";
	// private boolean selected = false;

	private String name = "";
	private String title = "";
	private String footer = "";
	private String cellStyle = "";
	private String accessoryType = "";
	private String editingAccessoryType = "";
	private String accessory = "";
	private String selectionStyle = "";
	private String editingStyle = "";
	private String subTextField = "";
	private String mainTextField = "";
	private String tablename = "";
	private Label textLabelDic = null;
	private Label detailTextLabelDic = null;
	private ImageFile backgroundView = null;
	private Color backgroundColor = null;
	private ImageFile selectedBackgroundView = null;
	private ImageFile accessoryView = null;
	private ImageFile editingAccessoryView = null;
	private ImageFile mainImage = null;
	private boolean highlighted = false;
	private boolean editable = false;
	private boolean movable = false;
	private ArrayList<Fields> fieldArray = null;
	private String mainText = "";
	private String detailText = "";
	private String value = "";
	private int height = -1;
	private ArrayList<BaseView> children = null;
	private ArrayList<Event> event = null;
	private ArrayList<Grid> gridArray = null;
	private boolean alternateRowStyle = false;
	private Color oddRowBackgroundColor = null;
	private Color evenRowBackgroundColor = null;
	private ImageFile oddRowBackgroundImage = null;
	private ImageFile evenRowBackgroundImage = null;
	private boolean rowBGImageRepeat = false;
	

	public ArrayList<BaseView> getChildren() {
		return children;
	}

	public void setChildren(ArrayList<BaseView> children) {
		this.children = children;
	}

	public String getName() {
		return name;
	}

	public String getTablename() {
		return tablename;
	}

	public void setTablename(String tablename) {
		this.tablename = tablename;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getFooter() {
		return footer;
	}

	public void setFooter(String footer) {
		this.footer = footer;
	}

	public String getCellStyle() {
		return cellStyle;
	}

	public void setCellStyle(String cellStyle) {
		this.cellStyle = cellStyle;
	}

	public String getAccessoryType() {
		return accessoryType;
	}

	public void setAccessoryType(String accessoryType) {
		this.accessoryType = accessoryType;
	}

	public String getEditingAccessoryType() {
		return editingAccessoryType;
	}

	public void setEditingAccessoryType(String editingAccessoryType) {
		this.editingAccessoryType = editingAccessoryType;
	}

	public String getAccessory() {
		return accessory;
	}

	public void setAccessory(String accessory) {
		this.accessory = accessory;
	}

	public String getSelectionStyle() {
		return selectionStyle;
	}

	public void setSelectionStyle(String selectionStyle) {
		this.selectionStyle = selectionStyle;
	}

	public String getEditingStyle() {
		return editingStyle;
	}

	public void setEditingStyle(String editingStyle) {
		this.editingStyle = editingStyle;
	}

	public String getMainTextField() {
		return mainTextField;
	}

	public void setMainTextField(String mainTextField) {
		this.mainTextField = mainTextField;
	}

	public Label getTextLabelDic() {
		return textLabelDic;
	}

	public void setTextLabelDic(Label textLabelDic) {
		this.textLabelDic = textLabelDic;
	}

	public Label getDetailTextLabelDic() {
		return detailTextLabelDic;
	}

	public void setDetailTextLabelDic(Label detailTextLabelDic) {
		this.detailTextLabelDic = detailTextLabelDic;
	}

	public ImageFile getBackgroundView() {
		return backgroundView;
	}

	public void setBackgroundView(ImageFile backgroundView) {
		this.backgroundView = backgroundView;
	}

	/*public Color getBackgroundColor() {
		return backgroundColor;
	}

	public void setBackgroundColor(Color backgroundColor) {
		this.backgroundColor = backgroundColor;
	}*/

	public ImageFile getSelectedBackgroundView() {
		return selectedBackgroundView;
	}

	public void setSelectedBackgroundView(ImageFile selectedBackgroundView) {
		this.selectedBackgroundView = selectedBackgroundView;
	}

	public Color getBackgroundColor() {
		return backgroundColor;
	}

	public void setBackgroundColor(Color backgroundColor) {
		this.backgroundColor = backgroundColor;
	}

	public ImageFile getAccessoryView() {
		return accessoryView;
	}

	public void setAccessoryView(ImageFile accessoryView) {
		this.accessoryView = accessoryView;
	}

	public ImageFile getEditingAccessoryView() {
		return editingAccessoryView;
	}

	public void setEditingAccessoryView(ImageFile editingAccessoryView) {
		this.editingAccessoryView = editingAccessoryView;
	}

	public ImageFile getMainImage() {
		return mainImage;
	}

	public void setMainImage(ImageFile mainImage) {
		this.mainImage = mainImage;
	}

	public boolean isHighlighted() {
		return highlighted;
	}

	public void setHighlighted(boolean highlighted) {
		this.highlighted = highlighted;
	}

	public boolean isEditable() {
		return editable;
	}

	public void setEditable(boolean editable) {
		this.editable = editable;
	}

	public boolean isMovable() {
		return movable;
	}

	public void setMovable(boolean movable) {
		this.movable = movable;
	}

	public ArrayList<Fields> getFieldArray() {
		return fieldArray;
	}

	public void setFieldArray(ArrayList<Fields> fieldArray) {
		this.fieldArray = fieldArray;
	}

	public String getMainText() {
		return mainText;
	}

	public void setMainText(String mainText) {
		this.mainText = mainText;
	}

	public String getDetailText() {
		return detailText;
	}

	public void setDetailText(String detailText) {
		this.detailText = detailText;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public int getHeight() {
		return height;
	}

	public void setHeight(int height) {
		this.height = height;
	}

	public String getSubTextField() {
		return subTextField;
	}

	public void setSubTextField(String subTextField) {
		this.subTextField = subTextField;
	}

	public ArrayList<Event> getEvent() {
		return event;
	}

	public void setEvent(ArrayList<Event> event) {
		this.event = event;
	}

	public ArrayList<Grid> getGridArray() {
		return gridArray;
	}

	public void setGridArray(ArrayList<Grid> gridArray) {
		this.gridArray = gridArray;
	}

	public boolean isAlternateRowStyle() {
		return alternateRowStyle;
	}

	public void setAlternateRowStyle(boolean alternateRowStyle) {
		this.alternateRowStyle = alternateRowStyle;
	}

	public Color getOddRowBackgroundColor() {
		return oddRowBackgroundColor;
	}

	public void setOddRowBackgroundColor(Color oddRowBackgroundColor) {
		this.oddRowBackgroundColor = oddRowBackgroundColor;
	}

	public Color getEvenRowBackgroundColor() {
		return evenRowBackgroundColor;
	}

	public void setEvenRowBackgroundColor(Color evenRowBackgroundColor) {
		this.evenRowBackgroundColor = evenRowBackgroundColor;
	}

	public ImageFile getOddRowbackgroundImage() {
		return oddRowBackgroundImage;
	}

	public void setOddRowbackgroundImage(ImageFile oddRowbackgroundImage) {
		this.oddRowBackgroundImage = oddRowbackgroundImage;
	}

	public ImageFile getEvenRowbackgroundImage() {
		return evenRowBackgroundImage;
	}

	public void setEvenRowbackgroundImage(ImageFile evenRowbackgroundImage) {
		this.evenRowBackgroundImage = evenRowbackgroundImage;
	}

	public boolean isRowBGImageRepeat() {
		return rowBGImageRepeat;
	}

	public void setRowBGImageRepeat(boolean rowBGImageRepeat) {
		this.rowBGImageRepeat = rowBGImageRepeat;
	}

	
}
