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

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class MediaUploadController {

	@RequestMapping(value = "/uploadMedia")
	@ResponseBody
	public void uploadMedia(HttpServletRequest request,	HttpServletResponse response) {
		File media = null;
		try {
			
			//Mobserver.rb code
			/*post "/mobileweb/mobile/uploadMedia?" do

		        p "take photo  : params : #{params}"
		        data = request.body.read
		        port = 8080
		        host = $bean.ip_address

		        path = "/mobileweb/mobile/uploadMedia?baseURL=#{params['baseURL']}&ak=#{params['ak']}&version=#{params['version']}&mediaName=#{params['mediaName']}&mediaType=#{params['mediaType']}&isThumbnail=#{params['isThumbnail']}&isMongo=#{params['isTargetMongo']}"

		        req = Net::HTTP::Put.new(path, initheader = { 'Content-Type' => 'text/plain'})
		        req.body = data
		        response = Net::HTTP.new(host, port).start {|http| http.request(req) }
		        return response.body

		  end*/	
			
			
			// --- getting request parameters-----

			String baseURL = request.getParameter("baseURL");
			String ak = request.getParameter("ak");
			
			String mediaName = request.getParameter("mediaName");
			String mediaType = request.getParameter("mediaType");
			String version = request.getParameter("version");
			String isThumbnail = request.getParameter("isThumbnail");
			String isTargetMongo = request.getParameter("isMongo");
			System.out.println("request params are ::- Name : " + mediaName + ", Type : " + mediaType +", isThumbnail : " + isThumbnail + ", isTargetMongo : " + isTargetMongo);
			
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
			if(mediaType.toLowerCase().contains("image".toLowerCase()))
				strMedia = sb.toString().substring(sb.toString().indexOf(",") + 1, sb.toString().length());
			else if(mediaType.toLowerCase().contains("sound".toLowerCase()))
				strMedia = sb.toString().replace("data:audio/wav;base64,", "").replace(" ", "+");
			else if(mediaType.toLowerCase().contains("video".toLowerCase()))
				strMedia = sb.toString();
				
			media = new File(mediaName);
			try{
				byte[] bytes = strMedia.getBytes();			
				byte[] valueDecoded = Base64.decodeBase64(bytes);
				
				FileUtils.writeByteArrayToFile(media, valueDecoded);
				
			} catch (IOException e) {
				e.printStackTrace();
				
				//manage exception as per media-type
				if(mediaType.toLowerCase().contains("image".toLowerCase())){
					BufferedImage newImg = this.decodeToImage(strMedia);
					ImageIO.write(newImg, "jpg", media);
				}
			}
			
			// -----conversion ends here------

			// Sending media-data to server..................
			
			String charset = "UTF-8";
			String param = "value";
			String boundary = Long.toHexString(System.currentTimeMillis()); // Just generate some unique random value.
			String CRLF = "\r\n"; // Line separator required by multipart/form-data.
			
			
			String urlToConnect = baseURL + ":8181/commapi/commaction/llcommmedia/"
					+ "?ak=" + ak + "&version=" + version + "&os=mw";
			
			if(mediaType.toLowerCase().contains("image".toLowerCase())){
				urlToConnect = urlToConnect.concat("&isimage=1");
				if(isThumbnail != null && isThumbnail.equals("true"))
					urlToConnect = urlToConnect.concat("&isthumbnail=1");
				if(isTargetMongo != null){
					if(isTargetMongo.equals("true"))
						urlToConnect = urlToConnect.concat("&istargetmongo=1");
					else
						urlToConnect = urlToConnect.concat("&istargetmongo=0");
				}
			}
			else if(mediaType.toLowerCase().contains("video".toLowerCase())){
				urlToConnect = urlToConnect.concat("&isvideo=1");
				if(isThumbnail != null && isThumbnail.equals("true"))
					urlToConnect = urlToConnect.concat("&isthumbnail=1");
				if(isTargetMongo != null){
					if(isTargetMongo.equals("true"))
						urlToConnect = urlToConnect.concat("&ismongo=1");
					else
						urlToConnect = urlToConnect.concat("&ismongo=0");
				}
			}
			System.out.println("urlToConnect:: " + urlToConnect);
			
			URLConnection connection = new URL(urlToConnect).openConnection();
			connection.setDoOutput(true);
			connection.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + boundary);
			
			PrintWriter writer = null;
			try {
				OutputStream output = connection.getOutputStream();
				writer = new PrintWriter(new OutputStreamWriter(output, charset), true); 		// true = autoFlush,	!-- important --!

				// Send normal parameter.
				writer.append("--" + boundary).append(CRLF);
				writer.append("Content-Disposition: form-data; name=\"param\"").append(CRLF);
				writer.append("Content-Type: text/plain; charset=" + charset).append(CRLF);
				writer.append(CRLF);
				writer.append(param).append(CRLF).flush();

				// Send binary file.
				writer.append("--" + boundary).append(CRLF);
				writer.append(
						"Content-Disposition: form-data; name=\"binaryFile\"; filename=\""
								+ media.getName() + "\"").append(CRLF);
				if(mediaType.toLowerCase().contains("video".toLowerCase())) {
					writer.append("Content-Type: video/mp4").append(CRLF);
				}else {
					writer.append(
							"Content-Type: "
									+ URLConnection.guessContentTypeFromName(media
											.getName())).append(CRLF);
				}
				writer.append("Content-Transfer-Encoding: binary").append(CRLF);
				writer.append(CRLF).flush();
				
				//System.out.println("media-name:: " + media.getName() + "*************" + URLConnection.guessContentTypeFromName(media.getName()));
				
				InputStream input = null;
				try {
					input = new FileInputStream(media);
					byte[] buffer = new byte[1024];
					for (int length = 0; (length = input.read(buffer)) > 0;) {
						output.write(buffer, 0, length);
					}
					output.flush(); // Important! Output cannot be closed.
									// Closing of writer will close output as well.
				}catch(Exception e){
					e.printStackTrace();
				}finally {
					if (input != null)
						try {
							input.close();
						} catch (IOException logOrIgnore) {
						}
				}
				writer.append(CRLF).flush(); // CRLF is important! 
											 // It indicates end of binary boundary.
				
				// End of multipart/form-data.
				writer.append("--" + boundary + "--").append(CRLF);

			} finally {
				if (writer != null)
					writer.close();
			}

			// ---Media sent to the server----

			// ----Handling response-----
			
			DataInputStream inStream = null;
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
			if(media != null)
				media.delete();
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
			java.util.Base64.Decoder decoder = java.util.Base64.getDecoder();
			imageByte = decoder.decode(imageString);
			ByteArrayInputStream bis = new ByteArrayInputStream(imageByte);
			image = ImageIO.read(bis);
			bis.close();
			
			if(image == null){
				java.util.Base64.Encoder mimeEncoder = java.util.Base64.getMimeEncoder();
				String mimeEncoded = mimeEncoder.encodeToString(imageString.getBytes());
				
				java.util.Base64.Decoder mimeDecoder = java.util.Base64.getMimeDecoder();
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
