package com.mobilous.mobileweb.uibuilder;

import org.json.simple.JSONObject;

import com.mobilous.mobileweb.EventBuilder.ComboBoxEventBuilder;
import com.mobilous.mobileweb.EventBuilder.RadioButtonEventBuilder;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.actionbuilder.ActionBuilder;
import com.mobilous.mobileweb.etc.ComboBoxOptions;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.ComboBox;
import com.mobilous.mobileweb.util.Utility;

public class ComboBoxBuilder {

	public static StringBuilder build(BaseView baseView, GenApp genApp) {
		ComboBox comboBox = (ComboBox) baseView;
		StringBuilder comboBoxBuilder = new StringBuilder();

		comboBoxBuilder.append("{id:\"").append(comboBox.getUiid())
				.append("\",");
		comboBoxBuilder.append("name:\"").append(comboBox.getName())
				.append("\",");
		comboBoxBuilder.append("viewtype:\"").append(comboBox.getViewType())
				.append("\",");
		comboBoxBuilder.append("taborder:\"").append(comboBox.getTabOrder())
				.append("\",");
		comboBoxBuilder.append("placeholder:\"").append(comboBox.getPlaceholder())
				.append("\",");
		comboBoxBuilder.append("cornerRadius:").append(comboBox.getCornerRadius())
				.append(",");
		comboBoxBuilder.append("frame:{")
				.append(FrameBuilder.build(comboBox.getFrame())).append("},");
		comboBoxBuilder.append("font:{")
				.append(FontBuilder.build(comboBox.getFont())).append("},");
		comboBoxBuilder
				.append("border:{")
				.append(BorderBuilder.build(
						String.valueOf(comboBox.getBorderWeight()), "",
						comboBox.getBorderColor())).append("},");
		comboBoxBuilder.append("background:{")
				.append(ColorBuilder.build(comboBox.getBackgroundColor()))
				.append("},");
		comboBoxBuilder.append("selectedindex:\"")
				.append(comboBox.getSelectedIndex()).append("\",");
		comboBoxBuilder.append("verticalalignment:\"")
				.append(comboBox.getVerticalAlignment()).append("\",");
		comboBoxBuilder.append("initialValue:\"")
		.append(comboBox.getInitialValue()).append("\",");
		comboBoxBuilder.append("hidden:").append(comboBox.getHidden())
				.append(",");
		comboBoxBuilder.append("editable:").append(comboBox.isEditable())
				.append(",");
		if (comboBox.getPadding() != null) {
			comboBoxBuilder.append("padding:{")
				.append(PaddingBuilder.build(comboBox.getPadding()))
				.append("},");
		}
		// comboBoxBuilder.append("type:\"").append(comboBox.getType()).append("\",");
		
		comboBoxBuilder.append("type:\"").append(comboBox.getType()).append("\",");
		comboBoxBuilder.append("dbparams:{")
			.append("servicename:\"").append(comboBox.getServiceName()).append("\",")
			.append("tablename:\"").append(comboBox.getTableName()).append("\",")
			.append("fieldname:\"").append(comboBox.getFieldName()).append("\",")
			.append("where:\"").append(comboBox.getWhereCondition()).append("\",")
			.append("order:\"").append(comboBox.getOrderClause()).append("\",")
			.append("displayText:\"").append(comboBox.getDisplayText()).append("\"")
			.append("},");
		comboBoxBuilder.append("combo_options:{optionsValue:[");

		for (String displayValue : comboBox.getOptions().getDisplayValue()) {
			comboBoxBuilder.append("\"" + Utility.parseText(displayValue) + "\"").append(",");
		}

		if (comboBox.getOptions().getDisplayValue().size() > 0) {
			comboBoxBuilder = Utility.removeCommaFromLast(comboBoxBuilder);
		}
		comboBoxBuilder.append("]");
		comboBoxBuilder.append(",");
		comboBoxBuilder.append("optionsID:[");
		for (String optionId : comboBox.getOptions().getOptionID()) {
			if (optionId == "0") {
				comboBoxBuilder.append("\"null\"").append(",");
			} else {
				comboBoxBuilder.append("\"" + optionId + "\"").append(",");
			}

		}

		if (comboBox.getOptions().getOptionID().size() > 0) {
			comboBoxBuilder = Utility.removeCommaFromLast(comboBoxBuilder);
		}
		
		comboBoxBuilder.append("]");
		comboBoxBuilder.append("},");
		
		if (comboBox.getEvent() != null) {
			
			comboBoxBuilder.append("events:{");
					for (Event event : comboBox.getEvent()) {
		
						StringBuilder actions = ComboBoxEventBuilder.buildEvent(genApp, baseView, event);
						comboBoxBuilder.append(actions);
					}
					Utility.removeCommaFromLast(comboBoxBuilder);
					comboBoxBuilder.append("}");
					
		}
		
		comboBoxBuilder.append("}");

		return comboBoxBuilder;

	}
}
