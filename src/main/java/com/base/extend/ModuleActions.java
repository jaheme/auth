package com.base.extend;

import java.util.List;
import java.util.Map;

import com.base.model.BaseDictionary;

/**
 * 模块的详细信息实体,包括权限点详细集合
 * @author rhine
 *
 */
public class ModuleActions extends BaseDictionary {

	
	private Long modId;
	private String modStable;
	private String modName;
	private String modUrl;
	private Long modPid;
	private boolean checked;
	private List<Map<String,Object>> moduleActions;

	public boolean isChecked() {
		return checked;
	}

	public void setChecked(boolean checked) {
		this.checked = checked;
	}
	
	public List<Map<String, Object>> getModuleActions() {
		return moduleActions;
	}

	public void setModuleActions(List<Map<String, Object>> moduleActions) {
		this.moduleActions = moduleActions;
	}

	public Long getModId() {
		return modId;
	}

	public void setModId(Long modId) {
		this.modId = modId;
	}

	public String getModStable() {
		return modStable;
	}

	public void setModStable(String modStable) {
		this.modStable = modStable;
	}

	public String getModName() {
		return modName;
	}

	public void setModName(String modName) {
		this.modName = modName;
	}

	public String getModUrl() {
		return modUrl;
	}

	public void setModUrl(String modUrl) {
		this.modUrl = modUrl;
	}

	public Long getModPid() {
		return modPid;
	}

	public void setModPid(Long modPid) {
		this.modPid = modPid;
	}

	
	
	
}
