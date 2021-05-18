package com.mobilous.mobileweb.uibuilder;


import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.Chart;

public class ChartBuilder {

	public static StringBuilder build(BaseView baseView, GenApp genApp) {
		Chart chartView = (Chart) baseView;
		StringBuilder chartViewBuilder = new StringBuilder();

		chartViewBuilder.append("{id:\"").append(chartView.getUiid()).append("\",");
		chartViewBuilder.append("name:\"").append(chartView.getName()).append("\",");
		chartViewBuilder.append("viewtype:\"").append(chartView.getViewType()).append("\",");
		chartViewBuilder.append("type:\"").append(chartView.getType()).append("\",");
		chartViewBuilder.append("title:\"").append(chartView.getTitle()).append("\",");
		chartViewBuilder.append("hidden:").append(chartView.isHidden()).append(",");
		
		chartViewBuilder.append("frame:{")
				.append(FrameBuilder.build(chartView.getFrame())).append("},");
		if (chartView.getPadding() != null) {
			chartViewBuilder.append("padding:{")
				.append(PaddingBuilder.build(chartView.getPadding()))
				.append("},");
		}
		
		chartViewBuilder.append("dbparams:{")
			.append("servicename:\"").append(chartView.getServiceName()).append("\",")
			.append("tablename:\"").append(chartView.getTableName()).append("\",")
			.append("where:\"").append(chartView.getWhereCondition()).append("\",")
			.append("itemField:\"").append(chartView.getItemField()).append("\",")
			.append("valueField:\"").append(chartView.getValueField()).append("\"")
			.append("}");
		
//		chartViewBuilder.append("},");
		
//		if (chartView.getEvent() != null) {
//			
//			chartViewBuilder.append("events:{");
//					for (Event event : chartView.getEvent()) {
//		
//						StringBuilder actions = ComboBoxEventBuilder.buildEvent(genApp, baseView, event);
//						chartViewBuilder.append(actions);
//					}
//					Utility.removeCommaFromLast(chartViewBuilder);
//					chartViewBuilder.append("}");
//					
//		}
		
		chartViewBuilder.append("}");

		return chartViewBuilder;

	}
}
