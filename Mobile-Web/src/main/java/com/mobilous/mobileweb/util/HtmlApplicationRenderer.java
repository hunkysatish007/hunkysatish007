package com.mobilous.mobileweb.util;

import java.util.Map;

import com.mobilous.mobileweb.uibuilder.PageBuilder;
import com.mobilous.mobileweb.app.GenApp;

public class HtmlApplicationRenderer implements ApplicationRenderer {
	
	@Override
	public Map<String, String> render(GenApp genapp) {
		return PageBuilder.generateHTMLDataModel(genapp);
	}

}
