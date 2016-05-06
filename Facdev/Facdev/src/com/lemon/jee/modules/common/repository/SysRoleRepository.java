package com.lemon.jee.modules.common.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lemon.jee.modules.common.model.SysRole;

@Repository
public interface SysRoleRepository extends JpaRepository<SysRole, Long> {
    public SysRole findByCode(String code);
}
