package com.lsl.util;

import java.util.Date;

public class Page {

	
	private int totalCount;
	private int totalpageCount;
	private int size=0;
	private int nowpage;
	public int getTotalCount() {
		return totalCount;
	}
	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
		totalpageCount=totalCount%size==0?totalCount/size:totalCount/size+1;
	}
	public int getTotalpageCount() {
		return totalpageCount;
	}
	public void setTotalpageCount(int totalpageCount) {
		this.totalpageCount = totalpageCount;
	}
	public int getSize() {
		return size;
	}
	public void setSize(int size) {
		this.size = size;
	}
	public int getNowpage() {
		return nowpage;
	}
	public void setNowpage(int nowpage) {
		this.nowpage = nowpage;
	}
	
	
	
	
}
