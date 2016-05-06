package com.lemon.jee.modules.common.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lemon.jee.modules.common.model.Expert;

@Repository
public interface ExpertRepository extends JpaRepository<Expert, Long> {
	public Page<Expert> findAll(Specification<Expert> specification, Pageable pageable);
}
