package test.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(locations = { "classpath*:/spring-context-core.xml",
		"classpath*:/spring-context-security.xml", "classpath*:/spring-mvc.xml" })
public class ControllerTest {

	@Autowired
	private WebApplicationContext wac;

	private MockMvc mockMvc;

	@Before
	public void setup() {
		this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
	}

	@Test
	public void test() throws Exception {
//		mockMvc.perform(
//				(get("/button/getPage").param("page", "50")
//						.param("limit", "50"))).andExpect(status().isOk())
//				.andDo(print());
//		mockMvc.perform(
//				(get("/zktime/getUser").param("username", ""))).andExpect(status().isOk())
//				.andDo(print());
		mockMvc.perform(
				(get("/zktime/calculate").param("startDate", "2014-01-01").param("endDate", "2014-01-31").param("userID", "2"))).andExpect(status().isOk())
				.andDo(print());
//		mockMvc.perform(
//				(get("/zktime/isInit"))).andExpect(status().isOk())
//				.andDo(print());
//		mockMvc.perform(
//		(get("/zktime/monthlyList"))).andExpect(status().isOk())
//		.andDo(print());
	}
}
