package com.lsl.bizimpl;

import java.util.List;

import com.lsl.biz.EmployeeBiz;
import com.lsl.dao.EmployeeDao;
import com.lsl.entity.Employee;

public class EmployeeBizimpl implements EmployeeBiz{

	private EmployeeDao ed;
	
	public Employee getById(int id) {
		// TODO Auto-generated method stub
		return ed.getById(id);
	}

	public List<Employee> getList(int page,int rows) {
		// TODO Auto-generated method stub
		return ed.getList( page,rows);
	}

	public void delete(Employee t) {
		// TODO Auto-generated method stub
		ed.delete(t);
	}

	public void update(Employee t) {
		// TODO Auto-generated method stub
		ed.update(t);
	}

	public void add(Employee t) {
		// TODO Auto-generated method stub
		ed.add(t);
	}

	public int count(String id) {
		// TODO Auto-generated method stub
		return ed.count(id);
	}



	public EmployeeDao getEd() {
		return ed;
	}

	public void setEd(EmployeeDao ed) {
		this.ed = ed;
	}

	
	
}
