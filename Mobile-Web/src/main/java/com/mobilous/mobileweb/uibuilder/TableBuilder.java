package com.mobilous.mobileweb.uibuilder;

import java.util.ArrayList;

import com.mobilous.mobileweb.actionbuilder.ActionBuilder;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.etc.Item;
import com.mobilous.mobileweb.etc.TableRow;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.Button;
import com.mobilous.mobileweb.ui.ComboBox;
import com.mobilous.mobileweb.ui.Image;
import com.mobilous.mobileweb.ui.Indicator;
import com.mobilous.mobileweb.ui.Label;
import com.mobilous.mobileweb.ui.ProgressBar;
import com.mobilous.mobileweb.ui.Segment;
import com.mobilous.mobileweb.ui.Slider;
import com.mobilous.mobileweb.ui.Switch;
import com.mobilous.mobileweb.ui.Table;
import com.mobilous.mobileweb.ui.TextField;
import com.mobilous.mobileweb.ui.TextView;
import com.mobilous.mobileweb.util.Utility;

public class TableBuilder {

	public static String getTableName(BaseView baseview) {
		Table table = (Table) baseview;
		return table.getTableName();
	}

	public static String getWhereClause(BaseView baseview) {
		Table table = (Table) baseview;
		return table.getWhere();
	}

	private static StringBuilder getTemplate(Table table) {
		StringBuilder contents = new StringBuilder();
		contents.append("maintext:\"").append("\",").append("subtext:\"")
				.append("\",").append("image:\"").append("\",")
				.append("children:\"[").append("]\"");

		return contents;
	}

	protected static String getUIInstance(BaseView baseview) {
		String DBField = "";
		if (baseview.getViewType().equalsIgnoreCase("Button")) {
			Button button = (Button) baseview;
			DBField = button.getTitle();
		} else if (baseview.getViewType().equalsIgnoreCase("label")) {
			Label label = (Label) baseview;
			DBField = label.getText();
		} else if (baseview.getViewType().equalsIgnoreCase("textview")) {
			TextView textView = (TextView) baseview;
			DBField = textView.getText();
		} else if (baseview.getViewType().equalsIgnoreCase("textfield")) {
			TextField textField = (TextField) baseview;
			DBField = textField.getText();
		} else if (baseview.getViewType().equalsIgnoreCase("textfield")) {
			TextField textField = (TextField) baseview;
			DBField = textField.getText();
		} else {
			System.out.println("REst of UI is not implemented yet, please do it afterwards..");
		}
		return DBField;
	}

	private static StringBuilder getRowChildren(Table table, TableRow eachrow,
			GenApp genApp) {
		StringBuilder contents = new StringBuilder();

		for (BaseView child : eachrow.getChildren()) {
			StringBuilder childrenS = new StringBuilder();
			if (child instanceof Label) {
				childrenS.append(LabelBuilder.build(child, genApp)).append(
						",\n\t");
			} else if (child instanceof Button) {
				childrenS.append(ButtonBuilder.build(child, genApp)).append(
						",\n\t");
			} else if (child instanceof TextField) {
				childrenS.append(TextFieldBuilder.build(child, genApp)).append(
						",\n\t");
			} else if (child instanceof Image) {
				childrenS.append(ImageBuilder.build(child, genApp)).append(
						",\n\t");
			} else if (child instanceof TextView) {
				childrenS.append(TextViewBuilder.build(child, genApp)).append(
						",\n\t");
			} else if (child instanceof Switch) {
				childrenS.append(SwitchBuilder.build(child, genApp)).append(
						",\n\t");
			} else if (child instanceof Slider) {
				childrenS.append(SliderBuilder.build(child, genApp)).append(
						",\n\t");
			} else if (child instanceof ProgressBar) {
				childrenS.append(ProgressBarBuilder.build(child, genApp))
						.append(",\n\t");
			} else if (child instanceof Indicator) {
				childrenS.append(WaitIndicatorBuilder.build(child, genApp))
						.append(",\n\t");
			} else if (child instanceof Segment) {
				childrenS.append(SegmentBuilder.build(child, genApp)).append(
						",\n\t");
			}else if (child instanceof ComboBox) {
				childrenS.append(ComboBoxBuilder.build(child, genApp)).append(",\n\t");
			}
			/* else {
				System.out.println(child.getViewType()
						+ "This UI is not ready yet..");
			}*/

			contents.append(childrenS);
		}

		return Utility.removeCommaFromLast(contents);
	}

	private static StringBuilder getRowArray(Table table, Item item,
			GenApp genApp) {
		StringBuilder contents = new StringBuilder();
		ArrayList<TableRow> tablerowList = item.getDataArray();
		int i = 0;
		for (TableRow tablerow : tablerowList) {
			contents.append("{").append("rownum:").append(i).append(",");

			if (table.getCellStyle().equalsIgnoreCase("custom")) {
				contents.append("rowsize:").append(tablerow.getHeight())
						.append(",");
			} else {
				contents.append("rowsize:").append(table.getRowHeight())
						.append(",");
			}
			contents.append("data:").append("{contents:[null]}").append(",")
				.append("backgroundColor:{")
				.append(ColorBuilder.build(tablerow.getBackgroundColor()))
				.append("},\n\t")
				.append("icon:").append("{type:\"row\",style:\"")
				.append(getAccessoryViewType(tablerow.getEditingAccessoryType()))
				.append("\",");
					
			if (tablerow.getEvent() != null) {
				ArrayList<Event> events = tablerow.getEvent();
				
				if (events != null) {
					contents.append("events:{");
					StringBuilder actions = new StringBuilder();
					for (Event event : events) {
						String eventname = event.getEventName();
						//System.out.println("Event Name = " + eventname);
						if (eventname.equalsIgnoreCase("accessoryButtonTappedForRowWithIndexPath")) {
							actions.append(ActionBuilder.buildAction(
									genApp, table, event));
							/*StringBuilder actions = ActionBuilder.buildAction(
									genApp, table, event);*/
							//contents.append(actions);
						}/*else if (eventname
								.equalsIgnoreCase("flick")) {
							StringBuilder actions = ActionBuilder.buildAction(
									genApp, table, event);
							contents.append(actions);
						}*/

					}
					contents.append(actions);
					contents.append("}");
				}
			}
			contents.append("}").append(",");

			if (tablerow.getEvent() != null) {
				ArrayList<Event> events = tablerow.getEvent();
				if (events != null) {
					contents.append("events:{");
					StringBuilder actions = new StringBuilder();
					for (Event event : events) {
						String eventname = event.getEventName();
						//System.out.println("Event Name = " + eventname);
						if (eventname.equalsIgnoreCase("didSelectRowAtIndexPath") || eventname.equalsIgnoreCase("flickLR")  || eventname.equalsIgnoreCase("flickRL")) {
							actions.append(ActionBuilder.buildAction(genApp, table, event));
							
						}
					}
					contents.append(actions);
					contents.append("}");
				}
			}

			contents.append(",");

			if (!table.getCellStyle().equalsIgnoreCase("custom")) {
				// template:{maintext:'[name]', subtext:'[id]',
				// image:'',children:[]},
				String img = (tablerow.getMainImage().getFileExt() != "") ? (tablerow
						.getMainImage().getFileName() + "." + tablerow
						.getMainImage().getFileExt()) : (tablerow
						.getMainImage().getFileName());
				contents.append("template:{").append("maintext:'")
						.append(tablerow.getMainText()).append("',subtext:'")
						.append(tablerow.getDetailText()).append("',image:'")
						.append(img).append("',children:[]}");
			} else {
				contents.append("\n\t");
				contents.append("children:[").append("\n\t");
				contents.append(getRowChildren(table, tablerow, genApp));
				contents.append("]");
			}
			contents.append("},").append("\n\t");
			i++;
		}

		/*
		 * //children: [{id:"ui-105",name:"",text:
		 * '',template:"[age]",viewtype:"Label",frame:{x:50,y:13,width:150,height:20},font:{size:16,align:"left",color:{name:"green"}}},
		 * // {id:"ui-106",name:"",text:
		 * '',template:"[gender]",viewtype:"Label",frame:{x:50,y:30,width:150,height:20},font:{size:16,align:"left",color:{name:"orange"}}}]
		 */

		return contents;
	}

	private static String getAccessoryViewType(String accessoryType) {
		// TODO Auto-generated method stub
		String type = new String();
		if (accessoryType.equalsIgnoreCase("indicator"))
			type = "arrow-r";
		else if (accessoryType.equalsIgnoreCase("none"))
			type = "false";
		else
			type = accessoryType;

		return type;
	}

	private static StringBuilder getGroup(Table table, GenApp genApp) {
		StringBuilder contents = new StringBuilder();
		for (Item group : table.getGroup()) {
			contents.append("{").append("header:\"").append(group.getTitle())
					.append("\",").append("footer:\"")
					.append(group.getFooter()).append("\",")
					.append("flexibleHeight:")
					.append(group.isFlexibleHeight()).append(",")
					.append("template:{").append(getTemplate(table))
					.append("},").append("row:[").append("\n\t")
					.append(getRowArray(table, group, genApp)).append("]")
					.append("},");
		}

		return Utility.removeCommaFromLast(contents);
	}

	private static String getViewType(String viewType) {
		if (viewType.equalsIgnoreCase("DbTableView")) {
			return "DBTableView";
		} else {
			return viewType;
		}
	}

	public static StringBuilder build(BaseView baseview, GenApp genApp) {
		// TODO Auto-generated method stub

		StringBuilder contents = new StringBuilder();
		Table table = (Table) baseview;

		contents.append("{id:\"").append(table.getUiid()).append("\",")
				.append("viewtype:\"")
				.append(TableBuilder.getViewType(table.getViewType()))
				.append("\",").append("tablestyle:\"")
				.append(table.getTableStyle()).append("\",").append("style:\"")
				.append(table.getCellStyle().replace("-", "")).append("\",")
				.append("group:[").append(getGroup(table, genApp))
				.append("]},");

		return contents;
	}

}