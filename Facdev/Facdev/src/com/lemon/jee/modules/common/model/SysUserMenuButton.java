package com.lemon.jee.modules.common.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "sys_usermenubutton")
public class SysUserMenuButton {

	@Id
	@GeneratedValue
	private Long id;
	private Long userId;
	private Long menuId;
	private Long buttonId;

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

}
