/*
 * Author : Sachit Kesri
 * Date : 11 Sept, 2015
 */
package com.mobilous.mobileweb.uibuilder;

import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.ui.BaseView;
import com.mobilous.mobileweb.ui.QRCode;

public class QRCodeBuilder {
	public static StringBuilder build(BaseView baseView, GenApp genapp) {
		QRCode qrCode = (QRCode) baseView;
		StringBuilder qrCodeBuilder = new StringBuilder();

		qrCodeBuilder.append("{id:\"").append(qrCode.getUiid()).append("\",");
		qrCodeBuilder.append("name:\"").append(qrCode.getName()).append("\",");
		qrCodeBuilder.append("encstring:\"").append(qrCode.getEncstring()).append("\",");
		qrCodeBuilder.append("frame:{").append(FrameBuilder.build(qrCode.getFrame())).append("}}");
		return qrCodeBuilder;
		
	}

}
