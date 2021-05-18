package com.mobilous.mobileweb.uibuilder;

import com.mobilous.mobileweb.EventBuilder.SearchBarEventBuilder;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.SearchBar;
import com.mobilous.mobileweb.util.Utility;

public class SearchBarBuilder {

	/*
	 * {id:"ui-24",name:"SearchBar_20130114122222123",
	 * value:"Search Bar",type:"search",viewtype:"SearchBar",
	 * placeholder:"",frame:{x:80,y:0,width:150,height:20},style:"",
	 * background:{red:204,blue:153,green:0,alpha:1},lineheight:20},
	 */

	public static StringBuilder build(BaseView baseView, GenApp genApp) {

		SearchBar searchBar = (SearchBar) baseView;
		// JSON Version
		/*
		 * JSONObject jsonObject = new JSONObject(); jsonObject.put("id",
		 * searchBar.getUiid()); jsonObject.put("name", searchBar.getName());
		 * jsonObject.put("value", searchBar.getText()); jsonObject.put("type",
		 * "search"); jsonObject.put("viewtype", searchBar.getViewType());
		 * jsonObject.put("placeholder", searchBar.getPlaceHolder());
		 * jsonObject.put("frame", FrameBuilder.build(searchBar.getFrame()));
		 * jsonObject.put("style", searchBar.getBarStyle());
		 * jsonObject.put("background",
		 * ColorBuilder.build(searchBar.getBackgroundColor()));
		 * jsonObject.put("lineheight", "20");
		 * 
		 * return jsonObject;
		 */

		StringBuilder searchBarBuilder = new StringBuilder();

		searchBarBuilder.append("{id:\"").append(searchBar.getUiid())
				.append("\",");
		searchBarBuilder.append("name:\"").append(searchBar.getName())
				.append("\",");
		searchBarBuilder.append("hidden:").append(searchBar.getHidden()).append(",");
		searchBarBuilder.append("value:\"").append(Utility.parseText(searchBar.getText()))
				.append("\",");
		searchBarBuilder.append("type:\"").append("search").append("\",");
		searchBarBuilder.append("viewtype:\"").append(searchBar.getViewType())
				.append("\",");
		searchBarBuilder.append("taborder:\"").append(searchBar.getTabOrder()).append("\",");
		searchBarBuilder.append("placeholder:\"")
				.append(searchBar.getPlaceHolder()).append("\",");
		searchBarBuilder.append("barStyle:\"").append(searchBar.getBarStyle()).append("\",");
		searchBarBuilder.append("verticalalignment:\"").append(searchBar.getVerticalAlignment()).append("\",");
		searchBarBuilder.append("frame:{")
				.append(FrameBuilder.build(searchBar.getFrame())).append("},");
		searchBarBuilder.append("font:{")
				.append(FontBuilder.build(searchBar.getFont())).append("},");
		searchBarBuilder.append("background:{")
				.append(ColorBuilder.build(searchBar.getBackgroundColor()))
				.append("},");
		if (searchBar.getPadding() != null) {
			searchBarBuilder.append("padding:{")
				.append(PaddingBuilder.build(searchBar.getPadding()))
				.append("},");
		}
		searchBarBuilder.append("border:{").append(BorderBuilder.build(searchBar.getBorderWidth(),searchBar.getBorderStyle(), searchBar.getBorderColor())).append("},");
		
		
		if (searchBar.getEvent() != null) {
			searchBarBuilder.append("events:{");
			for (Event event : baseView.getEvent()) {
		
				StringBuilder actions = SearchBarEventBuilder.buildEvent(
						genApp, baseView, event);
				searchBarBuilder.append(actions);
			}
			Utility.removeCommaFromLast(searchBarBuilder);
			searchBarBuilder.append("}");
		}
			
		searchBarBuilder.append("}");

		return searchBarBuilder;

	}
}



