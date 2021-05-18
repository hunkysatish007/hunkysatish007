package com.mobilous.mobileweb.ui;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import com.mobilous.mobileweb.attribute.Color;
import com.mobilous.mobileweb.attribute.Font;
import com.mobilous.mobileweb.attribute.ImageFile;
import com.mobilous.mobileweb.etc.Inset;
import com.mobilous.mobileweb.event.Event;

public class Button extends ControlView {

	private String viewType = "Button";
	private String type = "";
	private String buttonType = "";
	private boolean reversesTitleShadowWhenHighlighted = false;
	private boolean adjustsImageWhenHighlighted = false;
	private boolean adjustsImageWhenDisabled = false;
	private boolean showsTouchWhenHighlighted = false;
	private ImageFile normalBackgroundImage = null;
	private ImageFile normalImage = null;
	private ImageFile highlightedBackgroundImage = null;
	private ImageFile highlightedImage = null;
	private ImageFile disabledBackgroundImage = null;
	private ImageFile disabledImage = null;
	private ImageFile selectedBackgroundImage = null;
	private ImageFile selectedImage = null;
	private String title = "";
	private String normalTitle = "";
	private String highlightedTitle = "";
	private String disabledTitle = "";
	private String selectedTitle = "";
	private String on = "";
	private Font normalFont = null;
	private Font highlightedFont = null;
	private Font disabledFont = null;
	private Font selectedFont = null;
	private Inset contentEdgeInsets = null;
	private Inset titleEdgeInsets = null;
	private Inset imageEdgeInsets = null;
	private ArrayList<Event> event = null;
	private Color backgroundColor = null;
	private Color borderColor = null;
	private String borderWidth = "1";
	private int tabOrder=0;
	private String borderStyle = null;
	
	private String options =null; //////for radio btn
	private int selectedIndex = 0;
	private String verticalAlignment = "";
	private String groupStyle = "";
	private Padding padding = null;
	private String groupName = "";
	private String checkboxState = "";
	private int cornerRadius=0;
	
	//private boolean hidden = "";
	//private ArrayList<String> radioButtonDataArray = new ArrayList<String>();
	private Map<String, String> radioButtonDataArray = new HashMap<String, String>();
	
	
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getButtonType() {
		return buttonType;
	}

	public void setButtonType(String buttonType) {
		this.buttonType = buttonType;
	}

	public boolean isReversesTitleShadowWhenHighlighted() {
		return reversesTitleShadowWhenHighlighted;
	}

	public void setReversesTitleShadowWhenHighlighted(
			boolean reversesTitleShadowWhenHighlighted) {
		this.reversesTitleShadowWhenHighlighted = reversesTitleShadowWhenHighlighted;
	}

	public boolean isAdjustsImageWhenHighlighted() {
		return adjustsImageWhenHighlighted;
	}

	public void setAdjustsImageWhenHighlighted(
			boolean adjustsImageWhenHighlighted) {
		this.adjustsImageWhenHighlighted = adjustsImageWhenHighlighted;
	}

	public boolean isAdjustsImageWhenDisabled() {
		return adjustsImageWhenDisabled;
	}

	public void setAdjustsImageWhenDisabled(boolean adjustsImageWhenDisabled) {
		this.adjustsImageWhenDisabled = adjustsImageWhenDisabled;
	}

	public boolean isShowsTouchWhenHighlighted() {
		return showsTouchWhenHighlighted;
	}

	public void setShowsTouchWhenHighlighted(boolean showsTouchWhenHighlighted) {
		this.showsTouchWhenHighlighted = showsTouchWhenHighlighted;
	}

	public ImageFile getNormalBackgroundImage() {
		return normalBackgroundImage;
	}

	public void setNormalBackgroundImage(ImageFile normalBackgroundImage) {
		this.normalBackgroundImage = normalBackgroundImage;
	}

	public ImageFile getNormalImage() {
		return normalImage;
	}

	public void setNormalImage(ImageFile normalImage) {
		this.normalImage = normalImage;
	}

	public ImageFile getHighlightedBackgroundImage() {
		return highlightedBackgroundImage;
	}

	public void setHighlightedBackgroundImage(
			ImageFile highlightedBackgroundImage) {
		this.highlightedBackgroundImage = highlightedBackgroundImage;
	}

	public ImageFile getHighlightedImage() {
		return highlightedImage;
	}

	public void setHighlightedImage(ImageFile highlightedImage) {
		this.highlightedImage = highlightedImage;
	}

	public ImageFile getDisabledBackgroundImage() {
		return disabledBackgroundImage;
	}

	public void setDisabledBackgroundImage(ImageFile disabledBackgroundImage) {
		this.disabledBackgroundImage = disabledBackgroundImage;
	}

	public ImageFile getDisabledImage() {
		return disabledImage;
	}

	public void setDisabledImage(ImageFile disabledImage) {
		this.disabledImage = disabledImage;
	}

	public ImageFile getSelectedBackgroundImage() {
		return selectedBackgroundImage;
	}

	public void setSelectedBackgroundImage(ImageFile selectedBackgroundImage) {
		this.selectedBackgroundImage = selectedBackgroundImage;
	}

	public ImageFile getSelectedImage() {
		return selectedImage;
	}

	public void setSelectedImage(ImageFile selectedImage) {
		this.selectedImage = selectedImage;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getNormalTitle() {
		return normalTitle;
	}

	public void setNormalTitle(String normalTitle) {
		this.normalTitle = normalTitle;
	}

	public Font getNormalFont() {
		return normalFont;
	}

	public void setNormalFont(Font normalFont) {
		this.normalFont = normalFont;
	}

	public String getHighlightedTitle() {
		return highlightedTitle;
	}

	public void setHighlightedTitle(String highlightedTitle) {
		this.highlightedTitle = highlightedTitle;
	}

	public Font getHighlightedFont() {
		return highlightedFont;
	}

	public void setHighlightedFont(Font highlightedFont) {
		this.highlightedFont = highlightedFont;
	}

	public String getDisabledTitle() {
		return disabledTitle;
	}

	public void setDisabledTitle(String disabledTitle) {
		this.disabledTitle = disabledTitle;
	}

	public Font getDisabledFont() {
		return disabledFont;
	}

	public void setDisabledFont(Font disabledFont) {
		this.disabledFont = disabledFont;
	}

	public String getSelectedTitle() {
		return selectedTitle;
	}

	public void setSelectedTitle(String selectedTitle) {
		this.selectedTitle = selectedTitle;
	}

	public Font getSelectedFont() {
		return selectedFont;
	}

	public void setSelectedFont(Font selectedFont) {
		this.selectedFont = selectedFont;
	}

	public Inset getContentEdgeInsets() {
		return contentEdgeInsets;
	}

	public void setContentEdgeInsets(Inset contentEdgeInsets) {
		this.contentEdgeInsets = contentEdgeInsets;
	}

	public Inset getTitleEdgeInsets() {
		return titleEdgeInsets;
	}

	public void setTitleEdgeInsets(Inset titleEdgeInsets) {
		this.titleEdgeInsets = titleEdgeInsets;
	}

	public Inset getImageEdgeInsets() {
		return imageEdgeInsets;
	}

	public void setImageEdgeInsets(Inset imageEdgeInsets) {
		this.imageEdgeInsets = imageEdgeInsets;
	}

	@Override
	public ArrayList<Event> getEvent() {
		return event;
	}

	public void setEvent(ArrayList<Event> event) {
		this.event = event;
	}

	public String getOn() {
		return on;
	}

	public void setOn(String on) {
		this.on = on;
	}

	@Override
	public String getViewType() {
		return viewType;
	}

	@Override
	public String toString() {
		return null;
	}
	
	public Color getBackgroundColor() {
		return backgroundColor;
	}

	public void setBackgroundColor(Color backgroundColor) {
		this.backgroundColor = backgroundColor;
	}

	public Color getBorderColor() {
		return borderColor;
	}

	public void setBorderColor(Color borderColor) {
		this.borderColor = borderColor;
	}

	public String getBorderWidth() {
		return borderWidth;
	}

	public void setBorderWidth(String borderWidth) {
		this.borderWidth = borderWidth;
	}

	public int getTabOrder() {
		return tabOrder;
	}

	public void setTabOrder(int tabOrder) {
		this.tabOrder = tabOrder;
	}

	public int getSelectedIndex() {
		return selectedIndex;
	}

	public void setSelectedIndex(int selectedIndex) {
		this.selectedIndex = selectedIndex;
	}

	public String getVerticalAlignment() {
		return verticalAlignment;
	}

	public void setVerticalAlignment(String verticalAlignment) {
		this.verticalAlignment = verticalAlignment;
	}

	
	public String getGroupStyle() {
		return groupStyle;
	}

	public void setGroupStyle(String groupStyle) {
		this.groupStyle = groupStyle;
	}

	public String getOptions() {
		return options;
	}

	public void setOptions(String options) {
		this.options = options;
	}

	
	public void setRadioButtonDataArray(Map<String, String> radioButtonDataArray) {
		this.radioButtonDataArray = radioButtonDataArray;
	}

	public Map<String, String> getRadioButtonDataArray() {
		return radioButtonDataArray;
	}

	public String getBorderStlye() {
		return borderStyle;
	}

	public void setBorderStlye(String borderStlye) {
		this.borderStyle= borderStlye;
	}

	public String getBorderStyle() {
		// TODO Auto-generated method stub
		return null;
	}

	public Padding getPadding() {
		return padding;
	}

	public void setPadding(Padding padding) {
		this.padding = padding;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public String getCheckboxState() {
		return checkboxState;
	}

	public void setCheckboxState(String checkboxState) {
		this.checkboxState = checkboxState;
	}

	public int getCornerRadius() {
		return cornerRadius;
	}

	public void setCornerRadius(int cornerRadius) {
		this.cornerRadius = cornerRadius;
	}

	

}
