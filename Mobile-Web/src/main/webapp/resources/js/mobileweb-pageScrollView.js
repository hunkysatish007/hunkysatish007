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
	
	
	//Entry point for 'PageScroll-view' implementation
	$.uiPageScrollViewContainer = function(pagedef, pageScrollViewInnerPages){
		var uichildren = [];
		pagedef['data']['innerPagesCount'] = 0;
		//$.splitviewChildScaleRatio(pagedef);
		
		$.each(pageScrollViewInnerPages, function(i, page){
			switch(page['type']){
				case 'BaseView':
					page['pagedef'] = pagedef;
					uichildren.push($.uiBaseViewForPSV(pagedef,page,i));
					pagedef['data']['isSaved'] = false;
					pagedef['data']['innerPagesCount'] =  pagedef['data']['innerPagesCount'] + 1;
					pagedef['pageCreated'] = true;
					break;
				case 'ScrollView':
					page['pagedef'] = pagedef;
					uichildren.push($.uiScrollViewForPSV(pagedef,page,i));
					pagedef['data']['isSaved'] = false;
					pagedef['data']['innerPagesCount'] =  pagedef['data']['innerPagesCount'] + 1;
					pagedef['pageCreated'] = true;
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
	
	//ui's for PageScroll view pages
	
	$.uiBaseViewForPSV = function(parentpagefdef, innerPagedef,i){
		var innerPageBaseView = new BaseView(innerPagedef);
		//console.log(innerPagedef['name'], "*************", innerPagedef['isgrandChild']);
		
		var data = {};
		if(parentpagefdef['data']['contents'] != undefined){
			$.extend(data, parentpagefdef['data']['contents'][0]);
			$.extend(data, innerPagedef['data']['contents'][0] )
				
		}
		innerPagedef['childrenUI'] = new $.uichildren(innerPagedef, innerPagedef['children'], data);
		innerPagedef['childrenId'] = i;
		//this function is needed for all of the UI objects
		innerPageBaseView.getHTML = function(){
			var pageHeight = innerPagedef['height'];			
			return['<div id="'+innerPagedef['name']+'_div" style="height:',pageHeight*$.mobileweb.device['aspectHratio'],'px;width:',innerPagedef['width']*$.mobileweb.device['aspectWratio'],'px;top:',(parseFloat(innerPagedef['y']))*$.mobileweb.device['aspectHratio'],'px;left:',innerPagedef['x']*$.mobileweb.device['aspectWratio'],'px;">',innerPagedef['childrenUI'].getHTML(),'</div>'].join('');
		};
		
		
		//this function is needed for all of the UI objects
		innerPageBaseView.applyOverrides = function(){
			$('#'+innerPagedef['name']+"_div").css({background: ($.attributes('color',innerPagedef['backgroundColor'])).getColorCode()});
			$('#'+innerPagedef['name']+"_div").css({'position': 'absolute'});
			$('#'+innerPagedef['name']+"_div").css({'height': '100%'});
			$('#'+innerPagedef['name']+"_div").css({'left': (((innerPagedef['childrenId'] * innerPagedef['width'])) * $.mobileweb.device['aspectWratio'])});
			if(innerPagedef['childrenUI'] != undefined)		
				innerPagedef['childrenUI'].applyOverrides();

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
			if(innerPagedef['childrenUI'] != undefined)
				innerPagedef['childrenUI'].applyEvents();
			
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
			
			$('#'+innerPagedef['name']+'_div').off('swipeleft').on("swipeleft",function(event){
				if(innerPagedef['pagedef']['children'].length > i+1){
					if(parentpagefdef['events']['flickLR'])
						new $.actions(parentpagefdef, null, JSON.parse(JSON.stringify(parentpagefdef['events']['flickLR']).slice())).execute();
					$("#" + innerPagedef['pagedef']['children'][i+1]['name'] + "_div")[0].scrollIntoView();
					//console.log(i,"----",innerPagedef['pagedef']['children'][i+1]['name'],"---",i+1);
				}
			});
			
			$('#'+innerPagedef['name']+'_div').off('swiperight').on("swiperight",function(event){
				if(i > 0){
					if(parentpagefdef['events']['flickRL'])
						new $.actions(parentpagefdef, null, JSON.parse(JSON.stringify(parentpagefdef['events']['flickRL']).slice())).execute();
					$("#" + innerPagedef['pagedef']['children'][i-1]['name'] + "_div")[0].scrollIntoView();
					//console.log(i,"----",innerPagedef['pagedef']['children'][i-1]['name'],"---",i-1);
				}
			});
			
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
	
	$.uiScrollViewForPSV = function(parentpagefdef, innerPagedef,i){
		var innerPageScrollView = new BaseView(innerPagedef);
		var data = {};
		//this function is needed for all of the UI objects
		if(parentpagefdef['data']['contents'] != undefined){
			$.extend(data, parentpagefdef['data']['contents'][0]);
			$.extend(data, innerPagedef['data']['contents'][0] )
		}
		innerPagedef['childrenUI'] = new $.uichildren(innerPagedef, innerPagedef['children'], data);
		innerPagedef['childrenId'] = i;
		
		innerPageScrollView.getHTML = function(){
			var pageHeight = innerPagedef['height'];
			//return ['<div id="'+innerPagedef['name']+'_div">','<section  id="'+ innerPagedef['name'] +'_section"  class="scrollSection" style="height:',pageHeight * $.mobileweb.device['aspectHratio'],'px;width:',innerPagedef['sectionwidth']* $.mobileweb.device['aspectWratio'],'px;top:',(parseFloat(innerPagedef['y'])) * $.mobileweb.device['aspectHratio'],'px;left:',innerPagedef['x']* $.mobileweb.device['aspectWratio'],'px;">','<div id="'+ innerPagedef['name'] +'" style="height:',innerPagedef['height'] * $.mobileweb.device['aspectHratio'],'px;width:',innerPagedef['width']* $.mobileweb.device['aspectWratio'],'px;top:',( parseFloat(innerPagedef['y'])) * $.mobileweb.device['aspectHratio'],'px;left:',innerPagedef['x']* $.mobileweb.device['aspectWratio'],'px;">',innerPagedef['childrenUI'].getHTML(),'</div>','</section>','</div>'].join('');
			return ['<div id="'+innerPagedef['name']+'_div">','<div id="'+ innerPagedef['name'] +'" style="height:',innerPagedef['height'] * $.mobileweb.device['aspectHratio'],'px;width:',innerPagedef['width']* $.mobileweb.device['aspectWratio'],'px;top:',( parseFloat(innerPagedef['y'])) * $.mobileweb.device['aspectHratio'],'px;left:',innerPagedef['x']* $.mobileweb.device['aspectWratio'],'px;">',innerPagedef['childrenUI'].getHTML(),'</div>','</div>'].join('');
		};
		
		
		//this function is needed for all of the UI objects
		innerPageScrollView.applyOverrides = function(){
			//div
			$('#'+innerPagedef['name']+"_div").css({background: "#FFFFFF"});
			$('#'+innerPagedef['name']+"_div").css({'position': 'absolute'});
			$('#'+innerPagedef['name']+"_div").css({'height': '100%'});
			$('#'+innerPagedef['name']+"_div").css({'width': '100%'});
			$('#'+innerPagedef['name']+"_div").css({'left': (((innerPagedef['childrenId'] * parentpagefdef['width'])) * $.mobileweb.device['aspectWratio'])});
			
			//page
			$('#'+innerPagedef['name']).css({background: ($.attributes('color',innerPagedef['backgroundColor'])).getColorCode()});
			$('#'+innerPagedef['name']).css({'position': 'relative'});
			$('#'+innerPagedef['name']).css({'height': (parseInt(innerPagedef['height']) + innerPagedef['y']) * $.mobileweb.device['aspectHratio']});
			$('#'+innerPagedef['name']).css({'width': (parseInt(innerPagedef['width']) + innerPagedef['x']) * $.mobileweb.device['aspectWratio']});
			$('#'+innerPagedef['name']).css({'left': (((innerPagedef['x'])) * $.mobileweb.device['aspectWratio'])});
			$('#'+innerPagedef['name']).css({'top': (((innerPagedef['y'])) * $.mobileweb.device['aspectWratio'])});
			
			if(innerPagedef['childrenUI'] != undefined)
				innerPagedef['childrenUI'].applyOverrides();

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
			if(innerPagedef['childrenUI'] != undefined)
				innerPagedef['childrenUI'].applyEvents();
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
			
			$('#'+innerPagedef['name']+'_div').off('swipeleft').on("swipeleft",function(event){
				if(innerPagedef['pagedef']['children'].length > i+1){
					if(parentpagefdef['events']['flickLR'])
						new $.actions(parentpagefdef, null, JSON.parse(JSON.stringify(parentpagefdef['events']['flickLR']).slice())).execute();
					$("#" + innerPagedef['pagedef']['children'][i+1]['name'] + "_div")[0].scrollIntoView();
					//console.log(i,"----",innerPagedef['pagedef']['children'][i+1]['name'],"---",i+1);
				}
			});
			
			$('#'+innerPagedef['name']+'_div').off('swiperight').on("swiperight",function(event){
				if(i > 0){
					if(parentpagefdef['events']['flickRL'])
						new $.actions(parentpagefdef, null, JSON.parse(JSON.stringify(parentpagefdef['events']['flickRL']).slice())).execute();
					$("#" + innerPagedef['pagedef']['children'][i-1]['name'] + "_div")[0].scrollIntoView();
					//console.log(i,"----",innerPagedef['pagedef']['children'][i-1]['name'],"---",i-1);
				}
			});
			
			innerPageScrollView.applyScrollEvents(innerPagedef['name']+'_div');
		};
		
		innerPageScrollView.applyScrollEvents = function(pageID){
			var myScroll;
			$('#'+pageID).on( "vmouseover", $('#'+pageID), function() {
				if(myScroll === undefined){
					var scrollerid = $('#'+pageID).get(0);
					myScroll = new iScroll(scrollerid, {
						bounceLock: true,
						hScrollbar: false,
						vScrollbar: false,
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
	
})(jQuery);