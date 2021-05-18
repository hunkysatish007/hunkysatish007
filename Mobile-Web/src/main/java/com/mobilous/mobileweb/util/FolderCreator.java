package com.mobilous.mobileweb.util;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class FolderCreator {

	public static void generateServerProjectFolders(Settings config, String folderName) {
		// you can create folder here for with ID and Projectid
		if(config.getType().equalsIgnoreCase("release")){
			createFolder(config.getProjectPath(), config.getKey1());
			createFolder(config.getProjectPath()+config.getKey1()+"/", config.getKey2());
		}else if(config.getType().equalsIgnoreCase("preview")){
			// first check if Mobileweb folder exists in /var/www/html/ or not ?
			File dir = new File("/var/www/html/mobileweb");
			if(!dir.exists()){
				createFolder("/var/www/html/", "mobileweb");
			}
			
			createFolder(config.getPreview_path(), config.getKey1());
			createFolder(config.getPreview_path()+config.getKey1()+"/", config.getKey2());
		}
		
		createFolder(config.getOutputDir(), folderName);
		createFolder(config.getOutputDir(), folderName + "/font");
		createFolder(config.getOutputDir(), folderName + "/css");
		createFolder(config.getOutputDir(), folderName + "/js");
		createFolder(config.getOutputDir(), folderName + "/images");
		createFolder(config.getOutputDir(), folderName+"/resources");

		try {
			copyFolder(
					new File(config.getServletPath()
							+ config.getResourcesFolder() + "font/"), new File(
							config.getOutputDir() + folderName + "/font/"));
			copyFolder(
					new File(config.getServletPath()
							+ config.getResourcesFolder() + "css/"), new File(
							config.getOutputDir() + folderName + "/css/"));
			copyFolder(
					new File(config.getServletPath()
							+ config.getResourcesFolder() + "js/"), new File(
							config.getOutputDir() + folderName + "/js/"));
			copyFolder(
					new File(config.getServletPath()
							+ config.getResourcesFolder() + "images/"),
					new File(config.getOutputDir() + folderName + "/images/"));
			
			copyFolder(
					new File(config.getServletPath()
							+ config.getResourcesFolder() + "images/"),
					new File(config.getOutputDir() + folderName + "/images/"));
			
			if(config.getType().equalsIgnoreCase("release")){
				//copyFolder(new File(config.getProjectPath()+"resources/"),new File(config.getOutputDir() + folderName + "/resources/"));
			}else{
				copyFolder(new File(config.getProjectPath()+"resources/"),new File(config.getOutputDir() + folderName + "/resources/"));
			}
			
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static void generateProjectFolders(String path, String folderName) {
		createFolder(path, folderName);
		createFolder(path, folderName + "/font");
		createFolder(path, folderName + "/css");
		createFolder(path, folderName + "/js");
		createFolder(path, folderName + "/images");
		// createFolder(path, folderName+"/images/system");
		// createFolder(path, folderName+"/images/resource");

		File fntSrc = new File("src/main/webapp/resources/font/");
		File fntDst = new File(path + folderName + "/font/");
		
		File cssSrc = new File("src/main/webapp/resources/css/");
		File cssDst = new File(path + folderName + "/css/");

		File jsSrc = new File("src/main/webapp/resources/js/");
		File jsDst = new File(path + folderName + "/js/");

		File imagesSrc = new File("src/main/webapp/resources/images/");
		File imagesDst = new File(path + folderName + "/images/");
		// File systemimagesSrc=new
		// File("src/main/webapp/resources/images/system/");
		// File systemimagesDst=new File(path+folderName+"/images/system/");
		// // File resourceimagesSrc=new
		// File("src/main/webapp/resources/images/resource/");
		// File resourceimagesDst=new File(path+folderName+"/images/resource/");

		try {
			copyFolder(fntSrc, fntDst);
			copyFolder(cssSrc, cssDst);
			copyFolder(jsSrc, jsDst);
			copyFolder(imagesSrc, imagesDst);
			// copyFolder(systemimagesSrc,systemimagesDst);
			// copyFolder(resourceimagesSrc,resourceimagesDst);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static boolean createFolder(String path, String folderName) {
		File f = new File(path + folderName);
		try {
			if (f.mkdir())
				return true;
			else
				return false;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public static void copyFolder(File srcFolder, File destFolder)
			throws IOException {
		if (srcFolder.isDirectory()) {
			if (!destFolder.exists()) {
				destFolder.mkdir();
			}

			String[] oChildren = srcFolder.list();
			for (int i = 0; i < oChildren.length; i++) {
				copyFolder(new File(srcFolder, oChildren[i]), new File(
						destFolder, oChildren[i]));
			}
		} else {
			if (destFolder.isDirectory()) {
				copyFile(srcFolder, new File(destFolder, srcFolder.getName()));
			} else {
				copyFile(srcFolder, destFolder);
			}
		}
	}

	public static void copyFile(File srcFile, File destFile) throws IOException {
		try{
			InputStream oInStream = new FileInputStream(srcFile);
			OutputStream oOutStream = new FileOutputStream(destFile);

			// Transfer bytes from in to out
			byte[] oBytes = new byte[1024];
			int nLength;
			BufferedInputStream oBuffInputStream = new BufferedInputStream(
					oInStream);
			while ((nLength = oBuffInputStream.read(oBytes)) > 0) {
				oOutStream.write(oBytes, 0, nLength);
			}
			oInStream.close();
			oOutStream.close();
		}catch (IOException ioe){
			System.out.println("No file found so some files are not copying..");
			//ioe.printStackTrace();
		}
		
	}
}
