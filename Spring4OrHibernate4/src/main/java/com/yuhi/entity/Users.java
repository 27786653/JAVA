package com.yuhi.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity(name="users")
//@Table(name="sys_user")
public class Users {
	
	public Users(){
		super();
	}
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@GenericGenerator(name = "increment", strategy = "increment")
	@Column(name="id")
	private Integer id;
	
	@Column(name="age")
	private Integer age;
	
	@Column(name="nice_name")
	private String NiceName;
	
	@Column(name="user_name")
	private String UserName;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public String getNiceName() {
		return NiceName;
	}

	public void setNiceName(String niceName) {
		NiceName = niceName;
	}

	public String getUserName() {
		return UserName;
	}

	public void setUserName(String userName) {
		UserName = userName;
	}
	
	
	
//	@Temporal(TemporalType.TIMESTAMP)
//	@Column(name = "EVENT_DATE")
//	private Date date;

	
	

}
