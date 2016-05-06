package com.lemon.jee.modules.common.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lemon.jee.modules.common.model.SysEmployee;

@Repository
public interface SysEmployeeRepository extends JpaRepository<SysEmployee, Long> {

}
