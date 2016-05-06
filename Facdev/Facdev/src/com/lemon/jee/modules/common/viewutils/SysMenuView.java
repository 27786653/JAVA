package com.lemon.jee.modules.common.viewutils;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SysMenuView {

	private Long id;
	private Long parentId;
	private String code;
	@JsonProperty(value = "text")
	private String name;
	private String navigateUrl;
	private Integer leaf;
	@JsonProperty(value = "iconCls")
	private String img;
	private String description;
	private Integer enabled;
	private Integer expanded;
	private Integer allowEdit;
	private Integer allowDelete;
	private Integer sortCode;

	private Boolean checked;

	private List<SysMenuView> children = new ArrayList<SysMenuView>();

	public List<SysMenuView> getChildren() {
		return children;
	}

	public void setChildren(List<SysMenuView> children) {
		this.children = children;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getParentId() {
		return parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getNavigateUrl() {
		return navigateUrl;
	}

	public void setNavigateUrl(String navigateUrl) {
		this.navigateUrl = navigateUrl;
	}

	public Integer getLeaf() {
		return leaf;
	}

	public void setLeaf(Integer leaf) {
		this.leaf = leaf;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getExpanded() {
		return expanded;
	}

	public void setExpanded(Integer expanded) {
		this.expanded = expanded;
	}

	public Integer getEnabled() {
		return enabled;
	}

	public void setEnabled(Integer enabled) {
		this.enabled = enabled;
	}

	public Integer getSortCode() {
		return sortCode;
	}

	public void setSortCode(Integer sortCode) {
		this.sortCode = sortCode;
	}

	public Integer getAllowEdit() {
		return allowEdit;
	}

	public void setAllowEdit(Integer allowEdit) {
		this.allowEdit = allowEdit;
	}

	public Integer getAllowDelete() {
		return allowDelete;
	}

	public void setAllowDelete(Integer allowDelete) {
		this.allowDelete = allowDelete;
	}

	public Boolean getChecked() {
		return checked;
	}

	public void setChecked(Boolean checked) {
		this.checked = checked;
	}

}
