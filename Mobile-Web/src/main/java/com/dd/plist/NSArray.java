package com.dd.plist;

import java.util.Arrays;

public class NSArray extends NSObject {

	private NSObject[] array;
	private int init_lgt = 256;
	private int curr_idx;

	public NSArray() {
		array = new NSObject[init_lgt];
		curr_idx = 0;
	}

	public NSArray(int length) {
		int spans;

		spans = length / init_lgt;
		if (length > (spans * init_lgt))
			spans = spans + 1;
		array = new NSObject[init_lgt * spans];
		curr_idx = length;
	}

	public NSArray(NSArray src_array) {
		int spans;

		spans = src_array.count() / init_lgt;
		if (src_array.count() > (spans * init_lgt))
			spans = spans + 1;
		array = new NSObject[init_lgt * spans];
		curr_idx = src_array.count();
		System.arraycopy(src_array.getArray(), 0, array, 0, src_array
				.getArray().length);
	}

	public NSObject objectAtIndex(int i) {
		return array[i];
	}

	public void setValue(int key, NSObject value) {
		array[key] = value;
	}

	public NSObject[] getArray() {
		NSObject[] result_array;

		result_array = new NSObject[curr_idx];
		System.arraycopy(array, 0, result_array, 0, curr_idx);

		return result_array;
	}

	public int count() {
		return curr_idx;
	}

	public boolean containsObject(NSObject obj) {
		for (int i = 0; i < curr_idx; i++) {
			if (array[i].equals(obj)) {
				return true;
			}
		}
		return false;
	}

	public int indexOfObject(NSObject obj) {
		for (int i = 0; i < curr_idx; i++) {
			if (array[i].equals(obj)) {
				return i;
			}
		}
		return -1;
	}

	public int indexOfIdenticalObject(NSObject obj) {
		for (int i = 0; i < curr_idx; i++) {
			if (array[i] == obj) {
				return i;
			}
		}
		return -1;
	}

	public NSObject lastObject() {
		return array[curr_idx - 1];
	}

	public NSObject[] objectsAtIndexes(int... indexes) {
		NSObject[] result = new NSObject[indexes.length];
		Arrays.sort(indexes);
		// for ( int i = 0; i < indexes.length; i ++) result[i] =
		// array[indexes[0]]; // original
		for (int i = 0; i < indexes.length; i++)
			result[i] = array[indexes[i]]; // fixed by Shimada
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		return obj.getClass().equals(this.getClass())
				&& Arrays.equals(((NSArray) obj).getArray(), this.array);
	}

	@Override
	public int hashCode() {
		int hash = 7;
		hash = 89 * hash + Arrays.deepHashCode(this.array);
		return hash;
	}

	public String toXML(String indent) {
		String xml = indent + "<array>" + System.getProperty("line.separator");
		for (NSObject o : array) {
			xml += o.toXML(indent + "  ")
					+ System.getProperty("line.separator");
		}
		xml += indent + "</array>";
		return xml;
	}

	public void addObject(NSObject obj) {
		NSObject[] new_array;

		if (curr_idx == array.length + 1) {
			new_array = new NSObject[array.length + init_lgt];
			System.arraycopy(array, 0, new_array, 0, array.length);
			array = new_array;
		}

		array[curr_idx] = obj;
		curr_idx++;
	}
}
