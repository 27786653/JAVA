package com.lsl.bizimpl;

import java.util.List;

import com.lsl.biz.LeaveBiz;
import com.lsl.dao.LeaveDao;
import com.lsl.entity.Leave;

public class LeaveBizimpl implements LeaveBiz{
	private LeaveDao ld;
	
	public Leave getById(int id) {
		// TODO Auto-generated method stub
		return ld.getById(id);
	}

	public List<Leave> getList(int page,int rows) {
		// TODO Auto-generated method stub
		return ld.getList( page,rows);
	}

	public void delete(Leave t) {
		// TODO Auto-generated method stub
		ld.delete(t);
	}

	public void update(Leave t) {
		// TODO Auto-generated method stub
		ld.update(t);
	}

	public void add(Leave t) {
		// TODO Auto-generated method stub
		ld.add(t);
	}

	public int count(String id) {
		// TODO Auto-generated method stub
		return ld.count(id);
	}

	public LeaveDao getLd() {
		return ld;
	}

	public void setLd(LeaveDao ld) {
		this.ld = ld;
	}




}
