package com.lsl.dao;

import java.util.List;

import com.lsl.entity.Employee;
import com.lsl.entity.FileDetile;
import com.lsl.entity.Leave;
import com.lsl.entity.Note;

public interface FileDetileDao extends basicDao<FileDetile> {

	public List<FileDetile> getTrList();
	public List<FileDetile> getshow(int id);
}