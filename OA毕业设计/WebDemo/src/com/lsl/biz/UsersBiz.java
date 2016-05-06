package com.lsl.biz;

import com.lsl.entity.Employee;
import com.lsl.entity.Users;

public interface UsersBiz extends basicBiz<Users>{
    public Users dologin(String uname,String pwd);
}
