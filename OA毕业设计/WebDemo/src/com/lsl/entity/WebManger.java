package com.lsl.entity;

/**
 * WebManger entity. @author MyEclipse Persistence Tools
 */

public class WebManger implements java.io.Serializable {

	// Fields

	private Integer WId;
	private Users users;
	private String WName;
	private String WAddress;

	// Constructors

	/** default constructor */
	public WebManger() {
	}

	/** full constructor */
	public WebManger(Users users, String WName, String WAddress) {
		this.users = users;
		this.WName = WName;
		this.WAddress = WAddress;
	}

	// Property accessors

	public Integer getWId() {
		return this.WId;
	}

	public void setWId(Integer WId) {
		this.WId = WId;
	}

	public Users getUsers() {
		return this.users;
	}

	public void setUsers(Users users) {
		this.users = users;
	}

	public String getWName() {
		return this.WName;
	}

	public void setWName(String WName) {
		this.WName = WName;
	}

	public String getWAddress() {
		return this.WAddress;
	}

	public void setWAddress(String WAddress) {
		this.WAddress = WAddress;
	}

}