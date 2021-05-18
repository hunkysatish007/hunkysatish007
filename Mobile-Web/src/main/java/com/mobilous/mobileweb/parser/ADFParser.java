package com.mobilous.mobileweb.parser;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.dd.plist.NSArray;
import com.dd.plist.NSDictionary;
import com.dd.plist.NSNumber;
import com.dd.plist.NSObject;
import com.dd.plist.PropertyListParser;
import com.mobilous.mobileweb.action.Action;
import com.mobilous.mobileweb.app.DefFile;
import com.mobilous.mobileweb.app.DefFileSet;
import com.mobilous.mobileweb.app.Fields;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.app.LocationDefs;
import com.mobilous.mobileweb.app.MainFile;
import com.mobilous.mobileweb.app.Page;
import com.mobilous.mobileweb.app.Screen;
import com.mobilous.mobileweb.app.TabSet;
import com.mobilous.mobileweb.app.TableDefs;
import com.mobilous.mobileweb.app.Tabs;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.Gadget;
import com.mobilous.mobileweb.util.PlistLocator;
import com.mobilous.mobileweb.util.RemotePlistLocator;
import com.mobilous.mobileweb.util.Utility;

public class ADFParser {

	static PlistLocator locator;
	public static Map<String, String> languageConvertor = null;
	private static final String INITIAL_ADF_NAME = "GenApp.plist";
	private static final String ADF_EXTENSION = ".plist";
	protected static String MODE = "";
	protected static final Logger logger = LoggerFactory
			.getLogger(ADFParser.class);
	public static String parentUI = "Page";
	public static String parentUIName = "";
	public static String userId = "";
	public static String projectId = "";
	public String language = "";

	public static final boolean DEBUG_MODE = false;
	private static List<Gadget> gadgetsList ;
	private Map<String,Map<String, String>> languageList = null;
	
	
	public static List<Gadget> getGadgetsList() {
		return gadgetsList;
	}

	public static void setGadgetsList(List<Gadget> gadgetsList) {
		ADFParser.gadgetsList = gadgetsList;
	}

	public ADFParser(PlistLocator locator, String mode) {
		super();
		ADFParser.locator = locator;
		ADFParser.MODE = mode;
		ADFParser.setGadgetsList(new ArrayList<Gadget>());
		PageViewParser.splitViewPageSets.clear();
		PageViewParser.pageScrollViewPageSets.clear();
	}

	public GenApp parseStream() {
		// System.out.println("...........PARSING GENAPP.PLIST File.....");
		return this.parseGenAppFromStream(ADFParser.locator
				.getStream(INITIAL_ADF_NAME));
	}

	public static ArrayList<LocationDefs> parseLocationDefs(NSObject[] obj)
			throws Exception {
		ArrayList<LocationDefs> locDefList = new ArrayList<LocationDefs>();

		LocationDefs locDef;
		for (NSObject o : obj) {
			NSDictionary dic = (NSDictionary) o;
			locDef = new LocationDefs();
			for (String key : dic.allKeys()) {
				if (key.equalsIgnoreCase("status"))
					locDef.setStatus(((NSNumber) dic.objectForKey(key))
							.boolValue());
				else if (key.equalsIgnoreCase("lattitude"))
					locDef.setLattitude(((NSNumber) dic.objectForKey(key))
							.doubleValue());
				else if (key.equalsIgnoreCase("longitude"))
					locDef.setLongitude(((NSNumber) dic.objectForKey(key))
							.doubleValue());
				else if (key.equalsIgnoreCase("radius"))
					locDef.setRadius(((NSNumber) dic.objectForKey(key))
							.intValue());
				else if (key.equalsIgnoreCase("accuracy"))
					locDef.setAccuracy(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("AreaID"))
					locDef.setAreaID(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("AreaName"))
					locDef.setAreaName(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("Course"))
					locDef.setCourse(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("RegionID"))
					locDef.setRegionID(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("RegionName"))
					locDef.setRegionName(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("Summary"))
					locDef.setSummary(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("Description"))
					locDef.setDescription(dic.objectForKey(key).toString());
				else if (DEBUG_MODE)
					throw new Exception("Unknown Key: " + key);
				else
					logger.debug("parseLocationDefs parse: Unknown key found: "
							+ key);
			}
			locDefList.add(locDef);
		}
		return locDefList;
	}

	public ArrayList<TableDefs> parseTableDefs(NSObject[] obj) throws Exception {
		ArrayList<TableDefs> tblDefList = new ArrayList<TableDefs>();

		TableDefs tblDef;

		// if(obj.length > 0){
		for (NSObject o : obj) {
			NSDictionary dic = (NSDictionary) o;
			tblDef = new TableDefs();
			for (String key : dic.allKeys()) {
				if (key.equalsIgnoreCase("tablename"))
					tblDef.setTableName(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("csvfilename"))
					tblDef.setCsvfilename(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("description"))
					tblDef.setDescription(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("view"))
					tblDef.setView(((NSNumber) dic.objectForKey(key)).boolValue());
				else if (key.equalsIgnoreCase("script"))
					tblDef.setViewScript(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("trigger"))
					tblDef.setTrigger(((NSNumber) dic.objectForKey(key)).boolValue());
				else if (key.equalsIgnoreCase("triggername")) {
					tblDef.setTriggerName(dic.objectForKey(key).toString());
					if(tblDef.getViewScript().toLowerCase().contains("trigger"))
						tblDef.setTriggerScript(tblDef.getViewScript());
				}
				else if (key.equalsIgnoreCase("script"))
					tblDef.setTriggerScript(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("fields"))
					tblDef.setFields(parseFields(((NSArray) dic
							.objectForKey(key)).getArray()));
				else if (DEBUG_MODE)
					throw new Exception("Unknown Key: " + key);
				else
					logger.debug("parseTableDefs parse: Unknown key found: "
							+ key);
			}
			tblDefList.add(tblDef);
		}
		// }
		return tblDefList;
	}

	public static ArrayList<Fields> parseFields(NSObject[] obj)
			throws Exception {
		ArrayList<Fields> fieldsList = new ArrayList<Fields>();

		Fields fields;

		// if(obj.length > 0){
		for (NSObject o : obj) {
			NSDictionary dic = (NSDictionary) o;
			fields = new Fields();
			for (String key : dic.allKeys()) {
				if (key.equalsIgnoreCase("fieldname"))
					fields.setFieldName(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("dbType"))
					fields.setDbType(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("primary"))
					fields.setPrimaryKey(((NSNumber) dic.objectForKey(key))
							.boolValue());
				else if (key.equalsIgnoreCase("autoinc"))
					fields.setAutoInc(((NSNumber) dic.objectForKey(key))
							.boolValue());
				else if (key.equalsIgnoreCase("defaultValue"))
					fields.setDefaultValue(dic.objectForKey(key).toString());
				else if (DEBUG_MODE)
					throw new Exception("Unknown Key: " + key);
				else
					logger.debug("parseFields parse: Unknown key found: " + key);
			}
			fieldsList.add(fields);
		}
		// }

		return fieldsList;
	}

	public ArrayList<String> parsePlugins(NSObject[] obj) {
		ArrayList<String> pluginList = new ArrayList<String>();
		// if(obj.length > 0){
		for (NSObject o : obj) {
			NSDictionary dic = (NSDictionary) o;
			pluginList.add(dic.objectForKey("name").toString());
		}
		// }
		return pluginList;
	}

	/************************************************************
	 * Events parsing
	 ************************************************************/
	public static ArrayList<Event> parseEvent(NSDictionary dic, GenApp genApp,
			DefFile defFile) throws Exception {
		ArrayList<Event> eventList = new ArrayList<Event>();
		Event event = null;
		for (String key : dic.allKeys()) {
			event = new Event();
			event.setEventName(key);
			event.setAction(parseAction(
					((NSArray) dic.objectForKey(key)).getArray(), genApp,
					defFile));
			eventList.add(event);
			// if(!key.startsWith("ClickedButton-")){
			// event.setEventName(dic.allKeys()[0]);
			// event.setAction(parseAction(((NSArray)dic.objectForKey(dic.allKeys()[0])).getArray(),
			// genApp));
			// }
			// else{
			// event.setEventName("ClickedButton");
			// if(key.equalsIgnoreCase("ClickedButton-0"))
			// event.setClickedButton0(parseAction(((NSArray)dic.objectForKey(dic.allKeys()[0])).getArray(),
			// genApp));
			// else if(key.equalsIgnoreCase("ClickedButton-0"))
			// event.setClickedButton0(parseAction(((NSArray)dic.objectForKey(dic.allKeys()[0])).getArray(),
			// genApp));
			// else if(key.equalsIgnoreCase("ClickedButton-1"))
			// event.setClickedButton1(parseAction(((NSArray)dic.objectForKey(dic.allKeys()[0])).getArray(),
			// genApp));
			// else if(key.equalsIgnoreCase("ClickedButton-2"))
			// event.setClickedButton2(parseAction(((NSArray)dic.objectForKey(dic.allKeys()[0])).getArray(),
			// genApp));
			// }
		}
		return eventList;
	}

	/************************************************************
	 * Actions parsing
	 ************************************************************/
	public static ArrayList<Action> parseAction(NSObject[] obj, GenApp genApp,
			DefFile defFile) throws Exception {
		ArrayList<Action> actionList = new ArrayList<Action>();
		Action action;
		for (NSObject o : obj) {
			NSDictionary dic = (NSDictionary) o;
			action = new Action();
			for (String key : dic.allKeys()) {
				if (key.equalsIgnoreCase("method"))
					action.setMethod(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("category"))
					action.setCategory(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("params"))
					action.setParameters(ParameterParser.parseParams(dic
							.objectForKey("method").toString(),
							(NSDictionary) dic.objectForKey(key), genApp,
							action, defFile));
				else if (key.equalsIgnoreCase("actions"))
					action.setEvent(parseEvent(
							(NSDictionary) dic.objectForKey(key), genApp,
							defFile));
				else if (DEBUG_MODE)
					throw new Exception("Unknown Key: " + key);
				else
					logger.debug("parsePage parse: Unknown key found: " + key);
			}
			actionList.add(action);
		}
		return actionList;
	}

	/************************************************************
	 * Generic Implementations of parser methods
	 ************************************************************/

	// there are 2 types of pages 1 is Tabs for a page in a Tab
	// or Actions where where a page for Actions
	// TODO: the parameter typeOfDef is not needed
	public static DefFile parseDefFile(NSDictionary dic, GenApp genapp,
			String defFileID, String typeOfDef) throws Exception {
		logger.debug("parseDefFile: starting...");
		DefFile defFile = new DefFile();
		DefFileSet defFileSet = new DefFileSet();
		// DefFile defFile =
		// genApp.getDefFile(dic.objectForKey("filename").toString(), defFileID,
		// typeOfDef);
		//
		// //check if the DefFile has already been parsed, if so get the DefFile
		// //if not read parse the DefFile
		// if(defFile!=null){
		// genApp.addPages(defFile);
		// return defFile;
		// }
		// else{
		// defFile = new DefFile();
		// defFile.setDefFileID(defFileID);
		// }
		// private Point frame = null;
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("srcLocation"))
				defFile.setSrcLocation(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("filename")) {
				if (!genapp.getIndex().equalsIgnoreCase("0"))
					defFile.setFileName(dic.objectForKey(key).toString() + "_"
							+ genapp.getIndex());
				else
					defFile.setFileName(dic.objectForKey(key).toString());
			} else if (key.equalsIgnoreCase("fileext"))
				defFile.setFileExt(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("url"))
				defFile.setUrl(dic.objectForKey(key).toString());
			// else
			// throw new Exception("Unknown Key: "+key);
			// logger.debug("parseDefFile parse: Unknown key found: " + key);
		}

		// CHECK FOR THE EXISTENCE OF THE DEFFILE THEN RETURN IT INSTEAD
		DefFile existingDef = Utility.getDefFileByID(genapp.getPages(),
				(defFile.getDefFileID() + " " + defFileID + " " + defFile
						.getFileName()).trim().replace(" ", "_"));
		if (existingDef != null)
			return existingDef;

		// System.out.println(existingDef.getDefFileID() + "HEYYYYYY");
		// for (DefFile deffile : pages) {
		// if (deffile.getDefFileID().equalsIgnoreCase(defFileID)) {
		// return deffile;
		// }
		// }

		logger.debug(defFile.getDefFileID() + " " + defFileID + " "
				+ defFile.getFileName());

		defFile.setDefFileID(defFile.getDefFileID() + " " + defFileID + " "
				+ defFile.getFileName());
		// ALTER PAGE's data based on the typeOfDef
		if (typeOfDef.indexOf("DbPageScrollView") == 0) {
			String number = typeOfDef.substring(16, typeOfDef.length());
			defFile.setDefFileID(defFile.getDefFileID() + number);
		}

		Page page = null;
		try{
			page = PageViewParser.parsePage(genapp, defFile);
			if(page == null){
				return null;
			}
			page.setParent(defFileID);
		}catch (Exception e) {
			// TODO: handle exception
			return null;
		}
		
		defFile.setPage(page);
		//genapp.addPages(defFile);
		
		Boolean isExist = false;
 		int count = 0; 		
 		while (genapp.getPages().size() > count) {
 			String currentpageId = defFile.getFileName().replace("page_", "");       //defFile.getDefFileID().substring(defFile.getDefFileID().lastIndexOf('_')+1);
 			String iteratepageId = genapp.getPages().get(count).getDefFileID().substring(genapp.getPages().get(count).getDefFileID().lastIndexOf("page_")+5);
 			if(iteratepageId.equalsIgnoreCase(currentpageId)){
 				isExist = true;
 			}
 			count++;
 		}
 		if(!isExist && !typeOfDef.equalsIgnoreCase("PageScrollView"))
 			genapp.addPages(defFile);
 		
		return defFile;
	}

	public ArrayList<Tabs> parseTabs(NSObject[] obj, GenApp genApp, String index)
			throws Exception {
		// logger.debug("parseTabs: starting...");
		ArrayList<Tabs> tabsList = new ArrayList<Tabs>();
		genApp.setIndex(index);
		Tabs tabs;
		int tab = 0;
		for (NSObject o : obj) {
			NSDictionary dic = (NSDictionary) o;
			tabs = new Tabs();
			for (String key : dic.allKeys()) {
				if (key.equalsIgnoreCase("deffile"))
					tabs.setDefFile(parseDefFile((NSDictionary) dic.objectForKey(key), genApp, "Tab" + ++tab, "Tab"));
				else if (DEBUG_MODE)
					throw new Exception("Unknown Key: " + key);
				else
					logger.debug("parseTabs parse: Unknown key found: " + key);
			}
			tabsList.add(tabs);
		}
		return tabsList;
	}

	/*
	 * public ArrayList<TabSet> parseTabSet(NSObject[] obj, GenApp genApp)
	 * throws Exception { // logger.debug("parseTabs: starting...");
	 * ArrayList<TabSet> tabsList = new ArrayList<TabSet>(); Tabs tabs; int tab
	 * = 0; for (NSObject o : obj) { NSDictionary dic = (NSDictionary) o; tabs =
	 * new Tabs(); for (String key : dic.allKeys()) { if
	 * (key.equalsIgnoreCase("deffile")) tabs.setDefFile(parseDefFile(
	 * (NSDictionary) dic.objectForKey(key), genApp, "Tab" + ++tab, "Tab"));
	 * else if (DEBUG_MODE) throw new Exception("Unknown Key: " + key); else
	 * logger.debug("parseTabs parse: Unknown key found: " + key); }
	 * tabsList.add(tabs); } return tabsList; }
	 */

	public ArrayList<Screen> parseScreens(NSObject[] obj, GenApp genApp)
			throws Exception {
		// logger.debug("parseScreen: starting...");
		ArrayList<Screen> screens = new ArrayList<Screen>();
		Screen screen;
		int tab = 0;
		for (NSObject o : obj) {
			NSDictionary dic = (NSDictionary) o;
			screen = new Screen();
			for (String key : dic.allKeys()) {
				if (key.equalsIgnoreCase("height")) {
					screen.setHeight(dic.objectForKey(key).toString());
				} else if (key.equalsIgnoreCase("width")) {
					screen.setWidth(dic.objectForKey(key).toString());
				} else if (key.equalsIgnoreCase("orientation")) {
					screen.setOrientation(dic.objectForKey(key).toString());
				} else if (key.equalsIgnoreCase("embed")) {
					screen.setEmbed(dic.objectForKey(key).toString());
				}
			}
			screens.add(screen);
		}
		return screens;
	}

	public MainFile parseMainFileFromStream(InputStream in, GenApp genApp) {
		logger.debug("parseMainFileFromStream: starting...");
		// System.out.println("...........Parsing Main File Nowww............");
		try {
			MainFile mainFile = new MainFile();
			DefFile defFile = new DefFile();
			NSDictionary dic = (NSDictionary) PropertyListParser.parse(in);
			//PN Key
 			ArrayList<String> config = new ArrayList<String>(2); 
// 			String APIkey = "apiKey:"+ "\""+"AIzaSyBSHPNShlIbxofqciBQmlELFdyuuoquLKY"+ "\"";
// 			String messagingSenderId = "messagingSenderId:"+ "\"" +"134645402988"+ "\"";
// 			config.add(APIkey);
// 			config.add(messagingSenderId);
// 			mainFile.setPNConfig(config);//
			for (String key : dic.allKeys()) {
				if (key.equalsIgnoreCase("Title"))
					mainFile.setTitle(dic.objectForKey(key).toString());
				if (key.equalsIgnoreCase("ProjectName"))
					mainFile.setProjectName(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("devicetype"))
					mainFile.setDevicetype(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("version"))
					mainFile.setVersion(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("releaseversion")){
					mainFile.setReleaseVersion(dic.objectForKey(key).toString());	
					genApp.setReleaseVersion(dic.objectForKey(key).toString());
				}else if (key.equalsIgnoreCase("LocationServer"))
					mainFile.setLocationServer(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("GoogleMapKeyDevelopment"))
					mainFile.setGoogleMapKeyDevelopment(dic.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("GoogleMapKeyProduction"))
					mainFile.setGoogleMapKeyProduction(dic.objectForKey(key).toString());
				else if (key
						.equalsIgnoreCase("googleApiClientIdForDevelopment"))
					mainFile.setClientIdPreview(dic.objectForKey(key)
							.toString());
				else if (key
						.equalsIgnoreCase("googleApiRedirectUriForDevelopment"))
					mainFile.setRedirectURIPreview(dic.objectForKey(key)
							.toString());
				else if (key.equalsIgnoreCase("googleApiClientIdForProduction"))
					mainFile.setClientIdProduction(dic.objectForKey(key)
							.toString());
				else if (key
						.equalsIgnoreCase("googleApiRedirectUriForProduction"))
					mainFile.setRedirectURIProduction(dic.objectForKey(key)
							.toString());
				else if (key.equalsIgnoreCase("projectbuilder")) {
					mainFile.setProjectBuilder(((NSNumber) dic
							.objectForKey(key)).intValue());
					genApp.setProjectBuilder(((NSNumber) dic.objectForKey(key))
							.intValue());
				} else if (key.equalsIgnoreCase("LocationDefs"))
					mainFile.setLocationDefs(parseLocationDefs(((NSArray) dic
							.objectForKey(key)).getArray()));
				else if (key.equalsIgnoreCase("TableDefs"))
					mainFile.setTableDefs(parseTableDefs(((NSArray) dic
							.objectForKey(key)).getArray()));
				else if (key.equalsIgnoreCase("RemoteTableDefs"))
					mainFile.setRemoteTblDefs(parseTableDefs(((NSArray) dic
							.objectForKey(key)).getArray()));
				else if (key.equalsIgnoreCase("pnEvents"))//Richa
					mainFile.setPnevents(parseEvent(
							(NSDictionary) dic.objectForKey(key), genApp,
							defFile));
				else if (key.equalsIgnoreCase("appEvents"))//Richa
					mainFile.setAppevents(parseEvent(
							(NSDictionary) dic.objectForKey(key), genApp,
							defFile));
				else if (key.equalsIgnoreCase("Tabs")) {
					if(dic.objectForKey("l10ns") != null){
						parseLocalizationPlists(((NSArray) dic.objectForKey("l10ns")).getArray(),
								genApp);
					}
					
					if(ADFParser.MODE.equalsIgnoreCase("preview")){
						genApp.setIndex("0");
						genApp.setProjectstate("preview");
					}else{
						mainFile.setNumberOfScreens((((NSArray) dic
								.objectForKey("availableScreens")).getArray()).length);
						mainFile.setScreens(parseScreens(
								((NSArray) dic.objectForKey("availableScreens")).getArray(),
								genApp));
					}
					
					parseMainFileTabs(genApp, mainFile, dic, key);
				} else if (key.equalsIgnoreCase("BaseURL")) {
					System.out.println("FULL BASE URL : " + dic.objectForKey(key).toString());
					genApp.setFullBaseURL(dic.objectForKey(key).toString());
					if (genApp.getBaseURL().equalsIgnoreCase("")) {
						
						String base = dic.objectForKey(key).toString();
						int basepos = base.indexOf("/appexe/");
						if(basepos != -1){
							String[] nameNid = base.substring(basepos + 8).split("/");
							genApp.setBaseURL(base.substring(0, basepos));
							if (genApp.getUserId().equalsIgnoreCase(""))
								genApp.setUserId(nameNid[0]);
							if (genApp.getProjectId().equalsIgnoreCase(""))
								genApp.setProjectId(nameNid[1]);
						}else{
							
							base = base.substring(base.indexOf("://")+3, base.length());
							System.out.println("BASE : " + base);
							//String[] nameNid = base.substring(base.indexOf("://")+2).split("/");
							genApp.setBaseURL("https://"+base.substring(0, base.indexOf("/")));
							System.out.println(genApp.getBaseURL());
							/*if (genApp.getUserId().equalsIgnoreCase(""))
								genApp.setUserId(nameNid[0]);
							if (genApp.getProjectId().equalsIgnoreCase(""))
								genApp.setProjectId(nameNid[1]);*/
						}
						
					
						
						}
				} else if (key.equalsIgnoreCase("OpeningImage"))
					mainFile.setSplashScreenMobile(AttributeParser
							.parseImageFile((NSDictionary) dic
									.objectForKey(key)));
				else if (key.equalsIgnoreCase("OpeningImageTablet"))
					mainFile.setSplashScreenTablet(AttributeParser
							.parseImageFile((NSDictionary) dic
									.objectForKey(key)));
				else if (key.equalsIgnoreCase("projectstate"))
					genApp.setProjectstate(dic.objectForKey(key).toString());
				/*else if (key.equalsIgnoreCase("l10ns"))
					mainFile.getResource().setL10nsList(
							ResourceParser.parseL10NS(((NSArray) dic
									.objectForKey(key)).getArray()));*/
				else if (key.equalsIgnoreCase("bgms"))
					mainFile.getResource().setBgmsList(
							ResourceParser.parseBGMS(((NSArray) dic
									.objectForKey(key)).getArray()));
				else if (key.equalsIgnoreCase("databases"))
					mainFile.getResource().setDatabaseList(
							ResourceParser.parseDatabases(((NSArray) dic
									.objectForKey(key)).getArray()));
				else if (key.equalsIgnoreCase("images"))
					mainFile.getResource().setImageList(
							ResourceParser.parseImages(((NSArray) dic
									.objectForKey(key)).getArray()));
				else if (key.equalsIgnoreCase("soundeffects"))
					mainFile.getResource().setSoundList(
							ResourceParser.parseSoundEffects(((NSArray) dic
									.objectForKey(key)).getArray()));
				else if (key.equalsIgnoreCase("videos"))
					mainFile.getResource().setVideoList(
							ResourceParser.parseVideos(((NSArray) dic
									.objectForKey(key)).getArray()));
				else if (key.equalsIgnoreCase("WebPNConfig")) {
					NSDictionary webPNConfigDict = (NSDictionary) dic.objectForKey(key);
					for (String k : webPNConfigDict.allKeys()) {
						if (k.equalsIgnoreCase("apiKey")) {
							String APIkey = "apiKey:"+ "\""+ webPNConfigDict.objectForKey(k) + "\"";
				 			config.add(APIkey);
						}else if(k.equalsIgnoreCase("messagingSenderId")) {
							String messagingSenderId = "messagingSenderId:"+ "\"" + webPNConfigDict.objectForKey(k) + "\"";
				 			config.add(messagingSenderId);
						}
						else if(k.equalsIgnoreCase("projectId")) {
							String messagingSenderId = "projectId:"+ "\"" + webPNConfigDict.objectForKey(k) + "\"";
				 			config.add(messagingSenderId);
						}else if(k.equalsIgnoreCase("appId")) {
							String messagingSenderId = "appId:"+ "\"" + webPNConfigDict.objectForKey(k) + "\"";
				 			config.add(messagingSenderId);
						}
						mainFile.setWebPNConfig(config);
					}
				}
				else if (key.equalsIgnoreCase("WebPNKey"))
					mainFile.setWebPNKey(dic.objectForKey(key).toString());
//				else if (key.equalsIgnoreCase("others")) {
//					String otherPlistURL = "files/UI-FieldDefinition.plist";
//					InputStream childrenStream = locator.getStream("UI-FieldDefinition.plist");
//					NSDictionary otherChildrenDict = null;
//					if(childrenStream != null){
//						
//						ByteArrayOutputStream buffer = new ByteArrayOutputStream();
//						int nRead;
//						byte[] data = new byte[16384];
//						
//						while ((nRead = childrenStream.read(data, 0, data.length)) != -1) {
//							buffer.write(data, 0, nRead);
//						}
//						buffer.flush();
//						
//						try {
//							otherChildrenDict = (NSDictionary) PropertyListParser.parse(buffer.toByteArray());
//							otherChildrenDict.createObject(otherChildrenDict, 0);
//						} catch (Exception e) {
//							System.out.println("PLIST DOES NOT EXIST/INVALID: "+ otherPlistURL);
//							e.printStackTrace();
//							return null;
//						}
//						
//						childrenStream.close();
//					}
//				}
				else if (key.equalsIgnoreCase("supportstyle")) {
					AttributeParser.parseAndSetSupportStyle(
							(NSDictionary) dic.objectForKey(key), mainFile);
				} else if (key.equalsIgnoreCase("availableScreens")) {
					mainFile.setNumberOfScreens((((NSArray) dic
							.objectForKey(key)).getArray()).length);
					mainFile.setScreens(parseScreens(
							((NSArray) dic.objectForKey(key)).getArray(),
							genApp));
				} /*else if (key.equalsIgnoreCase("l10ns")){
					parseLocalizationPlists(((NSArray) dic.objectForKey(key)).getArray(),
							genApp);
				}*/else if (DEBUG_MODE)
					throw new Exception("Unknown Key: " + key);
				else
					logger.debug("MainFile parse: Unknown key found: " + key);
			}
			// Parsing Localization
			/*if(dic.objectForKey("l10ns") != null){
				parseLocalizationPlists(((NSArray) dic.objectForKey("l10ns")).getArray(),
						genApp);
			}
			*/
			return mainFile;
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("MainFile parse failed: " + e.getMessage());
			return null;
		}
	}


	private void parseMainFileTabs(GenApp genApp, MainFile mainFile,
			NSDictionary dic, String key) throws Exception {
		ArrayList<TabSet> tabSets = new ArrayList<TabSet>();
		ArrayList<DefFileSet> defFileSets = new ArrayList<DefFileSet>();
		
		if(genApp.getProjectstate().equalsIgnoreCase("preview")){
				TabSet set = new TabSet();
				DefFileSet defFileSet = new DefFileSet();
				set.setTabs(parseTabs(
						((NSArray) dic.objectForKey(key)).getArray(),
						genApp,genApp.getIndex()));
				tabSets.add(set);
				defFileSet.setDefFiles(genApp.getPages());
				genApp.setPages(new ArrayList<DefFile>());
				defFileSets.add(defFileSet);

			mainFile.setTabSets(tabSets);
			genApp.addDefFileSet(defFileSets);
		}else{
			String index = "0";
			for (int i = 0; i < mainFile.getNumberOfScreens(); i++) {
				index = String.valueOf(i);
				TabSet set = new TabSet();
				DefFileSet defFileSet = new DefFileSet();
				set.setTabs(parseTabs(
						((NSArray) dic.objectForKey(key)).getArray(),
						genApp, index));
				tabSets.add(set);
				defFileSet.setDefFiles(genApp.getPages());
				genApp.setPages(new ArrayList<DefFile>());
				defFileSets.add(defFileSet);

			}
			mainFile.setTabSets(tabSets);
			genApp.addDefFileSet(defFileSets);
			/*
			 * mainFile.setTabs(parseTabs( ((NSArray)
			 * dic.objectForKey(key)).getArray(), genApp));
			 */
		}
		
	}

	public GenApp parseGenAppFromStream(InputStream in) {
		// logger.debug("parseGenAppFromStream: starting...");
		try {
			GenApp genApp = new GenApp();
			NSDictionary rootDict = (NSDictionary) PropertyListParser.parse(in);
			for (String key : rootDict.allKeys()) {

				if (key.equalsIgnoreCase("starturl"))
					genApp.setStartUrl(rootDict.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("apptitle"))
					genApp.setAppTitle(rootDict.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("icontitle"))
					genApp.setIconTitle(rootDict.objectForKey(key).toString());
				else if (key.equalsIgnoreCase("DBlog"))
					genApp.setDBLog(((NSNumber) rootDict.objectForKey(key))
							.boolValue());
				else if (key.equalsIgnoreCase("mainfile"))
					genApp.setMainFile(parseMainFileFromStream(
							locator.getStream(rootDict.objectForKey(key)
									.toString() + ADF_EXTENSION), genApp));
				else if (key.equalsIgnoreCase("UIObject-Plugin"))
					genApp.setUiObjectPlugin(parsePlugins(((NSArray) rootDict
							.objectForKey(key)).getArray()));
				else if (key.equalsIgnoreCase("Action-Plugin"))
					genApp.setActionPlugin(parsePlugins(((NSArray) rootDict
							.objectForKey(key)).getArray()));
				else if (key.equalsIgnoreCase("DeviceObject-Plugin"))
					genApp.setDeviceObjectPlugin(parsePlugins(((NSArray) rootDict
							.objectForKey(key)).getArray()));
				else if (DEBUG_MODE)
					throw new Exception("Unknown Key: " + key);
				else
					logger.debug("GenApp parse: Unknown key found: " + key);
			}
			return genApp;
		} catch (Exception e) {
			logger.debug("GenApp parse failed: " + e.getMessage());
			e.printStackTrace();
			return null;
		}
	}
	
	private void parseLocalizationPlists(NSObject[] array, GenApp genApp) {
		if(ADFParser.MODE.equalsIgnoreCase("preview")){
			for (NSObject o : array) {
				NSDictionary dic = (NSDictionary) o;
				for(String key : dic.allKeys()){
					if(key.equalsIgnoreCase("filename")){
					//	if(dic.objectForKey(key).toString().endsWith("_hi.plist") && getLanguage().equalsIgnoreCase("hi")){
						if(dic.objectForKey(key).toString().indexOf(getLanguage()) != -1){
							languageConvertor = loadLanguageData(genApp, dic, key);
						}
					}
				}
			}
		}else{
			languageList = new HashMap<String, Map<String,String>>();
			for (NSObject o : array) {
				NSDictionary dic = (NSDictionary) o;
				for(String key : dic.allKeys()){
					if(key.equalsIgnoreCase("filename")){
						//languageConvertor = loadLanguageData(genApp, dic, key);
						String language = dic.objectForKey(key).toString().substring(dic.objectForKey(key).toString().indexOf("_")+1,dic.objectForKey(key).toString().indexOf(".plist"));
						languageList.put(language,loadLanguageData(genApp, dic, key));
					}
				}
			}
		}

	}

	private Map<String, String> loadLanguageData(GenApp genApp, NSDictionary dic, String key) {
		Map<String, String> languageConvertorData = new HashMap<String, String>();
		PlistLocator languagePlistLocator = new RemotePlistLocator(genApp.getBaseURL().replace("https", "http") + ":8080/appexe/api/download/l10n/" + ADFParser.projectId);
		try {
			NSDictionary languageDict = (NSDictionary) PropertyListParser.parse(languagePlistLocator.getStream(dic.objectForKey(key).toString()));
			for(String languageKey : languageDict.allKeys()){
				languageConvertorData.put(languageKey, languageDict.objectForKey(languageKey).toString());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return languageConvertorData;
	}

	public void setLanguage(String language) {
		this.language = language;
		
	}
	public String getLanguage() {
		return language;
		
	}

	public Map<String, Map<String, String>> getLanguageList() {
		return languageList;
	}

	public void setLanguageList(Map<String, Map<String, String>> languageList) {
		this.languageList = languageList;
	}
}
