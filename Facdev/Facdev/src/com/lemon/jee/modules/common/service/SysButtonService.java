package com.lemon.jee.modules.common.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lemon.jee.common.config.Config;
import com.lemon.jee.modules.common.model.SysButton;
import com.lemon.jee.modules.common.model.SysMenu;
import com.lemon.jee.modules.common.model.SysRoleMenuButton;
import com.lemon.jee.modules.common.model.SysUser;
import com.lemon.jee.modules.common.repository.SysButtonRepository;
import com.lemon.jee.modules.common.repository.SysMenuRepository;
import com.lemon.jee.modules.common.repository.SysRoleMenuButtonRepository;
import com.lemon.jee.modules.common.repository.SysUserRepository;
import com.lemon.jee.modules.common.viewutils.SysButtonView;
import com.lemon.jee.modules.security.util.SessionUserDetailsUtil;

@Service
@Transactional(readOnly = true)
public class SysButtonService {

	@Autowired
	private SysUserRepository sysUserRepository;

	@Autowired
	private SysButtonRepository sysButtonRepository;

	@Autowired
	private SysMenuRepository sysMenuRepository;

	@Autowired
	private SysRoleMenuButtonRepository sysRoleMenuButtonRepository;

	public Map<String, Object> getToolbar(Long menuId) {

//		List<SysButton> sysButtons = sysMenuRepository.findOne(menuId)
//				.getButtons();
//		List<SysButtonView> sysButtonViews = new ArrayList<SysButtonView>();
//		SysButtonView sysButtonView;
//		for (SysButton sysButton : sysButtons) {
//			sysButtonView = new SysButtonView();
//			BeanUtils.copyProperties(sysButton, sysButtonView);
//			sysButtonViews.add(sysButtonView);
//		}

		SysUser sysUser = sysUserRepository
				.findByAccount(SessionUserDetailsUtil.getLoginUserName());
		String roleId = sysUser.getRoleId();
		

		System.out.println("roleId " + roleId);
		System.out.println("menuId " + menuId);
		
		List<SysRoleMenuButton> sysRoleMenuButtons = sysRoleMenuButtonRepository.findByRoleIdAndMenuId(Long.valueOf(roleId), menuId);
	
		List<Long> buttonIds = new ArrayList<Long>();
		for (SysRoleMenuButton sysRoleMenuButton : sysRoleMenuButtons) {
			buttonIds.add(sysRoleMenuButton.getButtonId());
		}

		List<SysButton> sysButtons = sysButtonRepository.findAll(buttonIds);
		List<SysButtonView> sysButtonViews = new ArrayList<SysButtonView>();
		for (SysButton sysButton : sysButtons) {
			SysButtonView sysButtonView = new SysButtonView();
			BeanUtils.copyProperties(sysButton, sysButtonView);
			sysButtonViews.add(sysButtonView);
		}
		
		for (SysRoleMenuButton sysRoleMenuButton : sysRoleMenuButtons) {
//			buttonIds.add(sysRoleMenuButton.getId());
			for (SysButtonView sysButtonView : sysButtonViews) {
				if (sysRoleMenuButton.getButtonId().equals(sysButtonView.getId())) {
					sysButtonView.setBtnSortCode(sysRoleMenuButton.getBtnSortCode());
					break;
				}
			}
		}
		
		Collections.sort(sysButtonViews, new Comparator<SysButtonView>() {

			public int compare(SysButtonView o1, SysButtonView o2) {
				// return o1.getSortCode().compareTo(o2.getSortCode());
				Integer sortCode1 = o1.getBtnSortCode();
				Integer sortCode2 = o2.getBtnSortCode();
				if (sortCode1 != null && sortCode2 != null) {
					return sortCode1.compareTo(sortCode2);
				}
				return 0;
			}
		});
		

		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_DATA, sysButtonViews);
		return map;
	}

	public Map<String, Object> getPage(int page, int limit) {
		System.out.println("limit:"+limit);
		page = page <= 0 ? 0 : page - 1;
		PageRequest pageRequest = new PageRequest(page, limit);
		Page<SysButton> sysPage = sysButtonRepository.findAll(pageRequest);
		List<SysButton> contentList = sysPage.getContent();

		List<SysButtonView> convertViewList = new ArrayList<SysButtonView>();
		for (SysButton sysButton : contentList) {
			SysButtonView convertView = new SysButtonView();
			BeanUtils.copyProperties(sysButton, convertView);
			convertViewList.add(convertView);
		}

		long total = sysPage.getTotalElements();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_GRID_ITEMS, convertViewList);
		map.put(Config.EXT_GRID_TOTAL, total);
		return map;
	}

	public Map<String, Object> getPageByMenuId(int page, int limit,
			Long roleId, Long menuId) {

		page = page <= 0 ? 0 : page - 1;
		PageRequest pageRequest = new PageRequest(page, limit);
		Page<SysButton> sysPage = sysButtonRepository.findByMenusId(menuId,
				pageRequest);
		List<SysButton> contentList = sysPage.getContent();

		List<SysButtonView> convertViewList = new ArrayList<SysButtonView>();
		for (SysButton sysButton : contentList) {
			SysButtonView convertView = new SysButtonView();
			BeanUtils.copyProperties(sysButton, convertView);
			convertViewList.add(convertView);
		}

		List<SysRoleMenuButton> sysRoleMenuButtons = sysRoleMenuButtonRepository
				.findByRoleIdAndMenuId(roleId, menuId);
		int length = sysRoleMenuButtons.size();
		for (int i = 0; i < length; i++) {
			SysRoleMenuButton sysRoleMenuButton = sysRoleMenuButtons.get(i);
			for (SysButtonView sysButtonView : convertViewList) {
				System.out.println("sysRoleMenuButton "
						+ sysRoleMenuButton.getId());
				System.out.println("sysButtonView " + sysButtonView.getId());

				if (sysRoleMenuButton.getButtonId().equals(
						sysButtonView.getId())) {
					sysButtonView.setBtnSortCode(sysRoleMenuButton
							.getBtnSortCode());
					break;
				}
			}
		}

		Collections.sort(convertViewList, new Comparator<SysButtonView>() {

			public int compare(SysButtonView o1, SysButtonView o2) {
				// return o1.getSortCode().compareTo(o2.getSortCode());
				Integer sortCode1 = o1.getBtnSortCode();
				Integer sortCode2 = o2.getBtnSortCode();
				if (sortCode1 != null && sortCode2 != null) {
					return sortCode1.compareTo(sortCode2);
				}
				return 0;
			}
		});

		long total = sysPage.getTotalElements();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_GRID_ITEMS, convertViewList);
		map.put(Config.EXT_GRID_TOTAL, total);
		return map;
	}

	/**
	 * 保存权限按钮顺序
	 * 
	 * @param json
	 * @return
	 */
	public Map<String, Object> saveBySyncBtnSortCode(Long roleId, Long menuId,
			String json) {

		ObjectMapper objectMapper = new ObjectMapper();

		List<SysButtonView> sysMenus = new ArrayList<SysButtonView>();
		String prefix = json.substring(0, 1);
		try {
			if (prefix.equals("[")) { // json数组
				SysButtonView[] menus = objectMapper.readValue(json,
						SysButtonView[].class);
				sysMenus = Arrays.asList(menus);
			} else {
				SysButtonView sysMenu = objectMapper.readValue(json,
						SysButtonView.class);
				sysMenus.add(sysMenu);
			}
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		List<SysRoleMenuButton> sysRoleMenuButtons = sysRoleMenuButtonRepository
				.findByRoleIdAndMenuId(roleId, menuId);
		int length = sysRoleMenuButtons.size();
		for (int i = 0; i < length; i++) {
			SysRoleMenuButton sysRoleMenuButton = sysRoleMenuButtons.get(i);
			for (SysButtonView sysButtonView : sysMenus) {

				if (sysRoleMenuButton.getButtonId().equals(
						sysButtonView.getId())) {
					sysRoleMenuButton.setBtnSortCode(sysButtonView
							.getBtnSortCode());
					sysRoleMenuButtonRepository.saveAndFlush(sysRoleMenuButton);
					break;
				}
			}
		}

		// for (SysButtonView sysButtonView : sysMenus) {
		//
		// SysRoleMenuButton sysRoleMenuButton = sysRoleMenuButtonRepository
		// .findByRoleIdAndMenuIdAndButtonId(roleId, menuId,
		// sysButtonView.getId());
		// sysRoleMenuButton.setBtnSortCode(sysButtonView.getBtnSortCode());
		// sysRoleMenuButtonRepository.saveAndFlush(sysRoleMenuButton);
		// }

		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}

	public List<SysButtonView> getListByMenuId(Long id) {

		SysMenu sysMenu = sysMenuRepository.findOne(id);
		List<SysButton> buttons = sysMenu.getButtons();

		List<SysButtonView> convertViewList = new ArrayList<SysButtonView>();
		for (SysButton sysButton : buttons) {
			SysButtonView convertView = new SysButtonView();
			BeanUtils.copyProperties(sysButton, convertView);
			convertViewList.add(convertView);
		}
		return convertViewList;
	}

	public List<SysButtonView> getListByRoleIdAndMenuId(Long roleId, Long menuId) {

		List<SysRoleMenuButton> sysRoleMenuButtons = sysRoleMenuButtonRepository
				.findByRoleIdAndMenuId(roleId, menuId);

		List<Long> buttonIds = new ArrayList<Long>();
		for (SysRoleMenuButton sysRoleMenuButton : sysRoleMenuButtons) {
			buttonIds.add(sysRoleMenuButton.getButtonId());
		}
		List<SysButton> buttons = sysButtonRepository.findAll(buttonIds);

		List<SysButtonView> convertViewList = new ArrayList<SysButtonView>();
		for (SysButton sysButton : buttons) {
			SysButtonView convertView = new SysButtonView();
			BeanUtils.copyProperties(sysButton, convertView);
			convertViewList.add(convertView);
		}
		return convertViewList;
	}

	public Map<String, Object> load(Long id) {

		SysButton sysButton = sysButtonRepository.findOne(id);
		SysButtonView sysButtonView = new SysButtonView();
		BeanUtils.copyProperties(sysButton, sysButtonView);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_FORM_DATA, sysButtonView);
		return map;
	}

	@Transactional(readOnly = false)
	public Map<String, Object> save(SysButtonView sysButtonView) {

		SysButton sysButton = new SysButton();
		String[] ignoreProperties = { "id" };
		BeanUtils.copyProperties(sysButtonView, sysButton, ignoreProperties);

		sysButton.setCreateDate(new Date());
		sysButtonRepository.save(sysButton);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}

	@Transactional(readOnly = false)
	public Map<String, Object> update(SysButtonView sysButtonView) {

		SysButton sysButton = sysButtonRepository
				.findOne(sysButtonView.getId());
		BeanUtils.copyProperties(sysButtonView, sysButton);

		sysButton.setModifyDate(new Date());

		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}

	@Transactional(readOnly = false)
	public Map<String, Object> delete(String[] ids) {

		for (String id : ids) {
			sysButtonRepository.delete(Long.valueOf(id));
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}

	@Transactional(readOnly = false)
	public Map<String, Object> test(String id) {

		sysButtonRepository.delete(Long.valueOf(id));
		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}
}
