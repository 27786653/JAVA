package com.yuhi.dao.test;

import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * Created by 李森林 on 2016/4/20.
 */
public class tests {
    public static void main(String[] args) throws Exception {
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(new String[] {"META-INF.spring/spring-dubbo-provider.xml"});
        context.start();

        System.in.read(); // 为保证服务一直开着，利用输入流的阻塞来模拟
    }

}
