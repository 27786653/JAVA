package com.lemon.jee.modules.common.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "sys_rolemenubutton")
public class SysRoleMenuButton {

	@Id
	@GeneratedValue
	private Long id;
	private Long roleId;
	private Long menuId;
	private Long buttonId;
	private Integer btnSortCode;

	// @JsonIgnore
	// @ManyToOne(targetEntity = SysRole.class, cascade = { CascadeType.PERSIST,
	// CascadeType.MERGE }, fetch = FetchType.LAZY)
	// @JoinColumn(name = "roleId")
	// private SysRole role;
	//
	// public SysRole getRole() {
	// return role;
	// }
	//
	// public void setRole(SysRole role) {
	// this.role = role;
	// }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getRoleId() {
		return roleId;
	}

	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}

	public Long getMenuId() {
		return menuId;
	}

	public void setMenuId(Long menuId) {
		this.menuId = menuId;
	}

	public Long getButtonId() {
		return buttonId;
	}

	public void setButtonId(Long buttonId) {
		this.buttonId = buttonId;
	}

	public Integer getBtnSortCode() {
		return btnSortCode;
	}

	public void setBtnSortCode(Integer btnSortCode) {
		this.btnSortCode = btnSortCode;
	}

}
