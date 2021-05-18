package com.mobilous.mobileweb.actionbuilder;

import com.mobilous.mobileweb.action.Action;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.param.PageController;
import com.mobilous.mobileweb.ui.BaseView;

public class PageActionBuilder {

	public static StringBuilder build(GenApp genapp, BaseView baseview,
			Event event, Action action) {
		StringBuilder pageactionStr = new StringBuilder();
		PageController pagecontroller = (PageController) action.getParameters();
		
		StringBuilder applyConditionIfAny = new StringBuilder();
		
		if(pagecontroller.getCondition() != null){
			applyConditionIfAny.append(ConditionBuilder.setCondition(pagecontroller.getCondition(), baseview));
		}
		
		if (pagecontroller.getMethod().equalsIgnoreCase("View")) {
			// {Tap:[{method:"View",category:"PageAction",
			// params:{name:'page_7', transferdata:true}}]}}}]}DefFile page =
			// (DefFile) pagecontroller.getFile();
			pageactionStr.append("{method:\"View\",category:\"PageAction\"")
					.append(",params:{name:'")
					.append((pagecontroller.getFile() != null) ? pagecontroller.getFile().getFileName() : "noFileExsits")
					.append("',transferdata:")
					.append(pagecontroller.isTransferData())
					.append(",transitType:\'")
					.append(pagecontroller.getTransitType())
					.append("\',transition:\'")
					.append(pagecontroller.getTransition())
					.append("\'}")
					.append(applyConditionIfAny)
					.append("},");
		}else if (pagecontroller.getMethod().equalsIgnoreCase("SelectTab")) {
			pageactionStr.append("{method:\"SelectTab\",category:\"PageAction\"")
					.append(",params:{tab:\"")
					.append(pagecontroller.getTab())
//					.append("\",targetPage:\"")
//					.append(pagecontroller.getPageName(genapp))
					.append("\",transition:\"")
					.append(pagecontroller.getTransition())
					.append("\",resetEvent:")
					.append(pagecontroller.isResetEvent())
					.append("}")
					.append(applyConditionIfAny)
					.append("},");
		}else if (pagecontroller.getMethod().equalsIgnoreCase("popViewController")) {
			pageactionStr.append("{method:\"Back\",category:\"PageAction\"")
					.append(",params:{transition:\"")
					.append(pagecontroller.getTransition())
					.append("\"}")
					.append(applyConditionIfAny)
					.append("},");
		}else if (pagecontroller.getMethod().equalsIgnoreCase("popToRootViewController")) {
			pageactionStr.append("{method:\"popToRootViewController\",category:\"PageAction\"")
					.append(",params:{transition:\"")
					.append(pagecontroller.getTransition())
					.append("\"}").append(applyConditionIfAny)
					.append("},");
		}else if (pagecontroller.getMethod().equalsIgnoreCase("ReturnToParentView")) {
			pageactionStr.append("{method:\"ReturnToParentView\",category:\"PageAction\",")
					.append("params:{targetPage:\"")
					.append(pagecontroller.getPageName(genapp))
					.append("\"")
					.append(",transition:\"")
					.append(pagecontroller.getTransition())
					.append("\"}")
					.append(applyConditionIfAny)
					.append("},");			
		}else if (pagecontroller.getMethod().equalsIgnoreCase("TransitToSiblingView")) {
			pageactionStr.append("{method:\"TransitToSiblingView\",category:\"PageAction\",")
					.append("params:{name:'");
					//.append(pagecontroller.getPageName(genapp))
					//.append("',targetPage:\'")
					//.append(pagecontroller.getTargetPage())
					//.append("\'")
			if(pagecontroller.getTargetPage().length() == 0)
				pageactionStr.append(pagecontroller.getPageName(genapp)).append("\'");
			else
				pageactionStr.append(pagecontroller.getTargetPage()).append("\'");
			pageactionStr.append(",siblingPage:'")
		    		.append(pagecontroller.getSiblingPage()).append("\'");
			pageactionStr.append(",transferdata:")
					.append(pagecontroller.isTransferData())
					.append(",transitType:\'")
					.append(pagecontroller.getTransitType())
					.append("\',transition:\'")
					.append(pagecontroller.getTransition())
					.append("\'}")
					.append(applyConditionIfAny)
					.append("},");			
		}else if (pagecontroller.getMethod().equalsIgnoreCase("transitSideBar")) {
			pageactionStr.append("{method:\"transitSideBar\",category:\"PageAction\"")
					.append(",params:{name:'")
					.append((pagecontroller.getFile() != null) ? pagecontroller.getFile().getFileName() : "noFileExsits")
					.append("',transferdata:")
					.append(pagecontroller.isTransferData())
					.append(",transition:\'")
					.append(pagecontroller.getTransition())
					.append("\'}")
					.append(applyConditionIfAny)
					.append("},");
		}
		
		else if (pagecontroller.getMethod().equalsIgnoreCase("setParentData")) {
			pageactionStr.append("{method:\"setParentData\",category:\"PageAction\", name:'")
					.append(pagecontroller.getName())
					.append("',params:{value:\"")
					.append(pagecontroller.getValue())
					.append("\",reference:")
					.append(pagecontroller.isReference())
					
					.append("}")
					.append(applyConditionIfAny)
					.append("},");
			
		}else if (pagecontroller.getMethod().equalsIgnoreCase("resetViewData")) {
			pageactionStr.append("{method:\"ResetViewData\",category:\"MainValue\",")
					.append("params:{targetpage:'")
					.append(pagecontroller.getTargetPage())
					.append("'}")
					.append(applyConditionIfAny)
					.append("},");
		} else if (pagecontroller.getMethod().equalsIgnoreCase("setViewData")) {
			// {Tap:[{method:"SetMainValue",category:"MainValue",name:'s1',
			// params:{value:'main'}}]}},
			pageactionStr.append("{method:\"SetMainValue\",category:\"MainValue\", name:'")
					.append(pagecontroller.getName())
					.append("',params:{value:\"")
					.append(pagecontroller.getValue())
					.append("\",targetpage:'").append(pagecontroller.getTargetPage())
					.append("'}")
					.append(applyConditionIfAny)
					.append("},");
		}else if (pagecontroller.getMethod().equalsIgnoreCase("calculate")) {
			// Tap:[{method:"Calculate",category:"MainValue",name:'s3',
			// params:{value:'[s1]*[s2]'}}]}},
			pageactionStr.append("{method:\"Calculate\",category:\"MainValue\", name:\"")
					.append(pagecontroller.getName())
					.append("\",params:{value:\"")
					.append(pagecontroller.getValue())
					.append("\",targetpage:\"").append(pagecontroller.getTargetPage())
					.append("\"}")
					.append(applyConditionIfAny)
					.append("},");
		}else if (pagecontroller.getMethod().equalsIgnoreCase("appendString")) {
			// Tap:[{method:"AppendText",category:"MainValue",name:'s1',
			// params:{value:'as'}}]}},
			pageactionStr.append("{method:\"AppendText\",category:\"MainValue\",name:'")
					.append(pagecontroller.getName())
					.append("',params:{value:\"")
					.append(pagecontroller.getValue())
					.append("\",targetpage:'").append(pagecontroller.getTargetPage())
					.append("'}")
					.append(applyConditionIfAny)
					.append("},");
		}else if (pagecontroller.getMethod().equalsIgnoreCase("clearString")) {
			// Tap:[{method:"ClearText",category:"MainValue",name:'s2'}]}}
			pageactionStr.append("{method:\"ClearText\",category:\"MainValue\", name:'")
					.append(pagecontroller.getName())
					.append("',params:{targetpage:'").append(pagecontroller.getTargetPage())
					.append("'}")
					.append(applyConditionIfAny)
					.append("},");
		}else if (pagecontroller.getMethod().equalsIgnoreCase("deleteLastOneCharacter")) {
			// {Tap:[{method:"DeleteLastOneCharacter",category:"MainValue",name:'s1'}]}},
			pageactionStr.append("{method:\"DeleteLastOneCharacter\",category:\"MainValue\", name:\"")
					.append(pagecontroller.getName())
					.append("\",params:{targetpage:\"")
					.append(pagecontroller.getTargetPage()).append("\"}")
					.append(applyConditionIfAny)
					.append("},");
		}else if (pagecontroller.getMethod().equalsIgnoreCase("combineToCsv")) {
			pageactionStr.append("{method:\"combineToCsv\",category:\"MainValue\",")
					.append("params:{").append("prefix:'")
					.append(pagecontroller.getPrefix()).append("',result:'")
					.append(pagecontroller.getResult()).append("'}")
					.append(applyConditionIfAny)
					.append("},");
		}else if(pagecontroller.getMethod().equalsIgnoreCase("splitCsv")){
			pageactionStr.append("{method:\"SplitCSV\",category:\"MainValue\",name:'")
				.append(pagecontroller.getName())
				.append("',params:{prefix:'")
				.append(pagecontroller.getSplitCSV_prefix())
				.append("',csvrowdata:'").append(pagecontroller.getSplitCSV_rowData())
				.append("',targetpage:'").append(pagecontroller.getTargetPage())
				.append("'}")
				.append(applyConditionIfAny)
				.append("},");
			
		}else if (pagecontroller.getMethod().equalsIgnoreCase("StrToHex")) {
			pageactionStr.append("{method:\"StrToHex\",category:\"MainValue\", name:'")
					.append(pagecontroller.getName())
					.append("',params:{value:\"")
					.append(pagecontroller.getValue())
					.append("\",targetpage:'").append(pagecontroller.getTargetPage())
					.append("'}")
					.append(applyConditionIfAny)
					.append("},");
		}else if (pagecontroller.getMethod().equalsIgnoreCase("HexToStr")) {
			pageactionStr.append("{method:\"HexToStr\",category:\"MainValue\", name:'")
					.append(pagecontroller.getName())
					.append("',params:{value:\"")
					.append(pagecontroller.getValue())
					.append("\",targetpage:'").append(pagecontroller.getTargetPage())
					.append("'}")
					.append(applyConditionIfAny)
					.append("},");
		}

		return pageactionStr;
	}
}
