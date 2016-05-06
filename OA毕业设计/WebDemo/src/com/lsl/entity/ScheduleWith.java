package com.lsl.entity;

/**
 * ScheduleWith entity. @author MyEclipse Persistence Tools
 */

public class ScheduleWith implements java.io.Serializable {

	// Fields

	private Integer swId;
	private Users users;
	private Schedule schedule;

	// Constructors

	/** default constructor */
	public ScheduleWith() {
	}

	/** full constructor */
	public ScheduleWith(Users users, Schedule schedule) {
		this.users = users;
		this.schedule = schedule;
	}

	// Property accessors

	public Integer getSwId() {
		return this.swId;
	}

	public void setSwId(Integer swId) {
		this.swId = swId;
	}

	public Users getUsers() {
		return this.users;
	}

	public void setUsers(Users users) {
		this.users = users;
	}

	public Schedule getSchedule() {
		return this.schedule;
	}

	public void setSchedule(Schedule schedule) {
		this.schedule = schedule;
	}

}