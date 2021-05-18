/*
 	This Jquery plugin has been created to define and describe all actions and its categories .. remember.. only actions and categories..
 	Author : Akhil Tyagi
 	Date : January 05 2015.
 */

(function($){
	var count = 0;
	var pageTransitionCount = 0;
	var radius;
	var navBarTitle="", navBarPrompt = "", backButton = "", forwardButton = "";
	var backTabIndex = 0;
	var indicatorActionTimer;
	$.actionHelper = function(pagedef, ui, action, target,eventinitpagedef, callback){
		
		if(eventinitpagedef != undefined){
			if(action['name'] != undefined && action['name'].indexOf('[') > -1 && action['name'].indexOf(']') > -1)
				action['name'] =  $.utility("tokenizeString", action['name'], eventinitpagedef,action);
			if(pagedef['srcLocation'] == "bundle")
				target = $.getUI(action['name'], ui, pagedef['name']);
			else
				target = $.getRemoteUI(action['name'], ui, pagedef['name']);
		}
		
		switch(action['category']){
			case 'PageAction':
				new PageAction(pagedef, ui, action, eventinitpagedef, target, function(pagedef, ui, action, eventinitpagedef, status){
					callback(pagedef, ui, action, eventinitpagedef, status);
				}).execute();
				break;
			case 'MainValue':
				new MainValue(pagedef, ui, action,eventinitpagedef, target, function(pagedef, ui, action, eventinitpagedef, status){
					callback(pagedef, ui, action, eventinitpagedef, status);
				}).execute();
				break;
			case 'WarningAction':
				new WarningAction(pagedef, ui, action,eventinitpagedef, target, function(pagedef, ui, action, eventinitpagedef, status){
					callback(pagedef, ui, action, eventinitpagedef, status);
				}).execute();
				break;
			case 'UIObjectAction':
				new UIObjectAction(pagedef, ui, action,eventinitpagedef, target, function(pagedef, ui, action, eventinitpagedef, status){
					callback(pagedef, ui, action, eventinitpagedef, status);
				}).execute();
				break;
			case 'MediaAction':
				new MediaAction(pagedef, ui, action, eventinitpagedef, target, function(pagedef, ui, action, eventinitpagedef, status){
					callback(pagedef, ui, action, eventinitpagedef, status);
				}).execute();
				break;
			case 'EmailControllerAction':
				new EmailControllerAction(pagedef, ui, action, eventinitpagedef, target, function(pagedef, ui, action, eventinitpagedef, status){
					callback(pagedef, ui, action, eventinitpagedef, status);
				}).execute();
				break;
			case 'DBAction':
				new DBAction(pagedef, ui, action, eventinitpagedef, target, function(pagedef, ui, action, eventinitpagedef, status){
					callback(pagedef, ui, action, eventinitpagedef, status);
				}).execute();
				break;
			case 'ComAction':
				if(window.navigator.onLine){
					if(!action['flag'])
						$.utility('setComActionStatus', "");
					new ComAction(pagedef, ui, action, eventinitpagedef, target, function(pagedef, ui, action, eventinitpagedef, status){
						callback(pagedef, ui, action, eventinitpagedef, status);
					}).execute();
				}else{
					callback(pagedef, ui, action, eventinitpagedef, false);
				}
	
				break;
			case 'GoogleMapControl':
				new GoogleMapControlAction(pagedef, ui, action, eventinitpagedef, target, function(pagedef, ui, action, eventinitpagedef, status){
					callback(pagedef, ui, action, eventinitpagedef, status);
				}).execute();
				break;
			case 'GoogleMapAction':
				new GoogleMapAction(pagedef, ui, action, eventinitpagedef, target, function(pagedef, ui, action, eventinitpagedef, status){
					callback(pagedef, ui, action, eventinitpagedef, status);
				}).execute();
				break;
			case 'MotionAction':
				new MotionAction(pagedef, ui, action, eventinitpagedef, target, function(pagedef, ui, action, eventinitpagedef, status){
					callback(pagedef, ui, action, eventinitpagedef, status);
				}).execute();
				break;
			case 'GoogleContactService':
				new GoogleContactService(pagedef, ui, action, eventinitpagedef, target, function(pagedef, ui, action, eventinitpagedef, status){
					callback(pagedef, ui, action, eventinitpagedef, status);
				}).execute();
				break;
	
			case 'GoogleCalendarService':
				var script = document.createElement('script');
				script.type = 'text/javascript';
				if($.mobileweb['state'] == 'preview')
					script.src  = '/mobileweb/resources/js/google-services.js';
				else script.src  = 'js/google-services.js';
				$('head').append(script);
				script.onload = new GoogleCalendarService(pagedef, ui, action, eventinitpagedef, target, function(pagedef, ui, action, eventinitpagedef, status){
					callback(pagedef, ui, action, eventinitpagedef, status);
				}).execute();
				break;
			case 'FileRead':
				new FileRead(pagedef, ui, action, eventinitpagedef, target, function(pagedef, ui, action, eventinitpagedef, status){
					callback(pagedef, ui, action, eventinitpagedef, status);
				}).execute();
				break;
			case 'SplitPage':
				new SplitPage(pagedef, ui, action, eventinitpagedef, target, function(pagedef, ui, action, eventinitpagedef, status){
					callback(pagedef, ui, action, eventinitpagedef, status);
				}).execute();
				break;
			case 'DBCondition':
				new DBCondition(pagedef, ui, action, eventinitpagedef, target, function(pagedef, ui, action, eventinitpagedef, status){
					callback(pagedef, ui, action, eventinitpagedef, status);
				}).execute();
				break;
			case 'SystemController':
				new SystemControllerActions(pagedef, ui, action, eventinitpagedef, target,function(pagedef, ui, action, eventinitpagedef, status){
					callback(pagedef, ui, action, eventinitpagedef, status);
				}).execute();
				break;	
			case 'SensorAction':
				new SensorControllerActions(pagedef, ui, action, eventinitpagedef, target,function(pagedef, ui, action, eventinitpagedef, status){
					callback(pagedef, ui, action, eventinitpagedef, status);
				}).execute();
				break;
			case 'GadgetAction':
				new GadgetControlActions(pagedef, ui, action, eventinitpagedef, target, function(pagedef, ui, action, eventinitpagedef, status){
					callback(pagedef, ui, action, eventinitpagedef, status);
				}).execute();
				break;
			case 'SendPushNotificationAction':
				new SendPushNotificationControlActions(pagedef, ui, action, eventinitpagedef, target, function(pagedef, ui, action, eventinitpagedef, status){
					callback(pagedef, ui, action, eventinitpagedef, status);
				}).execute();
				break;
			default:
				if($.mobileweb['plugin']){
					$.each($.mobileweb['plugin'],function(i,plugin){
						if(action['category']===plugin['name']){
	
							//SAVE THE DATA OF THE PAGE IF NOT EXISTING
							var pagedata = $.utility('savePageData', pagedef['children'], pagedef['data']['contents'][0]);
	
							var params = $.utility('clone',action['params']);
							for(var key in params){
								params[key] = $.utility('extractDataFromRecord', pagedata, params[key]);
							}
							$.fn[plugin['name']](action['method'], params);
						}
					});
				}else{
					// this particular Action Category is not implemented yet..
					callback(pagedef, ui, action, eventinitpagedef, false);
				}
			break;
		}
	};
	
	
	function PageAction(pagedef, ui, action, eventinitpagedef, target, callback){
		var _action = {};
		
		_action.execute = function(){
			if(pageTransitionCount == 0 && action['method'] != "transitToAnyPage"){
				$.utility('intializeTabStackLengthAndTabs');
				pageTransitionCount++;
			}
			
			if(action['method'] != "transitSideBar"){
				if(pagedef['toolbarleft'] != undefined && !pagedef['toolbarleft']['hidden'] && !pagedef['toolbarleft']['fixed']){
					document.getElementById("leftToolBar").style.width = "0px";
					$('.leftToolBarOverlay').css({width:"0px"});
				}
			}
			
			switch(action['method']){
				case 'SelectTab':
					setTimeout(function(){selectTab() },100);
					break;
				case 'View':
					setTimeout(function(){View() },100);
					break;
				case 'transitInView':
					setTimeout(function(){transitInView() },100);
					break;
				case 'Back':
					Back();
					break;
				case 'popToRootViewController':
					RootView();
					break;
				case 'ReturnToParentView':
					ReturnToParentView();
					break;
				case 'transitToAnyPage':
					transitToAnyPage();
					break;
				case 'TransitToSiblingView':
					transitToSiblingPage();
					break;
				case 'transitSideBar':
					transitSideBar() ;
					break;
				case 'setParentData':
					setParentData();
					break;
				default:
					callback(pagedef, ui, action, eventinitpagedef, false);
					break;
			}
		};
		
		var selectTab = function(){
			var tabIndex = action['params']['tab'];
			var tabStack = $.utility('getTabStack');
			var tabId = parseInt(tabIndex.toString());
			if(!isNaN(tabId)){
				if(tabId >= tabStack.length){
					if($.mobileweb['state'] === 'preview')//Bug #6469 fix
						$.errorhandler('alertBox','Tab index is not correct');
					else
						console.log('Tab index is not correct');
					callback(pagedef, ui, action, eventinitpagedef, false);
					return;
				}
			}
			   
			var tabChilds = tabStack[tabIndex];
			//console.log("TABCHILDS : "+tabChilds);
			var obj = {};
		    var tmpArray = [];
		    for (var i = 0; i < tabChilds.length; i++) {
		        if (!(tabChilds[i] in obj)) {
		            tmpArray.push(tabChilds[i]);
		            obj[tabChilds[i]] = true;
		        }
		    }
		    tabChilds.splice();
			tabChilds = tmpArray;
					
			var lastOpenedPage = tabChilds[tabChilds.length -1];
			if(lastOpenedPage === pagedef['name']){
				lastOpenedPage = tabChilds[tabChilds.length -2];
			}
			//console.log($.mobileweb.getCurrentPage().getName(),' >> selectTab :--', lastOpenedPage);
			
			if($.mobileweb.getCurrentPage().getName() == lastOpenedPage){
				var _currPageName = window.location.hash.substr(1); // Bug #13959 fix
				if(_currPageName === lastOpenedPage)
				    return;	
//				return;												//for bug fix #11540
			}
			$.utility('setTabPage', lastOpenedPage);
			$.utility('setResetEvent', action['params']['resetEvent']);
			
			if(lastOpenedPage != undefined){
				
				$.utility('setTabPageData', $.mobileweb.getCurrentPage().getName(), $.mobileweb.getCurrentPage());
								
				$.mobileweb.changePage(lastOpenedPage,action['params']['transition'],false);
				$("#tab-"+ ++tabIndex +">a").addClass("ui-btn-active ui-state-persist");
				var timer =	setInterval(function(){
					if(!$.utility('isBusy') && $.utility('isInitChildren') && !$.utility("getPageLoadingFlag")){
						clearInterval(timer);
						pagedef = $.utility('getObject',$.mobileweb['pages'],'name',lastOpenedPage);
						callback(pagedef, ui, action, eventinitpagedef, true);
					}
				},1000);
			}else{
				callback(pagedef, ui, action, eventinitpagedef, false);
			}
			
		};

		var View = function(){
			if(action['params']['name'] === "noFileExsits"){
				alert("!! Target Page Not Found !!");
				return _action;
			}
			if($.mobileweb.getCurrentPage().getName() == action['params']['name']){
				return _action;												//for bug fix #12151
			}
			
			var tabStack = $.utility('getTabStack');
			if($.mobileweb.getCurrentPage().getName() != action['params']['name'])
				$.utility('setParentPage',$.mobileweb.getCurrentPage());
			$.each($.mobileweb.getProjectCoreData()['pages'] , function(i, page){
				if(page['name'] === action['params']['name']){
					$.mobileweb['pages'][i] = JSON.parse(JSON.stringify(page));
					return false;
				}
				
			});
			var _page = $.utility('getObject',$.mobileweb['pages'],'name',action['params']['name']);
			if(_page['parent'] != undefined){
				if(_page['parent'].indexOf("Sibling") != -1){
 					var strParent = _page['parent'];
 					if(action['method'] == "TransitToSiblingView" && action['params']['siblingPage'] != undefined)
 						_page['parent'] = strParent.replace(strParent.substring(strParent.lastIndexOf('page_')), action['params']['siblingPage']);
 					else
 						_page['parent'] = strParent.replace(strParent.substring(strParent.lastIndexOf('page_')), pagedef['name']);
 				}
				
				if(action['method'] == "TransitToSiblingView"){
					if(_page['parent'].indexOf(pagedef['parent']) == -1){
						var eng="Sibling Page not valid.";
					   	var jap="Sibling Page not valid.";
					   	$.errorhandler('alertBox',eng,jap);
					   	return action;
					}
				}else{
					if(_page['parent'].indexOf(pagedef['name']) == -1){
						var eng="Child Page not valid.";
					   	var jap="Child Page not valid.";
					   	$.errorhandler('alertBox',eng,jap);
					   	return action;
					}
				}
				
			}
			
			$.utility('insertTabInformation', pagedef['name'], _page['name']);
			_page['parent'] = pagedef['name'];
			if(action['params']['transferdata']){
				var data = [];
				_page['datatransfer'] = true;
				//first save the data from the current page to the other
				switch(pagedef['type']){
//					case 'PageScrollView':
					case 'BaseView':
					case 'ScrollView':
						pagedef['data']['contents'][0] = $.utility('savePageData', pagedef['children'], pagedef['data']['contents'][0], pagedef);
						break;
				}
				
				if(((ui !== undefined) && (ui!== null) && (typeof(ui.getViewType) != "undefined" || ui['headerFlag'])) ){
					
					if((pagedef['type']=='BaseView') || (pagedef['type']=='ScrollView')){
						data.push($.utility('clone',pagedef['data']['contents'][0]));
						$.utility('setPageWhereCond', _page['name'], _page['data']['wherecond']);
//						if(ui.getId != undefined && ui.getId().indexOf("tile-") != -1){
//								var iids = ui.getId().replace("ui-","").replace("tile-","");
//								var res = iids.split("-");
//								var uiId = 'ui-' + res[0];
//								var tileIndex = parseInt(res[1]);
//								if(isNaN(tileIndex) && tileIndex != undefined)
//									tileIndex = tileIndex.split("_")[0];
//								if(pagedef['data']['contents'][0][tileIndex - 1] != undefined){
//									data.push($.utility('clone',pagedef['data']['contents'][0][tileIndex - 1]));
//									data[0] = $.extend({}, pagedef['data']['contents'][0], data[0]);
//								}
//								else
//									data.push($.utility('clone',pagedef['data']['contents'][0]));
//						}else{
//							data.push($.utility('clone',pagedef['data']['contents'][0]));
//						}
					}else if((pagedef['type']=='TableView') || (pagedef['type']=='DBTableView') || (pagedef['type']=='RemoteTableView')){	//(Fixed-dataset || localDB || remoteDB) Record View pages .
						if(pagedef['data']['contents'][0] === undefined){
							pagedef['data']['contents'][0] = [];
						}
						
						//these pages have one or more groups, in case of 'custom' cell style there will be ui-parts which data will be transferred.
						$.each(pagedef['children'][0]['group'],function(j,group){
							$.each(group['row'],function(k,row){
								$.each(row['children'],function(k,child){
									try{
										if(child['viewtype'] === "SwitchBar"){
											pagedef['data']['contents'][0][child['name']] = child['switchValue'];
										}else if(child['viewtype'] === "ToggleButton"){
											pagedef['data']['contents'][0][child['name']] = child['togglevalue'];
										}else if(child['viewtype'] === "CheckBox"){
											pagedef['data']['contents'][0][child['name']] = child['valueFormat'];
										}else if(child['viewtype'] === "Radio"){
											pagedef['data']['contents'][0][child['groupName']] = child['groupNameData'];
											pagedef['data']['contents'][0][child['name']] = child['value'];
										}else{
											pagedef['data']['contents'][0][child['name']] = child['value'];
										}	
									}catch(e){
										console.log(e);
									}
								});
							});
						});
						if(pagedef['toolbartop'] != undefined){
							$.each(pagedef['toolbartop']['children'], function(i, child) {
								if(child['viewtype'] === "SwitchBar"){
									pagedef['data']['contents'][0][child['name']] = child['switchValue'];
								}else if(child['viewtype'] === "ToggleButton"){
									pagedef['data']['contents'][0][child['name']] = child['togglevalue'];
								}else if(child['viewtype'] === "CheckBox"){
									pagedef['data']['contents'][0][child['name']]= child['valueFormat'];
								}else if(child['viewtype'] === "Radio"){
									pagedef['data']['contents'][0][child['groupName']] = child['groupNameData'];
									pagedef['data']['contents'][0][child['name']] = child['value'];
								}else{
									pagedef['data']['contents'][0][child['name']] = child['value'];
								}
							});
						}
						if(pagedef['toolbarbottom'] != undefined){
							$.each(pagedef['toolbarbottom']['children'], function(i, child) {
								if(child['viewtype'] === "SwitchBar"){
									pagedef['data']['contents'][0][child['name']] = child['switchValue'];
								}else if(child['viewtype'] === "ToggleButton"){
									pagedef['data']['contents'][0][child['name']]= child['togglevalue'];
								}else if(child['viewtype'] === "CheckBox"){
									pagedef['data']['contents'][0][child['name']]= child['valueFormat'];
								}else if(child['viewtype'] === "Radio"){
									pagedef['data']['contents'][0][child['groupName']] = child['groupNameData'];
									pagedef['data']['contents'][0][child['name']] = child['value'];
								}else{
									pagedef['data']['contents'][0][child['name']] = child['value'];
								}
							});
						}
						if(pagedef['toolbarleft'] != undefined){
							$.each(pagedef['toolbarleft']['children'], function(i, child) {
								if(child['viewtype'] === "SwitchBar"){
									pagedef['data']['contents'][0][child['name']] = child['switchValue'];
								}else if(child['viewtype'] === "ToggleButton"){
									pagedef['data']['contents'][0][child['name']] = child['togglevalue'];
								}else if(child['viewtype'] === "CheckBox"){
									pagedef['data']['contents'][0][child['name']]= child['valueFormat'];
								}else if(child['viewtype'] === "Radio"){
									pagedef['data']['contents'][0][child['groupName']] = child['groupNameData'];
									pagedef['data']['contents'][0][child['name']] = child['value'];
								}else{
									pagedef['data']['contents'][0][child['name']] = child['value'];
								}
							});
						}
						data.push($.utility('clone',pagedef['data']['contents'][0]));
						$.utility('setPageWhereCond', _page['name'], _page['data']['wherecond']);
						
					}else if((pagedef['type']=='TableViewList')){	//Fixed-dataset List View Page
						if(pagedef['data']['contents'][0] === undefined){
							pagedef['data']['contents'][0] = {};
						}
						//this page has one group with multiple rows
						$.each(pagedef['children'][0]['group'],function(j,group){
							$.each(group['row'],function(k,row){
								$.each(row['children'],function(k,child){
									if(child['viewtype'] === "SwitchBar"){
										pagedef['data']['contents'][0][child['name']] = child['switchValue'];
									}else if(child['viewtype'] === "ToggleButton"){
										pagedef['data']['contents'][0][child['name']] = child['togglevalue'];
									}else if(child['viewtype'] === "CheckBox"){
										pagedef['data']['contents'][0][child['name']] = child['valueFormat'];
									}else if(child['viewtype'] === "Radio"){
										pagedef['data']['contents'][0][child['groupName']] = child['groupNameData'];
										pagedef['data']['contents'][0][child['name']] = child['value'];
									}else{
										pagedef['data']['contents'][0][child['name']] = child['value'];
									}
								});
							});
						});
						if(pagedef['toolbartop'] != undefined){
							$.each(pagedef['toolbartop']['children'], function(i, child) {
								if(child['viewtype'] === "SwitchBar"){
									pagedef['data']['contents'][0][child['name']] = child['switchValue'];
								}else if(child['viewtype'] === "ToggleButton"){
									pagedef['data']['contents'][0][child['name']] = child['togglevalue'];
								}else if(child['viewtype'] === "CheckBox"){
									pagedef['data']['contents'][0][child['name']]= child['valueFormat'];
								}else if(child['viewtype'] === "Radio"){
									pagedef['data']['contents'][0][child['groupName']] = child['groupNameData'];
									pagedef['data']['contents'][0][child['name']] = child['value'];
								}else{
									pagedef['data']['contents'][0][child['name']] = child['value'];
								}
							});
						}
						if(pagedef['toolbarbottom'] != undefined){
							$.each(pagedef['toolbarbottom']['children'], function(i, child) {
								if(child['viewtype'] === "SwitchBar"){
									pagedef['data']['contents'][0][child['name']] = child['switchValue'];
								}else if(child['viewtype'] === "ToggleButton"){
									pagedef['data']['contents'][0][child['name']]= child['togglevalue'];
								}else if(child['viewtype'] === "CheckBox"){
									pagedef['data']['contents'][0][child['name']]= child['valueFormat'];
								}else if(child['viewtype'] === "Radio"){
									pagedef['data']['contents'][0][child['groupName']] = child['groupNameData'];
									pagedef['data']['contents'][0][child['name']] = child['value'];
								}else{
									pagedef['data']['contents'][0][child['name']] = child['value'];
								}
							});
						}
						if(pagedef['toolbarleft'] != undefined){
							$.each(pagedef['toolbarleft']['children'], function(i, child) {
								if(child['viewtype'] === "SwitchBar"){
									pagedef['data']['contents'][0][child['name']] = child['switchValue'];
								}else if(child['viewtype'] === "ToggleButton"){
									pagedef['data']['contents'][0][child['name']] = child['togglevalue'];
								}else if(child['viewtype'] === "CheckBox"){
									pagedef['data']['contents'][0][child['name']]= child['valueFormat'];
								}else if(child['viewtype'] === "Radio"){
									pagedef['data']['contents'][0][child['groupName']] = child['groupNameData'];
									pagedef['data']['contents'][0][child['name']] = child['value'];
								}else{
									pagedef['data']['contents'][0][child['name']] = child['value'];
								}
							});
						}
						
						if(ui['rownum'] != undefined){
							var selecteddata = pagedef['data']['contents'][0][ui['rownum']];
							if(selecteddata != undefined){
								$.each( selecteddata, function( key, value ) {
									pagedef['data']['contents'][0][key] = value;
								});
							}
						}
						
						data.push($.utility('clone',pagedef['data']['contents'][0]));
						$.utility('setPageWhereCond', _page['name'], _page['data']['wherecond']);
						
					}else if((pagedef['type']=='DBTableViewList') || (pagedef['type']=='RemoteTableViewList')){		// (localDB || remoteDB) List View Page
						if(pagedef['data']['contents'][0] === undefined){
							pagedef['data']['contents'][0] = {};
						}
						
						var contents = [];
						if(pagedef['data']['contents'][0] != undefined){
							if(pagedef['data']['contents'][0].constructor == Object){
								contents = pagedef['data']['contents'];
							}else
								contents = pagedef['data']['contents'][0];
						}else
							contents = pagedef['data']['contents'];
						
						if(contents != undefined){
							
							if(ui['rownum'] != undefined){
								if(contents[ui['rownum']] != undefined){
									data.push($.utility('clone', contents[ui['rownum']]));	
								}else{
									var selecteddata =contents[ui['rownum']];
									if(selecteddata != undefined){
										$.each( selecteddata, function( key, value ) {
											contents[key] = value;
										});
									}
									data.push($.utility('clone',contents));
								}
							}else{
								if(ui.getId != undefined){
									var uiId = ui.getId();
									var tempStr = uiId.substr(0, uiId.lastIndexOf('-'));
									var rowNum = tempStr.substr(tempStr.lastIndexOf('-')+1, tempStr.length);
									if(!isNaN(parseInt(rowNum))){
										data.push($.utility('clone', contents[rowNum]));
									}else{
										data.push($.utility('clone', contents[0]));
									}
								}
							} 
						}
						
						if(pagedef['toolbartop'] != undefined){
							$.each(pagedef['toolbartop']['children'], function(i, child) {
								if(child['viewtype'] === "SwitchBar"){
									if(data[0] != undefined)
										data[0][child['name']] = child['switchValue'];
								}else if(child['viewtype'] === "ToggleButton"){
									data[0][child['name']] = child['togglevalue'];
								}else if(child['viewtype'] === "CheckBox"){
									data[0][child['name']] = child['valueFormat'];
								}else if(child['viewtype'] === "Radio"){
									pagedef['data']['contents'][0][child['groupName']] = child['groupNameData'];
									pagedef['data']['contents'][0][child['name']] = child['value'];
								}else{
									if((data[0] != undefined) && (child['value'] != undefined)){
										data[0][child['name']] = child['value'];	
									}
								}
							});
						}
						if(pagedef['toolbarbottom'] != undefined){
							$.each(pagedef['toolbarbottom']['children'], function(i, child) {
								if(child['viewtype'] === "SwitchBar"){
									data[0][child['name']] = child['switchValue'];
								}else if(child['viewtype'] === "ToggleButton"){
									data[0][child['name']] = child['togglevalue'];
								}else if(child['viewtype'] === "CheckBox"){
									data[0][child['name']]= child['valueFormat'];
								}else if(child['viewtype'] === "Radio"){
									pagedef['data']['contents'][0][child['groupName']] = child['groupNameData'];
									pagedef['data']['contents'][0][child['name']] = child['value'];
								}else{
									if((data[0] != undefined) && (child['value'] != undefined)){
										data[0][child['name']] = child['value'];	
									}
								}
							});
						}
						if(pagedef['toolbarleft'] != undefined){
							$.each(pagedef['toolbarleft']['children'], function(i, child) {
								if(child['viewtype'] === "SwitchBar"){
									data[0][child['name']] = child['switchValue'];
								}else if(child['viewtype'] === "ToggleButton"){
									data[0][child['name']] = child['togglevalue'];
								}else if(child['viewtype'] === "CheckBox"){
									data[0][child['name']] = child['valueFormat'];
								}else if(child['viewtype'] === "Radio"){
									pagedef['data']['contents'][0][child['groupName']] = child['groupNameData'];
									pagedef['data']['contents'][0][child['name']] = child['value'];
								}else{
									if((data[0] != undefined) && (child['value'] != undefined)){
										data[0][child['name']] = child['value'];	
									}
								}
							});
						}
						
						if(_page['data']['wherecond'] != undefined && _page['data']['wherecond'] != "" ){
							$.utility('setPageWhereCond', _page['name'], _page['data']['wherecond']);
						}
						
					}else{
						if((pagedef['type']=='TableViewList')){
							data.push($.utility('clone',pagedef['data']['contents'][0]));
						}else{
							//when pagedef['type'] is 'DBTableViewList' or 'RemoteTableViewList'
							if(pagedef['data']['contents'][0] === undefined){
								pagedef['data']['contents'][0] = {};
							}
							
							
							if(ui['rownum'] != undefined){
								if(pagedef['data']['contents'][ui['rownum']] != undefined){
									data.push($.utility('clone',pagedef['data']['contents'][ui['rownum']]));	
								}else{
									var selecteddata = pagedef['data']['contents'][0][ui['rownum']];
								    if(selecteddata != undefined){
								    	$.each( selecteddata, function( key, value ) {
								    		pagedef['data']['contents'][0][key] = value;
								    	});
								    }
									data.push($.utility('clone',pagedef['data']['contents'][0]));
								}
								
							}else{
								// ui-group-0-0 
								if(ui.getId != undefined){
									var uiId = ui.getId();
									var tempStr = uiId.substr(0, uiId.lastIndexOf('-'));
									var rowNum = tempStr.substr(tempStr.lastIndexOf('-')+1, tempStr.length);
									if(!isNaN(parseInt(rowNum))){
										data.push($.utility('clone',pagedef['data']['contents'][rowNum]));
									}else{
										data.push($.utility('clone',pagedef['data']['contents'][0]));
									}
								}
								
							} 
							if(pagedef['toolbartop'] != undefined){
								$.each(pagedef['toolbartop']['children'], function(i, child) {
									if(child['viewtype'] === "SwitchBar"){
										if(data[0] != undefined)
											data[0][child['name']] = child['switchValue'];
									}else if(child['viewtype'] === "ToggleButton"){
										data[0][child['name']] = child['togglevalue'];
									}else if(child['viewtype'] === "CheckBox"){
										data[0][child['name']] = child['valueFormat'];
									}else if(child['viewtype'] === "Radio"){
										pagedef['data']['contents'][0][child['groupName']] = child['groupNameData'];
										pagedef['data']['contents'][0][child['name']] = child['value'];
									}else{
										if((data[0] != undefined) && (child['value'] != undefined)){
											data[0][child['name']] = child['value'];	
										}
										
									}
								});
							}
							if(pagedef['toolbarbottom'] != undefined){
								$.each(pagedef['toolbarbottom']['children'], function(i, child) {
									if(child['viewtype'] === "SwitchBar"){
										data[0][child['name']] = child['switchValue'];
									}else if(child['viewtype'] === "ToggleButton"){
										data[0][child['name']] = child['togglevalue'];
									}else if(child['viewtype'] === "CheckBox"){
										data[0][child['name']]= child['valueFormat'];
									}else if(child['viewtype'] === "Radio"){
										pagedef['data']['contents'][0][child['groupName']] = child['groupNameData'];
										pagedef['data']['contents'][0][child['name']] = child['value'];
									}else{
										if((data[0] != undefined) && (child['value'] != undefined)){
											data[0][child['name']] = child['value'];	
										}
									}
								});
							}
							if(pagedef['toolbarleft'] != undefined){
								$.each(pagedef['toolbarleft']['children'], function(i, child) {
									if(child['viewtype'] === "SwitchBar"){
										data[0][child['name']] = child['switchValue'];
									}else if(child['viewtype'] === "ToggleButton"){
										data[0][child['name']] = child['togglevalue'];
									}else if(child['viewtype'] === "CheckBox"){
										data[0][child['name']] = child['valueFormat'];
									}else if(child['viewtype'] === "Radio"){
										pagedef['data']['contents'][0][child['groupName']] = child['groupNameData'];
										pagedef['data']['contents'][0][child['name']] = child['value'];
									}else{
										if((data[0] != undefined) && (child['value'] != undefined)){
											data[0][child['name']] = child['value'];	
										}
										
									}
								});
							}
								
						}
						
						if(_page['data']['wherecond'] != undefined && _page['data']['wherecond'] != "" ){
							$.utility('setPageWhereCond', _page['name'], _page['data']['wherecond']);
						}
					}
				
				}
				else {
					
					$.utility('setPageWhereCond', _page['name'], _page['data']['wherecond']);
					data.push($.utility('clone',pagedef['data']['contents'][0]));
				}
				
				var schema = {};
				if(pagedef['data']['servicename']){
					//_page['data']['servicename'] = pagedef['data']['servicename'];
					schema = $.mobileweb['comdb']['schema'];
				}else{
					schema = $.mobileweb['localdb']['schema'];
				}
				
				if(pagedef['data']['pagedata'] != undefined){
					if(data && data.length == 1){ //Object.assign({},  pagedef['data']['pagedata'], data[0]); -->Nabard App
//						if(_page['type'].indexOf('TableView') == -1)
//							data[0] = Object.assign({}, data[0], pagedef['data']['pagedata']);
						if(_page['type'].indexOf('TableView') == -1){
							$.each(pagedef['data']['pagedata'],function(key,value){
								if(data[0][key] == undefined){
									data[0][key] = value;
								}
							});
						}
						else
							jQuery.extend(data[0], pagedef['data']['pagedata']);//jQuery.extend(pagedef['data']['pagedata'], data[0]);		
					}else
						jQuery.extend(data, pagedef['data']['pagedata']); //jQuery.extend(pagedef['data']['pagedata'], data);
				}
				_page['data']['contents'] = data;
								
				if(_page['data']['tablename'] === ""){
					_page['data']['tablename'] = pagedef['data']['tablename'];
				}
				
				if(_page['data']['tablename']===pagedef['data']['tablename']){
					if(_page['data']['wherecond'] === ""){
						_page['data']['wherecond'] = $.utility('getWhereCondition', _page['data']['tablename'], schema, _page['data']['contents'][0]);
					}
				}else if(_page['data']['wherecond'] !== ""){
					console.log('Test');
					// Please remove if part,if you find ane bug
					if(((pagedef['type']=='BaseView')||(pagedef['type']=='ScrollView')) &&((_page['type']=='DBTableViewList')||(_page['type']=='RemoteTableViewList'))){
						if(_page['data']['contents']!="")
						_page['data']['contents'] = data;
						_page['data']['wherecond'] = $.utility('getPageWhereCond', _page['name']);
						var where = _page['data']['wherecond'];
						var chunks = where.split("[");
						for ( var i = 0; i < chunks.length; i++) {
								if (chunks[i].indexOf("]") != -1) {
									var j = chunks[i].indexOf("]");
									var temp = chunks[i].substring(0, j);
										$.each(data[0], function(key, value){
												if(key === temp){
													where=where.replace("["+temp+"]",value);
												}
											});		
								}
							}
							_page['data']['wherecond']=where;
					}
					else { // for listview to listview data transfer.. and Listview to Tableview with different tables in both...
						if(_page['data']['wherecond'] != undefined){
							_page['data']['wherecond'] = $.utility('getPageWhereCond', _page['name']);
							if(_page['data']['wherecond'] != undefined){
								if((_page['data']['wherecond'].indexOf('[') > -1) && (_page['data']['wherecond'].indexOf(']') > -1)){
									var where =  _page['data']['wherecond'].split("[");
									for ( var i = 0; i < where.length; i++) {
										if (where[i].toString().indexOf("]") != -1) {
											var j = where[i].toString().indexOf("]");
											var org = "[" + where[i].substring(0, j) + "]";
											if(data != undefined && data[0] != undefined){
												$.each(data[0], function(key, value){
													if(key === where[i].substring(0, j)){
														var new_where=_page['data']['wherecond'].replace(org,value);
														_page['data']['wherecond'] = new_where;
													}
												});
											}
										}
									}
									
								}
							}
						}
					}
				}
				//Only for Navigation Bar
				if(_page['header']!= undefined ){
						if(!_page['header']['hidden']){
						//For Title
						_page['header']['title'] = _page['header']['title'].toString();
						if(_page['header']['title']!= undefined && _page['header']['title']!= '' ){
							
							navBarTitle = _page['header']['title'];
							if(_page['header']['title'].indexOf('[')!= -1 && _page['header']['title'].indexOf(']')!= -1){
								var title = _page['header']['title'].replace("[","").replace("]","");
								$.each(_page['data']['contents'][0], function(key, value){
									if(key === title){
										_page['header']['titleValue'] = value;
									}
								});
							}else{
								
								if(navBarTitle != ""){
									if(navBarTitle.indexOf('[')!= -1 &&navBarTitle.indexOf(']')!= -1){
										var title = navBarTitle.replace("[","").replace("]","");
										$.each(_page['data']['contents'][0], function(key, value){
											if(key === title){
												_page['header']['titleValue'] = value;
											}
										});

									}else{
										_page['header']['titleValue'] = navBarTitle;
									}
								}else{
									if(_page['header']['title'].indexOf('[')!= -1 && _page['header']['title'].indexOf(']')!= -1){
										var title = _page['header']['title'].replace("[","").replace("]","");
										if((_page['data']['contents'].length > 0) && (_page['data']['contents'][0][title]!= null)){
											_page['header']['titleValue'] = _page['data']['contents'][0][title];
										}
									}
								}
								
							}
						}
					
						//For prompt
						_page['header']['prompt'] = _page['header']['prompt'].toString();
						if(_page['header']['prompt']!= undefined && _page['header']['prompt']!= ''){
							if(_page['header']['prompt'].indexOf('[')!= -1 && _page['header']['prompt'].indexOf(']')!= -1){
								navBarPrompt = _page['header']['prompt'];
								var prompt = _page['header']['prompt'].replace("[","").replace("]","");
								$.each(_page['data']['contents'][0], function(key, value){
									if(key === prompt){
										_page['header']['promptValue'] = value;
									}
								});
							}else{
								if(navBarPrompt != ""){
									var prompt = navBarPrompt.replace("[","").replace("]","");
									$.each(_page['data']['contents'][0], function(key, value){
										if(key === prompt){
											_page['header']['promptValue'] = value;
										}
									});
								}else{
									var prompt = _page['header']['prompt'].replace("[","").replace("]","");
									if(_page['data']['contents'][0][prompt]!= null){
										_page['header']['promptValue'] = _page['data']['contents'][0][prompt];
									}
								}
							}
						}
						if( _page['header']['backBtn']['type'] == "text"){
							//For Back Button
							if(_page['header']['backBtn']!= undefined && _page['header']['backBtn']['name']!= undefined){
								_page['header']['backBtn']['name'] = _page['header']['backBtn']['name'].toString();
							}
							if(_page['header']['backBtn']!= undefined && _page['header']['backBtn']['name']!= ''){
								if(_page['header']['backBtn']['name'].indexOf('[')!= -1 && _page['header']['backBtn']['name'].indexOf(']')!= -1){
									backButton = _page['header']['backBtn']['name'];
									var backButtonName = _page['header']['backBtn']['name'].replace("[","").replace("]","");
									$.each(_page['data']['contents'][0], function(key, value){
										if(key === backButtonName){
											_page['header']['backBtn']['name'] = value;
										}
									});
									
								}else{
									if(backButton != ""){
										var backButtonName = backButton.replace("[","").replace("]","");
										$.each(_page['data']['contents'][0], function(key, value){
											if(key === backButtonName){
												_page['header']['backBtn']['name'] = value;
											}
										});
									}else{
										if(_page['header']['title'].indexOf('[')!= -1 && _page['header']['title'].indexOf(']')!= -1){
											var backBtn = _page['header']['backBtn']['name'].replace("[","").replace("]","");
											if((_page['data']['contents'].length > 0) && (_page['data']['contents'][0] != undefined) && (_page['data']['contents'][0][backBtn]!= null)){
												_page['header']['backBtn']['name'] = _page['data']['contents'][0][backBtn];
											}
										}
									}
								}
							}
						}
						
						//For Forward Button
						if(_page['header']['forwardBtn']!= undefined && _page['header']['forwardBtn']['name']!= undefined){
							_page['header']['forwardBtn']['name'] = _page['header']['forwardBtn']['name'].toString();
						}
						
						if(_page['header']['forwardBtn']!= undefined && _page['header']['forwardBtn']['name']!= undefined && _page['header']['forwardBtn']['name']!= ''){
							if(_page['header']['forwardBtn']['name'].indexOf('[')!= -1 && _page['header']['forwardBtn']['name'].indexOf(']')!= -1){
								forwardButton = _page['header']['forwardBtn']['name'];
								var forwardButtonName = _page['header']['forwardBtn']['name'].replace("[","").replace("]","");
								$.each(_page['data']['contents'][0], function(key, value){
									if(key === forwardButtonName){
										_page['header']['forwardBtn']['nameValue'] = value;
									}
								});
							}else{
								if(forwardButton != ""){
									var forwardButtonName = forwardButton.replace("[","").replace("]","");
									$.each(_page['data']['contents'][0], function(key, value){
										if(key === forwardButtonName){
											_page['header']['forwardBtn']['nameValue'] = value;
										}
									});
								}else{
									var forwardBtn = _page['header']['forwardBtn']['name'].replace("[","").replace("]","");
									if((_page['data']['contents'].length > 0) && (_page['data']['contents'][0] != undefined) && (_page['data']['contents'][0][forwardBtn]!= null)){
									_page['header']['forwardBtn']['nameValue'] = _page['data']['contents'][0][forwardBtn];
									}
								}
							}
						}
						
					}
				}
				
			}
			if(action['params']['transitType'] === "transitView"){
				transitInView();
			}else{
				$.utility('setResetEvent', true);
				$.utility('setParentPagedef',pagedef);
				if(!action['params']['transferdata'] && document.getElementById("leftToolBar") != null && !pagedef['toolbarleft']['fixed']){
				   document.getElementById("leftToolBar").style.width = "0px";
				   $('.leftToolBarOverlay').css({width:"0px"});
				}
				$.mobileweb.changePage(action['params']['name'], action['params']['transition'], false);
				var _interval = (_page['type'] === "ScrollView" && pagedef['type'] === "RemoteTableViewList") ? 1000 : 2500;	
				var timer =	setInterval(function(){
					if(!$.utility('isBusy') && $.utility('isInitChildren')){
							clearInterval(timer);
							pagedef = $.utility('getObject',$.mobileweb['pages'],'name',action['params']['name']);
							_page['datatransfer'] = false;
							callback(pagedef, ui, action, eventinitpagedef, true);
					}
				},_interval);
			}
			
		};
		
 		var transitInView = function(param){
			if(pagedef['parentType'] === "SplitView"){
				
				var page =  $.utility('getObject',$.mobileweb['pages'],'name',action['params']['name']);
				if(param == "sibling"){
					if(page['parent'].indexOf("Sibling") != -1)
						page['parent'] = action['params']['siblingPage'];
					
					if(pagedef['name'] !== action['params']['siblingPage'])
 						pagedef = $.utility('getObject',$.mobileweb['pages'],'name', action['params']['siblingPage']);
				}
				page['transitType'] = "transitInView";
				
				$("#"+ pagedef['name'] + "_div").css('display', 'none');
				page['pagedef'] = $.utility('getObject',$.mobileweb['pages'],'name',$.mobileweb.getCurrentPage().getName());
				page['sectionX'] = pagedef['sectionX'];
				page['sectionY'] = pagedef['sectionY'];
				page['sectionwidth'] = pagedef['sectionwidth'];
				page['sectionheight'] = pagedef['sectionheight'];
				
				var timer =	setInterval(function(){
					clearInterval(timer);

					var sLeft = parseFloat(page['sectionX'])* $.mobileweb.device['aspectWratio'];
					var sTop = parseFloat(page['sectionY'])* $.mobileweb.device['aspectHratio'];
					var sWidth = parseFloat(page['sectionwidth'])* $.mobileweb.device['aspectWratio'];
					var sHeight = parseFloat(page['sectionheight'])* $.mobileweb.device['aspectHratio'];
					
					if(!page['toolbartop']['hidden']){
						var ttLeft = parseFloat(page['sectionX'])* $.mobileweb.device['aspectWratio'];
						var ttTop = parseFloat(page['sectionY'])* $.mobileweb.device['aspectHratio'];
						var ttWidth = parseFloat(page['sectionwidth'])* $.mobileweb.device['aspectWratio'];
						var ttHeight = parseFloat(page['toolbartop']['frame']['height'])* $.mobileweb.device['aspectHratio'];
						$('#'+page['name']+'_toolbarTop').css({'top': ttTop+'px', 'left': ttLeft+'px', 'height': ttHeight+'px', 'width': ttWidth+'px'});
						
						$('#'+page['name']+'_ntd_toolbarTop').css({'top': ttTop+'px', 'left': ttLeft+'px', 'height': ttHeight+'px', 'width': ttWidth+'px'});
					
						sTop = ttTop + ttHeight;
						sHeight = sHeight - ttHeight;
					}
					if(!page['toolbarbottom']['hidden']){
						sHeight = sHeight - parseFloat(page['toolbarbottom']['frame']['height'])* $.mobileweb.device['aspectHratio'];

						var tbLeft = parseFloat(page['sectionX'])* $.mobileweb.device['aspectWratio'];
						var tbTop = sTop + sHeight;
						var tbWidth = parseFloat(page['sectionwidth'])* $.mobileweb.device['aspectWratio'];
						var tbHeight = parseFloat(page['toolbarbottom']['frame']['height'])* $.mobileweb.device['aspectHratio'];
						$('#'+page['name']+'_toolbarBottom').css({'top':"",'bottom': 0 +'px', 'left': tbLeft+'px', 'height': tbHeight+'px', 'width': tbWidth+'px'});
						
						$('#'+page['name']+'_ntd_toolbarBottom').css({'top':"",'bottom': 0 +'px', 'left': tbLeft+'px', 'height': tbHeight+'px', 'width': tbWidth+'px'});
					}
					
					$('#'+page['name']+'_section').css({'top': sTop+'px', 'left': sLeft+'px', 'height': sHeight+'px', 'width': sWidth+'px'});
					
					$('#'+page['name']+'_ntd_section').css({'top': sTop+'px', 'left': sLeft+'px', 'height': sHeight+'px', 'width': sWidth+'px'});
					
					if(action['params']['transferdata']){
						$('#'+page['name']+'_div').css('display', 'block');
						
						$('#'+page['name']+'_ntd_div').css('display', 'none');
					}else{
						$('#'+page['name']+'_ntd_div').css('display', 'block');
						
						$('#'+page['name']+'_div').css('display', 'none');
					}
					
					if(page['events'] != undefined && page['events']['BeforeViewPage']!= undefined && page['events']['BeforeViewPage'].length > 0){
						$.utility('setActionRunningStatus', true);
						new $.actions(page, null, page['events']['BeforeViewPage'].slice()).execute(); 
					}
	
				},1000);
			}else if($.mobileweb.getCurrentPage().getViewType() == "PageScrollView"){
				$("#" + action['params']['siblingPage'] + "_div")[0].scrollIntoView();
				var _siblingPage = $.utility('getObject',pagedef['pagedef']['children'],'name',action['params']['siblingPage']);
				if(action['params']['transferdata'])
					_siblingPage['data']['contents'][0] = $.utility('savePageData', pagedef['children'], pagedef['data']['contents'][0], pagedef);
				callback(_siblingPage, ui, action, eventinitpagedef, true);
			}
 		};
 		
 		var transitToSiblingPage = function(){
 			
 			if($.mobileweb.getCurrentPage().getViewType() != "SplitView" && $.mobileweb.getCurrentPage().getViewType() != "PageScrollView")
 				return false;
 
 			$.each($.mobileweb.getProjectCoreData()['pages'] , function(i, page){
 				if(page['name'] === action['params']['name']){
 					$.mobileweb['pages'][i] = JSON.parse(JSON.stringify(page));
 					return false;
 				}
 			});
 				
 			if(action['params']['name'] != "")
 				var _page = $.utility('getObject',$.mobileweb['pages'],'name',action['params']['name']);
 			else
 				var _page = $.utility('getObject',$.mobileweb['pages'],'name',action['params']['siblingPage']);
 			if(_page != undefined){
 				if(_page['parent'] != undefined){
 					if(_page['parent'].indexOf(pagedef['parent']) == -1 && pagedef['parent'].indexOf(_page['parent']) == -1){
 						var eng="Page not valid.";
 						var jap="無効なページです。";
 						$.errorhandler('alertBox',eng,jap);
 						return action;
 					}
 				}
 				
 				var arrParent =  _page['parent'].split("_");
 				if(arrParent.length > 0){
 					_page['parent'] = "page_"+arrParent[arrParent.length-1];
 				}
 				else
 					_page['parent'] = pagedef['parent'];
 				
 				if(pagedef != undefined){
 					if(eventinitpagedef == undefined)
 						eventinitpagedef = pagedef;
 				}else
 					pagedef = $.utility('getObject',$.mobileweb['pages'],'name', action['params']['siblingPage']);
 				
 				if($.mobileweb.getCurrentPage().getViewType() == "PageScrollView"){
 					var isTargetSibling = false;
 					var targetSiblingIndex = 0;
 					$.each(pagedef['pagedef']['children'], function(i, child){
 						if(child['name'] == action['params']['siblingPage'] && (action['params']['name'] == "" || (action['params']['name'] == action['params']['siblingPage']))){
 							targetSiblingIndex = i;
 							isTargetSibling = true;
 						}
 					});
 					if(isTargetSibling){
 						$.utility('setParentPage',$.mobileweb.getCurrentPage());
 						transitInView(targetSiblingIndex);
 					}
 					else
 						View();
 				}else{
 					if(action['params']['transitType'] === "transitView"){
 	 					$.utility('setParentPage',$.mobileweb.getCurrentPage());
 	 					transitInView("sibling");
 	 				}else{
 	 					View();
 	 				}
 				}
 			}
 		};
		
		var Back = function(){
			
			if($.mobileweb.getCurrentPage().getName() == action['params']['targetPage']){// To prevent double click----->  In ref of bug #12162
				return _action;												
			}
			var tabStack = $.utility('getTabStack');
			if(pagedef['parent'].indexOf("tab") > -1){ //Bug #13169 fix
				var parents = pagedef['parent'].split('_');
		        pagedef['parent'] = parents[parents.length - 2] + "_" + parents[parents.length - 1];
		        if(pagedef['parent'].indexOf("page_") == -1){
		        	pageddef['parent'] = "page_" + pagedef['parent'];
		        }
			}
			
			$.each(tabStack, function(i, tabStackGroup){
				$.each(tabStackGroup, function(k, pageName){
					if(pagedef['parent'] == pageName){
						backTabIndex = i;
					}
				});
			});
			var tabStackGroup = [];
			tabStackGroup = tabStack[backTabIndex];
			tabStackGroup.pop();
			$.utility("updateTabStacks", backTabIndex, tabStackGroup);
			$.utility("updateTabPageDataArray", pagedef['name']);
			$.utility("setTransitToParent", true);
			var backPage = $.utility('getObject',$.mobileweb['pages'],'name',pagedef['parent']);
			if(backPage != undefined){
				var backInView = false;
				if(backPage['parentType'] != undefined && backPage['parentType'] == "SplitView"){
					if(pagedef['transitType'] != undefined && pagedef['transitType'] == "transitInView"){
						backInView = true;
					}
					parents = backPage['parent'].split('_');
					parents = parents[parents.length - 2] + "_" + parents[parents.length - 1];
				}else{
					parents = pagedef['parent'];
				}
				if(action['params'] == undefined)
					$.mobileweb.changePage(parents,"slide",true);
				else
					$.mobileweb.changePage(parents,action['params']['transition'],true);
				var _backTimer = ($.utility('getRegisteredActions').length > 0)? 2000 : 1000;//Bug #12398 fix
				var timer =	setInterval(function(){
					if(!$.utility('isBusy') && $.utility('isInitChildren')){
						clearInterval(timer);
						pagedef = $.utility('getObject',$.mobileweb['pages'],'name',pagedef['parent']);
						callback(pagedef, ui, action, eventinitpagedef, true);
					}
				},_backTimer);
				if(backInView)
					transitBackInView(pagedef['name']);
			}else{
				callback(pagedef, ui, action, eventinitpagedef, false);
			}
		};
		
		var transitBackInView = function(param){
 			var timer =	setInterval(function(){
 				clearInterval(timer);
 				var currElem = $('#'+ param +'_div');
 				var backElem = $('#'+ pagedef['name'] +'_div');
 				if(currElem != undefined && backElem != undefined){
					currElem.css('display', 'none');
					backElem.css('display', 'block');
				}
 				$('.ui-loader').css('display', 'none');
 				var parentId = pagedef['parent'].split('_');
 				parentId = parentId[parentId.length - 2] + "_" + parentId[parentId.length - 1];
 				var parentElem = $("[data-url="+parentId+"]");
 				if(parentElem != undefined && parentElem.length == 2)
 					parentElem[1].remove();
 			},2000);
 		};
		
		var RootView = function(){
			if($.mobileweb.getCurrentPage().getName() == action['params']['targetPage']){// To prevent double click----->  In ref of bug #12162
				return _action;												
			}
			var _page ='';
			var _pagename = pagedef['name'];
			do {
				_page = $.utility('getObject',$.mobileweb['pages'],'name',_pagename);
				if(_page != undefined)
					_pagename = _page['parent'];
			}while(_page!= undefined);
			
			var tabindex = 1;
			if(_pagename.indexOf('_') != -1){		// case of 'container' pages like : splitview
				var _arrPage = _pagename.split('_');
				for (var i = 0; i < _arrPage.length; i++) {
					var _element = _arrPage[i];
					if(_element.indexOf("Tab") > -1){
						_pagename = _element;
						break;
					}
				}
			}
			var _index = _pagename.replace("Tab","");//Bug #12093 fix
			if(!isNaN(_index))
				tabindex = _index;
			else
				tabindex = _pagename.charAt(_pagename.length-1);
			tabindex--;
			var parentPage = "";
			$.each($.mobileweb['tabs'], function(i, tabs){
				if(tabindex == i){
					parentPage = tabs['page'];
				}
			});
			//Bug #6783 Fix
			if(pagedef['name'] == parentPage ){
				callback(pagedef, ui, action, eventinitpagedef, false);
				return;
			}
			var tabStack = $.utility('getTabStack');
			var tabStackGroup = [];
			tabStackGroup = tabStack[tabindex];
			tabStackGroup = [];//Bug #10891 Fix 
			tabStackGroup[tabStackGroup.length] = parentPage;
			$.utility("updateTabStacks", tabindex, tabStackGroup);
			$.mobileweb.changeTab(++tabindex,action['params']['transition']);//Bug #9319
			var timer =	setInterval(function(){
				if(!$.utility('isBusy') && $.utility('isInitChildren')){
						clearInterval(timer);
						pagedef = $.utility('getObject',$.mobileweb['pages'],'name',parentPage);
						$.utility('ApplyOnSucessAndOnErrorEvents',pagedef, ui, action['events'], true);
				}
			},1000);
			 
		};
		
		var ReturnToParentView = function(){
			if($.mobileweb.getCurrentPage().getName() == action['params']['targetPage']){// To prevent double click----->  In ref of bug #12162
				return _action;												
			}
			
			var tabStack = $.utility('getTabStack');
			$.each(tabStack, function(i, tabStackGroup){
				$.each(tabStackGroup, function(k, pageName){
					if(action['params']['targetPage'] == pageName){
						backTabIndex = i;
					}
				});
			});
			var tabStackGroup = [];
			var _targetPage = action['params']['targetPage'];			
			tabStackGroup = tabStack[backTabIndex];
			tabStackGroup.splice(tabStackGroup.indexOf(_targetPage) + 1, tabStackGroup.length - (tabStackGroup.indexOf(_targetPage) + 1));
			$.utility("updateTabStacks", backTabIndex, tabStackGroup);
			$.mobileweb.changePage(action['params']['targetPage'],action['params']['transition'],"returnToParentView");
			var timer =	setInterval(function(){
				if(!$.utility('isBusy') && $.utility('isInitChildren')){
					clearInterval(timer);
					pagedef = $.utility('getObject',$.mobileweb['pages'],'name',action['params']['targetPage']);
					callback(pagedef, ui, action, eventinitpagedef, true);
				}
			},1000);

		};

		var transitToAnyPage = function(){
			if($.mobileweb.getCurrentPage().getName() == action['params']['targetPage']){// To prevent double click----->  In ref of bug #12162
				return _action;												
			}
			var tabs = $.mobileweb['tabs'];
			var tabStack = $.utility('getTabStack');
				
			var targetPage = $.page($.utility('getObject',$.mobileweb['pages'],'name', action['params']['name']));
			var x =  targetPage.getParent().split("_");
			var tabName = x[0];
			var tabIndex =0;
			if(tabName.substring(0,4) != "page"){			
				
				tabIndex = tabName.substring(3,tabName.length - 1);
				tabIndex = tabIndex + "" + tabName.charAt(tabName.length - 1);
				tabIndex--;
			}else{
				$.each(tabStack, function(i, tabStackGroup){
					$.each(tabStackGroup, function(k, pageName){
						if(tabName == pageName){
							tabIndex = i;
						}else {
							console.log("No Tab Index");
						}
					});
				});
			}
			var tabStackGroup = [];
			tabStackGroup = tabStack[tabIndex];
			tabStackGroup[tabStackGroup.length] = targetPage.getName();
			$.utility("updateTabStacks", tabIndex, tabStackGroup);
			
			var page = {};
			page1 = $.mobileweb.getPage(action['params']['name']);
			var parents = page1.getParent().split("_");
			page1.setParent(parents[parents.length - 2] + "_" + parents[parents.length - 1]);
			page1.show(action['params']['transition'],false);
			page1.liveContainer();
			
		};

		var transitSideBar = function(){
			//Bug #12558 fix 
			var _pageHratio = $.mobileweb.device['aspectHratio']
			$.mobileweb.device['aspectHratio'] = $.mobileweb.device['leftbarHratio'];
			$.mobileweb.device['leftbarHratio'] = _pageHratio;
			
			if(pagedef['parentType'] != undefined && pagedef['parentType'] == "SplitView"){//Bug #11399 fix
				pagedef['parentPage'] = $.utility('getObject',$.mobileweb['pages'],'name',$.mobileweb.getCurrentPage().getName());
			}else if(pagedef['sidebarParentPagedef'] != undefined){
				pagedef = $.utility('getObject',$.mobileweb['pages'],'name',$.mobileweb.getCurrentPage().getName());
			}
			
			if(!pagedef['toolbarleft']['hidden'] || (pagedef['parentPage'] != undefined && !pagedef['parentPage']['hidden'])){
				if($('#leftToolBar').css('width') != "0px" && $('.leftToolBarOverlay').css('width') != "0px"){
					document.getElementById("leftToolBar").style.width = "0px";
					$('.leftToolBarOverlay').css({width:"0px"});
					
					callback(pagedef, ui, action, eventinitpagedef, true);
					return;
				}
				
				//currently, we are putting toolbarLeft-width as 240 px;
				var wid = Math.ceil(240*$.mobileweb.device['aspectWratio']);

				$('#leftToolBar').css({'box-shadow':'5px 5px 5px #888888'});
				$('.leftToolBarOverlay').css({width:pagedef['width']*$.mobileweb.device['aspectWratio']});
				
				if(pagedef['toolbarleft']['view'] == "FreeScroll"){
					if($.mobileweb['state'] === 'preview')
						$('#iscroll_leftToolBar_'+pagedef['name']).css({'height': pagedef['toolbarleft']['frame']['height']});
					if($('.sidenav').get(0) != undefined){
						var firstChild = $('.sidenav').children("#iscroll_leftToolBar_"+pagedef['name']);
						var len = $('.sidenav').children().length;
						if(len == 1){
							leftToolBar['iscroll'] = {};
							leftToolBar['iscroll'] = new iScroll($('.sidenav').get(0), {
								useTransform: false,
								bounceLock: true,
								onBeforeScrollStart: function (e) {},//Bug 12364 fix
							});
						}
					}
					wid = wid + 10;
					
				}else if(pagedef['toolbarleft']['view'] == "TableView"){
					if(parseInt($("#iscroll_leftToolBar_"+pagedef['name']).css('height')) < parseInt($('.ui-table-position').css('height')))
						$('#iscroll_leftToolBar_'+pagedef['name']).css({'height':parseInt($('.ui-table-position').css('height'))});
					var iscrollHeight = parseFloat($("#iscroll_leftToolBar_"+pagedef['name']).css('height').replace("px",""));
					if($('.sidenav').get(0)['clientHeight'] != iscrollHeight)
						wid = wid + 10;
					if($('.sidenav').get(0) != undefined){
						var childSidebar = $('.sidenav').children();
						if(childSidebar.length == 1){
							leftToolBar['iscroll'] = {};
							leftToolBar['iscroll'] = new iScroll($('.sidenav').get(0), {
								useTransform: false,
								bounceLock: true,
							});
						}
					}
				}
				
				$('#leftToolBar').css({'width':wid+"px"});
				if(!$.isEmptyObject(leftToolBar['iscroll']))
					leftToolBar['iscroll'].hScroll = false;
				var reset_leftPos = parseFloat($('#leftToolBar').css('left').replace("px",""));
				$('.leftToolBarOverlay').css({left:reset_leftPos});	//need to reset initial position.
				
				var timer =	setInterval(function(){
					clearInterval(timer);
					
					var overlay_leftPos = wid + parseFloat($('#leftToolBar').css('left').replace("px",""));
					$('.leftToolBarOverlay').css({left:overlay_leftPos, width:pagedef['width']*$.mobileweb.device['aspectWratio']-wid});			//setting left position & width, so that it'll not overlay on content
					
					if(pagedef['type'].indexOf("Table") > -1){
						//fix of bug #10241. Dated : 09-Jan-2018
						if($("a")[0] != undefined){
							var hrefText = $("a")[0]["href"];
							if(hrefText && hrefText.substr(-1, 1) == "#")
								$("a")[0]["href"] = "#"+pagedef['name'];
						}
					}
					
 				},500);
 				callback(pagedef, ui, action, eventinitpagedef, true);
 			}else
 				callback(pagedef, ui, action, eventinitpagedef, false);
		};
		
		var setParentData = function(){
			var targetpage = pagedef['parent'].split('page');
			action['params']['targetpage'] = "page"+targetpage[targetpage.length -1];
			var check = 0;
			var page = $.utility('getObject',$.mobileweb['pages'],'name',action['params']['targetpage']);
			if(page != undefined && page != null){
				check++;
				var dataCount = 0;
				if(page['data']['contents'][0] != undefined){
					$.each(page['data']['contents'][0], function(key, data){
						if(key ===  action['name']){
							dataCount++;
							page['data']['contents'][0][key] = $.utility("tokenizeString",action['params']['value'], page, action);
						}
					});
				}
				if(dataCount != 0){
					page['data']['contents'][0][action['params']['value'].replace("[", "").replace("]","")] = $.utility("tokenizeString",action['params']['value'], page, action);
				}
				var targetPage=$.mobileweb.getPage(page['name']);
				var target = {};
				var conditionValue = false;
				if(action['condition'] != undefined && !$.isEmptyObject(action['condition'])){
					conditionValue = $.utility('parseCondition', pagedef, ui, action, eventinitpagedef , action['condition']['groupcases']);
				}else{
					conditionValue = true;
				}
				if(conditionValue){
					var sendAction = $.utility('clone', action);
					if(sendAction.condition!= undefined && !$.isEmptyObject(sendAction.condition)){
						sendAction['condition']['result'] = true;
					}
					delete sendAction.events;
					if(action['params']['value'] != undefined){
						sendAction.params.value = action['params']['value'];
					}
					sendAction.method = "SetMainValue";
					sendAction.category = "MainValue";
					var actionObject = {"pagedef":$.utility('clone', pagedef),"ui":ui,"action":sendAction,"target":target};
					$.utility('setRegisteredActions',actionObject);
					callback(pagedef, ui, action, eventinitpagedef, true);

				}else {
					callback(pagedef, ui, action, eventinitpagedef, false);
				}
				
			}
			if(check == 0){
				callback(pagedef, ui, action, eventinitpagedef, false);
				return;
			}
		};
		
		return _action;
	};
	
	
	function MainValue(pagedef, ui, action, eventinitpagedef ,target, callback){
		var _action = {};
		_action.execute = function(){
			if(action['method'] !== "SplitCSV"){
				if((action['method'] == 'SetMainValue') && (action['name'].toLowerCase() !== 'where' && action['name'].toLowerCase() !== 'sort')){
					var flag = $.errorhandler('checkTargetUIObject',target, action['params'] ,action);
					if(!flag && action['method'] !== "ResetViewData" ){
						if(!flag || target.getViewType()!=='CheckBox' && target.getViewType()!=='ProgressBar' && target.getViewType()!=='SwitchBar' && target.getViewType()!=='Slider'){
							callback(pagedef, ui, action, eventinitpagedef, flag);
						return _action;
						}
					}
				}
			}
			if(action['method'] !='ResetViewData' && action['method'] !='SetMainValue'){
				if(!$.isEmptyObject(target)){
					var _isTextSupportedUI = $.errorhandler('checkforTextSupportedUI',target.getViewType());
					if(!_isTextSupportedUI)
						callback(pagedef, ui, action, eventinitpagedef, false);
				}
			}
		
			switch(action['method']){
				case 'ResetViewData':
					ResetViewData();
					break;
					
				case 'SetMainValue':
					SetMainValue();
					break;

				case 'Calculate':
					Calculate();
					break;
					
				case 'AppendText':
					AppendText();
					break;
				case 'ClearText':
					ClearText();
					break;
				case 'DeleteLastOneCharacter':
					DeleteLastOneCharacter();
					break;
					
				case 'combineToCsv':
					combineToCsv();
					break;
				case 'SplitCSV':
					SplitCSV();
					break;
				
				case 'StrToHex':
					StrToHex();
					break;
				case 'HexToStr':
					HexToStr();
					break;
				
				default:
					callback(pagedef, ui, action, eventinitpagedef, false);
					break;
			}
			
		};
		
		var ResetViewData = function(){
			var time = 100;
			var pagename = action['params']['targetpage'];
			var _flag = false;
			if(pagedef != undefined){
				if(pagedef['sidebarParentPagedef'] != undefined) // Bug #12380 fix
					pagedef = pagedef['sidebarParentPagedef'];
				
				var pageobj = pagedef;// $.utility('getObject',$.mobileweb['pages'],'name',pagename);
				var page = $.utility('clone' , pageobj);
				$.utility('setreSettingDataStatus', true);
				
				if(pagedef['parentType'] == "PageScrollView"){
					$.each(pageobj['childrenUI'],function(i,child){
						if(child.getTemplate() != undefined && child.getTemplate() != ""){
							if(pageobj['data']['contents'][0] != undefined)
								child.setValue($.utility('tokenizeString', $.utility('extractDataFromRecord',  pageobj['data']['contents'][0], child.getTemplate())), pageobj);
							else
								child.setValue($.utility('tokenizeString',child.getTemplate(),pageobj));
						}
						child.applyOverrides();
					});
				}
				else if(pagedef['parentType'] == undefined){// || pagedef['parentType'] == "PageScrollView"){
					if(pageobj['type'] == 'DBTableView' || pageobj['type'] == 'RemoteTableView'){
						$.utility("reloadDBRecordViewPage", pagedef);
						_flag = true;
						
					}else if(pageobj['type'] === 'DBTableViewList' || pageobj['type'] === 'RemoteTableViewList'){
						var _interval = (pageobj['type'] === 'RemoteTableViewList') ? 1500 : 400 ;
						
						if(pageobj['type'] === 'RemoteTableViewList'){
							$('.pagination').css({'visibility' : 'hidden'});
							setTimeout(function(){
								new $.actions(pagedef, null, [{method:"Select", category:"ComAction", callingMethod:"RemoteNumRecords",
									params:{
										servicename: pagedef['data']['servicename'],
										table: pagedef['data']['tablename'],
										where: pagedef['data']['wherecond'],
										order: pagedef['data']['order'],
										fields:"",
										pageNumRecords: true,
									}
								}]).execute();
							},800);
						}else if(pagedef['type'] == "DBTableViewList"){
							new $.actions(pagedef, null, [{method:"NumRecords", category:"DBAction",
								params:{
									table: pagedef['data']['tablename'],
									where: pagedef['data']['wherecond'],
									order: pagedef['data']['order'],
									fields:""
								}
							}]).execute();
						}
							
						function center(el) {
							el.css("position", "absolute");
							el.css("top", ($(window).height() - el.height()) / 2 + $(window).scrollTop() + "px");
							el.css("left", ($(window).width() - el.width()) / 2 + $(window).scrollLeft() + "px");
						}
						setTimeout(function(){
							$.blockUI({
								css: {
									backgroundColor: 'transparent',
									border: 'none'
								},
								message: '<div class="spinner" style="font-size: 18px;font-weight: bold;color: gray;">Please wait...</div>',
								baseZ: 1500,
								overlayCSS: {
									backgroundColor: '#D3D3D3',
									opacity: 0.5,
									cursor: 'wait'
								}
							});
						},200);
						center($('.blockUI.blockMsg'));
						$('#empty_list').css({'visibility':'hidden'});
						$('#pagination-container').css({'visibility':'hidden'});
//						$("#showmore").remove();
						if(pageobj['iscroll'] != undefined){
							pageobj['iscroll'].destroy();
							$("#iscroll_" + pageobj['name'] + "> div:nth-child(2)").remove();
						}
						var baseId = $("#"+pageobj['children'][0]['id']+" ul").attr('id');
						$("#"+baseId+" li").remove();
							
						var reloadtimer = setInterval(function(){
							   clearInterval(reloadtimer);
							   pageobj['reloaded'] = true;
							   $.utility("setReverseTransition", false);
							   $.utility("reloadRemoteListViewPage", pageobj);
							   _flag = true;
						},_interval);
						
					}else if(pageobj['type'] === 'BaseView' || pageobj['type'] === 'ScrollView'){
						var myPage = $.mobileweb.getPage(pageobj['name']);
						$.utility("setReverseTransition", false);
						$.utility('setAppBootingForFirstTime', false);
						myPage.refreshDisplay(true);
						_flag = true;
					}
					
				}else{
					if(pagedef['parentType'] != undefined && pagedef['parentType'] === "SplitView"){		// source( where action triggered) page is SplitView 'child' page
						if(pagename != pagedef['name']){													// source page is 'sibling' page
							$.utility('reloadSplitViewPageSection', pagedef, pagename);
							_flag = true;
						}else{
							if(pagedef['type']  === "RemoteTableViewList"){
								if(pagedef['data']['contents']['pageCallback'] === "SamePage"){
									$.utility('reloadSplitViewPageSection', pagedef, pagename);
									_flag = true;
								}else if(pagedef['data']['contents']['pageCallback'] === "DifferentPage"){
									$.utility("reloadRemoteListViewPage", pagedef);
									_flag = true;
								}
							}else{
								$.utility('reloadSplitViewPageSection', pagedef, pagename);
								_flag = true;
							}
						}
					}					
				}
				
				if((pagedef['parentType'] == undefined || pagedef['parentType'] == "SplitView") && !_flag){
					var _page = $.utility('getObject',$.mobileweb['pages'],'name',pagename);
					var _parentPage = _page['parent'].split("_");
					_parentPage = "page_" + _parentPage[_parentPage.length - 1];
					if(_parentPage == pagedef['name'])
						$.utility('reloadSplitViewPageSection', pagedef, pagename);
				}
				
				if(pagedef['type'] === 'RemoteTableViewList' || pagedef['type'] === 'DBTableViewList')
					time = 2000;
				var timer =	setInterval(function(){
					if($.utility("isInitChildren")){
						clearInterval(timer);
						$.utility('setreSettingDataStatus', false);
						callback(pagedef, ui, action, eventinitpagedef, true);
					}
				},time);
			}
		};
		
		var SetMainValue = function(){
			var tempTargetValue = '';
			var temActionValue = action['params']['value'];
			action['params']['value'] = $.utility('checkGlobalVariable', action['params']['value']);
			if(action['params']['value'] != undefined){
				var paramValue = action['params']['value'];
				if(paramValue.indexOf("@@") != -1 || paramValue.indexOf(/@@/gi) != -1)
					paramValue = $.utility('tokenizeString',paramValue,pagedef,action);
			}
			
			if(action['name'].toLowerCase() === 'where' || action['name'].toLowerCase() === 'sort'){
				var pagename = action['params']['targetpage'];
				var pageobj = $.utility('getObject',$.mobileweb['pages'],'name',pagename);
				if((pageobj != undefined) && ((pageobj['type'] != 'BaseView') || (pageobj['type'] != 'ScrollView'))){
					//Special Case : Sort and Where Cond on database
					if(action['name'].toLowerCase() === 'where')
						pageobj['data']['wherecond'] = action['params']['value'];

					if(action['name'].toLowerCase() === 'sort')
						pageobj['data']['order'] = action['params']['value'].replace("=",' ').replace("'",'');

					pageobj['data']['updated'] = false;
					callback(pagedef, ui, action, eventinitpagedef, true);
				}else{
					callback(pagedef, ui, action, eventinitpagedef, false);
				}
			}
			else {
				var fin;
				var targetValue=null;
				var strPrefix = '';
				var strSuffix = '';
				
				if(action['params']['value'].indexOf("[")!=-1 && action['params']['value'].indexOf("]")!=-1 ){
					fin=action['params']['value'].replace("[", "");
					fin=fin.replace("]", "");
					
					if(eventinitpagedef!== undefined){
						tempTargetValue = action['params']['value'];
						
						var chunks = action['params']['value'].split("[");
						for ( var i = 0; i < chunks.length; i++) {
							
							if (chunks[i].toString().indexOf("]") != -1) {
								var j = chunks[i].indexOf("]");
								var org = "[" + chunks[i].substring(0, j) + "]";

								fin=chunks[i].substring(0, j);
								
								if(eventinitpagedef['type'] == 'BaseView' || eventinitpagedef['type'] == 'ScrollView'){
									$.each(eventinitpagedef['children'], function(i, child){
										if(child['name']== fin){
											tempTargetValue=tempTargetValue.replace(org, child['value']);
											targetValue = tempTargetValue;
										}
									});
									if(eventinitpagedef['toolbartop'] != undefined && eventinitpagedef['toolbarbottom'] != undefined){
										$.each(eventinitpagedef['toolbartop']['children'], function(i, child){
											if(child['name']== fin){
												tempTargetValue=tempTargetValue.replace(org, child['value']);
												targetValue = tempTargetValue;
											}
										});
										$.each(eventinitpagedef['toolbarbottom']['children'], function(i, child){
											if(child['name']== fin){
												tempTargetValue=tempTargetValue.replace(org, child['value']);
												targetValue = tempTargetValue;
											}
										});
									}
									if(eventinitpagedef['toolbarleft'] != undefined){
										$.each(eventinitpagedef['toolbarleft']['children'], function(i, child){
											if(child['name']== fin){
												tempTargetValue=tempTargetValue.replace(org, child['value']);
												targetValue = tempTargetValue;
											}
										});
									}
									
									if(eventinitpagedef['data'] != undefined && eventinitpagedef['data']['contents'] != undefined){
 										if(eventinitpagedef['data']['contents'].constructor == Array){
 											$.each(eventinitpagedef['data']['contents'], function(key, content){
 												if(content != undefined){
 													$.each(content, function(childKey, value){
 														if(childKey== fin){
 															tempTargetValue=tempTargetValue.replace(org, value);
 															targetValue = tempTargetValue;
 														}
 													});
 												}
 											});
 										}else{
 											$.each(eventinitpagedef['data']['contents'], function(key, value){
 												if(key== fin){
 													tempTargetValue=tempTargetValue.replace(org, value);
 													targetValue = tempTargetValue;
 												}
 											});
 										}
 									}
									
									if(targetValue === null){
										tempTargetValue = tempTargetValue.replace(org, $.utility('tokenizeString',org,pagedef, action));
										targetValue = tempTargetValue;
									}

								}else {
									if(eventinitpagedef['type'] === "RemoteTableViewList" || eventinitpagedef['type'] === "DBTableViewList" ){
										if(eventinitpagedef['data']['contents']['currentRow'] != undefined)
											ui['rownum'] = eventinitpagedef['data']['contents']['currentRow'];
										
										if(ui != undefined && ui['rownum'] == undefined){
											var rowNum = 0;
											if(ui.getId() != undefined){
												var tempStr = ui.getId().substr(0, ui.getId().lastIndexOf('-'));
												rowNum = tempStr.substr(tempStr.lastIndexOf('-')+1, tempStr.length);
											}
				                            if(!isNaN(parseInt(rowNum)))
				                            	ui['rownum']= rowNum;
				                            else{
				                            	if(ui.getName() != undefined){
													rownum = ui.getName().substring(ui.getName().lastIndexOf("-") + 1,ui.getName().length);
												}
				                            	if(!isNaN(parseInt(rowNum)))
					                            	ui['rownum']= rowNum;
				                            	else
				                            		ui['rownum']= 0;
				                            }
										}
										var uiId;
										if(ui.getViewType() == "Row"){
											uiId = ui['id'];
										}else
											uiId = ui.getId();
										
										if(ui['rownum'] != undefined && uiId.split('-').length > 2){
											var initcontents;
											if(eventinitpagedef['data']['contents'][0][ui['rownum']] != undefined){
												initcontents = eventinitpagedef['data']['contents'][0][ui['rownum']];
											}
											else if(eventinitpagedef['data']['contents'][ui['rownum']] != undefined)
												initcontents = eventinitpagedef['data']['contents'][ui['rownum']];
											else
												initcontents = eventinitpagedef['data']['contents'][0];
											$.each(initcontents, function(key, value){
												if(key== fin){
													tempTargetValue=tempTargetValue.replace(org, value);
													targetValue = tempTargetValue;
												}
											});
										}
										if(eventinitpagedef['toolbartop'] != undefined && eventinitpagedef['toolbarbottom'] != undefined){
											$.each(eventinitpagedef['toolbartop']['children'], function(i, child){
												if(child['name']== fin){
													tempTargetValue=tempTargetValue.replace(org, child['value']);
													targetValue = tempTargetValue;
												}
											});
											$.each(eventinitpagedef['toolbarbottom']['children'], function(i, child){
												if(child['name']== fin){
													tempTargetValue=tempTargetValue.replace(org, child['value']);
													targetValue = tempTargetValue;
												}
											});
										}
										if(eventinitpagedef['toolbarleft'] != undefined){
											$.each(eventinitpagedef['toolbarleft']['children'], function(i, child){
												if(child['name']== fin){
													tempTargetValue=tempTargetValue.replace(org, child['value']);
													targetValue = tempTargetValue;
												}
											});
										}
									}else{
										$.each(eventinitpagedef['data']['contents'], function(i, contents){
											$.each(contents, function(key, value){
												if(key== fin){
													tempTargetValue=tempTargetValue.replace(org, value);
													targetValue = tempTargetValue;
												}
											});
										});
										if(eventinitpagedef['toolbartop'] != undefined && eventinitpagedef['toolbarbottom'] != undefined){
											$.each(eventinitpagedef['toolbartop']['children'], function(i, child){
												if(child['name']== fin){
													tempTargetValue=tempTargetValue.replace(org, child['value']);
													targetValue = tempTargetValue;	
												}
											});
											$.each(eventinitpagedef['toolbarbottom']['children'], function(i, child){
												if(child['name']== fin){
													tempTargetValue=tempTargetValue.replace(org, child['value']);
													targetValue = tempTargetValue;
												}
											});
										}
										if(eventinitpagedef['toolbarleft'] != undefined){
											$.each(eventinitpagedef['toolbarleft']['children'], function(i, child){
												if(child['name']== fin){
													tempTargetValue=tempTargetValue.replace(org, child['value']);
													targetValue = tempTargetValue;
												}
											});
										}
									}
								}
							}
						}
					}else{
						
						if(pagedef['type'] == 'BaseView' || pagedef['type'] == 'ScrollView'){
							targetValue=$.utility('tokenizeString',action['params']['value'],pagedef, action);
						}else{
							tempTargetValue = action['params']['value'];
							
							var chunks = action['params']['value'].split("[");
							for ( var i = 0; i < chunks.length; i++) {
								
								if (chunks[i].toString().indexOf("]") != -1) {
									var j = chunks[i].indexOf("]");
									var org = "[" + chunks[i].substring(0, j) + "]";
									fin=chunks[i].substring(0, j);
									if(pagedef['type'] === "RemoteTableViewList" || pagedef['type'] === "DBTableViewList" ){
										if(ui == null){
											ui = {};
											var contents = {};
											if(pagedef['data']['contents']['currentRow'] != undefined){
												ui['rownum'] = pagedef['data']['contents']['currentRow'];
												contents = pagedef['data']['contents'][ui['rownum']];
											}
											
											$.each(contents, function(key, value){
												if(key== fin){
													tempTargetValue=tempTargetValue.replace(org, value);
													targetValue = tempTargetValue;
												}
											});
										}else{
											if(pagedef['data']['contents']['currentRow'] != undefined)
												ui['rownum'] = pagedef['data']['contents']['currentRow'];
											
											if(ui != undefined && ui['rownum'] == undefined){
												var rowNum = 0;
												if(ui.getId() != undefined){
													var tempStr = ui.getId().substr(0, ui.getId().lastIndexOf('-'));
													rowNum = tempStr.substr(tempStr.lastIndexOf('-')+1, tempStr.length);
												}
												if(!isNaN(parseInt(rowNum)))
													ui['rownum']= rowNum;
												else{
													if(ui.getName() != undefined){
														rownum = ui.getName().substring(ui.getName().lastIndexOf("-") + 1,ui.getName().length);
													}
													if(!isNaN(parseInt(rowNum)))
														ui['rownum']= rowNum;
													else
														ui['rownum']= 0;
												}
											}
											var uiId;
											if(ui.getViewType() == "Row"){
												uiId = ui['id'];
											}else
												uiId = ui.getId();
											
											if(ui['rownum'] != undefined && uiId.split('-').length > 2){
												var contents;
												if(pagedef['data']['contents'][0][ui['rownum']] != undefined){
													contents = pagedef['data']['contents'][0][ui['rownum']];
												}
												else
													contents = pagedef['data']['contents'][ui['rownum']];
												$.each(contents, function(key, value){
													if(key== fin){
														tempTargetValue=tempTargetValue.replace(org, value);
														targetValue = tempTargetValue;
													}
												});
											}
										}
					
//										if(pagedef['data']['contents']['currentRow'] != undefined)
//											ui['rownum'] = pagedef['data']['contents']['currentRow'];
//										
//										if(ui != undefined && ui['rownum'] == undefined){
//											var rowNum = 0;
//											if(ui.getId() != undefined){
//												var tempStr = ui.getId().substr(0, ui.getId().lastIndexOf('-'));
//												rowNum = tempStr.substr(tempStr.lastIndexOf('-')+1, tempStr.length);
//											}
//											if(!isNaN(parseInt(rowNum)))
//												ui['rownum']= rowNum;
//											else{
//												if(ui.getName() != undefined){
//													rownum = ui.getName().substring(ui.getName().lastIndexOf("-") + 1,ui.getName().length);
//												}
//												if(!isNaN(parseInt(rowNum)))
//													ui['rownum']= rowNum;
//												else
//													ui['rownum']= 0;
//											}
//										}
//										var uiId;
//										if(ui.getViewType() == "Row"){
//											uiId = ui['id'];
//										}else
//											uiId = ui.getId();
//										
//										if(ui['rownum'] != undefined && uiId.split('-').length > 2){
//											var contents;
//											if(pagedef['data']['contents'][0][ui['rownum']] != undefined){
//												contents = pagedef['data']['contents'][0][ui['rownum']];
//											}
//											else
//												contents = pagedef['data']['contents'][ui['rownum']];
//											$.each(contents, function(key, value){
//												if(key== fin){
//													tempTargetValue=tempTargetValue.replace(org, value);
//													targetValue = tempTargetValue;
//												}
//											});
//										}
										
										var _toolbar = false;
										if(pagedef['toolbartop'] != undefined && pagedef['toolbarbottom'] != undefined){
											$.each(pagedef['toolbartop']['children'], function(i, child){
												if(child['id'] == target.getId()){
													_toolbar = true;
												}
												if(child['name']== fin){
													tempTargetValue=tempTargetValue.replace(org, child['value']);
													targetValue = tempTargetValue;
												}
											});
											$.each(pagedef['toolbarbottom']['children'], function(i, child){
												if(child['id'] == target.getId()){
													_toolbar = true;
												}
												if(child['name']== fin){
													tempTargetValue=tempTargetValue.replace(org, child['value']);
													targetValue = tempTargetValue;
												}
											});
										}
										if(pagedef['toolbarleft'] != undefined){
											$.each(pagedef['toolbarleft']['children'], function(i, child){
												if(child['id'] == target.getId()){
													_toolbar = true;
												}
												if(child['name']== fin){
													tempTargetValue=tempTargetValue.replace(org, child['value']);
													targetValue = tempTargetValue;
												}
												
											});
										}
										if(_toolbar && (targetValue == null || targetValue.indexOf("[") !=-1)){ //Bug #12400 fix 
											$.each(pagedef['data']['contents'][0], function(key, value){
												if(key== fin){
													tempTargetValue=tempTargetValue.replace(org, value);
													targetValue = tempTargetValue;
												}
											});
										}
									}else if(pagedef['type'] == 'BaseView' || pagedef['type'] == 'ScrollView'){
										targetValue=$.utility('tokenizeString',action['params']['value'],pagedef, action);
									}else{
										$.each(pagedef['data']['contents'], function(i, contents){
											$.each(contents, function(key, value){
												if(key== fin){
													tempTargetValue=tempTargetValue.replace(org, value);
													targetValue = tempTargetValue;
												}
											});
											
										});
										if(pagedef['toolbartop'] != undefined && pagedef['toolbarbottom'] != undefined){
											$.each(pagedef['toolbartop']['children'], function(i, child){
												if(child['name']== fin){
													tempTargetValue=tempTargetValue.replace(org, child['value']);
													targetValue = tempTargetValue;
												}
											});
											$.each(pagedef['toolbarbottom']['children'], function(i, child){
												if(child['name']== fin){
													tempTargetValue=tempTargetValue.replace(org, child['value']);
													targetValue = tempTargetValue;
												}
											});
										}
										if(pagedef['toolbarleft'] != undefined){
											$.each(pagedef['toolbarleft']['children'], function(i, child){
												if(child['name']== fin){
													tempTargetValue=tempTargetValue.replace(org, child['value']);
													targetValue = tempTargetValue;
												}
											});
										}
									}
								}
								
								// now Check for SplitCSV Data..
								if((targetValue == undefined || targetValue=="") && ($.utility('GetCSVData').length > 0)){
									var csvDataArray = $.utility('GetCSVData');
									var chunks = action['params']['value'].split("[");
									for ( var i =0; i < chunks.length; i++) {
										if (chunks[i].indexOf("]") != -1) {
											var j = chunks[i].indexOf("]");
											var org = "[" + chunks[i].substring(0, j) + "]";
											for(var object in csvDataArray){
												if(chunks[i].substring(0, j).indexOf("-") != -1){
													var finArray = chunks[i].substring(0, j).split("-");
													if(csvDataArray[object]['prefix'] === finArray[0]){
														// Iterate through inner Array...
														for(var data in csvDataArray[object]['rowData']){
															if(finArray[1] === data){
																targetValue = targetValue + "" +csvDataArray[object]['rowData'][data].replace('"','').replace('"','');
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}

				}else{
					targetValue=$.utility('tokenizeString',action['params']['value'],pagedef, action);
				}
				
				if(targetValue != undefined && $.type(targetValue) === "string"){
					if(targetValue.indexOf("@@") == 0)		
					{
						if(paramValue.indexOf("HASH") != -1){
							// Evaluating 'hash' function here.
							if(paramValue.indexOf("[") !=-1 && paramValue.indexOf("]") != -1 ){
								var refUI = paramValue.replace("@@HASH(", "");
								refUI = refUI.split(",")[0].replace("[","").replace("]","").replace("'","").replace("'","");
								var fin = $.utility("CheckAndGetUIElementValue",$("[name='"+refUI+"']"),refUI, pagedef);
								
								paramValue = paramValue.replace("@@", "").replace("["+refUI+"]", fin);
							}
							paramValue = paramValue.replace("@@", "");
							var paramPromise = eval("$." + paramValue);
							setTimeout(function(){
								if (paramPromise !== undefined) {
									paramPromise.then(function(result) {
							   			//console.log("paramPromise: " + result);
							   			paramValue = result;
							   			target.setValue(result, true);
							   			callback(pagedef, ui, action, eventinitpagedef, true);
							  	    }).catch(function(error) {
										//console.error("paramPromise reject: " + error);
										target.setValue("");
										callback(pagedef, ui, action, eventinitpagedef, false);
							  	    });
							    }
							},500);
							
							return;
						}else {
							//In reference of Bug #10858 
							targetValue=$.utility('tokenizeString',targetValue,pagedef, action);
						}
					}
				}
				
				if(targetValue === null){
					if(action['params']['value'].indexOf("@@") !== -1)	 
						targetValue= paramValue;
				}
				
				if(strPrefix != '' || strSuffix != ''){
 					targetValue = strPrefix + targetValue + strSuffix;
 				}

				$.utility('updateDataContents', target.getName(), targetValue, pagedef, target);
				if(target.getViewType() !='Radio' && target.getViewType() !='ProgressBar')
					$.utility("updateChildrenData", pagedef, target.getName(), targetValue);
				
				
				if(target.getViewType()=='TextField' || target.getViewType()=='NumericField' || target.getViewType()=='Label' || target.getViewType()=='TextArea'){
					if(targetValue !== undefined && targetValue !== "undefined"){
						target.setValue(targetValue, true);
						callback(pagedef, ui, action, eventinitpagedef, true);
					}else{
						target.setValue("");
						callback(pagedef, ui, action, eventinitpagedef, false);
					}
						
				}else if(target.getViewType()=='Image'){
					var targetVal = targetValue;
					if(target.getSource() != "url"){
						if(target.getSource() == 'remote' || target.getSource() == 'remotedb'){
							if(targetValue.indexOf("http") == -1)
								targetVal = $.utility('getRemoteImage', targetValue);
  						}else 
  							targetVal = $.utility('getImage', targetValue);
					}
					$('#' + target.getId()).attr('src', targetVal);
					
					target.setValue(targetValue);
					callback(pagedef, ui, action, eventinitpagedef, true);
					
				}else if(target.getViewType()=='WebView'){
					target.setValue(targetValue);
					callback(pagedef, ui, action, eventinitpagedef, true);
				}else if(target.getViewType()=='CheckBox'){
					targetValue = targetValue.toLowerCase();
					if((targetValue === "false") || (targetValue === "off") || (targetValue == "0")  || (targetValue == "no")){
						$('#'+target.getId()+target.getName()).attr('checked',false);
						$('#'+target.getId()+target.getName()).change();
						target.parseValue(targetValue);
						callback(pagedef, ui, action, eventinitpagedef, true);
					}else if((targetValue === "on") || (targetValue === "true") || (targetValue == "1")  || (targetValue == "yes")){
						$('#'+target.getId()+target.getName()).attr('checked',true);
						$('#'+target.getId()+target.getName()).change();
						target.parseValue(targetValue);
						callback(pagedef, ui, action, eventinitpagedef, true);
					}else{
						callback(pagedef, ui, action, eventinitpagedef, false);
					}

				}else if(target.getViewType()=='ToggleButton'){
					var tempValue = targetValue.toLowerCase();
					if(tempValue == "on" || tempValue == "1"|| tempValue == "true" || tempValue == "yes" || tempValue == "off" || tempValue == "0"|| tempValue == "false" || tempValue == "no"){
						target.setValue(tempValue, true);
						callback(pagedef, ui, action, eventinitpagedef, true);
					}
					else {
						callback(pagedef, ui, action, eventinitpagedef, false);
					}
				}else if(target.getViewType()=='RoundButton' || target.getViewType()=='TextButton'){
					target.setValue(targetValue);
					callback(pagedef, ui, action, eventinitpagedef, true);
				}else if(target.getViewType()=='SwitchBar'){
					targetValue = targetValue.toLowerCase();
					if(targetValue == 'true' || targetValue == 'false' || targetValue == '1' || targetValue == '0' || targetValue == 'on' || targetValue == 'off' || targetValue == 'yes' || targetValue == 'no'){
						target.setActionFlag();
						target.setSelected(targetValue);
						callback(pagedef, ui, action, eventinitpagedef, true);
					}
					else
						callback(pagedef, ui, action, eventinitpagedef, false);
				}else if(target.getViewType()=='Slider'){
					if(!isNaN(targetValue)){
						var sliderObj = {page_name:pagedef['name'],u_id:target.getId(),value:targetValue};
						$.utility('setSessionData',sliderObj,"sliderObj");//--
						$('#'+target.getId()+'>input').attr('value', targetValue);
						$('#'+target.getId()+'>input').slider("refresh");
						callback(pagedef, ui, action, eventinitpagedef, true);
						target.triggerEvent();
					}
					else {
						callback(pagedef, ui, action, eventinitpagedef, false);
					}
				}else if(target.getViewType()=='GoogleMap'){
					if(targetValue === ""){
						// fire error event..
						callback(pagedef, ui, action, eventinitpagedef, false);
					}
					else
 						callback(pagedef, ui, action, eventinitpagedef, true);

					$.GMapService('setMapLocation',action['params'], targetValue, target, action, pagedef, ui);
				}
				else if(target.getViewType()=='ProgressBar'){
					if(!isNaN(targetValue)){
						var progressBarObj = {page_name:pagedef['name'],u_id:target.getId(),targetValue:targetValue};
						$.utility('setSessionData',progressBarObj,"progressBarObj");
						target.setProgress(targetValue);
						callback(pagedef, ui, action, eventinitpagedef, true);
					}
					else {
						callback(pagedef, ui, action, eventinitpagedef, false);	
					}

				}else if(target.getViewType()=='Calendar'){
					if($.utility('verifyFullDate',targetValue) != "invalid date"){
						target.setValue(targetValue);
						callback(pagedef, ui, action, eventinitpagedef, true);
					}else
						callback(pagedef, ui, action, eventinitpagedef, false);
				}else if (target.getViewType()=='Picker'){
					var flag = false;
					var rows = [];
					var valueArray = targetValue.split(",");
					if($('#'+target.getId()).find(' .pickerTable tr')){	// Picker...
						if($('#'+target.getId()).find("table").length === valueArray.length){
							$('#'+target.getId()).find("table").each(function(k, table){
								flag = false;
								var valueToSet = valueArray[k];
								$(table).find('tr').each(function(i,row){
									$(row).removeClass('activeRow');
									if($(row).attr('val') != undefined && $(row).attr('val') == valueToSet){
										///$(row).addClass('activeRow');
										rows.push(row);
										flag = true;
										return false;
									}
								});
								if(!flag){
									return false;
								}
							});
							if(!flag){
								callback(pagedef, ui, action, eventinitpagedef, false);
							}else{
								for(var j= 0; j < rows.length; j++){
									$(rows[j]).addClass('activeRow');
								}
								target.setValue(targetValue);
								target.triggerEvent();
								callback(pagedef, ui, action, eventinitpagedef, true);	
							}
							
						}else{
							callback(pagedef, ui, action, eventinitpagedef, false)
						}
					}
				}else if(target.getViewType() =='Segment'){
					var id = target.findItemId(targetValue);
					if(id != undefined){
						$("#"+id).trigger("tap");
						callback(pagedef, ui, action, eventinitpagedef, true)
					}else{
						callback(pagedef, ui, action, eventinitpagedef, false);
					}
				}else if(target.getViewType() ==='Radio'){
					target.setValue(targetValue);
					callback(pagedef, ui, action, eventinitpagedef, true);
				}else if(target.getViewType() ==='SoundBox'){
					target.setValue(targetValue);
					callback(pagedef, ui, action, eventinitpagedef, true);
				}else if(target.getViewType() ==='VideoBox'){
					target.setValue(targetValue);
					callback(pagedef, ui, action, eventinitpagedef, true);
				}else if(target.getViewType() ==='ComboBox'){
					target.setValue(targetValue);
					callback(pagedef, ui, action, eventinitpagedef, true);
				}else if(target.getViewType() ==='LinkLabel'){//Bug #8895 fix
					target.setValue(targetValue);
					callback(pagedef, ui, action, eventinitpagedef, true);
				}
				else
					callback(pagedef, ui, action, eventinitpagedef, false);
			}
			action['params']['value'] = temActionValue;
		};
		
		
		var Calculate = function(){
			if($.isEmptyObject(target)){
				callback(pagedef, ui, action, eventinitpagedef, false);
				return;
			}else if(target.getViewType() === "Indicator" || target.getViewType() === "ImageButton"){
 				callback(pagedef, ui, action, eventinitpagedef, false);
 				return;
			}
			else{
				action['params']['value'] = action['params']['value'].toString().replace("%2B", "+").replace("%2D", "-");
				var formula = action['params']['value'];
				var chunks = formula.split("[");
				for (var i = 0; i < chunks.length; i++) {
					if (chunks[i].indexOf("]") != -1){
						var j=chunks[i].indexOf("]");
						var org="[" + chunks[i].substring(0,j) + "]";
						var fin='';
						if(eventinitpagedef!== undefined){
							fin = org;
							fin = fin.replace('[','').replace(']', '').replace(' ','');
							
							if(eventinitpagedef['type'] == 'BaseView' || eventinitpagedef['type'] == 'ScrollView'){
								$.each(eventinitpagedef['children'], function(i, child){
									if(child['name']== fin)
										fin=child['value'];
								});
								if(eventinitpagedef['toolbartop'] != undefined && eventinitpagedef['toolbarbottom'] != undefined){
									$.each(eventinitpagedef['toolbartop']['children'], function(i, child){
										if(child['name']== fin)
											fin=child['value'];
									});
									$.each(eventinitpagedef['toolbarbottom']['children'], function(i, child){
										if(child['name']== fin)
											fin=child['value'];
									});
								}
								if(eventinitpagedef['toolbarleft'] != undefined){
									$.each(eventinitpagedef['toolbarleft']['children'], function(i, child){
										if(child['name']== fin)
											fin=child['value'];
									});
								}
	
							}else {
								if(eventinitpagedef['type'] === "RemoteTableViewList" || eventinitpagedef['type'] === "DBTableViewList" ){
									if(ui != undefined && ui['rownum'] != undefined){
										$.each(eventinitpagedef['data']['contents'][ui['rownum']], function(key, value){
											if(key== fin){
												fin=value;
											}
										});
									}
									
									if(eventinitpagedef['toolbartop'] != undefined && eventinitpagedef['toolbarbottom'] != undefined){
										$.each(eventinitpagedef['toolbartop']['children'], function(i, child){
											if(child['name']== fin)
												fin=child['value'];
										});
										$.each(eventinitpagedef['toolbarbottom']['children'], function(i, child){
											if(child['name']== fin)
												fin=child['value'];
										});
									}
									if(eventinitpagedef['toolbarleft'] != undefined){
										$.each(eventinitpagedef['toolbarleft']['children'], function(i, child){
											if(child['name']== fin)
												fin=child['value'];
										});
									}
								}else{
									$.each(eventinitpagedef['data']['contents'], function(i, contents){
										$.each(contents, function(key, value){
											if(key== fin){
												fin=value;
											}
										});
									});
									$.each(eventinitpagedef['children'][0]['group'][0]['row'], function(i, row){
										$.each(row['children'], function(j, child){
											if(child['name']== fin){
												fin=child['value'];
											}
										});
									});
									if(eventinitpagedef['toolbartop'] != undefined && eventinitpagedef['toolbarbottom'] != undefined){
										$.each(eventinitpagedef['toolbartop']['children'], function(i, child){
											if(child['name']== fin)
												fin=child['value'];
										});
										$.each(eventinitpagedef['toolbarbottom']['children'], function(i, child){
											if(child['name']== fin)
												fin=child['value'];
										});
									}
									if(eventinitpagedef['toolbarleft'] != undefined){
										$.each(eventinitpagedef['toolbarleft']['children'], function(i, child){
											if(child['name']== fin)
												fin=child['value'];
										});
									}
								}
							}
						}else {
							
							var temp = org;
							temp = temp.replace('[','').replace(']', '').replace(' ','');
							fin=$.utility('CheckAndGetUIElementValue',$("[name='"+temp+"']"),temp, pagedef);
						}

						if(fin=="Ã·")
							fin=fin.replace("Ã·", "/");	
						else{
							if(fin != undefined && fin.length == 0) 	fin = 0; 	// for Calculation, there must be some initial value. But still handling this case.
							if(fin == undefined) 	fin = 0;
							if(fin != undefined &&!isNaN(fin))
								fin = parseFloat(fin);
						}
						formula=formula.replace(org,fin);
					}	
				}
				
				try {
					if(formula.indexOf('^') != -1){
					    var formulaArr = formula.split("^");
					    var base = formulaArr[0];
					    var exponent = formulaArr[1];
					    formula= Math.pow(base, exponent);
					}
					else
					    formula=eval(formula.toString());
				}
				catch(err) {
					formula="0";
					return callback(pagedef, ui, action, eventinitpagedef, false);
				}
				formula = formula.toString();
				if(!isNaN(formula)){
					var roundf;
					if(formula.indexOf('.') > -1){
						roundf = (Math.round(formula * 100000)/100000).toString();			//As per new requirements, roundup the decimal part of 'formula' upto 5 digits.(31/05/2019)
						formula = Number.parseFloat(roundf).toFixed(5);
					}else if(formula.indexOf('e-') > -1){
						roundf = Number(formula).toPrecision(9);
						formula = Number.parseFloat(roundf).toFixed(5);
					}
				}else
					formula = "0";
				target.setValue(formula);
				
				$.utility('updateDataContents', target.getName(), target.getValue(), pagedef, target);
				$.utility("updateChildrenData", pagedef, target.getName(), target.getValue());
				callback(pagedef, ui, action, eventinitpagedef, true);
			}
		};
		
		var AppendText = function(){	
			var fin;
			var targetValue='';
			action['params']['value'] = $.utility('checkGlobalVariable', action['params']['value']);
			var flag = $.errorhandler('checkTargetUIObject',target, action['params'], action);
			if(!flag){
				callback(pagedef, ui, action, eventinitpagedef, flag);
				return _action;
			}
		
			if(!$.isEmptyObject(target)){
				if(action['params']['value'].indexOf("[")!=-1 && action['params']['value'].indexOf("]")!=-1 ){
					
					fin=action['params']['value'].replace("[", "");
					fin=fin.replace("]", "");
					if(eventinitpagedef!== undefined){
						$.each(eventinitpagedef['children'], function(i, child){
							if(child['name']== fin)
								targetValue=child['value'];
						});
						if(eventinitpagedef['toolbartop'] != undefined && eventinitpagedef['toolbarbottom'] != undefined){
							$.each(eventinitpagedef['toolbartop']['children'], function(i, child){
								if(child['name']== fin)
									targetValue=child['value'];
							});
							$.each(eventinitpagedef['toolbarbottom']['children'], function(i, child){
								if(child['name']== fin)
									targetValue=child['value'];
							});
						}
						if(eventinitpagedef['toolbarleft'] != undefined){
							$.each(eventinitpagedef['toolbarleft']['children'], function(i, child){
								if(child['name']== fin)
									targetValue=child['value'];
							});
						}
					}else{
						
						targetValue=$.utility('tokenizeString',action['params']['value'],pagedef,action);
						
						// now Check for SplitCSV Data..
						if((targetValue == undefined || targetValue=="") && ($.utility('GetCSVData').length > 0)){
							var csvDataArray = $.utility('GetCSVData');
							var chunks = action['params']['value'].split("[");
							for ( var i = 0; i < chunks.length; i++) {
								if (chunks[i].indexOf("]") != -1) {
									var j = chunks[i].indexOf("]");
									var org = "[" + chunks[i].substring(0, j) + "]";
									for(var object in csvDataArray){
										if(chunks[i].substring(0, j).indexOf("-") != -1){
											var finArray = chunks[i].substring(0, j).split("-");
											if(csvDataArray[object]['prefix'] === finArray[0]){
												// Iterate through inner Array...
												for(var data in csvDataArray[object]['rowData']){
													if(finArray[1] === data){
														targetValue = targetValue + "" +csvDataArray[object]['rowData'][data].replace('"','').replace('"','');
													}
												}
											}
										}
									}
								}
							}
						}
					}		
				}else
					targetValue=action['params']['value'];
				
				$('#'+target.getId()).each(function(){
					if(target.getViewType()=='TextField' || target.getViewType()=='NumericField'|| target.getViewType()=='TextArea')
						target.setValue($(this).val()+targetValue);
					else if(target.getViewType()=='Label')
						target.setValue($(this).text()+targetValue);
					else{
 						var attrText = $(this).attr('text');
 						var targetText = $(this).text();
 						if(attrText === undefined && targetText === '')
 							callback(pagedef, ui, action, eventinitpagedef, false);
 						else
 							target.setValue($(this).text()+targetValue);
 					}
				});
				
				$.utility('updateDataContents', target.getName(), target.getValue(), pagedef, target);
				$.utility("updateChildrenData", pagedef, target.getName(), target.getValue());
				
				callback(pagedef, ui, action, eventinitpagedef, true);
				
			}else 	
				callback(pagedef, ui, action, eventinitpagedef, false);
		};
		
		var ClearText = function(){	
			if($.isEmptyObject(target)){
				callback(pagedef, ui, action, eventinitpagedef, false);
				
			}else{
				if(target.getViewType()=='TextField' || target.getViewType()=='NumericField' || target.getViewType()=='TextArea'){
					target.setValue("");
					$('#'+target.getId()).val("");
				}else if(target.getViewType()=='TextButton'){
					target.setValue("");
				}else if(target.getViewType()==='Indicator' || target.getViewType()=='ComboBox' || target.getViewType()=='ImageButton'){					
					return callback(pagedef, ui, action, eventinitpagedef, false);
				}else if(target.getViewType()==='SearchBar' ){	// Bug #12459 fix			
					target.setValue("");
				}else{				
					if($('#'+target.getId()).length == 0){
						setTimeout(function(){
							target.setValue("");
							$('#'+target.getId()).text("");
						},500);
					}else{
						target.setValue("");
						$('#'+target.getId()).text("");
					}	
				}
				callback(pagedef, ui, action, eventinitpagedef, true);
			}
		};

		var DeleteLastOneCharacter = function(){
			if($.isEmptyObject(target)){
				callback(pagedef, ui, action, eventinitpagedef, false);
				return;
			}else{
				$('#'+target.getId()).each(function(){
					if(target.getViewType()=='TextField' || target.getViewType()=='NumericField' || target.getViewType()=='TextArea'){
						target.setValue($(this).val().substring(0,$(this).val().length - 1));
					}else{
						target.setValue($(this).text().substring(0,$(this).text().length - 1));
					}
					callback(pagedef, ui, action, eventinitpagedef, true);
				});
			}
		};	

		var combineToCsv = function(){
			if(action['params']['prefix'] =="" || action['params']['result'] == "" ){
				callback(pagedef, ui, action, eventinitpagedef, false);

			}else{
				var initialCSVArray=$.utility('getCombinedCSV');
				if(initialCSVArray.length!=0){
					var bool = false;
					$.each(initialCSVArray, function(i, csvElement){
						if(csvElement.csvResultHeader==action['params']['result']){
							initialCSVArray.splice(i,1);
							bool = true; 
							//break;
						}
					});
				}

				var pageChildren=$.mobileweb.getCurrentPage().children;
				var csvValue="";
				var csvValueArr = [];
				var csvArray=[];
				csvArray.csvResultHeader=action['params']['result'];
				csvArray.prefix=action['params']['prefix'];
				var j= 0;
				var flag = false;
				$.each(pageChildren, function(i, child){
					if(child.getName().substr(0,child.getName().indexOf("-"))==action['params']['prefix']){
						csvValueArr[j]={};
						var test = child.getName().substring(child.getName().indexOf("-")+1,child.getName().length);
						csvValueArr[j]['number'] = child.getName().substring(child.getName().indexOf("-")+1,child.getName().length);
						csvValueArr[j]['value'] = child.getValue();
						j++;
					}
				});
				
				csvValueArr.sort(function(obj1, obj2){
					return obj1['number'] - obj2['number'];
				});
				for(var i = 0; i < csvValueArr.length; i++){
					if(i!=0){
						csvValue=csvValue+","+"\""+csvValueArr[i]['value']+"\"";	
					}else{
						csvValue=csvValue+"\""+csvValueArr[i]['value']+"\"";
					}
					flag = true;
				}

				csvArray.value=csvValue;
				$.utility('setCombinedCSV',csvArray );
				$.each(pageChildren, function(i, child){
					if(child.getName().toString().replace("[","").replace("]","")==action['params']['result']){
						if(child.getViewType()=='TextField' || child.getViewType()=='NumericField'||child.getViewType()=='TextArea'){
							$('#'+child.getId()).val(csvValue);
							child.setValue(csvValue);
						}
						else{
							$('#'+child.getId()).text(csvValue);
						}
					}
				});

				if(!flag){
					callback(pagedef, ui, action, eventinitpagedef, false);
				}
				else {
					callback(pagedef, ui, action, eventinitpagedef, true);
				}
			}

		};	
		
		var SplitCSV = function(){
			var j = 0;
			var childCSV = [];
			var prefix = action['params']['prefix'];
			var rowData = action['params']['csvrowdata'];
			if(prefix == "" || rowData == "" ){
				callback(pagedef, ui, action, eventinitpagedef, false);
			}else {
				var bool = $.utility('SetCSVData', prefix, rowData, pagedef);
				if (!bool){
					callback(pagedef, ui, action, eventinitpagedef, false);
				}else{	// when bool is true..
					var CSVData = $.utility('GetCSVData');
					// find elements in a page with prefix.. and set value respectively..
					var pageChildren=$.mobileweb.getCurrentPage().children;
					$.each(pageChildren, function(i, child){
						if(child.getName().substr(0,child.getName().indexOf("-"))==CSVData[0]['prefix']){
							//var tempIndex = child.getName().substr(child.getName().indexOf('-') + 1,child.getName().length);
								childCSV[j] = child;
								j++;
						}
					});
					if(childCSV.length == CSVData[0]['rowData'].length){
						for(j = 0; j< childCSV.length; j++){
							var tempIndex = childCSV[j].getName().substr(childCSV[j].getName().indexOf('-') + 1,childCSV[j].getName().length);	
							childCSV[j].setValue(CSVData[0]['rowData'][tempIndex]);
						}
						callback(pagedef, ui, action, eventinitpagedef, true);
					}else{
						callback(pagedef, ui, action, eventinitpagedef, false);
					}
					
				}
			}
		};
		
		var StrToHex = function(){

			var tempTargetValue = '';
			action['params']['value'] = $.utility('checkGlobalVariable', action['params']['value']);
			if(action['name'].toLowerCase() === 'where' || action['name'].toLowerCase() === 'sort'){
				var pagename = action['params']['targetpage'];
				var pageobj = $.utility('getObject',$.mobileweb['pages'],'name',pagename);
				if((pageobj != undefined) && ((pageobj['type'] != 'BaseView') || (pageobj['type'] != 'ScrollView'))){
					//Special Case : Sort and Where Cond on database
					if(action['name'].toLowerCase() === 'where')
						pageobj['data']['wherecond'] = action['params']['value'];

					if(action['name'].toLowerCase() === 'sort')
						pageobj['data']['order'] = action['params']['value'].replace("=",' ').replace("'",'');

					pageobj['data']['updated'] = false;
					callback(pagedef, ui, action, eventinitpagedef, true);
				}else{
					callback(pagedef, ui, action, eventinitpagedef, false);
				}
			}
			else {
				var fin;
				var targetValue=null;
				
				if(action['params']['value'].indexOf("[")!=-1 && action['params']['value'].indexOf("]")!=-1 ){
					fin=action['params']['value'].replace("[", "");
					fin=fin.replace("]", "");
					if(eventinitpagedef!== undefined){
						tempTargetValue =  action['params']['value'];
						var chunks = action['params']['value'].split("[");

						for ( var i = 0; i < chunks.length; i++) {
							
							if (chunks[i].toString().indexOf("]") != -1) {
								var j = chunks[i].indexOf("]");
								var org = "[" + chunks[i].substring(0, j) + "]";

								fin=chunks[i].substring(0, j);
								if(eventinitpagedef['type'] == 'BaseView' || eventinitpagedef['type'] == 'ScrollView'){
									$.each(eventinitpagedef['children'], function(i, child){
										if(child['name']== fin){
											tempTargetValue=tempTargetValue.replace(org, child['value']);
											targetValue = tempTargetValue;
										}

									});
									if(eventinitpagedef['toolbartop'] != undefined && eventinitpagedef['toolbarbottom'] != undefined){
										$.each(eventinitpagedef['toolbartop']['children'], function(i, child){
											if(child['name']== fin){
												tempTargetValue=tempTargetValue.replace(org, child['value']);
												targetValue = tempTargetValue;
											}
										});
										$.each(eventinitpagedef['toolbarbottom']['children'], function(i, child){
											if(child['name']== fin){
												tempTargetValue=tempTargetValue.replace(org, child['value']);
												targetValue = tempTargetValue;
											}
										});
									}
									if(eventinitpagedef['toolbarleft'] != undefined){
										$.each(eventinitpagedef['toolbarleft']['children'], function(i, child){
											if(child['name']== fin){
												tempTargetValue=tempTargetValue.replace(org, child['value']);
												targetValue = tempTargetValue;
											}
										});
									}
									if(eventinitpagedef['data'] != undefined && eventinitpagedef['data']['contents'] != undefined){
										if(eventinitpagedef['data']['contents'].constructor == Array){
											$.each(eventinitpagedef['data']['contents'], function(key, content){
												$.each(content, function(childKey, value){
													if(childKey== fin){
														tempTargetValue=tempTargetValue.replace(org, value);
														targetValue = tempTargetValue;
													}
												});

											});
										}else{
											$.each(eventinitpagedef['data']['contents'], function(key, value){
													if(key== fin){
														tempTargetValue=tempTargetValue.replace(org, value);
														targetValue = tempTargetValue;
													}
											});
										}
									}
									
									if(targetValue === null){
										tempTargetValue = tempTargetValue.replace(org, $.utility('tokenizeString',org,pagedef, action));
										targetValue = tempTargetValue;
									}

								}else {
									if(eventinitpagedef['type'] === "RemoteTableViewList" || eventinitpagedef['type'] === "DBTableViewList" ){
										if(ui['rownum'] != undefined){
											$.each(eventinitpagedef['data']['contents'][ui['rownum']], function(key, value){
												if(key== fin){
													tempTargetValue=tempTargetValue.replace(org, value);
													targetValue = tempTargetValue;
												}
											});
										}else{
										 var rownum = ui.getName().substring(ui.getName().lastIndexOf("-") + 1,ui.getName().length);
										 $.each(eventinitpagedef['data']['contents'][rownum], function(key, value){
												if(key== fin){
													tempTargetValue=tempTargetValue.replace(org, value);
													targetValue = tempTargetValue;
												}
											});
										}

										if(eventinitpagedef['toolbartop'] != undefined && eventinitpagedef['toolbarbottom'] != undefined){
											$.each(eventinitpagedef['toolbartop']['children'], function(i, child){
												if(child['name']== fin){
													tempTargetValue=tempTargetValue.replace(org, child['value']);
													targetValue = tempTargetValue;
												}
											});
											$.each(eventinitpagedef['toolbarbottom']['children'], function(i, child){
												if(child['name']== fin){
													tempTargetValue=tempTargetValue.replace(org, child['value']);
													targetValue = tempTargetValue;
												}
											});
										}
										if(eventinitpagedef['toolbarleft'] != undefined){
											$.each(eventinitpagedef['toolbarleft']['children'], function(i, child){
												if(child['name']== fin){
													tempTargetValue=tempTargetValue.replace(org, child['value']);
													targetValue = tempTargetValue;
												}
											});
										}
									}else{
										$.each(eventinitpagedef['data']['contents'], function(i, contents){
											$.each(contents, function(key, value){
												if(key== fin){
													tempTargetValue=tempTargetValue.replace(org, value);
													targetValue = tempTargetValue;
												}
											});

										});
										if(eventinitpagedef['toolbartop'] != undefined && eventinitpagedef['toolbarbottom'] != undefined){
											$.each(eventinitpagedef['toolbartop']['children'], function(i, child){
												if(child['name']== fin){
													tempTargetValue=tempTargetValue.replace(org, child['value']);
													targetValue = tempTargetValue;	
												}
											});
											$.each(eventinitpagedef['toolbarbottom']['children'], function(i, child){
												if(child['name']== fin){
													tempTargetValue=tempTargetValue.replace(org, child['value']);
													targetValue = tempTargetValue;
												}
											});
										}
										if(eventinitpagedef['toolbarleft'] != undefined){
											$.each(eventinitpagedef['toolbarleft']['children'], function(i, child){
												if(child['name']== fin){
													tempTargetValue=tempTargetValue.replace(org, child['value']);
													targetValue = tempTargetValue;
												}
											});
										}
									}

								}
							}
						}

					}else{
						if(pagedef['type'] === "RemoteTableViewList" || pagedef['type'] === "DBTableViewList" ){
							if(ui['rownum'] != undefined){
								$.each(pagedef['data']['contents'][ui['rownum']], function(key, value){
									if(key== fin){
										targetValue=value;
									}
								});
							}
							
							if(pagedef['toolbartop'] != undefined && pagedef['toolbarbottom'] != undefined){
								$.each(pagedef['toolbartop']['children'], function(i, child){
									if(child['name']== fin)
										targetValue=child['value'];
								});
								$.each(pagedef['toolbarbottom']['children'], function(i, child){
									if(child['name']== fin)
										targetValue=child['value'];
								});
							}
							if(pagedef['toolbarleft'] != undefined){
								$.each(pagedef['toolbarleft']['children'], function(i, child){
									if(child['name']== fin)
										targetValue=child['value'];
								});
							}
						}else if(pagedef['type'] == 'BaseView' || pagedef['type'] == 'ScrollView'){
							targetValue=$.utility('tokenizeString',action['params']['value'],pagedef, action);
						}else{
							$.each(pagedef['data']['contents'], function(i, contents){
								$.each(contents, function(key, value){
									if(key== fin){
										targetValue=value;
									}
								});
							});
							
							if(pagedef['toolbartop'] != undefined && pagedef['toolbarbottom'] != undefined){
								$.each(pagedef['toolbartop']['children'], function(i, child){
									if(child['name']== fin)
										targetValue=child['value'];
								});
								$.each(pagedef['toolbarbottom']['children'], function(i, child){
									if(child['name']== fin)
										targetValue=child['value'];
								});
							}
							if(pagedef['toolbarleft'] != undefined){
								$.each(pagedef['toolbarleft']['children'], function(i, child){
									if(child['name']== fin)
										targetValue=child['value'];
								});
							}
						}
						
						// now Check for SplitCSV Data..
						if((targetValue == undefined || targetValue=="") && ($.utility('GetCSVData').length > 0)){
							var csvDataArray = $.utility('GetCSVData');
							var chunks = action['params']['value'].split("[");
							for ( var i =0; i < chunks.length; i++) {
								if (chunks[i].indexOf("]") != -1) {
									var j = chunks[i].indexOf("]");
									var org = "[" + chunks[i].substring(0, j) + "]";
									for(var object in csvDataArray){
										if(chunks[i].substring(0, j).indexOf("-") != -1){
											var finArray = chunks[i].substring(0, j).split("-");
											if(csvDataArray[object]['prefix'] === finArray[0]){
												// Iterate through inner Array...
												for(var data in csvDataArray[object]['rowData']){
													if(finArray[1] === data){
														targetValue = targetValue + "" +csvDataArray[object]['rowData'][data].replace('"','').replace('"','');
													}
												}
											}
										}
									}
								}
							}
						}
					}

				}else{
					targetValue=$.utility('tokenizeString',action['params']['value'],pagedef, action);
				}
				if(targetValue.indexOf("@@") != -1 || targetValue.indexOf(/@@/gi) != -1){
					targetValue=$.utility('tokenizeString',action['params']['value'],pagedef, action);
				}
				var hex = '';
				for(var i=0;i<targetValue.toString().length;i++) {
			        hex += ''+targetValue.charCodeAt(i).toString(16);
			    }
			    
				targetValue = hex;
				$.utility('updateDataContents', target.getName(), targetValue, pagedef, target);
				if(target.getViewType()=='TextField' || target.getViewType()=='NumericField' || target.getViewType()=='Label' || target.getViewType()=='TextArea'){
					if(targetValue !== undefined){
						target.setValue(targetValue);
						callback(pagedef, ui, action, eventinitpagedef, true);
					}
						
				}else if(target.getViewType()=='Image'){
					$('#' + target.getId()).attr('src',$.utility('getImage', targetValue));
					callback(pagedef, ui, action, eventinitpagedef, true);
				}else if(target.getViewType()=='WebView'){
					target.setValue(targetValue);
					callback(pagedef, ui, action, eventinitpagedef, true);
				}else if(target.getViewType()=='CheckBox'){
					targetValue = targetValue.toLowerCase();
					if((targetValue === "false") || (targetValue === "off") || (targetValue == "0")  || (targetValue == "no")){
						$('#'+target.getId()+target.getName()).attr('checked',false);
						$('#'+target.getId()+target.getName()).change();
						target.parseValue(targetValue);
						callback(pagedef, ui, action, eventinitpagedef, true);
					}else if((targetValue === "on") || (targetValue === "true") || (targetValue == "1")  || (targetValue == "yes")){
						$('#'+target.getId()+target.getName()).attr('checked',true);
						$('#'+target.getId()+target.getName()).change();
						target.parseValue(targetValue);
						callback(pagedef, ui, action, eventinitpagedef, true);
					}else{
						callback(pagedef, ui, action, eventinitpagedef, false);
					}

				}else if(target.getViewType()=='ToggleButton'){
					var tempValue = targetValue.toLowerCase();
					if(tempValue == "on" || tempValue == "1"|| tempValue == "true" || tempValue == "yes" || tempValue == "off" || tempValue == "0"|| tempValue == "false" || tempValue == "no"){
						target.setValue(tempValue);
						callback(pagedef, ui, action, eventinitpagedef, true);
					}
					else {
						callback(pagedef, ui, action, eventinitpagedef, false);
					}
				}else if(target.getViewType()=='RoundButton' || target.getViewType()=='TextButton'){
					target.setValue(targetValue);
					callback(pagedef, ui, action, eventinitpagedef, true);
				}else if(target.getViewType()=='SwitchBar'){
					targetValue = targetValue.toLowerCase();
					if(targetValue == 'true' || targetValue == 'false' || targetValue == '1' || targetValue == '0' || targetValue == 'on' || targetValue == 'off' || targetValue == 'yes' || targetValue == 'no'){
						target.setSelected(targetValue);
						callback(pagedef, ui, action, eventinitpagedef, true);
					}
					else
						callback(pagedef, ui, action, eventinitpagedef, false);
				}else if(target.getViewType()=='Slider'){
					if(!isNaN(targetValue)){
						$('#'+target.getId()+'>input').attr('value', targetValue);
						$('#'+target.getId()+'>input').slider("refresh");
						callback(pagedef, ui, action, eventinitpagedef, true);
						target.triggerEvent();
					}
					else {
						callback(pagedef, ui, action, eventinitpagedef, false);
					}
				}else if(target.getViewType()=='GoogleMap'){
					if(targetValue === ""){
						// fire error event..
						callback(pagedef, ui, action, eventinitpagedef, false);
					}

					$.GMapService('setMapLocation',action['params'], targetValue, target, action, pagedef, ui);
				}
				else if(target.getViewType()=='ProgressBar'){
					if(!isNaN(targetValue)){
						$("#"+target.getId()+">").css({'width':action['params']['value']});
						callback(pagedef, ui, action, eventinitpagedef, true);
					}
					else {
						callback(pagedef, ui, action, eventinitpagedef, false);	
					}

				}else if (target.getViewType()=='Picker') {
					var flag = false;
					var rows = [];
					var valueArray = targetValue.split(",");
					if($('#'+target.getId()).find(' .pickerTable tr')){	// Picker...
						if($('#'+target.getId()).find("table").length === valueArray.length){
							$('#'+target.getId()).find("table").each(function(k, table){
								flag = false;
								var valueToSet = valueArray[k];
								$(table).find('tr').each(function(i,row){
									$(row).removeClass('activeRow');
									if($(row).attr('val') != undefined && $(row).attr('val') == valueToSet){
										///$(row).addClass('activeRow');
										rows.push(row);
										flag = true;
										return false;
									}
								});
								if(!flag){
									return false;
								}
							});
							if(!flag){
								callback(pagedef, ui, action, eventinitpagedef, false);
							}else{
								for(var j= 0; j < rows.length; j++){
									$(rows[j]).addClass('activeRow');
								}
								target.setValue(targetValue);
								target.triggerEvent();
								callback(pagedef, ui, action, eventinitpagedef, true);	
							}
							
						}else{
							callback(pagedef, ui, action, eventinitpagedef, false)
						}
					}
				}else if(target.getViewType() =='Segment'){
					var id = target.findItemId(targetValue);
					if(id != undefined){
						$("#"+id).trigger("tap");
						callback(pagedef, ui, action, eventinitpagedef, true)
					}else{
						callback(pagedef, ui, action, eventinitpagedef, false);
					}
				}else if(target.getViewType() ==='Radio'){
					target.setValue(targetValue);
					callback(pagedef, ui, action, eventinitpagedef, true);
				}else if(target.getViewType() ==='SoundBox'){
					target.setValue(targetValue);
					callback(pagedef, ui, action, eventinitpagedef, true);
				}else if(target.getViewType() ==='VideoBox'){
					target.setValue(targetValue);
					callback(pagedef, ui, action, eventinitpagedef, true);
				}else if(target.getViewType() ==='ComboBox'){
					target.setValue(targetValue);
					callback(pagedef, ui, action, eventinitpagedef, true);
				}else
					callback(pagedef, ui, action, eventinitpagedef, false);
			}
		}
		
		var HexToStr = function(){

			var tempTargetValue = '';
			action['params']['value'] = $.utility('checkGlobalVariable', action['params']['value']);
			if(action['name'].toLowerCase() === 'where' || action['name'].toLowerCase() === 'sort'){
				var pagename = action['params']['targetpage'];
				var pageobj = $.utility('getObject',$.mobileweb['pages'],'name',pagename);
				if((pageobj != undefined) && ((pageobj['type'] != 'BaseView') || (pageobj['type'] != 'ScrollView'))){
					//Special Case : Sort and Where Cond on database
					if(action['name'].toLowerCase() === 'where')
						pageobj['data']['wherecond'] = action['params']['value'];

					if(action['name'].toLowerCase() === 'sort')
						pageobj['data']['order'] = action['params']['value'].replace("=",' ').replace("'",'');

					pageobj['data']['updated'] = false;
					callback(pagedef, ui, action, eventinitpagedef, true);
				}else{
					callback(pagedef, ui, action, eventinitpagedef, false);
				}
			}
			else {
				var fin;
				var targetValue=null;
				
				if(action['params']['value'].indexOf("[")!=-1 && action['params']['value'].indexOf("]")!=-1 ){
					fin=action['params']['value'].replace("[", "");
					fin=fin.replace("]", "");
					if(eventinitpagedef!== undefined){
						tempTargetValue =  action['params']['value'];
						var chunks = action['params']['value'].split("[");

						for ( var i = 0; i < chunks.length; i++) {
							
							if (chunks[i].toString().indexOf("]") != -1) {
								var j = chunks[i].indexOf("]");
								var org = "[" + chunks[i].substring(0, j) + "]";

								fin=chunks[i].substring(0, j);
								if(eventinitpagedef['type'] == 'BaseView' || eventinitpagedef['type'] == 'ScrollView'){
									$.each(eventinitpagedef['children'], function(i, child){
										if(child['name']== fin){
											tempTargetValue=tempTargetValue.replace(org, child['value']);
											targetValue = tempTargetValue;
										}

									});
									if(eventinitpagedef['toolbartop'] != undefined && eventinitpagedef['toolbarbottom'] != undefined){
										$.each(eventinitpagedef['toolbartop']['children'], function(i, child){
											if(child['name']== fin){
												tempTargetValue=tempTargetValue.replace(org, child['value']);
												targetValue = tempTargetValue;
											}
										});
										$.each(eventinitpagedef['toolbarbottom']['children'], function(i, child){
											if(child['name']== fin){
												tempTargetValue=tempTargetValue.replace(org, child['value']);
												targetValue = tempTargetValue;
											}
										});
									}
									if(eventinitpagedef['toolbarleft'] != undefined){
										$.each(eventinitpagedef['toolbarleft']['children'], function(i, child){
											if(child['name']== fin){
												tempTargetValue=tempTargetValue.replace(org, child['value']);
												targetValue = tempTargetValue;
											}
										});
									}
									if(eventinitpagedef['data'] != undefined && eventinitpagedef['data']['contents'] != undefined){
										if(eventinitpagedef['data']['contents'].constructor == Array){
											$.each(eventinitpagedef['data']['contents'], function(key, content){
												$.each(content, function(childKey, value){
													if(childKey== fin){
														tempTargetValue=tempTargetValue.replace(org, value);
														targetValue = tempTargetValue;
													}
												});

											});
										}else{
											$.each(eventinitpagedef['data']['contents'], function(key, value){
												if(key== fin){
													tempTargetValue=tempTargetValue.replace(org, value);
													targetValue = tempTargetValue;
												}
											});
										}
									}
									
									if(targetValue === null){
										tempTargetValue = tempTargetValue.replace(org, $.utility('tokenizeString',org,pagedef, action));
										targetValue = tempTargetValue;
									}

								}else {
									if(eventinitpagedef['type'] === "RemoteTableViewList" || eventinitpagedef['type'] === "DBTableViewList" ){
										if(ui['rownum'] != undefined){
											$.each(eventinitpagedef['data']['contents'][ui['rownum']], function(key, value){
												if(key== fin){
													tempTargetValue=tempTargetValue.replace(org, value);
													targetValue = tempTargetValue;
												}
											});
										}else{
										 var rownum = ui.getName().substring(ui.getName().lastIndexOf("-") + 1,ui.getName().length);
										 $.each(eventinitpagedef['data']['contents'][rownum], function(key, value){
												if(key== fin){
													tempTargetValue=tempTargetValue.replace(org, value);
													targetValue = tempTargetValue;
												}
											});
										}

										if(eventinitpagedef['toolbartop'] != undefined && eventinitpagedef['toolbarbottom'] != undefined){
											$.each(eventinitpagedef['toolbartop']['children'], function(i, child){
												if(child['name']== fin){
													tempTargetValue=tempTargetValue.replace(org, child['value']);
													targetValue = tempTargetValue;
												}
											});
											$.each(eventinitpagedef['toolbarbottom']['children'], function(i, child){
												if(child['name']== fin){
													tempTargetValue=tempTargetValue.replace(org, child['value']);
													targetValue = tempTargetValue;
												}
											});
										}
										if(eventinitpagedef['toolbarleft'] != undefined){
											$.each(eventinitpagedef['toolbarleft']['children'], function(i, child){
												if(child['name']== fin){
													tempTargetValue=tempTargetValue.replace(org, child['value']);
													targetValue = tempTargetValue;
												}
											});
										}
									}else{
										$.each(eventinitpagedef['data']['contents'], function(i, contents){
											$.each(contents, function(key, value){
												if(key== fin){
													tempTargetValue=tempTargetValue.replace(org, value);
													targetValue = tempTargetValue;
												}
											});

										});
										if(eventinitpagedef['toolbartop'] != undefined && eventinitpagedef['toolbarbottom'] != undefined){
											$.each(eventinitpagedef['toolbartop']['children'], function(i, child){
												if(child['name']== fin){
													tempTargetValue=tempTargetValue.replace(org, child['value']);
													targetValue = tempTargetValue;	
												}

											});
											$.each(eventinitpagedef['toolbarbottom']['children'], function(i, child){
												if(child['name']== fin){
													tempTargetValue=tempTargetValue.replace(org, child['value']);
													targetValue = tempTargetValue;
												}
											});
										}
										if(eventinitpagedef['toolbarleft'] != undefined){
											$.each(eventinitpagedef['toolbarleft']['children'], function(i, child){
												if(child['name']== fin){
													tempTargetValue=tempTargetValue.replace(org, child['value']);
													targetValue = tempTargetValue;
												}
											});
										}
									}

								}
							}
						}

					}else{
						if(pagedef['type'] === "RemoteTableViewList" || pagedef['type'] === "DBTableViewList" ){
							if(ui['rownum'] != undefined){
								$.each(pagedef['data']['contents'][ui['rownum']], function(key, value){
									if(key== fin){
										targetValue=value;
									}
								});
							}
							
							if(pagedef['toolbartop'] != undefined && pagedef['toolbarbottom'] != undefined){
								$.each(pagedef['toolbartop']['children'], function(i, child){
									if(child['name']== fin)
										targetValue=child['value'];
								});
								$.each(pagedef['toolbarbottom']['children'], function(i, child){
									if(child['name']== fin)
										targetValue=child['value'];
								});
							}
							if(pagedef['toolbarleft'] != undefined){
								$.each(pagedef['toolbarleft']['children'], function(i, child){
									if(child['name']== fin)
										targetValue=child['value'];
								});
							}
						}else if(pagedef['type'] == 'BaseView' || pagedef['type'] == 'ScrollView'){
							targetValue=$.utility('tokenizeString',action['params']['value'],pagedef, action);
						}else{
							$.each(pagedef['data']['contents'], function(i, contents){
								$.each(contents, function(key, value){
									if(key== fin){
										targetValue=value;
									}
								});

							});
							if(pagedef['toolbartop'] != undefined && pagedef['toolbarbottom'] != undefined){
								$.each(pagedef['toolbartop']['children'], function(i, child){
									if(child['name']== fin)
										targetValue=child['value'];
								});
								$.each(pagedef['toolbarbottom']['children'], function(i, child){
									if(child['name']== fin)
										targetValue=child['value'];
								});
							}
							if(pagedef['toolbarleft'] != undefined){
								$.each(pagedef['toolbarleft']['children'], function(i, child){
									if(child['name']== fin)
										targetValue=child['value'];
								});
							}
						}
						
						// now Check for SplitCSV Data..
						if((targetValue == undefined || targetValue=="") && ($.utility('GetCSVData').length > 0)){
							var csvDataArray = $.utility('GetCSVData');
							var chunks = action['params']['value'].split("[");
							for ( var i =0; i < chunks.length; i++) {
								if (chunks[i].indexOf("]") != -1) {
									var j = chunks[i].indexOf("]");
									var org = "[" + chunks[i].substring(0, j) + "]";
									for(var object in csvDataArray){
										if(chunks[i].substring(0, j).indexOf("-") != -1){
											var finArray = chunks[i].substring(0, j).split("-");
											if(csvDataArray[object]['prefix'] === finArray[0]){
												// Iterate through inner Array...
												for(var data in csvDataArray[object]['rowData']){
													if(finArray[1] === data){
														targetValue = targetValue + "" +csvDataArray[object]['rowData'][data].replace('"','').replace('"','');
													}
												}
											}
										}
									}
								}
							}
						}
					}

				}else{
					targetValue=$.utility('tokenizeString',action['params']['value'],pagedef, action);
				}
				if(targetValue.indexOf("@@") != -1 || targetValue.indexOf(/@@/gi) != -1){
					targetValue=$.utility('tokenizeString',action['params']['value'],pagedef, action);
				}
			    var str = '';
			    for (var i = 0; i < targetValue.length; i += 2)
			        str += String.fromCharCode(parseInt(targetValue.substr(i, 2), 16));
			    targetValue = str;
				$.utility('updateDataContents', target.getName(), targetValue, pagedef, target);
				$.utility("updateChildrenData", pagedef, target.getName(), targetValue);
				if(target.getViewType()=='TextField' || target.getViewType()=='NumericField' || target.getViewType()=='Label' || target.getViewType()=='TextArea'){
					if(targetValue !== undefined){
						target.setValue(targetValue);
						callback(pagedef, ui, action, eventinitpagedef, true);
					}
						
				}else if(target.getViewType()=='Image'){
					$('#' + target.getId()).attr('src',$.utility('getImage', targetValue));
					callback(pagedef, ui, action, eventinitpagedef, true);
				}else if(target.getViewType()=='WebView'){
					target.setValue(targetValue);
					callback(pagedef, ui, action, eventinitpagedef, true);
				}else if(target.getViewType()=='CheckBox'){
					targetValue = targetValue.toLowerCase();
					if((targetValue === "false") || (targetValue === "off") || (targetValue == "0")  || (targetValue == "no")){
						$('#'+target.getId()+target.getName()).attr('checked',false);
						$('#'+target.getId()+target.getName()).change();
						target.parseValue(targetValue);
						callback(pagedef, ui, action, eventinitpagedef, true);
					}else if((targetValue === "on") || (targetValue === "true") || (targetValue == "1")  || (targetValue == "yes")){
						$('#'+target.getId()+target.getName()).attr('checked',true);
						$('#'+target.getId()+target.getName()).change();
						target.parseValue(targetValue);
						callback(pagedef, ui, action, eventinitpagedef, true);
					}else{
						callback(pagedef, ui, action, eventinitpagedef, false);
					}

				}else if(target.getViewType()=='ToggleButton'){
					var tempValue = targetValue.toLowerCase();
					if(tempValue == "on" || tempValue == "1"|| tempValue == "true" || tempValue == "yes" || tempValue == "off" || tempValue == "0"|| tempValue == "false" || tempValue == "no"){
						target.setValue(tempValue);
						callback(pagedef, ui, action, eventinitpagedef, true);
					}
					else {
						callback(pagedef, ui, action, eventinitpagedef, false);
					}
				}else if(target.getViewType()=='RoundButton' || target.getViewType()=='TextButton'){
					target.setValue(targetValue);
					callback(pagedef, ui, action, eventinitpagedef, true);
				}else if(target.getViewType()=='SwitchBar'){
					targetValue = targetValue.toLowerCase();
					if(targetValue == 'true' || targetValue == 'false' || targetValue == '1' || targetValue == '0' || targetValue == 'on' || targetValue == 'off' || targetValue == 'yes' || targetValue == 'no'){
						target.setSelected(targetValue);
						callback(pagedef, ui, action, eventinitpagedef, true);
					}
					else
						callback(pagedef, ui, action, eventinitpagedef, false);
				}else if(target.getViewType()=='Slider'){
					if(!isNaN(targetValue)){
						$('#'+target.getId()+'>input').attr('value', targetValue);
						$('#'+target.getId()+'>input').slider("refresh");
						callback(pagedef, ui, action, eventinitpagedef, true);
						target.triggerEvent();
					}
					else {
						callback(pagedef, ui, action, eventinitpagedef, false);
					}
				}else if(target.getViewType()=='GoogleMap'){
					if(targetValue === ""){
						// fire error event..
						callback(pagedef, ui, action, eventinitpagedef, false);
					}

					$.GMapService('setMapLocation',action['params'], targetValue, target, action, pagedef, ui);
				}
				else if(target.getViewType()=='ProgressBar'){
					if(!isNaN(targetValue)){
						$("#"+target.getId()+">").css({'width':action['params']['value']});
						callback(pagedef, ui, action, eventinitpagedef, true);
					}
					else {
						callback(pagedef, ui, action, eventinitpagedef, false);	
					}

				}else if (target.getViewType()=='Picker') {
					var flag = false;
					var rows = [];
					var valueArray = targetValue.split(",");
					if($('#'+target.getId()).find(' .pickerTable tr')){	// Picker...
						if($('#'+target.getId()).find("table").length === valueArray.length){
							$('#'+target.getId()).find("table").each(function(k, table){
								flag = false;
								var valueToSet = valueArray[k];
								$(table).find('tr').each(function(i,row){
									$(row).removeClass('activeRow');
									if($(row).attr('val') != undefined && $(row).attr('val') == valueToSet){
										rows.push(row);
										flag = true;
										return false;
									}
								});
								if(!flag){
									return false;
								}
							});
							if(!flag){
								callback(pagedef, ui, action, eventinitpagedef, false);
							}else{
								for(var j= 0; j < rows.length; j++){
									$(rows[j]).addClass('activeRow');
								}
								target.setValue(targetValue);
								target.triggerEvent();
								callback(pagedef, ui, action, eventinitpagedef, true);	
							}
							
						}else{
							callback(pagedef, ui, action, eventinitpagedef, false)
						}
					}
				}else if(target.getViewType() =='Segment'){
					var id = target.findItemId(targetValue);
					if(id != undefined){
						$("#"+id).trigger("tap");
						callback(pagedef, ui, action, eventinitpagedef, true)
					}else{
						callback(pagedef, ui, action, eventinitpagedef, false);
					}
				}else if(target.getViewType() ==='Radio'){
					target.setValue(targetValue);
					callback(pagedef, ui, action, eventinitpagedef, true);
				}else if(target.getViewType() ==='SoundBox'){
					target.setValue(targetValue);
					callback(pagedef, ui, action, eventinitpagedef, true);
				}else if(target.getViewType() ==='VideoBox'){
					target.setValue(targetValue);
					callback(pagedef, ui, action, eventinitpagedef, true);
				}else if(target.getViewType() ==='ComboBox'){
					target.setValue(targetValue);
					callback(pagedef, ui, action, eventinitpagedef, true);
				}else
					callback(pagedef, ui, action, eventinitpagedef, false);
			}
		
		}
		
		return _action;
	};
	
		
	function MediaAction(pagedef, ui, action, eventinitpagedef, target, callback){
		var _action = {};
		_action.execute = function(){
			if(action['params'] === undefined) 
				var params = {}; 
			else 
				var params = action['params'];
				
			var flag='';
			if((action['method']!="stopRecord") && (action['method']!="record") && (action['method']!="stopRecord") && action['method']!="QRScanner" && action['method']!="DownloadFile" && action['method']!="DownloadMedia" && action['method']!="SaveMedia" && action['method']!="UploadFile" && !(action['method'] =="OpenGallery" && action['params']['multiple'])){
				flag= $.errorhandler('checkTargetUIObject',target, params, action);
				if(!flag){
					callback(pagedef, ui, action, eventinitpagedef, flag);
					return _action;
				}
			}
			// This if need to be refactored
			if(action['method']!="stopRecord" && action['method']!="record" && action['method']!="TakePhoto" && action['method']!="SwitchCamera" && action['method']!="QRScanner" && action['method']!="OpenGallery" && action['method']!="UploadMedia" && action['method']!="DownloadMedia" && action['method']!="SaveMedia" && action['method'] !="OpenGalleryVideo"){
				if(!$.isEmptyObject(target)){
					if(target.getViewType() != undefined || target.getViewType() != ""){			
						if(target.getViewType() === "SoundBox" || target.getViewType() === "VideoBox"){
							// Do Nothing
						}
					}else{
						callback(pagedef, ui, action, eventinitpagedef, flag);
						return _action;
					}
				}
			}
			
			switch(action['method']){
				case 'play':
					play();
					break;
				case 'pause':
					pause();
					if(flag) callback(pagedef, ui, action, eventinitpagedef, flag);
					break;
				case 'stopPlay':
					stopPlay();
					if(flag) callback(pagedef, ui, action, eventinitpagedef, flag);
					break;
				case 'slowPlay':
					slowPlay();
					if(flag) callback(pagedef, ui, action, eventinitpagedef, flag);
					break;
				case 'slowReversePlay':
					slowReversePlay();
					if(flag) callback(pagedef, ui, action, eventinitpagedef, flag);
					break;
				case 'fastPlay':
					fastPlay();
					if(flag) callback(pagedef, ui, action, eventinitpagedef, flag);
					break;
				case 'fastReversePlay':
					fastReversePlay();
					if(flag) callback(pagedef, ui, action, eventinitpagedef, flag);
					break;
				case 'fastForward':
					fastForward();
					if(flag) callback(pagedef, ui, action, eventinitpagedef, flag);
					break;
				case 'fastBackward':
					fastBackward();
					if(flag) callback(pagedef, ui, action, eventinitpagedef, flag);
					break;
				case 'PlaySE':
					playSE(pagedef);
					break;
				case 'record':
					record();
					break;
				case 'stopRecord':
					stopRecord();
					break;
				case 'SwitchCamera':
					SwitchCamera();
					break;
				case 'TakePhoto':
					//Creatng script for take photo..
					var script = document.createElement('script');
					if($.mobileweb['state'] == 'preview')
						script.src  = '/mobileweb/resources/js/canvas2image.js';
					else script.src  = 'js/canvas2image.js';
					script.type = 'text/javascript';
					$('head').append(script);
					script.onload = TakePhoto();
					break;
				case 'QRScanner':
					if(action['params']['type'] === "Barcode")
						BarcodeScanner();
					else
						QRScanner();
					break;
				case 'QRGenerate':
					QRGenerate();
					break;
				case 'OpenGallery':
					if(action['params']['multiple'])
						MultipleOpenGallery();
					else if(action['params']['type'] == 'video')
						OpenGalleryVideo();
					else
						OpenGallery();
					break;
				case 'UploadFile':
					UploadFile();
					break;
				case 'UploadMedia':
					if(action['params']['type'] == 'sound')
						UploadAudio();
					else						
						UploadMedia();
					break;
				case 'DownloadMedia':
					DownloadMedia();
					break;
				case 'DownloadFile':
					DownloadFile();
					break;
				case 'SaveMedia':
					var iosMobile = (/iPhone|iPad|iPod/i.test(navigator.userAgent)) ? true : false;
		 			if(iosMobile){
		 				var msg_en="Images will be opened into new tab. Please save from there.";
					   	var msg_ja="";
						var alert_Title="Save Media Limitation";
					   	$.errorhandler('messageBox', msg_en, msg_ja, alert_Title);
					   	if($.browser.safari )
					   		SaveMedia();
					   	else{
					   	 	$('#cancelMessage').bind('click touchstart tap',function(){
						   		SaveMedia();
								return false; 
							});
					   	}
		 			}else
		 				SaveMedia();
					break;
				case 'ShareVia':
					ShareVia();
					break;	
				default:
					callback(pagedef, ui, action, eventinitpagedef, false);
					break;
			}
			
		};
		

		var play = function(){
			if((!jQuery.isEmptyObject($('#'+target.getId()+'>audio'))) && (target.getViewType() === "SoundBox")){
				var audioParent = $('#'+target.getId()).get(0);
				$(audioParent).attr('val',1);
				$('#'+target.getId()).find('.audioPlayer_play').addClass('hidden');
				$('#'+target.getId()).find('.audioPlayer_pause').removeClass('hidden');
				$('#'+target.getId()+'>audio')[0].addEventListener("ended", function(){
					callback(pagedef, ui, action, eventinitpagedef, true);
				});
				
				var audioPromise = $('#'+target.getId()+'>audio')[0].play();
			  	// In browsers that donâ€™t yet support this functionality, 'Promise' wonâ€™t be defined.
			   	if (audioPromise !== undefined) {
			   		audioPromise.then(function() {
			   			//console.log('---- Automatic playback started! ----');
			  	    }).catch(function(error) {
			  	    	//console.log('---- Automatic playback failed. Use the Play button instead. ----');
			  	    	callback(pagedef, ui, action, eventinitpagedef, false);
			  	    });
			    }
			   	
			}else{
				//document.getElementById(target.getId()).play();
				
				if ($('#'+target.getId()).attr("pause") != undefined) {
			
					var vidPromise = document.getElementById(target.getId()).play();
					// In browsers that donâ€™t yet support this functionality, 'Promise' wonâ€™t be defined.
					if (vidPromise !== undefined) {
					    vidPromise.then(function() {
					    	//console.log('---- Automatic playback started! ----');
					    }).catch(function(error) {
					    	//console.log('---- Automatic playback failed. Use the Play button instead. ----');
					    	callback(pagedef, ui, action, eventinitpagedef, false);
					    });
					}
				}
				else{
					if ($('#'+target.getId()) != undefined && target.getViewType() == "VideoBox") {
						$("#"+target.getId()+' source')[0].src = $('video source')[0].src.replace("https","http");
						$("#"+target.getId())[0].src = $('video source')[0].src.replace("https","http");
						
						var vidPromise = document.getElementById(target.getId()).play();
						// In browsers that donâ€™t yet support this functionality, 'Promise' wonâ€™t be defined.
						if (vidPromise !== undefined) {
						    vidPromise.then(function() {
						    	//console.log('---- Automatic playback started! ----');
						    }).catch(function(error) {
						    	//console.log('---- Automatic playback failed. Use the Play button instead. ----');
						    	callback(pagedef, ui, action, eventinitpagedef, false);
						    });
						}
					}else
						callback(pagedef, ui, action, eventinitpagedef, false);
				}
			}
		};
			
		var pause = function(){
			if((!jQuery.isEmptyObject($('#'+target.getId()+'>audio'))) && (target.getViewType() === "SoundBox")){
				$('#'+target.getId()).find('.audioPlayer_play').removeClass('hidden');
				$('#'+target.getId()).find('.audioPlayer_pause').addClass('hidden');
				$('#'+target.getId()+'>audio')[0].pause();
			}else document.getElementById(target.getId()).pause();
		};
		
		var stopPlay = function(){
			if(target.getViewType() === "SoundBox"){
				if(!jQuery.isEmptyObject($('#'+target.getId()+'>audio'))){
					$('#'+target.getId()).find('.audioPlayer_play').removeClass('hidden');
					$('#'+target.getId()).find('.audioPlayer_pause').addClass('hidden');
					$('#'+target.getId()+'>audio')[0].pause();
					$('#'+target.getId()+'>audio')[0].currentTime=0;
				}
			}else{
				document.getElementById(target.getId()).pause();
				document.getElementById(target.getId()).currentTime=0;
				target.stopPlay();
			}
		};
			
		var slowPlay = function(){
			document.getElementById(target.getId()).playbackRate=0.5;
		};
		var slowReversePlay = function(){
			play();
			document.getElementById(target.getId()).playbackRate=-0.5;
		};
		var fastPlay = function(){
			document.getElementById(target.getId()).playbackRate=2.0;
		};
		var fastReversePlay = function(){
			play();
			document.getElementById(target.getId()).playbackRate=-2.0;
		};
		var fastForward = function(){
			document.getElementById(target.getId()).currentTime=document.getElementById(target.getId()).currentTime + 10.0;
			play();
		};
		var fastBackward = function(){
			document.getElementById(target.getId()).currentTime=document.getElementById(target.getId()).currentTime - 10.0;
			play();
		};
		
		var playSE = function(pagedef){
			var audioElement = document.createElement('audio');
			if (/iPad|iPhone|iPod/.test(navigator.userAgent))//#Bug 12771 fix
			    audioElement.autoplay = true;
			if(action['params']['status']=="bundle")
				audioElement.setAttribute('src', $.utility('getSoundEffect',action['params']['filename'], pagedef));
			else if(action['params']['status']=="url"){
 				var fullpath;
 				if(action['params']['url'] === "")
 					fullpath = action['params']['filename'];
 				else
 					fullpath = action['params']['url']+'/'+action['params']['filename'];
 				if(fullpath.indexOf('[') != -1 && fullpath.indexOf(']') != -1)
 					audioElement.setAttribute('src', $.utility('getSoundEffect', fullpath, pagedef));
 				else
 					audioElement.setAttribute('src', fullpath);
 			}
			else if(action['params']['status']=="remoteFile")
				audioElement.setAttribute('src', action['params']['url']+'/'+action['params']['filename']);
			audioElement.onloadeddata = function(){
				var playPromise = audioElement.play();
				// In browsers that don't yet support this functionality, playPromise wonâ€™t be defined.
				if (playPromise !== undefined) {
					playPromise.then(function() {
				        //console.log('---- Automatic playback started! ----');
				    }).catch(function(error) {
				    	console.log('---- Automatic playback failed. Use the Play button instead. ----');
				    	callback(pagedef, ui, action, eventinitpagedef, false);
				  	});
				}
			}
			audioElement.onended = function(){
				callback(pagedef, ui, action, eventinitpagedef, true);
			}
			audioElement.onerror = function(){
				callback(pagedef, ui, action, eventinitpagedef, false);
			}
		};

		var record = function(){
			if($.isEmptyObject(target))
 				callback(pagedef, ui, action, eventinitpagedef, false);
 			else{
 				target.initRecording();
 				callback(pagedef, ui, action, eventinitpagedef, true);
 			}
		};
		
		var stopRecord = function(){
			if($.isEmptyObject(target))
 				callback(pagedef, ui, action, eventinitpagedef, false);
 			else{
 				target.stopRecording();
 				callback(pagedef, ui, action, eventinitpagedef, true);
 			}
		};
		

		var SwitchCamera = function(){
			if(target.getViewType() === "Camera"){
				target.setSide(action['params']['side']);	
				callback(pagedef, ui, action, eventinitpagedef, true);
			}else{
				callback(pagedef, ui, action, eventinitpagedef, false);
			}
			
		};
		
		var TakePhoto = function(){

			var tempCanvas;
			var canvasContext;
			var videoTag;
			var img = new Image();
			var watermark;
			var photoquality;
			var scaledImage;
			var _left = 20;
			var _top = 20;
			var _textAlign = "left"; 
			
			if(action['params']['watermarkType'] != undefined && action['params']['watermarkType'] == "text"){
				if(action['params']['watermarkText'] != undefined){
					if($.utility('containsGlobalVariable', action['params']['watermarkText']))
						watermark = $.utility('checkGlobalVariable', action['params']['watermarkText']);
					else
						watermark = $.utility('tokenizeString',action['params']['watermarkText'], pagedef);
				}
			}else if(action['params']['watermarkType'] != undefined && action['params']['watermarkType'] == "image"){
				if(action['params']['watermarkImage'] != undefined){
					if(action['params']['source'] == "remoteFile")
						watermark = $.utility('getRemoteImage',$.utility('tokenizeString',action['params']['watermarkImage'],pagedef));
					else if(action['params']['source'] == "url")
						watermark = $.utility('tokenizeString',action['params']['watermarkImage'],pagedef);
					else
						watermark = $.utility('getImage',$.utility('tokenizeString',action['params']['watermarkImage'],pagedef));
				}
			}else{
				if(action['params']['watermark'] != undefined){
					if($.utility('containsGlobalVariable', action['params']['watermark']))
						watermark = $.utility('checkGlobalVariable', action['params']['watermark']);
					else
						watermark = $.utility('tokenizeString',action['params']['watermark'], pagedef);
				}
			}
			
			function setWatermark(params,wctx,wcanvas,ctxWidth,ctxHeight,callback){
				var _watermarkImageWidth = ctxWidth;
				var _watermarkImageHeight = ctxHeight;
				var imgHeight;
				var imgWidth;
				if(img.naturalHeight == 0 || img.naturalWidth == 0){
					imgHeight = ctxHeight;
					imgWidth = ctxWidth;
				}else{
					imgHeight = img.naturalHeight;
					imgWidth = img.naturalWidth;
				}
				if(action['params']['watermarkType'] == "image"){
					_watermarkImageWidth = ctxWidth * (action['params']['watermarkImageWidth'] / 100);
					_watermarkImageHeight = ctxHeight * (action['params']['watermarkImageHeight'] / 100);
				}
				if(action['params']['watermarkPosition'] != undefined){
					switch(action['params']['watermarkPosition']){
						case 'Top-Left': 
							_textAlign  = "left";
							break;
						case 'Top-Center': 
							_left = imgWidth /2;
							if(action['params']['watermarkType'] == "image")
								_left = _left - (_watermarkImageWidth/2);
							_textAlign  = "center";
							break;
						case 'Top-Right':
							_left = imgWidth - 20;
							if(action['params']['watermarkType'] == "image")
								_left = _left - _watermarkImageWidth;
							_textAlign  = "right";
							break;
						case 'Bottom-Left':
							_top = imgHeight - 20;
							if(action['params']['watermarkType'] == "image")
								_top = _top - _watermarkImageHeight;
							wctx.textAlign  = "left";
							break;
						case 'Bottom-Center':
							_top = imgHeight - 20;
							_left = imgWidth /2;
							if(action['params']['watermarkType'] == "image"){
								_top = _top - _watermarkImageHeight;
								_left = _left - (_watermarkImageWidth/2);
							}
							_textAlign  = "center";
							break;
						case 'Bottom-Right':
							_top = imgHeight - 20;
							_left = imgWidth - 20;
							if(action['params']['watermarkType'] == "image"){
								_top = _top - _watermarkImageHeight;
								_left = _left - _watermarkImageWidth;
							}
							_textAlign  = "right";
							break;
						default :
							break;
					}
				}
				if(action['params']['watermarkType'] == "text"){
					wctx.textAlign = _textAlign;
					var textFont = "24px system";
					wctx.font = textFont;
					var gradient = wctx.createLinearGradient(0, 0, wcanvas.width, 0);
					if(action['params']['watermarkTextColor'] != undefined){
						var colorStr = 'rgba('+action['params']['watermarkTextColor']['red']+','+action['params']['watermarkTextColor']['green']+','+action['params']['watermarkTextColor']['blue']+',1)';
						gradient.addColorStop("1.0",colorStr);
					}
					wctx.fillStyle = gradient;
					wctx.fillText(watermark, _left, _top);
					callback();
				}else if(action['params']['watermarkType'] == "image"){
					var img2 = new Image();
					img2.src = watermark;
						img2.onload = function () {
					        wctx.drawImage(img2,_left,_top,_watermarkImageWidth,_watermarkImageHeight);
					        img.src = wcanvas.toDataURL('image/jpeg');
					        callback();
					    }
				}
				
			}
			
			if($($("[name='"+target.getName()+ "']")).is('img')){
				img.src = $("#"+target.getId()).get(0).src;
				setImageSrc(img);
			}
			else{
				if($($("[id='"+target.getId()+"_canvas"+ "']")).is('img')){
					img.src = $("#"+target.getId()+"_canvas").get(0).src;
					
					var c = document.createElement("Canvas");
					var ctx = c.getContext("2d");
					c.width = img.naturalWidth;
					c.height = img.naturalHeight;
					ctx.drawImage(img, 0, 0); 
					
					if(watermark != undefined && watermark != ""){
						setWatermark(action['params'],ctx,c,c.width,c.height,function(){
							if(action['params']['photoquality'] != undefined){
								photoquality = $.utility('tokenizeString',action['params']['photoquality'], pagedef);
								if(photoquality == "low")
									img.src = c.toDataURL({'quality': 0.3 });
								else if(photoquality == "medium")
									img.src = c.toDataURL({'quality': 0.7 });
								else
									img.src = c.toDataURL('image/jpeg');
							}else
								img.src = c.toDataURL('image/jpeg');
							setImageSrc(img);
						});
					}else{
						if(action['params']['photoquality'] != undefined){
							photoquality = $.utility('tokenizeString',action['params']['photoquality'], pagedef);
							if(photoquality == "low")
								img.src = c.toDataURL({'quality': 0.3 });
							else if(photoquality == "medium")
								img.src = c.toDataURL({'quality': 0.7 });
							else
								img.src = c.toDataURL('image/jpeg');
						}else
							img.src = c.toDataURL('image/jpeg');
						setImageSrc(img);
					}
					
					
				}
				else{ 
					var cameraId;
					if(target.getId() != undefined)
						cameraId = target.getId();
					else
						cameraId = ui.getId();
					
					if($("body").find("#"+cameraId+"_canvas").length == 0){
						tempCanvas=document.createElement("canvas");
						tempCanvas.setAttribute("id", cameraId+"_canvas");
						tempCanvas.setAttribute("width",$("#"+cameraId).attr("width"));
						tempCanvas.setAttribute("height",$("#"+cameraId).attr("height"));
						tempCanvas.setAttribute("style","top:"+$("#"+cameraId).position().top+"px;left:"+$("#"+cameraId).position().left+"px; position:absolute;visibility:hidden");
						$(".scroller").append(tempCanvas);

					}else 
						tempCanvas = $("#"+cameraId+"_canvas").get(0);
	
					canvasContext = tempCanvas.getContext("2d");
					videoTag = document.getElementById(cameraId);
					tempCanvas.width = videoTag.clientWidth;
					tempCanvas.height = videoTag.clientHeight;
					canvasContext.drawImage(videoTag, 0, 0,tempCanvas.width, tempCanvas.height);
					
					if(watermark != undefined && watermark != ""){
						setWatermark(action['params'],canvasContext,tempCanvas,tempCanvas.width,tempCanvas.height,function(){
							if(action['params']['photoquality'] != undefined){
								photoquality = $.utility('tokenizeString',action['params']['photoquality'], pagedef);
								if(photoquality == "low")
									tempCanvas.toDataURL({'quality': 0.3 });
								else if(photoquality == "medium")
									tempCanvas.toDataURL({'quality': 0.7 });
							}
							img = Canvas2Image.convertToImage(tempCanvas, videoTag.width, videoTag.height, "jpeg");
							target.pause();
							setImageSrc(img);
						});
					}else{
						if(action['params']['photoquality'] != undefined){
							photoquality = $.utility('tokenizeString',action['params']['photoquality'], pagedef);
							if(photoquality == "low")
								tempCanvas.toDataURL({'quality': 0.3 });
							else if(photoquality == "medium")
								tempCanvas.toDataURL({'quality': 0.7 });
						}
						img = Canvas2Image.convertToImage(tempCanvas, videoTag.width, videoTag.height, "jpeg");
						target.pause();
						setImageSrc(img);
					}
				}
			}
			
			function setImageSrc(img){
				if(action['params']['library'] === "RemoteDB"){
					//console.log(img.src);
					
					$.utility('initCall');
					var timer =	setInterval(function(){
						if($.utility('appendDeviceInfo') != "" || $.utility('appendDeviceInfo') != null){
							clearInterval(timer);
							
							var imageName = "mobilous_" + new Date().getTime() + ".jpg";
							var requestUrl = "";
							if($.utility('getServerPort') == "8080") {
								
								requestUrl = $.mobileweb['baseurl'] + "/mobileweb/mobile/uploadImage?baseURL="+$.mobileweb['baseurl'] + $.utility('appendDeviceInfo') + "&os=mw&version="+ $.mobileweb['version'];
								requestUrl = requestUrl + "&mediaName="+ imageName;
								requestUrl = requestUrl + "&isThumbnail=false&isTargetMongo=true";

								$.ajax({
									url: requestUrl,
									type: "POST",
									data: img.src,
									processData: false,
									contentType :false,
									cache: false,
									success: function (resp) {
										try{
											resp = JSON.parse(resp);
										}catch(e){
											console.log(e);
										}
										$.utility('showLoadingIndicator', false);

										if(resp.ret === "ACK"){
											for(var key in resp.file){
												target.setMainValue(resp.file[key]);
												target.applyCameraEvents();
												callback(pagedef, ui, action, eventinitpagedef, true);
											}
										}else{
											callback(pagedef, ui, action, eventinitpagedef, false);
										}
									},
									error : function(err){
										$.utility('showLoadingIndicator', false);

										callback(pagedef, ui, action, eventinitpagedef, false);
									}
								});
							}else {
								
								requestUrl = $.mobileweb['baseurl'] + ":8181/commapi/commaction/llcommmedia/";
								var imageData = $.utility('fileSrctoBlob', img.src);
								
								var formData = new FormData();
								formData.append("ak",$.utility('appendDeviceInfo').replace("&ak=",""));
								formData.append("os","mw");
							    formData.append("version", $.mobileweb['version']);
							    formData.append("istargetmongo",1);
							    formData.append("file", imageData, imageName);
								
								if (formData) {
									$.ajax({
										url: requestUrl,
										type: "POST",
										crossDomain: true,
										data: formData,
										processData: false,
										contentType: false,
										async: true,
										success: function (resp) {
											try{
												resp = JSON.parse(resp);
											}catch(e){
												console.log(e);
											}										
		
											if(resp.ret === "ACK"){
												for(var key in resp.file){
													target.setMainValue(resp.file[key]);
													target.applyCameraEvents();
													callback(pagedef, ui, action, eventinitpagedef, true);
												}
											}else{
												callback(pagedef, ui, action, eventinitpagedef, false);
											}
										},
										error : function(err){
											callback(pagedef, ui, action, eventinitpagedef, false);
										},
										beforeSend: function(jqXHR, settings){
											$.utility('showLoadingIndicator', true);
							    		},
						                complete: function(jqXHR, textStatus){                	
						                	$.utility('showLoadingIndicator', false);
						                }
									});
								}
							}
	
						}

					},1000);

				}else if(action['params']['library'] === "Gallery" || action['params']['library'] === "Local" || action['params']['library'] === "Library"){// "Library" now deprecated, but keeping its reference for compability. Dated: 11-Apr-2018
					var imageName = "mobilous_" + new Date().getTime() + ".jpg";
					if($($("[id='"+target.getId()+"_canvas"+  "']")).is('img')){//Bug #11367 Fix
						$(".scroller").append($('<a/>', { href : img.src, id:ui.getId()+"_imagedownloadlink",download:imageName}));
						target.setMainValue(img.src);
					}else {
						var cameraId;
						if(target.getId() != undefined)
							cameraId = target.getId();
						else
							cameraId = ui.getId();
						var tmp_canvas = document.getElementById(cameraId+"_canvas");//Bug #11367 Fix
						var dataURL = tmp_canvas.toDataURL("image/jpeg");
						$(".scroller").append($('<a/>', { href : dataURL, id:ui.getId()+"_imagedownloadlink",download:imageName}));
						target.setMainValue(img.src);	
					}
					$("#"+ui.getId()+"_imagedownloadlink").click();
					$("#"+ui.getId()+"_imagedownloadlink").remove();
					target.applyCameraEvents();
					callback(pagedef, ui, action, eventinitpagedef, true);
				}
			}
			
		};
		
		var QRScanner = function(){
			//Adding Scripts
			var script1 = document.createElement('script');
			var script2 = document.createElement('script');
			script1.type = 'text/javascript';
			script2.type = 'text/javascript';
			if($.mobileweb['state'] == 'preview'){
				script1.src  = '/mobileweb/resources/js/qrlib/html5-qrcode.js';
				script2.src  = '/mobileweb/resources/js/qrlib/jsqrcode-combined.min.js';
			}
			else{
				script1.src  = 'js/qrlib/html5-qrcode.js';
				script2.src  = 'js/qrlib/jsqrcode-combined.min.js';
			}
			var flag = false;
			var script = document.getElementsByTagName('script');
			$.each(script, function(key, value){
				if(value.src == script1.src || value.src == script2.src){
					flag =true;
				}
			});
			
			if(!flag){
				$('head').append(script1);
				$('head').append(script2);
			}//
			$.blockUI({css: {top : '1%' , left: '0%', border:'0px solid #FFFFFF' ,backgroundColor:'#00FFFFFF'} ,
			     message:
					[
						'<div class="panel-body" >',
				        '<div class="well" style="position:absolute ; display: block;">',
				        '<div  style="width:100%;float:right;margin-top: 5px;margin-bottom: 5px;text-align: right;">',
				        '<img id="close" src = "/mobileweb/resources/images/system/toolbar-items/default/btn_cancel.png" width="20px" height:"40px" style = "display:block;">',
				        '</div>',
				        '<div id="qr-reader" style="width:' + document.documentElement.clientWidth + 'px;height:' + $('.bglayout').css('height') + '";margin-left: 30px;margin-right: 10px;"/>',// In reference of bug #12278
				        '<div class="scanner-laser laser-rightBottom" style="opacity: 0.5;"></div>',
				        '<div class="scanner-laser laser-rightTop" style="opacity: 0.5;"></div>',
				        '<div class="scanner-laser laser-leftBottom" style="opacity: 0.5;"></div>',
				        '<div class="scanner-laser laser-leftTop" style="opacity: 0.5;"></div>',
				        '</div>',
				        '</div>'
					].join('')
			});
			
			$('#close').attr('src',$.utility('getSystemImage', "btn_cancel.png",""));

			$('#close').on("tap", function(){
				$.unblockUI();
			});

 			setTimeout(function(){
 				var reader = $('#qr-reader'),
 				sl = $('.scanner-laser'),
 				si = $('#scanned-img');
 				var callbackTime = false;
 				reader.html5_qrcode(function(data){
 					console.log('html5_qrcode success :- ' + data);
					if(!$.isEmptyObject(target))
						target.setValue(data);
					$('#qr-reader').html5_qrcode_stop();	
					$.unblockUI();
					$('.ui-loader').css('display', 'none');
						
					callback(pagedef, ui, action, eventinitpagedef, true);
					callbackTime = true;
							
		        }, function(error){
					console.log('html5_qrcode error :- ' + error);
					setTimeout(function(){
						$('#qr-reader').html5_qrcode_stop();
						if(!callbackTime){							
							$.unblockUI();
							callback(pagedef, ui, action, eventinitpagedef, false);
							callbackTime = true;
						}
					},8000);
		        }, function(videoError){
		        	console.log('html5_qrcode videoError :- ' + videoError);
		        	$.unblockUI();
					callback(pagedef, ui, action, eventinitpagedef, false);
		        	//alert('Sorry, the browser you are using doesn\'t support getUserMedia');
		        }
		      );
 			},2000);
		};
		
		var BarcodeScanner = function(){
			$.blockUI({css: {top : '1%' , left: '0%', border:'0px solid #FFFFFF' ,backgroundColor:'#00FFFFFF'} ,
			     message:
					[
						'<div class="panel-body" >',
				        '<div class="well" style="position:absolute ; display: block;">',
				        '<div  style="width:100%;float:right;margin-top: 5px;margin-bottom: 5px;text-align: right;">',
				        '<img id="close" src = "/mobileweb/resources/images/system/toolbar-items/default/btn_cancel.png" width="20px" height:"40px" style = "display:block;">',
				        '</div>',
				        '<div id="scanner-container" style="width:' + document.documentElement.clientWidth + 'px;height:' + $('.bglayout').css('height') + '";margin-left: 30px;margin-right: 10px;"/>',// In reference of bug #12278
				        '<div class="scanner-laser laser-rightBottom" style="opacity: 0.5;"></div>',
				        '<div class="scanner-laser laser-rightTop" style="opacity: 0.5;"></div>',
				        '<div class="scanner-laser laser-leftBottom" style="opacity: 0.5;"></div>',
				        '<div class="scanner-laser laser-leftTop" style="opacity: 0.5;"></div>',
				        '</div>',
				        '</div>'
					].join('')
			});
			
			$('#close').attr('src',$.utility('getSystemImage', "btn_cancel.png",""));

			$('#close').on("tap", function(){
				if (_scannerIsRunning) {
                	Quagga.stop();
                }
				$.unblockUI();
			});

			//$('body').append("<div id='scanner-container'></div>");
			Quagga.init({
                inputStream: {
                    name: "Live",
                    type: "LiveStream",
                    target: document.querySelector('#scanner-container'),
                    constraints: {
                        width: 480,
                        height: 320,
                        facingMode: "environment"
                    },
                },
                decoder: {
                    readers: [
                        "code_128_reader",
                        "ean_reader",
                        "ean_8_reader",
                        "code_39_reader",
                        "code_39_vin_reader",
                        "codabar_reader",
                        "upc_reader",
                        "upc_e_reader",
                        "i2of5_reader"
                    ],
                    debug: {
                        showCanvas: true,
                        showPatches: true,
                        showFoundPatches: true,
                        showSkeleton: true,
                        showLabels: true,
                        showPatchLabels: true,
                        showRemainingPatchLabels: true,
                        boxFromPatches: {
                            showTransformed: true,
                            showTransformedBox: true,
                            showBB: true
                        }
                    }
                },

            }, function (err) {
                if (err) {
                    console.log(err);
                    callback(pagedef, ui, action, eventinitpagedef, false);
                    return
                }

                console.log("Initialization finished. Ready to start");
                Quagga.start();

                // Set flag to is running
                _scannerIsRunning = true;
            });

            Quagga.onProcessed(function (result) {
                var drawingCtx = Quagga.canvas.ctx.overlay,
                drawingCanvas = Quagga.canvas.dom.overlay;

                if (result) {
                    if (result.boxes) {
                        drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                        result.boxes.filter(function (box) {
                            return box !== result.box;
                        }).forEach(function (box) {
                            Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
                        });
                    }

                    if (result.box) {
                        Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
                    }

                    if (result.codeResult && result.codeResult.code) {
                        Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
                    }
                }
            });

            Quagga.onDetected(function (result) {
                console.log("Barcode detected and processed : [" + result.codeResult.code + "]", result);
                
                if(!$.isEmptyObject(target))
                	target.setValue(result.codeResult.code);
//                if (_scannerIsRunning) {
//                	Quagga.stop();
//                }	
                $.unblockUI();					
                callback(pagedef, ui, action, eventinitpagedef, true);
            });
        
		};
		
 		var QRGenerate = function(){
 			var viewtype = target.getViewType();
 			if(viewtype == "Image"){
 				if(target.getSource() != "QRview"){
 					callback(pagedef, ui, action, eventinitpagedef, false);
 					return;
 				}
 			}
			action['params']['value'] = $.utility('checkGlobalVariable', action['params']['value']);
			
			var qrvalue=null;
			if(action['params']['value'].indexOf("[")!=-1 && action['params']['value'].indexOf("]")!=-1 ){
				var fin = action['params']['value'].replace("[", "").replace("]", "");
				if(fin.indexOf("[") != -1 || fin.indexOf("]") != -1){
					callback(pagedef, ui, action, eventinitpagedef, false);
 					return;
				}
				
				var tempTargeValue ='';
				if(eventinitpagedef == undefined ){
					tempTargetValue = action['params']['value'];
					qrvalue = $.utility('CheckAndGetUIElementValue',$("[name='"+fin+ "']"), fin, pagedef);
				}else{
					if(pagedef['type'] == 'BaseView' || pagedef['type'] == 'ScrollView'){
						qrvalue=$.utility('tokenizeString',action['params']['value'],pagedef,action);
					}else{
						$.each(pagedef['data']['contents'], function(i, contents){
							$.each(contents, function(key, value){
								if(key== fin){
									qrvalue=value;
								}
							});
						});
						if(pagedef['toolbartop'] != undefined){
							$.each(pagedef['toolbartop']['children'], function(i, child){
								if(child['name']== fin)
									qrvalue=child['value'];
							});
						}
						if(pagedef['toolbarbottom'] != undefined){
							$.each(pagedef['toolbarbottom']['children'], function(i, child){
								if(child['name']== fin)
									qrvalue=child['value'];
							});
						}
						if(pagedef['toolbarleft'] != undefined){
							$.each(pagedef['toolbarleft']['children'], function(i, child){
								if(child['name']== fin)
									qrvalue=child['value'];
							});
						}
					}
				}
			}else
				qrvalue = $.utility("tokenizeString", action['params']['value'], pagedef, action);
			
			//In reference of bug #12313 
			$('#'+target.getId()).css({'position':'absolute', 'overflow': 'hidden', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center'});
			$('#'+target.getId()).css({'padding':'2px'});// Bug #12313 fix
			$('#'+target.getId()).empty();
			
			if(qrvalue){
				var _wid = $('#'+target.getId()).css('width').replace("px","");
				var _hei = $('#'+target.getId()).css('height').replace("px","");
				var len = (parseInt(_wid) < parseInt(_hei)) ? _wid : _hei;
				$('#'+target.getId()).qrcode({text:qrvalue, width:len, height:len});
				$('#'+target.getId() + ' > canvas' ).css({'margin':'auto'});
				$('#'+target.getId() + ' > canvas' ).get(0).id = target.getId() + '_canvas';
			
		    	callback(pagedef, ui, action, eventinitpagedef, true);
		    }else{
		    	callback(pagedef, ui, action, eventinitpagedef, false);
		    }
			
 		};
		
		var OpenGallery = function(){
			if ($("body").find("#openGallery_" + target.getId()).length > 0)
				$("#openGallery_" + target.getId()).remove();
			if ($("body").find("#openGallery_" + target.getId()).length == 0 ) {
				if(action['params']['type'] === "file"){
					var acceptheader = 'application/*';
					if(action['params']['filetype'] == "pdf")
						acceptheader = '.pdf';
					else if(action['params']['filetype'] == "document")
						acceptheader = '.doc, .docx';
					else if(action['params']['filetype'] == "excel")
						acceptheader = '.xlsx,.xls';
					else if(action['params']['filetype'] == "presentation")
						acceptheader = '.ppt, .pptx';
				
					if($("#openGallery_" + target.getId()).length == 0)
						$('body').append("<input id='openGallery_" + target.getId() + "' type='file' accept='"+acceptheader+"' hidden='true'></input>");
				}else{
					if($("#openGallery_" + target.getId()).length == 0)
						$('body').append("<input id='openGallery_" + target.getId() + "' type='file' accept='image/*' hidden='true'></input>");
				}
			}
			try{
				function formatBytes(bytes, decimals = 1) {
				    if (bytes === 0) return '0 Bytes';
				    return parseFloat((bytes / Math.pow(1000, 1)).toFixed(decimals));
				}
				$("#openGallery_" + target.getId()).off("change").on("change", function(){
					if ( /\.(jpe?g|png|gif)$/i.test(this.files[0].name) && $("#"+target.getId()).attr("src") != undefined ) {
						var reader  = new FileReader();
						var filename = this.files[0].name;				
						var fileSizeInKB = formatBytes(this.files[0].size);
						
						if(action['params']['fileNameUI'] != undefined && action['params']['fileNameUI'] != ""){
							var fileNameUI = action['params']['fileNameUI'].replace("[","").replace("]","");
							if($.mobileweb.getCurrentPage().getName() ===  pagedef['name'])
								new $.actions(pagedef, null, [{method:"SetMainValue",category:"MainValue", name:fileNameUI,params:{value:filename,targetpage:pagedef['name']}, events:[]}]).execute();
						}
						
						if(action['params']['fileSizeUI'] != undefined && action['params']['fileSizeUI'] != ""){
							var fileSizeUI = action['params']['fileSizeUI'].replace("[","").replace("]","");
							if($.mobileweb.getCurrentPage().getName() ===  pagedef['name'])
								new $.actions(pagedef, null, [{method:"SetMainValue",category:"MainValue", name:fileSizeUI,params:{value:fileSizeInKB.toString(),targetpage:pagedef['name']}, events:[]}]).execute();
						}
						
						reader.addEventListener("load", function () {
							target.setValue(reader.result);
							target.setImageName(filename);
							$("#"+target.getId()).attr("src", reader.result);
							$("#openGallery_" + target.getId()).remove();
							callback(pagedef, ui, action, eventinitpagedef, true);
						}, false);
						reader.readAsDataURL(this.files[0]);
//						$("#openGallery_" + target.getId()).remove();
//						callback(pagedef, ui, action, eventinitpagedef, true);
					}else if(action['params']['type'] != "image" && /\.(pdf|xls|xlsx|doc|docx|ppt|pptx|txt|mp4|3gp|mkv|avi|mpeg|mpg)$/i.test(this.files[0].name)){
						var reader  = new FileReader();
						var filename = this.files[0].name;
						$.utility("setFileObj",this.files[0],target.getName());
						var fileSizeInKB = formatBytes(this.files[0].size);
						
						if(action['params']['fileNameUI'] != undefined && action['params']['fileNameUI'] != ""){
							var fileNameUI = action['params']['fileNameUI'].replace("[","").replace("]","");
							if($.mobileweb.getCurrentPage().getName() ===  pagedef['name'])
								new $.actions(pagedef, null, [{method:"SetMainValue",category:"MainValue", name:fileNameUI,params:{value:filename,targetpage:pagedef['name']}, events:[]}]).execute();
						}
						
						if(action['params']['fileSizeUI'] != undefined && action['params']['fileSizeUI'] != ""){
							var fileSizeUI = action['params']['fileSizeUI'].replace("[","").replace("]","");
							if($.mobileweb.getCurrentPage().getName() ===  pagedef['name'])
								new $.actions(pagedef, null, [{method:"SetMainValue",category:"MainValue", name:fileSizeUI,params:{value:fileSizeInKB.toString(),targetpage:pagedef['name']}, events:[]}]).execute();
						}
						
						reader.addEventListener("load", function () {
							target.setValue(reader.result);
							//target.setImageName(filename);
							//$("#"+target.getId()).attr("src", reader.result);
							$("#openGallery_" + target.getId()).remove();
							callback(pagedef, ui, action, eventinitpagedef, true);
						}, false);
						reader.readAsDataURL(this.files[0]);
					}
					else{
						$.errorhandler('alertBox',"Selected file format is not supported.");
						$("#openGallery_" + target.getId()).remove();
						callback(pagedef, ui, action, eventinitpagedef, false);
					}
					
				});
				$("#openGallery_" + target.getId()).trigger("click");
			}catch(e){
				$("#openGallery_" + target.getId()).remove();
				callback(pagedef, ui, action, eventinitpagedef, false);
			}
		}
		
		var OpenGalleryVideo = function(){
			if ($("body").find("#openGallery_" + target.getId()).length > 0)
				$("#OpenGalleryVideo_" + target.getId()).remove();
			if ($("body").find("#OpenGalleryVideo_" + target.getId()).length == 0 ) {
				if(action['params']['type'] == "video"){
					acceptheader = '.mp4,.mkv,.mpeg,.mpg';
					if($("#OpenGalleryVideo_" + target.getId()).length == 0)
						$('body').append("<input id='OpenGalleryVideo_" + target.getId() + "' type='file' accept='"+acceptheader+"' hidden='true'></input>");
				}
			}
			try{
				function formatBytes(bytes, decimals = 1) {
				    if (bytes === 0) return '0 Bytes';
				    return parseFloat((bytes / Math.pow(1000, 1)).toFixed(decimals));
				}
				$("#OpenGalleryVideo_" + target.getId()).off("change").on("change", function(){
					if( /\.(mp4|mkv|mpeg)$/i.test(this.files[0].name)){
						var reader  = new FileReader();
						var filename = this.files[0].name;
						$.utility("setFileObj",this.files[0],target.getName());
						var fileSizeInKB = formatBytes(this.files[0].size);
						
						if(action['params']['fileNameUI'] != undefined && action['params']['fileNameUI'] != ""){
							var fileNameUI = action['params']['fileNameUI'].replace("[","").replace("]","");
							if($.mobileweb.getCurrentPage().getName() ===  pagedef['name'])
								new $.actions(pagedef, null, [{method:"SetMainValue",category:"MainValue", name:fileNameUI,params:{value:filename,targetpage:pagedef['name']}, events:[]}]).execute();
						}
						
						if(action['params']['fileSizeUI'] != undefined && action['params']['fileSizeUI'] != ""){
							var fileSizeUI = action['params']['fileSizeUI'].replace("[","").replace("]","");
							if($.mobileweb.getCurrentPage().getName() ===  pagedef['name'])
								new $.actions(pagedef, null, [{method:"SetMainValue",category:"MainValue", name:fileSizeUI,params:{value:fileSizeInKB.toString(),targetpage:pagedef['name']}, events:[]}]).execute();
						}
						reader.addEventListener("load", function () {
							target.setValue(reader.result);
							$("#OpenGalleryVideo_" + target.getId()).remove();
							callback(pagedef, ui, action, eventinitpagedef, true);
						}, false);
						reader.readAsDataURL(this.files[0]);
					}
					else{
						$.errorhandler('alertBox',"Selected file format is not supported.");
						$("#OpenGalleryVideo_" + target.getId()).remove();
						callback(pagedef, ui, action, eventinitpagedef, false);
					}
					
				});
				$("#OpenGalleryVideo_" + target.getId()).trigger("click");
			}catch(e){
				$("#OpenGalleryVideo_" + target.getId()).remove();
				callback(pagedef, ui, action, eventinitpagedef, false);
			}
		}
		
		var MultipleOpenGallery = function(){
			
			$('body').append("<input id='openGallery_multiple' type='file' accept='image/*' hidden='true' style='color: transparent;width: 100px' multiple></input>");
			
			try{
				$("#openGallery_multiple").bind("change", function(e){
					if(e.target.files.length > action['params']['limit']) {
						$.errorhandler('alertBox',"You can select upto "+action['params']['limit']+" "+action['params']['type']+" files.");
						return;
					}
					if ( /\.(jpe?g|png)$/i.test(this.files[0].name)) {
						var files = e.target.files;
						var filesArr = Array.prototype.slice.call(files);
						var targets = [];
						var targetObj = jQuery.parseJSON(action['params']['refMediaUI'].replace(/'/g, '"'));
						$.each(targetObj, function(key,value){
							targets[key] = $.getUI(value, ui,action['params']['targetpage']); //Bug #12321 fix
						});
						var j = 0;
						filesArr.forEach(function(f){
							if(!f.type.match("image.*"))
								return;
							var reader = new FileReader();
							reader.addEventListener("load", function () {
									if(j < e.target.files.length){
										targets[j].setValue(reader.result);
										targets[j].setImageName(e.target.files[j].name);
										$("#"+targets[j].getId()).attr("src",reader.result);
									}
									j++;
							}, false);
							reader.readAsDataURL(f);
						});
						$("#openGallery_multiple").remove();
						callback(pagedef, ui, action, eventinitpagedef, true);
					}else{
						$("#openGallery_multiple").remove();
						callback(pagedef, ui, action, eventinitpagedef, false);
					}
					
				});
				$("#openGallery_multiple").trigger("click");
			}catch(e){
				$("#openGallery_multiple").remove();
				callback(pagedef, ui, action, eventinitpagedef, false);
			}
		}
		
		
		var UploadFile = function(){
			var file;	
			if(action['params']['src'].indexOf('device') == 0){
				
				file = {};			
				
				var acceptheader = 'application/*';
				if(action['params']['type'] == "pdf")
					acceptheader = 'application/pdf';
				else if(action['params']['type'] == "document")
					acceptheader = '.doc, .docx';
				else if(action['params']['type'] == "excel")
					acceptheader = '.xlsx,.xls';
				else if(action['params']['type'] == "presentation")
					acceptheader = '.ppt, .pptx';
				else if(action['params']['type'] == "video")
					acceptheader = '.mp4,.3gp,.mkv,.avi,.mpeg,.mpg';
				
				$('body').append("<input id='deviceFile_" + target.getId() + "' type='file' accept='"+acceptheader+"' hidden='true'></input>");
				
				$("#deviceFile_" + target.getId()).bind("change", function(){
					if( /\.(pdf|xls|xlsx|doc|docx|ppt|txt|mp4|3gp|mkv|avi|mpeg|mpg)$/i.test(this.files[0].name)){
						var reader  = new FileReader();
						var fileObj = this.files[0];
						var filename = this.files[0].name;
						reader.addEventListener("load", function () {
							var _fileExt = filename.split(".")[filename.split(".").length - 1];
							file['value'] = "file_"+ Date.now()+"."+_fileExt;
							file['src'] = reader.result;
							if(file['src']){
								var _index = file['src'].indexOf("base64");
								var _res = file['src'].slice(0,_index + 7);
								file['src'] = file['src'].replace(_res, "");
							}
						}, false);
						reader.readAsDataURL(this.files[0]);
						$("#deviceFile_" + target.getId()).remove();
						
						$.utility('initCall');
						var timer =	setInterval(function(){
							if($.utility('appendDeviceInfo')!=""||$.utility('appendDeviceInfo')!=null){
								clearInterval(timer);
								
								var requestUrl = "";
								if($.utility('getServerPort') == "8080") {
									
									var fileValue = file['value'];
									var apiName = "uploadFile";
									requestUrl = $.mobileweb['baseurl'] + "/mobileweb/mobile/"+apiName+"?baseURL="+$.mobileweb['baseurl']+"&mediaName="+ fileValue + $.utility('appendDeviceInfo') +"&os=mw&version="+ $.mobileweb['version'];
																		
									$.ajax({
										url: requestUrl,
										type: "POST",
										data: file['src'],
										processData: false,
										contentType :false,
										success: function (resp) {
											try{
												resp = JSON.parse(resp);
											}catch(e){
												console.log(e);
											}
											
											$.utility('showLoadingIndicator', false);
											if(resp.ret === "ACK"){
												target.setValue(resp['file'][fileValue])
												callback(pagedef, ui, action, eventinitpagedef, true);
											}else{
												callback(pagedef, ui, action, eventinitpagedef, false);
											}
										},
										error : function(err){
											$.utility('showLoadingIndicator', false);
											callback(pagedef, ui, action, eventinitpagedef, false);
										},						
										xhr: function(){
											var xhr = new XMLHttpRequest();
											xhr.upload.addEventListener("progress", function(evt){
												if (evt.lengthComputable) {
													if(action['params']['refProgressUI'] != undefined){
														var percentComplete = (evt.loaded / evt.total).toString();
														if($.mobileweb.getCurrentPage().getName() ===  pagedef['name'])
															new $.actions(pagedef, null, [{method:"SetMainValue",category:"MainValue", name:action['params']['refProgressUI'],params:{value:percentComplete,targetpage:pagedef['name']}, events:[]}]).execute();
													}
												}
											}, false);

											return xhr;
										},
									});
									
								}else {
									var fileValue = fileObj['name'];
									requestUrl = $.mobileweb['baseurl'] + ":8181/commapi/commaction/llcommmedia/";
									
									var formData = new FormData();
									formData.append("ak",$.utility('appendDeviceInfo').replace("&ak=",""));
									if(action['params']['type'] == "video"){
										requestUrl = $.mobileweb['baseurl'] + ":8181/commapi/comaction/uploadVideoToAzure";
//								    	formData.append("istargetmongo",0);
								    	formData.append("projectid", $.mobileweb['pid']);
									    formData.append("userid", $.mobileweb['user']);
									}else{
										formData.append("os","mw");
									    formData.append("version", $.mobileweb['version']);
									}									
								    formData.append("file", fileObj);
								   									
									if (formData) {
										$.ajax({
											url: requestUrl,
											type: "POST",
											crossDomain: true,
											data: formData,
											processData: false,
											contentType: false,
											async: true,
											success: function (resp) {
												try{
													resp = JSON.parse(resp);
												}catch(e){
													console.log(e);
												}		
												
												if(resp.ret === "ACK"){
													if(action['params']['type'] == "video"){
														target.setValue(resp['retdic']["url"]);
													}else
														target.setValue(resp['file'][fileValue]);
													callback(pagedef, ui, action, eventinitpagedef, true);
												}else{
													callback(pagedef, ui, action, eventinitpagedef, false);
												}											
											},
											error : function(err){
												callback(pagedef, ui, action, eventinitpagedef, false);
											},
											beforeSend: function(jqXHR, settings){
												$.utility('showLoadingIndicator', true);
								    		},
							                complete: function(jqXHR, textStatus){                	
							                	$.utility('showLoadingIndicator', false);
							                },						
											xhr: function(){
												var xhr = new XMLHttpRequest();
												xhr.upload.addEventListener("progress", function(evt){
													if (evt.lengthComputable) {
														if(action['params']['refProgressUI'] != undefined){
															var percentComplete = (evt.loaded / evt.total).toString();
															if($.mobileweb.getCurrentPage().getName() ===  pagedef['name'])
																new $.actions(pagedef, null, [{method:"SetMainValue",category:"MainValue", name:action['params']['refProgressUI'],params:{value:percentComplete,targetpage:pagedef['name']}, events:[]}]).execute();
														}
													}
												}, false);

												return xhr;
											},
										});
									}
								}

							}
						},1000);
						
					}else{
						$("#deviceFile_" + target.getId()).remove();
						callback(pagedef, ui, action, eventinitpagedef, false);
					}
				});
				
				$("#deviceFile_" + target.getId()).trigger("click");
				
			}else{
				var filename;
				if(action['params']['src'].indexOf('bundle') == 0)
					filename = action['params']['filename'];
				else
					filename = action['params']['url'];
				
				if(eventinitpagedef != undefined){
					file = $.utility('getChildAsJson',eventinitpagedef, 'name', filename, ui ) 
				}else{
					file = {};
				
					if(filename.indexOf('[') != -1 && filename.indexOf(']') != -1){
						var fileref = filename.replace('[','').replace(']','');
						var filerefUI = $.utility('getChildAsJson',pagedef, 'name', fileref, ui );
						file['value'] = filerefUI["value"];
						
					}else{
						if(filename.indexOf('.') === -1){
							var fullfile = filename +'.'+ action['params']['type'];
							file['value'] = fullfile;
						}
						else
							file['value'] = filename;
					}
					
					var filepath;
					if(action['params']['src'].indexOf('bundle') == 0){
						filepath = $.mobileweb['fullBaseURL'] + "bin/mobileweb2/resources/others/" + file['value'];
						var _fileExt = filename.split(".")[filename.split(".").length - 1];
						file['value'] = "file_"+ Date.now()+"."+_fileExt;
					}
					else{
						filepath = file['value']; 
						var _fileExt = filename.split(".")[filename.split(".").length - 1];
						file['value'] = "file_"+ Date.now()+"."+_fileExt;
					}
					
					function toDataURL(url, callback) {
						var xhr = new XMLHttpRequest();
//						xhr.onprogress = function(evt) {
//							if (evt.lengthComputable){
//								// evt.loaded the bytes the browser received
//								// evt.total the total bytes set by the header
//								// jQuery UI progress bar to show the progress on screen
//								if(action['params']['refProgressUI'] != undefined){
//									var percentComplete = (evt.loaded / evt.total).toString();  
//									new $.actions(pagedef, null, [{method:"SetMainValue",category:"MainValue", name:action['params']['refProgressUI'],params:{value:percentComplete,targetpage:pagedef['name']}, events:[]}]).execute();
//								}
//							} 
//						};
						xhr.onabort = function() {
							console.log('Upload file request was aborted');
						};
						xhr.onload = function() {
							var reader = new FileReader();
							reader.readAsDataURL(xhr.response);
							reader.onloadend = function() {
								callback(reader.result);
							}
						};
						xhr.open('GET', url);
						xhr.responseType = 'blob';
						xhr.send();
					};

					toDataURL(filepath, function(dataUrl) {
						file['src'] = dataUrl;
//					    var base64PDF = dataUrl.split("data:application/pdf;base64,")[1];
//				        var blob = new Blob([base64PDF],{type:"application/pdf"});			        
//				        var f1 = new File([blob], file['value']);
						
//				        var binaryPdf = atob(base64PDF);
//				        var length = binaryPdf.length;
//				        var ab = new ArrayBuffer(length);
//				        var ua = new Uint8Array(ab);
//				        for (var i = 0; i < length; i++) {
//				            ua[i] = binaryPdf.charCodeAt(i);
//				        }					    
//				        var f2 = new File(ua, file['value']);
				        
						if(file['src']){
							var _index = file['src'].indexOf("base64");
							var _res = file['src'].slice(0,_index + 7);
							file['src'] = file['src'].replace(_res, "");
						}
					    
					    $.utility('initCall');
						var timer =	setInterval(function(){
							if($.utility('appendDeviceInfo') != "" || $.utility('appendDeviceInfo') != null){
								clearInterval(timer);
								
								var requestUrl = "";
								if($.utility('getServerPort') == "8080") {
								
									//Request via mobserver
									var apiName = "uploadFile";
									requestUrl = $.mobileweb['baseurl'] + "/mobileweb/mobile/"+apiName+"?baseURL="+$.mobileweb['baseurl']+"&mediaName="+ file['value'] + $.utility('appendDeviceInfo') +"&os=mw&version="+ $.mobileweb['version'];
									$.ajax({
										url: requestUrl,
										type: "POST",
										data: file['src'],
										processData: false,
										contentType :false,
										success: function (resp) {
											try{
												resp = JSON.parse(resp);
											}catch(e){
												console.log(e);
											}
											
											$.utility('showLoadingIndicator', false);
											if(resp.ret === "ACK"){
												target.setValue(resp['file'][file['value']])
												callback(pagedef, ui, action, eventinitpagedef, true);
											}else{
												callback(pagedef, ui, action, eventinitpagedef, false);
											}
										},
										error : function(err){
											$.utility('showLoadingIndicator', false);
											callback(pagedef, ui, action, eventinitpagedef, false);
										},
										
										xhr: function()
										{
										    var xhr = new XMLHttpRequest();
										    //Upload progress
										    xhr.upload.addEventListener("progress", function(evt){
										      if (evt.lengthComputable) {
										        if(action['params']['refProgressUI'] != undefined){
													var percentComplete = (evt.loaded / evt.total).toString();  
													if($.mobileweb.getCurrentPage().getName() ===  pagedef['name'])
														new $.actions(pagedef, null, [{method:"SetMainValue",category:"MainValue", name:action['params']['refProgressUI'],params:{value:percentComplete,targetpage:pagedef['name']}, events:[]}]).execute();
												}
										      }
										    }, false);
										    //Download progress
//										    xhr.addEventListener("progress", function(evt){
//										      if (evt.lengthComputable) {
//										        var percentComplete = evt.loaded / evt.total;
//										        //Do something with download progress
//										        console.log(percentComplete);
//										      }
//										    }, false);
										    return xhr;
										},
									});
								}else {
									
									//Request via glassfish
									requestUrl = $.mobileweb['baseurl'] + ":8181/commapi/commaction/llcommmedia/";
									var fileData = $.utility('fileSrctoBlob', dataUrl);
									
									var formData = new FormData();
									formData.append("ak",$.utility('appendDeviceInfo').replace("&ak=",""));
									formData.append("os","mw");
									formData.append("version", $.mobileweb['version']);
									formData.append("file", fileData, file['value']);
									
									if (formData) {
										$.ajax({
											url: requestUrl,
											type: "POST",
											crossDomain: true,
											data: formData,
											processData: false,
											contentType: false,
											async: true,
											success: function (resp) {
												try{
													resp = JSON.parse(resp);
												}catch(e){
													console.log(e);
												}		
												
												if(resp.ret === "ACK"){
													target.setValue(resp['file'][file['value']]);
													callback(pagedef, ui, action, eventinitpagedef, true);
												}else{
													callback(pagedef, ui, action, eventinitpagedef, false);
												}											
											},
											error : function(err){
												callback(pagedef, ui, action, eventinitpagedef, false);
											},
											beforeSend: function(jqXHR, settings){
												$.utility('showLoadingIndicator', true);
											},
											complete: function(jqXHR, textStatus){                	
												$.utility('showLoadingIndicator', false);
											},						
											xhr: function(){
												var xhr = new XMLHttpRequest();
												xhr.upload.addEventListener("progress", function(evt){
													if (evt.lengthComputable) {
														if(action['params']['refProgressUI'] != undefined){
															var percentComplete = (evt.loaded / evt.total).toString();
															if($.mobileweb.getCurrentPage().getName() ===  pagedef['name'])
																new $.actions(pagedef, null, [{method:"SetMainValue",category:"MainValue", name:action['params']['refProgressUI'],params:{value:percentComplete,targetpage:pagedef['name']}, events:[]}]).execute();
														}
													}
												}, false);
												
												return xhr;
											},
										});
									}
									
								}
							}
						},1000);
					});
				}
			}
		};
		
			
		// This method code is almost same as TakePhoto action code. Need to refactor.
		var UploadMedia = function(){
			var media;
			var sourceUIPart = action['params']['sourceUIPart'];
			if(sourceUIPart.indexOf("[") != -1 && (sourceUIPart.indexOf("]") != -1))
			    sourceUIPart = $.utility('tokenizeString',action['params']['sourceUIPart'], pagedef, action);
			if(eventinitpagedef != undefined){
				media = $.utility('getChildAsJson',eventinitpagedef, 'name', sourceUIPart, ui ); 
			}else{
				media = $.utility('getChildAsJson',pagedef, 'name', sourceUIPart, ui );
				if(media == null && pagedef['type'] === "SplitView"){
					$.each(pagedef['children'], function(i, splitChildPagedef){
						if(splitChildPagedef['name'] === action['params']['targetpage']){
							media = $.utility('getChildAsJson', splitChildPagedef, 'name', action['params']['sourceUIPart'], ui );
						}
					});
				}
			}
			var fileObj = $.utility("getFileObj",sourceUIPart);
			$.utility('initCall');
			var timer =	setInterval(function(){
				if(action['params']['type'] == "file" || action['params']['type'] == "video"){
					if($.utility('appendDeviceInfo')!=""||$.utility('appendDeviceInfo')!=null){
						clearInterval(timer);
						
						var requestUrl = "";
						if($.utility('getServerPort') == "8080") {
							
							var fileValue = "file_"+ Date.now();
							var apiName = "uploadFile";
							requestUrl = $.mobileweb['baseurl'] + "/mobileweb/mobile/"+apiName+"?baseURL="+$.mobileweb['baseurl']+"&mediaName="+ fileValue + $.utility('appendDeviceInfo') +"&os=mw&version="+ $.mobileweb['version'];
																
							$.ajax({
								url: requestUrl,
								type: "POST",
								data: media['value'],
								processData: false,
								contentType :false,
								success: function (resp) {
									try{
										resp = JSON.parse(resp);
									}catch(e){
										console.log(e);
									}
									
									$.utility('showLoadingIndicator', false);
									if(resp.ret === "ACK"){
										target.setValue(resp['file'][fileValue])
										callback(pagedef, ui, action, eventinitpagedef, true);
									}else{
										callback(pagedef, ui, action, eventinitpagedef, false);
									}
								},
								error : function(err){
									$.utility('showLoadingIndicator', false);
									callback(pagedef, ui, action, eventinitpagedef, false);
								},						
								xhr: function(){
									var xhr = new XMLHttpRequest();
									xhr.upload.addEventListener("progress", function(evt){
										if (evt.lengthComputable) {
											if(action['params']['refProgressUI'] != undefined){
												var percentComplete = (evt.loaded / evt.total).toString();
												if($.mobileweb.getCurrentPage().getName() ===  pagedef['name'])
													new $.actions(pagedef, null, [{method:"SetMainValue",category:"MainValue", name:action['params']['refProgressUI'],params:{value:percentComplete,targetpage:pagedef['name']}, events:[]}]).execute();
											}
										}
									}, false);

									return xhr;
								},
							});
							
						}else {
							var fileValue = fileObj['name'];
							requestUrl = $.mobileweb['baseurl'] + ":8181/commapi/commaction/llcommmedia/";
							
							var formData = new FormData();
							formData.append("ak",$.utility('appendDeviceInfo').replace("&ak=",""));
							if(action['params']['type'] == "video"){
								requestUrl = $.mobileweb['baseurl'] + ":8181/commapi/comaction/uploadVideoToAzure";
//						    	formData.append("istargetmongo",0);
						    	formData.append("projectid", $.mobileweb['pid']);
							    formData.append("userid", $.mobileweb['user']);
							}else{
								formData.append("os","mw");
							    formData.append("version", $.mobileweb['version']);
							}									
						    formData.append("file", fileObj);
						   									
							if (formData) {
								$.ajax({
									url: requestUrl,
									type: "POST",
									crossDomain: true,
									data: formData,
									processData: false,
									contentType: false,
									async: true,
									success: function (resp) {
										try{
											resp = JSON.parse(resp);
										}catch(e){
											console.log(e);
										}		
										
										if(resp.ret === "ACK"){
											if(action['params']['type'] == "video"){
												target.setValue(resp['retdic']["url"]);
											}else
												target.setValue(resp['file'][fileValue]);
											callback(pagedef, ui, action, eventinitpagedef, true);
										}else{
											callback(pagedef, ui, action, eventinitpagedef, false);
										}											
									},
									error : function(err){
										callback(pagedef, ui, action, eventinitpagedef, false);
									},
									beforeSend: function(jqXHR, settings){
										$.utility('showLoadingIndicator', true);
						    		},
					                complete: function(jqXHR, textStatus){                	
					                	$.utility('showLoadingIndicator', false);
					                },						
									xhr: function(){
										var xhr = new XMLHttpRequest();
										xhr.upload.addEventListener("progress", function(evt){
											if (evt.lengthComputable) {
												if(action['params']['refProgressUI'] != undefined){
													var percentComplete = (evt.loaded / evt.total).toString();
													if($.mobileweb.getCurrentPage().getName() ===  pagedef['name'])
														new $.actions(pagedef, null, [{method:"SetMainValue",category:"MainValue", name:action['params']['refProgressUI'],params:{value:percentComplete,targetpage:pagedef['name']}, events:[]}]).execute();
												}
											}
										}, false);

										return xhr;
									},
								});
							}
						}

					}
				}else{
					if($.utility('appendDeviceInfo')!="" || $.utility('appendDeviceInfo')!=null){
						clearInterval(timer);
						
						var dataURLSuccess = false;
						var apiName = "";
						
						if(media['source'] === "QRview"){
							var qrcanvas = $('#'+media["id"] + '_canvas' );
							if(qrcanvas.length > 0){
								media['value'] = media["id"]+"_QRview.png";
//								media['src'] = qrcanvas[0].toDataURL();
								//Bug #12449 fix
								if(!$('#'+media['id'] + '_canvas' ).is('img')){
									var canvas = $('#'+media['id'] + '_canvas' ).get(0); 
									var ctx = canvas.getContext("2d");

									ctx.lineWidth = 4;
									ctx.strokeStyle="#DDDDDD";
									ctx.strokeRect(0, 0, qrcanvas[0]['width'],qrcanvas[0]['height']);

									ctx.fillStyle = "rgba(255,255,255,.01)";
									ctx.fillRect(0,0,qrcanvas[0]['width'] - 8,qrcanvas[0]['height'] -8);

									var data = canvas.toDataURL("image/png");
									var imga = new Image();
									imga.src = data;
									$('#'+media['id'] + '_canvas').replaceWith( imga );
									imga.id =  media['id'] + '_canvas';
								}
								
								media['src'] = $('#'+media['id'] + ' > img')[0]['src'];
								dataURLSuccess = true;
								
							}else{
								callback(pagedef, ui, action, eventinitpagedef, false);
								return;
							}
						}else{
							var c = document.createElement("Canvas");
							var ctx = c.getContext("2d");
							var img = document.getElementById(media["id"]);
							if(media['viewtype'] == "ImageButton"){//Bug #12106 Fix
								var imgsrc = media['src'];
								if(imgsrc != undefined && imgsrc != "")
									img = $('#'+media["id"]+'>[name="foregroundimage"]')[0];
								else
									img = $('#'+media["id"]+'>[name="backgroundimage"]')[0];
								if(img['src'] == undefined || img['src'] == ""){
									callback(pagedef, ui, action, eventinitpagedef, false);
									return;
								}
							}
							
							if(media['source'] === "url"){
								var src_url = img.getAttribute('src');

								var imgURL = new Image;
								imgURL.crossOrigin = "Anonymous";		// we need to set crossorigin attribute, i.e., allow non-authenticated downloading of the image cross-origin.
								imgURL.src = src_url;
								imgURL.onload = function() {
									c.width = imgURL.naturalWidth;
									c.height = imgURL.naturalHeight;
								    ctx.drawImage( imgURL, 0, 0 );
								    try {
								        //localStorage.setItem("urlImage-savedData", c.toDataURL("image/png") );
								    	$.utility('createIndexedDBTable','urlImage-savedData',1);
								    	imgId = pagedef['name'] + "_" + media['id'];
								    	var data = {};
								    	data[imgId] = c.toDataURL("image/png");
								    	if($.utility('getIndexedDBFlag'))
								    		$.utility('clearDataFromIndexedDBTable','urlImage-savedData');
								    	$.utility('addDataToIndexedDBTable','urlImage-savedData',data);
								        if (imgURL.complete || imgURL.complete === undefined ) {
								        	//media['src'] = localStorage.getItem("urlImage-savedData");
								        	var timer = setInterval(function(){
								        		$.utility('getDataFromIndexedDBTable','urlImage-savedData',imgId);
								        		if($.utility('getIndexedDBFlag')){
								        			clearInterval(timer);
								        			media['src'] = $.utility('getIndexedDBResult');
										        	dataURLSuccess = true;
								        		}
								        	},200);
								        }
								    } catch(err) {
								        console.log("Error: " + err);
								        callback(pagedef, ui, action, eventinitpagedef, false);
										return;
								    }
								}
							}
							else //if(media['source'] === "bundle")
							{
								c.width = img.naturalWidth;
								c.height = img.naturalHeight;
								ctx.drawImage(img, 0, 0);
								if(media['src'].indexOf("data:image") == -1)
									media['src'] = c.toDataURL();
								
								dataURLSuccess = true;
							}
						}
							
						apiName = "uploadImage";	//"uploadMedia";
						
						var dataTimer =	setInterval(function(){
							if(dataURLSuccess){
								clearInterval(dataTimer);
								
//								var mediaValue = media['value'];
								var mediaValue ="img_"+ Date.now()+".png";
								if(media['source'] === "url" || media['viewtype'] == "ImageButton"){// Bug fix 11970
									mediaValue = media["id"]+"_url.png";
								}
								if(mediaValue == "" || mediaValue.indexOf("base64") != -1)// Bug #12337 fix
									mediaValue = media["id"]+".png";
								
								var requestUrl = "";
								if($.utility('getServerPort') == "8080") {		//Request via mobserver
									
									requestUrl = $.mobileweb['baseurl'] + "/mobileweb/mobile/"+apiName+"?baseURL="+$.mobileweb['baseurl'] + $.utility('appendDeviceInfo') + "&os=mw&version="+ $.mobileweb['version'];
									requestUrl = requestUrl + "&mediaName="+ mediaValue;
									if(action['params']['thumbnail'] != undefined)
										requestUrl = requestUrl + "&isThumbnail=" + action['params']['thumbnail'];
									if(action['params']['targetLocation'] != undefined && action['params']['targetLocation'] == "S3")
										requestUrl = requestUrl + "&isTargetMongo=false";
									else
										requestUrl = requestUrl + "&isTargetMongo=true";
									
									$.ajax({
										url: requestUrl,
										type: "POST",
										data: media['src'],
										processData: false,
										contentType: false,
										
										success: function (resp) {
											try{
												resp = JSON.parse(resp);
											}catch(e){
												console.log(e);
											}
											$.utility('showLoadingIndicator', false);
											if(resp.ret === "ACK"){
												var mediaVal = mediaValue;
												if(media['source'] === "url" || media['viewtype'] == "ImageButton"){
													$.each(resp['file'], function(key,value){
														if(mediaValue.indexOf(key) != -1){
															mediaVal = key;
														}
													});
												}
												target.setValue(resp['file'][mediaVal]);
												if(action['params']['thumbnail'] && action['params']['refThumbnailUI']){
													if(resp['thumbnail']){
														if($.mobileweb.getCurrentPage().getName() ===  pagedef['name'] || ($.mobileweb.getCurrentPage().getViewType() == "SplitView" && $.mobileweb.getCurrentPage().getName() ===  pagedef['pagedef']['name']) || ($.mobileweb.getCurrentPage().getViewType() == "PageScrollView" && $.mobileweb.getCurrentPage().getName() ===  pagedef['pagedef']['name']))// In reference of Bug #12322
															new $.actions(pagedef, null, [{method:"setValue",category:"UIObjectAction", name:action['params']['refThumbnailUI'],params:{key:'text',value:resp['thumbnail'][mediaVal],targetpage:pagedef['name']}, events:[]}]).execute();
													}
												}
												callback(pagedef, ui, action, eventinitpagedef, true);
											}else{
												callback(pagedef, ui, action, eventinitpagedef, false);
											}
										},
										error : function(err){
											$.utility('showLoadingIndicator', false);
											callback(pagedef, ui, action, eventinitpagedef, false);
										},						
										xhr: function(){
											var xhr = new XMLHttpRequest();
											//Upload progress
											xhr.upload.addEventListener("progress", function(evt){
												if (evt.lengthComputable) {
													if(action['params']['refProgressUI'] != undefined){
														var percentComplete = (evt.loaded / evt.total).toString();
														if($.mobileweb.getCurrentPage().getName() ===  pagedef['name'] || ($.mobileweb.getCurrentPage().getViewType() == "SplitView" && $.mobileweb.getCurrentPage().getName() ===  pagedef['pagedef']['name']) || ($.mobileweb.getCurrentPage().getViewType() == "PageScrollView" && $.mobileweb.getCurrentPage().getName() ===  pagedef['pagedef']['name']))
															new $.actions(pagedef, null, [{method:"SetMainValue",category:"MainValue", name:action['params']['refProgressUI'],params:{value:percentComplete,targetpage:pagedef['name']}, events:[]}]).execute();
													}
												}
											}, false);
											
											return xhr;
										},
									});
								}else {		//Request via glassfish
									
									requestUrl = $.mobileweb['baseurl'] + ":8181/commapi/commaction/llcommmedia/";
									var imageData = $.utility('fileSrctoBlob', media['src']);
									
									var formData = new FormData();
									formData.append("ak",$.utility('appendDeviceInfo').replace("&ak=",""));
									formData.append("os","mw");
									formData.append("version", $.mobileweb['version']);
									if(action['params']['thumbnail'] != undefined) {
										if(action['params']['thumbnail'])
											formData.append("isthumbnail","1");
										else
											formData.append("isthumbnail","0");						    	
									}
									if(action['params']['targetLocation'] != undefined && action['params']['targetLocation'] == "S3")
										formData.append("istargetmongo",0);
									else
										formData.append("istargetmongo",1);						    
									formData.append("file", imageData, mediaValue);
									
									if (formData) {
										$.ajax({
											url: requestUrl,
											type: "POST",
											crossDomain: true,
											data: formData,
											processData: false,
											contentType: false,
											async: true,
											success: function (resp) {
												try{
													resp = JSON.parse(resp);
												}catch(e){
													console.log(e);
												}										
												
												if(resp.ret === "ACK"){
													var mediaVal = mediaValue;
													if(media['source'] === "url" || media['viewtype'] == "ImageButton"){
														$.each(resp['file'], function(key,value){
															if(mediaValue.indexOf(key) != -1){
																mediaVal = key;
															}
														});
													}
													target.setValue(resp['file'][mediaVal]);
													if(action['params']['thumbnail'] && action['params']['refThumbnailUI']){
														if(resp['thumbnail'] && !$.isEmptyObject(resp['thumbnail'])){
															if($.mobileweb.getCurrentPage().getName() ===  pagedef['name'] || ($.mobileweb.getCurrentPage().getViewType() == "SplitView" && $.mobileweb.getCurrentPage().getName() ===  pagedef['pagedef']['name']) || ($.mobileweb.getCurrentPage().getViewType() == "PageScrollView" && $.mobileweb.getCurrentPage().getName() ===  pagedef['pagedef']['name']))// In reference of Bug #12322
																new $.actions(pagedef, null, [{method:"setValue",category:"UIObjectAction", name:action['params']['refThumbnailUI'],params:{key:'text',value:resp['thumbnail'][mediaVal],targetpage:pagedef['name']}, events:[]}]).execute();
														}
													}
													callback(pagedef, ui, action, eventinitpagedef, true);
												}else{
													callback(pagedef, ui, action, eventinitpagedef, false);
												}
											},
											error : function(err){
												callback(pagedef, ui, action, eventinitpagedef, false);
											},
											beforeSend: function(jqXHR, settings){
												$.utility('showLoadingIndicator', true);
											},
											complete: function(jqXHR, textStatus){                	
												$.utility('showLoadingIndicator', false);
											},						
											xhr: function(){
												var xhr = new XMLHttpRequest();
												//Upload progress
												xhr.upload.addEventListener("progress", function(evt){
													if (evt.lengthComputable) {
														if(action['params']['refProgressUI'] != undefined){
															var percentComplete = (evt.loaded / evt.total).toString();
															if($.mobileweb.getCurrentPage().getName() ===  pagedef['name'] || ($.mobileweb.getCurrentPage().getViewType() == "SplitView" && $.mobileweb.getCurrentPage().getName() ===  pagedef['pagedef']['name']) || ($.mobileweb.getCurrentPage().getViewType() == "PageScrollView" && $.mobileweb.getCurrentPage().getName() ===  pagedef['pagedef']['name']))
																new $.actions(pagedef, null, [{method:"SetMainValue",category:"MainValue", name:action['params']['refProgressUI'],params:{value:percentComplete,targetpage:pagedef['name']}, events:[]}]).execute();
														}
													}
												}, false);
												
												return xhr;
											},
										});
									}
								}
								
							}
						},1000);
						
					}
				}
			},1000);
		};
		
		var UploadAudio = function(){
			var media;
			if(eventinitpagedef != undefined){
				media = $.utility('getChildAsJson',eventinitpagedef, 'name', action['params']['sourceUIPart'], ui ); 
			}else{
				media = $.utility('getChildAsJson',pagedef, 'name', action['params']['sourceUIPart'], ui );
				if(media == null && pagedef['type'] === "SplitView"){
					$.each(pagedef['children'], function(i, splitChildPagedef){
						if(splitChildPagedef['name'] === action['params']['targetpage']){
							media = $.utility('getChildAsJson', splitChildPagedef, 'name', action['params']['sourceUIPart'], ui );
						}
					});
				}
			}

			//Audio box should be set as 'recorder', since only recorded sound will be uploaded.
			if(!media['recorder']){
				var eng="Target UI "+media['name']+" is not 'recorder' type. So can't upload sound";
				var jap="";
				if((action['events']== undefined) || (action['events']['Error']== undefined) || (action['events']['Error'].length==0)){
					$.errorhandler('alertBox',eng,jap);
					callback(pagedef, ui, action, eventinitpagedef, false);
				}
				return;
			}
			
			var requestUrl = "";
			
			$.utility('initCall');
			var timer =	setInterval(function(){
				if($.utility('appendDeviceInfo') != "" || $.utility('appendDeviceInfo') != null){
					clearInterval(timer);
					
					var requestUrl = "";
					var requestData;
					if($.utility('getServerPort') == "8080") {
						var apiName = "uploadAudio";
						requestUrl = $.mobileweb['baseurl'] + "/mobileweb/mobile/"+apiName+"?baseURL="+$.mobileweb['baseurl'] + $.utility('appendDeviceInfo') + "&os=mw&version="+ $.mobileweb['version'] + "&mediaName="+ media['value'];
					
						requestData = media['src'];
					}else {
						
						requestUrl = $.mobileweb['baseurl'] + ":8181/commapi/commaction/llcommmedia/";
						var audioData = $.utility('fileSrctoBlob', media['src']);
						
						var formData = new FormData();
						formData.append("ak",$.utility('appendDeviceInfo').replace("&ak=",""));
						formData.append("os","mw");
						formData.append("version", $.mobileweb['version']);
						formData.append("file", audioData, mediaValue);
						
						requestData = formData;
					}
					
					$.ajax({
						url: requestUrl,
						type: "POST",
						data: requestData,
						crossDomain: true,
						processData: false,
						contentType :false,
						success: function (resp) {
							try{
								resp = JSON.parse(resp);
							}catch(e){
								console.log(e);
							}
							
							$.utility('showLoadingIndicator', false);
							if(resp.ret === "ACK"){
								target.setValue(resp['file'][media['value']])
								callback(pagedef, ui, action, eventinitpagedef, true);
							}else{
								callback(pagedef, ui, action, eventinitpagedef, false);
							}
						},
						error : function(err){
							$.utility('showLoadingIndicator', false);
							callback(pagedef, ui, action, eventinitpagedef, false);
						},						
						xhr: function()
						{
						    var xhr = new XMLHttpRequest();
						    xhr.upload.addEventListener("progress", function(evt){
						      if (evt.lengthComputable) {
						        if(action['params']['refProgressUI'] != undefined){
									var percentComplete = (evt.loaded / evt.total).toString();  
									if($.mobileweb.getCurrentPage().getName() ===  pagedef['name'])
										new $.actions(pagedef, null, [{method:"SetMainValue",category:"MainValue", name:action['params']['refProgressUI'],params:{value:percentComplete,targetpage:pagedef['name']}, events:[]}]).execute();
								}
						      }
						    }, false);
						    return xhr;
						},
					});
				}
			},1000);
		};
		
		var UploadVideo = function(){
			
			var media;
			if(eventinitpagedef != undefined){
				media = $.utility('getChildAsJson',eventinitpagedef, 'name', action['params']['sourceUIPart'], ui ); 
			}else{
				media = $.utility('getChildAsJson',pagedef, 'name', action['params']['sourceUIPart'], ui );
				if(media == null && pagedef['type'] === "SplitView"){
					$.each(pagedef['children'], function(i, splitChildPagedef){
						if(splitChildPagedef['name'] === action['params']['targetpage']){
							media = $.utility('getChildAsJson', splitChildPagedef, 'name', action['params']['sourceUIPart'], ui );
						}
					});
				}
			}
			media['src'] = media['src'].replace("data:video/mp4;base64,", "");
			
			
			$.utility('initCall');
			var timer =	setInterval(function(){
				if($.utility('appendDeviceInfo')!=""||$.utility('appendDeviceInfo')!=null){
					clearInterval(timer);
				        
					var requestUrl = "";
					var requestData;
					if($.utility('getServerPort') == "8080") {
					
						var apiName = "uploadMedia";
						
						requestUrl = $.mobileweb['baseurl'] + "/mobileweb/mobile/"+apiName+"?baseURL="+$.mobileweb['baseurl'] + $.utility('appendDeviceInfo') + "&os=mw&version="+ $.mobileweb['version'];
						requestUrl = requestUrl + "&mediaName="+ media['value'] + "&mediaType=video";
						if(action['params']['thumbnail'] != undefined)
							requestUrl = requestUrl + "&isThumbnail=" + action['params']['thumbnail'];
						if(action['params']['targetLocation'] != undefined && action['params']['targetLocation'] == "S3")
							requestUrl = requestUrl + "&isTargetMongo=false";
						else
							requestUrl = requestUrl + "&isTargetMongo=true";
						
						requestData = media['src'];
						
					}else {
						
						requestUrl = $.mobileweb['baseurl'] + ":8181/commapi/commaction/llcommmedia/";
						var videoData = $.utility('fileSrctoBlob', media['src']);
						
						var formData = new FormData();
						formData.append("ak",$.utility('appendDeviceInfo').replace("&ak=",""));
						formData.append("version", $.mobileweb['version']);
						formData.append("os","mw");
						formData.append("isvideo",1);
						if(action['params']['thumbnail'] != undefined) {
							if(action['params']['thumbnail'])
								formData.append("isthumbnail",1);
							else
								formData.append("isthumbnail",0);						    	
						}
						if(action['params']['targetLocation'] != undefined && action['params']['targetLocation'] == "S3")
							formData.append("istargetmongo",0);
						else
							formData.append("istargetmongo",1);	
						formData.append("file", videoData, mediaValue);
						
						requestData = formData;
					}
					
					
					$.ajax({
						url: requestUrl,
						type: "POST",
						data: requestData,
						crossDomain: true,
						processData: false,
						contentType :false,
						success: function (resp) {
							try{
								resp = JSON.parse(resp);
							}catch(e){
								console.log(e);
							}
							
							$.utility('showLoadingIndicator', false);
							if(resp.ret === "ACK"){
								target.setValue(resp['file'][media['value']]);
								if(action['params']['thumbnail'] && action['params']['refThumbnailUI']){
									if(resp['thumbnail']){
										if($.mobileweb.getCurrentPage().getName() ===  pagedef['name'])
											new $.actions(pagedef, null, [{method:"setValue",category:"UIObjectAction", name:action['params']['refThumbnailUI'],params:{key:'text',value:resp['thumbnail'][media['value']],targetpage:pagedef['name']}, events:[]}]).execute();
									}
								}
								callback(pagedef, ui, action, eventinitpagedef, true);
							}else{
								callback(pagedef, ui, action, eventinitpagedef, false);
							}
						},
						error : function(err){
							$.utility('showLoadingIndicator', false);
							callback(pagedef, ui, action, eventinitpagedef, false);
						},
						xhr: function()
						{
						    var xhr = new XMLHttpRequest();
						    //Upload progress
						    xhr.upload.addEventListener("progress", function(evt){
						      if (evt.lengthComputable) {
						        if(action['params']['refProgressUI'] != undefined){
									var percentComplete = (evt.loaded / evt.total).toString();  
									if($.mobileweb.getCurrentPage().getName() ===  pagedef['name'])
										new $.actions(pagedef, null, [{method:"SetMainValue",category:"MainValue", name:action['params']['refProgressUI'],params:{value:percentComplete,targetpage:pagedef['name']}, events:[]}]).execute();
								}
						      }
						    }, false);
						    return xhr;
						},
					});
				}
			},1000);
		};
		
		var DownloadMedia = function(){

			//action['params']['source'] = "url";
			var mediaName = action['params']['type'] +'_'+ action['params']['source'] +'.png';
			
			var mediaId;
			if(eventinitpagedef != undefined){
				var chunks = action['params']['sourceUIPart'].split("[");
				for (var i = 0; i < chunks.length; i++) {
					if (chunks[i].toString().indexOf("]") != -1) {
						var j = chunks[i].indexOf("]");
						var org = "[" + chunks[i].substring(0, j) + "]";
						action['params']['sourceUIPart'].replace(org,$.utility('getChildAsJson',eventinitpagedef, 'name',chunks[i].substring(0, j), ui )['value']  )
					}
				}	
				mediaId = action['params']['sourceUIPart'];
			}else{
				mediaId = $.utility('tokenizeString',action['params']['sourceUIPart'], pagedef, action);
			}
			
			if(mediaId != undefined && mediaId != ""){
				var mediaref;
				if(action['params']['source'] === ""){//Bug #11106 Fix
					mediaref = $.mobileweb['baseurl']+"/images/" + mediaId;
					mediaName = "IMAGE.png";
				}
				else if(action['params']['source'] === "remote"){
					mediaref = $.mobileweb['baseurl']+"/images/" + mediaId;
				}else{
					// If url from same origin, file will be downloaded. Else, either set CORS configuration at server side or file will be shown in new tab.
					mediaref = mediaId;
				}
				
				//first check 'mediaref' is an existing url or not. If exist, then only download & success.
				var xhRequest = new XMLHttpRequest();  
				xhRequest.open('GET', mediaref, true);
				xhRequest.onreadystatechange = function(){
				    if(xhRequest.readyState === 4){
				    	if (xhRequest.status === 200) {  
	                        var pom = document.createElement('a');
					        pom.setAttribute('href', mediaref);
					        pom.setAttribute('download', mediaName); 
					        pom.setAttribute('target', "_blank");
					        pom.style.display = 'none';
					        document.body.appendChild(pom);
					        pom.click();
					        document.body.removeChild(pom);
					        	
					        callback(pagedef, ui, action, eventinitpagedef, true);
					           
					    }else{
	                        //-- Execute code if status doesn't match above --
					        callback(pagedef, ui, action, eventinitpagedef, false);
	                    }
				    }
				};
				xhRequest.send();
				
			}else{
				callback(pagedef, ui, action, eventinitpagedef, false);
			}
		}
	
		var SaveMedia = function(){
			var imageId;
			if(eventinitpagedef != undefined){
				var chunks = action['params']['sourceUIPart'].split("[");
				for (var i = 0; i < chunks.length; i++) {
					if (chunks[i].toString().indexOf("]") != -1) {
						var j = chunks[i].indexOf("]");
						var org = "[" + chunks[i].substring(0, j) + "]";
						action['params']['sourceUIPart'] = action['params']['sourceUIPart'].replace(org,$.utility('getChildAsJson',eventinitpagedef, 'name',chunks[i].substring(0, j), ui )['value']  );
					}
				}	
				imageId = action['params']['sourceUIPart'];
				media = $.utility('getChildAsJson',eventinitpagedef, 'name', action['params']['sourceUIPart'], ui );
			}else{
				imageId = $.utility('tokenizeString',action['params']['sourceUIPart'], pagedef, action);
				media = $.utility('getChildAsJson',pagedef, 'name', action['params']['sourceUIPart'], ui );
			}
			
			var dataURLSuccess = false;
			if(media != undefined){
				var mediaURI;
				if(media['source'] === "QRview"){
					var qrcanvas = $('#'+media["id"] + '_canvas' );
					if(qrcanvas.length > 0){
						var mediaSrc = qrcanvas[0].src;
						$("[name='"+action['params']['sourceUIPart'].toString().replace("[","").replace("]","")+ "']").attr("src", mediaSrc);
						mediaURI = $("[name='"+action['params']['sourceUIPart'].toString().replace("[","").replace("]","")+ "']").attr("src");
						dataURLSuccess = true;
					}
				}else{
					
					if(media['source'] === "url"){
						var mediaImg = document.getElementById(media["id"]);
						var mediaSrc = mediaImg.getAttribute('src');
						if(mediaSrc.length > 0){
							if(mediaImg.naturalWidth < 999 && mediaImg.naturalHeight < 999){
								var mediaSrc = mediaImg.getAttribute('src');
								if(mediaSrc.length > 0){
									var imgURL = new Image;
									imgURL.crossOrigin = "Anonymous";		// we need to set crossorigin attribute, i.e., allow non-authenticated downloading of the image cross-origin.
									imgURL.src = mediaSrc;
									imgURL.onload = function() {
										//document.getElementById("iscroll_"+pagedef['name']).appendChild(imgURL);
										var c = document.createElement("Canvas");
										var ctx = c.getContext("2d");
										c.width = mediaImg.naturalWidth;
										c.height = mediaImg.naturalHeight;
									    ctx.drawImage( imgURL, 0, 0 );
									    
									    try {
									    	mediaURI = c.toDataURL("image/png");//.replace('image/png', 'image/octet-stream');
									    	
									    	dataURLSuccess = true;
									    	
									    } catch(err) {
									        console.log("Error: " + err);
									        callback(pagedef, ui, action, eventinitpagedef, false);
											return;
									    }
									}
								}
							}else{
								var msg_en="Large size images can not be save directly to gallery.";
							   	var msg_ja="";
								var alert_Title="Save Media Limitation";
							   	$.errorhandler('messageBox', msg_en, msg_ja, alert_Title);

							   	var pom = document.createElement('a');
								pom.setAttribute('href', mediaSrc);
								pom.setAttribute('download', "Image_"+Date.now());
								pom.setAttribute('target', "_blank");
								pom.style.display = 'none';
								document.body.appendChild(pom);
								pom.click();
								document.body.removeChild(pom);
								
								callback(pagedef, ui, action, eventinitpagedef, true);
							}
						}
					}else{
						
						if(media['viewtype'] == "ImageButton")
							mediaURI = $('#'+media['id']+'>[name="foregroundimage"]').attr("src");
						else
							mediaURI = $("[name='"+action['params']['sourceUIPart'].toString().replace("[","").replace("]","")+ "']").attr("src");
						
//						var mediaUrl = 'data:image/png;base64,' + encodeURIComponent(mediaSrc);
//						mediaURI = mediaUrl;
						
						dataURLSuccess = true;
					}
				}
			}
	
			var dataTimer =	setInterval(function(){
				if(dataURLSuccess){
					clearInterval(dataTimer);
					//alert(mediaURI);
					if(mediaURI != undefined && mediaURI != ""){
		 				var pom = document.createElement('a');
						pom.setAttribute('href', mediaURI);
						if(imageId != undefined && imageId != "")
							pom.setAttribute('download', imageId);
						else
							pom.setAttribute('download', "Image_"+Date.now());
						pom.setAttribute('target', "_blank");
						pom.style.display = 'none';
						document.body.appendChild(pom);
						pom.click();
						
						setTimeout(function() {
							document.body.removeChild(pom);  
					    }, 0); 
						callback(pagedef, ui, action, eventinitpagedef, true);
					}else{
						callback(pagedef, ui, action, eventinitpagedef, false);
					}
				}
			},500);
			
		}
		
		var ShareVia = function() {
		    var shareval;
		    if (action['params']['contenttype'] == "text")
		    	shareval = $("#" + target.getId()).get(0).value;

		    if (shareval != undefined && shareval != "") {
		        if (navigator.share === undefined) {
		            $.errorhandler('alertBox', 'This device does not support this feauture.');
		            callback(pagedef, ui, action, eventinitpagedef, false);
		            return;
		        }

		        try {
		        	if(shareval.indexOf('text:') != -1 || shareval.indexOf('text: ') != -1 || shareval.indexOf('text :') != -1 || shareval.indexOf('text : ') != -1){
		        		shareval = shareval.replace('text:','').replace('text: ','').replace('text :','').replace('text : ','');
		        	}
		            var sharePromise = navigator.share({text: shareval});
		            if (sharePromise !== undefined) {
		                sharePromise.then(function() {
		                    console.log('Successfully sent share');
		                    callback(pagedef, ui, action, eventinitpagedef, true);
		                }).catch(function(error) {
		                    console.log(error);
		                    callback(pagedef, ui, action, eventinitpagedef, false);
		                });
		            }
		        } catch (error) {
		            console.log(error);
		            callback(pagedef, ui, action, eventinitpagedef, false);
		            return;
		        }
		    } else
		        callback(pagedef, ui, action, eventinitpagedef, false);

		}
		
		var DownloadFile = function(){

			//action['params']['source'] = "url";
			var mediaName = "";
			var refFileType = "";
			var mediaId;
			if(eventinitpagedef != undefined){
				var chunks = action['params']['sourceUIPart'].split("[");
				for (var i = 0; i < chunks.length; i++) {
					if (chunks[i].toString().indexOf("]") != -1) {
						var j = chunks[i].indexOf("]");
						var org = "[" + chunks[i].substring(0, j) + "]";
						action['params']['sourceUIPart'].replace(org,$.utility('getChildAsJson',eventinitpagedef, 'name',chunks[i].substring(0, j), ui )['value']  )
					}
				}	
				mediaId = action['params']['sourceUIPart'];
			}else{
				var sourceUIPart = "[" + action['params']['sourceUIPart'] + "]" ;
				mediaId = $.utility('tokenizeString',sourceUIPart, pagedef, action);
			}
			
			if(action['params']['refFileType'] != undefined && action['params']['refFileType'] != ""){
				var refFileUIPart = "[" + action['params']['refFileType'] + "]" ;
				refFileType = $.utility('tokenizeString',refFileUIPart, pagedef, action);
				switch(refFileType.toLowerCase()){
					case 'presentation':
						refFileType = '.ppt';
						break;
					case 'document':
						refFileType = '.doc';
						break;
					case 'excel':
						refFileType = '.xls';
						break;
					case 'video':
						refFileType = '';
						break;
					default:
						break;
				}
			}
			
			if(mediaId != undefined && mediaId != ""){
				var mediaref;
				if(action['params']['source'] === ""){
					mediaref = $.mobileweb['baseurl']+"/images/" + mediaId;
					mediaName = "file";
				}
				else if(action['params']['source'] === "remote"){
					mediaref = $.mobileweb['baseurl']+"/images/" + mediaId;
					mediaName = mediaId;
				}else{
					// If url from same origin, file will be downloaded. Else, either set CORS configuration at server side or file will be shown in new tab.
					mediaref = mediaId;
					mediaName = "urlFile";
				}
				
				mediaName = mediaName + refFileType;
				console.log(mediaName);
				//first check 'mediaref' is an existing url or not. If exist, then only download & success.
				var xhRequest = new XMLHttpRequest();  
				xhRequest.open('GET', mediaref, true);
				xhRequest.onreadystatechange = function(){
				    if(xhRequest.readyState === 4){
				    	if (xhRequest.status === 200) {  
	                        var pom = document.createElement('a');
					        pom.setAttribute('href', mediaref);
					        pom.setAttribute('download', mediaName); 
					        pom.setAttribute('target', "_blank");
					        pom.style.display = 'none';
					        document.body.appendChild(pom);
					        pom.click();
					        document.body.removeChild(pom);
					        	
					        callback(pagedef, ui, action, eventinitpagedef, true);
					           
					    }else{
	                        //-- Execute code if status doesn't match above --
					        callback(pagedef, ui, action, eventinitpagedef, false);
	                    }
				    }
				};
				xhRequest.send();
				
			}else{
				callback(pagedef, ui, action, eventinitpagedef, false);
			}
		}
		
		return _action;
		
	};
	
	
	
	function WarningAction(pagedef, ui, action, eventinitpagedef, target, callback){
		var _action = {};
		
		_action.execute = function(){
			var flag;
			/*if(action['method']=='Alert'){
			$.utility('setMultipleAlertArray', {page:pagedef, uiobject:ui, event:action});
			flag= true;
			}*/
			if(action['method']=='StartWaitIndicator'){
				action['params']['timeout'] = $.utility("tokenizeString", action['params']['timeout'], pagedef,action);
				flag = $.errorhandler('checkWarningController',action);
				if(!flag){
					callback(pagedef, ui, action, eventinitpagedef, flag);
					return _action;
				}
			}
		
			switch(action['method']){
				case 'Alert':
					Alert();
					break;
				case 'ActionSheet':
					ActionSheet();
					break;
				case 'StartWaitIndicator':
					StartWaitIndicator();
					break;
				case 'StopWaitIndicator':
					StopWaitIndicator();
					break;
				case 'ShowDialog':
					ShowDialog();
					break;
				case 'HideDialog':
					HideDialog();
					break;
				default:
					callback(pagedef, ui, action, eventinitpagedef, false);
					break;
			}
			
			if(flag){
				if((action['method']=='Alert') && (action['events']!= undefined) && (action['events']['Success']!= undefined)){
					$.each(action['events']['Success'],function(i, event){
						if(event['method']=='Alert'){}
						else
							callback(pagedef, ui, action, eventinitpagedef, flag);
					});
				}
				else
					callback(pagedef, ui, action, eventinitpagedef, flag);
			}
				
		};
		
		var Alert = function(){
			$.utility("showLoadingIndicator", false);
			var title = "";
			var message = "";
			if(action['params']['title'].indexOf('[') != -1 && action['params']['title'].indexOf(']') != -1){
				title = action['params']['title'];
				if(pagedef['type'] === "RemoteTableViewList"  || pagedef['type'] === "DBTableViewList"){
					var chunks = title.split("[");
					for ( var i = 0; i < chunks.length; i++) {
						if (chunks[i].indexOf("]") != -1) {
							var j = chunks[i].indexOf("]");
							var org = "[" + chunks[i].substring(0, j) + "]";
							var fin = "";
							$.each(pagedef['data']['contents'][ui['rownum']], function(key, data){
								if(key === chunks[i].substring(0, j)){
									fin = data;
								}
							});
									
							title = title.replace(org, fin);
						}
					}
				}else{
					title = $.utility("tokenizeString", action['params']['title'], pagedef,action);
				}
			}else{
				title = $.utility("tokenizeString", action['params']['title'], pagedef,action);
			}
			
			if(action['params']['message'].indexOf('[') != -1 && action['params']['message'].indexOf(']') != -1){
				message = action['params']['message'];
				
				if(pagedef['type'] === "RemoteTableViewList"  || pagedef['type'] === "DBTableViewList"){
					var chunks = message.split("[");
					for ( var i = 0; i < chunks.length; i++) {
						if (chunks[i].indexOf("]") != -1) {
							var j = chunks[i].indexOf("]");
							var org = "[" + chunks[i].substring(0, j) + "]";
							var fin = "";
							if(ui['rownum'] != undefined){
								$.each(pagedef['data']['contents'][ui['rownum']], function(key, value){
									if(key== chunks[i].substring(0, j)){
										message=message.replace(org, value);
									}
								});
							}else{
								var rownum;
								if(ui.getId != undefined){
									var uiId = ui.getId();
     							var tempStr = uiId;
     							if(ui.getViewType() != "Row")
     								tempStr = uiId.substr(0, uiId.lastIndexOf('-'));
     							rownum = tempStr.substr(tempStr.lastIndexOf('-')+1, tempStr.length);
								}
								
								if(isNaN(parseInt(rownum))){
 									if(pagedef['data']['pagedata'] != undefined){
 										$.each(pagedef['data']['pagedata'], function(key, value){
 											if(key== chunks[i].substring(0, j)){
 												message=message.replace(org, value);
 												return false;
 											}
 										});
 									}
 									if(message.indexOf('[') != -1)
 										rownum = 0;
 								}
								
								if(pagedef['data']['contents'][rownum] != undefined){
									$.each(pagedef['data']['contents'][rownum], function(key, value){
										if(key== chunks[i].substring(0, j)){
											message=message.replace(org, value);
										}
									});
								}else{
									if(pagedef['toolbartop'] != undefined && pagedef['toolbarbottom'] != undefined){
										$.each(pagedef['toolbartop']['children'], function(k, child){
											if(child['name']== chunks[i].substring(0, j)){
												message=message.replace(org, child['value']);
											}
										});
										$.each(pagedef['toolbarbottom']['children'], function(k, child){
											if(child['name']== chunks[i].substring(0, j)){
												message=message.replace(org, child['value']);
											}
										});
									}
									if(pagedef['toolbarleft'] != undefined){
										$.each(pagedef['toolbarleft']['children'], function(k, child){
											if(child['name']== chunks[i].substring(0, j)){
												message=message.replace(org, child['value']);
											}
										});
									}
								}
							}
						}
					}
				}else{
					message = $.utility("tokenizeString", action['params']['message'].toString().replace(/'nl9'/g,'<br>'), pagedef,action);
				}
			}else{
				message = $.utility("tokenizeString", action['params']['message'].toString().replace(/'nl9'/g,'<br>'), pagedef,action);
			}
			
			var Left = 0;
			if($.mobileweb['state'] === 'preview'){
				Left = (window.innerWidth-320)/2;
			}else{
				Left =($.mobileweb.device['width']-320)/2;
			}
			var timer =	setInterval(function(){
				if(!$.utility('isBusy') && $.utility('isInitChildren')){
					clearInterval(timer);
					if(pagedef['name'] !== $.mobileweb.getCurrentPage().getName() && pagedef['parentType'] != "PageScrollView"){
						callback(pagedef, ui, action, eventinitpagedef, false);
						console.log("Alert triggering page title ::", pagedef['pageTitle']);
						return;
					}
					var dialogObject = "";
					if(ui.getId != undefined && $("#"+ui.getId())[0].offsetParent.firstChild.className === "dialog"){
						var dialogObjectId = $("#"+ui.getId())[0].offsetParent.firstChild.id;
						var dialogObjectName = $('#' + dialogObjectId).attr('name');
						dialogObject = $.getUI(dialogObjectName, ui,$.mobileweb.getCurrentPage().getName());
						if(!$.isEmptyObject(dialogObject)){
							new $.actions(pagedef, null, [{method:"HideDialog",category:"WarningAction", name:dialogObjectName, events:[]}]).execute();
						}
					}
					
					if(action['type'] === "Error"){	
						if(title === ''){
							if(action['params']['canceltitle']==''){
								$.blockUI({ message:'<article class="message clearfix" style="background-color: #f00;"><p style="color:#c50a0a;">'+message+'</p><div id="btnDiv"><button id="okAlert" class="fr" >OK</button></div> </article>', css: { position:'relative',border: 'none', backgroundColor: '',left :Left+'px','height':'376px',width:320+'px','padding':'0px',  '-webkit-border-radius': '10px', '-moz-border-radius': '10px', 'text-align':'left', color: '#fff', top:"45px", opacity:"1", cursor:""} });
							}else{
								$.blockUI({ message:'<article class="message clearfix" style="backgroundColor: #f00"><p style="color:#c50a0a;>'+message+'</p><div id="btnDiv"><button id="cancelAlert" class="fr">'+action['params']['canceltitle']+' </button> <button id="okAlert" class="fr" style="margin:auto" >OK</button> </div></article>', css: { position:'relative',border: 'none', backgroundColor: '',left :Left+'px','height':'376px',width:320+'px','padding':'0px',  '-webkit-border-radius': '10px', '-moz-border-radius': '10px', 'text-align':'left', color: '#fff', top:"45px", opacity:"1", cursor:""} });
							}
						}else{
							if(action['params']['canceltitle']==''){
								$.blockUI({ message:'<article class="message clearfix" style="backgroundColor: #f00"><h1>'+title+'</h1><p style="color:red;">'+message+'</p><div id="btnDiv"><button id="okAlert" class="fr" style="margin:auto" >OK</button></div> </article>', css: { position:'relative',border: 'none', backgroundColor: '',left :Left+'px','height':'376px',width:320+'px','padding':'0px',  '-webkit-border-radius': '10px', '-moz-border-radius': '10px', 'text-align':'left', color: '#fff', top:"45px", opacity:"1", cursor:""} });
							}else{
								$.blockUI({ message:'<article class="message clearfix" style="backgroundColor: #f00"><h1>'+title+'</h1><p style="color:red;>'+message+'</p><div id="btnDiv"><button id="cancelAlert" class="fr">'+action['params']['canceltitle']+' </button> <button id="okAlert" class="fr" style="margin:auto" >OK</button></div> </article>', css: { position:'relative',border: 'none', backgroundColor: '',left :Left+'px','height':'376px',width:320+'px','padding':'0px',  '-webkit-border-radius': '10px', '-moz-border-radius': '10px', 'text-align':'left', color: '#fff', top:"45px", opacity:"1", cursor:""} });
							}
						}
					}else{
						if(title === ''){
							if(action['params']['canceltitle']==''){
								//for only Ok button on alert box
								$.blockUI({ message:'<article class="message clearfix" style="backgroundColor: #f00"><p>'+message+'</p><div id="btnDiv"><button id="okAlert" class="fr" style="margin:auto" >OK</button></div> </article>', css: { position:'relative',border: 'none', backgroundColor: '',left :Left+'px','height':'376px',width:320+'px','padding':'0px',  '-webkit-border-radius': '10px', '-moz-border-radius': '10px', 'text-align':'left', color: '#fff', top:"45px", opacity:"1", cursor:""} });
							}else{
								//for OK and Cancel button on alert box
								$.blockUI({ message:'<article class="message clearfix" style="backgroundColor: #f00"><p>'+message+'</p><div id="btnDiv"><button id="cancelAlert" class="fr">'+action['params']['canceltitle']+' </button> <button id="okAlert" class="fr" style="margin:auto" >OK</button></div>  </article>', css: { position:'relative',border: 'none', backgroundColor: '',left :Left+'px','height':'376px',width:320+'px','padding':'0px',  '-webkit-border-radius': '10px', '-moz-border-radius': '10px', 'text-align':'left', color: '#fff', top:"45px", opacity:"1", cursor:""} });
							}
						}else{
							if(action['params']['canceltitle']==''){
								$.blockUI({ message:'<article class="message clearfix" style="backgroundColor: #f00"><h1>'+title+'</h1><p>'+message+'</p><div id="btnDiv"><button id="okAlert" class="fr" style="margin:auto" >OK</button></div>  </article>', css: { position:'relative',border: 'none', backgroundColor: '',left :Left+'px','height':'376px',width:320+'px','padding':'0px',  '-webkit-border-radius': '10px', '-moz-border-radius': '10px', 'text-align':'left', color: '#fff', top:"45px", opacity:"1", cursor:""} });
							}else{
								$.blockUI({ message:'<article class="message clearfix" style="backgroundColor: #f00"><h1>'+title+'</h1><p>'+message+'</p><div id="btnDiv"><button id="cancelAlert" class="fr">'+action['params']['canceltitle']+' </button> <button id="okAlert" class="fr" style="margin:auto" >OK</button></div> </article>', css: { position:'relative',border: 'none', backgroundColor: '',left :Left+'px','height':'376px',width:320+'px','padding':'0px',  '-webkit-border-radius': '10px', '-moz-border-radius': '10px', 'text-align':'left', color: '#fff', top:"45px", opacity:"1", cursor:""} });
							}
						}
						
					}
					
					$("#cancelAlert").bind("click",function(){
						$("#AlertBOX").remove();
						if(action['events']) {
							$.unblockUI();
							setTimeout(function(){
								if(!$.isEmptyObject(dialogObject) && action['events']['onTapCancel'].length == 0){
									new $.actions(pagedef, null, [{method:"ShowDialog",category:"WarningAction", name:dialogObjectName, events:[]}]).execute();
								}
								callback(pagedef, ui, action, eventinitpagedef, "onTapCancel");
							},400);
						}
					});

					$("#okAlert").bind("click",function(){
						$("#AlertBOX").remove();
						if(action['events']) {
							$.unblockUI();
							setTimeout(function(){
								if(!$.isEmptyObject(dialogObject) && action['events']['onTapOk'].length == 0){
									new $.actions(pagedef, null, [{method:"ShowDialog",category:"WarningAction", name:dialogObjectName, events:[]}]).execute();
								}
								callback(pagedef, ui, action, eventinitpagedef, "onTapOk");
							},400);
						}
					});
				}
			},1000);
		};
		
		var ActionSheet = function(){
			var buttonsvalue = action['params']['buttons'];
			var buttonString="";			
			$.each(buttonsvalue, function(i){
				buttonString=buttonString+"<a id='"+buttonsvalue[i]['id']+"'style=\"margin-left:2.5%;margin-right:2.5%;width:95%;height:95%;\" data-role='button' rel='close' >"+buttonsvalue[i]['title']+"</a>";
				return true;
			}); 
			
			if(action['cancelTitle'] != undefined)
				buttonString = buttonString + "<div id='cancel_div' class='ui-header' style=\"background:#111;\"><a id='cancel' style=\"margin-left:2.5%;margin-right:2.5%;width:95%;height:100%;margin-top:6px;border:none;\" data-role='button' rel='close' >"+action['cancelTitle']+"</a></div>";
		    $('<div style="height:100%;width:100%; z-index:1;overflow-x:none">').simpledialog2({
						height:pagedef['height']*$.mobileweb.device['aspectHratio']+'px',
						width: pagedef['width']*$.mobileweb.device['aspectWratio'] -15 +'px',
						mode: 'blank',
						headerText: action['title'],
						headerClose: true,
						blankContent:buttonString
			});
		    if(action['cancelTitle'] != undefined)
		        $('#cancel span > span').css({'font-size':'16px'});
		    $('h1.ui-title').css({'margin-right':'0px','margin-left':'0px'});//Bug #12781 fix
			$.each(buttonsvalue, function(i){
				$('#'+buttonsvalue[i]['id']).click(function(){ 
					if(buttonsvalue[i]['events']['Tap'] != undefined)
						new $.actions(pagedef, ui, buttonsvalue[i]['events']['Tap']).execute(); });
						$('#'+buttonsvalue[i]['id']+' >span >span').css({'font-size':'16px'});
						return true;
				});   
			};
			
	
		var StartWaitIndicator = function() {
			if(action['params']['type'] == "" || action['params']['type'] == "Default"){
				$("body").append($("<div id='overlay'></div>").css({
			        "position": "fixed",
			        "top": 0,
			        "left": 0,
			        "width": "100%",
			        "height": "100%",
			        "background-color": "rgba(0,0,0,.5)",
			        "z-index": 10000,
			    }));
				$('.ui-loader').css('display', 'block');
				$.mobile.loading('show');			//$.mobile.showPageLoadingMsg();
				$('.ui-loader').append('<span style="position: absolute; left: -30px;color:#000000; width:120px;  display:inline-block;">'+$.utility("tokenizeString", action['params']['message'], pagedef,action)+'</span>');
				$('.ui-icon-loading').css({'background-image':'url("https://code.jquery.com/mobile/1.2.0/images/ajax-loader.gif")'});
				
				if(parseInt(action['params']['timeout']) != -1){
					indicatorActionTimer = setTimeout(function(){
						$('.ui-loader').css('display', 'none');
						$('.ui-loader span').html('');
						$("#overlay").remove();
						$.mobile.loading('hide');	//$.mobile.hidePageLoadingMsg();
					}, parseInt(action['params']['timeout']) * 1000);
				}
			}else{
				
				$("body").append($("<div id='coverlay'></div>").css({
			        "position": "fixed",
			        "top": 0,
			        "left": 0,
			        "width": "100%",
			        "height": "100%",
			        "text-align": "center",
			        "background-color": "rgba(104,104,104,.5)",
			        "z-index": 10000,
			    }));
				
				$('.ui-loader').css('display', 'none');
				$.mobile.loading('show');
				
				var customImg=$.utility('tokenizeString', action['params']['file'],pagedef,action);
				var customMsg = $.utility("tokenizeString", action['params']['message'], pagedef,action);
				if(customMsg != undefined && customMsg.length > 0)
					$('#coverlay').append('<span style="color:#000000; display:flex; align-items:center;justify-content: center;height:100%;"><img id="customWait" style="width:48px;height:48px;"/><span style="width:120px; color:#000000; ">'+customMsg+'</span></span>');
				else
					$('#coverlay').append('<span style="color:#000000; display:flex; align-items:center;justify-content: center;height:100%;"><img id="customWait" style="width:48px;height:48px;"/></span>');
				$('#customWait').attr('src',$.utility('getImage', customImg));		
				
				indicatorActionTimer = setTimeout(function(){
					$('.ui-loader').css('display', 'none');
					$("#coverlay").remove();
					$.mobile.loading('hide');
				}, parseInt(action['params']['timeout']) * 1000);
			}
		};
		
		var StopWaitIndicator = function() {
			if(indicatorActionTimer>0){
				clearTimeout(indicatorActionTimer);
			}
			$('.ui-loader span').html('');
			$.mobile.hidePageLoadingMsg();
			$('.ui-loader').css('display', 'none');
			$.mobile.loading('hide');
		    if($("#overlay")[0] != undefined)
		    	$("#overlay").remove();
		    else
		    	$("#coverlay").remove();
			callback(pagedef, ui, action, eventinitpagedef, true);
		};
		
		var ShowDialog = function() {
			var elementObject = $.utility('getUiID_Object_From_Page',$.mobileweb.getCurrentPage().getName(),target.getId());
			
			var _Left;
			if(elementObject['padding'] != undefined)
				_Left = parseFloat($(".scroller").css('left')) + parseFloat(elementObject['padding']['left']) + "px";
			else
				_Left = $(".scroller").css('left');
			var _Width =  parseFloat($('#'+target.getId()).css('width'));
//			var _Width = parseFloat($(".scroller").css('width')) - (parseFloat($('#'+target.getId()).css('padding-left')) + parseFloat($('#'+target.getId()).css('padding-right'))) + "px";
			var _cornerRadius = $('#'+target.getId()).css('border-radius');
			var _top = (parseFloat($('#' + pagedef['name']).css('height')) - parseFloat($('#' + target.getId()).css('height'))) / 2 + "px";
			$('#'+target.getId()).css({'visibility':'visible'});
			$('#'+target.getId()).css({'display':'block'});
			var _marginLeft = $('#'+target.getId()).css('padding-left');	
			var _marginRight = $('#'+target.getId()).css('padding-right');	
			
			$.each(target.children, function(i, child){
				var childObject = $.utility('getUiID_Object_From_Page',$.mobileweb.getCurrentPage().getName(),child.getId());
				if(childObject['hidden'] === "false" || childObject['hidden'] === false){
					$('#'+child.getId()).css({'visibility':'visible'});
					if(child.getViewType() === "TextButton")
						$('#'+child.getId() + '_label').css({'visibility':'visible'});
					if(child.getViewType() === "ComboBox" && childObject['editable'])
						$('#'+child.getId()+'_input').css({'visibility':'visible'});
					if(child.getViewType() === "TileList"){
						$('#'+child.getId()).children().css({'visibility':'visible'});
						$('#'+child.getId()).children().css({'display' : 'block'});
						$('#'+child.getId()).css({'visibility' : 'visible'});
						$('#'+child.getId()).css({'display' : 'block'});
					}
				}
			});
			
			$.blockUI({ message: $('#'+target.getId()),focusInput: false , css: {left :_Left,width:_Width,'margin-left':_marginLeft,'margin-right':_marginRight,'-moz-border-radius': _cornerRadius,'-webkit-border-radius': _cornerRadius, top:_top, opacity:"1",cursor:"default",border:"0px"} ,overlayCSS: { cursor:"default" }});
			callback(pagedef, ui, action, eventinitpagedef, true);
		};
		
		var HideDialog = function() {
			$('#'+target.getId()).css({'visibility':'hidden'});
			$('#'+target.getId()).css({'display':'none'});
			$.each(target.children, function(i, child){
				var childObject = $.utility('getUiID_Object_From_Page',$.mobileweb.getCurrentPage().getName(),child.getId());
				$('#'+child.getId()).css({'visibility':'hidden'});
				if(child.getViewType() === "TextButton")
					$('#'+child.getId() + '_label').css({'visibility':'hidden'});
				if(child.getViewType() === "ComboBox" && childObject['editable'])
					$('#'+child.getId()+'_input').css({'visibility':'hidden'});
				if(child.getViewType() === "Calendar")
					$('#ui-datepicker-div').css({'display':'none'});
				if(child.getViewType() === "TileList"){
					$('#'+child.getId()).children().css({'visibility':'hidden'});
					$('#'+child.getId()).children().css({'display' : 'none'});
					$('#'+child.getId()).css({'visibility' : 'hidden'});
					$('#'+child.getId()).css({'display' : 'none'});
				}
			});
			$.unblockUI();
			callback(pagedef, ui, action, eventinitpagedef, true);
		};
		
		
		return _action;
	};
	
	function UIObjectAction(pagedef, ui, action, eventinitpagedef, target, callback){
		var _action = {};
		
		_action.execute = function(){
			var flag = $.errorhandler('checkFrameParams',target, action['params'], action);
			if( eventinitpagedef == undefined){
				if(!flag){
					callback(pagedef, ui, action, eventinitpagedef, flag);
					return _action;
				}
			}
			if($.isEmptyObject(target)){
				callback(pagedef, ui, action, eventinitpagedef, flag);
				return _action;
			}
			
			switch(action['method']){
				case 'setImage':
					setImage();
					break;
				case 'setValue':
					setValue();
					break;
				case 'setColor':
					setColor();
					break;
				case 'moveObject':
					moveObject();
					break;
				case 'rotateObject':
					rotateObject();
					break;
				case 'setFrame':
					setFrame();
					break;
				case 'movingFocus':
					movingFocus();
					break;
				case 'setFocusOff':
					setFocusOff();
					break;
				default:
					callback(pagedef, ui, action, eventinitpagedef, false);
					break;
			}
			
			if(flag && (action['method']!=='setValue') && (action['method']!=='setFrame') && (action['method']!=='setColor'))
				callback(pagedef, ui, action, eventinitpagedef, flag);
			else if(flag && (action['method']=='setImage')){//Richa --> Delayed actions
				if(action['params']['targetpage'] != undefined){
					if(action['params']['targetpage'] == $.mobileweb.getCurrentPage().getName())
						callback(pagedef, ui, action, eventinitpagedef, flag);
				} 
			}
		};
		
		var setImage = function(){
 			var fin;
 			var targetValue = "";
 			if(action['params']['src']=='remote' || action['params']['src'] == "remotedb"){
 				if(action['params']['image'].indexOf("[")!=-1 && action['params']['image'].indexOf("]")!=-1 ){
  					//console.log(action['params']['image']);
  				}else
  					action['params']['image'] = action['params']['image'].replace(action['params']['image'].charAt(action['params']['image'].length - 1), "");
 				
 				targetValue = $.utility("tokenizeString", action['params']['image'], pagedef,action);
 			}else {
 				if(action['params']['src'] == "url"){
 					if(action['params']['imageName'] != undefined && action['params']['imageName'] != ""){
 						if(action['params']['image'] != action['params']['imageName'])
 							action['params']['image'] = action['params']['imageName'];
 					}
 				}
 				
 				if(action['params']['image'].indexOf("[")!=-1 && action['params']['image'].indexOf("]")!=-1 ){
 					fin=action['params']['image'].substring(action['params']['image'].indexOf("[") + 1,action['params']['image'].indexOf("]") );
 					//fin=fin.replace("]", "");
 					if(eventinitpagedef!== undefined){
 						if(eventinitpagedef['type'] == 'BaseView' || eventinitpagedef['type'] == 'ScrollView'){
 							$.each(eventinitpagedef['children'], function(i, child){
 								if(child['name']== fin){
 									if(action['params']['reference'])
 										targetValue=action['params']['image'].replace("[" + fin + "]",child['src']);
 									else
 										targetValue=action['params']['image'].replace("[" + fin + "]",child['value']);
 								}
 							});
 							if(eventinitpagedef['toolbartop'] != undefined && eventinitpagedef['toolbarbottom'] != undefined){
 								$.each(eventinitpagedef['toolbartop']['children'], function(i, child){
 									if(child['name']== fin){
 										if(action['params']['reference'])
 	 										targetValue=action['params']['image'].replace("[" + fin + "]",child['src']);
 	 									else
 	 										targetValue=action['params']['image'].replace("[" + fin + "]",child['value']);
 									}
 								});
 								$.each(eventinitpagedef['toolbarbottom']['children'], function(i, child){
 									if(child['name']== fin){
 										if(action['params']['reference'])
 	 										targetValue=action['params']['image'].replace("[" + fin + "]",child['src']);
 	 									else
 	 										targetValue=action['params']['image'].replace("[" + fin + "]",child['value']);
 									}
 								});
 								if(eventinitpagedef['toolbarleft'] != undefined){
 									$.each(eventinitpagedef['toolbarleft']['children'], function(i, child){
 										if(child['name']== fin){
 											if(action['params']['reference'])
 		 										targetValue=action['params']['image'].replace("[" + fin + "]",child['src']);
 		 									else
 		 										targetValue=action['params']['image'].replace("[" + fin + "]",child['value']);
 										}
 									});
 								}
 								if(targetValue == "" && eventinitpagedef['data'] != undefined && eventinitpagedef['data']['contents'] != undefined){
 									if(eventinitpagedef['data']['contents'].constructor == Array){
 										$.each(eventinitpagedef['data']['contents'], function(key, content){
 											$.each(content, function(childKey, value){
 												if(childKey== fin){
 													targetValue=action['params']['image'].replace("[" + fin + "]",value);
 												}
 											});
 										});
 									}else{
 										$.each(eventinitpagedef['data']['contents'], function(key, value){
 											if(key== fin){
 												targetValue=action['params']['image'].replace("[" + fin + "]",value);
 											}
 										});
 									}
 								}
 							}
 						}else {
 							if(eventinitpagedef['type'].toString().toLowerCase().indexOf('table') != -1){
 								if(eventinitpagedef['children'][0]['style'].toString().toLowerCase() == 'custom'){
 									var id = '';
 									try{
 										id = ui.getId().substr(0, ui.getId().lastIndexOf('-'));
 									}catch(e){
 										id = ui['id'].toString().substr(0, ui['id'].lastIndexOf('-'));
 									}
 									var findRowId = id.substr(id.lastIndexOf('-')+1, id.length);
 									
 									if(isNaN(findRowId)){
 										try{
 											findRowId = ui.getId().substr(ui.getId().lastIndexOf('-')+1, ui.getId().length);
 	 									}catch(e){
 	 										findRowId = ui['id'].substr(ui['id'].lastIndexOf('-')+1, ui['id'].length);
 	 									}
 									}
 									
 									var _targetChildFound = false;
 									if(!isNaN(findRowId)){
 										$.each(eventinitpagedef['children'][0]['group'], function(i, groupcontents){
 	 										$.each(groupcontents['row'], function(j, row){
 	 											if(row['rownum'] == findRowId){
 	 												$.each(row['children'], function(j, children){
 	 													if(children['name'] == fin){
 	 														targetValue = action['params']['image'].replace("[" + fin + "]",children['value']);
 	 														_targetChildFound = true;
 	 													}
 	 												});
 	 											}
 	 										});
 	 									});
 	 									if(!_targetChildFound)
 	 										targetValue = $.utility('tokenizeString', action['params']['image'],eventinitpagedef,action);
 									}
 								}else{
 									targetValue=fin=$.utility('tokenizeString', action['params']['image'],pagedef,action);
 								}
 								
 								if(eventinitpagedef['toolbartop'] != undefined && eventinitpagedef['toolbarbottom'] != undefined){
 									$.each(eventinitpagedef['toolbartop']['children'], function(i, child){
 										if(child['name']== fin)
 											targetValue=action['params']['image'].replace("[" + fin + "]",child['value']);
 									});
 									$.each(eventinitpagedef['toolbarbottom']['children'], function(i, child){
 										if(child['name']== fin)
 											targetValue=action['params']['image'].replace("[" + fin + "]",child['value']);
 									});
 								}
 								if(eventinitpagedef['toolbarleft'] != undefined){
 									$.each(eventinitpagedef['toolbarleft']['children'], function(i, child){
 										if(child['name']== fin)
 											targetValue=action['params']['image'].replace("[" + fin + "]",child['value']);
 									});
 								}
 								
 							}else{
 								targetValue=fin=$.utility('tokenizeString', action['params']['image'],pagedef,action);
 							}
 						}
 						targetValue=$.utility('tokenizeString', targetValue,pagedef,action);
 						
 					}else{
 						targetValue=fin=$.utility('tokenizeString', action['params']['image'],pagedef,action);//$.utility('CheckAndGetUIElementValue',$("[name='"+fin+ "']"), fin, pagedef);
 					}
 				}
 				else
 					targetValue=$.utility('tokenizeString', action['params']['image'],pagedef,action);
 			}
 				
 			switch (target.getViewType())
 			{ 			
	 			case 'TextButton':
	 				if($('#' + target.getId()).attr('src') != undefined){
 						if(action['params']['src']=='remote' || action['params']['src']=='remotedb'){
 							if(targetValue.indexOf("http") != -1){
 								$('#' + target.getId()).attr('src',targetValue);
 							}else{
 								$('#' + target.getId()).attr('src',$.utility('getRemoteImage', targetValue));
 							}
  						}else if(action['params']['src']=='bundle'){
  							$('#' + target.getId()).attr('src',$.utility('getImage', targetValue));
  						}else{ 
  							$('#' + target.getId()).attr("src", targetValue);
  						}
 					}
					break;
				
 				case 'ImageButton':
 					var animateTimer = 0;
 					if(action['params']['animateTime'] != undefined){
 						animateTimer = parseInt(action['params']['animateTime']) * 1000;
 					}
 					
	 				target.setValue(targetValue);
	 				if(action['params']['src']=='remote' || action['params']['src']=='remotedb'){
	 					target.setSource("remotedb");
	 					$('#'+target.getId()+'>[name="foregroundimage"]').attr('src',$.mobileweb['baseurl'] +"/images/" + targetValue);
	 				}else if(action['params']['src']=='bundle'){
	 					target.setSource("bundle");
	 					$('#'+target.getId()+'>[name="foregroundimage"]').attr('src',$.utility('getImage', targetValue));
	 				}else{ 
	 					target.setSource("local");
	 					$('#' + target.getId()+'>[name="foregroundimage"]').attr("src", targetValue);
	 				}
	 				if(animateTimer > 0){
						if(targetValue.toString().length != 0){
							$('#' + target.getId()).fadeOut('fast', function(){
								$('#' + target.getId()).fadeIn(animateTimer);
							});
						}
						else{
							$('#' + target.getId()).fadeOut(animateTimer, function(){
								$('#' + target.getId()).fadeIn('fast');									
							});
						}
					}
	 				break;
 				
 				case 'ToggleButton':
 					if((targetValue=='ImageButton_toggle_on.png')||(targetValue=='ImageButton_toggle_off.png'))
 						$('input#' + target.getId()).attr('src',$.utility('getSystemImage', targetValue,target.getViewType()));
 					else{
  						if(action['params']['src']=='remote' || action['params']['src']=='remotedb'){
  							$('input#' + target.getId()).attr('src',$.mobileweb['baseurl'] +"/images/" + targetValue);
  						}else if(action['params']['src']=='bundle'){
  							$('input#' + target.getId()).attr('src',$.utility('getImage', targetValue));
  						}else{ 
  							$('input#' + target.getId()).attr("src", targetValue);
  						}
  					}
 					break;
 					
 				default:
 					var animateTimer = 0;
 					if(action['params']['animateTime'] != undefined){
 						animateTimer = parseInt(action['params']['animateTime']) * 1000;
 					}
 					if($('#' + target.getId()).attr('src') === undefined)
 						callback(pagedef, ui, action, eventinitpagedef, false);
 					else{
 						if(action['params']['reference'])
 							$('#' + target.getId()).attr("src", targetValue); 							
 						else if(action['params']['src']=='remote' || action['params']['src']=='remotedb'){
 							if(targetValue.indexOf("http") != -1){
 								$('#' + target.getId()).attr('src',targetValue);
 							}else{
 								$('#' + target.getId()).attr('src',$.utility('getRemoteImage', targetValue));
 							}
 							target.setValue(targetValue);
 							target.setSource("remoteFile");
 							
 						}else if(action['params']['src']=='url'){
 							if(targetValue.indexOf("http") == -1){
 								if(targetValue.charAt(0) == '/'){
 									targetValue = $.mobileweb['baseurl'] + targetValue;
 								}else{
 									targetValue = $.mobileweb['baseurl'] + "/" + targetValue;
 								}
 								
 								$('#' + target.getId()).attr('src',targetValue/*.toString().replace(/\/\/(?![\s\S]*\/\/)/, "/")*/);
 								
 							}else{
 								if(targetValue.match(/\/\/(?![\s\S]*\/\/)/) != null && targetValue.match(/\/\/(?![\s\S]*\/\/)/).length > 1){
 									$('#' + target.getId()).attr('src',targetValue.toString().replace(/\/\/(?![\s\S]*\/\/)/, "/"));
 								}else{
 									$('#' + target.getId()).attr('src',targetValue);
 								}
 							}
 							
 							if(animateTimer > 0){
 								if(targetValue.toString().length != 0){
 									$('#' + target.getId()).fadeOut('fast', function(){
 										$('#' + target.getId()).fadeIn(animateTimer);
 									});
 								}
 								else{
 									$('#' + target.getId()).fadeOut(animateTimer, function(){
 										$('#' + target.getId()).fadeIn('fast');									
 									});
 								}
 							}
 							
 						}else if(action['params']['src']=='bundle'){
 							if(animateTimer > 0){
 								var currentSrc = $('#' + target.getId()).attr('src');
 								var speed = (currentSrc!=='') ? 'slow' : 'fast';
 								
 								if(targetValue.toString().length != 0){
 									$('#' + target.getId()).fadeOut(speed, function(){
 										$('#' + target.getId()).fadeIn(animateTimer);
 										setTimeout(function(){
 											$('#' + target.getId()).attr('src',$.utility('getImage', targetValue.toString().replace(/\/\/(?![\s\S]*\/\/)/, "/")));
 										},500);
 									});
 								}
 								else{
 									$('#' + target.getId()).fadeOut(animateTimer, function(){
 										$('#' + target.getId()).fadeIn(speed);									
 										$('#' + target.getId()).attr('src',"");
 									});
 								}
 							}
 							else{
 								$('#' + target.getId()).attr('src',$.utility('getImage', targetValue.toString().replace(/\/\/(?![\s\S]*\/\/)/, "/")));
 							}
 							
 						}else{ 
 							//console.log(action['params']['src'],"---->", targetValue);
 							$('#' + target.getId()).attr("src", targetValue);
 						}
 						
 						//it will override target's 'src', like we are overriding in 'SetMainValue' action. Need to check further.
 						target.setValue(targetValue);
 						
 						//In case of set image perform after 'take photo', action must have 'Camera' UI reference 
 						var imageName = action['params']['image'].replace("[","").replace("]","");// Bug fix #11913
 						var refUI = $.getUI(imageName, ui, "");
 						if(refUI && !$.isEmptyObject(refUI)){
 							if(refUI.getViewType() === "Camera"){
 								target.setImageName(target.getId()+"_cam.png");
 								if(target.getTemplate() !== action['params']['image'])
 									target.setTemplate(action['params']['image']);
 							}
 						}
 					}
 			}
 		};
		
		var setValue = function(){
			var viewtype = target.getViewType();
			var property='';
			var tempTargeValue ='';
			action['params']['value'] = $.utility('checkGlobalVariable', action['params']['value']);
			if(action['params']['key'].indexOf("[")!=-1 && action['params']['key'].indexOf("]")!=-1 ){
				property=action['params']['key'].replace("[", "").replace("]", "");
				property=$.utility('CheckAndGetUIElementValue',$("[name='"+property+ "']"), property, pagedef).toLowerCase();
			}
			else{
				property=action['params']['key'].toLowerCase();
			}
			
			//If Key is empty....errorHandling alertbox appears
			if((property =='')||(property == undefined)){
				errorHandlingSetValue();
			}
			else{
				var allProperty = ["text","placeholder","textalignment","editable","enable","hidden","value","borderwidth","style","state","scale","ontext","offtext","currentposition","startindicator","stopindicator","hidewhenstopped","loadchart","keyboardtype","minrange","maxrange","jpyears","type","secure"];
				if(jQuery.inArray(property, allProperty) == -1){
					console.log('SetValue action :--', "'"+ property +"' is not a valid key.");
					callback(pagedef, ui, action, eventinitpagedef, false);//In case of error
					return;
				}
			}
			
			var fin;
			var value=null;
			if(action['params']['value'].indexOf("[")!=-1 && action['params']['value'].indexOf("]")!=-1 ){
				fin=action['params']['value'].replace("[", "");
				fin=fin.replace("]", "");
				if(eventinitpagedef!== undefined ){
					tempTargetValue =  action['params']['value'];
					var chunks = action['params']['value'].split("[");
					for ( var i = 0; i < chunks.length; i++) {
					
						if (chunks[i].toString().indexOf("]") != -1) {
							var j = chunks[i].indexOf("]");
							var org = "[" + chunks[i].substring(0, j) + "]";
							fin=chunks[i].substring(0, j);
							
							if(eventinitpagedef['type'] == 'BaseView' || eventinitpagedef['type'] == 'ScrollView'){
								$.each(eventinitpagedef['children'], function(i, child){
									if(child['name']== fin){
										tempTargetValue=tempTargetValue.replace(org, child['value']);
										value = tempTargetValue;
									}
								});
								if(eventinitpagedef['toolbartop'] != undefined && eventinitpagedef['toolbarbottom'] != undefined){
									$.each(eventinitpagedef['toolbartop']['children'], function(i, child){
										if(child['name']== fin){
											tempTargetValue=tempTargetValue.replace(org, child['value']);
											value = tempTargetValue;
										}
									});
									$.each(eventinitpagedef['toolbarbottom']['children'], function(i, child){
										if(child['name']== fin){
											tempTargetValue=tempTargetValue.replace(org, child['value']);
											value = tempTargetValue;
										}
									});
								}
								if(eventinitpagedef['toolbarleft'] != undefined){
									$.each(eventinitpagedef['toolbarleft']['children'], function(i, child){
										if(child['name']== fin){
											tempTargetValue=tempTargetValue.replace(org, child['value']);
											value = tempTargetValue;
										}
									});
								}
								if(eventinitpagedef['data'] != undefined && eventinitpagedef['data']['contents'] != undefined){
									if(eventinitpagedef['data']['contents'].constructor == Array){
										$.each(eventinitpagedef['data']['contents'], function(key, content){
											$.each(content, function(childKey, value){
												if(childKey== fin){
													tempTargetValue=tempTargetValue.replace(org, value);
													value = tempTargetValue;
												}
											});
										});
									}else{
										$.each(eventinitpagedef['data']['contents'], function(key, value){
											if(key== fin){
												tempTargetValue=tempTargetValue.replace(org, value);
												value = tempTargetValue;
											}
										});
									}
								}
							
								if(value === null){
									tempTargetValue = tempTargetValue.replace(org, $.utility('tokenizeString',org,pagedef,action));
									value = tempTargetValue;
								}

						}else {
							if(eventinitpagedef['type'] === "RemoteTableViewList" || eventinitpagedef['type'] === "DBTableViewList" ){
								if(ui['rownum'] != undefined){
									$.each(eventinitpagedef['data']['contents'][ui['rownum']], function(key, value){
										if(key== fin){
											tempTargetValue=tempTargetValue.replace(org, value);
											value = tempTargetValue;
										}
									});
								}else{
								 var rownum = ui.getName().substring(ui.getName().lastIndexOf("-") + 1,ui.getName().length);
								 $.each(eventinitpagedef['data']['contents'][rownum], function(key, value){
										if(key== fin){
											tempTargetValue=tempTargetValue.replace(org, value);
											value = tempTargetValue;
										}
									});
								}

								if(eventinitpagedef['toolbartop'] != undefined && eventinitpagedef['toolbarbottom'] != undefined){
									$.each(eventinitpagedef['toolbartop']['children'], function(i, child){
										if(child['name']== fin){
											tempTargetValue=tempTargetValue.replace(org, child['value']);
											value = tempTargetValue;
										}

									});
									$.each(eventinitpagedef['toolbarbottom']['children'], function(i, child){
										if(child['name']== fin){
											tempTargetValue=tempTargetValue.replace(org, child['value']);
											value = tempTargetValue;
										}

									});
								}
								if(eventinitpagedef['toolbarleft'] != undefined){
									$.each(eventinitpagedef['toolbarleft']['children'], function(i, child){
										if(child['name']== fin){
											tempTargetValue=tempTargetValue.replace(org, child['value']);
											value = tempTargetValue;
										}
									});
								}
							}else{
								$.each(eventinitpagedef['data']['contents'], function(i, contents){
									$.each(contents, function(key, value){
										if(key== fin){
											tempTargetValue=tempTargetValue.replace(org, value);
											value = tempTargetValue;
										}
									});

								});
								if(eventinitpagedef['toolbartop'] != undefined && eventinitpagedef['toolbarbottom'] != undefined){
									$.each(eventinitpagedef['toolbartop']['children'], function(i, child){
										if(child['name']== fin){
											tempTargetValue=tempTargetValue.replace(org, child['value']);
											value = tempTargetValue;	
										}

									});
									$.each(eventinitpagedef['toolbarbottom']['children'], function(i, child){
										if(child['name']== fin){
											tempTargetValue=tempTargetValue.replace(org, child['value']);
											value = tempTargetValue;
										}
									});
								}
								if(eventinitpagedef['toolbarleft'] != undefined){
									$.each(eventinitpagedef['toolbarleft']['children'], function(i, child){
										if(child['name']== fin){
											tempTargetValue=tempTargetValue.replace(org, child['value']);
											value = tempTargetValue;
										}
									});
								}
							}
						}
					 }
				  }

			  }else{
				if(pagedef['type'] === "RemoteTableViewList" || pagedef['type'] === "DBTableViewList" ){
					if(ui['rownum'] != undefined){
						$.each(pagedef['data']['contents'][ui['rownum']], function(key, value){
							if(key== fin){
								value=value;
							}
						});
					}
					
					if(pagedef['toolbartop'] != undefined && pagedef['toolbarbottom'] != undefined){
						$.each(pagedef['toolbartop']['children'], function(i, child){
							if(child['name']== fin)
								value=child['value'];
						});
						$.each(pagedef['toolbarbottom']['children'], function(i, child){
							if(child['name']== fin)
								value=child['value'];
						});
					}
					if(pagedef['toolbarleft'] != undefined){
						$.each(pagedef['toolbarleft']['children'], function(i, child){
							if(child['name']== fin)
								value=child['value'];
						});
					}
				}else if(pagedef['type'] == 'BaseView' || pagedef['type'] == 'ScrollView'){
					value=$.utility('tokenizeString',action['params']['value'],pagedef,action);
				}else{
					$.each(pagedef['data']['contents'], function(i, contents){
						$.each(contents, function(key, value){
							if(key== fin){
								value=value;
							}
						});

					});
					if(pagedef['toolbartop'] != undefined && pagedef['toolbarbottom'] != undefined){
						$.each(pagedef['toolbartop']['children'], function(i, child){
							if(child['name']== fin)
								value=child['value'];
						});
						$.each(pagedef['toolbarbottom']['children'], function(i, child){
							if(child['name']== fin)
								value=child['value'];
						});
					}
					if(pagedef['toolbarleft'] != undefined){
						$.each(pagedef['toolbarleft']['children'], function(i, child){
							if(child['name']== fin)
								value=child['value'];
						});
					}
				}
				
				// now Check for SplitCSV Data..
				if((value == undefined || value=="") && ($.utility('GetCSVData').length > 0)){
					var csvDataArray = $.utility('GetCSVData');
					var chunks = action['params']['value'].split("[");
					for ( var i =0; i < chunks.length; i++) {
						if (chunks[i].indexOf("]") != -1) {
							var j = chunks[i].indexOf("]");
							var org = "[" + chunks[i].substring(0, j) + "]";
							for(var object in csvDataArray){
								if(chunks[i].substring(0, j).indexOf("-") != -1){
									var finArray = chunks[i].substring(0, j).split("-");
									if(csvDataArray[object]['prefix'] === finArray[0]){
										// Iterate through inner Array...
										for(var data in csvDataArray[object]['rowData']){
											if(finArray[1] === data){
												value = value + "" +csvDataArray[object]['rowData'][data].replace('"','').replace('"','');
											}
										}
									}
								}
							}
						}
					}
				}
			  }

		    }else {
		       	value = $.utility("tokenizeString", action['params']['value'], pagedef,action);
		    }

			if(viewtype == 'NumericField'){
				if((property === 'text' || property === 'placeholder') && isNaN(value)){
					errorHandlingSetValue();	
					return ;
				}
			}
			
			var parents = $('#'+target.getId()).parents();
			var isToolbarParent = false;
			$.each(parents,function(i,child){	
				if((child['id'].indexOf("_toolbar") != -1 || child['id'].indexOf("ToolBar") != -1)){//Bug #12362 fix
					isToolbarParent = true;
				}
			});
			
			$.each(parents,function(i,child){	
				if(child.id == "pageOverlayContent"){
					isToolbarParent = true;
				}
			});
			
			var target_pos = parseInt($('#'+target.getId()).css('z-index'));
			if(!(target_pos > 1000 || isToolbarParent)){														// Bug #10913 Fix -->> means target ui-part is not on Sidebar or Gadget pop-up for 'table-view' type pages.
				if(pagedef['type'] == 'DBTableViewList' || pagedef['type']=="RemoteTableViewList"){			// Bug #6961 Fix -->> if page is 'table-view', then setvalue will take on each row of such page. so here 'target' is page itself. 
					viewtype = pagedef['type'];
					target = $.mobileweb.getCurrentPage();
				}
			}
			
			// Bug #12461 fix
			if(pagedef['type'] == 'DBTableViewList' || pagedef['type']=="RemoteTableViewList"){
				var isCellNotParent = false;
				$.each(parents,function(i,child){	
					if((child['id'].indexOf("_toolbar") != -1 || child['id'].indexOf("ToolBar") != -1)){
						isCellNotParent = true;
					}
				});
				
				var isUINotCell = false;
				if(ui != null && ui != undefined){
					var uiParents = $('#'+ui.getId()).parents();
					$.each(uiParents,function(i,child){	
						if((child['id'].indexOf("_toolbar") != -1 || child['id'].indexOf("ToolBar") != -1)){
							isUINotCell = true;
						}
					});
					
					var target_pos = parseInt($('#'+ui.getId()).css('z-index'));
					if(target_pos > 1000)
						isUINotCell = true;
				}
				
				if(!isUINotCell && !isToolbarParent){
						viewtype = "row";
				}
			}
			
			switch(viewtype){
				case 'Label': 
					var arr = [ "text", "textalignment","hidden" , "borderwidth"];
					if(jQuery.inArray(property, arr)!=-1)
						callSetValue(value);
					else 
						errorHandlingSetValue();
	
					break;
				case 'TextField': 
				case 'NumericField':
					var arr =  [ "text", "placeholder","textalignment","editable", "borderwidth","hidden","keyboardtype","secure" ];
					if(jQuery.inArray(property, arr)!=-1)
						callSetValue(value);
					else 
						errorHandlingSetValue();
					break;
				case 'RoundButton':
				case 'CheckBox':
				case 'TextButton':
					var arr =  [ "text","textalignment","hidden","enable" ];
					if(jQuery.inArray(property, arr)!=-1)
						callSetValue(value);
					else 
						errorHandlingSetValue();
					break;
				case 'SystemButton':
					var arr =  [ "style","hidden","enable" ];
					if(jQuery.inArray(property, arr)!=-1)
						callSetValue(value);
					else 
						errorHandlingSetValue();
					break;
				case 'ToggleButton':
					var arr =  [ "ontext","offtext","hidden", "value","enable" ];
					if(jQuery.inArray(property, arr)!=-1)
						callSetValue(value);
					else 
						errorHandlingSetValue();
					break;
	
				case 'TextArea':
					var arr =  [ "text", "placeholder","textalignment","editable", "borderwidth","hidden","keyboardtype"];
					if(jQuery.inArray(property, arr)!=-1)
						callSetValue(value);
					else
						errorHandlingSetValue();
					break;
				case 'GoogleMap':
					var arr = ["currentposition","scale","hidden"];
					if(jQuery.inArray(property, arr)!=-1)
						callSetValue(value);
					else
						errorHandlingSetValue();
					break;
				case 'Indicator':
	
					var arr = ["startindicator","stopindicator","hidewhenstopped","hidden"];
					if(jQuery.inArray(property, arr)!=-1)
						callSetValue(value);
					else 
						errorHandlingSetValue();
					break;
				case 'Image':
					var arr =  ["borderwidth","hidden"];
					if(jQuery.inArray(property, arr)!=-1)
						callSetValue(value);
					else
						errorHandlingSetValue();
					break;
				case 'Picker':
					var arr =  ["value","hidden","enable"];
					if(jQuery.inArray(property, arr)!=-1)
						callSetValue(value);
					else
						errorHandlingSetValue();
					break;
				case 'Segment':		
					var arr=["state","hidden","enable"];
					if(jQuery.inArray(property, arr)!=-1)
						callSetValue(value);
					else
						errorHandlingSetValue();
					break;
				case 'WebView':	
					var arr=["hidden","enable","loadchart"];
					if(jQuery.inArray(property, arr)!=-1)
						callSetValue(value);
					else
						errorHandlingSetValue();
					break;
				case 'ImageButton':	
				case 'SwitchBar':
				case 'SearchBar':
				case 'ProgressBar':
				case 'ComboBox':
					var arr=["hidden","enable","placeholder"];
					if(jQuery.inArray(property, arr)!=-1)
						callSetValue(value);
					else
						errorHandlingSetValue();
					break;
				case 'Slider':
				case 'DatePicker':
				case 'VideoBox':
				case 'SoundBox':
				case 'TileList':	
				case 'Camera':
					var arr=["hidden","enable"];
					if(jQuery.inArray(property, arr)!=-1)
						callSetValue(value);
					else
						errorHandlingSetValue();
					break;
				case 'Calendar':
					var arr=["hidden","enable","minrange","maxrange","jpyears","type"];
					if(jQuery.inArray(property, arr)!=-1)
						callSetValue(value);
					else
						errorHandlingSetValue();
					break;
				case 'Radio':
	 				var arr=["hidden"];
	 				if(jQuery.inArray(property, arr)!=-1)
	 					callSetValue(value);
	 				else
	 					errorHandlingSetValue();
	 				break;
	 			//Richa--->Bug #6961 Fix
				case 'DBTableViewList':
				case 'RemoteTableViewList':
					var arr = ["text","placeholder","textalignment","editable","enable","hidden","value","borderwidth","style","state","scale","ontext","offtext","currentposition","startindicator","stopindicator","hidewhenstopped"];
					if(jQuery.inArray(property, arr)!=-1)
						callSetValue(value);
					else
						errorHandlingSetValue();
					break;
				case 'row':break;
				default :
					errorHandlingSetValue();
				break;
			}
			
			function callSetValue(value){
				switch(property){
					case 'textalignment': 
						$('#'+target.getId()).css({'text-align':value});
						break;
						
					case 'text': 	
						if(viewtype=='TextField' || viewtype=='NumericField' || viewtype=='Label' || viewtype=='TextArea'){
							target.setValue(value);
							if(target.getValue() === "__LAT__"){
								target.setValue($("#targetLatitude_"+$.GMapService('getMapName')).text());
							}else if(target.getValue() === "__LONG__"){
								target.setValue($("#targetLongitude_"+$.GMapService('getMapName')).text());
							}else if(target.getValue() === "__ADDRESS__" ){
								target.setValue($("#__ADDRESS__").val());
							}else if(target.getValue() === "__ROUTETIME__" ){
								target.setValue($("#__ROUTETIME__").val());
							}else if(target.getValue() === "__ROUTEDISTANCE__" ){
								target.setValue($("#__ROUTEDISTANCE__").val());
							}
						}else if((viewtype=='RoundButton')||(viewtype=='TextButton'))
							$('#'+target.getId()+' .ui-btn-text').text(value);
						else if(viewtype=='CheckBox')
							$('label[for=\'' + target.getId()+target.getName() +'\']').text(value);
						else
							$('#'+target.getId()).text(value);
						break;
						
					case 'borderwidth':
						var value= parseInt($.utility("tokenizeString", action['params']['value'], pagedef,action));
						if(viewtype=='TextField'  || viewtype=='TextArea' )
							$('#'+target.getId()).css({'border-width' :  value});
						else if(viewtype=='NumericField' )
							$('#'+target.getId()).css({'border-style':'solid','border-width' :value});
						else if((viewtype=='RoundButton')||(viewtype=='TextButton'))
							$('#'+target.getId()+' .ui-btn-text').text(value);
						else if(viewtype=='CheckBox')
							$('label[for=\'' + target.getId()+target.getName() +'\']').text(value);
						else if(viewtype=='Image'){
							if($('#'+target.getId()+'_divImg') != undefined)	
								$('#'+target.getId()+'_divImg').css({'border-style':'solid','border-width' :value});
							else
								$('#'+target.getId()).css({'border-style':'solid','border-width' :value});
						}
						else if(viewtype=='Label')
								$('#'+target.getId()+'_p').css({'border-style':'solid','border-width' : value});
						else
							$('#'+target.getId()).text(value);
						
						break;
						
					case 'ontext':	
						if(viewtype=='ToggleButton'){
							var uiobject = $.utility('getUiID_Object_From_Page',pagedef['name'],target.getId());
							uiobject['selectedtitle'] = value;
							if(uiobject['value'] == true)
								$('label[for=\'' + target.getId() +'\']').text(value);
						}
						break;
						
					case 'offtext':	
						if(viewtype=='ToggleButton'){
							var uiobject = $.utility('getUiID_Object_From_Page',pagedef['name'],target.getId());
							uiobject['title'] = value;
							//uiobject['events']['Off'][1]['params']['value'] = value;
							if(uiobject['value'] == false)
								$('label[for=\'' + target.getId() +'\']').text(value);
						}
						break;
	
					case 'placeholder': 
						$('#'+target.getId()).attr('placeholder',value);
						$('#'+target.getId()+"_input").attr('placeholder',value);
						break;
						
					case 'editable': 
						if(value=='true'){
							if(viewtype == "TextField"){
								$('#'+target.getId()).removeClass("ui-disabled mobile-textinput-disabled ui-state-disabled");
								$('#'+target.getId()).removeAttr('disabled');
							}
							$('#'+target.getId()).removeAttr('readonly');
						}							
						else{
							if(viewtype == "TextField"){
								$('#'+target.getId()).addClass("ui-disabled mobile-textinput-disabled ui-state-disabled");
								$('#'+target.getId()).prop("disabled",true);
							}
							$('#'+target.getId()).prop("readonly",true);

						}
						
						target.propagateReadOnly(value);
						
						break;
						
					case 'hidden': 						
						if(value.toString().toLowerCase() === "true"){
							if(target.getViewType() === "Image"){
								setTimeout(function(){
									var elementObject = $.utility('getUiID_Object_From_Page',$.mobileweb.getCurrentPage().getName(),target.getId());
									elementObject['hidden'] = "true";
									$('#'+target.getId()).css({'visibility':'hidden'});
									if($('#'+target.getId()+'_divImg') != undefined)	
										$('#'+target.getId()+'_divImg').css({'visibility':'hidden'});
								}, 20)
							}else if(target.getViewType() === "TextButton"){
								target.setHiddenProperty(value.toString().toLowerCase());
								var elementObject = $.utility('getUiID_Object_From_Page',$.mobileweb.getCurrentPage().getName(),target.getId());
								elementObject['hidden'] = "true";
							}else if(viewtype=='TextField' || viewtype=='NumericField' || viewtype=='Label' || viewtype=='TextArea'){
								if($('#'+target.getId()) != undefined)
	 								target.setVisibility(false);
							}else if(target.getViewType() === "ImageButton"){
								$('#'+target.getId()).css({'visibility':'hidden'});
								$('#'+target.getId()).css({'display':'none'});
								
							}else if(target.getViewType() === "Radio"){
	 							setTimeout(function(){
	 								var elementObject = $.utility('getRadio_groupObjects_From_Page',$.mobileweb.getCurrentPage().getName(),$("[id='"+target.getId()+"']"));
	 								$.each( elementObject,function (i , object){
	 									object['hidden'] = "true";
	 									$("[id='"+object['id']+"']").css({'visibility':'hidden'});
	 								});
	 							}, 2000)
	 						}//Richa--->Bug #6961 Fix
							else if(target.getViewType() === "DBTableViewList" || target.getViewType() === "RemoteTableViewList"){
	 							if(pagedef['children'] != undefined){
	 								$.each(pagedef['children'],function(i,child){
										$.each(child['group'],function(k,group){
											$.each(group['row'],function(l,row){
												$.each(row['children'],function(m,elements){
													if(target.getViewType() === "RemoteTableViewList"){
	  													var rownum = elements.id.split('-');
	  	 												num = rownum.length;
	  	 												rownum = rownum[num-2];	
	  	 												if(elements.name == action['name'] || elements.name == action['name']+'-'+rownum){
	  	 												    $('#'+elements.id).css({'visibility':'hidden'});
	  	 												    $('#'+elements.id).css({'display':'none'});
	  	 												}
	  												}else{
														if(elements.name == action['name']){
														    $('#'+elements.id).css({'visibility':'hidden'});
														    $('#'+elements.id).css({'display':'none'});
														}
													}
												});
											});
										});
	 								});
	 							}
	 						}else if(target.getViewType() === "TileList"){
	 							if($('#'+target.getId()) != undefined)
	 								target.setVisibility(false);
	 						}else if(target.getViewType() === "Camera"){
	 							$('#'+target.getId()).css({'visibility':'hidden'});
	 							if($('#'+target.getId()+'_canvas') != undefined)
	 								$('#'+target.getId()+'_canvas').css({'visibility':'hidden'});
	 						}else if(target.getViewType() === "DatePicker"){
	 							if($('#'+target.getId()) != undefined)
	 								target.setVisibility(false);
	 						}else if(target.getViewType() === "Calendar"){
	 							if($('#'+target.getId()) != undefined)
	 								target.setVisibility(false);
	 						}else if(target.getViewType() === "ComboBox"){
	 							if($('#'+target.getId()) != undefined)
	 								target.setVisibility(false);
	 						}else if(target.getViewType() === "ProgressBar"){
	 							if($('#'+target.getId()) != undefined)
	 								target.setVisibility(false);
	 						}
	 						else{
								$('#'+target.getId()).css({'visibility':'hidden'});
							}
	
						}else{
							
							if(target.getViewType() === "SoundBox"){
								$('#'+target.getId()).css({'visibility':'visible'});
								$('#'+target.getId()).find('.audioPlayer_play').addClass('visible');
								$('#'+target.getId()).find('.audioPlayer_pause').removeClass('visible');
								$("#" + target.getId() + "> marquee").text(target.getValue());
	
								$('#'+target.getId()+' audio').attr('src',target.getValue());
								$("#" +target.getId()).trigger('loadedmetadata');
								$("#" + target.getId()).trigger('timeupdate');
								$('#'+target.getId()+' > Label').css({'visibility': 'visible'});
	
							}else if(viewtype=='TextField' || viewtype=='NumericField' || viewtype=='Label' || viewtype=='TextArea'){
								if($('#'+target.getId()) != undefined)
	 								target.setVisibility(true);
							}else if(target.getViewType() === "TextButton"){
								target.setHiddenProperty(value.toString().toLowerCase());
								var elementObject = $.utility('getUiID_Object_From_Page',$.mobileweb.getCurrentPage().getName(),target.getId());
								elementObject['hidden'] = "false";
							}else if(target.getViewType() === "Image"){
								setTimeout(function(){
									var elementObject = $.utility('getUiID_Object_From_Page',$.mobileweb.getCurrentPage().getName(),target.getId());
									elementObject['hidden'] = "false";
									$('#'+target.getId()).css({'visibility':'visible'});
									if($('#'+target.getId()+'_divImg') != undefined)	
										$('#'+target.getId()+'_divImg').css({'visibility':'visible'});
								}, 20)
								
							}else if(target.getViewType() === "ImageButton"){
								$('#'+target.getId()).css({'visibility':'visible'});
								$('#'+target.getId()).css({'display':'block'});
							}else if(target.getViewType() === "Radio"){
	 							setTimeout(function(){
	 								var elementObject = $.utility('getRadio_groupObjects_From_Page',$.mobileweb.getCurrentPage().getName(),$("[id='"+target.getId()+"']"));
	 								$.each( elementObject,function (i , object){
	 									object['hidden'] = "false";
	 									$("[id='"+object['id']+"']").css({'visibility':'visible'});
	 								});
	 							}, 2000)	
							}//Richa--->Bug #6961 Fix
							else if(target.getViewType() === "DBTableViewList" || target.getViewType() === "RemoteTableViewList"){
	 							if(pagedef['children'] != undefined){
	 								$.each(pagedef['children'],function(i,child){
										$.each(child['group'],function(k,group){
											$.each(group['row'],function(l,row){
												$.each(row['children'],function(m,elements){
													if(target.getViewType() === "RemoteTableViewList"){
	  													var rownum = elements.id.split('-');
	  	 												num = rownum.length;
	  	 												rownum = rownum[num-2];	
	  	 												if(elements.name == action['name'] || elements.name == action['name']+'-'+rownum){
	  	 												    $('#'+elements.id).css({'visibility':'visible'});
	  	 												    $('#'+elements.id).css({'display':'block'});
	  	 												}
	  												}else{
														if(elements.name == action['name']){
														    $('#'+elements.id).css({'visibility':'visible'});
														    $('#'+elements.id).css({'display':'block'});
														}
													}
												});
											});
										});
	 								});
	 							}
	 						}else if(target.getViewType() === "TileList"){
	 							if($('#'+target.getId()) != undefined)
	 								target.setVisibility(true);
							}else if(target.getViewType() === "Camera"){
	 							$('#'+target.getId()).css({'visibility':'visible'});
	 							if($('#'+target.getId()+'_canvas').get(0) != undefined)
	 								$('#'+target.getId()+'_canvas').css({'visibility':'visible'});
	 							else{
	 								if(target.getCameraErrorFlag()){
	 									target.drawCanvas();
	 	 								$('#'+target.getId()+'_canvas').attr("width",target.frame.getFrame()['width'] *$.mobileweb.device['aspectratio']);
	 	 								$('#'+target.getId()+'_canvas').attr("height",target.frame.getFrame()['height'] *$.mobileweb.device['aspectratio']);
	 	 								$('#'+target.getId()+'_canvas').attr("style","top:"+target.frame.getFrame()['y'] *$.mobileweb.device['aspectratio']+"px;left:"+target.frame.getFrame()['x'] *$.mobileweb.device['aspectratio']+"px; position:absolute");
	 								}
	 							}
	 						}else if(target.getViewType() === "DatePicker"){
	 							if($('#'+target.getId()) != undefined)
	 								target.setVisibility(true);
	 						}else if(target.getViewType() === "Calendar"){
	 							if($('#'+target.getId()) != undefined)
	 								target.setVisibility(true);
	 						}else if(target.getViewType() === "ComboBox"){
	 							if($('#'+target.getId()) != undefined)
	 								target.setVisibility(true);
	 						}else if(target.getViewType() === "ProgressBar"){
	 							if($('#'+target.getId()) != undefined)
	 								target.setVisibility(true);
	 						}
							else{
								$('#'+target.getId()).css({'visibility':'visible'});
							}
						}
						break;
						
					case 'style':	
						var value= $.utility("tokenizeString", action['params']['value'], pagedef,action);
						if(value == 'Add' || value== 'Detail' ||value== 'Info Light'|| value== 'Info Dark')	{
							target.setStyle(value);
							callback(pagedef, ui, action, eventinitpagedef, true);
						}
						else
							errorHandlingSetValue();
						break;
						
					case 'currentposition':
						$.GMapService('setValueForMap',target, value, action['params'],action);
						break;
						
					case 'scale':	
						var zoomValue = $.utility("tokenizeString", action['params']['value'], pagedef,action);
						$.GMapService('SetScale',target, zoomValue, action['params']);	
						break;
								
					case 'value': 
						var valueArray = value.split(",");
						if(target.getViewType() === "ToggleButton"){
							target.setValue(value,"SV");
						}else if($('#'+target.getId()).find(' .pickerTable tr')){	// Picker...
							$('#'+target.getId()).find("table").each(function(k, table){
							var valueToSet = valueArray[k];
							$(table).find('tr').each(function(i,row){
							$(row).removeClass('activeRow');
								if($(row).attr('val') != undefined && $(row).attr('val') == valueToSet){
								$(row).addClass('activeRow');
								}
							});
						});
						target.triggerEvent();
						}
						break;
						
					case 'state':	
						var	targetValue = value;
						if(targetValue == "null" || !targetValue) {
							target.resetValue();													
						}else{
							var id = target.findItemId(targetValue);
							if(id != undefined){
								$("#"+id).trigger("tap");
							}else{
								callback(pagedef, ui, action, eventinitpagedef, false);
							}
						}
						break;
						
					case 'startindicator': 
						if(value =="false"){
							//Need Further Discussion
						}
						else {
							var uiobject = $.utility('getUiID_Object_From_Page',pagedef['name'],target.getId());
							if(uiobject['start'] == "true"){
								errorHandlingSetValue();
							}
							else {
								target.removeImage();
								uiobject['start']= "true";
								target.applyOverrides();
								$('#'+target.getId()).css({'visibility':'true'});
								callback(pagedef, ui, action, eventinitpagedef, true);
							}
						}
						break;
						
					case 'stopindicator': 
						if(value =="false"){
							//Need Further Discussion
						}
						else {
							var uiobject = $.utility('getUiID_Object_From_Page',pagedef['name'],target.getId());
							if(uiobject['start'] == "true"){
								uiobject['stop']= "true";
								uiobject['start']= "false";
								target.applyOverrides();
								callback(pagedef, ui, action, eventinitpagedef, true);
							}
						}
						break;
						
					case 'hidewhenstopped' :
						$('#'+target.getId()).css({'visibility':'hidden'});
						break;
									
					case 'enable':
						if(value=='true'){
							$('#'+target.getId()).css({"opacity": "1", "pointerEvents":"auto"});
							$('#'+target.getId()).find('*').css({"opacity": "1","pointerEvents":"auto"});
						}
						else{
							$('#'+target.getId()).css({"opacity": "0.65", "pointerEvents":"none"});
							$('#'+target.getId()).find('*').css({"opacity": "0.65","pointerEvents":"none"});
						}
						break;
						
					case 'loadchart':
						if(viewtype=='WebView'){
							target.loadContent(value);
						}
						break;
						
					case 'keyboardtype':
						if(viewtype == "TextField" || viewtype == "NumericField" || viewtype == "TextView")
							target.setKeyboardType(value);
						break;
						
					case 'minrange':
						if(viewtype == "Calendar")
							target.setMinRange(value);
						break;
						
					case 'maxrange':
						if(viewtype == "Calendar")
							target.setMaxRange(value);
						break;
						
					case 'jpyears':
						if(viewtype == "Calendar")
							target.setJPEra(value);
						break;
						
					case 'type':
						if(viewtype == "Calendar")
							target.setCalendarType(value);
						break;
					case 'secure':
						if(viewtype == "TextField" || viewtype == "NumericField")
							target.setSecure(value);
						break;
						
			}
			
			//On Success Event
			if(property !== 'currentposition' && property !== 'startindicator' && property !== 'stopindicator' && property !== 'style'){
				//On success and onerror event for map is handled in Gmap.js and CallSetValue Method.
				callback(pagedef, ui, action, eventinitpagedef, true);
			} 
		}
			
//		var getValue = function(){
//			var viewtypeTarget = target.getViewType();
//			var source = $.getUI(sourceUIPart, ui, "");
//			var viewtypeSource = source.getViewType();
//			var property='';
//			var tempTargeValue ='';
//			if(action['params']['key'].indexOf("[")!=-1 && action['params']['key'].indexOf("]")!=-1 ){
//				property=action['params']['key'].replace("[", "").replace("]", "");
//				property=$.utility('CheckAndGetUIElementValue',$("[name='"+property+ "']"), property, pagedef).toLowerCase();
//			}
//			else{
//				property=action['params']['key'].toLowerCase();
//			}
//			
//			//If Key is empty....errorHandling alertbox appears
//			if((property =='')||(property == undefined)){
//				errorHandlingSetValue();
//			}
//			else{
//				var allProperty = ["text","placeholder","textalignment","editable","enable","hidden","value","borderwidth","style","state","scale","ontext","offtext","currentposition","startindicator","stopindicator","hidewhenstopped","loadchart"];
//				if(jQuery.inArray(property, allProperty) == -1){
//					console.log(property +"' is not a valid key.");
//					callback(pagedef, ui, action, eventinitpagedef, false);//In case of error
//					return;
//				}
//			}
//					
//			switch(viewtypeSource){
//				case 'Label': 					
//				case 'TextField': 
//				case 'NumericField':					
//				case 'RoundButton':
//				case 'CheckBox':
//				case 'TextButton':					
//				case 'SystemButton':					
//				case 'ToggleButton':					
//				case 'TextArea':					
//				case 'GoogleMap':					
//				case 'Indicator':					
//				case 'Image':					
//				case 'Picker':					
//				case 'Segment':					
//				case 'WebView':						
//				case 'ImageButton':	
//				case 'SwitchBar':
//				case 'SearchBar':
//				case 'ProgressBar':
//				case 'ComboBox':
//				case 'Slider':
//				case 'DatePicker':
//				case 'VideoBox':
//				case 'SoundBox':
//				case 'TileList':	
//				case 'Camera':
//				case 'Calendar':					
//				case 'Radio':
//					targeValue = callGetValue(property);
//					setTargetValue(property,targeValue);
//				default :
//					errorHandlingSetValue();
//				break;
//			}
//			
//			function callGetValue(property){
//				tempTargeValue = $("#" + source.getId()).css(property);
//				return tempTargeValue;
//			}
//			
//			function setTargetValue(property,value){
//				$("#" + target.getId()).css({property:value});
//			}
//		}
			
		function errorHandlingSetValue(){
			
			var pagetitle = $.mobileweb.getCurrentPage().getTitle();
			if(pagedef['pageTitle'] && pagedef['pageTitle'] != $.mobileweb.getCurrentPage().getTitle())
 				pagetitle = pagedef['pageTitle'];
			  
			var eng="Action problem. Page: "+pagetitle+" , Description: Invalid Key Name passed for the given UI Object while applying "+action['method']+" action.";
			var jap="";//"ãƒšãƒ¼ã‚¸ ï¼š "+pagetitle+" ,ã�«ã�Šã�‘ã‚‹ã‚¢ã‚¯ã‚·ãƒ§ãƒ³ã�®å•�é¡Œã�§ã�™ã€‚ :"+action['method']+" ã�®ã‚¢ã‚¯ã‚·ãƒ§ãƒ³ã�«ã�Šã�„ã�¦ã€�UI ã‚ªãƒ–ã‚¸ã‚§ã‚¯ãƒˆã�¸æ¸¡ã�—ã�Ÿã‚­ãƒ¼å��ã�Œä¸�æ­£ã�§ã�™ã€‚";
			if((action['events']== undefined) || (action['events']['Error']== undefined) || (action['events']['Error'].length==0)){
				$.errorhandler('alertBox',eng,jap);
				callback(pagedef, ui, action, eventinitpagedef, false);
			}else
				callback(pagedef, ui, action, eventinitpagedef, false);
			}
			
			
		};
			
		
		var setColor = function(){
 			var flag = true;//$.errorhandler('checkTargetUIObject',target, action['params'], action);
 			if(!flag){
 				callback(pagedef, ui, action, eventinitpagedef, false);
 				return _action;
 			}
 			if($.isEmptyObject(target)){
 				callback(pagedef, ui, action, eventinitpagedef, false);
 				return;
 			}
 			if(target.getViewType() === "Indicator" || target.getViewType() === "ImageButton" || target.getViewType() === "GoogleMap"){
 				callback(pagedef, ui, action, eventinitpagedef, false);
 				return;
 			}
 			
 			var colorCount = 0;
 			if( action['params']['setProperties']){
 				for(var prop in action['params']['setProperties']){
 					if(prop == "font" && action['params']['setProperties'][prop]){
 						if(target.getViewType() == "RoundButton"){		
 							$('#'+target.getId()+' .ui-btn-text').css('color',action['params']['color']);
 							colorCount++;
 						}else if (target.getViewType() == "TextButton" || target.getViewType() == "ToggleButton"){
 							$('label[for='+target.getId()+']').css('color',action['params']['color']);
 							colorCount++;
 						}else if(target.getViewType() == "Segment" ){
 							$('#'+target.getId()+ '>tbody'+ '>tr'+ '>td').css('color',action['params']['color']);
 							colorCount++;							
 						}else if(target.getViewType() == "SearchBar" ){ // Added SearchBar setColor property for bug Id:7266
							$('#'+target.getId()+ '>div'+' >input').css('color',action['params']['color']);
 							colorCount++;							
 						}else if(target.getViewType() == "Image" ){
 							//Do Nothing
 						}else{
 							$('#'+target.getId()).css('color',action['params']['color']);
 							colorCount++;
 						}
 
 					}else if(prop == "border" && action['params']['setProperties'][prop]){
 						if(target.getViewType() == "Label" ){
 							$('#'+target.getId()+ "_p").css('border-color',action['params']['color']);
 							colorCount++;
 						}else if(target.getViewType() == "TextArea" ){
 							$('#'+target.getId()).css('border-width','1px');
 							$('#'+target.getId()).css('border-color',action['params']['color']);
 							colorCount++;
 						}else if(target.getViewType() == "Segment" ){
 							$('#'+target.getId()+ '>tbody'+ '>tr'+ '>td').css('border-color',action['params']['color']);
 							colorCount++;	
 						}else if(target.getViewType() == "SearchBar" ){
							$('#'+target.getId()+ '>div').css('border-color',action['params']['color']);
 							colorCount++;							
 						}else{
 							$('#'+target.getId()).css('border-color',action['params']['color']);
 							colorCount++;
 						}
 
 					}else if(prop == "background" && action['params']['setProperties'][prop]){
 						if(target.getViewType() == "RoundButton" ){
 							target.setBackgroundColor(action['params']['color']);
 							colorCount++;
 						}else if (target.getViewType() == "ToggleButton"){
 						}else if (target.getViewType() == "Segment"){
 							$('#'+target.getId() + '>tbody'+ '>tr'+ '>td').css('background',action['params']['color']);
 							colorCount++;	
 						}else if (target.getViewType() == "Label"){
 							$('#'+target.getId() + "_p").css('background-color',action['params']['color']);
 							var colors = action['params']['color'].substring(action['params']['color'].indexOf("(") + 1, action['params']['color'].indexOf(")")).split(",");
 							target.setBackgroundColor({red:colors[0], blue:colors[2], green: colors[1], alpha:colors[3]});
 							$('#'+target.getId()).css({'text-shadow':'0px 0px '});
 							colorCount++;	
						}else if(target.getViewType() == "SearchBar" ){
 							$('#'+target.getId()+ '>div').css('background-color',action['params']['color']);
 							colorCount++;							
						}else if(target.getViewType() == "Image" ){
 							//Do Nothing
 						}
						else{
 							$('#'+target.getId()).css('background',action['params']['color']);
							$('#'+target.getId()).css({'text-shadow':'0px 0px '});
							colorCount++;							
						}
					}
				
					$.utility("updateChildProperty", pagedef, target.getName(), action['params']['color'], prop+'.color');
				}
				
				if(colorCount != 0){
					callback(pagedef, ui, action, eventinitpagedef, true);
 				}
 				else 
 					callback(pagedef, ui, action, eventinitpagedef, false);
 			}else{
 				$('#'+target.getId()).css('background',action['params']['color']);
 				callback(pagedef, ui, action, eventinitpagedef, true);
 			}
 			//Added by Richa--
  			var timer = setInterval(function(){
  				clearInterval(timer);
  				var obj = $('#'+target.getId()+' .ui-btn-text');				
  				if(obj!=null){
  					var rgb = obj.css("color");
  					if(rgb!=undefined){
  						rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
 	 					var r = parseInt(rgb[1]);
 	 					var g = parseInt(rgb[2]);
 	 					var b = parseInt(rgb[3]);
 	 					var color = {page_name:pagedef['name'],u_id:$('#'+target.getId()).attr("id"),color:{red:r,green:g,blue:b,alpha:1}};
 	 					$.utility('setSessionData',color,"colorObject");
  					}
  				}
  			},1000);//--		  
 		};
	
		
		var moveObject = function(){
			var x = 0;
			var y = 0;
			if((action['params']['x'].indexOf("[") != -1 && action['params']['x'].indexOf("]") != -1 ) && (action['params']['y'].indexOf("[") != -1  && action['params']['y'].indexOf("]") != -1) ){
				 x = parseInt($.utility("tokenizeString", action['params']['x'], pagedef,action));
				 y = parseInt($.utility("tokenizeString", action['params']['y'], pagedef,action));
			}else if(action['params']['x'].indexOf("[") != -1 && action['params']['x'].indexOf("]") != -1){
				 x = parseInt($.utility("tokenizeString", action['params']['x'], pagedef,action));
				 y = parseInt(action['params']['y']);
			}else if(action['params']['y'].indexOf("[") != -1 && action['params']['y'].indexOf("]") != -1){
				 x = parseInt(action['params']['x']);
				 y = parseInt($.utility("tokenizeString", action['params']['y'], pagedef,action));
			}else{
				 x = parseInt(action['params']['x']);
				 y = parseInt(action['params']['y']);
			}
			if(!isNaN(parseInt(x)) && !isNaN(parseInt(y))){
				//Bug 13042 fix
				var _targetLeft = parseInt($("#"+target.getId()).css("left"));
				var _targetTop = parseInt($("#"+target.getId()).css("top"));
				if(target.getViewType() === "Image"){
					_targetLeft = parseInt($('#'+target.getId()+"_divImg").css("left"));
					_targetTop = parseInt($('#'+target.getId()+"_divImg").css("top"));
				}
				
				//Bug 12791 fix
				var previousX = _targetLeft;
				x = x *$.mobileweb.device['aspectWratio'];
				var newX = x+ previousX;
				var previousY = _targetTop;
				y = y * $.mobileweb.device['aspectHratio']; 
				var newY = y+ previousY;
				
				var duration = action['params']['duration']+'s';
				if(target.getViewType() === "Label"){
					$('#'+target.getId()+"_p").css({'left': newX+'px','top':newY +'px'});
					$('#'+target.getId()).css({'left': newX+'px','top':newY +'px'});
				}else if(target.getViewType() === "Image"){
					$('#'+target.getId()+"_divImg").css({'left': newX+'px','top':newY +'px'});
					$('#'+target.getId()).css({'left': newX+'px','top':newY +'px'});
				}else{
					 $('#'+target.getId()).css({'left': newX+'px','top':newY +'px', 'transition-timing-function': 'linear', 'transition-property': 'left top','transition-duration': duration});
				}
				
				$.utility("updateChildProperty", pagedef, target.getName(), newX, 'frame.x');
 				$.utility("updateChildProperty", pagedef, target.getName(), newY, 'frame.y');
				var time = parseInt(duration.replace("s",""))*1000;
				var timer = setInterval(function(){
							clearInterval(timer);
							var pos = {top:$('#'+target.getId()).css("top"),left:$('#'+target.getId()).css("left")};
							var loc = {page_name:pagedef['name'],u_id:$('#'+target.getId()).attr("id"),framedata:pos};				
							$.utility('setSessionData',loc,"moveObject");				
					},time);		  
				callback(pagedef, ui, action, eventinitpagedef, true);
			}else{
				callback(pagedef, ui, action, eventinitpagedef, false);
			}
		};
		
		var setFrame = function(){	
			var x = (pagedef['data']['contents'][0]) ? $.utility('extractDataFromRecord', pagedef['data']['contents'][0], action['params']['x']) : $.utility("tokenizeString", action['params']['x'], pagedef,action);
			var y = (pagedef['data']['contents'][0]) ? $.utility('extractDataFromRecord', pagedef['data']['contents'][0], action['params']['y']) : $.utility("tokenizeString", action['params']['y'], pagedef,action);
			var width = (pagedef['data']['contents'][0]) ? $.utility('extractDataFromRecord', pagedef['data']['contents'][0], action['params']['width']) : $.utility("tokenizeString", action['params']['width'], pagedef,action);
			var height = (pagedef['data']['contents'][0]) ? $.utility('extractDataFromRecord', pagedef['data']['contents'][0], action['params']['height']) : $.utility("tokenizeString", action['params']['height'], pagedef,action);
			
			var parents = $('#'+target.getId()).parents();
			var isParentPageOveray = false;
			var dailogid = "";
			$.each(parents,function(i,child){	
				//if(child.id == "pageOverlayContent"){
				if(child.id.indexOf("dialog_") > -1){
					isParentPageOveray = true;
					dailogid = child.id.split("dialog_")[1];
				}
			});

			var dialogObject = $.utility('getUiID_Object_From_Page',$.mobileweb.getCurrentPage().getName(),dailogid);
			if(isParentPageOveray && dialogObject['showheader'])
			    y = parseInt(y) + 30;
			
			if(!isNaN(parseInt(x)) && !isNaN(parseInt(y)) && !isNaN(parseInt(width)) && !isNaN(parseInt(height))){
				x = x *$.mobileweb.device['aspectWratio'];
				y = y *$.mobileweb.device['aspectHratio'];
				width = width *$.mobileweb.device['aspectWratio'];
				height = height *$.mobileweb.device['aspectHratio'];

				if(target.getViewType()=='Label'){
					$('#'+target.getId()+'_p').css({'left':x+'px','top':y+'px','width':width+'px','height':height+'px'});
				}
				else if(target.getViewType()=='Slider'){
					$('#'+target.getId()+'>div').css({'top':'0px','width':((parseInt(action['params']['width'])-32)*$.mobileweb.device['aspectWratio'])+'px'});
					$('#'+target.getId()+'>div').css({'margin-top':(height - $('#'+target.getId()+'>div').height())/2+'px'});
					$('#'+target.getId()+'>div').css({'margin-left':(width - $('#'+target.getId()+'>div').width())/2+'px'});
					$('#'+target.getId()).css({'left':x+'px','top':y+'px','width':width+'px','height':height+'px'});
				}
				else{
					if(target.getViewType()=='Image'){
						$('#'+target.getId()+'_divImg').css({'left':x+'px','top':y+'px','width':width+'px','height':height+'px'});
					}
					if(target.getViewType()=='TextButton'){
						if($('#'+target.getId()).is("img")){
							var _diffX = x - parseFloat($('#'+target.getId()).css('left'));
							var _diffY = y - parseFloat($('#'+target.getId()).css('top'));
							var _diffW = width - parseFloat($('#'+target.getId()).css('width'));
							var _diffH = height - parseFloat($('#'+target.getId()).css('height'));
							
							var _lblX = parseFloat($('#'+target.getId()+'_label').css('left')) + _diffX;
							var _lblY = parseFloat($('#'+target.getId()+'_label').css('top')) + _diffY;
							var _lblW = parseFloat($('#'+target.getId()+'_label').css('width')) + _diffW;
							var _lblH = parseFloat($('#'+target.getId()+'_label').css('height')) + _diffH;
							
							$('#'+target.getId()+'_label').css({'left':_lblX+'px','top':_lblY+'px','width':_lblW+'px','height':_lblH+'px'});	
						}
					}
					$('#'+target.getId()).css({'left':x+'px','top':y+'px','width':width+'px','height':height+'px'});
					$('#'+target.getId()+' div').css({'width':width+'px','height':height+'px'});
				}
				$.utility("updateChildProperty", pagedef, target.getName(), action['params']['x'], 'frame.x');
				$.utility("updateChildProperty", pagedef, target.getName(), action['params']['y'], 'frame.y');
				$.utility("updateChildProperty", pagedef, target.getName(), action['params']['width'], 'frame.width');
				$.utility("updateChildProperty", pagedef, target.getName(), action['params']['height'], 'frame.height');
				callback(pagedef, ui, action, eventinitpagedef, true);
			}else{
				callback(pagedef, ui, action, eventinitpagedef, false);
			}
		};
		
		var rotateObject = function(){
			var tardetId = target.getId();
			count++;
			var obj = null;
			if(target.getViewType() == "Label"){
				obj=$("#"+target.getId()+'_p');
			}else if(target.getViewType() == "Image"){
				obj=$("#"+target.getId()+'_divImg');
			}else{
				obj=$("#"+target.getId());
			}
			var angle=0;
			if($.utility('getSessionData',"rotateObject",tardetId)!=null)
			{
				var rotate = $.utility('getSessionData',"rotateObject",tardetId);
				rotateObj = $.parseJSON(rotate);		
				if($.mobileweb.getCurrentPage().getName()==rotateObj["page_name"] && tardetId==rotateObj["u_id"]){				
					angle = rotateObj["rotation"];			
				}
			}else{
				var matrix =obj.css("-webkit-transform") ||
				obj.css("-moz-transform")    ||
				obj.css("-ms-transform")     ||
				obj.css("-o-transform")      ||
				obj.css("transform");
				if(matrix != undefined && matrix !== 'none') {

					var values = matrix.split('(')[1].split(')')[0].split(',');
					var a = values[0];
					var b = values[1];
					angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
				} 
			}

			var x=parseInt($.utility("tokenizeString", action['params']['x'], pagedef,action));
			var y=parseInt($.utility("tokenizeString", action['params']['y'], pagedef,action));
			var degree =parseInt($.utility("tokenizeString", action['params']['degree'], pagedef,action));

			if(isNaN(parseInt(x)) || isNaN(parseInt(y)) || isNaN(parseInt(degree))){		
				callback(pagedef, ui, action, eventinitpagedef, false);
			}else{
				try{
					var targetFrame = target['frame'].getFrame();
					var targetLeft = parseInt($("#"+target.getId()).css("left").replace("px", ""));
					var targetWidth = parseInt($("#"+target.getId()).css("width").replace("px", ""));
					var targetTop = parseInt($("#"+target.getId()).css("top").replace("px", ""));
					var targetHeight = parseInt($("#"+target.getId()).css("height").replace("px", ""));
					var base = x*$.mobileweb.device['aspectratio'] - (targetLeft + (targetWidth/2));	
					var height = y*$.mobileweb.device['aspectratio']- (targetTop + (targetHeight/2));

					if(count == 1){
						radius = Math.sqrt(Math.pow(base,2)+Math.pow(height,2)); 
					}
					var angleInRad = degree * Math.PI / 180;
					var newX = (radius*(Math.cos(degree -360))) ;
					var newY =(radius*(Math.sin(degree -360)));
					var targetRotate = $("#"+target.getId());
					// --- Finding chord---
					var chordLength = 2 * radius * Math.sin(angleInRad/2);

				}catch(e){
					console.log(e);
				}
				var duration = action['params']['duration']+'s';
				if(target.getViewType() == "Label"){
					$('#'+target.getId()+"_p").animate ({"rotation": "+="+degree}, 
							{step: function (angle, fx) {$(this).css ({"transform":"rotate("+angle+"deg)"});
							}, duration: 3000}, "linear");
				}else if(target.getViewType() == "Image"){
					$('#'+target.getId()+"_divImg").animate ({"rotation": "+="+degree}, 
							{step: function (angle, fx) {$(this).css ({"transform":"rotate("+angle+"deg)"});
							}, duration: 3000}, "linear");
				}else{
					$('#'+target.getId()).css({
						'filter':'progid:DXImageTransform.Microsoft.BasicImage(rotation='+degree/100+')',
						'-ms-transform':'rotate('+(parseInt(angle)+parseInt(degree))+'deg)',
						'-ms-filter':'progid:DXImageTransform.Microsoft.BasicImage(rotation='+degree/100+')',
						'-moz-transform':'rotate('+(parseInt(angle)+parseInt(degree))+'deg)',
						'-o-transform':'rotate('+degree +'deg)',
						'transform': 'rotate('+(parseInt(angle)+parseInt(degree))+'deg)',
						 'transition-duration': duration,
						'-webkit-transform':'rotate('+(parseInt(angle)+parseInt(degree))+'deg)',
					});
				}
				var time = parseInt(duration.replace("s",""))*1000;
				var timer = setInterval(function(){
					clearInterval(timer);				
					var angle1 = {page_name:pagedef['name'],u_id:tardetId,rotation:(angle+degree)};
					$.utility('setSessionData',angle1,"rotateObject");				
				},time);		  
			}

		};
		
		var movingFocus = function(){
			var flag = $.errorhandler('checkTargetUIObject',target, action['params'], action);
			if(!flag){
				callback(pagedef, ui, action, eventinitpagedef, false);
				return _action;
			}
			
			var timer = setInterval(function(){
				    clearInterval(timer);
					if( action['params']['targetUI']){
						if(target.getViewType() == "RoundButton" || target.getViewType() == "TextButton"){
							$('#'+target.getId()+'>div').focus();
						}else if (target.getViewType() == "Label"){
							$('#'+target.getId()+'_p').focus();
						}else 
							$('#'+target.getId()).focus();
					}
			},200);
		};
		
		var setFocusOff = function(){
			var flag = $.errorhandler('checkTargetUIObject',target, action['params'], action);
			if(!flag){
				callback(pagedef, ui, action, eventinitpagedef, false);
				return _action;
			}
			if( action['params']['targetUI']){
				if(target.getViewType() == "RoundButton" || target.getViewType() == "TextButton"){
					$('#'+target.getId()+'>div').blur();
				}else if (target.getViewType() == "Label"){
					$('#'+target.getId()+'_p').blur();
				}else 
					$('#'+target.getId()).blur();
			}
		};
		
		return _action;
	};
	
	function EmailControllerAction(pagedef, ui, action, eventinitpagedef, target, callback){
		var _action = {};
		_action.execute = function(){
			switch(action['method']){
				case 'CanSendEmail':
					CanSendEmail();
					break;
				case 'OpenMessageEditor':
					OpenMessageEditor();
					break;
				default:
					callback(pagedef, ui, action, eventinitpagedef, false);
					break;
			}
		};
		
		var CanSendEmail = function(){
			if(navigator.onLine)
				callback(pagedef, ui, action, eventinitpagedef, true);
			else
				callback(pagedef, ui, action, eventinitpagedef, false);
		};
			
		var OpenMessageEditor = function(){	
			var timeoutID = window.setTimeout(function(){window.location=action['params']['mail']}, 1000);
		};	
	
		return _action;
		
	};
	
	function DBAction(pagedef, ui, action, eventinitpagedef, target, callback){
		var _action = {};
		_action.execute = function(){
			// for browser which do not support LocalDB..
			if(!window.openDatabase){
				$.utility('queryDatabase',false);
				return _action;
			}
		
			var flag = $.errorhandler('checkErrorForDB',target, action['params']);
			if(!flag){
				callback(pagedef, ui, action, eventinitpagedef, false);
			}
		
			switch(action['method']){
				case 'Select':
					Select();
					break;
				case 'LocalDBSelect':
					action['localDBSelect'] = true;
					Select();
					break;
				case 'Insert':
					Insert();
					break;
				case 'Update':
					Update();
					break;
				case 'NumRecords':
					NumRecords();
					break;
				case 'Delete':
					Delete();
					break;
				case 'DeleteAll':
					DeleteAllRecords();
					break;
				
				default:
					callback(pagedef, ui, action, eventinitpagedef, false);
					break;
			}
		};
		
		var Select = function(){
			$.utility('queryDatabase',true);
			var whereCondition = "";
			var rowNum;
			if(pagedef != null){//Bug #10600 Fix
				var actionFlag = true;
				if(pagedef['type'] === "DBTableViewList" || pagedef['type'] === "RemoteTableViewList"){
					rowNum =pagedef['data']['contents']['currentRow'];
					 if(isNaN(parseInt(rowNum))){
                    	 if(ui != undefined){
     						if(ui.getId != undefined){
     							var uiId = ui.getId();
     							var tempStr = uiId;
     							if(ui.getViewType() != "Row")
     								tempStr = uiId.substr(0, uiId.lastIndexOf('-'));
     							rowNum = tempStr.substr(tempStr.lastIndexOf('-')+1, tempStr.length);
     						}
                             if(isNaN(parseInt(rowNum)))
                            	 rowNum = 0;
     					}else
     						rowNum = 0;
                     }
					 if(rowNum != undefined){
						if(pagedef['data']['contents'][rowNum] != undefined){
							whereCondition = $.utility('formWhereCondition',$.utility('extractDataFromRecord',pagedef['data']['contents'][rowNum],action['params']['where'],actionFlag));
						}else if(pagedef['data']['contents'][0] != undefined && pagedef['data']['contents'][0][rowNum] != undefined)// Bug #11323 Fix	
							whereCondition = $.utility('formWhereCondition',$.utility('extractDataFromRecord',pagedef['data']['contents'][0][rowNum],action['params']['where'],actionFlag));
					 }else
						whereCondition = $.utility('formWhereCondition',action['params']['where']);
				}
			}
			var actionWhere = action['params']['where'];
			if(whereCondition != ""){
				action['params']['where'] = whereCondition;
			}
			var queryString = [];
			if(action['params']['groupby'] && pagedef['children'][0]['accordion']){
				pagedef['data']['groupby'] = pagedef['data']['groupby'].replace('[','').replace(']','');
				queryString = ['SELECT * FROM ', pagedef['data']['tablename'], (action['params']['where']!=='')? [' WHERE ',$.utility('formWhereCondition',action['params']['where'], pagedef)].join(''):'',(pagedef['data']['groupby']!==undefined &&  pagedef['data']['groupby']!=='')? [' order by ', pagedef['data']['groupby'],' ASC '].join(''):''];
			}
			else
				queryString = ['SELECT * FROM ', action['params']['tablename'], (action['params']['where']!=='')? [' WHERE ',$.utility('formWhereCondition',action['params']['where'], pagedef)].join(''):'', (action['params']['order']!==undefined &&  action['params']['order']!=='')? [' ORDER BY ', action['params']['order']].join(''):'', (action['params']['limit']!==undefined &&  action['params']['limit']!=='')? [' LIMIT ', action['params']['limit']].join(''):'',(action['params']['offset']!==undefined &&  action['params']['offset']!=='')? [' OFFSET ', action['params']['offset']].join(''):''];
			
			action['params']['where'] =  actionWhere;
			$.mobileweb['localdb']['instance'].transaction(function(tx) {
				// replaced "', action['params']['columns'], '" with "*" to resolve some issue..
				//Added limit and offset for local db optimization-->Richa
				$.utility('log',queryString.join(''));
				tx.executeSql(queryString.join(''), [],
				function(tx,result){
					var _results = [];
					for (var i=0; i<result.rows.length; i++){
						var _result = {};
						for(key in result.rows.item(i)){
							_result[key] = result.rows.item(i)[key];
						}
						_results.push(_result);
					}
					if(action['callAnotherServiceFlag'] != undefined && action['callAnotherServiceFlag']){
						if(action['callbackmethod'] === "SelectNewService"){
							var callbackData = {"page":pagedef['name'], events:action['events'],"fromTable":action['fromTable'],fromDB : action['fromDB'], toDB : action['toDB'],"table":action['params']['tablename'],"service": "LocalDB",forceFlag : action['forceFlag'],forceUpdate:action['forceUpdate'], onSuccessEvents:action['onSuccessEvents']};
							var json = {"ret" : "ACK" , "retdic": {
									"code": "",
									"recsize" : _results.length,
									rows : []
								},
							};
							json.retdic.rows = _results;
							json.callbackdata = callbackData;
							$.utility(action['callbackmethod'], json,callbackData);
						}else if(action['callbackmethod'] === "UploadDBRecords"){
							var callbackData = {"page":pagedef['name'],events:action['events'],"fromDB":"localdb","ToTable":action['toparams']['toTable'],"ToService":action['toparams']['toService'],"table":action['params']['tablename'], forceFlag : action['toparams']['forceFlag'],forceUpdate:action['toparams']['forceUpdate'],};
							callbackData.events = action['events'];
							var json = {"ret" : "ACK" , "retdic": {
									"code": "",
									"recsize" : _results.length,
									rows : []
								},
							};
							json.retdic.rows = _results;
							json.callbackdata = callbackData;
							$.utility(action['callbackmethod'], json,callbackData);
						}
					}else {
						if(action['comboCallingMethod'] != undefined) {
							var flag = false;
							var jsonObj = JSON.parse(JSON.stringify(action['comboCallingMethod']).replace(/"/g,"").replace(/'/g,"\""));
							
							$.each(pagedef['children'],function(key,child){
								if(jsonObj != undefined && jsonObj['uiobject']['ui'] === "comboBox"){
									if(child['viewtype'] == "Dialog"){
										$.each(child['dataArray'][0]['children'],function(index,dialogchild){
											if(jsonObj['uiobject']['id'] === dialogchild['id']){
												flag = true;
												$.each(_results,function(i,data){
													child['dataArray'][0]['children'][index]['combo_options']['optionsID'][i]=data[jsonObj['uiobject']['fieldname']];
													var chunks = jsonObj['uiobject']['displayText'].split("[");
													var displayText = jsonObj['uiobject']['displayText'];
													for ( var k = 0; k < chunks.length; k++) {
														if (chunks[k].toString().indexOf("]") != -1) {
															var j = chunks[k].indexOf("]");
															var org = "[" + chunks[k].substring(0, j) + "]";
															var fin = data[chunks[k].substring(0, j)];
															displayText = displayText.replace(org, fin);
														}
													}
													child['dataArray'][0]['children'][index]['combo_options']['optionsValue'][i]=displayText;
												});
												pagedef['comboBoxData'][dialogchild['id']] = {'isLoaded': true};
											}
										});
									}
									
									if(jsonObj['uiobject']['id'] === child['id']){
										flag = true;
										$.each(_results,function(i,data){
											pagedef['children'][key]['combo_options']['optionsID'][i]=data[jsonObj['uiobject']['fieldname']];
											var chunks = jsonObj['uiobject']['displayText'].split("[");
											var displayText = jsonObj['uiobject']['displayText'];
											for ( var k = 0; k < chunks.length; k++) {
												if (chunks[k].toString().indexOf("]") != -1) {
													var j = chunks[k].indexOf("]");
													var org = "[" + chunks[k].substring(0, j) + "]";
													var fin = data[chunks[k].substring(0, j)];
													displayText = displayText.replace(org, fin);
												}
											}
											pagedef['children'][key]['combo_options']['optionsValue'][i]=displayText;
										});
										pagedef['comboBoxData'][child['id']] = {'isLoaded': true};
									}
								}
							});
							if(!flag){
								$.each(pagedef['toolbartop']['children'],function(key,child){
									if(jsonObj != undefined && jsonObj['uiobject']['ui'] === "comboBox"){
									   if(jsonObj['uiobject']['id'] === child['id']){
										   flag = true;
										   $.each(_results,function(i,data){
											   pagedef['toolbartop']['children'][key]['combo_options']['optionsID'][i]=data[jsonObj['uiobject']['fieldname']];
											   var chunks = jsonObj['uiobject']['displayText'].split("[");
											   var displayText = jsonObj['uiobject']['displayText'];
											   for ( var k = 0; k < chunks.length; k++ ) {
												   if (chunks[k].indexOf("]") != -1) {
													   var j = chunks[k].indexOf("]");
													   var org = "[" + chunks[k].substring(0, j) + "]";
													   var fin = data[chunks[k].substring(0, j)];
													   displayText = displayText.replace(org, fin);
												   }
											   }
											   pagedef['toolbartop']['children'][key]['combo_options']['optionsValue'][i]=displayText;
										   });
										   pagedef['comboBoxData'][child['id']] = {'isLoaded': true};
									   }
								   }
							   });
							}
							if(!flag){
								$.each(pagedef['toolbarbottom']['children'],function(key,child){
									if(jsonObj != undefined && jsonObj['uiobject']['ui'] === "comboBox"){
										if(jsonObj['uiobject']['id'] === child['id']){
											flag = true;
											$.each(_results,function(i,data){
											   pagedef['toolbarbottom']['children'][key]['combo_options']['optionsID'][i]=data[jsonObj['uiobject']['fieldname']];
											   var chunks = jsonObj['uiobject']['displayText'].split("[");
											   var displayText = jsonObj['uiobject']['displayText'];
											   for ( var k = 0; k < chunks.length; k++ ) {
												   if (chunks[k].indexOf("]") != -1) {
													   var j = chunks[k].indexOf("]");
													   var org = "[" + chunks[k].substring(0, j) + "]";
													   var fin = data[chunks[k].substring(0, j)];
													   displayText = displayText.replace(org, fin);
												   }
											   }
											   pagedef['toolbarbottom']['children'][key]['combo_options']['optionsValue'][i]=displayText;
											});
											pagedef['comboBoxData'][child['id']] = {'isLoaded': true};
									   }
									}
								});
							}
							if(!flag){
								$.each(pagedef['toolbarleft']['children'],function(key,child){
								   if(jsonObj != undefined && jsonObj['uiobject']['ui'] === "comboBox"){
									   if(jsonObj['uiobject']['id'] === child['id']){
										   flag = true;
										   $.each(_results,function(i,data){
											   pagedef['toolbarleft']['children'][key]['combo_options']['optionsID'][i]=data[jsonObj['uiobject']['fieldname']];
											   var chunks = jsonObj['uiobject']['displayText'].split("[");
											   var displayText = jsonObj['uiobject']['displayText'];
											   for ( var k = 0; k < chunks.length; k++ ) {
												   if (chunks[k].indexOf("]") != -1) {
													   var j = chunks[k].indexOf("]");
													   var org = "[" + chunks[k].substring(0, j) + "]";
													   var fin = data[chunks[k].substring(0, j)];
													   displayText = displayText.replace(org, fin);
												   }
											   }
											   pagedef['toolbarleft']['children'][key]['combo_options']['optionsValue'][i]=displayText;
										   });
										   pagedef['comboBoxData'][child['id']] = {'isLoaded': true};
									   }
								   	}
								});
							}
							$.utility('queryDatabase',false);
						}else if(action['spotdetails'] != undefined && action['spotdetails']){
							$.each(pagedef['children'],function(key,child){
								var jsonObj = JSON.parse(JSON.stringify(action['childdef']).replace(/"/g,"").replace(/'/g,"\""));
								if(jsonObj['uiobject']['ui'] === "GoogleMap" && jsonObj['uiobject']['id'] === child['id']){
									if(pagedef['spotdetails'][child['id']] != undefined){
										pagedef['spotdetails'][child['id']]['data']=_results;
										pagedef['spotdetails'][child['id']]['isLoaded'] = true;
										
									}
								}
							});

							$.utility('queryDatabase',false);

						}else if(action['addMarker'] != undefined && action['addMarker']){
							if(_results.length != 0){
								pagedef['markerExistFlag'] = true;
							}else{
								pagedef['markerExistFlag'] = false;
							}

							$.utility('queryDatabase',false);

						}else{
							var tempData = $.utility('clone',pagedef);
							
							if(pagedef['type']==='DBTableView'){ //For DBTableview , if it is a firstpage with no parent page.
								if(pagedef['reverse'] != undefined && pagedef['reverse']){
									jQuery.extend(_results[0],pagedef['data']['contents'][0]);
								}
								
								if(pagedef['data']['contents'][0] != undefined){
									jQuery.extend(pagedef['data']['contents'][0],_results[0]);
								}else{
									pagedef['data']['contents'][0] = _results[0];
								}
								
							}else if(pagedef['type']==='DBTableViewList' || pagedef['type']==='RemoteTableViewList'){
								
								if(pagedef['reverse'] != undefined){
									if(pagedef['reverse']){
										if(tempData['data']['contents'].length == 0){
											jQuery.extend(pagedef['data']['contents'],_results);
										}else{
											for (var i = 0; i < _results.length; i++) {
												if(pagedef['data']['contents'][i] != undefined){
													jQuery.extend(pagedef['data']['contents'][i],_results[i]);
												}else{
													pagedef['data']['contents'][i]=_results[i];
												}
											}
											if(_results.length>0)
												pagedef['data']['contents'] = pagedef['data']['contents'].splice(0,_results.length);
										}
									}else{
										if(tempData['data']['contents'].length == 0){
											jQuery.extend(pagedef['data']['contents'],_results);
										}else{
											//Below code is implementation for managing 'previous page data' to 'next' page. Dated : 23-Oct-2017
											var tmpContents = [];
 											if(action['localDBSelect'] != undefined && action['localDBSelect']){
												//
											}else{
												if(pagedef['parent'].indexOf('Tab') == -1 && pagedef['data']['pagedata'] == undefined){
	 												var tmpPageData = pagedef['data']['contents'].splice(0,1)
	 												pagedef['data']['pagedata'] = $.utility('clone', tmpPageData[0]);
	 											}
												
												if(_results.length > 0){
													pagedef['data']['contents'] = [];
													for (var i = 0; i < _results.length; i++) {
														pagedef['data']['contents'][i] = jQuery.extend({}, pagedef['data']['pagedata'], _results[i]);
													}
												}else{
													if(pagedef['data']['tablename'] == action['params']['tablename']){
 														pagedef['data']['contents'] = [];
 													}
 												}
											}
											
										}
									}
								}else{
									if(tempData['data']['contents'].length == 0){
										jQuery.extend(pagedef['data']['contents'],_results);
									}else{
										if(action['localDBSelect'] != undefined && action['localDBSelect']){
											//
										}else{
											if(_results.length > 0){
												if(pagedef['data']['pagedata'] != undefined){
													pagedef['data']['contents'] = [];
													for (var i = 0; i < _results.length; i++) {
														pagedef['data']['contents'][i] = jQuery.extend({}, pagedef['data']['pagedata'], _results[i]);
													}
												}else{
													if(pagedef['data']['tablename'] !== action['params']['tablename']){
														for (var i = 0; i < _results.length; i++) {
															pagedef['data']['contents'][i] = jQuery.extend({}, pagedef['data']['contents'][i], _results[i]);
														}
													}else{
														if(pagedef['type']==='DBTableViewList' || pagedef['type']==='RemoteTableViewList'){
															if(action['reloadStatus']){
																pagedef['data']['contents'] = [];
																pagedef['data']['contents'] = _results;
															}
														}
													}
												}											
											}else{
												if(pagedef['data']['tablename'] == action['params']['tablename']){
														pagedef['data']['contents'] = [];
												}
											}
										}
									}
								}
								if(pagedef['type'] === "DBTableViewList" && pagedef['data']['contents'].length > 0){
									pagedef['data']['contents']['offset'] = action['params']['offset'];
									pagedef['data']['contents']['limit'] = action['params']['limit'];
								}
							}else {
								if(pagedef['data']['contents'].length == 0){
									pagedef['data']['contents'][0] = _results[0];
								}else{
									if(action['localDBSelect'] != undefined && action['localDBSelect']){
										//
									}else
										jQuery.extend(pagedef['data']['contents'][0],_results[0]);
								}
							}
							pagedef['data']['updated'] = true;
							$.utility('queryDatabase',false);
							if(action['reloadStatus']){
								$.utility(action['reloadCallback'], pagedef, true);
							}
							if(action['localDBSelect'] != undefined && action['localDBSelect']){
								if(_results.length != 0){
									if(action['events']['DetectRecords'] != undefined && action['events']['DetectRecords'].length != 0){
										var i = 0;
										var tempAction= JSON.parse(JSON.stringify(action));
										function detectRecordsAction(){
											//var  tempPagedef= JSON.parse(JSON.stringify(pagedef));
											var  tempPagedef= $.utility('clone',pagedef);

											if(tempPagedef['data']['contents'].constructor == Object && tempPagedef['data']['contents'][0] === undefined){
												jQuery.extend(tempPagedef['data']['contents'], _results);
											}else{
												for(var j = 0 ; j <  tempPagedef['data']['contents'].length; j++){
													jQuery.extend(tempPagedef['data']['contents'][j], _results[i]);
												}
											}
											new $.actions(tempPagedef, ui, action['events']['DetectRecords'].slice() , eventinitpagedef, function(pagedef, ui, action, eventinitpagedef){
												i++;
												if(i < _results.length){
													detectRecordsAction();
												}else{
													callback(pagedef, ui, tempAction, eventinitpagedef, true);
												}
											}).execute();
										}
										detectRecordsAction();
									}else if(action['events']['Success'] != undefined && action['events']['Success'].length != 0){
										if(pagedef['data']['contents'].constructor == Object){
											jQuery.extend(pagedef['data']['contents'],_results[0]);

										}else{
											if(pagedef['data']['contents'] != undefined){
												if(rowNum != undefined && !isNaN(rowNum)){
													if(_results[rowNum]){
														jQuery.extend(pagedef['data']['contents'][rowNum],_results[rowNum]);
													}else{
														jQuery.extend(pagedef['data']['contents'][rowNum],_results[0]);
													}
													pagedef['data']['contents']['currentRow'] = rowNum;
												}else{
													for (var i = 0; i < pagedef['data']['contents'].length; i++) {
														if(pagedef['data']['contents'][i] != undefined){
															//jQuery.extend(pagedef['data']['contents'][i],_results[0]);
															if(pagedef['type'].indexOf("tableview") > -1){
																jQuery.extend(pagedef['data']['contents'][i],_results[0]);
															}else{
																var keys = $.unique(Object.keys(pagedef['data']['contents'][i]).concat(Object.keys(_results[0])).sort());
																var a4 = {};
																$.each(keys, function (index, key) {
																	const pageValue = pagedef['data']['contents'][i].hasOwnProperty(key) ? pagedef['data']['contents'][i][key] : '';
																	const resultValue = _results[0].hasOwnProperty(key) ? _results[0][key] : '';
																	
																	if(resultValue != null){
																		if (resultValue.toString() != '' && resultValue.toString() != ' ') {
																			a4[key] = resultValue;
																			} else if (resultValue.toString() == ''  || resultValue.toString() == ' ') {
																			a4[key] = pageValue != '' ? pageValue : resultValue;
																		}
																	}else{
																		if (resultValue != '' && resultValue != ' ') {
																			a4[key] = resultValue;
																			} else if (resultValue == ''  || resultValue == ' ') {
																			a4[key] = pageValue != '' ? pageValue : resultValue;
																		}
																	}
																});
																pagedef['data']['contents'][i] = a4;
															}
														}else{
															pagedef['data']['contents'][i] = _results[0];
														}
													}
												}
											}									
										}
										callback(pagedef, ui, action, eventinitpagedef, true);
									}else{
										callback(pagedef, ui, action, eventinitpagedef, "");
									}
								}else{
									callback(pagedef, ui, action, eventinitpagedef, false);
								}
							}else{
								if((_results.length == 0) && (action['events'] != undefined && action['events']['Error']!= undefined)){
									callback(pagedef, ui, action, eventinitpagedef, false);
								}else{
									callback(pagedef, ui, action, eventinitpagedef, true);
								}
							}
							
						}
					}
				},
				function(tx, error){
					$.utility('handleLocalDBError', error['code'],error['message']);
					$.utility('queryDatabase',false);
					callback(pagedef, ui, action, eventinitpagedef, false);
				});

			});


		};
		
		var LocalDBSelect = function(){
			action['method'] = Select;
			action['localDBSelect'] = true;
			Select();
		};
		
		var NumRecords = function(){
			$.utility('queryDatabase',true);
			if(action['params']['tablename'] === undefined)
				action['params']['tablename'] = action['params']['table'];
			$.mobileweb['localdb']['instance'].transaction(function(tx) {
				tx.executeSql(['SELECT count(*) FROM ', action['params']['tablename'], (action['params']['where']!=='')? [' WHERE ',$.utility('formWhereCondition',action['params']['where'])].join(''):'', (action['params']['order']!==undefined &&  action['params']['order']!=='')? [' ORDER BY ', action['params']['order']].join(''):''].join(''), [],
						function(tx,result){
					$.utility('queryDatabase',false);
					if(result.rows.length === 1){
						$.mobileweb['__NUMREC__'] = result.rows.item(0)['count(*)'];
						$.mobileweb['__PAGENUMREC__'] = result.rows.item(0)['count(*)'];
					}
					else{
						$.mobileweb['__NUMREC__'] = result.rows.length;
						$.mobileweb['__PAGENUMREC__'] = result.rows.length;
					}
					if ($("body").find("#__NUMREC__").length == 0 ) {
						$('body').append("<input id='__NUMREC__' type='text' hidden='true'>"+ $.mobileweb["__NUMREC__"] +"</input>");
					}
					$("#__NUMREC__").val($.mobileweb['__NUMREC__']);
					callback(pagedef, ui, action, eventinitpagedef, true);
					
				},function(tx,error){
					$.utility('queryDatabase',false);
					callback(pagedef, ui, action, eventinitpagedef, false);
				});
			});
		};

		var Insert = function(){
 			if(action['addMarker'] != undefined && action['addMarker']){
 				
 			}else{
 				$.utility('showLoadingIndicator', true);
 			}
 			
 			var table=[];
 			var selectedTableData = [];
 			var pk_autoinc_TableField = "";
 			
 			var tables=$.mobileweb['localdb']['schema'];
 			for(var i=0; i < tables.length; i++){
 				table=tables[i];
 				if(table['tablename'] == action['params']['tablename']){
 					selectedTableData = table;
 					var selectedTableFields = selectedTableData['fields'];
 					for(var i=0; i < selectedTableFields.length; i++){
 						if(selectedTableFields[i]['pk'] && selectedTableFields[i]['autoinc']){
 							pk_autoinc_TableField = selectedTableFields[i]['name'];
 							break;
 						}
 					}
 					break;
 				}
 			}
 			
 			var keyNotExist = true;
 			for(var j=0; j < selectedTableFields.length; j++){
 				var tableField = selectedTableFields[j]['name'];
 				for(var key in action['params']['record']){
 					if(key == tableField)
 						keyNotExist = false;
 				}
 			}
 			if(keyNotExist){
 				callback(pagedef, ui, action, eventinitpagedef, false);
 				return;
 			}
 			
 			var qnMarks = [];
 			var fieldNames = [];
 			var values = [];
 			
 			if(pagedef)
 				pagedef['data']['updated'] = false;
 			for(var key in action['params']['record']){
 				if(key != pk_autoinc_TableField){
 					qnMarks.push('?');
 					fieldNames.push(key);
 					var fieldValue = action['params']['record'][key] != null ? action['params']['record'][key].toString() : action['params']['record'][key];
 					if(fieldValue != null){
 						fieldValue = $.utility('checkGlobalVariable', fieldValue);
 						if(fieldValue.indexOf('@@') != -1)
 							fieldValue = $.utility('tokenizeFunction',fieldValue, pagedef);
 						if (fieldValue.indexOf("]") != -1){
 							var j=fieldValue.indexOf("]");
 							if(fieldValue.lastIndexOf("]") != j)
 								j = fieldValue.lastIndexOf("]");
 							var org="[" + fieldValue.substring(1,j) + "]";
 							var fin ="";	
 							if(pagedef['type'] === "DBTableViewList" || pagedef['type'] === "RemoteTableViewList"){
 								rowNum =pagedef['data']['contents']['currentRow'];
 								if(isNaN(parseInt(rowNum))){
 			                    	 if(ui != undefined){
 			     						if(ui.getId != undefined){
 			     							var uiId = ui.getId();
 			     							var tempStr = uiId;
 			     							if(ui.getViewType() != "Row")
 			     								tempStr = uiId.substr(0, uiId.lastIndexOf('-'));
 			     							rowNum = tempStr.substr(tempStr.lastIndexOf('-')+1, tempStr.length);
 			     						}
 			                             if(isNaN(parseInt(rowNum)))
 			                            	 rowNum = 0;
 			                                                                     
 			     					}else
 			     						rowNum = 0;
 			                     }
 								 
 								if(rowNum != undefined){
									if(pagedef['data']['contents'][rowNum] != undefined){
										fin = $.utility('extractDataFromRecord',pagedef['data']['contents'][rowNum],"[" + fieldValue.substring(1,j) + "]",true);
									}else
										fin = $.utility('extractDataFromRecord',pagedef['data']['contents'][0][rowNum],"[" + fieldValue.substring(1,j) + "]",true);
 								}
 								if(fin.indexOf('[') != -1)
  									fin = $.utility('tokenizeString',"[" + fieldValue.substring(1,j) + "]", pagedef,action);
 							}else{
 								fin = $.utility('tokenizeString',"[" + fieldValue.substring(1,j) + "]", pagedef,action);
 							}
 							fieldValue=fieldValue.replace(org,fin);
 						}	
 					}
 					var recordValidationFlag = true;
 					if(fieldValue == ""){
 						var selectedTableFields = selectedTableData['fields'];
 						for(var i=0; i < selectedTableFields.length; i++){
 							if(key == selectedTableFields[i]['name']){
 								//type:"INTEGER",
 								if(selectedTableFields[i]['type'] == "INTEGER" || selectedTableFields[i]['type']== "REAL"){
 									fieldValue = selectedTableFields[i]['defaultValue'] != undefined ? selectedTableFields[i]['defaultValue'] : 0;
 								}else if(selectedTableFields[i]['type'] != "TEXT"){ // for type :"TIMESTAMP", "DATE", "TIME"
// 									fieldValue = selectedTableFields[i]['defaultValue'] != undefined ? selectedTableFields[i]['defaultValue'] : null;
 									fieldValue = selectedTableFields[i]['defaultValue'] != undefined ? selectedTableFields[i]['defaultValue'] : "";
 								}
 							}
 						}
 					}else{
 						try{
 							var selectedTableFields = selectedTableData['fields'];
 							for(var i=0; i < selectedTableFields.length; i++){
 								if(key == selectedTableFields[i]['name']){
 									//type:"INTEGER",
 									if(selectedTableFields[i]['type']== "INTEGER" || selectedTableFields[i]['type']== "REAL"){
 										fieldValue = eval(fieldValue);	
 									}else if(selectedTableFields[i]['type'] == "TIMESTAMP" || selectedTableFields[i]['type'] == "DATETIME"){ // type :"TIMESTAMP"
 										recordValidationFlag = $.utility('validateDate',fieldValue);
 									}else if(table['fields'][i]['type'] == "DATE"){ // type :"DATE"
 										recordValidationFlag = $.utility('validateOnlyDate',fieldValue);
 									}else if(table['fields'][i]['type'] == "TIME"){ // type :"TIME"
 										recordValidationFlag = $.utility('validateOnlyTime',fieldValue);
 									}else if(table['fields'][i]['type'] == "BOOLEAN"){ // type :"BOOLEAN" --- Bug #11112 fix
 										recordValidationFlag = $.utility('validateBooleanFormat',fieldValue);
 									}
 									else{
 										do {
 											if (fieldValue.indexOf("]") != -1){
 												var j=fieldValue.indexOf("]");
 												if(fieldValue.lastIndexOf("]") != j)
 													j = fieldValue.lastIndexOf("]");
 												var i=fieldValue.indexOf("[")+1;
 												var org="[" + fieldValue.substring(i,j) + "]";
 												var fin = $.utility('tokenizeString',"[" + fieldValue.substring(i,j) + "]", pagedef,action);
 												fieldValue=fieldValue.replace(org,fin);
 											}
 										}while(fieldValue.indexOf("]") != -1);
 										recordValidationFlag = true;//In reference of Bug #10745
 									}
 								}
 							}
 							
 						}catch(e){
 							//console.log(e);
 							recordValidationFlag = false;
 						}
 					}
 					if(recordValidationFlag){
 						if(typeof(fieldValue) == "string"){
 							if(fieldValue.indexOf("date('now')")!= -1 || fieldValue.indexOf("datetime('now')")!= -1){
 								var _date = new Date();
 								if(fieldValue == "date('now')"){
 									fieldValue = _date.toISOString().slice(0, 10);
 								}else if(fieldValue == "datetime('now')"){
 							        fieldValue = _date.toISOString().slice(0, 19).replace('T', ' ');
 								}
 							}
 						}
 						values.push(fieldValue);	
 					}else{
 						return callback(pagedef, ui, action, eventinitpagedef, false);
 					}
 				}
 			}
			$.mobileweb['localdb']['instance'].transaction(function (tx) {
				$.utility('log',['INSERT INTO ', action['params']['tablename'], ' (', fieldNames.join(), ') VALUES (', qnMarks.join(), ')'].join(''));
				tx.executeSql(['INSERT INTO ', action['params']['tablename'], ' (', fieldNames.join(), ') VALUES (', qnMarks.join(), ')'].join(''), values,
				
						function(tx,result){
							if(pagedef != null){
								pagedef['data']['updated'] = false;
								$.utility('showLoadingIndicator', false);
								callback(pagedef, ui, action, eventinitpagedef, true);
							}
							
					  	},
					  	function(tx, error){
					  		$.utility('handleLocalDBError', error['code'],error['message']);
					  		$.utility('showLoadingIndicator', false);
					  		callback(pagedef, ui, action, eventinitpagedef, false);
					  	}
				
				
				);
				
			});
		};
		
		var Update = function(){
			var recordset = [];
			var recordsetToUpdateInPageData = {};
			var whereCondition = '';
            var selectedTableData=[];
                                                                             
			var tables=$.mobileweb['localdb']['schema'];
			for(var i=0; i < tables.length; i++){
				if(tables[i]['tablename'] == action['params']['tablename']){
					selectedTableData = tables[i];
				}
            }
            
			if(selectedTableData.length == 0){
				if(action['params']['tablename'] == "appVersion"){
					whereCondition = action['params']['where'];
					$.mobileweb['localdb']['instance'].transaction(
							function(tx) {
								$.utility('log',['UPDATE ', action['params']['tablename'], ' SET appVersion =', action['params']['record']['appVersion'], (whereCondition != "")?' WHERE ' + whereCondition : ''].join(''));
								tx.executeSql(['UPDATE ', action['params']['tablename'], ' SET appVersion =', action['params']['record']['appVersion'], (whereCondition != "")?' WHERE ' + whereCondition : ''].join(''), [],
										function(tx,result){
									if(result.rowsAffected != 0){
										//console.log("App Version updated");
									}
								},
								function(tx, error){
									//console.log("App Version update failed");
								}
								);
							}
					);
				}else            	
					callback(pagedef, ui, action, eventinitpagedef, false);
				return;
			}
             
			if((pagedef != null && pagedef["type"] != "BaseView" && pagedef["type"] != "ScrollView") && action['params']['where'] === ''){
//				var pk = $.utility('getPK',action['params']['tablename'], $.mobileweb['localdb']['schema']);
//				var noOfPk = pk.length;
//				for(var i = 0; i < pk.length; i++){
//					var pkValue = $.utility('extractDataFromRecord',pagedef['data']['contents'][0], '['+pk+']');
//					if(pkValue && pkValue != ""){
//						if(i != noOfPk -1){
//							whereCondition = whereCondition + [pk[i], " = '", $.utility('extractDataFromRecord',pagedef['data']['contents'][0], '['+pk+']'), "' AND"].join('');
//						}else{
//							whereCondition = whereCondition +  [pk[i], " = '", $.utility('extractDataFromRecord',pagedef['data']['contents'][0], '['+pk+']'), "'"].join('');
//						}
//					}
//				}
			}else{
				if(pagedef != null){
					var actionFlag = true;
					var rowNum;
					if(pagedef['type'] === "DBTableViewList" || pagedef['type'] == 'RemoteTableViewList'){
						rowNum = pagedef['data']['contents']['currentRow']; 
						if(isNaN(parseInt(rowNum))){
	                    	 if(ui != undefined){
	     						if(ui.getId != undefined){
	     							var uiId = ui.getId();
	     							var tempStr = uiId;
	     							if(ui.getViewType() != "Row")
	     								tempStr = uiId.substr(0, uiId.lastIndexOf('-'));
	     							rowNum = tempStr.substr(tempStr.lastIndexOf('-')+1, tempStr.length);
	     						}
	                             if(isNaN(parseInt(rowNum)))
	                            	 rowNum = 0;
	                                                                     
	     					}else
	     						rowNum = 0;
	                    	 pagedef['data']['contents']['currentRow'] = rowNum;
	                     }
						 
						 if(rowNum != undefined){
							if(pagedef['data']['contents'][rowNum] != undefined){
								whereCondition = $.utility('formWhereCondition',$.utility('extractDataFromRecord',pagedef['data']['contents'][rowNum],action['params']['where'],actionFlag));
							}else if(pagedef['data']['contents'][0] != undefined && pagedef['data']['contents'][0][rowNum] != undefined)// Bug #11323 Fix	
								whereCondition = $.utility('formWhereCondition',$.utility('extractDataFromRecord',pagedef['data']['contents'][0][rowNum],action['params']['where'],actionFlag));
						}
					}else
						whereCondition = $.utility('formWhereCondition',action['params']['where'],pagedef);
						
				}
			}
			
			for(var key in action['params']['record']){
				var fieldValue = action['params']['record'][key] != null ? action['params']['record'][key].toString() : action['params']['record'][key];
				if(fieldValue != null){
					if(fieldValue.indexOf("@@") != -1 || fieldValue.indexOf(/@@/gi) != -1){
						fieldValue=$.utility('tokenizeString',fieldValue,pagedef, action);
					}else{
						if(pagedef != null){
							if(pagedef['type'] === "DBTableViewList" || pagedef['type'] == 'RemoteTableViewList'){
								var _rownum = 0;
								if(ui != undefined){ 
									if(ui['rownum'] != undefined){
										_rownum = ui['rownum'];
									}else if(ui.getId != undefined){
										var uiId = ui.getId();
										var tempStr = uiId.substr(0, uiId.lastIndexOf('-'));
										_rownum = tempStr.substr(tempStr.lastIndexOf('-')+1, tempStr.length);
									}
								}
								fieldValue= $.utility('extractDataFromRecord',pagedef['data']['contents'][_rownum],fieldValue,actionFlag);
							}
						}
						if (fieldValue.toString().indexOf("]") != -1){
							var j=fieldValue.indexOf("]");
							if(fieldValue.lastIndexOf("]") != j)
								j = fieldValue.lastIndexOf("]");
							var org="[" + fieldValue.substring(1,j) + "]";
							var fin = $.utility('tokenizeString',"[" + fieldValue.substring(1,j) + "]", pagedef,action);
							fieldValue=fieldValue.replace(org,fin);
						}else{
							var fin = $.utility('tokenizeString', fieldValue, pagedef,action);
							fieldValue=fieldValue.replace(fieldValue,fin);
						}
					}
				}
				var recordValidationFlag = true;
				if(fieldValue == ""){
					var selectedTableFields = selectedTableData['fields'];
					for(var i=0; i < selectedTableFields.length; i++){
						if(key == selectedTableFields[i]['name']){
							//type:"INTEGER",
							if(selectedTableFields[i]['type'] == "INTEGER" || selectedTableFields[i]['type']== "REAL"){
								fieldValue = selectedTableFields[i]['defaultValue'] != undefined ? selectedTableFields[i]['defaultValue'] : 0;
							}else if(selectedTableFields[i]['type'] != "TEXT"){ // for type :"TIMESTAMP", "DATE", "TIME"
//								fieldValue = selectedTableFields[i]['defaultValue'] != undefined ? selectedTableFields[i]['defaultValue'] : null;
								fieldValue = selectedTableFields[i]['defaultValue'] != undefined ? selectedTableFields[i]['defaultValue'] : "";
							}
						}
					}
				}else{
					try{
						var selectedTableFields = selectedTableData['fields'];
						for(var i=0; i < selectedTableFields.length; i++){
							if(key == selectedTableFields[i]['name']){
								//type:"INTEGER",
								if(selectedTableFields[i]['type']== "INTEGER" || selectedTableFields[i]['type']== "REAL"){
									if(fieldValue.indexOf("@@") != -1 || fieldValue.indexOf(/@@/gi) != -1){
 										fieldValue= fieldValue.replace('@@','$.');
 									}
									fieldValue = eval(fieldValue);	
								}else if(selectedTableFields[i]['type'] == "TIMESTAMP" || selectedTableFields[i]['type'] == "DATETIME"){ // type :"TIMESTAMP"
									recordValidationFlag = $.utility('validateDate',fieldValue);
								}else if(selectedTableData['fields'][i]['type'] == "DATE"){ // type :"DATE"
									recordValidationFlag = $.utility('validateOnlyDate',fieldValue);
								}else if(selectedTableData['fields'][i]['type'] == "TIME"){ // type :"TIME"
									recordValidationFlag = $.utility('validateOnlyTime',fieldValue);
								}
							}
						}
						
					}catch(e){
						//console.log(e);
						recordValidationFlag = false;
					}
					if(!recordValidationFlag){
						return callback(pagedef, ui, action, eventinitpagedef, false);
					}
				}
				if(pagedef != null){
					key = $.utility('extractDataFromRecord',pagedef['data']['contents'][0], key);		
				}
				recordset.push([key, ' = \'',fieldValue, '\''].join(''));
				recordsetToUpdateInPageData[key] = fieldValue;
				
			}
			$.mobileweb['localdb']['instance'].transaction(
				function(tx) {
					$.utility('log',['UPDATE ', action['params']['tablename'], ' SET ', recordset.join(), (whereCondition != "")?' WHERE ' + whereCondition : ''].join(''));
					tx.executeSql(['UPDATE ', action['params']['tablename'], ' SET ', recordset.join(), (whereCondition != "")?' WHERE ' + whereCondition : ''].join(''), [],
					  	function(tx,result){
							if(result.rowsAffected != 0){
								if(pagedef != null){
									pagedef['data']['updated'] = false;
									$.utility('log',"[INFO] Record Updated.");
									if(!action['flag'])		// Restricting SychronizeDB action from updating page data
									$.utility('updatePageData',pagedef,recordsetToUpdateInPageData );
									//$.utility('ApplyOnSucessAndOnErrorEvents',pagedef, ui, action['events'], true);
									callback(pagedef, ui, action, eventinitpagedef, true);
								}
							}else{
								$.utility('log',"[ERROR] Problems updating a record.");
								$.utility('log',['[ERROR] UPDATE ', action['params']['tablename'], ' SET ', recordset.join(), ' WHERE ', action['params']['where']].join(''));
								//$.utility('ApplyOnSucessAndOnErrorEvents',pagedef, ui, action['events'], false);
								callback(pagedef, ui, action, eventinitpagedef, false);
							}
							
					  	},
					  	function(tx, error){
//					  		$.utility('handleLocalDBError', error['code'],error['message']);
					  		$.utility('log',"[ERROR] Problems updating a record.");
					  		$.utility('log',['[ERROR] UPDATE ', action['params']['tablename'], ' SET ', recordset.join(), (whereCondition != "")?' WHERE ' + whereCondition : ''].join(''));
					  		callback(pagedef, ui, action, eventinitpagedef, false);
					  	}
					);
					
				}
			);
		};
		
		var Delete = function(){
			var whereCondition = '';
			if((pagedef["type"] != "BaseView" && pagedef["type"] != "ScrollView") && action['params']['where'] === ''){
//				var pk = $.utility('getPK',action['params']['tablename'], $.mobileweb['localdb']['schema']);
//				var noOfPk = pk.length;
//
//				for(var i = 0; i < pk.length; i++){
//					if(i != noOfPk -1){
//						whereCondition = whereCondition + [pk[i], " = '", $.utility('extractDataFromRecord',pagedef['data']['contents'][0], '['+pk+']'), "' AND"].join('');
//					}else{
//						whereCondition = whereCondition +  [pk[i], " = '", $.utility('extractDataFromRecord',pagedef['data']['contents'][0], '['+pk+']'), "'"].join('');
//					}
//				}
			}else{
				if(pagedef != null){
					var actionFlag = true;
					if(pagedef['type'] === "DBTableViewList" || pagedef['type'] == 'RemoteTableViewList'){
						var rowNum = pagedef['data']['contents']['currentRow'];
						if(isNaN(parseInt(rowNum))){
	                    	 if(ui != undefined){
	     						if(ui.getId() != undefined){
	     							var uiId = ui.getId();
	     							var tempStr = uiId;
	     							if(ui.getViewType() != "Row")
	     								tempStr = uiId.substr(0, uiId.lastIndexOf('-'));
	     							rowNum = tempStr.substr(tempStr.lastIndexOf('-')+1, tempStr.length);
	     						}
	                             if(isNaN(parseInt(rowNum)))
	                            	 rowNum = 0;
	                                                                     
	     					}else
	     						rowNum = 0;
	                     }
						 
						 
						 if(rowNum != undefined){
							if(pagedef['data']['contents'][rowNum] != undefined){
								whereCondition = $.utility('formWhereCondition',$.utility('extractDataFromRecord',pagedef['data']['contents'][rowNum],action['params']['where'],actionFlag));
							}else if(pagedef['data']['contents'][0] != undefined && pagedef['data']['contents'][0][rowNum] != undefined)// Bug #11323 Fix	
								whereCondition = $.utility('formWhereCondition',$.utility('extractDataFromRecord',pagedef['data']['contents'][0][rowNum],action['params']['where'],actionFlag));
						}
					}else{
						whereCondition =  $.utility('formWhereCondition',$.utility('extractDataFromRecord',pagedef['data']['contents'][0],$.utility('tokenizeString',action['params']['where'], pagedef,action), actionFlag));
					}
					
				}else{
					whereCondition = $.utility('formWhereCondition',action['params']['where'],pagedef);
				}
			}
			
			$.mobileweb['localdb']['instance'].transaction(
					function(tx) {
						$.utility('log',['DELETE FROM ', action['params']['tablename'], (whereCondition != "")?' WHERE ' + whereCondition : ''].join(''));
						tx.executeSql(['DELETE FROM ', action['params']['tablename'],  (whereCondition != "")?' WHERE ' + whereCondition : ''].join(''), [],
								function(tx,result){
							pagedef['data']['updated'] = false;
							$.utility('log',"[INFO] Record Deleted");
							if(result.rowsAffected != 0){
								callback(pagedef, ui, action, eventinitpagedef, true);	
							}else{
								callback(pagedef, ui, action, eventinitpagedef, false);
							}
							
							},
					  	function(tx, error){
					  		$.utility('log',"[ERROR] Problems deleting a record.");
					  		$.utility('log',['[ERROR] DELETE FROM ', action['params']['tablename'], (whereCondition != "")?' WHERE ' + whereCondition : ''].join(''));
					  		callback(pagedef, ui, action, eventinitpagedef, false);
					  	}
					);
				}
			);
		};
		var DeleteAllRecords = function(){
			$.mobileweb['localdb']['instance'].transaction(
				function(tx) {
					tx.executeSql(['DROP TABLE ', action['params']['tablename']].join(''), [],
					  	function(tx,result){
							pagedef['data']['updated'] = false;
							$.utility('log',"[INFO] All Records Deleted");
							$.each($.mobileweb['localdb']['schema'],function(i,schema){
								if(schema['tablename'] === action['params']['tablename']){
									$.utility('createTable', $.mobileweb['localdb']['instance'], schema);
								}
									
							});
							callback(pagedef, ui, action, eventinitpagedef, true);
					  	},
					  	function(tx, error){
					  		$.utility('log',"[ERROR] Problems deleting all records.");
					  		callback(pagedef, ui, action, eventinitpagedef, false);
					  	}
					 );
				}
			);
		};
		
		return _action;
	};
	
	function ComAction(pagedef, ui, action, eventinitpagedef, target, callback){
		var _action = {};
		var evt = '""';
		if(action['events'])
		    evt = JSON.stringify(action['events']);
		evt =  evt.replace(/[+]/g, "%2B");
		evt =  evt.replace(/[-]/g, "%2D");
		evt =  evt.replace(/[&]/g, "%26");
		evt =  evt.replace(/[%]/g, "%25");
		if(action['method'] != 'SynchronizeDB'){
		    evt = 'NOW REPLACED';
		}
		var command = [];
		   
	    var params = $.utility('clone',action['params']);
	    //If Cookie is not set ,setting the cookie
	    $.utility('initCall');
	    
		if((action['method']==='Register')||(action['method']==='Login')){
		    setTimeout(function(){command = [$.utility('getCommServerDomain'),'llcomm?llcommand=','[command]','&jsonp=','[jsonp]',$.utility('appendDeviceInfo'),
		                 '&callbackdata={"ver":"2","page":"',pagedef['name'],'","events":"',evt,'","table":"',action['params']['table'],'"}', '&cache=', Math.random(), '&dataset=', '[params]', '&project_id=', $.mobileweb['pid'], '&version=', $.mobileweb['version'], '&os=mw'];
		        },500);
		}else { 
		    if(action['method']==='GeneralLogin'){
			    setTimeout(function(){command = [$.utility('getCommServerDomain'),'llcomm?llcommand=sndmsg&command=','[command]','&jsonp=','[jsonp]',$.utility('appendDeviceInfo'),
			                                    '&callbackdata={"ver":"2","page":"',pagedef['name'],'","events":"',evt,'","table":"',action['params']['table'],'"}', '&cache=', Math.random(), '&dataset=', '[params]', '&project_id=', $.mobileweb['pid'], '&version=', $.mobileweb['version'], '&os=mw'];
			    },500);
		    }else{
				   // check serviceName...
				   // Mobilous..
				   if(action['params']['servicename'] === 'Mobilous'){
					   if(action['method'] === "Select" || action['method'] === "RemoteNumRecords"){
						   var callingMethod = (action['callingMethod'] == undefined || action['callingMethod'] == "") ? "direct" : action['callingMethod'];
						   if(action['callback'] != undefined){
							   if(action['callback'] === "changeCondition"){
								   command = [$.utility('getCommServerDomain'),'llcomm?llcommand=sndmsg&command=','[command]','&jsonp=','[jsonp]',$.utility('appendDeviceInfo'),
								              '&callbackdata={"ver":"2","page":"',action['targetPage'],'","callingMethod":"',callingMethod,'","offset":"',action['params']['offset'],'","events":"',evt,'","table":"',action['params']['table'],'","callback":"',action['pageCallback'],'","parentPage":"',action['parentPage'],'"}', '&cache=', Math.random(), '&dataset=', '[params]', '&project_id=', $.mobileweb['pid'], '&version=', $.mobileweb['version'], '&os=mw'];
							   }else if(action['callback'] === "createRemoteTileList"){
								   command = [$.utility('getCommServerDomain'),'llcomm?llcommand=sndmsg&command=','[command]','&jsonp=','[jsonp]',$.utility('appendDeviceInfo'),
							              '&callbackdata={"ver":"2","page":"',pagedef['name'],'","callingMethod":"',callingMethod,'","offset":"',action['params']['offset'],'","events":"',evt,'","table":"',action['params']['table'],'","callback":"',action['callback'],'","parentPage":"',action['parentPage'],'","callbackUI":"',action['callbackUI'],'"}', '&cache=', Math.random(), '&dataset=', '[params]', '&project_id=', $.mobileweb['pid'], '&version=', $.mobileweb['version'], '&os=mw']; 
							   }else{
								   command = [$.utility('getCommServerDomain'),'llcomm?llcommand=sndmsg&command=','[command]','&jsonp=','[jsonp]',$.utility('appendDeviceInfo'),
								              '&callbackdata={"ver":"2","page":"',pagedef['name'],'","callingMethod":"',callingMethod,'","offset":"',action['params']['offset'],'","events":"',evt,'","table":"',action['params']['table'],'","callback":"',action['callback'],'","parentPage":"',action['parentPage'],'"}', '&cache=', Math.random(), '&dataset=', '[params]', '&project_id=', $.mobileweb['pid'], '&version=', $.mobileweb['version'], '&os=mw'];
							   }
							   
						   }else if(action['method'] === "RemoteNumRecords"){
							   command = [$.utility('getCommServerDomain'),'llcomm?llcommand=sndmsg&command=','[command]','&jsonp=','[jsonp]',$.utility('appendDeviceInfo'),
							              '&callbackdata={"ver":"2","page":"',pagedef['name'],'","callingMethod":"',"RemoteNumRecords",'","offset":"',action['params']['offset'],'","events":"',evt,'","table":"',action['params']['table'],'"}', '&cache=', Math.random(), '&dataset=', '[params]', '&project_id=', $.mobileweb['pid'], '&version=', $.mobileweb['version'], '&os=mw'];
						   }else{
							   command = [$.utility('getCommServerDomain'),'llcomm?llcommand=sndmsg&command=','[command]','&jsonp=','[jsonp]',$.utility('appendDeviceInfo'),
							              '&callbackdata={"ver":"2","page":"',pagedef['name'],'","callingMethod":"',callingMethod,'","offset":"',action['params']['offset'],'","events":"',evt,'","table":"',action['params']['table'],'"}', '&cache=', Math.random(), '&dataset=', '[params]', '&project_id=', $.mobileweb['pid'], '&version=', $.mobileweb['version'], '&os=mw'];
						   }
						   
						   if(action['comboBox'] != undefined && action['comboBox']){
							   command = [$.utility('getCommServerDomain'),'llcomm?llcommand=sndmsg&command=','[command]','&jsonp=','[jsonp]',$.utility('appendDeviceInfo'),
							              '&callbackdata={"ver":"2","page":"',pagedef['name'],'","callingMethod":"',callingMethod,'","offset":"',action['params']['offset'],'","events":"',evt,'","table":"',action['params']['table'],'","comboBox":"',action['comboBox'],'"}', '&cache=', Math.random(), '&dataset=', '[params]', '&project_id=', $.mobileweb['pid'], '&version=', $.mobileweb['version'], '&os=mw'];
						   }
						   
					   }else if(action['method'] === "Insert" || action['method'] === "Update" || action['method'] === "Delete"){
						   command = [$.utility('getCommServerDomain'),'llcomm?llcommand=sndmsg&command=','[command]','&jsonp=','[jsonp]',$.utility('appendDeviceInfo'),
						              '&callbackdata={"ver":"2","page":"',pagedef['name'],'","callingMethod":"',callingMethod,'","events":"',evt,'","table":"',action['params']['table'],'"}', '&cache=', Math.random(), '&dataset=', '[params]', '&project_id=', $.mobileweb['pid'], '&version=', $.mobileweb['version'], '&os=mw'];
					   }else{
						   command = [$.utility('getCommServerDomain'),'llcomm?llcommand=sndmsg&command=','[command]','&jsonp=','[jsonp]',$.utility('appendDeviceInfo'),
						              '&callbackdata={"ver":"2","page":"',pagedef['name'],'","events":"',evt,'","table":"',action['params']['table'],'"}', '&cache=', Math.random(), '&dataset=', '[params]', '&project_id=', $.mobileweb['pid'], '&version=', $.mobileweb['version'], '&os=mw']; 
					   }
					   
					   // For remotselect as table atribute is named as tablename in RemoteSelect Action
					   if(action['method'] === "RemoteSelect"){
						   var callingMethod = (action['callingMethod'] == undefined || action['callingMethod'] == "") ? "direct" : action['callingMethod'];
						   command = [$.utility('getCommServerDomain'),'llcomm?llcommand=sndmsg&command=','[command]','&jsonp=','[jsonp]',$.utility('appendDeviceInfo'),
						              '&callbackdata={"ver":"2","page":"',pagedef['name'],'","callingMethod":"',callingMethod,'","events":"',evt,'","table":"',action['params']['tablename'],'"}', '&cache=', Math.random(), '&dataset=', '[params]', '&project_id=', $.mobileweb['pid'], '&version=', $.mobileweb['version'], '&os=mw'];
					   }					   
					   if(action['method'] === "SynchronizeDB"){
						   if(action['toparams']['forceUpdate'] == undefined) action['toparams']['forceUpdate'] = "false";
						   var callingMethod = (action['callingMethod'] == undefined || action['callingMethod'] == "") ? "direct" : action['callingMethod'];
						   command = [$.utility('getCommServerDomain'),'llcomm?llcommand=sndmsg&command=','[command]','&jsonp=','[jsonp]',$.utility('appendDeviceInfo'),
						              '&callbackdata={"ver":"2","page":"',pagedef['name'],'","callingMethod":"',callingMethod,'","fromDB":"','comdb','","events":',evt,',"table":"',$.utility('tokenizeString', action['params']['table'], pagedef,action),'","ToService":"',action['toparams']['toService'],'","ToTable":"',$.utility('tokenizeString', action['toparams']['toTable'], pagedef,action),'","forceFlag":"',action['toparams']['forceFlag'],'","forceUpdate":"',action['toparams']['forceUpdate'],'"}', '&cache=', Math.random(), '&dataset=', '[params]', '&project_id=', $.mobileweb['pid'], '&version=', $.mobileweb['version'], '&os=mw'];
						}
					   
					   if(action['method'] === "UploadRecordsToRemoteDB"){
						   command = [$.utility('getCommServerDomain'),'llcomm?llcommand=sndmsg&command=','[command]','&jsonp=','[jsonp]',$.utility('appendDeviceInfo'),
					              '&callbackdata={"ver":"2","page":"',pagedef['name'],'","callingMethod":"',callingMethod,'","events":"',evt,'","table":"',action['params']['table'],'"}', '&cache=', Math.random(), '&dataset=', '[params]', '&project_id=', $.mobileweb['pid'], '&version=', $.mobileweb['version'], '&os=mw'];
					   }
					   
					   if(action['method'] === "SelectNewService"){
						   var callingMethod = (action['callingMethod'] == undefined || action['callingMethod'] == "") ? "direct" : action['callingMethod'];
						   command = [$.utility('getCommServerDomain'),'llcomm?llcommand=sndmsg&command=','[command]','&jsonp=','[jsonp]',$.utility('appendDeviceInfo'),
						              '&callbackdata={"ver":"2","page":"',pagedef['name'],'","fromTable":"',action['fromTable'],'","fromDB":"',action['fromDB'],'","toDB":"',action['toDB'],'","events":"',evt,'","table":"',action['params']['table'],'","forceFlag":"',action['forceFlag'],'","forceUpdate":"',action['forceUpdate'],'"}', '&cache=', Math.random(), '&dataset=', '[params]', '&project_id=', $.mobileweb['pid'], '&version=', $.mobileweb['version'], '&os=mw'];
					   }
				   	}else if(action['params']['servicename'] != undefined){
					   command[0] = $.utility('getCommServerDomainForExternalService') +"?servicename=" + action['params']['servicename']; 
					}
			}
				
		   	if($.mobileweb['release'] != undefined && $.mobileweb['release']){
				params['database'] = 'db_' + $.mobileweb['pid']+"_release";
			}else{	
				params['database'] = 'db_' + $.mobileweb['pid'];
			}
		}
		  
	  	for(var key in params){
			params[key] = $.utility('clone',params[key]);
		}
	    
	  	if(params['rec']){
		    var tempRec = {};
		    for(var key in params['rec']){
		    	var tempKey = $.utility('tokenizeString', key, pagedef,action);
		    	var tempValue = params['rec'][key];
		    	tempRec[tempKey] = tempValue;
		    }
		    params['rec'] = tempRec;
		    if(!$.utility('isEmpty',params['rec'])){
		    	//TODO: this may fail during insert
		    	if(action['flag'] == undefined){
		    		if(pagedef['type'] === "DBTableViewList" || pagedef['type'] === "RemoteTableViewList"){
		    			if((ui != null || ui != undefined) && ui['rownum'] != undefined){
		    				$.utility('replaceRecordWithPagedata',params['rec'], pagedef['data']['contents'][ui['rownum']], pagedef);
		    			}else{
		    				$.utility('replaceRecordWithPagedata',params['rec'], pagedef['data']['contents'][0], pagedef);
		    			}
		    				
		    		}else{
		    			$.utility('replaceRecordWithPagedata',params['rec'], pagedef['data']['contents'][0], pagedef);
		    		}
		    		
		    	}
		    		
		    }else{
		     //if the record is empty... collect the pagedef['data']['contents'][0] 
		     //and extract the record from the schema of commserver
		    }
		}
		   
		_action.execute = function(){
		    switch(action['method']){
			    case 'Select':
			    	Select() ;
			    	break;
			    case 'RemoteSelect':
			    	RemoteSelect() ;
				    break;
			    case 'Update':
			    	Update() ;
			    	break;
			    case 'Delete':
			    	Delete();
			    	break;
			    case 'Insert':
			    	Insert();
			    	break;
			    case 'SynchronizeDB':
			    	SynchronizeDB() ;
				    break;
			    case 'SelectNewService':
			    	SelectNewService() ;
				    break;
			    case 'RemoteNumRecords':
			    	params['where'] = $.utility('formWhereCondition', action['params']['remotewhere'], pagedef);
			    	Select() ;
				    break;
			    case 'Register':
			    	setTimeout(function(){Register(); },500);
			    	break;
			    case 'Login':
			    	setTimeout(function(){Login(); },500);
			    	break;
			    case 'GeneralLogin':
		    	 	var script = document.createElement('script');
					script.type = 'text/javascript';
					if(action['params']['encrypt'] === "md5"){
						script.src = 'http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/md5.js';
						$('head').append(script);
					}else if(action['params']['encrypt'] === "sha256"){
						script.src = 'http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha256.js';
						$('head').append(script);
					}else if(action['params']['encrypt'] === "sha512"){
						script.src = 'http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha512.js';
						$('head').append(script);
					}
					script.onload  = setTimeout(function(){GeneralLogin(); },500);
					break;
			    case 'Upload':
			    	Upload();
				    break;
			    case 'ChangeCondition':
				    setTimeout(function(){ChangeCondition(); },500);
				    break;
			    case 'UploadRecordsToRemoteDB' :
			    	UploadRecordsToRemoteDB();
			    	break;
			    default:
			    	//$.utility('ApplyOnSucessAndOnErrorEvents',pagedef, ui, action['events'], false);
			    	callback(pagedef, ui, action, eventinitpagedef, false);
			      	break;
		    }
		};
		  
		   var Insert = function(){		
			   //TODO: Step 1: If the page data is empty, save the childrens data to page
			   //this will extract all the values of every child in every page and populate the contents
			   var selectedTableData = [];
			   var selectedTableField = "";
			   var tables=$.mobileweb['comdb']['schema'];
			   var page = {};
			   if(action['flag'] == undefined || !action['flag']){
				 //Richa
				   if(tables.length == 0){
					   callback(pagedef, ui, action, eventinitpagedef, false);
		 				return;
				   }
				   for(var i=0; i < tables.length; i++){
					   var table=tables[i];
					   if(table['tablename'] == action['params']['table']){
						   selectedTableData = table;
						   var selectedTableFields = selectedTableData['fields'];
						   for(var j=0; j < selectedTableFields.length; j++){
							   if(selectedTableFields[j]['pk'] && selectedTableFields[j]['autoinc']){
								   selectedTableField = selectedTableFields[j]['name'];
								   for(var key in params['rec']){
									   if(key == selectedTableField && selectedTableField != "")
										   delete params['rec'][key];
								   }
							   }
						   }
					   }
				   }
				   
				   pagedef['data']['contents'][0] = $.utility('savePageData', pagedef['children'], pagedef['data']['contents'][0]);
				   for(var key in params['rec']){
					   if(params['rec'][key] == ""){
						   var selectedTableFields = selectedTableData['fields'];
						   for(var i=0; i < selectedTableFields.length; i++){
							   if(key == selectedTableFields[i]['name']){
								   //type:"INTEGER",
								   if(selectedTableFields[i]['type'] != "TEXT"){
									   delete params['rec'][key];
								   }
							   }
						   }
					   }
				   }
			   }else {
				   pagedef['data']['contents'][0] = $.utility('savePageData', pagedef['children'], pagedef['data']['contents'][0]);
			   }
			   
			   switch(pagedef['type']){
				   case 'BaseView':
				   case 'ScrollView':
					   if(action['flag'] == undefined || !action['flag']){
						   $.utility('replaceRecordWithPagedata',params['rec'], pagedef['data']['contents'][0], pagedef);
					   }
					   break;
			   }
			   
			   if(action['params']['servicename'] === 'Mobilous'){
				   command[2] = 'remoteinsert';
				   if(action['flag'] != undefined && action['flag']){
					   
					   command[4] = 'RemoteProcessContinue';
				   }else{
					   command[4] = 'RemoteProcess';
				   }
				   if(pagedef['parentType'] === "SplitView"){
					   command[13] = "SplitView";
				   }else{
					   command[13] = "";
				   }
				   command[18] = JSON.stringify(params).replace(/[%]/g, "%25").replace(/[&]/g, "%26").replace(/[+]/g, "%2B").replace(/[#]/g, "%23");
				   //$.utility('sendRequest',command.join(''));
				   
				   var sendRequest = command.join('');
				   var reqParams = sendRequest.substring(sendRequest.indexOf("?")+1);
				   //var reqParams = sendRequest.split('?')[1];
				   if(reqParams != undefined){
					   $.utility('sendPOSTRequest', reqParams, 'Insert');
				   }
				   
			   }else{
				   // For external service only...
				  var getJSONfrom = $.mobileweb['baseurl']+'/mobileweb/mobile/extsvc?uri='+command[0];
				  if($.utility('getServerPort') == "8181"){
					  getJSONfrom = command[0];
				  }
				   
				  $.getJSON(getJSONfrom).always(function(data){
					   var timer = setInterval(function(){
						   if($.utility('appendDeviceInfo') != ""){
							   clearInterval(timer);
							   
							   var callingMethod = (action['callingMethod'] == undefined || action['callingMethod'] == "") ? "direct" : action['callingMethod'];
							   command = [$.utility('getCommServerDomain'),'llcomm?llcommand=sndmsg&command=','[command]','&jsonp=','[jsonp]',$.utility('appendDeviceInfo'),
							              '&callbackdata={"ver":"2","page":"',pagedef['name'],'","callingMethod":"',callingMethod,'","events":"',evt,'","table":"',action['params']['table'],'"}', '&cache=', Math.random(), '&dataset=', '[params]', '&project_id=', $.mobileweb['pid'], '&version=', $.mobileweb['version'], '&os=mw'];
							   command[2] = 'remoteinsert';
							   if(action['flag'] != undefined && action['flag']){
								   command[4] = 'RemoteProcessContinue';
							   }else{
								   command[4] = 'RemoteProcess';
							   }
							   if(pagedef['parentType'] === "SplitView"){
								   command[13] = "SplitView";
							   }else{
								   command[13] = "";
							   }
							   command[18] = JSON.stringify(params).replace(/[%]/g, "%25").replace(/[&]/g, "%26").replace(/[+]/g, "%2B").replace(/[;]/g, "%3B").replace(/[#]/g, "%23");
							   //$.utility('sendRequest',command.join(''));
							   
							   var sendRequest = command.join('');
							   var reqParams = sendRequest.substring(sendRequest.indexOf("?")+1);
							   //var reqParams = sendRequest.split('?')[1];
							   if(reqParams != undefined){
								   $.utility('sendPOSTRequest', reqParams, 'Insert');
							   }
						   }
					   },2000);
				   }).fail(function(err) {
						console.log( "---- Fail : External Plugin Authentication ----" );
				   });
			   }
			   
			   var timer = setInterval(function() {
				   if(!$.utility('isBusy') && ($.utility('getComActionStatus') != "") && ($.utility('getComActionStatus') === "Success")){
					   clearInterval(timer);
					   callback(pagedef, ui, action, eventinitpagedef, true);
				   }else if(!$.utility('isBusy') && ($.utility('getComActionStatus') != "") && ($.utility('getComActionStatus') === "Error")){
					   clearInterval(timer);
					   callback(pagedef, ui, action, eventinitpagedef, false);
				   }else if(action['flag'] && !$.utility('isBusy') && ($.utility('getComActionStatus') != "") && ($.utility('getComActionStatus') === "SynchSuccess")){
					   clearInterval(timer);
					   callback(pagedef, ui, action, eventinitpagedef, true);
				   }
			   }, 100);
			   
		   };
		  
		   var Select = function(){
			   $.utility('queryDatabase',true);
			   if(action['params']['servicename'] === 'Mobilous'){
				   if(params['where']!=='' && (params['where'] != undefined)){
					   params['where'] = $.utility('tokenizeString',params['where'], pagedef,action);
					   // params['where'] = $.utility('tokenizeString',params['where'], pagedef);
				   }
				   var test = command.join('');
				   if(action['callback'] != undefined){
					   command[2] = 'remoteselect';
					   command[4] = 'RemoteSelect';
					   if(action['callback'] == "createRemoteTileList"){
						   command[26] = JSON.stringify(params).replace(/[%]/g, "%25").replace(/[&]/g, "%26").replace(/[;]/g, "%3B").replace(/[#]/g, "%23");   
					   }else{
						   command[24] = JSON.stringify(params).replace(/[%]/g, "%25").replace(/[&]/g, "%26").replace(/[;]/g, "%3B").replace(/[#]/g, "%23");
					   }
					   //$.utility('sendRequest',command.join(''));

					   var sendRequest = command.join('');
					   var reqParams = sendRequest.substring(sendRequest.indexOf("?")+1);
					   //var reqParams = sendRequest.split('?')[1];
					   if(reqParams != undefined){
						   $.utility('sendPOSTRequest', reqParams, 'Select');
					   }
				   }else if(action['comboBox'] != undefined && action['comboBox']){
					   command[2] = 'remoteselect';
					   command[4] = 'RemoteSelect';
					   command[22] = JSON.stringify(params).replace(/[%]/g, "%25").replace(/[&]/g, "%26").replace(/[+]/g, "%2B").replace(/[#]/g, "%23");
					   //$.utility('sendRequest',command.join(''));

					   var sendRequest = command.join('');
					   var reqParams = sendRequest.substring(sendRequest.indexOf("?")+1);
					   //var reqParams = sendRequest.split('?')[1];
					   if(reqParams != undefined){
						   $.utility('sendPOSTRequest', reqParams, 'Select');
					   }
					   $('body').everyTime(100, function() {
						   if(!$.utility('isBusy') && ($.utility('getComActionStatus') != "") && ($.utility('getComActionStatus') === "Success")){
							   $('body').stopTime();
							   callback(pagedef, ui, action, eventinitpagedef, true);
						   }else if(!$.utility('isBusy') && ($.utility('getComActionStatus') != "") && ($.utility('getComActionStatus') === "Error")){
							   $('body').stopTime();
							   callback(pagedef, ui, action, eventinitpagedef, false);
						   }
					   });
				   }else {
					   if(action['method'] == "RemoteNumRecords" || action['callingMethod'] == "RemoteNumRecords") {
						   command[2] = 'numrec';
					   }else {
						   command[2] = 'remoteselect';					   
					   }
					   command[4] = 'RemoteSelect';
					   if(action['params']['pageNumRecords'])
						   command[4] = 'PageNumRecords';
					   command[20] = JSON.stringify(params).replace(/[%]/g, "%25").replace(/[&]/g, "%26").replace(/[+]/g, "%2B").replace(/[#]/g, "%23");;
					   //$.utility('sendRequest',command.join(''));

					   var sendRequest = command.join('');
					   var reqParams = sendRequest.substring(sendRequest.indexOf("?")+1);
					   //var reqParams = sendRequest.split('?')[1];
					   if(reqParams != undefined){
						   $.utility('sendPOSTRequest', reqParams, 'Select');
					   }
				   }

			   }else{// For external service only...
				  var getJSONfrom = $.mobileweb['baseurl']+'/mobileweb/mobile/extsvc?uri='+command[0];
				  if($.utility('getServerPort') == "8181"){
					  getJSONfrom = command[0];
				  }
				  
				   $.getJSON(getJSONfrom).always(function(data){
					   //because of delay in response from init request, we have added setTimeout on 28 April,2015 
					   var timer = setInterval(function(){
						   if($.utility('appendDeviceInfo') != ""){
							   clearInterval(timer);
							   
							   var callingMethod = (action['callingMethod'] == undefined || action['callingMethod'] == "") ? "direct" : action['callingMethod'];
							   if(action['method'] == "RemoteNumRecords")	callingMethod = "RemoteNumRecords";
							   
							   if(evt === "NOW REPLACED"){
								   if(action['comboBox'] != undefined && action['comboBox']){
									   command = [$.utility('getCommServerDomain'),'llcomm?llcommand=sndmsg&command=','[command]','&jsonp=','[jsonp]',$.utility('appendDeviceInfo'),
									              '&callbackdata={"ver":"2","page":"',pagedef['name'],'","callingMethod":"',callingMethod,'","events":"',evt,'","table":"',action['params']['table'],'","comboBox":"',action['comboBox'],'"}', '&cache=', Math.random(), '&dataset=', '[params]', '&project_id=', $.mobileweb['pid'], '&version=', $.mobileweb['version'], '&os=mw'];
									   command[2] = 'remoteselect';
									   command[4] = 'RemoteSelect';
									   command[20] = JSON.stringify(params).replace(/[%]/g, "%25").replace(/[&]/g, "%26").replace(/[;]/g, "%3B").replace(/[#]/g, "%23");
								   }else{
									   if(action['callback'] != undefined && action['callback'] === "createRemoteTileList"){
										   command = [$.utility('getCommServerDomain'),'llcomm?llcommand=sndmsg&command=','[command]','&jsonp=','[jsonp]',$.utility('appendDeviceInfo'),
									              '&callbackdata={"ver":"2","page":"',pagedef['name'],'","callingMethod":"',callingMethod,'","offset":"',action['params']['offset'],'","events":"',evt,'","table":"',action['params']['table'],'","callback":"',action['callback'],'","parentPage":"',action['parentPage'],'","callbackUI":"',action['callbackUI'],'"}', '&cache=', Math.random(), '&dataset=', '[params]', '&project_id=', $.mobileweb['pid'], '&version=', $.mobileweb['version'], '&os=mw'];
										   
										   command[26] = JSON.stringify(params).replace(/[%]/g, "%25").replace(/[&]/g, "%26").replace(/[;]/g, "%3B").replace(/[#]/g, "%23"); 
									   }else{
										   command = [$.utility('getCommServerDomain'),'llcomm?llcommand=sndmsg&command=','[command]','&jsonp=','[jsonp]',$.utility('appendDeviceInfo'),
										              '&callbackdata={"ver":"2","page":"',pagedef['name'],'","callingMethod":"',callingMethod,'","events":"',evt,'","table":"',action['params']['table'],'"}', '&cache=', Math.random(), '&dataset=', '[params]', '&project_id=', $.mobileweb['pid'], '&version=', $.mobileweb['version'], '&os=mw'];
										   command[18] = JSON.stringify(params).replace(/[%]/g, "%25").replace(/[&]/g, "%26").replace(/[;]/g, "%3B").replace(/[#]/g, "%23");
									   }
									   command[2] = 'remoteselect';
									   command[4] = 'RemoteSelect';
								   }
							   }else{
								   command = [$.utility('getCommServerDomain'),'llcomm?llcommand=sndmsg&command=','[command]','&jsonp=','[jsonp]',$.utility('appendDeviceInfo'),
								              '&callbackdata={"ver":"2","page":"',pagedef['name'],'","callingMethod":"',callingMethod,'","events":',evt,',"table":"',action['params']['table'],'"}', '&cache=', Math.random(), '&dataset=', '[params]', '&project_id=', $.mobileweb['pid'], '&version=', $.mobileweb['version'], '&os=mw'];
								   command[2] = 'remoteselect';
								   command[4] = 'RemoteSelect';
								   command[18] = JSON.stringify(params).replace(/[%]/g, "%25").replace(/[&]/g, "%26").replace(/[;]/g, "%3B").replace(/[#]/g, "%23");
							   }
							   if(action['params']['pageNumRecords'])
								   command[4] = 'PageNumRecords';
							   
							   var sendRequest = command.join('');
							   var reqParams = sendRequest.substring(sendRequest.indexOf("?")+1);
							   //var reqParams = sendRequest.split('?')[1];
							   if(reqParams != undefined){
								   $.utility('sendPOSTRequest', reqParams, 'Select');;
							   }
						   }
					   },2000);
				   }).fail(function(err) {
						console.log( "---- Fail : External Plugin Authentication ----" );
				   });
			   }
			   
			   var actionCallback = undefined;
			   if(action['comboBox'] != undefined && action['comboBox']){
				   actionCallback = JSON.parse(JSON.stringify(action['callingMethod']).replace(/"/g,"").replace(/'/g,"\""));
				   if($.utility('getComboBoxDataLoadingStatus')[actionCallback['uiobject']['id']] != undefined){
					   $.utility('setComboBoxDataLoadingStatus',actionCallback['uiobject']['id'], false);
				   }
			   }
			   
			   var timer = setInterval(function(){
				   if(!$.utility('isBusy') && ($.utility('getComActionStatus') != "") && ($.utility('getComActionStatus') === "Success")){
					   if(action['reloadStatus']){
						   if(pagedef['data']['contents']['reload']){// && pagedef['reloadRemoteNum'] === "reloadRemoteNumTotal"){
							   clearInterval(timer);
							   $.utility(action['reloadCallback'], pagedef, true);
							   pagedef['data']['contents']['reload'] = false;
							   $.utility('setComActionStatus',"");	
//							   pagedef['reloadRemoteNum'] = "";	
						   }
					   }else{
						   if(action['method'] == "RemoteNumRecords"){
							   if($.utility('getRemoteNumStatus') === "Success"){
								   clearInterval(timer);
								   //$.utility('setComActionStatus',"");	
								   $.utility('setRemoteNumStatus',"");	
								   callback(pagedef, ui, action, eventinitpagedef, true);
							   }
						   }else{
							   clearInterval(timer);
							   //$.utility('setComActionStatus',"");	
							   callback(pagedef, ui, action, eventinitpagedef, true);
						   }
					   }
				   }else if(!$.utility('isBusy') && ($.utility('getComActionStatus') != "") && ($.utility('getComActionStatus') === "Error")){
					   clearInterval(timer);
					   callback(pagedef, ui, action, eventinitpagedef, false);
				   }else if(actionCallback != undefined && $.utility('getComboBoxDataLoadingStatus')[actionCallback['uiobject']['id']] != undefined && $.utility('getComboBoxDataLoadingStatus')[actionCallback['uiobject']['id']]['loadingStatus']){
					   clearInterval(timer);
					   var comboData = $.utility('getComboBoxDataLoadingStatus')[actionCallback['uiobject']['id']]['data'];
					   var flag = false;
					   $.each(pagedef['children'],function(key,child){

						   if(actionCallback['uiobject']['ui'] === "comboBox"){
							   if(actionCallback['uiobject']['id'] === child['id']){
								   flag = true;
								   $.each(comboData,function(i,data){
									   pagedef['children'][key]['combo_options']['optionsID'][i]=data[actionCallback['uiobject']['fieldname']];
									   var chunks = actionCallback['uiobject']['displayText'].split("[");
									   var displayText = actionCallback['uiobject']['displayText'];
									   for ( var k = 0; k < chunks.length; k++ ) {
										   if (chunks[k].indexOf("]") != -1) {
											   var j = chunks[k].indexOf("]");
											   var org = "[" + chunks[k].substring(0, j) + "]";
											   var fin = data[chunks[k].substring(0, j)];
											   displayText = displayText.replace(org, fin);
										   }
									   }
									   pagedef['children'][key]['combo_options']['optionsValue'][i]=displayText;
								   });
								   //pagedef['comboBoxData'][child['id']]['isLoaded'] = true;
								   pagedef['comboBoxData'][child['id']] = {'isLoaded': true};
							   }

						   }
					   });

					   if(!flag){
						   $.each(pagedef['toolbartop']['children'],function(key,child){

							   if(actionCallback['uiobject']['ui'] === "comboBox"){
								   if(actionCallback['uiobject']['id'] === child['id']){
									   flag = true;
									   $.each(comboData,function(i,data){
										   pagedef['toolbartop']['children'][key]['combo_options']['optionsID'][i]=data[actionCallback['uiobject']['fieldname']];
										   var chunks = actionCallback['uiobject']['displayText'].split("[");
										   var displayText = actionCallback['uiobject']['displayText'];
										   for ( var k = 0; k < chunks.length; k++ ) {
											   if (chunks[k].indexOf("]") != -1) {
												   var j = chunks[k].indexOf("]");
												   var org = "[" + chunks[k].substring(0, j) + "]";
												   var fin = data[chunks[k].substring(0, j)];
												   displayText = displayText.replace(org, fin);
											   }
										   }
										   pagedef['toolbartop']['children'][key]['combo_options']['optionsValue'][i]=displayText;
									   });
									   //pagedef['comboBoxData'][child['id']]['isLoaded'] = true;
									   pagedef['comboBoxData'][child['id']] = {'isLoaded': true};
								   }
							   }
						   });
					   }
					   if(!flag){
						   $.each(pagedef['toolbarbottom']['children'],function(key,child){

							   if(actionCallback['uiobject']['ui'] === "comboBox"){
								   if(actionCallback['uiobject']['id'] === child['id']){
									   flag = true;
									   $.each(comboData,function(i,data){
										   pagedef['toolbarbottom']['children'][key]['combo_options']['optionsID'][i]=data[actionCallback['uiobject']['fieldname']];
										   var chunks = actionCallback['uiobject']['displayText'].split("[");
										   var displayText = actionCallback['uiobject']['displayText'];
										   for ( var k = 0; k < chunks.length; k++ ) {
											   if (chunks[k].indexOf("]") != -1) {
												   var j = chunks[k].indexOf("]");
												   var org = "[" + chunks[k].substring(0, j) + "]";
												   var fin = data[chunks[k].substring(0, j)];
												   displayText = displayText.replace(org, fin);
											   }
										   }
										   pagedef['toolbarbottom']['children'][key]['combo_options']['optionsValue'][i]=displayText;
									   });
									   //pagedef['comboBoxData'][child['id']]['isLoaded'] = true;
									   pagedef['comboBoxData'][child['id']] = {'isLoaded': true};
								   }
							   }
						   });
					   }
					   if(!flag){
							$.each(pagedef['toolbarleft']['children'],function(key,child){
								if(actionCallback['uiobject']['ui'] === "comboBox"){
									if(actionCallback['uiobject']['id'] === child['id']){
									    flag = true;
										$.each(comboData,function(i,data){
											   pagedef['toolbarleft']['children'][key]['combo_options']['optionsID'][i]=data[actionCallback['uiobject']['fieldname']];
											   var chunks = actionCallback['uiobject']['displayText'].split("[");
											   var displayText = actionCallback['uiobject']['displayText'];
											   for ( var k = 0; k < chunks.length; k++ ) {
												   if (chunks[k].indexOf("]") != -1) {
													   var j = chunks[k].indexOf("]");
													   var org = "[" + chunks[k].substring(0, j) + "]";
													   var fin = data[chunks[k].substring(0, j)];
													   displayText = displayText.replace(org, fin);
												   }
											   }
											   pagedef['toolbarleft']['children'][key]['combo_options']['optionsValue'][i]=displayText;
										});
										pagedef['comboBoxData'][child['id']] = {'isLoaded': true};
									}
								}
							});
						}
				   }

			   },200)
		   };
		   
		  var RemoteSelect = function(){
			  if(action['params']['servicename'] == undefined){
				   new $.actions(pagedef, null, [{method:"Select", category:"DBAction", params:{tablename:action['params']['tablename'], where:$.utility("tokenizeString",action['params']['where'], pagedef,action), order:$.utility("tokenizeString",action['params']['order'], pagedef,action), columns:""}, events:action['events']}]).execute();
			  }else if(action['params']['servicename'] === 'Mobilous'){
				  $.utility('queryDatabase',true);
				  var testParams = {};
				  if(pagedef['type'] === "RemoteTableViewList" || pagedef['type'] === "DBTableViewList"){
					  if((ui != null || ui != undefined)){
						  var rownum;
						  if(ui['rownum'] != undefined){
							  rownum = ui['rownum'];
						  }else{
							  rownum = ui.getName().substring(ui.getName().lastIndexOf("-") + 1,ui.getName().length);
						  }
						  for(var key in action['params']){
							  if(key == "table"){
								  testParams["table"]  = action['params'][key];
							  }else{
								  if(key == "where"){
									  if(!isNaN(parseInt(rownum))){
										  if(pagedef['type'] === "RemoteTableViewList" || pagedef['type'] === "DBTableViewList"){
											  var chunks = action['params'][key].toString().split("[");
											  for ( var i = 0; i < chunks.length; i++) {
												  if (chunks[i].indexOf("]") != -1) {
													  var j = chunks[i].indexOf("]");
													  var org = "[" + chunks[i].substring(0, j) + "]";
													  var fin = "";
													  if(pagedef['data']['contents'][rownum][chunks[i].substring(0, j)] != undefined){
														  fin = pagedef['data']['contents'][rownum][chunks[i].substring(0, j)];  
													  }else{
														  fin = $.utility("CheckAndGetUIElementValue",$("[name='" + chunks[i].substring(0, j) + "-"+rownum+"']"), chunks[i].substring(0, j)+ "-"+rownum, pagedef);
													  }
													  
													  action['params'][key] = action['params'][key].replace(org, fin);
												  }
											  }  
											  testParams[key] = action['params'][key];
										  }else{
											  action['params'][key] = action['params'][key].toString().replace(/]/gi, '-' + rownum + ']');
											  testParams[key] = $.utility("tokenizeString",action['params'][key] + "-"+ rownum, pagedef,action);
										  }
									  }else{
										  testParams[key] = $.utility("tokenizeString",action['params'][key], pagedef,action);
									  }
								  }else{
									  testParams[key] = action['params'][key];
								  }
							  }
						  }
					  }else{
						  for(var key in action['params']){
							  if(key == "table"){
								  testParams["table"]  = action['params'][key];
							  }else{
								  testParams[key] = $.utility("tokenizeString",action['params'][key], pagedef,action);
							  }
						  }
					  }
				  }else{
					  for(var key in action['params']){
						  if(key == "table"){
							  testParams["table"]  = action['params'][key];
						  }else{
							  testParams[key] = $.utility("tokenizeString",action['params'][key], pagedef,action);
						  }
						 
					  }
				  }
				  if($.mobileweb['release'] != undefined && $.mobileweb['release']){
					  testParams['database'] = 'db_' + $.mobileweb['pid']+"_release";
				  }else{	
					  testParams['database'] = 'db_' + $.mobileweb['pid'];
				  }
				  command[2] = 'remoteselect';
				  command[4] = 'RemoteSelect';
				  command[18] = JSON.stringify(testParams).replace(/[%]/g, "%25").replace(/[&]/g, "%26").replace(/[+]/g, "%2B").replace(/[;]/g, "%3B").replace(/[#]/g, "%23");
				  //$.utility('sendRequest',command.join(''));
				  
				  // implementing POST request.
				  var sendRequest = command.join('');
				  var reqParams = sendRequest.substring(sendRequest.indexOf("?")+1);
				   //var reqParams = sendRequest.split('?')[1];
				  if(reqParams != undefined){
					  $.utility('sendPOSTRequest', reqParams, 'RemoteSelect');
				  }
				  
			  }else{// For external service only...
				  $.utility('queryDatabase',true);
				  var testParams = {};
				  if(pagedef['type'] === "RemoteTableViewList" || pagedef['type'] === "DBTableViewList"){
					  if((ui != null || ui != undefined) && ui['rownum'] != undefined){
						  for(var key in action['params']){
							  if(key == "table"){
								  testParams["table"]  = action['params'][key];
							  }else{
								  if(key == "where"){
									  if(pagedef['type'] === "RemoteTableViewList" || pagedef['type'] === "DBTableViewList"){
										  var chunks = action['params'][key].toString().split("[");
										  for ( var i = 0; i < chunks.length; i++) {
											  if (chunks[i].toString().indexOf("]") != -1) {
												  var j = chunks[i].toString().indexOf("]");
												  var org = "[" + chunks[i].substring(0, j) + "]";
												  var fin = "";
												  if(pagedef['data']['contents'][ui['rownum']][chunks[i].substring(0, j)] != undefined){
													  fin = pagedef['data']['contents'][ui['rownum']][chunks[i].substring(0, j)];  
												  }else{
													  if($("[name='" + chunks[i] + "-"+rownum+"']").length > 0)
														  fin = $.utility("CheckAndGetUIElementValue",$("[name='" + chunks[i].substring(0, j) + "-"+rownum+"']"), chunks[i].substring(0, j)+ "-"+rownum, pagedef);
													  else
														  fin = $.utility("CheckAndGetUIElementValue",$("[name='" + chunks[i].substring(0, j) + "']"), chunks[i].substring(0, j), pagedef);
												  }
												  action['params'][key] = action['params'][key].replace(org, fin);
											  }
										  }  
										   testParams[key] = action['params'][key];
									  }else{
										  action['params'][key] = action['params'][key].toString().replace(/]/gi, '-' + ui['rownum'] + ']');
										  testParams[key] = $.utility("tokenizeString",action['params'][key] + "-"+ ui['rownum'], pagedef,action);
									  }
								  }else{
									  testParams[key] = action['params'][key];
								  }
							  }
						  }
					  }else{
						  for(var key in action['params']){
							  if(key == "table"){
								  testParams["table"]  = action['params'][key];
							  }else{
								  testParams[key] = $.utility("tokenizeString",action['params'][key], pagedef,action);
							  }
						  }
					  }
				  }else{
					  for(var key in action['params']){
						  if(key == "table"){
							  testParams["table"]  = action['params'][key];
						  }else{
							  testParams[key] = $.utility("tokenizeString",action['params'][key], pagedef,action);
						  }
					  }
				  }
				  
				  var getJSONfrom = $.mobileweb['baseurl']+'/mobileweb/mobile/extsvc?uri='+command[0];
				  if($.utility('getServerPort') == "8181"){
					  getJSONfrom = command[0];
				  }
				 
				  $.getJSON(getJSONfrom, function(data){
					  if(data == null){
						  var timer = setInterval(function(){
							  if($.utility('appendDeviceInfo') != ""){
								  clearInterval(timer);
								  
								  var callingMethod = (action['callingMethod'] == undefined || action['callingMethod'] == "") ? "direct" : action['callingMethod'];
								  command = [$.utility('getCommServerDomain'),'llcomm?llcommand=sndmsg&command=','[command]','&jsonp=','[jsonp]',$.utility('appendDeviceInfo'),
								             '&callbackdata={"ver":"2","page":"',pagedef['name'],'","callingMethod":"',callingMethod,'","callback":"',"ExternalRemoteSelect",'","events":"',evt,'","table":"',action['params']['table'],'"}', '&cache=', Math.random(), '&dataset=', '[params]', '&project_id=', $.mobileweb['pid'], '&version=', $.mobileweb['version'], '&os=mw'];
								  command[2] = 'remoteselect';
								  command[4] = 'RemoteSelect';
								  command[20] = JSON.stringify(testParams).replace(/[%]/g, "%25").replace(/[&]/g, "%26").replace(/[+]/g, "%2B").replace(/[;]/g, "%3B").replace(/[#]/g, "%23");
								  
								  var sendRequest = command.join('');
								  var reqParams = sendRequest.substring(sendRequest.indexOf("?")+1);
								  if(reqParams != undefined){
									  $.utility('sendPOSTRequest', reqParams, 'RemoteSelect');
								  }
							  }
						  },2000);
					  }else{
						  var timer = setInterval(function(){
							  if($.utility('appendDeviceInfo') != ""){
								  clearInterval(timer);
								  
								  var dataJson = (data.authURL) ? JSON.parse(data.authURL) : data;
								  if(dataJson['ret'] == "ACK"){
									  var callingMethod = (action['callingMethod'] == undefined || action['callingMethod'] == "") ? "direct" : action['callingMethod'];
									  command = [$.utility('getCommServerDomain'),'llcomm?llcommand=sndmsg&command=','[command]','&jsonp=','[jsonp]',$.utility('appendDeviceInfo'),
									             '&callbackdata={"ver":"2","page":"',pagedef['name'],'","callingMethod":"',callingMethod,'","callback":"',"ExternalRemoteSelect",'","events":"',evt,'","table":"',action['params']['table'],'"}', '&cache=', Math.random(), '&dataset=', '[params]', '&project_id=', $.mobileweb['pid'], '&version=', $.mobileweb['version'], '&os=mw'];
									  command[2] = 'remoteselect';
									  command[4] = 'RemoteSelect';
									  command[20] = JSON.stringify(testParams).replace(/[%]/g, "%25").replace(/[&]/g, "%26").replace(/[+]/g, "%2B").replace(/[;]/g, "%3B").replace(/[#]/g, "%23");
									  
									  var sendRequest = command.join('');
									  var reqParams = sendRequest.substring(sendRequest.indexOf("?")+1);
									  if(reqParams != undefined){
										  $.utility('sendPOSTRequest', reqParams, 'RemoteSelect');
									  }

								  }else{
									  var OAuth_url = dataJson['retdic']['authorize_url'];
									  if(OAuth_url) {
										  var win = window.open(dataJson['retdic']['authorize_url']);
										  if (win == null || typeof(win)=='undefined'){
											  alert("Turn off your pop-up blocker! and Refresh the page. \n\nWe try to open the following url:\n"+OAuth_url);
										  }else {
											  //	win.document.write("<p>This is 'MsgWindow'. I am 200px wide and 100px tall!</p>");
										  }
										  var pollTimer = window.setInterval(function() {
											  if (win.closed) {
												  window.clearInterval(pollTimer);
											  }
											  if (win.location != null) {
												  try{
													  //console.log(win.location.hostname);
													  if(win.location.href != null && win.location.href != undefined){
														  if(win.location.href == "https://console.mobilous.com/en/login"){
															  //$.GoogleService('setAccessTokenCookies',win.location.href);
															  window.clearInterval(pollTimer);
															  win.close();
															  //$.GoogleService(callingMethod, args, events, pagedef, ui);
														  }
													  }
												  }catch(e){
													  console.log(e);
													  window.clearInterval(pollTimer);
													  win.close();
												  }
											  }
										  }, 1000);
										  
									  }else {
										  
										  callback(pagedef, ui, tempAction, eventinitpagedef, true);
									  }
								  }

							  }
						  },2000);
					  }
				  }).fail(function(err) {
					  var timer = setInterval(function(){
						  if($.utility('appendDeviceInfo') != ""){
							  clearInterval(timer);
							  
							  var callingMethod = (action['callingMethod'] == undefined || action['callingMethod'] == "") ? "direct" : action['callingMethod'];
							  command = [$.utility('getCommServerDomain'),'llcomm?llcommand=sndmsg&command=','[command]','&jsonp=','[jsonp]',$.utility('appendDeviceInfo'),
							             '&callbackdata={"ver":"2","page":"',pagedef['name'],'","callingMethod":"',callingMethod,'","callback":"',"ExternalRemoteSelect",'","events":"',evt,'","table":"',action['params']['table'],'"}', '&cache=', Math.random(), '&dataset=', '[params]', '&project_id=', $.mobileweb['pid'], '&version=', $.mobileweb['version'], '&os=mw'];
							  command[2] = 'remoteselect';
							  command[4] = 'RemoteSelect';
							  command[20] = JSON.stringify(testParams).replace(/[%]/g, "%25").replace(/[&]/g, "%26").replace(/[+]/g, "%2B").replace(/[;]/g, "%3B").replace(/[#]/g, "%23");
							  
							  var sendRequest = command.join('');
							  var reqParams = sendRequest.substring(sendRequest.indexOf("?")+1);
							  if(reqParams != undefined){
								  $.utility('sendPOSTRequest', reqParams, 'RemoteSelect');
							  }
						  }
					  },2000);
				  });
			  }
			  
			  var timer = setInterval(function(){
				  if(!$.utility('isBusy') && ($.utility('getComActionStatus') != "") && ($.utility('getComActionStatus') === "Success")){
					  
					clearInterval(timer);
					if((action['events'] != undefined) && (action['events']['DetectRecords'].length > 0)){
						var records = $.utility('getRemoteDBRecords');
						var i = 0;
						var tempAction= JSON.parse(JSON.stringify(action));
						$.utility("showLoadingIndicator", true);
						function detectRecordsAction(){
							var tempPagedef= JSON.parse(JSON.stringify(pagedef));
							//var tempPagedef = $.utility('clone', pagedef);
								 
							if(tempPagedef['data']['contents'].constructor == Object && tempPagedef['data']['contents'][0] === undefined){
								jQuery.extend(tempPagedef['data']['contents'], records);
							}else{
								tempPagedef['data']['contents'] = [];
								for(var j = 0 ; j <  tempPagedef['data']['contents'].length; j++){
									jQuery.extend(tempPagedef['data']['contents'][j], records[i]);
								}
								tempPagedef['data']['contents'][0] = records[i];
								tempRecords.push(tempPagedef['data']['contents'][0]);
							}
							var temp = {};
							jQuery.extend(temp,tempPagedef);
							$.actions(temp, ui, action['events']['DetectRecords'].slice() , eventinitpagedef, function(pagedef, ui, action , eventinitpagedef){
								i++;
								if(i < records.length){
								    detectRecordsAction();
								}else{
									pagedef['data']['contents'] = [];
									pagedef['data']['contents'] = tempRecords;
									callback(pagedef, ui, tempAction, eventinitpagedef, true);
								}
							}).execute();
						}
						var tempRecords = [];
						detectRecordsAction();
					  }else{
						  var records = $.utility('getRemoteDBRecords');
						  if(records != undefined){
							  if(records.length == 0){
								  callback(pagedef, ui, action, eventinitpagedef, false);
								  return;
							  }
							  // pagedef['data']['contents'] should be replaced in case of either page 'creation' or 'change-condition', but not here. 
							  // We have to work on it further. 	Dated : 20-Dec-2018
							  
							  if(pagedef['data']['contents'].constructor == Object && pagedef['data']['contents'][0] === undefined){
								  jQuery.extend(pagedef['data']['contents'], records[0]);
							  }else{
								  
								  if(pagedef['data']['contents'] != undefined){
									  if(rownum == undefined){
										  if(pagedef['data']['tablename'] != undefined && (pagedef['data']['tablename'] === action['params']['table']))
											  jQuery.extend(pagedef['data']['contents'], records);
										  else{
											  for (var i = 0; i < pagedef['data']['contents'].length; i++){
												  if(pagedef['data']['contents'][i] != undefined){
													  jQuery.extend(pagedef['data']['contents'][i],records[0]);
												  }else
													  pagedef['data']['contents'][i] = records[0];
											  }
										  }
									  }else{
										  pagedef['data']['contents']['currentRow'] = rownum;
										  if(pagedef['data']['contents'][rownum] != undefined){
											  if(records[rownum]){
												  jQuery.extend(pagedef['data']['contents'][rownum],records[rownum]);
											  }else{
												  jQuery.extend(pagedef['data']['contents'][rownum],records[0]);
											  }
										  }
									  }
								  }
								  
							  }
							  callback(pagedef, ui, action, eventinitpagedef, true);
						  }
					  }
					   
				   }else if(!$.utility('isBusy') && ($.utility('getComActionStatus') != "") && ($.utility('getComActionStatus') === "Error")){
					   clearInterval(timer);
					   callback(pagedef, ui, action, eventinitpagedef, false);
				   }
				  
			  }, 200); 
			   
		  };
		  
		  var Update = function(){
			var selectedTableData = [];
			var tables=$.mobileweb['comdb']['schema'];
			var whereCondition = '';
			for(var i=0; i < tables.length; i++ ){
				if(tables[i]['tablename'] == params['table']){
					selectedTableData = tables[i]; 
				}
			}
			if(params['where'] === undefined){
				params['where'] = "";				
			}
			
			var actionFlag = true;
			if(pagedef != null){
				if(pagedef['type'] === "DBTableViewList" || pagedef['type'] == 'RemoteTableViewList'){
					var rowNum = 0;
					rowNum =pagedef['data']['contents']['currentRow'];
					if(ui != undefined){
						if(ui['rownum'] == undefined){
							if(ui.getId != undefined){
								var uiId = ui.getId();
								var tempStr = uiId.substr(0, uiId.lastIndexOf('-'));
								rowNum = tempStr.substr(tempStr.lastIndexOf('-')+1, tempStr.length);
							}                     
						}else
							rowNum = ui['rownum'];
						
						if(isNaN(parseInt(rowNum)))//Bug 11318 Fix
							rowNum= 0;
					}
				}

				if(pagedef['data']['contents'][rowNum] != undefined){
					whereCondition = $.utility('formWhereCondition',$.utility('extractDataFromRecord',pagedef['data']['contents'][rowNum],action['params']['where'],actionFlag));
				}else if(pagedef['data']['contents'][0] != undefined && pagedef['data']['contents'][0][rowNum] != undefined)// Bug #11323 Fix	
					whereCondition = $.utility('formWhereCondition',$.utility('extractDataFromRecord',pagedef['data']['contents'][0][rowNum],action['params']['where'],actionFlag));
				else
					whereCondition = $.utility('formWhereCondition',action['params']['where'],pagedef);
			}
			
			if (whereCondition != undefined && whereCondition != "") 
			    params['where'] = whereCondition;
		    else{
			    var pk = $.utility('getPK',params['table'], $.mobileweb['comdb']['schema']);
			    var noOfPk = pk.length;
			    for(var i =0 ; i <pk.length; i++){
				   if(i != noOfPk -1){
					   params['where'] = params['where'] + [pk[i], " = '", $.utility('extractDataFromRecord',pagedef['data']['contents'][0], '['+pk+']'), "' AND"].join('');
				   }else{
					   params['where'] = params['where'] +  [pk[i], " = '", $.utility('extractDataFromRecord',pagedef['data']['contents'][0], '['+pk+']'), "'"].join('');
				   }
			    }
		    }
		    
		    for(var key in params['rec']){
				if(params['rec'][key] == ""){
					var selectedTableFields = selectedTableData['fields'];
					for(var i=0; i < selectedTableFields.length; i++){
						if(key == selectedTableFields[i]['name']){
							if(selectedTableFields[i]['type'] != "TEXT"){
								//delete params['rec'][key];
								params['rec'][key] = null;			//<-- We need to send 'null' in such cases. In return, value will be empty/blank/''. This is as per discussion between Akira san & RT. Dated:17-Nov-2017
							}
						}
					}
				}
			}
		    
		    var keyNotExist = true;
		    var selectedTableFields = selectedTableData['fields'];
			for(var j=0; j < selectedTableFields.length; j++){
				var tableField = selectedTableFields[j]['name'];
				for(var key in action['params']['rec']){
					if(key == tableField)
						keyNotExist = false;
				}
			}
			if(keyNotExist){
				callback(pagedef, ui, action, eventinitpagedef, false);
				return;
			}
			
			if(action['params']['servicename'] === "Mobilous"){
			    command[2] = 'remoteupdate';
				if(action['flag'] != undefined && action['flag']){
					command[4] = 'RemoteProcessContinue';
				}else{
					command[4] = 'RemoteProcess';
				}
				if(pagedef['parentType'] === "SplitView"){
					command[13] = "SplitView";
				}else{
					command[13] = "";
				}
				command[18] = JSON.stringify(params).replace(/[%]/g, "%25").replace(/[&]/g, "%26").replace(/[+]/g, "%2B").replace(/[#]/g, "%23");
				//$.utility('sendRequest',command.join(''));
				
				var sendRequest = command.join('');
				var reqParams = sendRequest.substring(sendRequest.indexOf("?")+1);
				   //var reqParams = sendRequest.split('?')[1];
				if(reqParams != undefined){
					$.utility('sendPOSTRequest', reqParams, 'Update');
				}
				 
				var timer = setInterval(function() {
					if(!$.utility('isBusy') && ($.utility('getComActionStatus') != "") && ($.utility('getComActionStatus') === "Success")){
						clearInterval(timer);
						callback(pagedef, ui, action, eventinitpagedef, true);
					}else if(!$.utility('isBusy') && ($.utility('getComActionStatus') != "") && ($.utility('getComActionStatus') === "Error")){
						clearInterval(timer);
						callback(pagedef, ui, action, eventinitpagedef, false);
					}else if(!$.utility('isBusy') && ($.utility('getComActionStatus') != "") && ($.utility('getComActionStatus') === "SynchSuccess")){
						clearInterval(timer);
						callback(pagedef, ui, action, eventinitpagedef, true);
					}else if(!$.utility('isBusy') && ($.utility('getComActionStatus') != "") && ($.utility('getComActionStatus') === "SynchError")){
						clearInterval(timer);
						callback(pagedef, ui, action, eventinitpagedef, false);
					}
				}, 100);
				
			}else{
			// For external service only...
				var getJSONfrom = $.mobileweb['baseurl']+'/mobileweb/mobile/extsvc?uri='+command[0];
				if($.utility('getServerPort') == "8181"){
				  getJSONfrom = command[0];
				}
				
				$.getJSON(getJSONfrom, function(data){
					  var timer = setInterval(function(){
						  if($.utility('appendDeviceInfo') != ""){
							  clearInterval(timer);
							  
							  var callingMethod = (action['callingMethod'] == undefined || action['callingMethod'] == "") ? "direct" : action['callingMethod'];
							  command = [$.utility('getCommServerDomain'),'llcomm?llcommand=sndmsg&command=','[command]','&jsonp=','[jsonp]',$.utility('appendDeviceInfo'),
							             '&callbackdata={"ver":"2","page":"',pagedef['name'],'","callingMethod":"',callingMethod,'","events":"',evt,'","table":"',action['params']['table'],'"}', '&cache=', Math.random(), '&dataset=', '[params]', '&project_id=', $.mobileweb['pid'], '&version=', $.mobileweb['version'], '&os=mw'];
							  command[2] = 'remoteupdate';
							  if(action['flag'] != undefined && action['flag']){
								  command[4] = 'RemoteProcessContinue';
							  }else{
								  command[4] = 'RemoteProcess';
							  }
							  if(pagedef['parentType'] === "SplitView"){
								  command[13] = "SplitView";
							  }else{
								  command[13] = "";
							  }
							  command[18] = JSON.stringify(params).replace(/[%]/g, "%25").replace(/[&]/g, "%26").replace(/[;]/g, "%3B").replace(/[#]/g, "%23");
							  //$.utility('sendRequest',command.join(''));
								
							  var sendRequest = command.join('');
							  var reqParams = sendRequest.substring(sendRequest.indexOf("?")+1);
							   //var reqParams = sendRequest.split('?')[1];
							  if(reqParams != undefined){
								  $.utility('sendPOSTRequest', reqParams, 'Update');
							  }
							  
							  var timer = setInterval(function() {
								   if(!$.utility('isBusy') && ($.utility('getComActionStatus') != "") && ($.utility('getComActionStatus') === "Success")){
									   clearInterval(timer);
									   callback(pagedef, ui, action, eventinitpagedef, true);
								   }else if(!$.utility('isBusy') && ($.utility('getComActionStatus') != "") && ($.utility('getComActionStatus') === "Error")){
									   clearInterval(timer);
									   callback(pagedef, ui, action, eventinitpagedef, false);
								   }else if(action['flag'] && !$.utility('isBusy') && ($.utility('getComActionStatus') != "") && ($.utility('getComActionStatus') === "SynchSuccess")){
									   clearInterval(timer);
									   callback(pagedef, ui, action, eventinitpagedef, true);
								   }
							  }, 100);	
						  }
					  },2000)
				  });
			}
		  };
		  
		  var Delete = function(){
			  if((params['where']!=='') && (params['where'] != undefined)){
				  if(pagedef != null){
					  var actionFlag = true;
						if(pagedef['type'] === "DBTableViewList" || pagedef['type'] == 'RemoteTableViewList'){
							if(ui != undefined){ 
								var rowNum = pagedef['data']['contents']['currentRow'];
								if(ui.getId != undefined){
									var uiId = ui.getId();
									var tempStr = uiId.substr(0, uiId.lastIndexOf('-'));
									rowNum = tempStr.substr(tempStr.lastIndexOf('-')+1, tempStr.length);
								}
	                            if(!isNaN(parseInt(rowNum)))
	                            	ui['rownum']= rowNum;
	                            else if(!isNaN(parseInt(pagedef['data']['contents']['currentRow'])))  //Bug #12436 fix
	                            	ui['rownum']= pagedef['data']['contents']['currentRow'];
	                            else
	                            	ui['rownum']= 0;
							}
						}
				  }
				  if(ui['rownum'] != undefined){
					  params['where'] = $.utility('formWhereCondition',$.utility('extractDataFromRecord',pagedef['data']['contents'][ui['rownum']],action['params']['where'],actionFlag));	
					  //$.utility('extractDataFromRecord',pagedef['data']['contents'][ui['rownum']], $.utility('tokenizeString',params['where'], pagedef));
				  }else{
					  params['where'] = $.utility('formWhereCondition',$.utility('extractDataFromRecord',pagedef['data']['contents'][0],action['params']['where'],actionFlag));
					  //$.utility('extractDataFromRecord',pagedef['data']['contents'][0], $.utility('tokenizeString',params['where'], pagedef));
				  }
			  }
			  else{
				  var pk = $.utility('getPK',params['table'], $.mobileweb['comdb']['schema']); 
				  var noOfPk = pk.length;

				  for(var i =0 ; i <pk.length; i++){
					  if(i != noOfPk -1){
						  params['where'] = params['where'] + [pk[i], " = '", $.utility('extractDataFromRecord',pagedef['data']['contents'][0], '['+pk+']'), "' AND"].join('');
					  }else{
						  params['where'] = params['where'] +  [pk[i], " = '", $.utility('extractDataFromRecord',pagedef['data']['contents'][0], '['+pk+']'), "'"].join('');
					  }
				  }
			  }
			  
			  if(action['params']['servicename'] === "Mobilous"){
				  command[2] = 'remotedelete';
				  command[4] = 'RemoteProcess';
				  if(pagedef['parentType'] === "SplitView"){
					  command[13] = "SplitView";
				  }else{
					  command[13] = "";
				  }
				  command[18] = JSON.stringify(params);
				  //$.utility('sendRequest',command.join(''));
					
				  var sendRequest = command.join('');
				  var reqParams = sendRequest.substring(sendRequest.indexOf("?")+1);
				   //var reqParams = sendRequest.split('?')[1];
				  if(reqParams != undefined){
					  $.utility('sendPOSTRequest', reqParams, 'Delete');
				  }
				  
			  }else{// For external service only...
				  var getJSONfrom = $.mobileweb['baseurl']+'/mobileweb/mobile/extsvc?uri='+command[0];
				  if($.utility('getServerPort') == "8181"){
					  getJSONfrom = command[0];
				  }
					
				  $.getJSON(getJSONfrom).always(function(data){
					  var timer = setInterval(function(){
						  if($.utility('appendDeviceInfo') != ""){
							  clearInterval(timer);
							  
							  var callingMethod = (action['callingMethod'] == undefined || action['callingMethod'] == "") ? "direct" : action['callingMethod'];
							  command = [$.utility('getCommServerDomain'),'llcomm?llcommand=sndmsg&command=','[command]','&jsonp=','[jsonp]',$.utility('appendDeviceInfo'),
							             '&callbackdata={"ver":"2","page":"',pagedef['name'],'","callingMethod":"',callingMethod,'","events":',evt,',"table":"',action['params']['table'],'"}', '&cache=', Math.random(), '&dataset=', '[params]', '&project_id=', $.mobileweb['pid'], '&version=', $.mobileweb['version'], '&os=mw'];
							  command[2] = 'remotedelete';
							  if(action['flag'] != undefined && action['flag']){
								  command[4] = 'RemoteProcessContinue';
							  }else{
								  command[4] = 'RemoteProcess';
							  }
							  if(pagedef['parentType'] === "SplitView"){
								  command[13] = "SplitView";
							  }else{
								  command[13] = "";
							  }
							  command[18] = JSON.stringify(params).replace(/[%]/g, "%25").replace(/[&]/g, "%26").replace(/[;]/g, "%3B").replace(/[#]/g, "%23");
							 // $.utility('sendRequest',command.join(''));
								
							  var sendRequest = command.join('');
							  var reqParams = sendRequest.substring(sendRequest.indexOf("?")+1);
							   //var reqParams = sendRequest.split('?')[1];
							  if(reqParams != undefined){
								  $.utility('sendPOSTRequest', reqParams, 'Delete');
							  }
						  }

					  },2000);
				  }).fail(function(err) {
					console.log( "---- Fail : External Plugin Authentication ----" );
				  });
			  }
			  
			  var timer =setInterval(function() {
				  if(!$.utility('isBusy') && ($.utility('getComActionStatus') != "") && ($.utility('getComActionStatus') === "Success")){
					  clearInterval(timer);
					  callback(pagedef, ui, action, eventinitpagedef, true);
				  }else if(!$.utility('isBusy') && ($.utility('getComActionStatus') != "") && ($.utility('getComActionStatus') === "Error")){
					  clearInterval(timer);
					  callback(pagedef, ui, action, eventinitpagedef, false);
				  }else if(!$.utility('isBusy') && ($.utility('getComActionStatus') != "") && ($.utility('getComActionStatus') === "SynchError")){
					   clearInterval(timer);
					   callback(pagedef, ui, action, eventinitpagedef, false);
				   }else if(!$.utility('isBusy') && ($.utility('getComActionStatus') != "") && ($.utility('getComActionStatus') === "SynchSuccess")){
					   clearInterval(timer);
					   callback(pagedef, ui, action, eventinitpagedef, true);
				   }
			  }, 100);
			 
		  };
		  
		  var SynchronizeDB = function(){
			  params['where'] = $.utility('tokenizeString',params['where'], pagedef,action);
			  params['table'] = $.utility('tokenizeString',params['table'], pagedef,action);
			  if(action['params']['servicename'] === 'Mobilous'){
				  $.utility('queryDatabase',true);
				  command[2] = 'remoteselect';
				  command[4] = 'UploadDBRecords';
				  command[28] = JSON.stringify(params).replace(/[%]/g, "%25").replace(/[&]/g, "%26").replace(/[;]/g, "%3B").replace(/[#]/g, "%23");
				  //$.utility('sendRequest',command.join(''));
					
				  var sendRequest = command.join('');
				  var reqParams = sendRequest.substring(sendRequest.indexOf("?")+1);
				   //var reqParams = sendRequest.split('?')[1];
				  if(reqParams != undefined){
					  $.utility('sendPOSTRequest', reqParams, 'SynchronizeDB');
				  }
				  
			  }else if(action['params']['servicename'] === undefined){
				  var callingAction = {method:"Select", category:"DBAction", callAnotherServiceFlag : true, callbackmethod : "UploadDBRecords", 
							params:{
								tablename: params['table'],
								where: params['where'],
								order: "",
								fields:""// $.utility('getColumns',pagedef['data']['tablename'],[],pagedef['children'])
							},
					  		toparams:{
					  		},
						};
				  action['toparams']['toTable'] = $.utility('tokenizeString', action['toparams']['toTable'], pagedef,action);
				  callingAction.toparams = action['toparams'];
				  callingAction.events = action['events'];
				  new $.actions(pagedef, null, [callingAction]).execute();
				  
			  }else{// For external service only...
				  var getJSONfrom = $.mobileweb['baseurl']+'/mobileweb/mobile/extsvc?uri='+command[0];
				  if($.utility('getServerPort') == "8181"){
					  getJSONfrom = command[0];
				  }
				  
				  $.getJSON(getJSONfrom).always(function(data){
					  //because of delay in response from init request, we have added setTimeout on 28 April,2015 
					  var timer = setInterval(function(){
						  if($.utility('appendDeviceInfo') != ""){
							  clearInterval(timer);
							  
							  var callingMethod = (action['callingMethod'] == undefined || action['callingMethod'] == "") ? "direct" : action['callingMethod'];
							  if(evt === "NOW REPLACED"){
								  command = [$.utility('getCommServerDomain'),'llcomm?llcommand=sndmsg&command=','[command]','&jsonp=','[jsonp]',$.utility('appendDeviceInfo'),
								             '&callbackdata={"ver":"2","page":"',pagedef['name'],'","callingMethod":"',callingMethod,'","events":"',evt,'","table":"',action['params']['table'],'"}', '&cache=', Math.random(), '&dataset=', '[params]', '&project_id=', $.mobileweb['pid'], '&version=', $.mobileweb['version'], '&os=mw'];
								  command[2] = 'remoteselect';
								  command[4] = 'UploadDBRecords';
								  command[20] = JSON.stringify(params).replace(/[%]/g, "%25").replace(/[&]/g, "%26").replace(/[;]/g, "%3B").replace(/[#]/g, "%23");
								  //$.utility('sendRequest',command.join(''));
							  }else{
								  command = [$.utility('getCommServerDomain'),'llcomm?llcommand=sndmsg&command=','[command]','&jsonp=','[jsonp]',$.utility('appendDeviceInfo'),
								             '&callbackdata={"ver":"2","page":"',pagedef['name'],'","callingMethod":"',callingMethod,'","fromDB":"','comdb','","events":',evt,',"table":"',$.utility('tokenizeString', action['params']['table'], pagedef,action),'","ToService":"',action['toparams']['toService'],'","ToTable":"',$.utility('tokenizeString', action['toparams']['toTable'], pagedef,action),'","forceFlag":"',action['toparams']['forceFlag'],'","forceUpdate":"',action['toparams']['forceUpdate'],'"}', '&cache=', Math.random(), '&dataset=', '[params]', '&project_id=', $.mobileweb['pid'], '&version=', $.mobileweb['version'], '&os=mw'];
								  command[2] = 'remoteselect';
								  command[4] = 'UploadDBRecords';
								  command[28] = JSON.stringify(params);
								  //$.utility('sendRequest',command.join(''));
							  }
							  
							  var sendRequest = command.join('');
							  var reqParams = sendRequest.substring(sendRequest.indexOf("?")+1);
							   //var reqParams = sendRequest.split('?')[1];
							  if(reqParams != undefined){
								  $.utility('sendPOSTRequest', reqParams, 'SynchronizeDB');
							  }
						  }
					  },2000);
				  }) .fail(function(err) {
					console.log( "---- Fail : External Plugin Authentication ----" );
				  });
			  }
			  
			  var timer =setInterval(function() {
				  if(!$.utility('isBusy') && ($.utility('getComActionStatus') != "") && ($.utility('getComActionStatus') === "SynchSuccess")){
					  clearInterval(timer);
					  callback(pagedef, ui, action, eventinitpagedef, true);
				  }else if(!$.utility('isBusy') && ($.utility('getComActionStatus') != "") && ($.utility('getComActionStatus') === "SynchError")){
					  clearInterval(timer);
					  callback(pagedef, ui, action, eventinitpagedef, false);
				  }
			  }, 100);
		  };
		  
		  
		  var SelectNewService = function(){
			  $.utility('queryDatabase',true);
			  if(action['params']['servicename'] === 'Mobilous'){
				  command[2] = 'remoteselect';
				  command[4] = 'SelectNewService';
				  command[24] = JSON.stringify(params).replace(/[%]/g, "%25").replace(/[&]/g, "%26").replace(/[;]/g, "%3B").replace(/[#]/g, "%23");
				  //$.utility('sendRequest',command.join(''));
					
				  var sendRequest = command.join('');
				  var reqParams = sendRequest.substring(sendRequest.indexOf("?")+1);
				   //var reqParams = sendRequest.split('?')[1];
				  if(reqParams != undefined){
					  $.utility('sendPOSTRequest', reqParams, 'SelectNewService');
				  }
			  }else{// For external service only...
				  $.utility('sendJSONRequest', command[0]);
			  }
		  };
		  
		  var Login = function(){
		   switch(pagedef['type']){
		     case 'BaseView':
		     case 'ScrollView':
		     pagedef['data']['contents'][0] = $.utility('savePageData', pagedef['children'], pagedef['data']['contents'][0]);
		     $.utility('replaceRecordWithPagedata',params, pagedef['data']['contents'][0]);
		     break;
		   }
		   command[2] = 'login';
		   command[4] = 'AcctLogin';
		   command[16] = JSON.stringify(params);
		   $.utility('sendRequest',command.join(''));
		   $('body').everyTime(100, function() {
			   if(!$.utility('isBusy') && ($.utility('getComActionStatus') != "") && ($.utility('getComActionStatus') === "Success")){
				   $('body').stopTime();
				   callback(pagedef, ui, action, eventinitpagedef, true);
			   }else if(!$.utility('isBusy') && ($.utility('getComActionStatus') != "") && ($.utility('getComActionStatus') === "Error")){
				   $('body').stopTime();
				   callback(pagedef, ui, action, eventinitpagedef, false);
			   }
		   });
		  };
		   
		  var Register = function(){
		    switch(pagedef['type']){
		     case 'BaseView':
		     case 'ScrollView':
		     pagedef['data']['contents'][0] = $.utility('savePageData', pagedef['children'], pagedef['data']['contents'][0]);
		     $.utility('replaceRecordWithPagedata',params, pagedef['data']['contents'][0]);
		     break;
		   }
		   command[2] = 'register';
		   command[4] = 'AcctRegistry';
		   command[16] = JSON.stringify(params);
		   $.utility('sendRequest',command.join(''));
		   var timer = setInterval(function() {
					   if(!$.utility('isBusy') && ($.utility('getComActionStatus') != "") && ($.utility('getComActionStatus') === "Success")){
						 clearInterval(timer);
						   callback(pagedef, ui, action, eventinitpagedef, true);
					   }else if(!$.utility('isBusy') && ($.utility('getComActionStatus') != "") && ($.utility('getComActionStatus') === "Error")){
						   clearInterval(timer);
						   callback(pagedef, ui, action, eventinitpagedef, false);
					   }
			}, 100);
		  };
		  
		  var GeneralLogin = function(){
			//Creatng script for GeneralLogin..

			if(action['params']['username'] && action['params']['password'] && action['params']['servicename']){
				var username = $.utility("tokenizeString",action['params']['username'], pagedef,action);
				var password = $.utility("tokenizeString",action['params']['password'], pagedef,action);
				// Encripting Password Field..
				if(password != ''){
					switch(action['params']['encrypt']){
						case 'md5':
							password = CryptoJS.MD5(password);
							break;
						case 'sha256':
							password = CryptoJS.SHA256(password);
							break;	
						case 'sha512':
							password = CryptoJS.SHA512(password);
							break;
					}
				}
				 
				var databaseName = "";
				if(action['params']['database'] == undefined){
					if($.mobileweb['release'] != undefined && $.mobileweb['release']){
						databaseName = "db_" +  $.mobileweb['pid']+"_release";
					}else{	
						databaseName = "db_" +  $.mobileweb['pid'];
					}
				}else {
					databaseName = action['params']['database'];
				}
				
				var loginParams = {database:databaseName, usernameField:action['params']['usernameField'], table:action['params']['table'], servicename:action['params']['servicename'], passwordField:action['params']['passwordField'], where:" "+action['params']['usernameField']+" = '"+username+"' and "+action['params']['passwordField']+" = '"+password+"'"};
				
				var _fieldNames = [];
				if(action['params']['resultFields']){
					_fieldNames.push(action['params']['resultFields']);
				}
				
				if(_fieldNames.length > 0) {
					loginParams = {database:databaseName, usernameField:action['params']['usernameField'], table:action['params']['table'], servicename:action['params']['servicename'], passwordField:action['params']['passwordField'],fields:_fieldNames, where:" "+action['params']['usernameField']+" = '"+username+"' and "+action['params']['passwordField']+" = '"+password+"'"};
				}
				command[2] = 'remoteselect';
				command[4] = 'RemoteSelect';
				command[16] = JSON.stringify(loginParams).replace(/[%]/g, "%25").replace(/[&]/g, "%26").replace(/[;]/g, "%3B").replace(/[#]/g, "%23");
				//$.utility('sendRequest',command.join(''));
				
				var sendRequest = command.join('');
				var reqParams = sendRequest.substring(sendRequest.indexOf("?")+1);
				   //var reqParams = sendRequest.split('?')[1];
				if(reqParams != undefined){
				    $.utility('sendPOSTRequest', reqParams, 'GeneralLogin');
				}
				  
				var timer = setInterval(function() {
				    if(!$.utility('isBusy') && ($.utility('getComActionStatus') != "") && ($.utility('getComActionStatus') === "Success")){
					    clearInterval(timer);
					    callback(pagedef, ui, action, eventinitpagedef, true);
				    }else if(!$.utility('isBusy') && ($.utility('getComActionStatus') != "") && ($.utility('getComActionStatus') === "Error")){
					    clearInterval(timer);
					    callback(pagedef, ui, action, eventinitpagedef, false);
				    }
				}, 100);
				
			}else 
				callback(pagedef, ui, action, eventinitpagedef, false);		
		  };
		  
		  var ChangeCondition = function(){
			  
			   new $.actions(pagedef, null, [{method:"Select", category:"ComAction", callingMethod : action['method'],
					params:{
						servicename: pagedef['data']['servicename'],
						table: pagedef['data']['tablename'],
						where: $.utility("tokenizeString",action['params']['wherecond'], pagedef),
						order: $.utility("tokenizeString",action['params']['ordercond'], pagedef),
						limit : 25,
						offset: 0,
						fields:""// $.utility('getColumns',pagedef['data']['tablename'],[],pagedef['children'])
						}
				}]).execute();
		  };
		  
		  var UploadRecordsToRemoteDB = function(){
			  	var file;	
				if(action['params']['src'].indexOf('device') == 0){
					file = {};			
					var acceptheader = '.xlsx,.xls';
					
					//new $.actions(pagedef, null, [{method:"StopWaitIndicator",category:"WarningAction", events:[]}]).execute();
					if($("#deviceFile").length == 0)
						$('body').append("<input id='deviceFile' type='file' accept='"+acceptheader+"' hidden='true'></input>");
					
					$("#deviceFile").off("change").on("change", function(){
						if( /\.(xls|xlsx)$/i.test(this.files[0].name)){
							new $.actions(pagedef, null, [{method:"StartWaitIndicator",category:"WarningAction",params:{message:'Uploading',timeout:"-1",type:"Default"}, events:[]}]).execute();
							var reader  = new FileReader();
							var fileObj = this.files[0];
							var filename = this.files[0].name;
							reader.addEventListener("load", function () {
								file['value'] = filename;
								file['src'] = reader.result;
								if(file['src']){
									var _index = file['src'].indexOf("base64");
									var _res = file['src'].slice(0,_index + 7);
									file['src'] = file['src'].replace(_res, "");
								}
							}, false);
							reader.readAsDataURL(this.files[0]);
							$("#deviceFile").remove();
							
							$.utility('initCall');
							var timer =	setInterval(function(){
								if($.utility('appendDeviceInfo') != "" || $.utility('appendDeviceInfo') != null){
									clearInterval(timer);
									
									var fileValue = file['value'];
									var apiName = "uploadFileToRemoteDB";
									
									var requestUrl = "";
									var requestData;
									var databaseName = "";
									var fieldrecords = "[]";
									var log_unique_id = $.utility("tokenizeString", action['params']['loguid'].toString(), pagedef,action);
									
									if($.mobileweb['release'] != undefined && $.mobileweb['release']){
										databaseName = "db_" +  $.mobileweb['pid']+"_release";
									}else{	
										databaseName = "db_" +  $.mobileweb['pid'];
									}
									
									if(action['params']['fieldrecords'] != ""){
										fieldrecords = $.utility("tokenizeString", action['params']['fieldrecords'].toString(), pagedef,action);
										fieldrecords = fieldrecords.replace(/'/g, '"');
										fieldrecords = "[" + fieldrecords + "]";
									}
									
									if($.utility('getServerPort') == "8080") {
										requestUrl = $.mobileweb['baseurl'] + "/mobileweb/mobile/"+apiName+"?baseURL="+$.mobileweb['baseurl']+"&database="+ databaseName +"&tablename="+ action['params']['table'] +"&projectid="+ command[20]+"&userid="+ $.mobileweb['user']+"&filename="+ filename;
										requestData = file['src'];
										
									}else {
										
										requestUrl = $.mobileweb['baseurl']+ ":8181/commapi/comaction/"+apiName;
										
										var formData = new FormData();
										formData.append("database", databaseName);
										formData.append("tablename", action['params']['table']);
										formData.append("projectid", command[20]);
										formData.append("userid", $.mobileweb['user']);

										var callbackdata = '{"ver":"2","page":"' + pagedef['name'] + '","callingMethod":"UploadRecordsToRemoteDB","events":"NOW REPLACED","table":"' + action['params']['table'] + '"}';
										formData.append("callbackdata", callbackdata);
										formData.append("jsonp", "BulkUpload");
										
										if(action['params']['getlogs'] == "true"){
											formData.append("appname", $.mobileweb['title']);
											//formData.append("version", $.mobileweb['version']);
											formData.append("fixed_xlsx_values", fieldrecords);
											formData.append("appuserid", log_unique_id);
										}
										
										formData.append("file", fileObj);
										
										requestData = formData;
									}
									
								    $.ajax({
										url: requestUrl,
										type: "POST",
										data: requestData,
										crossDomain: true,
										processData: false,
										contentType :false,
										success: function (resp) {
											try{
												if(typeof resp != "object"){
													if(typeof resp == "string"){
														$.utility('processResponseData', resp, "UploadRecordsToRemoteDB");
														
														var timer = setInterval(function() {
															   if(!$.utility('isBusy') && ($.utility('getBulkUploadActionStatus') != "") && ($.utility('getBulkUploadActionStatus') === "Success")){
																   clearInterval(timer);
																   new $.actions(pagedef, null, [{method:"StopWaitIndicator",category:"WarningAction", events:[]}]).execute();
																   callback(pagedef, ui, action, eventinitpagedef, true);
															   }else if(!$.utility('isBusy') && ($.utility('getBulkUploadActionStatus') != "") && ($.utility('getBulkUploadActionStatus') === "Error")){
																   clearInterval(timer);
																   new $.actions(pagedef, null, [{method:"StopWaitIndicator",category:"WarningAction", events:[]}]).execute();
																   callback(pagedef, ui, action, eventinitpagedef, false);
															   }
														   }, 100);
													}
												}else {
													resp = JSON.parse(resp);
													new $.actions(pagedef, null, [{method:"StopWaitIndicator",category:"WarningAction", events:[]}]).execute();
													if(resp.ret === "ACK")
														callback(pagedef, ui, action, eventinitpagedef, true);
													else
														callback(pagedef, ui, action, eventinitpagedef, false);
												}
												
											}catch(e){
												new $.actions(pagedef, null, [{method:"StopWaitIndicator",category:"WarningAction", events:[]}]).execute();
												console.log(e);
											}
										},
										error : function(err){
											new $.actions(pagedef, null, [{method:"StopWaitIndicator",category:"WarningAction", events:[]}]).execute();
											callback(pagedef, ui, action, eventinitpagedef, false);
										},
									});
								}
							},1000);
							
						}else{
							$("#deviceFile").remove();
							new $.actions(pagedef, null, [{method:"StopWaitIndicator",category:"WarningAction", events:[]}]).execute();
							callback(pagedef, ui, action, eventinitpagedef, false);
						}
					});
					
					$("#deviceFile").trigger("click");
				}
		  };
		  
		  return _action;
	};
	
	// Google Map Control Actions...
	function GoogleMapControlAction(pagedef, ui, action, eventinitpagedef, target, callback){
		var _action = {};
		
		_action.execute = function(){
			if(!$.isEmptyObject(target) ){
				if(target.getViewType() != 'GoogleMap'){
					callback(pagedef, ui, action, eventinitpagedef, false);
					return _action;
				}
			}else{
				callback(pagedef, ui, action, eventinitpagedef, false);
				return _action;
			}
		
			var flag = $.errorhandler('checkErrorForMaps',target, action['params'], action);
			if(!flag){
				callback(pagedef, ui, action, eventinitpagedef, flag);
				return _action;
			}
		
			switch(action['method']){
				case 'LocationInfo':
					getLocationInfo();
					break;
					
				case 'RegionInfo':
					getRegionInfo();
					break;
					
				case 'AreaInfo':
					getAreaInfo();
					break;
					
				case 'OpenTargetScope':
					OpenTargetScope();
					break;
					
				case 'CloseTargetScope':
					CloseTargetScope();
					break;
					
				case 'OpenCurrentPosition':
					OpenCurrentPosition();
					break;
					
				case 'CloseCurrentPosition':
					CloseCurrentPosition();
					break;
					
				default:
					callback(pagedef, ui, action, eventinitpagedef, false);
					break;
			}
			
			if(flag && (action['method']!='LocationInfo') && (action['method']!='CloseTargetScope') &&  (action['method']!='OpenCurrentPosition') && (action['method']!='CloseCurrentPosition') )
				callback(pagedef, ui, action, eventinitpagedef, flag);
		};
		
		var getLocationInfo = function(){
			var flag =  $.GMapService('showLocationInfo',action, target, pagedef, ui,callback);
			setTimeout(function(){
				//callback(pagedef, ui, action, eventinitpagedef,flag);
			}, 1500)
			
		};
		
		var getRegionInfo = function(){
			callback(pagedef, ui, action, eventinitpagedef, $.GMapService('showRegionInfo',action['params'], target));
		};
		
		var getAreaInfo = function(){
			callback(pagedef, ui, action, eventinitpagedef, $.GMapService('showAreaInfo',action['params'], target));
		};
		
		var OpenTargetScope = function(){
			//callback(pagedef, ui, action, eventinitpagedef, $.GMapService('OpenTargetScope',action['params'], target));
			$.GMapService('OpenTargetScope',action['params'], target)
			var OpenTargetScopeTimer = setInterval(function(){
				if(action['OpenTargetScopeStatus'] != undefined){
					clearInterval(OpenTargetScopeTimer);
					if(action['OpenTargetScopeStatus'] === true){
						delete action['OpenTargetScopeStatus'];
						callback(pagedef, ui, action, eventinitpagedef,true );
					}else{
						delete action['OpenTargetScopeTimer'];
						callback(pagedef, ui, action, eventinitpagedef,false);
					}
				}else{
					clearInterval(OpenTargetScopeTimer);
					//callback(pagedef, ui, action, eventinitpagedef,false);
				}
			}, 200);
		};
		
		var CloseTargetScope = function(){
			var flag = $.GMapService('CloseTargetScope',action['params'], target);
			callback(pagedef, ui, action, eventinitpagedef, flag);
			
		};
		
		var OpenCurrentPosition = function(){
			$.GMapService('OpenCurrentPosition',action['params'], target, action,callback);
			var OpenCurrentPositionStatusTimer = setInterval(function(){
				if(action['OpenCurrentPositionStatus'] != undefined){
					clearInterval(OpenCurrentPositionStatusTimer);
					if(action['OpenCurrentPositionStatus'] === true){
						delete action['OpenCurrentPositionStatus'];
						callback(pagedef, ui, action, eventinitpagedef,true );
					}else{
						delete action['OpenCurrentPositionStatus'];
						callback(pagedef, ui, action, eventinitpagedef,false);
					}
				}else{
					clearInterval(OpenCurrentPositionStatusTimer);
					//callback(pagedef, ui, action, eventinitpagedef,false);
				}
			}, 600);
		};
		
		var CloseCurrentPosition = function(){
			var flag = $.GMapService('CloseCurrentPosition',action['params'], target);
			callback(pagedef, ui, action, eventinitpagedef, flag);
		};
		return _action;
	};
	
	// Google Maps Action : Route Actions..
	function GoogleMapAction(pagedef, ui, action, eventinitpagedef, target, callback){
		var _action = {};
			_action.execute = function(){
			if(!$.isEmptyObject(target) ){
				if(target.getViewType() != 'GoogleMap' ){
					callback(pagedef, ui, action, eventinitpagedef, false);
					return _action;
				}
			}else{
				callback(pagedef, ui, action, eventinitpagedef, false);
				return _action;
			}
			
			var flag = $.errorhandler('checkErrorForMaps',target, action['params'], action);
			if((action['method']=='AddPinMarker' || action['method']=='AddCustomMarker') && action['params']['address'] != ""){
				// DO NOTHING
			}else if(!flag && (action['method']!='removeMarker')){
				callback(pagedef, ui, action, eventinitpagedef, flag);
				return _action;
			}
			
			switch(action['method']){
				case 'ShowRoute':
					ShowRoute();
					break;
				case 'ClearRoute':
					ClearRoute();
					break;
				case 'ShowRouteList':
					ShowRouteList();
					break;
				case 'StartCheckPoint':
					StartCheckPoint();
					break;
				case 'NextCheckPoint':
					NextCheckPoint();
					break;
				case 'PrevCheckPoint':
					PrevCheckPoint();
					break;
				case 'AddCustomMarker':
					AddCustomMarker();
					break;
				case 'AddPinMarker':
					AddPinMarker();
					break;
				case 'removeMarker':
					RemoveMarker();
					break;
				case 'LoadFixedRouteFile':
					LoadFixedRouteFile();
					break;
				case 'AddWayPoint':
					AddWayPoint();
					break;
				case 'ShowFixedRoute':
					ShowFixedRoute();
					break;
				case 'GetStartStep':
					GetStartStep();
					break;
				case 'GetNextStep':
					GetNextStep();
					break;
				case 'GetPreviousStep':
					GetPreviousStep();
					break;
				case 'GetCurrentStep':
					GetCurrentStep();
					break;
				default:
					callback(pagedef, ui, action, eventinitpagedef, false);
					break;
			}
			
		//	if(flag && (action['method']!='removeMarker')) callback(pagedef, ui, action, eventinitpagedef, flag);
			
		};
		
		var ShowRoute = function(){
		/*	//setTimeout(function(){
				var flag = $.GMapService('ShowRoute',action['params'], target, action, pagedef, ui);
				//if(flag === false){
			
					callback(pagedef, ui, action, eventinitpagedef, flag);
				//}
			//}, 2000);
*/					if(eventinitpagedef != undefined){
						action['params']['fromlocation'] = $.utility("tokenizeString", action['params']['fromlocation'].toString(), eventinitpagedef,action);
						action['params']['tolocation'] = $.utility("tokenizeString", action['params']['tolocation'].toString(), eventinitpagedef,action);
					}
					$.GMapService('ShowRoute',action['params'], target, action, pagedef, ui,callback);
					var counter = 0;
					var showRouteStatusTimer = setInterval(function(){
						if(counter == 5)	
							clearInterval(showRouteStatusTimer);
						if(action['showRouteStatus'] != undefined){
							clearInterval(showRouteStatusTimer);
							if(action['showRouteStatus'] === true){
								delete action['showRouteStatus'];
								callback(pagedef, ui, action, eventinitpagedef,true );
							}else{
								delete action['showRouteStatus'];
								callback(pagedef, ui, action, eventinitpagedef,false);
							}
						}else{
							counter += 1;
							//clearInterval(showRouteStatusTimer);
							//callback(pagedef, ui, action, eventinitpagedef,false);
						}
					}, 300);
		};
		
		var ClearRoute = function(){
			$.GMapService('ClearRoute',action['params'], target);
			callback(pagedef, ui, action, eventinitpagedef,true );
			/*var clearRouteStatusTimer = setInterval(function(){
				if(action['clearRouteStatus'] != undefined){
					clearInterval(clearRouteStatusTimer);
					if(action['clearRouteStatus'] === true){
						delete action['clearRouteStatus'];
						callback(pagedef, ui, action, eventinitpagedef,true );
					}else{
						delete action['clearRouteStatus'];
						callback(pagedef, ui, action, eventinitpagedef,false);
					}
				}
			},200);*/
		};
		
		var ShowRouteList = function(){
			var flag = $.GMapService('ShowRouteList',action['params'], target);
			if(flag === false){
				callback(pagedef, ui, action, eventinitpagedef, flag);
			}
		};
		
		var StartCheckPoint = function(){
			var flag = $.GMapService('GoToStartCheckPoint',action['params'], target);
			if(flag === false){
				callback(pagedef, ui, action, eventinitpagedef, flag);
			}
		};
		
		var NextCheckPoint = function(){
			var flag = $.GMapService('GoToNextCheckPoint',action['params'], target);
			if(flag === false){
				callback(pagedef, ui, action, eventinitpagedef, flag);
			}
		};
		
		var PrevCheckPoint = function(){
			var flag = $.GMapService('GoToPrevCheckPoint',action['params'], target);
			if(flag === false){
				callback(pagedef, ui, action, eventinitpagedef, flag);
			}
		};
		
		var AddCustomMarker = function(){

			var title =$.utility("tokenizeString", action['params']['title'].toString(), pagedef,action);
			var subtitle =$.utility("tokenizeString", action['params']['subtitle'].toString(), pagedef,action);
			var latitude =parseFloat($.utility("tokenizeString", action['params']['latitude'], pagedef,action));
			var longitude =parseFloat($.utility("tokenizeString", action['params']['longitude'], pagedef,action));
			var address =$.utility("tokenizeString", action['params']['address'], pagedef,action);
			var markerId =$.utility("tokenizeString", action['params']['markerid'], pagedef,action);
			var isAddressFetched = false;
			if(address != ""){
				var geocoder =  new google.maps.Geocoder(); 
				geocoder.geocode({ 'address': address }, function (results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						action['params']['latitude'] = results[0].geometry.location.lat();
						action['params']['longitude'] = results[0].geometry.location.lng();
						isAddressFetched = true;
					}else{
						$.mobileweb['__ERR_CODE__'] = status;
						$.GMapService('setMapErrorMessage',status,"AddCustomMarker","Geocode");
						callback(pagedef, ui, action, eventinitpagedef,false);
					}
				  });
			}else if(isNaN(latitude) || isNaN(longitude)){	
				callback(pagedef, ui, action, eventinitpagedef, false);
				return _action;
			}else{
				isAddressFetched = true;

			}
			var timer = setInterval(function(){
				if(isAddressFetched){
					clearInterval(timer);
					$.GMapService('AddCustomMarker',pagedef,ui,action, target)
					var markerPlotingStatusTimer = setInterval(function(){
						if(action['markerPlotingStatus'] != undefined){
							clearInterval(markerPlotingStatusTimer);
							if(action['markerPlotingStatus'] === true){
								delete action['markerPlotingStatus'];
								callback(pagedef, ui, action, eventinitpagedef,true );
							}else{
								delete action['markerPlotingStatus'];
								callback(pagedef, ui, action, eventinitpagedef,false);
							}
						}
					}, 200);
				}
			}, 200);
			
		
		};
		
		var AddPinMarker = function(){
				var title =(eventinitpagedef != undefined)? $.utility("findUI", eventinitpagedef,ui, action['params']['title'].toString()): $.utility("tokenizeString", action['params']['title'].toString(), pagedef,action);
				var subtitle =(eventinitpagedef != undefined)? $.utility("findUI", eventinitpagedef,ui, action['params']['subtitle'].toString()): $.utility("tokenizeString", action['params']['subtitle'].toString(), pagedef,action);
				var latitude =parseFloat((eventinitpagedef != undefined)? $.utility("findUI", eventinitpagedef,ui, action['params']['latitude'].toString()): $.utility("tokenizeString", action['params']['latitude'].toString(), pagedef,action));
				var longitude =parseFloat((eventinitpagedef != undefined)? $.utility("findUI", eventinitpagedef,ui, action['params']['longitude'].toString()): $.utility("tokenizeString", action['params']['longitude'].toString(), pagedef,action));
				var address =(action['params']['address'] != undefined) ? (eventinitpagedef != undefined)? $.utility("findUI", eventinitpagedef,ui, action['params']['address'].toString()): $.utility("tokenizeString", action['params']['address'].toString(), pagedef,action):"";
				var markerId =(eventinitpagedef != undefined)? $.utility("findUI", eventinitpagedef,ui, action['params']['markerid'].toString()): $.utility("tokenizeString", action['params']['markerid'].toString(), pagedef,action);
				/*var title =$.utility("tokenizeString", action['params']['title'].toString(), pagedef,action);
				var subtitle =$.utility("tokenizeString", action['params']['subtitle'].toString(), pagedef,action);
				var latitude =parseFloat($.utility("tokenizeString", action['params']['latitude'], pagedef,action));
				var longitude =parseFloat($.utility("tokenizeString", action['params']['longitude'], pagedef,action));
				var address =$.utility("tokenizeString", action['params']['address'], pagedef,action);
				var markerId =$.utility("tokenizeString", action['params']['markerid'], pagedef,action);*/
			
			var isAddressFetched = false;
			if(address != ""){
				var geocoder =  new google.maps.Geocoder(); 
				geocoder.geocode({ 'address': address }, function (results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						action['params']['latitude'] = results[0].geometry.location.lat();
						action['params']['longitude'] = results[0].geometry.location.lng();
						isAddressFetched = true;
					}else{
						$.mobileweb['__ERR_CODE__'] = status;
						$.GMapService('setMapErrorMessage',status,"AddPinMarker","Geocode");
						callback(pagedef, ui, action, eventinitpagedef,false);
					}
					
				  });
			}else if(isNaN(latitude) || isNaN(longitude)){	
				callback(pagedef, ui, action, eventinitpagedef, false);
				return _action;
			}else{
				isAddressFetched = true;

			}
			var timer = setInterval(function(){
				if(isAddressFetched){
					clearInterval(timer);
					pagedef['eventinitpagedef'] = (eventinitpagedef != undefined) ? eventinitpagedef : undefined;
					$.GMapService('AddPinMarker',pagedef,ui,action, target)
					var markerPlotingStatusTimer = setInterval(function(){
						if(action['markerPlotingStatus'] != undefined){
							clearInterval(markerPlotingStatusTimer);
							if(action['markerPlotingStatus'] === true){
								delete action['markerPlotingStatus'];
								callback(pagedef, ui, action, eventinitpagedef,true );
							}else{
								delete action['markerPlotingStatus'];
								callback(pagedef, ui, action, eventinitpagedef,false);
							}
						}
					}, 1);
				}
			}, 1);
		};
		
		var RemoveMarker = function(){
			var markerid =(eventinitpagedef != undefined)? $.utility("findUI", eventinitpagedef,ui, action['params']['markerid'].toString()): $.utility("tokenizeString", action['params']['markerid'].toString(), pagedef,action);
 			if(markerid != undefined)
 				action['params']['markerid'] = markerid;
			
			var flag = $.GMapService('RemoveMarker',pagedef,ui,action, target);
			//$.GMapService('RemoveMarker',action['params'], target);
			callback(pagedef, ui, action, eventinitpagedef, flag);
			/*var markerRemovingStatus = $.GMapService('AddPinMarker',pagedef,ui,action, target)
			var markerRemovingStatusTimer = setInterval(function(){
				if(markerRemovingStatus != undefined){
					clearInterval(markerRemovingStatusTimer);
					if(markerRemovingStatus === true){
						callback(pagedef, ui, action, eventinitpagedef,true );
					}else{
						callback(pagedef, ui, action, eventinitpagedef,false);
					}
				}
			}, 200);*/
		};
		
		var TrackGPSLocation = function(){
			
		};
		
		var AddWayPoint = function(){
			console.log("AddWayPoint");
			var wayPointLocation = $.utility("tokenizeString", action['params']['location'], pagedef);
 			if(wayPointLocation != undefined)
 				action['params']['location'] = wayPointLocation;
			
			$.GMapService('AddWayPoint',pagedef,ui,action, target);
			var addWayPointStatusTimer = setInterval(function(){
				if(action['addWayPointStatus']  != undefined){
					clearInterval(addWayPointStatusTimer);
					if(action['addWayPointStatus'] === true){
						callback(pagedef, ui, action, eventinitpagedef,true );
					}else{
						callback(pagedef, ui, action, eventinitpagedef,false);
					}
				}
			}, 500);
		};
		
		var LoadFixedRouteFile = function(){
			console.log("LoadFixedRouteFile");
		};
		
		var ShowFixedRoute = function(){
			console.log("ShowFixedRoute");
		};
		
		var GetStartStep = function(){
			console.log("GetStartStep");
		};
		
		var GetNextStep = function(){
			console.log("GetNextStep");
		};
		
		var GetPreviousStep = function(){
			console.log("GetPreviousStep");
		};
		
		var GetCurrentStep = function(){
			console.log("GetCurrentStep");
		};
		
		return _action;
	};
	
	function MotionAction(pagedef, ui, action, eventinitpagedef, target, callback){
		var _action = {};
		//var timer = "";
		_action.execute = function(){
			switch(action['method']){
				case 'StartGPS':
					StartGPS();
					break;
				case 'StopGPS':
					StopGPS();
					break;
				case 'StartGPSTrack':
					StartGPSTrack();
					break;
				case 'StopGPSTrack':
					StopGPSTrack();
					break;
				case 'ConvertGPSLogToFile':
					ConvertGPSLogToFile();
					break;
				case 'StartGeoFencing':
					StartGeoFencing();
					break;
				case 'StopGeoFencing':
					StopGeoFencing();
					break;
				default:
					callback(pagedef, ui, action, eventinitpagedef, false);
					break;
			}
		};
		
		var StartGPS = function(){
			if(navigator.geolocation){
				if ($("body").find("#__LAT__").length == 0 ) {
					$('body').append("<input id='__LAT__' type='text' hidden='true'>"+ $.mobileweb["__LAT__"] +"</input>");
				}
				if ($("body").find("#__LONG__").length == 0 ) {
					$('body').append("<input id='__LONG__' type='text' hidden='true'>"+ $.mobileweb["__LONG__"] +"</input>");
				}
				if ($("body").find("#__ADDRESS__").length == 0 ) {
					$('body').append("<input id='__ADDRESS__' type='text' hidden='true'>"+ $.mobileweb["__ADDRESS__"] +"</input>");
				}
				if ($("body").find("#__ALT__").length == 0 ) {
					$('body').append("<input id='__ALT__' type='text' hidden='true'>"+ $.mobileweb["__ALT__"] +"</input>");
				}
				var geocoder = new google.maps.Geocoder();
				navigator.geolocation.getCurrentPosition(
				function(position){
					var latlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
					geocoder.geocode({'latLng': latlng}, function(results, status) {
						 if (status == 'OK') {
							 if(results){
									if(!$.isEmptyObject(target)){
										target.setValue(results[0].formatted_address);
									}
									try{
										$.mobileweb["__ADDRESS__"] = results[0].formatted_address;
									}catch(e){
										
									}
								}
						 }else{
								$.mobileweb['__ERR_CODE__'] = status;
								$.GMapService('setMapErrorMessage',status,"StartGPS","Geocode");
						}
						$("#__ADDRESS__").val($.mobileweb['__ADDRESS__']);
						$("#__ADDRESS__").trigger("onchange");
					});
				//	if(position.coords.latitude != $.mobileweb["__LAT__"]){
						$.mobileweb["__LAT__"] = position.coords.latitude;
						$("#__LAT__").val($.mobileweb['__LAT__']);
						$("#__LAT__").trigger("onchange");
				//	}
				//	if(position.coords.longitude != $.mobileweb["__LONG__"]){
						
				//	}
						//$("#locationaddress")
						$.mobileweb["__LONG__"] = position.coords.longitude;
						$("#__LONG__").val($.mobileweb['__LONG__']);
						$("#__LONG__").trigger("onchange");
						
						$.mobileweb["__ALT__"] = position.coords.altitude;
						if($.mobileweb["__ALT__"] == null){
							var elevator = new google.maps.ElevationService();
							var loc = new google.maps.LatLng($.mobileweb["__LAT__"],$.mobileweb["__LONG__"]);
							var locations = [];
							locations.push(loc);
							var positionalRequest = {
								'locations' : locations 
							};
							elevator.getElevationForLocations(positionalRequest, function(results, status) {
								if (status == google.maps.ElevationStatus.OK) {
									$.mobileweb["__ALT__"] = results[0].elevation.toFixed(3) +" m";
								}
							});
						}
						if($.mobileweb['__ALT__'] == null)
							$.mobileweb['__ALT__'] = "";
						$("#__ALT__").val($.mobileweb['__ALT__']);
						$("#__ALT__").trigger("onchange");
						
						$.mobileweb["__GPSDATE__"] = new Date(position.timestamp);
						var month = $.mobileweb["__GPSDATE__"].getMonth() < 9 ? "0" + ($.mobileweb["__GPSDATE__"].getMonth()+1) : ($.mobileweb["__GPSDATE__"].getMonth()+1);
						var date = $.mobileweb["__GPSDATE__"].getDate() < 9 ? "0" + ($.mobileweb["__GPSDATE__"].getDate()) : ($.mobileweb["__GPSDATE__"].getDate());
						var minutes = $.mobileweb["__GPSDATE__"].getMinutes() < 9 ? "0" + ($.mobileweb["__GPSDATE__"].getMinutes()) : ($.mobileweb["__GPSDATE__"].getMinutes());
						var hours = $.mobileweb["__GPSDATE__"].getHours() < 9 ? "0" + ($.mobileweb["__GPSDATE__"].getHours()) : ($.mobileweb["__GPSDATE__"].getHours());
						var formattedDate = $.mobileweb["__GPSDATE__"].getFullYear() + "-" + month + "-" + date + " " + hours + ":"+ minutes;
						$.mobileweb["__GPSDATE__"] = formattedDate;
						$("#__GPSDATE__").val($.mobileweb['__GPSDATE__']);
						$("#__GPSDATE__").trigger("onchange");
						setTimeout(function(){
							callback(pagedef, ui, action, eventinitpagedef, true);
						},2000);
				}, function(error){
					$.mobileweb['__ERR_CODE__'] = "GMap Error code: "+ error['code'];
					$.mobileweb['__ERR_MSG__'] = error['message'];
					callback(pagedef, ui, action, eventinitpagedef,false);
				});
				
				gpstimer = setInterval(function(){
					navigator.geolocation.getCurrentPosition(function(position){
						var latlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
						geocoder.geocode({'latLng': latlng}, function(results, status) {
							if(status == "OK"){
								if(!$.isEmptyObject(target)){
									target.setValue(results[0].formatted_address);
								}
								if(results != null){
									$.mobileweb["__ADDRESS__"] = results[0].formatted_address;
									$("#__ADDRESS__").val($.mobileweb['__ADDRESS__']);
									$("#__ADDRESS__").trigger("onchange");
								}
							}else{
								clearInterval(gpstimer);
								$.mobileweb['__ERR_CODE__'] = status;
								$.GMapService('setMapErrorMessage',status,"StartGPS","Geocode");
								//callback(pagedef, ui, action, eventinitpagedef,false);
							}
						});
					//	if(position.coords.latitude != $.mobileweb["__LAT__"]){
							$.mobileweb["__LAT__"] = position.coords.latitude;
							$("#__LAT__").val($.mobileweb['__LAT__']);
							$("#__LAT__").trigger("onchange");
					//	}
					//	if(position.coords.longitude != $.mobileweb["__LONG__"]){
							
					//	}
							//$("#locationaddress")
							$.mobileweb["__LONG__"] = position.coords.longitude;
							$("#__LONG__").val($.mobileweb['__LONG__']);
							$("#__LONG__").trigger("onchange");
					});
				},2000);
				$.utility('addNewTimer',"gpstimer");
				//setTimeout(function(){
					//callback(pagedef, ui, action, eventinitpagedef, true);
				//},2000);
				
			}else{
				//callback(pagedef, ui, action, eventinitpagedef, false);
			}
		};
		var StopGPS = function(){
			if(($.utility('getTimers').pop())['gpstimer'] == true){
				clearInterval(gpstimer);
				$.utility('resetMapGlobalVariable');
				$("#__LAT__").trigger("onchange");
				$("#__LAT__").remove();
				$("#__LONG__").trigger("onchange");
				$("#__LONG__").remove();
				$("#__ALT__").trigger("onchange");
				$("#__ALT__").remove();
				$("#__ADDRESS__").trigger("onchange");
				$("#__ADDRESS__").remove();
				$("#__MAPZOOM__").trigger("onchange");
				$("#__MAPZOOM__").remove();
				$("#__GPSDATE__").trigger("onchange");
				$("#__GPSDATE__").remove();
				callback(pagedef, ui, action, eventinitpagedef, true);
			}else{
				callback(pagedef, ui, action, eventinitpagedef, false);
			}
			
		};
		
		var StartGPSTrack = function(){
			console.log("StartGPSTrack");
//			gpstracktimer = setInterval(function(){
				pagedef['gpstrackid'] = null;
				var options;
				
				if (navigator.geolocation) {
					options = {
							  enableHighAccuracy: false,
							  timeout: 5000,
							  maximumAge: 0
							};
	
					pagedef['gpstrackid'] = navigator.geolocation.watchPosition(success, error, options);
				}
				
				function success(pos) {
					var crd = pos.coords;
					console.log(crd.latitude,"---",crd.longitude);
					console.log(pagedef['gpstrackid']);
					$.utility('createIndexedDBTable','gpslog',2);
					var data = [];
					data['latitude'] = crd.latitude;
					data['longitude'] = crd.longitude;
					
			    	$.utility('addDataToIndexedDBTable','gpslog',data);
			    	
				}
	
				function error(err) {
					console.warn('ERROR(' + err.code + '): ' + err.message);
					return;
				}
//			},5000);
			
		};
		
		var StopGPSTrack = function(){
			console.log("StopGPSTrack");
			console.log(pagedef['gpstrackid']);
			
			if (pagedef['gpstrackid'] != null) {
	            navigator.geolocation.clearWatch(pagedef['gpstrackid']);
	            pagedef['gpstrackid'] = null;
	        }
		};
		
		var ConvertGPSLogToFile = function(){
			console.log("ConvertGPSLogToFile");
		};
		
		var StartGeoFencing = function(){
			if(pagedef['circles'] === undefined)
				pagedef['circles'] = [];
			pagedef['geofence'] = "start";
			var rad = function(x) {
				return x * Math.PI / 180;
			};
			function getDistance(p1, p2) {
				var R = 6378137; // Earth’s mean radius in meter
				var dLat = rad(p2.latitude - p1.latitude);
				var dLong = rad(p2.longitude - p1.longitude);
				var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
				Math.cos(rad(p1.latitude)) * Math.cos(rad(p2.latitude)) *
				Math.sin(dLong / 2) * Math.sin(dLong / 2);
				var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
				var d = R * c;
				//console.log("distance in mt----", d);
				return d; // returns the distance in meter
			};
			$.mobileweb['localdb']['instance'].transaction(
					function(tx) {
						$.utility('log',['select * FROM spotdetail'].join(''));
						tx.executeSql(['select * FROM spotdetail'].join(''), [],		
						function(tx,result){
							if(result.rows.length != 0){
								var fencePoints = {};
								var center = {};
								$.each(result['rows'],function(i,row){
									center = {latitude: row['latitude'], longitude: row['longitude'], locname: row['locname'], title: row['title'], subtitle: row['subtitle']};
									fencePoints['point' + i] = center;
								});
								for (var point in fencePoints) {
									$.GMapService('AddGeoFence',pagedef,ui,action, target,fencePoints[point]);
								}
								
								var geocoder = new google.maps.Geocoder();
								var _checkedInPoint = {};
								var id;
								options = {};
								
								if(navigator.geolocation){
									if ($("body").find("#__CENTERLAT__").length == 0 ) {
										$('body').append("<input id='__CENTERLAT__' name='__CENTERLAT__' type='text' hidden='true'>"+ $.mobileweb["__CENTERLAT__"] +"</input>");
									}
									if ($("body").find("#__CENTERLONG__").length == 0 ) {
										$('body').append("<input id='__CENTERLONG__' name='__CENTERLONG__' type='text' hidden='true'>"+ $.mobileweb["__CENTERLONG__"] +"</input>");
									}
									
									function success(position) {
										//console.log("position changed");
										for (var point in fencePoints) {
											$.GMapService('AddGeoFence',pagedef,ui,action, target,fencePoints[point]);
											var _distanceInMeters = getDistance(fencePoints[point],position.coords);
											if(_distanceInMeters <= 100){	
												if(_checkedInPoint['latitude'] != position.coords.latitude && _checkedInPoint['longitude'] != position.coords.longitude){
													_checkedInPoint = fencePoints[point];
													//console.log("Entering ",point);
													pagedef['watchId'] = id;
													$.GMapService('PantoGeofenceEnter',position.coords.latitude,position.coords.longitude,target);
													
													$.mobileweb["__CENTERLAT__"] = fencePoints[point]['latitude'];
													$.mobileweb["__CENTERLONG__"] = fencePoints[point]['longitude'];
													$("#__CENTERLAT__").val($.mobileweb["__CENTERLAT__"]);
													$('#__CENTERLONG__').val($.mobileweb["__CENTERLONG__"]);
													
													var _Msg = "Entering:-- " + fencePoints[point]['title'] ; 
													if(action['events']['EnterFencing'] != undefined && action['events']['EnterFencing'].length != 0){
														new $.actions(pagedef, ui,action['events']['EnterFencing'].slice(), eventinitpagedef).execute(); 
													}
													setTimeout(function(){
														$.growlUI('', _Msg, 4000); 
													},3000);
												}
											}else{
												if(!$.isEmptyObject(_checkedInPoint) && getDistance(_checkedInPoint,position.coords) > 100){
													console.log("Exiting ",_checkedInPoint);
													_checkedInPoints = {};
													$.mobileweb["__CENTERLAT__"] = "__CENTERLAT__";
													$.mobileweb["__CENTERLONG__"] = "__CENTERLONG__";
													$("#__CENTERLAT__").val($.mobileweb["__CENTERLAT__"]);
													$('#__CENTERLONG__').val($.mobileweb["__CENTERLONG__"]);
													//navigator.geolocation.clearWatch(id);
													if(action['events']['ExitFencing'] != undefined && action['events']['ExitFencing'].length != 0){
														new $.actions(pagedef, ui,action['events']['ExitFencing'].slice(), eventinitpagedef).execute();
													}
												}
											}
										}
									}

									function error(err) {
										console.warn('ERROR(' + err.code + '): ' + err.message);
										//callback(pagedef, ui, action, eventinitpagedef, false);
									}

									id = navigator.geolocation.watchPosition(success, error, options);
									$.utility('addNewTimer',"geofencingtimer");
									callback(pagedef, ui, action, eventinitpagedef, true);
								}
								
//								var geofencingtimer =	setInterval(function(){
//									navigator.geolocation.getCurrentPosition(
//											function(position){
//													for (var point in fencePoints) {
//														$.GMapService('AddGeoFence',pagedef,ui,action, target,fencePoints[point])
//														
//														var _distanceInMeters = getDistance(fencePoints[point],position.coords);
//														if(_distanceInMeters <= 100){
//															_checkedInPoint = fencePoints[point];
//															console.log("Entering ",point);
//														}else{
//															if(!$.isEmptyObject(_checkedInPoint) && getDistance(_checkedInPoint,position.coords) > 100){
//																console.log("Exiting ",_checkedInPoint);
//																_checkedInPoints = {};
//															}
//														}
//													}
//											});
//								},5000);
							}
						},
						function(tx, error){
							console.log("error---",error);
							callback(pagedef, ui, action, eventinitpagedef, false);
						}
						);
					}
			);
			//console.log("StartGeoFencing");
			//console.log("Radius---",action['params']['radius']);
		};
		
		var StopGeoFencing = function(){
			if(($.utility('getTimers').pop())['geofencingtimer'] == true){
				pagedef['geofence'] = "stop";
				$.GMapService('AddGeoFence',pagedef,ui,action, target);
				if(pagedef['watchId'] != undefined)
					navigator.geolocation.clearWatch(pagedef['watchId']);
				
				$.mobileweb["__CENTERLAT__"] = "__CENTERLAT__";
				$.mobileweb["__CENTERLONG__"] = "__CENTERLONG__";
				$("#__CENTERLAT__").trigger("onchange");
				$("#__CENTERLAT__").remove();
				$("#__CENTERLONG__").trigger("onchange");
				$("#__CENTERLONG__").remove();
				callback(pagedef, ui, action, eventinitpagedef, true);
			}else{
				callback(pagedef, ui, action, eventinitpagedef, false);
			}
			console.log("StopGeoFencing");
		};
		
		return _action;
	};
	
	function GoogleContactService(pagedef, ui, action, eventinitpagedef, target, callback){
		var _action = {};
		
		_action.execute = function(){
			switch(action['method']){
				case 'CallContact':
					CallContact();
					break;
				
			}
		};
		
		var CallContact = function(){
			var phonenotype1 = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
			var phonenotype2 = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
			var phonenotype3 = /^\(?([0]{1})\)?([0-9]{10})$/;
			var phonenotypeNumberOnly = /^\s*\d+\s*$/;	// for number only..
			
			var phoneNumber = $.utility("tokenizeString",action['params']['phonenumber'], pagedef,action);
			//if(!new RegExp( phonenotypeNumberOnly).test(phoneNumber))
			try{ 
				window.location = "tel:" + phoneNumber;
				callback(pagedef, ui, action, eventinitpagedef, true);
			}catch(e){
				console.log(e);
				callback(pagedef, ui, action, eventinitpagedef, false);
			}
			
		};
		return _action;
	};
	
	function GoogleCalendarService(pagedef, ui, action, eventinitpagedef, target, callback){
		var _action = {};
		
		_action.execute = function(){
			switch(action['method']){
				case 'FindEvent':
					Find();
					break;
				case 'CreateEvent':
					Create();
					break;
				case 'UpdateEvent':
					UpdateEvent();
					break;
				case 'DeleteEvent':
					DeleteEvent();
					break;
			}
		};
		
		var Find = function(){
			var record=[];
			
			record.startdate=$.utility("tokenizeString",action['params']['startdate'], pagedef,action);
			record.enddate=$.utility("tokenizeString",action['params']['enddate'], pagedef,action);
			record.ownerEmail=$.utility("tokenizeString",action['params']['ownerEmail'], pagedef,action);
			if(record.ownerEmail == ""){
				record.ownerEmail = "default";
			}
			
			if(!$.utility("validateDate",record.startdate.split(" ")[0]) && !$.utility("validateDate",record.startdate.split(" ")[0])){
				
				callback(pagedef, ui, action, eventinitpagedef, false);
			}else{
				var time = record.startdate.split(" ")[1];
				if(time == undefined){
					record.startdate = record.startdate + " " + "00:00";
				}else{
					if(!$.utility("validateTime",time)){
						callback(pagedef, ui, action, eventinitpagedef, false);
					}
				}
				if(time == undefined){
					record.enddate = record.enddate + " " + "23:59";
				}else{
					if(!$.utility("validateTime",time)){
						callback(pagedef, ui, action, eventinitpagedef, false);
					}
				}
				var fromDate=record.startdate;
				var enddate=record.enddate;
				var d1 = $.utility('splitAndReturnDate',fromDate);
				var d2 = $.utility('splitAndReturnDate',enddate);

				if(d2 > d1){
					$.GoogleService('findCalendar',record, action['events'], pagedef, ui);
				}else{
					callback(pagedef, ui, action, eventinitpagedef, false);
				}
				
			}
			
			
		};
		
		var Create = function(){
			var record=[];
			
			var fromDate=$.utility("tokenizeString",action['params']['startdate'], pagedef,action);
			var enddate=$.utility("tokenizeString",action['params']['enddate'], pagedef,action);
			if(!$.utility("validateDate",fromDate) && !$.utility("validateDate",enddate)){
				callback(pagedef, ui, action, eventinitpagedef, false);
			}else{
				var d1 = $.utility('splitAndReturnDate',fromDate);
				var d2 = $.utility('splitAndReturnDate',enddate);

				record.ownerEmail=$.utility("tokenizeString",action['params']['ownerEmail'], pagedef,action);
				record.startdate=$.utility("tokenizeString",action['params']['startdate'], pagedef,action);
				record.enddate=$.utility("tokenizeString",action['params']['enddate'], pagede,actionf);
				record.title=$.utility("tokenizeString",action['params']['category'], pagedef,action);
				record.description=$.utility("tokenizeString",action['params']['description'], pagedef,action);
				record.place=$.utility("tokenizeString",action['params']['place'], pagedef,action);
				if(record.ownerEmail == ""){
					record.ownerEmail = "default";
				}
				if(d2 > d1){
					$.GoogleService('createEvent',record, action['events'], pagedef, ui);
				}else{
					callback(pagedef, ui, action, eventinitpagedef, false);
				}
			}
			
		};
		
		var UpdateEvent = function(){
			var record=[];
			var validDates=false;
			record.matchField=$.utility("tokenizeString",action['params']['matchField'], pagedef,action);
			record.matchValue=$.utility("tokenizeString",action['params']['matchValue'], pagedef,action);
			record.filterfromdate=$.utility("tokenizeString",action['params']['filterfromdate'], pagedef,action);
			record.filtertodate=$.utility("tokenizeString",action['params']['filtertodate'], pagedef,action);
			
			if(action['params']['startdate']!=""){
				record.startdate=$.utility("tokenizeString",action['params']['startdate'], pagedef,action);
			}
			else {
				record.startdate=[$.utility('extractDataFromRecord',pagedef['data']['contents'][0], '[fromdate]')].join('');
			}

			if(action['params']['enddate']!=""){
				record.enddate=$.utility("tokenizeString",action['params']['enddate'], pagedef,action);
			}

			else record.enddate=[$.utility('extractDataFromRecord',pagedef['data']['contents'][0], '[todate]')].join('');
			
			if(record.filterfromdate == "" && record.filtertodate == ""){
				validDates =( $.utility("validateDate",record.startdate) && $.utility("validateDate",record.enddate));
			}else {
				validDates = ($.utility("validateDate",record.filtertodate) && $.utility("validateDate",record.filterfromdate) && $.utility("validateDate",record.startdate) && $.utility("validateDate",record.enddate));
			}
			

			if(!validDates){
				callback(pagedef, ui, action, eventinitpagedef, false);
				}else{
					var fromDate=record.startdate;
					var enddate=record.enddate;
					var d3;
					var d4;
					var d1 = $.utility('splitAndReturnDate',fromDate);
					var d2 = $.utility('splitAndReturnDate',enddate);
					if(!record.filterfromdate == "" && !record.filtertodate == ""){		
						d3 = $.utility('splitAndReturnDate',record.filterfromdate);
						d4 = $.utility('splitAndReturnDate',record.filtertodate);
						
						validDates = (d3 < d4 && d3 <= d1 && d4 >= d2 && d2 > d1);
						
					}else {
						
						validDates = (d2 > d1);
						
					}
					
					if(validDates){
						
						record.ownerEmail=$.utility("tokenizeString",action['params']['ownerEmail'], pagedef,action);
						record.eventid=$.utility("tokenizeString",action['params']['eventId'], pagedef,action);
						if(record.ownerEmail == ""){
							record.ownerEmail = "default";
						}
					
						if(action['params']['category']!="")
							record.title=$.utility("tokenizeString",action['params']['category'], pagedef,action);
						else record.title=[$.utility('extractDataFromRecord',pagedef['data']['contents'][0], '[title]')].join('');
					
						if(action['params']['description']!="")
							record.description=$.utility("tokenizeString",action['params']['description'], pagedef,action);
						else record.description=[$.utility('extractDataFromRecord',pagedef['data']['contents'][0], '[description]')].join('');
					
						if(action['params']['place']!="")
							record.place=$.utility("tokenizeString",action['params']['place'], pagedef,action);
						else record.place=[$.utility('extractDataFromRecord',pagedef['data']['contents'][0], '[place]')].join('');
					
						// getting primary key.. or where condition..
						
						/*var pk = $.utility('getPK','appexe_tmp_events', $.mobileweb['localdb']['schema']);
						var updateEventId = [$.utility('extractDataFromRecord',pagedef['data']['contents'][0], '[eventid]')].join('');
						var eventIDPK = [$.utility('extractDataFromRecord',pagedef['data']['contents'][0], '['+pk+']')].join('');
						
						record.eventid=updateEventId;
						record.id=eventIDPK;
						record.where= [pk, " = ", $.utility('extractDataFromRecord',pagedef['data']['contents'][0], '['+pk+']')].join('');
						*/
									
						//$.GoogleService('UpdateEvent',record, action['events'], pagedef, ui);
						if(record.eventid != ""){
							$.mobileweb['localdb']['instance'].transaction(function(tx) {
								tx.executeSql("SELECT eventid, id FROM appexe_tmp_events where eventid LIKE '%"
										+ record.eventid +"%'", [], function(tx, $result) {
											
									if ($result.rows.length > 1 || $result.rows.length == 0) {
										callback(pagedef, ui, action, eventinitpagedef, false);
									} else if ($result.rows.length == 1) {
										var row = $result.rows.item(0);
										record.eventid=row['eventid'];
										record.id=row['id'];
										
										$.GoogleService('UpdateEvent',record, action['events'], pagedef, ui);
									}
								}, function(tx, error) {
								});
							});
						}else if(record.matchField != "" && record.matchValue != ""){
							$.mobileweb['localdb']['instance'].transaction(function(tx) {
								
								tx.executeSql("SELECT eventid, id FROM appexe_tmp_events where "
										+ record.matchField +"='"+record.matchValue+"'" , [], function(tx, $result) {
											
									if ($result.rows.length > 1 || $result.rows.length == 0) {
										callback(pagedef, ui, action, eventinitpagedef, false);
									} else if ($result.rows.length == 1) {
										var row = $result.rows.item(0);
										record.eventid=row['eventid'];
										record.id=row['id'];
										var test="";
										test=record.eventid;
										$.GoogleService('UpdateEvent',record, action['events'], pagedef, ui);
									}
								}, function(tx, error) {
								});
							});
						}else{
							callback(pagedef, ui, action, eventinitpagedef, false);
						}
				}else{
					callback(pagedef, ui, action, eventinitpagedef, false);
				}
			}
		};
		
		var DeleteEvent = function(){
		
			var record=[];
			var validDates=false;
			var d1;
			var d2;
			record.filterFromDate=$.utility("tokenizeString",action['params']['filterfromdate'], pagedef,action);
			record.filterToDate=$.utility("tokenizeString",action['params']['filtertodate'], pagedef,action);
			if(record.filterFromDate == "" && record.filterToDate == ""){
				validDates=true;
			}else if(record.filterFromDate != "" && record.filterToDate != ""){
				validDates = $.utility("validateDate", record.filterFromDate) && $.utility("validateDate", record.filterToDate);
				d1 = $.utility('splitAndReturnDate',record.filterFromDate);
				d2 = $.utility('splitAndReturnDate',record.filterToDate);
				if(d1 < d2){
					validDates = true;
				}else validDates = false;
			}else {
				validDates = false;
			}
				if(validDates){
					var pk = $.utility('getPK','appexe_tmp_events', $.mobileweb['localdb']['schema']);
					pk = '' + pk[0];
					var eventIdtoDelete = [$.utility('extractDataFromRecord',pagedef['data']['contents'][0], '[eventid]')].join('');
					var eventIDPK = [$.utility('extractDataFromRecord',pagedef['data']['contents'][0], '['+pk+']')].join('');
					record.eventid=eventIdtoDelete;
					record.id=eventIDPK;
					record.where= [pk, " = ", $.utility('extractDataFromRecord',pagedef['data']['contents'][0], '['+pk+']')].join('');
					record.ownerEmail=$.utility("tokenizeString",action['params']['ownerEmail'], pagedef,action);
					//record.matchField=$.utility("tokenizeString",action['params']['matchField']);
					//record.matchValue=$.utility("tokenizeString",action['params']['matchValue']);
					
					//record.eventid=$.utility("tokenizeString",action['params']['eventId']);
					if(record.ownerEmail == ""){
						record.ownerEmail = "default";
					}
					
					delete record.filterFromDate;
					delete record.filterToDate;
								
					$.GoogleService('DeleteEvent',record, action['events'], pagedef, ui);
		
					
				
				/*
						if(record.eventid != ""){
							$.mobileweb['localdb']['instance'].transaction(function(tx) {
								console.log(record.eventid);
								tx.executeSql("SELECT eventid FROM appexe_tmp_events where eventid LIKE '%"
										+ record.eventid +"%'", [], function(tx, $result) {
											console.log($result.rows.length);
									if ($result.rows.length > 1 || $result.rows.length == 0) {
										$.utility('ApplyOnSucessAndOnErrorEvents',pagedef, ui, action['events'], false);
									} else if ($result.rows.length == 1) {
										var row = $result.rows.item(0);
										record.eventid=row['eventid'];
										console.log(record.eventid);
										$.GoogleService('DeleteEvent',record, action['events'], pagedef, ui);
									}
								}, function(tx, error) {
								});
							});
						}else if(record.matchField != "" && record.matchValue != ""){
							$.mobileweb['localdb']['instance'].transaction(function(tx) {
								console.log(record.matchField);
								console.log(record.matchValue);
								tx.executeSql("SELECT eventid FROM appexe_tmp_events where "
										+ record.matchField +"='"+record.matchValue+"'" , [], function(tx, $result) {
											console.log($result.rows.length);
									if ($result.rows.length > 1 || $result.rows.length == 0) {
										$.utility('ApplyOnSucessAndOnErrorEvents',pagedef, ui, action['events'], false);
									} else if ($result.rows.length == 1) {
										var row = $result.rows.item(0);
										record.eventid=row['eventid'];
										console.log(record.eventid);
										$.GoogleService('DeleteEvent',record, action['events'], pagedef, ui);
									}
								}, function(tx, error) {
								});
							});
						}else{
							$.utility('ApplyOnSucessAndOnErrorEvents',pagedef, ui, action['events'], false);
						}
					*/
						
					
					
			}else{
				callback(pagedef, ui, action, eventinitpagedef, false);
			}
		
			
			
			
			
		};
		
		
		
		return _action;
	};
	
	// New Action
	function FileRead(pagedef, ui, action, eventinitpagedef, target, callback){
		
		var _action = {};
		_action.execute = function(){
			switch(action['method']){
				case 'ReadTextFile':
					ReadTextFile();
					break;
			}
		};
		
		var ReadTextFile = function(){	
			var url = "http://192.168.1.11:8080/mobileweb/mobile/readFile?uri=http://akhiltyagi.mobilous.com/appexe/akhiltyagi/31/bin/mobileweb2/demo.txt&uiName="+target.getId();
			$.utility('sendRequest',url); 
				
		};
		
		return _action;
	}
	
	function SplitPage(pagedef, ui, action, eventinitpagedef, target, callback){
		
		var _action = {};
		_action.execute = function(){
			switch(action['method']){
				case 'refresh':
					refresh();
					break;
			}
		};
		
		var refresh = function(){	
			var parent = pagedef['parent'].substring(0,4);
			
			$.each($.mobileweb['pages'] , function(i, page){
				if(parent === page['parent']){
					$.each(page['children'] , function(j, innerPage){
						if(innerPage['name'] === action['params']['targetSection']){
							var intialContentLength = innerPage['data']['contents'][0].length;
							$.fetchLocalDBRecords(innerPage,function(){
								$.createDBListViewPageRows(innerPage, function(){
									if(intialContentLength < innerPage['data']['contents'][0].length){
										var noOFNewRowsAdded = innerPage['data']['contents'][0].length  - intialContentLength;
										for(var k = 0; k < noOFNewRowsAdded; k++){
											var rownum =intialContentLength + k;
											$.createRow(innerPage,intialContentLength + k,innerPage['children'][0]['group'][0]['row'][rownum],intialContentLength + k+1,function(row){
												innerPage['children'][0]['group'][0]['row'][rownum] = row;
												$.mobileweb.getCurrentPage()['children'][j]['children'][0]['group'][0]['row'].push(innerPage['children'][0]['group'][0]['row'][rownum]);
												$('#' + action['params']['targetSection']).find('ul').append($.mobileweb.getCurrentPage()['children'][j]['children'][0]['group'][0]['row'][rownum].getHTML().join(''));
												$.mobileweb.getCurrentPage()['children'][j]['children'][0]['group'][0]['row'][rownum].applyOverrides();
												
											});
										}
									}
								});
							});
						}
					});
				}
				
			});
				
		};
		
		return _action;
	}
	
	function DBCondition(pagedef, ui, action, eventinitpagedef, target, callback){
		var _action = {};
		_action.execute = function(){
			switch(action['method']){
				case 'changeCondition':
					changeCondition();
					break;
			}
		};
		
		var changeCondition = function(){
			var page = $.mobileweb.getCurrentPage();
			var sourceWhereValue = "";
			var sourceOrderValue = "";
			var sourceWhere = "";
			var sourceOrder = "";
			var targetPage;
			var pageCallback = "";
			if(action['params']['where'].indexOf("[")!=-1 && action['params']['where'].indexOf("]")!=-1 ){
				sourceWhere=action['params']['where'].replace("[", "");
				sourceWhere=sourceWhere.replace("]", "");
				
			}else{
				sourceWhere = action['params']['where'];
			}
			if(action['params']['order'].indexOf("[")!=-1 && action['params']['order'].indexOf("]")!=-1 ){
				sourceOrder=action['params']['order'].replace("[", "");
				sourceOrder=sourceOrder.replace("]", "");
			}else {
				sourceOrder = action['params']['order'];
			}
			
			if(pagedef['parentType'] != undefined && pagedef['parentType'] === "SplitView"){
				$.each($.mobileweb['pages'], function(i, childPage){
					var _parentPage;
					if(pagedef['pagedef'] == undefined){
						_parentPage = pagedef['parent'].split("_");
						_parentPage = "page_"+_parentPage[_parentPage.length-1];
					}else
						var _parentPage = pagedef['pagedef']['name'];
					
					if(_parentPage === childPage['name']){
						$.each(childPage['children'], function(pageNumber, splitViewChildPage){
							if(splitViewChildPage['name'] === action['params']['targetpage']){
								sourceWhereValue = ($.utility("tokenizeString",action['params']['where'], pagedef,action).indexOf("null") != -1) ? '' : $.utility("tokenizeString",action['params']['where'],pagedef,action)
								sourceOrderValue = ($.utility("tokenizeString",action['params']['order'], pagedef,action).indexOf("null") != -1) ? '' : $.utility("tokenizeString",action['params']['order'],pagedef,action)
										
								$.mobileweb['pages'][i]['children'][pageNumber]['data']['wherecond'] = sourceWhereValue;
								$.mobileweb['pages'][i]['children'][pageNumber]['data']['order'] = sourceOrderValue;
								callback(pagedef, ui, action, pagedef, true);
							}
						});
					}
				});
			}else{
				if(eventinitpagedef !== undefined){
					if(action['params']['where'].indexOf("[") == 0){
						$.each(eventinitpagedef['children'], function(i, child){
							if(child['name']== sourceWhere){
								sourceWhereValue=child['value'];
							}
						});
						if(eventinitpagedef['toolbartop'] != undefined && eventinitpagedef['toolbarbottom'] != undefined){
							$.each(eventinitpagedef['toolbartop']['children'], function(i, child){
								if(child['name']== sourceWhere)
									sourceWhereValue=child['value'];
							});
							$.each(eventinitpagedef['toolbarbottom']['children'], function(i, child){
								if(child['name']== sourceWhere)
									sourceWhereValue=child['value'];
							});
						}
						if(eventinitpagedef['toolbarleft'] != undefined){
							$.each(eventinitpagedef['toolbarleft']['children'], function(i, child){
								if(child['name']== sourceWhere)
									sourceWhereValue=child['value'];
							});
						}
					}else{
						sourceWhereValue = $.utility('formWhereCondition',action['params']['where'], eventinitpagedef);
					}
					if(action['params']['order'].indexOf("[") == 0){
						$.each(eventinitpagedef['children'], function(i, child){
							if(child['name']== sourceOrder)
								sourceOrderValue=child['value'];
						});
						if(eventinitpagedef['toolbartop'] != undefined && eventinitpagedef['toolbarbottom'] != undefined){
							$.each(eventinitpagedef['toolbartop']['children'], function(i, child){
								if(child['name']== sourceOrder)
									sourceOrderValue=child['value'];
							});
							$.each(eventinitpagedef['toolbarbottom']['children'], function(i, child){
								if(child['name']== sourceOrder)
									sourceOrderValue=child['value'];
							});
						}
						if(eventinitpagedef['toolbarleft'] != undefined){
							$.each(eventinitpagedef['toolbarleft']['children'], function(i, child){
								if(child['name']== sourceOrder)
									sourceOrderValue=child['value'];
							});
						}
					}else{
						sourceOrderValue = sourceOrder;
					}
					//sourceWhereValue = sourceWhere;	
					//sourceOrderValue = sourceOrder;
				}else{
					sourceWhereValue = ($.utility("tokenizeString",action['params']['where'], pagedef,action).indexOf("null") != -1) ? '' : $.utility("tokenizeString",action['params']['where'],pagedef,action)
					sourceOrderValue = ($.utility("tokenizeString",action['params']['order'], pagedef,action).indexOf("null") != -1) ? '' : $.utility("tokenizeString",action['params']['order'],pagedef,action)
				} 
				
				if(page.getName() === action['params']['targetpage']){
					targetPage = $.utility('getObject', $.mobileweb['pages'],'name', page.getName());
					pageCallback = "SamePage";
				}else{
					targetPage = $.utility('getObject', $.mobileweb['pages'], 'name', action['params']['targetpage']);
					pageCallback = "DifferentPage";
				}
				
				if($.isEmptyObject(target)){
					if(pageCallback == "DifferentPage"){
						targetPage['data']['wherecond'] = sourceWhereValue;
						targetPage['data']['order'] = sourceOrderValue;
						callback(pagedef, ui, action, eventinitpagedef, true);
					}else{
						if(targetPage['type'] === "RemoteTableViewList"){
							/*new $.actions(pagedef, null, [{method:"Select", category:"ComAction", callingMethod : action['method'], callback : "changeCondition", targetPage :  targetPage['name'], pageCallback : pageCallback,
								params:{
									servicename: targetPage['data']['servicename'],
									table:	targetPage['data']['tablename'],
									where:  sourceWhereValue,
									order:	sourceOrderValue,
									limit : 25,
									offset: 0,
									fields:""// $.utility('getColumns',pagedef['data']['tablename'],[],pagedef['children'])
									},
							events:action['events']}]).execute();*/
							pagedef['data']['wherecond'] = sourceWhereValue;
							pagedef['data']['order'] = sourceOrderValue;
							callback(pagedef, ui, action, eventinitpagedef, true);
							 
						}else{
							//new $.actions(pagedef, null, [{method:"Select", category:"DBAction",callingMethod : action['method'], params:{tablename:targetPage['data']['tablename'], where:sourceWhereValue, order:$.utility("tokenizeString",action['params']['order'], pagedef), columns:""},events:action['events']}]).execute();
							//$.utility("reloadRemoteListViewPage", page);
							pagedef['data']['wherecond'] = sourceWhereValue;
							pagedef['data']['order'] = sourceOrderValue;
							callback(pagedef, ui, action, eventinitpagedef, true);
						}
					}
				}else{
//					if(target.getViewType() != "ComboBox" && target.getViewType() != "TileList"){ // HOT FIX FOR JBAT ON 9th May, 2016. Add condition for 'TileList', dated : 22-Jun-2018
//						if(targetPage['type'] === "RemoteTableViewList"){
//							/*new $.actions(pagedef, null, [{method:"Select", category:"ComAction", callingMethod : action['method'], callback : "changeCondition", targetPage :  targetPage['name'], pageCallback : pageCallback,
//							params:{
//								servicename: targetPage['data']['servicename'],
//								table:	targetPage['data']['tablename'],
//								where:  sourceWhereValue,
//								order:	sourceOrderValue,
//								limit : 25,
//								offset: 0,
//								fields:""// $.utility('getColumns',pagedef['data']['tablename'],[],pagedef['children'])
//								},
//						events:action['events']}]).execute();*/
//							pagedef['data']['wherecond'] = sourceWhereValue;
//							pagedef['data']['order'] = sourceOrderValue;
//							callback(pagedef, ui, action, eventinitpagedef, true);
//							
//						}else{
//							//new $.actions(pagedef, null, [{method:"Select", category:"DBAction",callingMethod : action['method'], params:{tablename:targetPage['data']['tablename'], where:sourceWhereValue, order:$.utility("tokenizeString",action['params']['order'], pagedef), columns:""},events:action['events']}]).execute();
//							//$.utility("reloadRemoteListViewPage", page);
//							pagedef['data']['wherecond'] = sourceWhereValue;
//							pagedef['data']['order'] = sourceOrderValue;
//							callback(pagedef, ui, action, eventinitpagedef, true);
//						}
//						
//					}else{
//						try{
//							target.refresh(sourceWhereValue);
//							callback(pagedef, ui, action, eventinitpagedef, true);
//						}catch(e){
//							callback(pagedef, ui, action, eventinitpagedef, false);
//						}
//					}
					
					if(target.getViewType() == "ComboBox" || target.getViewType() == "TileList"){
						try{
							target.refresh(sourceWhereValue, sourceOrderValue);
							var _timeInterval = 200;
							if(target.getViewType() == "ComboBox")
							_timeInterval = (target.getDBType() === "local") ? 200 : 850 ;
							var myVar=setInterval(function() {
								clearInterval(myVar);
								callback(pagedef, ui, action, eventinitpagedef, true);
							},_timeInterval);
						}catch(e){
							callback(pagedef, ui, action, eventinitpagedef, false);
						}
					}else{
						// HOT FIX FOR JBAT ON 9th May, 2016.
						pagedef['data']['wherecond'] = sourceWhereValue;
						pagedef['data']['order'] = sourceOrderValue;
						callback(pagedef, ui, action, eventinitpagedef, true);
					}
					
				}
				if(action['params']['initialWhere'] != undefined){
					action['params']['where'] = action['params']['initialWhere']
				}
			}
			
		};
		
		return _action;
	}
	
	function SystemControllerActions(pagedef, ui, action, eventinitpagedef, target, callback){
		var _action = {};
		_action.execute = function(){
			switch(action['method']){
				case 'CallExternalApp':
					CallExternalApp();
					break;
					
				case 'NetworkAvailable':
					NetworkAvailable();
					break;
				case 'loop':
					loop();
					break;
			}
		};
		
		var CallExternalApp = function(){

			//var command = $.utility("tokenizeString",action['params']['command'], pagedef,action);
			//window.location = command;
			//callback(pagedef, ui, action, eventinitpagedef, true);
			
			var command;
			if((pagedef['type']=='TableView') || (pagedef['type']=='DBTableView') || (pagedef['type']=='RemoteTableView')||
					(pagedef['type']=='TableViewList') || (pagedef['type']=='DBTableViewList') || (pagedef['type']=='RemoteTableViewList')){
				
				var rowindex = pagedef['data']['contents']['currentRow']; //Need to check
				if(ui != undefined){
					if(ui['rownum'] != undefined){
						rowindex = ui['rownum'];
					}else{
						if(ui.getId() != undefined){
							var uiId = ui.getId();
							var tempStr = uiId;
							if(ui.getViewType() != "Row")
								tempStr = uiId.substr(0, uiId.lastIndexOf('-'));
							rowindex = tempStr.substr(tempStr.lastIndexOf('-')+1, tempStr.length);
						}
                     if(isNaN(parseInt(rowindex)))
                    	 rowindex = 0;
					}
                                                             
				}
				
				if(pagedef['data']['contents'][rowindex] != undefined){
					var data = pagedef['data']['contents'][rowindex];
					var cmdparam = action['params']['command'];
					cmdparam = cmdparam.toString().replace(/[\[\]]/g, "#").replace(/[\[\]]/g, "#");
					var chunks = cmdparam.toString().split("#");
					for ( var i=0; i < chunks.length; i++) {
						if(data[chunks[i]] != undefined)
							chunks[i] = data[chunks[i]];
					}
					command = chunks.join('');
				}
				else
					command = $.utility("tokenizeString",action['params']['command'], pagedef,action);
			}
			else
				command = $.utility("tokenizeString",action['params']['command'], pagedef,action);
			
			if(typeof(action['params']['name']) === "undefined"){
				if(command.indexOf('http') == 0)
					window.open(command);
				else{
					var appWin = window.open(command);
					appWin.close();
				}						
				callback(pagedef, ui, action, eventinitpagedef, true);
			}
			else{
				// We need to manage 'invalid' command. So, first making ajax call. If valid command, then only window open. --> Akshay; date : 24-07-2017 
				$.ajax({
					url: command,
					type: "GET",
					crossDomain: true,
					success: function (resp) {
						if(typeof(action['params']['name']) !== "undefined"){
							var _currpage = $.mobileweb.getCurrentPage();
							//var callbackTargetUI =  _currpage.getChild(action['params']['name'], ui);
							var callbackTargetUI;
							if(_currpage.getViewType() === "SplitView"){
								if(pagedef['parentType'] === "SplitView")
									callbackTargetUI = _currpage.getChild(action['params']['name'], ui, pagedef['name']);
							}
							else
								callbackTargetUI =  _currpage.getChild(action['params']['name'], ui);
							if(typeof resp === "object"){
								resp = JSON.stringify(resp);;
							}
							callbackTargetUI.setValue(resp.toString());
						}else{
							window.open(command);
						}
						callback(pagedef, ui, action, eventinitpagedef, true);
					},
					error : function(err){
						callback(pagedef, ui, action, eventinitpagedef, false);
					}
				});
			}
		};
		
		var NetworkAvailable = function(){
			
			var timer =	setInterval(function(){
				clearInterval(timer);
				if(navigator.onLine){
					
					$.ajax({
						url: $.utility("tokenizeString",action['params']['targetURL'], pagedef,action),
						type: "GET",
						crossDomain: true,
						success: function (resp) {
							if(typeof resp != "object"){
								resp = JSON.parse(resp);
							}
							if(resp.ret === "ACK" || resp.code === "ACK" || resp["code"] === "ACK"){
								callback(pagedef, ui, action, eventinitpagedef, true);
							}else{
								callback(pagedef, ui, action, eventinitpagedef, false);
							}
						},
						error : function(err){
							callback(pagedef, ui, action, eventinitpagedef, false);
						}
					});
				}else if(!navigator.onLine){
					callback(pagedef, ui, action, eventinitpagedef, false);
					clearInterval(timer);
				}
			}, 1000);
			   
		};
		
		var loop = function(){
			var initials = $.utility("tokenizeString", action['params']['initials'], pagedef).toString();
			var variableName= initials.substring(0, initials.indexOf("=")).trim();
			if ($("body").find("#" + variableName).length == 0 ) {
				$('body').append("<input name='"+variableName+"' id='"+variableName+"' type='text' hidden='true'></input>");
			}
			for(eval($.utility("tokenizeString", action['params']['initials'], pagedef));eval($.utility("tokenizeString", action['params']['condition'], pagedef));eval($.utility("tokenizeString", action['params']['nextList'], pagedef))){
				var  tempPagedef= JSON.parse(JSON.stringify(pagedef));
				
				if(tempPagedef['data']['contents'].constructor == Object){
					jQuery.extend(tempPagedef['data']['contents'], {variableName : eval(variableName)});
				}
				else if( tempPagedef['data']['contents'][0] === undefined){
					//tempPagedef['data']['contents'].push([""+variableName+""]);
					tempPagedef['data']['contents'][0] = {};
					tempPagedef['data']['contents'][0][""+variableName+""] = eval(variableName);
				}else{
					tempPagedef['data']['contents'][0][""+variableName+""] = eval(variableName);
				//	jQuery.extend(tempPagedef['data']['contents'][0], {variableName : eval(variableName)});
					
				}
				console.log(variableName + " " +eval(variableName));
				$("#"+ variableName).val(eval(variableName));
				new $.actions(tempPagedef, ui, JSON.parse(JSON.stringify(action['events']['Success']).slice()) , eventinitpagedef).execute();
			}
			
			callback(pagedef, ui, action, eventinitpagedef, "loop");
		};
		
		return _action;
	}
	function SensorControllerActions(pagedef, ui, action, eventinitpagedef, target, callback){
		var _action = {};
		_action.execute = function(){
			switch(action['method']){
			case 'startTimer':
				startTimer();
				break;

			case 'stopTimer':
				stopTimer();
				break;
			}
		};

		var startTimer = function(){
			try{
				var timerName = $.utility('tokenizeString',action['params']['timerName'], pagedef,action);
				var interval = $.utility('tokenizeString',action['params']['interval'], pagedef,action);
				var count = 0;
				var isTimerExist = false;
				var existingTimers = $.utility('getTimers');
				for(var eachTimer in existingTimers){
					if($.utility('getTimers')[eachTimer][timerName] != undefined && $.utility('getTimers')[eachTimer][timerName]){
						isTimerExist = true;
						break;
					}
				}
				if(!isTimerExist){
					if(timerName != "" && !isNaN(interval)){
						if(action['params']['repeat']){
							var position = $.utility('addNewTimer', timerName);
							var SuccessEvent = action['events']['Success'];
							var timer = setInterval(function(){
								if($.utility('getTimers')[position-1][timerName]  == undefined || !$.utility('getTimers')[position-1][timerName]){
									clearInterval(timer);
									count++;
									return;//for Bug #10663
								}
								//if(count == 0){
									new $.actions(pagedef, ui, SuccessEvent.slice()).execute();  // fix for 7368
								//	callback(pagedef, ui, action, eventinitpagedef, true);
								//}
							}, interval*1000);
							action['events']['Success'] = [];
							callback(pagedef, ui, action, eventinitpagedef, true);
						}else{
							setTimeout(function(){
								$.utility('removeTimers',timerName );
								callback(pagedef, ui, action, eventinitpagedef, true);
							}, interval*1000);
						}
					}else{
						callback(pagedef, ui, action, eventinitpagedef, false);
					}
				}
			}catch(e){
				callback(pagedef, ui, action, eventinitpagedef, false);
			}


		};
		var stopTimer = function(){
			try{
				var timerName = $.utility('tokenizeString',action['params']['timerName'], pagedef,action);
				if(timerName != ""){
					$.utility('removeTimers',timerName );
					callback(pagedef, ui, action, eventinitpagedef, true);
				}else{
					callback(pagedef, ui, action, eventinitpagedef, false);
				}
			}catch(e){
				callback(pagedef, ui, action, eventinitpagedef, false);
			}
			
		};
		return _action;
	}
	

	function GadgetControlActions(pagedef, ui, action, eventinitpagedef, target, callback){
		
		var _action = {};
		_action.execute = function(){
			switch(action['method'])
			{
				case 'ShowGadget':
					ShowGadget();
					break;
				case 'HideGadget':
					HideGadget();
					break;
			}
		};
		
		var ShowGadget = function(){
			if(target.getViewType() === 'Gadget')
				target.setVisibility("true");
			else{
				var targetGadget = $.utility("tokenizeString",action['name'], pagedef);
				if(targetGadget !== null && targetGadget != ""){
					$.each(pagedef['children'], function(i, child) {
						if(child['viewtype'] === "Gadget" && child['name'] === targetGadget){
							child['hidden'] = "false";
							$('#'+child['id']).css({'visibility':'visible'});
							$.each(child['children'], function(j, gadgetChild){//Bug #12374 fix
								$('#'+gadgetChild['id']).css({'visibility' : 'visible'});
							});
						}
					});
				}
			}
			callback(pagedef, ui, action, eventinitpagedef, true);
		};
		var HideGadget = function(){
			if(target.getViewType() === 'Gadget')
				target.setVisibility("false");
			else{
				var targetGadget = $.utility("tokenizeString",action['name'], pagedef);
				if(targetGadget !== null && targetGadget != ""){
					$.each(pagedef['children'], function(i, child) {
						if(child['viewtype'] === "Gadget" && child['name'] === targetGadget){
							child['hidden'] = true;
							$('#'+child['id']).css({'visibility':'hidden'});
							$.each(child['children'], function(j, gadgetChild){
								$('#'+gadgetChild['id']).css({'visibility' : 'hidden'});
							});
						}
					});
				}
			}
			callback(pagedef, ui, action, eventinitpagedef, true);
		};
		
		return _action;
	}
	
	function SendPushNotificationControlActions(pagedef, ui, action, eventinitpagedef, target, callback){
		
		$.utility('initCall');		
		var _action = {};
		_action.execute = function(){
			switch(action['method'])
			{
				case 'RegisterUsersForPushNotification':
					 setTimeout(function(){
						 RegisterUsersForPushNotification();
					 },300);
					break;
				case 'SendPushMessage':
					 setTimeout(function(){
						 SendPushMessage();
					 },300);
					break;
				case 'UnregisterFromPushNotification':
					 setTimeout(function(){
						 UnregisterFromPushNotification();
					 },300);
					break;
			}
		};
		
		var RegisterUsersForPushNotification = function(){
			var clientID;
			var groupID;
			if($.utility('containsGlobalVariable', action['params']['ClientID']))
				clientID = $.utility('checkGlobalVariable',action['params']['ClientID']);
			else
				clientID = $.utility('tokenizeString',action['params']['ClientID'],pagedef);
			
			if(clientID == "")       clientID = $.utility('getPNToken');
				
			if($.utility('containsGlobalVariable', action['params']['Group']))
				groupID = $.utility('checkGlobalVariable',action['params']['Group']);
			else
				groupID = $.utility('tokenizeString',action['params']['Group'],pagedef);
			
			if(clientID != undefined && clientID != ""){
				var dataset = {
						userid:$.utility('tokenizeString',action['params']['UserId'],pagedef),
						groupid: groupID,
						clientid: clientID,
	    		};
	    		
			    command = [$.utility('getCommServerDomain'),'llcommpost?llcommand=sndmsg&command=registeruserforpushnotification','&jsonp=registerPNClientId',$.utility('appendDeviceInfo'),
			              '&callbackdata={"ver":"2",}', '&cache=', Math.random(), '&dataset=',JSON.stringify(dataset), '&project_id=', $.mobileweb['pid'], '&version=', $.mobileweb['version'], '&os=mw'];
			   
			    var sendRequest = command.join('');
			    var reqParams = sendRequest.substring(sendRequest.indexOf("?")+1);
			    if(reqParams != undefined){
				    $.utility('sendPOSTRequest', reqParams, 'RegisterUsersForPushNotification');
			    }
			    
			    setTimeout(function(){
			    	if($.utility('isPNClientRegisterd')){
			    		$.utility('registerPNClient',false);
			    		callback(pagedef, ui, action, eventinitpagedef, true);
			    	}
				    else
				    	callback(pagedef, ui, action, eventinitpagedef, false);
				},1500);
			}		
			else
				callback(pagedef, ui, action, eventinitpagedef, false);
			
			   
		};
		
		var SendPushMessage = function(){
			var userID = $.utility('tokenizeString',action['params']['UserId'],pagedef);
			
			var dataset = {
					userid:$.utility('tokenizeString',action['params']['UserId'],pagedef),
					groupid:$.utility('tokenizeString',action['params']['Group'],pagedef),
					messagetext: $.utility('tokenizeString',action['params']['Message'],pagedef),
					messageType:"",
					apns_projectid:$.mobileweb['pid'],
					apikey:$.mobileweb['WebPNKey']
    		};
			
		    command = [$.utility('getCommServerDomain'),'llcommpost?llcommand=sndmsg&command=sendpushmessage','&jsonp=pushMessage',$.utility('appendDeviceInfo'), '&callbackdata={"ver":"2",}',
		              '&dataset=',JSON.stringify(dataset), '&project_id=', $.mobileweb['pid'], '&version=', $.mobileweb['version'], '&os=mw'];
		   
		    var sendRequest = command.join('');
		    var reqParams = sendRequest.substring(sendRequest.indexOf("?")+1);
		    if(reqParams != undefined){
			    $.utility('sendPOSTRequest', reqParams, 'SendPushMessage');
		    }
    		    
		    setTimeout(function(){
		    	if($.utility('isPNMsgReceived')){
		    		$.utility('setPNMsgReceived',false);
		    		callback(pagedef, ui, action, eventinitpagedef, true);
		    	}
			    else
			    	callback(pagedef, ui, action, eventinitpagedef, false);
			},1500);
		    
		};
		
		var UnregisterFromPushNotification = function(){
			var clientID;
			var groupID;
			if($.utility('containsGlobalVariable', action['params']['ClientID']))
				clientID = $.utility('checkGlobalVariable',action['params']['ClientID']);
			else
				clientID = $.utility('tokenizeString',action['params']['ClientID'],pagedef);
			
			if(clientID == "")      clientID = $.utility('getPNToken');
			if(clientID != undefined && clientID != ""){
				var dataset = {
						userid:$.utility('tokenizeString',action['params']['UserId'],pagedef),
						clientid: clientID,
	    		};
	    		
				command = [$.utility('getCommServerDomain'),'llcommpost?llcommand=sndmsg&command=unregisterpushnotification','&jsonp=unregisterPN',$.utility('appendDeviceInfo'), '&callbackdata={"ver":"2",}',
		              '&dataset=',JSON.stringify(dataset), '&project_id=', $.mobileweb['pid'], '&version=', $.mobileweb['version'], '&os=mw'];
			   
			    var sendRequest = command.join('');
			    var reqParams = sendRequest.substring(sendRequest.indexOf("?")+1);
			    if(reqParams != undefined){
				    $.utility('sendPOSTRequest', reqParams, 'UnregisterFromPushNotification');
			    }
	  		    
			    setTimeout(function(){
			    	if($.utility('getpnUnregister')){
			    		$.utility('setpnUnregister',false);
			    		
			    		currentToken = clientID;
			    		var dataset = {
		         		    	  did : $.utility('getUID')	,
		         			      projectid : $.mobileweb['pid'],
		         			      ProjectName : $.mobileweb['projectname'],
		         			      projectstate : ($.mobileweb['state'] === 'preview') ? 'development' : $.mobileweb['applicationState'],
		         			      Title : $.mobileweb['title'],
		         			      clientid: currentToken,
		          	    		  os : 'mw',
		         		    };
		         		    
		         		    var url=[$.utility('getCommServerDomain'),'initPNS?jsonp=registerPNClientId&callbackdata={"ver":"2","token":"',currentToken,'",}&dataset=',
		         		         JSON.stringify(dataset) ].join('');
		         		    $.utility('sendRequest',url);
		         		    setTimeout(function(){
		         		    	$.utility('registerPNClient',false);
							},500);
			    		
			    		callback(pagedef, ui, action, eventinitpagedef, true);
			    	}
				    else
				    	callback(pagedef, ui, action, eventinitpagedef, false);
				},1000);
			}		
			else
				callback(pagedef, ui, action, eventinitpagedef, false);		
			   
		};
		
		return _action;
	}
	
})(jQuery);