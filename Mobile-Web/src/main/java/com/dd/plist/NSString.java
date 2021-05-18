/*
 * plist - An open source library to parse and generate property lists
 * Copyright (C) 2010 Daniel Dreibrodt
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package com.dd.plist;

import java.io.UnsupportedEncodingException;

import com.mobilous.mobileweb.parser.ADFParser;
import com.mobilous.mobileweb.parser.UIParser;

/**
 * A NSString contains a string.
 * 
 * @author Daniel Dreibrodt
 */
public class NSString extends NSObject {

	private String content;

	/**
	 * Creates an NSString from its binary representation.
	 * 
	 * @param bytes The binary representation.
	 * @param encoding The encoding of the binary representation, the name of a supported charset.
	 * @see java.lang.String
	 * @throws UnsupportedEncodingException
	 */
	public NSString(byte[] bytes, String encoding) {
		try {
			content = new String(bytes, encoding);
		} catch(UnsupportedEncodingException ex) {
			content = "";
		}
	}

	/**
	 * Creates a NSString from a string.
	 * 
	 * @param string
	 *            The string that will be contained in the NSString.
	 */
	public NSString(String string) {
		try {
			content = new String(string.getBytes("UTF-8"));
		} catch (UnsupportedEncodingException ex) {
			content = "";
		}
	}

	/**
	 * The textual representation of this NSString.
	 * 
	 * @return The NSString's contents.
	 */
	@Override
	public String toString() {
		/*if(content.contains("JSON(")){
			content = content.replace("\\\"", "\"");
			content = content.replace("\"", "\\\"");
		}
		if(UIParser.isUIParsing && ADFParser.languageConvertor != null && ADFParser.languageConvertor.containsKey(content)){
			content = ADFParser.languageConvertor.get(content);
		}*/
		
		return content;
	}

	/**
	 * The string as XML node. All XML special characters (<,>) contained in the
	 * string are replaced by spaces.
	 * 
	 * @param indent
	 * @return
	 */
	public String toXML(String indent) {
		String xml = indent + "<string>";
		xml += content.replaceAll("<|>", " ");
		xml += "</string>";
		return xml;
	}
}
