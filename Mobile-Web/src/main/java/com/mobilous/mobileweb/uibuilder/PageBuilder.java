/**
 * <!This package provides the classes and methods necessary to
 * create HTML Pages that  are made in the appexe.>
 * <p>
 * It invokes various methods to create various types of pages including various ui components.
 * <p>
 * */
package com.mobilous.mobileweb.uibuilder;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONArray;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mobilous.mobileweb.EventBuilder.PageEventBuilder;
import com.mobilous.mobileweb.actionbuilder.ActionBuilder;
import com.mobilous.mobileweb.app.DefFile;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.app.LocalDBSchema;
import com.mobilous.mobileweb.app.RemoteDBSchema;
import com.mobilous.mobileweb.app.Screen;
import com.mobilous.mobileweb.app.TableDefs;
import com.mobilous.mobileweb.app.Tabs;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.PageOverlay;
import com.mobilous.mobileweb.util.Utility;

public class PageBuilder {

	public PageBuilder() {
	}

	private static final Logger logger = LoggerFactory
			.getLogger(PageBuilder.class);

	@SuppressWarnings({ "unchecked", "rawtypes" })
	/**
	 *   This method receives the genapp.
	 *   It generates the codes for the html page which contains ui components.
	 *   Format used is written below( For DBtableViewList Page).The codes are handled in javascript.
	 * @param genApp 
	 * @return HashMap
	 */
	/*
	 * Format Used:
	 * {pid:"1187",user:"sonami",projectname:"localdb",title:"tset",
	 * version:"1.0"
	 * ,baseurl:"http://210.189.125.254",state:"preview",type:"phone",
	 * serveracc:true,localdb:{schema:[]},
	 * splash:{phone:"http://210.189.125.254:8080/appexe/api/download/image/1187/."
	 * ,tablet:"http://210.189.125.254:8080/appexe/api/download/image/1187/."},
	 * tabs:[{id:"tab-1",icon:{image:
	 * "http://210.189.125.254:8080/appexe/api/download/image/1187/."
	 * ,type:"tab"},text:"listview",page:"page_4045"}], pages:[
	 * {height:"480.0",width:"320.0", header:{title:"listview",hidden:false},
	 * name:"page_4045",parent:"Tab1",footer:{hidden:false},
	 * data:{order:"",updated
	 * :false,contents:[],tablename:"tablecsv",wherecond:""}, children:[
	 * {id:"ui-2"
	 * ,viewtype:"DBTableViewList",tablestyle:"Plain",style:"contactform"
	 * ,group:[
	 * {header:"",footer:"",template:{maintext:"[id]",subtext:"[name]",image:"",
	 * icon:{type:"row",style:"arrow-r"},rowsize:42,events:{}}}]}, ],
	 * type:"DBTableViewList"}]}
	 */
	public static Map generateHTMLDataModel(GenApp genapp) {
		Boolean isServerReady = false;
		Map dataModel = new HashMap();
		
		dataModel.put("appTitle", Utility.parseText(genapp.getMainFile().getTitle()));
		
		//GoogleMap API Key
		StringBuilder keyContents = new StringBuilder();
		if(genapp.getMainFile().getApplicationState().equalsIgnoreCase("production"))
			keyContents.append(genapp.getMainFile().getGoogleMapKeyProduction());
		else
			keyContents.append(genapp.getMainFile().getGoogleMapKeyDevelopment());
 		dataModel.put("keyContents", keyContents);

		StringBuilder splashContent = new StringBuilder();
		splashContent
				.append("phone:\"")
				.append(genapp.getMainFile().getSplashScreenMobile()
						.getUrl(genapp)
						+ genapp.getMainFile().getSplashScreenMobile()
								.getFileName()
						+ "."
						+ genapp.getMainFile().getSplashScreenMobile()
								.getFileExt()).append("\",");
		splashContent
				.append("tablet:\"")
				.append(genapp.getMainFile().getSplashScreenTablet()
						.getUrl(genapp)
						+ genapp.getMainFile().getSplashScreenTablet()
								.getFileName()
						+ "."
						+ genapp.getMainFile().getSplashScreenTablet()
								.getFileExt()).append("\"");

		// content contains the blueprint of the project
		StringBuilder contents = new StringBuilder();
		//JSONArray tabArray = new JSONArray();
		contents.append("pid:\"").append(genapp.getProjectId())
				.append("\",\n\t");
		contents.append("user:\"").append(genapp.getUserId()).append("\",\n\t");
		contents.append("projectname:\"")
				.append(genapp.getMainFile().getProjectName())
				.append("\",\n\t");
		contents.append("title:\"").append(Utility.parseText(genapp.getAppTitle()))
				.append("\",\n\t");
		contents.append("version:\"").append(genapp.getMainFile().getVersion())
				.append("\",\n\t");
		contents.append("release:").append(genapp.getMainFile().isRelease())
				.append(",\n\t");
		contents.append("WebPNKey:\"").append(genapp.getMainFile().getWebPNKey())
				.append("\",\n\t");
		if(genapp.getFullBaseURL().indexOf("https") != -1){
			contents.append("fullBaseURL:\"").append(genapp.getFullBaseURL());
		}else{
			contents.append("fullBaseURL:\"").append(genapp.getFullBaseURL().replace("http", "https"));
		}
		contents.append("\",\n\t");
		if (genapp.getBaseURL().indexOf("/appexe/") >= 0) {
			if(genapp.getBaseURL().indexOf("https") != -1){
				contents.append("baseurl:\"").append(
						genapp.getBaseURL().substring(0,genapp.getBaseURL().indexOf("/appexe/")));
			}else{
				contents.append("baseurl:\"").append(
						genapp.getBaseURL().substring(0,genapp.getBaseURL().indexOf("/appexe/")).replace("http", "https"));
			}
		
		} else {
			if(genapp.getBaseURL().indexOf("https") != -1){
				contents.append("baseurl:\"").append(genapp.getBaseURL());
			}else{
				contents.append("baseurl:\"").append(genapp.getBaseURL().replace("http", "https"));
			}
		}
		contents.append("\",\n\t");
		contents.append("state:\"").append(genapp.getProjectstate())
				.append("\",\n\t");
		contents.append("applicationState:\"").append(genapp.getApplicationState())
				.append("\",\n\t");
		contents.append("type:\"").append(genapp.getMainFile().getDevicetype())
				.append("\",\n\t");
		contents.append("isPotrait:\"")
				.append(genapp.getMainFile().isPotrait()).append("\",\n\t");
		contents.append("localdb:{schema:[").append("\n\t")
				.append(LocalDBSchema.build(genapp)).append("]},\n\t");
		contents.append("localdbView:{schema:[").append("\n\t")
				.append(LocalDBSchema.buildView(genapp)).append("]},\n\t");
		contents.append("localdbTrigger:{schema:[").append("\n\t\t")
				.append(LocalDBSchema.buildTrigger(genapp)).append("]},\n\t");
		contents.append("comdb:{schema:[").append("\n\t")
				.append(RemoteDBSchema.build(genapp)).append("]},\n\t");
		contents.append("screens:").append("[");
		
		if(genapp.getMainFile().getScreens() != null){
			int i = 1;
			for (Screen screen : genapp.getMainFile().getScreens()) {
				contents.append("{");
				contents.append("id:\"").append(i).append("\",");
				if(screen.getOrientation().equalsIgnoreCase("Landscape")){
					contents.append("height:\"").append(screen.getWidth()).append("\",");
					contents.append("width:\"").append(screen.getHeight()).append("\",");
				}else{
					contents.append("height:\"").append(screen.getHeight()).append("\",");
					contents.append("width:\"").append(screen.getWidth()).append("\",");
				}
				
				contents.append("orientation:\"").append(screen.getOrientation())
						.append("\"");
				contents.append("},");
				i++;
			}
		}else{
			contents.append("{");
			contents.append("id:\"").append("1").append("\",");
			contents.append("height:\"").append("480")
					.append("\",");
			contents.append("width:\"").append("320").append("\",");
			contents.append("orientation:\"").append("Portrait")
					.append("\"");
			contents.append("},");
		}
		
		contents = Utility.removeCommaFromLast(contents);
		contents.append("],\n\t");
		if (genapp.getProjectstate().equalsIgnoreCase("Preview")) {
			contents.append("clientId:\"")
					.append(genapp.getMainFile().getClientIdPreview())
					.append("\",\n\t");
			contents.append("redirectURI:\"")
					.append(genapp.getMainFile().getRedirectURIPreview())
					.append("\",\n\t");
		} else if (genapp.getProjectstate().equalsIgnoreCase("Production")) {
			contents.append("clientId:\"")
					.append(genapp.getMainFile().getClientIdProduction())
					.append("\",\n\t");
			contents.append("redirectURI:\"")
					.append(genapp.getMainFile().getRedirectURIProduction())
					.append("\",\n\t");
		}

		if (genapp.getCSVRowData().length() > 0) {
			List<String> list = new ArrayList<String>(Arrays.asList(genapp
					.getCSVRowData().split(",")));
			contents.append("dataCSV:{");
			for (int i = 0; i < list.size(); i++) {
				contents.append("\"").append(genapp.getPrefix()).append("-")
						.append(i).append("\"");
				contents.append(":\"").append(list.get(i)).append("\",");
			}
			Utility.removeCommaFromLast(contents);
			contents.append("},\n\t");
		}

		/*
		 * Search the whole project if it has any commserver command or
		 * remotedatabase access, we need to initialize them first during
		 * startup if there is any commands accessing commserver this should be
		 * TRUE
		 */

		for (TableDefs table : genapp.getMainFile().getTableDefs()) {
			if (table.getCsvfilename().length() > 0) {
				isServerReady = true;
			}
		}
		if (!isServerReady) {
			for (TableDefs table : genapp.getMainFile().getRemoteTblDefs()) {
				if (table.getCsvfilename().length() > 0) {
					isServerReady = true;
				}
			}
		}
		contents.append("serveracc:").append(isServerReady).append(",\n\t");
		contents.append("splash:{").append(splashContent).append("},\n\t");
		
		if (genapp.getMainFile().getPnevents() != null) {
			contents.append("pnevents:{");
			for (Event event : genapp.getMainFile().getPnevents()) {
				StringBuilder actions = ActionBuilder.buildAction(genapp, null, event);
				contents.append(actions);
			}
			contents.append("},\n\t");
		}
		
		if (genapp.getMainFile().getAppevents() != null) {
			contents.append("appEvents:{");
			for (Event event : genapp.getMainFile().getAppevents()) {
				StringBuilder actions = ActionBuilder.buildAction(genapp, null, event);
				contents.append(actions);
			}
			contents.append("},\n\t");
		}
		/*
		 * Generate Tabs
		 */
		ArrayList<Tabs> tabList = genapp.getMainFile().getTabs();
		if (tabList.size() > 0) {
			TabBuilder tabs = new TabBuilder();
			contents.append("tabs:[").append(tabs.createTabs(genapp, tabList))
					.append("],\n\t");
		}

		StringBuilder pagecontents = new StringBuilder();
		pagecontents.append("pages:[");

		ArrayList<DefFile> pages = genapp.getPages();
		int counter = 0; // counter added for rendring multiple splitviewpages
		int pagescrollcounter = 0; // counter added for rendring multiple pagescrollviewpages
		for (DefFile defFile : pages) {

			if (defFile.getPage() != null && !defFile.getPage().isParentSplitView()
					&& !defFile.getPage().getViewType()
							.equalsIgnoreCase("SplitView")) {
				StringBuffer pagecontent = new StringBuffer();
				pagecontent.append("\n\t{");
				if(genapp.getMainFile().getScreens() != null && genapp.getProjectstate().equalsIgnoreCase("Preview")){
					if (defFile.getPage().getViewType()
							.equalsIgnoreCase("ScrollVieW")) {

						pagecontent.append("height:\"")
								.append(defFile.getPage().getHeight())
								.append("\",");
						pagecontent.append("width:\"")
								.append(defFile.getPage().getWidth()).append("\",");
						pagecontent.append("x:").append(defFile.getPage().getX())
								.append(",");
						pagecontent.append("y:").append(defFile.getPage().getY())
								.append(",");

					}else{
						if(genapp.getMainFile().getScreens().get(genapp.getPreviewScreenId()).getOrientation().equalsIgnoreCase("Landscape")){
							pagecontent.append("height:\"").append(genapp.getMainFile().getScreens().get(genapp.getPreviewScreenId()).getWidth()).append("\",");
							pagecontent.append("width:\"").append(genapp.getMainFile().getScreens().get(genapp.getPreviewScreenId()).getHeight()).append("\",");
						}else{
							pagecontent.append("height:\"").append(genapp.getMainFile().getScreens().get(genapp.getPreviewScreenId()).getHeight()).append("\",");
							pagecontent.append("width:\"").append(genapp.getMainFile().getScreens().get(genapp.getPreviewScreenId()).getWidth()).append("\",");
						}
						
					}
				}else if(genapp.getMainFile().getScreens() != null && (genapp.getProjectstate().equalsIgnoreCase("Production") || genapp.getProjectstate().equalsIgnoreCase("Development"))){
					if (defFile.getPage().getViewType()
							.equalsIgnoreCase("ScrollVieW")) {

						pagecontent.append("height:\"")
								.append(defFile.getPage().getHeight())
								.append("\",");
						pagecontent.append("width:\"")
								.append(defFile.getPage().getWidth()).append("\",");
						pagecontent.append("x:").append(defFile.getPage().getX())
								.append(",");
						pagecontent.append("y:").append(defFile.getPage().getY())
								.append(",");

					}else{
						if(genapp.getMainFile().getScreens().get(Integer.parseInt(genapp.getIndex())).getOrientation().equalsIgnoreCase("Landscape")){
							pagecontent.append("height:\"").append(genapp.getMainFile().getScreens().get(Integer.parseInt(genapp.getIndex())).getWidth()).append("\",");
							pagecontent.append("width:\"").append(genapp.getMainFile().getScreens().get(Integer.parseInt(genapp.getIndex())).getHeight()).append("\",");
						}else{
							pagecontent.append("height:\"").append(genapp.getMainFile().getScreens().get(Integer.parseInt(genapp.getIndex())).getHeight()).append("\",");
							pagecontent.append("width:\"").append(genapp.getMainFile().getScreens().get(Integer.parseInt(genapp.getIndex())).getWidth()).append("\",");
						}
						
					}
				}else{
					if (defFile.getPage().getViewType()
							.equalsIgnoreCase("ScrollVieW")) {

						pagecontent.append("height:\"")
								.append(defFile.getPage().getHeight())
								.append("\",");
						pagecontent.append("width:\"")
								.append(defFile.getPage().getWidth()).append("\",");
						pagecontent.append("x:").append(defFile.getPage().getX())
								.append(",");
						pagecontent.append("y:").append(defFile.getPage().getY())
								.append(",");

					}else if (genapp.getMainFile().getDevicetype()
							.equalsIgnoreCase("tablet")) {
						// pagecontent.append("height:\"").append(defFile.getPage().getTabletHeight()).append("\",");
						// pagecontent.append("width:\"").append(defFile.getPage().getTabletWidth()).append("\",");
						pagecontent.append("height:\"")
								.append(defFile.getPage().getFrame().getHeight())
								.append("\",");
						pagecontent.append("width:\"")
								.append(defFile.getPage().getFrame().getWidth())
								.append("\",");

					} else {
						// older code is commented.. Akhil
						if(defFile.getPage().getFrame().getHeight() != 0 && defFile.getPage().getFrame().getWidth() != 0){
							pagecontent.append("height:\"").append(defFile.getPage().getFrame().getHeight()).append("\",");
							pagecontent.append("width:\"").append(defFile.getPage().getFrame().getWidth()).append("\",");
						}else{
							pagecontent.append("height:\"").append(defFile.getPage().getHeight()).append("\",");
							pagecontent.append("width:\"").append(defFile.getPage().getWidth()).append("\",");
						}
					}
				}
			

				pagecontent.append("\n\t");
				// append 'srcLocation'... for future reference
				pagecontent.append("srcLocation:\"")
							.append((defFile.getSrcLocation() == "") ? "bundle" : defFile.getSrcLocation())
							.append("\",");
				
				// create Status Bar Here..
				pagecontent
						.append("statusbarhidden:")
						.append(defFile.getPage().isStatusbar())
						.append(",\n\t");
				// Sidebar Position
				pagecontent
						.append("sidebarposition:\"")
						.append(defFile.getPage().getSideBarPosition()).append("\",")
						.append("\n\t");
				// create PageOverlay here..
				if(defFile.getPage().getPageOverlay().size() > 0) {
					int pageOverlayCount  = defFile.getPage().getPageOverlay().size();
					ArrayList<PageOverlay> pageOverlay = defFile.getPage().getPageOverlay();
					pagecontent.append("pageOverlay:[").append("\n\t");
					for(int i=0;i<pageOverlayCount;i++) {
						pagecontent.append(PageOverlayBuilder.build(pageOverlay.get(i),genapp))
						.append(",\n\t");
					}
					pagecontent.append("]").append(",\n\t");
//					pagecontent.append(PageOverlayBuilder.build(pageOverlay,genapp))
//							.append(",\n\t");
				}
				// create Header here..
				pagecontent.append(NavigationBuilder.build(genapp, defFile))
						.append(",\n\t");
				// creating ToolBarTop below..
				if (defFile.getPage().getToolbarTop() != null) {
					pagecontent
							.append(ToolBarTopBuilder.build(genapp, defFile))
							.append(",\n\t");
				}

				pagecontent.append("name:\"").append(defFile.getFileName())
						.append("\",");
				pagecontent.append("pageTitle:\"").append(Utility.parseText(defFile.getPage().getTitle())).append("\",");
				pagecontent.append("parent:\"")
						.append(defFile.getPage().getParent()).append("\",");

				if (defFile.getPage().getViewType()
						.equalsIgnoreCase("BaseView")
						|| defFile.getPage().getViewType()
								.equalsIgnoreCase("ScrollVieW")
						|| defFile.getPage().getViewType()
								.equalsIgnoreCase("PageScrollView")) {
					pagecontent.append("data:{updated:false").append(",");
					pagecontent.append("contents:[").append("],");
					pagecontent.append("tablename:\"").append("\",");
					pagecontent.append("wherecond:\"").append("\",");
					pagecontent.append("order:\"").append("\"},\n\t");
				}
				
				pagecontent.append("backgroundColor:{"
						+ ColorBuilder.build(defFile.getPage()
								.getBackgroundColor()) + "},");
				pagecontent.append("PageOrientation:\"").append(defFile.getPage().getPageOrientation()).append("\",");
				pagecontent.append("footer:{");
				pagecontent.append("hidden:")
						.append(defFile.getPage().isTabBarHidden())
						.append("},\n\t");

				/*
				 * Children of the Page that includes various ui components as
				 * well as database table view list.
				 */

				if (defFile.getPage().getViewType()
						.equalsIgnoreCase("PageScrollView")) {
//					ArrayList<DefFile> containerPages = defFile.getPage()
//							.getPages();
//					pagecontent.append("containerchildren:[\"")
//							.append(defFile.getFileName()).append("\",");
//					for (DefFile containerChild : containerPages) {
//						pagecontent.append("\"")
//								.append(containerChild.getFileName())
//								.append("\",");
//					}
					//pagecontent.append("],\n\t");
					if (genapp.getPageScrollViewPageSet().size() > 0) {
						ArrayList<DefFile> pagesList = genapp.getPageScrollViewPageSet().get(pagescrollcounter).getPageScrollViewPages();//genapp.getPageScrollViewPages();
						pagecontent.append("children:[");
						for (DefFile page : pagesList) {
							pagecontent.append("\n\t{");

							pagecontent.append("height:\"")
									.append(page.getPage().getHeight())
									.append("\",");
							pagecontent.append("width:\"")
									.append(page.getPage().getWidth())
									.append("\",");
							pagecontent.append("x:")
									.append(page.getPage().getX()).append(",");
							pagecontent.append("y:")
									.append(page.getPage().getY()).append(",");

							if (page.getFrame() != null) {
								pagecontent.append("sectionheight:\"")
										.append(page.getFrame().getHeight())
										.append("\",");
								pagecontent.append("sectionwidth:\"")
										.append(page.getFrame().getWidth())
										.append("\",");
								pagecontent.append("sectionX:\"")
										.append(page.getFrame().getX())
										.append("\",");
								pagecontent.append("sectionY:\"")
										.append(page.getFrame().getY())
										.append("\",");
							}
							
							pagecontent.append("header:{hidden:false},footer:{hidden:false},");

//							if (page.getPage().getToolbarTop() != null) {
//								pagecontent.append("\n\t");
//								pagecontent.append(
//										ToolBarTopBuilder.build(genapp, page))
//										.append(",\n\t");
//							}
							pagecontent.append("\n\t");
							pagecontent.append("name:\"")
									.append(page.getFileName()).append("\",");
							pagecontent.append("parent:\"")
									.append(page.getPage().getParent())
									.append("\",");
							pagecontent.append("parentType:\"")
									.append("PageScrollView").append("\",");

							if (page.getPage().getViewType()
									.equalsIgnoreCase("BaseView")
									|| page.getPage().getViewType()
											.equalsIgnoreCase("ScrollVieW")
									|| page.getPage().getViewType()
											.equalsIgnoreCase("PageScrollView")) {
								pagecontent.append("data:{updated:false")
										.append(",");
								pagecontent.append("contents:[").append("],");
								pagecontent.append("tablename:\"")
										.append("\",");
								pagecontent.append("wherecond:\"")
										.append("\",");
								pagecontent.append("order:\"").append(
										"\"},\n\t");
							}

							pagecontent.append("backgroundColor:{"
									+ ColorBuilder.build(page.getPage()
											.getBackgroundColor()) + "},\n\t");
							pagecontent.append("PageOrientation:\"").append(defFile.getPage().getPageOrientation()).append("\",\n\t");
							StringBuilder childrenS = new StringBuilder();

							ArrayList<BaseView> children = page.getPage().getChildren();
							childrenS.append(ChildrenBuilder.buildChildren(
									children, pagecontent, genapp));

							// Remove comma from the string ,if it is present in
							// the end of the
							// string else return the original string
							Utility.removeCommaFromLast(childrenS);
							pagecontent.append("children:[\n\t");
							pagecontent.append(childrenS);
							pagecontent.append("],\n\t");
//							if (page.getPage().getToolbarBottom() != null) {
//								pagecontent.append(
//									ToolBarBottomBuilder.build(genapp, page))
//										.append(",\n\t");
//							}
//							if(!page.getPage().isSideBarHidden()) {
//								if (page.getPage().getSideBarPosition().equalsIgnoreCase("left")) {
//									if (page.getPage().getToolbarLeft() != null) {
//										pagecontent.append(
//											LeftToolBarBuilder.build(genapp, page))
//												.append(",\n\t");
//									}
//								}else if (page.getPage().getSideBarPosition().equalsIgnoreCase("right")) {
//									if (page.getPage().getToolbarRight() != null) {
//										pagecontent.append(
//											RightToolBarBuilder.build(genapp, page))
//												.append(",\n\t");
//									}
//								}
//							}
//							if (page.getPage().getToolbarLeft() != null) {
//								pagecontent.append(
//									LeftToolBarBuilder.build(genapp, page))
//										.append(",\n\t");
//							}
							String viewType = "";
							if (page.getPage().getViewType()
									.equalsIgnoreCase("DbTableViewList")) {
								viewType = "DBTableViewList";
							} else if (page.getPage().getViewType()
									.equalsIgnoreCase("RemoteTableViewList")) {
								viewType = "RemoteTableViewList";
							} else if (page.getPage().getViewType()
									.equalsIgnoreCase("DbTableView")) {
								viewType = "DBTableView";
							} else {
								viewType = page.getPage().getViewType();
							}
							
							if (page.getPage().getEvent() != null) {
								pagecontent.append("events:{");
								for (Event event : page.getPage().getEvent()) {

									StringBuilder actions = PageEventBuilder.buildEvent(genapp, page.getPage(), event);
									pagecontent.append(actions);
								}
								pagecontent.append("},\n\t");
							}
							
//							if (defFile.getPage().getEvent() != null) {
//								pagecontent.append("events:{");
//								for (Event event : defFile.getPage().getEvent()) {
//
//									StringBuilder actions = PageEventBuilder.buildEvent(genapp, defFile.getPage(), event);
//									pagecontent.append(actions);
//								}
//								pagecontent.append("},\n\t");
//							}
							
							pagecontent.append("type:\"").append(viewType)
									.append("\"},\n\t");

						}
						pagecontent.append("],\n\t");
					//}
					pagescrollcounter++;
					}
				}else {
					StringBuilder childrenS = new StringBuilder();

					ArrayList<BaseView> children = defFile.getPage().getChildren();
					childrenS.append(ChildrenBuilder.buildChildren(children,
							pagecontent, genapp));

					// Remove comma from the string ,if it is present in the end of
					// the
					// string else return the original string
					Utility.removeCommaFromLast(childrenS);
					pagecontent.append("children:[\n\t");
					pagecontent.append(childrenS);
					pagecontent.append("],\n\t");
				}
				
//				StringBuilder childrenS = new StringBuilder();
//				ArrayList<BaseView> children = defFile.getPage().getChildren();
//				childrenS.append(ChildrenBuilder.buildChildren(children,
//						pagecontent, genapp));
//
//				// Remove comma from the string ,if it is present in the end of
//				// the
//				// string else return the original string
//				Utility.removeCommaFromLast(childrenS);
//				pagecontent.append("children:[\n\t");
//				pagecontent.append(childrenS);
//				pagecontent.append("],\n\t");
				if (defFile.getPage().getToolbarBottom() != null) {
					pagecontent.append(
							ToolBarBottomBuilder.build(genapp, defFile))
							.append(",\n\t");
				}
//				if(!defFile.getPage().isSideBarHidden()) {
//					if (defFile.getPage().getSideBarPosition().equalsIgnoreCase("left")) {
//						if (defFile.getPage().getToolbarLeft() != null) {
//							pagecontent.append(
//								LeftToolBarBuilder.build(genapp, defFile))
//									.append(",\n\t");
//						}
//					}else if (defFile.getPage().getSideBarPosition().equalsIgnoreCase("right")) {
//						if (defFile.getPage().getToolbarRight() != null) {
//							pagecontent.append(
//								RightToolBarBuilder.build(genapp, defFile))
//									.append(",\n\t");
//						}
//					}
//				}
				if (defFile.getPage().getToolbarLeft() != null) {
					pagecontent.append(
						LeftToolBarBuilder.build(genapp, defFile))
							.append(",\n\t");
				}

				String viewType = "";
				if (defFile.getPage().getViewType()
						.equalsIgnoreCase("DbTableViewList")) {
					viewType = "DBTableViewList";
				} else if (defFile.getPage().getViewType()
						.equalsIgnoreCase("RemoteTableViewList")) {
					viewType = "RemoteTableViewList";
				} else if (defFile.getPage().getViewType()
						.equalsIgnoreCase("DbTableView")) {
					viewType = "DBTableView";
				} else {
					viewType = defFile.getPage().getViewType();
				}
				if (defFile.getPage().getEvent() != null) {
					pagecontent.append("events:{");
					for (Event event : defFile.getPage().getEvent()) {

						StringBuilder actions = PageEventBuilder.buildEvent(genapp, defFile.getPage(), event);
						pagecontent.append(actions);
					}
					pagecontent.append("},\n\t");
				}
				pagecontent.append("type:\"").append(viewType)
						.append("\"},\n\t");
				pagecontents.append(pagecontent);
			} else {
				if (defFile.getPage() != null && defFile.getPage().getViewType().equalsIgnoreCase("SplitView")) {
					if (genapp.getSplitViewPageSet().size() > 0) {
						ArrayList<DefFile> pagesList = genapp.getSplitViewPageSet().get(counter).getSplitViewPages();
						StringBuffer pagecontent = new StringBuffer();
						pagecontent.append("\n\t{");
						if(genapp.getMainFile().getScreens() != null && genapp.getProjectstate().equalsIgnoreCase("Preview")){
							if(genapp.getMainFile().getScreens().get(genapp.getPreviewScreenId()).getOrientation().equalsIgnoreCase("Landscape")){
								pagecontent.append("height:\"").append(Float.parseFloat(genapp.getMainFile().getScreens().get(genapp.getPreviewScreenId()).getWidth())).append("\",");
								pagecontent.append("width:\"").append(Float.parseFloat(genapp.getMainFile().getScreens().get(genapp.getPreviewScreenId()).getHeight())).append("\",");
								pagecontent.append("x:").append("0.0").append(",");
								pagecontent.append("y:").append("0.0").append(",");
							}else{
								pagecontent.append("height:\"").append(Float.parseFloat(genapp.getMainFile().getScreens().get(genapp.getPreviewScreenId()).getHeight())).append("\",");
								pagecontent.append("width:\"").append(Float.parseFloat(genapp.getMainFile().getScreens().get(genapp.getPreviewScreenId()).getWidth())).append("\",");
								pagecontent.append("x:").append("0.0").append(",");
								pagecontent.append("y:").append("0.0").append(",");
							}
							
						}else if(genapp.getMainFile().getScreens() != null && (genapp.getProjectstate().equalsIgnoreCase("Production") || genapp.getProjectstate().equalsIgnoreCase("Development"))){
							if(genapp.getMainFile().getScreens().get(Integer.parseInt(genapp.getIndex())).getOrientation().equalsIgnoreCase("Landscape")){
								pagecontent.append("height:\"").append(genapp.getMainFile().getScreens().get(Integer.parseInt(genapp.getIndex())).getWidth()).append("\",");
								pagecontent.append("width:\"").append(genapp.getMainFile().getScreens().get(Integer.parseInt(genapp.getIndex())).getHeight()).append("\",");
								pagecontent.append("x:").append("0.0").append(",");
								pagecontent.append("y:").append("0.0").append(",");
							}else{
								pagecontent.append("height:\"").append(genapp.getMainFile().getScreens().get(Integer.parseInt(genapp.getIndex())).getHeight()).append("\",");
								pagecontent.append("width:\"").append(genapp.getMainFile().getScreens().get(Integer.parseInt(genapp.getIndex())).getWidth()).append("\",");
								pagecontent.append("x:").append("0.0").append(",");
								pagecontent.append("y:").append("0.0").append(",");
							}
						}else{
							pagecontent
								.append("height:\"")
								.append(defFile.getPage().getFrame().getHeight()).append("\",");
							pagecontent
								.append("width:\"")
								.append(defFile.getPage().getFrame().getWidth())
								.append("\",");
							pagecontent.append("x:")
								.append(defFile.getPage().getFrame().getX())
								.append(",");
							pagecontent.append("y:")
								.append(defFile.getPage().getFrame().getY())
								.append(",");
						}
						

						pagecontent.append("\n\t");
						pagecontent.append("name:\"")
								.append(defFile.getPage().getFileName())
								.append("\",");
						pagecontent.append("parent:\"")
								.append(defFile.getPage().getParent())
								.append("\",");
						pagecontent.append("data:").append("{}").append(",");
						pagecontent.append("\n\t");
						// create Status Bar Here..
						pagecontent
								.append("statusbarhidden:")
								.append(defFile.getPage().isStatusbar())
								.append(",\n\t");
						System.out.println(defFile.getPage().isStatusbar());
						// create Header here..
						pagecontent.append(
								NavigationBuilder.build(genapp, defFile))
								.append(",\n\t");
						if (defFile.getPage().getToolbarTop() != null) {
							pagecontent.append(
									ToolBarTopBuilder.build(genapp, defFile))
									.append(",\n\t");
						}
						pagecontent.append("name:\"")
								.append(defFile.getFileName()).append("\",");
						pagecontent.append("parent:\"")
								.append(defFile.getPage().getParent())
								.append("\",");

						pagecontent.append("backgroundColor:{"
								+ ColorBuilder.build(defFile.getPage()
										.getBackgroundColor()) + "},");
						pagecontent.append("PageOrientation:\"")
							.append(defFile.getPage().getPageOrientation()).append("\",");
						pagecontent.append("footer:{");
						pagecontent.append("hidden:")
								.append(defFile.getPage().isTabBarHidden())
								.append("},\n\t");

						pagecontent.append("children:[");
						for (DefFile page : pagesList) {

							pagecontent.append("\n\t{");

							pagecontent.append("height:\"")
									.append(page.getPage().getHeight())
									.append("\",");
							pagecontent.append("width:\"")
									.append(page.getPage().getWidth())
									.append("\",");
							pagecontent.append("x:")
									.append(page.getPage().getX()).append(",");
							pagecontent.append("y:")
									.append(page.getPage().getY()).append(",");

							if (page.getFrame() != null) {
								pagecontent.append("sectionheight:\"")
										.append(page.getFrame().getHeight())
										.append("\",");
								pagecontent.append("sectionwidth:\"")
										.append(page.getFrame().getWidth())
										.append("\",");
								pagecontent.append("sectionX:\"")
										.append(page.getFrame().getX())
										.append("\",");
								pagecontent.append("sectionY:\"")
										.append(page.getFrame().getY())
										.append("\",");
							}
							
							pagecontent.append("header:{hidden:false},footer:{hidden:false},");

							if (page.getPage().getToolbarTop() != null) {
								pagecontent.append("\n\t");
								pagecontent.append(
										ToolBarTopBuilder.build(genapp, page))
										.append(",\n\t");
							}
							pagecontent.append("\n\t");
							pagecontent.append("name:\"")
									.append(page.getFileName()).append("\",");
							pagecontent.append("parent:\"")
									.append(page.getPage().getParent())
									.append("\",");
							pagecontent.append("parentType:\"")
									.append("SplitView").append("\",");

							if (page.getPage().getViewType()
									.equalsIgnoreCase("BaseView")
									|| page.getPage().getViewType()
											.equalsIgnoreCase("ScrollVieW")
									|| page.getPage().getViewType()
											.equalsIgnoreCase("PageScrollView")) {
								pagecontent.append("data:{updated:false")
										.append(",");
								pagecontent.append("contents:[").append("],");
								pagecontent.append("tablename:\"")
										.append("\",");
								pagecontent.append("wherecond:\"")
										.append("\",");
								pagecontent.append("order:\"").append(
										"\"},\n\t");
							}

							pagecontent.append("backgroundColor:{"
									+ ColorBuilder.build(page.getPage()
											.getBackgroundColor()) + "},\n\t");
							pagecontent.append("PageOrientation:\"")
								.append(defFile.getPage().getPageOrientation()).append("\",\n\t");
							StringBuilder childrenS = new StringBuilder();

							ArrayList<BaseView> children = page.getPage().getChildren();
							childrenS.append(ChildrenBuilder.buildChildren(
									children, pagecontent, genapp));

							// Remove comma from the string ,if it is present in
							// the end of the
							// string else return the original string
							Utility.removeCommaFromLast(childrenS);
							pagecontent.append("children:[\n\t");
							pagecontent.append(childrenS);
							pagecontent.append("],\n\t");
							if (page.getPage().getToolbarBottom() != null) {
								pagecontent.append(
									ToolBarBottomBuilder.build(genapp, page))
										.append(",\n\t");
							}
//							if(!page.getPage().isSideBarHidden()) {
//								if (page.getPage().getSideBarPosition().equalsIgnoreCase("left")) {
//									if (page.getPage().getToolbarLeft() != null) {
//										pagecontent.append(
//											LeftToolBarBuilder.build(genapp, page))
//												.append(",\n\t");
//									}
//								}else if (page.getPage().getSideBarPosition().equalsIgnoreCase("right")) {
//									if (page.getPage().getToolbarRight() != null) {
//										pagecontent.append(
//											RightToolBarBuilder.build(genapp, page))
//												.append(",\n\t");
//									}
//								}
//							}
							if (page.getPage().getToolbarLeft() != null) {
								pagecontent.append(
									LeftToolBarBuilder.build(genapp, page))
										.append(",\n\t");
							}
							String viewType = "";
							if (page.getPage().getViewType()
									.equalsIgnoreCase("DbTableViewList")) {
								viewType = "DBTableViewList";
							} else if (page.getPage().getViewType()
									.equalsIgnoreCase("RemoteTableViewList")) {
								viewType = "RemoteTableViewList";
							} else if (page.getPage().getViewType()
									.equalsIgnoreCase("DbTableView")) {
								viewType = "DBTableView";
							} else {
								viewType = page.getPage().getViewType();
							}
							
							if (page.getPage().getEvent() != null) {
								pagecontent.append("events:{");
								for (Event event : page.getPage().getEvent()) {

									StringBuilder actions = PageEventBuilder.buildEvent(genapp, page.getPage(), event);
									pagecontent.append(actions);
								}
								pagecontent.append("},\n\t");
							}
							
							pagecontent.append("type:\"").append(viewType)
									.append("\"},\n\t");

						}
						pagecontent.append("],");
						if (defFile.getPage().getToolbarBottom() != null) {
							pagecontent.append(
								ToolBarBottomBuilder.build(genapp,defFile))
									.append(",\n\t");
						}
//						if(!defFile.getPage().isSideBarHidden()) {
//							if (defFile.getPage().getSideBarPosition().equalsIgnoreCase("left")) {
//								if (defFile.getPage().getToolbarLeft() != null) {
//									pagecontent.append(
//										LeftToolBarBuilder.build(genapp, defFile))
//											.append(",\n\t");
//								}
//							}else if (defFile.getPage().getSideBarPosition().equalsIgnoreCase("right")) {
//								if (defFile.getPage().getToolbarRight() != null) {
//									pagecontent.append(
//										RightToolBarBuilder.build(genapp, defFile))
//											.append(",\n\t");
//								}
//							}
//						}
						if (defFile.getPage().getToolbarLeft() != null) {
							pagecontent.append(
								LeftToolBarBuilder.build(genapp, defFile))
									.append(",\n\t");
						}
						if (defFile.getPage().getEvent() != null) {
							pagecontent.append("events:{");
							for (Event event : defFile.getPage().getEvent()) {

								StringBuilder actions = PageEventBuilder.buildEvent(genapp, defFile.getPage(), event);
								pagecontent.append(actions);
							}
							pagecontent.append("},\n\t");
						}
						pagecontent.append("type:\"")
								.append(defFile.getPage().getViewType())
								.append("\"},\n\t");
						pagecontents.append(pagecontent);
					}
					counter++;
				}
			}
		}
		// }
		
	/*	StringBuilder gadgetContents = new StringBuilder();
		gadgetContents.append("\n\tgadgets : {");
		int gadgetIndex = 0;
		for(Gadget gadget : ADFParser.getGadgetsList()){
			StringBuffer gadgetContent = new StringBuffer();
			if(gadgetContents.indexOf("name:\""+gadget.getName()+"\",") == -1){
				gadgetContent.append(gadget.getName()+"_" + gadgetIndex).append(":");
				gadgetContent.append("{");
				gadgetContent.append("name:\"").append(gadget.getName()).append("\",");
			}else{
				gadgetContent.append(gadget.getName()).append(":");
				gadgetContent.append("{");
				gadgetContent.append("name:\"").append(gadget.getName()+"_" + gadgetIndex).append("\",");
				gadgetContent.append("name:\"").append(gadget.getName()+"_" + gadgetIndex).append("\",");
			}
				gadgetContent.append("frame:{").append(FrameBuilder.build(gadget.getFrame())).append("},");
				StringBuilder gadgetChidrenContents = new StringBuilder();

				ArrayList<BaseView> gadgetChidren = gadget.getChildren();
				gadgetChidrenContents.append(ChildrenBuilder.buildChildren(gadgetChidren,gadgetContent, genapp));
				Utility.removeCommaFromLast(gadgetChidrenContents);
				gadgetContent.append("children:[\n\t");
				gadgetContent.append(gadgetChidrenContents);
				gadgetContent.append("],\n\t");
				ArrayList<DataArray> dataArray = gadget.getDataArray();
				gadgetContent.append("dataArray:[\n\t");
				for(DataArray array : dataArray){
					gadgetContent.append("{");
					gadgetContent.append("name:\"").append(array.getObjectName()).append("\",");
					gadgetContent.append("property:\"").append(array.getProperty()).append("\",");
					gadgetContent.append("value:\"").append(array.getValue()).append("\",");
					gadgetContent.append("},");
				}
				gadgetContent.append("],\n\t");
				
				gadgetContent.append("},");
				
				
				gadgetContents.append(gadgetContent);
			
			
			
		}
		Utility.removeCommaFromLast(gadgetContents);
		gadgetContents.append("}");*/
		
		contents.append("googleMap:{");
		if(keyContents.length() == 0 || keyContents == null)
			contents.append("googleMapKeyFound:").append(false).append(",");
		else if(keyContents.length() > 0)
			contents.append("googleMapKeyFound:").append(true).append(",\n\t");
		//System.out.println("isGoogleMapUsed : "+ genapp.getMainFile().isGoogleMapUsed());
		contents.append("googleMapUsed:").append(genapp.getMainFile().isGoogleMapUsed()).append("},\n\t");
		
		contents.append((pagecontents.lastIndexOf(",") != -1) ? pagecontents.deleteCharAt(pagecontents.lastIndexOf(",")) : pagecontents);
		contents.append("],");
		//contents.append(gadgetContents);
		
		dataModel.put("contents", contents);
 		
 		//PN Key
 		StringBuilder config = new StringBuilder();
 		//config.append(genapp.getMainFile().getPNConfig());//
 		config.append(genapp.getMainFile().getWebPNConfig());
 		dataModel.put("config", config.substring(1, config.length() -1));
 		
 		// Control goes to MobileWebController.java
		return dataModel;
	}

	public static Map generateScreenDataModel(GenApp genapp) {
		Map dataModel = new HashMap();

		dataModel.put("appTitle", Utility.parseText(genapp.getMainFile().getTitle()));
		
		StringBuilder contents = new StringBuilder();
		contents.append("screens:").append("[");
		if(genapp.getMainFile().getScreens() != null){
			int i = 1;
			for (Screen screen : genapp.getMainFile().getScreens()) {
				contents.append("{");
				contents.append("id:\"").append(i).append("\",");
				if(screen.getOrientation().equalsIgnoreCase("Landscape")){
					contents.append("height:\"").append(screen.getWidth()).append("\",");
					contents.append("width:\"").append(screen.getHeight()).append("\",");
				}else{
					contents.append("height:\"").append(screen.getHeight()).append("\",");
					contents.append("width:\"").append(screen.getWidth()).append("\",");
				}
				contents.append("orientation:\"").append(screen.getOrientation())
						.append("\"");
				contents.append("},");
				i++;
			}
		}else{
			contents.append("{");
			contents.append("id:\"").append("1").append("\",");
			contents.append("height:\"").append("480")
					.append("\",");
			contents.append("width:\"").append("320").append("\",");
			contents.append("orientation:\"").append("Portrait")
					.append("\"");
			contents.append("},");
		}
		contents = Utility.removeCommaFromLast(contents);
		contents.append("]");
		dataModel.put("contents", contents);
		return dataModel;
	}
	
	public static Map generateLanguageDataModels(String screenId) {
		Map dataModel = new HashMap();
		StringBuilder contents = new StringBuilder();
		contents.append("screenId:").append("\"");
		
		contents.append(screenId+"\"");
		dataModel.put("contents", contents);
		return dataModel;
	}
}
