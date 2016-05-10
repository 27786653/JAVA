package MessageRouterHandler;

import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

import me.chanjar.weixin.common.api.WxConsts;
import me.chanjar.weixin.common.bean.result.WxMediaUploadResult;
import me.chanjar.weixin.common.exception.WxErrorException;
import me.chanjar.weixin.common.session.WxSessionManager;
import me.chanjar.weixin.mp.api.WxMpMessageHandler;
import me.chanjar.weixin.mp.api.WxMpService;
import me.chanjar.weixin.mp.bean.WxMpCustomMessage;
import me.chanjar.weixin.mp.bean.WxMpXmlMessage;
import me.chanjar.weixin.mp.bean.WxMpXmlOutImageMessage;
import me.chanjar.weixin.mp.bean.WxMpXmlOutMessage;
import me.chanjar.weixin.mp.bean.WxMpXmlOutNewsMessage;
/**
 * 图文消息路由
 * @author 李森林
 *
 */
public class PicOrContentHandler  implements WxMpMessageHandler{

	@Override
	public WxMpXmlOutMessage handle(WxMpXmlMessage wxMessage, Map<String, Object> context,
		      WxMpService wxMpService, WxSessionManager sessionManage)
			throws WxErrorException {
		// TODO Auto-generated method stub
		 try {
		WxMpXmlOutNewsMessage.Item item = new WxMpXmlOutNewsMessage.Item();
		item.setDescription("Is Really A Happy Day");
		item.setPicUrl("http://www.iteye.com/upload/logo/user/639214/302951a9-d30d-36fd-a642-c14dccea060b.jpg?1330482442");
		item.setTitle("Happy Day");
		item.setUrl("http://www.baidu.com");

		WxMpXmlOutNewsMessage m = WxMpXmlOutMessage.NEWS()
		  .fromUser(wxMessage.getToUserName())
		  .toUser(wxMessage.getFromUserName())
		  .addArticle(item)
		  .addArticle(item)
		  .addArticle(item)
		  .build();
		return m;
		 } catch (Exception e) {
		      e.printStackTrace();
		 }
		return null;
		 
	
	}
}
