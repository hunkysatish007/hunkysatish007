package com.mobilous.mobileweb.controller;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.TimeZone;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.api.client.auth.oauth2.BrowserClientRequestUrl;
//import com.google.gdata.client.calendar.CalendarQuery;
//import com.google.gdata.client.calendar.CalendarService;
//import com.google.gdata.client.contacts.ContactsService;
//import com.google.gdata.data.DateTime;
//import com.google.gdata.data.PlainTextConstruct;
//import com.google.gdata.data.calendar.CalendarEntry;
//import com.google.gdata.data.calendar.CalendarEventEntry;
//import com.google.gdata.data.calendar.CalendarEventFeed;
//import com.google.gdata.data.calendar.CalendarFeed;
//import com.google.gdata.data.calendar.TimeZoneProperty;
//import com.google.gdata.data.contacts.ContactEntry;
//import com.google.gdata.data.contacts.ContactFeed;
//import com.google.gdata.data.contacts.Nickname;
//import com.google.gdata.data.extensions.Email;
//import com.google.gdata.data.extensions.FamilyName;
//import com.google.gdata.data.extensions.GivenName;
//import com.google.gdata.data.extensions.Name;
//import com.google.gdata.data.extensions.OrgName;
//import com.google.gdata.data.extensions.Organization;
//import com.google.gdata.data.extensions.PhoneNumber;
//import com.google.gdata.data.extensions.PostalAddress;
//import com.google.gdata.data.extensions.Reminder;
//import com.google.gdata.data.extensions.Reminder.Method;
//import com.google.gdata.data.extensions.When;
//import com.google.gdata.data.extensions.Where;

@Controller
public class GoogleAPIController {

	/*
	 * @RequestMapping("/index") public String getIndexPage(HttpServletRequest
	 * request) { return "index"; }
	 * 
	 * @RequestMapping("/a") public String getPage_a(HttpServletRequest request)
	 * { return "a"; }
	 */

	@RequestMapping(value = "/getURL")
	@ResponseBody
	public void getURL(HttpServletRequest request, HttpServletResponse response) {
		GoogleController controller = new GoogleController();

		controller.setClient_id(request.getParameter("clientId"));
		controller.setRedirect_uri(request.getParameter("redirectURI"));
		controller.setContact_scope("https://www.google.com/m8/feeds/");
		controller.setCalendar_scope("https://www.google.com/calendar/feeds/");

		String url = new BrowserClientRequestUrl(
				"https://accounts.google.com/o/oauth2/auth",
				controller.getClient_id())
				.setRedirectUri(controller.getRedirect_uri())
				.setScopes(
						Arrays.asList(controller.getContact_scope(),
								controller.getCalendar_scope())).setState("")
				.build();

		//System.out.println("Auth URL : " + url);
		JSONObject json = new JSONObject();
		json.put("url", url);

		response.setContentType("application/json");
		try {
			response.getWriter().write(json.toString());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/getAccessToken")
	@ResponseBody
	public void getAccessToken(HttpServletRequest request,
			HttpServletResponse response) {

		// The code is of no use.. as google uses # as request parameter and not
		// '?' so I am solving it from client side.. :(

		String accessToken = request.getParameter("access_token");
		String expireTime = request.getParameter("expires_in");

		JSONObject json = new JSONObject();
		json.put("access_token", accessToken);
		json.put("expires_in", expireTime);
		json.put("query", request.getQueryString());

		response.setContentType("application/json");
		try {
			response.getWriter().write(json.toString());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	/* ***************** Google Contact Code Started *********** */

	@RequestMapping(value = "/searchcontact")
	@ResponseBody
	public void searchContact(HttpServletRequest request, HttpServletResponse response) {
		// required params :
		// /searchconact?access_token=tttttt&searchstring="any-string"
//		JSONObject json = new JSONObject();
//		String accessToken = ""; // ya29.AHES6ZR6gIVQLKmxCBzZzx5MgV4NoF4bU16AWmi0Zwwv
//		String searchString = "";
//
//		if (request.getParameter("access_token") != null) {
//			accessToken = request.getParameter("access_token");
//			searchString = request.getParameter("searchstring");
//
//		} else {
//			JSONObject jsonError = new JSONObject();
//			jsonError.put("errorMessage", "No Access Token Found or Expired");
//			response.setContentType("application/json");
//			try {
//				response.getWriter().write(jsonError.toString());
//			} catch (IOException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//		}
//		try {
//			ContactsService service = new ContactsService("Mobilous-Contacts");
//			service.setAuthSubToken(accessToken);
//
//			URL feedUrl = new URL(
//					"https://www.google.com/m8/feeds/contacts/default/full?q="
//							+ searchString);
//
//			ContactFeed resultFeed = service
//					.getFeed(feedUrl, ContactFeed.class);
//
//			JSONObject innerJson;
//			JSONArray jsarray = new JSONArray();
//
//			for (ContactEntry entry : resultFeed.getEntries()) {
//				innerJson = new JSONObject();
//				// Contact ID...
//				innerJson.put("id", entry.getId());
//
//				// Names..
//				if (entry.hasName()) {
//					Name name = entry.getName();
//					if (name.hasFamilyName()) {
//						innerJson.put("familyname", name.getFamilyName()
//								.getValue());
//					}
//					if (name.hasGivenName()) {
//						innerJson.put("firstname", name.getGivenName()
//								.getValue());
//					}
//				}
//
//				// only for nicknames
//				if (entry.hasNickname()) {
//					Nickname nickname = entry.getNickname();
//					innerJson.put("nickname", nickname.getValue());
//				}
//
//				// Emails..
//				if (entry.hasEmailAddresses()) {
//					for (Email email : entry.getEmailAddresses()) {
//						if (email.getPrimary()) {
//							innerJson.put("email", email.getAddress());
//						}
//					}
//				}
//
//				// Address..
//				if (entry.hasPostalAddresses()) {
//					PostalAddress address = new PostalAddress();
//					innerJson.put("address", address.getValue());
//				}
//
//				// Phone Numbers
//				if (entry.hasPhoneNumbers()) {
//					for (PhoneNumber number : entry.getPhoneNumbers()) {
//						if (number.getPrimary()) {
//							innerJson.put("phonenumber",
//									number.getPhoneNumber());
//						}
//					}
//				}
//
//				// Companies..
//				if (entry.hasOrganizations()) {
//					for (Organization company : entry.getOrganizations()) {
//						if (company.getPrimary()) {
//							innerJson.put("company", company.getOrgName());
//						}
//					}
//				}
//
//				jsarray.add(innerJson);
//			}
//
//			json.put("contactList", jsarray);
//
//			//System.out.println(json.toString());
//			response.setContentType("application/json");
//
//			response.getWriter().write(json.toString());
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			json.put("errorMessage",
//					"Some server error occured. Please try again later");
//
//			//System.out.println(json.toString());
//			response.setContentType("application/json");
//			try {
//				response.getWriter().write(json.toString());
//			} catch (IOException e1) {
//				// TODO Auto-generated catch block
//				e1.printStackTrace();
//			}
//		}
	}

	@RequestMapping(value = "/deletecontact")
	@ResponseBody
	public void deleteContact(HttpServletRequest request, HttpServletResponse response) {
		// required params :
		// /deleteconact?access_token=tttttt&contactid=ContactURL
//		JSONObject json = new JSONObject();
//		String accessToken = "";
//		URL contactURL = null;
//
//		if (request.getParameter("access_token") != null) {
//			accessToken = request.getParameter("access_token");
//			try {
//				contactURL = new URL(
//						"https://www.google.com/m8/feeds/contacts/default/full/"
//								+ request.getParameter("contactid").toString());
//			} catch (MalformedURLException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//
//		} else {
//			JSONObject jsonError = new JSONObject();
//			jsonError.put("errorMessage", "No Access Token Found or Expired");
//			response.setContentType("application/json");
//			try {
//				response.getWriter().write(jsonError.toString());
//			} catch (IOException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//		}
//		try {
//			ContactsService service = new ContactsService("Mobilous-Contacts");
//			service.setAuthSubToken(accessToken);
//
//			ContactEntry entry = service.getEntry(contactURL,
//					ContactEntry.class);
//			//System.out.println(entry.toString());
//			entry.delete();
//
//			json.put("deletestatus", "done");
//			response.setContentType("application/json");
//
//			response.getWriter().write(json.toString());
//		} catch (Exception e) {
//			json.put("errorMessage",
//					"Some server occured. Please try again later.");
//			response.setContentType("application/json");
//
//			try {
//				response.getWriter().write(json.toString());
//			} catch (IOException e1) {
//				// TODO Auto-generated catch block
//				e1.printStackTrace();
//			}
//		}
	}

	@RequestMapping(value = "/updatecontact")
	@ResponseBody
	public void updateContact(HttpServletRequest request, HttpServletResponse response) {
		// required params :
		// /updatecontact?access_token=tttttt&record={"contactid":"XX","familyname":"YY","firstname":"UU","nickname":"oo","phonenumber":"11","address":"gg",""email":"aa@aa.com","company":"tt"}

//		String record = "";
//		String accessToken = "";
//		JSONObject recordAsJson = null;
//		URL contactURL = null;
//		JSONObject json = new JSONObject();
//		if ((request.getParameter("record") != null)
//				&& (request.getParameter("access_token") != null)) {
//			recordAsJson = getJSONObject(request.getParameter("record"));
//			//System.out.println(recordAsJson);
//			accessToken = request.getParameter("access_token");
//		} else {
//			//System.out.println("No Access Token Found");
//			JSONObject jsonError = new JSONObject();
//			jsonError.put("Error", "No Access Token Found or Expired");
//			response.setContentType("application/json");
//			try {
//				response.getWriter().write(jsonError.toString());
//			} catch (IOException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//
//		}
//		try {
//			ContactsService service = new ContactsService("Mobilous-Contacts");
//			service.setAuthSubToken(accessToken);
//
//			contactURL = new URL(
//					"https://www.google.com/m8/feeds/contacts/default/full/"
//							+ recordAsJson.get("contactid").toString());
//
//			ContactEntry entry = service.getEntry(contactURL,
//					ContactEntry.class);
//			if (!recordAsJson.get("nickname").toString().equalsIgnoreCase("")) {
//				entry.getNickname().setValue(
//						recordAsJson.get("nickname").toString());
//			}
//
//			if (!recordAsJson.get("familyname").toString().equalsIgnoreCase("")) {
//				entry.getName().getFamilyName()
//						.setValue(recordAsJson.get("familyname").toString());
//			}
//
//			if (!recordAsJson.get("firstname").toString().equalsIgnoreCase("")) {
//				entry.getName().getGivenName()
//						.setValue(recordAsJson.get("firstname").toString());
//			}
//
//			for (PhoneNumber number : entry.getPhoneNumbers()) {
//				if (number.getPrimary()) {
//					if (!recordAsJson.get("phonenumber").toString()
//							.equalsIgnoreCase("")) {
//						number.setPhoneNumber(recordAsJson.get("phonenumber")
//								.toString());
//					}
//				}
//			}
//
//			for (PostalAddress address : entry.getPostalAddresses()) {
//				if (address.getPrimary()) {
//					if (!recordAsJson.get("address").toString()
//							.equalsIgnoreCase("")) {
//						address.setValue(recordAsJson.get("address").toString());
//					}
//				}
//
//			}
//
//			for (Email email : entry.getEmailAddresses()) {
//				if (email.getPrimary()) {
//					if (!recordAsJson.get("email").toString()
//							.equalsIgnoreCase("")) {
//						email.setAddress(recordAsJson.get("email").toString());
//					}
//				}
//			}
//
//			for (Organization organization : entry.getOrganizations()) {
//				if (organization.getPrimary()) {
//					if (!recordAsJson.get("company").toString()
//							.equalsIgnoreCase("")) {
//						OrgName company = new OrgName();
//						company.setValue(recordAsJson.get("company").toString());
//						organization.setOrgName(company);
//					}
//				}
//			}
//
//			URL editUrl = new URL(entry.getEditLink().getHref());
//			ContactEntry contactEntry = service.update(editUrl, entry);
//			/*System.out.println("Updated: "
//					+ contactEntry.getUpdated().toString());
//*/
//			json.put("update", "done");
//			json.put("record", contactEntry.getUpdated().toString());
//			response.setContentType("application/json");
//
//			response.getWriter().write(json.toString());
//		} catch (Exception e) {
//			json.put("errorMessage",
//					"Some server error occured. Please try again later.");
//			response.setContentType("application/json");
//
//			try {
//				response.getWriter().write(json.toString());
//			} catch (IOException e1) {
//				// TODO Auto-generated catch block
//				e1.printStackTrace();
//			}
//		}

	}

	@RequestMapping(value = "/insertcontact")
	@ResponseBody
	public void insertContact(HttpServletRequest request, HttpServletResponse response) {
		// required params :
		// /insertcontact?access_token=tttttt&record={"contactid":"XX","familyname":"YY","firstname":"UU","nickname":"oo","phonenumber":"11","address":"gg",""email":"aa@aa.com","company":"tt"}

//		String record = "";
//		String accessToken = "";
//		JSONObject recordAsJson = null;
//		JSONObject json = new JSONObject();
//		if ((request.getParameter("record") != null)
//				&& (request.getParameter("access_token") != null)) {
//			recordAsJson = getJSONObject(request.getParameter("record"));
//			accessToken = request.getParameter("access_token");
//			//System.out.println("Record JSON : " + recordAsJson.toString());
//		} else {
//			//System.out.println("No Access Token Found");
//			JSONObject jsonError = new JSONObject();
//			jsonError.put("Error", "No Access Token Found or Expired");
//			response.setContentType("application/json");
//			try {
//				response.getWriter().write(jsonError.toString());
//			} catch (IOException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//
//		}
//		try {
//			ContactsService service = new ContactsService("Mobilous-Contacts");
//			service.setAuthSubToken(accessToken);
//
//			ContactEntry contact = new ContactEntry();
//
//			Name name = new Name();
//			final String NO_YOMI = null;
//			if (!recordAsJson.get("familyname").toString().equalsIgnoreCase("")) {
//				name.setFamilyName(new FamilyName(recordAsJson
//						.get("familyname").toString(), NO_YOMI));
//			}
//			if (!recordAsJson.get("firstname").toString().equalsIgnoreCase("")) {
//				name.setGivenName(new GivenName(recordAsJson.get("firstname")
//						.toString(), NO_YOMI));
//				contact.setName(name);
//			}
//			if (!recordAsJson.get("nickname").toString().equalsIgnoreCase("")) {
//				Nickname nickname = new Nickname(recordAsJson.get("nickname")
//						.toString());
//				contact.setNickname(nickname);
//			}
//			if (!recordAsJson.get("phonenumber").toString()
//					.equalsIgnoreCase("")) {
//				PhoneNumber number = new PhoneNumber();
//				number.setPhoneNumber(recordAsJson.get("phonenumber")
//						.toString());
//				number.setPrimary(true);
//				number.setRel("http://schemas.google.com/g/2005#home");
//				contact.addPhoneNumber(number);
//			}
//			if (!recordAsJson.get("address").toString().equalsIgnoreCase("")) {
//				PostalAddress address = new PostalAddress();
//				address.setValue(recordAsJson.get("address").toString());
//				address.setPrimary(true);
//				address.setRel("http://schemas.google.com/g/2005#work");
//				contact.addPostalAddress(address);
//			}
//			Email email = new Email();
//			email.setAddress(recordAsJson.get("email").toString());
//			email.setPrimary(true);
//			email.setRel("http://schemas.google.com/g/2005#work");
//			contact.addEmailAddress(email);
//			if (!recordAsJson.get("company").toString().equalsIgnoreCase("")) {
//				Organization company = new Organization();
//				company.setLabel(recordAsJson.get("company").toString());
//				company.setOrgName(new OrgName(recordAsJson.get("company")
//						.toString()));
//				contact.addOrganization(company);
//			}
//			ContactEntry createdContact = null;
//
//			URL postUrl = new URL(
//					"https://www.google.com/m8/feeds/contacts/default/full");
//
//			createdContact = service.insert(postUrl, contact);
//		//	System.out.println("Contact's ID: " + createdContact.getId());
//
//			json.put("insert", "done");
//			json.put("contactid", createdContact.getId());
//			response.setContentType("application/json");
//
//			response.getWriter().write(json.toString());
//		} catch (Exception e) {
//			e.printStackTrace();
//			json.put("errorMessage",
//					"Some server error occured. Please try again later.");
//
//			response.setContentType("application/json");
//
//			try {
//				response.getWriter().write(json.toString());
//			} catch (IOException e1) {
//				// TODO Auto-generated catch block
//				e1.printStackTrace();
//			}
//		}
	}

	/* ***************** Google Contact Code Ends *********** */

	/* ***************** Google Calendar Code Started *********** */

	@RequestMapping(value = "/findcalendar")
	@ResponseBody
	public void findCalendar(HttpServletRequest request, HttpServletResponse response) {
//		JSONObject recordAsJson = null;
//		String accessToken = null;
//		JSONObject json = new JSONObject();
//
//		try {
//
//			if ((request.getParameter("findParam") != null)
//					&& (request.getParameter("access_token") != null)) {
//				recordAsJson = getJSONObject(request.getParameter("findParam"));
//				accessToken = request.getParameter("access_token");
//
//			} else {
//				JSONObject jsonError = new JSONObject();
//				jsonError.put("errorMessage", "BAD REQUEST");
//				response.setContentType("application/json");
//
//				response.getWriter().write(jsonError.toString());
//
//			}
//		} catch (Exception e) {
//			// TODO: handle exception
//		}
//
//		// accessToken="ya29.AHES6ZQ-Y7fyHeSyT3Dljp6WsiLyBm2sTgs3IvJpu8H7dw";
//		CalendarService service = new CalendarService("Mobilous-Calendar");
//		String start_date = (String) recordAsJson.get("start_date");
//		String end_date = (String) recordAsJson.get("end_date");
//		Date parsedEndDate = null;
//		Date parsedStartDate = null;
//		DateTime parsedStartDateTime = null;
//		DateTime parsedEndDateTime = null;
//		// Calendar Feed to find time zone of owner's calendar
//		try {
//			service.setAuthSubToken(accessToken);
//			CalendarFeed feed = service.getFeed(new URL(
//					"https://www.google.com/calendar/feeds/"
//							+ (String) recordAsJson.get("ownerEmail")
//							+ "/owncalendars/full"), CalendarFeed.class);
//
//			String timeZone = "";
//			for (int i = 0; i < feed.getEntries().size(); i++) {
//				CalendarEntry calendarEntry = (CalendarEntry) feed.getEntries()
//						.get(i);
//				String Id = URLDecoder.decode(calendarEntry.getId(), "UTF-8");
//				String calendarId = Id.substring(Id.lastIndexOf('/') + 1);
//
//				//System.out.println("Calendar ID : " + calendarId);
//				/*System.out.println("Owner Email ID : "
//						+ (String) recordAsJson.get("ownerEmail"));
//*/
//				if (calendarId.equalsIgnoreCase((String) recordAsJson
//						.get("ownerEmail"))
//						|| ((String) recordAsJson.get("ownerEmail"))
//								.equalsIgnoreCase("default")) {
//					//System.out.println("Matched...");
//					TimeZoneProperty property = new TimeZoneProperty();
//
//					property = calendarEntry.getTimeZone();
//
//					//System.out.println("Property : " + property.getValue());
//					timeZone = property.getValue();
//				}
//			}
//
//			if (start_date.contains(":") && end_date.contains(":")) {
//				//System.out.println("In First");
//				start_date = start_date + "" + ":00";
//				end_date = end_date + "" + ":59";
//				SimpleDateFormat formatter = new SimpleDateFormat(
//						"yyyy-MM-dd HH:mm:ss");
//				formatter.setTimeZone(TimeZone.getTimeZone(timeZone));
//				parsedStartDate = formatter.parse(start_date);
//				parsedStartDateTime = new DateTime(parsedStartDate);
//				parsedEndDate = formatter.parse(end_date);
//				parsedEndDateTime = new DateTime(parsedEndDate);
//				/*System.out.println("parseStartDateTime : "
//						+ parsedStartDateTime.toString());
//				System.out.println("parseEndDateTime : "
//						+ parsedEndDateTime.toString());*/
//
//			} else if (start_date.contains(":") && !end_date.contains(":")) {
//				start_date = start_date + "" + ":00";
//				end_date = end_date + " " + "23:59:59";
//				SimpleDateFormat formatter = new SimpleDateFormat(
//						"yyyy-MM-dd HH:mm:ss");
//				parsedStartDate = formatter.parse(start_date);
//				parsedStartDateTime = new DateTime(parsedStartDate);
//				parsedEndDate = formatter.parse(end_date);
//				parsedEndDateTime = new DateTime(parsedEndDate);
//
//			} else if (!start_date.contains(":") && end_date.contains(":")) {
//				start_date = start_date + " " + "00:00:00";
//				end_date = end_date + "" + ":59";
//				SimpleDateFormat formatter = new SimpleDateFormat(
//						"yyyy-MM-dd HH:mm:ss");
//				parsedStartDate = formatter.parse(start_date);
//				parsedStartDateTime = new DateTime(parsedStartDate);
//				parsedEndDate = formatter.parse(end_date);
//				parsedEndDateTime = new DateTime(parsedEndDate);
//
//			} else if (!start_date.contains(":") && !end_date.contains(":")) {
//				start_date = start_date + " " + "00:00:00";
//				end_date = end_date + " " + "23:59:59";
//				SimpleDateFormat formatter = new SimpleDateFormat(
//						"yyyy-MM-dd HH:mm:ss");
//				parsedStartDate = formatter.parse(start_date);
//				parsedStartDateTime = new DateTime(parsedStartDate);
//				parsedEndDate = formatter.parse(end_date);
//				parsedEndDateTime = new DateTime(parsedEndDate);
//
//			} else {
//				start_date = start_date + " " + "00:00:00";
//				end_date = end_date + " " + "23:59:59";
//				SimpleDateFormat formatter = new SimpleDateFormat(
//						"yyyy-MM-dd HH:mm:ss");
//				parsedStartDate = formatter.parse(start_date);
//				parsedStartDateTime = new DateTime(parsedStartDate);
//				parsedEndDate = formatter.parse(end_date);
//				parsedEndDateTime = new DateTime(parsedEndDate);
//
//			}
//
//			URL feedUrl = null;
//			feedUrl = new URL("https://www.google.com/calendar/feeds/"
//					+ (String) recordAsJson.get("ownerEmail") + "/private/full");
//			CalendarQuery query = new CalendarQuery(feedUrl);
//
//			query.setMinimumStartTime(parsedStartDateTime);
//			query.setMaximumStartTime(parsedEndDateTime);
//			CalendarEventFeed resultFeed = service.query(query,
//					CalendarEventFeed.class);
//
//			JSONObject innerJson = null;
//			JSONArray jsarray = new JSONArray();
//			//System.out.println(resultFeed.getTotalResults());
//			for (CalendarEventEntry entry : resultFeed.getEntries()) {
//				//System.out.println("Entry" + entry.getTitle().getPlainText());
//				innerJson = new JSONObject();
//
//				innerJson.put("eventid", entry.getEditLink().getHref());
//				innerJson.put("etag", entry.getEtag());
//				// innerJson.put("entryEditLink",
//				// entry.getEditLink().getHref());
//				if (entry.getTitle() != null) {
//					innerJson.put("title", entry.getTitle().getPlainText());
//				}
//
//				Where where = new Where();
//				if (entry.getLocations().get(0) != null)
//					where = entry.getLocations().get(0);
//				innerJson.put("place", where.getValueString());
//				When when = new When();
//				if (entry.getTimes().get(0) != null)
//					when = entry.getTimes().get(0);
//
//				if (when.getStartTime() != null) {
//					long timeInMillis = when.getStartTime().getValue();
//					SimpleDateFormat sdf = new SimpleDateFormat(
//							"yyyy-MM-dd HH:mm");
//					Date resultdate = new Date(timeInMillis);
//					sdf.setTimeZone(TimeZone.getTimeZone(timeZone));
//					innerJson.put("fromdate", sdf.format(resultdate));
//				}
//				if (when.getEndTime() != null) {
//
//					long timeInMillis = when.getEndTime().getValue();
//					SimpleDateFormat sdf = new SimpleDateFormat(
//							"yyyy-MM-dd HH:mm");
//					Date resultdate = new Date(timeInMillis);
//					sdf.setTimeZone(TimeZone.getTimeZone(timeZone));
//					innerJson.put("todate", sdf.format(resultdate));
//				}
//				// {"id":"http:\/\/www.google.com\/calendar\/feeds\/default\/events\/m0tqvmbj5dnuvfek7srpc4rbt8","title":"Testing","location":"com.google.gdata.data.extensions.Where@65e1e6bc","entryEditLink":"https:\/\/www.google.com\/calendar\/feeds\/default\/private\/full\/m0tqvmbj5dnuvfek7srpc4rbt8","endDateTime":2013-06-20T18:30:00.000+03:00,"startDatetime":2013-06-19T18:30:00.000+03:00}
//				innerJson.put("description", entry.getPlainTextContent());
//				jsarray.add(innerJson);
//			}
//			json.put("eventList", jsarray);
//			response.setContentType("application/json");
//			response.getWriter().write(json.toString());
//		} catch (Exception e) {
//			JSONObject innerJson = new JSONObject();
//			innerJson.put("errorMessage",
//					"Some server error occured..Please try again later.");
//			response.setContentType("application/json");
//			e.printStackTrace();
//			try {
//				response.getWriter().write(innerJson.toString());
//			} catch (IOException error) {
//				error.printStackTrace();
//			}
//
//		}

	}

	@RequestMapping("/createevent")
	@ResponseBody
	public void createEvent(HttpServletRequest request, HttpServletResponse response) {

//		JSONObject recordAsJson = null;
//		JSONObject responseJson = new JSONObject();
//		String accessToken = null;
//
//		if ((request.getParameter("record") != null)
//				&& (request.getParameter("access_token") != null)) {
//			recordAsJson = getJSONObject(request.getParameter("record"));
//			accessToken = request.getParameter("access_token");
//		} else {
//			JSONObject jsonError = new JSONObject();
//			jsonError.put("errorMessage", "BAD REQUEST");
//			response.setContentType("application/json");
//			try {
//				response.getWriter().write(jsonError.toString());
//			} catch (IOException e) {
//				e.printStackTrace();
//			}
//		}
//		String start_date = (String) recordAsJson.get("start_date");
//		String end_date = (String) recordAsJson.get("end_date");
//		Date parsedEndDate = null;
//		Date parsedStartDate = null;
//		DateTime parsedStartDateTime = null;
//		DateTime parsedEndDateTime = null;
//		try {
//			if (start_date.contains(":") && end_date.contains(":")) {
//				start_date = start_date + "" + ":00";
//				end_date = end_date + "" + ":59";
//				SimpleDateFormat formatter = new SimpleDateFormat(
//						"yyyy-MM-dd HH:mm:ss");
//				parsedStartDate = formatter.parse(start_date);
//				parsedStartDateTime = new DateTime(parsedStartDate);
//				parsedEndDate = formatter.parse(end_date);
//				parsedEndDateTime = new DateTime(parsedEndDate);
//
//			} else if (start_date.contains(":") && !end_date.contains(":")) {
//				start_date = start_date + "" + ":00";
//				end_date = end_date + " " + "23:59:59";
//				SimpleDateFormat formatter = new SimpleDateFormat(
//						"yyyy-MM-dd HH:mm:ss");
//				parsedStartDate = formatter.parse(start_date);
//				parsedStartDateTime = new DateTime(parsedStartDate);
//				parsedEndDate = formatter.parse(end_date);
//				parsedEndDateTime = new DateTime(parsedEndDate);
//
//			} else if (!start_date.contains(":") && end_date.contains(":")) {
//				start_date = start_date + " " + "00:00:00";
//				end_date = end_date + "" + ":59";
//				SimpleDateFormat formatter = new SimpleDateFormat(
//						"yyyy-MM-dd HH:mm:ss");
//				parsedStartDate = formatter.parse(start_date);
//				parsedStartDateTime = new DateTime(parsedStartDate);
//				parsedEndDate = formatter.parse(end_date);
//				parsedEndDateTime = new DateTime(parsedEndDate);
//
//			} else if (!start_date.contains(":") && !end_date.contains(":")) {
//				start_date = start_date + " " + "00:00:00";
//				end_date = end_date + " " + "23:59:59";
//				SimpleDateFormat formatter = new SimpleDateFormat(
//						"yyyy-MM-dd HH:mm:ss");
//				parsedStartDate = formatter.parse(start_date);
//				parsedStartDateTime = new DateTime(parsedStartDate);
//				parsedEndDate = formatter.parse(end_date);
//				parsedEndDateTime = new DateTime(parsedEndDate);
//
//			} else {
//				start_date = start_date + " " + "00:00:00";
//				end_date = end_date + " " + "23:59:59";
//				SimpleDateFormat formatter = new SimpleDateFormat(
//						"yyyy-MM-dd HH:mm:ss");
//				parsedStartDate = formatter.parse(start_date);
//				parsedStartDateTime = new DateTime(parsedStartDate);
//				parsedEndDate = formatter.parse(end_date);
//				parsedEndDateTime = new DateTime(parsedEndDate);
//
//			}
//			if (parsedEndDate.compareTo(parsedStartDate) < 0) {
//				responseJson.put("errorMessage",
//						"Please check start date and end date");
//			} else {
//				CalendarService service = new CalendarService(
//						"Mobilous-Calendar");
//
//				service.setAuthSubToken(accessToken);
//				String url = "https://www.google.com/calendar/feeds/"
//						+ (String) recordAsJson.get("ownerEmail")
//						+ "/private/full";
//
//				URL postUrl = null;
//				postUrl = new URL(url);
//
//				CalendarEventEntry myEntry = new CalendarEventEntry();
//
//				myEntry.setTitle(new PlainTextConstruct((String) recordAsJson
//						.get("title")));
//				myEntry.setContent(new PlainTextConstruct((String) recordAsJson
//						.get("description")));
//				Where location = new Where();
//				location.setValueString((String) recordAsJson.get("place"));
//				myEntry.addLocation(location);
//				When eventTimes = new When();
//				eventTimes.setStartTime(parsedStartDateTime);
//				eventTimes.setEndTime(parsedEndDateTime);
//				myEntry.addTime(eventTimes);
//				Reminder mailReminder = new Reminder();
//				mailReminder.setMinutes(0);
//				mailReminder.setMethod(Method.EMAIL);
//				mailReminder.setMinutes(0);
//				myEntry.getReminder().add(mailReminder);
//				Reminder alertReminder = new Reminder();
//				alertReminder.setMinutes(0);
//				alertReminder.setMethod(Method.ALERT);
//				myEntry.getReminder().add(alertReminder);
//				// Send the request and receive the response:
//				CalendarEventEntry insertedEntry = service.insert(postUrl,
//						myEntry);
//				responseJson.put("status", "confirmed");
//				responseJson.put("eventid", insertedEntry.getEditLink()
//						.getHref() + "/" + insertedEntry.getEtag());
//
//			}
//
//			response.setContentType("application/json");
//			response.getWriter().write(responseJson.toString());
//		} catch (Exception e) {
//			responseJson
//					.put("errorMessage",
//							"Some Server Error Occured. Please try again or check you input");
//			response.setContentType("application/json");
//			try {
//				response.getWriter().write(responseJson.toString());
//			} catch (IOException e1) {
//
//			}
//		}

	}

	@RequestMapping("/updateevent")
	@ResponseBody
	public void updateEvent(HttpServletRequest request, HttpServletResponse response) {
//		JSONObject recordAsJson = null;
//		JSONObject responseJson = new JSONObject();
//		String accessToken = null;
//		CalendarEventEntry updateEntry = null;
//		if ((request.getParameter("record") != null)
//				&& (request.getParameter("access_token") != null)) {
//			recordAsJson = getJSONObject(request.getParameter("record"));
//			accessToken = request.getParameter("access_token");
//		} else {
//			JSONObject jsonError = new JSONObject();
//			jsonError.put("errorMessage", "BAD REQUEST");
//			response.setContentType("application/json");
//			try {
//				response.getWriter().write(jsonError.toString());
//			} catch (IOException e) {
//				e.printStackTrace();
//			}
//		}
//
//		CalendarEventEntry myEntry = new CalendarEventEntry();
//
//		String start_date = (String) recordAsJson.get("start_date");
//		String end_date = (String) recordAsJson.get("end_date");
//		Date parsedEndDate = null;
//		Date parsedStartDate = null;
//		DateTime parsedStartDateTime = null;
//		DateTime parsedEndDateTime = null;
//		try {
//			if (start_date.contains(":") && end_date.contains(":")) {
//				start_date = start_date + "" + ":00";
//				end_date = end_date + "" + ":59";
//				SimpleDateFormat formatter = new SimpleDateFormat(
//						"yyyy-MM-dd HH:mm:ss");
//				parsedStartDate = formatter.parse(start_date);
//				parsedStartDateTime = new DateTime(parsedStartDate);
//				parsedEndDate = formatter.parse(end_date);
//				parsedEndDateTime = new DateTime(parsedEndDate);
//
//			} else if (start_date.contains(":") && !end_date.contains(":")) {
//				start_date = start_date + "" + ":00";
//				end_date = end_date + " " + "23:59:59";
//				SimpleDateFormat formatter = new SimpleDateFormat(
//						"yyyy-MM-dd HH:mm:ss");
//				parsedStartDate = formatter.parse(start_date);
//				parsedStartDateTime = new DateTime(parsedStartDate);
//				parsedEndDate = formatter.parse(end_date);
//				parsedEndDateTime = new DateTime(parsedEndDate);
//
//			} else if (!start_date.contains(":") && end_date.contains(":")) {
//				start_date = start_date + " " + "00:00:00";
//				end_date = end_date + "" + ":59";
//				SimpleDateFormat formatter = new SimpleDateFormat(
//						"yyyy-MM-dd HH:mm:ss");
//				parsedStartDate = formatter.parse(start_date);
//				parsedStartDateTime = new DateTime(parsedStartDate);
//				parsedEndDate = formatter.parse(end_date);
//				parsedEndDateTime = new DateTime(parsedEndDate);
//
//			} else if (!start_date.contains(":") && !end_date.contains(":")) {
//				start_date = start_date + " " + "00:00:00";
//				end_date = end_date + " " + "23:59:59";
//				SimpleDateFormat formatter = new SimpleDateFormat(
//						"yyyy-MM-dd HH:mm:ss");
//				parsedStartDate = formatter.parse(start_date);
//				parsedStartDateTime = new DateTime(parsedStartDate);
//				parsedEndDate = formatter.parse(end_date);
//				parsedEndDateTime = new DateTime(parsedEndDate);
//
//			} else {
//				start_date = start_date + " " + "00:00:00";
//				end_date = end_date + " " + "23:59:59";
//				SimpleDateFormat formatter = new SimpleDateFormat(
//						"yyyy-MM-dd HH:mm:ss");
//				parsedStartDate = formatter.parse(start_date);
//				parsedStartDateTime = new DateTime(parsedStartDate);
//				parsedEndDate = formatter.parse(end_date);
//				parsedEndDateTime = new DateTime(parsedEndDate);
//
//			}
//
//			if (parsedEndDate.compareTo(parsedStartDate) < 0) {
//				responseJson.put("errorMessage",
//						"Please check start date and end date");
//			} else {
//
//				CalendarService service = new CalendarService(
//						"Mobilous-Calendar");
//				service.setAuthSubToken(accessToken);
//				String url = recordAsJson.get("eventid").toString();
//
//				myEntry.setTitle(new PlainTextConstruct((String) recordAsJson
//						.get("title")));
//
//				myEntry.setContent(new PlainTextConstruct((String) recordAsJson
//						.get("description")));
//				Where location = new Where();
//				location.setValueString((String) recordAsJson.get("place"));
//				myEntry.addLocation(location);
//				When eventTimes = new When();
//				eventTimes.setStartTime(parsedStartDateTime);
//				eventTimes.setEndTime(parsedEndDateTime);
//				myEntry.addTime(eventTimes);
//				String id = (String) recordAsJson.get("eventid");
//				myEntry.setId(id.substring(id.lastIndexOf("/") + 1, id.length()));
//				myEntry.setEtag("\"" + (String) recordAsJson.get("etag") + "\"");
//
//				URL updateURL = null;
//				updateURL = new URL(url);
//				updateEntry = service.update(updateURL, myEntry);
//
//			}
//			response.setContentType("application/json");
//			responseJson.put("status", "updated");
//			responseJson.put("eventid", updateEntry.getEditLink().getHref());
//			responseJson.put("etag", updateEntry.getEtag());
//			response.getWriter().write(responseJson.toString());
//		} catch (Exception e) {
//			e.printStackTrace();
//			responseJson
//					.put("errorMessage",
//							"Some server error occured. Please try again later or check your input values");
//			try {
//				response.getWriter().write(responseJson.toString());
//			} catch (IOException e1) {
//				e1.printStackTrace();
//			}
//		}

	}

	@RequestMapping("/deleteevent")
	@ResponseBody
	public void deleteEvent(HttpServletRequest request, HttpServletResponse response) {
//		JSONObject recordAsJson = null;
//		JSONObject responseJson = new JSONObject();
//		String accessToken = null;
//		CalendarEventEntry updateEntry = null;
//		if ((request.getParameter("record") != null)
//				&& (request.getParameter("access_token") != null)) {
//			recordAsJson = getJSONObject(request.getParameter("record"));
//			accessToken = request.getParameter("access_token");
//		} else {
//			JSONObject jsonError = new JSONObject();
//			jsonError.put("errorMessage", "BAD REQUEST");
//			response.setContentType("application/json");
//			try {
//				response.getWriter().write(jsonError.toString());
//			} catch (IOException e) {
//				e.printStackTrace();
//			}
//		}
//		try {
//			CalendarEventEntry myEntry = new CalendarEventEntry();
//
//			CalendarService service = new CalendarService("Mobilous-Calendar");
//			service.setAuthSubToken(accessToken);
//			String url = recordAsJson.get("eventid").toString();
//
//			String id = (String) recordAsJson.get("eventid");
//			myEntry.setId(id.substring(id.lastIndexOf("/") + 1, id.length()));
//			// myEntry.setEtag("\"" + (String) recordAsJson.get("etag") + "\"");
//			String etag = "\"" + (String) recordAsJson.get("etag") + "\"";
//			URL deleteURL = null;
//			deleteURL = new URL(url);
//			service.delete(deleteURL, etag);
//
//			response.setContentType("application/json");
//			responseJson.put("status", "deleted");
//
//			response.getWriter().write(responseJson.toString());
//		} catch (Exception e) {
//			e.printStackTrace();
//			responseJson
//					.put("errorMessage",
//							"Some server error occured. Please try again later or check your input values");
//			try {
//				response.getWriter().write(responseJson.toString());
//			} catch (IOException e1) {
//				e1.printStackTrace();
//			}
//		}

	}

	/* ***************** Others Utility Code Started *********** */

	private static JSONObject getJSONObject(String json) {
		JSONObject jsonObj = new JSONObject();
		try {
			jsonObj = (JSONObject) new JSONParser().parse(json);
		} catch (org.json.simple.parser.ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		return jsonObj;
	}

	/*
	 * public static void main(String[] args) throws IOException {
	 * GoogleAPIController gp = new GoogleAPIController(); HttpServletRequest
	 * request = null; HttpServletResponse response = null; //
	 * gp.searchContact(request, response); //
	 * gp.findCalendar(request,response); // //
	 * gp.deleteContact(request,response); // gp.createEvent(request, //
	 * response); // // // gp.findCalendar(request,response);
	 * 
	 * // gp.updateEvent(request, response); // gp.retrieveCalendar(request,
	 * response); }
	 */

	/* ***************** Others Utility Code Started *********** */
}
