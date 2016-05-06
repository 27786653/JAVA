package com.lsl.entity;

/**
 * ProofOfearnings entity. @author MyEclipse Persistence Tools
 */

public class ProofOfearnings implements java.io.Serializable {

	// Fields

	private Integer poeId;
	private Users users;
	private Approve approve;
	private String UDesc;

	// Constructors

	/** default constructor */
	public ProofOfearnings() {
	}

	/** full constructor */
	public ProofOfearnings(Users users, Approve approve, String UDesc) {
		this.users = users;
		this.approve = approve;
		this.UDesc = UDesc;
	}

	// Property accessors

	public Integer getPoeId() {
		return this.poeId;
	}

	public void setPoeId(Integer poeId) {
		this.poeId = poeId;
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

	public String getUDesc() {
		return this.UDesc;
	}

	public void setUDesc(String UDesc) {
		this.UDesc = UDesc;
	}

}