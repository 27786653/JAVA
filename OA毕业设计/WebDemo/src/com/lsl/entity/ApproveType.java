package com.lsl.entity;

import java.util.HashSet;
import java.util.Set;

/**
 * ApproveType entity. @author MyEclipse Persistence Tools
 */

public class ApproveType implements java.io.Serializable {

	// Fields

	private Integer atId;
	private String atName;
	private Set approves = new HashSet(0);

	// Constructors

	/** default constructor */
	public ApproveType() {
	}

	/** full constructor */
	public ApproveType(String atName, Set approves) {
		this.atName = atName;
		this.approves = approves;
	}

	// Property accessors

	public Integer getAtId() {
		return this.atId;
	}

	public void setAtId(Integer atId) {
		this.atId = atId;
	}

	public String getAtName() {
		return this.atName;
	}

	public void setAtName(String atName) {
		this.atName = atName;
	}

	public Set getApproves() {
		return this.approves;
	}

	public void setApproves(Set approves) {
		this.approves = approves;
	}

}