package com.mobilous.mobileweb.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;

public class LocalPlistLocator implements PlistLocator {

	private String path;

	public LocalPlistLocator(Settings settings) {
		super();
		this.path = settings.getProjectPath();
	}

	@Override
	public InputStream getStream(String filename) {
		System.out.println(filename);
		File file = new File(this.path + filename);
		try {
			return new FileInputStream(file);
		} catch (FileNotFoundException e) {
			System.out.println("FILE DOES NOT EXIST: " + filename);
			// TODO Auto-generated catch block
			// e.printStackTrace();
		}
		return null;
	}

}
