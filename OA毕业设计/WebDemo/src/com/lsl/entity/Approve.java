package com.lsl.entity;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

/**
 * Approve entity. @author MyEclipse Persistence Tools
 */

public class Approve implements java.io.Serializable {

	// Fields

	private Integer AId;
	private Approveresults approveresults;
	private Users users;
	private ApproveType approveType;
	private Timestamp ATime;
	private Integer AState;
	private Set seals = new HashSet(0);
	private Set boardroomMangers = new HashSet(0);
	private Set leaves = new HashSet(0);
	private Set travels = new HashSet(0);
	private Set picketSeals = new HashSet(0);
	private Set proofOfearningses = new HashSet(0);
	private Set carMangers = new HashSet(0);

	// Constructors

	/** default constructor */
	public Approve() {
	}

	/** full constructor */
	public Approve(Approveresults approveresults, Users users,
			ApproveType approveType, Timestamp ATime, Integer AState,
			Set seals, Set boardroomMangers, Set leaves, Set travels,
			Set picketSeals, Set proofOfearningses, Set carMangers) {
		this.approveresults = approveresults;
		this.users = users;
		this.approveType = approveType;
		this.ATime = ATime;
		this.AState = AState;
		this.seals = seals;
		this.boardroomMangers = boardroomMangers;
		this.leaves = leaves;
		this.travels = travels;
		this.picketSeals = picketSeals;
		this.proofOfearningses = proofOfearningses;
		this.carMangers = carMangers;
	}

	// Property accessors

	public Integer getAId() {
		return this.AId;
	}

	public void setAId(Integer AId) {
		this.AId = AId;
	}

	public Approveresults getApproveresults() {
		return this.approveresults;
	}

	public void setApproveresults(Approveresults approveresults) {
		this.approveresults = approveresults;
	}

	public Users getUsers() {
		return this.users;
	}

	public void setUsers(Users users) {
		this.users = users;
	}

	public ApproveType getApproveType() {
		return this.approveType;
	}

	public void setApproveType(ApproveType approveType) {
		this.approveType = approveType;
	}

	public Timestamp getATime() {
		return this.ATime;
	}

	public void setATime(Timestamp ATime) {
		this.ATime = ATime;
	}

	public Integer getAState() {
		return this.AState;
	}

	public void setAState(Integer AState) {
		this.AState = AState;
	}

	public Set getSeals() {
		return this.seals;
	}

	public void setSeals(Set seals) {
		this.seals = seals;
	}

	public Set getBoardroomMangers() {
		return this.boardroomMangers;
	}

	public void setBoardroomMangers(Set boardroomMangers) {
		this.boardroomMangers = boardroomMangers;
	}

	public Set getLeaves() {
		return this.leaves;
	}

	public void setLeaves(Set leaves) {
		this.leaves = leaves;
	}

	public Set getTravels() {
		return this.travels;
	}

	public void setTravels(Set travels) {
		this.travels = travels;
	}

	public Set getPicketSeals() {
		return this.picketSeals;
	}

	public void setPicketSeals(Set picketSeals) {
		this.picketSeals = picketSeals;
	}

	public Set getProofOfearningses() {
		return this.proofOfearningses;
	}

	public void setProofOfearningses(Set proofOfearningses) {
		this.proofOfearningses = proofOfearningses;
	}

	public Set getCarMangers() {
		return this.carMangers;
	}

	public void setCarMangers(Set carMangers) {
		this.carMangers = carMangers;
	}

}