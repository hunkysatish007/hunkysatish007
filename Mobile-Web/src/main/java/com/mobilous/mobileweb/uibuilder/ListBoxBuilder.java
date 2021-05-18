package com.mobilous.mobileweb.uibuilder;

import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.etc.DataArray;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.ListBox;
import com.mobilous.mobileweb.util.Utility;

public class ListBoxBuilder {

	public static StringBuilder build(BaseView baseView, GenApp genApp) {

		ListBox listBox = (ListBox) baseView;

		StringBuilder listBoxBuilder = new StringBuilder();

		listBoxBuilder.append("{id:\"").append(listBox.getUiid()).append("\",");
		listBoxBuilder.append("name:\"").append(listBox.getName())
				.append("\",");
		listBoxBuilder.append("hidden:\"").append(listBox.isHidden())
				.append("\",");
		listBoxBuilder.append("viewtype:\"").append("ListBox").append("\",");
		listBoxBuilder.append("taborder:\"").append(listBox.getTaborder())
				.append("\",");
		listBoxBuilder.append("type:\"").append(listBox.getType())
				.append("\",");
	
		if(listBox.getType().equalsIgnoreCase("DB")){
			listBoxBuilder.append("params:{");
			listBoxBuilder.append("serviceName:\"").append(listBox.getServiceName())
			.append("\",");
			listBoxBuilder.append("tableName:\"").append(listBox.getTablename())
			.append("\",");
			listBoxBuilder.append("displayText:\"").append(Utility.parseText(listBox.getDisplayText()))
			.append("\",");
			listBoxBuilder.append("fieldname:\"").append(listBox.getFieldName())
			.append("\",");
			listBoxBuilder.append("initialValue:\"").append(listBox.getInitialValue())
			.append("\"");
			listBoxBuilder.append("},");
		}else{
			listBoxBuilder.append("selectedIndex:[");
			if (listBox.getSelectedIndex() != null) {
				for(String selectedIndex : listBox.getSelectedIndex()){
					listBoxBuilder.append(selectedIndex + ",");
				}
			}Utility.removeCommaFromLast(listBoxBuilder);
			listBoxBuilder.append("],");
		}
		
		

		listBoxBuilder.append("frame:{")
				.append(FrameBuilder.build(listBox.getFrame())).append("},");
		listBoxBuilder.append("font:{")
				.append(FontBuilder.build(listBox.getFont())).append("},");
		listBoxBuilder
				.append("border:{")
				.append(BorderBuilder.build(listBox.getBorderWidth(),
						listBox.getBorderStyle(), listBox.getBorderColor()))
				.append("},");
		if (listBox.getPadding() != null) {
			listBoxBuilder.append("padding:{")
					.append(PaddingBuilder.build(listBox.getPadding()))
					.append("},");
		}

		listBoxBuilder.append("background:{")
				.append(ColorBuilder.build(listBox.getBackgroundColor()))
				.append("},");
		listBoxBuilder.append("dataArray:[");
		if (listBox.getDataArray() != null) {
			for(DataArray listDataArray : listBox.getDataArray()){
				listBoxBuilder.append("{");
				listBoxBuilder.append("fieldName:\"").append(listDataArray.getFieldname()).append("\",");
				listBoxBuilder.append("fieldValue:\"").append(listDataArray.getFieldname()).append("\"");
				listBoxBuilder.append("},");
			}
		}
		
		Utility.removeCommaFromLast(listBoxBuilder);
		listBoxBuilder.append("],");
		/*
		 * if (listBox.getEvent() != null) { listBoxBuilder.append("events:{");
		 * for (Event event : baseView.getEvent()) {
		 * 
		 * StringBuilder actions = TextFieldViewEventBuilder.buildEvent( genApp,
		 * baseView, event); listBoxBuilder.append(actions); }
		 * Utility.removeCommaFromLast(listBoxBuilder);
		 * listBoxBuilder.append("}"); }
		 */
		listBoxBuilder.append("}");

		return listBoxBuilder;

	}

}

