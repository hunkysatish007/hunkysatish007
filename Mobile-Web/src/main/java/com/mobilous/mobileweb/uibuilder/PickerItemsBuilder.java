package com.mobilous.mobileweb.uibuilder;

import java.util.ArrayList;

import com.mobilous.mobileweb.etc.DataArray;
import com.mobilous.mobileweb.etc.ItemData;
import com.mobilous.mobileweb.util.Utility;

public class PickerItemsBuilder {
	
	public static StringBuilder build (ArrayList<DataArray> items) {
		
		StringBuilder itemsBuilder = new StringBuilder("{");
		String temp = "picker";
		
		for (int j=0; j<items.size(); j++){
			try{
				DataArray dataArrayItem = items.get(j);
				if(dataArrayItem != null){
					if(j > 0){
						itemsBuilder.append(",");
					}
					itemsBuilder.append(temp+(j+1));
					itemsBuilder.append(":[");
					ArrayList<ItemData> innerItems = dataArrayItem.getItemArray();
					
					for (int i=0; i< innerItems.size(); i++) 
					{
						ItemData itemData = innerItems.get(i);
											
						itemsBuilder.append("\"").append(Utility.parseText(itemData.getText())).append("\"");
						
						if(i < innerItems.size()-1)
						{
							itemsBuilder.append(",");
						}
					}
					itemsBuilder.append("]");
				}
			}
			catch (Exception ex)
			{
				break;
			}
		}
		
		
		
		
		itemsBuilder.append("}");
		
		return itemsBuilder;
		
	}

	public static StringBuilder buildValues(ArrayList<DataArray> items) {
		StringBuilder itemsBuilder = new StringBuilder("{");
		String temp = "picker";
		for (int j=0; j<items.size(); j++){
			try{
				DataArray dataArrayItem = items.get(j);
				if(dataArrayItem != null){
					if(j > 0){
						itemsBuilder.append(",");
					}
					itemsBuilder.append(temp+(j+1));
					itemsBuilder.append(":[");
					ArrayList<ItemData> innerItems = dataArrayItem.getItemArray();
					
					for (int i=0; i< innerItems.size(); i++){
						ItemData itemData = innerItems.get(i);
						itemsBuilder.append("\"").append(itemData.getValue()).append("\"");
						if(i < innerItems.size()-1){
							itemsBuilder.append(",");
						}
					}
					
					itemsBuilder.append("]");
				}
			}
			catch (Exception ex)
			{
				break;
			}
		}
		itemsBuilder.append("}");
		return itemsBuilder;
	}

	public static StringBuilder buildSelected(ArrayList<DataArray> items) {
		// TODO Auto-generated method stub
		StringBuilder selectedItem = new StringBuilder("{");
		String temp = "picker";
		for (int j=0; j<items.size(); j++){
			try{
				DataArray dataArrayItem = items.get(j);
				if(dataArrayItem != null){
					if(j > 0){
						selectedItem.append(",");
					}
					selectedItem.append(temp+(j+1));
					selectedItem.append(":");
					ArrayList<ItemData> innerItems = dataArrayItem.getItemArray();
					selectedItem.append("\"");
					int index=items.get(j).getCurrentIndex();
					if(index>=0){
						if(innerItems.isEmpty()){}
						else
						selectedItem.append(innerItems.get(index).getText());
					}else if(index == -1){
						selectedItem.append(dataArrayItem.getFieldValue());
					}
					selectedItem.append("\"");
					
				}
			}
			catch (Exception ex)
			{
				break;
			}
		}

		selectedItem.append("}");
		return selectedItem;
	}

	public static Object buildPickerWidth(ArrayList<DataArray> items) {
		// TODO Auto-generated method stub
		
		StringBuilder itemsBuilder = new StringBuilder("{");
		String temp = "picker";
		
		for (int j=0; j<items.size(); j++){
			try{
				DataArray dataArrayItem = items.get(j);
				if(dataArrayItem != null){
					if(j > 0){
						itemsBuilder.append(",");
					}
					itemsBuilder.append(temp+(j+1));
					itemsBuilder.append(":").append(dataArrayItem.getWidth());
				}
			}
			catch (Exception ex)
			{
				break;
			}
		}
		
		
		itemsBuilder.append("}");
		
		return itemsBuilder;
	}
}
