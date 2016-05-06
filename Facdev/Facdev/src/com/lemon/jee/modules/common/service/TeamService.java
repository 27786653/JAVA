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
import com.lemon.jee.modules.common.model.Team;
import com.lemon.jee.modules.common.repository.TeamRepository;

@Service
@Transactional(readOnly = true)
public class TeamService {
	@Autowired
	private TeamRepository teamRepository;

	public Map<String, Object> getPage(int page, int limit, final String name) {
		page = page <= 0 ? 0 : page - 1;
		PageRequest pageRequest = new PageRequest(page, limit);
		Page<Team> sysPage = teamRepository.findAll(new Specification<Team>() {
			public Predicate toPredicate(Root<Team> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
				Path<String> tname = root.get("name");
				query.where(cb.like(tname, "%" + StringUtils.NullToEmpty(name) + "%")); // 这里可以设置任意条查询条件
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
	public Map<String, Object> save(String name, String position, String job, String type, String organization,
			String title, String tel, String email, String remark) {
		Date now = new Date();
		java.sql.Date date = new java.sql.Date(now.getTime());
		Team team = new Team();
		team.setName(name);
		team.setPosition(position);
		team.setBirth(date);
		team.setJob(job);
		team.setType(type);
		team.setOrganization(organization);
		team.setTitle(title);
		team.setEmail(email);
		team.setRemark(remark);
		teamRepository.save(team);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}

	public Map<String, Object> load(Long id) {
		Team team = teamRepository.findOne(id);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_FORM_DATA, team);
		return map;
	}

	@Transactional(readOnly = false)
	public Map<String, Object> update(Long id, String name, String position, String job, String type,
			String organization, String title, String tel, String email, String remark) {
		Date now = new Date();
		java.sql.Date date = new java.sql.Date(now.getTime());
		Team team = teamRepository.findOne(id);
		team.setName(name);
		team.setPosition(position);
		team.setBirth(date);
		team.setJob(job);
		team.setType(type);
		team.setOrganization(organization);
		team.setTitle(title);
		team.setEmail(email);
		team.setRemark(remark);
		teamRepository.save(team);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}

	@Transactional(readOnly = false)
	public Map<String, Object> delete(String[] ids) {
		for (String id : ids) {
			teamRepository.delete(Long.valueOf(id));
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}
}
