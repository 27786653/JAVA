package com.lsl.entity;

import java.util.HashSet;
import java.util.Set;

/**
 * BoardroomType entity. @author MyEclipse Persistence Tools
 */

public class BoardroomType implements java.io.Serializable {

	// Fields

	private Integer bdtId;
	private String bdtName;
	private Set boardroomMangers = new HashSet(0);

	// Constructors

	/** default constructor */
	public BoardroomType() {
	}

	/** full constructor */
	public BoardroomType(String bdtName, Set boardroomMangers) {
		this.bdtName = bdtName;
		this.boardroomMangers = boardroomMangers;
	}

	// Property accessors

	public Integer getBdtId() {
		return this.bdtId;
	}

	public void setBdtId(Integer bdtId) {
		this.bdtId = bdtId;
	}

	public String getBdtName() {
		return this.bdtName;
	}

	public void setBdtName(String bdtName) {
		this.bdtName = bdtName;
	}

	public Set getBoardroomMangers() {
		return this.boardroomMangers;
	}

	public void setBoardroomMangers(Set boardroomMangers) {
		this.boardroomMangers = boardroomMangers;
	}

}