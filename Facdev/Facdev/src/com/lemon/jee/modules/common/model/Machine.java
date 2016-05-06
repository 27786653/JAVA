package com.lemon.jee.modules.common.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.lemon.jee.common.utils.JsonDateSerializer;

@Entity
@Table(name = "machine")
public class Machine {
	@Id
	@GeneratedValue
	private Long id;
	private String name;
	private Integer category;
	@JsonSerialize(using = JsonDateSerializer.class)
	private Date firstCheckTime;
	private String situation;
	private String type;
	private String location;
	private String subordinate;
	private Integer qty;
	private Integer useable;
	private String remark;

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

	public Integer getCategory() {
		return category;
	}

	public void setCategory(Integer category) {
		this.category = category;
	}

	public Date getFirstCheckTime() {
		return firstCheckTime;
	}

	public void setFirstCheckTime(Date firstCheckTime) {
		this.firstCheckTime = firstCheckTime;
	}

	public String getSituation() {
		return situation;
	}

	public void setSituation(String situation) {
		this.situation = situation;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getSubordinate() {
		return subordinate;
	}

	public void setSubordinate(String subordinate) {
		this.subordinate = subordinate;
	}

	public Integer getQty() {
		return qty;
	}

	public void setQty(Integer qty) {
		this.qty = qty;
	}

	public Integer getUseable() {
		return useable;
	}

	public void setUseable(Integer useable) {
		this.useable = useable;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	@Override
	public String toString() {
		return "Machine [id=" + id + ", name=" + name + ", category=" + category + ", firstCheckTime=" + firstCheckTime
				+ ", situation=" + situation + ", type=" + type + ", location=" + location + ", subordinate="
				+ subordinate + ", qty=" + qty + ", useable=" + useable + ", remark=" + remark + "]";
	}

}
