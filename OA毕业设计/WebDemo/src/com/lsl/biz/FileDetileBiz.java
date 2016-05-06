package com.lsl.biz;

import java.util.List;

import com.lsl.entity.Employee;
import com.lsl.entity.FileDetile;
import com.lsl.entity.Leave;
import com.lsl.entity.Note;

public interface FileDetileBiz extends basicBiz<FileDetile> {
	public List<FileDetile> getTrList();
	public List<FileDetile> getshow(int id);
}
