(function($){
	$.uiGrid = function(pagedef, child){
		var grid = {};
		new GridTable(pagedef, grid, child);
		
		return grid;
	};
	
	function GridTable(pagedef, grid, child){
		grid['group'] = [];
		$.each(child['group'],function(i,group){
			grid['group'].push(new Group(pagedef, child['id'], group, i));
		});
		var _gridTable = [];
		grid.getHTML = function(){
			$.each(grid['group'],function(i,group){
				_gridTable = _gridTable.concat(group.getHTML());
			});
			return ["<table id='",child['id'],"'>",
			        _gridTable.join(''),
			        //showMoreButton,
			        "</table>"].join('');
		};
		
		grid.applyOverrides = function(){
			$.each(grid['group'],function(i,group){
				group.applyOverrides();
			});
			$("#"+ child['id']).css({'border-spacing':'0px'});
		};
		
		grid.applyEvents = function(){
			
		};
		
		//this function is needed for all of the UI objects
		grid.getValue = function(){
			//return the list of the selected rows per group (in array of arrays ofcourse)
			return '';
		};
	};
	
	function Group(pagedef, id, gridGroup, index){
		var group = {id: id + '-group-' + index,
					 row:[]};
		var _gridGroup = '';
		$.each(gridGroup['row'],function(i,row){
			//row['backgroundColor'] = tblgroup['backgroundColor'];
			group['row'].push(new Row(pagedef, group['id'], row, i));
		});
		
		group.getHTML = function(){
			$.each(group['row'],function(i,row){
				_gridGroup	 = _gridGroup.concat(row.getHTML());
			});
			return _gridGroup;
			
		};
		
		group.applyOverrides = function(){
			$.each(group['row'],function(i,row){
				row.applyOverrides();
			});
		};
		
		group.applyEvents = function(){
			$.each(group['row'],function(i,row){
				row.applyEvents();
			});
		};
		
		return group;
	};
	
	function Row(pagedef, id, grprow, index){
		var row = {id: id + '-row-' + index,
				   rownum: grprow['rownum'],
				   children: new $.uichildren(pagedef, grprow['children'], grprow['data']['contents'][0]),
				   backgroundColor : grprow['backgroundColor']
				};
		
		
		row.getHTML = function(){
			var _row = '';
			
			$.each(pagedef['children'][0]['group']['0']['template']['gridFields'],function(i, columnData){
				var dataValue  = $.utility('extractDataFromRecord', grprow['data']['contents'][0], columnData['template']);
				
				_row = _row + '<td id="'+columnData['id']+'_'+ row['id'] +'_td"><p id="'+columnData['id']+'_'+ row['id'] +'_p" tabindex="" > <label class="ui-label" id="'+columnData['id']+'_'+ row['id'] +'" name="'+columnData['name']+'" ">'+dataValue+'</label></p></td>'
			});
			return ['<tr id="'+ row['id'] +'_tr">'+_row+'</tr>'];
		};
		
		
		
		row.getViewType = function(){
			return 'Row';
		};
		
		row.applyOverrides = function(){
			$.each(pagedef['children'][0]['group']['0']['template']['gridFields'],function(i, columnData){
				$('#'+columnData['id']+'_'+ row['id'] +'_td').css({ 'width':(columnData['frame']['width'] - 4)*$.mobileweb.device['aspectratio']+'px', 'border':'1px solid'});
				$('#'+columnData['id']+'_'+ row['id'] +'_p').css({'margin':'auto'});
				$('#'+columnData['id']+'_'+ row['id'] +'_p').css({'border-width':'1px solid'});
				$('#'+columnData['id']+'_'+ row['id']).css({'text-shadow':'0px 0px 0px #FFFFFF'});
				$('#'+columnData['id']+'_'+ row['id']).css({'position':''});
				$('#'+columnData['id']+'_'+ row['id'] +'_p').css({'text-align':'center'});
				$('#'+columnData['id']+'_'+ row['id'] +'_p').css({'position':''});
				$('#'+columnData['id']+'_'+ row['id'] +'_p').css({'overflow':'hidden'});
				$('#'+columnData['id']+'_'+ row['id'] +'_p').css({ 'width':(columnData['frame']['width'] - 4)*$.mobileweb.device['aspectratio']+'px'});
				
			});
			row.setCellHeight();
		};
		
		row.setCellHeight = function(){
			$.each(pagedef['children'][0]['group']['0']['template']['gridFields'],function(i, columnData){
				$('#'+ row['id'] +'_tr').css({ 'height':(columnData['frame']['height'] - 4)*$.mobileweb.device['aspectratio']+'px'});
				
			});
		};
		
		row.getCellHeight = function(){
			return grprow['rowsize'] * $.mobileweb.device['aspectratio'];
		};
		
		row.applyEvents = function(){
			
		};
		
		return row;
	};
	
})(jQuery);