/**
 * 
 */
package com.mobilous.mobileweb.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author Sachit Kesri
 * 
 */

@Controller
public class FileReaderController {

	@RequestMapping(value = "/readFile")
	@ResponseBody
	public void uploadImage(HttpServletRequest request,
			HttpServletResponse response) {
		String urlToConnect = request.getParameter("uri");
		try {
			if(!urlToConnect.equalsIgnoreCase("")){
				HttpURLConnection connection = (HttpURLConnection) new URL(
						urlToConnect).openConnection();
				InputStream stream = connection.getInputStream();
				BufferedReader bufferedReader = new BufferedReader(
						new InputStreamReader(stream));
				String test = "";
				PrintWriter printWriter = response.getWriter();
				for (String resp = ""; (resp = bufferedReader.readLine()) != null;) {
					test = test + "" + resp;
				}
				JSONObject respJSON = new JSONObject();
				respJSON.put("targetId", request.getParameter("uiName"));
				respJSON.put("textData", test);
				printWriter.write("$.utility(\"processTextFileData\" ," + respJSON.toJSONString() + ");");
				
				connection.disconnect();
			}else{
				PrintWriter printWriter = response.getWriter();
				JSONObject respJSON = new JSONObject();
				respJSON.put("targetId", request.getParameter("uiName"));
				respJSON.put("textData", "Please give the File URL ");
				printWriter.write("$.utility(\"processTextFileData\" ," + respJSON.toJSONString() + ");");
				
			}
			

		}catch (Exception e) {
			PrintWriter printWriter;
			try {
				printWriter = response.getWriter();
				JSONObject respJSON = new JSONObject();
				respJSON.put("targetId", request.getParameter("uiName"));
				respJSON.put("textData", "Error occured while loading the file");
				printWriter.write("$.utility(\"processTextFileData\" ," + respJSON.toJSONString() + ");");
				e.printStackTrace();
			} catch (IOException e1) {
				e1.printStackTrace();
			}
		}
	}
}
