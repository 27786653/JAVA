package com.lsl.bizimpl;

import java.util.List;

import com.lsl.biz.FileDetileBiz;
import com.lsl.dao.FileDetileDao;
import com.lsl.dao.FileDetileDao;
import com.lsl.entity.FileDetile;

public class FileDetileBizimpl implements FileDetileBiz{

	private FileDetileDao fdd;
	
	public FileDetile getById(int id) {
		// TODO Auto-generated method stub
		return fdd.getById(id);
	}

	public List<FileDetile> getList(int page,int rows) {
		// TODO Auto-generated method stub
		return fdd.getList( page,rows);
	}

	public void delete(FileDetile t) {
		// TODO Auto-generated method stub
		fdd.delete(t);
	}

	public void update(FileDetile t) {
		// TODO Auto-generated method stub
		fdd.update(t);
	}

	public void add(FileDetile t) {
		// TODO Auto-generated method stub
		fdd.add(t);
	}

	public int count(String id) {
		// TODO Auto-generated method stub
		return fdd.count(id);
	}

	public FileDetileDao getFdd() {
		return fdd;
	}

	public void setFdd(FileDetileDao fdd) {
		this.fdd = fdd;
	}

	public List<FileDetile> getTrList() {
		// TODO Auto-generated method stub
		return fdd.getTrList();
	}

	public List<FileDetile> getshow(int id) {
		// TODO Auto-generated method stub
		return fdd.getshow(id);
	}






}
