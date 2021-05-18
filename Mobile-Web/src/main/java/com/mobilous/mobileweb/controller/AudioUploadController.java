/**
 * 
 */
package com.mobilous.mobileweb.controller;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.URL;
import java.net.URLConnection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class AudioUploadController {

	@RequestMapping(value = "/uploadAudio")
	@ResponseBody
	public void uploadImage(HttpServletRequest request,
			HttpServletResponse response) throws IOException, InterruptedException{
		File mp3File = null;
		try {
			// --- getting request parameters-----

			//String llCommand = request.getParameter("llcommand");
			String ak = request.getParameter("ak");
			//String command = request.getParameter("command");
			//String dataset = request.getParameter("dataset");
			//String baseURL = request.getParameter("baseURL").toString().replace("https", "http");
			String mediaName = request.getParameter("mediaName");
			
			String baseURL = request.getParameter("baseURL");
			String version = "1.0";	//request.getParameter("version");
			
			InputStream inputStream = request.getInputStream();

			// ----end of handling request parameters----

			// ----converting request payload into AUDIO file----

			mp3File = new File(mediaName);

			BufferedReader br = new BufferedReader(new InputStreamReader(inputStream));
			StringBuilder sb = new StringBuilder();
			String line;
			while ((line = br.readLine()) != null) {
				sb.append(line);
			}
			
			String str = sb.toString().replace("data:audio/wav;base64,", "");
			str = str.replace(" ", "+");
			try{
				byte[] bytes = str.getBytes();
				byte[] valueDecoded = Base64.decodeBase64(bytes);

				FileUtils.writeByteArrayToFile(mp3File, valueDecoded);
				
			} catch (IOException e) {
				e.printStackTrace();
			}
			
			String charset = "UTF-8";
			String param = "value";
			String boundary = Long.toHexString(System.currentTimeMillis()); // Just generate some unique random value.
			String CRLF = "\r\n"; // Line separator required by multipart/form-data.
			
			String urlToConnect = baseURL + ":8181/commapi/commaction/llcommmedia/"
					+ "?ak=" + ak + "&version=" + version + "&os=mw";
			
			URLConnection connection = new URL(urlToConnect).openConnection();
			connection.setDoOutput(true);
			connection.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + boundary);
			
			PrintWriter writer = null;
			try  {
				OutputStream output = connection.getOutputStream();

				writer = new PrintWriter(new OutputStreamWriter(output, charset), true);

				// Send normal param.
				writer.append("--" + boundary).append(CRLF);
				writer.append("Content-Disposition: form-data; name=\"param\"")
				.append(CRLF);
				writer.append("Content-Type: text/plain; charset=" + charset)
				.append(CRLF);
				writer.append(CRLF);
				writer.append(param).append(CRLF).flush();

				// Send binary file.
				writer.append("--" + boundary).append(CRLF);
				writer.append(
						"Content-Disposition: form-data; name=\"binaryFile\"; filename=\""
								+ mp3File.getName() + "\"").append(CRLF);
				writer.append(
						"Content-Type: "
								+ URLConnection.guessContentTypeFromName(mp3File
										.getName())).append(CRLF);
				writer.append("Content-Transfer-Encoding: binary").append(CRLF);
				writer.append(CRLF).flush();
				InputStream input = null;
				try {
					input = new FileInputStream(mp3File);
					byte[] buffer = new byte[1024];
					for (int length = 0; (length = input.read(buffer)) > 0;) {
						output.write(buffer, 0, length);
					}
					output.flush(); // Important! Output cannot be closed. Close
					// of
					// writer will close output as well.
				}catch(Exception e){
					e.printStackTrace();
				}finally {
					if (input != null)
						try {
							input.close();
						} catch (IOException logOrIgnore) {
						}
				}
				writer.append(CRLF).flush(); // CRLF is important! It indicates
				// end
				// of binary boundary.
				// End of multipart/form-data.
				writer.append("--" + boundary + "--").append(CRLF);

			} catch(Exception e){
				e.printStackTrace();
			}finally {
				if (writer != null)
					writer.close();
				
			}
			// ----handling respoonse-----
			PrintWriter responseWriter = null;
			DataInputStream inStream = null;
			try {
				inStream = new DataInputStream(connection.getInputStream());
				BufferedReader bufferedReader = new BufferedReader(
						new InputStreamReader(inStream));

				response.setContentType("application/json");
				responseWriter = response.getWriter();
				for (String resp = ""; (resp = bufferedReader.readLine()) != null;) {
					responseWriter.println(resp);
				}
				inStream.close();
				responseWriter.close();

			} catch (IOException ioex) {
				System.out.println("From (ServerResponse): " + ioex);

			} finally {
				if(inStream != null)
					inStream.close();
				if(responseWriter != null)
					responseWriter.close();
			}

			// ----response handled-------
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			mp3File.delete();
		}

	}

}
