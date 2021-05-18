package com.mobilous.mobileweb.uibuilder;


import java.util.ArrayList;

import com.mobilous.mobileweb.actionbuilder.ActionBuilder;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.attribute.Color;
import com.mobilous.mobileweb.attribute.File;
import com.mobilous.mobileweb.attribute.Font;
import com.mobilous.mobileweb.etc.PageOverlayItem;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.param.NPEActionSheetButtonsController;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.Button;
import com.mobilous.mobileweb.ui.Calendar;
import com.mobilous.mobileweb.ui.ComboBox;
import com.mobilous.mobileweb.ui.Image;
import com.mobilous.mobileweb.ui.Indicator;
import com.mobilous.mobileweb.ui.Label;
import com.mobilous.mobileweb.ui.Padding;
import com.mobilous.mobileweb.ui.PageOverlay;
import com.mobilous.mobileweb.ui.ProgressBar;
import com.mobilous.mobileweb.ui.Segment;
import com.mobilous.mobileweb.ui.Slider;
import com.mobilous.mobileweb.ui.Switch;
import com.mobilous.mobileweb.ui.TextField;
import com.mobilous.mobileweb.ui.TextView;
import com.mobilous.mobileweb.ui.TileList;
import com.mobilous.mobileweb.util.Utility;

public class PageOverlayBuilder {

	public static StringBuilder build(BaseView baseView, GenApp genApp) {
		
//		private Font headerfont = null;
//		private String heading = "";
//		private Boolean hidden = true;
//		private Boolean showclose = true;
//		private Boolean showfooter = true;
//		private Boolean showheader = true;
//		//private String name = "";
//		private Padding padding= null;
//		private File closeIcon= null;
//		private ArrayList<Button> actionButtons = null;
		
		PageOverlay pageOverlayView = (PageOverlay) baseView;
		StringBuilder pageOverlayBuilder = new StringBuilder();
		
//		pageOverlayBuilder.append("pageOverlay:");
		pageOverlayBuilder.append("{id:\"").append(pageOverlayView.getUiid()).append("\",");
		pageOverlayBuilder.append("name:\"").append(pageOverlayView.getName()).append("\",");
		pageOverlayBuilder.append("viewtype:\"").append("Dialog").append("\",");
		pageOverlayBuilder.append("hidden:").append(pageOverlayView.isHidden()).append(",");
		pageOverlayBuilder.append("cornerRadius:").append(pageOverlayView.getCornerRadius()).append(",");
		
		pageOverlayBuilder.append("backgroundColor:{")
				.append(ColorBuilder.build(pageOverlayView.getBackgroundColor()))
				.append("},");
		
		pageOverlayBuilder.append("borderColor:{")
				.append(ColorBuilder.build(pageOverlayView.getBorderColor()))
				.append("},");
		pageOverlayBuilder.append("borderWidth:").append(pageOverlayView.getBorderWidth()).append(",");
		
//		pageOverlayBuilder.append("frame:{")
//				.append(FrameBuilder.build(pageOverlayView.getFrame())).append("},");
		
		if (pageOverlayView.getPadding() != null) {
			pageOverlayBuilder.append("padding:{")
				.append(PaddingBuilder.build(pageOverlayView.getPadding()))
				.append("},");
		}
		
		pageOverlayBuilder.append("showheader:").append(pageOverlayView.getShowheader()).append(",");
		pageOverlayBuilder.append("showfooter:").append(pageOverlayView.getShowfooter()).append(",");
		pageOverlayBuilder.append("\n\tpageOverlayHeader:{");
		if (pageOverlayView.getShowheader()) {
			pageOverlayBuilder.append("headerheight:\"").append(pageOverlayView.getHeaderheight()).append("\",");
			pageOverlayBuilder.append("heading:\"").append(pageOverlayView.getHeading()).append("\",");
			
			if(pageOverlayView.getHeaderfont() != null) {
				pageOverlayBuilder.append("headerfont:{")
				.append(FontBuilder.build(pageOverlayView.getHeaderfont())).append("},");
			}
			
			pageOverlayBuilder.append("showclose:\"").append(pageOverlayView.getShowclose()).append("\",");
			
			pageOverlayBuilder.append("closeIcon:{");
			String fileVal ="";
			if (pageOverlayView.getCloseIcon() != null) {
				if(pageOverlayView.getCloseIcon().getFileName().indexOf("[") != -1 && pageOverlayView.getCloseIcon().getFileName().indexOf("]") != -1){
					pageOverlayBuilder.append("src:\"")
										.append(pageOverlayView.getCloseIcon().getFileName()).append("\",");
				}else{
					fileVal = (pageOverlayView.getCloseIcon().getFileExt()!="")?(pageOverlayView.getCloseIcon().getFileName() + "."
								+ pageOverlayView.getCloseIcon().getFileExt()):(pageOverlayView.getCloseIcon().getFileName());
					pageOverlayBuilder.append("src:\"")
										.append(fileVal).append("\",");
				}
				
			}
			pageOverlayBuilder.append("srcLocation:\"").append(pageOverlayView.getCloseIcon().getSrcLocation()).append("\",");
			pageOverlayBuilder.append("}");
		}
		pageOverlayBuilder.append("},");
		
		pageOverlayBuilder.append("\n\tdataArray:[");
		if (pageOverlayView.getDataarray() != null) {
			for(PageOverlayItem listDataArray : pageOverlayView.getDataarray()){
				pageOverlayBuilder.append("{");
				pageOverlayBuilder.append("contentHeight:\"").append(listDataArray.getHeight()).append("\",");
				pageOverlayBuilder.append("children:[").append("\n\t");
				pageOverlayBuilder.append(getPageOverlayChildren(listDataArray, genApp));
				pageOverlayBuilder.append("]");
				
				pageOverlayBuilder.append("},");
			}
		}
		pageOverlayBuilder.append("],");
		
		pageOverlayBuilder.append("\n\tpageOverlayFooter:{");
		if (pageOverlayView.getShowfooter()) {
			pageOverlayBuilder.append("footerheight:\"").append(pageOverlayView.getFooterheight()).append("\",");
			pageOverlayBuilder.append("actionbuttonheight:\"").append(pageOverlayView.getActionbuttonheight()).append("\",");
			pageOverlayBuilder.append("actionbuttonwidth:\"").append(pageOverlayView.getActionbuttonwidth()).append("\",");
			pageOverlayBuilder.append("actionButtonsColor:{").append(ColorBuilder.build(pageOverlayView.getActionButtonsColor())).append("},");
			pageOverlayBuilder.append("actionButtonsTintColor:{").append(ColorBuilder.build(pageOverlayView.getActionButtonsTintColor())).append("},");
			
			pageOverlayBuilder.append("actionButtons:{");
			if (!pageOverlayView.getActionButtons().isEmpty()) {
				int i = 0;
				for (NPEActionSheetButtonsController button : pageOverlayView.getActionButtons()){
					pageOverlayBuilder.append("Button_" + i).append(":{ id :\"")
							.append("Button_" + i).append("\", title:\"")
							.append(button.getButtonTitle() + "\",")
							.append("events:{Tap:[");
					if (!button.getEvent().isEmpty()) {
						for (Event event2 : button.getEvent()) {
							pageOverlayBuilder.append(ActionBuilder.makeAction(
									genApp, baseView, event2));
						}
					}
					pageOverlayBuilder.append("]},");
					pageOverlayBuilder.append("},");
					i++;
				}

			}	
			pageOverlayBuilder.append("}");
		}
		pageOverlayBuilder.append("},");
		pageOverlayBuilder.append("},");
		Utility.removeCommaFromLast(pageOverlayBuilder);

		return pageOverlayBuilder;
	}
	
	private static StringBuilder getPageOverlayChildren(PageOverlayItem eachrow,
			GenApp genApp) {
		StringBuilder contents = new StringBuilder();

		for (BaseView child : eachrow.getChildren()) {
			StringBuilder childrenS = new StringBuilder();
			if (child instanceof Label) {
				childrenS.append(LabelBuilder.build(child, genApp)).append(
						",\n\t");
			} else if (child instanceof Button) {
				childrenS.append(ButtonBuilder.build(child, genApp)).append(
						",\n\t");
			} else if (child instanceof TextField) {
				childrenS.append(TextFieldBuilder.build(child, genApp)).append(
						",\n\t");
			} else if (child instanceof Image) {
				childrenS.append(ImageBuilder.build(child, genApp)).append(
						",\n\t");
			} else if (child instanceof TextView) {
				childrenS.append(TextViewBuilder.build(child, genApp)).append(
						",\n\t");
			} else if (child instanceof Switch) {
				childrenS.append(SwitchBuilder.build(child, genApp)).append(
						",\n\t");
			} else if (child instanceof Slider) {
				childrenS.append(SliderBuilder.build(child, genApp)).append(
						",\n\t");
			} else if (child instanceof ProgressBar) {
				childrenS.append(ProgressBarBuilder.build(child, genApp))
						.append(",\n\t");
			} else if (child instanceof Indicator) {
				childrenS.append(WaitIndicatorBuilder.build(child, genApp))
						.append(",\n\t");
			} else if (child instanceof Segment) {
				childrenS.append(SegmentBuilder.build(child, genApp)).append(
						",\n\t");
			}else if (child instanceof ComboBox) {
				childrenS.append(ComboBoxBuilder.build(child, genApp)).append(",\n\t");
			}else if (child instanceof Calendar) {
				childrenS.append(CalendarBuilder.build(child, genApp)).append(",\n\t");
			}else if (child instanceof TileList) {
				childrenS.append(TileListBuilder.build(child, genApp));
				childrenS.deleteCharAt(childrenS.length() - 2);
				childrenS.append(",parentUI:\"" + child.getParentUI() + "\"}," ).append("\n\t");
			}
			

			contents.append(childrenS);
		}

		return Utility.removeCommaFromLast(contents);
	}
	
}
