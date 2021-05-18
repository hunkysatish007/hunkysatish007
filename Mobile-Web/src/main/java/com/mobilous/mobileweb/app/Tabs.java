package com.mobilous.mobileweb.app;

public class Tabs extends MainFile {

	private DefFile defFile = null;

	public DefFile getDefFile() {
		return defFile;
	}

	public void setDefFile(DefFile defFile) {
		this.defFile = defFile;
	}

	@Override
	public String toString() {
		return "Tabs [defFile=" + defFile + "]";
	}

	// @Override
	// public String toString() {
	// StringBuffer sb = new StringBuffer();
	//
	// sb.append("deffile:").append('\n');
	//
	// if(defFile!=null){
	// sb.append(defFile.toString()).append('\n');
	// }
	// return sb.toString();
	// }

}
