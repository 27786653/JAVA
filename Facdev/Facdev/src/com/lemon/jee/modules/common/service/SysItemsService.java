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
import com.lemon.jee.modules.common.model.SysItems;
import com.lemon.jee.modules.common.repository.SysItemsRepository;
import com.lemon.jee.modules.common.viewutils.SysItemsView;

@Service
@Transactional(readOnly = true)
public class SysItemsService {

	@Autowired
	private SysItemsRepository sysItemsRepository;

	public Map<String, Object> getList() {

		List<SysItems> sysItems = sysItemsRepository.findAll();
		List<SysItemsView> sysItemsViews = new ArrayList<SysItemsView>();
		for (SysItems sysItem : sysItems) {
			SysItemsView sysItemsView = new SysItemsView();
			sysItemsView.setText(sysItem.getName());
			BeanUtils.copyProperties(sysItem, sysItemsView);
			sysItemsViews.add(sysItemsView);
		}

		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_TREE_CHILDREN, sysItemsViews);
		return map;
	}

	public Map<String, Object> load(Long id) {

		SysItems sysItems = sysItemsRepository.findOne(id);
		SysItemsView sysItemsView = new SysItemsView();
		BeanUtils.copyProperties(sysItems, sysItemsView);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_FORM_DATA, sysItemsView);
		return map;
	}

	@Transactional(readOnly = false)
	public Map<String, Object> save(SysItemsView sysItemsView) {

		SysItems sysItems = new SysItems();
		String[] ignoreProperties = { "id" };
		BeanUtils.copyProperties(sysItemsView, sysItems, ignoreProperties);

		sysItems.setCreateDate(new Date());
		sysItemsRepository.save(sysItems);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}

	@Transactional(readOnly = false)
	public Map<String, Object> update(SysItemsView sysItemsView) {

		SysItems sysItems = sysItemsRepository.findOne(sysItemsView.getId());
		BeanUtils.copyProperties(sysItemsView, sysItems);

		sysItems.setModifyDate(new Date());

		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}

	@Transactional(readOnly = false)
	public Map<String, Object> delete(String[] ids) {

		for (String id : ids) {
			SysItems sysItems = sysItemsRepository.findOne(Long.valueOf(id));
			if (sysItems.getItemDetails().size() != 0) {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put(Config.EXT_MSG, "操作失败,有明细不允许删除,有明细还未被删除");
				map.put(Config.EXT_SUCCESS, false);
				return map;
			}
			sysItemsRepository.delete(Long.valueOf(id));
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}

}
