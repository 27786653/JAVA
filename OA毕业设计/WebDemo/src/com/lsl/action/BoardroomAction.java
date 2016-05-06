package com.lsl.action;

import java.util.List;

import com.lsl.entity.Boardroom;
import com.lsl.entity.Car;
import com.lsl.entity.Employee;
import com.lsl.entity.Users;

public class BoardroomAction extends BasicAction<Boardroom>{

	
	
	public String delboard(){
		models=bdb.getById(models.getBId());
		bdb.delete(models);
		showboard();
		return SUCCESS;
	}
	
	
	public String addboard(){
		bdb.add(models);
		showboard();
		return SUCCESS;
		
		
	}
	
	public String showboard(){
		modellist=	bdb.getList(0, 0);
		lorncar(modellist);
		return SUCCESS;
	}
	
	
	
	
	private void lorncar(List<Boardroom> c){
		for (Boardroom car : c) {
			if(car.getBState()==0)lorn++;
			else unlorn++;
		}
	}


	public int getLorn() {
		return lorn;
	}


	public void setLorn(int lorn) {
		this.lorn = lorn;
	}


	public int getUnlorn() {
		return unlorn;
	}


	public void setUnlorn(int unlorn) {
		this.unlorn = unlorn;
	}

	
	
}
