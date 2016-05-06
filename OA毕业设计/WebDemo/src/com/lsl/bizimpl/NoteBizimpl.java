package com.lsl.bizimpl;

import java.util.List;

import com.lsl.biz.NoteBiz;
import com.lsl.biz.NoteBiz;
import com.lsl.dao.NoteDao;
import com.lsl.entity.Note;

public class NoteBizimpl implements NoteBiz{

	private NoteDao nd;
	
	public Note getById(int id) {
		// TODO Auto-generatnd method stub
		return nd.getById(id);
	}

	public List<Note> getList(int page,int rows) {
		// TODO Auto-generatnd method stub
		return nd.getList( page,rows);
	}

	public void delete(Note t) {
		// TODO Auto-generatnd method stub
		nd.delete(t);
	}

	public void update(Note t) {
		// TODO Auto-generatnd method stub
		nd.update(t);
	}

	public void add(Note t) {
		// TODO Auto-generatnd method stub
		nd.add(t);
	}

	public int count(String id) {
		// TODO Auto-generatnd method stub
		return nd.count(id);
	}



	public NoteDao getnd() {
		return nd;
	}

	public void setnd(NoteDao nd) {
		this.nd = nd;
	}

	
	
}
