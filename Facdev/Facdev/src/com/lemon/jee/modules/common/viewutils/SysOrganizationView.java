package com.lemon.jee.modules.common.viewutils;

import java.util.ArrayList;
import java.util.List;

public class SysOrganizationView {

	private String text; // getText()返回的是name

	private Long id;
	private Long parentId;
	private String code;
	private String shortName;
	private String name;
	private Integer leaf;
	private String category;
	private Integer isInnerOrganize;
	private String manager;
	private String outerPhone;
	private String fax;
	private String description;
	private Integer enabled;
	private Integer sortCode;
	private Integer expanded = 1;

	private List<SysOrganizationView> children = new ArrayList<SysOrganizationView>();

	public List<SysOrganizationView> getChildren() {
		return children;
	}

	public void setChildren(List<SysOrganizationView> children) {
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

	public String getShortName() {
		return shortName;
	}

	public void setShortName(String shortName) {
		this.shortName = shortName;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public Integer getIsInnerOrganize() {
		return isInnerOrganize;
	}

	public void setIsInnerOrganize(Integer isInnerOrganize) {
		this.isInnerOrganize = isInnerOrganize;
	}

	public String getManager() {
		return manager;
	}

	public void setManager(String manager) {
		this.manager = manager;
	}

	public String getOuterPhone() {
		return outerPhone;
	}

	public void setOuterPhone(String outerPhone) {
		this.outerPhone = outerPhone;
	}

	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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

	public Integer getLeaf() {
		return leaf;
	}

	public void setLeaf(Integer leaf) {
		this.leaf = leaf;
	}

	public Integer getExpanded() {
		return expanded;
	}

	public void setExpanded(Integer expanded) {
		this.expanded = expanded;
	}

	public String getText() {
		return name;
	}

	public void setText(String text) {
		this.text = text;
	}

}
