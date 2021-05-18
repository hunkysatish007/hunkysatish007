/**  
 * Author: Sachit Kesri
 * Date: Feburary 13, 2014
 * All rights reserved - Mobilous Softech Private Limited
 * 
 */

(function($){
	
	var remoteDBListViewPage = new Object();
	var remoteViewPage = new Object();
	
	function BaseView(baseviewdef){
		var baseview = {frame: $.attributes('frame',baseviewdef),
						font: $.attributes('font',baseviewdef),
						border: $.attributes('border',baseviewdef),
						padding: $.attributes('padding',baseviewdef),
						background: $.attributes('background',baseviewdef)};
		
		baseview.getName = function(){
			return baseviewdef['name'];
		};
		
		baseview.getId = function(){
			return baseviewdef['name'];
		};
		
		baseview.getViewType = function(){
			return baseviewdef['type'];
		};
		
		return baseview;
	};
	
	
	function ToolBarTop_old(pagedef){
		var pagewidth = 0;
//		if(pagedef['type'] === 'ScrollView'){
//			pagewidth = pagedef['width'];
//		}else{
		pagewidth = pagedef['sectionwidth'];
		//}
		var toolbartop = { height: 0 };
		var toolbartopdef = pagedef['toolbartop'];
		if((toolbartopdef != undefined) && (!toolbartopdef['hidden'])){
			toolbartop['children'] = new $.uichildren(pagedef, toolbartopdef['children'], null);
		}
		toolbartop.getHTML= function(){
			if($.isEmptyObject(toolbartopdef) || toolbartopdef['hidden']){
				return [""].join('');
			}
			return ['<div id="'+pagedef['name']+'_toolbarTop">',toolbartop['children'].getHTML(),'</div>'].join('');
			
		};
		
		toolbartop.isHidden = function(){
			return toolbartopdef['hidden'];
		};
		
		toolbartop.applyOverrides = function(){
			
			if(!$.isEmptyObject(toolbartopdef)){
				if(!toolbartopdef['hidden']){
					toolbartop['children'].applyOverrides();
					var aspect = $.mobileweb.device['aspectratio'];
					var sLeft = pagedef['sectionX'] * aspect;
					 
					$('#'+pagedef['name']+'_toolbarTop').css({'position':'absolute', 'left':sLeft,'height' :  toolbartopdef['frame']['height'] *aspect, 'width' : pagewidth * aspect});
					$('#'+pagedef['name']+'_toolbarTop').css({'background': ($.attributes('color',toolbartopdef['backgroundColor'])).getColorCode(),'background-repeat': 'repeat'});
					
					var top = pagedef['sectionY'] * aspect;
					/*if(!pagedef['statusbarhidden']){
						top = top + 20;
					}*/
					
					/*if(!pagedef['header']['hidden']){
						top = top + 44;
					}*/
					if(pagedef['type'] === "ScrollView" ){
						/*top = top + pagedef['y'];
						if($.mobileweb['state'] === 'production'){
							$('#'+pagedef['name']+'_toolbarTop').css({'top': top+'px', 'left': pagedef['x'] +"px"});
						}else {
							$('#'+pagedef['name']+'_toolbarTop').css({'top': top+'px', 'left': pagedef['x'] +"px"});
						}
						*/
					}else{
						$('#'+pagedef['name']+'_toolbarTop').css({'top': top+'px'});
					}					
						
					
				}
				
			}
		};
		toolbartop.getHeight = function(){
			if(!toolbartopdef['hidden'])
				return  toolbartopdef['frame']['height'];
			else return 0;
		};
		
		toolbartop.applyEvents= function(){
			if(!$.isEmptyObject(toolbartopdef)){
				if(!toolbartopdef['hidden'])
				toolbartop['children'].applyEvents();
			}
			// no apply events..
		};
		
		return toolbartop;
	};
	
	function ToolBarBottom_old(pagedef){
		var pagewidth = pagedef['sectionwidth'];
		
		var toolbarbottom = { height: 0 };
		var toolbarbottomdef = pagedef['toolbarbottom'];
		if(!$.isEmptyObject(toolbarbottomdef)){
			if(!toolbarbottomdef['hidden']){
				toolbarbottom['children'] = new $.uichildren(pagedef, toolbarbottomdef['children'], null);
			}
		}
		toolbarbottom.getHTML= function(){
			if(!$.isEmptyObject(toolbarbottomdef)){
				if(!toolbarbottomdef['hidden']){
					return ['<div id="'+pagedef['name']+'_toolbarBottom">',
                            toolbarbottom['children'].getHTML(),
                            '</div>'].join('');
				}
			}else return [''].join('');
			
		};
		
		toolbarbottom.isHidden = function(){
			return toolbarbottomdef['hidden'];
		};
		
		toolbarbottom.applyOverrides = function(){
			if(!$.isEmptyObject(toolbarbottomdef)){
				if(!toolbarbottomdef['hidden']){
					var aspect = $.mobileweb.device['aspectratio'];
					var sLeft = pagedef['sectionX'] * aspect;
					/*if(pagedef['type'] === 'ScrollView'){
						sLeft = pagedef['x'];
					}else{
						sLeft = pagedef['sectionX'];
					}*/
					
					if($.mobileweb['state'] != 'preview'){
						var top = pagedef['height'];
						if(pagedef['type'] === "ScrollView"){
							top = 0;
							if(!pagedef['statusbarhidden']){
								top = top + 20;
							}
							if(pagedef['header'] != undefined && !pagedef['header']['hidden']){
								top = top + 44;
							}
							
							if(!pagedef['toolbartop']['hidden']){
								top = top +(parseFloat(pagedef['toolbartop']['frame']['height']) * aspect);
							}
							if($('#iscroll_' + pagedef['name']) != undefined){
								if($('#iscroll_' + pagedef['name']).css('height') != undefined)
									top = top + parseFloat($('#iscroll_' + pagedef['name']).css('height').replace('px',''));
							}
							top = top + pagedef['x'];
						}else if(pagedef['type']=="RemoteTableViewList" || pagedef['type']=="DBTableViewList" || pagedef['type']=="TableViewList" || pagedef['type']=="DBTableView" || pagedef['type']=="TableView" || pagedef['type']=="RemoteTableView"){
							top = 0;
							if(!pagedef['statusbarhidden']){
								top = top + 20;
							}
							if(pagedef['header'] != undefined && !pagedef['header']['hidden']){
								top = top + 44;
							}
							
							if(!pagedef['toolbartop']['hidden']){
								top = top +(parseFloat(pagedef['toolbartop']['frame']['height']) * aspect);
							}
							if($('#iscroll_' + pagedef['name']) != undefined){
								if($('#iscroll_' + pagedef['name']).css('height') != undefined)
									top = top + parseFloat($('#iscroll_' + pagedef['name']).css('height').replace('px',''));
							}
							
						}else{
							if(!pagedef['statusbarhidden']){
								top = top - 20;
							}
							
							if(pagedef['header'] != undefined && !pagedef['header']['hidden']){
								top = top - 44;
							}
							if(!pagedef['toolbartop']['hidden']){
								top = top - (pagedef['toolbartop']['frame']['height']);
							}
							
							top = top * aspect;
						}
						
					}else{
						var top = 0;
						/*if(!pagedef['footer']['hidden']){
							top = top + 49;
						}*/
						if(!pagedef['toolbartop']['hidden']){
							top = top + ((pagedef['toolbartop']['frame']['height']) * aspect);
						}
						
						/*if(!pagedef['toolbarbottom']['hidden']){
							top = top + ((pagedef['toolbarbottom']['frame']['height']) * aspect);
						}*/
						top = top + parseFloat($("#" + pagedef['name']+"_section").css("height").replace('px', ''));
						
					}
					toolbarbottom['children'].applyOverrides();
					if($('#' + pagedef['name'] +'_section') != undefined){
						if($('#' + pagedef['name'] +'_section').css('height') != undefined)
							$('#'+pagedef['name']+'_toolbarBottom').css({'position':'absolute','top':" ",'bottom':'0px', 'left':sLeft,'height' :  toolbarbottomdef['frame']['height'] *aspect, 'width' : pagewidth * aspect});
					}else{
						$('#'+pagedef['name']+'_toolbarBottom').css({'position':'absolute','top':top +"px", 'left':sLeft,'height' :  toolbarbottomdef['frame']['height'] *aspect, 'width' : pagewidth * aspect});
						$('#'+pagedef['name']+'_toolbarBottom').css({'background': ($.attributes('color',toolbarbottomdef['backgroundColor'])).getColorCode(),'background-repeat': 'repeat'});
					}
					$('#'+pagedef['name']+'_toolbarBottom').css({'background': ($.attributes('color',toolbarbottomdef['backgroundColor'])).getColorCode(),'background-repeat': 'repeat'});
//					if(pagedef['type'] === "ScrollView" && $.mobileweb['state'] === 'production'){
//						$('#'+pagedef['name']+'_toolbarBottom').css({'top': top+'px', 'left': sLeft +"px"});
//					}else{
//						$('#'+pagedef['name']+'_toolbarBottom').css({'top': top+'px'});
//					}
				
				}
			}
		};
		toolbarbottom.getHeight = function(){
			if(!toolbarbottomdef['hidden'])
				return  toolbarbottomdef['frame']['height'];
			else return 0;
		};
		toolbarbottom.applyEvents= function(){
			if(!$.isEmptyObject(toolbarbottomdef)){
				if(!toolbarbottomdef['hidden']){
					toolbarbottom['children'].applyEvents();
				}
			}
			// no apply events..
		};
		
		return toolbarbottom;
	};
	
	
	// 'Top' toolbar for splitview - child page
	function ToolBarTop(pagedef){
		var aspect = $.mobileweb.device['aspectratio'];
		
		var pageLeft = pagedef['sectionX'];
		var pageTop = pagedef['sectionY'];
		var pageWidth = pagedef['sectionwidth'];
			
		var toolbartop = { height: 0 };
		var toolbartopdef = pagedef['toolbartop'];
		if(toolbartopdef != undefined){
			if(!toolbartopdef['hidden'])		// means it is visible
				toolbartop['children'] = new $.uichildren(pagedef, toolbartopdef['children'], null);
		}
		
		toolbartop.getHTML= function(){
			if(!$.isEmptyObject(toolbartopdef)){
				if(!toolbartopdef['hidden']){
					return ['<div id="'+pagedef['name']+'_toolbarTop">',toolbartop['children'].getHTML(),'</div>'].join('');
				}
			}else
				return [""].join('');
		};
		
		toolbartop.applyOverrides = function(){
			if(!$.isEmptyObject(toolbartopdef)){
				if(!toolbartopdef['hidden']){
					
					toolbartop['children'].applyOverrides();
					 
					$('#'+pagedef['name']+'_toolbarTop').css({'position':'absolute', 'background': ($.attributes('color',toolbartopdef['backgroundColor'])).getColorCode(), 'background-repeat':'repeat'});
					$('#'+pagedef['name']+'_toolbarTop').css({'top': pageTop *$.mobileweb.device['aspectHratio'], 'height': toolbartopdef['frame']['height'] *$.mobileweb.device['aspectHratio']});
					$('#'+pagedef['name']+'_toolbarTop').css({'left': pageLeft *$.mobileweb.device['aspectWratio'], 'width': pageWidth *$.mobileweb.device['aspectWratio']});
				}
			}
		};
		
		toolbartop.applyEvents= function(){
			if(!$.isEmptyObject(toolbartopdef)){
				if(!toolbartopdef['hidden'])
				toolbartop['children'].applyEvents();
			}
			// no apply events..
		};
		
		toolbartop.isHidden = function(){
			return toolbartopdef['hidden'];
		};
		
		toolbartop.getHeight = function(){
			if(!toolbartopdef['hidden'])
				return  toolbartopdef['frame']['height'];
			else return 0;
		};
		
		return toolbartop;
	};
	
	// 'Bottom' toolbar for splitview - child page
	function ToolBarBottom(pagedef){
		var aspect = $.mobileweb.device['aspectratio'];
		
		var pageLeft = pagedef['sectionX'];
		var pageTop = pagedef['sectionY'];
		var pageWidth = pagedef['sectionwidth'];
		
		var toolbarbottom = { height: 0 };
		var toolbarbottomdef = pagedef['toolbarbottom'];
		if(!$.isEmptyObject(toolbarbottomdef)){
			if(!toolbarbottomdef['hidden'])
				toolbarbottom['children'] = new $.uichildren(pagedef, toolbarbottomdef['children'], null);
		}
		
		toolbarbottom.getHTML= function(){
			if(!$.isEmptyObject(toolbarbottomdef)){
				if(!toolbarbottomdef['hidden']){
					return ['<div id="'+pagedef['name']+'_toolbarBottom">',
                            toolbarbottom['children'].getHTML(),
                            '</div>'].join('');
				}
			}else return [''].join('');
			
		};
		
		toolbarbottom.applyOverrides = function(){
			if(!$.isEmptyObject(toolbarbottomdef)){
				if(!toolbarbottomdef['hidden']){
					
					toolbarbottom['children'].applyOverrides();
					
					$('#'+pagedef['name']+'_toolbarBottom').css({'position':'absolute', 'background': ($.attributes('color',toolbarbottomdef['backgroundColor'])).getColorCode(), 'background-repeat':'repeat'});
					var _top = (parseInt(pageTop) + parseInt(pagedef['sectionheight']) - parseInt(toolbarbottomdef['frame']['height']));
					$('#'+pagedef['name']+'_toolbarBottom').css({'top': _top *$.mobileweb.device['aspectHratio']+'px'});
					$('#'+pagedef['name']+'_toolbarBottom').css({'left': pageLeft *$.mobileweb.device['aspectWratio'], 'width': pageWidth *$.mobileweb.device['aspectWratio'], 'height': toolbarbottomdef['frame']['height'] *$.mobileweb.device['aspectHratio']});
				}
			}
		};
		
		toolbarbottom.applyEvents= function(){
			if(!$.isEmptyObject(toolbarbottomdef)){
				if(!toolbarbottomdef['hidden']){
					toolbarbottom['children'].applyEvents();
				}
			}
			// no apply events..
		};

		toolbarbottom.isHidden = function(){
			return toolbarbottomdef['hidden'];
		};
		
		toolbarbottom.getHeight = function(){
			if(!toolbarbottomdef['hidden'])
				return  toolbarbottomdef['frame']['height'];
			else return 0;
		};
		
		return toolbarbottom;
	};
	
	$.splitviewChildScaleRatio = function(page){
		var _unscaledPageBars = 0;
		
		if(!page['statusbarhidden']){
			_unscaledPageBars = _unscaledPageBars + 20;
		}
		if(page['header'] != undefined && !page['header']['hidden']){
			if(page['header']['prompt'] != '')
				_unscaledPageBars = _unscaledPageBars + 77;
			else
				_unscaledPageBars = _unscaledPageBars + 44;
		}
		if(page['footer'] != undefined && !page['footer']['hidden']){
			_unscaledPageBars = _unscaledPageBars + 49;
		}
		
		var _clientHeightAvailable_forScaling = document.documentElement.clientHeight - _unscaledPageBars;
		var _scaledRatio = _clientHeightAvailable_forScaling / (page['height'] - _unscaledPageBars);
		$.mobileweb.device['aspectHratio'] = _scaledRatio;
		//$.mobileweb.device['aspectratio'] = _scaledRatio;
	};
	
	
	//Entry point for 'split-view' implementation
	$.uiSplitViewPageContainer = function(pagedef, splitViewInnerPages){
		var uichildren = [];
		pagedef['data']['innerPagesCount'] = 0;
		//$.splitviewChildScaleRatio(pagedef);
		
		$.each(splitViewInnerPages, function(i, page){
			switch(page['type']){
				case 'BaseView':
					page['pagedef'] = pagedef;
					uichildren.push($.uiBaseViewForSV(pagedef,page));
					pagedef['data']['isSaved'] = false;
					pagedef['data']['innerPagesCount'] =  pagedef['data']['innerPagesCount'] + 1;
					pagedef['pageCreated'] = true;
					break;
				case 'ScrollView':
					page['pagedef'] = pagedef;
					uichildren.push($.uiScrollViewForSV(pagedef,page));
					pagedef['data']['isSaved'] = false;
					pagedef['data']['innerPagesCount'] =  pagedef['data']['innerPagesCount'] + 1;
					pagedef['pageCreated'] = true;
					break;
				case 'TableView':
					page['pagedef'] = pagedef;
					uichildren.push($.uiTableViewForSV($.createTableViewRows(page)));
					pagedef['data']['isSaved'] = false;
					pagedef['data']['innerPagesCount'] =  pagedef['data']['innerPagesCount'] + 1;
					pagedef['pageCreated'] = true;
					break;
				case 'TableViewList':
					page['pagedef'] = pagedef;
					uichildren.push($.uiTableViewListForSV($.createTableViewListPageRows(page)));
					pagedef['data']['isSaved'] = false;
					pagedef['data']['innerPagesCount'] =  pagedef['data']['innerPagesCount'] + 1;
					pagedef['pageCreated'] = true;
					break;
				case 'DBTableView':
					$.fetchLocalDBRecords(page);
					page['pagedef'] = pagedef;
					var myVar=setInterval(function() {
						if((page['data']['isRecordSaved'] != undefined) && (page['data']['isRecordSaved'])){
							clearInterval(myVar);
							page['data']['isRecordSaved'] = false;
							page['data']['contents'][0]= page['data']['contents'][0][0];
							uichildren.push($.uiDBTableViewForSV($.createLocalTableViewRows(page)));
							pagedef['data']['isSaved'] = true;
							pagedef['data']['innerPagesCount'] =  pagedef['data']['innerPagesCount'] + 1;
						}
					},300);
					break;
				case 'DBTableViewList':
					var localDBPage = $.utility('clone',page);
					$.fetchLocalDBRecords(localDBPage);
					localDBPage['pagedef'] = pagedef;
					var myVar=setInterval(function() {
						if((localDBPage['data']['isSaved'] != undefined) && (localDBPage['data']['isSaved'])){
							clearInterval(myVar);
							uichildren.push($.uiDBTableViewListForSV($.createDBListViewPageRows(localDBPage)));
							pagedef['data']['isSaved'] = true;
							pagedef['data']['innerPagesCount'] =  pagedef['data']['innerPagesCount'] + 1;
						}
					},300);
					break;
				case 'RemoteTableView':
					$.fetchRemoteDBRecords(page, pagedef['name'], "createRemoteViewPageRows");
					var TestVar=setInterval(function() {
						if(!$.isEmptyObject(page)){
							clearInterval(TestVar);
							//page['data']['contents'] = remoteViewPage[0];
							page['pagedef'] = pagedef;
							uichildren.push($.uiRemoteTableViewForSV($.createRemoteTableViewRows(page)));
							pagedef['data']['isSaved'] = true;
							pagedef['data']['innerPagesCount'] =  pagedef['data']['innerPagesCount'] + 1;
						}
					},300);
					break;
				case 'RemoteTableViewList':
					var remoteDBPage = $.utility('clone',page);
					var pageName = remoteDBPage['name'];
					$.fetchRemoteDBRecords(remoteDBPage, pagedef['name'], "createDBListViewPageRows");
					if(!$.utility("isReverseTransition")){
						var TestVar=setInterval(function() {
							if(remoteDBListViewPage[pageName] || TestVar == 1200){
								clearInterval(TestVar);
								//console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@ !Reverse @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
								remoteDBPage['pagedef'] = pagedef;
								uichildren.push($.uiRemoteDBTableViewListForSV($.createRemoteDBListViewPageRows(remoteDBPage)));
								pagedef['data']['isSaved'] = true;
								pagedef['data']['innerPagesCount'] =  pagedef['data']['innerPagesCount'] + 1;
							}
						},300);
					}else{
						//console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
						remoteDBPage['pagedef'] = pagedef;
						uichildren.push($.uiRemoteDBTableViewListForSV($.createRemoteDBListViewPageRows(remoteDBPage)));
						pagedef['data']['isSaved'] = true;
						pagedef['data']['innerPagesCount'] =  pagedef['data']['innerPagesCount'] + 1;
					}
					break;	
				default : 
					pagedef['data']['isSaved'] = true;
			};
		});
		
		
		uichildren.getHTML = function(){
			if($.mobileweb['state'] !== 'preview')
				$.splitviewChildScaleRatio(pagedef);
			
			var childhtml = [];
			$.each(this,function(i,child){
				childhtml.push(this.getHTML());
			});
			return childhtml.join('');
		};
		
		uichildren.applyOverrides = function(){
			//console.log("*************", $.utility("isReverseTransition"))
			$.each(this,function(i,child){
				child.applyOverrides();
			});
		};
		
		uichildren.applyEvents = function(){
			$.each(this,function(i,child){
				child.applyEvents();
			});
		};
		
		return uichildren;
	
	};
	
	//ui's for split view pages
	
	$.uiBaseViewForSV = function(parentpagefdef, innerPagedef){
		var innerPageBaseView = new BaseView(innerPagedef);
		var toolBarTop = new ToolBarTop(innerPagedef);
		var toolBarBottom  = new ToolBarBottom(innerPagedef);
		
		//console.log(innerPagedef['name'], "*************", innerPagedef['isgrandChild']);
		
		var data = {};
		if(parentpagefdef['data']['contents'] != undefined){
			$.extend(data, parentpagefdef['data']['contents'][0]);
			$.extend(data, innerPagedef['data']['contents'][0] )
				
		}
		//this function is needed for all of the UI objects
		innerPageBaseView.getHTML = function(){
			innerPagedef['childrenUI'] = new $.uichildren(innerPagedef, innerPagedef['children'], data);
			if(!$.isEmptyObject(data))
				innerPagedef['childrenUI'] = new $.uichildren(innerPagedef, innerPagedef['children'], data);
			else
				innerPagedef['childrenUI'] = new $.uichildren(innerPagedef, innerPagedef['children'], innerPagedef['data']['contents'][0]);
			
			var pageHeight = innerPagedef['sectionheight'] - parseFloat(toolBarTop.getHeight())  - parseFloat(toolBarBottom.getHeight());			
//			if(!parentpagefdef['toolbartop']['hidden']){
//				pageHeight = pageHeight - parseFloat(parentpagefdef['toolbartop']['frame']['height']);
//			}
//			if(!parentpagefdef['toolbarbottom']['hidden']){
//				pageHeight = pageHeight - parseFloat(parentpagefdef['toolbarbottom']['frame']['height']);
//			}
			
			return ['<div id="'+innerPagedef['name']+'_div">',toolBarTop.getHTML(),'<section  id="'+ innerPagedef['name'] +'_section" style="height:',pageHeight * $.mobileweb.device['aspectHratio'],'px;width:',innerPagedef['sectionwidth']* $.mobileweb.device['aspectWratio'],'px;top:',(parseFloat(toolBarTop.getHeight()) + parseFloat(innerPagedef['sectionY'])) * $.mobileweb.device['aspectHratio'],'px;left:',innerPagedef['sectionX']* $.mobileweb.device['aspectWratio'],'px;">',innerPagedef['childrenUI'].getHTML(),'</section>',toolBarBottom.getHTML(),'</div>'].join('');
		};
		
		
		//this function is needed for all of the UI objects
		innerPageBaseView.applyOverrides = function(){
			toolBarTop.applyOverrides();
			$('#'+innerPagedef['name']+"_section").css({background: ($.attributes('color',innerPagedef['backgroundColor'])).getColorCode()});
			$('#'+innerPagedef['name']+"_section").css({'position': 'absolute'});
			if(innerPagedef['childrenUI'] != undefined)
				innerPagedef['childrenUI'].applyOverrides();
			toolBarBottom.applyOverrides();

			if(innerPagedef['parent'].lastIndexOf(parentpagefdef['name']) != -1 && innerPagedef['parent'].split(parentpagefdef['name'])[1] == ""){
				//console.log(parentpagefdef['name'],'===============>>', innerPagedef['parent']);
			}
			else{
				innerPagedef['transitType'] = "transitInView";
				$('#'+innerPagedef['name']+'_div').css('display', 'none');
			}
			
		};
		
		//this function is needed for all of the UI objects
		innerPageBaseView.applyEvents = function(){
			toolBarTop.applyEvents();
			if(innerPagedef['childrenUI'] != undefined)
				innerPagedef['childrenUI'].applyEvents();
			toolBarBottom.applyEvents();
			
			var afterViewPageTimer = setInterval(function(){
				if(!$.utility('getActionRunningStatus')){
					clearInterval(afterViewPageTimer);
					var currpage =  $.utility('getObject',$.mobileweb['pages'],'name',innerPagedef['name']);
					if(currpage['events'] != undefined && currpage['events']['AfterViewPage']!= undefined && currpage['events']['AfterViewPage'].length > 0){
						$.utility('setActionRunningStatus', true);
						new $.actions(currpage, null, currpage['events']['AfterViewPage'].slice()).execute(); 
					}
				}
			}, 500);
			
		};
		
		//this function is needed for all of the UI objects
		innerPageBaseView.getValue = function(){
			
		};
		innerPageBaseView.setValue = function(param){};
		
		innerPageBaseView['children'] =  innerPagedef['childrenUI'];
		if($('#'+innerPagedef['name']+'_div').length > 0){
			if(innerPagedef['isgrandChild'] != undefined && innerPagedef['isgrandChild'])
				$('#'+innerPagedef['name']+'_div').css('display', 'none');
		}
		
		return innerPageBaseView;
	};
	
	$.uiScrollViewForSV = function(parentpagefdef, innerPagedef){
		var innerPageScrollView = new BaseView(innerPagedef);
		var toolBarTop = new ToolBarTop(innerPagedef);
		var toolBarBottom  = new ToolBarBottom(innerPagedef);
		var data = {};
		//this function is needed for all of the UI objects
		if(parentpagefdef['data']['contents'] != undefined){
			$.extend(data, parentpagefdef['data']['contents'][0]);
			$.extend(data, innerPagedef['data']['contents'][0] )
		}
		
		innerPageScrollView.getHTML = function(){
			if(!$.isEmptyObject(data))
				innerPagedef['childrenUI'] = new $.uichildren(innerPagedef, innerPagedef['children'], data);
			else
				innerPagedef['childrenUI'] = new $.uichildren(innerPagedef, innerPagedef['children'], innerPagedef['data']['contents'][0]);
			
			var pageHeight = innerPagedef['sectionheight'] - parseFloat(toolBarTop.getHeight())  - parseFloat(toolBarBottom.getHeight());

			return ['<div id="'+innerPagedef['name']+'_div">',toolBarTop.getHTML(),'<section  id="'+ innerPagedef['name'] +'_section"  class="scrollSection" style="height:',pageHeight * $.mobileweb.device['aspectHratio'],'px;width:',innerPagedef['sectionwidth']* $.mobileweb.device['aspectWratio'],'px;top:',(parseFloat(toolBarTop.getHeight()) + parseFloat(innerPagedef['sectionY'])) * $.mobileweb.device['aspectHratio'],'px;left:',innerPagedef['sectionX']* $.mobileweb.device['aspectWratio'],'px;">','<div id="'+ innerPagedef['name'] +'" style="height:',innerPagedef['height'] * $.mobileweb.device['aspectHratio'],'px;width:',innerPagedef['width']* $.mobileweb.device['aspectWratio'],'px;top:',( parseFloat(innerPagedef['y'])) * $.mobileweb.device['aspectHratio'],'px;left:',innerPagedef['x']* $.mobileweb.device['aspectWratio'],'px;">',innerPagedef['childrenUI'].getHTML(),'</div>','</section>',toolBarBottom.getHTML(),'</div>'].join('');
		};
		
		
		//this function is needed for all of the UI objects
		innerPageScrollView.applyOverrides = function(){
			toolBarTop.applyOverrides();
			$('#'+innerPagedef['name'] + "_section").css({'position': 'absolute', 'overflow' : 'hidden'});
			$('#'+innerPagedef['name']).css({background: ($.attributes('color',innerPagedef['backgroundColor'])).getColorCode()});
			$('#'+innerPagedef['name']).css({'position': 'absolute', 'overflow' : 'hidden'});
			if(innerPagedef['childrenUI'] != undefined)
				innerPagedef['childrenUI'].applyOverrides();
			toolBarBottom.applyOverrides();
			
			if(innerPagedef['parent'].lastIndexOf(parentpagefdef['name']) != -1 && innerPagedef['parent'].split(parentpagefdef['name'])[1] == ""){
				//console.log(parentpagefdef['name'],'===============>>', innerPagedef['parent']);
			}
			else{
				innerPagedef['transitType'] = "transitInView";
				$('#'+innerPagedef['name']+'_div').css('display', 'none');
			}
			
		};
		
		//this function is needed for all of the UI objects
		innerPageScrollView.applyEvents = function(){
			toolBarTop.applyEvents();
			if(innerPagedef['childrenUI'] != undefined)
				innerPagedef['childrenUI'].applyEvents();
			toolBarBottom.applyEvents();
			
			var afterViewPageTimer = setInterval(function(){
				if(!$.utility('getActionRunningStatus')){
					clearInterval(afterViewPageTimer);
					var currpage =  $.utility('getObject',$.mobileweb['pages'],'name',innerPagedef['name']);
					if(currpage['events'] != undefined && currpage['events']['AfterViewPage']!= undefined && currpage['events']['AfterViewPage'].length > 0){
						$.utility('setActionRunningStatus', true);
						new $.actions(currpage, null, currpage['events']['AfterViewPage'].slice()).execute(); 
					}
				}
			}, 500);
			
			innerPageScrollView.applyScrollEvents(innerPagedef['name']+'_div');
		};
		
		innerPageScrollView.applyScrollEvents = function(pageID){
			var myScroll;
			$('#'+pageID).on( "vmouseover", $('#'+pageID), function() {
				if(myScroll === undefined){
					var scrollerid = $('#'+pageID+' .scrollSection').get(0);
					myScroll = new iScroll(scrollerid, {
						bounceLock: true,
						onBeforeScrollStart: function (e) {
							var target = e.target;
							while (target.nodeType != 1) target = target.parentNode;
								if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
									e.preventDefault();
							} 
						});
					}
				});
		};
		
		//this function is needed for all of the UI objects
		innerPageScrollView.getValue = function(){
			
		};
		innerPageScrollView.setValue = function(param){};
		
		innerPageScrollView['children'] =  innerPagedef['childrenUI'];
		if($('#'+innerPagedef['name']+'_div').length > 0){
			if(innerPagedef['isgrandChild'] != undefined && innerPagedef['isgrandChild'])
				$('#'+innerPagedef['name']+'_div').css('display', 'none');
		}
		
		return innerPageScrollView;
	};
	
	$.uiDBTableViewListForSV = function(innerPagedef,callback){
		innerPagedef['width'] = innerPagedef['sectionwidth'];
		var parentpagefdef = innerPagedef['pagedef'];
		var innerPageDBTableViewList = new BaseView(innerPagedef);
		var toolBarTop = new ToolBarTop(innerPagedef);
		var toolBarBottom  = new ToolBarBottom(innerPagedef);
		innerPagedef['childrenUI'] = new $.uichildren(innerPagedef, innerPagedef['children'], innerPagedef['data']['contents'][0]);
		
		//this function is needed for all of the UI objects
		innerPageDBTableViewList.getHTML = function(){
			var pageHeight = innerPagedef['sectionheight'] - parseFloat(toolBarTop.getHeight())  - parseFloat(toolBarBottom.getHeight());
			
			return ['<div id= "'+innerPagedef['name']+'_div">',toolBarTop.getHTML(),'<section class="scrollSectionDB" id="'+ innerPagedef['name'] +'_section" style="height:',pageHeight* $.mobileweb.device['aspectHratio'],'px;width:',innerPagedef['sectionwidth']* $.mobileweb.device['aspectWratio'],'px;top:',(parseFloat(innerPagedef['sectionY'])+parseFloat(toolBarTop.getHeight()))*$.mobileweb.device['aspectHratio'],'px;left:',innerPagedef['sectionX']* $.mobileweb.device['aspectWratio'],'px;">',innerPagedef['childrenUI'].getHTML(),'</section>',toolBarBottom.getHTML(),'</div>'].join('');
		};
		
		
		//this function is needed for all of the UI objects
		innerPageDBTableViewList.applyOverrides = function(){
			toolBarTop.applyOverrides();
			$('#'+innerPagedef['name']+"_section").css({'position': 'absolute', 'overflow-scrolling': 'touch' ,'overflow-Y' : 'hidden', 'overflow-X' : 'hidden'});
			if(innerPagedef['childrenUI'] != undefined)
				innerPagedef['childrenUI'].applyOverrides();
			toolBarBottom.applyOverrides();
			innerPagedef['lockReleased'] = true;

			if(innerPagedef['parent'].lastIndexOf(parentpagefdef['name']) != -1 && innerPagedef['parent'].split(parentpagefdef['name'])[1] == ""){
				//console.log(parentpagefdef['name'],'===============>>', innerPagedef['parent']);
			}
			else{
				innerPagedef['transitType'] = "transitInView";
				$('#'+innerPagedef['name']+'_div').css('display', 'none');
			}
		};
		
		//this function is needed for all of the UI objects
		innerPageDBTableViewList.applyEvents = function(){
			toolBarTop.applyEvents();
			if(innerPagedef['childrenUI'] != undefined)
				innerPagedef['childrenUI'].applyEvents();
			toolBarBottom.applyEvents();
			
			var afterViewPageTimer = setInterval(function(){
				innerPageDBTableViewList.applyScrollEvents(innerPagedef['name']+'_div');	// since row applyOverrides take time, so we have to wait. 	Date : 18-Jan-2019 
				if(!$.utility('getActionRunningStatus')){
					clearInterval(afterViewPageTimer);
					var currpage =  $.utility('getObject',$.mobileweb['pages'],'name',innerPagedef['name']);
					if(currpage['events'] != undefined && currpage['events']['AfterViewPage']!= undefined && currpage['events']['AfterViewPage'].length > 0){
						$.utility('setActionRunningStatus', true);
						new $.actions(currpage, null, currpage['events']['AfterViewPage'].slice()).execute(); 
					}
				}
			}, 1000);
		};
		
		innerPageDBTableViewList.applyScrollEvents = function(pageID){
			var myScroll;
			$('#'+pageID).on( "vmouseover", $('#'+pageID), function() {
				if(myScroll === undefined){
					var scrollSection = $('#'+pageID+' .scrollSectionDB').get(0);
					if(scrollSection != undefined){
						var sectionChildren = $('#'+pageID+' .scrollSectionDB').children();
						if(sectionChildren != undefined && sectionChildren.length == 1){
							myScroll = new iScroll(scrollSection, {
								bounceLock: true,
								onBeforeScrollStart: function (e) {
									var target = e.target;
									while (target.nodeType != 1) 
										target = target.parentNode;
									if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
										e.preventDefault();
								} 
							});
						}
					}
					
//					var scrollerid = $('#'+pageID+' .scrollSectionDB').get(0);
//					myScroll = new iScroll(scrollerid, {
//						bounceLock: true,
//						onBeforeScrollStart: function (e) {
//							var target = e.target;
//							while (target.nodeType != 1) target = target.parentNode;
//								if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
//									e.preventDefault();
//							} 
//						});
				}
			});
		};
		
		//this function is needed for all of the UI objects
		innerPageDBTableViewList.getValue = function(){
			
		};
		innerPageDBTableViewList.setValue = function(param){};
		
		innerPageDBTableViewList['children'] =  innerPagedef['childrenUI'];
		if($('#'+innerPagedef['name']+'_div').length > 0){
			if(innerPagedef['isgrandChild'] != undefined && innerPagedef['isgrandChild'])
				$('#'+innerPagedef['name']+'_div').css('display', 'none');
		}
		
		if(callback != undefined)
			callback(innerPageDBTableViewList);
		return innerPageDBTableViewList;
	};
	
	$.uiRemoteDBTableViewListForSV = function(innerPagedef,callback){
		innerPagedef['width'] = innerPagedef['sectionwidth'];
		var parentpagefdef = innerPagedef['pagedef'];
		var innerPageRemoteDBTableViewList = new BaseView(innerPagedef);
		var toolBarTop = new ToolBarTop(innerPagedef);
		var toolBarBottom  = new ToolBarBottom(innerPagedef);
		innerPagedef['childrenUI'] = new $.uichildren(innerPagedef, innerPagedef['children'], innerPagedef['data']['contents'][0]);
		//this function is needed for all of the UI objects
		innerPageRemoteDBTableViewList.getHTML = function(){
			var pageHeight = innerPagedef['sectionheight'] - parseFloat(toolBarTop.getHeight())  - parseFloat(toolBarBottom.getHeight());			
			
			return ['<div id= "'+innerPagedef['name']+'_div">',toolBarTop.getHTML(),'<section class="scrollSectionDB" id="'+ innerPagedef['name'] +'_section" style="height:',pageHeight* $.mobileweb.device['aspectHratio'],'px;width:',innerPagedef['sectionwidth']* $.mobileweb.device['aspectWratio'],'px;top:',((parseFloat(innerPagedef['sectionY'])+parseFloat(toolBarTop.getHeight()))* $.mobileweb.device['aspectHratio']),'px;left:',innerPagedef['sectionX']* $.mobileweb.device['aspectWratio'],'px;">',innerPagedef['childrenUI'].getHTML(),'</section>',toolBarBottom.getHTML(),'</div>'].join('');
		};
		
		//this function is needed for all of the UI objects
		innerPageRemoteDBTableViewList.applyOverrides = function(){
			toolBarTop.applyOverrides();
			$('#'+innerPagedef['name']+"_section").css({'position': 'absolute', 'overflow-scrolling': 'touch' ,'overflow-Y' : 'hidden', 'overflow-X' : 'hidden'});
			if(innerPagedef['childrenUI'] != undefined)
				innerPagedef['childrenUI'].applyOverrides();
			toolBarBottom.applyOverrides();

			if(innerPagedef['parent'].lastIndexOf(parentpagefdef['name']) != -1 && innerPagedef['parent'].split(parentpagefdef['name'])[1] == ""){
				//console.log(parentpagefdef['name'],'===============>>', innerPagedef['parent']);
			}
			else{
				innerPagedef['transitType'] = "transitInView";
				$('#'+innerPagedef['name']+'_div').css('display', 'none');
			}
		};
		
		//this function is needed for all of the UI objects
		innerPageRemoteDBTableViewList.applyEvents = function(){
			toolBarTop.applyEvents();
			if(innerPagedef['childrenUI'] != undefined)
				innerPagedef['childrenUI'].applyEvents();
			toolBarBottom.applyEvents();
			
			var afterViewPageTimer = setInterval(function(){
				if(!$.utility('getActionRunningStatus')){
					clearInterval(afterViewPageTimer);
					var currpage =  $.utility('getObject',$.mobileweb['pages'],'name',innerPagedef['name']);
					if(currpage['events'] != undefined && currpage['events']['AfterViewPage']!= undefined && currpage['events']['AfterViewPage'].length > 0){
						$.utility('setActionRunningStatus', true);
						new $.actions(currpage, null, currpage['events']['AfterViewPage'].slice()).execute(); 
					}
				}
			}, 1000);
			
			innerPageRemoteDBTableViewList.applyScrollEvents(innerPagedef['name']+'_div');
		};
		
		innerPageRemoteDBTableViewList.applyScrollEvents = function(pageID){
			var myScroll;
			$('#'+pageID).on( "vmouseover", $('#'+pageID), function() {
				if(myScroll === undefined){
					var scrollerid = $('#'+pageID+' .scrollSectionDB').get(0);
					myScroll = new iScroll(scrollerid, {
						bounceLock: true,
						onBeforeScrollStart: function (e) {
							var target = e.target;
							while (target.nodeType != 1) target = target.parentNode;
								if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
									e.preventDefault();
							} 
						});
					}
				});
		};
		
		//this function is needed for all of the UI objects
		innerPageRemoteDBTableViewList.getValue = function(){
			
		};
		innerPageRemoteDBTableViewList.setValue = function(param){};
		
		innerPageRemoteDBTableViewList['children'] =  innerPagedef['childrenUI'];
		if($('#'+innerPagedef['name']+'_div').length > 0){
			if(innerPagedef['isgrandChild'] != undefined && innerPagedef['isgrandChild'])
				$('#'+innerPagedef['name']+'_div').css('display', 'none');
		}
		
		if(callback != undefined)
			callback(innerPageRemoteDBTableViewList);
		return innerPageRemoteDBTableViewList;
	};
	
	$.uiTableViewListForSV = function(innerPagedef,callback){
		innerPagedef['width'] = innerPagedef['sectionwidth'];
		var parentpagefdef = innerPagedef['pagedef'];
		var innerPageDBTableViewList = new BaseView(innerPagedef);
		var toolBarTop = new ToolBarTop(innerPagedef);
		var toolBarBottom  = new ToolBarBottom(innerPagedef);
		innerPagedef['childrenUI'] = new $.uichildren(innerPagedef, innerPagedef['children'], innerPagedef['data']['contents'][0]);
		//this function is needed for all of the UI objects
		innerPageDBTableViewList.getHTML = function(){
			var pageHeight = innerPagedef['sectionheight'] - parseFloat(toolBarTop.getHeight())  - parseFloat(toolBarBottom.getHeight());			
			
			return ['<div id= "'+innerPagedef['name']+'_div">',toolBarTop.getHTML(),'<section class="scrollSectionDB" id="'+ innerPagedef['name'] +'_section" style="height:',pageHeight* $.mobileweb.device['aspectHratio'],'px;width:',innerPagedef['sectionwidth']* $.mobileweb.device['aspectWratio'],'px;top:',(parseFloat(innerPagedef['sectionY'])+ parseFloat(toolBarTop.getHeight()) )* $.mobileweb.device['aspectHratio'],'px;left:',innerPagedef['sectionX']* $.mobileweb.device['aspectWratio'],'px;">',innerPagedef['childrenUI'].getHTML(),'</section>',toolBarBottom.getHTML(),'</div>'].join('');
		};
		
		
		//this function is needed for all of the UI objects
		innerPageDBTableViewList.applyOverrides = function(){
			toolBarTop.applyOverrides();
			$('#'+innerPagedef['name']+"_section").css({'position': 'absolute', 'overflow-scrolling': 'touch' ,'overflow-Y' : 'hidden', 'overflow-X' : 'hidden'});
			if(innerPagedef['childrenUI'] != undefined)
				innerPagedef['childrenUI'].applyOverrides();
			toolBarBottom.applyOverrides();

			if(innerPagedef['parent'].lastIndexOf(parentpagefdef['name']) != -1 && innerPagedef['parent'].split(parentpagefdef['name'])[1] == ""){
				//console.log(parentpagefdef['name'],'===============>>', innerPagedef['parent']);
			}
			else{
				innerPagedef['transitType'] = "transitInView";
				$('#'+innerPagedef['name']+'_div').css('display', 'none');
			}
			
		};
		
		//this function is needed for all of the UI objects
		innerPageDBTableViewList.applyEvents = function(){
			toolBarTop.applyEvents();
			if(innerPagedef['childrenUI'] != undefined)
				innerPagedef['childrenUI'].applyEvents();
			toolBarBottom.applyEvents();
			
			var afterViewPageTimer = setInterval(function(){
				if(!$.utility('getActionRunningStatus')){
					clearInterval(afterViewPageTimer);
					var currpage =  $.utility('getObject',$.mobileweb['pages'],'name',innerPagedef['name']);
					if(currpage['events'] != undefined && currpage['events']['AfterViewPage']!= undefined && currpage['events']['AfterViewPage'].length > 0){
						$.utility('setActionRunningStatus', true);
						new $.actions(currpage, null, currpage['events']['AfterViewPage'].slice()).execute(); 
					}
				}
			}, 1000);
			
			innerPageDBTableViewList.applyScrollEvents(innerPagedef['name']+'_div');
		};
		
		innerPageDBTableViewList.applyScrollEvents = function(pageID){
			var myScroll;
			$('#'+pageID).on( "vmouseover", $('#'+pageID), function() {
				if(myScroll === undefined){
					var scrollerid = $('#'+pageID+' .scrollSectionDB').get(0);
					myScroll = new iScroll(scrollerid, {
						bounceLock: true,
						onBeforeScrollStart: function (e) {
							var target = e.target;
							while (target.nodeType != 1) target = target.parentNode;
								if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
									e.preventDefault();
							} 
						});
					}
				});
		};
		
		//this function is needed for all of the UI objects
		innerPageDBTableViewList.getValue = function(){
			
		};
		innerPageDBTableViewList.setValue = function(param){};
		
		innerPageDBTableViewList['children'] =  innerPagedef['childrenUI'];
		if($('#'+innerPagedef['name']+'_div').length > 0){
			if(innerPagedef['isgrandChild'] != undefined && innerPagedef['isgrandChild'])
				$('#'+innerPagedef['name']+'_div').css('display', 'none');
		}
		
		if(callback != undefined)
			callback(innerPageDBTableViewList);
		return innerPageDBTableViewList;
	};
	
	$.uiRemoteTableViewForSV = function(innerPagedef,callback){
		innerPagedef['width'] = innerPagedef['sectionwidth'];
		var parentpagefdef = innerPagedef['pagedef'];
		var innerPageRemoteTableView = new BaseView(innerPagedef);
		var toolBarTop = new ToolBarTop(innerPagedef);
		var toolBarBottom  = new ToolBarBottom(innerPagedef);
		innerPagedef['childrenUI'] = new $.uichildren(innerPagedef, innerPagedef['children'], innerPagedef['data']['contents'][0]);
		//this function is needed for all of the UI objects
		innerPageRemoteTableView.getHTML = function(){
			var pageHeight = innerPagedef['sectionheight'] - parseFloat(toolBarTop.getHeight())  - parseFloat(toolBarBottom.getHeight());			
			
			return ['<div id= "'+innerPagedef['name']+'_div">',toolBarTop.getHTML(),'<section class="scrollSectionDB" id="'+ innerPagedef['name'] +'_section" style="height:',pageHeight* $.mobileweb.device['aspectHratio'],'px;width:',innerPagedef['sectionwidth']* $.mobileweb.device['aspectWratio'],'px;top:',(parseFloat(innerPagedef['sectionY'])+ parseFloat(toolBarTop.getHeight()) )* $.mobileweb.device['aspectHratio'],'px;left:',innerPagedef['sectionX']* $.mobileweb.device['aspectWratio'],'px;">',innerPagedef['childrenUI'].getHTML(),'</section>',toolBarBottom.getHTML(),'</div>'].join('');
		};
		
		
		//this function is needed for all of the UI objects
		innerPageRemoteTableView.applyOverrides = function(){
			toolBarTop.applyOverrides();
			$('#'+innerPagedef['name']+"_section").css({'position': 'absolute', 'overflow-scrolling': 'touch' ,'overflow-Y' : 'hidden', 'overflow-X' : 'hidden'});
			if(innerPagedef['childrenUI'] != undefined)
				innerPagedef['childrenUI'].applyOverrides();
			toolBarBottom.applyOverrides();

			if(innerPagedef['parent'].lastIndexOf(parentpagefdef['name']) != -1 && innerPagedef['parent'].split(parentpagefdef['name'])[1] == ""){
				//console.log(parentpagefdef['name'],'===============>>', innerPagedef['parent']);
			}
			else{
				innerPagedef['transitType'] = "transitInView";
				$('#'+innerPagedef['name']+'_div').css('display', 'none');
			}
			
		};
		
		//this function is needed for all of the UI objects
		innerPageRemoteTableView.applyEvents = function(){
			toolBarTop.applyEvents();
			if(innerPagedef['childrenUI'] != undefined)
				innerPagedef['childrenUI'].applyEvents();
			toolBarBottom.applyEvents();
			
			var afterViewPageTimer = setInterval(function(){
				if(!$.utility('getActionRunningStatus')){
					clearInterval(afterViewPageTimer);
					var currpage =  $.utility('getObject',$.mobileweb['pages'],'name',innerPagedef['name']);
					if(currpage['events'] != undefined && currpage['events']['AfterViewPage']!= undefined && currpage['events']['AfterViewPage'].length > 0){
						$.utility('setActionRunningStatus', true);
						new $.actions(currpage, null, currpage['events']['AfterViewPage'].slice()).execute(); 
					}
				}
			}, 1000);
			
			innerPageRemoteTableView.applyScrollEvents(innerPagedef['name']+'_div');
		};
		
		innerPageRemoteTableView.applyScrollEvents = function(pageID){
			var myScroll;
			$('#'+pageID).on( "vmouseover", $('#'+pageID), function() {
				if(myScroll === undefined){
					var scrollerid = $('#'+pageID+' .scrollSectionDB').get(0);
					myScroll = new iScroll(scrollerid, {
						bounceLock: true,
						onBeforeScrollStart: function (e) {
							var target = e.target;
							while (target.nodeType != 1) target = target.parentNode;
								if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
									e.preventDefault();
							} 
						});
					}
				});
		};
		
		//this function is needed for all of the UI objects
		innerPageRemoteTableView.getValue = function(){
			
		};
		innerPageRemoteTableView.setValue = function(param){};
		
		innerPageRemoteTableView['children'] =  innerPagedef['childrenUI'];
		if($('#'+innerPagedef['name']+'_div').length > 0){
			if(innerPagedef['isgrandChild'] != undefined && innerPagedef['isgrandChild'])
				$('#'+innerPagedef['name']+'_div').css('display', 'none');
		}
		
		if(callback != undefined)
			callback(innerPageRemoteTableView);
		return innerPageRemoteTableView;
	};
	
	$.uiDBTableViewForSV = function(innerPagedef,callback){
		innerPagedef['width'] = innerPagedef['sectionwidth'];
		var parentpagefdef = innerPagedef['pagedef'];
		var innerPageDBTableView = new BaseView(innerPagedef);
		var toolBarTop = new ToolBarTop(innerPagedef);
		var toolBarBottom  = new ToolBarBottom(innerPagedef);
		innerPagedef['childrenUI'] = new $.uichildren(innerPagedef, innerPagedef['children'], innerPagedef['data']['contents'][0]);
		//this function is needed for all of the UI objects
		innerPageDBTableView.getHTML = function(){
			var pageHeight = innerPagedef['sectionheight'] - parseFloat(toolBarTop.getHeight())  - parseFloat(toolBarBottom.getHeight());
			
			return ['<div id= "'+innerPagedef['name']+'_div">',toolBarTop.getHTML(),'<section class="scrollSectionDB" id="'+ innerPagedef['name'] +'_section" style="height:',pageHeight* $.mobileweb.device['aspectHratio'],'px;width:',innerPagedef['sectionwidth']* $.mobileweb.device['aspectWratio'],'px;top:',(parseFloat(innerPagedef['sectionY'])+ parseFloat(toolBarTop.getHeight()) )* $.mobileweb.device['aspectHratio'],'px;left:',innerPagedef['sectionX']* $.mobileweb.device['aspectWratio'],'px;">',innerPagedef['childrenUI'].getHTML(),'</section>',toolBarBottom.getHTML(),'</div>'].join('');
		};
		
		
		//this function is needed for all of the UI objects
		innerPageDBTableView.applyOverrides = function(){
			toolBarTop.applyOverrides();
			$('#'+innerPagedef['name']+"_section").css({'position': 'absolute', 'overflow-scrolling': 'touch' ,'overflow-Y' : 'hidden', 'overflow-X' : 'hidden'});
			if(innerPagedef['childrenUI'] != undefined)
				innerPagedef['childrenUI'].applyOverrides();
			toolBarBottom.applyOverrides();

			if(innerPagedef['parent'].lastIndexOf(parentpagefdef['name']) != -1 && innerPagedef['parent'].split(parentpagefdef['name'])[1] == ""){
				//console.log(parentpagefdef['name'],'===============>>', innerPagedef['parent']);
			}
			else{
				innerPagedef['transitType'] = "transitInView";
				$('#'+innerPagedef['name']+'_div').css('display', 'none');
			}
			
		};
		
		//this function is needed for all of the UI objects
		innerPageDBTableView.applyEvents = function(){
			toolBarTop.applyEvents();
			if(innerPagedef['childrenUI'] != undefined)
				innerPagedef['childrenUI'].applyEvents();
			toolBarBottom.applyEvents();
			
			var afterViewPageTimer = setInterval(function(){
				if(!$.utility('getActionRunningStatus')){
					clearInterval(afterViewPageTimer);
					var currpage =  $.utility('getObject',$.mobileweb['pages'],'name',innerPagedef['name']);
					if(currpage['events'] != undefined && currpage['events']['AfterViewPage']!= undefined && currpage['events']['AfterViewPage'].length > 0){
						$.utility('setActionRunningStatus', true);
						new $.actions(currpage, null, currpage['events']['AfterViewPage'].slice()).execute(); 
					}
				}
			}, 1000);
			
			innerPageDBTableView.applyScrollEvents(innerPagedef['name']+'_div');
		};
		
		innerPageDBTableView.applyScrollEvents = function(pageID){
			var myScroll;
			$('#'+pageID).on( "vmouseover", $('#'+pageID), function() {
				if(myScroll === undefined){
					var scrollerid = $('#'+pageID+' .scrollSectionDB').get(0);
					myScroll = new iScroll(scrollerid, {
						bounceLock: true,
						onBeforeScrollStart: function (e) {
							var target = e.target;
							while (target.nodeType != 1) target = target.parentNode;
								if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
									e.preventDefault();
							} 
						});
					}
				});
		};
		
		//this function is needed for all of the UI objects
		innerPageDBTableView.getValue = function(){
			
		};
		innerPageDBTableView.setValue = function(param){};
		
		innerPageDBTableView['children'] =  innerPagedef['childrenUI'];
		if($('#'+innerPagedef['name']+'_div').length > 0){
			if(innerPagedef['isgrandChild'] != undefined && innerPagedef['isgrandChild'])
				$('#'+innerPagedef['name']+'_div').css('display', 'none');
		}
		
		if(callback != undefined)
			callback(innerPageDBTableView);
		return innerPageDBTableView;
	};
	
	$.uiTableViewForSV = function(innerPagedef,callback){
		innerPagedef['width'] = innerPagedef['sectionwidth'];
		var parentpagefdef = innerPagedef['pagedef'];
		var innerTableView = new BaseView(innerPagedef);
		var toolBarTop = new ToolBarTop(innerPagedef);
		var toolBarBottom  = new ToolBarBottom(innerPagedef);
		innerPagedef['childrenUI'] = new $.uichildren(innerPagedef, innerPagedef['children'], innerPagedef['data']['contents'][0]);
		//this function is needed for all of the UI objects
		innerTableView.getHTML = function(){
			var pageHeight = innerPagedef['sectionheight'] - parseFloat(toolBarTop.getHeight())  - parseFloat(toolBarBottom.getHeight());
			
			return ['<div id= "'+innerPagedef['name']+'_div">',toolBarTop.getHTML(),'<section class="scrollSectionDB" id="'+ innerPagedef['name'] +'_section" style="height:',pageHeight* $.mobileweb.device['aspectHratio'],'px;width:',innerPagedef['sectionwidth']* $.mobileweb.device['aspectWratio'],'px;top:',(parseFloat(innerPagedef['sectionY'])+ parseFloat(toolBarTop.getHeight()) )* $.mobileweb.device['aspectHratio'],'px;left:',innerPagedef['sectionX']* $.mobileweb.device['aspectWratio'],'px;">',innerPagedef['childrenUI'].getHTML(),'</section>',toolBarBottom.getHTML(),'</div>'].join('');
		};		
		
		//this function is needed for all of the UI objects
		innerTableView.applyOverrides = function(){
			toolBarTop.applyOverrides();
			$('#'+innerPagedef['name']+"_section").css({'position': 'absolute', 'overflow-scrolling': 'touch' ,'overflow-Y' : 'hidden', 'overflow-X' : 'hidden'});
			if(innerPagedef['childrenUI'] != undefined)
				innerPagedef['childrenUI'].applyOverrides();
			toolBarBottom.applyOverrides();

			if(innerPagedef['parent'].lastIndexOf(parentpagefdef['name']) != -1 && innerPagedef['parent'].split(parentpagefdef['name'])[1] == ""){
				//console.log(parentpagefdef['name'],'===============>>', innerPagedef['parent']);
			}
			else{
				innerPagedef['transitType'] = "transitInView";
				$('#'+innerPagedef['name']+'_div').css('display', 'none');
			}
			
		};
		
		//this function is needed for all of the UI objects
		innerTableView.applyEvents = function(){
			toolBarTop.applyEvents();
			if(innerPagedef['childrenUI'] != undefined)
				innerPagedef['childrenUI'].applyEvents();
			toolBarBottom.applyEvents();
			
			var afterViewPageTimer = setInterval(function(){
				if(!$.utility('getActionRunningStatus')){
					clearInterval(afterViewPageTimer);
					var currpage =  $.utility('getObject',$.mobileweb['pages'],'name',innerPagedef['name']);
					if(currpage['events'] != undefined && currpage['events']['AfterViewPage']!= undefined && currpage['events']['AfterViewPage'].length > 0){
						$.utility('setActionRunningStatus', true);
						new $.actions(currpage, null, currpage['events']['AfterViewPage'].slice()).execute(); 
					}
				}
			}, 1000);
			
			innerTableView.applyScrollEvents(innerPagedef['name']+'_div');
		};
		
		innerTableView.applyScrollEvents = function(pageID){
			var myScroll;
			$('#'+pageID).on( "vmouseover", $('#'+pageID), function() {
				if(myScroll === undefined){
					var scrollerid = $('#'+pageID+' .scrollSectionDB').get(0);
					myScroll = new iScroll(scrollerid, {
						bounceLock: true,
						onBeforeScrollStart: function (e) {
							var target = e.target;
							while (target.nodeType != 1) target = target.parentNode;
								if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
									e.preventDefault();
							} 
						});
					}
				});
		};
		
		//this function is needed for all of the UI objects
		innerTableView.getValue = function(){
			
		};
		innerTableView.setValue = function(param){};
		
		innerTableView['children'] =  innerPagedef['childrenUI'];
		if($('#'+innerPagedef['name']+'_div').length > 0){
			if(innerPagedef['isgrandChild'] != undefined && innerPagedef['isgrandChild'])
				$('#'+innerPagedef['name']+'_div').css('display', 'none');
		}
		
		if(callback != undefined)
			callback(innerTableView);
		return innerTableView;
	};
	
	
	$.createDBListViewPageRows = function(page, callback){
		var group = page['children'][0]['group'][0];
		var id= page['children'][0]['id'];
		var rows = [];
		var aspect = $.mobileweb.device['aspectratio'];
		var contents = [];
		if(page['data']['contents'][0] != undefined && page['data']['contents'][0].constructor == Object){
			contents = page['data']['contents'];
		}else{
			contents = page['data']['contents'][0];
		}

		if(contents != undefined){
			$.each(contents,function(i,data){
				var row = {
					rownum: i,
					rowsize:group['template']['rowsize'],
					icon : group['template']['icon'],
					data : {contents: [data]},
					events : group['template']['events'],
					children: []
				};
				
				switch(page['children'][0]['style']){
					case 'default':
						row['children'].push({id:id+"-group-0-main-"+i,name:'',value:'', template:group['template']['maintext'],viewtype:"Label",frame:{x:10,y:13,width:150,height:20},font:{size:16,align:"left",color:{name:"black"}}});
						if(group['template']['image']!==''){
							row['children'][0]['frame']['x'] = 50;
							row['children'].push({id:id+"-group-0-img-"+i,value:'', template:group['template']['image'],name:"",viewtype:"Image",frame:{x:10,y:7,width:30,height:30}});
						}
						break;
					case 'subtitle':
						row['children'].push({id:id+"-group-0-main-"+i,name:'',value:'', template:group['template']['maintext'],viewtype:"Label",frame:{x:10,y:7,width:250,height:20},font:{size:16,align:"left",color:{name:"black"}}},
											 {id:id+"-group-0-sub-"+i,name:'',value:'', template:group['template']['subtext'],viewtype:"Label",frame:{x:10,y:22,width:250,height:20},font:{size:12,align:"left",color:{name:"gray"}}});
						if(group['template']['image']!==''){
							row['children'][0]['frame']['x'] = 50;
							row['children'][1]['frame']['x'] = 50;
							row['children'].push({id:id+"-group-0-img-"+i,value:'',template:group['template']['image'],name:"",viewtype:"Image",frame:{x:10,y:7,width:30,height:30}});
						}
						break;
					case 'rightaligned':
						row['children'].push({id:id+"-group-0-main-"+i,name:'',value:'', template:group['template']['maintext'],viewtype:"Label",frame:{x:10,y:13,width:150,height:20},font:{size:16,align:"left",color:{name:"black"}}},
								 			 {id:id+"-group-0-sub-"+i,name:'',value:'', template:group['template']['subtext'],viewtype:"Label",frame:{x:page['width']-185,y:16,width:150,height:20},font:{size:12,align:"right",color:{name:"SteelBlue"}}});
						break;
					case 'contactform':
						row['children'].push({id:id+"-group-0-main-"+i,name:'',value:'', template:group['template']['maintext'],viewtype:"Label",frame:{x:10,y:17,width:(page['width']-40)*0.4,height:20},font:{size:12,align:"right",color:{name:"SteelBlue"}}},
					 			 			 {id:id+"-group-0-sub-"+i,name:'',value:'', template:group['template']['subtext'],viewtype:"Label",frame:{x:(page['width']-40)*0.4+20,y:17,width:(page['width']-40)*0.6,height:20},font:{size:16,align:"left",color:{name:"black"}}});
						break;
					case 'custom':
						$.each(group['template']['children'] ,function(j,child){
							row['children'].push($.utility('clone',child));
							row['children'][j].id = [child['id'],'-',i,'-',j].join('');
						});
						break;
				}
				rows.push(row);
				
			});
		}
		
		page['children'][0]['group'][0]['row'] = rows;
		
		if(callback != undefined){
			callback(page);
		}
		
		return page;
	};
	
	$.createRemoteDBListViewPageRows = function(page, callback){
		var group = page['children'][0]['group'][0];
		var id= page['children'][0]['id'];
		var rows = [];
		var aspect = $.mobileweb.device['aspectratio'];
		var contents = [];
		if(page['data']['contents'][0] != undefined && page['data']['contents'][0].constructor == Object){
			contents = page['data']['contents'];
		}else{
			contents = page['data']['contents'][0];
		}
		if(contents != undefined && contents.length > 0){
			$.each(contents,function(i,data){
				var row = {
					rownum: i,
					rowsize:group['template']['rowsize'],
					backgroundColor : group['template']['backgroundColor'],
					oddRowBackgroundColor : group['template']['oddRowBackgroundColor'],
					evenRowBackgroundColor : group['template']['evenRowBackgroundColor'],
					oddRowBackgroundImage : group['template']['oddRowBackgroundImage'],
					evenRowBackgroundImage : group['template']['evenRowBackgroundImage'],
					icon : group['template']['icon'],
					data : {contents: [data]},
					events : group['template']['events'],
					children: []
				};
				
				switch(page['children'][0]['style']){
					case 'default':
						row['children'].push({id:id+"-group-0-main-"+i,name:'',value:'', template:group['template']['maintext'],viewtype:"Label",frame:{x:10,y:13,width:150,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:16,align:"left",color:{name:"black"}}});
						if(group['template']['image']!==''){
							row['children'][0]['frame']['x'] = 50;
							row['children'].push({id:id+"-group-0-img-"+i,value:'', template:group['template']['image'],name:"",viewtype:"Image",frame:{x:10,y:7,width:30,height:30}});
						}
						break;
					case 'subtitle':
						row['children'].push({id:id+"-group-0-main-"+i,name:group['template']['maintext'].toString().replace('[','').replace(']','') + '-' + i,value:'', template:group['template']['maintext'],viewtype:"Label",frame:{x:10,y:7,width:250,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:16,align:"left",color:{name:"black"}}},
											 {id:id+"-group-0-sub-"+i,name:group['template']['subtext'].toString().replace('[','').replace(']','') + '-' + i,value:'', template:group['template']['subtext'],viewtype:"Label",frame:{x:10,y:22,width:250,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:12,align:"left",color:{name:"gray"}}});
						if(group['template']['image']!==''){
							row['children'][0]['frame']['x'] = 50;
							row['children'][1]['frame']['x'] = 50;
							row['children'].push({id:id+"-group-0-img-"+i,value:'',template:group['template']['image'],name:"",viewtype:"Image",frame:{x:10,y:7,width:30,height:30}});
						}
						break;
					case 'rightaligned':
						row['children'].push({id:id+"-group-0-main-"+i,name:'',value:'', template:group['template']['maintext'],viewtype:"Label",frame:{x:10,y:13,width:150,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:16,align:"left",color:{name:"black"}}},
								 			 {id:id+"-group-0-sub-"+i,name:'',value:'', template:group['template']['subtext'],viewtype:"Label",frame:{x:page['width']-185,y:16,width:150,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:12,align:"right",color:{name:"SteelBlue"}}});
						break;
					case 'contactform':
						row['children'].push({id:id+"-group-0-main-"+i,name:'',value:'', template:group['template']['maintext'],viewtype:"Label",frame:{x:10,y:17,width:(page['width']-40)*0.4,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:12,align:"right",color:{name:"SteelBlue"}}},
					 			 			 {id:id+"-group-0-sub-"+i,name:'',value:'', template:group['template']['subtext'],viewtype:"Label",frame:{x:(page['width']-40)*0.4+20,y:17,width:(page['width']-40)*0.6,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:16,align:"left",color:{name:"black"}}});
						break;
					case 'custom':
						$.each(group['template']['children'] ,function(j,child){
							row['children'].push($.utility('clone',child));
							row['children'][j].id = [child['id'], '-',i,'-',j].join('');
						});
						break;
				}
				
				rows.push(row);
			});
		}
		
		page['children'][0]['group'][0]['row'] = rows;
		
		if(callback != undefined){
			callback(page);
		}
		
		return page;
	};
	
	$.createTableViewListPageRows = function(page){
		var group = page['children'][0]['group'][0];
		var rows = [];
		var aspect = $.mobileweb.device['aspectratio'];

		//var widthForRightAlign = (document.documentElement.clientWidth > 769) ? pagedef['width'] : document.documentElement.clientWidth;
		$.each(page['children'][0]['group'][0]['template'],function(i,data){
			var row = {
				rownum: i,
				rowsize:group['template'][i]['rowsize'],
				icon : group['template'][i]['icon'],
				data : {contents: [page['data']['contents'][0]]},
				events : group['template'][i]['events'],
				children: []
			};
			
			switch(page['children'][0]['style']){
				case 'default':
					row['children'].push({id:"ui-group-0-main-"+i,name:'',value:'', template:group['template'][i]['maintext'],viewtype:"Label",frame:{x:10,y:13,width:150,height:20},font:{size:16,align:"left",color:{name:"black"}}});
					if(group['template'][i]['image']!==''){
						row['children'][0]['frame']['x'] = 50;
						row['children'].push({id:"ui-group-0-img-"+i,value:'', template:group['template'][i]['image'],name:"",viewtype:"Image",frame:{x:10,y:7,width:30,height:30}});
					}
					break;
				case 'subtitle':
					row['children'].push({id:"ui-group-0-main-"+i,name:group['template'][i]['maintext'].toString().replace('[','').replace(']','') + '-' + i,value:'', template:group['template'][i]['maintext'],viewtype:"Label",frame:{x:10,y:7,width:250,height:20},font:{size:16,align:"left",color:{name:"black"}}},
										 {id:"ui-group-0-sub-"+i,name:group['template'][i]['subtext'].toString().replace('[','').replace(']','') + '-' + i,value:'', template:group['template'][i]['subtext'],viewtype:"Label",frame:{x:10,y:22,width:150,height:20},font:{size:12,align:"left",color:{name:"gray"}}});
					if(group['template'][i]['image']!==''){
						row['children'][0]['frame']['x'] = 50;
						row['children'][1]['frame']['x'] = 50;
						row['children'].push({id:"ui-group-0-img-"+i,value:'',template:group['template'][i]['image'],name:"",viewtype:"Image",frame:{x:10,y:7,width:30,height:30}});
					}
					break;
					
				case 'rightaligned':
					row['children'].push({id:"ui-group-0-main-"+i,name:'',value:'', template:group['template'][i]['maintext'],viewtype:"Label",frame:{x:10,y:13,width:150,height:20},font:{size:16,align:"left",color:{name:"black"}}},
							 {id:"ui-group-0-sub-"+i,name:'',value:'', template:group['template'][i]['subtext'],viewtype:"Label",frame:{x:page['width']-185,y:16,width:150,height:20},font:{size:12,align:"right",color:{name:"SteelBlue"}}});
					break;
				case 'contactform':
					row['children'].push({id:"ui-group-0-main-"+i,name:'',value:'', template:group['template'][i]['maintext'],viewtype:"Label",frame:{x:10,y:17,width:(pagedef['width']-40)*0.4,height:20},font:{size:12,align:"right",color:{name:"SteelBlue"}}},
										 {id:"ui-group-0-sub-"+i,name:'',value:'', template:group['template'][i]['subtext'],viewtype:"Label",frame:{x:(page['width']-40)*0.4+20,y:17,width:(page['width']-40)*0.6,height:20},font:{size:16,align:"left",color:{name:"black"}}});
					break;
				case 'custom':
					$.each(group['template'][i]['children'] ,function(j,child){
						row['children'].push($.utility('clone',child));
						row['children'][j].id = ['ui-group-0-',i,'-',j].join('');
					});
					break;
			}
			rows.push(row);
		});
		
		page['children'][0]['group'][0]['row'] = rows;
		return page;
	};
	
	$.createRemoteTableViewRows = function(page, callback){
		$.each(page['children'][0]['group'],function(j,group){
			var rows = [];
			$.each(group['row'],function(k,row){
				row['data']['contents'] = page['data']['contents'];
				//TODO: generating children for TableView and TableViewList is almost the same... make a function
				//to make this almost the same... make sure the ID and template is different
				if(page['children'][0]['style']!=='custom')
					row['children'] = [];
				switch(page['children'][0]['style']){
					case 'default':
						row['children'].push({id:"ui-defgroup-"+j+"-main-"+k,name:'',value:'', template:row['template']['maintext'],viewtype:"Label",frame:{x:10,y:13,width:150,height:20},font:{size:16,align:"left",color:{name:"black"}}});
						if(row['template']['image']!==''){
							row['children'][0]['frame']['x'] = 50;
							row['children'].push({id:"ui-defgroup-"+j+"-img-"+k,value:'', template:row['template']['image'],name:"",viewtype:"Image",frame:{x:10,y:7,width:30,height:30}});
						}
						break;
					case 'subtitle':
						row['children'].push({id:"ui-defgroup-"+j+"-main-"+k,name:row['template']['maintext'].toString().replace('[','').replace(']','') + '-' + k,value:'', template:row['template']['maintext'],viewtype:"Label",frame:{x:10,y:7,width:150,height:20},font:{size:16,align:"left",color:{name:"black"}}},
											 {id:"ui-defgroup-"+j+"-sub-"+k,name:row['template']['subtext'].toString().replace('[','').replace(']','') + '-' + k,value:'', template:row['template']['subtext'],viewtype:"Label",frame:{x:10,y:22,width:150,height:20},font:{size:12,align:"left",color:{name:"gray"}}});
						if(row['template']['image']!==''){
							row['children'][0]['frame']['x'] = 50;
							row['children'][1]['frame']['x'] = 50;
							row['children'].push({id:"ui-defgroup-"+j+"-img-"+k,value:'',template:row['template']['image'],name:"",viewtype:"Image",frame:{x:10,y:7,width:30,height:30}});
						}
						break;
					case 'rightaligned':
						row['children'].push({id:"ui-defgroup-"+j+"-main-"+k,name:'',value:'', template:row['template']['maintext'],viewtype:"Label",frame:{x:10,y:13,width:150,height:20},font:{size:16,align:"left",color:{name:"black"}}});
								 			 //{id:"ui-defgroup-"+j+"-sub-"+k,name:'',value:'', template:row['template']['subtext'],viewtype:"Label",frame:{x:pagedef['width']-185,y:16,width:150,height:20},font:{size:12,align:"right",color:{name:"SteelBlue"}}});
						if(page['children'][0]['tablestyle'] === 'Grouped'){
							row['children'].push({id:"ui-defgroup-"+j+"-sub-"+k,name:'',value:'', template:row['template']['subtext'],viewtype:"Label",frame:{x:page['width']-210,y:16,width:150,height:20},font:{size:12,align:"right",color:{name:"SteelBlue"}}});
						}else{
							row['children'].push({id:"ui-defgroup-"+j+"-sub-"+k,name:'',value:'', template:row['template']['subtext'],viewtype:"Label",frame:{x:page['width']-185,y:16,width:150,height:20},font:{size:12,align:"right",color:{name:"SteelBlue"}}});
						}
						break;
					case 'contactform':
						row['children'].push({id:"ui-defgroup-"+j+"-main-"+k,name:'',value:'', template:row['template']['maintext'],viewtype:"Label",frame:{x:10,y:17,width:(page['width']-40)*0.4,height:20},font:{size:12,align:"right",color:{name:"SteelBlue"}}},
					 			 			 {id:"ui-defgroup-"+j+"-sub-"+k,name:'',value:'', template:row['template']['subtext'],viewtype:"Label",frame:{x:(page['width']-40)*0.4+20,y:17,width:(page['width']-40)*0.6,height:20},font:{size:16,align:"left",color:{name:"black"}}});
						break;
				}
				rows.push(row);
			});
			
			page['children'][0]['group'][0]['row'] = rows;
		});
		
		if(callback != undefined){
			callback(page);
		}
		return page;
	};
	
	$.createLocalTableViewRows = function(page, callback){
		$.each(page['children'][0]['group'],function(j,group){
			var rows = [];
			$.each(group['row'],function(k,row){
				row['data']['contents'] = page['data']['contents'];
				//TODO: generating children for TableView and TableViewList is almost the same... make a function
				//to make this almost the same... make sure the ID and template is different is different
				if(page['children'][0]['style']!=='custom')
					row['children'] = [];
				switch(page['children'][0]['style']){
					case 'default':
						row['children'].push({id:"ui-defgroup-"+j+"-main-"+k,name:'',value:'', template:row['template']['maintext'],viewtype:"Label",frame:{x:10,y:13,width:150,height:20},font:{size:16,align:"left",color:{name:"black"}}});
						if(row['template']['image']!==''){
							row['children'][0]['frame']['x'] = 50;
							row['children'].push({id:"ui-defgroup-"+j+"-img-"+k,value:'', template:row['template']['image'],name:"",viewtype:"Image",frame:{x:10,y:7,width:30,height:30}});
						}
						break;
					case 'subtitle':
						row['children'].push({id:"ui-defgroup-"+j+"-main-"+k,name:'',value:'', template:row['template']['maintext'],viewtype:"Label",frame:{x:10,y:7,width:150,height:20},font:{size:16,align:"left",color:{name:"black"}}},
											 {id:"ui-defgroup-"+j+"-sub-"+k,name:'',value:'', template:row['template']['subtext'],viewtype:"Label",frame:{x:10,y:22,width:150,height:20},font:{size:12,align:"left",color:{name:"gray"}}});
						if(row['template']['image']!==''){
							row['children'][0]['frame']['x'] = 50;
							row['children'][1]['frame']['x'] = 50;
							row['children'].push({id:"ui-defgroup-"+j+"-img-"+k,value:'',template:row['template']['image'],name:"",viewtype:"Image",frame:{x:10,y:7,width:30,height:30}});
						}
						break;
					case 'rightaligned':
						row['children'].push({id:"ui-defgroup-"+j+"-main-"+k,name:'',value:'', template:row['template']['maintext'],viewtype:"Label",frame:{x:10,y:13,width:150,height:20},font:{size:16,align:"left",color:{name:"black"}}});
								 			 //{id:"ui-defgroup-"+j+"-sub-"+k,name:'',value:'', template:row['template']['subtext'],viewtype:"Label",frame:{x:pagedef['width']-185,y:16,width:150,height:20},font:{size:12,align:"right",color:{name:"SteelBlue"}}});
						if(page['children'][0]['tablestyle'] === 'Grouped'){
							row['children'].push({id:"ui-defgroup-"+j+"-sub-"+k,name:'',value:'', template:row['template']['subtext'],viewtype:"Label",frame:{x:page['width']-210,y:16,width:150,height:20},font:{size:12,align:"right",color:{name:"SteelBlue"}}});
						}else{
							row['children'].push({id:"ui-defgroup-"+j+"-sub-"+k,name:'',value:'', template:row['template']['subtext'],viewtype:"Label",frame:{x:page['width']-185,y:16,width:150,height:20},font:{size:12,align:"right",color:{name:"SteelBlue"}}});
						}
						break;
					case 'contactform':
						row['children'].push({id:"ui-defgroup-"+j+"-main-"+k,name:'',value:'', template:row['template']['maintext'],viewtype:"Label",frame:{x:10,y:17,width:(page['width']-40)*0.4,height:20},font:{size:12,align:"right",color:{name:"SteelBlue"}}},
					 			 			 {id:"ui-defgroup-"+j+"-sub-"+k,name:'',value:'', template:row['template']['subtext'],viewtype:"Label",frame:{x:(page['width']-40)*0.4+20,y:17,width:(page['width']-40)*0.6,height:20},font:{size:16,align:"left",color:{name:"black"}}});
						break;
				}
				rows.push(row);
			});
			page['children'][0]['group'][0]['row'] = rows;
		});
		
		return page;
	};
	
	$.createTableViewRows = function(page, callback){
		$.each(page['children'][0]['group'],function(j,group){
			var rows = [];
			$.each(group['row'],function(k,row){
				row['data']['contents'] = page['data']['contents'];
				//TODO: generating children for TableView and TableViewList is almost the same... make a function
				//to make this almost the same... make sure the ID and template is different is different
				if(page['children'][0]['style']!=='custom')
					row['children'] = [];
				switch(page['children'][0]['style']){
					case 'default':
						row['children'].push({id:"ui-defgroup-"+j+"-main-"+k,name:'',value:'', template:row['template']['maintext'],viewtype:"Label",frame:{x:10,y:13,width:150,height:20},font:{size:16,align:"left",color:{name:"black"}}});
						if(row['template']['image']!==''){
							row['children'][0]['frame']['x'] = 50;
							row['children'].push({id:"ui-defgroup-"+j+"-img-"+k,value:'', template:row['template']['image'],name:"",viewtype:"Image",frame:{x:10,y:7,width:30,height:30}});
						}
						break;
					case 'subtitle':
						row['children'].push({id:"ui-defgroup-"+j+"-main-"+k,name:'',value:'', template:row['template']['maintext'],viewtype:"Label",frame:{x:10,y:7,width:150,height:20},font:{size:16,align:"left",color:{name:"black"}}},
											 {id:"ui-defgroup-"+j+"-sub-"+k,name:'',value:'', template:row['template']['subtext'],viewtype:"Label",frame:{x:10,y:22,width:150,height:20},font:{size:12,align:"left",color:{name:"gray"}}});
						if(row['template']['image']!==''){
							row['children'][0]['frame']['x'] = 50;
							row['children'][1]['frame']['x'] = 50;
							row['children'].push({id:"ui-defgroup-"+j+"-img-"+k,value:'',template:row['template']['image'],name:"",viewtype:"Image",frame:{x:10,y:7,width:30,height:30}});
						}
						break;
					case 'rightaligned':
						row['children'].push({id:"ui-defgroup-"+j+"-main-"+k,name:'',value:'', template:row['template']['maintext'],viewtype:"Label",frame:{x:10,y:13,width:150,height:20},font:{size:16,align:"left",color:{name:"black"}}},
								 			 {id:"ui-defgroup-"+j+"-sub-"+k,name:'',value:'', template:row['template']['subtext'],viewtype:"Label",frame:{x:page['width']-185,y:16,width:150,height:20},font:{size:12,align:"right",color:{name:"SteelBlue"}}});
						break;
					case 'contactform':
						row['children'].push({id:"ui-defgroup-"+j+"-main-"+k,name:'',value:'', template:row['template']['maintext'],viewtype:"Label",frame:{x:10,y:17,width:(page['width']-40)*0.4,height:20},font:{size:12,align:"right",color:{name:"SteelBlue"}}},
					 			 			 {id:"ui-defgroup-"+j+"-sub-"+k,name:'',value:'', template:row['template']['subtext'],viewtype:"Label",frame:{x:(page['width']-40)*0.4+20,y:17,width:(page['width']-40)*0.6,height:20},font:{size:16,align:"left",color:{name:"black"}}});
						break;
				}
				rows.push(row);
			});
			page['children'][0]['group'][0]['row'] = rows;
		});
		
		return page;
	};
	
	$.fetchLocalDBRecords = function(page, callback){
		$.utility('queryDatabase',true);
		setTimeout(function(){
			$.mobileweb['localdb']['instance'].transaction(function(tx) {
				tx.executeSql(['SELECT * FROM ', page['data']['tablename'], (page['data']['wherecond']!=='')? [' WHERE ',page['data']['wherecond']].join(''):'', (page['data']['order']!==undefined &&  page['data']['order']!=='')? [' ORDER BY ', page['data']['order']].join(''):'',  ].join(''), [],
					function(tx,result){
						var _results = [];
						
						for (var i=0; i<result.rows.length; i++){
							var _result = {};
							for(key in result.rows.item(i)){
								_result[key] = result.rows.item(i)[key];
							}
							_results.push(_result);
						}
						page['data']['contents'].splice(0,page['data']['contents'].length);
						page['data']['contents'].push(_results);// = _results;
						page['data']['updated'] = true;
						$.utility('queryDatabase',false);
						if(page['type'] === "DBTableView"){
							page['data']['isRecordSaved'] = true;
						}else{
							page['data']['isSaved'] = true;
						}
						
						if(callback != undefined)
							callback();
					},function(tx, error){
						$.utility('queryDatabase',false);
						page['data']['isSaved'] = true;
					});
				}); 
			}, 500);
		
	};
	
	$.fetchRemoteDBRecords = function(page, parentPageName, callback){
		new $.actions(page, null, [{method:"Select", category:"ComAction", callback : callback, parentPage :  parentPageName,
			params:{
				servicename: page['data']['servicename'],
				table: page['data']['tablename'],
				where: page['data']['wherecond'],
				order: page['data']['order'],
				fields:""
			}
		}]).execute();
		
	};
	
	$.setRemoteDBListViewPage = function(page, pagename){
	//	remoteDBListViewPage[pagename] = page;
		remoteDBListViewPage[pagename] = true;
	};
	
	$.setRemoteViewPage = function(page){
		remoteViewPage = page;
	};
	
})(jQuery);