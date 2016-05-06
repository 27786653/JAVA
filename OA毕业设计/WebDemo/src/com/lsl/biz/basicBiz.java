package com.lsl.biz;

import java.util.List;

public interface basicBiz<T> {
	T getById(int id);
	List<T> getList(int page,int rows);
	void delete(T t);
	void update(T t);
	void add(T t);
	int count(String id);
}
