package com.mobilous.mobileweb.uibuilder;

import java.util.ArrayList;

import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.app.Tabs;
import com.mobilous.mobileweb.util.Utility;

public class TabBuilder {

	/*
	 tabs: [
	    {id:"tab-1",icon:{image:"resources/image/naruto.jpg",type:"tab"},text:"Tab 1",page:"page_1"},
		{id:"tab-2",icon:{image:"resources/image/bulbasaur.png",type:"tab"},text:"Tab 2",page:"page_2"},
		{id:"tab-3",icon:{image:"resources/image/sakura.jpg",type:"tab"},text:"Tab 3",page:"page_3"},
		{id:"tab-4",icon:{image:"resources/image/sasuke.jpg",type:"tab"},text:"Tab 4",page:"page_4"},
		{id:"tab-more",icon:{image:"resources/image/hamtaro3.gif",type:"tab"},type:"normal",text:"More",page:"more",
			tabs:[{id:"tab-5",icon:{image:"resources/image/naruto.jpg",type:"tab"},type:"more",text:"Page 5",page:"page_5"},
					{id:"tab-6",icon:{image:"resources/image/naruto.jpg",type:"tab"},type:"more",text:"Page 6",page:"page_6"}] }
	]
	 */
	
	StringBuilder contents = new StringBuilder();
	int tabno=1;
	Boolean hasMoreTab = false;
	
	StringBuilder moreTab = new StringBuilder("{id:\"tab-more\",icon:{image:\"\",type:\"tab\"},type:\"normal\",text:\"More\",page:\"more\",tabs:[");
	
	public StringBuilder createTabs(GenApp genapp,ArrayList<Tabs> tabs){
		
		for (Tabs tabpage : tabs) {
			if(tabs.size()==5){
				contents.append(createFirstFourTabs(genapp, tabpage));
			}
			else {
				if(tabno <= 4){
					contents.append(createFirstFourTabs(genapp, tabpage));
				}else{
					if(contents.length() != 0 && createFirstFourTabs(genapp, tabpage).length() != 0){
						if(tabno == 5){
							contents.append(moreTab.append(createFirstFourTabs(genapp, tabpage)));
							hasMoreTab = true;
						}else{
							contents.append(createFirstFourTabs(genapp, tabpage));
						}
					}
				}
			}
			
			tabno++;
		}
		if((tabno-1 == tabs.size() && (hasMoreTab))){
			contents.append("]}");
		}
		
		return (contents.length() != 0) ? contents.deleteCharAt(contents.lastIndexOf(",")) : contents;
	}
	
	private StringBuilder createFirstFourTabs(GenApp genapp, Tabs tabpage){
		StringBuilder innerContent = new StringBuilder();
		if(tabpage.getDefFile() == null){
			return innerContent;
		}
		
		innerContent.append("{")
			.append("id:\"").append("tab-").append(tabno).append("\",")
			.append("tintcolor:{").append(ColorBuilder.build(tabpage.getDefFile().getPage().getTabColor())).append("},")
				.append("icon:{");
		
		String tabimage=new String();
		
		if((tabpage.getDefFile().getPage().getIcon().getFileName()!="")&&(tabpage.getDefFile().getPage().getIcon().getFileExt()!="")){
			tabimage = tabpage.getDefFile().getPage().getIcon().getFileName()+ "." +tabpage.getDefFile().getPage().getIcon().getFileExt();
		}else {
			tabimage="";
		}
		
		innerContent.append("image:\"").append(tabimage).append("\",")
					.append("type:\"").append("tab").append("\"")
				.append("},")
				.append("text:\"").append(Utility.parseText(tabpage.getDefFile().getPage().getIconTitle())).append("\",")
				.append("page:\"").append(tabpage.getDefFile().getFileName()).append("\"")
			.append("},");
	
		return innerContent;
	}
	
}