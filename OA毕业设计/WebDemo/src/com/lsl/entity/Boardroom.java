package com.lsl.entity;

import java.util.HashSet;
import java.util.Set;

/**
 * Boardroom entity. @author MyEclipse Persistence Tools
 */

public class Boardroom implements java.io.Serializable {

	// Fields

	private Integer BId;
	private String BCode;
	private String BDesc;
	private Integer BState=0;
	private Set boardroomMangers = new HashSet(0);

	// Constructors

	/** default constructor */
	public Boardroom() {
	}

	/** full constructor */
	public Boardroom(String BCode, String BDesc, Integer BState,
			Set boardroomMangers) {
		this.BCode = BCode;
		this.BDesc = BDesc;
		this.BState = BState;
		this.boardroomMangers = boardroomMangers;
	}

	// Property accessors

	public Integer getBId() {
		return this.BId;
	}

	public void setBId(Integer BId) {
		this.BId = BId;
	}

	public String getBCode() {
		return this.BCode;
	}

	public void setBCode(String BCode) {
		this.BCode = BCode;
	}

	public String getBDesc() {
		return this.BDesc;
	}

	public void setBDesc(String BDesc) {
		this.BDesc = BDesc;
	}

	public Integer getBState() {
		return this.BState;
	}

	public void setBState(Integer BState) {
		this.BState = BState;
	}

	public Set getBoardroomMangers() {
		return this.boardroomMangers;
	}

	public void setBoardroomMangers(Set boardroomMangers) {
		this.boardroomMangers = boardroomMangers;
	}

}