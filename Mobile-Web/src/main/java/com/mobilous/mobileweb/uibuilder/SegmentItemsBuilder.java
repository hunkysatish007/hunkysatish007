package com.mobilous.mobileweb.uibuilder;

import java.util.ArrayList;

import com.mobilous.mobileweb.actionbuilder.ActionBuilder;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.etc.ImageItem;
import com.mobilous.mobileweb.etc.TextItem;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.Segment;
import com.mobilous.mobileweb.ui.ToolBarItems;
import com.mobilous.mobileweb.util.Utility;

public class SegmentItemsBuilder {

	public static StringBuilder build(ArrayList<ToolBarItems> items,
			BaseView baseView, GenApp genapp, Segment segment) {

		StringBuilder itemsBuilder = new StringBuilder("[");

		for (int i = 0; i < items.size(); i++) {
			if (items.get(i).getType().equalsIgnoreCase("TextItem")) {
				TextItem textItem = (TextItem) items.get(i);
				itemsBuilder
						.append("{")
						.append("name:\"" + textItem.getText() + "\",")
						.append("id:\"" + segment.getUiid()+"-"+ i + "\",")
						.append("textColor:{" + ColorBuilder.build(textItem.getTextColor()) + "},")
						.append("onTapTextColor:{" + ColorBuilder.build(textItem.getOnTapTextColor()) + "},")
						.append("onTapTintColor:{" + ColorBuilder.build(textItem.getOnTapTintColor()) + "},")
						.append("font:{")
						.append(FontBuilder.build(textItem.getFont()))
						.append("},")
						.append("type:\"" + textItem.getType() + "\",");
				if(segment.getSegmentInitialValue().indexOf("[") != -1 && segment.getSegmentInitialValue().indexOf("]") != -1){
					itemsBuilder.append("\"selected\":false,");
					itemsBuilder.append("\"template\":\"" +segment.getSegmentInitialValue()+"\",");
				}else{
					if(segment.getSegmentInitialValue().equalsIgnoreCase(textItem.getText())){
						itemsBuilder.append("\"selected\":true,");
					}else{
						itemsBuilder.append("\"selected\":false,");
					}
					itemsBuilder.append("\"template\":\"\",");
				}
				
				
				if (textItem.getEvent() != null) {
					itemsBuilder.append("events:{");
					for (Event event : textItem.getEvent()) {
						StringBuilder actions = ActionBuilder.buildAction(
								genapp, baseView, event);
						itemsBuilder.append(actions);
					}
					Utility.removeCommaFromLast(itemsBuilder);
					itemsBuilder.append("}},");
				}

			} else if (items.get(i).getType().equalsIgnoreCase("ImageItem")) {
				ImageItem imageItem = (ImageItem) items.get(i);
				itemsBuilder
						.append("{")
						.append("src:\""
								+ imageItem.getImageDic().getFileName() + "."
								+ imageItem.getImageDic().getFileExt() + "\",")
						.append("id:\"" + segment.getUiid()+"-"+ i + "\",")
						.append("type:\"" + imageItem.getType() + "\",");
				if (imageItem.getEvent() != null) {
					itemsBuilder.append("events:{");
					for (Event event : imageItem.getEvent()) {
						StringBuilder actions = ActionBuilder.buildAction(
								genapp, baseView, event);
						itemsBuilder.append(actions);
					}
					Utility.removeCommaFromLast(itemsBuilder);
					itemsBuilder.append("}},");
				}

			}
		}

		itemsBuilder.append("]");

		return itemsBuilder;

	}
}
