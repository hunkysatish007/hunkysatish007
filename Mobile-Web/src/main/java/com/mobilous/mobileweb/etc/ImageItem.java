package com.mobilous.mobileweb.etc;

import java.util.ArrayList;

import com.mobilous.mobileweb.attribute.ImageFile;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.ToolBar;
import com.mobilous.mobileweb.ui.ToolBarItems;

public class ImageItem extends ToolBar implements ToolBarItems {

	private String type = "ImageItem";
	private ImageFile imageDic = null;
	private ArrayList<Event> event = null;
	private String id = "";

	@Override
	public String getId() {
		return id;
	}

	@Override
	public void setId(String id) {
		this.id = id;
	}

	@Override
	public String getType() {
		return type;
	}

	/**
	 * @param imageFile
	 *            the imageFile to set
	 */
	public void setImageDic(ImageFile imageDic) {
		this.imageDic = imageDic;
	}

	/**
	 * @return the imageFile
	 */
	public ImageFile getImageDic() {
		return imageDic;
	}

	@Override
	public ArrayList<Event> getEvent() {
		return event;
	}

	@Override
	public void setEvent(ArrayList<Event> event) {
		this.event = event;
	}

}
