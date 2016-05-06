package com.lsl.entity;

import java.util.HashSet;
import java.util.Set;

/**
 * 用户信息表
 * Users entity. @author MyEclipse Persistence Tools
 */

public class Users implements java.io.Serializable {

	// Fields

	private Integer UId;
	private Employee employee;
	private String UName;
	private String UPwd;
	private Integer UState;
	private Set webMangers = new HashSet(0);
	private Set scheduleWiths = new HashSet(0);
	private Set announcements = new HashSet(0);
	private Set leavesForUId = new HashSet(0);
	private Set schedules = new HashSet(0);
	private Set notes = new HashSet(0);
	private Set leavesForNextUId = new HashSet(0);
	private Set files = new HashSet(0);

	// Constructors

	/** default constructor */
	public Users() {
	}

	/** full constructor */
	public Users(Employee employee, String UName, String UPwd, Integer UState,
			Set webMangers, Set scheduleWiths, Set announcements,
			Set leavesForUId, Set schedules, Set notes, Set leavesForNextUId,
			Set files) {
		this.employee = employee;
		this.UName = UName;
		this.UPwd = UPwd;
		this.UState = UState;
		this.webMangers = webMangers;
		this.scheduleWiths = scheduleWiths;
		this.announcements = announcements;
		this.leavesForUId = leavesForUId;
		this.schedules = schedules;
		this.notes = notes;
		this.leavesForNextUId = leavesForNextUId;
		this.files = files;
	}

	// Property accessors

	public Integer getUId() {
		return this.UId;
	}

	public void setUId(Integer UId) {
		this.UId = UId;
	}

	public Employee getEmployee() {
		return this.employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public String getUName() {
		return this.UName;
	}

	public void setUName(String UName) {
		this.UName = UName;
	}

	public String getUPwd() {
		return this.UPwd;
	}

	public void setUPwd(String UPwd) {
		this.UPwd = UPwd;
	}

	public Integer getUState() {
		return this.UState;
	}

	public void setUState(Integer UState) {
		this.UState = UState;
	}

	public Set getWebMangers() {
		return this.webMangers;
	}

	public void setWebMangers(Set webMangers) {
		this.webMangers = webMangers;
	}

	public Set getScheduleWiths() {
		return this.scheduleWiths;
	}

	public void setScheduleWiths(Set scheduleWiths) {
		this.scheduleWiths = scheduleWiths;
	}

	public Set getAnnouncements() {
		return this.announcements;
	}

	public void setAnnouncements(Set announcements) {
		this.announcements = announcements;
	}

	public Set getLeavesForUId() {
		return this.leavesForUId;
	}

	public void setLeavesForUId(Set leavesForUId) {
		this.leavesForUId = leavesForUId;
	}

	public Set getSchedules() {
		return this.schedules;
	}

	public void setSchedules(Set schedules) {
		this.schedules = schedules;
	}

	public Set getNotes() {
		return this.notes;
	}

	public void setNotes(Set notes) {
		this.notes = notes;
	}

	public Set getLeavesForNextUId() {
		return this.leavesForNextUId;
	}

	public void setLeavesForNextUId(Set leavesForNextUId) {
		this.leavesForNextUId = leavesForNextUId;
	}

	public Set getFiles() {
		return this.files;
	}

	public void setFiles(Set files) {
		this.files = files;
	}

}