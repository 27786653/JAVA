package com.lsl.entity;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

/**
 * Employee entity. @author MyEclipse Persistence Tools
 */

public class Employee implements java.io.Serializable {

	// Fields

	private Integer EId;
	private Dept dept;
	private Position position;
	private String ECode;
	private String EName;
	private String ESex;
	private Timestamp EJoinDate;
	private Timestamp EBirthDate;
	private String EAddress;
	private String EEmail;
	private String EPhone;
	private String EDesc;
	private Set userses = new HashSet(0);

	// Constructors

	/** default constructor */
	public Employee() {
	}

	/** minimal constructor */
	public Employee(Position position, String ECode, String EName, String ESex,
			Timestamp EJoinDate, String EEmail) {
		this.position = position;
		this.ECode = ECode;
		this.EName = EName;
		this.ESex = ESex;
		this.EJoinDate = EJoinDate;
		this.EEmail = EEmail;
	}

	/** full constructor */
	public Employee(Dept dept, Position position, String ECode, String EName,
			String ESex, Timestamp EJoinDate, Timestamp EBirthDate,
			String EAddress, String EEmail, String EPhone, String EDesc,
			Set userses) {
		this.dept = dept;
		this.position = position;
		this.ECode = ECode;
		this.EName = EName;
		this.ESex = ESex;
		this.EJoinDate = EJoinDate;
		this.EBirthDate = EBirthDate;
		this.EAddress = EAddress;
		this.EEmail = EEmail;
		this.EPhone = EPhone;
		this.EDesc = EDesc;
		this.userses = userses;
	}

	// Property accessors

	public Integer getEId() {
		return this.EId;
	}

	public void setEId(Integer EId) {
		this.EId = EId;
	}

	public Dept getDept() {
		return this.dept;
	}

	public void setDept(Dept dept) {
		this.dept = dept;
	}

	public Position getPosition() {
		return this.position;
	}

	public void setPosition(Position position) {
		this.position = position;
	}

	public String getECode() {
		return this.ECode;
	}

	public void setECode(String ECode) {
		this.ECode = ECode;
	}

	public String getEName() {
		return this.EName;
	}

	public void setEName(String EName) {
		this.EName = EName;
	}

	public String getESex() {
		return this.ESex;
	}

	public void setESex(String ESex) {
		this.ESex = ESex;
	}

	public Timestamp getEJoinDate() {
		return this.EJoinDate;
	}

	public void setEJoinDate(Timestamp EJoinDate) {
		this.EJoinDate = EJoinDate;
	}

	public Timestamp getEBirthDate() {
		return this.EBirthDate;
	}

	public void setEBirthDate(Timestamp EBirthDate) {
		this.EBirthDate = EBirthDate;
	}

	public String getEAddress() {
		return this.EAddress;
	}

	public void setEAddress(String EAddress) {
		this.EAddress = EAddress;
	}

	public String getEEmail() {
		return this.EEmail;
	}

	public void setEEmail(String EEmail) {
		this.EEmail = EEmail;
	}

	public String getEPhone() {
		return this.EPhone;
	}

	public void setEPhone(String EPhone) {
		this.EPhone = EPhone;
	}

	public String getEDesc() {
		return this.EDesc;
	}

	public void setEDesc(String EDesc) {
		this.EDesc = EDesc;
	}

	public Set getUserses() {
		return this.userses;
	}

	public void setUserses(Set userses) {
		this.userses = userses;
	}

}