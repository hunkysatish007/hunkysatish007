package com.mobilous.mobileweb.uibuilder;

import java.util.ArrayList;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.Button;
import com.mobilous.mobileweb.ui.Calendar;
import com.mobilous.mobileweb.ui.Camera;
import com.mobilous.mobileweb.ui.Chart;
import com.mobilous.mobileweb.ui.ComboBox;
import com.mobilous.mobileweb.ui.DatePicker;
import com.mobilous.mobileweb.ui.Gadget;
import com.mobilous.mobileweb.ui.GoogleMap;
import com.mobilous.mobileweb.ui.Image;
import com.mobilous.mobileweb.ui.Indicator;
import com.mobilous.mobileweb.ui.Label;
import com.mobilous.mobileweb.ui.ListBox;
import com.mobilous.mobileweb.ui.Picker;
import com.mobilous.mobileweb.ui.ProgressBar;
import com.mobilous.mobileweb.ui.QRCode;
import com.mobilous.mobileweb.ui.SearchBar;
import com.mobilous.mobileweb.ui.Segment;
import com.mobilous.mobileweb.ui.Slider;
import com.mobilous.mobileweb.ui.SoundBox;
import com.mobilous.mobileweb.ui.Switch;
import com.mobilous.mobileweb.ui.Table;
import com.mobilous.mobileweb.ui.TextField;
import com.mobilous.mobileweb.ui.TextView;
import com.mobilous.mobileweb.ui.TileList;
import com.mobilous.mobileweb.ui.VideoBox;
import com.mobilous.mobileweb.ui.WebView;

public class ChildrenBuilder {
	public static StringBuilder buildChildren(ArrayList<BaseView> children, StringBuffer pagecontent, GenApp genapp) {
		StringBuilder childrenS = new StringBuilder();
		if(children != null){
			for (BaseView child : children) {
				if (child instanceof Label) {
					childrenS.append(LabelBuilder.build(child, genapp));//.append(",\n\t");
					childrenS.deleteCharAt(childrenS.length() - 2);
					childrenS.append(",parentUI:\"" + child.getParentUI() + "\"}," ).append("\n\t");
				} else if (child instanceof Switch) {
					childrenS.append(SwitchBuilder.build(child, genapp));//.append(",\n\t");
					childrenS.deleteCharAt(childrenS.length() - 2);
					childrenS.append(",parentUI:\"" + child.getParentUI() + "\"}," ).append("\n\t");
				} else if (child instanceof Button) {
					childrenS.append(ButtonBuilder.build(child, genapp));//.append(",\n\t");
					childrenS.deleteCharAt(childrenS.length() - 2);
					childrenS.append(",parentUI:\"" + child.getParentUI() + "\"}," ).append("\n\t");
				} else if (child instanceof TextField) {
					childrenS.append(TextFieldBuilder.build(child, genapp));//.append(",\n\t");
					childrenS.deleteCharAt(childrenS.length() - 2);
					childrenS.append(",parentUI:\"" + child.getParentUI() + "\"}," ).append("\n\t");
				} else if (child instanceof Image) {
					childrenS.append(ImageBuilder.build(child, genapp));//.append(",\n\t");
					childrenS.deleteCharAt(childrenS.length() - 2);
					childrenS.append(",parentUI:\"" + child.getParentUI() + "\"}," ).append("\n\t");
				} else if (child instanceof TextView) {
					childrenS.append(TextViewBuilder.build(child, genapp));//.append(",\n\t");
					childrenS.deleteCharAt(childrenS.length() - 2);
					childrenS.append(",parentUI:\"" + child.getParentUI() + "\"}," ).append("\n\t");
				} else if (child instanceof Table) {
					if (child.getViewType().equalsIgnoreCase("DbTableViewList")) {
						pagecontent.append(DbTableViewListBuilder
								.getDataStructure(child));
						childrenS.append(
								DbTableViewListBuilder.build(child, genapp))
								.append("\n\t");
					}

					if (child.getViewType().equalsIgnoreCase("DbTableView")) {
						pagecontent.append("data:{updated:false").append(",");
						pagecontent.append("contents:[").append("],");
						pagecontent.append("tablename:\"")
								.append(TableBuilder.getTableName(child))
								.append("\",");
						pagecontent.append("wherecond:\"")
								.append(TableBuilder.getWhereClause(child))
								.append("\",");
						pagecontent.append("order:\"").append("\"},");
						childrenS.append(TableBuilder.build(child, genapp));
					}
					//System.out.println("view type is : " + child.getViewType());

					if (child.getViewType().equalsIgnoreCase("RemoteTableView")) {
					//	System.out.println("INTO THE ReMote TAble View");
						pagecontent.append("data:{updated:false").append(",");
						pagecontent.append("contents:[").append("],");
						pagecontent.append("tablename:\"")
								.append(TableBuilder.getTableName(child))
								.append("\",");
						pagecontent.append("servicename:\"")
								.append(((Table) child).getServiceName())
								.append("\",");
						pagecontent.append("wherecond:\"")
								.append(TableBuilder.getWhereClause(child))
								.append("\",");
						pagecontent.append("order:\"").append("\"},");
						childrenS.append(TableBuilder.build(child, genapp));
					}

					if (child.getViewType().equalsIgnoreCase(
							"RemoteTableViewList")) {
						pagecontent.append(RemoteTableViewList
								.getDataStructure(child));
						childrenS.append(
								RemoteTableViewList.build(child, genapp))
								.append("\n\t");
					}
					// Fixed Dataset
					if (child.getViewType().equalsIgnoreCase("TableViewList")) {
						pagecontent.append(FixedDataSetTableViewList.getDataStructure(child));
						childrenS.append(FixedDataSetTableViewList.build(child, genapp))
								.append("\n\t");

					}
					
					if (child.getViewType().equalsIgnoreCase("TableView")) {
						pagecontent.append(FixedDataSetTableView.getDataStructure(child));
						childrenS.append(FixedDataSetTableView.build(child, genapp))
								.append("\n\t");

					}
				} else if (child instanceof Slider) {
					childrenS.append(SliderBuilder.build(child, genapp));
					childrenS.deleteCharAt(childrenS.length() - 2);
					childrenS.append(",parentUI:\"" + child.getParentUI() + "\"}," ).append("\n\t");
							//.append(",\n\t");
				} else if (child instanceof VideoBox) {
					childrenS.append(VideoBoxBuilder.build(child, genapp));
					childrenS.deleteCharAt(childrenS.length() - 2);
					childrenS.append(",parentUI:\"" + child.getParentUI() + "\"}," ).append("\n\t");
							//.append(",\n\t");
				} else if (child instanceof Segment) {
					childrenS.append(SegmentBuilder.build(child, genapp));
					childrenS.deleteCharAt(childrenS.length() - 1);
					childrenS.append("parentUI:\"" + child.getParentUI() + "\"}," ).append("\n\t");
							//.append(",\n\t");
				} else if (child instanceof DatePicker) {
					childrenS.append(DatePickerBuilder.build(child, genapp));
					childrenS.deleteCharAt(childrenS.length() - 2);
					childrenS.append(",parentUI:\"" + child.getParentUI() + "\"}," ).append("\n\t");
							//.append(",\n\t");
				} else if (child instanceof Indicator) {
					childrenS.append(WaitIndicatorBuilder.build(child, genapp));
					childrenS.deleteCharAt(childrenS.length() - 1);
					childrenS.append("parentUI:\"" + child.getParentUI() + "\"}," ).append("\n\t");
							//.append(",\n\t");
				} else if (child instanceof WebView) {
					childrenS.append(WebViewBuilder.build(child, genapp));
					childrenS.deleteCharAt(childrenS.length() - 2);
					childrenS.append(",parentUI:\"" + child.getParentUI() + "\"}," ).append("\n\t");
							//.append(",\n\t");
				} else if (child instanceof ProgressBar) {
					childrenS.append(ProgressBarBuilder.build(child, genapp));
					childrenS.deleteCharAt(childrenS.length() - 1);
					childrenS.append("parentUI:\"" + child.getParentUI() + "\"}," ).append("\n\t");
							//.append(",\n\t");
				} else if (child instanceof SearchBar) {
					childrenS.append(SearchBarBuilder.build(child, genapp));
					childrenS.deleteCharAt(childrenS.length() - 2);
					childrenS.append(",parentUI:\"" + child.getParentUI() + "\"}," ).append("\n\t");
							//.append(",\n\t");
				} else if (child instanceof GoogleMap) {
					childrenS.append(GoogleMapBuilder.build(child, genapp));
					childrenS.deleteCharAt(childrenS.length() - 2);
					childrenS.append(",parentUI:\"" + child.getParentUI() + "\"}," ).append("\n\t");
							//.append(",\n\t");
				} else if (child instanceof SoundBox) {
					childrenS.append(SoundBoxBuilder.build(child, genapp));
					childrenS.deleteCharAt(childrenS.length() - 2);
					childrenS.append(",parentUI:\"" + child.getParentUI() + "\"}," ).append("\n\t");
							//.append(",\n\t");
				} else if (child instanceof Picker) {
					childrenS.append(PickerBuilder.build(child, genapp));
					childrenS.deleteCharAt(childrenS.length() - 2);
					childrenS.append(",parentUI:\"" + child.getParentUI() + "\"}," ).append("\n\t");
							//.append(",\n\t");
				} else if (child instanceof Camera) {
					childrenS.append(CameraBuilder.build(child, genapp));
					childrenS.deleteCharAt(childrenS.length() - 2);
					childrenS.append(",parentUI:\"" + child.getParentUI() + "\"}," ).append("\n\t");
					//.append(",\n\t");
				}else if (child instanceof ComboBox) {
					childrenS.append(ComboBoxBuilder.build(child, genapp));//.append(",\n\t");
					childrenS.deleteCharAt(childrenS.length() - 2);
					childrenS.append(",parentUI:\"" + child.getParentUI() + "\"}," ).append("\n\t");
				}else if (child instanceof Gadget) {
					childrenS.append(GadgetUIBuilder.build(child, genapp));
					childrenS.deleteCharAt(childrenS.length() - 2);
					childrenS.append(",parentUI:\"" + child.getParentUI() + "\"}," ).append("\n\t");
					//.append(",\n\t");
				}else if (child instanceof ListBox) {
					childrenS.append(ListBoxBuilder.build(child, genapp));
					childrenS.deleteCharAt(childrenS.length() - 1);
					childrenS.append("parentUI:\"" + child.getParentUI() + "\"}," ).append("\n\t");
					//.append(",\n\t");
				}else if (child instanceof QRCode) {
					childrenS.append(QRCodeBuilder.build(child, genapp));
					childrenS.deleteCharAt(childrenS.length() - 2);
					childrenS.append(",parentUI:\"" + child.getParentUI() + "\"}," ).append("\n\t");
					//.append(",\n\t");;
				}else if (child instanceof Chart) {
					childrenS.append(ChartBuilder.build(child, genapp));
					childrenS.deleteCharAt(childrenS.length() - 2);
					childrenS.append(",parentUI:\"" + child.getParentUI() + "\"}," ).append("\n\t");
					//.append(",\n\t");;
				}else if (child instanceof TileList) {
					childrenS.append(TileListBuilder.build(child, genapp));
					childrenS.deleteCharAt(childrenS.length() - 2);
					childrenS.append(",parentUI:\"" + child.getParentUI() + "\"}," ).append("\n\t");
					//.append(",\n\t");;
				}else if (child instanceof Calendar) {
					childrenS.append(CalendarBuilder.build(child, genapp));
					childrenS.deleteCharAt(childrenS.length() - 2);
					childrenS.append(",parentUI:\"" + child.getParentUI() + "\"}," ).append("\n\t");
					//.append(",\n\t");;
				}/*else {
					System.out.println(child.getViewType()
							+ "This UI is not ready yet..");
				}*/
				/*childrenS.deleteCharAt(childrenS.length() - 2);
				childrenS.append(",parentUI:\"" + child.getParentUI() + "\"}," ).append("\n\t");
	*/
			}
		}
		
		
		return childrenS;
		
	}

}
