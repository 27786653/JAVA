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
import com.lemon.jee.modules.common.model.Expert;
import com.lemon.jee.modules.common.repository.ExpertRepository;

@Service
@Transactional(readOnly = true)
public class ExpertService {
	@Autowired
	private ExpertRepository expertRepository;

	public Map<String, Object> getPage(int page, int limit, final String title, final String name,
			final Integer isChecked) {
		page = page <= 0 ? 0 : page - 1;
		PageRequest pageRequest = new PageRequest(page, limit);
		Page<Expert> sysPage = expertRepository.findAll(new Specification<Expert>() {
			public Predicate toPredicate(Root<Expert> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
				Path<String> ename = root.get("name");
				Path<Integer> eisChecked = root.get("isChecked");
				if (isChecked != null) {
					query.where(cb.like(ename, "%" + StringUtils.NullToEmpty(name) + "%"),
							cb.equal(eisChecked, isChecked)); // 这里可以设置任意条查询条件
				} else {
					query.where(cb.like(ename, "%" + StringUtils.NullToEmpty(name) + "%")); // 这里可以设置任意条查询条件
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
	public Map<String, Object> save(String name, Integer gender, String organization, String zjzy, String major,
			String title, String cardNumber, String tel, String email, String remark, int isChecked) {
		Expert expert = new Expert();
		expert.setName(name);
		expert.setGender(gender);
		expert.setOrganization(organization);
		expert.setZjzy(zjzy);
		expert.setMajor(major);
		expert.setTitle(title);
		expert.setCardNumber(cardNumber);
		expert.setTel(tel);
		expert.setEmail(email);
		expert.setRemark(remark);
		expert.setIsChecked(isChecked);
		expertRepository.save(expert);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}

	public Map<String, Object> load(Long id) {
		Expert expert = expertRepository.findOne(id);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_FORM_DATA, expert);
		return map;
	}

	@Transactional(readOnly = false)
	public Map<String, Object> update(Long id, String name, Integer gender, String organization, String zjzy,
			String major, String title, String cardNumber, String tel, String email, String remark, int isChecked) {
		Expert expert = expertRepository.findOne(id);
		expert.setName(name);
		expert.setGender(gender);
		expert.setOrganization(organization);
		expert.setZjzy(zjzy);
		expert.setMajor(major);
		expert.setTitle(title);
		expert.setCardNumber(cardNumber);
		expert.setTel(tel);
		expert.setEmail(email);
		expert.setRemark(remark);
		expert.setIsChecked(isChecked);
		expertRepository.save(expert);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}

	@Transactional(readOnly = false)
	public Map<String, Object> delete(String[] ids) {
		for (String id : ids) {
			expertRepository.delete(Long.valueOf(id));
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}

}
