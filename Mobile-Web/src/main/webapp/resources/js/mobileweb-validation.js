/**
 * Date: June 24, 2013
 */

(function($) {

	var month = new Array();
	var day = new Array();
	var shortMonth = new Array();
	var shortDay = new Array();
	
	month[0] = "January";
	month[1] = "February";
	month[2] = "March";
	month[3] = "April";
	month[4] = "May";
	month[5] = "June";
	month[6] = "July";
	month[7] = "August";
	month[8] = "September";
	month[9] = "October";
	month[10] = "November";
	month[11] = "December";
	shortMonth[0] = "Jan";
	shortMonth[1] = "Feb";
	shortMonth[2] = "Mar";
	shortMonth[3] = "Apr";
	shortMonth[4] = "May";
	shortMonth[5] = "Jun";
	shortMonth[6] = "Jul";
	shortMonth[7] = "Aug";
	shortMonth[8] = "Sept";
	shortMonth[9] = "Oct";
	shortMonth[10] = "Nov";
	shortMonth[11] = "Dec";
	day[1] = "Monday";
	day[2] = "Tuesday";
	day[3] = "Wednesday";
	day[4] = "Thursday";
	day[5] = "Friday";
	day[6] = "Saturday";
	day[0] = "Sunday";
	shortDay[1] = "Mon";
	shortDay[2] = "Tue";
	shortDay[3] = "Wed";
	shortDay[4] = "Thu";
	shortDay[5] = "Fri";
	shortDay[6] = "Sat";
	shortDay[0] = "Sun";
	// ##THIS METHOD RUNS FIRST
	function setup($) {
		
	};
	
	var ValidationMethods = {
		init : function(options) {
			if (ValidationMethods.data == undefined) {
				ValidationMethods.data = {
				};
				$.extend(ValidationMethods.data, options);
			} else
				$.error('[CRIT] Cannot make multiple instances of jQuery.Validation');
			return this;
		},
		
//		var d = new Date();
//		var l = d["getFullYear"]();
//		var n = d.toLocaleDateString("ja-JP-u-ca-japanese");  
//		  
//		d.setFullYear(1986); 
//		var m = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', {era:'long'}).format(d);  
//		  
//		d.setFullYear(2018); 
//		var o = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', {era:'long'}).format(d);
//		  
//		d.setFullYear(2019); 
//		var p = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', {era:'long',year:'numeric'}).format(d);
//		  
//		console.log(l +"*****"+n +"------------- "+m +"------------- "+o +"------------- "+p);
//		//output : 2019*****1/11/21------------- 昭和61年11月21日------------- 平成30年11月21日------------- 令和1年
		
		ChangeInputFormatType : function(target, inputString){
			//console.log(inputString);
			
			if(target['inputFormatType'].indexOf("@@") != -1){

				if(target['inputFormatType'].indexOf("REGEXP_LIKE") != -1){
					var restrictRegexp = target['inputFormatType'].replace(/@@/g,"").replace("["+target['name']+"]", inputString);
					var restrictVal = eval("$.EXEC_" + restrictRegexp);
					if(restrictVal == null)
 						restrictVal = eval("$." + restrictRegexp);
					if(restrictVal[0] != inputString)
						inputString = restrictVal[0];
					
					return inputString;
				}
			}
			
			var txtInputFormat = target['inputFormatType'].replace(/[Zz9^#]/g,"_");
			var inputFormatTextArr = txtInputFormat.split('');
			if(inputString.length < inputFormatTextArr.length){
				while(inputString.length != inputFormatTextArr.length && inputFormatTextArr[inputString.length] != "_"){
					inputString = inputString.concat(inputFormatTextArr[inputString.length]);
				}
			}
				
			var inputFormatTypeArr = target['inputFormatType'].split('');

			var inputStringArr = inputString.split('');
			var length = inputStringArr.length;
			for(var i=0; i< inputStringArr.length; i++){
			//for(var i in inputStringArr){
				if(inputFormatTypeArr[i] == "Z"){
					if(inputStringArr[i] >= String.fromCharCode(65) && inputStringArr[i] <= String.fromCharCode(90)){
					}else{
						inputStringArr.splice(i, length);
					}
				}else if(inputFormatTypeArr[i] == "z"){
					if(inputStringArr[i] >= String.fromCharCode(97) && inputStringArr[i] <= String.fromCharCode(122)){
					}else{
						inputStringArr.splice(i, length);
					}
				}else if(inputFormatTypeArr[i] == "9"){
					if(inputStringArr[i] >= String.fromCharCode(48) && inputStringArr[i] <= String.fromCharCode(57)){
						inputStringArr.join('');
					}else{
						inputStringArr.splice(i, length);
					}
				}else if(inputFormatTypeArr[i] == "^"){
					if((inputStringArr[i] >= String.fromCharCode(65) && inputStringArr[i] <= String.fromCharCode(90)) || (inputStringArr[i] >= String.fromCharCode(97) && inputStringArr[i] <= String.fromCharCode(122))){
						inputStringArr.join('');
					}else{
						inputStringArr.splice(i, length);
					}
				}else if(inputFormatTypeArr[i] == "#"){
					if((inputStringArr[i] >= String.fromCharCode(48) && inputStringArr[i] <= String.fromCharCode(57)) || (inputStringArr[i] >= String.fromCharCode(65) && inputStringArr[i] <= String.fromCharCode(97)) 
							|| (inputStringArr[i] >= String.fromCharCode(97) && inputStringArr[i] <= String.fromCharCode(122))){
						inputStringArr.join('');
					}else{
						inputStringArr.splice(i, length);
					}
				}else{
					if(inputFormatTypeArr[i] == undefined){
						return inputStringArr.splice(0,i).join('');
					}else{
						if(inputString.charCodeAt(i) == target['inputFormatType'].charCodeAt(i)){
							//return inputStringArr.join('');
						}else{
							if(inputFormatTypeArr[i+1] == "Z" && inputStringArr[i] >= String.fromCharCode(65) && inputStringArr[i] <= String.fromCharCode(90)){
								inputStringArr[i+1] = inputStringArr[i];//inputString.charCodeAt(i);
							}else if(inputFormatTypeArr[i+1] == "z" && inputStringArr[i] >= String.fromCharCode(97) && inputStringArr[i] <= String.fromCharCode(122)){
								inputStringArr[i+1] = inputStringArr[i];//inputString.charCodeAt(i);
							}else if(inputFormatTypeArr[i+1] == "9" && inputStringArr[i] >= String.fromCharCode(48) && inputStringArr[i] <= String.fromCharCode(57)){
								inputStringArr[i+1] = inputStringArr[i];
							}else if(inputFormatTypeArr[i+1] == "^" && (inputStringArr[i] >= String.fromCharCode(65) && inputStringArr[i] <= String.fromCharCode(90)) || (inputStringArr[i] >= String.fromCharCode(97) && inputStringArr[i] <= String.fromCharCode(122))){
								inputStringArr[i+1] = inputStringArr[i];
							}else if(inputFormatTypeArr[i+1] == "#" && (inputStringArr[i] >= String.fromCharCode(48) && inputStringArr[i] <= String.fromCharCode(57))
									|| (inputStringArr[i] >= String.fromCharCode(65) && inputStringArr[i] <= String.fromCharCode(97)) || (inputStringArr[i] >= String.fromCharCode(97) && inputStringArr[i] <= String.fromCharCode(122))){
								inputStringArr[i+1] = inputStringArr[i];
							}
							inputStringArr[i] = target['inputFormatType'].charAt(i);
							i = i + 1;
							//	return  inputStringArr.join('');
						}
					}
					
				}
			}
			return inputStringArr.join('');
		},
		
		// Method deprecated 27 May, 2016 -- Now using validateFormat method as a replacement
		ChangeDateInputFormatType : function(target, inputString){
			var outputString = "";
			//check for month ,day, hours, minutes, second.
			/*if(target['inputFormatType'].length <= 2){
			if(inputString.length <=2){
				if(target['inputFormatType'].toString().toLowerCase() == "mm"){
					var month = inputString;
					if(month.charAt(1) === ""){
						if(!isNaN(month.charAt(0)) && parseInt(month.charAt(0)) >=0 && parseInt(month.charAt(0)) <= 1){
							outputString = outputString + inputString;
						}else{ 
							outputString;
						}
					}else{
						if(parseInt(month.charAt(0)) == 0){
							if(!isNaN(month.charAt(1)) && parseInt(month.charAt(1)) >=1 && parseInt(month.charAt(1)) <= 9){
								outputString = outputString + inputString;
							}
						}else if(parseInt(month.charAt(0)) == 1){
							if(!isNaN(month.charAt(1)) && parseInt(month.charAt(1)) >=1 && parseInt(month.charAt(1)) <= 2){
								outputString = outputString + inputString;
							}
						}
					}return outputString
				}else if(target['inputFormatType'].toString().toLowerCase() == "dd"){
					var day = inputString;
					if(day.charAt(1) === ""){
						if(!isNaN(day) && parseInt(day.charAt(0)) >=0 && parseInt(day.charAt(0)) <= 3){
							outputString = outputString + day;
						}else{
							outputString;
						}
					}else{
						console.log(day.charAt(0))
						if(parseInt(day.charAt(0)) == 0){
							if(!isNaN(day.charAt(1)) && parseInt(day.charAt(1)) >=0 && parseInt(day.charAt(1)) <= 9){
								outputString = outputString + day;
							}
						}else if(parseInt(day.charAt(0)) >= 1 && parseInt(day.charAt(0)) <= 2){
							if(!isNaN(day.charAt(1)) && parseInt(day.charAt(1)) >=0 && parseInt(day.charAt(1)) <= 9){
								outputString = outputString + day;
							}
						}else if(parseInt(day.charAt(0)) == 3){
							if(!isNaN(day.charAt(1)) && parseInt(day.charAt(1)) >=0 && parseInt(day.charAt(1)) <= 1){
								outputString = outputString + day;
							}
						}
					}return outputString;
				}
			}else{return "";}
			}*/
				
			// Currently supporting only 'yyyy-mm-dd hh:mm:ss'
				if(inputString.length > 3){
				// Checking for year only.... 'yyyy'.....
				if(target['inputFormatType'].toString().toLowerCase() == "yyyy"){
					if(!isNaN(inputString) && inputString >= 1900 && inputString<= 2080){
						return outputString = 	inputString;
					}else{
						return "";
					}
				}else{
				var seprator = "-";
				if(target['inputFormatType'].toString().toLowerCase() == "yyyy-mm-dd hh:mm:ss" || target['inputFormatType'].toString().toLowerCase() == "yyyy-mm-dd" ){
					seprator = "-";
				}else if(target['inputFormatType'].toString().toLowerCase() == "yyyy/mm/dd hh:mm:ss" || target['inputFormatType'].toString().toLowerCase() == "yyyy/mm/dd"){
					seprator = "/";
				}
				var inputStringArr = inputString.split(seprator);
				for(var i in inputStringArr){
					if( i == 0){
						if(!isNaN(inputStringArr[i]) && inputStringArr[i] >= 1900 && inputStringArr[i] <= 2080){
							outputString = 	outputString + inputStringArr[i] + seprator;
						}else{
							return "";
						}
					}else if(i == 1){
						var month = inputStringArr[i].toString();
						if(month.charAt(1) === ""){
							if(!isNaN(inputStringArr[i]) && parseInt(month.charAt(0)) >=0 && parseInt(month.charAt(0)) <= 1){
								outputString = outputString + inputStringArr[i];
							}else{
								return outputString;
							}
						}else{
							if(parseInt(month.charAt(0)) == 0){
								if(!isNaN(month.charAt(1)) && parseInt(month.charAt(1)) >=1 && parseInt(month.charAt(1)) <= 9){
									outputString = outputString + inputStringArr[i] + seprator;
								}
							}else if(parseInt(month.charAt(0)) == 1){
								if(!isNaN(month.charAt(1)) && parseInt(month.charAt(1)) >=1 && parseInt(month.charAt(1)) <= 2){
									outputString = outputString + inputStringArr[i] + seprator;
								}
							}
						}
					}else if(i == 2){
						var tempDate = inputStringArr[i].split(" ");
						if(tempDate[1] == ""){
							tempDate.splice(1,1);
						}
						for(var j in tempDate){
							if(j == 0){
								var date = tempDate[j].toString();
								if((target['inputFormatType'].toString().toLowerCase() == "yyyy/mm/dd" || target['inputFormatType'].toString().toLowerCase() == "yyyy-mm-dd") && date.length > 2){
									return outputString;
								}else{
									if(date.charAt(1) === ""){
										if(!isNaN(tempDate[j]) && parseInt(date.charAt(0)) >=0 && parseInt(date.charAt(0)) <= 3){
											outputString = outputString + tempDate[j];
										}else{
											return outputString;
										}
									}else{
										if(parseInt(date.charAt(0)) == 0){
											if(!isNaN(date.charAt(1)) && parseInt(date.charAt(1)) >=1 && parseInt(date.charAt(1)) <= 9){
												if(target['inputFormatType'].toString().toLowerCase() == "yyyy/mm/dd" || target['inputFormatType'].toString().toLowerCase() == "yyyy-mm-dd"){
													outputString = outputString + tempDate[j];
												}else{
													outputString = outputString + tempDate[j] + " ";
												}
											}
										}else if(parseInt(date.charAt(0)) >= 1 && parseInt(date.charAt(0)) <= 2){
											if(!isNaN(date.charAt(1)) && parseInt(date.charAt(1)) >= 0 && parseInt(date.charAt(1)) <= 9){
												if(target['inputFormatType'].toString().toLowerCase() == "yyyy/mm/dd" || target['inputFormatType'].toString().toLowerCase() == "yyyy-mm-dd"){
													outputString = outputString + tempDate[j];
												}else{
													outputString = outputString + tempDate[j] + " ";
												}
											}
										}else if(parseInt(date.charAt(0)) == 3){
											if(!isNaN(date.charAt(1)) && parseInt(date.charAt(1)) >= 0 && parseInt(date.charAt(1)) <= 1){
												if(target['inputFormatType'].toString().toLowerCase() == "yyyy/mm/dd" || target['inputFormatType'].toString().toLowerCase() == "yyyy-mm-dd"){
													outputString = outputString + tempDate[j];
												}else{
													outputString = outputString + tempDate[j] + " ";
												}
											}
										}
									}
								}
								
							}else if(j==1){
								var time = tempDate[j].split(":");
								for(var k in time){
									if(k == 0){
										if(time[k].charAt(1) === ""){
											if(!isNaN(time[k]) && parseInt(time[k].charAt(0)) >=0 && parseInt(time[k].charAt(0)) <= 2){
												outputString = outputString + time[k];
											}else{
												return outputString;
											}
										}else{
											if(parseInt(time[k].charAt(0)) == 0){
												if(!isNaN(time[k].charAt(1)) && parseInt(time[k].charAt(1)) >=0 && parseInt(time[k].charAt(1)) <= 9){
													outputString = outputString + time[k] + ":";
												}
											}else if(parseInt(time[k].charAt(0)) == 1){
												if(!isNaN(time[k].charAt(1)) && parseInt(time[k].charAt(1)) >=0 && parseInt(time[k].charAt(1)) <= 9){
													outputString = outputString + time[k] + ":";
												}
											}else if(parseInt(time[k].charAt(0)) == 2){
												if(!isNaN(time[k].charAt(1)) && parseInt(time[k].charAt(1)) >=0 && parseInt(time[k].charAt(1)) <= 3){
													outputString = outputString + time[k] + ":";
												}
											}
										}
									}else if(k == 1){
										if(time[k].charAt(1) === ""){
											if(!isNaN(time[k]) && parseInt(time[k].charAt(0)) >=0 && parseInt(time[k].charAt(0)) <= 5){
												outputString = outputString + time[k];
											}else{
												return outputString;
											}
										}else{
											if(parseInt(time[k].charAt(0)) == 0){
												if(!isNaN(time[k].charAt(1)) && parseInt(time[k].charAt(1)) >=0 && parseInt(time[k].charAt(1)) <= 9){
													outputString = outputString + time[k] + ":";
												}
											}else if(parseInt(time[k].charAt(0)) >= 1 && parseInt(time[k].charAt(0)) <= 5){
												if(!isNaN(time[k].charAt(1)) && parseInt(time[k].charAt(1)) >=0 && parseInt(time[k].charAt(1)) <= 9){
													outputString = outputString + time[k] + ":";
												}
											}
										}
									}else if(k == 2){
										if(time[k].charAt(1) === ""){
											if(!isNaN(time[k]) && parseInt(time[k].charAt(0)) >=0 && parseInt(time[k].charAt(0)) <= 5){
												outputString = outputString + time[k];
											}else{
												return outputString;
											}
										}else{
											if(parseInt(time[k].charAt(0)) == 0){
												if(!isNaN(time[k].charAt(1)) && parseInt(time[k].charAt(1)) >=0 && parseInt(time[k].charAt(1)) <= 9){
													outputString = outputString + time[k].charAt(0) + "" + time[k].charAt(1);
												}
											}else if(parseInt(time[k].charAt(0)) >= 1 && parseInt(time[k].charAt(0)) <= 5){
												if(!isNaN(time[k].charAt(1)) && parseInt(time[k].charAt(1)) >=0 && parseInt(time[k].charAt(1)) <= 9){
													outputString = outputString + time[k].charAt(0) + "" + time[k].charAt(1);
												}
											}
										}
									}
									
								}
							
							}
						
						}
						
					}
					
				}
				return outputString;
			}
			}else if(isNaN(inputString)){
				return "";
			}else{
				return inputString;
			}
		},

		validateRegexInput : function(regexFormat){
			var restrictRegexp = regexFormat.replace(/@@/g,"");
			//var restrictVal = eval("$." + restrictRegexp);
            //return restrictVal;
			
			var restrictVal = eval("$.EXEC_" + restrictRegexp);
			if(restrictVal == null){
				restrictVal = eval("$." + restrictRegexp);
				return restrictVal;		
			}else{
				return restrictVal[0];
			}
		},
		
		validateCharacterInput : function(inputformat, inputchar){
			var numpattern = /[9*]/gi;
			//var datepattern = /(YYYY|MM|DD)/gi;
			//var timepattern = /(HH|MM|SS)/gi;
			var datetimepattern = /(YYYY|MM|DD|HH|MM|SS)/gi;
			
			var specialchars = "";
			var specialcharsArr = [];
			if(inputformat.match(datetimepattern) != null){
				specialchars = inputformat.replace(datetimepattern, '');
				//console.log("-- datetimepattern confirmed --------", inputformat, specialchars);
				
			}else if(inputformat.match(numpattern) != null){
				specialchars = inputformat.replace(numpattern, '');
				//console.log("------ numpattern confirmed --------", inputformat, specialchars);
				
			}else{
				console.log("------ not-supported pattern occured --------", inputformat);
			}
			
			specialcharsArr = specialchars.split('');
			var ischarallowed = (specialcharsArr.indexOf(inputchar) > -1) ? true : false;
			
			var charCode = inputchar.charCodeAt(0); //48-57
			if((charCode >= 48 && charCode <= 57) || ischarallowed)
				return true;
			else {
				console.log("Invalid character : ", inputchar);
				return false;
			}
		},
		
		// Below code set input value as per given format. Follow wiki: 
		// http://tokyodev.mobilous.com/redmine/projects/wpuimedia005/wiki/Input_formatting
		SetValueasInputFormat : function(inputformat, inputval){
			
			var datepattern = /(YYYY|MM|DD)/gi;
			var timepattern = /(HH|hh|mm|ss)/g;
			var datetimepattern = /(YYYY|MM|DD|HH|MM|SS)/gi;
			var numpattern = /[9*]/g;
			
			var specialchars = "";
			
			if(inputformat.match(timepattern) != null){
				specialchars = inputformat.replace(timepattern, '');
				inputval = $.setTimeFormat(inputval, inputformat, specialchars);
				
			}else if(inputformat.match(numpattern) != null){
				specialchars = inputformat.replace(numpattern, '');
				inputval = $.setNumberFormat(inputval, inputformat, specialchars);
			}
			
			return inputval;
		},
		
		validateDateInput : function(inputValue, inputFormat){
			var indexVal = {index : 0, specifier:""};
			$.validateDateFormat(inputValue, inputFormat, indexVal);
			return inputValue.toString().substr(0, indexVal['index']) + indexVal['specifier'];
		},
	
		////////////////////////////////////////////////
		//// Display Format
		///////////////////////////////////////////////

		changeFormat : function(target, inputValue){
			if(inputValue.length == 0)				
				return inputValue;
			
			var formatType = target['formatType'];
			switch(formatType){
				case "Number":
					return $.validate("ChangeNumberFormat",target, inputValue);
					break;
				case "DateTime":
					return $.validate("ChangeDateFormat",target, inputValue);
					break;
				default :
					return inputValue;
					break;
			}
		},
		
		ChangeNumberFormat : function(target, inputNumber){
			var numberFormatType = target['formatSubtype'].toLowerCase();
			switch(numberFormatType){
				case "double":
					return $.validate("ChangeDoubleFormat",target, inputNumber);
					break;
				case "integer":
					return $.validate("ChangeIntegerFormat",target, inputNumber);
					break;
				case "boolean":
					return $.validate("ChangeBooleanFormat",target, inputNumber);
					break;
				default :
					return inputNumber;
					break;
			}
		},
		
		ChangeDateFormat : function(target, inputDate){
			if(inputDate != undefined){
				inputDate = inputDate.toString();
			}
			
			var ua = navigator.userAgent.toLowerCase(); //Bug fix #8580 
			if (ua.indexOf('safari') != -1) { 
				if (ua.indexOf('chrome') > -1) {
				    // Chrome
				  } else {
					  inputDate = inputDate.replace(/-/g,"/");
				  }
			}
			
			var dateFormatType = target['formatSubtype'].toLowerCase();
			switch(dateFormatType){
				case "fulldaytime":
					return $.validate("convertToFullDayTime",inputDate);
					break;
				case "longdaytime":
					return $.validate("convertToLongDayTime",inputDate);
					break;
				case "middledaytime":
					return $.validate("convertToMiddleDayTime",inputDate);
					break;
				case "shortdaytime":
					return $.validate("convertToShortDayTime",inputDate);
					break;
				case "fullday":
					return $.validate("convertToFullDay",inputDate);
					break;
				case "longday":
					return $.validate("convertToLongDay",inputDate);
					break;
				case "middleday":
					return $.validate("convertToMiddleDay",inputDate);
					break;
				case "shortday":
					return $.validate("convertToShortDay",inputDate);
					break;
				case "fulltime":
					return $.validate("convertToFullTime",inputDate);
					break;
				case "longtime":
					return $.validate("convertToLongTime",inputDate);
					break;
				case "middletime":
					return $.validate("convertToMiddleTime",inputDate);
					break;
				case "shorttime":
					return $.validate("convertToShortTime",inputDate);
					break;
				case "custom":
				case "datetime":
					return $.validate("convertToCustomDateTime",target, inputDate);
					break;
				case "":
					return inputDate;
					break;
				default :
					target['specifierType'] = target['formatSubtype']
					return $.validate("convertToCustomDateTime",target, inputDate);
				break;
			}
		},
		
		ChangeBooleanFormat : function(target, inputNumber){
			var format = target['specifierType'];
			var boolValue = false;
				inputNumber = inputNumber.toString();
			if(inputNumber.toLowerCase() == 'yes' || inputNumber.toLowerCase() == '1' || inputNumber.toLowerCase() == 'true'){
				boolValue = true;
			}else if(inputNumber.toLowerCase() == 'no' || inputNumber.toLowerCase() == '0' || inputNumber.toLowerCase() == 'false'){
				boolValue = false;
			}
			if(format === 'y'){	//yes or no
				return (boolValue) ? bool = "yes" : bool = "no";
			}else if(format === 'd'){ // 0 or 1
				return (boolValue) ? bool = "1" : bool = "0";
			}else if(format === 't'){ // true or false
				return (boolValue) ? bool = true : bool = false;
			}
		},
		
		ChangeDoubleFormat : function(target, inputNumber){
			var numberFormatType = target['specifierType'];
			switch(numberFormatType){
				case "f":
					if(target['formatSpecifier'] != ""){
						return $.validate("ConvertToCustomNumber",target['formatSpecifier'], inputNumber);
					}else{
						if(inputNumber.toString().indexOf(".") != -1){
							return parseFloat(Number(inputNumber));
						}else{
							return parseFloat(Number(inputNumber)).toFixed(2);
						}
					}
					break;
				case "e":
					return $.validate('convertToExponential', inputNumber);
					break;
				default :
					return inputNumber;
					break;
			}
		},
		
		ChangeIntegerFormat : function(target, inputNumber){
			var numberFormatType = target['specifierType'];
		/*	if(!isNaN(Number(inputNumber.toString().replace(/,/gi,"")).toFixed(0))){
				inputNumber = Number(inputNumber.toString().replace(/,/gi,"")).toFixed(0);
			}else{
				return "";
			}*/
			
			switch(numberFormatType){
				case "d":
					if(!isNaN(Number(inputNumber.toString().replace(/,/gi,"")).toFixed(0))){
						inputNumber = Number(inputNumber.toString().replace(/,/gi,"")).toFixed(0);
					}else{
						return "";
					}
					if(target['formatSpecifier'] != ""){
						return $.validate("ConvertToCustomNumber",target['formatSpecifier'], inputNumber);
					}else{
						return inputNumber;
					}
					break;
				case "b":
					return $.validate('convertToBinary', inputNumber);
					break;
				case "o":
					return $.validate('convertToOctet', inputNumber);
					break;
				case "x":
					return $.validate('convertToHexadecimal', inputNumber);
					break;
				default :
					return inputNumber;
					break;
			}
		},
		ConvertToCustomNumber : function(format, inputNumber){
			if(inputNumber === ""){
				return "";
			}
			var formatArr = format.split(''); 
			var type = formatArr[formatArr.length -1];
			
			if(type == "f"){
				formatArr.splice(formatArr.length -1,1);
				format = formatArr.join('');
				var formatFractionalPart =  format.split(".")[0];
				var inputFractionalPart = inputNumber.split(".")[0].split("");
				var formatDecimalPart =  format.split(".")[1];
				var inputDecimalPart = inputNumber.split(".")[1].split("");
				var outputNumberArray = [];
				outputNumberArray =  inputFractionalPart.slice();
				outputNumberArray[outputNumberArray.length] = ".";
				if(inputDecimalPart != undefined){
					if(inputDecimalPart.length > formatDecimalPart){
						inputDecimalPart = inputDecimalPart.splice(0,formatDecimalPart);
					}else if(inputDecimalPart.length < formatDecimalPart){
						var len = inputDecimalPart.length ;
						for(var i = 0; i < formatDecimalPart - len; i++){
							inputDecimalPart[len + i] = "0";
						}
					}
				}else{
					for(var i = 0; i < formatDecimalPart; i++){
						inputDecimalPart[i] = "0";
					}
				}
				if(inputFractionalPart.length + inputDecimalPart.length > formatFractionalPart){
					outputNumberArray = outputNumberArray.concat(inputDecimalPart);
				}else if(inputFractionalPart.length + inputDecimalPart.length < formatFractionalPart){
					outputNumberArray = outputNumberArray.concat(inputDecimalPart);
					for(var i = 0; i < formatFractionalPart -(inputFractionalPart.length + inputDecimalPart.length); i++){
						outputNumberArray.unshift("0");
					}
				}
				return outputNumberArray.join("");
			}
			else if(format.indexOf('0') !== -1)
			{
				if(inputNumber.toString() == undefined)
					return inputNumber;
				
				if(format.indexOf('.') !== -1){
					return inputNumber;
				}
				else{
					var displayNum = '';
					
					if(inputNumber.indexOf('.') !== -1)
						inputNumber = inputNumber.split(".")[0];
			
					var inputArr = inputNumber.split('');
					var inputLen = inputArr.length;
					var formatLen = format.toString().length;
					var diffLen = formatLen - inputLen;
					
					//handle comma-separated format
					if(format.indexOf(',') !== -1){
						if(diffLen > 0){
							var commacnt = 0;
							var formattoReplace = format.toString().substring(diffLen, formatLen);
							var formatReplaceArr = formattoReplace.split('');
							for(var i = 0; i < formatReplaceArr.length; i++){
								displayNum = displayNum.concat(inputArr[i]);
								if(formatReplaceArr[i] === ','){
									displayNum = displayNum.concat(',');
									commacnt++;
								}
							}
							var formatpart = format.toString().substring(0, diffLen-commacnt);
							return formatpart.concat(displayNum);
						}
						else{
							var formatWocommaLen = format.split(',').join('').length;
							var numberpartLen = inputLen-formatWocommaLen;
							var commacnt = 0;
							for(var i = 0; i < formatLen; i++){
								if(formatArr[i] === ','){
									displayNum = displayNum.concat(',');
									commacnt++;
								}
								else
									displayNum = displayNum.concat(inputArr[numberpartLen+i-commacnt]);
							}
							return inputNumber.substring(0, numberpartLen).concat(displayNum);
						}
					}
					else{
						if(diffLen > 0){
							format = format.toString().substring(0, diffLen);
							return format + inputNumber.toString();
						}
						else
							return inputNumber;
					}
				}
			}
			else{
				var formatDecimalPart = format.split(".")[1];
				var inputDecimalPart = inputNumber.split(".")[1];
				if(formatDecimalPart != undefined){
					if(inputDecimalPart != undefined){
						if(formatDecimalPart.length === inputDecimalPart.length){
						}else if(formatDecimalPart.length < inputDecimalPart.length){
							inputDecimalPart = inputDecimalPart.substring(0,formatDecimalPart.length);
						}else if(formatDecimalPart.length > inputDecimalPart.length){
							for(var i = inputDecimalPart.length; i < formatDecimalPart.length; i++){
								inputDecimalPart = inputDecimalPart + "0";
							}
						}
					}else if(inputDecimalPart == undefined){
						inputDecimalPart = "";
						for(var i = 0; i < formatDecimalPart.length; i++){
							inputDecimalPart = inputDecimalPart + "0";
						}
					}
				}else if(formatDecimalPart == undefined){
					inputDecimalPart = "";
				}
				
				var formatFractionalPartArray = format.split(".")[0].split("");
				var formattedInputNumber = inputNumber.split(".")[0];
				formattedInputNumber = formattedInputNumber.replace(/,/gi,"");
				var inputFractionalPartArray = formattedInputNumber.split("");
				var outputNumberArray = [];
				/*console.log(inputFractionalPartArray);
				console.log(formatFractionalPartArray);
				if(inputFractionalPartArray.length <= formatFractionalPartArray.length){
					var formatFractionalPartLastIteratedIndex = formatFractionalPartArray.length -1;
					for(var i = inputFractionalPartArray.length-1; i >= 0; i-- ){
						if(formatFractionalPartArray[formatFractionalPartLastIteratedIndex] == ","){
							outputNumberArray.push(",");
							i++;
							
						}else{
							outputNumberArray.push(inputFractionalPartArray[i]);
						}
						formatFractionalPartLastIteratedIndex--;
						console.log(outputNumberArray);
					}
				}else if(inputFractionalPartArray.length > formatFractionalPartArray.length){
					var formatFractionalPartLastIteratedIndex = formatFractionalPartArray.length -1;
					for(var i = inputFractionalPartArray.length-1; i >= 0; i-- ){
						if(formatFractionalPartArray[formatFractionalPartLastIteratedIndex] == ","){
							outputNumberArray.push(",");
							i++;
						}else{
							outputNumberArray.push(inputFractionalPartArray[i]);
						}
						formatFractionalPartLastIteratedIndex--;
					}
				}
				*/
				
				/*if(inputFractionalPartArray.length > formatFractionalPartArray.length){
					for(var i = 0; i < formatFractionalPartArray.length; i++){
						if(formatFractionalPartArray[i] == ","){
							outputNumberArray.push(",");
						}else{
							outputNumberArray.push(inputFractionalPartArray[j]);
							
							j++;
						}
					}
					for(var i =j; i <  inputFractionalPartArray.length; i++){
						outputNumberArray.push(inputFractionalPartArray[j]);
					}
					return outputNumberArray.join("");	
				}else{
					for(var i = 0; i < inputFractionalPartArray.length; i++){
						if(formatFractionalPartArray[i] == ","){
							outputNumberArray.push(",");
						}else{
							outputNumberArray.push(inputFractionalPartArray[j]);
							
							j++;
						}
					}
					for(var i =j; i <  inputFractionalPartArray.length; i++){
						outputNumberArray.push(inputFractionalPartArray[j]);
					}
					return outputNumberArray.join("");	
				}*/
				var j = 0;
				var lastIteratedIndex = 0;
				outputNumberArray = formatFractionalPartArray.slice();
				for(i= 0; i < formatFractionalPartArray.length; i++){
					if(formatFractionalPartArray[i] === ','){
						continue;
					}else{
						if(inputFractionalPartArray[j] != undefined){
							outputNumberArray[i] = inputFractionalPartArray[j];
							lastIteratedIndex = i;
							j++;	
						}else{
							
							break;
						}
						
					}
				}
				if(inputFractionalPartArray.length > formatFractionalPartArray.length){
					for(var i = j; j < formatFractionalPartArray.length; j++){
						outputNumberArray.push(inputFractionalPartArray[j]);	
					}
					
				}else if(inputFractionalPartArray.length < formatFractionalPartArray.length){
					/*for(var i = j; j < formatFractionalPartArray.length; j++){
						formatFractionalPartArray.push(inputFractionalPartArray[j]);
					
					}*/
					outputNumberArray = outputNumberArray.splice(0,lastIteratedIndex+1);
				}
				
				var _output = outputNumberArray.join("");
				if(format.indexOf(',') !== -1){
					if(_output.indexOf(',') !== -1)
						_output = _output.replace(/,/g,"");
				}
				
				if(!isNaN(_output)){
					if(inputDecimalPart.length > 0)
						return outputNumberArray.join("") + "." + inputDecimalPart;
					else
						return outputNumberArray.join("");
				}else{
					return "";
				}
					
				/*if(inputDecimalPart != ""){
					return outputNumberArray.reverse().join("") + "." + inputDecimalPart;
				}else{
					return outputNumberArray.reverse().join("");
				}*/
			}
			
		},
		
		
		// Integer Formatting... //

		convertToBinary : function(inputNumber){
			if(isNaN(Number(inputNumber).toString())){
				return inputNumber;
			}else{
				inputNumber = Number(inputNumber).toFixed(0);
				//console.log(inputNumber, Number(inputNumber).toString(2), parseInt(inputNumber, 10).toString(2));
				return Number(inputNumber).toString(2);
			}
		},
		
		convertToOctet : function(inputNumber){
			if(isNaN(Number(inputNumber).toString())){
				return inputNumber;
			}else{
				inputNumber = Number(inputNumber).toFixed(0);
				return Number(inputNumber).toString(8);
			}			
		},
		
		convertToHexadecimal : function(inputNumber){
			if(isNaN(Number(inputNumber).toString())){
				return inputNumber;
			}else{
				inputNumber = Number(inputNumber).toFixed(0);
				return Number(inputNumber).toString(16);
			}
		},
		
		// Double Formatting .....//
		
		convertToExponential : function(inputNumber){
			var expNumber;
			expNumber = Number(inputNumber).toExponential();
			expNumber = expNumber.replace("+", "");
			return expNumber;
		},
		
		// Date Formatting..//
		convertToFullDayTime : function(inputDate){
			// Thursday,January 5,2012 7:08:09 PM Japan Standard Time
			var expDate;
			if(inputDate.toLowerCase().indexOf("am") == -1 || inputDate.toLowerCase().indexOf("pm") == -1){
				inputDate = $.validate("convertDateTo12HourFormat", inputDate);
			}
			inputDate = new Date(inputDate);
			if(inputDate != "Invalid Date"){
				expDate = day[inputDate.getDay()] + "," + month[inputDate.getMonth()] + " " + (inputDate.getDate().toString().length == 1 ? "0" + inputDate.getDate() : inputDate.getDate()) + "," + inputDate.getFullYear() + " " +(inputDate.getHours() > 12 ? (inputDate.getHours() - 12 ) : inputDate.getHours()) + ":" + (inputDate.getMinutes().toString().length == 1 ? "0" + inputDate.getMinutes() : inputDate.getMinutes()) + ":" + (inputDate.getSeconds().toString().length == 1 ? "0" + inputDate.getSeconds() : inputDate.getSeconds()) + " " + (inputDate.getHours() >= 12 ? "PM" : "AM") + " " +  inputDate.toString().substring(inputDate.toString().indexOf("(") + 1, inputDate.toString().indexOf(")"));
				return expDate;
			}else{
				return "Error";
			}
			
		},
		
		convertToLongDayTime : function(inputDate){
			// January 5,2012 7:08:09 PM GMT+9:00
			var expDate;
			if(inputDate.toLowerCase().indexOf("am") == -1 || inputDate.toLowerCase().indexOf("pm") == -1){
				inputDate = $.validate("convertDateTo12HourFormat", inputDate);
			}
			try{
				inputDate = new Date(inputDate);
				if(!isNaN(inputDate.getDate()) ){
					expDate = month[inputDate.getMonth()] + " " + (inputDate.getDate().toString().length == 1 ? "0" + inputDate.getDate() : inputDate.getDate()) + "," + inputDate.getFullYear() + " " +(inputDate.getHours() > 12 ? (inputDate.getHours() - 12 ) : inputDate.getHours()) + ":" + (inputDate.getMinutes().toString().length == 1 ? "0" + inputDate.getMinutes() : inputDate.getMinutes()) + ":" + (inputDate.getSeconds().toString().length == 1 ? "0" + inputDate.getSeconds() : inputDate.getSeconds()) + " " + (inputDate.getHours() >= 12 ? "PM" : "AM") + " GMT" +  inputDate.toString().substring(inputDate.toString().indexOf("GMT")+3, inputDate.toString().indexOf("(")-1);
					return expDate;
				}else{
					return "Error";
				}
			}catch(e){
				return "Error";
			}
			
		},
		
		convertToMiddleDayTime : function(inputDate){
			// Jan 5,2012 7:08:09 PM
			var expDate;
			if(inputDate.toLowerCase().indexOf("am") == -1 || inputDate.toLowerCase().indexOf("pm") == -1){
				inputDate = $.validate("convertDateTo12HourFormat", inputDate);
			}
			try{
				inputDate = new Date(inputDate);
				if(!isNaN(inputDate.getDate()) ){
					expDate = month[inputDate.getMonth()].substring(0,3) + " " + (inputDate.getDate().toString().length == 1 ? "0" + inputDate.getDate() : inputDate.getDate()) + "," + inputDate.getFullYear() + " " +(inputDate.getHours() > 12 ? (inputDate.getHours() - 12 ) : inputDate.getHours()) + ":" + (inputDate.getMinutes().toString().length == 1 ? "0" + inputDate.getMinutes() : inputDate.getMinutes()) + ":" + (inputDate.getSeconds().toString().length == 1 ? "0" + inputDate.getSeconds() : inputDate.getSeconds()) + " " + (inputDate.getHours() >= 12 ? "PM" : "AM");
					return expDate;
				}else{
					return "Error";
				}
			}catch(e){
				return "Error";
			}
			
		},
		
		convertToShortDayTime : function(inputDate){
			// Jan 5,2012 7:08:09 PM
			var expDate;
			if(inputDate.toLowerCase().indexOf("am") == -1 || inputDate.toLowerCase().indexOf("pm") == -1){
				inputDate = $.validate("convertDateTo12HourFormat", inputDate);
			}
			try{
				inputDate = new Date(inputDate);
				if(!isNaN(inputDate.getDate()) ){
					expDate = inputDate.getDate() + "/" + (inputDate.getMonth() + 1) + "/" +inputDate.getFullYear().toString().substring(2,inputDate.getFullYear().toString().length) + " " +(inputDate.getHours() > 12 ? ((inputDate.getHours() - 12 ) < 10 ? "0" + (inputDate.getHours() - 12 ) : inputDate.getHours()): (inputDate.getHours()  < 10) ? "0" + inputDate.getHours() : inputDate.getHours()) + ":" + (inputDate.getMinutes().toString().length == 1 ? "0" + inputDate.getMinutes() : inputDate.getMinutes()) + " " + (inputDate.getHours() >= 12 ? "PM" : "AM");
					return expDate;
				}else{
					return "Error";
				}
			}catch(e){
				return "Error";
			}
			
		},
		
		convertToFullDay : function(inputDate){
			// Thursday,January 5,2012
			var expDate;
			try{
				if(inputDate.toLowerCase().indexOf("am") == -1 || inputDate.toLowerCase().indexOf("pm") == -1){
					inputDate = $.validate("convertDateTo12HourFormat", inputDate);
				}

				inputDate = new Date(inputDate);
				if(!isNaN(inputDate.getDate()) ){
					expDate = day[inputDate.getDay()] + "," + month[inputDate.getMonth()] + " " + (inputDate.getDate().toString().length == 1 ? "0" + inputDate.getDate() : inputDate.getDate()) + "," + inputDate.getFullYear();
					return expDate;
				}else{
					return "Error";
				}
			}catch(e){
				return "Error";
			}
		},
		
		convertToLongDay : function(inputDate){
			// January 5,2012
			var expDate;
			if(inputDate.toLowerCase().indexOf("am") == -1 || inputDate.toLowerCase().indexOf("pm") == -1){
				inputDate = $.validate("convertDateTo12HourFormat", inputDate);
			}
			try{
				inputDate = new Date(inputDate);
				if(!isNaN(inputDate.getDate()) ){
					var timeZone = "";//inputDate.toString().substring(inputDate.toString().indexOf("(") + 1, inputDate.toString().indexOf(")"));
					expDate = month[inputDate.getMonth()] + " " + (inputDate.getDate().toString().length == 1 ? "0" + inputDate.getDate() : inputDate.getDate()) + "," + inputDate.getFullYear() + " " + timeZone;
					return expDate;
				}else{
					return "Error";
				}
			}catch(e){
				return "Error";
			}
		},
		
		convertToMiddleDay : function(inputDate){
			// Jan 5,2012
			var expDate;
			if(inputDate.toLowerCase().indexOf("am") == -1 || inputDate.toLowerCase().indexOf("pm") == -1){
				inputDate = $.validate("convertDateTo12HourFormat", inputDate);
			}
			try{
				inputDate = new Date(inputDate);
				if(!isNaN(inputDate.getDate()) ){
					expDate = month[inputDate.getMonth()].substring(0,3) + " " + (inputDate.getDate().toString().length == 1 ? "0" + inputDate.getDate() : inputDate.getDate()) + "," + inputDate.getFullYear();
					return expDate;
				}else{
					return "Error";
				}
			}catch(e){
				return "Error";
			}
			
		},
		
		convertToShortDay : function(inputDate){
			// 1/5/12
			var expDate;
			if(inputDate.toLowerCase().indexOf("am") == -1 || inputDate.toLowerCase().indexOf("pm") == -1){
				inputDate = $.validate("convertDateTo12HourFormat", inputDate);
			}
			try{
				inputDate = new Date(inputDate);
				if(!isNaN(inputDate.getDate()) ){
					expDate = inputDate.getDate() + "/" + (inputDate.getMonth() + 1) + "/" +inputDate.getFullYear().toString().substring(2,inputDate.getFullYear().toString().length);
					return expDate;
				}else{
					return "Error";
				}
			}catch(e){
				return "Error";
			}
			
		},
		
		convertToFullTime : function(inputValue){
			// 7:08:09 PM Japan Standard Time
			var expDate;
			try{
				if(new Date(inputValue) != "Invalid Date"){
					if(inputValue.toLowerCase().indexOf("am") == -1 || inputValue.toLowerCase().indexOf("pm") == -1){
						inputValue = $.validate("convertDateTo12HourFormat", inputValue);
					}

					inputValue = new Date(inputValue);
					if(!isNaN(inputValue.getDate()) ){
						//expDate = (inputValue.getHours().toString().length == 1 ? "0" + inputValue.getHours() : inputValue.getHours()) + ":" + (inputValue.getMinutes().toString().length == 1 ? "0" + inputValue.getMinutes() : inputValue.getMinutes()) + ":" + (inputValue.getSeconds().toString().length == 1 ? "0" + inputValue.getSeconds() : inputValue.getSeconds()) + " " + (inputValue.getHours() >= 12 ? "PM" : "AM");
						expDate = (inputValue.getHours() > 12 ? (inputValue.getHours() - 12 ) : inputValue.getHours()) + ":" + (inputValue.getMinutes().toString().length == 1 ? "0" + inputValue.getMinutes() : inputValue.getMinutes()) + ":" + (inputValue.getSeconds().toString().length == 1 ? "0" + inputValue.getSeconds() : inputValue.getSeconds()) + " " + (inputValue.getHours() >= 12 ? "PM" : "AM") + " " +  inputValue.toString().substring(inputValue.toString().indexOf("(") + 1, inputValue.toString().indexOf(")"));
						return expDate;
					}else{
						return "Error";
					}
				}else{
					var inputValue = $.validateTime(inputValue);
					if(inputValue != "Invalid Time"){
						expDate = (inputValue['hh'].toString().length == 1 ? "0" + inputValue['hh'] : inputValue['hh']) + ":" + (inputValue['mm'].toString().length == 1 ? "0" + inputValue['mm'] : inputValue['mm']) + ":" + (inputValue['ss'].toString().length == 1 ? "0" + inputValue['ss'] : inputValue['ss']) + " " +(inputValue['hh'] <= 12 && inputValue['am/pm'] != '' ? inputValue['am/pm'] : "");
						return expDate;
					}else{
						return "Error";
					}

				}
			}catch(e){
				
			}

		},
		
		convertToLongTime : function(inputValue){
			// 7:08:09 PM GMT+9:00
			var expDate;
			try{
				if(new Date(inputValue) != "Invalid Date"){
					if(inputValue.toLowerCase().indexOf("am") == -1 || inputValue.toLowerCase().indexOf("pm") == -1){
						inputValue = $.validate("convertDateTo12HourFormat", inputValue);
					}
					inputValue = new Date(inputValue);
					if(!isNaN(inputValue.getDate()) ){
						var timeZone = inputValue.toString().substring(inputValue.toString().indexOf("(") + 1, inputValue.toString().indexOf(")"));
						//expDate = (inputValue.getHours().toString().length == 1 ? "0" + inputValue.getHours() : inputValue.getHours()) + ":" + (inputValue.getMinutes().toString().length == 1 ? "0" + inputValue.getMinutes() : inputValue.getMinutes()) + ":" + (inputValue.getSeconds().toString().length == 1 ? "0" + inputValue.getSeconds() : inputValue.getSeconds()) + " " + (inputValue.getHours() >= 12 ? "PM" : "AM") + " " + timeZone;
						expDate = (inputValue.getHours() > 12 ? (inputValue.getHours() - 12 ) : inputValue.getHours()) + ":" + (inputValue.getMinutes().toString().length == 1 ? "0" + inputValue.getMinutes() : inputValue.getMinutes()) + ":" + (inputValue.getSeconds().toString().length == 1 ? "0" + inputValue.getSeconds() : inputValue.getSeconds()) + " " + (inputValue.getHours() >= 12 ? "PM" : "AM") + " GMT" +  inputValue.toString().substring(inputValue.toString().indexOf("GMT")+3, inputValue.toString().indexOf("(")-1);
						return expDate;
					}else{
						return "Error";
					}
				}else{
					var inputValue = $.validateTime(inputValue);
					if(inputValue != "Invalid Time"){
						var date = new Date();
						var timeZone = date.toString().substring(date.toString().indexOf("(") + 1, date.toString().indexOf(")"));
						expDate = (inputValue['hh'].toString().length == 1 ? "0" + inputValue['hh'] : inputValue['hh']) + ":" + (inputValue['mm'].toString().length == 1 ? "0" + inputValue['mm'] : inputValue['mm']) + ":" + (inputValue['ss'].toString().length == 1 ? "0" + inputValue['ss'] : inputValue['ss']) + " " + (inputValue['hh'] <= 12 && inputValue['am/pm'] != '' ? inputValue['am/pm'] : "") + " " + timeZone;
						return expDate;
					}else{
						return "Error";
					}
				}
			}catch(e){
				return "Error";
			}
		},
		
		convertToMiddleTime : function(inputValue){
			// 7:08:09 PM
			var expDate;
			try{
				if(new Date(inputValue) != "Invalid Date"){
					if(inputValue.toLowerCase().indexOf("am") == -1 || inputValue.toLowerCase().indexOf("pm") == -1){
						inputValue = $.validate("convertDateTo12HourFormat", inputValue);
					}
					inputValue = new Date(inputValue);
					if(!isNaN(inputValue.getDate()) ){
						expDate = (inputValue.getHours() > 12 ? (inputValue.getHours() - 12 ) : inputValue.getHours()) + ":" + (inputValue.getMinutes().toString().length == 1 ? "0" + inputValue.getMinutes() : inputValue.getMinutes()) + ":" + (inputValue.getSeconds().toString().length == 1 ? "0" + inputValue.getSeconds() : inputValue.getSeconds()) + " " + (inputValue.getHours() >= 12 ? "PM" : "AM");
						return expDate;
					}else{
						return "Error";
					}
				}else{
					var inputValue = $.validateTime(inputValue);
					if(inputValue != "Invalid Time"){
						expDate = (inputValue['hh'].toString().length == 1 ? "0" + inputValue['hh']: inputValue['hh']) + ":" + (inputValue['mm'].toString().length == 1 ? "0" + inputValue['mm'] : inputValue['mm']) + ":" + (inputValue['ss'].toString().length == 1 ? "0" + inputValue['ss'] : inputValue['ss']) + " " + (inputValue['hh'] <= 12 && inputValue['am/pm'] != '' ? inputValue['am/pm'] : "");
						return expDate;
					}else{
						return "Error";
					}
				}
			}catch(e){
				return "Error";
			}
		},
		
		convertToShortTime : function(inputValue){
			//7:08 PM
			var expDate;
			try{
				if(new Date(inputValue) != "Invalid Date"){
					if(inputValue.toLowerCase().indexOf("am") == -1 || inputValue.toLowerCase().indexOf("pm") == -1){
						inputValue = $.validate("convertDateTo12HourFormat", inputValue);
					}
					inputValue = new Date(inputValue);
					if(!isNaN(inputValue.getDate()) ){
						expDate = (inputValue.getHours() > 12 ? (inputValue.getHours() - 12 ) : inputValue.getHours()) + ":" + (inputValue.getMinutes().toString().length == 1 ? "0" + inputValue.getMinutes() : inputValue.getMinutes()) + " " + (inputValue['hh'] >= 12 ? "PM" : "AM");
						return expDate;
					}else{
						return "Error";
					}
				}else{
					var inputValue = $.validateTime(inputValue);
					if(inputValue != "Invalid Time"){
						expDate = (inputValue['hh'].toString().length == 1 ? "0" + inputValue['hh'] : inputValue['hh']) + ":" + (inputValue['mm'].toString().length == 1 ? "0" + inputValue['mm'] : inputValue['mm']) + " " +(inputValue['hh'] <= 12 && inputValue['am/pm'] != '' ? inputValue['am/pm'] : "");
						return expDate;
					}else{
						return "Error";
					}
				}
			}catch(e){
				return "Error";
			}
		},
		
		convertDateTo12HourFormat : function(date){
			var d = new Date(date);
			var hh,m,s ;
			if(d != "Invalid Date"){
				hh = d.getHours();
				m = d.getMinutes();
				s = d.getSeconds();
			}else if(d.toString().indexOf(":") != -1){
				var time = d.toString().split(":");
				hh = time[0];
				m = time[1];
				s = time[2];
			}
			
			var dd = "AM";
			var h = hh;
			if (h >= 12) {
				h = hh-12;
				dd = "PM";
			}
			if (h == 0) {
				h = 12;
			}
			m = m != undefined && m<10?"0"+m:m;

			s = s != undefined && s<10?"0"+s:s;
			s= s != undefined ? "00" : s;
			/* if you want 2 digit hours:
			    h = h<10?"0"+h:h; */

			var pattern = new RegExp("0?"+hh+":"+m+":"+s);

			var replacement = h+":"+m +":" +s;
			/* if you want to add seconds
			    replacement += ":"+s;  */
			replacement += " "+dd;    

			return date.replace(pattern,replacement);
		},
		convertToCustomDateTime : function(target, inputDate){
			try{
				var ua = navigator.userAgent.toLowerCase(); //Bug fix #12864
				if (ua.indexOf('safari') != -1) { 
					if (ua.indexOf('chrome') > -1) {
					    // Chrome
					  } else {
						  inputDate = inputDate.replace(/-/g,"/");
					  }
				}
				var d = new Date(inputDate);
				var outputValue = target['formatSpecifier'];
				if(d == "Invalid Date"){
					return inputDate;

				}else{
					
//					var dateJson = {};
//					dateJson['yyyy'] = d.getFullYear();
//					dateJson['dd'] = d.getDate() >= 0 && d.getDate() <= 9 ? "0" + d.getDate().toString() : d.getDate();
//					dateJson['MM'] = d.getMonth() >= 0 && d.getMonth() < 9 ? "0" + parseInt(d.getMonth() + 1).toString() : d.getMonth() + 1;
//					dateJson['hh'] = d.getHours() >= 0 && d.getHours() <= 9 ? "0" + d.getHours().toString() : d.getHours();
//					dateJson['mm'] = d.getMinutes() >= 0 && d.getMinutes() <= 9 ? "0" + d.getMinutes().toString() : d.getMinutes();
//					dateJson['ss'] = d.getSeconds() >= 0 && d.getSeconds() <= 9 ? "0" + d.getSeconds().toString() : d.getSeconds();
//					dateJson['ee'] = d.getDay() >= 0 && d.getDay() <= 9 ? "0" + d.getDay().toString() : d.getDay();
//					dateJson['ZZ'] = d.toString().substring(d.toString().indexOf("(") + 1, d.toString().indexOf(")"));
//					$.each(dateJson, function(key, value){
//						outputValue = outputValue.toString().replace(key, value)
//					});
//					
//					dateJson = {};
//					dateJson['yy'] = d.getFullYear().toString().substring(2, 4);
//					dateJson['M'] = d.getMonth() + 1;
//					dateJson['h'] = d.getHours();
//					dateJson['m'] = d.getMinutes();
//					dateJson['s'] = d.getSeconds();
//					dateJson['e'] = d.getDay();
//					$.each(dateJson, function(key, value){
//						outputValue = outputValue.toString().replace(key, value)
//					});
//					
//					dateJson = {};
//					dateJson['EE'] = shortDay[d.getDay()];
//					dateJson['MMMM'] = month[d.getMonth()];
//					var onejan = new Date(d.getFullYear(), 0, 1);
//					var weekNumber = Math.ceil( (((d - onejan) / 86400000) + onejan.getDay() + 1) / 7 );
//					dateJson['ww'] = weekNumber >= 0 && weekNumber <= 9 ? "0" + weekNumber.toString() : weekNumber.toString();  
//
//					$.each(dateJson, function(key, value){
//						outputValue = outputValue.toString().replace(key, value)
//					});
//					
//					dateJson = {};
//					dateJson['E'] = shortDay[d.getDay()];
//					dateJson['w'] = weekNumber;
//					dateJson['MMM'] = shortMonth[d.getMonth()];
//					dateJson['Z'] = d.getTimezoneOffset();
//					$.each(dateJson, function(key, value){
//						outputValue = outputValue.toString().replace(key, value)
//					});
					
					if(outputValue.indexOf('MMMMM') > -1)
						return 'Invalid Format';
					else if((outputValue.match(new RegExp("y", "g")) || []).length == 1 || (outputValue.match(new RegExp("y", "g")) || []).length == 3 || (outputValue.match(new RegExp("y", "g")) || []).length > 4)
						return 'Invalid Format';
					else{
						var dateJson = {};
						if(outputValue.indexOf('a') > -1 || outputValue.indexOf('p') > -1 || outputValue.indexOf('A') > -1 || outputValue.indexOf('P') > -1)
							dateJson['hh'] = dateJson['HH'] = d.getHours() >= 0 && d.getHours() <= 9 ? "0" + d.getHours().toString() : (d.getHours() > 12 ? (d.getHours() - 12 ) : d.getHours());
						else
							dateJson['hh'] = dateJson['HH'] = d.getHours() >= 0 && d.getHours() <= 9 ? "0" + d.getHours().toString() : d.getHours();
						dateJson['h'] = dateJson['H'] = d.getHours();
						dateJson['mm'] = d.getMinutes() >= 0 && d.getMinutes() <= 9 ? "0" + d.getMinutes().toString() : d.getMinutes();
						dateJson['m'] = d.getMinutes();
						dateJson['ss'] = d.getSeconds() >= 0 && d.getSeconds() <= 9 ? "0" + d.getSeconds().toString() : d.getSeconds();
						dateJson['s'] = d.getSeconds();
						dateJson['a'] = dateJson['p'] = dateJson['A'] = dateJson['P'] = dateJson['am'] = dateJson['pm'] = dateJson['AM'] = dateJson['PM'] = d.getHours() >= 12 ? "pm" : "am";
						//dateJson['e'] = d.getDay();
						//dateJson['ee'] = d.getDay() >= 0 && d.getDay() <= 9 ? "0" + d.getDay().toString() : d.getDay();
						
						var onejan = new Date(d.getFullYear(), 0, 1);
						var weekNumber = Math.ceil( (((d - onejan) / 86400000) + onejan.getDay() + 1) / 7 );
						dateJson['ww'] = weekNumber >= 0 && weekNumber <= 9 ? "0" + weekNumber.toString() : weekNumber.toString();  
						dateJson['w'] = weekNumber;
						
						dateJson['yyyy'] = d.getFullYear();
						dateJson['yy'] = d.getFullYear().toString().substring(2, 4);
						dateJson['MMMM'] = month[d.getMonth()];
						dateJson['MMM'] = shortMonth[d.getMonth()];
						dateJson['MM'] = d.getMonth() >= 0 && d.getMonth() < 9 ? "0" + parseInt(d.getMonth() + 1).toString() : d.getMonth() + 1;
						dateJson['M'] = d.getMonth() + 1;
						dateJson['dd'] = d.getDate() >= 0 && d.getDate() <= 9 ? "0" + d.getDate().toString() : d.getDate();
						dateJson['d'] = d.getDate();
						
						dateJson['ZZ'] = dateJson['zz'] = d.toString().substring(d.toString().indexOf("GMT")+3, d.toString().indexOf("(")-1);	//d.toString().substring(d.toString().indexOf("(") + 1, d.toString().indexOf(")"));
						dateJson['Z'] = dateJson['z'] = d.toString().substring(d.toString().indexOf("(") + 1, d.toString().indexOf(")")).replace(/[a-z ]/g,"");	//d.getTimezoneOffset();
						
						dateJson['EEEE'] = day[d.getDay()];
						dateJson['EEE'] = shortDay[d.getDay()];
						dateJson['EE'] = shortDay[d.getDay()];
						dateJson['E'] = shortDay[d.getDay()];
						
						$.each(dateJson, function(key, value){
//							alert(key+"-dateJson-"+value);
//							alert("new");
							outputValue = outputValue.toString().replace(key, value);
						});
						
					}
				}
			}catch(e){
				return inputDate;
			}
			return outputValue;
		}
	};
	
	$.validateTime = function(inputValue){
		var hours;
		var minutes;
		var seconds;
		inputValue = inputValue.toString().toLowerCase()
		var timeArray = inputValue.split(":");
		if(!isNaN(timeArray[0])){
			if(inputValue.indexOf("am") != -1 || inputValue.indexOf("pm") != -1  ){
				hours =(timeArray[0] >= 0 && timeArray[0] <= 12)? timeArray[0].toString().length == 1 ? "0" + timeArray[0].toString() : timeArray[0]:"Invalid Time"
			}else{
				hours =(timeArray[0] >= 0 && timeArray[0] <= 23)? timeArray[0].toString().length == 1 ? "0" + timeArray[0].toString() : timeArray[0]:"Invalid Time"
			}
			if(hours == "Invalid Time"){
				return hours;
			}
		}else{
			return "Invalid Time";
		}

		if(timeArray.length == 2){
			var time = timeArray[1].split(" ");
			if(!isNaN(time[0])){
				minutes = (time[0] >= 0 && time[0] <= 59)? time[0].toString().length == 1 ? "0" + time[0].toString() : time[0]:"Invalid Time"
					if(minutes == "Invalid Time"){
						return minutes;
					}
			}else{
				return "Invalid Time";
			}  
		}else if(timeArray.length == 3){

			var time = timeArray[2].split(" ");
			if(!isNaN(timeArray[1])){
				minutes = (timeArray[1] >= 0 && timeArray[1] <= 59)?timeArray[1].toString().length == 1 ? "0" + timeArray[1].toString() : timeArray[1]: "Invalid Time"
					if(minutes == "Invalid Time"){
						return minutes;
					}
			}else{
				return "Invalid Time";
			}
			if(!isNaN(time[0])){
				seconds = (time[0] >= 0 && time[0] <=59)? time[0].toString().length == 1 ? "0" + time[0].toString() : time[0]:"Invalid Time"
					if(seconds == "Invalid Time"){
						return seconds;
					}
			}else{
				return "Invalid Time";
			}
		}else{
			return inputDateTime;
		}

		timeJSON = {};
		timeJSON['hh'] = hours == undefined? '0': hours;
		timeJSON['mm'] = minutes == undefined? '0':minutes;
		timeJSON['ss'] = seconds == undefined? '0':seconds;
		timeJSON['am/pm'] = time[1] == undefined? '': time[1].toUpperCase();
		//timeJSON['pm'] = time[1] == undefined? '':time[1] != "pm"? '':'PM';

		return timeJSON;
	}

	
	$.validateDateFormat = function(inputValue, formatValue, indexVal){
		if(formatValue.substr(0, 4).toLowerCase() === "yyyy"){
			if(inputValue.length > 4){
				if(!isNaN(inputValue.substr(0,4)) && parseInt(inputValue) >= 1000){
					indexVal['index'] = indexVal['index'] + 4;
					/*if($.isSpecifier(formatValue.substr(5,1)) && inputValue.length == 4){
						indexVal["specifier"] =formatValue.substr(5,1); 
					}else{*/
						$.validateDateFormat(inputValue.substr(4,inputValue.length), formatValue.substr(4,formatValue.length), indexVal);	
					//}
					
				}else{
 					if(isNaN(inputValue.substr(0,4)) && (inputValue.substr(3,1) == formatValue.substr(4,1))){
 						indexVal['index'] = parseInt(inputValue).toString().length;
 						indexVal["specifier"] = "";
 					}
 				}
			}else if(inputValue.length == 1 && parseInt(inputValue) == 0 ){
				// Do Nothing
			}else if(inputValue.length == 4 ){
				if(!isNaN(inputValue.substr(0,4))){
					indexVal['index'] = indexVal['index'] + 4;
					if($.isSpecifier(formatValue.substr(4,1))){
						indexVal["specifier"] =formatValue.substr(4,1); 
					}
				}
				
			}else if(isNaN(inputValue)){
				
			}else{
				indexVal['index'] = indexVal['index'] + inputValue.length;
			}
			
		}else if(formatValue.substr(0, 2) === "MM"){
			if(inputValue.length > 2){
				if(!isNaN(inputValue)){
					$.validateDateFormat(inputValue.substr(0,2), formatValue.substr(0,2), indexVal);
				}else{
					var subInputValue = inputValue.substr(0,2);
					if(!isNaN(inputValue.substr(0,2)) && parseInt(subInputValue) > 0 && parseInt(subInputValue) <= 12){
						indexVal['index'] = indexVal['index'] + 2;
						$.validateDateFormat(inputValue.substr(2,inputValue.length), formatValue.substr(2,formatValue.length), indexVal);
					}
				}
			}else if(inputValue.length == 2){
				if(!isNaN(inputValue.substr(0,2)) && parseInt(inputValue) > 0 && parseInt(inputValue) <= 12){
					indexVal['index'] = indexVal['index'] + 2;
					if($.isSpecifier(formatValue.substr(2,1))){
						indexVal["specifier"] =formatValue.substr(2,1); 
					}
				}else if(inputValue.length == 1){
					indexVal['index'] = indexVal['index'] + 1;
				}
				
			}else if(isNaN(inputValue)){
				
			}else if(parseInt(inputValue) < 0 || parseInt(inputValue) > 1){
				
			}else{
				indexVal['index'] = indexVal['index'] + inputValue.length;
			}
			
		}else if(formatValue.substr(0, 2).toLowerCase() === "dd"){
			if(inputValue.length > 2){
				if(!isNaN(inputValue.substr(0,2))){
					indexVal['index'] = indexVal['index'] + 2;
					$.validateDateFormat(inputValue.substr(2,inputValue.length), formatValue.substr(2,formatValue.length), indexVal);
				}
			}else if(inputValue.length == 2){
				if(!isNaN(inputValue.substr(0,2))  && parseInt(inputValue) > 0 && parseInt(inputValue) <= 31){
					indexVal['index'] = indexVal['index'] + 2;
					if($.isSpecifier(formatValue.substr(2,1))){
						indexVal["specifier"] =formatValue.substr(2,1); 
					}
				}else if(inputValue.length == 1){
					indexVal['index'] = indexVal['index'] + 1;
				}
				
			}else if(isNaN(inputValue)){
				// Do Nothing
			}else if(parseInt(inputValue) < 0 || parseInt(inputValue) > 3){
				// Do Nothing
			}else{
				indexVal['index'] = indexVal['index'] + inputValue.length;
			}
			
		}else if(formatValue.substr(0, 2) === "HH" || formatValue.substr(0, 2) === "hh"){
			if(inputValue.length > 2){
				if(!isNaN(inputValue.substr(0,2))){
					indexVal['index'] = indexVal['index'] + 2;
					$.validateDateFormat(inputValue.substr(2,inputValue.length), formatValue.substr(2,formatValue.length), indexVal);
				}
			}else if(inputValue.length == 2){
				if(!isNaN(inputValue.substr(0,2)) && parseInt(inputValue) > 0 && parseInt(inputValue) <= 23){
					indexVal['index'] = indexVal['index'] + 2;
					if($.isSpecifier(formatValue.substr(2,1))){
						indexVal["specifier"] =formatValue.substr(2,1); 
					}
				}else if(inputValue.length == 1){
					indexVal['index'] = indexVal['index'] + 1;
				}
				
			}else if(isNaN(inputValue)){
				// Do Nothing
			}else if(parseInt(inputValue) < 0 || parseInt(inputValue) > 2){
				// Do Nothing
			}else{
				indexVal['index'] = indexVal['index'] + inputValue.length;
			}
			
		}else if(formatValue.substr(0, 2) === "mm" || formatValue.substr(0, 2) === "ss"){
			if(inputValue.length > 2){
				if(!isNaN(inputValue.substr(0,2))){
					indexVal['index'] = indexVal['index'] + 2;
					$.validateDateFormat(inputValue.substr(2,inputValue.length), formatValue.substr(2,formatValue.length), indexVal);
				}
			}else if(inputValue.length == 2){
				if(!isNaN(inputValue.substr(0,2)) && parseInt(inputValue) > 0 && parseInt(inputValue) <= 59){
					indexVal['index'] = indexVal['index'] + 2;
					if($.isSpecifier(formatValue.substr(2,1))){
						indexVal["specifier"] =formatValue.substr(2,1); 
					}
				}else if(inputValue.length == 1){
					indexVal['index'] = indexVal['index'] + 1;
				}
				
			}else if(isNaN(inputValue)){
				// Do Nothing
			}else if(parseInt(inputValue) < 0 || parseInt(inputValue) > 5){
				// Do Nothing
			}else{
				indexVal['index'] = indexVal['index'] + inputValue.length;
			}
			
		}else if(formatValue.substr(0, 1) === "-" || formatValue.substr(0, 1) === " " || formatValue.substr(0, 1) === ":" || formatValue.substr(0, 1) === "/" || formatValue.substr(0, 1) === "." ){
			if(inputValue.length >= 1 && inputValue.substr(0,1) === formatValue.substr(0, 1)){
				indexVal['index'] = indexVal['index'] + 1;
				$.validateDateFormat(inputValue.substr(1,inputValue.length), formatValue.substr(1,formatValue.length), indexVal);
			}
			
		}else {
			if(inputValue.length <= formatValue.length){
				indexVal['index'] = indexVal['index'] + 1;
				if(inputValue.length != 0 && formatValue.length != 0 ){
					$.validateDateFormat(inputValue.substr(1,inputValue.length), formatValue.substr(1,formatValue.length), indexVal);				
				}
			}
			
		}
	},
	$.isSpecifier = function(inputChar){
		if(inputChar === "/" || inputChar === "-" || inputChar === ":" || inputChar === "." || inputChar === " "){
			return true;	
		}else{
			return false;
		}
		
	},
	
	$.validateInputFormat = function(inputValue, format){
		var outputValue = "";
		var j = 0;
		for(var i = 0; i < inputValue.length; i++){
			if(format[j] != undefined){
				if(format[j] == "z" && inputValue[i] >= String.fromCharCode(97) && inputValue[i] <= String.fromCharCode(122)){
					outputValue = outputValue + inputValue[i];
					j++;
				}else if(format[j] == "9" && inputValue[i] >= String.fromCharCode(48) && inputValue[i] <= String.fromCharCode(57)){
					outputValue = outputValue + inputValue[i];
					j++;
				}else if(format[j] == "Z" && inputValue[i] >= String.fromCharCode(65) && inputValue[i] <= String.fromCharCode(90)){
					outputValue = outputValue + inputValue[i];
					j++;
				}
			}else{
				break;
			}
		}
		return outputValue;
	}
	
	$.setTimeFormat = function(inputValue, format, specialchars){
		var outputValue = "";
		if(inputValue.length == 0)
			return outputValue;
		
		var specialcharsArr = specialchars.split('');
		var specialcharRegex = "";
		for (var i = 0; i < specialcharsArr.length; i++) {
			specialcharRegex += specialcharsArr[i] + "|";
		}
		if(specialcharRegex.length > 0){
			specialcharRegex = specialcharRegex.substr(0, specialcharRegex.length-1);
			specialcharRegex = "[" +specialcharRegex+ "]";
		}
		
		var formatArr = [];
		if(specialcharsArr.length > 0) {
			var pattern = new RegExp(specialcharRegex, "g");
			formatArr = format.split(pattern);			
		}else
			formatArr.push(format);
		
		var hourFormat = "";
		var minFormat = "";
		var secFormat = "";
		
		for (var j = 0; j < formatArr.length; j++) {
			if(formatArr[j].indexOf("h") > -1 || formatArr[j].indexOf("H") > -1)
				hourFormat = formatArr[j];
			else if(formatArr[j].indexOf("m") > -1)
				minFormat = formatArr[j];
			else if(formatArr[j].indexOf("s") > -1)
				secFormat = formatArr[j];
		}
		
		//console.log(formatArr.length, "**************", hourFormat, ":", minFormat, ".", secFormat);

		var hourInput = "";
		var minInput = "";
		var secInput = "";
		
//		if(inputValue.indexOf(":") > -1){
//		var inputArr = inputValue.split(":");
//		hourInput = inputArr[0];
//		minInput = inputArr[1].substr(0, minFormat.length);
//		
//		}else {
//			if(inputValue.length > 3){
//				hourInput = inputValue.substr(0, hourFormat.length);
//				minInput = inputValue.substr(2, minFormat.length);
//			}else {
//				hourInput = inputValue.substr(0, hourFormat.length);
//				minInput = inputValue.substr(2, minFormat.length);
//			}
//		}
//		console.log(inputValue, "**************", hourInput, ":", minInput);
		
		var formatterLength = formatArr.length;
		
		var pattern2 = new RegExp(specialcharRegex, "g");
		var inputArr2 = inputValue.split(pattern2, formatterLength);
		
		if(inputArr2.length == formatterLength){
			hourInput = inputArr2[0].substr(0, hourFormat.length);
			if(minFormat.length > 0)
				minInput = inputArr2[1].substr(0, minFormat.length);
			if(secFormat.length > 0)
				secInput = inputArr2[2].substr(0, secFormat.length);
			
		}else {
			if(inputArr2.length == 1){
				hourInput = inputArr2[0].substr(0, hourFormat.length);
				minInput = inputArr2[0].substr(hourFormat.length, minFormat.length);
				secInput = inputArr2[0].substr(hourFormat.length+minFormat.length, secFormat.length);
				
			}else if(inputArr2.length == 2){
				hourInput = inputArr2[0].substr(0, hourFormat.length);
				if(minFormat.length > 0)
					minInput = inputArr2[1].substr(0, minFormat.length);
				secInput = "";
				
			}
		}
		//console.log(inputArr2, "**************", hourInput, ":", minInput, ".", secInput);


		var hourOutput =  parseInt(hourInput);
		if(isNaN(hourOutput)){
			hourOutput = "0";
		}
		
		var minOutput = "";
		if(minInput.length == 0)
			minOutput = "00";
		else {
			if(minInput.length >=  minFormat.length){
				minOutput = minInput;
			}else {
				var lengthDiff = minFormat.length - minInput.length;
				for (var l = 0; l < lengthDiff; l++) {
					if(l == 0)
						minOutput = "0";
					else
						minOutput += "0";		
				}
				minOutput += minInput;
			}
		}
		
		outputValue = hourOutput + ":" + minOutput;
		
		if(secFormat.length > 0) {
			var secOutput = "";
			if(secInput.length == 0)
				secOutput = "00";
			else {
				if(secInput.length >=  secFormat.length){
					secOutput = secInput;
				}else {
					var lengthDiff2 = secFormat.length - secInput.length;
					for (var m = 0; m < lengthDiff2; m++) {
						if(m == 0)
							secOutput = "0";
						else
							secOutput += "0";		
					}
					secOutput += secInput;
				}
			}
			outputValue = outputValue + "." + secOutput;
		} 
					
		return outputValue;
	}
	
	$.setNumberFormat = function(inputValue, format, specialchars){
		var outputValue = "";
		if(inputValue.length == 0)
			return outputValue;
		
		var formatIntPart = (specialchars.length > 0) ? format.split(specialchars)[0] : format;
		var formatFraction = (specialchars.length > 0) ? format.split(specialchars)[1] : "";
		
		if(specialchars.length == 0){
			var intNumber = parseInt(inputValue);
			if(!isNaN(intNumber)){
				var strNumber = intNumber.toString();
				if(strNumber){
					if(strNumber.length <= format.length){
						//outputValue = inputValue;
						outputValue = intNumber + parseFloat(inputValue).toString().substr(strNumber.length);
					}else {
						outputValue = strNumber.substr(0, format.length) ;
					}
				}
				else
					outputValue = "";
			}else
				outputValue = "";
		}else {
			
			var arrInputVal = inputValue.split(specialchars,2);
			var inputIntPart = arrInputVal[0];
			var inputFraction = arrInputVal[1];
			
			if(formatIntPart.length > 0) {
				
				if(isNaN(parseInt(inputIntPart)))
					inputIntPart = 0;
				
				if(parseInt(inputIntPart).toString().length > formatIntPart.length)
					outputValue = parseInt(inputIntPart).toString().substr(0, formatIntPart.length);
				else{
					outputValue = parseInt(inputIntPart);
					if(inputFraction){
						if(inputFraction.length > formatFraction.length)
							outputValue += "."+ inputFraction.substr(0, formatFraction.length);
						else
							outputValue += "."+ inputFraction;
					}
				}
			}else {
				if(inputFraction){
					if(inputFraction.length > formatFraction.length)
						outputValue += "."+ inputFraction.substr(0, formatFraction.length);
					else
						outputValue += "."+ inputFraction;
				}
			}
			
		}
		
		return outputValue;
	}
	
	$.validate = function(method) {
		if (ValidationMethods[method]) {
			if (ValidationMethods.data == undefined) {
				ValidationMethods.init();
			};
			return ValidationMethods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method)
			return ValidationMethods.init.apply(this, arguments);
		else
			$.error('Method ' + method + ' does not exist on jQuery.Validation');
	};
	
	setup(jQuery);
})(jQuery);