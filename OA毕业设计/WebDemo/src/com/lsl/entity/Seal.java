package com.lsl.entity;

import java.sql.Timestamp;

/**
 * Seal entity. @author MyEclipse Persistence Tools
 */

public class Seal implements java.io.Serializable {

	// Fields

	private Integer SId;
	private Users users;
	private Approve approve;
	private Sealtype sealtype;
	private Timestamp SCreateTime;
	private String SDesc;

	// Constructors

	/** default constructor */
	public Seal() {
	}

	/** full constructor */
	public Seal(Users users, Approve approve, Sealtype sealtype,
			Timestamp SCreateTime, String SDesc) {
		this.users = users;
		this.approve = approve;
		this.sealtype = sealtype;
		this.SCreateTime = SCreateTime;
		this.SDesc = SDesc;
	}

	// Property accessors

	public Integer getSId() {
		return this.SId;
	}

	public void setSId(Integer SId) {
		this.SId = SId;
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

	public Sealtype getSealtype() {
		return this.sealtype;
	}

	public void setSealtype(Sealtype sealtype) {
		this.sealtype = sealtype;
	}

	public Timestamp getSCreateTime() {
		return this.SCreateTime;
	}

	public void setSCreateTime(Timestamp SCreateTime) {
		this.SCreateTime = SCreateTime;
	}

	public String getSDesc() {
		return this.SDesc;
	}

	public void setSDesc(String SDesc) {
		this.SDesc = SDesc;
	}

}