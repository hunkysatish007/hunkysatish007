(function($){
	$.sidebartable = function(pagedef, child){
		var table = {};
		
		new Table(pagedef, table, child);
		
		return table;
	};
	
	function Table(pagedef, table, child){
		table['group'] = [];
		pagedef['toolbarleft']['type'] = pagedef['type'];
		pagedef['toolbarleft']['sidebarParentPagedef'] = pagedef; // Bug #12380 fix
		if(pagedef['type'] != "PageScrollView"){
			$.each(pagedef['children'],function(i,child){
				pagedef['toolbarleft']['children'].push(child); // Bug #12374 fix
			});
		}
		$.each(child['group'],function(i,group){
			pagedef['toolbarleft']['name'] = pagedef['name'];
			pagedef['toolbarleft']['parent'] = pagedef['parent'];
			pagedef['toolbarleft']['data'] = pagedef['data'];//Bug #12141 fix
			table['group'].push(new Group(pagedef['toolbarleft'], child['id'], group, i));
		});
		table.getHTML = function(){
			var _table = [];
			var DBTableViewListGroupedStyle = (child['tablestyle']=="Grouped") ? "style='left:0px;'" : "";
			$.each(table['group'],function(i,group){
				_table = _table.concat(group.getHTML());
			});
			var showMoreButton = "";
			var value = "";
			if($.utility('detectBrowserLanguage') != 'ja'){
				value = "Show More" ;
			}else{
				value = "続きを見る";
			}
			if((pagedef['type'] == "RemoteTableViewList" && pagedef['data']['contents']['totalRecords'] == 25) || (pagedef['type'] == "DBTableViewList" && pagedef['data']['contents'].length ==25)){
				showMoreButton = "<fieldset id='showmore'> <input id='showmore'  type='button' value='"+value+"' class=ui-btn-hidden aria-disabled=false /></fieldset>";
			}
			return ["<div id='", child['id'], "' "+DBTableViewListGroupedStyle+" class='ui-table-position'>",
			        _table.join(''),
			        showMoreButton,
			        "</div>"].join('');
		};
		
		table.applyOverrides = function(){
			$("#"+child['id']).css({'z-index':'1001'});
			if((pagedef['type'] === "TableView") && (pagedef['children'][0]['accordion']))
				$(".ui-table-position").css({'top':'0px'});		// fix bug #6916
			if(child['tablestyle']=="Grouped"){
				$("#"+child['id']).css({'left':'0px'});
			}
			
			$.each(table['group'],function(i,group){
				group.applyOverrides();
			});
		};
		
		table.applyEvents = function(){
			$.each(table['group'],function(i,group){
				group.applyEvents();
			});
			if(pagedef['type'] == "RemoteTableViewList" || pagedef['type'] == "DBTableViewList"){
				$("#showmore").bind("click", function(){
					var baseId = $("#"+pagedef['children'][0]['id']+" ul").attr('id');
					$.utility('showLoadingIndicator', true);
					pagedef['data']['contents']['loaded'] = false;
					var initialContentLength = pagedef['data']['contents'].length;
					//Richa---Bug #8782 Fix					
					var x = $(".scroller").offset();
					var x_new = x.top;
					var y_new = x.left;//--
					if(pagedef['type'] == "RemoteTableViewList")
  					{
  						new $.actions(pagedef, null, [{method:"Select", category:"ComAction", callback : "loadMoreRecords",
  							params:{
 								servicename: pagedef['data']['servicename'],
 								table: pagedef['data']['tablename'],
 								where: pagedef['data']['wherecond'],
 								order: pagedef['data']['order'],
 								offset: (parseInt(pagedef['data']['contents']['offset']) + 25),
  								limit : 25,
  								fields:""
  							}
  						}]).execute();
  					}
  					else if(pagedef['type'] == "DBTableViewList")
  					{
  						new $.actions(pagedef, null, [{method:"Select", category:"DBAction", callback : "loadMoreRecords", params:{tablename:pagedef['data']['tablename'], where:pagedef['data']['wherecond'], order:pagedef['data']['order'],columns:""}}]).execute();
  					}
					var myVar=setInterval(function() {
						if((pagedef['data']['contents']['loaded'] != undefined) && (pagedef['data']['contents']['loaded'])){
							clearInterval(myVar);
							$.createRemoteDBListViewPageRows(pagedef, function(){
								var contents = [];
								if(pagedef['data']['contents'][0].constructor == Object){
									contents = pagedef['data']['contents'];
								}else{
									contents = pagedef['data']['contents'][0];
								}
								if(initialContentLength < contents.length){
									var noOFNewRowsAdded = contents.length  - initialContentLength;
									var allRowHeight = 0;
									for(var k = 0; k < noOFNewRowsAdded; k++){
										var rownum =initialContentLength + k;
										$.createRow(pagedef,baseId,pagedef['children'][0]['group'][0]['row'][rownum],initialContentLength + k,function(row){
											allRowHeight = allRowHeight + row.getCellHeight();
											allRowHeight = allRowHeight + 2;
											pagedef['children'][0]['group'][0]['row'][rownum] = row;
											pagedef['children'][0]['group'][0]['row'].push(pagedef['children'][0]['group'][0]['row'][rownum]);
											$(".scroller").find('ul').append(pagedef['children'][0]['group'][0]['row'][rownum].getHTML().join(''));
											pagedef['children'][0]['group'][0]['row'][rownum].applyOverrides();
											pagedef['children'][0]['group'][0]['row'][rownum].applyEvents();
										});
									}
									$.utility('showLoadingIndicator', false);
									$(".scroller").find('ul').unblock();
									$('.ui-loader').css({'display': 'none'});
									$(".bglayout").css({"height" : (parseFloat($(".bglayout").css("height").replace("px","")) + allRowHeight) + "px"});
									$(".scroller").css({"height" : (parseFloat($(".scroller").css("height").replace("px","")) + allRowHeight) + "px"});
									//Richa---Bug #8782 Fix
									$(".scroller").css({"height" : (parseFloat($("#"+pagedef['children'][0]['id']).css("height").replace("px","")) + 20) + "px"});
									var x = $(".scroller").offset();
									var timer = setInterval(function() {
										clearInterval(timer);
										$(".scroller").offset({top:x_new,left:y_new})
										var x = $(".scroller").offset();
									},400);//--
								}
								pagedef['iscroll'] = {};
								$("#iscroll_" + pagedef['name'] + "> div:nth-child(2)").remove();
								pagedef['iscroll'] = new iScroll($('#iscroll_'+pagedef['name']).get(0), {
									useTransform: false,
									bounceLock: true,
									onBeforeScrollStart: function (e) {
										var target = e.target;
										while (target.nodeType != 1) target = target.parentNode;
											if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
												e.preventDefault();
									}
								});
							});
							if(pagedef['data']['contents']['allRecordsLoaded']){
								$("#showmore").remove();
							}
						}else{//Richa
 							clearInterval(myVar);
 							$.createRemoteDBListViewPageRows(pagedef, function(){
 								var contents = [];
 								if(pagedef['data']['contents'][0].constructor == Object){
 									contents = pagedef['data']['contents'];
 								}else{
 									contents = pagedef['data']['contents'][0];
 								}
 								var noOFNewRowsAdded = 25;
 								var allRowHeight = 0;
 								for(var k = 0; k < noOFNewRowsAdded; k++){
 									var rowLength = pagedef['children'][0]['group'][0]['row'].length;
 									var rownum = $(".scroller").find('ul').children("li").length;
 									$.createRow(pagedef,baseId,pagedef['children'][0]['group'][0]['row'][rownum],noOFNewRowsAdded + k,function(row){
 										allRowHeight = allRowHeight + row.getCellHeight();
 										allRowHeight = allRowHeight + 2;
 										pagedef['children'][0]['group'][0]['row'][rownum] = row;
 										pagedef['children'][0]['group'][0]['row'].push(pagedef['children'][0]['group'][0]['row'][rownum]);
 										$(".scroller").find('ul').append(pagedef['children'][0]['group'][0]['row'][rownum].getHTML().join(''));
 										pagedef['children'][0]['group'][0]['row'][rownum].applyOverrides();
 										pagedef['children'][0]['group'][0]['row'][rownum].applyEvents();
 									});
 								}
 								$.utility('showLoadingIndicator', false);
 								$(".scroller").find('ul').unblock();
 								$('.ui-loader').css({'display': 'none'});
 								$(".bglayout").css({"height" : (parseFloat($(".bglayout").css("height").replace("px","")) + allRowHeight) + "px"});
 								$(".scroller").css({"height" : (parseFloat($(".scroller").css("height").replace("px","")) + allRowHeight) + "px"});
 								//Richa---Bug #8782 Fix
 								$(".scroller").css({"height" : (parseFloat($("#"+pagedef['children'][0]['id']).css("height").replace("px","")) + 50) + "px"});
 								$(".bglayout").css({"height" : (parseFloat($("#"+pagedef['children'][0]['id']).css("height").replace("px","")) + 50) + "px"});
 								var x = $(".scroller").offset();
 									var timer = setInterval(function() {
 										clearInterval(timer);
 										$(".scroller").offset({top:x_new,left:y_new})
 										var x = $(".scroller").offset();
 									},400);//--
 								pagedef['iscroll'] = {};
 								$("#iscroll_" + pagedef['name'] + "> div:nth-child(2)").remove();
 								pagedef['iscroll'] = new iScroll($('#iscroll_'+pagedef['name']).get(0), {
 									useTransform: false,
 									bounceLock: true,
 									onBeforeScrollStart: function (e) {
 										var target = e.target;
 										while (target.nodeType != 1) target = target.parentNode;
 											if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
 												e.preventDefault();
 									}
 								});
 							});//--
						}
					},300);
				});
			}else{
				
				// For Accordion view header, if 'icon' assign then below code. 	Dated:16-Feb-2018
				$('.ui-collapsible-heading').click(function(event){
					var thisclass = $(this).attr('class');
					console.log($(this).attr('id'), ' -->', thisclass);
					var accordionHeader = pagedef['children'][0]['accordionheader'];
					if(accordionHeader){
						var iconClosed= $.utility('getImage', $.utility('tokenizeString',accordionHeader['closeicon'],pagedef));
						var iconOpen= $.utility('getImage', $.utility('tokenizeString',accordionHeader['openicon'],pagedef));
						
						if(thisclass.indexOf('ui-collapsible-heading-collapsed') > -1){
							if(iconClosed != ""){
								$('#'+$(this).attr('id')+' > a > span > span.ui-icon').attr('class','ui-icon');
								$('#'+$(this).attr('id')+' > a > span > span.ui-icon').css({'background-image':'url('+iconClosed+')'});
								$('#'+$(this).attr('id')+'  > a > span > span.ui-icon').css({'background-size':'18px 18px'});
							}else
								$('#'+$(this).attr('id')+' > a > span > span.ui-icon').css({'background-image':''});
						}else{
							if(iconOpen != ""){
								$('#'+$(this).attr('id')+' > a > span > span.ui-icon').attr('class','ui-icon');
								$('#'+$(this).attr('id')+' > a > span > span.ui-icon').css({'background-image':'url('+iconOpen+')'});
								$('#'+$(this).attr('id')+'  a > span > span.ui-icon').css({'background-size':'18px 18px'});
							}else
								$('#'+$(this).attr('id')+' > a > span > span.ui-icon').css({'background-image':''});
						}
						$('#iscroll_leftToolBar_'+pagedef['name']).css({'height':parseInt($('.ui-table-position').css('height')) + 60,'width':parseInt($('#leftToolBar').css('width'))});
						if(!$.isEmptyObject(leftToolBar['iscroll'])){
							leftToolBar['iscroll'].refresh();
							leftToolBar['iscroll'].hScroll = false;
						}
					}
				});
			}
		};
		
		//this function is needed for all of the UI objects
		table.getValue = function(){
			//return the list of the selected rows per group (in array of arrays ofcourse)
			return '';
		};
	};
	
	function Group(pagedef, id, tblgroup, index){
		var group = {id: id + '-group-' + index,
					 row:[]};
		$.each(tblgroup['row'],function(i,row){
			//row['backgroundColor'] = tblgroup['backgroundColor'];
			group['row'].push(new Row(pagedef, group['id'], row, i, tblgroup['flexibleHeight']));
		});
		
		group.getHTML = function(){
			var groupedStyle = (pagedef['children'][0]['tablestyle']=="Grouped") ? "style='padding:3px;'" : "";
			var tableStyle = (pagedef['children'][0]['tablestyle']=="Grouped") ? "true" : "false";
			var _table = '';
			
			if((pagedef['view'] === "TableView") && (pagedef['children'][0]['accordion'])){
				// this is for Accordion View in TAbleView Only... Akhil.
				_table = [//"<div id='", group['id'], "-header'>", 
							//(tblgroup['header']!=='')? ["<p class='ui-table-header-text'>", tblgroup['header'], "</p>"].join(''):'',
							//"</div>", 
				          "<div data-role='collapsible' data-collapsed='false'>",
				          "<h2 id='", group['id'], "'>",tblgroup['header'],"</h2>",
						"<ul id='", group['id'], "' data-role='listview' data-split-theme='d' data-inset='",tableStyle,"' "+groupedStyle+">"];
				
				$.each(group['row'],function(i,row){
					_table = _table.concat(row.getHTML());
				});
				
				if(tblgroup['footer'] == ""){
					_table = _table.concat(
							["</ul>", 
							"<div id='", group['id'], "-footer'>", 
   							"</div>",
							 "</div>"	// closing DIV for collapsible..
							 ]);
				}else{
					_table = _table.concat(
							["</ul>", 
							"<div id='", group['id'], "-footer'>", 
								"<p class='ui-table-footer-text'>", tblgroup['footer'], "&nbsp</p>",
							"</div>",
							 "</div>"	// closing DIV for collapsible..
							 ]);
				}
				
			}else{
				_table = ["<div id='", group['id'], "-header'>", 
							(tblgroup['header']!=='')? ["<p class='ui-table-header-text'>", tblgroup['header'], "</p>"].join(''):'',
							"</div>", 
						"<ul id='", group['id'], "' data-role='listview' data-split-theme='d' data-inset='",tableStyle,"' "+groupedStyle+">"];
				
				$.each(group['row'],function(i,row){
					_table = _table.concat(row.getHTML());
				});
				
				_table = _table.concat(
						["</ul>", 
						"<div id='", group['id'], "-footer'>", 
							"<p class='ui-table-footer-text'>", tblgroup['footer'], "&nbsp</p>",
						"</div>"]);
			}
			return _table;
		};
		
		group.applyOverrides = function(){
			//if((pagedef['type'] === "RemoteTableViewList") || (pagedef['type'] === "TableViewList") || (pagedef['type'] === "DBTableViewList"))
			if(pagedef['view'] === "TableView")
				$.utility('showLoadingIndicator',true);
				
			$('#' + group['id']).css({'width':pagedef['width'] * $.mobileweb.device['aspectratio'], 'margin':"-17px 0px 0px"});
			$('#' + group['id']+ '-header .ui-table-header-text').css({'font-size':16 * $.mobileweb.device['aspectratio'],'margin-left':(10*$.mobileweb.device['aspectratio'])});
			//$('#' + group['id']+ '-footer').css({'padding-top':'inherit'})
			$('#' + group['id']+ '-footer .ui-table-footer-text').css({'font-size':16 * $.mobileweb.device['aspectratio'],'margin-left':(10*$.mobileweb.device['aspectratio']),'margin-top':(1*$.mobileweb.device['aspectratio'])});
			//if((pagedef['type'] === "TableViewList") || (pagedef['type'] === "DBTableViewList") || (pagedef['type'] === "RemoteTableViewList"))
			if((pagedef['view'].indexOf("TableView") > -1))
				$('#' + group['id']+ ' .ui-icon').css({'z-index':99});
			
			var timerTime = 1250;
			
			// Fixed DataSet TableView is removed from timer(Below) module.. cause I think it is not required.. Akhil
			//if((pagedef['type'] == "DBTableView")||(pagedef['type'] == "RemoteTableView")){
			if((pagedef['view'].indexOf("TableView") > -1)){
				var _page = $.utility('getObject',$.mobileweb['pages'],'name',pagedef['parent']);
				if(($.isEmptyObject(_page)) || (_page == undefined) || ((_page['type']!= 'DBTableViewList') && (_page['type']!= 'RemoteTableViewList'))) {
					timerTime=700;		
				}
			}	
			
			setTimeout(function(){
				$.each(group['row'],function(i,row){
					row.applyOverrides();
				});
				
				//if((pagedef['type'] === "RemoteTableViewList") || (pagedef['type'] === "TableViewList") || (pagedef['type'] === "DBTableViewList")){
				if(pagedef['view'] === "TableView"){
					$.utility('showLoadingIndicator',false);
				}
				
//				if((pagedef['type'] === "TableViewList"|| (pagedef['type'] === "DBTableView")||pagedef['type'] === "DBTableViewList" || pagedef['type'] === "RemoteTableViewList") && pagedef['children'][0]['tablestyle']=="Grouped" ){
//					$('#' + group['id']).css({'width':(pagedef['width'] - 40)* $.mobileweb.device['aspectratio'], 'margin-right':20* $.mobileweb.device['aspectratio'],'margin-left':20* $.mobileweb.device['aspectratio']});
//				}
				
				if((pagedef['view'].indexOf("TableView") > -1)){
					$('#' + group['id']).css({'width':(pagedef['frame']['width'])* $.mobileweb.device['aspectratio'], 'margin-right':20* $.mobileweb.device['aspectratio'],'margin-left':20* $.mobileweb.device['aspectratio']});
				}

				if(pagedef['view'] === "TableView"){
					var aspect = $.mobileweb.device['aspectratio'];
					var groupedPad = $('#' + group['id']).css('padding').replace('px','')*2;
					
					if(pagedef['children'][0]['accordion']){
						$("div[data-role='collapsible']").css({'width':pagedef['width'] * aspect,'margin-top':'0px', 'margin-bottom':(4*aspect)});
						$('.ui-collapsible-content').css({'padding':'0px 0px 0px'});
						$('.ui-collapsible-content > .ui-listview').css({'margin':'0px 0px 0px'});
						$('.ui-collapsible-heading-toggle').css({'border-radius':'1px'});
						
						var accordionHeader = pagedef['children'][0]['accordionheader'];
						if(accordionHeader){
							$('.ui-collapsible-heading-toggle').css({'background':$.attributes('color', accordionHeader['bgcolor']).getColorCode(), 'color':$.attributes('color', accordionHeader['textcolor']).getColorCode()});
							$('.ui-collapsible-heading-toggle').css({'height':accordionHeader['height']*aspect, 'padding': '0px 0px 0px'});
							//$('.ui-collapsible-heading-toggle > span').css({'margin-top': (accordionHeader['height']-16)*aspect/2, 'padding-top': '0px'});
							$('.ui-collapsible-heading-toggle > span').css({'height':accordionHeader['height']*aspect,'padding': '0px 0px 0px'});
							$('.ui-collapsible-heading-toggle > span > span.ui-btn-text').css({'font-size': 16*aspect,top: (accordionHeader['height']-16)*aspect/2});
							
							if(accordionHeader['iconposition'] == "right"){
								$('.ui-collapsible-heading-toggle > span').css({'padding-left':'12px'});
								$('.ui-collapsible-heading-toggle > span > span.ui-icon').css({'right':'10px','left':'auto'});
							}else{
								$('.ui-collapsible-heading-toggle > span').css({'padding-left':'40px'});
							}
							
							if(accordionHeader['openicon'] && accordionHeader['openicon'] != ""){
								$('.ui-collapsible-heading > a > span > span.ui-icon').attr('class','ui-icon');				// since default class is not allowing to set 'open' icon, so i have to override it. Dated:16-Feb-2018
								var iconOpen= $.utility('getImage', $.utility('tokenizeString',accordionHeader['openicon'],pagedef));
								$('.ui-collapsible-heading > a > span > span.ui-icon').css({'background-image':'url('+iconOpen+')'});
								$('.ui-collapsible-heading > a > span > span.ui-icon').css({'background-size':'18px 18px'});
							}
						}
						
						if(pagedef['children'][0]['tablestyle']!="Grouped")
							groupedPad = 0;
						$('#' + group['id']).css({'width':(pagedef['width'] * aspect) - groupedPad, 'margin':'0px'});
					}else{
						
						if(pagedef['children'][0]['tablestyle']!="Grouped")
							groupedPad = 0;
						$('#' + group['id']).css({'width':((pagedef['width'] * aspect)-groupedPad) + "px", 'margin-left':'0px'});
					}
				}
				if(pagedef['children'][0]['tablestyle'] == "Grouped"){//Bug #12842 fix
					$('#' + group['id']).css({'width':((pagedef['width'] * aspect)-5) + "px", 'border':'2px solid black','border-radius':'10px','background-color':'white','padding':'1px'});
				}
				// In case of flexible rows, introducing scroll bar. Need to improve this.
//				if($('#iscroll_'+pagedef['name'])[0] != undefined){
//					var pageclientH = $('#iscroll_'+pagedef['name'])[0].clientHeight;
//					if(pageclientH > 0 && (pageclientH < $(".scroller")[0].scrollHeight)){
//						$('.bglayout').css({'height': $('#iscroll_'+pagedef['name'])[0].clientHeight+'px'});
//						//$('.bglayout').css({'overflow-x':'hidden', 'overflow-y':'auto'});
//					}
//				}
				
			},timerTime);
		};
		
		group.applyEvents = function(){
			$.each(group['row'],function(i,row){
				row.applyEvents();
			});
		};
		
		return group;
	};
	
	function Row(pagedef, id, grprow, index, isFlexible){
		var row = {id: id + '-row-' + index,
				   rownum: grprow['rownum'],
				  // children: new $.uichildren(pagedef, grprow['children'], grprow['data']['contents'][0]),
				   backgroundColor : grprow['backgroundColor'],
				   repeatImage : grprow['repeatImage'],
				   isFlexible : isFlexible,
				};
		if($.utility("isReverseTransition")){
			var currpage;
 			if($.mobileweb.getCurrentPage().getViewType() == "SplitView"){
 				$.each($.mobileweb.getCurrentPage()['children'], function(j,splitViewPage) {
 					if(splitViewPage.getId() === pagedef['name']){
 						currpage = splitViewPage;
 						//row['children'] = currpage['children'][0]['group'][0]['row'][grprow['rownum']]['children'];
 					}
 				});
 			}
 			else
 				currpage = $.mobileweb.getCurrentPage();
 			
 			if(currpage != undefined){
 				var pageRow;
 				if(currpage['children'][0] != undefined)
 					pageRow = currpage['children'][0]['group'][0]['row'][grprow['rownum']];
 					
 				if(pageRow != undefined)
 					row['children'] = pageRow['children'];
 				else
 					row['children'] = [];
 			}
 			else
 				row['children'] = [];
		}else{
			row['children'] = new $.uichildren(pagedef, grprow['children'], grprow['data']['contents'][0]);
		}
		if(row['rownum']%2 === 0){
			row['cellBackgroundColor'] = grprow['oddRowBackgroundColor'];
			row['cellBackgroundImage'] = grprow['oddRowBackgroundImage'];
		}else{
			row['cellBackgroundColor'] = grprow['evenRowBackgroundColor'];
			row['cellBackgroundImage'] = grprow['evenRowBackgroundImage'];
		}
		
		row.getHTML = function(){
			return ["<li data-icon='", grprow['icon']['style'], "'>", 
						"<a href='#' id='", row['id'], "' class='ui-table-padding'>",
							"<div class='ui-table-row-size' style='visibility:hidden'>",
								row['children'].getHTML(),
							"</div>",
						"</a>", //change this to DIV for the flat style
						(grprow['icon']['events']) ? ["<div id='", row['id'], "-icon'>","</div>"].join(''): '',
					"</li>"];
		};
		
		
		
		row.getViewType = function(){
			return 'Row';
		};
		
		row.applyOverrides = function(){
			row.setCellHeight(grprow['rowsize']);
			if(row['children'].length > 0){
				row['children'].applyOverrides();
				row['children'].applyEvents();
			}
			
			$('#'+row['id']+' .ui-table-row-size').css({'visibility':'visible'});
			
			// Below Code is for removing the border space from rows..
			if(pagedef['children'][0]['tablestyle'] != "Grouped")
				$('.ui-li').css({'border-top-width':'0px', 'border-bottom-width':'0px'});
			
			if(row['backgroundColor'] != undefined){
				$('#'+row['id']).css({'background-color':$.attributes('color', row['backgroundColor']).getColorCode()});
				//$(".ui-li>.ui-btn-inner").css({'background-color':$.attributes('color', row['backgroundColor']).getColorCode()});
			}
			
			if(row['cellBackgroundColor'] != undefined){
				$('#'+row['id']).css({'background-color':$.attributes('color', row['cellBackgroundColor']).getColorCode()});
			}
			if(row['cellBackgroundImage'] != undefined && row['cellBackgroundImage']!=''){
				if(row['repeatImage']){
					$('#'+row['id']).css({'z-index':99,'background-image':'url('+$.utility('getImage',row['cellBackgroundImage'])+')','background-color':'white','background-position':'100% 100%','background-repeat': 'repeat'});
				}else{
					$('#'+row['id']).css({'z-index':99});
					
					var $imgdiv = $("<img/>");
					$imgdiv.css({'height':grprow['rowsize'] * $.mobileweb.device['aspectratio']+'px', 'width':pagedef['width'] * $.mobileweb.device['aspectratio']+'px', 'margin-left':$('#'+row['id']+' div > p').css("left") });
					$imgdiv.attr("src", $.utility('getImage',row['cellBackgroundImage']));
					$('#'+row['id']+' div').append( $imgdiv );
				}
			}
			
			if(grprow['icon']['style']=='button'){
				$('#'+row['id']).parent().siblings().css({'z-index':199,'background-image':'url('+$.utility('getSystemImage','button.png',row.getViewType())+')','background-color':'white','background-position':' 50% 50%','background-repeat': 'no-repeat no-repeat'});
			}else{
				if(grprow['icon']['style']!='false'){
					$('#'+row['id']).parent().siblings().css({'z-index':199});
					if(grprow['icon']['style'] == 'arrow-r'){
						var _iconImageurl = $.utility('getSystemImage', "icons-18-white.png","Image");
						$('#'+row['id']).parent().siblings().css({'background-image':'url("'+_iconImageurl+'")', 'background-repeat': 'no-repeat no-repeat'});
						//$('#'+row['id']).parent().siblings().css({'z-index':0,'right':5});
					}
				}
			}
			
			if(grprow['icon']['events']){
				$('#'+row['id']+'-icon').css({position:'absolute',
					top:0,
					left: (pagedef['frame']['width'] * $.mobileweb.device['aspectratio']) - 40,
					height: grprow['rowsize'] * $.mobileweb.device['aspectratio'],
					width:40
				});
			}
			
			
			
			// Below Code is for flexible Rows and TextArea in it ...
			$.each(row['children'],function(i,child){				
				if(row['isFlexible']){
					if(child.getViewType() === "TextArea")// && child['flexibleHeight'])
					{
						row.setFlexibleHeight(child);
					}
//					else{
//						// we need to manage other ui-part's postion accroding to flexible TextArea
//						console.log(child.getViewType(), child['frame'].getFrame())
//					}
				}
			});

		};
		
		row.setFlexibleHeight = function(child){			
			$('#'+child.getId()).addClass("autoExpand");
			$('#'+child.getId()).css({'height':'initial', 'max-height':'', 'overflow':'hidden'});
			
			var bottomgap = row.getCellHeight() - (parseInt(child['frame'].getFrame()['y']) + parseInt(child['frame'].getFrame()['height']));
			$('#'+child.getId()).css({'bottom':bottomgap+'px'});
			
			var elem = document.getElementById(child.getId()); 
			var outerHeight = parseInt(window.getComputedStyle(elem).height, 10);
			var diff = outerHeight - elem.clientHeight;
			
			// set the height to 0 in case of it has to be shrinked
			//elem.style.height = 0;
			
			// set the correct height, elem.scrollHeight is the full height of the content, not just the visible part
			var elemheight = Math.max(elem.scrollHeight, elem.scrollHeight + diff);
			//elem.style.height = elemheight + 'px';
			
			var flexheight = row.getCellHeight() - parseInt(child['frame'].getFrame()['height']) + elemheight;
			//console.log(bottomgap, outerHeight, elemheight, flexheight);
			if(flexheight > row.getCellHeight())
				$('#'+row['id']).css({'height':flexheight + 'px'});
			else
				$('#'+row['id']).css({'height':row.getCellHeight()+ 'px'});
		};
		
		row.setCellHeight = function(param){
			if(row['isFlexible']){
				//$('#'+row['id']).css({'height':param * $.mobileweb.device['aspectratio']});
			}
			else{
				grprow['rowsize'] = param;
				$('#'+row['id']+' .ui-table-row-size').css({'height':param * $.mobileweb.device['aspectratio']});
			}
		};
		
		row.getCellHeight = function(){
			return grprow['rowsize'] * $.mobileweb.device['aspectratio'];
		};
		row.getId = function(){
			return row['id'];
		};
		row.getName = function(){
			return row['name'];
		};
		row.applyEvents = function(){
			var alreadyclicked=false;
			var alreadySwiped=false;
			if(grprow['icon']['events']){
				if(grprow['icon']['events']['Tap']){
					//jQuery($('#'+id+' .ui-icon').get(index)).click(function(){$('#'+row['id']+'-icon').click();});
					$('#'+row['id']+'-icon').click(function(){
						$.each(grprow['icon']['events']['Tap'],function(i,action){
							if(action['category']==='PageAction') $('#'+row['id']).addClass('ui-btn-active');
						}); 
						new $.actions(pagedef, row, grprow['icon']['events']['Tap'].slice()).execute(); 
					});
				}
			}
			
			if(grprow['events']){
				if(grprow['events']['Tap'])
					$('#'+row['id']).click(function(event){
						if (alreadyclicked)
						{
							alreadyclicked=false; // reset
							clearTimeout(alreadyclickedTimeout); // prevent this from happening
							// do what needs to happen on double click. 
						}
						else
						{
							alreadyclicked=true;
							alreadyclickedTimeout=setTimeout(function(){
								alreadyclicked=false; // reset when it happens
								// do what needs to happen on single click. 
							},300); // <-- dblclick tolerance here
							if(event.target.tagName !== "INPUT"){
								if(event.target.tagName === "LABEL"){
									if(event.target.htmlFor.length>0){
									}
									else {
										$.each(grprow['events']['Tap'],function(i,action){
											if(action['category']==='PageAction') 
												$('#'+row['id']).addClass('ui-btn-active');
										}); 
										new $.actions(pagedef, row, JSON.parse(JSON.stringify(grprow['events']['Tap']).slice())).execute();
									}
								}

								else {
									$.each(grprow['events']['Tap'],function(i,action){
										if(action['category']==='PageAction') 
											$('#'+row['id']).addClass('ui-btn-active');
									}); 
									if(event.target.tagName !== "TEXTAREA" && (event.target.tagName !== "IMG" && event.target.className !== "draggable")){
										new $.actions(pagedef, row, JSON.parse(JSON.stringify(grprow['events']['Tap']).slice())).execute();
									}
								}
							}
						}

					});
			
				if(grprow['events']['flickRL']){
					$('#'+row['id']).on("swipeleft",function(event){
						if (alreadySwiped)
						{
							alreadySwiped=false; // reset
							clearTimeout(alreadySwipedTimeout); // prevent this from happening
							// do what needs to happen on double click. 
						}
						else
						{
							alreadySwiped=true;
							alreadySwipedTimeout=setTimeout(function(){
								alreadySwiped=false; // reset when it happens
								// do what needs to happen on single click. 
							},300); // <-- dblclick tolerance here
							if(event.target.tagName !== "INPUT"){
								if(event.target.tagName === "LABEL"){
									if(event.target.htmlFor.length>0){
									}
									else {
										$.each(grprow['events']['flickRL'],function(i,action){
											if(action['category']==='PageAction') 
												$('#'+row['id']).addClass('ui-btn-active');
										}); 
										new $.actions(pagedef, row, JSON.parse(JSON.stringify(grprow['events']['flickRL']).slice())).execute();
									}
								}
	
								else {
									$.each(grprow['events']['flickRL'],function(i,action){
										if(action['category']==='PageAction') 
											$('#'+row['id']).addClass('ui-btn-active');
									}); 
									new $.actions(pagedef, row, JSON.parse(JSON.stringify(grprow['events']['flickRL']).slice())).execute();
								}
							}
						}
	
					});
				}
				if(grprow['events']['flickLR']){
					$('#'+row['id']).on("swiperight",function(event){
						if (alreadySwiped)
						{
							alreadySwiped=false; // reset
							clearTimeout(alreadySwipedTimeout); // prevent this from happening
							// do what needs to happen on double click. 
						}
						else
						{
							alreadySwiped=true;
							alreadySwipedTimeout=setTimeout(function(){
								alreadySwiped=false; // reset when it happens
								// do what needs to happen on single click. 
							},300); // <-- dblclick tolerance here
							if(event.target.tagName !== "INPUT"){
								if(event.target.tagName === "LABEL"){
									if(event.target.htmlFor.length>0){
									}
									else {
										$.each(grprow['events']['flickLR'],function(i,action){
											if(action['category']==='PageAction') 
												$('#'+row['id']).addClass('ui-btn-active');
										}); 
										new $.actions(pagedef, row, JSON.parse(JSON.stringify(grprow['events']['flickLR']).slice())).execute();
									}
								}

								else {
									$.each(grprow['events']['flickLR'],function(i,action){
										if(action['category']==='PageAction') 
											$('#'+row['id']).addClass('ui-btn-active');
									}); 
									new $.actions(pagedef, row, JSON.parse(JSON.stringify(grprow['events']['flickLR']).slice())).execute();
								}
							}
						}

					});
				}
				
			}
		};
		
		return row;
	};
	
})(jQuery);