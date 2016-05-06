package com.lsl.entity;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

/**
 * Files entity. @author MyEclipse Persistence Tools
 */

public class Files implements java.io.Serializable {

	// Fields

	private Integer FId;
	private Dept dept;
	private Users users;
	private Timestamp FCreateTime;
	private String FName;
	private Integer FIsdept;
	private Set fileDetiles = new HashSet(0);

	// Constructors

	/** default constructor */
	public Files() {
	}

	/** minimal constructor */
	public Files(Users users) {
		this.users = users;
	}

	/** full constructor */
	public Files(Dept dept, Users users, Timestamp FCreateTime, String FName,
			Integer FIsdept, Set fileDetiles) {
		this.dept = dept;
		this.users = users;
		this.FCreateTime = FCreateTime;
		this.FName = FName;
		this.FIsdept = FIsdept;
		this.fileDetiles = fileDetiles;
	}

	// Property accessors

	public Integer getFId() {
		return this.FId;
	}

	public void setFId(Integer FId) {
		this.FId = FId;
	}

	public Dept getDept() {
		return this.dept;
	}

	public void setDept(Dept dept) {
		this.dept = dept;
	}

	public Users getUsers() {
		return this.users;
	}

	public void setUsers(Users users) {
		this.users = users;
	}

	public Timestamp getFCreateTime() {
		return this.FCreateTime;
	}

	public void setFCreateTime(Timestamp FCreateTime) {
		this.FCreateTime = FCreateTime;
	}

	public String getFName() {
		return this.FName;
	}

	public void setFName(String FName) {
		this.FName = FName;
	}

	public Integer getFIsdept() {
		return this.FIsdept;
	}

	public void setFIsdept(Integer FIsdept) {
		this.FIsdept = FIsdept;
	}

	public Set getFileDetiles() {
		return this.fileDetiles;
	}

	public void setFileDetiles(Set fileDetiles) {
		this.fileDetiles = fileDetiles;
	}

}