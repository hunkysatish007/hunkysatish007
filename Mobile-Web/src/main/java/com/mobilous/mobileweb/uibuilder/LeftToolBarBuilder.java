package com.mobilous.mobileweb.uibuilder;

import java.util.ArrayList;

import com.mobilous.mobileweb.app.DefFile;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.ToolBarLeft;

public class LeftToolBarBuilder {
	public static StringBuilder build(GenApp genapp, DefFile defFile) {
		ToolBarLeft toolbarleft = defFile.getPage().getToolbarLeft();
		StringBuilder strToolBarLeft = new StringBuilder();
		ArrayList<BaseView> children = toolbarleft.getChildren();
		
		strToolBarLeft.append("toolbarleft:{");
		strToolBarLeft.append("hidden:")
						.append(toolbarleft.getToolBarLeftHidden())
						.append(",")
						.append("fixed:")
						.append(toolbarleft.getFixed())
						.append(",")
						.append("view:\"")
						.append(toolbarleft.getView()).append("\",")
						.append("frame:{")
						//Here x, y, height is not required.. only width is required.
						.append("width:\"").append(toolbarleft.getFrame().getWidth()).append("\",")
						.append("height:\"").append(toolbarleft.getFrame().getHeight()).append("\"")
						.append("},")
						.append("backgroundColor:{")
						.append(ColorBuilder.build(toolbarleft.getBackgroundColor()))
						.append("},");
		
		strToolBarLeft.append("\n\t\tchildren:[").append("\n\t");
		if(toolbarleft.getView().equalsIgnoreCase("TableView")){
			if(toolbarleft.getTableData().size() != 0){
				StringBuffer tableString = new StringBuffer();
				tableString.append(strToolBarLeft);
				
				strToolBarLeft.append(ChildrenBuilder.buildChildren(toolbarleft.getTableData(), tableString, genapp));	
			}
		}else{
			// now adding all childrens of the ToolBar..
			StringBuffer childrenString = new StringBuffer();
			childrenString.append(strToolBarLeft);
			
			strToolBarLeft.append(ChildrenBuilder.buildChildren(children, childrenString, genapp));	
		}
				
		strToolBarLeft.append("\t],\n\t");
		strToolBarLeft.append("}");

		return strToolBarLeft;
	}
}
