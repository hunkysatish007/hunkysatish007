package com.mobilous.mobileweb.param;

import com.mobilous.mobileweb.app.GenApp;

public interface Parameters {

	public void setMethod(String method);

	public String getMethod();
	
	public void setPageName(String pagename);
	
	public String getPageName(GenApp genApp);
	/*public String setActionParentUI(String parentUIType);
	public String setActionParentUIName(String parentUIName);*/


}
