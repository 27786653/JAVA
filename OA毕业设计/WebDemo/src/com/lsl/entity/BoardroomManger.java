package com.lsl.entity;

import java.sql.Timestamp;

/**
 * BoardroomManger entity. @author MyEclipse Persistence Tools
 */

public class BoardroomManger implements java.io.Serializable {

	// Fields

	private Integer bdId;
	private BoardroomType boardroomType;
	private Approve approve;
	private Boardroom boardroom;
	private Users users;
	private Timestamp bdCreateTime;
	private Timestamp bdEndTime;
	private Timestamp bdStartTime;

	// Constructors

	/** default constructor */
	public BoardroomManger() {
	}

	/** full constructor */
	public BoardroomManger(BoardroomType boardroomType, Approve approve,
			Boardroom boardroom, Users users, Timestamp bdCreateTime,
			Timestamp bdEndTime, Timestamp bdStartTime) {
		this.boardroomType = boardroomType;
		this.approve = approve;
		this.boardroom = boardroom;
		this.users = users;
		this.bdCreateTime = bdCreateTime;
		this.bdEndTime = bdEndTime;
		this.bdStartTime = bdStartTime;
	}

	// Property accessors

	public Integer getBdId() {
		return this.bdId;
	}

	public void setBdId(Integer bdId) {
		this.bdId = bdId;
	}

	public BoardroomType getBoardroomType() {
		return this.boardroomType;
	}

	public void setBoardroomType(BoardroomType boardroomType) {
		this.boardroomType = boardroomType;
	}

	public Approve getApprove() {
		return this.approve;
	}

	public void setApprove(Approve approve) {
		this.approve = approve;
	}

	public Boardroom getBoardroom() {
		return this.boardroom;
	}

	public void setBoardroom(Boardroom boardroom) {
		this.boardroom = boardroom;
	}

	public Users getUsers() {
		return this.users;
	}

	public void setUsers(Users users) {
		this.users = users;
	}

	public Timestamp getBdCreateTime() {
		return this.bdCreateTime;
	}

	public void setBdCreateTime(Timestamp bdCreateTime) {
		this.bdCreateTime = bdCreateTime;
	}

	public Timestamp getBdEndTime() {
		return this.bdEndTime;
	}

	public void setBdEndTime(Timestamp bdEndTime) {
		this.bdEndTime = bdEndTime;
	}

	public Timestamp getBdStartTime() {
		return this.bdStartTime;
	}

	public void setBdStartTime(Timestamp bdStartTime) {
		this.bdStartTime = bdStartTime;
	}

}