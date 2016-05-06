package com.lsl.bizimpl;

import java.util.List;

import com.lsl.biz.WebMangerBiz;
import com.lsl.dao.WebMangerDao;
import com.lsl.dao.WebMangerDao;
import com.lsl.entity.WebManger;

public class WebMangerBizimpl implements WebMangerBiz{
	private WebMangerDao wmd;
	
	public WebManger getById(int id) {
		// TODO Auto-generated method stub
		return wmd.getById(id);
	}

	public List<WebManger> getList(int page,int rows) {
		// TODO Auto-generated method stub
		return wmd.getList( page,rows);
	}

	public void delete(WebManger t) {
		// TODO Auto-generated method stub
		wmd.delete(t);
	}

	public void update(WebManger t) {
		// TODO Auto-generated method stub
		wmd.update(t);
	}

	public void add(WebManger t) {
		// TODO Auto-generated method stub
		wmd.add(t);
	}

	public int count(String id) {
		// TODO Auto-generated method stub
		return wmd.count(id);
	}

	public WebMangerDao getWmd() {
		return wmd;
	}

	public void setWmd(WebMangerDao wmd) {
		this.wmd = wmd;
	}

	



}
