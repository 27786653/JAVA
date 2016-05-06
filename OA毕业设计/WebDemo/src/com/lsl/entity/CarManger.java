package com.lsl.entity;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

/**
 * CarManger entity. @author MyEclipse Persistence Tools
 */

public class CarManger implements java.io.Serializable {

	// Fields

	private Integer cmId;
	private Users users;
	private Car car;
	private Approve approve;
	private String cmDesc;
	private Timestamp cmEndTime;
	private Timestamp cmStartTime;
	private Set carOrUserses = new HashSet(0);

	// Constructors

	/** default constructor */
	public CarManger() {
	}

	/** full constructor */
	public CarManger(Users users, Car car, Approve approve, String cmDesc,
			Timestamp cmEndTime, Timestamp cmStartTime, Set carOrUserses) {
		this.users = users;
		this.car = car;
		this.approve = approve;
		this.cmDesc = cmDesc;
		this.cmEndTime = cmEndTime;
		this.cmStartTime = cmStartTime;
		this.carOrUserses = carOrUserses;
	}

	// Property accessors

	public Integer getCmId() {
		return this.cmId;
	}

	public void setCmId(Integer cmId) {
		this.cmId = cmId;
	}

	public Users getUsers() {
		return this.users;
	}

	public void setUsers(Users users) {
		this.users = users;
	}

	public Car getCar() {
		return this.car;
	}

	public void setCar(Car car) {
		this.car = car;
	}

	public Approve getApprove() {
		return this.approve;
	}

	public void setApprove(Approve approve) {
		this.approve = approve;
	}

	public String getCmDesc() {
		return this.cmDesc;
	}

	public void setCmDesc(String cmDesc) {
		this.cmDesc = cmDesc;
	}

	public Timestamp getCmEndTime() {
		return this.cmEndTime;
	}

	public void setCmEndTime(Timestamp cmEndTime) {
		this.cmEndTime = cmEndTime;
	}

	public Timestamp getCmStartTime() {
		return this.cmStartTime;
	}

	public void setCmStartTime(Timestamp cmStartTime) {
		this.cmStartTime = cmStartTime;
	}

	public Set getCarOrUserses() {
		return this.carOrUserses;
	}

	public void setCarOrUserses(Set carOrUserses) {
		this.carOrUserses = carOrUserses;
	}

}