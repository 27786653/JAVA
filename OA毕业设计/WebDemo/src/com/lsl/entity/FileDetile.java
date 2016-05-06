package com.lsl.entity;

/**
 * 文档详细表
 * FileDetile entity. @author MyEclipse Persistence Tools
 */

public class FileDetile implements java.io.Serializable {

	// Fields

	private Integer fdId;
	private FileType fileType;
	private Files file;
	private Integer FIsDelete;
	private Integer fdParend;
	private String FUrl;
	private Double fdSize;

	// Constructors

	/** default constructor */
	public FileDetile() {
	}

	/** full constructor */
	public FileDetile(FileType fileType, Files file, Integer FIsDelete,
			Integer fdParend, String FUrl, Double fdSize) {
		this.fileType = fileType;
		this.file = file;
		this.FIsDelete = FIsDelete;
		this.fdParend = fdParend;
		this.FUrl = FUrl;
		this.fdSize = fdSize;
	}

	// Property accessors

	public Integer getFdId() {
		return this.fdId;
	}

	public void setFdId(Integer fdId) {
		this.fdId = fdId;
	}

	public FileType getFileType() {
		return this.fileType;
	}

	public void setFileType(FileType fileType) {
		this.fileType = fileType;
	}

	public Files getFile() {
		return this.file;
	}

	public void setFile(Files file) {
		this.file = file;
	}

	public Integer getFIsDelete() {
		return this.FIsDelete;
	}

	public void setFIsDelete(Integer FIsDelete) {
		this.FIsDelete = FIsDelete;
	}

	public Integer getFdParend() {
		return this.fdParend;
	}

	public void setFdParend(Integer fdParend) {
		this.fdParend = fdParend;
	}

	public String getFUrl() {
		return this.FUrl;
	}

	public void setFUrl(String FUrl) {
		this.FUrl = FUrl;
	}

	public Double getFdSize() {
		return this.fdSize;
	}

	public void setFdSize(Double fdSize) {
		this.fdSize = fdSize;
	}

}