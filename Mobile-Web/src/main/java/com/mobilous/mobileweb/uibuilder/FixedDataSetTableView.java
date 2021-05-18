/**
 * 
 */
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

/**
 * @author Sachit Kesri
 * 
 */
public class FixedDataSetTableView {

	public static StringBuilder getDataStructure(BaseView baseview) {

		Table child = (Table) baseview;

		String tableName = "";
		String whereClause = "";
		String orderByClause = "";
		StringBuilder contents = new StringBuilder();
		// data:{order:"",updated:false,contents:[],tablename:"",wherecond:""}
		contents.append("data:{").append("order:\"").append(orderByClause)
				.append("\",").append("updated:false,").append("contents:[],")
				.append("tablename:\"").append(tableName).append("\",")
				.append("wherecond:\"").append(whereClause).append("\"")
				.append("},\n\t");

		return contents;
	}

	public static StringBuilder build(BaseView baseview, GenApp genapp) {

		Table child = (Table) baseview;
		StringBuilder contents = new StringBuilder();

		/*
		 * group:[{ header:"Hello", footer:"Bye", template:[ {maintext:"record"
		 * ,subtext:"record",image:"",icon:{type:"row",style
		 * :"arrow-r"},rowsize:30,events:{Tap:[]}}, {maintext:"view",subtext:
		 * "view",image:"",icon:{type:"row",style:"arrow-r"
		 * },rowsize:50,events:{Tap:[]}} ] }
		 */
		contents.append("{id:\"").append(child.getUiid()).append("\",\n\t")
				.append("viewtype:\"").append(child.getViewType())
				.append("\",\n\t").append("tablestyle:\"")
				.append(child.getTableStyle()).append("\",\n\t")
				.append("style:\"")
				.append(child.getCellStyle().replace("-", ""))
				.append("\",\n\taccordion:").append(child.isAccordion()).append(",");
		if(child.isAccordion())
			contents.append("\t").append("accordionheader:").append(getAccordionHeader(child)).append(",");
		contents.append("\n\t").append("group:[")
				.append(getGroup(child, genapp));

		contents.append("]}\n\t");

		return contents;

	}

	private static StringBuilder getAccordionHeader(Table table) {
		StringBuilder contents = new StringBuilder();
		
		contents.append("{")
				.append("height:\"").append(table.getAccHeaderHeight()).append("\",")				
				.append("bgcolor:{" + ColorBuilder.build(table.getAccHeaderBGColor()) + "},")
				.append("textcolor:{" + ColorBuilder.build(table.getAccHeaderTextColor()) + "},")
				.append("iconposition:\"").append(table.getAccHeaderIconPosition()).append("\",");
				
		if (table.getAccHeaderIconClose() != null) {
			String iconClose = (table.getAccHeaderIconClose().getFileExt()!="")?(table.getAccHeaderIconClose().getFileName() + "."
					+ table.getAccHeaderIconClose().getFileExt()):(table.getAccHeaderIconClose().getFileName());
		
			contents.append("closeicon:\"").append(iconClose).append("\",");
		}
		if (table.getAccHeaderIconOpen() != null) {
			String iconOpen = (table.getAccHeaderIconOpen().getFileExt()!="")?(table.getAccHeaderIconOpen().getFileName() + "."
					+ table.getAccHeaderIconOpen().getFileExt()):(table.getAccHeaderIconOpen().getFileName());
		
			contents.append("openicon:\"").append(iconOpen).append("\",");
		}
		contents.append("},");

		return Utility.removeCommaFromLast(contents);
	}
	
	private static StringBuilder getGroup(Table table, GenApp genApp) {
		StringBuilder contents = new StringBuilder();
		for (Item group : table.getGroup()) {
			contents.append("{").append("header:\"").append(group.getTitle())
					.append("\",").append("footer:\"")
					.append(group.getFooter()).append("\",")
					.append("template:{").append(getTemplate(table))
					.append("},").append("row:[").append("\n\t")
					.append(getRowArray(table, group, genApp)).append("]")
					.append("},");
		}

		return Utility.removeCommaFromLast(contents);
	}

	private static StringBuilder getTemplate(Table table) {
		StringBuilder contents = new StringBuilder();
		contents.append("maintext:\"").append("\",").append("subtext:\"")
				.append("\",").append("image:\"").append("\",")
				.append("children:\"[").append("]\"");

		return contents;
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
					for (Event event : events) {
						String eventname = event.getEventName();
						//System.out.println("Event Name = " + eventname);
					//	if (eventname.equalsIgnoreCase("accessoryButtonTappedForRowWithIndexPath")) {
							StringBuilder actions = ActionBuilder.buildAction(
									genApp, table, event);
							contents.append(actions);
					//	}

					}
					contents.append("}");
				}
			}
			contents.append("}").append(",");

			if (tablerow.getEvent() != null) {
				ArrayList<Event> events = tablerow.getEvent();
				if (events != null) {
					contents.append("events:{");
					for (Event event : events) {
						String eventname = event.getEventName();
						//System.out.println("Event Name = " + eventname);
						//if (eventname.equalsIgnoreCase("didSelectRowAtIndexPath")) {
							StringBuilder actions = ActionBuilder.buildAction(
									genApp, table, event);
							contents.append(actions);
						//}

					}
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
						.append(Utility.parseText(tablerow.getMainText())).append("',subtext:'")
						.append(Utility.parseText(tablerow.getDetailText())).append("',image:'")
						.append(img).append("',children:[]}");
			} else {
				contents.append("\n\t");
				contents.append("children:[").append("\n\t");
				contents.append(createChildren(table, tablerow, genApp));
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

		String type = new String();
		if (accessoryType.equalsIgnoreCase("indicator"))
			type = "arrow-r";
		else if (accessoryType.equalsIgnoreCase("none"))
			type = "false";
		else
			type = accessoryType;

		return type;
	}

	public static StringBuilder createChildren(Table table, TableRow tableRow,
			GenApp genApp) {
		StringBuilder contents = new StringBuilder();

		for (BaseView child : tableRow.getChildren()) {
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
			} else if (child instanceof ComboBox) {
				childrenS.append(ComboBoxBuilder.build(child, genApp)).append(
						",\n\t");
			} 
			else {
				/*System.out.println(child.getViewType()
						+ "This UI is not ready yet..");*/
			}

			contents.append(childrenS);
		}

		return Utility.removeCommaFromLast(contents);
	}

}
