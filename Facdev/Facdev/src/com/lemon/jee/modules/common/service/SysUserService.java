package com.lemon.jee.modules.common.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.authentication.encoding.MessageDigestPasswordEncoder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lemon.jee.common.config.Config;
import com.lemon.jee.common.utils.StringUtils;
import com.lemon.jee.modules.common.model.SysOrganization;
import com.lemon.jee.modules.common.model.SysRole;
import com.lemon.jee.modules.common.model.SysUser;
import com.lemon.jee.modules.common.repository.SysOrganizationRepository;
import com.lemon.jee.modules.common.repository.SysRoleRepository;
import com.lemon.jee.modules.common.repository.SysUserRepository;
import com.lemon.jee.modules.common.viewutils.SysUserView;

@Service
@Transactional(readOnly = true)
public class SysUserService {

	@Autowired
	private SysUserRepository sysUserRepository;

	@Autowired
	private SysRoleRepository sysRoleRepository;

	@Autowired
	private MessageDigestPasswordEncoder passwordEncoder;

	@Autowired
	private SysOrganizationRepository sysOrganizationRepository;

	public Map<String, Object> getPage(int page, int limit,
			final String userAccount, final String userName,
			final String phoneNum) {
		page = page <= 0 ? 0 : page - 1;
		PageRequest pageRequest = new PageRequest(page, limit);
		Page<SysUser> sysPage = sysUserRepository.findAll(
				new Specification<SysUser>() {
					public Predicate toPredicate(Root<SysUser> root,
							CriteriaQuery<?> query, CriteriaBuilder cb) {
						Path<String> account = root.get("account");
						Path<String> realName = root.get("realName");
						Path<String> mobile = root.get("mobile");
						query.where(cb.like(account,
								"%" + StringUtils.NullToEmpty(userAccount)
										+ "%"), cb.like(realName, "%"
								+ StringUtils.NullToEmpty(userName) + "%"), cb
								.like(mobile,
										"%" + StringUtils.NullToEmpty(phoneNum)
												+ "%")); // 这里可以设置任意条查询条件
						return null;
					}

				}, pageRequest);

		List<SysUser> contentList = sysPage.getContent();

		List<SysUserView> convertViewList = new ArrayList<SysUserView>();
		for (SysUser sysUser : contentList) {
			SysUserView convertView = new SysUserView();
			BeanUtils.copyProperties(sysUser, convertView);
			if (sysUser.getDepartmentId() != null
					&& !sysUser.getDepartmentId().trim().equals("")) {
				SysOrganization sysOrganization = sysOrganizationRepository
						.findOne(Long.parseLong(sysUser.getDepartmentId()));
				if (sysOrganization != null) {
					convertView.setDepartment(sysOrganization.getName());
				}
			}
			if (sysUser.getRoleId() != null
					&& !sysUser.getRoleId().trim().equals("")) {
				SysRole sysRole = sysRoleRepository.findOne(Long
						.parseLong(sysUser.getRoleId()));
				if (sysRole != null) {
					convertView.setRoleName(sysRole.getName());
				}
			}
			convertViewList.add(convertView);
		}

		long total = sysPage.getTotalElements();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_GRID_ITEMS, convertViewList);
		map.put(Config.EXT_GRID_TOTAL, total);
		return map;
	}

	public Map<String, Object> load(Long id) {

		SysUser sysUser = sysUserRepository.findOne(id);
		SysUserView sysUserView = new SysUserView();
		BeanUtils.copyProperties(sysUser, sysUserView);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_FORM_DATA, sysUserView);
		return map;
	}

	@Transactional(readOnly = false)
	public Map<String, Object> save(SysUserView sysUserView) {

		SysUser sysUser = new SysUser();
		String[] ignoreProperties = { "id" };
		BeanUtils.copyProperties(sysUserView, sysUser, ignoreProperties);
		sysUser.setCreateDate(new Date());
		sysUser.setPassword(passwordEncoder.encodePassword("123456",
				sysUserView.getAccount()));
		sysUser.setIsOnline(false);
		sysUser.setIsQualified(true);
		sysUser.setEnabled(1);
		List<SysRole> newRoleList = new ArrayList<SysRole>(0);
		newRoleList.add(sysRoleRepository.findOne(Long.valueOf(sysUserView
				.getRoleId())));
		sysUser.setRoles(newRoleList);
		sysUserRepository.save(sysUser);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}

	@Transactional(readOnly = false)
	public Map<String, Object> update(SysUserView sysUserView) {

		SysUser sysUser = sysUserRepository.findOne(sysUserView.getId());
		String[] ignoreProperties = { "password" };
		BeanUtils.copyProperties(sysUserView, sysUser, ignoreProperties);

		sysUser.setModifyDate(new Date());

		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}

	@Transactional(readOnly = false)
	public Map<String, Object> delete(String[] ids) {

		for (String id : ids) {
			sysUserRepository.delete(Long.valueOf(id));
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}

	public Map<String, Object> getPageByRoleId(int page, int limit, Long roleId) {

		page = page <= 0 ? 0 : page - 1;
		PageRequest pageRequest = new PageRequest(page, limit);
		Page<SysUser> sysPage = sysUserRepository.findByRoles_Id(roleId,
				pageRequest);
		List<SysUser> contentList = sysPage.getContent();

		List<SysUserView> convertViewList = new ArrayList<SysUserView>();
		for (SysUser sysUser : contentList) {
			SysUserView convertView = new SysUserView();
			BeanUtils.copyProperties(sysUser, convertView);
			convertViewList.add(convertView);
		}

		long total = sysPage.getTotalElements();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_GRID_ITEMS, convertViewList);
		map.put(Config.EXT_GRID_TOTAL, total);
		return map;
	}

	public Map<String, Object> getPageByDepartmentId(int page, int limit,
			Long departmentId) {

		page = page <= 0 ? 0 : page - 1;
		PageRequest pageRequest = new PageRequest(page, limit);
		Page<SysUser> sysPage = sysUserRepository.findByDepartmentId(
				departmentId.toString(), pageRequest);
		List<SysUser> contentList = sysPage.getContent();

		List<SysUserView> convertViewList = new ArrayList<SysUserView>();
		for (SysUser sysUser : contentList) {
			SysUserView convertView = new SysUserView();
			BeanUtils.copyProperties(sysUser, convertView);
			convertViewList.add(convertView);
		}

		long total = sysPage.getTotalElements();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_GRID_ITEMS, convertViewList);
		map.put(Config.EXT_GRID_TOTAL, total);
		return map;
	}

	@Transactional(readOnly = false)
	public Map<String, Object> enable(String[] ids) {

		for (String id : ids) {
			SysUser sysUser = sysUserRepository.findOne(new Long(id));
			sysUser.setEnabled(1);
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}
	
	@Transactional(readOnly = false)
	public Map<String, Object> enableHuman(String[] ids) {

		for (String id : ids) {
			SysUser sysUser = sysUserRepository.findOne(new Long(id));
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}

	@Transactional(readOnly = false)
	public Map<String, Object> disable(String[] ids) {

		for (String id : ids) {
			SysUser sysUser = sysUserRepository.findOne(new Long(id));
			sysUser.setEnabled(0);
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}
	
	@Transactional(readOnly = false)
	public Map<String, Object> disableHuman(String[] ids) {

		for (String id : ids) {
			SysUser sysUser = sysUserRepository.findOne(new Long(id));
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}

	@Transactional(readOnly = false)
	public Map<String, Object> changePwd(String pwd) {
		Map<String, Object> map = new HashMap<String, Object>();
		SysUser sysUser = sysUserRepository.findByAccount(this.getUsername());
		if (sysUser != null) {
			sysUser.setPassword(passwordEncoder.encodePassword(pwd,
					sysUser.getAccount()));
			sysUserRepository.save(sysUser);
			map.put("success", true);
			map.put("msg", "成功将密码修改为 ：" + pwd);
		} else {
			map.put("success", false);
			map.put("msg", "用户不存在修改失败！");
		}
		return map;
	}

	public String getUsername() {
		SecurityContext secContext = SecurityContextHolder.getContext();
		Authentication auth = secContext.getAuthentication();
		String userAccount = "";
		if (auth != null) {
			Object principal = auth.getPrincipal();
			if (principal instanceof UserDetails) {
				userAccount = ((UserDetails) principal).getUsername();
			} else {
				userAccount = principal.toString();
			}
		}
		return userAccount;
	}

	@Transactional(readOnly = false)
	public Map<String, Object> repassword(String[] ids) {

		for (String id : ids) {
			SysUser sysUser = sysUserRepository.findOne(new Long(id));
			sysUser.setPassword(passwordEncoder.encodePassword("123456",
					sysUser.getAccount()));
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}

}
