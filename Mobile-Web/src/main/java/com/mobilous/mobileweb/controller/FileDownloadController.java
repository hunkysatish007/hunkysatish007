package com.mobilous.mobileweb.controller;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

 
@Controller
public class FileDownloadController {

	@RequestMapping(value = "/downloadImage")
	@ResponseBody
	public void doDownload(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		String imageUrl = request.getParameter("baseURL").toString()
				+ "/images/" + request.getParameter("imageid").toString().replace("https","http");
		URL url = new URL(imageUrl);
		InputStream is = url.openStream();

		BufferedImage newImg = ImageIO.read(is);
		File file = new File(request.getParameter("imageid").toString()
				+ ".jpg");
		ImageIO.write(newImg, "jpg", file);
		response.setContentType("application/octet-stream");
		response.setContentLength((int) file.length());
		response.setHeader("Content-Disposition",
				String.format("attachment; filename=\"%s\"", file.getName()));
		OutputStream output = response.getOutputStream();
		InputStream input = null;
		try {
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
					file.delete();
					newImg.flush();
				} catch (IOException logOrIgnore) {
				}
		}

	}
}