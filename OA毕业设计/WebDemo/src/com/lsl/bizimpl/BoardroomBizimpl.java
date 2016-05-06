package com.lsl.bizimpl;

import java.util.List;

import com.lsl.biz.BoardroomBiz;
import com.lsl.biz.BoardroomBiz;
import com.lsl.biz.NoteBiz;
import com.lsl.biz.NoteBiz;
import com.lsl.dao.BoardroomDao;
import com.lsl.dao.BoardroomDao;
import com.lsl.dao.NoteDao;
import com.lsl.entity.Boardroom;
import com.lsl.entity.Note;

public class BoardroomBizimpl implements BoardroomBiz{

	private BoardroomDao bdd;

	public Boardroom getById(int id) {
		// TODO Auto-generated method stub
		return bdd.getById(id);
	}

	public List<Boardroom> getList(int page, int rows) {
		// TODO Auto-generated method stub
		return bdd.getList(page, rows);
	}

	public void delete(Boardroom t) {
		// TODO Auto-generated method stub
		bdd.delete(t);
	}

	public void update(Boardroom t) {
		// TODO Auto-generated method stub
		bdd.update(t);
	}

	public void add(Boardroom t) {
		// TODO Auto-generated method stub
		bdd.add(t);
	}

	public int count(String id) {
		// TODO Auto-generated method stub
		return bdd.count(id);
	}

	public BoardroomDao getBdd() {
		return bdd;
	}

	public void setBdd(BoardroomDao bdd) {
		this.bdd = bdd;
	}

	

	

	
	
}
