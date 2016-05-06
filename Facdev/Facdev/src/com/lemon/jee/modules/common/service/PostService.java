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
import com.lemon.jee.modules.common.model.Post;
import com.lemon.jee.modules.common.repository.PostRepository;
import com.lemon.jee.modules.security.util.SessionUserDetailsUtil;

@Service
@Transactional(readOnly = true)
public class PostService {
	@Autowired
	private PostRepository postRepository;

	public Map<String, Object> getPage(int page, int limit, final String title, final String content,
			final String userName, final Integer isChecked) {
		page = page <= 0 ? 0 : page - 1;
		PageRequest pageRequest = new PageRequest(page, limit);
		Page<Post> sysPage = postRepository.findAll(new Specification<Post>() {
			public Predicate toPredicate(Root<Post> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
				Path<String> ptitle = root.get("title");
				Path<String> pcontent = root.get("content");
				Path<String> puserName = root.get("userName");
				Path<Integer> pisChecked = root.get("isChecked");
				if (isChecked != null) {
						query.where(cb.like(ptitle, "%" + StringUtils.NullToEmpty(title) + "%"),
								cb.like(pcontent, "%" + StringUtils.NullToEmpty(content) + "%"),
								cb.like(puserName, "%" + StringUtils.NullToEmpty(userName) + "%"),
								cb.equal(pisChecked, isChecked)); // 这里可以设置任意条查询条件
				} else {
					query.where(cb.like(ptitle, "%" + StringUtils.NullToEmpty(title) + "%"),
							cb.like(pcontent, "%" + StringUtils.NullToEmpty(content) + "%"),
							cb.like(puserName, "%" + StringUtils.NullToEmpty(userName) + "%")); // 这里可以设置任意条查询条件
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
	public Map<String, Object> save(String title, String content, int isChecked) {
		Map<String, Object> map = new HashMap<String, Object>();

		if (title.length() > 50) {
			map.put("msg", "发帖失败,主题过长,最长为50个字");
			map.put("success", false);
		}

		if (content.length() > 4000) {
			map.put("msg", "发帖失败,内容过长,最长为4000个字");
			map.put("success", false);
		}

		Date now = new Date();
		java.sql.Date date = new java.sql.Date(now.getTime());

		Post post = new Post();
		post.setTitle(title);
		post.setContent(content);
		post.setIsChecked(isChecked);
		post.setUserName(SessionUserDetailsUtil.getLoginUserName());
		post.setPostTime(date);
		postRepository.save(post);

		System.out.println("save:" + title + content + isChecked);
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}

	public Map<String, Object> load(Long id) {
		Post post = postRepository.findOne(id);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_FORM_DATA, post);
		return map;
	}

	@Transactional(readOnly = false)
	public Map<String, Object> update(Long id, String title, String content, Integer isChecked) {
		// TODO Auto-generated method stub
		Date now = new Date();
		java.sql.Date date = new java.sql.Date(now.getTime());
		Post post = postRepository.findOne(id);
		post.setTitle(title);
		post.setContent(content);
		post.setIsChecked(isChecked);
		post.setModifyTime(date);
		postRepository.save(post);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}

	@Transactional(readOnly = false)
	public Map<String, Object> delete(String[] ids) {
		for (String id : ids) {
			postRepository.delete(Long.valueOf(id));
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put(Config.EXT_SUCCESS, true);
		return map;
	}

}
