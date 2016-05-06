package com.lemon.jee.modules.common.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lemon.jee.modules.common.model.SysLog;

@Repository
public interface SysLogRepository extends JpaRepository<SysLog, Long> {

}
