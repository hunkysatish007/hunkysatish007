/**
 * 
 */
package com.mobilous.mobileweb.controller;

import java.awt.image.BufferedImage;
import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller

public class DBRecordsUploadController {
	@RequestMapping(value = "/uploadFileToRemoteDB")
	@ResponseBody
	public void uploadFileToRemoteDB(HttpServletRequest request,HttpServletResponse response) {
		File media = null;
		try {
			
			//Mobserver.rb code
			/*post "/mobileweb/mobile/uploadFileToRemoteDB?" do

		        p "take photo  : params : #{params}"
		        data = request.body.read
		        port = 8080
		        host = $bean.ip_address

		        path = "/mobileweb/mobile/uploadFileToRemoteDB?baseURL=#{params['baseURL']}&database=#{params['database']}&tablename=#{params['tablename']}&projectid=#{params['projectid']}&userid=#{params['userid']&file=#{params['file']}"

		        req = Net::HTTP::Put.new(path, initheader = { 'Content-Type' => 'text/plain'})
		        req.body = data
		        response = Net::HTTP.new(host, port).start {|http| http.request(req) }
		        return response.body

		  end*/	
			
			
			// --- getting request parameters-----
			String charset = "UTF-8";
			String baseURL = request.getParameter("baseURL");
			String database = request.getParameter("database");
			String tablename = request.getParameter("tablename");
			
			String projectid = request.getParameter("projectid");
			String userid = request.getParameter("userid");
			String filename = request.getParameter("filename");
			
			System.out.println("request params are ::- database : " + database + ", tablename : " + tablename +", projectid : " + projectid + ", userid : " + userid  + ", filename : " + filename );
			
			// ----end of getting request parameters----

			// ----converting request payload into 'file'----
			
			InputStream inputStream = request.getInputStream();
			BufferedReader br = new BufferedReader(new InputStreamReader(inputStream));
			
			StringBuilder sb = new StringBuilder();
			String line;
			while ((line = br.readLine()) != null) {
				sb.append(line);
			}
			
			String strMedia = null;
			strMedia = sb.toString();
				
			media = new File(filename);
			try{
				byte[] bytes = strMedia.getBytes();			
				byte[] valueDecoded = Base64.decodeBase64(bytes);
				
				FileUtils.writeByteArrayToFile(media, valueDecoded);
				
			} catch (IOException e) {
				e.printStackTrace();
			}
			
			// -----conversion ends here------

			// Sending media-data to server..................
			
			String urlToConnect = baseURL + ":8181/commapi/comaction/uploadFileToRemoteDB";
			System.out.println("urlToConnect:: " + urlToConnect);
			
			MultipartUtility multipart = new MultipartUtility(urlToConnect, charset);
			
			/*This is to add parameter values */
			multipart.addFormField("database",database);
			multipart.addFormField("projectid",projectid);
			multipart.addFormField("userid",userid);
			multipart.addFormField("tablename",tablename);

            /*This is to add file content*/
			multipart.addFilePart("file",media);
			
			PrintWriter responseWriter = null;
			response.setContentType("application/json");
			responseWriter = response.getWriter();
			
            List<String> serverResponse = multipart.finish();
            
            for (String line1 : serverResponse) {
                System.out.println(line1);  
                responseWriter.println(line1);
            }
			responseWriter.close();
				
		
		}catch (IOException e) {
			e.printStackTrace();
		} finally {
			if(media != null)
				media.delete();
		}

	}
	
}

class MultipartUtility {
    private final String boundary;
    private static final String LINE_FEED = "\r\n";
    private HttpURLConnection httpConn;
    private String charset;
    private OutputStream outputStream;
    private PrintWriter writer;

    /**
     * This constructor initializes a new HTTP POST request with content type
     * is set to multipart/form-data
     *
     * @param requestURL
     * @param charset
     * @throws IOException
     */
    public MultipartUtility(String requestURL, String charset)
            throws IOException {
        this.charset = charset;

        // creates a unique boundary based on time stamp
        boundary = "===" + System.currentTimeMillis() + "===";
        URL url = new URL(requestURL);
        httpConn = (HttpURLConnection) url.openConnection();
        httpConn.setUseCaches(false);
        httpConn.setDoOutput(true);    // indicates POST method
        httpConn.setDoInput(true);
        httpConn.setRequestProperty("Content-Type",
                "multipart/form-data; boundary=" + boundary);
        outputStream = httpConn.getOutputStream();
        writer = new PrintWriter(new OutputStreamWriter(outputStream, charset),
                true);
    }

    /**
     * Adds a form field to the request
     *
     * @param name  field name
     * @param value field value
     */
    public void addFormField(String name, String value) {
    	 System.out.println("name------------"+name + " value------------"+value);
        writer.append("--" + boundary).append(LINE_FEED);
        writer.append("Content-Disposition: form-data; name=\"" + name + "\"")
                .append(LINE_FEED);
        writer.append("Content-Type: text/plain; charset=" + charset).append(
                LINE_FEED);
        writer.append(LINE_FEED);
        writer.append(value).append(LINE_FEED);
        writer.flush();
    }

    /**
     * Adds a upload file section to the request
     *
     * @param fieldName  name attribute in <input type="file" name="..." />
     * @param uploadFile a File to be uploaded
     * @throws IOException
     */
    public void addFilePart(String fieldName, File uploadFile)
            throws IOException {
        String fileName = uploadFile.getName();
        System.out.println("fileName------------"+fileName);
        System.out.println("file-length------------"+uploadFile.length());
        writer.append("--" + boundary).append(LINE_FEED);
        writer.append(
                "Content-Disposition: form-data; name=\"" + fieldName
                        + "\"; filename=\"" + fileName + "\"")
                .append(LINE_FEED);
        writer.append(
                "Content-Type: "
                        + URLConnection.guessContentTypeFromName(fileName))
                .append(LINE_FEED);
        writer.append("Content-Transfer-Encoding: binary").append(LINE_FEED);
        writer.append(LINE_FEED);
        writer.flush();

        FileInputStream inputStream = new FileInputStream(uploadFile);
        byte[] buffer = new byte[4096];
        int bytesRead = -1;
        while ((bytesRead = inputStream.read(buffer)) != -1) {
            outputStream.write(buffer, 0, bytesRead);
        }
        outputStream.flush();
        inputStream.close();
        writer.append(LINE_FEED);
        writer.flush();
    }

    /**
     * Adds a header field to the request.
     *
     * @param name  - name of the header field
     * @param value - value of the header field
     */
    public void addHeaderField(String name, String value) {
        writer.append(name + ": " + value).append(LINE_FEED);
        writer.flush();
    }

    /**
     * Completes the request and receives response from the server.
     *
     * @return a list of Strings as response in case the server returned
     * status OK, otherwise an exception is thrown.
     * @throws IOException
     */
    public List<String> finish() throws IOException {
        List<String> response = new ArrayList<String>();
        writer.append(LINE_FEED).flush();
        writer.append("--" + boundary + "--").append(LINE_FEED);
        writer.close();
        	
        // checks server's status code first
        int status = httpConn.getResponseCode();
        if (status == HttpURLConnection.HTTP_OK) {
            BufferedReader reader = new BufferedReader(new InputStreamReader(
                    httpConn.getInputStream()));
            String line = null;
            while ((line = reader.readLine()) != null) {
                response.add(line);
            }
            reader.close();
            httpConn.disconnect();
        } else {
            throw new IOException("Server returned non-OK status: " + status);
        }
        return response;
    }
}
