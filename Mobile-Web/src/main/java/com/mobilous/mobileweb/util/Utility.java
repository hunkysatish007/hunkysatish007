//This package contains Utility Functions
package com.mobilous.mobileweb.util;

import java.lang.reflect.Array;
import java.util.ArrayList;

import org.json.simple.JSONObject;

import com.mobilous.mobileweb.action.Action;
import com.mobilous.mobileweb.app.DefFile;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.app.Page;
import com.mobilous.mobileweb.attribute.Font;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.parser.ADFParser;
import com.mobilous.mobileweb.parser.UIParser;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.Label;
import com.mobilous.mobileweb.ui.TextField;

public class Utility {

	@SuppressWarnings("finally")
	public static StringBuilder removeCommaFromLast(StringBuilder temp) {
		StringBuilder content = new StringBuilder();
		try {

			char comma = temp.charAt((temp.length()) - 1);
			if (comma == ',') {
				content = temp.deleteCharAt((temp.length()) - 1);
			} else {
				content = temp;
			}
		} catch (StringIndexOutOfBoundsException e) {
			// Exception code goes here
			//System.out.println("Event implemented in appexe does not exist in this code");

		} finally {
			return content;
		}
	}

	public static JSONObject getCallbackData(Action action) {
		JSONObject callback = new JSONObject();
		try {
			for (Event event : action.getEvent()) {
				callback.put(
						event.getEventName().substring(
								event.getEventName().lastIndexOf("_") + 1,
								event.getEventName().length()),
						event.getEventName());
			}
		} catch (Exception e) {
			// System.out.println("no available callbacks...");
		}

		return callback;
	}

	public static String getDefFileIDByFilename(GenApp genApp, String filename) {
		for (DefFile deffile : genApp.getPages()) {
			if (deffile.getFileName().equalsIgnoreCase(filename))
				return deffile.getFileName();
		}
		return "";
	}

	public static DefFile getDefFileByID(ArrayList<DefFile> pages,
			String defFileID) {
		for (DefFile deffile : pages) {
			if (deffile.getDefFileID().equalsIgnoreCase(defFileID)) {
				return deffile;
			}
		}
		return null;
	}

	public static String getDataSource(String field) {
		String fieldname = "";
		String str[] = field.split("\\[");
		for (String fld : str) {
			if (fld.indexOf("]") != -1) {
				fieldname = fieldname + fld.substring(0, fld.indexOf("]"))
						+ ",";
			}
		}
		if (fieldname.length() > 0)
			fieldname = fieldname.substring(0, fieldname.length() - 1);
		else
			return "default";
		String fnames[] = fieldname.split(",");
		if ((fnames.length > 1) || (fieldname.length() != field.length() - 2))
			return "INVALID";
		return fieldname;
	}

	public static String getMainAttrOfName(ArrayList<DefFile> pages,
			String defFileID, String name) {
		return getMainAttribute(getViewType(pages, defFileID, name));
	}

	public static String getViewType(ArrayList<DefFile> pages,
			String defFileID, String name) {
		String viewType = "";
		String objName = name.replace("[", "").replace("]", "");

		Page page = getDefFileByID(pages, defFileID).getPage();
		for (BaseView baseview : page.getChildren()) {
			if (baseview.getName().equalsIgnoreCase(objName))
				viewType = baseview.getViewType();
		}
		if (viewType.length() <= 0)
			return getViewTypeFromAllPages(pages, objName);

		return viewType;
	}

	public static String getViewTypeFromAllPages(ArrayList<DefFile> pages,
			String objName) {
		String viewType = "";
		for (DefFile deffile : pages) {
			Page page = deffile.getPage();
			for (BaseView baseview : page.getChildren()) {
				if (baseview.getName().equalsIgnoreCase(objName)) {
					viewType = baseview.getViewType();
					break;
				}
			}
		}
		return viewType;
	}

	public static BaseView getChildFromPage(ArrayList<DefFile> pages,
			String defFileID, String name) {
		String objName = name.replace("[", "").replace("]", "");
		Page page = getDefFileByID(pages, defFileID).getPage();
		for (BaseView baseview : page.getChildren()) {
			if (baseview.getName().equalsIgnoreCase(objName))
				return baseview;
		}
		return null;
	}

	public static String getMainAttribute(String uiClass) {
		String mainAttribute = "";

		// TODO Need to modify relevant main attribute for each UI

		if (uiClass.equalsIgnoreCase("Label")) {
			mainAttribute = "text";
		}

		else if (uiClass.equalsIgnoreCase("Image")) {
			mainAttribute = "src";
		}

		else if (uiClass.equalsIgnoreCase("TextField")) {
			mainAttribute = "val";
		}

		else if (uiClass.equalsIgnoreCase("TextView")) {
			mainAttribute = "val";
		}

		else if (uiClass.equalsIgnoreCase("WebView")) {
			mainAttribute = "attr";
		}

		else if (uiClass.equalsIgnoreCase("SearchBar")) {
			mainAttribute = "attr";
		}

		else if (uiClass.equalsIgnoreCase("Button")) {
			mainAttribute = "val";
		}

		else if (uiClass.equalsIgnoreCase("TextButton")) {
			mainAttribute = "val";
		}

		else if (uiClass.equalsIgnoreCase("ImageButton")) {
			// Normal Image
			mainAttribute = "src";
		}

		else if (uiClass.equalsIgnoreCase("ToggleButton")) {
			mainAttribute = "val";
		}

		else if (uiClass.equalsIgnoreCase("CheckBox")) {
			mainAttribute = "attr";
		}

		else if (uiClass.equalsIgnoreCase("Switch")) {
			mainAttribute = "val";
		}

		else if (uiClass.equalsIgnoreCase("Picker")) {
			mainAttribute = "val";
		}

		else if (uiClass.equalsIgnoreCase("DatePicker")) {
			mainAttribute = "val";
		}

		else if (uiClass.equalsIgnoreCase("Slider")) {
			mainAttribute = "attr";
		}

		else if (uiClass.equalsIgnoreCase("Segment")) {
			mainAttribute = "val";
		}

		else if (uiClass.equalsIgnoreCase("VideoBox")) {
			mainAttribute = "val";
		}

		else if (uiClass.equalsIgnoreCase("SoundBox")) {
			mainAttribute = "val";
		}

		else if (uiClass.equalsIgnoreCase("Table")) {
			// Selected Index
			mainAttribute = "text";
		}

		else {
			mainAttribute = "text";
		}

		return mainAttribute;
	}

	public static Font getUIFont(BaseView baseView) {
		if (baseView instanceof Label) {
			Label label = (Label) baseView;
			return label.getFont();

		} else if (baseView instanceof TextField) {
			TextField textField = (TextField) baseView;
			return textField.getFont();

		} else {
			return null;
		}

	}
	public static String parseText(String content){
		if(content.contains("JSON(")){
			content = content.replace("\\\"", "\"");
			content = content.replace("\"", "\\\"");
		}
		content = content.replaceAll("\n", "'nl9'");
		if(ADFParser.languageConvertor != null && ADFParser.languageConvertor.containsKey(content)){
			content = ADFParser.languageConvertor.get(content);
		}
		return content;
	}
	
	
}
