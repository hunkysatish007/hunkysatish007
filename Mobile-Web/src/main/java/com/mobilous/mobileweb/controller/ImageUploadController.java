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
import java.net.URL;
import java.net.URLConnection;
import java.util.Base64;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author Sachit Kesri
 * 
 */

@Controller
public class ImageUploadController {

	@RequestMapping(value = "/uploadImage")
	@ResponseBody
	public void uploadImage(HttpServletRequest request,
			HttpServletResponse response) {
		File file = null;
		try {
			// --- getting request parameters-----

			//String llCommand = request.getParameter("llcommand");
			String ak = request.getParameter("ak");
			//String command = request.getParameter("command");
			//String dataset = request.getParameter("dataset");
			//String baseURL = request.getParameter("baseURL").toString().replace("https", "http");
			String imageName = request.getParameter("imageName");
			
			String baseURL = request.getParameter("baseURL");
			String version = request.getParameter("version");
			String isThumbnail = request.getParameter("isThumbnail");
			String isTargetMongo = request.getParameter("isMongo");
			System.out.println("request params are ::- isTargetMongo : " + isTargetMongo + ", isThumbnail : " + isThumbnail);
			
			InputStream inputStream = request.getInputStream();

			// ----end of handling request parameters----

			// ----converting request payload into IMAGE file----

			BufferedReader br = new BufferedReader(new InputStreamReader(inputStream));
			StringBuilder sb = new StringBuilder();
			String line;
			while ((line = br.readLine()) != null) {
				sb.append(line);
			}
			
			String strImg = sb.toString().substring(sb.toString().indexOf(",") + 1, sb.toString().length());
			file = new File(imageName);
			try{
				byte[] bytes = strImg.getBytes();			
				byte[] valueDecoded = org.apache.commons.codec.binary.Base64.decodeBase64(bytes);
				
				FileUtils.writeByteArrayToFile(file, valueDecoded);
				
			} catch (IOException e) {
				e.printStackTrace();
				
				BufferedImage newImg = this.decodeToImage(strImg);
				ImageIO.write(newImg, "jpg", file);
			}
			
			// -----conversion ends here------

			// Sending Image to server..................

//			String urlToConnect_old = baseURL
//					+ ":8080/commapi/comaction/llcomm/?llcommand=sndmsg&ak="
//					+ ak + "&command=remoteselect&dataset=" + dataset
//					+ "&baseURL=" + baseURL;
			
			String urlToConnect = baseURL + ":8181/commapi/commaction/llcommmedia/"
					+ "?ak=" + ak + "&version=" + version + "&os=mw&isimage=1";
			
			if(isThumbnail != null && isThumbnail.equals("true"))
				urlToConnect = urlToConnect.concat("&isthumbnail=1");
			if(isTargetMongo != null){
				if(isTargetMongo.equals("true"))
					urlToConnect = urlToConnect.concat("&istargetmongo=1");
				else
					urlToConnect = urlToConnect.concat("&istargetmongo=0");
			}
			
			String boundary = Long.toHexString(System.currentTimeMillis());
			String param = "value";
			DataInputStream inStream = null;
			String CRLF = "\r\n"; // Line separator required by multipart/form-data.
			String charset = "UTF-8";
			
			URLConnection connection = new URL(urlToConnect).openConnection();
			connection.setDoOutput(true);// it is to indicate post method call
			connection.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + boundary);
			
			PrintWriter writer = null;
			try {
				OutputStream output = connection.getOutputStream();
				writer = new PrintWriter(new OutputStreamWriter(output, charset), true); 		// true = autoFlush,	!-- important --!

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
								+ file.getName() + "\"").append(CRLF);
				writer.append(
						"Content-Type: "
								+ URLConnection.guessContentTypeFromName(file
										.getName())).append(CRLF);
				writer.append("Content-Transfer-Encoding: binary").append(CRLF);
				writer.append(CRLF).flush();
				
				InputStream input = null;
				try {
					System.out.println("urlToConnect:: " + urlToConnect);
					input = new FileInputStream(file);
					byte[] buffer = new byte[1024];
					for (int length = 0; (length = input.read(buffer)) > 0;) {
						output.write(buffer, 0, length);
					}
					output.flush(); // Important! Output cannot be closed. Close
									// of
									// writer will close output as well.
				} finally {
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

			} finally {
				if (writer != null)
					writer.close();
			}

			// ---Image sent to the server----

			// ----handling respoonse-----
			PrintWriter responseWriter = null;
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

		} catch (IOException e) {

			e.printStackTrace();
		} finally {
			file.delete();
		}

	}

	/**
	 * Decode string to image
	 * 
	 * @param imageString
	 *            The string to decode
	 * @return decoded image
	 */
	public BufferedImage decodeToImage(String imageString) {

		BufferedImage image = null;
		byte[] imageByte;
		try {
			Base64.Decoder decoder = Base64.getDecoder();
			imageByte = decoder.decode(imageString);
			ByteArrayInputStream bis = new ByteArrayInputStream(imageByte);
			image = ImageIO.read(bis);
			bis.close();
			
			if(image == null){
				Base64.Encoder mimeEncoder = java.util.Base64.getMimeEncoder();
				String mimeEncoded = mimeEncoder.encodeToString(imageString.getBytes());
				
				Base64.Decoder mimeDecoder = java.util.Base64.getMimeDecoder();
				imageByte = mimeDecoder.decode(mimeEncoded);
				
				ByteArrayInputStream mimeBis = new ByteArrayInputStream(imageByte);
				image = ImageIO.read(mimeBis);
				
				mimeBis.close();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return image;
	}

}
