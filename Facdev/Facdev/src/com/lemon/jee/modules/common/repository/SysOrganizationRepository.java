package com.lemon.jee.modules.common.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lemon.jee.modules.common.model.SysOrganization;

@Repository
public interface SysOrganizationRepository extends JpaRepository<SysOrganization, Long> {

	List<SysOrganization> findByParentIdIsNull();
	
}
