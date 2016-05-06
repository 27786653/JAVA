package com.lsl.entity;

/**
 * CarOrUsers entity. @author MyEclipse Persistence Tools
 */

public class CarOrUsers implements java.io.Serializable {

	// Fields

	private Integer couId;
	private Users users;
	private CarManger carManger;
	private Integer couType;

	// Constructors

	/** default constructor */
	public CarOrUsers() {
	}

	/** full constructor */
	public CarOrUsers(Users users, CarManger carManger, Integer couType) {
		this.users = users;
		this.carManger = carManger;
		this.couType = couType;
	}

	// Property accessors

	public Integer getCouId() {
		return this.couId;
	}

	public void setCouId(Integer couId) {
		this.couId = couId;
	}

	public Users getUsers() {
		return this.users;
	}

	public void setUsers(Users users) {
		this.users = users;
	}

	public CarManger getCarManger() {
		return this.carManger;
	}

	public void setCarManger(CarManger carManger) {
		this.carManger = carManger;
	}

	public Integer getCouType() {
		return this.couType;
	}

	public void setCouType(Integer couType) {
		this.couType = couType;
	}

}