/**
 *Author: Mato Shibiru * Date: Sept 5, 2012
 * jQuery Plugin that handles the core
 */

(function($){
	$.mobileweb = function(project){
		
		//Request #12227
		if(navigator.appVersion.indexOf("Win")!=-1) {
			var ua = navigator.userAgent.toLowerCase(); 
			if (ua.indexOf('safari') != -1) { 
				if (ua.indexOf('chrome') > -1) {
				    //Chrome
				  } else {
					  $.errorhandler('alertBox',"This browser(Windows > Safari) does not support MW url.");
					  $(".blockOverlay").css({'cursor':'none'});
				  }
			}
		}
		
		$.mobileweb = JSON.parse(JSON.stringify(project));
		$.mobileweb.device = {
								iframe: false,
								standalone: ("standalone" in window.navigator) && window.navigator.standalone,
								orientation: (document.documentElement.clientWidth>document.documentElement.clientHeight)?"landscape-right":"portrait-up",
								type: $.utility('getDeviceType')
							};
				
		$.mobileweb['serverport'] = "8181";	//it will be good if we got this into project data to maintain backward compatibility
		$.utility('setServerPort', $.mobileweb['serverport']);
		
		// Setting for first time...
		$.utility('setBootingForFirstTime', true);

		//window.addEventListener("touchstart",function() {
		    // Set a timeout...
			//setTimeout(function(){
				// Hide the address bar!
		        window.scrollTo(0, 1);
		  //  }, 0);
		//});
		        
		// CHECK FOR PREVIEW
		if($.mobileweb['state'] === 'preview')
			$.mobileweb.device.iframe = true;
		
		if(document.location.href.indexOf('#') != -1)
			document.location.href = String( document.location.href ).substring( 0, document.location.href.lastIndexOf('#'));
		
		// setting properties (width, height, aspectratio, aspectWratio, aspectHratio) to 'device' object, as per the device in which application run.
		$.mobileweb.setDeviceScreen = function(){
			
			function handleVisibilityChange() {
				if($('#ui-datepicker-div').length > 0)
					$('#ui-datepicker-div').hide();
				var test = [];
				if($.mobileweb['appEvents'] != undefined){
					if($.mobileweb['appEvents']['EnterBackground'] != undefined){
						$.extend(test, $.mobileweb['appEvents']['EnterBackground']);
						var actionString = JSON.stringify(test).slice();
						new $.actions($.utility('getObject',$.mobileweb['pages'],'name',$.mobileweb.getCurrentPage().getName()), null, JSON.parse(actionString)).execute();
					}
				}
			}

			document.addEventListener("visibilitychange", handleVisibilityChange, false);
			
			// checking 'Google' map key is set or not, if map used. All properties set from JAVA side.
			if($.mobileweb['googleMap']){
				if($.mobileweb['googleMap']['googleMapUsed'])
					if(!$.mobileweb['googleMap']['googleMapKeyFound'])
						$.errorhandler('alertBox',"No googleAPI key found");
			}
			if($.mobileweb['state'] === 'preview' || $.mobileweb.device.iframe){
				// in case of 'preview'
				$.mobileweb.device['width'] = Math.min(document.documentElement.clientWidth,document.documentElement.clientHeight);
				$.mobileweb.device['height'] = Math.max(document.documentElement.clientWidth,document.documentElement.clientHeight);
				
				$.mobileweb.device['aspectratio'] = 1;
				$.mobileweb.device['aspectWratio'] = $.mobileweb.device['aspectratio'];
				$.mobileweb.device['aspectHratio'] = $.mobileweb.device['aspectratio'];
				
			}else{
				
				if((navigator.userAgent.match(/android/i)) && ($.browser.chrome == undefined || $.browser.chrome == false)){
					if(($.utility('getDeviceOrientation', window.orientation) == 'landscape-right') || ($.utility('getDeviceOrientation', window.orientation) == 'landscape-left')){
						 $.mobileweb.device['width'] = Math.min(document.documentElement.clientWidth,document.documentElement.clientHeight);
					}else if(($.utility('getDeviceOrientation', window.orientation) == 'portrait-down') || ($.utility('getDeviceOrientation', window.orientation) == 'portrait-up')){
						if(($.mobileweb.device['width'] == undefined) || ($.mobileweb.device['width'] >= document.documentElement.clientWidth)){
							$.mobileweb.device['width'] = document.documentElement.clientWidth 
						}
					}else{
						$.mobileweb.device['width'] = Math.min(document.documentElement.clientWidth,document.documentElement.clientHeight);
					}
				}else{
					if(($.utility('getDeviceOrientation', window.orientation) == 'landscape-right') || ($.utility('getDeviceOrientation', window.orientation) == 'landscape-left')){
						$.mobileweb.device['width'] = Math.min(document.documentElement.clientWidth,document.documentElement.clientHeight);
					}else{
						$.mobileweb.device['width'] = document.documentElement.clientWidth;
					}
				}
				$.mobileweb.device['height'] = document.documentElement.clientHeight;
				
				
				var href = document.location.href;
				if(href.indexOf('#')  >-1)	
					href = href.substring(0, href.indexOf('#'));
				var scrIndex = 0;
				
				if($.mobileweb.device['type'] === 'Desktop' || $.mobileweb.device['type'] === 'Untested Device'){
					//$.mobileweb.device['aspectratio'] = 1.56;
					
					if(href && href.lastIndexOf('index.') != -1){
						$.mobileweb.device['aspectratio'] = $.mobileweb.device['height'] / $.mobileweb.screens[0].height;
					}else{
						$.mobileweb.device['aspectratio'] = $.mobileweb.device['height'] / $.mobileweb.screens[0].height;
						
						scrIndex = href.substring(href.lastIndexOf('index_')+6, href.lastIndexOf('.'));
						if(!isNaN(scrIndex)){
							var screenIndex = parseInt(scrIndex) - 1;
							if(screenIndex > -1 && screenIndex < $.mobileweb.screens.length)
								$.mobileweb.device['aspectratio'] = $.mobileweb.device['height'] / $.mobileweb.screens[screenIndex].height;
						}else
							scrIndex = 0;
					}
					
					if($.mobileweb.screens.length > 1 && scrIndex > 0)
						scrIndex--;
					
					if(parseInt($.mobileweb.screens[scrIndex]['width']) > parseInt($.mobileweb.screens[scrIndex]['height']))
						$.mobileweb.device['aspectWratio'] = $.mobileweb.device['width'] / $.mobileweb.screens[scrIndex].width;
					else
						$.mobileweb.device['aspectWratio'] = $.mobileweb.device['aspectratio'];
					$.mobileweb.device['aspectHratio'] = $.mobileweb.device['aspectratio'];
					
				}else{
					if(href && href.lastIndexOf('_') != -1){
						scrIndex = (href.substring(href.lastIndexOf('_')+1, href.lastIndexOf('.')))-1;
						if(isNaN(scrIndex))
							scrIndex = 0;
					}
					
					var aspectWratio = $.mobileweb.device['width'] / $.mobileweb.screens[scrIndex].width;
					var aspectHratio = $.mobileweb.device['height'] / $.mobileweb.screens[scrIndex].height;
					$.mobileweb.device['aspectWratio'] = aspectWratio;
					$.mobileweb.device['aspectHratio'] = aspectHratio;
					$.mobileweb.device['aspectratio'] = aspectHratio;//(aspectWratio > aspectHratio) ? aspectHratio : aspectWratio;
				}
				
				$.mobileweb.screens['screenIndex'] = scrIndex;
			}
			
		};
		

		//INITIALIZE PLUGINS
		if($.mobileweb['plugin']){
			$.each($.mobileweb['plugin'],function(i,plugin){
				$.utility('sendRequest', plugin['link']);
			});
		}
		
		//CHECK FOR DATA
		if($.mobileweb['serveracc'] )
			$.utility('initServer',false);
		
		if($.mobileweb['localdb']){
			if(window.openDatabase){
				$.utility('initData',false);
				if($.mobileweb['state']==='preview'){
					$.utility('log',"[INIT] Running preview so drop the database and recreate evrything from scratch...");
					$.mobileweb['localdb']['instance'] = $.utility('createDatabase',['db_', $.mobileweb['pid'],'_test'].join(''),2);
					$.utility('isDatabaseExists',$.mobileweb['localdb']['instance'], $.mobileweb['localdb']['schema']);
					var schemaLength = $.mobileweb['localdb']['schema'].length -1;
					/*$.each($.mobileweb['localdb']['schema'],function(i,schema){
						$.utility('dropTable', $.mobileweb['localdb']['instance'], schema['tablename']);
						$.utility('createTable', $.mobileweb['localdb']['instance'], schema);
						if(i == schemaLength){
							$.utility('dropTable', $.mobileweb['localdb']['instance'], schema['tablename']);
							$.utility('createTable', $.mobileweb['localdb']['instance'], schema, function(){
								$.each($.mobileweb['localdbView']['schema'],function(i,viewSchema){
									$.utility('createView', $.mobileweb['localdb']['instance'], viewSchema);
								});
								$.utility('requestData', true);
							});
							
						}else{
							$.utility('dropTable', $.mobileweb['localdb']['instance'], schema['tablename']);
							$.utility('createTable', $.mobileweb['localdb']['instance'], schema);
						}
					});*/
					
				}else{
					$.mobileweb['localdb']['instance'] = $.utility('createDatabase',['db_', $.mobileweb['pid']].join(''),2);
					$.utility('createTable', $.mobileweb['localdb']['instance'], {status:false, tablename:"appVersion", value:[], fields: [{name:'appVersion', type:'REAL', autoinc:false, pk:false}]});
					$.mobileweb['localdb']['instance'].transaction(function(tx) {
						tx.executeSql("SELECT appVersion FROM appVersion", [],
							function(tx,result){
								if(result.rows.length === 0){
									$.utility('log',"[INIT] new application... send request");
									$.utility('insertIntoLocalDB', 'appVersion',[{'appVersion':$.mobileweb['version']}]);
								//	new $.actions(null, null, [{method:"Insert", category:"DBAction", params:{tablename:'appVersion', record:{'appVersion':$.mobileweb['version']}}}]).execute();
								}else{
									if(result.rows[0]['appVersion'] != undefined && result.rows[0]['appVersion'] != $.mobileweb['version']) {
										$.utility('log',"[INIT] new version so update version and send request");
										
										//since new version might have new schema... so we have to drop all schema here.
										$.each($.mobileweb['localdb']['schema'],function(i,schema){
											//if(schema['filename'] != "")
												$.utility('dropTable', $.mobileweb['localdb']['instance'], schema['tablename']);
											//$.utility('createTable', $.mobileweb['localdb']['instance'], schema);
											
										});
										//$.utility('requestData', true);
									}
									
									new $.actions(null, null, [{method:"Update", category:"DBAction", params:{tablename:'appVersion', where:'rowid = 1', record:{'appVersion':$.mobileweb['version']}}}]).execute();
								}
								
								$.utility('isDatabaseExists',$.mobileweb['localdb']['instance'], $.mobileweb['localdb']['schema']);
	
							},
							function(tx, error){
								$.utility('log',error);
							});
					});
				}
			}else{
				if($.mobileweb['serveracc']){
					$.utility('initServer',true);
					$.utility('requestData', true);
				}
			}
		};
		
		if($.mobileweb['tabs'].length>4){
			var rows = [];
			if($.mobileweb['tabs'][4]['id']==='tab-more'){
				$.each($.mobileweb['tabs'][4]['tabs'],function(i,tab){
					var row = {
							rowsize:44,
							data:{contents:[null]},
							icon : {type:"row", style:"arrow-r", events:{Tap:[{method:"SelectTab",category:"PageAction", params:{tab:4+i}}]}},
							children: [
							           {id:"ui-more-1-"+i,name:"",value:tab['text'],template:"",viewtype:"Label",frame:{x:50,y:13,width:150,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:16,align:"left",color:{name:"black"}}},
							           {id:"ui-more-2-"+i,value:tab['icon']['image'],template:"",name:"",viewtype:"Image",frame:{x:10,y:7,width:30,height:30}}
							           ],
							events: {Tap:[{method:"SelectTab",category:"PageAction", params:{tab:4+i}}]}
					};
					rows.push(row);
				});
			
				$.mobileweb['pages'].push({height:480.0,width:320.0,name:"more",parent:"",header:{title:"More",hidden:false},footer:{hidden:false},
						children:[{id:"ui-more",style:"default",group:[{header:"",footer:"",row:rows}],viewtype:"TableViewListTab"}],type:"TableViewListTab"});
			}
		};
		
		$.mobileweb.changeTab = function(tab,transition){
			setTimeout(function(){$("#tab-"+tab+">a").addClass("ui-btn-active ui-state-persist");}, 0);
			if(tab=='more'){
				$.utility('setTabPage', tab);
				$.mobileweb.changePage(tab,transition,false);
			}else if((tab>=1)&&(tab<=4)){
				if($.mobileweb['tabs'].length != 0){
					$.utility('setTabPage', $.mobileweb['tabs'][tab-1]['page']);//
					if(transition)//Bug #9319
 					{
 						$.mobileweb.changePage($.mobileweb['tabs'][tab-1]['page'],transition,false);
 					}else{
 						$.mobileweb.changePage($.mobileweb['tabs'][tab-1]['page'],'fade',false);
 					}
				}else{
					$.utility('requestData', true);
				//	$.errorhandler('alertBox',"The Best Screen-Size for this application could not be displayed due to some technical problem. <br> Press 'OK' to switch to another screen.","","changeDefaultScreen");
				}
			}else {
				if($.mobileweb['tabs'][4]['id']!='tab-more'){
					$.utility('setTabPage', $.mobileweb['tabs'][tab-1]['page']);
					$.mobileweb.changePage($.mobileweb['tabs'][tab-1]['page'],'fade',false);
				}else{
					$.utility('setTabPage', $.mobileweb['tabs'][4]['tabs'][tab-5]['page']);
					$.mobileweb.changePage($.mobileweb['tabs'][4]['tabs'][tab-5]['page'],'slide',false);
				}
			}
		};
		
		$.mobileweb.getPage = function(name, isReverse){
			var tabpage = $.utility('getTabPageData', name);
			if(tabpage != undefined && tabpage.getParent().indexOf("Tab") != -1){
				$.utility("setReverseTransition", true);
				return tabpage;
			}
			
			if(isReverse === true){
				return $.utility('getParentPage');
			}else if(isReverse === "returnToParentView"){
				var page = $.utility('getSpecificParentPage', name);
				return page;
			}else{
				$.utility("setReverseTransition", false);
				return $.page($.utility('getObject',$.mobileweb['pages'],'name',name), isReverse);
			}
		};
		
		var currentPage={};
		$.mobileweb.changePage = function(name,transition,isReverse){
			$.utility('setActionRunningStatus', false);
			if(transition === 'slidefade'){
				transition = 'fade';
			}
//			else if(transition === 'none'){
//				transition = 'slide';
//			}else if(transition === 'turn'){
//				transition = 'flip';
//			}
			currentPage = $.mobileweb.getPage(name, isReverse);
			(isReverse === "returnToParentView" || isReverse === true) ? isReverse = true : isReverse = false;
			$('body').everyTime(100, function() {

				if(!$.utility('isBusy')){
					$('body').stopTime();
					var temppage = $.utility('getObject',$.mobileweb['pages'],'name',name);
					if(temppage['events'] != undefined && temppage['events']['BeforeViewPage']!= undefined && temppage['events']['BeforeViewPage'].length > 0){
						if(!isReverse){
							var tabFlag = false;
							var currTab = $.utility('getTabPage');
							$.each(currTab , function(index, child){
								if(child['page'] == name && child['tabFlag'] == true){
									tabFlag = true;
								}
							});
							if(!tabFlag){
								$.utility('setActionRunningStatus', true);
								new $.actions(temppage, null, temppage['events']['BeforeViewPage'].slice()).execute();
							}else if(tabFlag && $.utility('getResetEvent')){
								$.utility('setActionRunningStatus', true);
								new $.actions(temppage, null, temppage['events']['BeforeViewPage'].slice()).execute();
							}
						}
					}
					var timer = setInterval(function(){
						if(!$.utility('getActionRunningStatus')){
							clearInterval(timer);
							$("body").find('video').each(function () {
								try{
									$(this)[0].pause();
								}catch(e){
									console.log(e);
								}

							});
							$("body").find('audio').each(function () {
								try{
									$(this)[0].pause();
								}catch(e){
									console.log(e);
								}
							});
							var runningTimers = $.utility("getTimers");
							$.each(runningTimers, function(i, value){
								$.utility('removeTimers',Object.keys(value)[0]);
							});
							/*for(var i in runningTimers){
								
							}*/
							$.utility("setPageLoadingFlag", true);
							$('body').everyTime(100, function() {
								if(!$.utility('isBusy') && $.utility('isInitChildren')){
									$('body').stopTime();
									if(isReverse){
										$.utility("setReverseTransition", true);
										currentPage.callReverse(transition);
									}else{
										currentPage.show(transition,isReverse);
										$('.ui-icon-loading').css({'background-image':'url("https://code.jquery.com/mobile/1.2.0/images/ajax-loader.gif")'});
										currentPage.liveContainer();
									}
									var interval = (currentPage.getViewType() != 'BaseView' && currentPage.getViewType() != 'ScrollView') ? 500 : 100;	//setting timer interval for tableview pages... only for delay actions.. Akhil
									var timer =	setInterval(function(){
										if($.utility("isInitChildren")){
											clearInterval(timer);
											$.utility("setReverseTransition", false);
											var register = $.utility('getRegisteredActions');
											if(register.length != 0){
												var i = 0;
												function runRegisteredAction(){
													
													var registeredPageFound = false;
													var targetpageName = register[i]['action']['params']['targetpage'];
													// ---->> need to handle splitview case
													var _splitPage;
													var _pageScrollViewPage;
													if($.mobileweb.getCurrentPage().getViewType() === "SplitView"){
														var splitPage = $.utility('getObject', $.mobileweb['pages'], 'name', $.mobileweb.getCurrentPage().getName());
														var splitChildren = splitPage['children'];
														$.each(splitChildren, function(k, splitPage){
															if(targetpageName === splitPage['name']){
																registeredPageFound = true;
																_splitPage = splitPage;
															}
														});
													}else if($.mobileweb.getCurrentPage().getViewType() === "PageScrollView"){
														var pageScrollViewPage = $.utility('getObject', $.mobileweb['pages'], 'name', $.mobileweb.getCurrentPage().getName());
														var pageScrollViewChildren = pageScrollViewPage['children'];
														$.each(pageScrollViewChildren, function(k, pageScrollViewPage){
															if(targetpageName === pageScrollViewPage['name']){
																registeredPageFound = true;
																_pageScrollViewPage = pageScrollViewPage;
															}
														});
													}else if(targetpageName==$.mobileweb.getCurrentPage().getName()){
														registeredPageFound = true;
													}
													
													
													//if(register[i]['action']['params']['targetpage']==$.mobileweb.getCurrentPage().getName()){
													if(registeredPageFound){
														var act= new Array();
														act.push(register[i]['action']);
														var page = $.utility('getObject', $.mobileweb['pages'], 'name', $.mobileweb.getCurrentPage().getName());
														if($.mobileweb.getCurrentPage().getViewType() === "SplitView" && _splitPage != undefined)
															page = _splitPage;
														else if($.mobileweb.getCurrentPage().getViewType() === "PageScrollView" && _pageScrollViewPage != undefined)
															page = _pageScrollViewPage;
														if(register[i]['action']['category'] === "DBCondition"){
															if(register[i]['action']['method'] === "changeCondition"){	//HOTFIX, need to review further. Date: 14-Jan-2019
																if(register[i]['action']['params']['targetpage'] == page['name']){
																	page['data']['wherecond'] = register[i]['action']['params']['where'];
																	page['data']['order'] = register[i]['action']['params']['order'];
																}
															}
														}
														register[i]['pagedef'].target = register[i]['target'];
														
														new $.actions(page, register[i]['ui'],act.slice(),register[i]['pagedef'], function(){
															i++;
															if(i < register.length){
																runRegisteredAction();
															}else{
																var afterViewPageInterval = (currentPage.getViewType() != 'BaseView' && currentPage.getViewType() != 'ScrollView') ? 4000 : 5;
																var afterViewPageTimer = setInterval(function(){
																	if(!$.utility('getActionRunningStatus')){
																		clearInterval(afterViewPageTimer);
//																		var currTab = $.utility('getTabPage');//
//																		var tabFlag = true;
//																		$.each(currTab , function(index, child){
//																			if(child['page'] == name && child['tabFlag'] == true){
//																				tabFlag = false;
//																			}
//																		});
//																		if(tabFlag)
																			currentPage.triggerActions();
																	}
																}, afterViewPageInterval);
																
															}
														}).execute();
													}else{
														i++;
														if(i < register.length){
															runRegisteredAction();
														}else{
															var afterViewPageInterval = (currentPage.getViewType() != 'BaseView' && currentPage.getViewType() != 'ScrollView') ? 3000 : 5;
															var afterViewPageTimer = setInterval(function(){
																if(!$.utility('getActionRunningStatus')){
																	clearInterval(afterViewPageTimer);
//																	var currTab = $.utility('getTabPage');//
//																	var tabFlag = true;
//																	$.each(currTab , function(index, child){
//																		if(child['page'] == name && child['tabFlag'] == true){
//																			tabFlag = false;
//																		}
//																	});
//																	if(tabFlag)
																		currentPage.triggerActions();
																}
															}, afterViewPageInterval);
															
														}
													}
													
												}
												runRegisteredAction();
											}else{
												var afterViewPageInterval = (currentPage.getViewType() != 'BaseView' && currentPage.getViewType() != 'ScrollView') ? 3000 : 5;
												var afterViewPageTimer = setInterval(function(){
													if(!$.utility('getActionRunningStatus')){
														clearInterval(afterViewPageTimer);
														if(!isReverse){
//															var tabFlag = false;
//															var currTab = $.utility('getTabPage');//
//															$.each(currTab , function(index, child){
//																if(child['page'] == name && child['tabFlag'] == true){
//																	tabFlag = true;
//																}
//															});
//															if(!tabFlag)
																currentPage.triggerActions();
														}
													}
												}, afterViewPageInterval);
											}
										
											/*$.each(register, function(i, registeredActions){
												if(registeredActions['action']['params']['targetpage']==$.mobileweb.getCurrentPage().getName()){
													var act= new Array();
													act.push(registeredActions['action']);
													var page = $.utility('getObject', $.mobileweb['pages'], 'name', $.mobileweb.getCurrentPage().getName());
													if(registeredActions['action']['category'] === "DBCondition"){

													}
													registeredActions['pagedef'].target = registeredActions['target']
													new $.actions(page, registeredActions['ui'],act.slice(),registeredActions['pagedef']).execute();
												}

											});*/
											$.utility('removeTrigerredActions');
											/*var afterViewPageTimer = setInterval(function(){
												if(!$.utility('getActionRunningStatus')){
													clearInterval(afterViewPageTimer);
													currentPage.triggerActions();
												}
											}, interval);*/
										}
									},interval);
									if((!window.openDatabase) && ($.utility('isBootingForFirstTime')) && ($.mobileweb['tabs'][0]['page'] === $.mobileweb.getCurrentPage().getName()) && ($.mobileweb['localdb']['schema'].length > 1)){
										setTimeout(function(){
											var ua = navigator.userAgent.toLowerCase(); 
											if (ua.indexOf('safari') != -1) { 
												if (ua.indexOf('chrome') > -1) {
												    //Chrome
												  } else {
													  $.errorhandler('alertBox',"By default local database not supported. To enable : Settings > Safari > Advanced > Experimental Features > Disable Web SQL > turn off");//Bug #12832 Fix
												  }
											}else
												$.errorhandler('alertBox',"このブラウザはローカルDBをサポートしていませんので、このアプリの幾つかの画面や機能は正しく動作しません。別のローカルダータベースをサポートし ているブラウザ（ChromeやSafari等）で、このアプリを起動する事をお勧めします。", "This browser does not support local database which the app will use, So some functions will not be work correctly. We strongly recommend you should use another browser which supports local database, like Safari or Chrome.");
										},4000);
										$.utility('setBootingForFirstTime', false);
									}
								}
							});
						}

					}, 100);
				}
			});
		};
		
		$.mobileweb.getCurrentPage = function(){
			return currentPage;
		};
		$.mobileweb.setCurrentPage = function(pageObj){
			currentPage = pageObj;
		};
		
		var initialScreenSize = window.innerHeight;
		$(window).resize(function() {
			if(window.innerHeight < initialScreenSize){
				$("[data-role=footer]").hide();
			}else{
		    	$("[data-role=footer]").show();
		    }
			
			// Below code is only for Native browser of Android devices not for others..
			if((!$('input, textarea, select').is(":focus") && ($.utility('getDeviceType') == 'Android'))){
				var timer =	setInterval(function(){
					clearInterval(timer);
					$.mobileweb.device['height'] = document.documentElement.clientHeight;
					$.mobileweb.device['aspectratio'] = $.mobileweb.device['height'] / $.mobileweb.screens[0].height;
					setTimeout(currentPage.refreshDisplay(), 0);
				},800);
			}else if($.utility('getDeviceType') === 'Untested Device' || $.utility('getDeviceType') === 'Desktop'){/*
				
				var clientHeight = Math.min(document.documentElement.clientWidth,document.documentElement.clientHeight);
				var clientWidth = Math.min(document.documentElement.clientWidth,document.documentElement.clientWidth);
				var possibleScreensToDisplay = [];
				var count = 0;
				//window.location.href = "./index_1.html";
				$.each($.mobileweb['screens'], function(key, screen){
					if(screen['height'] <= clientHeight && screen['width'] <= clientWidth){
						screen.area = screen['height'] * screen['width'];
						possibleScreensToDisplay[count] = screen;
					}
					count++;
				});
				var m = -Infinity, n = possibleScreensToDisplay.length;
				var screenToDisplay = {};
				for (var i = 0; i != n; ++i) {
			        if (possibleScreensToDisplay[i]["area"] > m) {
			        	screenToDisplay = possibleScreensToDisplay[i];
			            m = possibleScreensToDisplay[i]["area"];
			        }
			    }

				if(!$.isEmptyObject(screenToDisplay)){
					window.location.href = "./index_" + screenToDisplay['id'] + ".html" ;
				}else if($.mobileweb['screens'].length > 1){
					window.location.href = "./index_1.html" ;
				}else{
					window.location.href = "./index.html" ;
				}
			*/}
			
//			var timer =	setInterval(function(){
//				clearInterval(timer);
//				$.mobileweb.device['height'] = document.documentElement.clientHeight - $("#_keyboard").css("height");
//				$.mobileweb.device['aspectHratio'] = $.mobileweb.device['height'] / $.mobileweb.screens[0].height;
//				setTimeout(currentPage.refreshDisplay("keyboard"), 0);
//			},800);
		});
		
		// On orientationChange we need to refresh css, so below is the code..
		$(window).on("orientationchange",function(e){	// for browsers other then Android Natives...
			if($.mobileweb.device['type'] != 'Desktop') {
					var timer =	setInterval(function(){
					clearInterval(timer);
					$.mobileweb.device['height'] = document.documentElement.clientHeight;
					$.mobileweb.device['width'] = document.documentElement.clientWidth;
					
					$.mobileweb.device['aspectWratio'] = $.mobileweb.device['width'] / $.mobileweb.screens[0].width;
					$.mobileweb.device['aspectHratio'] = $.mobileweb.device['height'] / $.mobileweb.screens[0].height;
					$.mobileweb.device['aspectratio'] = $.mobileweb.device['aspectHratio'];
					setTimeout(currentPage.refreshDisplay(), 0);
				},800);	
			}
		});
		
		//Disable browser back button---In ref of bug #13041
		$(window).on("navigate", function (event) { 
		     event.preventDefault();
		     window.history.forward(1);
		});
		
		/*window.addEventListener('beforeunload', function (e) {
			$.each($.mobileweb['localdb']['schema'],function(i,schema){
				if(schema['filename'].length == 0) {
					$.mobileweb['localdb']['instance'].transaction(function (tx) {
						tx.executeSql("delete from "+ schema['tablename'], [],
								function(tx,result){
									console.log('beforeunload result >> ', result);
								},
								function(tx, error){
									console.log('beforeunload error >> ', error);
								});
					});
				}
			});
			
			// the absence of a returnValue property on the event will guarantee the browser unload happens
			delete e['returnValue'];
			
			//e.preventDefault(); 		// If you prevent default behavior in Mozilla Firefox prompt will always be shown
			//e.returnValue = '';		// Chrome requires returnValue to be set
		});*/
		
		$.mobileweb.setDeviceScreen();
		
		$.mobileweb.getProjectCoreData = function(){
			return project
		};
		
		
		return $.mobileweb;
	};
})(jQuery);
