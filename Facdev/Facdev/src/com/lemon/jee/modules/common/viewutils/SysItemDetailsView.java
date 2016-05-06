package com.lemon.jee.modules.common.viewutils;

public class SysItemDetailsView {

	private Long id;
	private Long itemsId;
	private String code;
	private String name;
	private String category;
	private Integer allowEdit;
	private Integer allowDelete;
	private Integer enabled;
	private Integer sortCode;
	private String description;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getItemsId() {
		return itemsId;
	}

	public void setItemsId(Long itemsId) {
		this.itemsId = itemsId;
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

	public Integer getSortCode() {
		return sortCode;
	}

	public void setSortCode(Integer sortCode) {
		this.sortCode = sortCode;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
