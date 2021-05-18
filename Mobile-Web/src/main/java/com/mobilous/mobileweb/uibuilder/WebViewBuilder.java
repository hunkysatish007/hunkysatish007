package com.mobilous.mobileweb.uibuilder;

import com.mobilous.mobileweb.EventBuilder.WebViewEventBuilder;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.WebView;
import com.mobilous.mobileweb.util.Utility;

public class WebViewBuilder {

	public static StringBuilder build(BaseView baseView, GenApp genApp) {
		
		/*{id:"ui-26",name:"WebView_20130114144445506",
		 * viewtype:"WebView",frame:{x:350,y:350,width:150,height:100},
		 * src:"http://www.w3schools.com/",scale:"",lineheight:20}*/
		
		WebView webView = (WebView)baseView;
		StringBuilder webViewBuilder = new StringBuilder();
		
		webViewBuilder.append("{id:\"").append(webView.getUiid()).append("\",");
		webViewBuilder.append("name:\"").append(webView.getName()).append("\",");
		webViewBuilder.append("viewtype:\"").append(webView.getViewType()).append("\",");
		webViewBuilder.append("taborder:\"").append(webView.getTabOrder()).append("\",");
		webViewBuilder.append("hidden:").append(webView.isHidden()).append(",");
		webViewBuilder.append("border:{").append(BorderBuilder.build(webView.getBorderWidth(),webView.getBorderStyle(), webView.getBorderColor())).append("},");
		webViewBuilder.append("frame:{").append(FrameBuilder.build(webView.getFrame())).append("},");
		webViewBuilder.append("src:\"").append(webView.getFilename().getUrl(genApp)).append("\",");
		webViewBuilder.append("scale:\"").append(webView.getScale()).append("\",");
		// Hard coded value - data source unknown
		webViewBuilder.append("lineheight:\"").append("20").append("\",");
	//	webViewBuilder.append("}");
		
		//Events
		if(baseView.getEvent()!=null){
			webViewBuilder.append("events:{");
				for(Event event: baseView.getEvent()){
					StringBuilder actions = WebViewEventBuilder.buildEvent(genApp,baseView,event,-1);
					webViewBuilder.append(actions);
				}
				Utility.removeCommaFromLast(webViewBuilder);
				webViewBuilder.append("}");
		}
		webViewBuilder.append("}");
		
		
		return webViewBuilder;
	}
}
