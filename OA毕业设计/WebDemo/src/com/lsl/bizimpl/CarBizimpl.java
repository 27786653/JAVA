package com.lsl.bizimpl;

import java.util.List;

import com.lsl.biz.CarBiz;
import com.lsl.biz.NoteBiz;
import com.lsl.biz.NoteBiz;
import com.lsl.dao.CarDao;
import com.lsl.dao.NoteDao;
import com.lsl.entity.Car;
import com.lsl.entity.Note;

public class CarBizimpl implements CarBiz{

	private CarDao cd;

	public Car getById(int id) {
		// TODO Auto-generated method stub
		return cd.getById(id);
	}

	public List<Car> getList(int page, int rows) {
		// TODO Auto-generated method stub
		return cd.getList(page, rows);
	}

	public void delete(Car t) {
		// TODO Auto-generated method stub
		cd.delete(t);
	}

	public void update(Car t) {
		// TODO Auto-generated method stub
		cd.update(t);
	}

	public void add(Car t) {
		// TODO Auto-generated method stub
		cd.add(t);
	}

	public int count(String id) {
		// TODO Auto-generated method stub
		return cd.count(id);
	}

	public CarDao getCd() {
		return cd;
	}

	public void setCd(CarDao cd) {
		this.cd = cd;
	}
	
	

	
	
}
