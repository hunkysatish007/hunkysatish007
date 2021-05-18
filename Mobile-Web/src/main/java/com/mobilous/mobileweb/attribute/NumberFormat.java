package com.mobilous.mobileweb.attribute;

//TODO: not sure about this class
public class NumberFormat {

	private int d; // signed decimal number
	private int u; // unsigned decimal number
	private int o; // unsigned octal number
	private int x; // unsigned hexadecimal number(small letter) ???
	private int X; // unsigned hexadecimal number(capital letter) ???
	private float f; // Floating point number of decimal number
	private float e; // Floatage decimal by scientific number representation
						// system (small letter)
	private float E; // Floatage decimal by scientific number representation
						// system (capital letter)
	private float g; // One where %f and %e are short
	private float G; // One where %f and %E are short
	private final char PLUS = '+';
	private final String BLANK = "";
	private final char MINUS = '-';
	private final char POUND = '#';
	private final char FILLER = '0';
	private int minWidth;
	private int precision;
	private int conversionQualifier;
	private String formatType = null;

	public String getFormatType() {
		return formatType;
	}

	public void setFormatType(String formatType) {
		this.formatType = formatType;
	}

	public int getD() {
		return d;
	}

	public void setD(int d) {
		this.d = d;
	}

	public int getU() {
		return u;
	}

	public void setU(int u) {
		this.u = u;
	}

	public int getO() {
		return o;
	}

	public void setO(int o) {
		this.o = o;
	}

	public int getSmallX() {
		return x;
	}

	public void setSmallX(int x) {
		this.x = x;
	}

	public int getBigX() {
		return X;
	}

	public void setBigX(int x) {
		X = x;
	}

	public float getF() {
		return f;
	}

	public void setF(float f) {
		this.f = f;
	}

	public float getSmallE() {
		return e;
	}

	public void setSmallE(float e) {
		this.e = e;
	}

	public float getBigE() {
		return E;
	}

	public void setBigE(float e) {
		E = e;
	}

	public float getSmallG() {
		return g;
	}

	public void setSmallG(float g) {
		this.g = g;
	}

	public float getBigG() {
		return G;
	}

	public void setBigG(float g) {
		G = g;
	}

	public int getMinWidth() {
		return minWidth;
	}

	public void setMinWidth(int minWidth) {
		this.minWidth = minWidth;
	}

	public int getPrecision() {
		return precision;
	}

	public void setPrecision(int precision) {
		this.precision = precision;
	}

	public int getConversionQualifier() {
		return conversionQualifier;
	}

	public void setConversionQualifier(int conversionQualifier) {
		this.conversionQualifier = conversionQualifier;
	}

	public char getPLUS() {
		return PLUS;
	}

	public String getBLANK() {
		return BLANK;
	}

	public char getMINUS() {
		return MINUS;
	}

	public char getPOUND() {
		return POUND;
	}

	public char getFILLER() {
		return FILLER;
	}
}
