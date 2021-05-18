(function($){
	$.uitable = function(pagedef, child){
		var table = {};

		new Table(pagedef, table, child);
		
		return table;
	};
	
	function Table(pagedef, table, child){
		table['group'] = [];
		
		$.each(child['group'],function(i,group){
			table['group'].push(new Group(pagedef, child['id'], group, i));
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
			var showMore = false;
			var emptyListMsg = "";
			if(pagedef['toolbarleft'] && pagedef['toolbarleft']['fixed'] != undefined && pagedef['toolbarleft']['fixed'])
				emptyListMsg = emptyListMsg = "<div id='empty_list' style='font-size: 20px;opacity: .5;text-align: center;color: gray;position:absolute;left:calc(35% - 82px);top:80px;visibility:hidden;'>No records to display</div>";
			else
				emptyListMsg = emptyListMsg = "<div id='empty_list' style='font-size: 20px;opacity: .5;text-align: center;color: gray;position:absolute;left:calc(50% - 82px);top:80px;visibility:hidden;'>No records to display</div>";
			if($.utility('getDelayedChangeCondition',pagedef['name']) === false){
				if($.utility("isReverseTransition") && pagedef['type'] == "RemoteTableViewList"){
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
				}else 
				if(pagedef['type'] == "DBTableViewList"){
					new $.actions(pagedef, null, [{method:"NumRecords", category:"DBAction",
						params:{
							table: pagedef['data']['tablename'],
							where: pagedef['data']['wherecond'],
							order: pagedef['data']['order'],
							fields:""
						}
					}]).execute();
				}
			}
			
//			if(pagedef['type'] == "RemoteTableViewList" && pagedef['data']['contents'].length >= 25 && !pagedef['data']['contents']['allRecordsLoaded'])
//				showMore = true;
//			if(pagedef['type'] == "DBTableViewList" && pagedef['data']['contents'].length !=0 && (pagedef['data']['contents'].length % 25) == 0  && !pagedef['data']['contents']['allRecordsLoaded'])
//				showMore = true;
//			if(showMore){
//				showMoreButton = "<fieldset id='showmore' style='visibility:hidden;max-width:400px;margin:auto'> <input id='showmore'  type='button' value='"+value+"' class=ui-btn-hidden aria-disabled=false /></fieldset>";
//			}
			if($('#pagination-container').length === 0)
				var pagination = "<div id='pagination-container'><p id='paginationMsg'></p></div>";
//			if((pagedef['type'] == "RemoteTableViewList" && (pagedef['data']['contents']['totalRecords'] == 25 || pagedef['data']['contents'].length ==25)) || (pagedef['type'] == "DBTableViewList" && pagedef['data']['contents'].length ==25)){
//				showMoreButton = "<fieldset id='showmore' style='visibility:hidden;max-width:400px;margin:auto'> <input id='showmore'  type='button' value='"+value+"' class=ui-btn-hidden aria-disabled=false /></fieldset>";
//			}
			return ["<div id='", child['id'], "' "+DBTableViewListGroupedStyle+" class='ui-table-position' style='visibility:hidden'>",
			        _table.join(''),
			        showMoreButton,
			        emptyListMsg,
			        pagination,
			        "</div>"].join('');
		};
		
		table.applyOverrides = function(){
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
					$.fn.center = function () {
					    this.css("position", "absolute");
					    this.css("top", ($(window).height() - this.height()) / 2 + $(window).scrollTop() + "px");
					    this.css("left", ($(window).width() - this.width()) / 2 + $(window).scrollLeft() + "px");
					    return this;
					}
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
					$('.blockUI.blockMsg').center();
					
					var baseId = $("#"+pagedef['children'][0]['id']+" ul").attr('id');
					$.utility('showLoadingIndicator', true);
					pagedef['data']['contents']['loaded'] = false;
					var initialContentLength = pagedef['data']['contents'].length;
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
  					else if(pagedef['type'] == "DBTableViewList")//Richa
  					{
  						new $.actions(pagedef, null, [{method:"Select", category:"DBAction", callback : "loadMoreRecords",
  							params:{
  								tablename:pagedef['data']['tablename'], 
  								where:pagedef['data']['wherecond'], 
  								order:pagedef['data']['order'],
//  								offset: (parseInt(pagedef['data']['contents']['offset']) + 25),
//  								limit : 25,
  								columns:""
  							}
  						}]).execute();
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
//									$(".scroller").css({"height" : (parseFloat($("#"+pagedef['children'][0]['id']).css("height").replace("px","")) + 20) + "px"});
								}
								

								if($.mobileweb.device['type'] === 'Desktop'){
									$('#iscroll_'+pagedef['name']).css({'overflow-y':'scroll','overflow-x':'hidden'});
									var style_track = $('<style>$("#iscroll_" '+pagedef['name']+')::-webkit-scrollbar-track{-webkit-box-shadow: inset 0 0 16px rgba(,1);border-radius: 10px;background-color: #F5F5F5;}</style>');
									$('html > head').append(style_track);
									var style_bar = $('<style>$("#iscroll_" '+pagedef['name']+')::-webkit-scrollbar{width: 7px;background-color: #F5F5F5;}</style>');
									$('html > head').append(style_bar);
									var style_thumb =$('<style>$("#iscroll_" '+pagedef['name']+')::-webkit-scrollbar-thumb{border-radius: 10px;-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);background-color: #808080;}</style>');
									$('html > head').append(style_thumb);//--
								}else{
									pagedef['iscroll'] = {};
									$("#iscroll_" + pagedef['name'] + "> div:nth-child(2)").remove();
									pagedef['iscroll'] = new iScroll($('#iscroll_'+pagedef['name']).get(0), {
//										useTransform: false,
										bounceLock: true,
										onBeforeScrollStart: function (e) {
											var target = e.target;
											while (target.nodeType != 1) target = target.parentNode;
												if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
													e.preventDefault();
										}
									});
								}
								
//								pagedef['iscroll'] = {};
//								$("#iscroll_" + pagedef['name'] + "> div:nth-child(2)").remove();
//								pagedef['iscroll'] = new iScroll($('#iscroll_'+pagedef['name']).get(0), {
////									useTransform: false,
//									bounceLock: true,
//									onBeforeScrollStart: function (e) {
//										var target = e.target;
//										while (target.nodeType != 1) target = target.parentNode;
//											if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
//												e.preventDefault();
//									}
//								});
								
								if($.utility('getSessionData',"offset")!=null)
								{
									var offset = $.utility('getSessionData',"offset");
									offset = $.parseJSON(offset);		
									if($.mobileweb.getCurrentPage().getName()==offset["page_name"])
									{
										pagedef['iscroll'].scrollTo(0, offset["x"], 1);
									}
								}
								
								$.unblockUI();
							});
							if(pagedef['data']['contents']['allRecordsLoaded']){
								$("#showmore").remove();
							}
						}else if(pagedef['type'] == "DBTableViewList"){//Richa
 							clearInterval(myVar);
 							$.createRemoteDBListViewPageRows(pagedef, function(){
 								var contents = [];
 								if(pagedef['data']['contents'][0].constructor == Object){
 									contents = pagedef['data']['contents'];
 								}else{
 									contents = pagedef['data']['contents'][0];
 								}
// 								var noOFNewRowsAdded = contents.length;
 								var contentRemaining  = contents.length - $(".scroller").find('ul').children("li").length;
 								if(contentRemaining > 25)
 									noOFNewRowsAdded = 25;
 								else
 									noOFNewRowsAdded = contentRemaining;
 								if(noOFNewRowsAdded < 25 ){
 									$("#showmore").remove();
 									pagedef['data']['contents']['allRecordsLoaded'] = true;
 								}
 								var allRowHeight = 0;
 								for(var k = 0; k < noOFNewRowsAdded; k++){
 									var rowLength = pagedef['children'][0]['group'][0]['row'].length;
 									var rownum = $(".scroller").find('ul').children("li").length;
// 									if(rowLength - rownum <= 25)
// 										$("#showmore").remove();
 									$.createRow(pagedef,baseId,pagedef['children'][0]['group'][0]['row'][rownum],rownum,function(row){
 										allRowHeight = allRowHeight + row.getCellHeight();
 										allRowHeight = allRowHeight + 2;
 										pagedef['children'][0]['group'][0]['row'][rownum] = row;
// 										pagedef['children'][0]['group'][0]['row'].push(pagedef['children'][0]['group'][0]['row'][rownum]);
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

 								if($.mobileweb.device['type'] === 'Desktop'){
									$('#iscroll_'+pagedef['name']).css({'overflow-y':'scroll','overflow-x':'hidden'});
 								}else{
 									pagedef['iscroll'] = {};
 	 								$("#iscroll_" + pagedef['name'] + "> div:nth-child(2)").remove();
 	 								pagedef['iscroll'] = new iScroll($('#iscroll_'+pagedef['name']).get(0), {
// 	 									useTransform: false,
 	 									bounceLock: true,
 	 									onBeforeScrollStart: function (e) {
 	 										var target = e.target;
 	 										while (target.nodeType != 1) target = target.parentNode;
 	 											if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
 	 												e.preventDefault();
 	 									}
 	 								});
 								}
 								$.unblockUI();
 							});//--
						}
					},300);
				});
			}else{
				
				// For Accordion view header, if 'icon' assign then below code. 	Dated:16-Feb-2018
				$('.ui-collapsible-heading').click(function(event){
					$.unblockUI();
					var thisclass = $(this).attr('class');
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
								$('#'+$(this).attr('id')+'  > a > span > span.ui-icon').css({'background-size':'18px 18px'});
							}else
								$('#'+$(this).attr('id')+' > a > span > span.ui-icon').css({'background-image':''});
							
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
//			row['gap'] = tblgroup['gap'] 
//			row['showCurrentRadius'] = tblgroup['showCurrentRadius']
//			row['showDivider'] = tblgroup['showDivider']
			group['row'].push(new Row(pagedef, group['id'], row, i, tblgroup['flexibleHeight']));
		});
		
		group.getHTML = function(){
			var groupedStyle = (pagedef['children'][0]['tablestyle']=="Grouped") ? "style='padding:3px;'" : "";
			var tableStyle = (pagedef['children'][0]['tablestyle']=="Grouped") ? "true" : "false";
			var _table = '';
			
			if((pagedef['type'] === "TableView") && (pagedef['children'][0]['accordion'])){
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
				
				_table = _table.concat(
						["</ul>", 
						 "<div id='", group['id'], "-footer'>", 
							"<p class='ui-table-footer-text'>", tblgroup['footer'], "&nbsp</p>",
						 "</div>",
						 "</div>"	// closing DIV for collapsible..
						 ]);
				
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
			if(pagedef['type'] == "RemoteTableViewList" && pagedef['data']['contents'].length >= 25){
				//Bloack screen ---TSL app
				
				$.fn.center = function () {
				    this.css("position", "absolute");
				    this.css("top", ($(window).height() - this.height()) / 2 + $(window).scrollTop() + "px");
				    this.css("left", ($(window).width() - this.width()) / 2 + $(window).scrollLeft() + "px");
				    return this;
				}
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
				$('.blockUI.blockMsg').center();
			}
			if((pagedef['type'] === "RemoteTableViewList") || (pagedef['type'] === "TableViewList") || (pagedef['type'] === "DBTableViewList"))
				$.utility('showLoadingIndicator',true);
			if(pagedef['children']['tablestyle'] == "Grouped"){
				$('#' + group['id']).css({'padding':'2px','border':'1px solid'});
				if(group['row'][0]['backgroundColor'] != undefined){
					$('#' + group['id']).css({'background-color':$.attributes('color', group['row'][0]['backgroundColor']).getColorCode()});
				}
			}
			
			$('#' + group['id']).css({'width':pagedef['width'] * $.mobileweb.device['aspectWratio'], 'margin':"-17px 0px 0px"});
			$('#' + group['id']+ '-header .ui-table-header-text').css({'font-size':16 * $.mobileweb.device['aspectratio'],'margin-left':(10*$.mobileweb.device['aspectWratio'])});
			//$('#' + group['id']+ '-footer').css({'padding-top':'inherit'})
			$('#' + group['id']+ '-footer .ui-table-footer-text').css({'font-size':16 * $.mobileweb.device['aspectratio'],'margin-left':(10*$.mobileweb.device['aspectWratio']),'margin-top':(1*$.mobileweb.device['aspectHratio'])});
			if((pagedef['type'] === "TableViewList") || (pagedef['type'] === "DBTableViewList") || (pagedef['type'] === "RemoteTableViewList"))
				$('#' + group['id']+ ' .ui-icon').css({'z-index':99});
			
//			if(pagedef['children'][0]['padding'] != undefined && pagedef['children'][0]['padding'] != ""){//Table padding
//				$('.ui-table-position').css({'padding':pagedef['children'][0]['padding'] + 'px'});
//				var ul_width =  parseFloat($('#' + group['id']).css('width'));
//				$('#' + group['id']).css({'width':(ul_width - (2 * pagedef['children'][0]['padding'])) + 'px'});
//			}
			
			var timerTime = ((pagedef['type'] === "RemoteTableViewList") || (pagedef['type'] === "TableViewList") || (pagedef['type'] === "DBTableViewList")) ? 1250 : 100;
			
			// Fixed DataSet TableView is removed from timer(Below) module.. cause I think it is not required.. Akhil
			if((pagedef['type'] == "DBTableView")||(pagedef['type'] == "RemoteTableView")){
				var _page = $.utility('getObject',$.mobileweb['pages'],'name',pagedef['parent']);
				if(($.isEmptyObject(_page)) || (_page == undefined) || ((_page['type']!= 'DBTableViewList') && (_page['type']!= 'RemoteTableViewList'))) {
					timerTime=700;		
				}
			}	
			
			setTimeout(function(){
				if($.utility('getDelayedChangeCondition',pagedef['name']) === false){
					if($('#pagination-container').length === 0)
						$("#"+pagedef['children'][0]['id']).append("<div id='pagination-container'><p id='paginationMsg'></p></div>")
					if(group['id'].indexOf("ui-more") > -1) {
						$.each(group['row'],function(i,row){
							row.applyOverrides();
						});		
						setTimeout(function(){
							if($.mobileweb.device['type'] === 'Desktop'){
									$(".bglayout").css({"height" : parseFloat($(".scroller").find('ul').css('height')) + 80 + "px"});
									$(".scroller").css({"height" : parseFloat($(".scroller").find('ul').css('height')) + 80 + "px"});
									$('#iscroll_'+pagedef['name']).css({'overflow-y':'scroll','overflow-x':'hidden'});
								}else{
									pagedef['iscroll'] = {};
									$("#iscroll_" + pagedef['name'] + "> div:nth-child(2)").remove();
									pagedef['iscroll'] = new iScroll($('#iscroll_'+pagedef['name']).get(0), {
										bounceLock: true,
										onBeforeScrollStart: function (e) {
											var target = e.target;
											while (target.nodeType != 1) target = target.parentNode;
												if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
													e.preventDefault();
										}
									});								
								}			
						},200);	
					}
					var _totalRecords = $.mobileweb['__NUMREC__'];
					if(pagedef['type'] === "RemoteTableViewList" || pagedef['type'] === "DBTableViewList")
						_totalRecords = $.mobileweb['__PAGENUMREC__'];
					if(_totalRecords === 0){
						$('#empty_list').css({'visibility':'visible'});
						return;
					} 
					if(pagedef['data'] && pagedef['data']['contents'].length != 0){
						function renderTableRows() {
							var baseId = $("#"+pagedef['children'][0]['id']+" ul").attr('id');
							$("#"+baseId+" li").remove();
							var contents = [];
							if(pagedef['data']['contents'][0].constructor == Object){
								contents = pagedef['data']['contents'];
							}else{
								contents = pagedef['data']['contents'][0];
							}

							$.createRemoteDBListViewPageRows(pagedef, function(){
								var allRowHeight = 0;
								var baseId = $("#"+pagedef['children'][0]['id']+" ul").attr('id');
								$.each(contents, function(rownum, item) {
									$.createRow(pagedef,baseId,pagedef['children'][0]['group'][0]['row'][rownum],rownum,function(row){
										allRowHeight = allRowHeight + row.getCellHeight();
										allRowHeight = allRowHeight + 2;
										pagedef['children'][0]['group'][0]['row'][rownum] = row;
//										pagedef['children'][0]['group'][0]['row'].push(pagedef['children'][0]['group'][0]['row'][rownum]);
										$(".scroller").find('ul').first().append(pagedef['children'][0]['group'][0]['row'][rownum].getHTML().join(''));
										pagedef['children'][0]['group'][0]['row'][rownum].applyOverrides();
										pagedef['children'][0]['group'][0]['row'][rownum].applyEvents();
									});
								});
							

								$.utility('showLoadingIndicator', false);
								$(".scroller").find('ul').unblock();
								$('.ui-loader').css({'display': 'none'});
								
								var pageclientH = 0;
								if($('#iscroll_'+pagedef['name'])[0] != undefined)
									pageclientH = $('#iscroll_'+pagedef['name'])[0].clientHeight;
								
								if(pageclientH > 0 && (pageclientH < parseFloat($(".scroller").find('ul').css('height')))){
									if(allRowHeight - parseFloat($(".scroller").find('ul').css('height')) < 60){
										$(".bglayout").css({"height" : allRowHeight + 60 + "px"});
										$(".scroller").css({"height" : allRowHeight + 60 + "px"});
									}else{
										$(".bglayout").css({"height" : allRowHeight + "px"});
										$(".scroller").css({"height" : allRowHeight + "px"});
									}
									
									if($.mobileweb.device['type'] === 'Desktop'){
										$('#iscroll_'+pagedef['name']).css({'overflow-y':'scroll','overflow-x':'hidden'});
//										$('#iscroll_'+page['name']).animate({ scrollTop: 0 }, "fast");
									}
								}else{
									$('#iscroll_'+pagedef['name']).css({'overflow-y':'hidden','overflow-x':'hidden'});
									$('.bglayout').css({'height': pageclientH + 60 +'px'});
									$(".scroller").css({"height" : pageclientH + 60 + 'px'});
								}
								

								if($.mobileweb.device['type'] === 'Desktop'){
									$('#iscroll_'+pagedef['name']).css({'overflow-y':'scroll','overflow-x':'hidden'});
//									$('#iscroll_'+pagedef['name']).animate({ scrollTop: 0 }, "fast");
								}else{
									pagedef['iscroll'] = {};
									$("#iscroll_" + pagedef['name'] + "> div:nth-child(2)").remove();
									pagedef['iscroll'] = new iScroll($('#iscroll_'+pagedef['name']).get(0), {
//											useTransform: false,
										bounceLock: true,
										onBeforeScrollStart: function (e) {
											var target = e.target;
											while (target.nodeType != 1) target = target.parentNode;
												if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
													e.preventDefault();
										}
									});								
								}
								
								$.unblockUI();
							});
						}
						
						function renderPaginationContainer(limit){
							$('#pagination-container').bootpag({
					            total: (_totalRecords != undefined) ? Math.ceil(_totalRecords / limit) : 0,
					            maxVisible: 4,
					            page: (pagedef['selectedPage'] != undefined) ? pagedef['selectedPage'] : 1,
					            firstLastUse: true,
					            leaps: false
					        }).off("page").on("page", function(event, pageNum) {
								var offset = limit * (pageNum- 1);	
								pagedef['selectedPage'] = pageNum;
								if(pagedef['type'] == "RemoteTableViewList"){
									new $.actions(pagedef, null, [{method:"Select", category:"ComAction",
			  							params:{
			 								servicename: pagedef['data']['servicename'],
			 								table: pagedef['data']['tablename'],
			 								where: pagedef['data']['wherecond'],
			 								order: pagedef['data']['order'],
			 								offset: offset,
			  								limit : limit,
			  								fields:""
			  							}
			  						}]).execute();
								}else if(pagedef['type'] == "DBTableViewList"){
			  						new $.actions(pagedef, null, [{method:"Select", category:"DBAction",
			  							params:{
			  								tablename:pagedef['data']['tablename'], 
			  								where:pagedef['data']['wherecond'], 
			  								order:pagedef['data']['order'],
			  								offset: offset,
			  								limit : limit,
			  								columns:""
			  							}
			  						}]).execute();
			  					}
								
								var myVar=setInterval(function() {
									if(pagedef['data']['contents']['offset'] == offset){
										clearInterval(myVar);
										renderTableRows();
										if(_totalRecords >=  (limit * (pageNum)))
											$('#paginationMsg').html('Showing ' + ((limit * (pageNum- 1)) + 1) + '-' + (limit * (pageNum)) + ' of ' + _totalRecords + ' items');
										else
											$('#paginationMsg').html('Showing ' + ((limit * (pageNum- 1)) + 1) + '-' + _totalRecords + ' of ' + _totalRecords + ' items');
									}
								}, 500);
							});
							
						}
					
						var _limit =  (pagedef['data']['contents']['limit'] !== undefined) ? pagedef['data']['contents']['limit'] : 25;
						renderPaginationContainer(_limit);
						var myVar=setInterval(function() {
							clearInterval(myVar);
							renderTableRows();
						}, 300);
//						renderTableRows();
						if(_totalRecords >= 25)
							$('#paginationMsg').html('Showing 1-25 of ' + _totalRecords + ' items');
						else
							$('#paginationMsg').html('Showing 1-'+_totalRecords+' of ' + _totalRecords + ' items');
						if($('#recordsLength').length === 0){
							$('#pagination-container').append("<select id='recordsLength'> <option value='10'>10/Page</option><option value='25' selected='selected'>25/Page</option> <option value='50'>50/Page</option></select>")
							$('#recordsLength').val(_limit);
							var _left = parseFloat($('#paginationMsg').css('width'));
							if(pagedef['data']['contents'].length < _limit)
								$('.pagination').css({'visibility' : 'hidden'});
							else{
								_left = parseFloat($('#paginationMsg').css('width')) + parseFloat($('.pagination').css('width')) + 5;
								$('.pagination').css({'visibility' : 'visible'});
							}
							$('#recordsLength').css({'left': _left + "px" });
							$('#recordsLength').on("change",function(e){
								var limit =  parseInt($('#recordsLength').val());
								if(pagedef['data']['contents'].length < limit)
									$('.pagination').css({'visibility' : 'hidden'});
								else{
									_left = parseFloat($('#paginationMsg').css('width')) + parseFloat($('.pagination').css('width')) + 5;
									$('.pagination').css({'visibility' : 'visible'});
								}
								$('#recordsLength').css({'left': _left + "px" });
								var offset = 0;
								if(pagedef['type'] == "RemoteTableViewList"){
									new $.actions(pagedef, null, [{method:"Select", category:"ComAction",
			  							params:{
			 								servicename: pagedef['data']['servicename'],
			 								table: pagedef['data']['tablename'],
			 								where: pagedef['data']['wherecond'],
			 								order: pagedef['data']['order'],
			 								offset: offset,
			  								limit : limit,
			  								fields:""
			  							}
			  						}]).execute();
								}else if(pagedef['type'] == "DBTableViewList"){
			  						new $.actions(pagedef, null, [{method:"Select", category:"DBAction", 
			  							params:{
			  								tablename:pagedef['data']['tablename'], 
			  								where:pagedef['data']['wherecond'], 
			  								order:pagedef['data']['order'],
			  								offset: offset,
			  								limit : limit,
			  								columns:""
			  							}
			  						}]).execute();
			  					}
								var myVar=setInterval(function() {
									if(pagedef['data']['contents']['offset'] == offset){
										clearInterval(myVar);
										renderPaginationContainer(limit);
										renderTableRows();
										if(_totalRecords >=  limit)
											$('#paginationMsg').html('Showing ' + (offset + 1) + '-' + limit  + ' of ' + _totalRecords + ' items');
										else
											$('#paginationMsg').html('Showing ' + (offset + 1) + '-' + _totalRecords  + ' of ' + _totalRecords + ' items');
									}
								}, 500);
							});
						}else{
							var _left = parseFloat($('#paginationMsg').css('width'));
							if(pagedef['data']['contents'].length < _limit)
								$('.pagination').css({'visibility' : 'hidden'});
							else{
								_left = parseFloat($('#paginationMsg').css('width')) + parseFloat($('.pagination').css('width')) + 5;
								$('.pagination').css({'visibility' : 'visible'});
							}
							$('#recordsLength').css({'left': _left + "px" });
						} 			
					}

					setTimeout(function(){
						$(".ui-table-position").css({'visibility':'visible'});
					},500);
					
					if(pagedef['data'] && pagedef['data']['contents'].length === 0)
						$('#empty_list').css({'visibility':'visible'});
				}else{
					setTimeout(function(){
						$.utility('setDelayedChangeCondition',pagedef['name'],false);
//						$(".ui-table-position").css({'visibility':'visible'});
					},300)
				}		
				
				$("#showmore").css({'visibility':'visible'});
				if((pagedef['type'] === "RemoteTableViewList") || (pagedef['type'] === "TableViewList") || (pagedef['type'] === "DBTableViewList")){
					$.utility('showLoadingIndicator',false);
				}
				
				if(pagedef['type'] === "RemoteTableViewList" && !$.utility('getDelayedChangeCondition',pagedef['name'])) //Bug #13922 Fix
					$.unblockUI();
				
				if((pagedef['type'] === "TableViewList"|| (pagedef['type'] === "DBTableView")||pagedef['type'] === "DBTableViewList" || pagedef['type'] === "RemoteTableViewList") && pagedef['children'][0]['tablestyle']=="Grouped" ){
					$('#' + group['id']).css({'width':(pagedef['width']-40)* $.mobileweb.device['aspectWratio'], 'margin-right':20* $.mobileweb.device['aspectWratio'],'margin-left':20* $.mobileweb.device['aspectWratio']});
				}
				
				// Setting CSS for TableView-Collapsible only....
//				if((pagedef['type'] === "TableView") && (pagedef['children'][0]['accordion'])){
//					$("div[data-role='collapsible']").css({'width':pagedef['width'] * $.mobileweb.device['aspectratio'], 'margin':'1px'});
//					$('#' + group['id']).css({'margin':'0px 0px 0px 0px', 'width':(pagedef['width'] * $.mobileweb.device['aspectratio']) - 35});
//				}else if((pagedef['type'] === "TableView") && (!pagedef['children'][0]['accordion'])){
//					$('#' + group['id']).css({'width':(pagedef['width'] * $.mobileweb.device['aspectratio']) + "px", 'margin-left':'0px'});
//				}
				
				if(pagedef['type'] === "TableView"){
					var aspect = $.mobileweb.device['aspectratio'];
					var groupedPad = $('#' + group['id']).css('padding').replace('px','')*2;
					if(pagedef['children'][0]['accordion']){
						
						$("div[data-role='collapsible']").css({'width':pagedef['width'] *$.mobileweb.device['aspectWratio'], 'margin-top':'0px', 'margin-bottom':(4*$.mobileweb.device['aspectHratio'])});
						$('.ui-collapsible-content').css({'padding':'0px 0px 0px'});
						$('.ui-collapsible-content > .ui-listview').css({'margin':'0px 0px 0px'});
						$('.ui-collapsible-heading-toggle').css({'border-radius':'1px'});
						
						var accordionHeader = pagedef['children'][0]['accordionheader'];
						if(accordionHeader){
							$('.ui-collapsible-heading-toggle').css({'background':$.attributes('color', accordionHeader['bgcolor']).getColorCode(), 'color':$.attributes('color', accordionHeader['textcolor']).getColorCode()});
							$('.ui-collapsible-heading-toggle').css({'height':accordionHeader['height']*$.mobileweb.device['aspectHratio'], 'padding': '0px 0px 0px'});
							//$('.ui-collapsible-heading-toggle > span').css({'margin-top': (accordionHeader['height']-16)*aspect/2, 'padding-top': '0px'});
							//$('.ui-btn-inner').css({'padding-top': (accordionHeader['height']-16)*aspect/2});
							$('.ui-collapsible-heading-toggle > span').css({'height':accordionHeader['height']*$.mobileweb.device['aspectHratio'],'padding': '0px 0px 0px'});
							$('.ui-collapsible-heading-toggle > span > span.ui-btn-text').css({'font-size': 16*aspect,top: (accordionHeader['height']-16)*$.mobileweb.device['aspectHratio']/2});
							
							if(accordionHeader['iconposition'] == "right"){
								$('.ui-collapsible-heading-toggle > span').css({'padding-left':'12px'});
								$('.ui-collapsible-heading-toggle > span > span.ui-icon').css({'right':'10px','left':'auto'});
							}else{
								$('.ui-collapsible-heading-toggle > span').css({'padding-left':'40px'});
							}
							
							if(accordionHeader['openicon']){
								$('.ui-collapsible-heading > a > span > span.ui-icon').attr('class','ui-icon');				// since default class is not allowing to set 'open' icon, so i have to overide it. Dated:16-Feb-2018
								var iconOpen= $.utility('getImage', $.utility('tokenizeString',accordionHeader['openicon'],pagedef));
								$('.ui-collapsible-heading > a > span > span.ui-icon').css({'background-image':'url('+iconOpen+')'});
								$('.ui-collapsible-heading > a > span > span.ui-icon').css({'background-size':'18px 18px'});
							}
						}
						
						if(pagedef['children'][0]['tablestyle']!="Grouped")
							groupedPad = 0;
						$('#' + group['id']).css({'width':(pagedef['width'] * $.mobileweb.device['aspectWratio']) - groupedPad, 'margin':'0px'});
					}else{
						
						if(pagedef['children'][0]['tablestyle']!="Grouped")
							groupedPad = 0;
						$('#' + group['id']).css({'width':((pagedef['width'] * $.mobileweb.device['aspectWratio'])-groupedPad) + "px", 'margin-left':'0px'});
					}
				}
				
				if(pagedef['type'] === "DBTableView" || pagedef['type'] === "DBTableViewList" || pagedef['type'] === "RemoteTableView" || pagedef['type'] === "RemoteTableViewList"){
					// In case of flexible rows, introducing scroll bar. Need to improve this.
					if($('#iscroll_'+pagedef['name'])[0] != undefined){
						var pageclientH = $('#iscroll_'+pagedef['name'])[0].clientHeight;
//						if(pageclientH > 0 && (pageclientH < $(".scroller")[0].scrollHeight)){
//							$('.bglayout').css({'height': $(".scroller")[0].scrollHeight+'px'});
//							$(".scroller").css({"height" : $(".scroller")[0].scrollHeight+ "px"});
//						}
						
						if(pageclientH > 0 && (pageclientH < parseFloat($(".scroller").find('ul').css('height')))){
							$('.bglayout').css({'height': parseFloat($(".scroller").find('ul').css('height'))+ 100 +'px'});
							$(".scroller").css({"height" : parseFloat($(".scroller").find('ul').css('height')) + 100+ "px"});
							
							if($.mobileweb.device['type'] === 'Desktop'){
								$('#iscroll_'+pagedef['name']).css({'overflow-y':'scroll','overflow-x':'hidden'});
								var style_track = $('<style>$("#iscroll_" '+pagedef['name']+')::-webkit-scrollbar-track{-webkit-box-shadow: inset 0 0 16px rgba(,1);border-radius: 10px;background-color: #F5F5F5;}</style>');
								$('html > head').append(style_track);
								var style_bar = $('<style>$("#iscroll_" '+pagedef['name']+')::-webkit-scrollbar{width: 7px;background-color: #F5F5F5;}</style>');
								$('html > head').append(style_bar);
								var style_thumb =$('<style>$("#iscroll_" '+pagedef['name']+')::-webkit-scrollbar-thumb{border-radius: 10px;-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);background-color: #808080;}</style>');
								$('html > head').append(style_thumb);//--
							}else{
								pagedef['iscroll'] = {};
								$("#iscroll_" + pagedef['name'] + "> div:nth-child(2)").remove();
								pagedef['iscroll'] = new iScroll($('#iscroll_'+pagedef['name']).get(0), {
//									useTransform: false,
									bounceLock: true,
									onScrollEnd: function() {
										curScrollPos = $(this).get(0).y;
										var offset = {page_name:pagedef['name'],x:curScrollPos};
										$.utility('setSessionData',offset,"offset");
									},
									onBeforeScrollStart: function (e) {
										var target = e.target;
										while (target.nodeType != 1) target = target.parentNode;
											if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
												e.preventDefault();
									}
								});
							}
						}else{
							$('.bglayout').css({'height': pageclientH + 60 +'px'});
							$(".scroller").css({"height" : pageclientH + 60 + "px"});
						}
						//refresh page-scroll bar.
//						pagedef['iscroll'] = {};
//						$("#iscroll_" + pagedef['name'] + "> div:nth-child(2)").remove();
//						pagedef['iscroll'] = new iScroll($('#iscroll_'+pagedef['name']).get(0), {
////							useTransform: false,
//							bounceLock: true,
//							onScrollEnd: function() {
//								curScrollPos = $(this).get(0).y;
//								var offset = {page_name:pagedef['name'],x:curScrollPos};
//								$.utility('setSessionData',offset,"offset");
//							},
//							onBeforeScrollStart: function (e) {
//								var target = e.target;
//								while (target.nodeType != 1) target = target.parentNode;
//									if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
//										e.preventDefault();
//							}
//						});
//						if($.utility('getSessionData',"offset")!=null)
//						{
//							var offset = $.utility('getSessionData',"offset");
//							offset = $.parseJSON(offset);		
//							if($.mobileweb.getCurrentPage().getName()==offset["page_name"])
//							{								
//								pagedef['iscroll'].scrollTo(0, offset["x"], 1);								
//							}
//						}
					}
				}
				
			},timerTime);
		};
		
		group.applyEvents = function(){
			$.each(group['row'],function(i,row){
				row.applyEvents();
			});
		};
		var selectedIndices = []
		
		return group;
	};
	
	function Row(pagedef, id, grprow, index, isFlexible){
		var row = {id: id + '-row-' + index,
				   rownum: grprow['rownum'],
				  // children: new $.uichildren(pagedef, grprow['children'], grprow['data']['contents'][0]),
				   backgroundColor : grprow['backgroundColor'],
				   repeatImage : grprow['repeatImage'],
				   isFlexible : isFlexible,
				   selected:false,
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
 			
 			if(currpage['children'][0]['group'][0]['row'].length != pagedef['children'][0]['group'][0]['row'].length){
 				row['children'] = new $.uichildren(pagedef, grprow['children'], grprow['data']['contents'][0]);
 			}else{
 				if(pagedef['type'] === "RemoteTableViewList")
 					row['children'] = new $.uichildren(pagedef, grprow['children'], grprow['data']['contents'][0]);
 				else{
 					if(currpage != undefined){
 	 	 				var pageRow;
 	 	 				if(currpage['children'] != undefined && currpage['children'][0] != undefined)
 	 	 					pageRow = currpage['children'][0]['group'][0]['row'][grprow['rownum']];
 	 	 					
 	 	 				if(pageRow != undefined)
 	 	 					row['children'] = pageRow['children'];
 	 	 				else
 	 	 					row['children'] = [];
 	 	 			}
 	 	 			else
 	 	 				row['children'] = [];
 				}
 			}
 			
// 			if(currpage != undefined){
// 				var pageRow;
// 				if(currpage['children'] != undefined && currpage['children'][0] != undefined)
// 					pageRow = currpage['children'][0]['group'][0]['row'][grprow['rownum']];
// 					
// 				if(pageRow != undefined)
// 					row['children'] = pageRow['children'];
// 				else
// 					row['children'] = [];
// 			}
// 			else
// 				row['children'] = [];
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
			if(row['children'].length > 0){
				return ["<li data-icon='", grprow['icon']['style'], "'>", 
					"<a href='#' data-item='", grprow['icon']['style'], "'id='", row['id'], "' class='ui-table-padding'>",
						"<div class='ui-table-row-size' style='visibility:hidden'>",
							row['children'].getHTML(),
						"</div>",
					"</a>", //change this to DIV for the flat style
					(grprow['icon']['events']) ? ["<div id='", row['id'], "-icon'>","</div>"].join(''): '',
				"</li>"];
			}else{
				return [];
			}
		
		};
		
		row.applyOverrides = function(){
			row.setCellHeight(grprow['rowsize']);
			if(row['children'].length > 0){
				$.utility("setReverseTransition", false);
				row['children'].applyOverrides();
				$.utility("setReverseTransition", true);
				row['children'].applyEvents();
			}
			
			$('#'+row['id']+' .ui-table-row-size').css({'visibility':'visible'});
			$('#'+row['id']).data('item',grprow['data']['contents'][0]);
			
//			Below Code is for removing the border space from rows..
//			if(!grprow['showDivider'])
			$('.ui-li').css({'border-top-width':'0px','border-bottom-width':'0px'});
//			if(grprow['gap'] != undefined)
//				$('.ui-li').css({'margin-bottom':grprow['gap'] + 'px'});
//			if(grprow['showCurrentRadius']){
//				$('.ui-li').addClass("ui-corner-all");
//				$('div.ui-btn-inner').css({'margin':'1px'});
//			}
				
			if(row['backgroundColor'] != undefined){
				$('#'+row['id']).css({'background-color':$.attributes('color', row['backgroundColor']).getColorCode()});
				$(".ui-li>.ui-btn-inner").css({'background-color':$.attributes('color', row['backgroundColor']).getColorCode()});
			}
			
			if(row['cellBackgroundColor'] != undefined){
				$('#'+row['id']).css({'background-color':$.attributes('color', row['cellBackgroundColor']).getColorCode()});
			}
			
//			if(row['cellBackgroundImage'] != undefined && row['cellBackgroundImage']!=''){
//				if(row['repeatImage']){
//					$('#'+row['id']).css({'z-index':99,'background-image':'url('+$.utility('getImage',row['cellBackgroundImage'])+')','background-color':'white','background-position':'100% 100%','background-repeat': 'repeat'});
//				}else{
//					$('#'+row['id']).css({'z-index':99});
//					
//					var $imgdiv = $("<img/>");
//					$imgdiv.css({'height':grprow['rowsize'] * $.mobileweb.device['aspectratio']+'px', 'width':pagedef['width'] * $.mobileweb.device['aspectratio']+'px', 'margin-left':$('#'+row['id']+' div > p').css("left") });
//					$imgdiv.attr("src", $.utility('getImage',row['cellBackgroundImage']));
//					$('#'+row['id']+' div').append( $imgdiv );
//				}
//			}
			
			if(row['cellBackgroundImage'] != undefined && row['cellBackgroundImage']!=''){
				if(row['repeatImage']){
					$('#'+row['id']).css({'z-index':99,'background-image':'url('+$.utility('getImage',row['cellBackgroundImage'])+')','background-color':'white','background-position':'100% 100%','background-repeat': 'repeat'});
				}else{
					$('#'+row['id']).css({'z-index':99,'background-image':'url('+$.utility('getImage',row['cellBackgroundImage'])+')','background-color':'white','background-position':'100% 100%', 'background-size': 'cover'});
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
					left: (pagedef['width'] * $.mobileweb.device['aspectWratio']) - 40,
					height: grprow['rowsize'] * $.mobileweb.device['aspectHratio'],
					width:40
				});
			}
			
			// Below Code is for flexible Rows and TextArea in it ...
			var flexibleHeights = [];
			$.each(row['children'],function(i,child){				
				if(row['isFlexible']){
					if(child.getViewType() === "TextArea" && child['flexibleHeight'])
					{
						row.setFlexibleHeight(child,flexibleHeights);
					}
					/*else{
						// we need to manage other ui-part's postion accroding to flexible TextArea
						console.log(child.getViewType(), child['frame'].getFrame())
					}*/
				}
			});

		};
		
		row.setFlexibleHeight = function(child,flexibleHeights){			
			$('#'+child.getId()).addClass("autoExpand");
			$('#'+child.getId()).css({'height':'initial', 'max-height':'', 'overflow':'hidden'});
			
			var bottomgap = row.getCellHeight() - ((parseInt(child['frame'].getFrame()['y']) + parseInt(child['frame'].getFrame()['height'])) * $.mobileweb.device['aspectHratio']);
			$('#'+child.getId()).css({'bottom':bottomgap+'px'});
			
			var elem = document.getElementById(child.getId()); 
			if(elem == null)
				return;
			var outerHeight = parseInt(window.getComputedStyle(elem).height, 10);
			var diff = outerHeight - elem.clientHeight;
			
			// set the height to 0 in case of it has to be shrinked
			elem.style.height = 0;
			
			// set the correct height, elem.scrollHeight is the full height of the content, not just the visible part
			var elemheight = Math.max(elem.scrollHeight, elem.scrollHeight + diff);
			elem.style.height = elemheight + 'px';
			
			var flexheight = row.getCellHeight() - (parseInt(child['frame'].getFrame()['height']) * $.mobileweb.device['aspectHratio']) + elemheight;
			//console.log(bottomgap, outerHeight, elemheight, flexheight);
			
			//For Other ui except textview
			var textArea_x;
			var textArea_y;
			var textArea_height;
			$.each(row['children'],function(i,child){
 				if(child.getViewType() === "TextArea"){
 					textArea_x = (parseInt(child['frame'].getFrame()['x']));
 					textArea_y = (parseInt(child['frame'].getFrame()['y']));
 					textArea_height = (parseInt(child['frame'].getFrame()['height']));
 				}
 			});
 			$.each(row['children'],function(j,child){
 				if(child.getViewType() != "TextArea"){
 					if((parseInt(child['frame'].getFrame()['y']) >= (textArea_y + textArea_height)))
 					{
 						var gap = row.getCellHeight() - (parseInt(child['frame'].getFrame()['y']) + parseInt(child['frame'].getFrame()['height']))*$.mobileweb.device['aspectHratio'];
 						$('#'+child.getId()).css({'top':''});
 						$('#'+child.getId()+'_p').css({'top':''});
 						$('#'+child.getId()).css({'bottom':gap});
 						$('#'+child.getId()+'_p').css({'bottom':gap});
 					}
 					else if((parseInt(child['frame'].getFrame()['y']) >= textArea_y) && (parseInt(child['frame'].getFrame()['x']) >= textArea_x))
 					{
 						var gap = row.getCellHeight() - (parseInt(child['frame'].getFrame()['y']) + parseInt(child['frame'].getFrame()['height']))*$.mobileweb.device['aspectHratio'];
 						$('#'+child.getId()).css({'top':''});
 						$('#'+child.getId()).css({'bottom':gap});
 					}
 				}
 			});
 			flexibleHeights.push(flexheight);
			flexheight = Math.max.apply(Math,flexibleHeights);
//			if(flexheight > row.getCellHeight())
//				$('#'+row['id']).css({'height':flexheight + 'px'});
//			else
//				$('#'+row['id']).css({'height':row.getCellHeight()+ 'px'});

 			$('#'+row['id']).css({'height':flexheight + 'px'});
		};
		
		row.setCellHeight = function(param){
			if(row['isFlexible']){
				//$('#'+row['id']).css({'height':param * $.mobileweb.device['aspectratio']});
			}
			else{
				grprow['rowsize'] = param;
				$('#'+row['id']+' .ui-table-row-size').css({'height':param * $.mobileweb.device['aspectHratio']});
			}
		};
		row.getCellHeight = function(){
			return grprow['rowsize'] * $.mobileweb.device['aspectHratio'];
		};
		
		var selectedIndex;
		row.setSelected = function(param){
			row['selected'] = param;
			selectedIndex = row['rownum'];
			console.log(row['id'], 'selected --->>', row['selected']);
		}
		row.getSelected = function(){
			return selectedIndex;
		};
		
		row.applyEvents = function(){
			var alreadyclicked=false;
			var alreadySwiped=false;
			if(grprow['icon']['events'])
				if(grprow['icon']['events']['Tap']){
//					jQuery($('#'+id+' .ui-icon').get(index)).click(function(){$('#'+row['id']+'-icon').click();});
					$('#'+row['id']+'-icon').click(function(){
						if(pagedef['data'] != undefined)
							pagedef['data']['contents']['currentRow'] = row['rownum'];
						$.each(grprow['icon']['events']['Tap'],function(i,action){
							if(action['category']==='PageAction') 
								$('#'+row['id']).addClass('ui-btn-active');}); 
							new $.actions(pagedef, row, grprow['icon']['events']['Tap'].slice()).execute(); 
						});
				}
			
			if(grprow['events']['Tap'].length == 0){
				$('#'+row['id']).removeClass('ui-focus');
				$('#'+row['id']).mouseup(function () {
					var rowfocustimer = setInterval(function() {
						clearInterval(rowfocustimer);
						$('#'+row['id']).blur();
					},200);
				});
			}
			
			if(grprow['events']){
				
				if(grprow['events']['Tap']){
					$('#'+row['id']).click(function(event){
						if(pagedef['data'] != undefined)
							pagedef['data']['contents']['currentRow'] = row['rownum'];
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
									
									var clickable = true;         
 									if(event.target.tagName === "TEXTAREA" && !(event.target['readOnly']))          
 										clickable = false;         
 									if(event.target.tagName === "IMG" && event.target.className === "draggable")          
 										clickable = false; 
 									if(event.target.className === "ui-btn-text")          
 										clickable = false; 
 									if(clickable){          
 										new $.actions(pagedef, row, JSON.parse(JSON.stringify(grprow['events']['Tap']).slice())).execute();         
 									}
								}
							}
						}
					});
				}
				
				if(grprow['events']['flickRL']){
					$('#'+row['id']).on("swipeleft",function(event){
						if(pagedef['data'] != undefined)
							pagedef['data']['contents']['currentRow'] = row['rownum'];
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
									
									var clickable = true;         
 									if(event.target.tagName === "TEXTAREA" && !(event.target['readOnly']))          
 										clickable = false;         
 									if(event.target.tagName === "IMG" && event.target.className === "draggable")          
 										clickable = false;         
 									if(clickable){          
 										new $.actions(pagedef, row, JSON.parse(JSON.stringify(grprow['events']['flickRL']).slice())).execute();         
 									}
								}
							}
						}
					});
				}
				
				if(grprow['events']['flickLR']){
					$('#'+row['id']).on("swiperight",function(event){
						if(pagedef['data'] != undefined)
							pagedef['data']['contents']['currentRow'] = row['rownum'];
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
									
									var clickable = true;         
 									if(event.target.tagName === "TEXTAREA" && !(event.target['readOnly']))          
 										clickable = false;         
 									if(event.target.tagName === "IMG" && event.target.className === "draggable")          
 										clickable = false;         
 									if(clickable){          
 										new $.actions(pagedef, row, JSON.parse(JSON.stringify(grprow['events']['flickLR']).slice())).execute();         
 									}
								}
							}
						}
					});
				}
				
			}
		};
		
		row.getId = function(){
			return row['id'];
		};
		row.getName = function(){
			return row['name'];
		};
		row.getViewType = function(){
			return 'Row';
		};
		
		return row;
	};
	
})(jQuery);