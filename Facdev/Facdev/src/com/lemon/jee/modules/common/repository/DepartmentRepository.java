package com.lemon.jee.modules.common.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lemon.jee.modules.common.model.Department;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
	public Page<Department> findAll(Specification<Department> specification, Pageable pageable);
}
