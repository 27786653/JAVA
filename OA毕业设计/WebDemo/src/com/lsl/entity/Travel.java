package com.lsl.entity;

import java.sql.Timestamp;

/**
 * Travel entity. @author MyEclipse Persistence Tools
 */

public class Travel implements java.io.Serializable {

	// Fields

	private Integer TId;
	private Users users;
	private Approve approve;
	private Timestamp TStartTime;
	private Timestamp TEndTime;
	private String TPlace;
	private String TDesc;
	private String TTask;
	private Double TLornmoney;

	// Constructors

	/** default constructor */
	public Travel() {
	}

	/** full constructor */
	public Travel(Users users, Approve approve, Timestamp TStartTime,
			Timestamp TEndTime, String TPlace, String TDesc, String TTask,
			Double TLornmoney) {
		this.users = users;
		this.approve = approve;
		this.TStartTime = TStartTime;
		this.TEndTime = TEndTime;
		this.TPlace = TPlace;
		this.TDesc = TDesc;
		this.TTask = TTask;
		this.TLornmoney = TLornmoney;
	}

	// Property accessors

	public Integer getTId() {
		return this.TId;
	}

	public void setTId(Integer TId) {
		this.TId = TId;
	}

	public Users getUsers() {
		return this.users;
	}

	public void setUsers(Users users) {
		this.users = users;
	}

	public Approve getApprove() {
		return this.approve;
	}

	public void setApprove(Approve approve) {
		this.approve = approve;
	}

	public Timestamp getTStartTime() {
		return this.TStartTime;
	}

	public void setTStartTime(Timestamp TStartTime) {
		this.TStartTime = TStartTime;
	}

	public Timestamp getTEndTime() {
		return this.TEndTime;
	}

	public void setTEndTime(Timestamp TEndTime) {
		this.TEndTime = TEndTime;
	}

	public String getTPlace() {
		return this.TPlace;
	}

	public void setTPlace(String TPlace) {
		this.TPlace = TPlace;
	}

	public String getTDesc() {
		return this.TDesc;
	}

	public void setTDesc(String TDesc) {
		this.TDesc = TDesc;
	}

	public String getTTask() {
		return this.TTask;
	}

	public void setTTask(String TTask) {
		this.TTask = TTask;
	}

	public Double getTLornmoney() {
		return this.TLornmoney;
	}

	public void setTLornmoney(Double TLornmoney) {
		this.TLornmoney = TLornmoney;
	}

}