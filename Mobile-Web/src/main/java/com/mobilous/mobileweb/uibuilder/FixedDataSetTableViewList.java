/**

 * <!This provides the class and methods necessary to
 * create Fixed Small DataSet Pages that  are made in the appexe.>
 * <p>
 * Same Class & methods are used for Fixed Dataset ListView and RecordView Pages
 * <p>
 * */

package com.mobilous.mobileweb.uibuilder;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

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

public class FixedDataSetTableViewList {

	public static StringBuilder getDataStructure(BaseView baseview) {
		// TODO Auto-generated method stub
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
		// TODO Auto-generated method stub
		Table child = (Table) baseview;
		StringBuilder contents = new StringBuilder();
		/*
		 * children:[ {id:"ui-0", viewtype:"TableViewList", tablestyle:"Plain",
		 * style:"custom", group:[{ header:"Hello", footer:"Bye", template:[
		 * {maintext:"",subtext:"",image:"", children:[
		 * {id:"ui-4",name:"Label_20130410112535897"
		 * ,template:"dfdf",viewtype:"Label"
		 * ,frame:{x:"46.0",y:"9.0",width:"80.0"
		 * ,height:"20.0"},font:{color:{name:"black"}}}],
		 * icon:{type:"row",style:"arrow-r"},rowsize:30,events:{Tap:[]} },
		 * {maintext:"",subtext:"",image:"", children:[
		 * {id:"ui-5",name:"Label_20130410112535897"
		 * ,template:"ff",viewtype:"Label"
		 * ,frame:{x:"46.0",y:"9.0",width:"80.0",height
		 * :"20.0"},font:{color:{name:"black"}}}],
		 * icon:{type:"row",style:"arrow-r"},rowsize:30,events:{Tap:[]} } ]}
		 * ]}],
		 */

		if (((String) child.getCellStyle()).equalsIgnoreCase("custom")) {
			Map<String, StringBuilder> eventsMap = new HashMap<String, StringBuilder>();

			//
			contents.append("{id:\"").append(child.getUiid()).append("\",\n\t")
					.append("viewtype:\"").append(child.getViewType())
					.append("\",\n\t").append("tablestyle:\"")
					.append(child.getTableStyle()).append("\",\n\t")
					.append("style:\"").append(child.getCellStyle())
					.append("\",\n\t").append("group:[{").append("\n\t")
					.append("header:\"")
					.append(child.getGroup().get(0).getTitle())
					.append("\",\n\t").append("footer:\"")
					.append(child.getGroup().get(0).getFooter())
					.append("\",\n\t").append("template:[");
			for (Item group : child.getGroup()) {
				// TableRow tableRow = group.getRecordCellDef();
				for (TableRow tableRow : group.getDataArray()) {
					contents.append(
							"{maintext:\"\",subtext:\"\",image:\"\",\n\t")
							.append("backgroundColor:{")
							.append(ColorBuilder.build(tableRow
									.getBackgroundColor()))
							.append("},\n\t")
							.append("children:[")
							.append(createChildren(tableRow, genapp))
							.append("],\n\t")
							.append("rowsize:")
							.append(tableRow.getHeight())
							.append(",\n\t")
							.append("icon:{type:\"row\",style:\"")
							.append(getAccessoryViewType(tableRow
									.getEditingAccessoryType())).append("\",");
					// put accessory Button events here...

					if (tableRow.getEvent() != null) {
						ArrayList<Event> events = tableRow.getEvent();
						if (events != null) {
							contents.append("events:{");
							for (Event event : events) {
								String eventname = event.getEventName();
								// System.out.println("Event Name = " +
								// eventname);
								if (eventname.equalsIgnoreCase("didSelectRowAtIndexPath") || eventname.equalsIgnoreCase("flickLR") || eventname.equalsIgnoreCase("flickRL")) {
									StringBuilder actions = ActionBuilder
											.buildAction(genapp, child, event);
									contents.append(actions);
								}

							}
							contents.append("}");
						}
					}
					contents.append("},\n\t");
					if (tableRow.getEvent() != null) {
						ArrayList<Event> events = tableRow.getEvent();
						if (events != null) {
							contents.append("events:{");
							for (Event event : events) {
								String eventname = event.getEventName();
								// System.out.println("Event Name = " +
								// eventname);
								if (eventname.equalsIgnoreCase("didSelectRowAtIndexPath") || eventname.equalsIgnoreCase("flickLR") || eventname.equalsIgnoreCase("flickRL")) {
									StringBuilder actions = ActionBuilder
											.buildAction(genapp, child, event);
									contents.append(actions);
								}

							}
							contents.append("}");
						}
					}
					contents.append("},\n\t");
				}
			}
			contents.append("]}]}");
		} else {
			
			/*
			 * group:[{ header:"Hello", footer:"Bye", template:[
			 * {maintext:"record"
			 * ,subtext:"record",image:"",icon:{type:"row",style
			 * :"arrow-r"},rowsize:30,events:{Tap:[]}},
			 * {maintext:"view",subtext:
			 * "view",image:"",icon:{type:"row",style:"arrow-r"
			 * },rowsize:50,events:{Tap:[]}} ] }
			 */
			Map<String, StringBuilder> eventsMap = new HashMap<String, StringBuilder>();

			contents.append("{id:\"").append(child.getUiid()).append("\",\n\t")
					.append("viewtype:\"").append(child.getViewType())
					.append("\",\n\t").append("tablestyle:\"")
					.append(child.getTableStyle()).append("\",\n\t")
					.append("style:\"")
					.append(child.getCellStyle().replace("-", ""))
					.append("\",\n\t").append("group:[{").append("\n\t")
					.append("header:\"")
					.append(child.getGroup().get(0).getTitle())
					.append("\",\n\t").append("footer:\"")
					.append(child.getGroup().get(0).getFooter())
					.append("\",\n\t").append("template:[");
			for (Item group : child.getGroup()) {
				// TableRow tableRow = group.getRecordCellDef();
				for (TableRow tableRow : group.getDataArray()) {
					contents.append("{maintext:\"");
					contents.append(Utility.parseText(tableRow.getMainText()))
							.append("\"")
							.append(",subtext:\"")
							.append(Utility.parseText(tableRow.getDetailText()))
							.append("\",image:\"");
					String img = (tableRow.getMainImage().getFileExt() != "") ? (tableRow.getMainImage().getFileName() + "." + tableRow.getMainImage().getFileExt())
																				: (tableRow.getMainImage().getFileName());
					contents.append(img)
							.append("\",")
							.append("backgroundColor:{")
							.append(ColorBuilder.build(tableRow
									.getBackgroundColor()))
							.append("},\n\t")
							.append("icon:{type:\"row\",style:\"")
							.append(getAccessoryViewType(tableRow
									.getEditingAccessoryType())).append("\",");
					if (tableRow.getEvent() != null) {
						ArrayList<Event> events = tableRow.getEvent();
						if (events != null) {
							contents.append("events:{");
							for (Event event : events) {
								String eventname = event.getEventName();
								// System.out.println("Event Name = " +
								// eventname);
								if (eventname.equalsIgnoreCase("didSelectRowAtIndexPath") || eventname.equalsIgnoreCase("flickLR") || eventname.equalsIgnoreCase("flickRL")) {
									StringBuilder actions = ActionBuilder
											.buildAction(genapp, child, event);
									contents.append(actions);
								}

							}
							contents.append("}");
						}
					}
					contents.append("},\n\t").append("rowsize:")
							.append(child.getRowHeight()).append(",\n\t");
							
					if (tableRow.getEvent() != null) {
						ArrayList<Event> events = tableRow.getEvent();
						if (events != null) {
							contents.append("events:{");
							for (Event event : events) {
								String eventname = event.getEventName();
								//System.out.println("Event Name = " + eventname);
								if (eventname.equalsIgnoreCase("didSelectRowAtIndexPath") || eventname.equalsIgnoreCase("flickLR") || eventname.equalsIgnoreCase("flickRL")) {
									StringBuilder actions = ActionBuilder.buildAction(
											genapp, child, event);
									contents.append(actions);
								}

							}
							contents.append("}");
						}
					}
					contents.append("},\n\t");
				}
			}
			contents.append("]\n\t}]}\n\t");
		}
		return contents;
	}

	private static Map<String, StringBuilder> getEvents(
			ArrayList<Event> events, GenApp genapp, Table child) {
		Map<String, StringBuilder> eventsMap = new HashMap<String, StringBuilder>();
		StringBuilder eventString = new StringBuilder();

		if (events != null && events.size() > 0) {
			for (Event event : events) {
				String eventname = event.getEventName();
				if (!event.getAction().isEmpty()) {
					StringBuilder actions = ActionBuilder.buildAction(genapp,
							child, event);
					eventsMap.put(eventname, actions);
				} else { // put tap in events if action is empty.. so that code
							// doesn't dies on js side.. Akhil
					// eventsMap.put(eventname, eventString.append("Tap:[],"));
				}
			}
		}
		return eventsMap;
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

	public static StringBuilder createChildren(TableRow tableRow, GenApp genApp) {
		// TODO Auto-generated method stub
		StringBuilder childrenS = new StringBuilder();
		for (BaseView child : tableRow.getChildren()) {

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
				/*
				 * System.out.println(child.getViewType() +
				 * "This UI is not ready yet..");
				 */}

		}

		return childrenS;
	}

}
