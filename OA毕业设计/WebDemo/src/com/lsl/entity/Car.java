package com.lsl.entity;

import java.util.HashSet;
import java.util.Set;

/**
 * Car entity. @author MyEclipse Persistence Tools
 */

public class Car implements java.io.Serializable {

	// Fields

	private Integer CId;
	private String CCarcode;
	private String CCartype;
	private String CDesc;
	private Integer CState=0;
	private Set carMangers = new HashSet(0);

	// Constructors

	

	/** default constructor */
	public Car() {
	}

	/** full constructor */
	public Car(String CCarcode, String CCartype, String CDesc, Integer CState,
			Set carMangers) {
		this.CCarcode = CCarcode;
		this.CCartype = CCartype;
		this.CDesc = CDesc;
		this.CState = CState;
		this.carMangers = carMangers;
	}

	// Property accessors

	public Integer getCId() {
		return this.CId;
	}

	public void setCId(Integer CId) {
		this.CId = CId;
	}

	public String getCCarcode() {
		return this.CCarcode;
	}

	public void setCCarcode(String CCarcode) {
		this.CCarcode = CCarcode;
	}

	public String getCCartype() {
		return this.CCartype;
	}

	public void setCCartype(String CCartype) {
		this.CCartype = CCartype;
	}

	public String getCDesc() {
		return this.CDesc;
	}

	public void setCDesc(String CDesc) {
		this.CDesc = CDesc;
	}

	public Integer getCState() {
		return this.CState;
	}

	public void setCState(Integer CState) {
		this.CState = CState;
	}

	public Set getCarMangers() {
		return this.carMangers;
	}

	public void setCarMangers(Set carMangers) {
		this.carMangers = carMangers;
	}

}