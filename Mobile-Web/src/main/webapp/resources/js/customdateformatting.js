/**
 * Author: Sachit Kesri Date: Oct 8, 2014 jQuery Plugin that handles some
 * datePicker related methods
 */


(function($) {
	var monthName = ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var datePickerMethods = {
			
			init : function(options) {
				if (datePickerMethods.keys == undefined) {
					datePickerMethods.keys = {
							Monday : '月曜日',
							Mon : '月',
							Tuesday:'火曜日', 
							Tues : '火',
							Wednesday : '水曜日',
							Wed : '水',
							Thrusday :'木曜日',
							Thrus : '木',
							Friday : '金曜日', 
							Fri : '金',
							Saturday :'土曜日',
							Sat: '土',
							Sunday :'日曜日',
							Sun :'日',
							Jan :'1月',
							Feb : '2月',
							Mar : '3月',
							Apr : '4月',
							May : '5月',
							Jun : '6月',
							Jul : '7月',
							Aug : '8月',
							Sep : '9月', 
							Oct : '10月',
							Nov : '11月',
							Dec : '12月',
							AM : 'AM',//'午前',
							PM : 'PM'//'午後'

					};
					$.extend(datePickerMethods.keys, options);
				} else
					$.error('[CRIT] Cannot make multiple instances of jQuery.datePicker');
				return this;
			},
			
			getMonthName: function(month){
				if($.utility('detectBrowserLanguage') != 'ja'){
					return month;
				}else{
					return $.datePicker("translateDateKey",month);
				}
					
			},
			getPeriodName: function(period){
				if($.utility('detectBrowserLanguage') != 'ja'){
					return period;
				}else{
					return $.datePicker("translateDateKey",period);
				}
					
			},
			translateDateKey : function(date){
				return datePickerMethods['keys'][date];
			},
	};
	
	$.datePicker = function(method) {
		if (datePickerMethods[method]) {
			if (datePickerMethods.keys == undefined) {
				datePickerMethods.init();
			};
			return datePickerMethods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method)
			return datePickerMethods.init.apply(this, arguments);
		else
			$.error('Method ' + method + ' does not exist on jQuery.datePicker');
	};

})(jQuery);
