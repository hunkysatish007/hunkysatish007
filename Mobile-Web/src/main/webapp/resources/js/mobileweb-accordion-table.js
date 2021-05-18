(function($){
	$.accordiontable = function(pagedef, child){
		var table = {};
		
		new Table(pagedef, table, child);
		
		return table;
	};
	
	function Table(pagedef, table, child){
		table['group'] = [];
		//Richa
		var groupby =[];
        var uniqueArray=[];
        
		var field = pagedef['data']['groupby'].replace('[','').replace(']','');
		for(var i= 0; i< pagedef['data']['contents'].length; i++){
			if(pagedef['data']['contents'][i][field] != undefined)
				groupby.push(pagedef['data']['contents'][i][field]);
		}
		
		if(groupby.length == 0){
			for(var i= 0; i< pagedef['data']['contents'][0].length; i++){
				if(pagedef['data']['contents'][0][i][field] != undefined)
					groupby.push(pagedef['data']['contents'][0][i][field]);
			}
		}
		
		$.each(groupby, function(index, value){
			 if(uniqueArray.indexOf(value)===-1){
				 uniqueArray.push(value);
			 }
        });
		uniqueArray.sort();
		// if(child['group'].length < uniqueArray.length){
		// 	for(var j= 1; j< uniqueArray.length; j++){
		// 		child['group'].push(child['group'][0]);
		// 	}
		// }
		// var rowschanged = [];
		// var groupedRows = [];
		// $.each(child['group'],function(i,group){
		// 	rowschanged = [];
		// 	$.each(group['row'],function(k,row){
		// 		$.each(row['data']['contents'][0],function(key,value){
		// 			if(value == uniqueArray[i]){
		// 				rowschanged.push(row);
		// 			}
		// 		});
		// 	});
		// 	if(pagedef['data']['order'] != undefined && pagedef['data']['order'] != ""){
		// 		var order = pagedef['data']['order'].split(" ")[0];
		// 		if(pagedef['data']['order'].indexOf("asc") !== -1 || pagedef['data']['order'].indexOf("ASC") !== -1){
		// 			rowschanged.sort(function(obj1, obj2) {
		// 				return obj1['data']['contents'][0][order].localeCompare(obj2['data']['contents'][0][order]);
		// 			});
		// 		}else{
		// 			rowschanged.sort(function(obj1, obj2) {
		// 				return obj2['data']['contents'][0][order].localeCompare(obj1['data']['contents'][0][order]);
		// 			});
		// 		}
		// 	}
		// 	if(rowschanged.length>0)
		// 		groupedRows.push(rowschanged);
		// });
		
		// $.each(child['group'],function(i,group){
		// 	group['row'] = [];
		// 	jQuery.extend( 	group['row'],groupedRows[i]);	
		// 	table['group'].push(new Group(pagedef, child['id'], group, i));
        // });

        var childGroup = [], rowschanged = [], groupedRows = [];
        for(var j= 0; j< uniqueArray.length; j++){
            childGroup.push(child['group'][0]);
        }
        
		$.each(childGroup, function(i,group){
			rowschanged = [];
			$.each(group['row'],function(k,row){
				$.each(row['data']['contents'][0],function(key,value){
					if(value == uniqueArray[i]){
						rowschanged.push(row);
					}
				});
			});
//			if(pagedef['data']['order'] != undefined && pagedef['data']['order'] != ""){
//				//var order = pagedef['data']['order'].split(" ")[0];
//				if(pagedef['data']['order'].indexOf("asc") !== -1 || pagedef['data']['order'].indexOf("ASC") !== -1){
//					rowschanged.sort(function(obj1, obj2) {
//						return obj1['data']['contents'][0][field].localeCompare(obj2['data']['contents'][0][field]);
//					});
//				}else{
//					rowschanged.sort(function(obj1, obj2) {
//						return obj2['data']['contents'][0][field].localeCompare(obj1['data']['contents'][0][field]);
//					});
//				}
//			}
			if(rowschanged.length>0)
				groupedRows.push(rowschanged);
		});
		
		$.each(childGroup,function(i,group){
			group['row'] = [];
			jQuery.extend( 	group['row'],groupedRows[i]);	
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
			if((pagedef['type'] == "RemoteTableViewList" && pagedef['data']['contents']['totalRecords'] == 25) || (pagedef['type'] == "DBTableViewList" && pagedef['data']['contents'].length ==25)){
				showMoreButton = "<fieldset id='showmore'> <input id='showmore'  type='button' value='"+value+"' class=ui-btn-hidden aria-disabled=false /></fieldset>";
			}
			return ["<div id='", child['id'], "' "+DBTableViewListGroupedStyle+" class='ui-table-position' style='visibility:hidden'>",
			        _table.join(''),
			        showMoreButton,
			        "</div>"].join('');
		};
		
		table.applyOverrides = function(){
			if((pagedef['type'] === "TableView" || pagedef['type'] === "DBTableViewList" || pagedef['type'] == "RemoteTableViewList") && (pagedef['children'][0]['accordion']))
				$(".ui-table-position").css({'top':'0px'});		// fix bug #6916
			if(child['tablestyle']=="Grouped"){
				$("#"+child['id']).css({'left':'0px'});
			}
			$.each(table['group'],function(i,group){
				group.applyOverrides();
            });
		};
		
//		table.getData = function(){
//			//Find pk for groupby
//			var tables=[];
// 			var selectedTableData = [];
// 			var pk_autoinc_TableField = "";
// 			
// 			var tables=$.mobileweb['localdb']['schema'];
// 			for(var i=0; i < tables.length; i++){
// 				table1=tables[i];
// 				if(table1['tablename'] == pagedef['data']['tablename']){
// 					selectedTableData = table1;
// 					var selectedTableFields = selectedTableData['fields'];
// 					for(var i=0; i < selectedTableFields.length; i++){
// 						if(selectedTableFields[i]['pk']){ //&& selectedTableFields[i]['autoinc']){
// 							pk_autoinc_TableField = selectedTableFields[i]['name'];
// 							break;
// 						}
// 					}
// 					break;
// 				}
// 			}
// 			console.log("pk_autoinc_TableField",pk_autoinc_TableField);
// 			pagedef['data']['groupby'] = pagedef['data']['groupby'].replace('[','').replace(']','');
// 			console.log("pagedef['data']['groupby']",pagedef['data']['groupby']);
// 			//--
// 			$.mobileweb['localdb']['instance'].transaction(function(tx) {
// 				$.utility('log',['SELECT COUNT('+pk_autoinc_TableField+'),* FROM ', pagedef['data']['tablename'], (pagedef['data']['order']!==undefined &&  pagedef['data']['order']!=='')? [' ORDER BY ', pagedef['data']['order']].join(''):'', (pagedef['data']['groupby']!==undefined &&  pagedef['data']['groupby']!=='')? [' group by ', pagedef['data']['groupby']].join(''):''].join(''));
// 				tx.executeSql(['SELECT COUNT('+pk_autoinc_TableField+'),* FROM ', pagedef['data']['tablename'], (pagedef['data']['order']!==undefined &&  pagedef['data']['order']!=='')? [' ORDER BY ', pagedef['data']['order']].join(''):'', (pagedef['data']['groupby']!==undefined &&  pagedef['data']['groupby']!=='')? [' group by ', pagedef['data']['groupby']].join(''):''].join(''), [],
//					function(tx,result){
//						var _results = [];
//						for (var i=0; i<result.rows.length; i++){
//							var _result = {};
//							for(key in result.rows.item(i)){
//								_result[key] = result.rows.item(i)[key];
//							}
//							_results.push(_result);
//						}
//					},function(tx,error){
//						$.utility('queryDatabase',false);
//						console.log("error");
//					});
// 				
//			});
//		}
		
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
  					else if(pagedef['type'] == "DBTableViewList")//Richa
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
								$('#'+$(this).attr('id')+'  > a > span > span.ui-icon').css({'background-size':'18px 18px'});
							}else
								$('#'+$(this).attr('id')+' > a > span > span.ui-icon').css({'background-image':''});
							
						}
//						$('#iscroll_'+pagedef['name']).css({'height':parseInt($('.ui-table-position').css('height'))});
//						if(!$.isEmptyObject(pagedef['iscroll'])){
//							pagedef['iscroll'].refresh();
//							pagedef['iscroll'].hScroll = false;
//						}
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
			//Richa
			var groupby =[];
            var uniqueArray=[];
            
			var field = pagedef['data']['groupby'].replace('[','').replace(']','');
			for(var i= 0; i< pagedef['data']['contents'].length; i++){
				if(pagedef['data']['contents'][i][field] != undefined)
					groupby.push(pagedef['data']['contents'][i][field]);
			}
			
			if(groupby.length == 0){
				for(var i= 0; i< pagedef['data']['contents'][0].length; i++){
					if(pagedef['data']['contents'][0][i][field] != undefined)
						groupby.push(pagedef['data']['contents'][0][i][field]);
				}
			}
			$.each(groupby, function(index, value){
				 if(uniqueArray.indexOf(value)===-1){
					 uniqueArray.push(value);
				 }
            });
			uniqueArray.sort();
			tblgroup['header'] = (uniqueArray.length != 0) ? uniqueArray[index] + " (" + group['row'].length + ") " : "";

			var groupedStyle = (pagedef['children'][0]['tablestyle']=="Grouped") ? "style='padding:3px;'" : "";
			var tableStyle = (pagedef['children'][0]['tablestyle']=="Grouped") ? "true" : "false";
			
			// var _table = '';
			// if((pagedef['type'] === "TableView" || pagedef['type'] === "DBTableViewList" || pagedef['type'] == "RemoteTableViewList") && (pagedef['children'][0]['accordion'])){
			// 	// this is for Accordion View in TAbleView Only... Akhil.
			// 	_table = [//"<div id='", group['id'], "-header'>", 
			// 				//(tblgroup['header']!=='')? ["<p class='ui-table-header-text'>", tblgroup['header'], "</p>"].join(''):'',
			// 				//"</div>", 
			// 	          "<div data-role='collapsible' data-collapsed='false'>",
			// 	          "<h2 id='", group['id'], "'>",tblgroup['header'],"</h2>",
			// 			"<ul id='", group['id'], "' data-role='listview' data-split-theme='d' data-inset='",tableStyle,"' "+groupedStyle+">"];
				
			// 	$.each(group['row'],function(i,row){
			// 		_table = _table.concat(row.getHTML());
			// 	});
			// 	if(tblgroup['footer'] == ""){
			// 		_table = _table.concat(
			// 				["</ul>", 
			// 				"<div id='", group['id'], "-footer'>", 
   			// 				"</div>",
			// 				 "</div>"	// closing DIV for collapsible..
			// 				 ]);
			// 	}else{
			// 		_table = _table.concat(
			// 				["</ul>", 
			// 				"<div id='", group['id'], "-footer'>", 
			// 					"<p class='ui-table-footer-text'>", tblgroup['footer'], "&nbsp</p>",
			// 				"</div>",
			// 				 "</div>"	// closing DIV for collapsible..
			// 				 ]);
			// 	}
				
			// }else{
			// 	_table = ["<div id='", group['id'], "-header'>", 
			// 				(tblgroup['header']!=='')? ["<p class='ui-table-header-text'>", tblgroup['header'], "</p>"].join(''):'',
			// 				"</div>", 
			// 			"<ul id='", group['id'], "' data-role='listview' data-split-theme='d' data-inset='",tableStyle,"' "+groupedStyle+">"];
				
			// 	$.each(group['row'],function(i,row){
			// 		_table = _table.concat(row.getHTML());
			// 	});
				
			// 	_table = _table.concat(
			// 			["</ul>", 
			// 			"<div id='", group['id'], "-footer'>", 
			// 				"<p class='ui-table-footer-text'>", tblgroup['footer'], "&nbsp</p>",
			// 			"</div>"]);
			// }
			
            //return _table;
            
            var _group = '';
            _group = ["<div data-role='collapsible' data-collapsed='false'>"];

            if(tblgroup['header'] != ""){
                _group = _group.concat(["<h2 id='", group['id'], "'>",tblgroup['header'],"</h2>"]);
            }
            
            _group = _group.concat(["<ul id='", group['id'], "' data-role='listview' data-split-theme='d' data-inset='",tableStyle,"' "+groupedStyle+">"]);
                        
            $.each(group['row'],function(i,row){
                _group = _group.concat(row.getHTML());
            });
            
            _group = _group.concat(["</ul>"]);

            if(tblgroup['footer'] == ""){
                _group = _group.concat(["<div id='", group['id'], "-footer'>","</div>"]);
            }else{
                    _group = _group.concat(
                        ["<div id='", group['id'], "-footer'>", 
                            "<p class='ui-table-footer-text'>", tblgroup['footer'], "&nbsp</p>",
                        "</div>" ]);
            }

            _group = _group.concat(["</div>"]);     // closing DIV for collapsible..

            return _group;
		};
		
		group.applyOverrides = function(){
			if((pagedef['type'] === "RemoteTableViewList") || (pagedef['type'] === "TableViewList") || (pagedef['type'] === "DBTableViewList"))
				$.utility('showLoadingIndicator',true);
				
			//$('#' + group['id']).css({'width':pagedef['width'] * $.mobileweb.device['aspectratio'], 'margin':"-17px 0px 0px"});
			$('#' + group['id']+ '-header .ui-table-header-text').css({'font-size':16 * $.mobileweb.device['aspectratio'],'margin-left':(10*$.mobileweb.device['aspectWratio'])});
			//$('#' + group['id']+ '-footer').css({'padding-top':'inherit'})
			$('#' + group['id']+ '-footer .ui-table-footer-text').css({'font-size':16 * $.mobileweb.device['aspectratio'],'margin-left':(10*$.mobileweb.device['aspectWratio']),'margin-top':(1*$.mobileweb.device['aspectHratio'])});
			if((pagedef['type'] === "TableViewList") || (pagedef['type'] === "DBTableViewList") || (pagedef['type'] === "RemoteTableViewList"))
				$('#' + group['id']+ ' .ui-icon').css({'z-index':99});
			
			if (navigator.appVersion.indexOf("Mac")!=-1) //Bug #12413 fix
				$('#'+ pagedef['name'] + '_toolbarBottom').css({'z-index':1});
			
			var timerTime = ((pagedef['type'] === "RemoteTableViewList") || (pagedef['type'] === "TableViewList") || (pagedef['type'] === "DBTableViewList")) ? 1250 : 100;
			
			// Fixed DataSet TableView is removed from timer(Below) module.. cause I think it is not required.. Akhil
			if((pagedef['type'] == "DBTableView")||(pagedef['type'] == "RemoteTableView")){
				var _page = $.utility('getObject',$.mobileweb['pages'],'name',pagedef['parent']);
				if(($.isEmptyObject(_page)) || (_page == undefined) || ((_page['type']!= 'DBTableViewList') && (_page['type']!= 'RemoteTableViewList'))) {
					timerTime=700;		
				}
			}	
			
			
			
			setTimeout(function(){
				$.each(group['row'],function(i,row){
					row.applyOverrides();
				});
				
				if((pagedef['type'] === "RemoteTableViewList") || (pagedef['type'] === "TableViewList") || (pagedef['type'] === "DBTableViewList")){
					$.utility('showLoadingIndicator',false);
				}
				
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
				
				if(pagedef['type'] === "TableView" || pagedef['type'] === "DBTableViewList" || pagedef['type'] == "RemoteTableViewList"){
                    var groupedPad = 0;
                    if($('#' + group['id']).css('padding'))
                        groupedPad = $('#' + group['id']).css('padding').replace('px','')*2;
					if(pagedef['children'][0]['accordion']){
						
						$("div[data-role='collapsible']").css({'width':pagedef['width'] * $.mobileweb.device['aspectWratio'],'margin-top':'0px', 'margin-bottom':(4*$.mobileweb.device['aspectHratio'])});
						$('.ui-collapsible-content').css({'padding':'0px 0px 0px'});
						$('.ui-collapsible-content > .ui-listview').css({'margin':'0px 0px 0px'});
						$('.ui-collapsible-heading-toggle').css({'border-radius':'1px'});
						
						var accordionHeader = pagedef['children'][0]['accordionheader'];
						if(accordionHeader){
							$('.ui-collapsible-heading-toggle').css({'background':$.attributes('color', accordionHeader['bgcolor']).getColorCode(), 'color':$.attributes('color', accordionHeader['textcolor']).getColorCode()});
							$('.ui-collapsible-heading-toggle').css({'height':accordionHeader['height']*$.mobileweb.device['aspectHratio'], 'padding': '0px 0px 0px'});
							//$('.ui-collapsible-heading-toggle > span').css({'margin-top': (accordionHeader['height']-16)*$.mobileweb.device['aspectratio']/2, 'padding-top': '0px'});
							$('.ui-collapsible-heading-toggle > span').css({'height':accordionHeader['height']*$.mobileweb.device['aspectHratio'],'padding': '0px 0px 0px'});
							$('.ui-collapsible-heading-toggle > span > span.ui-btn-text').css({'font-size': 16*$.mobileweb.device['aspectratio'],top: (accordionHeader['height']-16)*$.mobileweb.device['aspectHratio']/2});
							
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
				
				// In case of flexible rows, introducing scroll bar. Need to improve this.
				if($('#iscroll_'+pagedef['name'])[0] != undefined){
					var pageclientH = $('#iscroll_'+pagedef['name'])[0].clientHeight;
					if(pageclientH > 0 && (pageclientH < $(".scroller")[0].scrollHeight)){
						$('.bglayout').css({'height': $('#iscroll_'+pagedef['name'])[0].clientHeight+'px'});
						//$('.bglayout').css({'overflow-x':'hidden', 'overflow-y':'auto'});
					}
				}
                
                $('.ui-table-position').css({'visibility':'visible'});

			},timerTime);
		};
		
		group.applyEvents = function(){
			if(!$.utility('getreSettingDataStatus')){
				$.each(group['row'],function(i,row){
					row.applyEvents();
				});	
			}
			
			$('.ui-collapsible-heading').click(function(event){
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
		};
		
		return group;
	};
	
	function Row(pagedef, id, grprow, index, isFlexible){
		var row = {id: id + '-row-' + index,
				   rownum: grprow['rownum'],
				   children: new $.uichildren(pagedef, grprow['children'], grprow['data']['contents'][0]),
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
 				if(currpage['children'][0] != undefined && currpage['children'][0]['group'] != undefined)
 					pageRow = currpage['children'][0]['group'][0]['row'][grprow['rownum']];
 					
// 				if(pageRow != undefined)
// 					row['children'] = pageRow['children'];
// 				else
// 					row['children'] = [];
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
			if(row['children'].length > 0){
				return ["<li data-icon='", grprow['icon']['style'], "'>", 
					"<a href='#' id='", row['id'], "' class='ui-table-padding'>",
						"<div class='ui-table-row-size' style='visibility:hidden'>",
							row['children'].getHTML(),
						"</div>",
					"</a>", //change this to DIV for the flat style
					(grprow['icon']['events']) ? ["<div id='", row['id'], "-icon'>","</div>"].join(''): '',
				"</li>"];
			}
		};
		
		
		
		row.getViewType = function(){
			return 'Row';
		};
		
		row.applyOverrides = function(){
			
			row.setCellHeight(grprow['rowsize']);
			$('#'+row['id']+' .ui-table-row-size').css({'visibility':'visible', 'position':'relative'});
			if(row['children'].length > 0){
				row['children'].applyOverrides();
				row['children'].applyEvents();
			}
			if(row['backgroundColor'] != undefined){
				$('#'+row['id']).css({'background-color':$.attributes('color', row['backgroundColor']).getColorCode()});
				$(".ui-li>.ui-btn-inner").css({'background-color':$.attributes('color', row['backgroundColor']).getColorCode()});
				
			}
			if(grprow['icon']['style']=='button')
				$('#'+row['id']).parent().siblings().css({'z-index':199,'background-image':'url('+$.utility('getSystemImage','button.png',row.getViewType())+')','background-color':'white','background-position':' 50% 50%','background-repeat': 'no-repeat no-repeat'});
			else if(grprow['icon']['style']!='false')
				$('#'+row['id']).parent().siblings().css({'z-index':199});
			
			if(row['cellBackgroundImage'] != undefined && row['cellBackgroundImage']!=''){
				if(row['repeatImage']){
					$('#'+row['id']).css({'z-index':99,'background-image':'url('+$.utility('getImage',row['cellBackgroundImage'])+')','background-color':'white','background-position':'100% 100%','background-repeat': 'repeat'});
				}else{
				//$('#'+row['id']).css({'z-index':99,'background-image':'url('+$.utility('getImage',row['cellBackgroundImage'])+')','background-color':'white','background-position':'100% 100%', 'background-size': 'cover'});
					
					$('#'+row['id']).css({'z-index':99});
					
					var $imgdiv = $("<img/>");
					$imgdiv.css({'height':grprow['rowsize'] * $.mobileweb.device['aspectHratio']+'px', 'width':pagedef['width'] * $.mobileweb.device['aspectWratio']+'px', 'margin-left':$('#'+row['id']+' div > p').css("left") });
					$imgdiv.attr("src", $.utility('getImage',row['cellBackgroundImage']));
					$('#'+row['id']+' div').append( $imgdiv );
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
			
			if(row['cellBackgroundColor'] != undefined){
				$('#'+row['id']).css({'background-color':$.attributes('color', row['cellBackgroundColor']).getColorCode()});
			}
			
			// Below Code is for removing the border space from rows..
			$('.ui-li').css({'border-top-width':'0px','border-bottom-width':'0px'});
			
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
				$('#'+row['id']+' .ui-table-row-size').css({'height':param * $.mobileweb.device['aspectHratio']});
			}
		};
		
		row.getCellHeight = function(){
			return grprow['rowsize'] * $.mobileweb.device['aspectHratio'];
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
			if(grprow['icon']['events'])
				if(grprow['icon']['events']['Tap']){
					//jQuery($('#'+id+' .ui-icon').get(index)).click(function(){$('#'+row['id']+'-icon').click();});
					$('#'+row['id']+'-icon').click(function(){$.each(grprow['icon']['events']['Tap'],function(i,action){if(action['category']==='PageAction') $('#'+row['id']).addClass('ui-btn-active');}); new $.actions(pagedef, row, grprow['icon']['events']['Tap'].slice()).execute(); });
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