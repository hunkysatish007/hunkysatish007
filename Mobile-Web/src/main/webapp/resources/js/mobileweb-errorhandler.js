/**
 * Author: Akhil Tyagi
 * Date: June 01, 2013
 */

(function($) {

	var ErrorHandlerMethods = {
		init : function(options) {
			if (ErrorHandlerMethods.data == undefined) {
				ErrorHandlerMethods.data = {

				};
				$.extend(ErrorHandlerMethods.data, options);
			} else
				$.error('[CRIT] Cannot make multiple instances of jQuery.ErrorHandlerMethods');
			return this;
		},
		

		
		checkPageTransition : function (action){
			

			if((action['method']=='popToRootViewController') || (action['method']=='Back')){
				 var _page ='';
				 var splitPageTest = '';
				 var _pagename = $.mobileweb.getCurrentPage().getName();
				 var count = 0;
				 do {
					 _page = $.utility('getObject',$.mobileweb['pages'],'name',_pagename);
					 if(_page != undefined){
						 _pagename = _page['parent'];
						 splitPageTest = _page;
					 }
					
					 count++;
				 }while(_page!= undefined);
				 if(count==2 && (splitPageTest != undefined && ( splitPageTest['parentType'] === undefined || splitPageTest['parentType'] != "SplitView")))
					return true;
				else if(count==2){
					return false;
				}else
					return true;
			}
			
			var params= action['params'];
			if(params['tab']!=undefined){
				if(params['tab']===""){
					var eng="Some missing parameter on action: Select Tab , Page: "+$.mobileweb.getCurrentPage().getTitle()+".";
					var jap="ページ: "+$.mobileweb.getCurrentPage().getTitle()+" のアクション: Select Tab  に、パラメータが足りません。";
					if((action['events']== undefined) || (action['events']['Error']== undefined) || (action['events']['Error'].length==0))
					$.errorhandler('alertBox',eng,jap);
					 return false;
					}
				var flag =false;
				$.each($.mobileweb['tabs'],function(i,tab){
					var id= tab['id'].split("-")[1];
					if(tab['id']!= 'tab-more') {
						id--;
						if(params['tab']==id){
							if($.mobileweb.getCurrentPage().getName()==tab['page']){}
							else
							flag=true;
						}
					
					}
					else{
						$.each(tab['tabs'],function(j,moretab){
							var moretabid= moretab['id'].split("-")[1];
							moretabid--;
							if(params['tab']==moretabid){
								if($.mobileweb.getCurrentPage().getName()==moretab['page']){}
								flag=true;
							}
						});
					}
				});
				
				
				if(!flag){
				var eng="UI Parts problem. Page: "+$.mobileweb.getCurrentPage().getTitle()+" , Description: Invalid Tab Index passed while applying Select Tab action.";
				var jap="表示部品に問題があります。ページ名: "+$.mobileweb.getCurrentPage().getTitle()+"  , 明細： Select Tab アクションで、無効なタブインデックスが指定されています。";
				
				if((action['events']== undefined) || (action['events']['Error']== undefined) || (action['events']['Error'].length==0))
				$.errorhandler('alertBox',eng,jap);
				}
				
				return flag;
			}
			else if(params['name']!=undefined){
					if(params['name']==""){
					var eng="Some missing parameters on action: Go to Child Page , Page: "+$.mobileweb.getCurrentPage().getTitle()+".";
					var jap="ページ: "+$.mobileweb.getCurrentPage().getTitle()+" のアクション: Go to Child Page に、パラメータが足りません。";
					if((action['events']== undefined) || (action['events']['Error']== undefined) || (action['events']['Error'].length==0))
					$.errorhandler('alertBox',eng,jap);
					}
					
					var page =  $.utility('getObject',$.mobileweb['pages'],'name',params['name']);
					if($.isEmptyObject(page)){
						if(params['name']!=""){
							var eng="UI Parts problem. Page: "+$.mobileweb.getCurrentPage().getTitle()+" , Description: Invalid Page Name passed while applying Go To Child Page action.";
							var jap="表示部品に問題があります。ページ名: "+$.mobileweb.getCurrentPage().getTitle()+"  , 明細： Go To Child Page アクションで、無効なページ名が指定されています。";
							if((action['events']== undefined) || (action['events']['Error']== undefined) || (action['events']['Error'].length==0))
							$.errorhandler('alertBox',eng,jap);
						}
						return false;
					}
					else
					return true;
			}
			
		},
		
		checkWarningController : function (action) {
			if(action['method']=='StartWaitIndicator'){
				if((action['params']['timeout']=="")||(action['params']['timeout']== undefined)||(isNaN(action['params']['timeout']))){
					return false;
				}
				else
					return true;
			}
		},
		
		checkTargetUIObject : function(targetui, params , action) {
			if((action['method'] !== "ResetViewData") && (action['method'] !== "PlaySE")&&(action['method'] !== "combineToCsv")/*&&(targetui.getViewType() !== "GoogleMap")*/){
				if(($.isEmptyObject(targetui)) || (targetui==="") || (targetui===undefined) || (targetui===null)){
					var eng="UI Parts problem. Page: "+$.mobileweb.getCurrentPage().getTitle()+", Action: "+action['method']+" , Description: Target UI "+action['name']+" is missing.";
					var jap="表示部品に問題があります。ページ名: "+$.mobileweb.getCurrentPage().getTitle()+"  ,UIパーツ  "+action['name']+" が指定されていません "+action['method']+" アクションで。";
//					var eng="UI Parts problem. Page: "+$.mobileweb.getCurrentPage().getTitle()+", Description: Target UI is missing in "+action['method']+" action.";
//					var jap="表示部品に問題があります。ページ名: "+$.mobileweb.getCurrentPage().getTitle()+"  , 明細：  "+action['method']+" アクションで、UIパーツが指定されていません。";
					if($.mobileweb['state'] === 'preview')//Bug #6469 fix
						$.errorhandler('alertBox',eng,jap);
					else if((action['events']== undefined) || (action['events']['Error']== undefined) || (action['events']['Error'].length==0))
						$.errorhandler('alertBox',eng,jap);
					return false;
				}else if((targetui.getId() === "") || (targetui.getId() === undefined)){
					return false;
				}
			}
			
			if(params['targetpage'] !== undefined && params['targetpage'] !=""){
				var uiObject =  $.utility('getUiFromObject', params['targetpage'], targetui.getName());
				if($.isEmptyObject(uiObject)){
					var eng="UI Parts problem. Page: "+$.mobileweb.getCurrentPage().getTitle()+" , Description: Invalid Page Name passed while applying "+action['method']+" action.";
					var jap="表示部品に問題があります。ページ名: "+$.mobileweb.getCurrentPage().getTitle()+"  , 明細： "+action['method']+" アクションで、無効なページ名が指定されています。";
					if((action['events']== undefined) || (action['events']['Error']== undefined) || (action['events']['Error'].length==0))
					$.errorhandler('alertBox',eng,jap);
					return false;
				}
			}
			
			if(params['value'] !== undefined){
				if((params['value'] === "") || ((params['value'].indexOf("[") == -1) && (params['value'].indexOf("]") != -1)) || ((params['value'].indexOf("[") != -1) && (params['value'].indexOf("]") == -1))){
					var eng="UI Parts problem. Page: "+$.mobileweb.getCurrentPage().getTitle()+" , Description: Invalid Page Name or Target UI passed while applying"+action['method']+"action.";
					var jap="表示部品に問題があります。ページ名: "+$.mobileweb.getCurrentPage().getTitle()+" , 明細： "+action['method']+" アクションで、無効なページ名 または UIパーツ名が指定されています。";
					if((action['events']== undefined) || (action['events']['Error']== undefined) || (action['events']['Error'].length==0))
					$.errorhandler('alertBox',eng,jap);
					return false;
				}else{
					if(action['method'] == "Calculate"){ //only for calculate
						var chunks = params['value'].split("[");
							for (var i in chunks) {
								if (chunks[i].indexOf("]") != -1){
									var j=chunks[i].indexOf("]");
									var org="[" + chunks[i].substring(0,j) + "]";
									var fin='';
									fin=$.utility('CheckAndGetUIElementValue',$("[name='"+chunks[i].substring(0,j)+ "']"));
									if((fin!="")&&(!isNaN(fin))) {
										if(i== chunks.length-1){
										return true;
										}
									continue;
									}
									else {
									if(fin== undefined){
										var eng="UI Parts problem. Page: "+$.mobileweb.getCurrentPage().getTitle()+" , Description: Invalid Page Name or Target UI passed while applying "+action['method']+" action.";
										var jap="表示部品に問題があります。ページ名: "+$.mobileweb.getCurrentPage().getTitle()+" , 明細： "+action['method']+" アクションで、無効なページ名 または UIパーツ名が指定されています。";
										if((action['events']== undefined) || (action['events']['Error']== undefined) || (action['events']['Error'].length==0))
										$.errorhandler('alertBox',eng,jap);
										return false;
									}
									else {
										var eng="UI Parts problem. Page: "+$.mobileweb.getCurrentPage().getTitle()+" , Description: Invalid Value passed while applying "+action['method']+" action.";
										var jap="表示部品に問題があります。ページ名: "+$.mobileweb.getCurrentPage().getTitle()+" , 明細：  "+action['method']+" >アクションで、無効な値が指定されています。";
										if((action['events']== undefined) || (action['events']['Error']== undefined) || (action['events']['Error'].length==0))
										$.errorhandler('alertBox',eng,jap);
										return false;
									}
									}
								}	
							}
					}
					else {
					if(params['value'].indexOf("[")!=-1 && params['value'].indexOf("]")!=-1 && targetui.getViewType() !== "GoogleMap"){/*
						fin=params['value'].replace("[", "");
						fin=fin.replace("]", "");
						var targetValue='';
						targetValue=fin=$.utility('CheckAndGetUIElementValue',$("[name='"+fin+ "']"));
						if(((targetValue === "")||($.isEmptyObject(targetValue))) && action['method'] != "SetMainValue"){	// not valid for setMainValue because of SplitCSV..
							var eng="UI Parts problem. Page: "+$.mobileweb.getCurrentPage().getTitle()+" , Description: Invalid Page Name or Target UI passed while applying "+action['method']+" action.";
							var jap="表示部品に問題があります。ページ名: "+$.mobileweb.getCurrentPage().getTitle()+" , 明細： "+action['method']+" アクションで、無効なページ名 または UIパーツ名が指定されています。";
							if((action['events']== undefined) || (action['events']['Error']== undefined) || (action['events']['Error'].length==0))
							$.errorhandler('alertBox',eng,jap);
							return false;
							}
					*/return true;}
					return true;
				}
				}
			}else {
				return true;
			}
		},
		
		checkFrameParams : function(targetui,params,action){
			var params=action['params'];
			if(ErrorHandlerMethods.checkTargetUIObject(targetui,params,action)){
				if(action['method'] != "moveObject"){
					if((params['x'] !== undefined) && (params['x'] < 0)){
						return false;
					}else if((params['y'] !== undefined) && (params['y'] < 0)){
						return false;
					}
				}
				if((params['width'] !== undefined) && (params['width'] <= 0)){
					return false;
				}else if((params['height'] !== undefined) && (params['height'] <= 0)){
					return false;
				}else if((params['degree'] !== undefined) && (params['degree'] == 0)){
					return false;
				}else if(params['image'] !== undefined){
					if(params['image'] == ""){ //||(params['image'].indexOf(".")<0) is removed because now image could also be like '[tf]'.. Akhil Tyagi
						var eng="UI Parts problem. Page: "+$.mobileweb.getCurrentPage().getTitle()+" , Description: Invalid Image Name passed while applying "+action['method']+" action.";
						var jap="表示部品に問題があります。ページ名: "+$.mobileweb.getCurrentPage().getTitle()+" , 明細："+action['method']+" アクションで、無効なイメージ名が指定されています。";
						if((action['events']== undefined) || (action['events']['Error']== undefined) || (action['events']['Error'].length==0))
						$.errorhandler('alertBox',eng,jap);
						return false;
					}
					return true;
				}else{
					return true;
				}
				
			}else{
				return false;
			}
		},
		
		checkErrorForMaps : function(targetui, params ,action){
			if(ErrorHandlerMethods.checkTargetUIObject(targetui, params,action)){
				if((params['fromlocation'] !== undefined) && ((params['fromlocation'] === "") || (!ErrorHandlerMethods.checkSquareBracketValue(params['fromlocation'])))){
					return false;
				}else if((params['tolocation'] !== undefined) && ((params['tolocation'] === "") || (!ErrorHandlerMethods.checkSquareBracketValue(params['tolocation'])))){
					return false;
				}else if((params['latitude'] !== undefined) && ((params['latitude'] === "") || (!ErrorHandlerMethods.checkSquareBracketValue(params['latitude'])))){
					return false;
				}else if((params['longitude'] !== undefined) && ((params['longitude'] === "") || (!ErrorHandlerMethods.checkSquareBracketValue(params['longitude'])))){
					return false;
				}else{
					return true;
				}
			}else{
				return false;
			}
		},
		
		checkErrorForDB : function(targetui, params){
			if((params['tablename'] !== undefined) && (params['tablename'] === "")){
				return false;
			}else{
				return true;
			}
		},
		
		checkforTextSupportedUI : function(param){
			var _textNotSupportedUI = ['Image','WebView','ImageButtton','ComboBox','DatePicker','TileList','RoundButton','Camera','VideoBox','SoundBox','ProgressBar','Indicator','Slider','SwitchBar','SystemButton','ToggleButton','GoogleMap'];
			if(jQuery.inArray(param, _textNotSupportedUI) !== -1){
				return false;
			}else{
				return true;
			}
		},
		
		checkSquareBracketValue : function(value){/*
			value = value.toString();
			if(value.indexOf("[")!=-1 && value.indexOf("[")!=-1 ){
				var targetValue = "";
				fin=value.replace("[", "");
				fin=fin.replace("]", "");
				targetValue=fin=$.utility('CheckAndGetUIElementValue',$("[name='"+fin+ "']"), pagedef);
				if(targetValue === ""){
					return false;
				}else{
					return true;
				}
			}else if((value.indexOf("[")==-1 && value.indexOf("[")==-1) && (value !== "")){
				return true;
			}else{
				return false;
			}
		 */
			return true;
		},
		
		alertBox : function(errorMessageEnglish,errorMessageJapanese, changeScreen){
			if(changeScreen === 'changeDefaultScreen'){
				
				//var Left = parseInt($('.scroller').css('left'),10) + (parseInt($('.scroller').css('width'),10) - 320)/2;
				var Left = (document.documentElement.clientWidth - 320)/2;
				//<li>'+errorMessageJapanese +'</li>
				$.blockUI({ message:'<section><article style=""class="message clearfix"><h1>There is a problem!</h1><p>The following issues have been found:</p><ul><li>'+errorMessageEnglish+'</li><br></ul><button id="cancelAlert" style="cursor:pointer;">OK</button> </article</section>', css: { position:'relative',border: 'none', backgroundColor: '',left :Left+'px','height':'376px',width:320+'px','padding':'0px',  '-webkit-border-radius': '10px', '-moz-border-radius': '10px', 'text-align':'left', color: '#fff', top:"45px", opacity:"0.9", cursor:""}	});

				$('.message errorMessage>ul>li').css({'word-wrap':'break-word'});

				$('#cancelAlert').bind('click touchstart tap',function(){
					$.unblockUI();
					 window.location.href = "./index_1.html" ;
					return false; 
				});
			
			}else{
				var HTMLMessage = "";
				if(errorMessageJapanese === undefined || errorMessageJapanese === ""){
					HTMLMessage = '<section><article style=""class="message clearfix"><h1>There is a problem!</h1><p>The following issues have been found:</p><ul><li>'+errorMessageEnglish+'</li></ul><button id="cancelAlert" style="cursor:pointer;">OK</button> </article</section>';
				}else{
					HTMLMessage = '<section><article style=""class="message clearfix"><h1>There is a problem!</h1><p>The following issues have been found:</p><ul><li>'+errorMessageEnglish+'</li><br><li>'+errorMessageJapanese +'</li></ul><button id="cancelAlert" style="cursor:pointer;">OK</button> </article</section>';
				}
				var Left = parseInt($('.scroller').css('left'),10) + (parseInt($('.scroller').css('width'),10) - 320)/2;
				$.blockUI({ message:HTMLMessage, css: { position:'absolute',border: 'none', backgroundColor: '',left :Left+'px','height':'376px',width:320+'px','padding':'0px',  '-webkit-border-radius': '10px', '-moz-border-radius': '10px', 'text-align':'left', color: '#fff', top:"45px", opacity:"0.9", cursor:""}	});

				$('.message errorMessage>ul>li').css({'word-wrap':'break-word'});

				$('#cancelAlert').bind('click touchstart tap',function(){
					$.unblockUI(); 
					return false; 
				});
			}
		}, 
		
		previewAlertBox : function(errMessageEng, errMessageJap){
			var HTMLMessage="";
			if(errMessageJap != undefined){
				HTMLMessage = '<section><article style=""class="message clearfix"><h1>There is a problem!</h1><p>The following issues have been found:</p><ul><li>'+errMessageEng+'</li><br><li>'+errMessageJap +'</li></ul><button id="cancelAlert" style="cursor:pointer;">OK</button> </article</section>';	
			}else{
				HTMLMessage = '<section><article style=""class="message clearfix"><h1>There is a problem!</h1><p>The following issues have been found:</p><ul><li>'+errMessageEng+'</li></ul><button id="cancelAlert" style="cursor:pointer;">OK</button> </article</section>';
			}
			
			var Left = parseInt($('.scroller').css('left'),10) + (parseInt($('.scroller').css('width'),10) - 320)/2;
			$.blockUI({ message:HTMLMessage, css: { position:'absolute',border: 'none', backgroundColor: '',left :Left+'px','height':'376px',width:320+'px','padding':'0px',  '-webkit-border-radius': '10px', '-moz-border-radius': '10px', 'text-align':'left', color: '#fff', top:"45px", opacity:"0.9", cursor:""}	});

			$('.message errorMessage>ul>li').css({'word-wrap':'break-word'});

			$('#cancelAlert').bind('tap',function(){
				$.unblockUI(); 
				return false; 
			});
		},
		
		messageBox : function(msgEnglish, msgJapanese, title){
			if(title === undefined || title === "")
				title = "Message";
			
			var msgHTML = "";
			if(msgJapanese === undefined || msgJapanese === ""){
				msgHTML = '<section><article style=""class="message clearfix"><h1>'+title+'</h1><p>The following issues have been found:</p><ul><li>'+msgEnglish+'</li></ul><button id="cancelMessage" style="cursor:pointer;">OK</button> </article</section>';
			}else{
				msgHTML = '<section><article style=""class="message clearfix"><h1>'+title+'</h1><p>The following issues have been found:</p><ul><li>'+msgEnglish+'</li><br><li>'+msgJapanese +'</li></ul><button id="cancelMessage" style="cursor:pointer;">OK</button> </article</section>';
			}
			var Left = parseInt($('.scroller').css('left'),10) + (parseInt($('.scroller').css('width'),10) - 320)/2;
			$.blockUI({ message:msgHTML, css: { position:'absolute',border: 'none', backgroundColor: '',left :Left+'px','height':'376px',width:320+'px','padding':'0px',  '-webkit-border-radius': '10px', '-moz-border-radius': '10px', 'text-align':'left', color: '#fff', top:"45px", opacity:"0.9", cursor:""}	});

			$('.message errorMessage>ul>li').css({'word-wrap':'break-word'});

			$('#cancelMessage').bind('click touchstart tap',function(){
				$.unblockUI(); 
				return false; 
			});
		}
		
	};
	
	$.errorhandler = function(method) {
		if (ErrorHandlerMethods[method]) {
			if (ErrorHandlerMethods.data == undefined) {
				ErrorHandlerMethods.init();
			}
			;
			return ErrorHandlerMethods[method].apply(this, Array.prototype.slice
					.call(arguments, 1));
		} else if (typeof method === 'object' || !method)
			return ErrorHandlerMethods.init.apply(this, arguments);
		else
			$.error('Method ' + method
					+ ' does not exist on jQuery.ErrorHandler');
	};

})(jQuery);
