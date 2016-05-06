package com.lemon.jee.modules.common.viewutils;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SysButtonView {

	private Long id;
	@JsonProperty(value = "text")
	private String name;
	@JsonProperty(value = "iconCls")
	private String img;
	private String event;
	private String controlID;
	private String category;
	private Integer split;
	private String description;
	private Integer enabled;
	private Integer sortCode;
	private Integer btnSortCode;
	private Integer type;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public String getEvent() {
		return event;
	}

	public void setEvent(String event) {
		this.event = event;
	}

	public String getControlID() {
		return controlID;
	}

	public void setControlID(String controlID) {
		this.controlID = controlID;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public Integer getSplit() {
		return split;
	}

	public void setSplit(Integer split) {
		this.split = split;
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

	public Integer getBtnSortCode() {
		return btnSortCode;
	}

	public void setBtnSortCode(Integer btnSortCode) {
		this.btnSortCode = btnSortCode;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

}
