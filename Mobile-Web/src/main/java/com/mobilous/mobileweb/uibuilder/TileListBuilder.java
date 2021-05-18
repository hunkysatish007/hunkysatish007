package com.mobilous.mobileweb.uibuilder;


import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.etc.TableRow;
import com.mobilous.mobileweb.etc.TileItem;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.Button;
import com.mobilous.mobileweb.ui.ComboBox;
import com.mobilous.mobileweb.ui.Image;
import com.mobilous.mobileweb.ui.Indicator;
import com.mobilous.mobileweb.ui.Label;
import com.mobilous.mobileweb.ui.ProgressBar;
import com.mobilous.mobileweb.ui.Segment;
import com.mobilous.mobileweb.ui.Slider;
import com.mobilous.mobileweb.ui.Switch;
import com.mobilous.mobileweb.ui.Table;
import com.mobilous.mobileweb.ui.TextField;
import com.mobilous.mobileweb.ui.TextView;
import com.mobilous.mobileweb.ui.TileList;
import com.mobilous.mobileweb.util.Utility;

public class TileListBuilder {

	public static StringBuilder build(BaseView baseView, GenApp genApp) {
		TileList tileListView = (TileList) baseView;
		StringBuilder tileListBuilder = new StringBuilder();

		tileListBuilder.append("{id:\"").append(tileListView.getUiid()).append("\",");
		tileListBuilder.append("name:\"").append(tileListView.getName()).append("\",");
		tileListBuilder.append("viewtype:\"").append("TileList").append("\",");
		tileListBuilder.append("hidden:").append(tileListView.isHidden()).append(",");
		tileListBuilder.append("direction:\"").append(tileListView.getDirection()).append("\",");
		if(tileListView.getDirection().equalsIgnoreCase("Horizontal"))
			tileListBuilder.append("circular:").append(tileListView.isCircular()).append(",");
		
		tileListBuilder.append("background:{")
				.append(ColorBuilder.build(tileListView.getBackgroundColor()))
				.append("},");

		tileListBuilder.append("frame:{")
				.append(FrameBuilder.build(tileListView.getFrame())).append("},");
		
		if (tileListView.getPadding() != null) {
			tileListBuilder.append("padding:{")
				.append(PaddingBuilder.build(tileListView.getPadding()))
				.append("},");
		}
		
		tileListBuilder.append("dbparams:{")
			.append("servicename:\"").append(tileListView.getServiceName()).append("\",")
			.append("tablename:\"").append(tileListView.getTableName()).append("\",")
			.append("where:\"").append(tileListView.getWhere()).append("\",")
			.append("order:\"").append(tileListView.getSort()).append("\",");
		if(tileListView.getDirection().equalsIgnoreCase("Horizontal"))
			tileListBuilder.append("isPagination:").append(tileListView.isPaging()).append(",");
		else
			tileListBuilder.append("isPagination:").append(false).append(",");
		tileListBuilder.append("},");
		
		
		tileListBuilder.append("dataArray:[");
		if (tileListView.getDataArray() != null) {
			for(TileItem listDataArray : tileListView.getDataArray()){
				tileListBuilder.append("{");
				tileListBuilder.append("rowCount:\"").append(listDataArray.getRow()).append("\",");
				tileListBuilder.append("columnCount:\"").append(listDataArray.getColumn()).append("\",");
				tileListBuilder.append("tileGap:\"").append(listDataArray.getTileGap()).append("\",");
				tileListBuilder.append("tileWidth:\"").append(listDataArray.getTileWidth()).append("\",");
				tileListBuilder.append("tileHeight:\"").append(listDataArray.getTileHeight()).append("\",");
				
				//tileListBuilder.append("\n\t");
				tileListBuilder.append("children:[").append("\n\t\t");
				tileListBuilder.append(getTileChildren(listDataArray, genApp));
				tileListBuilder.append("]");
				
				tileListBuilder.append("},").append("\n\t\t");
			}
		}
		tileListBuilder.append("],");
		Utility.removeCommaFromLast(tileListBuilder);

		return tileListBuilder;
	}
	
	private static StringBuilder getTileChildren(TileItem eachrow,
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
			}
			

			contents.append(childrenS);
		}

		return Utility.removeCommaFromLast(contents);
	}
	
}
