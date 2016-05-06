package com.lemon.jee.modules.common.viewutils;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SysRoleMenuView {

	private Long id;
	private Long parentId;
	private String code;
	@JsonProperty(value = "text")
	private String name;
	private Integer leaf;
	@JsonProperty(value = "iconCls")
	private String img;
	private String description;
	private Integer enabled;
	private Integer expanded = 1;
	private Integer sortCode;

	private Integer checked = 0;

	private List<SysRoleMenuView> children = new ArrayList<SysRoleMenuView>();

}
