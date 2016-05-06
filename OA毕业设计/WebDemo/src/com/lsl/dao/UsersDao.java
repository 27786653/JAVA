package com.lsl.dao;

import com.lsl.entity.Users;

public interface UsersDao extends basicDao<Users> {
      public Users dologin(String uname,String pwd);
}
