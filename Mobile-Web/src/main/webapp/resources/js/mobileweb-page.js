/* jQuery Plugin that handles the html page.
 */

(function($){
	
	function Page(pagedef, isReverse){
		$.utility('setAppBootingForFirstTime', true);
		pagedef['reverse'] = isReverse;
		var page = {header: new Header(pagedef),
					toolbartop: new ToolBarTop(pagedef),
					toolbarbottom: new ToolBarBottom(pagedef),
					footer: new Footer(pagedef),
					statusbar: new StatusBar(pagedef),
					leftToolBar: new LeftToolBar(pagedef),
					rightToolBar: new RightToolBar(pagedef)
					};
		
		var init = function(){
			//initialize children objects here
			$.utility('initChildren',false);
			switch(pagedef['type']){
			case 'RemoteTableViewList':
			case 'DBTableViewList':
				//check if the data is new or some sort
				$(document).everyTime(100, function() {
					if(!$.utility('isBusy')){
						$(document).stopTime();
						
						if($.utility('getDelayedChangeCondition',pagedef['name']) === false){
							if(pagedef['type'] == "RemoteTableViewList"){
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
						}
						
						if(pagedef['data']['groupby'] != undefined)
							pagedef['data']['groupby'] = pagedef['data']['groupby'].replace("[","").replace("]","");

						if(pagedef['type']==='DBTableViewList')
							new $.actions(pagedef, null, [{method:"Select", category:"DBAction", params:{tablename:pagedef['data']['tablename'], where:pagedef['data']['wherecond'], order:pagedef['data']['order'],groupby: pagedef['data']['groupby'] ,limit : 25,offset: 0, columns:""}}]).execute();
						else{
							var limit;
							if(pagedef['data']['groupby'] == undefined || pagedef['data']['groupby'] == ""){
								if(pagedef['children'][0]['accordion'])
									pagedef['data']['groupby'] = pagedef['data']['order'];
								limit =25;
							}
							if(pagedef['data']['groupby'] != undefined)
								pagedef['data']['groupby'] = pagedef['data']['groupby'].replace("[","").replace("]","");

							new $.actions(pagedef, null, [{method:"Select", category:"ComAction", 
								params:{
									servicename: pagedef['data']['servicename'],
									table: pagedef['data']['tablename'],
									where: pagedef['data']['wherecond'],
									order: pagedef['data']['order'],
									limit : limit,
									offset: 0,
									fields:""// $.utility('getColumns',pagedef['data']['tablename'],[],pagedef['children'])
								}
							}]).execute();
						}
						$(document).everyTime(100, function() {
							if(!$.utility('isBusy')){
								$(document).stopTime();
								page.applyData();
							}
						});
					}
				});
				break;
			case 'RemoteTableView':
			case 'BaseView':
			case 'ScrollView':
			case 'DBTableView':
				if(pagedef['data']['tablename']!==''){
					var columns = [];//columns is not used in case of localdb but yet to test for others :sonami
					//search first if
					if(pagedef['type']==='BaseView'){
						var schema = {};
						if(pagedef['data']['servicename'])
							schema = $.mobileweb['comdb']['schema'];
						else
							schema = $.mobileweb['localdb']['schema'];
						
						columns.push($.utility('getPK',pagedef['data']['tablename'], schema));
					}
					page.applyData();
				}else  {
					page.applyData();
				}
				break;
			case 'TableViewList':	
				page.applyData();
				break;
			case 'TableView':	
				page.applyData();
				break;
			case 'SplitView':
				$.utility('initCall');				
				var TestVar=setInterval(function() {
					if(($.utility('appendDeviceInfo')!="")){
						clearInterval(TestVar);
						page.applyData();
					}
				},200);
				break;
			case 'PageScrollView':
				page.applyData();
				break;
			default:
				if(pagedef['pageOverlay'] != undefined && pagedef['pageOverlay'].length > 0){
					for(var i=0; i<pagedef['pageOverlay'].length; i++){
						pagedef['children'].push(pagedef['pageOverlay'][i]);
					}
					pagedef['pageOverlay'] = [];
				}
				page['children'] = new $.uichildren(pagedef, pagedef['children'], null);
			}
		};	
		
		
		page.applyData = function(){
			switch(pagedef['type']){
				case 'RemoteTableView':
				case 'DBTableView':
					$.each(pagedef['children'][0]['group'],function(j,group){
						$.each(group['row'],function(k,row){
							row['data']['contents'] = pagedef['data']['contents'];
							//TODO: generating children for TableView and TableViewList is almost the same... make a function
							//to make this almost the same... make sure the ID and template is different is different
							if(pagedef['children'][0]['style']!=='custom')
								row['children'] = [];
							switch(pagedef['children'][0]['style']){
								case 'default':
									row['children'].push({id:"ui-defgroup-"+j+"-main-"+k,name:'',value:'', template:row['template']['maintext'],viewtype:"Label",frame:{x:10,y:13,width:150,height:20},font:{size:16,align:"left",color:{name:"black"}}});
									if(row['template']['image']!==''){
										row['children'][0]['frame']['x'] = 50;
										row['children'].push({id:"ui-defgroup-"+j+"-img-"+k,value:'', template:row['template']['image'],name:"",viewtype:"Image",frame:{x:10,y:7,width:30,height:30}});
									}
									break;
								case 'subtitle':
									row['children'].push({id:"ui-defgroup-"+j+"-main-"+k,name:'',value:'', template:row['template']['maintext'],viewtype:"Label",frame:{x:10,y:7,width:150,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:16,align:"left",color:{name:"black"}}},
														 {id:"ui-defgroup-"+j+"-sub-"+k,name:'',value:'', template:row['template']['subtext'],viewtype:"Label",frame:{x:10,y:22,width:150,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:12,align:"left",color:{name:"gray"}}});
									if(row['template']['image']!==''){
										row['children'][0]['frame']['x'] = 50;
										row['children'][1]['frame']['x'] = 50;
										row['children'].push({id:"ui-defgroup-"+j+"-img-"+k,value:'',template:row['template']['image'],name:"",viewtype:"Image",frame:{x:10,y:7,width:30,height:30}});
									}
									break;
								case 'rightaligned':
									row['children'].push({id:"ui-defgroup-"+j+"-main-"+k,name:'',value:'', template:row['template']['maintext'],viewtype:"Label",frame:{x:10,y:13,width:150,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:16,align:"left",color:{name:"black"}}});
											 			 //{id:"ui-defgroup-"+j+"-sub-"+k,name:'',value:'', template:row['template']['subtext'],viewtype:"Label",frame:{x:pagedef['width']-185,y:16,width:150,height:20},font:{size:12,align:"right",color:{name:"SteelBlue"}}});
									if(pagedef['children'][0]['tablestyle'] === 'Grouped'){
										row['children'].push({id:"ui-defgroup-"+j+"-sub-"+k,name:'',value:'', template:row['template']['subtext'],viewtype:"Label",frame:{x:pagedef['width']-210,y:16,width:150,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:12,align:"right",color:{name:"SteelBlue"}}});
									}else{
										row['children'].push({id:"ui-defgroup-"+j+"-sub-"+k,name:'',value:'', template:row['template']['subtext'],viewtype:"Label",frame:{x:pagedef['width']-185,y:16,width:150,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:12,align:"right",color:{name:"SteelBlue"}}});
									}
									break;
								case 'contactform':
									row['children'].push({id:"ui-defgroup-"+j+"-main-"+k,name:'',value:'', template:row['template']['maintext'],viewtype:"Label",frame:{x:10,y:17,width:(pagedef['width']-40)*0.4,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:16,align:"right",color:{name:"black"}}},
								 			 			 {id:"ui-defgroup-"+j+"-sub-"+k,name:'',value:'', template:row['template']['subtext'],viewtype:"Label",frame:{x:90,y:17,width:(pagedef['width']-40)*0.6,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:12,align:"left",color:{name:"SteelBlue"}}});
									break;
							}
						});
					});
					if(pagedef['pageOverlay'] != undefined && pagedef['pageOverlay'].length > 0){
						for(var i=0; i<pagedef['pageOverlay'].length; i++){
							pagedef['children'].push(pagedef['pageOverlay'][i]);
						}
						pagedef['pageOverlay'] = [];
					}
					page['children'] = new $.uichildren(pagedef, pagedef['children'], null);
					break;
				case 'TableView':
					$.each(pagedef['children'][0]['group'],function(j,group){
						$.each(group['row'],function(k,row){
							row['data']['contents'] = pagedef['data']['contents'];
							//TODO: generating children for TableView and TableViewList is almost the same... make a function
							//to make this almost the same... make sure the ID and template is different is different
							if(pagedef['children'][0]['style']!=='custom')
								row['children'] = [];
							switch(pagedef['children'][0]['style']){
								case 'default':
									row['children'].push({id:"ui-defgroup-"+j+"-main-"+k,name:"mainText" + "_ui-defgroup-"+j+"-main-"+k,value:'', template:row['template']['maintext'],viewtype:"Label",frame:{x:10,y:13,width:150,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:16,align:"left",color:{name:"black"}}});
									if(row['template']['image']!==''){
										row['children'][0]['frame']['x'] = 50;
										row['children'].push({id:"ui-defgroup-"+j+"-img-"+k,value:'', template:row['template']['image'],name:"",viewtype:"Image",frame:{x:10,y:7,width:30,height:30}});
									}
									break;
								case 'subtitle':
									row['children'].push({id:"ui-defgroup-"+j+"-main-"+k,name:"mainText" + "_ui-defgroup-"+j+"-main-"+k,value:'', template:row['template']['maintext'],viewtype:"Label",frame:{x:10,y:7,width:150,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:16,align:"left",color:{name:"black"}}},
														 {id:"ui-defgroup-"+j+"-sub-"+k,name:"subText" + "_ui-defgroup-"+j+"-sub-"+k,value:'', template:row['template']['subtext'],viewtype:"Label",frame:{x:10,y:22,width:150,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:12,align:"left",color:{name:"gray"}}});
									if(row['template']['image']!==''){
										row['children'][0]['frame']['x'] = 50;
										row['children'][1]['frame']['x'] = 50;
										row['children'].push({id:"ui-defgroup-"+j+"-img-"+k,value:'',template:row['template']['image'],name:"",viewtype:"Image",frame:{x:10,y:7,width:30,height:30}});
									}
									break;
								case 'rightaligned':
									row['children'].push({id:"ui-defgroup-"+j+"-main-"+k,name:"mainText" + "_ui-defgroup-"+j+"-main-"+k,value:'', template:row['template']['maintext'],viewtype:"Label",frame:{x:10,y:13,width:150,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:16,align:"left",color:{name:"black"}}},
											 			 {id:"ui-defgroup-"+j+"-sub-"+k,name:"subText" + "_ui-defgroup-"+j+"-sub-"+k,value:'', template:row['template']['subtext'],viewtype:"Label",frame:{x:pagedef['width']-185,y:16,width:150,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:12,align:"right",color:{name:"SteelBlue"}}});
									break;
								case 'contactform':
									row['children'].push({id:"ui-defgroup-"+j+"-main-"+k,name:"mainText" + "_ui-defgroup-"+j+"-main-"+k,value:'', template:row['template']['maintext'],viewtype:"Label",frame:{x:10,y:17,width:(pagedef['width']-40)*0.4,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:16,align:"right",color:{name:"black"}}},
								 			 			 {id:"ui-defgroup-"+j+"-sub-"+k,name:"subText" + "_ui-defgroup-"+j+"-sub-"+k,value:'', template:row['template']['subtext'],viewtype:"Label",frame:{x:(pagedef['width']-40)*0.4+20,y:17,width:(pagedef['width']-40)*0.6,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:12,align:"left",color:{name:"SteelBlue"}}});
									break;
							}
						});
					});
					if(pagedef['pageOverlay'] != undefined && pagedef['pageOverlay'].length > 0){
						for(var i=0; i<pagedef['pageOverlay'].length; i++){
							pagedef['children'].push(pagedef['pageOverlay'][i]);
						}
						pagedef['pageOverlay'] = [];
					}
					page['children'] = new $.uichildren(pagedef, pagedef['children'], null);
					break;
				case 'TableViewList':
						var group = pagedef['children'][0]['group'][0];
						var rows = [];
						var aspect = $.mobileweb.device['aspectratio'];
						$.each(pagedef['children'][0]['group'][0]['template'],function(i,data){
							var row = {
								rownum: i,
								rowsize:group['template'][i]['rowsize'],
								backgroundColor : group['template'][i]['backgroundColor'],
								icon : group['template'][i]['icon'],
								data : {contents: [pagedef['data']['contents'][0]]},
								events : group['template'][i]['events'],
								children: []
							};
							switch(pagedef['children'][0]['style']){
								case 'default':
									row['children'].push({id:"ui-group-0-main-"+i,name:"mainText" + "_ui-defgroup-"+0+"-main-"+i,value:'', template:group['template'][i]['maintext'],viewtype:"Label",frame:{x:10,y:13,width:150,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:16,align:"left",color:{name:"black"}}});
									if(group['template'][i]['image']!==''){
										row['children'][0]['frame']['x'] = 50;
										row['children'].push({id:"ui-group-0-img-"+i,value:'', template:group['template'][i]['image'],name:"",viewtype:"Image",frame:{x:10,y:7,width:30,height:30}});
									}
									break;
								case 'subtitle':
									row['children'].push({id:"ui-group-0-main-"+i,name:"mainText" + "_ui-defgroup-"+0+"-main-"+i,value:'', template:group['template'][i]['maintext'],viewtype:"Label",frame:{x:10,y:7,width:250,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:16,align:"left",color:{name:"black"}}},
														 {id:"ui-group-0-sub-"+i,name:"subtext" + "_ui-defgroup-"+0+"-main-"+i,value:'', template:group['template'][i]['subtext'],viewtype:"Label",frame:{x:10,y:22,width:150,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:12,align:"left",color:{name:"gray"}}});
									if(group['template'][i]['image']!==''){
										row['children'][0]['frame']['x'] = 50;
										row['children'][1]['frame']['x'] = 50;
										row['children'].push({id:"ui-group-0-img-"+i,value:'',template:group['template'][i]['image'],name:"",viewtype:"Image",frame:{x:10,y:7,width:30,height:30}});
									}
									break;
									
								case 'rightaligned':
									row['children'].push({id:"ui-group-0-main-"+i,name:"maintext" + "_ui-defgroup-"+0+"-main-"+i,value:'', template:group['template'][i]['maintext'],viewtype:"Label",frame:{x:10,y:13,width:150,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:16,align:"left",color:{name:"black"}}},
											 {id:"ui-group-0-sub-"+i,name:"subtext" + "_ui-defgroup-"+0+"-main-"+i,value:'', template:group['template'][i]['subtext'],viewtype:"Label",frame:{x:pagedef['width']-185,y:16,width:150,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:12,align:"right",color:{name:"SteelBlue"}}});
									break;
								case 'contactform':
									row['children'].push({id:"ui-group-0-main-"+i,name:"maintext" + "_ui-defgroup-"+0+"-main-"+i,value:'', template:group['template'][i]['maintext'],viewtype:"Label",frame:{x:10,y:17,width:(pagedef['width']-40)*0.4,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:16,align:"right",color:{name:"black"}}},
														 {id:"ui-group-0-sub-"+i,name:"subtext" + "_ui-defgroup-"+0+"-main-"+i,value:'', template:group['template'][i]['subtext'],viewtype:"Label",frame:{x:(pagedef['width']-40)*0.4+20,y:17,width:(pagedef['width']-40)*0.6,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:12,align:"left",color:{name:"SteelBlue"}}});
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
						group['row'] = rows;
						if(pagedef['pageOverlay'] != undefined && pagedef['pageOverlay'].length > 0){
							for(var i=0; i<pagedef['pageOverlay'].length; i++){
								pagedef['children'].push(pagedef['pageOverlay'][i]);
							}
							pagedef['pageOverlay'] = [];
						}
						page['children'] = new $.uichildren(pagedef, pagedef['children'], null);
					break;	
				case 'RemoteTableViewList':
					//only 1 children and 1 group allowed here
					var group = pagedef['children'][0]['group'][0];
					var isAccordion = pagedef['children'][0]['accordion'];//----05/02/2019(Do not change page data in case of accordion) 
					var rows = [];
					var aspect = $.mobileweb.device['aspectratio'];

					if(group['row'] != undefined){		// HOTFIX for 'back' action, page data-contents are not correct. Need to debug more
						if(pagedef['data']['contents']['length'] != group['row']['length'] && !isAccordion){
							pagedef['data']['contents'] = [];
							$.each(group['row'],function(m,row){
								pagedef['data']['contents'].push(row['data']['contents'][0]);
							});
						}
					}
					
					if(pagedef['data']['contents']['rows'] != 0){
						$.each(pagedef['data']['contents'],function(i,data){
							if(i < 25 || i< pagedef['data']['contents'].length){
								var row = {
									rownum: i,
									rowsize:group['template']['rowsize'],
									backgroundColor : group['template']['backgroundColor'],
									evenRowBackgroundColor : group['template']['evenRowBackgroundColor'],
									oddRowBackgroundColor : group['template']['oddRowBackgroundColor'],
									evenRowBackgroundImage : group['template']['evenRowBackgroundImage'],
									oddRowBackgroundImage : group['template']['oddRowBackgroundImage'],
									repeatImage : group['template']['repeatImage'],
									icon : group['template']['icon'],
									data : {contents: [data]},
									events : group['template']['events'],
									children: []
								};
								switch(pagedef['children'][0]['style']){
									case 'default':
										row['children'].push({id:"ui-group-0-main-"+i,name:group['template']['maintext'].toString().replace('[','').replace(']','') + "-" + i,value:'', template:group['template']['maintext'],viewtype:"Label",frame:{x:10,y:13,width:150,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:16,align:"left",color:{name:"black"}}});
										if(group['template']['image']!==''){
											row['children'][0]['frame']['x'] = 50;
											row['children'].push({id:"ui-group-0-img-"+i,value:'', template:group['template']['image'],name:group['template']['image'].toString().replace('[','').replace(']','') + "-" + i,viewtype:"Image",frame:{x:10,y:7,width:30,height:30}});
										}
										break;
									case 'subtitle':
										row['children'].push({id:"ui-group-0-main-"+i,name:group['template']['maintext'].toString().replace('[','').replace(']','') + '-' + i,value:'', template:group['template']['maintext'],viewtype:"Label",frame:{x:10,y:7,width:250,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:16,align:"left",color:{name:"black"}}},
															 {id:"ui-group-0-sub-"+i,name:group['template']['subtext'].toString().replace('[','').replace(']','') + '-' + i,value:'', template:group['template']['subtext'],viewtype:"Label",frame:{x:10,y:22,width:250,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:12,align:"left",color:{name:"gray"}}});
										if(group['template']['image']!==''){
											row['children'][0]['frame']['x'] = 50;
											row['children'][1]['frame']['x'] = 50;
											row['children'].push({id:"ui-group-0-img-"+i,value:'',template:group['template']['image'],name:group['template']['image'].toString().replace('[','').replace(']','') + '-' + i,viewtype:"Image",frame:{x:10,y:7,width:30,height:30}});
										}
										break;
									case 'rightaligned':
										row['children'].push({id:"ui-group-0-main-"+i,name:group['template']['maintext'].toString().replace('[','').replace(']','')+ '-' + i,value:'', template:group['template']['maintext'],viewtype:"Label",frame:{x:10,y:13,width:150,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:16,align:"left",color:{name:"black"}}},
												 			 {id:"ui-group-0-sub-"+i,name:group['template']['subtext'].toString().replace('[','').replace(']','') + '-' + i,value:'', template:group['template']['subtext'],viewtype:"Label",frame:{x:pagedef['width']-185,y:16,width:150,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:12,align:"right",color:{name:"SteelBlue"}}});
										break;
									case 'contactform':
										row['children'].push({id:"ui-group-0-main-"+i,name:group['template']['maintext'].toString().replace('[','').replace(']','') + '-' + i,value:'', template:group['template']['maintext'],viewtype:"Label",frame:{x:10,y:17,width:(pagedef['width']-40)*0.4,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:16,align:"right",color:{name:"black"}}},
									 			 			 {id:"ui-group-0-sub-"+i,name:group['template']['subtext'].toString().replace('[','').replace(']','') + '-' + i,value:'', template:group['template']['subtext'],viewtype:"Label",frame:{x:(pagedef['width']-40)*0.4+20,y:17,width:(pagedef['width']-40)*0.6,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:12,align:"left",color:{name:"SteelBlue"}}});
										break;
									case 'custom':
										$.each(group['template']['children'] ,function(j,child){
											row['children'].push($.utility('clone',child));
											row['children'][j].id = ['ui-group-0-',i,'-',j].join('');
											row['children'][j].name = [row['children'][j]['name'].toString().replace('[','').replace(']',''),'-',i].join('');
										});
										break;
								}
								rows.push(row);
							}
						});
					}
					group['row'] = rows;
					if(pagedef['pageOverlay'] != undefined && pagedef['pageOverlay'].length > 0){
						for(var i=0; i<pagedef['pageOverlay'].length; i++){
							pagedef['children'].push(pagedef['pageOverlay'][i]);
						}
						pagedef['pageOverlay'] = [];
					}
					page['children'] = new $.uichildren(pagedef, pagedef['children'], null);
				break;
				case 'DBTableViewList':
					//only 1 children and 1 group allowed here
					var group = pagedef['children'][0]['group'][0];
					var rows = [];
					var aspect = $.mobileweb.device['aspectratio'];
					
					if(group){
						if(group['row'] != undefined){		// HOTFIX for 'back' action, page data-contents are not correct. Need to debug more
							if(pagedef['data']['contents']['length'] != group['row']['length']){
								pagedef['data']['contents'] = [];
								$.each(group['row'],function(m,row){
									if(row['data'] !== undefined)
										pagedef['data']['contents'].push(row['data']['contents'][0]);
								});
							}
						}
						$.each(pagedef['data']['contents'],function(i,data){
							//if(i < 25){
								var row = {
									rownum: i,
									rowsize:group['template']['rowsize'],
									backgroundColor : group['template']['backgroundColor'],
									evenRowBackgroundColor : group['template']['evenRowBackgroundColor'],
									oddRowBackgroundColor : group['template']['oddRowBackgroundColor'],
									evenRowBackgroundImage : group['template']['evenRowBackgroundImage'],
									oddRowBackgroundImage : group['template']['oddRowBackgroundImage'],
									repeatImage : group['template']['repeatImage'],
									icon : group['template']['icon'],
									data : {contents: [data]},
									events : group['template']['events'],
									children: []
								};
								switch(pagedef['children'][0]['style']){
									case 'default':
										row['children'].push({id:"ui-group-0-main-"+i,name:'',value:'', template:group['template']['maintext'],viewtype:"Label",frame:{x:10,y:13,width:150,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:16,align:"left",color:{name:"black"}}});
										if(group['template']['image']!==''){
											row['children'][0]['frame']['x'] = 50;
											row['children'].push({id:"ui-group-0-img-"+i,value:'', template:group['template']['image'],name:"",viewtype:"Image",frame:{x:10,y:7,width:30,height:30}});
										}
										break;
									case 'subtitle':
										row['children'].push({id:"ui-group-0-main-"+i,name:'',value:'', template:group['template']['maintext'],viewtype:"Label",frame:{x:10,y:7,width:250,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:16,align:"left",color:{name:"black"}}},
															 {id:"ui-group-0-sub-"+i,name:'',value:'', template:group['template']['subtext'],viewtype:"Label",frame:{x:10,y:22,width:250,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:12,align:"left",color:{name:"gray"}}});
										if(group['template']['image']!==''){
											row['children'][0]['frame']['x'] = 50;
											row['children'][1]['frame']['x'] = 50;
											row['children'].push({id:"ui-group-0-img-"+i,value:'',template:group['template']['image'],name:"",viewtype:"Image",frame:{x:10,y:7,width:30,height:30}});
										}
										break;
									case 'rightaligned':
										row['children'].push({id:"ui-group-0-main-"+i,name:'',value:'', template:group['template']['maintext'],viewtype:"Label",frame:{x:10,y:13,width:150,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:16,align:"left",color:{name:"black"}}},
												 			 {id:"ui-group-0-sub-"+i,name:'',value:'', template:group['template']['subtext'],viewtype:"Label",frame:{x:pagedef['width']-185,y:16,width:150,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:12,align:"right",color:{name:"SteelBlue"}}});
										break;
									case 'contactform':
										row['children'].push({id:"ui-group-0-main-"+i,name:'',value:'', template:group['template']['maintext'],viewtype:"Label",frame:{x:10,y:17,width:(pagedef['width']-40)*0.4,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:16,align:"right",color:{name:"black"}}},
									 			 			 {id:"ui-group-0-sub-"+i,name:'',value:'', template:group['template']['subtext'],viewtype:"Label",frame:{x:(pagedef['width']-40)*0.4+20,y:17,width:(pagedef['width']-40)*0.6,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:12,align:"left",color:{name:"SteelBlue"}}});
										break;
									case 'custom':
										$.each(group['template']['children'] ,function(j,child){
											row['children'].push($.utility('clone',child));
											row['children'][j].id = ['ui-group-0-',i,'-',j].join('');
										});
										break;
								}
								rows.push(row);
						//	}
						});
						
						group['row'] = rows;
						
						if(pagedef['data']['pagedata'] != undefined && pagedef['data']['contents'].length == 1){
							if(pagedef['data']['pagedata'] === pagedef['data']['contents'][0]){
							   group['row'] = [];
							}
						}
					}
					
					if(pagedef['pageOverlay'] != undefined && pagedef['pageOverlay'].length > 0){
						for(var i=0; i<pagedef['pageOverlay'].length; i++){
							pagedef['children'].push(pagedef['pageOverlay'][i]);
						}
						pagedef['pageOverlay'] = [];
					}
					page['children'] = new $.uichildren(pagedef, pagedef['children'], null);
					
					if($.mobileweb.getCurrentPage() != undefined){
						if(page.getName() == $.mobileweb.getCurrentPage().getName()){
							if($.mobileweb.getCurrentPage()['children'] != undefined){
								if(page['children'] !== $.mobileweb.getCurrentPage()['children'])
									$.mobileweb.setCurrentPage(page);
							}
						}
					}
					
				break;
				case 'BaseView':
				case 'ScrollView':
					if(pagedef['pageOverlay'] != undefined && pagedef['pageOverlay'].length > 0){
						for(var i=0; i<pagedef['pageOverlay'].length; i++){
							pagedef['children'].push(pagedef['pageOverlay'][i]);
						}
						pagedef['pageOverlay'] = [];
					}
					page['children'] = new $.uichildren(pagedef, pagedef['children'], pagedef['data']['contents'][0]);
					
					if($.mobileweb.getCurrentPage() != undefined && !$.isEmptyObject($.mobileweb.getCurrentPage())){
						if(page.getName() == $.mobileweb.getCurrentPage().getName()){
							if($.mobileweb.getCurrentPage()['children'] != undefined){
								if(page['children'] !== $.mobileweb.getCurrentPage()['children'])
									$.mobileweb.setCurrentPage(page);
							}
						}
					}
					
					break;
					
				case 'PageScrollView':
					var containerchildren = [];
					$.each(pagedef['children'],function(i,child){
						containerchildren.push($.utility('getObject',$.mobileweb['pages'],'name',child['name']));
					});
					
					pagedef['containerchildren'] = containerchildren;					
					page['children'] = new $.uiPageScrollViewContainer(pagedef, pagedef['children'], pagedef['data']['contents'][0]);
					var timerID = setInterval(function() {
						if((pagedef['children'].length == pagedef['data']['innerPagesCount']) ){
							clearInterval(timerID);
							page['pagescrollviewChildren'] = true;
							$.utility('initChildren', true);
						}
					},300);
					break;
				case 'SplitView':
					var initChildren = [];
					$.each(pagedef['children'],function(j,pageChild){
						if(pagedef['children'][j]['parent'].lastIndexOf(pagedef['name']) != -1 && pagedef['children'][j]['parent'].split(pagedef['name'])[1] == ""){
							initChildren.push(pageChild);
						}
					});
					var grandChildren = [];
					$.each(pagedef['children'],function(i,child){
						$.each($.mobileweb['pages'],function(j,page1){
							if(page1['parent'].lastIndexOf(child['name']) != -1 && page1['parent'].split(child['name'])[1] == ""){
								page1['parent'] = child['name'];
								page1['isgrandChild'] = true;
								grandChildren.push(page1);
								
								var pageNTD = {};
								pageNTD = Object.assign({}, page1);
								pageNTD['name'] = pageNTD['name']+"_ntd";
								pageNTD['notransferdata'] = true;
								pageNTD['children'] = [];
								if(page1['children'].length > 0){
									$.each(page1['children'], function(key, child){
										var childNTD = Object.assign({}, child);
										childNTD['id'] = childNTD['id']+"_ntd";
										pageNTD['children'].push(childNTD);
									});
								}
								grandChildren.push(pageNTD);
							}
						});
					});
					if(isReverse == undefined)	isReverse = false;
					if(grandChildren.length > 0 && !isReverse){
						pagedef['children'] = [];
						pagedef['children'] = initChildren;
						pagedef['children'] = $.merge(pagedef['children'], grandChildren);
					}
					
					page['children'] =  new $.uiSplitViewPageContainer(pagedef, pagedef['children']);
					var timerID = setInterval(function() {
						if((pagedef['children'].length == pagedef['data']['innerPagesCount']) ){
							clearInterval(timerID);
							page['splitviewChildren'] = true;
							$.utility('initChildren', true);
						}
					},300);
					break;
			}
		};
		
		page.getName = function(){
			return pagedef['name'];
		};
		page.getParent = function(){
			return pagedef['parent'];
		};
		page.setParent = function(parentPage){
			pagedef['parent'] = parentPage;
		};
		page.getViewType = function(){
			return pagedef['type'];
		};
		page.getTitle = function(){
			return pagedef['pageTitle'];
//			if(pagedef['header']['title']=="")
//				pagedef['header']['title']=$.mobileweb.getCurrentPage().getName();
//			return pagedef['header']['title'];
			
		};
		
		page.MovePage = function(transition, isReverse){
			$(' .scroller').remove();
			//REGISTER EVENT LISTENERS
			$('#'+pagedef['name']).live('pagehide', pageHide);
			$('#'+pagedef['name']).live('pagebeforeshow', applyOverrides);
			if(pagedef['type'] != "ScrollView") {
				$('#'+pagedef['name']).live('pagebeforeshow', blockPageUI);
			}
			$('#'+pagedef['name']).live('pageshow', pageShow);
			$('#page_body').append(getHTML());
			
			$.mobile.initializePage();
			$.mobile.changePage('#' + pagedef['name'], {transition: transition,reverse: isReverse,changeHash: true});		
		};
		
		page.liveContainer = function(){
			//ContainerChildren is present in Pagescroll View Pages
			if(pagedef['containerchildren']!= undefined ) {
					var next='';
					var prev='';
					var nextindex='';
					var previndex='';
		
				for (var i in pagedef['containerchildren']){
					
					if(pagedef['containerchildren'][i]==pagedef['name']){
						nextindex=parseInt(i) + 1;
						previndex=parseInt(i) - 1;
						if(pagedef['containerchildren'][nextindex]!== undefined)
							next=pagedef['containerchildren'][nextindex];
						else
						next=pagedef['containerchildren'][i];
						
						if(pagedef['containerchildren'][previndex]!== undefined)
							prev=pagedef['containerchildren'][previndex];
						else
							prev=pagedef['containerchildren'][i];
						}
				}	
			}
		};
		
		page.show = function(transition, isReverse){
			if(isReverse){
				pagedef['reverse'] = true;
			}
			
			$.utility('log','[INFO] Change Page: '+pagedef['name']);
		    var _page=$.utility('getObject',$.mobileweb['pages'],'name',pagedef['parent']);
			
		    if($.mobileweb['state'] !== 'preview')
				pagescaledHeightRatio(pagedef);
		    
			if(pagedef['type'] == "DBTableViewList"){
				var timer = setInterval(function(){
					$('#'+pagedef['name']).live('pagehide', pageHide);
					$('#'+pagedef['name']).live('pagebeforeshow', applyOverrides);
					$('#'+pagedef['name']).live('pagebeforeshow', blockPageUI);
					$('#'+pagedef['name']).live('pageshow', pageShow);
					$(' .scroller').remove();	// this is a fix for when DB pages comes blank...
					page.applyData();
					$('#page_body').append(getHTML());
					if($.mobile.activePage.attr('id')===pagedef['name']){
						applyOverrides(true);
					}
					else{
						$.mobile.changePage('#' + pagedef['name'], {transition: transition,reverse: isReverse,changeHash: true});
					}
					$.utility('queryDatabase',false);
					window.clearInterval(timer);
				},0);
			}else if((pagedef['type'] == "DBTableView")||(pagedef['type'] == "RemoteTableView")){
				if(($.isEmptyObject(_page)) || (_page == undefined) || ((_page['type']!= 'DBTableViewList') && (_page['type']!= 'RemoteTableViewList'))) {
						//$.utility('queryDatabase',true);
						if(pagedef['type'] == "DBTableView"){
							new $.actions(pagedef, null, [{method:"Select", category:"DBAction", params:{tablename:pagedef['data']['tablename'], where:pagedef['data']['wherecond'], order:pagedef['data']['order'], columns:""}}]).execute();
						}else {
							var columns ="";// $.utility('getColumns',pagedef['data']['tablename'],[], pagedef['children'], pagedef['data']['contents'][0]);
											//as per now , we dont need columns , if columns is blank , it will fetch all the fields of table.
							var databaseName = "";
							if($.mobileweb['release'] != undefined && $.mobileweb['release'] ){
								databaseName = 'db_' + $.mobileweb['pid']+"_release";
							}else{	
								databaseName = 'db_' + $.mobileweb['pid'];
							}

							new $.actions(pagedef, null, [{method:"Select", category:"ComAction", 
											params:{
												servicename: pagedef['data']['servicename'],
												database: databaseName,
												table: pagedef['data']['tablename'],
												where: pagedef['data']['wherecond'],
												order: pagedef['data']['order'],
												fields: columns}
										}]).execute();
						}
						var timer = setInterval(function(){
							if(!$.utility('isBusy')){
								$('#'+pagedef['name']).live('pagehide', pageHide);
								$('#'+pagedef['name']).live('pagebeforeshow', applyOverrides);
								$('#'+pagedef['name']).live('pagebeforeshow', blockPageUI);
								$('#'+pagedef['name']).live('pageshow', pageShow);
								$('#page_body').append(getHTML());
								
								page.applyData();
								$.mobile.initializePage();
								if($.mobile.activePage.attr('id')===pagedef['name']){
									applyOverrides(true); // Done Specially for Reload Updated Data Action
								}
								else
									$.mobile.changePage('#' + pagedef['name'], {transition: transition,reverse: isReverse,changeHash: true});
								$.utility('queryDatabase',false);
								window.clearInterval(timer);
							}
						},700);
						
				}else if((_page != undefined) && (_page['type'] == 'DBTableViewList') && (pagedef['type'] == "DBTableView") && (_page['data']['tablename'] != (pagedef['data']['tablename']))){
					$.utility('queryDatabase',true);
					new $.actions(pagedef, null, [{method:"Select", category:"DBAction", params:{tablename:pagedef['data']['tablename'], where:pagedef['data']['wherecond'], order:pagedef['data']['order'], columns:""}}]).execute();
					var timer = setInterval(function(){
						if(!$.utility('isBusy')){
						$('#'+pagedef['name']).live('pagehide', pageHide);
						$('#'+pagedef['name']).live('pagebeforeshow', applyOverrides);
						$('#'+pagedef['name']).live('pagebeforeshow', blockPageUI);
						$('#'+pagedef['name']).live('pageshow', pageShow);
						$('#page_body').append(getHTML());
						
						page.applyData();
						$.mobile.initializePage();
						if($.mobile.activePage.attr('id')===pagedef['name']){
							applyOverrides(true); // Done Specially for Reload Updated Data Action
						}
						else
							$.mobile.changePage('#' + pagedef['name'], {transition: transition,reverse: isReverse,changeHash: true});
						$.utility('queryDatabase',false);
						window.clearInterval(timer);
						
					}
					},700);
				}else if((_page != undefined) && (_page['type'] == 'RemoteTableViewList') && (pagedef['type'] == "RemoteTableView") && (_page['data']['tablename'] != (pagedef['data']['tablename']))){
					$.utility('queryDatabase',true);
					var columns ="";// $.utility('getColumns',pagedef['data']['tablename'],[], pagedef['children'], pagedef['data']['contents'][0]);
					//as per now , we dont need columns , if columns is blank , it will fetch all the fields of table.
					var databaseName = "";
					if($.mobileweb['release'] != undefined && $.mobileweb['release'] ){
						databaseName = 'db_' + $.mobileweb['pid']+"_release";
					}else{	
						databaseName = 'db_' + $.mobileweb['pid'];
					}
					new $.actions(pagedef, null, [{method:"Select", category:"ComAction", 
						params:{
							servicename: pagedef['data']['servicename'],
							database: databaseName,
							table: pagedef['data']['tablename'],
							where: pagedef['data']['wherecond'],
							order: pagedef['data']['order'],
							fields: columns}
						}]).execute();
					var timer = setInterval(function(){
						if(!$.utility('isBusy')){
						$('#'+pagedef['name']).live('pagehide', pageHide);
						$('#'+pagedef['name']).live('pagebeforeshow', applyOverrides);
						$('#'+pagedef['name']).live('pagebeforeshow', blockPageUI);
						//$('#'+pagedef['name']).live('pagebeforeshow', applyBeforeViewPageEvents);
					
						$('#'+pagedef['name']).live('pageshow', pageShow);
						//$('#'+pagedef['name']).live('pageshow', applyAfterViewPageEvents);
						$('#page_body').append(getHTML());
						
						page.applyData();
						$.mobile.initializePage();
						if($.mobile.activePage.attr('id')===pagedef['name']){
							applyOverrides(true); // Done Specially for Reload Updated Data Action
						}
						else
							$.mobile.changePage('#' + pagedef['name'], {transition: transition,reverse: isReverse,changeHash: true});
						$.utility('queryDatabase',false);
						window.clearInterval(timer);
						
					}
					},700);
				}else {
					page.MovePage(transition, isReverse);
				}
			}else if(pagedef['type'] === "SplitView"){
				var timer = setInterval(function(){
					if(page['splitviewChildren']){
						window.clearInterval(timer);
						$('#'+pagedef['name']).live('pagehide', pageHide);
						$('#'+pagedef['name']).live('pagebeforeshow', applyOverrides);
						$('#'+pagedef['name']).live('pagebeforeshow', blockPageUI);
						$('#'+pagedef['name']).live('pageshow', pageShow);
						$('#page_body').append(getHTML());
						$.mobile.initializePage();
						if($.mobile.activePage.attr('id')===pagedef['name']){
							applyOverrides(true); // Done Specially for Reload Updated Data Action
						}
						else
							$.mobile.changePage('#' + pagedef['name'], {transition: transition,reverse: isReverse,changeHash: true});
					}
				},700);
				
			}else if(pagedef['type'] === "PageScrollView"){
				var timer = setInterval(function(){
					if(page['pagescrollviewChildren']){
						window.clearInterval(timer);
						$('#'+pagedef['name']).live('pagehide', pageHide);
						$('#'+pagedef['name']).live('pagebeforeshow', applyOverrides);
						$('#'+pagedef['name']).live('pagebeforeshow', blockPageUI);
						$('#'+pagedef['name']).live('pageshow', pageShow);
						$('#page_body').append(getHTML());
						$.mobile.initializePage();
						if($.mobile.activePage.attr('id')===pagedef['name']){
							applyOverrides(true); // Done Specially for Reload Updated Data Action
						}
						else
							$.mobile.changePage('#' + pagedef['name'], {transition: transition,reverse: isReverse,changeHash: true});
					}
				},700);
				
			}else{
				page.MovePage(transition, isReverse);
			}
			// store current page-default information.. 
			$.utility('setbasicPageDef',pagedef);
		};
		
		page.getOriginalFrame = function(){
			return {"height" : pagedef['height'], "width" : pagedef['width']};
		};
		
		page.refreshDisplay = function(resetData){
			applyOverrides(true, resetData);
		};
		
		page.getChild = function(name, ui, targetPage){ //new argument 'targetPage' added on 4 March, 2013 as it is require for implementing logic for fetching spliView children --Sachit Kesri 
			var _child = {};
			var count = 0;
			if(this['toolbartop']['children'] != undefined){
				$.each(this['toolbartop']['children'],function(i,child){
					if(child.getName() === name){
						_child = child;
						count++;
					}
				});
			}
			if(this['toolbarbottom']['children'] != undefined){
				$.each(this['toolbarbottom']['children'],function(i,child){
					if(child.getName() === name){
						_child = child;
						count++;
					}
				});
			} 
			if(this['leftToolBar'] != undefined && this['leftToolBar']['children'] != undefined){
				if(pagedef['toolbarleft']['view'] !== 'TableView'){
					$.each(this['leftToolBar']['children'],function(i,child){
						if(child['group'] == undefined && child.getName() === name){
							_child = child;
							count++;
						}
					});
				}
			}
			if(this['toolbarright'] != undefined && this['toolbarright']['children'] != undefined){//RightToolBar
				if(pagedef['toolbarright']['view'] !== 'TableView'){
					$.each(this['toolbarright']['children'],function(i,child){
						if(child['group'] == undefined && child.getName() === name){
							_child = child;
							count++;
						}
					});
				}
			} 
			if(count == 0){
				if(this.getViewType() == 'PageScrollView'){
						var childFound = false;
						$.each(page['children'], function(i, childPage){
							if(childPage.getName() === targetPage){
								var innerPage = $.mobileweb.getPage(childPage.getName());	// to get the inner splitview child page..
								$.each(innerPage['children'], function(key, child){
									if(child.getName() === name){
										childFound = true;
										_child = child;
									}
									
								});
								
							}
						});
				}else if(this.getViewType() == 'SplitView'){
					var childFound = false;
					$.each(page['children'], function(i, childPage){
						if(childPage.getName() === targetPage){
							var innerPage = $.mobileweb.getPage(childPage.getName());	// to get the inner splitview child page..
							$.each(innerPage['children'], function(key, child){
								if(child.getName() === name){
									childFound = true;
									_child = child;
								}
								
							});
							
						}
					});
				}else{
					if(this['children'] != undefined){
						$.each(this['children'],function(i,child){
							if(pagedef['type']=="DBTableViewList"|| pagedef['type']=="RemoteTableViewList"|| pagedef['type']=="RemoteTableView" ||pagedef['type']=="DBTableView"||pagedef['type']=="TableView"){
								if(child.getName !== undefined){
									if(child.getViewType() === "Dialog"){
										if(child.getName() === name){
											_child = child;
											return false;
										}else{
											$.each(child['children'],function(i,dialog_child){
												if(dialog_child.getName() === name){
													_child = dialog_child;
													return false;
												}
											});
											return false;
										}										
									}
								}	
								$.each(child['group'],function(k,group){
									$.each(group['row'],function(l,row){
										$.each(row['children'],function(m,children){
											if(ui == null){
												if(children.getViewType() == 'Radio'){
													if(children.getRadioGroup() === name){
														_child = children;
													    return false;
													}
												}
												else{
													if(children.getName() === name){
														_child = children;
														return false;
													}
												}
											}else if(typeof(ui.getId) != "undefined"){
												$.each(row['children'],function(m,elements){
													if(elements.getViewType() == 'Radio'){
														if(elements.getRadioGroup() === name){
														   _child = elements;
														   return false;
														}
													}
													else{
														if(elements.getName() === name || elements.getName() === name+'-'+l){//Bug #10495 Fix
														   _child = elements;
														   return false;
														 }
													}
												});
											}
											else if((ui['id']!=null)){
												if(children.getId() == ui['id']){
													$.each(row['children'],function(m,elements){
														if(elements.getName() === name || elements.getName() === name+'-'+l){//Bug #10495 Fix)
															_child = elements;
															return false;
														}
													});
												}else if( pagedef['type']=="RemoteTableViewList" || pagedef['type']=="DBTableViewList"){
													$.each(row['children'],function(m,elements){
														if(elements.getName() === name){
															_child = elements;
															return false;
														}
													});
												}else if(pagedef['type']=="RemoteTableView" || pagedef['type']=="DBTableView" || pagedef['type']=="TableView"){
													$.each(row['children'],function(m,elements){
														if(elements.getName() === name){
															_child = elements;
															return false;
														}
													});
												}
											}
										});
									});
								});

							}else if(pagedef['type']=="TableViewList"){

								$.each(child['group'],function(k,group){
									$.each(group['row'],function(l,row){
										$.each(row['children'],function(m,children){
											if(typeof(ui.getId) != "undefined"){
												$.each(row['children'],function(m,elements){
													if(elements.getName() === name){
														_child = elements;
														return false;
													}
												});

											}else if((ui['id']!=null)){
												if(children.getId() == ui['id']){
													$.each(row['children'],function(m,elements){
														if(elements.getName() === name){
															_child = elements;
															return false;
														}
													});
												}else if( pagedef['type']=="RemoteTableViewList" || pagedef['type']=="DBTableViewList"){
													$.each(row['children'],function(m,elements){
														if(elements.getName() === name){
															_child = elements;
															return false;
														}
													});
												}
											}
										});
									});
								});

							}else{
								if(child.getViewType() === "Dialog"){
									$.each(this['children'],function(index,dialogchild){
										if(dialogchild.getName() === name){
											_child = dialogchild;
											return false;
										}
									});
								}
								if(child.getName() === name){
									if(child.getViewType() === "Gadget"){
										_child = child.getMainObject();
										return false;
									}else{
										_child = child;
										return false;
									}
										
								}	
							}
						});
					}
				}
			}
			if($.isEmptyObject(_child) && $("[name='"+ name +"']").length != 0){
				var elementObject = $.utility('getUiID_Object_From_Page',$.mobileweb.getCurrentPage().getName(),$($("[name='"+ name +"']")).attr('id'));
				_child = page.getChild(elementObject['name'], ui, targetPage);
			}
			
			return _child;
		};
		page.getGadgetChild = function(name, ui, parentUIName){
			var _child = {};
			if(this['children'] != undefined){
				$.each(this['children'],function(i,child){
					if(child.getName() === parentUIName){
						$.each(child.getChildren(),function(i,uiChild){
							if(uiChild[0].getName() === name){
								_child = uiChild[0];
							}
						});
					}
				});
			}
			if(this['toolbartop']['children'] != undefined){
				$.each(this['toolbartop']['children'],function(i,child){
					if(child.getName() === parentUIName){
						$.each(child.getChildren(),function(i,uiChild){
							if(uiChild[0].getName() === name){
								_child = uiChild[0];
							}
						});
					}
				});
			} 
			if(this['toolbarbottom']['children'] != undefined){
				$.each(this['toolbarbottom']['children'],function(i,child){
					if(child.getName() === parentUIName){
						$.each(child.getChildren(),function(i,uiChild){
							if(uiChild[0].getName() === name){
								_child = uiChild[0];
							}
						});
					}
				});
			} 
			return _child;
		};
		page.getGadgetUI = function(name, ui){
			var _child = {};
			if(this['children'] != undefined){
				$.each(this['children'],function(i,child){
					if(child.getName() === name && child.getViewType() === "Gadget"){
						_child = child;
					}
				});
				return _child;
			}
			if(this['toolbartop']['children'] != undefined){
				$.each(this['toolbartop']['children'],function(i,child){
					if(child.getName() === name && child.getViewType() === "Gadget"){
						_child = child;
					}
				});
			} 
			if(this['toolbarbottom']['children'] != undefined){
				$.each(this['toolbarbottom']['children'],function(i,child){
					if(child.getName() === name && child.getViewType() === "Gadget"){
						_child = child;
					}
				});
			} 
			return _child;
		};
		page.triggerActions = function(){
			
			var isTabPageVisited = false;
			var tabPageList = $.utility('getTabPage');//
			$.each(tabPageList , function(index, tab){
				if(tab['page'] == page.getName() && tab['tabFlag'] == true){
					isTabPageVisited = true;
				}
			});
			if(isTabPageVisited){
				$.utility("setPageLoadingFlag", false);
				if(!$.utility('getResetEvent')){
					$.utility('setResetEvent', false);
					return;
				}
			}
			if($.utility('getResetEvent'))
				$.utility('setResetEvent', false);
			
			if(pagedef['events'] != undefined && pagedef['events']['AfterViewPage']!= undefined && pagedef['events']['AfterViewPage'].length > 0){
				$.utility('setActionRunningStatus', true);
				new $.actions(pagedef, null, pagedef['events']['AfterViewPage'].slice(),undefined, function(){
					$.utility("setPageLoadingFlag", false);
				}).execute(); 
			}else{
				$.utility("setPageLoadingFlag", false);
			}
			if(pagedef['parent'] != undefined && pagedef['parent'].indexOf("page") == -1)
				$.utility('setTabPage', page.getName());
		};
		page.callReverse = function(transition){
			//pagedef = $.utility('getParentPagedef');
			page = $.mobileweb.getCurrentPage();
			$('#'+pagedef['name']).live('pagehide', pageHide);
			$('#'+pagedef['name']).live('pagebeforeshow', applyOverrides);
			$('#'+pagedef['name']).live('pagebeforeshow', blockPageUI);
			if(pagedef['parent'].split("_").length > 1)
				$('#'+pagedef['name']).live('pagebeforeshow', applyBeforeViewPageEvents);
			
			$('#'+pagedef['name']).live('pageshow', pageShow);
			//$('#'+pagedef['name']).live('pageshow', applyOverrides);
			//$('#'+pagedef['name']).live('pageshow', applyAfterViewPageEvents);
			if(pagedef['type'] == "RemoteTableViewList" || pagedef['type'] == "DBTableViewList"){
				page.applyData(true);
				$('#page_body').append(getHTML());
			}else{
				$('#page_body').append(getHTML());
				page.applyData(true);
			}
			$.mobile.initializePage();
			if($.mobile.activePage.attr('id')===pagedef['name']){
				applyOverrides(true); 
			}
			else
				$.mobile.changePage('#' + pagedef['name'], {transition: transition,reverse: true,changeHash: true});
			$.utility('queryDatabase',false);
		
		};
		var getHTML = function(){
			var children = new Array();
			if(page['children'] != undefined){
				children = page['children'];
			}
			
			return [
			        '<div data-role="page" id="',pagedef['name'],'" class="page-body">',
						page['statusbar'].getHTML(),
						page['header'].getHTML(),
			        	page['toolbartop'].getHTML(),
			        	page['leftToolBar'].getHTML(),
			        	page['rightToolBar'].getHTML(),
			        	'<div data-role="content">',
			        		'<div class="wrapper">',
			        			'<div id="iscroll_',pagedef['name'],'">',
			        				'<div class="bglayout" style="background:transparent">',
				        				'<div class="scroller">',
				        					(children.length>0) ? children.getHTML() : '',
				        				'</div>',
				        			'</div>',
			        			'</div>',
			        		'</div>',
			        	'</div>',
			        	page['toolbarbottom'].getHTML(),
			        	page['footer'].getHTML(),
			        '</div>'
			        ].join('');
		};
		
		var pageHide = function(){
			$('#'+pagedef['name']).remove();
			//REMOVE EVENT LISTENERS
			$('#'+pagedef['name']).die('pagehide', pageHide);
			$('#'+pagedef['name']).die('pagebeforeshow', applyOverrides);
			$('#'+pagedef['name']).die('pagebeforeshow', blockPageUI);
			$('#'+pagedef['name']).die('pagebeforeshow', applyBeforeViewPageEvents);
			
			$('#'+pagedef['name']).die('pageshow', pageShow);
			//$('#'+pagedef['name']).die('pageshow', applyAfterViewPageEvents);
		};
		
		var pagescaledHeightRatio = function(page){
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
			
			var _pageheight = page['height'];
			if(page['type'] == "ScrollView"){
				var _scrIdx = 0;
				if($.mobileweb.screens['screenIndex'] != undefined)
					_scrIdx = $.mobileweb.screens['screenIndex'];
				_pageheight = $.mobileweb.screens[_scrIdx].height;
			}
			
			var _clientHeightAvailable_forScaling = document.documentElement.clientHeight - _unscaledPageBars;
			var _scaledRatio = _clientHeightAvailable_forScaling / (_pageheight - _unscaledPageBars);
			$.mobileweb.device['aspectHratio'] = _scaledRatio;
		};
		
		var applyOverrides = function(isPageRefresh, resetData){
			window.scrollTo(0, 1);
			
			var _clientHeight = pagedef['height'];
			if($.mobileweb['state'] !== 'preview'){
//				pagescaledHeightRatio(pagedef); //In reference of bug #12363
//				_clientHeight = document.documentElement.clientHeight;
			if(resetData != true){ 
				pagescaledHeightRatio(pagedef);
				_clientHeight = document.documentElement.clientHeight;
			}
			else
				_clientHeight = $.mobileweb.device['height'];
			}	
			
			if($.mobileweb['state'] == 'preview' && pagedef['type'] == "ScrollView")
				_clientHeight = document.documentElement.clientHeight;
			//console.log(pagedef['type'], '**********', $.mobileweb.device['aspectHratio'], $.mobileweb.device['aspectWratio']);

			if(pagedef['toolbarleft'] != undefined && !pagedef['toolbarleft']['hidden']) {
				if(pagedef['toolbarleft']['fixed'])
					pagedef['isSidebarFixed'] = true;
				else
					pagedef['isSidebarFixed'] = false;				
			}
			
			if(pagedef['parentType'] == undefined || pagedef['parentType'] != "PageScrollView"){
				page['statusbar'].applyOverrides();
				page['header'].applyOverrides();
				page['footer'].applyOverrides();
				page['toolbartop'].applyOverrides(isPageRefresh);
				page['toolbarbottom'].applyOverrides(isPageRefresh);
				page['leftToolBar'].applyOverrides();
				page['rightToolBar'].applyOverrides();
			}
			
			var statusBarHeight = (pagedef['statusbarhidden'] != undefined && !pagedef['statusbarhidden']) ? 20 : 0;	// will set the status bar height for the page frame to cut the page by 20px when status bar is not visible...
			//var setYwhenStatusBar = ($.mobileweb['state'] === 'preview' && statusBarHeight > 0) ? 20 : 0;	// set Y of a page when we have statusBar visible on preview only...
			var setYwhenStatusBar = (statusBarHeight > 0) ? 20 : 0;
			var toolbartopheight = (pagedef['toolbartop'] != undefined && !pagedef['toolbartop']['hidden']) ? pagedef['toolbartop']['frame']['height'] : 0;
			var toolbarBottomheight = (pagedef['toolbarbottom'] != undefined && !pagedef['toolbarbottom']['hidden']) ? pagedef['toolbarbottom']['frame']['height'] : 0;
			
			if(pagedef['isSidebarFixed']) {
			    page['frame'] = {                              
							x: pagedef['toolbarleft']['frame']['width'] * $.mobileweb.device['aspectWratio'],
							y: page['header']['height']+setYwhenStatusBar+(parseInt(toolbartopheight)* $.mobileweb.device['aspectHratio']),
							width: (pagedef['width'] - pagedef['toolbarleft']['frame']['width']) * $.mobileweb.device['aspectWratio'],
							height: (_clientHeight - (parseFloat(toolbartopheight)+parseFloat(toolbarBottomheight)) *$.mobileweb.device['aspectHratio'])  - (statusBarHeight+page['header']['height']+page['footer']['height'])
				};
			    
			}else {
				page['frame'] = {                              
						x:0,
						y:page['header']['height']+setYwhenStatusBar+(parseInt(toolbartopheight)* $.mobileweb.device['aspectHratio']),
						width:pagedef['width'] * $.mobileweb.device['aspectWratio'],
						//height:(pagedef['height']-(statusBarHeight+page['header']['height']+parseFloat(toolbartopheight)+parseFloat(toolbarBottomheight)+page['footer']['height'])) * $.mobileweb.device['aspectratio']
						height:(_clientHeight - (parseFloat(toolbartopheight)+parseFloat(toolbarBottomheight)) *$.mobileweb.device['aspectHratio'])  - (statusBarHeight+page['header']['height']+page['footer']['height'])
				};				
			}
			$.utility('setPageFrame', page['frame']);
			
			if(page['children'] != undefined){
				if(resetData)
				    page.applyData();
				page['children'].applyOverrides();
			}
			
			if(resetData == true){
				$.utility('setreSettingDataStatus', false);
			}else{
				page['toolbartop'].applyEvents();
				if(page['children'] != undefined)
					page['children'].applyEvents();
				page['toolbarbottom'].applyEvents();
				page['leftToolBar'].applyEvents();
				page['rightToolBar'].applyEvents();
				$.utility('setAppBootingForFirstTime', false);
			}
			
			var sLeft = 0;
			if(pagedef['isSidebarFixed']) {
				if(pagedef['type'] != "ScrollView")
					sLeft = page['frame']['x'];
			}else {
				sLeft = (document.documentElement.clientWidth > page['frame']['width']) ? (document.documentElement.clientWidth - page['frame']['width'])/2:0;				
			}
			var sHeight = _clientHeight-(statusBarHeight+page['footer']['height']+page['header']['height']);
//			var sHeight = document.documentElement.clientHeight-(statusBarHeight+page['footer']['height']+page['header']['height']);
			
			if((!$.mobileweb.device.standalone)&&($.mobileweb.device.type==='iPhone' || $.mobileweb.device.type==='iPad')){
				sHeight += 60;
			}

			//Set default position of HTML layouts for any pagetype
			$('#iscroll_'+pagedef['name']).css({'position':'absolute', top:page['frame']['y'], left:0, width:document.documentElement.clientWidth});
			$('#iscroll_'+pagedef['name']).css({'height':sHeight-((parseFloat(toolbartopheight)+parseFloat(toolbarBottomheight))* $.mobileweb.device['aspectHratio'])});
			
			$('.scroller').css({position:'relative', left:sLeft, width:page['frame']['width'], height:page['frame']['height']});
			if(pagedef['type'] != "TableViewListTab"){
				$('.scroller').css({background: ($.attributes('color',pagedef['backgroundColor'])).getColorCode()});
			}else
				$('.scroller').css({background: 'rgba(255,255,255,1.0)'});
			
			if(page['frame']['width'] < document.documentElement.clientWidth)
				$('.bglayout').css({width:document.documentElement.clientWidth});
			else
				$('.bglayout').css({width:page['frame']['width']});
			
			if(page['frame']['height'] < sHeight){
				if($.mobileweb.device.type === 'iPhone' && $.browser.safari)
					$('.bglayout').css({height:sHeight+20});
				else 
					$('.bglayout').css({height:sHeight});
			}else
				$('.bglayout').css({height:page['frame']['height']});
			
			
			//Set position of HTML layouts based on page 'type'
			if(pagedef['type'] === "BaseView"){//Bug #10541 Fix   
				if($('#iscroll_'+pagedef['name']).length > 0){
					var scrollHeight = $('#iscroll_'+pagedef['name']).css('height').replace('px','');    
					$('.bglayout').css({height:scrollHeight});
				}
				$('#'+pagedef['name']).css({'overflow':'hidden'});
				
			}else if(pagedef['type']=="ScrollView"){
				//only for scroll view page
				if($.mobileweb['state'] != 'preview' ){
					$('#iscroll_'+pagedef['name']).css({'position': 'absolute', 'width':document.documentElement.clientWidth-pagedef['x'], 'height':sHeight-pagedef['y'] -((parseFloat(toolbartopheight)+parseFloat(toolbarBottomheight)) * $.mobileweb.device['aspectHratio']), 'top':page['frame']['y']+pagedef['y'], 'left':pagedef['x']});
				}else{
					$('#iscroll_'+pagedef['name']).css({'position': 'absolute', 'width':document.documentElement.clientWidth-pagedef['x'], 'height':sHeight-pagedef['y'] -parseFloat(toolbartopheight) -parseFloat(toolbarBottomheight) , 'top':page['frame']['y']+pagedef['y'], 'left':pagedef['x']});
				}
				
				if(pagedef['height'] * $.mobileweb.device['aspectHratio'] >= sHeight){
					$('.scroller').css({height:(pagedef['height'] * $.mobileweb.device['aspectHratio']),width:pagedef['width'] * $.mobileweb.device['aspectWratio'],left:page['frame']['x']});
					$('.bglayout').css({height:(pagedef['height'] * $.mobileweb.device['aspectHratio']),width:(pagedef['width']-pagedef['x']) * $.mobileweb.device['aspectWratio']});
				}else{
					$('.scroller').css({height:(page['frame']['height']),width:pagedef['width'] * $.mobileweb.device['aspectWratio'],left:page['frame']['x']});
					$('.bglayout').css({height:(page['frame']['height']),width:(pagedef['width']-pagedef['x']) * $.mobileweb.device['aspectWratio']});
				}
				
				if($.mobileweb.device.type === 'iPhone' && $.browser.safari){
					$('.bglayout').css({height:(parseFloat(pagedef['height'])+60) * $.mobileweb.device['aspectHratio']});
				}
				
				var scrollview_left = 0;
				if($('#iscroll_'+pagedef['name']).css('left') != undefined)
					scrollview_left = $('#iscroll_'+pagedef['name']).css('left').replace("px","");
				$('#iscroll_'+pagedef['name']).css({'left':parseFloat(scrollview_left)+sLeft});
				if($.mobileweb.device['type'] === 'Desktop')
					$('#iscroll_'+pagedef['name']).css({'overflow-y':'scroll','overflow-x':'hidden'});
				
			}else if(pagedef['type']=="RemoteTableViewList" || pagedef['type']=="TableViewListTab" || pagedef['type']=="DBTableViewList" || pagedef['type']=="TableViewList" || pagedef['type']=="DBTableView" || pagedef['type']=="TableView" || pagedef['type']=="RemoteTableView"){
				var allRowHeight = 0;
				$.each(pagedef['children'],function(i,child){
					if(child['tablestyle'] === 'Grouped' || child['tablestyle'] === 'Plain'){
						$.each(child['group'],function(k,group){
							allRowHeight = allRowHeight + 170;
						});
					}
				});
					
				if(page['children'] != undefined){
					$.each(page['children'],function(i,child){
						if(child['group'] != undefined){
							$.each(child['group'],function(k,group){
								$.each(group['row'],function(l,row){
									allRowHeight = allRowHeight + row.getCellHeight();
									allRowHeight = allRowHeight + 2;
								});
							});
						}
					});
				}
				
				if($.mobileweb.device.iframe){
					if(allRowHeight < document.documentElement.clientHeight){
						if(allRowHeight < page['frame']['height']){
                        	allRowHeight=page['frame']['height'];
                        }
					}
				}else {
					 if(allRowHeight < page['frame']['height']){
                 		allRowHeight = page['frame']['height'];
					 }
				}
				
				if(allRowHeight == 170){	// When we have 0 rows in total... 
					allRowHeight = page['frame']['height'];
				}
				
				$('.scroller').css({height:allRowHeight});
				$('.bglayout').css({height:allRowHeight});
				$('#iscroll_' + pagedef['name']).css({height:sHeight - ((parseFloat(toolbartopheight)+parseFloat(toolbarBottomheight)) * $.mobileweb.device['aspectHratio'])});
				
				if(pagedef['type'] == "TableViewListTab" && pagedef['name'] == "more"){
					sHeight = (statusBarHeight == 20) ? sHeight+20 : sHeight;
					if ($.utility('getDeviceType') == 'iPhone' || $.utility('getDeviceType') == 'iPad') //Bug #12373 fix
						$('#iscroll_' + pagedef['name']).css({height:sHeight - 49});
					else
						$('#iscroll_' + pagedef['name']).css({height:sHeight});
				}
				
			}else if(pagedef['type'] === "SplitView"){
				$('.bglayout').css({height:page['frame']['height']});
				$('#'+pagedef['name']).css({'overflow':'hidden'});
			}

			if(($.mobileweb['state'] != 'preview') &&  ($.mobileweb['type']==='iphone5')){
				if(pagedef['type'] === "BaseView"){
					var clientHeight = _clientHeight;//document.documentElement.clientHeight;
					if(clientHeight > 460){
						$('.bglayout').css({height:(clientHeight-(page['footer']['height']+page['header']['height'])) +"px"});
					}else $('.bglayout').css({height:(clientHeight+44+20) +"px"});
					
					$('.scroller').css({height:clientHeight+'px'});
				}
			}
			
			$('#'+ pagedef['name']).css({'position':'fixed'});
			if(pagedef['type'] === "PageScrollView"){
				var _containerPageWidth = page['frame']['width'] * pagedef['children'].length;
				$('.bglayout').css({height:page['frame']['height']});
				$('.bglayout').css({width:_containerPageWidth});
				$('.scroller').css({left:'0px'});
				$('#iscroll_' + pagedef['name']).css({left:sLeft});
				$('#iscroll_' + pagedef['name']).css({width:page['frame']['width']});
			}if(pagedef['parentType'] === "PageScrollView" && isPageRefresh){
				$('.scroller').css({left:'0px'});
				$('#'+ pagedef['name']).css({'position':'relative'});
			}
			
			page['toolbarbottom'].applyOverrides(isPageRefresh);
			$.utility("registerPagedefData", pagedef);
		};

		var applyBeforeViewPageEvents = function(){
			if(pagedef['events'] != undefined && pagedef['events']['BeforeViewPage']!= undefined && pagedef['events']['BeforeViewPage'].length > 0){
				$.utility('setActionRunningStatus', true);
				new $.actions(pagedef, null, pagedef['events']['BeforeViewPage'].slice()).execute(); 
			}
		};
		
		var applyAfterViewPageEvents = function(){
			if(pagedef['events'] != undefined && pagedef['events']['AfterViewPage']!= undefined && pagedef['events']['AfterViewPage'].length > 0){
				$.utility('setActionRunningStatus', true);
				new $.actions(pagedef, null, pagedef['events']['AfterViewPage'].slice()).execute(); 
			}
		};
		
		var blockPageUI = function(){
			if(pagedef['events'] != undefined && pagedef['events']['BeforeViewPage']!= undefined && pagedef['events']['BeforeViewPage'].length > 0){
				$('#'+pagedef['name']).hide();
				var timer = setInterval(function(){
					if(!$.utility('getActionRunningStatus')){
						clearInterval(timer);
						$('#'+pagedef['name']).show();
					}
				},100);
			}
		};
		
		var pageShow = function(){
			if($.mobileweb.device['type'] === 'Desktop'){
				$('#iscroll_'+page['name']).css({'overflow-y':'scroll'});
			}else{
				page['iscroll'] = new iScroll($('#iscroll_'+pagedef['name']).get(0), {
//					useTransform: false,	
					bounceLock: true,
					hideScrollbar: true,
					hScroll:false,
					onScrollEnd: function() {
						pagedef['iscroll'].vScroll = true;
						curScrollPos = $(this).get(0).y;
						var offset = {page_name:pagedef['name'],x:curScrollPos};
						$.utility('setSessionData',offset,"offset");
					},
					onBeforeScrollStart: function (e) {
						var target = e.target;
						while (target.nodeType != 1) target = target.parentNode;
						if(target.className == 'scroller'){//Bug #11094 Fix
							//e.stopImmediatePropagation();
							$('#ui-datepicker-div').css({'display':'none'});
							document.getElementsByClassName("scroller")[0].setAttribute("tabindex",-1);
							document.getElementsByClassName("scroller")[0].focus();
						}
						if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA'  && target.tagName != 'VIDEO'){ //Bug #12054 fix
							e.preventDefault();
						}
								
					}
				});
				pagedef['iscroll'] = page['iscroll'];
			}
			
			$('.scroller').keyup(function(e) {
				if(312 >= parseFloat($('#iscroll_'+pagedef['name']).scrollTop())){
					$("#iscroll_"+pagedef['name'] +" > div:nth-child(2) > div").css({"transform" : "translate(0px, "+$('#iscroll_'+pagedef['name']).scrollTop()+"px) translateZ(0px)"});
				}else{
					$("#iscroll_"+pagedef['name'] +" > div:nth-child(2) > div").css({"transform" : "translate(0px, "+312+"px) translateZ(0px)"});
				}
				
			      
			});
			if($('.scroller').get(0) != undefined && $('.scroller').get(0) != null){
				$('.scroller').get(0).addEventListener('keydown', function(e) {
					var focusableEls = $('.scroller').get(0).querySelectorAll('a[href], input, img, button, textarea, input[type="text"],input[type="password"],input[type="password"], input[type="radio"], input[type="checkbox"], select');
					var focusableArr = [].slice.call(focusableEls);
					focusableArr.sort(function(obj1, obj2) {
						return ((obj1['tabIndex'] < obj2['tabIndex']) ? -1 : ((obj1['tabIndex'] > obj2['tabIndex']) ? 1 : 0));
					});  
					var lastFocusableEl = focusableArr[focusableArr.length - 1];//Bug #12632 fix
					var firstFocusableEl = focusableArr[0];  
				    if (e.key === 'Tab' || e.keyCode == 9) {
				    	if ( e.shiftKey ) /* shift + tab */ {
				    		if(e.srcElement.tabIndex == firstFocusableEl.tabIndex){
				    			firstFocusableEl.focus();
			                	e.preventDefault();
					    	}
				    	}else{
				        	if(e.srcElement.tabIndex == lastFocusableEl.tabIndex){
					    		lastFocusableEl.focus();
			                	e.preventDefault();
					    	}
				        } 
				    }
				});
			}
			// no app
		};
		
		init();
		
		return page;
	};
	
	function StatusBar(pagedef){
		var statusbar = {height: 0};
		
		statusbar.getHTML = function(){
			var statusBarImage = '';
			var IFrameWidth = 0;

			if($.mobileweb['type'] === "phone"){
				statusBarImage = (!pagedef['statusbarhidden']) ? $.mobileweb['baseurl']+'/mobileweb/resources/images/system/statusbar_mobile.png' : '';
				IFrameWidth = document.documentElement.clientWidth;
			}else{
				statusBarImage = (!pagedef['statusbarhidden']) ? $.mobileweb['baseurl']+'/mobileweb/resources/images/system/statusbar_tablet.png' : '';
				IFrameWidth = document.documentElement.clientWidth;
			}
			
			if($.mobileweb['state'] === 'preview')
				return ['<img src="',statusBarImage,'" style="position:absolute; top:0px; left:0px; height:20px;width:',IFrameWidth,'px"/>'].join('');
			else{
				var sLeft = 0;
				var _pageWidth = pagedef['width']*$.mobileweb.device['aspectratio'];
                if(!isNaN(_pageWidth)){
                	IFrameWidth = _pageWidth;
                    sLeft = (document.documentElement.clientWidth > _pageWidth) ? (document.documentElement.clientWidth - _pageWidth)/2 : 0;
                }
				
				if(pagedef['statusbarhidden'] != undefined && !pagedef['statusbarhidden'])
					return ['<div id="statusBar" style="position:absolute; top:0px;z-index:1; left:',sLeft,'px; height:20px; width:',IFrameWidth,'px;background-color: rgba(190, 190, 190, 0.8); background-image: linear-gradient(to right, rgba(190, 190, 190, 0.8), rgb(190, 190, 190));"/>'].join('');
				return '';
			}
		};
		
		statusbar.applyOverrides = function(){
			if($.mobileweb['state'] === 'preview')
				statusbar['height'] = 20;
			else{
				if(pagedef['statusbarhidden'] != undefined && !pagedef['statusbarhidden']){
					statusbar['height'] = 20;
				}else
					statusbar['height'] = 0;
			}
		};
		
		statusbar.applyevents= function(){
			// no apply events..
		};
			
		return statusbar;
	};
	
	function Header(pagedef){
		var header = {  height: 0,
						persistent: (typeof $.utility('getObject',$.mobileweb['tabs'],'page',pagedef['name']))==='object'};
		var headerdef = pagedef['header'];

		header.setTitle = function(param){
			headerdef['title'] = param;
		};
		
		header.getTitle = function(){
			return headerdef['title'];
		};
		
		header.isHidden = function(){
			return headerdef['hidden'];
		};
		
		header.setTheme = function(){
			return headerdef['theme'];
		};
		
		header.getTheme = function(){
			return headerdef['theme'];
		};
		
		header.getHTML = function(){
			var navtitle = "";
			if(pagedef['header']['titleValue'] != undefined){
				navtitle = pagedef['header']['titleValue'];
			}else navtitle = pagedef['header']['title'];
			//if(headerdef['theme'])
				return (headerdef['hidden']) ?'':
					 	 ['<div data-role="header" ',(header['persistent'])?'data-id="persistent"':'','data-position="fixed" id="' , headerdef['id'], '" data-tap-toggle="false">',
						 ,header.getBackBtn(),
							'<div class="ui-title">',
							navtitle,
							'</div>',
							header.getForwardBtn(),
						'</div>'].join('');
		};
		header.getBackBtn = function(){
			if(headerdef['backBtn']){
				if(headerdef['backBtn']['type']=='image') // For System Item
					return ['<div class="ui-btn-left"><input id="toolbar-btn-leftbar" data-adf-name="toolbar-btn-leftbar" type="image" height="30px" src="',$.utility('getSystemImageToolBarItem',headerdef['style'],headerdef['backBtn']['src']) ,'" parent="" /></div>'].join('');
				else {// For Text Item
					if(headerdef['backBtn']['name']=="")
					headerdef['backBtn']['name']=$.mobileweb.getPage(pagedef['parent']).getTitle();
					return ['<div class="ui-btn-left"><input id="toolbar-btn-leftbar" data-adf-name="toolbar-btn-leftbar" type="button" height="30px" value="',headerdef['backBtn']['name'] ,'" parent="" /></div>'].join('');
				}
			}
		};
		header.getForwardBtn = function(){
			if(headerdef['forwardBtn']){
				if(headerdef['forwardBtn']['type']=='image'){ // For System Item
					return ['<div class="ui-btn-right"><input id="toolbar-btn-rightbar" data-adf-name="toolbar-btn-rightbar" type="image" height="30px" src="',$.utility('getSystemImageToolBarItem',headerdef['style'],headerdef['forwardBtn']['src']),'" parent="" /></div>'].join('');
				}else { // For Text Item
					if(headerdef['forwardBtn']['nameValue'] != undefined){
						return ['<div class="ui-btn-right"><input id="toolbar-btn-rightbar" data-adf-name="toolbar-btn-rightbar" type="button" height="30px" value="',headerdef['forwardBtn']['nameValue'] ,'" parent="" /></div>'].join('');
					}else{
						return ['<div class="ui-btn-right"><input id="toolbar-btn-rightbar" data-adf-name="toolbar-btn-rightbar" type="button" height="30px" value="',headerdef['forwardBtn']['name'] ,'" parent="" /></div>'].join('');
					}
				}
			}
		};
		
		header.applyOverrides = function(){
			if(headerdef != undefined && !headerdef['hidden']){
				var _pageWidth = pagedef['width']*$.mobileweb.device['aspectWratio'];//Bug 12322 fix
                if(!isNaN(_pageWidth)){
                    $('div[data-role="header"]').css({'width':_pageWidth});
                    var sLeft = (document.documentElement.clientWidth > _pageWidth) ? (document.documentElement.clientWidth - _pageWidth)/2 : 0;
                    $('div[data-role="header"]').css({'left':sLeft});
                }
                
				var _header = $("div:jqmData(role='header')");
				var _title = _header.children('div');
				if($.mobileweb.device.orientation==='landscape-right'&& $.mobileweb.type==='tablet')
					header['height'] = 44;
				else {
					if(headerdef['prompt']){
						header['height'] = 77;
						//SubTitle
						if($("h2.ui-title").length == 0)
							var _prompt = document.createElement('h2');
						else
							var _prompt = $("h2.ui-title");
						
						if(headerdef['promptValue'] != undefined){
							 $(_prompt).addClass('ui-title').html(headerdef['promptValue']);
						}else{
							$(_prompt).addClass('ui-title').html(headerdef['prompt']);
						}
						_header.prepend(_prompt);
						 $(_prompt).css({'font-size': 16});
						 $(_prompt).css({'margin-top':15, 'margin-left':7, 'margin-right':7});
						 $('div.ui-btn-left>div').css('bottom','-27px');
						 $('div.ui-btn-right>div').css('bottom','-27px');
						if(headerdef['backBtn']){
							if(headerdef['backBtn']['type']=='image'){
								$('div.ui-btn-left').css('top','37px');
								$('div.ui-btn-left').css('left','7px');
							}
						}
						if(headerdef['forwardBtn']){
							if(headerdef['forwardBtn']['type']=='image'){
								$('div.ui-btn-right').css('top','37px');
								$('div.ui-btn-right').css('right','7px');
							}
						}
					}
					else {
						header['height'] = 44;
						if(headerdef['backBtn']){
							if(headerdef['backBtn']['type']=='image'){
								$('div.ui-btn-left').css('top','7px');
								$('div.ui-btn-left').css('left','7px');
							}
						}
						if(headerdef['forwardBtn']){
							if(headerdef['forwardBtn']['type']=='image'){
								$('div.ui-btn-right').css('top','7px');
								$('div.ui-btn-right').css('right','7px');
							}
						}
						$('div.ui-btn-left>div').css('bottom','6.5px');
						$('div.ui-btn-right>div').css('bottom','6.5px');
					}
				}
			
				var aspect = 1;
				header['height'] = header['height'] *aspect;
				
				//For navbar bar style
				_header.css({'background-image':'url('+$.utility('getNavTheme',headerdef['style'],headerdef['prompt'])+')','background-repeat':'repeat' });
				if(pagedef['header']['style'] == "")
                	$('div[data-role="header"]').css({'background-image':' linear-gradient(rgba(220, 220, 220, 0.3), rgba(254, 254, 254, 0.6) 33%, rgb(208, 208, 208,0.85) 67%)','background-color':'rgba(220, 220, 220, 0.85)'});
				if(pagedef['statusbarhidden']){	// || $.mobileweb['state'] === 'production'){
					_header.css({height:header['height'],border:0});
				}else{
					if(pagedef['statusbarhidden'] != undefined)
						_header.css({height:header['height'],top:20,border:0});
					else
						_header.css({height:header['height'],border:0});
				}
				
				//Title CSS
				_title.css({'font-size': 21 *aspect});
				_title.css({'margin-bottom':15 *aspect});
				_title.css({'margin-right':0});
				_title.css({'margin-left':0});
				
				//Left System Button
				$('div.ui-btn-left>div').css('left','5px');
				$('div.ui-btn-left').css({'height':30,'min-width':30,'margin':0,'border':'none'});
				$('div.ui-btn-left .ui-btn-up-a').css('border','none');
				$('div.ui-btn-left>div').css({'text-shadow':'none','box-shadow':'none'});// fix for nokia lumia 520
				$('div.ui-btn-left .ui-btn-corner-all').css('border-radius','0.3em');
				$('div.ui-btn-left>div').css({'background-image':'url('+$.utility('getNavTheme',headerdef['style'],headerdef['prompt'])+')','background-repeat':'repeat','background-color':'white'});
		
				//Right System Button
				$('div.ui-btn-right>div').css('right','5px');
				$('div.ui-btn-right').css({'height':30,'min-width':30,'margin':0,'border':'none'});
				$('div.ui-btn-right .ui-btn-up-a').css('border','none');
				$('div.ui-btn-right>div').css({'text-shadow':'none','box-shadow':'none'});// fix for nokia lumia 520
				$('div.ui-btn-right .ui-btn-corner-all').css('border-radius','0.3em');
				$('div.ui-btn-right>div').css({'background-image':'url('+$.utility('getNavTheme',headerdef['style'],headerdef['prompt'])+')','background-repeat':'repeat','background-color':'white'});
				
				if($.isEmptyObject(headerdef['custom'])){
					$('div .ui-btn-left > div').css({'background-color':'' });
					$('div .ui-btn-right > div').css({'background-color':'' });
				}else{
					var color='rgb('+headerdef['custom']['red']+','+headerdef['custom']['green']+','+headerdef['custom']['blue']+')';
					_header.css({'background-color':color});
					//Special Case For Custom Buttom
					// Apply Background color on button also ,including custom Backround-image
					$('div .ui-btn-left > div').css({'background-color':color });
					$('div .ui-btn-right > div').css({'background-color':color });
				}
				
				if(pagedef['isSidebarFixed']) {
					var sidebarWidth = pagedef['toolbarleft']['frame']['width'] * $.mobileweb.device['aspectWratio'];
					_header.css({'left': sLeft+sidebarWidth, 'width': pagedef['width']*$.mobileweb.device['aspectWratio']-sidebarWidth});	
				}
			}	
			if(!$.utility('getreSettingDataStatus')){
				header.applyevents(headerdef);
			}		
		};
		
		header.applyevents= function(){
			if(headerdef != undefined){
				if(headerdef['backBtn']){
					if(headerdef['backBtn']['events']){
						if(headerdef['backBtn']['events']['Tap']){
							headerdef['backBtn']['headerFlag'] = true // fix for 8604
							$("input[id='toolbar-btn-leftbar' ]").click(function(){ 
								new $.actions(pagedef, headerdef['backBtn'], headerdef['backBtn']['events']['Tap'].slice()).execute(); 
							});
						}
					}
				}

				if(headerdef['forwardBtn']){
					if(headerdef['forwardBtn']['events']){
						if(headerdef['forwardBtn']['events']['Tap']){
							headerdef['forwardBtn']['headerFlag'] = true // fix for 8604
							$("input[id='toolbar-btn-rightbar' ]").click(function(){ 
								new $.actions(pagedef, headerdef['forwardBtn'], headerdef['forwardBtn']['events']['Tap'].slice()).execute(); 
							});
						}
					}
				}
			}
		};
		
		
		return header;
	};
	
	function Footer(pagedef){
		var footer = { height: 0 };
		var footerdef = pagedef['footer'];
		
		footer.getHTML= function(){
			var tab = [];
			$.each($.mobileweb['tabs'],function(i,tabbar){
				tab.push(new TabBar(tabbar,pagedef['name']).getHTML());
			});
			//
			if(footerdef['hidden'] == true ){
				return ['<div id="clearfooter"></div>'] ;
			}
			else//
				return  ['<div data-role="footer" data-id="persistent" data-tap-toggle="false" data-position="fixed">',(footerdef['hidden'])?'':[
		    				'<div data-role="navbar" class="nav-icon">',
								'<ul>',
									tab.join(''),
								'</ul>',
							'</div>'].join(''),
						'</div>'].join('');
		};
		
		footer.isHidden = function(){
			return footerdef['hidden'];
		};
		
		footer.applyOverrides = function(){
			if(footerdef != undefined && !footerdef['hidden']){
				var aspect = 1;
				if($.mobileweb.device['aspectratio'] < 1)
					aspect = $.mobileweb.device['aspectratio'];
				
				footer['height']= 49 *aspect;
				
				$("div:jqmData(role='footer')").attr('style','border-width: 0px');
				$("div:jqmData(role='navbar')>ul").attr('style','height: '+footer['height']+'px!important');
				$("div:jqmData(role='navbar')>ul>li>a").attr('style','height: '+footer['height']+'px!important');
				$("div:jqmData(role='navbar')>ul>li>a>span").css({'padding-top': 35 *aspect});
				$("div:jqmData(role='navbar')>ul>li>a>span>span>div").css({
					height:12 * aspect,
					//'padding-top':5 * aspect,
					'font-size':parseInt(11 * aspect)
				});
				
				var _pageWidth = pagedef['width']*$.mobileweb.device['aspectWratio'];//Bug 12322 fix
                if(!isNaN(_pageWidth)){
                    $('div[data-role="footer"]').css({'width':_pageWidth});
                    var sLeft = (document.documentElement.clientWidth > _pageWidth) ? (document.documentElement.clientWidth - _pageWidth)/2 : 0;
                    $('.ui-footer-fixed').css({'left':sLeft});
                }
				
				var tintcolor='';
				$.each($.mobileweb['tabs'],function(i,tabbar){
					if($('#'+tabbar['id']).get(0) != undefined){
						if($('#'+tabbar['id']).get(0)['firstChild'].getAttribute("class").indexOf("ui-btn-active") >= 0){
							//Tab Color for tab-more[tabs]
							if(tabbar['id']==='tab-more'){
								$('#'+pagedef['name']).live('pageshow',function(event, ui){
										$.each($.mobileweb['tabs'][4]['tabs'],function(i,tabbars){
										//Search for the tab which is viewed
										if(tabbars['page']==pagedef['name']){
											tintcolor='rgb('+tabbars['tintcolor']['red']+','+tabbars['tintcolor']['green']+','+tabbars['tintcolor']['blue']+')';
											//css applied to tabs <tab-1> to <tab-4> ie previous to <tab-more>
											for (var i=1 ; i<=4 ;i++){
												$('#tab-'+i+'>a').css({
													'background': tintcolor
												});
											}
										}
										});
								});
							}
							else{	
							 //tab color for tabs <tab-1> to <tab-4> ie previous to <tab-more>
								tintcolor='rgb('+tabbar['tintcolor']['red']+','+tabbar['tintcolor']['green']+','+tabbar['tintcolor']['blue']+')';
								$.each($.mobileweb['tabs'],function(i,tabbars){
									if($('#'+tabbars['id']).get(0)['firstChild'].getAttribute("class").indexOf("ui-btn-active") >= 0){
									}
									else {
										$('#'+tabbars['id']+'>a').css({
											'background': tintcolor
										});
									}
								});
								}
						}
					}
					var iconsize = 30 * aspect;
					$(".ui-icon-"+tabbar['id']).css({
						top:5 * aspect,
						width:iconsize,
						height:iconsize,
						'margin-left':-15 ,
						'background-image':"url(\""+ $.utility('getImage',tabbar['icon']['image']) +"\")",
						'background-size':iconsize +'px '+ iconsize +'px',
						'background-color': 'transparent',
						'background-repeat':'no-repeat'
					});
					
					$('#tab-more > a').css({'margin-right':'inherit'});
				});
			}
		};
		
		return footer;
	};
	
	function TabBar(tabdef, pagename){
		var tabbar = {};
		
		var getTabNo = function(){
			return tabdef['id'].substring(4,tabdef['id'].length);
		};
		
		tabbar.getHTML = function(){
		var highlight = (tabdef['page']===pagename)? 'ui-btn-active ui-state-persist"':
				(tabdef['id']==='tab-more')? '" onclick="$.mobileweb.changePage(\'more\',\'fade\',false)"':['" onclick="$.mobileweb.changeTab(',getTabNo(),')"'].join('');
		
		if(tabdef['id']==='tab-more'){
			$.each(tabdef['tabs'],function(i,tab){
				if(tab['page']===pagename){
					highlight = 'ui-btn-active ui-state-persist"' + highlight.replace("\'fade\',false","\'slide\',false");
				}
			});
		}
		
		return ['<li id="',tabdef['id'],'">',
					'<a href="#',tabdef['page'],'" data-icon="',tabdef['id'],'" class="',highlight,'>',
						'<div class="nav-footer-text">',tabdef['text'],'</div>',
					'</a>',
				'</li>'].join('');
		};

		return tabbar;
	};
	
	function ToolBarTop(pagedef){
		
		var toolbartop = { height: 0 };
		
		var toolbartopdef = pagedef['toolbartop'];
		if(toolbartopdef != undefined){
			if(toolbartopdef['children'] != undefined){
				$.each(toolbartopdef['children'], function(i, child){
					child['taborder'] = parseInt(child['taborder']) + 2000;
				});
			}
		}
				
		// Short Fix, to get the GridFields from pagedef, and make them as children and put them as an child in ToolBars.
		if((pagedef['type'] == "RemoteTableViewList" || pagedef['type'] == "DBTableViewList") && pagedef['children'].length > 0 && (pagedef['children'][0]['style'] == "simplegrid" || pagedef['children'][0]['style'] == "tabulargrid")){
			//var group = pagedef['children'][0]['group'][0]['template']['gridHeaders'];
			toolbartop['children'] = new $.uichildren(pagedef, pagedef['children'][0]['group'][0]['template']['gridHeaders'], pagedef['data']['contents'][0]);
		}else if((toolbartopdef != undefined) /*&& (!toolbartopdef['hidden'])*/){
			if(pagedef['data'] != undefined && pagedef['data']['contents'] != undefined){
				toolbartop['children'] = new $.uichildren(pagedef, toolbartopdef['children'], pagedef['data']['contents'][0]);
			}else{
				toolbartop['children'] = new $.uichildren(pagedef, toolbartopdef['children']);
			}
		}
		
		toolbartop.isHidden = function(){
			return toolbartopdef['hidden'];
		};
		
		toolbartop.getHTML= function(){
			if($.isEmptyObject(toolbartopdef)/* || toolbartopdef['hidden']*/){
				return [""].join('');
			}
			return ['<div id="'+pagedef['name']+'_toolbarTop">',toolbartop['children'].getHTML(),'</div>'].join('');
		};
		
		toolbartop.applyOverrides = function(isPageRefresh){
			if(!$.isEmptyObject(toolbartopdef)){
			//	if(!toolbartopdef['hidden']){
//					setTimeout(function(){
//						toolbartop['children'].applyOverrides();	
//					}, 500)
					
					var interval = (pagedef['type'] == 'BaseView' || pagedef['type'] == 'ScrollView') ? 300 : 1000;	
					setTimeout(function(){
						
						if((pagedef['type'] == "RemoteTableViewList" || pagedef['type'] == "DBTableViewList") && pagedef['children'].length > 0 && (pagedef['children'][0]['style'] == "simplegrid" || pagedef['children'][0]['style'] == "tabulargrid")){
							//var group = pagedef['children'][0]['group'][0]['template']['gridHeaders'];
							toolbartop['children'] = new $.uichildren(pagedef, pagedef['children'][0]['group'][0]['template']['gridHeaders'], pagedef['data']['contents'][0]);
						}else if((toolbartopdef != undefined) /*&& (!toolbartopdef['hidden'])*/){
							if(pagedef['data'] != undefined && pagedef['data']['contents'] != undefined){
								toolbartop['children'] = new $.uichildren(pagedef, toolbartopdef['children'], pagedef['data']['contents'][0]);
							}else{
								toolbartop['children'] = new $.uichildren(pagedef, toolbartopdef['children']);
							}
						}
						
						toolbartop['children'].applyOverrides();	
						$('#'+pagedef['name']+'_toolbarTop').children().css({'display':'block'});
						$('#'+pagedef['name']+'_toolbarTop').children().children().css({'display':'block'});
					}, interval)
					
					if(isPageRefresh != true){
						$('#'+pagedef['name']+'_toolbarTop').children().css({'display':'none'});
						$('#'+pagedef['name']+'_toolbarTop').children().children().css({'display':'none'});
					}
					
					var aspect = $.mobileweb.device['aspectratio'];
					toolbartop['width'] = pagedef['width'] *$.mobileweb.device['aspectWratio'];
					toolbartop['height'] = toolbartopdef['frame']['height'] *$.mobileweb.device['aspectHratio'];
					
					$('#'+pagedef['name']+'_toolbarTop').css({'position':'absolute', 'width':toolbartop['width'], 'height': toolbartop['height']});
					
					var sLeft = (document.documentElement.clientWidth > toolbartop['width']) ? (document.documentElement.clientWidth -toolbartop['width'])/2 : 0;
					$('#'+pagedef['name']+'_toolbarTop').css({'left':sLeft});

					var top = 0;
					if(!pagedef['statusbarhidden']){
						top = top + 20;
					}
					if(pagedef['header'] != undefined && !pagedef['header']['hidden']){
						if(pagedef['header']['prompt'] != '')
							top = top + 77;
						else
							top = top + 44;
					}
					$('#'+pagedef['name']+'_toolbarTop').css({'top': top+'px'});
					
					$('#'+pagedef['name']+'_toolbarTop').css({'background': ($.attributes('color',toolbartopdef['backgroundColor'])).getColorCode(),'background-repeat': 'repeat'});
					
					if(pagedef['type'] == "RemoteTableViewList" && pagedef['children'].length > 0 && (pagedef['children'][0]['style'] == "simplegrid" || pagedef['children'][0]['style'] == "tabulargrid")){
						var group = pagedef['children'][0]['group'];
						if(group[0]['template']['gridHeaders'] != undefined){
							for(var i in group[0]['template']['gridHeaders']){
								$("#" + group[0]['template']['gridHeaders'][i]['id']).css({'font-size': '', 'padding':''});
							}
						}
					}
			//	}
					
				if(toolbartopdef['hidden']){
					$('#'+pagedef['name']+'_toolbarTop').css({'visibility':'hidden'});
				}
				
				if(pagedef['isSidebarFixed']) {
					var sidebarWidth = pagedef['toolbarleft']['frame']['width'] * $.mobileweb.device['aspectWratio'];
					if(pagedef['type'] === "ScrollView")					
						$('#'+pagedef['name']+'_toolbarTop').css({'left': sidebarWidth, 'width': pagedef['width']*$.mobileweb.device['aspectWratio']});
					else
						$('#'+pagedef['name']+'_toolbarTop').css({'left': sLeft+sidebarWidth, 'width': pagedef['width']*$.mobileweb.device['aspectWratio']-sidebarWidth});
				}
			}
		};
		
		toolbartop.applyEvents= function(){
			if(!$.isEmptyObject(toolbartopdef)){
				if(!toolbartopdef['hidden'])
					toolbartop['children'].applyEvents();
			}
			if($('#'+pagedef['name']+'_toolbarTop').get(0) != undefined && $('#'+pagedef['name']+'_toolbarTop').get(0) != null){
				$('#'+pagedef['name']+'_toolbarTop').get(0).addEventListener('keydown', function(e) {
					var focusableEls = $('#'+pagedef['name']+'_toolbarTop').get(0).querySelectorAll('a[href], button, textarea, input[type="text"],input[type="password"], input[type="radio"], input[type="checkbox"], select');
					var focusableArr = [].slice.call(focusableEls);
					focusableArr.sort(function(obj1, obj2) {
						return ((obj1['tabIndex'] < obj2['tabIndex']) ? -1 : ((obj1['tabIndex'] > obj2['tabIndex']) ? 1 : 0));
					});  
					var lastFocusableEl = focusableEls[focusableEls.length - 1];
					var firstFocusableEl = focusableEls[0];   
				    if (e.key === 'Tab' || e.keyCode == 9) {
				    	if ( e.shiftKey ) /* shift + tab */ {
				    		if(e.srcElement.tabIndex == firstFocusableEl.tabIndex){
				    			firstFocusableEl.focus();
			                	e.preventDefault();
					    	}
				    	}else{
				        	if(e.srcElement.tabIndex == lastFocusableEl.tabIndex){
					    		lastFocusableEl.focus();
			                	e.preventDefault();
					    	}
				        } 
				    }
				});
			}
			// no apply events..
		};
		
		return toolbartop;
	};
	
	function ToolBarBottom(pagedef){
		
		var toolbarbottom = { height: 0 };
		
		var toolbarbottomdef = pagedef['toolbarbottom'];
		if(!$.isEmptyObject(toolbarbottomdef)){
			if(toolbarbottomdef['children'] != undefined){
				$.each(toolbarbottomdef['children'], function(i, child){
					child['taborder'] = parseInt(child['taborder']) + 1000;
				});
			}
			
			if(pagedef['data'] != undefined &&  pagedef['data']['contents'] != undefined){
				toolbarbottom['children'] = new $.uichildren(pagedef, toolbarbottomdef['children'], pagedef['data']['contents'][0]);
			}else{
				toolbarbottom['children'] = new $.uichildren(pagedef, toolbarbottomdef['children']);
			}
		}

		toolbarbottom.isHidden = function(){
			return toolbarbottomdef['hidden'];
		};
		
		toolbarbottom.getHTML= function(){
			if(!$.isEmptyObject(toolbarbottomdef)){
				//if(!toolbarbottomdef['hidden']){
					return ['<div id="'+pagedef['name']+'_toolbarBottom">',
                            toolbarbottom['children'].getHTML(),
                            '</div>'].join('');
				//}
			}else 
				return [''].join('');
		};
		
		toolbarbottom.applyOverrides = function(isPageRefresh){
			if(!$.isEmptyObject(toolbarbottomdef)){
				//if(!toolbarbottomdef['hidden']){
				
//					setTimeout(function(){
//						toolbarbottom['children'].applyOverrides();	
//					}, 500);
					
					var interval = (pagedef['type'] == 'BaseView' || pagedef['type'] == 'ScrollView') ? 300 : 500;
					setTimeout(function(){
						toolbarbottom['children'].applyOverrides();
						$.each($('#'+pagedef['name']+'_toolbarBottom').children(), function(i, child){
							if(child.id.indexOf("_divImg") === -1)
							   $("#" + child.id).css({'display':'block'});
							else
							     $("#" + child.id).css({'display':'flex'});
						});	
//						$('#'+pagedef['name']+'_toolbarBottom').children().css({'display':'block'});
					}, interval)
					
					if(isPageRefresh != true)
					    $('#'+pagedef['name']+'_toolbarBottom').children().css({'display':'none'});
					
					var aspect = $.mobileweb.device['aspectratio'];
					toolbarbottom['width'] = pagedef['width'] *$.mobileweb.device['aspectWratio'];
					toolbarbottom['height'] = toolbarbottomdef['frame']['height'] *$.mobileweb.device['aspectHratio'];
					
					$('#'+pagedef['name']+'_toolbarBottom').css({'position':'absolute', 'width':toolbarbottom['width'], 'height':toolbarbottom['height']});
					
					var sLeft = (document.documentElement.clientWidth > toolbarbottom['width']) ? (document.documentElement.clientWidth - toolbarbottom['width'])/2 : 0;
					$('#'+pagedef['name']+'_toolbarBottom').css({'left':sLeft});
	
					var top = 0;
					if(!pagedef['footer']['hidden']){
						top = top + 49;
					}
					if(!pagedef['toolbarbottom']['hidden']){
						top = top + ((pagedef['toolbarbottom']['frame']['height']) * $.mobileweb.device['aspectHratio']);
					}
					top = document.documentElement.clientHeight - top;
					$('#'+pagedef['name']+'_toolbarBottom').css({'top': top+'px'});
					
					$('#'+pagedef['name']+'_toolbarBottom').css({'background': ($.attributes('color',toolbarbottomdef['backgroundColor'])).getColorCode(),'background-repeat': 'repeat'});
				
					if($.mobileweb['state'] != 'preview' && pagedef['type'] === "ScrollView"){
						if($('#'+pagedef['name']+'_toolbarBottom')['length'] != 0){
                            var top = $('#'+pagedef['name']+'_toolbarBottom').css('top').replace("px","");
							if($.utility('getDeviceType') == 'iPhone' || $.utility('getDeviceType') == 'iPad'){//Bug #8846 Fix
								top = top - 60;
								var h = parseFloat($('#iscroll_' + pagedef['name']).css('height').replace('px','')) - 60;
								$('#iscroll_' + pagedef['name']).css({'height': h+'px'});
								var hbg = parseFloat($('.bglayout').css('height').replace('px','')) - 80;
								$('.bglayout').css({'height': hbg+'px'});
							}
						}
					}
				
				//}
					
				if(pagedef['toolbarbottom']['hidden']){
					$('#'+pagedef['name']+'_toolbarBottom').css({'visibility':'hidden'});
					$('#'+pagedef['name']+'_toolbarBottom').css({'height': '0px'});
				}
				
				if(pagedef['isSidebarFixed']) {
					var sidebarWidth = pagedef['toolbarleft']['frame']['width'] * $.mobileweb.device['aspectWratio'];
					if(pagedef['type'] === "ScrollView")					
						$('#'+pagedef['name']+'_toolbarTop').css({'left': sidebarWidth, 'width': pagedef['width']*$.mobileweb.device['aspectWratio']});
					else
						$('#'+pagedef['name']+'_toolbarTop').css({'left': sLeft+sidebarWidth, 'width': pagedef['width']*$.mobileweb.device['aspectWratio']-sidebarWidth});
				}
				
				if(pagedef['isSidebarFixed']) {
					var sidebarWidth = pagedef['toolbarleft']['frame']['width'] * $.mobileweb.device['aspectWratio'];
					if(pagedef['type'] === "ScrollView")					
						$('#'+pagedef['name']+'_toolbarBottom').css({'left': sidebarWidth, 'width': pagedef['width']*$.mobileweb.device['aspectWratio']});
					else
						$('#'+pagedef['name']+'_toolbarBottom').css({'left': sLeft+sidebarWidth, 'width': pagedef['width']*$.mobileweb.device['aspectWratio']-sidebarWidth});	
				}
			}
		};
		
		toolbarbottom.applyEvents= function(){
			if(!$.isEmptyObject(toolbarbottomdef)){
				if(!toolbarbottomdef['hidden']){
					toolbarbottom['children'].applyEvents();
				}
			}
			if($('#'+pagedef['name']+'_toolbarBottom').get(0) != undefined && $('#'+pagedef['name']+'_toolbarBottom').get(0) != null){
				$('#'+pagedef['name']+'_toolbarBottom').get(0).addEventListener('keydown', function(e) {
					var focusableEls = $('#'+pagedef['name']+'_toolbarBottom').get(0).querySelectorAll('a[href], button, textarea, input[type="text"],input[type="password"], input[type="radio"], input[type="checkbox"], select');
					var focusableArr = [].slice.call(focusableEls);
					focusableArr.sort(function(obj1, obj2) {
						return ((obj1['tabIndex'] < obj2['tabIndex']) ? -1 : ((obj1['tabIndex'] > obj2['tabIndex']) ? 1 : 0));
					});
					
					var lastFocusableEl = focusableArr[focusableArr.length - 1];
					var firstFocusableEl = focusableArr[0];  
				    if (e.key === 'Tab' || e.keyCode == 9) {
				    	if ( e.shiftKey ) /* shift + tab */ {
				    		if(e.srcElement.tabIndex == firstFocusableEl.tabIndex){
				    			firstFocusableEl.focus();
			                	e.preventDefault();
					    	}
				    	}else{
				        	if(e.srcElement.tabIndex == lastFocusableEl.tabIndex){
					    		lastFocusableEl.focus();
			                	e.preventDefault();
					    	}
				        } 
				    }
				});
			}
			// no apply events..
		};
		
		return toolbarbottom;
	};
	
	function LeftToolBar(pagedef){
		var leftToolBar = { height: 0 };
		var leftToolBardef = pagedef['toolbarleft'];
		
		if(!$.isEmptyObject(leftToolBardef)){
			if(leftToolBardef['children'] != undefined){
				$.each(leftToolBardef['children'], function(i, child){
					child['taborder'] = parseInt(child['taborder']) + 3000;
				});
			}
			
			if(leftToolBardef['view'] == "TableView"){
				$.each(leftToolBardef['children'][0]['group'],function(j,group){
					$.each(group['row'],function(k,row){
						row['children'] = [];
						switch(leftToolBardef['children'][0]['style']){
							case 'default':
								row['children'].push({id:"ui-sidegroup-"+j+"-main-"+k,name:"mainText" + "_ui-defgroup-"+j+"-main-"+k,value:'', template:row['template']['maintext'],viewtype:"Label",frame:{x:10,y:13,width:150,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:16,align:"left",color:{name:"black"}}});
								if(row['template']['image']!==''){
									row['children'][0]['frame']['x'] = 50;
									row['children'].push({id:"ui-sidegroup-"+j+"-img-"+k,value:'', template:row['template']['image'],name:"",viewtype:"Image",frame:{x:10,y:7,width:30,height:30}});
								}
								break;
							case 'subtitle':
								row['children'].push({id:"ui-sidegroup-"+j+"-main-"+k,name:"mainText" + "_ui-defgroup-"+j+"-main-"+k,value:'', template:row['template']['maintext'],viewtype:"Label",frame:{x:10,y:7,width:150,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:16,align:"left",color:{name:"black"}}},
													 {id:"ui-sidegroup-"+j+"-sub-"+k,name:"subText" + "_ui-defgroup-"+j+"-sub-"+k,value:'', template:row['template']['subtext'],viewtype:"Label",frame:{x:10,y:22,width:150,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:12,align:"left",color:{name:"gray"}}});
								if(row['template']['image']!==''){
									row['children'][0]['frame']['x'] = 50;
									row['children'][1]['frame']['x'] = 50;
									row['children'].push({id:"ui-sidegroup-"+j+"-img-"+k,value:'',template:row['template']['image'],name:"",viewtype:"Image",frame:{x:10,y:7,width:30,height:30}});
								}
								break;
							case 'rightaligned':
								row['children'].push({id:"ui-sidegroup-"+j+"-main-"+k,name:"mainText" + "_ui-defgroup-"+j+"-main-"+k,value:'', template:row['template']['maintext'],viewtype:"Label",frame:{x:10,y:13,width:150,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:16,align:"left",color:{name:"black"}}},
										 			 {id:"ui-sidegroup-"+j+"-sub-"+k,name:"subText" + "_ui-defgroup-"+j+"-sub-"+k,value:'', template:row['template']['subtext'],viewtype:"Label",frame:{x:leftToolBardef['frame']['width']-185,y:16,width:150,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:12,align:"right",color:{name:"SteelBlue"}}});
								break;
							case 'contactform':
								row['children'].push({id:"ui-sidegroup-"+j+"-main-"+k,name:"mainText" + "_ui-defgroup-"+j+"-main-"+k,value:'', template:row['template']['maintext'],viewtype:"Label",frame:{x:10,y:17,width:(pagedef['width']-40)*0.4,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:16,align:"right",color:{name:"black"}}},
							 			 			 {id:"ui-sidegroup-"+j+"-sub-"+k,name:"subText" + "_ui-defgroup-"+j+"-sub-"+k,value:'', template:row['template']['subtext'],viewtype:"Label",frame:{x:(pagedef['width']-40)*0.4+20,y:17,width:(pagedef['width']-40)*0.6,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:12,align:"left",color:{name:"SteelBlue"}}});
								break;
						}
					});
				});
				
				var options;
				if(leftToolBardef['children'][0]['accordion'])
					options = { width: leftToolBardef['frame']['width'], sidebarTableview:true, type:'TableView', children : [{'accordion': true, 'accordionheader': leftToolBardef['children'][0]['accordionheader']}] };
				else
					options = { width: leftToolBardef['frame']['width'], sidebarTableview:true };
				if($.isEmptyObject(pagedef['data']['contents']))//Bug #11365 Fix
					pagedef['data']['contents'] = [];
				var sidebarTableDef = $.extend({}, pagedef, options );
				
				leftToolBar['children'] = new $.uichildren(sidebarTableDef, leftToolBardef['children'], sidebarTableDef['data']['contents'][0]);
				
			}else{
				
				if(pagedef['data'] != undefined &&  pagedef['data']['contents'] != undefined){
					leftToolBar['children'] = new $.uichildren(pagedef, leftToolBardef['children'], pagedef['data']['contents'][0]);
				}else{
					leftToolBar['children'] = new $.uichildren(pagedef, leftToolBardef['children']);
				}
			}
		}

		leftToolBar.isHidden = function(){
			//return leftToolBardef['hidden'];
		};
		
		leftToolBar.getHTML= function(){
			if(!$.isEmptyObject(leftToolBardef)){
				if(leftToolBardef['view'] == "FreeLayout"){
					return ['<div id="leftToolBar" class="sidenav">', 
								'<div class="leftToolBarOverlay" style="z-index: 1000;border: none;margin: 0px;padding: 0px;width: 100%;height: 100%;top: 0px;left: 0px;background-color: rgb(0, 0, 0);opacity: 0.2;position: fixed;"></div>',
								leftToolBar['children'].getHTML(),				     
							'</div>'].join('');
				}else{
					return ['<div id="leftToolBar" class="sidenav">',
								'<div id="iscroll_leftToolBar_',pagedef['name'],'">',
									'<div class="leftToolBarOverlay" style="z-index: 1000;border: none;margin: 0px;padding: 0px;width: 100%;height: 100%;top: 0px;left: 0px;background-color: rgb(0, 0, 0);opacity: 0.2;position: fixed;"></div>',
									leftToolBar['children'].getHTML(),
								'</div>',
							'</div>'].join('');
				}
			}else 
				return [''].join('');
			
		};
		
		leftToolBar.applyOverrides = function(){
			if(leftToolBar['children'] != undefined){
				//leftToolBar['children'].applyOverrides();
				
				var pageHratio = $.mobileweb.device['aspectHratio'];
				setTimeout(function(){
					if(.95 < leftbarHratio && leftbarHratio < 1) leftbarHratio = 1;
					if(leftbarHratio)	$.mobileweb.device['aspectHratio'] = leftbarHratio;
					
					leftToolBar['children'].applyOverrides();
					$.mobileweb.device['leftbarHratio'] = $.mobileweb.device['aspectHratio'];//In Ref of Bug #12558 fix
					$.mobileweb.device['aspectHratio'] = pageHratio;
					$('.sidenav').children().css({'display':'block'});
					if(pagedef['type'] === "ScrollView" && pagedef['isSidebarFixed'])
						$('.sidenav').css({'left': '0px'});
				}, 500);
				
				var statusBarHeight = (!pagedef['statusbarhidden']) ? 20 : 0;
				var sLeft = (document.documentElement.clientWidth > pagedef['width']*$.mobileweb.device['aspectWratio']) ? (document.documentElement.clientWidth - pagedef['width']*$.mobileweb.device['aspectWratio'])/2:0;
					
				var _clientHeight = document.documentElement.clientHeight;
				if($.mobileweb['state'] === 'preview')
					_clientHeight = pagedef['toolbarleft']['frame']['height'];//Bug #12166 Fix
				
				var leftbarHratio = 1;
				if(leftToolBardef['view'] != "FreeScroll"){
					leftbarHratio = $.mobileweb.device['aspectHratio'];
				}else {
					leftbarHratio = (_clientHeight-statusBarHeight)/(pagedef['toolbarleft']['frame']['height']-statusBarHeight);					
				}
				
				$('.leftToolBarOverlay').css({top: statusBarHeight, left:sLeft, width:"0px", height:(_clientHeight-statusBarHeight)});
				
				$('.sidenav').children().css({'display':'none'});
				$('.sidenav').css({'padding-top':'0px', top: statusBarHeight, width: '0px', left:sLeft});
				if(pagedef['isSidebarFixed']) {
					if(sLeft < pagedef['toolbarleft']['frame']['width'])
						sLeft = 0;
					var sidebarWidth = pagedef['toolbarleft']['frame']['width'] * $.mobileweb.device['aspectWratio'];
					$('.sidenav').css({'width': sidebarWidth, 'left': sLeft});	
				}
				$('.sidenav').css({'background': ($.attributes('color',leftToolBardef['backgroundColor'])).getColorCode(),'background-repeat': 'repeat'});
				if(leftToolBardef['view'] == "TableView"){
					$('.sidenav').css({height:(_clientHeight-statusBarHeight)-60});
					var sidenavHeight = ($.mobileweb['state'] === 'preview') ? leftToolBardef['frame']['height'] : (_clientHeight-statusBarHeight);
					$('#iscroll_leftToolBar_'+pagedef['name']).css({'position':'absolute', top: statusBarHeight, 'left':'0px', height:(parseInt(sidenavHeight)), width:pagedef['width']*$.mobileweb.device['aspectWratio']});
					return;
					
				}else if(leftToolBardef['view'] == "FreeScroll"){
					$('.sidenav').css({height:(_clientHeight-statusBarHeight)});
					$('#iscroll_leftToolBar_'+pagedef['name']).css({'position':'absolute', top: statusBarHeight, 'left':'0px', height:(leftToolBardef['frame']['height']-statusBarHeight)* $.mobileweb.device['aspectHratio'], width:pagedef['width']*$.mobileweb.device['aspectWratio']});
					//Bug #12016 fix
					$('.sidenav').css({height:(document.documentElement.clientHeight-statusBarHeight)});
					$('#iscroll_leftToolBar_'+pagedef['name']).css({height:(leftToolBardef['frame']['height'] * leftbarHratio)});
					return;
					
				}else{
					$('.sidenav').css({height:(_clientHeight-statusBarHeight)});
					if(pagedef['type'] === "ScrollView" && pagedef['isSidebarFixed'])
						$('.sidenav').css({'left': '0px'});
				}
				$('.sidenav').css({top: statusBarHeight});
				
				setTimeout(function(){
				for(var i =0; i < leftToolBar['children'].length; i++){
					$('#' + leftToolBar['children'][i].getId()).css({'z-index': 1001 + i});
					if(leftToolBar['children'][i].getViewType() == 'Label'){
						$('#' + leftToolBar['children'][i].getId()).css({'position':'initial'});
						if($('#' + leftToolBar['children'][i].getId()+'_p') != undefined){
							$('#' + leftToolBar['children'][i].getId()+'_p').css({'z-index': 1001 + i});
						}
					}
					if($('#' + leftToolBar['children'][i].getId()+'_label') != undefined){
						$('#' + leftToolBar['children'][i].getId()+'_label').css({'z-index': 1001 + i});
					}
					// in reference of bug #9245. Need to debug more --> Dated : 16-Oct-2017
					var topVal = $('#' + leftToolBar['children'][i].getId()).css('top');
					if(topVal != undefined){
						topVal = parseFloat(topVal.replace("px",""));//+60;
						$('#' + leftToolBar['children'][i].getId()).css({'top':topVal+"px"});
						if($('#' + leftToolBar['children'][i].getId()+'_p') != undefined){
							var topPval = $('#' + leftToolBar['children'][i].getId()+'_p').css('top');
							if(topPval != undefined){
								if(leftToolBar['children'][i].getViewType() == 'LinkLabel'){
									$('#' + leftToolBar['children'][i].getId()).css({'transform':'none'});
								}
								if(leftToolBar['children'][i].getViewType().indexOf('Label') != -1){
									topPval = parseFloat(topPval.replace("px",""));//+60;
									$('#' + leftToolBar['children'][i].getId()+'_p').css({'top':topPval+"px"});
								}
							}
						}
						
						if($('#' + leftToolBar['children'][i].getId()+'_label') != undefined){
							var topLval = $('#' + leftToolBar['children'][i].getId()+'_label').css('top');
							if(topLval != undefined){
								if($('#' + leftToolBar['children'][i].getId()+'_label').prev().attr('name') == $('#' + leftToolBar['children'][i].getId()).attr('name')){
									topLval = parseFloat(topLval.replace("px",""));//+60;
									$('#' + leftToolBar['children'][i].getId()+'_label').css({'top':topLval+"px"});
								}
							}
						}
						
						if($('#' + leftToolBar['children'][i].getId()+'_divImg') != undefined){
							var topLval = $('#' + leftToolBar['children'][i].getId()+'_divImg').css('top');
							$('#' + leftToolBar['children'][i].getId()+'_divImg').css({'display':'flex'});
							$('#' + leftToolBar['children'][i].getId()+'_divImg').css({'z-index': 1001 + i});
							if(topLval != undefined){
								topLval = parseFloat(topLval.replace("px",""));//+60;
								$('#' + leftToolBar['children'][i].getId()+'_divImg').css({'top':topLval+"px"});
							}
						}
					}
				}
				}, 600);
			}
			
		};
		
		leftToolBar.applyEvents= function(){
			if(!$.isEmptyObject(leftToolBardef)){
				if(!leftToolBardef['hidden']){
					leftToolBar['children'].applyEvents();
				}
			}
			if($('#leftToolBar').get(0) != undefined && $('#leftToolBar').get(0) != null){
				var len = $('.sidenav').length;
				if(len > 0){
					$('.sidenav').get(len-1).addEventListener('keydown', function(e) {
						var focusableEls = $('#leftToolBar').get(0).querySelectorAll('a[href], button, textarea, input[type="text"],input[type="password"], input[type="radio"], input[type="checkbox"], select');
						var focusableArr = [].slice.call(focusableEls);
						focusableArr.sort(function(obj1, obj2) {
							return ((obj1['tabIndex'] < obj2['tabIndex']) ? -1 : ((obj1['tabIndex'] > obj2['tabIndex']) ? 1 : 0));
						});
						
						var lastFocusableEl = focusableArr[focusableArr.length - 1];
						var firstFocusableEl = focusableArr[0];  
					    if (e.key === 'Tab' || e.keyCode == 9) {
					    	if ( e.shiftKey ) /* shift + tab */ {
					    		if(e.srcElement.tabIndex == firstFocusableEl.tabIndex){
					    			firstFocusableEl.focus();
				                	e.preventDefault();
						    	}
					    	}else{
					        	if(e.srcElement.tabIndex == lastFocusableEl.tabIndex){
						    		lastFocusableEl.focus();
				                	e.preventDefault();
						    	}
					        } 
					    }
					});
				}
			}
			// no apply events..
			
			$('.leftToolBarOverlay').bind('click', function(event){
				event.stopPropagation();
				
				//Bug #12558 fix 
				var _pageHratio = $.mobileweb.device['leftbarHratio']
				$.mobileweb.device['leftbarHratio'] = $.mobileweb.device['aspectHratio'];
				$.mobileweb.device['aspectHratio'] = _pageHratio;
				document.getElementById("leftToolBar").style.width = "0px";
				$('.leftToolBarOverlay').css({width:"0px"});
			});
			$('.leftToolBarOverlay').bind('swipe', function(event){
				event.stopPropagation();
				
				//Bug #12558 fix 
				var _pageHratio = $.mobileweb.device['leftbarHratio']
				$.mobileweb.device['leftbarHratio'] = $.mobileweb.device['aspectHratio'];
				$.mobileweb.device['aspectHratio'] = _pageHratio;
				document.getElementById("leftToolBar").style.width = "0px";
				$('.leftToolBarOverlay').css({width:"0px"});
			});
		};
		
		return leftToolBar;
	};
	
	function RightToolBar(pagedef){
		var RightToolBar = { height: 0 };
		var RightToolBardef = pagedef['toolbarright'];
		
		if(!$.isEmptyObject(RightToolBardef)){
			if(RightToolBardef['children'] != undefined){
				$.each(RightToolBardef['children'], function(i, child){
					child['taborder'] = parseInt(child['taborder']) + 3000;
				});
			}
			
			if(RightToolBardef['view'] == "TableView"){
				$.each(RightToolBardef['children'][0]['group'],function(j,group){
					$.each(group['row'],function(k,row){
						row['children'] = [];
						switch(RightToolBardef['children'][0]['style']){
							case 'default':
								row['children'].push({id:"ui-sidegroup-"+j+"-main-"+k,name:"mainText" + "_ui-defgroup-"+j+"-main-"+k,value:'', template:row['template']['maintext'],viewtype:"Label",frame:{x:10,y:13,width:150,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:16,align:"left",color:{name:"black"}}});
								if(row['template']['image']!==''){
									row['children'][0]['frame']['x'] = 50;
									row['children'].push({id:"ui-sidegroup-"+j+"-img-"+k,value:'', template:row['template']['image'],name:"",viewtype:"Image",frame:{x:10,y:7,width:30,height:30}});
								}
								break;
							case 'subtitle':
								row['children'].push({id:"ui-sidegroup-"+j+"-main-"+k,name:"mainText" + "_ui-defgroup-"+j+"-main-"+k,value:'', template:row['template']['maintext'],viewtype:"Label",frame:{x:10,y:7,width:150,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:16,align:"left",color:{name:"black"}}},
													 {id:"ui-sidegroup-"+j+"-sub-"+k,name:"subText" + "_ui-defgroup-"+j+"-sub-"+k,value:'', template:row['template']['subtext'],viewtype:"Label",frame:{x:10,y:22,width:150,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:12,align:"left",color:{name:"gray"}}});
								if(row['template']['image']!==''){
									row['children'][0]['frame']['x'] = 50;
									row['children'][1]['frame']['x'] = 50;
									row['children'].push({id:"ui-sidegroup-"+j+"-img-"+k,value:'',template:row['template']['image'],name:"",viewtype:"Image",frame:{x:10,y:7,width:30,height:30}});
								}
								break;
							case 'rightaligned':
								row['children'].push({id:"ui-sidegroup-"+j+"-main-"+k,name:"mainText" + "_ui-defgroup-"+j+"-main-"+k,value:'', template:row['template']['maintext'],viewtype:"Label",frame:{x:10,y:13,width:150,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:16,align:"left",color:{name:"black"}}},
										 			 {id:"ui-sidegroup-"+j+"-sub-"+k,name:"subText" + "_ui-defgroup-"+j+"-sub-"+k,value:'', template:row['template']['subtext'],viewtype:"Label",frame:{x:RightToolBardef['frame']['width']-185,y:16,width:150,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:12,align:"right",color:{name:"SteelBlue"}}});
								break;
							case 'contactform':
								row['children'].push({id:"ui-sidegroup-"+j+"-main-"+k,name:"mainText" + "_ui-defgroup-"+j+"-main-"+k,value:'', template:row['template']['maintext'],viewtype:"Label",frame:{x:10,y:17,width:(pagedef['width']-40)*0.4,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:16,align:"right",color:{name:"black"}}},
							 			 			 {id:"ui-sidegroup-"+j+"-sub-"+k,name:"subText" + "_ui-defgroup-"+j+"-sub-"+k,value:'', template:row['template']['subtext'],viewtype:"Label",frame:{x:(pagedef['width']-40)*0.4+20,y:17,width:(pagedef['width']-40)*0.6,height:20},padding:{top:5.0,bottom:5.0,left:5.0,right:5.0},font:{size:12,align:"left",color:{name:"SteelBlue"}}});
								break;
						}
					});
				});
				
				var options;
				if(RightToolBardef['children'][0]['accordion'])
					options = { width: RightToolBardef['frame']['width'], sidebarTableview:true, type:'TableView', children : [{'accordion': true, 'accordionheader': RightToolBardef['children'][0]['accordionheader']}] };
				else
					options = { width: RightToolBardef['frame']['width'], sidebarTableview:true };
				if($.isEmptyObject(pagedef['data']['contents']))//Bug #11365 Fix
					pagedef['data']['contents'] = [];
				var sidebarTableDef = $.extend({}, pagedef, options );
				
				RightToolBar['children'] = new $.uichildren(sidebarTableDef, RightToolBardef['children'], sidebarTableDef['data']['contents'][0]);
			}else{
				
				if(pagedef['data'] != undefined &&  pagedef['data']['contents'] != undefined){
					RightToolBar['children'] = new $.uichildren(pagedef, RightToolBardef['children'], pagedef['data']['contents'][0]);
				}else{
					RightToolBar['children'] = new $.uichildren(pagedef, RightToolBardef['children']);
				}
			}
		}

		RightToolBar.isHidden = function(){
			//return RightToolBardef['hidden'];
		};
		
		RightToolBar.getHTML= function(){
			if(!$.isEmptyObject(RightToolBardef)){
				if(RightToolBardef['view'] == "FreeLayout"){
					return ['<div id="rightToolBar" class="sidenav">', 
								'<div class="RightToolBarOverlay" style="z-index: 1000;border: none;margin: 0px;padding: 0px;width: 100%;height: 100%;top: 0px;left: 0px;background-color: rgb(0, 0, 0);opacity: 0.2;position: fixed;"></div>',
								RightToolBar['children'].getHTML(),				     
							'</div>'].join('');
				}else{
					return ['<div id="rightToolBar" class="sidenav">',
								'<div id="iscroll_RightToolBar_',pagedef['name'],'">',
									'<div class="RightToolBarOverlay" style="z-index: 1000;border: none;margin: 0px;padding: 0px;width: 100%;height: 100%;top: 0px;left: 0px;background-color: rgb(0, 0, 0);opacity: 0.2;position: fixed;"></div>',
									RightToolBar['children'].getHTML(),
								'</div>',
							'</div>'].join('');
				}
			}else 
				return [''].join('');
			
		};
		
		RightToolBar.applyOverrides = function(){
			if(RightToolBar['children'] != undefined){
				var pageHratio = $.mobileweb.device['aspectHratio'];
				setTimeout(function(){
					if(sidebarHratio)	$.mobileweb.device['aspectHratio'] = sidebarHratio;
					
					RightToolBar['children'].applyOverrides();
					$.mobileweb.device['sidebarHratio'] = $.mobileweb.device['aspectHratio'];//In Ref of Bug #12558 fix
					$.mobileweb.device['aspectHratio'] = pageHratio;
				}, 500);
				
				var statusBarHeight = (!pagedef['statusbarhidden']) ? 20 : 0;
				var sLeft = (document.documentElement.clientWidth > pagedef['width']*$.mobileweb.device['aspectWratio']) ? (document.documentElement.clientWidth - pagedef['width']*$.mobileweb.device['aspectWratio'])/2:0;
				sLeftSidebar = (document.documentElement.clientWidth) - sLeft;
				var _clientHeight = document.documentElement.clientHeight;
				if($.mobileweb['state'] === 'preview')
					_clientHeight = pagedef['toolbarright']['frame']['height'];//Bug #12166 Fix
				var sidebarHratio = (_clientHeight-statusBarHeight)/(pagedef['toolbarright']['frame']['height']-statusBarHeight);
				
				$('.RightToolBarOverlay').css({top: statusBarHeight, left:sLeft, width:"0px", height:(_clientHeight-statusBarHeight)});
				
				$('.sidenav').css({'padding-top':'0px', top: statusBarHeight, width: '0px', left:sLeftSidebar});
				$('.sidenav').css({'background': ($.attributes('color',RightToolBardef['backgroundColor'])).getColorCode(),'background-repeat': 'repeat'});
				if(RightToolBardef['view'] == "TableView"){
					$('.sidenav').css({height:(_clientHeight-statusBarHeight)-60});
					var sidenavHeight = ($.mobileweb['state'] === 'preview') ? RightToolBardef['frame']['height'] : (_clientHeight-statusBarHeight);
					$('#iscroll_RightToolBar_'+pagedef['name']).css({'position':'absolute', top: statusBarHeight, 'left':'0px', height:(parseInt(sidenavHeight)), width:pagedef['width']*$.mobileweb.device['aspectWratio']});
					return;
					
				}else if(RightToolBardef['view'] == "FreeScroll"){
					$('.sidenav').css({height:(_clientHeight-statusBarHeight)});
					$('#iscroll_RightToolBar_'+pagedef['name']).css({'position':'absolute', top: statusBarHeight, 'left':'0px', height:(RightToolBardef['frame']['height']-statusBarHeight)* $.mobileweb.device['aspectHratio'], width:pagedef['width']*$.mobileweb.device['aspectWratio']});
					$('.sidenav').css({height:(document.documentElement.clientHeight-statusBarHeight)});
					$('#iscroll_RightToolBar_'+pagedef['name']).css({height:(RightToolBardef['frame']['height'] * leftbarHratio)});
					return;
					
				}else{
					$('.sidenav').css({height:(_clientHeight-statusBarHeight)});
				}
				$('.sidenav').css({top: statusBarHeight});
				
				setTimeout(function(){
				for(var i =0; i < RightToolBar['children'].length; i++){
					$('#' + RightToolBar['children'][i].getId()).css({'z-index': 1001 + i});
					if(RightToolBar['children'][i].getViewType() == 'Label'){
						$('#' + RightToolBar['children'][i].getId()).css({'position':'initial'});
						if($('#' + RightToolBar['children'][i].getId()+'_p') != undefined){
							$('#' + RightToolBar['children'][i].getId()+'_p').css({'z-index': 1001 + i});
						}
					}
					if($('#' + RightToolBar['children'][i].getId()+'_label') != undefined){
						$('#' + RightToolBar['children'][i].getId()+'_label').css({'z-index': 2001 + i});
					}
					var topVal = $('#' + RightToolBar['children'][i].getId()).css('top');
					if(topVal != undefined){
						topVal = parseFloat(topVal.replace("px",""));//+60;
						$('#' + RightToolBar['children'][i].getId()).css({'top':topVal+"px"});
						if($('#' + RightToolBar['children'][i].getId()+'_p') != undefined){
							var topPval = $('#' + RightToolBar['children'][i].getId()+'_p').css('top');
							if(topPval != undefined){
								if(RightToolBar['children'][i].getViewType() == 'LinkLabel'){
									$('#' + RightToolBar['children'][i].getId()).css({'transform':'none'});
								}
								//if($('#' + RightToolBar['children'][i].getId()+'_p').parent().attr('id') != $('#' + RightToolBar['children'][i].getId()).attr('id')){
								if(RightToolBar['children'][i].getViewType().indexOf('Label') != -1){
									topPval = parseFloat(topPval.replace("px",""));//+60;
									$('#' + RightToolBar['children'][i].getId()+'_p').css({'top':topPval+"px"});
								}
							}
						}
						
						if($('#' + RightToolBar['children'][i].getId()+'_label') != undefined){
							var topLval = $('#' + RightToolBar['children'][i].getId()+'_label').css('top');
							if(topLval != undefined){
								if($('#' + RightToolBar['children'][i].getId()+'_label').prev().attr('name') == $('#' + RightToolBar['children'][i].getId()).attr('name')){
									topLval = parseFloat(topLval.replace("px",""));//+60;
									$('#' + RightToolBar['children'][i].getId()+'_label').css({'top':topLval+"px"});
								}
							}
						}
						
						if($('#' + RightToolBar['children'][i].getId()+'_divImg') != undefined){
							var topLval = $('#' + RightToolBar['children'][i].getId()+'_divImg').css('top');
							if(topLval != undefined){
								topLval = parseFloat(topLval.replace("px",""));//+60;
								$('#' + RightToolBar['children'][i].getId()+'_divImg').css({'top':topLval+"px"});
							}
						}
					}
				}
				}, 600);
			}
			
		};
		
		RightToolBar.applyEvents= function(){
			if(!$.isEmptyObject(RightToolBardef)){
				if(!RightToolBardef['hidden']){
					RightToolBar['children'].applyEvents();
				}
			}
			if($('#RightToolBar').get(0) != undefined && $('#RightToolBar').get(0) != null){
				var len = $('.sidenav').length;
				if(len > 0){
					$('.sidenav').get(len-1).addEventListener('keydown', function(e) {
						var focusableEls = $('#RightToolBar').get(0).querySelectorAll('a[href], button, textarea, input[type="text"],input[type="password"], input[type="radio"], input[type="checkbox"], select');
						var focusableArr = [].slice.call(focusableEls);
						focusableArr.sort(function(obj1, obj2) {
							return ((obj1['tabIndex'] < obj2['tabIndex']) ? -1 : ((obj1['tabIndex'] > obj2['tabIndex']) ? 1 : 0));
						});
						
						var lastFocusableEl = focusableArr[focusableArr.length - 1];
						var firstFocusableEl = focusableArr[0];  
					    if (e.key === 'Tab' || e.keyCode == 9) {
					    	if ( e.shiftKey ) /* shift + tab */ {
					    		if(e.srcElement.tabIndex == firstFocusableEl.tabIndex){
					    			firstFocusableEl.focus();
				                	e.preventDefault();
						    	}
					    	}else{
					        	if(e.srcElement.tabIndex == lastFocusableEl.tabIndex){
						    		lastFocusableEl.focus();
				                	e.preventDefault();
						    	}
					        } 
					    }
					});
				}
			}
			// no apply events..
			
			$('.RightToolBarOverlay').bind('click', function(event){
				event.stopPropagation();
				
				//Bug #12558 fix 
				var _sLeft = (document.documentElement.clientWidth > pagedef['width']*$.mobileweb.device['aspectWratio']) ? (document.documentElement.clientWidth - pagedef['width']*$.mobileweb.device['aspectWratio'])/2:0;
				_sLeft = _sLeft + $('.RightToolBarOverlay').width();
				var _pageHratio = $.mobileweb.device['sidebarHratio']
				$.mobileweb.device['sidebarHratio'] = $.mobileweb.device['aspectHratio'];
				$.mobileweb.device['aspectHratio'] = _pageHratio;
				$('#rightToolBar').animate({
					   left: _sLeft,
					   width: '0px'
					  }, 500);
				var timer =	setInterval(function(){
					clearInterval(timer);
					$('.RightToolBarOverlay').css({width:"0px"});
				},400);
			});
			
			$('.RightToolBarOverlay').bind('swipe', function(event){
				event.stopPropagation();
				var _sLeft = (document.documentElement.clientWidth > pagedef['width']*$.mobileweb.device['aspectWratio']) ? (document.documentElement.clientWidth - pagedef['width']*$.mobileweb.device['aspectWratio'])/2:0;
				_sLeft = _sLeft + $('.RightToolBarOverlay').width();
				var _pageHratio = $.mobileweb.device['sidebarHratio']
				$.mobileweb.device['sidebarHratio'] = $.mobileweb.device['aspectHratio'];
				$.mobileweb.device['aspectHratio'] = _pageHratio;
				$('#rightToolBar').animate({
					   left: _sLeft,
					   width: '0px'
					  }, 400);
				var timer =	setInterval(function(){
					clearInterval(timer);
					$('.RightToolBarOverlay').css({width:"0px"});
				},200);
			});
		};
		
		return RightToolBar;
	};
	
	$.page = function(page, isReverse){
		return new Page(page, isReverse);
	};
})(jQuery);
