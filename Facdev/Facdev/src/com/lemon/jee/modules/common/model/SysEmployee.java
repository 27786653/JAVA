package com.lemon.jee.modules.common.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "sys_employee")
public class SysEmployee {

	@Id
	@GeneratedValue
	private Long id;
	private Long userId;
	private String code;
	private String realName;
	private String spell;
	private String alias;
	private String gender;
	private String subCompanyId;
	private String companyId;
	private String departmentId;
	private String workgroupId;
	private String dutyId;
	private String iDCard;
	private String bankCode;
	private String email;
	private String mobile;
	private String shortNumber;
	private String telephone;
	private String oicq;
	private String officePhone;
	private String officeZipCode;
	private String officeAddress;
	private String officeFax;
	private Integer age;
	private Date birthday;
	private String education;
	private String school;
	private Date graduationDate;
	private String major;
	private String degree;
	private String titleId;
	private Date titleDate;
	private String titleLevel;
	private String workingDate;
	private Date joinInDate;
	private String homeZipCode;
	private String homeAddress;
	private String homePhone;
	private String homeFax;
	private String province;
	private String city;
	private String area;
	private String nativePlace;
	private String party;
	private String nation;
	private String nationality;
	private String workingProperty;
	private String competency;
	private String emergencyContact;
	private Integer isDimission;
	private Date dimissionDate;
	private String dimissionCause;
	private String dimissionWhither;
	private String description;
	private Integer enabled;
	private Integer sortCode;
	private Integer deleteMark;
	private Date createDate;
	private String createUserId;
	private String createUserName;
	private Date modifyDate;
	private String modifyUserId;
	private String modifyUserName;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getRealName() {
		return realName;
	}

	public void setRealName(String realName) {
		this.realName = realName;
	}

	public String getSpell() {
		return spell;
	}

	public void setSpell(String spell) {
		this.spell = spell;
	}

	public String getAlias() {
		return alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getSubCompanyId() {
		return subCompanyId;
	}

	public void setSubCompanyId(String subCompanyId) {
		this.subCompanyId = subCompanyId;
	}

	public String getCompanyId() {
		return companyId;
	}

	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}

	public String getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(String departmentId) {
		this.departmentId = departmentId;
	}

	public String getWorkgroupId() {
		return workgroupId;
	}

	public void setWorkgroupId(String workgroupId) {
		this.workgroupId = workgroupId;
	}

	public String getDutyId() {
		return dutyId;
	}

	public void setDutyId(String dutyId) {
		this.dutyId = dutyId;
	}

	public String getiDCard() {
		return iDCard;
	}

	public void setiDCard(String iDCard) {
		this.iDCard = iDCard;
	}

	public String getBankCode() {
		return bankCode;
	}

	public void setBankCode(String bankCode) {
		this.bankCode = bankCode;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getShortNumber() {
		return shortNumber;
	}

	public void setShortNumber(String shortNumber) {
		this.shortNumber = shortNumber;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getOicq() {
		return oicq;
	}

	public void setOicq(String oicq) {
		this.oicq = oicq;
	}

	public String getOfficePhone() {
		return officePhone;
	}

	public void setOfficePhone(String officePhone) {
		this.officePhone = officePhone;
	}

	public String getOfficeZipCode() {
		return officeZipCode;
	}

	public void setOfficeZipCode(String officeZipCode) {
		this.officeZipCode = officeZipCode;
	}

	public String getOfficeAddress() {
		return officeAddress;
	}

	public void setOfficeAddress(String officeAddress) {
		this.officeAddress = officeAddress;
	}

	public String getOfficeFax() {
		return officeFax;
	}

	public void setOfficeFax(String officeFax) {
		this.officeFax = officeFax;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public String getEducation() {
		return education;
	}

	public void setEducation(String education) {
		this.education = education;
	}

	public String getSchool() {
		return school;
	}

	public void setSchool(String school) {
		this.school = school;
	}

	public Date getGraduationDate() {
		return graduationDate;
	}

	public void setGraduationDate(Date graduationDate) {
		this.graduationDate = graduationDate;
	}

	public String getMajor() {
		return major;
	}

	public void setMajor(String major) {
		this.major = major;
	}

	public String getDegree() {
		return degree;
	}

	public void setDegree(String degree) {
		this.degree = degree;
	}

	public String getTitleId() {
		return titleId;
	}

	public void setTitleId(String titleId) {
		this.titleId = titleId;
	}

	public Date getTitleDate() {
		return titleDate;
	}

	public void setTitleDate(Date titleDate) {
		this.titleDate = titleDate;
	}

	public String getTitleLevel() {
		return titleLevel;
	}

	public void setTitleLevel(String titleLevel) {
		this.titleLevel = titleLevel;
	}

	public String getWorkingDate() {
		return workingDate;
	}

	public void setWorkingDate(String workingDate) {
		this.workingDate = workingDate;
	}

	public Date getJoinInDate() {
		return joinInDate;
	}

	public void setJoinInDate(Date joinInDate) {
		this.joinInDate = joinInDate;
	}

	public String getHomeZipCode() {
		return homeZipCode;
	}

	public void setHomeZipCode(String homeZipCode) {
		this.homeZipCode = homeZipCode;
	}

	public String getHomeAddress() {
		return homeAddress;
	}

	public void setHomeAddress(String homeAddress) {
		this.homeAddress = homeAddress;
	}

	public String getHomePhone() {
		return homePhone;
	}

	public void setHomePhone(String homePhone) {
		this.homePhone = homePhone;
	}

	public String getHomeFax() {
		return homeFax;
	}

	public void setHomeFax(String homeFax) {
		this.homeFax = homeFax;
	}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getNativePlace() {
		return nativePlace;
	}

	public void setNativePlace(String nativePlace) {
		this.nativePlace = nativePlace;
	}

	public String getParty() {
		return party;
	}

	public void setParty(String party) {
		this.party = party;
	}

	public String getNation() {
		return nation;
	}

	public void setNation(String nation) {
		this.nation = nation;
	}

	public String getNationality() {
		return nationality;
	}

	public void setNationality(String nationality) {
		this.nationality = nationality;
	}

	public String getWorkingProperty() {
		return workingProperty;
	}

	public void setWorkingProperty(String workingProperty) {
		this.workingProperty = workingProperty;
	}

	public String getCompetency() {
		return competency;
	}

	public void setCompetency(String competency) {
		this.competency = competency;
	}

	public String getEmergencyContact() {
		return emergencyContact;
	}

	public void setEmergencyContact(String emergencyContact) {
		this.emergencyContact = emergencyContact;
	}

	public Integer getIsDimission() {
		return isDimission;
	}

	public void setIsDimission(Integer isDimission) {
		this.isDimission = isDimission;
	}

	public Date getDimissionDate() {
		return dimissionDate;
	}

	public void setDimissionDate(Date dimissionDate) {
		this.dimissionDate = dimissionDate;
	}

	public String getDimissionCause() {
		return dimissionCause;
	}

	public void setDimissionCause(String dimissionCause) {
		this.dimissionCause = dimissionCause;
	}

	public String getDimissionWhither() {
		return dimissionWhither;
	}

	public void setDimissionWhither(String dimissionWhither) {
		this.dimissionWhither = dimissionWhither;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getEnabled() {
		return enabled;
	}

	public void setEnabled(Integer enabled) {
		this.enabled = enabled;
	}

	public Integer getSortCode() {
		return sortCode;
	}

	public void setSortCode(Integer sortCode) {
		this.sortCode = sortCode;
	}

	public Integer getDeleteMark() {
		return deleteMark;
	}

	public void setDeleteMark(Integer deleteMark) {
		this.deleteMark = deleteMark;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getCreateUserId() {
		return createUserId;
	}

	public void setCreateUserId(String createUserId) {
		this.createUserId = createUserId;
	}

	public String getCreateUserName() {
		return createUserName;
	}

	public void setCreateUserName(String createUserName) {
		this.createUserName = createUserName;
	}

	public Date getModifyDate() {
		return modifyDate;
	}

	public void setModifyDate(Date modifyDate) {
		this.modifyDate = modifyDate;
	}

	public String getModifyUserId() {
		return modifyUserId;
	}

	public void setModifyUserId(String modifyUserId) {
		this.modifyUserId = modifyUserId;
	}

	public String getModifyUserName() {
		return modifyUserName;
	}

	public void setModifyUserName(String modifyUserName) {
		this.modifyUserName = modifyUserName;
	}

}
