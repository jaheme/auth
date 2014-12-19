package com.pub.util.ext;

import java.util.List;
import java.util.Map;

@SuppressWarnings("unchecked")
public class ExtTreeUtil {
	
	private String text;
	private Object inputValue;
//	private String children;
	private String cls;
	private boolean checked;
	private boolean leaf;
	private Map currentMap;
	private List root;
	private List child_List;
	
	
	public static Map buildNode(String text, Object inputValue,String cls, Map currentMap){
		currentMap.put("text", text);
		currentMap.put("id", inputValue);
		currentMap.put("cls", cls);
		return currentMap;
	}
	

	public static Map buildNode(String text, Object inputValue,
			String cls, Map currentMap,List child_List){
		currentMap.put("text", text);
		currentMap.put("id", inputValue);
		currentMap.put("cls", cls);
		currentMap.put("children", child_List);
		return currentMap;
	}
	
	public static Map buildNode(String text, Object inputValue, String children,
			String cls, boolean checked, boolean leaf, Map currentMap,
			List child_List){
		currentMap.put("text", text);
		currentMap.put("id", inputValue);
		currentMap.put("cls", cls);
		currentMap.put("children", child_List);
		currentMap.put("checked", checked);
		currentMap.put("leaf", leaf);
		return currentMap;
	}
	
	public ExtTreeUtil(String text, Object inputValue,
			String cls, boolean checked, boolean leaf, Map currentMap,
			List root, List child_List) {
		super();
		this.text = text;
		this.inputValue = inputValue;
		this.cls = cls;
		this.checked = checked;
		this.leaf = leaf;
		this.currentMap = currentMap;
		this.root = root;
		this.child_List = child_List;
	}
	
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public Object getInputValue() {
		return inputValue;
	}
	public void setInputValue(String inputValue) {
		this.inputValue = inputValue;
	}
	public String getCls() {
		return cls;
	}
	public void setCls(String cls) {
		this.cls = cls;
	}
	public boolean isChecked() {
		return checked;
	}
	public void setChecked(boolean checked) {
		this.checked = checked;
	}
	public boolean isLeaf() {
		return leaf;
	}
	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}
	public Map getCurrentMap() {
		return currentMap;
	}
	public void setCurrentMap(Map currentMap) {
		this.currentMap = currentMap;
	}
	public List getRoot() {
		return root;
	}
	public void setRoot(List root) {
		this.root = root;
	}
	public List getChild_List() {
		return child_List;
	}
	public void setChild_List(List child_List) {
		this.child_List = child_List;
	}
	
	
	

}
