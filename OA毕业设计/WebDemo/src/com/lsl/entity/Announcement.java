package com.lsl.entity;

import java.sql.Timestamp;
import java.util.Date;

import com.lsl.util.DateChange;

/**
 * Announcement entity. @author MyEclipse Persistence Tools
 */

public class Announcement implements java.io.Serializable {

	// Fields

	private Integer anId;
	private Users users;
	private String anTitle;
	private String anContent;
	private Timestamp anDatetime;
	private Integer anLookCount;
	private Integer anState;
	private Integer anLevel;
	private Integer anReaded;
	
	
	private int betweenDay;

	// Constructors

	public int getBetweenDay() {
		return betweenDay;
	}

	public void setBetweenDay(int betweenDay) {
		this.betweenDay = betweenDay;
	}

	/** default constructor */
	public Announcement() {
	}

	/** minimal constructor */
	public Announcement(String anTitle, String anContent, Timestamp anDatetime) {
		this.anTitle = anTitle;
		this.anContent = anContent;
		this.anDatetime = anDatetime;
	}

	/** full constructor */
	public Announcement(Users users, String anTitle, String anContent,
			Timestamp anDatetime, Integer anLookCount, Integer anState,
			Integer anLevel, Integer anReaded) {
		this.users = users;
		this.anTitle = anTitle;
		this.anContent = anContent;
		this.anDatetime = anDatetime;
		this.anLookCount = anLookCount;
		this.anState = anState;
		this.anLevel = anLevel;
		this.anReaded = anReaded;
	}

	// Property accessors

	public Integer getAnId() {
		return this.anId;
	}

	public void setAnId(Integer anId) {
		this.anId = anId;
	}

	public Users getUsers() {
		return this.users;
	}

	public void setUsers(Users users) {
		this.users = users;
	}

	public String getAnTitle() {
		return this.anTitle;
	}

	public void setAnTitle(String anTitle) {
		this.anTitle = anTitle;
	}

	public String getAnContent() {
		return this.anContent;
	}

	public void setAnContent(String anContent) {
		this.anContent = anContent;
	}

	public Timestamp getAnDatetime() {
		return this.anDatetime;
	}

	public void setAnDatetime(Timestamp anDatetime) {
		this.anDatetime = anDatetime;
		betweenDay=DateChange.daysBetween(anDatetime, new Date());
	}

	public Integer getAnLookCount() {
		return this.anLookCount;
	}

	public void setAnLookCount(Integer anLookCount) {
		this.anLookCount = anLookCount;
	}

	public Integer getAnState() {
		return this.anState;
	}

	public void setAnState(Integer anState) {
		this.anState = anState;
	}

	public Integer getAnLevel() {
		return this.anLevel;
	}

	public void setAnLevel(Integer anLevel) {
		this.anLevel = anLevel;
	}

	public Integer getAnReaded() {
		return this.anReaded;
	}

	public void setAnReaded(Integer anReaded) {
		this.anReaded = anReaded;
	}

}