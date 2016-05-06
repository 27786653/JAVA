package com.lemon.jee.modules.common.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "expert")
public class Expert {
	@Id
	@GeneratedValue
	private Long id;
	private String name;
	private Integer gender;
	private String organization;
	private String zjzy;
	private String major;
	private String title;
	private String cardNumber;
	private String tel;
	private String email;
	private String remark;
	private Integer isChecked;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getGender() {
		return gender;
	}

	public void setGender(Integer gender) {
		this.gender = gender;
	}

	public String getOrganization() {
		return organization;
	}

	public void setOrganization(String organization) {
		this.organization = organization;
	}

	public String getZjzy() {
		return zjzy;
	}

	public void setZjzy(String zjzy) {
		this.zjzy = zjzy;
	}

	public String getMajor() {
		return major;
	}

	public void setMajor(String major) {
		this.major = major;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getCardNumber() {
		return cardNumber;
	}

	public void setCardNumber(String cardNumber) {
		this.cardNumber = cardNumber;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public Integer getIsChecked() {
		return isChecked;
	}

	public void setIsChecked(Integer isChecked) {
		this.isChecked = isChecked;
	}

	@Override
	public String toString() {
		return "Expert [id=" + id + ", name=" + name + ", gender=" + gender + ", organization=" + organization
				+ ", zjzy=" + zjzy + ", major=" + major + ", title=" + title + ", cardNumber=" + cardNumber + ", tel="
				+ tel + ", email=" + email + ", remark=" + remark + ", isChecked=" + isChecked + "]";
	}
	

}
