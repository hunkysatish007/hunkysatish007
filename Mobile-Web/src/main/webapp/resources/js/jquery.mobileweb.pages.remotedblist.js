/*
 * JQuery Plugin to create RemoteDB List View Page only.
 * Created By : Akhil Tyagi
 * Created On : March 19, 2015.
 */

(function($){
	$.remotedblistpage = function(pagedef){
		
		return listpage;
	};
	
	$.getData = function(pagedef){
		var remoteData = new $.actions(pagedef, null, [{method:"Select", category:"ComAction", 
			params:{
				servicename: pagedef['data']['servicename'],
				table: pagedef['data']['tablename'],
				where: pagedef['data']['wherecond'],
				order: pagedef['data']['order'],
				limit : 25,
				offset: 0,
				fields:""// $.utility('getColumns',pagedef['data']['tablename'],[],pagedef['children'])
			}
		}]).execute();
		
		return remoteData;
	};
	
	$.createPageTemplate = function(pagedef){
		//only 1 children and 1 group allowed here
		var group = pagedef['children'][0]['group'][0];
		var rows = [];
		var aspect = $.mobileweb.device['aspectratio'];
		if(pagedef['data']['contents']['rows'] != 0){
			$.each(pagedef['data']['contents'],function(i,data){
				if(i < 25){
					var row = {
						rownum: i,
						rowsize:group['template']['rowsize'],
						backgroundColor : group['template']['backgroundColor'],
						icon : group['template']['icon'],
						data : {contents: [data]},
						events : group['template']['events'],
						children: []
					};
					switch(pagedef['children'][0]['style']){
						case 'default':
							row['children'].push({id:"ui-group-0-main-"+i,name:'',value:'', template:group['template']['maintext'],viewtype:"Label",frame:{x:10,y:13,width:150,height:20},font:{size:16,align:"left",color:{name:"black"}}});
							if(group['template']['image']!==''){
								row['children'][0]['frame']['x'] = 50;
								row['children'].push({id:"ui-group-0-img-"+i,value:'', template:group['template']['image'],name:"",viewtype:"Image",frame:{x:10,y:7,width:30,height:30}});
							}
							break;
						case 'subtitle':
							row['children'].push({id:"ui-group-0-main-"+i,name:'',value:'', template:group['template']['maintext'],viewtype:"Label",frame:{x:10,y:7,width:250,height:20},font:{size:16,align:"left",color:{name:"black"}}},
												 {id:"ui-group-0-sub-"+i,name:'',value:'', template:group['template']['subtext'],viewtype:"Label",frame:{x:10,y:22,width:250,height:20},font:{size:12,align:"left",color:{name:"gray"}}});
							if(group['template']['image']!==''){
								row['children'][0]['frame']['x'] = 50;
								row['children'][1]['frame']['x'] = 50;
								row['children'].push({id:"ui-group-0-img-"+i,value:'',template:group['template']['image'],name:"",viewtype:"Image",frame:{x:10,y:7,width:30,height:30}});
							}
							break;
						case 'rightaligned':
							row['children'].push({id:"ui-group-0-main-"+i,name:'',value:'', template:group['template']['maintext'],viewtype:"Label",frame:{x:10,y:13,width:150,height:20},font:{size:16,align:"left",color:{name:"black"}}},
									 			 {id:"ui-group-0-sub-"+i,name:'',value:'', template:group['template']['subtext'],viewtype:"Label",frame:{x:pagedef['width']-185,y:16,width:150,height:20},font:{size:12,align:"right",color:{name:"SteelBlue"}}});
							break;
						case 'contactform':
							row['children'].push({id:"ui-group-0-main-"+i,name:'',value:'', template:group['template']['maintext'],viewtype:"Label",frame:{x:10,y:17,width:70,height:20},font:{size:16,align:"right",color:{name:"black"}}},
						 			 			 {id:"ui-group-0-sub-"+i,name:'',value:'', template:group['template']['subtext'],viewtype:"Label",frame:{x:90,y:17,width:200,height:20},font:{size:12,align:"left",color:{name:"SteelBlue"}}});
							break;
						case 'custom':
							$.each(group['template']['children'] ,function(j,child){
								row['children'].push($.utility('clone',child));
								row['children'][j].id = ['ui-group-0-',i,'-',j].join('');
							});
							break;
					}
					rows.push(row);
				}
			});
		}
		group['row'] = rows;
		page['children'] = new $.uichildren(pagedef, pagedef['children'], null);
	};
	
	$.showRemoteDBListPage = function(pagedef){
		
	};
	
})(jQuery);