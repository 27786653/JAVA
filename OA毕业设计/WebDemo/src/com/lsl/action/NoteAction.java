package com.lsl.action;

import java.util.Date;
import java.util.HashSet;

import com.lsl.entity.Employee;
import com.lsl.entity.Note;
import com.lsl.entity.Users;

public class NoteAction extends BasicAction<Note>{

	
	public String getNotebyid(){
		models=nb.getById(models.getNId());
		return SUCCESS;
	}
	
	public String addNote(){
		Users u=(Users) sessionMap.get("user");
		models.setNCreateTime(new Date());
		models.setUsers(u);
		nb.add(models);
		refalsh();
		return SUCCESS;
	}
	
	public String updateNote(){
		nb.update(models);
		refalsh();
		return SUCCESS;
	}
	public String deleteNote(){
		models=nb.getById(models.getNId());
		nb.delete(models);
		refalsh();
		return SUCCESS;
		
	}
	
	protected void refalsh(){
		Users u=(Users) sessionMap.get("user");
		u.setNotes(new HashSet(nb.getList(0, 0)));
	}
	
}
