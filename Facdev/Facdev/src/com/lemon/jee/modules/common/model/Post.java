package com.lemon.jee.modules.common.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.lemon.jee.common.utils.JsonDateSerializer;

@Entity
@Table(name = "post")
public class Post {
	@Id
	@GeneratedValue
	private Long id;
	private String title;
	private String content;
	@JsonSerialize(using = JsonDateSerializer.class)
	private Date postTime;
	@JsonSerialize(using = JsonDateSerializer.class)
	private Date modifyTime;
	private Integer isChecked;
	private String userName;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Date getPostTime() {
		return postTime;
	}

	public void setPostTime(Date postTime) {
		this.postTime = postTime;
	}

	public Date getModifyTime() {
		return modifyTime;
	}

	public void setModifyTime(Date modifyTime) {
		this.modifyTime = modifyTime;
	}

	public Integer getIsChecked() {
		return isChecked;
	}

	public void setIsChecked(Integer isChecked) {
		this.isChecked = isChecked;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	@Override
	public String toString() {
		return "Post [id=" + id + ", title=" + title + ", content=" + content + ", postTime=" + postTime
				+ ", modifyTime=" + modifyTime + ", isChecked=" + isChecked + ", userName=" + userName + "]";
	}

}
