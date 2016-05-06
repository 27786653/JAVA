package com.lemon.jee.modules.common.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lemon.jee.modules.common.model.SysUser;

@Repository
public interface SysUserRepository extends JpaRepository<SysUser, Long> {

//	 public Page<SysUser> findByRoleId(String roleId, Pageable pageable);

	public SysUser findByAccount(String username);
	
	public SysUser findByMobile(String mobile);

	public Page<SysUser> findByDepartmentId(String departmentId, Pageable pageable);

	public Page<SysUser> findByRoles_Id(Long roleId, Pageable pageable);
	
	public List<SysUser> findAll(Specification<SysUser> specification);
	
	public Page<SysUser> findAll(Specification<SysUser> specification,Pageable pageable);
}
