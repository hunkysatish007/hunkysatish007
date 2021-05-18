package com.mobilous.mobileweb.etc;

import java.util.HashMap;
import java.util.Set;

public class Record {

	private HashMap<String, String> pairs;

	public Record() {
		super();
		this.pairs = new HashMap<String, String>();
	}

	public void addPair(String key, String value) {
		pairs.put(key, value);
	}

	public String get(String key) {
		return this.get(key);
	}

	@Override
	public String toString() {
		StringBuffer sb = new StringBuffer();
		Set<String> keys = pairs.keySet();
		boolean isFirst = true;
		for (String key : keys) {
			if (isFirst) {
				isFirst = false;
				sb.append("{"); // mato added this
			} else {
				sb.append(",");
			}
			sb.append("\"");
			sb.append(key);
			sb.append("\": \"");
			sb.append(pairs.get(key));
			sb.append("\"");
		}
		sb.append("}");
		return sb.toString();
	}

}
