package com.mobilous.mobileweb.uibuilder;

import com.mobilous.mobileweb.actionbuilder.ActionBuilder;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.Button;

public class ImageButtonBuilder {

	public static StringBuilder build(BaseView baseView, GenApp genapp) {
		{

			Button image = (Button) baseView;

			StringBuilder imageButtonBuilder = new StringBuilder();

			imageButtonBuilder.append("{id:\"").append(image.getUiid())
					.append("\",");
			imageButtonBuilder.append("name:\"").append(image.getName())
					.append("\",");
			imageButtonBuilder.append("hidden:\"").append(image.isHidden()).append("\",");			
			imageButtonBuilder.append("type:\"").append(image.getType())
					.append("\",");
			imageButtonBuilder.append("taborder:\"").append(image.getTabOrder())
			.append("\",");
			imageButtonBuilder.append("draggable:").append(image.isDraggable())
			.append(",");
			
			if (!(image.getFieldname().equalsIgnoreCase("")))
				imageButtonBuilder.append("template:\"").append(
						"[" + image.getFieldname() + "]\",");
			else
				imageButtonBuilder.append("template:\"").append("\",");

			imageButtonBuilder.append("viewtype:\"")
					.append(String.format("%sButton", image.getButtonType()))
					.append("\",");
			
			
			String imageVal ="";
			if (image.getNormalImage() != null) {
				if(image.getNormalImage().getFileName().indexOf("[") != -1 && image.getNormalImage().getFileName().indexOf("]") != -1){
					imageButtonBuilder.append("src:\"")
										.append(image.getNormalImage().getFileName()).append("\",");
				}else{
					imageVal = (image.getNormalImage().getFileExt()!="")?(image.getNormalImage().getFileName() + "."
								+ image.getNormalImage().getFileExt()):(image.getNormalImage().getFileName());
					imageButtonBuilder.append("src:\"")
										.append(imageVal).append("\",");
				}
				
			} else {
				imageButtonBuilder.append("src:\"").append("").append("\",");
			}
			
			if (image.getNormalBackgroundImage().getFileName() != "") {
				imageVal = (image.getNormalBackgroundImage().getFileExt()!="")?(image.getNormalBackgroundImage().getFileName() + "."
							+ image.getNormalBackgroundImage().getFileExt()):(image.getNormalBackgroundImage().getFileName());
				imageButtonBuilder.append("backgroundimage:\"")
									.append(imageVal).append("\",");

			}else {
				//System.out.println("In else part");
				imageButtonBuilder.append("backgroundimage:\"")
						.append("default-image-button-200x100.png")
						.append("\",");
			}
			
			if (image.getSelectedImage() != null) {
				imageVal = (image.getSelectedImage().getFileExt()!="")?(image.getSelectedImage().getFileName() + "."
						+ image.getSelectedImage().getFileExt()):(image.getSelectedImage().getFileName());
				imageButtonBuilder.append("imageontap:\"")
									.append(imageVal).append("\",");

			} else {
				imageVal = (image.getNormalImage().getFileExt()!="")?(image.getNormalImage().getFileName() + "."
						+ image.getNormalImage().getFileExt()):(image.getNormalImage().getFileName());
				imageButtonBuilder.append("imageontap:\"")
									.append(imageVal).append("\",");
			}
			
			if (image.getSelectedBackgroundImage() != null) {
				imageVal = (image.getSelectedBackgroundImage().getFileExt()!="")?(image.getSelectedBackgroundImage().getFileName() + "."
						+ image.getSelectedBackgroundImage().getFileExt()):(image.getSelectedBackgroundImage().getFileName());
				imageButtonBuilder.append("backgroundimageontap:\"")
									.append(imageVal).append("\",");

			} else {
				imageVal = (image.getNormalBackgroundImage().getFileExt()!="")?(image.getNormalBackgroundImage().getFileName() + "."
						+ image.getNormalBackgroundImage().getFileExt()):(image.getNormalBackgroundImage().getFileName());
				imageButtonBuilder.append("backgroundimageontap:\"")
									.append(imageVal).append("\",");
			}
			imageButtonBuilder.append("border:{").append(BorderBuilder.build(image.getBorderWidth(),image.getBorderStyle(), image.getBorderColor())).append("},");
			imageButtonBuilder.append("frame:{")
					.append(FrameBuilder.build(image.getFrame())).append("},");
			imageButtonBuilder.append("lineheight:").append("25").append(",");
			if (image.getEvent() != null) {
				imageButtonBuilder.append("events:{");
				for (Event event : baseView.getEvent()) {

					StringBuilder actions = ActionBuilder.buildAction(genapp,
							baseView, event);
					imageButtonBuilder.append(actions);
				}
				imageButtonBuilder.append("}");
			}
			imageButtonBuilder.append("}");

			return imageButtonBuilder;

		}
	}
}
