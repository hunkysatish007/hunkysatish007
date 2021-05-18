package com.mobilous.mobileweb.uibuilder;

import java.util.Iterator;
import java.util.Map;

import com.mobilous.mobileweb.actionbuilder.ActionBuilder;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.Button;
import com.mobilous.mobileweb.util.Utility;
import com.mobilous.mobileweb.etc.ComboBoxOptions;

public class ButtonBuilder {

	// Problems: ImageButton should be type:"image" to work
	// Images are only shown if we have the whole path
	public static StringBuilder build(BaseView baseView, GenApp genApp) {

		// JSON Version
		StringBuilder buttonBuilder = new StringBuilder();

		Button button = (Button) baseView;

		if (button.getType().equals("CheckBox")) {

			StringBuilder checkBoxBuilder = CheckBoxBuilder.build(button,
					genApp);
			return checkBoxBuilder;
		}

		if (button.getType().equals("Toggle")) {
			StringBuilder toggleBuilder = ToggleButtonBuilder.build(button,
					genApp);
			return toggleBuilder;
		}

		if (button.getType().equals("Image")) {

			StringBuilder imageButtonBuilder = ImageButtonBuilder.build(button,
					genApp);
			return imageButtonBuilder;
		}

		if (button.getType().equals("System")) {
			StringBuilder systemButtonBuilder = SystemButtonBuilder.build(
					button, genApp);
			return systemButtonBuilder;
		}
		//System.out.println(button.getButtonType());
		if (button.getButtonType().equals("RadioButtonGroup") || button.getButtonType().equals("Radio")) {
			StringBuilder radioButtonBuilder = RadioButtonBuilder.build(
					button, genApp);
			return radioButtonBuilder;
		}

		// labelBuilder.append("{id:\"").append(label.getUiid()).append("\",");
		String buttonValue = new String();
		buttonValue = button.getTitle();
		buttonBuilder.append("{id:\"").append(button.getUiid()).append("\",");
		buttonBuilder.append("name:\"").append(button.getName()).append("\",");
		// buttonBuilder.append("type:\"").append(button.getViewType().toLowerCase()).append("\",");
		buttonBuilder.append("hidden:\"").append(button.isHidden()).append("\",");
		buttonBuilder.append("viewtype:\"")
				.append(String.format("%sButton", button.getButtonType()))
				.append("\",");
		buttonBuilder.append("taborder:\"").append(button.getTabOrder()).append("\",");
		buttonBuilder.append("verticalalignment:\"").append(button.getVerticalAlignment()).append("\",");
		buttonBuilder.append("frame:{")
				.append(FrameBuilder.build(button.getFrame())).append("},");
		buttonBuilder.append("lineheight:\"").append("25").append("\",");
		buttonBuilder.append("cornerRadius:").append(button.getCornerRadius()).append(",");
		
		buttonBuilder.append("border:{").append(BorderBuilder.build(button.getBorderWidth(),"",button.getBorderColor())).append("},");
		buttonBuilder.append("background:{").append(ColorBuilder.build(button.getBackgroundColor())).append("},");
		if (button.getPadding() != null) {
			buttonBuilder.append("padding:{")
				.append(PaddingBuilder.build(button.getPadding()))
				.append("},");
		}
		if (buttonValue.contains("[")) {
			buttonBuilder.append("value:\"").append("\",");
			buttonBuilder.append("template:\"").append(button.getTitle())
					.append("\",");
		}

		else {
			buttonBuilder.append("value:\"").append(Utility.parseText(button.getTitle()))
					.append("\",");
			buttonBuilder.append("template:\"").append("\",");
		}

		buttonBuilder.append("font:{")
				.append(FontBuilder.build(button.getNormalFont())).append("},");
		buttonBuilder.append("textDecoration:\"").append(button.getTextDecoration().trim()).append("\",");

		if (button.getButtonType().equalsIgnoreCase("round")) {
			buttonBuilder.append("type:\"").append("button").append("\",");

		} else {
			buttonBuilder.append("type:\"")
					.append(button.getViewType().toLowerCase()).append("\",");
			if (button.getNormalImage() != null) {
				buttonBuilder
						.append("src:\"")
						.append(button.getNormalImage().getFileName() + "."
								+ button.getNormalImage().getFileExt())
						.append("\",");
			} else {
				buttonBuilder.append("src:\"").append("").append("\",");
			}

			String imageVal ="";
			if (button.getNormalBackgroundImage() != null) {
				
				if(button.getNormalBackgroundImage().getFileName().indexOf("[") != -1 && button.getNormalBackgroundImage().getFileName().indexOf("]") != -1){
					imageVal = (button.getNormalBackgroundImage().getFileExt()!="")?(button.getNormalBackgroundImage().getFileName() + "."
							+ button.getNormalBackgroundImage().getFileExt()):(button.getNormalBackgroundImage().getFileName());
					buttonBuilder.append("backgroundimage:\"")
										.append(imageVal).append("\",");
				}else{
					imageVal = (button.getNormalBackgroundImage().getFileExt()!="")?(button.getNormalBackgroundImage().getFileName() + "."
								+ button.getNormalBackgroundImage().getFileExt()):(button.getNormalBackgroundImage().getFileName());
					buttonBuilder.append("backgroundimage:\"")
										.append(imageVal).append("\",");
				}
				
//				buttonBuilder
//						.append("backgroundimage:\"")
//						.append(button.getNormalBackgroundImage().getFileName()
//								+ "."
//								+ button.getNormalBackgroundImage()
//										.getFileExt()).append("\",");
			} else {
				buttonBuilder.append("backgroundimage:\"").append("")
						.append("\",");
			}

			if (button.getSelectedImage() != null) {

				if(button.getSelectedImage().getFileName().indexOf("[") != -1 && button.getSelectedImage().getFileName().indexOf("]") != -1){
					buttonBuilder.append("imageontap:\"")
										.append(button.getSelectedImage().getFileName()).append("\",");
				}else{
					imageVal = (button.getSelectedImage().getFileExt()!="")?(button.getSelectedImage().getFileName() + "."
								+ button.getSelectedImage().getFileExt()):(button.getSelectedImage().getFileName());
					buttonBuilder.append("imageontap:\"")
										.append(imageVal).append("\",");
				}
				
//				buttonBuilder
//						.append("imageontap:\"")
//						.append(button.getSelectedImage().getFileName() + "."
//								+ button.getSelectedImage().getFileExt())
//						.append("\",");
			} else {
				buttonBuilder.append("imageontap:\"").append("").append("\",");
			}

			if (button.getSelectedBackgroundImage() != null) {

				if(button.getSelectedBackgroundImage().getFileName().indexOf("[") != -1 && button.getSelectedBackgroundImage().getFileName().indexOf("]") != -1){
//					buttonBuilder.append("backgroundimageontap:\"")
//										.append(button.getSelectedBackgroundImage().getFileName()).append("\",");
					imageVal = (button.getSelectedBackgroundImage().getFileExt()!="")?(button.getSelectedBackgroundImage().getFileName() + "."
							+ button.getSelectedBackgroundImage().getFileExt()):(button.getSelectedBackgroundImage().getFileName());
					buttonBuilder.append("backgroundimageontap:\"")
										.append(imageVal).append("\",");
				}else{
					imageVal = (button.getSelectedBackgroundImage().getFileExt()!="")?(button.getSelectedBackgroundImage().getFileName() + "."
								+ button.getSelectedBackgroundImage().getFileExt()):(button.getSelectedBackgroundImage().getFileName());
					buttonBuilder.append("backgroundimageontap:\"")
										.append(imageVal).append("\",");
				}
				
//				buttonBuilder
//						.append("backgroundimageontap:\"")
//						.append(button.getSelectedBackgroundImage()
//								.getFileName()
//								+ "."
//								+ button.getSelectedBackgroundImage()
//										.getFileExt()).append("\",");
			} else {
				buttonBuilder.append("backgroundimageontap:\"").append("")
						.append("\",");
			}
		}

		// Events
		if (baseView.getEvent() != null) {
			buttonBuilder.append("events:{");
			for (Event event : baseView.getEvent()) {
				StringBuilder actions = ActionBuilder.buildAction(genApp,
						baseView, event);
				buttonBuilder.append(actions);
			}
			buttonBuilder.append("}");
		}
		buttonBuilder.append("}");

		return buttonBuilder;

	}

}
