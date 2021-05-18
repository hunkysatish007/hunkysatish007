/**
 *Author: Sachit Kesri * Date: January 20, 2016
 * jQuery Plugin that handles the localization
 */

(function($){
	$.mobileweblanguage = function(project){
		$.mobileweblanguage.redirectLanguageScreen = function(){
			var language = navigator.languages[0];
			switch(language){
			case 'hi':
				window.location.href = "./index_"+project["screenId"]+"hi.html" ;
				break;
			case 'jp':
				window.location.href = "./index_"+project["screenId"]+"jp.html" ;
				break
			default:
				window.location.href = "./index_"+project["screenId"]+"en.html" ;
				break
			}
			
				
			
		};
		
		
		return $.mobileweblanguage;
		
	};
})(jQuery);
