/**
 *Author: Sachit Kesri * Date: May 14, 2014
 * jQuery Plugin that handles the screens
 */

(function($){
	$.mobilewebscreen = function(project){
		var alertCount = 0;
		$.mobilewebscreen = {
				screen: {
					screenId : "",
					height : "",
					width : ""
				}
		};
		$.mobilewebscreen.redirectToScreen = function(){
			var ratio = window.devicePixelRatio;
			var clientHeight = screen.height * ratio; //Math.min(document.documentElement.clientWidth,document.documentElement.clientHeight);
			var clientWidth = screen.width * ratio; //Math.min(document.documentElement.clientWidth,document.documentElement.clientWidth);
			var screenToDisplay = $.mobilewebscreen.fetchBestFitScreen(project['screens'],clientHeight,clientWidth);
			if(!$.isEmptyObject(screenToDisplay)){
				$.ajax({
					url: "./index_" + screenToDisplay['id'] + ".html", //or your url
					success: function(data){
						$.mobilewebscreen.screen.screenId = screenToDisplay['id'];
						$.mobilewebscreen.screen.height = screenToDisplay['height'];
						$.mobilewebscreen.screen.width = screenToDisplay['width'];
						window.location.href = "./index_" + screenToDisplay['id'] + ".html" ;
					},	
					error: function(data){
						var errorMessageEnglish = "The Best Screen-Size for this application could not be displayed due to some technical problem. <br> Press 'OK' to switch to another screen.";
						var Left = (document.documentElement.clientWidth - 320)/2;
						$.blockUI({ message:'<section id="warningScreen_'+alertCount+'"><article style=""class="message clearfix"><h1>There is a problem!</h1><p>The following issues have been found:</p><ul><li>'+errorMessageEnglish+'</li><br></ul><button id="cancelAlert" style="cursor:pointer;">OK</button> </article</section>', css: { position:'relative',border: 'none', backgroundColor: '',left :Left+'px','height':'376px',width:320+'px','padding':'0px', '-webkit-border-radius': '10px', '-moz-border-radius': '10px', 'text-align':'left', color: '#fff', top:"45px", opacity:"0.9", cursor:""}	});
						$('.message errorMessage>ul>li').css({'word-wrap':'break-word'});
						$('#cancelAlert').bind('click touchstart tap',function(){
							$("#warningScreen_" + alertCount).remove();
							project['screens'].splice(--screenToDisplay['id'], 1);
							alertCount++;
							$.mobilewebscreen.redirectToScreen();
							return false; 
						});
					},
				});
			}else window.location.href = "./index_1.html" ;
		};
		
		$.mobilewebscreen.getAllScreens = function(){
			return project['screens'];
		};
		
		$.mobilewebscreen.getCurrentScreen = function(){
			return $.mobilewebscreen.screen.height + "x" + $.mobilewebscreen.screen.width;
		};
		
		$.mobilewebscreen.fetchBestFitScreen = function(screens, clientHeight, clientWidth){
			var possibleScreensToDisplay = [];
			var count = 0;
			$.each(screens, function(key, screen){
				if(screen['height'] <= clientHeight && screen['width'] <= clientWidth){
					screen.area = screen['height'] * screen['width'];
					possibleScreensToDisplay[count] = screen;
				}
				count++;
			});
			
			var m = -Infinity, n = possibleScreensToDisplay.length;
			var screenToDisplay = {};
			for (var i = 0; i != n; ++i) {
				if (possibleScreensToDisplay[i] != undefined && possibleScreensToDisplay[i]["area"] > m) {
					screenToDisplay = possibleScreensToDisplay[i];
					m = possibleScreensToDisplay[i]["area"];
				}
			}
			return screenToDisplay;
		};
		
		return $.mobilewebscreen;
		
	};
})(jQuery);
