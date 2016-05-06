package com.lsl.entity;

import java.sql.Timestamp;
import java.util.Date;

import com.lsl.util.DateChange;

/**
 * Note entity. @author MyEclipse Persistence Tools
 */

public class Note implements java.io.Serializable {

	// Fields

	private Integer NId;
	private Users users;
	private String NTitle;
	private String NContent;
	private Date NCreateTime;
	
	private int dayBetweenCount;

	// Constructors

	/** default constructor */
	public Note() {
	}

	/** full constructor */
	public Note(Users users, String NTitle, String NContent,
			Timestamp NCreateTime) {
		this.users = users;
		this.NTitle = NTitle;
		this.NContent = NContent;
		this.NCreateTime = NCreateTime;
	}

	// Property accessors

	public Integer getNId() {
		return this.NId;
	}

	public int getDayBetweenCount() {
		return dayBetweenCount;
	}

	public void setDayBetweenCount(int dayBetweenCount) {
		this.dayBetweenCount = dayBetweenCount;
	}

	public void setNId(Integer NId) {
		this.NId = NId;
	}

	public Users getUsers() {
		return this.users;
	}

	public void setUsers(Users users) {
		this.users = users;
	}

	public String getNTitle() {
		return this.NTitle;
	}

	public void setNTitle(String NTitle) {
		this.NTitle = NTitle;
	}

	public String getNContent() {
		return this.NContent;
	}

	public void setNContent(String NContent) {
		this.NContent = NContent;
	}

	public Date getNCreateTime() {
		return this.NCreateTime;
	}

	public void setNCreateTime(Date NCreateTime) {
		this.NCreateTime = NCreateTime;
		dayBetweenCount=DateChange.daysBetween(NCreateTime, new Date());
	}

}