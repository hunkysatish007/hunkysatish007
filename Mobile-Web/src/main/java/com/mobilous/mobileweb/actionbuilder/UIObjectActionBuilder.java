package com.mobilous.mobileweb.actionbuilder;

import com.mobilous.mobileweb.uibuilder.ImageFileBuilder;
import com.mobilous.mobileweb.param.UIObjectController;
import com.mobilous.mobileweb.action.Action;
import com.mobilous.mobileweb.app.GenApp;
import com.mobilous.mobileweb.event.Event;
import com.mobilous.mobileweb.ui.BaseView;

public class UIObjectActionBuilder {

	public static StringBuilder build(GenApp genapp, BaseView baseview,
			Event event, Action action){
		StringBuilder actionstr=new StringBuilder();
		UIObjectController uiobjectcontroller = (UIObjectController) action.getParameters();
		StringBuilder applyConditionIfAny = new StringBuilder();
		
		if(uiobjectcontroller.getCondition() != null){
			applyConditionIfAny.append(ConditionBuilder.setCondition(uiobjectcontroller.getCondition(), baseview));
		}
		
		if (uiobjectcontroller.getMethod().equalsIgnoreCase("moveObject")) {
		//	{method:"MoveObject",category:"UIObjectAction",name:'s',params:{x:60,y:60}},
			String x = "0";
			String y = "0";
			x=uiobjectcontroller.getX();
			y=uiobjectcontroller.getY();
			actionstr.append("{method:\"moveObject\",category:\"UIObjectAction\", name:'")
			.append(uiobjectcontroller.getName())
			.append("',params:{x:'")
			.append(x)
			.append("',y:'")
			.append(y)
			.append("',animation:'")
			.append(uiobjectcontroller.getAnimation())
			.append("',duration:'")
			.append(uiobjectcontroller.getDuration())
			.append("',targetpage:'").append(uiobjectcontroller.getTargetPage())
			.append("'}")
			.append(applyConditionIfAny)
			.append("},");
			
		}
		
		// rotateObject
		else if (uiobjectcontroller.getMethod().equalsIgnoreCase("rotateObject")) {
			actionstr.append("{method:\"rotateObject\",category:\"UIObjectAction\", name:'")
			.append(uiobjectcontroller.getName())
			.append("',params:{x:'")
			.append(uiobjectcontroller.getCenterX())
			.append("',y:'")
			.append(uiobjectcontroller.getCenterY())
			.append("',degree:'")
			.append(uiobjectcontroller.getDegree())
			.append("',animation:'")
			.append(uiobjectcontroller.getAnimation())
			.append("',duration:'")
			.append(uiobjectcontroller.getDuration())
			.append("',targetpage:'").append(uiobjectcontroller.getTargetPage())
			.append("'}")
			.append(applyConditionIfAny)
			.append("},");
			
		}
		
		// setFrame
		else if (uiobjectcontroller.getMethod().equalsIgnoreCase("setFrame")) {
		//Tap:[{method:"SetFrame",category:"UIObjectAction", params:{target:'s1',pagename:'page_3888',coordinate:{x:50,y:50,width:80,height:80}}}]}},			
			actionstr.append("{method:\"setFrame\",category:\"UIObjectAction\", name:'")
			.append(uiobjectcontroller.getName())
			.append("',params:{x:'")
			.append(uiobjectcontroller.getX())
			.append("',y:'")
			.append(uiobjectcontroller.getY())
			.append("',width:'")
			.append(uiobjectcontroller.getWidth())
			.append("',height:'")
			.append(uiobjectcontroller.getHeight())
			.append("',targetpage:'").append(uiobjectcontroller.getTargetPage())
			.append("'}")
			.append(applyConditionIfAny)
			.append("},");
		}
			
		// setColor
		else if (uiobjectcontroller.getMethod().equalsIgnoreCase("setColor")) {
			actionstr.append("{method:\"setColor\",category:\"UIObjectAction\", name:'")
			.append(uiobjectcontroller.getName())
			.append("',params:{color:'rgba(")
			.append((int) (uiobjectcontroller.getColor().getRed()* 255))
			.append(",")
			.append((int) (uiobjectcontroller.getColor().getGreen()* 255))
			.append(",")
			.append((int) (uiobjectcontroller.getColor().getBlue()* 255))
			.append(",")
			.append(uiobjectcontroller.getColor().getAlpha())
			.append(")',targetpage:'").append(uiobjectcontroller.getTargetPage())
			.append("' ,setProperties:{");
			if(uiobjectcontroller.getUiProperties() != null){
				if(uiobjectcontroller.getUiProperties().contains("Font".toString())){
					actionstr.append("font:true,");
				}else {
					actionstr.append("font:false,");
				}
				if(uiobjectcontroller.getUiProperties().contains("BG Color".toString())){
					actionstr.append("background:true,");
				}else {
					actionstr.append("background:false,");
				}
				if(uiobjectcontroller.getUiProperties().contains("Border Color".toString())){
					actionstr.append("border:true,");
				}else {
					actionstr.append("border:false,");
				}
			}else {
				actionstr.append("font:true,");
				actionstr.append("background:false,");
				actionstr.append("border:false,");
			}
			actionstr.append("}}")
			.append(applyConditionIfAny)
			.append("},");
		}
		else if (uiobjectcontroller.getMethod().equalsIgnoreCase("setValue")) {
		//	{Tap:[{method:"SetMainValue",category:"MainValue",name:'s1', params:{value:'main'}}]}
				actionstr.append("{method:\"setValue\",category:\"UIObjectAction\", name:\"")
				.append(uiobjectcontroller.getName())
				.append("\",params:{value:\"")
				.append(uiobjectcontroller.getValue())
				.append("\",key:\"")
				.append(uiobjectcontroller.getKey());
				if(!uiobjectcontroller.getCellId().equalsIgnoreCase("-1") && !uiobjectcontroller.getGroupId().equalsIgnoreCase("-1")){
					actionstr.append("\",groupId:\"").append(uiobjectcontroller.getGroupId())
					.append("\",cellId:\"")
					.append(uiobjectcontroller.getCellId());
				}
				actionstr.append("\",targetpage:\"").append(uiobjectcontroller.getTargetPage())
				.append("\"}")
				.append(applyConditionIfAny)
				.append("},");
				
			}
		else if (uiobjectcontroller.getMethod().equalsIgnoreCase("setImage")) {
			//	{Tap:[{method:"SetMainValue",category:"MainValue", params:{target:'s1',pagename:'page_3888',value:'main'}}]}
		
			StringBuilder imageStr = new StringBuilder();
			if(uiobjectcontroller.getImage().getFileName().contains("[") && uiobjectcontroller.getImage().getFileName().contains("]")){
				if(!uiobjectcontroller.getImage().getSrcLocation().equalsIgnoreCase("Remote")){
					if(uiobjectcontroller.getImage().getFileExt().equalsIgnoreCase("")){
						imageStr.append(uiobjectcontroller.getImage().getFileName());
					}else if(uiobjectcontroller.getImage().getSrcLocation().equalsIgnoreCase("Bundle")){
						imageStr.append(uiobjectcontroller.getImage().getFileName() + "." + uiobjectcontroller.getImage().getFileExt());
					}else {
						imageStr.append(uiobjectcontroller.getImage().getFileName());
					}
				}else{
					imageStr.append(uiobjectcontroller.getImage().getFileName());
				}
				
			}else{
				if(uiobjectcontroller.isReference()) {
					imageStr.append(uiobjectcontroller.getReferenceTarget());					
				}
				else
					imageStr.append(ImageFileBuilder.buildImageFile(genapp,uiobjectcontroller.getImage()));
			}
			
			
			String src= new String();
			if(uiobjectcontroller.getImage().getSrcLocation().equalsIgnoreCase("remoteFile")){
				src="remote";
				actionstr.append("{method:\"setImage\",category:\"UIObjectAction\", name:'")
				.append(uiobjectcontroller.getName())
				.append("',params:{image:'")
				.append(uiobjectcontroller.getImage().getFileName())
				.append("',src:'")
				.append(src)
				.append("',reference:")
 				.append(uiobjectcontroller.isReference())
 				.append(",targetpage:'").append(uiobjectcontroller.getTargetPage());
				if(uiobjectcontroller.getAnimateTime().equalsIgnoreCase("")){
					actionstr.append("'}");
				}else{
					actionstr.append("',animateTime:'").append(uiobjectcontroller.getAnimateTime())
					.append("'}");
				}
				actionstr.append(applyConditionIfAny)
				.append("},");
			}else if(uiobjectcontroller.getImage().getSrcLocation().equalsIgnoreCase("url")){
				src="url";
				actionstr.append("{method:\"setImage\",category:\"UIObjectAction\", name:'")
				.append(uiobjectcontroller.getName())
				.append("',params:{image:'")
				.append(uiobjectcontroller.getImage().getUrl(genapp) + imageStr)
				.append("',imageName:'")
 				.append(uiobjectcontroller.getImage().getImageName())	
				.append("',src:'")
				.append(src)
				.append("',reference:")
 				.append(uiobjectcontroller.isReference())
 				.append(",targetpage:'").append(uiobjectcontroller.getTargetPage());
				if(uiobjectcontroller.getAnimateTime().equalsIgnoreCase("")){
					actionstr.append("'}");
				}else{
					actionstr.append("',animateTime:'").append(uiobjectcontroller.getAnimateTime())
					.append("'}");
				}
				actionstr.append(applyConditionIfAny)
				.append("},");
			}else if(uiobjectcontroller.getImage().getSrcLocation().equalsIgnoreCase("bundle")){
 				src="bundle";
 				actionstr.append("{method:\"setImage\",category:\"UIObjectAction\", name:'")
 				.append(uiobjectcontroller.getName())
 				.append("',params:{image:'")
 				.append(imageStr)
 				.append("',src:'")
 				.append(src)
 				.append("',reference:")
 				.append(uiobjectcontroller.isReference())
 				.append(",targetpage:'").append(uiobjectcontroller.getTargetPage());
 				if(uiobjectcontroller.getAnimateTime().equalsIgnoreCase("")){
 					actionstr.append("'}");
 				}else{
 					actionstr.append("',animateTime:'").append(uiobjectcontroller.getAnimateTime())
 					.append("'}");
 				}
 				actionstr.append(applyConditionIfAny)
 				.append("},");
 			}else{
 				src=uiobjectcontroller.getImage().getSrcLocation();
				
				actionstr.append("{method:\"setImage\",category:\"UIObjectAction\", name:'")
				.append(uiobjectcontroller.getName())
				.append("',params:{image:'")
				.append(imageStr)
				.append("',src:'")
				.append(src)
				.append("',targetpage:'").append(uiobjectcontroller.getTargetPage());
				if(uiobjectcontroller.getAnimateTime().equalsIgnoreCase("")){
					actionstr.append("'}");
				}else{
					actionstr.append("',animateTime:'").append(uiobjectcontroller.getAnimateTime())
					.append("'}");
				}
				actionstr.append(applyConditionIfAny)
				.append("},");
			}
				
		}else if(uiobjectcontroller.getMethod().equalsIgnoreCase("movingFocus")){
			actionstr.append("{method:\"movingFocus\",category:\"UIObjectAction\", name:'")
			.append(uiobjectcontroller.getTargetUI())
			.append("',params:{targetUI:\"")
			.append(uiobjectcontroller.getTargetUI())
			.append("\"}")
			.append(applyConditionIfAny)
			.append("},");
			
		}else if(uiobjectcontroller.getMethod().equalsIgnoreCase("setFocusOff")){
			actionstr.append("{method:\"setFocusOff\",category:\"UIObjectAction\", name:'")
			.append(uiobjectcontroller.getTargetUI())
			.append("',params:{targetUI:\"")
			.append(uiobjectcontroller.getTargetUI())
			.append("\"}")
			.append(applyConditionIfAny)
			.append("},");
			
		}else if (uiobjectcontroller.getMethod().equalsIgnoreCase("ShowGadget")) {
			// Tap:[{method:"ShowGadget",category:GadgetAction",
			// params:{name:''}}]}},
			actionstr
					.append("{method:\"ShowGadget\",category:\"GadgetAction\", name:\"")
					.append(uiobjectcontroller.getName()).append("\"")
					//.append("\",params:{name:\"")
					//.append(uiobjectcontroller.getName())
					//.append("\"}")
					.append(applyConditionIfAny)
					.append("},");
		}else if (uiobjectcontroller.getMethod().equalsIgnoreCase("HideGadget")) {
			// Tap:[{method:"HideGadget",category:GadgetAction",
			// params:{name:''}}]}},
			actionstr
					.append("{method:\"HideGadget\",category:\"GadgetAction\", name:\"")
					.append(uiobjectcontroller.getName()).append("\"")
					//.append("\",params:{name:\"")
					//.append(uiobjectcontroller.getName())
					//.append("\"}")
					.append(applyConditionIfAny)
					.append("},");
		}
		
		return actionstr;
		
	}
	
}
