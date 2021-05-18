package com.mobilous.mobileweb.uibuilder;

import com.mobilous.mobileweb.ui.Padding;

public class PaddingBuilder {

	public static StringBuilder build(Padding padding) {
		// TODO Auto-generated method stub
		StringBuilder paddingstr = new StringBuilder();
		
		paddingstr.append("top:").append(padding.getTop())
		.append(",bottom:").append(padding.getBottom())
		.append(",left:").append(padding.getLeft())
		.append(",right:").append(padding.getRight());
		
		return paddingstr;
	}

}
