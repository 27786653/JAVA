package com.lsl.action;

import java.util.Date;
import java.util.HashSet;
import java.util.List;

import com.lsl.entity.Car;
import com.lsl.entity.Employee;
import com.lsl.entity.Note;
import com.lsl.entity.Users;

public class CarAction extends BasicAction<Car>{

	
	
	public String delcar(){
		models=cb.getById(models.getCId());
		cb.delete(models);
		showcar();
		return SUCCESS;
	}
	
	
	public String addcar(){
		cb.add(models);
		showcar();
		return SUCCESS;
	}
	
	public String showcar(){
		modellist=	cb.getList(0, 0);
		lorncar(modellist);
		return SUCCESS;
	}
	
	
	
	
	private void lorncar(List<Car> c){
		for (Car car : c) {
			if(car.getCState()==0)lorn++;
			else unlorn++;
		}
	}

	
	
	
	
	
	
	
}
