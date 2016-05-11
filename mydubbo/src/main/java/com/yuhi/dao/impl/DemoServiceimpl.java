package com.yuhi.dao.impl;


import com.yuhi.dao.DemoServices;

/**
 * Created by 李森林 on 2016/4/20.
 */
public class DemoServiceimpl implements DemoServices {
    @Override
    public String sayHello(String name) {
        return "欢迎你："+name;
    }
}
