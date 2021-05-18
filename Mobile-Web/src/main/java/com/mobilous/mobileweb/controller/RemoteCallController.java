/**
 * 
 */
package com.mobilous.mobileweb.controller;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class RemoteCallController {

	@RequestMapping(value = "/remoteRequest")
	@ResponseBody
	public void remoteRequest(HttpServletRequest request, HttpServletResponse response) {
		HttpURLConnection httpcon = null;
		
		try {
			
			//Mobserver.rb code
			/*		  
			  post "/mobileweb/mobile/remoteRequest?" do
	
			        p "remote request  : params : #{params}"
			        data = request.body.read
			        port = 8080
			        host = $bean.ip_address
			
			        path = "/mobileweb/mobile/remoteRequest?baseURL=#{params['baseURL']}"
			        
			        req = Net::HTTP::Put.new(path, initheader = { 'Content-Type' => 'text/plain'})
			        req.body = data
			        response = Net::HTTP.new(host, port).start {|http| http.request(req) }
			        return response.body
			
			  end
			  
			*/	
			
			
			// --- getting request parameters-----			
			
//			BufferedReader br = request.getReader();	//new BufferedReader(new InputStreamReader(request.getInputStream()));
//			StringBuilder sb = new StringBuilder();
//			try {
//				String strRequest;
//				while ((strRequest = br.readLine()) != null) {
//					System.out.println("request params :- "+ strRequest);
//					sb.append(strRequest);
//				}
//				System.out.println(strRequest+ " .... request data :- "+ sb);
//			 } finally {
//		        br.close();
//		    }
			
			String requestData = request.getReader().lines().collect(Collectors.joining());
			//System.out.println(" .... request data 2 :- "+ requestData);
			byte[] postData = requestData.getBytes(StandardCharsets.UTF_8);
			
			String baseURL = request.getParameter("baseURL");
			
//			String llCommand = request.getParameter("llcommand");
//			String command = request.getParameter("command");
//			String jsonp = request.getParameter("jsonp");
//			String ak = request.getParameter("ak");
//			String cache = request.getParameter("cache");
//			String dataset = request.getParameter("dataset");
//			String callbackdata = request.getParameter("callbackdata");
//			
//			String projectid = request.getParameter("project_id");
//			String version = request.getParameter("version");
//			System.out.println("request params are ::- Command : " + command + ", Method : " + jsonp + ", Project-id : " + projectid +", Version : " + version);
			
			// ----end of getting request parameters----
			

			// ----converting request payload into 'file'----		
			
			// -----conversion ends here------
			

			// Sending request-data to server..................
			
			
			String urlToConnect = baseURL + ":8181/commapi/comaction/llcommpost/";
			//		+ "?llcommand="+ llCommand +"&command="+ command +"&jsonp="+ jsonp +"&ak="+ ak +"&cache="+ cache +"&projectid="+ projectid +"&version="+ version +"&os=mw&dataset="+ dataset
			//		+ "&callbackdata=" + callbackdata;
			
			System.out.println("urlToConnect:: " + urlToConnect);
			
			
			URLConnection connection = new URL(urlToConnect).openConnection();
			httpcon = (HttpURLConnection)connection;
			httpcon.setRequestMethod("POST");
			httpcon.setDoOutput(true);
			
			int length = postData.length;	
			httpcon.setFixedLengthStreamingMode(length);
			httpcon.setRequestProperty("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
			//httpcon.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
			httpcon.connect();
			try {
				OutputStream os = httpcon.getOutputStream();
			    os.write(postData);
			} catch (IOException ioex) {
				System.out.println("Error--- " + ioex);
			}

			// --- request sent to the server----

			// ----Handling response-----
			
			DataInputStream inStream = null;
			PrintWriter responseWriter = null;
			
			try {
				responseWriter = response.getWriter();
				response.setContentType("application/javascript");
				response.setCharacterEncoding("UTF-8");
				System.out.println("Response Code : " + httpcon.getResponseCode());
				
				inStream = new DataInputStream(httpcon.getInputStream());
				BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inStream));
				for (String resp = ""; (resp = bufferedReader.readLine()) != null;) {
					//System.out.println("content ---->>> " + resp);
					responseWriter.print(resp);
				}
				inStream.close();
				responseWriter.close();
				
				 
//				BufferedReader in = new BufferedReader(new InputStreamReader(httpcon.getInputStream()));
//                StringBuilder content = new StringBuilder();
//                String line;
//                while ((line = in.readLine()) != null) {
//                    content.append(line);
//                    content.append(System.lineSeparator());
//                }
//                System.out.println("content ---->>> " + content.toString());
                

			} catch (IOException ioex) {
				System.out.println("Error From ServerResponse: " + ioex);

			} finally {
				if(inStream != null)
					inStream.close();
				if(responseWriter != null) {
					responseWriter.close();
					responseWriter.flush(); 
				}
			}

			// ----response handled-------

		} catch (IOException e) {

			e.printStackTrace();
		} finally {
			
			httpcon.disconnect();
		}

	}



}
