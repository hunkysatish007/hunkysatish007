package com.mobilous.mobileweb.parser;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Properties;

import com.dd.plist.NSArray;
import com.dd.plist.NSDictionary;
import com.dd.plist.NSNumber;
import com.dd.plist.NSObject;
import com.mobilous.mobileweb.action.Action;
import com.mobilous.mobileweb.app.DefFile;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.etc.Case;
import com.mobilous.mobileweb.etc.ComboBoxOptions;
import com.mobilous.mobileweb.etc.Condition;
import com.mobilous.mobileweb.etc.DataArray;
import com.mobilous.mobileweb.etc.GroupCase;
import com.mobilous.mobileweb.etc.Inset;
import com.mobilous.mobileweb.etc.Item;
import com.mobilous.mobileweb.etc.ItemData;
import com.mobilous.mobileweb.etc.Markers;
import com.mobilous.mobileweb.etc.Offset;
import com.mobilous.mobileweb.etc.ResizingMask;
import com.mobilous.mobileweb.etc.Size;
import com.mobilous.mobileweb.etc.StateArray;
import com.mobilous.mobileweb.etc.Stretch;
import com.mobilous.mobileweb.etc.TableRow;
import com.mobilous.mobileweb.etc.TileItem;
import com.mobilous.mobileweb.etc.PageOverlayItem;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.param.NPEActionSheetButtonsController;
import com.mobilous.mobileweb.ui.Grid;
import com.mobilous.mobileweb.util.PlistLocator;

public class ETCParser extends ADFParser {

	public ETCParser(PlistLocator locator) {
		super(locator, MODE);
	}

	protected static ArrayList<String> parseStringArray(NSObject[] obj)
			throws Exception {
		ArrayList<String> stringArrayList = new ArrayList<String>();
		for (NSObject o : obj) {
			stringArrayList.add(o.toString());
		}
		return stringArrayList;
	}

	protected static ArrayList<Integer> parseIntArray(NSObject[] obj)
			throws Exception {
		ArrayList<Integer> intArrayList = new ArrayList<Integer>();
		for (NSObject o : obj) {
			intArrayList.add(Integer.parseInt(o.toString()));
		}
		return intArrayList;
	}

	protected static ArrayList<Item> parseGroup(NSObject[] obj, GenApp genApp,
			DefFile defFile) throws Exception {
		ArrayList<Item> itemList = new ArrayList<Item>();
		Item item;
		Boolean found = false;
		for (NSObject o : obj) {
			NSDictionary dic = (NSDictionary) o;
			item = new Item();
			for (String key : dic.allKeys()) {
				if (key.equalsIgnoreCase("headerView"))
					item.setHeaderView(AttributeParser
							.parseImageFile((NSDictionary) dic
									.objectForKey(key)));
				else if (key.equalsIgnoreCase("groupName"))
					item.setGroupName(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("serviceName"))
					item.setServiceName(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("RSSFeedURL"))
					item.setRssFeedURL(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("footerView"))
					item.setFooterView(AttributeParser
							.parseImageFile((NSDictionary) dic
									.objectForKey(key)));
				else if (key.equalsIgnoreCase("groupType"))
					item.setGroupType(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("Title"))
					item.setTitle(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("Footer"))
					item.setFooter(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("recordListFormat"))
					item.setRecordListFormat(parseFields(((NSArray) dic
							.objectForKey(key)).getArray()));
				else if (key.equalsIgnoreCase("actions"))
					item.setEvent(parseEvent(
							(NSDictionary) dic.objectForKey(key), genApp,
							defFile));
				else if (key.equalsIgnoreCase("editable"))
					item.setEditable(((NSNumber) dic.objectForKey(key))
							.boolValue());
				else if (key.equalsIgnoreCase("singleSelect"))
					item.setSingleSelect(((NSNumber) dic.objectForKey(key))
							.boolValue());
				else if (key.equalsIgnoreCase("multiSelect"))
					item.setMultiSelect(((NSNumber) dic.objectForKey(key))
							.boolValue());
				else if (key.equalsIgnoreCase("autoLoad"))
					item.setAutoLoad(((NSNumber) dic.objectForKey(key))
							.boolValue());
				else if (key.equalsIgnoreCase("refreshTimeout"))
					item.setRefreshTimeout(((NSNumber) dic.objectForKey(key))
							.intValue());
				else if (key.equalsIgnoreCase("tablename"))
					item.setTablename(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("where"))
					item.setWhere(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("sort"))
					item.setSort(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("flexibleHeight"))
					item.setFlexibleHeight(((NSNumber) dic.objectForKey(key)).boolValue());
//				else if (key.equalsIgnoreCase("RecordCells")) {
//					int screenIndex = getScreenIndex(defFile);
//					NSObject[] recordCells = ((NSArray) dic.objectForKey(key)).getArray();
//					if(recordCells.length > 0) {
//						item.setRecordCellDef(parseTableRow((NSDictionary)recordCells[screenIndex], genApp,defFile));
//						found = true;
//					}
//				}
				else if (key.equalsIgnoreCase("RecordCellDef"))// && !found)
					item.setRecordCellDef(parseTableRow(
							(NSDictionary) dic.objectForKey(key), genApp,
							defFile));
				else if (key.equalsIgnoreCase("rowarray"))
					item.setDataArray(parseRowArray(
							((NSArray) dic.objectForKey(key)).getArray(),
							genApp, defFile));
				else if (key.equalsIgnoreCase("Groupby"))
					item.setGroupBy(dic.objectForKey(key).toString());
					
				else
					// throw new Exception("Unknown Key: "+key);
					logger.debug("parseGroup parse: Unknown key found: " + key);
			}
			itemList.add(item);
		}
		return itemList;
	}

	protected static StateArray parseStateArray(NSObject[] obj)
			throws Exception {
		StateArray stateArray = new StateArray();
		for (NSObject o : obj) {
			NSDictionary dic = (NSDictionary) o;
			for (String key : dic.allKeys()) {
				if (key.equalsIgnoreCase("state"))
					stateArray.setState(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("minimumValueImage"))
					stateArray.setMinimumValueImage(AttributeParser
							.parseImageFile((NSDictionary) dic
									.objectForKey(key)));
				else if (key.equalsIgnoreCase("maximumValueImage"))
					stateArray.setMaximumValueImage(AttributeParser
							.parseImageFile((NSDictionary) dic
									.objectForKey(key)));
				else if (key.equalsIgnoreCase("minimumTrackImage"))
					stateArray.setMinimumTrackImage(AttributeParser
							.parseImageFile((NSDictionary) dic
									.objectForKey(key)));
				else if (key.equalsIgnoreCase("maximumTrackImage"))
					stateArray.setMaximumTrackImage(AttributeParser
							.parseImageFile((NSDictionary) dic
									.objectForKey(key)));
				else if (key.equalsIgnoreCase("ThumbImage"))
					stateArray.setThumbImage(AttributeParser
							.parseImageFile((NSDictionary) dic
									.objectForKey(key)));
				else
					// throw new Exception("Unknown Key: "+key);
					logger.debug("parseStateArray parse: Unknown key found: "
							+ key);
			}
		}
		return stateArray;
	}

	protected static ArrayList<DataArray> parseDataArray(NSObject[] obj)
			throws Exception {
		ArrayList<DataArray> dataArrayList = new ArrayList<DataArray>();
		DataArray dataArray;
		String fileName = "";
		if(GenApp.instanceURL.equals("LOCAL")){
			fileName = new File( "MW_PE_KEY_Maping.properties" ).getAbsolutePath().replace("MW_PE_KEY_Maping.properties", "") +"/src/main/webapp/resources/config/MW_PE_KEY_Maping.properties";
		}else{
			fileName = new File( "MW_PE_KEY_Maping.properties" ).getAbsolutePath().replace("config/MW_PE_KEY_Maping.properties", "") + "applications/mobileweb/resources/config/MW_PE_KEY_Maping.properties";
		}
		Properties prop = new Properties();
		InputStream inputStream = null;
		try{
			inputStream = new FileInputStream(fileName);
		}catch(FileNotFoundException ex){
			fileName = new File("/usr/glassfish/glassfish/domains/domain1/eclipseApps/mobileweb3.1.0/resources/config/MW_PE_KEY_Maping.properties").toString();
			inputStream = new FileInputStream(fileName);
		}


		if (inputStream != null) {
			prop.load(inputStream);
		} else {
			throw new FileNotFoundException("property file 'MW_PE_KEY_Maping.properties' not found in the classpath");
		}

		for (NSObject o : obj) {
			NSDictionary dic = (NSDictionary) o;
			dataArray = new DataArray();
			for (String key : dic.allKeys()) {
				if (key.equalsIgnoreCase("type"))
					dataArray.setType(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("currentIndex"))
					dataArray.setCurrentIndex(((NSNumber) dic.objectForKey(key))
									.intValue());
				else if (key.equalsIgnoreCase("width"))
					dataArray.setWidth(((NSNumber) dic.objectForKey(key))
							.intValue());
				else if (key.equalsIgnoreCase("height"))
					dataArray.setHeight(((NSNumber) dic.objectForKey(key))
							.intValue());
				else if (key.equalsIgnoreCase("itemarray"))
					dataArray.setItemArray(parseItemArray(((NSArray) dic
							.objectForKey(key)).getArray()));
				else if (key.equalsIgnoreCase("objectname"))
					dataArray.setObjectName(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("name"))
					dataArray.setName(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("value"))
					dataArray.setValue(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("permisson"))
					dataArray.setPermission(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("property"))
					dataArray.setProperty(prop.getProperty(dic.objectForKey(key).toString()));
				else if (key.equalsIgnoreCase("text"))
					dataArray.setFieldname(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("fieldvalue")){
					dataArray.setFieldValue(dic.objectForKey(key).toString());
					dataArray.setCurrentIndex(-1);
				}else
					// throw new Exception("Unknown Key: "+key);
					logger.debug("parseDataArray parse: Unknown key found: "
							+ key);
			}
			dataArrayList.add(dataArray);
		}
		return dataArrayList;
	}
	
	protected static ComboBoxOptions parseComboBoxOptions(NSObject[] obj){
		ComboBoxOptions options = new ComboBoxOptions();
		//ArrayList<ComboBoxOptions> comboOptions = new ArrayList<ComboBoxOptions>();		
		
		for (NSObject o : obj) {
			NSDictionary dic = (NSDictionary) o;
			for (String key : dic.allKeys()) {
				if (key.equalsIgnoreCase("fieldvalue")){
					options.setOptionID(dic.objectForKey(key).toString());
					//options.setOptionID(((NSNumber) dic.objectForKey(key)).intValue());
				}else if (key.equalsIgnoreCase("text")){
					options.setDisplayValue(dic.objectForKey(key).toString());
				}
			}
			}
		
		return options;
		
	}

	protected static ArrayList<ItemData> parseItemArray(NSObject[] obj)
			throws Exception {
		ArrayList<ItemData> itemDataList = new ArrayList<ItemData>();
		for (NSObject o : obj) {
			NSDictionary dic = (NSDictionary) o;
			itemDataList.add(parseItemData(dic));
		}
		return itemDataList;
	}

	protected static ItemData parseItemData(NSDictionary dic) throws Exception {
		ItemData itemData = new ItemData();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("font"))
				itemData.setFont(AttributeParser.parseFont((NSDictionary) dic
						.objectForKey(key)));
			else if (key.equalsIgnoreCase("text"))
				itemData.setText(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("fieldname"))
				itemData.setValue(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("image"))
				itemData.setImageFile(AttributeParser
						.parseImageFile((NSDictionary) dic.objectForKey(key)));
			else
				// throw new Exception("Unknown Key: "+key);
				logger.debug("parseItemData parse: Unknown key found: " + key);

		}
		return itemData;
	}

	protected static ArrayList<TableRow> parseRowArray(NSObject[] obj,
			GenApp genApp, DefFile defFile) throws Exception {
		ArrayList<TableRow> tableRowList = new ArrayList<TableRow>();
		for (NSObject o : obj) {
			NSDictionary dic = (NSDictionary) o;
			tableRowList.add(parseTableRow(dic, genApp, defFile));
		}
		return tableRowList;
	}

	protected static TableRow parseTableRow(NSDictionary dic, GenApp genApp,
			DefFile defFile) throws Exception {
		TableRow tableRow = new TableRow();
		for (String key : dic.allKeys()) {
			// if(key.equalsIgnoreCase("cellType"))
			// tableRow.setCellType(dic.objectForKey(key).toString());
			if (key.equalsIgnoreCase("name"))
				tableRow.setName(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("Title"))
				tableRow.setTitle(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("CellStyle"))
				tableRow.setCellStyle(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("footer"))
				tableRow.setFooter(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("accessoryType"))
				tableRow.setAccessoryType(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("editingAccessoryType"))
				tableRow.setEditingAccessoryType(dic.objectForKey(key)
						.toString());
			else if (key.equalsIgnoreCase("accessory"))
				tableRow.setAccessory(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("selectionStyle"))
				tableRow.setSelectionStyle(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("editingStyle"))
				tableRow.setEditingStyle(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("subTextField"))
				tableRow.setSubTextField(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("mainTextField"))
				tableRow.setMainTextField(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("textLabelDic"))
				tableRow.setTextLabelDic(UIParser.parseLabel(
						(NSDictionary) dic.objectForKey(key), genApp));
			else if (key.equalsIgnoreCase("detailTextLabelDic"))
				tableRow.setDetailTextLabelDic(UIParser.parseLabel(
						(NSDictionary) dic.objectForKey(key), genApp));
			else if (key.equalsIgnoreCase("selectedBackgroundView"))
				tableRow.setSelectedBackgroundView(AttributeParser
						.parseImageFile((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("accessoryView"))
				tableRow.setAccessoryView(AttributeParser
						.parseImageFile((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("backgroundView"))
				tableRow.setBackgroundView(AttributeParser
						.parseImageFile((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("alternatingRowImages1"))
				tableRow.setOddRowbackgroundImage(AttributeParser
						.parseImageFile((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("alternatingRowImages2"))
				tableRow.setEvenRowbackgroundImage(AttributeParser
						.parseImageFile((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("backgroundColor")) {
				tableRow.setBackgroundColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
			}else if (key.equalsIgnoreCase("alternatingRowColors1")) {
				tableRow.setOddRowBackgroundColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
			}else if (key.equalsIgnoreCase("alternatingRowColors2")) {
				tableRow.setEvenRowBackgroundColor(AttributeParser
						.parseColor((NSDictionary) dic.objectForKey(key)));
			}else if (key.equalsIgnoreCase("rowBGImageRepeat")) {
				tableRow.setRowBGImageRepeat(((NSNumber) dic.objectForKey(key))
						.boolValue());
			}else if (key.equalsIgnoreCase("alternatingRowStyle"))
				tableRow.setAlternateRowStyle(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("editingAccessoryView"))
				tableRow.setEditingAccessoryView(AttributeParser
						.parseImageFile((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("mainImage"))
				tableRow.setMainImage(AttributeParser
						.parseImageFile((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("editable"))
				tableRow.setEditable(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("movable"))
				tableRow.setMovable(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("highlighted"))
				tableRow.setHighlighted(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("fieldArray"))
				tableRow.setFieldArray(parseFields(((NSArray) dic
						.objectForKey(key)).getArray()));
			else if (key.equalsIgnoreCase("mainText"))
				tableRow.setMainText(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("Value"))
				tableRow.setValue(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("detailText"))
				tableRow.setDetailText(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("height"))
				tableRow.setHeight(((NSNumber) dic.objectForKey(key))
						.intValue());
			else if (key.equalsIgnoreCase("actions"))
				tableRow.setEvent(parseEvent(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
//			else if (key.equalsIgnoreCase("Fields"))
//				tableRow.setChildren(UIParser.parseChildren(
//						((NSArray) dic.objectForKey(key)).getArray(), genApp,
//						defFile));
			else if (key.equalsIgnoreCase("Fields")) {
				int count = 0;
				int scrIndex = 	getScreenIndex(defFile);
				NSObject[] fields = ((NSArray) dic.objectForKey(key)).getArray();
				NSObject[] fieldsuiparts = new NSObject[fields.length];
				for(NSObject uiparts : fields) {
					NSDictionary uip = (NSDictionary) uiparts;
					for (String uipchildren : uip.allKeys()) {
						if (uipchildren.equalsIgnoreCase("uiParts")) {
							NSDictionary uipart = (NSDictionary)((NSArray) uip.objectForKey(uipchildren)).getArray()[scrIndex];
							fieldsuiparts[count] = uipart;
							count++;
						}
					}
				}
				if(count > 0) {
					if(fieldsuiparts.length == count) {
						tableRow.setChildren(UIParser.parseChildren(
								fieldsuiparts, genApp,
								defFile));
					}
				}else {
					tableRow.setChildren(UIParser.parseChildren(
							((NSArray) dic.objectForKey(key)).getArray(), genApp,
							defFile));
				}
			}
			else if (key.equalsIgnoreCase("gridFields") && tableRow.getCellStyle().equalsIgnoreCase("simple-grid"))
				tableRow.setGridArray(praseGridFields(((NSArray)dic.objectForKey(key)).getArray()));
			else if (key.equalsIgnoreCase("tabularGridFields") && tableRow.getCellStyle().equalsIgnoreCase("tabular-grid"))
				tableRow.setGridArray(praseGridFields(((NSArray)dic.objectForKey(key)).getArray()));
			
			else
				// throw new Exception("Unknown Key: "+key);
				logger.debug("parseTableRow parse: Unknown key found: " + key);
		}
		return tableRow;
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
				}else if(key.equalsIgnoreCase("id")){
				 	grid.setId(((NSNumber)dic.objectForKey(key)).intValue());
				}else if(key.equalsIgnoreCase("column")){
				 	grid.setColumn(((NSNumber)dic.objectForKey(key)).intValue());
				}else if(key.equalsIgnoreCase("freeze")){
				 	grid.setFreeze(((NSNumber)dic.objectForKey(key)).boolValue());
				}else if(key.equalsIgnoreCase("fieldname")){
				 	grid.setFieldName(dic.objectForKey(key).toString());
				}
				
			}
			gridList.add(grid);
		}
		return gridList;
	}
	
	protected static ArrayList<PageOverlayItem> parsePageOverlayItems(NSObject[] PageOverlayItemArray, GenApp genApp, DefFile defFile) 
			throws Exception {
		
		ArrayList<PageOverlayItem> pageOverlayItem = new ArrayList<PageOverlayItem>();
		for (NSObject o : PageOverlayItemArray) {
			NSDictionary dic = (NSDictionary) o;
			PageOverlayItem poi = new PageOverlayItem();
			for(String key : dic.allKeys()){
				if(key.equalsIgnoreCase("height")){
					poi.setHeight(((NSNumber)dic.objectForKey(key)).intValue());
				}else if (key.equalsIgnoreCase("Fields")){
					
					NSArray arrFields = new NSArray();
					
					NSObject[] fieldObj = ((NSArray) dic.objectForKey(key)).getArray();
					for (NSObject obj : fieldObj) {
						NSDictionary uidic = (NSDictionary) obj;
						for(String uikey : uidic.allKeys()){
							if (uikey.equalsIgnoreCase("uiparts")){
								
								arrFields.addObject(((NSArray) uidic.objectForKey(uikey)).objectAtIndex(0));
							}
						}
					}
					poi.setChildren(UIParser.parseChildren(((NSArray) arrFields).getArray(), genApp, defFile));
				}
				
			}
			pageOverlayItem.add(poi);
		}
		return pageOverlayItem;
	}
	
	protected static ArrayList<TileItem> parseTileItems(NSObject[] tileArray, GenApp genApp, DefFile defFile) 
			throws Exception {
		
		ArrayList<TileItem> tileList = new ArrayList<TileItem>();
		for (NSObject o : tileArray) {
			NSDictionary dic = (NSDictionary) o;
			TileItem tile = new TileItem();
			for(String key : dic.allKeys()){
				if(key.equalsIgnoreCase("rows")){
				 	tile.setRow(((NSNumber)dic.objectForKey(key)).intValue());
				}else if(key.equalsIgnoreCase("columns")){
				 	tile.setColumn(((NSNumber)dic.objectForKey(key)).intValue());
				}else if(key.equalsIgnoreCase("gap")){
				 	tile.setTileGap(((NSNumber)dic.objectForKey(key)).intValue());
				}else if(key.equalsIgnoreCase("width")){
				 	tile.setTileWidth(((NSNumber)dic.objectForKey(key)).intValue());
				}else if(key.equalsIgnoreCase("height")){
				 	tile.setTileHeight(((NSNumber)dic.objectForKey(key)).intValue());
				}else if (key.equalsIgnoreCase("Fields")){
					
					NSArray arrFields = new NSArray();
					
					NSObject[] fieldObj = ((NSArray) dic.objectForKey(key)).getArray();
					for (NSObject obj : fieldObj) {
						NSDictionary uidic = (NSDictionary) obj;
						for(String uikey : uidic.allKeys()){
							if (uikey.equalsIgnoreCase("uiparts")){
								
								arrFields.addObject(((NSArray) uidic.objectForKey(uikey)).objectAtIndex(0));
							}
						}
					}
					tile.setChildren(UIParser.parseChildren(((NSArray) arrFields).getArray(), genApp, defFile));
				}
				
			}
			tileList.add(tile);
		}
		return tileList;
	}
	
	protected static ResizingMask parseResizingMask(NSDictionary dic)
			throws Exception {
		ResizingMask autoResizingMask = new ResizingMask();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("flexibleLeftMargin"))
				autoResizingMask.setFlexibleLeftMargin(((NSNumber) dic
						.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("flexibleWidth"))
				autoResizingMask.setFlexibleWidth(((NSNumber) dic
						.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("flexibleRightMargin"))
				autoResizingMask.setFlexibleRightMargin(((NSNumber) dic
						.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("flexibleTopMargin"))
				autoResizingMask.setFlexibleTopMargin(((NSNumber) dic
						.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("flexibleHeight"))
				autoResizingMask.setFlexibleHeight(((NSNumber) dic
						.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("flexibleBottomMargin"))
				autoResizingMask.setFlexibleBottomMargin(((NSNumber) dic
						.objectForKey(key)).boolValue());
			else
				// throw new Exception("Unknown Key: "+key);
				logger.debug("parseResizingMask parse: Unknown key found: "
						+ key);
		}
		return autoResizingMask;
	}

	protected static Stretch parseStretch(NSDictionary dic) throws Exception {
		Stretch contentStretch = new Stretch();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("x"))
				contentStretch.setX(((NSNumber) dic.objectForKey(key))
						.intValue());
			else if (key.equalsIgnoreCase("y"))
				contentStretch.setY(((NSNumber) dic.objectForKey(key))
						.intValue());
			else if (key.equalsIgnoreCase("width"))
				contentStretch.setWidth(((NSNumber) dic.objectForKey(key))
						.intValue());
			else if (key.equalsIgnoreCase("height"))
				contentStretch.setHeight(((NSNumber) dic.objectForKey(key))
						.intValue());
			else
				// throw new Exception("Unknown Key: "+key);
				logger.debug("parseStretch parse: Unknown key found: " + key);
		}
		return contentStretch;
	}

	protected static Offset parseOffset(NSDictionary dic) throws Exception {
		Offset contentOffset = new Offset();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("x"))
				contentOffset.setX(((NSNumber) dic.objectForKey(key))
						.intValue());
			else if (key.equalsIgnoreCase("y"))
				contentOffset.setY(((NSNumber) dic.objectForKey(key))
						.intValue());
		}
		return contentOffset;
	}

	protected static Size parseSize(NSDictionary dic) throws Exception {
		Size contentSize = new Size();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("width"))
				contentSize.setWidth(((NSNumber) dic.objectForKey(key))
						.intValue());
			else if (key.equalsIgnoreCase("height"))
				contentSize.setHeight(((NSNumber) dic.objectForKey(key))
						.intValue());
		}
		return contentSize;
	}

	protected static Inset parseInset(NSDictionary dic) throws Exception {
		Inset contentInset = new Inset();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("top"))
				contentInset.setTop(((NSNumber) dic.objectForKey(key))
						.intValue());
			else if (key.equalsIgnoreCase("left"))
				contentInset.setLeft(((NSNumber) dic.objectForKey(key))
						.intValue());
			else if (key.equalsIgnoreCase("bottom"))
				contentInset.setBottom(((NSNumber) dic.objectForKey(key))
						.intValue());
			else if (key.equalsIgnoreCase("right"))
				contentInset.setRight(((NSNumber) dic.objectForKey(key))
						.intValue());
		}
		return contentInset;
	}

	public static ArrayList<Markers> parseMarkerList(NSObject[] obj,
			GenApp genApp, Action action, DefFile defFile) throws Exception {
		ArrayList<Markers> markerList = new ArrayList<Markers>();
		for (NSObject o : obj) {
			NSDictionary dic = (NSDictionary) o;
			markerList.add(parseMarkers(dic, genApp, action, defFile));
		}
		return markerList;
	}

	public static Markers parseMarkers(NSDictionary dic, GenApp genApp,
			Action action, DefFile defFile) throws Exception {
		logger.debug("parseMarkers: parse");
		Markers marker = new Markers();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("name"))
				marker.setName(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("markerId"))
				marker.setMarkerId(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("title")) {
				logger.debug("# Title ## "
						+ dic.objectForKey(key).getClass().getSimpleName()
						+ " > " + dic.objectForKey(key).toString());
				marker.setTitle(dic.objectForKey(key).toString());
			} else if (key.equalsIgnoreCase("subtitle"))
				marker.setSubtitle(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("leftView"))
				marker.setLeftView(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("rightView"))
				marker.setRightView(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("enable"))
				marker.setEnable(((NSNumber) dic.objectForKey(key)).boolValue());
			else if (key.equalsIgnoreCase("asDefault"))
				marker.setAsDefault(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("longitude")) {
				marker.setLongitude(dic.objectForKey(key).toString());
			} else if (key.equalsIgnoreCase("lattitude"))
				marker.setLatitude(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("anchor"))
				marker.setAnchor(AttributeParser.parsePoint((NSDictionary) dic
						.objectForKey(key)));

			// markerType
			// markerfile
			// leftViewImage
			// rightViewImage
			// animationDrop
			// canShowCallout

			else if (key.equalsIgnoreCase("actions"))
				action.setEvent(parseEvent(
						(NSDictionary) dic.objectForKey(key), genApp, defFile));
			else
				// throw new Exception("Unknown Key: "+key);
				logger.debug("parseMarkers parse: Unknown key found: " + key);

		}
		return marker;
	}

	protected static Condition parseCondition(NSDictionary dic)
			throws Exception {
		Condition condition = new Condition();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("groupcases")) // dic.objectForKey(key).toString()
				condition.setGroupCases(parseGroupCases(((NSArray) dic
						.objectForKey(key)).getArray()));
			else if (key.equalsIgnoreCase("condtemp"))
				condition.setCondTemp(dic.objectForKey(key).toString());
		}
		return condition;
	}

	public static ArrayList<Case> parseCases(NSObject[] obj) throws Exception {
		ArrayList<Case> cases = new ArrayList<Case>();
		for (NSObject o : obj) {
			NSDictionary dic = (NSDictionary) o;
			cases.add(parseCase(dic));
		}
		return cases;
	}

	protected static Case parseCase(NSDictionary dic) throws Exception {
		Case condCase = new Case();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("target")) // dic.objectForKey(key).toString()
				condCase.setTarget(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("operator"))
				condCase.setOperator(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("value"))
				condCase.setValue(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("ORGroupCase"))
				condCase.setGroupCases(parseGroupCases(((NSArray) dic
						.objectForKey(key)).getArray()));
		}
		return condCase;
	}

	public static ArrayList<GroupCase> parseGroupCases(NSObject[] obj)
			throws Exception {
		ArrayList<GroupCase> groupCases = new ArrayList<GroupCase>();
		for (NSObject o : obj) {
			NSDictionary dic = (NSDictionary) o;
			groupCases.add(parseGroupCase(dic));
		}
		return groupCases;
	}

	public static ArrayList<NPEActionSheetButtonsController> parseActionSheetButtons(
			NSObject[] obj, GenApp genApp, DefFile defFile) throws Exception {
		ArrayList<NPEActionSheetButtonsController> buttonsController = new ArrayList<NPEActionSheetButtonsController>();
		for (NSObject o : obj) {
			NSDictionary dictionary = (NSDictionary) o;
			NPEActionSheetButtonsController button = new NPEActionSheetButtonsController();
			for (String key : dictionary.allKeys()) {
				if (key.equalsIgnoreCase("title"))
					button.setButtonTitle(dictionary.objectForKey(key)
							.toString());
				else if (key.equalsIgnoreCase("actions"))
					button.setEvent(parseEvent(
							(NSDictionary) dictionary.objectForKey(key),
							genApp, defFile));
				else if (key.equalsIgnoreCase("id"))
					button.setButtonId(dictionary.objectForKey(key).toString());

			}
			buttonsController.add(button);

		}

		return buttonsController;

	}

	public static ArrayList<Event> parseActionSheetButtonEvents(NSObject[] obj,
			GenApp genApp, DefFile defFile) throws Exception {
		ArrayList<Event> eventList = new ArrayList<Event>();
		for (NSObject o : obj) {
			NSDictionary dic = (NSDictionary) o;
			Event event = null;
			for (String key : dic.allKeys()) {
				event = new Event();
				event.setEventName(key);
				event.setAction(parseAction(
						((NSArray) dic.objectForKey(key)).getArray(), genApp,
						defFile));
				eventList.add(event);

			}
		}
		return eventList;
	}

	protected static GroupCase parseGroupCase(NSDictionary dic)
			throws Exception {
		GroupCase groupCase = new GroupCase();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("cases"))
				groupCase.setCases(parseCases(((NSArray) dic.objectForKey(key))
						.getArray()));
			else if (key.equalsIgnoreCase("groupcases"))
				groupCase.setGroupCases(parseGroupCases(((NSArray) dic
						.objectForKey(key)).getArray()));
		}
		return groupCase;
	}

	public static int getScreenIndex(DefFile defFile) 
			throws Exception{
		int screenIndex = 0;
		if(defFile.getFileName() != null) {
			int count = 0;
			for (int i = 0; i < defFile.getFileName().length(); i++) {
			    if (defFile.getFileName().charAt(i) == '_') {
			        count++;
			    }
			}
			
			if(count > 1) {
				screenIndex = Character.getNumericValue(defFile.getFileName().charAt(defFile.getFileName().length() - 1));
			}
			System.out.println("screenIndex--"+ screenIndex);
			
		}
		return screenIndex;
	}
}
