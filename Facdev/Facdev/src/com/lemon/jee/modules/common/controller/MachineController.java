package com.lemon.jee.modules.common.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lemon.jee.modules.common.service.MachineService;

@Controller
public class MachineController {
	
	@Autowired
	private MachineService machineService;
	
	@RequestMapping(value = "/machine/getPage")
	@ResponseBody
	public Map<String, Object> getPage(int page, int limit,String title,String name,Integer useable) {
		return machineService.getPage(page, limit, name,useable);
	}
	
	@RequestMapping(value = "/machine/save")
	@ResponseBody
	public Map<String, Object> save(String name,String situation,String type,String location,String subordinate,Integer qty,Integer useable,String remark) {
		System.out.println("save:" + name + situation + type + location + subordinate + qty + useable  + remark);
		return machineService.save(name,situation,type,location,subordinate,qty,useable,remark);
	}
	
	@RequestMapping(value = "/machine/load")
	@ResponseBody
	public Map<String, Object> load(Long id) {
		System.out.println("load:" + id);
		return machineService.load(id);
	}
	
	@RequestMapping(value = "/machine/update")
	@ResponseBody
	public Map<String, Object> update(Long id,String name,String situation,String type,String location,String subordinate,Integer qty,Integer useable,String remark) {
		System.out.println("update:" + id + name + situation + type + location + subordinate + qty + useable  + remark);
		return machineService.update(id,name,situation,type,location,subordinate,qty,useable,remark);
	}
	
	@RequestMapping(value = "/machine/delete")
	@ResponseBody
	public Map<String, Object> delete(String[] ids) {
		return machineService.delete(ids);
	}
}
