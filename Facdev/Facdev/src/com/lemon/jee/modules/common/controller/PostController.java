package com.lemon.jee.modules.common.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lemon.jee.modules.common.service.PostService;
import com.lemon.jee.modules.common.viewutils.SysUserView;

@Controller
public class PostController {
	
	@Autowired
	private PostService postService;
	
	@RequestMapping(value = "/post/getPage")
	@ResponseBody
	public Map<String, Object> getPage(int page, int limit,String title,String content,String userName,Integer isChecked) {
		return postService.getPage(page, limit, title,content,userName,isChecked);
	}
	
	@RequestMapping(value = "/post/save")
	@ResponseBody
	public Map<String, Object> save(String title,String content,int isChecked) {
		System.out.println("save:" + title + content + isChecked);
		return postService.save(title,content,isChecked);
	}
	
	@RequestMapping(value = "/post/load")
	@ResponseBody
	public Map<String, Object> load(Long id) {
		System.out.println("load:" + id);
		return postService.load(id);
	}
	
	@RequestMapping(value = "/post/update")
	@ResponseBody
	public Map<String, Object> update(Long id,String title,String content,Integer isChecked) {
		System.out.println("load:" + id + title + content + isChecked);
		return postService.update(id,title,content,isChecked);
	}
	
	@RequestMapping(value = "/post/delete")
	@ResponseBody
	public Map<String, Object> delete(String[] ids) {

		return postService.delete(ids);
	}
}
