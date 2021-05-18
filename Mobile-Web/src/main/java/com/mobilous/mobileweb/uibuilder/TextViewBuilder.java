package com.mobilous.mobileweb.uibuilder;

import com.mobilous.mobileweb.EventBuilder.TextFieldViewEventBuilder;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.TextView;
import com.mobilous.mobileweb.util.Utility;

public class TextViewBuilder {

	/*
	 * {id:"ui-17",name:"TextView_20130108143653988",
	 * value:"textview",viewtype:"TextArea",readonly:"true",
	 * frame:{x:100,y:350,width:100,height:20},
	 * font:{size:12,align:"left",color:{red:138,blue:43,green:43,alpha:1}},
	 * background:{red:138,blue:43,green:43,alpha:1}},
	 */

	// Mine output
	/*
	 * {"id":"ui-7","frame":{"height":60.0,"width":120.0,"y":101.0,"x":152.0},
	 * "font":{"color":{"red":0.0,"blue":0.0,"green":0.0,"alpha":1.0},
	 * "align":"left"
	 * ,"size":12},"background":{"red":0.0,"blue":0.0,"green":0.0,"alpha":1.0},
	 * "name"
	 * :"TextView_20130207111251981","value":"TextView","readonly":false,"viewtype"
	 * :"TextView"}
	 */

	private static String clearString(String str) {
		// new line is converted in to 'nl9' which is again converted in to '\n'
		// in javascript.
		String strOrig = str.replaceAll("\n", "'nl9'").replaceAll("\"", "\'");

		return strOrig;

	}

	public static StringBuilder build(BaseView baseView, GenApp genApp) {

		TextView textView = (TextView) baseView;

		// JSON Version
		/*
		 * JSONObject jsonObject = new JSONObject(); jsonObject.put("id",
		 * textView.getUiid()); jsonObject.put("name", textView.getName());
		 * jsonObject.put("value", textView.getText()); jsonObject.put("text",
		 * textView.getText()); // The currently working viewtype is TextArea //
		 * From Java Model comes TextView - need confirmation for the right
		 * viewtype //jsonObject.put("viewtype", textView.getViewType());
		 * jsonObject.put("viewtype", "TextArea"); jsonObject.put("readonly",
		 * !textView.isEditable()); jsonObject.put("frame",
		 * FrameBuilder.build(textView.getFrame())); jsonObject.put("font",
		 * FontBuilder.build(textView.getFont())); jsonObject.put("background",
		 * ColorBuilder.build(textView.getBackgroundColor()));
		 * 
		 * 
		 * 
		 * return jsonObject;
		 */

		StringBuilder textViewBuilder = new StringBuilder();

		textViewBuilder.append("{id:\"").append(textView.getUiid()).append("\",");
		textViewBuilder.append("name:\"").append(textView.getName()).append("\",");
		textViewBuilder.append("viewtype:\"").append("TextArea").append("\",");
		
		String value = "";

		value = clearString(Utility.parseText(textView.getText().toString()));

		if (value.contains("[")) {
			textViewBuilder.append("value:\"").append("").append("\",");
			textViewBuilder.append("template:\"").append(value).append("\",");
		}else if(value.equalsIgnoreCase("__LAT__") || value.equalsIgnoreCase("__LONG__") || value.equalsIgnoreCase("__ADDRESS__") || value.equalsIgnoreCase("__ROUTETIME__") || value.equalsIgnoreCase("__ROUTEDISTANCE__")
				|| value.equalsIgnoreCase("__NUMREC__")){
			textViewBuilder.append("globalValue:\"").append(value).append("\",");
			textViewBuilder.append("value:\"").append("\",");
			textViewBuilder.append("template:\"").append("").append("\",");
		}else {
			textViewBuilder.append("value:\"").append(value).append("\",");
			textViewBuilder.append("template:\"").append("").append("\",");
		}

		textViewBuilder.append("text:\"").append(value).append("\",");
		
		textViewBuilder.append("charlimit:").append(textView.getCharLimit()).append(",");
		textViewBuilder.append("refFileHidden:\"").append(textView.isRefFileHidden()).append("\",");
		textViewBuilder.append("refFileURL:\"").append(textView.getRefFileURL()).append("\",");
		textViewBuilder.append("hidden:\"").append(textView.isHidden()).append("\",");
		textViewBuilder.append("readonly:\"").append(!textView.isEditable()).append("\",");
		textViewBuilder.append("isTrim:").append(textView.isTrim()).append(",");
		textViewBuilder.append("underline:").append(textView.isUnderline()).append(",");
		textViewBuilder.append("strikeout:").append(textView.isStrikeout()).append(",");
		textViewBuilder.append("flexibleHeight:").append(textView.isFlexibleHeight()).append(",");
		textViewBuilder.append("keyboardType:\"").append(textView.getKeyboardType()).append("\",");
		textViewBuilder.append("autoCapitalization:\"").append(textView.getAutocapitalizationType()).append("\",");
		textViewBuilder.append("taborder:\"").append(textView.getTabOrder()).append("\",");
		textViewBuilder.append("cornerRadius:").append(textView.getCornerRadius()).append(",");
		textViewBuilder.append("voiceRecognizable:").append(textView.isVoiceRecognizable()).append(",");
		textViewBuilder.append("continueVR:").append(textView.isContinueVR()).append(",");
		textViewBuilder.append("recognitionType:\"").append(textView.getRecognitionType()).append("\",");
		textViewBuilder.append("scrollPosition:\"").append(textView.getScrollPosition()).append("\",");
		textViewBuilder.append("verticalalignment:\"").append(textView.getVerticalAlignment()).append("\",");
	    
		textViewBuilder.append("frame:{")
				.append(FrameBuilder.build(textView.getFrame())).append("},");
		textViewBuilder.append("font:{")
				.append(FontBuilder.build(textView.getFont())).append("},");
		// Below is the code for Border,Padding.
		// Uncomment in Future when requirement comes
		// border:{borderweight:"2",bordercolor:{red:211.0,blue:221.0,green:121.0,alpha:1.0}}
		textViewBuilder
				.append("border:{")
				.append(BorderBuilder.build(textView.getBorderWidth(),
						textView.getBorderStyle(), textView.getBorderColor()))
				.append("},");
		// padding:{top:10,bottom:10,left:10,right:10}
		if (textView.getPadding() != null) {
			textViewBuilder.append("padding:{")
					.append(PaddingBuilder.build(textView.getPadding()))
					.append("},");
		}

		textViewBuilder.append("background:{")
				.append(ColorBuilder.build(textView.getBackgroundColor()))
				.append("},");
		if (textView.getEvent() != null) {
			textViewBuilder.append("events:{");
			for (Event event : baseView.getEvent()) {

				StringBuilder actions = TextFieldViewEventBuilder.buildEvent(
						genApp, baseView, event);
				textViewBuilder.append(actions);
			}
			Utility.removeCommaFromLast(textViewBuilder);
			textViewBuilder.append("}");
		}
		textViewBuilder.append("}");

		return textViewBuilder;

	}

}
