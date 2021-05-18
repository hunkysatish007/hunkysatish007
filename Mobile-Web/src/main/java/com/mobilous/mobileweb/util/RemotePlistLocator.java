package com.mobilous.mobileweb.util;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.StringWriter;

import org.apache.commons.io.IOUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mobilous.mobileweb.controller.MobileWebController;

public class RemotePlistLocator implements PlistLocator {

	private static final Logger logger = LoggerFactory
			.getLogger(RemotePlistLocator.class);
	private String baseurl;

	public RemotePlistLocator(String baseurl) {
		super();
		this.baseurl = baseurl + "/";
	}

	@Override
	public InputStream getStream(String filename) {
		return getRemoteFile(baseurl + filename);
	}

	public static InputStream getRemoteFile(String url) {
		System.out.println("getRemoteFile: URL : " + url);
		try {
			HttpClient httpclient = new DefaultHttpClient();
			HttpGet httpget = new HttpGet(url);
			HttpResponse response = httpclient.execute(httpget);
			if(response.getStatusLine().getStatusCode() == 500 || response.getStatusLine().getStatusCode() == 400){
				//MobileWebController.loadEror(null, null);
				return null;
			}else{
				HttpEntity entity = response.getEntity();
				if (entity != null) {
					InputStream instream = entity.getContent();

					// BufferedReader in = new BufferedReader(new
					// InputStreamReader(instream));

					StringWriter writer = new StringWriter();
					IOUtils.copy(instream, writer);
					String theString = writer.toString();
					
					return new ByteArrayInputStream(theString.getBytes());
				}

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

}
