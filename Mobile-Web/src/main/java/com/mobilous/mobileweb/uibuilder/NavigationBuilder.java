package com.mobilous.mobileweb.uibuilder;

import com.mobilous.mobileweb.actionbuilder.ActionBuilder;
import com.mobilous.mobileweb.app.DefFile;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.app.Tabs;
import com.mobilous.mobileweb.etc.SystemItem;
import com.mobilous.mobileweb.etc.TextItem;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.NavigationBar;
import com.mobilous.mobileweb.ui.ToolBarItems;
import com.mobilous.mobileweb.util.Utility;

public class NavigationBuilder {

	public static StringBuilder build(GenApp genapp, DefFile defFile) {
		StringBuilder headStr = new StringBuilder();
		// Back Button for returning to parent page
		// header:{title:"page2",hidden:false,backBtn:{name:"page2",events:{Tap:[{method:"Back",category:"PageAction"}]}}},
		NavigationBar navigationbar = defFile.getPage().getNavigationBar();
		headStr.append("header:{");
		headStr.append("title:\"").append(Utility.parseText(navigationbar.getTitle()))
				.append("\",");
		headStr.append("prompt:\"").append(navigationbar.getPrompt())
				.append("\",");
		headStr.append("hidden:")
				.append(defFile.getPage().isNavigationBarHidden()).append(",");

		if (navigationbar.getBarStyle().equalsIgnoreCase("custom")) {
			String tintcolor = "";
			if (navigationbar.getTintColor() != null) {
				tintcolor = ColorBuilder.build(navigationbar.getTintColor())
						.toString();
				// background-image: -webkit-gradient(linear, 0% 0%, 0% 100%,
				// from(rgb(204, 0, 102)), to(rgba(58, 42, 50, 0.8)));
				headStr.append("custom:{").append(tintcolor).append("},");
			}

		}

		String style = "";
		if (navigationbar.getBarStyle().equalsIgnoreCase("custom")) {
			style = "custom";
		} else if (navigationbar.getBarStyle().equals("Default")) {
			style = "default";
		} else if (navigationbar.getBarStyle().equals("BlackOpaque")) {
			style = "blackopaque";
		} else if (navigationbar.getBarStyle().equals("BlackTranslucent") || navigationbar.getBarStyle().equals("BlackTrans")) {
			style = "blacktranslucent";
		}

		headStr.append("style:\"").append(style).append("\"");

		// To check whether the page is a Tab. If it is a children page, default
		// back button is created

		// LeftBar System Button
		if (navigationbar.getLeftBarButton() != null) {
			headStr.append(",backBtn:");
			StringBuilder toolbar = buildToolBarItem(genapp,
					navigationbar.getLeftBarButton());
			headStr.append(toolbar);
		}

		else if (navigationbar.getBackBarButton() != null) {
		} else {

			boolean setLeftBar = false;
			if (defFile.getPage().isNavigationBarHidden())
				setLeftBar = false;
			else
				setLeftBar = true;
			for (Tabs tab : genapp.getMainFile().getTabs()) {
				if(tab.getDefFile() != null) {
					if (tab.getDefFile().getFileName()
							.equalsIgnoreCase(defFile.getFileName())) {
						setLeftBar = false;
					}
				}
			}

			if (setLeftBar) {
				headStr.append(",backBtn:{name:\"").append("\",");
				headStr.append(
						"events:{Tap:[{method:\"Back\",category:\"PageAction\"}]}")
						.append("}\n\t");
			}

		}

		// Right Bar System Button
		if (navigationbar.getRightBarButton() != null) {
			headStr.append(",forwardBtn:");
			StringBuilder toolbar = buildToolBarItem(genapp,
					navigationbar.getRightBarButton());
			headStr.append(toolbar);
		}

		return headStr.append("}");
	}

	private static StringBuilder buildToolBarItem(GenApp genapp,
			ToolBarItems barButton) {

		// TODO Auto-generated method stub
		StringBuilder toolbaritem = new StringBuilder();
		if (barButton.getType().equalsIgnoreCase("SystemItem")) {
			SystemItem systembutton = (SystemItem) barButton;

			// Creating Text Button Instead of Image Button For CANCEL,SAVE,DONE
			if (systembutton.getSystemItem().toLowerCase()
					.equalsIgnoreCase("cancel")
					|| systembutton.getSystemItem().toLowerCase()
							.equalsIgnoreCase("save")
					|| systembutton.getSystemItem().toLowerCase()
							.equalsIgnoreCase("done")
					|| systembutton.getSystemItem().toLowerCase()
							.equalsIgnoreCase("edit")
					|| systembutton.getSystemItem().toLowerCase()
							.equalsIgnoreCase("undo")
					|| systembutton.getSystemItem().toLowerCase()
							.equalsIgnoreCase("redo")) {

				toolbaritem
						.append("{type:\"text\",name:\"")
						.append((String) systembutton.getSystemItem()
								.toUpperCase()).append("\",");

			} else
				toolbaritem
						.append("{type:\"image\",src:\"")
						.append("btn_")
						.append((String) systembutton.getSystemItem()
								.toLowerCase()).append(".png").append("\",");

			if (systembutton.getEvent() != null) {
				toolbaritem.append("events:{");
				for (Event event : systembutton.getEvent()) {
					StringBuilder actions = ActionBuilder.buildAction(genapp,
							systembutton, event);
					toolbaritem.append(actions);
				}
				toolbaritem.append("}");
			}

			toolbaritem.append("}");
		}

		else if (barButton.getType().equalsIgnoreCase("TextItem")) {
			TextItem textitem = (TextItem) barButton;
			toolbaritem.append("{type:\"text\",name:\"")
					.append(Utility.parseText(textitem.getText())).append("\",");

			if (textitem.getEvent() != null) {
				toolbaritem.append("events:{");
				for (Event event : textitem.getEvent()) {
					StringBuilder actions = ActionBuilder.buildAction(genapp,
							textitem, event);
					toolbaritem.append(actions);
				}
				toolbaritem.append("}");
			}

			toolbaritem.append("}");

		}
		return toolbaritem;
	}

}
