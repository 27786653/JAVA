package com.lsl.action;

import java.lang.reflect.ParameterizedType;
import java.util.List;
import java.util.Map;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.SessionAware;


import com.lsl.biz.AnnouncementBiz;
import com.lsl.biz.BoardroomBiz;
import com.lsl.biz.CarBiz;
import com.lsl.biz.EmployeeBiz;
import com.lsl.biz.FileDetileBiz;
import com.lsl.biz.LeaveBiz;
import com.lsl.biz.NoteBiz;
import com.lsl.biz.UsersBiz;
import com.lsl.biz.WebMangerBiz;
import com.lsl.util.Page;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;

public class BasicAction<T> extends ActionSupport implements ModelDriven,SessionAware {
	public  T models ;
	protected List<T> modellist ;
	protected Page p = new Page();
	protected int  lorn;
	protected int  unlorn;
	
	
	
	protected EmployeeBiz eb;
	protected UsersBiz ub;
	protected AnnouncementBiz ab;
	protected NoteBiz nb;
	protected LeaveBiz lb;
	protected WebMangerBiz wmb;
	protected FileDetileBiz fdb;
	protected CarBiz cb;
	protected BoardroomBiz bdb;
	


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


	public BoardroomBiz getBdb() {
		return bdb;
	}


	public void setBdb(BoardroomBiz bdb) {
		this.bdb = bdb;
	}


	public CarBiz getCb() {
		return cb;
	}


	public void setCb(CarBiz cb) {
		this.cb = cb;
	}


	public FileDetileBiz getFdb() {
		return fdb;
	}


	public void setFdb(FileDetileBiz fdb) {
		this.fdb = fdb;
	}


	public WebMangerBiz getWmb() {
		return wmb;
	}


	public void setWmb(WebMangerBiz wmb) {
		this.wmb = wmb;
	}


	public LeaveBiz getLb() {
		return lb;
	}


	public void setLb(LeaveBiz lb) {
		this.lb = lb;
	}


	public NoteBiz getNb() {
		return nb;
	}


	public void setNb(NoteBiz nb) {
		this.nb = nb;
	}


	public AnnouncementBiz getAb() {
		return ab;
	}


	public void setAb(AnnouncementBiz ab) {
		this.ab = ab;
	}

	protected Class clazz ;
	
	public BasicAction(){
		clazz=(Class) ((ParameterizedType)this.getClass().getGenericSuperclass()).getActualTypeArguments()[0];
		
	}
	

	public EmployeeBiz getEb() {
		return eb;
	}


	public void setEb(EmployeeBiz eb) {
		this.eb = eb;
	}


	public List<T> getModellist() {
		return modellist;
	}

	public void setModellist(List<T> modellist) {
		this.modellist = modellist;
	}

	public Page getP() {
		return p;
	}

	public void setP(Page p) {
		this.p = p;
	}

	public Class getClazz() {
		return clazz;
	}

	public void setClazz(Class clazz) {
		this.clazz = clazz;
	}


	public void setModels(T models) {
		this.models = models;
	}
	public T getModels() {
		return models;
	}

	public Object getModel() {
		if (models == null){
			try {
				models = (T) clazz.newInstance();
			} catch (InstantiationException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return models;
	}


	public UsersBiz getUb() {
		return ub;
	}


	public void setUb(UsersBiz ub) {
		this.ub = ub;
	}

	Map<String, Object> sessionMap;
	public void setSession(Map<String, Object> arg0) {
		this.sessionMap=arg0;
	}
	
	

}
