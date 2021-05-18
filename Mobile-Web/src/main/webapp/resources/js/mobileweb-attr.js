/*
 * jQuery Plugin that handles the css of ui components
 */
(function($){
	
	function Frame(baseviewdef){
		
		var frame = {};
		var framedef = baseviewdef['frame'];
		
		frame.getFrame = function(){
			return framedef;
		};
		
		frame.setFrame = function(param){
			framedef = param;
			this.applyCSS();
		};
		
		frame.applyCSS = function(){
			var aspect = $.mobileweb.device['aspectratio'];
			//Added  by Richa
			if($.utility('getSessionData',"moveObject",baseviewdef['id'])!=null)
			{
				var move = $.utility('getSessionData',"moveObject",baseviewdef['id']);
				moveObj = $.parseJSON(move);		
				if($.mobileweb.getCurrentPage().getName()==moveObj["page_name"] && baseviewdef['id']==moveObj["u_id"])
				{
					framedef['x']=(parseInt(moveObj["framedata"]["left"].replace("px","")))/aspect;
					framedef['y']=(parseInt(moveObj["framedata"]["top"].replace("px","")))/aspect;
				}
			}
			//--
			//Added  by Richa
			if($.utility('getSessionData',"rotateObject",baseviewdef['id'])!=null)
			{
				var rotate = $.utility('getSessionData',"rotateObject",baseviewdef['id']);
				rotateObj = $.parseJSON(rotate);		
				if($.mobileweb.getCurrentPage().getName()==rotateObj["page_name"] && baseviewdef['id']==rotateObj["u_id"]){				
					framedef['rotation'] = rotateObj["rotation"];			
				}
			}
			//--					
								
			if((baseviewdef['viewtype'] === "Image") && (framedef['height'] == 475)){
				framedef['height'] = 480;
			}
			//Richa---To Hide scrollbar
			if($.mobileweb.device['type'] !== 'Desktop' && baseviewdef['viewtype'] === "TextArea"){
				var style = $('<style>::-webkit-scrollbar{ display:none; }</style>');
				$('html > head').append(style);
			}
			//--
			//$('#'+baseviewdef['id']).css({position:'absolute',left:framedef['x']*aspect,top:framedef['y']*aspect,width:framedef['width']*aspect,height:framedef['height']*aspect});
			$('#'+baseviewdef['id']).css({position:'absolute',left:framedef['x']*$.mobileweb.device['aspectWratio'],width:framedef['width']*$.mobileweb.device['aspectWratio']});
			$('#'+baseviewdef['id']).css({position:'absolute',top:framedef['y']*$.mobileweb.device['aspectHratio'],height:framedef['height']*$.mobileweb.device['aspectHratio']});
			if(baseviewdef['viewtype'] === "Image" && baseviewdef['scalemode'] == "ScaleToFill"){
				$('#'+baseviewdef['id']+'_divImg').css({//Bug #12407 fix
					'filter':'progid:DXImageTransform.Microsoft.BasicImage(rotation='+framedef['rotation']+')',
						'-ms-transform':'rotate('+(parseInt(framedef['rotation']))+'deg)',
						'-ms-filter':'progid:DXImageTransform.Microsoft.BasicImage(rotation='+framedef['rotation']+')',
						'-moz-transform':'rotate('+(+parseInt(framedef['rotation']))+'deg)',
						'-o-transform':'rotate('+framedef['rotation'] +'deg)',
						'transform': 'rotate('+(parseInt(framedef['rotation']))+'deg)',
						'-webkit-transform':'rotate('+(parseInt(framedef['rotation']))+'deg)',
					});	
			}else{
				$('#'+baseviewdef['id']).css({
					'filter':'progid:DXImageTransform.Microsoft.BasicImage(rotation='+framedef['rotation']+')',
						'-ms-transform':'rotate('+(parseInt(framedef['rotation']))+'deg)',
						'-ms-filter':'progid:DXImageTransform.Microsoft.BasicImage(rotation='+framedef['rotation']+')',
						'-moz-transform':'rotate('+(+parseInt(framedef['rotation']))+'deg)',
						'-o-transform':'rotate('+framedef['rotation'] +'deg)',
						'transform': 'rotate('+(parseInt(framedef['rotation']))+'deg)',
						'-webkit-transform':'rotate('+(parseInt(framedef['rotation']))+'deg)',
					});	
			}
		};
		return frame;
	};
	
	function Font(baseviewdef){
		var font = {};
		var fontdef = baseviewdef['font'];

		font.setFontFace = function(param){
			if(fontdef){
				if(fontdef['fontName'] != "" && fontdef['fontName'] != "system")
					param = fontdef['fontName'];
			}
			if(param == "Helvetica Neue"){//Bug #13149 fix
				param = "Arial, Helvetica, sans-serif";
			}
			if(baseviewdef['type'] == "button"){
				$('#'+baseviewdef['id']+' .ui-btn-text').css({'font-family':param,'font-weight':'normal'});
			}
			else if(baseviewdef['type'] == "image"){
				$('label[for='+baseviewdef['id']+']').css({'font-family':param});
			}
			else{
				$('#'+baseviewdef['id']).css({'font-family':param});
			}
		};

		font.setSize = function(param){
			if(fontdef) 	fontdef['size'] = param;
			if(baseviewdef['type'] == "button"){
				$('#'+baseviewdef['id']+' .ui-btn-text').css({'font-size':parseInt(param * $.mobileweb.device['aspectWratio'])});//In ref of bug #12326
			}
			else if(baseviewdef['type'] == "image"){
				$('label[for='+baseviewdef['id']+']').css({'font-size':param  * $.mobileweb.device['aspectratio']});
			}
			else {
				$('#'+baseviewdef['id']).css({'font-size':param  * $.mobileweb.device['aspectratio']});//In ref of bug #12326
			}

		};
		font.setWeight = function(param){
			if(fontdef) 	fontdef['weight'] = baseviewdef['font']['weight'];
			if(baseviewdef['viewtype'] == "Radio"){
				$('label[for='+baseviewdef['id']+']').css({'font-weight':param});
			}
			else if(baseviewdef['type'] == "button"){
				$('#'+baseviewdef['id']+' .ui-btn-text').css({'font-weight':param});
			}
			else if(baseviewdef['type'] == "image"){
				$('label[for='+baseviewdef['id']+']').css({'font-weight':param});
			}
			else {
				$('#'+baseviewdef['id']).css({'font-weight':param});
			}

		};
		font.setStyle = function(param){
			if(fontdef) 	fontdef['style'] = baseviewdef['font']['style'];
			if(baseviewdef['viewtype'] == "Radio"){
				$('label[for='+baseviewdef['id']+']').css({'font-style':param});
			}
			else if(baseviewdef['type'] == "button"){
				$('#'+baseviewdef['id']+' .ui-btn-text').css({'font-style':param});
			}
			else if(baseviewdef['type'] == "image"){
				$('label[for='+baseviewdef['id']+']').css({'font-style':param});
			}
			else {
				$('#'+baseviewdef['id']).css({'font-style':param});
			}

		};

		font.setAlign = function(param){
			if(fontdef) 	fontdef['align'] = param;
			if(baseviewdef['type'] == "button"){
				$('#'+baseviewdef['id']+'>div').css({'text-align':param});
			}
			else if(baseviewdef['type'] == "image"){
				$('label[for='+baseviewdef['id']+']').css({'text-align':param});
			}
			else {
				$('#'+baseviewdef['id']).css({'text-align':param});
			}
		};

		font.setColor = function(param){
			if(fontdef) 	fontdef['color'] = param;
			font['color'] = $.attributes('color',param);
			if(baseviewdef['type'] == "text"){
				//$('#'+baseviewdef['id']+' .ui-btn-text').css({'color':font['color'].getColorCode()});
				// kanio's change - the problem with text field and numeric fields was that the previous
				// line was implementing behavior similar to button's one
				// we return  here to default case 
				$('#'+baseviewdef['id']).css({'color':font['color'].getColorCode()});
			}
			else if(baseviewdef['type'] == "image"){
				$('label[for='+baseviewdef['id']+']').css({'color':font['color'].getColorCode()});
			}
			else if(baseviewdef['type'] == "button"){
				$('#'+baseviewdef['id']+' .ui-btn-text').css({'color':font['color'].getColorCode()});
			}
			else{
				$('#'+baseviewdef['id']).css({'color':font['color'].getColorCode()});
			}
		};

		font.applyCSS = function(){
			//Added  by Richa
			if($.utility('getSessionData',"colorObject",baseviewdef['id'])!=null)
			{
				var color = $.utility('getSessionData',"colorObject",baseviewdef['id']);
				colorObj = $.parseJSON(color);		
				if($.mobileweb.getCurrentPage().getName()==colorObj["page_name"] && baseviewdef['id']==colorObj["u_id"])
				{
					if(fontdef) 	fontdef['color'] = 	colorObj['color'];			
				}
			}
			//--
			$('#'+baseviewdef['id']).css({wordwrap:'normal','text-shadow':'1px 1px 1px #FFFFFF'});
			this.setFontFace('"source_sans_proregular","Arial","Sans Serif"');
			if(fontdef){
				this.setSize(fontdef['size']);
				this.setAlign(fontdef['align']);
				this.setColor(fontdef['color']);
				this.setWeight(fontdef['weight']?"bold":"normal");
				this.setStyle(fontdef['style']?"italic":"");
			}
			
			
		};

		return font;
	};
	
	function Background(baseviewdef){
		var background = {};
		//var backgrounddef = baseviewdef['background'];
		
		background.setColor = function(){
			background['background'] = $.attributes('color',baseviewdef['background']);
			if(baseviewdef['type'] == "search"){
				$('#'+baseviewdef['id']+' .ui-input-search').css({'background':background['background'].getColorCode()});
		    }
			else if(baseviewdef['viewtype'] == "Slider"){
				$('#'+baseviewdef['id']).css({'background':background['background'].getColorCode()});
			}
			else{
			$('#'+baseviewdef['id']).css({'background':background['background'].getColorCode()});
			}
		};
		return background;
	 };
	
	
	function Color(colordef){
		var color = {};
		if(typeof colordef == "string"){
			colordef = colorCodeToRGB(colordef);	//Richa---Bug #8913 Fix
		}
		color.getColorCode = function(){
			if(colordef['name'])
				return colordef['name'];
			else
				return ['rgba(',colordef['red'],',',colordef['green'],',',colordef['blue'],',',colordef['alpha'],')'].join('');
		};
		
		return color;
	};
	
	//Richa
	function colorCodeToRGB(colordef){
			var colordefDecimal = parseInt(colordef)
			if (colordefDecimal < 0)
			    {
				colordefDecimal = 0xFFFFFFFF + colordefDecimal + 1;
			    }
			var hexColor = colordefDecimal.toString(16).toUpperCase();
			var r = parseInt(hexColor.slice(1, 3), 16),
		        g = parseInt(hexColor.slice(3, 5), 16),
		        b = parseInt(hexColor.slice(5, 7), 16);
			var colordef = {};
			colordef = {red:r,green:g,blue:b,alpha:1};
			return colordef;
	}
	
	function Border(baseviewdef){
		var border = {};
		var borderdef = baseviewdef['border'];
		border.applyCSS = function(){
				if(baseviewdef['border']){
				$('#'+baseviewdef['id']).css({'border-style':'solid','border-width':baseviewdef['border']['borderweight']*$.mobileweb.device['aspectratio']+'px'});
					//if(baseviewdef['border']['bordercolor']){
					var border_color= $.attributes('color',baseviewdef['border']['bordercolor']);
					$('#'+baseviewdef['id']).css({'border-color':border_color.getColorCode()});
				}
		};
		
		return border;
	 };
	
	 
	function Padding(baseviewdef){
		var padding = {};
		var paddingdef = baseviewdef['padding'];
		padding.applyCSS = function(){
			if(baseviewdef['padding']){
				//$('#'+baseviewdef['id']).css({'padding-top':baseviewdef['padding']['top']* $.mobileweb.device['aspectratio'],'padding-bottom':baseviewdef['padding']['bottom']* $.mobileweb.device['aspectratio'],'padding-left':baseviewdef['padding']['left']* $.mobileweb.device['aspectratio'],'padding-right':baseviewdef['padding']['right']* $.mobileweb.device['aspectratio'],});
				$('#'+baseviewdef['id']).css({'padding-top':baseviewdef['padding']['top']* $.mobileweb.device['aspectHratio'],'padding-bottom':baseviewdef['padding']['bottom']* $.mobileweb.device['aspectHratio']});
				$('#'+baseviewdef['id']).css({'padding-left':baseviewdef['padding']['left']* $.mobileweb.device['aspectWratio'],'padding-right':baseviewdef['padding']['right']* $.mobileweb.device['aspectWratio']});
			}
		};
		
		return padding;
	};
	
	$.attributes = function(attr,children){
		switch(attr){
			case 'frame':
				return new Frame(children);
			break;
			
			case 'font':
				return new Font(children);
			break;
			
			case 'color':
				return new Color(children);
			break;
			
			case 'background':
				return new Background(children);
			break;
			
			case 'border':
				return new Border(children);
			break;
			
			case 'padding':
				return new Padding(children);
			break;


		}
	};
})(jQuery);