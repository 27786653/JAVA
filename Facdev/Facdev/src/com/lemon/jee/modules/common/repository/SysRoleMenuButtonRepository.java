package com.lemon.jee.modules.common.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lemon.jee.modules.common.model.SysRoleMenuButton;

@Repository
public interface SysRoleMenuButtonRepository extends
		JpaRepository<SysRoleMenuButton, Long> {

	List<SysRoleMenuButton> findByRoleId(Long roleId);

	List<SysRoleMenuButton> findByRoleIdAndMenuId(Long roleId, Long menuId);

	SysRoleMenuButton findByMenuIdAndButtonId(Long menuId, Long buttonId);

	SysRoleMenuButton findByRoleIdAndMenuIdAndButtonId(Long roleId,
			Long menuId, Long buttonId);

}
