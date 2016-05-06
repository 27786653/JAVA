package com.lsl.entity;

/**
 * PicketSeal entity. @author MyEclipse Persistence Tools
 */

public class PicketSeal implements java.io.Serializable {

	// Fields

	private Integer psId;
	private Users users;
	private Approve approve;
	private Integer psCellphone;
	private String psPhone;
	private Integer psCount;
	private String psDesc;

	// Constructors

	/** default constructor */
	public PicketSeal() {
	}

	/** full constructor */
	public PicketSeal(Users users, Approve approve, Integer psCellphone,
			String psPhone, Integer psCount, String psDesc) {
		this.users = users;
		this.approve = approve;
		this.psCellphone = psCellphone;
		this.psPhone = psPhone;
		this.psCount = psCount;
		this.psDesc = psDesc;
	}

	// Property accessors

	public Integer getPsId() {
		return this.psId;
	}

	public void setPsId(Integer psId) {
		this.psId = psId;
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

	public Integer getPsCellphone() {
		return this.psCellphone;
	}

	public void setPsCellphone(Integer psCellphone) {
		this.psCellphone = psCellphone;
	}

	public String getPsPhone() {
		return this.psPhone;
	}

	public void setPsPhone(String psPhone) {
		this.psPhone = psPhone;
	}

	public Integer getPsCount() {
		return this.psCount;
	}

	public void setPsCount(Integer psCount) {
		this.psCount = psCount;
	}

	public String getPsDesc() {
		return this.psDesc;
	}

	public void setPsDesc(String psDesc) {
		this.psDesc = psDesc;
	}

}