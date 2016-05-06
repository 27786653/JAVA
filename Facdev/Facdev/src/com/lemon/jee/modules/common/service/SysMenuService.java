package com.lemon.jee.modules.common.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lemon.jee.common.config.Config;
import com.lemon.jee.modules.common.model.SysButton;
import com.lemon.jee.modules.common.model.SysMenu;
import com.lemon.jee.modules.common.model.SysRole;
import com.lemon.jee.modules.common.model.SysUser;
import com.lemon.jee.modules.common.repository.SysButtonRepository;
import com.lemon.jee.modules.common.repository.SysMenuRepository;
import com.lemon.jee.modules.common.repository.SysRoleRepository;
import com.lemon.jee.modules.common.repository.SysUserRepository;
import com.lemon.jee.modules.common.viewutils.SysMenuView;
import com.lemon.jee.modules.security.util.SessionUserDetailsUtil;

@Service
@Transactional(readOnly = true)
public class SysMenuService {

	@Autowired
	private SysUserRepository sysUserRepository;

	@Autowired
	private SysMenuRepository sysMenuRepository;

	@Autowired
	private SysButtonRepository sysButtonRepository;

	@Autowired
	private SysRoleRepository sysRoleRepository;

	public Map<String, Object> getLeftMenus() {

		String account = SessionUserDetailsUtil.getLoginUserName();
		SysUser sysUser = sysUserRepository.findByAccount(account);
		String defaultRoleId = sysUser.getRoleId();
		SysRole sysRole = sysRoleRepository
				.findOne(Long.valueOf(defaultRoleId));

		List<SysMenu> sysMenus = sysRole.getMenus();

		List<SysMenu> leftMenus = new ArrayList<SysMenu>();
		for (SysMenu sysMenu : sysMenus) {
			if (null == sysMenu.getParentId()) {
				leftMenus.add(sysMenu);
			}
		}
		List<SysMenuView> leftMenuViews = new ArrayList<SysMenuView>();
		recursionCopy2(sysMenus, leftMenus, leftMenuViews);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_TREE_CHILDREN, leftMenuViews);
		return map;
	}

	public Map<String, Object> getList() {

		Order order = new Order("sortCode");
		Sort sort = new Sort(order);
		// List<SysMenu> sysMenus = sysMenuRepository.findAll(sort);
		//
		// List<SysMenu> leftMenus = new ArrayList<SysMenu>();
		// for (SysMenu sysMenu : sysMenus) {
		// if (null == sysMenu.getParentId()) {
		// leftMenus.add(sysMenu);
		// }
		// }
		List<SysMenu> leftMenus = sysMenuRepository.findByParentIdIsNull(sort);
		List<SysMenuView> leftMenuViews = new ArrayList<SysMenuView>();
		recursionCopy(leftMenus, leftMenuViews);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_TREE_CHILDREN, leftMenuViews);
		return map;
	}

	public Map<String, Object> load(Long id) {

		SysMenu sysMenu = sysMenuRepository.findOne(id);
		SysMenuView sysMenuView = new SysMenuView();

		String[] ignoreProperties = { "children" };
		BeanUtils.copyProperties(sysMenu, sysMenuView, ignoreProperties);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_FORM_DATA, sysMenuView);
		return map;
	}

	@Transactional(readOnly = false)
	public Map<String, Object> save(SysMenuView sysMenuView) {

		SysMenu sysMenu = new SysMenu();
		String[] ignoreProperties = { "id" };
		BeanUtils.copyProperties(sysMenuView, sysMenu, ignoreProperties);

		Long parentId = sysMenu.getParentId();
		if (parentId == -1) {
			sysMenu.setParentId(null);
			sysMenu.setLeaf(0);
		} else {
			SysMenu parentMenu = sysMenuRepository.findOne(parentId);
			if (parentMenu.getLeaf() != 0) { // 叶子节点
				parentMenu.setLeaf(0);
			}
			sysMenu.setParentId(parentId);
			sysMenu.setLeaf(1);
		}

		sysMenu.setCreateDate(new Date());
		sysMenuRepository.save(sysMenu);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}

	@Transactional(readOnly = false)
	public Map<String, Object> update(SysMenuView sysMenuView) {

		SysMenu sysMenu = sysMenuRepository.findOne(sysMenuView.getId());

		Long parentId = sysMenuView.getParentId();
		if (parentId != -1) {

			if (sysMenu.getParentId() == null) {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put(Config.EXT_SUCCESS, false);
				map.put(Config.EXT_MSG, "操作失败,不能给顶级菜单添加上级菜单");
				return map;
			}

			if (sysMenuView.getId().equals(parentId)) {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put(Config.EXT_SUCCESS, false);
				map.put(Config.EXT_MSG, "操作失败,不能选择本菜单做为上级菜单");
				return map;
			}

			List<Long> childMenuIds = new ArrayList<Long>();
			recursionChildMenuIds(childMenuIds, sysMenu.getChildren());
			if (childMenuIds.contains(parentId)) {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put(Config.EXT_SUCCESS, false);
				map.put(Config.EXT_MSG, "操作失败,不能选择本菜单拥有的子菜单做为上级菜单");
				return map;
			}

			SysMenu parentNewMenu = sysMenuRepository.findOne(parentId);
			if (parentNewMenu.getLeaf() != 0) { // 叶子节点
				parentNewMenu.setLeaf(0);
			}
			SysMenu parentOldMenu = sysMenuRepository.findOne(sysMenu
					.getParentId());
			if (parentOldMenu.getChildren().size() == 1) {
				if (parentOldMenu.getParentId() != null) {
					parentOldMenu.setLeaf(1);
				}
			}
		} else {
			sysMenuView.setParentId(null);
		}
		String[] ignoreProperties = { "id", "leaf", "children" };
		BeanUtils.copyProperties(sysMenuView, sysMenu, ignoreProperties);

		sysMenu.setModifyDate(new Date());

		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}

	@Transactional(readOnly = false)
	public Map<String, Object> delete(String[] ids) {

		for (String id : ids) {

			SysMenu sysMenu = sysMenuRepository.findOne(Long.valueOf(id));
			Long parentId = sysMenu.getParentId();
			if (parentId != null) {
				SysMenu parentMenu = sysMenuRepository.findOne(parentId);
				if (parentMenu.getParentId() != null
						&& parentMenu.getChildren().size() == 1) {
					parentMenu.setLeaf(1);
				}
				parentMenu.getChildren().remove(sysMenu);
			}
			sysMenuRepository.delete(sysMenu);
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}

	@Transactional(readOnly = false)
	public Map<String, Object> saveMenuBotton(String[] ids, Long menuId) {

		List<Long> idList = new ArrayList<Long>();
		for (String id : ids) {
			idList.add(Long.valueOf(id));
		}
		List<SysButton> sysButtons = sysButtonRepository.findAll(idList);
		SysMenu sysMenu = sysMenuRepository.findOne(menuId);
		sysMenu.setButtons(sysButtons);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}

	public Map<String, Object> getListByRoleId(Long roleId) {

		SysRole sysRole = sysRoleRepository.findOne(roleId);
		if (sysRole == null) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put(Config.EXT_TREE_CHILDREN, null);
			return map;
		}
		List<SysMenu> sysRoleMenus = sysRole.getMenus();
		List<SysMenu> sysMenus = sysMenuRepository.findAll();

		for (SysMenu sysMenu : sysMenus) {
			sysMenu.setChecked(false);
			for (SysMenu sysRoleMenu : sysRoleMenus) {
				if (sysMenu.getId() == sysRoleMenu.getId()) {
					sysMenu.setChecked(true);
					break;
				}
			}
		}

		List<SysMenu> menus = new ArrayList<SysMenu>();
		for (SysMenu sysMenu : sysMenus) {
			if (null == sysMenu.getParentId()) {
				menus.add(sysMenu);
			}
		}
		List<SysMenuView> sysMenuViews = new ArrayList<SysMenuView>();
		recursionCopy(menus, sysMenuViews);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_TREE_CHILDREN, sysMenuViews);
		return map;
	}

	public Map<String, Object> getAllByRoleId(Long roleId) {

		SysRole sysRole = sysRoleRepository.findOne(roleId);
		if (sysRole == null) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put(Config.EXT_TREE_CHILDREN, null);
			return map;
		}
		List<SysMenu> sysRoleMenus = sysRole.getMenus();

		List<SysMenu> menus = new ArrayList<SysMenu>();
		for (SysMenu sysMenu : sysRoleMenus) {
			if (null == sysMenu.getParentId()) {
				menus.add(sysMenu);
			}
		}
		List<SysMenuView> sysMenuViews = new ArrayList<SysMenuView>();
		recursionCopy(menus, sysMenuViews);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_TREE_CHILDREN, sysMenuViews);
		return map;
	}

	private void recursionCopy(List<SysMenu> source, List<SysMenuView> target) {

		for (SysMenu sysMenu : source) {
			SysMenuView sysMenuView = new SysMenuView();
			List<SysMenuView> sysMenuViews = new ArrayList<SysMenuView>();
			recursionCopy(sysMenu.getChildren(), sysMenuViews);
			BeanUtils.copyProperties(sysMenu, sysMenuView);
			sysMenuView.setChildren(sysMenuViews);
			target.add(sysMenuView);
		}
	}

	private void recursionCopy2(List<SysMenu> source,
			List<SysMenu> firstFloorMenus, List<SysMenuView> target) {
		for (SysMenu sysMenu : firstFloorMenus) {
			if (source.contains(sysMenu)) {
				SysMenuView sysMenuView = new SysMenuView();
				List<SysMenuView> sysMenuViews = new ArrayList<SysMenuView>();
				List<SysMenu> children = new ArrayList<SysMenu>();
				for(SysMenu s : source){
					if(s.getParentId()!=null&&s.getParentId().equals(sysMenu.getId())){
						children.add(s);
					}
				}
//				recursionCopy2(source, sysMenu.getChildren(), sysMenuViews);
				recursionCopy2(source, children, sysMenuViews);
				BeanUtils.copyProperties(sysMenu, sysMenuView);
				sysMenuView.setChildren(sysMenuViews);
				target.add(sysMenuView);
			}
		}
	}

	private void recursionChildMenuIds(List<Long> childMenuIds,
			List<SysMenu> chilMenus) {
		for (SysMenu sysMenu : chilMenus) {
			childMenuIds.add(sysMenu.getId());
			recursionChildMenuIds(childMenuIds, sysMenu.getChildren());
		}
	}
}
