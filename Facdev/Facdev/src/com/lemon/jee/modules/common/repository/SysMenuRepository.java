package com.lemon.jee.modules.common.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lemon.jee.modules.common.model.SysMenu;

@Repository
public interface SysMenuRepository extends JpaRepository<SysMenu, Long> {

	List<SysMenu> findByParentIdIsNull(Sort sort);
}
