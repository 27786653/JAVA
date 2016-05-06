package com.lemon.jee.modules.common.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lemon.jee.common.config.Config;
import com.lemon.jee.modules.common.model.SysMenu;
import com.lemon.jee.modules.common.model.SysRole;
import com.lemon.jee.modules.common.model.SysRoleMenuButton;
import com.lemon.jee.modules.common.model.SysUser;
import com.lemon.jee.modules.common.repository.SysMenuRepository;
import com.lemon.jee.modules.common.repository.SysRoleMenuButtonRepository;
import com.lemon.jee.modules.common.repository.SysRoleRepository;
import com.lemon.jee.modules.common.repository.SysUserRepository;
import com.lemon.jee.modules.common.viewutils.SysRoleView;
import com.lemon.jee.modules.security.service.AppSecurityMetadataSource;

@Service
@Transactional(readOnly = true)
public class SysRoleService {

	@Autowired
	private SysRoleRepository sysRoleRepository;

	@Autowired
	private SysUserRepository sysUserRepository;

	@Autowired
	private SysMenuRepository sysMenuRepository;

	@Autowired
	private SysRoleMenuButtonRepository sysRoleMenuButtonRepository;

	public Map<String, Object> getPage(int page, int limit) {

		page = page <= 0 ? 0 : page - 1;
//		PageRequest pageRequest = new PageRequest(page, limit);
		PageRequest pageRequest = new PageRequest(page, limit, new Sort("code"));
		Page<SysRole> sysPage = sysRoleRepository.findAll(pageRequest);
		List<SysRole> contentList = sysPage.getContent();

		List<SysRoleView> convertViewList = new ArrayList<SysRoleView>();
		for (SysRole sysButton : contentList) {
			SysRoleView convertView = new SysRoleView();
			BeanUtils.copyProperties(sysButton, convertView);
			convertViewList.add(convertView);
		}

		long total = sysPage.getTotalElements();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_GRID_ITEMS, convertViewList);
		map.put(Config.EXT_GRID_TOTAL, total);
		return map;
	}

	public Map<String, Object> load(Long id) {

		SysRole sysRole = sysRoleRepository.findOne(id);
		SysRoleView sysRoleView = new SysRoleView();
		BeanUtils.copyProperties(sysRole, sysRoleView);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_FORM_DATA, sysRoleView);
		return map;
	}

	@Transactional(readOnly = false)
	public Map<String, Object> save(SysRoleView sysRoleView) {

		SysRole sysRole = new SysRole();
		String[] ignoreProperties = { "id" };
		BeanUtils.copyProperties(sysRoleView, sysRole, ignoreProperties);

		sysRole.setCreateDate(new Date());
		sysRoleRepository.save(sysRole);
		
		Collection<ConfigAttribute> atts = new ArrayList<ConfigAttribute>();
		atts.add(new SecurityConfig("ROLE_" + sysRole.getId().toString()));
		atts.addAll((Collection<ConfigAttribute>)AppSecurityMetadataSource.resourceMap.get("/**"));
		AppSecurityMetadataSource.resourceMap.put("/**", atts);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}

	@Transactional(readOnly = false)
	public Map<String, Object> update(SysRoleView sysRoleView) {

		SysRole sysRole = sysRoleRepository.findOne(sysRoleView.getId());
		BeanUtils.copyProperties(sysRoleView, sysRole);

		sysRole.setModifyDate(new Date());

		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}

	@Transactional(readOnly = false)
	public Map<String, Object> delete(String[] ids) {

		for (String id : ids) {
			sysRoleRepository.delete(Long.valueOf(id));
		}
		
		Collection<ConfigAttribute> atts = new ArrayList<ConfigAttribute>();
		for (String id : ids) {
			atts.add(new SecurityConfig("ROLE_" + id));
		}
		Collection<ConfigAttribute> configAttributes = AppSecurityMetadataSource.resourceMap.get("/**");
		configAttributes.removeAll(atts);
		AppSecurityMetadataSource.resourceMap.put("/**", configAttributes);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}

	public Map<String, Object> getList() {

		List<SysRole> sysRoles = sysRoleRepository.findAll();
		List<SysRoleView> sysRoleViews = new ArrayList<SysRoleView>();
		for (SysRole sysRole : sysRoles) {
			SysRoleView sysRoleView = new SysRoleView();
			sysRoleView.setText(sysRole.getName() + "(" + sysRole.getCode() + ")");
			BeanUtils.copyProperties(sysRole, sysRoleView);
			sysRoleViews.add(sysRoleView);
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_TREE_CHILDREN, sysRoleViews);
		return map;
	}

	@Transactional(readOnly = false)
	public Map<String, Object> saveRoleMember(Long roleId, Long[] userIds) {

		List<Long> ids = new ArrayList<Long>();
		for (int i = 0; i < userIds.length; i++) {
			ids.add(userIds[i]);
		}

		SysRole sysRole = sysRoleRepository.findOne(roleId);
		List<SysUser> sysUsers = sysUserRepository.findAll(ids);

		boolean isHasRole = false;
		for (SysUser sysUser : sysUsers) {
			for (SysRole role : sysUser.getRoles()) {
				if (role.getId() == roleId) {
					isHasRole = true;
					break;
				}
			}
			if (!isHasRole) {
				sysUser.getRoles().add(sysRole);
			}
		}

		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}

	@Transactional(readOnly = false)
	public Map<String, Object> deleteRoleMember(Long roleId, Long[] ids) {

		SysRole sysRole = sysRoleRepository.findOne(roleId);

		List<SysUser> sysUsers = sysUserRepository.findAll(Arrays.asList(ids));

		sysRole.getUsers().removeAll(sysUsers);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}

	@Transactional(readOnly = false)
	public Map<String, Object> saveRoleMenu(Long roleId, Long[] menuIds) {

		SysRole sysRole = sysRoleRepository.findOne(roleId);
		List<SysMenu> sysMenus = sysMenuRepository.findAll(Arrays.asList(menuIds));

		sysRole.setMenus(sysMenus);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}

	@Transactional(readOnly = false)
	public Map<String, Object> saveRoleMenuButton(Long roleId, Long menuId, Long[] buttonIds) {

		List<SysRoleMenuButton> sysRoleMenuButtons = sysRoleMenuButtonRepository.findByRoleIdAndMenuId(roleId, menuId);
		sysRoleMenuButtonRepository.delete(sysRoleMenuButtons);

		List<SysRoleMenuButton> saveSysRoleMenuButtons = new ArrayList<SysRoleMenuButton>();
		for (int i = 0; i < buttonIds.length; i++) {
			SysRoleMenuButton sysRoleMenuButton = new SysRoleMenuButton();
			sysRoleMenuButton.setRoleId(roleId);
			sysRoleMenuButton.setMenuId(menuId);
			sysRoleMenuButton.setButtonId(buttonIds[i]);
			saveSysRoleMenuButtons.add(sysRoleMenuButton);
		}
		sysRoleMenuButtonRepository.save(saveSysRoleMenuButtons);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}

	public List<SysRole> findAll() {

		return sysRoleRepository.findAll();
	}

}
