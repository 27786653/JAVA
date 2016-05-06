package com.lemon.jee.modules.common.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "sys_organization")
public class SysOrganization {

	@Id
	@GeneratedValue
	private Long id;
//    @Column(insertable = false,updatable = false)
	private Long parentId;
	private String code;
	private String shortName;
	private String name;
	private Integer leaf;
	private String category;
	private Integer isInnerOrganize;
	private String manager;
	private String assistantManager;
	private String outerPhone;
	private String innerPhone;
	private String fax;
	private String postalcode;
	private String address;
	private String web;
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

	@JsonIgnore
	@OneToMany(targetEntity = SysOrganization.class, fetch = FetchType.LAZY, cascade = { CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE })
	@JoinColumn(name = "parentId")
	private List<SysOrganization> children;

    @JsonIgnore
    @ManyToMany(targetEntity = SysUser.class,cascade = { CascadeType.PERSIST, CascadeType.MERGE },fetch = FetchType.LAZY)
    @JoinTable(name = "sys_userorganization",joinColumns = @JoinColumn(name = "userId"),inverseJoinColumns = @JoinColumn(name = "organizationId"))
	private List<SysUser> sysUserList;

    public List<SysUser> getSysUserList() {
        return sysUserList;
    }

    public void setSysUserList(List<SysUser> sysUserList) {
        this.sysUserList = sysUserList;
    }

    public List<SysOrganization> getChildren() {
		return children;
	}

	public void setChildren(List<SysOrganization> children) {
		this.children = children;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getParentId() {
		return parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getShortName() {
		return shortName;
	}

	public void setShortName(String shortName) {
		this.shortName = shortName;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public Integer getIsInnerOrganize() {
		return isInnerOrganize;
	}

	public void setIsInnerOrganize(Integer isInnerOrganize) {
		this.isInnerOrganize = isInnerOrganize;
	}

	public String getManager() {
		return manager;
	}

	public void setManager(String manager) {
		this.manager = manager;
	}

	public String getAssistantManager() {
		return assistantManager;
	}

	public void setAssistantManager(String assistantManager) {
		this.assistantManager = assistantManager;
	}

	public String getOuterPhone() {
		return outerPhone;
	}

	public void setOuterPhone(String outerPhone) {
		this.outerPhone = outerPhone;
	}

	public String getInnerPhone() {
		return innerPhone;
	}

	public void setInnerPhone(String innerPhone) {
		this.innerPhone = innerPhone;
	}

	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	public String getPostalcode() {
		return postalcode;
	}

	public void setPostalcode(String postalcode) {
		this.postalcode = postalcode;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getWeb() {
		return web;
	}

	public void setWeb(String web) {
		this.web = web;
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

	public Integer getLeaf() {
		return leaf;
	}

	public void setLeaf(Integer leaf) {
		this.leaf = leaf;
	}

}
