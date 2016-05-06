package com.lemon.jee.modules.common.service;

import java.util.ArrayList;
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

import com.lemon.jee.common.config.Config;
import com.lemon.jee.modules.common.model.SysItemDetails;
import com.lemon.jee.modules.common.model.SysItems;
import com.lemon.jee.modules.common.repository.SysItemDetailsRepository;
import com.lemon.jee.modules.common.repository.SysItemsRepository;
import com.lemon.jee.modules.common.viewutils.SysItemDetailsView;

@Service
@Transactional(readOnly = true)
public class SysItemDetailService {

	@Autowired
	private SysItemDetailsRepository sysItemDetailsRepository;
	
	@Autowired
	private SysItemsRepository sysItemsRepository;

	public Map<String, Object> getPage(int page, int limit, Long itemsId) {

		page = page <= 0 ? 0 : page - 1;
		PageRequest pageRequest = new PageRequest(page, limit);
		Page<SysItemDetails> sysPage = sysItemDetailsRepository.findByItemsId(itemsId, pageRequest);
		List<SysItemDetails> contentList = sysPage.getContent();

		List<SysItemDetailsView> convertViewList = new ArrayList<SysItemDetailsView>();
		for (SysItemDetails sysItemDetails : contentList) {
			SysItemDetailsView sysItemDetailsView = new SysItemDetailsView();
			BeanUtils.copyProperties(sysItemDetails, sysItemDetailsView);
			convertViewList.add(sysItemDetailsView);
		}

		long total = sysPage.getTotalElements();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_GRID_ITEMS, convertViewList);
		map.put(Config.EXT_GRID_TOTAL, total);
		return map;
	}

	public Map<String, Object> load(Long id) {

		SysItemDetails sysItemDetails = sysItemDetailsRepository.findOne(id);
		SysItemDetailsView sysItemDetailsView = new SysItemDetailsView();
		BeanUtils.copyProperties(sysItemDetails, sysItemDetailsView);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_FORM_DATA, sysItemDetailsView);
		return map;
	}

	@Transactional(readOnly = false)
	public Map<String, Object> save(Long itemsId, SysItemDetailsView sysItemDetailsView) {

		SysItemDetails sysItemDetails = new SysItemDetails();
		String[] ignoreProperties = { "id" };
		BeanUtils.copyProperties(sysItemDetailsView, sysItemDetails, ignoreProperties);

		SysItems sysItems = sysItemsRepository.findOne(itemsId);
		if (sysItems == null) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put(Config.EXT_MSG, "所选类别不存在,请重新选择!");
			map.put(Config.EXT_SUCCESS, false);
			return map;
		}
		sysItemDetails.setItems(sysItems);
		sysItemDetails.setCreateDate(new Date());
		sysItemDetailsRepository.save(sysItemDetails);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}

	@Transactional(readOnly = false)
	public Map<String, Object> update(SysItemDetailsView sysItemDetailsView) {

		SysItemDetails sysItemDetails = sysItemDetailsRepository.findOne(sysItemDetailsView.getId());
		BeanUtils.copyProperties(sysItemDetailsView, sysItemDetails);

		sysItemDetails.setModifyDate(new Date());

		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}

	@Transactional(readOnly = false)
	public Map<String, Object> delete(String[] ids) {

		for (String id : ids) {
			sysItemDetailsRepository.delete(Long.valueOf(id));
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}

}
