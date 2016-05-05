package com.project.controller.CommunityController.notice;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import com.project.common.UserUtil;
import com.project.dao.NoticeMapper;
import com.project.entitys.Notice;
import com.project.entitys.NoticeExample;

@Controller
public class noticeController {

	@Resource
	private NoticeMapper noticeMapper;
	
	
	@RequestMapping("/getnoticeList")
	public String getnoticeList(ModelMap map, HttpSession session){
		
		
		NoticeExample example=new NoticeExample();
		example.createCriteria().andNUsersEqualTo(UserUtil.getUserFromSession(session).getuId());
		List<Notice> noticelist=noticeMapper.selectByExample(example);
		map.put("noticelist", noticelist);
		System.out.println(noticelist.size());
		return "notice/notice";
	}
	@RequestMapping("/getNoticeDetail")
	public String getNoticeDetail(Notice notice,ModelMap map){
		NoticeExample example=new NoticeExample();
		example.createCriteria().andNIdEqualTo(notice.getnId());
		List<Notice> noticelist=noticeMapper.selectByExample(example);
	if(noticelist!=null&&noticelist.size()>0)map.put("noticedetail", noticelist.get(0));
		System.out.println(noticelist.size());
		
		return "notice/noticedetail";
	}
	
}
