package com.mobilous.mobileweb.util;

import java.util.Map;

import com.mobilous.mobileweb.app.GenApp;

public interface ApplicationRenderer {

	public Map<String, String> render(GenApp genapp);

}
