package SpringJunitTest;

import javax.annotation.Resource;

import me.chanjar.weixin.common.exception.WxErrorException;

import org.apache.log4j.chainsaw.Main;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.project.controller.MainContent.MainControll;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath*:spring-*.xml"})
public class TestController {

	@Resource
	public MainControll mc;
	
	
	@Test
	public	void test() throws WxErrorException{
		mc.makeMenu();
		System.out.println("");
	}
	
	
}
