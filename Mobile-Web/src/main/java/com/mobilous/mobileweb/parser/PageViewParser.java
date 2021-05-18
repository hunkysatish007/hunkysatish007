package com.mobilous.mobileweb.parser;

import java.io.InputStream;
import java.util.ArrayList;

import com.dd.plist.NSArray;
import com.dd.plist.NSDictionary;
import com.dd.plist.NSNumber;
import com.dd.plist.NSObject;
import com.dd.plist.PropertyListParser;
import com.mobilous.mobileweb.app.DefFile;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.app.Page;
import com.mobilous.mobileweb.app.PageScrollViewPageSet;
import com.mobilous.mobileweb.app.SplitViewPageSet;
import com.mobilous.mobileweb.ui.PageOverlay;
import com.mobilous.mobileweb.util.PlistLocator;

public class PageViewParser extends ADFParser { 
	static ArrayList<SplitViewPageSet> splitViewPageSets = new ArrayList<SplitViewPageSet>();
	
	static ArrayList<PageScrollViewPageSet> pageScrollViewPageSets = new ArrayList<PageScrollViewPageSet>();
	
	public PageViewParser(PlistLocator locator) {
		super(locator, MODE);
		PageViewParser.splitViewPageSets.clear();
		PageViewParser.pageScrollViewPageSets.clear();
	}

	public static Page parsePage(GenApp genApp, DefFile defFile)
			throws Exception {
		Page page = new Page(defFile.getDefFileID());
		ArrayList<PageOverlay> pageOverlaySets = new ArrayList<PageOverlay>();
		
		InputStream stream = locator.getStream(defFile.getFileName() + '.'
				+ defFile.getFileExt());
		if (stream == null)
			return null;

		NSDictionary pageDict = null;

		try {
			pageDict = (NSDictionary) PropertyListParser.parse(stream);
		} catch (Exception e) {
			System.out.println("PAGE DOES NOT EXIST/INVALID: "+ defFile.getFileName() + '.' + defFile.getFileExt());
			e.printStackTrace();
			return null;
		}

		page.setViewType(pageDict.objectForKey("viewType").toString());
		//System.out.println(">>" + page.getViewType());
		for (String key : pageDict.allKeys()) {
			try {
				if (key.equalsIgnoreCase("title")){
					page.setTitle(pageDict.objectForKey(key).toString());
				}else if (key.equalsIgnoreCase("TabBarHidden")) {
					page.setTabBarHidden(((NSNumber) pageDict.objectForKey(key))
							.boolValue());
				} else if (key.equalsIgnoreCase("StatusBarHidden")) {
					page.setStatusbar(((NSNumber) pageDict.objectForKey(key))
							.boolValue());
				} else if (key.equalsIgnoreCase("NavigationBarHidden")) {
					page.setNavigationBarHidden(((NSNumber) pageDict
							.objectForKey(key)).boolValue());
				} else if (key.equalsIgnoreCase("backgroundColor") && !page.getViewType().equalsIgnoreCase("ScrollView")) {
					page.setBackgroundColor(AttributeParser
							.parseColor((NSDictionary) pageDict
									.objectForKey(key)));
					page.getViewType();
				} else if (key.equalsIgnoreCase("navigationBar")) {
						page.setNavigationBar(UIParser.parseNavigationBar(
								(NSDictionary) pageDict.objectForKey(key), genApp,
								defFile));
				} else if (key.equalsIgnoreCase("toolBarTop")) {
					page.setToolbarTop(UIParser.parseToolBarTop(
							(NSDictionary) pageDict.objectForKey(key), genApp,
							defFile));
				} else if (key.equalsIgnoreCase("toolBarBottom")) {
					page.setToolbarBottom(UIParser.parseToolBarBottom(
							(NSDictionary) pageDict.objectForKey(key), genApp,
							defFile));
				}else if (key.equalsIgnoreCase("SideBarHidden")) {
					page.setSideBarHidden(((NSNumber) pageDict.objectForKey(key))
							.boolValue());
				} else if (key.equalsIgnoreCase("SideBarPosition")) {
					page.setSideBarPosition(pageDict.objectForKey(key).toString());
				} else if (key.equalsIgnoreCase("toolBarright")) {
					page.setToolbarRight(UIParser.parseToolBarRight(
							(NSDictionary) pageDict.objectForKey(key), genApp,
							defFile));
				} else if (key.equalsIgnoreCase("toolBarleft")) {
					page.setToolbarLeft(UIParser.parseToolBarLeft(
							(NSDictionary) pageDict.objectForKey(key), genApp,
							defFile));
				} else if (key.equalsIgnoreCase("frame")) {
					page.setFrame(AttributeParser
							.parsePoint((NSDictionary) pageDict
									.objectForKey(key)));
				} else if (key.equalsIgnoreCase("TabTintColor")) {
					page.setTabColor(AttributeParser
							.parseColor((NSDictionary) pageDict
									.objectForKey(key)));
				}else if (key.equalsIgnoreCase("actions")){
					page.setEvent(parseEvent((NSDictionary) pageDict.objectForKey(key), genApp, defFile));
				} else if (key.equalsIgnoreCase("Children")) {
					if (page.getViewType().equalsIgnoreCase("PageScrollView")) {
						PageScrollViewPageSet pageScrollViewPageSet = new PageScrollViewPageSet();
						NSObject[] dicpg = ((NSArray) pageDict.objectForKey("Children")).getArray();
						for (NSObject pg : dicpg) {
							NSDictionary d = (NSDictionary) pg;
							for (String k : d.allKeys()) {
								if (k.equalsIgnoreCase("pages")) {
									genApp.addPageScrollViewPages(UIParser.parsePages(
											((NSArray) d.objectForKey(k))
													.getArray(), genApp, defFile, page));
									pageScrollViewPageSet.setPageScrollViewPages(genApp.getPageScrollViewPages());
									PageViewParser.pageScrollViewPageSets.add(PageViewParser.pageScrollViewPageSets.size(), pageScrollViewPageSet);
								}
							}
						}
					}else {
						page.setChildren(UIParser.parseChildren(
							       ((NSArray) pageDict.objectForKey(key)).getArray(),
							       genApp, defFile));
						
						if (page.getViewType().equalsIgnoreCase("ScrollView")) {
							UIParser.parsePages(((NSArray) pageDict
									.objectForKey(key)).getArray(), genApp,
									defFile, page);
						}else if (!page.getViewType()
								.equalsIgnoreCase("SplitView")) {
							page.setPages(UIParser.parsePages(((NSArray) pageDict
									.objectForKey(key)).getArray(), genApp,
									defFile, page));
						}
					}
				}else if (key.equalsIgnoreCase("pageOverlay")) {
					NSDictionary pgo = (NSDictionary) pageDict.objectForKey(key);
					for (String k : pgo.allKeys()) {
//						System.out.println("k----"+k);
						if (k.equalsIgnoreCase("Children")) {
							NSObject[] dicpgOverlayChildren = ((NSArray) pgo.objectForKey(k)).getArray();
							for(NSObject pgoc : dicpgOverlayChildren) {
								NSDictionary d = (NSDictionary) pgoc;
								for (String pgochildren : d.allKeys()) {
//									System.out.println(pgochildren);
									if (pgochildren.equalsIgnoreCase("uiParts")) {
										NSObject[] pgocuiparts = ((NSArray) d.objectForKey(pgochildren)).getArray();
										for(NSObject uiparts : pgocuiparts) {
											NSDictionary pgoui = (NSDictionary) uiparts;
											// take uiparts according to screen id
//											page.setPageOverlay(UIParser.parsePageOverlay(
//													pgoui, genApp,
//													defFile));
											pageOverlaySets.add(UIParser.parsePageOverlay(
													pgoui, genApp,
													defFile));
										}
									}
								}
							}
						}
					}
				}
				else if (key.equalsIgnoreCase("pages")) {
					if (page.getViewType().equalsIgnoreCase("SplitView")) {
						SplitViewPageSet splitViewPageSet = new SplitViewPageSet();
						genApp.addSplitViewPages(UIParser.parsePages(
								((NSArray) pageDict.objectForKey(key))
										.getArray(), genApp, defFile, page));
						splitViewPageSet.setSplitViewPages(genApp.getSplitViewPages());
						PageViewParser.splitViewPageSets.add(PageViewParser.splitViewPageSets.size(), splitViewPageSet);
						
					}else {
						page.setPages(UIParser.parsePages(((NSArray) pageDict
								.objectForKey(key)).getArray(), genApp,
								defFile, page));
					}
				} else if (key.equalsIgnoreCase("Icon")) {
					page.setIcon(AttributeParser
							.parseImageFile((NSDictionary) pageDict
									.objectForKey(key)));
				} else if (key.equalsIgnoreCase("IconTitle")) {
					page.setIconTitle(pageDict.objectForKey(key).toString());
				} else if (key.equalsIgnoreCase("PageOrientation")) {
					page.setPageOrientation(pageDict.objectForKey(key).toString());
				} else if (DEBUG_MODE)
					throw new Exception("Unknown Key: " + key);
				else
					logger.debug("parsePage(): Unknown key found: " + key);
			} catch (Exception e) {
				e.printStackTrace();
				logger.debug("parsePage(): Malformed Tag: " + key);
			}
		}
		
		genApp.addSplitViewPageSet(PageViewParser.splitViewPageSets);
		genApp.addPageScrollViewPageSet(PageViewParser.pageScrollViewPageSets);
		page.setPageOverlay(pageOverlaySets);
		return page;
	}
}
