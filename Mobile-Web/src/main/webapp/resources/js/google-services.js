/**
 * Date: April 23, 2013
 */

(function($) {

	var GServiceMethods = {
		init : function(options) {
			if (GServiceMethods.data == undefined) {
				GServiceMethods.data = {

				};
				$.extend(GServiceMethods.data, options);
			} else
				$.error('[CRIT] Cannot make multiple instances of jQuery.GoogleService');
			return this;
		},

		getOAuth_URL : function(callingMethod, args, events, pagedef, ui) {
			var url = $.GoogleService('getGServiceBaseURL');
			var getURL = "";
			
			if ($.mobileweb['state'] == 'preview'){
				getURL = "getURL?clientId=" + $.mobileweb['clientId']
						+ "&redirectURI=" + $.mobileweb['redirectURI'];
			}else{
				getURL = "getURL?clientId=" + $.mobileweb['clientId']
						+ "&redirectURI=" + $.mobileweb['redirectURI'];
			}
			
			
			$.GoogleService('sendAJAXRequest', url + getURL,
					function(response) {
						var OAuth_url = response.url;
						console.log(response.url);
						var win = window.open(OAuth_url, "googleLoginWindow");
						if (win == null || typeof(win)=='undefined'){
					            alert("Turn off your pop-up blocker! and Refresh the page. \n\nWe try to open the following url:\n"+OAuth_url);
						}else {
						//	win.document.write("<p>This is 'MsgWindow'. I am 200px wide and 100px tall!</p>");
						}
						var pollTimer = window.setInterval(function() {
							if (win.closed) {
								window.clearInterval(pollTimer);
							}
							if (win.location != null) {
								if(win.location.href != null && win.location.href != undefined){
									if(win.location.href.indexOf('#') > 0){
										$.GoogleService('setAccessTokenCookies',win.location.href);
										window.clearInterval(pollTimer);
										win.close();
										$.GoogleService(callingMethod, args, events, pagedef, ui);
									}
								}
							}
						}, 1000);
					});
		},


		sendAJAXRequest : function(url, callback) {
			$.getJSON(url, function(result) {
				callback(result);
			});
		},

		getGServiceBaseURL : function() {
			var state = $.mobileweb['state'];
			if (state == 'preview')
				return [ $.mobileweb['baseurl'], ':8080/mobileweb/mobile/' ]
						.join('');
			else
				return [ $.mobileweb['baseurl'],
						'/mobileweb/mobile/' ].join('');		},

		setAccessTokenCookies : function(Url) {
			// aaa+'='+sStr+';expires='+now.toGMTString()+';path=/';
			var str = Url.substr(Url.indexOf('#') + 1).split("&");
			var key = "";
			var value = "";
			var options = "";
			for ( var i in str) {
				var temp = str[i].split("=");
				if (temp[0] == "access_token") {
					key = temp[0];
					value = temp[1];
				} else if (temp[0] == "expires_in") {
					options = "{\"expires\":\"" + temp[1] + "\"";
				} else {

				}
			}
			var date=new Date();
			date.setTime(date.getTime() + (20*60*1000));
			$.cookie(key, value, { expires: date });
		},

		getCookie : function(c_name) {
			var c_value = document.cookie;
			var c_start = c_value.indexOf(" " + c_name + "=");
			if (c_start == -1) {
				c_start = c_value.indexOf(c_name + "=");
			}
			if (c_start == -1) {
				c_value = null;
			} else {
				c_start = c_value.indexOf("=", c_start) + 1;
				var c_end = c_value.indexOf(";", c_start);
				if (c_end == -1) {
					c_end = c_value.length;
				}
				c_value = unescape(c_value.substring(c_start, c_end));
			}
			return c_value;
		},

		selectFromDBByEmailAndPhone : function(email, phonenumber, events, pagedef, ui, callback) {
			$.mobileweb['localdb']['instance'].transaction(function(tx) {
				tx.executeSql("SELECT other1 FROM appexe_tmp_contact where phonenumber='"+ phonenumber + "' and email='"+ email + "';",[],
						function(tx, $result) {
							if ($result.rows.length > 1 || $result.rows.length==0 ) {
								if (!$.isEmptyObject(events)) {
									$.utility('showLoadingIndicator', true);
									$.utility('ApplyOnSucessAndOnErrorEvents', pagedef,ui, events, false);
								}
							} else if ($result.rows.length == 1) {
								for ( var k = 0; k < $result.rows.length; k++) {
									var row = $result.rows.item(k);
									contactid = row['other1'];
								}
								if ((contactid != "")&& (contactid != undefined)) {
									callback(contactid);
								}
							}
						}, function(tx, error) {

				});
			});
		},

		selectFromDBByContactId : function(where, callback) {
			$.mobileweb['localdb']['instance'].transaction(function(tx) {
				tx.executeSql("SELECT other1 FROM appexe_tmp_contact where "
						+ where, [], function(tx, $result) {
					if ($result.rows.length > 1) {
						alert("Can not update, more than 1 record at a time.");
					} else if ($result.rows.length == 1) {
						for ( var k = 0; k < $result.rows.length; k++) {
							var row = $result.rows.item(k);
							googleId = row['other1'];
						}
						if ((googleId != "") && (googleId != undefined)) {
							callback(googleId);
						}
					}
				}, function(tx, error) {
				});
			});
		},
		
		truncateLocalDB : function(tablename, callback){
			$.mobileweb['localdb']['instance'].transaction(function(tx) {
				$.utility('log', [ '[Query] TRUNCATE TABLE '+ tablename+ '' ]);
				tx.executeSql(' DELETE FROM '+ tablename+'',[],function(tx,result) {
					$.utility('log',"[INFO] table truncated successfully.");
					callback();
				},function(tx,error) {
					callback();
				});
				
			});	
		},

		insertContact : function(record,events, pagedef, ui) {
			$.utility('showLoadingIndicator', true);
			if ($.GoogleService('getCookie', "access_token") == null) {
				$.GoogleService('getOAuth_URL', "insertContact", record, events, pagedef, ui);
			} else {
				var accessToken = $.GoogleService('getCookie', "access_token");
				var url = $.GoogleService('getGServiceBaseURL')
						+ "insertcontact?access_token=" + accessToken
						+ "&record=" + "{\"familyname\":\"" + record.familyname
						+ "\",\"firstname\":\"" + record.firstname
						+ "\",\"nickname\":\"" + record.nickname
						+ "\",\"phonenumber\":\"" + record.phonenumber
						+ "\",\"address\":\"" + record.address
						+ "\",\"email\":\"" + record.email
						+ "\",\"company\":\"" + record.company + "\"}";
				$.getJSON(url, function(result) {
					
					if (result.errorMessage != undefined) {
						if (!$.isEmptyObject(events)) {
							$.utility('ApplyOnSucessAndOnErrorEvents', pagedef,
									ui, events, false);
						}
					}else if (result.insert == "done") {
						/*
						var str = result.contactid;
						record.other1 = str.substr(str.lastIndexOf("/") + 1,
								str.length);
						$.GoogleService('insertIntoLocalDB', record,
								"appexe_tmp_contact");
						*/
						if (!$.isEmptyObject(events)) {
							$.utility('ApplyOnSucessAndOnErrorEvents', pagedef,
									ui, events, true);
						}
					}
					$.utility('showLoadingIndicator', false);
				});
			}

		},

		insertIntoLocalDB : function(contact, tablename) {
			try {
				var qnMarks = [];
				var fieldNames = [];
				var values = [];
				for ( var key in contact) {
					var fieldValue = contact[key];
					qnMarks.push('?');
					fieldNames.push(key);
					values.push(fieldValue);
				}
				$.mobileweb['localdb']['instance'].transaction(function(tx) {
					$.utility('log', [ '[Query] INSERT INTO ', tablename, '(',
							fieldNames.join(), ') VALUES (', qnMarks.join(),
							')' ].join(''));
					tx.executeSql([ 'INSERT INTO ', tablename, '(',
							fieldNames.join(), ') VALUES (', qnMarks.join(),
							')' ].join(''), values);
				});
			} catch (e) {

			}
		},

		updateContact : function(record,events, pagedef, ui) {
			$.utility('showLoadingIndicator', true);
			if ($.GoogleService('getCookie', "access_token") == null) {
				$.GoogleService('getOAuth_URL', "updateContact", record, events, pagedef, ui);
			} else {
				var accessToken = $.GoogleService('getCookie', "access_token");
				var url = $.GoogleService('getGServiceBaseURL')
									+ "updatecontact?access_token="
									+ accessToken + "&record="
									+ "{\"contactid\":\"" + record.other1
									+ "\",\"familyname\":\""
									+ record.familyname + "\",\"firstname\":\""
									+ record.firstname + "\",\"nickname\":\""
									+ record.nickname + "\",\"phonenumber\":\""
									+ record.phonenumber + "\",\"address\":\""
									+ record.address + "\",\"email\":\""
									+ record.email + "\",\"company\":\""
									+ record.company + "\"}";
				$.getJSON(url, function(result) {
					if (result.errorMessage != undefined) {
						if (!$.isEmptyObject(events)) {
							$.utility('ApplyOnSucessAndOnErrorEvents', pagedef,ui, events, false);
						}
					}else if (result.update == "done") {
						var whereCondition = record.where;
						delete record.where;
						delete record.contactid;
						$.GoogleService('updateIntoLocalDB',record, 'appexe_tmp_contact',whereCondition);
						if (!$.isEmptyObject(events)) {
							$.utility('ApplyOnSucessAndOnErrorEvents', pagedef,ui, events, true);
						}
					}
				});
				$.utility('showLoadingIndicator', false);
						
			}
		},

		updateIntoLocalDB : function(record, tablename, wherecondition) {
			var recordset = [];
			for ( var key in record) {
				var fieldValue = record[key];
				if (key != 'where') {
					recordset.push([ key, '=\'', fieldValue, '\'' ].join(''));
				}
			}
			$.mobileweb['localdb']['instance']
					.transaction(function(tx) {
						$.utility('log', [ '[Query] UPDATE ', tablename,
								' SET ', recordset.join(), ' WHERE ',
								wherecondition ].join(''));
						tx.executeSql([ 'UPDATE  ', tablename, ' SET ',
								recordset.join(), ' WHERE ', wherecondition ]
								.join(''), [], function(tx, result) {
							$.utility('log',
									"[INFO] Record updated successfully");
						}, function(tx, error) {
							$.utility('log',
									"[ERROR] Problems in updating a record.");
							$.utility('log', [ '[ERROR] UPDATE ', tablename,
									' SET ', recordset.join(), ' WHERE ',
									wherecondition ].join(''));
						});
					});
		},

		deleteContact : function(recordParam,events, pagedef, ui) {
			$.utility('showLoadingIndicator', true);
			if ($.GoogleService('getCookie', "access_token") == null) {
				$.GoogleService('getOAuth_URL', "deleteContact", recordParam, events, pagedef, ui);
			} else {
				var accessToken = $.GoogleService('getCookie', "access_token");
				var email = recordParam.email;
				var phonenumber = recordParam.phonenumber;
				$
						.GoogleService('selectFromDBByEmailAndPhone',email,phonenumber,events, pagedef, ui,function(contactid) {
									var url = $.GoogleService('getGServiceBaseURL')
											+ "deletecontact?access_token="+ accessToken+ "&contactid="+ contactid;
									$.getJSON(url,function(result) {
									if (result.errorMessage != undefined) {
										if (!$.isEmptyObject(events)) {
											$.utility('ApplyOnSucessAndOnErrorEvents', pagedef,
													ui, events, false);
										}
									}else if (result.deletestatus == "done") {
											$.mobileweb['localdb']['instance'].transaction(function(tx) {
													tx.executeSql('DELETE FROM appexe_tmp_contact where email="'+ email+ '" and phonenumber="'+ phonenumber+ '"',[],function(tx,result) {
														$.utility('log',"[INFO] record deleted successfully.");
													},function(tx,error) {
														$.utility('log',"[ERROR] Problems in deleting a record.");
													});
											});
											if (!$.isEmptyObject(events)) {
												$.utility('ApplyOnSucessAndOnErrorEvents', pagedef,
														ui, events, true);
											}
										}
										});
									$.utility('showLoadingIndicator', false);
								});

			}

		},

		searchContact : function(searchString,events, pagedef, ui) {
			$.utility('showLoadingIndicator', true);
			if ($.GoogleService('getCookie', "access_token") == null) {
				$.GoogleService('getOAuth_URL', "searchContact", searchString, events, pagedef, ui);
			} else {
				$.GoogleService('truncateLocalDB', "appexe_tmp_contact", function(){
				var accessToken = $.GoogleService('getCookie', "access_token");
				var url = $.GoogleService('getGServiceBaseURL')
						+ "searchcontact?access_token=" + accessToken
						+ "&searchstring=" + searchString;
				$.getJSON(url, function(result) {
					if (result.errorMessage != undefined) {
					if (!$.isEmptyObject(events)) {
						$.utility('ApplyOnSucessAndOnErrorEvents', pagedef,
								ui, events, false);
					}
				} else {
					for ( var i = 0; i < result.contactList.length; i++) {
						var contact = result.contactList[i];
						if (contact.firstname == undefined) {
							contact.firstname = "";
						}
						if (contact.familyname == undefined) {
							contact.familyname = "";
						}
						if (contact.email == undefined) {
							contact.email = "";
						}
						if (contact.id == undefined) {
							contact.id = "";
						}
						if (contact.phonenumber == undefined) {
							contact.phonenumber = "";
						}
						if (contact.nickname == undefined) {
							contact.nickname = "";
						}
						if (contact.address == undefined) {
							contact.address = "";
						}
						if (contact.company == undefined) {
							contact.company = "";
						}
						var str = contact.id;
						contact.other1 = str.substr(str.lastIndexOf("/") + 1,
								str.length);
						delete contact.id;
						$.GoogleService('insertIntoLocalDB', contact,
								"appexe_tmp_contact");
					}
					if (!$.isEmptyObject(events)) {
						$.utility('ApplyOnSucessAndOnErrorEvents', pagedef,
								ui, events, true);
					}
				}
					$.utility('showLoadingIndicator', false);
				});
				});
			}
		
		},

		findCalendar : function(record, events, pagedef, ui) {
			$.utility('showLoadingIndicator', true);
			if ($.GoogleService('getCookie', "access_token") == null) {
				$.GoogleService('getOAuth_URL', "findCalendar", record, events, pagedef, ui);
			} else {
				$.GoogleService('truncateLocalDB', "appexe_tmp_events", function(){
				var accessToken = $.GoogleService('getCookie', "access_token");
				var url = $.GoogleService('getGServiceBaseURL')
						+ "findcalendar?access_token=" + accessToken
						+ "&findParam=" + "{\"start_date\":\""
						+ record.startdate + "\",\"end_date\":\""
						+ record.enddate + "\",\"ownerEmail\":\""
						+ record.ownerEmail + "\"}";
				$.getJSON(url, function(result) {
					if (result.errorMessage != undefined) {
						if (!$.isEmptyObject(events)) {
							$.utility('ApplyOnSucessAndOnErrorEvents', pagedef,
									ui, events, false);
						}
					} else {
						if(result.eventList.length > 0){
							var count=0;
							for ( var i = 0; i < result.eventList.length; i++) {
								var event = result.eventList[i];
								if (event.eventid == undefined)
									event.eventid = "";
								else {
									event.eventid = event.eventid+"/"+event.etag;
									delete event.etag;
								}
								if (event.title == undefined)
									event.title = "";
	
								if (event.description == undefined)
									event.description = "";
								if (event.place == undefined)
									event.place = "";
								if (event.fromdate == undefined)
									event.fromdate = "";
								if (event.todate == undefined)
									event.todate = "";

								var fromDate=event.fromdate;

								var todate = event.todate;

								var startdate=record.startdate;
								
								var enddate= record.enddate;
								
								var d1 = $.utility('splitAndReturnDate',fromDate);
								var d2 = $.utility('splitAndReturnDate',todate);
								var d3 = $.utility('splitAndReturnDate',startdate);
								var d4 = $.utility('splitAndReturnDate',enddate);

								if(d1 >= d3 && d2 <= d4){
									$.GoogleService('insertIntoLocalDB', event,"appexe_tmp_events");
									count++;
								}
							}
							if(count > 0){
								if (!$.isEmptyObject(events)) {
									$.utility('ApplyOnSucessAndOnErrorEvents', pagedef,ui, events, true);
								}
							}else $.utility('ApplyOnSucessAndOnErrorEvents', pagedef,ui, events, false);
						}else $.utility('ApplyOnSucessAndOnErrorEvents', pagedef,ui, events, false);
					}
					$.utility('showLoadingIndicator', false);

				});
			});
			}

		},

		createEvent : function(record, events, pagedef, ui) {
			$.utility('showLoadingIndicator', true);
			if ($.GoogleService('getCookie', "access_token") == null) {
				$.GoogleService('getOAuth_URL', "createEvent", record, events, pagedef, ui);
			} else {
				var accessToken = $.GoogleService('getCookie', "access_token");
				var url = $.GoogleService('getGServiceBaseURL')
						+ "createevent?access_token=" + accessToken
						+ "&record=" + "{\"start_date\":\"" + record.startdate
						+ "\",\"end_date\":\"" + record.enddate
						+ "\",\"title\":\"" + record.title
						+ "\",\"description\":\"" + record.description
						+ "\",\"place\":\"" + record.place + "\",\"ownerEmail\":\"" + record.ownerEmail
						+ "\"}";
				$.getJSON(url, function(result) {
					if (result.status == "confirmed") {
						/*record.eventid = result.eventid;
						record.fromdate = record.startdate;
						delete record.startdate;
						record.todate = record.enddate;
						delete record.enddate;
						//delete record.eventid;
						delete record.ownerEmail;
						$.GoogleService('insertIntoLocalDB', record,
								"appexe_tmp_events");*/
						if (!$.isEmptyObject(events)) {
							$.utility('ApplyOnSucessAndOnErrorEvents', pagedef,
									ui, events, true);
						}
					} else {
						if (!$.isEmptyObject(events)) {
							$.utility('ApplyOnSucessAndOnErrorEvents', pagedef,
									ui, events, false);
						}
					}
					$.utility('showLoadingIndicator', false);
				});
			}

		},

		UpdateEvent : function(record, events, pagedef, ui) {
			$.utility('showLoadingIndicator', true);
			if ($.GoogleService('getCookie', "access_token") == null) {
				$.GoogleService('getOAuth_URL', "UpdateEvent", record, events, pagedef, ui);
			} else {
				var accessToken = $.GoogleService('getCookie', "access_token");
				var str = record.eventid;
				var etag = str.substr(str.lastIndexOf("/") + 1, str.length);
				var eventid = str.replace("/" + etag, "");
				etag = etag.replace("\"", "");
				etag = etag.replace("\"", "");
				var url = $.GoogleService('getGServiceBaseURL')
						+ "updateevent?access_token=" + accessToken
						+ "&record=" + "{\"etag\":\"" + etag
						+ "\",\"eventid\":\"" + eventid
						+ "\",\"start_date\":\"" + record.startdate
						+ "\",\"end_date\":\"" + record.enddate
						+ "\",\"title\":\"" + record.title
						+ "\",\"description\":\"" + record.description
						+ "\",\"place\":\"" + record.place + "\"}";
				$.getJSON(url,
						function(result) {
							if (result.status == "updated") {
								record.fromdate = record.startdate;
								delete record.startdate;
								record.todate = record.enddate;
								delete record.enddate;
								delete record.ownerEmail;
								delete record.filtertodate;
								delete record.filterfromdate;
								delete record.matchField;
								delete record.matchValue;
								record.eventid = result.eventid + "/"
										+ result.etag;
								//delete record.eventid;
								var whereCondition = " id="+record.id;
								delete record.id;
								$.GoogleService('updateIntoLocalDB', record,
										"appexe_tmp_events", whereCondition);
								if (!$.isEmptyObject(events)) {
									$.utility('ApplyOnSucessAndOnErrorEvents',
											pagedef, ui, events, true);
								}
							} else {
								if (!$.isEmptyObject(events)) {
									$.utility('ApplyOnSucessAndOnErrorEvents',
											pagedef, ui, events, false);
								}
							}
							$.utility('showLoadingIndicator', false);
						});
			}

},
		
		DeleteEvent : function(record, events, pagedef, ui) {
			$.utility('showLoadingIndicator', true);
			if ($.GoogleService('getCookie', "access_token") == null) {
				$.GoogleService('getOAuth_URL', "DeleteEvent", record, events, pagedef, ui);
			} else {
				var accessToken = $.GoogleService('getCookie', "access_token");
				var str = record.eventid;
				var etag = str.substr(str.lastIndexOf("/") + 1, str.length);
				var eventid = str.replace("/" + etag, "");
				etag = etag.replace("\"", "");
				etag = etag.replace("\"", "");
				var url = $.GoogleService('getGServiceBaseURL')
						+ "deleteevent?access_token=" + accessToken
						+ "&record=" + "{\"etag\":\"" + etag
						+ "\",\"eventid\":\"" + eventid
						+ "\"}";
				$.getJSON(url,
						function(result) {
							if (result.status == "deleted") {
								$.mobileweb['localdb']['instance'].transaction(function(tx) {
									$.utility('log',"[INFO] DELETE FROM appexe_tmp_events where eventid='"+ record.eventid+"'");
									tx.executeSql("DELETE FROM appexe_tmp_events where eventid='"+ record.eventid+"'",[],function(tx,result) {
										$.utility('log',"[INFO] record deleted successfully.");
									},function(tx,error) {
										$.utility('log',"[ERROR] Problems in deleting a record.");
									});
							});
								if (!$.isEmptyObject(events)) {
									$.utility('ApplyOnSucessAndOnErrorEvents',
											pagedef, ui, events, true);
								}
							} else {
								if (!$.isEmptyObject(events)) {
									$.utility('ApplyOnSucessAndOnErrorEvents',
											pagedef, ui, events, false);
								}
							}
							$.utility('showLoadingIndicator', false);
						});
			}

		}

	};

	$.GoogleService = function(method) {
		if (GServiceMethods[method]) {
			if (GServiceMethods.data == undefined) {
				GServiceMethods.init();
			}
			;
			return GServiceMethods[method].apply(this, Array.prototype.slice
					.call(arguments, 1));
		} else if (typeof method === 'object' || !method)
			return GServiceMethods.init.apply(this, arguments);
		else
			$.error('Method ' + method
					+ ' does not exist on jQuery.GoogleService');
	};

})(jQuery);
