package com.mobilous.mobileweb.uibuilder;

import java.util.ArrayList;

import com.mobilous.mobileweb.app.DefFile;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.ToolBarTop;

public class ToolBarTopBuilder {

	public static StringBuilder build(GenApp genapp, DefFile defFile) {
		ToolBarTop toolbartop = defFile.getPage().getToolbarTop();
		StringBuilder toolBarTopStr = new StringBuilder();
		ArrayList<BaseView> children = toolbartop.getChildren();
		//System.out.println("Size is > " + children.size());

		toolBarTopStr.append("toolbartop:{");
		toolBarTopStr
				.append("hidden:")
				.append(toolbartop.getToolBarTopHidden())
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
				.append("height:\"").append(toolbartop.getFrame().getHeight())
				.append("\"").append("},").append("backgroundColor:{")
				.append(ColorBuilder.build(toolbartop.getBackgroundColor()))
				.append("},").append("\n\t\tchildren:[").append("\n\t");
		// now adding all childrens of the ToolBar..
		StringBuffer childrenString = new StringBuffer();
		childrenString.append(toolBarTopStr);
		toolBarTopStr.append(ChildrenBuilder.buildChildren(children,
				childrenString, genapp));
		// ChildrenBuilder.buildChildren(children, childrenString, genapp);
		toolBarTopStr.append("\t],\n\t");

		toolBarTopStr.append("}");
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

		return toolBarTopStr;
	}

}
