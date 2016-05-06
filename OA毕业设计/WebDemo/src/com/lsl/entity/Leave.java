package com.lsl.entity;

import java.sql.Timestamp;

/**
 * Leave entity. @author MyEclipse Persistence Tools
 */

public class Leave implements java.io.Serializable {

	// Fields

	private Integer LId;
	private Users users;
	private Approve approve;
	private Timestamp LStartTime;
	private Timestamp LEndTime;
	private Integer LDayCount;
	private Integer LType;
	private String LDesc;

	// Constructors

	/** default constructor */
	public Leave() {
	}

	/** minimal constructor */
	public Leave(Users users) {
		this.users = users;
	}

	/** full constructor */
	public Leave(Users users, Approve approve, Timestamp LStartTime,
			Timestamp LEndTime, Integer LDayCount, Integer LType, String LDesc) {
		this.users = users;
		this.approve = approve;
		this.LStartTime = LStartTime;
		this.LEndTime = LEndTime;
		this.LDayCount = LDayCount;
		this.LType = LType;
		this.LDesc = LDesc;
	}

	// Property accessors

	public Integer getLId() {
		return this.LId;
	}

	public void setLId(Integer LId) {
		this.LId = LId;
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

	public Timestamp getLStartTime() {
		return this.LStartTime;
	}

	public void setLStartTime(Timestamp LStartTime) {
		this.LStartTime = LStartTime;
	}

	public Timestamp getLEndTime() {
		return this.LEndTime;
	}

	public void setLEndTime(Timestamp LEndTime) {
		this.LEndTime = LEndTime;
	}

	public Integer getLDayCount() {
		return this.LDayCount;
	}

	public void setLDayCount(Integer LDayCount) {
		this.LDayCount = LDayCount;
	}

	public Integer getLType() {
		return this.LType;
	}

	public void setLType(Integer LType) {
		this.LType = LType;
	}

	public String getLDesc() {
		return this.LDesc;
	}

	public void setLDesc(String LDesc) {
		this.LDesc = LDesc;
	}

}