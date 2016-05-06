package com.lemon.jee.modules.common.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lemon.jee.common.config.Config;
import com.lemon.jee.modules.common.model.SysOrganization;
import com.lemon.jee.modules.common.repository.SysOrganizationRepository;
import com.lemon.jee.modules.common.viewutils.SysOrganizationView;

@Service
@Transactional(readOnly = true)
public class SysOrganizationService {

	@Autowired
	private SysOrganizationRepository sysOrganizationRepository;

	public Map<String, Object> getList() {

		List<SysOrganization> sysOrganizations = sysOrganizationRepository.findByParentIdIsNull();
		List<SysOrganizationView> sysOrganizationViews = new ArrayList<SysOrganizationView>();

		recursionCopy(sysOrganizations, sysOrganizationViews);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_TREE_CHILDREN, sysOrganizationViews);
		return map;
	}

	public Map<String, Object> load(Long id) {

		SysOrganization sysOrganization = sysOrganizationRepository.findOne(id);
		SysOrganizationView sysOrganizationView = new SysOrganizationView();

		String[] ignoreProperties = { "children" };
		BeanUtils.copyProperties(sysOrganization, sysOrganizationView, ignoreProperties);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_FORM_DATA, sysOrganizationView);
		return map;
	}

	@Transactional(readOnly = false)
	public Map<String, Object> save(SysOrganizationView sysOrganizationView) {

		SysOrganization sysOrganization = new SysOrganization();
		String[] ignoreProperties = { "id" };
		BeanUtils.copyProperties(sysOrganizationView, sysOrganization, ignoreProperties);

		Long parentId = sysOrganization.getParentId();
		if (parentId == -1) {
			sysOrganization.setParentId(null);
			sysOrganization.setLeaf(0);
		} else {
			SysOrganization parentNode = sysOrganizationRepository.findOne(parentId);
			if (parentNode.getLeaf() != 0) { // 叶子节点
				parentNode.setLeaf(0);
			}
			sysOrganization.setParentId(parentId);
			sysOrganization.setLeaf(1);
		}

		sysOrganization.setCreateDate(new Date());
		sysOrganizationRepository.save(sysOrganization);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}

	@Transactional(readOnly = false)
	public Map<String, Object> update(SysOrganizationView sysOrganizationView) {

		SysOrganization sysOrganization = sysOrganizationRepository.findOne(sysOrganizationView.getId());

		Long parentId = sysOrganizationView.getParentId();
		if (parentId != -1) {

			if (sysOrganization.getParentId() == null) {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put(Config.EXT_SUCCESS, false);
				map.put(Config.EXT_MSG, "操作失败,不能给顶级菜单添加上级菜单");
				return map;
			}

			if (sysOrganizationView.getId().equals(parentId)) {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put(Config.EXT_SUCCESS, false);
				map.put(Config.EXT_MSG, "操作失败,不能选择本菜单做为上级菜单");
				return map;
			}

			List<Long> childMenuIds = new ArrayList<Long>();
			recursionChildMenuIds(childMenuIds, sysOrganization.getChildren());
			if (childMenuIds.contains(parentId)) {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put(Config.EXT_SUCCESS, false);
				map.put(Config.EXT_MSG, "操作失败,不能选择本菜单拥有的子菜单做为上级菜单");
				return map;
			}

			SysOrganization parentNewNode = sysOrganizationRepository.findOne(parentId);
			if (parentNewNode.getLeaf() != 0) { // 叶子节点
				parentNewNode.setLeaf(0);
			}
			SysOrganization parentOldNode = sysOrganizationRepository.findOne(sysOrganization.getParentId());
			if (parentOldNode.getChildren().size() == 1) {
				if (parentOldNode.getParentId() != null) {
					parentOldNode.setLeaf(1);
				}
			}
		}else {
			sysOrganizationView.setParentId(null);
		}
		String[] ignoreProperties = { "id","leaf","children" };
		BeanUtils.copyProperties(sysOrganizationView, sysOrganization, ignoreProperties);

		sysOrganization.setModifyDate(new Date());

		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}

	@Transactional(readOnly = false)
	public Map<String, Object> delete(String[] ids) {

		for (String id : ids) {

			SysOrganization sysOrganization = sysOrganizationRepository.findOne(Long.valueOf(id));
			Long parentId = sysOrganization.getParentId();
			if (parentId != null) {
				SysOrganization parentNode = sysOrganizationRepository.findOne(parentId);
				if (parentNode.getParentId() != null && parentNode.getChildren().size() == 1) {
					parentNode.setLeaf(1);
				}
				parentNode.getChildren().remove(sysOrganization);
			}
			sysOrganizationRepository.delete(sysOrganization);
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}

	private void recursionCopy(List<SysOrganization> sources, List<SysOrganizationView> targets) {

		for (SysOrganization source : sources) {
			SysOrganizationView targetView = new SysOrganizationView();
			List<SysOrganizationView> targetViews = new ArrayList<SysOrganizationView>();
			recursionCopy(source.getChildren(), targetViews);
			BeanUtils.copyProperties(source, targetView);
			targetView.setChildren(targetViews);
			targets.add(targetView);
		}
	}

	private void recursionChildMenuIds(List<Long> childMenuIds, List<SysOrganization> chilMenus) {
		for (SysOrganization sysOrganization : chilMenus) {
			childMenuIds.add(sysOrganization.getId());
			recursionChildMenuIds(childMenuIds, sysOrganization.getChildren());
		}
	}
}
