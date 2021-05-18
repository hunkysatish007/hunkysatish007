/**
 * Author: Sachit Kesri Date: July 13, 2015.
 * jQuery Plugin that handles all the ADF functions which is embedded anywhere in a application 
 */

(function($){

	/* ---------Text functions---------  */

	$.REPLACE = function(inputString, toReplace, fromReplace){
		return inputString.replace(new RegExp(toReplace,"g"),fromReplace);
	};
	
	$.LOWER = function(inputString){
		return inputString.toLowerCase();
	};
	
	$.UPPER = function(inputString){
		return inputString.toUpperCase();
	};
	
	$.CHR = function(inputValue){
		return String.fromCharCode(inputValue);
	};
	
	$.ASCII = function(inputString){
		return inputString.charCodeAt(0);
	};
	
	$.substr = function(inputString, start, end){
		return inputString.substr(parseInt(start)-1,end);
	};
	
	$.SUBSTR = function(inputString, start, len){
		if(parseInt(start)+parseInt(len) > inputString.length)
			return '';
		return inputString.substr(parseInt(start), parseInt(len));
	};
	
	$.CONCAT = function(){
		var argsArray = Array.prototype.slice.call(arguments);
		return argsArray.join('');
	};
	
	$.TRANSLATE = function(inputvalue, toTranslate, fromTranslate){

		return inputvalue;
	};
	
	$.CHARINDEX = function(inputString, char){

		return inputString.indexOf(char);
	};
	
	$.REGEXP_LIKE= function(input,pattern){
		var str = pattern.replace("regex(", "").replace(pattern.charAt(pattern.lastIndexOf(")")),"");
		var patt = new RegExp(pattern.substring(0, pattern.length-1).replace("regex(", ""));
		var res = patt.test(input);
		return res;
	}
	
	$.EXEC_REGEXP_LIKE= function(input,pattern){
		var patt = new RegExp(pattern.substring(0, pattern.length-1).replace("regex(", ""));
		var res = patt.exec(input);
		return res;
		
//		var result = "";
//		var str = pattern.replace("regex(", "").replace(pattern.charAt(pattern.lastIndexOf(")")),"");
//		var patt = new RegExp(str,"gi");
//		var res = input.match(patt);
//		if(res){
//			for (var i = 0; i < res.length; i++) {
//				result += res[i];
//			}
//		}
//		
//		var resArr = [result];
//		return resArr;
	}
	
	$.RPAD = function(inputString, newStringLength, secondString){
		var combineString = inputString.concat(secondString);
		var finalString= new Array(parseInt(newStringLength));
		var fixedlength = finalString.length;	
		if(combineString.length == fixedlength){
			return combineString;
		}else if(combineString.length < fixedlength){
			finalString = combineString.split("");
			for(var i = 0 ; i < fixedlength; i++){	
				if(finalString[i] == "" || finalString[i] == undefined){
					for(var j = 0; j < secondString.length; j++){
						if(i < fixedlength){
							finalString[i] = secondString[j];
							i = i + 1;
							if(j == secondString.length - 1){
								i = i - 1;
							}
						}
					}
				}
			}
		}else
			for(var i = 0; i < fixedlength; i++){
				finalString[i] = combineString[i]; 		
			}	
		return finalString.join('');
	};
	$.STRINGLENGTH = function(inputString){
		return inputString.length;
	};
	
	
	$.TRIM = function(inputString, blanks){
		if(blanks != undefined){
			if(blanks != ' ' && blanks != ''){
				var inputLArr = inputString.split('');
				for(var i = 0; i < inputLArr.length; i++){
					if(inputLArr[i] == blanks) 	
						inputLArr[i] = '';
					else{					
						inputString = inputLArr.join('');
						break;
					}
				}
				
				var inputRArr = inputString.split('');
				for(var j = inputRArr.length-1; j >=0; j--){
					if(inputRArr[j] == blanks) 	
						inputRArr[j] = '';
					else{					
						inputString = inputRArr.join('');
						break;
					}
				}
			}
			else if(blanks == ' '){
				return inputString.trim();
			}
		} 
		return inputString;
		
	};
	$.LTRIM = function(inputString, leadBlanks){
		if(leadBlanks != undefined){
			if(leadBlanks != ''){
				var inputArr = inputString.split('');
				for(var i = 0; i < inputArr.length; i++){
					if(leadBlanks.indexOf(inputArr[i]) > -1)
						inputArr[i] = '';
					else{					
						inputString = inputArr.join('');
						break;
					}
				}
			}
		}		
		return inputString;
		
	};
	$.RTRIM = function(inputString, trailBlanks){
		if(trailBlanks != undefined){
			if(trailBlanks != ''){
				var inputArr = inputString.split('');
				for(var i = inputArr.length-1; i >=0; i--){
					if(trailBlanks.indexOf(inputArr[i]) > -1) 	
						inputArr[i] = '';
					else{					
						inputString = inputArr.join('');
						break;
					}
				}
			}
		}
		return inputString;
		
	};
	
	
	$.LEFT = function(inputString, indexfromStart){
 		if(parseInt(indexfromStart) > 0 && inputString.length >= parseInt(indexfromStart))
 			return inputString.substr(0, parseInt(indexfromStart));
 		
 		return "";		// for Non-acceptable values, we are returning "" output. Refer redmine bugs # 10837, 10852
 	};
 	$.RIGHT = function(inputString, indexfromEnd){
 		if(parseInt(indexfromEnd) > 0 && inputString.length >= parseInt(indexfromEnd))
 			return inputString.substr(inputString.length - parseInt(indexfromEnd), parseInt(indexfromEnd));
 		
 		return "";		// for Non-acceptable values, we are returning "" output. Refer redmine bugs # 10837, 10852
 	};
	
	
	

	/* ---------Date Time functions---------  */

	$.YEAR = function(inputDate){
		try{
			var ua = navigator.userAgent.toLowerCase(); //Bug fix #12783
			if (ua.indexOf('safari') != -1) { 
				if (ua.indexOf('chrome') > -1) {
				    // Chrome
				  } else {
					  inputDate = inputDate.replace(/-/g,"/");
				  }
			}
			var date = new Date(inputDate);
			if(date == "Invalid Date"){
				return inputDate;
			}else{
				return date.getFullYear();
			}	
		}catch(e){
			return inputDate;
		}

	};

	$.DAY = function(inputDate){
		try{
			var ua = navigator.userAgent.toLowerCase(); //Bug fix #12783
			if (ua.indexOf('safari') != -1) { 
				if (ua.indexOf('chrome') > -1) {
				    // Chrome
				  } else {
					  inputDate = inputDate.replace(/-/g,"/");
				  }
			}
			var date = new Date(inputDate);
			if(date == "Invalid Date"){
				return inputDate;
			}else{
				return date.getDate();
			}	
		}catch(e){
			return inputDate;
		}

	};

	$.MONTH = function(inputDate){
		try{
			var ua = navigator.userAgent.toLowerCase(); //Bug fix #12783
			if (ua.indexOf('safari') != -1) { 
				if (ua.indexOf('chrome') > -1) {
				    // Chrome
				  } else {
					  inputDate = inputDate.replace(/-/g,"/");
				  }
			}
			var date = new Date(inputDate);
			if(date == "Invalid Date"){
				return inputDate;
			}else{
				return date.getMonth() + 1;
			}	
		}catch(e){
			return inputDate;
		}

	};

	$.HOUR = function(inputDate){
		try{
			var ua = navigator.userAgent.toLowerCase(); //Bug fix #12783
			if (ua.indexOf('safari') != -1) { 
				if (ua.indexOf('chrome') > -1) {
				    // Chrome
				  } else {
					  inputDate = inputDate.replace(/-/g,"/");
				  }
			}
			var date = new Date(inputDate);
			if(date == "Invalid Date"){
				var outputValue = $.validateTime(inputDate);
				if(outputValue == "Invalid Time"){
					return inputDate;	
				}else{
					return outputValue['hh'];
				}
			}else{
				return date.getHours();
			}	
		}catch(e){
			return inputDate;
		}

	};

	$.MINUTE = function(inputDate){
		try{
			var ua = navigator.userAgent.toLowerCase(); //Bug fix #12783
			if (ua.indexOf('safari') != -1) { 
				if (ua.indexOf('chrome') > -1) {
				    // Chrome
				  } else {
					  inputDate = inputDate.replace(/-/g,"/");
				  }
			}
			var date = new Date(inputDate);
			if(date == "Invalid Date"){
				var outputValue = $.validateTime(inputDate);
				if(outputValue == "Invalid Time"){
					return inputDate;	
				}else{
					return outputValue['mm'];
				}
			}else{
				return date.getMinutes();
			}	
		}catch(e){
			return inputDate;
		}

	};

	$.SECOND = function(inputDate){
		try{
			var ua = navigator.userAgent.toLowerCase(); //Bug fix #12783
			if (ua.indexOf('safari') != -1) { 
				if (ua.indexOf('chrome') > -1) {
				    // Chrome
				  } else {
					  inputDate = inputDate.replace(/-/g,"/");
				  }
			}
			var date = new Date(inputDate);
			if(date == "Invalid Date"){
				var outputValue = $.validateTime(inputDate);
				if(outputValue == "Invalid Time"){
					return inputDate;	
				}else{
					return outputValue['ss'];
				}
			}else{
				return date.getSeconds();
			}	
		}catch(e){
			return inputDate;
		}

	};

	$.DATEFROMPARTS = function(year, month, day){
		try{
			month = isNaN(parseInt(month.toString())) ? -1 : parseInt(month.toString())-1;
			var date = new Date(year, month, day);
			if(date ==="Invalid Date"){
				return "Invalid Date";
			}else{
				//return date.getDate();
				return date.getFullYear() + '-' + ((date.getMonth()+1).toString().length == 1 ? "0" + (date.getMonth()+1) : (date.getMonth()+1)) + '-' + (date.getDate().toString().length == 1 ? "0" + date.getDate() : date.getDate());
			}	
		}catch(e){
			return "Invalid Date";
		}

	};

	$.TIMEFROMPARTS = function(hour, minute,seconds){
		try{
			//var date = new Date(hour, minute,seconds);
			
			var today = new Date();
			var toYear = today.getYear() + 1900;
			var toMonth = today.getMonth();
			var toDate = today.getDate();
			var date = new Date(toYear, toMonth, toDate, hour, minute, seconds);
			if(date === "Invalid Date"){
				return "Invalid Date";
			}else{
				return date.getTime();
			}	
		}catch(e){
			return "Invalid Date";
		}

	};
	
	$.DOW = function(inputDate){
		try{
			var date = new Date(inputDate);
			if(date === "Invalid Date"){
				return "";
			}else{
				return date.getDay();
			}	
		}catch(e){
			return inputDate;
		}

	};
		
	$.WOM = function(inputDate){
		try{
			var date = new Date(inputDate);
			if(date === "Invalid Date"){
				return "";
			}else{
				var firstdayofmonth = new Date(date.getFullYear(),date.getMonth(),1);
				return Math.ceil(((date.getDate() - (7-firstdayofmonth.getDay()))/7))+1;
			}	
		}catch(e){
			return "";
		}

	};
	
	
	$.PREV_DATE = function(inputDate){
		try{
			var date = new Date(inputDate);
			if(date === "Invalid Date"){
				return "Invalid Date";
			}else{
				var prevdate = new Date(date);
				prevdate.setDate(date.getDate() - 1);
				
				var prevdatemonthpart = prevdate.getMonth() + 1;
				var resultdate = prevdate.getFullYear() + '-' + (prevdatemonthpart.toString().length == 1 ? "0" + prevdatemonthpart : prevdatemonthpart) + '-' + (prevdate.getDate().toString().length == 1 ? "0" + prevdate.getDate() : prevdate.getDate());
				if(inputDate.indexOf(':') != -1)
					return resultdate + inputDate.substring(inputDate.indexOf(" "));
				else
					return resultdate;
				
				//return prevdate;
			}	
		}catch(e){
			return "Invalid Date";
		}

	};
	
	$.NEXT_DATE = function(inputDate){
		try{
			var date = new Date(inputDate);
			if(date === "Invalid Date"){
				return "Invalid Date";
			}else{
				var nextdate = new Date(date);
				nextdate.setDate(date.getDate() + 1);
				
				var nextdatemonthpart = nextdate.getMonth() + 1;
				var resultdate = nextdate.getFullYear() + '-' + (nextdatemonthpart.toString().length == 1 ? "0" + nextdatemonthpart : nextdatemonthpart) + '-' + (nextdate.getDate().toString().length == 1 ? "0" + nextdate.getDate() : nextdate.getDate());
				if(inputDate.indexOf(':') != -1)
					return resultdate + inputDate.substring(inputDate.indexOf(" "));
				else
					return resultdate;
				
				//return nextdate;
			}	
		}catch(e){
			return "Invalid Date";
		}

	};
	
	$.DATEDIFF = function(datepart, startdate, enddate){
		try{
			var sdate = new Date(startdate);
			if(sdate === "Invalid Date"){
				return "Invalid Start Date";
			}
			var edate = new Date(enddate);
			if(edate === "Invalid Date"){
				return "Invalid End Date";
			}
			
			var timediff = edate - sdate;
			if (isNaN(timediff)) 
				return NaN;
			
			var second=1000, minute=second*60, hour=minute*60, day=hour*24, week=day*7;
			switch(datepart){
				case "milliseconds":
				case "time":
					return timediff;
				case "seconds": 
			        return Math.round(timediff / second);
				case "minutes": 
			        return Math.round(timediff / minute);
				case "hours"  : 
			        return Math.round(timediff / hour); 
				case "days"   : 
				case "date"   : 
			        return Math.round(timediff / day);
				case "months": 
				{
					var _year = edate.getFullYear() - sdate.getFullYear();
					var months = (year *12) + edate.getMonth() - sdate.getMonth();
					if(edate.getDate() < sdate.getDate())
						_months--;					
					return _months;
					
			        //return Math.round(timediff / (day*30));
				}
				case "years": 
				    return edate.getFullYear() - sdate.getFullYear();
				case "weeks"  : 
				    return Math.round(timediff / week);
				default: 
					return timediff;
			}
		}catch(e){
			return "";
		}
	};
	
	$.WEEK = function(inputDate){
		try{
			var date = new Date(inputDate);
			if(date === "Invalid Date"){
				return "";
			}else{
				var oneJan = new Date(date.getFullYear(),0,1);
				return Math.ceil((((date -oneJan) / 86400000) + oneJan.getDay()+1)/7)
			}	
		}catch(e){
			return inputDate;
		}
	};
	
	$.WOY = function(inputDate){
		try{
			var date = new Date(inputDate);
			if(date === "Invalid Date"){
				return "";
			}else{
				//var date = new Date(this.getTime());
				date.setHours(0, 0, 0, 0);

				date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);

				var week1 = new Date(date.getFullYear(), 0, 4);
				return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
				                        - 3 + (week1.getDay() + 6) % 7) / 7);
			}	
		}catch(e){
			return inputDate;
		}

	};
	
	/* ---------Numeric functions---------  */
	$.FLOOR = function(inputNumber){
		try{
			return Math.floor(inputNumber)
		}catch(e){
			return "";
		}

	};
	
	$.MOD = function(dividend,divisor){
		try{
			return dividend % divisor;
		}catch(e){
			return "";
		}

	};
	
	/* --------- Encrypt-Decrypt functions---------  */
	
	$.HASH = function(input, algo, mode){
		try{
			if(algo == undefined || algo == "")		algo = "SHA-256";
			if(mode == undefined || mode == "")		mode = "BASE64";
			
			if(window.crypto && crypto.subtle && window.TextEncoder) {
				var encodedText = new TextEncoder("utf-8").encode(input);
				
//				hashDigest(encodedText, algo, mode).then(function(hashvalue) {
//					console.log(input,":", mode, ">>>>", hashvalue);
//					return hashvalue;
//				});
				
				return new Promise(function(resolve, reject) {
					setTimeout(function() {
						resolve(hashDigest(encodedText, algo, mode));
					}, 10);
				}).then(function(hashvalue) {
					return hashvalue;
				});
				function hashDigest(enctext, algo, mode) {
					return crypto.subtle.digest(algo, enctext).then(function (buff) {
						if(mode == "BASE64"){
							var baseHash = [].map.call(new Uint8Array(buff), b => ('00' + b.toString(16)).slice(-2)).join('');
							return baseHash;
						}else {
							var hexHash = btoa(new Uint8Array(buff).reduce((s, b) => s + String.fromCharCode(b), ''));
							return hexHash;
						}
					});
				}
				
			}else {
				return input;
			}
		}catch(e){
			return "";
		}

	};
	

})(jQuery);