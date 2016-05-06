package com.lemon.jee.modules.common.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.lemon.jee.common.utils.JsonDateSerializer;

@Entity
@Table(name = "department")
public class Department {
	@Id
	@GeneratedValue
	private Long departmentId;
	private String name;
	private String positon;
	private Integer catagory;
	@JsonSerialize(using = JsonDateSerializer.class)
	private Date createTime;
	@JsonSerialize(using = JsonDateSerializer.class)
	private Date modifyTime;

	public Long getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(Long departmentId) {
		this.departmentId = departmentId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPositon() {
		return positon;
	}

	public void setPositon(String positon) {
		this.positon = positon;
	}

	public Integer getCatagory() {
		return catagory;
	}

	public void setCatagory(Integer catagory) {
		this.catagory = catagory;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getModifyTime() {
		return modifyTime;
	}

	public void setModifyTime(Date modifyTime) {
		this.modifyTime = modifyTime;
	}

	@Override
	public String toString() {
		return "Department [departmentId=" + departmentId + ", name=" + name + ", positon=" + positon + ", catagory="
				+ catagory + ", createTime=" + createTime + ", modifyTime=" + modifyTime + "]";
	}

}
