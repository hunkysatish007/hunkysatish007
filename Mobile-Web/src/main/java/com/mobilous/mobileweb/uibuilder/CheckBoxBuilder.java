package com.mobilous.mobileweb.uibuilder;

import com.mobilous.mobileweb.EventBuilder.ToggleButtonEventBuilder;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.Button;
import com.mobilous.mobileweb.util.Utility;

public class CheckBoxBuilder {

	/*
	 * {id:"ui-20",name:"CheckBox_20130110175503021",text:"hello",type:"checkbox"
	 * ,
	 * viewtype:"CheckBox",frame:{x:190,y:150,width:110,height:25},lineheight:20
	 * , font:{size:15,align:"left",color:{red:238,blue:143,green:43,alpha:1}},
	 * value:"on",onimage:
	 * "http://210.189.125.254:8080/appexe/api/download/image/855/bug.png",
	 * offimage:
	 * "http://210.189.125.254:8080/appexe/api/download/image/855/big-smiley-002.gif"
	 * },
	 * 
	 * 
	 * "id":"ui-9","text":"Check Me!","frame":{"height":30.0,"width":150.0,"y":198.0
	 * ,"x":170.0},
	 * "onimage":"","font":{"color":{"red":0.0,"blue":0.0,"green":0.0
	 * ,"alpha":1.0}, "align":"left","size":12},"lineheight":"20","name":
	 * "CheckBox_20130207134217163",
	 * "value":"true","type":"checkbox","offimage":
	 * "Koala crop22.png","viewtype":"checkbox"
	 */

	/*
	 * {id:"ui-20",name:"CheckBox_20130110175503021",text:"hello",type:"checkbox"
	 * ,viewtype:"CheckBox",
	 * frame:{x:190,y:150,width:110,height:25},lineheight:20
	 * ,font:{size:15,align:"left",color:{red:238,blue:143,green:43,alpha:1}},
	 * value:"on",onimage:
	 * "http://210.189.125.254:8080/appexe/api/download/image/855/bug.png",
	 * offimage:
	 * "http://210.189.125.254:8080/appexe/api/download/image/855/big-smiley-002.gif"
	 * }
	 */

	/*
	 * {"id":"ui-8","text":"Check Me!","frame":{"height":30.0,"width":150.0,"y":
	 * 198.0,"x":170.0},"onimage":"",
	 * "font":{"color":{"red":0.0,"blue":0.0,"green"
	 * :0.0,"alpha":1.0},"align":"left","size":12},
	 * "lineheight":"20","name":"CheckBox_20130207134217163"
	 * ,"value":"true","type":"CheckBox", offimage":"Koala
	 * crop22.png","viewtype":"CheckBox"}
	 */

	public static StringBuilder build(BaseView baseView, GenApp genApp) {

		Button checkBox = (Button) baseView;

		/*
		 * JSON Version JSONObject jsonObject = new JSONObject();
		 * jsonObject.put("id", checkBox.getUiid()); jsonObject.put("name",
		 * checkBox.getName()); jsonObject.put("text", checkBox.getTitle());
		 * jsonObject.put("type", checkBox.getType().toLowerCase());
		 * jsonObject.put("viewtype", checkBox.getType());
		 * jsonObject.put("frame", FrameBuilder.build(checkBox.getFrame()));
		 * jsonObject.put("lineheight", "20"); jsonObject.put("font",
		 * FontBuilder.build(checkBox.getNormalFont())); jsonObject.put("value",
		 * checkBox.getOn().equals("true") ? "on" : "off");
		 * if(checkBox.getSelectedImage() != null) { jsonObject.put("onimage",
		 * checkBox.getSelectedImage().getFileName() + '.' +
		 * checkBox.getSelectedImage().getFileExt()); } else {
		 * jsonObject.put("onimage", ""); }
		 * 
		 * if(checkBox.getNormalImage() != null) {
		 * 
		 * jsonObject.put("offimage", checkBox.getNormalImage().getFileName() +
		 * '.' + checkBox.getNormalImage().getFileExt());
		 * 
		 * } else {
		 * 
		 * jsonObject.put("offimage", ""); }
		 * 
		 * return jsonObject;
		 */

		StringBuilder checkBoxBuilder = new StringBuilder();
		checkBoxBuilder.append("{id:\"").append(checkBox.getUiid())
				.append("\",");
		checkBoxBuilder.append("name:\"").append(checkBox.getName())
				.append("\",");
		checkBoxBuilder.append("hidden:\"").append(checkBox.isHidden()).append("\",");
		checkBoxBuilder.append("text:\"").append(Utility.parseText(checkBox.getTitle()))
				.append("\",");
		checkBoxBuilder.append("type:\"")
				.append(checkBox.getType().toLowerCase()).append("\",");
		if(checkBox.getFieldname().equalsIgnoreCase("")){
			checkBoxBuilder.append("template:\"").append(checkBox.getCheckboxState())
			.append("\",");
		}else{
			checkBoxBuilder.append("template:\"").append(checkBox.getFieldname())
			.append("\",");
		}
		
		checkBoxBuilder.append("valueFormat:\"").append("\",");
		checkBoxBuilder.append("viewtype:\"").append(checkBox.getType())
				.append("\",");
		checkBoxBuilder.append("taborder:\"").append(checkBox.getTabOrder()).append("\",");
		checkBoxBuilder.append("frame:{")
				.append(FrameBuilder.build(checkBox.getFrame())).append("},");
		checkBoxBuilder.append("background:{").append(ColorBuilder.build(checkBox.getBackgroundColor())).append("},");
		checkBoxBuilder.append("border:{").append(BorderBuilder.build(checkBox.getBorderWidth(),checkBox.getBorderStyle(),checkBox.getBorderColor())).append("},");;
		checkBoxBuilder.append("lineheight:\"").append("20").append("\",");
		checkBoxBuilder.append("font:{")
				.append(FontBuilder.build(checkBox.getNormalFont()))
				.append("},");
		checkBoxBuilder.append("value:\"")
				.append(checkBox.getOn().equals("true") ? "on" : "off")
				.append("\",");
		checkBoxBuilder.append("verticalalignment:\"").append(checkBox.getVerticalAlignment()).append("\",");
		checkBoxBuilder.append("textDecoration:\"").append(checkBox.getTextDecoration().trim()).append("\",");
		if (checkBox.getPadding() != null) {
			checkBoxBuilder.append("padding:{")
				.append(PaddingBuilder.build(checkBox.getPadding()))
				.append("},");
		}
		if (checkBox.getSelectedImage().getFileName() != "") {
			checkBoxBuilder
					.append("onimage:\"")
					.append(checkBox.getSelectedImage().getFileName() + '.'
							+ checkBox.getSelectedImage().getFileExt())
					.append("\",");
		} else {
			checkBoxBuilder.append("onimage:\"").append("checked-44px.png")
					.append("\",");
		}

		if (checkBox.getNormalImage().getFileName() != "") {
			checkBoxBuilder
					.append("offimage:\"")
					.append(checkBox.getNormalImage().getFileName() + '.'
							+ checkBox.getNormalImage().getFileExt())
					.append("\",");
		} else {
			checkBoxBuilder.append("offimage:\"").append("unchecked-44px.png")
					.append("\",");
		}

		// Events
		if (checkBox.getEvent() != null) {
			checkBoxBuilder.append("events:{");
			for (Event event : baseView.getEvent()) {

				StringBuilder actions = ToggleButtonEventBuilder.buildEvent(
						genApp, baseView, event);
				checkBoxBuilder.append(actions);
			}
			Utility.removeCommaFromLast(checkBoxBuilder);
			checkBoxBuilder.append("}");
		}
		checkBoxBuilder.append("}");

		return checkBoxBuilder;

	}

}
