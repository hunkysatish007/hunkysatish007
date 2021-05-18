/**
 * Author: Akhil Tyagi
 * Date: March 18, 2013
 * For Google Map Services only..
 */
 
var mapp;

(function($){
	var GMapMethods = {
		init : function( options ) {
			if(GMapMethods.data==undefined){
				GMapMethods.data = {
						//maps : [],
						initSettings:null,
						//geocoder: null,
						showLoading: false,
						routePoints: null,
						checkPoint: 0,
						infowindow: new google.maps.InfoWindow({maxWidth:150,content:''}),
						directionsService: new google.maps.DirectionsService(),
						directionsDisplay: new google.maps.DirectionsRenderer(),
						markers:[],
						waypoints:[],
						watchProcess : null,
						currentPositionMarker: null,
						//currentMap : mapp,
						mapName : null,
				};
				
				$.extend(GMapMethods.data, options);
			}else{
				$.error( '[CRIT] Cannot make multiple instances of jQuery.GoogleMapServices' );
			}
			
			return this;
		},
		
		setMapName : function(mapName){
			GMapMethods.data['mapName'] = mapName;
		},
		
		getMapName : function(){
			return GMapMethods.data['mapName'];
		},
		
		getMap : function(){
			return mapp;
		},
		
		setMapErrorMessage : function(status,action,service){
			var errMessages = [];
			var msgFlag = false;
			var errGeocoderMessages ={
					ZERO_RESULTS: "Request was successful but returned no results. This may occur if a non-existent address passed.",
					OVER_QUERY_LIMIT: "Request limit exceeded.",
					REQUEST_DENIED: "Request was denied.",
					INVALID_REQUEST: "Invalid request.",
					UNKNOWN_ERROR: "The request could not be processed due to a server error. The request may succeed if you try again.",
					ERROR:  "The request timed out or there was a problem contacting the Google servers. The request may succeed if you try again."
			}
			var errDirectionMessages ={
					NOT_FOUND: "One of the locations specified in the request's origin, destination, or waypoints could not be geocoded.",
					ZERO_RESULTS: "No route could be found between the origin and destination.",
					MAX_WAYPOINTS_EXCEEDED: "Too many DirectionsWaypoint fields were provided in the DirectionsRequest.",
					INVALID_REQUEST: "Invalid DirectionsRequest.",
					OVER_QUERY_LIMIT:  "The request timed out or there was a problem contacting the Google servers. The request may succeed if you try again.",
					REQUEST_DENIED: "Not allowed to use the directions service.",
					UNKNOWN_ERROR:" Server error."
			}
			var errElevationMessages ={
					OVER_QUERY_LIMIT: "Request limit exceeded.",
					REQUEST_DENIED: "Request was denied.",
					INVALID_REQUEST: "Invalid request.",
					UNKNOWN_ERROR: "Unknown error.",
			}
			
			if(service == "Direction")
				errMessages = errDirectionMessages;
			else if(service == "Elevation")
				errMessages = errElevationMessages;
			else if(service == "Geocode")
				errMessages = errGeocoderMessages;
			
			$.each(errMessages , function(key, value){
				if(key == status){
					msgFlag = true;
					$.mobileweb['__ERR_MSG__'] = "Google Map "+service+" Error : " + value;
				}
			});
			if(!msgFlag)
				$.mobileweb['__ERR_MSG__'] = "Google Map Error : "
		},
		
		setMarkerForCurrentPost : function(marker){
			GMapMethods.data['currentPositionMarker'] = marker;
		},
		
		getMarkerForCurrentPost : function(){
			return GMapMethods.data['currentPositionMarker'];
		},
		
		storeMarkers : function(pageName, map, markerid, marker,spotdetail){
			GMapMethods.data['markers'].push({page:pageName,map:map,markerID:markerid,spotdetail: spotdetail,markerObject:marker});
			
			// Below code for re-center map at last added marker position when navigating back to that page.
			var Gmap = $.GMapService('getMap');
 			if($.utility('getSessionData',"MarkerObj",map)!=null)
 			{
 				var MarkerObj = $.utility('getSessionData',"MarkerObj",map);
 				MarkerObj = $.parseJSON(MarkerObj);	
 				if(GMapMethods.data['markerCount'] == GMapMethods.data['markers'].length -1){
 					Gmap.setCenter({lat:MarkerObj['latitude'], lng:MarkerObj['longitude']});
 					var MarkerObj = {page_name:pageName, u_id:map,longitude:MarkerObj['latitude'],latitude:MarkerObj['longitude']};
 					$.utility('setSessionData',MarkerObj,"MarkerObj");
 				}	
 			}
 			
 			if($.utility('getSessionData',"dragObj",map)!=null)
			{
				var dragObj = $.utility('getSessionData',"dragObj",map);
				dragObj = $.parseJSON(dragObj);		
				if($.mobileweb.getCurrentPage().getName()==dragObj['page_name'])
				{
					Gmap.setCenter({lat:dragObj['latitude'], lng:dragObj['longitude']});
				}
			}
			
		},
		
		getLatLngByPlace : function(place, callback, action) {
			var latlng = {latitude:'',longitude:'',latXlng:'',location:'',district:'',state:''};
			var geoCoder = new google.maps.Geocoder();
			geoCoder.geocode({
				"address" : place
			}, function(results, status) {
				try{
//					if(((status == "OK") || status != "ZERO_RESULTS")){
//						latlng.latitude = results[0].geometry.location.lat();
//						latlng.longitude = results[0].geometry.location.lng();
//						latlng.latXlng = new google.maps.LatLng(latlng.latitude, latlng.longitude);
//						latlng.location = results[0].address_components[0].long_name;
//						latlng.district = (results[0].address_components.length > 1) ? results[0].address_components[1].long_name : " ";
//						latlng.state = (results[0].address_components.length > 2) ? results[0].address_components[2].long_name : " ";
//						callback(latlng);
//					}else {
//						callback(false);
//					}
					switch(status){
						case "OK":
							latlng.latitude = results[0].geometry.location.lat();
							latlng.longitude = results[0].geometry.location.lng();
							latlng.latXlng = new google.maps.LatLng(latlng.latitude, latlng.longitude);
							latlng.location = results[0].address_components[0].long_name;
							latlng.district = (results[0].address_components.length > 1) ? results[0].address_components[1].long_name : " ";
							latlng.state = (results[0].address_components.length > 2) ? results[0].address_components[2].long_name : " ";
							callback(latlng);
							break;
						case "ZERO_RESULTS"://Bug #11852 Fix
							latlng.latXlng = "Not Found";
							callback(latlng);
							break;
						case "OVER_DAILY_LIMIT":
						case "OVER_QUERY_LIMIT":
						case "REQUEST_DENIED":
						case "INVALID_REQUEST": 
						case "UNKNOWN_ERROR":
							$.mobileweb['__ERR_CODE__'] = status;
							$.GMapService('setMapErrorMessage',status,"getLatLngByPlace","Geocode");
							callback(false);
							break;
							
						default:
							callback(false);
					}
					
				}catch(e){
					$.mobileweb['__ERR_CODE__'] = status;
					$.GMapService('setMapErrorMessage',status,"getLatLngByPlace","Geocode");
					callback(false);
				}

			});
		},
		
		createGoogleMap : function(pagedef, childdef, data){
			var initLocation = childdef['initiallocation'];
			if((childdef['initiallocation'].indexOf("[") != -1) && (childdef['initiallocation'].indexOf("]") != -1)){
				initLocation = $.utility('extractDataFromRecord', data, childdef['initiallocation']);
			}
			for(var event in childdef['events']){
				if(event == 'onMapLoadStart'){
					$.GMapService('Event_onMapLoadStart', pagedef, childdef);
				}
			}
			/*if(event == 'Event_onMapLoadEnd'){
				$.GMapService('Event_onMapLoadEnd', pagedef, childdef);
			}*/
			
			$.GMapService('getLatLngByPlace', initLocation, function(latlng){
				var location = latlng.latXlng; 
				if(location == "Not Found"){//Bug #11852 Fix
					$.GMapService('Event_onMapLoadFail', pagedef, childdef);
					return;
				}
				if(!latlng){
						
					location = new google.maps.LatLng(35.6895,139.6917);	// location for Tokyo as default..
					
					// if we set a position as center of map, and navigating forth & back then map should be centered at that position.
					if($.utility('getSessionData',"MarkerObj",childdef['name'])!=null)
					{
						var MarkerObj = $.utility('getSessionData',"MarkerObj",childdef['name']);
						MarkerObj = $.parseJSON(MarkerObj);		
						if($.mobileweb.getCurrentPage().getName()==MarkerObj['page_name'])
						{
							location = new google.maps.LatLng(MarkerObj['latitude'],MarkerObj['longitude']);
							//Gmap.setCenter({lat:MarkerObj['latitude'], lng:MarkerObj['longitude']});
						}
					}
					
					// If location fails... then trigger OnLocationError Event.
					for(var event in childdef['events']){
						if(event == 'onLocationError'){
							$.GMapService('Event_'+event, pagedef, childdef);
						}
					}
				}
				
				// creating Map...
				try{
					childdef['gmapCreated'] = true;
					var mapObject = $.utility('getUiFromObject',pagedef['name'],childdef['name'])[0];
					if($.utility('getSessionData',"zoomObj",childdef['name'])!=null)
					{
						var zoomObj = $.utility('getSessionData',"zoomObj",childdef['name']);
						zoomObj = $.parseJSON(zoomObj);		
						childdef['zoomlevel'] = zoomObj['zoom'];
					}
					var mapParameters = {
							zoom: childdef['zoomlevel'], 
							center: location,
							panControl:false,
							zoomControl:false,
							mapTypeControl:false,
							scaleControl:false,
							streetViewControl:false,
							overviewMapControl:false,
							rotateControl:false,
							mapTypeId: google.maps.MapTypeId.ROADMAP
							
					};
					
					mapp = new google.maps.Map(mapObject, mapParameters);
					$.mobileweb['__MAPZOOM__'] = mapp['zoom'];
					// below code is used for moving to different tabs only, as map tiles disappear on switching tabs.. this code will fix it.
					google.maps.event.addListener(mapp, "idle", function(){
						google.maps.event.trigger(mapp, 'resize');
						//mapp.setCenter(location);
					});
					
					// to programmatically detect an authentication failure, prepare a callback function. If the following global function is defined it will be called when the authentication fails.
					// function gm_authFailure() { /* Code */ };
					window.gm_authFailure = function() {
						console.log('google map _ authFailure');
					};
					
					mapp.addListener('zoom_changed', function() {
						GMapMethods.data['infowindow'].setContent('Zoom: ' + mapp.getZoom());
						var zoomObj = {page_name:pagedef['name'], u_id:childdef['name'],zoom:mapp.getZoom()};
						$.utility('setSessionData',zoomObj,"zoomObj",pagedef['name']);
					});
					
					
					mapp.addListener('dragend', function() {
						var dragObj = {page_name:pagedef['name'], u_id:childdef['name'],longitude:mapp.center.lng(),latitude:mapp.center.lat()};
						$.utility('setSessionData',dragObj,"dragObj");
					});					
					
					// settting map name..
					$.GMapService('setMapName', childdef['name']);
					
				}catch(e){
					$.GMapService('Event_onMapLoadFail', pagedef, childdef);
				}
				
				// apply some events on MapLoad...
				google.maps.event.addListenerOnce(mapp, 'tilesloaded', function(){
					// Apply all events now.. 
					for(var event in childdef['events']){
						if((event == 'onMapLoadEnd') || (event == 'onMapScrollEnd') || (event == 'onMapScrollStart') || (event == 'onNewLocation')){
							$.GMapService('Event_'+event, pagedef, childdef, mapp);
						}
					}
					if($.mobileweb[childdef['name']] != undefined && $.mobileweb[childdef['name']]['Scope'] == "ON"){
						$.GMapService('OpenTargetScope',{targetpage : pagedef['name']}, $.mobileweb[childdef['name']]['target'])
					}
				});
				google.maps.event.addListener(mapp, 'tilesloaded', function(){
					var geocoder = new google.maps.Geocoder();
					geocoder.geocode({'latLng': mapp.getCenter()}, function(results, status) {
						if(status == "OK"){
							if(results != null && results[0] != undefined){
								childdef['value'] = results[0].formatted_address;
								$.mobileweb['__ADDRESS__'] = results[0].formatted_address;
	 							$("#__ADDRESS__").val($.mobileweb['__ADDRESS__']);
							}
							if($.utility('getSessionData',"showRouteObj",childdef['name'])!=null)
							{
								var showRouteObj = $.utility('getSessionData',"showRouteObj",childdef['name']);
								showRouteObj = $.parseJSON(showRouteObj);		
								if($.mobileweb.getCurrentPage().getName()==showRouteObj["pagedef"]['name'])
								{
									$.GMapService('ShowRoute',showRouteObj["params"], showRouteObj['target'],showRouteObj['action'],showRouteObj['pagedef'],showRouteObj['ui']);
								}
							}
						}else{
							$.mobileweb['__ERR_CODE__'] = status;
							$.GMapService('setMapErrorMessage',status,"createGoogleMap","Geocode");
							$.GMapService('Event_onMapLoadFail', pagedef, childdef);
						}
					});
					
					if ($("body").find("#__LAT__").length == 0 ) {
						$('body').append("<input id='__LAT__' type='text' hidden='true'>"+ $.mobileweb["__LAT__"] +"</input>");
					}
					if ($("body").find("#__LONG__").length == 0 ) {
						$('body').append("<input id='__LONG__' type='text' hidden='true'>"+ $.mobileweb["__LONG__"] +"</input>");
					}
					if ($("body").find("#__MAPZOOM__").length == 0 ) {
						$('body').append("<input id='__MAPZOOM__' type='text' hidden='true'>"+ $.mobileweb["__MAPZOOM__"] +"</input>");
					}
					$.mobileweb['__MAPZOOM__'] = mapp['zoom'];
					if($.mobileweb[childdef['name']] == undefined){
						$.mobileweb['__LAT__'] = mapp.center.lat();
						$.mobileweb['__LONG__'] = mapp.center.lng();
					}
					else{
						if($.utility('getSessionData',"mapObj")!=null)
						{
							var mapObject = $.utility('getSessionData',"mapObj",childdef['name']);
							mapObj = $.parseJSON(mapObject);		
							$.mobileweb["__LAT__"] = mapObj.latitude;
							$.mobileweb["__LONG__"] = mapObj.longitude;
							mapp.setCenter({
								lat : mapObj.latitude,
								lng : mapObj.longitude
							});
						}						
					}
					$("#__LAT__").val($.mobileweb['__LAT__']);
					$("#__LONG__").val($.mobileweb['__LONG__']);
					$("#__MAPZOOM__").val($.mobileweb['__MAPZOOM__']);
					$("#__MAPZOOM__").trigger("onchange");
					for(var marker in GMapMethods.data['markers']){
						var markerObject = GMapMethods.data['markers'][marker];
						if(markerObject['spotdetail'] != undefined && markerObject['spotdetail']){
							var targetMarker = markerObject['markerObject'];
							targetMarker.setMap(null);
							GMapMethods.data['markers'].splice(marker,1);
						}
					}
					pagedef['spotdetails'][childdef['id']]['data'] = [];
					pagedef['spotdetails'][childdef['id']]['isLoaded'] = false;
					new $.actions(pagedef, null, [{method:"Select", category:"DBAction", spotdetails : true, childdef : "{'uiobject':{'ui':'GoogleMap','id':'"+childdef['id']+"'}}",params:{tablename:'spotdetail', where:'', order:'', columns:""}}]).execute();
					var myVar=setInterval(function() {
						if((pagedef['spotdetails'][childdef['id']] != undefined)){
							if((pagedef['spotdetails'][childdef['id']]['isLoaded'] != undefined) && (pagedef['spotdetails'][childdef['id']]['isLoaded'])){
								clearInterval(myVar);
								if(pagedef['spotdetails'][childdef['id']]['data'].length != 0){
									//var bounds = new google.maps.LatLngBounds();
									var allMarkerLocations = pagedef['spotdetails'][childdef['id']]['data'];
									var actions = [];
									var zoomLevel = mapp.getZoom();
									for(var i in allMarkerLocations){
										// Since 'limitzoom' parameter no longer supported, so we have to remove this restriction. Dated : 13-Sep-2017
										//if((allMarkerLocations[i]['limitzoom'] != undefined && allMarkerLocations[i]['limitzoom'] <= zoomLevel)/* || allMarkerLocations[i]['limitzoom'] ===null*/){
											var action = {};
											if(allMarkerLocations[i]["markertype"] != undefined && allMarkerLocations[i]["markertype"] === "Custom"){
												action = {method:"AddCustomMarker", category:"GoogleMapAction",spotdetails:true, name:childdef['name'],data:allMarkerLocations[i],params:{targetpage:pagedef['name'],markerid:allMarkerLocations[i]['markerid'],title:allMarkerLocations[i]['title'],subtitle:allMarkerLocations[i]['subtitle'],leftviewimage:allMarkerLocations[i]['leftviewimage'],markertype:allMarkerLocations[i]['markertype'], markerimage:allMarkerLocations[i]['markerfile'],anchorx:allMarkerLocations[i]['anchorx'],anchory:allMarkerLocations[i]['anchory'],rightviewimage:allMarkerLocations[i]['rightviewimage'],showcallout:allMarkerLocations[i]['callout'],latitude:allMarkerLocations[i]['latitude'],longitude:allMarkerLocations[i]['longitude']},condition:{},events:{Error:[],RightButtonClicked:[allMarkerLocations[i]['rightaction']],Success:[],LeftButtonClicked:[allMarkerLocations[i]['leftaction']],}};
											}else{
												action = {method:"AddPinMarker", category:"GoogleMapAction",spotdetails:true, name:childdef['name'],data:allMarkerLocations[i],params:{targetpage:pagedef['name'],markerid:allMarkerLocations[i]['markerid'],title:allMarkerLocations[i]['title'],subtitle:allMarkerLocations[i]['subtitle'],leftview:allMarkerLocations[i]['leftview'],rightview:allMarkerLocations[i]['rightview'],showcallout:allMarkerLocations[i]['callout'],latitude:allMarkerLocations[i]['latitude'],longitude:allMarkerLocations[i]['longitude']},condition:{},events:{Error:[],RightButtonClicked:[allMarkerLocations[i]['rightaction']],Success:[],LeftButtonClicked:[allMarkerLocations[i]['leftaction']],}};
											}
											//bounds.extend(new google.maps.LatLng(allMarkerLocations[i]['latitude'], allMarkerLocations[i]['longitude']));
											actions.push(action);
										//}

									}
									new $.actions(pagedef, childdef['name'],actions).execute();
									//mapp.fitBounds(bounds);
								}
							}
						}
					},100);



				});
				
			});
		
		
			
			
			
		
		/* Let this code remain commented till all maps issue got fixed...
			
			GMapMethods.data['geocoder'].geocode({
				"address" : initLocation
				}, function(results, status) {
					
					try{
						$.GMapService('Event_onMapLoadStart', pagedef, childdef);
						if((status == google.maps.GeocoderStatus.OK) || (status == 'ZERO_RESULTS')){
						var lat = '';
						var lng = '';
						if($.isEmptyObject(results)){
							lat = 35.6895; //Tokyo's Latitude Longitude is set.
							lng = 139.6917;
						}
						else {
							lat = results[0].geometry.location.lat();
							lng = results[0].geometry.location.lng();
						}
						
							GMapMethods.data['initSettings'] = {
								zoom: childdef['zoomlevel'], 
								center: new google.maps.LatLng(lat,lng),
								panControl:false,
								zoomControl:false,
								mapTypeControl:false,
								scaleControl:false,
								streetViewControl:false,
								overviewMapControl:false,
								rotateControl:false,
								mapTypeId: google.maps.MapTypeId.ROADMAP};
								var map = null;
							try{
								
								console.log("^^^^^^^^^^^^^^^^^^^^^");
								
								map = new google.maps.Map($.utility('getUiFromObject',pagedef['name'],childdef['name'])[0], GMapMethods.data['initSettings']);
								GMapMethods.data['currentMap'] = map;
								
								console.log(map);
								
								//$.GMapService('storeMapsObject', pagedef['name'], map);
								
							}catch(e){
								$.GMapService('Event_onMapLoadFail', pagedef, childdef);
							}
							
							google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
								// Apply all events now.. 
								for(var event in childdef['events']){
									if((event == 'onMapLoadEnd') || (event == 'onMapScrollEnd') || (event == 'onMapScrollStart') || (event == 'onNewLocation')){
										$.GMapService('Event_'+event, pagedef, childdef, map);
									}
								}
							});
						}else{
							for(var event in childdef['events']){
								if(event == 'onLocationError'){
									$.GMapService('Event_'+event, pagedef, childdef);
								}
							}
						}
					}catch(e){
						for(var event in childdef['events']){
							if(event == 'onLocationError'){
								$.GMapService('Event_'+event, pagedef, childdef);
							}
						}
						console.log("Could not able to find this place..");
					}
					
					
			});	*/
			
		},
		
		// Handling All Google Maps Events ....
		Event_onLoadError : function(pagedef, childdef){
			return false;
		},
		
		Event_onMapLoadStart : function(pagedef, childdef){
			// For Map load start event..
			if(childdef['events']['onMapLoadStart'] != undefined){
				new $.actions(pagedef, childdef['name'], childdef['events']['onMapLoadStart'].slice()).execute();
			}
		},
		
		Event_onMapLoadEnd : function(pagedef, childdef, map){
			if(childdef['events']['onMapLoadEnd'] != undefined){
				new $.actions(pagedef, childdef['name'], childdef['events']['onMapLoadEnd'].slice()).execute();
			}
		},
		
		Event_onMapLoadFail : function(pagedef, childdef){
			if(childdef['events']['onMapLoadFail'] != undefined){
				new $.actions(pagedef, childdef['name'], childdef['events']['onMapLoadFail'].slice()).execute();
			}
		},
		
		Event_onNewLocation : function(pagedef, childdef, map){
			google.maps.event.addListener(map, 'center_changed', function(){
				new $.actions(pagedef, childdef['name'], childdef['events']['onNewLocation'].slice()).execute();
			});
		},
		
		Event_onLocationError : function(pagedef, childdef){
			new $.actions(pagedef, childdef['name'], childdef['events']['onLocationError'].slice()).execute();
		},
		
		Event_onMapScrollStart : function(pagedef, childdef, map){
			google.maps.event.addListener(map, 'dragstart', function(){
				new $.actions(pagedef, childdef['name'], childdef['events']['onMapScrollStart'].slice()).execute();
			});
		},
		
		Event_onMapScrollEnd : function(pagedef, childdef, map){
			google.maps.event.addListener(map, 'dragend', function(){
				new $.actions(pagedef, childdef['name'], childdef['events']['onMapScrollEnd'].slice()).execute();
			});
		},
		
		
		// Below is the all actions defined related to google maps ....
		
		setMarkerToMap : function(markers, callback){
			// {markers:[{name:"name",position:"latlng",icon:"URL"}]}
		},
		
		setMapLocation : function(params, place, targetMap, action, pagedef, ui){
			var Gmap = $.GMapService('getMap');
			return $.GMapService('getLatLngByPlace', place, function(latlng){
				var location = latlng.latXlng; 
				if(location == "Not Found"){//Bug #11852 Fix
					$.GMapService('Event_onMapLoadFail', pagedef, childdef);
					return;
				}
				if(latlng == false){
					var obj = $.utility('getUiID_Object_From_Page',pagedef['name'] ,targetMap.getId());
					$.GMapService('Event_onLocationError', pagedef, obj);
				}else{
					Gmap.setCenter(latlng.latXlng);
				}
			});
		},
		
		setValueForMap : function(targetMap, LatXLong, params, action){
			var pagename = $.mobileweb.getCurrentPage().getName();
			var pagedef = $.utility('getObject',$.mobileweb['pages'],'name',pagename);
			var Gmap = $.GMapService('getMap');
			var latitude = LatXLong.split(",")[0];
			var longitude = LatXLong.split(",")[1];
			latitude = $.utility('tokenizeString', latitude);
			longitude = $.utility('tokenizeString', longitude);
			var location = new google.maps.LatLng(latitude,longitude);
			var geocoder = new google.maps.Geocoder();
				geocoder.geocode({'latLng': location}, function(results, status) {
					if (status == "OK") {
						Gmap.setCenter(location);
						return true; //$.utility('ApplyOnSucessAndOnErrorEvents',pagedef, null, action['events'], true);
					} else{
						$.mobileweb['__ERR_CODE__'] = status;
						$.GMapService('setMapErrorMessage',status,"setValueForMap","Geocode");
						return false;
					}
				});
		 },
		
		showLocationInfo : function(action, targetMap, pagedef, ui, actionCallback){
			// setTimeout(function(){	
				 var params = action['params'];
					 params['location'] = $.utility('tokenizeString',params['location'], pagedef);
				 var Gmap =  $.GMapService('getMap');
				 var flag = false;
				 $.GMapService('getLatLngByPlace', params['location'], function(latlng){
					 var location = latlng.latXlng; 
						if(location == "Not Found"){//Bug #11852 Fix
							$.GMapService('Event_onMapLoadFail', pagedef, childdef);
							return;
						}
					 if(latlng){
						 marker = new google.maps.Marker({
							 position: latlng.latXlng,
							 map: Gmap
						 });
						 GMapMethods.data['infowindow'].setContent("<font style='font-size=12px;'><u>Address</u> :<br>"+"<label id='locationaddress'>"+latlng.location+"</label>"+"<br><span style='font-size:10px;'>Latitude : "+"<label id='targetLatitude_"+$.GMapService('getMapName')+"'  style='font-size:10px'>"+latlng.latitude+"</label><br>Latitude : "+"<label id='targetLongitude_"+$.GMapService('getMapName')+"'  style='font-size:10px'>"+latlng.longitude+"</label></span></font>");
						 GMapMethods.data['infowindow'].open(Gmap, marker);
						 actionCallback(pagedef, ui, action, undefined,true);
						// flag = true ; //$.utility('ApplyOnSucessAndOnErrorEvents',pagedef, ui, action['events'], true);
					 }else{
						 actionCallback(pagedef, ui, action, undefined,false);
						//return false; // $.utility('ApplyOnSucessAndOnErrorEvents',pagedef, ui, action['events'], false);
					 }
				 });
				 //return flag;
		//	},1000);
		 },
		
		showRegionInfo : function(params, targetMap){
			var Gmap = $.GMapService('getMap');
			return $.GMapService('getLatLngByPlace', params['location'], function(latlng){
				var location = latlng.latXlng; 
				if(location == "Not Found"){//Bug #11852 Fix
					$.GMapService('Event_onMapLoadFail', pagedef, childdef);
					return;
				}
				marker = new google.maps.Marker({
					position: latlng.latXlng,
					map: Gmap
				});
				GMapMethods.data['infowindow'].setContent("<font style='font-size=12px;'><u>Address</u> :<br>"+latlng.district+"<br><span style='font-size:10px;'>Latitude : "+latlng.latitude+"<br>Latitude : "+latlng.longitude+"</span></font>");
				GMapMethods.data['infowindow'].open(Gmap, marker);
			});
		},
		
		showAreaInfo : function(params, targetMap){
			var Gmap = $.GMapService('getMap');
			return $.GMapService('getLatLngByPlace', params['location'], function(latlng){
				var location = latlng.latXlng; 
				if(location == "Not Found"){//Bug #11852 Fix
					$.GMapService('Event_onMapLoadFail', pagedef, childdef);
					return;
				}
				marker = new google.maps.Marker({
					position: latlng.latXlng,
					map: Gmap
				});
				GMapMethods.data['infowindow'].setContent("<font style='font-size=12px;'><u>Address</u> :<br>"+latlng.state+"<br><span style='font-size:10px;'>Latitude : "+latlng.latitude+"<br>Latitude : "+latlng.longitude+"</span></font>");
				GMapMethods.data['infowindow'].open(Gmap, marker);
			});
		},
		
		OpenTargetScope : function(params, targetMap){
			setTimeout(function(){	
				$.mobileweb[targetMap.getName()] = {'Scope' : 'ON', target : targetMap};
				var map = $.GMapService('getMap');
				if(!document.getElementById("targetimg_"+targetMap.getName()) && map != undefined){
					var mapByName = $("[name='"+targetMap.getName()+"']");
					var top = 	10;	//mapByName.position().top;
					var left = 	3;	//mapByName.position().left;
					var height = mapByName.height()-20;
					var width = mapByName.width()-5;
					var elevator = new google.maps.ElevationService();
					var loc = new google.maps.LatLng(map.center.lat(),map.center.lng());
					var longitudeLeft = ((width *8/30) + (width/30));
					var longitudeTop = 	(height *22/30 ) + 12;
					var latitudeLeft = (width * 58/90) - 3;
					var latitudeTop = (height * 22/30 ) + 12;
					var GPSStatusLeft = ((width *8/30) + (width/30));
					var GPSStatusTop =	height * 8/30 -10;
					var xxxmLeft = (width * 58/90) - 3;
					var xxxmTop = height * 8/30 -10;

					var targetImg = $(document.createElement('img')).css("position", "absolute").css("background", "rgba(255,255,255,0.0)").css("z-index",1).css("left", left+"px").css("top", top+"px").attr("id", "targetimg_"+targetMap.getName()).attr("src", $.utility("getSystemImage",'map_marker.png','GoogleMap')).css("float", "center").css("height", height+"px").css("width", width+"px").css("pointer-events","none").appendTo(mapByName);
					var targetLongitude = $(document.createElement('label')).css("position", "relative").css("z-index",2).css("background", "rgba(0,0,0,0)").css("left", longitudeLeft+"px").css("top", longitudeTop+"px").attr("id","targetLongitude_"+targetMap.getName()).css("font-size", "15px").css("font-weight", "bold").css("color", "red").css("pointer-events","none").css("visibility","true").appendTo(mapByName);
					//Richa
					if($.utility('getSessionData',"mapObj",targetMap.getName())!=null)
					{
						var mapObject = $.utility('getSessionData',"mapObj",targetMap.getName());
						mapObj = $.parseJSON(mapObject);	
						$('#targetLongitude_'+targetMap.getName())[0].innerHTML = (mapObj.longitude).toFixed(5);
					}
					else{
						$('#targetLongitude_'+targetMap.getName())[0].innerHTML = map.center.lng().toFixed(5);
					}
					var targetLatitude = $(document.createElement('label')).css("position", "absolute").css("z-index",2).css("background", "rgba(0,0,0,0)").css("left", latitudeLeft+"px").css("top", latitudeTop+"px").attr("id","targetLatitude_"+targetMap.getName()).css("font-size", "15px").css("font-weight", "bold").css("color", "red").css("pointer-events","none").css("visibility","true").appendTo(mapByName);
					if($.utility('getSessionData',"mapObj",targetMap.getName())!=null)
					{
						var mapObject = $.utility('getSessionData',"mapObj".targetMap.getName());
						mapObj = $.parseJSON(mapObject);	
						$('#targetLatitude_'+targetMap.getName())[0].innerHTML = (mapObj.latitude).toFixed(5);
					}
					else{
						$('#targetLatitude_'+targetMap.getName())[0].innerHTML = map.center.lat().toFixed(5);
					}
					var targetGPSStaus = $(document.createElement('label')).css("position", "absolute").css("z-index",2).css("background", "rgba(0,0,0,0)").css("left", GPSStatusLeft+"px").css("top", GPSStatusTop+"px").attr("id","targetGPSStatus_"+targetMap.getName()).css("font-size", "15px").css("font-weight", "bold").css("color", "red").css("pointer-events","none").css("visibility","true").appendTo(mapByName);
					navigator.geolocation.getCurrentPosition(function(position){
						$('#targetGPSStatus_'+targetMap.getName())[0].innerHTML = "GPS ON"
					},function(error){
						$('#targetGPSStatus_'+targetMap.getName())[0].innerHTML = "GPS OFF"
					});
					if ($("body").find("#__LAT__").length == 0 ) {
						$('body').append("<input id='__LAT__' type='text' hidden='true'>"+ $.mobileweb["__LAT__"] +"</input>");
					}
					if ($("body").find("#__LONG__").length == 0 ) {
						$('body').append("<input id='__LONG__' type='text' hidden='true'>"+ $.mobileweb["__LONG__"] +"</input>");
					}
					if ($("body").find("#__MAPZOOM__").length == 0 ) {
						$('body').append("<input id='__MAPZOOM__' type='text' hidden='true'>"+ $.mobileweb["__MAPZOOM__"] +"</input>");
					}
					//if(position.coords.latitude != $.mobileweb["__LAT__"]){
					$.mobileweb["__LAT__"] = map.center.lat();
					$("#__LAT__").val($.mobileweb["__LAT__"]);
					//	}
					//	if(position.coords.longitude != $.mobileweb["__LONG__"]){
					$.mobileweb["__LONG__"] = map.center.lng();
					$("#__LONG__").val($.mobileweb["__LONG__"]);
					$("#__LAT__").trigger("onchange");
					$("#__LONG__").trigger("onchange");
					$.mobileweb["__LONG__"] = map['zoom'];
					$("#__MAPZOOM__").val($.mobileweb["__MAPZOOM__"]);
					$("#__MAPZOOM__").trigger("onchange");
					//	}
					var targetXXXm = $(document.createElement('label')).css("position", "absolute").css("z-index",2).css("background", "rgba(0,0,0,0)").css("left", xxxmLeft+"px").css("top", xxxmTop+"px").attr("id","targetXXXm_"+targetMap.getName()).css("font-size", "15px").css("font-weight", "bold").css("color", "red").css("pointer-events","none").css("visibility","true").appendTo(mapByName);
					var locations = [];
					locations.push(loc);
					var positionalRequest = {
							'locations' : locations 
					};
					elevator.getElevationForLocations(positionalRequest, function(results, status) {
						if (status == google.maps.ElevationStatus.OK) {
							action['OpenTargetScopeStatus'] = true;
							$('#targetXXXm_'+targetMap.getName())[0].innerHTML = results[0].elevation.toFixed(5) +" m";
						}else{
							$.mobileweb['__ERR_CODE__'] = status;
							$.GMapService('setMapErrorMessage',status,"OpenTargetScope","Elevation");
						}
					});

					google.maps.event.addListener(map, 'dragend', function() {

						//$('#targetLongitude_'+targetMap.getName())[0].innerHTML = map.center.lng().toFixed(5);
						//$('#targetLatitude_'+targetMap.getName())[0].innerHTML = map.center.lat().toFixed(5);

						var newLocation = [];
						newLocation.push(new google.maps.LatLng(map.center.lat(),map.center.lng()));
						//if(position.coords.latitude != $.mobileweb["__LAT__"]){
						$.mobileweb["__LAT__"] = map.center.lat();
						$("#__LAT__").val($.mobileweb["__LAT__"]);
						//	}
						//	if(position.coords.longitude != $.mobileweb["__LONG__"]){
						$.mobileweb["__LONG__"] = map.center.lng();
						$("#__LONG__").val($.mobileweb["__LONG__"]);
						$("#__LAT__").trigger("onchange");
						$("#__LONG__").trigger("onchange");
						$("#targetLongitude_" + targetMap.getName()).text(map.center.lng().toFixed(5));
						$("#targetLatitude_" + targetMap.getName()).text(map.center.lat().toFixed(5));

						var newCenterPosition = {
								'locations' : newLocation
						};


						elevator.getElevationForLocations(newCenterPosition, function(results, status) {
							if (status == google.maps.ElevationStatus.OK) {
								$('#targetXXXm_'+targetMap.getName())[0].innerHTML = results[0].elevation .toFixed(5) +" m";
							}else{
								$.mobileweb['__ERR_CODE__'] = status;
								$.GMapService('setMapErrorMessage',status,"OpenTargetScope","Elevation");
							}
						});
						//Richa
						if(pagedef != undefined){
							var mapObj = {page_name:pagedef['name'], u_id:childdef['name'],longitude:$.mobileweb["__LONG__"],latitude:$.mobileweb["__LAT__"]};
							$.utility('setSessionData',mapObj,"mapObj");
						}
					});
					google.maps.event.addListener(map, 'zoom_changed', function() {

						//$('#targetLongitude_'+targetMap.getName())[0].innerHTML = map.center.lng().toFixed(5);
						//$('#targetLatitude_'+targetMap.getName())[0].innerHTML = map.center.lat().toFixed(5);

						var newLocation = [];
						newLocation.push(new google.maps.LatLng(map.center.lat(),map.center.lng()));
						//if(position.coords.latitude != $.mobileweb["__LAT__"]){
						$.mobileweb["__LAT__"] = map.center.lat();
						$("#__LAT__").val($.mobileweb["__LAT__"]);
						//	}
						//	if(position.coords.longitude != $.mobileweb["__LONG__"]){
						$.mobileweb["__LONG__"] = map.center.lng();
						$("#__LONG__").val($.mobileweb["__LONG__"]);
						$("#__LAT__").trigger("onchange");
						$("#__LONG__").trigger("onchange");
						$("#targetLongitude_" + targetMap.getName()).text(map.center.lng().toFixed(5));
						$("#targetLatitude_" + targetMap.getName()).text(map.center.lat().toFixed(5));

						var newCenterPosition = {
								'locations' : newLocation
						};


						elevator.getElevationForLocations(newCenterPosition, function(results, status) {
							if (status == google.maps.ElevationStatus.OK) {
								$('#targetXXXm_'+targetMap.getName())[0].innerHTML = results[0].elevation .toFixed(5) +" m";
							}else{
								$.mobileweb['__ERR_CODE__'] = status;
								$.GMapService('setMapErrorMessage',"OpenTargetScope","Elevation");
							}
						});
						//Richa
						var mapObj = {page_name:pagedef['name'], u_id:childdef['name'],longitude:$.mobileweb["__LONG__"],latitude:$.mobileweb["__LAT__"]};
						$.utility('setSessionData',mapObj,"mapObj");
					});
				}
			},1000);
		},
		
		CloseTargetScope : function(params, targetMap){
			if(document.getElementById("targetimg_"+targetMap.getName())!= null){
				if(	$.mobileweb[targetMap.getName()] != undefined && 	$.mobileweb[targetMap.getName()]['Scope'] == "ON")
				$.mobileweb[targetMap.getName()]['Scope'] = "OFF";
				$('#targetimg_'+targetMap.getName()).remove();
				$('#targetLongitude_'+targetMap.getName()).remove();
				$('#targetLatitude_'+targetMap.getName()).remove();
				$('#targetGPSStatus_'+targetMap.getName()).remove();
				$('#targetXXXm_'+targetMap.getName()).remove();
				$.utility('resetMapGlobalVariable');
				$("#__LAT__").trigger("onchange");
				$("#__LAT__").remove();
				$("#__LONG__").trigger("onchange");
				$("#__LONG__").remove();
				return true;
			}
			else
				return false;
		},
		
		OpenCurrentPosition : function(params, targetMap, action){
			setTimeout(function(){
			var initialMarker = null;
			var Gmap = $.GMapService('getMap');
				// getting the initial current position first..
			if(navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position){
					var initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
					var marker = new google.maps.Marker({
						position: initialLocation,
						draggable:false,
						map: Gmap,
						title:"Current Position"
					});
					
					$.GMapService('setMarkerForCurrentPost', marker); 
					Gmap.setCenter(initialLocation);
					Gmap.setZoom(18);
					Gmap.setMapTypeId(google.maps.MapTypeId.ROADMAP);
						// Moving Marker using WatchProcess...
				/*	Not Required for new specs now..
					if(GMapMethods.data['watchProcess'] == null){
						GMapMethods.data['watchProcess'] = navigator.geolocation.watchPosition(function(position){
						GMapMethods.data['currentPositionMarker'].setPosition(new google.maps.LatLng(newLatitude,newLongitude));
						}, { enableHighAccuracy:true});  
						console.log(GMapMethods.data['watchProcess']);
					}
					*/
					action['OpenCurrentPositionStatus'] = true;
				},
				function(error){
					console.log("Error: " +error);
				});
			}else{
				alert("Navigation Not Supported with your Browser");
				return;
			}
		},500);
		},
		
		CloseCurrentPosition : function(params, targetMap){
			if($.GMapService('getMarkerForCurrentPost') != null){
				$.GMapService('getMarkerForCurrentPost').setMap(null);
				return true;
			}
			else
				return false;
			/* Not Required according to new specs..
			if (GMapMethods.data['watchProcess'] != null) {  
				navigator.geolocation.clearWatch(GMapMethods.data['watchProcess']);  
				GMapMethods.data['watchProcess'] = null;  
			}
			*/
		},
		
		ShowRoute : function(params, targetMap, action, pagedef, ui,actionCallback){
			var fromPlace =  $.utility('tokenizeString', params['fromlocation'], pagedef);// (!params['fromlocation'].indexOf('[')) ? params['fromlocation'] :  $.utility('tokenizeString', params['fromlocation']);
			var toPlace = $.utility('tokenizeString', params['tolocation'], pagedef);//(!params['tolocation'].indexOf('[')) ? params['tolocation'] :  $.utility('tokenizeString', params['tolocation']);
			var Gmap = $.GMapService('getMap');
			//Richa
			if(targetMap != undefined){
				var showRouteObj = {page_name:pagedef['name'], u_id:targetMap.getName(),params:params, targetMap:targetMap,action:action, pagedef:pagedef,ui:ui};
				$.utility('setSessionData',showRouteObj,"showRouteObj");
			}
			//--
			try{
				return $.GMapService('getLatLngByPlace', fromPlace, function(latlng){
					var location = latlng.latXlng; 
					if(location == "Not Found"){//Bug #11852 Fix
						$.GMapService('Event_onMapLoadFail', pagedef, childdef);
						return;
					}
					var fromLatLng = "";
					var toLatLng = "";
					if(!latlng){
						//$.utility('ApplyOnSucessAndOnErrorEvents',pagedef, ui, action['events'], false);
						return false;
					}else{
						fromLatLng = latlng.latXlng;
						
						return $.GMapService('getLatLngByPlace', toPlace, function(latlng){
							var location = latlng.latXlng; 
							if(location == "Not Found"){//Bug #11852 Fix
								$.GMapService('Event_onMapLoadFail', pagedef, childdef);
								return;
							}
							var location = latlng.latXlng; 
							if(location == "Not Found"){//Bug #11852 Fix
								$.GMapService('Event_onMapLoadFail', pagedef, childdef);
								return;
							}
							if(!latlng){
								//$.utility('ApplyOnSucessAndOnErrorEvents',pagedef, ui, action['events'], false);
								return false;
							}else{	// if all places are correct.. then..
								toLatLng = latlng.latXlng;
								var modeTravel = (params['traffic'] == "car") ? google.maps.DirectionsTravelMode.DRIVING : google.maps.DirectionsTravelMode.WALKING;
								var isHighway = (params['highway'] == "true") ? true : false;
								isHighway = (isHighway) ? false : true;

								var parameters = {
										origin: fromLatLng,
										destination: toLatLng,
										//avoidFerries: Boolean,
										//avoidTolls: Boolean,
										avoidHighways : isHighway,
										waypoints: GMapMethods.data['waypoints'],
										optimizeWaypoints: true,
										travelMode: modeTravel,
								};
								
								GMapMethods.data['directionsService'].route(parameters, function(response, status) {
									if (status == google.maps.DirectionsStatus.OK) {
										GMapMethods.data['directionsDisplay'].setMap(Gmap);
										GMapMethods.data['directionsDisplay'].setDirections(response);
										GMapMethods.data['routePoints'] = {origin:fromLatLng,destination:toLatLng};
										action['showRouteStatus'] = true;
										$.mobileweb['__COURSE__'] = google.maps.geometry.spherical.computeHeading(fromLatLng, toLatLng);//Heading
										
										var point = response.routes[0].legs[0];
										if(point != null){											
											$.mobileweb['__ROUTETIME__'] = point.duration.text;
				 							$("#__ROUTETIME__").val($.mobileweb['__ROUTETIME__']);
				 							
				 							$.mobileweb['__ROUTEDISTANCE__'] = point.distance.text;
				 							$("#__ROUTEDISTANCE__").val($.mobileweb['__ROUTEDISTANCE__']);

											//var rtid = $("[name='routetime']").attr('id');
											//$("#"+rtid).text($.mobileweb['__ROUTETIME__']);
											//var rdid = $("[name='routedistance']").attr('id');
											//$("#"+rdid).text($.mobileweb['__ROUTEDISTANCE__']);
										}
										
										if ($("body").find("#__ROUTETIME__").length == 0 ) {
											$('body').append("<input id='__ROUTETIME__' type='text' hidden='true'>"+ $.mobileweb["__ROUTETIME__"] +"</input>");
										}
										if ($("body").find("#__ROUTEDISTANCE__").length == 0 ) {
											$('body').append("<input id='__ROUTEDISTANCE__' type='text' hidden='true'>"+ $.mobileweb["__ROUTEDISTANCE__"] +"</input>");
										}
										if ($("body").find("#__COURSE__").length == 0 ) {
											$('body').append("<input id='__COURSE__' type='text' hidden='true'>"+ $.mobileweb["__COURSE__"] +"</input>");
										}
										
										return true;
										
									}else{
										$.mobileweb['__ERR_CODE__'] = status;
										$.GMapService('setMapErrorMessage',status,"ShowRoute","Direction");
										actionCallback(pagedef, ui, action, undefined,false);
									}
								});

							}
							
						});
					}
				}, action);
			}catch(e){
				actionCallback(pagedef, ui, action, undefined,false);
				return false;//$.utility('ApplyOnSucessAndOnErrorEvents',pagedef, ui, action['events'], false);
			}
			
		},
		
		ClearRoute : function(params, targetMap){
			GMapMethods.data['directionsDisplay'].setMap(null);
		},
		
		ShowRouteList : function(params, targetMap){
			var Gmap = $.GMapService('getMap');
			var setDivID = "routeListScreen_"+targetMap.getName();
			if(GMapMethods.data['routePoints'] !== null){
				$(document.createElement('div')).css("position", "absolute").css("background", "rgba(255,255,255,1.0)").css("opacity", "1.0").css("height", "96%").css("width", "96%").css("float", "center").css("top", "2%").css("left", "2%").css("overflow", "auto").attr("id", setDivID).appendTo($("[name='"+targetMap.getName()+"']"));
				var parameter = {
					origin:GMapMethods.data['routePoints'].origin,
					destination:GMapMethods.data['routePoints'].destination,
					travelMode: google.maps.TravelMode.DRIVING
				};
				  
				GMapMethods.data['directionsService'].route(parameter, function(response, status) {
					if (status == google.maps.DirectionsStatus.OK) {
						GMapMethods.data['directionsDisplay'].setPanel($("#"+setDivID).get(0));
						GMapMethods.data['directionsDisplay'].setDirections(response);
						$("#"+setDivID).click(function(e){
							$("#"+setDivID).remove();
						});
					}else{
						$.mobileweb['__ERR_CODE__'] = status;
						$.GMapService('setMapErrorMessage',status,"ShowRouteList","Direction");
					}
				});
			}else{
				return false;
			}
		},
		
		GoToStartCheckPoint : function(params, targetMap){
			var Gmap = $.GMapService('getMap');
			GMapMethods.data['checkPoint'] = 0;

			if(GMapMethods.data['routePoints'] !== null){
				var parameter = {
					origin:GMapMethods.data['routePoints'].origin,
					destination:GMapMethods.data['routePoints'].destination,
					travelMode: google.maps.TravelMode.DRIVING
				};
				
				GMapMethods.data['directionsService'].route(parameter, function(response, status) {
					if (status == google.maps.DirectionsStatus.OK) {
						GMapMethods.data['infowindow'].setContent(response.routes[0].legs[0].steps[GMapMethods.data['checkPoint']].instructions);
						GMapMethods.data['infowindow'].setPosition(response.routes[0].legs[0].steps[GMapMethods.data['checkPoint']].start_location);
						GMapMethods.data['infowindow'].open(Gmap);
					}else{
						$.mobileweb['__ERR_CODE__'] = status;
						$.GMapService('setMapErrorMessage',status,"StartCheckPoint","Direction");
					}
				});
			}else{
				return false;
			}
		},
		
		GoToNextCheckPoint : function(params, targetMap){
			var Gmap = $.GMapService('getMap');
			if(GMapMethods.data['routePoints'] != null){
				var parameter = {
					origin:GMapMethods.data['routePoints'].origin,
					destination:GMapMethods.data['routePoints'].destination,
					travelMode: google.maps.TravelMode.DRIVING
				};
				
				GMapMethods.data['directionsService'].route(parameter, function(response, status) {
					if (status == google.maps.DirectionsStatus.OK) {
						GMapMethods.data['checkPoint'] = GMapMethods.data['checkPoint'] + 1;
						GMapMethods.data['infowindow'].setContent(response.routes[0].legs[0].steps[GMapMethods.data['checkPoint']].instructions);
						GMapMethods.data['infowindow'].setPosition(response.routes[0].legs[0].steps[GMapMethods.data['checkPoint']].start_location);
						GMapMethods.data['infowindow'].open(Gmap);
					}else{
						$.mobileweb['__ERR_CODE__'] = status;
						$.GMapService('setMapErrorMessage',status,"NextCheckPoint","Direction");
					}
				});
			}else{
				return false;
			}
		},
		
		GoToPrevCheckPoint : function(params, targetMap){
			var Gmap = $.GMapService('getMap');
			if(GMapMethods.data['routePoints'] != null){
				var parameter = {
					origin:GMapMethods.data['routePoints'].origin,
					destination:GMapMethods.data['routePoints'].destination,
					travelMode: google.maps.TravelMode.DRIVING
				};
				
				GMapMethods.data['directionsService'].route(parameter, function(response, status) {
					if (status == google.maps.DirectionsStatus.OK) {
						GMapMethods.data['checkPoint'] = GMapMethods.data['checkPoint'] - 1;				
						GMapMethods.data['infowindow'].setContent(response.routes[0].legs[0].steps[GMapMethods.data['checkPoint']].instructions);
						GMapMethods.data['infowindow'].setPosition(response.routes[0].legs[0].steps[GMapMethods.data['checkPoint']].start_location);
						GMapMethods.data['infowindow'].open(Gmap);
					}else{
						$.mobileweb['__ERR_CODE__'] = status;
						$.GMapService('setMapErrorMessage',status,"PrevCheckPoint","Direction");
					}
				});
			}else{
				return false;
			}
		},
		
		AddMarker : function(pagedef,ui,action, targetMap){
			var count = 0;
			var params = action['params'];
			var Gmap = $.GMapService('getMap');
			var eventinitpagedef = pagedef['eventinitpagedef'];
			var title =(eventinitpagedef != undefined)? $.utility("findUI", eventinitpagedef,ui, action['params']['title'].toString()): $.utility("tokenizeString", action['params']['title'].toString(), pagedef,action);
			var subtitle =(eventinitpagedef != undefined)? $.utility("findUI", eventinitpagedef,ui, action['params']['subtitle'].toString()): $.utility("tokenizeString", action['params']['subtitle'].toString(), pagedef,action);
			var latitude =parseFloat((eventinitpagedef != undefined)? $.utility("findUI", eventinitpagedef,ui, action['params']['latitude'].toString()): $.utility("tokenizeString", action['params']['latitude'].toString(), pagedef,action));
			var longitude =parseFloat((eventinitpagedef != undefined)? $.utility("findUI", eventinitpagedef,ui, action['params']['longitude'].toString()): $.utility("tokenizeString", action['params']['longitude'].toString(), pagedef,action));
			var markerId =(eventinitpagedef != undefined)? $.utility("findUI", eventinitpagedef,ui, action['params']['markerid'].toString()): $.utility("tokenizeString", action['params']['markerid'].toString(), pagedef,action);
			
			var MarkerObj = {page_name:pagedef['name'], u_id:ui,longitude:longitude,latitude:latitude};
			$.utility('setSessionData',MarkerObj,"MarkerObj");//Bug 9326 Fix
			
			for(var marker in GMapMethods.data['markers']){
				if(GMapMethods.data['markers'][marker]['markerID'] != undefined && GMapMethods.data['markers'][marker]['markerID'] === markerId){
					var markerObject = GMapMethods.data['markers'][marker];
					var targetMarker = markerObject['markerObject'];
					targetMarker.setMap(null);
					GMapMethods.data['markers'].splice(marker,1);
					count++;
					break;
				}
			}
			GMapMethods.data['markerCount'] = count;
			
			if(!(action['spotdetails'] != undefined && action['spotdetails'] == true)){
				new $.actions(pagedef, null, [{method:"Select", category:"DBAction", addMarker : true, params:{tablename:'spotdetail', where:'markerid=\''+ markerId +'\'', order:'', columns:""}}]).execute();
				var myVar=setInterval(function() {
					if(pagedef['markerExistFlag']!= undefined){
						clearInterval(myVar);
						if(pagedef['markerExistFlag']){
							new $.actions(pagedef, null, [{method:"Update", category:"DBAction", params:{tablename:'spotdetail', where:'markerid = "' +markerId + '"', record:{'title':title,'subtitle':subtitle,'leftview':action['params']['leftview'],'rightview':action['params']['rightview'],'callout':action['params']['showcallout'],'latitude':latitude,'longitude':longitude,'markerfile':"",'markertype':""}}}].slice()).execute();
						}else{
							new $.actions(pagedef, null, [{method:"Insert", addMarker : true,category:"DBAction", params:{tablename:'spotdetail', record:{'markerid':markerId,'title':title,'subtitle':subtitle,'leftview':action['params']['leftview'],'rightview':action['params']['rightview'],'callout':action['params']['showcallout'],'latitude':latitude,'longitude':longitude,'markerfile':"",'markertype':""}}}].slice()).execute();
						}
							
					}
				},100);
			}
			
			var marker = new google.maps.Marker({
				map: Gmap,
				position: new google.maps.LatLng(latitude,longitude),
				title: title,
				subtitle:subtitle,
				leftview :params['leftview'],
				rightview :params['rightview'],
				//zoom: 8
			});
			if (params['leftview'] == "None" || params['leftview'] == "" ){
				srcLeft="";
			}else if (params['leftview'] == "DetailDiscloser" ){
				  srcLeft= $.utility('getSystemImage','detail.png','GoogleMap');
			}else if (params['leftview'] == "InfoLight"  ){
				 srcLeft= $.utility('getSystemImage','infolight.png','GoogleMap');
			}else if (params['leftview'] == "InfoDark"  ){
				 srcLeft= $.utility('getSystemImage','infodark-44px.png','GoogleMap');
			}else if (params['leftview'] == "ContactAdd" ){
				 srcLeft= $.utility('getSystemImage','add.png','GoogleMap');
			}else if (params['leftview'] == "Custom"){
				srcLeft= $.utility('getSystemImage','custom-44px.png','GoogleMap');
			}
			
			var srcRight="";
			if (params['rightview'] == "None" || params['rightview'] == "" ){
				srcRight="";
			} else	if (params['rightview'] == "DetailDiscloser" ){
				 srcRight= $.utility('getSystemImage','detail.png','GoogleMap');
			}else if (params['rightview'] == "InfoLight" ){
				 srcRight= $.utility('getSystemImage','infolight.png','GoogleMap');
				 	}else if ( params['rightview'] == "InfoDark" ){
				 srcRight= $.utility('getSystemImage','infodark-44px.png','GoogleMap');
			}else if ( params['rightview'] == "ContactAdd" ){
				 srcRight= $.utility('getSystemImage','add.png','GoogleMap');
			}else if (params['rightview'] == "Custom"  ){
				 srcRight= $.utility('getSystemImage','custom-44px.png','GoogleMap');
			}
			
			var table = "<table width = '50%' height ='100%'  z-index ='1' style='overflow:hidden;'><tr height='20px'><td></td><td></td><td></td></tr> <tr>";

			var contentString = "";
			if (params['leftview'] == "None" || params['leftview'] == "" || params['leftview'] == undefined || params['leftview'] == null ){
				contentString = table + "<td></td >";
				
			}else{
				contentString = table + " <td><img id = 'leftview' height='22px' width='22px' src ='"+srcLeft+"' /></td > ";
			}
			
			contentString = contentString + " <td >"+ title +"</td>";
			
			if (params['rightview'] == "None" || params['rightview'] == "" || params['rightview'] == undefined || params['rightview'] == null ){
				contentString = contentString + " <td ></td>";
			}else{
				contentString = contentString + " <td><img  id = 'rightview' height='22px' width='22px' src ='"+srcRight+"' /></td>";
			}
			contentString = contentString + "</tr><tr><td></td><td>"+ subtitle+"</td></tr>"+   "</table>";
			var infowindow = new google.maps.InfoWindow({
			      content: "<div z-index='100' class= gm-style-iw style='overflow :auto !important ; white-space :nowrap; line-height:1.35 '/>" + contentString,
			      });
			
			$.GMapService('storeMarkers', $.mobileweb.getCurrentPage().getName(), targetMap.getName(), markerId, marker,action['spotdetails']);
			// This code is commented for toyota application. Everytime map is loading on timer action. To avoid reloading, this code is commented -- Sachit
			/*if(action['spotdetails'] == undefined){
				Gmap.setCenter(new google.maps.LatLng(latitude,longitude));
			}*/

			google.maps.event.addListener(marker, 'click', function(){ 
				var isCallout = true;
				var callout = params['showcallout'];
				if (callout == "TRUE" || callout == "true" || callout == "True"){
					isCallout = true;
				} else if (callout == "FALSE" || callout == "false" || callout == "False"){
					isCallout = false;
				} else {
					isCallout = callout;
				}
				params['showcallout'] = isCallout;
			    
				if(params['showcallout']){
					infowindow.close();
					for(var i in pagedef['data']['contents']){
						if(pagedef['data']['contents'][i] != undefined){
							jQuery.extend(pagedef['data']['contents'][i],{markerid : markerId});
							jQuery.extend(pagedef['data']['contents'][i],{title : title});
							jQuery.extend(pagedef['data']['contents'][i],{subtitle : subtitle});
						}else{
							pagedef['data']['contents'][i] = {markerid : markerId,title : title,subtitle : subtitle};
						
						}
					}
					infowindow.open(Gmap,marker);
				}
				google.maps.event.addListener(infowindow, 'domready', function(){
					$('.gm-style-iw').css({'width':$('.gm-style-iw').width() + ($('.gm-style-iw').width() * 0.25),'overflow':'visible'});
					$("#leftview").bind("click",function(){
						if(action['spotdetails'] != undefined && action['spotdetails']){
							$.each(action['data'], function(key,value){
								if(pagedef['data']['contents'].length == 0){
								    pagedef['data']['contents'].push({key:value});
								}else
								    pagedef['data']['contents'][0][key] = value;
							});
							var temp = action['events']['LeftButtonClicked'][0];
							var pagename = temp.substring(temp.indexOf("(") + 1, temp.indexOf(")"));
							var tempAction = temp.substring(0, temp.indexOf("("));
							$.utility('triggerInjectedAction', tempAction, pagename, pagedef, ui);
						}else{
							if(action['events'] != undefined)
								new $.actions(pagedef, ui, action['events']['LeftButtonClicked'].slice()).execute();
						}
					});
					$("#rightview").bind("click",function(){
						if(action['spotdetails'] != undefined && action['spotdetails']){
							$.each(action['data'], function(key,value){
								if(pagedef['data']['contents'].length == 0){
								    pagedef['data']['contents'].push({key:value});
								}else
								    pagedef['data']['contents'][0][key] = value;
							});
							var temp = action['events']['RightButtonClicked'][0];
							var pagename = temp.substring(temp.indexOf("(") + 1, temp.indexOf(")"));
							var tempAction = temp.substring(0, temp.indexOf("("));
							$.utility('triggerInjectedAction', tempAction, pagename, pagedef, ui);
						}else{
							if(action['events'] != undefined)
								new $.actions(pagedef, ui, action['events']['RightButtonClicked'].slice()).execute();
						}					
					});
				}); 

			});
			action['markerPlotingStatus'] = true;
		},
		
		AddCustomMarker : function(pagedef,ui,action, targetMap){
			var count = 0;
			var params = action['params'];
			var Gmap = $.GMapService('getMap');
			var latitude =parseFloat($.utility("tokenizeString", action['params']['latitude'], pagedef));
			var longitude =parseFloat($.utility("tokenizeString", action['params']['longitude'], pagedef));
			var title =$.utility("tokenizeString", action['params']['title'].toString(), pagedef);
			var subtitle =$.utility("tokenizeString", action['params']['subtitle'].toString(), pagedef);
			var markerId =$.utility("tokenizeString", action['params']['markerid'].toString(), pagedef);
			
			var MarkerObj = {page_name:pagedef['name'], u_id:ui,longitude:longitude,latitude:latitude};//Bug 9326 fix
 			$.utility('setSessionData',MarkerObj,"MarkerObj");
			  
			for(var marker in GMapMethods.data['markers']){
				if(GMapMethods.data['markers'][marker]['markerID'] != undefined && GMapMethods.data['markers'][marker]['markerID'] === markerId){
					var markerObject = GMapMethods.data['markers'][marker];
					var targetMarker = markerObject['markerObject'];
					targetMarker.setMap(null);
					GMapMethods.data['markers'].splice(marker,1);
					count++;
					break;
				}
			}
			
			GMapMethods.data['markerCount'] = count;
			new $.actions(pagedef, null, [{method:"Select", category:"DBAction", addMarker : true, params:{tablename:'spotdetail', where:'markerid=\''+ markerId +'\'', order:'', columns:""}}]).execute();
			var myVar=setInterval(function() {
				if(pagedef['markerExistFlag']!= undefined){
					clearInterval(myVar);
					if(pagedef['markerExistFlag']){
						new $.actions(pagedef, null, [{method:"Update", category:"DBAction", params:{tablename:'spotdetail', where:'markerid = "' +action["params"]["markerid"] + '"', record:{'title':'title','subtitle':'subtitle','leftviewimage':action['params']['leftviewimage'],'rightviewimage':action['params']['rightviewimage'],'callout':action['params']['showcallout'],'latitude':latitude,'longitude':longitude, 'markerfile': action['params']['markerimage'], anchorx:action['params']['anchorx'], anchory:action['params']['anchory'], markertype:action['params']['markertype'], visible:action['params']['visible']}}}].slice()).execute();
					}else{
						new $.actions(pagedef, null, [{method:"Insert", addMarker : true,category:"DBAction", params:{tablename:'spotdetail', record:{'markerid': markerId,'title':action['params']['title'],'subtitle':action['params']['subtitle'],'leftviewimage':action['params']['leftviewimage'],'rightviewimage':action['params']['rightviewimage'],'callout':action['params']['showcallout'],'latitude':action['params']['latitude'],'longitude':action['params']['longitude'], 'markerfile': action['params']['markerimage'], anchorx:action['params']['anchorx'], anchory:action['params']['anchory'], markertype:action['params']['markertype'], visible:action['params']['visible']}}}].slice()).execute();
					}
						
				}
			},100);
			
			var anchorX = isNaN(Number(action['params']['anchorx'])) ? 50 : Number(action['params']['anchorx']);
 			var anchorY = isNaN(Number(action['params']['anchory'])) ? 50 : Number(action['params']['anchory']);
			var marker = new google.maps.Marker({
				map: Gmap,
				position: new google.maps.LatLng(latitude,longitude),
				title: title,
				subtitle:subtitle,
				icon: {
					url: $.utility("getImage", action['params']['markerimage']),
					scaledSize: new google.maps.Size(30, 30),
					anchor: new google.maps.Point(anchorX, anchorY),
				},
				leftview :params['leftview'],
				rightview :params['rightview'],
				//zoom: 8,
				animation: google.maps.Animation.DROP,
			});
			srcLeft=$.utility("getImage", action['params']['leftviewimage']);
			srcRight=$.utility("getImage", action['params']['rightviewimage']);
			/*if (params['leftview'] == "None" || params['leftview'] == "" ){
				srcLeft="";
			}else if (params['leftview'] == "DetailDiscloser" ){
				  srcLeft= $.utility('getSystemImage','detail.png','GoogleMap');
			}else if (params['leftview'] == "InfoLight"  ){
				 srcLeft= $.utility('getSystemImage','infolight.png','GoogleMap');
			}else if (params['leftview'] == "InfoDark"  ){
				 srcLeft= $.utility('getSystemImage','infodark-44px.png','GoogleMap');
			}else if (params['leftview'] == "ContactAdd" ){
				 srcLeft= $.utility('getSystemImage','add.png','GoogleMap');
			}else if (params['leftview'] == "Custom"){
				srcLeft= $.utility('getSystemImage','custom-44px.png','GoogleMap');
			}
			
			var srcRight="";
			if (params['rightview'] == "None" || params['rightview'] == "" ){
				srcRight="";
			} else	if (params['rightview'] == "DetailDiscloser" ){
				 srcRight= $.utility('getSystemImage','detail.png','GoogleMap');
			}else if (params['rightview'] == "InfoLight" ){
				 srcRight= $.utility('getSystemImage','infolight.png','GoogleMap');
				 	}else if ( params['rightview'] == "InfoDark" ){
				 srcRight= $.utility('getSystemImage','infodark-44px.png','GoogleMap');
			}else if ( params['rightview'] == "ContactAdd" ){
				 srcRight= $.utility('getSystemImage','add.png','GoogleMap');
			}else if (params['rightview'] == "Custom"  ){
				 srcRight= $.utility('getSystemImage','custom-44px.png','GoogleMap');
			}*/
			
			var table = "<table width = '50%' height ='100%'  z-index ='1' style='overflow:hidden;'><tr height='20px'><td></td><td></td><td></td></tr> <tr>";

			var contentString = "";
			/*if (params['leftviewimage'] == "None" || params['leftview'] == "" || params['leftview'] == undefined || params['leftview'] == null ){
				contentString = table + "<td></td >";
				
			}else{*/
				contentString = table + " <td><img id = 'leftview' height='22px' width='22px' src ='"+srcLeft+"' /></td > ";
		//	}
			
			contentString = contentString + " <td >"+ title +"</td>";
			
			/*if (params['rightview'] == "None" || params['rightview'] == "" || params['rightview'] == undefined || params['rightview'] == null ){
				contentString = contentString + " <td ></td>";
			}else{*/
				contentString = contentString + " <td><img  id = 'rightview' height='22px' width='22px' src ='"+srcRight+"' /></td>";
			//}
			contentString = contentString + "</tr><tr><td></td><td>"+ subtitle+"</td></tr>"+   "</table>";
			var infowindow = new google.maps.InfoWindow({
			      content: "<div z-index='100' class= gm-style-iw style='overflow :auto !important ; white-space :nowrap; line-height:1.35 '/>" + contentString,
			      });
			
			$.GMapService('storeMarkers', $.mobileweb.getCurrentPage().getName(), targetMap.getName(), markerId, marker,action['spotdetails']);
			// This code is commented for toyota application. Everytime map is loading on timer action. To avoid reloading, this code is commented -- Sachit
			/*if(action['spotdetails'] == undefined){
				Gmap.setCenter(new google.maps.LatLng(latitude,longitude));
			}*/

			google.maps.event.addListener(marker, 'click', function(){ 
				if(params['showcallout']){
					infowindow.close();
					for(var i in pagedef['data']['contents']){
						if(pagedef['data']['contents'][i] != undefined){
							jQuery.extend(pagedef['data']['contents'][i],{markerid : markerId});
							jQuery.extend(pagedef['data']['contents'][i],{title : title});
							jQuery.extend(pagedef['data']['contents'][i],{subtitle : subtitle});
						}else{
							pagedef['data']['contents'][i] = {markerid : markerId,title : title,subtitle : subtitle};
						
						}
					}
					infowindow.open(Gmap,marker);
				}
				google.maps.event.addListener(infowindow, 'domready', function(){
				//	$('.gm-style-iw').css({'width':$('.gm-style-iw').width() + ($('.gm-style-iw').width() * 0.25),'overflow':'visible'});
					$("#leftview").bind("click",function(){
						if(action['spotdetails'] != undefined && action['spotdetails']){
							$.each(action['data'], function(key,value){
								if(pagedef['data']['contents'].length == 0){
								    pagedef['data']['contents'].push({key:value});
								}else
								    pagedef['data']['contents'][0][key] = value;
							});
							var temp = action['events']['LeftButtonClicked'][0];
							var pagename = temp.substring(temp.indexOf("(") + 1, temp.indexOf(")"));
							var tempAction = temp.substring(0, temp.indexOf("("));
							$.utility('triggerInjectedAction', tempAction, pagename, pagedef, ui);
						}else{
							if(action['events'] != undefined)
								new $.actions(pagedef, ui, action['events']['LeftButtonClicked'].slice()).execute();
						}
					});
					$("#rightview").bind("click",function(){
						if(action['spotdetails'] != undefined && action['spotdetails']){
							$.each(action['data'], function(key,value){
								if(pagedef['data']['contents'].length == 0){
								    pagedef['data']['contents'].push({key:value});
								}else
								    pagedef['data']['contents'][0][key] = value;
							});
							var temp = action['events']['RightButtonClicked'][0];
							var pagename = temp.substring(temp.indexOf("(") + 1, temp.indexOf(")"));
							var tempAction = temp.substring(0, temp.indexOf("("));
							$.utility('triggerInjectedAction', tempAction, pagename, pagedef, ui);
						}else{
							if(action['events'] != undefined)
								new $.actions(pagedef, ui, action['events']['RightButtonClicked'].slice()).execute();
						}					
					});
				}); 

			});
			action['markerPlotingStatus'] = true;
		
		},
		
		AddPinMarker : function(pagedef,ui,action, targetMap){
			$.GMapService('AddMarker', pagedef,ui,action, targetMap);
			/*setTimeout(function(){
				
			},0);*/
		},
		
		RemoveMarker : function(pagedef,ui,action, targetMap){
			var params = action['params'];
			var flag = false;
			for(var marker in GMapMethods.data['markers']){
				var markerObject = GMapMethods.data['markers'][marker];
				if(params['markerid'] === markerObject['markerID']){
					var targetMarker = markerObject['markerObject'];
					targetMarker.setMap(null);
					GMapMethods.data['markers'].splice(marker,1);
					flag = true;
					break;
				}
			}
			
			if(flag){
				if(!(action['spotdetails'] != undefined && action['spotdetails'] == true)){
					new $.actions(pagedef, null, [{method:"Select", category:"DBAction", addMarker : true, params:{tablename:'spotdetail', where:'markerid=\''+ params['markerid'] +'\'', order:'', columns:""}}]).execute();
					var myVar=setInterval(function() {
						if(pagedef['markerExistFlag']!= undefined){
							clearInterval(myVar);
							new $.actions(pagedef, null, [{method:"Delete", category:"DBAction", params:{tablename:'spotdetail', where:'markerid = "' + params['markerid'] + '"'}}].slice()).execute();
						}
					},100);
				}
			}
			return flag;
		},
		
		AddGeoFence : function(pagedef,ui,action,targetMap,center){
			//var pointCircle;
			var circles = [];
			if(pagedef['geofence'] == "start"){
				var _center = {lat:center['latitude'], lng: center['longitude']};
				var Gmap = $.GMapService('getMap');
				var _radius = parseInt(action['params']['radius']);
				
				if(action['params']['radius'] === "Best")
					_radius = 100;
				pointCircle = new google.maps.Circle({
					strokeColor: '#FF0000',
					strokeOpacity: 0.8,
					strokeWeight: 2,
					fillColor: '#FF0000',
					fillOpacity: 0.35,
					map: Gmap,
					center: _center,
					radius: _radius
				});
				pagedef['circles'].push(pointCircle);
			}
			else if(pagedef['geofence'] == "stop"){
				for(var i in pagedef['circles']) {
					if(!isNaN(parseInt(i)))
						pagedef['circles'][i].setMap(null);
				}
				pagedef['circles'] = [];
//				pointCircle.setMap(null);
			}
		},
		
		PantoGeofenceEnter : function(lat,lng,targetMap){
			var Gmap = $.GMapService('getMap');
			Gmap.panTo({
		          lat: lat,
		          lng: lng
		        });
		},
		
		SetScale : function(params, scaleValue, targetMap){
			var Gmap = $.GMapService('getMap');
			scaleValue = parseInt(scaleValue);
			Gmap.setZoom(scaleValue);
			
		},
		
		AddWayPoint : function(pagedef,ui,action, targetMap){
			var params = action['params'];
			if(params['location'].indexOf("(") != -1 && params['location'].indexOf(")") != -1){
				params['location'] = params['location'].replace("(","").replace(")","");
				var _lat = parseFloat(params['location'].split(",")[0]);
				var _long = parseFloat(params['location'].split(",")[1]);
//				The latitude must be a number between -90 and 90 and the longitude between -180 and 180.Need to write error case for invalid values.
				GMapMethods.data['waypoints'].push({
					location: new google.maps.LatLng(
							_lat,_long
					),
					stopover: true
				});
				action['addWayPointStatus'] =  true;
			}else{
				 $.GMapService('getLatLngByPlace', params['location'], function(latlng){
					 var location = latlng.latXlng; 
						if(location == "Not Found"){//Bug #11852 Fix
							action['addWayPointStatus'] =  false;
							$.GMapService('Event_onMapLoadFail', pagedef, childdef);
							return;
						}
					 if(latlng){
						 var _lat = latlng.latitude;
						 var _long = latlng.longitude;
							 
						 GMapMethods.data['waypoints'].push({
							location: new google.maps.LatLng(
									_lat,_long
							),
							stopover: true
						 });
						 action['addWayPointStatus'] =  true;
					 }else{
						 action['addWayPointStatus'] =  false;
					 }
				 });
			}
		},
	};
	
		
	$.GMapService = function( method ) {
	    if ( GMapMethods[ method ] ){
			if(GMapMethods.data==undefined){
				GMapMethods.init();
			};
	        return GMapMethods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    }else if ( typeof method === 'object' || ! method )
	        return GMapMethods.init.apply( this, arguments );
	    else
	        $.error( 'Method ' +  method + ' does not exist on jQuery.GMapService' );
	};

})(jQuery);

