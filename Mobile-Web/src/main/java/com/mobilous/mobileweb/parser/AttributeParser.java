package com.mobilous.mobileweb.parser;

import java.util.ArrayList;

import com.dd.plist.NSDictionary;
import com.dd.plist.NSNumber;
import com.dd.plist.NSObject;
import com.mobilous.mobileweb.app.MainFile;
import com.mobilous.mobileweb.app.Page;
import com.mobilous.mobileweb.attribute.Color;
import com.mobilous.mobileweb.attribute.File;
import com.mobilous.mobileweb.attribute.Font;
import com.mobilous.mobileweb.attribute.HTMLFile;
import com.mobilous.mobileweb.attribute.ImageFile;
import com.mobilous.mobileweb.attribute.LocalizationFile;
import com.mobilous.mobileweb.attribute.Matrix;
import com.mobilous.mobileweb.attribute.NumberFormat;
import com.mobilous.mobileweb.attribute.OtherFile;
import com.mobilous.mobileweb.attribute.Point;
import com.mobilous.mobileweb.attribute.SoundFile;
import com.mobilous.mobileweb.attribute.Title;
import com.mobilous.mobileweb.attribute.VideoFile;
import com.mobilous.mobileweb.ui.Padding;
import com.mobilous.mobileweb.util.PlistLocator;

public class AttributeParser extends ADFParser {

	public AttributeParser(PlistLocator locator) {
		super(locator,MODE);
	}

	// Added by Kundan : Right Now only one attribute is needed, will
	// implemented other attribute later.
	public static NumberFormat parseNumberFormat(NSDictionary dic)
			throws Exception {
		NumberFormat format = new NumberFormat();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("format"))
				format.setFormatType(dic.objectForKey(key).toString());

			else
				// throw new Exception("Unknown Key: "+key);
				logger.debug("parseFont parse: Unknown key found: " + key);
		}
		return format;
	}

	public static Font parseFont(NSDictionary dic) throws Exception {
		Font font = new Font();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("fontName"))
				font.setFont(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("fontSize"))
				font.setFontSize(((NSNumber) dic.objectForKey(key)).intValue());
			else if (key.equalsIgnoreCase("fontStyle"))
				font.setFontStyle(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("fontWeight"))
				font.setFontWeight(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("textColor"))
				font.setTextColor(parseColor((NSDictionary) dic
						.objectForKey(key)));
			else if (key.equalsIgnoreCase("textAlignment"))
				font.setTextAlignment(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("lineBreakMode"))
				font.setLineBreakMode(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("shadowColor"))
				font.setShadowColor(parseColor((NSDictionary) dic
						.objectForKey(key)));
			else if (key.equalsIgnoreCase("shadowOffset"))
				font.setShadowOffset(AttributeParser
						.parsePoint((NSDictionary) dic.objectForKey(key)));
			else if (key.equalsIgnoreCase("adjustFontSizeToFile"))
				font.setAdjustFontSizeToFile(((NSNumber) dic.objectForKey(key))
						.boolValue());
			else if (key.equalsIgnoreCase("minimumFontSize"))
				font.setMinimumFontSize(((NSNumber) dic.objectForKey(key))
						.intValue());
			else
				// throw new Exception("Unknown Key: "+key);
				logger.debug("parseFont parse: Unknown key found: " + key);
		}
		return font;
	}

	public static Color parseColor(NSDictionary dic) throws Exception {
		Color color = new Color();
		for (String key : dic.allKeys()) {
/*			if (key.equalsIgnoreCase("colorname"))
				color.setColorName(dic.objectForKey(key).toString());
			else */if (key.equalsIgnoreCase("red"))
				color.setRed(((NSNumber) dic.objectForKey(key)).doubleValue());
			else if (key.equalsIgnoreCase("green"))
				color.setGreen(((NSNumber) dic.objectForKey(key)).doubleValue());
			else if (key.equalsIgnoreCase("blue"))
				color.setBlue(((NSNumber) dic.objectForKey(key)).doubleValue());
			else if (key.equalsIgnoreCase("hue"))
				color.setHue(((NSNumber) dic.objectForKey(key)).doubleValue());
			else if (key.equalsIgnoreCase("saturation"))
				color.setSaturation(((NSNumber) dic.objectForKey(key))
						.doubleValue());
			else if (key.equalsIgnoreCase("brightness"))
				color.setBrightness(((NSNumber) dic.objectForKey(key))
						.doubleValue());
			else if (key.equalsIgnoreCase("alpha"))
				color.setAlpha(((NSNumber) dic.objectForKey(key)).doubleValue());
			else
				// throw new Exception("Unknown Key: "+key);
				logger.debug("parseColor parse: Unknown key found: " + key);
		}
		return color;
	}

	public static Padding parsePadding(NSDictionary dic) throws Exception {
		Padding padding = new Padding();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("Top"))
				padding.setTop(((NSNumber) dic.objectForKey(key)).doubleValue());
			else if (key.equalsIgnoreCase("Bottom"))
				padding.setBottom(((NSNumber) dic.objectForKey(key))
						.doubleValue());
			else if (key.equalsIgnoreCase("left"))
				padding.setLeft(((NSNumber) dic.objectForKey(key))
						.doubleValue());
			else if (key.equalsIgnoreCase("right"))
				padding.setRight(((NSNumber) dic.objectForKey(key))
						.doubleValue());
			else
				// throw new Exception("Unknown Key: "+key);
				logger.debug("parsePadding parse: Unknown key found: " + key);
		}
		return padding;
	}

	public static Title parseTitle(NSDictionary dic) throws Exception {
		Title title = new Title();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("text"))
				title.setText(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("height"))
				title.setHeight(((NSNumber) dic.objectForKey(key)).intValue());
			else if (key.equalsIgnoreCase("width"))
				title.setWidth(((NSNumber) dic.objectForKey(key)).intValue());
			else if (key.equalsIgnoreCase("textAlignment"))
				title.setTextAlignment(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("rotation"))
				title.setRotation(((NSNumber) dic.objectForKey(key)).intValue());
			// else if(key.equalsIgnoreCase("textColor"))
			// title.setTextColor(parseColor((NSDictionary)dic.objectForKey(key)));
			else
				// throw new Exception("Unknown Key: "+key);
				logger.debug("parseColor parse: Unknown key found: " + key);
		}
		return title;
	}

	public static ArrayList<LocalizationFile> parseLocalizationFiles(
			NSObject[] obj) throws Exception {
		ArrayList<LocalizationFile> locFileList = new ArrayList<LocalizationFile>();
		for (NSObject o : obj) {
			NSDictionary dic = (NSDictionary) o;
			locFileList.add(parseLocalizationFile(dic));
		}
		return locFileList;
	}

	public static LocalizationFile parseLocalizationFile(NSDictionary dic)
			throws Exception {
		LocalizationFile loc = new LocalizationFile();
		// for(String key: dic.allKeys()){
		// if(key.equalsIgnoreCase("filename"))
		// img.setFileName(dic.objectForKey(key).toString());
		// else if(key.equalsIgnoreCase("srcLocation"))
		// img.setSrcLocation(dic.objectForKey(key).toString());
		// else if(key.equalsIgnoreCase("fileext"))
		// img.setFileExt(dic.objectForKey(key).toString());
		// else if(key.equalsIgnoreCase("url"))
		// img.setUrl(dic.objectForKey(key).toString());
		// else
		// // throw new Exception("Unknown Key: "+key);
		// logger.debug("parseImage parse: Unknown key found: " + key);
		// }
		return (LocalizationFile) parseFile(dic, loc);
	}

	public static ArrayList<ImageFile> parseImageFiles(NSObject[] obj)
			throws Exception {
		ArrayList<ImageFile> imageFileList = new ArrayList<ImageFile>();
		for (NSObject o : obj) {
			NSDictionary dic = (NSDictionary) o;
			imageFileList.add(parseImageFile(dic));
		}
		return imageFileList;
	}

	public static ImageFile parseImageFile(NSDictionary dic) throws Exception {
		ImageFile img = new ImageFile();
		// for(String key: dic.allKeys()){
		// if(key.equalsIgnoreCase("filename"))
		// img.setFileName(dic.objectForKey(key).toString());
		// else if(key.equalsIgnoreCase("srcLocation"))
		// img.setSrcLocation(dic.objectForKey(key).toString());
		// else if(key.equalsIgnoreCase("fileext"))
		// img.setFileExt(dic.objectForKey(key).toString());
		// else if(key.equalsIgnoreCase("url"))
		// img.setUrl(dic.objectForKey(key).toString());
		// else
		// // throw new Exception("Unknown Key: "+key);
		// logger.debug("parseImage parse: Unknown key found: " + key);
		// }
//		return (ImageFile) parseFile(dic, img);
		return (ImageFile) parseImageDicData(dic);
	}

	public static void parseAndSetSupportStyle(NSDictionary dic,
			MainFile mainFile) throws Exception {
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("Portrait")) {
				mainFile.setPotrait(((NSNumber) dic.objectForKey(key))
						.boolValue());
			}
		}
	}

	public static Point parsePoint(NSDictionary dic) throws Exception {
		Point point = new Point();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("x") || key.equalsIgnoreCase("anchorx"))
				point.setX(((NSNumber) dic.objectForKey(key)).doubleValue());
			else if (key.equalsIgnoreCase("y")|| key.equalsIgnoreCase("anchory"))
				point.setY(((NSNumber) dic.objectForKey(key)).doubleValue());
			else if (key.equalsIgnoreCase("z"))
				point.setZ(((NSNumber) dic.objectForKey(key)).doubleValue());
			else if (key.equalsIgnoreCase("width")) {
				point.setWidth(((NSNumber) dic.objectForKey(key)).doubleValue());
			} else if (key.equalsIgnoreCase("height"))
				point.setHeight(((NSNumber) dic.objectForKey(key))
						.doubleValue());
			else if (key.equalsIgnoreCase("depth"))
				point.setDepth(((NSNumber) dic.objectForKey(key)).doubleValue());
			else if (key.equalsIgnoreCase("rotation"))
				point.setRotation(((NSNumber) dic.objectForKey(key)).longValue());
			// else
			// throw new Exception("Unknown Key: "+key);
			// logger.debug("AttributeParser.parsePoint parse: Unknown key found: "
			// + key);
		}
		return point;
	}

	public static void setPageHeightAndWidthForScrollViewPage(
			NSDictionary nsDictionary, Page page) {
		for (String key : nsDictionary.allKeys()) {
			if (key.equalsIgnoreCase("width")) {
				page.setWidth(((NSNumber) nsDictionary.objectForKey(key))
						.doubleValue());
			} else if (key.equalsIgnoreCase("height")) {
				page.setHeight(((NSNumber) nsDictionary.objectForKey(key))
						.doubleValue());
			} else if (key.equalsIgnoreCase("x")) {
				page.setX(((NSNumber) nsDictionary.objectForKey(key))
						.doubleValue());
			} else if (key.equalsIgnoreCase("y")) {
				page.setY(((NSNumber) nsDictionary.objectForKey(key))
						.doubleValue());
			}

		}
	}

	public static Matrix parseMatrix(NSDictionary dic) throws Exception {
		Matrix matrix = new Matrix();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("name"))
				matrix.setName(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("description"))
				matrix.setDescription(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("m11"))
				matrix.setM11(((NSNumber) dic.objectForKey(key)).doubleValue());
			else if (key.equalsIgnoreCase("m12"))
				matrix.setM12(((NSNumber) dic.objectForKey(key)).doubleValue());
			else if (key.equalsIgnoreCase("m13"))
				matrix.setM13(((NSNumber) dic.objectForKey(key)).doubleValue());
			else if (key.equalsIgnoreCase("m14"))
				matrix.setM14(((NSNumber) dic.objectForKey(key)).doubleValue());
			else if (key.equalsIgnoreCase("m21"))
				matrix.setM21(((NSNumber) dic.objectForKey(key)).doubleValue());
			else if (key.equalsIgnoreCase("m22"))
				matrix.setM22(((NSNumber) dic.objectForKey(key)).doubleValue());
			else if (key.equalsIgnoreCase("m23"))
				matrix.setM23(((NSNumber) dic.objectForKey(key)).doubleValue());
			else if (key.equalsIgnoreCase("m24"))
				matrix.setM23(((NSNumber) dic.objectForKey(key)).doubleValue());
			else if (key.equalsIgnoreCase("m31"))
				matrix.setM31(((NSNumber) dic.objectForKey(key)).doubleValue());
			else if (key.equalsIgnoreCase("m32"))
				matrix.setM32(((NSNumber) dic.objectForKey(key)).doubleValue());
			else if (key.equalsIgnoreCase("m33"))
				matrix.setM33(((NSNumber) dic.objectForKey(key)).doubleValue());
			else if (key.equalsIgnoreCase("m34"))
				matrix.setM34(((NSNumber) dic.objectForKey(key)).doubleValue());
			else if (key.equalsIgnoreCase("m41"))
				matrix.setM41(((NSNumber) dic.objectForKey(key)).doubleValue());
			else if (key.equalsIgnoreCase("m42"))
				matrix.setM42(((NSNumber) dic.objectForKey(key)).doubleValue());
			else if (key.equalsIgnoreCase("m43"))
				matrix.setM43(((NSNumber) dic.objectForKey(key)).doubleValue());
			else if (key.equalsIgnoreCase("m44"))
				matrix.setM44(((NSNumber) dic.objectForKey(key)).doubleValue());
			else
				// throw new Exception("Unknown Key: "+key);
				logger.debug("parseMatrix parse: Unknown key found: " + key);
		}
		return matrix;
	}

	public static VideoFile parseVideoFile(NSDictionary dic) throws Exception {
		VideoFile videoFile = new VideoFile();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("author"))
				videoFile.setAuthor(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("copyright"))
				videoFile.setCopyright(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("format"))
				videoFile.setFormat(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("videoName"))
				videoFile.setVideoName(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("length"))
				videoFile.setLength(((NSNumber) dic.objectForKey(key))
						.intValue());
			else if (key.equalsIgnoreCase("fileExt"))
				videoFile.setFileExt(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("fileName"))
				videoFile.setFileName(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("srcLocation"))
				videoFile.setSrcLocation(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("url"))
				videoFile.setUrl(dic.objectForKey(key).toString());
		}
		return (VideoFile) parseFile(dic, videoFile);
	}

	public static SoundFile parseSoundFile(NSDictionary dic) throws Exception {
		SoundFile soundFile = new SoundFile();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("author"))
				soundFile.setAuthor(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("copyright"))
				soundFile.setCopyright(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("format"))
				soundFile.setFormat(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("soundName"))
				soundFile.setSoundName(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("length"))
				soundFile.setLength(((NSNumber) dic.objectForKey(key))
						.intValue());
			else if (key.equalsIgnoreCase("soundURL"))
				soundFile.setSoundURL(dic.objectForKey(key).toString());
		}
		return (SoundFile) parseFile(dic, soundFile);
	}

	public static HTMLFile parseHTMLFile(NSDictionary dic) throws Exception {
		return (HTMLFile) parseFile(dic, new HTMLFile());
	}

	public static File parseFile(NSDictionary dic, File file) throws Exception {
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("fileExt"))
				file.setFileExt(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("fileName"))
				file.setFileName(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("srcLocation"))
				file.setSrcLocation(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("url"))
				file.setUrl(dic.objectForKey(key).toString());
		}
		return file;
	}

	public static ImageFile parseImageDicData(NSDictionary dic) {
		ImageFile file = new ImageFile();
		for (String key : dic.allKeys()) {
			if (key.equalsIgnoreCase("fileext"))
				file.setFileExt(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("filename"))
				file.setFileName(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("srcLocation"))
				file.setSrcLocation(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("url"))
				file.setUrl(dic.objectForKey(key).toString());
			else if (key.equalsIgnoreCase("imageName"))
				file.setImageName(dic.objectForKey(key).toString());
		}
		return file;

	}
	
	public static OtherFile parseOtherFile(NSDictionary dic) throws Exception {
		return (OtherFile) parseFile(dic, new OtherFile());
	}
}
