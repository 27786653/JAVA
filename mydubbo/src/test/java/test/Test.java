package test;

import com.yuhi.dao.DemoServices;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;

/**
 * Created by 李森林 on 2016/4/20.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath*:spring-dubbo-consumer.xml","classpath*:spring-base.xml"})
public class Test {

    @Resource
    private DemoServices ds;
    @org.junit.Test
    public void test(){
     String name=   ds.sayHello("name");
        System.out.println(name);
    }


}
