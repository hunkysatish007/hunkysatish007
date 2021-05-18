package com.mobilous.mobileweb.uibuilder;

import java.util.ArrayList;

import com.mobilous.mobileweb.app.DefFile;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.ToolBarRight;

public class RightToolBarBuilder {
	public static StringBuilder build(GenApp genapp, DefFile defFile) {
		ToolBarRight toolbarright = defFile.getPage().getToolbarRight();
		StringBuilder strToolBarRight = new StringBuilder();
		ArrayList<BaseView> children = toolbarright.getChildren();
		
		strToolBarRight.append("toolbarright:{");
		strToolBarRight.append("hidden:")
						.append(toolbarright.getToolBarRightHidden())
						.append(",")
						.append("view:\"")
						.append(toolbarright.getView()).append("\",")
						.append("frame:{")
						//Here x, y, height is not required.. only width is required.
						.append("width:\"").append(toolbarright.getFrame().getWidth()).append("\",")
						.append("height:\"").append(toolbarright.getFrame().getHeight()).append("\"")
						.append("},")
						.append("backgroundColor:{")
						.append(ColorBuilder.build(toolbarright.getBackgroundColor()))
						.append("},");
		
		strToolBarRight.append("\n\t\tchildren:[").append("\n\t");
		if(toolbarright.getView().equalsIgnoreCase("TableView")){
			if(toolbarright.getTableData().size() != 0){
				StringBuffer tableString = new StringBuffer();
				tableString.append(strToolBarRight);
				
				strToolBarRight.append(ChildrenBuilder.buildChildren(toolbarright.getTableData(), tableString, genapp));	
			}
		}else{
			// now adding all childrens of the ToolBar..
			StringBuffer childrenString = new StringBuffer();
			childrenString.append(strToolBarRight);
			
			strToolBarRight.append(ChildrenBuilder.buildChildren(children, childrenString, genapp));	
		}
				
		strToolBarRight.append("\t],\n\t");
		strToolBarRight.append("}");

		return strToolBarRight;
	}
}
