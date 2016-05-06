package com.lemon.jee.modules.common.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lemon.jee.modules.common.service.SysItemDetailService;
import com.lemon.jee.modules.common.viewutils.SysItemDetailsView;

@Controller
public class SysItemDetailController {

	@Autowired
	private SysItemDetailService sysItemDetailService;

	@RequestMapping(value = "/itemDetail/getPage")
	@ResponseBody
	public Map<String, Object> getPage(int page, int limit, Long itemsId) {

		return sysItemDetailService.getPage(page, limit, itemsId);
	}

	@RequestMapping(value = "/itemDetail/save")
	@ResponseBody
	public Map<String, Object> save(Long itemsId, SysItemDetailsView sysItemDetailsView) {

		System.out.println("itemsId " + itemsId);

		return sysItemDetailService.save(itemsId, sysItemDetailsView);
	}

	@RequestMapping(value = "/itemDetail/update")
	@ResponseBody
	public Map<String, Object> update(SysItemDetailsView sysItemDetailsView) {

		return sysItemDetailService.update(sysItemDetailsView);
	}

	@RequestMapping(value = "/itemDetail/load")
	@ResponseBody
	public Map<String, Object> load(Long id) {

		return sysItemDetailService.load(id);
	}

	@RequestMapping(value = "/itemDetail/delete")
	@ResponseBody
	public Map<String, Object> delete(String[] ids) {

		return sysItemDetailService.delete(ids);
	}

}
