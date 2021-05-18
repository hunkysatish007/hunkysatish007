package com.mobilous.mobileweb.uibuilder;

import com.mobilous.mobileweb.EventBuilder.TextFieldViewEventBuilder;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.TextField;
import com.mobilous.mobileweb.util.Utility;

public class TextFieldBuilder {

	private static GenApp genApp;

	/*
	 * {id:"ui-16",name:"TextField_20130108143600186",
	 * value:"",template:'',placeholder:"textfield",
	 * type:"text",viewtype:"TextField", frame:{x:60,y:200,width:100,height:20},
	 * font:{size:12,align:"left", color:{red:138,blue:43,green:43,alpha:1}}},
	 */

	/*
	 * {"frame":{"height":20.0,"width":100.0,"y":79.0,"x":90.0},
	 * "placeholder":"","value":"","type":"TextField"},
	 */

	public static StringBuilder build(BaseView baseView, GenApp genApp) {

		TextField textField = (TextField) baseView;
		// JSON Version
		/*
		 * JSONObject jsonObject = new JSONObject(); jsonObject.put("id",
		 * textField.getUiid()); jsonObject.put("name", textField.getName());
		 * jsonObject.put("value", textField.getValue()); String value =
		 * textField.getText(); if(value.contains("[")) {
		 * jsonObject.put("value", ""); jsonObject.put("template", value);
		 * 
		 * }else{ jsonObject.put("value", value); jsonObject.put("template",
		 * ""); } jsonObject.put("viewtype", textField.getViewType());
		 * jsonObject.put("placeholder", textField.getPlaceHolder());
		 * jsonObject.put("frame", FrameBuilder.build(textField.getFrame()));
		 * jsonObject.put("font", FontBuilder.build(textField.getFont()));
		 * 
		 * return jsonObject;
		 */

		StringBuilder textFieldBuilder = new StringBuilder();

		textFieldBuilder.append("{id:\"").append(textField.getUiid())
				.append("\",");
		textFieldBuilder.append("name:\"").append(textField.getName())
				.append("\",");
		textFieldBuilder.append("hidden:\"").append(textField.isHidden())
				.append("\",");
		textFieldBuilder.append("voiceRecognizable:").append(textField.isVoiceRecognizable())
		.append(",");
		textFieldBuilder.append("taborder:\"").append(textField.getTabOrder()).append("\",");
		textFieldBuilder.append("cornerRadius:").append(textField.getCornerRadius()).append(",");
		textFieldBuilder.append("keyboardType:\"").append(textField.getKeyboardType()).append("\",");
		textFieldBuilder.append("charlimit:").append(textField.getCharLimit()).append(",");
		
		String value = Utility.parseText(textField.getText());
		if (value.contains("[")) {
			textFieldBuilder.append("value:\"").append("").append("\",");
			textFieldBuilder.append("template:\"").append(value).append("\",");
		}else if(value.equalsIgnoreCase("__LAT__") || value.equalsIgnoreCase("__LONG__") || value.equalsIgnoreCase("__ADDRESS__") || value.equalsIgnoreCase("__ROUTETIME__") || value.equalsIgnoreCase("__ROUTEDISTANCE__")
				||  value.equalsIgnoreCase("__NUMREC__")|| value.equalsIgnoreCase("__NOW__")){
			textFieldBuilder.append("globalValue:\"").append(value).append("\",");
			textFieldBuilder.append("value:\"").append("\",");
			textFieldBuilder.append("template:\"").append("").append("\",");
		}else {
			textFieldBuilder.append("value:\"").append(value).append("\",");
			textFieldBuilder.append("template:\"").append("").append("\",");
		}
		textFieldBuilder.append("readonly:\"").append(!textField.isEditable()).append("\",");
		if (textField.isNumeric()) {
			textFieldBuilder.append("viewtype:\"").append("NumericField")
					.append("\",");
			textFieldBuilder.append("range:{").append("min:\"" + textField.getMinRange() + "\"," + "max : \"" + textField.getMaxRange()).append("\"},");
			
		} else {
			textFieldBuilder.append("viewtype:\"")
					.append(textField.getViewType()).append("\",");
		}
		if (textField.isSecure()) {
			textFieldBuilder.append("type:\"").append("password").append("\",");
			textFieldBuilder.append("secure:\"").append(textField.isSecure()).append("\",");
		} else {
			if (textField.isNumeric()) {
				textFieldBuilder.append("type:\"").append("number")
						.append("\",");
			} else {
				textFieldBuilder.append("type:\"").append("text").append("\",");
			}
		}

		textFieldBuilder.append("placeholder:\"").append(Utility.parseText(textField.getPlaceHolder())).append("\",");
		textFieldBuilder.append("inputFormatType:\"").append(textField.getInputFormatType()).append("\",");
		textFieldBuilder.append("formatType:\"").append(textField.getFormatType()).append("\",");
		textFieldBuilder.append("formatSubtype:\"").append(textField.getFormatSubtype()).append("\",");
		textFieldBuilder.append("specifierType:\"").append(textField.getSpecifierType()).append("\",");
		textFieldBuilder.append("formatSpecifier:\"").append(textField.getFormatSpecifier()).append("\",");
		textFieldBuilder.append("autoCapitalization:\"").append(textField.getAutocapitalizationType()).append("\",");
		textFieldBuilder.append("verticalalignment:\"").append(textField.getVerticalAlignment()).append("\",");
		textFieldBuilder.append("isTrim:").append(textField.isTrim()).append(",");
		textFieldBuilder.append("voiceRecognizable:").append(textField.isVoiceRecognizable()).append(",");
		textFieldBuilder.append("recognitionType:\"").append(textField.getRecognitionType()).append("\",");
	    
		// Below is the code for Border,Padding.
		// Uncomment in Future when requirement comes
		// border:{borderweight:"2",bordercolor:{red:211.0,blue:221.0,green:121.0,alpha:1.0}}

		textFieldBuilder
				.append("border:{")
				.append(BorderBuilder.build(textField.getBorderWidth(),
						textField.getBorderStyle(), textField.getBorderColor()))
				.append("},");
		// padding:{top:10,bottom:10,left:10,right:10}
		if (textField.getPadding() != null) {
			textFieldBuilder.append("padding:{")
					.append(PaddingBuilder.build(textField.getPadding()))
					.append("},");
		}

		// BackGround

		textFieldBuilder.append("background:{")
				.append(ColorBuilder.build(textField.getBackgroundColor()))
				.append("},");

		textFieldBuilder.append("frame:{")
				.append(FrameBuilder.build(textField.getFrame())).append("},");
		textFieldBuilder.append("font:{")
				.append(FontBuilder.build(textField.getFont())).append("},");

		if (textField.getEvent() != null) {
			textFieldBuilder.append("events:{");
			for (Event event : baseView.getEvent()) {

				StringBuilder actions = TextFieldViewEventBuilder.buildEvent(
						genApp, baseView, event);
				textFieldBuilder.append(actions);
			}
			Utility.removeCommaFromLast(textFieldBuilder);
			textFieldBuilder.append("}");
		}
		textFieldBuilder.append("}");
		return textFieldBuilder;

	}

	/*
	 * {id:"ui-16",name:"TextField_20130108143600186",value:"",template:
	 * '',placeholder:"textfield",type:"text",viewtype:"TextField",frame:{x:60,y:200,width:100,height:20},font:{size:12,align:"left",color:{red:138,blue:43,green:43,alpha:1}}},
	 * 
	 * {"id":"ui-1","name":"TextField_20130202150020272", "value":"",
	 * "template":"","placeholder":"",
	 * "frame":{"height":20.0,"width":100.0,"y":79.0
	 * ,"x":90.0},"font":{"color":{"red"
	 * :0.0,"blue":0.0,"green":0.0,"alpha":1.0},"align":"left","size":12},},
	 */

}
