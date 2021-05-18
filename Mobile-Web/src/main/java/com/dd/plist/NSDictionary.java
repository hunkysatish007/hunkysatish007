package com.dd.plist;

import java.util.TreeMap;

import org.json.simple.JSONObject;

import java.util.Set;

public class NSDictionary extends NSObject {

	private TreeMap<String, NSObject> dict;

	public NSDictionary() {
		dict = new TreeMap<String, NSObject>();
	}

	public NSDictionary(NSDictionary src_dic) {
		String[] src_keys;

		dict = new TreeMap<String, NSObject>();

		src_keys = src_dic.allKeys();
		for (String key : src_keys) {
			dict.put(key, src_dic.objectForKey(key));
		}
	}

	public NSObject objectForKey(String key) {
//		if(!contains(key)) 
//			throw new IllegalArgumentException("Invalid or missing key: " + key);
//		if(dict.get(key) == null){
//			return dict.get("");
//		}else{

			return dict.get(key);

//		}
	}

	public void put(String key, NSObject obj) {
		dict.put(key, obj);
	}
	
	public void remove(String key) {
		dict.remove(key);
	}

	public int count() {
		return dict.size();
	}

	@Override
	public boolean equals(Object obj) {
		return (obj.getClass().equals(this.getClass()) && ((NSDictionary) obj).dict.equals(dict));
	}

	public String[] allKeys() {
		return dict.keySet().toArray(new String[0]);
	}

	@Override
	public int hashCode() {
		int hash = 7;
		hash = 83 * hash + (this.dict != null ? this.dict.hashCode() : 0);
		return hash;
	}

	public String toXML(String indent) {
		String xml = indent + "<dict>" + System.getProperty("line.separator");
		// Enumeration<String> keys = dict.keys();
		// while (keys.hasMoreElements()) {
		// String key = keys.nextElement();
		Set<String> keyset = dict.keySet();
		for (String key : keyset) {
			NSObject val = objectForKey(key);
			xml += indent + "  <key>" + key + "</key>"
					+ System.getProperty("line.separator");
			xml += val.toXML(indent + "  ")
					+ System.getProperty("line.separator");
		}
		xml += indent + "</dict>";
		return xml;
	}

	public void setValue(NSObject obj, String key) {
		dict.remove(key);
		dict.put(key, obj);
	}
	
	public boolean contains(String key) {
		if(dict.get(key) != null){
			return true;
		}else{
			return false;

		}
	}
	
	
//	public void createObject(NSDictionary myDict, int level) {
//	    for (String k : myDict.allKeys()) {
//		  String dashes = new String(new char[level]).replace('\0', '-');		
//	        System.out.print(dashes + " " + k + ": ");
//		  NSObject obj = myDict.objectForKey(k);
//	        if (obj instanceof NSDictionary) {
//	            System.out.println("");
//	            createObject((NSDictionary)obj, level + 1);
//	        } else {
//	            System.out.println("\""+ obj + "\"");
//	        }
//	    }
//	}
	
//	public void createObject(NSDictionary myDict, int level) {
//		JSONObject jsonData = new JSONObject();
//	    for (String k : myDict.allKeys()) {
//		  String dashes = new String(new char[level]).replace('\0', '-');		
//	      System.out.print(k + ": ");
//		  NSObject obj = myDict.objectForKey(k);
//	        if (obj instanceof NSDictionary) {
//	            //System.out.println("");
//	            createObject((NSDictionary)obj, level + 1);
//	        } else {
//	            //System.out.println("\"" + obj + "\"");
//	            jsonData.put(k, obj);
//	        }
//	    }
//	    System.out.println(jsonData);
//	}

	
}
