package com.lsl.entity;

import java.util.HashSet;
import java.util.Set;

/**
 * Approveresults entity. @author MyEclipse Persistence Tools
 */

public class Approveresults implements java.io.Serializable {

	// Fields

	private Integer arId;
	private String arName;
	private Set approves = new HashSet(0);

	// Constructors

	/** default constructor */
	public Approveresults() {
	}

	/** full constructor */
	public Approveresults(String arName, Set approves) {
		this.arName = arName;
		this.approves = approves;
	}

	// Property accessors

	public Integer getArId() {
		return this.arId;
	}

	public void setArId(Integer arId) {
		this.arId = arId;
	}

	public String getArName() {
		return this.arName;
	}

	public void setArName(String arName) {
		this.arName = arName;
	}

	public Set getApproves() {
		return this.approves;
	}

	public void setApproves(Set approves) {
		this.approves = approves;
	}

}