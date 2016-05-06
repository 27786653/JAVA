package com.lemon.jee.modules.common.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lemon.jee.common.config.Config;
import com.lemon.jee.common.utils.StringUtils;
import com.lemon.jee.modules.common.model.Machine;
import com.lemon.jee.modules.common.repository.MachineRepository;

@Service
@Transactional(readOnly = true)
public class MachineService {
	@Autowired
	private MachineRepository machineRepository;

	public Map<String, Object> getPage(int page, int limit, final String name, final Integer useable) {
		page = page <= 0 ? 0 : page - 1;
		PageRequest pageRequest = new PageRequest(page, limit);
		Page<Machine> sysPage = machineRepository.findAll(new Specification<Machine>() {
			public Predicate toPredicate(Root<Machine> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
				Path<String> pname = root.get("name");
				Path<Integer> puseable = root.get("useable");
				if (useable != null) {
					query.where(cb.like(pname, "%" + StringUtils.NullToEmpty(name) + "%"), cb.equal(puseable, useable)); // 这里可以设置任意条查询条件
				} else {
					query.where(cb.like(pname, "%" + StringUtils.NullToEmpty(name) + "%")); // 这里可以设置任意条查询条件
				}
				return null;
			}

		}, pageRequest);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_GRID_ITEMS, sysPage.getContent());
		map.put(Config.EXT_GRID_TOTAL, sysPage.getTotalElements());
		System.out.println(map.get(0));
		return map;
	}

	@Transactional(readOnly = false)
	public Map<String, Object> save(String name, String situation, String type, String location, String subordinate,
			Integer qty, Integer useable, String remark) {
		Date now = new Date();
		java.sql.Date date = new java.sql.Date(now.getTime());
		Machine machine = new Machine();
		machine.setName(name);
		machine.setFirstCheckTime(date);
		machine.setSituation(situation);
		machine.setType(type);
		machine.setLocation(location);
		machine.setSubordinate(subordinate);
		machine.setQty(qty);
		machine.setUseable(useable);
		machine.setRemark(remark);
		machineRepository.save(machine);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}

	public Map<String, Object> load(Long id) {
		Machine machine = machineRepository.findOne(id);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_FORM_DATA, machine);
		return map;
	}

	@Transactional(readOnly = false)
	public Map<String, Object> update(Long id, String name, String situation, String type, String location,
			String subordinate, Integer qty, Integer useable, String remark) {
		Machine machine = machineRepository.findOne(id);
		machine.setName(name);
		machine.setSituation(situation);
		machine.setType(type);
		machine.setLocation(location);
		machine.setSubordinate(subordinate);
		machine.setQty(qty);
		machine.setUseable(useable);
		machine.setRemark(remark);
		machineRepository.save(machine);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}
	
	@Transactional(readOnly = false)
	public Map<String, Object> delete(String[] ids) {
		for (String id : ids) {
			machineRepository.delete(Long.valueOf(id));
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}
}
