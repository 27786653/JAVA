package com.lsl.entity;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

/**
 * Schedule entity. @author MyEclipse Persistence Tools
 */

public class Schedule implements java.io.Serializable {

	// Fields

	private Integer SId;
	private Users users;
	private Timestamp SStartTime;
	private Timestamp SEndTime;
	private String SPlace;
	private String STitle;
	private Integer SIsShare;
	private Integer SIsdept;
	private String SContent;
	private Set scheduleWiths = new HashSet(0);

	// Constructors

	/** default constructor */
	public Schedule() {
	}

	/** full constructor */
	public Schedule(Users users, Timestamp SStartTime, Timestamp SEndTime,
			String SPlace, String STitle, Integer SIsShare, Integer SIsdept,
			String SContent, Set scheduleWiths) {
		this.users = users;
		this.SStartTime = SStartTime;
		this.SEndTime = SEndTime;
		this.SPlace = SPlace;
		this.STitle = STitle;
		this.SIsShare = SIsShare;
		this.SIsdept = SIsdept;
		this.SContent = SContent;
		this.scheduleWiths = scheduleWiths;
	}

	// Property accessors

	public Integer getSId() {
		return this.SId;
	}

	public void setSId(Integer SId) {
		this.SId = SId;
	}

	public Users getUsers() {
		return this.users;
	}

	public void setUsers(Users users) {
		this.users = users;
	}

	public Timestamp getSStartTime() {
		return this.SStartTime;
	}

	public void setSStartTime(Timestamp SStartTime) {
		this.SStartTime = SStartTime;
	}

	public Timestamp getSEndTime() {
		return this.SEndTime;
	}

	public void setSEndTime(Timestamp SEndTime) {
		this.SEndTime = SEndTime;
	}

	public String getSPlace() {
		return this.SPlace;
	}

	public void setSPlace(String SPlace) {
		this.SPlace = SPlace;
	}

	public String getSTitle() {
		return this.STitle;
	}

	public void setSTitle(String STitle) {
		this.STitle = STitle;
	}

	public Integer getSIsShare() {
		return this.SIsShare;
	}

	public void setSIsShare(Integer SIsShare) {
		this.SIsShare = SIsShare;
	}

	public Integer getSIsdept() {
		return this.SIsdept;
	}

	public void setSIsdept(Integer SIsdept) {
		this.SIsdept = SIsdept;
	}

	public String getSContent() {
		return this.SContent;
	}

	public void setSContent(String SContent) {
		this.SContent = SContent;
	}

	public Set getScheduleWiths() {
		return this.scheduleWiths;
	}

	public void setScheduleWiths(Set scheduleWiths) {
		this.scheduleWiths = scheduleWiths;
	}

}