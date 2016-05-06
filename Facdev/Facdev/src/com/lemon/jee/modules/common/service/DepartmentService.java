package com.lemon.jee.modules.common.service;

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
import com.lemon.jee.modules.common.model.Department;
import com.lemon.jee.modules.common.repository.DepartmentRepository;

@Service
@Transactional(readOnly = true)
public class DepartmentService {
	@Autowired
	private  DepartmentRepository departmentRepository;
	public Map<String, Object> getPage(int page, int limit,final String departmentName) {
		page = page <= 0 ? 0 : page - 1;
		PageRequest pageRequest = new PageRequest(page, limit);
		Page<Department> sysPage = departmentRepository.findAll(
				new Specification<Department>() {
					public Predicate toPredicate(Root<Department> root,
							CriteriaQuery<?> query, CriteriaBuilder cb) {
						Path<String> name = root.get("name"); 
						query.where(cb.like(name,
								"%" + StringUtils.NullToEmpty(departmentName)
										+ "%")); // 这里可以设置任意条查询条件
						return null;
					}

				}, pageRequest);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_GRID_ITEMS, sysPage.getContent());
		map.put(Config.EXT_GRID_TOTAL, sysPage.getTotalElements());
		return map;
	}
}
