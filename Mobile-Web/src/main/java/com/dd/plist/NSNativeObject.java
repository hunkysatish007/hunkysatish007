package com.dd.plist;

import com.dd.plist.NSObject;

public class NSNativeObject extends NSObject {
	public Object obj;

	public NSNativeObject(Object src_obj) {
		obj = src_obj;
	}

	public Object getObj() {
		return obj;
	}

	@Override
	public String toXML(String indent) {
		return "";
	}
}
