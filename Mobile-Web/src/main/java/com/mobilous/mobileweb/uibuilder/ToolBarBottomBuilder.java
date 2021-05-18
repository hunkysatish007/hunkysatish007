package com.mobilous.mobileweb.uibuilder;

import java.util.ArrayList;

import com.mobilous.mobileweb.app.DefFile;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.ToolBarBottom;

public class ToolBarBottomBuilder {
	public static StringBuilder build(GenApp genapp, DefFile defFile) {
		ToolBarBottom toolbarbottom = defFile.getPage().getToolbarBottom();
		StringBuilder toolBarBottomStr = new StringBuilder();
		ArrayList<BaseView> children = toolbarbottom.getChildren();
		
		toolBarBottomStr.append("toolbarbottom:{");
		toolBarBottomStr
				.append("hidden:")
				.append(toolbarbottom.getToolBarBottomHidden())
				.append(",")
				.append("frame:{")
				// X, Y , Width is not required.. only height is required.
				/*
				 * .append("x:\"").append(toolbartop.getFrame().getX()).append("\","
				 * )
				 * .append("y:\"").append(toolbartop.getFrame().getY()).append(
				 * "\",")
				 * .append("width:\"").append(toolbartop.getFrame().getWidth
				 * ()).append("\",")
				 */
				.append("height:\"").append(toolbarbottom.getFrame().getHeight())
				.append("\"").append("},").append("backgroundColor:{")
				.append(ColorBuilder.build(toolbarbottom.getBackgroundColor()))
				.append("},").append("\n\t\tchildren:[").append("\n\t");
		// now adding all childrens of the ToolBar..
		StringBuffer childrenString = new StringBuffer();
		childrenString.append(toolBarBottomStr);
		
		toolBarBottomStr.append(ChildrenBuilder.buildChildren(children, childrenString, genapp));
		
		toolBarBottomStr.append("\t],\n\t");

		toolBarBottomStr.append("}");
		/*
		 * toolbartop:{hidden :
		 * false,frame:{x:"0.0",y:"0.0",width:"0.0",height:"42.0"},
		 * backgroundColor:{red:205,blue:155,green:55,alpha:1.0}, children:[
		 * {id:
		 * "ui-1",name:"RoundButton_20140312123817526",viewtype:"RoundButton"
		 * ,frame
		 * :{x:"10.0",y:"0.0",width:"88.0",height:"35.0"},lineheight:"35",value
		 * :"hjjh"
		 * ,template:"",font:{size:"12",align:"center",color:{red:0,blue:0
		 * ,green:0,alpha:1.0}},type:"button",events:{}}, ], },
		 */

		return toolBarBottomStr;
	}
}
