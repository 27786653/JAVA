package com.lemon.jee.modules.common.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lemon.jee.modules.common.model.SysButton;

@Repository
public interface SysButtonRepository extends JpaRepository<SysButton, Long> {

	Page<SysButton> findByMenusId(Long menuId, Pageable pageable);
}
