(function($){
	
	function BaseView(baseviewdef){
		var baseview = {frame: $.attributes('frame',baseviewdef),
						font: $.attributes('font',baseviewdef),
						border: $.attributes('border',baseviewdef),
						padding: $.attributes('padding',baseviewdef),
						background: $.attributes('background',baseviewdef),flexibleHeight:baseviewdef['flexibleHeight']};
		
		baseview.getName = function(){
			return baseviewdef['name'];
		};
		
		baseview.getId = function(){
			return baseviewdef['id'];
		};
		
		baseview.getViewType = function(){
			return baseviewdef['viewtype'];
		};
		/*baseview.setFrame = function(frameData){  //SetFrame actions calls this method.
			console.log(baseviewdef);
			console.log(frameData);
			baseview.frame = $.attributes('frame',frameData)
			baseview.frame.applyCSS()
			//baseviewdef.applyOverrides();
		};
		baseview.getFrame = function(){
			return baseviewdef['frame'];
		};*/
		
		baseview.getRadioGroup = function(){
		    if(baseviewdef['groupName'])
		    	return baseviewdef['groupName'];
		    else
		    	return "";
		};
		
		return baseview;
	};
	
	function uiLabel(pagedef, childdef, data){
		var label = new BaseView(childdef);

		if($.utility('containsGlobalVariable', childdef['value'])){
			childdef['systemVariableValue'] = childdef['value'];
			childdef['isSystemVariable'] = true;
		}
		
		label.getTemplate = function(){
			return childdef['template'];
		};
		
		var value = childdef['value'];
		//this function is needed for all of the UI objects
		label.getHTML = function(){
			if(!$.utility("isReverseTransition")){
				if(childdef['value'] !== ''){
					childdef['value'] = $.utility('spaceInStringConversion',childdef['value']);
				}
				if(childdef['template'] !== ""){
					childdef['value']  = $.utility('tokenizeString', $.utility('extractDataFromRecord', data, childdef['template']), pagedef);
					if(childdef['template'].indexOf('[') != -1 && childdef['template'].indexOf(']') != -1 && childdef['value'] == childdef['template']){
						childdef['value'] = "";
					}
				}
				childdef['value'] = $.utility('convertSpecialCharacter', $.utility('tokenizeString', childdef['value']), pagedef);
				
			}else{
				if(childdef['template'] !== ""){
					if(childdef['template'].indexOf('[') === -1 && childdef['template'].indexOf(']') === -1){
						childdef['value'] = childdef['template'];
					}
				}
			}
			childdef['taborder'] = -1;
			return ["<p id ='"+childdef['id']+"_p' tabindex='",childdef['taborder'],"'> <label class='ui-label' id='",childdef['id'],"' name='",childdef['name'],"' >",childdef['value'],"</label></p>"].join('');
		};
		
		//this function is needed for all of the UI objects
		label.applyOverrides = function(){
			label['frame'].applyCSS();
			label['font'].applyCSS();
			
			var _borderWeight = 0;
			if(childdef['border'] && childdef['border']['borderweight'] != 0){
				_borderWeight = childdef['border']['borderweight'] * $.mobileweb.device['aspectHratio'];
				
				$('#'+childdef['id']+'_p').css({'border-style':'solid', 'margin':'0px'});
				$('#'+childdef['id']+'_p').css({'border-width': _borderWeight +"px"});
				$('#'+childdef['id']+'_p').css({'border-color':'rgba('+childdef['border']['bordercolor']['red']+','+childdef['border']['bordercolor']['green']+','+childdef['border']['bordercolor']['blue']+','+childdef['border']['bordercolor']['alpha']+')'});
			}
			if(childdef['background']){
				$('#'+childdef['id']+'_p').css({'background-color':$.attributes('color', childdef['background']).getColorCode()});
			}
			
			if(childdef['font']['color'])
				$('#'+childdef['id']).css('color',childdef['font']['color']);
			
			$('#'+childdef['id']+'_p').css({'position':'absolute', 'overflow':'hidden'});
			$('#'+childdef['id']+'_p').css({'margin':'auto'});
			$('#'+childdef['id']+'_p').css({'text-align':childdef['font']['align']});
			
			$('#'+childdef['id']+'_p').css({'height': (childdef['frame']['height']*$.mobileweb.device['aspectHratio']) - 2 * _borderWeight + 'px', 'width': (childdef['frame']['width']*$.mobileweb.device['aspectWratio']) - 2 * _borderWeight + 'px'});
			$('#'+childdef['id']+'_p').css({'line-height':(childdef['frame']['height']*$.mobileweb.device['aspectHratio']) - 2 * _borderWeight + 'px'});
			$('#'+childdef['id']+'_p').css({'top':childdef['frame']['y'] *$.mobileweb.device['aspectHratio']+'px', 'left': childdef['frame']['x']*$.mobileweb.device['aspectWratio']+'px'});
			
			if(childdef['padding'] != undefined){
				$('#'+childdef['id'] ).css({'padding-top': childdef['padding']['top']*$.mobileweb.device['aspectHratio'], 'padding-bottom': childdef['padding']['bottom']*$.mobileweb.device['aspectHratio']});
				$('#'+childdef['id'] ).css({'padding-left': childdef['padding']['left']*$.mobileweb.device['aspectWratio'],'padding-right': childdef['padding']['right']*$.mobileweb.device['aspectWratio']});
				$('#'+childdef['id'] ).css({'width':((childdef['frame']['width'] - (childdef['padding']['left'] + childdef['padding']['right']))*$.mobileweb.device['aspectWratio'])});// In ref of bug #12152, #12400
				$('#'+childdef['id'] ).css({'height':((childdef['frame']['height'] - (childdef['padding']['top'] + childdef['padding']['bottom']))*$.mobileweb.device['aspectHratio'])});
			}
			
			$('#'+childdef['id']).css({'position':''});
			$('#'+childdef['id']).css({'white-space': 'pre'});
			$('#'+childdef['id']).css({'text-decoration': childdef['textDecoration']});
			$('#'+childdef['id']+'_p > label').css({'line-height':'1'});
			$('#'+childdef['id']+'_p > label').css({'vertical-align': childdef['verticalalignment'] });
			
			if(childdef['verticalalignment'] != undefined){
				if (childdef['verticalalignment'] == "middle"){
	 				$('#'+childdef['id']).css({'position':'absolute'});
	 				$('#'+childdef['id']).css({'left':"0px"});
	 				
	 				var padbottom = childdef['padding']['bottom']*$.mobileweb.device['aspectHratio'];
	 				var padtop = childdef['padding']['top']*$.mobileweb.device['aspectHratio'];
	 				var hei = childdef['frame']['height']*$.mobileweb.device['aspectHratio'];
	 				var font = childdef['font']['size']*$.mobileweb.device['aspectHratio'];
	 				var diff = (hei - padtop - padbottom - font)/2;
	 				var top = 0;//diff;// + padtop;
	 				$('#'+childdef['id']+'_p > label').css({'top':top});
	 				$('#'+childdef['id']+'_p > label').css({'line-height':(hei - padtop - padbottom)+'px'});
	 			}else{
	 				$('#'+childdef['id']).css({'position':'absolute'});
	 				$('#'+childdef['id']).css({'left':"0px",'top':'0px'});
	 				if(childdef['verticalalignment'] == "bottom"){
		 				var _top = childdef['frame']['height']*$.mobileweb.device['aspectHratio'] - childdef['font']['size']*$.mobileweb.device['aspectHratio'];
		 				$('#'+childdef['id']).css({'left':"0px",'top':_top});
		 			}
	 			}
			}
			
			$('#'+childdef['id']+'_p').css({'filter':'progid:DXImageTransform.Microsoft.BasicImage(rotation='+childdef['frame']['rotation']+')',
				'-ms-transform':'rotate('+(parseInt(childdef['frame']['rotation']))+'deg)',
				'-ms-filter':'progid:DXImageTransform.Microsoft.BasicImage(rotation='+childdef['frame']['rotation']+')',
				'-moz-transform':'rotate('+(+parseInt(childdef['frame']['rotation']))+'deg)',
				'-o-transform':'rotate('+childdef['frame']['rotation'] +'deg)',
				'transform': 'rotate('+(parseInt(childdef['frame']['rotation']))+'deg)',
				'-webkit-transform':'rotate('+(parseInt(childdef['frame']['rotation']))+'deg)',
			});
			$('#'+childdef['id']).css({'transform':'none'});
			
			if(!$.utility("isReverseTransition")){
				if(childdef['template']!==''){
					var initialCSVArray=$.utility('getCombinedCSV');
					if(initialCSVArray.length!=0){
						$.each(initialCSVArray, function(i, csvElement){
							if(csvElement.csvResultHeader === childdef['template'].replace("[","").replace("]","")){
								label.setValue(csvElement.value);
							 }
							else
								label.setValue($.utility('tokenizeString', $.utility('extractDataFromRecord', data, childdef['template']), pagedef));
						});
					}
					else{
						if(childdef['value'] !== ''){
							childdef['value'] = $.utility('spaceInStringConversion',childdef['value']);
						}
						if(childdef['template'] !== ""){
							
							if(data != undefined && !$.isEmptyObject(data))//Bug #12964 fix
								childdef['value']  =$.utility('tokenizeString', $.utility('extractDataFromRecord', data, childdef['template']), pagedef);
							else if(childdef['template'].indexOf('[') != -1 && childdef['template'].indexOf(']') != -1 && childdef['value'] == childdef['template'])
								childdef['value'] = "";
							else
								childdef['value']  =$.utility('tokenizeString', childdef['template'], pagedef);
						}
						
						label.setValue(childdef['template'].indexOf('[') != -1 && childdef['template'].indexOf(']') != -1 && childdef['value'] == childdef['template'] ? "" : childdef['value']);
					}
				}else{
					if(childdef['isSystemVariable']){ // fix for 8532 -- look set

						childdef['value']  = $.utility('tokenizeString',childdef['systemVariableValue'], pagedef)
						childdef['value'] = $.utility('convertSpecialCharacter', childdef['value']);
						childdef['value'] = label.setCapitalization(childdef['value']);
						childdef['value'] = label.doTrim(childdef['value']);
						if(childdef['formatType'] != undefined && childdef['formatType'] != ""){
							childdef['value'] = $.validate('changeFormat',childdef,childdef['value']);
							$('#'+childdef['id']).text(childdef['value']);
						}else{
							childdef['value'] = childdef['value'];
							$('#'+childdef['id']).text(childdef['value']);
						}
						$('#'+childdef['id']).val(childdef['value']);
					}else{
						childdef['value'] = label.setCapitalization(childdef['value']);	// Bug #12401 fix
						$('#'+childdef['id']).val(childdef['value']);
						$('#'+childdef['id']).text(childdef['value']);
					}
				}	
				
				if(childdef['globalValue'] != undefined){
					if(childdef['globalValue'] == "__LAT__"){
						$('#__LAT__').on('onchange',function(){
							childdef['value'] = $.mobileweb["__LAT__"];
							$("#"+childdef['id']).text($.mobileweb["__LAT__"]);
						});
						$("#__LAT__").trigger("onchange");
						
					}else if(childdef['globalValue'] == "__LONG__"){
						$('#__LONG__').on('onchange',function(){
							childdef['value'] = $.mobileweb["__LONG__"];
							$("#"+childdef['id']).text($.mobileweb["__LONG__"]);
						});
						$("#__LONG__").trigger("onchange");
					}else if(childdef['globalValue'] == "__ADDRESS__"){
					    $('#__ADDRESS__').on('onchange',function(){
					        childdef['value'] = $.mobileweb["__ADDRESS__"];
					        $("#"+childdef['id']).text($.mobileweb["__ADDRESS__"]);
					    });
					    $("#__ADDRESS__").trigger("onchange");
					}else if(childdef['globalValue'] == "__COURSE__"){
					    $('#__COURSE__').on('onchange',function(){
					        childdef['value'] = $.mobileweb["__COURSE__"];
					        $("#"+childdef['id']).text($.mobileweb["__COURSE__"]);
					    });
					    $("#__COURSE__").trigger("onchange");
					}else if(childdef['globalValue'] == "__MAPZOOM__"){
					    $('#__MAPZOOM__').on('onchange',function(){
					        childdef['value'] = $.mobileweb["__MAPZOOM__"];
					        $("#"+childdef['id']).text($.mobileweb["__MAPZOOM__"]);
					    });
					    $("#__MAPZOOM__").trigger("onchange");
					}else if(childdef['globalValue'] == "__ROUTETIME__"){
					    $('#__ROUTETIME__').on('onchange',function(){
					        childdef['value'] = $.mobileweb["__ROUTETIME__"];
					        $("#"+childdef['id']).text($.mobileweb["__ROUTETIME__"]);
					    });
					    $("#__ROUTETIME__").trigger("onchange");
					}else if(childdef['globalValue'] == "__ROUTEDISTANCE__"){
					    $('#__ROUTEDISTANCE__').on('onchange',function(){
					        childdef['value'] = $.mobileweb["__ROUTEDISTANCE__"];
					        $("#"+childdef['id']).text($.mobileweb["__ROUTEDISTANCE__"]);
					    });
					    $("#__ROUTEDISTANCE__").trigger("onchange");
					}else if(childdef['globalValue'] == "__CENTERLAT__"){
						$('#__CENTERLAT__').on('onchange',function(){
							childdef['value'] = $.mobileweb["__CENTERLAT__"];
							$("#"+childdef['id']).text($.mobileweb["__CENTERLAT__"]);
						});
						$("#__CENTERLAT__").trigger("onchange");
						
					}else if(childdef['globalValue'] == "__CENTERLONG__"){
						$('#__CENTERLONG__').on('onchange',function(){
							childdef['value'] = $.mobileweb["__CENTERLONG__"];
							$("#"+childdef['id']).text($.mobileweb["__CENTERLONG__"]);
						});
						$("#__CENTERLONG__").trigger("onchange");
						
					}else if(childdef['globalValue'] == "__NUMREC__"){
						$('#__NUMREC__').on('onchange',function(){
							childdef['value'] = $.mobileweb["__NUMREC__"];
							$("#"+childdef['id']).text($.mobileweb["__NUMREC__"]);
						});
						$("#__NUMREC__").trigger("onchange");
					}else if(childdef['globalValue'] == "__NOW__"){
						var cd = new Date();
						$.mobileweb["__NOW__"] = $.utility('checkGlobalVariable',childdef['globalValue']);
						if($("body").find("#__NOW__").length == 0 ) {
							$('body').append("<input id='__NOW__' type='text' hidden='true'>"+ $.mobileweb["__NOW__"] +"</input>");
						}
						
						$('#__NOW__').on('onchange',function(){
							if(childdef['formatType'] != undefined && childdef['formatType'] != ""){
								childdef['value'] = $.validate('changeFormat',childdef,cd.toString());
								$("#"+childdef['id']).text($.validate('changeFormat',childdef,cd.toString()));
							}else{
								childdef['value'] = $.mobileweb["__NOW__"];
								$("#"+childdef['id']).text($.mobileweb["__NOW__"]);
							}
						});
						$("#__NOW__").trigger("onchange");
					}
				}else if(childdef['formatType'] != undefined && childdef['formatType'] != "" && childdef['template'] == ""){
					childdef['value'] = $.validate('changeFormat',childdef,childdef['value'] );
					$('#'+childdef['id']).text(childdef['value']);
				}
			}
			
			if(childdef['hidden'] == "true" || childdef['hidden'] == true){
				label.setVisibility(false);
			}
			
			if(childdef['textShadow'] === true){
				$('#'+childdef['id']).css({'text-shadow':'rgb(80, 78, 78) 3px 3px 5px'});
			}else{
				$('#'+childdef['id']).css({'text-shadow':'none'});
			}
			
			$('#'+childdef['id'] +"_p").bind("drag", function( event ) {
				//console.log("&&");
			});
			$('#'+childdef['id']).bind("drag", function( event ) {
				//console.log("&&");
			});
		};
		
		//this function is needed for all of the UI objects
		label.applyEvents = function(){
			$('#'+childdef['id'] + '_p').on('focus', function(){
				   $('#'+childdef['id'] + '_p').css({'outline':'none'});
			});
		};

		//this function is needed for all of the UI objects
		label.getValue = function(){
			return childdef['value'];
		};
		label.setValue = function(param){
			childdef['systemVariableValue'] = $('#'+childdef['id']).val();
			childdef['isSystemVariable'] = false;
			param = $.utility('convertSpecialCharacter', param);
			param = label.setCapitalization(param);
			param = label.doTrim(param);
			if(childdef['formatType'] != undefined && childdef['formatType'] != ""){
				childdef['value'] = $.validate('changeFormat',childdef,param);
				$('#'+childdef['id']).text(childdef['value']);
			}else{
				childdef['value'] = param;
				$('#'+childdef['id']).text(param);
			}
		};
		
		label.setCapitalization = function(param){
			if(childdef['autoCapitalization'] != undefined && childdef['autoCapitalization'] != "None"){
				switch(childdef['autoCapitalization']){
					case 'AllCharacters':
						param = param.toUpperCase();
						break;
					case 'Sentences':
						var rg = /(^\s*\w{1}|\.\s*\w{1})/gi;
						param = param.toLowerCase();
						param = param.replace(rg, function(param) {
							return param.toUpperCase();
						});
						break;
					case 'Words':
						var rg = /(?:^|\s)\S/g;
						param = param.toLowerCase();
					    return param.replace(rg, function(param){
					    	return param.toUpperCase();
					    });
						break;
					default:
						break;
				}
			}
			
			return param;
		};

		label.doTrim = function(param){
			if(childdef['isTrim']){
				return $.trim(param);
			};
			return param;
		};
		
		label.setBackgroundColor = function(param){
			childdef['background'] = param;
		};
		
		label.getParentUIType = function(){
			return childdef['parentUI'];
		};
		
		label.getParentUIName = function(){
			return childdef['parentUIName'];
		};
		
		label.setVisibility = function(param){
			if(param === true){
				childdef['hidden'] = false;
				$('#'+childdef['id']+'_p').css({'visibility':'visible'});
				$('#'+label.getId()).css({'visibility':'visible'});
			}else{
				childdef['hidden'] = true;
				$('#'+childdef['id']+'_p').css({'visibility':'hidden'});
				$('#'+label.getId()).css({'visibility' : 'hidden'});
			}
		};
		
		return label;
	};
	
	function uiLinkLabel(pagedef, childdef, data){
		var linkLabel = new BaseView(childdef);

		linkLabel.getTemplate = function(){
			return childdef['template'];
		};
		
		//this function is needed for all of the UI objects
		linkLabel.getHTML = function(){
            if(!$.utility("isReverseTransition")){
            	if(childdef['value'] !== ''){
					childdef['value'] = $.utility('spaceInStringConversion',childdef['value']);
				}
				if(childdef['template'] !== ""){
					childdef['value']  =$.utility('tokenizeString', $.utility('extractDataFromRecord', data, childdef['template']), pagedef);
					if(childdef['template'].indexOf('[') != -1 && childdef['template'].indexOf(']') != -1 && childdef['value'] == childdef['template']){
						childdef['value'] = "";
					}
				}
				if(childdef['link'].indexOf('[') != -1 && childdef['link'].indexOf(']') != -1){
					childdef['link']  = $.utility('extractDataFromRecord', data, childdef['link']);
				}
				childdef['value'] = $.utility('convertSpecialCharacter', $.utility('tokenizeString', childdef['value']));
            }
			var target = "";
			if(childdef['option'] == 0){
				target = "target=_top";
				return ["<a id='",childdef['id']+"_a' href='",childdef['link'],"' ",target,"><p id ='"+childdef['id']+"_p' tabindex='",childdef['taborder'],"'> <label class='ui-label' id='",childdef['id'],"' name='",childdef['name'],"' >",childdef['value'],"</label></p></a>"].join('');
			}else if(childdef['option'] == 1){
				target = "target=_blank";
				return ["<a id='",childdef['id']+"_a' href='",childdef['link'],"' ",target,"><p id ='"+childdef['id']+"_p' tabindex='",childdef['taborder'],"'> <label class='ui-label' id='",childdef['id'],"' name='",childdef['name'],"' >",childdef['value'],"</label></p></a>"].join('');
			}else if(childdef['option'] == 2){
				return ["<a id='",childdef['id']+"_a' href='#' onclick=\"window.open('",childdef['link'],"', 'testWindow', 'width=500,height=500');\"><p id ='"+childdef['id']+"_p' tabindex='",childdef['taborder'],"'> <label class='ui-label' id='",childdef['id'],"' name='",childdef['name'],"' >",childdef['value'],"</label></p></a>"].join('');
			}else{
				target = "target=_blank";
				return ["<a id='",childdef['id']+"_a' href='",childdef['link'],"' ",target,"><p id ='"+childdef['id']+"_p' tabindex='",childdef['taborder'],"'> <label class='ui-label' id='",childdef['id'],"' name='",childdef['name'],"' >",childdef['value'],"</label></p></a>"].join('');
			}
			//return ["<a id='",childdef['id']+"_a' href='",childdef['link'],"' ",target,"><p id ='"+childdef['id']+"_p' tabindex='",childdef['taborder'],"'> <label class='ui-label' id='",childdef['id'],"' name='",childdef['name'],"' >",childdef['value'],"</label></p></a>"].join('');
		};
		
		//this function is needed for all of the UI objects
		linkLabel.applyOverrides = function(){
			linkLabel['frame'].applyCSS();
			linkLabel['font'].applyCSS();
			linkLabel['padding'].applyCSS();
			
			if(childdef['hidden']=="true"){
				$('#'+childdef['id']+'_a').css({'visibility':'hidden'});
			}
			var _borderWeight = 0;
			if(childdef['border']){
				_borderWeight = childdef['border']['borderweight'] * $.mobileweb.device['aspectHratio'];
				
				$('#'+childdef['id']+'_p').css({'border-style': 'solid'});
				$('#'+childdef['id']+'_p').css({'border-width': _borderWeight +"px"});
				$('#'+childdef['id']+'_p').css({'border-color':'rgba('+childdef['border']['bordercolor']['red']+','+childdef['border']['bordercolor']['green']+','+childdef['border']['bordercolor']['blue']+','+childdef['border']['bordercolor']['alpha']+')'});
				$('#'+childdef['id']+'_p').css({'margin':'0px'});
			}
			if(childdef['background']){
				$('#'+childdef['id']+'_p').css({'background-color':$.attributes('color', childdef['background']).getColorCode()});
			}
			
			$('#'+childdef['id']+'_p').css({'position':'absolute', 'cursor':'pointer', 'margin':'auto'});
			$('#'+childdef['id']+'_p').css({'text-align': childdef['font']['align']});
			$('#'+childdef['id']+'_p').css({'top': childdef['frame']['y'] *$.mobileweb.device['aspectHratio']+'px', 'left': childdef['frame']['x']*$.mobileweb.device['aspectWratio']+'px'});
			$('#'+childdef['id']+'_p').css({'height': (childdef['frame']['height']*$.mobileweb.device['aspectHratio'] - (2 * _borderWeight))+ 'px', 'width': (childdef['frame']['width']*$.mobileweb.device['aspectWratio'] - (2 * _borderWeight))+'px'});
			$('#'+childdef['id']+'_p').css({'line-height': (childdef['frame']['height']*$.mobileweb.device['aspectHratio'] - (2 * _borderWeight)) +'px'});
			
			$('#'+childdef['id']).css({'position':'initial', 'cursor':'pointer'});
			$('#'+childdef['id']).css({'line-height':'1'});
			$('#'+childdef['id']).css({'text-decoration': childdef['textDecoration']});
			$('#'+childdef['id']).css({'text-shadow':'rgba(255, 255, 255, 0) 0px 0px 0px'});
			$('#'+childdef['id']).css({'vertical-align': childdef['verticalalignment'] });
			
			$('#'+childdef['id']+'_p > label').css({'position': 'static'});//for IE11
			
			$('#'+childdef['id']+'_p').css({'filter':'progid:DXImageTransform.Microsoft.BasicImage(rotation='+childdef['frame']['rotation']+')',
 				'-ms-transform':'rotate('+(parseInt(childdef['frame']['rotation']))+'deg)',
 				'-ms-filter':'progid:DXImageTransform.Microsoft.BasicImage(rotation='+childdef['frame']['rotation']+')',
 				'-moz-transform':'rotate('+(+parseInt(childdef['frame']['rotation']))+'deg)',
 				'-o-transform':'rotate('+childdef['frame']['rotation'] +'deg)',
 				'transform': 'rotate('+(parseInt(childdef['frame']['rotation']))+'deg)',
 				'-webkit-transform':'rotate('+(parseInt(childdef['frame']['rotation']))+'deg)',
			});
			
			
			if(!$.utility("isReverseTransition")){
				if(childdef['template']!==''){
					var initialCSVArray=$.utility('getCombinedCSV');
					if(initialCSVArray.length!=0){
						$.each(initialCSVArray, function(i, csvElement){
							if(csvElement.csvResultHeader === childdef['template'].replace("[","").replace("]","")){
								linkLabel.setValue(csvElement.value);
							 }
							else
								linkLabel.setValue($.utility('extractDataFromRecord', data, childdef['template']));
						});
					}
					else{
						if(childdef['value'] !== ''){
							childdef['value'] = $.utility('spaceInStringConversion',childdef['value']);
						}
						if(childdef['template'] !== ""){
							childdef['value']  =$.utility('tokenizeString', $.utility('extractDataFromRecord', data, childdef['template']), pagedef);
							if(childdef['template'].indexOf('[') != -1 && childdef['template'].indexOf(']') != -1 && childdef['value'] == childdef['template']){
								childdef['value'] = "";
							}
						}
						linkLabel.setValue(childdef['template'].indexOf('[') != -1 && childdef['template'].indexOf(']') != -1 && childdef['value'] == childdef['template'] ? "" : childdef['value']);
					}
				}
				
				$('#'+childdef['id'] + ">p" ).css({'text-decoration': childdef['textDecoration']});
				if(childdef['globalValue'] != undefined){
					if(childdef['globalValue'] == "__LAT__"){
						$('#__LAT__').on('onchange',function(){
							childdef['value'] = $.mobileweb["__LAT__"];
							$('#'+childdef['id']+'_p > label').text($.mobileweb["__LAT__"]);
						});
						$("#__LAT__").trigger("onchange");
						
					}else if(childdef['globalValue'] == "__LONG__"){
						$('#__LONG__').on('onchange',function(){
							childdef['value'] = $.mobileweb["__LONG__"];
							$('#'+childdef['id']+'_p > label').text($.mobileweb["__LONG__"]);
						});
						$("#__LONG__").trigger("onchange");
					}else if(childdef['globalValue'] == "__ADDRESS__"){
					    $('#__ADDRESS__').on('onchange',function(){
					        childdef['value'] = $.mobileweb["__ADDRESS__"];
					        $("#"+childdef['id']).text($.mobileweb["__ADDRESS__"]);
					    });
					    $("#__ADDRESS__").trigger("onchange");
					}else if(childdef['globalValue'] == "__CENTERLAT__"){
						$('#__CENTERLAT__').on('onchange',function(){
							childdef['value'] = $.mobileweb["__CENTERLAT__"];
							$('#'+childdef['id']+'_p > label').text($.mobileweb["__CENTERLAT__"]);
						});
						$("#__CENTERLAT__").trigger("onchange");
					}else if(childdef['globalValue'] == "__CENTERLONG__"){
						$('#__CENTERLONG__').on('onchange',function(){
							childdef['value'] = $.mobileweb["__CENTERLONG__"];
							$('#'+childdef['id']+'_p > label').text($.mobileweb["__CENTERLONG__"]);
						});
						$("#__CENTERLONG__").trigger("onchange");
					}else if(childdef['globalValue'] == "__NUMREC__"){
						$('#__NUMREC__').on('onchange',function(){
							childdef['value'] = $.mobileweb["__NUMREC__"];
							$('#'+childdef['id']+'_p > label').text($.mobileweb["__NUMREC__"]);
						});
						$("#__NUMREC__").trigger("onchange");
					}else if(childdef['globalValue'] == "__NOW__"){
						var cd = new Date();
						$.mobileweb["__NOW__"] = $.utility('checkGlobalVariable',childdef['globalValue']);
						if($("body").find("#__NOW__").length == 0 ) {
							$('body').append("<input id='__NOW__' type='text' hidden='true'>"+ $.mobileweb["__NOW__"] +"</input>");
						}
						
						$('#__NOW__').on('onchange',function(){
							if(childdef['formatType'] != undefined && childdef['formatType'] != ""){
								childdef['value'] = $.validate('changeFormat',childdef,cd.toString());
								$('#'+childdef['id']+'_p > label').text($.validate('changeFormat',childdef,cd.toString()));
							}else{
								childdef['value'] = $.mobileweb["__NOW__"];
								$('#'+childdef['id']+'_p > label').text($.mobileweb["__NOW__"]);
							}
						});
						$("#__NOW__").trigger("onchange");
					}
				}else if(childdef['formatType'] != undefined && childdef['formatType'] != "" && childdef['template'] == ""){
					childdef['value'] = $.validate('changeFormat',childdef,childdef['value'] );
					$('#'+childdef['id']+'_p > label').text(childdef['value']);
				}
			}
			
			if(parseInt($('#'+childdef['id']+'_p > label').css('width')) > parseInt($('#'+childdef['id']+'_p').css('width'))){
				var _pwidth = parseInt($('#'+childdef['id']+'_p').css('width'));
				var _labelwidth = parseInt($('#'+childdef['id']+'_p > label').css('width')) - (parseInt($('#'+childdef['id']+'_p > label').css('padding-left')) + parseInt($('#'+childdef['id']+'_p > label').css('padding-right')))
				var _ratio = _labelwidth / _pwidth;
				var _fontSize = Math.floor(parseInt($('#'+childdef['id']+'_p > label').css('font-size')) /  _ratio);
				$('#'+childdef['id'] +'_p > label').css({'font-size': _fontSize + "px" });
				
				var ua = navigator.userAgent.toLowerCase(); 
				if (ua.indexOf('safari') != -1) { 
					if (ua.indexOf('chrome') > -1) {
					    //Chrome
					  } else {
						  $('#'+childdef['id'] +'_p > label').css({'font-size': (_fontSize-1) + "px" });
					  }
				}
			}
			
		};
		
		//this function is needed for all of the UI objects
		linkLabel.applyEvents = function(){
			
		};
		
		//this function is needed for all of the UI objects
		linkLabel.getValue = function(){
			return childdef['link'];
		};
		linkLabel.setValue = function(param){
			param = $.utility('convertSpecialCharacter', param);
			if(childdef['formatType'] != undefined && childdef['formatType'] != ""){
				childdef['value'] = $.validate('changeFormat',childdef,param);
				$('#'+childdef['id']+'_p > label').text(childdef['value']);
			}else{
				childdef['value'] = param;
				$('#'+childdef['id']+'_p > label').text(param);
			}
		};
		
		linkLabel.setVisibility = function(param){
			if(param === "false"){
				childdef['hidden'] = "false";
				$('#'+childdef['id']+'_a').css({'visibility':'visible'});
			}else{
				childdef['hidden'] = "true";
				$('#'+childdef['id']+'_a').css({'visibility':'hidden'});
			}
		};
		
		return linkLabel;
	};
	
	function uiCaptcha(pagedef, childdef, data){
		var cptch = new BaseView(childdef);
		
		cptch.getHTML = function(){
			var sitekey = "6LddTacZAAAAAGLJhxjr356WbguGK9jRdluz1sSE";	//$.utility('tokenizeString', $.utility('extractDataFromRecord', data, childdef['sitekey']), pagedef);
			return ["<div id='",childdef['id'],"' name='",childdef['name'],"' class='g-recaptcha' data-sitekey='",sitekey,"' />"].join('');
		};
		
		cptch.applyOverrides = function(){
			cptch['frame'].applyCSS();
			$('#'+childdef['id']).css({'display':'flex', 'align-items':'center', 'justify-content':'center'});
			
			childdef['value'] = "";
			
			var _captchaTries = 0;
			window.setTimeout(recaptchaOnload, 1000);
			function recaptchaOnload() {
			    _captchaTries++;
			    if (_captchaTries > 9)
			        return;
			    if ($('.g-recaptcha').length > 0) {
			        grecaptcha.render(childdef['id'], {
			            sitekey: '6LddTacZAAAAAGLJhxjr356WbguGK9jRdluz1sSE',
			            'callback': function(e) {
			                var response = grecaptcha.getResponse();
			                if(response.length > 0) {
			                	console.log('recaptcha success ...');
			                	childdef['value'] = response;//"captcha-success";			                	
			                }
			            },
			            'expired-callback' : function() {
			                childdef['value'] = "";
			            },
			            'error-callback' : function() {
			                console.log('recaptcha error ...');
			                childdef['value'] = "";
			            },
			        });
			        return;
			    }
			}

		};
		
		cptch.applyEvents = function(){
			
		};
		
		cptch.getValue = function(){
			return childdef['value'];
		};
		
		return cptch;
		
	};
		
	function uiImage(pagedef, childdef, data){
		var img = new BaseView(childdef);
		
		img.getHTML = function(){
			var src = "";
			if(!$.utility("isReverseTransition")){
				if(childdef['template'] !== ""){
					childdef['value']  =$.utility('tokenizeString', $.utility('extractDataFromRecord', data, childdef['template']), pagedef);
				}
				var defaultHeight = 30* $.mobileweb.device['aspectratio'];
				var defaultWidth = 30 * $.mobileweb.device['aspectratio'];
				
				if(childdef['source'] == "url"){
					src = $.utility('tokenizeString',childdef['value']).toString();
					if(src.match(/\/\/(?![\s\S]*\/\/)/) != null && src.match(/\/\/(?![\s\S]*\/\/)/).length > 1){
						src = src.replace(/\/\/(?![\s\S]*\/\/)/, "/");
					}
					childdef['src'] = src;
				}else if(childdef['source'] == "bundle"){
					src =$.utility('getImage',$.utility('tokenizeString',childdef['value']));
					childdef['src'] = src;
				}else if(childdef['source'] == "remoteFile"){
					src =$.utility('getRemoteImage',$.utility('tokenizeString',childdef['value']));
					childdef['src'] = src;
				}
			}
			
			if(childdef['source'] == "QRview")
				return ["<div id='",childdef['id'],"' name='",childdef['name'],"' height='",defaultHeight,"' width='",defaultWidth,"'/>"].join('');
			else{
				if(childdef['id'].indexOf('ui-more-2-') > -1){
					if(childdef['value'] == "")
						src = $.utility('getSystemImage','favicon.png',childdef['viewtype']);
					else{
						src = $.utility('getImage',$.utility('tokenizeString',childdef['value']));
						childdef['src'] = src;//Bug #12829 Fix
					}
					return ["<div id ='"+childdef['id']+"_divImg'><img id='",childdef['id'],"' name='",childdef['name'],"' src='",src,"' style='visibility:hidden' tabindex='",childdef['taborder'],"'/></div>"].join('');
				}else{
					childdef['taborder'] = -1;
					return ["<div id ='"+childdef['id']+"_divImg'><img id='",childdef['id'],"' name='",childdef['name'],"' src='",src,"' style='visibility:hidden' tabindex='",childdef['taborder'],"'/></div>"].join('');
				}				
			}
		};
			
		img.applyOverrides = function(){
			img['frame'].applyCSS();
			if(childdef['border']){
				$('#' +childdef['id']+'_divImg').css({'border-width':childdef['border']['borderweight'] +"px"});
				$('#' +childdef['id']+'_divImg').css({'border-color':'rgb('+childdef['border']['bordercolor']['red']+','+childdef['border']['bordercolor']['green']+','+childdef['border']['bordercolor']['blue']+')'});
				$('#' +childdef['id']+'_divImg').css({'border-style':'solid'});
				$('#' +childdef['id']+'_divImg').css({'height':((childdef['frame']['height']*$.mobileweb.device['aspectHratio'])-(childdef['border']['borderweight']*2))+'px', 'width':((childdef['frame']['width']*$.mobileweb.device['aspectWratio'])-(childdef['border']['borderweight']*2))+'px'});
				$('#' +childdef['id']+'_divImg').css({'left':$('#'+childdef['id']).css('left'), 'top': $('#'+childdef['id']).css('top')});
				$('#' +childdef['id']+'_divImg').css({'position':'absolute','overflow': 'hidden', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center'});
				
				$('#' +childdef['id']).css({'position':'initial', 'margin':'auto'});
				if(childdef['source'] != "QRview" && childdef['scalemode'] == "AspectFit"){
					$('#'+childdef['id']).css({'height':'', 'width':''});
					$('#'+childdef['id']).css({'max-height':((childdef['frame']['height']*$.mobileweb.device['aspectratio'])-(childdef['border']['borderweight']*2))+'px', 'max-width':((childdef['frame']['width']*$.mobileweb.device['aspectratio'])-(childdef['border']['borderweight']*2))+'px'});
				}
				else{
					$('#'+childdef['id']).css({'height':((childdef['frame']['height']*$.mobileweb.device['aspectHratio'])-(childdef['border']['borderweight']*2))+'px', 'width':((childdef['frame']['width']*$.mobileweb.device['aspectWratio'])-(childdef['border']['borderweight']*2))+'px'});
				}
			}
			
			if (parseInt(childdef['frame']['height']) <= 2){
				var _minH = parseInt(childdef['frame']['height']) + 'px';

				$('#' +childdef['id']+'_divImg').css({ 'height' : _minH });
				$('#' +childdef['id']).css({ 'height' : _minH });
			} 				
			
			
			if(!$.utility("isReverseTransition")){	 
				if(childdef['template']!==''){
					if(childdef['source'] == undefined || childdef['source'] == ""){
						var imageSource  =$.utility('tokenizeString', $.utility('extractDataFromRecord', data, childdef['template']), pagedef);
						if(imageSource.indexOf(".") != -1 && imageSource.indexOf("http") == -1){
							$('#'+childdef['id']).attr('src',$.utility('getImage',imageSource));
							childdef['src'] = $.utility('getImage',imageSource);
						}else if(imageSource.indexOf("http") != -1){
							$('#'+childdef['id']).attr('src',imageSource);
							childdef['src'] = imageSource;
						}else{
							$('#'+childdef['id']).attr('src',$.utility('getRemoteImage',imageSource));
							childdef['src'] = $.utility('getRemoteImage',imageSource);
						}
						
					}else{
						if(childdef['source'] == "url"){
							var tempURL =$.utility('tokenizeString', $.utility('extractDataFromRecord', data, childdef['template']), pagedef);
							tempURL = $.utility('tokenizeString',tempURL).toString()
							if(tempURL.indexOf("http") != -1){
								$('#'+childdef['id']).attr('src',tempURL);
								childdef['src'] = tempURL;
							}else{
								tempURL = tempURL.charAt(0) === '/' ? $.mobileweb['baseurl'] + tempURL : $.mobileweb['baseurl'] + "/" + tempURL;
								$('#'+childdef['id']).attr('src',tempURL);
								childdef['src'] = tempURL;
							}
						}else if(childdef['source'] == "remoteFile"){
							var _template = childdef['template'].replace("[","").replace("]","");
							if(data != undefined){
								if(data[_template] != undefined && data[_template] != "") //Bug #12811 fix
									childdef['src'] = $.utility('getRemoteImage',$.utility('extractDataFromRecord', data, childdef['template']));
								else{
									childdef['src'] = $.utility('tokenizeString',childdef['template'],pagedef);
									if(childdef['src'].indexOf("data:image") == -1)
										childdef['src'] =$.utility('getRemoteImage',$.utility('tokenizeString',childdef['template'],pagedef))
								}
								$('#'+childdef['id']).attr('src',childdef['src']);
							}
							else{//Bug #10496 fix
								childdef['src'] = $.utility('tokenizeString',childdef['template'],pagedef);
								if(childdef['src'].indexOf("data:image") == -1)
									childdef['src'] = $.utility('getRemoteImage',$.utility('tokenizeString',childdef['template'],pagedef));
								$('#'+childdef['id']).attr('src',childdef['src']);
							}
						}else if(childdef['source'] == "bundle"){
							var _template = childdef['template'].replace("[","").replace("]","");
							if(childdef['template'].indexOf(".png") != -1){
								_template = childdef['template'].replace("[","").replace("]","").replace(".png","");
							}
							
							if(data != undefined && data[_template] != undefined && data[_template] != ""){
								if(data[_template] != undefined && data[_template] != "")
									childdef['src'] = $.utility('getImage',$.utility('extractDataFromRecord', data, childdef['template']));
								else{
									childdef['src'] = $.utility('tokenizeString',childdef['template'],pagedef);
									if(childdef['src'].indexOf("data:image") == -1)
										childdef['src'] =$.utility('getImage',$.utility('tokenizeString',childdef['template'],pagedef))
								}
								$('#'+childdef['id']).attr('src',childdef['src'] );
							}
							else{//Bug #10496 fix
								childdef['src'] = $.utility('tokenizeString',childdef['template'],pagedef);
								if(childdef['src'].indexOf("data:image") == -1)
									childdef['src'] =$.utility('getImage',$.utility('tokenizeString',childdef['template'],pagedef))
								$('#'+childdef['id']).attr('src',childdef['src']);
							}
						}else{
							if(data != undefined){
								childdef['src'] = $.utility('extractDataFromRecord', data, childdef['template']);
	 							$('#'+childdef['id']).attr('src',childdef['src'] );
							}
							else{//Bug #10496 fix
								$('#'+childdef['id']).attr('src',$.utility('tokenizeString',childdef['template'],pagedef));
								childdef['src'] =$.utility('tokenizeString',childdef['template']);
							}
 						}
					}
				}else{
					if(childdef['source'] == "url"){
						src = $.utility('tokenizeString',childdef['value']).toString();
						if(src.match(/\/\/(?![\s\S]*\/\/)/) != null && src.match(/\/\/(?![\s\S]*\/\/)/).length > 1){
							src = src.replace(/\/\/(?![\s\S]*\/\/)/, "/");
						}
						childdef['src'] = src;
					}else if(childdef['source'] == "remoteFile"){
						src =$.utility('getRemoteImage',$.utility('tokenizeString',childdef['value'],pagedef));
						childdef['src'] = src;
					}else if(childdef['source'] == "bundle"){
						if(childdef['src'] == undefined){
							src =$.utility('getImage',$.utility('tokenizeString',childdef['value'],pagedef));
							childdef['src'] = src;
						}
						else if(childdef['src'].indexOf("data:image") == -1){
							src =$.utility('getImage',$.utility('tokenizeString',childdef['value'],pagedef));
							childdef['src'] = src;
						}
					}else{
						if(childdef['id'].indexOf('ui-more-2-') == -1){
							src = $.utility('extractDataFromRecord', data, childdef['value']);
 						    if(src)		childdef['src'] = src;
						}
 					}
				}
				
				if(childdef['source'] == "QRview"){
					$('#'+childdef['id']).css({'position':'absolute', 'overflow': 'hidden', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center'});
					$('#'+childdef['id']).css({'padding':'2px'});// Bug #12313 fix
					$('#'+childdef['id']).empty();
					
					var qrstr = $.utility('tokenizeString', $.utility('extractDataFromRecord', data, childdef['qrstring']), pagedef);
				    if(qrstr && qrstr != "null"){				    	
						var _wid = $('#'+childdef['id']).css('width').replace("px","");
						var _hei = $('#'+childdef['id']).css('height').replace("px","");
						var len = (parseInt(_wid) < parseInt(_hei)) ? _wid : _hei;
						$('#'+childdef['id']).qrcode({text:qrstr, width:len, height:len});
						$('#'+childdef['id'] + ' > canvas' ).css({'margin':'auto'});
						$('#'+childdef['id'] + ' > canvas' ).get(0).id = childdef['id'] + '_canvas';
				    }
//				    else{
//				    	$.errorhandler('alertBox','Empty/blank data is not supported to generate QR code.');
//				    }
				}
			}else{
				if(childdef['source'] == "bundle"){
					if(childdef['src'].indexOf("data:image") == -1 && childdef['value'].indexOf("resources/image") == -1){
						src =$.utility('getImage',$.utility('tokenizeString',childdef['value'],pagedef));
						childdef['src'] = src;
					}
				}
			}
			
			$('#'+childdef['id']).attr('src',childdef['src']);
			$('#'+childdef['id']).css("pointer-events","none");
			if(childdef['hidden'] == "true"){
				$('#'+childdef['id']).css({'visibility':'hidden'});
				$('#' +childdef['id']+'_divImg').css({'visibility':'hidden'});
			}else{
				$('#'+childdef['id']).css({'visibility':'visible'});
				$('#' +childdef['id']+'_divImg').css({'visibility':'visible'});
			}
			if(childdef['draggable']){
				$('#'+childdef['id']).addClass('ui-widget-content');
				$('#'+childdef['id']).draggable({
					  containment: "parent"
				});
			}
			if(childdef['id'].indexOf('ui-more-2-') > -1)
				$('#' +childdef['id']).css({'position': 'sticky'});
			else if(childdef['source'] != "QRview")// Bug #12611 fix
				$('#' +childdef['id']).css({'position': 'static'});//for IE11
			if(window.devicePixelRatio > 1)
				$('#' +childdef['id']+'_divImg').css({'overflow':'initial'});
			if(childdef['scalemode'] == "AspectFit")
				$('#' +childdef['id']+'_divImg').css({'display':'flex'});
		};
		
		img.applyEvents = function(){
			$('#'+childdef['id']).bind('dragstart',function(event){
				//console.log("-- image dragstrat --");
			});
			$('#'+childdef['id']).bind('drag',function(event){
				//console.log("-- image dragging --");
			});
			$('#'+childdef['id']).on("dragstop", function( event ) {
				//console.log("-- image dragstop --");
			});
			$('#'+childdef['id']).on("error", function() {
				//$('#'+childdef['id']).css({'display': 'none'});
				
				//var errorImg = $.utility('getSystemImage','invisible.png',childdef['viewtype']);
				//childdef['src'] = errorImg;
			});
		};
		
		//this function is needed for all of the UI objects
		img.getValue = function(){
			return childdef['src'];
		};
		img.setValue = function(param){
			childdef['value'] = param;
			childdef['src'] = param;
		};
		
		img.getSource = function(){
			return childdef['source'];
		};
		img.setSource = function(param){
			childdef['source'] = param;
		};
		
		// using for upload image action
		img.setImageName = function(param){
			childdef['value'] = param;
		};
		img.getImageName = function(){
			return childdef['value'];
		};

		img.getTemplate = function(){
			return childdef['template'];
		};
		
		img.setTemplate = function(param){
			childdef['template'] = param;
		};
		
		return img;
	};
		
	function uiTextField(pagedef, childdef, data){
		var textField =  new BaseView(childdef);
		
		if($.utility('containsGlobalVariable', childdef['value'])){
			childdef['systemVariableValue'] = childdef['value'];
			childdef['isSystemVariable'] = true;
		}
		
		textField.getTemplate = function(){
			return childdef['template'];
		};
		
		var isReadonly = (childdef['readonly'] == "true") ? "readonly" : "";
		var isDisabled = (childdef['readonly'] == "true") ? "disabled" : "";
		textField.getHTML = function(){
			if(!$.utility("isReverseTransition")){
				//if(childdef['value'])		childdef['value']=$.utility('spaceInStringConversion',childdef['value']);
				
				if(childdef['template'] !== ""){
					childdef['value']  = $.utility('tokenizeString', childdef['template'], pagedef);
					if(childdef['template'].indexOf('[') != -1 && childdef['template'].indexOf(']') != -1 && childdef['value'] == childdef['template']){
						childdef['value'] = "";
					}
				}
				childdef['value'] = $.utility('convertSpecialCharacter', $.utility('tokenizeString', childdef['value']));
			}
			return ["<input id='",childdef['id'],"' name='",childdef['name'], "' value='",childdef['value'] ,"'", isReadonly ," type='",childdef['secure'] === "true" ? "password":"text","'", isDisabled ," placeholder='",childdef['placeholder'],"' tabindex='",childdef['taborder'],"'/>"].join('');
		};
		
		textField.applyOverrides = function(){
			textField['frame'].applyCSS();
			textField['font'].applyCSS();
			textField['border'].applyCSS();
			textField['padding'].applyCSS();
			textField['background'].setColor();
			
			if(childdef['hidden'] == "true" || childdef['hidden'] == true){//Bug #12396 fix
				$('#'+childdef['id']).css({'visibility':'hidden'});
			}
			
			if(childdef['readonly'] == "true"){
				$('#'+childdef['id']).css({'z-index':'0'}); 
			}
			
			if(!isNaN(parseInt(childdef['taborder'])))
				$("#"+childdef['id']).attr('tabindex', parseInt(childdef['taborder'])+1 );
			
			var isMobile = (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Windows Phone/i.test(navigator.userAgent)) ? true : false;		
			if(isMobile){//Bug 9073 Fix
				if($('#'+childdef['id']).get(0) != undefined)
					$('#'+childdef['id']).get(0).type='password';
			}

			$('#'+childdef['id']).css({'border-radius':'0px','margin':'0px'});
			
			if (childdef['verticalalignment'] =='top'){
				$('#'+childdef['id']).css({'vertical-align':'top'});
				
				var hei = $('#'+childdef['id']).css('height');
				var fontsize = $('#'+childdef['id']).css('font-size');
				var padtop = childdef['padding']['top']*$.mobileweb.device['aspectHratio'];
				var padbottom = parseInt(hei)-parseInt(fontsize)-padtop;					
				
				$('#'+childdef['id']).css({'padding-top': padtop, 'padding-bottom': padbottom, 'padding-left': childdef['padding']['left']*$.mobileweb.device['aspectWratio'], 'padding-right': childdef['padding']['right']*$.mobileweb.device['aspectWratio']});
				
			}else if (childdef['verticalalignment'] =='bottom'){
				$('#'+childdef['id']).css({'vertical-align':'bottom'});
				
				var hei = $('#'+childdef['id']).css('height');
				var fontsize = $('#'+childdef['id']).css('font-size');
				var padbottom = childdef['padding']['bottom']*$.mobileweb.device['aspectHratio'];
				var padtop = parseInt(hei)-parseInt(fontsize)-padbottom;					
				
				$('#'+childdef['id']).css({'padding-top': padtop, 'padding-bottom': padbottom, 'padding-left': childdef['padding']['left']*$.mobileweb.device['aspectWratio'], 'padding-right': childdef['padding']['right']*$.mobileweb.device['aspectWratio']});
				
			}else{
				$('#'+childdef['id']).css({'vertical-align':"-100%"})
			}
			
			if (childdef['cornerRadius'] != undefined){
				$('#'+childdef['id']).css({'border-radius':childdef['cornerRadius'] + "px" });
			}
			
			if(childdef['readonly'] == "true" && (childdef['border']['borderweight'] == "0")) {
				$("#"+ childdef['id']).removeClass("ui-shadow-inset");
			}
			
			if(!$.utility("isReverseTransition")){
				if(childdef['template']!==''){
					var initialCSVArray=$.utility('getCombinedCSV');
					if(initialCSVArray.length!=0){
						$.each(initialCSVArray, function(i, csvElement){
							if(csvElement.csvResultHeader === childdef['template'].replace("[","").replace("]","")){
								textField.setValue(csvElement.value);
							}
							else
								textField.setValue(childdef['template'].indexOf('[') != -1 && childdef['template'].indexOf(']') != -1 && childdef['value'] == childdef['template'] ? "" : childdef['value']);
						});
					}
					else{

						if(data != undefined){
							textField.setValue($.utility('tokenizeString', $.utility('extractDataFromRecord', data, childdef['template']), pagedef));
						}else{
							textField.setValue(childdef['template'].indexOf('[') != -1 && childdef['template'].indexOf(']') != -1 && childdef['value'] == childdef['template'] ? "" : childdef['value']);
						}
					}
				}else{
					if(childdef['isSystemVariable']){ // fix for 8532 -- look set

						if(childdef['secure'] === undefined || childdef['secure'] === "false") 
							if($('#'+childdef['id']).get(0) != undefined)
								$('#'+childdef['id']).get(0).type='text';
						
						childdef['value']  = $.utility('tokenizeString',childdef['systemVariableValue'], pagedef)
						childdef['value'] = $.utility('convertSpecialCharacter', childdef['value']);
						childdef['value'] = textField.setCapitalization(childdef['value']);
						childdef['value'] = textField.doTrim(childdef['value']);
						if(childdef['formatType'] != undefined || childdef['formatType'] != ""){
							childdef['value'] = $.validate('changeFormat',childdef,childdef['value']);
							$('#'+childdef['id']).val(childdef['value']);
						}else{
							childdef['value'] = param;
							$('#'+childdef['id']).val(childdef['value']);
						}
					}else{
						textField.setValue($.utility('tokenizeString',childdef['value'], pagedef));
					}
				}
				if(childdef['globalValue'] != undefined){
					if(childdef['globalValue'] == "__LAT__"){
						$('#__LAT__').on('onchange',function(){
							childdef['value'] = $.mobileweb["__LAT__"];
							$("#"+childdef['id']).val($.mobileweb["__LAT__"]);
						});
						$("#__LAT__").trigger("onchange");
					}else if(childdef['globalValue'] == "__LONG__"){
						$('#__LONG__').on('onchange',function(){
							childdef['value'] = $.mobileweb["__LONG__"];
							$("#"+childdef['id']).val($.mobileweb["__LONG__"]);
						});
						$("#__LONG__").trigger("onchange");
					}else if(childdef['globalValue'] == "__ALT__"){
						$('#__ALT__').on('onchange',function(){
							childdef['value'] = $.mobileweb["__ALT__"];
							$("#"+childdef['id']).val($.mobileweb["__ALT__"]);
						});
						$("#__ALT__").trigger("onchange");
					}else if(childdef['globalValue'] == "__MAPZOOM__"){
						$('#__MAPZOOM__').on('onchange',function(){
							childdef['value'] = $.mobileweb["__MAPZOOM__"];
							$("#"+childdef['id']).val($.mobileweb["__MAPZOOM__"]);
						});
						$("#__MAPZOOM__").trigger("onchange");
					}else if(childdef['globalValue'] == "__ADDRESS__"){
					    $('#__ADDRESS__').on('onchange',function(){
					        childdef['value'] = $.mobileweb["__ADDRESS__"];
					        $("#"+childdef['id']).val($.mobileweb["__ADDRESS__"]);
					    });
					    $("#__ADDRESS__").trigger("onchange");
					}else if(childdef['globalValue'] == "__COURSE__"){
					    $('#__COURSE__').on('onchange',function(){
					        childdef['value'] = $.mobileweb["__COURSE__"];
					        $("#"+childdef['id']).val($.mobileweb["__COURSE__"]);
					    });
					    $("#__COURSE__").trigger("onchange");
					}else if(childdef['globalValue'] == "__ROUTETIME__"){
					    $('#__ROUTETIME__').on('onchange',function(){
					        childdef['value'] = $.mobileweb["__ROUTETIME__"];
					        $("#"+childdef['id']).val($.mobileweb["__ROUTETIME__"]);
					    });
					    $("#__ROUTETIME__").trigger("onchange");
					}else if(childdef['globalValue'] == "__ROUTEDISTANCE__"){
					    $('#__ROUTEDISTANCE__').on('onchange',function(){
					        childdef['value'] = $.mobileweb["__ROUTEDISTANCE__"];
					        $("#"+childdef['id']).val($.mobileweb["__ROUTEDISTANCE__"]);
					    });
					    $("#__ROUTEDISTANCE__").trigger("onchange");
					}else if(childdef['globalValue'] == "__CENTERLAT__"){
						$('#__CENTERLAT__').on('onchange',function(){
							childdef['value'] = $.mobileweb["__CENTERLAT__"];
							("#"+childdef['id']).text($.mobileweb["__CENTERLAT__"]);
						});
						$("#__CENTERLAT__").trigger("onchange");
					}else if(childdef['globalValue'] == "__CENTERLONG__"){
						$('#__CENTERLONG__').on('onchange',function(){
							childdef['value'] = $.mobileweb["__CENTERLONG__"];
							("#"+childdef['id']).text($.mobileweb["__CENTERLONG__"]);
						});
						$("#__CENTERLONG__").trigger("onchange");
					}else if(childdef['globalValue'] == "__NUMREC__"){
						$('#__NUMREC__').on('onchange',function(){
							childdef['value'] = $.mobileweb["__NUMREC__"];
							$("#"+childdef['id']).val($.mobileweb["__NUMREC__"]);
						});
						$("#__NUMREC__").trigger("onchange");
					}else if(childdef['globalValue'] == "__NOW__"){
						var cd = new Date();
						$.mobileweb["__NOW__"] = $.utility('checkGlobalVariable',childdef['globalValue']);
						
						if($("body").find("#__NOW__").length == 0 ) {
							$('body').append("<input id='__NOW__' type='text' hidden='true'>"+ $.mobileweb["__NOW__"] +"</input>");
						}
						$('#__NOW__').on('onchange',function(){
							if(childdef['formatType'] != undefined && childdef['formatType'] != ""){
								if(childdef['formatType'] == "DateTime")//Bug #12785 fix
									cd.setSeconds(0);
								childdef['value'] = $.validate('changeFormat',childdef,cd.toString());
								$("#"+childdef['id']).val($.validate('changeFormat',childdef,cd.toString()));
							}else{
								childdef['value'] = $.mobileweb["__NOW__"];
								$("#"+childdef['id']).val($.mobileweb["__NOW__"]);
							}
						});
						$("#__NOW__").trigger("onchange");
					}
				}
			}else{
				if(childdef['secure'] === undefined || childdef['secure'] === "false")//Bug fix 8580 
					if($('#'+childdef['id']).get(0) != undefined)
						$('#'+childdef['id']).get(0).type='text';
			}
			
			if(childdef['viewtype'] === "TextField"){
				var style = $('<style>input[id^='+childdef['id']+']::-webkit-input-placeholder{text-shadow:0px 1px 1px #FFFFFF;color:rgba('+childdef['font']['color']['red']+','+childdef['font']['color']['blue']+','+childdef['font']['color']['green']+',.5);}</style>');
				$('html > head').append(style);
			}
			
			if(childdef['keyboardType'] != undefined && childdef['keyboardType'] != "" && childdef['keyboardType'] != "Default"){
				if(childdef['keyboardType'] != "HW" && childdef['keyboardType'] != "Flic" && childdef['keyboardType'] != "Flick")
					$.utility("showCustomKeyboard",childdef['id'],childdef['keyboardType']);
			}
			
			var isInputFormat = false;
			if(childdef['inputFormatType'] != undefined && childdef['inputFormatType'] != ""){
				if(childdef['inputFormatType'].indexOf("9") != -1){
					isInputFormat = true;
				}
			}
			// set character limit
			if(childdef['charlimit']){
				if(parseInt(childdef['charlimit']) != -1) {
					if(!isInputFormat)
						$('#'+childdef['id']).attr('maxlength',childdef['charlimit']);
					//console.log(childdef['id'], ">> Input-format "+childdef['inputFormatType']+" have priority over char-limit: "+childdef['charlimit']);
				}
			}
			$('#'+childdef['id']).css({'opacity':'1'});
		};
		
		textField.applyEvents = function(){
			function delay(callback, ms) {
				var timer = 0;
				return function() {
					var context = this, args = arguments;
					clearTimeout(timer);
					timer = setTimeout(function () {
						callback.apply(context, args);
					}, ms || 0);
				};
			}
			
			//This is a default event that automatically updates the value on keypress
			$('#'+childdef['id']).on('keypress input',function(e){
				if(childdef['secure'] === undefined || childdef['secure'] === "false") 
					$('#'+childdef['id']).get(0).type='text';
				
				if(childdef['inputFormatType'].indexOf("@@") != -1 && childdef['inputFormatType'].indexOf("REGEXP_LIKE") != -1){
					var isKeyPressEvent = e.type == 'keypress';
					if(isKeyPressEvent){
						var key = e.keyCode || e.which;
						character = (e.key != undefined) ? e.key : String.fromCharCode(key);
					}else{
						character = e.originalEvent.data;
						if(e.originalEvent.inputType == "insertFromPaste")		//case of input from 'paste'
							character = $('#'+childdef['id']).val();
					}
					
		            if(character && character != "Enter"){
			            	if(character == "'" || character == "\\")		// handling single quotes(') & back slash (/)
			            		character = "\\" + character;
			            	
			            	var newcharacter = character;
			            	if(isKeyPressEvent){
			            		var start = this.selectionStart;
				            	var end = this.selectionEnd;
				            	newcharacter = childdef['value'].slice(0, start) + character + childdef['value'].slice(end);
			            	}
			            	var restrictVal = $.validate("validateRegexInput", childdef['inputFormatType'].replace("["+childdef['name']+"]", newcharacter));
			            	if(typeof(restrictVal) == "boolean"){
			            		if(!restrictVal){
			            			$('#'+childdef['id']).val(childdef['value']);
			            			return restrictVal;
			            		}
			            		return false;
			            	}else{
			            		if(restrictVal){
			            			$('#'+childdef['id']).val(restrictVal);
				            		if(isKeyPressEvent){
				            			childdef['value'] = restrictVal;
				            			this.selectionStart = start + character.length;
					            		this.selectionEnd = this.selectionStart;
				            		}
				            		return !isKeyPressEvent;
				            	}
			            	}
		            	//}
		            	 return false;
		            }else{
		            	if(!isKeyPressEvent){
		            		$('#'+childdef['id']).val(e.target.value);
		            		childdef['value'] = e.target.value;
		            	}
		            	return false;
		            }
				}else {
					if(e.keyCode != 8 && childdef['inputFormatType'] != undefined && childdef['inputFormatType'] != ""){
						var inputval = $('#'+childdef['id']).val();
						
						var numpattern = /[9*]/g;
							if(this.selectionStart == this.selectionEnd){
								if(inputval.length >= childdef['inputFormatType'].length)
									return false;
							}
					}					
				}
					
		    });
			
			var i =0;
			$('#'+childdef['id']).on('keyup', delay(function(e){
				if(e.keyCode < 37 || e.keyCode > 40){
					childdef['systemVariableValue'] = $('#'+childdef['id']).val();
					childdef['isSystemVariable'] = false;
					var start = this.selectionStart,
					end = this.selectionEnd;
					childdef['value'] = $('#'+childdef['id']).val();
					//textField.setValue(childdef['value']);
					childdef['value'] = textField.setCapitalization(childdef['value']);
					$('#'+childdef['id']).val(childdef['value']);
					
					var initialLength = childdef['value'].toString().length;
					if(e.keyCode != 8 && childdef['inputFormatType'] != undefined && childdef['inputFormatType'] != ""){ // for input-format.
						var pattern = /(YYYY|MM|DD|HH|MM|SS)/gi;
						if(childdef['inputFormatType'] != undefined && childdef['inputFormatType'] != "" && childdef['inputFormatType'].match(pattern) != null){
							childdef['value'] = $.validate("validateDateInput",$('#'+childdef['id']).val(), childdef['inputFormatType']);
							if($.utility('verifyFullDate',childdef['value']) == "invalid date") //Bug #10956 Fix
								childdef['value'] = "";
						}else{
							if(childdef['inputFormatType'].indexOf("@@") != -1 && childdef['inputFormatType'].indexOf("REGEXP_LIKE") != -1){

							}else
								childdef['value'] = $.validate("ChangeInputFormatType",childdef, $('#'+childdef['id']).val());
						}
						
						$('#'+childdef['id']).val(childdef['value']);
						childdef['value'] = textField.setCapitalization(childdef['value']);
						$('#'+childdef['id']).val(childdef['value']);
						
						if(initialLength < childdef['value'].toString().length){ // fix for #8655
							this.selectionStart = start+1,
							this.selectionEnd = end+1;
						}else{
							this.selectionStart = start,
							this.selectionEnd = end;
						}
						
					}else{
						if(i != 0){
							childdef['value'] = $('#'+childdef['id']).val();
							childdef['value'] = textField.setCapitalization(childdef['value']);
							$('#'+childdef['id']).val(childdef['value']);
							if(e.keyCode == 32){
								this.selectionStart = start,
								this.selectionEnd = end;
							}
							if(e.keyCode == 8){//Bug #9055 Fix
								this.selectionStart = start,
								this.selectionEnd = end;
							}
						}
					}
					i++;
					// check for Capitalization..
					if((data)&&(childdef['template']!=='')){
						$.utility('saveDataToRecord',data, childdef['template'], childdef['value']);
					}
				}
			}, 100));
			
			
			$('#'+childdef['id']).on('keyboardChange', function(e){
				console.log("keyboardChange",e.action);
				/*if(childdef['inputFormatType'] != undefined && childdef['inputFormatType'] != ""){ // for input-format.
//					var pattern = /(YYYY|MM|DD|HH|MM|SS)/gi;
//					if(childdef['inputFormatType'] != undefined && childdef['inputFormatType'] != "" && childdef['inputFormatType'].match(pattern) != null){
//						childdef['value'] = $.validate("validateDateInput",$('#'+childdef['id']).val(), childdef['inputFormatType']);
//					}else{
//						if(childdef['inputFormatType'].indexOf("@@") != -1 && childdef['inputFormatType'].indexOf("REGEXP_LIKE") != -1){
//
//						}else
//							childdef['value'] = $.validate("ChangeInputFormatType",childdef, $('#'+childdef['id']).val());
//					}
//					if($.utility('verifyFullDate',childdef['value']) == "invalid date")
//						childdef['value'] = "";
//					$('#'+childdef['id']).val(childdef['value']);
//					childdef['value'] = textField.setCapitalization(childdef['value']);
//					$('#'+childdef['id']).val(childdef['value']);
				}*/
			});
			
			
			$('#'+childdef['id']).on('focusout',function(){
				childdef['value'] = $('#'+childdef['id']).val();
				
				if(childdef['inputFormatType'] != undefined && childdef['inputFormatType'] != ""){
					if(childdef['inputFormatType'].indexOf("@@") != -1 && childdef['inputFormatType'].indexOf("REGEXP_LIKE") != -1){

					}else{
						if(childdef['value'].toString().length < childdef['inputFormatType'].toString().length){
							$('#'+childdef['id']).val('');
							childdef['value'] = '';	
							$("#"+childdef['id']).trigger("EditingEndError");
						}
						
//						childdef['value'] = $.validate("SetValueasInputFormat", childdef['inputFormatType'], childdef['value']);
//						$('#'+childdef['id']).val(childdef['value']);
					}
				}
				
			});

			if(childdef['voiceRecognizable']){
				$.utility("initSpeechAnalyser", childdef['id']);
				
				$('#'+childdef['id']).on('focus',function(){
					setTimeout(function(){
						$.utility("startSoundRecording", childdef['id']);
					},500);
				});
			}
			
			
			if(childdef['events']){
				
				if(childdef['events']['Keypress']){
					$('#'+childdef['id']).on("keyup", function(){
						setTimeout(function(){
							$.utility('setActionRunningStatus', true);
						    new $.actions(pagedef, textField, childdef['events']['Keypress'].slice()).execute(); 
						},200);	
					});
				}	
				
				if(childdef['events']['EditingStart']){
					$('#'+childdef['id']).bind('focusin',function(e){
						$.utility('setActionRunningStatus', true);
						new $.actions(pagedef, textField, childdef['events']['EditingStart'].slice()).execute();
					});
				}
				
				if(childdef['events']['EditingEnd']){
					$('#'+childdef['id']).on('focusout',function(){
						$.utility('setActionRunningStatus', true);
						new $.actions(pagedef, textField, childdef['events']['EditingEnd'].slice()).execute(); 
					
					});
				}
				
				if(childdef['events']['EditingEndError']){
					$('#'+childdef['id']).on('EditingEndError',function(){
						$.utility('setActionRunningStatus', true);
						new $.actions(pagedef, textField, childdef['events']['EditingEndError'].slice()).execute(); 
  					
					});
				}
				
				if(childdef['events']['VoiceRecognitionEnd']){
					$('#'+childdef['id']).on('VoiceRecognitionEnd',function(){
						$.utility('setActionRunningStatus', true);
						new $.actions(pagedef, textField, childdef['events']['VoiceRecognitionEnd'].slice()).execute(); 
					});
				}
			}
			
		};
		
		
		textField.setCapitalization = function(param){
			if(childdef['autoCapitalization'] != undefined && childdef['autoCapitalization'] != "None"){
				switch(childdef['autoCapitalization']){
					case 'AllCharacters':
						param = param.toUpperCase();
						break;
					case 'Sentences':
						var rg = /(^\s*\w{1}|\.\s*\w{1})/gi;
						param = param.toLowerCase();
						param = param.replace(rg, function(param) {
							return param.toUpperCase();
						});
						break;
					case 'Words':
						var rg = /(?:^|\s)\S/g;
						param = param.toLowerCase();
					    return param.replace(rg, function(param){
					    	return param.toUpperCase();
					    });
						break;
					default:
						break;
				}
			}
			return param;
		};

		textField.doTrim = function(param){
			if(childdef['isTrim']){
				return $.trim(param);
			};
			return param;
		};
		
		//this function is needed for all of the UI objects
		textField.setValue = function(param, setMV){
			
			if(childdef['secure'] === undefined || childdef['secure'] === "false") 
				if($('#'+childdef['id']).get(0) != undefined)
					$('#'+childdef['id']).get(0).type='text';
			
			childdef['systemVariableValue'] = childdef['value'];
			childdef['isSystemVariable'] = false;
			
			param = $.utility('convertSpecialCharacter', param);
			param = textField.setCapitalization(param);
			param = textField.doTrim(param);
			
			if(setMV){		// if we setValue via "S M V" action then only considering 'inputFormatType' validations. Dated : 28-Nov-2017
				if(childdef['inputFormatType'] != undefined && childdef['inputFormatType'] != ""){
					var pattern = /(YYYY|MM|DD|HH|MM|SS)/gi;
					if(childdef['inputFormatType'] != undefined && childdef['inputFormatType'] != "" && childdef['inputFormatType'].match(pattern) != null){
						param = $.validateInputFormat(param,childdef['inputFormatType'] );
						childdef["value"] = param;
					}
					else if(childdef['inputFormatType'].indexOf("@@") != -1 && childdef['inputFormatType'].indexOf("REGEXP_LIKE") != -1){
						param = $.validate("validateRegexInput", childdef['inputFormatType'].replace("["+childdef['name']+"]", param));
						childdef["value"] = param;
					}
					else{
						param = $.validateInputFormat(param,childdef['inputFormatType'] );
						childdef["value"] = param;
					}
				}
			}
			
			if(childdef['formatType'] != undefined && childdef['formatType'] != ""){
				param = $.validate('changeFormat',childdef,param);
				$('#'+childdef['id']).val(param);
				childdef['value'] = param;
			}else{
				childdef['value'] = param;
				$('#'+childdef['id']).val(param);
			}
		};
		
		//this function is needed for all of the UI objects
		textField.getValue = function(){
			return childdef['value'];
		};
		
		textField.setVisibility = function(param){
			if(param === true){
				childdef['hidden'] = false;
				$('#'+textField.getId()).css({'visibility':'visible'});
			}else{
				childdef['hidden'] = true;
				$('#'+textField.getId()).css({'visibility' : 'hidden'});
			}
		};
		
		textField.propagateReadOnly = function(param){
			//console.log(childdef['keyboardType'], "-----------readonly >>>", param);
			
			if(param == 'true'){
				textField.setKeyboardType(childdef['keyboardType']);
			}else{
				if(childdef['readonly'] == "true" && (childdef['border']['borderweight'] == "0")) {
					$("#"+ childdef['id']).removeClass("ui-shadow-inset");
				}
				if($("#"+ childdef['id']).data().keyboard != undefined)
					$("#"+ childdef['id']).data().keyboard.destroy();
			}			
		};
		
		textField.setKeyboardType = function(param){
			if(childdef['readonly'] === "false" || childdef['readonly'] === false)
			    $('#'+childdef['id']).attr('readonly',false);
			if(!$('#'+childdef['id']).prop('readonly')){
				
				childdef['keyboardType'] = param;
				$('#'+childdef['id']).data('keyboardType',param);
				
				if(param != undefined && param != "" && param != "Default" && param != "HW" && childdef['keyboardType'] != "Flic" && childdef['keyboardType'] != "Flick"){
					if($( "#" + childdef['id']).data().keyboard != undefined)
						$( "#" + childdef['id']).data().keyboard.destroy();
					$.utility("showCustomKeyboard",childdef['id'],param);
				}
				if(param == "Default" || param == "HW" || childdef['keyboardType'] == "Flic" || childdef['keyboardType'] == "Flick"){
					$( "#" + childdef['id'] + "_keyboard").remove();
					$('#'+childdef['id']).attr('readonly',false);
				}	
			}
			
		};
		
		textField.setSecure = function(param){
			childdef['secure'] = param;
			if($('#'+childdef['id']).get(0) != undefined){
				if(param == true || param == "true")
					$('#'+childdef['id']).get(0).type = 'password';
				else
					$('#'+childdef['id']).get(0).type = 'text';
			}
		};
		
		return textField;
		
	};
	
	function uiNumericField(pagedef, childdef, data){
		var numericField = new BaseView(childdef);
		
		if($.utility('containsGlobalVariable', childdef['value'])){
			childdef['systemVariableValue'] = childdef['value'];
			childdef['isSystemVariable'] = true;
		}

		numericField.getTemplate = function(){
			return childdef['template'];
		};
		
		var isReadonly = (childdef['readonly'] == "true") ? "readonly" : "";
		numericField.getHTML = function(){
			if(!$.utility("isReverseTransition")){
				if(childdef['template'] !== ""){
					childdef['value']  =$.utility('tokenizeString', $.utility('extractDataFromRecord', data, childdef['template']), pagedef);
					if(childdef['template'].indexOf('[') != -1 && childdef['template'].indexOf(']') != -1 && childdef['value'] == childdef['template'] ? "" : childdef['value']){
						childdef['value'] = "";
					}
				}
			}
			return ["<input  id='",childdef['id'],"' name='",childdef['name'],"' value='",childdef['value'],"'", isReadonly ," type='",childdef['secure'] === "true" ? "password":"text","' tabindex='",childdef['taborder'],"' placeholder='",childdef['placeholder'], "'>"].join('');
		};
  
		numericField.applyOverrides = function(){
			numericField['frame'].applyCSS();
			numericField['font'].applyCSS();
			numericField['border'].applyCSS();
			numericField['padding'].applyCSS();
			numericField['background'].setColor();
			
			if(childdef['keyboardType'] != undefined && childdef['keyboardType'] != "" && childdef['keyboardType'] != "Default"){
				if(childdef['keyboardType'] != "HW" && childdef['keyboardType'] != "Flic" && childdef['keyboardType'] != "Flick")
					$.utility("showCustomKeyboard",childdef['id'],childdef['keyboardType']);
			}
			
			if(childdef['hidden']=="true" || childdef['hidden']==true){
				$('#'+childdef['id']).css({'visibility':'hidden'});
			}
			
			if(!isNaN(parseInt(childdef['taborder'])))
				$("#"+childdef['id']).attr('tabindex', parseInt(childdef['taborder'])+1 );
			
			$('#'+childdef['id']).css({'border-radius':'0px','margin':'0px','min-height':23*$.mobileweb.device['aspectratio']});

 			if (childdef['verticalalignment'] =='top'){
 				$('#'+childdef['id']).css({'vertical-align':'top'});
 				
 				var hei = $('#'+childdef['id']).css('height');
 				var fontsize = $('#'+childdef['id']).css('font-size');
 				var padtop = childdef['padding']['top']*$.mobileweb.device['aspectHratio'];
 				var padbottom = parseInt(hei)-parseInt(fontsize)-padtop;					
 				
 				$('#'+childdef['id']).css({'padding-top': padtop, 'padding-bottom': padbottom, 'padding-left': childdef['padding']['left']*$.mobileweb.device['aspectWratio'], 'padding-right': childdef['padding']['right']*$.mobileweb.device['aspectWratio']});
 				
 			}else if (childdef['verticalalignment'] =='bottom'){
 				$('#'+childdef['id']).css({'vertical-align':'bottom'});
 				
 				var hei = $('#'+childdef['id']).css('height');
 				var fontsize = $('#'+childdef['id']).css('font-size');
 				var padbottom = childdef['padding']['bottom']*$.mobileweb.device['aspectHratio'];
 				var padtop = parseInt(hei)-parseInt(fontsize)-padbottom;					
 				
 				$('#'+childdef['id']).css({'padding-top': padtop, 'padding-bottom': padbottom, 'padding-left': childdef['padding']['left']*$.mobileweb.device['aspectWratio'], 'padding-right': childdef['padding']['right']*$.mobileweb.device['aspectWratio']});
 				
 			}else{
 				$('#'+childdef['id']).css({'vertical-align':"-100%"})
 			}
 			
 			if(childdef['readonly'] == "true" && (childdef['border']['borderweight'] == "0")) {
				$("#"+ childdef['id']).removeClass("ui-shadow-inset");
			}
 			
 			if (childdef['cornerRadius'] != undefined){
				$('#'+childdef['id']).css({'border-radius':childdef['cornerRadius'] + "px" });
			}
 			
			if(!$.utility("isReverseTransition")){
				if(childdef['template']!==''){
					var initialCSVArray=$.utility('getCombinedCSV');
					if(initialCSVArray.length!=0){
						$.each(initialCSVArray, function(i, csvElement){
							if(csvElement.csvResultHeader === childdef['template'].replace("[","").replace("]","")){
								numericField.setValue(csvElement.value);
							}
							else
								numericField.setValue(childdef['template'].indexOf('[') != -1 && childdef['template'].indexOf(']') != -1 && childdef['value'] == childdef['template'] ? "" : childdef['value'] ? "" : childdef['value']);
						});
					}
					else
						if(data != undefined){
							numericField.setValue($.utility('tokenizeString', $.utility('extractDataFromRecord', data, childdef['template']), pagedef));
						}else{
							numericField.setValue(childdef['template'].indexOf('[') != -1 && childdef['template'].indexOf(']') != -1 && childdef['value'] == childdef['template'] ? "" : childdef['value'] ? "" : childdef['value']);
						}
	
				}else{
					if(childdef['isSystemVariable']){ // fix for 8532 -- look set
						childdef['value']  = $.utility('tokenizeString',childdef['systemVariableValue'], pagedef);
						$('#'+childdef['id']).val(childdef['value']);//Bug #10868 Fix
					}else{
						numericField.setValue($.utility('tokenizeString',childdef['value'], pagedef));
					}
				}
	
				if(childdef['globalValue'] != undefined){
					if(childdef['globalValue'] == "__LAT__"){
						$('#__LAT__').on('onchange',function(){
							childdef['value'] = $.mobileweb["__LAT__"];
							$("#"+childdef['id']).val($.mobileweb["__LAT__"]);
						});
						$("#__LAT__").trigger("onchange");
					}else if(childdef['globalValue'] == "__LONG__"){
						$('#__LONG__').on('onchange',function(){
							childdef['value'] = $.mobileweb["__LONG__"];
							$("#"+childdef['id']).val($.mobileweb["__LONG__"]);
						});
						$("#__LONG__").trigger("onchange");
					}else if(childdef['globalValue'] == "__ALT__"){
						$('#__ALT__').on('onchange',function(){
							childdef['value'] = $.mobileweb["__ALT__"];
							$("#"+childdef['id']).val($.mobileweb["__ALT__"]);
						});
						$("#__ALT__").trigger("onchange");
					}else if(childdef['globalValue'] == "__MAPZOOM__"){
						$('#__MAPZOOM__').on('onchange',function(){
							childdef['value'] = $.mobileweb["__MAPZOOM__"];
							$("#"+childdef['id']).val($.mobileweb["__MAPZOOM__"]);
						});
						$("#__MAPZOOM__").trigger("onchange");
					}else if(childdef['globalValue'] == "__COURSE__"){
					    $('#__COURSE__').on('onchange',function(){
					        childdef['value'] = $.mobileweb["__COURSE__"];
					        $("#"+childdef['id']).val($.mobileweb["__COURSE__"]);
					    });
					    $("#__COURSE__").trigger("onchange");
					}else if(childdef['globalValue'] == "__CENTERLAT__"){
						$('#__CENTERLAT__').on('onchange',function(){
							childdef['value'] = $.mobileweb["__CENTERLAT__"];
							("#"+childdef['id']).text($.mobileweb["__CENTERLAT__"]);
						});
						$("#__CENTERLAT__").trigger("onchange");
					}else if(childdef['globalValue'] == "__CENTERLONG__"){
						$('#__CENTERLONG__').on('onchange',function(){
							childdef['value'] = $.mobileweb["__CENTERLONG__"];
							("#"+childdef['id']).text($.mobileweb["__CENTERLONG__"]);
						});
						$("#__CENTERLONG__").trigger("onchange");
					}else if(childdef['globalValue'] == "__NUMREC__"){
						$('#__NUMREC__').on('onchange',function(){
							childdef['value'] = $.mobileweb["__NUMREC__"];
							$("#"+childdef['id']).val($.mobileweb["__NUMREC__"]);
						});
						$("#__NUMREC__").trigger("onchange");
					}else if(childdef['globalValue'] == "__NOW__"){
						var cd = new Date();
						$.mobileweb["__NOW__"] = $.utility('checkGlobalVariable',childdef['globalValue']);
						if($("body").find("#__NOW__").length == 0 ) {
							$('body').append("<input id='__NOW__' type='text' hidden='true'>"+ $.mobileweb["__NOW__"] +"</input>");
						}
						
						$('#__NOW__').on('onchange',function(){
							if(childdef['formatType'] != undefined && childdef['formatType'] != ""){
								childdef['value'] = $.validate('changeFormat',childdef,cd.toString());
								$("#"+childdef['id']).text($.validate('changeFormat',childdef,cd.toString()));
								$("#"+childdef['id']).val($.validate('changeFormat',childdef,cd.toString()));//Bug #12198 fix
							}else{
								childdef['value'] = $.mobileweb["__NOW__"];
								$("#"+childdef['id']).text($.mobileweb["__NOW__"]);
								$("#"+childdef['id']).val($.mobileweb["__NOW__"]);
							}
						});
						$("#__NOW__").trigger("onchange");
					}
				}
			}
			
			var isInputFormat = false;
			if(childdef['inputFormatType'] != undefined && childdef['inputFormatType'] != ""){
				if(childdef['inputFormatType'].indexOf("9") != -1){
					isInputFormat = true;
				}
			}
			// set character limit
			if(childdef['charlimit']){
				if(parseInt(childdef['charlimit']) != -1) {
					if(!isInputFormat)
						$('#'+childdef['id']).attr('maxlength',childdef['charlimit']);
				}
			}
		};
		
		numericField.applyEvents = function(){
			
			//This is a default event that automatically updates the value on keypress
			//TODO: there is a bug that it fails to get the last character pressed.... find out how to fix it :: Fixed by Sachit kesri
			
			//To restrict input which violates given Regex. Add 'input' event to support Mobile browsers & pasting of text.
			$('#'+childdef['id']).on('keypress input',function(e){
				if(childdef['inputFormatType'].indexOf("@@") != -1 && childdef['inputFormatType'].indexOf("REGEXP_LIKE") != -1){
					var isKeyPressEvent = e.type == 'keypress';
					if(isKeyPressEvent){
						var key = e.keyCode || e.which;
						character = (e.key != undefined) ? e.key : String.fromCharCode(key);
					}else{
						character = e.originalEvent.data;
						if(e.originalEvent.inputType == "insertFromPaste")		//case of input from 'paste'
							character = $('#'+childdef['id']).val();
					}
		           
					if(character && character != "Enter"){
			            	if(character == "'" || character == "\\")		// handling single quotes(') & back slash (/)
			            		character = "\\" + character;
//			            	if(character == "/" || character == ":" || character == ",")		// handling single forward slash (/)
//			            		character = "\\" +"\\" + character;
			            	var newcharacter = character;
			            	if(isKeyPressEvent){
			            		var start = this.selectionStart;
				            	var end = this.selectionEnd;
				            	newcharacter = childdef['value'].slice(0, start) + character + childdef['value'].slice(end);
			            	}
			            	var restrictVal = $.validate("validateRegexInput", childdef['inputFormatType'].replace("["+childdef['name']+"]", newcharacter));
			            	if(typeof(restrictVal) == "boolean"){
			            		if(!restrictVal){
			            			$('#'+childdef['id']).val(childdef['value']);
			            			return restrictVal;
			            		}
			            		return false;
			            	}else{
			            		if(restrictVal){			            		
			            			$('#'+childdef['id']).val(restrictVal);
				            		if(isKeyPressEvent){
				            			childdef['value'] = restrictVal;
				            			this.selectionStart = start + character.length;
					            		this.selectionEnd = this.selectionStart;
				            		}
				            		return !isKeyPressEvent;
				            	}
			            	}
		            	 return false;
		            }else{
		            	return false;
		            }
				}else {
					
					// restriction to input un-supported characters
					// allowed inputs in numeric fields :-- 	1234567890.-,/: 
					// keycode- 43: '+', 44: ',', 45: '-', 46: '.', 47: '/', 48-57: Numbers, 58: ':'l
					var charCode = e.which||e.keycode;
					if(charCode >=43 && charCode <=58)
						return true;
					else
						return false;
				}
		    });
			
			$('#'+childdef['id']).keyup(function(key){
				var inputCharCode = $('#'+childdef['id']).val().toString().charCodeAt($('#'+childdef['id']).val().toString().length - 1); 
				if(inputCharCode >= 44 && inputCharCode <= 58){		
					childdef['systemVariableValue'] = $('#'+childdef['id']).val();
					childdef['isSystemVariable'] = false;
					childdef['value'] = $('#'+childdef['id']).val();
				}else{
					$('#'+childdef['id']).val($('#'+childdef['id']).val().toString().substring(0,$('#'+childdef['id']).val().length -1));
					childdef['value'] = $('#'+childdef['id']).val();
				}
				
				if(childdef['inputFormatType'] != undefined && childdef['inputFormatType'] != "" && childdef['inputFormatType'].toString().indexOf("YYYY") != -1 ){
					childdef['value'] = $.validate("ChangeDateInputFormatType",childdef, $('#'+childdef['id']).val());
					$('#'+childdef['id']).val(childdef['value']);
				}else if(childdef['inputFormatType'] != undefined && childdef['inputFormatType'] != ""){
					childdef['value'] = $.validate("ChangeInputFormatType",childdef, $('#'+childdef['id']).val());
					if(childdef['value'] == undefined)  childdef['value'] = "";
					$('#'+childdef['id']).val(childdef['value']);
				}else{
					 value = $('#'+childdef['id']).val();
				}
				
				if(inputCharCode != 8 && childdef['inputFormatType'] != undefined && childdef['inputFormatType'] != ""){ // for input-format.
 					var start  = this.selectionStart;
 					var end  = this.selectionEnd;
 					var pattern = /(YYYY|MM|DD|HH|MM|SS)/gi;
 					if(childdef['inputFormatType'].match(pattern) != null){
 						childdef['value'] = $.validate("validateDateInput",$('#'+childdef['id']).val(), childdef['inputFormatType']);
 						if($.utility('verifyFullDate',childdef['value']) == "invalid date")
							childdef['value'] = "";
 						$('#'+childdef['id']).val(childdef['value']);
 					}else{
 						
 						if(childdef['inputFormatType'].toString().indexOf("YYYY") != -1 ){
 							childdef['value'] = $.validate("ChangeDateInputFormatType",childdef, $('#'+childdef['id']).val());
 							$('#'+childdef['id']).val(childdef['value']);
 						}else if(childdef['inputFormatType'] != undefined && childdef['inputFormatType'] != "" && key['keyCode'] == 8){//Fix for backspace-->Richa(Bug #9055 Fix)
 							this.selectionStart = start;
 							this.selectionEnd = end;
 						}
 						else if(childdef['inputFormatType'] != undefined && childdef['inputFormatType'] != ""){
 							childdef['value'] = $.validate("ChangeInputFormatType",childdef, $('#'+childdef['id']).val());
 							$('#'+childdef['id']).val(childdef['value']);
 						}else{
 							 value = $('#'+childdef['id']).val();
 						}
 					}					
 				}

				var value = $('#'+childdef['id']).val();
				var numval = value.split("");
				var min = parseFloat(childdef['range']['min']);
				var max = parseFloat(childdef['range']['max']);
				
				if( childdef['range']['max'] != "Invalid"){
					if(isNaN(parseFloat(value))){
						if(childdef['range']['max'].indexOf(value) > -1 || childdef['range']['min'].indexOf(value) > -1){
							$('#'+childdef['id']).val(numval.join(''));
							value = childdef['value'] = $('#'+childdef['id']).val();
						}
					}
					else{
						var numValue = '';
						if(childdef['value'].length > parseFloat(childdef['value']).toString().length){
						  	numValue = parseFloat(childdef['value'].replace(/[^\d\.]/g,'') );
						}
						else
						 	numValue = childdef['value'];
						if(numValue <= max ){
						  	//return true;
						}
						else{
						  	//numval = numval.splice();
							numval.splice(numval.length -1);
						  	$('#'+childdef['id']).val(numval.join(''));
						  	value = childdef['value'] = $('#'+childdef['id']).val();
						  		
						  	$("#"+childdef['id']).trigger("EditingEndError");
						}
					}
				}
			});
			
			$('#'+childdef['id']).focusin(function(key){
				
				if(childdef.value == "0" || parseInt(childdef.value) == 0) {
					var elem = $('#'+childdef.id).get(0);
					elem.setSelectionRange(0, 1);
					elem.focus();
				}else {
					
					// below code is for set cursor position in the end of value, as per wiki: 
					// http://tokyodev.mobilous.com/redmine/projects/wpuimedia005/wiki/Input_formatting
					
					var el = $('#'+childdef.id).get(0);					
				    setTimeout((function(el) {
				        var strLength = el.value.length;
				        return function() {
				            if(el.setSelectionRange !== undefined) {
				                el.setSelectionRange(strLength, strLength);
				            } else if (elem.createTextRange) {
		             			// IE8 and below
		             		    var range = elem.createTextRange();
		             		    range.collapse(true);
		             		    range.moveEnd('character', strLength);
		             		    range.moveStart('character', strLength);
		             		    range.select();
		             		} else {
				                $(el).val(el.value);
				            }
				    }}(this)), 0);
				}
			});
			
			$('#'+childdef['id']).focusout(function(key){
				var value = $('#'+childdef['id']).val();
				var number = value.split("");
				if(childdef['inputFormatType'] != undefined && childdef['inputFormatType'] != ""){
					if(childdef['inputFormatType'].indexOf("REGEXP_LIKE") == -1){
						if(number.length < childdef['inputFormatType'].toString().length){
							$('#'+childdef['id']).val('');
							childdef['value'] = '';	
							$("#"+childdef['id']).trigger("EditingEndError");
						}
					}
				}
				
				var value = $('#'+childdef['id']).val();
				var numval = value.split("");
				var min = parseFloat(childdef['range']['min']);
				_maxlen = childdef['range']['max'].length;
				var max = parseFloat(childdef['range']['max']);
				
				if( childdef['range']['max'] != "Invalid"){
					if(isNaN(parseFloat(value))){
						if(childdef['range']['max'].indexOf(value) > -1 || childdef['range']['min'].indexOf(value) > -1){
							$('#'+childdef['id']).val(numval.join(''));
							value = childdef['value'] = $('#'+childdef['id']).val();
						}
					}
					else{
						var numValue = '';
						if(childdef['value'].length > parseFloat(childdef['value']).toString().length){
						  	numValue = parseFloat(childdef['value'].replace(/[^\d\.]/g,'') );
						}
						else
						 	numValue = childdef['value'];
						if(numValue <= max ){
						  	//return true;
						}
						else{
							numval.splice(numval.length - (numval.length - _maxlen));
							if(parseFloat(numval.join('')) > max)//Bug #13476 fix
							    $('#'+childdef['id']).val(max);
							else
						  	    $('#'+childdef['id']).val(numval.join(''));
						  	value = childdef['value'] = $('#'+childdef['id']).val();
						  		
						  	$("#"+childdef['id']).trigger("EditingEndError");
						}
					}
				}
				
				if(childdef['range']['min'] != "Invalid" ){
					if(isNaN(parseFloat(value))){
						if(childdef['range']['min'].indexOf(value) > -1){
							$('#'+childdef['id']).val(numval.join(''));
							value = childdef['value'] = $('#'+childdef['id']).val();
						}
					}
					else{
						if(childdef['value'] >= min){
							//return true;
						}
						else{
							numval = numval.splice();
							childdef['value'] = numval.join('');
							$('#'+childdef['id']).val(numval.join(''));
						}
					}
				}
			});
			
			if(childdef['events']){
				
				if(childdef['events']['Keypress']){
					$('#'+childdef['id']).on("keyup", function(){
						$.utility('setActionRunningStatus', true);
						new $.actions(pagedef, numericField, childdef['events']['Keypress'].slice()).execute(); 
					});
				}
					
				if(childdef['events']['EditingStart']){
					$('#'+childdef['id']).bind('focusin',function(e){
						$.utility('setActionRunningStatus', true);
						new $.actions(pagedef, numericField, childdef['events']['EditingStart'].slice()).execute();
					});
				}
				
				if(childdef['events']['EditingEnd']){
					$('#'+childdef['id']).on('focusout',function(){
						$.utility('setActionRunningStatus', true);
						new $.actions(pagedef, numericField, childdef['events']['EditingEnd'].slice()).execute();
					});
				}
				
				if(childdef['events']['EditingEndError']){
					$('#'+childdef['id']).on('EditingEndError',function(){
						$.utility('setActionRunningStatus', true);
						new $.actions(pagedef, numericField, childdef['events']['EditingEndError'].slice()).execute(); 
					});
				}
			}
			
		};
		
		//this function is needed for all of the UI objects
		numericField.getValue = function(){
			return childdef['value'];
		};
		
		numericField.setValue = function(param){
			//param = $.utility('convertSpecialCharacter', param);
			param = param.replace(/[^0-9.:\-\/\:\,]/g, '');				// set-value for following inputs only :-- 	1234567890.-,/:		Dated:25-Jan-2018
			childdef['systemVariableValue'] = childdef['value'];
			childdef['isSystemVariable'] = false;
			if(childdef['formatType'] != undefined && childdef['formatType'] != ""){
				childdef['value'] = $.validate('changeFormat',childdef,param);
				$('#'+childdef['id']).val(childdef['value']);
			}else{
				childdef['value'] = param;
				$('#'+childdef['id']).val(param);
			}
			childdef['value'] = param
			
		};
		
		numericField.setVisibility = function(param){
			if(param === true){
				childdef['hidden'] = false;
				$('#'+numericField.getId()).css({'visibility':'visible'});
			}else{
				childdef['hidden'] = true;
				$('#'+numericField.getId()).css({'visibility' : 'hidden'});
			}
		};		

		numericField.propagateReadOnly = function(param){
			if(param == 'true'){
				numericField.setKeyboardType(childdef['keyboardType']);
			}else{
				if(childdef['readonly'] == "true" && (childdef['border']['borderweight'] == "0")) {
					$("#"+ childdef['id']).removeClass("ui-shadow-inset");
				}
				if($("#"+ childdef['id']).data().keyboard != undefined)
					$("#"+ childdef['id']).data().keyboard.destroy();
			}			
		};
		
		numericField.setKeyboardType = function(param){
			if(childdef['readonly'] === "false" || childdef['readonly'] === false)
			    $('#'+childdef['id']).attr('readonly',false);
			if(!$('#'+childdef['id']).prop('readonly')){
				childdef['keyboardType'] = param;
				$('#'+childdef['id']).data('keyboardType',param);
				
				if(param != undefined && param != "" && param != "Default" && param != "HW" && childdef['keyboardType'] != "Flic" && childdef['keyboardType'] != "Flick"){
					if($( "#" + childdef['id']).data().keyboard != undefined)
						$( "#" + childdef['id']).data().keyboard.destroy();
					$.utility("showCustomKeyboard",childdef['id'],param);
				}
				if(param == "Default" || param == "HW" || childdef['keyboardType'] == "Flic" || childdef['keyboardType'] == "Flick"){
					$( "#" + childdef['id'] + "_keyboard").remove();
					$('#'+childdef['id']).attr('readonly',false);
				}	
			}
				
		};
		
		numericField.setSecure = function(param){
			childdef['secure'] = param;
			if($('#'+childdef['id']).get(0) != undefined){
				if(param == true || param == "true")
					$('#'+childdef['id']).get(0).type = 'password';
				else
					$('#'+childdef['id']).get(0).type = 'text';
			}
		};
		
		return numericField;
	};
	
	function uiTextView(pagedef, childdef, data){
		var textView =  new BaseView(childdef);
		
		textView.getTemplate = function(){
			return childdef['template'];
		};
		
		var isReadonly = (childdef['readonly'] == "true") ? "readonly" : "";
		textView.getHTML = function(){
			if(!$.utility("isReverseTransition")){
				if(childdef['value']){
					childdef['value']=$.utility('spaceInStringConversion',childdef['value']);
				}
				if(childdef['template'] !== ""){
					childdef['value']  = $.utility('tokenizeString', $.utility('extractDataFromRecord', data, childdef['template']), pagedef);
					if(childdef['template'].indexOf('[') != -1 && childdef['template'].indexOf(']') != -1 && childdef['value'] == childdef['template'] ? "" : childdef['value']){
						childdef['value'] = "";
					}
				}
				childdef['value'] = $.utility('convertSpecialCharacter', $.utility('tokenizeString', childdef['value']));
			}
			
			return ["<textarea id='",childdef['id'],"' name='",childdef['name'] ,"' tabindex='",childdef['taborder'],"' ",isReadonly," wrap='virtual'>", childdef['value'], "</textarea>"].join('');
		};
		
		textView.applyOverrides = function(){
			textView['frame'].applyCSS();
			textView['font'].applyCSS();
			textView['border'].applyCSS();
			textView['padding'].applyCSS();
			textView['background'].setColor();

			if(childdef['hidden']=="true" || childdef['hidden']==true){
				$('#'+childdef['id']).css({'visibility':'hidden'});
			}
			
			if(!isNaN(parseInt(childdef['taborder'])))
				$("#"+childdef['id']).attr('tabindex', parseInt(childdef['taborder'])+1 );
			
			// below code is used instead of using readonly in textview.. as readonly attribute spoils the image button on the page only on Android Browser, anyhow.
			// the drawback of this is .. that on Android Browser the text will get little fade-off.. but this is the limitation. Akhil Tyagi
			if(childdef['readonly'] == "true"){
				$('#'+childdef['id']).attr("readOnly", "readOnly"); 
			}
			textView.setEditable(childdef['readonly']);
			
			// set character limit
			if(childdef['charlimit']){
				if(parseInt(childdef['charlimit']) != -1)
					$('#'+childdef['id']).attr('maxlength',childdef['charlimit']);
			}

			//some default overrides
			$('#'+childdef['id']).css({'resize':'none','margin':'0px', 'border-radius':'0px', 'overflow':'hidden'});
			$('#'+childdef['id']).css({'text-shadow':'rgba(255, 255, 255, 0) 0px 0px 0px'});
			$('#'+childdef['id']).css({'wordwrap':'break-word','overflow-wrap':'break-word','max-width':childdef['frame']['width']*$.mobileweb.device['aspectWratio']+'px','max-height':childdef['frame']['height']*$.mobileweb.device['aspectHratio']+'px'});
			if(childdef['readonly'] == "false"){
				$('#'+childdef['id']).css({'overflow-x':'auto','-webkit-overflow-scrolling':'touch'});
				$('#'+childdef['id']).css({'overflow-y':'auto','-webkit-overflow-scrolling':'touch','resize':'none','display': 'block'});
			}else{
				$('#'+childdef['id']).css({'box-shadow':'none','-webkit-box-shadow':'none'});
				$('#'+childdef['id']).css({'overflow':'hidden'});
			}
			
			//underlined and strikeout text
			if(childdef['underline'] && childdef['strikeout'])
				$('#'+childdef['id']).css({'text-decoration': 'line-through underline'});
			else if(childdef['underline'])
				$('#'+childdef['id']).css({'text-decoration': 'underline'});
			else if(childdef['strikeout'])
				$('#'+childdef['id']).css({'text-decoration': 'line-through'});
			
 			var uiVerticalAlign = childdef['verticalalignment'];
 			
 			if(uiVerticalAlign && uiVerticalAlign.length > 0){
 				var rowCount = 1;
 				if($('#'+childdef['id'])[0] != undefined)
 					rowCount = $('#'+childdef['id'])[0]['rows'];
 				
 				if($('#'+childdef['id']) != undefined && $('#'+childdef['id'])['length'] > 0){
 	   				$('#'+childdef['id']).css({'vertical-align':uiVerticalAlign});
 	   				
 	   				var contentHeight = rowCount * parseFloat($('#'+childdef['id']).css('line-height').replace("px",""));
 	   				var hei = childdef['frame']['height']*$.mobileweb.device['aspectHratio'];
 	   				var padtop = childdef['padding']['top']*$.mobileweb.device['aspectHratio'];
 	 				var padbottom = childdef['padding']['bottom']*$.mobileweb.device['aspectHratio'];
 	 				var fontsize = childdef['font']['size']*$.mobileweb.device['aspectHratio'];
 	 				
 	   				if (uiVerticalAlign =='top'){
 	   					$('#'+childdef['id']).css({'padding-top':padtop, 'padding-bottom' :padbottom});
 	   				}else if (uiVerticalAlign =='bottom'){
 	   					var pad_top = parseInt(hei) -(fontsize + padbottom);
 	   					$('#'+childdef['id']).css({'padding-top':pad_top, 'padding-bottom' :padbottom});
 	   				}else{
 	   					var topPad = (parseFloat(hei)-parseFloat(contentHeight))/2;
 	   					if(isNaN(contentHeight))
 	   						topPad = parseFloat(hei - fontsize)/2 + 2;
 	   					topPad = topPad -( padtop + padbottom);
 	   					$('#'+childdef['id']).css({'padding-top':topPad});
 	   				}
 				}
 				$('#'+childdef['id']).css({'padding-left':childdef['padding']['left']*$.mobileweb.device['aspectWratio'], 'padding-right':childdef['padding']['right']*$.mobileweb.device['aspectWratio']});
 				
 				$('#'+childdef['id']+' :focus').css({'outline':'1px solid orange'});
 			}
 			
 			if (childdef['cornerRadius'] != undefined){
				$('#'+childdef['id']).css({'border-radius':childdef['cornerRadius']+ "px" });
			}
 			
			if(!$.utility("isReverseTransition")){
				if(childdef['template']!==''){
					var initialCSVArray=$.utility('getCombinedCSV');
					if(initialCSVArray.length!=0){
						$.each(initialCSVArray, function(i, csvElement){
							if(csvElement.csvResultHeader === childdef['template'].replace("[","").replace("]","")){
								textView.setValue(csvElement.value);
							 }
							else
								textView.setValue(childdef['template'].indexOf('[') != -1 && childdef['template'].indexOf(']') != -1 && childdef['value'] == childdef['template'] ? "" : childdef['value'] ? "" : childdef['value']);
						});
					}
					else{
						if(data != undefined){
							textView.setValue($.utility('tokenizeString', $.utility('extractDataFromRecord', data, childdef['template']), pagedef));
						}else{
							textView.setValue(childdef['template'].indexOf('[') != -1 && childdef['template'].indexOf(']') != -1 && childdef['value'] == childdef['template'] ? "" : childdef['value'] ? "" : childdef['value']);
						}
					}
				}
			}
			
			childdef['value'] = textView.setCapitalization(childdef['value']);
			childdef['value'] = textView.doTrim(childdef['value']);
			$("#"+childdef['id']).val(childdef['value']);
 			
			if(!$.utility("isReverseTransition")){
				if(childdef['globalValue'] != undefined){
					if(childdef['globalValue'] == "__LAT__"){
						$('#__LAT__').on('onchange',function(){
							childdef['value'] = $.mobileweb["__LAT__"];
							$("#"+childdef['id']).val($.mobileweb["__LAT__"]);
						});
						$("#__LAT__").trigger("onchange");
					}else if(childdef['globalValue'] == "__LONG__"){
						$('#__LONG__').on('onchange',function(){
							childdef['value'] = $.mobileweb["__LONG__"];
							$("#"+childdef['id']).val($.mobileweb["__LONG__"]);
						});
						$("#__LONG__").trigger("onchange");
					}else if(childdef['globalValue'] == "__ALT__"){
						$('#__ALT__').on('onchange',function(){
							childdef['value'] = $.mobileweb["__ALT__"];
							$("#"+childdef['id']).val($.mobileweb["__ALT__"]);
						});
						$("#__ALT__").trigger("onchange");
					}else if(childdef['globalValue'] == "__MAPZOOM__"){
						$('#__MAPZOOM__').on('onchange',function(){
							childdef['value'] = $.mobileweb["__MAPZOOM__"];
							$("#"+childdef['id']).val($.mobileweb["__MAPZOOM__"]);
						});
						$("#__MAPZOOM__").trigger("onchange");
					}else if(childdef['globalValue'] == "__ADDRESS__"){
					    $('#__ADDRESS__').on('onchange',function(){
					        childdef['value'] = $.mobileweb["__ADDRESS__"];
					        $("#"+childdef['id']).val($.mobileweb["__ADDRESS__"]);
					    });
					    $("#__ADDRESS__").trigger("onchange");
					}else if(childdef['globalValue'] == "__COURSE__"){
					    $('#__COURSE__').on('onchange',function(){
					        childdef['value'] = $.mobileweb["__COURSE__"];
					        $("#"+childdef['id']).val($.mobileweb["__COURSE__"]);
					    });
					    $("#__COURSE__").trigger("onchange");
					}else if(childdef['globalValue'] == "__ROUTETIME__"){
					    $('#__ROUTETIME__').on('onchange',function(){
					        childdef['value'] = $.mobileweb["__ROUTETIME__"];
					        $("#"+childdef['id']).val($.mobileweb["__ROUTETIME__"]);
					    });
					    $("#__ROUTETIME__").trigger("onchange");
					}else if(childdef['globalValue'] == "__ROUTEDISTANCE__"){
					    $('#__ROUTEDISTANCE__').on('onchange',function(){
					        childdef['value'] = $.mobileweb["__ROUTEDISTANCE__"];
					        $("#"+childdef['id']).val($.mobileweb["__ROUTEDISTANCE__"]);
					    });
					    $("#__ROUTEDISTANCE__").trigger("onchange");
					}else if(childdef['globalValue'] == "__CENTERLAT__"){
						$('#__CENTERLAT__').on('onchange',function(){
							childdef['value'] = $.mobileweb["__CENTERLAT__"];
							("#"+childdef['id']).text($.mobileweb["__CENTERLAT__"]);
						});
						$("#__CENTERLAT__").trigger("onchange");
					}else if(childdef['globalValue'] == "__CENTERLONG__"){
						$('#__CENTERLONG__').on('onchange',function(){
							childdef['value'] = $.mobileweb["__CENTERLONG__"];
							("#"+childdef['id']).text($.mobileweb["__CENTERLONG__"]);
						});
						$("#__CENTERLONG__").trigger("onchange");
					}else if(childdef['globalValue'] == "__NUMREC__"){
						$('#__NUMREC__').on('onchange',function(){
							childdef['value'] = $.mobileweb["__NUMREC__"];
							$("#"+childdef['id']).val($.mobileweb["__NUMREC__"]);
						});
						$("#__NUMREC__").trigger("onchange");
					}else if(childdef['globalValue'] == "__NUMREC__"){
						$('#__NUMREC__').on('onchange',function(){
							childdef['value'] = $.mobileweb["__NUMREC__"];
							$("#"+childdef['id']).val($.mobileweb["__NUMREC__"]);
						});
						$("#__NUMREC__").trigger("onchange");
					}else if(childdef['globalValue'] == "__NOW__"){
						var cd = new Date();
						$.mobileweb["__NOW__"] = $.utility('checkGlobalVariable',childdef['globalValue']);
						
						if($("body").find("#__NOW__").length == 0 ) {
							$('body').append("<input id='__NOW__' type='text' hidden='true'>"+ $.mobileweb["__NOW__"] +"</input>");
						}
						
						$('#__NOW__').on('onchange',function(){
							if(childdef['formatType'] != undefined || childdef['formatType'] != ""){
								childdef['value'] = $.validate('changeFormat',childdef,cd.toString());
								$("#"+childdef['id']).val($.validate('changeFormat',childdef,cd.toString()));
							}else{
								childdef['value'] = $.mobileweb["__NOW__"];
								$("#"+childdef['id']).val($.mobileweb["__NOW__"]);
							}
							
						});
						$("#__NOW__").trigger("onchange");
					}
				}
//				if(childdef['scrollPosition'] != undefined && childdef['scrollPosition'] == "end"){
//					$("#"+childdef['id']).scrollTop($("#"+childdef['id'])[0].scrollHeight);
//					$("#"+childdef['id']).trigger("scroll");
//				}

			}
			
			if(childdef['refFileHidden'] != undefined && (!childdef['refFileHidden'] || childdef['refFileHidden'] == "false")){
				if(childdef['refFileURL'].indexOf("[") != -1)
					childdef['refFileURL'] = $.utility("tokenizeString",childdef['refFileURL'], pagedef);
				var requestURL = $.mobileweb['baseurl'] + ":8181/mobileweb/mobile/readFile?uri="+childdef['refFileURL']+"&uiName="+childdef['id'];
				var filepath = childdef['refFileURL'];
				function toDataURL(url, callback) {
					var xhr;
					if (window.XMLHttpRequest) {
					    xhr = new XMLHttpRequest();
					} else if (window.ActiveXObject) {
					    xhr = new ActiveXObject("Microsoft.XMLHTTP");
					}
					xhr.open('GET', url);
					xhr.send();

					xhr.onload = function() {
						callback(xhr.response);
					};
					xhr.onerror = function() {
						$.utility('sendRequest',requestURL);
					};
				};

				toDataURL(filepath, function(dataUrl) {
					$('#'+childdef['id']).val(dataUrl);
				});
				
			}
			
			
		};
		
		//this function is needed for all of the UI objects
		textView.getValue = function(){
			return $.utility('convertSpecialCharacter', childdef['value']);
		};
		textView.setValue = function(param){
			//var convertedParam = $.utility('convertSpecialCharacter', param);
			param = $.utility('spaceInStringConversion',param);
			param = textView.setCapitalization(textView.doTrim(param));
			childdef['value'] = param;
			$('#'+childdef['id']).val(param);
		};
		
		textView.setEditable = function(param){
			childdef['readonly'] = param;
		};
		
		textView.setCapitalization = function(param){
			if(childdef['autoCapitalization'] != undefined && childdef['autoCapitalization'] != "None"){
				switch(childdef['autoCapitalization']){
					case 'AllCharacters':
						param = param.toUpperCase();
						break;
					case 'Sentences':
						var rg = /(^\s*\w{1}|\.\s*\w{1})/gi;
						param = param.toLowerCase();
						param = param.replace(rg, function(param) {
							return param.toUpperCase();
						});
						break;
					case 'Words':
						var rg = /(?:^|\s)\S/g;
						param = param.toLowerCase();
					    return param.replace(rg, function(param){
					    	return param.toUpperCase();
					    });
						break;
					default:
						break;
				}
			}
			return param;
		};
		
		textView.doTrim = function(param){
			if(childdef['isTrim']){
				return $.trim(param);
			};
			return param;
		};
		
		textView.applyEvents = function(){
			
			if(childdef['readonly'] == "true"){
				$('#'+childdef['id']).bind('tap', function(e){
					$('#'+childdef['id']).hide();
					$(document.elementFromPoint(e.clientX, e.clientY)).trigger("taphold").trigger("tap")
					$('#'+childdef['id']).show();
				});
				
				$('#'+childdef['id']).on('focus',function(){
	 				this.blur();
	 			});
			}
			
			if(childdef['voiceRecognizable']){
 				$.utility("initSpeechAnalyser", childdef['id']);
 				
 				$('#'+childdef['id']).on('focus',function(){
 					setTimeout(function(){
 						$.utility("startSoundRecording", childdef['id']);
 					},500);
 				});
 			}
			
			$('#'+childdef['id']).on('input', function(e){
				if(e.originalEvent.inputType == "insertFromPaste")		//case of input from 'paste'
						childdef['value'] = $('#'+childdef['id']).val();
			});
			
			$('#'+childdef['id']).on('keyup', function(e){
				childdef['value'] = $('#'+childdef['id']).val();
				childdef['value'] = textView.setCapitalization(childdef['value'])
				 $('#'+childdef['id']).val(childdef['value']);
				if((data)&&(childdef['template']!=='')){
					$.utility('saveDataToRecord',data, childdef['template'], childdef['value']);
				}
				/*if((e.keyCode < 37 || e.keyCode > 40)){
					
				}*/
			});
			
			$('#'+childdef['id']).on('scroll', function(e){ 
				if(pagedef['iscroll'] != undefined)
					pagedef['iscroll'].vScroll = false;
			});
			
			$('#'+childdef['id']).mouseover(function(e){
				if(childdef['readonly'] === "true" || childdef['readonly'] === true){
					$('#'+childdef['id']).css({'overflow-y':'auto'})
				}
			}).mouseout(function(e){
				if(childdef['readonly'] === "true" || childdef['readonly'] === true){
					$('#'+childdef['id']).css({'overflow':'hidden'})
				}
			})
			
			if(childdef['events']){
				
				if(childdef['events']['Keypress']){
					$('#'+childdef['id']).on("keyup", function(){
						new $.actions(pagedef, textView, childdef['events']['Keypress']).execute();
					});
				}
				
				if(childdef['events']['EditingStart']){
					$('#'+childdef['id']).bind('focusin',function(e){
						$.utility('setActionRunningStatus', true);
						new $.actions(pagedef, textView, childdef['events']['EditingStart'].slice()).execute();
					});
				}
				
				if(childdef['events']['EditingEnd']){
					$('#'+childdef['id']).on('focusout',function(){
						$.utility('setActionRunningStatus', true);
						new $.actions(pagedef, textView, childdef['events']['EditingEnd'].slice()).execute();
					});
				}
			}
			
			if(childdef['scrollPosition'] != undefined && childdef['scrollPosition'] == "end"){
				var timer =	setInterval(function(){
						clearInterval(timer);
						$("#"+childdef['id']).scrollTop($("#"+childdef['id'])[0].scrollHeight);
				},200);
			
			}
			
		};
		
		textView.setVisibility = function(param){
			if(param === true){
				childdef['hidden'] = false;
				$('#'+textView.getId()).css({'visibility':'visible'});
			}else{
				childdef['hidden'] = true;
				$('#'+textView.getId()).css({'visibility' : 'hidden'});
			}
		};
		
		textView.propagateReadOnly = function(param){
//			if(param == 'true'){
//				textView.setKeyboardType(childdef['keyboardType']);
//			}else{
//				if($("#"+ childdef['id']).data().keyboard != undefined)
//					$("#"+ childdef['id']).data().keyboard.destroy();
//			}			
		};
		
		textView.setKeyboardType = function(param){
//			childdef['keyboardType'] = param;
//			$('#'+childdef['id']).data('keyboardType',param);
//			$( "#" + childdef['id']).removeData( "keyboard" );
//			if(param != undefined && param != "" && param != "Default"){
//				$.utility("showCustomKeyboard",childdef['id'],param);
//			}
//			if(param == "Default"){
//				$( "#" + childdef['id'] + "_keyboard").remove();
//				$('#'+childdef['id']).attr('readonly',false);
//			}
				
		};
		
		return textView;
	};

	function uiWebView(pagedef, childdef, data){
		var webView = new BaseView(childdef);

		webView.getTemplate = function(){
			return childdef['template'];
		};
		
		webView.getHTML = function(){
			var applyScroll = 'auto';
			if(($.utility('getDeviceType') === 'iPad') || ($.utility('getDeviceType') === 'iPhone')){
				applyScroll = 'no';
			}
			var _src = childdef['src'];
			if(_src.indexOf('youtu') > -1){
				_src = _src.replace("watch?v=", "embed/");
			   if(_src.indexOf('&') > -1) {
				   _src = _src.split('&')[0];
			   }
			}
			return ["<iframe scrolling='",applyScroll,"' id='",childdef['id'],"' name='",childdef['name'],"' src='",_src, "'  tabindex='",childdef['taborder'],"'></iframe>"].join('');
		};
  
		webView.applyOverrides = function(){
			webView['frame'].applyCSS();
			
			webView.setLineHeight(childdef['lineheight']);
			if(childdef['hidden']){
				$('#'+childdef['id']).css({'visibility':'hidden'});
			}
			if(childdef['border']){
				var weight = childdef['border']['borderweight']*$.mobileweb.device['aspectratio'] +"px";
				var color = 'rgba('+childdef['border']['bordercolor']['red']+','+childdef['border']['bordercolor']['green']+','+childdef['border']['bordercolor']['blue']+','+childdef['border']['bordercolor']['alpha']+')';
				$('#'+childdef['id']).css({'border':weight +' solid '+ color});				
				$('#'+childdef['id']).css({'margin':'0px'});
			}
			
			if((childdef['src'].indexOf("[") != -1) && (childdef['src'].indexOf("]") != -1)){
 				var srcValue = $.utility('tokenizeString', $.utility('extractDataFromRecord', data, childdef['src']), pagedef);
 				webView.setValue(srcValue);
			}
			
			setTimeout(function() {
 				var iframebody = $('#'+childdef['id']).contents().find('body');
 				if(iframebody.length == 0)
 					$('#'+childdef['id']).contents().find('body').html('The webpage you are tying to access is taking more time then usual or is preventing it to be displayed on this window.');
 				else{
 					if(iframebody[0].children.length == 0)
 						if(!childdef['hidden'])
 							$('#'+childdef['id']).contents().find('body').html('The webpage you are tying to access is taking more time then usual or is preventing it to be displayed on this window.');
 				}
 				
 			}, 20000);
		};
		
		
		webView.setLineHeight = function(param){
			if(param){
				$('#'+childdef['id']).css({'line-height':param+'px'});
			}
		};
		
		webView.applyEvents = function(){
			if(childdef['events']){
				if(childdef['events']['OnLoad']){
					$('#'+childdef['id']).ready(function(){
						new $.actions(pagedef, webView, childdef['events']['OnLoad'].slice()).execute();
	
					});
				}
				if(childdef['events']['LoadFail']){
					$('#'+childdef['id']).load(function(){
						if($.utility('checkURL',childdef['src']) == 'error'){
							new $.actions(pagedef, webView, childdef['events']['LoadFail'].slice()).execute(); 
						
						}
					});
				}
				if(childdef['events']['LoadEnd']){
					$('#'+childdef['id']).load(function(){
						if($.utility('checkURL',childdef['src']) == 'success'){
							new $.actions(pagedef, webView, childdef['events']['LoadEnd'].slice()).execute(); 
						
						}
					});
				}
			}
		};
		
		//this function is needed for all of the UI objects
		webView.getValue = function(){
			return '';
		};
		webView.setValue = function(src){
			$('#'+childdef['id']).attr('src', src);
		};
		
		webView.loadContent = function(html){
			var wvWidth = childdef['frame']['width']*$.mobileweb.device['aspectWratio']*0.9;
 			var widString = '"width":"'+wvWidth+'"';
 			var wvHeight = childdef['frame']['height']*$.mobileweb.device['aspectHratio']*0.9;
 			var heiString = '"height":"'+wvHeight+'"';
 			if(html.indexOf('"width":"90%"') != -1)
 				html = html.replace('"width":"90%"', widString);
 			if(html.indexOf('"height":"90%"') != -1)
 				html = html.replace('"height":"90%"', heiString);
			  
			$('#'+childdef['id']).attr('srcdoc', html);
	    };
		
		return webView;
	};
	
	
	function uiRoundButton(pagedef, childdef, data){
		var roundButton =  new BaseView(childdef);
		
		roundButton.getTemplate = function(){
			return childdef['template'];
		};
		
		roundButton.getHTML = function(){
			if(!$.utility("isReverseTransition")){
				if(childdef['value']){
					childdef['value']=$.utility('spaceInStringConversion',childdef['value']);
				}
			}
			return ["<fieldset id='",childdef['id'],"' style=' visibility:hidden;'> <input id='",childdef['id'],"' name='",childdef['name'] , "' type='",childdef['type'] , "' value='",childdef['value'],"' class=ui-btn-hidden aria-disabled=false /> </fieldset>"].join('');
		};
	
		roundButton.applyOverrides = function(){
			roundButton['frame'].applyCSS();
			roundButton['font'].applyCSS();
			
			roundButton.setLineHeight(childdef);
			if(!$.utility("isReverseTransition")){
				if(childdef['template']!==''){
					roundButton.setValue($.utility('extractDataFromRecord', data, childdef['template']));
				}
			}
			
			if(childdef['hidden']=="true"){
				$('#'+childdef['id']).css({'visibility':'hidden'});
			}else{
				$('#'+childdef['id']).css({'visibility':'visible'});
			}
			
			var _borderWeight = 0;
			if(childdef['border']){
				_borderWeight = childdef['border']['borderweight'] * $.mobileweb.device['aspectHratio'];
				$('#'+childdef['id'] +' div').css({'border-width': _borderWeight+"px"});
				$('#'+childdef['id'] +' div').css({'border-color': $.attributes('color', childdef['border']['bordercolor']).getColorCode()});
				$('#'+childdef['id'] +' div').css({'border-style': 'solid'});
			}
			
			$('#'+childdef['id']).css({'height':((childdef['frame']['height']*$.mobileweb.device['aspectHratio'])-(2*_borderWeight))+'px', 'width':((childdef['frame']['width']*$.mobileweb.device['aspectWratio'])-(2*_borderWeight))+'px'});
			$('#'+childdef['id']+' div').css({'height':((childdef['frame']['height']*$.mobileweb.device['aspectHratio'])-(2*_borderWeight))+'px', 'width':((childdef['frame']['width']*$.mobileweb.device['aspectWratio'])-(2*_borderWeight))+'px'});
			
			if(childdef['background']){
				$('#'+childdef['id']+' div').css({'background': $.attributes('color', childdef['background']).getColorCode()});
			}
			
			$('#'+childdef['id']+ ' .ui-btn').css('margin','0');
			$('#'+childdef['id']+ ' div > span').css({'padding': 0});
			$('#'+childdef['id']+ ' div > span').css({'height': '100%', 'box-sizing': 'border-box'});
			
			$('#'+childdef['id']+ ' div > span > span').css({'position':'absolute', 'line-height': '100%'});
			$('#'+childdef['id']+ ' div > span > span').css({'text-align': childdef['font']['align'], 'text-decoration': childdef['textDecoration']});
			
			if(childdef['padding']){
				if($('#'+childdef['id']).css('width')){
					var width_new = parseFloat($('#'+childdef['id']).css('width').replace("px","")) - parseFloat((parseInt(childdef['padding']['left']) + parseInt(childdef['padding']['right'])) *$.mobileweb.device['aspectWratio']);
					$('#'+childdef['id']+' div > span > span').css({'width': width_new+"px"});
				}
				$('#'+childdef['id']+' div > span > span').css({'padding-left': childdef['padding']['left']*$.mobileweb.device['aspectWratio'], 'padding-right': childdef['padding']['right']*$.mobileweb.device['aspectWratio']});
				$('#'+childdef['id']+' div > span > span').css({'padding-top': childdef['padding']['top']*$.mobileweb.device['aspectHratio'], 'padding-bottom': childdef['padding']['bottom']*$.mobileweb.device['aspectHratio']});
			}

			if (childdef['verticalalignment'] =='bottom'){
				$('#'+childdef['id']+' .ui-btn-text').css({'vertical-align':'-100%'});
			}else{
				$('#'+childdef['id']+' .ui-btn-text').css({'vertical-align':childdef['verticalalignment']});
			}

			$('#'+childdef['id'] + ' div > span > span').css({left:'0px'});
			if (childdef['verticalalignment'] =='bottom'){
  				$('#'+childdef['id'] + ' div > span > span').css({top:(((childdef['frame']['height'] - childdef['padding']['bottom']) - (childdef['font']['size']*(childdef['value'].toString().length - childdef['value'].replace("\n", "").length+1))) * $.mobileweb.device['aspectHratio'])+'px'});
  			
			}else if (childdef['verticalalignment'] =='middle'){
  				var padbottom = childdef['padding']['bottom']*$.mobileweb.device['aspectHratio'];
 				var padtop = childdef['padding']['top']*$.mobileweb.device['aspectHratio'];
 				var hei = childdef['frame']['height']*$.mobileweb.device['aspectHratio'];
 				var font = childdef['font']['size']*$.mobileweb.device['aspectHratio'];
 				var diff = (hei - padtop - padbottom - font)/2;
 				var topDiff = 0;// + padtop;
 				
 				setTimeout(function(){
 					var spanHeight = $('#'+childdef['id']+' div > span > span ').css('height');
 	 				if(parseInt(spanHeight) > font){
 	 	  				topDiff = (diff + padtop + padbottom) - (parseInt(spanHeight)/2) ;
 	 				}else
 	 					topDiff = diff;
 	 					
 	 				$('#'+childdef['id'] + ' div > span > span').css({top:(topDiff)});
				}, 100)
 				
  				
  			}else if (childdef['verticalalignment'] =='top'){
  				$('#'+childdef['id'] + ' div > span > span').css({top:(childdef['padding']['top'] * $.mobileweb.device['aspectHratio'])+'px'});
  			}
			
			if(childdef['font']['lineBreakMode'] =='WordWrap')
				$('#'+childdef['id']+ ' div > span > span').css({'white-space': 'pre-wrap', 'word-wrap': 'break-word'});
			else
				$('#'+childdef['id']+ ' div > span > span').css({'white-space': 'pre'});

		};
		
		roundButton.setLineHeight = function(param){
			if(param){
				$('#'+childdef['id']).css({'line-height': childdef['frame']['height']*$.mobileweb.device['aspectHratio']+'px'});
			}
		};
		
		roundButton.setBackgroundColor = function(param){
			$('#'+childdef['id']+'>div').css('background',param);
		};
		
		//this function is needed for all of the UI objects
		roundButton.getValue = function(){
			return '';
		};
		roundButton.setValue = function(param){
			childdef['value'] = param;
			$('#'+childdef['id']+' .ui-btn-text').text(param);
		};
		
		roundButton.applyEvents = function(){
			if(childdef['events']){
				
				if(childdef['events']['Tap']){
					var isMobile = (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Windows Phone/i.test(navigator.userAgent)) ? true : false;		
					if(isMobile){// Bug #12338 fix
						$('#'+childdef['id']).bind("tap",function(){
							new $.actions(pagedef, roundButton, JSON.parse(JSON.stringify(childdef['events']['Tap']).slice())).execute();
						});
					}else{
						$('#'+childdef['id']).on('click',function(){ 
							new $.actions(pagedef, roundButton, JSON.parse(JSON.stringify(childdef['events']['Tap']).slice())).execute();
						});
					}
				}
				if(childdef['events'] && childdef['events']['flickRL']){
					$('#'+childdef['id']).on("swipeleft",function(){ 
						new $.actions(pagedef, roundButton, childdef['events']['flickRL'].slice()).execute();
					});
				}
				if(childdef['events'] && childdef['events']['flickLR']){
					$('#'+childdef['id']).on("swiperight",function(){ 
						new $.actions(pagedef, roundButton, childdef['events']['flickLR'].slice()).execute();
					});
				}
			}
			
		};
	
		return roundButton;
	};
	
	function uiTextButton(pagedef, childdef, data){
		var textButton =  new BaseView(childdef);

		textButton.getTemplate = function(){
			return childdef['template'];
		};
		
		textButton.getHTML = function(){
			childdef['taborder'] =  parseInt(childdef['taborder'])+1
			if(!$.utility("isReverseTransition")){
				if(childdef['value']){
					//To check space in a string..if so, convert it in to &nbsp;
				    childdef['value'] = $.utility('spaceInStringConversion',childdef['value']);
				    childdef['value'] = $.utility('convertSpecialCharacter', $.utility('tokenizeString', childdef['value']));//for globalValues bugId:7983 25jan16
				}
			}
		    if(childdef['backgroundimage'] === "." || childdef['backgroundimage'] === "") 
		    {
			    return ["<fieldset id='",childdef['id'],"' > <input id='",childdef['id'],"' name='",childdef['name'] , "' tabindex='",childdef['taborder'],"' type='",childdef['type'] , "' value='",childdef['value'],"' class=ui-btn-hidden aria-disabled=false/></fieldset>"].join('');
		    }else{
			    var defaultHeight =childdef['frame']['height'] * $.mobileweb.device['aspectHratio'];
			    var defaultWidth = childdef['frame']['width']  * $.mobileweb.device['aspectWratio'];
			    return ["<img height='",defaultHeight,"' width='",defaultWidth,"' id='",childdef['id'],"'name='",childdef['name'] ,"'tabindex='",childdef['taborder'], "' src='",$.utility('getImage',childdef['backgroundimage']),"'  style='visibility:hidden;'></img><label for='",childdef['id'],"'class='ui-btn-text' id='",childdef['id'],"_label' name='",childdef['name'],"'>",childdef['value'],"</label>"].join('');
		    }
		};
		  
		textButton.applyOverrides = function(){
			// HOTFIX for 'resetviewdata' action on listview page.Button not visible.Need to debug more. 
			if(childdef['backgroundimage'] === "." || childdef['backgroundimage'] === ""){
				if ($('#'+childdef['id']).find("div").length == 0 && $('#'+childdef['id'])[0] != undefined){ 
					$('#'+childdef['id'])[0].innerHTML = '<fieldset id="'+childdef['id']+'"> <div data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-icon="null" data-iconpos="null" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c" aria-disabled="false"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">'+childdef['value']+'</span></span><input id="'+childdef['id']+'" type="button" value="'+childdef['value']+'" class="ui-btn-hidden" aria-disabled="false"></div> </fieldset>';
				} 
			}
			 
			textButton['frame'].applyCSS();
			textButton['font'].applyCSS();
			 
			if(!$.utility("isReverseTransition")){
				if(childdef['template']!==''){
					 textButton.setValue($.utility('tokenizeString', $.utility('extractDataFromRecord', data, childdef['template']), pagedef));
				}
			}
			 
			if(childdef['hidden']=="true"){
				$('#'+childdef['id']).css({'visibility':'hidden'});
				$('#'+childdef['id']+'_label').css({'visibility':'hidden'});
			}else{
				$('#'+childdef['id']).css({'visibility':'visible'});
				$('#'+childdef['id']+'_label').css({'visibility':'visible'});
			}
			
			if(childdef['padding']){
				var width_new = parseFloat(((childdef['frame']['width']*$.mobileweb.device['aspectWratio'])-(2*_borderWeight)) + 'px') - parseFloat((childdef['padding']['left'])*$.mobileweb.device['aspectWratio']) - parseFloat((childdef['padding']['right'])*$.mobileweb.device['aspectWratio']);								
	 			$('#'+childdef['id']+' div > span > span ').css({'width' : width_new + "px"});
				$('#'+childdef['id']+' div > span > span ').css({'padding-left': childdef['padding']['left']*$.mobileweb.device['aspectWratio'], 'padding-right': childdef['padding']['right']*$.mobileweb.device['aspectWratio']});
				$('#'+childdef['id']+' div > span > span ').css({'padding-top': childdef['padding']['top']*$.mobileweb.device['aspectHratio'], 'padding-bottom': childdef['padding']['bottom']*$.mobileweb.device['aspectHratio']});
			}
			 
			if(childdef['backgroundimage'] === "." || childdef['backgroundimage'] === ""){		// when 'backgroundimage' is not set, i.e. normal TextButton
				textButton.setLineHeight(childdef);
				
				var _borderWeight = 0;
				if(childdef['border']){
					_borderWeight = childdef['border']['borderweight'] * $.mobileweb.device['aspectHratio'];
					$('#'+childdef['id'] +' div').css({'border-width': _borderWeight+"px"});
					$('#'+childdef['id'] +' div').css({'border-color': $.attributes('color', childdef['border']['bordercolor']).getColorCode()});
					$('#'+childdef['id'] +' div').css({'border-style': 'solid'});
				}
				
				$('#'+childdef['id']).css({'height':((childdef['frame']['height']*$.mobileweb.device['aspectHratio'])-(2*_borderWeight))+'px', 'width':((childdef['frame']['width']*$.mobileweb.device['aspectWratio'])-(2*_borderWeight))+'px'});
				$('#'+childdef['id']+' div').css({'height':((childdef['frame']['height']*$.mobileweb.device['aspectHratio'])-(2*_borderWeight))+'px', 'width':((childdef['frame']['width']*$.mobileweb.device['aspectWratio'])-(2*_borderWeight))+'px'});
				
				$('#'+childdef['id']+' .ui-btn').css('margin','0');
				
				$('#'+childdef['id']+' .ui-btn-inner').css({'padding':'0px'});
				$('#'+childdef['id']+' .ui-btn-inner').css('white-space','normal !important'); 
				$('#'+childdef['id']+' .ui-btn-inner').css('max-height',childdef['frame']['height']*$.mobileweb.device['aspectHratio']+'px'); 
				$('#'+childdef['id']+' .ui-btn-corner-all').css('border-radius','0em');
				$('#'+childdef['id']+ ' div > span ').css({'height': '100%', 'box-sizing': 'border-box'});
				
				$('#'+childdef['id']+' > div > input').css('padding','5px');
				
				$('#'+childdef['id'] + ' div > span > span').css({'position':'absolute', 'line-height': '100%'});
				if(childdef['font']['lineBreakMode'] =='WordWrap')
					$('#'+childdef['id'] + ' div > span > span').css({'white-space': 'pre-wrap', 'word-wrap': 'break-word'});
				else
					$('#'+childdef['id'] + ' div > span > span').css({'white-space': 'pre'});
				$('#'+childdef['id'] + ' div > span > span').css({'text-decoration': childdef['textDecoration'], 'vertical-align': childdef['verticalalignment']});
				
				if (childdef['verticalalignment'] =='bottom'){
 					$('#'+childdef['id'] + ' div > span > span').css({'bottom':'0px','left':'0px'});
 				}else if (childdef['verticalalignment'] =='middle'){
 					var padbottom = childdef['padding']['bottom']*$.mobileweb.device['aspectHratio'];
 					var padtop = childdef['padding']['top']*$.mobileweb.device['aspectHratio'];
 					var hei = childdef['frame']['height']*$.mobileweb.device['aspectHratio'];
 					var font = childdef['font']['size']*$.mobileweb.device['aspectHratio'];
 					var border = childdef['border']['borderweight']*$.mobileweb.device['aspectHratio'];
 					var diff = (hei - padtop - padbottom - font -(2*border))/2;//Bug #12857 fix
 					var top = diff;// + padtop;
 					$('#'+childdef['id'] + ' div > span > span').css({'top':top, left:'0px'});
 				}else if (childdef['verticalalignment'] =='top'){
 					$('#'+childdef['id'] + ' div > span > span').css({'top':'0px',left:'0px'});
 				}
				
				if (childdef['cornerRadius'] != undefined){
					$('#'+childdef['id'] + '> div').css({'border-radius':childdef['cornerRadius'] + "px" });
					$('#'+childdef['id'] + '> div > span').first().css({'border-radius':childdef['cornerRadius'] + "px" });
				}
				
			}else{
				if(childdef['backgroundimage'].indexOf("[") != -1 && childdef['backgroundimage'].indexOf("]") != -1){
					var bgimg_src = $.utility('tokenizeString', $.utility('extractDataFromRecord', data, childdef['backgroundimage']), pagedef);
					if(childdef['src'] != "" && childdef['src'] != bgimg_src)
						$('#'+childdef['id']).attr("src",$.utility('getImage',childdef['src']));
					else
						$('#'+childdef['id']).attr("src",$.utility('getImage',bgimg_src));
				}
				if(childdef['imageontap'].indexOf("[") != -1 && childdef['imageontap'].indexOf("]") != -1){
					var imgontap_src = $.utility('tokenizeString', $.utility('extractDataFromRecord', data, childdef['imageontap']), pagedef);
				}
				if(childdef['backgroundimageontap'].indexOf("[") != -1 && childdef['backgroundimageontap'].indexOf("]") != -1){
					var bgimgontap_src = $.utility('tokenizeString', $.utility('extractDataFromRecord', data, childdef['backgroundimageontap']), pagedef);
				}
				
				textButton.applyImageButtonCSS();
			}
			
		};
		
		textButton.applyImageButtonCSS = function(){
			  
			$('#'+childdef['id']).css({'position':'absolute', 'z-index':'0'});
		    $('#'+childdef['id']).css({'height':childdef['frame']['height']*$.mobileweb.device['aspectHratio']+'px','width':childdef['frame']['width']*$.mobileweb.device['aspectWratio']+'px'}); 
		    $('#'+childdef['id']).css({'top':(childdef['frame']['y'] *$.mobileweb.device['aspectHratio'])+'px','left':(childdef['frame']['x']*$.mobileweb.device['aspectWratio']) +'px'});
		    
		    $('#'+childdef['id']+'_label').css({'position':'absolute', 'z-index':'0', 'text-shadow':'none','display':'table-cell'});
		    if(childdef['border']){
		    	$('#'+childdef['id']).css({'border-width':childdef['border']['borderweight'] +"px"});
		    	$('#'+childdef['id']).css({'border-color':$.attributes('color', childdef['border']['bordercolor']).getColorCode()});
		    	$('#'+childdef['id']).css({'border-style':'solid'});
		    }
		    if (childdef['cornerRadius'] != undefined){
				$('#'+childdef['id']).css({'border-radius':childdef['cornerRadius']});
			}
		    $('#'+childdef['id']+'_label').css({'height': (childdef['frame']['height']*$.mobileweb.device['aspectHratio'])+'px', 'width': (childdef['frame']['width']*$.mobileweb.device['aspectWratio'])+'px'});
		    $('#'+childdef['id']+'_label').css({'padding-left': childdef['padding']['left'] *$.mobileweb.device['aspectWratio'],'padding-top' :childdef['padding']['top'] * $.mobileweb.device['aspectHratio'],'padding-right' :childdef['padding']['right'] *$.mobileweb.device['aspectWratio'],'padding-bottom' :childdef['padding']['bottom'] * $.mobileweb.device['aspectHratio']});
		    $('#'+childdef['id']+'_label').css({'text-align': childdef['font']['align']});
		    $('#'+childdef['id']+'_label').css({'color': $.attributes('color', childdef['font']['color']).getColorCode()});
		    $('#'+childdef['id']+'_label').css({'font-weight':'normal', 'font-size': (childdef['font']['size'] *$.mobileweb.device['aspectHratio'])+'px' });
		    if(childdef['font']['weight'] === true)
		    	 $('#'+childdef['id']+'_label').css({'font-weight':'bold'});
		    
 		    if($('#'+childdef['id']) != undefined && $('#'+childdef['id'])['length'] > 0){
 			    if (childdef['verticalalignment'] =='bottom'){
 	 		    	$('#'+childdef['id']+'_label').css({top:((parseInt(childdef['frame']['y']) + (parseInt(childdef['frame']['height']) - parseInt(childdef['padding']['bottom'])) - parseInt((childdef['font']['size']))) * $.mobileweb.device['aspectHratio'])+'px', left:(childdef['frame']['x']*$.mobileweb.device['aspecWtratio']) +'px'});
 	  			}else if (childdef['verticalalignment'] =='middle'){
 	  				var topValue = parseInt(childdef['frame']['y']) + (parseInt(childdef['frame']['height']) - (parseInt(childdef['padding']['top']) + parseInt(childdef['padding']['bottom']) + parseInt(childdef['font']['size']))) / 2;
 	  				$('#'+childdef['id']+'_label').css({top: topValue * $.mobileweb.device['aspectHratio']+'px', left:(childdef['frame']['x']*$.mobileweb.device['aspectWratio']) +'px'});
 	  				
 	  				var diffHeight = Math.abs(parseFloat($('#'+childdef['id']+'_label').css('top').replace('px','')) - parseFloat($('#'+childdef['id']).css('top').replace('px','')));
 	  				if(!isNaN(diffHeight)){
 		  				var newHeight = parseFloat($('#'+childdef['id']+'_label').css('height').replace('px','')) - diffHeight;
 		  				$('#'+childdef['id']+'_label').css({height: newHeight+"px"});
 	  				}
 	  				
 	  			}else if (childdef['verticalalignment'] =='top'){
 	  				$('#'+childdef['id']+'_label').css({padding:""});
 	  				var new_width = childdef['frame']['width']*$.mobileweb.device['aspectWratio'] - childdef['padding']['left']*$.mobileweb.device['aspectWratio'] - childdef['padding']['right']*$.mobileweb.device['aspectWratio'];
 	  				$('#'+childdef['id']+'_label').css({width:new_width + "px"});
 	  				var new_height = childdef['frame']['height']*$.mobileweb.device['aspectHratio'] - childdef['padding']['top']*$.mobileweb.device['aspectHratio'] - childdef['padding']['bottom']*$.mobileweb.device['aspectHratio'];
 	  				$('#'+childdef['id']+'_label').css({height:new_height + "px"});
 	  				$('#'+childdef['id']+'_label').css({top:((parseInt(childdef['frame']['y']) + parseInt(childdef['padding']['top'])) * $.mobileweb.device['aspectHratio'])+'px', left:(childdef['frame']['x']*$.mobileweb.device['aspectWratio']) +'px'});
 	  			}
 		   }
 		    
 		   $('#'+childdef['id'] + '_label').css({'text-decoration': childdef['textDecoration']});
		};
		
		textButton.re_createTextButton = function(){
			var html = document.getElementById(childdef['id']).outerHTML;
			var str = "<img id='"+childdef['id']+"'name='"+childdef['name'] +"' src='"+$.utility('getImage',childdef['backgroundimageontap'])+"'><label for='"+childdef['id']+"'class='ui-label' id='"+childdef['id']+"_label' name='"+childdef['name']+"'>"+childdef['value']+"</label></img>";
			document.getElementById(childdef['id']).outerHTML = html.replace(html,str);
			textButton.applyImageButtonCSS();
			$('#'+childdef['id']).unbind("click");
			$('#'+childdef['id']+"_label").click(function(){
				new $.actions(pagedef, textButton, childdef['events']['Tap'].slice()).execute();
			});
			$('#'+childdef['id']).click(function(){
				new $.actions(pagedef, textButton, childdef['events']['Tap']).execute();
			});
		};
		
		//this function is needed for all of the UI objects
		textButton.getValue = function(){
			return '';
		};
		textButton.setValue = function(param){
			childdef['value'] = param;
			$('#'+childdef['id']+' .ui-btn-text').text(param);
			if(document.getElementById(childdef['id']+'_label') == null){
				$('#'+childdef['id']+' .ui-btn-text').text(param);
			}else $('#'+childdef['id']+"_label").text(param);
		};
		
		textButton.setSrc = function(param){
			childdef['src'] = param;
		};
		
		textButton.setLineHeight = function(param){
			if(param){
			   $('#'+childdef['id']).css({'line-height':childdef['frame']['height']*$.mobileweb.device['aspectratio']+'px'});
			}
		};
		
		textButton.setHiddenProperty = function(param){
			if(param=="true"){
				$('#'+childdef['id']).css({'visibility':'hidden'});
				$('#'+childdef['id']+'_label').css({'visibility':'hidden'});
			}else{
				$('#'+childdef['id']).css({'visibility':''});
				$('#'+childdef['id']+'_label').css({'visibility':''});
			}
		};
		
		textButton.applyEvents = function(){
		    
			if (childdef['backgroundimage']==="." || childdef['backgroundimage'] === ""){
				if(childdef['events']){
					if(childdef['events']['Tap']){
						var isMobile = (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Windows Phone/i.test(navigator.userAgent)) ? true : false;		
						if(isMobile){
							$('#'+childdef['id']).off('tap').on("tap",function(){
								new $.actions(pagedef, textButton, JSON.parse(JSON.stringify(childdef['events']['Tap']).slice())).execute();
								if (childdef['backgroundimageontap']!=="."  && childdef['backgroundimageontap'] !== ""){//Bug #12404 fix
									textButton.re_createTextButton();
					    		}
					    	});
						}else{
							$('#'+childdef['id']).off('click').on("click",function(e){
								if(childdef['id'].indexOf("tile-") != -1){
									setTimeout(function(){
										new $.actions(pagedef, textButton, JSON.parse(JSON.stringify(childdef['events']['Tap']).slice())).execute();
										if (childdef['backgroundimageontap']!=="."  && childdef['backgroundimageontap'] !== ""){
											textButton.re_createTextButton();
							    		}
									},200);
								}else{
									new $.actions(pagedef, textButton, JSON.parse(JSON.stringify(childdef['events']['Tap']).slice())).execute();
									if (childdef['backgroundimageontap']!=="."  && childdef['backgroundimageontap'] !== ""){
										textButton.re_createTextButton();
						    		}
								}
					    	});
						}
				    }
			    }else if (childdef['backgroundimageontap']!=="."){
			    	textButton.re_createTextButton();
			    }
			}else {
				$('#'+childdef['id']+"_label").bind("taphold",function(){
					if (childdef['backgroundimageontap']!=="."){
						$('#'+childdef['id']).attr('src',$.utility('getImage',childdef['backgroundimageontap']));
	    			}
				});
			
				$('#'+childdef['id']).bind("taphold",function(){
					if (childdef['backgroundimageontap']!=="."){
						$('#'+childdef['id']).attr('src',$.utility('getImage',childdef['backgroundimageontap']));
	    			}
				});
				
				$('#'+childdef['id']+"_label").off('click').on("click",function(e){
					if (childdef['backgroundimageontap']!=="."){
						if(childdef['backgroundimageontap'].indexOf("[") != -1 && childdef['backgroundimageontap'].indexOf("]") != -1){
							var bgimgontap_src = $.utility('tokenizeString', $.utility('extractDataFromRecord', data, childdef['backgroundimageontap']), pagedef);
							$('#'+childdef['id']).attr("src",$.utility('getImage',bgimgontap_src));
						}else
							$('#'+childdef['id']).attr('src',$.utility('getImage',childdef['backgroundimageontap']));
	    			}
					if(childdef['events']){
						if(childdef['events']['Tap']){
							
							var $link = $(event.target);
							event.preventDefault();
						    if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
//						    	new $.actions(pagedef, textButton, JSON.parse(JSON.stringify(childdef['events']['Tap']).slice())).execute();
						    	if(childdef['id'].indexOf("tile-") != -1){
						    		setTimeout(function(){
						    			new $.actions(pagedef, textButton, JSON.parse(JSON.stringify(childdef['events']['Tap']).slice())).execute();
						    		},200);
						    	}else{
						    		new $.actions(pagedef, textButton, JSON.parse(JSON.stringify(childdef['events']['Tap']).slice())).execute();
						    	}
								if (childdef['backgroundimage']!=="."){
									setTimeout(function(){
										if(childdef['backgroundimage'].indexOf("[") != -1 && childdef['backgroundimage'].indexOf("]") != -1){
											var bgimg_src = $.utility('tokenizeString', $.utility('extractDataFromRecord', data, childdef['backgroundimage']), pagedef);
											$('#'+childdef['id']).attr("src",$.utility('getImage',bgimg_src));
										}else
											$('#'+childdef['id']).attr('src',$.utility('getImage',childdef['backgroundimage']));
									}, 1000);
				    			}
						    }
						    $link.data('lockedAt', +new Date());
							
//							new $.actions(pagedef, textButton, JSON.parse(JSON.stringify(childdef['events']['Tap']).slice())).execute();
//
//							if (childdef['backgroundimage']!=="."){
//								setTimeout(function(){
//									if(childdef['backgroundimage'].indexOf("[") != -1 && childdef['backgroundimage'].indexOf("]") != -1){
//										var bgimg_src = $.utility('tokenizeString', $.utility('extractDataFromRecord', data, childdef['backgroundimage']), pagedef);
//										$('#'+childdef['id']).attr("src",$.utility('getImage',bgimg_src));
//									}else
//										$('#'+childdef['id']).attr('src',$.utility('getImage',childdef['backgroundimage']));
//								}, 1000);
//			    			}
					    }
			    	}else if (childdef['backgroundimage']!=="."){
			    		setTimeout(function(){
			    			if(childdef['backgroundimage'].indexOf("[") != -1 && childdef['backgroundimage'].indexOf("]") != -1){
								var bgimg_src = $.utility('tokenizeString', $.utility('extractDataFromRecord', data, childdef['backgroundimage']), pagedef);
								$('#'+childdef['id']).attr("src",$.utility('getImage',bgimg_src));
							}else
								$('#'+childdef['id']).attr('src',$.utility('getImage',childdef['backgroundimage']));
						}, 1000);
	    			}
	    		});
				$('#'+childdef['id']).off('click').on("click",function(e){
					if (childdef['backgroundimageontap']!=="."){
						if(childdef['backgroundimageontap'].indexOf("[") != -1 && childdef['backgroundimageontap'].indexOf("]") != -1){
							var bgimgontap_src = $.utility('tokenizeString', $.utility('extractDataFromRecord', data, childdef['backgroundimageontap']), pagedef);
							$('#'+childdef['id']).attr("src",$.utility('getImage',bgimgontap_src));
						}else
							$('#'+childdef['id']).attr('src',$.utility('getImage',childdef['backgroundimageontap']));
	    			}
					if(childdef['events']){
						if(childdef['events']['Tap']){
							
							var $link = $(e.target);
						    e.preventDefault();
						    if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
						    	//new $.actions(pagedef, textButton, JSON.parse(JSON.stringify(childdef['events']['Tap']).slice())).execute();
						   	 	if(childdef['id'].indexOf("tile-") != -1){
									setTimeout(function(){
										new $.actions(pagedef, textButton, JSON.parse(JSON.stringify(childdef['events']['Tap']).slice())).execute();
									},200);
								}else{
									new $.actions(pagedef, textButton, JSON.parse(JSON.stringify(childdef['events']['Tap']).slice())).execute();
								}
								if (childdef['backgroundimage']!=="."){
									setTimeout(function(){
										if(childdef['backgroundimage'].indexOf("[") != -1 && childdef['backgroundimage'].indexOf("]") != -1){
											var bgimg_src = $.utility('tokenizeString', $.utility('extractDataFromRecord', data, childdef['backgroundimage']), pagedef);
											$('#'+childdef['id']).attr("src",$.utility('getImage',bgimg_src));
										}else
											$('#'+childdef['id']).attr('src',$.utility('getImage',childdef['backgroundimage']));
									}, 1000);
				    			}	
						    }
						    $link.data('lockedAt', +new Date());
							
//							new $.actions(pagedef, textButton, JSON.parse(JSON.stringify(childdef['events']['Tap']).slice())).execute();
//							
//								if (childdef['backgroundimage']!=="."){
//									setTimeout(function(){
//										if(childdef['backgroundimage'].indexOf("[") != -1 && childdef['backgroundimage'].indexOf("]") != -1){
//											var bgimg_src = $.utility('tokenizeString', $.utility('extractDataFromRecord', data, childdef['backgroundimage']), pagedef);
//											$('#'+childdef['id']).attr("src",$.utility('getImage',bgimg_src));
//										}else
//											$('#'+childdef['id']).attr('src',$.utility('getImage',childdef['backgroundimage']));
//									}, 1000);
//				    			}	
					    }
			    	}else if (childdef['backgroundimage']!=="."){
			    		setTimeout(function(){
			    			if(childdef['backgroundimage'].indexOf("[") != -1 && childdef['backgroundimage'].indexOf("]") != -1){
								var bgimg_src = $.utility('tokenizeString', $.utility('extractDataFromRecord', data, childdef['backgroundimage']), pagedef);
								$('#'+childdef['id']).attr("src",$.utility('getImage',bgimg_src));
							}else
								$('#'+childdef['id']).attr('src',$.utility('getImage',childdef['backgroundimage']));
						}, 1000);
	    			}
	    		});
			}
			//--LOGIC ENDS HERE----
			
			$('#'+childdef['id']+"_label").mousedown(function () {
				if(childdef['border']['borderweight'] == 0)
					$('#'+childdef['id']).css("border", "1px solid #ECECEC");
			}).mouseup(function () {
				if(childdef['border']['borderweight'] == 0)
					$('#'+childdef['id']).css("border", "none");
			});
			
			$('#'+childdef['id']).mousedown(function () {
				if($('#'+childdef['id'] + '> div').length > 0)
					$('#'+childdef['id'] + '> div').css("box-shadow", "0 0 12px #387bbe");
				if(childdef['border']['borderweight'] == 0)
					$('#'+childdef['id']).css("border", "1px solid #ECECEC");
			}).mouseup(function () {
				setTimeout(function(){
					if($('#'+childdef['id'] + '> div').length > 0)
						$('#'+childdef['id'] + '> div').css("box-shadow", "none");
				},300)
				if(childdef['border']['borderweight'] == 0)
					$('#'+childdef['id']).css("border", "none");
			});
			
			$('#'+childdef['id']).focus(function () {
				$('#'+childdef['id']).css("outline", "none");
				childdef['tab'] = "";
				$(window).keyup(function (e) {
			        var code = (e.keyCode ? e.keyCode : e.which);
			        if (e.key === 'Tab' || e.keyCode == 9) {
			        	if ( e.shiftKey ){
			        		childdef['tab'] = "shifttab";
			        	}else{
			        		childdef['tab'] = "tab";
			        	}
			        }
			    });
							
				setTimeout(function(){
					if(childdef['tab'] === "tab" || childdef['tab'] === "shifttab")
						$('#'+childdef['id']).css("box-shadow", "0 0 12px #387bbe");
					else{
						if(childdef['border']['borderweight'] == 0)
							$('#'+childdef['id']).css("border", "1px solid #ECECEC");
					}		
				},200);
			}).focusout(function () {
				$('#'+childdef['id']).css("box-shadow", "none");
			});
			
			$('#'+childdef['id']).keypress(function (e) {
				var key = e.which;
				 if(key == 13)  // the enter key code
				  {
					$('#'+childdef['id']).css("box-shadow", "none");
					$('#'+childdef['id']).click();
				    return false;  
				  }
			})
			
			$('#'+childdef['id']+"_label").mouseover(function(event){//Bug #13038 fix
				$('#'+childdef['id']).css({'cursor':'pointer'});
				$('#'+childdef['id']+"_label").css({'cursor':'pointer'});
			});
			
			if(childdef['events'] && childdef['events']['flick']){
				$('#'+childdef['id']).swipe(function(){ 
					new $.actions(pagedef, textButton, childdef['events']['flick'].slice()).execute();
				});
			}
			if(childdef['events'] && childdef['events']['flickRL']){
				$('#'+childdef['id']).on("swipeleft",function(){ 
					new $.actions(pagedef, textButton, childdef['events']['flickRL'].slice()).execute();
				});
			}
			if(childdef['events'] && childdef['events']['flickLR']){
				$('#'+childdef['id']).on("swiperight",function(){ 
					new $.actions(pagedef, textButton, childdef['events']['flickLR'].slice()).execute();
				});
			}
		};
		
		return textButton;
	};
		
	function uiCheckBox(pagedef, childdef, data){
		var checkBox =  new BaseView(childdef);
		
		checkBox.getTemplate = function(){
			return childdef['template'];
		};
		
		var valueType = "OnOrOff";
		if(childdef['text']){
			childdef['text']= $.utility('convertSpecialCharacter', $.utility('tokenizeString', childdef['text']));// for globalValues bugId:7983 25jan16
		}
		checkBox.getHTML = function(){
			childdef['taborder'] =  parseInt(childdef['taborder'])+1;
			return ["<fieldset id='",childdef['id'],"' tabindex='",childdef['taborder'],"'> <input ", childdef['value'] == "on" ? "checked = 'checked'" : '' ," id='",childdef['id']+childdef['name'],"' name='",childdef['name'] , "' type='",childdef['type'],"' data-role='none' /><div style=' position:absolute; line-height:",childdef['frame']['height']*$.mobileweb.device['aspectHratio'],"px'><img id='"+childdef['id']+"image"+"'style='vertical-align:top' src='",checkBox.setInitialImage(),"'/></div><div style=' position:absolute; width:",(childdef['frame']['width']-childdef['frame']['height'])*$.mobileweb.device['aspectWratio'],"px; height:",childdef['frame']['height']*$.mobileweb.device['aspectHratio'],"px;line-height:",childdef['frame']['height']*$.mobileweb.device['aspectHratio'],"px'><label style='line-height:normal' id='",childdef['id']+childdef['type'],"' for='",childdef['id']+childdef['name'],"'>",checkBox.setText(childdef['text'])," </label></div></fieldset>"].join('');
		};
		
		checkBox.applyOverrides = function(){
			checkBox['frame'].applyCSS();
			checkBox['font'].applyCSS();
			
			if(childdef['hidden']=="true"){
				$('#'+childdef['id']).css({'visibility':'hidden'});
			}
			if(childdef['border']){
				var weight = childdef['border']['borderweight'] +"px";
				if(weight != '0px'){
					$('#'+childdef['id']).css({'border':weight +' solid '+ color});				
					$('#'+childdef['id']).css({'margin':'0px'});
					var color = 'rgba('+childdef['border']['bordercolor']['red']+','+childdef['border']['bordercolor']['green']+','+childdef['border']['bordercolor']['blue']+','+childdef['border']['bordercolor']['alpha']+')';
					$('#'+childdef['id']).css({'border':weight +' solid '+ color});				
					$('#'+childdef['id']).css({'margin':'0px'});
				}
			}
			if(childdef['background']){
				$('#'+childdef['id']).css({'background-color':$.attributes('color', childdef['background']).getColorCode()});
			}
			
			$('#'+childdef['id']).css({'background-size': '100% 100%','background-repeat': 'no-repeat no-repeat'});
			
			if(childdef['template']){
				childdef['valueFormat'] =$.utility('tokenizeString', $.utility('extractDataFromRecord', data, childdef['template']), pagedef);

				// we have to set 'valueFormat' as either 0 or 1 to be sync with other RT. Dated : 10-Jan-2018 --> Akshay
				if(childdef['valueFormat'] == 'yes' || childdef['valueFormat'] == '1' || childdef['valueFormat'] == 'on' || childdef['valueFormat'] == 'true'){
					childdef['valueFormat'] = '1';
				}else if(childdef['valueFormat'] == 'no' || childdef['valueFormat'] == '0' || childdef['valueFormat'] == 'off' || childdef['valueFormat'] == 'false'){
					childdef['valueFormat'] =  '0';
				}
			}
			checkBox.setValue(childdef['valueFormat']);
			
			if(childdef['padding']){// fix for 7016
 				$('#'+childdef['id'] + '> div').css({'line-height': ""});
 			}
			checkBox.setLineHeight(childdef['lineheight']);
			
			
			if(childdef['value'] == "on"){
				$('#'+childdef['id']+childdef['name']).attr('checked',true);
				$('#'+childdef['id']+"image").attr('src',checkBox.setInitialImage(childdef['onimage']));
			}else{
				$('#'+childdef['id']+childdef['name']).attr('checked',false);
				$('#'+childdef['id']+"image").attr('src',checkBox.setInitialImage(childdef['offimage']));
			}
		
			if(childdef['offimage']==''&& childdef['onimage']==''){
			
			}			
			else
				$('#'+childdef['id']+'>[name="'+childdef['name']+'"]').css({'display':'none'});
			
			
			$('[for=' +childdef['id']+childdef['name']+']').css({'text-decoration': childdef['textDecoration']});
			$('[for=' +childdef['id']+childdef['name']+']').css({'font-size':childdef['font']['size']});//,'margin-left':'5px' });
			// this line commented for bugId 8275.
	//		$('#'+childdef['id']+childdef['type']).css({'text-overflow':'ellipsis','display':'block','overflow': 'hidden','white-space':'nowrap', 'width':childdef['frame']['width']*$.mobileweb.device['aspectratio']-44-5, 'height':childdef['frame']['height']*$.mobileweb.device['aspectratio']});
			
			// considering 'checkbox icon' as square & providing some gap from boundaries.
			var _gapCheckicon = 0;//4 *$.mobileweb.device['aspectHratio'];
			$('#'+childdef['id'] + '> div').first().css({'top': _gapCheckicon, 'bottom': _gapCheckicon, 'left': _gapCheckicon,'max-width':'40px'});
			$('#'+childdef['id'] + '> div').first().css({'height': (childdef['frame']['height']*$.mobileweb.device['aspectHratio'] - 2*_gapCheckicon), 'width': (childdef['frame']['height']*$.mobileweb.device['aspectHratio'] - 2*_gapCheckicon)});
			$('#'+childdef['id'] + '> div > img').first().css({'height': 'inherit', 'width': 'inherit'});
			
			$('#'+childdef['id'] + '> div').last().css({'margin-left': (childdef['frame']['height']*$.mobileweb.device['aspectHratio'] - _gapCheckicon)});
 			$('#'+childdef['id'] + '> div').last().css({'height': (childdef['frame']['height'] - childdef['padding']['top'] - childdef['padding']['bottom'])*$.mobileweb.device['aspectHratio']});
 			$('#'+childdef['id'] + '> div').last().css({'width': (childdef['frame']['width'])*$.mobileweb.device['aspectWratio'] - (childdef['frame']['height']*$.mobileweb.device['aspectHratio'] - _gapCheckicon)});
 			$('#'+childdef['id'] + '> div').last().css({'padding-top': childdef['padding']['top']*$.mobileweb.device['aspectHratio'], 'padding-bottom': childdef['padding']['bottom']*$.mobileweb.device['aspectHratio']});
 			$('#'+childdef['id'] + '> div').last().css({'vertical-align': childdef['verticalalignment']});
 			
 			var hei = parseFloat($('#'+childdef['id']).css('height'));
 			var padtop = childdef['padding']['top']*$.mobileweb.device['aspectHratio'];
 			var padbottom = childdef['padding']['bottom']*$.mobileweb.device['aspectHratio'];
 			var font = childdef['font']['size']*$.mobileweb.device['aspectHratio'];
  			if (childdef['verticalalignment'] == "middle"){
 				var diff = (hei - padtop - padbottom - font)/2;
 				var top = diff;// + padtop;
 				$('#'+childdef['id'] + '> div').last().css({'height': hei - diff, 'line-height':hei+'px'});
 			}else if (childdef['verticalalignment'] == "bottom"){
 				var topDiff = hei - padtop - padbottom - font;
 				$('#'+childdef['id'] + '> div').last().css({'margin-top': topDiff});
 				$('#'+childdef['id'] + '> div').last().css({'height': (hei - padtop - padbottom - topDiff)});
 			}
  			
  			$('#'+childdef['id']+'label').css({'line-height':'1.5'});
  			if(childdef['text'] != "")
  				$('#'+childdef['id'] + '> div > label').css({'margin-left': childdef['padding']['left']*$.mobileweb.device['aspectWratio'], 'margin-right': childdef['padding']['right']*$.mobileweb.device['aspectWratio']});
  			else{
  				var _checkboxWidth = $('#'+childdef['id'] + '> div').first().css('width');
  				$('#'+childdef['id']).css({'width': _checkboxWidth});
  				$('#'+childdef['id'] + '> div').last().css({'width':'0px'});
  			}
  			$('#'+childdef['id']+'checkbox').css({'line-height':''});
		};
		 
		checkBox.setText= function(){
			if(childdef['text']==""){
				return "";
			}else return childdef['text'];
		
		};
		
		checkBox.setLineHeight = function(param){
			if(param){
				$('#'+childdef['id']).css({'line-height':param+'px'});
			}
		};
		
		checkBox.setInitialImage = function(){
			if(childdef['value'] == "on"){
				if(childdef['onimage']=="checked-44px.png"){
					return $.utility('getSystemImage',childdef['onimage'],childdef['viewtype']);
				}else
					return $.utility('getImage',childdef['onimage']);
				}else{
					if(childdef['offimage']=="unchecked-44px.png"){
						return $.utility('getSystemImage',childdef['offimage'],childdef['viewtype']);
					}else{
						return $.utility('getImage',childdef['offimage']);
					}
			}
		};
			
		checkBox.parseValue = function(value){
			value = value.toLowerCase();
			switch(value){
				case 'true':
				case '"true"':
					childdef['valueFormat'] = "true";
					valueType = "TrueOrFalse";
					return "on";
					break;
				case 'false':
				case '"false"':
					childdef['valueFormat'] = "false";
					valueType = "TrueOrFalse";
					return "off";
					break;
				case 'on':
					childdef['valueFormat'] = "on";
					valueType = "OnOrOff";
					return "on";
					break;
				case 'off':
					childdef['valueFormat'] = "off";
					valueType = "OnOrOff";
					return "off";
					break;
				case '1':
					childdef['valueFormat'] = "1";
					valueType = "ZeroOrOne";
					return "on";
					break;
				case '0':
					childdef['valueFormat'] = "0";
					valueType = "ZeroOrOne";
					return "off";
					break;
				case 'yes':
				case '"yes"':
					childdef['valueFormat'] = "yes";
					valueType = "YesOrNo";
					return "on";
					break;
				case 'no':
				case '"no"':
					childdef['valueFormat'] = "no";
					valueType = "YesOrNo";
					return "off";
					break;
				default:
					childdef['valueFormat'] = "off";
					valueType = "OnOrOff";
					return "off";
					
			}
		};
			
		checkBox.setImage = function(param){
			if(param=="checked-44px.png"||param=="unchecked-44px.png" ){
				$('#'+childdef['id']+'>[name="'+childdef['name']+'"]').css({'display':'none'});
				$('#'+childdef['id']+"image").attr('src',$.utility('getSystemImage',param,childdef['viewtype']));
			}else{
				$('#'+childdef['id']+'>[name="'+childdef['name']+'"]').css({'display':'none'});
				$('#'+childdef['id']+"image").attr('src',$.utility('getImage',param));
			}
				
		};
		
		checkBox.applyEvents = function(){
			
			$('#'+childdef['id']+"image").bind('click', function (evt) {
				if($('#'+childdef['id']+childdef['name']).is(':checked')){
					$('#'+childdef['id']+childdef['name']).attr('checked',false);
				}else{
					$('#'+childdef['id']+childdef['name']).attr('checked',true);
				}
				
					$('#'+childdef['id']+childdef['name']).trigger("change");
					
			});
			
			$('#'+childdef['id']).keypress(function (e) {
				var key = e.which;
				if(key == 32){   
					$('#'+childdef['id']+"image").click();
					return false;  
				}
			})
			
			$('#'+childdef['id']+childdef['name']).change(function(){
				if($('#'+childdef['id']+childdef['name']).is(':checked')){
					checkBox.setImage(childdef['onimage']);
					childdef['value'] = "on";
					childdef['template'] = "true";
				}else{
					checkBox.setImage(childdef['offimage']);
					childdef['value'] = "off";
					childdef['template'] = "false";
				}
					
				if(valueType === "TrueOrFalse"){
					childdef['valueFormat'] = (childdef['valueFormat']==="true") ? "false" : "true"  ;
				}else if(valueType === "OnOrOff"){
					childdef['valueFormat'] = (childdef['valueFormat']==="on") ? "off" : "on"  ;
				}else if(valueType === "ZeroOrOne"){
					childdef['valueFormat'] = (childdef['valueFormat']==="1") ? "0" : "1"  ;
				}else if(valueType === "YesOrNo"){
					childdef['valueFormat'] = (childdef['valueFormat']==="yes") ? "no" : "yes"  ;
				}else{
					childdef['valueFormat'] = childdef['valueFormat'];
				}
				
			});
			
			if(childdef['events']){
				if(childdef['events']['Tap'])
					$('#'+childdef['id']+childdef['name']).change(function(){
						new $.actions(pagedef, checkBox, childdef['events']['Tap'].slice()).execute();

					});
				if(childdef['events']['On'])
					$('#'+childdef['id']+childdef['name']).change(function(){
						if($('#'+childdef['id']+childdef['name']).is(":checked")){
							new $.actions(pagedef, checkBox, childdef['events']['On'].slice()).execute(); 

						}
					});
				if(childdef['events']['Off'])
					$('#'+childdef['id']+childdef['name']).change(function(){
						if(!($('#'+childdef['id']+childdef['name']).is(":checked"))){
							new $.actions(pagedef, checkBox, childdef['events']['Off'].slice()).execute();

						}
					});
			}			
		};
		
		checkBox.setValue = function(param){
			if(param == ""){
				childdef['valueFormat'] = childdef['value'];
				valueType = "OnOrOff";
			}else{
				childdef['value']=checkBox.parseValue(param);
			}
		};
		
		//this function is needed for all of the UI objects
		checkBox.getValue = function(){
			return childdef['valueFormat'];
		};
  
		return checkBox;
	};
	
	function uiProgressBar(pagedef, childdef){
		var progressBar = new BaseView(childdef);

		progressBar.getTemplate = function(){
			return childdef['template'];
		};
		
		progressBar.getHTML = function(){
			if(childdef['style'] == 'bar')
				return ["<div id='",childdef['id'],"' name='",childdef['name'],"' class='progress_container_",childdef['style'], "' tabindex='",childdef['taborder'],"' ><div class='current_",childdef['style'], "'></div></div>"].join('');
			else if(childdef['style'] == 'circle'){
				return ["<div id='",childdef['id'],"' name='",childdef['name'],"' class='progress progress_container progress_container_",childdef['style'], "' tabindex='",childdef['taborder'],"' ></div>"].join('');
			}
			else
				return ["<div id='",childdef['id'],"' name='",childdef['name'],"' class='progress progress_container progress_container_",childdef['style'], "' tabindex='",childdef['taborder'],"' ><div class='progress progress_current progress_current_",childdef['style'], "'></div></div>"].join('');
		};
  
		progressBar.applyOverrides = function(){
			progressBar['frame'].applyCSS();
			
			if(childdef['hidden'] && childdef['hidden'] == "true" || childdef['hidden'] && childdef['hidden'] == true){
				$("#"+childdef['id']).css({'visibility':'hidden'});
			}
			
			var aspect = $.mobileweb.device['aspectratio'];
			if(childdef['style'] == 'bar'){
				$("#"+childdef['id']).css({'height':childdef['frame'].height * $.mobileweb.device['aspectHratio']+'px'});
				$("#"+childdef['id']).css({'box-shadow':'none'});					

				$("#"+childdef['id']).children("div").css({'height':childdef['frame'].height * $.mobileweb.device['aspectHratio']+'px'});
				$("#"+childdef['id']).children("div").css({'margin-top':'0.5px', 'margin-bottom':'0.5px'});

				if(childdef['background']){
					$('#'+childdef['id']).css({'background-color':$.attributes('color', childdef['background']).getColorCode()});
				}else{
					childdef['background'] = {red:0,blue:255,green:51,alpha:0.8};
					$('#'+childdef['id']).css({'background-color':$.attributes('color', childdef['background']).getColorCode()});
				}
				
				if(childdef['border']){
					$('#'+childdef['id']).css({'border-width':childdef['border']['borderweight'] +"px",'border-radius':childdef['cornerRadius'] +"px"});
					$('#'+childdef['id']).css({'border-color':$.attributes('color', childdef['border']['bordercolor']).getColorCode()});
				}
				
				if(childdef['fill']){
					$('#'+childdef['id']).children("div").css({'background-color':$.attributes('color', childdef['fill']).getColorCode()});
				}else{
					childdef['fill'] = {red:255,blue:255,green:255,alpha:1.0};
					$('#'+childdef['id']).children("div").css({'background-color':$.attributes('color', childdef['fill']).getColorCode()});
				}
				
			}else if(childdef['style'] == 'circle'){
				var arcWidth = 8;
				var arcRadius = parseInt(childdef['radius'])* aspect;
				var diaMeter = 2* arcRadius;
				
				$("#"+childdef['id']).css({'height':diaMeter+'px', 'width':diaMeter+'px'});
				//canvas dimensions should be equal to diaMeter (i.e. 2 times of arcRadius)
				var c = document.createElement("Canvas");
				c.setAttribute("id", childdef['id']+"_canvas");
				c.setAttribute("width",diaMeter+'px');
				c.setAttribute("height",diaMeter+'px');
				document.getElementById(childdef['id']).appendChild(c);
				
				var bgctx = c.getContext("2d");
				bgctx.beginPath();
				bgctx.arc(arcRadius, arcRadius, (childdef['radius']-arcWidth/2)*aspect, 0, 2*Math.PI);		//radius of the arc should not include arcWidth, since it will be covered into lineWidth
				bgctx.strokeStyle = $.attributes('color', childdef['background']).getColorCode();
				bgctx.lineWidth = arcWidth*aspect;
				bgctx.stroke();
				
				var lblFontSize = 14;
				var x = document.createElement("LABEL");
				x.setAttribute("id", childdef['id']+"_lblProgress");
				var t = document.createTextNode("0%");
				x.appendChild(t);
				document.getElementById(childdef['id']).appendChild(x);
				$("#"+childdef['id']+"_lblProgress").insertAfter(document.getElementById(childdef['id']));
				$("#"+childdef['id']+"_lblProgress").css({'position': 'absolute', 'width':(diaMeter -(2*arcWidth*aspect))+'px'});
				$("#"+childdef['id']+"_lblProgress").css({'top':(parseInt(childdef['frame']['y'])- lblFontSize/2)*$.mobileweb.device['aspectHratio'] + (parseInt(childdef['radius']))*aspect+'px', 'left':(parseInt(childdef['frame']['x'])+arcWidth)*$.mobileweb.device['aspectWratio']+'px'});
				$("#"+childdef['id']+"_lblProgress").css({'text-align':'center', 'font-size':(lblFontSize*aspect)+'px', 'color':childdef['fill']});
				if(childdef['hidden'] && childdef['hidden'] == "true"){
					$("#"+childdef['id']+"_lblProgress").css({'visibility':'hidden'});
				}
			}
			
			progressBar.setProgress(childdef['value']);
		};	
		
		progressBar.reset = function(){
			var aspect = $.mobileweb.device['aspectratio'];
			$("#"+childdef['id']+"_canvas").remove();
			var arcWidth = 8;
			var arcRadius = parseInt(childdef['radius'])* aspect;
			var diaMeter = 2* arcRadius;
			
			$("#"+childdef['id']).css({'height':diaMeter+'px', 'width':diaMeter+'px'});
			//canvas dimensions should be equal to diaMeter (i.e. 2 times of arcRadius)
			var c = document.createElement("Canvas");
			c.setAttribute("id", childdef['id']+"_canvas");
			c.setAttribute("width",diaMeter+'px');
			c.setAttribute("height",diaMeter+'px');
			document.getElementById(childdef['id']).appendChild(c);
			
			var bgctx = c.getContext("2d");
			bgctx.beginPath();
			bgctx.arc(arcRadius, arcRadius, (childdef['radius']-arcWidth/2)*aspect, 0, 2*Math.PI);		//radius of the arc should not include arcWidth, since it will be covered into lineWidth
			bgctx.strokeStyle = $.attributes('color', childdef['background']).getColorCode();
			bgctx.lineWidth = arcWidth*aspect;
			bgctx.stroke();
		},
		
		progressBar.setProgress=function(param){
			var initialVal = childdef['value'];
			childdef['value'] = param;
			if($.utility('getSessionData',"progressBarObj",childdef['id'])!=null)
			{
				var progressBarObj = $.utility('getSessionData',"progressBarObj",childdef['id']);
				progressBarObj = $.parseJSON(progressBarObj);		
				if($.mobileweb.getCurrentPage().getName()==progressBarObj["page_name"] && childdef['id']==progressBarObj["u_id"])
				{
					var _Page = $.utility('getObject',$.mobileweb['pages'],'name',progressBarObj['page_name']);
					if(_Page['parent'].indexOf("tab") != -1 || _Page['parent'].indexOf("Tab") != -1)
						param = progressBarObj["targetValue"];
				}
			}
			
			var aspect = $.mobileweb.device['aspectratio'];
			
			if(childdef['style'] == 'bar'){				
				var current = ((childdef['frame'].width * $.mobileweb.device['aspectWratio']) * (param * 100)) / 100;
				$("#"+childdef['id']).children("div").css({'border-radius':childdef['cornerRadius']+'px'});
				$("#"+childdef['id']).children("div").animate({'width':current+'px'});
			}			
			else if(childdef['style'] == 'circle'){
				if(param != 0){
					var arcWidth = 8;
					var c = document.getElementById(childdef['id']+"_canvas");
					var angle=0;
					var e = 0;
					var direction=1;
					var PI=Math.PI;
					var arcAngle = (2*param-0.5)*PI;
					
					if(c != null){
						var fillctx = c.getContext("2d");
						function animate(){
							fillctx.clearRect(0,0,300,300);
							angle+=PI/30;
							e=Math.min(angle-PI/2,arcAngle);
							if(angle<0 || angle>PI*2){
								angle=0;
								direction*=-1;
							}
							draw();
							if(e < arcAngle){
								requestAnimationFrame(animate);
							}else{
								return;
							}
						}

						function draw(){
							var counterclockwise=(direction>0)?false:true;
							var s=-PI/2;
							var PI2 = PI * 2;
							fillctx.beginPath();
							fillctx.arc((childdef['radius']*aspect),(childdef['radius']*aspect),(childdef['radius']-arcWidth/2)*aspect,s,e,counterclockwise);
							fillctx.stroke();
							
							//console.log("radians--",e-s);
							var d = (e-s)*(180/PI);
							//console.log("degree--",d);
							var p =  parseInt((d / 360)* 100);
							//console.log("degree--",p);
							
							var progressVal = p + '%';  
							$("#"+childdef['id']+"_lblProgress").html(progressVal);
						}						
						
						fillctx.beginPath();
						requestAnimationFrame(animate);
						fillctx.strokeStyle = $.attributes('color', childdef['fill']).getColorCode();
						fillctx.lineWidth = arcWidth*aspect;
						fillctx.stroke();
						
//		 				if(param == 1){
//		 					fillctx.arc((childdef['radius']*aspect), (childdef['radius']*aspect), (childdef['radius']-arcWidth/2)*aspect, 0 * Math.PI, 2 *Math.PI);
//		 				}else{
//		 					fillctx.arc((childdef['radius']*aspect), (childdef['radius']*aspect), (childdef['radius']-arcWidth/2)*aspect, 1.5 * Math.PI, (2*param-0.5)*Math.PI);
//		 				}
//						fillctx.strokeStyle = $.attributes('color', childdef['fill']).getColorCode();
//						fillctx.lineWidth = arcWidth*aspect;
//						fillctx.stroke();
					}
				}else{
					progressBar.reset();
					var progressVal = parseInt(param*100) + '%';  
					$("#"+childdef['id']+"_lblProgress").html(progressVal);
				}
			}
		};
		
		progressBar.setValue = function(param){
			if($.utility('getSessionData',"progressBarObj",childdef['id'])!=null)
			{
				var progressBarObj = $.utility('getSessionData',"progressBarObj",childdef['id']);
				progressBarObj = $.parseJSON(progressBarObj);		
				if($.mobileweb.getCurrentPage().getName()==progressBarObj["page_name"] && childdef['id']==progressBarObj["u_id"])
				{
					var _Page = $.utility('getObject',$.mobileweb['pages'],'name',progressBarObj['page_name']);
					if(_Page['parent'].indexOf("tab") != -1 || _Page['parent'].indexOf("Tab") != -1)
						param = progressBarObj["targetValue"];
				}
			}
			
			var aspect = $.mobileweb.device['aspectratio'];
			
			if(childdef['style'] == 'bar'){				
				var current = ((childdef['frame'].width * $.mobileweb.device['aspectWratio']) * (param * 100)) / 100;
				$("#"+childdef['id']).children("div").css({'width':current+'px'});
			}			
			else if(childdef['style'] == 'circle' && param != 0){
				var arcWidth = 8;
				var c = document.getElementById(childdef['id']+"_canvas");
 				if(c != null){
					var fillctx = c.getContext("2d");
					fillctx.beginPath();
	 				if(param == 1){
	 					fillctx.arc((childdef['radius']*aspect), (childdef['radius']*aspect), (childdef['radius']-arcWidth/2)*aspect, 0 * Math.PI, 2 *Math.PI);
	 				}else{
	 					fillctx.arc((childdef['radius']*aspect), (childdef['radius']*aspect), (childdef['radius']-arcWidth/2)*aspect, 1.5 * Math.PI, (2*param-0.5)*Math.PI);
	 				}
					fillctx.strokeStyle = $.attributes('color', childdef['fill']).getColorCode();
					fillctx.lineWidth = arcWidth*aspect;
					fillctx.stroke();
				}
				var progressVal = parseInt(param*100) + '%';  
				$("#"+childdef['id']+"_lblProgress").html(progressVal);
			}
		};
		//this function is needed for all of the UI objects
		progressBar.getValue = function(){
			return childdef['value'];
		};
		
		progressBar.applyEvents = function(){
			
		};
		
		progressBar.setVisibility = function(param){
			if(param === true){
				childdef['hidden'] = false;
				$('#'+childdef['id']).css({'visibility':'visible'});
			}else{
				childdef['hidden'] = true;
				$('#'+childdef['id']).css({'visibility' : 'hidden'});
			}
		};	
		
		return progressBar;
	};
	
	
	function uiSearchBar(pagedef, childdef, data){
		var searchBar = new BaseView(childdef);

		searchBar.getTemplate = function(){
			return childdef['template'];
		};
		
		searchBar.getHTML = function(){
			var dataTheme = "";
			if(childdef['barStyle']=='black'){
				dataTheme = 'data-theme=a';
			}else if(childdef['barStyle']=='blue'){
				dataTheme = 'data-theme=b';	
			}else if(childdef['barStyle']=='silver'){
				dataTheme = 'data-theme=c';			
			}else if(childdef['barStyle']=='white'){
				dataTheme = 'data-theme=d';	
			}
		
			if(childdef['value']){
				childdef['value'] = $.utility('spaceInStringConversion',childdef['value']);
				if(data != undefined)
					childdef['value'] = $.utility('convertSpecialCharacter', $.utility('tokenizeString', childdef['value'], pagedef));
				else
					childdef['value'] = $.utility('convertSpecialCharacter', $.utility('tokenizeString', childdef['value']));// for globalValues bugId:7983 25jan16
			}
			return ["<div data-role='fieldcontain' id ='"+childdef['id']+"' > <input type= '"+childdef['type']+"'   id ='"+childdef['id']+"' name ='"+childdef['name']+"' value='"+childdef['value']+"'  placeholder='"+childdef['placeholder']+"' tabindex='"+childdef['taborder']+"' barStyle='"+childdef['barStyle']+"' "+dataTheme+" ></div>"];
		};
		
		searchBar.applyOverrides = function(){
			searchBar['frame'].applyCSS();
			//searchBar['font'].applyCSS();
			
			if(childdef['hidden']){
				$('#'+childdef['id']).css({'visibility':'hidden'});
			}
			
			var _borderWeight = 0;
			if(childdef['border']['borderweight'] != 0)
				_borderWeight = childdef['border']['borderweight'] * $.mobileweb.device['aspectHratio'];
			
			$('#'+childdef['id']+'.ui-field-contain').css({'margin':'0px','padding':'0px','border-width':'0px'});
			$('#'+childdef['id']+' div').css({'overflow':'hidden', 'height':childdef['frame']['height']*$.mobileweb.device['aspectHratio']+'px', 'width':childdef['frame']['width']*$.mobileweb.device['aspectWratio']+'px' });
			$('#'+childdef['id']+'.ui-input-text').css({'color':$.attributes('color', childdef['font']['color']).getColorCode() , 'text-shadow':'none', 'word-break':'break-word'});
			$('#'+childdef['id']+'.ui-input-text').css({'text-align':childdef['font']['align'], 'font-family':childdef['font']['fontName'], 'font-size': parseInt(childdef['font']['size'] *$.mobileweb.device['aspectratio'])+'px'});
			$('#'+childdef['id']+'.ui-input-text').css({'height':childdef['frame']['height']*$.mobileweb.device['aspectHratio']+'px'});
			$('#'+childdef['id']+'.ui-input-text').css({'width':'95%','border-width':'0px','margin-left':'5px' });
			$('#'+childdef['id']+'.ui-input-text').css({'padding-left': childdef['padding']['left']*$.mobileweb.device['aspectWratio'], 'padding-right': childdef['padding']['right']*$.mobileweb.device['aspectWratio']});
			$('#'+childdef['id']+'.ui-input-text').css({'padding-top': childdef['padding']['top']*$.mobileweb.device['aspectHratio'], 'padding-bottom': childdef['padding']['bottom']*$.mobileweb.device['aspectHratio']});
			
 			$('#'+childdef['id']).find('a').css({'padding':'0 0 0 0'});
			$('#'+childdef['id']+' div').css({'background-color':'white'});
			if(childdef['barStyle']=='blue' ){
				$('#'+childdef['id']+' div').css({'border-color':' #5393c5'});
			}
			
			if(childdef['barStyle']=='black'){
				color = "#3C3C3C";
			}else if(childdef['barStyle']=='silver'){
				color = "#D8D8D8";
			}else if(childdef['barStyle']=='white'){
				color = "#C4C4C4";
			}else if(childdef['barStyle']=='blue'){
				color = "#5A7AAF";
			}
			$('#'+childdef['id']).find('span').css({'background-color':color});
			var style = $('<style>#'+childdef['id']+' div.ui-icon-searchfield:after{background-color:'+color+'; }</style>')
			$('html > head').append(style);//--
			
			if(childdef['background']){
				$('#'+childdef['id']+' div').css({'background-color':$.attributes('color', childdef['background']).getColorCode()});
			}
			if(childdef['border']){
				$('#'+childdef['id']+' div').css({'border-width': _borderWeight +"px"});
				$('#'+childdef['id']+' div').css({'border-color': $.attributes('color', childdef['border']['bordercolor']).getColorCode()});
			}

			if (childdef['verticalalignment'] != undefined){
 				$('#'+childdef['id']+'.ui-input-text').css({'vertical-align':childdef['verticalalignment']});
 				
 				var _aspect = $.mobileweb.device['aspectratio'];
 				$('#'+childdef['id']+'.ui-input-text').css({'padding-left': childdef['padding']['left'] *$.mobileweb.device['aspectWratio'], 'padding-right': childdef['padding']['right'] *$.mobileweb.device['aspectWratio']});
 				
 				var _hei = $('#'+childdef['id']).css('height');
 				var _height = parseInt(childdef['frame']['height']) *$.mobileweb.device['aspectHratio'];
 				var _fontsize = parseInt(childdef['font']['size']) *$.mobileweb.device['aspectHratio'];
 				
 				if (childdef['verticalalignment'] =='top'){
 					var padtop = childdef['padding']['top'] * $.mobileweb.device['aspectHratio'];
 					var padbottom = parseInt(_height)-parseInt(_fontsize)-padtop;					
 					
 					$('#'+childdef['id']+'.ui-input-text').css({'padding-top': padtop});
 					if(_fontsize > _height){
 						$('#'+childdef['id']+'.ui-input-text').css({'padding-bottom' : '0px'});
 					}else{
 						$('#'+childdef['id']+'.ui-input-text').css({'padding-bottom' : padbottom});
 					}
 					
 					$('#'+childdef['id']+'.ui-input-text').css({'margin-top':padtop+'px', 'margin-bottom':$('#'+childdef['id']+'.ui-input-text').css('padding-bottom')});
 					
 				}else if (childdef['verticalalignment'] =='bottom'){
 					var padbottom = childdef['padding']['bottom']*$.mobileweb.device['aspectHratio'];
 					var padtop = parseInt(_height)-parseInt(_fontsize)-padbottom;
 					
 					$('#'+childdef['id']+'.ui-input-text').css({'padding-bottom': padbottom});
 					if(_fontsize > _height){
 						$('#'+childdef['id']+'.ui-input-text').css({'padding-top' : '0px'});
 					}else{
 						$('#'+childdef['id']+'.ui-input-text').css({'padding-top' : padtop});
 					}
 					
 				}else{
 					var inputHeight = _height - ((childdef['padding']['top'] + childdef['padding']['bottom']) * $.mobileweb.device['aspectHratio']) +'px';
 					$('#'+childdef['id']+'.ui-input-text').css({'height': inputHeight});
 					$('#'+childdef['id']+'.ui-input-text').css({'padding-top':'0px', 'padding-bottom':'0px'});
 					$('#'+childdef['id']+'.ui-input-text').css({'margin-top':childdef['padding']['top'] * $.mobileweb.device['aspectHratio']+'px', 'margin-bottom':childdef['padding']['bottom'] * $.mobileweb.device['aspectHratio']+'px'});
 				}
 			}
			var _iconImageurl = $.utility('getSystemImage', "icons-18-white.png","Image");
			$('#'+childdef['id']).find('span').last().css({'background-image':'url("'+_iconImageurl+'")','height':'18px','width':'18px'});
			$('#'+childdef['id']).find('span').first().css({'height':'100%','padding':'0px'});
			$('#'+childdef['id']+' > div > a').css({'top':'50%','margin-right':'5px','margin-left':'5px','margin-top':'-13px','border-radius':'2em'});
			// Bug #7069 Fix
			var iosMobile = (/iPhone|iPad|iPod/i.test(navigator.userAgent)) ? true : false;
 			if(iosMobile){
 				var _inputHeight = parseInt(childdef['frame']['height']) - (parseInt(childdef['padding']['top']) + parseInt(childdef['padding']['bottom']));
 				if(parseInt(childdef['font']['size']) > _inputHeight){
 					$('#'+childdef['id']+'.ui-input-text').css({'font-size': _inputHeight *$.mobileweb.device['aspectratio']+'px'});
 					$('#'+childdef['id']+'.ui-input-text').css({'height': '100%', 'margin-top':'0px', 'margin-bottom':'0px'});
 				}
 			}

		};

		searchBar.getValue = function(){
			return childdef['value'];
		};
		searchBar.setValue = function(param){
			childdef['value'] = param;
		};
		
		searchBar.applyEvents = function(){
			$('#'+childdef['id']).bind("keyup", function(){
				childdef['value'] = $('#'+childdef['id']+' div > input').val();
			});
			
			if(childdef['events']){
				
				if(childdef['events']['EditingStart']){
					$('#'+childdef['id']).click(function(){
						$('#'+childdef['id']).bind('focusin',function(e){
							new $.actions(pagedef, searchBar, childdef['events']['EditingStart'].slice()).execute();
						});
					});
				}
				
				if(childdef['events']['EditingEnd']){
					$('#'+childdef['id']).on('focusout',function(){
						new $.actions(pagedef, searchBar, childdef['events']['EditingEnd'].slice()).execute();
					});
				}
				
				if(childdef['events']['TextChanged']){
					$('#'+childdef['id']).bind("keyup", function(){
						new $.actions(pagedef, searchBar,JSON.parse(JSON.stringify(childdef['events']['TextChanged']).slice())).execute();
					});
				}
				
				if(childdef['events']['CancelClick']){
					$('#'+childdef['id']).on('click', '.ui-input-clear', function (e) {
						new $.actions(pagedef, searchBar, childdef['events']['CancelClick'].slice()).execute();
					});
				}
				
				if(childdef['events']['SearchClick']){
					$('#'+childdef['id']).on('click','div.ui-input-search',function(){
						new $.actions(pagedef, searchBar, childdef['events']['SearchClick'].slice()).execute();
					});
				}
			}
		};
		
		
		return searchBar;
	};
	
	function uiSwitchBar(pagedef, childdef, data){
		var switchBar = new BaseView(childdef);
		
		switchBar.getTemplate = function(){
			return childdef['template'];
		};
		
		var valueType = "onOrOff";
		childdef['switchValue'] = childdef['value'];
		var selected = (childdef['value']==="on") ? "selected" : "";
		switchBar.getHTML = function(){
			if($.utility('getSessionData',"selectObject",childdef['id'])!=null)
			{
				var selectValue = $.utility('getSessionData',"selectObject",childdef['id']);
				selectObj = $.parseJSON(selectValue);		
				if($.mobileweb.getCurrentPage().getName()==selectObj["page_name"] && childdef['id']==selectObj["u_id"])
				{
					if(selectObj['select']=="true")
					{
						selected = "selected";
					}
					else{
						selected = "";
					}
				}
			}
			
			return ["<div id='",childdef['id'],"' class='containing-element' tabindex='",childdef['taborder'],"'> "+
						"<select id='",childdef['id'],"' name='",childdef['name'],"' data-role='slider'>"+
						"<option value='false'>Off</option> "+ 
						"<option value='true' ",selected,">On</option>"+
						"</select></div>"].join('');

		};
  
		switchBar.applyOverrides = function(){
			switchBar['frame'].applyCSS();
			
			if(childdef['hidden']){
				$('#'+childdef['id']).css({'visibility':'hidden'});
			}
			
			switchBar.setSizes(childdef);
			if(childdef['template'] != ""){
				switchBar.setSelected($.utility('extractDataFromRecord', data, childdef['template']));
			}

			if(childdef['border']){
				var weight = childdef['border']['borderweight']* $.mobileweb.device['aspectratio'] +"px";
				if(weight != '0px'){
					var color = 'rgba('+childdef['border']['bordercolor']['red']+','+childdef['border']['bordercolor']['green']+','+childdef['border']['bordercolor']['blue']+','+childdef['border']['bordercolor']['alpha']+')';
					$('#'+childdef['id']+' div').first().css({'border':weight +' solid '+ color});				
					$('#'+childdef['id']+' div').first().css({'margin':'0px'});
				}
			}
			
			$('#'+childdef['id']).find('a').css({'padding':'0px'});		// fix bug #9247. Dated : 30-Jan-2018
		};
		
		switchBar.setSizes = function(childdef){
			$('#'+childdef['id']).css({'height':childdef['frame']['height']* $.mobileweb.device['aspectHratio'],'width':childdef['frame']['width']* $.mobileweb.device['aspectWratio']});
			$('.ui-slider-switch').css({width:'100%',height:'100%'});
			$('.ui-slider-switch').css({top:childdef['frame']['y']* $.mobileweb.device['aspectHratio'] + "px",position:"static"});
			$('#'+childdef['id']).find('a').css({'height':childdef['frame']['height']* $.mobileweb.device['aspectHratio']});
		};
			
		switchBar.setSelected = function(param){
			var childval = switchBar.parseValue(param);
			var select = {page_name:pagedef['name'],u_id:childdef['id'],select:childval};
			$.utility('setSessionData',select,"selectObject");	
			//--
			if(childdef['switchValue'] == 'yes' || childdef['switchValue'] == '1' || childdef['switchValue'] == 'on' || childdef['switchValue'] == 'true'){
				childdef['switchValue'] = '1';
			}else if(childdef['switchValue'] == 'no' || childdef['switchValue'] == '0' || childdef['switchValue'] == 'off' || childdef['switchValue'] == 'false'){
				childdef['switchValue'] =  '0';
			}
		    childdef['value']= childval;
		    
			$("[name='"+childdef['name']+"']").val(childdef['value']).slider("refresh");
			if(childdef["actionFlag"]){
				$("[name='"+childdef['name']+"']").trigger("change");
				switchBar.resetActionFlag();
			}
		};
		
		switchBar.setActionFlag = function(){
			childdef["actionFlag"] = true;
		};
		switchBar.resetActionFlag = function(){
			childdef["actionFlag"] = false;
		};
			
		switchBar.parseValue = function(value){
			value = value.toLowerCase();
			switch(value){
				case 'true':
				case '"true"':
					childdef['switchValue'] = "true";
					valueType = "trueOrFalse";
					return "true";
					break;
				case 'false':
				case '"false"':
					childdef['switchValue'] = "false";
					valueType = "trueOrFalse";
					return "false";
					break;
				case 'on':
					childdef['switchValue'] = "on";
					valueType = "onOrOff";
					return "true";
					break;
				case 'off':
					childdef['switchValue'] = "off";
					valueType = "onOrOff";
					return "false";
					break;
				case '1':
					childdef['switchValue'] = "1";
					valueType = "zeroOrOne";
					return "true";
					break;
				case '0':
					childdef['switchValue'] = "0";
					valueType = "zeroOrOne";
					return "false";
					break;
				case 'yes':
				case '"yes"':
					childdef['switchValue'] = "yes";
					valueType = "yesOrNo";
					return "true";
					break;
				case 'no':
				case '"no"':
					childdef['switchValue'] = "no";
					valueType = "yesOrNo";
					return "false";
					break;
				default:
					childdef['switchValue'] = "false";
					valueType = "trueOrFalse";
					return "false";
					
			}
		};
		
		//this function is needed for all of the UI objects
		switchBar.getValue = function(){
			return childdef['switchValue'];
		};
		switchBar.setValue = function(value){
			switchBar.setSelected(value)
		};

		switchBar.applyEvents = function(){
			$('#'+childdef['id']).change(function(){
				if(childdef["actionFlag"] === undefined || !childdef["actionFlag"]){
					if($("[name='"+childdef['name']+"']").val() == "true"){
						switchBar.setValue("true");
					}else{
						switchBar.setValue("false");
					}
				}
				
				// Fix, in reference of bug #9056. --> Akshay.
				if(childdef['template'] != ""){
					var templVal = childdef['template'].toString().toLowerCase();
 					if(templVal === "on" || templVal === "off"){
 						(childdef['value']==="false") ? childdef['switchValue'] = "off" : childdef['switchValue'] = "on"  ;
 					}else if(templVal === "yes" || templVal === "no"){
 						(childdef['value']==="false") ? childdef['switchValue'] = "no" : childdef['switchValue'] = "yes"  ;
 					}else if(templVal === "0" || templVal === "1"){
 						(childdef['value']==="false") ? childdef['switchValue'] = "0" : childdef['switchValue'] = "1"  ;
 					}else{
 						(childdef['value']==="false") ? childdef['switchValue'] = "false" : childdef['switchValue'] = "true"  ;
 					}

					// we have to set 'switchValue' as either 0 or 1 to be sync with other RT. Dated : 10-Jan-2018 --> Akshay
					if(childdef['switchValue'] == 'yes' || childdef['switchValue'] == '1' || childdef['switchValue'] == 'on' || childdef['switchValue'] == 'true'){
						childdef['switchValue'] = '1';
					}else if(childdef['switchValue'] == 'no' || childdef['switchValue'] == '0' || childdef['switchValue'] == 'off' || childdef['switchValue'] == 'false'){
						childdef['switchValue'] =  '0';
					}
 				}
			});
		
			if(childdef['events']){
				//Action fired onchange ,on and off event
				if(childdef['events']['ValueChanged']){
					 $("[name='"+childdef['name']+"']").bind('change', function() {
						new $.actions(pagedef, switchBar, childdef['events']['ValueChanged'].slice()).execute();		
					});
				}
				if(childdef['events']['On']){
					 $("[name='"+childdef['name']+"']").bind('change', function() {
						if($("[name='"+childdef['name']+"']").val() === "true"){
							new $.actions(pagedef, switchBar, childdef['events']['On'].slice()).execute();
						}
					});
				}
				if(childdef['events']['Off']){
					 $("[name='"+childdef['name']+"']").bind('change', function() {
						if($("[name='"+childdef['name']+"']").val()!="true"){
							new $.actions(pagedef, switchBar, childdef['events']['Off'].slice()).execute();
						}
					});
				}
			}
		};
		
		return switchBar;
	};
			
	function uiSystemButton(pagedef, childdef){
		var systemButton = new BaseView(childdef);
		
		systemButton.getTemplate = function(){
			return childdef['template'];
		};
		
		systemButton.getHTML = function(){
			return ["<fieldset id='",childdef['id'],"' ><input type='",childdef['type'],"' id='",childdef['id'],"' height='",childdef['frame']['height'],"' width='",childdef['frame']['width'],"' name='",childdef['name'],"' src='' data-role='none' tabindex='",childdef['taborder'],"' /></fieldset>"].join('');
		};
  
		systemButton.applyOverrides = function(){
			systemButton['frame'].applyCSS();
			
			if(childdef['hidden']){
 				$('#'+childdef['id']).css({'visibility':'hidden'});
 			}
			systemButton.setLineHeight(childdef['lineheight']);
			systemButton.setStyle(childdef['style']);
			$('input#'+childdef['id']).css({'height':'100%','width':'100%'});
		};
		
		systemButton.setLineHeight = function(param){
			if(param){
				$('#'+childdef['id']).css({'line-height':param+'px'});
			}
		};
		
		systemButton.setStyle = function(style){
			$('#'+childdef['id']).children();
			if(style === 'Add' || style === 'add')
				$('#'+childdef['id']).children().attr('src' , $.utility('getSystemImage','add.png',childdef['viewtype']));
			else if(style === 'Detail')
				$('#'+childdef['id']).children().attr('src' , $.utility('getSystemImage','detail.png',childdef['viewtype']));
			else if (style === 'InfoDark')
				$('#'+childdef['id']).children().attr('src' , $.utility('getSystemImage','infodark.png',childdef['viewtype']));
			else if (style === 'InfoLight')
				$('#'+childdef['id']).children().attr('src' , $.utility('getSystemImage','infolight.png',childdef['viewtype']));
			else if (style === 'Back'){
				$('#'+childdef['id']).children().attr('src' , $.utility('getSystemImage','button1.png',childdef['viewtype']));
				$('#'+childdef['id']).children().css({'transform':'rotate(180deg)'});
			}
		};
		
		//this function is needed for all of the UI objects
		systemButton.getValue = function(){
			return '';
		};
		
		systemButton.applyEvents = function(){
			$('#'+childdef['id']).bind('click', function(){
				new $.actions(pagedef, systemButton, childdef['events']['Tap'].slice()).execute();
			});
		};
		
		return systemButton;
	};
	
	function uiIndicator(pagedef, childdef){
		var indicator = new BaseView(childdef);
		
		indicator.getTemplate = function(){
			return childdef['template'];
		};
		
		indicator.getHTML = function(){
			return ["<div id='",childdef['id'],"' name='",childdef['name'],"' viewtype='",childdef['viewtype'],"' tabindex='",childdef['taborder'],"'></div>"].join('');
		};
		
		indicator.applyOverrides = function(){
			indicator['frame'].applyCSS();
			
			if(childdef['start'] == 'true'){	//rotating image
				indicator.removeImage();
				indicator.setStyle(childdef['style']);
				indicator.setBackgroundSize(childdef['background_size']);
				
			}else if((childdef['stop'] == 'true') || (childdef['start'] == 'false' && childdef['hideswhenstopped'] == 'false' && childdef['start'] == 'false')){		//Still Image
				indicator.setStillImage(childdef['style']);
				
				//Hides when there is still image
				if(childdef['hideswhenstopped'] == 'true'){
				  $('#'+childdef['id']).css({'visibility':'hidden'});
				}
			}
		};
		
		indicator.removeImage = function(){
			$('#'+childdef['id']+' img').remove();
		};
		
		indicator.setStyle = function(param){
			if(param=='Gray'){
				$('#'+childdef['id']).css({'background':'url('+$.utility('getSystemImage','indicator-gray.gif','Indicator')+')'});
			}
			else{
				$('#'+childdef['id']).css({'background':'url('+$.utility('getSystemImage','indicator-white.gif','Indicator')+')'});
			}
		};
		
		indicator.setBackgroundSize = function(param){
			$('#'+childdef['id']).css({'background-repeat':'no-repeat','background-size':'contain'});
			$('#'+childdef['id']).css({'left':childdef['frame']['x']* $.mobileweb.device['aspectWratio'] +'px','top':childdef['frame']['y']*$.mobileweb.device['aspectHratio'] +'px','width':childdef['frame']['width']*$.mobileweb.device['aspectWratio'] +'px','height':childdef['frame']['height']*$.mobileweb.device['aspectHratio'] +'px'});
		};
		
		indicator.setStillImage = function(param){
			if((param=='Gray') || (param=='White')){
				$('#'+childdef['id']).css({'background-image':'','background-position':'','background-size':''});
				if($('#'+childdef['id']+'>img').length == 0){
					$('#'+childdef['id']).prepend('<img src="'+$.utility('getSystemImage','indicator_ui.png','Indicator')+'" />');
					$('#'+childdef['id']+'>img').css({'left':childdef['frame']['x']*$.mobileweb.device['aspectWratio']+'px','top':childdef['frame']['y']*$.mobileweb.device['aspectHratio']+'px','width':childdef['frame']['width']*$.mobileweb.device['aspectWratio']+'px','height':childdef['frame']['height']*$.mobileweb.device['aspectHratio']+'px'});
				}
			}
		};
		
		//this function is needed for all of the UI objects
		indicator.getValue = function(){
			return '';
		};
		
		indicator.applyEvents = function(){
			
		};
		
		return indicator;
	};
	
	
	function uiSlider(pagedef, childdef){
		var slider = new BaseView(childdef);
		
		slider.getTemplate = function(){
			return childdef['template'];
		};

		slider.getHTML = function(){
			return ["<fieldset id='",childdef['id'],"' name='",childdef['name'],"' tabindex='",childdef['taborder'],"'><input type='",childdef['type'],"' data-highlight='true' value='",childdef['value'], "' min='",childdef['min'], "' max='",childdef['max'], "' /></fieldset>"].join('');
		};
		
		slider.applyOverrides = function(){
			slider['frame'].applyCSS();
			
			var aspect = $.mobileweb.device['aspectratio'];
			slider.setLineHeight(childdef['lineheight']);

			if(childdef['hidden']){
				$('#'+childdef['id']).css({'visibility':'hidden'});
			}
			$("[name='"+childdef['name']+"'] .ui-slider-input").hide();
			
			$('#'+childdef['id']).css({'padding-top':'0px','padding-bottom':'0px','margin-top':'0px','margin-bottom':'0px','border':'none'});
			// below line is to adjust actual slider BAR CSS
			$('#'+childdef['id']).children("div").css({'top':'0px','width':(childdef['frame']['width'] - 32)*$.mobileweb.device['aspectWratio']+'px'});
			$('#'+childdef['id']).children("div").css({'margin-top':((childdef['frame']['height']*$.mobileweb.device['aspectHratio']) - $('#'+childdef['id']).children("div").height())/2+'px','margin-left':((childdef['frame']['width']*$.mobileweb.device['aspectWratio']) - $('#'+childdef['id']).children("div").width())/2+'px'});
			slider['background'].setColor();
			$('#'+childdef['id']+'>div').css({'background':slider.setColorFormat(childdef['trackcolorgradient'])}); 
			//Slider Track Color
			$('#'+childdef['id']+' .ui-btn-active').css({'background':slider.setColorFormat(childdef['trackcolor'])});
			//Slider Thumb Color
			$('#'+childdef['id']+'>div>a').css({'background':slider.setColorFormat(childdef['thumbcolor'])});
			$('#'+childdef['id']).find('a').css({'padding':'0px'});		// fix bug #9247. Dated : 30-Jan-2018
			
			if($.utility('getSessionData',"sliderObj",childdef['id'])!=null)
			{
				var sliderObj = $.utility('getSessionData',"sliderObj",childdef['id']);
				sliderObj = $.parseJSON(sliderObj);		
				if($.mobileweb.getCurrentPage().getName()==sliderObj["page_name"] && (childdef['id'])==sliderObj["u_id"])
				{
					$("#"+sliderObj["u_id"]+'>input').attr('value', sliderObj["value"]);
					$("#"+sliderObj["u_id"]+'>input').slider("refresh");
				}
			}
		};
		
		slider.setLineHeight = function(param){
			if(param){
				$('#'+childdef['id']).css({'line-height':param+'px'});
			}
		};
		slider.setColorFormat = function(param){
			var rgb='rgb('+param['red']+','+param['green']+','+param['blue']+')';
			return rgb;
		};
		
		//this function is needed for all of the UI objects
		slider.getValue = function(){
			return childdef['value'];
		};
		slider.setValue = function(param){
			childdef['value'] = param;
		};
		
		slider.applyEvents = function(){
			if(childdef['events']){
				if(childdef['events']['SliderValueChange']){
					$('#'+childdef['id']).on("slidestop", function(e){
						slider.setValue($("[name='"+childdef['name']+"'] .ui-slider-input").attr('value'));
						new $.actions(pagedef, slider, childdef['events']['SliderValueChange'].slice()).execute();
					});
				}
			}
		};
		
		slider.triggerEvent = function(){
			if(childdef['events']['SliderValueChange']){
				new $.actions(pagedef, slider, childdef['events']['SliderValueChange'].slice()).execute();
			}
		};
		
		return slider;
	};
			
	function uiSoundBox(pagedef, childdef, data){
		var soundBox = new BaseView(childdef);

		soundBox.getTemplate = function(){
			return childdef['template'];
		};
		
		var isHidden = childdef['hidden'];
		var isAutoPlay = "";
		if (isHidden == 'true') isAutoPlay = "";
		var initVal = (isAutoPlay == "autoplay") ? 1 : 0;
		var LabelOrValue = (childdef['label'] === "") ? childdef['value'] : $.utility('extractDataFromRecord', data, childdef['label']);
		var marqueeValue = $.utility('extractDataFromRecord', data, LabelOrValue);
		if(childdef['source'] === "url"){
			if(marqueeValue.indexOf("/") != -1 && marqueeValue.indexOf(".") != -1){
				marqueeValue = marqueeValue.substring(marqueeValue.lastIndexOf('/')+1, marqueeValue.lastIndexOf('.'));
			}
		}
		soundBox.getHTML = function(){
			if(!childdef['recorder']){
				if(childdef['template'] !== ""){
					childdef['src']  =$.utility('tokenizeString', $.utility('extractDataFromRecord', data, childdef['template']), pagedef);
				}
				isAutoPlay = (childdef['autoplay'] == "true" && childdef['src'] != "") ? "autoplay" : ""
				return ["<div id='",childdef['id'],"'  name='",childdef['name'],"' val="+initVal+" scrub=0 class='audioPlayer audioPlayer_theme_",childdef['style'],"'  tabindex='",childdef['taborder'],"'><audio "+isAutoPlay+" id='",childdef['id'], "' preload='metadata' autobuffer><source src='",soundBox.getSound(),"' ></source></audio><div class='audioPlayer_toggle'><div class='audioPlayer_play audioPlayer_play_",childdef['style'],"'></div><div class='audioPlayer_pause hidden'><div class='audioPlayer_pause_block audioPlayer_pause_block_",childdef['style'],"'></div><div class='audioPlayer_pause_block audioPlayer_pause_block2 audioPlayer_pause_block_",childdef['style'],"'></div></div></div><label class='audioPlayer_time'>--:--</label><div class='audioPlayer_progressbar audioPlayer_progressbar_",childdef['style'],"'><div class='audioPlayer_progress'></div><div class='audioPlayer_search audioPlayer_indicator_out' onmousedown='return false'><div class='audioPlayer_indicator_out audioPlayer_indicator'></div></div></div><marquee class='audioPlayer_title' behavior=scroll direction='left'>"+marqueeValue+"</marquee></div>"].join('');
			}else{
				return ["<div id='",childdef['id'],"'  name='",childdef['name'],"' val="+initVal+" scrub=0 class='audioPlayer audioPlayer_theme_",childdef['style'],"'  tabindex='",childdef['taborder'],"'><audio id='",childdef['id'], "' preload='metadata' autobuffer><source src='' ></source></audio><div class='audioPlayer_toggle'><div class='audioPlayer_play audioPlayer_play_",childdef['style'],"'></div><div class='audioPlayer_pause hidden'><div class='audioPlayer_pause_block audioPlayer_pause_block_",childdef['style'],"'></div><div class='audioPlayer_pause_block audioPlayer_pause_block2 audioPlayer_pause_block_",childdef['style'],"'></div></div></div><label class='audioPlayer_time'>--:--</label><div class='audioPlayer_progressbar audioPlayer_progressbar_",childdef['style'],"'><div class='audioPlayer_progress'></div><div class='audioPlayer_search audioPlayer_indicator_out' onmousedown='return false'><div class='audioPlayer_indicator_out audioPlayer_indicator'></div></div></div><marquee class='audioPlayer_title' behavior=scroll direction='left'>"+marqueeValue+"</marquee><div id='"+childdef['id']+"_recorder'><img src='images/system/ic_media_off_rec.png'></img></div></div>"].join('');
			}
		};
		soundBox.getSound = function(){
			if(childdef['source'] === "url"){
				return $.utility('tokenizeString', childdef['src'], pagedef);
			}else if(childdef['source'] === "local"){
				return "filesystem:"+$.mobileweb['baseurl']+"/persistent/"+childdef['src'];
			}else{
				return $.utility('getSound',$.utility('tokenizeString', childdef['src'], pagedef));
			}
		}
		
		soundBox.applyOverrides = function(){
			soundBox['frame'].applyCSS();
			
			marqueeValue = $.utility('extractDataFromRecord', data, LabelOrValue);
			
			var aspect = $.mobileweb.device['aspectratio'];
			$('#'+childdef['id']).css({'font-size':aspect*childdef['frame'].height*0.4333+"px",'border-radius':aspect*childdef['frame'].height*0.1+"px",'-webkit-border-radius':aspect*childdef['frame'].height*0.1+"px",'padding-top':'0px','padding-bottom':'0px','margin-top':'0px','margin-bottom':'0px','border':'none'});
			
			$('#'+childdef['id']+ '.ui-slider-input' ).hide();
			$('#'+childdef['id']).find('.audioPlayer_play').css({'border-bottom-width':aspect*childdef['frame'].width/34.111+"px",'border-left-width':aspect*childdef['frame'].width/19.1875+"px",'border-top-width':aspect*childdef['frame'].width/34.111+"px"});
			$('#'+childdef['id']+'_recorder').css({'position': 'absolute', 'left': '90%', 'top': '25%', 'width': '10%', 'height': '50%'});
			$('#'+childdef['id']+'_recorder img').css({'width': '50%', 'height': '100%'});
			
			if(childdef['recorder']){
				$('#'+childdef['id']).find('.audioPlayer_pause').addClass('hidden');
				$('#'+childdef['id']).find('.audioPlayer_play').addClass('hidden');
				$('#'+childdef['id']).find('.audioPlayer_progress').addClass('hidden');
				$('#'+childdef['id']).find('.audioPlayer_progressbar').addClass('hidden');
				$("#" + childdef['id'] + "> marquee").addClass('hidden');
				$('#'+childdef['id']+ "> marquee").css({'width' : '20%'});
			}
		};
		
		//this function is needed for all of the UI objects
		soundBox.getValue = function(){
			return childdef['src'];
		};
		soundBox.setValue = function(param){
			if(childdef['source'] === "url"){
				childdef['src'] = param;
			}else if(childdef['source'] === "local"){
				childdef['src'] = "filesystem:"+$.mobileweb['baseurl']+"/persistent/"+param;
			}else{
				childdef['src'] = $.utility('getSound',param);
			}
			
			if(childdef['source'] === "url"){
 				if(param.indexOf("[") == -1){
 					var marqueelabel = param.substring(param.lastIndexOf('/')+1, param.lastIndexOf('.'));
 					$("#" + childdef['id'] + "> marquee").text(marqueelabel);
 				}
 			}else
 				$("#" + childdef['id'] + "> marquee").text(param);
			$('#'+childdef['id']+' audio').attr('src',childdef['src']);
			audio=$('#'+childdef['id']+' audio').get(0);
			$("#" + childdef['id']).trigger('loadedmetadata');
			$("#" + childdef['id']).trigger('timeupdate');
		};
		
		var recordingFlag = false;
		var recordingTimeout;
		var rec;
		var recordingName = "";
		var audioTrack = new WebAudioTrack();
		var audioTrackFile = new WebAudioTrack();
		
		soundBox.applyEvents = function(){
			var option = {};
			var mediaStream;
			var Context = window.AudioContext || window.webkitAudioContext;
			var context = new Context();
			
			var isMobile = (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Windows Phone/i.test(navigator.userAgent)) ? true : false;
			if(isMobile)
			    isAutoPlay = "";
			  
			(isAutoPlay == "autoplay") ? audioPlayer_hideplaybutton(childdef['id']) : audioPlayer_hidepausebutton(childdef['id']);
			if (childdef['hidden'] == 'true'){
				$('#'+childdef['id']).css({'visibility': 'hidden'});
				$('#'+childdef['id']+' > Label').css({'visibility': 'hidden'});
				audioPlayer_hideplaybutton(childdef['id']);
				if (childdef['autoplay'] == 'true'){
					$('#'+childdef['id']+' audio').get(0).play();
				}
			}
			var audio=$('#'+childdef['id']+' audio').get(0);
			$('#'+childdef['id']).find('.audioPlayer_toggle').click(function(){
				audioPlayer_controls(childdef['id']);
			});
	
			$('#'+childdef['id']).find('.audioPlayer_search').bind("vmousedown", function(evt){
				if($('#'+childdef['id']).attr('scrub')==0)
				$('#'+childdef['id']).attr('scrub',1);
			});
			
			$('#'+childdef['id']).find('.audioPlayer_search').bind("vmousemove", function(evt){
				evt.stopPropagation();
			});
	
			$('#'+childdef['id']).find('.audioPlayer_progressbar').bind("vmousemove", function(evt){
				if($('#'+childdef['id']).attr('scrub')==1)
					audioPlayer_scrub(childdef['id'],this,evt,audio);
			});
 	
			$('#'+childdef['id']).find('.audioPlayer_progressbar').bind("vmouseup", function(evt){
				if($('#'+childdef['id']).attr('scrub')==0)
					audioPlayer_scrub(childdef['id'],this,evt,audio);
				else
					$('#'+childdef['id']).attr('scrub',0);
				
				if($('#'+childdef['id']).attr('val')==1){
					audioPlayer_hideplaybutton(childdef['id']);
					audio.play();
				}
			});
 	
			audio.addEventListener('timeupdate',function(e){
				var time = audio.duration - audio.currentTime;
				if(!isNaN(time)){
					var min = time / 60;
					var displayMin=Math.floor(min);
					var sec = time % 60;
					var displaySec=Math.floor(sec);
					if(min<10){
						min = '0'+min;
						displayMin='0'+displayMin;
					}
					if(sec<10){
						sec = '0'+sec;
						displaySec='0'+displaySec;
					}
	 		
					var adder = parseFloat($('#'+childdef['id']).find('.audioPlayer_progressbar').css('width')) / audio.duration;
					if($('#'+childdef['id']).find('.audioPlayer_time').text()!=min+':'+sec){
						$('#'+childdef['id']).find('.audioPlayer_progress').css('width',adder*(Math.floor(audio.duration)-time));
						$('#'+childdef['id']).find('.audioPlayer_indicator_out').css('left',parseFloat($('#'+childdef['id']).find('.audioPlayer_progress').css('width'))-(parseFloat($('#'+childdef['id']).find('.audioPlayer_indicator_out').css('width'))/2));
						$('#'+childdef['id']).find('.audioPlayer_indicator').css('left','20%');
					}else if($('#'+childdef['id']).find('.audioPlayer_time').text()=='00:00'){
						audioPlayer_controls(childdef['id']);
						audio.currentTime = 0;
					}
	 		
					$('#'+childdef['id']).find('.audioPlayer_time').text(displayMin+':'+displaySec);
				}
			});
 	
			audio.addEventListener('loadedmetadata', function(e){
				if(!isNaN(time)){
					var time = Math.floor(audio.duration - audio.currentTime);
					var min = Math.floor(time / 60);
					var sec = time % 60;
					if(min<10)
						min = '0'+min;
					if(sec<10)
						sec = '0'+sec;
					$('#'+childdef['id']).find('.audioPlayer_time').text(min+':'+sec);
				}
			});
			
			$('#'+childdef['id']+'_recorder').bind("click", function(){
				if(recordingFlag){
					soundBox.stopRecording();
				}else{
					if(childdef['timeout'] > 0){
						soundBox.startRecording();
						recordingTimeout = setTimeout(function(){
							soundBox.stopRecording();
						}, parseInt(childdef['timeout'])*1000)
					}else{
						soundBox.startRecording();
					}
				}
			});
			
			function audioPlayer_scrub(id,obj,evt,audio){
				audio.pause();
				$(obj).find('.audioPlayer_progress').css('width',evt.offsetX);
				$(obj).find('.audioPlayer_indicator_out').css('left',evt.offsetX-(parseInt($(obj).find('.audioPlayer_indicator_out').css('width'))/2));
				$(obj).find('.audioPlayer_indicator').css('left','20%');
    
				var adder = parseFloat($('#'+id).find('.audioPlayer_progressbar').css('width')) / audio.duration;
				audio.currentTime=parseFloat($('#'+id).find('.audioPlayer_progress').css('width'))/adder;
			};
			
			function audioPlayer_controls(ui){
				var audioParent = $('#'+ui).get(0);
							
				if($(audioParent).attr('val')==0){
					$(audioParent).attr('val',1);
					$('#'+ui+' audio').get(0).play();
					audioPlayer_hideplaybutton(ui);
				}else{
					$(audioParent).attr('val',0);
					$('#'+ui+' audio').get(0).pause();
					audioPlayer_hidepausebutton(ui);
				}
			};
			
			function audioPlayer_hideplaybutton(id){
				$('#'+id).find('.audioPlayer_play').addClass('hidden');
				$('#'+id).find('.audioPlayer_pause').removeClass('hidden');
			};

			function audioPlayer_hidepausebutton(id){
				$('#'+id).find('.audioPlayer_pause').addClass('hidden');
				$('#'+id).find('.audioPlayer_play').removeClass('hidden');
			};
			
			// Events
			if(childdef['events']){
				if(childdef['events']['OnPlay']){
					audio.addEventListener('play',function(){
						new $.actions(pagedef, soundBox, childdef['events']['OnPlay'].slice()).execute(); 
					}, false);
				}
				if(childdef['events']['OnPausePlay']){
					audio.addEventListener('pause',function(){
						if($('#'+childdef['id']+' audio').get(0).currentTime !=0){
							new $.actions(pagedef, soundBox, childdef['events']['OnPausePlay'].slice()).execute();	
						}
					}, false);
				}
				if(childdef['events']['StopPlay']){
					audio.addEventListener('pause',function(){
						if($('#'+childdef['id']+' audio').get(0).currentTime ==0){
							new $.actions(pagedef, soundBox, childdef['events']['StopPlay'].slice()).execute();
						}
					}, false);
				}
				if(childdef['events']['PlayEnd']){
					audio.addEventListener('ended',function(){
						new $.actions(pagedef, soundBox, childdef['events']['PlayEnd'].slice()).execute();
					}, false);
				}
				/*if(childdef['events']['StartRecord']){
					
				}
				if(childdef['events']['StopRecord']){
					
				}*/
			}
			
		};
		
		soundBox.getRecordingName = function(){
			return childdef['recordingName'];
		};
		soundBox.initRecording = function(){
			if(recordingFlag){
				soundBox.stopRecording();
			}else{
				if(childdef['timeout'] > 0){
					soundBox.startRecording();
					recordingTimeout = setTimeout(function(){
						soundBox.stopRecording();
					}, parseInt(childdef['timeout'])*1000)
				}else{
					soundBox.startRecording();
				}
				
			}
		};
		
		soundBox.startRecording = function(){
			recordingFlag = true;
			childdef['recording'] = true;
			$('#'+childdef['id']).find('.audioPlayer_pause').addClass('hidden');
			$('#'+childdef['id']).find('.audioPlayer_play').addClass('hidden');
			$('#'+childdef['id']).find('.audioPlayer_progress').addClass('hidden');
			$('#'+childdef['id']).find('.audioPlayer_progressbar').addClass('hidden');
			$('#'+childdef['id']).find('.audioPlayer_progressbar').addClass('hidden');
			$("#" + childdef['id'] + "> marquee").addClass('hidden');

			//var navigator = window.navigator;
			navigator.getUserMedia = (
					navigator.getUserMedia ||
					navigator.webkitGetUserMedia ||
					navigator.mozGetUserMedia ||
					navigator.msGetUserMedia
			);
			
			Context = window.AudioContext || window.webkitAudioContext;
			context = new Context();
			navigator.getUserMedia({audio: true}, function(localMediaStream){
				$('#'+childdef['id']+ " img").attr("src", "images/system/ic_media_on_rec.png");
				var  seconds = 0, minutes = 0, hours = 0;
				var time = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
				$('#'+childdef['id']).find('.audioPlayer_time').text(time);
				var timer = setInterval(function(){
					if(recordingFlag){
						seconds++;
						if (seconds >= 60) {
							seconds = 0;
							minutes++;
							if (minutes >= 60) {
								minutes = 0;
								hours++;
							}
						}
						time = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
						$('#'+childdef['id']).find('.audioPlayer_time').text(time);
						}else{
							clearInterval(timer);
						}

					}, 1000)
					
					//Recording for safari
					var ua = navigator.userAgent.toLowerCase(); 
					if (ua.indexOf('safari') != -1) {
					    if (ua.indexOf('chrome') > -1)
					        audioTrack.startRecording();
					    else
					        audioTrack.startRecording();
					}
					
					if (childdef['events']['startRecord']) {
		                new $.actions(pagedef, soundBox, childdef['events']['startRecord'].slice()).execute();
		            }
				}, function(err){
					//console.log(err);
					//console.log('Browser not supported Recording audio');
			});
		
		};
		
		soundBox.stopRecording = function(){
			if (recordingFlag || childdef['recording']) {
			    context.close();
			    recordingFlag = false;
			    childdef['recording'] = false;
			    recordingName = childdef['value']; //$.utility('tokenizeString', $.utility('extractDataFromRecord', data, childdef['value']), pagedef);
			    if ($.utility('tokenizeString', $.utility('extractDataFromRecord', data, childdef['value']), pagedef) === "") {
			        recordingName = childdef['name'] + "_" + new Date().getTime() + ".wav"
			    } else {
			        if ($.utility('tokenizeString', $.utility('extractDataFromRecord', data, childdef['value']), pagedef).toString().indexOf(".wav") != -1) {
			            recordingName = $.utility('tokenizeString', $.utility('extractDataFromRecord', data, childdef['value']), pagedef);
			        } else {
			            recordingName = $.utility('tokenizeString', $.utility('extractDataFromRecord', data, childdef['value']), pagedef) + ".wav";
			        }
			    }
			    childdef['recordingName'] = recordingName;

			    $('#' + childdef['id']).find('.audioPlayer_play').removeClass('hidden');
			    $('#' + childdef['id']).find('.audioPlayer_progress').removeClass('hidden');
			    $('#' + childdef['id']).find('.audioPlayer_progressbar').removeClass('hidden');
			    $("#" + childdef['id'] + "> marquee").removeClass('hidden');
			    $('#' + childdef['id'] + "_recorder img").attr("src", "images/system/ic_media_off_rec.png");

			    //Recording for safari
			    audioTrack.stopRecording();
			    var audiotimer = setInterval(function() {
			        clearInterval(audiotimer);
			        var reader = new FileReader();
			        reader.addEventListener("loadend", function() {
			            childdef['src'] = reader.result.toString();
			            childdef['value'] = recordingName;
			            $("#" + childdef['id'] + "> marquee").text(recordingName);
			            $('#' + childdef['id'] + "> marquee").css({
			                'width': '20%'
			            });
			            $('#' + childdef['id'] + ' audio').attr('src', reader.result.toString());
			            audio = $('#' + childdef['id'] + ' audio').get(0);

			            audio.pause();
			            audio.currentTime = 0;
			            setTimeout(function() {
			                $("#" + childdef['id'] + ' audio').trigger('loadedmetadata');
			                $("#" + childdef['id'] + ' audio').trigger('timeupdate');
			            }, 1000);
			            clearTimeout(recordingTimeout);
			            if (childdef['events']['stopRecord']) {
			                new $.actions(pagedef, soundBox, childdef['events']['stopRecord'].slice()).execute();
			            }

			        });
			        reader.readAsDataURL(audioTrack.blob)
			    }, 200);
			}
		};
		
		return soundBox;
	};
	
	
		
	function uiVideoBox(pagedef, childdef, data) {
		var videoBox = new BaseView(childdef);

		videoBox.getTemplate = function(){
			return childdef['template'];
		};
		
		var isAutoPlay = (childdef['autoplay'] == "true") ? "autoplay" : "";
		var showControls = (childdef['controls'] == "controls") ? "controls" : "";
		var invalidUrLFlag = false;
		videoBox.getHTML = function(){
			if(childdef['template'] !== ""){
				childdef['src']  =$.utility('tokenizeString', $.utility('extractDataFromRecord', data, childdef['template']), pagedef);
			}
			var source = childdef['src'];
			if(childdef['source'].toLowerCase() === "bundle"){
				source = $.utility('getVideo',$.utility('tokenizeString', childdef['src'], pagedef));
			}else if(childdef['source'] === "remoteFile"){
				source = $.utility('getRemoteImage',$.utility('tokenizeString', childdef['src'], pagedef));
			}else{
				source = $.utility('tokenizeString', childdef['src'], pagedef);
			}
			
			return ["<video " + isAutoPlay + " "+ showControls +" disablepictureinpicture controlsList='nodownload' id='",childdef['id'],"' name='",childdef['name'],"' poster='",childdef['poster'],"'playsinline style='background:black;' val=0 scrub=0 data-video-file='",childdef['data_video_file'],"'  ><source src='",source,"' type='",childdef['type'],"' ></source>This video is not supported by your browser.</video>"].join('');
		};
		
		videoBox.applyOverrides = function(){
			videoBox['frame'].applyCSS();
			
			if(childdef['hidden']){
				$('#'+childdef['id']).css({'visibility':'hidden'});
			}
			
			//Bug 9630 Fix --> To Hide volumebar from video control
			if(childdef['viewtype'] === "VideoBox"){
				var style = $('<style>video::-webkit-media-controls-fullscreen-button{ display:block; }video::-webkit-media-controls-volume-slider{ display:none; }video::-webkit-media-controls-mute-button {display:none;}video::-webkit-media-controls-time-remaining-display{display:none;}video::-webkit-media-controls-current-time-display{display:none;}</style>');
				$('html > head').append(style);
			}
		};
		
		//this function is needed for all of the UI objects
		videoBox.getValue = function(){
			return childdef['src'];
		};
		videoBox.setValue = function(param){
			if(childdef['source'].toLowerCase() === "bundle"){
				childdef['src'] = $.utility('getVideo',param);
			}else if(childdef['source'] === "remoteFile"){
				childdef['src'] = $.utility('getRemoteImage',param);
			}else{
				childdef['src'] = param;
			}
			$('#'+childdef['id']).attr('src',childdef['src']);
			$("#"+childdef['id']+' source').attr('src',childdef['src']);
		};
		
		videoBox.setVideoName = function(param){
			childdef['value'] = param;
		};
		
		
		videoBox.stopPlay = function(){
			new $.actions(pagedef, videoBox, childdef['events']['StopPlay'].slice()).execute();
		};
		videoBox.applyEvents = function(){
			$("#"+childdef['id']+' source').last().on('error', function() {
			    if(!invalidUrLFlag){
			    	$("#"+childdef['id']+' source')[0].src = $('video source')[0].src.replace("https","http");
					$("#"+childdef['id'])[0].load();
					$("#"+childdef['id'])[0].play();
					invalidUrLFlag = true;
			    }
			});
			
			$("#"+childdef['id']).bind("tap", function(){
				//document.getElementById(childdef['id']).play();
			});
			
			$("#"+childdef['id']).bind("touchend", function(){//Bug #8662 Fix
				 if ($("#"+childdef['id']).get(0).hasAttribute("controls")){
					 $("#"+childdef['id']).get(0).removeAttribute("controls")   
					 $("#"+childdef['id']).get(0).setAttribute("controls","controls")   
				 }
			});
			
			if(childdef['events']){
				if(childdef['events']['PlayStarts']){
					document.getElementById(childdef['id']).addEventListener('play',function(){
						new $.actions(pagedef, videoBox, childdef['events']['PlayStarts'].slice()).execute();
					}, false);
				}
				if(childdef['events']['OnPlayPause']){
					document.getElementById(childdef['id']).addEventListener('pause',function(){
						if((document.getElementById(childdef['id'])).currentTime !=0){
							if((document.getElementById(childdef['id'])).currentTime != document.getElementById(childdef['id']).duration){
								new $.actions(pagedef, videoBox, childdef['events']['OnPlayPause'].slice()).execute();
							}
						}
					}, false);
				}
				if(childdef['events']['StopPlay']){
					document.getElementById(childdef['id']).addEventListener('stop',function(){//Bug #12766 Fix
						new $.actions(pagedef, videoBox, childdef['events']['StopPlay'].slice()).execute();
					}, false);
				}
				if(childdef['events']['PlayEnd']){
					document.getElementById(childdef['id']).addEventListener('ended',function(){
						new $.actions(pagedef, videoBox, childdef['events']['PlayEnd'].slice()).execute();
					}, false);
				}
				
				/*if(childdef['events']['RecordStarts'])
				{
					$('#'+childdef['id']).addEventListener(function(){ new $.actions(pagedef, videoBox, childdef['events']['RecordStarts'].slice()).execute(); });
				}
				if(childdef['events']['OnRecordPause'])
				{
					$('#'+childdef['id']).addEventListener(function(){ new $.actions(pagedef, videoBox, childdef['events']['OnRecordPause'].slice()).execute(); });
				}
				if(childdef['events']['StopRecord'])
				{
					$('#'+childdef['id']).addEventListener(function(){ new $.actions(pagedef, videoBox, childdef['events']['StopRecord'].slice()).execute(); });
				}
				if(childdef['events']['RecordEnd'])
				{
					$('#'+childdef['id']).addEventListener(function(){ new $.actions(pagedef, videoBox, childdef['events']['RecordEnd'].slice()).execute(); });
				}*/
			}
		};
		
		return videoBox;
	};
	
		
	function uiToggleButton(pagedef, childdef, data){
		var toggleButton =  new BaseView(childdef);
		
		var valueType = "trueOrFalse";
		if(childdef['title']){
			childdef['title']= $.utility('convertSpecialCharacter', $.utility('tokenizeString', childdef['title']));// for globalValues bugId:7983 25jan16
		}
		
		toggleButton.getTemplate = function(){
			return childdef['template'];
		};
		
		toggleButton.getHTML = function(){
			return ["<fieldset id='",childdef['id'],"' val='",childdef['state'],
			        "'> <input id='",childdef['id'],"' name='",childdef['name'],
			        "' type='",childdef['type'] , "' value='",childdef['value'],"' src='",
			        (childdef['value']) ? toggleButton.setImage(childdef['selectedimage']) : toggleButton.setImage(childdef['nonselectedimage']),"' width='",childdef['frame'].width * $.mobileweb.device['aspectWratio'],"'px height='",
			        childdef['frame'].height * $.mobileweb.device['aspectHratio'],"'px data-role=none/><label for='",childdef['id'],
			        "'>", (childdef['value']) ? childdef['selectedtitle'] : childdef['title'], "</label></fieldset>"].join('');
		};
		
		toggleButton.applyOverrides = function(){
			toggleButton['frame'].applyCSS();
			toggleButton['font'].applyCSS();
			
			childdef['togglevalue'] = childdef['value'].toString();
			
			if(childdef['hidden']=="true"){
				$('#'+childdef['id']).css({'visibility':'hidden'});
			}
			
			if(childdef['border']){
				var weight = childdef['border']['borderweight'] +"px";
				if(weight != '0px'){
					var color = 'rgba('+childdef['border']['bordercolor']['red']+','+childdef['border']['bordercolor']['green']+','+childdef['border']['bordercolor']['blue']+','+childdef['border']['bordercolor']['alpha']+')';
					$('#'+childdef['id']).css({'border':weight +' solid '+ color});				
					$('#'+childdef['id']).css({'margin':'0px'});
				}
			}
			
			$('#'+childdef['id'] +'> input').css({'height': 'inherit'});
			
			var lineHeight = childdef['frame'].height * $.mobileweb.device['aspectratio']+'px';
			if((childdef['selectedimage']=='ImageButton_toggle_on.png') && (childdef['nonselectedimage']=='ImageButton_toggle_off.png')){
				lineHeight = '';
			}
			$('label[for='+childdef['id']+']').css({position:'absolute',left:'0px',cursor:'pointer',width:'100%','text-align':toggleButton['font']['align'],'line-height': lineHeight});
				
			if(childdef['template']!==''){
				var getValue =$.utility('tokenizeString', $.utility('extractDataFromRecord', data, childdef['template']), pagedef);
				toggleButton.setValue(getValue);	
			}
			if(childdef['selectedtitle'] != undefined && childdef['selectedtitle'] != ""){
					childdef['selectedtitle']= $.utility('convertSpecialCharacter', $.utility('tokenizeString', childdef['selectedtitle']));// for globalValues bugId:7983 25jan16
			}
			$('label[for='+childdef['id']+']').css({'text-decoration': childdef['textDecoration']});

 			$('label[for='+childdef['id']+']').css({'vertical-align':childdef['verticalalignment']})
 			if (childdef['verticalalignment'] =='bottom'){
 				$('label[for='+childdef['id']+']').css({'position':'absolute', top:(((childdef['frame']['height'] - childdef['padding']['bottom']) - (childdef['font']['size']*(childdef['togglevalue'].length - childdef['togglevalue'].replace("\n", "").length+1))) * $.mobileweb.device['aspectHratio'])+'px', left:'0px'});
 			}else if (childdef['verticalalignment'] =='middle'){
 				$('label[for='+childdef['id']+']').css({'position':'absolute', top:(((childdef['frame']['height']/2)) - (childdef['font']['size']*(childdef['togglevalue'].length - childdef['togglevalue'].replace("\n", "").length+1))/2)* $.mobileweb.device['aspectHratio']+'px', left:'0px'});
 			}else if (childdef['verticalalignment'] =='top'){
 				$('label[for='+childdef['id']+']').css({'position':'absolute', top:(childdef['padding']['top'] * $.mobileweb.device['aspectHratio'])+'px', left:'0px'});
 			}
 			$('#'+childdef['id']).css({'overflow':'hidden','white-space':'nowrap'});
 			
		};
		
		toggleButton.applyEvents = function(){
			
			$('#'+childdef['id']).off('click').on('click', function(){
				if(childdef['id'].indexOf('-tile-') != -1){ // --> Hotfix
					childdef['id'] = this.id;
					if(childdef['template']!==''){
						var getValue =$.utility('tokenizeString', $.utility('extractDataFromRecord', data, childdef['template']), pagedef);
						toggleButton.setValue(getValue);	
				    }
				}
				childdef['togglevalue'] = toggleButton.antiValue(childdef['togglevalue']);

				// we have to set 'togglevalue' as either 0 or 1 to be sync with other RT. Dated : 10-Jan-2018 --> Akshay
				if(childdef['togglevalue'] == 'yes' || childdef['togglevalue'] == '1' || childdef['togglevalue'] == 'on' || childdef['togglevalue'] == 'true'){
					childdef['togglevalue'] = '1';
				}else if(childdef['togglevalue'] == 'no' || childdef['togglevalue'] == '0' || childdef['togglevalue'] == 'off' || childdef['togglevalue'] == 'false'){
					childdef['togglevalue'] =  '0';
				}
				
				toggleButton.toggle('click');
			});
			
			if(childdef['events']){
				if(childdef['events']['Tap']){
					$('#'+childdef['id']).click(function(){
						new $.actions(pagedef, childdef, childdef['events']['Tap'].slice()).execute(); 
					});
				}
			}
		};
		
		toggleButton.toggle = function(param){
			if(((childdef['togglevalue'] === "0") || (childdef['togglevalue'] == false) || (childdef['togglevalue'] === "false") || (childdef['togglevalue'] === "off") || (childdef['togglevalue'] === "no"))){
				$('label[for='+childdef['id']+']').text(childdef['title']);
				var _image = childdef['nonselectedimage'];
				if(_image.indexOf("[") != -1 && _image.indexOf("]") != -1){
                    _image = $.utility('tokenizeString', $.utility('extractDataFromRecord', data, _image), pagedef);
				}
				$('input#' + childdef['id']).attr('src',toggleButton.setImage(_image));
				if(param != undefined){
					if(childdef['events']['Off']){
						if(pagedef['data']['contents'] != undefined)
							pagedef['data']['contents']['currentRow'] = "toggle"
						new $.actions(pagedef, toggleButton, childdef['events']['Off'].slice()).execute();
					
					}
				}
				childdef['value'] = false;
			}else if(((childdef['togglevalue'] === "1")|| (childdef['togglevalue'] == true)  || (childdef['togglevalue'] === "true") || (childdef['togglevalue'] === "on") || (childdef['togglevalue'] === "yes"))){
				$('label[for='+childdef['id']+']').text(childdef['selectedtitle']);
				var _image = childdef['selectedimage'];
				if(_image.indexOf("[") != -1 && _image.indexOf("]") != -1){
                    _image = $.utility('tokenizeString', $.utility('extractDataFromRecord', data, _image), pagedef);
				}
				$('input#' + childdef['id']).attr('src',toggleButton.setImage(_image));
				if(param != undefined){
					if(childdef['events']['On']){
						if(pagedef['data']['contents'] != undefined)
							pagedef['data']['contents']['currentRow'] = "toggle"
						new $.actions(pagedef, toggleButton, childdef['events']['On'].slice()).execute();
					
					}
				}
				childdef['value'] = true;
			}
		};
		
		toggleButton.antiValue = function(value){
			if(value === "true"){
				return "false";
			}else if(value === "on"){
				return "off";
			}else if(value === "1"){
				return "0";
			}else if(value === "false"){
				return "true";
			}else if(value === "off"){
				return "on";
			}else if(value === "0"){
				return "1";
			}else if(value === "yes"){
				return "no";
			}else if(value === "no"){
				return "yes";
			}
		};
		
		toggleButton.parseValue = function(value){
			value = value.toLowerCase();
			switch(value){
				case 'true':
				case '"true"':
				  valueType = "trueOrFalse";
				  return "true";
				  break;
				case 'false':
				case '"false"':
				  valueType = "trueOrFalse";
				  return "false";
				  break;
				case 'on':
				  valueType = "onOrOff";
				  return "true";
				  break;
				case 'off':
				  valueType = "onOrOff";
				  return "false";
				  break;
				case 'yes':
					  valueType = "yesOrNo";
					  return "true";
					  break;
				case 'no':
					  valueType = "yesOrNo";
					  return "false";
					  break;
				case '1':
				  valueType = "zeroOrOne";
				  return "true";
				  break;
				case '0':
				  valueType = "zeroOrOne";
				  return "false";
				  break;
				default:
				  return "false";
				}
		};
		
		toggleButton.antiParseValue = function(value){
			value = value.toLowerCase();
			switch(valueType){
				case 'trueOrFalse':
					return (value === "true") ? "true" : "false";
					break;
				case 'yesOrNo':
					return (value === "true") ? "yes" : "no";
					break;
				case 'onOrOff':
					return (value === "true") ? "on" : "off";
					break;
				case 'zeroOrOne':
					return (value === "true") ? "1" : "0";
					break;
				default:
					return "false";
				}
		};
		
		toggleButton.getValueType = function(value){
			if(value === "true" || value === "false"){
				return 'trueOrFalse';
			}else if(value === "1" || value === "0"){
				return 'zeroOrOne';
			}else if(value === "on" || value === "off"){
				return 'onOrOff';
			}else if(value === "yes" || value === "no"){
				return 'yesOrNo';
			}
		};
		
		toggleButton.setImage = function(Image){
			if((Image=='ImageButton_toggle_on.png')||(Image=='ImageButton_toggle_off.png'))
				return $.utility('getSystemImage', Image, 'ToggleButton');
			else
				return $.utility('getImage', Image)
		};
		
		toggleButton.setValue = function(value, setMV){
			if(value !== ""){
				if(setMV){		//this code blocks needed since due to 'SetMainValue' action "toggleButton.toggle" function's condition got failed. In that function value will be set correctly.
					if((value == false) || (value === "false") || (value === "off") || (value === "0") || (value === "no"))
						childdef['value'] = true;
					else if((value == true) || (value === "true") || (value === "on") || (value === "1") || (value === "yes"))
						childdef['value'] = false;
				}
				
				var tempValue = toggleButton.parseValue(value);
				valueType = toggleButton.getValueType(value);
				childdef['togglevalue'] = toggleButton.antiParseValue(tempValue);

				// we have to set 'togglevalue' as either 0 or 1 to be sync with other RT. Dated : 10-Jan-2018 --> Akshay
				if(childdef['togglevalue'] == 'yes' || childdef['togglevalue'] == '1' || childdef['togglevalue'] == 'on' || childdef['togglevalue'] == 'true'){
					childdef['togglevalue'] = '1';
				}else if(childdef['togglevalue'] == 'no' || childdef['togglevalue'] == '0' || childdef['togglevalue'] == 'off' || childdef['togglevalue'] == 'false'){
					childdef['togglevalue'] =  '0';
				}
				
				toggleButton.toggle(setMV);
			}
		};
		
		//this function is needed for all of the UI objects
		toggleButton.getValue = function(){
			//return toggleButton.antiParseValue(childdef['togglevalue']);
			return childdef['togglevalue'];
		};
		return toggleButton;
	};
	
	function uiImageButton(pagedef, childdef, data){
		var imageButton =  new BaseView(childdef);
		
		imageButton.getTemplate = function(){
			return childdef['template'];
		};
		
		imageButton.getHTML = function(){
			var displayBorder = "";
			var innerImageWidth = "100%";
			var innerImageHeight = "100%";
			if(childdef['backgroundimage'] == "."){
				displayBorder = "display:none;";
			}
			
			if(displayBorder != ""){
				innerImageWidth = "100%";
				innerImageHeight = "100%";
			}
			
			return [" <div id='",childdef['id'],"' class='draggable' name='",childdef['name'],"' tabindex='",childdef['taborder'],"'><img name='backgroundimage' class='draggable' style=' position:absolute;",displayBorder,"' width='100%' height='100%' /><img name=foregroundimage class='draggable' width='",innerImageWidth,"' height='",innerImageHeight,"'/></div>"].join('');
		};
		
		imageButton.applyOverrides = function(){
			imageButton['frame'].applyCSS();
			var aspect = $.mobileweb.device['aspectratio'];
			var backgroundImage = "";
			
			if(childdef['hidden']=="true"){
				$('#'+childdef['id']).css({'visibility':'hidden'});
				$('#'+childdef['id']).css({'display':'none'});
			}
			
			if(childdef['draggable'] === true){
				$('#'+childdef['id']).addClass('ui-widget-content');
				$('#'+childdef['id']).draggable({
					containment: "parent"
				});
			}
			
			if(childdef['border']){
				var weight = childdef['border']['borderweight'] +"px";
				if(weight != '0px'){
					var color = 'rgba('+childdef['border']['bordercolor']['red']+','+childdef['border']['bordercolor']['green']+','+childdef['border']['bordercolor']['blue']+','+childdef['border']['bordercolor']['alpha']+')';
					$('#'+childdef['id']).css({'border':weight +' solid '+ color});				
					$('#'+childdef['id']).css({'margin':'0px'});
				}
			}
			
			if(childdef['backgroundimage'] != "."){
				$('#'+childdef['id']+'>[name="foregroundimage"]').css({'position':'absolute'});
			}else{
				$('#'+childdef['id']+'>[name="foregroundimage"]').css({'position':'absolute','left': '0%','top':'0%','z-index':'1'});
			}
			imageButton.setBackgroundImage(childdef['backgroundimage']);
			imageButton.setForegroundImage(childdef['src']);
		};
		
		imageButton.setBackgroundImage = function(background){
			backgroundImage = background;
			if(background=="defaultImage.png" || background=="default-image-button-200x100.png"){
				$('#'+childdef['id']+'>[name="backgroundimage"]').attr("src",$.utility('getSystemImage',background,childdef['viewtype']));
			}
			else{
				if(background=="." || background==""){
					imageButton.setBackgroundImage("default-image-button-200x100.png");
				}
				else{
					$('#'+childdef['id']+'>[name="backgroundimage"]').attr("src",$.utility('getImage',background));
				}
			}
		};
		
		imageButton.setForegroundImage = function(foreground){
			
			if(childdef['template']!=""){
				$('#'+childdef['id']+'>[name="foregroundimage"]').attr("src",$.utility('getImage',$.utility('tokenizeString', $.utility('extractDataFromRecord', data, childdef['template']), pagedef)));
				if(childdef['template'].toString().replace(/\]/g,'').replace(/\[/g,'') === "")
					$('#'+childdef['id']+'>[name="foregroundimage"]').attr("src",$.utility('getImage',foreground));
			}else{
				if(childdef['source'] === "remotedb"){
					$('#'+childdef['id']+'>[name="foregroundimage"]').attr("src",$.utility('getRemoteImage',foreground));
				}else{
					if(foreground=="." || foreground=="" || (foreground.indexOf("[")!=-1 && (foreground.indexOf("]")!=-1)) ){
						if((foreground.indexOf("[")!=-1 && (foreground.indexOf("]")!=-1))){// this if is for take photo action
							var imageName = $.utility('extractDataFromRecord', data, foreground);
							if(imageName.indexOf('.') == -1){
								$('#'+childdef['id']+'>[name="foregroundimage"]').attr("src",$.utility('getRemoteImage',imageName));
							}
							else{
								$('#'+childdef['id']+'>[name="foregroundimage"]').attr("src",$.utility('getImage',imageName));
							}
							if($.utility('getImage',imageName).indexOf(".png") == -1 && $.utility('getImage',imageName).indexOf("base64") == -1){
								_pref = foreground.split("[")[0];
								_suff = foreground.split("[")[1].split("]")[1];
								if(_pref.length > 0 || _suff.length > 0){
									imageName = imageName + ".png";
									$('#'+childdef['id']+'>[name="foregroundimage"]').attr("src",$.utility('getImage',imageName));
								}
							}
						}else{
							if(backgroundImage === "."){}
							else if(backgroundImage=="defaultImage.png" || backgroundImage=="default-image-button-200x100.png")
								$('#'+childdef['id']+'>[name="foregroundimage"]').attr("src",$.utility('getSystemImage',backgroundImage,childdef['viewtype']));
							else if(backgroundImage=="."){
							}
							//	$('#'+childdef['id']+'>[name="foregroundimage"]').attr("src",$.utility('getSystemImage',backgroundImage,childdef['viewtype']));
							else $('#'+childdef['id']+'>[name="foregroundimage"]').attr("src",$.utility('getImage',backgroundImage));
							
						}
					}
					else{
 						if(backgroundImage=="defaultImage.png" || backgroundImage=="default-image-button-200x100.png"){
 							if(foreground.indexOf("data:image/png;base64") != -1 || foreground.indexOf("data:image/jpeg;base64") != -1){
 								$('#'+childdef['id']+'>[name="backgroundimage"]').attr("src",foreground);
 	 							$('#'+childdef['id']+'>[name="foregroundimage"]').attr("src",foreground);
 							}else{
 								$('#'+childdef['id']+'>[name="backgroundimage"]').attr("src",$.utility('getImage',foreground));
 	 							$('#'+childdef['id']+'>[name="foregroundimage"]').attr("src",$.utility('getImage',foreground));
 							}
 							
 						}else{
 							if(foreground=="." || foreground==""){
 								imageButton.setForegroundImage(childdef['backgroundimage']);
 							}
 							else{
 								if(foreground.indexOf("data:image/png;base64") != -1 || foreground.indexOf("data:image/jpeg;base64") != -1)
 	 	 							$('#'+childdef['id']+'>[name="foregroundimage"]').attr("src",foreground);
 	 							else
 	 								$('#'+childdef['id']+'>[name="foregroundimage"]').attr("src",$.utility('getImage',foreground));}
 							}
 						}
 					}
			}
		};
			
		imageButton.setLineHeight = function(param){
			if(param){
				$('#'+childdef['id']).css({'line-height':param+'px'});
			}
		};
		
		//this function is needed for all of the UI objects
		imageButton.getValue = function(){
			return '';
		};
		imageButton.setValue = function(param){
			childdef['src'] = param;
		};
		
		imageButton.setSource = function(param){
			childdef['source'] = param;
		};
	
		imageButton.applyEvents = function(){

			$('#'+childdef['id']).bind('mouseout', function() {    
	            // just change the bkground image and foreground image here as previously..
				imageButton.setBackgroundImage(childdef['backgroundimage']);
				imageButton.setForegroundImage(childdef['src']);
			});
			
			$('#'+childdef['id']).bind('taphold', function() {    
			     // just change the bkground image and foreground image here for mobile device..
				imageButton.setBackgroundImage(childdef['backgroundimageontap']);
				imageButton.setForegroundImage(childdef['imageontap']);
			});
						
			var alreadyclicked = false;
		    //exchange of if else statment for tapping condition.
			$('#'+childdef['id']).bind('tap', function (event) {
				// default image set code here...
				$('#'+childdef['id']).focus();//Bug #12363 fix
				if(event.stopPropogation != undefined)
					event.stopPropogation();
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
			            
						// re-set to 'normal' images. Date : 14-Jan-2019
						imageButton.setBackgroundImage(childdef['backgroundimage']);
						imageButton.setForegroundImage(childdef['src']);
			        },300); // <-- dblclick tolerance here

					// set 'ontap' images. Date : 14-Jan-2019
					if(childdef['id'].indexOf('-tile-') != -1){ //Bug #12599 --> Hotfix
						childdef['id'] = this.id;
					}
					imageButton.setBackgroundImage(childdef['backgroundimageontap']);
					imageButton.setForegroundImage(childdef['imageontap']);
					
					if(childdef['events']){
						if(childdef['events']['Tap']){
							$.utility('setActionRunningStatus', true);
							var test = [];
							$.extend(test, childdef['events']['Tap']);
							var actionString = JSON.stringify(test).slice();
							new $.actions(pagedef, imageButton, JSON.parse(actionString)).execute();
							event.preventDefault();//Bug #12081 Fix
						}
					}
				}
			});
			
			if(childdef['events']){
				
				if(childdef['events']['flick']){
					$('#'+childdef['id']).swipe(function(){ 
						new $.actions(pagedef, imageButton, childdef['events']['flick'].slice()).execute();
					});
				}
				if(childdef['events']['flickRL']){
					$('#'+childdef['id']).on("swipeleft",function(){ 
						new $.actions(pagedef, imageButton, childdef['events']['flickRL'].slice()).execute();
					});
				}
				if(childdef['events']['flickLR']){
					$('#'+childdef['id']).on("swiperight",function(){ 
						new $.actions(pagedef, imageButton, childdef['events']['flickLR'].slice()).execute();
					});
				}
				
				if(childdef['events']['DragStart']){
					$('#'+childdef['id']).on("dragstart", function( event ) {
						new $.actions(pagedef, imageButton, childdef['events']['DragStart'].slice()).execute();
					});
				}
				if(childdef['events']['Drag']){
					$('#'+childdef['id']).on("drag", function( event ) {
						new $.actions(pagedef, imageButton, childdef['events']['Drag'].slice()).execute();
					});
				}
				if(childdef['events']['DragEnd']){
					$('#'+childdef['id']).on("dragstop", function( event ) {
						new $.actions(pagedef, imageButton, childdef['events']['DragEnd'].slice()).execute();
					});
				}

			}		
			
		};
  
		return imageButton;
	};
	
	function uiDatePicker(pagedef, childdef, data){
		var datePicker = new BaseView(childdef);
		
		datePicker.getTemplate = function(){
			return childdef['template'];
		};
		
		function getModePicker(childdef){
			var mode="";
			if(childdef['mode']==='DateAndTime'){
				if(childdef['timeformat'] != undefined && childdef['timeformat'] == "24 Hour"){
					mode = "<tr><td><div id="+childdef['id']+"_21"+"  role='main' class='ui-content ui-body-a' data-role='content' data-theme='a' >+</div></td><td><div id="+childdef['id']+"_01"+" role='main' class='ui-content ui-body-a' data-role='content' data-theme='a' >+</div></td><td><div id="+childdef['id']+"_11"+" role='main' class='ui-content ui-body-a' data-role='content' data-theme='a' >+</div></td><td><div id="+childdef['id']+"_31"+" role='main' class='ui-content ui-body-a' data-role='content' data-theme='a' >+</div></td><td><div id="+childdef['id']+"_41"+" role='main' class='ui-content ui-body-a' data-role='content' data-theme='a' >+</div></td></tr><tr><td><input type='text' id="+childdef['id']+"_0"+" readonly /></td><td><input type='text' id="+childdef['id']+"_1"+" readonly /></td><td><input type='text' id="+childdef['id']+"_2"+" readonly /></td><td><input type='text' id="+childdef['id']+"_3"+" readonly /></td><td><input type='text' id="+childdef['id']+"_4"+" readonly /></td></tr><tr><td><div id="+childdef['id']+"_22"+" role='main' class='ui-content ui-body-a' data-role='content' data-theme='a' '>-</div></td><td><div id="+childdef['id']+"_02"+" role='main' class='ui-content ui-body-a' data-role='content' data-theme='a' '>-</div></td><td><div id="+childdef['id']+"_12"+" role='main' class='ui-content ui-body-a' data-role='content' data-theme='a' >-</div></td><td><div id="+childdef['id']+"_32"+" role='main' class='ui-content ui-body-a' data-role='content' data-theme='a' '>-</div></td><td><div id="+childdef['id']+"_42"+" role='main' class='ui-content ui-body-a' data-role='content' data-theme='a' '>-</div></td></tr><tr><td colspan='3' style='background-color:#a7a7a7;'><table width='100%'></table></td></tr>";
				}else {
					mode="<tr><td><div id="+childdef['id']+"_21"+"  role='main' class='ui-content ui-body-a' data-role='content' data-theme='a' >+</div></td><td><div id="+childdef['id']+"_01"+" role='main' class='ui-content ui-body-a' data-role='content' data-theme='a' >+</div></td><td><div id="+childdef['id']+"_11"+" role='main' class='ui-content ui-body-a' data-role='content' data-theme='a' >+</div></td><td><div id="+childdef['id']+"_31"+" role='main' class='ui-content ui-body-a' data-role='content' data-theme='a' >+</div></td><td><div id="+childdef['id']+"_41"+" role='main' class='ui-content ui-body-a' data-role='content' data-theme='a' >+</div></td><td><div id="+childdef['id']+"_51"+"  role='main' class='ui-content ui-body-a' data-role='content' data-theme='a' >+</div></td></tr><tr><td><input type='text' id="+childdef['id']+"_0"+" readonly /></td><td><input type='text' id="+childdef['id']+"_1"+" readonly /></td><td><input type='text' id="+childdef['id']+"_2"+" readonly /></td><td><input type='text' id="+childdef['id']+"_3"+" readonly /></td><td><input type='text' id="+childdef['id']+"_4"+" readonly /></td><td><input type='text' id="+childdef['id']+"_5"+" readonly /></td></tr><tr><td><div id="+childdef['id']+"_22"+" role='main' class='ui-content ui-body-a' data-role='content' data-theme='a' '>-</div></td><td><div id="+childdef['id']+"_02"+" role='main' class='ui-content ui-body-a' data-role='content' data-theme='a' '>-</div></td><td><div id="+childdef['id']+"_12"+" role='main' class='ui-content ui-body-a' data-role='content' data-theme='a' >-</div></td><td><div id="+childdef['id']+"_32"+" role='main' class='ui-content ui-body-a' data-role='content' data-theme='a' '>-</div></td><td><div id="+childdef['id']+"_42"+" role='main' class='ui-content ui-body-a' data-role='content' data-theme='a' '>-</div></td><td><div id="+childdef['id']+"_52"+" role='main' class='ui-content ui-body-a' data-role='content' data-theme='a' '>-</div></td><td></tr><tr><td colspan='3' style='background-color:#a7a7a7;'><table width='100%'></table></td></tr>";
				}
			}else if(childdef['mode']==='Time'){
				
				$('#'+childdef['id']).mdtimepicker({
					timeFormat:'hh:mm:ss.000',
					format:'hh:mm:ss', 
					theme:'blue',  
					readOnly:true,
					hourPadding:false,
					clearBtn:false
				});

//				if(childdef['timeformat'] != undefined && childdef['timeformat'] != "24 Hour"){
//					mode="<tr><td><div id="+childdef['id']+"_01"+"  role='main' class='ui-content ui-body-a' data-role='content' data-theme='a' >+</div></td><td><div id="+childdef['id']+"_11"+" role='main' class='ui-content ui-body-a' data-role='content' data-theme='a' >+</div></td><td><div id="+childdef['id']+"_21"+" role='main' class='ui-content ui-body-a' data-role='content' data-theme='a' >+</div></td></tr><tr><td><input type='text' id="+childdef['id']+"_0"+" readonly /></td><td><input type='text' id="+childdef['id']+"_1"+" readonly /></td><td><input type='text' id="+childdef['id']+"_2"+" readonly /></td></tr><tr><td><div id="+childdef['id']+"_02"+" role='main' class='ui-content ui-body-a' data-role='content' data-theme='a' '>-</div></td><td><div id="+childdef['id']+"_12"+" role='main' class='ui-content ui-body-a' data-role='content' data-theme='a' '>-</div></td><td><div id="+childdef['id']+"_22"+" role='main' class='ui-content ui-body-a' data-role='content' data-theme='a' >-</div></td></tr><tr><td colspan='3' style='background-color:#a7a7a7;'><table width='100%'></table></td></tr>";
//				}else{
//					mode = "<tr><td><div id="+childdef['id']+"_01"+"  role='main' class='ui-content ui-body-a' data-role='content' data-theme='a' >+</div></td><td><div id="+childdef['id']+"_11"+" role='main' class='ui-content ui-body-a' data-role='content' data-theme='a' >+</div></td></tr><tr><td><input type='text' id="+childdef['id']+"_0"+" readonly /></td><td><input type='text' id="+childdef['id']+"_1"+" readonly /></td></tr><tr><td><div id="+childdef['id']+"_02"+" role='main' class='ui-content ui-body-a' data-role='content' data-theme='a' '>-</div></td><td><div id="+childdef['id']+"_12"+" role='main' class='ui-content ui-body-a' data-role='content' data-theme='a' '>-</div></td></tr><tr><td colspan='3' style='background-color:#a7a7a7;'><table width='100%'></table></td></tr>";
//				}
			}else {
				mode="<tr><td><div id="+childdef['id']+"_21"+"  role='main' class='ui-content ui-body-a' data-role='content' data-theme='a' >+</div></td><td><div id="+childdef['id']+"_01"+" role='main' class='ui-content ui-body-a' data-role='content' data-theme='a' >+</div></td><td><div id="+childdef['id']+"_11"+" role='main' class='ui-content ui-body-a' data-role='content' data-theme='a' >+</div></td></tr><tr><td><input type='text' id="+childdef['id']+"_0"+" readonly /></td><td><input type='text' id="+childdef['id']+"_1"+" readonly /></td><td><input type='text' id="+childdef['id']+"_2"+" readonly /></td></tr><tr><td><div id="+childdef['id']+"_22"+" role='main' class='ui-content ui-body-a' data-role='content' data-theme='a' '>-</div></td><td><div id="+childdef['id']+"_02"+" role='main' class='ui-content ui-body-a' data-role='content' data-theme='a' '>-</div></td><td><div id="+childdef['id']+"_12"+" role='main' class='ui-content ui-body-a' data-role='content' data-theme='a' >-</div></td></tr><tr><td colspan='3' style='background-color:#a7a7a7;'><table width='100%'></table></td></tr>";
			}
			
			return mode;
	
		}
		
		datePicker.getHTML = function(){
			if(childdef['value']){
				childdef['value']=$.utility('spaceInStringConversion',childdef['value']);
			}
			if((childdef['current'] != undefined && childdef['current'] !== "") && (childdef['current'].indexOf('[') != -1 && childdef['current'].indexOf(']') != -1)){
				childdef['value']  = $.utility('extractDataFromRecord', data, childdef['current']);
			}else{
				childdef['value']  = $.utility('tokenizeString', childdef['current'], pagedef);
			}
			childdef['current'] = childdef['value'];	
			
			if($.utility('getSessionData',"dateSelectedObj",childdef['id'])!=null)
			{
				var dateSelectedObj = $.utility('getSessionData',"dateSelectedObj",childdef['id']);
				dateSelectedObj = $.parseJSON(dateSelectedObj);		
				if($.mobileweb.getCurrentPage().getName()==dateSelectedObj["page_name"] && childdef['id']==dateSelectedObj["u_id"])
				{
					childdef['current'] = dateSelectedObj["dateSelected"];
				}
			}	
			if(childdef['mode']==='Time')
				return  ["<input type='text' id='",childdef['id'],"' name='",childdef['name'],"' tabindex='",childdef['taborder'],"'style='width:200px;height:50px;'></div>"].join('');
			else
				return  ["<div id='",childdef['id'],"' name='",childdef['name'],"' tabindex='",childdef['taborder'],"'><div class='picker-upper'></div><div class='picker-lower'></div><table class='picker' cellpadding='0' cellspacing='0' >"+getModePicker(childdef)+"</table></div>"].join('');
		};
		
		datePicker.applyOverrides = function(){
			if(childdef['hidden']=="true"){
				$('#'+childdef['id']).css({'visibility':'hidden'});
			}
			
			if(childdef['mode']==='Time'){
				getModePicker(childdef);
				$('#'+childdef['id']).css({'margin':'0px'});
				$('.mdtimepicker').css({'background-color':''})
			}else{
				datePicker['frame'].applyCSS();
				datePicker.setCss(childdef);
			}
		};
		datePicker.setCss = function(childdef){
			var aspect = $.mobileweb.device['aspectratio'];
			if(childdef['mode']==='DateAndTime'){
				var tableWidth = (parseFloat(childdef['frame']['width'])*85)/100;
				var divWidth = 0;
				var left = ((((childdef['frame']['width']*$.mobileweb.device['aspectWratio']) - (tableWidth*$.mobileweb.device['aspectWratio']))/2) -10);
				if(childdef['timeformat'] != undefined && childdef['timeformat'] != "24 Hour"){
					divWidth = tableWidth/6;
				}else {
					divWidth = tableWidth/5;
				}
				
				$('#'+childdef['id']+' .ui-content').css({'text-align':'center','width':(divWidth*$.mobileweb.device['aspectWratio'])+'px', 'padding': '10px 0px','margin':'0px 1px'});
				$('#'+childdef['id']+' input').css({'text-align':'center','width':(divWidth*$.mobileweb.device['aspectWratio'])+'px','padding': '0px','height': (22)+'px','margin':'1px'});
				$('#'+childdef['id']+' .picker').css({'position':'absolute','top': '50%','margin-top': '-55px', 'width':tableWidth*$.mobileweb.device['aspectWratio']});
				$('#'+childdef['id']+' .picker').css({'left' :left});
				
			}else if(childdef['mode'] == "Time"){
				var tableWidth = ((parseFloat(childdef['frame']['width'])*85)/100);
				var divWidth = 0;
				var left = ((((childdef['frame']['width']*$.mobileweb.device['aspectWratio']) - (tableWidth*$.mobileweb.device['aspectWratio']))/2) -6);
				if(childdef['timeformat'] != undefined && childdef['timeformat'] != "24 Hour"){
					divWidth = tableWidth/3;
				}else {
					divWidth = tableWidth/2;
				}
				$('#'+childdef['id']+' .ui-content').css({'text-align':'center','width':(divWidth*$.mobileweb.device['aspectWratio'])+'px', 'padding': '10px 0px','margin':'0px 1px'});
				$('#'+childdef['id']+' input').css({'text-align':'center','width':(divWidth*$.mobileweb.device['aspectWratio'])+'px','padding': '0px','height': (24)+'px','margin':'1px'});
				$('#'+childdef['id']+' .picker').css({'position':'absolute','top': '50%','margin-top': '-55px','width':tableWidth*$.mobileweb.device['aspectWratio']});
				$('#'+childdef['id']+' .picker').css({'left' :left});
			}else {
				var tableWidth = ((parseFloat(childdef['frame']['width'])*85)/100);
				var divWidth = tableWidth/3;
				var left = ((((childdef['frame']['width']*$.mobileweb.device['aspectWratio']) - (tableWidth*$.mobileweb.device['aspectWratio']))/2) -6);
				$('#'+childdef['id']+' .ui-content').css({'text-align':'center','width':(divWidth*$.mobileweb.device['aspectWratio'])+'px', 'padding': '10px 0px','margin':'0px 2px'});
				$('#'+childdef['id']+' input').css({'text-align':'center','width':(divWidth*$.mobileweb.device['aspectWratio'])+'px','padding': '0px','height': (24)+'px','margin':'2px'});
				$('#'+childdef['id']+' .picker').css({'position':'absolute','top': '50%','margin-top': '-55px','width':tableWidth*$.mobileweb.device['aspectWratio']});
				$('#'+childdef['id']+' .picker').css({'left' :left});
			}
		};
		datePicker.setLeftMargin = function(param){
			var leftmargin;
			if((childdef['frame'].width>=200)&&(childdef['frame'].width<240)){
				leftmargin=44;
			}else if((childdef['frame'].width>=240)&&(childdef['frame'].width<280)){
				leftmargin=38;
			}else if((childdef['frame'].width>=280)&&(childdef['frame'].width<320)){
				leftmargin=33;
			}else
				leftmargin=30;
			
			$('#'+childdef['id']+' .picker').css({'margin-left':'-'+leftmargin+'%'});
		};
		
		datePicker.getMode = function(){
			return childdef['mode'];
		};
		
		datePicker.setVisibility = function(param){
			if(param === false){
				if(childdef['mode'] === "Time"){
					$('#'+childdef['id']).trigger('timechanged');
				}else{
					$('#'+childdef['id']).css({'visibility':'hidden'});
				}
			}else{
				if(childdef['mode'] === "Time"){
					$('#'+childdef['id']).trigger('click');
				}else{
					$('#'+childdef['id']).css({'visibility':'visible'});
				}
			}
			
		};
		
		datePicker.getValue = function(){
			return childdef['value'];
		};
		
		datePicker.setValue = function(param){
			childdef['value'] = param;
			var cd = $.utility("splitAndReturnDate", param);
			cd.setMonth(cd.getMonth() - 1);
			
			$('#'+childdef['id']+'_0').val(dateFormat(cd, "yyyy"));
			$('#'+childdef['id']+'_1').val($.datePicker("getMonthName",dateFormat(cd, "mmm")));
			$('#'+childdef['id']+'_2').val(dateFormat(cd, "dd"));
			
			if(childdef['mode'] == "DateAndTime"){
				$('#'+childdef['id']+'_3').val(dateFormat(cd, "hh"));
				$('#'+childdef['id']+'_4').val(dateFormat(cd, "MM"));
				$('#'+childdef['id']+'_5').val($.datePicker("getPeriodName",dateFormat(cd, "TT")));
			}
		};
		
		
		datePicker.applyEvents = function(){
			if(childdef['mode']){
				if(childdef['mode'] === "Time"){
					if(childdef['events']){
						if(childdef['events']['OnChange']){
							$('#' + childdef['id']).mdtimepicker().on('timechanged',function(e){
								childdef['value'] = $('#' + childdef['id']).val();
								if(timer != null){
									clearTimeout(timer);
								}
								timer = setTimeout(function() {
									new $.actions(pagedef, datePicker, childdef['events']['OnChange'].slice()).execute();
								}, 2000);
							});
						}
					}
				}
				
				var cd = new Date();
				if(childdef['mode']=="Time"){
					if(childdef['current']!=""){
						cd = new Date("October 13, 1975 "+ childdef['current']);
					}

					if(isNaN(cd))
						cd = new Date();

					if(childdef['timeformat'] != undefined && childdef['timeformat'] === "12 Hour"){
						$('#'+childdef['id']+'_0').val(dateFormat(cd, "hh"));
					}else{
						$('#'+childdef['id']+'_0').val(dateFormat(cd, "HH"));
					}
					$('#'+childdef['id']+'_1').val(dateFormat(cd, "MM"));
					$('#'+childdef['id']+'_2').val($.datePicker("getPeriodName",dateFormat(cd, "TT")));
					updateFo();

					//Hour for "+"
					$('#'+childdef['id']+'_01').click(function () {
						cd.setHours(cd.getHours() + 1);
						updateFo();
						var ui_id=$(this).get(0)['id'].split("_")[0];
						var child=$.utility('getUiID_Object_From_Page',pagedef['name'],ui_id);
						datePicker.applyEvent(child);
					});
					//minute
					$('#'+childdef['id']+'_11').click(function () {
						cd.setMinutes(cd.getMinutes() + 1);
						updateFo();
						var ui_id=$(this).get(0)['id'].split("_")[0];
						var child=$.utility('getUiID_Object_From_Page',pagedef['name'],ui_id);
						datePicker.applyEvent(child);
					});
					//am/pm
					$('#'+childdef['id']+'_21').click(function () {
						cd.setHours(cd.getHours() + 12);
						updateFo();
						var ui_id=$(this).get(0)['id'].split("_")[0];
						var child=$.utility('getUiID_Object_From_Page',pagedef['name'],ui_id);
						datePicker.applyEvent(child);
					});
					//Time
					//Hour for "-"
					$('#'+childdef['id']+'_02').click(function () {
						cd.setHours(cd.getHours() - 1);
						updateFo();
						var ui_id=$(this).get(0)['id'].split("_")[0];
						var child=$.utility('getUiID_Object_From_Page',pagedef['name'],ui_id);
						datePicker.applyEvent(child);;
					});
					$('#'+childdef['id']+'_12').click(function () {
						cd.setMinutes(cd.getMinutes() - 1);
						updateFo();
						var ui_id=$(this).get(0)['id'].split("_")[0];
						var child=$.utility('getUiID_Object_From_Page',pagedef['name'],ui_id);
						datePicker.applyEvent(child);
					});

					$('#'+childdef['id']+'_22').click(function () {
						cd.setHours(cd.getHours() + 12);
						updateFo();
						var ui_id=$(this).get(0)['id'].split("_")[0];
						var child=$.utility('getUiID_Object_From_Page',pagedef['name'],ui_id);
						datePicker.applyEvent(child);
					});
					function updateFo() {
						if(childdef['timeformat'] == "24 Hour"){
							$('#'+childdef['id']+'_0').val(dateFormat(cd, "HH"));
						}else{
							$('#'+childdef['id']+'_0').val(dateFormat(cd, "hh"));
						}
						
						$('#'+childdef['id']+'_1').val(dateFormat(cd, "MM"));
						$('#'+childdef['id']+'_2').val($.datePicker("getPeriodName",dateFormat(cd, "TT")));
						//	  $('#'+childdef['id']).html(dateFormat(cd, "isoTime"));
						if(childdef['timeformat'] != undefined && childdef['timeformat'] === "12 Hour"){
							dateSelected = $('#'+childdef['id']+'_0').val() + ":" + $('#'+childdef['id']+'_1').val() +" "+$('#'+childdef['id']+'_2').val();
							childdef['value'] = dateSelected;
						}else if(childdef['timeformat'] != undefined && childdef['timeformat'] === "24 Hour"){
							dateSelected = $('#'+childdef['id']+'_0').val() + ":" + $('#'+childdef['id']+'_1').val();
							childdef['value'] = dateSelected;
						}else{
							var dateSelected = $('#'+childdef['id']+'_0').val() + ":" + $('#'+childdef['id']+'_1').val() +" "+$('#'+childdef['id']+'_2').val();
							childdef['value'] = dateSelected;
						}
						
					}
				}
				else if(childdef['mode']=="Date"){
					var cd = new Date();
					if((childdef['current'].indexOf("[") != -1) && (childdef['current'].indexOf("]") != -1)){

						var dateValue = $.utility('extractDataFromRecord', data, childdef['current']);
						if(dateValue != "undefined" || dateValue.length >= 11){
							dateValue = dateValue.substr(0,10);

						}
						if(dateValue == "undefined"){
							updateDate();
						}else if(dateValue != ""){
							datePicker.setValue(dateValue);
							cd = $.utility("splitAndReturnDate", datePicker.getValue());
							cd.setMonth(cd.getMonth() - 1);
							updateDate();
						}else {
							updateDate();
						}
					}else if(childdef['current']!=""){
						var cur_date=childdef['current'];
						var date=[];
						if(cur_date.indexOf("-")!= -1){
							date = cur_date.split("-");
						}else if(cur_date.indexOf("/")!= -1){
							date = cur_date.split("/");
						}
						var cur_day=date[2];
						var cur_month=date[1]-1;
						var cur_year=date[0];
						cd = new Date(cur_year, cur_month, cur_day);
						if(isNaN(cd) || (date[0].length<4))
							cd = new Date();
						updateDate();
					}else{
						$('#'+childdef['id']+'_0').val(dateFormat(cd, "yyyy"));
						$('#'+childdef['id']+'_1').val($.datePicker("getMonthName",dateFormat(cd, "mmm")));
						$('#'+childdef['id']+'_2').val(dateFormat(cd, "dd"));
						updateDate();
					}


					$('#'+childdef['id']+'_01').click(function () {
						cd.setMonth(cd.getMonth() + 1);
						updateDate();
						var ui_id=$(this).get(0)['id'].split("_")[0];
						var child=$.utility('getUiID_Object_From_Page',pagedef['name'],ui_id);
						datePicker.applyEvent(child);
					});

					$('#'+childdef['id']+'_11').click(function () {
						cd.setDate(cd.getDate() + 1);
						updateDate();
						var ui_id=$(this).get(0)['id'].split("_")[0];
						var child=$.utility('getUiID_Object_From_Page',pagedef['name'],ui_id);
						datePicker.applyEvent(child);
					});

					$('#'+childdef['id']+'_21').click(function () {
						cd.setYear(cd.getFullYear() + 1);
						updateDate();
						var ui_id=$(this).get(0)['id'].split("_")[0];
						var child=$.utility('getUiID_Object_From_Page',pagedef['name'],ui_id);
						datePicker.applyEvent(child);
					});

					$('#'+childdef['id']+'_02').click(function () {
						cd.setMonth(cd.getMonth() - 1);
						updateDate();
						var ui_id=$(this).get(0)['id'].split("_")[0];
						var child=$.utility('getUiID_Object_From_Page',pagedef['name'],ui_id);
						datePicker.applyEvent(child);
					});

					$('#'+childdef['id']+'_12').click(function () {
						cd.setDate(cd.getDate() - 1);
						updateDate();
						var ui_id=$(this).get(0)['id'].split("_")[0];
						var child=$.utility('getUiID_Object_From_Page',pagedef['name'],ui_id);
						datePicker.applyEvent(child);
					});

					$('#'+childdef['id']+'_22').click(function () {
						cd.setYear(cd.getFullYear() - 1);
						updateDate();
						var ui_id=$(this).get(0)['id'].split("_")[0];
						var child=$.utility('getUiID_Object_From_Page',pagedef['name'],ui_id);
						datePicker.applyEvent(child);
					});

					function updateDate() {
						$('#'+childdef['id']+'_0').val(dateFormat(cd, "yyyy"));
						$('#'+childdef['id']+'_1').val($.datePicker("getMonthName",dateFormat(cd, "mmm")));
						$('#'+childdef['id']+'_2').val(dateFormat(cd, "dd"));
						
						var dateSelected = $('#'+childdef['id']+'_0').val() + "-" + datePicker.getMonthInNumber($('#'+childdef['id']+'_1').val()) +"-"+ $('#'+childdef['id']+'_2').val();
						childdef['value'] = dateSelected;
						
						var dateSelectedObj = {page_name:pagedef['name'],u_id:childdef['id'],dateSelected:dateSelected};
						$.utility('setSessionData',dateSelectedObj,"dateSelectedObj");
					}			
				}
				else {
					//For Date and Time Both
					var cd = new Date();
					if((childdef['current'].indexOf("[") != -1) && (childdef['current'].indexOf("]") != -1)){
						var dateValue = $.utility('extractDataFromRecord', data, childdef['current']);
						if(dateValue == "undefined"){
							updateF();
						}else if(dateValue != ""){
							datePicker.setValue($.utility('extractDataFromRecord', data, childdef['current']));
							cd = $.utility("splitAndReturnDate", datePicker.getValue());
							cd.setMonth(cd.getMonth() - 1);
							updateF();
						}else{
							updateF();
						}
					}else if(childdef['current']!=""){
						var cur_date_time=childdef['current'].split(" ");
						var date='';
						var cur_day='';
						var cur_month='';
						var cur_year='';
						var cur_time='';;
						var hr='';
						var min='';
						var sec=0;
						var period = "";
						if(cur_date_time.length == 2){
							cur_date=cur_date_time[0];
							if(cur_date.indexOf("-")!= -1){
								date = cur_date.split("-");
							}else if(cur_date.indexOf("/")!= -1){
								date = cur_date.split("/");
							}
							cur_day=date[2];
							cur_month=date[1]-1;
							cur_year=date[0];
							cur_time=cur_date_time[1].split(":");
							hr=cur_time[0];
							min=cur_time[1];
							sec=0;
							cd = new Date(cur_year, cur_month, cur_day, hr, min, sec);
						}else{
							cur_date=cur_date_time[0];
							if(cur_date.indexOf("-")!= -1){
								date = cur_date.split("-");
							}else if(cur_date.indexOf("/")!= -1){
								date = cur_date.split("/");
							}
							cur_day=date[2];
							cur_month=date[1]-1;
							cur_year=date[0];
							cur_time=cur_date_time[1].split(":");
							hr=cur_time[0];
							min=cur_time[1];
							sec=0;
							period=cur_date_time[2];
							cd = new Date(childdef['current']);
						}
						if(isNaN(cd) || cur_date_time.length<2)
							cd = new Date();
						updateF();

					} else{
						$('#'+childdef['id']+'_0').val(dateFormat(cd, "yyyy"));
						$('#'+childdef['id']+'_1').val($.datePicker("getMonthName",dateFormat(cd, "mmm")));
						$('#'+childdef['id']+'_2').val(dateFormat(cd, "dd"));
						
						$('#'+childdef['id']+'_3').val(cd.getHours());
						$('#'+childdef['id']+'_4').val(cd.getMinutes());
						$('#'+childdef['id']+'_5').val(cd.getSeconds());
						updateF();
					}

					$('#'+childdef['id']+'_01').click(function () {
						cd.setMonth(cd.getMonth() + 1);
						updateF();
						var ui_id=$(this).get(0)['id'].split("_")[0];
						var child=$.utility('getUiID_Object_From_Page',pagedef['name'],ui_id);
						datePicker.applyEvent(child);
					});
					$('#'+childdef['id']+'_11').click(function () {
						cd.setDate(cd.getDate() + 1);
						updateF();
						var ui_id=$(this).get(0)['id'].split("_")[0];
						var child=$.utility('getUiID_Object_From_Page',pagedef['name'],ui_id);
						datePicker.applyEvent(child);
					});
					$('#'+childdef['id']+'_21').click(function () {
						cd.setYear(cd.getFullYear() + 1);
						updateF();
						var ui_id=$(this).get(0)['id'].split("_")[0];
						var child=$.utility('getUiID_Object_From_Page',pagedef['name'],ui_id);
						datePicker.applyEvent(child);
					});
					//Hour for "+"
					$('#'+childdef['id']+'_31').click(function () {
						cd.setHours(cd.getHours() + 1);
						updateF();
						var ui_id=$(this).get(0)['id'].split("_")[0];
						var child=$.utility('getUiID_Object_From_Page',pagedef['name'],ui_id);
						datePicker.applyEvent(child);
					});
					//minute
					$('#'+childdef['id']+'_41').click(function () {
						cd.setMinutes(cd.getMinutes() + 1);
						updateF();
						var ui_id=$(this).get(0)['id'].split("_")[0];
						var child=$.utility('getUiID_Object_From_Page',pagedef['name'],ui_id);
						datePicker.applyEvent(child);
					});
					//am/pm
					$('#'+childdef['id']+'_51').click(function () {
						cd.setHours(cd.getHours() + 12);
						updateF();
						var ui_id=$(this).get(0)['id'].split("_")[0];
						var child=$.utility('getUiID_Object_From_Page',pagedef['name'],ui_id);
						datePicker.applyEvent(child);
					});

					$('#'+childdef['id']+'_02').click(function () {
						cd.setMonth(cd.getMonth() - 1);
						updateF();
						var ui_id=$(this).get(0)['id'].split("_")[0];
						var child=$.utility('getUiID_Object_From_Page',pagedef['name'],ui_id);
						datePicker.applyEvent(child);
					});
					$('#'+childdef['id']+'_12').click(function () {
						cd.setDate(cd.getDate() - 1);
						updateF();
						var ui_id=$(this).get(0)['id'].split("_")[0];
						var child=$.utility('getUiID_Object_From_Page',pagedef['name'],ui_id);
						datePicker.applyEvent(child);
					});
					$('#'+childdef['id']+'_22').click(function () {
						cd.setYear(cd.getFullYear() - 1);
						updateF();
						var ui_id=$(this).get(0)['id'].split("_")[0];
						var child=$.utility('getUiID_Object_From_Page',pagedef['name'],ui_id);
						datePicker.applyEvent(child);
					});
					$('#'+childdef['id']+'_32').click(function () {
						cd.setHours(cd.getHours() - 1);
						updateF();
						var ui_id=$(this).get(0)['id'].split("_")[0];
						var child=$.utility('getUiID_Object_From_Page',pagedef['name'],ui_id);
						datePicker.applyEvent(child);
					});
					$('#'+childdef['id']+'_42').click(function () {
						cd.setMinutes(cd.getMinutes() - 1);
						updateF();
						var ui_id=$(this).get(0)['id'].split("_")[0];
						var child=$.utility('getUiID_Object_From_Page',pagedef['name'],ui_id);
						datePicker.applyEvent(child);
					});

					$('#'+childdef['id']+'_52').click(function () {
						cd.setHours(cd.getHours() - 12);
						updateF();
						var ui_id=$(this).get(0)['id'].split("_")[0];
						var child=$.utility('getUiID_Object_From_Page',pagedef['name'],ui_id);
						datePicker.applyEvent(child);
					});
					function updateF() {
						$('#'+childdef['id']+'_0').val(dateFormat(cd, "yyyy"));
						$('#'+childdef['id']+'_1').val($.datePicker("getMonthName",dateFormat(cd, "mmm")));
						$('#'+childdef['id']+'_2').val(dateFormat(cd, "dd"));
						if(childdef['timeformat'] == "24 Hour"){
							$('#'+childdef['id']+'_3').val(dateFormat(cd, "HH"));
						}else{
							$('#'+childdef['id']+'_3').val(dateFormat(cd, "hh"));
						}
						
						$('#'+childdef['id']+'_4').val(dateFormat(cd, "MM"));
						$('#'+childdef['id']+'_5').val($.datePicker("getPeriodName",dateFormat(cd, "TT")));
						// setValue...
						var dateSelected = "";
						if(childdef['timeformat'] != undefined && childdef['timeformat'] === "12 Hour"){
							dateSelected = $('#'+childdef['id']+'_0').val() + "-" + datePicker.getMonthInNumber($('#'+childdef['id']+'_1').val()) +"-"+ $('#'+childdef['id']+'_2').val() +" "+ $('#'+childdef['id']+'_3').val() +":"+ $('#'+childdef['id']+'_4').val() + " " + $('#'+childdef['id']+'_5').val()  ;
							childdef['value'] = dateSelected;
						}else if(childdef['timeformat'] != undefined && childdef['timeformat'] === "24 Hour"){
							dateSelected = $('#'+childdef['id']+'_0').val() + "-" + datePicker.getMonthInNumber($('#'+childdef['id']+'_1').val()) +"-"+ $('#'+childdef['id']+'_2').val() +" "+ $('#'+childdef['id']+'_3').val() +":"+ $('#'+childdef['id']+'_4').val();
							childdef['value'] = dateSelected;
						}
					}		
				}
			}
		};

		var timer = null;
		datePicker.applyEvent = function(child){
			if(child['events']){
				if(child['events']['OnChange']){
					if(timer != null){
						clearTimeout(timer);
					}
					timer = setTimeout(function() {
						new $.actions(pagedef, datePicker, child['events']['OnChange'].slice()).execute();
					}, 2000);
				}
			}
		};
		
		datePicker.getMonthInNumber = function(month){
			var engMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			var japMonthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
			var number = -1;
			for(var num = 0; num < engMonthNames.length; num++){
				if(month === engMonthNames[num]){
					number = ++num;
					if(number < 10){
						number = '0'+number;
					}
				}
			}
			if(number == -1){
				for (var num in japMonthNames) {
					if(month === japMonthNames[num]){
						number = ++num;
						if(number < 10){
							number = '0'+number;
						}
					}
				}
			}
			return number;
		};
		
		datePicker.putInitialZero = function(hourOrMinute){
			if(hourOrMinute < 10){
				hourOrMinute = '0'+hourOrMinute;
			}
			return hourOrMinute;
		};
		
		return datePicker;
	};
	
	
	// Second Version of Picker
	function uiPicker(pagedef, childdef, data) {
		var pickerObject = new BaseView(childdef);

		pickerObject.getTemplate = function(){
			return childdef['template'];
		};
		
		pickerObject.getHTML = function(){
			return ["<div id='",childdef['id'],"' set='false' name='",childdef['name'],"' tabindex='",childdef['taborder'],"'><div class='picker-main'>",pickerObject.createPickerItems(childdef),"</div></div>"].join('');	
		};
		pickerObject.createPickerItems = function(childdef){
			var pickersHTML = '';
			var pickerCombinedValue = "";
			// maximum picker items could be 6 not more then that.. as per specs..
			for(var i=0;i<=6;i++){
				var temp = 'picker';
				var picker_items_selected='';
				var pickerArray = new Array();
				var pickerValuesArray = new Array();
				if(childdef['picker_items'][temp+i] !== undefined){
					pickerArray = childdef['picker_items'][temp+i];
					for(var j=0; j<pickerArray.length ; j++){
	                       pickerArray[j]= $.utility('convertSpecialCharacter', $.utility('tokenizeString', pickerArray[j], pagedef)); // for globalValues bugId:7983 25jan16
					}
					pickerValuesArray = childdef['picker_values'][temp+i];
					picker_items_selected= childdef['picker_items_selected'][temp+i];
					picker_items_selected= $.utility('convertSpecialCharacter', $.utility('tokenizeString',picker_items_selected, pagedef)); // for globalValues bugId:7983 25jan16
					if(picker_items_selected.indexOf("[") != -1 && picker_items_selected.indexOf("]") != -1){
						var test = $.utility('extractDataFromRecord', data, picker_items_selected).split(",");
						picker_items_selected  = test[i-1];
						if(picker_items_selected.indexOf('[') != -1 && picker_items_selected.indexOf(']') != -1){
							picker_items_selected = "";
						}
						pickerCombinedValue = pickerCombinedValue + picker_items_selected + ',';
						childdef['picker_items_selected'][temp+i] = pickerValuesArray[j];
						
					}else{
						for(var j = 0; j < pickerValuesArray.length; j++){
							if(pickerValuesArray[j] == picker_items_selected){
								pickerCombinedValue = pickerCombinedValue + pickerValuesArray[j] + ',';
								childdef['picker_items_selected'][temp+i] = pickerValuesArray[j];
							}
						}
					}
					pickersHTML = pickersHTML + pickerObject.createPickerHTML(childdef, pickerArray, pickerValuesArray,picker_items_selected, temp+i);
				}
			}
			pickerCombinedValue = pickerCombinedValue.substring(0, pickerCombinedValue.lastIndexOf(","));
			pickerObject.setValue(pickerCombinedValue);
			return pickersHTML;
		};
		pickerObject.createPickerHTML = function(childdef, pickerItems, pickerValuesArray,picker_items_selected, pickerID){
			var eachPickerHTML = "<div id = '"+childdef['id']+pickerID+"' class='pickerDiv'><div id='scroller' class='scrollerDiv'><table class='pickerTable'><tr><td></td></tr><tr><td></td></tr>";
			var classselected='';
			for (var item = 0; item <  pickerValuesArray.length; item++){ //for(var item in pickerItems,pickerValuesArray){
				if(picker_items_selected!=''){
					classselected='activeRow';
				}
			    if(pickerValuesArray[item]==picker_items_selected){
			    	eachPickerHTML = eachPickerHTML + "<tr id='"+childdef['id']+pickerID+"_"+item+"' val='"+pickerValuesArray[item]+"' class='"+classselected+"' style='text-align:center;height:30px;'><td>"+pickerItems[item]+"</td></tr>";
			    }
			    else{
			    	eachPickerHTML = eachPickerHTML + "<tr id='"+childdef['id']+pickerID+"_"+item+"' val='"+pickerValuesArray[item]+"' style='text-align:center;height:30px;'><td>"+pickerItems[item]+"</td></tr>";
			    }
			}
			eachPickerHTML = eachPickerHTML + "<tr><td></td></tr><tr><td></td></tr></table></div></div>";
			return eachPickerHTML;
		};

		pickerObject.applyOverrides = function(){
			pickerObject['frame'].applyCSS();
			
			if(childdef['hidden']=="true"){
				$('#'+childdef['id']).css({'visibility':'hidden'});
			}
			
			pickerObject.setCSSControlGroupItem(childdef);
		};
		// setting/Applying CSS for Pickers..
		pickerObject.setCSSControlGroupItem = function(childdef){
			var count = 0;
			var innerPickerWidthSum = 0;
			var left;
			for(var pick in childdef['pickers_width']){
				count = count+1;
				innerPickerWidthSum = innerPickerWidthSum + childdef['pickers_width'][pick];
			}

			left = $.mobileweb.device['aspectWratio'] * ((childdef['frame']['width'] - (innerPickerWidthSum + (count - 1) * 10))/2);

			for(var i=0;i<=6;i++){
				var pickerID = 'picker'+(i+1);
				if(childdef['picker_items'][pickerID] !== undefined){
					$('#'+childdef['id']+pickerID).css({'overflow':'hidden','top':'20px','position':'absolute','left':left+'px'});
					left = left + $.mobileweb.device['aspectWratio'] * (childdef['pickers_width'][pickerID]+10);

					// setting CSS...	
					$('#'+childdef['id']+pickerID+' .scrollerDiv').css({"min-width":childdef['pickers_width'][pickerID]*$.mobileweb.device['aspectWratio']+"px","max-width":childdef['pickers_width'][pickerID]*$.mobileweb.device['aspectWratio']+"px","max-height":($('#'+childdef['id']).height()-40)+"px"});
					$('#'+childdef['id']+pickerID+' .pickerTable').css({'width':"100%",'height':'100%'});
					$('#'+childdef['id']+pickerID+' .pickerTable tr').css({'text-align':'center','height':(($('#'+childdef['id']).height()-40)/5)+"px"});
				}
			}

			var val=new Array();
			var index='';
			var pickerCombinedValue = '';
			$.each(childdef['picker_items'], function(pickerIndexName, pickerItems ){
				$.each(pickerItems, function(key, value){
					$('#'+childdef['id']+pickerIndexName + '_' + key).bind("tap",function() {
						var currentRowIndex = this.rowIndex - 2; // where picker has 2 default rows added in the beg. and 2 at last..
						pickerCombinedValue = '';
						if(	childdef['picker_items_selected'][pickerIndexName].toString().indexOf("[") == -1 && 	childdef['picker_items_selected'][pickerIndexName].toString().indexOf("]") == -1){
							childdef['picker_items_selected'][pickerIndexName] = childdef['picker_values'][pickerIndexName][key];
						}
						$(this).addClass('activeRow').siblings('.activeRow').removeClass('activeRow');
						if($(this).get(0).firstChild.innerHTML !== ""){
							for(var i=0;i<=6;i++){
								var temp = 'picker';
								if(childdef['picker_values'][temp+i] !== undefined){

									index=$(this).get(0)['id'].charAt($(this).get(0)['id'].indexOf('picker')+6);
									val[index]=$(this).attr('val');

									if($('#'+childdef['id']+temp+i).find('.activeRow').get(0) !== undefined){
										pickerCombinedValue = pickerCombinedValue +$('#'+childdef['id']+temp+i).find('.activeRow').attr('val') + ",";
									}
								}
							}
							pickerCombinedValue = pickerCombinedValue.substring(0, pickerCombinedValue.lastIndexOf(","));
							pickerObject.setValue(pickerCombinedValue);
							if(pickerCombinedValue !== ''){
								if(childdef['events']['picking'] != undefined){
									var event = [];
									event.push(childdef['events']['picking'][currentRowIndex]);
									new $.actions(pagedef, pickerObject,childdef['events']['picking'].slice()).execute();
								}

							}
						}
					});
				});
			});
		};
		
		pickerObject.getValue = function(){
			return childdef['value'];
		};
		pickerObject.setValue = function(param){
			childdef['value'] = param;
		};

		pickerObject.triggerEvent = function(){
			if(childdef['events']){
				if(childdef['events']['picking']){
					new $.actions(pagedef, pickerObject, childdef['events']['picking']).execute();
				}
			}
		};

		pickerObject.applyEvents = function(){
			for(var i=0;i<=6;i++){
				var temp = 'picker';
				if(childdef['picker_items'][temp+i] !== undefined){
					pickerObject.applyScrollEvents(childdef['id']+temp+i);
				}
			}
		};
		pickerObject.applyScrollEvents = function(pickerID){
			var myScroll;
			$('#'+pickerID).on( "vmouseover", $('#'+pickerID), function() {
				if(myScroll === undefined){
					var scrollerid = $('#'+pickerID+' .scrollerDiv').get(0);
					myScroll = new iScroll(scrollerid, {
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
		};

		return pickerObject;
	};

	
	function uiSegment(pagedef, childdef, data){
		var segment =  new BaseView(childdef);
		
		segment.getTemplate = function(){
			return childdef['template'];
		};
		
		// This temp Id is for DB Pages. Because on the listview pages, segment child ids are coming same becuase od which events are not triggering -- Issue fixed on 12th Aug, 2014 by Sachit Kesri -- be careful while changing this code 
		var tempId = childdef['id'];
		segment.getHTML = function(){
			function segmentItems(params){
				var number=params.length;
				var table = "<table id='"+childdef['id']+"' name='"+childdef['name']+"' height='"+childdef['frame'].height * $.mobileweb.device['aspectHratio']+"px' width='"+childdef['frame'].width * $.mobileweb.device['aspectWratio']+"px' tabindex='"+childdef['taborder']+"'><tr>";
				for(var i=0; i < params.length; i++){
					if(pagedef['type'] === "DBTableViewList" || pagedef['type'] === "RemoteTableViewList"){
						table = table + "<td sel='false' id='"+ tempId + "-" + params[i]['id'] + "' ,align='center' height='100%' width='"+(childdef['frame'].width * $.mobileweb.device['aspectratio'])/childdef['segment_items'].length+"px' line-height='100%'>";	
					}else{
						table = table + "<td sel='false' id='"+params[i]['id']+"' ,align='center' height='100%' width='"+(childdef['frame'].width * $.mobileweb.device['aspectWratio'])/childdef['segment_items'].length+"px' line-height='100%'>";
					}
					
					if(params[i]['type']=='TextItem'){
						table = table + $.utility('convertSpecialCharacter', $.utility('tokenizeString', params[i]['name']));
					}
					/*else if(params[i]['type']=='ImageItem'){	
						table = table + "";
					}*/
					table = table + "</td>";
				}
				table = table + "</tr></table>";
				return table;		
					
			};
			
			var segmentitem=childdef['segment_items'];
			var segmentItemNumbers=childdef['segment_items'].length; 
			return [segmentItems(segmentitem)].join('');
		};
		
		segment.applyOverrides = function(){
			
			if(childdef['hidden']){
				$('#'+childdef['id']).css({'visibility':'hidden'});
			}
			$('#'+childdef['id']).css({'height': (childdef['frame']['height']*$.mobileweb.device['aspectHratio']) + "px" });
			$('#'+childdef['id']).css({'background-color':'black'}); //for default border
			if(childdef['border'] != undefined && childdef['border']['bordercolor'] != undefined)
				$('#'+childdef['id']).css({'background-color':$.attributes('color', childdef['border']['bordercolor']).getColorCode()});
			segment.setTableFrame(childdef['segment_items']);
			segment.setFontSize(childdef['font']);
			
			var initialSelection = $.utility('tokenizeString', childdef['segmentInitialValue'], pagedef);
			var selectedFlag = false;
			$.each(childdef['segment_items'],function(i,child){
				if(child['selected']){
					var selectedItemid = segment.findItemId(child['name']);
					segment.setBgColor( $("#"+selectedItemid), i,"");
					segment.setValue(child['name']);
					selectedFlag = true;
				}
			});
			if(!selectedFlag){
				if(initialSelection != undefined && initialSelection != ""){
					$.each(childdef['segment_items'],function(i,child){
						if(child['type'] == "TextItem" && child['name'] == initialSelection){
							segment.setBgColor($("#"+child['id']), i,"");
							var segmentitem=childdef['segment_items'];
							segment.setValue(segmentitem[i]['name']);
							selectedFlag = true;
						}
					});
				}
			}
		};

		segment.setTableFrame = function(param){
			
			$('#'+childdef['id']).css({'position':'absolute','top':childdef['frame']['y'] * $.mobileweb.device['aspectHratio']+'px','left':childdef['frame']['x'] * $.mobileweb.device['aspectWratio']+'px'});
			$('#'+childdef['id']).css({'border-top-right-radius': '10px','moz-border-radius-topright': '10px','webkit-border-top-right-radius': '10px'});
			$('#'+childdef['id']).css({'border-top-left-radius': '10px','moz-border-radius-topleft': '10px','webkit-border-top-left-radius': '10px'});
			$('#'+childdef['id']).css({'border-bottom-right-radius': '10px','moz-border-radius-bottomright': '10px','webkit-border-bottom-right-radius': '10px'});
			$('#'+childdef['id']).css({'border-bottom-left-radius': '10px','moz-border-radius-bottomleft': '10px','webkit-border-bottom-left-radius': '10px'});
			$('#'+childdef['id']).css({'border-spacing' :'1px'});
			$('#'+childdef['id']).css({'filter':'progid:DXImageTransform.Microsoft.BasicImage(rotation='+childdef['frame']['rotation']+')',
				'-ms-transform':'rotate('+(parseInt(childdef['frame']['rotation']))+'deg)',
				'-ms-filter':'progid:DXImageTransform.Microsoft.BasicImage(rotation='+childdef['frame']['rotation']+')',
				'-moz-transform':'rotate('+(+parseInt(childdef['frame']['rotation']))+'deg)',
				'-o-transform':'rotate('+childdef['frame']['rotation'] +'deg)',
				'transform': 'rotate('+(parseInt(childdef['frame']['rotation']))+'deg)',
				'-webkit-transform':'rotate('+(parseInt(childdef['frame']['rotation']))+'deg)',
				});

			$('#'+childdef['id']).find('td').each (function() {
				$(this).css({'background':'rgba('+childdef['background'].red+','+childdef['background'].green+','+childdef['background'].blue+','+childdef['background'].alpha+')'});
				$(this).css({'max-width':$(this).attr('width'), 'overflow':'hidden', 'text-overflow': 'ellipsis', 'text-shadow':'none', 'text-align':'center'});
			});
			
			$('#'+childdef['id']).find('td:first-child' ).each (function() {
				$(this).css({'border-bottom-left-radius': '10px','moz-border-radius-bottomleft': '10px','webkit-border-bottom-left-radius': '10px'});
				$(this).css({'border-top-left-radius': '10px','moz-border-radius-topleft': '10px','webkit-border-top-left-radius': '10px'});
			}); 
			
			$('#'+childdef['id']).find('td:last-child' ).each (function() {
				$(this).css({'border-top-right-radius': '10px','moz-border-radius-topright': '10px','webkit-border-top-right-radius': '10px'});
				$(this).css({'border-bottom-right-radius': '10px','moz-border-radius-bottomright': '10px','webkit-border-bottom-right-radius': '10px'});
			});	
			
			//Bug #8922 Fix(09.04.2018)
 			for(var i=0; i< param.length; i++){ 
 				if(childdef['style'] && childdef['style'] == "Bezeled"){
 					if(childdef['id'].indexOf('-tile-')){ // Bug #12542 fix
 						var iids = childdef['id'].replace("ui-","").replace("tile-","");
						var res = iids.split("-");
						var uiId = 'ui-' + res[0];
						$('#'+uiId+'-'+i).css({'border-style':'groove'});
						$('#'+childdef['id']).css({'border-spacing':'2px'});
 					}else
 						$('#'+childdef['id']+'-'+i).css({'border-style':'groove'});
 				}
 			}
		};
	
		segment.setFontSize= function(params){
			var segmentitem=childdef['segment_items'];
			for(var i=0; i< segmentitem.length; i++){
				if(segmentitem[i]['type']=="TextItem"){
					$('#'+segmentitem[i]['id']).css({'font-family':segmentitem[i]['font']['fontName']});
					if(childdef['parentUI'] === 'Gadget'){
						$('#'+segmentitem[i]['id']).css({'font-size':(segmentitem[i]['font'].size* $.mobileweb.device['aspectratio'])+'px', 'color' :$.attributes('color', segmentitem[i]['font']['color']).getColorCode()});
					}else if(childdef['id'].indexOf("tile") != -1){//Bug #11892 fix
						var temId = childdef['id'].split("-tile")[0];
						$('#'+temId+'-'+[i]).css({'font-size':(segmentitem[i]['font'].size* $.mobileweb.device['aspectratio'])+'px', 'color' :$.attributes('color', segmentitem[i]['font']['color']).getColorCode()});
					}
					else{
						$('#'+childdef['id']+'-'+[i]).css({'font-size':(segmentitem[i]['font'].size* $.mobileweb.device['aspectratio'])+'px', 'color' :$.attributes('color', segmentitem[i]['font']['color']).getColorCode()});
					}
					
				}else if(segmentitem[i]['type'] == "ImageItem"){
					if(pagedef['type'] === "DBTableViewList" || pagedef['type'] === "RemoteTableViewList"){
						$('#'+childdef['id']+'-'+segmentitem[i]['id']).css({'background':'url("'+$.utility('getImage',segmentitem[i]['src'])+'")  no-repeat', 'background-size':'contain', 'background-position':'center' });
						$('#'+childdef['id']+'-'+segmentitem[i]['id']).addClass("tempClass");	
					}else{
						if(childdef['parentUI'] === 'Gadget'){
							$('#'+segmentitem[i]['id']).css({'background':'url("'+$.utility('getImage',segmentitem[i]['src'])+'")  no-repeat', 'background-size':'contain', 'background-position':'center' });
							$('#'+segmentitem[i]['id']).addClass("tempClass");
						}else if(childdef['id'].indexOf("tile") != -1){//Bug #11892 fix
							var temId = childdef['id'].split("-tile")[0];
							$('#'+segmentitem[i]['id']).css({'background-image':'url("'+$.utility('getImage',segmentitem[i]['src'])+'")', 'background-size':'contain' });
							$('#'+childdef['id']+'-'+segmentitem[i]['id']).addClass("tempClass");
						}
						else{
							$('#'+segmentitem[i]['id']).css({'background-image':'url("'+$.utility('getImage',segmentitem[i]['src'])+'")', 'background-size':'contain' });
							$('#'+childdef['id']+'-'+segmentitem[i]['id']).addClass("tempClass");
						}
					}
				}
			}
			if($.utility('getSessionData',"segmentSel",childdef['id'])!=null)
			{
				var segmentSel = $.utility('getSessionData',"segmentSel",childdef['id']);
				segmentSelected = $.parseJSON(segmentSel);		
				if($.mobileweb.getCurrentPage().getName()==segmentSelected["page_name"])
				{
					var index = segmentSelected['index'];
					$('#'+segmentSelected['u_id']+'-'+index).css({'background':$.attributes('color', childdef['segment_items'][index]['onTapTintColor']).getColorCode()});
				}
			}	
		};
		
		segment.findItemId = function(itemName){
			var segmentItem = childdef['segment_items'];
			for(var j=0; j< segmentItem.length; j++){
				if(segmentItem[j]['type'] === "TextItem" && segmentItem[j]['name'] === itemName){
					if(pagedef['type'] === "DBTableViewList" || pagedef['type'] === "RemoteTableViewList"){
						return tempId + "-" + segmentItem[j]['id'];
					}else{
						return segmentItem[j]['id'];
					}
				}
			}
		};

		segment.getValue = function(){
			if(childdef['value'] != undefined){
				return childdef['value'];	
			}else{
				return "";
			}
		};
		segment.setValue = function(param){
			childdef['value'] = param;
			
			var segmentItem = childdef['segment_items'];
			for(var j=0; j< segmentItem.length; j++){
				if(segmentItem[j]['name'] == param)
					segmentItem[j]['selected'] = true;
				else
					segmentItem[j]['selected'] = false;
			}
		};
		segment.resetValue = function(){
			var segmentItem = childdef['segment_items'];			
			$('#'+childdef['id']).find('td').each (function(i) {
				
				if(segmentItem[i]['name'] == childdef['value']){
					if(segmentItem[i]['type']=="TextItem"){
						$(this).css({'background':''});
						$(this).css({'background-color':'rgba('+childdef['background'].red+','+childdef['background'].green+','+childdef['background'].blue+','+childdef['background'].alpha+')'});
						$(this).css({'color' :$.attributes('color', segmentItem[i]['font']['color']).getColorCode()});
					}else if(segmentItem[i]['type']=="ImageItem"){
						$(this).css({'background-image':'url("'+$.utility('getImage',childdef['segment_items'][i]['src'])+'")', 'background-size':'contain' });
					}
				}
				
				segmentItem[i]['selected'] = false;
				$(this).attr('sel','false');
			});
			
			childdef['value'] = "";
			//console.log("-------- segment resetValue -------");
		};
		
		segment.setBgColor = function($current, index, callingmethod){

			var allSiblings = $current.parent().find('td');
			if(callingmethod === "SetMainValue" || callingmethod === "setValue"){
				if(!$('#'+allSiblings[index].id).hasClass('tempClass')){
					if($current.attr('id') != allSiblings[index].id){
						$('#'+allSiblings[index].id).css({'background':''});
						$('#'+allSiblings[index].id).css({'background-color':'rgba('+childdef['background'].red+','+childdef['background'].green+','+childdef['background'].blue+','+childdef['background'].alpha+')'});
						if(childdef['segment_items'][i]['type']=="TextItem")
							$('#'+childdef['id']+'-'+[i]).css({'color' :$.attributes('color', childdef['segment_items'][i]['font']['color']).getColorCode()});
						else if(childdef['segment_items'][i]['type']=="ImageItem")
							$('#'+allSiblings[index].id).css({'background-image':'url("'+$.utility('getImage',childdef['segment_items'][i]['src'])+'")', 'background-size':'contain' });
					}else{
						if(childdef['segment_items'][i]['type']=="TextItem"){
							$current.css({'background':$.attributes('color', childdef['segment_items'][i]['onTapTintColor']).getColorCode()});
							if(childdef['parentUI'] === 'Gadget'){
								$('#'+childdef['segment_items'][i]['id']).css({'color' :$.attributes('color', childdef['segment_items'][i]['onTapTextColor']).getColorCode()});
							}else if(childdef['id'].indexOf("tile") != -1){//Bug #11892 fix
								var temId = childdef['id'].split("-tile")[0];
								$('#'+temId+'-'+[i]).css({'font-size':(segmentitem[i]['font'].size* $.mobileweb.device['aspectratio'])+'px', 'color' :$.attributes('color', segmentitem[i]['font']['color']).getColorCode()});
							}
							else
								$('#'+childdef['id']+'-'+[i]).css({'color' :$.attributes('color', childdef['segment_items'][i]['onTapTextColor']).getColorCode()});							
						}
					}
				}
			}else{
				for(var i=0; i < allSiblings.length; i++){
					if(!$('#'+allSiblings[i].id).hasClass('tempClass')){
						if($current.attr('id') != allSiblings[i].id){
							if(childdef['segment_items'][i]['type']=="TextItem"){
								$('#'+allSiblings[i].id).css({'background':''});
								$('#'+allSiblings[i].id).css({'background-color':'rgba('+childdef['background'].red+','+childdef['background'].green+','+childdef['background'].blue+','+childdef['background'].alpha+')'});
								$('#'+childdef['id']+'-'+[i]).css({'color' :$.attributes('color', childdef['segment_items'][i]['font']['color']).getColorCode()});
							}else if(childdef['segment_items'][i]['type']=="ImageItem"){
								$('#'+allSiblings[i].id).css({'background-image':'url("'+$.utility('getImage',childdef['segment_items'][i]['src'])+'")', 'background-size':'contain' });
							}
						}else{
							if(childdef['segment_items'][i]['type']=="TextItem"){
								$current.css({'background':$.attributes('color', childdef['segment_items'][i]['onTapTintColor']).getColorCode()});
								if(childdef['parentUI'] === 'Gadget'){
									$('#'+childdef['segment_items'][i]['id']).css({'color' :$.attributes('color', childdef['segment_items'][i]['onTapTextColor']).getColorCode()});
								}else if(childdef['id'].indexOf("tile") != -1){//Bug #11892 fix
									var temId = childdef['id'].split("-tile")[0];
									$('#'+temId+'-'+[i]).css({'font-size':(childdef['segment_items'][i]['font'].size* $.mobileweb.device['aspectratio'])+'px', 'color' :$.attributes('color', childdef['segment_items'][i]['onTapTextColor']).getColorCode()});
								}
								else
									$('#'+childdef['id']+'-'+[i]).css({'color' :$.attributes('color', childdef['segment_items'][i]['onTapTextColor']).getColorCode()});							
							}
						}
					}
				}
			}
		};
		segment.resetBgColor = function($current, index, callingmethod){
			var allSiblings = $current.parent().find('td');
			if(callingmethod === "SetMainValue" || callingmethod === "setValue"){
				if(!$('#'+allSiblings[index].id).hasClass('tempClass')){
					if($current.attr('id') == allSiblings[index].id){
						if(childdef['segment_items'][i]['type']=="TextItem"){
							$('#'+allSiblings[index].id).css({'background':''});
							$('#'+allSiblings[index].id).css({'background-color':'rgba('+childdef['background'].red+','+childdef['background'].green+','+childdef['background'].blue+','+childdef['background'].alpha+')'});
						}else if(childdef['segment_items'][i]['type']=="ImageItem"){
							$('#'+allSiblings[index].id).css({'background-image':'url("'+$.utility('getImage',childdef['segment_items'][i]['src'])+'")', 'background-size':'contain' });
						}
					}
				}
			}
		};
		
		segment.applyEvents = function(){
			var selectedId ="";
			var segmentItem = childdef['segment_items'];
			for(var j=0; j< segmentItem.length; j++){
				// This if statement is for DB Pages. Because on the listview pages segment child ids are coming same becuase od which events are not triggering -- Issue fixed on 12th Aug, 2014 by Sachit Kesri -- be careful while changing this code 
				if(pagedef['type'] === "DBTableViewList" || pagedef['type'] === "RemoteTableViewList"){
					if(segmentItem[j]['template']){
						if(segmentItem[j]['template'] === ""){
							if(segmentItem[j]['selected'] != undefined && segmentItem[j]['selected']){
								selectedId = tempId + "-" + segmentItem[j]['id'];
							}
						}else{
							var value = $.utility('extractDataFromRecord', data, segmentItem[j]['template']);
							if(value != undefined && value === segmentItem[j]['name']){
								selectedId = tempId + "-" + segmentItem[j]['id'];
							}
						}
					}
					
					$("#"+tempId + "-" + segmentItem[j]['id']).bind("tap", function() {
						$('#'+childdef['id']).find('td').each (function() {
							$(this).attr('sel','false');
						});
						$(this).attr('sel','true');
						
						var index = $(this).attr('id').substring($(this).attr('id').lastIndexOf("-")+1);
						segment.setValue(segmentItem[index]['name']);
						if(segmentItem[index]['events']['Tap']){
							new $.actions(pagedef, segment, segmentItem[index]['events']['Tap'].slice()).execute();
						}
						
						// now set Bg Color for segment..
						segment.setBgColor($(this), index,"");
					});
					
				}else{
					if(segmentItem[j]['template']){
						if(segmentItem[j]['template'] === ""){
							if(segmentItem[j]['selected'] != undefined && segmentItem[j]['selected']){
								selectedId = segmentItem[j]['id'];
							}
						}else{
							var value = $.utility('extractDataFromRecord', data, segmentItem[j]['template']);
							if(value != undefined && value === segmentItem[j]['name']){
								selectedId = segmentItem[j]['id'];
							}
						}
					}
					
					$("#"+ segmentItem[j]['id']).bind("tap", function() {
						$('#'+childdef['id']).find('td').each (function() {
							$(this).attr('sel','false');
						});
						$(this).attr('sel','true');
						
						var index = $(this).attr('id').substring($(this).attr('id').lastIndexOf("-")+1);
						segment.setValue(segmentItem[index]['name']);
						if(segmentItem[index]['events']['Tap']){
							new $.actions(pagedef, segment, segmentItem[index]['events']['Tap'].slice()).execute();
						}
						
						// now set Bg Color for segment..
						segment.setBgColor($(this), index,"");
						
						//Richa
						var segmentSel = {page_name:pagedef['name'],u_id:childdef['id'],segmentSel:$(this).attr('sel'),index:index};
						$.utility('setSessionData',segmentSel,"segmentSel");
						//--
					});
				}
			}
		};
 
		return segment;
	};
		
		
	function uiCamera(pagedef, childdef, data){
		var camera =  new BaseView(childdef);
		
		camera.getTemplate = function(){
			return childdef['template'];
		};
		
		var view = childdef['cameraView'];
		var cameraErrorFlag;
		camera.getHTML = function(){
			if(((navigator.userAgent.match(/android/i)) && ($.browser.chrome == undefined || $.browser.chrome == false))){
				return [""].join('');
			}else if(navigator.userAgent.match(/(iPad|iPhone|iPod)/g)){
				return ["<video name="+childdef['name']+" id="+ childdef['id']+" width="+childdef['frame']['width']+" height = "+childdef['frame']['height']+" autoplay muted playsinline></video>"].join('');
			}else {
				return ["<video name="+childdef['name']+" id="+ childdef['id']+" width="+childdef['frame']['width']+" height = "+childdef['frame']['height']+" autoplay tabindex='"+childdef['taborder']+"'></video>"].join('');
			}
		};
		
		camera.applyOverrides = function(){
			camera['frame'].applyCSS();
			
			if(childdef['hidden']){
			    $('#'+childdef['id']).css({'visibility':'hidden'});
			    $('#'+childdef['id']+'_canvas').css({'visibility':'hidden'});
		    }
			$("#"+childdef["id"]).css({"object-fit" : "inherit"});
			
			var videoElement = document.getElementById(childdef['id']);
			var constraints = {}; 
			if(navigator.mediaDevices != undefined){
				if (typeof navigator.mediaDevices.enumerateDevices === 'undefined') {
					$.errorhandler('alertBox','This browser does not support Camera.\n\nTry Chrome.');
				}else {
					navigator.mediaDevices.enumerateDevices()
					.then(function(devices){
						var videoDevices = [0,0];
						var videoDeviceIndex = 0;
						devices.forEach(function(device) {
							/*console.log(device.kind + ": " + device.label +
									" id = " + device.deviceId);*/
							if (device.kind == "videoinput" && view === "front") {
								constraints = { video: { facingMode: "user" } };
							}else if(device.kind == "videoinput" && view === "rear") {
								constraints = { video: { facingMode: { exact: "environment" } } };
							}
						});
					})
				}
			}
			
			function successCallback(stream) {
				window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;        
				try {
					if(stream != undefined)
						videoElement.srcObject = stream;						
				} catch (error) {
					videoElement.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
				}
			}

			function errorCallback(error) {
				camera.setCameraErrorFlag(true);
				if($("body").find("#"+childdef['id']+"_canvas").length == 0){
					if(!childdef['hidden']){//Bug #9055 fix
						camera.drawCanvas();
						$('#'+childdef['id']+'_canvas').attr("width",childdef['frame']['width'] *$.mobileweb.device['aspectWratio']);
						$('#'+childdef['id']+'_canvas').attr("height",childdef['frame']['height'] *$.mobileweb.device['aspectHratio']);
						$('#'+childdef['id']+'_canvas').attr("style","top:"+childdef['frame']['y'] *$.mobileweb.device['aspectHratio']+"px;left:"+childdef['frame']['x'] *$.mobileweb.device['aspectWratio']+"px; position:absolute");
					}
				}
			}
			
			setTimeout(function(){
				if (!!window.stream) {
					videoElement.src = null;
				}
				
				if(navigator.mediaDevices != undefined){
					if (navigator.mediaDevices.getUserMedia != undefined){
						if(videoElement.srcObject){
							videoElement.srcObject.getTracks().forEach(function(track) {
							    track.stop();
							});
						}
						var Promise = navigator.mediaDevices.getUserMedia(constraints);
						if (Promise !== undefined) {
							Promise.then(function(stream) {
								successCallback(stream);
						    }).catch(function(error) {
						    	errorCallback(error);
						  	});
						}
					}
				}else{
					if(navigator.getUserMedia){
						navigator.getUserMedia(constraints, successCallback, errorCallback);
					}else{
						camera.setCameraErrorFlag(true);
						if($("body").find("#"+childdef['id']+"_canvas").length == 0){
							if(!childdef['hidden']){//Bug #9055 fix
								camera.drawCanvas();
								$('#'+childdef['id']+'_canvas').attr("width",childdef['frame']['width'] *$.mobileweb.device['aspectWratio']);
								$('#'+childdef['id']+'_canvas').attr("height",childdef['frame']['height'] *$.mobileweb.device['aspectHratio']);
								$('#'+childdef['id']+'_canvas').attr("style","top:"+childdef['frame']['y'] *$.mobileweb.device['aspectHratio']+"px;left:"+childdef['frame']['x'] *$.mobileweb.device['aspectWratio']+"px; position:absolute");
							}
						}

						$("#"+childdef['id']).bind( "tap", function(event) {
							if(!$.isEmptyObject($("#"+childdef['id']+"_camera"))){
								var tempCamera=document.createElement("input");
								tempCamera.setAttribute("id", childdef['id']+"_camera");
								tempCamera.setAttribute("type","file");
								tempCamera.setAttribute("accept","image/*;capture=camera");
								tempCamera.setAttribute("width",childdef['frame']['width'] *$.mobileweb.device['aspectWratio']);
								tempCamera.setAttribute("height",childdef['frame']['height'] *$.mobileweb.device['aspectHratio']);
								tempCamera.setAttribute("style","top:"+childdef['frame']['y'] *$.mobileweb.device['aspectHratio']+"px; left:"+childdef['frame']['x'] *$.mobileweb.device['aspectWratio']+"px; visibility: hidden;");
								$("#"+childdef["id"]).parent().append(tempCamera);

								$("#"+childdef['id']+"_camera").bind("change", function(event){
									var files = $("#"+childdef['id']+"_camera").get(0).files[0];
									var reader = new FileReader();
									reader.readAsBinaryString(files);
									reader.onload = function(){
										$("#"+childdef['id']).attr('src',"data:image/png;base64," + window.btoa(reader.result));
									};
								});
							}
							
							//Bug-9055 Fix
						    if(childdef['hidden']){
							    $('#'+childdef['id']).css({'visibility':'hidden'});
							    $('#'+childdef['id']+'_canvas').css({'visibility':'hidden'});
						    }
							$("#"+childdef['id']+"_camera").trigger("click");
						});
					}
				}
			},2000);
			
		};
		
		camera.setSide = function(param){
			view = param;
			camera.applyOverrides();
		};
		
		camera.setValue = function(param){
			childdef['value'] = param;
		};
		
		camera.getMainValue = function(param){
			return childdef['mainValue'];
		};
		camera.setMainValue = function(param){
			childdef['mainValue'] = param;
			camera.setValue(param);
			
		};
		
		camera.getCameraErrorFlag = function(){
			return childdef['cameraErrorFlag'];
		};
		camera.setCameraErrorFlag = function(param){
			childdef['cameraErrorFlag'] = param;
		};
		
		camera.drawCanvas = function(){
			if(childdef['cameraView'] == "rear")
				$.errorhandler('alertBox',"This device/browser doesn't support rear camera feature.");
			else if(childdef['cameraView'] == "front")
				$.errorhandler('alertBox',"This device/browser doesn't support front camera feature.");
			else
				$.errorhandler('alertBox',"This device/browser doesn't support camera feature.");
			var tempCanvas=document.createElement("img");
			tempCanvas.setAttribute("id",childdef['id']+"_canvas");
			tempCanvas.setAttribute("src",$.utility('getSystemImage','camera.png',childdef['viewtype']));
			$("#"+childdef['id']).parent().prepend(tempCanvas);		
		};

		camera.applyEvents = function(){
			
		};
		camera.applyCameraEvents = function(param){
			if(childdef['events']){
				if(childdef['events']['OnPicking']){
					new $.actions(pagedef, camera, childdef['events']['OnPicking'].slice()).execute();
				}
			}
		};
		camera.pause = function(){
			/*video = document.getElementById(childdef['id']),
			video.pause();
			video.src="";
			video.src=null;
			if(childdef['events']){
				if(childdef['events']['OnPicking']){
					new $.actions(pagedef, camera, childdef['events']['OnPicking'].slice()).execute();
				}
			}	*/
		};
		
		return camera;
	};
		
	function uiQRCode(pagedef, childdef, data){
		var qrCode =  new BaseView(childdef);
		var value = "";
		qrCode.getHTML = function(){
			return [
			        '<div class="panel-body">',
			        '<div class="col-md-6">',
			        '<div class="well" style="position: relative;display: inline-block;">',
			        '<canvas id="'+childdef['id']+'" ></canvas>',
			        '<div class="scanner-laser laser-rightBottom" style="opacity: 0.5;"></div>',
			        '<div class="scanner-laser laser-rightTop" style="opacity: 0.5;"></div>',
			        '<div class="scanner-laser laser-leftBottom" style="opacity: 0.5;"></div>',
			        '<div class="scanner-laser laser-leftTop" style="opacity: 0.5;"></div>',
			        '</div>',
			        '</div>',
			        '</div>'
			        ].join('');
		};

		qrCode.applyOverrides = function(){
			qrCode['frame'].applyCSS();
			$('#'+childdef['id']).css({'height':childdef['frame']['height']*$.mobileweb.device['aspectratio'] +'px', 'width':childdef['frame']['width']*$.mobileweb.device['aspectratio']+'px'});
			$('#'+childdef['id']).css({'top':(childdef['frame']['y']*$.mobileweb.device['aspectratio']) +'px' ,'left':(childdef['frame']['x'] *$.mobileweb.device['aspectratio'])+'px'}); 
			
			var option = {};
			navigator.getUserMedia = (navigator.getUserMedia ||navigator.webkitGetUserMedia ||navigator.mozGetUserMedia || navigator.msGetUserMedia);
				var id1= '';
				function gotSources(sourceInfos) {
					for (var i = 0; i !== sourceInfos.length; ++i) {
						var sourceInfo = sourceInfos[i];
						if( sourceInfo.facing === "environment"){
							id1= sourceInfo.id;
						}	
					}
				}
				if (typeof navigator.mediaDevices.enumerateDevices === 'undefined') {
					$.errorhandler('alertBox','This browser does not support Camera.\n\nTry Chrome.');
				}else {
					navigator.mediaDevices.enumerateDevices()
					.then(function(devices){
						var videoDevices = [0,0];
						var videoDeviceIndex = 0;
						devices.forEach(function(device) {
							/*console.log(device.kind + ": " + device.label +
									" id = " + device.deviceId);*/
							if (device.kind == "videoinput" && view === "front" && device.label === "camera 1, facing front") {
								option.value = device.deviceId;
								option.text = "camera 1, facing front";
							}else if(device.kind == "videoinput" && view === "rear" && device.label === "camera 0, facing back") {
								option.value = device.deviceId;
								option.text = "camera 0, facing back";
							}
						});
					})
				}
				
				setTimeout(function(){
				var decoder = $('#'+childdef['id']),
				sl = $('.scanner-laser'),
				si = $('#scanned-img');
				if (typeof decoder.data().plugin_WebCodeCam == "undefined") {
					decoder.WebCodeCam({
						videoSource: {
							id: id1,
							maxWidth: 480,
							maxHeight: 320
						},
						autoBrightnessValue: 120,
						resultFunction: function(text, imgSrc) {
							si.attr('src', imgSrc);
							qrCode.setValue(text);
							alert(text);
							$.each(pagedef['children'], function(i, child){
								if(child['template'] === "["+childdef['name']+"]"){
										new $.actions(pagedef, null, [{method:"SetMainValue",category:"MainValue", name:child['name'],params:{value:text,targetpage:pagedef['name']},condition:{},events:{OnElse:[],Success:[],Error:[],}}]).execute();
								}
							});
							sl.fadeOut(150, function() {
								sl.fadeIn(150);
							});
						},
						getUserMediaError: function() {
							alert('Sorry, the browser you are using doesn\'t support getUserMedia');
						},
						cameraError: function(error) {
							var p, message = 'Error detected with the following parameters:\n';
							for (p in error) {
								message += p + ': ' + error[p] + '\n';
							}
						}
					});
				} else {
					decoder.data().plugin_WebCodeCam.cameraPlay();
				}
			},2000)
			};
		qrCode.getTemplate = function(){
			return childdef['template'];
		};
		qrCode.applyEvents = function(){
			
		};
		qrCode.setValue = function(param){
			value = param;
		};
		qrCode.getValue = function(param){
			return value;
		};
		return qrCode;
	};
	
	function uiComboBox(pagedef, childdef, data){
		var comboBox = new BaseView(childdef);
		comboBox['initialValue'] = childdef['initialValue'];
		
		comboBox.getTemplate = function(){
 			return childdef['template'];
		};
		
		if(!$.utility("isReverseTransition"))
			pagedef['comboBoxData'] = {};
		else{
			if(pagedef['comboBoxData'] == undefined)
				pagedef['comboBoxData'] = {};
		}
		var where = childdef['dbparams']['where'];
		comboBox.getHTML = function(){
			childdef['taborder'] =  parseInt(childdef['taborder'])+1;
			if(childdef['placeholder'] != undefined && childdef['placeholder'] != "")
				return ["<fieldset id ='"+childdef['id']+"'> <select  id = '"+childdef['id']+"_select' name ='"+childdef['name']+"' tabindex='"+childdef['taborder']+"' data-corners = false data-native-menu = true><option value='' disabled selected hidden>",childdef['placeholder'],"</option>",comboBox.addItem(childdef),"</select></fieldset>"].join('');
			else
				return ["<fieldset id ='"+childdef['id']+"'> <select  id = '"+childdef['id']+"_select' name ='"+childdef['name']+"' tabindex='"+childdef['taborder']+"' data-corners = false data-native-menu = true>",comboBox.addItem(childdef),"</select></fieldset>"].join('');
		};
		
		var itemsHTML = "";
		comboBox.addItem =function(childdef){
			itemsHTML = "";
			if(childdef['type'] === "DB"){
				if(childdef['dbparams']['servicename']!= undefined && childdef['dbparams']['servicename']!= ""){	// For Remote DB only
					comboBox.getRemoteDBData(childdef['dbparams']);
				}else{
					// For Local DB only..
					comboBox.getLocalDBData(childdef['dbparams']);
				}
			}else if(childdef['type'] === "Mixed"){
				var initialSelection = $.utility('tokenizeString', childdef['initialValue'], pagedef);
				if(!$.utility("isReverseTransition")){
				 	 $.each(childdef['combo_options']['optionsValue'],function(key,value){
						 if(key == (initialSelection - 1) || value == initialSelection){
							 childdef['selectedindex'] = key;
						 }
				 	 });
				 }else{
				 	initialSelection = childdef['value'];
				 	$.each(childdef['combo_options']['optionsValue'],function(key,value){
						 if(key == (initialSelection - 1) || value == initialSelection){
							 childdef['selectedindex'] = key;
						 }
				 	 });
				 }
				 
				if(initialSelection == ""){
					childdef['selectedindex'] = -1;
				}
				for(var i=0;i<childdef['combo_options']['optionsValue'].length; i++){
					childdef['combo_options']['optionsValue'][i] = $.utility('convertSpecialCharacter', $.utility('tokenizeString', childdef['combo_options']['optionsValue'][i]));
					if(i == childdef['selectedindex']){
						childdef['value'] = childdef['combo_options']['optionsID'][i];
						itemsHTML += '<option value="'+childdef['combo_options']['optionsID'][i]+'" selected>'+childdef['combo_options']['optionsValue'][i]+'</option>';
					}else{
						itemsHTML += '<option value="'+childdef['combo_options']['optionsID'][i]+'">'+childdef['combo_options']['optionsValue'][i]+'</option>';
					}
				}
				
				if(childdef['dbparams']['servicename']!= undefined && childdef['dbparams']['servicename']!= ""){	// For Remote DB only
					comboBox.getRemoteDBData(childdef['dbparams']);
				}else{
					// For Local DB only..
					comboBox.getLocalDBData(childdef['dbparams']);
				}
				
			}else {
				var initialSelection = $.utility('tokenizeString', childdef['initialValue'], pagedef);
				if(!$.utility("isReverseTransition")){
				 	 $.each(childdef['combo_options']['optionsValue'],function(key,value){
						 if(key == (initialSelection - 1) || value == initialSelection){
							 childdef['selectedindex'] = key;
						 }
				 	 });
				 }else{
				 	initialSelection = childdef['value'];
				 	$.each(childdef['combo_options']['optionsValue'],function(key,value){
						 if(key == (initialSelection - 1) || value == initialSelection){
							 childdef['selectedindex'] = key;
						 }
				 	 });
				 }
				 
				if(initialSelection == ""){
					childdef['selectedindex'] = -1;
				}
				for(var i=0;i<childdef['combo_options']['optionsValue'].length; i++){
					childdef['combo_options']['optionsValue'][i] = $.utility('convertSpecialCharacter', $.utility('tokenizeString', childdef['combo_options']['optionsValue'][i]));
					if(i == childdef['selectedindex']){
						childdef['value'] = childdef['combo_options']['optionsID'][i];
						itemsHTML += '<option value="'+childdef['combo_options']['optionsID'][i]+'" selected>'+childdef['combo_options']['optionsValue'][i]+'</option>';
					}else{
						itemsHTML += '<option value="'+childdef['combo_options']['optionsID'][i]+'">'+childdef['combo_options']['optionsValue'][i]+'</option>';
					}
				}
				return itemsHTML;
			}
				
		};
		
		comboBox.getRemoteDBData = function(dbparams){
			var fieldName = dbparams['fieldname'].replace("[","").replace("]","");
			var id = childdef['id'];
			pagedef['comboBoxData'][childdef['id']] = {'isLoaded': false};
			if( childdef['initial_combo_options'] == undefined && childdef['type'] == "Mixed"){
				 childdef['initial_combo_options'] = childdef['combo_options']
			}
			childdef['combo_options'] = {optionsValue:[],optionsID:[]};
			var rdbTimer = 800;
			if(!$.utility("isReverseTransition")){
				new $.actions(pagedef, null, [{method:"Select", category:"ComAction", callingMethod:"{'uiobject':{'ui':'comboBox','id':'"+childdef['id']+"','fieldname':'"+fieldName+"','displayText':'"+dbparams['displayText']+"'}}", comboBox : true,
				params:{
					servicename: dbparams['servicename'],
					table: dbparams['tablename'],
					where: $.utility("tokenizeString",where, pagedef),
					order: $.utility("tokenizeString",dbparams['order'], pagedef),
					fields: fieldName
					}
				}].slice()).execute();
			}else{
				rdbTimer = 0;
			}
			
			var myVar=setInterval(function() {
				if(($.utility("getComboBoxDataLoadingStatus")[childdef['id']] != undefined && $.utility("getComboBoxDataLoadingStatus")[childdef['id']]['loadingStatus'] === true)/*(pagedef['comboBoxData'][childdef['id']]['isLoaded'] != undefined) && (pagedef['comboBoxData'][childdef['id']]['isLoaded'])*/){
					clearInterval(myVar);
//					if(childdef['type'] !== "Mixed")
					itemsHTML = "";
					
					var initialSelection = $.utility('tokenizeString', childdef['initialValue'], pagedef);
					var displayText = childdef['dbparams']['displayText'].toString().replace("[","").replace("]","");
					
					if(childdef['type'] == "Mixed"){
						for(var i=0;i<childdef['initial_combo_options']['optionsValue'].length; i++){
							childdef['initial_combo_options']['optionsValue'][i] = $.utility('convertSpecialCharacter', $.utility('tokenizeString', childdef['initial_combo_options']['optionsValue'][i]));
							if(i == childdef['selectedindex']){
								childdef['value'] = childdef['combo_options']['optionsID'][i];
								itemsHTML += '<option value="'+childdef['initial_combo_options']['optionsID'][i]+'" selected>'+childdef['initial_combo_options']['optionsValue'][i]+'</option>';
							}else{
								itemsHTML += '<option value="'+childdef['initial_combo_options']['optionsID'][i]+'">'+childdef['initial_combo_options']['optionsValue'][i]+'</option>';
							}
						}
					}
					
					for(var i=0;i < $.utility("getComboBoxDataLoadingStatus")[childdef['id']]['data'].length; i++){
						var optionValue = "";
						var _displayText = childdef['dbparams']['displayText'].toString();
						var _dtextArr = _displayText.split("[");
						for(var d=0; d < _dtextArr.length; d++){
							if(_dtextArr[d].indexOf("]") > -1){
								var _dtext = _dtextArr[d].substring(0,_dtextArr[d].indexOf("]"));
								var _option = $.utility("getComboBoxDataLoadingStatus")[childdef['id']]['data'][i][_dtext];
								var rtext = _dtextArr[d].substring(_dtextArr[d].indexOf("]")+1);

								optionValue += _option + rtext;
							}else
								optionValue += _dtextArr[d];
						}
						
						childdef['combo_options']['optionsValue'][i] = optionValue;	//$.utility("getComboBoxDataLoadingStatus")[childdef['id']]['data'][i][displayText];
						childdef['combo_options']['optionsID'][i] = $.utility("getComboBoxDataLoadingStatus")[childdef['id']]['data'][i][fieldName];
						if($.utility("getComboBoxDataLoadingStatus")[childdef['id']]['data'][i][fieldName] == initialSelection){
							childdef['value'] = $.utility("getComboBoxDataLoadingStatus")[childdef['id']]['data'][i][fieldName];
							itemsHTML += '<option value="'+childdef['combo_options']['optionsID'][i]+'" selected>'+childdef['combo_options']['optionsValue'][i]+'</option>';
						}else{
							itemsHTML += '<option value="'+childdef['combo_options']['optionsID'][i]+'">'+childdef['combo_options']['optionsValue'][i]+'</option>';
						}
						
					}
					if(childdef['placeholder'] != undefined && childdef['placeholder'] != "" && initialSelection == ""){
						itemsHTML = "<option value='' disabled='' selected=''>Select User</option>" + itemsHTML
						$('#'+childdef['id']+' div > div > span :first-child').css({'color':'gray'});
					}
					
					if(childdef['type'] == "Mixed"){
						 childdef['combo_options']['optionsValue'] = $.merge($.merge( [], childdef['initial_combo_options']['optionsValue'] ),childdef['combo_options']['optionsValue']);
						 childdef['combo_options']['optionsID'] = $.merge($.merge( [], childdef['initial_combo_options']['optionsID'] ),childdef['combo_options']['optionsID']);
					}
					
					$('#'+childdef['id']+"_select").html(itemsHTML).selectmenu('refresh');
				}
			},rdbTimer);
		};
		
		comboBox.getLocalDBData = function(dbparams){
			var fieldName = dbparams['fieldname'].replace("[","").replace("]","");
			var id = childdef['id'];
			
			if(!$.utility("isReverseTransition")){
				pagedef['comboBoxData'][childdef['id']] = {'isLoaded': false};
				if( childdef['initial_combo_options'] == undefined && childdef['type'] == "Mixed"){
					 childdef['initial_combo_options'] = childdef['combo_options']
				}
				childdef['combo_options'] = {optionsValue:[],optionsID:[]};
			}else
				pagedef['comboBoxData'][childdef['id']] = {'isLoaded': true};
			
			var x = document.getElementById(childdef['id']+"_select");
			if (x != undefined){
				if (x.length > 0) {
					for(var i =0; i < $('#'+childdef['id']+"_select")[0].length; i++){
						$('#'+childdef['id']+"_select")[0].remove(i);
					}
					$('#'+childdef['id']+"_select")[0].innerHTML = "";
				}else
					$('#'+childdef['id']+"_select").empty();
			}
			
			
			var ldbTimer = 100;
			if(!$.utility("isReverseTransition")){
				new $.actions(pagedef, null, [{method:"Select", category:"DBAction", comboCallingMethod:"{'uiobject':{'ui':'comboBox','id':'"+childdef['id']+"','fieldname':'"+fieldName+"','displayText':'"+ dbparams['displayText'] +"'}}", comboBox : true,
					params:{
						tablename: dbparams['tablename'],
						where: $.utility("tokenizeString",where, pagedef),
						order: $.utility("tokenizeString",dbparams['order'], pagedef),
						columns:""
						}
					}].slice()).execute();
			}else{
				ldbTimer = 0;
			}
			
			var counter = 0;
			var myVar=setInterval(function() {
				if(counter == 10)	
					clearInterval(myVar);
				if(!$.isEmptyObject(pagedef['comboBoxData']) && pagedef['comboBoxData'][childdef['id']] != undefined){
					if((pagedef['comboBoxData'][childdef['id']]['isLoaded'] != undefined) && (pagedef['comboBoxData'][childdef['id']]['isLoaded'])){
						if(childdef['type'] !== "Mixed" || (childdef['initial_combo_options'] != undefined && childdef['type'] == "Mixed"))
							itemsHTML = "";
						
						if(childdef['type'] == "Mixed"){
							 childdef['combo_options']['optionsValue'] = $.merge($.merge( [], childdef['initial_combo_options']['optionsValue'] ),childdef['combo_options']['optionsValue']);
							 childdef['combo_options']['optionsID'] = $.merge($.merge( [], childdef['initial_combo_options']['optionsID'] ),childdef['combo_options']['optionsID']);
						}
						
						if(childdef['refresh'] === true){
							var _index = childdef['selectedindex'];
							childdef['initialValue'] = childdef['combo_options']['optionsValue'][_index];
							childdef['refresh'] = false;
						}
						
						var initialSelection = $.utility('tokenizeString', childdef['initialValue'], pagedef);
						for(var i=0;i<childdef['combo_options']['optionsValue'].length; i++){
							if(childdef['combo_options']['optionsID'][i] == initialSelection){
								itemsHTML += '<option value="'+childdef['combo_options']['optionsID'][i]+'" selected>'+childdef['combo_options']['optionsValue'][i]+'</option>';
							}else{
								itemsHTML += '<option value="'+childdef['combo_options']['optionsID'][i]+'">'+childdef['combo_options']['optionsValue'][i]+'</option>';
							}
						}
						if(childdef['placeholder'] != undefined && childdef['placeholder'] != "" && initialSelection == ""){
							itemsHTML = "<option value='' disabled='' selected='' hidden>Select User</option>" + itemsHTML
							$('#'+childdef['id']+' div > div > span :first-child').css({'color':'gray'});
						}
						
						$('#'+childdef['id']+"_select").html(itemsHTML).selectmenu('refresh');
						clearInterval(myVar);
					}
					else
						counter += 1;
				}
//				else
//					console.log('comboBoxData is empty object. Please check');
			},ldbTimer);
			
		};
		
		comboBox.applyOverrides = function(){
			comboBox['frame'].applyCSS();
			
			if(childdef['hidden']){
				$('#'+childdef['id']).css({'visibility':'hidden'});
			}
			if(childdef['border']){
				$('#'+childdef['id']+' div > div').css({'border-width':childdef['border']['borderweight']*$.mobileweb.device['aspectratio'] +"px"});
				$('#'+childdef['id']+' div > div').css({'border-color':$.attributes('color', childdef['border']['bordercolor']).getColorCode()});
			}
			if(childdef['background']){
				$('#'+childdef['id']+' .ui-btn-inner').css({'background-color':$.attributes('color', childdef['background']).getColorCode()});
				if(childdef['background']['alpha'] < 1){	// when background is transparent..
					$('#'+childdef['id']+' div > div').css({'background':'none'});
				}
			}

			$('#'+childdef['id']+'_select').css({'display':'inline-block'});
			var _height = childdef['frame']['height'] *$.mobileweb.device['aspectHratio'];
			var _width = childdef['frame']['width'] *$.mobileweb.device['aspectWratio'];
			var fontsize = childdef['font']['size'] *$.mobileweb.device['aspectHratio'];
			
			if(childdef['border']){
				_height = _height - 2*(childdef['border']['borderweight']*$.mobileweb.device['aspectratio']);
				_width = _width - 2*(childdef['border']['borderweight']*$.mobileweb.device['aspectratio']);
				$('#'+childdef['id']+' div > div').css({'height':_height+'px', 'width':_width+'px', 'margin':'0px'});
			}else
				$('#'+childdef['id']+' div > div').css({'height':_height+'px', 'width':_width+'px', 'margin':'0px'});
			
			$('#'+childdef['id']+' div > div > span').css({'height':_height+'px', 'width':_width+'px', 'line-height':childdef['frame']['height']*$.mobileweb.device['aspectHratio']+'px', 'padding':'0px', 'border':'0px'});
			//this'first-child' is label of combo-box.
			$('#'+childdef['id']+' div > div > span :first-child').css({'height':'100%','width':(childdef['frame']['width']-(childdef['padding']['left']+childdef['padding']['right']))*$.mobileweb.device['aspectWratio'] - 40 +'px'});
			$('#'+childdef['id']+' div > div > span :first-child').css({'left':childdef['padding']['left']*$.mobileweb.device['aspectWratio'],'right':childdef['padding']['right']*$.mobileweb.device['aspectWratio']});
			$('#'+childdef['id']+' div > div > span :first-child').css({'font-weight':'normal','font-family':childdef['font']['fontName'],'font-size':fontsize+'px','color':$.attributes('color', childdef['font']['color']).getColorCode()});
			$('#'+childdef['id']+' div > div > span :first-child').css({'text-align':childdef['font']['align'],'vertical-align':childdef['verticalalignment'],'line-height':'normal','text-shadow': 'none'});
			$('#'+childdef['id']+"_select").css({'font-weight':'normal','font-family':childdef['font']['fontName'],'font-size':fontsize+'px','padding-left':'10px'});
			
			if(childdef['font']['fontName'] == "system" || childdef['font']['fontName'] == "Helvetica Neue"){
				$('#'+childdef['id']+' div > div > span :first-child').css({'font-family':'"source_sans_proregular","Arial","Sans Serif"'});
				$('#'+childdef['id']+"_select").css({'font-family':'"source_sans_proregular","Arial","Sans Serif"'});
			}
			
			//Combox for ios and Mac
			$('#'+childdef['id']+' div > a > span').css({'height':(childdef['frame']['height']*$.mobileweb.device['aspectHratio'])+'px','width':(childdef['frame']['width']*$.mobileweb.device['aspectWratio'])+'px','padding':'0px'});
			$('#'+childdef['id']+' div > a > span').css({'left':childdef['padding']['left']*$.mobileweb.device['aspectWratio'],'right':childdef['padding']['right']*$.mobileweb.device['aspectWratio']});
			$('#'+childdef['id']+' div > a > span').css({'font-weight':'normal','font-family':childdef['font']['fontName'],'font-size':fontsize+'px','color':$.attributes('color', childdef['font']['color']).getColorCode()});
			$('#'+childdef['id']+' div > a > span').css({'text-align':childdef['font']['align'],'vertical-align':childdef['verticalalignment'],'line-height':'normal','text-shadow': 'none'});
			
			if(childdef['border']){
				$('#'+childdef['id']+'_select-button').css({'border-width':childdef['border']['borderweight'] +"px",'border-radius':childdef['cornerRadius'] +"px"});
				$('#'+childdef['id']+'_select-button').css({'border-color':$.attributes('color', childdef['border']['bordercolor']).getColorCode()});
			}
			if (childdef['cornerRadius'] != undefined){
				$('#'+childdef['id'] + '> div > div').css({'border-radius':childdef['cornerRadius']*$.mobileweb.device['aspectratio'] +"px"});
				$('#'+childdef['id']+'_select-button').css({'border-radius':childdef['cornerRadius']*$.mobileweb.device['aspectratio'] +"px"});
			}
			
			if (childdef['verticalalignment'] != undefined){
   				var padtop = childdef['padding']['top']*$.mobileweb.device['aspectHratio'];
 				var padbottom = childdef['padding']['bottom']*$.mobileweb.device['aspectHratio'];
 				
   				if (childdef['verticalalignment'] =='top'){
   					padbottom = parseInt(_height)-parseInt(fontsize)-padtop;					
   					$('#'+childdef['id']+' div > div > span :first-child').css({'padding-top' :padtop});
   					
   					$('#'+childdef['id']+' div > a > span > span').css({'padding-top' :padtop});
   					
   				}else if (childdef['verticalalignment'] =='bottom'){
   					padtop = parseInt(_height)-parseInt(fontsize)-padbottom;					
   					$('#'+childdef['id']+' div > div > span :first-child').css({'padding-top' :padtop});
   					
   					$('#'+childdef['id']+' div > a > span > span').css({'padding-top' :padtop});
   					
   				}else{
   					_height = _height - (padtop + padbottom);
   					var topPad = (parseFloat(_height)-parseInt(fontsize))/2;
   					topPad = topPad + padtop - padbottom;
   					$('#'+childdef['id']+' div > div > span :first-child').css({'padding-top':topPad,'padding-bottom' :padbottom});
	   				$('#'+childdef['id']+' div > a > span > span').css({'padding-top' :padtop});
	 				$('#'+childdef['id']+' div > a > span > span.ui-btn-text').css({'padding-top':topPad,'padding-bottom' :padbottom});
   				}
   			}
			
			var _dropdownImageurl = $.utility('getSystemImage', "icons-18-white.png","Image");
			$('#'+childdef['id']+' div > div > span > span').last().css({'background-image':'url("'+_dropdownImageurl+'")'});
			$('.ui-icon-arrow-d').css({'background-position': '-217px 50%','right':'12px'});
		};
		
		comboBox.setLineHeight = function(param){
			if(param){
				$('#'+childdef['id']).css({'line-height':param+'px'});
			}
		};

		comboBox.applyEvents = function(){
			
			if(childdef['events'] != undefined){
				if(childdef['events']['OnSelect']){
					$('#'+childdef['id']+"_select").bind("change",function() {
						childdef['value'] = $('#'+childdef['id'] +' option:selected').attr('value');
						/* A hot fix  for NIC Application  as slice only works for String and numbers not for objects in Array*/
						var test = [];
						$.extend(test, childdef['events']['OnSelect']);
						var actionString = JSON.stringify(test).slice();
						new $.actions(pagedef, comboBox, JSON.parse(actionString)).execute();
					});
				}
			}
			$('#'+childdef['id']).bind('change', function() {
				$('#'+childdef['id']+' div > div > span :first-child').css({'color':$.attributes('color', childdef['font']['color']).getColorCode()});
				var value = $('#'+childdef['id'] +' option:selected').attr('value');
				if(childdef['type'] === "DB"){
					for(var i=0;i<childdef['combo_options']['optionsValue'].length; i++){
						if(childdef['combo_options']['optionsID'][i] == value){
							childdef['initialValue'] = value;
						}
					}
					$('body').css({'pointer-events':'auto'});
				}else if(childdef['type'] === "Mixed"){
					for(var i=0;i<childdef['combo_options']['optionsValue'].length; i++){
						if(childdef['combo_options']['optionsID'][i] == value){
							childdef['initialValue'] = value;
							childdef['selectedindex'] = i;
						}
					}
				}
				else{
					for(var i=0;i<childdef['combo_options']['optionsValue'].length; i++){
						if(childdef['combo_options']['optionsID'][i] == value){
							childdef['selectedindex'] = i;
						}
					}
				}
				
				childdef['value'] = $('#'+childdef['id'] +' option:selected').attr('value');
			});
			
			$('#'+childdef['id']).focus(function () {
				$('#'+childdef['id']+'_select').css({'border':'none'});
				$('#'+childdef['id']+'_select').trigger("focus");
			})
			
			if (navigator.appVersion.indexOf("Mac") != -1){
				$('#'+childdef['id']).bind('tap', function() {
					$('div.ui-selectmenu').css({'visibilty':'none','padding':'0px','border-radius':'0px','border-width':'0px','min-width':'0px','width':(childdef['frame']['width']*$.mobileweb.device['aspectWratio'])+'px'});
					var timer = setInterval(function(){
						clearInterval(timer);
						var isMobile = (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Windows Phone/i.test(navigator.userAgent)) ? true : false;		
						if(isMobile){
							var _top = parseFloat($('#'+childdef['id']).css('top')) + parseFloat($('#'+childdef['id']).css('height'));
							$('div.ui-popup-container').css({'position':'relative','top':_top - 10,'left': parseFloat($('#'+childdef['id']).css('left')) + 'px'});
						}
						$('div.ui-popup-container').css({'position':'relative'});
						$('a.ui-link-inherit').css({'font-size':'smaller'});
						$('div.ui-selectmenu').css({'visibilty':'visible'});
					},10);
				});
			}
			
		};
		
		
		comboBox.setValue = function(param){
			childdef['value'] = param;
			$('#'+childdef['id']+"_select").val(param).trigger("change");
		};
		
		comboBox.getValue = function(){
			childdef['value'] = $('#'+childdef['id'] +' option:selected').attr('value');
			return childdef['value'] 
			
		};
		
		comboBox.setVisibility = function(param){
			if(param === true){
				childdef['hidden'] = false;
				$('#'+comboBox.getId()).css({'visibility':'visible'});
			}else{
				childdef['hidden'] = true;
				$('#'+comboBox.getId()).css({'visibility' : 'hidden'});
			}
		};		
		
		comboBox.getDBType = function(){
			if(childdef['dbparams']['servicename']!= undefined && childdef['dbparams']['servicename']!= ""){	// For Remote DB only
					return "remote";
				}else{
					return "local";
				}
		};	
		
		comboBox.refresh = function(param, order){
			//As per MCS logic >> when 'changecondition' happened, initialValue should be reset
			if(comboBox['initialValue'] != undefined){
				if(comboBox['initialValue'] != childdef['initialValue'])
					childdef['initialValue'] = comboBox['initialValue'];
			}
			where = param;
			childdef['dbparams']['order'] = order;
			childdef['refresh'] = true;
			comboBox.addItem(childdef);			
		}

		return comboBox;
	};
	
	function uiComboBoxEditable(pagedef, childdef, data){
		var comboBoxEditable = new BaseView(childdef);
		comboBoxEditable['initialValue'] = childdef['initialValue'];
		
		comboBoxEditable.getTemplate = function(){
 			return childdef['template'];
		};
		
		if(!$.utility("isReverseTransition"))
			pagedef['comboBoxData'] = {};
		else{
			if(pagedef['comboBoxData'] == undefined)
				pagedef['comboBoxData'] = {};
		}
		var where = childdef['dbparams']['where'];
		comboBoxEditable.getHTML = function(){
			childdef['taborder'] =  parseInt(childdef['taborder'])+1;
			return ["<input id ='"+childdef['id']+"_input' list = '"+childdef['id']+ "' autocomplete='off' placeholder='"+childdef['placeholder']+"' tabindex='"+childdef['taborder']+"' ><datalist  id = '"+childdef['id']+"'name ='"+childdef['name']+"'>",comboBoxEditable.addItem(childdef),"</datalist>"].join('');
		};
		
		var itemsHTML = "";
		comboBoxEditable.addItem =function(childdef){
			itemsHTML = "";
			if(childdef['type'] === "DB"){
				if(childdef['dbparams']['servicename']!= undefined && childdef['dbparams']['servicename']!= ""){	// For Remote DB only
					comboBoxEditable.getRemoteDBData(childdef['dbparams']);
				}else{
					// For Local DB only..
					comboBoxEditable.getLocalDBData(childdef['dbparams']);
				}
			}else if(childdef['type'] === "Mixed"){
				var initialSelection = $.utility('tokenizeString', childdef['initialValue'], pagedef);
				if(initialSelection == ""){
					childdef['selectedindex'] = -1;
				}else{
					$.each(childdef['combo_options']['optionsValue'],function(key,value){
						 if(key == (initialSelection - 1) || value == initialSelection)
						 {
							 childdef['selectedindex'] = key;
						 }
					 });
				}
				
				for(var i=0;i<childdef['combo_options']['optionsValue'].length; i++){
					childdef['combo_options']['optionsValue'][i] = $.utility('convertSpecialCharacter', $.utility('tokenizeString', childdef['combo_options']['optionsValue'][i]));
					if(i == childdef['selectedindex']){
						childdef['value'] = childdef['combo_options']['optionsID'][i];
						itemsHTML += '<option data-value="'+childdef['combo_options']['optionsID'][i]+'" selected>'+childdef['combo_options']['optionsValue'][i]+'</option>';
					}else{
						itemsHTML += '<option data-value="'+childdef['combo_options']['optionsID'][i]+'">'+childdef['combo_options']['optionsValue'][i]+'</option>';
					}
				}
				
			
				if(childdef['dbparams']['servicename']!= undefined && childdef['dbparams']['servicename']!= ""){	// For Remote DB only
					comboBoxEditable.getRemoteDBData(childdef['dbparams']);
				}else{
					// For Local DB only..
					comboBoxEditable.getLocalDBData(childdef['dbparams']);
				}
			}else {
				var initialSelection = $.utility('tokenizeString', childdef['initialValue'], pagedef);
				if(initialSelection == ""){
					childdef['selectedindex'] = -1;
				}else{
					$.each(childdef['combo_options']['optionsValue'],function(key,value){
						 if(key == (initialSelection - 1) || value == initialSelection)
						 {
							 childdef['selectedindex'] = key;
						 }
					 });
				}
				
				for(var i=0;i<childdef['combo_options']['optionsValue'].length; i++){
					childdef['combo_options']['optionsValue'][i] = $.utility('convertSpecialCharacter', $.utility('tokenizeString', childdef['combo_options']['optionsValue'][i]));
					if(i == childdef['selectedindex']){
						childdef['value'] = childdef['combo_options']['optionsID'][i];
						itemsHTML += '<option data-value="'+childdef['combo_options']['optionsID'][i]+'" selected>'+childdef['combo_options']['optionsValue'][i]+'</option>';
					}else{
						itemsHTML += '<option data-value="'+childdef['combo_options']['optionsID'][i]+'">'+childdef['combo_options']['optionsValue'][i]+'</option>';
					}
				}
				return itemsHTML;
			}
				
		};
		
		comboBoxEditable.getRemoteDBData = function(dbparams){
			var fieldName = dbparams['fieldname'].replace("[","").replace("]","");
			var id = childdef['id'];
			var rdbTimer = 300;
			pagedef['comboBoxData'][childdef['id']] = {'isLoaded': false};
			if(childdef['type'] == "Mixed"){
				 childdef['initial_combo_options'] = childdef['combo_options'];
				
			}
			childdef['combo_options'] = {optionsValue:[],optionsID:[]};
			
			if(!$.utility("isReverseTransition")){
				new $.actions(pagedef, null, [{method:"Select", category:"ComAction", callingMethod:"{'uiobject':{'ui':'comboBox','id':'"+childdef['id']+"','fieldname':'"+fieldName+"','displayText':'"+dbparams['displayText']+"'}}", comboBox : true,
				params:{
					servicename: dbparams['servicename'],
					table: dbparams['tablename'],
					where: $.utility("tokenizeString",where, pagedef),
					order: $.utility("tokenizeString",dbparams['order'], pagedef),
					fields: fieldName
					}
				}].slice()).execute();
			}else{
				rdbTimer = 0;
			}
			
			var myVar=setInterval(function() {
				if(($.utility("getComboBoxDataLoadingStatus")[childdef['id']] != undefined && $.utility("getComboBoxDataLoadingStatus")[childdef['id']]['loadingStatus'] === true)/*(pagedef['comboBoxEditableData'][childdef['id']]['isLoaded'] != undefined) && (pagedef['comboBoxEditableData'][childdef['id']]['isLoaded'])*/){
					clearInterval(myVar);
					var initialSelection = $.utility('tokenizeString', childdef['initialValue'], pagedef);
					var innerHTMLInitial = "";
					var selectedOptionFound = false;
					var displayText = childdef['dbparams']['displayText'].toString().replace("[","").replace("]","");
					for(var i=0;i < $.utility("getComboBoxDataLoadingStatus")[childdef['id']]['data'].length; i++){
						var optionValue = "";
						var _displayText = childdef['dbparams']['displayText'].toString();
						var _dtextArr = _displayText.split("[");
						for(var d=0; d < _dtextArr.length; d++){
							if(_dtextArr[d].indexOf("]") > -1){
								var _dtext = _dtextArr[d].substring(0,_dtextArr[d].indexOf("]"));
								var _option = $.utility("getComboBoxDataLoadingStatus")[childdef['id']]['data'][i][_dtext];
								var rtext = _dtextArr[d].substring(_dtextArr[d].indexOf("]")+1);

								optionValue += _option + rtext;
							}else
								optionValue += _dtextArr[d];
						}
						
						childdef['combo_options']['optionsValue'][i] = optionValue;
						childdef['combo_options']['optionsID'][i] = $.utility("getComboBoxDataLoadingStatus")[childdef['id']]['data'][i][fieldName];
						if($.utility("getComboBoxDataLoadingStatus")[childdef['id']]['data'][i][fieldName] == initialSelection){
							innerHTMLInitial = '<option data-value="'+childdef['combo_options']['optionsID'][i]+'" selected>'+childdef['combo_options']['optionsValue'][i]+'</option>';
							childdef['value'] = childdef['combo_options']['optionsValue'][i];
							selectedOptionFound = true;
						}else{
							itemsHTML += '<option data-value="'+childdef['combo_options']['optionsID'][i]+'">'+childdef['combo_options']['optionsValue'][i]+'</option>';
						}
					}
					
					if(childdef['type'] == "Mixed"){
						 childdef['combo_options']['optionsValue'] = $.merge($.merge( [], childdef['initial_combo_options']['optionsValue'] ),childdef['combo_options']['optionsValue']);
						 childdef['combo_options']['optionsID'] = $.merge($.merge( [], childdef['initial_combo_options']['optionsID'] ),childdef['combo_options']['optionsID']);
					}
					$('#'+childdef['id']).html(innerHTMLInitial + itemsHTML);
					if(!$.utility("isReverseTransition"))
							$('#'+childdef['id']+'_input').val("");
					$('#'+childdef['id']).val(childdef['value']);
				}
			},rdbTimer);
		};
		
		comboBoxEditable.getLocalDBData = function(dbparams){
			var fieldName = dbparams['fieldname'].replace("[","").replace("]","");
			var id = childdef['id'];
			if(!$.utility("isReverseTransition")){
				pagedef['comboBoxData'][childdef['id']] = {'isLoaded': false};
				if( childdef['initial_combo_options'] == undefined && childdef['type'] == "Mixed"){
					 childdef['initial_combo_options'] = childdef['combo_options']
				}
				childdef['combo_options'] = {optionsValue:[],optionsID:[]};
			}else
				pagedef['comboBoxData'][childdef['id']] = {'isLoaded': true};
			
			var ldbTimer = 300;
			if(!$.utility("isReverseTransition")){
				new $.actions(pagedef, null, [{method:"Select", category:"DBAction", comboCallingMethod:"{'uiobject':{'ui':'comboBox','id':'"+childdef['id']+"','fieldname':'"+fieldName+"','displayText':'"+ dbparams['displayText'] +"'}}", comboBox : true,
					params:{
						tablename: dbparams['tablename'],
						where: $.utility("tokenizeString",where, pagedef),
						order: $.utility("tokenizeString",dbparams['order'], pagedef),
						columns:""
						}
					}].slice()).execute();
			}else{
				ldbTimer = 0;
			}
			
			var ldbcounter = 0;
			var myVar=setInterval(function() {
				if(ldbcounter == 10)	
					clearInterval(myVar);
				if(!$.isEmptyObject(pagedef['comboBoxData']) && pagedef['comboBoxData'][childdef['id']] != undefined){
					if((pagedef['comboBoxData'][childdef['id']]['isLoaded'] != undefined) && (pagedef['comboBoxData'][childdef['id']]['isLoaded'])){
						var initialSelection = $.utility('tokenizeString', childdef['initialValue'], pagedef);
						var innerHTMLInitial = "";
						if(childdef['type'] !== "Mixed" || (childdef['initial_combo_options'] != undefined && childdef['type'] == "Mixed"))
							itemsHTML = "";						
						if(childdef['type'] == "Mixed"){
							 childdef['combo_options']['optionsValue'] = $.merge($.merge( [], childdef['initial_combo_options']['optionsValue'] ),childdef['combo_options']['optionsValue']);
							 childdef['combo_options']['optionsID'] = $.merge($.merge( [], childdef['initial_combo_options']['optionsID'] ),childdef['combo_options']['optionsID']);
						}
						for(var i=0;i<childdef['combo_options']['optionsValue'].length; i++){
							if(childdef['combo_options']['optionsID'][i] == initialSelection){
								childdef['value'] = initialSelection;
								$('#'+childdef['id']+'_input').val(childdef['value']);
								innerHTMLInitial = '<option data-value="'+childdef['combo_options']['optionsID'][i]+'" selected>'+childdef['combo_options']['optionsValue'][i]+'</option>';
							}else{
								itemsHTML += '<option data-value="'+childdef['combo_options']['optionsID'][i]+'">'+childdef['combo_options']['optionsValue'][i]+'</option>';
							}
						}
						$('#'+childdef['id']).html(innerHTMLInitial + itemsHTML);
						if(!$.utility("isReverseTransition"))
							$('#'+childdef['id']+'_input').val("");
						clearInterval(myVar);
					}else
						ldbcounter += 1;
				}
//				else
//					console.log('comboBoxEditableData is empty object. Please check');
			},ldbTimer);
			
		};
		
		comboBoxEditable.applyOverrides = function(){
			comboBoxEditable['frame'].applyCSS();
			
			if(childdef['hidden']){
				$('#'+childdef['id']+'_input').css({'visibility':'hidden'});
				$('#'+childdef['id']).css({'visibility':'hidden'});
			}
			if(childdef['border']){
				$('#'+childdef['id']+'_input').css({'border-width':childdef['border']['borderweight'] +"px"});
				$('#'+childdef['id']+'_input').css({'border-color':$.attributes('color', childdef['border']['bordercolor']).getColorCode()});
			}
			if (childdef['cornerRadius'] != undefined){
				var _cornerRadius = childdef['cornerRadius']*$.mobileweb.device['aspectratio'];
				$('#'+childdef['id']+'_input').css({'border-radius':_cornerRadius +"px"});
			}
			if(childdef['background']){
				$('#'+childdef['id']+'_input').css({'background-color':$.attributes('color', childdef['background']).getColorCode()});
				if(childdef['background']['alpha'] < 1){	// when background is transparent..
					$('#'+childdef['id']+'_input').css({'background':'none'});
				}
			}
			var _height = childdef['frame']['height'] *$.mobileweb.device['aspectHratio'];
			var _width = childdef['frame']['width'] *$.mobileweb.device['aspectWratio'];
			var fontsize = childdef['font']['size'] *$.mobileweb.device['aspectHratio'];
			
			$('#'+childdef['id']+'_input').css({'height':(childdef['frame']['height']*$.mobileweb.device['aspectHratio'])+'px','width':(childdef['frame']['width']*$.mobileweb.device['aspectWratio'])+'px','padding':'0px'});
			$('#'+childdef['id']+'_input').css({'left':childdef['frame']['x']*$.mobileweb.device['aspectWratio']});
			$('#'+childdef['id']+'_input').css({'top':childdef['frame']['y']*$.mobileweb.device['aspectHratio'],'position':'absolute','margin':'0px'});
			$('#'+childdef['id']+'_input').css({'font-weight':'normal','font-family':childdef['font']['fontName'],'font-size':fontsize+'px','color':$.attributes('color', childdef['font']['color']).getColorCode()});
			$('#'+childdef['id']+'_input').css({'text-align':childdef['font']['align'],'vertical-align':childdef['verticalalignment'],'line-height':'normal','text-shadow': 'none'});
			$('#'+childdef['id']+'_input').val(childdef['value']);
						
			if(childdef['font']['fontName'] == "system" || childdef['font']['fontName'] == "Helvetica Neue"){
				$('#'+childdef['id']+'_input').css({'font-family':'"source_sans_proregular","Arial","Sans Serif"'});
			}
			
			if(childdef['padding'])
				$('#'+childdef['id']+'_input').css({'padding-left' :childdef['padding']['left']*$.mobileweb.device['aspectWratio'],'padding-top' :childdef['padding']['top']*$.mobileweb.device['aspectHratio'],'padding-right' :childdef['padding']['right']*$.mobileweb.device['aspectWratio'],'padding-bottom' :childdef['padding']['bottom']*$.mobileweb.device['aspectHratio']});
			if (childdef['verticalalignment'] != undefined){
   				var padtop = childdef['padding']['top']*$.mobileweb.device['aspectHratio'];
 				var padbottom = childdef['padding']['bottom']*$.mobileweb.device['aspectHratio'];
   				if (childdef['verticalalignment'] =='top'){
   					padbottom = parseInt(_height)-parseInt(fontsize)-padtop;					
   					$('#'+childdef['id']+'_input').css({'padding-bottom' :parseFloat(_height/2) - padtop});
   				}else if (childdef['verticalalignment'] =='bottom'){
   					padtop = parseInt(_height)-parseInt(fontsize)-padbottom;					
   					$('#'+childdef['id']+'_input').css({'padding-top' :parseFloat(_height/2) - padbottom});
   				}else{
   					$('#'+childdef['id']+'_input').css({'padding-top' :padtop});
   					$('#'+childdef['id']+'_input').css({'padding-bottom' :padbottom});
   				}
   			}
			
			if(childdef['font']['align'] == "middle"){
				$('#'+childdef['id']+'_input').css({'text-align':"center"});
			}
			
			if(childdef['font']['align'] == "center"){
				var _rightPadding = 48 + childdef['padding']['right']*$.mobileweb.device['aspectWratio'];
				$('#'+childdef['id']+'_input').css({'padding-right': _rightPadding});
			}else if(childdef['font']['align'] == "right"){
				var _rightPadding = 48 + childdef['padding']['right']*$.mobileweb.device['aspectWratio'] + childdef['padding']['left']*$.mobileweb.device['aspectWratio'];
				$('#'+childdef['id']+'_input').css({'padding-right': _rightPadding});
			}
			
			var _iconHeight = childdef['frame']['height']*$.mobileweb.device['aspectHratio'] + 'px';
			var _iconWidth = childdef['frame']['height']*$.mobileweb.device['aspectWratio'] + 'px';
			var _icon = $.utility('getSystemImage', "drop-down-box.png","Image");
			//var style = $('<style>input::-webkit-calendar-picker-indicator{color:rgba(255,255,255,0);opacity:1;width:'+_iconWidth+';max-width:40px;height:'+_iconHeight+';display:block;background:url('+_icon+') no-repeat rgba(154,154,154,1);background-size:100% 100%;position:absolute;right:-1px;bottom:0%;top:0%;}</style>');
			_iconWidth = _iconHeight = '24px';
			var _iconPos = 2;//childdef['border']['borderweight']*$.mobileweb.device['aspectHratio'];
			var _iconBorder = (_cornerRadius) ? _cornerRadius : 4;
			var style = $('<style>input::-webkit-calendar-picker-indicator{display:block;position:absolute;top:'+_iconPos+'px;bottom:'+_iconPos+'px;right:'+_iconPos+'px;max-width:40px;width:'+_iconWidth+';height:80%;color:rgba(255,255,255,0);opacity:1;background:url('+_icon+') no-repeat rgba(254,254,254,1);background-position:center;border-radius:'+_iconBorder+'px;}</style>');
			$('html > head').append(style);
		};
		
		comboBoxEditable.setLineHeight = function(param){
			if(param){
				$('#'+childdef['id']).css({'line-height':param+'px'});
			}
		};

		comboBoxEditable.applyEvents = function(){
			
			$('#'+childdef['id'] + '_input').on('input', function (e) {
				var value = $(this).val();
				$('#'+childdef['id'] + ' > option:selected').attr('selected', false);
				if(value.trim() != ""){
					for(var i=0;i<$('#'+childdef['id'] + ' > option').length; i++){
						if($('#'+childdef['id'] + ' > option')[i].value == value)
							$('#'+childdef['id'] + ' > option')[i].setAttribute('selected', true);
					}
					if(childdef['type'] === "DB"){
						for(var i=0;i<childdef['combo_options']['optionsValue'].length; i++){
							if(childdef['combo_options']['optionsID'][i] === value){
								childdef['initialValue'] = value;
							}
						}
					}else{
						for(var i=0;i<childdef['combo_options']['optionsValue'].length; i++){
							if(childdef['combo_options']['optionsID'][i] === value){
								childdef['selectedindex'] = i;
							}
						}
					}
				}
				
				childdef['value'] = $(this).val();
			});
			
			$('#'+childdef['id'] + '_input').on('tap', function (e) {
				$('#'+childdef['id'] + ' > option').on('mouseenter', function (e) {
					//console.log("hover");
				});
				var value = $(this).val();
				childdef['value'] = $(this).val();
			});
			
			if(childdef['events'] != undefined){
				if(childdef['events']['OnSelect']){
					$('#'+childdef['id'] + '_input').on('change', function (e) {
						childdef['value'] = $(this).val();
						/* A hot fix  for NIC Application  as slice only works for String and numbers not for objects in Array*/
						var test = [];
						$.extend(test, childdef['events']['OnSelect']);
						var actionString = JSON.stringify(test).slice();
						new $.actions(pagedef, comboBoxEditable, JSON.parse(actionString)).execute();
					});
				}
			}
			
		};
		
		
		comboBoxEditable.setValue = function(param){
			childdef['value'] = param;
			$('#'+childdef['id']+"_input").val(param).trigger("input");
		};
		
		comboBoxEditable.getValue = function(){
			childdef['value'] = $('#'+childdef['id']+"_input").attr('value');
			return childdef['value'] 
			
		};
		
		comboBoxEditable.setVisibility = function(param){
			if(param === true){
				childdef['hidden'] = false;
				$('#'+comboBoxEditable.getId()).css({'visibility':'visible'});
				$('#'+comboBoxEditable.getId()+'_input').css({'visibility':'visible'});
			}else{
				childdef['hidden'] = true;
				$('#'+comboBoxEditable.getId()).css({'visibility' : 'hidden'});
				$('#'+comboBoxEditable.getId()+'_input').css({'visibility':'hidden'});
			}
		};	
		
		comboBoxEditable.refresh = function(param){
			//As per MCS logic >> when 'changecondition' happened, initialValue should be reset
			if(comboBoxEditable['initialValue'] != undefined){
				if(comboBoxEditable['initialValue'] != childdef['initialValue'])
					childdef['initialValue'] = comboBoxEditable['initialValue'];
			}
			where = param;
			comboBoxEditable.addItem(childdef);
		}
		
		comboBoxEditable.getDBType = function(){
			if(childdef['dbparams']['servicename']!= undefined && childdef['dbparams']['servicename']!= ""){	// For Remote DB only
					return "remote";
				}else{
					return "local";
				}
		};	

		return comboBoxEditable;
	};
	
		/*function uiRadioButtonGroup(pagedef,childdef,data){ 
			var radioButtonGroup = new BaseView(childdef);
			var lastSelectedIndex = "";
			radioButtonGroup.getHTML = function(){
				return ["<table data-role= 'controlview' id='",childdef['id'],"' name='",childdef['name'],"'>",radioButtonGroup.addItem(childdef),"</table>"].join('');
			};

			radioButtonGroup.applyOverrides = function(){
				radioButtonGroup['frame'].applyCSS();
				radioButtonGroup['font'].applyCSS();
				radioButtonGroup['padding'].applyCSS();
				$('#'+childdef['id']).css({'top':childdef['frame']['y']*$.mobileweb.device['aspectratio']  +'px' ,'left':childdef['frame']['x']*$.mobileweb.device['aspectratio'] +'px' }); 
				$('#'+childdef['id']).css({'height':childdef['frame']['height']*$.mobileweb.device['aspectratio'] +'px', 'width':childdef['frame']['width']*$.mobileweb.device['aspectratio']+'px'});
				$('#'+childdef['id']+'div > label').css({'margin':'.1em'});
				$('#'+childdef['id']+'div > label').css({'background':''});
				$('#'+childdef['id']+'div > label').css({'background-image':''});
				$('#'+childdef['id']+' label').css({'text-align':childdef['font']['align']});
				$('#'+childdef['id']+' option').css({'font-size': childdef['font']['size'] + 'px', 'display':'inline-block'});
				if(childdef['padding']){
					$('#'+childdef['id'] + ' option').css({'padding-left' :childdef['padding']['left']*$.mobileweb.device['aspectratio'],'padding-top' :childdef['padding']['top']*$.mobileweb.device['aspectratio'],'padding-right' :childdef['padding']['right']*$.mobileweb.device['aspectratio'],'padding-bottom' :childdef['padding']['bottom']*$.mobileweb.device['aspectratio']});

				}
				//added for BugId: #8535.
				$('.ui-btn-up-c').css({'color': 'inherit'});
				
				if(childdef['hidden']){
					$('#'+childdef['id']).css({'visibility':'hidden'});
				}
				
				if(childdef['border']){
					$('#'+childdef['id']).css({'border':childdef['border']['borderweight'] +"px solid"});
					$('#'+childdef['id']).css({'border-color':$.attributes('color', childdef['border']['bordercolor']).getColorCode()});

				}
				// User Settings CSS...
				$('#'+childdef['id']).css({'text-decoration':childdef['textDecoration']});
				
				if(childdef['background']){
					$('#'+childdef['id']).css({'background-color':$.attributes('color', childdef['background']).getColorCode()});
				}
				if(childdef['border']){
					$('#'+childdef['id']).css({'border-width':childdef['border']['borderweight'] +"px"});
					$('#'+childdef['id']).css({'border-color':$.attributes('color', childdef['border']['bordercolor']).getColorCode()});
				}
				var radios = childdef['radio_items'];
				for(var i=0; i<radios.length; i++){
					//#737373
					$('#' + childdef['id']+'_'+i +' > div > label').css({'background-color':$.attributes('color', childdef['background']).getColorCode(),'background-image':'linear-gradient('+$.attributes('color', childdef['background']).getColorCode() +')', 'margin': '0px'});
					$('.ui-btn-up-c  .ui-btn-hover-c, .ui-btn-down-c').removeProp("background-image");
					$('#' + childdef['id']+'_'+i +' > div > label').removeClass('ui-btn-up-c')
					//$('#' + childdef['id']+'_'+i +' > div > label').removeClass('ui-btn-hover-c')
					//$('#' + childdef['id']+'_'+i +' > div > label').removeClass('ui-btn-down-c')
					//$('#' + childdef['id']+'_'+i +' > div > label> span').css({'border':'0px'});
				}
				//.ui-btn-up-c
				//$('.ui-btn-up-c').css({'background-color':$.attributes('color', childdef['background']).getColorCode(),'background-image':'linear-gradient('+$.attributes('color', childdef['background']).getColorCode() +')'});
		
			};

			radioButtonGroup.applyEvents = function(){
				$("#"+childdef['id']).bind("change", function(event, ui) {
					radioButtonGroup.changeState(event['target']['id']);
					new $.actions(pagedef, radioButtonGroup, JSON.parse(JSON.stringify(childdef['events']['selected']))).execute();
				});
				$("#"+childdef['id']).bind("hover focus", function(event, ui) {
					var radios = childdef['radio_items'];
					for(var i=0; i<radios.length; i++){
						//#737373
						$('#' + childdef['id']+'_'+i +' > div > label').css({'background-color':$.attributes('color', childdef['background']).getColorCode(),'background-image':'linear-gradient('+$.attributes('color', childdef['background']).getColorCode() +')', 'margin': '0px'});
						$('.ui-btn-up-c, .ui-btn-hover-c, .ui-btn-down-c').removeProp("background-image");
						$('#' + childdef['id']+'_'+i +' > div > label').removeClass('ui-btn-up-c');
						//$('#' + childdef['id']+'_'+i +' > div > label').removeClass('ui-btn');
						//$('#' + childdef['id']+'_'+i +' > div > label').removeClass('ui-btn-hover-c')
						//$('#' + childdef['id']+'_'+i +' > div > label').removeClass('ui-btn-down-c')
						//$('#' + childdef['id']+'_'+i +' > div > label> span').css({'border':'0px'});
					}
				});
			};

			radioButtonGroup.addItem =function(childdef){
				itemsHTML = "";
				var radio_key = {};
				if(childdef['groupStyle'].toString().toLowerCase() == "vertical"){
					for(var i=0;i<childdef['radio_items'].length; i++){
						radio_key  = Object.keys(childdef['radio_items'][i])[0];
						if(i == childdef['selectedindex']){
							itemsHTML += "<tr><td id='"+childdef['id']+ "_"+i+"'>"+["<input type='radio' name='",childdef['name'],"' id='",childdef['id']+ "_"+i,"' checked='checked'/>", "<label for='",childdef['id']+ "_"+i,"'>",'<option value="'+radio_key+'">'+childdef['radio_items'][i][radio_key]+'</option>',"</label>",].join('')+"</td></tr>";
							childdef['value'] = radio_key;
						}else{
							itemsHTML += "<tr><td id='"+childdef['id']+ "_"+i+"'>"+["<input type='radio' name='",childdef['name'],"' id='",childdef['id']+ "_"+i,"'/>", "<label for='",childdef['id']+ "_"+i,"'>",'<option value="'+radio_key+'">'+childdef['radio_items'][i][radio_key]+'</option>',"</label>",].join('')+"</td></tr>";
						}
					}
				}else{
					"<tr>"
					for(var i=0;i<childdef['radio_items'].length; i++){
						radio_key  = Object.keys(childdef['radio_items'][i])[0];
						if(i == childdef['selectedindex']){
							itemsHTML += "<td id='"+childdef['id']+ "_"+i+"'>"+["<input type='radio' name='",childdef['name'],"' id='",childdef['id']+ "_"+i,"'checked='checked'/>", "<label for='",childdef['id']+ "_"+i,"'>",'<option value="'+radio_key+'">'+childdef['radio_items'][i][radio_key]+'</option>',"</label>",].join('')+"</td>";
							childdef['value'] = radio_key;
						}else{
							itemsHTML += "<td id='"+childdef['id']+ "_"+i+"'>"+["<input type='radio' name='",childdef['name'],"' id='",childdef['id']+ "_"+i,"'/>", "<label for='",childdef['id']+ "_"+i,"'>",'<option value="'+radio_key+'">'+childdef['radio_items'][i][radio_key]+'</option>',"</label>",].join('')+"</td>";
						}
					}"</tr>"
				}
				return 	itemsHTML;
			};

			radioButtonGroup.getValue = function(){

				return  childdef['value'];//$('#'+childdef['id']+ 'checked').attr('value');


			};

			radioButtonGroup.setValue = function(param){
				for(var i =0; i < childdef['radio_items'].length; i++){
				///	if(param == Object.keys(childdef['radio_items'][i])[0]){
						radioButtonGroup.changeState(childdef['id']+'_'+i, param);
					//}
				}
			};

			radioButtonGroup.changeState = function(selectedId,state){
				if(state == "OFF" || state == "FALSE" ){
					var radios = childdef['radio_items'];
					for(var i=0; i<radios.length; i++){
						if( radios != undefined){
							$('[for=' +childdef['id']+'_'+i +']').removeClass("ui-icon-radio-on ");
							$('[for=' +childdef['id']+'_'+i +']').removeClass("ui-radio-on ");
							$('[for=' +childdef['id']+'_'+i +']').addClass("ui-icon-radio-off");
							$('[for=' +childdef['id']+'_'+i +']').addClass("ui-radio-off ");
							$('[for=' +childdef['id']+'_'+i + ']').find(".ui-icon-radio-on").removeClass("ui-icon-radio-on ").addClass("ui-icon-radio-off");
							$('input:radio[id='+childdef['id']+'_'+i +']').attr('checked', false);
							$('#' + childdef['id']+'_'+i +' > div > label').css({'background-color':$.attributes('color', childdef['background']).getColorCode(),'background-image':'linear-gradient('+$.attributes('color', childdef['background']).getColorCode() +')', 'margin': '0px'});
					//		$('#' + childdef['id']+'_'+i +' > div > label').removeClass('ui-btn')
							
						
						}
					}	
				}else{
					var radios = childdef['radio_items'];
					for(var i=0; i<radios.length; i++){
						if( radios != undefined){
							$('[for=' +childdef['id']+'_'+i + ']').removeClass("ui-icon-radio-on ");
							$('[for=' +childdef['id']+'_'+i +']').removeClass("ui-radio-on ");
							$('[for=' +childdef['id']+'_'+i +']').addClass("ui-icon-radio-off");
							$('[for=' +childdef['id']+'_'+i +']').addClass("ui-radio-off ");
							$('[for=' +childdef['id']+'_'+i + ']').find(".ui-icon-radio-on").removeClass("ui-icon-radio-on ").addClass("ui-icon-radio-off");
							$('input:radio[id='+childdef['id']+'_'+i +']').attr('checked', false);
							$('#' + childdef['id']+'_'+i +' > div > label').css({'background-color':$.attributes('color', childdef['background']).getColorCode(),'background-image':'linear-gradient('+$.attributes('color', childdef['background']).getColorCode() +')', 'margin': '0px'});
							//$('#' + childdef['id']+'_'+i +' > div > label').removeClass('ui-btn')
							
						}
					}
					$('input:radio[id='+selectedId+']').attr('checked', true);
					$('[for=' +selectedId+']').removeClass("ui-icon-radio-off ");
					$('[for=' +selectedId+']').removeClass("ui-radio-off");
					$('[for=' +selectedId+']').addClass("ui-icon-radio-on");
					$('[for=' +selectedId+']').addClass("ui-radio-on");
					$.each(childdef['radio_items'][selectedId.charAt(selectedId.lastIndexOf("_") + 1)], function(key, value){
						childdef['value'] = key;
					});
					
				}
				
			};

			return radioButtonGroup;
		};*/

	function uiRadioButton(pagedef,childdef,data){   //working fin but have to check for the selection of the values in applyevents
		var radioButton = new BaseView(childdef);
		
		radioButton.getTemplate= function(){
			return childdef['template'];
		};
		
		var normalImage = "", selectedImage = "";
		if(childdef["normalImage"] != "."){
			normalImage = $.utility("getImage", childdef['normalImage']);
		}
		if(childdef["selectedImage"] != "."){
			selectedImage= $.utility("getImage", childdef['selectedImage']);
		}else{
			selectedImage= normalImage;
		}
		var lastSelectedIndex = "";
		var fieldValue = "";
		childdef['value'] = childdef['fieldname'];
		radioButton.getHTML = function(){
			if(childdef['fieldname'] !== ""){
				childdef['value']  = $.utility('tokenizeString', $.utility('extractDataFromRecord', data, childdef['fieldname']), pagedef);
				if(childdef['value'].indexOf('[') != -1 && childdef['fieldname'].indexOf(']') != -1){
					childdef['value'] = "";
				}
			}
			if(childdef['displayvalue'] !== ""){
				childdef['displayvalue']  = $.utility('tokenizeString', $.utility('extractDataFromRecord', data, childdef['displayvalue']), pagedef);
				if(childdef['displayvalue'].indexOf('[') != -1 && childdef['displayvalue'].indexOf(']') != -1){
					childdef['displayvalue'] = "";
				}
			}
			
			childdef['taborder'] = -1;
			if(childdef['selected']){
				return ["<fieldset  data-role= 'controlgroup' id='",childdef['id'],"'>" ,"<input type='radio' name='",childdef['groupName'],"' id='",childdef['id'],"' value='",childdef['value'],"'tabindex='",childdef['taborder'],"'/>", "<label for='",childdef['id'],"'>",childdef['displayvalue'],"</label>","</fieldset>"].join('');
			}else{
				return ["<fieldset  data-role= 'controlgroup' id='",childdef['id'],"'>","<input type='radio' name='",childdef['groupName'],"' id='",childdef['id'],"' value='",childdef['value'],"'tabindex='",childdef['taborder'],"'/>", "<label for='",childdef['id'],"'>",childdef['displayvalue'],"</label>","</fieldset>"].join('');
			}

		};

		radioButton.applyOverrides = function(){
			radioButton['frame'].applyCSS();
			radioButton['font'].applyCSS();
			
			$('fieldset#' + childdef['id']).css({'margin':'0px'});
			$('[name='+childdef['groupName']+' ]').css({'visibility':'hidden'});
			var _borderWeight = 0;
			if(childdef['border']){
				if(childdef['border']['borderweight'] != 0)
					_borderWeight = childdef['border']['borderweight'] * $.mobileweb.device['aspectHratio'];
				
				$('#'+childdef['id']).css({'border': _borderWeight +"px solid", 'border-radius':'0px'});
				$('#'+childdef['id']).css({'border-color': $.attributes('color', childdef['border']['bordercolor']).getColorCode()});
				
				$('#'+childdef['id']+' >div >div >label ').css({'border-width': _borderWeight+"px"});
				$('#'+childdef['id']+' >div >div >label ').css({'border-color': $.attributes('color', childdef['border']['bordercolor']).getColorCode()});
			}
			if(childdef['background']){
				$('#'+childdef['id']).css({'background-color': $.attributes('color', childdef['background']).getColorCode()});
			}
			
			$('label[for='+childdef['id']+']').css({'margin':'0px', 'text-decoration': childdef['textDecoration']});
			$('#'+childdef['id']).css({'height': (childdef['frame']['height']*$.mobileweb.device['aspectHratio']) - 2 * _borderWeight + 'px', 'width': (childdef['frame']['width']*$.mobileweb.device['aspectWratio']) - 2 * _borderWeight + 'px'});
			
			$('#'+childdef['id']+' >div').css({'height': (childdef['frame']['height']*$.mobileweb.device['aspectHratio']) - 2 * _borderWeight +'px'});
			$('#'+childdef['id']+' >div >div').css({'height': (childdef['frame']['height']*$.mobileweb.device['aspectHratio']) - 2 * _borderWeight + 'px'});
			$('#'+childdef['id']+' >div >div >label  ').css({'vertical-align':childdef['verticalalignment']});
			$('#'+childdef['id']+' >div >div >label  ').removeClass("ui-btn");
			$('#'+childdef['id']+' >div >div >label  ').removeClass("ui-btn-up-c");
			$('#'+childdef['id']+' >div >div >label  ').removeClass('ui-btn-hover-c');
			$("#"+childdef['id']+' >div >div >label  ').addClass("ui-radio-off ");
			$("#"+childdef['id']+' >div >div >label  ').addClass("ui-icon-radio-off");
			$('#'+childdef['id']+' >div >div >label >span').css({'border-top': '0px', 'border-color': ''});
			$('#'+childdef['id']+' >div >div >label >span').css({'height': (childdef['frame']['height']*$.mobileweb.device['aspectHratio']) - 2 * _borderWeight + 'px', 'padding-bottom':'0px'})
			$('#'+childdef['id']+' >div >div >label >span').css({'text-align':childdef['font']['align'], 'font-size':(childdef['font']['size']* $.mobileweb.device['aspectratio'])+'px', 'color':$.attributes('color', childdef['font']['color']).getColorCode(), 'padding-top': '0px'});
			$('#'+childdef['id']).css({'text-align':''});
			
			if(childdef['selected']){
				$('input:radio[id='+childdef['id']+']').attr('checked', true);
				$("#"+childdef['id']+"> div > div > label").addClass("ui-icon-radio-on ");
				$("#"+childdef['id']+"> div > div > label").addClass("ui-radio-on");
				$('[for=' +childdef['id']+']').find(".ui-icon-radio-off").removeClass("ui-icon-radio-off ").addClass("ui-icon-radio-on");
				$("#"+childdef['id']).attr('checked','checked');
				$('#'+childdef['id']+' >div >div>label>span>span:nth-child(2)').css({'background-color': 'black'});

				var isChildFound = false;
				for(var i =0; i < pagedef['children'].length; i++){
					if(childdef['viewType'] === pagedef['children'][i]['viewType'] && childdef['groupName'] === pagedef['children'][i]['groupName']){
						isChildFound = true;
						pagedef['children'][i]['groupNameData'] = childdef['value'];
						pagedef['children'][i]['selected'] = false;
					}
				}
				if(!isChildFound && pagedef['toolbartop'] != undefined){
					for(var i =0; i < pagedef['toolbartop']['children'].length; i++){
						if(childdef['viewType'] === pagedef['toolbartop']['children'][i]['viewType'] && childdef['groupName'] === pagedef['toolbartop']['children'][i]['groupName']){
							isChildFound = true;
							pagedef['toolbartop']['children'][i]['groupNameData'] = childdef['value'];
							pagedef['toolbartop']['children'][i]['selected'] = false;
						}
					}
				} 
				if(!isChildFound && pagedef['toolbarbottom'] != undefined){
					for(var i =0; i < pagedef['toolbarbottom']['children'].length; i++){
						if(childdef['viewType'] === pagedef['toolbarbottom']['children'][i]['viewType'] && childdef['groupName'] === pagedef['toolbarbottom']['children'][i]['groupName']){
							isChildFound = true;
							pagedef['toolbarbottom']['children'][i]['groupNameData'] = childdef['value'];
							pagedef['toolbarbottom']['children'][i]['selected'] = false;
						}
					}
				} 
				childdef['selected'] = true;
				if(selectedImage != ""){
					$('#'+childdef['id']+' >div').css({'position':'absolute','top':'0px', left:(childdef['frame']['width']*$.mobileweb.device['aspectWratio']*25/100)+'px', width:(childdef['frame']['width']*$.mobileweb.device['aspectWratio']*75/100)+'px'});
					$('#'+childdef['id']+' >div >div >label>span>span:nth-child(2)').remove();
					$("#"+childdef['id']).append("<img src='"+$.utility('getImage', childdef['selectedImage'])+"' height='"+((childdef['frame']['height'] - 2*childdef['border']['borderweight'])* $.mobileweb.device['aspectHratio'])+ "px" + "' width='"+(childdef['frame']['width']* $.mobileweb.device['aspectWratio']*25/100)+ "px" + "'>")
				}else{
					$('#'+childdef['id']+' >div').css({'top':childdef['frame']['y']*$.mobileweb.device['aspectHratio'] +'px' ,'left':childdef['frame']['x'] *$.mobileweb.device['aspectWratio']+'px', width:(childdef['frame']['width']*$.mobileweb.device['aspectWratio'])+'px'});
					$('#'+childdef['id']+' >div >div >label>span>span:nth-child(1)').css({'padding-left':childdef['padding']['left']* $.mobileweb.device['aspectWratio'] + "px", 'padding-right':childdef['padding']['right']* $.mobileweb.device['aspectWratio'] + "px",'padding-top':childdef['padding']['top'] * $.mobileweb.device['aspectHratio']+ "px",'padding-bottom':childdef['padding']['bottom']* $.mobileweb.device['aspectHratio'] + "px"});
				}
			}else{ // For ResetViewData
				var reset = false;
				for(var i = 0; i <= pagedef['data']['contents'].length; i++){
					if(pagedef['data']['contents'][i] != undefined && pagedef['data']['contents'][i][childdef['groupName']] != undefined){
						reset = true;
					}
				}
				
				if(!reset && pagedef['type'].indexOf('TableView') != -1){
					if(pagedef['data']['pagedata'] != undefined){
						$.each(pagedef['data']['pagedata'], function(key, value){
							if(key == childdef['groupName'])
								radioButton.setValue(value);
						});
					}
				}
			}

			/* -- Vertical alignment starts --*/
			if(childdef['verticalalignment'] === 'middle'){
				var padbottom = childdef['padding']['bottom']*$.mobileweb.device['aspectHratio'];
 				var padtop = childdef['padding']['top']*$.mobileweb.device['aspectHratio'];
 				var hei = childdef['frame']['height']*$.mobileweb.device['aspectHratio'];
 				var font = childdef['font']['size']*$.mobileweb.device['aspectHratio'];
 				var diff = (hei - padtop - padbottom - font)/2;
 				var top = diff + padtop;
 				$('#'+childdef['id']+' >div >div >label>span>span:nth-child(1)').css({'top': top})		
			}else if(childdef['verticalalignment'] === 'top'){
				$('#'+childdef['id']+' >div >div >label>span>span:nth-child(1)').css({'top': childdef['padding']['top']* $.mobileweb.device['aspectHratio']+'px'})	
			}else if(childdef['verticalalignment'] === 'bottom'){
				$('#'+childdef['id']+' >div >div >label>span>span:nth-child(1)').css({'top': ((((childdef['frame']['height'] - childdef['padding']['bottom']) - childdef['font']['size'])))* $.mobileweb.device['aspectHratio'] +'px'})	
			}
			/* -- Vertical alignment end --*/
			
			$('#'+childdef['id']+' >div >div >label>span>span:nth-child(2)').css({'top': ((childdef['frame']['height']* $.mobileweb.device['aspectHratio'])/2) +'px'})	
			
			if(normalImage != "" && !childdef['selected']){
				$('#'+childdef['id']+' >div').css({'position':'absolute','top':'0px', left:(childdef['frame']['width']*$.mobileweb.device['aspectWratio']*25/100)+'px', width:(childdef['frame']['width']*$.mobileweb.device['aspectWratio']*75/100)+'px'});
				$('#'+childdef['id']+' >div >div >label>span>span:nth-child(2)').remove();
				$("#"+childdef['id']).append("<img src='"+$.utility('getImage', childdef['normalImage'])+"' height='"+((childdef['frame']['height'] - 2*childdef['border']['borderweight'])* $.mobileweb.device['aspectHratio'])+ "px" + "' width='"+(childdef['frame']['width']* $.mobileweb.device['aspectWratio']*25/100)+ "px" + "'>")
			}else if(!childdef['selected']){
				$('#'+childdef['id']+' >div').css({'top':childdef['frame']['y']*$.mobileweb.device['aspectHratio'] +'px' ,'left':childdef['frame']['x'] *$.mobileweb.device['aspectWratio']+'px', width:(childdef['frame']['width']*$.mobileweb.device['aspectWratio'])+'px'});
				$('#'+childdef['id']+' >div >div >label>span>span:nth-child(1)').css({'padding-left':childdef['padding']['left'] + "px", 'padding-right':childdef['padding']['right'] + "px",'padding-top':childdef['padding']['top'] + "px",'padding-bottom':childdef['padding']['bottom'] + "px"});
			}
			$('#'+childdef['id']+' >div >div >label >span ').css({'padding-left':"40px",'padding-right':childdef['padding']['right']*$.mobileweb.device['aspectWratio']});
			var w;
			if(normalImage == "" && selectedImage == "")
				w = (childdef['frame']['width'] - childdef['padding']['left'])*$.mobileweb.device['aspectWratio'] - 40;
			else
				w = (childdef['frame']['width']*$.mobileweb.device['aspectWratio']*75/100 -childdef['border']['borderweight']*$.mobileweb.device['aspectWratio'])+'px'
			$('#'+childdef['id']+' >div >div >label >span ').css({'width':w});
			
			
			if(childdef['selected'] && (selectedImage == "" || selectedImage == ".")){
				$('#'+childdef['id']+' input').css({'top':'0px','left':'2px','margin-top':'0px'});
				var timer =	setInterval(function(){
					clearInterval(timer);
					var _padding = 0; //(parseInt($('#'+childdef['id']).css('height')) > 40) ? '2px':'0px';
					var _inputSize = parseInt($('#'+childdef['id']).css('height')) - (2 * parseInt(_padding));
					if(childdef['hidden']){
						$('#'+childdef['id']).css({'visibility':'hidden'});
						$('input#'+childdef['id']).css({'visibility':'hidden'});
					}else{
						$('input#'+childdef['id']).css({'visibility':'visible'});
						$('#'+childdef['id']+' input').css({'height':_inputSize + 'px','width':_inputSize + 'px','visibility':'visible','top':_padding,'bottom':_padding,'left':'2px','right':'2px'});
					}
					$('#'+childdef['id']+' >div >div >label >span').css({'padding-left':(_inputSize + 2) + 'px'});
				},200);
				$('#'+childdef['id']+' >div >div >label >span >span:last-child').css({'visibility':'hidden'});
			}else if(!childdef['selected'] && (normalImage == "" || normalImage == ".")){
				$('#'+childdef['id']+' input').css({'top':'0px','left':'2px','margin-top':'0px'});
				var timer =	setInterval(function(){
					clearInterval(timer);
					var _padding = 0;// (parseInt($('#'+childdef['id']).css('height')) > 40) ? '2px':'0px';
					var _inputSize = parseInt($('#'+childdef['id']).css('height')) - (2 * parseInt(_padding));
					if(childdef['hidden']){
						$('#'+childdef['id']).css({'visibility':'hidden'});
						$('.ui-radio input').css({'visibility':'hidden'});
					}else{
						$('#'+childdef['id']).css({'visibility':'visible'});
						$('.ui-radio input').css({'visibility':'visible'});
						$('#'+childdef['id']+' input').css({'height':_inputSize + 'px','width':_inputSize + 'px','visibility':'visible','top':_padding,'bottom':_padding,'left':'2px','right':'2px'});
					}
					$('#'+childdef['id']+' >div >div >label >span').css({'padding-left':(_inputSize + 2) + 'px'});
				},100);
				$('#'+childdef['id']+' >div >div >label >span >span:last-child').css({'visibility':'hidden'});
			}
		
			if(childdef['hidden']){
				$('#'+childdef['id']).css({'visibility':'hidden'});
			}else{
				$('.ui-radio input').css({'width':'20px','height':'20px'});
			}
			$('#'+childdef['id']+' >div >div >label >span').css({'width':'75%'});
		};
		
		radioButton.getValue = function(){
			return childdef['value'];
		};
		radioButton.setValue = function(param){
			var radios = $("[name='"+childdef['groupName']+"']");
			for(var i = 0; i < radios.length; i++){
				if(radios[i] != undefined && radios[i].id != undefined ){
					if((normalImage == "" || normalImage == ".")){
						$('input:radio[id='+radios[i].id+']').removeAttr('checked');
					}else{
						$('[for=' +radios[i].id+']').removeClass("ui-icon-radio-on ");
						$('[for=' +radios[i].id+']').removeClass("ui-radio-on ");
						$('[for=' +radios[i].id+']').addClass("ui-radio-off ");
						$('input:radio[id='+radios[i].id+']').removeAttr('checked');
						$('[for=' +radios[i].id+']').find(".ui-icon-radio-on").removeClass("ui-icon-radio-on ").addClass("ui-icon-radio-off");
						$('#'+radios[i].id+' >div >div>label>span>span:nth-child(2)').css({'background-color': ''});
						$('#'+radios[i].id + '> img').attr('src',normalImage);
					}
				}
				if(param === radios[i]['value']){// && radios[i].id == radioButton.getId()){//Bug #12607 fix
					if((selectedImage == "" || selectedImage == ".")){
						$('input:radio[id='+radios[i].id+']').attr('checked', true);
					}else{
						$('input:radio[id='+radios[i].id+']').attr('checked', true);
						
						$("#"+radios[i].id+"> div > div > label").addClass("ui-icon-radio-on ");
						$("#"+radios[i].id+"> div > div > label").addClass("ui-radio-on");
						$('[for=' +radios[i].id+']').find(".ui-icon-radio-off").removeClass("ui-icon-radio-off ").addClass("ui-icon-radio-on");
						$("#"+radios[i].id).attr('checked','checked');
						$('#'+radios[i].id+' >div >div>label>span>span:nth-child(2)').css({'background-color': 'black'});
						$('#'+radios[i].id + '> img').attr('src',selectedImage);
						$('#'+childdef['id']+' >div >div >label >span >span:last-child').css({'background-position':'-721px 50%'});	
					}
				}
			}
			var dataToUpdate = {};
			dataToUpdate[childdef["groupName"]] = param;
			$.utility("updatePageData", pagedef, dataToUpdate);
			var isChildFound = false;
			for(var i =0; i < pagedef['children'].length; i++){
				if(childdef['viewType'] === pagedef['children'][i]['viewType'] && childdef['groupName'] === pagedef['children'][i]['groupName']){
					pagedef['children'][i]['groupNameData'] = param;
					pagedef['children'][i]['selected'] = false;
				}
			}
			if(!isChildFound && pagedef['toolbartop'] != undefined){
				for(var i =0; i < pagedef['toolbartop']['children'].length; i++){
					if(childdef['viewType'] === pagedef['toolbartop']['children'][i]['viewType'] && childdef['groupName'] === pagedef['toolbartop']['children'][i]['groupName']){
						isChildFound = true;
						pagedef['toolbartop']['children'][i]['groupNameData'] = param;
						pagedef['toolbartop']['children'][i]['selected'] = false;
					}
				}
			} 
			if(!isChildFound && pagedef['toolbarbottom'] != undefined){
				for(var i =0; i < pagedef['toolbarbottom']['children'].length; i++){
					if(childdef['viewType'] === pagedef['toolbarbottom']['children'][i]['viewType'] && childdef['groupName'] === pagedef['toolbarbottom']['children'][i]['groupName']){
						isChildFound = true;
						pagedef['toolbarbottom']['children'][i]['groupNameData'] = param;
						pagedef['toolbarbottom']['children'][i]['selected'] = false;
					}
				}
			} 
			childdef['selected'] = true; 
		};
		
		
		radioButton.applyEvents= function(){

			$("#"+childdef['id']).bind( "change", function(event, ui) {
				radioButton.setValue(childdef['value']);
				$("#"+childdef['id']).trigger("selected");
			});

			$("#"+childdef['id'] +"> img").bind( "click", function(event, ui) {
				radioButton.setValue(childdef['value'])
			});
			
			//Richa--->Bug #8742 fix(10.04.2018)
			var groups = [];
			$("[name='" + childdef['groupName'] + "']").on('keydown', function(e) {
			    // group the inputs by name
			    $("[name='" + childdef['groupName'] + "']").each(function() {
			         var el = this;
			         var thisGroup = groups[el.name] = (groups[el.name] || []);
			         thisGroup.push(el);
			    });
			    setTimeout(function() {
			        var el = e.target;
			        var thisGroup = groups[el.name] = (groups[el.name] || []);
			        var indexOfTarget = thisGroup.indexOf(e.target);

			        if (e.keyCode === 9) {
			             if (indexOfTarget < (thisGroup.length - 1) && !(e.shiftKey)) {
			                 thisGroup[indexOfTarget + 1].focus();
			                 radioButton.setValue(thisGroup[indexOfTarget + 1]['value']);
			             } else if (indexOfTarget > 0 && e.shiftKey) {
			                 radioButton.setValue(thisGroup[indexOfTarget - 1]['value']);
			             }
			        }
			    });
			});//--
		
			//This event would be fired once when page is loaded.
			$('#'+pagedef['name']).on('pageshow',function(event, ui){
			
				if(!$.utility('getActionRunningStatus') && $.utility("isInitChildren")){
					for(var k = 0; k < pagedef['data']['contents'].length; k++){
						if(pagedef['data']['contents'][k] != undefined)
						$.each(pagedef['data']['contents'][k], function(key, value){
							if(key === childdef['groupName']){
								if(pagedef['type'].indexOf("RemoteTable") != -1 || pagedef['type'].indexOf("DBTable") != -1){
									for(var i =0; i < pagedef['children'][0]['group'].length; i++){
										for(var j =0; j < pagedef['children'][0]['group'][i]['row'].length; j++){
											for(var l =0; l < pagedef['children'][0]['group'][i]['row'][j]['children'].length; l++){
												var child = pagedef['children'][0]['group'][i]['row'][j]['children'][l];
												if(childdef['viewType'] === child['viewType'] && child['groupName'] === childdef['groupName'] && value === child['value']){
													child['selected'] = true;
													$('input:radio[id='+child['id']+']').attr('checked', true);
													$("#"+child['id']+"> div > div > label").addClass("ui-icon-radio-on ");
													$("#"+child['id']+"> div > div > label").addClass("ui-radio-on");
													$('[for=' +child['id']+']').find(".ui-icon-radio-off").removeClass("ui-icon-radio-off ").addClass("ui-icon-radio-on");
													$("#"+child['id']).attr('checked','checked');
													$('#'+child['id']+' >div >div>label>span>span:nth-child(2)').css({'background-color': 'black'});
													$('#'+child['id']).css({'background-image':'url("'+selectedImage+'")', 'background-repeat':'no-repeat','background-size': '100% 100%' });
													
												}else if(childdef['viewType'] === child['viewType'] && child['groupName'] === childdef['groupName']){
													child['selected'] = false;
													$('[for=' +child['id']+']').removeClass("ui-icon-radio-on ");
													$('[for=' +child['id']+']').removeClass("ui-radio-on ");
													$('[for=' +child['id']+']').addClass("ui-radio-off ");
													$('input:radio[id='+child['id']+']').removeAttr('checked');
													$('[for=' +child['id']+']').find(".ui-icon-radio-on").removeClass("ui-icon-radio-on ").addClass("ui-icon-radio-off");
													$('#'+child['id']+' >div >div>label>span>span:nth-child(2)').css({'background-color': ''});
													$('#'+child['id']).css({'background-image':'url("'+normalImage+'")', 'background-repeat':'no-repeat','background-size': '100% 100%' });
													
												}
												pagedef['children'][i]['groupNameData'] = value;
											}
										}	
									}
								}else{
									for(var i =0; i < pagedef['children'].length; i++){
										if(childdef['viewtype'] === pagedef['children'][i]['viewtype'] && pagedef['children'][i]['groupName'] === childdef['groupName'] && value === pagedef['children'][i]['value'] && pagedef['children'][i]['selected'] == true){
											pagedef['children'][i]['selected'] = true;
											$('input:radio[id='+pagedef['children'][i]['id']+']').attr('checked', true);
											$("#"+pagedef['children'][i]['id']+"> div > div > label").addClass("ui-icon-radio-on ");
											$("#"+pagedef['children'][i]['id']+"> div > div > label").addClass("ui-radio-on");
											$('[for=' +pagedef['children'][i]['id']+']').find(".ui-icon-radio-off").removeClass("ui-icon-radio-off ").addClass("ui-icon-radio-on");
											$("#"+pagedef['children'][i]['id']).attr('checked','checked');
											pagedef['children'][i]['groupNameData'] = value;
											$('#'+pagedef['children'][i]['id']+' >div >div>label>span>span:nth-child(2)').css({'background-color': 'black'});
											$('#'+pagedef['children'][i]['id']).css({'background-image':'url("'+selectedImage+'")', 'background-repeat':'no-repeat','background-size': '100% 100%' });
											
										}else if(childdef['viewtype'] === pagedef['children'][i]['viewtype'] && pagedef['children'][i]['groupName'] === childdef['groupName']){
											pagedef['children'][i]['selected'] = false;
											$('[for=' +pagedef['children'][i]['id']+']').removeClass("ui-icon-radio-on ");
											$('[for=' +pagedef['children'][i]['id']+']').removeClass("ui-radio-on ");
											$('[for=' +pagedef['children'][i]['id']+']').addClass("ui-radio-off ");
											$('input:radio[id='+pagedef['children'][i]['id']+']').removeAttr('checked');
											$('[for=' +pagedef['children'][i]['id']+']').find(".ui-icon-radio-on").removeClass("ui-icon-radio-on ").addClass("ui-icon-radio-off");
											pagedef['children'][i]['groupNameData'] = value;
											$('#'+pagedef['children'][i]['id']+' >div >div>label>span>span:nth-child(2)').css({'background-color': ''});
											$('#'+pagedef['children'][i]['id']).css({'background-image':'url("'+normalImage+'")', 'background-repeat':'no-repeat','background-size': '100% 100%' });
											
										}
									}
								}
							}
						});
					}
				}
			});
			
			if(childdef['events']){
				if(childdef['events']['selected']){
					$('#'+childdef['id']).on('selected',function(){
						new $.actions(pagedef, radioButton, childdef['events']['selected'].slice()).execute(); 
					});
				}
			}
		};
	
		return radioButton;
	};
		
	function uiGoogleMap(pagedef, childdef, data){
		var googleMap =  new BaseView(childdef);
		
		googleMap.getTemplate = function(){
			return childdef['template'];
		};
		
		pagedef['spotdetails'] = {};
		googleMap.getHTML = function(){
			return [" <div id='",childdef['id'],"' name='",childdef['name'] , "' type='",childdef['type'] , "' tabindex='",childdef['taborder'],"'></div>"].join('');
		};
		
		googleMap.applyOverrides = function(){
			googleMap['frame'].applyCSS();

			if(childdef['hidden']){
				$('#'+childdef['id']).css({'visibility':'hidden'});
			}
			
			pagedef['spotdetails'][childdef['id']] = {'isLoaded': false};
			$.GMapService('createGoogleMap',pagedef,childdef,data);
		};
		
		googleMap.getValue = function(){
			var mapp = new google.maps.Map($.utility('getUiFromObject',pagedef['name'],childdef['name'])[0], mapParameters);
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode({'latLng': mapp.getCenter()}, function(results, status) {
				if(status == "OK")
					childdef['value'] = results[0].formatted_address;
				else{
					$.mobileweb['__ERR_CODE__'] = status;
					$.GMapService('setMapErrorMessage',status);
				}
			});
			return childdef['value'];
		};
		googleMap.setValue = function(param){
			childdef['value'] = param;
		};

		googleMap.applyEvents = function(){
			
		};
		
		return googleMap;
	};
	
	function uiGadget(pagedef, childdef, data){
		var gadget =  new BaseView(childdef);
		
		var childs = [];
		//if(childdef['init'] == undefined && !childdef['init']){ // check for first time loading of gadget
			for(var i=0; i< childdef['dataArray'].length; i++){
				for(var j=0; j< childdef['children'].length; j++){
					if(childdef['dataArray'][i]['name'] === childdef['children'][j]['name']){
						if(childdef['dataArray'][i]['property'] === "text"){
							childdef['dataArray'][i]['property'] = "value";
						}else if(childdef['dataArray'][i]['property'] === "inputFormat"){
							childdef['dataArray'][i]['property'] = "inputFormatType";
						}
						childdef['children'][j][childdef['dataArray'][i]['property']] = childdef['dataArray'][i]['value']
					}
				} 
			}
			for(var i=0; i< childdef['children'].length; i++){
				childdef['children'][i]['parentUIName'] = childdef['name'];
				childdef['children'][i]['id'] = childdef['id'] + "_" + childdef['children'][i]['id'];
				if(childdef['init'] == undefined && !childdef['init']){ // check for first time loading of gadget
					$.each(childdef['events'], function(key, events){
						if(key == childdef['children'][i]['name']){
							$.each(Object.keys(events), function(j, event){
								if(childdef['children'][i]['events'] === undefined){
									childdef['children'][i]['events'] = {};
									childdef['children'][i]['events'][Object.keys(events)[j]] = [];
								}else if(childdef['children'][i]['events'][Object.keys(events)[j]] === undefined ){
									childdef['children'][i]['events'][Object.keys(events)[j]] = [];
								}
								if(Object.keys(events)[j] != undefined && events[Object.keys(events)[j]]!= undefined  ){
									for(var k = 0; k < events[Object.keys(events)[j]].length; k++){
										childdef['children'][i]['events'][Object.keys(events)[j]].push(events[Object.keys(events)[j]][k]);
									}
								}
							});
						}
					});
				}
				
				childs.push(new $.uichildren(pagedef, [childdef['children'][i]], data));
			}
		//}
		
		childdef['init'] = true;
		var posLeft = (document.documentElement.clientWidth > pagedef['width']*$.mobileweb.device['aspectWratio']) ? (document.documentElement.clientWidth - pagedef['width']*$.mobileweb.device['aspectWratio'])/2:0;
		
		gadget.getGadgetCategory = function(){
			return childdef['gadgetCategory'];
		};
		gadget.getChildren = function(){
			return childs;
		};
		gadget.getMainObject = function(){
			if(gadget.getGadgetCategory() == "2"){
				return gadget;
			}
			var mainObject;
			$.each(childs, function(i, child){
				$.each(child, function(j, gadgetChild){
					if(gadgetChild.getName() === childdef['mainObjectName']){
						mainObject = gadgetChild;
						return false;
					}
				});
			});
			return mainObject;
		};
		
		gadget.getHTML = function(){
			var childHtml = "";
			$.each(childs, function(i, child){
				$.each(child, function(j, gadgetChild){
					childHtml = childHtml + gadgetChild.getHTML();
				});
			});
			
			if(gadget.getGadgetCategory() == 2)	{
				return ["<div id=",childdef['id']+'_overlay'," class='overlayUI'><fieldset id=",childdef['id']," name='",childdef['name'],"'>",childHtml,"</fieldset></div>"].join('');
			}
			else{
				return ["<fieldset id=",childdef['id']," name='",childdef['name'],"'>",childHtml,"</fieldset>"].join('');
			}
		};
		
		gadget.applyOverrides = function(){
			$.each(childs, function(i, child){
				$.each(child, function(j, gadgetChild){
					gadgetChild.applyOverrides();
					if(childdef['hidden'] === "true"){
						$('#'+gadgetChild.getId()).css({'visibility' : 'hidden'});
					}
				});
			});
			
			if(gadget.getGadgetCategory() == 2)	{
				
				//In reference of bug #10872	
				$('#'+childdef['id']+'_overlay').css({
			        "position": "absolute",
			        "top": 0,
			        "left": 0,
			        "width": "100%",
			        "height": pagedef['height'] * $.mobileweb.device['aspectHratio'],
			        "background-color": "rgba(0,0,0,.6)",
			        "z-index": 999,
			    });
				$('#'+childdef['id']).css({
					   'position':'relative',
					   'top': childdef['frame']['y']* $.mobileweb.device['aspectHratio'],
					   'left': childdef['frame']['x']* $.mobileweb.device['aspectWratio'],
					   'width': childdef['frame']['width']* $.mobileweb.device['aspectWratio'],
				       'height': childdef['frame']['height']* $.mobileweb.device['aspectHratio'],
			   });
			}else{
				if(childdef['border']){
					$('#'+childdef['id']).css({'border-width':childdef['border']['borderweight'] *$.mobileweb.device['aspectHratio'] +"px", 'border-style':'solid'});
					$('#'+childdef['id']).css({'border-color':'rgba('+childdef['border']['bordercolor']['red']+','+childdef['border']['bordercolor']['green']+','+childdef['border']['bordercolor']['blue']+','+childdef['border']['bordercolor']['alpha']+')'});
				}
				
				$('#'+childdef['id']).css({'position':'relative', 'background': $.attributes('color', childdef['background']).getColorCode()});
				$("#"+childdef['id']).css({'top': (childdef['frame']['y']* $.mobileweb.device['aspectHratio'])+'px', 'left': (childdef['frame']['x']* $.mobileweb.device['aspectWratio'])+'px', 'height': (childdef['frame']['height'] * $.mobileweb.device['aspectHratio'])+'px', 'width': (childdef['frame']['width'] * $.mobileweb.device['aspectWratio'])+'px'});
			}
			
			if(childdef['hidden'] === "true"){
				$('#'+childdef['id']).css({'visibility' : 'hidden'});
				if(gadget.getGadgetCategory() == 2)	{
					$('#'+childdef['id']+'_overlay').css({'visibility' : 'hidden'});
				}
			}else{
				$('#'+childdef['id']).css({'visibility' : 'visible'});
				if(gadget.getGadgetCategory() == 2)	{
					$('#'+childdef['id']+'_overlay').css({'visibility' : 'visible'});
					
					if(childdef['border']){
						$('#'+childdef['id']).css({'border-width':childdef['border']['borderweight'] *$.mobileweb.device['aspectHratio'] +"px", 'border-style':'solid'});
						$('#'+childdef['id']).css({'border-color':'rgba('+childdef['border']['bordercolor']['red']+','+childdef['border']['bordercolor']['green']+','+childdef['border']['bordercolor']['blue']+','+childdef['border']['bordercolor']['alpha']+')'});
					}
					if(childdef['background']){
						$("#"+childdef['id']).css({'background' : $.attributes('color', childdef['background']).getColorCode()});
					}
				}
			}
		};
		
		
		gadget.setVisibility = function(param){
			if(param != "false"){
				
				childdef['hidden'] = "false";
				$('#'+gadget.getId()).css({'visibility':'visible'});
				if(gadget.getGadgetCategory() == 2)	{
					$('#'+gadget.getId()+'_overlay').css({'visibility':'visible'});
				}
				$.each(childdef['children'], function(i, child) {
					child['hidden'] = "false";
					$('#'+child['id']).css({'visibility':'visible'});
				});
			}
			else{
				childdef['hidden'] = "true";
				$('#'+gadget.getId()).css({'visibility' : 'hidden'});
				if(gadget.getGadgetCategory() == 2)	{
					$('#'+gadget.getId()+'_overlay').css({'visibility':'hidden'});
				}
				$.each(childdef['children'], function(i, child) {
					child['hidden'] = "true";
					$('#'+child['id']).css({'visibility':'hidden'});
				});
			}
		};
		
		gadget.applyEvents = function(){
			$.each(childs, function(i, child){
				$.each(child, function(j, gadgetChild){
					gadgetChild.applyEvents();
				});
			});
		};
		
		return gadget;
	};
	
	function uiListBox(pagedef, childdef, data){
		var listBox =  new BaseView(childdef);
		var selectedIndex = childdef['selectedIndex'];
		var listBoxValue = [];
		listBox.getItems = function(){
			return childdef['dataArray'];
		};
		
		listBox.getHTML = function(){
			var items = listBox.getItems();
			var itemsHTML = "";
			for(var i = 0; i < items.length; i++){
				itemsHTML = itemsHTML + "<tr><td>"+["<p id='",childdef['id'],"_",i,"' tabindex='",childdef['taborder'],"'> <label class='ui-label' >",items[i]['fieldName'],"</label></p>"].join('')+"</td></tr>";	
			}
			return ["<fieldset id='",childdef['id'],"' name='",childdef['name'],"'><div class='scrollerDiv'><table><tbody>",itemsHTML,"</tbody></table></div></fieldset>"].join("");
		};
		
		listBox.applyOverrides = function(){
			var items = listBox.getItems();
			$('#'+childdef['id'] + '> div > table').css({'padding-left' :childdef['padding']['left']*$.mobileweb.device['aspectratio'],'padding-top' :childdef['padding']['top']*$.mobileweb.device['aspectratio'],'padding-right' :childdef['padding']['right']*$.mobileweb.device['aspectratio'],'padding-bottom' :childdef['padding']['bottom']*$.mobileweb.device['aspectratio']});
			$('#'+childdef['id'] +"> div").css({'overflow' : 'hidden','height' : (childdef['frame']['height'] * $.mobileweb.device['aspectratio'])+'px'});
			$("#" + childdef['id']).css({'top':childdef['frame']['y'] *$.mobileweb.device['aspectratio']+'px', 'left': childdef['frame']['x']*$.mobileweb.device['aspectratio']+'px','height' : (childdef['frame']['height'] * $.mobileweb.device['aspectratio'])+'px', 'width' : (childdef['frame']['width'] * $.mobileweb.device['aspectratio'])+'px', 'background' : $.attributes('color', childdef['background']).getColorCode(),'position': 'absolute'});
			$('#'+childdef['id']).css({'border-width':childdef['border']['borderweight'] +"px"});
			$('#'+childdef['id']).css({'border-color':$.attributes('color', childdef['border']['bordercolor']).getColorCode()});
			$("#" + childdef['id'] + "> div > table").css({'width' : (childdef['frame']['width'] * $.mobileweb.device['aspectratio'])+'px'});
			$('#'+childdef['id']+' > div >table > tbody  ').css({'text-align':childdef['font']['align'],  'font-size':childdef['font']['size']+'px', 'color':$.attributes('color', childdef['font']['color']).getColorCode()});
			$('#'+childdef['id']+' > div >table > tbody> tr > td > p> label ').css({'white-space':'pre-wrap'});
			if(childdef['hidden'] == "true"){
				$('#'+childdef['id']).css({'visibility':'hidden'});
			}
			for(var i = 0; i < selectedIndex.length; i++){
				$('#'+childdef['id'] + '_' + selectedIndex[i]).css({'background' : '#a8c6ee', 'margin': '0px'});
					listBoxValue.push(items[selectedIndex[i]]['fieldValue']);	
			}
			
			for(var i = 0; i < items.length; i++){
				$('#'+childdef['id'] + '_' +i).css({'margin': '0px'});	
			}
		};
		listBox.applyClickEvent = function(){
			/*$('#'+childdef['id']+'> div > table > tbody > tr').click(function(event){
				if($('#'+childdef['id'] + '_' + event.currentTarget.rowIndex).css('background-color') === "rgb(0, 0, 255)"){
					$('#'+childdef['id'] + '_' + event.currentTarget.rowIndex).css({'background' : ''});
					listBox.setValue(event.currentTarget.rowIndex, "remove");
				}else{
					$('#'+childdef['id'] + '_' + event.currentTarget.rowIndex).css({'background' : 'blue'});
					listBox.setValue(event.currentTarget.rowIndex, "insert")
				}
			});*/
			
		};
		listBox.applyEvents = function(){
			$('#'+childdef['id']+'> div > table > tbody > tr').click(function(event){
				if($('#'+childdef['id'] + '_' + event.currentTarget.rowIndex).css('background-color') === "rgb(168, 19 238)"){
					$('#'+childdef['id'] + '_' + event.currentTarget.rowIndex).css({'background' : ''});
					listBox.setValue(event.currentTarget.rowIndex, "remove");
				}else{
					$('#'+childdef['id'] + '_' + event.currentTarget.rowIndex).css({'background' : '#a8c6ee'});
					listBox.setValue(event.currentTarget.rowIndex, "insert")
				}
			});
			//listBox.applyClickEvent();
			listBox.applyScrollEvents(childdef['id']);
		};
		
		listBox.setValue = function(index, operation){
			var items = listBox.getItems();
			if(operation === "insert"){
				listBoxValue.push(items[index]['fieldValue']);	
			}else if(operation === "remove"){
				listBoxValue.pop(items[index]['fieldValue']);
			}
		};
		
		listBox.getValue = function(){
			return listBoxValue.join(',');
		};
		
		listBox.applyScrollEvents = function(uiId){
			var myScroll;
			$('#'+uiId).on( "vmouseover", $('#'+uiId), function() {
				if(myScroll === undefined){
					var scrollerid = $('#'+uiId +" .scrollerDiv").get(0);
					myScroll = new iScroll(scrollerid, {
						bounceLock: true,
						onBeforeScrollStart: function (e) {
							var target = e.target;
							while (target.nodeType != 1) target = target.parentNode;
								if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
									e.preventDefault();
							},
							/*onScrollMove : function(e){
								$('#'+childdef['id']+'> div > table > tbody > tr').off("click");
							},
							onScrollEnd : function(e){
								listBox.applyClickEvent();			
							}*/
						});
					}
				});
		};
		
		return listBox;
	};
	

	function uiChartView(pagedef, childdef, data){
		var chartView =  new BaseView(childdef);

		chartView.getType = function(){
			return childdef['type'];
		};
		
		chartView.getTitle = function(){
			return childdef['title'];
		};
		
		chartView.getLegendStyle = function(){
			var legends = {position:'bottom', textStyle:{fontSize: 12}};
			return legends;
		};
		
		var headerItem;
		var headerValue;
		var chartViewData = [];
		chartView.setData = function(){
			
			headerItem = childdef['dbparams']['itemField'].replace("[","").replace("]","");
			headerValue = childdef['dbparams']['valueField'].replace("[","").replace("]","");
			
			if(childdef['dbparams']['servicename'] == ""){
				$.mobileweb['localdb']['instance'].transaction(function(tx) {
					tx.executeSql(["SELECT "+headerItem+", "+headerValue+" FROM "+childdef['dbparams']['tablename']+";"].join(''),[], 
						function(tx, result) {
							//console.log(result.rows);
							var _resultData = [];
							
							for (var i=0; i< result.rows.length; i++){
								var _result = {};
								for(key in result.rows.item(i)){
									if(key === headerItem)								
										_result['item'] = result.rows.item(i)[key];
									else
										_result['value'] = result.rows.item(i)[key];
								}
								
								_resultData.push(_result);
							}
							
							var innerArray;
					        var dataLength = _resultData.length;
						    for(var i=0;i<dataLength;i++)
						    {
							    innerArray = [];
							    innerArray.push(_resultData[i]['item']);
							    innerArray.push(_resultData[i]['value']);
							    chartViewData.push(innerArray);
						    }
						    
						    chartView.setValue();
						},
						function(tx, error) {
							console.log("Error in the Query..");
						});
				});
			}
			
		};
		chartView.getData = function(){
			var chartData = [];
	    	for(var i=0; i< chartViewData.length; i++)
			    chartData.push(chartViewData[i]);
		    
			return chartData;
		};
		
		chartView.setValue = function(){
			if(google.charts != undefined){				
			
				// Load the Visualization API and the corechart package.
				google.charts.load('current', {'packages':['corechart']});
				// Set a callback to run when the Google Visualization API is loaded.
				google.charts.setOnLoadCallback(drawChart);
	
				// Callback that creates and populates a data table, instantiates the pie chart, 
				// passes in the data and draws it.
				function drawChart() {
					var chartElem = document.getElementById(childdef['id']);
					
					var chartData = chartView.getData();
			    	
			    	var data = new google.visualization.DataTable();
			        data.addColumn('string', headerItem);
			        data.addColumn('number', headerValue);
			    	data.addRows(chartData);
			    	
					if(chartView.getType().toLowerCase() == "pie"){
				    	// Set chart options (like Title)
				    	var pie_options = {
				    		title: chartView.getTitle(), titleTextStyle:{color:0x0, fontSize: 16},
				    		legend:chartView.getLegendStyle(),
				    		chartArea: {left:40, right:40, top:40, bottom:80},
				    	};
				    	
				    	//var data = google.visualization.arrayToDataTable(chartData);				
						
						// Instantiate and draw our chart, passing in some options.
						var piechart = new google.visualization.PieChart(chartElem);
						piechart.draw(data, pie_options);
					
					}else if(chartView.getType().toLowerCase() == "column"){

					    var column_options = {
					    	title: chartView.getTitle(), titleTextStyle:{color:0x0, fontSize: 16},
				    		legend:chartView.getLegendStyle(),
				    		chartArea: {left:40, right:40, top:40, bottom:80},
					    };

					    var columnchart = new google.visualization.ColumnChart(chartElem);
					    columnchart.draw(data, column_options);
					      
					}else if(chartView.getType().toLowerCase() == "bar"){

					    var bar_options = {
					    	title: chartView.getTitle(), titleTextStyle:{color:0x0, fontSize: 16},
				    		legend:chartView.getLegendStyle(),
				    		chartArea: {left:80, right:40, top:40, bottom:80},
					    };

					    var barchart = new google.visualization.BarChart(chartElem);
						barchart.draw(data, bar_options);
					      
					}else if(chartView.getType().toLowerCase() == "line"){
						
//						var data = new google.visualization.DataTable();
//					    data.addColumn('number', 'X');
//					    data.addColumn('number', 'Dogs');
//
//					    data.addRows([
//					        [0, 0],   [1, 10],  [2, 23],  [3, 17],  [4, 18],  [5, 9],
//					        [6, 11],  [7, 27],  [8, 33],  [9, 40],  [10, 32], [11, 35],
//					        [12, 30], [13, 40], [14, 42], [15, 47], [16, 44], [17, 48],
//					        [18, 52], [19, 54], [20, 42], [21, 55], [22, 56], [23, 57],
//					        [24, 60], [25, 50], [26, 52], [27, 51], [28, 49], [29, 53],
//					        [30, 55], [31, 60], [32, 61], [33, 59], [34, 62], [35, 65],
//					        [36, 62], [37, 58], [38, 55], [39, 61], [40, 64], [41, 65],
//					        [42, 63], [43, 66], [44, 67], [45, 69], [46, 69], [47, 70],
//					        [48, 72], [49, 68], [50, 66], [51, 65], [52, 67], [53, 70],
//					        [54, 71], [55, 72], [56, 73], [57, 75], [58, 70], [59, 68],
//					        [60, 64], [61, 60], [62, 65], [63, 67], [64, 68], [65, 69],
//					        [66, 70], [67, 72], [68, 75], [69, 80]
//					    ]);

					    var line_options = {
				    		title: chartView.getTitle(), titleTextStyle:{color:0x0, fontSize: 16},
				    		legend: chartView.getLegendStyle(),
				    		chartArea: {left:80, right:80, top:80, bottom:80},
					    	hAxis: {
					          title: headerItem, minValue:0,
					          baselineColor:'#333333',gridlines:{color:'#9f9f9f'},
					        },
					        vAxis: {
					          title: headerValue, minValue:0,
					          baselineColor:'#333333',gridlines:{color:'#9f9f9f'},
					        },
					        backgroundColor: '#ffffff'
					    };

					    var linechart = new google.visualization.LineChart(document.getElementById(childdef['id']));
					    linechart.draw(data, line_options);
					    
					    $("text:contains(" + line_options.title + ")").attr({'y':'25'});
					}
					
				}
			
			}
			else
				console.log('google.charts API not working');
		};
		
		chartView.getHTML = function(){
			return ["<div id='",childdef['id'],"' name='",childdef['name'],"'></div>"].join("");
		};
		
		chartView.applyOverrides = function(){
			
			$('#'+childdef['id']).css({'position':'absolute', 'left':childdef['frame']['x']*$.mobileweb.device['aspectratio']+'px', 'top':childdef['frame']['y'] *$.mobileweb.device['aspectratio']+'px', 'width':(childdef['frame']['width'] * $.mobileweb.device['aspectratio'])+'px', 'height':(childdef['frame']['height'] * $.mobileweb.device['aspectratio'])+'px'});
//			$('#'+childdef['id']).css({'border-width':childdef['border']['borderweight'] +"px"});
//			$('#'+childdef['id']).css({'border-color':$.attributes('color', childdef['border']['bordercolor']).getColorCode()});
			if(childdef['hidden'] == "true"){
				$('#'+childdef['id']).css({'visibility':'hidden'});
			}
			
			chartView.setData();
		};
		
		chartView.applyEvents = function(){

		};
		
		return chartView;
	};
	
	function uiTileList(pagedef, childdef, data){
		var tileList =  new BaseView(childdef);

		tileList.getTemplate = function(){
			return childdef['template'];
		};
		
		tileList.getHTML = function(){
			
			if(!$.utility("isReverseTransition")){
				childdef['dbparams']['offset'] = 25;
				childdef['dbparams']['limit'] = 25;
			}
			
			var tileChildren;
			var _table = [];
			$.each(childdef['dataArray'], function(n,group){
				
				var cntRecords = parseInt(group['rowCount']) * parseInt(group['columnCount']);
				for(var l=0; l< cntRecords; l++){
					$.each(group['children'], function(k, child){
						if(child['id'].indexOf('-tile-') != -1)
							child['id'] = child['id'].substring(0, child['id'].indexOf('-tile-'));
						childid = child['id'] + '-tile-' + l;
						child['id'] = childid;
					});
					
					tileChildren = new $.uichildren(pagedef, group['children'], null);
					_table = _table.concat(["<div id=",childdef['id'],"-tileblocks-",l,""," class=","tileblocks"," style='visibility:hidden'>"]);
					_table = _table.concat(' '+tileChildren.getHTML());
					_table = _table.concat(["</div>"]);
				}
			});
			
			if(childdef['dbparams']['isPagination'])	//for pagination
				return ["<div id=",childdef['id']," name='",childdef['name'],"'>","<div id=",childdef['id'],"-pagination","></div>",_table.join(''),"</div>"].join('');
			else
				return ["<div id=",childdef['id']," name='",childdef['name'],"'>",_table.join(''),"</div>"].join('');
		};
		
		tileList.applyOverrides = function(){
			if(childdef['direction'] == "Vertical"){
				var scrollerHeight =  childdef['frame']['height'] * $.mobileweb.device['aspectHratio'] +'px';
				$("#" + childdef['id']).css({'height': scrollerHeight, 'width':(childdef['frame']['width'] * $.mobileweb.device['aspectWratio'])+'px'});
			}else
				$("#" + childdef['id']).css({'height':(childdef['frame']['height'] * $.mobileweb.device['aspectHratio'])+'px', 'width':(childdef['frame']['width'] * $.mobileweb.device['aspectWratio'])+'px'});
			$("#" + childdef['id']).css({'top':(childdef['frame']['y']* $.mobileweb.device['aspectHratio'])+'px','left':(childdef['frame']['x']* $.mobileweb.device['aspectWratio'])+'px', 'position' : 'absolute'});
			$('#' + childdef['id']).css({'background': $.attributes('color',childdef['background']).getColorCode()});
			$("#" + childdef['id']).addClass("table");
			if(childdef['hidden'] == true)
				tileList.setVisibility(false);
			tileList.refresh(childdef['dbparams']['where']);
			
			if(childdef['direction'] != "Vertical"){
				var pageIndex = -1;
				var cntRecords = parseInt(childdef['dataArray'][0]['rowCount']) * parseInt(childdef['dataArray'][0]['columnCount']);
				
				$('#'+childdef['id']).off('swipeleft').on("swipeleft",function(event){
					if(tileList.getRecords() != undefined){
						childdef['swipe'] = "left";
						var pageCount = Math.ceil(parseFloat(tileList.getRecords().length/cntRecords));
						if(pageIndex == -1)		pageIndex = 0;
						if(pageIndex != 0){
							
							pageIndex--;
							var new_num = pageIndex*cntRecords + 1;
							tileList.updateData(new_num);
						}else if(pageIndex == 0 && childdef['circular']){
							pageIndex = pageCount-1;
							var new_num = pageIndex*cntRecords + 1;
							tileList.updateData(new_num);
						}
					}
				});
				$('#'+childdef['id']).off('swiperight').on("swiperight",function(event){
					if(tileList.getRecords() != undefined){
						childdef['swipe'] = "right";
						var pageCount = Math.ceil(parseFloat(tileList.getRecords().length/cntRecords));
						if(pageIndex == -1)		pageIndex = 0;
						if(pageIndex != pageCount-1){
							
							pageIndex++;
							var new_num = pageIndex*cntRecords + 1;
							tileList.updateData(new_num);
						}else if(pageIndex == pageCount-1 && childdef['circular']){
							pageIndex = 0;
							var new_num = pageIndex*cntRecords + 1;
							tileList.updateData(new_num);
						}
					}
				});
			}
		};
		
		tileList.updateData = function(recIndex){
			var totalRecords = tileList.getRecords().length;
			var cntRecords = parseInt(childdef['dataArray'][0]['rowCount']) * parseInt(childdef['dataArray'][0]['columnCount']);
			var pageCount = Math.ceil(parseFloat(totalRecords/cntRecords));
			
			var bottom_div = 37 * $.mobileweb.device['aspectHratio'];
			// creating HTML for paging-dots
			if(childdef['dbparams']['isPagination']){
				$("#" + childdef['id'] + "-pagination").empty();
				$("#" + childdef['id'] + "> div").first().css({"bottom":"0px", 'height':bottom_div+"px", 'width': (childdef['frame']['width'] * $.mobileweb.device['aspectWratio'])+'px'});
				$("#" + childdef['id'] + "> div").first().css({'text-align':'center',"position":"absolute"});
				for(var l = 1; l <= pageCount; l++) {
					$("#" + childdef['id'] + "> div").first().append(["<span id = ",l," class=","dot",">","</span>"].join(''));
					$("#" + childdef['id'] + "> div > span:nth-child(" + l + ")").css({'cursor':'auto'});
					

					if(recIndex == 1 || recIndex == pageCount)
					    $("#" + childdef['id'] + "> div > span:nth-child(" + recIndex + ")").css({'background-color':'#eee'});
					else if((l-1) == Math.floor(recIndex/cntRecords))
						$("#" + childdef['id'] + "> div > span:nth-child(" + (l-1) + ")").css({'background-color':'#eee'});
				}
				$('#'+childdef['id'] +'-pagination > span').off('click').on('click',function(e){
					if(tileList.getRecords() != undefined){
						var dot_num = parseInt(e.target.id);
						$("#dot_num").addClass("active");
							  
						pageIndex = (dot_num-1);
						var new_num = (dot_num -1)*cntRecords + 1;
						tileList.updateData(new_num);
						}
				});
			}
			else{
				if(childdef['direction'] == "Vertical" && totalRecords >= 25){
					var showMoreButton = '<fieldset id="showmore"> <div data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-icon="null" data-iconpos="null" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c" aria-disabled="false"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Show More</span></span><input id="showmorebtn" type="button" value="showmore" class="ui-btn-hidden" aria-disabled="false"></div> </fieldset>';
					$("#showmore").css({'visibility':'hidden'});
				}
			}
			
			if(childdef['direction'] == "Vertical")
				cntRecords = cntRecords * pageCount;
			$("#" + childdef['id']).children(".tileblocks").css({'display' : 'none'});
			
			var startIndex = 0;
			var allTileblocks = $("#" + childdef['id']).children(".tileblocks");
			if(allTileblocks.length > 0){
				var firstTileblocksId = allTileblocks[0]['id'];
				startIndex = parseInt(firstTileblocksId.substring(firstTileblocksId.lastIndexOf('-')+1));
				startIndex = startIndex;
			}
			
			var tileChildren;
			// creating HTML for tilelist children
			var _table = [];
			$.each(childdef['dataArray'], function(n,group){
				for(var i=0; i< cntRecords; i++){
					$.each(group['children'], function(k, child){
						var _uiId;
						if(child['id'].indexOf('-tile-') != -1)
							_uiId = child['id'].substring(0, child['id'].indexOf('-tile-'));
						childid = _uiId + '-tile-' + (i+recIndex-1);
						child['id'] = childid;
						
						if($.utility("isReverseTransition")){	// navigating back from child page
							if(child['template'] !== "" &&  group['row'][i]){
								child['value']  = $.utility('tokenizeString', $.utility('extractDataFromRecord', group['row'][i]['data']['contents'][0], child['template']), pagedef);
							}
						}
					});
					
					var _currIndex = 0;
					if((i+recIndex-1) >= totalRecords)
						break;
					if(group['row'][(i+recIndex-1)] != undefined){
						var _newId =  childdef['id'] + "-tileblocks-" + (i+recIndex-1);
						if(recIndex > cntRecords){
							$("#" + childdef['id'] + "-tileblocks-" + (i+startIndex)).attr("id", _newId);
							_currIndex = i+startIndex;
						}
						else{
							if((i+recIndex-1) == startIndex){
								$("#" + childdef['id'] + "-tileblocks-" + (i+recIndex-1)).attr("id", _newId);
								_currIndex = i+recIndex-1;
							}
							else{
								if($("#" + childdef['id'] + "-tileblocks-" + (i+startIndex)).length == 0){
									$("#" + childdef['id'] + "-tileblocks-" + (i+startIndex-cntRecords)).attr("id", _newId);
									_currIndex = i+startIndex-cntRecords;
								}
								else{
									$("#" + childdef['id'] + "-tileblocks-" + (i+startIndex)).attr("id", _newId);
									_currIndex = i+startIndex;
								}
							}
						}
						
						var _allElements = $("#" + _newId).find('*');
						if(childdef['swipe'] == "left"){
							_currIndex = (i+recIndex-1)+cntRecords;
							if(childdef['circular'] == true){
								if((recIndex + cntRecords) >= totalRecords){
									_currIndex = i;
								}
							}
						}else if(childdef['swipe'] == "right"){
							_currIndex = (i+recIndex-1)-cntRecords;
							if(childdef['circular'] == true){
								if(recIndex == 1){
									var _lastPageIndex =  Math.ceil(parseFloat(totalRecords/cntRecords));
									_currIndex = ( _lastPageIndex-1)*cntRecords + i;
								}
							}
						}
						$.each(_allElements, function(m, element){
							var _uiId;
							if(element['id'].indexOf('-tile-') != -1)
								_uiId = element['id'].substring(0, element['id'].indexOf('-tile-'));
							if( _uiId != undefined){//Bug #12194 Fix
								childid = _uiId + '-tile-' + (i+recIndex-1);
								//child['id'] = childid;
								if($("#" +_uiId + '-tile-' + _currIndex).length == 0 && _currIndex >= cntRecords && _currIndex >= totalRecords)
									_currIndex = _currIndex - cntRecords;
								if(_currIndex >= 0 ){
									var eleID = element['id'].replace(_uiId + '-tile-' + _currIndex, childid);
									$("#"+childid+"_label").attr("for",childid)
									element['id'] = eleID;
								}
							}
						});
						
						tileChildren = new $.uichildren(pagedef, group['children'], group['row'][(i+recIndex-1)]['data']['contents'][0]);
						tileList.setTileChildren(tileChildren);
						if($("#" + _newId).length == 0 && childdef['direction'] == "Vertical"){
							$("#" + childdef['id']).append('<div id="'+_newId+'" class="tileblocks">');
							$("#" + _newId).append(tileChildren.getHTML());
						}
							
						if(childdef['hidden'] == true || childdef['hidden'] == "true"){
							
						}else{
							$("#" + childdef['id'] + "-tileblocks-" + (i+recIndex-1)).css({'visibility' : 'visible'});
							$("#" + childdef['id'] + "-tileblocks-" + (i+recIndex-1)).css({'display' : 'block'});
						}
						
						//console.log((i+recIndex-1), "###############", group['row'][(i+recIndex-1)]['data']['contents'][0]);
						tileChildren.getHTML();
						tileChildren.applyOverrides();
						tileChildren.applyEvents();
					}
			    }
			});
			var tileHeight = (childdef['dataArray'][0]['tileHeight']* $.mobileweb.device['aspectHratio']) +"px";
			var tileWidth = (childdef['dataArray'][0]['tileWidth']* $.mobileweb.device['aspectWratio']) +"px";
			var _cntCol = childdef['dataArray'][0]['columnCount'];
			var _cntRow = 1;
			if(childdef['direction'] == "Vertical")
				_cntRow = Math.ceil(parseFloat(totalRecords/_cntCol));
			else
				_cntRow = childdef['dataArray'][0]['rowCount'];
			
			if(childdef['direction'] != "Vertical"){
				$("#" + childdef['id']).children(".tileblocks").css({'overflow' : 'none'});			// fix bug #11894
			}
			$("#" + childdef['id'] + "> div").css({'height':tileHeight, 'width':tileWidth});
			$('#' + childdef['id'] + "> div").css({'position' : 'absolute'});
			if(childdef['dbparams']['isPagination']){
				$("#" + childdef['id'] + "> div").first().css({'height':bottom_div+"px", 'width': (childdef['frame']['width'] * $.mobileweb.device['aspectWratio'])+'px',"bottom":"0px","position":"absolute"});//for pagination
				$(".dot").css({'margin-top':(bottom_div - parseInt($(".dot").css('height')))/2});
			}
			//positioning of tile-blocks
			if(childdef['direction'] != "Vertical"){
				var x = childdef['padding']['left']* $.mobileweb.device['aspectWratio'];
				var div_num = (childdef['dbparams']['isPagination']) ? 1 :0;
				for(var j = 1; j <= _cntCol; j++) {
					var y = childdef['padding']['top']* $.mobileweb.device['aspectHratio'];
				    for(var m = 1; m <= _cntRow; m++) {
				       	div_num++;
				        $('#'+childdef['id']+' > div:nth-child(' + div_num + ')').css({'left':x});
				        $('#'+childdef['id']+' > div:nth-child(' + div_num + ')').css({'top':y});
				        y = parseInt(y) + (childdef['dataArray'][0]['tileHeight']* $.mobileweb.device['aspectHratio']) + (childdef['dataArray'][0]['tileGap']* $.mobileweb.device['aspectHratio']);
				    }
				    x = parseInt(x) + (childdef['dataArray'][0]['tileWidth']* $.mobileweb.device['aspectWratio']) + (childdef['dataArray'][0]['tileGap']* $.mobileweb.device['aspectWratio']);
				}
			}else{
				var y = childdef['padding']['top']* $.mobileweb.device['aspectHratio'];
				var div_num = 0;
				for(var j = 1; j <= _cntRow; j++) {
					var x = childdef['padding']['left']* $.mobileweb.device['aspectWratio'];
				    for(var m = 1; m <= _cntCol; m++) {
				       	div_num++;
				        $('#'+childdef['id']+' > div:nth-child(' + div_num + ')').css({'left':x});
				        $('#'+childdef['id']+' > div:nth-child(' + div_num + ')').css({'top':y});
				        x = parseInt(x) + (childdef['dataArray'][0]['tileWidth']* $.mobileweb.device['aspectWratio']) + (childdef['dataArray'][0]['tileGap']* $.mobileweb.device['aspectWratio']);
				    }
				    y = parseInt(y) + (childdef['dataArray'][0]['tileHeight']* $.mobileweb.device['aspectHratio']) + (childdef['dataArray'][0]['tileGap']* $.mobileweb.device['aspectHratio']);
				}
				
				// Setting 'scroll bars' in case of Vertical tile-list.
				$("div#" + childdef['id'] + ".table").css({'overflow-y':'auto'});
				$("div#" + childdef['id'] + ".table").css({'overflow-x':'hidden'});
				var style_track = $('<style>div#'+childdef['id'] +'.table::-webkit-scrollbar-track{-webkit-box-shadow: inset 0 0 16px rgba('+childdef['background']['red']+','+childdef['background']['green']+','+childdef['background']['blue']+',1);border-radius: 10px;background-color: #F5F5F5;}</style>');
				$('html > head').append(style_track);
				var style_bar = $('<style>div#'+childdef['id']	+'.table::-webkit-scrollbar{width: 7px;background-color: #F5F5F5;}</style>');
				$('html > head').append(style_bar);
				var style_thumb =$('<style>div#'+childdef['id'] +'.table::-webkit-scrollbar-thumb{border-radius: 10px;-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);background-color: #808080;}</style>');
				$('html > head').append(style_thumb);//--
				
			}
			
			//setting scroll position of Vertical tile-list, when you come back to it.
			if(childdef['direction'] == "Vertical"){
				if($.utility('getSessionData',"scrollpos_"+childdef['id'],childdef['id']) != null)
				{
					var scrollPosObj = $.utility('getSessionData',"scrollpos_"+childdef['id'],childdef['id']);
					scrollPosObj = $.parseJSON(scrollPosObj);		
					if($.mobileweb.getCurrentPage().getName()==scrollPosObj["page_name"] && childdef['id']==scrollPosObj["u_id"])
					{
						$('#'+childdef['id']).scrollTop(scrollPosObj['scrollTop']);
					}
				}
			}
		};
		
		
		tileList.applyOverrides_old = function(){
			
			if(childdef['hidden'] == true)
				tileList.setVisibility(false);
			
			var cntRecords = parseInt(childdef['dataArray'][0]['rowCount']) * parseInt(childdef['dataArray'][0]['columnCount']);
			
			$("#" + childdef['id']).addClass("table");

			tileList.refresh(childdef['dbparams']['where']);
			
			var pageIndex = -1;
			
			if(childdef['direction'] != "Vertical"){
				$('#'+childdef['id']).on("swipeleft",function(event){
					var targetId = e.target.id;
					if(targetId.indexOf("-tile-") == -1){
						if(tileList.getRecords() != undefined){
							var pageCount = Math.ceil(parseFloat(tileList.getRecords().length/cntRecords));
							if(pageIndex == -1)		pageIndex = 0;
							if(pageIndex != 0){
								
								pageIndex--;
								var new_num = pageIndex*cntRecords + 1;
								tileList.updateData(new_num);
							}else if(pageIndex == 0 && childdef['circular']){
								pageIndex = pageCount-1;
								var new_num = pageIndex*cntRecords + 1;
								tileList.updateData(new_num);
							}
						}
					}
				});
				$('#'+childdef['id']).on("swiperight",function(event){
					var targetId = e.target.id;
					if(targetId.indexOf("-tile-") == -1){
						if(tileList.getRecords() != undefined){
							var pageCount = Math.ceil(parseFloat(tileList.getRecords().length/cntRecords));
							if(pageIndex == -1)		pageIndex = 0;
							if(pageIndex != pageCount-1){
								
								pageIndex++;
								var new_num = pageIndex*cntRecords + 1;
								tileList.updateData(new_num);
							}else if(pageIndex == pageCount-1 && childdef['circular']){
								pageIndex = 0;
								var new_num = pageIndex*cntRecords + 1;
								tileList.updateData(new_num);
							}
						}
					}
				});
			}
		};
		
		tileList.refresh = function(param){
			childdef['dbparams']['where'] = $.utility("tokenizeString",param, pagedef);		//param; 
			var timeRefresh;
			if(childdef['dbparams']['servicename'] != undefined && childdef['dbparams']['servicename'] != ""){
				tileList.getRemoteDBData(childdef['dbparams']);
				timeRefresh = ($.utility("isReverseTransition")) ? 300 : 1500;
			}else{
				tileList.getLocalDBData(childdef['dbparams']);
				timeRefresh = 600;
			}
			var refresh=setInterval(function() {
				var blnReferesh = false;
				if($.utility("isReverseTransition")){
					if((pagedef['data']['contents'][childdef['id']]['loaded'] != undefined) && (pagedef['data']['contents'][childdef['id']]['loaded']))
						blnReferesh  = true;
				}
				else{
					if(childdef['dbparams']['servicename'] != undefined && childdef['dbparams']['servicename'] != ""){
						if(!$.utility('isBusy') && ($.utility('getComActionStatus') != "") && ($.utility('getComActionStatusTileList') === "Success"))
							blnReferesh  = true;
					}else{
						if((pagedef['data']['contents']['loaded'] != undefined) && (pagedef['data']['contents']['loaded']))
							if((pagedef['data']['contents'][childdef['id']]['loaded'] != undefined) && (pagedef['data']['contents'][childdef['id']]['loaded']))
								blnReferesh  = true;
					}
				}
				if(blnReferesh){
					clearInterval(refresh);
					
					if(pagedef['data']['contents'][childdef['id']] != undefined){
						if(childdef['dbparams']['servicename'] != undefined && childdef['dbparams']['servicename'] != ""){
							tileList.setRecords(pagedef['data']['contents'][childdef['id']]);
						}else{
							tileList.setRecords(pagedef['data']['contents'][childdef['id']]);
						} 
					}
					
					var group = childdef['dataArray'][0];
					var rows = [];
					$.each(tileList.getRecords(), function(i,childdata){
						var row = {
							rownum: i,
							data : {contents: [childdata]},
							children : [],
						};
						rows.push(row);
					});
					group['row'] = rows;
					tileList.updateData(1);
				}
			},timeRefresh);
		}

		tileList.getRemoteDBData = function(dbparams){
			
			if(childdef['dbparams']['servicename'] != ""){
				if(!$.utility("isReverseTransition")){
				    new $.actions(pagedef, null, [{method:"Select", category:"ComAction", callback:"createRemoteTileList", callbackUI:childdef['id'],parentPage:pagedef['parent'],
				        params:{
					         servicename: childdef['dbparams']['servicename'],
					         table:childdef['dbparams']['tablename'],
					         where: $.utility("tokenizeString",childdef['dbparams']['where'], pagedef),
					         order: $.utility("tokenizeString",childdef['dbparams']['order'], pagedef),
					         limit : childdef['dbparams']['limit'],
					         //offset: 0,
					         fields:""
				        }
				      }]).execute();
				}
			}
		};
		
		tileList.getLocalDBData = function(dbparams){
			if(pagedef['data']['contents'][childdef['id']] != undefined)
				pagedef['data']['contents'][childdef['id']]['loaded'] = false;
			$.mobileweb['localdb']['instance'].transaction(function(tx) {
				tx.executeSql(['SELECT * FROM ', childdef['dbparams']['tablename'], (childdef['dbparams']['where']!=='')? [' WHERE ',$.utility('formWhereCondition',childdef['dbparams']['where'])].join(''):'', (childdef['dbparams']['order']!==undefined &&  childdef['dbparams']['order']!=='')? [' ORDER BY ', childdef['dbparams']['order']].join(''):''].join(''), [],
					function(tx,result){
						var _results = [];
						for (var i=0; i<result.rows.length; i++){
							var _result = {};
							for(key in result.rows.item(i)){
								_result[key] = result.rows.item(i)[key];
							}
							_results.push(_result);
						}
						if(_results.length > 0){
							pagedef['data']['contents'][childdef['id']] = [];
							for (var i = 0; i < _results.length; i++) {
								pagedef['data']['contents'][childdef['id']].push(_results[i]);
							}
							pagedef['data']['contents']['loaded'] = true;
						}else{
							pagedef['data']['contents'][childdef['id']] = [];
						}
						if(pagedef['data']['contents'][childdef['id']] != undefined)
							pagedef['data']['contents'][childdef['id']]['loaded'] = true;
					},function(tx,error){
						$.utility('queryDatabase',false);
						console.log("error");
					});
			});
		};

		var records = [];
		tileList.setRecords = function(param){
			records = param;
		};
		tileList.getRecords = function(){
			return records;
		};
		
		var tileListChildren = [];
		tileList.setTileChildren = function(param){
			tileListChildren.push(param);
		};
		tileList.getTileChildren = function(){
			return tileListChildren;
		};
		
		tileList.setVisibility = function(param){
			if(param === true){
				childdef['hidden'] = false;
				$('#'+tileList.getId()).children().css({'visibility':'visible'});
				$('#'+tileList.getId()).children().css({'display' : 'block'});
				$('#'+tileList.getId()).css({'visibility':'visible'});
				$('#'+tileList.getId()).css({'display' : 'block'});
			}else{
				childdef['hidden'] = true;
				$('#'+tileList.getId()).children().css({'visibility':'hidden'});
				$('#'+tileList.getId()).children().css({'display' : 'none'});
				$('#'+tileList.getId()).css({'visibility' : 'hidden'});
				$('#'+tileList.getId()).css({'display' : 'none'});
			}
		};
		
		tileList.applyEvents = function(){
			$('#'+childdef['id']).on('tap',function(e){
				childdef['swipe'] = '';
				// Getting the tile-block index from where any event will trigger. Need to investigate more test cases. Date : 03-Jan-2019
				if(e.target != undefined){
					var childId = e.target['id'];
					if(childId == "") // Bug #12411 Fix
						childId = e.target.offsetParent['id'];
					if(childId != undefined && childId != 'showmorebtn'){
						var iids = childId.replace("ui-","").replace("tile-","");
						var res = iids.split("-");
						var uiId = 'ui-' + res[0];
						var tileIndex = res[1];
						if(isNaN(tileIndex) && tileIndex != undefined)
							tileIndex = tileIndex.split("_")[0];
						
						//console.log(pagedef['name'], "-----------", uiId, ":::", tileIndex);
						if(!isNaN(tileIndex)){
							if(pagedef['data']['contents'][childdef['id']] != undefined){
								var _data = $.utility('savePageData', pagedef['children'], pagedef['data']['contents'][childdef['id']][tileIndex], pagedef);
								pagedef['data']['contents'][0] = $.extend({}, pagedef['data']['contents'][0], _data);
							}else
								pagedef['data']['contents'][0] = $.utility('savePageData', pagedef['children'], pagedef['data']['contents'][0][tileIndex], pagedef);
						}
					}
				}
			});
			
			var showmoreTrigger = false;
			var scrollPos = [];
			$('#'+childdef['id']).on('scroll',function(e){
				if(childdef['direction'] == "Vertical"){
					if(e.target != undefined){
						//pagedef['iscroll'].vScroll = false;//Bug #11392 Fix
						//in case of Vertical tilelist, when scrolling down the list 'show more' functionality should trigger its own. Date : 03-Jan-2019 
						if(e.target['scrollHeight'] < 2*(e.target['scrollTop']+(childdef['dataArray'][0]['tileHeight']* $.mobileweb.device['aspectratio']))){		// Need to find more accurate condition. 
							if(!showmoreTrigger){
								showmoreTrigger = true;
								
								childdef['dbparams']['limit'] = 25 + childdef['dbparams']['limit'] ;
								tileList.refresh(childdef['dbparams']['where']);
								
								//setting scroll position upto scroll's last position when 'show-more' functionality triggered.
								if(scrollPos.length > 0){
									$('#'+childdef['id']).scrollTop( scrollPos[scrollPos.length-1] );
									scrollPos = [];
								}
							 }else{
								 scrollPos.push(e.target['scrollTop']);
							 }
						 }else
							 showmoreTrigger = false;
						
						// saving scroll-position in session storage.
						var scrolltop = {page_name:pagedef['name'], u_id:childdef['id'], scrollTop:e.target['scrollTop']};
						$.utility('setSessionData', scrolltop, "scrollpos_"+childdef['id']);
						
					 }
					 if($.utility('getSessionData',"offset","") != null)//Bug #12058 Fix
					 {
						 var scrollPosObj = $.utility('getSessionData',"offset","");
						 scrollPosObj = $.parseJSON(scrollPosObj);		
						 if($.mobileweb.getCurrentPage().getName()==scrollPosObj['page_name'])
						 {
							pagedef['iscroll'].scrollTo(scrollPosObj['x']);
						 }
					 }
				}
			});
			
		};
		
		return tileList;
	};
	
	function uiCalendar(pagedef, childdef, data){
		var calendar =  new BaseView(childdef);
		var _maxRange = null;
		var _minRange = null;
		var _language = "";
		childdef['initialValue'] = "";
		if(childdef['minRange'] != "invalid" && childdef['minRange'] != "")
			_minRange =  $.utility('tokenizeString',childdef['minRange'], pagedef);
		if(childdef['maxRange'] != "invalid" && childdef['maxRange'] != "")
			_maxRange =  $.utility('tokenizeString',childdef['maxRange'], pagedef);
		childdef['displayFormat'] = "DD-MM-YYYY"; //TSL App
		var _dateFormat = "yy/mm/dd";
		
		if(childdef['displayFormat'] != "invalid" && childdef['displayFormat'] != "")
			_dateFormat = childdef['displayFormat'];
		childdef['template'] = "";
		
		if($.utility('containsGlobalVariable', childdef['value'])){
			childdef['systemVariableValue'] = childdef['value'];
			childdef['isSystemVariable'] = true;
		}else if($.utility('containsGlobalVariable', childdef['selectedDate'])){
			childdef['systemVariableValue'] = childdef['selectedDate'];
			childdef['isSystemVariable'] = true;
		}else{
			childdef['template'] = childdef['selectedDate'];
		}
		
		calendar.getTemplate = function(){
			return childdef['template'];
		};
		
		calendar.getHTML = function(){
			if(!$.utility("isReverseTransition")){
				if(childdef['template'] !== ""){
					childdef['value']  = $.utility('tokenizeString', childdef['template'], pagedef);
					if(childdef['template'].indexOf('[') != -1 && childdef['template'].indexOf(']') != -1 && childdef['value'] == childdef['template']){
						childdef['value'] = "";
					}
				}
				childdef['value'] = $.utility('convertSpecialCharacter', $.utility('tokenizeString', childdef['value']));
			}
			
			return ["<input id='",childdef['id'],"' name='",childdef['name'], "' value='",childdef['value'] ,"'"," type='",childdef['secure'] === "true" ? "password":"text","' placeholder='",childdef['placeholder'],"' readonly tabindex='",childdef['taborder'],"'/>","<input id='",childdef['id'],"_jpEra'/>"].join('');
		};
		
		calendar.applyOverrides = function(){
			calendar['frame'].applyCSS();
			calendar['font'].applyCSS();
			calendar['border'].applyCSS();
			calendar['background'].setColor();
			
			$('#'+childdef['id']).css({'margin':'0px'});
			
			if(childdef['hidden'] == "true" || childdef['hidden'] == true){
				$('#'+childdef['id']).css({'visibility':'hidden'});
			}
			
			if(!isNaN(parseInt(childdef['taborder'])))
				$("#"+childdef['id']).attr('tabindex', parseInt(childdef['taborder'])+1 );
			
			if(childdef['padding']){
				$('#'+childdef['id']).css({'padding-top': childdef['padding']['top']*$.mobileweb.device['aspectHratio'], 'padding-bottom': childdef['padding']['bottom']*$.mobileweb.device['aspectHratio'], 'padding-left': childdef['padding']['left']*$.mobileweb.device['aspectWratio'], 'padding-right': childdef['padding']['right']*$.mobileweb.device['aspectWratio']});
				$('#'+childdef['id'] + '_jpEra').css({'padding-top': childdef['padding']['top']*$.mobileweb.device['aspectHratio'], 'padding-bottom': childdef['padding']['bottom']*$.mobileweb.device['aspectHratio'], 'padding-left': childdef['padding']['left']*$.mobileweb.device['aspectWratio'], 'padding-right': childdef['padding']['right']*$.mobileweb.device['aspectWratio']});
			}
			
			var _inputWidth = parseInt($('#'+childdef['id']).css('width')) - (parseInt($('#'+childdef['id']).css('padding-left')) + parseInt($('#'+childdef['id']).css('padding-right')) );
			var _inputHeight = parseInt($('#'+childdef['id']).css('height'));// - (parseInt($('#'+childdef['id']).css('padding-top')) + parseInt($('#'+childdef['id']).css('padding-bottom')) );
			$('#'+childdef['id']+"_jpEra").attr('readonly',true);
			$('#'+childdef['id']+"_jpEra").removeClass();
			$('#'+childdef['id']+"_jpEra").css({'text-align':childdef['font']['align']});
			$('#'+childdef['id']+"_jpEra").css({'height':_inputHeight+ "px",'width': _inputWidth + "px"});
			$('#'+childdef['id']+"_jpEra").css({'top':parseInt($('#'+childdef['id']).css('top')) + "px"});
			$('#'+childdef['id']+"_jpEra").css({'left':parseInt($('#'+childdef['id']).css('left')) + "px",'position':'absolute','padding-top':'0px','padding-bottom':'0px'});
			$('#'+childdef['id']+"_jpEra").css({'font-size':parseInt($('#'+childdef['id']).css('font-size')) + "px"});
			
			if (childdef['verticalalignment'] =='top'){
				$('#'+childdef['id']).css({'vertical-align':'top'});
				
				var hei = $('#'+childdef['id']).css('height');
				var fontsize = $('#'+childdef['id']).css('font-size');
				var padtop = childdef['padding']['top']*$.mobileweb.device['aspectHratio'];
				var padbottom = parseInt(hei)-parseInt(fontsize)-padtop;					
				
				$('#'+childdef['id']).css({'padding-top': padtop, 'padding-bottom': padbottom, 'padding-left': childdef['padding']['left']*$.mobileweb.device['aspectWratio'], 'padding-right': childdef['padding']['right']*$.mobileweb.device['aspectWratio']});
				$('#'+childdef['id']+"_jpEra").css({'padding-top': padtop, 'padding-bottom': padbottom, 'padding-left': childdef['padding']['left']*$.mobileweb.device['aspectWratio'], 'padding-right': childdef['padding']['right']*$.mobileweb.device['aspectWratio']});
			}else if (childdef['verticalalignment'] =='bottom'){
				$('#'+childdef['id']).css({'vertical-align':'bottom'});
				var hei = $('#'+childdef['id']).css('height');
				var fontsize = $('#'+childdef['id']).css('font-size');
				var padbottom = childdef['padding']['bottom']*$.mobileweb.device['aspectHratio'];
				var padtop = parseInt(hei)-parseInt(fontsize)-padbottom;					
				
				$('#'+childdef['id']).css({'padding-top': padtop, 'padding-bottom': padbottom, 'padding-left': childdef['padding']['left']*$.mobileweb.device['aspectWratio'], 'padding-right': childdef['padding']['right']*$.mobileweb.device['aspectWratio']});
				$('#'+childdef['id']+"_jpEra").css({'padding-top': padtop, 'padding-bottom': padbottom, 'padding-left': childdef['padding']['left']*$.mobileweb.device['aspectWratio'], 'padding-right': childdef['padding']['right']*$.mobileweb.device['aspectWratio']});
			}else{
				$('#'+childdef['id']).css({'padding-top': '0px', 'padding-bottom': '0px'});
				$('#'+childdef['id']).css({'vertical-align':"-100%"});
				$('#'+childdef['id']+"_jpEra").css({'vertical-align':"-100%"});
			}
			if(childdef['font']['align'] == "center" && childdef['showIcon']){
				var _rightPadding = (childdef['frame']['height']*$.mobileweb.device['aspectHratio']) + childdef['padding']['right']*$.mobileweb.device['aspectWratio'];
				$('#'+childdef['id']).css({'padding-right': _rightPadding});
			}else if(childdef['font']['align'] == "right" && childdef['showIcon']){
				var _rightPadding = (childdef['frame']['height']*$.mobileweb.device['aspectHratio']) + childdef['padding']['right']*$.mobileweb.device['aspectWratio'];
				$('#'+childdef['id']).css({'padding-right': _rightPadding});
			}
			if(childdef['viewtype'] === "calendar"){
				var style = $('<style>input[id^='+childdef['id']+']::-webkit-input-placeholder{text-shadow:0px 1px 1px #FFFFFF;color:rgba('+childdef['font']['color']['red']+','+childdef['font']['color']['blue']+','+childdef['font']['color']['green']+',.5);}</style>');
				$('html > head').append(style);
			}
			
			if(childdef['showIcon']){
				var _icon  = $.utility('getSystemImage','calendar_icon.png',"");
				if($.mobileweb['state'] === 'preview')
					_icon = $.mobileweb['baseurl']+'/mobileweb/resources/images/system/calendar_icon.png';
				if(parseFloat(childdef['frame']['height']) <= 30)
					$('#'+childdef['id']).css({'background-image':'url("'+_icon+'")','background-repeat':'no-repeat','background-position-x':'right','background-position-y':'center'});
				else
					$('#'+childdef['id']).css({'background-image':'url("'+_icon+'")','background-repeat':'no-repeat','background-position-x':'98%','background-position-y':'center'});
				_backgroundHeight = childdef['frame']['height']*$.mobileweb.device['aspectHratio']+'px';
				if (childdef['cornerRadius'] != undefined)
					_backgroundHeight = parseFloat(_backgroundHeight) - (childdef['cornerRadius']*$.mobileweb.device['aspectratio'] / 2) + "px";
				var _backgroundWidth =  '40px';
				if(parseInt(_backgroundHeight) < 40)
					_backgroundWidth = _backgroundHeight;
				$('#'+childdef['id']).css({'background-size':_backgroundWidth+" "+_backgroundHeight});
				
				_inputWidth = _inputWidth - parseInt(_backgroundWidth);
				$('#'+childdef['id']+"_jpEra").css({'width':_inputWidth});
			}
			
			if(childdef['border']){
				_borderWeight = childdef['border']['borderweight'] * $.mobileweb.device['aspectHratio'];
				_inputHeight = _inputHeight - (2 * _borderWeight);
				$('#'+childdef['id']+"_jpEra").css({'height':_inputHeight});
				$('#'+childdef['id']+"_jpEra").css({'border-style':'solid', 'margin':'0px'});
				$('#'+childdef['id']+"_jpEra").css({'border-width': _borderWeight +"px"});
				$('#'+childdef['id']+"_jpEra").css({'border-color':'rgba('+childdef['border']['bordercolor']['red']+','+childdef['border']['bordercolor']['green']+','+childdef['border']['bordercolor']['blue']+','+childdef['border']['bordercolor']['alpha']+')'});
			}
			if (childdef['cornerRadius'] != undefined){
				$('#'+childdef['id']).css({'border-radius':childdef['cornerRadius']*$.mobileweb.device['aspectratio'] +"px"});
				$('#'+childdef['id']+"_jpEra").css({'border-radius':childdef['cornerRadius']*$.mobileweb.device['aspectratio'] +"px"});
			}
			
			_minRange = calendar.getRange(_minRange);
			_maxRange = calendar.getRange(_maxRange);
			if(childdef['type'] == "Japanese" && childdef['jpEra'] != undefined && childdef['jpEra'] != ""){
				calendar.setJPEra(childdef['jpEra']);
			}
			if(childdef['type']){
				//Adding Scripts
				var script1 = document.createElement('script');
				script1.type = 'text/javascript';
				if($.mobileweb['state'] == 'preview'){
					script1.src  = '/mobileweb/resources/js/datepicker-ja.js';
				}
				else{
					script1.src  = 'js/datepicker-ja.js';
				}
				var flag = false;
				var script = document.getElementsByTagName('script');
				$.each(script, function(key, value){
					if(value.src == script1.src){
						flag =true;
					}
				});
				
				if(!flag){
					$('head').append(script1);
				}
			}
			if(childdef['type'] == "Japanese")
				_language = "ja";
			else
				_language = "";
			
			$('#'+childdef['id']).datepicker({
				dateFormat: _dateFormat.toLowerCase().replace("yyyy","yy"),
				changeMonth: true,
			    changeYear: true,
			    minDate: _minRange,
			    maxDate: _maxRange,
			    yearRange: "" +_minRange.getFullYear()+ ":"+_maxRange.getFullYear()+"",
//			    onChangeMonthYear: function (year, month) {
//		            console.log(">>>>>", year, month);
//		        }
			    
			});
			$( "#"+ childdef['id']).datepicker( "option",$.datepicker.regional[_language] );
			$('#'+childdef['id']).datepicker( "option", "dateFormat", "yy-mm-dd" );

			if(!$.utility("isReverseTransition")){
				if(childdef['template']!==''){
					var initialCSVArray=$.utility('getCombinedCSV');
					if(initialCSVArray.length!=0){
						$.each(initialCSVArray, function(i, csvElement){
							if(csvElement.csvResultHeader === childdef['template'].replace("[","").replace("]","")){
								calendar.setValue(csvElement.value);
							}
							else
								calendar.setValue(childdef['template'].indexOf('[') != -1 && childdef['template'].indexOf(']') != -1 && childdef['value'] == childdef['template'] ? "" : childdef['value']);
						});
					}
					else{

						if(data != undefined){
							calendar.setValue($.utility('tokenizeString', $.utility('extractDataFromRecord', data, childdef['template']), pagedef));
						}else{
							calendar.setValue(childdef['template'].indexOf('[') != -1 && childdef['template'].indexOf(']') != -1 && childdef['value'] == childdef['template'] ? "" : childdef['value']);
						}
					}
				}else{
					if(childdef['isSystemVariable']){ 
						if(childdef['secure'] === undefined || childdef['secure'] === "false") 
							if($('#'+childdef['id']).get(0) != undefined)
								$('#'+childdef['id']).get(0).type='text';
						
						childdef['value']  = $.utility('tokenizeString',childdef['systemVariableValue'], pagedef)
						childdef['value'] = $.utility('convertSpecialCharacter', childdef['value']);
						if(childdef['displayFormat'] != undefined || childdef['displayFormat'] != ""){
							childdef['formatSpecifier'] = childdef['displayFormat'].toLowerCase().replace("mm","MM");
							childdef['value'] = $.validate('convertToCustomDateTime',childdef,childdef['value']);
							$('#'+childdef['id']).val(childdef['value']);
						}else{
							childdef['value'] = param;
							$('#'+childdef['id']).val(childdef['value']);
						}
						calendar.setValue($.utility('tokenizeString',childdef['value'], pagedef));
					}else{
						calendar.setValue($.utility('tokenizeString',childdef['value'], pagedef));
					}
				}
				if(childdef['globalValue'] != undefined){
					if(childdef['globalValue'] == "__NOW__"){
						var cd = new Date();
						$.mobileweb["__NOW__"] = $.utility('checkGlobalVariable',childdef['globalValue']);
						
						if($("body").find("#__NOW__").length == 0 ) {
							$('body').append("<input id='__NOW__' type='text' hidden='true'>"+ $.mobileweb["__NOW__"] +"</input>");
						}
						$('#__NOW__').on('onchange',function(){
							if(childdef['formatType'] != undefined && childdef['formatType'] != ""){
								childdef['value'] = $.validate('changeFormat',childdef,cd.toString());
								$("#"+childdef['id']).val($.validate('changeFormat',childdef,cd.toString()));
							}else{
								childdef['value'] = $.mobileweb["__NOW__"];
								$("#"+childdef['id']).val($.mobileweb["__NOW__"]);
							}
						});
						$("#__NOW__").trigger("onchange");
					}
				}
			}
			if($.utility("isReverseTransition"))
			    calendar.setValue(childdef['value']);
			if(childdef['type'] != "Japanese")
				$('#'+childdef['id']+"_jpEra").css({'display':'none'});
		};
		
		calendar.applyEvents = function(){
			$('#'+childdef['id']).on("click",function() {
				$('#ui-datepicker-div').css({'display':'block'});
				$('.ui-datepicker-title').css({'display':'flex'});
				$('.ui-datepicker-month').css({'font-size':'.8em'});
				$('.ui-datepicker-year').css({'font-size':'.8em'});

				$('.ui-datepicker-title > select').on("change",function() {
					$('.ui-datepicker-title').css({'display':'flex'});
					$('.ui-datepicker-month').css({'font-size':'.8em'});
					$('.ui-datepicker-year').css({'font-size':'.8em'});
				});
				$('.ui-datepicker-next').on("click",function() {
					$('.ui-datepicker-title').css({'display':'flex'});
					$('.ui-datepicker-month').css({'font-size':'.8em'});
					$('.ui-datepicker-year').css({'font-size':'.8em'});
				});
				$('.ui-datepicker-prev').on("click",function() {
					$('.ui-datepicker-title').css({'display':'flex'});
					$('.ui-datepicker-month').css({'font-size':'.8em'});
					$('.ui-datepicker-year').css({'font-size':'.8em'});
				});
				
				calendar.convertToJPEraDate();
				calendar.getJPEraYears();
			});
			$('.ui-datepicker-title > select').on("change",function() {
				$('.ui-datepicker-title').css({'display':'flex'});
				$('.ui-datepicker-month').css({'font-size':'.8em'});
				$('.ui-datepicker-year').css({'font-size':'.8em'});
				calendar.applyEvents();
			});
			$('.ui-datepicker-next').on("click",function() {
				$('.ui-datepicker-title').css({'display':'flex'});
				$('.ui-datepicker-month').css({'font-size':'.8em'});
				$('.ui-datepicker-year').css({'font-size':'.8em'});
				calendar.applyEvents();
			});
			$('.ui-datepicker-prev').on("click",function() {
				$('.ui-datepicker-title').css({'display':'flex'});
				$('.ui-datepicker-month').css({'font-size':'.8em'});
				$('.ui-datepicker-year').css({'font-size':'.8em'});
				calendar.applyEvents();
			});
			
			calendar.convertToJPEraDate();
			calendar.getJPEraYears();
				
			$('#'+childdef['id']+'_jpEra').off("click").on("click",function() {
				$('#'+childdef['id']).trigger("focus");
				calendar.applyEvents();
				$('.ui-datepicker-title > select').trigger("change");
			});
			$('#'+childdef['id']).on("focusout",function() {
				setTimeout(function(){
					if(  childdef['changed'] != undefined && childdef['changed']){
						if(childdef['tab'] == "tab" || childdef['tab'] == "shifttab"){
							childdef['changed'] = false;							
							var focusableEls = $('.scroller').get(0).querySelectorAll('a[href], input, img, button, textarea, input[type="text"],input[type="password"],input[type="password"], input[type="radio"], input[type="checkbox"], select');
							var focusableArr = [].slice.call(focusableEls);
							focusableArr.sort(function(obj1, obj2) {
								return ((obj1['tabIndex'] < obj2['tabIndex']) ? -1 : ((obj1['tabIndex'] > obj2['tabIndex']) ? 1 : 0));
							});  
							var _focusedElement = $('#'+childdef['id']).prop('tabindex');
							$.each(focusableArr,function(i,child){
								if(_focusedElement === child['tabIndex']){
									if(childdef['tab'] == "tab"){
										focusableArr[i + 1].focus();
										childdef['tab'] = ""
									}
									else{
										focusableArr[i - 1].focus();
										childdef['tab'] = ""
									}
								}
							});
						}
					}	
				},300)
			});
			
			$('#'+childdef['id']).on("focus",function() {
				childdef['tab'] = "";
				$(window).keyup(function (e) {
			        var code = (e.keyCode ? e.keyCode : e.which);
			        if (e.key === 'Tab' || e.keyCode == 9) {
			        	if ( e.shiftKey ){
			        		childdef['tab'] = "shifttab";
			        	}else{
			        		childdef['tab'] = "tab";
			        	}
			        }
			    });
				var timer =	setInterval(function(){
					clearInterval(timer);
					$('#ui-datepicker-div').css({'display':'block'});
				},300);
			});
			
			$('#'+childdef['id']).on("change",function() {
                    childdef['changed'] = true;
			});
			
			if(childdef['events'] != undefined){
				if(childdef['events']['OnChange']){
					$('#'+childdef['id']).on("change",function() {
						childdef['value'] = $('#'+childdef['id']).attr('value');
						calendar.setValue(childdef['value']);
						calendar.convertToJPEraDate();
						
						var test = [];
						$.extend(test, childdef['events']['OnChange']);
						var actionString = JSON.stringify(test).slice();
						new $.actions(pagedef, calendar, JSON.parse(actionString)).execute();
						
						var timer =	setInterval(function(){
								clearInterval(timer);
								//console.log("display >>>>>>>>", $('#ui-datepicker-div').css('display'));
								$('#ui-datepicker-div').css({'display':'none'});
						},300);
					});
				}
			}
			
		};
		
		calendar.setValue = function(param, setMV){
			if(childdef['type'] == "Japanese")
				$('#'+childdef['id']+'_jpEra').css({'display':'block'});
			else
				$('#'+childdef['id']+'_jpEra').css({'display':'none'});
			if(childdef['secure'] === undefined || childdef['secure'] === "false") 
				if($('#'+childdef['id']).get(0) != undefined)
					$('#'+childdef['id']).get(0).type='text';
			
			childdef['systemVariableValue'] = childdef['value'];
			childdef['isSystemVariable'] = false;
			
			param = $.utility('convertSpecialCharacter', param);
			
			if(childdef['displayFormat'] != undefined || childdef['displayFormat'] != ""){
				childdef['formatSpecifier'] = childdef['displayFormat'].toLowerCase().replace("mm","MM");
				var _value = $.validate('convertToCustomDateTime',childdef,param);
				//childdef['value'] = _value;
				$('#'+childdef['id']).val(_value);
				$('#'+childdef['id']+'_jpEra').val(_value);
			}else{
				childdef['value'] = param;
				$('#'+childdef['id']).val(childdef['value']);
				$('#'+childdef['id']+'_jpEra').val(childdef['value']);
			}
		};
		
		calendar.getValue = function(){
			return childdef['value'];
		};
		
		calendar.setVisibility = function(param){
			if(param === true){
				childdef['hidden'] = false;
				$('#'+calendar.getId()).css({'visibility':'visible'});
			}else{
				childdef['hidden'] = true;
				$('#'+calendar.getId()).css({'visibility' : 'hidden'});
			}
		};
		
		calendar.getRange = function(param){
			if(param != "invalid" && param != ""){
				if(new Date(param) == "Invalid Date"){
					var CurrentDate = new Date();
					if(!isNaN(parseInt(param)) && param.length > 4){
						var x = parseInt(param);
						if(param.indexOf("Months") != -1 || param.indexOf("months") != -1){
							if(param.indexOf("after") != -1)
								CurrentDate.setMonth(CurrentDate.getMonth() + x);
							else if(param.indexOf("before") != -1)
								CurrentDate.setMonth(CurrentDate.getMonth() - x);
						}else if(param.indexOf("Days") != -1 || param.indexOf("days") != -1){
							if(param.indexOf("after") != -1)
								CurrentDate.setDate(CurrentDate.getDate() + x);
							else if(param.indexOf("before") != -1)
								CurrentDate.setDate(CurrentDate.getDate() - x);
						}
//						console.log(CurrentDate);
					}else if(param.length == 4){
						CurrentDate.setFullYear(parseInt(param));
					}
				}else{
					CurrentDate = new Date(param);
				}
				
				return CurrentDate;
			}
		};
		
		calendar.setMinRange = function(param){
			childdef['minRange'] = param;
			_minRange = calendar.getRange(childdef['minRange']);
			$('#'+childdef['id']).datepicker( "option", "minDate", _minRange);
			$('#'+childdef['id']).datepicker( "option", "yearRange", "" +_minRange.getFullYear()+ ":"+_maxRange.getFullYear()+"");
		};
		
		calendar.setMaxRange = function(param){
			childdef['maxRange'] = param;
			_maxRange = calendar.getRange(childdef['maxRange']);
			$('#'+childdef['id']).datepicker( "option", "maxDate", _maxRange);
			$('#'+childdef['id']).datepicker( "option", "yearRange", "" +_minRange.getFullYear()+ ":"+_maxRange.getFullYear()+"");
		};
		
		calendar.setJPEra = function(param){
			childdef['jpEra'] = param;
			var jpEra = calendar.getJPEraData();
			$.each(jpEra,function(i,era){
				if(param == era['jp'] || param == era['en']){
					
					if(era['max'] == "")	era['max'] = (new Date());//.getFullYear()+50;
					calendar.setMinRange(era['min']);
					calendar.setMaxRange(era['max']);
				}
			});
		}
		calendar.getJPEraData = function(){
			var jpEra = [	{'jp':'明治', 'en':'Meiji',  'min':'1900-01-01', 'max':'1912-07-29','jpStart':33}, 	//	明治元年(33年)(西暦1900年) to 明治45年(西暦1912年)
							{'jp':'大正', 'en':'Taisho', 'min':'1912-07-30', 'max':'1926-12-24','jpStart':1}, 	//	大正元年(1年)(西暦1912年) to 大正15年(西暦1926年)
							{'jp':'昭和', 'en':'Showa',  'min':'1926-12-25', 'max':'1989-01-07','jpStart':1}, 	//	昭和元年(1年)(西暦1926年) to 昭和64年(西暦1989年)
							{'jp':'平成', 'en':'Heisei', 'min':'1989-01-08', 'max':'2019-04-30','jpStart':1},	//	平成元年(1年)(西暦1989年) to 平成31年(西暦2019年)
							{'jp':'令和', 'en':'Reiwa',  'min':'2019-05-01', 'max':'','jpStart':1}
						];
			
			return jpEra;
		};
		calendar.getJPEraYears = function(){
			//return;
			if(childdef['type'] == "Japanese"){
				if(childdef['jpEra'] != undefined && childdef['jpEra'] != "" && childdef['jpEra'] != "Custom"){
					//console.log("selectedValue ----------->", $('.ui-datepicker-year').val());
					var eraName = childdef['jpEra'];
					var jpEra = calendar.getJPEraData();
					var eraIndex;
					$.each(jpEra,function(i,era){
						if(eraName == era['jp'] || eraName == era['en']){
							eraIndex = i;
						}
					});
					//console.log(eraName, " ----------->", eraIndex);
					if(eraIndex.toString() && eraIndex > -1){
						var era = jpEra[eraIndex];
						if(era['max'] == "")	era['max'] = (new Date()).getFullYear();//+50;
						
						//calendar.setMinRange(era['min']);
						//calendar.setMaxRange(era['max'].toString());
						
						var el = $('select.ui-datepicker-year');
						if(el){
							var ops = $(el).children().get();
						    if ( ops.length > 0 ) {
						    	 $.each(ops, function(i,op){
						    		 var yearText = era['jp'] + (era['jpStart']+i) + '年';
						    		 $(op).html(yearText);
								 });
						    }
						}
					}
				}else{
					var el = $('select.ui-datepicker-year');
					if(el){
						var ops = $(el).children().get();
					    if ( ops.length > 0 ) {
					    	 $.each(ops, function(i,op){
					    		 var jpYear = op['value'];// + '年';
					    		 $(op).html(jpYear);
					    		 //$(op).val(jpYear);
							 });
					    }
					}
				}
			}
			return;
		};
		
		calendar.setCalendarType = function(param){
			$('#ui-datepicker-div').css({'display':'none'});
			childdef['type'] = param;
			if(param == "Japanese")
				_language = "ja";
			else
				_language = "";
			$( "#"+ childdef['id']).datepicker( "option",$.datepicker.regional[_language] );
			calendar.convertToJPEraDate(true);
		};
		
		calendar.convertToJPEraDate = function(param){
			if(childdef['type'] == "Japanese"){
				if(new Date(childdef['value']) < _minRange || new Date(childdef['value']) > _maxRange)
					childdef['value'] = _maxRange;
				
				var date = new Date();
				if(childdef['value'] != "")
					date = new Date(childdef['value']);
				
				const options = {era:'long', year: 'numeric', month: 'long', day: 'numeric' };
				var o = date.toLocaleDateString('ja-JP-u-ca-japanese', options);
				if(childdef['value'] == "")
					o = "";
				if(childdef['jpEra'] != undefined && childdef['jpEra'] != "" && childdef['jpEra'] != "Custom"){
					$('#'+childdef['id']+'_jpEra').css({'display':'block'});
					$('#'+childdef['id']+'_jpEra').val(o);
				}else if(childdef['jpEra'] == "Custom"){
					$('#'+childdef['id']+'_jpEra').css({'display':'block'});
					var _jpDate = o.replace(o.split("年")[0],childdef['value'].split("/")[0]);
//					console.log("_jpDate----------",_jpDate);
					$('#'+childdef['id']+'_jpEra').val(_jpDate);
				}
			}	
			else{
				$('#'+childdef['id']+'_jpEra').css({'display':'none'});
//				$('#'+childdef['id']+'_jpEra').val(childdef['value']);
			}
		}

		return calendar;
	};
	
	function uiDialog(pagedef, childdef, data){
		var dialog =  new BaseView(childdef);
		if(pagedef['data']['contents'][0] != undefined)
			dialog['children'] = new $.uichildren(pagedef, childdef['dataArray'][0]['children'],pagedef['data']['contents'][0]);
		else
			dialog['children'] = new $.uichildren(pagedef, childdef['dataArray'][0]['children']);
		
		//Header
		var headerString = "";
		if(childdef['showheader']){
			if(childdef['pageOverlayHeader']['showclose']){
				if(childdef['pageOverlayHeader']['closeIcon']['srcLocation'] == "bundle"){
					closeIconSrc =$.utility('getImage',$.utility('tokenizeString',childdef['pageOverlayHeader']['closeIcon']['src']));
				}else if(childdef['pageOverlayHeader']['closeIcon']['srcLocation'] == "remoteFile"){
					closeIconSrc =$.utility('getRemoteImage',$.utility('tokenizeString',childdef['pageOverlayHeader']['closeIcon']['src']));
				}else if(childdef['pageOverlayHeader']['closeIcon']['srcLocation'] == "url"){
					closeIconSrc = $.utility('tokenizeString',childdef['pageOverlayHeader']['closeIcon']['src']).toString();
					if(closeIconSrc.match(/\/\/(?![\s\S]*\/\/)/) != null && closeIconSrc.match(/\/\/(?![\s\S]*\/\/)/).length > 1){
						closeIconSrc = closeIconSrc.replace(/\/\/(?![\s\S]*\/\/)/, "/");
					}
				}
				if(closeIconSrc == ""){
					closeIconSrc  = $.utility('getSystemImage','close-button_dialog.png',"");
					if($.mobileweb['state'] === 'preview')
						closeIconSrc = $.mobileweb['baseurl']+"/mobileweb/resources/images/system/toolbar-items/default/close-button_dialog.png"
				}
					
				headerString = [		
									'<div id=',childdef['id'],'_heading style="float:left;margin-left: 10px;margin-top: 5px;margin-bottom: 5px;">',childdef['pageOverlayHeader']['heading'],'</div>',								        
									'<div  style="width:20px;float:right;margin-right: 10px;margin-top: 5px;margin-bottom: 5px;text-align: right;">',
								    	'<img id=',childdef['id'],'_close src = "'+closeIconSrc+'" width="20px" height:"40px" style = "display:block;">',
								    '</div>',
							   ].join('');
			}else{
				headerString = [		
									'<div>',childdef['pageOverlayHeader']['heading'],'</div>',								       
							   ].join('');
			}
				
		}
		
		//Footer
		var footerbuttonsvalue = "";
		var footerbuttonString = "";
		if(childdef['showfooter']){
			footerbuttonsvalue = childdef['pageOverlayFooter']['actionButtons'];
			var _btnWidth = childdef['pageOverlayFooter']['actionbuttonwidth'] * $.mobileweb.device['aspectWratio'] + "px";
			var _btnHeight = childdef['pageOverlayFooter']['actionbuttonheight'] * $.mobileweb.device['aspectHratio'] + "px";
			var _btnBottom = ((parseFloat(childdef['pageOverlayFooter']['footerheight'])* $.mobileweb.device['aspectHratio'] - parseFloat(_btnHeight)) / 2) + "px";
			var _background = 'rgba('+ childdef['pageOverlayFooter']['actionButtonsTintColor']['red']+','+childdef['pageOverlayFooter']['actionButtonsTintColor']['green']+','+childdef['pageOverlayFooter']['actionButtonsTintColor']['blue']+','+childdef['pageOverlayFooter']['actionButtonsTintColor']['alpha']+')';
			var _textColor = 'rgba('+ childdef['pageOverlayFooter']['actionButtonsColor']['red']+','+childdef['pageOverlayFooter']['actionButtonsColor']['green']+','+childdef['pageOverlayFooter']['actionButtonsColor']['blue']+','+childdef['pageOverlayFooter']['actionButtonsColor']['alpha']+')';
			
			$.each(footerbuttonsvalue, function(i){
				footerbuttonString = footerbuttonString+"<a id='"+childdef['id']+"_"+footerbuttonsvalue[i]['id']+"'style=\"margin-left:2.5%;z-index:2001;margin-right:2.5%;border-radius:4px;font-family:system;position:absolute;margin-top:0px;margin-bottom:0px;color:"+_textColor+";background:"+_background+";bottom:"+_btnBottom+";width:"+_btnWidth+";height:"+_btnHeight+";\" data-role='button' rel='close' >"+footerbuttonsvalue[i]['title']+"</a>";
			}); 
		}
		
		dialog.getHTML = function(){
			return ['<div id=',childdef['id'],' name=',childdef['name'],' class="dialog">',
						'<div id=',childdef['id'],'_pageOverlayHeader>',	headerString,'</div>',	
						'<div id="dialog_',childdef['id'],'">',
								'<div id="pageOverlayContent">',
									dialog['children'].getHTML(),
								'</div>',
						'</div>',
						'<div id=',childdef['id'],'_pageOverlayFooter>',footerbuttonString,'</div>',
					'</div>'].join('');
		};
		
		dialog.applyOverrides = function(){
			$('#'+childdef['id']).css({'visibility':'hidden'});
			$('#'+childdef['id']).css({'display':'none'});
			
			$.each(dialog['children'], function(i, child){
				if(childdef['showheader']){
					if(pagedef['reloaded'] == undefined || !pagedef['reloaded'])
					    child.frame.getFrame().y = parseFloat(child.frame.getFrame().y) +  30;
				}
				child.applyOverrides();
				$('#'+child.getId()).css({'visibility':'hidden'});
				if(child.getViewType() === "TextButton")
					$('#'+child.getId() + '_label').css({'visibility':'hidden'});
			});
			
			if(childdef['backgroundColor']){
				$('#'+childdef['id']).css({'background-color':$.attributes('color', childdef['backgroundColor']).getColorCode()});
			}
			
			if(childdef['cornerRadius']){
				$('#'+childdef['id']).css({'border-radius':childdef['cornerRadius']* $.mobileweb.device['aspectHratio'] + "px"});
			}
			
			if(childdef['borderColor']){
				$('#'+childdef['id']).css({'border-style':'solid'});
				$('#'+childdef['id']).css({'border-width': childdef['borderWidth'] +"px"});
				$('#'+childdef['id']).css({'border-color':'rgba('+childdef['borderColor']['red']+','+childdef['borderColor']['green']+','+childdef['borderColor']['blue']+','+childdef['borderColor']['alpha']+')'});
			}
			
			//Content Area
			var _contentWidth;
			if(pagedef['isSidebarFixed'] && pagedef['type'] !== "ScrollView")
				_contentWidth = (parseFloat(pagedef['width']) - (parseFloat(pagedef['toolbarleft']['frame']['width']) + parseFloat(childdef['padding']['left']) + parseFloat(childdef['padding']['right']))) * $.mobileweb.device['aspectWratio'];
			else
				_contentWidth = (parseFloat(pagedef['width']) - (parseFloat(childdef['padding']['left']) + parseFloat(childdef['padding']['right']))) * $.mobileweb.device['aspectWratio'];
			$('#pageOverlayContent').css({'height':childdef['dataArray'][0]['contentHeight'] * $.mobileweb.device['aspectHratio'] + "px",'width':_contentWidth});
			$('#pageOverlayContent').css({'top':'inherit'});
			$('#dialog_'+childdef['id']).css({'height':childdef['dataArray'][0]['contentHeight'] * $.mobileweb.device['aspectHratio'] + "px",'width':_contentWidth});
			$('.ui-btn-text').css({'font-family':"Arial, Helvetica, sans-serif"});
			
			//Header
			if(childdef['showheader']){ //Bug #13345 fix
				$("#"+childdef['id']+"_pageOverlayHeader").css({'height': childdef['pageOverlayHeader']['headerheight'] * $.mobileweb.device['aspectHratio'] + "px",'z-index':'2001','width':_contentWidth});
				$("#"+childdef['id']+"_heading").css({'font-size':childdef['pageOverlayHeader']['headerfont']['size']* $.mobileweb.device['aspectratio'] + "px",'font-family':childdef['pageOverlayHeader']['headerfont']['fontName'] ,'font-weight':'bold'});
				$("#"+childdef['id']+"_heading").css({'color':'rgba('+childdef['pageOverlayHeader']['headerfont']['color']['red']+','+childdef['pageOverlayHeader']['headerfont']['color']['green']+','+childdef['pageOverlayHeader']['headerfont']['color']['blue']+','+childdef['pageOverlayHeader']['headerfont']['color']['alpha']+')'});
			}
			
			//Footer
			if(childdef['showfooter']){
				$('.ui-btn-text').css({'font-size':12 * $.mobileweb.device['aspectratio'] + 'px','font-weight':'100','font-family':"Arial, Helvetica, sans-serif"});
				$('.ui-btn-inner').css({'padding':'5px'});
				$("#"+childdef['id']+"_pageOverlayFooter").css({'height':childdef['pageOverlayFooter']['footerheight'] * $.mobileweb.device['aspectHratio'] + "px",'width':_contentWidth});
				$("#"+childdef['id']+"_pageOverlayFooter").css({'top':childdef['dataArray'][0]['contentHeight'] * $.mobileweb.device['aspectHratio'] + "px"});	
			}
			
			$('#'+childdef['id']).css({'padding':'0px','width':_contentWidth});
		};
		
		dialog.applyEvents = function(){
			
			$('#'+childdef['id']+'_close').on("tap", function(){
				$('#'+childdef['id']).css({'visibility':'hidden'});
				setTimeout(function(){
					$('#'+childdef['id']).css({'display':'none'});
					$('#ui-datepicker-div').css({'display':'none'});
				},500);
				
				$.each(dialog['children'], function(i, child){
					$('#'+child.getId()).css({'visibility':'hidden'});
					if(child.getViewType() === "TextButton")
						$('#'+child.getId() + '_label').css({'visibility':'hidden'});
					if(child.getViewType() === "TileList"){
						$('#'+child.getId()).children().css({'visibility':'hidden'});
						$('#'+child.getId()).children().css({'display' : 'none'});
						$('#'+child.getId()).css({'visibility' : 'hidden'});
						$('#'+child.getId()).css({'display' : 'none'});
					}
				});
				$.unblockUI();
			});
			
			$.each(footerbuttonsvalue, function(i){
				$('#'+childdef['id']+"_"+footerbuttonsvalue[i]['id']).click(function(){ 
					$('#'+childdef['id']).css({'visibility':'hidden'});
					$.unblockUI();
					$.each(dialog['children'], function(i, child){
						$('#'+child.getId()).css({'visibility':'hidden'});
						if(child.getViewType() === "TextButton")
							$('#'+child.getId() + '_label').css({'visibility':'hidden'});
					});
					if(footerbuttonsvalue[i]['events']['Tap'] != undefined)
						new $.actions(pagedef, dialog, footerbuttonsvalue[i]['events']['Tap']).execute(); 
				});
				return true;
			});   
			
			$.each(dialog['children'], function(i, child){
				child.applyEvents();
			});
		};
		
		return dialog;
	};

	
	$.uichildren = function(pagedef, children, data, callback){
		var uichildren = [];
		$.each(children,function(i,child){
			switch(child['viewtype']){
				case 'Label':
					uichildren.push(new uiLabel(pagedef, child, data));
					break;
				
				case 'LinkLabel':
					uichildren.push(new uiLinkLabel(pagedef, child, data));
					break;

				case 'Image':
					if(child['source'] == "QRview"){
						var script1 = document.createElement('script');
						var script2 = document.createElement('script');
						script1.type = 'text/javascript';
						script2.type = 'text/javascript';
						if($.mobileweb['state'] == 'preview'){
							script1.src  = '/mobileweb/resources/js/qrlib/qrgen.js';
							script2.src  = '/mobileweb/resources/js/qrlib/jquery.qrgen.js';
						}
						else{
							script1.src  = 'js/qrlib/qrgen.js';
							script2.src  = 'js/qrlib/jquery.qrgen.js';
						}
						var flag = false;
						var script = document.getElementsByTagName('script');
						$.each(script, function(key, value){
							if(value.src == script1.src || value.src == script2.src){
								flag =true;
							}
						});
						
						if(!flag){
							$('head').append(script1);
							$('head').append(script2);
							script1.onload = uichildren.push(new uiImage(pagedef, child, data));
						}//
					}else if(child['source'] == "reCaptcha") {
						var script = document.createElement('script');
						script.src = 'https://www.google.com/recaptcha/api.js';
						$('head').append(script);
						script.onload = setTimeout(function(){uichildren.push(new uiCaptcha(pagedef, child, data));},50);
						
					}else
						uichildren.push(new uiImage(pagedef, child, data));
					break;
					
				case 'TextField':
					uichildren.push(new uiTextField(pagedef, child, data));
					break;
					
				case 'NumericField':
					uichildren.push(new uiNumericField(pagedef, child, data));
					break;
					
				case 'TextArea':
					uichildren.push(new uiTextView(pagedef, child, data));
					break;
					
				case 'WebView':
					uichildren.push(new uiWebView(pagedef, child, data));
					break;
					
				case 'SearchBar':
					uichildren.push(new uiSearchBar(pagedef, child, data));
					break;
					
				case 'RoundButton':
					uichildren.push(new uiRoundButton(pagedef, child, data));
					break;
					
				case 'TextButton':
					uichildren.push(new uiTextButton(pagedef, child, data));
					break;
					
				case 'ImageButton':
					uichildren.push(new uiImageButton(pagedef, child, data));
					break;
					
				case 'ToggleButton':
					uichildren.push(new uiToggleButton(pagedef, child, data));
					break;
					
				case 'CheckBox':
					uichildren.push(new uiCheckBox(pagedef, child, data));
					break;
					
				/*case 'RadioButtonGroup':
					uichildren.push(new uiRadioButtonGroup(pagedef,child,data));
					break;*/
				case 'Radio':
					uichildren.push(new uiRadioButton(pagedef,child,data));
					break;
					
				case 'Segment':
					uichildren.push(new uiSegment(pagedef,child, data));
					break;
					
				case 'SwitchBar':
					uichildren.push(new uiSwitchBar(pagedef, child, data));
					break;
					
				case 'SystemButton':
					uichildren.push(new uiSystemButton(pagedef, child, data));
					break;
					
				case 'Camera':
					uichildren.push(new uiCamera(pagedef, child, data));
					break;
					
				case 'SoundBox':
					uichildren.push(new uiSoundBox(pagedef, child, data));
					break;
					
				case 'VideoBox':
					uichildren.push(new uiVideoBox(pagedef, child, data));
					break;	
					
				case 'GoogleMap':
					/*var localScriptf = document.createElement('script');
					localScript.type = 'text/javascript';
					if($.mobileweb['state'] == 'preview')
						localScript.src = '/mobileweb/resources/js/mobileweb-gmap.js';
					else localScript.src = 'js/mobileweb-gmap.js';
					$('head').append(localScript);
					localScript.onload = */ uichildren.push(new uiGoogleMap(pagedef, child, data));
					break;
					
				/*case 'QRCode':
					uichildren.push(new uiQRCode(pagedef, child, data));
					break;*/
					
				case 'Picker':
					uichildren.push(new uiPicker(pagedef, child, data));
					break;
					
				case 'DatePicker':
					var script = document.createElement('script');
					script.type = 'text/javascript';
					if($.mobileweb['state'] == 'preview')
						script.src  = '/mobileweb/resources/js/datepicker.js';
					else script.src  = 'js/datepicker.js';
					$('head').append(script);
					script.onload =	uichildren.push(new uiDatePicker(pagedef, child, data));
					break;
					
				case 'Slider':
					uichildren.push(new uiSlider(pagedef, child, data));
					break;
				
				case 'ComboBox':
					if(child['editable'] != undefined && child['editable'])
						uichildren.push(new uiComboBoxEditable(pagedef, child, data));
					else
						uichildren.push(new uiComboBox(pagedef, child, data));
					break;
					
				/*case 'ListBox':
					uichildren.push(new uiListBox(pagedef, child, data));
					break;*/
					
				case 'TileList':
					uichildren.push(new uiTileList(pagedef, child, data));
					break;
					
				case 'ProgressBar':
					uichildren.push(new uiProgressBar(pagedef, child, data));
					break;
					
				case 'Indicator':
					uichildren.push(new uiIndicator(pagedef, child, data));
					break;
					
				case 'Gadget':
					uichildren.push(new uiGadget(pagedef, child, data));
					break;
					
				case 'Chart':
					/*var script = document.createElement('script');
					script.type = 'text/javascript';
					script.src = 'https://www.gstatic.com/charts/loader.js';
					$('head').append(script);
					script.onload =*/ uichildren.push(new uiChartView(pagedef, child, data));
					break;
				case 'Calendar':
					uichildren.push(new uiCalendar(pagedef, child, data));
					break;
				case 'Dialog':
					uichildren.push(new uiDialog(pagedef, child, data));
					break;
				case 'RemoteTableViewList':
				case 'RemoteTableView':
				case 'DBTableView':
				case 'DBTableViewList': 
				case 'TableViewList':
				case 'TableViewListTab':
				case 'TableView':
					if(pagedef['children'].length > 0 && pagedef['children'][0]['style'] == "simplegrid"){
						var localScript = document.createElement('script');
						localScript.type = 'text/javascript';
						if($.mobileweb['state'] == 'preview')
							localScript.src = '/mobileweb/resources/js/mobileweb-ui-grid.js';
						else localScript.src = 'js/mobileweb-ui-grid.js';
						$('head').append(localScript);
						localScript.onload =  uichildren.push(new $.uiGrid(pagedef, child));
						
					}else if(pagedef['children'].length > 0 && pagedef['children'][0]['style'] == "tabulargrid"){
						var localScript = document.createElement('script');
						localScript.type = 'text/javascript';
						if($.mobileweb['state'] == 'preview')
							localScript.src = '/mobileweb/resources/js/mobileweb-ui-tabular-grid.js';
						else localScript.src = 'js/mobileweb-ui-tabular-grid.js';
						$('head').append(localScript);
						localScript.onload =  uichildren.push(new $.uiTabularGrid(pagedef, child));
						
					}else{
						if(pagedef['sidebarTableview']){
							var script1 = document.createElement('script');
							script1.type = 'text/javascript';
							if($.mobileweb['state'] == 'preview')   
								script1.src  = '/mobileweb/resources/js/mobileweb-sidebar-table.js';
							else script1.src  = 'js/mobileweb-sidebar-table.js';
							var flag = false;
							var script = document.getElementsByTagName('script');
							$.each(script, function(key, value){
								if(value.src == script1.src){
									flag =true;
								}
							});
							if(!flag)
								$('head').append(script1);
							script1.onload = uichildren.push(new $.sidebartable(pagedef, child));
						}
						else if(pagedef['children'][0]['accordion'] && (pagedef['data']['groupby'] != undefined && pagedef['data']['groupby'] != "")){
							if(pagedef['data']['contents'].length != 0){//Bug #12585 fix 
								var script1 = document.createElement('script');
								script1.type = 'text/javascript';
								if($.mobileweb['state'] == 'preview')   
									script1.src  = '/mobileweb/resources/js/mobileweb-accordion-table.js';
								else script1.src  = 'js/mobileweb-accordion-table.js';
								var flag = false;
								var script = document.getElementsByTagName('script');
								$.each(script, function(key, value){
									if(value.src == script1.src){
										flag =true;
									}
								});
								if(!flag)
									$('head').append(script1);
								script1.onload = uichildren.push(new $.accordiontable(pagedef, child));
							}
						}
						else
							uichildren.push(new $.uitable(pagedef, child));
					}
					break;
				
				default:
					if($.utility('isBootingForFirstTime')){
						setTimeout(function(){
							$.errorhandler('alertBox',"ÃƒÂ£Ã¯Â¿Â½Ã¢â‚¬Å“ÃƒÂ£Ã¯Â¿Â½Ã‚Â®ÃƒÂ¨Ã‚Â¡Ã‚Â¨ÃƒÂ§Ã‚Â¤Ã‚ÂºÃƒÂ©Ã†â€™Ã‚Â¨ÃƒÂ¥Ã¢â‚¬Å“Ã¯Â¿Â½ : "+child['viewtype']+" ÃƒÂ£Ã¯Â¿Â½Ã‚Â¯ÃƒÂ£Ã¢â€šÂ¬Ã¯Â¿Â½ÃƒÂ§Ã¯Â¿Â½Ã‚Â¾ÃƒÂ¥Ã…â€œÃ‚Â¨ÃƒÂ£Ã¯Â¿Â½Ã‚Â®AppExe ÃƒÂ£Ã¯Â¿Â½Ã‚Â® MobileWeb ÃƒÂ£Ã¢â‚¬Å¡Ã‚Â¢ÃƒÂ£Ã†â€™Ã¢â‚¬â€�ÃƒÂ£Ã†â€™Ã‚ÂªÃƒÂ£Ã¯Â¿Â½Ã‚Â§ÃƒÂ£Ã¯Â¿Â½Ã‚Â¯ÃƒÂ£Ã¢â‚¬Å¡Ã‚ÂµÃƒÂ£Ã†â€™Ã¯Â¿Â½ÃƒÂ£Ã†â€™Ã‚Â¼ÃƒÂ£Ã†â€™Ã‹â€ ÃƒÂ£Ã¯Â¿Â½Ã¢â‚¬â€�ÃƒÂ£Ã¯Â¿Â½Ã‚Â¦ÃƒÂ£Ã¯Â¿Â½Ã¢â‚¬Å¾ÃƒÂ£Ã¯Â¿Â½Ã‚Â¾ÃƒÂ£Ã¯Â¿Â½Ã¢â‚¬ÂºÃƒÂ£Ã¢â‚¬Å¡Ã¢â‚¬Å“ÃƒÂ£Ã¢â€šÂ¬Ã¢â‚¬Å¡", "This UI parts : "+child['viewtype']+" is not supported on current MobileWeb app in AppExe.");
						},4000);
						$.utility('setBootingForFirstTime', false);
					}
			}
		});
		
		uichildren.getHTML = function(){
			var childhtml = [];
			$.each(this,function(i,child){
				childhtml.push(this.getHTML());
			});
			return childhtml.join('');
		};
		
		uichildren.applyOverrides = function(){
			$.each(this,function(i,child){
				child.applyOverrides();
			});
		};
		
		uichildren.applyEvents = function(){
			$.each(this,function(i,child){
				child.applyEvents();
			});
		};
		
		if(callback != undefined){
			callback(uichildren);
		}

		$.utility('initChildren', true);
				
		return uichildren;
	};
})(jQuery);
