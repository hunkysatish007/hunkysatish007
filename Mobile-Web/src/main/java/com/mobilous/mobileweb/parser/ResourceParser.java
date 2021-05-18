package com.mobilous.mobileweb.parser;

import java.util.ArrayList;

import com.dd.plist.NSDictionary;
import com.dd.plist.NSNumber;
import com.dd.plist.NSObject;
import com.mobilous.mobileweb.resource.*;
import com.mobilous.mobileweb.util.PlistLocator;

public class ResourceParser extends ADFParser {

	public ResourceParser(PlistLocator locator) {
		super(locator,MODE);
	}

	public static ArrayList<Images>parseImages(NSObject[] obj) throws Exception {
		ArrayList<Images> ImagesList = new ArrayList<Images>();
		for (NSObject o : obj) {
			NSDictionary dic = (NSDictionary) o;
			Images images = new Images();
			for (String key : dic.allKeys()) {
				if (key.equalsIgnoreCase("filename"))
					images.setFilename((dic.objectForKey(key)).toString());
				else if (key.equalsIgnoreCase("resourceid"))
					images.setId(((NSNumber) dic.objectForKey(key)).intValue());
			}
			ImagesList.add(images);
		}
		return ImagesList;
	}
	
	public static ArrayList<BGMS>parseBGMS(NSObject[] obj) throws Exception {
		ArrayList<BGMS> BgmsList = new ArrayList<BGMS>();
		for (NSObject o : obj) {
			NSDictionary dic = (NSDictionary) o;
			BGMS bgms = new BGMS();
			for (String key : dic.allKeys()) {
				if (key.equalsIgnoreCase("filename"))
					bgms.setFilename((dic.objectForKey(key)).toString());
				else if (key.equalsIgnoreCase("resourceid"))
					bgms.setId(((NSNumber) dic.objectForKey(key)).intValue());
			}
			BgmsList.add(bgms);
		}
		return BgmsList;
	}
	
	public static ArrayList<Databases>parseDatabases(NSObject[] obj) throws Exception {
		ArrayList<Databases> DatabasesList = new ArrayList<Databases>();
		for (NSObject o : obj) {
			NSDictionary dic = (NSDictionary) o;
			Databases databases = new Databases();
			for (String key : dic.allKeys()) {
				if (key.equalsIgnoreCase("filename"))
					databases.setFilename((dic.objectForKey(key)).toString());
				else if (key.equalsIgnoreCase("resourceid"))
					databases.setId(((NSNumber) dic.objectForKey(key)).intValue());
			}
			DatabasesList.add(databases);
		}
		return DatabasesList;
	}
	
	public static ArrayList<L10NS>parseL10NS(NSObject[] obj) throws Exception {
		ArrayList<L10NS> L10NSList = new ArrayList<L10NS>();
		for (NSObject o : obj) {
			NSDictionary dic = (NSDictionary) o;
			L10NS l10ns = new L10NS();
			for (String key : dic.allKeys()) {
				if (key.equalsIgnoreCase("filename"))
					l10ns.setFilename((dic.objectForKey(key)).toString());
				else if (key.equalsIgnoreCase("resourceid"))
					l10ns.setId(((NSNumber) dic.objectForKey(key)).intValue());
			}
			L10NSList.add(l10ns);
		}
		return L10NSList;
	}
	
	public static ArrayList<SoundEffects>parseSoundEffects(NSObject[] obj) throws Exception {
		ArrayList<SoundEffects> SoundEffectsList = new ArrayList<SoundEffects>();
		for (NSObject o : obj) {
			NSDictionary dic = (NSDictionary) o;
			SoundEffects soundEffects = new SoundEffects();
			for (String key : dic.allKeys()) {
				if (key.equalsIgnoreCase("filename"))
					soundEffects.setFilename((dic.objectForKey(key)).toString());
				else if (key.equalsIgnoreCase("resourceid"))
					soundEffects.setId(((NSNumber) dic.objectForKey(key)).intValue());
			}
			SoundEffectsList.add(soundEffects);
		}
		return SoundEffectsList;
	}
	
	public static ArrayList<Videos>parseVideos(NSObject[] obj) throws Exception {
		ArrayList<Videos> VideosList = new ArrayList<Videos>();
		for (NSObject o : obj) {
			NSDictionary dic = (NSDictionary) o;
			Videos videos = new Videos();
			for (String key : dic.allKeys()) {
				if (key.equalsIgnoreCase("filename"))
					videos.setFilename((dic.objectForKey(key)).toString());
				else if (key.equalsIgnoreCase("resourceid"))
					videos.setId(((NSNumber) dic.objectForKey(key)).intValue());
			}
			VideosList.add(videos);
		}
		return VideosList;
	}
}
