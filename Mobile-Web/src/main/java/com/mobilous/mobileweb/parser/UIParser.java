package com.mobilous.mobileweb.parser;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import com.dd.plist.NSArray;
import com.dd.plist.NSDictionary;
import com.dd.plist.NSNumber;
import com.dd.plist.NSObject;
import com.dd.plist.NSString;
import com.dd.plist.PropertyListParser;
import com.mobilous.mobileweb.app.DefFile;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.app.MainFile;
import com.mobilous.mobileweb.app.Page;
import com.mobilous.mobileweb.app.PageScrollViewPageSet;
import com.mobilous.mobileweb.app.ScrollView;
import com.mobilous.mobileweb.attribute.Color;
import com.mobilous.mobileweb.attribute.File;
import com.mobilous.mobileweb.attribute.Font;
import com.mobilous.mobileweb.etc.CustomView;
import com.mobilous.mobileweb.etc.DataArray;
import com.mobilous.mobileweb.etc.FlexItem;
import com.mobilous.mobileweb.etc.ImageItem;
import com.mobilous.mobileweb.etc.PageOverlayItem;
import com.mobilous.mobileweb.etc.SystemItem;
import com.mobilous.mobileweb.etc.TextItem;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.event.GadgetEvents;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.Button;
import com.mobilous.mobileweb.ui.Calendar;
import com.mobilous.mobileweb.ui.CalendarEvent;
import com.mobilous.mobileweb.ui.Camera;
import com.mobilous.mobileweb.ui.Canvas;
import com.mobilous.mobileweb.ui.Chart;
import com.mobilous.mobileweb.ui.ComboBox;
import com.mobilous.mobileweb.ui.ControlView;
import com.mobilous.mobileweb.ui.DatePicker;
import com.mobilous.mobileweb.ui.Email;
import com.mobilous.mobileweb.ui.Gadget;
import com.mobilous.mobileweb.ui.GadgetFile;
import com.mobilous.mobileweb.ui.GoogleMap;
import com.mobilous.mobileweb.ui.Grid;
import com.mobilous.mobileweb.ui.Image;
import com.mobilous.mobileweb.ui.Indicator;
import com.mobilous.mobileweb.ui.Label;
import com.mobilous.mobileweb.ui.ListBox;
import com.mobilous.mobileweb.ui.NavigationBar;
import com.mobilous.mobileweb.ui.PDFViewer;
import com.mobilous.mobileweb.ui.Padding;
import com.mobilous.mobileweb.ui.PageControl;
import com.mobilous.mobileweb.ui.PageOverlay;
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
import com.mobilous.mobileweb.ui.ToolBar;
import com.mobilous.mobileweb.ui.ToolBarBottom;
import com.mobilous.mobileweb.ui.ToolBarItems;
import com.mobilous.mobileweb.ui.ToolBarLeft;
import com.mobilous.mobileweb.ui.ToolBarRight;
import com.mobilous.mobileweb.ui.ToolBarTop;
import com.mobilous.mobileweb.ui.VideoBox;
import com.mobilous.mobileweb.ui.WebView;
import com.mobilous.mobileweb.util.PlistLocator;

public class UIParser extends ADFParser {

	public static boolean isUIParsing = false; 
	public UIParser(PlistLocator locator) {
		super(locator, MODE);
	}

	public static ArrayList<DefFile> parsePages(NSObject[] obj, GenApp genApp,
			DefFile defFile, Page page) throws Exception {
		ArrayList<DefFile> pageList = new ArrayList<DefFile>();
		for (NSObject o : obj) {
			NSDictionary dic = (NSDictionary) o;
			String viewType = "DefFile";
			try {
				viewType = dic.objectForKey("viewType").toString();
			} catch (Exception e) {
			}

			if (viewType.equalsIgnoreCase("DefFile")) {
				DefFile childPage;
				if(dic.objectForKey("pagedef") != null)
					childPage = parseDefFile((NSDictionary) dic.objectForKey("pagedef"), genApp, defFile.getDefFileID(), page.getViewType());
				else
					childPage = parseDefFile((NSDictionary) o, genApp, defFile.getDefFileID(), page.getViewType());
				if(childPage != null){
					for (String key : dic.allKeys()) {
						if (key.equalsIgnoreCase("frame")) {
							childPage.setFrame(AttributeParser.parsePoint((NSDictionary) dic.objectForKey(key)));
						}
  					}
	
					if (page.getViewType().equalsIgnoreCase("SplitView")) {
						if(childPage.getPage() != null)
							childPage.getPage().setParentSplitView(true);
					}
					if (page.getViewType().equalsIgnoreCase("PageScrollView")) {
						if(childPage.getPage() != null)
							childPage.getPage().setParentPageScrollView(true);
					}
					pageList.add(childPage);
  				}
			} else if (viewType.equalsIgnoreCase("PageScrollView")) {
//				NSObject[] dicpg = ((NSArray) dic.objectForKey("pages"))
//						.getArray();
//				for (NSObject pg : dicpg)
//					pageList.add(parseDefFile((NSDictionary) pg, genApp,
//							defFile.getDefFileID(), "Actions"));
				UIParser.parseChildren(
						((NSArray) dic.objectForKey("Children")).getArray(),
						genApp, defFile);
			} else if (viewType.equalsIgnoreCase("DbPageScrollView")) {
				for (String key : dic.allKeys()) {
					if (key.equalsIgnoreCase("RecordCellDef"))
						page.setRecordCellDef(ETCParser.parseTableRow(
								(NSDictionary) dic
										.objectForKey("RecordCellDef"), genApp,
								defFile));
					else if (key.equalsIgnoreCase("ServiceName"))
						page.setServiceName(dic.objectForKey(key).toString());
					else if (key.equalsIgnoreCase("tablename"))
						page.setTablename(dic.objectForKey(key).toString());
					else if (key.equalsIgnoreCase("where"))
						page.setWhere(dic.objectForKey(key).toString());
					else if (key.equalsIgnoreCase("sort"))
						page.setSort(dic.objectForKey(key).toString());
				}
				NSObject pg = ((NSArray) dic.objectForKey("pages")).getArray()[0];
				DefFile def1 = parseDefFile((NSDictionary) pg, genApp,
						defFile.getDefFileID(), "DbPageScrollView-1");
				DefFile def2 = parseDefFile((NSDictionary) pg, genApp,
						defFile.getDefFileID(), "DbPageScrollView-2");
				pageList.add(def1);
				pageList.add(def2);
			} else if (viewType.equalsIgnoreCase("ScrollView")) {
				for (String key : dic.allKeys()) {
					if (key.equalsIgnoreCase("frame")) {
						AttributeParser.setPageHeightAndWidthForScrollViewPage(
								(NSDictionary) dic.objectForKey(key), page);
						// page.setFrame(AttributeParser.parsePoint((NSDictionary)
						// dic.objectForKey(key)));
					} else if (key.equalsIgnoreCase("Children")) {
						page.setChildren(UIParser.parseChildren(
								((NSArray) dic.objectForKey(key)).getArray(),
								genApp, defFile));
					} else if (key.equalsIgnoreCase("backgroundColor")) {
						page.setBackgroundColor(AttributeParser
								.parseColor((NSDictionary) dic
										.objectForKey(key)));
					}
				}
			}
		}
		return pageList;
	}

	public static ArrayList<BaseView> parseChildren(NSObject[] obj,
			GenApp genApp, DefFile defFile) throws Exception {
		ArrayList<BaseView> childrenList = new ArrayList<BaseView>();
		for (NSObject o : obj) {
			BaseView children = null;
			NSDictionary dic = (NSDictionary) o;
			String viewType = dic.objectForKey("viewType").toString();
			UIParser.isUIParsing = true;
			if (viewType.equalsIgnoreCase("Button"))
				children = parseButton(dic, genApp, defFile);
			else if (viewType.equalsIgnoreCase("RadioButtonGroup"))
				children = parseButton(dic, genApp, defFile);
			else if (viewType.equalsIgnoreCase("TextField"))
				children = parseTextField(dic, genApp, defFile);
			else if (viewType.equalsIgnoreCase("NumericField"))
				children = parseTextField(dic, genApp, defFile);
			else if (viewType.equalsIgnoreCase("Label") || viewType.equalsIgnoreCase("LinkLabel")) {
				children = parseLabel(dic, genApp);
			} else if (viewType.equalsIgnoreCase("Image"))
				children = parseImage(dic, genApp);
			else if (viewType.equalsIgnoreCase("TextView"))
				children = parseTextView(dic, genApp, defFile);
			else if (viewType.equalsIgnoreCase("Switch"))
				children = parseSwitch(dic, genApp, defFile);
			else if (viewType.equalsIgnoreCase("Picker"))
				children = parsePicker(dic, genApp, defFile);
			else if (viewType.equalsIgnoreCase("DatePicker"))
				children = parseDatePicker(dic, genApp, defFile);
			else if (viewType.equalsIgnoreCase("Slider"))
				children = parseSlider(dic, genApp, defFile);
			else if (viewType.equalsIgnoreCase("ProgressBar"))
				children = parseProgressBar(dic, genApp);
			else if (viewType.equalsIgnoreCase("Segment"))
				children = parseSegment(dic, genApp, defFile);
			else if (viewType.equalsIgnoreCase("Toolbar"))
				children = parseToolBar(dic, genApp, defFile);
			else if (viewType.equalsIgnoreCase("GoogleMap"))
				children = parseGoogleMap(dic, genApp, defFile);
			else if (viewType.equalsIgnoreCase("VideoBox"))
				children = parseVideoBox(dic, genApp, defFile);
			else if (viewType.equalsIgnoreCase("SoundBox"))
				children = parseSoundBox(dic, genApp, defFile);
			else if (viewType.equalsIgnoreCase("PageControl"))
				children = parsePageControl(dic, genApp, defFile);
			else if (viewType.equalsIgnoreCase("SearchBar"))
				children = parseSearchBar(dic, genApp, defFile);
			else if (viewType.equalsIgnoreCase("PDFViewer"))
				children = parsePDFViewer(dic, genApp);
			else if (viewType.equalsIgnoreCase("TableView"))
				children = parseTable(dic, genApp, defFile);
			else if (viewType.equalsIgnoreCase("TableViewList"))
				children = parseTable(dic, genApp, defFile);
			else if (viewType.equalsIgnoreCase("DbTableView"))
				children = parseTable(dic, genApp, defFile);
			else if (viewType.equalsIgnoreCase("DbTableViewList"))
				children = parseTable(dic, genApp, defFile);
			else if (viewType.equalsIgnoreCase("RemoteTableViewList"))
				children = parseTable(dic, genApp, defFile);
			else if (viewType.equalsIgnoreCase("RemoteTableView"))
				children = parseTable(dic, genApp, defFile);
			else if (viewType.equalsIgnoreCase("RSSTableList"))
				children = parseTable(dic, genApp, defFile);
			else if (viewType.equalsIgnoreCase("Email"))
				children = parseEmail(dic);
			else if (viewType.equalsIgnoreCase("CalendarEvent"))
				children = parseCalendarEvent(dic, genApp, defFile);
			else if (viewType.equalsIgnoreCase("Canvas"))
				children = parseCanvas(dic, genApp, defFile);
			else if (viewType.equalsIgnoreCase("WebView"))
				children = parseWebView(dic, genApp, defFile);
			else if (viewType.equalsIgnoreCase("Indicator"))
				children = parseIndicator(dic, genApp, defFile);
			else if (viewType.equalsIgnoreCase("Camera"))
				children = parseCamera(dic, genApp, defFile);
			else if (viewType.equalsIgnoreCase("ComboBox"))
				children = parseComboBox(dic, genApp, defFile);
			else if (viewType.equalsIgnoreCase("GadgetUI"))
				children = parseGadget(dic, genApp, defFile);
			else if (viewType.equalsIgnoreCase("ListBox"))
				children = parseListBox(dic, genApp, defFile);
			else if (viewType.equalsIgnoreCase("QRCode"))
				children = parseQRCode(dic, genApp, defFile);
			else if (viewType.equalsIgnoreCase("Chart"))
				children = parseChartView(dic, genApp, defFile);
			else if (viewType.equalsIgnoreCase("TileList"))
				children = parseTileListView(dic, genApp, defFile);
			else if (viewType.equalsIgnoreCase("Calendar"))
				children = parseCalendar(dic, genApp, defFile);
			else
				logger.debug("parseChildren parse: Unknown viewType found: "
						+ viewType);
			if (children != null)
				childrenList.add(children);
			UIParser.isUIParsing = false;
		}
		
		
		
		return childrenList;
	}

	private static Camera parseCamera(NSDictionary dic, GenApp genApp,
			DefFile defFile) throws Exception {
		// TODO Auto-generated method stub

		Camera camera = new Camera();

		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("viewType"))
				continue;
			else if (key.equalsIgnoreCase("type"))
				camera.setType(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("hidden"))
				camera.setHidden(((NSNumber) dic.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("cameraSide"))
				camera.setCameraSide(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("taborder")) {
				camera.setTabOrder(((NSNumber) dic.objectForKey(key))
						.intValue());
			} else if (key.equalsIgnoreCase("actions")) {
				camera.setEvent(parseEvent(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
			}
		}

		return (Camera) parseBaseView(dic, genApp, camera);
	}

	private static ComboBox parseComboBox(NSDictionary dic, GenApp genApp,
			DefFile defFile) throws Exception {
		// TODO Auto-generated method stub

		ComboBox comboBox = new ComboBox();

		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("viewType"))
				continue;
			else if (key.equalsIgnoreCase("borderColor")){
				comboBox.setBorderColor(AttributeParser.parseColor((NSDictionary) dic.objectForKey(key)));
			}else if (key.equalsIgnoreCase("backgroundColor")){
				comboBox.setBackgroundColor(AttributeParser.parseColor((NSDictionary) dic.objectForKey(key)));
			}else if (key.equalsIgnoreCase("SelectedIndex")){
				comboBox.setSelectedIndex(((NSNumber) dic.objectForKey(key)).intValue());
			}else if (key.equalsIgnoreCase("verticalAlignment")){
				comboBox.setVerticalAlignment(dic.objectForKey(key).toString());
			}else if (key.equalsIgnoreCase("hidden")){
				comboBox.setHidden(((NSNumber) dic.objectForKey(key)).boolValue());
			}else if (key.equalsIgnoreCase("dataarray")){
				//cb.setOptions(ETCParser.parseComboBoxOptions(((NSArray) dic.objectForKey(key)).getArray()));
				comboBox.setOptions(ETCParser.parseComboBoxOptions(((NSArray) dic.objectForKey(key)).getArray()));
			}else if (key.equalsIgnoreCase("borderWeight")){
				comboBox.setBorderWeight(((NSNumber) dic.objectForKey(key)).intValue());
			}else if (key.equalsIgnoreCase("font")){
				comboBox.setFont(AttributeParser.parseFont((NSDictionary) dic.objectForKey(key)));
			}else if (key.equalsIgnoreCase("taborder")){
				comboBox.setTabOrder(((NSNumber) dic.objectForKey(key)).intValue());
			}else if (key.equalsIgnoreCase("cornerRadius")){
				comboBox.setCornerRadius(((NSNumber) dic.objectForKey(key)).intValue());
			}else if (key.equalsIgnoreCase("type")){
				comboBox.setType(dic.objectForKey(key).toString());
			}else if (key.equalsIgnoreCase("ServiceName")){
				comboBox.setServiceName(dic.objectForKey(key).toString());
			}else if (key.equalsIgnoreCase("tablename")){
				comboBox.setTableName(dic.objectForKey(key).toString());
			}else if (key.equalsIgnoreCase("fieldname")){
				comboBox.setFieldName(dic.objectForKey(key).toString());
			}else if (key.equalsIgnoreCase("where")){
				comboBox.setWhereCondition(dic.objectForKey(key).toString());
			}else if (key.equalsIgnoreCase("order") || key.equalsIgnoreCase("sort")){
				comboBox.setOrderClause(dic.objectForKey(key).toString());
			}else if (key.equalsIgnoreCase("actions")){
				comboBox.setEvent(parseEvent((NSDictionary) dic.objectForKey(key), genApp, defFile));
			}else if (key.equalsIgnoreCase("displayText")){
				comboBox.setDisplayText(dic.objectForKey(key).toString());
			}else if (key.equalsIgnoreCase("padding")){
				comboBox.setPadding(AttributeParser.parsePadding((NSDictionary) dic.objectForKey(key)));
			}else if (key.equalsIgnoreCase("initialValue")){
				comboBox.setInitialValue(dic.objectForKey(key).toString());
			}else if (key.equalsIgnoreCase("editable")){
				comboBox.setEditable(((NSNumber) dic.objectForKey(key)).boolValue());
			}else if (key.equalsIgnoreCase("placeHolder"))
				comboBox.setPlaceholder(dic.objectForKey(key).toString());		
			}

		return (ComboBox) parseBaseView(dic, genApp, comboBox);
	}

	/************************************************************
	 * Parsing of Shared Properties/Views of every UI
	 ************************************************************/

	public static BaseView parseBaseView(NSDictionary dic, GenApp genApp,
			BaseView ui) throws Exception {
		ui.setParentUI(ADFParser.parentUI);
		ui.setParentUIName(ADFParser.parentUIName);
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("tag"))
				ui.setTag(((NSNumber) dic.objectForKey(key)).intValue());
			else if (key.equalsIgnoreCase("scale"))
				ui.setScale(((NSNumber) dic.objectForKey(key)).doubleValue());
			else if (key.equalsIgnoreCase("alpha"))
				ui.setAlpha(((NSNumber) dic.objectForKey(key)).doubleValue());
			else if (key.equalsIgnoreCase("userInteractionEnabled"))
				ui.setUserInteractionEnabled(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("autoresizesSubviews"))
				ui.setAutoresizesSubviews(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("clipsToBounds"))
				ui.setClipsToBounds(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("clearsContextBeforeDrawing"))
				ui.setClearsContextBeforeDrawing(((NSNumber) dic
						.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("name"))
				ui.setName(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("defaultValue"))
				ui.setDefaultValue(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("fieldname"))
				ui.setFieldname(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("contentMode"))
				ui.setContentMode(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("autocapitalizationType"))
				ui.setAutocapitalizationType(dic.objectForKey(key)
						.toString());
			else if (key.equalsIgnoreCase("verticalAlignment"))
				ui.setVerticalAlignment(dic.objectForKey(key)
						.toString());
			else if (key.equalsIgnoreCase("value") || key.equalsIgnoreCase("valueField"))
				ui.setValue(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("frame"))
				ui.setFrame(AttributeParser.parsePoint((NSDictionary) dic
						.objectForKey(key)));
			else if (key.equalsIgnoreCase("bounds"))
				ui.setBounds(AttributeParser.parsePoint((NSDictionary) dic
						.objectForKey(key)));
			else if (key.equalsIgnoreCase("center"))
				ui.setCenter(AttributeParser.parsePoint((NSDictionary) dic
						.objectForKey(key)));
			else if (key.equalsIgnoreCase("transform"))
				ui.setTransform(AttributeParser.parseMatrix((NSDictionary) dic
						.objectForKey(key)));
			else if (key.equalsIgnoreCase("backgroundColor"))
				ui.setBackgroundColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("autoResizingMask"))
				ui.setAutoResizingMask(ETCParser
						.parseResizingMask((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("action"))
				ui.setEvent(parseEvent((NSDictionary) dic.objectForKey(key),
						genApp, null));
			else if (key.equalsIgnoreCase("contentStretch"))
				ui.setContentStretch(ETCParser.parseStretch(((NSDictionary) dic
						.objectForKey(key))));
			else if (key.equalsIgnoreCase("hidden")) {
				ui.setHidden(((NSNumber) dic.objectForKey(key)).boolValue());
			}
			else if (key.equalsIgnoreCase("textShadow")) {
				ui.setTextShadow(((NSNumber) dic.objectForKey(key)).boolValue());
			}else if (key.equalsIgnoreCase("draggable")) {
				ui.setDraggable(((NSNumber) dic.objectForKey(key)).boolValue());
			}
			else if (key.equalsIgnoreCase("strikeout") && ((NSNumber) dic.objectForKey(key)).boolValue())
				ui.setTextDecoration(ui.getTextDecoration() + " line-through" );
			else if (key.equalsIgnoreCase("underline") && ((NSNumber) dic.objectForKey(key)).boolValue())
				ui.setTextDecoration(ui.getTextDecoration() + " underline" );

		}
		ui.setUiid("ui-" + genApp.getUiCounter());
		return ui;
	}

	public static ControlView parseControlView(NSDictionary dic, GenApp genApp,
			ControlView cv) throws Exception {
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("enable"))
				cv.setEnable(((NSNumber) dic.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("selected"))
				cv.setSelected(((NSNumber) dic.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("highlighted"))
				cv.setHighlighted(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("contentVerticalAlignment"))
				cv.setContentVerticalAlignment(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("contentHorizontalAlignment"))
				cv.setContentHorizontalAlignment(dic.objectForKey(key)
						.toString());
		}
		return (ControlView) parseBaseView(dic, genApp, cv);
	}

	public static ScrollView parseScrollView(NSDictionary dic, GenApp genApp,
			ScrollView sv, DefFile defFile) throws Exception {
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("scrollEnabled"))
				sv.setScrollEnabled(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("directionalLockEnabled"))
				sv.setDirectionalLockEnabled(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("scrollsToTop"))
				sv.setScrollsToTop(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("pagingEnabled"))
				sv.setPagingEnabled(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("bounces"))
				sv.setBounces(((NSNumber) dic.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("alwaysBounceVertical"))
				sv.setAlwaysBounceVertical(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("alwaysBounceHorizontal"))
				sv.setAlwaysBounceHorizontal(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("canCancelContentTouches"))
				sv.setCanCancelContentTouches(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("delaysContentTouches"))
				sv.setDelaysContentTouches(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("showsHorizontalScrollIndicator"))
				sv.setShowsHorizontalScrollIndicator(((NSNumber) dic
						.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("showsVerticalScrollIndicator"))
				sv.setShowsVerticalScrollIndicator(((NSNumber) dic
						.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("bouncesZoom"))
				sv.setBouncesZoom(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("decelerationRate"))
				sv.setDecelerationRate(((NSNumber) dic.objectForKey(key))
						.doubleValue());
			else if (key.equalsIgnoreCase("zoomScale"))
				sv.setZoomScale(((NSNumber) dic.objectForKey(key))
						.doubleValue());
			else if (key.equalsIgnoreCase("maximumZoomScale"))
				sv.setMaximumZoomScale(((NSNumber) dic.objectForKey(key))
						.doubleValue());
			else if (key.equalsIgnoreCase("minimumZoomScale"))
				sv.setMinimumZoomScale(((NSNumber) dic.objectForKey(key))
						.doubleValue());
			else if (key.equalsIgnoreCase("indicatorStyle"))
				sv.setIndicatorStyle(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("contentOffset"))
				sv.setContentOffset(ETCParser.parseOffset((NSDictionary) dic
						.objectForKey(key)));
			else if (key.equalsIgnoreCase("contentSize"))
				sv.setContentSize(ETCParser.parseSize((NSDictionary) dic
						.objectForKey(key)));
			else if (key.equalsIgnoreCase("contentInset"))
				sv.setContentInset(ETCParser.parseInset((NSDictionary) dic
						.objectForKey(key)));
			else if (key.equalsIgnoreCase("scrollIndicatorInsets"))
				sv.setScrollIndicatorInsets(ETCParser
						.parseInset((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("children"))
				sv.setChildren(UIParser.parseChildren(
						((NSArray) dic.objectForKey(key)).getArray(), genApp,
						defFile));
		}
		return (ScrollView) parseBaseView(dic, genApp, sv);
	}

	/************************************************************
	 * Parsing of Major UI
	 ************************************************************/
	public static Button parseButton(NSDictionary dic, GenApp genApp,
			DefFile defFile) throws Exception {
		Button button = new Button();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("viewType"))
				continue;
			else if (key.equalsIgnoreCase("type"))
				button.setType(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("buttonType"))
				button.setButtonType(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("reversesTitleShadowWhenHighlighted"))
				button.setReversesTitleShadowWhenHighlighted(((NSNumber) dic
						.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("adjustsImageWhenHighlighted"))
				button.setAdjustsImageWhenHighlighted(((NSNumber) dic
						.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("adjustsImageWhenDisabled"))
				button.setAdjustsImageWhenDisabled(((NSNumber) dic
						.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("showsTouchWhenHighlighted"))
				button.setShowsTouchWhenHighlighted(((NSNumber) dic
						.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("normalBackgroundImage"))
				button.setNormalBackgroundImage(AttributeParser
						.parseImageFile((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("normalImage"))
				button.setNormalImage(AttributeParser
						.parseImageFile((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("highlightedBackgroundImage"))
				button.setHighlightedBackgroundImage(AttributeParser
						.parseImageFile((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("highlightedImage"))
				button.setHighlightedImage(AttributeParser
						.parseImageFile((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("disabledBackgroundImage"))
				button.setDisabledBackgroundImage(AttributeParser
						.parseImageFile((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("disabledImage"))
				button.setDisabledImage(AttributeParser
						.parseImageFile((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("selectedBackgroundImage"))
				button.setSelectedBackgroundImage(AttributeParser
						.parseImageFile((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("selectedImage"))
				button.setSelectedImage(AttributeParser
						.parseImageFile((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("title"))
				button.setTitle(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("normalTitle"))
				button.setNormalTitle(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("highlightedTitle"))
				button.setHighlightedTitle(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("disabledTitle"))
				button.setDisabledTitle(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("selectedTitle"))
				button.setSelectedTitle(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("normalFont")
					|| key.equalsIgnoreCase("font"))
				button.setNormalFont(AttributeParser
						.parseFont((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("highlightedFont"))
				button.setHighlightedFont(AttributeParser
						.parseFont((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("disabledFont"))
				button.setDisabledFont(AttributeParser
						.parseFont((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("selectedFont"))
				button.setSelectedFont(AttributeParser
						.parseFont((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("contentEdgeInsets"))
				button.setContentEdgeInsets(ETCParser
						.parseInset((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("titleEdgeInsets"))
				button.setTitleEdgeInsets(ETCParser
						.parseInset((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("imageEdgeInsets"))
				button.setImageEdgeInsets(ETCParser
						.parseInset((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("actions"))
				button.setEvent(parseEvent(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
			else if (key.equalsIgnoreCase("on")){
				button.setOn(String.valueOf((((NSNumber) dic.objectForKey(key))
						.boolValue())));
				button.setCheckboxState(dic.objectForKey(key).toString());
			}/*else if (key.equalsIgnoreCase("selected"))
				button.setOn(dic.objectForKey(key).toString());*/
			else if (key.equalsIgnoreCase("backgroundColor")) {
				button.setBackgroundColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
			} else if (key.equalsIgnoreCase("borderColor")) {
				button.setBorderColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
			} else if (key.equalsIgnoreCase("borderWeight")) {
				button.setBorderWidth(dic.objectForKey(key).toString());
			} else if (key.equalsIgnoreCase("tabOrder")) {
				button.setTabOrder(((NSNumber) dic.objectForKey(key))
						.intValue());
			} else if (key.equalsIgnoreCase("verticalAlignment")) {
				button.setVerticalAlignment(dic.objectForKey(key).toString());
			} else if (key.equalsIgnoreCase("radioItems")) {
				parseRadioButtonValues(dic, button, key);
			} else if (key.equalsIgnoreCase("SelectedIndex")) {
				button.setSelectedIndex(((NSNumber) dic.objectForKey(key))
						.intValue());
			}else if (key.equalsIgnoreCase("groupStyle")) {
				button.setGroupStyle(dic.objectForKey(key).toString());
			}else if (key.equalsIgnoreCase("groupName")) {
				button.setGroupName(dic.objectForKey(key).toString());
			}else if (key.equalsIgnoreCase("padding")){
				button.setPadding(AttributeParser.parsePadding((NSDictionary) dic.objectForKey(key)));
			}else if (key.equalsIgnoreCase("cornerRadius")){
				button.setCornerRadius(((NSNumber) dic.objectForKey(key)).intValue());
			}
		}
		return (Button) parseControlView(dic, genApp, button);
	}

	private static void parseRadioButtonValues(NSDictionary dic, Button button,
			String key) {
		NSObject[] object = ((NSArray) dic.objectForKey(key)).getArray();
		Map<String, String> radioButtonValues = new HashMap<String, String>();
		for (NSObject radioButtonValue : object) {
			NSDictionary dictionary = (NSDictionary) radioButtonValue;
			if(dictionary.objectForKey("fieldvalue") != null && dictionary.objectForKey("text") != null)
			radioButtonValues.put(dictionary.objectForKey("fieldvalue")
					.toString(), dictionary.objectForKey("text").toString());

		}
		button.setRadioButtonDataArray(radioButtonValues);
	}

	public static TextField parseTextField(NSDictionary dic, GenApp genApp,
			DefFile defFile) throws Exception {
		TextField textField = new TextField();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("viewType"))
				continue;
			else if (key.equalsIgnoreCase("text"))
				textField.setText(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("font"))
				textField.setFont(AttributeParser.parseFont((NSDictionary) dic
						.objectForKey(key)));
			else if (key.equalsIgnoreCase("placeHolder"))
				textField.setPlaceHolder(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("minimumFontSize"))
				textField.setMinimumFontSize(((NSNumber) dic.objectForKey(key))
						.intValue());
			else if (key.equalsIgnoreCase("editable"))
				textField.setEditable(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("adjustsFontSizeToFitWidth"))
				textField.setAdjustsFontSizeToFitWidth(((NSNumber) dic
						.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("clearsOnBeginEditing"))
				textField.setClearsOnBeginEditing(((NSNumber) dic
						.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("borderStyle"))
				textField.setBorderStyle(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("borderWeight"))
				textField.setBorderWidth(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("background"))
				textField.setBackground(AttributeParser
						.parseImageFile((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("disabledBackground"))
				textField.setDisabledBackground(AttributeParser
						.parseImageFile((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("clearButtonMode"))
				textField.setClearButtonMode(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("leftView"))
				textField.setLeftView(AttributeParser
						.parseImageFile((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("leftViewMode"))
				textField.setLeftViewMode(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("rightView"))
				textField.setRightView(AttributeParser
						.parseImageFile((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("rightViewMode"))
				textField.setRightViewMode(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("inputView"))
				textField.setInputView(AttributeParser
						.parseImageFile((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("inputAccessoryView"))
				textField.setInputAccessoryView(AttributeParser
						.parseImageFile((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("autocapitalizationType"))
				textField.setAutocapitalizationType(dic.objectForKey(key)
						.toString());
			else if (key.equalsIgnoreCase("autocorrectionType"))
				textField.setAutocorrectionType(dic.objectForKey(key)
						.toString());
			else if (key.equalsIgnoreCase("keyboardAppearance"))
				textField.setKeyboardAppearance(dic.objectForKey(key)
						.toString());
			else if (key.equalsIgnoreCase("keyboardType"))
				textField.setKeyboardType(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("returnKeyType"))
				textField.setReturnKeyType(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("enablesReturnKeyAutomatically"))
				textField.setEnablesReturnKeyAutomatically(((NSNumber) dic
						.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("secure"))
				textField.setSecure(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("voiceRecognizable"))
				textField.setVoiceRecognizable(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("recognitionType"))
				textField.setAutocapitalizationType(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("numeric"))
				textField.setNumeric(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("backgroundColor"))
				textField.setBackgroundColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("borderColor"))
				textField.setBorderColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("padding"))
				textField.setPadding(AttributeParser
						.parsePadding((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("tabOrder"))
				textField.setTabOrder(((NSNumber) dic.objectForKey(key))
						.intValue());
			else if (key.equalsIgnoreCase("inputFormat")) {
				if (genApp.getReleaseVersion().equalsIgnoreCase("")) {
					textField.setFormatType(dic.objectForKey(key).toString());
				} else if (!genApp.getReleaseVersion().equalsIgnoreCase("")) {
					textField.setInputFormatType(dic.objectForKey(key)
							.toString());
				}

			} else if (key.equalsIgnoreCase("displayFormat"))
					//&& !genApp.getReleaseVersion().equalsIgnoreCase(""))
				textField.setFormatType(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("numberDataType")
					|| key.equalsIgnoreCase("DateFormat"))
				textField.setFormatSubtype(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("numberFormat") || key.equalsIgnoreCase("dateDataType"))
				textField.setSpecifierType(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("numDisplayFormat") || key.equalsIgnoreCase("customDateFormat"))
				textField.setFormatSpecifier(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("actions"))
				textField.setEvent(parseEvent(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
			else if(key.equalsIgnoreCase("autocapitalizationType")){
				textField.setAutocapitalizationType(dic.objectForKey(key).toString());
			}else if(key.equalsIgnoreCase("trim")){
				textField.setTrim(((NSNumber) dic.objectForKey(key))
						.boolValue());
			}else if(key.equalsIgnoreCase("maxRange")){
				textField.setMaxRange((dic.objectForKey(key).toString()));
			}else if(key.equalsIgnoreCase("minRange")){
				textField.setMinRange((dic.objectForKey(key).toString()));
			}else if (key.equalsIgnoreCase("cornerRadius")){
				textField.setCornerRadius(((NSNumber) dic.objectForKey(key)).intValue());
			}else if (key.equalsIgnoreCase("charLimit")) {
				textField.setCharLimit(((NSNumber) dic.objectForKey(key)).intValue());
			}
		}
		return (TextField) parseControlView(dic, genApp, textField);
	}

	public static Label parseLabel(NSDictionary dic, GenApp genApp)
			throws Exception {
		Label label = new Label();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("viewType"))
				label.setType(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("text"))
				label.setText(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("link"))
				label.setLink(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("option"))
				label.setOptionIndex(((NSNumber) dic.objectForKey(key))
						.intValue());
			else if (key.equalsIgnoreCase("textAlignment"))
				label.setTextAlignment(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("lineBreakMode"))
				label.setLineBreakMode(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("baseLineAdjustment"))
				label.setBaseLineAdjustment(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("adjustsFontSizeToFitWidth"))
				label.setAdjustsFontSizeToFitWidth(((NSNumber) dic
						.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("highlighted"))
				label.setHighlighted(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("numberOfLines"))
				label.setNumberOfLines(((NSNumber) dic.objectForKey(key))
						.intValue());
			else if (key.equalsIgnoreCase("minimumFontSize"))
				label.setMinimumFontSize(((NSNumber) dic.objectForKey(key))
						.intValue());
			else if (key.equalsIgnoreCase("font"))
				label.setFont(AttributeParser.parseFont((NSDictionary) dic
						.objectForKey(key)));
			else if (key.equalsIgnoreCase("highlightedTextColor"))
				label.setHighlightedTextColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("shadowColor"))
				label.setShadowColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("shadowOffset"))
				label.setShadowOffset(ETCParser.parseSize((NSDictionary) dic
						.objectForKey(key)));
			else if (key.equalsIgnoreCase("borderStyle"))
				label.setBorderStyle(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("borderWeight"))
				label.setBorderWidth(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("borderColor"))
				label.setBorderColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("padding"))
				label.setPadding(AttributeParser
						.parsePadding((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("backgroundColor")) {
				label.setBackgroundColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
			} else if (key.equalsIgnoreCase("tabOrder")) {
				label.setTabOrder(((NSNumber) dic.objectForKey(key)).intValue());
			} else if (key.equalsIgnoreCase("displayFormat"))//Bug #8580 fix
					//&& !genApp.getReleaseVersion().equalsIgnoreCase(""))
				label.setFormatType(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("inputFormat"))
					//&& genApp.getReleaseVersion().equalsIgnoreCase(""))
				label.setFormatType(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("numberDataType") || key.equalsIgnoreCase("dateDataType"))
				label.setFormatSubtype(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("dateFormat"))
				label.setFormatSubtype(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("numberFormat"))
				label.setSpecifierType(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("numDisplayFormat") || key.equalsIgnoreCase("customDateFormat"))
				label.setFormatSpecifier(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("trim"))
				label.setTrim(((NSNumber)dic.objectForKey(key)).boolValue());
		}
		return (Label) parseBaseView(dic, genApp, label);
	}

	public static Image parseImage(NSDictionary dic, GenApp genApp)
			throws Exception {
		Image image = new Image();

		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("viewType"))
				continue;
			else if (key.equalsIgnoreCase("image"))
				image.setImage(AttributeParser
						.parseImageFile((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("highlightedImage"))
				image.setHighlightedImage(AttributeParser
						.parseImageFile((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("animationImages"))
				image.setAnimationImages(AttributeParser
						.parseImageFiles(((NSArray) dic.objectForKey(key))
								.getArray()));
			else if (key.equalsIgnoreCase("highlightedAnimationImages"))
				image.setHighlightedAnimationImages(AttributeParser
						.parseImageFiles(((NSArray) dic.objectForKey(key))
								.getArray()));
			else if (key.equalsIgnoreCase("animationDuration"))
				image.setAnimationDuration(((NSNumber) dic.objectForKey(key))
						.intValue());
			else if (key.equalsIgnoreCase("animationRepeatCount"))
				image.setAnimationRepeatCount(((NSNumber) dic.objectForKey(key))
						.intValue());
			else if (key.equalsIgnoreCase("userInteractionEnabled"))
				image.setUserInteractionEnabled(((NSNumber) dic
						.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("highlighted"))
				image.setHighlighted(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("startAnimating"))
				image.setStartAnimating(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("stopAnimating"))
				image.setStopAnimating(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("isAnimating"))
				image.setAnimating(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("tabOrder")) {
				image.setTabOrder(((NSNumber) dic.objectForKey(key)).intValue());
			} else if (key.equalsIgnoreCase("borderStyle")) {
				image.setBorderStyle(dic.objectForKey(key).toString());
			} else if (key.equalsIgnoreCase("borderWeight")) {
				image.setBorderWidth(dic.objectForKey(key).toString());
			} else if (key.equalsIgnoreCase("borderColor")) {
				image.setBorderColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
			}else if (key.equalsIgnoreCase("encstring")) {
				image.setQRstring(dic.objectForKey(key).toString());
			}else if (key.equalsIgnoreCase("captchakey")) {
				image.setCaptchaKeyString(dic.objectForKey(key).toString());
			}else if (key.equalsIgnoreCase("scaleMode")) {
				image.setScalemode(dic.objectForKey(key).toString());
			}
		}

		return (Image) parseBaseView(dic, genApp, image);
	}

	public static TextView parseTextView(NSDictionary dic, GenApp genApp,
			DefFile defFile) throws Exception {
		TextView textView = new TextView();

		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("viewType"))
				continue;
			else if (key.equalsIgnoreCase("flexibleHeight"))
				textView.setFlexibleHeight(((NSNumber)dic.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("underline"))
				textView.setUnderline(((NSNumber)dic.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("strikeout"))
				textView.setStrikeout(((NSNumber)dic.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("text"))
				textView.setText(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("font"))
				textView.setFont(AttributeParser.parseFont((NSDictionary) dic
						.objectForKey(key)));
			else if (key.equalsIgnoreCase("editable"))
				textView.setEditable(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("DataDetectorTypes"))
				textView.setDataDetectorTypes(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("textAlignment"))
				textView.setTextAlignment(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("RefFileHidden"))
				textView.setRefFileHidden(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("refFileURL"))
				textView.setRefFileURL(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("borderStyle"))
				textView.setBorderStyle(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("borderWeight"))
				textView.setBorderWidth(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("inputView"))
				textView.setInputView(AttributeParser
						.parseImageFile((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("inputAccessoryView"))
				textView.setInputAccessoryView(AttributeParser
						.parseImageFile((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("borderColor"))
				textView.setBorderColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("padding"))
				textView.setPadding(AttributeParser
						.parsePadding((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("tabOrder"))
				textView.setTabOrder(((NSNumber) dic.objectForKey(key))
						.intValue());
			else if (key.equalsIgnoreCase("actions"))
				textView.setEvent(parseEvent(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
			else if (key.equalsIgnoreCase("autocapitalizationType"))
				textView.setAutocapitalizationType(dic.objectForKey(key)
						.toString());
			else if (key.equalsIgnoreCase("trim"))
				textView.setTrim(((NSNumber)dic.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("voiceRecognizable"))
				textView.setVoiceRecognizable(((NSNumber)dic.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("continueVR"))
				textView.setContinueVR(((NSNumber)dic.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("recognitionType"))
				textView.setAutocapitalizationType(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("cornerRadius"))
				textView.setCornerRadius(((NSNumber) dic.objectForKey(key)).intValue());
			else if (key.equalsIgnoreCase("keyboardType"))
				textView.setKeyboardType(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("scrollPosition"))
				textView.setScrollPosition(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("charLimit"))
				textView.setCharLimit(((NSNumber) dic.objectForKey(key)).intValue());
		}

		return (TextView) parseScrollView(dic, genApp, textView, defFile);
	}

	public static Switch parseSwitch(NSDictionary dic, GenApp genApp,
			DefFile defFile) throws Exception {
		Switch switchUI = new Switch();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("viewType"))
				continue;
			else if (key.equalsIgnoreCase("on"))
				switchUI.setOn(((NSNumber) dic.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("valueField"))
				switchUI.setFieldname(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("actions"))
				switchUI.setEvent(parseEvent(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
			else if (key.equalsIgnoreCase("tabOrder"))
				switchUI.setTabOrder(((NSNumber) dic.objectForKey(key))
						.intValue());
			else if (key.equalsIgnoreCase("borderStyle"))
				switchUI.setBorderStyle(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("borderWeight"))
				switchUI.setBorderWidth(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("borderColor"))
				switchUI.setBorderColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
			

		}
		return (Switch) parseControlView(dic, genApp, switchUI);
	}

	public static Picker parsePicker(NSDictionary dic, GenApp genApp,
			DefFile defFile) throws Exception {
		Picker picker = new Picker();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("viewType"))
				continue;
			else if (key.equalsIgnoreCase("showsSelectionIndicator"))
				picker.setShowsSelectionIndicator(((NSNumber) dic
						.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("dataarray"))
				picker.setDataArray(ETCParser.parseDataArray(((NSArray) dic
						.objectForKey(key)).getArray()));
			else if (key.equalsIgnoreCase("actions"))
				picker.setEvent(parseEvent(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
			else if (key.equalsIgnoreCase("taborder")) {
				picker.setTabOrder(((NSNumber) dic.objectForKey(key))
						.intValue());
			}

		}
		return (Picker) parseBaseView(dic, genApp, picker);
	}

	public static DatePicker parseDatePicker(NSDictionary dic, GenApp genApp,
			DefFile defFile) throws Exception {
		DatePicker datePicker = new DatePicker();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("viewType"))
				continue;
			else if (key.equalsIgnoreCase("mode"))
				datePicker.setMode(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("currentDate"))
				datePicker.setCurrentDate(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("actions"))
				datePicker.setEvent(parseEvent(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
			else if (key.equalsIgnoreCase("timeFormat"))
				datePicker.setTimeFormat(dic.objectForKey(key).toString());

		}
		return (DatePicker) parseBaseView(dic, genApp, datePicker);
	}

	public static Slider parseSlider(NSDictionary dic, GenApp genApp,
			DefFile defFile) throws Exception {
		Slider slider = new Slider();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("viewType"))
				continue;
			else if (key.equalsIgnoreCase("currentValue"))
				slider.setCurrentValue(((NSNumber) dic.objectForKey(key))
						.doubleValue());
			else if (key.equalsIgnoreCase("backgroundColor"))
				slider.setBackgroundColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
			/*
			 * else if (key.equalsIgnoreCase("thumbColor")) {
			 * slider.setThumbColor(AttributeParser .parseColor((NSDictionary)
			 * (((NSArray) dic .objectForKey(key)).getArray())[0]));
			 * slider.setThumbColorGradient(AttributeParser
			 * .parseColor((NSDictionary) (((NSArray) dic
			 * .objectForKey(key)).getArray())[1])); } else if
			 * (key.equalsIgnoreCase("trackColor")) {
			 * slider.setTrackColor(AttributeParser .parseColor((NSDictionary)
			 * (((NSArray) dic .objectForKey(key)).getArray())[0]));
			 * slider.setTrackColorGradient(AttributeParser
			 * .parseColor((NSDictionary) (((NSArray) dic
			 * .objectForKey(key)).getArray())[1])); }
			 */

			else if (key.equalsIgnoreCase("thumbGradientColor1"))
				slider.setThumbGradientColor1(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));

			else if (key.equalsIgnoreCase("trackGradientColor1"))
				slider.setTrackGradientColor1(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("trackGradientColor2"))
				slider.setTrackGradientColor2(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));

			else if (key.equalsIgnoreCase("minimumValue"))
				slider.setMinimumValue(((NSNumber) dic.objectForKey(key))
						.doubleValue());
			else if (key.equalsIgnoreCase("maximumValue"))
				slider.setMaximumValue(((NSNumber) dic.objectForKey(key))
						.doubleValue());
			else if (key.equalsIgnoreCase("stateArray"))
				slider.setStateArray(ETCParser.parseStateArray(((NSArray) dic
						.objectForKey(key)).getArray()));
			else if (key.equalsIgnoreCase("actions"))
				slider.setEvent(parseEvent(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
			else if (key.equalsIgnoreCase("taborder"))
				slider.setTabOrder(((NSNumber) dic.objectForKey(key))
						.intValue());

		}

		return (Slider) parseControlView(dic, genApp, slider);
	}

	public static ProgressBar parseProgressBar(NSDictionary dic, GenApp genApp)
			throws Exception {
		ProgressBar progressBar = new ProgressBar();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("viewType"))
				continue;
			else if (key.equalsIgnoreCase("style"))
				progressBar.setStyle(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("progress"))
				progressBar.setProgress(((NSNumber) dic.objectForKey(key)).doubleValue());
			else if (key.equalsIgnoreCase("hidden"))
				progressBar.setHidden(((NSNumber) dic.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("backgroundColor"))
				progressBar.setBackgroundColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("fillColor"))
				progressBar.setFillColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("arcRadius"))
				progressBar.setRadius(((NSNumber) dic.objectForKey(key)).intValue());
			else if (key.equalsIgnoreCase("cornerRadius"))
				progressBar.setCornerRadius(((NSNumber) dic.objectForKey(key)).intValue());
			else if (key.equalsIgnoreCase("borderColor"))
				progressBar.setBorderColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("borderWeight"))
				progressBar.setBorderWeight(((NSNumber) dic.objectForKey(key)).intValue());
		}
		return (ProgressBar) parseBaseView(dic, genApp, progressBar);
	}

	public static Segment parseSegment(NSDictionary dic, GenApp genApp,
			DefFile defFile) throws Exception {
		Segment segment = new Segment();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("viewType"))
				continue;
			else if (key.equalsIgnoreCase("segmentedControlStyle"))
				segment.setSegmentedControlStyle(dic.objectForKey(key)
						.toString());
			else if (key.equalsIgnoreCase("selectedSegmentIndex"))
				segment.setSelectedSegmentIndex(((NSNumber) dic
						.objectForKey(key)).intValue());

			else if (key.equalsIgnoreCase("segmentItems"))
				segment.setSegmentItems(parseSegmentItems(
						((NSArray) dic.objectForKey(key)).getArray(), genApp,
						defFile));
			else if (key.equalsIgnoreCase("tintColor"))
				segment.setTintColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("taborder")) {
				segment.setTabOrder(((NSNumber) dic.objectForKey(key))
						.intValue());
			} else if (key.equalsIgnoreCase("segmentInitialValue")) {
				segment.setSegmentInitialValue(dic.objectForKey(key).toString());
			}else if (key.equalsIgnoreCase("borderColor"))
				segment.setBorderColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
		}
		return (Segment) parseControlView(dic, genApp, segment);
	}

	public static ToolBar parseToolBar(NSDictionary dic, GenApp genApp,
			DefFile defFile) throws Exception {
		ToolBar toolBar = new ToolBar();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("viewType"))
				continue;
			else if (key.equalsIgnoreCase("barStyle"))
				toolBar.setBarStyle(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("tintColor"))
				toolBar.setTintColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("translucent"))
				toolBar.setTranslucent(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("ToolbarItems"))
				toolBar.setToolBarItems(parseToolBarItemsArray(
						((NSArray) dic.objectForKey(key)).getArray(), genApp,
						defFile));
		}
		return (ToolBar) parseBaseView(dic, genApp, toolBar);
	}

	// TODO: what is a marker Def?
	public static GoogleMap parseGoogleMap(NSDictionary dic, GenApp genApp,
			DefFile defFile) throws Exception {
		GoogleMap googleMap = new GoogleMap();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("viewType"))
				continue;
			else if (key.equalsIgnoreCase("initialPosition"))
				googleMap.setInitialPosition(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("MarkerDef"))
				googleMap.setMarkerDef(ETCParser.parseMarkerList(
						((NSArray) dic.objectForKey(key)).getArray(), genApp,
						null, defFile));
			else if (key.equalsIgnoreCase("zoom"))
				googleMap
						.setZoom(((NSNumber) dic.objectForKey(key)).intValue());
			else if (key.equalsIgnoreCase("gps"))
				googleMap
						.setGps(((NSNumber) dic.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("actions"))
				googleMap.setEvent(parseEvent(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
		}
		return (GoogleMap) parseBaseView(dic, genApp, googleMap);
	}

	public static VideoBox parseVideoBox(NSDictionary dic, GenApp genApp,
			DefFile defFile) throws Exception {
		VideoBox videoBox = new VideoBox();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("viewType"))
				continue;
			else if (key.equalsIgnoreCase("filename"))
				videoBox.setVideoFile(AttributeParser
						.parseVideoFile((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("startPlay"))
				videoBox.setStartPlay(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("pausePlay"))
				videoBox.setPausePlay(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("stopPlay"))
				videoBox.setStopPlay(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("startRecord"))
				videoBox.setStartRecord(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("pauseRecord"))
				videoBox.setPauseRecord(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("stopRecord"))
				videoBox.setStopRecord(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("actions"))
				videoBox.setEvent(parseEvent(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
			else if (key.equalsIgnoreCase("taborder"))
				videoBox.setTabOrder(((NSNumber) dic.objectForKey(key))
						.intValue());
			else if (key.equalsIgnoreCase("video"))
				videoBox.setVideoFile(AttributeParser
						.parseVideoFile((NSDictionary) dic.objectForKey(key)));

		}
		return (VideoBox) parseBaseView(dic, genApp, videoBox);
	}

	public static SoundBox parseSoundBox(NSDictionary dic, GenApp genApp,
			DefFile defFile) throws Exception {
		SoundBox soundBox = new SoundBox();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("viewType"))
				continue;
			else if (key.equalsIgnoreCase("filename"))
				soundBox.setSoundFile(AttributeParser
						.parseSoundFile((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("autoplay"))
				soundBox.setStartPlay(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("pausePlay"))
				soundBox.setPausePlay(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("stopPlay"))
				soundBox.setStopPlay(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("startRecord"))
				soundBox.setStartRecord(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("pauseRecord"))
				soundBox.setPauseRecord(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("stopRecord"))
				soundBox.setStopRecord(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("actions"))
				soundBox.setEvent(parseEvent(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
			else if (key.equalsIgnoreCase("styleDark"))
				soundBox.setStyleDark(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("taborder"))
				soundBox.setTabOrder(((NSNumber) dic.objectForKey(key))
						.intValue());
			else if (key.equalsIgnoreCase("recording"))
				soundBox.setRecorder(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("timeout"))
				soundBox.setTimeout(((NSNumber) dic.objectForKey(key))
						.intValue());
		}
		// TODO: just type something here and now put the data to the last
		// order. i hope he goes out soon then
		// i go like wheehaw and i want to see the new year in the loom
		// actually we can see that you can actully
		return (SoundBox) parseBaseView(dic, genApp, soundBox);
	}

	public static PageControl parsePageControl(NSDictionary dic, GenApp genApp,
			DefFile defFile) throws Exception {
		PageControl pageControl = new PageControl();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("viewType"))
				continue;
			else if (key.equalsIgnoreCase("numberOfPages"))
				pageControl.setNumberOfPages(((NSNumber) dic.objectForKey(key))
						.intValue());
			else if (key.equalsIgnoreCase("backgroundColor"))
				pageControl.setBackgroundColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("hidesForSinglePage"))
				pageControl.setHidesForSinglePage(((NSNumber) dic
						.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("defersCurrentPageDisplay"))
				pageControl.setDefersCurrentPageDisplay(((NSNumber) dic
						.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("actions"))
				pageControl.setEvent(parseEvent(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
		}

		return (PageControl) parseControlView(dic, genApp, pageControl);
	}

	public static SearchBar parseSearchBar(NSDictionary dic, GenApp genApp,
			DefFile defFile) throws Exception {
		SearchBar searchBar = new SearchBar();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("viewType"))
				continue;
			else if (key.equalsIgnoreCase("placeholder"))
				searchBar.setPlaceHolder(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("prompt"))
				searchBar.setPrompt(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("text"))
				searchBar.setText(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("barStyle"))
				searchBar.setBarStyle(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("font"))
				searchBar.setFont(AttributeParser.parseFont((NSDictionary) dic
						.objectForKey(key)));
			else if (key.equalsIgnoreCase("tintColor"))
				searchBar.setTintColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("borderStyle"))
				searchBar.setBorderStyle(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("borderWeight"))
				searchBar.setBorderWidth(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("borderColor"))
				searchBar.setBorderColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("backgroundColor")) {
				searchBar.setBackgroundColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
			} else if (key.equalsIgnoreCase("translucent"))
				searchBar.setTranslucent(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("autocapitalizationType"))
				searchBar.setAutocapitalizationType(dic.objectForKey(key)
						.toString());
			else if (key.equalsIgnoreCase("padding"))
				searchBar.setPadding(AttributeParser
						.parsePadding((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("autocorrectionType"))
				searchBar.setAutocorrectionType(dic.objectForKey(key)
						.toString());
			else if (key.equalsIgnoreCase("keyboardType"))
				searchBar.setKeyboardType(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("showsBookmarkButton"))
				searchBar.setShowsBookmarkButton(((NSNumber) dic
						.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("showsCancelButton"))
				searchBar.setShowsCancelButton(((NSNumber) dic
						.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("showsSearchResultsButton"))
				searchBar.setShowsSearchResultsButton(((NSNumber) dic
						.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("scopeButtonTitles"))
				searchBar.setScopeButtonTitles(ETCParser
						.parseStringArray(((NSArray) dic.objectForKey(key))
								.getArray()));
			else if (key.equalsIgnoreCase("selectedScopeButtonIndex"))
				searchBar.setSelectedScopeButtonIndex(((NSNumber) dic
						.objectForKey(key)).intValue());
			else if (key.equalsIgnoreCase("showsScopeBar"))
				searchBar.setShowsScopeBar(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("actions"))
				searchBar.setEvent(parseEvent(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
			else if (key.equalsIgnoreCase("taborder")) {
				searchBar.setTabOrder(((NSNumber) dic.objectForKey(key))
						.intValue());
			} else if (key.equalsIgnoreCase("verticalAlignment")) {
				searchBar
						.setVerticalAlignment(dic.objectForKey(key).toString());
			}
		}
		return (SearchBar) parseBaseView(dic, genApp, searchBar);
	}

	public static PDFViewer parsePDFViewer(NSDictionary dic, GenApp genApp)
			throws Exception {
		PDFViewer pdfViewer = new PDFViewer();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("viewType"))
				continue;
			else if (key.equalsIgnoreCase("filename"))
				pdfViewer.setFilename(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("url"))
				pdfViewer.setUrl(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("path"))
				pdfViewer.setPath(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("totalPages"))
				pdfViewer.setTotalPages(((NSNumber) dic.objectForKey(key))
						.intValue());
			else if (key.equalsIgnoreCase("currentPage"))
				pdfViewer.setCurrentPage(((NSNumber) dic.objectForKey(key))
						.intValue());
			else if (key.equalsIgnoreCase("page_width"))
				pdfViewer.setPage_width(((NSNumber) dic.objectForKey(key))
						.intValue());
			else if (key.equalsIgnoreCase("page_height"))
				pdfViewer.setPage_height(((NSNumber) dic.objectForKey(key))
						.intValue());
			else if (key.equalsIgnoreCase("allowCopying"))
				pdfViewer.setAllowCopying(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("allowPrinting"))
				pdfViewer.setAllowPrinting(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("isEncrypted"))
				pdfViewer.setEncrypted(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("isUnlocked"))
				pdfViewer.setUnlocked(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("isRightOpen"))
				pdfViewer.setRightOpen(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("isMagazine"))
				pdfViewer.setMagazine(((NSNumber) dic.objectForKey(key))
						.boolValue());
		}
		return (PDFViewer) parseBaseView(dic, genApp, pdfViewer);
	}

	public static Table parseTable(NSDictionary dic, GenApp genApp,
			DefFile defFile) throws Exception {
		Table table = new Table();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("viewType"))
				table.setViewType(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("tableName"))
				table.setTableName(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("serviceName"))
				table.setServiceName(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("where"))
				table.setWhere(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("tmpCellStyle"))
				table.setCellStyle(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("TableStyle"))
				table.setTableStyle(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("rowHeight"))
				table.setRowHeight(((NSNumber) dic.objectForKey(key))
						.intValue());
			else if (key.equalsIgnoreCase("separatorStyle"))
				table.setSeparatorStyle(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("selectionStyle"))
				table.setSelectionStyle(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("gridFields"))
				table.setGridArray(praseGridFields(((NSArray)dic.objectForKey(key)).getArray()));
			else if (key.equalsIgnoreCase("separatorColor"))
				table.setSeparatorColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("backgroundView"))
				table.setBackgroundView(AttributeParser
						.parseImageFile((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("tableHeaderView"))
				table.setTableHeaderView(AttributeParser
						.parseImageFile((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("tableFooterView"))
				table.setTableFooterView(AttributeParser
						.parseImageFile((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("sectionHeaderHeight"))
				table.setSectionHeaderHeight(((NSNumber) dic.objectForKey(key))
						.intValue());
			else if (key.equalsIgnoreCase("sectionFooterHeight"))
				table.setSectionFooterHeight(((NSNumber) dic.objectForKey(key))
						.intValue());
			else if (key.equalsIgnoreCase("sectionIndexMinimumDisplayRowCount"))
				table.setSectionIndexMinimumDisplayRowCount(((NSNumber) dic
						.objectForKey(key)).intValue());
			else if (key.equalsIgnoreCase("allowsSelection"))
				table.setAllowsSelection(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("allowsSelectionDuringEditing"))
				table.setAllowsSelectionDuringEditing(((NSNumber) dic
						.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("editing"))
				table.setEditing(((NSNumber) dic.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("isAccordian"))
				table.setAccordion(((NSNumber) dic.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("accHeaderHeight"))
				table.setAccHeaderHeight(((NSNumber) dic.objectForKey(key)).intValue());
			else if (key.equalsIgnoreCase("accHeaderBGColor"))
				table.setAccHeaderBGColor(AttributeParser.parseColor((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("accHeaderTextColor"))
				table.setAccHeaderTextColor(AttributeParser.parseColor((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("accHeaderIconPosition"))
				table.setAccHeaderIconPosition(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("accHeaderIconClose"))
				table.setAccHeaderIconClose(AttributeParser.parseImageFile((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("accHeaderIconOpen"))
				table.setAccHeaderIconOpen(AttributeParser.parseImageFile((NSDictionary) dic.objectForKey(key)));
			
			/* else if (key.equalsIgnoreCase("backgroundColor")) {
			 * table.setBackgroundColor(AttributeParser
			 * .parseColor((NSDictionary) dic.objectForKey(key))); }
			 */else if (key.equalsIgnoreCase("Group"))
				table.setGroup(ETCParser.parseGroup(
						((NSArray) dic.objectForKey(key)).getArray(), genApp,
						defFile));
			else if (key.equalsIgnoreCase("actions"))
				table.setEvent(parseEvent((NSDictionary) dic.objectForKey(key),
						genApp, defFile));
		}

		// this flag will let mobileweb to know if it has to perform init
		// command to get AK key from server.
		if (table.getViewType().startsWith("RemoteTableView"))
			genApp.setCommserverAccess(true);

		return (Table) parseScrollView(dic, genApp, table, defFile);
	}

	private static ArrayList<Grid> praseGridFields(NSObject[] gridArray) {
		ArrayList<Grid> gridList = new ArrayList<Grid>();
		for (NSObject o : gridArray) {
			NSDictionary dic = (NSDictionary) o;
			Grid grid = new Grid();
			for(String key : dic.allKeys()){
				if(key.equalsIgnoreCase("sortable")){
				 	grid.setSortable(((NSNumber)dic.objectForKey(key)).boolValue());
				}else if(key.equalsIgnoreCase("width")){
				 	grid.setWidth(dic.objectForKey(key).toString());
				}else if(key.equalsIgnoreCase("uiType")){
				 	grid.setUiType(dic.objectForKey(key).toString());
				}else if(key.equalsIgnoreCase("row")){
				 	grid.setRow(((NSNumber)dic.objectForKey(key)).intValue());
				}else if(key.equalsIgnoreCase("column")){
				 	grid.setColumn(((NSNumber)dic.objectForKey(key)).intValue());
				}else if(key.equalsIgnoreCase("freeze")){
				 	grid.setFreeze(((NSNumber)dic.objectForKey(key)).boolValue());
				}
				
			}
			gridList.add(grid);
		}
		return gridList;
	}

	public static Email parseEmail(NSDictionary dic) throws Exception {
		Email email = new Email();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("viewType"))
				continue;
			else if (key.equalsIgnoreCase("body"))
				email.setMessageBody(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("subject"))
				email.setSubject(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("toRecipients"))
				email.setToRecipients(ETCParser.parseStringArray(((NSArray) dic
						.objectForKey(key)).getArray()));
			else if (key.equalsIgnoreCase("ccRecipients"))
				email.setCcRecipients(ETCParser.parseStringArray(((NSArray) dic
						.objectForKey(key)).getArray()));
			else if (key.equalsIgnoreCase("bccRecipients"))
				email.setBccRecipients(ETCParser
						.parseStringArray(((NSArray) dic.objectForKey(key))
								.getArray()));
		}
		return email;
	}

	private static CalendarEvent parseCalendarEvent(NSDictionary dic,
			GenApp genApp, DefFile defFile) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	private static Canvas parseCanvas(NSDictionary dic, GenApp genApp,
			DefFile defFile) throws Exception {
		Canvas canvas = new Canvas();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("viewType"))
				continue;
			else if (key.equalsIgnoreCase("name"))
				canvas.setCanvasName(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("drawChildren"))
				canvas.setDrawChildren(ETCParser
						.parseStringArray(((NSArray) dic.objectForKey(key))
								.getArray()));
			else if (key.equalsIgnoreCase("actions"))
				canvas.setEvent(parseEvent(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
		}
		return (Canvas) parseBaseView(dic, genApp, canvas);
	}

	private static WebView parseWebView(NSDictionary dic, GenApp genApp,
			DefFile defFile) throws Exception {
		WebView webview = new WebView();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("viewType"))
				continue;
			else if (key.equalsIgnoreCase("name"))
				webview.setName(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("filename"))
				webview.setFilename(AttributeParser
						.parseHTMLFile((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("scalesPageToFit"))
				webview.setScalesPageToFit(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("actions"))
				webview.setEvent(parseEvent(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
			else if (key.equalsIgnoreCase("taborder"))
				webview.setTabOrder(((NSNumber) dic.objectForKey(key))
						.intValue());
			else if (key.equalsIgnoreCase("borderStyle"))
				webview.setBorderStyle(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("borderWeight"))
				webview.setBorderWidth(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("borderColor"))
				webview.setBorderColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));

		}
		return (WebView) parseBaseView(dic, genApp, webview);
	}

	private static Indicator parseIndicator(NSDictionary dic, GenApp genApp,
			DefFile defFile) throws Exception {
		Indicator indicator = new Indicator();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("viewType"))
				continue;
			else if (key.equalsIgnoreCase("style"))
				indicator.setStyle(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("StartIndicator"))
				indicator.setStartSpinning(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("StarthidesWhenStopped"))
				indicator
						.setHidesWhenStopped(((NSNumber) dic.objectForKey(key))
								.boolValue());
			else if (key.equalsIgnoreCase("actions"))
				indicator.setEvent(parseEvent(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
			else if (key.equalsIgnoreCase("taborder")) {
				indicator.setTabOrder(((NSNumber) dic.objectForKey(key))
						.intValue());
			}
		}
		return (Indicator) parseBaseView(dic, genApp, indicator);
	}

	// private static SystemButton parseSystemButton(NSDictionary dic, GenApp
	// genApp, DefFile defFile) throws Exception{
	// SystemButton systemButton = new SystemButton();
	// for(String key: dic.allKeys()){
	// if(key.equalsIgnoreCase("viewType"))
	// continue;
	// else if(key.equalsIgnoreCase("name"))
	// systemButton.setName(dic.objectForKey(key).toString());
	// else if(key.equalsIgnoreCase("buttonType"))
	// systemButton.setButtonType(dic.objectForKey(key).toString());
	// else if(key.equalsIgnoreCase("actions"))
	// systemButton.setEvent(parseEvent((NSDictionary)dic.objectForKey(key),
	// genApp, defFile));
	// }
	// return (SystemButton) parseBaseView(dic, genApp, systemButton);
	// }
	public static PageOverlay parsePageOverlay(NSDictionary dic,
			GenApp genApp, DefFile defFile) throws Exception {
		PageOverlay pageOverlay = new PageOverlay();
		
		for (String key : dic.allKeys()) {
//			System.out.println(key);
			if (key.equalsIgnoreCase("viewType"))
				continue;
			else if (key.equalsIgnoreCase("name"))
				pageOverlay.setName(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("hidden"))
				pageOverlay.setHidden(((NSNumber) dic.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("dataarray"))
				pageOverlay.setDataarray(ETCParser.parsePageOverlayItems((((NSArray) dic.objectForKey(key)).getArray()), genApp, defFile));
			else if (key.equalsIgnoreCase("padding"))
				pageOverlay.setPadding(AttributeParser.parsePadding((NSDictionary) dic.objectForKey(key)));		
			else if (key.equalsIgnoreCase("backgroundColor")) 
				pageOverlay.setBackgroundColor(AttributeParser.parseColor((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("borderColor")) 
				pageOverlay.setBorderColor(AttributeParser.parseColor((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("actionButtonsColor")) 
				pageOverlay.setActionButtonsColor(AttributeParser.parseColor((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("actionButtonsTintColor")) 
				pageOverlay.setActionButtonsTintColor(AttributeParser.parseColor((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("borderWeight"))
				pageOverlay.setBorderWidth(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("cornerRadius"))
				pageOverlay.setCornerRadius(((NSNumber) dic.objectForKey(key)).intValue());
			else if (key.equalsIgnoreCase("headerfont"))
				pageOverlay.setHeaderfont(AttributeParser.parseFont((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("heading"))
				pageOverlay.setHeading(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("showclose"))
				pageOverlay.setShowclose(((NSNumber) dic.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("showfooter"))
				pageOverlay.setShowfooter(((NSNumber) dic.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("showheader"))
				pageOverlay.setShowheader(((NSNumber) dic.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("closeIcon"))
				pageOverlay.setCloseIcon(AttributeParser.parseImageFile((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("actionButtons")) {
				NSObject[] actionButtons = ((NSArray) dic.objectForKey(key)).getArray();
				pageOverlay.setActionButtons(ETCParser.parseActionSheetButtons(actionButtons,genApp,defFile));
			}
			else if (key.equalsIgnoreCase("headerheight"))
				pageOverlay.setHeaderheight(((NSNumber) dic.objectForKey(key)).intValue());
			else if (key.equalsIgnoreCase("footerheight"))
				pageOverlay.setFooterheight(((NSNumber) dic.objectForKey(key)).intValue());
			else if (key.equalsIgnoreCase("actionbuttonwidth"))
				pageOverlay.setActionbuttonwidth(((NSNumber) dic.objectForKey(key)).intValue());
			else if (key.equalsIgnoreCase("actionbuttonheight"))
				pageOverlay.setActionbuttonheight(((NSNumber) dic.objectForKey(key)).intValue());
				
		}
		
		//private ArrayList<Button> actionButtons = null;

		pageOverlay.setUiid("ui-" + genApp.getUiCounter());

		return pageOverlay;
	}
	
	public static NavigationBar parseNavigationBar(NSDictionary dic,
			GenApp genApp, DefFile defFile) throws Exception {
		NavigationBar navigationBar = new NavigationBar();

		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("barStyle"))
				navigationBar.setBarStyle(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("tintColor"))
				navigationBar.setTintColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("translucent"))
				navigationBar.setTranslucent(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("barHidden"))
				navigationBar.setBarHidden(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("title"))
				navigationBar.setTitle(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("prompt"))
				navigationBar.setPrompt(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("titleView"))
				navigationBar.setTitleView(AttributeParser
						.parseImageFile((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("backBarButton"))
				navigationBar.setBackBarButton(parseToolBarItems(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
			else if (key.equalsIgnoreCase("leftBarButton"))
				navigationBar.setLeftBarButton(parseToolBarItems(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
			else if (key.equalsIgnoreCase("rightBarButton"))
				navigationBar.setRightBarButton(parseToolBarItems(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
			else if (key.equalsIgnoreCase("actions"))
				navigationBar.setEvent(parseEvent(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
		}

		navigationBar.setUiid("ui-" + genApp.getUiCounter());

		return navigationBar;
	}

	public static ToolBarTop parseToolBarTop(NSDictionary dic, GenApp genApp,
			DefFile defFile) throws Exception {
		ToolBarTop toolBarTop = new ToolBarTop();

		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("frame")) {
				toolBarTop.setFrame(AttributeParser
						.parsePoint((NSDictionary) dic.objectForKey(key)));
			} else if (key.equalsIgnoreCase("backgroundColor")) {
				toolBarTop.setBackgroundColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
			} else if (key.equalsIgnoreCase("Children")) {
				toolBarTop.setChildren(UIParser.parseChildren(
						((NSArray) dic.objectForKey(key)).getArray(), genApp,
						defFile));
			} else if (key.equalsIgnoreCase("hidden")) {
				toolBarTop.setToolBarTopHidden(((NSNumber) dic
						.objectForKey(key)).boolValue());
			}
		}

		return toolBarTop;
	}

	public static ToolBarBottom parseToolBarBottom(NSDictionary dic,
			GenApp genApp, DefFile defFile) throws Exception {
		ToolBarBottom toolBarBottom = new ToolBarBottom();

		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("frame")) {
				toolBarBottom.setFrame(AttributeParser
						.parsePoint((NSDictionary) dic.objectForKey(key)));
			} else if (key.equalsIgnoreCase("backgroundColor")) {
				toolBarBottom.setBackgroundColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
			} else if (key.equalsIgnoreCase("Children")) {
				toolBarBottom.setChildren(UIParser.parseChildren(
						((NSArray) dic.objectForKey(key)).getArray(), genApp,
						defFile));
			} else if (key.equalsIgnoreCase("hidden")) {
				toolBarBottom.setToolBarBottomHidden(((NSNumber) dic
						.objectForKey(key)).boolValue());
			}
		}

		return toolBarBottom;
	}
	
	public static ToolBarLeft parseToolBarLeft(NSDictionary dic,
			GenApp genApp, DefFile defFile) throws Exception {
		ToolBarLeft toolBarLeft = new ToolBarLeft();

		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("frame")) {
				toolBarLeft.setFrame(AttributeParser
						.parsePoint((NSDictionary) dic.objectForKey(key)));
			} else if (key.equalsIgnoreCase("backgroundColor")) {
				toolBarLeft.setBackgroundColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
			} else if (key.equalsIgnoreCase("Children")) {
				toolBarLeft.setChildren(UIParser.parseChildren(
						((NSArray) dic.objectForKey(key)).getArray(), genApp,
						defFile));
			} else if (key.equalsIgnoreCase("hidden")) {
				toolBarLeft.setToolBarLeftHidden(((NSNumber) dic
						.objectForKey(key)).boolValue());
			} else if (key.equalsIgnoreCase("view")) {
				toolBarLeft.setView(dic.objectForKey(key).toString());
			} else if (key.equalsIgnoreCase("tableData")) {
				toolBarLeft.setTableData(UIParser.parseChildren(
						((NSArray) dic.objectForKey(key)).getArray(), genApp, defFile));
			}else if (key.equalsIgnoreCase("fixed")) {
				toolBarLeft.setFixed(((NSNumber) dic
						.objectForKey(key)).boolValue());
			}
		}

		return toolBarLeft;
	}
	
	public static ToolBarRight parseToolBarRight(NSDictionary dic,
			GenApp genApp, DefFile defFile) throws Exception {
		ToolBarRight toolBarRight = new ToolBarRight();

		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("frame")) {
				toolBarRight.setFrame(AttributeParser
						.parsePoint((NSDictionary) dic.objectForKey(key)));
			} else if (key.equalsIgnoreCase("backgroundColor")) {
				toolBarRight.setBackgroundColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
			} else if (key.equalsIgnoreCase("Children")) {
				toolBarRight.setChildren(UIParser.parseChildren(
						((NSArray) dic.objectForKey(key)).getArray(), genApp,
						defFile));
			} else if (key.equalsIgnoreCase("hidden")) {
				toolBarRight.setToolBarRightHidden(((NSNumber) dic
						.objectForKey(key)).boolValue());
			} else if (key.equalsIgnoreCase("view")) {
				toolBarRight.setView(dic.objectForKey(key).toString());
			} else if (key.equalsIgnoreCase("tableData")) {
				toolBarRight.setTableData(UIParser.parseChildren(
						((NSArray) dic.objectForKey(key)).getArray(), genApp, defFile));
			}
		}

		return toolBarRight;
	}

	public static ToolBarItems parseToolBarItems(NSDictionary dic,
			GenApp genApp, DefFile defFile) throws Exception {
		ToolBarItems toolBarItems = null;
		try {
			String viewType = dic.objectForKey("type").toString();
			if (viewType.equalsIgnoreCase("SystemItem"))
				toolBarItems = parseSystemItem(dic, genApp, defFile);
			else if (viewType.equalsIgnoreCase("FlexItem"))
				toolBarItems = parseFlexItem(dic, genApp, defFile);
			else if (viewType.equalsIgnoreCase("ImageItem"))
				toolBarItems = parseImageItem(dic, genApp, defFile);
			else if (viewType.equalsIgnoreCase("TextItem"))
				toolBarItems = parseTextItem(dic, genApp, defFile);
			else if (viewType.equalsIgnoreCase("CustomView"))
				toolBarItems = parseCustomView(dic, genApp, defFile);
		} catch (Exception e) {
			// e.printStackTrace();
		}

		return toolBarItems;
	}

	public static SystemItem parseSystemItem(NSDictionary dic, GenApp genApp,
			DefFile defFile) throws Exception {
		SystemItem systemItem = new SystemItem();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("systemItem"))
				systemItem.setSystemItem(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("type"))
				continue;
			else if (key.equalsIgnoreCase("actions"))
				systemItem.setEvent(parseEvent(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
		}
		return systemItem;
	}

	public static FlexItem parseFlexItem(NSDictionary dic, GenApp genApp,
			DefFile defFile) throws Exception {
		FlexItem flexItem = new FlexItem();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("flex"))
				flexItem.setFlex(((NSNumber) dic.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("type"))
				continue;
			else if (key.equalsIgnoreCase("actions"))
				flexItem.setEvent(parseEvent(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
		}
		return flexItem;
	}

	public static ImageItem parseImageItem(NSDictionary dic, GenApp genApp,
			DefFile defFile) throws Exception {
		ImageItem imageItem = new ImageItem();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("imageDic"))// imagefile
				imageItem
						.setImageDic(AttributeParser
								.parseImageDicData((NSDictionary) dic
										.objectForKey(key)));
			else if (key.equalsIgnoreCase("type"))
				continue;
			else if (key.equalsIgnoreCase("actions"))
				imageItem.setEvent(parseEvent(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
		}
		return imageItem;
	}

	public static TextItem parseTextItem(NSDictionary dic, GenApp genApp,
			DefFile defFile) throws Exception {
		TextItem textItem = new TextItem();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("text"))
				textItem.setText(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("type"))
				continue;
			else if (key.equalsIgnoreCase("actions"))
				textItem.setEvent(parseEvent(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
			else if (key.equalsIgnoreCase("font"))
				textItem.setFont(AttributeParser.parseFont((NSDictionary) dic
						.objectForKey(key)));
			else if (key.equalsIgnoreCase("textColor"))
				textItem.setTextColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("onTapTextColor"))
				textItem.setOnTapTextColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("onTapTintColor"))
				textItem.setOnTapTintColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
		}
		return textItem;

	}

	public static CustomView parseCustomView(NSDictionary dic, GenApp genApp,
			DefFile defFile) throws Exception {
		CustomView customView = new CustomView();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("customViewStyle"))
				customView.setCustomViewStyle(parseSegment(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
			else if (key.equalsIgnoreCase("type"))
				continue;
		}
		return customView;
	}

	// TODO: Ask if SegmentItems is also ToolBarItems
	public static ArrayList<ToolBarItems> parseSegmentItems(NSObject[] obj,
			GenApp genApp, DefFile defFile) throws Exception {
		ArrayList<ToolBarItems> toolBarItemsList = new ArrayList<ToolBarItems>();
		for (NSObject o : obj) {
			NSDictionary dic = (NSDictionary) o;
			toolBarItemsList.add(parseToolBarItems(dic, genApp, defFile));
		}
		return toolBarItemsList;
	}

	public static ArrayList<ToolBarItems> parseToolBarItemsArray(
			NSObject[] obj, GenApp genApp, DefFile defFile) throws Exception {
		ArrayList<ToolBarItems> toolBarItemsList = new ArrayList<ToolBarItems>();
		for (NSObject o : obj) {
			NSDictionary dic = (NSDictionary) o;
			toolBarItemsList.add(parseToolBarItems(dic, genApp, defFile));
		}
		return toolBarItemsList;
	}

	public static Gadget parseGadget(NSDictionary dic, GenApp genApp,
			DefFile defFile) throws Exception {
		Gadget gadget = new Gadget();
		
		for (String key : dic.allKeys()) {
			
			//page child : GadgetUI's key not set --> Children
			//page child : GadgetUI's key not set --> Document
			//page child : GadgetUI's key not set --> gadgetname
			
			if (key.equalsIgnoreCase("viewType"))
				gadget.setViewType(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("name"))
				gadget.setGadgetName(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("taborder"))
				gadget.setTabOrder(((NSNumber) dic.objectForKey(key)).intValue());
			else if (key.equalsIgnoreCase("borderWeight"))
				gadget.setBorderWidth(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("borderColor"))
				gadget.setBorderColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("backgroundColor"))
				gadget.setBackgroundColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("backgroundImage"))
				gadget.setBackgroundImage(AttributeParser
						.parseImageFile((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("frame"))
				gadget.setFrame(AttributeParser.parsePoint((NSDictionary) dic
						.objectForKey(key)));
			
			else if (key.equalsIgnoreCase("gadgetEvents"))
				gadget.setGadgetEvents(parseGadgetEvents(
						((NSArray) dic.objectForKey(key)).getArray(), genApp, defFile));
			else if (key.equalsIgnoreCase("tapEvent"))
				gadget.setTapEvent(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("panEvent"))
				gadget.setPanEvent(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("pinchEvent"))
				gadget.setPinchEvent(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("rotateEvent"))
				gadget.setRotateEvent(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("longPressEvent"))
				gadget.setLongPressEvent(((NSNumber) dic.objectForKey(key))
						.boolValue());
			
		}
		
		String baseURL =  genApp.getBaseURL().replace("https", "http");
		String gadgetPlistURL = "";
		NSDictionary gadgetChildrenDict = null;
		
		// Temporary code
		if (GenApp.instanceURL.equalsIgnoreCase("LOCAL")) {
			// For Junit Test Case
			//GenApp.instanceURL = genApp.getBaseURL().replace("https", "http");
			gadgetPlistURL = "http://localhost:8080/mobileweb"+ ADFParser.userId +"/" + ADFParser.projectId + "resources/gadget/gadget_"+ gadget.getGadgetName() + ".plist";
		}
		
		if(gadgetPlistURL.equalsIgnoreCase("") && genApp.getProjectstate().equalsIgnoreCase("preview")){
			gadgetPlistURL = GenApp.instanceURL + ":8080/appexe/api/download/gadget/" + ADFParser.projectId + "/gadget_"+ gadget.getGadgetName() + ".plist";
		}else if(gadgetPlistURL.equalsIgnoreCase("")){
			gadgetPlistURL = GenApp.instanceURL + "/appexe/"+ ADFParser.userId +"/" + ADFParser.projectId + "/resources/gadget/gadget_"+ gadget.getGadgetName() + ".plist";
		}
		
		InputStream childrenStream = new URL(gadgetPlistURL).openStream();
		if(childrenStream != null){
			
			ByteArrayOutputStream buffer = new ByteArrayOutputStream();
			int nRead;
			byte[] data = new byte[16384];
			
			while ((nRead = childrenStream.read(data, 0, data.length)) != -1) {
				buffer.write(data, 0, nRead);
			}
			buffer.flush();
			
			try {
				gadgetChildrenDict = (NSDictionary) PropertyListParser.parse(buffer.toByteArray());
			} catch (Exception e) {
				System.out.println("GADGET PLIST DOES NOT EXIST/INVALID: "+ gadgetPlistURL);
				e.printStackTrace();
				return null;
			}
			
			childrenStream.close();
		}else
			return null;

		ADFParser.parentUI = "Gadget";
		ADFParser.parentUIName = gadget.getGadgetName();
		for (String key : gadgetChildrenDict.allKeys()) {
			
			//gadgetEvents
			//prefixName
			
			if (key.equalsIgnoreCase("Children")) {
				NSArray children = (NSArray) gadgetChildrenDict.objectForKey("Children");
				gadget.setChildren(UIParser.parseChildren(children.getArray(),
						genApp, defFile));
				
			}else if (key.equalsIgnoreCase("dataArray")) {
				gadget.setDataArray(ETCParser.parseDataArray(((NSArray) gadgetChildrenDict
								.objectForKey(key)).getArray()));
				
			}else if (key.equalsIgnoreCase("gadgetCategory")){
				gadget.setGadgetCategoty(((NSNumber) gadgetChildrenDict.objectForKey(key)).intValue());
				
			}else if (key.equalsIgnoreCase("mainObjectName")) {
				gadget.setMainObjectName(gadgetChildrenDict.objectForKey(key).toString());
				
			}
		}
		
		for (DataArray dataArray : gadget.getDataArray()) {
			for (BaseView baseView : gadget.getChildren()) {
				if (dataArray.getObjectName().equalsIgnoreCase(
						baseView.getName())) {

				}
			}
		}
		
		ADFParser.parentUI = "Page";
		ADFParser.parentUIName = defFile.getFileName();
		gadget = (Gadget) parseBaseView(dic, genApp, gadget);
		ADFParser.getGadgetsList().add(gadget);
	
		return gadget;
	}

	public static GadgetFile parseGadgetFile(NSDictionary dic, GenApp genApp,
			DefFile defFile) throws Exception {
		GadgetFile gadgetFile = new GadgetFile();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("viewType"))
				gadgetFile.setViewType(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("mainPartName"))
				gadgetFile.setViewType(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("notAllowViewTypes"))
				gadgetFile.setNotAllowViewTypes(ETCParser
						.parseStringArray(((NSArray) dic.objectForKey(key))
								.getArray()));
			else if (key.equalsIgnoreCase("children"))
				gadgetFile.setChildren(parseChildren(
						((NSArray) dic.objectForKey(key)).getArray(), genApp,
						defFile));
			else if (key.equalsIgnoreCase("actions"))
				gadgetFile.setEvent(parseEvent(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
		}
		return (GadgetFile) parseBaseView(dic, genApp, gadgetFile);
	}
	
	public static ArrayList<GadgetEvents> parseGadgetEvents(NSObject[] gadgetEventList, GenApp genApp,
			DefFile defFile) throws Exception {
		ArrayList<GadgetEvents> gadgetEvents = new ArrayList<GadgetEvents>();
		
		for(NSObject action : gadgetEventList){
			NSDictionary gadgetAction = (NSDictionary) action;
			if(gadgetAction.objectForKey("objectEvent") != null){
				GadgetEvents gadgetChildEvents = new GadgetEvents();
				for(String key : gadgetAction.allKeys()){
					if(key.equalsIgnoreCase("actions")){
						ArrayList<Event> eventList = new ArrayList<Event>();
						Event event = null;
						event = new Event();
						event.setEventName(gadgetAction.objectForKey("objectEvent").toString());
						event.setAction(parseAction(
								((NSArray) gadgetAction.objectForKey(key)).getArray(), genApp,
								defFile));
						eventList.add(event);
						gadgetChildEvents.setEvents(eventList);
					}else if(key.equalsIgnoreCase("objectName")){
						gadgetChildEvents.setEventObject(gadgetAction.objectForKey(key).toString());
					}else if(key.equalsIgnoreCase("objectEventName")){
						gadgetChildEvents.setObjectEventName(gadgetAction.objectForKey(key).toString());
					}
				}
				gadgetEvents.add(gadgetChildEvents);
			}
			
		}
		return gadgetEvents;
	}
	
	private static BaseView parseListBox(NSDictionary dic, GenApp genApp,
			DefFile defFile) throws Exception{
		ListBox listBox = new ListBox();

		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("viewType"))
				continue;
			else if (key.equalsIgnoreCase("font"))
				listBox.setFont(AttributeParser.parseFont((NSDictionary) dic
						.objectForKey(key)));
			else if (key.equalsIgnoreCase("borderStyle"))
				listBox.setBorderStyle(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("borderWeight"))
				listBox.setBorderWidth(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("backgroundColor"))
				listBox.setBackgroundColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("borderColor"))
				listBox.setBorderColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("padding"))
				listBox.setPadding(AttributeParser
						.parsePadding((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("tabOrder"))
				listBox.setTaborder(((NSNumber) dic.objectForKey(key))
						.intValue());
			else if (key.equalsIgnoreCase("verticalAlignment"))
				listBox.setVerticalAlignment(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("servicename"))
				listBox.setServiceName(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("tablename"))
				listBox.setTablename(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("displayText"))
				listBox.setDisplayText(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("fieldname"))
				listBox.setFieldName(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("type"))
				listBox.setType(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("initialvalue"))
				listBox.setInitialValue(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("hidden"))
				listBox.setHidden(((NSNumber) dic.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("SelectedValues"))
				listBox.setSelectedIndex(dic.objectForKey(key).toString().split(","));
			else if (key.equalsIgnoreCase("dataArray"))
				listBox.setDataArray(ETCParser.parseDataArray(((NSArray) dic
						.objectForKey(key)).getArray()));
			else if (key.equalsIgnoreCase("actions"))
				listBox.setEvent(parseEvent(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
		}
		return (ListBox) parseScrollView(dic, genApp, listBox, defFile);
	}
	
	private static BaseView parseQRCode(NSDictionary dic, GenApp genApp,
			DefFile defFile) throws Exception{
		QRCode qrCode = new QRCode();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("viewType"))
				continue;
			else if (key.equalsIgnoreCase("encstring"))
				qrCode.setEncstring(dic.objectForKey(key).toString());
		}
		return (QRCode) parseBaseView(dic, genApp, qrCode);
	}
	
	
	private static BaseView parseChartView(NSDictionary dic, GenApp genApp,
			DefFile defFile) throws Exception{
		Chart chartView = new Chart();

		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("viewType"))
				continue;
			else if (key.equalsIgnoreCase("name"))
				chartView.setName(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("chartType"))
				chartView.setType(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("chartTitle"))
				chartView.setTitle(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("hidden"))
				chartView.setHidden(((NSNumber) dic.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("servicename"))
				chartView.setServiceName(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("tablename"))
				chartView.setTableName(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("where"))
				chartView.setWhereCondition(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("itemField"))
				chartView.setItemField(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("valueField"))
				chartView.setValueField(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("padding"))
				chartView.setPadding(AttributeParser
						.parsePadding((NSDictionary) dic.objectForKey(key)));			
//			else if (key.equalsIgnoreCase("verticalAlignment"))
//				chartView.setVerticalAlignment(dic.objectForKey(key).toString());
//			else if (key.equalsIgnoreCase("backgroundColor"))
//				chartView.setBackgroundColor(AttributeParser
//						.parseColor((NSDictionary) dic.objectForKey(key)));			
//			else if (key.equalsIgnoreCase("initialvalue"))
//				chartView.setInitialValue(dic.objectForKey(key).toString());
//			else if (key.equalsIgnoreCase("SelectedValues"))
//				chartView.setSelectedIndex(dic.objectForKey(key).toString().split(","));
//			else if (key.equalsIgnoreCase("dataArray"))
//				chartView.setDataArray(ETCParser.parseDataArray(((NSArray) dic
//						.objectForKey(key)).getArray()));
//			else if (key.equalsIgnoreCase("actions"))
//				chartView.setEvent(parseEvent(
//						(NSDictionary) dic.objectForKey(key), genApp, defFile));
			
			//Geometry
			
		}
		return (Chart) parseBaseView(dic, genApp, chartView);
	}
	
	
	private static BaseView parseTileListView(NSDictionary dic, GenApp genApp,
			DefFile defFile) throws Exception{
		TileList tileList = new TileList();

		for (String key : dic.allKeys()) {
			
			if (key.equalsIgnoreCase("viewType"))
				continue;
			else if (key.equalsIgnoreCase("name"))
				tileList.setName(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("type"))
				tileList.setType(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("direction"))
				tileList.setDirection(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("hidden"))
				tileList.setHidden(((NSNumber) dic.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("paging"))
				tileList.setPaging(((NSNumber) dic.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("circular"))
				tileList.setCircular(((NSNumber) dic.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("servicename"))
				tileList.setServiceName(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("tablename"))
				tileList.setTableName(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("where"))
				tileList.setWhere(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("sort"))
				tileList.setSort(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("dataarray"))
				tileList.setDataArray(ETCParser.parseTileItems((((NSArray) dic.objectForKey(key)).getArray()), genApp, defFile));
			else if (key.equalsIgnoreCase("padding"))
				tileList.setPadding(AttributeParser.parsePadding((NSDictionary) dic.objectForKey(key)));			
			
		}
		return (TileList) parseBaseView(dic, genApp, tileList);
	}
	
	private static BaseView parseCalendar(NSDictionary dic, GenApp genApp,
			DefFile defFile) throws Exception{
		Calendar calendar = new Calendar();

		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("viewType"))
				continue;
			else if (key.equalsIgnoreCase("name"))
				calendar.setName(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("placeHolder"))
				calendar.setPlaceHolder(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("taborder")) {
				calendar.setTabOrder(((NSNumber) dic.objectForKey(key))
						.intValue());
			}
			else if (key.equalsIgnoreCase("selectedDate"))
				calendar.setSelectedDate(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("maxRange"))
				calendar.setMaxRange(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("minRange"))
				calendar.setMinRange(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("borderWeight"))
				calendar.setBorderWidth(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("hidden"))
				calendar.setHidden(((NSNumber) dic.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("showIcon"))
				calendar.setShowIcon(((NSNumber) dic.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("backgroundColor"))
				calendar.setBackgroundColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("borderColor"))
				calendar.setBorderColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("cornerRadius"))
				calendar.setCornerRadius(((NSNumber) dic.objectForKey(key)).intValue());
			else if (key.equalsIgnoreCase("displayFormat"))
				calendar.setDisplayFormat(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("actions"))
				calendar.setEvent(parseEvent(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
			else if (key.equalsIgnoreCase("font"))
				calendar.setFont(AttributeParser.parseFont((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("type"))
				calendar.setType(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("jpYears"))
				calendar.setJPEra(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("padding"))
				calendar.setPadding(AttributeParser
						.parsePadding((NSDictionary) dic.objectForKey(key)));
		}
		return (Calendar) parseBaseView(dic, genApp, calendar);
	}
	
}
