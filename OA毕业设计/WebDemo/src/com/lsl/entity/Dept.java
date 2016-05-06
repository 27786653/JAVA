package com.lsl.entity;

import java.util.HashSet;
import java.util.Set;

/**
 * Dept entity. @author MyEclipse Persistence Tools
 */

public class Dept implements java.io.Serializable {

	// Fields

	private Integer DId;
	private String DName;
	private String DDesc;
	private Set employees = new HashSet(0);
	private Set fileses = new HashSet(0);

	// Constructors

	/** default constructor */
	public Dept() {
	}

	/** minimal constructor */
	public Dept(String DName) {
		this.DName = DName;
	}

	/** full constructor */
	public Dept(String DName, String DDesc, Set employees, Set fileses) {
		this.DName = DName;
		this.DDesc = DDesc;
		this.employees = employees;
		this.fileses = fileses;
	}

	// Property accessors

	public Integer getDId() {
		return this.DId;
	}

	public void setDId(Integer DId) {
		this.DId = DId;
	}

	public String getDName() {
		return this.DName;
	}

	public void setDName(String DName) {
		this.DName = DName;
	}

	public String getDDesc() {
		return this.DDesc;
	}

	public void setDDesc(String DDesc) {
		this.DDesc = DDesc;
	}

	public Set getEmployees() {
		return this.employees;
	}

	public void setEmployees(Set employees) {
		this.employees = employees;
	}

	public Set getFileses() {
		return this.fileses;
	}

	public void setFileses(Set fileses) {
		this.fileses = fileses;
	}

}