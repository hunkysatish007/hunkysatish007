package com.mobilous.mobileweb.uibuilder;

import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.attribute.Point;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.Label;
import com.mobilous.mobileweb.util.Utility;

public class LabelBuilder {

	public static StringBuilder build(BaseView baseview, GenApp genapp) {

		// JSONObject jsonObject = new JSONObject();
		// {id:"ui-2",name:"label2",value:"This page",template:'',viewtype:"Label",frame:{x:20,y:200,width:400,height:100},font:{size:20,align:"left",color:{name:"green"}}},
		// {id:"ui-0",name:"Label_20130227145059716",value:"One value",template:"",viewtype:"Label",frame:{x:"106.0",y:"128.0",width:"80.0",height:"20.0"},font:{size:"12",align:"left",color:{red:"0.0",blue:"0.0",green:"0.0",alpha:"1.0"}}}
		// {id:"ui-0",name:"label1",
		// value:"This page is non-scrollable",template:'',
		// viewtype:"Label",

		// all comlex structures are classes
		// the pairs are one object
		// frame:{x:37,y:126,width:400,height:40},

		// font:{size:20,align:"left",
		// color:{red:138,blue:43,green:43,alpha:1}}},
		// contents.append("pid:\"").append(genapp.getProjectId()).append("\",\n\t");
		Label label = (Label) baseview;

		StringBuilder labelBuilder = new StringBuilder();

		// jsonObject.put("id", label.getUiid());
		// jsonObject.put("name", label.getName());
		//System.out.println(label.getText());
		String value = Utility.parseText(label.getText().replaceAll("\"", " &quot"));
		//System.out.println(value);
		// if(value.contains("[")) {

		// jsonObject.put("value", "");
		// jsonObject.put("template", value);

		// } else {

		// jsonObject.put("value", value);
		// jsonObject.put("template", "");
		// }

		// jsonObject.put("viewtype", label.getViewType());
		// Point frame = label.getFrame();
		// jsonObject.put("frame", FrameBuilder.build(frame));
		// jsonObject.put("font", label.getFont());

		// return jsonObject;
		
		labelBuilder.append("{id:\"").append(label.getUiid()).append("\",");
		labelBuilder.append("name:\"").append(label.getName()).append("\",");
		labelBuilder.append("hidden:\"").append(label.isHidden()).append("\",");
		labelBuilder.append("isTrim:").append(label.isTrim()).append(",");
		if (label.getType().equals("LinkLabel")) {
			labelBuilder.append("link:\"").append(label.getLink()).append("\",");
			labelBuilder.append("option:").append(label.getOptionIndex()).append(",");
			
		}
		if (value.contains("[")) {
			labelBuilder.append("value:\"").append("\",");
			labelBuilder.append("template:\"").append(value).append("\",");
		}else if(value.equalsIgnoreCase("__LAT__") || value.equalsIgnoreCase("__LONG__") || value.equalsIgnoreCase("__ADDRESS__") || value.equalsIgnoreCase("__ROUTETIME__") || value.equalsIgnoreCase("__ROUTEDISTANCE__")
				|| value.equalsIgnoreCase("__NUMREC__") || value.equalsIgnoreCase("__NOW__")){
			labelBuilder.append("globalValue:\"").append(value).append("\",");
			labelBuilder.append("value:\"").append("\",");
			labelBuilder.append("template:\"").append("").append("\",");
		}else {
			labelBuilder.append("value:\"").append(value).append("\",");
			labelBuilder.append("template:\"").append("\",");
		}
		
		labelBuilder.append("viewtype:\"").append(label.getType())
				.append("\",");
		labelBuilder.append("taborder:\"").append(label.getTabOrder()).append("\",");
		labelBuilder.append("formatType:\"").append(label.getFormatType()).append("\",");
		labelBuilder.append("formatSubtype:\"").append(label.getFormatSubtype()).append("\",");
		labelBuilder.append("specifierType:\"").append(label.getSpecifierType()).append("\",");
		labelBuilder.append("formatSpecifier:\"").append(label.getFormatSpecifier()).append("\",");
		labelBuilder.append("autoCapitalization:\"").append(label.getAutocapitalizationType()).append("\",");
		labelBuilder.append("verticalalignment:\"").append(label.getVerticalAlignment()).append("\",");
		labelBuilder.append("textDecoration:\"").append(label.getTextDecoration().trim()).append("\",");
		labelBuilder.append("textShadow:").append(label.isTextShadow()).append(",");
		Point frame = label.getFrame();
		
		labelBuilder.append("frame:{").append(FrameBuilder.build(frame)).append("},");
		labelBuilder.append("border:{").append(BorderBuilder.build(label.getBorderWidth(),label.getBorderStyle(), label.getBorderColor())).append("},");
		labelBuilder.append("background:{").append(ColorBuilder.build(label.getBackgroundColor())).append("},");
		
		if (label.getPadding() != null) {
			labelBuilder.append("padding:{")
					.append(PaddingBuilder.build(label.getPadding()))
					.append("},");
		}
		labelBuilder.append("font:{")
				.append(FontBuilder.build(label.getFont())).append("}");
		
		labelBuilder.append("}");

		return labelBuilder;

	}

}
