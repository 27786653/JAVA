package com.lsl.entity;

import java.util.HashSet;
import java.util.Set;

/**
 * Sealtype entity. @author MyEclipse Persistence Tools
 */

public class Sealtype implements java.io.Serializable {

	// Fields

	private Integer stId;
	private String stName;
	private Set seals = new HashSet(0);

	// Constructors

	/** default constructor */
	public Sealtype() {
	}

	/** full constructor */
	public Sealtype(String stName, Set seals) {
		this.stName = stName;
		this.seals = seals;
	}

	// Property accessors

	public Integer getStId() {
		return this.stId;
	}

	public void setStId(Integer stId) {
		this.stId = stId;
	}

	public String getStName() {
		return this.stName;
	}

	public void setStName(String stName) {
		this.stName = stName;
	}

	public Set getSeals() {
		return this.seals;
	}

	public void setSeals(Set seals) {
		this.seals = seals;
	}

}