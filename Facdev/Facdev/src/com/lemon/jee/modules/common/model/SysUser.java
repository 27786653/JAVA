package com.lemon.jee.modules.common.model;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.lemon.jee.common.utils.JsonDateSerializer;

@Entity
@Table(name = "sys_user")
public class SysUser {

	@Id
	@GeneratedValue
	private Long id;
	private String code;
	private String account;
	private String password;
	private String secretkey;
	private String realName;
	private String spell;
	private String alias;
	@Column(name = "defaultRoleId")
	private String roleId;
	private String gender;
	private String mobile;
	private String telephone;
	@JsonSerialize(using = JsonDateSerializer.class)
	private Date birthday;
	private String email;
	private String oicq;
	private String dutyId;
	private String titleId;
	private String regCompany;
	private String departmentId;
	private String workgroupId;
	private String description;
	private String securityLevel;
	@JsonSerialize(using = JsonDateSerializer.class)
	private Date changePasswordDate;
	private Integer openId;
	private String iPAddress;
	private String mACAddress;
	private Integer logOnCount;
	@JsonSerialize(using = JsonDateSerializer.class)
	private Date firstVisit;
	@JsonSerialize(using = JsonDateSerializer.class)
	private Date previousVisit;
	@JsonSerialize(using = JsonDateSerializer.class)
	private Date lastVisit;
	private Integer enabled = 1;
	private Integer sortCode;
	private Integer deleteMark;
	@JsonSerialize(using = JsonDateSerializer.class)
	private Date createDate;
	private String createUserId;
	private String createUserName;
	@JsonSerialize(using = JsonDateSerializer.class)
	private Date modifyDate;
	private String modifyUserId;
	private String modifyUserName;
	private Boolean isQualified = false;
	private Boolean isOnline = false;

	@JsonIgnore
	@ManyToMany(targetEntity = SysRole.class, cascade = { CascadeType.PERSIST,
			CascadeType.MERGE }, fetch = FetchType.LAZY)
	@JoinTable(name = "sys_userrole", joinColumns = @JoinColumn(name = "userId"), inverseJoinColumns = @JoinColumn(name = "roleId"))
	private List<SysRole> roles;

	public List<SysRole> getRoles() {
		return roles;
	}

	public void setRoles(List<SysRole> roles) {
		this.roles = roles;
	}

	public Boolean getIsOnline() {
		return isOnline;
	}

	public void setIsOnline(Boolean isOnline) {
		this.isOnline = isOnline;
	}

	public Boolean getIsQualified() {
		return isQualified;
	}

	public void setIsQualified(Boolean isQualified) {
		this.isQualified = isQualified;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getSecretkey() {
		return secretkey;
	}

	public void setSecretkey(String secretkey) {
		this.secretkey = secretkey;
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

	public String getRoleId() {
		return roleId;
	}

	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getOicq() {
		return oicq;
	}

	public void setOicq(String oicq) {
		this.oicq = oicq;
	}

	public String getDutyId() {
		return dutyId;
	}

	public void setDutyId(String dutyId) {
		this.dutyId = dutyId;
	}

	public String getTitleId() {
		return titleId;
	}

	public void setTitleId(String titleId) {
		this.titleId = titleId;
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getSecurityLevel() {
		return securityLevel;
	}

	public void setSecurityLevel(String securityLevel) {
		this.securityLevel = securityLevel;
	}

	public Date getChangePasswordDate() {
		return changePasswordDate;
	}

	public void setChangePasswordDate(Date changePasswordDate) {
		this.changePasswordDate = changePasswordDate;
	}

	public Integer getOpenId() {
		return openId;
	}

	public void setOpenId(Integer openId) {
		this.openId = openId;
	}

	public String getiPAddress() {
		return iPAddress;
	}

	public void setiPAddress(String iPAddress) {
		this.iPAddress = iPAddress;
	}

	public String getmACAddress() {
		return mACAddress;
	}

	public void setmACAddress(String mACAddress) {
		this.mACAddress = mACAddress;
	}

	public Integer getLogOnCount() {
		return logOnCount;
	}

	public void setLogOnCount(Integer logOnCount) {
		this.logOnCount = logOnCount;
	}

	public Date getFirstVisit() {
		return firstVisit;
	}

	public void setFirstVisit(Date firstVisit) {
		this.firstVisit = firstVisit;
	}

	public Date getPreviousVisit() {
		return previousVisit;
	}

	public void setPreviousVisit(Date previousVisit) {
		this.previousVisit = previousVisit;
	}

	public Date getLastVisit() {
		return lastVisit;
	}

	public void setLastVisit(Date lastVisit) {
		this.lastVisit = lastVisit;
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

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		// 判断的依据是，如果id不为null的话，就返回id的哈希码
		return result;
	}

	public String getRegCompany() {
		return regCompany;
	}

	public void setRegCompany(String regCompany) {
		this.regCompany = regCompany;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		final SysUser other = (SysUser) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}
