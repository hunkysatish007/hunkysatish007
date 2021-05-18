package com.mobilous.mobileweb.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.Reader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.X509Certificate;

import javax.net.ssl.SSLSession;
import javax.net.ssl.X509TrustManager;


/**
 * @author Akhil Tyagi
 * 
 */

@Controller
public class ExternalPluginController {

	private static void disableSslVerification() {
	    try
	    {
	        // Create a trust manager that does not validate certificate chains
	        TrustManager[] trustAllCerts = new TrustManager[] {new X509TrustManager() {
	            public java.security.cert.X509Certificate[] getAcceptedIssuers() {
	                return null;
	            }
	            public void checkClientTrusted(X509Certificate[] certs, String authType) {
	            }
	            public void checkServerTrusted(X509Certificate[] certs, String authType) {
	            }
	        }
	        };

	        // Install the all-trusting trust manager
	        SSLContext sc = SSLContext.getInstance("SSL");
	        sc.init(null, trustAllCerts, new java.security.SecureRandom());
	        HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());

	        // Create all-trusting host name verifier
	        HostnameVerifier allHostsValid = new HostnameVerifier() {
	            public boolean verify(String hostname, SSLSession session) {
	                return true;
	            }
	        };

	        // Install the all-trusting host verifier
	        HttpsURLConnection.setDefaultHostnameVerifier(allHostsValid);
	    } catch (NoSuchAlgorithmException e) {
	        e.printStackTrace();
	    } catch (KeyManagementException e) {
	        e.printStackTrace();
	    }
	}
	
	@RequestMapping(value = "/extsvc")
	@ResponseBody
	public void getAuthorizationURL(HttpServletRequest request, HttpServletResponse response) {
		String urlToConnect = request.getParameter("uri").toString().replace("https", "http");
		//System.setProperty("sun.security.ssl.allowUnsafeRenegotiation", "true");
		HttpURLConnection con = null;
		try {
			
			//disableSslVerification();
			
			System.out.println("The Request to Commservrer from MW is >"+urlToConnect);
			
			con = (HttpURLConnection) new URL(urlToConnect).openConnection();
			
			final Reader reader = new InputStreamReader(con.getInputStream());
	        final BufferedReader br = new BufferedReader(reader);
	        
	        String test = "";
			PrintWriter printWriter = response.getWriter();
			for (String resp = ""; (resp = br.readLine()) != null;) {
				test = test + "" + resp;
			}
			
			System.out.println("The Response from the Comm-Server(JBAT Plugin) is :");
			System.out.println(test);
	        
			JSONObject respJSON = new JSONObject();
			respJSON.put("authURL", test);
			
			printWriter.write(respJSON.toJSONString());
	        
	        br.close();
	        printWriter.close();
	        if(con != null){
	        	con.disconnect();
	        	
	        }
	        
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			con.disconnect();
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}catch(Exception e){
			con.disconnect();
			e.printStackTrace();
		}
		
	}


	/*@RequestMapping(value = "/extsvc")
	@ResponseBody
	public void getAuthorizationURL(HttpServletRequest request, HttpServletResponse response) {
		String urlToConnect = request.getParameter("uri");
		HttpURLConnection con = null;
		try {
			// Create a trust manager that does not validate certificate chains
	        TrustManager[] trustAllCerts = new TrustManager[] { new X509TrustManager() {
	            public java.security.cert.X509Certificate[] getAcceptedIssuers() {
	                return null;
	            }
	            public void checkClientTrusted(X509Certificate[] certs, String authType) {
	            }
	            public void checkServerTrusted(X509Certificate[] certs, String authType) {
	            }
	        } };
	        
	        // Install the all-trusting trust manager
	        final SSLContext sc = SSLContext.getInstance("SSL");
	        
	        try {
				sc.init(null, trustAllCerts, new java.security.SecureRandom());
				
				HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());
		        // Create all-trusting host name verifier
		        HostnameVerifier allHostsValid = new HostnameVerifier() {
		            public boolean verify(String hostname, SSLSession session) {
		                return true;
		            }
		        };

		        // Install the all-trusting host verifier
		        HttpsURLConnection.setDefaultHostnameVerifier(allHostsValid);
		        
		        System.out.println("The Authenticate URL send from MW to Comm-Server is : ");
		        System.out.println(urlToConnect);
		        
		        URL url = new URL(urlToConnect);
		        con = (HttpURLConnection) url.openConnection();
		        final Reader reader = new InputStreamReader(con.getInputStream());
		        final BufferedReader br = new BufferedReader(reader);
		        
		        String test = "";
				PrintWriter printWriter = response.getWriter();
				for (String resp = ""; (resp = br.readLine()) != null;) {
					test = test + "" + resp;
				}
				
				System.out.println("The Response from the Comm-Server(JBAT Plugin) is :");
				System.out.println(test);
		        
				JSONObject respJSON = new JSONObject();
				respJSON.put("authURL", test);
				
				printWriter.write(respJSON.toJSONString());
		        
		        br.close();
		        
		        if(con != null){
		        	con.disconnect();
		        }
		        
			} catch (KeyManagementException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	        			
	        
			HttpsURLConnection connection = (HttpsURLConnection) new URL(urlToConnect).openConnection();
			InputStream stream = connection.getInputStream();
			BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(stream));
			
			String test = "";
			PrintWriter printWriter = response.getWriter();
			for (String resp = ""; (resp = bufferedReader.readLine()) != null;) {
				// printWriter.println(resp);
				test = test + "" + resp;
			}
			
			System.out.println(test);
			
			JSONObject respJSON = new JSONObject();
			respJSON.put("targetId", request.getParameter("uiName"));
			respJSON.put("textData", test);
			printWriter.write("$.utility(\"processTextFileData\" ," + respJSON.toJSONString() + ");");
			System.out.println(test);
			connection.disconnect();

		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
*/

}
