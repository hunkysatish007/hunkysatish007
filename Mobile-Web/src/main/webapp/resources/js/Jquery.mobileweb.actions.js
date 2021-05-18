/* jQuery Plugin that handles the actions on the event.
 */
(function($){
	$.actions = function(pagedef, ui, actions, eventinitpagedef, actionsCallback){	// eventinitpagedef = Event triggering page definition.
		var _actions = {};
		var tempAction = [];
		tempAction = actions.slice();
		tempAction.shift();
		var action = {};
		action = $(actions).get(0);
		_actions.execute = function(){
			if(actions.length < 1){
				return _actions;
			}else{
				new $.run(pagedef, ui, action, eventinitpagedef, function(pagedef, ui, action, eventinitpagedef,status){
					if((status === true) && (action['events'] != undefined) &&(action['events']['Success'].length > 0)){
						$.each(tempAction, function(key, actionObj){
							//action['events']['Success'].push(actionObj);
						    
						    //Don't know how but 'tempAction --> actionObj' already exist in some cases(DetectRecords..). So, i dont want to again push. date : 22-09-2017
						    var isExist = false
						    var actionarr = action['events']['Success'].slice();
						    for(var j = 0 ; j <  actionarr.length; j++){
//						    	if(actionarr[j] === actionObj)
						    	if(JSON.stringify(actionarr[j]) === JSON.stringify(actionObj))
						    		isExist = true;
						    }
						    if(!isExist)
						    	action['events']['Success'].push(actionObj);
						    
//						    if(actionObj['condition'] != undefined && !$.isEmptyObject(actionObj['condition'])){
//						    	 var conditionValue = $.utility('parseCondition', pagedef, ui, actionObj, eventinitpagedef , actionObj['condition']['groupcases']);
//								 if(!isExist && conditionValue)
//									 action['events']['Success'].push(actionObj);
//						    }else{
//						    	if(!isExist)
//							    	action['events']['Success'].push(actionObj);
//						    }

						});
						$.actions(pagedef, ui, action['events']['Success'].slice(), eventinitpagedef,actionsCallback).execute();
					}else if((status === false)  && (action['events'] != undefined) && (action['events']['Error'].length > 0)){ // type safety.
						$.each(tempAction, function(key, actionObj){
							//action['events']['Error'].push(actionObj);
							
							 var isExist = false
							    var actionarr = action['events']['Error'].slice();
							    for(var j = 0 ; j <  actionarr.length; j++){
							    	if(actionarr[j] === actionObj)
							    	isExist = true;
							    }
							    if(!isExist)
							    	action['events']['Error'].push(actionObj);
						});
						$.actions(pagedef, ui, action['events']['Error'].slice() , eventinitpagedef,actionsCallback).execute();
					}else if((status === "onTapOk")  && (action['events'] != undefined) && (action['events']['onTapOk'].length > 0)){
						$.each(tempAction, function(key, actionObj){
							//action['events']['onTapOk'].push(actionObj);
							
						    var isExist = false
						    var actionarr = action['events']['onTapOk'].slice();
						    for(var j = 0 ; j <  actionarr.length; j++){
						    	if(actionarr[j] === actionObj)
						    	isExist = true;
						    }
						    if(!isExist)
						    	action['events']['onTapOk'].push(actionObj);
						});
						$.actions(pagedef, ui, action['events']['onTapOk'].slice() , eventinitpagedef,actionsCallback).execute();// insert 'actionsCallback' paramter to fix bug #9852. date : 18-09-2017
					}else if((status === "onTapCancel")  && (action['events'] != undefined) && (action['events']['onTapCancel'].length > 0)){
						$.each(tempAction, function(key, actionObj){
							//action['events']['onTapCancel'].push(actionObj);
							
							var isExist = false
						    var actionarr = action['events']['onTapCancel'].slice();
						    for(var j = 0 ; j <  actionarr.length; j++){
						    	if(actionarr[j] === actionObj)
						    	isExist = true;
						    }
						    if(!isExist)
						    	action['events']['onTapCancel'].push(actionObj);
						});
						$.actions(pagedef, ui, action['events']['onTapCancel'].slice() , eventinitpagedef,actionsCallback).execute();
					}else if((status === "OnElse")  && (action['events'] != undefined) && (action['events']['OnElse'].length > 0)){
						$.each(tempAction, function(key, actionObj){
							//action['events']['OnElse'].push(actionObj);
						    var isExist = false
						    var actionarr = action['events']['OnElse'].slice();
						    for(var j = 0 ; j <  actionarr.length; j++){
						    	if(actionarr[j] === actionObj)
						    	isExist = true;
						    }
						    if(!isExist)
						    	action['events']['OnElse'].push(actionObj);
						});
						$.actions(pagedef, ui, action['events']['OnElse'].slice() , eventinitpagedef,actionsCallback).execute();
					}else if(status === "loop"){
						actions.shift();
						var act = actions.slice();
						act.shift();
						if(actions.length > 0){
							$.actions(pagedef, ui, actions, eventinitpagedef,actionsCallback).execute();
						}else{
							
							$.utility('setActionRunningStatus', false);
							if(actionsCallback != undefined)
								actionsCallback(pagedef, ui, actions, eventinitpagedef);
							
						}
					}else{
						actions.shift();
						var act = actions.slice();
						act.shift();
						if(actions.length > 0){
							$.actions(pagedef, ui, actions, eventinitpagedef,actionsCallback).execute();
						}else{
							$.utility('setActionRunningStatus', false);
							if(actionsCallback != undefined)
								actionsCallback(pagedef, ui, actions, eventinitpagedef);
						}
					}

				});	
			}
			
		};

		$.getUI = function(name, ui, targetPage){
			var _page = $.mobileweb.getCurrentPage();
			return _page.getChild(name, ui, targetPage);
		};
		$.getGadgetUI = function(name, ui, targetPage){
			var _page = $.mobileweb.getCurrentPage();
			return _page.getGadgetChild(name, ui, targetPage);
		};
		$.getRemoteUI = function(name, ui, pagename){
			var _page = $.mobileweb.getPage(pagename, false);
			return _page.getChild(name, ui);
		};

		$.run = function(pagedef, ui, action, eventinitpagedef, callback){
			// Recursive Function to run all actions.. main motive is to remove ForEach loop..
			var target = {};
			if(action != undefined && action['name'])	// this is the target UI object name..
			{
				var name = "";
				if(action['params'] != undefined && action['params']['cellId'] != undefined && action['params']['groupId'] != undefined){
					name  = $.utility("tokenizeString", action['name'], pagedef) + "_ui-defgroup-"+action['params']['groupId']+"-main-"+action['params']['cellId'];	
				}else{
					name =  $.utility("tokenizeString", action['name'], pagedef);
				}
				
				if(eventinitpagedef != undefined){
					target = eventinitpagedef['target'];
					if($.isEmptyObject(target)) // Bug #13740 fix
						target = $.getUI(name, ui, "");
				}else{
					if(action['actionParentUI'] != undefined && action['actionParentUI'] == "Gadget"){
						target = $.getGadgetUI(name, ui, action['actionParentUIName']);
					}else if(pagedef['parentType'] != undefined && pagedef['parentType'] == "SplitView"){ 
						if(action['params'] != undefined && action['params']['targetpage'] != undefined){ // fix for 8653
							target = $.getUI(name, ui, action['params']['targetpage']);
						}else{
							target = $.getUI(name, ui, "");
						}
						
					}else if(pagedef['type'] != undefined && pagedef['type'] == "SplitView"){ 
						if(action['params'] != undefined && action['params']['targetpage'] != undefined){ // fix for 8653
							target = $.getUI(name, ui, action['params']['targetpage']);
						}else{
							target = $.getUI(name, ui, "");
						}
					}else if(pagedef['parentType'] != undefined && pagedef['parentType'] == "PageScrollView"){ 
						if(action['params'] != undefined && action['params']['targetpage'] != undefined){ 
							target = $.getUI(name, ui, action['params']['targetpage']);
						}else{
							target = $.getUI(name, ui, pagedef['name']);
						}
						
					}else if(pagedef['type'] != undefined && pagedef['type'] == "PageScrollView"){ 
						if(action['params'] != undefined && action['params']['targetpage'] != undefined){ 
							target = $.getUI(name, ui, action['params']['targetpage']);
						}else{
							target = $.getUI(name, ui, "");
						}
					}else { 
						if(action['params'] != undefined && action['params']['targetpage'] != undefined){
							target = $.getUI(name, ui, action['params']['targetpage']);
						}else{
							target = $.getUI(name, ui, "");
						}
					}
				}
				
//				if($.isEmptyObject(target)){
//                	console.log(action['method'], " >> target is empty.");
//                }				
			}
			if(action['method'] === "StartGPS"){
				action['params']['targetpage'] = pagedef['name'];
			}
			
			if(action['condition'] != undefined && action['condition']['result'] == undefined){
				if(!$.isEmptyObject(action['condition'])){
					var conditionValue = $.utility('parseCondition', pagedef, ui, action, eventinitpagedef , action['condition']['groupcases']);
					if(!conditionValue){
						
						if((action['events'] != undefined) && (action['events']['OnElse'] != undefined) && (action['events']['OnElse'].length > 0)){
							callback(pagedef, ui, action, eventinitpagedef,"OnElse");
							return _actions;
						}else{
							callback(pagedef, ui, action, eventinitpagedef, "");
							return _actions;
						}
						
						
					}	
				}
			}else if(action['condition'] != undefined && action['condition']['result'] != undefined && action['condition']['result']){
				console.log("Here...");
				
			}

			// below piece of code is written for Condition in Actions.. 
			if(action['condition'] !== undefined){}
			if(action['method'] === "setParentData"){
				action['params']['targetpage'] = '';
			}
			//Blocked as this is used only when action has to trigger for another page..
			if(pagedef !== null ){ // pagedef will be only null when app starts..
				
				if(pagedef['type'] === "DBTableViewList" || pagedef['type'] == 'RemoteTableViewList'){		//Since ui-'click' is executing before row-'click'. It is HOTFIX, need to evaluate further. Dated : 19-Mar-2109
					if(ui != undefined){ 
						if(ui.getId != undefined && ui.getViewType() != "Row" && ui.getViewType() != "ToggleButton"){
							var uiId = ui.getId();
							if(uiId.split('-').length > 2){		// means 'ui' is the part of Table-row.
								var tempStr = uiId.substr(0, uiId.lastIndexOf('-'));
								rowNum = tempStr.substr(tempStr.lastIndexOf('-')+1, tempStr.length);
								
								if(isNaN(parseInt(rowNum)))
									rowNum = 0;
								if(isNaN(pagedef['data']['contents']['currentRow']))
									pagedef['data']['contents']['currentRow'] = rowNum;
							}
						}
					}
				}
				
				//if 'targetpage' is any parent-page of current page, then sub-actions should be executed.
				if(pagedef['type'] != 'SplitView' && ((action['params'] !== undefined) && (action['params']['targetpage'] !== undefined) && (action['params']['targetpage'] !== "")) && $.utility('isParentPageHierarchy', action['params']['targetpage']))
				{     
					if(!$.isEmptyObject(target) && eventinitpagedef != undefined){ 		//Bug #10546 fix 
						$.actionHelper(pagedef, ui, action, target, eventinitpagedef, function(pagedef, ui, action, eventinitpagedef, status)
						{       
							try{        
								callback(pagedef, ui, action, eventinitpagedef, status);       
							}catch(e){        
								$.utility('setActionRunningStatus', false);      
							}      
						});      
						return _actions;    
					}    
				}
				
				if(pagedef['parentType'] == undefined && pagedef['type'] != 'SplitView' && pagedef['type'] != 'PageScrollView'){
					if((action['actionParentUI'] == "Page") && (((action['params'] !== undefined) && (action['params']['targetpage'] !== undefined) && (action['params']['targetpage'] !== "") && (action['params']['targetpage'] !== $.mobileweb.getCurrentPage().getName()))) ){
						// code for executing action for different page ..
						if(action['method'] === "ResetViewData"){
							var sendAction = $.utility('clone', action);
							delete sendAction.events;
							var conditionValue = false;
							if(action['condition'] != undefined && !$.isEmptyObject(action['condition'])){
								conditionValue = $.utility('parseCondition', pagedef, ui, action, eventinitpagedef , action['condition']['groupcases']);
							}else{
								conditionValue = true;
							}
							
							if(conditionValue){
								var actionObject = {"pagedef":pagedef,"ui":ui,"action":sendAction,"target":target};
								$.utility('setRegisteredActions',actionObject);
								callback(pagedef, ui, action, eventinitpagedef,true);
							}
							
						}else{

							var targetpage = pagedef['parent'].split('page');
							if(action['method'] === "setParentData"){
								action['params']['targetpage'] = "page"+targetpage[targetpage.length -1];
							}
							
							if(action['method'] === "SetMainValue"){
								if(action['params']['targetpage'].indexOf("[") != -1 && action['params']['targetpage'].indexOf("]") != -1){
									var _targetPageName = $.utility('tokenizeString', action['params']['targetpage'], pagedef);
									$.each($.mobileweb['pages'], function(i, page){
										console.log(page['pageTitle'],"---",page['name'],"---",_targetPageName);
										if(page['pageTitle'] == _targetPageName){
											action['params']['targetpage'] = page['name'];
											//break;
										}
									});
								}
							}
							
							
							var isSplitChild = false;
							var _targetpage = $.utility('getObject',$.mobileweb['pages'],'name',action['params']['targetpage']);
							if(_targetpage != undefined){
								if(_targetpage['parentType'] === 'SplitView')
									isSplitChild = true;
							}
							
							var flag = false;
							$.each($.mobileweb['pages'], function(i, page){
								if(action['params']['targetpage'] == page['name'] || isSplitChild){
									
									isSplitChild = false;
									flag = true;
									
									var target = {};
									if(action['category'] != "DBCondition"){
										if(action['params'] != undefined && action['params']['cellId'] != undefined && action['params']['groupId'] != undefined){
											var name = $.utility("tokenizeString", action['name'], pagedef) + "_ui-defgroup-"+action['params']['groupId']+"-main-"+action['params']['cellId'];
									//		target = $.getRemoteUI(name, ui, targetPage.getName());	
										}else{
										//	target = $.getRemoteUI(action['name'], ui, targetPage.getName());
										}
									}
									
									var conditionValue = false;
									if(action['condition'] != undefined && !$.isEmptyObject(action['condition'])){
										conditionValue = $.utility('parseCondition', pagedef, ui, action, eventinitpagedef , action['condition']['groupcases']);
									}else{
										conditionValue = true;
									}
									
									if(conditionValue){
										var sendAction = $.utility('clone', action);
										if(action['category'] === "DBCondition"){
											var pageClone = pagedef;//Bug #10555 Fix
											var initcontents;
											if(ui['rownum'] != undefined){
												if(pagedef['data']['contents'][0][ui['rownum']] != undefined){
													initcontents = pagedef['data']['contents'][0][ui['rownum']];
												}
												else
													initcontents = pagedef['data']['contents'][ui['rownum']];
											}
											if(initcontents != undefined)
												pageClone['data']['contents'][0] = initcontents;
											if(action['params']['where'] != undefined){
												if(action['method'] === "changeCondition"){
													sendAction.params.initialWhere = action['params']['where'];
												}
												sendAction.params.where = $.utility("tokenizeString", action['params']['where'],pageClone);
											}
											if(action['params']['order'] != undefined){
												sendAction.params.order = $.utility("tokenizeString", action['params']['order'], pageClone);
											}
										}else /*if(!$.isEmptyObject(target))*/ {
											if(sendAction.condition!= undefined && !$.isEmptyObject(sendAction.condition)){
												delete sendAction.condition;
											}
											if(action['params']['value'] != undefined){

											}
										}
										
										var _targetUIName = ""; 
										if(action['params'] != undefined && action['params']['cellId'] != undefined && action['params']['groupId'] != undefined){
											_targetUIName  = $.utility("tokenizeString", action['name'], pagedef) + "_ui-defgroup-"+action['params']['groupId']+"-main-"+action['params']['cellId'];	
										}else{
											_targetUIName =  $.utility("tokenizeString", action['name'], pagedef);
										}
										

										if(action['method'] === "changeCondition"){
											$.utility('setDelayedChangeCondition',true,action['params']['targetpage']);
										}
										
										sendAction['name'] = _targetUIName;
										
										delete sendAction.events;
										
										var actionObject = {"pagedef":pagedef,"ui":ui,"action":sendAction,"target":target};
										$.utility('setRegisteredActions',actionObject);
										
										// since action is executing for different page, so first we must execute success events which has actions to navigate that page logically.
										callback(pagedef, ui, action, eventinitpagedef,true);
										
									}else {
										callback(pagedef, ui, action, eventinitpagedef,false);
									}
								}
								
							});
							
							if (!flag){
 								callback(pagedef, ui, action, eventinitpagedef,false);
 							}
						}
					}else{
						if(ui != undefined && ui != null && ui['headerFlag'] != true && ui.getId != undefined && ui.getId().indexOf('-tile-') != -1){ //Bug #12415,#12421 fix
							 var timer = setInterval(function(){
									  clearInterval(timer);
									  $.actionHelper(pagedef, ui, action, target,eventinitpagedef, function(pagedef, ui, action, eventinitpagedef, status){
											try{
												callback(pagedef, ui, action, eventinitpagedef, status);
											}catch(e){
												$.utility('setActionRunningStatus', false);
											}
										});
								  },200);
						}else{
							$.actionHelper(pagedef, ui, action, target,eventinitpagedef, function(pagedef, ui, action, eventinitpagedef, status){
								try{
									callback(pagedef, ui, action, eventinitpagedef, status);
								}catch(e){
									$.utility('setActionRunningStatus', false);
								}
							});
						}
					}
				}else{
					
					if((pagedef['parentType'] != undefined && (pagedef['parentType'] == 'SplitView' || pagedef['parentType'] == 'PageScrollView')) || (pagedef['parentType'] == undefined && pagedef['type'] != undefined && (pagedef['type'] == 'SplitView' || pagedef['type'] == 'PageScrollView'))){
						var isDelayedref = true;
						if(action['params'] == undefined || action['params']['targetpage'] == undefined)
							isDelayedref = false;
						else{
							if($.mobileweb.getCurrentPage().getViewType() === "SplitView"){
								var splitPage = $.utility('getObject', $.mobileweb['pages'], 'name', $.mobileweb.getCurrentPage().getName());
								var splitChildren = splitPage['children'];
								$.each(splitChildren, function(k, splitPage){
									if(splitPage['name']  == action['params']['targetpage'] && (!splitPage['isgrandChild'])){ //Bug #12321 fix
										isDelayedref = false;
									}
								});
							}else{
								if($.mobileweb.getCurrentPage()['children'] != undefined){
									$.each($.mobileweb.getCurrentPage()['children'], function(i, child){
										if(child.getName() == action['params']['targetpage'])
											isDelayedref = false;
									});
								}
							}
						}
 						
 						if(isDelayedref){
 							if((action['actionParentUI'] == "Page") && (((action['params'] !== undefined) && (action['params']['targetpage'] !== undefined) && (action['params']['targetpage'] !== "") && (action['params']['targetpage'] !== $.mobileweb.getCurrentPage().getName()))) ){
 								if(action['condition'] != undefined && !$.isEmptyObject(action['condition'])){
 									conditionValue = $.utility('parseCondition', pagedef, ui, action, eventinitpagedef , action['condition']['groupcases']);
 								}else{
 									conditionValue = true;
 								}
 								
 								if(conditionValue){
 									var sendAction = $.utility('clone', action);
 									if(action['category'] === "DBCondition"){
 										if(!$.isEmptyObject(sendAction.condition)){

 										}
 										if(action['params']['where'] != undefined){
 											sendAction.params.where = $.utility("tokenizeString", action['params']['where'],pagedef);
 											
 										}
 										if(action['params']['order'] != undefined){
 											sendAction.params.order = $.utility("tokenizeString", action['params']['order'], pagedef);
 										}
 									}else /*if(!$.isEmptyObject(target))*/ {
 										if(sendAction.condition!= undefined && !$.isEmptyObject(sendAction.condition)){
 											delete sendAction.condition;
 										}
 										if(action['params']['value'] != undefined){

 										}
 									}
 									delete sendAction.events;
 									
 									var actionObject = {"pagedef":pagedef,"ui":ui,"action":sendAction,"target":target};
 									$.utility('setRegisteredActions',actionObject);
 									callback(pagedef, ui, action, eventinitpagedef,true);
 								}
 							}else{
 								
 								$.actionHelper(pagedef, ui, action, target,eventinitpagedef, function(pagedef, ui, action, eventinitpagedef, status){
 									try{
 										callback(pagedef, ui, action, eventinitpagedef, status);
 									}catch(e){
 										$.utility('setActionRunningStatus', false);
 									}
 									
 								});
 							}
						}else{
	 						$.actionHelper(pagedef, ui, action, target,eventinitpagedef, function(pagedef, ui, action, eventinitpagedef, status){
	 							try{
	 								callback(pagedef, ui, action, eventinitpagedef, status);
	 							}catch(e){
	 								$.utility('setActionRunningStatus', false);
	 							}
	 							
	 						});
	 					}
					}else{
						
						$.actionHelper(pagedef, ui, action, target,eventinitpagedef, function(pagedef, ui, action, eventinitpagedef, status){
							try{
								callback(pagedef, ui, action, eventinitpagedef, status);
							}catch(e){
								$.utility('setActionRunningStatus', false);
							}
							
						});
					}
					
				}
			}else{
				$.actionHelper(pagedef, ui, action, target,eventinitpagedef, function(pagedef, ui, action, eventinitpagedef, status){
					try{
						callback(pagedef, ui, action.slice(), eventinitpagedef, status);
					}catch(e){
						$.utility('setActionRunningStatus', false);
					}
				});
			}

		};
		return _actions;

	
		
	};
	// -- End Of action--

	
})(jQuery);