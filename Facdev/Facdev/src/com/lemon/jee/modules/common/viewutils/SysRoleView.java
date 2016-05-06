package com.lemon.jee.modules.common.viewutils;

public class SysRoleView {

	private Long id;
	private String code;
	private String name;
	private String category;
	private String description;
	private Integer allowEdit;
	private Integer allowDelete;
	private Integer enabled;
	private String text;
	private Integer leaf = 1;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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

	public Integer getEnabled() {
		return enabled;
	}

	public void setEnabled(Integer enabled) {
		this.enabled = enabled;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public Integer getLeaf() {
		return leaf;
	}

	public void setLeaf(Integer leaf) {
		this.leaf = leaf;
	}

}
