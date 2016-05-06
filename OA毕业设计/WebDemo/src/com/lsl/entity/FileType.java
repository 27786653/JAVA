package com.lsl.entity;

import java.util.HashSet;
import java.util.Set;

/**
 * 文档类型
 * FileType entity. @author MyEclipse Persistence Tools
 */

public class FileType implements java.io.Serializable {

	// Fields

	private Integer ftId;
	private String ftName;
	private Set fileDetiles = new HashSet(0);

	// Constructors

	/** default constructor */
	public FileType() {
	}

	/** minimal constructor */
	public FileType(String ftName) {
		this.ftName = ftName;
	}

	/** full constructor */
	public FileType(String ftName, Set fileDetiles) {
		this.ftName = ftName;
		this.fileDetiles = fileDetiles;
	}

	// Property accessors

	public Integer getFtId() {
		return this.ftId;
	}

	public void setFtId(Integer ftId) {
		this.ftId = ftId;
	}

	public String getFtName() {
		return this.ftName;
	}

	public void setFtName(String ftName) {
		this.ftName = ftName;
	}

	public Set getFileDetiles() {
		return this.fileDetiles;
	}

	public void setFileDetiles(Set fileDetiles) {
		this.fileDetiles = fileDetiles;
	}

}