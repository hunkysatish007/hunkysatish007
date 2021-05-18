package com.mobilous.mobileweb.uibuilder;

import java.util.ArrayList;
import java.util.Map;

import com.mobilous.mobileweb.EventBuilder.DBTableEventBuilder;
import com.mobilous.mobileweb.EventBuilder.RemoteTableViewListEventBuilder;
import com.mobilous.mobileweb.actionbuilder.ActionBuilder;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.etc.Item;
import com.mobilous.mobileweb.etc.TableRow;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.Button;
import com.mobilous.mobileweb.ui.Grid;
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

public class RemoteTableViewList {

	private static String getViewType(String viewType, BaseView baseview) {
		if (viewType.equalsIgnoreCase("RemoteTableViewList")) {
			return "RemoteTableViewList";
		} else if (viewType.equalsIgnoreCase("Button")) {
			Button button = (Button) baseview;
			if (button.getType().equals("CheckBox")) {
				return "CheckBox";
			} else if (button.getButtonType().equalsIgnoreCase("round")) {
				return "RoundButton";

			} else if (button.getType().equals("Image")) {
				return "ImageButton";
			}

			else if (button.getType().equals("Toggle")) {
				return "ToggleButton";
			} else if (button.getType().equals("System")) {
				return "SystemButton";
			}

			else
				return "Button";

		} else {
			return viewType;
		}

	}

	/**
	 * This method receives the instance of table as input and genapp. It checks
	 * the cellstyle of the listview page (as you have given in appexe and build
	 * list accordingly.
	 * 
	 * @param baseview
	 *            Instance of Table whose viewtype is DbTableViewList
	 * @param genApp
	 * @return String
	 */

	/*
	 * Format Used :DBTableViewList(viewtype) ,contactform(cellstyle)
	 * {id:"ui-2",
	 * viewtype:"DBTableViewList",tablestyle:"Plain",style:"contactform"
	 * ,group:[{header:"",footer:"",template:{maintext:"[id]",
	 * subtext:"[name]",image:"",icon:{type:"row",style:"arrow-r"},rowsize:42,
	 * events:{}}}]}
	 */

	public static StringBuilder build(BaseView baseview, GenApp genApp) {
		Table child = (Table) baseview;
		StringBuilder contents = new StringBuilder();
		if (((String) child.getCellStyle()).equalsIgnoreCase("custom")) {
			contents.append("{id:\"")
					.append(child.getUiid())
					.append("\",\n\t")
					.append("viewtype:\"")
					.append(getViewType(child.getViewType(), child))
					.append("\",\n\t")
					.append("tablestyle:\"")
					.append(child.getTableStyle())
					.append("\",\n\t")
					.append("style:\"")
					.append(child.getCellStyle())
					.append("\",\n\t");
					if(child.getGroup().get(0).getGroupBy().length() > 0){
						contents.append("accordion:").append(child.isAccordion()).append(",");
						if(child.isAccordion())
							contents.append("\t").append("accordionheader:").append(getAccordionHeader(child)).append(",");
					}
			contents.append("group:[{")
					.append("\t\n\t")
					.append("header:\"" + child.getGroup().get(0).getTitle()
							+ "\",").append("\n\t")
					.append("footer:\"" + child.getGroup().get(0).getFooter()
							+ "\",").append("\n\t")
					.append("flexibleHeight:")
					.append(child.getGroup().get(0).isFlexibleHeight())
					.append(",\n\t")
					.append("template:{")
					.append("maintext:\"\",subtext:\"\",image:\"\",\n\t")
					.append("backgroundColor:{")
					.append(ColorBuilder.build(child.getGroup().get(0).getRecordCellDef().getBackgroundColor()))
					.append("},\n\t")
					.append("children:[")
					.append(createChildren(child, genApp))
					.append("],\n\t")
					.append("icon:{type:\"row\",style:\"")
					.append(getAccessoryViewType(child.getGroup().get(0)
							.getRecordCellDef().getEditingAccessoryType()))
					.append("\",");
			if (getIconEvents(genApp, baseview, child) != null) {
				contents.append(getIconEvents(genApp, baseview, child).get(
						"icon"));

			} else
				contents.append("");
			contents.append("}\n\t,")
					.append("rowsize:")
					.append(child.getGroup().get(0).getRecordCellDef()
							.getHeight()).append(",\n\t");
			if(child.getGroup().get(0)
					.getRecordCellDef().isAlternateRowStyle()){
				contents.append("oddRowBackgroundColor:{")
				.append(ColorBuilder.build(child.getGroup().get(0)
						.getRecordCellDef().getOddRowBackgroundColor()))
				.append("},\n\t");
				contents.append("evenRowBackgroundColor:{")
				.append(ColorBuilder.build(child.getGroup().get(0)
						.getRecordCellDef().getEvenRowBackgroundColor()))
				.append("},\n\t");
				if(!child.getGroup().get(0)
						.getRecordCellDef().getOddRowbackgroundImage().getFileName().equalsIgnoreCase("")){
					contents.append("oddRowBackgroundImage:\"")
					.append((child.getGroup().get(0)
							.getRecordCellDef().getOddRowbackgroundImage().getFileExt() != "") ? (child.getGroup().get(0)
									.getRecordCellDef()
							.getOddRowbackgroundImage().getFileName() + "." + child.getGroup().get(0)
							.getRecordCellDef()
							.getOddRowbackgroundImage().getFileExt()) : (child.getGroup().get(0)
									.getRecordCellDef()
							.getOddRowbackgroundImage().getFileName()))
					.append("\",\n\t");
				}
				if(!child.getGroup().get(0)
						.getRecordCellDef().getEvenRowbackgroundImage().getFileName().equalsIgnoreCase("")){
					contents.append("evenRowBackgroundImage:\"")
					.append((child.getGroup().get(0)
							.getRecordCellDef().getEvenRowbackgroundImage().getFileExt() != "") ? (child.getGroup().get(0)
									.getRecordCellDef()
							.getEvenRowbackgroundImage().getFileName() + "." + child.getGroup().get(0)
							.getRecordCellDef()
							.getEvenRowbackgroundImage().getFileExt()) : (child.getGroup().get(0)
									.getRecordCellDef()
							.getEvenRowbackgroundImage().getFileName()))
					.append("\",\n\t");
				}
				contents.append("repeatImage:");
				contents.append(child.getGroup().get(0).getRecordCellDef().isRowBGImageRepeat())
						.append(",\n\t");
			}
			// set event for row..
			/*if (getRowEvents(genApp, baseview, child) != null) {
				contents.append((getRowEvents(genApp, baseview, child).get(
						"row") != null) ? getRowEvents(genApp, baseview, child)
						.get("row") : "");

			}*/
			if (child.getGroup().get(0).getRecordCellDef().getEvent() != null) {
				ArrayList<Event> events = child.getGroup().get(0).getRecordCellDef().getEvent();
				if (events != null) {
					contents.append("events:{");
					StringBuilder actions = new StringBuilder();
					for (Event event : events) {
						String eventname = event.getEventName();
						//System.out.println("Event Name = " + eventname);
						if (eventname.equalsIgnoreCase("didSelectRowAtIndexPath") || eventname.equalsIgnoreCase("flickLR")  || eventname.equalsIgnoreCase("flickRL")) {
							actions.append(ActionBuilder.buildAction(genApp, baseview, event));
							
						}

					}
					contents.append(actions);
					contents.append("}");
				}
			}

		} else if (((String) child.getCellStyle()).equalsIgnoreCase("subtitle")
				|| ((String) child.getCellStyle())
						.equalsIgnoreCase("right-aligned")
				|| ((String) child.getCellStyle()).equalsIgnoreCase("default")
				|| ((String) child.getCellStyle())
						.equalsIgnoreCase("contact-form")) {
			contents.append("{id:\"")
					.append(child.getUiid())
					.append("\",\n\t")
					.append("viewtype:\"")
					.append(getViewType(child.getViewType(), child))
					.append("\",\n\t")
					.append("tablestyle:\"")
					.append(child.getTableStyle())
					.append("\",\n\t")
					.append("style:\"")
					.append(child.getCellStyle().replace("-", ""))
					.append("\",");
			if(child.getGroup().get(0).getGroupBy().length() > 0){
				contents.append("\n\taccordion:").append(child.isAccordion()).append(",");
				if(child.isAccordion())
					contents.append("\t").append("accordionheader:").append(getAccordionHeader(child)).append(",");
			}
			contents.append("\n\t")
					.append("group:[{")
					.append("\n\t")
					.append("header:\"" + child.getGroup().get(0).getTitle()
							+ "\",\n\t")
					.append("footer:\"" + child.getGroup().get(0).getFooter()
							+ "\",\n\t").append("template:{");
			for (Item group : child.getGroup()) {
				TableRow tableRow = group.getRecordCellDef();
				String img = (tableRow.getMainImage().getFileExt() != "") ? (tableRow
						.getMainImage().getFileName() + "." + tableRow
						.getMainImage().getFileExt()) : (tableRow
						.getMainImage().getFileName());
				contents.append("maintext:\"");
				contents.append(tableRow.getMainText()).append("\"")
						.append(",subtext:\"").append(tableRow.getDetailText())
						.append("\",image:\"").append(img).append("\",")
						.append("backgroundColor:{")
						.append(ColorBuilder.build(tableRow.getBackgroundColor()))
						.append("},\n\t");
				if(tableRow.isAlternateRowStyle()){
					contents.append("oddRowBackgroundColor:{")
					.append(ColorBuilder.build(tableRow.getOddRowBackgroundColor()))
					.append("},\n\t");
					contents.append("evenRowBackgroundColor:{")
					.append(ColorBuilder.build(tableRow.getEvenRowBackgroundColor()))
					.append("},\n\t");
					if(!tableRow.getOddRowbackgroundImage().getFileName().equalsIgnoreCase("")){
						contents.append("oddRowBackgroundImage:\"")
						.append((tableRow.getOddRowbackgroundImage().getFileExt() != "") ? (tableRow
								.getOddRowbackgroundImage().getFileName() + "." + tableRow
								.getOddRowbackgroundImage().getFileExt()) : (tableRow
								.getOddRowbackgroundImage().getFileName()))
						.append("\",\n\t");
					}
					if(!tableRow.getEvenRowbackgroundImage().getFileName().equalsIgnoreCase("")){
						contents.append("evenRowBackgroundImage:\"")
						.append((tableRow.getEvenRowbackgroundImage().getFileExt() != "") ? (tableRow
								.getEvenRowbackgroundImage().getFileName() + "." + tableRow
								.getEvenRowbackgroundImage().getFileExt()) : (tableRow
								.getEvenRowbackgroundImage().getFileName()))
						.append("\",\n\t");
					}
					contents.append("repeatImage:");
					contents.append(child.getGroup().get(0).getRecordCellDef().isRowBGImageRepeat())
							.append(",\n\t");
				}
			}
			contents.append("\n\t")
					.append("children:[")
					.append(createChildren(child, genApp))
					.append("],\n\t")
					// events:{Tap:[{method:"View",category:"PageAction",params:{name:'page_4304',transferdata:true}}]}
					.append("icon:{type:\"row\",style:\"").append(getAccessoryViewType(child.getGroup().get(0).getRecordCellDef().getEditingAccessoryType()))
					.append("\",");
			if (getIconEvents(genApp, baseview, child) != null) {
				contents.append(getIconEvents(genApp, baseview, child).get("icon"));

			} else{
				contents.append("");
			}
			
			contents.append("}\n\t,").append("rowsize:").append(child.getRowHeight()).append(",\n\t");

			// set event for row..
			/*if (getRowEvents(genApp, baseview, child) != null) {
				contents.append((getRowEvents(genApp, baseview, child).get(
						"row") != null) ? getRowEvents(genApp, baseview, child)
						.get("row") : "");
			}*/
			if (child.getGroup().get(0).getRecordCellDef().getEvent() != null) {
				ArrayList<Event> events = child.getGroup().get(0).getRecordCellDef().getEvent();
				if (events != null) {
					contents.append("events:{");
					StringBuilder actions = new StringBuilder();
					for (Event event : events) {
						String eventname = event.getEventName();
						//System.out.println("Event Name = " + eventname);
						if (eventname.equalsIgnoreCase("didSelectRowAtIndexPath") || eventname.equalsIgnoreCase("flickLR")  || eventname.equalsIgnoreCase("flickRL")) {
							actions.append(ActionBuilder.buildAction(genApp, baseview, event));
							
						}

					}
					contents.append(actions);
					contents.append("}");
				}
			}
		}else if(((String) child.getCellStyle()).equalsIgnoreCase("simple-grid")){
			contents.append("{id:\"")
					.append(child.getUiid())
					.append("\",\n\t")
					.append("viewtype:\"")
					.append(getViewType(child.getViewType(), child))
					.append("\",\n\t")
					.append("tablestyle:\"")
					.append(child.getTableStyle())
					.append("\",\n\t")
					.append("style:\"")
					.append(child.getCellStyle().replace("-", ""));
			contents.append("\",\n\t")
					.append("group:[{")
					.append("\n\t")
					.append("header:\"" + child.getGroup().get(0).getTitle()
							+ "\",\n\t")
					.append("footer:\"" + child.getGroup().get(0).getFooter()
							+ "\",\n\t").append("template:{");
			for (Item group : child.getGroup()) {
				TableRow tableRow = group.getRecordCellDef();
				String img = (tableRow.getMainImage().getFileExt() != "") ? (tableRow
						.getMainImage().getFileName() + "." + tableRow
						.getMainImage().getFileExt()) : (tableRow
						.getMainImage().getFileName());
				System.out.println("TEST : " + tableRow.getGridArray().get(0).getFieldName());
				contents.append("maintext:\"");
				contents.append(tableRow.getMainText()).append("\"")
						.append(",subtext:\"").append(tableRow.getDetailText())
						.append("\",image:\"").append(img).append("\",")
						.append("backgroundColor:{")
						.append(ColorBuilder.build(tableRow.getBackgroundColor()))
						.append("},\n\t");
				float updatedX = 0;
				contents.append("gridHeaders:[").append("\n\t");
				//{id:"1",name:"gridHeader",value:"emp_id",template:"",viewtype:"Label",frame:{x:"0.0",y:"0.0",width:"40",height:"44.0"},border:{borderweight:"0",borderstyle:"",bordercolor:{red:0,blue:0,green:0,alpha:1.0}},background:{red:255,blue:255,green:255,alpha:0.0},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:"14",align:"left",color:{red:0,blue:0,green:0,alpha:1.0}}},
				for(Grid grid : tableRow.getGridArray()){
					// {sortable:false,width:"40",uiType:"Label",row:"1",fieldname:"emp_id",id:"1",column:"1",freeze:false},
					contents.append("{");
					contents.append("id:\"").append(grid.getFieldName() + "_" + grid.getId()).append("\",");
					contents.append("name:\"").append(grid.getFieldName()).append("\",");
					contents.append("column:\"").append(grid.getColumn())
					.append("\",");
					contents.append("row:\"").append(grid.getRow())
					.append("\",");
					contents.append("value:\""+grid.getFieldName()+"\",template:\"\",viewtype:\"Label\",frame:{x:\""+updatedX+"\",y:\"0.0\",width:\""+grid.getWidth()+"\",height:\"44.0\"},border:{borderweight:\"1\",borderstyle:\"\",bordercolor:{red:0,blue:0,green:0,alpha:1.0}},background:{red:255,blue:255,green:255,alpha:0.0},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:\"14\",align:\"left\",color:{red:0,blue:0,green:0,alpha:1.0}}},\n\t");
					updatedX = updatedX + Float.parseFloat(grid.getWidth());
					
				}
				Utility.removeCommaFromLast(contents);
				contents.append("],");
				contents.append("gridFields:[").append("\n\t");
				updatedX = 0;
				for(Grid grid : tableRow.getGridArray()){
					// {sortable:false,width:"40",uiType:"Label",row:"1",fieldname:"emp_id",id:"1",column:"1",freeze:false},
					contents.append("{");
					contents.append("id:\"").append(grid.getFieldName() + "_" + grid.getId()).append("\",");
					contents.append("name:\"").append(grid.getFieldName()).append("\",");
					contents.append("column:\"").append(grid.getColumn())
					.append("\",");
					contents.append("row:\"").append(grid.getRow())
					.append("\",");
					contents.append("value:\"\",template:\"["+grid.getFieldName()+"]\",viewtype:\"Label\",frame:{x:\""+updatedX+"\",y:\"0.0\",width:\""+grid.getWidth()+"\",height:\"44.0\"},border:{borderweight:\"1\",borderstyle:\"\",bordercolor:{red:0,blue:0,green:0,alpha:1.0}},background:{red:255,blue:255,green:255,alpha:0.0},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:\"14\",align:\"left\",color:{red:0,blue:0,green:0,alpha:1.0}}},\n\t");
					updatedX = updatedX + Float.parseFloat(grid.getWidth()) ;
				}
				Utility.removeCommaFromLast(contents);
				contents.append("],");
			}
			contents.append("\n\t")
					.append("children:[")
					.append(createChildren(child, genApp))
					.append("],\n\t")
					// events:{Tap:[{method:"View",category:"PageAction",params:{name:'page_4304',transferdata:true}}]}
					.append("icon:{type:\"row\",style:\"").append(getAccessoryViewType(child.getGroup().get(0).getRecordCellDef().getEditingAccessoryType()))
					.append("\",");
			if (getIconEvents(genApp, baseview, child) != null) {
				contents.append(getIconEvents(genApp, baseview, child).get("icon"));

			} else{
				contents.append("");
			}
			
			contents.append("}\n\t,").append("rowsize:").append(child.getRowHeight()).append(",\n\t");

			// set event for row..
			/*if (getRowEvents(genApp, baseview, child) != null) {
				contents.append((getRowEvents(genApp, baseview, child).get(
						"row") != null) ? getRowEvents(genApp, baseview, child)
						.get("row") : "");
			}
		*/
			if (child.getGroup().get(0).getRecordCellDef().getEvent() != null) {
				ArrayList<Event> events = child.getGroup().get(0).getRecordCellDef().getEvent();
				if (events != null) {
					contents.append("events:{");
					StringBuilder actions = new StringBuilder();
					for (Event event : events) {
						String eventname = event.getEventName();
						//System.out.println("Event Name = " + eventname);
						if (eventname.equalsIgnoreCase("didSelectRowAtIndexPath") || eventname.equalsIgnoreCase("flickLR")  || eventname.equalsIgnoreCase("flickRL")) {
							actions.append(ActionBuilder.buildAction(genApp, baseview, event));
							
						}

					}
					contents.append(actions);
					contents.append("}");
				}
			}
		}else if(((String) child.getCellStyle()).equalsIgnoreCase("tabular-grid")){

			contents.append("{id:\"")
					.append(child.getUiid())
					.append("\",\n\t")
					.append("viewtype:\"")
					.append(getViewType(child.getViewType(), child))
					.append("\",\n\t")
					.append("tablestyle:\"")
					.append(child.getTableStyle())
					.append("\",\n\t")
					.append("style:\"")
					.append(child.getCellStyle().replace("-", ""))
					.append("\",\n\t")
					.append("group:[{")
					.append("\n\t")
					.append("header:\"" + child.getGroup().get(0).getTitle()
							+ "\",\n\t")
					.append("footer:\"" + child.getGroup().get(0).getFooter()
							+ "\",\n\t").append("template:{");
			for (Item group : child.getGroup()) {
				TableRow tableRow = group.getRecordCellDef();
				String img = (tableRow.getMainImage().getFileExt() != "") ? (tableRow
						.getMainImage().getFileName() + "." + tableRow
						.getMainImage().getFileExt()) : (tableRow
						.getMainImage().getFileName());
				System.out.println("TEST : " + tableRow.getGridArray().get(0).getFieldName());
				contents.append("maintext:\"");
				contents.append(tableRow.getMainText()).append("\"")
						.append(",subtext:\"").append(tableRow.getDetailText())
						.append("\",image:\"").append(img).append("\",")
						.append("backgroundColor:{")
						.append(ColorBuilder.build(tableRow.getBackgroundColor()))
						.append("},\n\t");
				float updatedX = 0;
				contents.append("gridHeaders:[").append("\n\t");
				//{id:"1",name:"gridHeader",value:"emp_id",template:"",viewtype:"Label",frame:{x:"0.0",y:"0.0",width:"40",height:"44.0"},border:{borderweight:"0",borderstyle:"",bordercolor:{red:0,blue:0,green:0,alpha:1.0}},background:{red:255,blue:255,green:255,alpha:0.0},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:"14",align:"left",color:{red:0,blue:0,green:0,alpha:1.0}}},
				int i = 0;
				int nextColumn = 0;
				float height = 44;
				float top = 0;
				int count = -1;
				for(Grid grid : tableRow.getGridArray()){
					
					// {sortable:false,width:"40",uiType:"Label",row:"1",fieldname:"emp_id",id:"1",column:"1",freeze:false},
					if(i+1 < tableRow.getGridArray().size()){
						if(tableRow.getGridArray().get(i+1).getColumn() == grid.getColumn() || count == 1){
							if(count == 0){
								System.out.println("Here 1..");
								count = 1;
								nextColumn++;
								height = 44;//44/nextColumn;
								top = 0;
							}else{
								if(tableRow.getGridArray().get(i-1).getColumn() == grid.getColumn()){
									System.out.println("Here 2..");
									count = 1;
									nextColumn++;
									height = 44/nextColumn;
									top = 44 - (((nextColumn -1) * 44)/nextColumn);	
								}else{
									count = 0;
									nextColumn = 0;
								}
								
							}
							System.out.println(nextColumn);
						}else{
							count = 0;
							nextColumn = 0;
						}
					}
					contents.append("{");
					contents.append("id:\"").append(grid.getFieldName() + "_" + grid.getId()).append("\",");
					contents.append("name:\"").append(grid.getFieldName()).append("\",");
					contents.append("column:\"").append(grid.getColumn())
					.append("\",");
					contents.append("row:\"").append(grid.getRow())
					.append("\",");
					contents.append("value:\""+grid.getFieldName()+"\",template:\"\",viewtype:\"Label\",frame:{x:\""+updatedX+"\",y:\""+ top +"\",width:\""+grid.getWidth()+"\",height:\""+ height +"\"},border:{borderweight:\"1\",borderstyle:\"\",bordercolor:{red:0,blue:0,green:0,alpha:1.0}},background:{red:255,blue:255,green:255,alpha:0.0},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:\"14\",align:\"left\",color:{red:0,blue:0,green:0,alpha:1.0}}},\n\t");
					updatedX = updatedX + Float.parseFloat(grid.getWidth());
					i++;
					height = 44;
					top = 0;
				}
				Utility.removeCommaFromLast(contents);
				contents.append("],");
				contents.append("gridFields:[").append("\n\t");
				updatedX = 0;
				for(Grid grid : tableRow.getGridArray()){
					// {sortable:false,width:"40",uiType:"Label",row:"1",fieldname:"emp_id",id:"1",column:"1",freeze:false},
					contents.append("{");
					contents.append("id:\"").append(grid.getFieldName() + "_" + grid.getId()).append("\",");
					contents.append("name:\"").append(grid.getFieldName()).append("\",");
					contents.append("column:\"").append(grid.getColumn())
					.append("\",");
					contents.append("row:\"").append(grid.getRow())
					.append("\",");
					contents.append("value:\"\",template:\"["+grid.getFieldName()+"]\",viewtype:\"Label\",frame:{x:\""+updatedX+"\",y:\"0.0\",width:\""+grid.getWidth()+"\",height:\"44.0\"},border:{borderweight:\"1\",borderstyle:\"\",bordercolor:{red:0,blue:0,green:0,alpha:1.0}},background:{red:255,blue:255,green:255,alpha:0.0},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:\"14\",align:\"left\",color:{red:0,blue:0,green:0,alpha:1.0}}},\n\t");
					updatedX = updatedX + Float.parseFloat(grid.getWidth());
				}
				Utility.removeCommaFromLast(contents);
				contents.append("],");
			}
			contents.append("\n\t")
					.append("children:[")
					.append(createChildren(child, genApp))
					.append("],\n\t")
					// events:{Tap:[{method:"View",category:"PageAction",params:{name:'page_4304',transferdata:true}}]}
					.append("icon:{type:\"row\",style:\"").append(getAccessoryViewType(child.getGroup().get(0).getRecordCellDef().getEditingAccessoryType()))
					.append("\",");
			if (getIconEvents(genApp, baseview, child) != null) {
				contents.append(getIconEvents(genApp, baseview, child).get("icon"));

			} else{
				contents.append("");
			}
			
			contents.append("}\n\t,").append("rowsize:").append(child.getRowHeight()).append(",\n\t");

			// set event for row..
			/*if (getRowEvents(genApp, baseview, child) != null) {
				contents.append((getRowEvents(genApp, baseview, child).get(
						"row") != null) ? getRowEvents(genApp, baseview, child)
						.get("row") : "");
			}*/
			if (child.getGroup().get(0).getRecordCellDef().getEvent() != null) {
				ArrayList<Event> events = child.getGroup().get(0).getRecordCellDef().getEvent();
				if (events != null) {
					contents.append("events:{");
					StringBuilder actions = new StringBuilder();
					for (Event event : events) {
						String eventname = event.getEventName();
						//System.out.println("Event Name = " + eventname);
						if (eventname.equalsIgnoreCase("didSelectRowAtIndexPath") || eventname.equalsIgnoreCase("flickLR")  || eventname.equalsIgnoreCase("flickRL")) {
							actions.append(ActionBuilder.buildAction(genApp, baseview, event));
							
						}

					}
					contents.append(actions);
					contents.append("}");
				}
			}
		
		
		}

		contents.append("}}]},\t\n");

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

	private static Map<String, String> getRowEvents(GenApp genApp,
			BaseView baseview, Table child) {
		Map<String, String> actions = null;
		Item item = child.getGroup().get(0);
		TableRow tablerow = item.getRecordCellDef();

		if (tablerow.getEvent() != null) {
			for (Event event : tablerow.getEvent()) {
				if (!event.getAction().isEmpty()) {
					actions = RemoteTableViewListEventBuilder.buildEvent(
							genApp, baseview, event);
				}
			}
		}

		return actions;
	}

	private static Map<String, String> getIconEvents(GenApp genApp,
			BaseView baseview, Table child) {
		Map<String, String> actions = null;
		Item item = child.getGroup().get(0);
		TableRow tablerow = item.getRecordCellDef();

		if (tablerow.getEvent() != null) {
			for (Event event : tablerow.getEvent()) {

				if (!event.getAction().isEmpty()
						&& event.getEventName().equalsIgnoreCase(
								"accessoryButtonTappedForRowWithIndexPath")) {
					actions = DBTableEventBuilder.buildEvent(genApp, baseview,
							event);
				}
			}
		}

		return actions;
	}

	private static StringBuilder createChildren(Table child, GenApp genApp) {
		StringBuilder contents = new StringBuilder();
		for (Item group : child.getGroup()) {
			TableRow tableRow = group.getRecordCellDef();
			for (BaseView ui : tableRow.getChildren()) {

				StringBuilder childrenS = new StringBuilder();

				if (ui instanceof Label) {
					childrenS.append(LabelBuilder.build(ui, genApp)).append(
							",\n\t");
				} else if (ui instanceof Button) {
					childrenS.append(ButtonBuilder.build(ui, genApp)).append(
							",\n\t");
				} else if (ui instanceof TextField) {
					childrenS.append(TextFieldBuilder.build(ui, genApp))
							.append(",\n\t");
				} else if (ui instanceof Image) {
					childrenS.append(ImageBuilder.build(ui, genApp)).append(
							",\n\t");
				} else if (ui instanceof TextView) {
					childrenS.append(TextViewBuilder.build(ui, genApp)).append(
							",\n\t");
				} else if (ui instanceof Switch) {
					childrenS.append(SwitchBuilder.build(ui, genApp)).append(
							",\n\t");
				} else if (ui instanceof Slider) {
					childrenS.append(SliderBuilder.build(ui, genApp)).append(
							",\n\t");
				} else if (ui instanceof ProgressBar) {
					childrenS.append(ProgressBarBuilder.build(ui, genApp))
							.append(",\n\t");
				} else if (ui instanceof Indicator) {
					childrenS.append(WaitIndicatorBuilder.build(ui, genApp))
							.append(",\n\t");
				} else if (ui instanceof Segment) {
					childrenS.append(SegmentBuilder.build(ui, genApp)).append(
							",\n\t");
				} /*else {
					System.out.println(child.getViewType()
							+ "This UI is not ready yet..");
				}*/

				contents.append(childrenS);

			}
		}

		return Utility.removeCommaFromLast(contents);
	}

	public static StringBuilder getDataStructure(BaseView baseview) {
		Table child = (Table) baseview;

		String tableName = "";
		String whereClause = "";
		String orderByClause = "";
		String groupByClause = "";
		String servicename = "";
		StringBuilder contents = new StringBuilder();

		for (Item item : child.getGroup()) {
			tableName = item.getTableName();
			whereClause = item.getWhere();
			orderByClause = item.getSort();
			groupByClause = item.getGroupBy();
			servicename = item.getServiceName();
		}

		// data:{order:"",updated:false,contents:[],tablename:"matodb",wherecond:""}
		contents.append("data:{").append("order:\"").append(orderByClause)
				.append("\",").append("updated:false,").append("contents:[],")
				.append("tablename:\"").append(tableName).append("\",")
				.append("servicename:\"").append(servicename).append("\",")
				.append("wherecond:\"").append(whereClause).append("\"");
		if(groupByClause.length() > 0){
			contents.append(",groupby:\"").append(groupByClause).append("\"");
		}
		contents.append("},\n\t");

		return contents;
	}

}
