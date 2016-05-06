package com.lemon.jee.modules.common.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lemon.jee.modules.common.model.SysSet;
@Repository
public interface SysSetRepository extends JpaRepository<SysSet, Integer> {

	public List<SysSet> findAll(Specification<SysSet> specification);

	public Page<SysSet> findAll(Specification<SysSet> specification, Pageable pageable);
}
