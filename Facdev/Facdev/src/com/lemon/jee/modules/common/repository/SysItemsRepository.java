package com.lemon.jee.modules.common.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lemon.jee.modules.common.model.SysItems;

@Repository
public interface SysItemsRepository extends JpaRepository<SysItems, Long> {

}
