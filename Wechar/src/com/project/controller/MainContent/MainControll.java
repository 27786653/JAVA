package com.project.controller.MainContent;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import me.chanjar.weixin.common.api.WxConsts;
import me.chanjar.weixin.common.bean.WxMenu;
import me.chanjar.weixin.common.bean.WxMenu.WxMenuButton;
import me.chanjar.weixin.common.exception.WxErrorException;
import me.chanjar.weixin.common.util.StringUtils;
import me.chanjar.weixin.mp.api.WxMpConfigStorage;
import me.chanjar.weixin.mp.api.WxMpMessageHandler;
import me.chanjar.weixin.mp.api.WxMpMessageRouter;
import me.chanjar.weixin.mp.api.WxMpService;
import me.chanjar.weixin.mp.api.WxMpServiceImpl;
import me.chanjar.weixin.mp.bean.WxMpCustomMessage;
import me.chanjar.weixin.mp.bean.WxMpXmlMessage;
import me.chanjar.weixin.mp.bean.WxMpXmlOutMessage;

import org.codehaus.jackson.map.ser.ArraySerializers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import MessageRouterHandler.DemoGuessNumberHandler;
import MessageRouterHandler.DemoImageHandler;
import MessageRouterHandler.DemoLogHandler;
import MessageRouterHandler.DemoOAuth2Handler;
import MessageRouterHandler.DemoTextHandler;

@Controller
public class MainControll {
	
	private String UrlPath="http://332f0217.ngrok.io/Wechar/";
	
	@Autowired 
	public WxMpConfigStorage wxMpConfigStorage;
	 @Autowired
	  public  WxMpService wxMpService;
	 
	  public WxMpMessageRouter wxMpMessageRouter;

	 
	 public MainControll() {
		 
	}
	//AsseccToken验证与消息路由
	@RequestMapping("/AsseccTokencheck")
	@ResponseBody
	public void getAsseccToken(
			 HttpServletRequest request, HttpServletResponse response) throws Exception {
		String requestURI = request.getRequestURI();
			response.setContentType("text/html;charset=utf-8");
		    response.setStatus(HttpServletResponse.SC_OK);

		    String signature = request.getParameter("signature");
		    String nonce = request.getParameter("nonce");
		    String timestamp = request.getParameter("timestamp");
			
			if (!wxMpService.checkSignature(timestamp, nonce, signature)) {
			      // 消息签名不正确，说明不是公众平台发过来的消息
				String requestURI1 = request.getRequestURI();
			      response.getWriter().println("非法请求");
			      return;
			    }

			    String echostr = request.getParameter("echostr");
			    if (StringUtils.isNotBlank(echostr)) {
			      // 说明是一个仅仅用来验证的请求，回显echostr
			      response.getWriter().println(echostr);
			      initMessageRouter();
			      return;
			    }

			    String encryptType = StringUtils.isBlank(request.getParameter("encrypt_type")) ?
			        "raw" :
			        request.getParameter("encrypt_type");

			    if ("raw".equals(encryptType)) {
			      // 明文传输的消息
			      WxMpXmlMessage inMessage = WxMpXmlMessage.fromXml(request.getInputStream());
			      WxMpXmlOutMessage outMessage = wxMpMessageRouter.route(inMessage);
			      if (outMessage != null) {
			    	  response.getWriter().println(outMessage.toXml());
			        return ;
			      }
			      return ;
			    }

			    if ("aes".equals(encryptType)) {
			      // 是aes加密的消息
			      String msgSignature = request.getParameter("msg_signature");
			      WxMpXmlMessage inMessage = WxMpXmlMessage.fromEncryptedXml(request.getInputStream(), wxMpConfigStorage, timestamp, nonce, msgSignature);
			      WxMpXmlOutMessage outMessage = wxMpMessageRouter.route(inMessage);
			      response.getWriter().println(wxMpConfigStorage);
			      return;
			    }
			    response.getWriter().println("不可识别的加密类型");
		
	}
	//菜单初始化
	@RequestMapping("/creatMenu")
	public void makeMenu() throws WxErrorException{
		
		    List<WxMenuButton> buttons=new ArrayList<WxMenuButton>();
		    WxMenuButton wxmenu=new WxMenuButton();
		    wxmenu.setName("帮助");
		    
		    WxMenuButton button31 = new WxMenuButton();
		    button31.setType(WxConsts.BUTTON_VIEW);
		    button31.setName("功能介绍");
		    button31.setUrl("http://www.soso.com/");
		    
		    WxMenuButton button32 = new WxMenuButton();
		    button32.setType(WxConsts.BUTTON_VIEW);
		    button32.setName("常见问题");
		    button32.setUrl("http://v.qq.com/");
		    
		    WxMenuButton button33 = new WxMenuButton();
		    button33.setType(WxConsts.BUTTON_CLICK);
		    button33.setName("服务热线");
		    button33.setKey("V1001_GOOD");
		    
		    wxmenu.getSubButtons().add(button31);
		    wxmenu.getSubButtons().add(button32);
		    wxmenu.getSubButtons().add(button33);
		    
		    buttons.add(wxmenu);
		    WxMenuButton wxmenu2=new WxMenuButton();
		    wxmenu2.setName("首页");
		    wxmenu2.setType(WxConsts.BUTTON_VIEW);
		    wxmenu2.setUrl(UrlPath+"index.jsp");
		    buttons.add(wxmenu2);
		    WxMenuButton wxmenu3=new WxMenuButton();
		    wxmenu3.setName("我的账户");
		    wxmenu3.setType(WxConsts.BUTTON_VIEW);
		    wxmenu3.setUrl(UrlPath+"index.jsp");
		    buttons.add(wxmenu3);
		    WxMenu menu = new WxMenu();
		    menu.setButtons(buttons);
		    System.out.println(menu.toJson());
		    wxMpService.menuCreate(menu);
		    System.out.println("OK");
	}
	
	

	
	
	//初始化消息路由器
	private void initMessageRouter() {
		//初始化消息路由器
		System.out.println("初始化消息路由器");
		WxMpMessageHandler logHandler = new DemoLogHandler();
	    WxMpMessageHandler textHandler = new DemoTextHandler();
	    WxMpMessageHandler imageHandler = new DemoImageHandler();
	    WxMpMessageHandler oauth2handler = new DemoOAuth2Handler();
	    DemoGuessNumberHandler guessNumberHandler = new DemoGuessNumberHandler();
	 wxMpMessageRouter = new WxMpMessageRouter(wxMpService);
      wxMpMessageRouter
          .rule().handler(logHandler).next()
          .rule().msgType(WxConsts.XML_MSG_TEXT).matcher(guessNumberHandler).handler(guessNumberHandler).end()
          .rule().async(false).content("哈哈").handler(textHandler).end()
          .rule().async(false).content("图片").handler(imageHandler).end()
          .rule().async(false).content("oauth").handler(oauth2handler).end();		
	}
	
}
