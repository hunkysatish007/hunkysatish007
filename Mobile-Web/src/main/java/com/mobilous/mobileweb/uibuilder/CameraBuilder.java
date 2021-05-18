package com.mobilous.mobileweb.uibuilder;

import com.mobilous.mobileweb.actionbuilder.ActionBuilder;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.Camera;

public class CameraBuilder {
	public static StringBuilder build(BaseView baseView, GenApp genapp) {
		Camera camera = (Camera) baseView;
		StringBuilder cameraBuilder = new StringBuilder();

		cameraBuilder.append("{id:\"").append(camera.getUiid()).append("\",");
		cameraBuilder.append("name:\"").append(camera.getName()).append("\",");
		cameraBuilder.append("value:\"").append("").append("\",");
		cameraBuilder.append("hidden:").append(camera.isHidden()).append(",");
		cameraBuilder.append("mainValue:\"").append("").append("\",");
		cameraBuilder.append("viewtype:\"").append(camera.getViewType()).append("\",");
		cameraBuilder.append("cameraView:\"").append(camera.getCameraSide()).append("\",");
		cameraBuilder.append("taborder:\"").append(camera.getTabOrder()).append("\",");
		cameraBuilder.append("frame:{")
				.append(FrameBuilder.build(camera.getFrame())).append("},");
		if (camera.getEvent() != null) {
			cameraBuilder.append("events:{");
			for (Event event : camera.getEvent()) {
				StringBuilder actions = ActionBuilder.buildAction(genapp,camera, event);
				cameraBuilder.append(actions);
			}
			cameraBuilder.append("}");
		}
		cameraBuilder.append("}");

		return cameraBuilder;
	}

}