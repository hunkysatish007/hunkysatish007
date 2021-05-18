/**
 * Author: Mato Shibiru Date: Sept 4, 2012 jQuery Plugin that handles some
 * utility related methods
 */

// (function($){
// function Utility(options){
// var utility = {};
// utility.data = options;
//		
// utility.show = function(){

// console.log(utility.data);
// };
//		
// return utility;
// };
//	
// $.fn.util = function(options) {
// return new Utility(options);
// };
//	
// })(jQuery);
(function($) {
	var pageFrame={pageheight:'',pagewidth:'',pagetop:'',pageleft:''};
	var registerActions = new Array();
	var uiDefaultValue = new Array();	// only name of the ui, viewtype and value...
	var pageWhereCond = new Array();		// for List pages.. saving where condition ...
	var multipleAlertArray = new Array();
	var splitCSVArray = new Array();
	var combinedCSV = new Array();
	var tabStacks = new Array();
	var dbRecords = new Array();
	var timers = new Array();
	var latestLocaldbSchema = new Array();
	var comActionStatus = "";
	var actionRunningStatus = false;
	var resettingDataStatus = false;
	var remoteDBRecords = new Array();
	var comboBoxDataLoadingStatus = {};
	var parentPageDataArray = new Array();
	var parentPagedefDataArray = new Array();
	var reverseTransition = false;
	var currentPagedefData = {};
	var pageLoadingFlag = false;
	var analyserNode;
	var soundRecordAnalyser = false;
	var rafID = null;
	var silentCounter = 0;
	var recordingAudioContext = null; //new AudioContext();
	var recorderWorkerContext = null;
	var recordingUIID = null;
	var analyserAudioContext = null;	
	var sessionData;
	var pnToken;
	var registerpnclient =false;
	
	var tabPageArray = new Array();
	var tabPageDataArray = new Array();
	var indexedDatabase;
	var indexedDBFlag = false;
	var indexedDBResult;
	var delayedChangeCondition = {targetPage:"",flag:false};
	var resetEvent = false;
	var serverport = '8080';
	var remoteNumResponse = true;
	var pageRecordsTotal;
	var remoteNumStatus = "";
	var bulkUploadActionStatus = "";
	var fileObject = [];
	var pnMsgReceived = false;
	var pnUnregister = false;
	var comActionStatusTileList = false;
	var transitToParent = false;
	// ##THIS METHOD RUNS FIRST
	function setup($) {
		// ##IE Logging
		$.utility('clearSessionData');//Added by Richa
		if (!('console' in window)) {
			window.console = {};
			window.console.log = function(str) {
				return str;
			};
		};

		var supportsOrientationChange = "onorientationchange" in window, orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

		if (supportsOrientationChange) {
			$(window).bind('orientationchange',function() {
				$.mobileweb.setDeviceScreen();
				$.mobileweb.device['orientation'] = (document.documentElement.clientWidth > document.documentElement.clientHeight) ? "landscape-right" : "portrait-up";
				//$.mobileweb.getCurrentPage().refreshDisplay();
				
			});

		} else {
			$(window).bind(
					'hashchange',
					function(e, data) {
						if (location.hash.search("orientation") == -1)
							return;

						var orientation = $.utility('getURLParameterValue','orientation');
						if ($.mobileweb.device['orientation'] != orientation) {
							$.mobileweb.setDeviceScreen();
							$.mobileweb.device['orientation'] = orientation;
							$.mobileweb.getCurrentPage().refreshDisplay();
						}

					});
		}

		$.utility('showlogs');
		$.utility('log', "[INIT] Initializing the mobileweb...");
	};

	var utilmethods = {

		init : function(options) {
			if (utilmethods.data == undefined) {
				utilmethods.data = {
					showlogs : false,
					showLoading : false,
					initData : true,
					initServer : true,
					initImg : true,
					isQuerying : false,
					initChild : false,
					bootingForFirstTime : false,
					appBootingFirstTime : true
				};
				$.extend(utilmethods.data, options);
			} else
				$.error('[CRIT] Cannot make multiple instances of jQuery.utility');
			return this;
		},
		
		verifyFullDate : function(date){
			if(date.indexOf("-") != -1){
				var dateEntered = date.split('-');
				if(dateEntered.length == 3 && (dateEntered[2].length == 2 || dateEntered[2].length == 3)){
					var d = new Date(dateEntered[0],dateEntered[1] - 1,dateEntered[2]);
					if (!(d.getFullYear() == dateEntered[0] && d.getMonth() == dateEntered[1] -1 && d.getDate() == dateEntered[2])) {
						$.errorhandler('alertBox','Input date ' + date +' is not valid.');
						return "invalid date";
					}
				}
			}else if(date.indexOf("/") != -1){
				var dateEntered = date.split('/');
				if(dateEntered.length == 3 && (dateEntered[2].length == 2 || dateEntered[2].length == 3)){
					var d = new Date(dateEntered[0],dateEntered[1] - 1,dateEntered[2]);
					if (!(d.getFullYear() == dateEntered[0] && d.getMonth() == dateEntered[1] -1 && d.getDate() == dateEntered[2])) {
						$.errorhandler('alertBox','Input date ' + date +' is not valid.');
						return "invalid date";
					}
				}
			}
		},
		
		//appBootingFirstTime
		
		setBootingForFirstTime : function(flag){
			utilmethods.data.bootingForFirstTime = flag;
		},
		isBootingForFirstTime : function(){
			return utilmethods.data.bootingForFirstTime;
		},
		
		setAppBootingForFirstTime : function(flag){
			utilmethods.data.appBootingFirstTime = flag;
		},
		isAppBootingForFirstTime : function(){
			return utilmethods.data.appBootingFirstTime;
		},
		
		setServerPort : function(port){
			serverport = port;
		},
		getServerPort : function(){
			return serverport;
		},
		
		setLatestLocaldbSchema : function(schema){
			latestLocaldbSchema.push(schema);
		},
		getLatestLocaldbSchema : function(schema){
			return latestLocaldbSchema;
		},
		
		hidelogs : function() {
			utilmethods.data.showlogs = false;
		},
		showlogs : function(content) {
			utilmethods.data.showlogs = true;
			$.utility('log','[WARN] Logging turned ON. Turn this OFF on production');
		},
		
		log : function(message) {
			if($.mobileweb != undefined){
				if($.mobileweb['applicationState'] != "release"){	
					if (utilmethods.data.showlogs){
						console.log(message);
					}
				}
			}
		},
		
		intializeTabStackLengthAndTabs : function(){

			var totalTabs = $.mobileweb['tabs'].length;
			if($.mobileweb['tabs'].length == 5){
				if($.mobileweb['tabs'][4]['tabs'] !== undefined){
					totalTabs--;
					$.each($.mobileweb['tabs'][4]['tabs'],function(i,tab){
						totalTabs++;
					});
				}
			}
			tabStacks.length = totalTabs;
			$.each($.mobileweb['tabs'],function(i,tab){
				if(i >= 4){
					if($.mobileweb['tabs'][4]['tabs'] !== undefined){
					
						$.each($.mobileweb['tabs'][4]['tabs'],function(j,childTab){
							var test=[];
							test[0] = childTab['page'];
							//$.utility('insertTabInformation', i, childTab['page']);
							tabStacks[i+j] =  test;
						});
					}else {
						var test=[];
						test[0] = $.mobileweb['tabs'][4]['page'];
						//$.utility('insertTabInformation', i, childTab['page']);
						tabStacks[i] =  test;
					
					}
				}else{
					var test = [];
					test[0] = tab['page'];
					tabStacks[i] =  test;
					//$.utility('insertTabInformation', i, tab['page']);
				}
			});
			
		},
		
		insertTabInformation : function(parentPageName, transferPageName){
			
			$.each(tabStacks, function(i, tabPages){
				for(var j in tabPages){
					if(tabPages[j] == parentPageName){
						var test = [];
						test = tabStacks[i];
						test[test.length] = transferPageName;
						tabStacks[i] = test;
						break;
					}
				}
			
			});
		
		},
		
		updateTabStacks : function(tabStackIndex, tabStackGroup){
			tabStacks[tabStackIndex] = tabStackGroup;
			
		},
		getTabStack	: function(){
			return tabStacks;
		
		},
		
		getDeviceOrientation : function(param) {
			switch (param) {
			case 180:
				return 'portrait-down';
				break;
			case -90:
				return 'landscape-right';
				break;
			case 90:
				return 'landscape-left';
				break;
			default:
				return 'portrait-up';
			}
		},

		getObject : function(object, key, value) {
			var page = {};
			page = $.grep(object, function(n, i) {
				return n[key] === value;
			})[0];
			if($.isEmptyObject(page)){
				for(var i in object){
					if(object[i]['type'] === "SplitView"){
						$.each(object[i]['children'], function(j,splitViewPage) {
							if(splitViewPage[key] === value){
								page =  splitViewPage;
							}
						});
					}
				}
			}
			if($.isEmptyObject(page)){
				for(var i in object){
					if(object[i]['type'] === "PageScrollView"){
						$.each(object[i]['children'], function(j,splitViewPage) {
							if(splitViewPage[key] === value){
								page =  splitViewPage;
							}
						});
					}
				}
			}
			return page;
		},
		
		getUID : function(){
			var c = 1;
			var d = new Date();
			var m = d.getMilliseconds() + "";
			var u = ++d + m + (++c === 10000 ? (c = 1) : c);

			return u;
		},
		
		clone : function(obj) {
			if (null == obj || "object" != typeof obj)
				return obj;
			var copy = obj.constructor();
			for ( var attr in obj) {
				if (obj.hasOwnProperty(attr))
					copy[attr] = obj[attr];
			}
			return copy;
		},
		
		setbasicPageDef : function(page){

			uiDefaultValue = [];	// delete all values of this array everytime..
			var pagechildren = page['children'];
			if(page['type'] == "DBTableView" || page['type'] == "RemoteTableView"){
				$.each(page['children'][0]['group'], function(i,group){
					$.each(group['row'], function(i,row){
						$.each(row['children'], function(i,arr){
							switch(arr['viewtype']){
								case 'TextField':
								case 'TextArea':
								case 'Label':
									if(arr['template'] == "")
										uiDefaultValue.push({uiname:arr['name'],value:arr['value'],viewtype:arr['viewtype'],id:arr['id']});
							}
				
						});
				
					});
				
				});
				
			}else {
				$.each(pagechildren, function(i,arr){
					switch(arr['viewtype']){
						case 'TextField':
						case 'TextArea':
						case 'Label':
							uiDefaultValue.push({uiname:arr['name'],value:arr['value'],viewtype:arr['viewtype'],id:arr['id']});
							break;
					}
				});
			}
		},
		
		getbasicPageDef : function(){
			return uiDefaultValue;
		},
		
		setPageWhereCond : function(pageName,whereCondition){
			var pageNameAlreadyAdded = false;
			if(pageWhereCond.length > 0){
				for(var arr in pageWhereCond){
					if(arr['pagename'] === pageName){
						pageNameAlreadyAdded = true;
					}
				}
				if(!pageNameAlreadyAdded){
					pageWhereCond.push({pagename:pageName,wherecond:whereCondition});
				}
			}else{
				pageWhereCond.push({pagename:pageName,wherecond:whereCondition});
			}
		},
		
		getPageWhereCond : function(pageName){
			for(var arr in pageWhereCond){
				if(pageWhereCond[arr]['pagename'] === pageName){
					return pageWhereCond[arr]['wherecond'];
				}
			}
		},
		
		setPageFrame : function(framedef)
		{
			pageFrame['pageheight']=framedef.height;
			pageFrame['pagetop']=framedef.y;
			pageFrame['pagewidth']=framedef.width;
			pageFrame['pageleft']=framedef.x;
			
			return "";
		},
		getPageFrame : function(page)
		 {
		 
			return pageFrame;
		},
		
		getRegisteredActions : function(){
			return registerActions;
		},
		
		removeTrigerredActions : function(obj){
			registerActions = jQuery.grep(registerActions, function(action, i){
						return (action['action']['params']['targetpage']!==$.mobileweb.getCurrentPage().getName());
			});
		},
		
		setRegisteredActions : function(JSONObject){
			registerActions.push(JSONObject);
		},
		
		setPageLoadingFlag : function(param){
			pageLoadingFlag = param;
		},
		
		getPageLoadingFlag : function(){
			return pageLoadingFlag;
		},
		
		regiterViewSuccess : function(pagedef, ui, action){
			var actionObject = {"pagedef":pagedef,"ui":ui,"action":action,"target":{}};
			$.utility('setRegisteredActions',actionObject);
		},
		setCombinedCSV : function(csvArray){
			combinedCSV.push(csvArray);
		},
		
		getCombinedCSV : function(){
			return combinedCSV;
		},
		setRemoteDBRecords : function(recordArray){
			remoteDBRecords = recordArray;
		},
		
		getRemoteDBRecords : function(){
			return remoteDBRecords;
		},
		addNewTimer : function(timerName){
			var timerObj = {};
			timerObj[timerName] = true;
			var position = timers.push(timerObj);
			return position;
		},
		
		getUiFromObject : function(page, name) {
			/*return $("#" + page + " > [data-role='page']").find(
					"[name='" + name + "']");*/
			//Need to verify  for #7160
			return $('[name='+name+']'); // fix for #7160
		},
		getTimers : function() {
			return timers;
		},
		removeTimers : function(timerName) {
			for(var i in timers){
				if(timers[i][timerName]!= undefined && timers[i][timerName]){
					timers[i] = {};
					break;
				}
			}
		},
		setComActionStatus : function(param){
			comActionStatus = param;
		},
		
		getComActionStatus : function(){
			return comActionStatus;
		},
		
		setComActionStatusTileList : function(param){
			comActionStatusTileList = param;
		},
		
		getComActionStatusTileList : function(){
			return comActionStatusTileList;
		},
		
		setRemoteNumStatus : function(param){
			remoteNumStatus = param;
		},
		
		getRemoteNumStatus : function(){
			return remoteNumStatus;
		},
		
		setBulkUploadActionStatus : function(param){
			bulkUploadActionStatus = param;
		},
		
		getBulkUploadActionStatus : function(){
			return bulkUploadActionStatus;
		},
		
		setFileObj : function(param,name){
			fileObject[name] = param;
		},
		
		getFileObj : function(name){
			return fileObject[name];
		},
		
		setActionRunningStatus : function(param){
			actionRunningStatus = param;
		},
		
		getActionRunningStatus : function(){
			return actionRunningStatus;
		},
		setreSettingDataStatus : function(param){
			resettingDataStatus = param;
		},
		
		getreSettingDataStatus : function(){
			return resettingDataStatus;
		},
		
		setParentPage : function(param){
			parentPageDataArray.push(param);
		},
		getParentPage : function(){
			return parentPageDataArray.pop();//parentPageDataArray.length -1];//Bug #12092 fix
		},
		
		setTransitToParent : function(param){
			transitToParent = param;
		},
		getTransitToParent : function(){
			return transitToParent;//parentPageDataArray.length -1];//Bug #12092 fix
		},
		
		getTabPage : function(){
			return tabPageArray;
		},
		setTabPage : function(page){
			var found = false;
			$.each(tabPageArray , function(index, child){
				if(child['page'] == page){
					child['tabFlag'] = true;
					found = true;
				}
			});
			if(!found)
				tabPageArray.push({'page':page, 'tabFlag':false});
		},
		
		getTabPageData : function(pageid){
			for(var i = 0; i < tabPageDataArray.length; i++){
				if(tabPageDataArray[i]['pageId'] == pageid){
					return tabPageDataArray[i]['pageObj'];
				}
			}
			return;
		},
		setTabPageData : function(pageid, def){
			var found = false;
			$.each(tabPageDataArray , function(index, tabpage){
				if(tabpage['pageId'] == pageid){
					tabpage['pageObj'] = def;
					found = true;
				}
			});
			if(!found)
				tabPageDataArray.push({'pageId':pageid, 'pageObj':def});
		},
		
		updateTabPageDataArray : function(param){
			for(var i = 0; i < tabPageDataArray.length; i++){
				if(tabPageDataArray[i]['pageId'] == param){
					tabPageDataArray.splice(i);
				}
			}		
			
		},
		
		//
		
		getSpecificParentPage : function(pagename){
			for(var i = parentPageDataArray.length; i > 0; i--){
				if(pagename === parentPageDataArray[i-1].getName()){
					break;
				}else{
					parentPageDataArray.pop();
				}
			}
			
			return parentPageDataArray.pop();
		},
		getSpecificParentPagedef : function(pagename){
			for(var i = parentPageDataArray.length; i > 0; i--){
				if(pagename === parentPageDataArray[i-1].getName()){
					return parentPageDataArray[i-1];
				}
			}			
			return {};
		},
		
		setParentPagedef : function(param){
			parentPagedefDataArray.push(param);
		},
		getParentPagedef : function(){
		//	console.log("***** : " + parentPageDataArray[parentPageDataArray.length -1].getName());
			return parentPagedefDataArray.pop();
		},
		isParentPageHierarchy : function(targetPage){
			for(var i = parentPageDataArray.length; i > 0; i--){
				if(targetPage === parentPageDataArray[i-1].getName()){
					return true;
				}
			}
			return false;
		},
		    
		setReverseTransition : function(param){
			reverseTransition = param;
		},
		isReverseTransition : function(){
			return reverseTransition;
		},
		registerPagedefData : function(currentPagedef){
			currentPagedefData = currentPagedef;
		},
		getCurrentPagedef : function(){
			return currentPagedefData;
		},
		spaceInStringConversion : function ( str ) {
			if(str != undefined){
				var string=str;
				if((typeof(str) != "number") && ( str !== undefined || str !== "" && str.length >0 )){
					/*for(var i = 0; i < str.length; i++){
							if((str.charAt(i)==' ')&&(str.charAt(i-1)==' ')){
							 string=string.toString().replace(str.charAt(i),'&nbsp;');
							}
						}*/
					return string.toString().replace(/'nl9'/g,'\n'); //nl9 is new line character generated in java and this is converted in to \n again.
				}
			}return str;
			
		},
		
		extractValueFromSquareBracket : function(value) {
			var val = {};
			if (value.indexOf("[") != -1) {
				val = value.substring(1, value.indexOf("]"));
				value = value.replace(value, val);
			}

			return value;
		},

		getURLParameterValue : function(param) {
			var qparts = location.hash.split("?");
			if (qparts.length <= 1) {
				return "";
			}
			var query = qparts[1];
			var vars = query.split("&");
			var value = "";
			for ( var i = 0; i < vars.length; i++) {
				var parts = vars[i].split("=");
				if (parts[0] == param) {
					value = parts[1];
					break;
				}
			}
			value = unescape(value);
			value.replace(/\+/g, " ");
			return value;
		},
		
		getDeviceType : function() {
			var ua = navigator.userAgent;
			if (ua.match(/iPhone|iPod/i))
				return 'iPhone';
			if (ua.match(/iPad/i))
				return 'iPad';
			if (ua.match(/Android/i))
				return 'Android';
			if (ua.match(/BlackBerry/i))
				return 'BlackBerry';
			if (ua.match(/IEMobile/i))
				return 'Windows Phone';
			if (ua.match(/Macintosh|Win|Linux/i))
				return 'Desktop';
			return 'Untested Device';
		},

		isBusy : function() {
			var busy = !(utilmethods.data.initData
					&& utilmethods.data.initServer && utilmethods.data.initImg && !utilmethods.data.isQuerying);
			(busy) ? utilmethods.showLoadingIndicator(true) : utilmethods
					.showLoadingIndicator(false);
			return busy;
		},

		initData : function(param) {
			utilmethods.data.initData = param;
		},

		initServer : function(param) {
			utilmethods.data.initServer = param;
		},

		initChildren : function(param) {
			utilmethods.data.initChild = param;
		},

		isInitChildren : function() {
			return utilmethods.data.initChild;
		},

		isInitData : function() {
			return utilmethods.data.initData;
		},

		queryDatabase : function(param) {
			utilmethods.data.isQuerying = param;
		},
		
		setIndexedDBFlag : function(param) {
			indexedDBFlag = param;
		},
		
		getIndexedDBFlag : function() {
			return indexedDBFlag;
		},
		
		setIndexedDBResult : function(param) {
			indexedDBResult = param;
		},
		
		getIndexedDBResult : function() {
			return indexedDBResult;
		},
		
		setDelayedChangeCondition : function(flag, targetPage) {
			delayedChangeCondition['flag'] = flag;
			delayedChangeCondition['targetPage'] = targetPage;
		},
		
		getDelayedChangeCondition : function(pagename) {
			if(pagename === delayedChangeCondition['targetPage'])
				return delayedChangeCondition['flag'];
			else
				return false;
		},
		
		setResetEvent : function(param) {
			resetEvent = param;
		},
		
		getResetEvent : function() {
			return resetEvent;
		},
		
		initCall : function() {
			if(($.utility('appendDeviceInfo')=="") || ($.utility('appendDeviceInfo')==null)){
				var dataset = {
					projectid : $.mobileweb['pid'],
					ProjectName : $.mobileweb['projectname'],
					Title : $.mobileweb['title'],
					projectstate : ($.mobileweb['state'] === 'preview') ? 'development': $.mobileweb['applicationState'],
					version : $.mobileweb['version'],
					os : 'mw',
					did : $.utility('getUID')
				}
				var url = [utilmethods.getCommServerDomain(),'init?jsonp=registerDeviceInfo&callbackdata={"ver":"2"}&cache=', Math.random(), '&dataset=',
				         JSON.stringify(dataset) ].join('');
				utilmethods.sendRequest(url); 
			}
		},
		
		registerDeviceInfo : function(json) {
			if (json['ret'] === 'ACK') {
				if (json['retdic']['ak']) {					
					if(utilmethods.getServerPort() == "8080") {						
						var twelveHour = new Date();
						twelveHour.setTime(twelveHour.getTime() + (720 * 60 * 1000));
						var _options =  { expires : twelveHour };
						_options['secure'] = true;
						//$.cookie($.mobileweb['pid'] + "_ak", json['retdic']['ak'], _options);
						
						document.cookie = $.mobileweb['pid'] + "_ak=" +  json['retdic']['ak'] +"; samesite=strict; secure";
					}else {
						//console.log("removing AK from cookie...");
						// since "ak" is not related to any 'login' activity... so for client application we are removing it from cookie
						document.cookie = $.mobileweb['pid'] + "_ak=;  expires=Thu, 01 Jan 1970 00:00:01 GMT; samesite=strict; secure";
						// setting in session-storage
						sessionStorage.setItem($.mobileweb['pid'] + "_ak", json['retdic']['ak']);
					}					
					utilmethods.data['ak'] = json['retdic']['ak'];
				}

				if (json['retdic']['sk']) {
					$.cookie(projdata['pid'] + "_sk", json['retdic']['sk'], {
						expires : 14
					});
					utilmethods.data['sk'] = json['retdic']['sk'];
				}

			} else {
				if($.mobileweb['release'] != undefined && $.mobileweb['release']) {
					$.errorhandler('previewAlertBox',"We apologize for your inconvenience. Please reload the application. If issue still persist, kindly contact support team.", "");
				}else {
					$.errorhandler('previewAlertBox',"[WARNING] System security issue has been triggered. We apologize for your inconvenience. Kindly contact Mobilous MCS Team with the user-name and project-id for a quick resolution of the issue.", "システムセキュリティの問題が発生しました。これを解決するにはユーザー名とプロジェクト番号とともに、モビラスのMCS担当にご連絡ください。ご不便をおかけして申し訳ございません。");
				}
				console.log("[ERROR] Failed to get AK and SK from Server.");
			}
			utilmethods.initServer(true);
		},
		
		appendDeviceInfo : function() {
			var deviceInfo = [];
			if(utilmethods.getServerPort() == "8080") {
				
				if ($.cookie($.mobileweb['pid'] + '_ak'))
					$.merge(deviceInfo, [ '&ak=',
							$.cookie($.mobileweb['pid'] + '_ak') ]);
				else if (utilmethods.data['ak'])
					$.merge(deviceInfo, [ '&ak=', utilmethods.data['ak'] ]);
				
				if ($.cookie($.mobileweb['pid'] + '_sk'))
					$.merge(deviceInfo, [ '&sk=',
							$.cookie($.mobileweb['pid'] + '_sk') ]);
				else if (utilmethods.data['sk'])
					$.merge(deviceInfo, [ '&sk=', utilmethods.data['sk'] ]);				
				
			}else {
				var sessionAK = sessionStorage.getItem($.mobileweb['pid'] + "_ak");
				if(sessionAK) {
					$.merge(deviceInfo, [ '&ak=', sessionAK ]);
				}else if (utilmethods.data['ak'])
					$.merge(deviceInfo, [ '&ak=', utilmethods.data['ak'] ]);
				
				// if "ak" is still in cookie, removing it from there, we have to remove below lines later. 	Date : 29-Jul-2020
				document.cookie = $.mobileweb['pid'] + "_ak=;  expires=Thu, 01 Jan 1970 00:00:01 GMT;";
				document.cookie = $.mobileweb['pid'] + "_ak=;  expires=Thu, 01 Jan 1970 00:00:01 GMT; samesite=strict; secure";
				document.cookie = $.mobileweb['pid'] + "_ak=;  expires=Thu, 01 Jan 1970 00:00:01 GMT; secure";
			}

			return deviceInfo.join('');
		},
		
		createIndexedDBTable : function(param,version) {
			var openRequest = indexedDB.open("IndexedDB",version);
			openRequest.onsuccess = function(e) {
				//setIndexedDB(e.target.result); 
				indexedDatabase = e.target.result;
			}
			openRequest.onupgradeneeded = function(e) {
				var thisDB = e.target.result;
				if(!thisDB.objectStoreNames.contains(param)) {
					thisDB.createObjectStore(param, {keyPath:"id",autoIncrement:true});
				}
			}
			openRequest.onerror = function(e) {
				//Do something for the error
			}
		},
		
		addDataToIndexedDBTable : function(tablename,data) {
			var timer = setInterval(function(){
				if(indexedDatabase != undefined){
					clearInterval(timer);
					var transaction = indexedDatabase.transaction([tablename],"readwrite");
			      	var store = transaction.objectStore(tablename);
			      	store.add(data);
				}
			},300);
		},
		
		getDataFromIndexedDBTable : function(tablename,UId){
			var results = [];
			var timer = setInterval(function(){
				if(indexedDatabase != undefined){
					clearInterval(timer);
					var transaction = indexedDatabase.transaction([tablename],"readwrite");
				  	var store = transaction.objectStore(tablename);
					var allRecords = store.getAll();
				        allRecords.onsuccess = function() {
				        results = allRecords.result;
				        $.utility('setIndexedDBFlag',true);
				        $.utility('setIndexedDBResult',results[0][UId]);
				    };
				}
			},300);
		},
		
		clearDataFromIndexedDBTable : function(tablename){
			var results = [];
			if($.utility('getIndexedDBFlag')){
				var timer = setInterval(function(){
					if(indexedDatabase != undefined){
						clearInterval(timer);
						var transaction = indexedDatabase.transaction([tablename],"readwrite");
					  	var store = transaction.objectStore(tablename);
					  	var objectStoreRequest = store.clear();
					  	objectStoreRequest.onsuccess = function(event) {
					  	    console.log(tablename," deleted.");
					  	};
					}
				},100);
			}
		},

		createDatabase : function(name, size) {
			return openDatabase(name, '1.0', 'Appexe DB', size * 1024 * 1024);
		},

		dropTable : function(db, name) {
			db.transaction(function(tx) {
				tx.executeSql('DROP TABLE ' + name);
			});
		},

		createTable : function(db, schema, callback) { // callback added to insert data/create trigger when we have huge number of tables i.e around more than 20 to avoid race condition between creating tables and insert data/create trigger. REF: infdvox.mobilous.com PID 484, clendar App
			
			/*var fields = [];
			var primaryKeyFields = 'PRIMARY KEY(';
			var primaryBool = false;
			$.each(schema['fields'], function(i, field) {
				var _field = [ field['name'], field['type'] ]
				if (field['pk']){
					primaryKeyFields = primaryKeyFields + field['name'] + ',';
					primaryBool = true;
				}
				if ((field['type'] === 'INTEGER') && (field['autoinc']))
					_field.push('AUTOINCREMENT');
				if (field['pk'])
					_field.push('NOT NULL');
				fields.push(_field.join(' '))
			});
			//["id INTEGER PRIMARY KEY NOT NULL", "nam TEXT", "age TEXT PRIMARY KEY NOT NULL"] 
			// closing primary key field lists :
			primaryKeyFields = primaryKeyFields.slice(0,primaryKeyFields.lastIndexOf(',')) + ')';
			if(primaryBool){
				fields.push(primaryKeyFields);
			}*/
			
			var fields = [];
			var pks = [];
			$.each(schema['fields'], function(i, field) {
				var _field = [ field['name'], field['type'] ];
				
				if (field['pk'])
					pks.push(field['name']);
				if ((field['type'] === 'INTEGER') && (field['autoinc']))
					_field.push('PRIMARY KEY AUTOINCREMENT');
				if (field['pk'])
					_field.push('NOT NULL');
				if (field['defaultValue'])
					_field.push("DEFAULT '" + field['defaultValue'] +"'" );
				/*if ((field['type'] === 'TEXT'))
					_field.push('VARCHAR(1000)');*/
				fields.push(_field.join(' '));
			});
			var sqlQuery = '';
			if(pks.length > 1){
				sqlQuery = [ 'CREATE TABLE IF NOT EXISTS ',schema['tablename'], '(',fields.join(),', UNIQUE(', pks.join(','),')',')' ].join('');
			}else{
				fields = [];
				$.each(schema['fields'], function(i, field) {
					var _field = [ field['name'], field['type'] ];
					
					if (field['pk'])
						_field.push("PRIMARY KEY");
					
					if ((field['type'] === 'INTEGER') && (field['autoinc']))
						_field.push('AUTOINCREMENT');
					if (field['pk'])
						_field.push('NOT NULL');
					if (field['defaultValue'])
						_field.push("DEFAULT '" + field['defaultValue'] +"'" );
					/*if ((field['type'] === 'TEXT'))
						_field.push('VARCHAR(1000)');*/
					fields.push(_field.join(' '));
				});
				sqlQuery = [ 'CREATE TABLE IF NOT EXISTS ',schema['tablename'], '(',fields.join(),')' ].join('');
			}
			
			db.transaction(function(tx) {
				tx.executeSql(sqlQuery,[],
					function(tx, result) {
						/* console.log(result);
						 console.log([ 'CREATE TABLE IF NOT EXISTS ',
										schema['tablename'], '(',
										fields.join(),', PRIMARY KEY(', pks.join(','),')',')' ].join(''));
						console.log( "table creation successful");*/
						if(callback != undefined){
							callback();
						}
					},
					function(tx, error) {
						console.log("Error >> CREATE Table "+schema['tablename'] + ". \nDetails: " + error['message']);
						if(callback != undefined){
							callback();
						}
						// console.log(error);
						// console.log([ 'CREATE TABLE IF NOT EXISTS ',
										//schema['tablename'], '(',
									//	fields.join(),', PRIMARY KEY(', pks.join(','),')',')' ].join(''));
						/*	alert('Error in creating local database table. An AUTOINCREMENT column should always be an INTEGER and PRIMARY KEY or '
								+ 'only 1 PRIMARY KEY is allowed per table: '
								+ schema['tablename']);*/
					
					});
			});
        },
        
		createView : function(db, schema) {
			db.transaction(function(tx) {
				tx.executeSql(schema['script'],[],
				function(tx, result) {
					//console.log(result);
				},function(tx, error){
					console.log(error);
				});
			});
        },

        createTrigger : function(db, schema) {
            /*var isWatchTableExist = false;
            var tables=$.mobileweb['localdb']['schema'];
			for(var i=0; i < tables.length; i++){
				if(tables[i]['tablename'] == schema['watch_table']){
                    isWatchTableExist = true;
                    break;
				}
            }

            if(isWatchTableExist){
                db.transaction(function(tx) {
                    tx.executeSql('DROP TRIGGER IF EXISTS '+schema['triggername'],[],
                        function(result) {
                            console.log("Trigger drop success");
                        },function(error){
                            console.log("Trigger drop fail: >> "+ error);
                        }
                    );
                });

                db.transaction(function(tx) {
                    tx.executeSql(schema['script'],[],
                        function(tx, result) {
                            console.log("Trigger create success");
                        },function(tx, error){
                            console.log("Trigger fail: >> "+ error);
                        }
                    );
                });
            }*/

            db.transaction(function(tx) {
                tx.executeSql('DROP TRIGGER IF EXISTS '+schema['triggername'],[],
                    function(result) {
                        console.log("Trigger drop success");
                    },function(error){
                        console.log("Trigger drop fail: >> "+ error);
                    }
                );
            });

            $.utility('runTrigger', schema['script']);
		},
		
		isDatabaseExists : function(db, schema) {
			var count = 0;
			$.each($.mobileweb['localdb']['schema'],function(i,schema){
				db.transaction(function(tx) {
					tx.executeSql(["SELECT name FROM sqlite_master WHERE type='table' AND name='"+schema['tablename']+"';"].join(''),[], 
						function(tx, result) {
							if(result['rows'].length < 1){
								count++;
								$.utility('createTable', $.mobileweb['localdb']['instance'], schema);
								$.utility('setLatestLocaldbSchema',schema);
								if(i == $.mobileweb['localdb']['schema'].length -1){
									if(count == ($.mobileweb['localdb']['schema'].length)){
										
										$.each($.mobileweb['localdbView']['schema'],function(i,viewSchema){
											$.utility('createView', $.mobileweb['localdb']['instance'], viewSchema);
	                                    });
	                                    if($.mobileweb['localdbTrigger']){
	                                        $.each($.mobileweb['localdbTrigger']['schema'],function(i,viewSchema){
	                                            $.utility('createTrigger', $.mobileweb['localdb']['instance'], viewSchema);
	                                        });
	                                    }
	                                    
										$.utility('requestData', true);
									}else{
										$.utility('updateRequestedData', true);
										
									}
								}
							}
							else if(schema['tablename'] == "spotdetail"){
								$.utility('dropTable', $.mobileweb['localdb']['instance'],"spotdetail");
								$.utility('createTable', $.mobileweb['localdb']['instance'], schema);
								$.utility('setLatestLocaldbSchema',schema);
								if(i == $.mobileweb['localdb']['schema'].length -1){
									if(count == ($.mobileweb['localdb']['schema'].length)){
										
										$.each($.mobileweb['localdbView']['schema'],function(i,viewSchema){
											$.utility('createView', $.mobileweb['localdb']['instance'], viewSchema);
	                                    });
	                                    if($.mobileweb['localdbTrigger']){
	                                        $.each($.mobileweb['localdbTrigger']['schema'],function(i,viewSchema){
	                                            $.utility('createTrigger', $.mobileweb['localdb']['instance'], viewSchema);
	                                        });
	                                    }
	                                    
										$.utility('requestData', true);
									}else{
										$.utility('updateRequestedData', true);
									}
								}
							}else if(schema['filename'] != ""){
								db.transaction(function(tx) {
									tx.executeSql(["SELECT * FROM '"+schema['tablename']+"';"].join(''),[], 
											function(tx, result) {
										if(result['rows'].length < 1){
											$.utility('setLatestLocaldbSchema',schema);
										}
										if(i == $.mobileweb['localdb']['schema'].length -1){
											if(count == ($.mobileweb['localdb']['schema'].length)){
												
												$.each($.mobileweb['localdbView']['schema'],function(i,viewSchema){
													$.utility('createView', $.mobileweb['localdb']['instance'], viewSchema);
			                                    });
			                                    if($.mobileweb['localdbTrigger']){
			                                        $.each($.mobileweb['localdbTrigger']['schema'],function(i,viewSchema){
			                                            $.utility('createTrigger', $.mobileweb['localdb']['instance'], viewSchema);
			                                        });
			                                    }
			                                    
												$.utility('requestData', true);
											}else{
												$.utility('updateRequestedData', true);
											}
										}
									},
									function(tx, error) {
										console.log("Error in the Query..");
									});
								});
							}
							else{
								if(i == $.mobileweb['localdb']['schema'].length -1){
									if(count == ($.mobileweb['localdb']['schema'].length)){
										
										$.each($.mobileweb['localdbView']['schema'],function(i,viewSchema){
											$.utility('createView', $.mobileweb['localdb']['instance'], viewSchema);
	                                    });
	                                    if($.mobileweb['localdbTrigger']){
	                                        $.each($.mobileweb['localdbTrigger']['schema'],function(i,viewSchema){
	                                            $.utility('createTrigger', $.mobileweb['localdb']['instance'], viewSchema);
	                                        });
	                                    }
	                                    
										$.utility('requestData', true);
									}else{
										$.utility('updateRequestedData', true);
									}
								}
							}
						},
						function(tx, error) {
							console.log("Error in the Query..");
						});
				});
				
			});
		},
		
		insertIntoLocalDB : function(tablename, records){
			//if(pagedef != null){
				$.mobileweb['localdb']['instance'].transaction(function (tx) {
					for(var i = 0; i < records.length; i++){
						var fieldNames = [];
						var qnMarks = [];
						var values = [];
						for(var key in records[i]){
							fieldNames.push(key);
							values.push(records[i][key]);
							qnMarks.push('?');
						}
						//$.utility('log',['INSERT INTO ', tablename, ' (', fieldNames.join(), ') VALUES (', qnMarks.join(), ')'].join(''));
						tx.executeSql(['INSERT INTO ', tablename, ' (', fieldNames.join(), ') VALUES (', qnMarks.join(), ')'].join(''), values,
							function(tx,result){
								if(i == records.length -1){
//									if(pagedef != null){
//										pagedef['data']['updated'] = false;
//										$.utility('showLoadingIndicator', false);
//										return true;
//									}	
									$.utility('showLoadingIndicator', false);
									return true;
								}
								fieldNames = [];
								qnMarks = [];
								values = [];
							},
							function(tx, error){
								$.utility('showLoadingIndicator', false);
								return $.errorhandler('previewAlertBox',"Error occured while inserting record("+ records[i] +") in \"" + tablename + "\" " );
							}
						);
					}
				});
			//}
//			$.mobileweb['localdb']['instance'].transaction(function (tx) {
//				for(var i = 0; i < records.length; i++){
//					var fieldNames = [];
//					var qnMarks = [];
//					var values = [];
//					for(var key in records[i]){
//						fieldNames.push(key);
//						values.push(records[i][key]);
//						qnMarks.push('?');
//					}
//					//$.utility('log',['INSERT INTO ', tablename, ' (', fieldNames.join(), ') VALUES (', qnMarks.join(), ')'].join(''));
//					tx.executeSql(['INSERT INTO ', tablename, ' (', fieldNames.join(), ') VALUES (', qnMarks.join(), ')'].join(''), values,
//						function(tx,result){
//							if(i == records.length -1){
//								if(pagedef != null){
//									pagedef['data']['updated'] = false;
//									$.utility('showLoadingIndicator', false);
//									return true;
//								}	
//							}
//							fieldNames = [];
//							qnMarks = [];
//							values = [];
//						},
//						function(tx, error){
//							$.utility('showLoadingIndicator', false);
//							return $.errorhandler('previewAlertBox',"Error occured while inserting record("+ records[i] +") in \"" + tablename + "\" " );
//						}
//					);
//				}
//			});
		},
		
		handleLocalDBError : function(code,message){
			$.mobileweb['__ERR_CODE__'] = code;
	  		var _errmsg = message.substring(message.indexOf("(") + 1,message.indexOf(")"));
	  		_errmsg = _errmsg.replace(parseInt(_errmsg),"");
	        $.mobileweb['__ERR_MSG__'] = _errmsg;
		},
		
		runTrigger : function(script){
			try{				
				$.mobileweb['localdb']['instance'].transaction(function (tx) {
					tx.executeSql(script);
				},function(success){
					//console.log(script);
					console.log("Trigger success: >> "+ success);
				}, function(error){
					console.log("runTrigger error: >> "+ error);
                });
                
			}catch(e){
				console.log(e);
			}
		},
        
		showLoadingIndicator : function(status) {
			if (status) {
				if (!utilmethods.showLoading) {
					utilmethods.showLoading = true;
					/*$.blockUI({
						message : '',// <p>Loading...<p>
						overlayCSS : {
							opacity : 0.5
						},
						css : {
							border : 'none',
							padding : '15px',
							backgroundColor : '#000',
							'-webkit-border-radius' : '10px',
							'-moz-border-radius' : '10px',
							opacity : 1,
							color : '#fff'
						}
					});
					$('.ui-loader').css('display', 'block');*/
				}
			} else {
				utilmethods.showLoading = false;
				/*$.unblockUI();
				$('.ui-loader').css('display', 'none');*/
			}
		},
		
		checkAKdata : function() {
			if(utilmethods.getServerPort() == "8080") {
				var cookieAK = $.cookie($.mobileweb['pid'] + '_ak');
				if(cookieAK)	return true;
				
			}else {
				var sessionAK = sessionStorage.getItem($.mobileweb['pid'] + "_ak");
				if(sessionAK)	return true;
			}
			
			return false;
		},

		requestData : function(localdb) {
			var request = {
				state : $.mobileweb['state'],
				title : $.mobileweb['title'],
				version : $.mobileweb['version']
			};

			if ($.mobileweb['localization'])
				request['localization'] = $.mobileweb['localization'];

			if (localdb) {
				request['schema'] = [];
				$.each($.mobileweb['localdb']['schema'], function(i, schema) {
					var _schema = {};
					for ( var key in schema) {
						if (key !== 'fields')
							_schema[key] = schema[key];
					}
					request['schema'].push(_schema);
				});
			}

			if ((request['localization']) || (request['schema'])) {
				if(utilmethods.getServerPort() == '8080') {
					var url = [ $.mobileweb['baseurl'], '/mobileweb/mobile/',
						$.mobileweb['user'], '/', $.mobileweb['pid'],
						'/getserverdata?request=', JSON.stringify(request) ]
					.join('');
					
					utilmethods.sendRequest(url);
				}else {
					utilmethods.getLocalDbData(request);
				}
			}
			
			if (($.mobileweb['serveracc']) && (!utilmethods.checkAKdata())) {
				utilmethods.initCall();
			} else {
				utilmethods.initServer(true);
			}
		},
		updateRequestedData : function(localdb) {
			
			var request = {
				state : $.mobileweb['state'],
				title : $.mobileweb['title'],
				version : $.mobileweb['version'],
				schema : $.utility('getLatestLocaldbSchema')
			};
			if (request['schema'].length != 0) {
				if(utilmethods.getServerPort() == '8080') {
					var url = [ $.mobileweb['baseurl'], '/mobileweb/mobile/',
						$.mobileweb['user'], '/', $.mobileweb['pid'],
						'/getserverdata?request=', JSON.stringify(request) ]
					.join('');
					
					utilmethods.sendRequest(url);
				}else {
					utilmethods.getLocalDbData(request);
				}
			}else{
				utilmethods.showLoadingIndicator(true);
				utilmethods.initData(true);
			}
			
			if (($.mobileweb['serveracc']) && (!utilmethods.checkAKdata())) {
				utilmethods.initCall();
			} else {
				utilmethods.initServer(true);
			}
		},
		
		getLocalDbData : function(request) {
			var count = 0;
			var resultCount = 0;
			$.each(request['schema'], function(index, schema) {
				if(schema['filename'] != "") {
					count++;
				}
			});
			//console.log('count---',count);
			
			$.each(request['schema'], function(index, schema) {
				if(schema['filename'] != "") {
					var reqURL = $.mobileweb['baseurl'] + ":8181/appexe/api/download/database/" + $.mobileweb['pid'] + "/" + schema['filename'];
					if($.mobileweb['release'] != undefined && $.mobileweb['release']) {
						reqURL = $.mobileweb['baseurl'] + ":8181/resources/database/" + schema['filename'];
					}
					var lines = [];
					$.ajax({
						type: "POST",
						url: reqURL,
						crossDomain : true,
						dataType: "text",
						success: function(data) {
							processData(data);
						},
						error: function(error) {
							resultCount++;
							//console.log(error);
						}
					});
					
					function processData(data) {
						var allTextLines = data.split(/\r\n|\n/);
						var headings = allTextLines[0].split(',');
						var record_num = headings.length;
						for (var i = 1; i < allTextLines.length -1; i++) {
							var tarr = {};
							var entries = allTextLines[i].split(',');
							for (var j = 0; j < record_num; j++) {
								tarr[headings[j]] = entries[j];
							}
							lines.push(tarr);
						}
						resultCount++;
						if(lines.length > 0){
							request['schema'][index]['value'] = lines;
							request['schema'][index]['status'] = true;
						}
							//console.log(schema);
					}
//					setTimeout(function() {
//						request['schema'][index]['value'] = lines;
//						request['schema'][index]['status'] = true;
//						//console.log(schema);
//					}, 500);					
				}
			});
			
			var reqtimer = setInterval(function() {
			   // request['language'] = "en"; --> (getting set in servlet)
				if(count === resultCount){
					clearInterval(reqtimer);
					 request['status'] = true;
					 $.utility('processServerData', request);
				}
			}, 2000);
			
//			setTimeout(function() {
//				   // request['language'] = "en"; --> (getting set in servlet)
//				    request['status'] = true;
//				    $.utility('processServerData', request);
//				}, 2000);
		},
		
		// this function is the callBack function for the "/getServerData" API...
		processServerData : function(json) {
			$.each(json['schema'], function(i, schema) {
				if (schema['status']) {
					$.utility('insertIntoLocalDB', schema['tablename'],schema['value']);
				}
			});

			if (json['localization'])
				if (json['localization']['status']) {
					$.each($.mobileweb['pages'], function(k, page) {
						// process here for other stuff inside the page
						$.each(page['children'], function(l, child) {
							applyLocalization(json['localization']['value'], child);
						});
					});
				}
			if (json['trigger']){
				$.each(json['trigger'], function(i, trigger) {
					$.utility('runTrigger', trigger['script']);
				});
			}

			utilmethods.initData(true);
		},
		
		sendRequest : function(url) {
			//utilmethods.log('[LINK] ' + url);
			utilmethods.showLoadingIndicator(true);
			var s = document.createElement('script');
			s.setAttribute('src', url);
			document.getElementsByTagName('head')[0].appendChild(s);
		},
		
		getCommServerDomainForExternalService : function() {
			if(utilmethods.getServerPort() == '8080') {
				return [$.mobileweb['baseurl'],':', '8080', '/commapi/extsvc/authenticate' ].join('');
			}else {
				return [$.mobileweb['baseurl'], '/commapi/extsvc/authenticate' ].join('');
			}
		},
		
		sendJSONRequest : function(url, action, pagedef) {
			utilmethods.log('[LINK] ' + url);
			utilmethods.showLoadingIndicator(true);
			
			var getJSONfrom;
			if(utilmethods.getServerPort() == '8080') {
				getJSONfrom = $.mobileweb['baseurl']+':8080/mobileweb/mobile/extsvc?uri='+url;
			}else {
				getJSONfrom = url;
			}
			$.getJSON(getJSONfrom, function(data){
				
				var dataJson = (data.authURL) ? JSON.parse(data.authURL) : data;
				if(dataJson['ret'] == "ACK"){
					new $.actions(pagedef, null, [{method:"Select", category:"ComAction", callingMethod : "externalService",
						params:{
							servicename: action['params']['servicename'],
							table: action['params']['table'],
							where: ($.utility("tokenizeString",action['params']['where'], pagedef).indexOf("null") != -1) ? '' : $.utility("tokenizeString",action['params']['where']) ,
							order: $.utility("tokenizeString",action['params']['order'], pagedef),
							fields:""// $.utility('getColumns',pagedef['data']['tablename'],[],pagedef['children'])
							},
					events:action['events']}]).execute();
				}
			});
		},
		
		getCommServerDomain : function() {
			if(utilmethods.getServerPort() == '8080') {
				return [$.mobileweb['baseurl'],'/commapi/comaction/' ].join('');
			}else {
				return [$.mobileweb['baseurl'],':','8181','/commapi/comaction/'].join('');
			}
		},
		
		sendPOSTRequest : function(requestData, action) {
			if(utilmethods.getServerPort() == '8080') {
				utilmethods.log('[LINK] ' + requestData);
				utilmethods.showLoadingIndicator(true);
				$.ajax({
					url: $.utility('getCommServerDomain')+"llcommpost",
					type: "POST",
					data: requestData,
					contentType :"application/x-www-form-urlencoded",
					cache: false,
					success: function( data ) {
						console.log("---- Success : POST request for ComAction : "+action+" ----");
					},
					error : function(err){
						console.log("---- Error : POST request for ComAction : "+action+" ----");
					}
				});
			}else {
				
				$.utility('processRequestData', requestData, action);
			}
		},
		
		processRequestData : function(requestData, action) {
			var jsonObj = {};
			requestData.split("&").forEach(function(part) {
				if(part) {
					if(part.indexOf('dataset') == 0){
						jsonObj['dataset'] =  decodeURIComponent(part.replace("dataset=", ""));
					}else if(part.indexOf('callbackdata') == 0){
						jsonObj['callbackdata'] =  decodeURIComponent(part.replace("callbackdata=", ""));
					}else {
						var item = part.split("=");
						jsonObj[item[0]] = decodeURIComponent(item[1]);
					}					
				}
			});
			
			if(window.crypto && crypto.subtle && window.TextEncoder) {
				$.utility('processRequestEncryption', jsonObj, action);
			}else {
				$.utility('encryptPOSTRequest', jsonObj, action);
			}
		},
		
		encryptPOSTRequest : function(requestData, action) {
			
			var requestURL = $.utility('getCommServerDomain')+"llcommpost";
			$.ajax({
				url: requestURL,
				type: "POST",
				data: requestData,
				contentType :"application/x-www-form-urlencoded",
				cache: false,
				crossDomain: true,
				dataType: "text",
                async: true,
				success: function( data ) {
					console.log("---- Success : POST request for ComAction : "+action+" ----");
					$.utility('processResponseData', data, action);
				},
				error : function(err, textStatus, errorThrown){
					console.log("---- Error : POST request for ComAction : "+action+" ----");
					if(action == 'remotesyncdb') {
						$.utility("setComActionStatus", "SynchError");
						$.utility('queryDatabase',false);
					}
				},
				beforeSend: function(jqXHR, settings){
	    			utilmethods.showLoadingIndicator(true);
	    		},
                complete: function(jqXHR, textStatus){                	
                	utilmethods.showLoadingIndicator(false);
                }				
			});
		},
		
		processResponseData : function(responseData, actionName) {
			if(typeof responseData != "object"){
				if(typeof responseData == "string"){
					var callbackMethod = responseData.substring(0, responseData.indexOf('{')-1).replace("$.utility(","").replace("'","").replace("'","");
					responseData = responseData.substring(responseData.indexOf('{'), responseData.lastIndexOf('}')+1);
					responseData = JSON.parse(responseData);
					if(callbackMethod && callbackMethod != "") {
						$.utility(callbackMethod, responseData);
					}
					
					if(actionName == 'remotesyncdb') {
						if(responseData.ret == "ACK"){
							$.utility("setComActionStatus", "SynchSuccess");
							$.utility('queryDatabase',false);
						}else{
							$.utility("setComActionStatus", "SynchError");
							$.utility('queryDatabase',false);
						}
					}
				}
			}
		},
		
		processRequestEncryption : function(jsonData, action) {
			
			var message = jsonData['project_id'] + jsonData['llcommand'] + jsonData['command'] + jsonData['ak'] + jsonData['os'] + jsonData['version'];
			$.utility('getEncryptDigest', message).then(function(digest) {
				
				var randomSalt = window.crypto.getRandomValues(new Uint8Array(16));
				var encodedSalt = btoa(new Uint8Array(randomSalt).reduce((s, b) => s + String.fromCharCode(b), ''));
				var randomIV = window.crypto.getRandomValues(new Uint8Array(16));
				var encodedIV = btoa(new Uint8Array(randomIV).reduce((s, b) => s + String.fromCharCode(b), ''));
				
				$.utility('processEncryption', jsonData['dataset'], message, randomSalt, randomIV).then(function(encryptData) {
					if(encryptData) {
						var encodedDataset = btoa(new Uint8Array(encryptData).reduce((s, b) => s + String.fromCharCode(b), ''));
						var prefixDataset = encodedSalt + digest + "mw:" + encodedIV + digest + "mw:";
						var cipherDataset = prefixDataset + encodedDataset;
						
						jsonData['dataset'] = cipherDataset;
						
						$.utility('processEncryption', jsonData['callbackdata'], message, randomSalt, randomIV).then(function(encryptCallback) {
							if(encryptCallback) {
								var encodedCallback = btoa(new Uint8Array(encryptCallback).reduce((s, b) => s + String.fromCharCode(b), ''));
								var prefixCallback = encodedIV + "cb:" + encodedSalt + "cb:";
								var cipherCallback = prefixCallback + encodedCallback;
								
								jsonData['callbackdata'] = cipherCallback;
							}
							$.utility('encryptPOSTRequest', jsonData, action);
						});	
					}
				});				
			});
		},
		getEncryptDigest : function(strText) {
			var buff = new TextEncoder("utf-8").encode(strText);
			return crypto.subtle.digest("SHA-256", buff).then(function (hash) {
			    return hexDigest(hash);
			});
			
			function hexDigest(buffer) {
				var hexCodes = [];
				var view = new DataView(buffer);
				for (var i = 0; i < view.byteLength; i += 4) {
					var value = view.getUint32(i);
					var stringValue = value.toString(16);
					var padding = '00000000';
					var paddedValue = (padding + stringValue).slice(-padding.length);
					hexCodes.push(paddedValue);
				}
				
				return hexCodes.join("");
			}
		}, 
		processEncryption: function(dataset, password, salt, iv) {
			
			var encodedPswd = new TextEncoder("utf-8").encode(password);
			var encodedDataset = new TextEncoder("utf-8").encode(dataset);
			
			var algoDerive = { name: 'PBKDF2', salt: salt, iterations: 1024, hash: 'SHA-256' };
			var derived = { name: 'AES-CBC', length: 256 };
			var keyUsages = [ 'encrypt', 'decrypt' ];
			
			var algoEncrypt = { name: 'AES-CBC', length: 256, iv: iv };
			
			return window.crypto.subtle.importKey('raw', encodedPswd, { name: 'PBKDF2' }, false, ['deriveKey']).then(function (baseKey) {
				return window.crypto.subtle.deriveKey(algoDerive, baseKey, derived, false, keyUsages);
			}).then(function (secretKey) {
				return window.crypto.subtle.encrypt(algoEncrypt, secretKey, encodedDataset);
			}).then(function (cipherText) {
				return cipherText;
			}).catch (function (err) {	
				console.log('Encryption Error: ' + err.message);
			});
		},
		
		fileSrctoBlob : function( dataURI ) {

			var byteString = atob( dataURI.split( ',' )[ 1 ] );
			var mimeString = dataURI.split( ',' )[ 0 ].split( ':' )[ 1 ].split( ';' )[ 0 ];
			
			var buffer	= new ArrayBuffer( byteString.length );
			var data	= new DataView( buffer );
			
			for( var i = 0; i < byteString.length; i++ ) {
			
				data.setUint8( i, byteString.charCodeAt( i ) );
			}
			
			return new Blob( [ buffer ], { type: mimeString } );
		},
		
		processTextFileData : function(json){
			$("#" + json['targetId'])[0].value = json['textData'];
			utilmethods.showLoadingIndicator(false);
		},
		
		// this will check whether the text has squarebrackets[] or not.. if yes then return its value by using below function...
		extractDataFromRecord : function(record, item, actionFlag) {
			if(record != undefined && record.constructor === Array && record.length > 0){
				if(record[0] != undefined && record[0].constructor === Array && record[0].length > 0)
					record = record[0];
			}
			if(item != undefined){
				var str = item.split('[');
				for ( var i in str) {
					if (str[i].toString().indexOf(']') !== -1) {
						var rowname = str[i].substring(0, str[i].indexOf(']'));
						if (record){
							if(record[rowname] != undefined){
								if ((record[rowname]=="")||(record[rowname]))
									item = item.replace('[' + rowname + ']',record[rowname]);
								if (record[rowname] === null)
									item = item.replace('[' + rowname + ']',"");
							}else{
								
								if(actionFlag != undefined && actionFlag){
									// -- DO NOTHING --	
								}else{
									item = item.replace('[' + rowname + ']',"");
								}
							}
						}
					}
				}
			}
			if(item === "null")
			    return "";
			return item;
		},
		
		
		setMultipleAlertArray : function(event){
			multipleAlertArray.push(event);
		},
		
		delMultipleAlertArray : function(){
			multipleAlertArray = jQuery.grep(multipleAlertArray, function(value , i) {
				return (i != 0);
			});
		},
		
		getMultipleAlertArray : function(){
			return multipleAlertArray;
		},
		
		saveDataToRecord : function(record, item, value) {
			var str = item.split('[');
			for ( var i=0; i< str.length; i++) {
				if (str[i].indexOf(']') !== -1) {
					var rowname = str[i].substring(0, str[i].indexOf(']'));
					if (record)
						if (record[rowname] != undefined)
							record[rowname] = value;
				}
			}
			return item;
		},
		
		// Use this only for Uploaded Images by the user...
		getImage : function(image) {
			if (image === '')
			return image;
			
			return (($.mobileweb['state'] === 'preview') ? [
					$.mobileweb['baseurl'], '/appexe/api/download/image/',
						$.mobileweb['pid'], '/', image ] : [ 'resources/image/',
						image ]).join('');
						
		},
		
		//Use this to call images clicked from camera picker and uploaded in commserver
		getRemoteImage : function(image) {
			if (image === '')
			return image;
			
			return ([$.mobileweb['baseurl'],'/images/',image ]).join('');
						
		},

		// check URL function, only needed when WebView is used in the app.
		checkURL : function(url) {
			var urlregex = new RegExp(
					"^(http|https)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
			if (!urlregex.test(url)) {
				return 'error';
			} else
				return 'success';
		},
		
		// Use this only for system images for all viewtypes other then toolbaritem...
		getSystemImage : function(image, viewType) {
			if (image === '')
				return image;
				// to get the local system images only...
			if((viewType === "Image") || (viewType === "ToggleButton") || (viewType === "CheckBox") || (viewType === "ImageButton") || (viewType === "Indicator")|| (viewType === "NavigationBar") || (viewType === "SystemButton") ||(viewType === "GoogleMap") ||(viewType === "Row")||(viewType === "Camera")){
				return (($.mobileweb['state'] === 'preview') ? ['/mobileweb/resources/images/system/', image ] : ['images/system/', image ]).join('');
			}else {		// to get the images from resources folder...
				return (($.mobileweb['state'] === 'preview') ? [
					$.mobileweb['baseurl'], '/mobileweb/',$.mobileweb["user"],'/images/system/', image ] : [
					'images/system/toolbar-items/default/', image ]).join('');
			}
		},
		
		// Use this only for ToolBarItems Images....
		getSystemImageToolBarItem : function(theme,image){
			if((theme=='blackopaque')||(theme=='blacktranslucent')){
				theme='black';
				
			}
			if(theme == "")
				theme='custom';
			
			return (($.mobileweb['state'] === 'preview') ? ['/mobileweb/resources/images/system/toolbar-items/',theme ,'/', image ] : [
			        'images/system/toolbar-items/',theme ,'/', image ]).join('');
		},
		
		getNavTheme : function(style,prompt) {
			var prom='';
			if(prompt!="")	prom='-prompt';
			if(style=="")	style='custom';
			
			return utilmethods.getSystemImage('navbar-'+style+prom+'.png',"NavigationBar");
		},

		getVideo : function(video) {
			if (video === '')
				return video;
			else if (video.search("http") || video.search("https") == '-1')
				return (($.mobileweb['state'] === 'preview') ? [
						$.mobileweb['baseurl'],
						':8181/appexe/api/download/video/', $.mobileweb['pid'],
						'/', video ] : [ 'resources/video/', video ]).join('');
			else
				return video;
		},
		
		getSound : function(sound) {
			if (sound === '')
				return sound;
			else if (sound.search("http") || sound.search("https") == '-1')
				return (($.mobileweb['state'] === 'preview') ? [
						$.mobileweb['baseurl'],
						'/appexe/api/download/bgm/', $.mobileweb['pid'],
						'/', sound ] : [ 'resources/bgm/', sound ]).join('');
			else
				return sound;
		},
		
		getSoundEffect : function(sound, pagedef) {
			if (sound === '')
				return sound;
			else{
				if(sound.indexOf('[') != -1 && sound.indexOf(']') != -1){						
					var oindex = sound.indexOf('[');
					var cindex = sound.indexOf(']');
					var temp = sound.substring(oindex, cindex) + "]";
					var orgval = $.utility('tokenizeString', temp, pagedef);
					orgval = $.utility('convertSpecialCharacter', $.utility('tokenizeString', orgval));
					
					sound = sound.replace(temp, orgval);
				}
				
				if (sound.search("http") == '-1' || sound.search("https") == '-1'){
					return (($.mobileweb['state'] === 'preview') ? [
						$.mobileweb['baseurl'],
						'/appexe/api/download/soundeffect/', $.mobileweb['pid'],
						'/', sound ] : [ 'resources/soundeffect/', sound ]).join('');
				}
				return sound;
			}
		},
		
		getColumns : function(tablename, columns, object, data) {
		
			if (Object.prototype.toString.call(object) === '[object Array]') {
				$.each(object, function(i, child) {
					if ((child['viewtype'] === 'DBTableViewList') || (child['viewtype'] === 'RemoteTableViewList')) {
						columns.push(getPrimaryKey(tablename, (child['viewtype'] === 'DBTableViewList') ? $.mobileweb['localdb']['schema'] : $.mobileweb['comdb']['schema']));
						utilmethods.getColumns('', columns,child['group'][0]['template'],data);
					} else if ((child['viewtype'] === 'DBTableView') || (child['viewtype'] === 'RemoteTableView')) {
						columns.push(getPrimaryKey(tablename,(child['viewtype'] === 'DBTableView') ? $.mobileweb['localdb']['schema'] : $.mobileweb['comdb']['schema']));
						$.each(child['group'],function(j, group) {
							$.each(group['row'],function(k,row) {
								if (child['style'] === 'custom')
									utilmethods.getColumns('',columns,row['children'],data);
								else
									utilmethods.getColumns('',columns,row['template'],data);
							});
						});
					} else {
						if ((child['template'] !== undefined) && (child['template'] !== '')) {
							extractTable(columns,child['template'], data);
						}
					}
				});
			} else {
				if (object['maintext'])
					if (object['maintext'] !== '')
						extractTable(columns, object['maintext'], data);
				if (object['subtext'])
					if (object['subtext'] !== '')
						extractTable(columns, object['subtext'], data);
				if (object['image'])
					if (object['image'] !== '')
						extractTable(columns, object['image'], data);
				if (object['children'])
					if (object['children'].length >= 0)
						utilmethods.getColumns('', columns, object['children'],
								data);
			}
			return (columns.length >= 0) ? columns : false;
		},

		formWhereCondition : function(condition, pagedef) {
			/*try{
				var temp = condition;
				var count=0;
				var count1=0;
				for(var i = 0, length = condition.length; i < length; i++){
					if(condition.charAt(i)=='['){
						if(condition.charAt(i-1)!='\''){
							count++;
						}
					}
					if(condition.charAt(i)==']'){
						if(condition.charAt(i+1)!='\''){
							count1++;
						}
					}
				}
				if(count!=0 || count1!=0 || count1!=count){
					$.errorhandler('alertBox', "The database where clause is wrong", "ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¿ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¾ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¹ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¯ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¿ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â½ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â®ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¯ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¿ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â½ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¾ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¯ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¿ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â½ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â»ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¯ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¿ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â½ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â«ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¯ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¿ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â½ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¯ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¿ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â½ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¯ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¿ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â½ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¯ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¿ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â½ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¾ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¯ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¿ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â½ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¾ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¯ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¿ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â½ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¯ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¿ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â½");
					return null;
				}
				else{
					temp = $.utility('tokenizeString', condition);
					return temp;
				}
			}catch(e){
				$.errorhandler('alertBox', "The database where clause is wrong", "ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¿ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¹ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¿Ãƒâ€šÃ‚Â½ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â®ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¿Ãƒâ€šÃ‚Â½ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¾ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¿Ãƒâ€šÃ‚Â½ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¤ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â»ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¿Ãƒâ€šÃ‚Â½ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â«ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¥ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¿Ãƒâ€šÃ‚Â½ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¿Ãƒâ€šÃ‚Â½ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¿Ãƒâ€šÃ‚Â½ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¿Ãƒâ€šÃ‚Â½ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¾ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¿Ãƒâ€šÃ‚Â½ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¥ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¿Ãƒâ€šÃ‚Â½ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¿Ãƒâ€šÃ‚Â½")
			}*/
			
			var whereCondition = $.utility('tokenizeString', condition, pagedef);
			
			return whereCondition;
		},
		
		tokenizeString : function(conditionString, pagedef, callerAction) {
			conditionString = $.utility('checkGlobalVariable', conditionString);
			
			if(conditionString != undefined){
				conditionString = conditionString.toString();
				if(conditionString.indexOf("@@") != -1  || conditionString.indexOf(/@@/gi) != -1){
					conditionString = $.utility('tokenizeFunction', conditionString, pagedef);
				}
				if(conditionString != undefined){
					var chunks = conditionString.toString().split("[");
					for ( var i=0; i < chunks.length; i++) {
						if (chunks[i].toString().indexOf("]") != -1) {
							var j = chunks[i].toString().indexOf("]");
							var org = "[" + chunks[i].substring(0, j) + "]";
							var fin = "";
							if(callerAction != undefined && callerAction['actionParentUI'] == "Gadget"){
								fin = $.utility("CheckAndGetUIElementValue",$("[name='" + callerAction['actionParentUIName'] + "']").find("[name='" + chunks[i].substring(0, j) + "']"), chunks[i].substring(0, j), pagedef);
							}else{
								fin = $.utility("CheckAndGetUIElementValue",$("[name='" + chunks[i].substring(0, j) + "']"), chunks[i].substring(0, j), pagedef);
							}
														
							//fin = $.utility("sanitizeInputValue", fin);
							conditionString = conditionString.replace(org, fin);
						}
					}
				}
			}else{
				conditionString = "";
			}
			return conditionString;
		},
		
		tokenizeFunction : function(conditionString, pagedef) {
			if(conditionString.indexOf("REGEXP_LIKE") != -1){
				var uiName = conditionString.replace("@@REGEXP_LIKE(", "");
				uiName = uiName.split(",")[0].replace("[","").replace("]","").replace("'","").replace("'","");
				var fin = $.utility("CheckAndGetUIElementValue",$("[name='"+uiName+"']"),uiName, pagedef);
				conditionString = conditionString.replace("@@", "");
				conditionString = eval("$." + conditionString.replace("["+uiName+"]", fin));
				//var fin = $.utility("CheckAndGetUIElementValue",$("[name='email']"),"email", pagedef);
				//conditionString = conditionString.replace("@@", "");
				//conditionString = eval("$." + conditionString.replace("[email]", fin));
				
			}else if(conditionString.indexOf("HASH") != -1){
				var refUI = conditionString.replace("@@HASH(", "");
				refUI = refUI.split(",")[0].replace("[","").replace("]","").replace("'","").replace("'","");
				var refVal = $.utility("CheckAndGetUIElementValue",$("[name='"+refUI+"']"),refUI, pagedef);
				conditionString = conditionString.replace("["+refUI+"]", refVal);
				// As 'hash' function return promise and 'async' & 'await' not working here. So, we'll not evaluating it here. Need to update it later. 	Dated: 30-Jun-2020
				//conditionString = eval("$." + conditionString.replace("@@", ""));
				
			}else{
				if (conditionString.indexOf("('") != -1 && conditionString.indexOf("','") != -1 && conditionString.indexOf("')") != -1) {
					var params = $.utility('tokenizeString', conditionString.substring(conditionString.indexOf('(\'')+1, conditionString.lastIndexOf('\')')+1), pagedef, 'tokenizeFunction');
					conditionString = conditionString.replace(conditionString.substring(conditionString.indexOf('(\'')+1 , conditionString.lastIndexOf('\')')+1), params);
					conditionString = conditionString.replace(/\r?\n|\r/g,"nl9");
					try{
						var result
						if(conditionString.indexOf(" (") == -1)
							result = eval("$." + conditionString.substring(2, conditionString.length));
						else
							result = "";
							
					}catch(e){
						/*if(e instanceof ReferenceError || e instanceof SyntaxError){
							$.errorhandler("previewAlertBox", "Missing single quotes in @@" + conditionString.substring(0, conditionString.indexOf(')') + 1), "çµ„è¾¼ã¿é–¢æ•°ã®å¤‰æ•°ã¯ã‚·ãƒ³ã‚°ãƒ«ã‚¯ã‚ªãƒ¼ãƒˆ( â€˜ )ã§æ‹¬ã£ã¦ä¸‹ã•ã„ã€‚ @@" + conditionString.substring(0,conditionString.indexOf(')') + 1));
						}else if(e instanceof TypeError){
							$.errorhandler("previewAlertBox", "Embedded function @@" + conditionString.substring(0, conditionString.indexOf(')') + 1) +" doesn't exist");
						}*/
 
 							//else conditionString = conditionString.replace(org,"" );
					}
					if(typeof result === "string")
						result = result.replace(/nl9/g,"'nl9'");
					conditionString = result;
				}
				else if((conditionString.indexOf("('") != -1 && conditionString.indexOf("')") != -1)  && (conditionString.indexOf("('") < conditionString.indexOf("')"))){
					var conditionArr = [];
					if(conditionString.indexOf("@@") != -1  || conditionString.indexOf(/@@/gi) != -1){
						conditionArr = conditionString.toString().trim().split("@@");
					}
					if(conditionArr.length > 1){	//need to support nested embedded functions, like: @@YEAR('__NOW__')-@@MONTH('__NOW__')-@@DAY('__NOW__'). Dated:- 02-Nov-2017
						var result = "";
						for ( var i=0; i < conditionArr.length; i++) {
							var condChunk = conditionArr[i].toString();
							if(condChunk.length > 0){
								if(condChunk.indexOf('(\'') != -1){
									var condParam = $.utility('tokenizeString', condChunk.substring(condChunk.indexOf('(\'')+1, condChunk.lastIndexOf('\')')+1), pagedef, 'tokenizeFunction');
									condChunk = condChunk.replace(condChunk.substring(condChunk.indexOf('(\'')+1 , condChunk.lastIndexOf('\')')+1), condParam);
									condChunk = condChunk.replace(/\r?\n|\r/g," ");
									
									var condResult = "";
									if(condChunk.lastIndexOf('\')') ==  condChunk.length-2)
										condResult = eval("$." + condChunk.substring(0, condChunk.length));
									else
										condResult = eval("$." + condChunk.substring(0, condChunk.lastIndexOf('\')')+2)) + condChunk.substring(condChunk.lastIndexOf('\')')+2, condChunk.length);
								}else
									condResult = condChunk;
								
								result = result.concat(condResult);
							}
						}
						return result;
					}
					else{
						
						var param = $.utility('tokenizeString', conditionString.substring(conditionString.indexOf('(\'')+1, conditionString.lastIndexOf('\')')+1), pagedef, 'tokenizeFunction');
						conditionString = conditionString.replace(conditionString.substring(conditionString.indexOf('(\'')+1 , conditionString.lastIndexOf('\')')+1), param);
						var result = eval("$." + conditionString.substring(2, conditionString.length));
						return result;
					}
											
					
				}
			}
 			if(conditionString != undefined)
 				return conditionString.toString();
 		},
 		
 		sanitizeInputValue: function(input) {
 			if(typeof input == "string"){
 				if(input.toLowerCase().indexOf("<html>")  > -1) {
 					var strHtmlTag = input.substring(input.indexOf('<html>'), input.indexOf('</html>'));
 					input = input.replace(strHtmlTag, "").replace("<html>", "").replace("</html>", "");
 	 			}
 				if(input.toLowerCase().indexOf("<script>")  > -1) {
 					var strScriptTag = input.substring(input.indexOf('<script>'), input.indexOf('</script>'));
 					input = input.replace(strScriptTag, "").replace("<script>", "").replace("</script>", "");
 	 			}
 				if(input.indexOf("<")  > -1 || input.indexOf(">")  > -1) {
 					//input = input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
 					$.errorhandler('previewAlertBox',"[WARNING] HTML tags are not supported for input values.", "");
 					input = "";
 				}
 			}
 			
 			return input;
 		},
		
		getWhereCondition : function(tablename, schema, data) {
			var pk = getPrimaryKey(tablename, schema);
			if (pk.constructor != Array && pk != '') {
				for ( var key in data) {
					if (key === pk)
						return pk += " = '" + data[key] + "'";
				}
			}else{
				for(var i in pk){
					for (var key in data) {
						if (key === pk[i])
							return pk[i] += " = '" + data[key] + "' ";
					}
				}
				
			}
			return pk;
		},

		getPK : function(tablename, schema) {
			return getPrimaryKey(tablename, schema);
		},

		savePageData : function(children, data, pagedef) {
			if (data === undefined)
				data = {};
			
			//PageScrollView
			if(pagedef != undefined){
				if(pagedef['parentType'] == "PageScrollView" && pagedef['pagedef'] != undefined){
					if(pagedef['pagedef']['toolbartop'] != undefined){
						$.each(pagedef['pagedef']['toolbartop']['children'], function(i, child) {
							if(child['viewtype'] === "SwitchBar"){
								data[child['name']] = child['switchValue'];
							}else if(child['viewtype'] === "ToggleButton"){
								data[child['name']] = child['togglevalue'];
							}else if(child['viewtype'] === "CheckBox"){
								data[child['name']] = child['valueFormat'];
							}else if(child['viewtype'] === "SoundBox" || child['viewtype'] === "VideoBox" || child['viewtype'] === "WebView" ){
								data[child['name']] = child['src'];
							}else if(child['viewtype'] === "LinkLabel"){
								data[child['name']] = child['link'];
							}else if(child['viewtype'] === "Radio"){
								data[child['groupName']] = child['groupNameData'];
								data[child['name']] = child['value'];
							}else{
								data[child['name']] = child['value'];
							}
						});
					}
					if(pagedef['pagedef']['toolbarbottom'] != undefined){
						$.each(pagedef['pagedef']['toolbarbottom']['children'], function(i, child) {
							if(child['viewtype'] === "SwitchBar"){
								data[child['name']] = child['switchValue'];
							}else if(child['viewtype'] === "ToggleButton"){
								data[child['name']] = child['togglevalue'];
							}else if(child['viewtype'] === "SoundBox" || child['viewtype'] === "VideoBox" || child['viewtype'] === "WebView" ){
								data[child['name']] = child['src'];
							}else if(child['viewtype'] === "LinkLabel"){
								data[child['name']] = child['link'];
							}else if(child['viewtype'] === "Radio"){
								data[child['groupName']] = child['groupNameData'];
								data[child['name']] = child['value'];
							}else if(child['viewtype'] === "CheckBox"){
								data[child['name']] = child['valueFormat'];
							}else{
								data[child['name']] = child['value'];
							}
						});
					}
					if(pagedef['pagedef']['toolbarleft'] != undefined){
	 					$.each(pagedef['pagedef']['toolbarleft']['children'], function(i, child) {
	 						if(child['viewtype'] === "SwitchBar"){
	 							data[child['name']] = child['switchValue'];
	 						}else if(child['viewtype'] === "ToggleButton"){
	 							data[child['name']] = child['togglevalue'];
	 						}else if(child['viewtype'] === "SoundBox" || child['viewtype'] === "VideoBox" || child['viewtype'] === "WebView" ){
	 							data[child['name']] = child['src'];
	 						}else if(child['viewtype'] === "LinkLabel"){
	 							data[child['name']] = child['link'];
	 						}else if(child['viewtype'] === "Radio"){
	 							data[child['groupName']] = child['groupNameData'];
	 							data[child['name']] = child['value'];
	 						}else if(child['viewtype'] === "CheckBox"){
	 							data[child['name']] = child['valueFormat'];
	 						}else{
	 							data[child['name']] = child['value'];
	 						}
	 					});
	 				}
				}
			}
			
			$.each(children, function(i, child) {
		//		if (child['template'] === '') // then add a property to the
												// data
				if(child['viewtype'] === "SwitchBar"){
					data[child['name']] = child['switchValue'];
				}else if(child['viewtype'] === "ToggleButton"){
					data[child['name']] = child['togglevalue'];
				/*}else if(child['viewtype'] === "RadioButtonGroup"){
					data[child['name']]= child['value'];	*/
				}else if(child['viewtype'] === "CheckBox"){
					data[child['name']] = child['valueFormat'];
				}else if(child['viewtype'] === "SoundBox" || child['viewtype'] === "VideoBox" || child['viewtype'] === "WebView" ){
					data[child['name']] = child['src'];
				}else if(child['viewtype'] === "LinkLabel"){
					data[child['name']] = child['link'];
				}else if(child['viewtype'] === "Radio"){
					data[child['groupName']] = child['groupNameData'];
					data[child['name']] = child['value'];
				}else{
					data[child['name']] = child['value'];
//					if(child['parentType'] == "PageScrollView")
//						data[child['name']] = $.utility('savePageData', child['children'], child['data']['contents'][0], child);					
//					else
//						data[child['name']] = child['value'];
				}
			});
			
			if(pagedef != undefined){
				if(pagedef['toolbartop'] != undefined){
					$.each(pagedef['toolbartop']['children'], function(i, child) {
						if(child['viewtype'] === "SwitchBar"){
							data[child['name']] = child['switchValue'];
						}else if(child['viewtype'] === "ToggleButton"){
							data[child['name']] = child['togglevalue'];
						}else if(child['viewtype'] === "CheckBox"){
							data[child['name']] = child['valueFormat'];
						}else if(child['viewtype'] === "SoundBox" || child['viewtype'] === "VideoBox" || child['viewtype'] === "WebView" ){
							data[child['name']] = child['src'];
						}else if(child['viewtype'] === "LinkLabel"){
							data[child['name']] = child['link'];
						}else if(child['viewtype'] === "Radio"){
							data[child['groupName']] = child['groupNameData'];
							data[child['name']] = child['value'];
						}else{
							data[child['name']] = child['value'];
						}
					});
				}
				if(pagedef['toolbarbottom'] != undefined){
					$.each(pagedef['toolbarbottom']['children'], function(i, child) {
						if(child['viewtype'] === "SwitchBar"){
							data[child['name']] = child['switchValue'];
						}else if(child['viewtype'] === "ToggleButton"){
							data[child['name']] = child['togglevalue'];
						}else if(child['viewtype'] === "SoundBox" || child['viewtype'] === "VideoBox" || child['viewtype'] === "WebView" ){
							data[child['name']] = child['src'];
						}else if(child['viewtype'] === "LinkLabel"){
							data[child['name']] = child['link'];
						}else if(child['viewtype'] === "Radio"){
							data[child['groupName']] = child['groupNameData'];
							data[child['name']] = child['value'];
						}else if(child['viewtype'] === "CheckBox"){
							data[child['name']] = child['valueFormat'];
						}else{
							data[child['name']] = child['value'];
						}
					});
				}
				if(pagedef['toolbarleft'] != undefined){
 					$.each(pagedef['toolbarleft']['children'], function(i, child) {
 						if(child['viewtype'] === "SwitchBar"){
 							data[child['name']] = child['switchValue'];
 						}else if(child['viewtype'] === "ToggleButton"){
 							data[child['name']] = child['togglevalue'];
 						}else if(child['viewtype'] === "SoundBox" || child['viewtype'] === "VideoBox" || child['viewtype'] === "WebView" ){
 							data[child['name']] = child['src'];
 						}else if(child['viewtype'] === "LinkLabel"){
 							data[child['name']] = child['link'];
 						}else if(child['viewtype'] === "Radio"){
 							data[child['groupName']] = child['groupNameData'];
 							data[child['name']] = child['value'];
 						}else if(child['viewtype'] === "CheckBox"){
 							data[child['name']] = child['valueFormat'];
 						}else{
 							data[child['name']] = child['value'];
 						}
 					});
 				}
			}
			return data;
		},
		
		updateChildrenData : function(pagedef, childname, value){

			$.each(pagedef['children'], function(i, child) {
				if(child['name'] === childname){
					pagedef['children'][i]['value'] = value;
				}
			});
			
			if(pagedef != undefined){
				if(pagedef['toolbartop'] != undefined){
					$.each(pagedef['toolbartop']['children'], function(i, child) {
						if(child['name'] === childname){
							pagedef['toolbartop']['children'][i]['value'] = value;
						}
					});
				}
				if(pagedef['toolbarbottom'] != undefined){
					$.each(pagedef['toolbarbottom']['children'], function(i, child) {
						if(child['name'] === childname){
							pagedef['toolbarbottom']['children'][i]['value'] = value;
						}
					});
				}
				if(pagedef['toolbarleft'] != undefined){
					$.each(pagedef['toolbarleft']['children'], function(i, child) {
						if(child['name'] === childname){
							pagedef['toolbarleft']['children'][i]['value'] = value;
						}
					});
				}
			}
		},
		
		updateChildProperty : function(pagedef, childname, value, property){
		    var subprop = "";
		    if(property.indexOf('.') != -1){
		    	var _propArr = property.split('.');
		    	property = _propArr[0];
		    	subprop = _propArr[1];
		    }
		    
		    $.each(pagedef['children'], function(i, child) {
		    	if(child['name'] === childname){
		    		if(pagedef['children'][i][property] != undefined)
		    			pagedef['children'][i][property][subprop] = value;
		    	}
		    });
		    
		    if(pagedef != undefined){
		    	if(pagedef['toolbartop'] != undefined){
		    		$.each(pagedef['toolbartop']['children'], function(t, child) {
		    			if(child['name'] === childname){
		    				if(pagedef['toolbartop']['children'][t][property] != undefined)
		    					pagedef['toolbartop']['children'][t][property][subprop] = value;
		    			}
		    		});
		    	}
		    	if(pagedef['toolbarbottom'] != undefined){
		    		$.each(pagedef['toolbarbottom']['children'], function(b, child) {
		    			if(child['name'] === childname){
		    				if(pagedef['toolbarbottom']['children'][b][property] != undefined)
		    					pagedef['toolbarbottom']['children'][b][property][subprop] = value;
		    			}
		    		});
		    	}
		    	if(pagedef['toolbarleft'] != undefined){
		    		$.each(pagedef['toolbarleft']['children'], function(l, child) {
		    			if(child['name'] === childname){
		    				if(pagedef['toolbarleft']['children'][l][property] != undefined)
		    					pagedef['toolbarleft']['children'][l][property][subprop] = value;
		    			}
		    		});
		    	}
		    }
		},
			  
		updatePageData : function(pagedef, dataToUpdate){
			if(pagedef['data']['contents'] != undefined && pagedef['data']['contents'].length != 0){
				if(pagedef['type'] === "DBTableViewList" || pagedef['type'] == 'RemoteTableViewList'){
					if(pagedef['data']['contents']['currentRow']!= undefined){
						var _rowNum = parseInt(pagedef['data']['contents']['currentRow']);
						$.each(dataToUpdate, function(keyToUpdate, valueToUpdate){
							pagedef['data']['contents'][_rowNum][keyToUpdate] = valueToUpdate;
						});	
					}
				}else{
					$.each(pagedef['data']['contents'], function(i, data){
						if(data != undefined){
							$.each(data, function(key, value){
								$.each(dataToUpdate, function(keyToUpdate, valueToUpdate){
									pagedef['data']['contents'][i][keyToUpdate] = valueToUpdate;
								});	
							});
						}
					});
				}
			}else{
				pagedef['data']['contents'][0] = {};
				$.each(dataToUpdate, function(keyToUpdate, valueToUpdate){
					pagedef['data']['contents'][0][keyToUpdate] = valueToUpdate;
				});
			}
			
			if(pagedef['type'].indexOf('TableView') != -1){
 				if(pagedef['data']['pagedata'] != undefined){
 					$.each(dataToUpdate, function(keyToUpdate, valueToUpdate){
 						pagedef['data']['pagedata'][keyToUpdate] = valueToUpdate;
 					});
 				}
 			}
		},

		registerPNClientId : function(json) {
			if (json['ret'] === 'ACK') {
				if(json['retdic']['status'] == 1)
					$.utility('registerPNClient',true);	
				else
					$.utility('registerPNClient',false);
			} else {
				console.log("initPNS ERROR");
			}
			utilmethods.initServer(true);
		},
		
		pushMessage : function(json) {
			if (json['ret'] === 'ACK') {
				if(json['retdic']['status'] == 1)
					$.utility('setPNMsgReceived',true);	
				else
					$.utility('setPNMsgReceived',false);
			} else {
				console.log("pushMessage ERROR");
			}
			utilmethods.initServer(true);
		},
		
		unregisterPN : function(json) {
			if (json['ret'] === 'ACK') {
				$.utility('setpnUnregister',true);
			} else {
				console.log("unregister ERROR");
			}
			utilmethods.initServer(true);
		},
		
		setpnUnregister : function(param){
			pnUnregister = param;
		},
		
		getpnUnregister : function(){
			return pnUnregister;
		},
		
		setDBRecords : function(records){
			dbRecords = records;
		},
		getDBRecords : function(){
			return dbRecords;
		},
		
		UploadDBRecords : function(json, callbackData) {
			if((json.ret!="NACK") && (json['retdic']['code']!=="AK_ERROR")){
				
				$.utility('setDBRecords',json['retdic']['rows']);	 // SetDBRecords should be set as empty if the rows are empty.. else it will pick older rows..
				if(json['retdic']['recsize'] == 0){
					$.utility("setComActionStatus", "SynchError");
					$.utility('queryDatabase',false);
				}else{
					var page = $.utility('getObject', $.mobileweb['pages'], 'name', json['callbackdata']['page']);
					
					if(json['callbackdata']['ToService'] != undefined && json['callbackdata']['ToService'] != ""){
						var dbSchema = {};
						$.each($.mobileweb['localdb']['schema'],function(key, tableschema){
							if(tableschema['tablename'] === json['callbackdata']['table']){
								$.each(tableschema['fields'], function(i, fieldData){
									if(fieldData['type'] === "INTEGER" || fieldData['type'] === "REAL"){
										dbSchema['' + fieldData['name'] + ''] = "int";	
									}else if(fieldData['type'] === "DATETIME"){
										dbSchema['' + fieldData['name'] + ''] = "date";
									}else{
										dbSchema['' + fieldData['name'] + ''] = fieldData['type'].toLowerCase();
									}
									
								});
							}
						});
						
//						var jsonData = {tablename: json['callbackdata']['ToTable'],database:($.mobileweb['release'] != undefined && $.mobileweb['release'])?'db_' + $.mobileweb['pid']+"_release" : 'db_' + $.mobileweb['pid'],servicename:json['callbackdata']['ToService'],primarykeys:$.utility('getPK',json['callbackdata']['table'], $.mobileweb['localdb']['schema']),dbschema:dbSchema,records:JSON.parse(JSON.stringify(json['retdic']['rows']).replace(/:null,/gi, ":\"null\",").replace(/:null}/gi, ":\"null\"}")), forceflag:json['callbackdata']['forceFlag']};
						var jsonData = {tablename: json['callbackdata']['ToTable'],database:($.mobileweb['release'] != undefined && $.mobileweb['release'])?'db_' + $.mobileweb['pid']+"_release" : 'db_' + $.mobileweb['pid'],servicename:json['callbackdata']['ToService'],primarykeys:$.utility('getPK',json['callbackdata']['table'], $.mobileweb['localdb']['schema']),dbschema:dbSchema,records:JSON.parse(JSON.stringify(json['retdic']['rows']).replace(/:null,/gi, ":\"\",").replace(/:null}/gi, ":\"\"}")), forceflag:json['callbackdata']['forceFlag'], forceUpdate:json['callbackdata']['forceUpdate']};
						$.utility('initCall');
						var timer =	setInterval(function(){
							if($.utility('appendDeviceInfo')!="" || $.utility('appendDeviceInfo')!=null){
								clearInterval(timer);
								
								requestUrl = $.utility('getCommServerDomain')+"syncDB?llcommand=sndmsg" + $.utility('appendDeviceInfo') + "&command=remotesyncdb&project_id=" + $.mobileweb['pid'] + "&version=" + $.mobileweb['version'] + "&os=mw";
								
								var reqParams = requestUrl.substring(requestUrl.indexOf("?")+1);
							    if(reqParams != undefined){
							    	var dataset = JSON.stringify(jsonData);
							    	dataset = dataset.replace(/[%]/g, "%25").replace(/[&]/g, "%26").replace(/[#]/g, "%23");
							    	dataset =  dataset.replace(/[+]/g, "%2B").replace(/[-]/g, "%2D").replace(/[;]/g, "%3B");
							    	reqParams = reqParams + "&dataset="+dataset;
							    	 
							    	if(utilmethods.getServerPort() == "8080") {
							    		
							    		utilmethods.showLoadingIndicator(true);
							    		$.ajax({
							    			url: $.utility('getCommServerDomain')+"llcommpost",
							    			type: "POST",
							    			contentType :"application/x-www-form-urlencoded",
							    			data: reqParams,
							    			dataType: "json",
							    			//crossDomain: true,
							    			//dataType: "text",
							    			success: function(resp) {
							    				console.log("---- Success : POST request for Local to Remote Sync ----");
							    				if(resp.ret == "ACK"){
							    					$.utility("setComActionStatus", "SynchSuccess");
							    					$.utility('queryDatabase',false);
							    				}else{
							    					$.utility("setComActionStatus", "SynchError");
							    					$.utility('queryDatabase',false);
							    				}
							    			},
							    			error : function(err){
							    				console.log("---- Error : POST request for Local to Remote Sync ----");
							    				$.utility("setComActionStatus", "SynchError");
							    				$.utility('queryDatabase',false);
							    			}
							    		});
							    		
							    	}else {
							    		$.utility('sendPOSTRequest', reqParams, 'remotesyncdb');
							    	}
									
								}
																
							}
						});
					}else{
						
						var onSuccessEvent = '';
						if((json['callbackdata']['events'] != undefined) && (json['callbackdata']['events']['Success'].length > 0)){
							onSuccessEvent = json['callbackdata']['events']['Success'];
						}
						new $.actions(page, null, [{method:"Select", category:"DBAction",fromTable: json['callbackdata']['table'], callAnotherServiceFlag : true, callbackmethod : "SelectNewService", fromDB : json['callbackdata']['fromDB'], toDB : "localdb",forceFlag : json['callbackdata']['forceFlag'],forceUpdate : json['callbackdata']['forceUpdate'],events:json['callbackdata']['events'],
							params:{
								tablename: json['callbackdata']['ToTable'],
								where: "",
								order: "",
								fields:""// $.utility('getColumns',pagedef['data']['tablename'],[],pagedef['children'])
								}
						}]).execute();
					}
				}
				
			}else {
				utilmethods.showLoadingIndicator(false);
				var pagedef=$.utility('getObject',$.mobileweb['pages'],'name',json.callbackdata.page);
				if(json['retdic']['code']=="HLCOMM_ERROR"){
					
				}else{
					$.mobileweb['__ERR_CODE__'] = json['retdic']['code'];
					$.mobileweb['__ERR_MSG__'] = (json['retdic']['msg'] == undefined ? json['retdic']['error_message'] : json['retdic']['msg']);
				}
				
				$.utility("setComActionStatus", "SynchError");	
				$.utility('queryDatabase', false);
			}
		},	
		
		//'RemoteDB >> LocalDB' sync
		SelectNewService : function(json, callbackData) {
			var update = [];
			var insert = [];
			if(callbackData != undefined && callbackData['service'] === "LocalDB"){
				var page = $.utility('getObject', $.mobileweb['pages'], 'name', callbackData['page']);
				var toPrimaryKey;
				if(callbackData['toDB'] == "localdb")
					toPrimaryKey = $.utility('getPK',callbackData['table'], $.mobileweb['localdb']['schema']);
				else
					toPrimaryKey = $.utility('getPK',callbackData['table'], $.mobileweb['comdb']['schema']);
				toPrimaryKey.sort();
				
				var fromPrimaryKey;
				if(callbackData['fromDB'] == "localdb")
					fromPrimaryKey = $.utility('getPK',callbackData['fromTable'], $.mobileweb['localdb']['schema']);
				else
					fromPrimaryKey = $.utility('getPK',callbackData['fromTable'], $.mobileweb['comdb']['schema']);
				fromPrimaryKey.sort();
				
				var tempArr= [];
				var count = 0;
				
				// Managing batch request in one transaction only-- This code increase perfomance to insert/ update large no of records. -- updated on 20thJan, 2016 by Sachit
				if(dbRecords.length == 0){
					$.utility("setComActionStatus", "SynchSuccess");
				}else{
					$.mobileweb['localdb']['instance'].transaction(function (tx) {
						
						$.each(dbRecords, function(dbRecordsKey, dbRecordsValue){
							delete dbRecordsValue.row_index;
							if(json['retdic']['rows'].length == 0){
								var fieldNames = [];
								var fieldValues = [];
								var qnMarks = [];
								$.each(dbRecordsValue, function(fieldName, fieldValue){
									fieldNames.push(fieldName);
									fieldValues.push(fieldValue);
									qnMarks.push('?');
								});
//								console.log(['INSERT INTO ', callbackData['table'], ' (', fieldNames.join(), ') VALUES (', qnMarks.join(), ')'].join(''));
//								console.log(fieldValues);
								tx.executeSql(['INSERT INTO ', callbackData['table'], ' (', fieldNames.join(), ') VALUES (', qnMarks.join(), ')'].join(''), fieldValues,
									function(tx,result){
										if(dbRecords.length -1 == dbRecordsKey){
											$.utility("setComActionStatus", "SynchSuccess");
										}
									},
									function(tx, error){
										$.utility("setComActionStatus", "SynchError");
									});
							}else{
								//in case of 'view', there would not be any primary key.
								if(fromPrimaryKey.length == 0){
									//HOTFIX. Date: 04-Jan-2019
									fromPrimaryKey = toPrimaryKey;
								}
								
								var flag = true;
								$.each(json['retdic']['rows'], function(jsonRecordsKey, jsonRecordsValue){
									flag = true;
									for(var i=0; i< toPrimaryKey.length; i++){
										if(dbRecordsValue[fromPrimaryKey[i]] == jsonRecordsValue[toPrimaryKey[i]] && flag){
											flag = true;
										}else{
											flag = false;
										}
									}
									
									//in case of 'view', there would not be any primary key. Dated:25-Oct-2017
									if(!flag && fromPrimaryKey.length == 0){	//here we consider only 'fromTable' has RemoteDB-view. Dated:25-Oct-2017
									  	var viewTable = utilmethods.getObject($.mobileweb['comdb']['schema'], 'tablename', callbackData['fromTable']);
									  	if(viewTable != undefined && viewTable['view'] != undefined){
									  		flag = viewTable['view'];
									  	}
									}
									
									if(flag){
										json['retdic']['rows'].splice(jsonRecordsKey, 1);
										return false; // exists each loop if found
									}
								});
								
								if(flag){
									if(callbackData['forceFlag'] == "true" || callbackData['forceUpdate'] == "true"){
										var whereCondition = "";
										var noOfPk = toPrimaryKey.length;
										var recordset = [];
										$.each(dbRecordsValue, function(fieldName, fieldValue){
											recordset.push([fieldName+ ' = \''+fieldValue+ '\'']);
										});

										for(var i=0; i< toPrimaryKey.length; i++){
											if(i != noOfPk -1){
												whereCondition = whereCondition + toPrimaryKey[i].toString() + "='"+dbRecordsValue[toPrimaryKey[i].toString()]+"' AND ";
											}else{
												whereCondition = whereCondition + toPrimaryKey[i].toString() + "='"+dbRecordsValue[toPrimaryKey[i].toString()]+"'";
											}
										}
									
										tx.executeSql(['UPDATE ', callbackData['table'], ' SET ', recordset.join(), ' WHERE ', whereCondition].join(''), [],
											function(tx,result){
												if(dbRecords.length -1 == dbRecordsKey){
													$.utility("setComActionStatus", "SynchSuccess");
												}
											},
											function(tx, error){
												$.utility("setComActionStatus", "SynchError");
											}
										);
									}else{
										if(dbRecords.length -1 == dbRecordsKey){
											$.utility("setComActionStatus", "SynchSuccess");
										}
									}
								}else{
									var fieldNames = [];
									var fieldValues = [];
									var qnMarks = [];
									$.each(dbRecordsValue, function(fieldName, fieldValue){
										fieldNames.push(fieldName);
										fieldValues.push(fieldValue);
										qnMarks.push('?');
									});
									//console.log(fieldValues);
									tx.executeSql(['INSERT INTO ', callbackData['table'], ' (', fieldNames.join(), ') VALUES (', qnMarks.join(), ')'].join(''), fieldValues,
										function(tx,result){
											if(dbRecords.length -1 == dbRecordsKey){
												$.utility("setComActionStatus", "SynchSuccess");
											}
										},
										function(tx, error){
											$.utility("setComActionStatus", "SynchError");
										}
									);
								}
							}
						});
					});
				}
			}else{
				if((json.ret!="NACK")&&(json['retdic']['code']!=="AK_ERROR")){
					var page = $.utility('getObject', $.mobileweb['pages'], 'name', json['callbackdata']['page']);
					var toPrimaryKey = $.utility('getPK',json['callbackdata']['table'], $.mobileweb[json['callbackdata']['toDB']]['schema']);
					var fromPrimaryKey = $.utility('getPK',json['callbackdata']['fromTable'], $.mobileweb[json['callbackdata']['fromDB']]['schema']);;
					var tempArr= [];
					var count = 0;
					$.each(dbRecords, function(dbRecordsKey, dbRecordsValue){
						delete dbRecordsValue.row_index;
						if(count != json['retdic']['rows'].length){
							$.each(json['retdic']['rows'], function(jsonRecordsKey, jsonRecordsValue){
								var flag = true;
								for(var i= 0; i < toPrimaryKey.length; i++){
									for(var j = 0; j < fromPrimaryKey.length; j++){
										if(fromPrimaryKey[j] === toPrimaryKey[i]){
											if(dbRecordsValue[fromPrimaryKey[j]] == jsonRecordsValue[toPrimaryKey[i]] && flag){
												flag = true;
											}else{
												flag = false;
											}
										}
									}
								}
								if(flag){
									update[update.length] = dbRecordsValue;
									tempArr[count] = dbRecordsKey;
									count++;
								}
							});
						}
					});

					for(var i =tempArr.length - 1; i >= 0; i--){
						dbRecords.splice(tempArr[i],1);
					}
					insert = dbRecords;
					if(json['callbackdata']['toDB'] === "comdb"){
						var errFlag = false;
						$.each(update, function(key, value){

							var tempAction = {};
							if(json['callbackdata']['forceFlag'] === "true" || callbackData['forceUpdate'] === "true"){
								var whereCondition = "";
								var noOfPk = toPrimaryKey.length;

								for(var i = 0; i < toPrimaryKey.length; i++){
									if(value[toPrimaryKey[i]] != undefined){
										if(i != noOfPk -1){
											whereCondition = whereCondition + toPrimaryKey[i] + "='"+value[toPrimaryKey[i]]+"' AND ";
										}else{
											whereCondition = whereCondition + toPrimaryKey[i] + "='"+value[toPrimaryKey[i]]+"'";
										}
									}else{
										errFlag = true;
										return false;
									}
									
								}
								tempAction = {method:"Update", category:"ComAction", flag : true,
										params:{
											rec:{
											},
											servicename:"Mobilous",
											table:json['callbackdata']['table'],
											where:whereCondition
										}
								};
								tempAction.params.rec = value;
								//tempAction.events = json['callbackdata']['events'];

								if(insert.length == 0 && update.length -1 == key){
									/*tempAction.events = {Success:[]};
									tempAction.events.Success = json.callbackdata.events.Success;*/
									$.utility("setComActionStatus", "SynchSuccess");
								}
								new $.actions(page, null, [tempAction]).execute();
							}
						});
						if(!errFlag){
							$.each(insert, function(key, value){
								var tempAction = {};
								tempAction = {method:"Insert", category:"ComAction", flag : true,
										params:{
											rec:{
											},
											servicename:"Mobilous",
											table:json['callbackdata']['table'],
										}
								};
								tempAction.params.rec = value;
								tempAction.events = {Success:[]};
								if(insert.length -1 == key){
									//tempAction.events.Success = json.callbackdata.events.Success;
									$.utility("setComActionStatus", "SynchSuccess");
									
								}
								
								new $.actions(page, null, [tempAction]).execute();
							});
						}else{
							$.utility("setComActionStatus", "SynchError");
						}
						

					}else if(json['callbackdata']['toDB'] === "localdb"){
						$.each(update, function(key, value){

							if(json['callbackdata']['forceFlag'] === "true" || callbackData['forceUpdate'] === "true"){
								var whereCondition = "";
								var noOfPk = toPrimaryKey.length;

								for(var i in toPrimaryKey){
									if(i != noOfPk -1){
										whereCondition = whereCondition + toPrimaryKey[i] + "='"+value[toPrimaryKey[i]]+"' AND ";
									}else{
										whereCondition = whereCondition + toPrimaryKey[i] + "='"+value[toPrimaryKey[i]]+"'";
									}
								}
								var tempAction = {};
								tempAction = {method:"Update", category:"DBAction", flag : true,
										params:{
											record:value,
											tablename:json['callbackdata']['table'],
											where:whereCondition
										}
								};
								for(var childKey in value){
									tempAction.params.record[childKey] = value[childKey];
								}
								if(insert.length == 0 && update.length -1 == key){
									tempAction.events = {Success:[]};
									tempAction.events.Success = json.callbackdata.events.Success;
								}
								new $.actions(page, null, [tempAction]).execute();
							}
						});
						$.each(insert, function(key, value){
							var tempAction = {};
							tempAction = {method:"Insert", category:"DBAction", flag : true,
									params:{
										record:{
										},
										tablename:json['callbackdata']['table'],
									}
							};
							tempAction.params.record = value;
							if(insert.length -1 == key){
								tempAction.events = {Success:[]};
								tempAction.events.Success = json.callbackdata.events.Success;

							}
							new $.actions(page, null, [tempAction]).execute();
						});
					}

					utilmethods.showLoadingIndicator(false);

					//	}
				}else{
					$.mobileweb['__ERR_CODE__'] = json['retdic']['code'];
					$.mobileweb['__ERR_MSG__'] = (json['retdic']['msg'] == undefined ? json['retdic']['error_message'] : json['retdic']['msg']);
					
				}
			}
			$.utility('queryDatabase', false);
		},	
		
		RemoteProcessContinue : function(json) {
			if((json.ret!="NACK")&&(json['retdic']['status']==1)){/*
				if(json['callbackdata']['events'] != undefined && json['callbackdata']['events']['Success'] != undefined){
					var page = $.utility('getObject', $.mobileweb['pages'], 'name', json['callbackdata']['page']);
					new $.actions(page, null, json['callbackdata']['events']['Success']).execute();
				}
				
			*/}else{
					$.mobileweb['__ERR_CODE__'] = json['retdic']['code'];
					$.mobileweb['__ERR_MSG__'] = (json['retdic']['msg'] == undefined ? json['retdic']['error_message'] : json['retdic']['msg']);
					
			}
		},
		
		setRemoteNumResponseReceived : function(param) {
			remoteNumResponse = param;
		},
		
		getRemoteNumResponseReceived : function() {
			return remoteNumResponse;
		},
		
		RemoteSelect : function(json) {
			if((json.ret!="NACK")&&(json['retdic']['code']!=="AK_ERROR")){
				var page = {};
				if(json['callbackdata']["callback"] != undefined && (json['callbackdata']["callback"] === "createDBListViewPageRows" || json['callbackdata']["callback"] === "reloadDBListViewPageRows")){
					$.each($.mobileweb['pages'], function(pageNumber, childPage){
						if(childPage['name'] === json['callbackdata']['parentPage']){
							$.each(childPage['children'], function(pageNumber, splitViewChildPage){
								if(splitViewChildPage['name'] === json['callbackdata']['page']){
									page = splitViewChildPage;
								}
							});
						}
					});
					if($.isEmptyObject(page)){
						page =  $.utility('getObject',$.mobileweb['pages'],'name',json['callbackdata']['page']);
					}
					json['retdic']['rows']['transferBaseData'] = {'isRecordAlreadyAdded':false};
					page['data']['contents'][0] = json['retdic']['rows'];
					page['data']['contents']['rows'] = json['retdic']['rows'].length;
					page['data']['updated'] = true;
					$.utility('queryDatabase', false);
					$.setRemoteDBListViewPage(page['data']['contents'], page['name']);
					if(json['callbackdata']["callback"] === "reloadDBListViewPageRows"){
						page['data']['contentsReloaded'] = true;
					}
					
				}else if(json['callbackdata']["callback"] != undefined && json['callbackdata']["callback"] === "createRemoteViewPageRows"){
					$.each($.mobileweb['pages'], function(pageNumber, childPage){
						if(childPage['name'] === json['callbackdata']['parentPage']){
							$.each(childPage['children'], function(pageNumber, splitViewChildPage){
								if(splitViewChildPage['name'] === json['callbackdata']['page']){
									page = splitViewChildPage;
								}
							});
						}
					});
					if($.isEmptyObject(page)){
						page =  $.utility('getObject',$.mobileweb['pages'],'name',json['callbackdata']['page']);
					}
					json['retdic']['rows']['transferBaseData'] = {'isRecordAlreadyAdded':false};
					page['data']['contents'][0] = json['retdic']['rows'];
					page['data']['contents']['rows'] = json['retdic']['rows'].length;
					page['data']['updated'] = true;
					$.utility('queryDatabase', false);
					$.setRemoteViewPage(page['data']['contents']);
				}else if(json['callbackdata']["callback"] != undefined && json['callbackdata']["callback"] === "createRemoteTileList"){
					if($.isEmptyObject(page)){
						page =  $.utility('getObject',$.mobileweb['pages'],'name',json['callbackdata']['page']);
					}
					json['retdic']['rows']['transferBaseData'] = {'isRecordAlreadyAdded':false};
					//page['data']['contents'][0] = json['retdic']['rows'];
					page['data']['contents'][0] = $.extend({}, page['data']['contents'][0], json['retdic']['rows'] );//Bug #11319 fix
					page['data']['contents'][json['callbackdata']['callbackUI']] = json['retdic']['rows'];
					page['data']['contents']['rows'] = json['retdic']['rows'].length;
					page['data']['updated'] = true;
					$.utility('queryDatabase', false);
					$.utility('setComActionStatus', "Success");
					$.utility('setComActionStatusTileList', "Success");
					//$.setRemoteViewPage(page['data']['contents']);
				}else if(json['callbackdata']['callingMethod'] === "RemoteNumRecords"){

					if(json['retdic']['rows'] == undefined){
						json['retdic']['rows'] = [];
						if(json['retdic']['count'] != undefined){		//"retdic":{"count":X}
							json['retdic']['rows'].length = json['retdic']['count'];
						}
					}
					$.mobileweb['__NUMREC__'] = json['retdic']['rows'].length;
					if ($("body").find("#__NUMREC__").length == 0 ) {
						$('body').append("<input id='__NUMREC__' type='text' hidden='true'>"+ $.mobileweb["__NUMREC__"] +"</input>");
					}
					$("#__NUMREC__").val($.mobileweb['__NUMREC__']);

					$.utility('queryDatabase', false);
					$.utility('setRemoteNumStatus', "Success");
					$.utility('setComActionStatus', "Success");
					utilmethods.showLoadingIndicator(false);
					
//					page = $.utility('getObject', $.mobileweb['pages'], 'name', json['callbackdata']['page']);
//					if(page['reloadRemoteNum'] != undefined && page['reloadRemoteNum'] == "reloadRemoteNum")
//						page['reloadRemoteNum'] = "reloadRemoteNumTotal";
				}else{

					page = $.utility('getObject', $.mobileweb['pages'], 'name', json['callbackdata']['page']);
					if(json['callbackdata']['comboBox'] != undefined && json['callbackdata']['comboBox']){
						var jsonObj = JSON.parse(JSON.stringify(json['callbackdata']['callingMethod']).replace(/"/g,"").replace(/'/g,"\""));
					//	comboBoxDataLoadingStatus= [jsonObj['uiobject']['id']];	
						comboBoxDataLoadingStatus[jsonObj['uiobject']['id']] = {};	
						comboBoxDataLoadingStatus[jsonObj['uiobject']['id']] = {'data':json['retdic']['rows'], 'loadingStatus':true};	
						//comboBoxDataLoadingStatus[jsonObj['uiobject']['id']] = {'loadingStatus':true};	
						/*$.each(page['children'],function(key,child){
							
							if(jsonObj['uiobject']['ui'] === "comboBox"){
								if(jsonObj['uiobject']['id'] === child['id']){
									$.each(json['retdic']['rows'],function(i,data){
										page['children'][key]['combo_options']['optionsID'][i]=data[jsonObj['uiobject']['fieldname']];
										var chunks = jsonObj['uiobject']['displayText'].split("[");
										var displayText = jsonObj['uiobject']['displayText'];
										for ( var k =0; k < chunks.length; k++) {
											if (chunks[k].indexOf("]") != -1) {
												var j = chunks[k].indexOf("]");
												var org = "[" + chunks[k].substring(0, j) + "]";
												var fin = data[chunks[k].substring(0, j)];
												displayText = displayText.replace(org, fin);
											}
										}
										page['children'][key]['combo_options']['optionsValue'][i]=displayText;
									});
									page['comboBoxData'][child['id']]['isLoaded'] = true;
								}
								//	new $.actions(page, null,json.callbackdata.events.Success).execute();
								utilmethods.showLoadingIndicator(false);
								$.utility('setComActionStatus', "Success");
							}
						});*/
						$.utility('setComActionStatus', "Success");
					}else{
						
						if (page['type'] === 'RemoteTableViewList'){
							if(json['callbackdata']['callingMethod'] === "changeCondition"){
								page['data']['contents'] = [];
							}
							
							if(json['callbackdata']['callback'] != undefined && json['callbackdata']['callback'] === "loadMoreRecords"){
								page['data']['contents'] = page['data']['contents'].concat(json['retdic']['rows']);
								page['data']['contents']['loaded'] = true;
								page['data']['contents']['offset'] = json['callbackdata']['offset'];
								if(json['retdic']['recsize'] < 25){
									page['data']['contents']['allRecordsLoaded'] = true;
								}else{
									page['data']['contents']['allRecordsLoaded'] = false;
								}
								page['data']['contents']['rows'] = json['retdic']['recsize'];
							}else{
								
								var isQuery_remoteselect = false;
								// Manage 'Remote Select' action response >>> page['data']['contents'] should not be altered.
								if(json['callbackdata']['table'] != page['data']['tablename']){
									if(json['retdic'] != undefined){
										if(json['retdic']['recsize'] == "0" && json['retdic']['rows'].length < 1){
											$.utility('setComActionStatus', "Error");	// ...trigger OnError Event
											$.utility('queryDatabase',false);
											//page['data']['updated'] = true;
											return;
										}else if(json['retdic']['recsize'] == "1"){
											var _rownum = page['data']['contents']['currentRow'];
											if(!isNaN(_rownum)){
												if(page['data']['contents'] != undefined && page['data']['contents'][_rownum] != undefined)
													page['data']['contents'][_rownum] = $.extend({}, page['data']['contents'][_rownum] , json['retdic']['rows'][0]);
											}
										}
									}
									isQuery_remoteselect = true;
								}
								if(!isQuery_remoteselect){
									page['data']['contents']['rows'] = json['retdic']['rows'].length;
									if(!$.isEmptyObject(page['data']['contents'])){
										if(page['data']['contents']['transferBaseData'] == undefined){
											for(var i in json['retdic']['rows'] ){
												var count = 0;
												if(page['data']['contents'][0] != undefined){
													$.each(page['data']['contents'][0], function(key, value){
														count =0;
														$.each(json['retdic']['rows'][i], function(dbFieldName, dbFieldValue){
															if(dbFieldName == key){
																count++;
																return false;
															}
														});	
														if(count == 0)
															json['retdic']['rows'][i][key] = value;
													});
												}
											}
											json['retdic']['rows']['transferBaseData'] = {'isRecordAlreadyAdded':true};
											if(json['retdic']['rows'].length != 0){
												page['data']['contents'] = json['retdic']['rows'];
												$.utility('setRemoteDBRecords', json['retdic']['rows']);
											}else{ //Bug #13417 fix
												if(!page['datatransfer'])
													page['data']['contents'] = [];
											}
											page['data']['contents']['totalRecords'] = json['retdic']['recsize'];
											page['data']['contents']['offset'] = json['callbackdata']['offset'];
											
										}else{
											if(!page['data']['contents']['transferBaseData']['isRecordAlreadyAdded']){			//'isRecordAlreadyAdded' ==> false
												json['retdic']['rows']['transferBaseData'] = {'isRecordAlreadyAdded':false};
												
												if($.isEmptyObject(page['data']['contents'])){
													page['data']['contents'] = json['retdic']['rows'];
												}else{
													if(json['retdic']['rows'].length == 0){
														page['data']['contents'] = json['retdic']['rows'];
													}else if(page['data']['contents'].length > json['retdic']['rows'].length){
														var tempData = page['data']['contents'][0];
														page['data']['contents'] = json['retdic']['rows'];
														for(var i in page['data']['contents']  ){
															$.each(tempData, function(key, value){
																if(page['data']['contents'][i][key] === undefined){
																	page['data']['contents'][i][key] = value;
																}
															});
														}
													}else{	
														for(var i in json['retdic']['rows'] ){
															if(page['data']['contents'][i] != undefined){
																$.each(json['retdic']['rows'][i], function(key, value){
																	page['data']['contents'][i][key] =value;
																	
																});
															}else{
																page['data']['contents'][i] = {};
																jQuery.extend(page['data']['contents'][i],page['data']['contents'][0]);
																$.each(json['retdic']['rows'][i], function(key, value){
																	page['data']['contents'][i][key] =value;
																	
																});
															}
														}
													}
												}
												$.utility('setRemoteDBRecords', json['retdic']['rows']);
												page['data']['contents']['totalRecords'] = json['retdic']['recsize'];
												page['data']['contents']['offset'] = json['callbackdata']['offset'];
												
											}else if(page['data']['contents']['transferBaseData']['isRecordAlreadyAdded']) {
												json['retdic']['rows']['transferBaseData'] = {'isRecordAlreadyAdded':false};
												
												if($.isEmptyObject(page['data']['contents'])){
													page['data']['contents'] = json['retdic']['rows'];
												}else{
													if(json['retdic']['rows'].length == 0){
														page['data']['contents'] = json['retdic']['rows'];
													}else if(page['data']['contents'].length > json['retdic']['rows'].length){
														var tempData = page['data']['contents'][0];
														page['data']['contents'] = json['retdic']['rows'];
														for(var i in page['data']['contents']  ){
															$.each(tempData, function(key, value){
																if(page['data']['contents'][i][key] === undefined){
																	page['data']['contents'][i][key] = value;
																}
															});
														}
													}else{
														for(var i in json['retdic']['rows'] ){
															if(page['data']['contents'][i] != undefined){
																$.each(json['retdic']['rows'][i], function(key, value){
																	page['data']['contents'][i][key] =value;
																	
																});
															}else{
																page['data']['contents'][i] = {};
																jQuery.extend(page['data']['contents'][i],page['data']['contents'][0]);
																$.each(json['retdic']['rows'][i], function(key, value){
																	page['data']['contents'][i][key] =value;
																	
																});
															}
														}
													}
													
												}
												
												page['data']['contents']['totalRecords'] = json['retdic']['recsize'];
												page['data']['contents']['offset'] = json['callbackdata']['offset'];
												$.utility('setRemoteDBRecords', json['retdic']['rows']);
												$.utility('setComActionStatus', "Success");
												utilmethods.showLoadingIndicator(false);
											
											}
										}
									}else if($.isEmptyObject(page['data']['contents'])){
										json['retdic']['rows']['transferBaseData'] = {'isRecordAlreadyAdded':false};
										page['data']['contents'] = json['retdic']['rows'];
										page['data']['contents']['offset'] = json['callbackdata']['offset'];
										page['data']['contents']['totalRecords'] = json['retdic']['recsize'];
									}
								}

								if(json['callbackdata']['callingMethod'] === "changeCondition"){
									page['data']['contents']['pageCallback'] = json['callbackdata']['callback'];
									utilmethods.showLoadingIndicator(false);
									$.utility('setComActionStatus', "Success");
									
								}else if(json['callbackdata']['callingMethod'] === "reload"){
									page['data']['contents']['reload'] = true
									utilmethods.showLoadingIndicator(false);
									$.utility('setComActionStatus', "Success");
								}else if(json['callbackdata']['callingMethod'] === "direct"){
									utilmethods.showLoadingIndicator(false);
									$.utility('setComActionStatus', "Success");
								}

							}

						}else if(page['type'] === 'RemoteTableView'){
							/*if(!$.isEmptyObject(page['data']['contents'])){
							$.each(page['data']['contents'][0], function(key, value){
								json['retdic']['rows'][0][key] = value;
							});
						}
							 */
							
							if(json['retdic']['rows'] != null){
								if(page['data']['contents'].length == 0){
									page['data']['contents'][0] = json['retdic']['rows'][0];
								}else{
									if(page['reverse'] != undefined && page['reverse']){
										jQuery.extend(json['retdic']['rows'][0],page['data']['contents'][0]);
									}
									
									jQuery.extend(page['data']['contents'][0],json['retdic']['rows'][0]);
								}
								page['reverse'] = undefined;
							}
							$.utility('setComActionStatus', "Success");
						}else {
							$.utility('setRemoteDBRecords', json['retdic']['rows']);
							page['data']['contents']['rows'] = json['retdic']['recsize'];
							if(page['data']['contents'][0] == undefined)
								page['data']['contents'][0] = {};

							jQuery.extend(page['data']['contents'][0],json['retdic']['rows'][0]);

							var pagedef=$.utility('getObject',$.mobileweb['pages'],'name',json.callbackdata.page);
							utilmethods.showLoadingIndicator(false);
							if (json.ret === 'ACK'){
								if(json.retdic.recsize == "0" && json.retdic.rows.length < 1){	// trigger OnError Event..
									$.utility('setComActionStatus', "Error");
								}else {
									$.utility('setComActionStatus', "Success");
								}
							}
							else {
								$.utility('setComActionStatus', "Error");
							}
							
							/*if(json.callbackdata.events.DetectRecords != undefined && json.callbackdata.events.DetectRecords.length != 0){
								for(var i in json['retdic']['rows']){
									var tempPagedef = $.utility('clone', pagedef);
									tempPagedef['data']['contents'] = json['retdic']['rows'][i];
									//new $.actions(tempPagedef, null,json.callbackdata.events.DetectRecords).execute();
								}
							}*/
							page['data']['contents']['offset'] = json['callbackdata']['offset'];

						}
					}
					page['data']['updated'] = true;
					$.utility('queryDatabase', false);
				}
			}else {
				utilmethods.showLoadingIndicator(false);
				if(json['retdic']['code']=="HLCOMM_ERROR" && $.mobileweb["state"] === "preview"){
					var pagedef=$.utility('getObject',$.mobileweb['pages'],'name',json.callbackdata.page);
				//	if (json.callbackdata.events.Error != undefined && !$.isEmptyObject(json.callbackdata.events.Error)){
						//new $.actions(page, null,json.callbackdata.events.Error).execute();
						$.utility('setComActionStatus', "Error");
				//	}else{
						//{method:"Alert",category:"WarningAction",params:{message:'ÃƒÂ£Ã†â€™Ã‚Â¡ÃƒÂ£Ã¢â‚¬Å¡Ã‚Â¢ÃƒÂ£Ã†â€™Ã¢â‚¬Â°ÃƒÂ£Ã¢â‚¬Å¡Ã¢â‚¬Å¡ÃƒÂ£Ã¯Â¿Â½Ã¢â‚¬â€�ÃƒÂ£Ã¯Â¿Â½Ã¯Â¿Â½ÃƒÂ£Ã¯Â¿Â½Ã‚Â¯ÃƒÂ£Ã†â€™Ã¢â‚¬ËœÃƒÂ£Ã¢â‚¬Å¡Ã‚Â¹ÃƒÂ£Ã†â€™Ã‚Â¯ÃƒÂ£Ã†â€™Ã‚Â¼ÃƒÂ£Ã†â€™Ã¢â‚¬Â°ÃƒÂ£Ã¢â‚¬Å¡Ã¢â‚¬â„¢ÃƒÂ£Ã¯Â¿Â½Ã¢â‚¬ï¿½ÃƒÂ§Ã‚Â¢Ã‚ÂºÃƒÂ¨Ã‚ÂªÃ¯Â¿Â½ÃƒÂ¤Ã‚Â¸Ã¢â‚¬Â¹ÃƒÂ£Ã¯Â¿Â½Ã¢â‚¬Â¢ÃƒÂ£Ã¯Â¿Â½Ã¢â‚¬Å¾', title:'ÃƒÂ£Ã†â€™Ã‚Â­ÃƒÂ£Ã¢â‚¬Å¡Ã‚Â°ÃƒÂ£Ã¢â‚¬Å¡Ã‚Â¤ÃƒÂ£Ã†â€™Ã‚Â³ÃƒÂ£Ã¯Â¿Â½Ã‚Â§ÃƒÂ£Ã¯Â¿Â½Ã¯Â¿Â½ÃƒÂ£Ã¯Â¿Â½Ã‚Â¾ÃƒÂ£Ã¯Â¿Â½Ã¢â‚¬ÂºÃƒÂ£Ã¢â‚¬Å¡Ã¢â‚¬Å“', canceltitle:''},condition:{},events:{Error:[],onTapOk:[],Success:[],onTapCancel:[],}}
						$.errorhandler('alertBox',json.retdic.code + " : " + json.retdic.msg, "");
						$.utility('setComActionStatus', "Error");
				//	}
				}else{
					$.mobileweb['__ERR_CODE__'] = json['retdic']['code'];
					$.mobileweb['__ERR_MSG__'] = (json['retdic']['msg'] == undefined ? json['retdic']['error_message'] : json['retdic']['msg']);
				}
				$.utility('setComActionStatus', "Error");
				$.utility('queryDatabase', false);
			}
		},			
			
		RemoteSelectActionCallback : function(json){
			if((json.ret!="NACK")&&(json['retdic']['code']!=="AK_ERROR")){
				$.utility('setRemoteDBRecords', json['retdic']['rows']);
				$.utility('setComActionStatus', "Success");
			}else{
				$.utility('setComActionStatus', "Error");
			}
			$.utility('queryDatabase', false);
			utilmethods.showLoadingIndicator(false);
		},
		
		PageNumRecords : function(json) {
			if((json.ret !== "NACK") && (json['retdic']['code'] !== "AK_ERROR")){
				if(json['retdic']['rows'] == undefined){
					json['retdic']['rows'] = [];
					if(json['retdic']['count'] != undefined){		//"retdic":{"count":X}
						json['retdic']['rows'].length = json['retdic']['count'];
					}
				}
				pageRecordsTotal = json['retdic']['rows'].length;
				$.mobileweb['__PAGENUMREC__'] = pageRecordsTotal;
				$.utility('queryDatabase', false);
				$.utility('setComActionStatus', "Success");
				utilmethods.showLoadingIndicator(false);
				//console.log(json);
			}
		},
		
		BulkUpload : function(json) {
			if((json.ret !== "NACK") && (json['retdic']['code'] !== "AK_ERROR")){
				
				if (json['callbackdata'] != undefined) {
					var page = $.utility('getObject',$.mobileweb['pages'],'name',json['callbackdata']['page']);					
					if (json['callbackdata']['callingMethod'] === "UploadRecordsToRemoteDB") {
						if(!page['data']) {
							page['data'] = {'contents': []};
						}
						page['data']['contents'][0] = $.extend({}, page['data']['contents'][0], json['retdic']['rows'][0]);						
					}				
				}
				//$.utility('setComActionStatus', "Success");
				$.utility('setBulkUploadActionStatus', "Success");
			}else {
				
				utilmethods.showLoadingIndicator(false);
				if(json['retdic']['code'] == "HLCOMM_ERROR" && $.mobileweb["state"] === "preview"){
					$.errorhandler('alertBox',json.retdic.code + " : " + json.retdic.msg, "");
				}else{
					$.mobileweb['__ERR_CODE__'] = json['retdic']['code'];
					$.mobileweb['__ERR_MSG__'] = (json['retdic']['msg'] == undefined ? json['retdic']['error_message'] : json['retdic']['msg']);
				}
				//$.utility('setComActionStatus', "Error");
				$.utility('setBulkUploadActionStatus', "Error");
			}
			
			$.utility('queryDatabase', false);
		},
		
		setSessionData : function(param,key){
			if(param['u_id'] === undefined)
				param['u_id'] = "";
			key = key + "_" + param['page_name'] + "_" + param['u_id'];
			sessionStorage.setItem(key, JSON.stringify(param));
		},
		
		getSessionData : function(param,uid){
			if(uid === undefined)
				uid = "";
			param = param + "_" + $.mobileweb.getCurrentPage().getName() + "_" + uid;
			sessionData = sessionStorage.getItem(param);
			return sessionData;
		},
		
		clearSessionData : function(){
			var keyAK, sessionAK;
			for(let key in sessionStorage) {
			  if (!sessionStorage.hasOwnProperty(key)) {
			    continue; // skip keys like "setItem", "getItem" etc
			  }
			  if(key.indexOf('_ak') > -1){
				  keyAK = key;
				  sessionAK = sessionStorage.getItem(key);
			  }
			}
			
			sessionStorage.clear();
			
			if(keyAK && sessionAK) {
				sessionStorage.setItem(keyAK, sessionAK);
			}
		},
		
		showCustomKeyboard : function(childId,keyboardType){
			$('#'+childId).attr('readonly','readonly');
			var keys = [];
			if(keyboardType == "Phone"){
				keys = [
					'7 8 9 {b}',
					'4 5 6 {empty:2.9}',
					'1 2 3 {empty:2.9}',
					'{0:2.1} - {enter}'
				];
			}else if(keyboardType == "Time"){
				keys = [
					'7 8 9 {b}',
					'4 5 6 {empty:2.9}',
					'1 2 3 {empty:2.9}',
					'{0:2.1} : {enter}'
				];
			}else if(keyboardType == "Number"){
				keys = [
					'7 8 9 {b}',
					'4 5 6 {empty:2.9}',
					'1 2 3 {empty:2.9}',
					'{0:2.1} . {enter}'
				];
			}
			if(keys.length != 0){
				$('#'+childId)
				.keyboard({
					layout: 'custom',
					customLayout: {
						'normal' : keys
					},
					restrictInput : true,
					restrictInclude : 'a b c d e f',
					useCombos : false,
					acceptValid : true,
					autoAccept : true,
					usePreview:false,
					validate : function(keyboard, value, isClosing){
						return value.length >= 0;
					}
			});
			}
		},
		
		setPNToken : function(param){
			pnToken = param;
			$.mobileweb["__CLIENTID__"] = param;
		},
		
		getPNToken : function(){
			return pnToken;
		},
		
		registerPNClient : function(param){
			registerpnclient = param;
		},
		
		isPNClientRegisterd : function(){
			return registerpnclient;
		},
		
		setPNMsgReceived : function(param){
			pnMsgReceived = param;
		},
		
		isPNMsgReceived : function(){
			return pnMsgReceived;
		},
		
		RemoteProcess : function(json) {
			var page = {};
			if(json.callbackdata.parentType === "SplitView"){
				page = $.utility('getObject', $.mobileweb['pages'], 'name', json.callbackdata.page);
			}else{
				page = $.utility('getObject', $.mobileweb['pages'], 'name', json.callbackdata.page);
			}
			if (json.ret === 'ACK') {
				$.each($.mobileweb['pages'],function(i, page) {
					if ((page['type'] === 'RemoteTableViewList')|| (page['type'] === 'RemoteTableView'))
							if (page['data']['tablename'] === json.callbackdata.table)
								page['data']['updated'] = false;
				});
				
				utilmethods.showLoadingIndicator(false);
				/*if (json.callbackdata.events.Success != undefined){
					//new $.actions(page, null,json.callbackdata.events.Success).execute();
					$.utility('setComActionStatus', "Success");
				}*/
				$.utility('setComActionStatus', "Success");
				
			}else {
				$.mobileweb['__ERR_CODE__'] = json['retdic']['code'];
				$.mobileweb['__ERR_MSG__'] = (json['retdic']['msg'] == undefined ? json['retdic']['error_message'] : json['retdic']['msg']);
				utilmethods.showLoadingIndicator(false);
				
				if(json['retdic']['code'].indexOf("HLCOMM") > -1 && $.mobileweb["state"] === "preview"){
					$.errorhandler('alertBox',$.mobileweb['__ERR_CODE__'] + " : " + $.mobileweb['__ERR_MSG__'], "");
				}
				
				$.utility('setComActionStatus', "Error");
			}

		},
		
		AcctRegistry : function(json) {
			utilmethods.showLoadingIndicator(false);
			if (json.ret === 'NACK') {
				console.log("Error authenticating");
				var pagedef=$.utility('getObject',$.mobileweb['pages'],'name',json.callbackdata.page);
				//if (json.callbackdata.events.Error != undefined)
					//new $.actions(pagedef, null,json.callbackdata.events.Error).execute();
					$.utility('setComActionStatus', "Error");
					$.mobileweb['__ERR_CODE__'] = json['retdic']['code'];
					$.mobileweb['__ERR_MSG__'] = (json['retdic']['msg'] == undefined ? json['retdic']['error_message'] : json['retdic']['msg']);
			}else{
				console.log("registration ok");
				var pagedef=$.utility('getObject',$.mobileweb['pages'],'name',json.callbackdata.page);
				if (json.ret === 'ACK'){
					
					//if (json.callbackdata.events.Success != undefined){
						//new $.actions(pagedef, null,json.callbackdata.events.Success).execute();
						$.utility('setComActionStatus', "Success");
				//	}
				}
				else {
				//if (json.callbackdata.events.Error != undefined){
					//new $.actions(pagedef, null,json.callbackdata.events.Error).execute();
					$.utility('setComActionStatus', "Error");
				//}
						
				}
			}
		},
		
		AcctLogin : function(json) {
			utilmethods.showLoadingIndicator(false);
			if (json.ret === 'NACK') {
				$.mobileweb['__ERR_CODE__'] = json['retdic']['code'];
				$.mobileweb['__ERR_MSG__'] = (json['retdic']['msg'] == undefined ? json['retdic']['error_message'] : json['retdic']['msg']);
			console.log("login failed: The username or password you entered is incorrect.");
			var pagedef=$.utility('getObject',$.mobileweb['pages'],'name',json.callbackdata.page);
			//if (json.callbackdata.events.Error != undefined)
						//new $.actions(pagedef, null,json.callbackdata.events.Error).execute();
				$.utility('setComActionStatus', "Error");
			}
			else{
				console.log("Login Successfully");
				var pagedef=$.utility('getObject',$.mobileweb['pages'],'name',json.callbackdata.page);
				if (json.ret === 'ACK'){
				//	if (json.callbackdata.events.Success != undefined){
						//new $.actions(pagedef, null,json.callbackdata.events.Success).execute();
						$.utility('setComActionStatus', "Success");
				//	}
				}
				else {
				//if (json.callbackdata.events.Error != undefined)
						//new $.actions(pagedef, null,json.callbackdata.events.Error).execute();
					$.utility('setComActionStatus', "Error");
				}
			}
		},
		
		RemoteMaintenance : function(json) {
			utilmethods.showLoadingIndicator(false);
			if (json.ret === 'NACK') {
			    console.log("------------------ Maintenance Downtime Error ------------------");

			    $.mobileweb['__ERR_CODE__'] = json['retdic']['code'];
			    $.mobileweb['__ERR_MSG__'] = (json['retdic']['msg'] == undefined ? json['retdic']['error_message'] : json['retdic']['msg']);

			    $.utility('setComActionStatus', "Error");
			    $.errorhandler('alertBox', $.mobileweb['__ERR_MSG__'], "");
			}
		},

		isEmpty : function(ob) {
			for ( var i in ob) {
				if (ob.hasOwnProperty(i)) {
					return false;
				}
			}
			return true;
		},
		containsGlobalVariable : function(value) {

			if(value === undefined){
				return value;
			}else{
				value = value.toString();
			}
			if(value.indexOf("__NOW__") != -1  || value.indexOf(/__NOW__/gi) != -1){
				return true;
			}else if(value.indexOf("__ERR_CODE__") != -1 || value.indexOf(/__ERR_CODE__/gi) != -1){
				return true;
			}else if(value.indexOf("__ERR_MSG__") != -1 || value.indexOf(/__ERR_MSG__/gi) != -1){
				return true;
			}else if(value.indexOf("__BASEURL__") != -1 || value.indexOf("[__BASEURL__]") != -1){
				return true;
			}else if(value.indexOf("__INSTANCENAME__") != -1  || value.indexOf(/__INSTANCENAME__/gi) != -1){
				return true;
			}else if(value.indexOf("__PATH__") != -1  || value.indexOf(/__PATH__/gi) != -1){
				return true;
			}else if(value.indexOf("__PROJECTID__") != -1  || value.indexOf(/__PROJECTID__/gi) != -1){
				return true;		
			}else if(value.indexOf("__PROJECTSTATE__") != -1  || value.indexOf(/__PROJECTSTATE__/gi) != -1){
				return true;
			}else if(value.indexOf("__LAT__") != -1  || value.indexOf(/__LAT__/gi) != -1){
				return true;
			}else if(value.indexOf("__LONG__") != -1  || value.indexOf(/__LONG__/gi) != -1){
				return true;
			}else if(value.indexOf("__ADDRESS__") != -1  || value.indexOf(/__ADDRESS__/gi) != -1){
				return true;
			}else if(value.indexOf("__ROUTETIME__") != -1  || value.indexOf(/__ROUTETIME__/gi) != -1){
				return true;
			}else if(value.indexOf("__ROUTEDISTANCE__") != -1  || value.indexOf(/__ROUTEDISTANCE__/gi) != -1){
				return true;
			}else if(value.indexOf("__ALT__") != -1  || value.indexOf(/__ALT__/gi) != -1){
				return true;
			}else if(value.indexOf("__GPSDATE__") != -1  || value.indexOf(/__GPSDATE__/gi) != -1){
				return true;
			}else if(value.indexOf("__COURSE__") != -1  || value.indexOf(/__COURSE__/gi) != -1){
				return true;
			}else if(value.indexOf("__MAPZOOM__") != -1  || value.indexOf(/__MAPZOOM__/gi) != -1){
				return true;
			}else if(value.indexOf("__NUMREC__") != -1  || value.indexOf(/__NUMREC__/gi) != -1){
				return true;
			}else if(value.indexOf("__OS__") != -1  || value.indexOf(/__OS__/gi) != -1){
				return true;
			}else if(value.indexOf("__OSVER__") != -1  || value.indexOf(/__OSVER__/gi) != -1){
				return true;
			}else if(value.indexOf("__RANDOM__") != -1  || value.indexOf(/__RANDOM__/gi) != -1){
				return true;
			}else if(value.indexOf("__BLANK__") != -1  || value.indexOf(/__BLANK__/gi) != -1){
				return true;
			}else if(value.indexOf("__IMEI__") != -1  || value.indexOf(/__IMEI__/gi) != -1){
			  	return true;
			}else if(value.indexOf("__APPVER__") != -1  || value.indexOf(/__APPVER__/gi) != -1){
				return true;
			}else if(value.indexOf("__CLIENTID__") != -1  || value.indexOf(/__APPVER__/gi) != -1){
				return true;
			}
		
		
			return false;
		
		},
		checkGlobalVariable : function(globalValue) {
			if(globalValue === undefined || globalValue == null){
				return globalValue;
			}else{
				globalValue = globalValue.toString();
			}
			if(globalValue.indexOf("__NOW__") != -1  || globalValue.indexOf(/__NOW__/gi) != -1){
			//	if($.mobileweb["__NOW__"] === undefined){
					var cd = new Date();
					var month = cd.getMonth() < 9 ? "0" + (cd.getMonth()+1) : (cd.getMonth()+1);
					var date = cd.getDate() < 9 ? "0" + (cd.getDate()) : (cd.getDate());
					var minutes = cd.getMinutes() < 9 ? "0" + (cd.getMinutes()) : (cd.getMinutes());
					var hours = cd.getHours() < 9 ? "0" + (cd.getHours()) : (cd.getHours());
					var formattedDate = cd.getFullYear() + "-" + month + "-" + date + " " + hours + ":"+ minutes;
					$.mobileweb["__NOW__"] = formattedDate;
			//	}
				if ($("body").find("#__NOW__").length == 0 ) {
					//$('body').append("<input id='__NOW__' type='text' hidden='true'>"+ $.mobileweb["__NOW__"] +"</input>");

					//for fixing bug #8940. Date: 15-Sep-2017
					$('body').append("<input id='__NOW__' type='text' hidden='true'></input>");
					$("#__NOW__").text(formattedDate);
					$("#__NOW__").val(formattedDate);
				}
				globalValue = globalValue.replace(/\[__NOW__\]/gi,"__NOW__" );
				globalValue = globalValue.replace(/__NOW__/gi,$.mobileweb['__NOW__'] );

			}
		
			if(globalValue.indexOf("__ERR_CODE__") != -1 || globalValue.indexOf(/__ERR_CODE__/gi) != -1){
				if($.mobileweb['__ERR_CODE__'] != undefined){
					globalValue = globalValue.replace(/\[__ERR_CODE__\]/gi,"__ERR_CODE__" );
					globalValue = globalValue.replace(/__ERR_CODE__/gi,$.mobileweb['__ERR_CODE__'] );
				}else{
					globalValue = globalValue.replace(/__ERR_CODE__/gi,"" );
					globalValue = globalValue.replace("__ERR_CODE__","" );
				}
			}
			if(globalValue.indexOf("__ERR_MSG__") != -1 || globalValue.indexOf(/__ERR_MSG__/gi) != -1){
				if($.mobileweb['__ERR_MSG__'] != undefined){
					globalValue = globalValue.replace(/\[__ERR_MSG__\]/gi,"__ERR_MSG__" );
					globalValue = globalValue.replace(/__ERR_MSG__/gi,$.mobileweb['__ERR_MSG__'] );
				}else{
					globalValue = globalValue.replace(/__ERR_MSG__/gi,"" );
					globalValue = globalValue.replace("__ERR_MSG__","" );
				}
			}
			if(globalValue.indexOf("__BASEURL__") != -1 || globalValue.indexOf("[__BASEURL__]") != -1){
				$.mobileweb["__BASEURL__"] = $.mobileweb['fullBaseURL'];
				globalValue = globalValue.replace(/\[__BASEURL__\]/gi,"__BASEURL__" );
				globalValue = globalValue.replace(/__BASEURL__/gi,$.mobileweb['__BASEURL__'] );
			}
			if(globalValue.indexOf("__INSTANCENAME__") != -1  || globalValue.indexOf(/__INSTANCENAME__/gi) != -1){
				$.mobileweb["__INSTANCENAME__"] = $.mobileweb["baseurl"].replace("http://", "").replace("https://", "");
				globalValue = globalValue.replace(/\[__INSTANCENAME__\]/gi,"__INSTANCENAME__ ");
				globalValue = globalValue.replace(/__INSTANCENAME__/gi,$.mobileweb["__INSTANCENAME__"] );
			}
			if(globalValue.indexOf("__PATH__") != -1  || globalValue.indexOf(/__PATH__/gi) != -1){
				$.mobileweb["__PATH__"] = $.mobileweb["fullBaseURL"].replace( $.mobileweb["baseurl"]+"/", "");
				$.mobileweb["__PATH__"] = $.mobileweb["__PATH__"].replace($.mobileweb["__PATH__"].lastIndexOf("/"), "");
				globalValue = globalValue.replace(/\[__PATH__\]/gi,"__PATH__ ");
				globalValue = globalValue.replace(/__PATH__/gi,$.mobileweb["__PATH__"]);
			}
			if(globalValue.indexOf("__PROJECTID__") != -1  || globalValue.indexOf(/__PROJECTID__/gi) != -1){
				globalValue = globalValue.replace(/\[__PROJECTID__\]/gi,"__PROJECTID__ ");
				globalValue = globalValue.replace(/__PROJECTID__/gi,$.mobileweb["pid"]);
			}
			if(globalValue.indexOf("__PROJECTSTATE__") != -1  || globalValue.indexOf(/__PROJECTSTATE__/gi) != -1){
				globalValue = globalValue.replace(/\[__PROJECTSTATE__\]/gi,"__PROJECTSTATE__ ");
				globalValue = globalValue.replace(/__PROJECTSTATE__/gi,$.mobileweb["applicationState"]);
			}
			if(globalValue.indexOf("__LAT__") != -1  || globalValue.indexOf(/__LAT__/gi) != -1){
				globalValue = globalValue.replace(/\[__LAT__\]/gi,"__LAT__ ");
				globalValue = globalValue.replace(/__LAT__/gi,$.mobileweb["__LAT__"]);
			}
			if(globalValue.indexOf("__LONG__") != -1  || globalValue.indexOf(/__LONG__/gi) != -1){
				globalValue = globalValue.replace(/\[__LONG__\]/gi,"__LONG__ ");
				globalValue = globalValue.replace(/__LONG__/gi,$.mobileweb["__LONG__"]);
			}
			if(globalValue.indexOf("__ADDRESS__") != -1  || globalValue.indexOf(/__ADDRESS__/gi) != -1){
				globalValue = globalValue.replace(/\[__ADDRESS__\]/gi,"__ADDRESS__ ");
				globalValue = globalValue.replace(/__ADDRESS__/gi,$.mobileweb["__ADDRESS__"]);
			}
			if(globalValue.indexOf("__ROUTETIME__") != -1  || globalValue.indexOf(/__ROUTETIME__/gi) != -1){
				globalValue = globalValue.replace(/\[__ROUTETIME__\]/gi,"__ROUTETIME__ ");
				globalValue = globalValue.replace(/__ROUTETIME__/gi,$.mobileweb["__ROUTETIME__"]);
			}
			if(globalValue.indexOf("__ROUTEDISTANCE__") != -1  || globalValue.indexOf(/__ROUTEDISTANCE__/gi) != -1){
				globalValue = globalValue.replace(/\[__ROUTEDISTANCE__\]/gi,"__ROUTEDISTANCE__ ");
				globalValue = globalValue.replace(/__ROUTEDISTANCE__/gi,$.mobileweb["__ROUTEDISTANCE__"]);
			}
			if(globalValue.indexOf("__ALT__") != -1  || globalValue.indexOf(/__ALT__/gi) != -1){
				globalValue = globalValue.replace(/\[__ALT__\]/gi,"__ALT__ ");
				globalValue = globalValue.replace(/__ALT__/gi,$.mobileweb["__ALT__"]);
			}
			if(globalValue.indexOf("__GPSDATE__") != -1  || globalValue.indexOf(/__GPSDATE__/gi) != -1){
				globalValue = globalValue.replace(/\[__GPSDATE__\]/gi,"__GPSDATE__ ");
				globalValue = globalValue.replace(/__GPSDATE__/gi,$.mobileweb["__GPSDATE__"]);
			}
			if(globalValue.indexOf("__COURSE__") != -1  || globalValue.indexOf(/__COURSE__/gi) != -1){
				globalValue = globalValue.replace(/\[__COURSE__\]/gi,"__COURSE__ ");
				globalValue = globalValue.replace(/__COURSE__/gi,$.mobileweb["__COURSE__"]);
			}
			if(globalValue.indexOf("__MAPZOOM__") != -1  || globalValue.indexOf(/__MAPZOOM__/gi) != -1){
				globalValue = globalValue.replace(/\[__MAPZOOM__\]/gi,"__MAPZOOM__ ");
				globalValue = globalValue.replace(/__MAPZOOM__/gi,$.mobileweb["__MAPZOOM__"]);
			}
			if(globalValue.indexOf("__CENTERLAT__") != -1  || globalValue.indexOf(/__CENTERLAT__/gi) != -1){
				globalValue = globalValue.replace(/\[__CENTERLAT__\]/gi,"__CENTERLAT__ ");
				globalValue = globalValue.replace(/__CENTERLAT__/gi,$.mobileweb["__CENTERLAT__"]);
			}
			if(globalValue.indexOf("__CENTERLONG__") != -1  || globalValue.indexOf(/__CENTERLONG__/gi) != -1){
				globalValue = globalValue.replace(/\[__CENTERLONG__\]/gi,"__CENTERLONG__ ");
				globalValue = globalValue.replace(/__CENTERLONG__/gi,$.mobileweb["__CENTERLONG__"]);
			}
			if(globalValue.indexOf("__NUMREC__") != -1  || globalValue.indexOf(/__NUMREC__/gi) != -1){
				if($.mobileweb['__NUMREC__'] != undefined){
					globalValue = globalValue.replace(/\[__NUMREC__\]/gi,"__NUMREC__ ");
					globalValue = globalValue.replace(/__NUMREC__/gi,$.mobileweb["__NUMREC__"]);	
				}else{
					globalValue = globalValue.replace(/\[__NUMREC__\]/gi,"__NUMREC__ ");
					globalValue = globalValue.replace(/__NUMREC__/gi,"");
				}
				
			}
			if(globalValue.indexOf("__OS__") != -1  || globalValue.indexOf(/__OS__/gi) != -1){
				globalValue = globalValue.replace(/\[__OS__\]/gi,"__OS__ ");
				if ( $.browser.chrome ) {
					globalValue = globalValue.replace(/__OS__/gi,"Google Chrome");
				}else if ( $.browser.mozilla ) {
					globalValue = globalValue.replace(/__OS__/gi,"Firefox Web Browser");
				}else if ( $.browser.opera ) {
					globalValue = globalValue.replace(/__OS__/gi,"Opera");
				}else if ( $.browser.safari ) {
					globalValue = globalValue.replace(/__OS__/gi,"Safari");
				}else if ( $.browser.mise ) {
					globalValue = globalValue.replace(/__OS__/gi,"Mise");
				}else{
					globalValue = globalValue.replace(/__OS__/gi,"Browser not detected");
				}
			}
			if(globalValue.indexOf("__OSVER__") != -1  || globalValue.indexOf(/__OSVER__/gi) != -1){
				globalValue = globalValue.replace(/\[__OSVER__\]/gi,"__OSVER__ ");
				globalValue = globalValue.replace(/__OSVER__/gi,$.browser.version);
			}
			if(globalValue.indexOf("__APPVER__") != -1  || globalValue.indexOf(/__APPVER__/gi) != -1){
				$.mobileweb["__APPVER__"] = $.mobileweb["version"];
				globalValue = globalValue.replace(/\[__APPVER__\]/gi,"__APPVER__");
				globalValue = globalValue.replace(/__APPVER__/gi,$.mobileweb["__APPVER__"]);
			}
			if(globalValue.indexOf("__RANDOM__") != -1  || globalValue.indexOf(/__RANDOM__/gi) != -1){
				globalValue = globalValue.replace(/\[__RANDOM__\]/gi,"__RANDOM__ ");
				//globalValue = globalValue.replace(/__RANDOM__/gi, $.cookie($.mobileweb['pid'] + '_ak').toString().substring(3,15));
				
				var n = Math.random().toString(36).substr(2);
				globalValue = globalValue.replace(/__RANDOM__/gi, n);
			}
			if(globalValue.indexOf("__BLANK__") != -1  || globalValue.indexOf(/__BLANK__/gi) != -1){
				$.mobileweb["__BLANK__"] = "";
				globalValue = globalValue.replace(/\[__BLANK__\]/gi,"__BLANK__");
				globalValue = globalValue.replace(/__BLANK__/gi,$.mobileweb["__BLANK__"]);
			}
			if(globalValue.indexOf("__IMEI__") != -1  || globalValue.indexOf(/__IMEI__/gi) != -1){
				  $.mobileweb["__IMEI__"] = "";
				  globalValue = globalValue.replace(/\[__IMEI__\]/gi,"__IMEI__");
				  globalValue = globalValue.replace(/__IMEI__/gi,$.mobileweb["__IMEI__"]);
			}
			if(globalValue.indexOf("__CLIENTID__") != -1  || globalValue.indexOf(/__CLIENTID__/gi) != -1){
				  globalValue = globalValue.replace(/\[__CLIENTID__\]/gi,"__CLIENTID__");
				  globalValue = globalValue.replace(/__CLIENTID__/gi,$.mobileweb["__CLIENTID__"]);
			}
		
			if(globalValue == undefined || globalValue == "undefined")
				globalValue = "";
			return globalValue;
		},
		
		replaceRecordWithPagedata : function(record, data, pagedef) {
			for ( var key in record){
				
				// Below used 'tokenizeString' method giving values from 0-indexed data, 
				// so in case of "data" is not equal to 0-index content on the page we required it.
				if(pagedef['data']['contents'].constructor == Array && pagedef['data']['contents'].length > 0){
					if(data === pagedef['data']['contents'][0])
						console.log("we don't require data parameter here");
					else
						record[key] = $.utility("extractDataFromRecord",data,record[key]);
				}
				
				var globalValue = $.utility('checkGlobalVariable', record[key]);
				if(globalValue === record[key]){
					if(isNaN(record[key])){
						var value = $.utility("tokenizeString",record[key], pagedef);
						try{
							//record[key]=eval(value);
							record[key]=value;
						}catch(e){
							record[key]=value;
						}
						//record[key]=$.utility("tokenizeString",record[key], pagedef);
					}
				}else{
					record[key] = globalValue;
				}
			}
		},
		
		GetCSVData : function(){
			return splitCSVArray;
		},
		SetCSVData : function(prefix, rowData,pagedef){
			// find if CSVData Already Exsists.. replace it with the new one..
			var bool = false;
			for(var object in splitCSVArray){
				if(splitCSVArray[object]['prefix'] === prefix){
						splitCSVArray.splice(object, 1);
				}
			}
		
			if(rowData.indexOf("[")!=-1 && rowData.indexOf("]")!=-1 ){
				// When rowData has to be picked from UIObject..
				var UIElementName = rowData.replace("[", "").replace("]", "");
				var CSVData = $.utility('CheckAndGetUIElementValue',$("[name='"+UIElementName+ "']"),UIElementName, pagedef);
				if(CSVData != undefined){	// from UI Object Value..
					var rowDataArray = CSVData.split(",");
					for(var i =0; i < rowDataArray.length; i++){
						//rowDataArray[i] = rowDataArray[i].substring(1,rowDataArray[i].length-1); 
						var rowData = rowDataArray[i];
						if(rowData){
							if(rowData.indexOf('"') > -1)
								rowDataArray[i] = rowData.replace('"','').replace('"','');
							else if(rowData.indexOf("'") > -1)
								rowDataArray[i] = rowData.replace("'","").replace("'","");
						}
					}
					splitCSVArray.push({prefix:prefix,rowData:rowDataArray});
					return true;
				}else{	// else it is an variable from combineCSV...
					// get Data From CombineCSV Object..
					var initialCSVArray=$.utility('getCombinedCSV');
					if(initialCSVArray.length > 0){
						$.each(initialCSVArray, function(i, csvElement){
							var splitIntoArray = csvElement.value.split(",");
							splitCSVArray.push({prefix:prefix,rowData:splitIntoArray});
							return true;
						});
					}
					else
					return bool;
				}
				
			}else{	// When rowData is A,B,C,D type....
				var rowDataArray = rowData.split(",");
				splitCSVArray.push({prefix:prefix,rowData:rowDataArray});
				return true;
			}
			//console.log(splitCSVArray);
		},
		
		CheckAndGetUIElementValue : function(element, elementName, pagedef){
			if(pagedef != undefined && pagedef['notransferdata'] != undefined){
				return "";
			}
			
			if(element.length != 0){
				var elementObject = $.utility('getUiID_Object_From_Page',$.mobileweb.getCurrentPage().getName(),$(element).attr('id'));
				if(elementObject['viewtype'] === "Gadget"){
					return $.utility('CheckAndGetUIElementValue',$("[name='"+elementObject['name']+ "'] > [name='"+elementObject['mainObjectName']+ "']"),elementObject['mainObjectName'], pagedef);
					//var $.utility('getUiID_Object_From_Page',$.mobileweb.getCurrentPage().getName(),$(element).parent().attr('id'));
				}
				
				if(element.length > 1){
					if(pagedef['data']['contents']['currentRow'] != undefined){
						var rowIndex = parseInt(pagedef['data']['contents']['currentRow']);
						if(!isNaN(rowIndex))
							if(elementObject.viewtype == 'TextButton')//Bug 10546 Fix 
 								element = element.slice(1);
							else
								element = element.slice(rowIndex, rowIndex+1);
					}else{
						for(var i=0; i < element.length; i++){
							var _elementObject = $.utility('getUiID_Object_From_Page',pagedef['name'],$(element[i]).attr('id'));
							if(!$.isEmptyObject(_elementObject)){
								if(_elementObject.viewtype == 'TextButton'){
	 								element = element.slice(i+1);
	 								break;
	 							}
								if(_elementObject.viewtype != 'Radio'){
									element = element.slice(i, i+1);
									break;
								}
							}
						}
					}
				}
				
 				var getLeftToolbarReference = $(element).parents("div").map(function() {
 					if($(this).attr('id') == "leftToolBar"){
 						var widToolbar = parseFloat($(this).css("width").replace('px',''));
 						if(widToolbar != undefined && widToolbar >= 240)
 							return true;
 						else
 							return false;
 					}
 				});
 				if(getLeftToolbarReference != undefined && getLeftToolbarReference.length > 0){
 					if(!getLeftToolbarReference[0])
 						return "";
 				}
				  
				if($(element).is('input:checkbox')){	// CheckBox
					var elementObject = $.utility('getUiID_Object_From_Page',$.mobileweb.getCurrentPage().getName(),$(element).parent().attr('id'));
					return elementObject['valueFormat'];
				}else if($(element).is('input:radio')){	// radiobutton
					var value = "";
					$(element).each (function(key, childElement) {
						if(childElement['checked']){
							return value = childElement['value'];
						}
					});
					return value;
				}else if($(element).is('video')){	// VideoBox
					var elementObject = $.utility('getUiID_Object_From_Page',$.mobileweb.getCurrentPage().getName(),$(element).attr('id'));
					if(pagedef != undefined && $.isEmptyObject(elementObject)){
						elementObject = $.utility('getUiID_Object_From_Page',pagedef['name'],$(element).attr('id'));
					}
					if(elementObject['viewtype'] === "Camera"){
						return elementObject['mainValue'];
					}
					if(elementObject['viewtype'] === "VideoBox"){
						return elementObject['src'];
					}
				}else if($(element).is("input") && !$(element).is('input:image')){	// TextField
					var elementObject = $.utility('getUiID_Object_From_Page',$.mobileweb.getCurrentPage().getName(),$(element).attr('id'));
					if(!$.isEmptyObject(elementObject) && elementObject['viewtype'] == "Calendar"){						
						var _calendarVal = ($(element).val() == "") ? "" : elementObject['value'];
						if(_calendarVal == "")
							_calendarVal = ($(element).val() != "") ?  $(element).val() : "";
						return _calendarVal;
					}else{
						if(!$.isEmptyObject(elementObject) && elementObject['value'] != ""){
						    return elementObject['value'];	
						}else{
							return $(element).val();
						}
					}					
				}else if($(element).is("label")){	// Label
					return $(element[0]).text();
				}else if($(element).is("img")){	// Label
					return $(element).attr('src').toString().substring($(element).attr('src').toString().lastIndexOf('/')+1, $(element).attr('src').toString().length);
				}else if($(element).is("textArea")){// TextArea
					return $(element).val();
				}else if($(element).is('input:image')){		// ToggleButton
					var elementObject = $.utility('getUiID_Object_From_Page',$.mobileweb.getCurrentPage().getName(),$(element).attr('id'));
					return elementObject['togglevalue'];
				}else if($(element).is('select')){			//comboBox & SwitchBar
					var elementObject = $.utility('getUiID_Object_From_Page',$.mobileweb.getCurrentPage().getName(),$(element).attr('id'));
					if(elementObject['viewtype'] === "SwitchBar"){
						return elementObject['switchValue'];
					}else{
						var uiID = $($(element).get(0)).attr('id');
						if($('#'+uiID+' option:selected').val() != undefined)
							return $('#'+uiID+' option:selected').val();
						else{
							var elementObject = $.utility('getUiID_Object_From_Page',$.mobileweb.getCurrentPage().getName(),$(element).attr('id').replace("_select",""));
							if(!$.isEmptyObject(elementObject))
									return elementObject['initialValue'];
						}
					}
				}else if($(element).is('datalist')){			//editable comboBox 
					var uiID = $($(element).get(0)).attr('id');
					var _value = "";
					$.each(element[0].options,function(i,option){
						if(option['value'] == $('#'+$(element)[0]['id']+'_input').val())
							_value =  option.dataset.value;
					});
					return _value;
					//return $('#'+$(element)[0]['id']+'_input').val();
				}else if($(element).is('table')){	//Segment..
					var elementObject = $.utility('getUiID_Object_From_Page',$.mobileweb.getCurrentPage().getName(),$(element).attr('id'));
					if(elementObject['viewtype'] === "Radio"){
						return elementObject['value'];
					}else{
						var segmentSelectedValue = '';
						$(element).find('td').each (function() {
							if($(this).attr('sel') == 'true'){
								segmentSelectedValue = $(this).get(0).innerHTML;
							}
						});
					}
					return segmentSelectedValue;
					
				}else if($(element).find('.g-recaptcha')){
					return elementObject['value'];
					
				}else if($(element).find(' .pickerTable tr')){	// Picker...
					var elementObject = $.utility('getUiID_Object_From_Page',$.mobileweb.getCurrentPage().getName(),$(element).attr('id'));
					if(elementObject == undefined){
						var value="";
						var initialCSVArray=$.utility('getCombinedCSV');
						if(initialCSVArray.length!=0){
							
							$.each(initialCSVArray, function(i, csvElement){
								if(csvElement.csvResultHeader === elementName){
									value = csvElement.value;
								 }
								else
									value = "[" + elementName + "]";
							});
						}
						return value;
					}else if(elementObject['viewtype'] === "DatePicker"){
						return elementObject['value'];
					}else if(elementObject['viewtype'] === "ImageButton"){
						return $('#'+elementObject['id']+'>[name="foregroundimage"]').attr("src");;
					}else if(elementObject['viewtype'] === "ImageButton"){
						return $('#'+elementObject['id']+'>[name="foregroundimage"]').attr("src");;
					}else if(elementObject['viewtype'] === "Slider"){
						var sliderID = $(element).attr('id'); 
						return $('#'+sliderID+" .ui-slider-input").attr('value');
					}else if(elementObject['viewtype'] === "GoogleMap"){
						
						return elementObject['value'];
					}else if(elementObject['viewtype'] === "ListBox"){
						
						return elementObject['value'];
					}else if(elementObject['viewtype'] === "SoundBox"){
						
						return (elementObject["source"] === "bundle")? elementObject['src'].substr(elementObject['src'].lastIndexOf("/")+1,elementObject['src'].length) : ((elementObject["recorder"] === true && elementObject["source"] === "local")? elementObject['recordingName']: elementObject['src']  );
					}else{
						var combinedSelectedValue = '';
						$(element).find("table").each(function(k, table){
							$(table).find('tr').each(function(i,row){
								if($(row).hasClass('activeRow')){
									if(combinedSelectedValue.length > 0){
										combinedSelectedValue = combinedSelectedValue + ",";
									}
									combinedSelectedValue = combinedSelectedValue + $(row).attr('val');
								}
							});
						});
								
						return combinedSelectedValue;
					}
					
				}else if($(element).find('.ui-slider-input')){		// Slider
					var elementObject = $.utility('getUiID_Object_From_Page',$.mobileweb.getCurrentPage().getName(),$(element).attr('id'));
					if(elementObject == undefined){
						var value="";
						var initialCSVArray=$.utility('getCombinedCSV');
						if(initialCSVArray.length!=0){
							
							$.each(initialCSVArray, function(i, csvElement){
								if(csvElement.csvResultHeader === elementName){
									value = csvElement.value;
								 }
								else
									value = "[" + elementName + "]";
							});
						}
						return value;
					}else{
						if(elementObject['viewtype'] === "DatePicker"){
							return elementObject['value'];
						}else if(elementObject['viewtype'] === "SwitchBar"){
							return elementObject['switchValue'];
						}else{
							var sliderID = $(element).attr('id'); 
							return $('#'+sliderID+" .ui-slider-input").attr('value');
						}
					}
				}else{
					//console.log("4");
				}
			}else{
				var targetValue = "";
				var flag = false;
				if(pagedef != undefined && pagedef['data']['contents'] != undefined){
					var rowIndex = pagedef['data']['contents']['currentRow'];
					//if(rowIndex != undefined && !isNaN(rowIndex)){
					if(rowIndex != undefined && !isNaN(rowIndex) && pagedef['data']['contents'][rowIndex] != undefined){
						$.each(pagedef['data']['contents'][rowIndex], function(key, data){
							if(key == elementName){
								targetValue = data;
								flag = true;
							}
						});
					}
					else{
						var contents = [];
						if(pagedef['data']['contents'][0] != undefined){
							if(pagedef['data']['contents'][0].constructor == Object){
								contents = pagedef['data']['contents'];
							}else
								contents = pagedef['data']['contents'][0];
						}else
							contents = pagedef['data']['contents'];
						
						if(contents != undefined){
							if(contents.length > 0){
								$.each(contents, function(index, data){
									if(!flag && data != undefined && data[elementName] != undefined){//Bug #11326 Fix
										targetValue = data[elementName];
										flag = true;
									}
								});
							}else{
								if(contents[elementName] != undefined){
									targetValue = contents[elementName];
									flag = true;
								}
							}
							
							if(!flag && pagedef['parentType'] != undefined && pagedef['parentType'] === "SplitView" && pagedef['pagedef'] != undefined){
								var pagedefContent;
								if(pagedef['pagedef']['data']['contents'] != undefined) {    //Bug #12360 fix
									if(pagedef['pagedef']['data']['contents'][0] != undefined)
										pagedefContent = pagedef['pagedef']['data']['contents'][0];
									else
										pagedefContent = pagedef['pagedef']['data']['contents'];
								} 
								
								if(pagedefContent != undefined){
									$.each(pagedefContent, function(key, data){
										if(key == elementName){
											targetValue = data;
											flag = true;
										}
									});
								}
							}
						}
						
//						if(pagedef['data']['contents'][0] != undefined){
//							$.each(pagedef['data']['contents'][0], function(key, data){
//								if(key == elementName){
//									targetValue = data;
//									flag = true;
//								}
//							});
//							if(!flag && pagedef['parentType'] != undefined && pagedef['parentType'] === "SplitView" && pagedef['pagedef'] != undefined){
//								if(pagedef['pagedef']['data']['contents'] != undefined && pagedef['pagedef']['data']['contents'][0] != undefined)
//									$.each(pagedef['pagedef']['data']['contents'][0], function(key, data){
//										if(key == elementName){
//											targetValue = data;
//											flag = true;
//										}
//									});
//							}
//						}else{
//							$.each(pagedef['data']['contents'], function(key, data){
//								if(key == elementName){
//									targetValue = data;
//									flag = true;
//								}
//							});
//							if(!flag && pagedef['parentType'] != undefined && pagedef['parentType'] === "SplitView" && pagedef['pagedef'] != undefined){
//								$.each(pagedef['pagedef']['data']['contents'], function(key, data){
//									if(key == elementName){
//										targetValue = data;
//										flag = true;
//									}
//								});
//							}
//						}
					}
					return targetValue;
				}else{
					return "";
				}

			}
			
		},
		
		updateDataContents : function(key , value, pagedef,target){
			if(pagedef['data']['contents'] != undefined){ // Bug #12444 fix
				$.each(pagedef['data']['contents'], function(i, arr){

					if(pagedef['data']['contents'][i] != undefined){
						pagedef['data']['contents'][i][key] = value;
					}
					/*if(target.getTemplate() != undefined && target.getTemplate() != "" ){
					 pagedef['data']['contents'][i][target.getTemplate().toString().replace("[","").replace("]","")] = value;
					}*/
				});
			}
			
			if(pagedef['data']['pagedata'] != undefined){
				pagedef['data']['pagedata'][key] = value;
			}
		},
		
		getUiID_Object_From_Page : function (pagename ,ui_id){
			var requiredChild = {};
			var flag = false;
			
			var isgadgetobj = false;
 			var gadget_id = "";
 			if(ui_id.toString().indexOf('_ui') > -1){
 				isgadgetobj = true;
 				gadget_id = ui_id.toString().split('_ui')[0];
 			}

 			if(isgadgetobj){
 				requiredChild = $.utility('getUiObject_fromGadgetUI',pagename,gadget_id,ui_id);
 				if(requiredChild != undefined)
 					flag = true;
 			}
 			else{
 				$.each( $.utility('getObject',$.mobileweb['pages'],'name',pagename)['children'],function (i , child){
 					if(child['viewtype'] === "Dialog"){
 						if(child['id'] == ui_id){
 	 						flag = true;
 	 						requiredChild = child;
 	 					}else{
 	 						$.each(child['dataArray'][0]['children'],function (i , dialogChild){
 	 							if(dialogChild['id'] == ui_id){
 	 		 						flag = true;
 	 		 						requiredChild = dialogChild;
 	 		 					}
 	 						});
 	 					}
 					}
 					if(child['id'] == ui_id){
 						flag = true;
 						requiredChild = child;
 					}
 				});
 			}
 			
 			if($.utility('getObject',$.mobileweb['pages'],'name',pagename)['toolbartop'] != undefined){
 				if(!flag){
 	 				$.each( $.utility('getObject',$.mobileweb['pages'],'name',pagename)['toolbartop']['children'],function (i , child){
 	 					if(child['id'] == ui_id){
 	 						flag = true;
 	 						requiredChild = child;
 	 					}
 	 				});	
 	 			}
 			}
 		
 			if($.utility('getObject',$.mobileweb['pages'],'name',pagename)['toolbarbottom'] != undefined){
 				if(!flag){
 	 				$.each( $.utility('getObject',$.mobileweb['pages'],'name',pagename)['toolbarbottom']['children'],function (i , child){
 	 					if(child['id'] == ui_id){
 	 						flag = true;
 	 						requiredChild = child;
 	 					}
 	 				});	
 	 			}
 			}
 			
 			if($.utility('getObject',$.mobileweb['pages'],'name',pagename)['toolbarleft'] != undefined){
	 			if(!flag){
	 				$.each( $.utility('getObject',$.mobileweb['pages'],'name',pagename)['toolbarleft']['children'],function (i , child){
	 					if(child['id'] == ui_id){
	 						flag = true;
	 						requiredChild = child;
	 					}
	 				});	
	 			}
 			}
			return requiredChild;
		},

 		getUiObject_fromGadgetUI : function (pagename, gadget_id, ui_id){
 			var requiredChild = {};
 			
 			var pageobj = $.utility('getObject',$.mobileweb['pages'],'name',pagename);
 			$.each( pageobj['children'],function (i , child){
 				if(child['id'] == gadget_id){
 					$.each( child['children'],function (j , ui){
 						if(ui['id'] == ui_id){
 							requiredChild = ui;
 						}
 					});
 				}
 			});
 			
 			return requiredChild;
 		},
 		
 		getRadio_groupObjects_From_Page : function (pagename, element){
 			
 			var requiredChild = [];
 			if($(element).is('input:radio')){	// radiobutton
 				var grp_name = $(element[1]).attr('name');
 				
 				var pageobj = $.utility('getObject',$.mobileweb['pages'],'name',pagename);
 				$.each( pageobj['children'],function (i , child){
 					if(child['groupName'] == grp_name){
 						requiredChild.push(child);
 					}
 				});
 				$.each( pageobj['toolbartop']['children'],function (j , child){
 					if(child['groupName'] == grp_name){
 						requiredChild.push(child);
 					}
 				});	
 				$.each( pageobj['toolbarbottom']['children'],function (k , child){
 					if(child['groupName'] == grp_name){
 						requiredChild.push(child);
 					}
 				});
 				if(pageobj['toolbarleft'] != undefined){
 					$.each( pageobj['toolbarleft']['children'], function(l, child) {
 						if(child['groupName'] == grp_name){
 							requiredChild.push(child);
 						}
 					});
 				}
 			}
 			
 			return requiredChild;
 		},

		ApplyOnSucessAndOnErrorEvents : function(pagedef, ui, eventJSON, flag){
			// Here pagedef is Page definition, ui is Event triggering Element and EventJSON is complete set of event on this UI
			if((eventJSON !== undefined) && (eventJSON['Success'] !== undefined) && (flag)){
				var successArray = eventJSON['Success'];
				//setTimeout(function(){
				
						new $.actions(pagedef, ui, successArray).execute();
			
					
				//},500);
			}
			
			if((eventJSON !== undefined) && (eventJSON['Error'] !== undefined) && (!flag)){
				var errorArray = eventJSON['Error'];
				//setTimeout(function(){
					new $.actions(pagedef, ui, errorArray).execute();	
				//},500);
			}
		},

		
		splitAndReturnDate : function(date){
			var arr = date.split(/[-: ]/);
			if(arr.length > 3){
				return new Date(arr[0],arr[1],arr[2],arr[3],arr[4],0);
			}else{
				return new Date(arr[0],arr[1],arr[2]);
			}
		},
		
		validateDate : function(inputDate) {
			var flag = true;
			try{
				var specialChars = "<>@!#$%^&*()_+[]{}?;|'\"\\,~`=";   // Added for BugId: #7988 PD
					for(i = 0; i < specialChars.length;i++){
					     if(inputDate.indexOf(specialChars[i]) != -1){
					    	flag = false;
					     }
					 }
				if(flag){
					var date = new Date(inputDate);
					if(date == "Invalid Date" ){
						return false;
					}else{
						return true;
					}	
				}
				return flag;	//--> In case of 'flag = false', it must return.
			}catch(e){
				return false;
			}
			
			
			
			/*
			var dateArray=date.split("-");
			for(var i = 0; i < dateArray.length; i++){
				if(i==0){
					if(dateArray[i].length != 4 || parseInt(dateArray[i])==Number.NaN || 1972 > parseInt(dateArray[i]) || parseInt(dateArray[i]) > 2050){
						return false;
					}
				}else if(i==1){
					if(dateArray[i].length != 2 || parseInt(dateArray[i])==Number.NaN || parseInt(dateArray[i]) < 01 || parseInt(dateArray[i])> 12){
						return false;
					}
				}else if(i==2){
					var dateTime=dateArray[i].split(" ");
					if(dateTime.length == 1){
						//if( dateTime[0].length != 2 || parseInt(dateTime[0])==Number.NaN || parseInt(dateTime[0]) < 01 || parseInt(dateTime[0]) > 31){
							return false;
						//}
					}else if(dateTime.length==0 || dateTime==null){
						//if( dateArray[i].length !=2 || parseInt(dateArray[i])==Number.NaN ||parseInt(dateArray[i]) < 01 || parseInt(dateArray[i]) > 31){
							return false;
						//}
					}else{
						for(var j = 0; j <= dateTime.length; j++){
							if(j==0){
								if( dateTime[j].length != 2 || parseInt(dateTime[j])==Number.NaN || parseInt(dateTime[j]) < 01 || parseInt(dateTime[j]) > 31){
									return false;
								}
							}else if(j==1){
								var time=dateTime[j].split(":");
								if(time.length <= 1||time == null ){
									return false;
								}else{
									for(var k = 0; k < time.length; k++){
										if(k==0){
											if(time[k].length != 2 || parseInt(time[k])==Number.NaN || parseInt(time[k]) < 00 || parseInt(time[k]) > 23){
												return false;
											}
										} else if(k==1){
											if(time[k].length != 2 || parseInt(time[k])==Number.NaN || parseInt(time[k]) < 00 || parseInt(time[k]) > 59){
												return false;
											}
										} else if(k==2){
											if(time[k].length != 2 || parseInt(time[k])==Number.NaN || parseInt(time[k]) < 00 || parseInt(time[k]) > 59){
												return false;
											}
										} else{
											return false;
										}
									}
								}
							}
						}
					}
				}else {
					return false;
				}
			}
			return true;
		*/},
		
		validateTime : function(time){
			for(var k = 0; k < time.length; k++){
				if(k==0){
					if(1 >= time[k].length >= 2 || isNaN(parseInt(time[k])) || parseInt(time[k]) < 0 || parseInt(time[k]) > 23){
						return false;
					}
				} else if(k==1){
					if(1 >= time[k].length >= 2 || isNaN(parseInt(time[k])) || parseInt(time[k]) < 0 || parseInt(time[k]) > 59){
						return false;
					}
				} else if(k==2){
					if(1 >= time[k].length >= 2 || isNaN(parseInt(time[k])) || parseInt(time[k]) < 0 || parseInt(time[k]) > 59){
						return false;
					}
				} else{
					return false;
				}
			}
			return true;
		},
		validateOnlyDate:function(date) {
			var dateArray=date.split("-");
			for(var i = 0; i < dateArray.length; i++){
				if(i==0){
					if(dateArray[i].length != 4 || isNaN(parseInt(dateArray[i])) || 1972 > parseInt(dateArray[i]) || parseInt(dateArray[i]) > 2050){
						return false;
					}
				}else if(i==1){
					if(dateArray[i].length != 2 || isNaN(parseInt(dateArray[i])) || parseInt(dateArray[i]) < 1 || parseInt(dateArray[i])> 12){
						return false;
					}
				}else if(i==2){
					if(dateArray[i].length != 2 || isNaN(parseInt(dateArray[i])) || parseInt(dateArray[i]) < 1 || parseInt(dateArray[i])> 31){
						return false;
					}
				}else{
					return false;
				}
			}
			return true;
		},
		
		validateOnlyTime : function(time) {
			var timeArray=time.split(":");
			for(var i = 0; i < timeArray.length; i++){
				if(i==0){
					if(timeArray[i].length != 2 || isNaN(parseInt(timeArray[i])) || parseInt(timeArray[i]) < 0 || parseInt(timeArray[i]) > 23){
						return false;
					}
				}else if(i==1){
					if(timeArray[i].length != 2 || isNaN(parseInt(timeArray[i])) || parseInt(timeArray[i]) < 0 || parseInt(timeArray[i]) > 59){
						return false;
					}
				}else if(i==2){
					if(timeArray[i].length != 2 || isNaN(parseInt(timeArray[i])) || parseInt(timeArray[i]) < 0 || parseInt(timeArray[i]) > 59){
						return false;
					}
				}else{
					return false;
				}
				if(!Number.isInteger(parseInt(timeArray[i])) || !Number.isInteger(parseInt(timeArray[i].split("").reverse().join(""))))
				{
				    return false;
				}
			}return true;
		},
		
		validateBooleanFormat : function(data) {
			 switch(data.toLowerCase().trim()){
		        case "true": case "yes": case "1": case "false": case "no": case "0": return true;
		        default: return false;
		    }
		},
		
		
		// Imporatant method for reloading sections of SplitView page. 
		reloadSplitViewPageSection : function(pagedef, targetPageName) {
			var parent = "page" + pagedef['parent'].substring(pagedef['parent'].lastIndexOf("_"),pagedef['parent'].length);
			if(pagedef['name'] != targetPageName){
				var _page = $.utility('getObject',$.mobileweb['pages'],'name',targetPageName);
				var _parentPage = _page['parent'].split("_");
				_parentPage = "page_" + _parentPage[_parentPage.length - 1];
				if(_parentPage == pagedef['name'])
					parent = pagedef['name'];
			}
			$.each($.mobileweb['pages'] , function(i, page){
				if(parent === page['name']){
					$.each(page['children'] , function(j, innerPage){
						if(innerPage['name'] === targetPageName){
							if(innerPage['type'] === 'BaseView'){
								var myPage = $.mobileweb.getPage(innerPage['name']);
								myPage['children'] = new $.uichildren(innerPage, innerPage['children'], innerPage['data']['contents'][0]);
								myPage['children'].applyOverrides();
								
							}else if(innerPage['type'] === 'DBTableViewList'){
								$.each($.mobileweb.getCurrentPage()['children'] , function(l, currentPageChild){
									if(currentPageChild.getViewType() === 'DBTableViewList'){
										utilmethods.showLoading = true;
										$("#"+innerPage['name']+"_section").css({'overflow':'hidden'});
										$("#"+innerPage['name'] + "_section").find('ul').block({
											message : '',// <p>Loading...<p>
											overlayCSS : {
												opacity : 0.5
											},
											css : {
												border : 'none',
												padding : '15px',
												backgroundColor : '#000',
												'-webkit-border-radius' : '10px',
												'-moz-border-radius' : '10px',
												opacity : 1,
												color : '#fff'
											}
										});
										$('.ui-loader').css({'display': 'block',  'left': (((parseFloat(innerPage['sectionX']) + parseFloat(innerPage['sectionwidth']/2))* $.mobileweb.device['aspectratio']) + parseFloat($('.scroller').css('left').replace("px",""))) + "px", 'top' : (innerPage['y'] + (innerPage['height']/2))* $.mobileweb.device['aspectratio'] + "px"});
										
										var intialContentLength = innerPage['data']['contents'][0].length;
										var localDBPage = $.utility('clone', innerPage);
										var baseId = $("#"+innerPage['children'][0]['id']+" ul").attr('id');
										$.fetchLocalDBRecords(localDBPage,function(){
											$.createDBListViewPageRows(innerPage, function(){
												var contents = [];
												if(innerPage['data']['contents'][0] != undefined && innerPage['data']['contents'][0].constructor == Object){
													contents = innerPage['data']['contents'];
												}else{
													contents = innerPage['data']['contents'][0];
												}
												
												//if(intialContentLength != contents.length){
													intialContentLength = 0;
													$.mobileweb.getCurrentPage()['children'][l]['children'][0]['group'][0]['row'] = [];
													$('#' + innerPage['name'] + "_section").find('ul').empty();
													
													var noOFNewRowsAdded = contents.length  - intialContentLength;
													for(var k = 0; k < noOFNewRowsAdded; k++){
														var rownum =intialContentLength + k;
														$.createRemoteListPageRow(innerPage,baseId,innerPage['children'][0]['group'][0]['row'][rownum],intialContentLength+(k),innerPage['children'][0]['group'][0]['flexibleHeight'],function(row){
															innerPage['children'][0]['group'][0]['row'][rownum] = row;
															$.mobileweb.getCurrentPage()['children'][l]['children'][0]['group'][0]['row'].push(innerPage['children'][0]['group'][0]['row'][rownum]);
															$('#' + innerPage['name'] + "_section").find('ul').append($.mobileweb.getCurrentPage()['children'][l]['children'][0]['group'][0]['row'][rownum].getHTML());
															$.mobileweb.getCurrentPage()['children'][l]['children'][0]['group'][0]['row'][rownum].applyOverrides();
															$.mobileweb.getCurrentPage()['children'][l]['children'][0]['group'][0]['row'][rownum].applyEvents();
															
															utilmethods.showLoading = false;
															$("#"+innerPage['name'] +"_section").find('ul').unblock();
															$('.ui-loader').css({'display': 'none'});
															$("#"+innerPage['name']+"_section").removeClass("scrollSectionDB");
															$("#"+innerPage['name']+"_section").addClass("scrollSectionDB");
															var scrollerid = $('#'+innerPage['name']+'_div .scrollSectionDB').get(0);
															var timer = setInterval(function() {
																clearInterval(timer);
																$("#" + innerPage['name'] +"_section" + "> div:nth-child(2)").remove();
																myScroll = new iScroll(scrollerid, {
																	//useTransform: false,
																	onScrollEnd: function() {
																		curScrollPos = $(this).get(0).y;
																		var offset1 = {page_name:$.mobileweb.getCurrentPage().getName(),x:curScrollPos};
																		$.utility('setSessionData',offset1,"offset1");
																	},
																	bounceLock: true,
																	onBeforeScrollStart: function (e) {
																		var target = e.target;
																		while (target.nodeType != 1) target = target.parentNode;
																		if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
																			e.preventDefault();
																	} 
																});	
																
																if($.utility('getSessionData',"offset1")!=null)
																{
																	var offset1 = $.utility('getSessionData',"offset1");
																	offset1 = $.parseJSON(offset1);	
																	myScroll.scrollTo(0, offset1["x"], 1);	
																}
															},100);
															
														});
													}
//												}
//												else{
//													utilmethods.showLoading = false;
//													$("#"+innerPage['name'] +"_section").find('ul').unblock();
//													$('.ui-loader').css({'display': 'none'});
//												}
											});
												
										});
									}
								});
							}else if(innerPage['type'] === 'RemoteTableViewList'){
								
								$.each($.mobileweb.getCurrentPage()['children'] , function(l, currentPageChild){
									if(currentPageChild.getViewType() === 'RemoteTableViewList' && innerPage['name'] === currentPageChild.getName()){
										if(innerPage['data']['contentsReloaded'] != undefined){
											innerPage['data']['contentsReloaded'] = false;
										}
										utilmethods.showLoading = true;
										$("#"+innerPage['name']+"_section").css({'overflow':'hidden'});
										$("#"+innerPage['name'] + "_section").find('ul').block({
											message : '',// <p>Loading...<p>
											overlayCSS : {
												opacity : 0.5
											},
											css : {
												border : 'none',
												padding : '15px',
												backgroundColor : '#000',
												'-webkit-border-radius' : '10px',
												'-moz-border-radius' : '10px',
												opacity : 1,
												color : '#fff'
											}
										});
										$('.ui-loader').css({'display': 'block',  'left': (((parseFloat(innerPage['x']) + parseFloat(innerPage['width']/2))* $.mobileweb.device['aspectratio']) + parseFloat($('.scroller').css('left').replace("px",""))) + "px", 'top' : (innerPage['y'] + (innerPage['height']/2))* $.mobileweb.device['aspectratio'] + "px"});
										
										var intialContentLength = innerPage['data']['contents'][0].length;
										if(innerPage['children'][0]['accordion'] != true)
											$.fetchRemoteDBRecords(innerPage,page['name'],"reloadDBListViewPageRows");
										var TestVar=setInterval(function() {
											//if(innerPage['data']['contentsReloaded'] != undefined && innerPage['data']['contentsReloaded'] ){
												clearInterval(TestVar);
												if(innerPage['children'][0]['accordion']){
													$('.ui-loader').css({'display': 'none'});
													$("#"+innerPage['name'] +"_section").find('ul').unblock();
													var _selectOrder = (innerPage['data']['order'] &&  innerPage['data']['order'] !== '') ? innerPage['data']['order'] : "";//Bug #12419 fix
							                        new $.actions(innerPage, null, [{method:"Select", category:"ComAction",reloadStatus:true,reloadCallback:"reloadDBAccordionView",callingMethod : "reload",
							    						params:{
							    							servicename: innerPage['data']['servicename'],
							    							table:innerPage['data']['tablename'],
							    							where: $.utility("tokenizeString",innerPage['data']['wherecond'], innerPage),
							    							order: $.utility("tokenizeString",_selectOrder, innerPage),
							    							offset: 0,
							    							fields:""
							    						}
							    					}]).execute();
												}else{
													$.createRemoteDBListViewPageRows(innerPage, function(){
														if(intialContentLength < innerPage['data']['contents'][0].length){
															var noOFNewRowsAdded = innerPage['data']['contents'][0].length  - intialContentLength;
															for(var k = 0; k < noOFNewRowsAdded; k++){
																var rownum =intialContentLength + k;
																$.createRow(innerPage,intialContentLength + k,innerPage['children'][0]['group'][0]['row'][rownum],intialContentLength + k+1,function(row){
																	innerPage['children'][0]['group'][0]['row'][rownum] = row;
																	$.mobileweb.getCurrentPage()['children'][l]['children'][0]['group'][0]['row'].push(innerPage['children'][0]['group'][0]['row'][rownum]);
																	$('#' + innerPage['name'] + "_section").find('ul').append($.mobileweb.getCurrentPage()['children'][l]['children'][0]['group'][0]['row'][rownum].getHTML().join(''));
																	$.mobileweb.getCurrentPage()['children'][l]['children'][0]['group'][0]['row'][rownum].applyOverrides();
																	$.mobileweb.getCurrentPage()['children'][l]['children'][0]['group'][0]['row'][rownum].applyEvents();
																	utilmethods.showLoading = false;
																	$("#"+innerPage['name'] +"_section").find('ul').unblock();
																	$('.ui-loader').css({'display': 'none'});
																	$("#"+innerPage['name']+"_section").removeClass("scrollSectionDB");
																	$("#"+innerPage['name']+"_section").addClass("scrollSectionDB");
																	var scrollerid = $('#'+innerPage['name']+'_div .scrollSectionDB').get(0);
																	var timer = setInterval(function() {
																		clearInterval(timer);
																		$("#" + innerPage['name'] +"_section" + "> div:nth-child(2)").remove();
																		myScroll = new iScroll(scrollerid, {
																			bounceLock: true,
																			onBeforeScrollStart: function (e) {
																				var target = e.target;
																				while (target.nodeType != 1) target = target.parentNode;
																				if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
																					e.preventDefault();
																			} 
																		});	
																	},100);
																});
															}
														}else{
															$('.ui-loader').css({'display': 'none'});
														}
													});
												//}
//												$.createRemoteDBListViewPageRows(innerPage, function(){
//													if(intialContentLength < innerPage['data']['contents'][0].length){
//														var noOFNewRowsAdded = innerPage['data']['contents'][0].length  - intialContentLength;
//														for(var k = 0; k < noOFNewRowsAdded; k++){
//															var rownum =intialContentLength + k;
//															$.createRow(innerPage,intialContentLength + k,innerPage['children'][0]['group'][0]['row'][rownum],intialContentLength + k+1,function(row){
//																innerPage['children'][0]['group'][0]['row'][rownum] = row;
//																$.mobileweb.getCurrentPage()['children'][l]['children'][0]['group'][0]['row'].push(innerPage['children'][0]['group'][0]['row'][rownum]);
//																$('#' + innerPage['name'] + "_section").find('ul').append($.mobileweb.getCurrentPage()['children'][l]['children'][0]['group'][0]['row'][rownum].getHTML().join(''));
//																$.mobileweb.getCurrentPage()['children'][l]['children'][0]['group'][0]['row'][rownum].applyOverrides();
//																$.mobileweb.getCurrentPage()['children'][l]['children'][0]['group'][0]['row'][rownum].applyEvents();
//																utilmethods.showLoading = false;
//																$("#"+innerPage['name'] +"_section").find('ul').unblock();
//																$('.ui-loader').css({'display': 'none'});
//																$("#"+innerPage['name']+"_section").removeClass("scrollSectionDB");
//																$("#"+innerPage['name']+"_section").addClass("scrollSectionDB");
//																var scrollerid = $('#'+innerPage['name']+'_div .scrollSectionDB').get(0);
//																var timer = setInterval(function() {
//																	clearInterval(timer);
//																	$("#" + innerPage['name'] +"_section" + "> div:nth-child(2)").remove();
//																	myScroll = new iScroll(scrollerid, {
//																		bounceLock: true,
//																		onBeforeScrollStart: function (e) {
//																			var target = e.target;
//																			while (target.nodeType != 1) target = target.parentNode;
//																			if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
//																				e.preventDefault();
//																		} 
//																	});	
//																},100);
//															});
//														}
//													}else{
//														$('.ui-loader').css({'display': 'none'});
//													}
//												});
											}
										},300);
									}
								});
							}
						}
					});
				}
			});
		},
        
        reloadDBAccordionView : function(page, createRowStatus){
			$.utility("showLoadingIndicator", true);
			
			$("#iscroll_" + page['name'] + "> div:nth-child(2)").remove();
			var baseId = $("#"+page['children'][0]['id']+" ul").attr('id');
            if(baseId)      $("#"+baseId+" li").remove();
            
            if(page['type'] === "DBTableViewList" || page['type'] === "RemoteTableViewList"){
                console.log(createRowStatus, page['data']['contents'].length);

                $.createRemoteDBListViewPageRows(page, function(page){
                    if(page['data']['contents'].length != 0){
                        if(page['data']['pagedata'] != undefined && page['data']['contents'].length == 1){
                            if(page['data']['pagedata'] === page['data']['contents'][0]){
                                $.utility("showLoadingIndicator", false);
                                return;
                            }
                        }
                        $("#"+page['children'][0]['id']).empty();
                        
                        var accordiontable = $.accordiontable(page, page['children'][0]);
                        var listH = [];
                        for(var i =0; i < accordiontable['group'].length; i++){
							$.createAccordionListGroup(page, accordiontable['group'][i], i, listH, function(newGroup){
								$("#"+page['children'][0]['id']).append(newGroup.getHTML());
								newGroup.applyOverrides();
								newGroup.applyEvents();
							});
                        }
                        
                        var myPage = $.mobileweb.getPage(page['name'], page['reverse']);
                        myPage.refreshDisplay(true);
                        
                        var timer = setInterval(function() {
							clearInterval(timer);
							if($('#iscroll_'+page['name']).get(0) != undefined){
								$('#iscroll_'+page['name']).css({"width" : parseInt($('#iscroll_'+page['name']).css('width').replace('px',''))+20+'px'});
								$('#iscroll_'+page['name']).css({"overflow-x" : "hidden", "overflow-y" : "overlay"});
							}
						},800);
                        
                    }
                });
            }

            $.utility("showLoadingIndicator", false);
        },
		
		reloadRemoteListViewPage : function(page, createRowStatus){
			$.utility("showLoadingIndicator", true);
//			$("#showmore").remove();
//			if(page['iscroll'] != undefined){
//				page['iscroll'].destroy();
//				$("#iscroll_" + page['name'] + "> div:nth-child(2)").remove();
//			}
			var _totalRecords = $.mobileweb['__PAGENUMREC__'];
			var baseId = $("#"+page['children'][0]['id']+" ul").attr('id');
			if($('#pagination-container').length === 0)
				$("#"+page['children'][0]['id']).append("<div id='pagination-container'><p id='paginationMsg'></p></div>")
			$("#"+baseId+" li").remove();
			
			var scroller_height;
			if(page['type'] === "DBTableViewList"){
				if(createRowStatus == undefined || !createRowStatus){
                    if(page['children'][0]['accordion']){
                        var _selectOrder = (page['data']['groupby'] &&  page['data']['groupby'] !== '') ? page['data']['groupby'] : "";
                        new $.actions(page, null, [{method:"Select",reloadStatus:true, reloadCallback:"reloadDBAccordionView",category:"DBAction", params:{tablename:page['data']['tablename'], where:$.utility("tokenizeString",page['data']['wherecond'], page), order:$.utility("tokenizeString",_selectOrder, page), columns:""}, events:[]}]).execute();
                    }else{
                        //Added limit and offset for local db optimization-->Richa
                        new $.actions(page, null, [{method:"Select",reloadStatus:true, reloadCallback:"reloadRemoteListViewPage",category:"DBAction", params:{tablename:page['data']['tablename'], where:$.utility("tokenizeString",page['data']['wherecond'], page), order:$.utility("tokenizeString",page['data']['order'], page),limit : 25,offset: 0,  columns:""}, events:[]}]).execute();
                    }	
				}else{
					//$('#pagination-container').css({'visibility' : 'hidden'});
					new $.actions(page, null, [{method:"NumRecords", category:"DBAction",
						params:{
							table: page['data']['tablename'],
							where: page['data']['wherecond'],
							order: page['data']['order'],
							fields:""
						}
					}]).execute();
					var innerPage = page;
					/*var myPage = $.mobileweb.getPage(innerPage['name']);
					$.mobileweb.setCurrentPage(myPage);*/
					$.createRemoteDBListViewPageRows(page, function(page){
						if(page['data']['contents'].length != 0){
							if(page['data']['pagedata'] != undefined && page['data']['contents'].length == 1){
								if(page['data']['pagedata'] === page['data']['contents'][0]){
								  	$.utility("showLoadingIndicator", false);
								  	return;
								}
							}
							$(".ui-table-position").css({'visibility':'visible'});
							
							$('#empty_list').css({'visibility':'hidden'});							
							function renderRows(){
								var baseId = $("#"+page['children'][0]['id']+" ul").attr('id');
								$("#"+baseId+" li").remove();
								$('#pagination-container').css({'visibility':'visible'});
						    	$.each(page['data']['contents'], function(i, item) {
									page['children'][0]['group'][0]['row'][i]['data']['contents'][0]= item;
									$.createRemoteListPageRow(page,baseId, page['children'][0]['group'][0]['row'][i], i, page['children'][0]['group'][0]['flexibleHeight'], function(newRow){
										$(".scroller").find('ul').first().append(newRow.getHTML());
										newRow.applyOverrides();
										newRow.applyEvents();
										$.utility("showLoadingIndicator", false);
									});
									
									if(i === page['data']['contents'].length - 1){
										var pageclientH = 0;
										if($('#iscroll_'+page['name'])[0] != undefined)
											pageclientH = $('#iscroll_'+page['name'])[0].clientHeight;
										
										if(pageclientH > 0) {
											if(pageclientH < parseFloat($(".scroller").find('ul').css('height'))){
												$('.bglayout').css({'height': parseFloat($(".scroller").find('ul').css('height'))+ 100 +'px'});
												$(".scroller").css({"height" : parseFloat($(".scroller").find('ul').css('height')) + 100+ "px"});
												
												if($.mobileweb.device['type'] === 'Desktop'){
													$('#iscroll_'+page['name']).css({'overflow-y':'scroll','overflow-x':'hidden'});
													$('#iscroll_'+page['name']).animate({ scrollTop: 0 }, "fast");
												}
											}else{
												if($.mobileweb.device['type'] === 'Desktop'){
													$('#iscroll_'+page['name']).css({'overflow-y':'scroll','overflow-x':'hidden'});
													$('#iscroll_'+page['name']).animate({ scrollTop: 0 }, "fast");
												}else
													$('#iscroll_'+page['name']).css({'overflow-y':'hidden','overflow-x':'hidden'});
												$('.bglayout').css({'height': pageclientH + 100 +'px'});
												$(".scroller").css({"height" : pageclientH + 100 + "px"});
											}
										}
										$.unblockUI();
									}
						    	});
							}
							
							function renderPaginationContainer(limit){
								$('#pagination-container').bootpag({
						            total: (_totalRecords != undefined) ? Math.ceil(_totalRecords / limit) : 1,
						            page: (page['selectedPage'] != undefined) ? page['selectedPage'] : 1,
						            maxVisible: 4,
						            firstLastUse: true,
						            leaps: false
						        }).off("page").on("page", function(event, pageNum) {
						        	var offset = limit * (pageNum- 1);	
						        	page['selectedPage'] = pageNum;
						        	new $.actions(page, null, [{method:"Select",reloadStatus:true, reloadCallback:"reloadRemoteListViewPage",category:"DBAction", params:{tablename:page['data']['tablename'], where:$.utility("tokenizeString",page['data']['wherecond'], page), order:$.utility("tokenizeString",page['data']['order'], page),limit : limit,offset: offset,  columns:""}, events:[]}]).execute();
									var myVar=setInterval(function() {
										if(page['data']['contents']['offset'] == offset){
											clearInterval(myVar);
											renderRows();
											if(_totalRecords >=  (limit * (pageNum)))
												$('#paginationMsg').html('Showing ' + ((limit * (pageNum- 1)) + 1) + '-' + (limit * (pageNum)) + ' of ' + _totalRecords + ' items');
											else
												$('#paginationMsg').html('Showing ' + ((limit * (pageNum- 1)) + 1) + '-' + _totalRecords + ' of ' + _totalRecords + ' items');
										}
									}, 300);
						        	
								});
							}
							
							var _limit =  ($('#recordsLength').length > 0)? $('#recordsLength').val() : 25;
							renderPaginationContainer(_limit);
							renderRows();
							if(_totalRecords >= _limit)
								$('#paginationMsg').html('Showing 1-'+ _limit + '  of ' + _totalRecords + ' items');
							else
								$('#paginationMsg').html('Showing 1-'+ _totalRecords +' of ' + _totalRecords + ' items');
							
							if($('#recordsLength').length === 0){
								$('#pagination-container').append("<select id='recordsLength'> <option value='10'>10/Page</option><option value='25' selected='selected'>25/Page</option> <option value='50'>50/Page</option></select>")
								var _left = parseFloat($('#paginationMsg').css('width'));
								if(page['data']['contents'].length < _limit)
									$('.pagination').css({'visibility' : 'hidden'});
								else{
									_left = parseFloat($('#paginationMsg').css('width')) + parseFloat($('.pagination').css('width')) + 5;
									$('.pagination').css({'visibility' : 'visible'});
								}
								$('#recordsLength').css({'left': _left + 5 + "px" });
								$('#recordsLength').on("change",function(e){
									var limit =  parseInt($('#recordsLength').val());
									if(page['data']['contents'].length < limit)
										$('.pagination').css({'visibility' : 'hidden'});
									else{
										_left = parseFloat($('#paginationMsg').css('width')) + parseFloat($('.pagination').css('width')) + 5;
										$('.pagination').css({'visibility' : 'visible'});
									}
									$('#recordsLength').css({'left': _left + "px" });
									var offset = 0;
									new $.actions(page, null, [{method:"Select",reloadStatus:true, reloadCallback:"reloadRemoteListViewPage",category:"DBAction", params:{tablename:page['data']['tablename'], where:$.utility("tokenizeString",page['data']['wherecond'], page), order:$.utility("tokenizeString",page['data']['order'], page),limit : limit,offset: 0,  columns:""}, events:[]}]).execute();
									var myVar=setInterval(function() {
										if(page['data']['contents']['offset'] == offset){
											clearInterval(myVar);
											renderPaginationContainer(limit);
											renderRows();
											if(_totalRecords >=  limit)
												$('#paginationMsg').html('Showing ' + (offset + 1) + '-' + limit  + ' of ' + _totalRecords + ' items');
											else
												$('#paginationMsg').html('Showing ' + (offset + 1) + '-' + _totalRecords  + ' of ' + _totalRecords + ' items');
										}
									}, 300);
								});
							}else{
								var _left = parseFloat($('#paginationMsg').css('width'));
								if(page['data']['contents'].length < _limit){
									if(page['selectedPage'] == 1)
										$('.pagination').css({'visibility' : 'hidden'});
								}
								else{
									_left = parseFloat($('#paginationMsg').css('width')) + parseFloat($('.pagination').css('width')) + 5;
									$('.pagination').css({'visibility' : 'visible'});
								}
								$('#recordsLength').css({'left': _left + 5 + "px" });
							} 			
							
							var myPage = $.mobileweb.getPage(page['name']);
							$.utility('setAppBootingForFirstTime', false);
							//myPage.refreshDisplay(true);
							myPage['header'].applyOverrides();
							myPage['footer'].applyOverrides();
							myPage['toolbartop'].applyOverrides(true);
							myPage['toolbarbottom'].applyOverrides(true);
							if($.mobileweb.getCurrentPage()['children'] != undefined){
								if($.mobileweb.getCurrentPage()['children'].length > 0){
									if($.mobileweb.getCurrentPage()['children'][0]['group'] != undefined){
										if(page['children'][0]['group'][0]['row'].length != $.mobileweb.getCurrentPage()['children'][0]['group'][0]['row'].length)
											$.mobileweb.setCurrentPage(myPage);		//Bug #9909, Dated :: 06-Oct-2017
									}
								}
							}
//							$.unblockUI();
							$.utility("setReverseTransition", false);
							
							
//							for(var i =0; i < page['data']['contents'].length; i++){
//								page['children'][0]['group'][0]['row'][i]['data']['contents'][0]= page['data']['contents'][i];
//								$.createRemoteListPageRow(page,baseId, page['children'][0]['group'][0]['row'][i], i, page['children'][0]['group'][0]['flexibleHeight'], function(newRow){
//									$(".scroller").find('ul').append(newRow.getHTML());
//									newRow.applyOverrides();
//									newRow.applyEvents();
//									$.utility("showLoadingIndicator", false);
//								});
//								$.createShowMorebutton(page,baseId,createRowStatus);
//								
//								if(i === page['data']['contents'].length - 1){
//									if($.mobileweb.device['type'] === 'Desktop'){
//										$('#iscroll_'+page['name']).css({'overflow-y':'scroll','overflow-x':'hidden'});
//									}else{
//										page['iscroll'] = {};
//										if($('#iscroll_'+page['name']).get(0) != undefined){
//											page['iscroll'] = new iScroll($('#iscroll_'+page['name']).get(0), {
//												//useTransform: false,
//												bounceLock: true,
//												onBeforeScrollStart: function (e) {
//													var target = e.target;
//													while (target.nodeType != 1) target = target.parentNode;
//													if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
//														e.preventDefault();
//												}
//											});
//										}
//									}								
//									
//									var myPage = $.mobileweb.getPage(page['name'], page['reverse']);
//									$.utility('setAppBootingForFirstTime', false);
//									//myPage.refreshDisplay(true);
//									myPage['header'].applyOverrides();
//									myPage['footer'].applyOverrides();
//									myPage['toolbartop'].applyOverrides(true);
//									myPage['toolbarbottom'].applyOverrides(true);
//									
//									
//									scroller_height =$(".scroller").css("height");
//									$(".scroller").css({"height" : $('.bglayout').css('height')});//Richa--10550
//									if($.utility('getSessionData',"offset")!=null)
//									{
//										var offset = $.utility('getSessionData',"offset");
//										offset = $.parseJSON(offset);		
//										if($.mobileweb.getCurrentPage().getName()==offset["page_name"])
//										{
//											page['iscroll'].scrollTo(0, offset["x"], 1);
//										}
//									}
//									
//									if((page['name'] == $.mobileweb.getCurrentPage().getName()) && $.mobileweb.getCurrentPage()['children'] != undefined){
//										if(page['children'][0]['group'][0]['row'].length != $.mobileweb.getCurrentPage()['children'][0]['group'][0]['row'].length){
//											var preChild = $.mobileweb.getCurrentPage()['children'];
//											$.mobileweb.setCurrentPage(myPage);	//<-- Since on 'ResetViewData', current DB-page rows not updating in case of insert/delete. So resetting currentpage. Bug #9909, Dated :: 06-Oct-2017
//											$.mobileweb.getCurrentPage()['children'] = preChild;
//										}	
//									}
//								}
//							}
						}else{
							$.unblockUI();
							$('#empty_list').css({'visibility':'visible'});
							$(".ui-table-position").css({'visibility':'visible'});
							$.utility("showLoadingIndicator", false);
						}
					});
				}
			}else if(page['type'] === "RemoteTableViewList"){
				if(createRowStatus == undefined || !createRowStatus){
					 if(page['children'][0]['accordion']){
	                        var _selectOrder = (page['data']['order'] &&  page['data']['order'] !== '') ? page['data']['order'] : "";//Bug #12419 fix
	                        new $.actions(page, null, [{method:"Select", category:"ComAction",reloadStatus:true,reloadCallback:"reloadDBAccordionView",callingMethod : "reload",
	    						params:{
	    							servicename: page['data']['servicename'],
	    							table:page['data']['tablename'],
	    							where: $.utility("tokenizeString",page['data']['wherecond'], page),
	    							order: $.utility("tokenizeString",_selectOrder, page),
	    							offset: 0,
	    							fields:""
	    						}
	    					}]).execute();
	                    }else{
	                    	new $.actions(page, null, [{method:"Select", category:"ComAction",reloadStatus:true,reloadCallback:"reloadRemoteListViewPage",callingMethod : "reload",
	    						params:{
	    							servicename: page['data']['servicename'],
	    							table:page['data']['tablename'],
	    							where: $.utility("tokenizeString",page['data']['wherecond'], page),
	    							order: $.utility("tokenizeString",page['data']['order'], page),
//	    							limit : 25,
	    							limit: ($('#recordsLength').length > 0)? $('#recordsLength').val():25,
	    							offset: 0,
	    							fields:""
	    						}
	    					}]).execute();
	                    }	
				}else{
					var innerPage = page;
					$('#pagination-container').css({'visibility' : 'hidden'});
					setTimeout(function(){
						new $.actions(page, null, [{method:"Select", category:"ComAction", callingMethod:"RemoteNumRecords",
							params:{
								servicename: page['data']['servicename'],
								table: page['data']['tablename'],
								where: page['data']['wherecond'],
								order: page['data']['order'],
								fields:"",
								pageNumRecords: true,
								reload: false
							}
						}]).execute();
					},1000);
				/*	var myPage = $.mobileweb.getPage(innerPage['name']);
					$.mobileweb.setCurrentPage(myPage);*/
					$.createRemoteDBListViewPageRows(page, function(page){
						if(page['data']['contents'].length != 0){
							$('#empty_list').css({'visibility':'hidden'});
							$(".ui-table-position").css({'visibility':'visible'});
							page['selectedPage'] = 1;
							
							function renderRows(){
								var baseId = $("#"+page['children'][0]['id']+" ul").attr('id');
								$("#"+baseId+" li").remove();
								//$('#pagination-container').css({'visibility':'visible'});
						    	$.each(page['data']['contents'], function(i, item) {
						    		if(page['children'][0]['group'][0]['row'][i] != undefined){
						    			page['children'][0]['group'][0]['row'][i]['data']['contents'][0]= item;
										$.createRemoteListPageRow(page,baseId, page['children'][0]['group'][0]['row'][i], i, page['children'][0]['group'][0]['flexibleHeight'], function(newRow){
											$(".scroller").find('ul').first().append(newRow.getHTML());
											newRow.applyOverrides();
											newRow.applyEvents();
											$.utility("showLoadingIndicator", false);
										});
						    		}
									
									if(i === page['data']['contents'].length - 1){
										var pageclientH = 0;
										if($('#iscroll_'+page['name'])[0] != undefined)
											pageclientH = $('#iscroll_'+page['name'])[0].clientHeight;
										
										if(pageclientH > 0) {
											if(pageclientH < parseFloat($(".scroller").find('ul').css('height'))){
												$('.bglayout').css({'height': parseFloat($(".scroller").find('ul').css('height'))+ 100 +'px'});
												$(".scroller").css({"height" : parseFloat($(".scroller").find('ul').css('height')) + 100+ "px"});
												
												if($.mobileweb.device['type'] === 'Desktop'){
													$('#iscroll_'+page['name']).css({'overflow-y':'scroll','overflow-x':'hidden'});
													$('#iscroll_'+page['name']).animate({ scrollTop: 0 }, "fast");
												}
											}else{
												if($.mobileweb.device['type'] === 'Desktop'){
													$('#iscroll_'+page['name']).css({'overflow-y':'scroll','overflow-x':'hidden'});
													$('#iscroll_'+page['name']).animate({ scrollTop: 0 }, "fast");
												}else
													$('#iscroll_'+page['name']).css({'overflow-y':'hidden','overflow-x':'hidden'});
												
												$('.bglayout').css({'height': pageclientH + 100 +'px'});
												$(".scroller").css({"height" : pageclientH + 100 + "px"});
											}
										}
										$.unblockUI();
									}
						    	});
							}
							
							function renderPaginationContainer(limit){
								$('#pagination-container').bootpag({
						            total: (_totalRecords != undefined) ? Math.ceil(_totalRecords / limit) : 0,
						            maxVisible: 4,
						            page: (page['selectedPage'] != undefined) ? page['selectedPage'] : 1,
						            firstLastUse: true,
						            leaps: false
						        }).off("page").on("page", function(event, pageNum) {
						        	var offset = limit * (pageNum- 1);	
						        	page['selectedPage'] = pageNum;
									new $.actions(page, null, [{method:"Select", category:"ComAction",
			  							params:{
			 								servicename: page['data']['servicename'],
			 								table: page['data']['tablename'],
			 								where: page['data']['wherecond'],
			 								order: page['data']['order'],
			 								offset: offset,
			  								limit : limit,
			  								fields:""
			  							}
			  						}]).execute();
									
									var myVar=setInterval(function() {
										if(page['data']['contents']['offset'] == offset){
											clearInterval(myVar);
											renderRows();
											if(_totalRecords >=  (limit * (pageNum)))
												$('#paginationMsg').html('Showing ' + ((limit * (pageNum- 1)) + 1) + '-' + (limit * (pageNum)) + ' of ' + _totalRecords + ' items');
											else
												$('#paginationMsg').html('Showing ' + ((limit * (pageNum- 1)) + 1) + '-' + _totalRecords + ' of ' + _totalRecords + ' items');
										}
									}, 300);
						        	
								});
							}
							
							var _limit =  ($('#recordsLength').length > 0)? $('#recordsLength').val() : 25;
							setTimeout(function(){
						    	_totalRecords =  pageRecordsTotal;
						    	if(_totalRecords === 0){
						    		$('#pagination-container').css({'visibility':'hidden'});		;
									if(page['iscroll'] != undefined){
										page['iscroll'].destroy();
										$("#iscroll_" + page['name'] + "> div:nth-child(2)").remove();
									}
									var baseId = $("#"+page['children'][0]['id']+" ul").attr('id');
									$("#"+baseId+" li").remove();
									
									$.unblockUI();
									$('#empty_list').css({'visibility':'visible'});
									$(".ui-table-position").css({'visibility':'visible'});
									$.utility("showLoadingIndicator", false);
									return;
								}
						    	renderPaginationContainer(_limit);
						    	var _left = parseFloat($('#paginationMsg').css('width'));
								if(_limit >  _totalRecords)
									$('.pagination').css({'visibility' : 'hidden'});
								else{
									_left = parseFloat($('#paginationMsg').css('width')) + parseFloat($('.pagination').css('width')) + 15;
									$('.pagination').css({'visibility' : 'visible'});
								}
								$('#recordsLength').css({'left': _left + "px" });
							
								if(_totalRecords >= _limit)
									$('#paginationMsg').html('Showing 1-'+ _limit + '  of ' + _totalRecords + ' items');
								else
									$('#paginationMsg').html('Showing 1-'+ _totalRecords +' of ' + _totalRecords + ' items');
									$('#pagination-container').css({'visibility' : 'visible'});
						    },3000);
							var myVar=setInterval(function() {
								if(page['data']['contents'].length === page['children'][0]['group'][0]['row'].length){
									clearInterval(myVar);
									renderRows();
								}
							}, 300);
//							renderPaginationContainer(_limit);
//							if(_totalRecords === 0){
//								$.unblockUI();
//								$('#empty_list').css({'visibility':'visible'});
//								$(".ui-table-position").css({'visibility':'visible'});
//								$.utility("showLoadingIndicator", false);
//								return;
//							}
							
//							var myVar=setInterval(function() {
//								if(page['data']['contents'].length === page['children'][0]['group'][0]['row'].length){
//									clearInterval(myVar);
//									var _left = parseFloat($('#paginationMsg').css('width'));
//									if(_limit >  _totalRecords)
//										$('.pagination').css({'visibility' : 'hidden'});
//									else{
//										_left = parseFloat($('#paginationMsg').css('width')) + parseFloat($('.pagination').css('width')) + 15;
//										$('.pagination').css({'visibility' : 'visible'});
//									}
//									$('#recordsLength').css({'left': _left + "px" });
//									renderRows();
//									if(_totalRecords >= _limit)
//										$('#paginationMsg').html('Showing 1-'+ _limit + '  of ' + _totalRecords + ' items');
//									else
//										$('#paginationMsg').html('Showing 1-'+ _totalRecords +' of ' + _totalRecords + ' items');
//								}
//							}, 300);
							
							if($('#recordsLength').length === 0){
								$('#pagination-container').append("<select id='recordsLength'> <option value='10'>10/Page</option><option value='25' selected='selected'>25/Page</option> <option value='50'>50/Page</option></select>")
								$('#recordsLength').on("change",function(e){
									var limit =  parseInt($('#recordsLength').val());
									page['selectedPage'] = 1;
									var _left = parseFloat($('#paginationMsg').css('width'));
									$('#pagination-container').css({'visibility' : 'hidden'});
									
									var offset = 0;
									new $.actions(page, null, [{method:"Select", category:"ComAction",
			  							params:{
			 								servicename: page['data']['servicename'],
			 								table: page['data']['tablename'],
			 								where: page['data']['wherecond'],
			 								order: page['data']['order'],
			 								offset: offset,
			  								limit : limit,
			  								fields:""
			  							}
			  						}]).execute();
									var myVar=setInterval(function() {
										if(page['data']['contents']['offset'] == offset){
											clearInterval(myVar);
											$('#pagination-container').css({'visibility' : 'visible'});
											if(limit >  _totalRecords)
												$('.pagination').css({'visibility' : 'hidden'});
											else{
												_left = parseFloat($('#paginationMsg').css('width')) + parseFloat($('.pagination').css('width')) + 15;
												$('.pagination').css({'visibility' : 'visible'});
											}
											$('#recordsLength').css({'left': _left + "px" });
											if(_totalRecords >  limit){
												renderPaginationContainer(limit);
											}
//											renderPaginationContainer(limit);
											renderRows();
											if(_totalRecords >=  limit)
												$('#paginationMsg').html('Showing ' + (offset + 1) + '-' + limit  + ' of ' + _totalRecords + ' items');
											else
												$('#paginationMsg').html('Showing ' + (offset + 1) + '-' + _totalRecords  + ' of ' + _totalRecords + ' items');
										}
									}, 500);
								});
							}else{
								$('#pagination-container').css({'visibility' : 'hidden'});
								var _left = parseFloat($('#paginationMsg').css('width'));
								if(_limit >  _totalRecords)
									$('.pagination').css({'visibility' : 'hidden'});
								else{
									_left = parseFloat($('#paginationMsg').css('width')) + parseFloat($('.pagination').css('width')) + 15;
									//$('.pagination').css({'visibility' : 'visible'});
								}
								$('#recordsLength').css({'left': _left + "px" });
								$('#recordsLength').off("change").on("change",function(e){
									var limit =  parseInt($('#recordsLength').val());
									page['selectedPage'] = 1;
									var _left = parseFloat($('#paginationMsg').css('width'));
									
									if(limit >  _totalRecords){
										$('#paginationMsg').html('Showing 1-'+ _totalRecords + '  of ' + _totalRecords + ' items');
										return;
									}
									var offset = 0;
									new $.actions(page, null, [{method:"Select", category:"ComAction",
			  							params:{
			 								servicename: page['data']['servicename'],
			 								table: page['data']['tablename'],
			 								where: page['data']['wherecond'],
			 								order: page['data']['order'],
			 								offset: offset,
			  								limit : limit,
			  								fields:""
			  							}
			  						}]).execute();
									var myVar=setInterval(function() {
										if(page['data']['contents']['offset'] == offset){
											clearInterval(myVar);
											$('#pagination-container').css({'visibility' : 'visible'});
											if(limit >  _totalRecords)
												$('.pagination').css({'visibility' : 'hidden'});
											else{
												_left = parseFloat($('#paginationMsg').css('width')) + parseFloat($('.pagination').css('width')) + 15;
												$('.pagination').css({'visibility' : 'visible'});
											}
											$('#recordsLength').css({'left': _left + "px" });
											renderPaginationContainer(limit);
											renderRows();
											if(_totalRecords >=  limit)
												$('#paginationMsg').html('Showing ' + (offset + 1) + '-' + limit  + ' of ' + _totalRecords + ' items');
											else
												$('#paginationMsg').html('Showing ' + (offset + 1) + '-' + _totalRecords  + ' of ' + _totalRecords + ' items');
										}
									}, 500);
								});
							} 			
							
							var myPage = $.mobileweb.getPage(page['name']);
							$.utility('setAppBootingForFirstTime', false);
							//myPage.refreshDisplay(true);
							myPage['header'].applyOverrides();
							myPage['footer'].applyOverrides();
							myPage['toolbartop'].applyOverrides(true);
							myPage['toolbarbottom'].applyOverrides(true);
							if($.mobileweb.getCurrentPage()['children'] != undefined){
								if($.mobileweb.getCurrentPage()['children'].length > 0){
									if($.mobileweb.getCurrentPage()['children'][0]['group'] != undefined){
										if(page['children'][0]['group'][0]['row'].length != $.mobileweb.getCurrentPage()['children'][0]['group'][0]['row'].length)
											$.mobileweb.setCurrentPage(myPage);		//Bug #9909, Dated :: 06-Oct-2017
									}
								}
							}
//							$.unblockUI();
							$.utility("setReverseTransition", false);//Bug #13254 fix  
//							for(var i =0; i < page['data']['contents'].length;i++){
//								page['children'][0]['group'][0]['row'][i]['data']['contents'][0]= page['data']['contents'][i];
//								$.createRemoteListPageRow(page,baseId, page['children'][0]['group'][0]['row'][i], i, page['children'][0]['group'][0]['flexibleHeight'], function(newRow){
//									$(".scroller").find('ul').append(newRow.getHTML());
//									newRow.applyOverrides();
//									newRow.applyEvents();
//									$.utility("showLoadingIndicator", false);
//								});
//								
//								if(i === page['data']['contents'].length - 1){
//									var pageclientH = 0;
//									if($('#iscroll_'+page['name'])[0] != undefined)
//										pageclientH = $('#iscroll_'+page['name'])[0].clientHeight;
////									if(pageclientH > 0 && (pageclientH < $(".scroller")[0].scrollHeight)){
////										$('.bglayout').css({'height': $(".scroller")[0].scrollHeight+ 50 +'px'});
////										$(".scroller").css({"height" : $(".scroller")[0].scrollHeight+ 50 + "px"});
////									}
//									
//									$.createShowMorebutton(page,baseId,createRowStatus);
//									
//									if(pageclientH > 0 && (pageclientH < parseFloat($(".scroller").find('ul').css('height')))){
//										$('.bglayout').css({'height': parseFloat($(".scroller").find('ul').css('height'))+ 100 +'px'});
//										$(".scroller").css({"height" : parseFloat($(".scroller").find('ul').css('height')) + 100+ "px"});
//										
//										if($.mobileweb.device['type'] === 'Desktop'){
//											$('#iscroll_'+page['name']).css({'overflow-y':'scroll','overflow-x':'hidden'});
//											$('#iscroll_'+page['name']).animate({ scrollTop: 0 }, "fast");
////											var style_track = $('<style>::-webkit-scrollbar-track{-webkit-box-shadow: inset 0 0 5px grey;border-radius: 10px;background-color: #F5F5F5;}</style>');
////											$('html > head').append(style_track);
////											var style_bar = $('<style>::-webkit-scrollbar{width: 12px;background-color: #F5F5F5;}</style>');
////											$('html > head').append(style_bar);
////											var style_thumb =$('<style>::-webkit-scrollbar-thumb{border-radius: 10px;-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);background-color: #808080;}</style>');
////											$('html > head').append(style_thumb);//--
//										}else{
//											page['iscroll'] = {};
//											$("#iscroll_" + page['name'] + "> div:nth-child(2)").remove();
//											page['iscroll']  = new iScroll($('#iscroll_'+page['name']).get(0), {
//												bounceLock: false,
//												onScrollEnd: function() {
//													curScrollPos = $(this).get(0).y;
//													var offset = {page_name:page['name'],x:curScrollPos};
//													$.utility('setSessionData',offset,"offset");
//												},
//												onBeforeScrollStart: function (e) {
//													var target = e.target;
//													while (target.nodeType != 1) target = target.parentNode;
//														if (target.tagName != 'SELECT' && target.tagName != 'TEXTAREA')
//															e.preventDefault();
//												},
//											});
//										}
//									}else{
//										$('.bglayout').css({'height': pageclientH +'px'});
//										$(".scroller").css({"height" : pageclientH + "px"});
//									}
//									
//									var myPage = $.mobileweb.getPage(page['name']);
//									$.utility('setAppBootingForFirstTime', false);
//									//myPage.refreshDisplay(true);
//									myPage['header'].applyOverrides();
//									myPage['footer'].applyOverrides();
//									myPage['toolbartop'].applyOverrides(true);
//									myPage['toolbarbottom'].applyOverrides(true);
//									if($.mobileweb.getCurrentPage()['children'] != undefined){
//										if(page['children'][0]['group'][0]['row'].length != $.mobileweb.getCurrentPage()['children'][0]['group'][0]['row'].length)
//											$.mobileweb.setCurrentPage(myPage);		//Bug #9909, Dated :: 06-Oct-2017
//									}
//									$.unblockUI();
//									$.utility("setReverseTransition", false);//Bug #13254 fix
//								}
//							}
						}else{
							$.unblockUI();
							$('#empty_list').css({'visibility':'visible'});
							$(".ui-table-position").css({'visibility':'visible'});
							$.utility("showLoadingIndicator", false);
						}
					});
				}
			}
			
			//Modified for DBTableViewList local db optimization-->Richa
//			if((page['type'] == "RemoteTableViewList" && page['data']['contents']['totalRecords'] == 25)|| (page['type'] == "DBTableViewList" && page['data']['contents'].length ==25)){
//				var value = "";
//				if($.utility('detectBrowserLanguage') != 'ja'){
//					value = "Show More";
//				}else{
//					value = "続きを見る";
//				}
//				var showMoreButton = '<fieldset id="showmore" style="visibility:hidden"> <div data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-icon="null" data-iconpos="null" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c" aria-disabled="false"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">'+value+'</span></span><input id="showmorebtn" type="button" value="'+value+'" class="ui-btn-hidden" aria-disabled="false"></div> </fieldset>';
//				$("#"+page['children'][0]['id']).append(showMoreButton);
//				if(createRowStatus != undefined && createRowStatus)
//					$("#showmore").css({'visibility':'visible'});
//				
//				$(".scroller").css({"height" : scroller_height});
//			}
//
//			$("#showmorebtn").bind("tap", function(){
//				$("#showmorebtn").prop('disabled', true);
//				if(page['type'] == "RemoteTableViewList"){
//					$.utility('showLoadingIndicator', true);
//					var x = $(".scroller").offset();
//					var x_new = x.top;
//					var y_new = x.left;
//					  
//					page['data']['contents']['loaded'] = false;
//					var initialContentLength = page['data']['contents'].length;
//					new $.actions(page, null, [{method:"Select", category:"ComAction", callback : "loadMoreRecords",
//						params:{
//							servicename: page['data']['servicename'],
//							table: page['data']['tablename'],
//							where: page['data']['wherecond'],
//							order: page['data']['order'],
//							offset: (parseInt(page['data']['contents']['offset']) + 25),
//							limit : 25,
//							fields:""
//						}
//					}]).execute();
//					
//					var myVar=setInterval(function() {
//						if((page['data']['contents']['loaded'] != undefined) && (page['data']['contents']['loaded'])){
//							clearInterval(myVar);
//							$.createRemoteDBListViewPageRows(page, function(){
//								var contents = [];
//								if(page['data']['contents'][0].constructor == Object){
//									contents = page['data']['contents'];
//								}else{
//									contents = page['data']['contents'][0];
//								}
//								if(initialContentLength < contents.length){
//									var noOFNewRowsAdded = contents.length  - initialContentLength;
//									var allRowHeight = 0;
//									for(var k = 0; k < noOFNewRowsAdded; k++){
//										var rownum =initialContentLength + k;
//										$.createRow(page,baseId,page['children'][0]['group'][0]['row'][rownum],initialContentLength + k,function(row){
//											allRowHeight = allRowHeight + row.getCellHeight();
//											allRowHeight = allRowHeight + 2;
//											page['children'][0]['group'][0]['row'][rownum] = row;
//											page['children'][0]['group'][0]['row'].push(page['children'][0]['group'][0]['row'][rownum]);
//											$(".scroller").find('ul').append(page['children'][0]['group'][0]['row'][rownum].getHTML().join(''));
//											page['children'][0]['group'][0]['row'][rownum].applyOverrides();
//											page['children'][0]['group'][0]['row'][rownum].applyEvents();
//										});
//									}
//									$.utility('showLoadingIndicator', false);
//									$(".scroller").find('ul').unblock();
//									$('.ui-loader').css({'display': 'none'});
//									$(".bglayout").css({"height" : (parseFloat($(".bglayout").css("height").replace("px","")) + allRowHeight) + "px"});
//									$(".scroller").css({"height" : (parseFloat($(".scroller").css("height").replace("px","")) + allRowHeight) + "px"});
//								}
//								
//								//Bug #8782 Fix (04.06.2018)
////								$(".scroller").css({"height" : (parseFloat($("#"+page['children'][0]['id']).css("height").replace("px","")) + 180) + "px"});
////	 							var x = $(".scroller").offset();
////								var timer = setInterval(function() {
////									clearInterval(timer);
////									$(".scroller").offset({top:x_new,left:y_new})
////									var x = $(".scroller").offset();
////								},400);
//	 									
//	 							$("#iscroll_" + page['name']).css({'overflow-y':'auto'});
//	 							var style_track = $('<style>#iscroll_'+page['name']	+'::-webkit-scrollbar-track{-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);border-radius: 10px;background-color: #F5F5F5;}</style>');
//	 							$('html > head').append(style_track);
//	 							var style_bar = $('<style>#iscroll_'+page['name']	+'::-webkit-scrollbar{width: 7px;background-color: #F5F5F5;}</style>');
//	 							$('html > head').append(style_bar);
//	 							var style_thumb = $('<style>#iscroll_'+page['name']	+'::-webkit-scrollbar-thumb{border-radius: 10px;-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);background-color: #808080;}</style>');
//	 							$('html > head').append(style_thumb);//--
//	 							
////	 							page['iscroll'].maxScrollY = (page['iscroll'].wrapperH - page['iscroll'].scrollerH) /2;
////	 							page['iscroll'].refresh();
////	 							
//								page['iscroll'] = {};
//								$("#iscroll_" + page['name'] + "> div:nth-child(2)").remove();
//								page['iscroll'] = new iScroll($("#iscroll_" + page['name']).get(0), {
////									useTransform: false,
//									bounceLock: true,
////									click: true,
//									onBeforeScrollStart: function (e) {
//										var target = e.target;
//										while (target.nodeType != 1) target = target.parentNode;
//										if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
//											e.preventDefault();
//									}
//								});
//								
//								if($.utility('getSessionData',"offset")!=null)
//								{
//									var offset = $.utility('getSessionData',"offset");
//									offset = $.parseJSON(offset);		
//									if($.mobileweb.getCurrentPage().getName()==offset["page_name"])
//									{
//										page['iscroll'].scrollTo(0, offset["x"], 1);
//									}
//								}
////								setTimeout(function ()	 { page['iscroll'].refresh(); }, 0); 
//								$("#showmorebtn").prop('disabled', false);
//							});
//							if(page['data']['contents']['allRecordsLoaded']){
//								$("#showmore").remove();
//							}
//						}
//					},300);
//				}else if(page['type'] == "DBTableViewList"){
// 					$.utility('showLoadingIndicator', true);
// 					
// 					//Richa---Bug #8782 Fix					
//					var x = $(".scroller").offset();
//					var x_new = x.top;
//					var y_new = x.left;//--
// 					
//					page['data']['contents']['loaded'] = false;
// 					var initialContentLength = page['data']['contents'].length;
//					new $.actions(page, null, [{method:"Select", category:"DBAction", callback : "loadMoreRecords", params:{tablename:page['data']['tablename'], where:page['data']['wherecond'], order:page['data']['order'],columns:""}}]).execute();
//					var myVar=setInterval(function() {
//						clearInterval(myVar);
//						$.createRemoteDBListViewPageRows(page, function(){
//							var contents = [];
//							if(page['data']['contents'][0].constructor == Object){
//								contents = page['data']['contents'];
//							}else{
//								contents = page['data']['contents'][0];
//							}
//							var noOFNewRowsAdded = 25;
//							var allRowHeight = 0;
//							for(var k = 0; k < noOFNewRowsAdded; k++){
//								var rowLength = page['children'][0]['group'][0]['row'].length;
//								var rownum = $(".scroller").find('ul').children("li").length;
//								if(rownum >= contents.length){       		//Bug #12633 fix
//									$("#showmore").remove();
//									return;
//								}
//								$.createRow(page,baseId,page['children'][0]['group'][0]['row'][rownum],noOFNewRowsAdded + k,function(row){
//									allRowHeight = allRowHeight + row.getCellHeight();
//									allRowHeight = allRowHeight + 2;
//									page['children'][0]['group'][0]['row'][rownum] = row;
//									page['children'][0]['group'][0]['row'].push(page['children'][0]['group'][0]['row'][rownum]);
//									$(".scroller").find('ul').append(page['children'][0]['group'][0]['row'][rownum].getHTML().join(''));
//									page['children'][0]['group'][0]['row'][rownum].applyOverrides();
//									page['children'][0]['group'][0]['row'][rownum].applyEvents();
//								});
//							}
//							$.utility('showLoadingIndicator', false);
//							$(".scroller").find('ul').unblock();
//							$('.ui-loader').css({'display': 'none'});
//							$(".bglayout").css({"height" : (parseFloat($(".bglayout").css("height").replace("px","")) + allRowHeight) + "px"});
//							$(".scroller").css({"height" : (parseFloat($(".scroller").css("height").replace("px","")) + allRowHeight) + "px"});
//							//Richa---Bug #8782 Fix
//							var x = $(".scroller").offset();
//							var timer = setInterval(function() {
//								clearInterval(timer);
//								$(".scroller").offset({top:x_new,left:y_new})
//								var x = $(".scroller").offset();
//							},400);//--
//							
//							page['iscroll'] = {};
//							$("#iscroll_" + page['name'] + "> div:nth-child(2)").remove();
//							page['iscroll'] = new iScroll($('#iscroll_'+page['name']).get(0), {
////								useTransform: false,
//								bounceLock: true,
//								onBeforeScrollStart: function (e) {
//									var target = e.target;
//									while (target.nodeType != 1) target = target.parentNode;
//										if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
//											e.preventDefault();
//								}
//							});
//						});
//						$("#showmore").prop('disabled', false);
//					},300);
// 				}
//			});

		},
		
		reloadDBRecordViewPage : function(page, createRowStatus){
			// createRowStatus is used only in DbListViewPage Only.
			$.utility("showLoadingIndicator", true);
			$("#iscroll_" + page['name'] + "> div:nth-child(2)").remove();
			var baseId = $("#"+page['children'][0]['id']+" ul").attr('id');
			$("#"+baseId+" li").remove();
			$("#showmore").remove();
			if(page['type'] === "DBTableView"){
				if(createRowStatus == undefined || !createRowStatus){
					new $.actions(page, null, [{method:"Select",reloadStatus:true,reloadCallback:"reloadDBRecordViewPage", category:"DBAction", params:{tablename:page['data']['tablename'], where:$.utility("tokenizeString",page['data']['wherecond'], page), order:$.utility("tokenizeString",page['data']['order'], page), columns:""}, events:[]}]).execute();	
				}else{
					var innerPage = page;
					/*var myPage = $.mobileweb.getPage(innerPage['name']);
					$.mobileweb.setCurrentPage(myPage);*/
					$.createLocalTableViewRows(page, function(page){
						if(page['data']['contents'].length != 0){
							$.each(page['children'][0]['group'][0]['row'], function(i, value){
								page['children'][0]['group'][0]['row'][i]['data']['contents'][0]= page['data']['contents'][0];
								$.createRemoteListPageRow(page,baseId, page['children'][0]['group'][0]['row'][i], i, page['children'][0]['group'][0]['flexibleHeight'], function(newRow){
									$(".scroller").find('ul').append(newRow.getHTML());
									newRow.applyOverrides();
									newRow.applyEvents();
									$.utility("showLoadingIndicator", false);
								});
								if(i === page['data']['contents'].length - 1){
									var myPage = $.mobileweb.getPage(page['name']);
									$.utility('setAppBootingForFirstTime', false);
									//myPage.refreshDisplay(true);
									myPage['header'].applyOverrides();
									myPage['footer'].applyOverrides();
									myPage['toolbartop'].applyOverrides(true);
									myPage['toolbarbottom'].applyOverrides(true);
								}
							});
							
						}else{
							$.utility("showLoadingIndicator", false);
						}
					});
				}
			}else if(page['type'] === "RemoteTableView"){
				if(createRowStatus == undefined || !createRowStatus){
					new $.actions(page, null, [{method:"Select", category:"ComAction",reloadStatus:true,reloadCallback:"reloadDBRecordViewPage",callingMethod : "reload",
						params:{
							servicename: page['data']['servicename'],
							table:page['data']['tablename'],
							where: $.utility("tokenizeString",page['data']['wherecond'], page),
							order: $.utility("tokenizeString",page['data']['ordercond'], page),
							limit : 25,
							offset: 0,
							fields:""
						}
					}]).execute();
				}else{
					var innerPage = page;
				/*	var myPage = $.mobileweb.getPage(innerPage['name']);
					$.mobileweb.setCurrentPage(myPage);*/
					$.createRemoteTableViewRows(page, function(page){
						if(page['data']['contents'].length != 0){
							$.each(page['children'][0]['group'][0]['row'], function(i, value){
								page['children'][0]['group'][0]['row'][i]['data']['contents'][0]= page['data']['contents'][0];
								$.createRemoteListPageRow(page,baseId, page['children'][0]['group'][0]['row'][i], i, page['children'][0]['group'][0]['flexibleHeight'], function(newRow){
									$(".scroller").find('ul').append(newRow.getHTML());
									newRow.applyOverrides();
									newRow.applyEvents();
									$.utility("showLoadingIndicator", false);
								});
								if(i === page['data']['contents'].length - 1){
									var myPage = $.mobileweb.getPage(page['name']);
									$.utility('setAppBootingForFirstTime', false);
									//myPage.refreshDisplay(true);
									myPage['header'].applyOverrides();
									myPage['footer'].applyOverrides();
									myPage['toolbartop'].applyOverrides(true);
									myPage['toolbarbottom'].applyOverrides(true);
								}
							});
						}else{
							$.utility("showLoadingIndicator", false);
						}
					});
				}

			}
			
			if(page['type'] == "RemoteTableViewList" && page['data']['contents']['totalRecords'] == 25){
				var value = "";
				if($.utility('detectBrowserLanguage') != 'ja'){
					value = "Show More" ;
				}else{
					value = "続きを見る";
				}
				var showMoreButton = '<fieldset id="showmore"> <div data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-icon="null" data-iconpos="null" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c" aria-disabled="false"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">'+value+'</span></span><input id="showmore" type="button" value="'+value+'" class="ui-btn-hidden" aria-disabled="false"></div> </fieldset>';
				$("#"+page['children'][0]['id']).append(showMoreButton);
			}
			page['iscroll'] = {};
			page['iscroll'] = new iScroll($('#iscroll_'+page['name']).get(0), {
//				useTransform: false,
				bounceLock: true,
				onBeforeScrollStart: function (e) {
					var target = e.target;
					while (target.nodeType != 1) target = target.parentNode;
					if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
						e.preventDefault();
				}
			});


			$("#showmore").bind("click", function(){
				$.utility('showLoadingIndicator', true);
				page['data']['contents']['loaded'] = false;
				var initialContentLength = page['data']['contents'].length;
				new $.actions(page, null, [{method:"Select", category:"ComAction", callback : "loadMoreRecords",
					params:{
						servicename: page['data']['servicename'],
						table: page['data']['tablename'],
						where: page['data']['wherecond'],
						order: page['data']['order'],
						offset: (parseInt(page['data']['contents']['offset']) + 25),
						limit : 25,
						fields:""
					}
				}]).execute();
				var myVar=setInterval(function() {
					if((page['data']['contents']['loaded'] != undefined) && (page['data']['contents']['loaded'])){
						clearInterval(myVar);
						$.createRemoteDBListViewPageRows(page, function(){
							var contents = [];
							if(page['data']['contents'][0].constructor == Object){
								contents = page['data']['contents'];
							}else{
								contents = page['data']['contents'][0];
							}
							if(initialContentLength < contents.length){
								var noOFNewRowsAdded = contents.length  - initialContentLength;
								var allRowHeight = 0;
								for(var k = 0; k < noOFNewRowsAdded; k++){
									var rownum =initialContentLength + k;
									$.createRow(page,baseId,page['children'][0]['group'][0]['row'][rownum],initialContentLength + k,function(row){
										allRowHeight = allRowHeight + row.getCellHeight();
										allRowHeight = allRowHeight + 2;
										page['children'][0]['group'][0]['row'][rownum] = row;
										page['children'][0]['group'][0]['row'].push(page['children'][0]['group'][0]['row'][rownum]);
										$(".scroller").find('ul').append(page['children'][0]['group'][0]['row'][rownum].getHTML().join(''));
										page['children'][0]['group'][0]['row'][rownum].applyOverrides();
										page['children'][0]['group'][0]['row'][rownum].applyEvents();
									});
								}
								$.utility('showLoadingIndicator', false);
								$(".scroller").find('ul').unblock();
								$('.ui-loader').css({'display': 'none'});
								$(".bglayout").css({"height" : (parseFloat($(".bglayout").css("height").replace("px","")) + allRowHeight) + "px"});
								$(".scroller").css({"height" : (parseFloat($(".scroller").css("height").replace("px","")) + allRowHeight) + "px"});

							}
							page['iscroll'] = {};
							$("#iscroll_" + page['name'] + "> div:nth-child(2)").remove();
							page['iscroll'] = new iScroll($('#iscroll_'+page['name']).get(0), {
//								useTransform: false,
								bounceLock: true,
								onBeforeScrollStart: function (e) {
									var target = e.target;
									while (target.nodeType != 1) target = target.parentNode;
									if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
										e.preventDefault();
								}
							});
						});
						if(page['data']['contents']['allRecordsLoaded']){
							$("#showmore").remove();
						}
					}
				},300);
			});

		},

		parseCondition : function(pagedef, ui, actions, eventinitpagedef, groupcase){
			var groupResult = false;
		//	try{
				$.each(groupcase, function(majorgroupcasesId,majorgroupcases){
					if(!groupResult){
						var caseResult = true;
						$.each(majorgroupcases, function(caseId,caseObj){
							//// console.log(caseObj);
							if(caseResult){
								if(caseId.indexOf('groupcases') != -1){
									caseResult = $.utility('parseCondition',pagedef, ui, actions, eventinitpagedef, caseObj);
								}else{
									var condition ;
									var conditionValue;
									var _page = ($.mobileweb.getCurrentPage().getName()===pagedef['name']) ? $.mobileweb.getCurrentPage() : $.mobileweb.getPage($.mobileweb.getCurrentPage().getName());
									var targetUIForCondition = ""; // $.utility('CheckAndGetUIElementValue',$("[name='"+caseObj['target']+ "']"),caseObj['target'], pagedef);//_page.getChild(caseObj['target'], ui);
									
									if(ui != null && (pagedef['type'] === "RemoteTableViewList" || pagedef['type'] === "DBTableViewList")){
										if(ui['rownum'] == undefined){
											var uiId = ui.getId();
											if(ui.getId != undefined){
												var tempStr = uiId.substr(0, uiId.lastIndexOf('-'));
												rowNum = tempStr.substr(tempStr.lastIndexOf('-')+1, tempStr.length);
												if(!isNaN(parseInt(rowNum)))
													 ui['rownum'] = rowNum;
											}                     
										}
										if(pagedef['data']['contents'][ui['rownum']] != undefined && pagedef['data']['contents'][ui['rownum']][caseObj['target']] != undefined){
											targetUIForCondition = pagedef['data']['contents'][ui['rownum']][caseObj['target']];  
										  }else{
											  if(ui['rownum'] != undefined){
												  targetUIForCondition = $.utility("CheckAndGetUIElementValue",$("[name='" +caseObj['target'] + "-"+ui['rownum']+"']"), caseObj['target']+ "-"+ui['rownum'], pagedef);												  
												  if(targetUIForCondition == "")
													  targetUIForCondition = $.utility("CheckAndGetUIElementValue",$("[name='" +caseObj['target'] +"']"), caseObj['target'], pagedef);
											  }
											  else{
												  targetUIForCondition = $.utility("CheckAndGetUIElementValue",$("[name='" +caseObj['target'] +"']"), caseObj['target'], pagedef);
											  }
										  }
									}else{
										targetUIForCondition =  $.utility('CheckAndGetUIElementValue',$("[name='"+caseObj['target']+ "']"),caseObj['target'], pagedef);//_page.getChild(caseObj['target'], ui);
									}
									if($("[name='" +caseObj['target'] +"']").is('input:image')){	
									    if(targetUIForCondition == "true" && caseObj['value'] == "1")
									        targetUIForCondition = caseObj['value'];
									}
									var operators = {
											' > ': function(a, b) { return a > b; },
											' < ': function(a, b) { return a < b; },
											' == ': function(a, b){ return a == b;},
											' != ': function(a, b) { return a != b; },
											' <= ': function(a, b) { return a <= b; },
											' >= ': function(a, b) { return a >= b; },
									};
									if(caseObj['targetPage'] == undefined){
										conditionValue = $.utility("tokenizeString", caseObj['value'], pagedef).trim();
										//if(!$.isEmptyObject(targetUIForCondition)){
											condition = targetUIForCondition+caseObj['operator']+conditionValue;
											if(caseObj['operator'] == ''){
												caseResult = false;
											}else if(caseObj['operator'] == ' == '){
												if(!isNaN(parseFloat(targetUIForCondition)) && !isNaN(parseFloat(conditionValue))){
													if(!operators[caseObj['operator']](parseFloat(targetUIForCondition), parseFloat(conditionValue))){
														caseResult = false;
													}else{
														caseResult = true;
													}
												}
												else{
													if(!operators[caseObj['operator']](String(targetUIForCondition).trim(), String(conditionValue))){
														caseResult = false;
													}else{
														caseResult = true;
													}
												}
											}else if(caseObj['operator'] == ' != '){
												if(!operators[caseObj['operator']](String(targetUIForCondition).trim(), String(conditionValue))){
													caseResult = false;
												}else{
													caseResult = true;
												}
											}else if(!operators[caseObj['operator']](parseFloat(targetUIForCondition), parseFloat(conditionValue))){
												caseResult = false;
											}else{
												caseResult = true;
											}
										/*}else {
											caseResult = false;
										}*/
									}else{ 
										if(caseObj['operator'] != ''){
											targetUIForCondition = caseObj['targetValue'];
											targetUI = getUI(caseObj['targetOBJ'], ui);
											targetUIForCondition = caseObj['targetOBJ'].getValue();
											condition = targetUIForCondition+caseObj['operator']+conditionValue;
											if(!operators[caseObj['operator']](parseInt(targetUIForCondition), parseInt(conditionValue))){
												caseResult = false;
											}else if(!operators[caseObj['operator']](parseFloat(targetUIForCondition).toFixed(5), parseFloat(conditionValue).toFixed(5))){//for Bug #10663 
 												caseResult = false;
 											}else{
												caseResult = true;
											}
										}else{
											caseResult = false;
										}
										
									}
								}
							}
						});
						groupResult = caseResult;
					}
				});
				return groupResult;
			/*}catch(e){
				// console.log(e.getstack());
				return groupResult = false;
			}*/

		},
		
		convertSpecialCharacter : function(str){
			//commented for bugID: 8450
			/*if(str != undefined){
				//c = {'<':'&lt;', '>':'&gt;', '&':'&amp;', '"':'&quot;', "'":'&#039;','#':'&#035;'};
				c = {'"':'&quot;', "'":'&#039;','#':'&#035;'};
				return str.toString().replace( /['"#]/g, function(s) {
					return c[s];
				});
			}else{
				return str;
			}*/
			return str;
		},
		
		resetMapGlobalVariable : function(){
			$.mobileweb["__LAT__"] = "__LAT__";
			$.mobileweb["__LONG__"] = "__LONG__";
			$.mobileweb["__ALT__"] = "__ALT__";
			$.mobileweb["__ADDRESS__"] = "__ADDRESS__";
			$.mobileweb["__MAPZOOM__"] = "__MAPZOOM__";
			$.mobileweb["__GPSDATE__"] = "__GPSDATE__";
			$.mobileweb["__CENTERLAT__"] = "__CENTERLAT__";
			$.mobileweb["__CENTERLONG__"] = "__CENTERLONG__";
		},
		
		detectBrowserLanguage : function(){
			return window.navigator.userLanguage || window.navigator.language;
		},
		
		triggerInjectedAction : function(actionName, param,pagedef, ui) {
			switch (actionName) {
			case "goto":
				$.each($.mobileweb['pages'], function(key, page){
					if(page['pageTitle'] === param){
						new $.actions(pagedef, ui, [{method:"View",category:"PageAction",params:{name:page['name'],transferdata:true},condition:{},events:{Error:[],Success:[],}}]).execute();
					}
				});

				break;
			}
		},
		
		getComboBoxDataLoadingStatus : function(){
			return comboBoxDataLoadingStatus;
		},
		setComboBoxDataLoadingStatus : function(id, loadingStatus){
			comboBoxDataLoadingStatus[id] = {};	
			comboBoxDataLoadingStatus[id] = {'data':[], 'loadingStatus':false};
		},
		
		getChildAsJson : function(pageObj, attributeComparor, childToSearch, ui){
			var jsonChild = null;
			
			switch(pageObj['type']){
				case 'BaseView':
				case 'ScrollView' :
					$.each(pageObj['children'], function(i, child){
						if(child['name']== childToSearch){
							jsonChild = child;
							return false;;
						}
					});
					break;
				case 'RemoteTableViewList' :
				case 'DBTableViewList' :
					if(ui['rownum'] != undefined){
						$.each(pageObj['data']['contents'][ui['rownum']], function(key, value){
							if(key== childToSearch){
								jsonChild = child;
								return false;;
							}
						});
					}else{
						var rownum = ui.getName().substring(ui.getName().lastIndexOf("-") + 1,ui.getName().length);
						if(!isNaN(rownum)){
							$.each(pageObj['data']['contents'][rownum], function(key, value){
								if(key== childToSearch){
									jsonChild = child;
									return false;;
								}
							});
						}
					}
					break;
			}

			if(pageObj['toolbartop'] != undefined){
				$.each(pageObj['toolbartop']['children'], function(i, child){
					if(child[attributeComparor]== childToSearch){
						jsonChild = child;
						return false;
					}
				});
			}
			if(pageObj['toolbarbottom'] != undefined){
				$.each(pageObj['toolbarbottom']['children'], function(i, child){
					if(child[attributeComparor]== childToSearch){
						jsonChild = child;
						return false;
					}
				});
			}
			if(pageObj['toolbarleft'] != undefined){
				$.each(pageObj['toolbarleft']['children'], function(i, child) {
					if(child[attributeComparor]== childToSearch){
						jsonChild = child;
						return false;
					}
				});
			}
			
			return jsonChild; // if child not found
		}, 

		initSpeechAnalyser : function(recorderUIID){
			
			function updateSpeechAnalyser(){
				analyserNode.fftSize = 64;
				var freqByteData = new Uint8Array(analyserNode.frequencyBinCount);
				analyserNode.getByteFrequencyData(freqByteData); 

				if(soundRecordAnalyser){
					if(freqByteData[2] <= 210){
						silentCounter = silentCounter+1;
						if(silentCounter === 200){			
							silentCounter = 0;
							soundRecordAnalyser = false;
							//analyserAudioContext.close();
							$.utility("stopSoundRecording");
						}
					}else{
						silentCounter = 0;
					}
				}
			//	if(!soundRecordAnalyser) return;
				rafID = window.requestAnimationFrame( updateSpeechAnalyser );
			}
			window.AudioContext = window.AudioContext || window.webkitAudioContext;
			analyserAudioContext = new AudioContext();
			navigator.getUserMedia = (
					navigator.getUserMedia ||
					navigator.webkitGetUserMedia ||
					navigator.mozGetUserMedia ||
					navigator.msGetUserMedia
			);

			if (!navigator.cancelAnimationFrame)
				navigator.cancelAnimationFrame = navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame;
			if (!navigator.requestAnimationFrame)
				navigator.requestAnimationFrame = navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame;
			navigator.getUserMedia({audio: true}, function(localMediaStream){
				var inputPoint = analyserAudioContext.createGain();

				// Create an AudioNode from the stream.
				var realAudioInput = analyserAudioContext.createMediaStreamSource(localMediaStream);
				var audioInput = realAudioInput;
				audioInput.connect(inputPoint);

				analyserNode = analyserAudioContext.createAnalyser();
				analyserNode.fftSize = 2048;
				inputPoint.connect( analyserNode );

				zeroGain = analyserAudioContext.createGain();
				zeroGain.gain.value = 0.0;
				inputPoint.connect( zeroGain );
				zeroGain.connect( analyserAudioContext.destination );
				updateSpeechAnalyser();
			//	$.utility("startSoundRecording", recorderUIID);
			}, function(err){
				console.log(err);
				console.log('Browser not supported');
			});
			
			
			

		},
		
		startSoundRecording : function(recorderUIID){
			if(recordingAudioContext == null){
				recordingAudioContext = new AudioContext();
			}			
			if(recordingAudioContext.state === 'suspended'){
    				recordingAudioContext.resume().then(function() {
					navigator.getUserMedia({audio: true}, function(localMediaStream){
                                        	var mediaStreamSource = recordingAudioContext.createMediaStreamSource(localMediaStream);
                                        	recorderWorkerContext = new Recorder(mediaStreamSource, {
                                                	workerPath: 'js/RecordWorker.js'
                                                	}, localMediaStream, recordingAudioContext);

                                        	soundRecordAnalyser = true;
                                        	recorderWorkerContext.record();
                                        	recordingUIID = recorderUIID;
                                	}, function(err){
                                        	console.log(err);
                                        	console.log('Browser not supported');
                                	});
				});
			}else{
				navigator.getUserMedia({audio: true}, function(localMediaStream){
	                        	var mediaStreamSource = recordingAudioContext.createMediaStreamSource(localMediaStream);
        	                        recorderWorkerContext = new Recorder(mediaStreamSource, {
                	                	workerPath: 'js/RecordWorker.js'
	                        	        }, localMediaStream, recordingAudioContext);
        	                        	
					soundRecordAnalyser = true;
	        	                recorderWorkerContext.record();
        	        	        recordingUIID = recorderUIID;
                		}, function(err){
                                	console.log(err);
                                	console.log('Browser not supported');
                        	});
			}

		},
		
		stopSoundRecording : function(){
			utilmethods.showLoadingIndicator(true);
									
			//recordingAudioContext.close()
			//recorderWorkerContext.stop();
			//window.cancelAnimationFrame( rafID );
			//rafID = undefined;

			if(recordingAudioContext.state === 'running') {
				recordingAudioContext.suspend().then(function() {
					recorderWorkerContext.exportWAV(function(e){
					recorderWorkerContext.clear();
					var reader = new FileReader();
					reader.addEventListener("loadend", function() {
						var testjson = {"audio" : reader.result.toString().replace("data:audio/wav;base64,","")};
							$.ajax({
								url:$.mobileweb['baseurl']+"/mobileweb/mobile/audio?projectid="+$.mobileweb['pid']+"&userid="+$.mobileweb['user']+"&seq=1&token=a2b4d4906c3ac6e7dafa1c459e64a310",
								type: "POST",
								data: testjson,
								success: function (resp) {
									utilmethods.showLoadingIndicator(false);
									
									$("#"+recordingUIID).val(resp);
									$("#"+recordingUIID).blur();
									$("#"+recordingUIID).trigger("VoiceRecognitionEnd");
								},										
								error : function(err){
									console.log(err);
								}
							});
						});
						reader.readAsDataURL(e);
					});
				});
			}

		},
		
	};
	
	

	// TODO: implement all the localization for other objects
	var applyLocalization = function(locale, child) {
		switch (child['viewtype']) {
		case "Label":
			if (locale[child['name']])
				child['value'] = locale[child['name']];
			break;
		case 'RoundButton':
			if (locale[child['name']])
				child['value'] = locale[child['name']];
			break;
		default:
			// console.log("localization not available for:
			// "+child['viewtype']);
			break;
		}
	};

	var getPrimaryKey = function(tablename, schema) {
		var pk = [];
		if (tablename !== '') {
			var table = utilmethods.getObject(schema, 'tablename', tablename);
			if(table != undefined){
				$.each(table['fields'], function(i, field) {
					if (field['pk'])
						pk.push(field['name']);
				});	
			}else{/*
				$.mobileweb['localdb']['instance'].transaction(function(tx) {
					// replaced "', action['params']['columns'], '" with "*" to resolve some issue..
					//$.utility('log',['SELECT * FROM ', action['params']['tablename'], (action['params']['where']!=='')? [' WHERE ',$.utility('formWhereCondition',action['params']['where'], pagedef)].join(''):'', (action['params']['order']!==undefined &&  action['params']['order']!=='')? [' ORDER BY ', action['params']['order']].join(''):''].join(''));
					tx.executeSql(['SELECT * FROM sqlite_master WHERE type="view" AND tbl_name = "'+tablename+'"'].join(''), [],

							function(tx, result){
						
					},
					function(tx, error){
						
					});

				});
			*/}
			
		}
		return pk;
		//SELECT name, sql FROM sqlite_master WHERE type="table" AND name = "'+name+'";
	};
	
	
	var extractTable = function(columns, template, data) {
		var str = template.split('[');
			for ( var j in str) {
			if (str[j].indexOf(']') !== -1) {
				var col = str[j].substring(0, str[j].indexOf(']'));
				if (data) {
					var found = false;
					for ( var key in data) {
						if (key === col)
							found = true;
					}
					if (!found)
						columns.push(col);
				} 
				else
				columns.push(col);
			}
		}
		return columns;
	};
	
	$.createRow = function(pagedef, id, grprow, index, callback){
	
		//ui-4-group-0-row-9
		//ui-group-0-main-9_p
		var row = {id: id + '-row-' + index,
				   rownum: index,
				   children: new $.uichildren(pagedef, grprow['children'], grprow['data']['contents'][0]),
		 		   backgroundColor : grprow['backgroundColor'],
		 		   repeatImage : grprow['repeatImage'],
		 		   data : grprow['data'],
		};
		
		if(row['rownum']%2 === 0){
			row['cellBackgroundColor'] = grprow['evenRowBackgroundColor'];
			row['cellBackgroundImage'] = grprow['evenRowBackgroundImage'];
		}else{
			row['cellBackgroundColor'] = grprow['oddRowBackgroundColor'];
			row['cellBackgroundImage'] = grprow['oddRowBackgroundImage'];
		}
		

		row.getHTML = function(){
			//<li data-icon="arrow-`r" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-iconpos="right" data-theme="c" class="ui-btn ui-btn-up-c ui-btn-icon-right ui-li-has-arrow ui-li ui-li-last"><div class="ui-btn-inner ui-li"><div class="ui-btn-text">
			var test = ["<li data-icon='", grprow['icon']['style'], "' data-corners='false' data-shadow='false' data-iconshadow='true' data-wrapperels='div' data-iconpos='right' data-theme='c' class='ui-btn ui-btn-up-c  ui-li-has-arrow ui-btn-icon-right  ui-li ui-li-last'><div class='ui-btn-inner ui-li'><div class='ui-btn-text'>", 
						"<a href='#' id='", row['id'], "' class='ui-table-padding  ui-link-inherit'>",
							"<div class='ui-table-row-size' style='height: 78px;'>",
								row['children'].getHTML(),
							"</div>",
						"</a>","<div id='", row['id'], "-icon'>","</div>","</div>" ,
						(grprow['icon']['style'] == "false") ?  "" : ["<span class='ui-icon ui-icon-arrow-r ui-icon-shadow' style='z-index: 99;'>&nbsp;</span></div>"].join(""),
						, //change this to DIV for the flat style
						/*"<div id='", row['id'], "-icon'>","</div>",*/
					"</li>"];
			//<li data-icon="false" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-iconpos="right" data-theme="c" class="ui-btn ui-btn-icon-right ui-li ui-li-last ui-btn-up-c" style="border-top-width: 0px; border-bottom-width: 0px;"><div class="ui-btn-inner ui-li" style="border-top-width: 0px; border-bottom-width: 0px; background-color: rgb(253, 249, 238);"><div class="ui-btn-text"><a href="#" id="ui-439-group-0-row-24" class="ui-table-padding ui-link-inherit" style="background-color: rgb(253, 249, 238);"><div class="ui-table-row-size" style="height: 43.68px;"><p id="ui-group-0-24-0_p" tabindex="-1" class="ui-li-desc" style="font-weight: bold; border: 0px solid rgb(0, 0, 0); margin: auto; text-align: left; position: absolute; height: 42.12px; width: 240.24px; top: 0px; left: 84.24px; line-height: 42.12px; background-color: rgba(255, 255, 255, 0);"> <label class="ui-label" id="ui-group-0-24-0" name="Label_1" style="left: 84.24px; top: 0px; width: 240.24px; height: 42.12px; text-shadow: rgb(255, 255, 255) 0px 0px 0px; font-family: source_sans_proregular, Arial, 'Sans Serif'; font-size: 21.84px; text-align: left; color: rgb(0, 0, 0); padding: 7.8px;">ハギ</label></p><p id="ui-group-0-24-1_p" tabindex="-1" class="ui-li-desc" style="font-weight: bold; border: 0px solid rgb(0, 0, 0); margin: auto; text-align: right; position: absolute; height: 43.68px; width: 135.72px; top: 0px; left: 338.52px; line-height: 43.68px; background-color: rgba(255, 255, 255, 0);"> <label class="ui-label" id="ui-group-0-24-1" name="Label_2" style="left: 338.52px; top: 0px; width: 135.72px; height: 43.68px; text-shadow: rgb(255, 255, 255) 0px 0px 0px; font-family: source_sans_proregular, Arial, 'Sans Serif'; font-size: 21.84px; text-align: right; color: rgb(0, 0, 0); padding: 7.8px;">6</label></p><p id="ui-group-0-24-2_p" tabindex="-1" class="ui-li-desc" style="font-weight: bold; border: 0px solid rgb(0, 0, 0); margin: auto; text-align: right; position: absolute; height: 39px; width: 81.12px; top: 1.56px; left: 0px; line-height: 39px; background-color: rgba(255, 255, 255, 0);"> <label class="ui-label" id="ui-group-0-24-2" name="Label_0" style="left: 0px; top: 1.56px; width: 81.12px; height: 39px; text-shadow: rgb(255, 255, 255) 0px 0px 0px; font-family: source_sans_proregular, Arial, 'Sans Serif'; font-size: 17.16px; text-align: right; color: rgb(0, 0, 0); padding: 7.8px;">25</label></p></div></a></div></div></li>
			return test;
		};
		
		
		
		row.getViewType = function(){
			return 'Row';
		};
		
		row.applyOverrides = function(){
			row.setCellHeight(grprow['rowsize']);
			row['children'].applyOverrides();
			row['children'].applyEvents();
			
			if(row['backgroundColor'] != undefined){
				$('#'+row['id']).css({'background-color':$.attributes('color', row['backgroundColor']).getColorCode()});
				$(".ui-li>.ui-btn-inner").css({'background-color':$.attributes('color', row['backgroundColor']).getColorCode()});
			}

			if(row['cellBackgroundColor'] != undefined){
				$('#'+row['id']).css({'background-color':$.attributes('color', row['cellBackgroundColor']).getColorCode()});
			}
			if(row['cellBackgroundImage'] != undefined && row['cellBackgroundImage']!=''){
				if(row['repeatImage']){
					$('#'+row['id']).css({'z-index':99,'background-image':'url('+$.utility('getImage',row['cellBackgroundImage'])+')','background-color':'white','background-position':'100% 100%','background-repeat': 'repeat'});
				}else{
					$('#'+row['id']).css({'z-index':99,'background-image':'url('+$.utility('getImage',row['cellBackgroundImage'])+')','background-color':'white','background-position':'100% 100%', 'background-size': 'cover'});
				}
			}
			
			if(grprow['icon']['style']=='button'){
				$('#'+row['id']).parent().siblings().css({'z-index':99,'background-image':'url('+$.utility('getSystemImage','button.png',row.getViewType())+')','background-color':'white','background-position':' 50% 50%','background-repeat': 'no-repeat no-repeat'});
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
					left: (pagedef['width'] * $.mobileweb.device['aspectratio']) - 40,
					height: grprow['rowsize'] * $.mobileweb.device['aspectratio'],
					width:40
				});
			}
			// Below Code is for removing the border space from rows..
			$('.ui-li').css({'border-top-width':'0px','border-bottom-width':'0px'});
			
		};
		
		row.setCellHeight = function(param){
			grprow['rowsize'] = param;
			$('#'+row['id']+' .ui-table-row-size').css({'height':param * $.mobileweb.device['aspectratio']});
		};
		
		row.getCellHeight = function(){
			return grprow['rowsize'] * $.mobileweb.device['aspectratio'];
		};
		
		row.applyEvents = function(){
			if(grprow['icon']['events'])
				if(grprow['icon']['events']['Tap']){
					jQuery($('#'+id+' .ui-icon').get(index)).click(function(){$('#'+row['id']+'-icon').click();});
					$('#'+row['id']+'-icon').click(function(){$.each(grprow['icon']['events']['Tap'],function(i,action){if(action['category']==='PageAction') $('#'+row['id']).addClass('ui-btn-active');}); new $.actions(pagedef, row, grprow['icon']['events']['Tap'].slice()).execute(); });
				}
			
			if(grprow['events']['Tap'].length == 0){
				$('#'+row['id']).mouseup(function () {
					var rowfocustimer = setInterval(function() {
						clearInterval(rowfocustimer);
						$('#'+row['id']).blur();
					},200);
				});
			}
			
			if(grprow['events'])
				if(grprow['events']['Tap'])
					$('#'+row['id']).bind("tap",function(){// Bug #10546 fix
						if(pagedef['data'] != undefined)
							pagedef['data']['contents']['currentRow'] = row['rownum'];
						if(event.target.tagName !== "INPUT"){
							if(event.target.tagName === "LABEL"){
									if(event.target.htmlFor.length>0){
									}
									else {
										$.each(grprow['events']['Tap'],function(i,action){
											if(action['category']==='PageAction') 
												$('#'+row['id']).addClass('ui-btn-active');
										}); 
										new $.actions(pagedef, row, grprow['events']['Tap'].slice()).execute();
										}
							}
						
							else {
							$.each(grprow['events']['Tap'],function(i,action){
								if(action['category']==='PageAction') 
									$('#'+row['id']).addClass('ui-btn-active');
							}); 
							new $.actions(pagedef, row, grprow['events']['Tap'].slice()).execute();
								}
						}
					});
			
		};
		callback(row);
		return row;
	};
	
	$.reloadRemoteListViewPage = function(page){
		$.utility("showLoadingIndicator", true);
		var baseId = $("#"+page['children'][0]['id']+" ul").attr('id');
		$("#"+baseId+" li").remove();
		if(page['data']['contents'].length != 0){
			for(var i =0; i < page['data']['contents'].length;i++){
				page['children'][0]['group'][0]['row'][i]['data']['contents'][0]= page['data']['contents'][i];
				$.createRemoteListPageRow(page,baseId, page['children'][0]['group'][0]['row'][i], i, page['children'][0]['group'][0]['flexibleHeight'], function(newRow){
					$("#"+baseId).append(newRow.getHTML());
					newRow.applyOverrides();
					newRow.applyEvents();
					$.utility("showLoadingIndicator", false);
				});
			}
		}else{
			$.utility("showLoadingIndicator", false);
		}
		
	};
	
	$.createShowMorebutton = function(page, baseId, createRowStatus){
		if((page['type'] == "RemoteTableViewList" && page['data']['contents']['totalRecords'] == 25)|| (page['type'] == "DBTableViewList" && page['data']['contents'].length ==25)){
			var value = "";
			if($.utility('detectBrowserLanguage') != 'ja'){
				value = "Show More";
			}else{
				value = "続きを見る";
			}
			var showMoreButton = '<fieldset id="showmore" style="visibility:hidden;max-width:400px;margin:auto"> <div data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-icon="null" data-iconpos="null" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c" aria-disabled="false"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">'+value+'</span></span><input id="showmorebtn" type="button" value="'+value+'" class="ui-btn-hidden" aria-disabled="false"></div> </fieldset>';
			$("#"+page['children'][0]['id']).append(showMoreButton);
			if(createRowStatus != undefined && createRowStatus)
				$("#showmore").css({'visibility':'visible'});
			
			//$(".scroller").css({"height" : scroller_height});
		}

		$(".scroller #showmore").click(function(){
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
			      message: '<div class="spinner"></div>',
			      baseZ: 1500,
			      overlayCSS: {
			        backgroundColor: '#D3D3D3',
			        opacity: 0.5,
			        cursor: 'wait'
			      }
			    });
			$('.blockUI.blockMsg').center();
			
			$("#showmorebtn").prop('disabled', true);
			if(page['type'] == "RemoteTableViewList"){
				$.utility('showLoadingIndicator', true);
				var x = $(".scroller").offset();
				var x_new = x.top;
				var y_new = x.left;
				  
				page['data']['contents']['loaded'] = false;
				var initialContentLength = page['data']['contents'].length;
				new $.actions(page, null, [{method:"Select", category:"ComAction", callback : "loadMoreRecords",
					params:{
						servicename: page['data']['servicename'],
						table: page['data']['tablename'],
						where: page['data']['wherecond'],
						order: page['data']['order'],
						offset: (parseInt(page['data']['contents']['offset']) + 25),
						limit : 25,
						fields:""
					}
				}]).execute();
				
				var myVar=setInterval(function() {
					if((page['data']['contents']['loaded'] != undefined) && (page['data']['contents']['loaded'])){
						clearInterval(myVar);
						$.createRemoteDBListViewPageRows(page, function(){
							var contents = [];
							if(page['data']['contents'][0].constructor == Object){
								contents = page['data']['contents'];
							}else{
								contents = page['data']['contents'][0];
							}
							if(initialContentLength < contents.length){
								var noOFNewRowsAdded = contents.length  - initialContentLength;
								var allRowHeight = 0;
								for(var k = 0; k < noOFNewRowsAdded; k++){
									var rownum =initialContentLength + k;
									$.createRow(page,baseId,page['children'][0]['group'][0]['row'][rownum],initialContentLength + k,function(row){
										allRowHeight = allRowHeight + row.getCellHeight();
										allRowHeight = allRowHeight + 2;
										page['children'][0]['group'][0]['row'][rownum] = row;
										//page['children'][0]['group'][0]['row'].push(page['children'][0]['group'][0]['row'][rownum]);
//										$(".scroller").find('ul').append(page['children'][0]['group'][0]['row'][rownum].getHTML().join(''));
//										page['children'][0]['group'][0]['row'][rownum].applyOverrides();
//										page['children'][0]['group'][0]['row'][rownum].applyEvents();
										
										$(".scroller").find('ul').append(row.getHTML().join(''));
										row.applyOverrides();
										row.applyEvents();
									});
								}
								$.utility('showLoadingIndicator', false);
								$(".scroller").find('ul').unblock();
								$('.ui-loader').css({'display': 'none'});
								$(".bglayout").css({"height" : (parseFloat($(".bglayout").css("height").replace("px","")) + allRowHeight) + "px"});
								$(".scroller").css({"height" : (parseFloat($(".scroller").css("height").replace("px","")) + allRowHeight) + "px"});
							}
							
							if($.mobileweb.device['type'] === 'Desktop'){
								$('#iscroll_'+page['name']).css({'overflow-y':'scroll','overflow-x':'hidden'});
								var style_track = $('<style>$("#iscroll_" '+page['name']+')::-webkit-scrollbar-track{-webkit-box-shadow: inset 0 0 16px rgba(,1);border-radius: 10px;background-color: #F5F5F5;}</style>');
								$('html > head').append(style_track);
								var style_bar = $('<style>$("#iscroll_" '+page['name']+')::-webkit-scrollbar{width: 7px;background-color: #F5F5F5;}</style>');
								$('html > head').append(style_bar);
								var style_thumb =$('<style>$("#iscroll_" '+page['name']+')::-webkit-scrollbar-thumb{border-radius: 10px;-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);background-color: #808080;}</style>');
								$('html > head').append(style_thumb);//--
							}else{
								page['iscroll'] = {};
								$("#iscroll_" + page['name'] + "> div:nth-child(2)").remove();
								page['iscroll'] = new iScroll($("#iscroll_" + page['name']).get(0), {
									bounceLock: true,
									onBeforeScrollStart: function (e) {
										var target = e.target;
										while (target.nodeType != 1) target = target.parentNode;
										if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
											e.preventDefault();
									}
								});
							}
 							
//							page['iscroll'] = {};
//							$("#iscroll_" + page['name'] + "> div:nth-child(2)").remove();
//							page['iscroll'] = new iScroll($("#iscroll_" + page['name']).get(0), {
////								useTransform: false,
//								bounceLock: true,
//								onBeforeScrollStart: function (e) {
//									var target = e.target;
//									while (target.nodeType != 1) target = target.parentNode;
//									if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
//										e.preventDefault();
//								}
//							});
							
							if($.utility('getSessionData',"offset")!=null)
							{
								var offset = $.utility('getSessionData',"offset");
								offset = $.parseJSON(offset);		
								if($.mobileweb.getCurrentPage().getName()==offset["page_name"])
								{
									page['iscroll'].scrollTo(0, offset["x"], 1);
								}
							}
							$.unblockUI();
							$("#showmorebtn").prop('disabled', false);
						});
						if(page['data']['contents']['allRecordsLoaded']){
							$("#showmore").remove();
						}
					}
				},500);
			}else if(page['type'] == "DBTableViewList"){
					$.utility('showLoadingIndicator', true);
					
					//Richa---Bug #8782 Fix					
				var x = $(".scroller").offset();
				var x_new = x.top;
				var y_new = x.left;//--
					
				page['data']['contents']['loaded'] = false;
					var initialContentLength = page['data']['contents'].length;
				new $.actions(page, null, [{method:"Select", category:"DBAction", callback : "loadMoreRecords", params:{tablename:page['data']['tablename'], where:page['data']['wherecond'], order:page['data']['order'],columns:""}}]).execute();
				var myVar=setInterval(function() {
					clearInterval(myVar);
					$.createRemoteDBListViewPageRows(page, function(){
						var contents = [];
						if(page['data']['contents'][0].constructor == Object){
							contents = page['data']['contents'];
						}else{
							contents = page['data']['contents'][0];
						}
						var noOFNewRowsAdded;
						var contentRemaining  = contents.length - $(".scroller").find('ul').children("li").length;
						if(contentRemaining > 25)
							noOFNewRowsAdded = 25;
						else
							noOFNewRowsAdded = contentRemaining;
						if(noOFNewRowsAdded == 0)
							$("#showmore").remove();
						var allRowHeight = 0;
						for(var k = 0; k < noOFNewRowsAdded; k++){
							var rowLength = page['children'][0]['group'][0]['row'].length;
							var rownum = $(".scroller").find('ul').children("li").length;
							if(rownum >= contents.length){       		//Bug #12633 fix
								$("#showmore").remove();
								return;
							}
							$.createRow(page,baseId,page['children'][0]['group'][0]['row'][rownum],noOFNewRowsAdded + k,function(row){
								allRowHeight = allRowHeight + row.getCellHeight();
								allRowHeight = allRowHeight + 2;
								page['children'][0]['group'][0]['row'][rownum] = row;
								
								//page['children'][0]['group'][0]['row'].push(page['children'][0]['group'][0]['row'][rownum]);
								$(".scroller").find('ul').append(page['children'][0]['group'][0]['row'][rownum].getHTML().join(''));
								page['children'][0]['group'][0]['row'][rownum].applyOverrides();
								page['children'][0]['group'][0]['row'][rownum].applyEvents();
							});
						}
						$.utility('showLoadingIndicator', false);
						$(".scroller").find('ul').unblock();
						$('.ui-loader').css({'display': 'none'});
						$(".bglayout").css({"height" : (parseFloat($(".bglayout").css("height").replace("px","")) + allRowHeight) + "px"});
						$(".scroller").css({"height" : (parseFloat($(".scroller").css("height").replace("px","")) + allRowHeight) + "px"});
						//Richa---Bug #8782 Fix
						var x = $(".scroller").offset();
						var timer = setInterval(function() {
							clearInterval(timer);
							$(".scroller").offset({top:x_new,left:y_new})
							var x = $(".scroller").offset();
						},400);//--
						

						if($.mobileweb.device['type'] === 'Desktop'){
							$('#iscroll_'+pagedef['name']).css({'overflow-y':'scroll','overflow-x':'hidden'});
						}else{
							page['iscroll'] = {};
							$("#iscroll_" + page['name'] + "> div:nth-child(2)").remove();
							page['iscroll'] = new iScroll($('#iscroll_'+page['name']).get(0), {
//								useTransform: false,
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
					$.unblockUI();
					$("#showmore").prop('disabled', false);
				},300);
			}
		});
		
	};
	
	$.createRemoteListPageRow = function(pagedef, id, grprow, index, isFlexible, callback){
		//ui-4-group-0-row-9
		//ui-group-0-main-9_p
		var row = {id: id + '-row-' + index,
				   rownum: index,
				   children: new $.uichildren(pagedef, grprow['children'], grprow['data']['contents'][0]),
				   backgroundColor : grprow['backgroundColor'],
				   isFlexible : isFlexible,
				   data: grprow['data']
		};
		
		if(row['rownum']%2 === 0){
			row['cellBackgroundColor'] = grprow['oddRowBackgroundColor'];
			row['cellBackgroundImage'] = grprow['oddRowBackgroundImage'];
		}else{
			row['cellBackgroundColor'] = grprow['evenRowBackgroundColor'];
			row['cellBackgroundImage'] = grprow['evenRowBackgroundImage'];
		}
		
		row.getHTML = function(){
			//<li data-icon="arrow-r" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-iconpos="right" data-theme="c" class="ui-btn ui-btn-up-c ui-btn-icon-right ui-li-has-arrow ui-li ui-li-last"><div class="ui-btn-inner ui-li"><div class="ui-btn-text">
			var test = [];
			if(grprow['icon'] != undefined && grprow['icon']['style'] != "false"){
				test = ["<li data-icon='", grprow['icon']['style'], "' data-corners='false' data-shadow='false' data-iconshadow='true' data-wrapperels='div' data-iconpos='right' data-theme='c' class='ui-btn ui-btn-up-c ui-btn-icon-right ui-li-has-arrow ui-li ui-li-last'><div class='ui-btn-inner ui-li'><div class='ui-btn-text'>", 
						"<a href='#' id='", row['id'], "' class='ui-table-padding  ui-link-inherit'>",
							"<div class='ui-table-row-size' style='visibility:hidden'>",
								row['children'].getHTML(),
							"</div>",
						"</a></div><span class='ui-icon ui-icon-arrow-r ui-icon-shadow' style='z-index: 99;'>&nbsp;</span></div>", //change this to DIV for the flat style
						"<div id='", row['id'], "-icon'>","</div>",
					"</li>"].join('');	
			}else{
				test = ["<li data-icon='", grprow['icon']['style'], "' data-corners='false' data-shadow='false' data-iconshadow='true' data-wrapperels='div' data-iconpos='right' data-theme='c' class='ui-btn ui-btn-up-c ui-btn-icon-right ui-li-has-arrow ui-li ui-li-last'><div class='ui-btn-inner ui-li'><div class='ui-btn-text'>", 
						"<a href='#' id='", row['id'], "' class='ui-table-padding  ui-link-inherit'>",
							"<div class='ui-table-row-size' style='visibility:hidden'>",
								row['children'].getHTML(),
							"</div>",
						"</a></div></div>", //change this to DIV for the flat style
						"<div id='", row['id'], "-icon'>","</div>",
					"</li>"].join('');
			}
			
			
			return test;
		};
		
		
		
		row.getViewType = function(){
			return 'Row';
		};
		
		row.applyOverrides = function(){
			row.setCellHeight(grprow['rowsize']);
			row['children'].applyOverrides();
			row['children'].applyEvents();
			
			$('#'+row['id']+' .ui-table-row-size').css({'visibility':'visible'});
			
			if(row['backgroundColor'] != undefined){
				$('#'+row['id']).css({'background-color':$.attributes('color', row['backgroundColor']).getColorCode()});
				$(".ui-li>.ui-btn-inner").css({'background-color':$.attributes('color', row['backgroundColor']).getColorCode()});
			}
			
			if(row['cellBackgroundColor'] != undefined){
				$('#'+row['id']).css({'background-color':$.attributes('color', row['cellBackgroundColor']).getColorCode()});
			}
			if(row['cellBackgroundImage'] != undefined && row['cellBackgroundImage']!=''){
				if(row['repeatImage']){
					$('#'+row['id']).css({'z-index':99,'background-image':'url('+$.utility('getImage',row['cellBackgroundImage'])+')','background-color':'white','background-position':'100% 100%','background-repeat': 'repeat'});
				}else{
					$('#'+row['id']).css({'z-index':99,'background-image':'url('+$.utility('getImage',row['cellBackgroundImage'])+')','background-color':'white','background-position':'100% 100%', 'background-size': 'cover'});
				}
			}
			
			if(grprow['icon']['style']=='button'){
				$('#'+row['id']).parent().siblings().css({'z-index':99,'background-image':'url('+$.utility('getSystemImage','button.png',row.getViewType())+')','background-color':'white','background-position':' 50% 50%','background-repeat': 'no-repeat no-repeat'});
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
					left: (pagedef['width'] * $.mobileweb.device['aspectratio']) - 40,
					height: grprow['rowsize'] * $.mobileweb.device['aspectratio'],
					width:40
				});
			}
			// Below Code is for removing the border space from rows..
			$('.ui-li').css({'border-top-width':'0px', 'border-bottom-width':'0px'});
			//$('.ui-li').css({'border-top-width':'0px'});
			//border-bottom-width
			// Below Code is for flexible Rows and TextArea in it ...
			var flexibleHeights = [];
			$.each(row['children'],function(i,child){				
				if(row['isFlexible']){
					if(child.getViewType() === "TextArea" && child['flexibleHeight'])
					{
						row.setFlexibleHeight(child,flexibleHeights);
					}
					else{
//						return false;
//						// we need to manage other ui-part's postion accroding to flexible TextArea
//						console.log(child.getViewType(), child['frame'].getFrame())
					}
				}
			});
		};
		
		row.setFlexibleHeight = function(child,flexibleHeights){
			$('#'+child.getId()).css({'padding-bottom':''});
			$('#'+child.getId()).addClass("ui-input-text");
			$('#'+child.getId()).addClass("autoExpand");
			$('#'+child.getId()).css({'height':'initial', 'max-height':'','overflow':'hidden'});
			
			var bottomgap = row.getCellHeight() - ((parseInt(child['frame'].getFrame()['y']) + parseInt(child['frame'].getFrame()['height'])) * $.mobileweb.device['aspectratio']);
			$('#'+child.getId()).css({'bottom':bottomgap+'px'});
			
			var elem = document.getElementById(child.getId()); 
			if(elem == null)		return;
			var outerHeight = parseInt(window.getComputedStyle(elem).height, 10);
			var diff = outerHeight - elem.clientHeight;
			
			// set the height to 0 in case of it has to be shrinked
			elem.style.height = 0;
			
			// set the correct height, elem.scrollHeight is the full height of the content, not just the visible part
			var elemheight = Math.max(elem.scrollHeight, elem.scrollHeight + diff);
			elem.style.height = elemheight + 'px';
			
			var flexheight = row.getCellHeight() - (parseInt(child['frame'].getFrame()['height']) * $.mobileweb.device['aspectratio']) + elemheight;
			
			//For Other ui except textview
			var textArea_y , textArea_x;
			var textArea_height;
			textArea_y = (parseInt(child['frame'].getFrame()['y']));
			textArea_x = (parseInt(child['frame'].getFrame()['x']));
			textArea_height = (parseInt(child['frame'].getFrame()['height']));
			
 			$.each(row['children'],function(i,child){
 				if(child.getViewType() != "TextArea"){
 					if((parseInt(child['frame'].getFrame()['y']) >= (textArea_y + textArea_height)))
 					{
 						var gap = row.getCellHeight() - (parseInt(child['frame'].getFrame()['y']) + parseInt(child['frame'].getFrame()['height']))*$.mobileweb.device['aspectratio'];
 						$('#'+child.getId()).css({'top':''});
 						$('#'+child.getId()+'_p').css({'top':''});
 						$('#'+child.getId()).css({'bottom':gap});
 						$('#'+child.getId()+'_p').css({'bottom':gap});
 					}
 					else if((parseInt(child['frame'].getFrame()['y']) >= textArea_y) && (parseInt(child['frame'].getFrame()['x']) >= textArea_x))
 					{
 						var gap = row.getCellHeight() - (parseInt(child['frame'].getFrame()['y']) + parseInt(child['frame'].getFrame()['height']))*$.mobileweb.device['aspectratio'];
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
			grprow['rowsize'] = param;
			$('#'+row['id']+' .ui-table-row-size').css({'height':param * $.mobileweb.device['aspectratio']});
		};
		
		row.getCellHeight = function(){
			return grprow['rowsize'] * $.mobileweb.device['aspectratio'];
		};
		
		row.applyEvents = function(){
			if(grprow['icon']['events']){
				if(grprow['icon']['events']['Tap']){
					jQuery($('#'+id+' .ui-icon').get(index)).click(function(){
						$('#'+row['id']+'-icon').click();
					});
					$('#'+row['id']+'-icon').click(function(){
						if(pagedef['data'] != undefined)
							pagedef['data']['contents']['currentRow'] = row['rownum'];
						$.each(grprow['icon']['events']['Tap'],function(i,action){
							if(action['category']==='PageAction') 
								$('#'+row['id']).addClass('ui-btn-active');
						}); 
						if(pagedef['data'] != undefined)
							pagedef['data']['contents']['currentRow'] = row['rownum'];
						new $.actions(pagedef, row, grprow['icon']['events']['Tap'].slice()).execute(); 
					});
				}
			}
			
			if(grprow['events']['Tap'].length == 0){
				$('#'+row['id']).mouseup(function () {
					var rowfocustimer = setInterval(function() {
						clearInterval(rowfocustimer);
						$('#'+row['id']).blur();
					},200);
				});
			}
			
			if(grprow['events']){
				var alreadyclicked=false;
				if(grprow['events']['Tap']){
					
					$('#'+row['id']).bind("tap",function(){// Bug #10546 fix
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
								}else {
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
				
				var alreadySwiped=false;
				if(grprow['events']['flickRL']){
					$('#'+row['id']).on("swipeleft",function(event){
						if(pagedef['data'] != undefined)
							pagedef['data']['contents']['currentRow'] = row['rownum'];
						if (alreadySwiped)
						{
							alreadySwiped=false;
							clearTimeout(alreadySwipedTimeout);
						}
						else
						{
							alreadySwiped=true;
							alreadySwipedTimeout=setTimeout(function(){
								alreadySwiped=false; 
							},300);
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
								}else {
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
							alreadySwiped=false;
							clearTimeout(alreadySwipedTimeout); 
						}
						else
						{
							alreadySwiped=true;
							alreadySwipedTimeout=setTimeout(function(){
								alreadySwiped=false; 
							},300);
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
								}else {
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
		callback(row);
		
		//return row;
	};
	
	$.createAccordionListGroup = function(pagedef, tblgroup, index, listHeight, callback){
		
//		for(var i =0; i < page['data']['contents'].length; i++){
//			page['children'][0]['group'][0]['row'][i]['data']['contents'][0]= page['data']['contents'][i];
//			$.createRemoteListPageRow(page,baseId, page['children'][0]['group'][0]['row'][i], i, page['children'][0]['group'][0]['flexibleHeight'], function(newRow){
//				$(".scroller").find('ul').append(newRow.getHTML());
//				newRow.applyOverrides();
//				newRow.applyEvents();
//				$.utility("showLoadingIndicator", false);
//			});
//		}
		
		
		var id = tblgroup['id'];
		var group = {id: id, grpnum: index, state:'open', row:[]};
		
		$.each(tblgroup['row'],function(i,row){
			//group['row'].push(new Row(pagedef, group['id'], row, i, tblgroup['flexibleHeight']));
			group['row'].push(row);
		});
	
		group.getHTML = function() {
		    var groupby = [];
		    var uniqueArray = [];

		    var field = pagedef['data']['groupby'].replace('[', '').replace(']', '');
		    for (j = 0; j < pagedef['data']['contents'].length; j++) {
		        groupby.push(pagedef['data']['contents'][j][field]);
		    }
		    $.each(groupby, function(index, value) {
		        if (uniqueArray.indexOf(value) === -1) {
		            uniqueArray.push(value);
		        }
		    });
		    uniqueArray.sort();//Bug #12572 fix
		    tblgroup['header'] = (uniqueArray.length != 0) ? uniqueArray[index] + " (" + group['row'].length + ") " : "";

		    var groupedStyle = (pagedef['children'][0]['tablestyle'] == "Grouped") ? "style='padding:3px;'" : "";
		    var tableStyle = (pagedef['children'][0]['tablestyle'] == "Grouped") ? "true" : "false";

		    var _group = '';
		    _group = ["<div data-role='collapsible' data-collapsed='false' class='ui-collapsible ui-collapsible-inset' style='visibility:hidden' >"];
		    if (tblgroup['header'] != "") {
		        //_group = _group.concat(["<h2 class='ui-collapsible-heading' id='", group['id'], "'>",tblgroup['header'],"</h2>"]);
		        _group = _group.concat(["<h2 class='ui-collapsible-heading' id='", group['id'], "'>",
		            "<a href='#' class='ui-collapsible-heading-toggle ui-btn ui-fullsize ui-btn-icon-left ui-corner-top ui-corner-bottom ui-btn-up-c' data-corners='false' data-shadow='false' data-iconshadow='true' data-wrapperels='span' data-icon='plus' data-iconpos='left' data-theme='c' data-mini='false' >",
		            "<span class='ui-btn-inner ui-corner-top ui-corner-bottom'>",
		            "<span class='ui-btn-text'>", tblgroup['header'],
		            "<span class='ui-collapsible-heading-status'>click to collapse contents</span>",
		            "</span>",
		            "<span class='ui-icon'>&nbsp;</span>",
		            "</span>",
		            "</a>",
		            "</h2>"
		        ]);
		        _group = _group.concat(["<div class='ui-collapsible-content' aria-hidden='false'>"]);
		    }
		    _group = _group.concat(["<ul id='", group['id'], "' class='ui-listview' data-role='listview' data-split-theme='d' data-inset='", tableStyle, "' " + groupedStyle + ">"]);

		    $.each(group['row'], function(i, row) {
		        _group = _group.concat(row.getHTML());
		    });
		    _group = _group.concat(["</ul>"]);

		    if (tblgroup['footer'] && tblgroup['footer'].length > 0) {
		        _group = _group.concat(["<div id='", group['id'], "-footer'>",
		            "<p class='ui-table-footer-text'>", tblgroup['footer'], "&nbsp</p>",
		            "</div>"
		        ]);
		    } else {
		        _group = _group.concat(["<div id='", group['id'], "-footer'>", "</div>"]);
		    }
		    _group = _group.concat(["</div>"]); // closing DIV for collapsible..

		    return _group.join('');
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
				if(pagedef['type'] === "TableView" || pagedef['type'] === "DBTableViewList" || pagedef['type'] == "RemoteTableViewList"){
	               var groupedPad = 0;
	               if($('#' + group['id']).css('padding'))
	                   groupedPad = $('#' + group['id']).css('padding').replace('px','')*2;
					if(pagedef['children'][0]['accordion']){
						
						$("div[data-role='collapsible']").css({'width':pagedef['width'] * $.mobileweb.device['aspectWratio'],'margin-top':'0px', 'margin-bottom':(4*$.mobileweb.device['aspectHratio'])});
						$('.ui-collapsible-content').css({'padding':'0px 0px 0px', 'display':'block'});
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
							}else{
								$('.ui-collapsible-heading > a > span > span.ui-icon').attr('class', 'ui-icon ui-icon-shadow ui-icon-minus');
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
				
				if($('.ui-collapsible').get(index)){
					if(index == 0)
						listHeight[0] = $('.ui-collapsible').get(index)['clientHeight']+4;
					else
						listHeight[0] = listHeight[0] + $('.ui-collapsible').get(index)['clientHeight']+4;
					//console.log(listHeight[0], "*******************" , $('.ui-collapsible').get(index)['clientHeight']);
					
					var scroller_height = parseInt($(".scroller").css("height").replace('px',''));
					if(scroller_height < listHeight[0])
						$(".scroller").css({"height" : listHeight[0]+'px'});
				}
				
				$('.ui-collapsible').css({'visibility':'visible'});
				$('.ui-table-position').css({'visibility':'visible'});
	
			},timerTime);
		};
		
		group.applyEvents = function(){
			$.each(group['row'],function(i,row){
				row.applyEvents();
			});
			
			$('.ui-collapsible-heading').click(function(event){
				if(group['id'] == $(this).attr('id')){
					
					var initHeight = $('.ui-collapsible').get(index)['clientHeight'];
					if(group['state'] == 'open')
						group['state'] = 'close';
					else
						group['state'] = 'open';
					
					var accordionHeader = pagedef['children'][0]['accordionheader'];
					if(accordionHeader){
						var iconClosed= $.utility('getImage', $.utility('tokenizeString',accordionHeader['closeicon'],pagedef));
						var iconOpen= $.utility('getImage', $.utility('tokenizeString',accordionHeader['openicon'],pagedef));
						
						if(group['state'] == 'close'){
							if(iconClosed != ""){
								$('#'+$(this).attr('id')+' > a > span > span.ui-icon').attr('class','ui-icon');
								$('#'+$(this).attr('id')+' > a > span > span.ui-icon').css({'background-image':'url('+iconClosed+')'});
								$('#'+$(this).attr('id')+' > a > span > span.ui-icon').css({'background-size':'18px 18px'});
							}else{
								$('#'+$(this).attr('id')+' > a > span > span.ui-icon').css({'background-image':''});
								$('#'+$(this).attr('id')+' > a > span > span.ui-icon').attr('class', 'ui-icon ui-icon-shadow ui-icon-plus');
							}
							
							$("ul[id='"+ group['id']+ "']").parent().css({'display':'none'});
						}else{
							if(iconOpen != ""){
								$('#'+$(this).attr('id')+' > a > span > span.ui-icon').attr('class','ui-icon');
								$('#'+$(this).attr('id')+' > a > span > span.ui-icon').css({'background-image':'url('+iconOpen+')'});
								$('#'+$(this).attr('id')+' > a > span > span.ui-icon').css({'background-size':'18px 18px'});
							}else{
								$('#'+$(this).attr('id')+' > a > span > span.ui-icon').css({'background-image':''});
								$('#'+$(this).attr('id')+' > a > span > span.ui-icon').attr('class', 'ui-icon ui-icon-shadow ui-icon-minus');
							}
							
							$("ul[id='"+ group['id']+ "']").parent().css({'display':'block'});
							
						}
					}
					
					var lastHeight = $('.ui-collapsible').get(index)['clientHeight'];
					var scroller_height = parseInt($(".scroller").css("height").replace('px','')) - initHeight + lastHeight;
					if(scroller_height > parseInt($('.bglayout').css('height').replace('px','')))
						$(".scroller").css({"height" : scroller_height+'px'});
					
				}
				
			});
		};
	
		callback(group);
		
	};

	$.utility = function(method) {
		if (utilmethods[method]) {
			if (utilmethods.data == undefined) {
				utilmethods.init();
			}
			;
			return utilmethods[method].apply(this, Array.prototype.slice.call(
					arguments, 1));
		} else if (typeof method === 'object' || !method)
			return utilmethods.init.apply(this, arguments);
		else
			$.error('Method ' + method + ' does not exist on jQuery.utility');
	};
	
	setup(jQuery);

})(jQuery);
