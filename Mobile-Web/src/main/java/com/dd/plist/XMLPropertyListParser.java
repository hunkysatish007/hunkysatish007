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

import java.io.File;
import java.io.IOException;
import java.io.InputStream;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

/**
 * Parses XML property lists
 * @author Daniel Dreibrodt
 */
public class XMLPropertyListParser {

    public static NSObject parse(File f) throws Exception {
        DocumentBuilderFactory docBuilderFactory = DocumentBuilderFactory.newInstance();
        docBuilderFactory.setIgnoringElementContentWhitespace(true);
        docBuilderFactory.setCoalescing(true);
        DocumentBuilder docBuilder = docBuilderFactory.newDocumentBuilder();

		Document doc = docBuilder.parse(f);

		if (!doc.getDoctype().getName().equals("plist")) {
			throw new UnsupportedOperationException("The given XML document is not a property list.");
		}

		/** yant **/
		NodeList list = doc.getDocumentElement().getChildNodes();
		for (int i = 0; i < list.getLength(); i++) {
			Node node = list.item(i);

			if (node.getNodeName().equalsIgnoreCase("dict"))
				return parseObject(node);
		}
		return null;
		// return parseObject(doc.getDocumentElement().getChildNodes().item(1));
		/** yant **/

		// return parseObject(doc.getDocumentElement().getFirstChild());
	}

	public static NSObject parse(final byte[] bytes) throws Exception {

		InputStream is = new InputStream() {

			private int pos = 0;

			@Override
			public int read() throws IOException {
				if (pos >= bytes.length) {
					return -1;
				}
				return bytes[pos++];
			}
		};

		return parse(is);
	}

	public static NSObject parse(InputStream is) throws Exception {
		DocumentBuilderFactory docBuilderFactory = DocumentBuilderFactory.newInstance();
		docBuilderFactory.setIgnoringElementContentWhitespace(true);
		DocumentBuilder docBuilder = docBuilderFactory.newDocumentBuilder();

		Document doc = docBuilder.parse(is);

		if (!doc.getDoctype().getName().equals("plist")) {
			throw new UnsupportedOperationException("The given XML document is not a property list.");
		}

		return parseObject(doc.getDocumentElement().getFirstChild());
	}

	private static NSObject parseObject(Node n) throws Exception {
		String type = n.getNodeName();
		if (type.equals("dict")) {
			NSDictionary dict = new NSDictionary();
			NodeList children = n.getChildNodes();

			int j = 0;
			boolean useOrig = false;
			while (j < children.getLength() && !useOrig) {
				if (j % 2 > 0) {
					Node key = children.item(j);
					Node val = children.item(j + 2);

					if (key.getNodeName().equalsIgnoreCase("key")) {
						// MLog.d(MobUtils.LOG_TAG, "j" + j + ". " +
						// key.getNodeName() + ", " + val.getNodeName());
						// if(val.getChildNodes().getLength() == 1) {
						// //System.out.println(key.getChildNodes().item(0).getNodeValue()
						// + " " + val.getChildNodes().item(0).getNodeValue());
						// }

						dict.put(key.getChildNodes().item(0).getNodeValue(),
								parseObject(val));
						j = j + 4;
					} else
						useOrig = true;
				} else {
					j++;
				}
			}

			/* ORIGINAL */
			if (useOrig) {
				NSDictionary dict2 = new NSDictionary();
				for (int i = 0; i < children.getLength(); i += 2) {
					Node key = children.item(i);
					Node val = children.item(i + 1);
					if(key.getChildNodes().item(0) != null)
						dict2.put(key.getChildNodes().item(0).getNodeValue(), parseObject(val));
					else
						System.out.println("<---- Here 'Key' has no children. Please avoid such situation. ---->");
						
				}
				return dict2;
			}
			/* ORIGINAL */

			return dict;
		} else if (type.equals("array")) {
			NodeList children = n.getChildNodes();

			boolean useOrig = false;
			if (children.getLength() == 1)
				useOrig = true;
			else if (children.getLength() > 1 && !children.item(0).getNodeName().contains("text") && !children.item(1).getNodeName().contains("text"))
				useOrig = true;

			if (useOrig) {
				NSArray array = new NSArray(children.getLength());
				for (int i = 0; i < children.getLength(); i++) {
					array.setValue(i, parseObject(children.item(i)));
				}
				return array;
			} else {
				NSArray array = new NSArray((children.getLength() / 2));

				int idx = 0;
				for (int i = 0; i < children.getLength() && !useOrig; i++) {
					if (i % 2 > 0) {
						array.setValue(idx, parseObject(children.item(i)));
						idx++;
					}
				}
				return array;
			}
		} else if (type.equals("true")) {
			return new NSNumber(true);
		} else if (type.equals("false")) {
			return new NSNumber(false);
		} else if (type.equals("integer")) {
			return new NSNumber(n.getChildNodes().item(0).getNodeValue());
		} else if (type.equals("real")) {
			return new NSNumber(n.getChildNodes().item(0).getNodeValue());
		} else if (type.equals("string")) {
			NodeList children = n.getChildNodes();
			if (children.getLength() == 0) {
				return new NSString(""); // Empty string
			} else {
				return new NSString(children.item(0).getNodeValue());
			}
		} else if (type.equals("data")) {
			return new NSData(n.getChildNodes().item(0).getNodeValue());
		} else if (type.equals("date")) {
			return new NSDate(n.getChildNodes().item(0).getNodeValue());
		}

		return null;
	}
}
